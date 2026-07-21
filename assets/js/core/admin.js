// ============================================
// ADMIN PANEL
// ============================================
import { db, auth, anonAuthReady } from '../config/firebase.js';
import { ADMIN_EMAILS, CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET, MAX_FILE_SIZE, ALLOWED_TYPES } from '../config/constants.js';
import { getMenuCache, renderMenu } from './menu.js';
import { getCartData, clearCart, updateCartUI } from './cart.js';
import { getTranslation, getCurrentLang } from './translations.js';
import { cleanNameFromEmoji, escapeHtml, showToast, trackEvent, getOrCreateDeviceId } from '../utils/helpers.js';
import { loadPendingOrders, renderPendingOrders } from './orders.js';

let isAdmin = false;
let editingId = null;
let currentFile = null;
let isUploading = false;

// DOM refs
const adminSection = document.getElementById('adminSection');
const adminMenuGrid = document.getElementById('adminMenuGrid');
const loadingMenu = document.getElementById('loadingMenu');
const formTitle = document.getElementById('formTitle');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const newMenuBtn = document.getElementById('newMenuBtn');
const logoutBtn = document.getElementById('logoutBtn');
const adminUserEmail = document.getElementById('adminUserEmail');

// Form inputs
const inputName = document.getElementById('inputName');
const inputPrice = document.getElementById('inputPrice');
const inputDesc = document.getElementById('inputDesc');
const inputCategory = document.getElementById('inputCategory');
const inputTag = document.getElementById('inputTag');
const inputStock = document.getElementById('inputStock');
const inputPromo = document.getElementById('inputPromo');
const inputImage = document.getElementById('inputImage');
const inputImagePublicId = document.getElementById('inputImagePublicId');
const fileInput = document.getElementById('fileInput');
const uploadZone = document.getElementById('uploadZone');
const previewWrapper = document.getElementById('previewWrapper');
const previewImage = document.getElementById('previewImage');
const previewStatus = document.getElementById('previewStatus');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const removeImageBtn = document.getElementById('removeImageBtn');

export function getIsAdmin() {
    return isAdmin;
}

export function setIsAdmin(value) {
    isAdmin = value;
}

