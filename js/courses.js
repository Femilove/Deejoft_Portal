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