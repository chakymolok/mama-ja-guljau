const randomArticleLinks = ["/digests/2026-05-01/"];

function getCanonicalUrl() {
  const canonical = document.querySelector('link[rel="canonical"]');
  return canonical ? canonical.href : `${window.location.origin}${window.location.pathname}`;
}

function setStatus(element, text) {
  if (!element) return;
  element.textContent = text;
  window.setTimeout(() => {
    element.textContent = "";
  }, 2500);
}

async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  throw new Error("clipboard_unavailable");
}

function closeFloatingShare() {
  document.querySelectorAll(".floating-share-panel.open").forEach((panel) => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll(".floating-share-toggle").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function closeMobilePanels() {
  document.querySelectorAll(".mobile-nav-panel.open").forEach((panel) => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });
}

function closeHeaderNavs() {
  document.querySelectorAll(".header-inner").forEach((header) => {
    const nav = header.querySelector(".nav");
    const burger = header.querySelector(".burger-toggle");
    if (nav) nav.classList.remove("open");
    if (burger) {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

function closeTransientUi() {
  closeFloatingShare();
  closeMobilePanels();
  closeHeaderNavs();
}

function toggleHeaderNav(burger) {
  const header = burger.closest(".header-inner");
  const nav = header ? header.querySelector(".nav") : null;
  if (!nav) return;

  const open = !nav.classList.contains("open");
  closeHeaderNavs();
  nav.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
}

function toggleFloatingShare() {
  const panel = document.querySelector(".floating-share-panel");
  if (!panel) return;

  const open = !panel.classList.contains("open");
  closeMobilePanels();
  panel.classList.toggle("open", open);
  panel.setAttribute("aria-hidden", String(!open));

  document.querySelectorAll(".floating-share-toggle").forEach((button) => {
    button.setAttribute("aria-expanded", String(open));
  });
}

function toggleMobileNavPanel() {
  const panel = document.querySelector(".mobile-nav-panel");
  if (!panel) {
    const target = document.querySelector("#toc") || document.querySelector("#issue") || document.querySelector("main");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const open = !panel.classList.contains("open");
  closeFloatingShare();
  panel.classList.toggle("open", open);
  panel.setAttribute("aria-hidden", String(!open));
}

function shareStatusFor(button) {
  const panel = button.closest(".share-card, .floating-share-panel");
  return panel ? panel.querySelector(".js-copy-status") : null;
}

async function handleCopy(button) {
  const url = button.dataset.copyUrl || window.location.href;
  const status = shareStatusFor(button);

  try {
    await copyText(url);
    setStatus(status, "Ссылка скопирована");
  } catch (error) {
    setStatus(status, "Скопируйте вручную: " + url);
  }
}

async function handleNativeShare(button) {
  const url = button.dataset.shareUrl || window.location.href;
  const title = button.dataset.shareTitle || document.title;
  const text = button.dataset.shareText || title;
  const status = shareStatusFor(button);

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (error) {
      return;
    }
  }

  try {
    await copyText(url);
    setStatus(status, "Ссылка скопирована для MAX");
  } catch (error) {
    setStatus(status, "Скопируйте ссылку вручную");
  }
}

function updateShareLinks() {
  const url = getCanonicalUrl();
  const title = document.title || "Мама, я гуляю";

  document.querySelectorAll('a[href*="t.me/share/url"]').forEach((link) => {
    link.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  });

  document.querySelectorAll('a[href*="vk.com/share.php"]').forEach((link) => {
    link.href = `https://vk.com/share.php?url=${encodeURIComponent(url)}`;
  });

  document.querySelectorAll("[data-copy-url]").forEach((element) => {
    element.setAttribute("data-copy-url", url);
  });

  document.querySelectorAll("[data-share-url]").forEach((element) => {
    element.setAttribute("data-share-url", url);
    if (!element.getAttribute("data-share-title")) {
      element.setAttribute("data-share-title", title);
    }
  });
}

function openDonate(event) {
  if (event) event.preventDefault();

  const donateUrl = "https://www.tbank.ru/cf/1ZddEeAvzU1";
  const modal = document.querySelector(".donate-modal");
  if (!modal) {
    window.open(donateUrl, "_blank", "noopener");
    return;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeDonate(event) {
  if (event) event.preventDefault();

  const modal = document.querySelector(".donate-modal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function improveText(text) {
  return text
    .replace(/\s+([,.:;!?])/g, "$1")
    .replace(/Мама,\s*я\s+гуляю/g, "Мама, я\u00A0гуляю")
    .replace(/,\s+(я|и|а|но|как|что|это|не|ни|в|на|к|с|о|у|за|по|от|до|из|для|про|при)\s+([А-ЯЁа-яёA-Za-z0-9])/giu, ", $1\u00A0$2")
    .replace(/(^|\s)(а|в|во|и|к|ко|о|об|от|по|с|со|у|за|из|на|не|ни|но|ну|до|для|про|при|над|под|без|или|как|что|это)\s+([А-ЯЁа-яёA-Za-z0-9])/giu, "$1$2\u00A0$3")
    .replace(/№\s*(\d+)/g, "№\u00A0$1")
    .replace(/(\d+)\s+(рублей|рубля|рубль|₽|лет|года|год|минут|минуты|часов|часа|час)/giu, "$1\u00A0$2")
    .replace(/\s+—\s+/g, " — ")
    .replace(/\s+-\s+/g, " - ");
}

function typographPage() {
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"].includes(parent.tagName)) return;
      if (node.nodeValue && node.nodeValue.trim()) {
        node.nodeValue = improveText(node.nodeValue);
      }
      return;
    }

    node.childNodes.forEach(walk);
  }

  walk(document.body);
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeTransientUi();
    });
  });
}

function initRandomArticleLinks() {
  document.querySelectorAll(".js-random-article").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!randomArticleLinks.length) return;

      event.preventDefault();
      const next = randomArticleLinks[Math.floor(Math.random() * randomArticleLinks.length)];
      window.location.href = next;
    });
  });
}

