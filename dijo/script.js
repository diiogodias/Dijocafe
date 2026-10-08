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

const COOKIE_CONSENT_NAME = "dijo_cookie_consent";

function getCookie(name) {
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax${secure}`;
}

function showCookieBanner() {
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.innerHTML = `
    <div class="container cookie-banner-inner">
      <p>We use cookies to improve your experience and analyse site traffic. By continuing to use this site you accept our use of cookies.</p>
      <div class="cookie-actions">
        <button type="button" class="btn cookie-accept" data-consent="accepted">Accept</button>
        <button type="button" class="btn cookie-decline" data-consent="declined">Decline</button>
      </div>
    </div>
  `;

  banner.querySelectorAll("[data-consent]").forEach((button) => {
    button.addEventListener("click", () => {
      setCookie(COOKIE_CONSENT_NAME, button.dataset.consent, 365);
      banner.hidden = true;
      if (button.dataset.consent === "accepted" && typeof window.loadGoogleAnalytics === "function") {
        window.loadGoogleAnalytics();
      }
    });
  });

  document.body.appendChild(banner);
}

if (!getCookie(COOKIE_CONSENT_NAME)) {
  showCookieBanner();
}
