
// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Replace with your Firebase project config
  const firebaseConfig = {
    apiKey: "AIzaSyBtzBJNdj2EgVbAkB5uKs1VHl-XHklSDsk",
    authDomain: "deejoft-383a2.firebaseapp.com",
    projectId: "deejoft-383a2",
    storageBucket: "deejoft-383a2.firebasestorage.app",
    messagingSenderId: "1088164312193",
    appId: "1:1088164312193:web:44277d94e64549dbb98980"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

