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
            brand: 'Kedai',
            brandEm: 'Flora',
            tagline: 'Kopi, camilan, mie, dan signature — semua tersedia di sini.',
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
            signature: 'Signature',
            search: 'Cari menu...',
            noResult: 'Menu tidak ditemukan. Coba kata kunci lain!',
            total: 'Total',
            emptyCart: 'Belum ada pesanan',
            orderNow: 'Pesan Sekarang',
            footerTitle: 'Bingung Mau Pesan Apa?',
            footerDesc: 'Bisa minta rekomendasi langsung ke admin! Ada banyak pilihan favorit yang siap direkomendasikan sesuai seleramu. 👀 _Yuk, chat admin buat spill menu paling hits hari ini!_',
            waFooter: 'Chat Admin Sekarang',
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
            brand: 'Kedai',
            brandEm: 'Flora',
            tagline: 'Coffee, snacks, noodles, and signatures — all available here.',
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
            signature: 'Signature',
            search: 'Search menu...',
            noResult: 'Menu not found. Try another keyword!',
            total: 'Total',
            emptyCart: 'No order yet',
            orderNow: 'Order Now',
            footerTitle: 'Confused What to Order?',
            footerDesc: 'Ask the admin for recommendations! There are many favorites ready to be recommended according to your taste. 👀 _Chat admin to get today\'s hottest menu!_',
            waFooter: 'Chat Admin Now',
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
            'langSignature': t.signature,
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
    // ANONYMOUS AUTH — invisible identity per visitor
    // ============================================
    const anonAuthReady = auth.signInAnonymously().catch(err => {
        console.error('❌ Anonymous sign-in gagal (aktifkan provider "Anonymous" di Firebase Console → Authentication):', err);
    });

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
    const ordersFilterPendingBtn = document.getElementById('ordersFilterPending');
    const ordersFilterAllBtn = document.getElementById('ordersFilterAll');

    function setOrdersFilterActive(mode) {
        if (ordersFilterPendingBtn) {
            ordersFilterPendingBtn.className = mode === 'pending' ? 'btn btn-sm' : 'btn btn-sm btn-outline';
            ordersFilterPendingBtn.style.background = mode === 'pending' ? 'var(--brass)' : '';
            ordersFilterPendingBtn.style.color = mode === 'pending' ? 'var(--leaf-deep)' : '';
        }
        if (ordersFilterAllBtn) {
            ordersFilterAllBtn.className = mode === 'all' ? 'btn btn-sm' : 'btn btn-sm btn-outline';
            ordersFilterAllBtn.style.background = mode === 'all' ? 'var(--brass)' : '';
            ordersFilterAllBtn.style.color = mode === 'all' ? 'var(--leaf-deep)' : '';
        }
    }
    if (ordersFilterPendingBtn) {
        ordersFilterPendingBtn.addEventListener('click', () => {
            setOrdersFilterActive('pending');
            loadPendingOrders('pending');
        });
    }
    if (ordersFilterAllBtn) {
        ordersFilterAllBtn.addEventListener('click', () => {
            setOrdersFilterActive('all');
            loadPendingOrders('all');
        });
    }

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

    // ===== CART DATA: { id: qty } =====
    let cartData = JSON.parse(localStorage.getItem('flora-cart')) || {};
    const firstKey = Object.keys(cartData)[0];
    if (firstKey && typeof cartData[firstKey] === 'object' && cartData[firstKey].qty !== undefined) {
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

    // Persistent per-device ID (not tied to any account) so a customer's own
    // "Riwayat Pesanan" can show just their own orders instead of every visitor's
    // orders. Generated once and reused from localStorage on every later visit.
    function getOrCreateDeviceId() {
        let id = localStorage.getItem('flora-device-id');
        if (!id) {
            id = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
            localStorage.setItem('flora-device-id', id);
        }
        return id;
    }
    const deviceId = getOrCreateDeviceId();
    let orderInProgress = false;

    // ============================================
    // CATEGORY DATA (dengan Signature) — [UBAH] Signature pertama
    // ============================================
    const categories = ['signature', 'kopi-klasik', 'non-kopi', 'camilan', 'mie'];
    const categoryNames = {
        'signature': '⭐ Signature',
        'kopi-klasik': '☕ Kopi',
        'non-kopi': '🍵 Non Kopi',
        'camilan': '🍽️ Camilan',
        'mie': '🍜 Mie & Topping'
    };
    const categoryDescs = {
        'signature': '🌟 Menu andalan Kedai Flora yang wajib dicoba!',
        'kopi-klasik': 'Berbagai pilihan kopi untuk menemani harimu.',
        'non-kopi': 'Minuman segar tanpa kopi, dari yakult hingga matcha.',
        'camilan': 'Camilan gurih untuk mengisi perut.',
        'mie': 'Mie instan dengan berbagai topping pilihan.'
    };
    const categoryIcons = {
        'signature': '⭐',
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
            tag: '', image: '', stock: 10 },
        { id: '19', name: "Flora's Signature", desc: 'Signature coffee with caramel and cream.', price: 12000,
            category: 'signature', tag: 'Favorit', image: '', stock: 10 },
        { id: '20', name: 'New Signature Latte', desc: 'New! Velvety latte with a hint of vanilla.', price: 14000,
            category: 'signature', tag: 'New', image: '', stock: 10 }
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
            const shareData = { title: 'Kedai Flora — Menu', text: 'Cek menu Kedai Flora di sini!', url: window.location.href };
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
    // CART
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
                'Halo Kedai Flora,\n\nSaya mau pesan:\n' +
                orderList.map((item, i) => `${i+1}. ${item}`).join('\n') +
                '\n\nTotal: Rp' + total.toLocaleString('id-ID')
            );
            orderBtn.href = 'https://wa.me/628562622436?text=' + message;
        } else {
            cartSummary.classList.remove('show');
        }

        updateCartBadge();
        updateCartMini();
        renderCartDropdown();
    }

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
    // SAVE ORDER (pending)
    // ============================================
    async function saveOrderToFirestore(order) {
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

            const tolerance = Math.max(500, calculatedTotal * 0.05);
            if (Math.abs(calculatedTotal - (order.total || 0)) > tolerance) {
                console.warn('⚠️ Total tidak sesuai! Diharapkan:', calculatedTotal, 'Dikirim:', order.total);
                showToast('❌ Total pesanan tidak valid. Silakan coba lagi.');
                return false;
            }

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

            console.log('📦 Saving pending order:', orderData);
            const docRef = await db.collection('orders').add(orderData);
            console.log('✅ Pending order saved with ID:', docRef.id);

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

    // ============================================
    // ADMIN: Load Pending Orders
    // ============================================
    async function loadPendingOrders(filter) {
        filter = filter || 'pending';
        if (!isAdmin) return;
        const container = document.getElementById('pendingOrdersList');
        if (!container) return;

        try {
            const limitCount = filter === 'all' ? 100 : 50;
            let snapshot;

            try {
                let orderedQuery = db.collection('orders');
                if (filter === 'pending') orderedQuery = orderedQuery.where('status', '==', 'pending');
                snapshot = await orderedQuery.orderBy('timestamp', 'desc').limit(limitCount).get();
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
                    <button class="btn btn-sm" id="retryLoadOrdersBtn" style="margin-top:8px;">
                        🔄 Coba Lagi
                    </button>
                </div>
            `;
            const retryBtn = document.getElementById('retryLoadOrdersBtn');
            if (retryBtn) retryBtn.addEventListener('click', () => loadPendingOrders(filter));
        }
    }

    function renderPendingOrders(docs, container, filter) {
        filter = filter || 'pending';
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

    // ============================================
    // CONFIRM ORDER — dengan TRANSACTION (diperbaiki)
    // ============================================
    async function confirmOrder(orderId) {
        if (!isAdmin) {
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
            let msg = 'Gagal konfirmasi: ';
            if (err.code === 'permission-denied') {
                msg += 'Izin ditolak. Pastikan Anda login sebagai admin dan email terdaftar.';
            } else {
                msg += err.message;
            }
            showToast('❌ ' + msg);
        }
    }

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
    // GLOBAL EVENT DELEGATION
    // ============================================
    document.addEventListener('click', function(e) {
        const editBtn = e.target.closest('.admin-edit-btn');
        if (editBtn) {
            editMenuItem(editBtn.dataset.id);
            return;
        }

        const deleteBtn = e.target.closest('.admin-delete-btn');
        if (deleteBtn) {
            deleteMenuItem(deleteBtn.dataset.id, deleteBtn.dataset.name);
            return;
        }

        const stockBtn = e.target.closest('.stock-change-btn');
        if (stockBtn) {
            const id = stockBtn.dataset.id;
            const change = parseInt(stockBtn.dataset.change) || 0;
            quickUpdateStock(id, change);
            return;
        }

        const confirmBtn = e.target.closest('.pending-confirm-btn');
        if (confirmBtn) {
            confirmOrder(confirmBtn.dataset.id);
            return;
        }

        const cancelBtn = e.target.closest('.pending-cancel-btn');
        if (cancelBtn) {
            cancelOrder(cancelBtn.dataset.id);
            return;
        }
    });

    // ============================================
    // ADMIN CRUD FUNCTIONS
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

    function editMenuItem(id) {
        if (!isAdmin) { showToast('❌ Anda tidak memiliki akses admin'); return; }
        db.collection('menu').doc(id).get()
            .then(doc => {
                if (!doc.exists) { showToast('❌ Menu tidak ditemukan'); return; }
                const data = doc.data();
                editingId = id;
                formTitle.textContent = '✏️ Edit Menu';
                saveBtn.textContent = '💾 Update Menu';
                inputName.value = data.name || '';
                inputPrice.value = data.price || '';
                inputDesc.value = data.desc || '';
                inputCategory.value = data.category || 'kopi-klasik';
                inputTag.value = data.tag || '';
                inputStock.value = data.stock !== undefined ? data.stock : 10;
                inputPromo.value = data.promoPrice || '';
                currentFile = null;
                if (fileInput) fileInput.value = '';
                uploadProgress.classList.add('hidden');
                progressFill.style.width = '0%';
                progressText.textContent = '';
                if (data.image && data.image.trim() !== '') {
                    inputImage.value = data.image;
                    inputImagePublicId.value = data.imagePublicId || '';
                    previewImage.src = data.image;
                    previewWrapper.classList.remove('hidden');
                    if (previewStatus) {
                        previewStatus.textContent = '📷 Gambar saat ini';
                        previewStatus.className = 'preview-status';
                    }
                } else {
                    inputImage.value = '';
                    inputImagePublicId.value = '';
                    previewWrapper.classList.add('hidden');
                    previewImage.src = '';
                }
                document.getElementById('formCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
                trackEvent('Admin', 'edit_menu', data.name);
            })
            .catch(err => { console.error('Error loading menu:', err); showToast('❌ Gagal memuat data menu: ' + err.message); });
    }

    function deleteMenuItem(id, name) {
        if (!isAdmin) return;
        const confirmText = prompt(`⚠️ HAPUS PERMANEN\n\nMenu "${name}" akan dihapus.\nKetik "HAPUS" untuk konfirmasi:`);
        if (confirmText !== 'HAPUS') { showToast('❌ Penghapusan dibatalkan'); return; }
        db.collection('menu').doc(id).get().then(doc => {
            const data = doc.data();
            if (data.imagePublicId) deleteImageFromCloudinary(data.imagePublicId);
            return db.collection('menu').doc(id).delete();
        }).then(() => {
            showToast('✅ Menu berhasil dihapus');
            trackEvent('Admin', 'delete_menu', name);
        }).catch(err => {
            console.error('Error deleting:', err);
            showToast('❌ Gagal menghapus menu: ' + err.message);
        });
    }

    // ============================================
    // ORDER HISTORY (customer) — auto-refresh 5 detik
    // ============================================
    async function loadOrderHistoryFromFirestore() {
        try {
            await anonAuthReady;
            const uid = auth.currentUser?.uid;
            if (!uid) throw new Error('Belum terautentikasi — coba refresh halaman.');

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
            console.error('Error loading history from Firestore:', err);
            return JSON.parse(localStorage.getItem('flora-order-history')) || [];
        }
    }

    async function showOrderHistory() {
        const history = await loadOrderHistoryFromFirestore();
        const container = document.getElementById('historyList');
        if (!container) return;

        container.innerHTML = '';
        if (history.length === 0) {
            const t = translations[currentLang];
            const empty = document.createElement('div');
            empty.className = 'history-empty';
            empty.textContent = t.historyEmpty || '📭 Belum ada riwayat pesanan.';
            container.appendChild(empty);
            return;
        }

        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';

            const dateDiv = document.createElement('div');
            dateDiv.className = 'date';
            dateDiv.textContent = '📅 ' + item.date;
            div.appendChild(dateDiv);

            let itemsDisplay = '';
            if (Array.isArray(item.items)) {
                itemsDisplay = item.items.map(i => `${i.name} x${i.qty}`).join(', ');
            } else if (typeof item.items === 'string') {
                itemsDisplay = item.items;
            } else {
                itemsDisplay = '-';
            }

            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'items';
            itemsDiv.textContent = itemsDisplay;
            div.appendChild(itemsDiv);

            const totalDiv = document.createElement('div');
            totalDiv.className = 'total';
            totalDiv.textContent = 'Total: ' + item.total;
            div.appendChild(totalDiv);

            if (item.customerNote) {
                const noteDiv = document.createElement('div');
                noteDiv.style.cssText = 'font-size:12px;color:var(--text-muted);font-style:italic;margin-top:2px;';
                noteDiv.textContent = '📝 ' + item.customerNote;
                div.appendChild(noteDiv);
            }

            const statusSpan = document.createElement('span');
            statusSpan.className = 'status-badge';
            if (item.status === 'pending') {
                statusSpan.classList.add('pending');
                statusSpan.textContent = '⏳ Menunggu konfirmasi';
            } else if (item.status === 'completed') {
                statusSpan.classList.add('completed');
                statusSpan.textContent = '✅ Selesai';
            } else if (item.status === 'cancelled') {
                statusSpan.classList.add('cancelled');
                statusSpan.textContent = '❌ Dibatalkan';
            } else {
                statusSpan.textContent = '📌 ' + item.status;
            }
            div.appendChild(statusSpan);

            container.appendChild(div);
        });
    }

    const historyBtn = document.getElementById('historyBtn');
    const historyModal = document.getElementById('historyModal');
    const historyModalClose = document.getElementById('historyModalClose');
    let historyRefreshInterval = null;

    if (historyBtn) {
        historyBtn.addEventListener('click', function() {
            showOrderHistory();
            historyModal.classList.add('show');
            trackEvent('Engagement', 'view_history');

            if (historyRefreshInterval) clearInterval(historyRefreshInterval);
            historyRefreshInterval = setInterval(() => {
                if (historyModal.classList.contains('show')) {
                    showOrderHistory();
                } else {
                    clearInterval(historyRefreshInterval);
                    historyRefreshInterval = null;
                }
            }, 5000);
        });
    }

    if (historyModalClose) {
        historyModalClose.addEventListener('click', function() {
            historyModal.classList.remove('show');
            if (historyRefreshInterval) {
                clearInterval(historyRefreshInterval);
                historyRefreshInterval = null;
            }
        });
    }

    if (historyModal) {
        historyModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                if (historyRefreshInterval) {
                    clearInterval(historyRefreshInterval);
                    historyRefreshInterval = null;
                }
            }
        });
    }

    // ============================================
    // ORDER BUTTON
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
                        'Halo Kedai Flora,\n\nSaya mau pesan:\n' +
                        rawItems.map((item, i) => `${i+1}. ${item}`).join('\n') +
                        '\n\nTotal: Rp' + calculatedTotal.toLocaleString('id-ID') +
                        '\n\nMohon dikonfirmasi setelah pembayaran.'
                    );
                    window.open('https://wa.me/628562622436?text=' + message, '_blank');

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
    // DASHBOARD STATS
    // ============================================
    async function loadDashboardStats() {
        try {
            const menuSnapshot = await db.collection('menu').get();
            document.getElementById('statMenus').textContent = menuSnapshot.size;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startOfDay = firebase.firestore.Timestamp.fromDate(today);
            const endOfDay = firebase.firestore.Timestamp.fromDate(new Date(today.getTime() + 86400000));

            let completedOrders = 0;
            let totalRevenue = 0;
            let customerSet = new Set();

            try {
                const ordersSnapshot = await db.collection('orders')
                    .where('status', '==', 'completed')
                    .where('timestamp', '>=', startOfDay)
                    .where('timestamp', '<', endOfDay)
                    .get();
                ordersSnapshot.forEach(doc => {
                    const data = doc.data();
                    completedOrders++;
                    totalRevenue += data.total || 0;
                    const customerId = data.uid || data.deviceId;
                    if (customerId) customerSet.add(customerId);
                });
            } catch (indexError) {
                const ordersSnapshot = await db.collection('orders')
                    .where('timestamp', '>=', startOfDay)
                    .where('timestamp', '<', endOfDay)
                    .get();
                ordersSnapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.status === 'completed') {
                        completedOrders++;
                        totalRevenue += data.total || 0;
                        const customerId = data.uid || data.deviceId;
                        if (customerId) customerSet.add(customerId);
                    }
                });
            }

            document.getElementById('statOrders').textContent = completedOrders;
            document.getElementById('statRevenue').textContent = 'Rp' + totalRevenue.toLocaleString('id-ID');
            document.getElementById('statCustomers').textContent = customerSet.size || '-';

            await loadSalesChart();
            loadPendingOrders();

        } catch (error) {
            console.error('❌ Error loading dashboard:', error);
            const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
            document.getElementById('statOrders').textContent = history.filter(h => h.status === 'completed').length;
        }
    }

    // ============================================
    // SALES CHART — FIXED OVERFLOW
    // ============================================
    async function loadSalesChart() {
        const container = document.getElementById('chartContainer');
        const barsContainer = document.getElementById('chartBars');
        if (!container || !barsContainer) return;

        try {
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                date.setHours(0, 0, 0, 0);
                const startOfDay = firebase.firestore.Timestamp.fromDate(date);
                const endOfDay = firebase.firestore.Timestamp.fromDate(new Date(date.getTime() + 86400000));

                let dailyTotal = 0;
                try {
                    const snapshot = await db.collection('orders')
                        .where('status', '==', 'completed')
                        .where('timestamp', '>=', startOfDay)
                        .where('timestamp', '<', endOfDay)
                        .get();
                    snapshot.forEach(doc => { dailyTotal += doc.data().total || 0; });
                } catch (e) {
                    const snapshot = await db.collection('orders')
                        .where('timestamp', '>=', startOfDay)
                        .where('timestamp', '<', endOfDay)
                        .get();
                    snapshot.forEach(doc => {
                        if (doc.data().status === 'completed') dailyTotal += doc.data().total || 0;
                    });
                }
                last7Days.push({
                    date: date.toLocaleDateString('id-ID', { weekday: 'short' }),
                    total: dailyTotal,
                    label: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
                });
            }

            const hasData = last7Days.some(d => d.total > 0);
            if (!hasData) { container.style.display = 'none'; return; }
            container.style.display = 'block';
            const maxTotal = Math.max(...last7Days.map(d => d.total), 1);

            barsContainer.innerHTML = last7Days.map(day => {
                const barHeight = Math.min(80, Math.max(4, (day.total / maxTotal) * 80));
                return `
                    <div class="chart-bar-wrap">
                        <div class="chart-bar-value">${day.total > 0 ? 'Rp' + (day.total/1000).toFixed(0) + 'k' : ''}</div>
                        <div class="chart-bar" style="height: ${barHeight}px;"></div>
                        <div class="chart-bar-label">${day.label}</div>
                    </div>
                `;
            }).join('');

        } catch (err) {
            console.error('Error loading chart:', err);
            container.style.display = 'none';
        }
    }

    // ============================================
    // CLOUDINARY UPLOAD
    // ============================================
    function validateFile(file) {
        if (!file) return { valid: false, message: 'Tidak ada file.' };
        if (!ALLOWED_TYPES.includes(file.type)) {
            return { valid: false, message: '❌ Format tidak didukung. Gunakan JPG, PNG, atau WebP.' };
        }
        if (file.size > MAX_FILE_SIZE) {
            return { valid: false, message: `❌ File terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 5MB.` };
        }
        return { valid: true };
    }

    async function uploadToCloudinary(file) {
        const validation = validateFile(file);
        if (!validation.valid) {
            showToast(validation.message);
            return null;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        isUploading = true;
        uploadProgress.classList.remove('hidden');
        progressFill.style.width = '0%';
        progressText.textContent = '⏳ Mengupload... 0%';
        previewWrapper.classList.add('hidden');

        try {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    progressFill.style.width = percent + '%';
                    progressText.textContent = `⏳ Mengupload... ${percent}%`;
                }
            });

            const response = await new Promise((resolve, reject) => {
                xhr.open('POST', CLOUDINARY_URL);
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        let errorMsg = xhr.statusText || 'Upload gagal';
                        try {
                            const errData = JSON.parse(xhr.responseText);
                            if (errData.error && errData.error.message) {
                                errorMsg = errData.error.message;
                            }
                        } catch (e) {}
                        reject(new Error(errorMsg));
                    }
                };
                xhr.onerror = () => reject(new Error('Network error - cek koneksi internet'));
                xhr.send(formData);
            });

            isUploading = false;
            progressFill.style.width = '100%';
            progressText.textContent = '✅ Upload berhasil!';

            previewImage.src = response.secure_url;
            previewWrapper.classList.remove('hidden');
            inputImage.value = response.secure_url;
            inputImagePublicId.value = response.public_id || '';
            currentFile = file;

            if (previewStatus) {
                previewStatus.textContent = '✅ Upload berhasil';
                previewStatus.className = 'preview-status success';
            }

            setTimeout(() => {
                uploadProgress.classList.add('hidden');
            }, 1500);

            showToast('✅ Gambar berhasil diupload!');
            trackEvent('Admin', 'upload_image', file.name);

            return { url: response.secure_url, publicId: response.public_id || '' };

        } catch (error) {
            console.error('Upload error:', error);
            isUploading = false;
            progressFill.style.width = '0%';
            progressText.textContent = '❌ Upload gagal!';
            uploadProgress.classList.remove('hidden');

            let errorMessage = error.message || 'Terjadi kesalahan';
            showToast('❌ Gagal upload: ' + errorMessage);

            if (previewStatus) {
                previewStatus.textContent = '❌ ' + errorMessage;
                previewStatus.className = 'preview-status error';
            }

            return null;
        }
    }

    async function deleteImageFromCloudinary(publicId) {
        if (!publicId) return;
        try {
            console.log('🗑️ Would delete image:', publicId);
        } catch (err) {
            console.error('Failed to delete image:', err);
        }
    }

    // ============================================
    // UPLOAD EVENT LISTENERS
    // ============================================
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            currentFile = file;
            uploadToCloudinary(file);
        });
    }

    if (uploadZone) {
        uploadZone.addEventListener('click', function() {
            if (isUploading) {
                showToast('⏳ Tunggu upload selesai dulu ya!');
                return;
            }
            if (fileInput) fileInput.click();
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        uploadZone.addEventListener('dragover', function() {
            if (!isUploading) this.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', function(e) {
            this.classList.remove('dragover');
            if (isUploading) {
                showToast('⏳ Tunggu upload selesai dulu ya!');
                return;
            }
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                currentFile = files[0];
                if (fileInput) fileInput.files = files;
                uploadToCloudinary(files[0]);
            }
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', function() {
            if (editingId && inputImage.value) {
                if (!confirm('⚠️ Hapus gambar saat ini?\n\nAnda harus upload gambar baru sebelum menyimpan.')) {
                    return;
                }
            }

            currentFile = null;
            inputImage.value = '';
            inputImagePublicId.value = '';
            previewWrapper.classList.add('hidden');
            previewImage.src = '';
            if (fileInput) fileInput.value = '';
            uploadProgress.classList.add('hidden');
            progressFill.style.width = '0%';
            progressText.textContent = '';

            if (previewStatus) {
                previewStatus.textContent = '🗑️ Gambar dihapus';
                previewStatus.className = 'preview-status';
            }

            showToast('🗑️ Gambar dihapus dari form');
        });
    }

    // ============================================
    // RENDER MENU (public) — dengan Signature & New
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

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'item-checkbox';
                if (item.stock === 0) { checkbox.disabled = true; checkbox.style.opacity = '0.4'; }
                itemDiv.appendChild(checkbox);

                const info = document.createElement('div');
                info.className = 'item-info';
                const nameSpan = document.createElement('div');
                nameSpan.className = 'item-name';
                nameSpan.textContent = item.name || 'Unknown';

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
                if (item.tag === 'New') {
                    const tag = document.createElement('span');
                    tag.className = 'item-tag tag-new';
                    tag.textContent = '✨ New';
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

                const savedQty = cartData[item.id] || 0;
                if (savedQty > 0 && item.stock !== 0) {
                    checkbox.checked = true;
                    qtySpan.textContent = savedQty;
                    qtySpan.classList.remove('zero');
                }

                checkbox.addEventListener('change', function() {
                    if (item.stock === 0) return;
                    const qty = parseInt(qtySpan.textContent) || 0;
                    if (!this.checked) {
                        delete cartData[item.id];
                        saveCart();
                        qtySpan.textContent = '0';
                        qtySpan.classList.add('zero');
                        trackRemoveFromCart(item.name);
                    } else if (qty === 0) {
                        cartData[item.id] = 1;
                        saveCart();
                        qtySpan.textContent = '1';
                        qtySpan.classList.remove('zero');
                        trackAddToCart(item.name, activePrice, 1);
                        showToast(`✅ ${item.name} ×1 ditambahkan`);
                    } else {
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
    // SCROLL REVEAL
    // ============================================
    let revealObserver = null;
    function setupScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.category').forEach(el => el.classList.add('revealed'));
            return;
        }
        if (revealObserver) revealObserver.disconnect();
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.category').forEach(el => revealObserver.observe(el));
    }

    // ============================================
    // LOAD MENU
    // ============================================
    function loadMenu() {
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
                if (isAdmin) renderAdminMenu(defaultMenuData);
                return;
            }
            const data = [];
            snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
            renderMenu(data);
            if (isAdmin) renderAdminMenu(data);
        }, (error) => {
            console.error('Firestore error:', error);
            skeletonContainer.style.display = 'none';
            menuContainer.style.display = 'block';
            renderMenu(defaultMenuData);
            if (isAdmin) renderAdminMenu(defaultMenuData);
        });
    }

    // ============================================
    // LOAD MENU FOR ADMIN
    // ============================================
    async function loadMenuForAdmin() {
        if (!isAdmin) return;
        try {
            loadingMenu.classList.remove('hidden');
            loadingMenu.textContent = '⏳ Memuat menu...';
            const snapshot = await db.collection('menu').orderBy('name').get();
            if (snapshot.empty) {
                defaultMenuData.forEach(item => {
                    db.collection('menu').doc(item.id).set(item).catch(() => {});
                });
                renderAdminMenu(defaultMenuData);
            } else {
                const data = [];
                snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
                renderAdminMenu(data);
            }
            loadingMenu.classList.add('hidden');
        } catch (err) {
            console.error('Error loading admin menu:', err);
            loadingMenu.textContent = '❌ Gagal memuat menu';
            renderAdminMenu(defaultMenuData);
            setTimeout(() => { loadingMenu.classList.add('hidden'); }, 2000);
        }
    }

    // ============================================
    // RENDER ADMIN MENU — dengan badge New
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
            if (item.tag === 'New') {
                const badge = document.createElement('span');
                badge.className = 'badge-new';
                badge.textContent = '✨ New';
                imgDiv.appendChild(badge);
            }
            if (item.stock === 0) {
                const badge = document.createElement('span');
                badge.className = 'badge-habis';
                badge.textContent = '⛔ Habis';
                imgDiv.appendChild(badge);
            }
            card.appendChild(imgDiv);

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
            if (item.tag && item.tag !== 'Promo' && item.tag !== 'Favorit' && item.tag !== 'New') {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag tag-' + item.tag.toLowerCase();
                tagSpan.textContent = item.tag;
                metaDiv.appendChild(tagSpan);
            }
            infoDiv.appendChild(metaDiv);
            card.appendChild(infoDiv);

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
    // RESET FORM
    // ============================================
    function resetForm() {
        editingId = null;
        formTitle.textContent = '📝 Tambah Menu Baru';
        saveBtn.textContent = '💾 Simpan Menu';
        inputName.value = '';
        inputPrice.value = '';
        inputDesc.value = '';
        inputCategory.value = 'kopi-klasik';
        inputTag.value = '';
        inputStock.value = '10';
        inputPromo.value = '';
        inputImage.value = '';
        inputImagePublicId.value = '';
        previewWrapper.classList.add('hidden');
        previewImage.src = '';
        currentFile = null;
        if (fileInput) fileInput.value = '';
        uploadProgress.classList.add('hidden');
        progressFill.style.width = '0%';
        progressText.textContent = '';
        if (previewStatus) {
            previewStatus.textContent = '';
            previewStatus.className = 'preview-status';
        }
    }

    if (newMenuBtn) newMenuBtn.addEventListener('click', resetForm);
    if (cancelBtn) cancelBtn.addEventListener('click', resetForm);

    // ============================================
    // SAVE MENU (admin)
    // ============================================
    if (saveBtn) {
        saveBtn.addEventListener('click', async function() {
            if (!isAdmin) { showToast('❌ Anda tidak memiliki akses admin'); return; }
            const name = inputName.value.trim();
            const price = parseInt(inputPrice.value);
            const desc = inputDesc.value.trim();
            const category = inputCategory.value;
            const tag = inputTag.value.trim();
            const stock = parseInt(inputStock.value);
            const promoPrice = inputPromo.value ? parseInt(inputPromo.value) : null;
            const image = inputImage.value.trim();
            const imagePublicId = inputImagePublicId.value.trim();

            if (!name) { showToast('❌ Nama menu wajib diisi'); inputName.focus(); return; }
            if (isNaN(price) || price < 0) { showToast('❌ Harga harus diisi dengan angka valid'); inputPrice.focus(); return; }
            if (isNaN(stock) || stock < 0) { showToast('❌ Stok harus diisi dengan angka valid'); inputStock.focus(); return; }
            if (promoPrice !== null && (isNaN(promoPrice) || promoPrice < 0 || promoPrice >= price)) {
                showToast('❌ Harga promo harus lebih kecil dari harga normal'); inputPromo.focus(); return;
            }
            if (name.length > 100) { showToast('❌ Nama terlalu panjang (maks 100 karakter)'); inputName.focus(); return; }
            if (desc.length > 500) { showToast('❌ Deskripsi terlalu panjang (maks 500 karakter)'); inputDesc.focus(); return; }

            try {
                const existing = await db.collection('menu').where('name', '==', name).get();
                if (!existing.empty && existing.docs[0].id !== editingId) {
                    showToast('❌ Nama menu sudah ada! Gunakan nama lain.'); inputName.focus(); return;
                }
            } catch (err) { console.error('Error checking duplicate:', err); }

            const data = {
                name, price, desc: desc || '', category, tag: tag || '', stock,
                promoPrice: promoPrice, image: image || '', imagePublicId: imagePublicId || '',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                if (editingId) {
                    const oldDoc = await db.collection('menu').doc(editingId).get();
                    if (oldDoc.exists && oldDoc.data().imagePublicId && oldDoc.data().imagePublicId !== imagePublicId) {
                        deleteImageFromCloudinary(oldDoc.data().imagePublicId);
                    }
                    await db.collection('menu').doc(editingId).update(data);
                    showToast('✅ Menu berhasil diupdate!');
                    trackEvent('Admin', 'update_menu', name);
                } else {
                    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                    const newId = Date.now().toString();
                    await db.collection('menu').doc(newId).set(data);
                    showToast('✅ Menu baru berhasil ditambahkan!');
                    trackEvent('Admin', 'add_menu', name);
                }
                resetForm();
                loadDashboardStats();
            } catch (err) {
                console.error('Error saving:', err);
                showToast('❌ Gagal menyimpan menu: ' + err.message);
            }
        });
    }

    // ============================================
    // AUTHENTICATION
    // ============================================
    auth.onAuthStateChanged(user => {
        if (user && !user.isAnonymous && ADMIN_EMAILS.includes(user.email)) {
            isAdmin = true;
            adminSection.classList.remove('admin-hidden');
            adminSection.style.display = 'block';
            adminUserEmail.textContent = user.email;
            loadDashboardStats();
            loadOperationalStatus();
            loadMenuForAdmin();
            loadMenu();
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
            trackEvent('Auth', 'admin_login', user.email);
            console.log('✅ Admin logged in, menu loaded');
        } else {
            isAdmin = false;
            adminSection.classList.add('admin-hidden');
            adminSection.style.display = 'none';
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
            if (!user) {
                auth.signInAnonymously().catch(err => console.error('❌ Anonymous sign-in gagal:', err));
            }
        }
    });

    // ============================================
    // SECRET TRIGGER
    // ============================================
    let tapCount = 0;
    let tapTimer = null;
    if (secretTrigger) {
        secretTrigger.addEventListener('click', function() {
            tapCount++;
            if (tapTimer) clearTimeout(tapTimer);
            tapTimer = setTimeout(() => { tapCount = 0; }, 1000);
            if (tapCount >= 5) {
                tapCount = 0;
                if (!isAdmin) {
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
                            console.error('Auth error:', err);
                            showToast('❌ Gagal login: ' + err.message);
                        });
                } else {
                    showToast('👋 Anda sudah login sebagai admin');
                }
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            auth.signOut().then(() => {
                showToast('👋 Logout berhasil');
                trackEvent('Auth', 'admin_logout');
                isAdmin = false;
                adminSection.classList.add('admin-hidden');
                adminSection.style.display = 'none';
                document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
            }).catch(err => {
                console.error('Logout error:', err);
                showToast('❌ Gagal logout');
            });
        });
    }

    // ============================================
    // BACKUP & EXPORT
    // ============================================
    if (backupBtn) {
        backupBtn.addEventListener('click', function() {
            if (!isAdmin) { showToast('❌ Hanya admin yang bisa backup'); return; }
            db.collection('menu').get().then(snapshot => {
                const data = [];
                snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `flora-backup-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
                showToast('✅ Backup berhasil diunduh');
                trackEvent('Admin', 'backup');
            }).catch(err => {
                console.error('Backup error:', err);
                showToast('❌ Gagal backup data');
            });
        });
    }

    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', async function() {
            if (!isAdmin) { showToast('❌ Hanya admin yang bisa export'); return; }
            try {
                const snapshot = await db.collection('orders')
                    .where('status', '==', 'completed')
                    .orderBy('timestamp', 'desc')
                    .limit(200)
                    .get();
                const rows = [['Tanggal', 'Total', 'Items', 'Note']];
                const toCsvCell = (value) => {
                    let str = String(value ?? '');
                    if (/^[\t\r ]*[=+\-@]/.test(str)) {
                        str = `'${str}`;
                    }
                    if (/[",\n]/.test(str)) {
                        return `"${str.replace(/"/g, '""')}"`;
                    }
                    return str;
                };
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const itemsText = Array.isArray(data.items)
                        ? data.items.map(i => `${i?.name || '-'} x${i?.qty || 0}`).join(' | ')
                        : (typeof data.items === 'string' ? data.items : '-');
                    rows.push([
                        data.timestamp?.toDate?.()?.toLocaleString('id-ID') || '-',
                        'Rp' + (data.total || 0).toLocaleString('id-ID'),
                        itemsText,
                        data.customerNote || ''
                    ]);
                });
                const csv = rows.map(row => row.map(toCsvCell).join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `flora-report-${new Date().toISOString().slice(0,10)}.csv`;
                a.click();
                URL.revokeObjectURL(url);
                showToast('✅ Laporan berhasil diexport');
                trackEvent('Admin', 'export_report');
            } catch (err) {
                console.error('Export error:', err);
                showToast('❌ Gagal export laporan: ' + err.message);
            }
        });
    }

    // ============================================
    // CLEAN GHOST ORDERS — ARCHIVE
    // ============================================
    if (cleanGhostOrdersBtn) {
        cleanGhostOrdersBtn.addEventListener('click', async function() {
            if (!isAdmin) {
                showToast('❌ Hanya admin yang bisa membersihkan data');
                return;
            }

            cleanGhostOrdersBtn.disabled = true;
            cleanGhostOrdersBtn.textContent = '⏳ Memeriksa...';

            try {
                const snapshot = await db.collection('orders').get();
                const ghosts = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.status !== 'pending' && data.status !== 'completed' && data.status !== 'cancelled') {
                        ghosts.push(doc.id);
                    }
                });

                if (ghosts.length === 0) {
                    showToast('✅ Tidak ada ghost order');
                    cleanGhostOrdersBtn.disabled = false;
                    cleanGhostOrdersBtn.textContent = '🧹 Arsipkan Ghost Orders';
                    return;
                }

                const sure = confirm(
                    `Ditemukan ${ghosts.length} ghost order (status tidak dikenal).\n\n` +
                    `Semua akan diarsipkan (status menjadi "archived") dan TIDAK akan muncul di daftar aktif.\n\n` +
                    `Lanjutkan?`
                );
                if (!sure) {
                    showToast('Dibatalkan');
                    cleanGhostOrdersBtn.disabled = false;
                    cleanGhostOrdersBtn.textContent = '🧹 Arsipkan Ghost Orders';
                    return;
                }

                cleanGhostOrdersBtn.textContent = `⏳ Memproses 0/${ghosts.length}...`;

                let processed = 0;
                for (let i = 0; i < ghosts.length; i += 500) {
                    const chunk = ghosts.slice(i, i + 500);
                    const batch = db.batch();
                    chunk.forEach(id => {
                        const ref = db.collection('orders').doc(id);
                        batch.update(ref, {
                            status: 'archived',
                            archivedAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    });
                    await batch.commit();
                    processed += chunk.length;
                    cleanGhostOrdersBtn.textContent = `⏳ Memproses ${processed}/${ghosts.length}...`;
                }

                showToast(`✅ ${processed} ghost order berhasil diarsipkan`);
                trackEvent('Admin', 'archive_ghost_orders', '', processed);
                loadDashboardStats();

            } catch (err) {
                console.error('Clean ghost orders error:', err);
                showToast('❌ Gagal mengarsipkan: ' + err.message);
            } finally {
                cleanGhostOrdersBtn.disabled = false;
                cleanGhostOrdersBtn.textContent = '🧹 Arsipkan Ghost Orders';
            }
        });
    }

    // ============================================
    // TOAST SYSTEM
    // ============================================
    function showToast(message, duration = 2500) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => { toast.classList.add('show'); });
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => { toast.remove(); }, 400);
        }, duration);
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); searchInput.focus(); }
        if (e.key === 'Escape') {
            if (searchInput.value) { searchInput.value = ''; filterMenu(); searchInput.blur(); }
            if (historyModal && historyModal.classList.contains('show')) historyModal.classList.remove('show');
            if (waConfirmModal && waConfirmModal.classList.contains('show')) waConfirmModal.classList.remove('show');
            if (cartDropdown && cartDropdown.classList.contains('show')) cartDropdown.classList.remove('show');
        }
        if (e.altKey && e.key >= '1' && e.key <= '5') {
            const filters = ['all', 'signature', 'kopi-klasik', 'non-kopi', 'camilan', 'mie'];
            const idx = parseInt(e.key);
            const filter = filters[idx] || 'all';
            const btn = document.querySelector(`.cat-filter-btn[data-filter="${filter}"]`);
            if (btn) btn.click();
        }
    });

    // ============================================
    // LANGUAGE SWITCH
    // ============================================
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() { setLang(this.dataset.lang); });
    });

    // ============================================
    // NETWORK STATUS
    // ============================================
    window.addEventListener('online', function() {
        showToast('🔄 Koneksi kembali online!');
        loadMenu();
        if (isAdmin) { loadDashboardStats(); loadMenuForAdmin(); }
    });
    window.addEventListener('offline', function() {
        showToast('⚠️ Koneksi terputus. Menggunakan data offline.');
    });

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

    console.log('🌿 Kedai Flora Menu v3.3 — Transaction fix, all features!');

})();