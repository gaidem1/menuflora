(function() {
'use strict';

// ===== TRANSLATIONS =====
const translations = {
    id: {
        eyebrow: 'Menu · ', open: '🟢 Buka Sekarang', closed: '🔴 Tutup — Buka lagi 11.00',
        brand: 'Flora', brandEm: 'Coffee', tagline: 'Kopi, camilan, dan mie — semua tersedia di sini.',
        hours: '11.00 – 23.00', days: 'Senin–Minggu', location: 'Kesugihan, Cilacap', dinein: 'Dine-in & Takeaway',
        wa: 'Pesan via WhatsApp', maps: 'Lihat di Maps', share: 'Bagikan Menu', print: 'Cetak Menu', history: 'Riwayat',
        all: 'Semua', coffee: 'Kopi', nonCoffee: 'Non Kopi', snacks: 'Camilan', noodles: 'Mie & Topping',
        search: 'Cari menu...', noResult: 'Menu tidak ditemukan. Coba kata kunci lain!',
        total: 'Total', emptyCart: 'Belum ada pesanan', orderNow: 'Pesan Sekarang',
        footerTitle: 'Mau pesan?', footerDesc: 'Kirim pesan lewat WhatsApp, sebutkan menu dan jumlahnya — kami siapkan begitu Anda tiba.',
        waFooter: 'Pesan via WhatsApp', mapsFooter: 'Lihat di Maps', printFooter: 'Cetak Menu',
        menuOfTheDay: '🌟 Hari ini rekomendasi: ', historyTitle: '📋 Riwayat Pesanan', historyEmpty: '📭 Belum ada riwayat pesanan.'
    },
    en: {
        eyebrow: 'Menu · ', open: '🟢 Open Now', closed: '🔴 Closed — Opens at 11.00',
        brand: 'Flora', brandEm: 'Coffee', tagline: 'Coffee, snacks, and noodles — all available here.',
        hours: '11.00 – 23.00', days: 'Monday–Sunday', location: 'Kesugihan, Cilacap', dinein: 'Dine-in & Takeaway',
        wa: 'Order via WhatsApp', maps: 'View on Maps', share: 'Share Menu', print: 'Print Menu', history: 'History',
        all: 'All', coffee: 'Coffee', nonCoffee: 'Non Coffee', snacks: 'Snacks', noodles: 'Noodles & Topping',
        search: 'Search menu...', noResult: 'Menu not found. Try another keyword!',
        total: 'Total', emptyCart: 'No order yet', orderNow: 'Order Now',
        footerTitle: 'Want to order?', footerDesc: 'Send a message via WhatsApp, mention the menu and quantity — we\'ll prepare it for you.',
        waFooter: 'Order via WhatsApp', mapsFooter: 'View on Maps', printFooter: 'Print Menu',
        menuOfTheDay: '🌟 Today\'s recommendation: ', historyTitle: '📋 Order History', historyEmpty: '📭 No order history yet.'
    }
};
let currentLang = 'id';

// ===== LANGUAGE FUNCTIONS =====
const updateEl = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
const updateTranslations = () => {
    const t = translations[currentLang]; if (!t) return;
    const mappings = [
        ['langEyebrow', t.eyebrow], ['langBrand', t.brand], ['langBrandEm', t.brandEm],
        ['langTagline', t.tagline], ['langHours', t.hours], ['langDays', t.days],
        ['langLocation', t.location], ['langDinein', t.dinein], ['langWa', t.wa],
        ['langMaps', t.maps], ['langShare', t.share], ['langPrint', t.print],
        ['langHistory', t.history], ['langAll', t.all], ['langCoffee', t.coffee],
        ['langNonCoffee', t.nonCoffee], ['langSnacks', t.snacks], ['langNoodles', t.noodles],
        ['langNoResult', t.noResult], ['langTotal', t.total], ['langEmptyCart', t.emptyCart],
        ['langOrderNow', t.orderNow], ['langFooterTitle', t.footerTitle], ['langFooterDesc', t.footerDesc],
        ['langWaFooter', t.waFooter], ['langMapsFooter', t.mapsFooter], ['langPrintFooter', t.printFooter],
        ['langMenuOfTheDay', t.menuOfTheDay], ['langHistoryTitle', t.historyTitle]
    ];
    mappings.forEach(([id, val]) => updateEl(id, val));
    const si = document.getElementById('searchInput');
    if (si) si.placeholder = t.search;
    updateOpenStatus();
};
const setLang = (lang) => {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    updateTranslations();
    localStorage.setItem('flora-lang', lang);
};

// ===== MENU OF THE DAY =====
const getMenuOfTheDay = () => {
    const rec = { 0:"Flora's Coffee",1:'Ice Rost Latte',2:'Mango Yakult',3:'Indomie Goreng',4:"Flora's Matcha",5:'Mix Plater',6:'Ice Lemon Tea' };
    return rec[new Date().getDay()] || "Flora's Coffee";
};
const showMenuOfTheDay = () => { const el = document.getElementById('recommendationName'); if (el) el.textContent = getMenuOfTheDay(); };

// ===== FIREBASE =====
firebase.initializeApp({
    apiKey: "AIzaSyB-0wDqKOm1bZphQ4Qglmto6O3hsvduZoA",
    authDomain: "menuflora-5d08a.firebaseapp.com", projectId: "menuflora-5d08a",
    storageBucket: "menuflora-5d08a.firebasestorage.app", messagingSenderId: "219274188593",
    appId: "1:219274188593:web:c25a9599b0ab3a88e64210"
});
const db = firebase.firestore();
const auth = firebase.auth();
db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
const ADMIN_EMAILS = ["danielalthof1@gmail.com", "kedaiflora1@gmail.com"];
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/vmny1hra/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'emvx2to2';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// ===== DOM ELEMENTS =====
const $ = id => document.getElementById(id);
const els = {
    searchInput: $('searchInput'), clearBtn: $('clearSearch'), cartSummary: $('cartSummary'),
    cartTotal: $('cartTotal'), cartDetail: $('cartDetail'), orderBtn: $('orderBtn'),
    menuContainer: $('menuContainer'), skeletonContainer: $('skeletonContainer'),
    secretTrigger: $('secretAdminTrigger'), themeToggle: $('themeToggle'), scrollBtn: $('scrollTop'),
    cartBadge: $('cartBadge'), cartMini: $('cartMini'), cartMiniBadge: $('cartMiniBadge'),
    adminSection: $('adminSection'), logoutBtn: $('logoutBtn'), adminUserEmail: $('adminUserEmail'),
    adminMenuGrid: $('adminMenuGrid'), loadingMenu: $('loadingMenu'), formTitle: $('formTitle'),
    saveBtn: $('saveBtn'), cancelBtn: $('cancelBtn'), newMenuBtn: $('newMenuBtn'),
    backupBtn: $('backupBtn'), exportReportBtn: $('exportReportBtn'), cleanGhostOrdersBtn: $('cleanGhostOrdersBtn'),
    fileInput: $('fileInput'), uploadZone: $('uploadZone'), previewWrapper: $('previewWrapper'),
    previewImage: $('previewImage'), previewStatus: $('previewStatus'), inputImage: $('inputImage'),
    inputImagePublicId: $('inputImagePublicId'), uploadProgress: $('uploadProgress'),
    progressFill: $('progressFill'), progressText: $('progressText'), removeImageBtn: $('removeImageBtn'),
    inputName: $('inputName'), inputPrice: $('inputPrice'), inputDesc: $('inputDesc'),
    inputCategory: $('inputCategory'), inputTag: $('inputTag'), inputStock: $('inputStock'),
    inputPromo: $('inputPromo'), operationalStatus: $('operationalStatus')
};

let cartData = JSON.parse(localStorage.getItem('flora-cart')) || {};
let editingId = null, isAdmin = false, searchTimeout = null, currentFile = null, isUploading = false, menuUnsubscribe = null, ordersUnsubscribe = null;

// ===== CATEGORY DATA =====
const categories = ['kopi-klasik', 'non-kopi', 'camilan', 'mie'];
const categoryNames = { 'kopi-klasik': '☕ Kopi', 'non-kopi': '🍵 Non Kopi', 'camilan': '🍽️ Camilan', 'mie': '🍜 Mie & Topping' };
const categoryDescs = { 'kopi-klasik': 'Berbagai pilihan kopi untuk menemani harimu.', 'non-kopi': 'Minuman segar tanpa kopi, dari yakult hingga matcha.', 'camilan': 'Camilan gurih untuk mengisi perut.', 'mie': 'Mie instan dengan berbagai topping pilihan.' };
const categoryIcons = { 'kopi-klasik': '☕', 'non-kopi': '🍵', 'camilan': '🍽️', 'mie': '🍜' };

const defaultMenuData = [
    { id: '1', name: 'Ice Rost Latte', desc: 'Kopi dingin dengan rasa yang segar.', price: 7000, category: 'kopi-klasik', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '2', name: "Flora's Coffee", desc: 'Kopi khas Flora dengan rasa yang khas.', price: 8000, category: 'kopi-klasik', stock: 10, tag: '⭐ Favorit', image: '', promoPrice: null },
    { id: '3', name: 'Nescafe', desc: 'Kopi sachet klasik yang nikmat.', price: 4000, category: 'kopi-klasik', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '4', name: 'Ice Tea', desc: 'Teh dingin segar.', price: 3000, category: 'non-kopi', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '5', name: 'Ice Lemon Tea', desc: 'Teh dingin dengan perasan lemon segar.', price: 5000, category: 'non-kopi', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '6', name: "Flora's Matcha", desc: 'Matcha khas Flora dengan susu segar.', price: 8000, category: 'non-kopi', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '7', name: 'All Varian Sachet', desc: 'Berbagai varian minuman sachet.', price: 5000, category: 'non-kopi', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '8', name: 'Mango Yakult', desc: 'Yakult dengan rasa mangga segar.', price: 8000, category: 'non-kopi', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '9', name: 'Strawberry Yakult', desc: 'Yakult dengan rasa stroberi segar.', price: 8000, category: 'non-kopi', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '10', name: 'All Varian Suki', desc: 'Berbagai varian suki yang gurih.', price: 2500, category: 'camilan', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '11', name: 'Sosis Bakar', desc: 'Sosis panggang yang gurih.', price: 4000, category: 'camilan', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '12', name: 'Kentang Goreng', desc: 'Kentang goreng renyah.', price: 5000, category: 'camilan', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '13', name: 'Mix Plater', desc: 'Kentang goreng dan sosis bakar.', price: 8000, category: 'camilan', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '14', name: 'Roti Bakar', desc: 'Roti panggang dengan selai.', price: 5000, category: 'camilan', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '15', name: 'Indomie Kuah', desc: 'Indomie dengan kuah hangat.', price: 6000, category: 'mie', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '16', name: 'Indomie Goreng', desc: 'Indomie goreng dengan bumbu spesial.', price: 6000, category: 'mie', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '17', name: 'Telur (Topping)', desc: 'Tambahan telur untuk mie.', price: 3000, category: 'mie', stock: 10, tag: '', image: '', promoPrice: null },
    { id: '18', name: 'Sosis (Topping)', desc: 'Tambahan sosis untuk mie.', price: 3000, category: 'mie', stock: 10, tag: '', image: '', promoPrice: null }
];

// ===== DARK MODE =====
if (localStorage.getItem('flora-theme') === 'dark') { document.documentElement.setAttribute('data-theme', 'dark'); els.themeToggle.textContent = '☀️'; }
els.themeToggle?.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('flora-theme', isDark ? 'light' : 'dark');
    this.textContent = isDark ? '🌙' : '☀️';
});

