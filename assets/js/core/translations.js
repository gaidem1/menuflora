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

export function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    updateTranslations();
    localStorage.setItem('flora-lang', lang);
    console.log('✅ Language set to:', lang);
}

export function getCurrentLang() {
    return currentLang;
}

export function getTranslation(key) {
    return translations[currentLang]?.[key] || translations['id']?.[key] || key;
}

export function updateTranslations() {
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

    // Trigger open status update
    if (typeof updateOpenStatus === 'function') updateOpenStatus();
}