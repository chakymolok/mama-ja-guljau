document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    const mobileNavPanel = document.querySelector(".mobile-nav-panel");
    if (mobileNavPanel) mobileNavPanel.classList.remove("open");
    const floatingSharePanel = document.querySelector(".floating-share-panel");
    if (floatingSharePanel) floatingSharePanel.classList.remove("open");
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
    const card = button.closest(".share-card, .floating-share-panel");
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
    const card = button.closest(".share-card, .floating-share-panel");
    const status = card ? card.querySelector(".js-copy-status") : null;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {}
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
      if (data.configured === false) throw new Error("views not configured");
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


// ===== mobile burger =====
document.querySelectorAll(".burger-toggle").forEach((burger) => {
  const nav = burger.parentElement ? burger.parentElement.querySelector(".nav") : null;
  if (!nav) return;

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
});

// ===== unified floating dock =====
document.querySelectorAll(".js-dock-share").forEach((btn) => {
  btn.addEventListener("click", () => {
    const sharePanel = document.querySelector(".floating-share-panel");
    const navPanel = document.querySelector(".mobile-nav-panel");
    if (navPanel) navPanel.classList.remove("open");
    if (sharePanel) {
      sharePanel.classList.toggle("open");
      sharePanel.setAttribute("aria-hidden", String(!sharePanel.classList.contains("open")));
    }
  });
});

document.querySelectorAll(".js-dock-nav").forEach((btn) => {
  btn.addEventListener("click", () => {
    const navPanel = document.querySelector(".mobile-nav-panel");
    const sharePanel = document.querySelector(".floating-share-panel");
    if (sharePanel) sharePanel.classList.remove("open");

    if (navPanel) {
      navPanel.classList.toggle("open");
      navPanel.setAttribute("aria-hidden", String(!navPanel.classList.contains("open")));
    } else {
      const target = document.querySelector("#issue") || document.querySelector("main");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.addEventListener("click", (event) => {
  const dock = document.querySelector(".floating-dock");
  const sharePanel = document.querySelector(".floating-share-panel");
  const navPanel = document.querySelector(".mobile-nav-panel");

  const clickedDock = dock && dock.contains(event.target);
  const clickedShare = sharePanel && sharePanel.contains(event.target);
  const clickedNav = navPanel && navPanel.contains(event.target);

  if (!clickedDock && !clickedShare && !clickedNav) {
    if (sharePanel) sharePanel.classList.remove("open");
    if (navPanel) navPanel.classList.remove("open");
  }
});

// Random article placeholder.
// Later add more URLs here.
const randomArticleLinks = [
  "/digests/2026-05-01/"
];

document.querySelectorAll(".js-random-article").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!randomArticleLinks.length) return;
    event.preventDefault();
    const next = randomArticleLinks[Math.floor(Math.random() * randomArticleLinks.length)];
    window.location.href = next;
  });
});


// ===== FIX: burger top-right =====
document.querySelectorAll(".burger-toggle").forEach((burger) => {
  if (burger.dataset.fixedBurger === "1") return;
  burger.dataset.fixedBurger = "1";
  const header = burger.closest(".header-inner");
  const nav = header ? header.querySelector(".nav") : null;
  if (!nav) return;

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
});

// ===== FIX: dock share/nav/random =====
document.querySelectorAll(".js-dock-share").forEach((btn) => {
  if (btn.dataset.fixedShare === "1") return;
  btn.dataset.fixedShare = "1";
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const sharePanel = document.querySelector(".floating-share-panel");
    const navPanel = document.querySelector(".mobile-nav-panel");
    if (navPanel) navPanel.classList.remove("open");
    if (sharePanel) {
      const open = !sharePanel.classList.contains("open");
      sharePanel.classList.toggle("open", open);
      sharePanel.setAttribute("aria-hidden", String(!open));
    }
  });
});

document.querySelectorAll(".js-dock-nav").forEach((btn) => {
  if (btn.dataset.fixedNav === "1") return;
  btn.dataset.fixedNav = "1";
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const navPanel = document.querySelector(".mobile-nav-panel");
    const sharePanel = document.querySelector(".floating-share-panel");
    if (sharePanel) sharePanel.classList.remove("open");
    if (navPanel) {
      const open = !navPanel.classList.contains("open");
      navPanel.classList.toggle("open", open);
      navPanel.setAttribute("aria-hidden", String(!open));
    } else {
      const target = document.querySelector("#toc") || document.querySelector("#issue") || document.querySelector("main");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll(".js-copy-link").forEach((button) => {
  if (button.dataset.fixedCopy === "1") return;
  button.dataset.fixedCopy = "1";
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const url = button.dataset.copyUrl || window.location.href;
    const panel = button.closest(".share-card, .floating-share-panel");
    const status = panel ? panel.querySelector(".js-copy-status") : null;
    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = "Ссылка скопирована";
    } catch (error) {
      if (status) status.textContent = "Скопируйте вручную: " + url;
    }
    setTimeout(() => { if (status) status.textContent = ""; }, 2500);
  });
});

