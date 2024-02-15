// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxUzTqvP4kBJy7yTYtuYkbNLg_gUKpYjA",
    authDomain: "contact-app-v.firebaseapp.com",
    projectId: "contact-app-v",
    storageBucket: "contact-app-v.appspot.com",
    messagingSenderId: "917490085476",
    appId: "1:917490085476:web:4fb79eba24f1a3b7f1f971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
