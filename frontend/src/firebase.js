// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 1. Make sure this import is here!

const firebaseConfig = {
  apiKey: "AIzaSyA5aJlu29XkEi...", // Keep your actual keys here
  authDomain: "girl-around-the-food.firebaseapp.com",
  projectId: "girl-around-the-food",
  storageBucket: "girl-around-the-food.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2. CRUCIAL LINE: This initializes the database and exports it so App.jsx can see it
export const db = getFirestore(app);