// ===== SCROLL TO TOP =====
window.addEventListener('scroll', () => els.scrollBtn?.classList.toggle('show', window.scrollY > 400));
els.scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== OPERATIONAL STATUS =====
let operationalOverride = null;
const loadOperationalStatus = async () => {
    try {
        const doc = await db.collection('settings').doc('operational').get();
        if (doc.exists) {
            operationalOverride = doc.data().status;
            if (els.operationalStatus) els.operationalStatus.value = operationalOverride || 'auto';
        }
    } catch (e) { console.log('No operational setting found'); }
};
const updateOpenStatus = () => {
    const el = $('openStatus'); if (!el) return;
    const isEn = currentLang === 'en';
    if (operationalOverride === 'open') { el.textContent = isEn ? '🟢 Open (Override)' : '🟢 Buka (Override)'; return; }
    if (operationalOverride === 'closed') { el.textContent = isEn ? '🔴 Closed (Override)' : '🔴 Tutup (Override)'; return; }
    const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false }));
    const t = translations[currentLang];
    el.textContent = (hour >= 11 && hour < 23) ? t.open : t.closed;
};
els.operationalStatus?.addEventListener('change', async function() {
    if (!isAdmin) return;
    try {
        await db.collection('settings').doc('operational').set({ status: this.value, updatedAt: firebase.firestore.FieldValue.serverTimestamp(), updatedBy: auth.currentUser?.email || 'unknown' });
        operationalOverride = this.value === 'auto' ? null : this.value;
        updateOpenStatus();
        showToast('✅ Status operasional diperbarui');
    } catch (err) { showToast('❌ Gagal: ' + err.message); }
});

