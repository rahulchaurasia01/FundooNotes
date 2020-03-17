importScripts('https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.11.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBUdNtjfgmh-N-yOWx_kuF8dbdzN_7a1Aw",
    authDomain: "fundoonotes-1580121043579.firebaseapp.com",
    databaseURL: "https://fundoonotes-1580121043579.firebaseio.com",
    projectId: "fundoonotes-1580121043579",
    storageBucket: "fundoonotes-1580121043579.appspot.com",
    messagingSenderId: "670336277527",
    appId: "1:670336277527:web:65c5dead7c2187ccae9052",
    measurementId: "G-CDEEVQX2ER"
});

const messaging = firebase.messaging();

