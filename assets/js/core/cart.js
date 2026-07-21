// ============================================
// CART MANAGEMENT
// ============================================
import { WA_NUMBER } from '../config/constants.js';
import { showToast, trackEvent, escapeHtml } from '../utils/helpers.js';
import { getTranslation } from './translations.js';

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

let menuDataCache = [];

export function setMenuCache(data) {
    menuDataCache = data;
}

export function getCartData() {
    return cartData;
}

export function saveCart() {
    localStorage.setItem('flora-cart', JSON.stringify(cartData));
}

export function addToCart(id, qty = 1) {
    cartData[id] = (cartData[id] || 0) + qty;
    saveCart();
    updateCartUI();
}

export function removeFromCart(id) {
    delete cartData[id];
    saveCart();
    updateCartUI();
}

export function clearCart() {
    cartData = {};
    saveCart();
    updateCartUI();
}

export function getCartTotal() {
    let total = 0;
    for (const [id, qty] of Object.entries(cartData)) {
        const menuItem = menuDataCache.find(m => m.id === id);
        if (!menuItem || qty <= 0) continue;
        const price = menuItem.promoPrice || menuItem.price;
        total += price * qty;
    }
    return total;
}

export function getCartItems() {
    const items = [];
    for (const [id, qty] of Object.entries(cartData)) {
        const menu = menuDataCache.find(m => m.id === id);
        if (!menu || qty <= 0) continue;
        const price = menu.promoPrice || menu.price;
        items.push({
            id,
            name: menu.name,
            qty,
            price,
            subtotal: price * qty
        });
    }
    return items;
}

export function updateCartUI() {
    const cartSummary = document.getElementById('cartSummary');
    const cartTotal = document.getElementById('cartTotal');
    const cartDetail = document.getElementById('cartDetail');
    const orderBtn = document.getElementById('orderBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartMini = document.getElementById('cartMini');
    const cartMiniBadge = document.getElementById('cartMiniBadge');

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

    // Update item checkboxes
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
        orderBtn.href = `https://wa.me/${WA_NUMBER}?text=` + message;
    } else {
        cartSummary.classList.remove('show');
    }

    // Update badges
    const totalItems = Object.values(cartData).reduce((sum, qty) => sum + qty, 0);
    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
            cartBadge.textContent = totalItems;
        } else {
            cartBadge.style.display = 'none';
        }
    }
    if (cartMini && cartMiniBadge) {
        if (totalItems > 0) {
            cartMini.style.display = 'flex';
            cartMiniBadge.textContent = totalItems;
        } else {
            cartMini.style.display = 'none';
        }
    }

    renderCartDropdown();
}

export function renderCartDropdown() {
    const container = document.getElementById('cartDropdownContent');
    if (!container) return;

    const items = getCartItems();
    let total = getCartTotal();

    if (items.length === 0) {
        container.innerHTML = `<div class="cart-empty">🛒 ${getTranslation('emptyCart')}</div>`;
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
            <span>${getTranslation('total')}</span>
            <span>Rp${total.toLocaleString('id-ID')}</span>
        </div>
        <button class="cart-checkout-btn" id="dropdownCheckoutBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 510 512.459" fill="white">
                <path d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.891 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z"/>
            </svg>
            ${getTranslation('orderNow')}
        </button>
    `;
    container.innerHTML = html;

    const checkoutBtn = document.getElementById('dropdownCheckoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            document.getElementById('cartDropdown').classList.remove('show');
            document.getElementById('orderBtn').click();
        });
    }
}