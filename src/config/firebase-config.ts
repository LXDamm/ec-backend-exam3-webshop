import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://sinus-shop.firebaseio.com"
});

export default admin;