// ===== SHARE & PRINT =====
$('shareBtn')?.addEventListener('click', async () => {
    const data = { title: 'Flora Coffee', url: location.href };
    if (navigator.share) await navigator.share(data).catch(() => {});
    else if (navigator.clipboard) { await navigator.clipboard.writeText(data.url); showToast('🔗 Link disalin!'); }
});
$('printBtn')?.addEventListener('click', () => window.print());
$('printFooterBtn')?.addEventListener('click', () => window.print());

// ===== SEARCH & FILTER =====
let activeCategoryFilter = 'all';
const filterMenu = () => {
    const kw = els.searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.item').forEach(item => {
        const n = item.getAttribute('data-name') || '', d = item.getAttribute('data-desc') || '';
        item.classList.toggle('hidden', !(kw === '' || n.includes(kw) || d.includes(kw)) || (activeCategoryFilter !== 'all' && item.getAttribute('data-category') !== activeCategoryFilter));
    });
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.toggle('hidden', activeCategoryFilter !== 'all' && cat.id !== activeCategoryFilter || cat.querySelectorAll('.item:not(.hidden)').length === 0);
    });
    document.querySelectorAll('.divider').forEach(d => d.style.display = activeCategoryFilter === 'all' ? '' : 'none');
    $('noResult').style.display = document.querySelectorAll('.item:not(.hidden)').length === 0 ? 'block' : 'none';
    els.clearBtn?.classList.toggle('show', kw.length > 0);
    if (kw.length > 2) { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => {}, 1000); }
    document.querySelectorAll('.item:not(.hidden) .item-name, .item:not(.hidden) .item-desc').forEach(el => {
        const orig = el.getAttribute('data-original') || el.textContent;
        el.setAttribute('data-original', orig);
        el.innerHTML = kw.length >= 2 ? orig.replace(new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>') : orig;
    });
};
document.querySelectorAll('.cat-filter-btn').forEach(btn => btn.addEventListener('click', function() {
    activeCategoryFilter = this.getAttribute('data-filter');
    document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    filterMenu();
}));
els.searchInput?.addEventListener('input', filterMenu);
els.clearBtn?.addEventListener('click', () => { els.searchInput.value = ''; filterMenu(); els.searchInput.focus(); });

