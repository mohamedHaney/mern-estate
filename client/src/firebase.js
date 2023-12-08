// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b497a.firebaseapp.com",
  projectId: "mern-estate-b497a",
  storageBucket: "mern-estate-b497a.appspot.com",
  messagingSenderId: "59148273497",
  appId: "1:59148273497:web:15845970ce8a6f7abc2e48",
  measurementId: "G-JCVGYQF252"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);