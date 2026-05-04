# SEO-правки

Сделано по брифу:

## P0
- Добавлены `robots.txt` и `sitemap.xml` в корень.
- Добавлен `vercel.json` с 301 редиректом с `mama-ja-guljau.vercel.app` на `https://mamayagulyayu.ru`.
- Исправлены share-ссылки: убран хардкод Vercel-домена, добавлен динамический canonical share URL.
- Исправлен title главной.

## P1
- Добавлены метатеги главной: title, description, canonical, OG, Twitter, robots/yandex.
- Добавлен JSON-LD главной: WebSite + Organization.
- Добавлены метатеги страницы выпуска: title, description, canonical, OG Article, Twitter, article time/author.
- Добавлен JSON-LD выпуска: Article + BreadcrumbList.
- Сгенерирован `/assets/og-cover.jpg` 1200x630 из hero-изображения.
- Прописаны alt-тексты для ключевых изображений.
- Лейбл `Тестовый выпуск` заменён на `Дайджест для родителей. Выпуск №001`.
- Неразрешённый loading-счётчик скрывается, чтобы многоточие не попадало в сниппеты.

## Что нужно сделать после выкатки
- Подтвердить `mamayagulyayu.ru` в Я.Вебмастере и Google Search Console.
- Отправить `https://mamayagulyayu.ru/sitemap.xml` в обе панели.
- Прогнать главную и выпуск через Rich Results Test и валидатор Я.Вебмастера.
