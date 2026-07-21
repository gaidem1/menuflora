// ============================================
// CONSTANTS
// ============================================
export const ADMIN_EMAILS = ["danielalthof1@gmail.com", "kedaiflora1@gmail.com"];

export const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/vmny1hra/image/upload';
export const CLOUDINARY_UPLOAD_PRESET = 'emvx2to2';
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const WA_NUMBER = '628562622436';

export const categories = ['signature', 'kopi-klasik', 'non-kopi', 'camilan', 'mie'];
export const categoryNames = {
    'signature': '⭐ Signature',
    'kopi-klasik': '☕ Kopi',
    'non-kopi': '🍵 Non Kopi',
    'camilan': '🍽️ Camilan',
    'mie': '🍜 Mie & Topping'
};
export const categoryDescs = {
    'signature': '🌟 Menu andalan Kedai Flora yang wajib dicoba!',
    'kopi-klasik': 'Berbagai pilihan kopi untuk menemani harimu.',
    'non-kopi': 'Minuman segar tanpa kopi, dari yakult hingga matcha.',
    'camilan': 'Camilan gurih untuk mengisi perut.',
    'mie': 'Mie instan dengan berbagai topping pilihan.'
};
export const categoryIcons = {
    'signature': '⭐',
    'kopi-klasik': '☕',
    'non-kopi': '🍵',
    'camilan': '🍽️',
    'mie': '🍜'
};

export const defaultMenuData = [
    { id: '1', name: 'Ice Rost Latte', desc: 'Kopi dingin dengan rasa yang segar.', price: 7000,
        category: 'kopi-klasik', tag: '', image: '', stock: 10 },
    { id: '2', name: "Flora's Coffee", desc: 'Kopi khas Flora dengan rasa yang khas.', price: 8000,
        category: 'kopi-klasik', tag: 'Favorit', image: '', stock: 10 },
    // ... semua default menu (20 item)
];