document.querySelectorAll(".js-native-share").forEach((button) => {
  if (button.dataset.fixedNativeShare === "1") return;
  button.dataset.fixedNativeShare = "1";
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const url = button.dataset.shareUrl || window.location.href;
    const title = button.dataset.shareTitle || document.title;
    const text = button.dataset.shareText || title;
    const panel = button.closest(".share-card, .floating-share-panel");
    const status = panel ? panel.querySelector(".js-copy-status") : null;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {}
    }

    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = "Для MAX ссылка скопирована";
    } catch (error) {
      if (status) status.textContent = "MAX: скопируйте ссылку вручную";
    }
    setTimeout(() => { if (status) status.textContent = ""; }, 2500);
  });
});

document.addEventListener("click", (event) => {
  const dock = document.querySelector(".floating-dock");
  const sharePanel = document.querySelector(".floating-share-panel");
  const navPanel = document.querySelector(".mobile-nav-panel");
  const clickedDock = dock && dock.contains(event.target);
  const clickedShare = sharePanel && sharePanel.contains(event.target);
  const clickedNav = navPanel && navPanel.contains(event.target);
  if (!clickedDock && !clickedShare && !clickedNav) {
    if (sharePanel) sharePanel.classList.remove("open");
    if (navPanel) navPanel.classList.remove("open");
  }
});


