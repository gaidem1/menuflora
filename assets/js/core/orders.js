// ============================================
// ORDER MANAGEMENT
// ============================================
import { db, auth, anonAuthReady } from '../config/firebase.js';
import { WA_NUMBER } from '../config/constants.js';
import { getCartData, clearCart, updateCartUI, getCartTotal, getCartItems } from './cart.js';
import { getMenuCache } from './menu.js';
import { getIsAdmin } from './admin.js';
import { cleanNameFromEmoji, escapeHtml, showToast, trackEvent, getOrCreateDeviceId } from '../utils/helpers.js';
import { getTranslation, getCurrentLang } from './translations.js';

const deviceId = getOrCreateDeviceId();
let lastOrderSubmitTime = 0;
let orderInProgress = false;

export async function saveOrderToFirestore(order) {
    try {
        await anonAuthReady;
        if (!auth.currentUser) {
            showToast('❌ Gagal terhubung ke server. Coba refresh halaman.');
            return false;
        }

        const now = Date.now();
        if (now - lastOrderSubmitTime < 3000) {
            showToast('⏳ Tunggu sebentar sebelum memesan lagi');
            return false;
        }
        lastOrderSubmitTime = now;

        const cartData = getCartData();
        const menuDataCache = getMenuCache();
        const orderItems = [];
        let calculatedTotal = 0;

        for (const [id, qty] of Object.entries(cartData)) {
            const menu = menuDataCache.find(m => m.id === id);
            if (!menu || qty <= 0) continue;
            const price = menu.promoPrice || menu.price;
            const subtotal = price * qty;
            calculatedTotal += subtotal;
            orderItems.push({ id: menu.id, name: menu.name, qty, price, subtotal });
        }

        if (orderItems.length === 0) {
            showToast('🛒 Keranjang kosong');
            return false;
        }

        // Validate stock
        for (const item of orderItems) {
            const menu = menuDataCache.find(m => m.id === item.id);
            if (!menu) {
                showToast(`❌ Menu "${item.name}" tidak ditemukan.`);
                return false;
            }
            if (menu.stock !== undefined && menu.stock < item.qty) {
                showToast(`❌ Stok ${item.name} tidak mencukupi (tersisa ${menu.stock})`);
                return false;
            }
        }

        const orderData = {
            items: orderItems,
            total: calculatedTotal,
            rawItems: orderItems.map(i => `${i.name} x${i.qty}`),
            customerNote: order.customerNote || '',
            status: 'pending',
            source: 'web',
            deviceId: deviceId,
            uid: auth.currentUser.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            orderDate: new Date().toISOString().split('T')[0],
            orderTime: new Date().toLocaleTimeString('id-ID'),
            validated: true
        };

        const docRef = await db.collection('orders').add(orderData);
        console.log('✅ Pending order saved with ID:', docRef.id);

        // Save to local history
        const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
        history.push({
            id: docRef.id,
            items: orderData.items,
            total: 'Rp' + (calculatedTotal || 0).toLocaleString('id-ID'),
            date: new Date().toLocaleString('id-ID'),
            status: 'pending',
            timestamp: Date.now()
        });
        while (history.length > 50) history.shift();
        localStorage.setItem('flora-order-history', JSON.stringify(history));

        return true;
    } catch (err) {
        console.error('❌ Failed to save order:', err);
        if (err.code === 'permission-denied') {
            showToast('❌ Gagal menyimpan: izin ditolak. Coba refresh.');
        } else {
            showToast('❌ Gagal menyimpan pesanan: ' + err.message);
        }
        return false;
    }
}

