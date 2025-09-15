 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");

    // sidebar
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });

    //////////

    AOS.init();

    const firebaseConfig = {
      apiKey: "AIzaSyBtzBJNdj2EgVbAkB5uKs1VHl-XHklSDsk",
      authDomain: "deejoft-383a2.firebaseapp.com",
      projectId: "deejoft-383a2",
      storageBucket: "deejoft-383a2.firebasestorage.app",
      messagingSenderId: "1088164312193",
      appId: "1:1088164312193:web:44277d94e64549dbb98980"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // 🔐 Redirect to login if not signed in
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "student.html"; 
      } else {
        // ✅ Replace John Doe and Welcome back text with username/email
        const username = user.displayName ;
        document.getElementById("username").textContent = username;
        document.getElementById("welcomeText").textContent = `Welcome back, ${username}!`;
      }
    });

    // 🚪 Logout function
    document.getElementById("logoutBtn").addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          window.location.href = "student.html"; // back to login
        })
        .catch((error) => {
          alert("Error logging out: " + error.message);
        });
    });

    // 🔒 Prevent going back after logout
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };