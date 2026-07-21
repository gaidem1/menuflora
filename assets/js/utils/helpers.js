// ============================================
// HELPERS
// ============================================
export function cleanNameFromEmoji(name) {
    if (!name) return '';
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FEFF}\u{1F1E0}-\u{1F1FF}]/gu;
    return name.replace(emojiRegex, '').trim();
}

export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function getOrCreateDeviceId() {
    let id = localStorage.getItem('flora-device-id');
    if (!id) {
        id = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem('flora-device-id', id);
    }
    return id;
}

export function highlightText(text, keyword) {
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

export function showToast(message, duration = 2500) {
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

export function trackEvent(category, action, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label || '',
            'value': value || 0
        });
    }
}

export function getMenuOfTheDay() {
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