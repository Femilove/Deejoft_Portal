
const API_BASE = "http://localhost:5000/api"; // Node backend base URL

    // ✅ Sidebar navigation
    window.showSection = function (sectionId) {
      document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
      });
      const active = document.getElementById(sectionId);
      if (active) active.classList.add("active");

      // Update sidebar active link
      document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
      const clicked = Array.from(document.querySelectorAll(".sidebar a")).find(a => a.getAttribute("onclick") === `showSection('${sectionId}')`);
      if (clicked) clicked.classList.add("active");
    };

    // === Auth ===
    // Redirect if not logged in or not admin
    const allowedAdmins = ["admin1@deejoft.com", "admin2@deejoft.com"];
    const loggedInUser = localStorage.getItem("adminUser");

    if (!loggedInUser || !allowedAdmins.includes(loggedInUser)) {
      window.location.href = "admin-login.html"
    }

    // === Logout ===
    window.logout = function () {
    localStorage.removeItem("adminUser");
    window.location.href = "admin-login.html";
  };


  

    // === Students ===

    async function loadStudents() {
      const res = await fetch(`${API_BASE}/students`);
      const data = await res.json();
      const tbody = document.querySelector("#studentsTable tbody");
      tbody.innerHTML = data.map(s => `
        <tr>
          <td>${s.username}</td>
          <td>${s.email}</td>
          <td>${s.role}</td>
          <td><button onclick="deleteStudent('${s.id}')">Delete</button></td>
        </tr>
      `).join("");
    }

    // === Delete Student ===
    window.deleteStudent = async (id) => {
      if (confirm("Are you sure you want to delete this student?")) {
        await fetch(`${API_BASE}/students/${id}`, { method: "DELETE" });
        loadStudents();
      }
    };


    // === Courses ===

const detailsContainer = document.getElementById("detailsContainer");
const addDetailBtn = document.getElementById("addDetailBtn");

let detailCount = 1;

// === Add new detail input ===
addDetailBtn.addEventListener("click", () => {
  detailCount++;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "detail-input";
  input.placeholder = `Course Detail ${detailCount}`;
  detailsContainer.appendChild(input);
});

async function loadCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  const data = await res.json();
  const tbody = document.querySelector("#coursesTable tbody");
  tbody.innerHTML = data.map(c => {
    const details = c.details ? c.details.join("<br>") : "";
    return `
      <tr>
        <td>${c.title}</td>
        <td>${details}</td>
        <td>${c.duration}</td>
        <td>${c.amount}</td>
        <td>
          <button onclick="editCourse('${c.id}')">Edit</button>
          <button onclick="deleteCourse('${c.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join("");
}

let editingCourseId = null;

document.getElementById("courseForm").addEventListener("submit", async e => {
  e.preventDefault();

  const title = document.getElementById("courseTitle").value;
  const duration = document.getElementById("courseDuration").value;
  const amount = Number(document.getElementById("courseAmount").value);
  const details = Array.from(document.querySelectorAll(".detail-input"))
    .map(input => input.value)
    .filter(Boolean); // ignore empty ones

  const data = { title, details, duration, amount };

  //=== Edit Courses ===
  if (editingCourseId) {
    await fetch(`${API_BASE}/courses/${editingCourseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    editingCourseId = null;
    document.querySelector("#courseForm button[type='submit']").textContent = "Add Course";
  } else {
    await fetch(`${API_BASE}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  e.target.reset();
  detailsContainer.innerHTML = `<input type="text" class="detail-input" placeholder="Course Detail 1">`;
  detailCount = 1;
  loadCourses();
});

window.editCourse = async (id) => {
  const res = await fetch(`${API_BASE}/courses/${id}`);
  const course = await res.json();

  document.getElementById("courseTitle").value = course.title;
  document.getElementById("courseDuration").value = course.duration;
  document.getElementById("courseAmount").value = course.amount;

  // populate details
  detailsContainer.innerHTML = "";
  (course.details || []).forEach((d, i) => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "detail-input";
    input.placeholder = `Course Detail ${i + 1}`;
    input.value = d;
    detailsContainer.appendChild(input);
  });
  detailCount = course.details ? course.details.length : 1;

  editingCourseId = id;
  document.querySelector("#courseForm button[type='submit']").textContent = "Update Course";
};
// === Delete ===
window.deleteCourse = async (id) => {
  await fetch(`${API_BASE}/courses/${id}`, { method: "DELETE" });
  loadCourses();
};


    // === Announcements ===
      async function loadAnnouncements() {
      const res = await fetch(`${API_BASE}/announcements`);
      const data = await res.json();
      const list = document.getElementById("announcementsList");
      list.innerHTML = data.map(a => `
        <li>
          ${a.text} <small>${new Date(a.date).toLocaleString()}</small>
          <button onclick="deleteAnnouncement('${a.id}')" style="
            background: gray;
            color: white;
            border: none;
            border-radius: 5px;
            margin-left: 10px;
            padding: 4px 8px;
            cursor: pointer;
          ">Delete</button>
        </li>
      `).join("");
    }

    window.deleteAnnouncement = async (id) => {
      if (confirm("Are you sure you want to delete this announcement?")) {
        await fetch(`${API_BASE}/announcements/${id}`, { method: "DELETE" });
        
        loadAnnouncements();
      }
    };



    document.getElementById("announcementForm").addEventListener("submit", async e => {
      e.preventDefault();
      const data = { text: announcementText.value };
      await fetch(`${API_BASE}/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      e.target.reset();
      loadAnnouncements();
    });

    // === Initial Load ===
    loadStudents();
    loadCourses();
    loadAnnouncements();