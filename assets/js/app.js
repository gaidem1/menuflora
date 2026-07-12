// ============================================
// 🔥 FASE 3 — ADVANCED FEATURES
// ============================================

// ============================================
// 1. ORDER HISTORY (Riwayat Pesanan)
// ============================================

function saveOrderHistory(order) {
    const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
    history.push({
        id: Date.now(),
        items: order.items,
        total: order.total,
        date: new Date().toLocaleString('id-ID')
    });
    // Maksimal 50 riwayat
    while (history.length > 50) {
        history.shift();
    }
    localStorage.setItem('flora-order-history', JSON.stringify(history));
}

function showOrderHistory() {
    const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
    const container = document.getElementById('historyList');
    if (!container) return;

    if (history.length === 0) {
        container.innerHTML = `<div class="history-empty">📭 Belum ada riwayat pesanan.</div>`;
        return;
    }

    // Tampilkan dari yang terbaru
    const reversed = [...history].reverse();
    container.innerHTML = reversed.map(item => `
        <div class="history-item">
            <div class="date">📅 ${item.date}</div>
            <div class="items">${item.items}</div>
            <div class="total">Total: ${item.total}</div>
        </div>
    `).join('');
}

// History Modal
const historyBtn = document.getElementById('historyBtn');
const historyModal = document.getElementById('historyModal');
const historyModalClose = document.getElementById('historyModalClose');

if (historyBtn) {
    historyBtn.addEventListener('click', function() {
        showOrderHistory();
        historyModal.classList.add('show');
        trackEvent('Engagement', 'view_history');
    });
}

if (historyModalClose) {
    historyModalClose.addEventListener('click', function() {
        historyModal.classList.remove('show');
    });
}

// Close modal on outside click
if (historyModal) {
    historyModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
}

// Update order history saat pesan
// Tambahkan di updateCart() - saat hasOrder true
// saveOrderHistory({ items: orderList.join(' · '), total: 'Rp' + total.toLocaleString('id-ID') });

// ============================================
// 2. FLOATING CART MINI
// ============================================

function updateCartMini() {
    const mini = document.getElementById('cartMini');
    const badge = document.getElementById('cartMiniBadge');
    if (!mini || !badge) return;

    let totalItems = 0;
    document.querySelectorAll('.item').forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        const qtySpan = item.querySelector('.qty-value');
        if (checkbox && checkbox.checked) {
            totalItems += parseInt(qtySpan?.textContent) || 0;
        }
    });

    if (totalItems > 0) {
        mini.style.display = 'flex';
        badge.textContent = totalItems;
    } else {
        mini.style.display = 'none';
    }
}

// Click cart mini scroll to cart
if (document.getElementById('cartMini')) {
    document.getElementById('cartMini').addEventListener('click', function() {
        document.getElementById('cartSummary').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// 3. SEARCH HIGHLIGHT
// ============================================

function highlightText(text, keyword) {
    if (!keyword || keyword.length < 2) return text;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Override filterMenu untuk highlight
const originalFilterMenu = filterMenu;
filterMenu = function() {
    // Panggil filter asli
    originalFilterMenu();

    // Highlight hasil pencarian
    const keyword = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.item:not(.hidden) .item-name, .item:not(.hidden) .item-desc').forEach(el => {
        // Skip jika sudah ada mark
        const original = el.getAttribute('data-original') || el.textContent;
        el.setAttribute('data-original', original);
        if (keyword.length >= 2) {
            el.innerHTML = highlightText(original, keyword);
        } else {
            el.innerHTML = original;
        }
    });
};

// ============================================
// 4. ADMIN DASHBOARD
// ============================================

async function loadDashboardStats() {
    try {
        // Total menu dari Firestore
        const menuSnapshot = await db.collection('menu').get();
        const statMenus = document.getElementById('statMenus');
        if (statMenus) statMenus.textContent = menuSnapshot.size;

        // Data dari localStorage
        const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
        const today = new Date().toDateString();
        const todayOrders = history.filter(item => {
            // Parse date dari string "MM/DD/YYYY, HH:MM:SS"
            const dateStr = item.date;
            try {
                const dateObj = new Date(dateStr);
                return dateObj.toDateString() === today;
            } catch {
                return false;
            }
        });

        const statOrders = document.getElementById('statOrders');
        if (statOrders) statOrders.textContent = todayOrders.length;

        // Pendapatan hari ini
        const totalRevenue = todayOrders.reduce((sum, order) => {
            const totalStr = order.total.replace(/[^0-9]/g, '');
            const total = parseInt(totalStr) || 0;
            return sum + total;
        }, 0);

        const statRevenue = document.getElementById('statRevenue');
        if (statRevenue) statRevenue.textContent = 'Rp' + totalRevenue.toLocaleString('id-ID');

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Panggil saat admin login (di auth.onAuthStateChanged)
// Tambahkan setelah renderAdminMenu(data)
// loadDashboardStats();

// ============================================
// 5. UPDATE CART - OVERRIDE
// ============================================

// Override updateCart untuk include history & mini cart
const originalUpdateCart = updateCart;
updateCart = function() {
    const allItems = document.querySelectorAll('.item');
    let total = 0;
    let orderList = [];
    let hasOrder = false;
    let newCart = {};

    allItems.forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        const qtySpan = item.querySelector('.qty-value');
        const qty = parseInt(qtySpan.textContent) || 0;
        const price = parseInt(item.getAttribute('data-price')) || 0;
        const name = item.querySelector('.item-name').textContent.trim();
        const id = item.getAttribute('data-id') || name;

        if (checkbox.checked && qty > 0) {
            const subtotal = price * qty;
            total += subtotal;
            orderList.push(`${name} x${qty} (Rp${(price * qty).toLocaleString('id-ID')})`);
            hasOrder = true;
            newCart[id] = { name, qty, price };
        }
    });

    cartData = newCart;
    saveCart();

    if (hasOrder) {
        cartSummary.classList.add('show');
        cartTotal.textContent = 'Rp' + total.toLocaleString('id-ID');
        cartDetail.textContent = orderList.join(' · ') || 'Belum ada pesanan';
        const message = encodeURIComponent(
            'Halo Flora Coffee,\n\nSaya mau pesan:\n' +
            orderList.map((item, i) => `${i+1}. ${item}`).join('\n') +
            '\n\nTotal: Rp' + total.toLocaleString('id-ID')
        );
        orderBtn.href = 'https://wa.me/6285175012418?text=' + message;

        // Simpan riwayat (hanya jika order berubah)
        const historyKey = 'flora-last-order';
        const lastOrder = localStorage.getItem(historyKey);
        const currentOrder = orderList.join('|') + total;
        if (lastOrder !== currentOrder) {
            saveOrderHistory({
                items: orderList.join(' · '),
                total: 'Rp' + total.toLocaleString('id-ID')
            });
            localStorage.setItem(historyKey, currentOrder);
        }

    } else {
        cartSummary.classList.remove('show');
    }

    updateCartBadge();
    updateCartMini();
};

// ============================================
// 6. CALLBACK PADA AUTH
// ============================================

// Update dashboard saat admin login (tambahkan di auth.onAuthStateChanged)
// Cari bagian `auth.onAuthStateChanged` dan tambahkan:
// if (isAdmin) { loadDashboardStats(); }

// ============================================
// 7. INIT
// ============================================

// Update cart mini setiap 2 detik
setInterval(updateCartMini, 2000);
