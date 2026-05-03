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


document.querySelectorAll(".js-copy-link").forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.copyUrl || window.location.href;
    const card = button.closest(".share-card");
    const status = card ? card.querySelector(".js-copy-status") : null;
    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = "Ссылка скопирована";
    } catch (error) {
      if (status) status.textContent = "Не скопировалось. Ссылка: " + url;
    }
    setTimeout(() => {
      if (status) status.textContent = "";
    }, 2500);
  });
});

async function initViewCounters() {
  const badges = document.querySelectorAll("[data-view-count]");
  if (!badges.length) return;

  for (const badge of badges) {
    const slug = badge.dataset.viewCount;
    const shouldIncrement = window.location.pathname.includes("/digests/");
    const url = `/api/views?slug=${encodeURIComponent(slug)}${shouldIncrement ? "&inc=1" : ""}`;

    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("views api failed");
      const data = await response.json();
      const value = Number(data.views || 0).toLocaleString("ru-RU");
      badge.innerHTML = `👀 <strong>${value}</strong> прочтений`;
      badge.classList.remove("loading");
    } catch (error) {
      badge.textContent = "";
      badge.style.display = "none";
    }
  }
}

initViewCounters();
