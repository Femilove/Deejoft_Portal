import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

    // 🔥 Your Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBtzBJNdj2EgVbAkB5uKs1VHl-XHklSDsk",
      authDomain: "deejoft-383a2.firebaseapp.com",
      projectId: "deejoft-383a2",
      storageBucket: "deejoft-383a2.firebasestorage.app",
      messagingSenderId: "1088164312193",
      appId: "1:1088164312193:web:44277d94e64549dbb98980"
    };

    // 🔧 Initialise Firebase + Firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

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