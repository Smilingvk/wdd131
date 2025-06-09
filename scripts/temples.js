document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
  
    hamburger.addEventListener("click", () => {
      navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
      hamburger.textContent = navMenu.style.display === "flex" ? "X" : "☰";
    });
  
    document.getElementById("year").textContent = new Date().getFullYear();
  
    document.getElementById("lastModified").textContent =
      "Last Modified: " + document.lastModified;
  });
  