// ===== CART =====
const saveCart = () => localStorage.setItem('flora-cart', JSON.stringify(cartData));
const updateCart = () => {
    let total = 0, orderList = [], hasOrder = false, newCart = {};
    document.querySelectorAll('.item').forEach(item => {
        const cb = item.querySelector('.item-checkbox'), qty = parseInt(item.querySelector('.qty-value').textContent) || 0;
        const price = parseInt(item.getAttribute('data-price')) || 0, name = item.querySelector('.item-name').textContent.trim();
        const id = item.getAttribute('data-id') || name;
        if (cb.checked && qty > 0) {
            total += price * qty;
            orderList.push(`${name} x${qty} (Rp${(price * qty).toLocaleString('id-ID')})`);
            hasOrder = true; newCart[id] = { name, qty, price };
        }
    });
    cartData = newCart; saveCart();
    if (hasOrder) {
        els.cartSummary.classList.add('show');
        els.cartTotal.textContent = 'Rp' + total.toLocaleString('id-ID');
        els.cartDetail.textContent = orderList.join(' · ');
        const msg = encodeURIComponent('Halo Flora Coffee,\n\nSaya mau pesan:\n' + orderList.map((o, i) => `${i + 1}. ${o}`).join('\n') + '\n\nTotal: Rp' + total.toLocaleString('id-ID'));
        els.orderBtn.href = 'https://wa.me/6285175012418?text=' + msg;
    } else { els.cartSummary.classList.remove('show'); }
    updateCartBadge(); updateCartMini();
};
const updateCartBadge = () => {
    if (!els.cartBadge) return;
    let t = 0;
    document.querySelectorAll('.item').forEach(i => { if (i.querySelector('.item-checkbox')?.checked) t += parseInt(i.querySelector('.qty-value')?.textContent) || 0; });
    els.cartBadge.style.display = t > 0 ? 'flex' : 'none';
    if (t > 0) { els.cartBadge.textContent = t; els.cartBadge.classList.remove('pulse'); void els.cartBadge.offsetWidth; els.cartBadge.classList.add('pulse'); }
};
const updateCartMini = () => {
    if (!els.cartMini || !els.cartMiniBadge) return;
    let t = 0;
    document.querySelectorAll('.item').forEach(i => { if (i.querySelector('.item-checkbox')?.checked) t += parseInt(i.querySelector('.qty-value')?.textContent) || 0; });
    els.cartMini.style.display = t > 0 ? 'flex' : 'none';
    if (t > 0) els.cartMiniBadge.textContent = t;
};
els.cartMini?.addEventListener('click', () => els.cartSummary.scrollIntoView({ behavior: 'smooth' }));

// ===== SAVE ORDER TO FIRESTORE =====
const saveOrderToFirestore = async (order) => {
    try {
        await db.collection('orders').add({
            items: order.items, total: order.total, rawItems: order.rawItems || [], customerNote: order.customerNote || '',
            status: order.status || 'completed', timestamp: firebase.firestore.FieldValue.serverTimestamp(), source: 'web'
        });
    } catch (err) {
        const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
        history.push({ id: Date.now(), items: order.items, total: 'Rp' + order.total.toLocaleString('id-ID'), date: new Date().toLocaleString('id-ID') });
        while (history.length > 50) history.shift();
        localStorage.setItem('flora-order-history', JSON.stringify(history));
    }
};

// ===== WHATSAPP CONFIRMATION =====
const waConfirmModal = $('waConfirmModal'), btnAlreadySent = $('btnAlreadySent'), btnNotYet = $('btnNotYet');
els.orderBtn?.addEventListener('click', () => {
    if (Object.keys(cartData).length === 0) return;
    setTimeout(() => waConfirmModal?.classList.add('show'), 400);
});
btnAlreadySent?.addEventListener('click', async () => {
    waConfirmModal?.classList.remove('show');
    const total = parseInt((els.cartTotal.textContent || '0').replace(/[^0-9]/g, '')) || 0;
    await saveOrderToFirestore({ items: els.cartDetail.textContent, total, rawItems: Object.values(cartData).map(i => `${i.name} x${i.qty}`), status: 'completed' });
    cartData = {}; saveCart(); updateCart();
    showToast('✅ Pesanan tercatat, terima kasih!');
});
btnNotYet?.addEventListener('click', () => { waConfirmModal?.classList.remove('show'); showToast('ℹ️ Selesaikan pesanan di WA saat siap'); });
waConfirmModal?.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('show'); });

// ===== ORDER HISTORY =====
const showOrderHistory = async () => {
    const container = $('historyList'); if (!container) return;
    try {
        const snap = await db.collection('orders').orderBy('timestamp', 'desc').limit(50).get();
        if (snap.empty) { container.innerHTML = `<div class="history-empty">${translations[currentLang].historyEmpty}</div>`; return; }
        container.innerHTML = snap.docs.map(d => {
            const data = d.data();
            return `<div class="history-item"><div class="date">📅 ${data.timestamp?.toDate?.()?.toLocaleString('id-ID') || 'Baru'}</div><div class="items">${data.items || ''}</div><div class="total">Total: Rp${(data.total || 0).toLocaleString('id-ID')}</div></div>`;
        }).join('');
    } catch (e) { container.innerHTML = `<div class="history-empty">Error loading history</div>`; }
};
const historyBtn = $('historyBtn'), historyModal = $('historyModal'), historyModalClose = $('historyModalClose');
historyBtn?.addEventListener('click', () => { showOrderHistory(); historyModal?.classList.add('show'); });
historyModalClose?.addEventListener('click', () => historyModal?.classList.remove('show'));
historyModal?.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('show'); });

