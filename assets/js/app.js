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

        function updateEl(id, value) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }

        updateEl('langEyebrow', t.eyebrow);
        updateEl('langBrand', t.brand);
        updateEl('langBrandEm', t.brandEm);
        updateEl('langTagline', t.tagline);
        updateEl('langHours', t.hours);
        updateEl('langDays', t.days);
        updateEl('langLocation', t.location);
        updateEl('langDinein', t.dinein);
        updateEl('langWa', t.wa);
        updateEl('langMaps', t.maps);
        updateEl('langShare', t.share);
        updateEl('langPrint', t.print);
        updateEl('langHistory', t.history);
        updateEl('langAll', t.all);
        updateEl('langCoffee', t.coffee);
        updateEl('langNonCoffee', t.nonCoffee);
        updateEl('langSnacks', t.snacks);
        updateEl('langNoodles', t.noodles);
        updateEl('langNoResult', t.noResult);
        updateEl('langTotal', t.total);
        updateEl('langEmptyCart', t.emptyCart);
        updateEl('langOrderNow', t.orderNow);
        updateEl('langFooterTitle', t.footerTitle);
        updateEl('langFooterDesc', t.footerDesc);
        updateEl('langWaFooter', t.waFooter);
        updateEl('langMapsFooter', t.mapsFooter);
        updateEl('langPrintFooter', t.printFooter);
        updateEl('langMenuOfTheDay', t.menuOfTheDay);
        updateEl('langHistoryTitle', t.historyTitle);

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

    // Upload elements
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

    let cartData = JSON.parse(localStorage.getItem('flora-cart')) || {};
    let editingId = null;
    let isAdmin = false;
    let searchTimeout = null;
    let currentFile = null;
    let isUploading = false;
    let menuUnsubscribe = null;

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

    const defaultMenuData = [
        { id: '1', name: 'Ice Rost Latte', desc: 'Kopi dingin dengan rasa yang segar.', price: 7000,
            category: 'kopi-klasik', tag: '', image: '', stock: 10 },
        { id: '2', name: "Flora's Coffee", desc: 'Kopi khas Flora dengan rasa yang khas.', price: 8000,
            category: 'kopi-klasik', tag: '', image: '', stock: 10 },
        { id: '3', name: 'Nescafe', desc: 'Kopi sachet klasik yang nikmat.', price: 4000, category: 'kopi-klasik',
            tag: '', image: '', stock: 10 },
        { id: '4', name: 'Ice Tea', desc: 'Teh dingin segar.', price: 3000, category: 'non-kopi', tag: '',
            image: '', stock: 10 },
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
            tag: '', image: '', stock: 10 },
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
    // DARK MODE
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

    // ============================================
    // SCROLL TO TOP
    // ============================================
    window.addEventListener('scroll', function() {
        scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // STATUS BUKA/TUTUP (dengan override)
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

        if (operationalOverride === 'open') {
            el.textContent = '🟢 Buka (Override)';
            return;
        }
        if (operationalOverride === 'closed') {
            el.textContent = '🔴 Tutup (Override)';
            return;
        }

        const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit',
            hour12: false }));
        const isOpen = (hour >= 11 && hour < 23);
        const t = translations[currentLang];
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
    // SHARE MENU
    // ============================================
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const shareData = { title: 'Flora Coffee — Menu', text: 'Cek menu Flora Coffee di sini!',
            url: window.location.href };
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
    // GOOGLE ANALYTICS TRACKING
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

    function filterMenu() {
        const keyword = searchInput.value.toLowerCase().trim();
        const items = document.querySelectorAll('.item');
        const categories = document.querySelectorAll('.category');
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

        categories.forEach(cat => {
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
                const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${escaped})`, 'gi');
                el.innerHTML = original.replace(regex, '<mark>$1</mark>');
            } else {
                el.innerHTML = original;
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

            saveOrderToFirestore({
                items: orderList.join(' · '),
                total: total,
                rawItems: orderList,
                customerNote: ''
            });

        } else {
            cartSummary.classList.remove('show');
        }

        updateCartBadge();
        updateCartMini();
    }

    // ============================================
    // SAVE ORDER TO FIRESTORE
    // ============================================
    async function saveOrderToFirestore(order) {
        try {
            await db.collection('orders').add({
                items: order.items,
                total: order.total,
                rawItems: order.rawItems || [],
                customerNote: order.customerNote || '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                source: 'web'
            });
            console.log('✅ Order saved to Firestore');
        } catch (err) {
            console.error('❌ Failed to save order:', err);
            const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
            history.push({
                id: Date.now(),
                items: order.items,
                total: 'Rp' + order.total.toLocaleString('id-ID'),
                date: new Date().toLocaleString('id-ID')
            });
            while (history.length > 50) history.shift();
            localStorage.setItem('flora-order-history', JSON.stringify(history));
        }
    }

    // ============================================
    // CART BADGE
    // ============================================
    function updateCartBadge() {
        if (!cartBadge) return;
        let totalItems = 0;
        document.querySelectorAll('.item').forEach(item => {
            const checkbox = item.querySelector('.item-checkbox');
            const qtySpan = item.querySelector('.qty-value');
            if (checkbox && checkbox.checked) {
                totalItems += parseInt(qtySpan?.textContent) || 0;
            }
        });

        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
            cartBadge.textContent = totalItems;
            cartBadge.classList.remove('pulse');
            void cartBadge.offsetWidth;
            cartBadge.classList.add('pulse');
        } else {
            cartBadge.style.display = 'none';
        }
    }

    // ============================================
    // FLOATING CART MINI
    // ============================================
    function updateCartMini() {
        if (!cartMini || !cartMiniBadge) return;
        let totalItems = 0;
        document.querySelectorAll('.item').forEach(item => {
            const checkbox = item.querySelector('.item-checkbox');
            const qtySpan = item.querySelector('.qty-value');
            if (checkbox && checkbox.checked) {
                totalItems += parseInt(qtySpan?.textContent) || 0;
            }
        });

        if (totalItems > 0) {
            cartMini.style.display = 'flex';
            cartMiniBadge.textContent = totalItems;
        } else {
            cartMini.style.display = 'none';
        }
    }

    if (cartMini) {
        cartMini.addEventListener('click', function() {
            document.getElementById('cartSummary').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ============================================
    // ORDER HISTORY
    // ============================================
    async function loadOrderHistoryFromFirestore() {
        try {
            const snapshot = await db.collection('orders')
                .orderBy('timestamp', 'desc')
                .limit(50)
                .get();

            const history = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                history.push({
                    id: doc.id,
                    items: data.items || '',
                    total: 'Rp' + (data.total || 0).toLocaleString('id-ID'),
                    date: data.timestamp?.toDate?.()?.toLocaleString('id-ID') || 'Baru saja'
                });
            });

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

        if (history.length === 0) {
            const t = translations[currentLang];
            container.innerHTML = `<div class="history-empty">${t.historyEmpty || '📭 Belum ada riwayat pesanan.'}</div>`;
            return;
        }

        container.innerHTML = history.map(item => `
            <div class="history-item">
                <div class="date">📅 ${item.date}</div>
                <div class="items">${item.items}</div>
                <div class="total">Total: ${item.total}</div>
            </div>
        `).join('');
    }

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

    if (historyModal) {
        historyModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('show');
        });
    }

    // ============================================
    // ADMIN DASHBOARD
    // ============================================
    async function loadDashboardStats() {
        try {
            const menuSnapshot = await db.collection('menu').get();
            document.getElementById('statMenus').textContent = menuSnapshot.size;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startOfDay = firebase.firestore.Timestamp.fromDate(today);

            const ordersSnapshot = await db.collection('orders')
                .where('timestamp', '>=', startOfDay)
                .get();

            let totalRevenue = 0;
            let customerSet = new Set();

            ordersSnapshot.forEach(doc => {
                const data = doc.data();
                totalRevenue += data.total || 0;
                if (data.customerId) customerSet.add(data.customerId);
            });

            document.getElementById('statOrders').textContent = ordersSnapshot.size;
            document.getElementById('statRevenue').textContent = 'Rp' + totalRevenue.toLocaleString('id-ID');
            document.getElementById('statCustomers').textContent = customerSet.size || '-';

            await loadSalesChart();

        } catch (error) {
            console.error('Error loading dashboard:', error);
            const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
            document.getElementById('statOrders').textContent = history.length;
        }
    }

    // ============================================
    // SALES CHART
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

                const snapshot = await db.collection('orders')
                    .where('timestamp', '>=', startOfDay)
                    .where('timestamp', '<', endOfDay)
                    .get();

                let dailyTotal = 0;
                snapshot.forEach(doc => {
                    dailyTotal += doc.data().total || 0;
                });

                last7Days.push({
                    date: date.toLocaleDateString('id-ID', { weekday: 'short' }),
                    total: dailyTotal,
                    label: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
                });
            }

            const hasData = last7Days.some(d => d.total > 0);
            if (!hasData) {
                container.style.display = 'none';
                return;
            }

            container.style.display = 'block';
            const maxTotal = Math.max(...last7Days.map(d => d.total), 1);

            barsContainer.innerHTML = last7Days.map(day => `
                <div class="chart-bar-wrap">
                    <div class="chart-bar-value">${day.total > 0 ? 'Rp' + (day.total/1000).toFixed(0) + 'k' : ''}</div>
                    <div class="chart-bar" style="height: ${(day.total / maxTotal) * 80 + 10}px;"></div>
                    <div class="chart-bar-label">${day.label}</div>
                </div>
            `).join('');

        } catch (err) {
            console.error('Error loading chart:', err);
            container.style.display = 'none';
        }
    }

    // ============================================
    // CLOUDINARY UPLOAD - FIXED!
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
        
        // ✅ FIX: HAPUS transformasi dari FormData
        // Diatur di Cloudinary Dashboard (Upload Preset)

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

            // ✅ Tampilkan preview dengan ukuran terkontrol
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
            if (errorMessage.includes('unsigned')) {
                errorMessage = 'Upload Preset tidak valid. Periksa konfigurasi Cloudinary.';
            }
            showToast('❌ Gagal upload: ' + errorMessage);

            if (previewStatus) {
                previewStatus.textContent = '❌ ' + errorMessage;
                previewStatus.className = 'preview-status error';
            }

            const retryBtn = document.createElement('button');
            retryBtn.className = 'btn btn-sm';
            retryBtn.textContent = '🔄 Coba Lagi';
            retryBtn.style.marginTop = '8px';
            retryBtn.onclick = () => {
                if (currentFile) {
                    uploadToCloudinary(currentFile);
                } else if (fileInput && fileInput.files[0]) {
                    uploadToCloudinary(fileInput.files[0]);
                }
                retryBtn.remove();
            };

            const progressContainer = document.querySelector('.upload-progress');
            if (progressContainer) {
                const oldRetry = progressContainer.querySelector('.btn');
                if (oldRetry) oldRetry.remove();
                progressContainer.appendChild(retryBtn);
            }

            return null;
        }
    }

    // ============================================
    // DELETE IMAGE FROM CLOUDINARY
    // ============================================
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

    // ============================================
    // REMOVE IMAGE - FIXED!
    // ============================================
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
    // RENDER MENU (Public)
    // ============================================
    function renderMenu(data) {
        skeletonContainer.style.display = 'none';
        menuContainer.style.display = 'block';
        menuContainer.innerHTML = '';

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
            head.innerHTML = `
                <span class="cat-num">${String(catIndex).padStart(2, '0')}</span>
                <h2>${categoryNames[catKey] || catKey}</h2>
            `;
            section.appendChild(head);

            const desc = document.createElement('p');
            desc.className = 'cat-desc';
            desc.textContent = categoryDescs[catKey] || '';
            section.appendChild(desc);

            grouped[catKey].forEach((item) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.setAttribute('data-name', item.name.toLowerCase());
                itemDiv.setAttribute('data-desc', item.desc.toLowerCase());
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
                if (item.stock === 0) { checkbox.disabled = true;
                    checkbox.style.opacity = '0.4'; }
                itemDiv.appendChild(checkbox);

                const info = document.createElement('div');
                info.className = 'item-info';
                const nameSpan = document.createElement('div');
                nameSpan.className = 'item-name';
                nameSpan.textContent = item.name;

                if (item.tag) {
                    const tag = document.createElement('span');
                    tag.className = 'item-tag';
                    tag.textContent = item.tag;
                    nameSpan.appendChild(tag);
                }
                if (item.promoPrice) {
                    const promo = document.createElement('span');
                    promo.className = 'badge-promo';
                    promo.textContent = '🔥 Promo';
                    nameSpan.appendChild(promo);
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
                descSpan.textContent = item.desc;
                info.appendChild(descSpan);
                itemDiv.appendChild(info);

                const priceSpan = document.createElement('div');
                priceSpan.className = 'item-price';
                if (item.promoPrice) {
                    const original = document.createElement('span');
                    original.className = 'price-original';
                    original.textContent = 'Rp' + Number(item.price).toLocaleString('id-ID');
                    priceSpan.appendChild(original);
                    const promoPrice = document.createElement('span');
                    promoPrice.textContent = 'Rp' + Number(item.promoPrice).toLocaleString('id-ID');
                    priceSpan.appendChild(promoPrice);
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

                const saved = cartData[item.id];
                if (saved && saved.qty > 0 && item.stock !== 0) {
                    checkbox.checked = true;
                    qtySpan.textContent = saved.qty;
                    qtySpan.classList.remove('zero');
                }

                checkbox.addEventListener('change', function() {
                    if (item.stock === 0) return;
                    const qty = parseInt(qtySpan.textContent) || 0;
                    if (!this.checked) {
                        qtySpan.textContent = '0';
                        qtySpan.classList.add('zero');
                        trackRemoveFromCart(item.name);
                    } else if (qty === 0) {
                        qtySpan.textContent = '1';
                        qtySpan.classList.remove('zero');
                        trackAddToCart(item.name, activePrice, 1);
                    } else {
                        trackAddToCart(item.name, activePrice, qty);
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
                        trackAddToCart(item.name, activePrice, val);
                    } else {
                        checkbox.checked = false;
                        trackRemoveFromCart(item.name);
                    }
                    updateCart();
                }

                minusBtn.addEventListener('click', function(e) { e.stopPropagation();
                    updateQty(-1); });
                plusBtn.addEventListener('click', function(e) { e.stopPropagation();
                    updateQty(1); });
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
    // LOAD MENU - FIXED!
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
            snapshot.forEach(doc => { 
                data.push({ id: doc.id, ...doc.data() }); 
            });
            
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
    // LOAD MENU FOR ADMIN - NEW FUNCTION!
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
                snapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                renderAdminMenu(data);
            }
            
            loadingMenu.classList.add('hidden');
        } catch (err) {
            console.error('Error loading admin menu:', err);
            loadingMenu.textContent = '❌ Gagal memuat menu';
            renderAdminMenu(defaultMenuData);
            setTimeout(() => {
                loadingMenu.classList.add('hidden');
            }, 2000);
        }
    }

    // ============================================
    // RENDER ADMIN MENU - FIXED!
    // ============================================
    function renderAdminMenu(data) {
        if (!adminMenuGrid) {
            console.error('adminMenuGrid not found');
            return;
        }
        
        loadingMenu.classList.add('hidden');
        adminMenuGrid.innerHTML = '';
        
        if (!data || data.length === 0) {
            adminMenuGrid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-muted);">
                    <div style="font-size:48px;margin-bottom:12px;">📭</div>
                    <p>Belum ada menu. Klik "Tambah Baru" untuk menambahkan.</p>
                </div>
            `;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'admin-card';
            card.innerHTML = `
                <div class="admin-card-img">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : `<div class="admin-card-placeholder">${categoryIcons[item.category] || '☕'}</div>`}
                    ${item.promoPrice ? '<span class="badge-promo">🔥 Promo</span>' : ''}
                    ${item.stock === 0 ? '<span class="badge-habis">⛔ Habis</span>' : ''}
                </div>
                <div class="admin-card-info">
                    <h4>${item.name}</h4>
                    <p>${item.desc || ''}</p>
                    <div class="admin-card-price">
                        ${item.promoPrice ? `<span class="price-original">Rp${Number(item.price).toLocaleString('id-ID')}</span> Rp${Number(item.promoPrice).toLocaleString('id-ID')}` : `Rp${Number(item.price).toLocaleString('id-ID')}`}
                    </div>
                    <div class="admin-card-meta">
                        <span>${categoryNames[item.category] || item.category}</span>
                        ${item.tag ? `<span class="tag tag-${item.tag.toLowerCase()}">${item.tag}</span>` : ''}
                    </div>
                </div>
                <div class="admin-card-stock">
                    <button onclick="quickUpdateStock('${item.id}', -1)" title="Kurangi stok">−</button>
                    <span>Stok: ${item.stock !== undefined ? item.stock : 10}</span>
                    <button onclick="quickUpdateStock('${item.id}', 1)" title="Tambah stok">+</button>
                </div>
                <div class="admin-card-actions">
                    <button class="btn btn-sm" onclick="editMenuItem('${item.id}')">✏️ Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMenuItem('${item.id}', '${item.name}')">🗑️</button>
                </div>
            `;
            adminMenuGrid.appendChild(card);
        });
    }

    // ============================================
    // QUICK STOCK UPDATE
    // ============================================
    window.quickUpdateStock = async function(id, change) {
        if (!isAdmin) {
            showToast('❌ Hanya admin yang bisa mengubah stok');
            return;
        }
        try {
            const doc = await db.collection('menu').doc(id).get();
            if (!doc.exists) {
                showToast('❌ Menu tidak ditemukan');
                return;
            }
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
    };

    // ============================================
    // CRUD OPERATIONS
    // ============================================
    window.editMenuItem = function(id) {
        if (!isAdmin) {
            showToast('❌ Anda tidak memiliki akses admin');
            return;
        }
        
        db.collection('menu').doc(id).get()
            .then(doc => {
                if (!doc.exists) {
                    showToast('❌ Menu tidak ditemukan');
                    return;
                }
                
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
                
                // Reset image state sebelum load gambar lama
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
                
                document.getElementById('formCard').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                trackEvent('Admin', 'edit_menu', data.name);
            })
            .catch(err => {
                console.error('Error loading menu:', err);
                showToast('❌ Gagal memuat data menu: ' + err.message);
            });
    };

    window.deleteMenuItem = function(id, name) {
        if (!isAdmin) return;
        
        const confirmText = prompt(
            `⚠️ HAPUS PERMANEN\n\nMenu "${name}" akan dihapus.\nKetik "HAPUS" untuk konfirmasi:`
        );
        if (confirmText !== 'HAPUS') {
            showToast('❌ Penghapusan dibatalkan');
            return;
        }

        db.collection('menu').doc(id).get().then(doc => {
            const data = doc.data();
            if (data.imagePublicId) {
                deleteImageFromCloudinary(data.imagePublicId);
            }
            return db.collection('menu').doc(id).delete();
        }).then(() => {
            showToast('✅ Menu berhasil dihapus');
            trackEvent('Admin', 'delete_menu', name);
        }).catch(err => {
            console.error('Error deleting:', err);
            showToast('❌ Gagal menghapus menu: ' + err.message);
        });
    };

    // ============================================
    // FORM HANDLING
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

    if (newMenuBtn) {
        newMenuBtn.addEventListener('click', resetForm);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', async function() {
            if (!isAdmin) {
                showToast('❌ Anda tidak memiliki akses admin');
                return;
            }

            const name = inputName.value.trim();
            const price = parseInt(inputPrice.value);
            const desc = inputDesc.value.trim();
            const category = inputCategory.value;
            const tag = inputTag.value.trim();
            const stock = parseInt(inputStock.value);
            const promoPrice = inputPromo.value ? parseInt(inputPromo.value) : null;
            const image = inputImage.value.trim();
            const imagePublicId = inputImagePublicId.value.trim();

            if (!name) {
                showToast('❌ Nama menu wajib diisi');
                inputName.focus();
                return;
            }
            if (isNaN(price) || price < 0) {
                showToast('❌ Harga harus diisi dengan angka valid');
                inputPrice.focus();
                return;
            }
            if (isNaN(stock) || stock < 0) {
                showToast('❌ Stok harus diisi dengan angka valid');
                inputStock.focus();
                return;
            }
            if (promoPrice !== null && (isNaN(promoPrice) || promoPrice < 0 || promoPrice >= price)) {
                showToast('❌ Harga promo harus lebih kecil dari harga normal');
                inputPromo.focus();
                return;
            }

            try {
                const existing = await db.collection('menu')
                    .where('name', '==', name)
                    .get();
                
                if (!existing.empty && existing.docs[0].id !== editingId) {
                    showToast('❌ Nama menu sudah ada! Gunakan nama lain.');
                    inputName.focus();
                    return;
                }
            } catch (err) {
                console.error('Error checking duplicate:', err);
            }

            const data = {
                name,
                price,
                desc: desc || '',
                category,
                tag: tag || '',
                stock,
                promoPrice: promoPrice,
                image: image || '',
                imagePublicId: imagePublicId || '',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                if (editingId) {
                    const oldDoc = await db.collection('menu').doc(editingId).get();
                    if (oldDoc.exists && oldDoc.data().imagePublicId && 
                        oldDoc.data().imagePublicId !== imagePublicId) {
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
    // AUTHENTICATION - FIXED!
    // ============================================
    auth.onAuthStateChanged(user => {
        if (user && ADMIN_EMAILS.includes(user.email)) {
            isAdmin = true;
            adminSection.classList.remove('admin-hidden');
            adminSection.style.display = 'block';
            adminUserEmail.textContent = user.email;
            
            // Load all data
            loadDashboardStats();
            loadOperationalStatus();
            loadMenuForAdmin(); // ✅ FIX: Load menu langsung
            loadMenu(); // ✅ FIX: Refresh public menu juga
            
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
            trackEvent('Auth', 'admin_login', user.email);
            
            console.log('✅ Admin logged in, menu loaded');
        } else {
            isAdmin = false;
            adminSection.classList.add('admin-hidden');
            adminSection.style.display = 'none';
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        }
    });

    // ============================================
    // SECRET TRIGGER (Tap 5x)
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
    // BACKUP
    // ============================================
    if (backupBtn) {
        backupBtn.addEventListener('click', function() {
            if (!isAdmin) {
                showToast('❌ Hanya admin yang bisa backup');
                return;
            }
            db.collection('menu').get().then(snapshot => {
                const data = [];
                snapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
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

    // ============================================
    // EXPORT REPORT
    // ============================================
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', async function() {
            if (!isAdmin) {
                showToast('❌ Hanya admin yang bisa export');
                return;
            }
            try {
                const snapshot = await db.collection('orders')
                    .orderBy('timestamp', 'desc')
                    .limit(200)
                    .get();
                
                const rows = [['Tanggal', 'Total', 'Items', 'Note']];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    rows.push([
                        data.timestamp?.toDate?.()?.toLocaleString('id-ID') || '-',
                        'Rp' + (data.total || 0).toLocaleString('id-ID'),
                        data.items || '-',
                        data.customerNote || ''
                    ]);
                });

                const csv = rows.map(row => row.join(',')).join('\n');
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
    // TOAST SYSTEM
    // ============================================
    function showToast(message, duration = 3000) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => { toast.remove(); }, 400);
        }, duration);
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            if (searchInput.value) {
                searchInput.value = '';
                filterMenu();
                searchInput.blur();
            }
            if (historyModal && historyModal.classList.contains('show')) {
                historyModal.classList.remove('show');
            }
        }
        if (e.altKey && e.key >= '1' && e.key <= '4') {
            const filters = ['all', 'kopi-klasik', 'non-kopi', 'camilan', 'mie'];
            const idx = parseInt(e.key);
            const filter = filters[idx] || 'all';
            const btn = document.querySelector(`.cat-filter-btn[data-filter="${filter}"]`);
            if (btn) btn.click();
        }
    });

    // ============================================
    // NETWORK STATUS
    // ============================================
    window.addEventListener('online', function() {
        showToast('🔄 Koneksi kembali online!');
        loadMenu();
        if (isAdmin) {
            loadDashboardStats();
            loadMenuForAdmin();
        }
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

    // Auto-refresh
    setInterval(() => {
        if (navigator.onLine) {
            loadMenu();
            if (isAdmin) {
                loadDashboardStats();
                loadMenuForAdmin();
            }
        }
    }, 300000);

    console.log('🌿 Flora Coffee Menu v2.0 loaded successfully!');
    console.log('📊 Analytics tracking enabled');
    console.log('🔐 Admin panel protected with Firestore stats');
    console.log('🌍 Multi-language support:', currentLang);
    console.log('📦 PWA ready');

})();
