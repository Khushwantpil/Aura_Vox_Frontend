// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aura-vox-e72c7.firebaseapp.com",
  projectId: "aura-vox-e72c7",
  storageBucket: "aura-vox-e72c7.firebasestorage.app",
  messagingSenderId: "297928135372",
  appId: "1:297928135372:web:b1b5ee2790681cb687e869",
  measurementId: "G-GWJ1QYEMDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider};