// ===== ADMIN DASHBOARD =====
const loadDashboardStats = async () => {
    try {
        const ms = await db.collection('menu').get();
        $('statMenus').textContent = ms.size;
    } catch (e) { console.error('Dashboard error:', e); }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sod = firebase.firestore.Timestamp.fromDate(today);
    if (ordersUnsubscribe) ordersUnsubscribe();
    ordersUnsubscribe = db.collection('orders').where('timestamp', '>=', sod)
        .onSnapshot(snap => {
            let rev = 0, count = 0;
            snap.forEach(d => { const data = d.data(); if (data.status === 'completed') { rev += data.total || 0; count++; } });
            $('statOrders').textContent = count;
            $('statRevenue').textContent = 'Rp' + rev.toLocaleString('id-ID');
            $('statCustomers').textContent = count || '-';
        }, err => console.error('Dashboard stats error:', err));
    await loadSalesChart();
};
const loadSalesChart = async () => {
    const c = $('chartContainer'), b = $('chartBars');
    if (!c || !b) return;
    try {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const start = new Date(today); start.setDate(start.getDate() - 6);
        const sod = firebase.firestore.Timestamp.fromDate(start);
        const snap = await db.collection('orders').where('timestamp', '>=', sod).get();
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
            const dEnd = new Date(d.getTime() + 86400000);
            let t = 0;
            snap.forEach(doc => {
                const data = doc.data();
                if (data.status !== 'completed') return;
                const ts = data.timestamp?.toDate?.();
                if (ts && ts >= d && ts < dEnd) t += data.total || 0;
            });
            days.push({ label: d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }), total: t });
        }
        if (!days.some(d => d.total > 0)) { c.style.display = 'none'; return; }
        c.style.display = 'block';
        const mx = Math.max(...days.map(d => d.total), 1);
        b.innerHTML = days.map(d => `<div class="chart-bar-wrap"><div class="chart-bar-value">${d.total > 0 ? 'Rp' + (d.total / 1000).toFixed(0) + 'k' : ''}</div><div class="chart-bar" style="height:${(d.total / mx) * 80 + 10}px"></div><div class="chart-bar-label">${d.label}</div></div>`).join('');
    } catch (e) { c.style.display = 'none'; }
};

// ===== CLOUDINARY UPLOAD =====
const validateFile = (f) => {
    if (!f) return { valid: false, message: 'Tidak ada file' };
    if (!ALLOWED_TYPES.includes(f.type)) return { valid: false, message: '❌ Format tidak didukung' };
    if (f.size > MAX_FILE_SIZE) return { valid: false, message: '❌ File terlalu besar. Maks 5MB' };
    return { valid: true };
};
const uploadToCloudinary = async (file) => {
    const v = validateFile(file);
    if (!v.valid) { showToast(v.message); return null; }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    isUploading = true;
    els.uploadProgress.classList.remove('hidden');
    els.progressFill.style.width = '0%';
    els.progressText.textContent = '⏳ Mengupload... 0%';
    els.previewWrapper.classList.add('hidden');
    try {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', e => { if (e.lengthComputable) { const p = Math.round(e.loaded / e.total * 100); els.progressFill.style.width = p + '%'; els.progressText.textContent = `⏳ ${p}%`; } });
        const resp = await new Promise((res, rej) => {
            xhr.open('POST', CLOUDINARY_URL);
            xhr.onload = () => xhr.status === 200 ? res(JSON.parse(xhr.responseText)) : rej(new Error(xhr.statusText));
            xhr.onerror = () => rej(new Error('Network error'));
            xhr.send(fd);
        });
        isUploading = false; els.progressFill.style.width = '100%'; els.progressText.textContent = '✅ Berhasil!';
        els.previewImage.src = resp.secure_url; els.previewWrapper.classList.remove('hidden');
        els.inputImage.value = resp.secure_url; els.inputImagePublicId.value = resp.public_id || '';
        if (els.previewStatus) { els.previewStatus.textContent = '✅ Upload berhasil'; els.previewStatus.className = 'preview-status success'; }
        setTimeout(() => els.uploadProgress.classList.add('hidden'), 1500);
        showToast('✅ Gambar berhasil diupload!');
        return { url: resp.secure_url, publicId: resp.public_id };
    } catch (err) {
        isUploading = false; els.progressFill.style.width = '0%'; els.progressText.textContent = '❌ Gagal!';
        showToast('❌ Gagal upload: ' + err.message);
        return null;
    }
};

// Upload Listeners
els.fileInput?.addEventListener('change', e => { if (e.target.files[0]) uploadToCloudinary(e.target.files[0]); });
if (els.uploadZone) {
    els.uploadZone.addEventListener('click', () => { if (!isUploading && els.fileInput) els.fileInput.click(); });
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => els.uploadZone.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); }));
    els.uploadZone.addEventListener('dragover', function() { if (!isUploading) this.classList.add('dragover'); });
    els.uploadZone.addEventListener('dragleave', function() { this.classList.remove('dragover'); });
    els.uploadZone.addEventListener('drop', function(e) { this.classList.remove('dragover'); if (e.dataTransfer.files[0]) uploadToCloudinary(e.dataTransfer.files[0]); });
}
els.removeImageBtn?.addEventListener('click', function() {
    if (editingId && els.inputImage.value && !confirm('⚠️ Hapus gambar?')) return;
    els.inputImage.value = ''; els.inputImagePublicId.value = ''; els.previewWrapper.classList.add('hidden'); els.previewImage.src = '';
    if (els.fileInput) els.fileInput.value = ''; showToast('🗑️ Gambar dihapus');
});

