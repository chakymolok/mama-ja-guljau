// ===== filters =====
    const filterState = { cats: new Set(), ages: new Set(), sits: new Set() };
    const issues = document.querySelectorAll('.issue');
    const chips = document.querySelectorAll('.chip[data-filter]');
    const resetBtn = document.querySelector('.filters-reset');
    const emptyState = document.querySelector('.empty-state');

    function computeCounts() {
      chips.forEach(chip => {
        const group = chip.dataset.group;
        const value = chip.dataset.filter;
        const attr = `data-${group}`;
        let count = 0;
        issues.forEach(issue => {
          const values = (issue.getAttribute(attr) || '').split(' ').filter(Boolean);
          if (values.includes(value)) count++;
        });
        const countEl = chip.querySelector('.count');
        if (countEl) countEl.textContent = count;
        chip.classList.toggle('is-empty', count === 0);
      });
    }

    function applyFilters() {
      let visibleCount = 0;
      issues.forEach(issue => {
        const cats = (issue.getAttribute('data-cats') || '').split(' ').filter(Boolean);
        const ages = (issue.getAttribute('data-ages') || '').split(' ').filter(Boolean);
        const sits = (issue.getAttribute('data-sits') || '').split(' ').filter(Boolean);

        const matchCats = filterState.cats.size === 0 || [...filterState.cats].some(v => cats.includes(v));
        const matchAges = filterState.ages.size === 0 || [...filterState.ages].some(v => ages.includes(v));
        const matchSits = filterState.sits.size === 0 || [...filterState.sits].some(v => sits.includes(v));

        const visible = matchCats && matchAges && matchSits;
        issue.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });

      emptyState.hidden = visibleCount > 0;

      const anyActive = Object.values(filterState).some(set => set.size > 0);
      resetBtn.hidden = !anyActive;
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (chip.classList.contains('is-empty')) return;
        const group = chip.dataset.group;
        const value = chip.dataset.filter;
        if (filterState[group].has(value)) {
          filterState[group].delete(value);
          chip.classList.remove('active');
        } else {
          filterState[group].add(value);
          chip.classList.add('active');
        }
        applyFilters();
      });
    });

    resetBtn.addEventListener('click', () => {
      Object.values(filterState).forEach(set => set.clear());
      document.querySelectorAll('.chip.active').forEach(c => c.classList.remove('active'));
      applyFilters();
    });

    computeCounts();
    applyFilters();

    // ===== sidebar toggle (mobile) =====
    const sidebar = document.getElementById('filters');
    const sidebarToggle = sidebar.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      sidebarToggle.setAttribute('aria-expanded', String(open));
    });

    // ===== random idea =====
    const ideas = [
      { title: "Найти 5 круглых предметов", text: "Попросите ребёнка найти вокруг 5 круглых предметов: колесо, люк, мяч, пуговицу, тарелку в витрине.", marks: ["3–6 лет", "улица", "10 минут", "сил мало"] },
      { title: "Охота на шуршание", text: "Ищем всё, что шуршит: листья, пакет, бумажку, сухую траву. Главное — не превращать это в уборку района.", marks: ["2–5 лет", "улица", "без подготовки"] },
      { title: "Цвет дня", text: "Выберите цвет и ищите его по дороге: красная машина, зелёная дверь, жёлтый знак.", marks: ["2–7 лет", "дорога", "5 минут"] },
      { title: "Тихий детектив", text: "Идём 3 минуты молча и потом называем, кто что услышал: собаку, машину, птицу, шаги, ветер.", marks: ["4–7 лет", "улица", "спокойно"] },
      { title: "Магазинная миссия", text: "По дороге в магазин ребёнок отвечает за одну категорию: найти молоко, выбрать яблоки или посчитать три пачки макарон.", marks: ["3–7 лет", "магазин", "бытовое"] },
      { title: "Облако похоже на...", text: "Смотрим на облака и придумываем, на кого они похожи. Побеждает версия, от которой взрослый засмеялся.", marks: ["3–7 лет", "улица", "без реквизита"] }
    ];

    const randomBtn = document.getElementById("random-btn");
    const ideaBox = document.getElementById("idea-box");
    const ideaTitle = document.getElementById("idea-title");
    const ideaText = document.getElementById("idea-text");
    const ideaMarks = document.getElementById("idea-marks");
    let lastIdeaIndex = -1;

    randomBtn.addEventListener("click", () => {
      let i = Math.floor(Math.random() * ideas.length);
      if (ideas.length > 1 && i === lastIdeaIndex) i = (i + 1) % ideas.length;
      lastIdeaIndex = i;
      const idea = ideas[i];
      ideaTitle.textContent = idea.title;
      ideaText.textContent = idea.text;
      ideaMarks.innerHTML = "";
      idea.marks.forEach(m => {
        const span = document.createElement("span");
        span.className = "mark";
        span.textContent = m;
        ideaMarks.appendChild(span);
      });
      ideaBox.classList.remove("hidden");
      randomBtn.textContent = "Дать ещё одну";
    });
