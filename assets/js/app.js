(function() {
    'use strict';

    // ============================================
    // 🔥 FASE 2 — MULTI-LANGUAGE
    // ============================================

    // ============================================
    // TRANSLATIONS
    // ============================================
    const translations = {
        'id': {
            // Hero
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
            // Nav
            all: 'Semua',
            coffee: 'Kopi',
            nonCoffee: 'Non Kopi',
            snacks: 'Camilan',
            noodles: 'Mie & Topping',
            // Search & Result
            search: 'Cari menu...',
            noResult: 'Menu tidak ditemukan. Coba kata kunci lain!',
            // Cart
            total: 'Total',
            emptyCart: 'Belum ada pesanan',
            orderNow: 'Pesan Sekarang',
            // Footer
            footerTitle: 'Mau pesan?',
            footerDesc: 'Kirim pesan lewat WhatsApp, sebutkan menu dan jumlahnya — kami siapkan begitu Anda tiba.',
            waFooter: 'Pesan via WhatsApp',
            mapsFooter: 'Lihat di Maps',
            printFooter: 'Cetak Menu',
            // Menu of the Day
            menuOfTheDay: '🌟 Hari ini rekomendasi: '
        },
        'en': {
            // Hero
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
            // Nav
            all: 'All',
            coffee: 'Coffee',
            nonCoffee: 'Non Coffee',
            snacks: 'Snacks',
            noodles: 'Noodles & Topping',
            // Search & Result
            search: 'Search menu...',
            noResult: 'Menu not found. Try another keyword!',
            // Cart
            total: 'Total',
            emptyCart: 'No order yet',
            orderNow: 'Order Now',
            // Footer
            footerTitle: 'Want to order?',
            footerDesc: 'Send a message via WhatsApp, mention the menu and quantity — we\'ll prepare it for you.',
            waFooter: 'Order via WhatsApp',
            mapsFooter: 'View on Maps',
            printFooter: 'Print Menu',
            // Menu of the Day
            menuOfTheDay: '🌟 Today\'s recommendation: '
        }
    };

    let currentLang = 'id';

    // ============================================
    // LANGUAGE FUNCTIONS
    // ============================================
    function setLang(lang) {
        currentLang = lang;
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        // Update text
        updateTranslations();
        // Track language change
        if (typeof trackEvent === 'function') {
            trackEvent('Language', 'switch', lang);
        }
        // Save preference
        localStorage.setItem('flora-lang', lang);
        console.log('✅ Language set to:', lang);
    }

    function updateTranslations() {
        const t = translations[currentLang];
        if (!t) {
            console.error('❌ Translation not found for:', currentLang);
            return;
        }

        // Helper function
        function updateEl(id, value) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = value;
            } else {
                console.warn('⚠️ Element not found:', id);
            }
        }

        // Hero
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

        // Nav
        updateEl('langAll', t.all);
        updateEl('langCoffee', t.coffee);
        updateEl('langNonCoffee', t.nonCoffee);
        updateEl('langSnacks', t.snacks);
        updateEl('langNoodles', t.noodles);

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t.search;
        updateEl('langNoResult', t.noResult);

        // Cart
        updateEl('langTotal', t.total);
        updateEl('langEmptyCart', t.emptyCart);
        updateEl('langOrderNow', t.orderNow);

        // Footer
        updateEl('langFooterTitle', t.footerTitle);
        updateEl('langFooterDesc', t.footerDesc);
        updateEl('langWaFooter', t.waFooter);
        updateEl('langMapsFooter', t.mapsFooter);
        updateEl('langPrintFooter', t.printFooter);

        // Menu of the Day
        updateEl('langMenuOfTheDay', t.menuOfTheDay);

        // Update open status
        updateOpenStatus();

        console.log('✅ Translations updated to:', currentLang);
    }

    // ============================================
    // 🔥 FASE 2 — MENU OF THE DAY
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
        const name = getMenuOfTheDay();
        const el = document.getElementById('recommendationName');
        if (el) {
            el.textContent = name;
        }
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
    const ADMIN_EMAILS = ["danielalthof1@gmail.com"];

    // ============================================
    // CLOUDINARY KONFIGURASI
    // ============================================
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/vmny1hra/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'emvx2to2';

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
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const progressBar = document.getElementById('progressBar');
    const inputName = document.getElementById('inputName');
    const inputPrice = document.getElementById('inputPrice');
    const inputDesc = document.getElementById('inputDesc');
    const inputCategory = document.getElementById('inputCategory');
    const inputTag = document.getElementById('inputTag');
    const inputStock = document.getElementById('inputStock');
    const inputPromo = document.getElementById('inputPromo');
    const inputImage = document.getElementById('inputImage');

    let cartData = JSON.parse(localStorage.getItem('flora-cart')) || {};
    let editingId = null;
    let isAdmin = false;
    let searchTimeout = null;

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
    // STATUS BUKA/TUTUP (Multi-language ready)
    // ============================================
    function updateOpenStatus() {
        const el = document.getElementById('openStatus');
        if (!el) return;
        const hour = parseInt(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit',
            hour12: false }));
        const isOpen = (hour >= 11 && hour < 23);
        const t = translations[currentLang];
        el.textContent = isOpen ? t.open : t.closed;
    }
    updateOpenStatus();
    setInterval(updateOpenStatus, 60000);

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
    // 🔥 GOOGLE ANALYTICS TRACKING
    // ============================================
    function trackEvent(category, action, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label || '',
                'value': value || 0
            });
            console.log(`📊 Track: ${category} - ${action} ${label ? '- ' + label : ''}`);
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
        if (keyword.length > 0) {
            trackEvent('Search', 'search', keyword);
        }
    }

    function trackCategoryFilter(category) {
        trackEvent('Navigation', 'filter_category', category);
    }

    function trackPrint() {
        trackEvent('Engagement', 'print_menu');
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

        // Track search
        if (keyword.length > 2) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                trackSearch(keyword);
            }, 1000);
        }
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
        } else {
            cartSummary.classList.remove('show');
        }

        updateCartBadge();
    }

    // ============================================
    // 🔥 CART BADGE
    // ============================================
    function updateCartBadge() {
        if (!cartBadge) return;

        let totalItems = 0;
        document.querySelectorAll('.item').forEach(item => {
            const checkbox = item.querySelector('.item-checkbox');
            const qtySpan = item.querySelector('.qty-value');
            if (checkbox && checkbox.checked) {
                const qty = parseInt(qtySpan?.textContent) || 0;
                totalItems += qty;
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
    // WHATSAPP TEMPLATE
    // ============================================
    function getWATemplate(type, data) {
        const templates = {
            'order': 'Halo Flora Coffee,\n\nSaya mau pesan:\n{items}\n\nTotal: {total}\n\nAlamat: {address}',
            'reservation': 'Halo Flora Coffee,\n\nSaya mau reservasi untuk {people} orang pada {date} pukul {time}.',
            'feedback': 'Halo Flora Coffee,\n\nSaya mau memberi feedback:\n{message}'
        };

        let template = templates[type] || templates.order;
        Object.keys(data).forEach(key => {
            template = template.replace(new RegExp(`{${key}}`, 'g'), data[key]);
        });

        return template;
    }

    // ============================================
    // LOAD MENU
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
            category: 'kopi-klasik', tag: '', image: '' },
        { id: '2', name: "Flora's Coffee", desc: 'Kopi khas Flora dengan rasa yang khas.', price: 8000,
            category: 'kopi-klasik', tag: '', image: '' },
        { id: '3', name: 'Nescafe', desc: 'Kopi sachet klasik yang nikmat.', price: 4000, category: 'kopi-klasik',
            tag: '', image: '' },
        { id: '4', name: 'Ice Tea', desc: 'Teh dingin segar.', price: 3000, category: 'non-kopi', tag: '',
            image: '' },
        { id: '5', name: 'Ice Lemon Tea', desc: 'Teh dingin dengan perasan lemon segar.', price: 5000,
            category: 'non-kopi', tag: '', image: '' },
        { id: '6', name: "Flora's Matcha", desc: 'Matcha khas Flora dengan susu segar.', price: 8000,
            category: 'non-kopi', tag: '', image: '' },
        { id: '7', name: 'All Varian Sachet', desc: 'Berbagai varian minuman sachet.', price: 5000,
            category: 'non-kopi', tag: '', image: '' },
        { id: '8', name: 'Mango Yakult', desc: 'Yakult dengan rasa mangga segar.', price: 8000, category: 'non-kopi',
            tag: '', image: '' },
        { id: '9', name: 'Strawberry Yakult', desc: 'Yakult dengan rasa stroberi segar.', price: 8000,
            category: 'non-kopi', tag: '', image: '' },
        { id: '10', name: 'All Varian Suki', desc: 'Berbagai varian suki yang gurih.', price: 2500,
            category: 'camilan', tag: '', image: '' },
        { id: '11', name: 'Sosis Bakar', desc: 'Sosis panggang yang gurih.', price: 4000, category: 'camilan',
            tag: '', image: '' },
        { id: '12', name: 'Kentang Goreng', desc: 'Kentang goreng renyah.', price: 5000, category: 'camilan',
            tag: '', image: '' },
        { id: '13', name: 'Mix Plater', desc: 'Kentang goreng dan sosis bakar.', price: 8000, category: 'camilan',
            tag: '', image: '' },
        { id: '14', name: 'Roti Bakar', desc: 'Roti panggang dengan selai.', price: 5000, category: 'camilan',
            tag: '', image: '' },
        { id: '15', name: 'Indomie Kuah', desc: 'Indomie dengan kuah hangat.', price: 6000, category: 'mie',
            tag: '', image: '' },
        { id: '16', name: 'Indomie Goreng', desc: 'Indomie goreng dengan bumbu spesial.', price: 6000,
            category: 'mie', tag: '', image: '' },
        { id: '17', name: 'Telur (Topping)', desc: 'Tambahan telur untuk mie.', price: 3000, category: 'mie',
            tag: '', image: '' },
        { id: '18', name: 'Sosis (Topping)', desc: 'Tambahan sosis untuk mie.', price: 3000, category: 'mie',
            tag: '', image: '' }
    ];

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

                // Track menu view
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
                    val = Math.max(0, val + change);
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

    let menuUnsubscribe = null;

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
                return;
            }
            const data = [];
            snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
            renderMenu(data);
            if (isAdmin) renderAdminMenu(data);
        }, () => {
            skeletonContainer.style.display = 'none';
            menuContainer.style.display = 'block';
            renderMenu(defaultMenuData);
        });
    }

    // ============================================
    // ADMIN PANEL
    // ============================================
    function renderAdminMenu(data) {
        loadingMenu.classList.add('hidden');
        adminMenuGrid.innerHTML = '';
        if (!data || data.length === 0) {
            adminMenuGrid.innerHTML = '<p style="text-align:center;color:#95a5a6;padding:20px;">Belum ada menu.</p>';
            return;
        }
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            let tags = '';
            if (item.tag) tags += `<span class="tag tag-${item.tag === 'Favorit' ? 'favorit' : 'promo'}">${item.tag}</span>`;
            if (item.stock === 0) tags += `<span class="tag tag-habis">⛔ Habis</span>`;
            if (item.promoPrice) tags += `<span class="tag tag-promo">🔥 Promo</span>`;
            const priceDisplay = item.promoPrice ?
                `<span style="text-decoration:line-through;color:#95a5a6;">Rp${item.price.toLocaleString('id-ID')}</span> Rp${item.promoPrice.toLocaleString('id-ID')}` :
                `Rp${item.price.toLocaleString('id-ID')}`;
            div.innerHTML = `
                <div class="name">${item.name} ${tags}</div>
                <div style="font-size:14px;">${priceDisplay}</div>
                <div style="font-size:12px;color:#7f8c8d;">📂 ${item.category} | 📦 Stok: ${item.stock ?? '∞'}</div>
                ${item.image ? `<img src="${item.image}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-top:4px;" />` : ''}
                <div class="actions">
                    <button class="btn btn-sm" style="background:${item.stock === 0 ? '#27ae60' : '#7f8c8d'};color:#fff;" onclick="toggleStockAdmin('${item.id}', ${item.stock ?? 10})">${item.stock === 0 ? '✅ Tersedia' : '⛔ Habis'}</button>
                    <button class="btn btn-warning btn-sm" onclick="editMenuAdmin('${item.id}')">✏️</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMenuAdmin('${item.id}')">🗑️</button>
                </div>
            `;
            adminMenuGrid.appendChild(div);
        });
    }

    window.editMenuAdmin = function(id) {
        db.collection('menu').doc(id).get().then(doc => {
            if (!doc.exists) return;
            const data = doc.data();
            editingId = id;
            formTitle.textContent = '✏️ Edit Menu';
            inputName.value = data.name || '';
            inputPrice.value = data.price || '';
            inputDesc.value = data.desc || '';
            inputCategory.value = data.category || 'kopi-klasik';
            inputTag.value = data.tag || '';
            inputStock.value = data.stock ?? 10;
            inputPromo.value = data.promoPrice || '';
            inputImage.value = data.image || '';
            saveBtn.textContent = '💾 Update Menu';
            document.getElementById('formCard').scrollIntoView({ behavior: 'smooth' });
        });
    };

    window.deleteMenuAdmin = function(id) {
        if (confirm('⚠️ Yakin hapus menu ini?')) {
            db.collection('menu').doc(id).delete().then(() => {
                showToast('✅ Menu dihapus!');
            }).catch(err => alert('❌ Gagal hapus: ' + err.message));
        }
    };

    window.toggleStockAdmin = function(id, currentStock) {
        const newStock = currentStock === 0 ? 10 : 0;
        db.collection('menu').doc(id).update({ stock: newStock }).then(() => {
            showToast(newStock === 0 ? '⛔ Menu ditandai habis' : '✅ Menu tersedia lagi');
        }).catch(err => alert('❌ Gagal update stok: ' + err.message));
    };

    window.backupMenuData = function() {
        db.collection('menu').get().then(snapshot => {
            const data = [];
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'flora-menu-backup-' + new Date().toISOString().slice(0, 10) + '.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            showToast('✅ Backup berhasil diunduh!');
        }).catch(err => alert('❌ Gagal backup: ' + err.message));
    };

    function resetForm() {
        editingId = null;
        formTitle.textContent = '📝 Tambah Menu Baru';
        inputName.value = '';
        inputPrice.value = '';
        inputDesc.value = '';
        inputCategory.value = 'kopi-klasik';
        inputTag.value = '';
        inputStock.value = '10';
        inputPromo.value = '';
        inputImage.value = '';
        fileInput.value = '';
        previewImage.classList.add('hidden');
        progressBar.style.width = '0%';
        saveBtn.textContent = '💾 Simpan Menu';
    }

    cancelBtn.addEventListener('click', resetForm);
    newMenuBtn.addEventListener('click', resetForm);
    backupBtn.addEventListener('click', backupMenuData);

    // Track print
    document.querySelectorAll('[onclick="window.print()"]').forEach(btn => {
        btn.addEventListener('click', function() {
            trackPrint();
        });
    });

    // Track order
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            const totalText = document.getElementById('cartTotal')?.textContent || 'Rp0';
            const total = parseInt(totalText.replace(/[^0-9]/g, '')) || 0;
            const itemCount = Object.keys(cartData).length;
            if (itemCount > 0) {
                trackOrder(total, itemCount);
            }
        });
    }

    // ============================================
    // CLOUDINARY UPLOAD
    // ============================================
    if (fileInput) {
        fileInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(ev) {
                previewImage.src = ev.target.result;
                previewImage.classList.remove('hidden');
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try {
                progressBar.style.width = '30%';
                const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
                const data = await response.json();
                if (response.ok) {
                    inputImage.value = data.secure_url;
                    progressBar.style.width = '100%';
                    previewImage.src = data.secure_url;
                    showToast('✅ Gambar berhasil diupload ke Cloudinary!');
                    setTimeout(() => { progressBar.style.width = '0%'; }, 2000);
                } else {
                    throw new Error(data.error?.message || 'Upload gagal');
                }
            } catch (error) {
                console.error('Error upload:', error);
                alert('❌ Gagal upload gambar: ' + error.message);
                progressBar.style.width = '0%';
            }
        });
    }

    // ============================================
    // SAVE MENU
    // ============================================
    saveBtn.addEventListener('click', function() {
        const name = inputName.value.trim();
        const price = parseInt(inputPrice.value);
        const desc = inputDesc.value.trim();
        const category = inputCategory.value;
        const tag = inputTag.value;
        const stock = parseInt(inputStock.value) || 0;
        const promoPrice = inputPromo.value ? parseInt(inputPromo.value) : null;
        const image = inputImage.value.trim();

        if (!name || !price) { alert('⚠️ Nama dan Harga harus diisi!'); return; }
        if (promoPrice && promoPrice >= price) { alert('⚠️ Harga promo harus lebih rendah dari harga asli!'); return; }

        const data = { name, price, desc, category, tag, stock, promoPrice, image };
        const ref = editingId ? db.collection('menu').doc(editingId) : db.collection('menu').doc();
        ref.set(data, { merge: true }).then(() => {
            showToast(editingId ? '✅ Menu diupdate!' : '✅ Menu ditambahkan!');
            resetForm();
        }).catch(err => alert('❌ Gagal simpan: ' + err.message));
    });

    // ============================================
    // SECRET ADMIN TRIGGER
    // ============================================
    secretTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isAdmin) {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch(err => {
                alert('❌ Login gagal: ' + err.message);
            });
        } else {
            adminSection.scrollIntoView({ behavior: 'smooth' });
            adminSection.style.transition = 'box-shadow 0.3s ease';
            adminSection.style.boxShadow = '0 0 0 4px var(--brass)';
            setTimeout(() => { adminSection.style.boxShadow = ''; }, 1500);
        }
    });

    // ============================================
    // AUTHENTICATION
    // ============================================
    auth.onAuthStateChanged(async (user) => {
        const printBtn = document.getElementById('printBtn');

        if (!user) {
            isAdmin = false;
            adminSection.classList.add('admin-hidden');
            adminUserEmail.textContent = '';
            adminMenuGrid.innerHTML = '';
            if (printBtn) printBtn.style.display = 'inline-flex';
            return;
        }

        if (!ADMIN_EMAILS.includes(user.email)) {
            alert('❌ Anda bukan administrator. Akses ditolak!');
            await auth.signOut();
            isAdmin = false;
            adminSection.classList.add('admin-hidden');
            adminUserEmail.textContent = '';
            adminMenuGrid.innerHTML = '';
            if (printBtn) printBtn.style.display = 'inline-flex';
            return;
        }

        isAdmin = true;
        adminSection.classList.remove('admin-hidden');
        adminUserEmail.textContent = user.email;
        if (printBtn) printBtn.style.display = 'inline-flex';

        db.collection('menu').orderBy('name').onSnapshot(snapshot => {
            const data = [];
            snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
            renderAdminMenu(data);
            loadingMenu.classList.add('hidden');
        });

        showToast('👋 Selamat datang, Admin!');
    });

    logoutBtn.addEventListener('click', () => {
        auth.signOut();
        showToast('👋 Logout berhasil!');
    });

    // ============================================
    // TOAST
    // ============================================
    function showToast(msg) {
        const existing = document.querySelector('.toast');
        if (existing) {
            existing.classList.add('out');
            setTimeout(() => existing.remove(), 300);
        }
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('out');
            setTimeout(() => toast.remove(), 300);
        }, 2800);
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.blur();
            if (searchInput.value) {
                searchInput.value = '';
                filterMenu();
            }
        }
        if (e.key === 'Escape') resetForm();
    });

    // ============================================
    // 🔥 FIX: Language Switch — EVENT LISTENER (PASTIKAN INI ADA)
    // ============================================
    // Tunggu DOM siap sebelum akses elemen
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ DOM Ready — Initializing language...');

        // Cek bahasa yang tersimpan
        const savedLang = localStorage.getItem('flora-lang');
        if (savedLang && translations[savedLang]) {
            currentLang = savedLang;
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === savedLang);
            });
            console.log('📌 Load saved language:', savedLang);
        }

        // Set bahasa awal
        setLang(currentLang);
        console.log('🌐 Current language set to:', currentLang);

        // Event listener untuk tombol language
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                if (lang && translations[lang]) {
                    console.log('🔄 Switching to:', lang);
                    setLang(lang);
                    showToast(`🌐 Language changed to ${lang === 'id' ? 'Indonesia' : 'English'}`);
                }
            });
        });
    });

    // ============================================
    // INIT: Menu of the Day
    // ============================================
    showMenuOfTheDay();

    // ============================================
    // START: Load Menu dari Firebase
    // ============================================
    loadMenu();

})();
