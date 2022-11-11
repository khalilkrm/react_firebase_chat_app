import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCAuFPzd9fw3Ne8Z7Usqk_IK7zbmmohgZE",
    authDomain: "lama-chat-78d5b.firebaseapp.com",
    projectId: "lama-chat-78d5b",
    storageBucket: "lama-chat-78d5b.appspot.com",
    messagingSenderId: "243451037233",
    appId: "1:243451037233:web:7982889fd2e5104ab9f710"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();