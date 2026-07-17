import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const site = "https://mamayagulyayu.ru";

const issues = [
  { number: "006", date: "2026-06-03", humanDate: "3 июня 2026", title: "Скука как ресурс", description: "Винни-Пух, скука, воображение, японская «ма», Тоторо, двенадцать игр и коробка скуки." },
  { number: "005", date: "2026-05-26", humanDate: "26 мая 2026", title: "Бабушки и дедушки на лето", description: "Отношения трёх поколений, правила, разговоры перед поездкой, бабушкин двор и сложные семейные сценарии." },
  { number: "004", date: "2026-05-19", humanDate: "19 мая 2026", title: "Детские смартфоны до лета", description: "Хайдт, критики, законы, семейные правила, разговор без допроса и чем заменить экран во дворе." },
  { number: "003", date: "2026-05-12", humanDate: "12 мая 2026", title: "Сезон закончился", description: "Межсезонье, сборы, пауза без чувства вины и бонусный раздел для родителей фигуристов." },
  { number: "002", date: "2026-05-08", humanDate: "8 мая 2026", title: "Второй майский", description: "Паустовский, Садако, фотоальбом, сирень, птицы, Бонифаций и плед на дачу." },
  { number: "001", date: "2026-05-01", humanDate: "1 мая 2026", title: "Первый майский", description: "Денискины рассказы, фланёрство, свободное время, Миядзаки и детский термос." },
  { number: "000", date: "2026-04-21", humanDate: "21 апреля 2026", title: "Болеем дома, и это нормально", description: "Винни-Пух, экран без вины, аудиосказки, «Ёжик в тумане» и театр теней." }
];

const materials = [
  {
    slug: "winnie-pooh-and-boredom",
    issue: "2026-06-03",
    anchor: "book",
    title: "Как детская скука подарила миру Винни-Пуха",
    description: "История Кристофера Робина, Милна и скуки, из которой выросла одна из главных детских книг XX века.",
    topics: ["books", "parents", "summer"],
    image: "/digests/2026-06-03/images/winnie-pooh-shepard-1926.png"
  },
  {
    slug: "what-to-do-when-bored",
    issue: "2026-06-03",
    anchor: "talk",
    title: "Как поговорить с ребёнком о скуке",
    description: "Вопросы для детей от четырёх до десяти лет, которые помогают услышать ребёнка и не бросаться его развлекать.",
    topics: ["talk", "parents", "summer"],
    image: "/digests/2026-06-03/images/summer-boredom-games.jpg"
  },
  {
    slug: "twelve-boredom-games",
    issue: "2026-06-03",
    anchor: "games",
    title: "12 игр, которые рождаются из детской скуки",
    description: "Игры с облаками, звуками, камнями, лужами и другими вещами, которые уже есть во дворе или на даче.",
    topics: ["games", "summer"],
    image: "/digests/2026-06-03/images/summer-boredom-games.jpg"
  },
  {
    slug: "japanese-ma-miyazaki",
    issue: "2026-06-03",
    anchor: "ma",
    title: "Японская «ма»: зачем детям и взрослым нужна пустота",
    description: "Пауза между событиями, сцены тишины у Миядзаки и связь японской «ма» с детской скукой.",
    topics: ["watch", "parents"],
    image: "/digests/2026-06-03/images/miyazaki-portrait.jpg"
  },
  {
    slug: "boredom-box",
    issue: "2026-06-03",
    anchor: "box",
    title: "Коробка скуки: материалы для самостоятельной игры",
    description: "Что положить в простую домашнюю коробку, из которой ребёнок сможет придумать игру сам.",
    topics: ["craft", "parents", "summer"],
    image: "/digests/2026-06-03/images/boredom-box-workbox.jpg"
  },
  {
    slug: "family-screen-conversation",
    issue: "2026-05-19",
    anchor: "talk",
    title: "Как поговорить с ребёнком о том, что он смотрит",
    description: "Разговор про видео, ленты и алгоритмы без допроса, проверки истории и полицейского тона.",
    topics: ["talk", "screens", "parents"],
    image: "/assets/issue-004-control.jpg"
  },
  {
    slug: "replace-screen-time",
    issue: "2026-05-19",
    anchor: "outdoor",
    title: "Чем заменить экранное время летом",
    description: "Игры и улица как настоящая альтернатива телефону, а не наказание за экран.",
    topics: ["games", "screens", "summer"],
    image: "/assets/issue-004-outdoor.jpg"
  },
  {
    slug: "grandmother-conflicts",
    issue: "2026-05-26",
    anchor: "conflicts",
    title: "Три типа конфликтов с бабушкой",
    description: "Как различать конфликты правил, ценностей и безопасности перед летней поездкой ребёнка.",
    topics: ["parents", "talk", "grandparents"],
    image: "/digests/2026-05-26/images/family-generations.jpg"
  },
  {
    slug: "grandmother-yard",
    issue: "2026-05-26",
    anchor: "yard",
    title: "Бабушкин двор и свободная детская игра",
    description: "Почему ребёнку полезны двор, свободная игра и взрослый, который просто находится рядом.",
    topics: ["games", "summer", "grandparents"],
    image: "/digests/2026-05-26/images/children-playing-yard.jpg"
  }
];

