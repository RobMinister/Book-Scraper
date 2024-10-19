// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDJ2rf_b6CkCSRYSi-trtyDyQDomcQ1Cc",
  authDomain: "book-scraper-project.firebaseapp.com",
  projectId: "book-scraper-project",
  storageBucket: "book-scraper-project.appspot.com",
  messagingSenderId: "149967086782",
  appId: "1:149967086782:web:fa8a14a5c64f901b3b2aef",
  measurementId: "G-N2HM5HJLLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