// ===== RENDER MENU =====
const renderMenu = (data) => {
    els.skeletonContainer.style.display = 'none';
    els.menuContainer.style.display = 'block';
    els.menuContainer.innerHTML = '';
    const grouped = {};
    data.forEach(item => { if (!grouped[item.category]) grouped[item.category] = []; grouped[item.category].push(item); });
    let catIdx = 1;
    categories.forEach(catKey => {
        if (!grouped[catKey]) return;
        const sec = document.createElement('section'); sec.className = 'category'; sec.id = catKey;
        sec.innerHTML = `<div class="cat-head"><span class="cat-num">${String(catIdx).padStart(2, '0')}</span><h2>${categoryNames[catKey]}</h2></div><p class="cat-desc">${categoryDescs[catKey]}</p>`;
        grouped[catKey].forEach(item => {
            const div = document.createElement('div'); div.className = 'item';
            div.setAttribute('data-name', (item.name || '').toLowerCase());
            div.setAttribute('data-desc', (item.desc || '').toLowerCase());
            div.setAttribute('data-category', item.category || '');
            const validPromo = (item.promoPrice && !isNaN(item.promoPrice) && item.promoPrice > 0 && item.promoPrice < item.price) ? item.promoPrice : null;
            const activePrice = validPromo || item.price;
            div.setAttribute('data-price', activePrice);
            div.setAttribute('data-id', item.id);
            const thumb = document.createElement('div'); thumb.className = 'item-thumb';
            thumb.innerHTML = (item.image && item.image.trim()) ? `<img class="item-image show" src="${item.image}" alt="${item.name}" loading="lazy">` : `<div class="item-placeholder">${categoryIcons[item.category] || '☕'}</div>`;
            div.appendChild(thumb);
            const cb = document.createElement('input'); cb.type = 'checkbox'; cb.className = 'item-checkbox';
            if (item.stock === 0) { cb.disabled = true; cb.style.opacity = '0.4'; }
            div.appendChild(cb);
            const info = document.createElement('div'); info.className = 'item-info';
            const nameSpan = document.createElement('div'); nameSpan.className = 'item-name';
            nameSpan.textContent = item.name;
            if (item.tag) {
                const tagLower = item.tag.toLowerCase().replace(/[^a-z]/g, '');
                const isPromoTag = tagLower.includes('promo');
                if (!(isPromoTag && validPromo)) {
                    const tag = document.createElement('span');
                    const isFav = tagLower.includes('favorit');
                    tag.className = 'item-tag' + (isFav ? ' tag-favorit' : '');
                    tag.textContent = item.tag;
                    nameSpan.appendChild(tag);
                }
            }
            if (validPromo) { const promo = document.createElement('span'); promo.className = 'badge-promo'; promo.textContent = '🔥 Promo'; nameSpan.appendChild(promo); }
            if (item.stock === 0) { const habis = document.createElement('span'); habis.className = 'badge-habis'; habis.textContent = '⛔ Habis'; nameSpan.appendChild(habis); }
            info.appendChild(nameSpan);
            info.innerHTML += `<div class="item-desc">${item.desc || ''}</div>`;
            div.appendChild(info);
            const priceDiv = document.createElement('div'); priceDiv.className = 'item-price';
            priceDiv.innerHTML = validPromo ? `<span class="price-original">Rp${Number(item.price).toLocaleString('id-ID')}</span>Rp${Number(validPromo).toLocaleString('id-ID')}` : 'Rp' + Number(item.price).toLocaleString('id-ID');
            div.appendChild(priceDiv);
            const qtyDiv = document.createElement('div'); qtyDiv.className = 'qty-controls';
            qtyDiv.innerHTML = `<button class="qty-minus"${item.stock === 0 ? ' disabled' : ''}>−</button><span class="qty-value zero">0</span><button class="qty-plus"${item.stock === 0 ? ' disabled' : ''}>+</button>`;
            div.appendChild(qtyDiv);
            const saved = cartData[item.id];
            const qtySpan = qtyDiv.querySelector('.qty-value');
            if (saved && saved.qty > 0 && item.stock !== 0) { cb.checked = true; qtySpan.textContent = saved.qty; qtySpan.classList.remove('zero'); }
            cb.addEventListener('change', function() { if (item.stock === 0) return; const q = parseInt(qtySpan.textContent) || 0; if (!this.checked) { qtySpan.textContent = '0'; qtySpan.classList.add('zero'); } else if (q === 0) { qtySpan.textContent = '1'; qtySpan.classList.remove('zero'); } updateCart(); });
            const updateQty = (ch) => { if (item.stock === 0) return; let v = Math.max(0, Math.min(item.stock, (parseInt(qtySpan.textContent) || 0) + ch)); qtySpan.textContent = v; qtySpan.classList.toggle('zero', v === 0); cb.checked = v > 0; updateCart(); };
            qtyDiv.querySelector('.qty-minus').addEventListener('click', e => { e.stopPropagation(); updateQty(-1); });
            qtyDiv.querySelector('.qty-plus').addEventListener('click', e => { e.stopPropagation(); updateQty(1); });
            sec.appendChild(div);
        });
        els.menuContainer.appendChild(sec);
        catIdx++;
    });
    updateCart(); filterMenu();
};

// ===== LOAD MENU - FIXED! =====
const loadMenu = () => {
    els.skeletonContainer.style.display = 'block';
    els.menuContainer.style.display = 'none';
    
    if (menuUnsubscribe) menuUnsubscribe();
    menuUnsubscribe = db.collection('menu').orderBy('name').onSnapshot(async snap => {
        els.skeletonContainer.style.display = 'none';
        els.menuContainer.style.display = 'block';
        
        if (snap.empty) {
            // ✅ FIX: Simpan default data ke Firestore
            try {
                const batch = db.batch();
                defaultMenuData.forEach(item => {
                    const ref = db.collection('menu').doc(item.id);
                    batch.set(ref, item);
                });
                await batch.commit();
                console.log('✅ Default menu data saved to Firestore');
            } catch (err) {
                console.error('Error saving default data:', err);
            }
            
            renderMenu(defaultMenuData);
            if (isAdmin) renderAdminMenu(defaultMenuData);
            return;
        }
        
        const data = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data() }));
        renderMenu(data);
        if (isAdmin) renderAdminMenu(data);
    }, err => {
        console.error('Firestore error:', err);
        els.skeletonContainer.style.display = 'none';
        els.menuContainer.style.display = 'block';
        renderMenu(defaultMenuData);
        if (isAdmin) renderAdminMenu(defaultMenuData);
    });
};

