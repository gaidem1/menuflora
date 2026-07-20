await db.runTransaction(async (transaction) => {
    // 1. Baca SEMUA dokumen terlebih dahulu
    const docs = [];
    for (const item of menuRefs) {
        const doc = await transaction.get(item.ref);
        if (!doc.exists) {
            throw new Error(`Menu ${item.name} tidak ada.`);
        }
        const currentStock = doc.data().stock || 0;
        if (currentStock < item.qty) {
            throw new Error(`Stok ${item.name} tidak cukup (sisa ${currentStock}).`);
        }
        docs.push({ ref: item.ref, stock: currentStock, qty: item.qty });
    }
    // 2. Setelah SEMUA baca selesai, lakukan update
    for (const docInfo of docs) {
        transaction.update(docInfo.ref, {
            stock: docInfo.stock - docInfo.qty,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
});