const topics = [
  { slug: "games", icon: "🌳", title: "Игры с детьми", seoTitle: "Игры с детьми на улице и дома", description: "Игры для двора, парка, дачи и дома: простые идеи без подготовки, покупок и сложного реквизита.", keywords: "игры с детьми, игры на улице, игры во дворе, чем занять ребёнка" },
  { slug: "books", icon: "📚", title: "Что почитать", seoTitle: "Что почитать детям и родителям", description: "Детские книги, книги для подростков и спокойное чтение для родителей из выпусков «Мама, я гуляю».", keywords: "что почитать ребёнку, детские книги, книги для родителей" },
  { slug: "talk", icon: "💬", title: "Поводы поговорить", seoTitle: "Как разговаривать с ребёнком", description: "Вопросы и темы для разговора с ребёнком без допроса, морализаторства и готовых правильных ответов.", keywords: "как разговаривать с ребёнком, вопросы детям, семейный разговор" },
  { slug: "watch", icon: "👀", title: "Что посмотреть", seoTitle: "Что посмотреть с ребёнком", description: "Мультфильмы, фильмы и короткие видео для семейного просмотра без экранного марафона.", keywords: "что посмотреть с ребёнком, семейные фильмы, мультфильмы детям" },
  { slug: "craft", icon: "✂️", title: "Сделать руками", seoTitle: "Что сделать с ребёнком своими руками", description: "Простые домашние занятия, бумага, тени и материалы для игры без сложной подготовки.", keywords: "поделки с детьми, что сделать с ребёнком, занятия дома" },
  { slug: "parents", icon: "🧠", title: "Родителям", seoTitle: "Материалы для родителей", description: "Экраны, границы, детский спорт, скука и семейные договорённости без родительского героизма.", keywords: "советы родителям, дети и смартфоны, семейные правила" },
  { slug: "screens", icon: "📱", title: "Дети и экраны", seoTitle: "Дети, смартфоны и экранное время", description: "Как договариваться об экранах, обсуждать контент и находить живые альтернативы смартфону.", keywords: "дети и смартфоны, экранное время, родительский контроль" },
  { slug: "summer", icon: "☀️", title: "Лето с детьми", seoTitle: "Чем заняться с детьми летом", description: "Игры во дворе, дача, прогулки, скука и спокойные семейные идеи для летних каникул.", keywords: "чем занять ребёнка летом, игры на даче, летние каникулы с детьми" }
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function write(relativePath, content) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function header(relativeRoot) {
  return `
  <div class="promo">Слойка помогает понять, как одеть ребёнка по погоде. <a href="https://t.me/sloika_ibot" target="_blank" rel="noopener noreferrer">Открыть бота →</a></div>
  <header class="header">
    <div class="header-inner">
      <a href="${relativeRoot}" class="logo"><img src="${relativeRoot}assets/mama-logo-rope.png" alt="Мама, я гуляю" class="logo-mark-img" loading="lazy" decoding="async" width="34" height="34">Мама, я&nbsp;гуляю</a>
      <button class="burger-toggle" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="nav">
        <a href="${relativeRoot}">Главная</a>
        <a href="${relativeRoot}materials/">Подборки</a>
        <a href="${relativeRoot}digests/">Архив</a>
        <a href="${relativeRoot}about/">О проекте</a>
        <a href="https://t.me/sloika_ibot" target="_blank" rel="noopener noreferrer">Telegram</a>
      </nav>
    </div>
  </header>`;
}

function footer(relativeRoot) {
  return `
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-main">
        <p class="footer-title">Мама, я&nbsp;гуляю</p>
        <p>Дайджесты для родителей: книги, игры с детьми, семейные разговоры, фильмы и идеи для прогулок.</p>
      </div>
      <nav class="footer-links" aria-label="Ссылки в подвале">
        <a href="${relativeRoot}">Главная</a><a href="${relativeRoot}materials/">Подборки</a><a href="${relativeRoot}digests/">Архив</a><a href="${relativeRoot}about/">О проекте</a><a href="${relativeRoot}rss.xml">RSS</a>
      </nav>
    </div>
  </footer>
  <script src="${relativeRoot}script.js" defer></script>`;
}

function breadcrumbJson(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site}${item.path}`
    }))
  };
}

function pageHead({ title, description, canonical, image, schema, relativeRoot, type = "website" }) {
  const fullTitle = `${title}. Мама, я гуляю`;
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${site}${canonical}">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Мама, я гуляю">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${site}${canonical}">
  <meta property="og:image" content="${site}${image}">
  <meta property="og:locale" content="ru_RU">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${site}${image}">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schema })}</script>
  <link rel="stylesheet" href="${relativeRoot}style.css?v=20260717-seo">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/favicon.png">
  <link rel="alternate" type="application/rss+xml" title="Мама, я гуляю" href="${site}/rss.xml">
</head>`;
}