function initGlobalEvents() {
  document.addEventListener("click", (event) => {
    const burger = event.target.closest(".burger-toggle");
    if (burger) {
      event.preventDefault();
      event.stopPropagation();
      toggleHeaderNav(burger);
      return;
    }

    const floatingShareToggle = event.target.closest(".floating-share-toggle, .js-dock-share");
    if (floatingShareToggle) {
      event.preventDefault();
      event.stopPropagation();
      toggleFloatingShare();
      return;
    }

    const dockNav = event.target.closest(".js-dock-nav");
    if (dockNav) {
      event.preventDefault();
      event.stopPropagation();
      toggleMobileNavPanel();
      return;
    }

    const copyButton = event.target.closest(".js-copy-link");
    if (copyButton) {
      event.preventDefault();
      handleCopy(copyButton);
      return;
    }

    const nativeShareButton = event.target.closest(".js-native-share");
    if (nativeShareButton) {
      event.preventDefault();
      handleNativeShare(nativeShareButton);
      return;
    }

    const donateOpen = event.target.closest(".js-donate-open");
    if (donateOpen) {
      openDonate(event);
      return;
    }

    const donateClose = event.target.closest(".js-donate-close");
    if (donateClose) {
      closeDonate(event);
      return;
    }

    const clickedInsideTransientUi = event.target.closest(".header-inner, .floating-dock, .floating-share-panel, .mobile-nav-panel, .donate-modal-card");
    if (!clickedInsideTransientUi) closeTransientUi();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeTransientUi();
    closeDonate(event);
  });

  document.querySelectorAll(".header .nav a, .mobile-nav-panel a").forEach((link) => {
    link.addEventListener("click", closeTransientUi);
  });
}

function init() {
  updateShareLinks();
  initSmoothAnchors();
  initRandomArticleLinks();
  initGlobalEvents();
  typographPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
