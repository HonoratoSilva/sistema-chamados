import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSiqGUEdBjfcjWAcAOe4G1pQpn_KYaWDM",
    authDomain: "sistema-chamados-3e644.firebaseapp.com",
    projectId: "sistema-chamados-3e644",
    storageBucket: "sistema-chamados-3e644.appspot.com",
    messagingSenderId: "854119994168",
    appId: "1:854119994168:web:a81bf7177e450bf40f27cd"
};

// Initialize Firebase
const fireConnection = initializeApp.length && initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export {fireConnection, db, auth};