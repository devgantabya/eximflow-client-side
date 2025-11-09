// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUAO1x1dTTQhhCdjYoPggI_MFIpvxNXpo",
    authDomain: "eximflow-9f432.firebaseapp.com",
    projectId: "eximflow-9f432",
    storageBucket: "eximflow-9f432.firebasestorage.app",
    messagingSenderId: "619009387849",
    appId: "1:619009387849:web:3bfa79279bf2bc68f33e98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);