// ===== FINAL WORKING MOBILE NAV / SHARE =====
(function () {
  function closePanels() {
    document.querySelectorAll(".mobile-nav-panel.open, .floating-share-panel.open").forEach(function (panel) {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    });
  }

  document.addEventListener("click", function (event) {
    const burger = event.target.closest(".burger-toggle");
    if (burger) {
      const header = burger.closest(".header-inner");
      const nav = header ? header.querySelector(".nav") : null;
      if (nav) {
        event.preventDefault();
        event.stopPropagation();
        const open = !nav.classList.contains("open");
        nav.classList.toggle("open", open);
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", String(open));
      }
      return;
    }

    const navBtn = event.target.closest(".js-dock-nav");
    if (navBtn) {
      event.preventDefault();
      event.stopPropagation();
      const navPanel = document.querySelector(".mobile-nav-panel");
      const sharePanel = document.querySelector(".floating-share-panel");
      if (sharePanel) sharePanel.classList.remove("open");
      if (navPanel) {
        const open = !navPanel.classList.contains("open");
        navPanel.classList.toggle("open", open);
        navPanel.setAttribute("aria-hidden", String(!open));
      }
      return;
    }

    const shareBtn = event.target.closest(".js-dock-share");
    if (shareBtn) {
      event.preventDefault();
      event.stopPropagation();
      const sharePanel = document.querySelector(".floating-share-panel");
      const navPanel = document.querySelector(".mobile-nav-panel");
      if (navPanel) navPanel.classList.remove("open");
      if (sharePanel) {
        const open = !sharePanel.classList.contains("open");
        sharePanel.classList.toggle("open", open);
        sharePanel.setAttribute("aria-hidden", String(!open));
      }
      return;
    }

    const copyBtn = event.target.closest(".js-copy-link");
    if (copyBtn) {
      event.preventDefault();
      const url = copyBtn.dataset.copyUrl || window.location.href;
      const panel = copyBtn.closest(".floating-share-panel, .share-card");
      const status = panel ? panel.querySelector(".js-copy-status") : null;
      navigator.clipboard.writeText(url).then(function () {
        if (status) status.textContent = "Ссылка скопирована";
      }).catch(function () {
        if (status) status.textContent = "Скопируйте вручную: " + url;
      });
      setTimeout(function () { if (status) status.textContent = ""; }, 2500);
      return;
    }

    const nativeBtn = event.target.closest(".js-native-share");
    if (nativeBtn) {
      event.preventDefault();
      const url = nativeBtn.dataset.shareUrl || window.location.href;
      const title = nativeBtn.dataset.shareTitle || document.title;
      const text = nativeBtn.dataset.shareText || title;
      const panel = nativeBtn.closest(".floating-share-panel, .share-card");
      const status = panel ? panel.querySelector(".js-copy-status") : null;

      if (navigator.share) {
        navigator.share({ title, text, url }).catch(function () {});
      } else {
        navigator.clipboard.writeText(url).then(function () {
          if (status) status.textContent = "Ссылка скопирована для MAX";
        }).catch(function () {
          if (status) status.textContent = "Скопируйте ссылку вручную";
        });
        setTimeout(function () { if (status) status.textContent = ""; }, 2500);
      }
      return;
    }

    const header = event.target.closest(".header-inner");
    const dock = event.target.closest(".floating-dock");
    const panel = event.target.closest(".mobile-nav-panel, .floating-share-panel");
    if (!header && !dock && !panel) {
      document.querySelectorAll(".header .nav.open").forEach(function (nav) { nav.classList.remove("open"); });
      document.querySelectorAll(".burger-toggle.open").forEach(function (btn) {
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
      closePanels();
    }
  }, true);

  document.querySelectorAll(".mobile-nav-panel a").forEach(function (link) {
    link.addEventListener("click", closePanels);
  });
})();


// ===== Donate modal =====
(function () {
  const donateUrl = "https://www.tbank.ru/cf/1ZddEeAvzU1";

  function openDonate(event) {
    if (event) event.preventDefault();
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

  document.addEventListener("click", function (event) {
    const openBtn = event.target.closest(".js-donate-open");
    if (openBtn) {
      openDonate(event);
      return;
    }

    const closeBtn = event.target.closest(".js-donate-close");
    if (closeBtn) {
      closeDonate(event);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeDonate(event);
  });
})();

// ===== Russian typography helpers =====
(function () {
  const shortWords = "а|в|во|и|к|ко|о|об|от|по|с|со|у|за|из|на|не|ни|но|ну|до|для|про|при|над|под|без|или|как|что|это";
  const reShort = new RegExp("(^|\\s)(" + shortWords + ")\\s+", "giu");

  function typographText(text) {
    return text
      .replace(/\s+([,.:;!?])/g, "$1")
      .replace(/([№])\s+(\d)/g, "$1\u00A0$2")
      .replace(/(\d+)\s+(рублей|рубля|рубль|₽|лет|года|год|минут|минуты|часов|часа|час)/giu, "$1\u00A0$2")
      .replace(reShort, "$1$2\u00A0")
      .replace(/\s+—\s+/g, " — ")
      .replace(/\s+-\s+/g, " - ");
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent) return;
      const tag = parent.tagName;
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"].includes(tag)) return;
      if (!node.nodeValue || !node.nodeValue.trim()) return;
      node.nodeValue = typographText(node.nodeValue);
      return;
    }
    node.childNodes.forEach(walk);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { walk(document.body); });
  } else {
    walk(document.body);
  }
})();


// ===== FINAL typography patch =====
(function () {
  function improveText(text) {
    return text
      .replace(/Мама,\s+я\s+гуляю/g, "Мама,\u00A0я гуляю")
      .replace(/([А-ЯЁа-яёA-Za-z]),\s+(я|и|а|но|как|что|это)\s+/g, "$1,\u00A0$2\u00A0")
      .replace(/(^|\s)(в|во|на|к|ко|с|со|о|об|от|до|по|за|из|у|не|ни|а|и|но|для|про|при)\s+/giu, "$1$2\u00A0")
      .replace(/№\s*(\d+)/g, "№\u00A0$1")
      .replace(/(\d+)\s+(рублей|рубля|рубль|₽|лет|года|год|минут|минуты|часов|часа|час)/giu, "$1\u00A0$2");
  }

  function walkText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"].includes(parent.tagName)) return;
      if (node.nodeValue && node.nodeValue.trim()) node.nodeValue = improveText(node.nodeValue);
      return;
    }
    node.childNodes.forEach(walkText);
  }

  function run() {
    walkText(document.body);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();


// ===== FINAL hanging particles fix =====
(function () {
  function fixHangingParticles(text) {
    return text
      // название проекта: частица "я" не должна висеть в конце строки
      .replace(/Мама,\s*я\s+гуляю/g, "Мама, я\u00A0гуляю")
      // после запятой короткое слово переносится со следующим словом: "..., и мир" -> "..., и мир"
      .replace(/,\s+(я|и|а|но|как|что|это|не|ни|в|на|к|с|о|у|за|по|от|до|из|для|про|при)\s+([А-ЯЁа-яёA-Za-z0-9])/giu, ", $1\u00A0$2")
      // короткие предлоги/частицы перед словом
      .replace(/(^|\s)(в|во|на|к|ко|с|со|о|об|от|до|по|за|из|у|не|ни|а|и|но|для|про|при)\s+([А-ЯЁа-яёA-Za-z0-9])/giu, "$1$2\u00A0$3")
      .replace(/№\s*(\d+)/g, "№\u00A0$1")
      .replace(/(\d+)\s+(рублей|рубля|рубль|₽|лет|года|год|минут|минуты|часов|часа|час)/giu, "$1\u00A0$2");
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"].includes(parent.tagName)) return;
      if (node.nodeValue && node.nodeValue.trim()) node.nodeValue = fixHangingParticles(node.nodeValue);
      return;
    }
    node.childNodes.forEach(walk);
  }

  function run() {
    walk(document.body);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