function extractArticle(issue, anchor) {
  const file = path.join(root, "digests", issue, "index.html");
  const html = fs.readFileSync(file, "utf8");
  const marker = `id="${anchor}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Не найден блок ${issue}#${anchor}`);
  const start = html.lastIndexOf("<article", markerIndex);
  const end = html.indexOf("</article>", markerIndex);
  if (start < 0 || end < 0) throw new Error(`Не удалось извлечь блок ${issue}#${anchor}`);
  return html
    .slice(start, end + "</article>".length)
    .replace(/src="images\//g, `src="/digests/${issue}/images/`)
    .replace(/href="images\//g, `href="/digests/${issue}/images/`)
    .replace(/id="[^"]+"/, "")
    .replace(/<h2>([\s\S]*?)<\/h2>/, "<h1>$1</h1>");
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function readMaterialIndex() {
  const html = fs.readFileSync(path.join(root, "materials", "index.html"), "utf8");
  return [...html.matchAll(/<a class="material-card" href="([^"]+)" data-topics="([^"]+)">([\s\S]*?)<\/a>/g)].map((match) => {
    const title = stripHtml(match[3].match(/<strong>([\s\S]*?)<\/strong>/)?.[1] || "");
    const spans = [...match[3].matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)];
    const description = stripHtml(spans.at(-1)?.[1] || "");
    const href = match[1].startsWith("../") ? `../../${match[1].slice(3)}` : `../${match[1]}`;
    const standalone = materials.find((material) => match[1] === `${material.slug}/`);
    return {
      href,
      absoluteUrl: match[1].startsWith("../")
        ? `${site}/${match[1].slice(3)}`
        : `${site}/materials/${match[1]}`,
      topics: match[2].split(/\s+/),
      title,
      description,
      image: standalone?.image
    };
  });
}

function materialCards(items, relativeRoot) {
  return items.map((material) => `
    <a class="material-card material-card-rich" href="${relativeRoot}materials/${material.slug}/">
      <img src="${material.image}" alt="" loading="lazy" decoding="async" width="640" height="400">
      <span class="material-meta">${material.topics.map((topic) => topics.find((item) => item.slug === topic)?.title).filter(Boolean).join(" · ")}</span>
      <strong>${material.title}</strong>
      <span>${material.description}</span>
    </a>`).join("");
}

function collectionCards(items) {
  return items.map((item) => item.image ? `
    <a class="material-card material-card-rich" href="${item.href}">
      <img src="${item.image}" alt="" loading="lazy" decoding="async" width="640" height="400">
      <span class="material-meta">Из подборки</span>
      <strong>${item.title}</strong>
      <span>${item.description}</span>
    </a>` : `
    <a class="material-card" href="${item.href}">
      <span class="material-meta">Из дайджеста</span>
      <strong>${item.title}</strong>
      <span>${item.description}</span>
    </a>`).join("");
}

for (const material of materials) {
  const canonical = `/materials/${material.slug}/`;
  const source = `/digests/${material.issue}/#${material.anchor}`;
  const schema = [
    {
      "@type": "Article",
      "@id": `${site}${canonical}#article`,
      headline: material.title,
      description: material.description,
      image: `${site}${material.image}`,
      mainEntityOfPage: `${site}${canonical}`,
      isPartOf: { "@id": `${site}/#website` },
      author: { "@type": "Person", name: "Михаил Проскурин", url: "https://proskurin.online/proskurin-mikhail" },
      publisher: { "@type": "Organization", name: "Мама, я гуляю", url: `${site}/` },
      inLanguage: "ru-RU"
    },
    breadcrumbJson([
      { name: "Главная", path: "/" },
      { name: "Материалы", path: "/materials/" },
      { name: material.title, path: canonical }
    ])
  ];
  const article = extractArticle(material.issue, material.anchor);
  write(`materials/${material.slug}/index.html`, `<!doctype html>
<html lang="ru">
${pageHead({ title: material.title, description: material.description, canonical, image: material.image, schema, relativeRoot: "../../", type: "article" })}
<body class="standalone-material-page" id="top">
${header("../../")}
<main>
  <div class="container"><nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="../../">Главная</a><span>/</span><a href="../">Материалы</a><span>/</span><span aria-current="page">${material.title}</span></nav></div>
  <section class="standalone-material">
    <div class="container standalone-material-layout">
      ${article}
      <aside class="source-issue-card">
        <div class="kicker">Из дайджеста</div>
        <p>Материал впервые опубликован в выпуске №${issues.find((item) => item.date === material.issue)?.number}.</p>
        <a class="btn" href="${source}">Открыть весь выпуск</a>
      </aside>
    </div>
  </section>
</main>
${footer("../../")}
</body>
</html>
`);
}

const indexedCards = readMaterialIndex();

for (const topic of topics) {
  const selected = indexedCards.filter((material) => material.topics.includes(topic.slug));
  const canonical = `/materials/${topic.slug}/`;
  const itemList = selected.map((material, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: material.absoluteUrl,
    name: material.title
  }));
  const schema = [
    {
      "@type": "CollectionPage",
      "@id": `${site}${canonical}#collection`,
      url: `${site}${canonical}`,
      name: topic.seoTitle,
      description: topic.description,
      keywords: topic.keywords,
      inLanguage: "ru-RU",
      mainEntity: { "@type": "ItemList", numberOfItems: selected.length, itemListElement: itemList },
      isPartOf: { "@id": `${site}/#website` }
    },
    breadcrumbJson([
      { name: "Главная", path: "/" },
      { name: "Материалы", path: "/materials/" },
      { name: topic.title, path: canonical }
    ])
  ];
  write(`materials/${topic.slug}/index.html`, `<!doctype html>
<html lang="ru">
${pageHead({ title: topic.seoTitle, description: topic.description, canonical, image: selected.find((item) => item.image)?.image || "/assets/og-cover.jpg", schema, relativeRoot: "../../" })}
<body class="topic-landing-page" id="top">
${header("../../")}
<main>
  <div class="container"><nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="../../">Главная</a><span>/</span><a href="../">Материалы</a><span>/</span><span aria-current="page">${topic.title}</span></nav></div>
  <section class="collection-hero">
    <div class="container">
      <div class="kicker">${topic.icon} Тематическая подборка</div>
      <h1>${topic.seoTitle}</h1>
      <p>${topic.description}</p>
    </div>
  </section>
  <section class="collection-results">
    <div class="container">
      <div class="materials-grid">${collectionCards(selected)}</div>
      <div class="collection-more"><a class="btn" href="../?topic=${topic.slug}">Все материалы этой темы</a><a class="btn" href="../">Все подборки</a></div>
    </div>
  </section>
</main>
${footer("../../")}
</body>
</html>
`);
}

