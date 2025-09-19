// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVfc8f-XOPPq8pnn7JK8Vb0ABNCwo1T40",
  authDomain: "badminton-eee34.firebaseapp.com",
  databaseURL: "https://badminton-eee34-default-rtdb.firebaseio.com",
  projectId: "badminton-eee34",
  storageBucket: "badminton-eee34.firebasestorage.app",
  messagingSenderId: "871432686449",
  appId: "1:871432686449:web:f8f52ca878ac5281f9c4d0",
  measurementId: "G-0RT5X6QRFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;