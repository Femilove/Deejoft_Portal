import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

    const allowedAdmins = [
      "admin1@deejoft.com",
      "admin2@deejoft.com"
    ];

    document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMsg = document.getElementById("errorMsg");
      errorMsg.style.display = "none";

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (allowedAdmins.includes(user.email)) {
          localStorage.setItem("adminUser", user.email);
          window.location.href = "index.html";
        } else {
          errorMsg.textContent = "Access denied. You are not an admin.";
          errorMsg.style.display = "block";
        }
      } catch (error) {
        errorMsg.textContent = "Invalid email or password.";
        errorMsg.style.display = "block";
      }
    });