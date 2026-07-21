// ============================================
// MAIN APP — KEDAI FLORA
// ============================================
import { db, auth } from './config/firebase.js';
import { defaultMenuData } from './config/constants.js';
import { setLang, updateTranslations } from './core/translations.js';
import { getCartData, updateCartUI, renderCartDropdown } from './core/cart.js';
import { renderMenu, filterMenu, setActiveFilter } from './core/menu.js';
import { 
    initAdmin, getIsAdmin, setIsAdmin, 
    loadMenuForAdmin, renderAdminMenu, editMenuItem, deleteMenuItem,
    initAdminEvents, resetForm 
} from './core/admin.js';
import { 
    initOrderEvents, loadPendingOrders, confirmOrder, cancelOrder,
    loadOrderHistoryFromFirestore 
} from './core/orders.js';
import { 
    initTheme, initScrollToTop, initShare, showMenuOfTheDay,
    initKeyboardShortcuts, initNetworkStatus, initHistoryModal
} from './core/ui.js';
import { showToast, trackEvent, getOrCreateDeviceId } from './utils/helpers.js';
import { getCurrentLang } from './core/translations.js';

// ============================================
// GLOBAL VARIABLES
// ============================================
let menuUnsubscribe = null;
const deviceId = getOrCreateDeviceId();

// ============================================
// MENU LOADING
// ============================================
function loadMenu() {
    const skeletonContainer = document.getElementById('skeletonContainer');
    const menuContainer = document.getElementById('menuContainer');
    skeletonContainer.style.display = 'block';
    menuContainer.style.display = 'none';
    if (menuUnsubscribe) menuUnsubscribe();

    menuUnsubscribe = db.collection('menu').orderBy('name').onSnapshot(snapshot => {
        skeletonContainer.style.display = 'none';
        menuContainer.style.display = 'block';
        if (snapshot.empty) {
            defaultMenuData.forEach(item => {
                db.collection('menu').doc(item.id).set(item).catch(() => {});
            });
            renderMenu(defaultMenuData);
            if (getIsAdmin()) renderAdminMenu(defaultMenuData);
            return;
        }
        const data = [];
        snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
        renderMenu(data);
        if (getIsAdmin()) renderAdminMenu(data);
    }, (error) => {
        console.error('Firestore error:', error);
        skeletonContainer.style.display = 'none';
        menuContainer.style.display = 'block';
        renderMenu(defaultMenuData);
        if (getIsAdmin()) renderAdminMenu(defaultMenuData);
    });
}

// ============================================
// GLOBAL EVENT DELEGATION
// ============================================
document.addEventListener('click', function(e) {
    // Admin edit
    const editBtn = e.target.closest('.admin-edit-btn');
    if (editBtn) {
        editMenuItem(editBtn.dataset.id);
        return;
    }

    // Admin delete
    const deleteBtn = e.target.closest('.admin-delete-btn');
    if (deleteBtn) {
        deleteMenuItem(deleteBtn.dataset.id, deleteBtn.dataset.name);
        return;
    }

    // Stock change
    const stockBtn = e.target.closest('.stock-change-btn');
    if (stockBtn) {
        const id = stockBtn.dataset.id;
        const change = parseInt(stockBtn.dataset.change) || 0;
        quickUpdateStock(id, change);
        return;
    }

    // Confirm order
    const confirmBtn = e.target.closest('.pending-confirm-btn');
    if (confirmBtn) {
        confirmOrder(confirmBtn.dataset.id);
        return;
    }

    // Cancel order
    const cancelBtn = e.target.closest('.pending-cancel-btn');
    if (cancelBtn) {
        cancelOrder(cancelBtn.dataset.id);
        return;
    }
});

// ============================================
// QUICK STOCK UPDATE (Admin)
// ============================================
async function quickUpdateStock(id, change) {
    if (!getIsAdmin()) { showToast('❌ Hanya admin yang bisa mengubah stok'); return; }
    try {
        const doc = await db.collection('menu').doc(id).get();
        if (!doc.exists) { showToast('❌ Menu tidak ditemukan'); return; }
        const currentStock = doc.data().stock || 0;
        const newStock = Math.max(0, currentStock + change);
        await db.collection('menu').doc(id).update({
            stock: newStock,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showToast(`✅ Stok diperbarui menjadi ${newStock}`);
        trackEvent('Admin', 'quick_stock_update', `${id}: ${currentStock}→${newStock}`);
    } catch (err) {
        showToast('❌ Gagal update stok: ' + err.message);
    }
}

// ============================================
// SHOW ORDER HISTORY
// ============================================
async function showOrderHistory() {
    const history = await loadOrderHistoryFromFirestore();
    const container = document.getElementById('historyList');
    if (!container) return;

    container.innerHTML = '';
    if (history.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'history-empty';
        empty.textContent = '📭 Belum ada riwayat pesanan.';
        container.appendChild(empty);
        return;
    }

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="date">📅 ${item.date}</div>
            <div class="items">${Array.isArray(item.items) ? item.items.map(i => `${i.name} x${i.qty}`).join(', ') : '-'}</div>
            <div class="total">Total: ${item.total}</div>
            ${item.customerNote ? `<div style="font-size:12px;color:var(--text-muted);font-style:italic;margin-top:2px;">📝 ${item.customerNote}</div>` : ''}
            <span class="status-badge ${item.status}">${
                item.status === 'pending' ? '⏳ Menunggu konfirmasi' :
                item.status === 'completed' ? '✅ Selesai' :
                item.status === 'cancelled' ? '❌ Dibatalkan' : `📌 ${item.status}`
            }</span>
        `;
        container.appendChild(div);
    });
}

// ============================================
// CART DROPDOWN TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cartMini = document.getElementById('cartMini');
    const cartDropdown = document.getElementById('cartDropdown');

    if (cartMini) {
        cartMini.addEventListener('click', function(e) {
            e.stopPropagation();
            const cartData = getCartData();
            if (Object.keys(cartData).length === 0 || Object.values(cartData).every(q => q <= 0)) {
                showToast('🛒 Keranjang kosong');
                return;
            }
            if (!cartDropdown) return;
            cartDropdown.classList.toggle('show');
            renderCartDropdown();
        });
    }

    document.addEventListener('click', function(e) {
        if (cartDropdown && !cartDropdown.contains(e.target) && e.target !== cartMini && !cartMini.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });
});

// ============================================
// SECRET ADMIN TRIGGER
// ============================================
let tapCount = 0;
let tapTimer = null;
document.addEventListener('DOMContentLoaded', function() {
    const secretTrigger = document.getElementById('secretAdminTrigger');
    if (secretTrigger) {
        secretTrigger.addEventListener('click', function() {
            tapCount++;
            if (tapTimer) clearTimeout(tapTimer);
            tapTimer = setTimeout(() => { tapCount = 0; }, 1000);
            if (tapCount >= 5) {
                tapCount = 0;
                if (!getIsAdmin()) {
                    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                        .then(result => {
                            if (ADMIN_EMAILS.includes(result.user.email)) {
                                showToast('✅ Selamat datang Admin!');
                                trackEvent('Auth', 'admin_login_popup', result.user.email);
                            } else {
                                showToast('❌ Email tidak terdaftar sebagai admin');
                                auth.signOut();
                            }
                        })
                        .catch(err => {
                            showToast('❌ Gagal login: ' + err.message);
                        });
                } else {
                    showToast('👋 Anda sudah login sebagai admin');
                }
            }
        });
    }
});

// ============================================
// INIT
// ============================================
function init() {
    // Language
    const savedLang = localStorage.getItem('flora-lang') || 'id';
    setLang(savedLang);

    // UI Components
    initTheme();
    initScrollToTop();
    initShare();
    initKeyboardShortcuts();
    initNetworkStatus();
    initHistoryModal();

    // Admin
    initAdmin();
    initAdminEvents();

    // Orders
    initOrderEvents();

    // Load data
    loadMenu();
    showMenuOfTheDay();
    updateCartUI();

    // Auto-refresh every 5 minutes
    setInterval(() => {
        if (navigator.onLine) {
            loadMenu();
            if (getIsAdmin()) {
                loadMenuForAdmin();
                loadPendingOrders();
            }
        }
    }, 300000);

    console.log('🌿 Kedai Flora Menu v3.3 — Modular version');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}