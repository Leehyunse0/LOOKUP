// Smooth scroll navigation + section reveal
const scrollButtons = document.querySelectorAll("[data-scroll-to]");
const header = document.querySelector(".site-header");
const sections = document.querySelectorAll("main > section");
const landingSection = document.querySelector(".landing-logo");
const logo = document.querySelector(".logo");
const heroSection = document.querySelector("#hero");

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-scroll-to");
    if (!target) return;
    const element = document.querySelector(target);
    if (!element) return;

    // Show only the selected section (hide landing)
    sections.forEach((section) => {
      section.classList.remove("section-visible");
    });
    element.classList.add("section-visible");

    // Active state for nav
    scrollButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    const headerOffset = header ? header.getBoundingClientRect().height : 0;
    const rect = element.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// Logo click → return to HERO / main landing
if (logo && heroSection) {
  logo.addEventListener("click", () => {
    // Show only hero section
    sections.forEach((section) => {
      section.classList.remove("section-visible");
    });
    heroSection.classList.add("section-visible");

    // Reset nav active state
    scrollButtons.forEach((btn) => btn.classList.remove("is-active"));

    // Scroll to top of hero (consider header height)
    const headerOffset = header ? header.getBoundingClientRect().height : 0;
    const rect = heroSection.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
}

// Hero tag grid animation
const tagPills = document.querySelectorAll("[data-tag]");

const tagWords = [
  "Ballet core",
  "Block core",
  "Lace detail",
  "Mary Jane",
  "Sheer layer",
  "Square toe",
  "Romantic volume",
  "Minimal black",
  "Soft tailoring",
  "Office casual",
  "Tulle skirt",
];

if (tagPills.length) {
  setInterval(() => {
    const pill = tagPills[Math.floor(Math.random() * tagPills.length)];
    if (!pill) return;
    const next = tagWords[Math.floor(Math.random() * tagWords.length)];

    pill.classList.add("is-swapping");

    setTimeout(() => {
      pill.textContent = next;
      pill.classList.remove("is-swapping");
    }, 180);
  }, 1600);
}

// Scroll reveal using Intersection Observer
const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");

        if (entry.target.classList.contains("problem-step")) {
          entry.target.classList.add("is-active");
        }

        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}