export async function confirmOrder(orderId) {
    if (!getIsAdmin()) {
        showToast('❌ Hanya admin yang bisa konfirmasi');
        return;
    }

    try {
        const orderDoc = await db.collection('orders').doc(orderId).get();
        if (!orderDoc.exists) {
            showToast('❌ Order tidak ditemukan');
            return;
        }
        const orderData = orderDoc.data();
        if (orderData.status === 'completed') {
            showToast('ℹ️ Order sudah dikonfirmasi sebelumnya');
            return;
        }
        if (orderData.status !== 'pending') {
            showToast('❌ Order tidak dalam status pending');
            return;
        }

        const items = orderData.items || [];
        const menuRefs = [];
        const menuDataCache = getMenuCache();

        for (const item of items) {
            const menuId = item.id;
            if (!menuId) {
                let menuItem = menuDataCache.find(m => {
                    const clean = cleanNameFromEmoji(m.name);
                    return clean === item.name || m.name === item.name;
                });
                if (!menuItem) {
                    const snapshot = await db.collection('menu').where('name', '==', item.name).limit(1).get();
                    if (!snapshot.empty) {
                        menuItem = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                    }
                }
                if (!menuItem) {
                    showToast(`❌ Menu "${item.name}" tidak ditemukan.`);
                    return;
                }
                menuRefs.push({ ref: db.collection('menu').doc(menuItem.id), qty: item.qty, name: menuItem.name });
            } else {
                menuRefs.push({ ref: db.collection('menu').doc(menuId), qty: item.qty, name: item.name || `ID ${menuId}` });
            }
        }

        // Update stock via transaction
        await db.runTransaction(async (transaction) => {
            const docs = [];
            for (const item of menuRefs) {
                const doc = await transaction.get(item.ref);
                if (!doc.exists) {
                    throw new Error(`Menu ${item.name} tidak ada.`);
                }
                const currentStock = doc.data().stock || 0;
                if (currentStock < item.qty) {
                    throw new Error(`Stok ${item.name} tidak cukup (sisa ${currentStock}).`);
                }
                docs.push({ ref: item.ref, stock: currentStock, qty: item.qty });
            }
            for (const docInfo of docs) {
                transaction.update(docInfo.ref, {
                    stock: docInfo.stock - docInfo.qty,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        });

        await db.collection('orders').doc(orderId).update({
            status: 'completed',
            confirmedAt: firebase.firestore.FieldValue.serverTimestamp(),
            confirmedBy: auth.currentUser?.email || 'admin'
        });

        showToast('✅ Order dikonfirmasi dan stok diperbarui!');
        trackEvent('Admin', 'confirm_order', orderId);
        loadPendingOrders();
        loadDashboardStats();

    } catch (err) {
        console.error('❌ Gagal konfirmasi order:', err);
        showToast('❌ Gagal konfirmasi: ' + err.message);
    }
}

export async function cancelOrder(orderId) {
    if (!getIsAdmin()) return;
    if (!confirm('Batalkan order ini? Status akan menjadi "cancelled".')) return;
    try {
        await db.collection('orders').doc(orderId).update({
            status: 'cancelled',
            cancelledAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast('✅ Order dibatalkan');
        loadPendingOrders();
        loadDashboardStats();
    } catch (err) {
        showToast('❌ Gagal batalkan: ' + err.message);
    }
}

export async function loadPendingOrders(filter = 'pending') {
    if (!getIsAdmin()) return;
    const container = document.getElementById('pendingOrdersList');
    if (!container) return;

    try {
        const limitCount = filter === 'all' ? 100 : 50;
        let snapshot;

        try {
            let query = db.collection('orders');
            if (filter === 'pending') query = query.where('status', '==', 'pending');
            snapshot = await query.orderBy('timestamp', 'desc').limit(limitCount).get();
        } catch (queryErr) {
            let fallbackQuery = db.collection('orders');
            if (filter === 'pending') fallbackQuery = fallbackQuery.where('status', '==', 'pending');
            snapshot = await fallbackQuery.limit(limitCount).get();
        }

        const docs = [];
        snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
        docs.sort((a, b) => (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0));
        renderPendingOrders(docs, container, filter);

    } catch (err) {
        console.error('Error loading orders:', err);
        container.innerHTML = `
            <div style="padding:20px;text-align:center;color:var(--text-muted);">
                ❌ Gagal memuat: ${escapeHtml(err.message || '')}
                <br><br>
                <button class="btn btn-sm" id="retryLoadOrdersBtn" style="margin-top:8px;">🔄 Coba Lagi</button>
            </div>
        `;
        const retryBtn = document.getElementById('retryLoadOrdersBtn');
        if (retryBtn) retryBtn.addEventListener('click', () => loadPendingOrders(filter));
    }
}

export function renderPendingOrders(docs, container, filter = 'pending') {
    if (!docs || docs.length === 0) {
        container.innerHTML = `
            <div style="padding:20px;text-align:center;color:var(--text-muted);">
                ${filter === 'all' ? '📭 Belum ada order' : '✅ Tidak ada order pending'}
            </div>
        `;
        return;
    }

    const statusBadge = (status) => {
        if (status === 'completed') return '<span class="status-badge completed">✅ Selesai</span>';
        if (status === 'cancelled') return '<span class="status-badge cancelled">❌ Dibatalkan</span>';
        if (status === 'pending') return '<span class="status-badge pending">⏳ Pending</span>';
        return `<span class="status-badge">📌 ${escapeHtml(status || '-')}</span>`;
    };

    let html = '<div style="display:flex;flex-direction:column;gap:12px;">';
    docs.forEach(doc => {
        const data = doc;
        const date = data.timestamp?.toDate?.()?.toLocaleString('id-ID') || 'Baru saja';
        const total = 'Rp' + (data.total || 0).toLocaleString('id-ID');

        let itemsDisplay = '';
        if (Array.isArray(data.items)) {
            itemsDisplay = data.items.map(item => `${item.name} x${item.qty}`).join(', ');
        } else if (typeof data.items === 'string') {
            itemsDisplay = data.items;
        } else {
            itemsDisplay = '-';
        }

        const noteHtml = data.customerNote
            ? `<div style="font-size:12px;color:var(--text-muted);font-style:italic;margin-top:2px;">📝 ${escapeHtml(data.customerNote)}</div>`
            : '';

        const actionsHtml = data.status === 'pending'
            ? `<button class="btn btn-sm pending-confirm-btn" style="background:#27ae60;" data-id="${data.id}">✅ Konfirmasi</button>
               <button class="btn btn-sm btn-danger pending-cancel-btn" data-id="${data.id}">❌ Batalkan</button>`
            : statusBadge(data.status);

        html += `
            <div class="pending-item">
                <div>
                    <div class="date">📅 ${date}</div>
                    <div class="items">${escapeHtml(itemsDisplay)}</div>
                    <div class="total">${total}</div>
                    ${noteHtml}
                </div>
                <div class="actions">
                    ${actionsHtml}
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

export async function loadOrderHistoryFromFirestore() {
    try {
        await anonAuthReady;
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('Belum terautentikasi');

        let snapshot;
        try {
            snapshot = await db.collection('orders')
                .where('uid', '==', uid)
                .orderBy('timestamp', 'desc')
                .limit(50)
                .get();
        } catch (queryErr) {
            snapshot = await db.collection('orders')
                .where('uid', '==', uid)
                .limit(50)
                .get();
        }

        const history = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            history.push({
                id: doc.id,
                items: data.items || [],
                total: 'Rp' + (data.total || 0).toLocaleString('id-ID'),
                date: data.timestamp?.toDate?.()?.toLocaleString('id-ID') || 'Baru saja',
                status: data.status || 'pending',
                customerNote: data.customerNote || '',
                _ts: data.timestamp?.toMillis?.() || 0
            });
        });
        history.sort((a, b) => b._ts - a._ts);
        return history;
    } catch (err) {
        console.error('Error loading history:', err);
        return JSON.parse(localStorage.getItem('flora-order-history')) || [];
    }
}

export function initOrderEvents() {
    const orderBtn = document.getElementById('orderBtn');
    const waConfirmModal = document.getElementById('waConfirmModal');
    const btnAlreadySent = document.getElementById('btnAlreadySent');
    const btnNotYet = document.getElementById('btnNotYet');

    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const cartData = getCartData();
            const totalItems = Object.values(cartData).reduce((sum, qty) => sum + qty, 0);
            if (totalItems === 0) {
                showToast('🛒 Tambahkan menu dulu ya!');
                return;
            }
            if (waConfirmModal) waConfirmModal.classList.add('show');
        });
    }

    if (btnAlreadySent) {
        btnAlreadySent.addEventListener('click', async function() {
            if (orderInProgress) {
                showToast('⏳ Pesanan sedang diproses...');
                return;
            }
            orderInProgress = true;
            btnAlreadySent.disabled = true;
            btnAlreadySent.textContent = '⏳ Memproses...';

            try {
                const cartData = getCartData();
                const menuDataCache = getMenuCache();
                let calculatedTotal = 0;
                const rawItems = [];

                for (const [id, qty] of Object.entries(cartData)) {
                    const menu = menuDataCache.find(m => m.id === id);
                    if (!menu || qty <= 0) continue;
                    const price = menu.promoPrice || menu.price;
                    calculatedTotal += price * qty;
                    rawItems.push(`${menu.name} x${qty}`);
                }

                if (calculatedTotal === 0) {
                    showToast('🛒 Keranjang kosong');
                    orderInProgress = false;
                    btnAlreadySent.disabled = false;
                    btnAlreadySent.textContent = '✅ Konfirmasi Pesanan';
                    return;
                }

                const success = await saveOrderToFirestore({
                    items: rawItems.join(', '),
                    total: calculatedTotal,
                    rawItems: rawItems,
                    customerNote: '',
                    status: 'pending'
                });

                if (success) {
                    trackEvent('Ecommerce', 'checkout', 'Order Completed', calculatedTotal);
                    clearCart();
                    updateCartUI();

                    const message = encodeURIComponent(
                        'Halo Kedai Flora,\n\nSaya mau pesan:\n' +
                        rawItems.map((item, i) => `${i+1}. ${item}`).join('\n') +
                        '\n\nTotal: Rp' + calculatedTotal.toLocaleString('id-ID') +
                        '\n\nMohon dikonfirmasi setelah pembayaran.'
                    );
                    window.open(`https://wa.me/${WA_NUMBER}?text=` + message, '_blank');

                    if (waConfirmModal) waConfirmModal.classList.remove('show');
                    showToast('✅ Pesanan tercatat! Silakan bayar dan kirim bukti via WA.');

                    if (getIsAdmin()) {
                        setTimeout(() => {
                            loadPendingOrders();
                        }, 1500);
                    }
                }
            } catch (err) {
                console.error('Error saving order:', err);
                showToast('❌ Gagal menyimpan pesanan: ' + err.message);
            } finally {
                orderInProgress = false;
                btnAlreadySent.disabled = false;
                btnAlreadySent.textContent = '✅ Konfirmasi Pesanan';
            }
        });
    }

    if (btnNotYet) {
        btnNotYet.addEventListener('click', function() {
            if (waConfirmModal) waConfirmModal.classList.remove('show');
            showToast('ℹ️ Pesanan dibatalkan.');
        });
    }

    if (waConfirmModal) {
        waConfirmModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('show');
        });
    }
}

// Placeholder for dashboard stats (dipanggil dari admin panel)
async function loadDashboardStats() {
    // Will be implemented in full version
    console.log('📊 Dashboard stats loaded');
}