export function initAdmin() {
    auth.onAuthStateChanged(user => {
        if (user && !user.isAnonymous && ADMIN_EMAILS.includes(user.email)) {
            isAdmin = true;
            adminSection.classList.remove('admin-hidden');
            adminSection.style.display = 'block';
            adminUserEmail.textContent = user.email;
            loadMenuForAdmin();
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
            trackEvent('Auth', 'admin_login', user.email);
            console.log('✅ Admin logged in');
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
}

export async function loadMenuForAdmin() {
    if (!isAdmin) return;
    try {
        loadingMenu.classList.remove('hidden');
        loadingMenu.textContent = '⏳ Memuat menu...';
        const snapshot = await db.collection('menu').orderBy('name').get();
        const data = [];
        snapshot.forEach(doc => { data.push({ id: doc.id, ...doc.data() }); });
        renderAdminMenu(data);
        loadingMenu.classList.add('hidden');
    } catch (err) {
        console.error('Error loading admin menu:', err);
        loadingMenu.textContent = '❌ Gagal memuat menu';
        setTimeout(() => { loadingMenu.classList.add('hidden'); }, 2000);
    }
}

export function renderAdminMenu(data) {
    if (!adminMenuGrid) return;
    loadingMenu.classList.add('hidden');
    adminMenuGrid.innerHTML = '';

    if (!data || data.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.style.cssText = 'grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-muted);';
        const icon = document.createElement('div');
        icon.style.fontSize = '48px';
        icon.textContent = '📭';
        emptyDiv.appendChild(icon);
        const p = document.createElement('p');
        p.textContent = 'Belum ada menu. Klik "Tambah Baru" untuk menambahkan.';
        emptyDiv.appendChild(p);
        adminMenuGrid.appendChild(emptyDiv);
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.innerHTML = `
            <div class="admin-card-img">
                ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">` : 
                    `<div class="admin-card-placeholder">☕</div>`}
                ${item.promoPrice || item.tag === 'Promo' ? '<span class="badge-promo">🔥 Promo</span>' : ''}
                ${item.tag === 'Favorit' ? '<span class="badge-favorit">⭐ Favorit</span>' : ''}
                ${item.tag === 'New' ? '<span class="badge-new">✨ New</span>' : ''}
                ${item.stock === 0 ? '<span class="badge-habis">⛔ Habis</span>' : ''}
            </div>
            <div class="admin-card-info">
                <h4>${cleanNameFromEmoji(item.name)}</h4>
                <p>${item.desc || ''}</p>
                <div class="admin-card-price">
                    ${item.promoPrice ? 
                        `<span class="price-original">Rp${Number(item.price).toLocaleString('id-ID')}</span> Rp${Number(item.promoPrice).toLocaleString('id-ID')}` :
                        `Rp${Number(item.price).toLocaleString('id-ID')}`}
                </div>
                <div class="admin-card-meta">
                    <span>${item.category}</span>
                    ${item.tag && item.tag !== 'Promo' && item.tag !== 'Favorit' && item.tag !== 'New' ? 
                        `<span class="tag tag-${item.tag.toLowerCase()}">${item.tag}</span>` : ''}
                </div>
            </div>
            <div class="admin-card-stock">
                <button class="stock-change-btn" data-id="${item.id}" data-change="-1">−</button>
                <span>Stok: ${item.stock !== undefined ? item.stock : 10}</span>
                <button class="stock-change-btn" data-id="${item.id}" data-change="1">+</button>
            </div>
            <div class="admin-card-actions">
                <button class="btn btn-sm admin-edit-btn" data-id="${item.id}">✏️ Edit</button>
                <button class="btn btn-sm btn-danger admin-delete-btn" data-id="${item.id}" data-name="${item.name}">🗑️</button>
            </div>
        `;
        adminMenuGrid.appendChild(card);
    });
}

export function resetForm() {
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

export function editMenuItem(id) {
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
        .catch(err => { showToast('❌ Gagal memuat data menu: ' + err.message); });
}

export function deleteMenuItem(id, name) {
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
        loadMenuForAdmin();
    }).catch(err => {
        showToast('❌ Gagal menghapus menu: ' + err.message);
    });
}

export async function saveMenu() {
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

    try {
        const existing = await db.collection('menu').where('name', '==', name).get();
        if (!existing.empty && existing.docs[0].id !== editingId) {
            showToast('❌ Nama menu sudah ada! Gunakan nama lain.'); inputName.focus(); return;
        }
    } catch (err) {}

    const data = {
        name, price, desc: desc || '', category, tag: tag || '', stock,
        promoPrice: promoPrice, image: image || '', imagePublicId: imagePublicId || '',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        if (editingId) {
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
        loadMenuForAdmin();
        // Refresh public menu
        const menuData = getMenuCache();
        if (menuData) renderMenu(menuData);
    } catch (err) {
        showToast('❌ Gagal menyimpan menu: ' + err.message);
    }
}

export async function uploadToCloudinary(file) {
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
            xhr.onerror = () => reject(new Error('Network error'));
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

        setTimeout(() => { uploadProgress.classList.add('hidden'); }, 1500);
        showToast('✅ Gambar berhasil diupload!');
        trackEvent('Admin', 'upload_image', file.name);

        return { url: response.secure_url, publicId: response.public_id || '' };

    } catch (error) {
        console.error('Upload error:', error);
        isUploading = false;
        progressFill.style.width = '0%';
        progressText.textContent = '❌ Upload gagal!';
        uploadProgress.classList.remove('hidden');
        showToast('❌ Gagal upload: ' + error.message);
        return null;
    }
}

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

async function deleteImageFromCloudinary(publicId) {
    if (!publicId) return;
    console.log('🗑️ Would delete image:', publicId);
}

export function initAdminEvents() {
    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', saveMenu);
    }
    // Cancel / New
    if (cancelBtn) cancelBtn.addEventListener('click', resetForm);
    if (newMenuBtn) newMenuBtn.addEventListener('click', resetForm);

    // Logout
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
                showToast('❌ Gagal logout');
            });
        });
    }

    // File upload
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) uploadToCloudinary(file);
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
}