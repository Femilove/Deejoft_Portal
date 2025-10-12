import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtzBJNdj2EgVbAkB5uKs1VHl-XHklSDsk",
  authDomain: "deejoft-383a2.firebaseapp.com",
  projectId: "deejoft-383a2",
  storageBucket: "deejoft-383a2.firebasestorage.app",
  messagingSenderId: "1088164312193",
  appId: "1:1088164312193:web:44277d94e64549dbb98980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🔐 Redirect to login if not signed in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "student.html";
  } else {
    console.log("✅ Logged in as:", user.email);
  }
});

// 🚪 Logout function
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "student.html";
  } catch (error) {
    alert("Error logging out: " + error.message);
  }
});

// 🔒 Prevent going back after logout
window.history.pushState(null, "", window.location.href);
window.onpopstate = function () {
  window.history.pushState(null, "", window.location.href);
};

const noticesDiv = document.getElementById("notices");

// 📰 Load Announcements
async function loadNotices() {
  try {
    const q = query(collection(db, "announcements"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      noticesDiv.innerHTML = `<p class="empty">No announcements yet.</p>`;
      return;
    }

    noticesDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const a = doc.data();
      const html = `
        <div class="notice">
          <h4>${a.text}</h4>
          <small>📅 ${a.date ? new Date(a.date).toLocaleString() : "No date"}</small>
        </div>
      `;
      noticesDiv.innerHTML += html;
    });
  } catch (error) {
    console.error("Error loading notices:", error);
    noticesDiv.innerHTML = `<p class="empty">⚠️ Failed to load announcements.</p>`;
  }
}

loadNotices();
