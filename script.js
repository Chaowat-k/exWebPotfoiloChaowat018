document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function setActive(menu) {
    navLinks.forEach(link => {
      link.classList.remove("text-blue-600", "font-semibold");
      if (
        link.dataset.menu === menu ||
        link.getAttribute("href") === `#${menu}`
      ) {
        link.classList.add("text-blue-600", "font-semibold");
      }
    });
  }

  const isIndexPage =
    location.pathname === "/" ||
    location.pathname.includes("index.html");

  if (isIndexPage && window.scrollY === 0) {
    localStorage.setItem("activeMenu", "home");
    setActive("home");
  } else {
    const saved = localStorage.getItem("activeMenu");
    if (saved) setActive(saved);
  }

  if (isIndexPage) {
    window.addEventListener("scroll", () => {
      let current = "home";

      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
          current = section.id;
        }
      });

      localStorage.setItem("activeMenu", current);
      setActive(current);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const menu = link.dataset.menu;
      if (menu) {
        localStorage.setItem("activeMenu", menu);
        setActive(menu);
      }

      // ปิด hamburger หลังคลิก
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
