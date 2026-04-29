// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Your web app's Firebase configuration
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

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  const { getReactNativePersistence } = require("firebase/auth");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);