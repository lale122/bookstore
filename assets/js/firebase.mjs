// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBIWsZBcxgDJdP5ozHYrh0Xj7X14-T3si4",
  authDomain: "library-adfb1.firebaseapp.com",
  projectId: "library-adfb1",
  storageBucket: "library-adfb1.appspot.com",
  messagingSenderId: "674865683573",
  appId: "1:674865683573:web:340db534572b57a9bdac3c",
  measurementId: "G-SRTYV9ESB2"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;
