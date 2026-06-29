import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5aJlu29XkEi...",
  authDomain: "girl-around-the-food.firebaseapp.com",
  projectId: "girl-around-the-food",
  storageBucket: "girl-around-the-food.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);