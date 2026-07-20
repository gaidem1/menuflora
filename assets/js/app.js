(function() {
    'use strict';

    // ============================================
    // TRANSLATIONS
    // ============================================
    const translations = {
        'id': {
            eyebrow: 'Menu · ',
            open: '🟢 Buka Sekarang',
            closed: '🔴 Tutup — Buka lagi 11.00',
            brand: 'Flora',
            brandEm: 'Coffee',
            tagline: 'Kopi, camilan, dan mie — semua tersedia di sini.',
            hours: '11.00 – 23.00',
            days: 'Senin–Minggu',
            location: 'Kesugihan, Cilacap',
            dinein: 'Dine-in & Takeaway',
            wa: 'Pesan via WhatsApp',
            maps: 'Lihat di Maps',
            share: 'Bagikan Menu',
            print: 'Cetak Menu',
            history: 'Riwayat',
            all: 'Semua',
            coffee: 'Kopi',
            nonCoffee: 'Non Kopi',
            snacks: 'Camilan',
            noodles: 'Mie & Topping',
            search: 'Cari menu...',
            noResult: 'Menu tidak ditemukan. Coba kata kunci lain!',
            total: 'Total',
            emptyCart: 'Belum ada pesanan',
            orderNow: 'Pesan Sekarang',
            footerTitle: 'Mau pesan?',
            footerDesc: 'Kirim pesan lewat WhatsApp, sebutkan menu dan jumlahnya — kami siapkan begitu Anda tiba.',
            waFooter: 'Pesan via WhatsApp',
            mapsFooter: 'Lihat di Maps',
            printFooter: 'Cetak Menu',
            menuOfTheDay: '🌟 Hari ini rekomendasi: ',
            historyTitle: '📋 Riwayat Pesanan',
            historyEmpty: '📭 Belum ada riwayat pesanan.'
        },
        'en': {
            eyebrow: 'Menu · ',
            open: '🟢 Open Now',
            closed: '🔴 Closed — Opens at 11.00',
            brand: 'Flora',
            brandEm: 'Coffee',
            tagline: 'Coffee, snacks, and noodles — all available here.',
            hours: '11.00 – 23.00',
            days: 'Monday–Sunday',
            location: 'Kesugihan, Cilacap',
            dinein: 'Dine-in & Takeaway',
            wa: 'Order via WhatsApp',
            maps: 'View on Maps',
            share: 'Share Menu',
            print: 'Print Menu',
            history: 'History',
            all: 'All',
            coffee: 'Coffee',
            nonCoffee: 'Non Coffee',
            snacks: 'Snacks',
            noodles: 'Noodles & Topping',
            search: 'Search menu...',
            noResult: 'Menu not found. Try another keyword!',
            total: 'Total',
            emptyCart: 'No order yet',
            orderNow: 'Order Now',
            footerTitle: 'Want to order?',
            footerDesc: 'Send a message via WhatsApp, mention the menu and quantity — we\'ll prepare it for you.',
            waFooter: 'Order via WhatsApp',
            mapsFooter: 'View on Maps',
            printFooter: 'Print Menu',
            menuOfTheDay: '🌟 Today\'s recommendation: ',
            historyTitle: '📋 Order History',
            historyEmpty: '📭 No order history yet.'
        }
    };

    let currentLang = 'id';

    // ============================================
    // LANGUAGE FUNCTIONS
    // ============================================
    function setLang(lang) {
        currentLang = lang;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        updateTranslations();
        if (typeof trackEvent === 'function') {
            trackEvent('Language', 'switch', lang);
        }
        localStorage.setItem('flora-lang', lang);
        console.log('✅ Language set to:', lang);
    }

    function updateTranslations() {
        const t = translations[currentLang];
        if (!t) return;

        const elements = {
            'langEyebrow': t.eyebrow,
            'langBrand': t.brand,
            'langBrandEm': t.brandEm,
            'langTagline': t.tagline,
            'langHours': t.hours,
            'langDays': t.days,
            'langLocation': t.location,
            'langDinein': t.dinein,
            'langWa': t.wa,
            'langMaps': t.maps,
            'langShare': t.share,
            'langPrint': t.print,
            'langHistory': t.history,
            'langAll': t.all,
            'langCoffee': t.coffee,
            'langNonCoffee': t.nonCoffee,
            'langSnacks': t.snacks,
            'langNoodles': t.noodles,
            'langNoResult': t.noResult,
            'langTotal': t.total,
            'langEmptyCart': t.emptyCart,
            'langOrderNow': t.orderNow,
            'langFooterTitle': t.footerTitle,
            'langFooterDesc': t.footerDesc,
            'langWaFooter': t.waFooter,
            'langMapsFooter': t.mapsFooter,
            'langPrintFooter': t.printFooter,
            'langMenuOfTheDay': t.menuOfTheDay,
            'langHistoryTitle': t.historyTitle
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t.search;

        updateOpenStatus();
    }

    // ============================================
    // MENU OF THE DAY
    // ============================================
    function getMenuOfTheDay() {
        const day = new Date().getDay();
        const recommendations = {
            0: "Flora's Coffee",
            1: 'Ice Rost Latte',
            2: 'Mango Yakult',
            3: 'Indomie Goreng',
            4: "Flora's Matcha",
            5: 'Mix Plater',
            6: 'Ice Lemon Tea'
        };
        return recommendations[day] || "Flora's Coffee";
    }

    function showMenuOfTheDay() {
        const el = document.getElementById('recommendationName');
        if (el) el.textContent = getMenuOfTheDay();
    }

    // ============================================
    // FIREBASE KONFIGURASI
    // ============================================
    const firebaseConfig = {
        apiKey: "AIzaSyB-0wDqKOm1bZphQ4Qglmto6O3hsvduZoA",
        authDomain: "menuflora-5d08a.firebaseapp.com",
        projectId: "menuflora-5d08a",
        storageBucket: "menuflora-5d08a.firebasestorage.app",
        messagingSenderId: "219274188593",
        appId: "1:219274188593:web:c25a9599b0ab3a88e64210"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    // ============================================
    // OFFLINE PERSISTENCE
    // ============================================
    db.enablePersistence({ synchronizeTabs: true }).catch(() => {});

    // ============================================
    // ADMIN EMAIL VALIDATION
    // ============================================
    const ADMIN_EMAILS = ["danielalthof1@gmail.com", "kedaiflora1@gmail.com"];

    // ============================================
    // CLOUDINARY KONFIGURASI
    // ============================================
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/vmny1hra/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'emvx2to2';
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    const cartSummary = document.getElementById('cartSummary');
    const cartTotal = document.getElementById('cartTotal');
    const cartDetail = document.getElementById('cartDetail');
    const orderBtn = document.getElementById('orderBtn');
    const menuContainer = document.getElementById('menuContainer');
    const skeletonContainer = document.getElementById('skeletonContainer');
    const secretTrigger = document.getElementById('secretAdminTrigger');
    const themeToggle = document.getElementById('themeToggle');
    const scrollBtn = document.getElementById('scrollTop');
    const cartBadge = document.getElementById('cartBadge');
    const cartMini = document.getElementById('cartMini');
    const cartMiniBadge = document.getElementById('cartMiniBadge');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartDropdownContent = document.getElementById('cartDropdownContent');

    const adminSection = document.getElementById('adminSection');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminUserEmail = document.getElementById('adminUserEmail');
    const adminMenuGrid = document.getElementById('adminMenuGrid');
    const loadingMenu = document.getElementById('loadingMenu');
    const formTitle = document.getElementById('formTitle');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const newMenuBtn = document.getElementById('newMenuBtn');
    const backupBtn = document.getElementById('backupBtn');
    const exportReportBtn = document.getElementById('exportReportBtn');
    const cleanGhostOrdersBtn = document.getElementById('cleanGhostOrdersBtn');

    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');
    const previewWrapper = document.getElementById('previewWrapper');
    const previewImage = document.getElementById('previewImage');
    const previewStatus = document.getElementById('previewStatus');
    const inputImage = document.getElementById('inputImage');
    const inputImagePublicId = document.getElementById('inputImagePublicId');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const removeImageBtn = document.getElementById('removeImageBtn');

    const inputName = document.getElementById('inputName');
    const inputPrice = document.getElementById('inputPrice');
    const inputDesc = document.getElementById('inputDesc');
    const inputCategory = document.getElementById('inputCategory');
    const inputTag = document.getElementById('inputTag');
    const inputStock = document.getElementById('inputStock');
    const inputPromo = document.getElementById('inputPromo');
    const operationalStatus = document.getElementById('operationalStatus');

    // ===== CART DATA: sekarang { id: qty } =====
    let cartData = JSON.parse(localStorage.getItem('flora-cart')) || {};
    // Jika cartData masih dalam format lama (objek dengan name, qty, price), migrasi
    // Asumsikan jika nilai pertama adalah objek dengan properti qty, maka sudah format baru
    // Jika tidak, kita konversi.
    const firstKey = Object.keys(cartData)[0];
    if (firstKey && typeof cartData[firstKey] === 'object' && cartData[firstKey].qty !== undefined) {
        // Format lama, konversi ke { id: qty }
        const newCart = {};
        for (const [id, item] of Object.entries(cartData)) {
            if (item.qty > 0) newCart[id] = item.qty;
        }
        cartData = newCart;
        localStorage.setItem('flora-cart', JSON.stringify(cartData));
    }

    let editingId = null;
    let isAdmin = false;
    let searchTimeout = null;
    let currentFile = null;
    let isUploading = false;
    let menuUnsubscribe = null;
    let menuDataCache = [];
    let lastOrderSubmitTime = 0;
    let orderInProgress = false;

    // ============================================
    // CATEGORY DATA
    // ============================================
    const categories = ['kopi-klasik', 'non-kopi', 'camilan', 'mie'];
    const categoryNames = {
        'kopi-klasik': '☕ Kopi',
        'non-kopi': '🍵 Non Kopi',
        'camilan': '🍽️ Camilan',
        'mie': '🍜 Mie & Topping'
    };
    const categoryDescs = {
        'kopi-klasik': 'Berbagai pilihan kopi untuk menemani harimu.',
        'non-kopi': 'Minuman segar tanpa kopi, dari yakult hingga matcha.',
        'camilan': 'Camilan gurih untuk mengisi perut.',
        'mie': 'Mie instan dengan berbagai topping pilihan.'
    };
    const categoryIcons = {
        'kopi-klasik': '☕',
        'non-kopi': '🍵',
        'camilan': '🍽️',
        'mie': '🍜'
    };

    // ============================================
    // HELPERS
    // ============================================
    function cleanNameFromEmoji(name) {
        if (!name) return '';
        const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FEFF}\u{1F1E0}-\u{1F1FF}]/gu;
        return name.replace(emojiRegex, '').trim();
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    const defaultMenuData = [
        { id: '1', name: 'Ice Rost Latte', desc: 'Kopi dingin dengan rasa yang segar.', price: 7000,
            category: 'kopi-klasik', tag: '', image: '', stock: 10 },
        { id: '2', name: "Flora's Coffee", desc: 'Kopi khas Flora dengan rasa yang khas.', price: 8000,
            category: 'kopi-klasik', tag: 'Favorit', image: '', stock: 10 },
        { id: '3', name: 'Nescafe', desc: 'Kopi sachet klasik yang nikmat.', price: 4000, category: 'kopi-klasik',
            tag: '', image: '', stock: 10 },
        { id: '4', name: 'Ice Tea', desc: 'Teh dingin segar.', price: 3000, category: 'non-kopi',
            tag: 'Favorit', image: '', stock: 10 },
        { id: '5', name: 'Ice Lemon Tea', desc: 'Teh dingin dengan perasan lemon segar.', price: 5000,
            category: 'non-kopi', tag: '', image: '', stock: 10 },
        { id: '6', name: "Flora's Matcha", desc: 'Matcha khas Flora dengan susu segar.', price: 8000,
            category: 'non-kopi', tag: '', image: '', stock: 10 },
        { id: '7', name: 'All Varian Sachet', desc: 'Berbagai varian minuman sachet.', price: 5000,
            category: 'non-kopi', tag: '', image: '', stock: 10 },
        { id: '8', name: 'Mango Yakult', desc: 'Yakult dengan rasa mangga segar.', price: 8000, category: 'non-kopi',
            tag: '', image: '', stock: 10 },
        { id: '9', name: 'Strawberry Yakult', desc: 'Yakult dengan rasa stroberi segar.', price: 8000,
            category: 'non-kopi', tag: '', image: '', stock: 10 },
        { id: '10', name: 'All Varian Suki', desc: 'Berbagai varian suki yang gurih.', price: 2500,
            category: 'camilan', tag: '', image: '', stock: 10 },
        { id: '11', name: 'Sosis Bakar', desc: 'Sosis panggang yang gurih.', price: 4000, category: 'camilan',
            tag: '', image: '', stock: 10 },
        { id: '12', name: 'Kentang Goreng', desc: 'Kentang goreng renyah.', price: 5000, category: 'camilan',
            tag: 'Promo', image: '', stock: 10 },
        { id: '13', name: 'Mix Plater', desc: 'Kentang goreng dan sosis bakar.', price: 8000, category: 'camilan',
            tag: '', image: '', stock: 10 },
        { id: '14', name: 'Roti Bakar', desc: 'Roti panggang dengan selai.', price: 5000, category: 'camilan',
            tag: '', image: '', stock: 10 },
        { id: '15', name: 'Indomie Kuah', desc: 'Indomie dengan kuah hangat.', price: 6000, category: 'mie',
            tag: '', image: '', stock: 10 },
        { id: '16', name: 'Indomie Goreng', desc: 'Indomie goreng dengan bumbu spesial.', price: 6000,
            category: 'mie', tag: '', image: '', stock: 10 },
        { id: '17', name: 'Telur (Topping)', desc: 'Tambahan telur untuk mie.', price: 3000, category: 'mie',
            tag: '', image: '', stock: 10 },
        { id: '18', name: 'Sosis (Topping)', desc: 'Tambahan sosis untuk mie.', price: 3000, category: 'mie',
            tag: '', image: '', stock: 10 }
    ];

    // ============================================
    // DARK MODE & SCROLL
    // ============================================
    const savedTheme = localStorage.getItem('flora-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('flora-theme', 'light');
            this.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('flora-theme', 'dark');
            this.textContent = '☀️';
        }
    });

    window.addEventListener('scroll', function() {
        scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // STATUS BUKA/TUTUP
    // ============================================
    let operationalOverride = null;

    async function loadOperationalStatus() {
        try {
            const doc = await db.collection('settings').doc('operational').get();
            if (doc.exists) {
                operationalOverride = doc.data().status;
                if (operationalStatus) {
                    operationalStatus.value = operationalOverride || 'auto';
                }
            }
        } catch (e) {
            console.log('No operational setting found, using auto');
        }
    }

    function updateOpenStatus() {
        const el = document.getElementById('openStatus');
        if (!el) return;
        const t = translations[currentLang] || translations['id'];
        if (operationalOverride === 'open') {
            el.textContent = '🟢 ' + (currentLang === 'en' ? 'Open (Override)' : 'Buka (Override)');
            return;
        }
        if (operationalOverride === 'closed') {
            el.textContent = '🔴 ' + (currentLang === 'en' ? 'Closed (Override)' : 'Tutup (Override)');
            return;
        }
        const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false }));
        const isOpen = (hour >= 11 && hour < 23);
        el.textContent = isOpen ? t.open : t.closed;
    }

    if (operationalStatus) {
        operationalStatus.addEventListener('change', async function() {
            if (!isAdmin) return;
            const value = this.value;
            try {
                await db.collection('settings').doc('operational').set({
                    status: value,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedBy: auth.currentUser?.email || 'unknown'
                });
                operationalOverride = value;
                updateOpenStatus();
                showToast('✅ Status operasional diperbarui');
                trackEvent('Admin', 'operational_status', value);
            } catch (err) {
                showToast('❌ Gagal menyimpan status: ' + err.message);
            }
        });
    }

    // ============================================
    // SHARE
    // ============================================
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const shareData = { title: 'Flora Coffee — Menu', text: 'Cek menu Flora Coffee di sini!', url: window.location.href };
            const method = navigator.share ? 'navigator.share' : 'clipboard';
            trackEvent('Engagement', 'share', method);
            if (navigator.share) {
                try { await navigator.share(shareData); } catch (e) {}
            } else if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(shareData.url);
                    showToast('🔗 Link menu disalin ke clipboard!');
                } catch (e) {
                    alert('Gagal menyalin link. Salin manual dari address bar ya.');
                }
            }
        });
    }

    // ============================================
    // TRACKING
    // ============================================
    function trackEvent(category, action, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label || '',
                'value': value || 0
            });
        }
    }

    function trackMenuView(menuName) {
        trackEvent('Menu', 'view', menuName);
    }

    function trackAddToCart(menuName, price, quantity) {
        trackEvent('Ecommerce', 'add_to_cart', menuName, price * quantity);
    }

    function trackRemoveFromCart(menuName) {
        trackEvent('Ecommerce', 'remove_from_cart', menuName);
    }

    function trackOrder(total, itemCount) {
        trackEvent('Ecommerce', 'checkout', 'Order Completed', total);
        trackEvent('Ecommerce', 'purchase', `${itemCount} items`, total);
    }

    function trackSearch(keyword) {
        if (keyword.length > 0) trackEvent('Search', 'search', keyword);
    }

    function trackCategoryFilter(category) {
        trackEvent('Navigation', 'filter_category', category);
    }

    // ============================================
    // SEARCH & FILTER
    // ============================================
    let activeCategoryFilter = 'all';

    function highlightText(text, keyword) {
        if (!keyword || keyword.length < 2) return text;
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');
        const parts = text.split(regex);
        return parts.map(part => {
            if (part.toLowerCase() === keyword.toLowerCase()) {
                return `<mark>${escapeHtml(part)}</mark>`;
            }
            return escapeHtml(part);
        }).join('');
    }

    function filterMenu() {
        const keyword = searchInput.value.toLowerCase().trim();
        const items = document.querySelectorAll('.item');
        const cats = document.querySelectorAll('.category');
        const noResult = document.getElementById('noResult');

        items.forEach(item => {
            const name = item.getAttribute('data-name') || '';
            const desc = item.getAttribute('data-desc') || '';
            const cat = item.getAttribute('data-category') || '';
            const matchKeyword = keyword === '' || name.includes(keyword) || desc.includes(keyword);
            const matchCategory = activeCategoryFilter === 'all' || cat === activeCategoryFilter;
            if (matchKeyword && matchCategory) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        cats.forEach(cat => {
            const matchCategory = activeCategoryFilter === 'all' || cat.id === activeCategoryFilter;
            const visibleItems = cat.querySelectorAll('.item:not(.hidden)');
            if (!matchCategory || visibleItems.length === 0) {
                cat.classList.add('hidden');
            } else {
                cat.classList.remove('hidden');
            }
        });

        document.querySelectorAll('.divider').forEach(d => {
            d.style.display = (activeCategoryFilter === 'all') ? '' : 'none';
        });

        const anyVisible = document.querySelectorAll('.item:not(.hidden)').length > 0;
        noResult.style.display = !anyVisible ? 'block' : 'none';
        clearBtn.classList.toggle('show', keyword.length > 0);

        if (keyword.length > 2) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => trackSearch(keyword), 1000);
        }

        document.querySelectorAll('.item:not(.hidden) .item-name, .item:not(.hidden) .item-desc').forEach(el => {
            const original = el.getAttribute('data-original') || el.textContent;
            el.setAttribute('data-original', original);
            if (keyword.length >= 2) {
                el.innerHTML = highlightText(original, keyword);
            } else {
                el.textContent = original;
            }
        });
    }

    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            activeCategoryFilter = this.getAttribute('data-filter');
            document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (activeCategoryFilter !== 'all') {
                trackCategoryFilter(activeCategoryFilter);
            }
            filterMenu();
        });
    });

    searchInput.addEventListener('input', filterMenu);
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        filterMenu();
        searchInput.focus();
    });

    // ============================================
    // CART — dengan struktur { id: qty }
    // ============================================
    function saveCart() {
        localStorage.setItem('flora-cart', JSON.stringify(cartData));
    }

    function updateCart() {
        let total = 0;
        let orderList = [];

        for (const [id, qty] of Object.entries(cartData)) {
            const menuItem = menuDataCache.find(m => m.id === id);
            if (!menuItem || qty <= 0) continue;
            const price = menuItem.promoPrice || menuItem.price;
            const subtotal = price * qty;
            total += subtotal;
            orderList.push(`${menuItem.name} x${qty} (Rp${subtotal.toLocaleString('id-ID')})`);
        }

        // Update tampilan item (checkbox & qty)
        document.querySelectorAll('.item').forEach(item => {
            const id = item.getAttribute('data-id');
            const checkbox = item.querySelector('.item-checkbox');
            const qtySpan = item.querySelector('.qty-value');
            const qty = cartData[id] || 0;
            if (qty > 0) {
                checkbox.checked = true;
                qtySpan.textContent = qty;
                qtySpan.classList.remove('zero');
            } else {
                checkbox.checked = false;
                qtySpan.textContent = '0';
                qtySpan.classList.add('zero');
            }
        });

        if (total > 0) {
            cartSummary.classList.add('show');
            cartTotal.textContent = 'Rp' + total.toLocaleString('id-ID');
            cartDetail.textContent = orderList.join(' · ') || 'Belum ada pesanan';
            const message = encodeURIComponent(
                'Halo Flora Coffee,\n\nSaya mau pesan:\n' +
                orderList.map((item, i) => `${i+1}. ${item}`).join('\n') +
                '\n\nTotal: Rp' + total.toLocaleString('id-ID')
            );
            orderBtn.href = 'https://wa.me/6285175012418?text=' + message;
        } else {
            cartSummary.classList.remove('show');
        }

        updateCartBadge();
        updateCartMini();
        renderCartDropdown();
    }

    // ============================================
    // CART BADGE & MINI
    // ============================================
    function updateCartBadge() {
        if (!cartBadge) return;
        const totalItems = Object.values(cartData).reduce((sum, qty) => sum + qty, 0);
        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
            const oldValue = parseInt(cartBadge.textContent) || 0;
            cartBadge.textContent = totalItems;
            if (totalItems > oldValue) {
                cartBadge.classList.remove('pulse');
                void cartBadge.offsetWidth;
                cartBadge.classList.add('pulse');
            }
        } else {
            cartBadge.style.display = 'none';
        }
    }

    function updateCartMini() {
        if (!cartMini || !cartMiniBadge) return;
        const totalItems = Object.values(cartData).reduce((sum, qty) => sum + qty, 0);
        if (totalItems > 0) {
            cartMini.style.display = 'flex';
            const oldValue = parseInt(cartMiniBadge.textContent) || 0;
            cartMiniBadge.textContent = totalItems;
            if (totalItems > oldValue) {
                cartMiniBadge.classList.remove('bounce');
                void cartMiniBadge.offsetWidth;
                cartMiniBadge.classList.add('bounce');
            }
        } else {
            cartMini.style.display = 'none';
            if (cartDropdown) cartDropdown.classList.remove('show');
        }
    }

    // ============================================
    // CART DROPDOWN
    // ============================================
    function renderCartDropdown() {
        if (!cartDropdownContent) return;
        const items = [];
        let total = 0;
        for (const [id, qty] of Object.entries(cartData)) {
            const menu = menuDataCache.find(m => m.id === id);
            if (!menu || qty <= 0) continue;
            const price = menu.promoPrice || menu.price;
            const subtotal = price * qty;
            total += subtotal;
            items.push({ name: menu.name, qty, price, subtotal });
        }

        if (items.length === 0) {
            cartDropdownContent.innerHTML = `<div class="cart-empty">🛒 Belum ada pesanan</div>`;
            return;
        }

        let html = '';
        items.forEach(item => {
            html += `
                <div class="cart-item">
                    <span class="cart-item-name">${escapeHtml(item.name)}</span>
                    <span class="cart-item-qty">×${item.qty}</span>
                    <span class="cart-item-price">Rp${item.subtotal.toLocaleString('id-ID')}</span>
                </div>
            `;
        });
        html += `
            <div class="cart-total-row">
                <span>Total</span>
                <span>Rp${total.toLocaleString('id-ID')}</span>
            </div>
            <button class="cart-checkout-btn" id="dropdownCheckoutBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 510 512.459" fill="white">
                    <path d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.891 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z"/>
                </svg>
                Pesan Sekarang
            </button>
        `;
        cartDropdownContent.innerHTML = html;

        const checkoutBtn = document.getElementById('dropdownCheckoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                cartDropdown.classList.remove('show');
                if (orderBtn) orderBtn.click();
            });
        }
    }

    // ============================================
    // CART MINI CLICK - TOGGLE DROPDOWN
    // ============================================
    if (cartMini) {
        cartMini.addEventListener('click', function(e) {
            e.stopPropagation();
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

    // ============================================
    // SAVE ORDER (Pending) — dengan cartData { id: qty }
    // ============================================
    async function saveOrderToFirestore(order) {
        try {
            const now = Date.now();
            if (now - lastOrderSubmitTime < 3000) {
                showToast('⏳ Tunggu sebentar sebelum memesan lagi');
                return false;
            }
            lastOrderSubmitTime = now;

            // Bangun array item dari cartData
            const orderItems = [];
            let calculatedTotal = 0;
            for (const [id, qty] of Object.entries(cartData)) {
                const menu = menuDataCache.find(m => m.id === id);
                if (!menu || qty <= 0) continue;
                const price = menu.promoPrice || menu.price;
                const subtotal = price * qty;
                calculatedTotal += subtotal;
                orderItems.push({
                    id: menu.id,
                    name: menu.name,
                    qty,
                    price,
                    subtotal
                });
            }

            if (orderItems.length === 0) {
                showToast('🛒 Keranjang kosong');
                return false;
            }

            // Validasi total dari client (toleransi)
            const tolerance = Math.max(500, calculatedTotal * 0.05);
            if (Math.abs(calculatedTotal - (order.total || 0)) > tolerance) {
                console.warn('⚠️ Total tidak sesuai! Diharapkan:', calculatedTotal, 'Dikirim:', order.total);
                showToast('❌ Total pesanan tidak valid. Silakan coba lagi.');
                return false;
            }

            // Validasi stok (cek dari cache)
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
                items: orderItems,           // simpan array objek, bukan string
                total: calculatedTotal,
                rawItems: orderItems.map(i => `${i.name} x${i.qty}`), // untuk kompatibilitas
                customerNote: order.customerNote || '',
                status: 'pending',
                source: 'web',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                orderDate: new Date().toISOString().split('T')[0],
                orderTime: new Date().toLocaleTimeString('id-ID'),
                validated: true
            };

            console.log('📦 Saving pending order:', orderData);
            const docRef = await db.collection('orders').add(orderData);
            console.log('✅ Pending order saved with ID:', docRef.id);

            // Simpan riwayat lokal
            const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
            history.push({
                id: docRef.id,
                items: orderData.items.map(i => `${i.name} x${i.qty}`).join(', '),
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

    // ============================================
    // RENDER MENU (Public) — perhatikan cartData update
    // ============================================
    function renderMenu(data) {
        skeletonContainer.style.display = 'none';
        menuContainer.style.display = 'block';
        menuContainer.innerHTML = '';
        menuDataCache = data;

        const grouped = {};
        data.forEach(item => {
            if (!grouped[item.category]) grouped[item.category] = [];
            grouped[item.category].push(item);
        });

        let catIndex = 1;
        categories.forEach(catKey => {
            if (!grouped[catKey]) return;
            const section = document.createElement('section');
            section.className = 'category';
            section.id = catKey;

            const head = document.createElement('div');
            head.className = 'cat-head';
            const numSpan = document.createElement('span');
            numSpan.className = 'cat-num';
            numSpan.textContent = String(catIndex).padStart(2, '0');
            head.appendChild(numSpan);
            const h2 = document.createElement('h2');
            h2.textContent = categoryNames[catKey] || catKey;
            head.appendChild(h2);
            section.appendChild(head);

            const desc = document.createElement('p');
            desc.className = 'cat-desc';
            desc.textContent = categoryDescs[catKey] || '';
            section.appendChild(desc);

            grouped[catKey].forEach((item) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.setAttribute('data-name', (item.name || '').toLowerCase());
                itemDiv.setAttribute('data-desc', (item.desc || '').toLowerCase());
                itemDiv.setAttribute('data-category', item.category || '');
                const activePrice = item.promoPrice ? item.promoPrice : item.price;
                itemDiv.setAttribute('data-price', activePrice);
                itemDiv.setAttribute('data-id', item.id);

                trackMenuView(item.name);

                // thumb
                const thumb = document.createElement('div');
                thumb.className = 'item-thumb';
                const hasImage = item.image && item.image.trim() !== '';
                if (hasImage) {
                    const img = document.createElement('img');
                    img.className = 'item-image show';
                    img.src = item.image;
                    img.alt = item.name;
                    img.loading = 'lazy';
                    thumb.appendChild(img);
                } else {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'item-placeholder';
                    placeholder.textContent = categoryIcons[item.category] || '☕';
                    placeholder.setAttribute('aria-hidden', 'true');
                    thumb.appendChild(placeholder);
                }
                itemDiv.appendChild(thumb);

                // checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'item-checkbox';
                if (item.stock === 0) { checkbox.disabled = true; checkbox.style.opacity = '0.4'; }
                itemDiv.appendChild(checkbox);

                // info
                const info = document.createElement('div');
                info.className = 'item-info';
                const nameSpan = document.createElement('div');
                nameSpan.className = 'item-name';
                nameSpan.textContent = item.name || 'Unknown';

                // Badge
                if (item.tag === 'Favorit') {
                    const tag = document.createElement('span');
                    tag.className = 'item-tag';
                    tag.textContent = '⭐ Favorit';
                    nameSpan.appendChild(tag);
                }
                if (item.promoPrice) {
                    const promo = document.createElement('span');
                    promo.className = 'badge-promo';
                    promo.textContent = '🔥 Promo';
                    nameSpan.appendChild(promo);
                } else if (item.tag === 'Promo') {
                    const tag = document.createElement('span');
                    tag.className = 'item-tag';
                    tag.textContent = '🔥 Promo';
                    nameSpan.appendChild(tag);
                }
                if (item.stock === 0) {
                    const habis = document.createElement('span');
                    habis.className = 'badge-habis';
                    habis.textContent = '⛔ Habis';
                    nameSpan.appendChild(habis);
                }

                info.appendChild(nameSpan);

                const descSpan = document.createElement('div');
                descSpan.className = 'item-desc';
                descSpan.textContent = item.desc || '';
                info.appendChild(descSpan);
                itemDiv.appendChild(info);

                // price
                const priceSpan = document.createElement('div');
                priceSpan.className = 'item-price';
                if (item.promoPrice) {
                    const original = document.createElement('span');
                    original.className = 'price-original';
                    original.textContent = 'Rp' + Number(item.price).toLocaleString('id-ID');
                    priceSpan.appendChild(original);
                    const promoPriceSpan = document.createElement('span');
                    promoPriceSpan.textContent = 'Rp' + Number(item.promoPrice).toLocaleString('id-ID');
                    priceSpan.appendChild(promoPriceSpan);
                } else {
                    priceSpan.textContent = 'Rp' + Number(item.price).toLocaleString('id-ID');
                }
                itemDiv.appendChild(priceSpan);

                // qty controls
                const qtyDiv = document.createElement('div');
                qtyDiv.className = 'qty-controls';
                const minusBtn = document.createElement('button');
                minusBtn.className = 'qty-minus';
                minusBtn.textContent = '−';
                if (item.stock === 0) minusBtn.disabled = true;
                qtyDiv.appendChild(minusBtn);

                const qtySpan = document.createElement('span');
                qtySpan.className = 'qty-value zero';
                qtySpan.textContent = '0';
                qtyDiv.appendChild(qtySpan);

                const plusBtn = document.createElement('button');
                plusBtn.className = 'qty-plus';
                plusBtn.textContent = '+';
                if (item.stock === 0) plusBtn.disabled = true;
                qtyDiv.appendChild(plusBtn);
                itemDiv.appendChild(qtyDiv);

                // Restore from cartData
                const savedQty = cartData[item.id] || 0;
                if (savedQty > 0 && item.stock !== 0) {
                    checkbox.checked = true;
                    qtySpan.textContent = savedQty;
                    qtySpan.classList.remove('zero');
                }

                // Event handlers
                checkbox.addEventListener('change', function() {
                    if (item.stock === 0) return;
                    const qty = parseInt(qtySpan.textContent) || 0;
                    if (!this.checked) {
                        // Hapus dari cart
                        delete cartData[item.id];
                        saveCart();
                        qtySpan.textContent = '0';
                        qtySpan.classList.add('zero');
                        trackRemoveFromCart(item.name);
                    } else if (qty === 0) {
                        // Tambah 1
                        cartData[item.id] = 1;
                        saveCart();
                        qtySpan.textContent = '1';
                        qtySpan.classList.remove('zero');
                        trackAddToCart(item.name, activePrice, 1);
                        showToast(`✅ ${item.name} ×1 ditambahkan`);
                    } else {
                        // Sudah ada qty, tidak berubah
                        trackAddToCart(item.name, activePrice, qty);
                        showToast(`✅ ${item.name} ×${qty} ditambahkan`);
                    }
                    updateCart();
                });

                function updateQty(change) {
                    if (item.stock === 0) return;
                    let val = parseInt(qtySpan.textContent) || 0;
                    val = Math.max(0, Math.min(item.stock, val + change));
                    qtySpan.textContent = val;
                    qtySpan.classList.toggle('zero', val === 0);
                    if (val > 0) {
                        checkbox.checked = true;
                        cartData[item.id] = val;
                        trackAddToCart(item.name, activePrice, val);
                        showToast(`✅ ${item.name} ×${val} ditambahkan`);
                    } else {
                        checkbox.checked = false;
                        delete cartData[item.id];
                        trackRemoveFromCart(item.name);
                    }
                    saveCart();
                    updateCart();
                }

                minusBtn.addEventListener('click', function(e) { e.stopPropagation(); updateQty(-1); });
                plusBtn.addEventListener('click', function(e) { e.stopPropagation(); updateQty(1); });
                qtySpan.addEventListener('click', function() { updateQty(-parseInt(qtySpan.textContent) || 0); });

                section.appendChild(itemDiv);
            });

            menuContainer.appendChild(section);
            if (catIndex < Object.keys(grouped).length) {
                const divider = document.createElement('div');
                divider.className = 'divider';
                divider.innerHTML = `
                    <svg viewBox="0 0 34 20" fill="none"><path d="M2 18C8 10 12 6 17 6C22 6 26 10 32 18" stroke="#b58d4a" stroke-width="1.4" /><circle cx="17" cy="5" r="2.6" fill="#b58d4a" /></svg>
                    <div class="line"></div>
                `;
                menuContainer.appendChild(divider);
            }
            catIndex++;
        });

        updateCart();
        filterMenu();
        setupScrollReveal();
    }

    // ============================================
    // RENDER ADMIN MENU — dengan data-* untuk event delegation
    // ============================================
    function renderAdminMenu(data) {
        if (!adminMenuGrid) return;
        loadingMenu.classList.add('hidden');
        adminMenuGrid.innerHTML = '';
        if (!data || data.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.style.cssText = 'grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-muted);';
            const icon = document.createElement('div');
            icon.style.fontSize = '48px';
            icon.style.marginBottom = '12px';
            icon.textContent = '📭';
            emptyDiv.appendChild(icon);
            const p = document.createElement('p');
            p.textContent = 'Belum ada menu. Klik "Tambah Baru" untuk menambahkan.';
            emptyDiv.appendChild(p);
            adminMenuGrid.appendChild(emptyDiv);
            return;
        }

        data.forEach(item => {
            const cleanName = cleanNameFromEmoji(item.name);
            const card = document.createElement('div');
            card.className = 'admin-card';

            // IMG
            const imgDiv = document.createElement('div');
            imgDiv.className = 'admin-card-img';
            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
                img.loading = 'lazy';
                imgDiv.appendChild(img);
            } else {
                const placeholder = document.createElement('div');
                placeholder.className = 'admin-card-placeholder';
                placeholder.textContent = categoryIcons[item.category] || '☕';
                imgDiv.appendChild(placeholder);
            }
            // Badges
            if (item.promoPrice) {
                const badge = document.createElement('span');
                badge.className = 'badge-promo';
                badge.textContent = '🔥 Promo';
                imgDiv.appendChild(badge);
            } else if (item.tag === 'Promo') {
                const badge = document.createElement('span');
                badge.className = 'badge-promo';
                badge.textContent = '🔥 Promo';
                imgDiv.appendChild(badge);
            }
            if (item.tag === 'Favorit') {
                const badge = document.createElement('span');
                badge.className = 'badge-favorit';
                badge.textContent = '⭐ Favorit';
                imgDiv.appendChild(badge);
            }
            if (item.stock === 0) {
                const badge = document.createElement('span');
                badge.className = 'badge-habis';
                badge.textContent = '⛔ Habis';
                imgDiv.appendChild(badge);
            }
            card.appendChild(imgDiv);

            // INFO
            const infoDiv = document.createElement('div');
            infoDiv.className = 'admin-card-info';
            const h4 = document.createElement('h4');
            h4.textContent = cleanName;
            infoDiv.appendChild(h4);
            const p = document.createElement('p');
            p.textContent = item.desc || '';
            infoDiv.appendChild(p);
            const priceDiv = document.createElement('div');
            priceDiv.className = 'admin-card-price';
            if (item.promoPrice) {
                const orig = document.createElement('span');
                orig.className = 'price-original';
                orig.textContent = 'Rp' + Number(item.price).toLocaleString('id-ID');
                priceDiv.appendChild(orig);
                const promoText = document.createTextNode(' Rp' + Number(item.promoPrice).toLocaleString('id-ID'));
                priceDiv.appendChild(promoText);
            } else {
                priceDiv.textContent = 'Rp' + Number(item.price).toLocaleString('id-ID');
            }
            infoDiv.appendChild(priceDiv);
            const metaDiv = document.createElement('div');
            metaDiv.className = 'admin-card-meta';
            const catSpan = document.createElement('span');
            catSpan.textContent = categoryNames[item.category] || item.category;
            metaDiv.appendChild(catSpan);
            if (item.tag && item.tag !== 'Promo' && item.tag !== 'Favorit') {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag tag-' + item.tag.toLowerCase();
                tagSpan.textContent = item.tag;
                metaDiv.appendChild(tagSpan);
            }
            infoDiv.appendChild(metaDiv);
            card.appendChild(infoDiv);

            // STOCK
            const stockDiv = document.createElement('div');
            stockDiv.className = 'admin-card-stock';
            const minusBtn = document.createElement('button');
            minusBtn.textContent = '−';
            minusBtn.title = 'Kurangi stok';
            minusBtn.dataset.id = item.id;
            minusBtn.dataset.change = '-1';
            minusBtn.classList.add('stock-change-btn');
            stockDiv.appendChild(minusBtn);

            const stockSpan = document.createElement('span');
            stockSpan.textContent = 'Stok: ' + (item.stock !== undefined ? item.stock : 10);
            stockDiv.appendChild(stockSpan);

            const plusBtn = document.createElement('button');
            plusBtn.textContent = '+';
            plusBtn.title = 'Tambah stok';
            plusBtn.dataset.id = item.id;
            plusBtn.dataset.change = '1';
            plusBtn.classList.add('stock-change-btn');
            stockDiv.appendChild(plusBtn);
            card.appendChild(stockDiv);

            // ACTIONS
            const actionDiv = document.createElement('div');
            actionDiv.className = 'admin-card-actions';
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm admin-edit-btn';
            editBtn.textContent = '✏️ Edit';
            editBtn.dataset.id = item.id;
            actionDiv.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger admin-delete-btn';
            deleteBtn.textContent = '🗑️';
            deleteBtn.dataset.id = item.id;
            deleteBtn.dataset.name = item.name;
            actionDiv.appendChild(deleteBtn);
            card.appendChild(actionDiv);

            adminMenuGrid.appendChild(card);
        });
    }

    // ============================================
    // RENDER PENDING ORDERS — dengan data-* untuk event delegation
    // ============================================
    function renderPendingOrders(docs, container) {
        if (!docs || docs.length === 0) {
            container.innerHTML = `
                <div style="padding:20px;text-align:center;color:var(--text-muted);">
                    ✅ Tidak ada order pending
                </div>
            `;
            return;
        }

        let html = '<div style="display:flex;flex-direction:column;gap:12px;">';
        docs.forEach(doc => {
            const data = doc;
            const date = data.timestamp?.toDate?.()?.toLocaleString('id-ID') || 'Baru saja';
            const total = 'Rp' + (data.total || 0).toLocaleString('id-ID');
            html += `
                <div class="pending-item">
                    <div>
                        <div class="date">📅 ${date}</div>
                        <div class="items">${escapeHtml(data.items || '-')}</div>
                        <div class="total">${total}</div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-sm pending-confirm-btn" style="background:#27ae60;" data-id="${data.id}">
                            ✅ Konfirmasi
                        </button>
                        <button class="btn btn-sm btn-danger pending-cancel-btn" data-id="${data.id}">
                            ❌ Batalkan
                        </button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    // ============================================
    // LOAD PENDING ORDERS
    // ============================================
    async function loadPendingOrders() {
        if (!isAdmin) return;
        const container = document.getElementById('pendingOrdersList');
        if (!container) return;

        try {
            let snapshot;
            try {
                snapshot = await db.collection('orders')
                    .where('status', '==', 'pending')
                    .orderBy('timestamp', 'desc')
                    .limit(50)
                    .get();
            } catch (indexError) {
                console.warn('⚠️ Indeks belum siap, pakai fallback sorting client-side');
                snapshot = await db.collection('orders')
                    .where('status', '==', 'pending')
                    .limit(50)
                    .get();
                const docs = [];
                snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
                docs.sort((a, b) => {
                    const timeA = a.timestamp?.toDate?.()?.getTime() || 0;
                    const timeB = b.timestamp?.toDate?.()?.getTime() || 0;
                    return timeB - timeA;
                });
                renderPendingOrders(docs, container);
                return;
            }

            const docs = [];
            snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
            renderPendingOrders(docs, container);

        } catch (err) {
            console.error('Error loading pending orders:', err);
            container.innerHTML = `
                <div style="padding:20px;text-align:center;color:var(--text-muted);">
                    ❌ Gagal memuat: ${err.message}
                    <br><br>
                    <button class="btn btn-sm" onclick="loadPendingOrders()" style="margin-top:8px;">
                        🔄 Coba Lagi
                    </button>
                </div>
            `;
        }
    }

    // ============================================
    // ADMIN: CONFIRM ORDER — dengan TRANSACTION
    // ============================================
    async function confirmOrder(orderId) {
        if (!isAdmin) {
            showToast('❌ Hanya admin yang bisa konfirmasi');
            return;
        }

        try {
            // 1. Ambil data order
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

            // 2. Siapkan referensi menu yang akan diupdate
            const menuRefs = [];
            const items = orderData.items || []; // array objek { id, name, qty, price, subtotal }
            for (const item of items) {
                const menuId = item.id;
                if (!menuId) {
                    // Jika tidak ada id, cari berdasarkan nama
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
                    // Cek apakah menu masih ada di cache/db
                    const menuItem = menuDataCache.find(m => m.id === menuId);
                    if (!menuItem) {
                        showToast(`❌ Menu ID ${menuId} tidak ditemukan.`);
                        return;
                    }
                    menuRefs.push({ ref: db.collection('menu').doc(menuId), qty: item.qty, name: menuItem.name });
                }
            }

            // 3. Jalankan transaksi untuk mengurangi stok
            await db.runTransaction(async (transaction) => {
                for (const item of menuRefs) {
                    const doc = await transaction.get(item.ref);
                    if (!doc.exists) {
                        throw new Error(`Menu ${item.name} tidak ada.`);
                    }
                    const currentStock = doc.data().stock || 0;
                    if (currentStock < item.qty) {
                        throw new Error(`Stok ${item.name} tidak cukup (sisa ${currentStock}).`);
                    }
                    transaction.update(item.ref, {
                        stock: currentStock - item.qty,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            });

            // 4. Update status order menjadi 'completed'
            await db.collection('orders').doc(orderId).update({
                status: 'completed',
                confirmedAt: firebase.firestore.FieldValue.serverTimestamp(),
                confirmedBy: auth.currentUser?.email || 'admin'
            });

            // Update cache lokal
            for (const item of menuRefs) {
                const cacheItem = menuDataCache.find(m => m.id === item.ref.id);
                if (cacheItem) {
                    cacheItem.stock = (cacheItem.stock || 0) - item.qty;
                }
            }

            showToast('✅ Order dikonfirmasi dan stok diperbarui!');
            trackEvent('Admin', 'confirm_order', orderId);
            loadPendingOrders();
            loadDashboardStats();

        } catch (err) {
            console.error('❌ Gagal konfirmasi order:', err);
            showToast('❌ Gagal konfirmasi: ' + err.message);
        }
    }

    // ============================================
    // ADMIN: CANCEL ORDER
    // ============================================
    async function cancelOrder(orderId) {
        if (!isAdmin) return;
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

    // ============================================
    // GLOBAL EVENT DELEGATION (untuk tombol admin & pending)
    // ============================================
    document.addEventListener('click', function(e) {
        // Edit menu
        const editBtn = e.target.closest('.admin-edit-btn');
        if (editBtn) {
            editMenuItem(editBtn.dataset.id);
            return;
        }

        // Delete menu
        const deleteBtn = e.target.closest('.admin-delete-btn');
        if (deleteBtn) {
            deleteMenuItem(deleteBtn.dataset.id, deleteBtn.dataset.name);
            return;
        }

        // Quick stock change
        const stockBtn = e.target.closest('.stock-change-btn');
        if (stockBtn) {
            const id = stockBtn.dataset.id;
            const change = parseInt(stockBtn.dataset.change) || 0;
            quickUpdateStock(id, change);
            return;
        }

        // Confirm pending order
        const confirmBtn = e.target.closest('.pending-confirm-btn');
        if (confirmBtn) {
            const id = confirmBtn.dataset.id;
            confirmOrder(id);
            return;
        }

        // Cancel pending order
        const cancelBtn = e.target.closest('.pending-cancel-btn');
        if (cancelBtn) {
            const id = cancelBtn.dataset.id;
            cancelOrder(id);
            return;
        }
    });

    // ============================================
    // QUICK STOCK UPDATE (Admin)
    // ============================================
    async function quickUpdateStock(id, change) {
        if (!isAdmin) { showToast('❌ Hanya admin yang bisa mengubah stok'); return; }
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
            console.error('Error updating stock:', err);
            showToast('❌ Gagal update stok: ' + err.message);
        }
    }

    // ============================================
    // ADMIN CRUD (editMenuItem, deleteMenuItem) — tetap sama
    // ============================================
    // ... (fungsi editMenuItem dan deleteMenuItem tidak diubah, tetap seperti sebelumnya)

    // ============================================
    // ORDER HISTORY (Customer) — tetap sama
    // ============================================
    // ... (fungsi showOrderHistory dll. tetap)

    // ============================================
    // ORDER BUTTON (Pesan Sekarang) — sesuaikan dengan cartData baru
    // ============================================
    const waConfirmModal = document.getElementById('waConfirmModal');
    const btnAlreadySent = document.getElementById('btnAlreadySent');
    const btnNotYet = document.getElementById('btnNotYet');

    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
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
                // Hitung total dari cartData
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
                    trackOrder(calculatedTotal, Object.keys(cartData).length);
                    cartData = {};
                    saveCart();
                    updateCart();

                    const message = encodeURIComponent(
                        'Halo Flora Coffee,\n\nSaya mau pesan:\n' +
                        rawItems.map((item, i) => `${i+1}. ${item}`).join('\n') +
                        '\n\nTotal: Rp' + calculatedTotal.toLocaleString('id-ID') +
                        '\n\nMohon dikonfirmasi setelah pembayaran.'
                    );
                    window.open('https://wa.me/6285175012418?text=' + message, '_blank');

                    if (waConfirmModal) waConfirmModal.classList.remove('show');
                    showToast('✅ Pesanan tercatat! Silakan bayar dan kirim bukti via WA.');

                    if (isAdmin) {
                        setTimeout(() => {
                            loadDashboardStats();
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

    // ============================================
    // DASHBOARD STATS, CHART, UPLOAD — tetap seperti sebelumnya
    // ============================================
    // ... (semua fungsi yang tidak diubah disimpan)

    // ============================================
    // SCROLL REVEAL, LOAD MENU, AUTH, TRIGGER, dsb. — tetap
    // ============================================
    // ... (kode sisanya tidak diubah)

    // ============================================
    // INIT
    // ============================================
    const savedLang = localStorage.getItem('flora-lang') || 'id';
    setLang(savedLang);
    loadMenu();
    showMenuOfTheDay();
    loadOperationalStatus();

    setInterval(() => {
        if (navigator.onLine) {
            loadMenu();
            if (isAdmin) { loadDashboardStats(); loadMenuForAdmin(); }
        }
    }, 300000);

    console.log('🌿 Flora Coffee Menu v3.0 — Secure, Transacted, Clean!');

})();