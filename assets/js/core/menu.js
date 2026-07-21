// ============================================
// MENU RENDERING & FILTERING
// ============================================
import { categories, categoryNames, categoryDescs, categoryIcons, defaultMenuData } from '../config/constants.js';
import { getCartData, saveCart, updateCartUI, setMenuCache } from './cart.js';
import { trackEvent, trackMenuView, trackAddToCart, trackRemoveFromCart, showToast, highlightText } from '../utils/helpers.js';
import { getTranslation } from './translations.js';

let activeCategoryFilter = 'all';
let menuDataCache = [];
let revealObserver = null;

export function getMenuCache() {
    return menuDataCache;
}

export function setActiveFilter(filter) {
    activeCategoryFilter = filter;
}

export function getActiveFilter() {
    return activeCategoryFilter;
}

export function renderMenu(data) {
    const skeletonContainer = document.getElementById('skeletonContainer');
    const menuContainer = document.getElementById('menuContainer');
    if (skeletonContainer) skeletonContainer.style.display = 'none';
    if (menuContainer) menuContainer.style.display = 'block';
    menuContainer.innerHTML = '';
    menuDataCache = data;
    setMenuCache(data);

    const cartData = getCartData();
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
            const itemDiv = createMenuItem(item, cartData);
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

    updateCartUI();
    filterMenu();
    setupScrollReveal();
}

function createMenuItem(item, cartData) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.setAttribute('data-name', (item.name || '').toLowerCase());
    itemDiv.setAttribute('data-desc', (item.desc || '').toLowerCase());
    itemDiv.setAttribute('data-category', item.category || '');
    const activePrice = item.promoPrice ? item.promoPrice : item.price;
    itemDiv.setAttribute('data-price', activePrice);
    itemDiv.setAttribute('data-id', item.id);

    trackMenuView(item.name);

    // Thumbnail
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

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';
    if (item.stock === 0) { checkbox.disabled = true; checkbox.style.opacity = '0.4'; }
    itemDiv.appendChild(checkbox);

    // Info
    const info = document.createElement('div');
    info.className = 'item-info';
    const nameSpan = document.createElement('div');
    nameSpan.className = 'item-name';
    nameSpan.textContent = item.name || 'Unknown';

    // Badges
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

    // Price
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

    // Qty controls
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
            const cart = getCartData();
            delete cart[item.id];
            saveCart();
            qtySpan.textContent = '0';
            qtySpan.classList.add('zero');
            trackRemoveFromCart(item.name);
        } else if (qty === 0) {
            const cart = getCartData();
            cart[item.id] = 1;
            saveCart();
            qtySpan.textContent = '1';
            qtySpan.classList.remove('zero');
            trackAddToCart(item.name, activePrice, 1);
            showToast(`✅ ${item.name} ×1 ditambahkan`);
        } else {
            trackAddToCart(item.name, activePrice, qty);
            showToast(`✅ ${item.name} ×${qty} ditambahkan`);
        }
        updateCartUI();
    });

    function updateQty(change) {
        if (item.stock === 0) return;
        let val = parseInt(qtySpan.textContent) || 0;
        val = Math.max(0, Math.min(item.stock, val + change));
        qtySpan.textContent = val;
        qtySpan.classList.toggle('zero', val === 0);
        const cart = getCartData();
        if (val > 0) {
            checkbox.checked = true;
            cart[item.id] = val;
            trackAddToCart(item.name, activePrice, val);
            showToast(`✅ ${item.name} ×${val} ditambahkan`);
        } else {
            checkbox.checked = false;
            delete cart[item.id];
            trackRemoveFromCart(item.name);
        }
        saveCart();
        updateCartUI();
    }

    minusBtn.addEventListener('click', function(e) { e.stopPropagation(); updateQty(-1); });
    plusBtn.addEventListener('click', function(e) { e.stopPropagation(); updateQty(1); });
    qtySpan.addEventListener('click', function() { updateQty(-parseInt(qtySpan.textContent) || 0); });

    return itemDiv;
}

export function filterMenu() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
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
    document.getElementById('clearSearch').classList.toggle('show', keyword.length > 0);

    // Highlight text
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