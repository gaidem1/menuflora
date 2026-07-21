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

// Anonymous auth
const anonAuthReady = auth.signInAnonymously().catch(err => {
    console.error('❌ Anonymous sign-in gagal:', err);
});

// Offline persistence
db.enablePersistence({ synchronizeTabs: true }).catch(() => {});