// ===== ADMIN MENU =====
const renderAdminMenu = (data) => {
    if (!els.adminMenuGrid) return;
    els.loadingMenu.classList.add('hidden');
    els.adminMenuGrid.innerHTML = '';
    if (!data || !data.length) { els.adminMenuGrid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px;">Belum ada menu.</p>'; return; }
    data.forEach(item => {
        const card = document.createElement('div'); card.className = 'admin-card';
        card.innerHTML = `
            <div class="admin-card-img">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : `<div class="admin-card-placeholder">${categoryIcons[item.category] || '☕'}</div>`}
                ${item.promoPrice ? '<span class="badge-promo">🔥 Promo</span>' : ''}
                ${item.stock === 0 ? '<span class="badge-habis">⛔ Habis</span>' : ''}
            </div>
            <div class="admin-card-info">
                <h4>${item.name}</h4><p>${item.desc || ''}</p>
                <div class="admin-card-price">${item.promoPrice ? `<span class="price-original">Rp${Number(item.price).toLocaleString('id-ID')}</span> Rp${Number(item.promoPrice).toLocaleString('id-ID')}` : `Rp${Number(item.price).toLocaleString('id-ID')}`}</div>
                <div class="admin-card-meta"><span>${categoryNames[item.category] || item.category}</span>${item.tag ? `<span class="tag tag-${item.tag.toLowerCase().replace(/[^a-z]/g, '')}">${item.tag}</span>` : ''}</div>
            </div>
            <div class="admin-card-stock">
                <button onclick="quickUpdateStock('${item.id}',-1)">−</button>
                <span>Stok: ${item.stock ?? 10}</span>
                <button onclick="quickUpdateStock('${item.id}',1)">+</button>
            </div>
            <div class="admin-card-actions">
                <button class="btn btn-sm" onclick="editMenuItem('${item.id}')">✏️ Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteMenuItem('${item.id}','${item.name}')">🗑️</button>
            </div>`;
        els.adminMenuGrid.appendChild(card);
    });
};
window.quickUpdateStock = async (id, ch) => {
    if (!isAdmin) return;
    const doc = await db.collection('menu').doc(id).get();
    if (!doc.exists) return;
    const ns = Math.max(0, (doc.data().stock || 0) + ch);
    await db.collection('menu').doc(id).update({ stock: ns, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast(`✅ Stok: ${ns}`);
};

// ===== CRUD =====
window.editMenuItem = (id) => {
    if (!isAdmin) return;
    db.collection('menu').doc(id).get().then(doc => {
        if (!doc.exists) return;
        const d = doc.data(); editingId = id;
        els.formTitle.textContent = '✏️ Edit Menu'; els.saveBtn.textContent = '💾 Update Menu';
        els.inputName.value = d.name || ''; els.inputPrice.value = d.price || ''; els.inputDesc.value = d.desc || '';
        els.inputCategory.value = d.category || 'kopi-klasik'; els.inputTag.value = d.tag || '';
        els.inputStock.value = d.stock ?? 10; els.inputPromo.value = d.promoPrice || '';
        if (d.image) { els.inputImage.value = d.image; els.inputImagePublicId.value = d.imagePublicId || ''; els.previewImage.src = d.image; els.previewWrapper.classList.remove('hidden'); }
        else { els.previewWrapper.classList.add('hidden'); els.inputImage.value = ''; }
        $('formCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
};
window.deleteMenuItem = (id, name) => {
    if (!isAdmin) return;
    if (prompt(`Ketik "HAPUS" untuk menghapus "${name}":`) !== 'HAPUS') { showToast('Dibatalkan'); return; }
    db.collection('menu').doc(id).delete().then(() => showToast('✅ Dihapus'));
};

// ===== FORM SAVE =====
const resetForm = () => {
    editingId = null; els.formTitle.textContent = '📝 Tambah Menu Baru'; els.saveBtn.textContent = '💾 Simpan Menu';
    els.inputName.value = ''; els.inputPrice.value = ''; els.inputDesc.value = ''; els.inputCategory.value = 'kopi-klasik';
    els.inputTag.value = ''; els.inputStock.value = '10'; els.inputPromo.value = '';
    els.inputImage.value = ''; els.inputImagePublicId.value = ''; els.previewWrapper.classList.add('hidden'); els.previewImage.src = '';
    currentFile = null; if (els.fileInput) els.fileInput.value = '';
};
els.newMenuBtn?.addEventListener('click', resetForm);
els.cancelBtn?.addEventListener('click', resetForm);
els.saveBtn?.addEventListener('click', async () => {
    if (!isAdmin) return;
    const name = els.inputName.value.trim(), price = parseInt(els.inputPrice.value), desc = els.inputDesc.value.trim();
    const category = els.inputCategory.value, tag = els.inputTag.value.trim(), stock = parseInt(els.inputStock.value);
    const image = els.inputImage.value.trim(), imagePublicId = els.inputImagePublicId.value.trim();
    if (!name) { showToast('❌ Nama wajib'); els.inputName.focus(); return; }
    if (isNaN(price) || price < 0) { showToast('❌ Harga tidak valid'); els.inputPrice.focus(); return; }
    if (isNaN(stock) || stock < 0) { showToast('❌ Stok tidak valid'); els.inputStock.focus(); return; }
    let promoPrice = null;
    if (els.inputPromo.value && els.inputPromo.value.trim() !== '') {
        const parsed = parseInt(els.inputPromo.value);
        if (isNaN(parsed) || parsed <= 0) { showToast('❌ Harga promo harus angka positif'); els.inputPromo.focus(); return; }
        if (parsed >= price) { showToast('❌ Harga promo harus lebih kecil dari harga normal'); els.inputPromo.focus(); return; }
        promoPrice = parsed;
    }
    const data = { name, price, desc, category, tag, stock, promoPrice, image, imagePublicId, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
    try {
        if (editingId) { await db.collection('menu').doc(editingId).update(data); showToast('✅ Updated!'); }
        else { data.createdAt = firebase.firestore.FieldValue.serverTimestamp(); await db.collection('menu').doc(Date.now().toString()).set(data); showToast('✅ Ditambahkan!'); }
        resetForm(); loadDashboardStats();
    } catch (err) { showToast('❌ Gagal: ' + err.message); }
});

// ===== AUTH =====
auth.onAuthStateChanged(user => {
    if (user && ADMIN_EMAILS.includes(user.email)) {
        isAdmin = true; els.adminSection.classList.remove('admin-hidden'); els.adminSection.style.display = 'block';
        els.adminUserEmail.textContent = user.email; loadDashboardStats(); loadOperationalStatus(); 
        // Reload menu for admin
        loadMenu();
    } else {
        isAdmin = false; els.adminSection.classList.add('admin-hidden'); els.adminSection.style.display = 'none';
        if (ordersUnsubscribe) { ordersUnsubscribe(); ordersUnsubscribe = null; }
    }
});
let tapCount = 0, tapTimer = null;
els.secretTrigger?.addEventListener('click', function() {
    tapCount++; if (tapTimer) clearTimeout(tapTimer); tapTimer = setTimeout(() => tapCount = 0, 1000);
    if (tapCount >= 5) { tapCount = 0; if (!isAdmin) auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => { if (!ADMIN_EMAILS.includes(r.user.email)) { showToast('❌ Bukan admin'); auth.signOut(); } else showToast('✅ Welcome Admin!'); }); }
});
els.logoutBtn?.addEventListener('click', () => auth.signOut().then(() => showToast('👋 Logout')));

// ===== BACKUP & EXPORT =====
els.backupBtn?.addEventListener('click', () => {
    if (!isAdmin) return;
    db.collection('menu').get().then(s => { const d = []; s.forEach(doc => d.push({ id: doc.id, ...doc.data() })); const b = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'flora-backup.json'; a.click(); showToast('✅ Backup!'); });
});
els.exportReportBtn?.addEventListener('click', async () => {
    if (!isAdmin) return;
    try {
        const snap = await db.collection('orders').where('status', '==', 'completed').get();
        const rows = [['Tanggal', 'Total', 'Items']];
        const docs = [...snap.docs].sort((a, b) => (b.data().timestamp?.toMillis?.() || 0) - (a.data().timestamp?.toMillis?.() || 0)).slice(0, 200);
        docs.forEach(d => { const data = d.data(); rows.push([data.timestamp?.toDate?.()?.toLocaleString('id-ID') || '-', 'Rp' + (data.total || 0).toLocaleString('id-ID'), data.items || '-']); });
        const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'flora-report.csv'; a.click();
    } catch (e) { showToast('❌ Gagal export: ' + e.message); }
});

// ===== CLEAN GHOST ORDERS =====
els.cleanGhostOrdersBtn?.addEventListener('click', async () => {
    if (!isAdmin) return;
    els.cleanGhostOrdersBtn.disabled = true; els.cleanGhostOrdersBtn.textContent = '⏳ Memeriksa...';
    try {
        const snap = await db.collection('orders').get();
        const ghosts = []; snap.forEach(d => { if (d.data().status !== 'completed') ghosts.push(d.id); });
        if (!ghosts.length) { showToast('✅ Database bersih'); return; }
        if (!confirm(`Hapus ${ghosts.length} ghost order?`)) return;
        for (let i = 0; i < ghosts.length; i += 500) { const b = db.batch(); ghosts.slice(i, i + 500).forEach(id => b.delete(db.collection('orders').doc(id))); await b.commit(); }
        showToast(`✅ ${ghosts.length} ghost order dihapus`); loadDashboardStats();
    } catch (e) { showToast('❌ Gagal: ' + e.message); }
    finally { els.cleanGhostOrdersBtn.disabled = false; els.cleanGhostOrdersBtn.textContent = '🧹 Bersihkan Ghost Orders Lama'; }
});

// ===== TOAST =====
const showToast = (msg, dur = 3000) => {
    const ex = document.querySelector('.toast'); if (ex) ex.remove();
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, dur);
};

// ===== KEYBOARD & NETWORK =====
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (els.searchInput.value) { els.searchInput.value = ''; filterMenu(); } historyModal?.classList.remove('show'); waConfirmModal?.classList.remove('show'); }
});
window.addEventListener('online', () => { showToast('🔄 Online!'); loadMenu(); });
window.addEventListener('offline', () => showToast('⚠️ Offline'));

// ===== INIT =====
setLang(localStorage.getItem('flora-lang') || 'id');
loadMenu(); showMenuOfTheDay(); loadOperationalStatus();
console.log('🌿 Flora Coffee v3.0 — Compact Edition');

})();
