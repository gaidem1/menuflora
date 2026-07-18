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
        if (!t) {
            console.error('❌ Translation not found for:', currentLang);
            return;
        }

        function updateEl(id, value) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = value;
            }
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
    const ADMIN_EMAILS = ["danielalthof1@gmail.com", "kedaiflora1@gmail.com"];

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

    // Upload elements
    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');
    const previewWrapper = document.getElementById('previewWrapper');
    const previewImage = document.getElementById('previewImage');
    const inputImage = document.getElementById('inputImage');
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

    let cartData = JSON.parse(localStorage.getItem('flora-cart')) || {};
    let editingId = null;
    let isAdmin = false;
    let searchTimeout = null;
    let currentFile = null;
    let isUploading = false;

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
    // STATUS BUKA/TUTUP
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

        if (keyword.length > 2) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                trackSearch(keyword);
            }, 1000);
        }

        // Highlight
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

            // Save history
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
    // ORDER HISTORY
    // ============================================
    function saveOrderHistory(order) {
        const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
        history.push({
            id: Date.now(),
            items: order.items,
            total: order.total,
            date: new Date().toLocaleString('id-ID')
        });
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
            const t = translations[currentLang];
            container.innerHTML = `<div class="history-empty">${t.historyEmpty || '📭 Belum ada riwayat pesanan.'}</div>`;
            return;
        }

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

    if (historyModal) {
        historyModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    }

    // ============================================
    // ADMIN DASHBOARD
    // ============================================
    async function loadDashboardStats() {
        try {
            const menuSnapshot = await db.collection('menu').get();
            const statMenus = document.getElementById('statMenus');
            if (statMenus) statMenus.textContent = menuSnapshot.size;

            const history = JSON.parse(localStorage.getItem('flora-order-history')) || [];
            const today = new Date().toDateString();
            const todayOrders = history.filter(item => {
                try {
                    const dateObj = new Date(item.date);
                    return dateObj.toDateString() === today;
                } catch {
                    return false;
                }
            });

            const statOrders = document.getElementById('statOrders');
            if (statOrders) statOrders.textContent = todayOrders.length;

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

    // ============================================
    // CLOUDINARY UPLOAD SEAMLESS
    // ============================================
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
        formData.append('transformation', JSON.stringify([
            { width: 800, height: 600, crop: 'fill' },
            { quality: 'auto', fetch_format: 'auto' }
        ]));

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
                        reject(new Error(xhr.statusText || 'Upload gagal'));
                    }
                };
                xhr.onerror = () => reject(new Error('Network error'));
                xhr.send(formData);
            });

            isUploading = false;
            progressFill.style.width = '100%';
            progressText.textContent = '✅ Upload berhasil!';

            previewImage.src = response.secure_url;
            previewWrapper.classList.remove('hidden');
            inputImage.value = response.secure_url;
            currentFile = file;

            setTimeout(() => {
                uploadProgress.classList.add('hidden');
            }, 1500);

            showToast('✅ Gambar berhasil diupload!');
            trackEvent('Admin', 'upload_image', file.name);

            return response.secure_url;

        } catch (error) {
            console.error('Upload error:', error);
            isUploading = false;
            progressFill.style.width = '0%';
            progressText.textContent = '❌ Upload gagal!';
            uploadProgress.classList.remove('hidden');

            showToast('❌ Gagal upload gambar: ' + error.message);

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
                progressContainer.appendChild(retryBtn);
            }

            return null;
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
            if (!isUploading) {
                this.classList.add('dragover');
            }
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
                if (fileInput) {
                    fileInput.files = files;
                }
                uploadToCloudinary(files[0]);
            }
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', function() {
            currentFile = null;
            inputImage.value = '';
            previewWrapper.classList.add('hidden');
            previewImage.src = '';
            if (fileInput) fileInput.value = '';
            uploadProgress.classList.add('hidden');
            progressFill.style.width = '0%';
            showToast('🗑️ Gambar dihapus');
        });
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
                        ${item.tag ? `<span class="tag">${item.tag}</span>` : ''}
                        ${item.stock !== undefined ? `<span>Stok: ${item.stock}</span>` : ''}
                    </div>
                </div>
                <div class="admin-card-actions">
                    <button class="btn btn-sm" onclick="editMenuItem('${item.id}')">✏️ Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMenuItem('${item.id}')">🗑️</button>
                </div>
            `;
            adminMenuGrid.appendChild(card);
        });
    }

    // ============================================
    // CRUD OPERATIONS
    // ============================================
    window.editMenuItem = function(id) {
        if (!isAdmin) return;
        db.collection('menu').doc(id).get().then(doc => {
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
            inputStock.value = data.stock !== undefined ? data.stock : '';
            inputPromo.checked = !!data.promoPrice;
            if (data.image) {
                inputImage.value = data.image;
                previewImage.src = data.image;
                previewWrapper.classList.remove('hidden');
            } else {
                previewWrapper.classList.add('hidden');
                inputImage.value = '';
            }
            document.getElementById('formCard').scrollIntoView({ behavior: 'smooth' });
            trackEvent('Admin', 'edit_menu', data.name);
        }).catch(err => {
            console.error('Error loading menu:', err);
            showToast('❌ Gagal memuat data menu');
        });
    };

    window.deleteMenuItem = function(id) {
        if (!isAdmin) return;
        if (!confirm('🗑️ Yakin ingin menghapus menu ini?')) return;
        db.collection('menu').doc(id).delete().then(() => {
            showToast('✅ Menu berhasil dihapus');
            trackEvent('Admin', 'delete_menu');
        }).catch(err => {
            console.error('Error deleting:', err);
            showToast('❌ Gagal menghapus menu');
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
        inputStock.value = '';
        inputPromo.checked = false;
        inputImage.value = '';
        previewWrapper.classList.add('hidden');
        previewImage.src = '';
        currentFile = null;
        if (fileInput) fileInput.value = '';
        uploadProgress.classList.add('hidden');
        progressFill.style.width = '0%';
        progressText.textContent = '';
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
            const promo = inputPromo.checked;
            const image = inputImage.value.trim();

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

            const data = {
                name,
                price,
                desc: desc || '',
                category,
                tag: tag || '',
                stock,
                promoPrice: promo ? price : null,
                image: image || '',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                if (editingId) {
                    await db.collection('menu').doc(editingId).update(data);
                    showToast('✅ Menu berhasil diupdate!');
                    trackEvent('Admin', 'update_menu', name);
                } else {
                    const newId = Date.now().toString();
                    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
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
        if (user && ADMIN_EMAILS.includes(user.email)) {
            isAdmin = true;
            adminSection.classList.remove('admin-hidden');
            adminSection.style.display = 'block';
            adminUserEmail.textContent = user.email;
            loadDashboardStats();
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
            trackEvent('Auth', 'admin_login', user.email);
        } else {
            isAdmin = false;
            adminSection.classList.add('admin-hidden');
            adminSection.style.display = 'none';
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        }
    });

    // Secret trigger (tap 5x)
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
    // PRINT MENU
    // ============================================
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            trackPrint();
            const originalTitle = document.title;
            document.title = 'Flora Coffee — Menu';
            window.print();
            document.title = originalTitle;
        });
    }

    const printFooterBtn = document.getElementById('printFooterBtn');
    if (printFooterBtn) {
        printFooterBtn.addEventListener('click', function() {
            trackPrint();
            const originalTitle = document.title;
            document.title = 'Flora Coffee — Menu';
            window.print();
            document.title = originalTitle;
        });
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl+/ untuk search
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
        // Escape untuk clear search & close modal
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
        // Alt+1-4 untuk kategori
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
    });

    window.addEventListener('offline', function() {
        showToast('⚠️ Koneksi terputus. Menggunakan data offline.');
    });

    // ============================================
    // SERVICE WORKER REGISTRATION (Optional)
    // ============================================
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // ============================================
    // INIT
    // ============================================
    const savedLang = localStorage.getItem('flora-lang') || 'id';
    setLang(savedLang);
    loadMenu();
    showMenuOfTheDay();

    // Auto-refresh menu every 5 minutes
    setInterval(() => {
        if (navigator.onLine) {
            loadMenu();
        }
    }, 300000);

    console.log('🌿 Flora Coffee Menu v2.0 loaded successfully!');
    console.log('📊 Analytics tracking enabled');
    console.log('🔐 Admin panel protected');
    console.log('🌍 Multi-language support:', currentLang);
    console.log('📦 PWA ready');

})();
