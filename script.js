document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    const panel = document.querySelector(".mobile-nav-panel");
    if (panel) panel.classList.remove("open");
  });
});

const toggle = document.querySelector(".mobile-nav-toggle");
const panel = document.querySelector(".mobile-nav-panel");
if (toggle && panel) {
  toggle.addEventListener("click", () => panel.classList.toggle("open"));
}
