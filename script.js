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


document.querySelectorAll(".js-copy-link").forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.copyUrl || window.location.href;
    const card = button.closest(".share-card");
    const status = card ? card.querySelector(".js-copy-status") : null;
    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = "Ссылка скопирована";
    } catch (error) {
      if (status) status.textContent = "Скопируйте вручную: " + url;
    }
    setTimeout(() => {
      if (status) status.textContent = "";
    }, 2500);
  });
});

document.querySelectorAll(".js-native-share").forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.shareUrl || window.location.href;
    const title = button.dataset.shareTitle || document.title;
    const text = button.dataset.shareText || title;
    const card = button.closest(".share-card");
    const status = card ? card.querySelector(".js-copy-status") : null;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        // User cancelled or share failed. Fall back to copy.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = "Для MAX ссылка скопирована";
    } catch (error) {
      if (status) status.textContent = "MAX: скопируйте ссылку вручную";
    }
    setTimeout(() => {
      if (status) status.textContent = "";
    }, 2500);
  });
});


const floatingShareToggle = document.querySelector(".floating-share-toggle");
const floatingSharePanel = document.querySelector(".floating-share-panel");

if (floatingShareToggle && floatingSharePanel) {
  floatingShareToggle.addEventListener("click", () => {
    const isOpen = floatingSharePanel.classList.toggle("open");
    floatingShareToggle.setAttribute("aria-expanded", String(isOpen));
    floatingSharePanel.setAttribute("aria-hidden", String(!isOpen));
  });

  document.addEventListener("click", (event) => {
    const clickedInside = floatingSharePanel.contains(event.target) || floatingShareToggle.contains(event.target);
    if (!clickedInside) {
      floatingSharePanel.classList.remove("open");
      floatingShareToggle.setAttribute("aria-expanded", "false");
      floatingSharePanel.setAttribute("aria-hidden", "true");
    }
  });
}
