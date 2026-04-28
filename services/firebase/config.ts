// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm0uR2ljXVLJINuXKGjxmPe26sDeXrYE4",
  authDomain: "mibu-f93e8.firebaseapp.com",
  projectId: "mibu-f93e8",
  storageBucket: "mibu-f93e8.firebasestorage.app",
  messagingSenderId: "406393500335",
  appId: "1:406393500335:web:e6a831e927efb30cfa5a5a",
  measurementId: "G-M6PKXLCD7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);