const archiveCanonical = "/digests/";
const archiveSchema = [
  {
    "@type": "CollectionPage",
    "@id": `${site}/digests/#collection`,
    url: `${site}/digests/`,
    name: "Архив дайджестов «Мама, я гуляю»",
    description: "Все выпуски дайджеста для родителей «Мама, я гуляю».",
    inLanguage: "ru-RU",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: issues.length,
      itemListElement: issues.map((issue, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${site}/digests/${issue.date}/`,
        name: `Выпуск №${issue.number}. ${issue.title}`
      }))
    },
    isPartOf: { "@id": `${site}/#website` }
  },
  breadcrumbJson([
    { name: "Главная", path: "/" },
    { name: "Архив", path: archiveCanonical }
  ])
];

write("digests/index.html", `<!doctype html>
<html lang="ru">
${pageHead({
  title: "Архив дайджестов для родителей",
  description: "Все выпуски «Мама, я гуляю»: книги, игры с детьми, семейные разговоры, фильмы, прогулки и спокойные идеи для выходных.",
  canonical: archiveCanonical,
  image: "/digests/2026-06-03/images/winnie-pooh-shepard-cover.jpg",
  schema: archiveSchema,
  relativeRoot: "../"
})}
<body class="digest-archive-page" id="top">
${header("../")}
<main>
  <div class="container"><nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="../">Главная</a><span>/</span><span aria-current="page">Архив</span></nav></div>
  <section class="collection-hero">
    <div class="container">
      <div class="kicker">Все выпуски</div>
      <h1>Архив дайджестов для родителей</h1>
      <p>Книги, игры с детьми, семейные разговоры, фильмы и идеи для прогулок. Можно читать по порядку или открыть выпуск под настроение.</p>
    </div>
  </section>
  <section class="archive-page-list">
    <div class="container archive-list">
      ${issues.map((issue) => `<a class="archive-row" href="${issue.date}/"><span class="archive-row-number">№${issue.number}</span><span class="archive-row-main"><strong>${issue.title}</strong><span>${issue.description}</span></span><span class="archive-row-date">${issue.humanDate}</span></a>`).join("\n")}
    </div>
  </section>
</main>
${footer("../")}
</body>
</html>
`);

const sitemapEntries = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about/", priority: "0.6", changefreq: "monthly" },
  { path: "/materials/", priority: "0.9", changefreq: "weekly" },
  { path: "/digests/", priority: "0.8", changefreq: "weekly" },
  ...topics.map((topic) => ({ path: `/materials/${topic.slug}/`, priority: "0.8", changefreq: "weekly" })),
  ...materials.map((material) => ({ path: `/materials/${material.slug}/`, priority: "0.8", changefreq: "monthly" })),
  ...issues.map((issue) => ({ path: `/digests/${issue.date}/`, priority: "0.9", changefreq: "monthly", lastmod: issue.date }))
];

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `  <url>
    <loc>${site}${entry.path}</loc>
    <lastmod>${entry.lastmod || "2026-07-17"}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join("\n")}
</urlset>
`);

console.log(`Собрано: ${topics.length} тематических страниц, ${materials.length} материалов и архив.`);
