// ============================================
// UI HELPERS
// ============================================
import { showToast, trackEvent, getMenuOfTheDay } from '../utils/helpers.js';
import { getCurrentLang, getTranslation } from './translations.js';

export function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
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
}

export function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', function() {
        scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

export function initShare() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const shareData = {
                title: 'Kedai Flora — Menu',
                text: 'Cek menu Kedai Flora di sini!',
                url: window.location.href
            };
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
}

export function showMenuOfTheDay() {
    const el = document.getElementById('recommendationName');
    if (el) el.textContent = getMenuOfTheDay();
}

export function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        const searchInput = document.getElementById('searchInput');
        const historyModal = document.getElementById('historyModal');
        const waConfirmModal = document.getElementById('waConfirmModal');
        const cartDropdown = document.getElementById('cartDropdown');

        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            if (searchInput.value) {
                searchInput.value = '';
                if (typeof filterMenu === 'function') filterMenu();
                searchInput.blur();
            }
            if (historyModal && historyModal.classList.contains('show')) {
                historyModal.classList.remove('show');
            }
            if (waConfirmModal && waConfirmModal.classList.contains('show')) {
                waConfirmModal.classList.remove('show');
            }
            if (cartDropdown && cartDropdown.classList.contains('show')) {
                cartDropdown.classList.remove('show');
            }
        }
        // Alt+1-5 for category filters
        if (e.altKey && e.key >= '1' && e.key <= '5') {
            const filters = ['all', 'signature', 'kopi-klasik', 'non-kopi', 'camilan', 'mie'];
            const idx = parseInt(e.key);
            const filter = filters[idx] || 'all';
            const btn = document.querySelector(`.cat-filter-btn[data-filter="${filter}"]`);
            if (btn) btn.click();
        }
    });
}

export function initNetworkStatus() {
    window.addEventListener('online', function() {
        showToast('🔄 Koneksi kembali online!');
        if (typeof loadMenu === 'function') loadMenu();
    });
    window.addEventListener('offline', function() {
        showToast('⚠️ Koneksi terputus. Menggunakan data offline.');
    });
}

export function initHistoryModal() {
    const historyBtn = document.getElementById('historyBtn');
    const historyModal = document.getElementById('historyModal');
    const historyModalClose = document.getElementById('historyModalClose');
    let historyRefreshInterval = null;

    if (historyBtn) {
        historyBtn.addEventListener('click', function() {
            if (typeof showOrderHistory === 'function') showOrderHistory();
            historyModal.classList.add('show');
            trackEvent('Engagement', 'view_history');

            if (historyRefreshInterval) clearInterval(historyRefreshInterval);
            historyRefreshInterval = setInterval(() => {
                if (historyModal.classList.contains('show')) {
                    if (typeof showOrderHistory === 'function') showOrderHistory();
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
}