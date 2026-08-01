const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const dayRows = document.querySelectorAll(".hours-card tr[data-day]");
const today = new Date().getDay();
dayRows.forEach((row) => {
  if (Number(row.dataset.day) === today) {
    row.classList.add("today");
  }
});

const fadeSections = document.querySelectorAll(".fade-in-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

fadeSections.forEach((section) => observer.observe(section));
