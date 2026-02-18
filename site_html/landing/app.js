(() => {
  const content = window.LANDING_CONTENT;
  if (!content) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const dedupeView = () => {
    if (content.settings.DEDUPE_STATUS === "available") {
      return { traditional: "&mdash;", product: "<span class='ok'>✔</span>", planned: false };
    }
    if (content.settings.DEDUPE_STATUS === "not_available") {
      return { traditional: "&mdash;", product: "&mdash;", planned: false };
    }
    return {
      traditional: "&mdash;",
      product: "&mdash;",
      planned: true,
    };
  };

  const getExtension = (fileName) => {
    const base = fileName.split("/").pop() || fileName;
    const dot = base.lastIndexOf(".");
    if (dot < 0) return "";
    return base.slice(dot).toLowerCase();
  };

  const getTypeLabel = (ext) => {
    const map = {
      ".jpg": "Immagine JPEG",
      ".jpeg": "Immagine JPEG",
      ".png": "Immagine PNG",
      ".pdf": "Documento PDF",
      ".docx": "Documento Word",
      ".xlsx": "Foglio Excel",
      ".msg": "Messaggio Outlook",
    };
    return map[ext] || "File";
  };

  const getIconPath = (ext) => {
    const map = {
      ".jpg": "./img/file-icons/file-image.svg",
      ".jpeg": "./img/file-icons/file-image.svg",
      ".png": "./img/file-icons/file-image.svg",
      ".pdf": "./img/file-icons/file-pdf.svg",
      ".docx": "./img/file-icons/file-word.svg",
      ".xlsx": "./img/file-icons/file-excel.svg",
      ".msg": "./img/file-icons/file-outlook.svg",
    };

    return map[ext] || "./img/file-icons/file-generic.svg";
  };

  const folderIconPath = "./img/file-icons/folder.svg";

  const buildExplorerRows = (items) =>
    items
      .map((fullName, index) => {
        const baseName = fullName.split("/").pop() || fullName;
        const ext = getExtension(baseName);
        const type = getTypeLabel(ext);
        const day = String(10 + (index % 16)).padStart(2, "0");
        const sizeKb = 120 + baseName.length * 7 + index * 23;
        const iconPath = getIconPath(ext);
        return `
          <li class="explorer-row">
            <div class="explorer-cell name-cell">
              <img class="file-type-icon" src="${iconPath}" alt="" loading="lazy" decoding="async" />
              <code title="${escapeHtml(baseName)}">${escapeHtml(baseName)}</code>
            </div>
            <div class="explorer-cell muted-col">2025-02-${day}</div>
            <div class="explorer-cell muted-col">${escapeHtml(type)}</div>
            <div class="explorer-cell muted-col size-col">${sizeKb} KB</div>
          </li>
        `;
      })
      .join("");

  const buildAfterFolderRows = (items) => {
    const grouped = new Map();

    items.forEach((fullName) => {
      const parts = fullName.split("/").filter(Boolean);
      const fileName = parts.pop() || fullName;
      const folderPath = parts.join("/");
      if (!grouped.has(folderPath)) grouped.set(folderPath, []);
      grouped.get(folderPath).push({ fileName, fullName });
    });

    let folderIndex = 0;
    return Array.from(grouped.entries())
      .map(([folderPath, files]) => {
        const folderDisplay = folderPath || "Cartella destinazione";
        folderIndex += 1;
        const folderDay = String(10 + (folderIndex % 16)).padStart(2, "0");
        const folderSizeText = `${files.length} ${files.length === 1 ? "elemento" : "elementi"}`;

        const fileRows = files
          .map((file, fileIndex) => {
            const ext = getExtension(file.fileName);
            const type = getTypeLabel(ext);
            const day = String(10 + ((folderIndex + fileIndex + 1) % 16)).padStart(2, "0");
            const sizeKb = 120 + file.fileName.length * 7 + fileIndex * 23;
            const iconPath = getIconPath(ext);
            return `
              <li class="explorer-row explorer-row-child">
                <div class="explorer-cell name-cell">
                  <span class="row-indent" aria-hidden="true"></span>
                  <img class="file-type-icon" src="${iconPath}" alt="" loading="lazy" decoding="async" />
                  <code title="${escapeHtml(file.fileName)}">${escapeHtml(file.fileName)}</code>
                </div>
                <div class="explorer-cell muted-col">2025-02-${day}</div>
                <div class="explorer-cell muted-col">${escapeHtml(type)}</div>
                <div class="explorer-cell muted-col size-col">${sizeKb} KB</div>
              </li>
            `;
          })
          .join("");

        return `
          <li class="folder-group">
            <button class="explorer-row explorer-folder-row folder-toggle" type="button" data-folder-toggle aria-expanded="false">
              <div class="explorer-cell name-cell">
                <span class="folder-chevron" aria-hidden="true">▸</span>
                <img class="file-type-icon" src="${folderIconPath}" alt="" loading="lazy" decoding="async" />
                <code title="${escapeHtml(folderDisplay)}">${escapeHtml(folderDisplay)}</code>
              </div>
              <div class="explorer-cell muted-col">2025-02-${folderDay}</div>
              <div class="explorer-cell muted-col">Cartella</div>
              <div class="explorer-cell muted-col size-col">${folderSizeText}</div>
            </button>
            <ul class="folder-children">
              ${fileRows}
            </ul>
          </li>
        `;
      })
      .join("");
  };

  const renderNav = () => {
    const links = content.nav
      .map((item) => `<a data-route="${item.href}" href="${item.href}">${escapeHtml(item.label)}</a>`)
      .join("");

    const desktop = document.querySelector("#desktop-nav");
    const mobile = document.querySelector("#mobile-nav");

    if (desktop) desktop.innerHTML = links;
    if (mobile) {
      mobile.innerHTML = `${links}<a class="access-btn mobile-demo-btn" href="#demo" data-mobile-link>Richiedi demo</a>`;
    }
  };

  const renderHero = () => {
    const root = document.querySelector("#hero-content");
    if (!root) return;

    const hero = content.hero;

    root.innerHTML = `
      <div class="hero-layout">
        <div class="hero-copy fade-in reveal-on-scroll">
          <p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>
          <h1>${escapeHtml(hero.title)}</h1>
          <p class="lead">${escapeHtml(hero.subtitle)}</p>

          <ul class="clean-list hero-points">
            ${hero.bullets.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
          </ul>

          <div class="hero-actions">
            ${hero.ctas
              .map((cta) => `<a class="btn ${cta.variant === "solid" ? "btn-solid" : "btn-outline"}" href="${cta.href}">${escapeHtml(cta.label)}</a>`)
              .join("")}
          </div>

          <p class="muted-note">${escapeHtml(hero.microcopy)}</p>

          <div class="trust-row" aria-label="Punti di fiducia">
            ${hero.trustStrip.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}
          </div>

          <div class="hero-meta-grid" aria-label="Dettagli operativi">
            <span class="meta-pill"><strong>Modalità:</strong> ${content.settings.PREVIEW_MODE ? "Preview/confirm" : "Esecuzione diretta"}</span>
            <span class="meta-pill"><strong>Duplicati:</strong> ${
              content.settings.DEDUPE_STATUS === "planned"
                ? "In arrivo"
                : content.settings.DEDUPE_STATUS === "available"
                  ? "Disponibile"
                  : "Non disponibile"
            }</span>
            <span class="meta-pill"><strong>Ambito:</strong> File misti aziendali</span>
          </div>
        </div>

        <aside class="hero-visual fade-in reveal-on-scroll">
          <article class="card hero-process-diagram hover-lift">
            <h3>${escapeHtml(content.site.tagline)}</h3>
            <div class="hero-flow-inline">
              <span class="hero-flow-chip">Input eterogenei</span>
              <span aria-hidden="true">&rarr;</span>
              <span class="hero-flow-chip">Analisi AI</span>
              <span aria-hidden="true">&rarr;</span>
              <span class="hero-flow-chip">Output standard</span>
            </div>
            <p class="muted-note">Modalità operativa: <strong>${escapeHtml(hero.trustNote)}</strong></p>
          </article>

          <div class="kpi-grid">
            ${hero.kpis
              .map(
                (kpi) => `
              <article class="card reveal-on-scroll">
                <h3>${escapeHtml(kpi.title)}</h3>
                <p>${escapeHtml(kpi.text)}</p>
              </article>`,
              )
              .join("")}
          </div>
        </aside>
      </div>
    `;
  };

  const renderWhy = () => {
    const root = document.querySelector("#perche");
    if (!root) return;

    const section = content.why;
    root.innerHTML = `
      <div class="section-head reveal-on-scroll">
        <h2>${escapeHtml(section.title)}</h2>
        <p class="muted-note">${escapeHtml(section.intro)}</p>
      </div>

      <div class="why-main-stack">
        <article class="card reveal-on-scroll hover-lift use-case-card">
          <h3>Use case</h3>
          <ul class="clean-list">
            ${section.useCases.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>

        <article class="card reveal-on-scroll hover-lift before-after-card">
          <div class="before-after-head">
            <h3>Prima / Dopo</h3>
            <div class="before-after-controls">
              <span id="compare-state" class="badge">Stato: Prima</span>
              <button id="run-organizer-btn" class="btn btn-solid" type="button">Esegui Programma</button>
            </div>
          </div>

          <div class="folder-sim-grid">
            <div id="morph-window" class="folder-window morph-window before-window" aria-live="polite" aria-label="Simulazione organizzazione cartella">
              <div class="folder-window-top">
                <div class="window-actions">
                  <span class="folder-dot"></span>
                  <span class="folder-dot"></span>
                  <span class="folder-dot"></span>
                </div>
                <strong>Esplora file - Confronto organizzazione</strong>
              </div>
              <div class="folder-pathbar">
                <span class="path-chip">Questo PC</span>
                <span class="path-sep">›</span>
                <span class="path-chip">Cartella sorgente</span>
                <span class="path-sep">›</span>
                <span class="path-chip active">Output ordinato</span>
              </div>
              <ul class="explorer-head" aria-hidden="true">
                <li>Nome</li>
                <li>Data modifica</li>
                <li>Tipo</li>
                <li>Dimensione</li>
              </ul>
              <div id="compare-stage" class="morph-stage compare-stage">
                <div class="compare-layer layer-before">
                  <ul class="file-list explorer-list">
                    ${buildExplorerRows(section.examples.before)}
                  </ul>
                </div>
                <div class="compare-layer layer-after">
                  <ul class="file-list explorer-list after-folder-list">
                    ${buildAfterFolderRows(section.examples.after)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="grid three detail-grid" data-reveal-seq>
        <article class="card reveal-on-scroll">
          <h3>Problemi ricorrenti</h3>
          <ul class="clean-list">
            ${(section.pains || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="card reveal-on-scroll">
          <h3>Risultati attesi</h3>
          <ul class="clean-list">
            ${(section.outcomes || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="card reveal-on-scroll">
          <h3>Limiti da considerare</h3>
          <ul class="clean-list">
            ${(section.limits || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
      </div>
    `;
  };

  const renderHow = () => {
    const root = document.querySelector("#come-funziona");
    if (!root) return;

    const section = content.how;
    root.innerHTML = `
      <div class="section-head reveal-on-scroll">
        <h2>${escapeHtml(section.title)}</h2>
        <p class="muted-note">${escapeHtml(section.subtitle)}</p>
      </div>

      <div class="flow-diagram" data-reveal-seq>
        ${section.steps
          .map(
            (step, idx) => `
          <article class="card flow-node reveal-on-scroll hover-lift">
            <span class="flow-label">Step ${idx + 1}</span>
            <h3>${escapeHtml(step.title || `Fase ${idx + 1}`)}</h3>
            <p>${escapeHtml(step.detail || "")}</p>
          </article>
          ${idx < section.steps.length - 1 ? '<div class="flow-arrow reveal-on-scroll" aria-hidden="true">&darr;</div>' : ""}
        `,
          )
          .join("")}
      </div>

      <div class="how-meta-row reveal-on-scroll" aria-label="Dettagli workflow">
        <span class="how-meta-pill">Step totali: ${section.steps.length}</span>
        <span class="how-meta-pill">Pipeline: .NET + Python + OpenAI</span>
        <span class="how-meta-pill">${content.settings.PREVIEW_MODE ? "Conferma richiesta prima dell'applicazione" : "Applicazione diretta attiva"}</span>
      </div>

      <div class="content-divider reveal-on-scroll" aria-hidden="true"></div>

      <article class="card reveal-on-scroll governance-card">
        <h3>Governance operativa</h3>
        <ul class="clean-list">
          ${(section.governance || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="card callout-card reveal-on-scroll note-card">
        <h3>Privacy e costi</h3>
        <ul class="clean-list">
          ${section.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
      </article>
    `;
  };

  const renderComparison = () => {
    const root = document.querySelector("#confronto");
    if (!root) return;

    const section = content.comparison;
    const dedupe = dedupeView();

    const rows = section.rows
      .map((row) => {
        if (row.key === "dedupe") {
          return `
            <tr>
              <td>Gestione duplicati ${dedupe.planned ? "<span class='badge planned-badge'>In arrivo</span>" : ""}</td>
              <td>${dedupe.traditional}</td>
              <td>${dedupe.product}</td>
            </tr>
          `;
        }
        return `
          <tr>
            <td>${escapeHtml(row.feature)}</td>
            <td>${escapeHtml(row.traditional)}</td>
            <td>${escapeHtml(row.product)}</td>
          </tr>
        `;
      })
      .join("");

    root.innerHTML = `
      <div class="section-head reveal-on-scroll">
        <h2>${escapeHtml(section.title)}</h2>
        <p class="muted-note">${escapeHtml(section.subtitle)}</p>
      </div>

      <p class="muted-note comparison-guide reveal-on-scroll">${escapeHtml(section.readingGuide || "")}</p>

      <div class="comparison-wrap reveal-on-scroll" role="region" aria-label="Tabella confronto" tabindex="0">
        <table class="comparison-table">
          <thead>
            <tr>
              ${section.columns.map((col) => `<th>${escapeHtml(col)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  };

  const renderFaq = () => {
    const root = document.querySelector("#faq");
    if (!root) return;

    const section = content.faq;
    root.innerHTML = `
      <div class="section-head reveal-on-scroll">
        <h2>${escapeHtml(section.title)}</h2>
        <p class="muted-note">${escapeHtml(section.subtitle)}</p>
      </div>

      <div class="faq-search reveal-on-scroll">
        <label for="faq-filter">Cerca nelle FAQ</label>
        <input id="faq-filter" type="search" placeholder="costi, privacy, rollback, requisiti" autocomplete="off" />
      </div>

      <div id="faq-list" class="accordion" data-accordion></div>
      <p id="faq-empty" class="muted-note" hidden>Nessun risultato.</p>
    `;

    renderFaqItems(section.items);
  };

  const renderFaqItems = (items) => {
    const faqList = document.querySelector("#faq-list");
    if (!faqList) return;

    faqList.innerHTML = items
      .map((item, index) => {
        const panelId = `faq-panel-${index}`;
        return `
          <div class="faq-item">
            <button
              class="accordion-trigger"
              aria-expanded="false"
              aria-controls="${panelId}"
              id="faq-trigger-${index}"
            >
              ${escapeHtml(item.q)}
            </button>
            <div class="accordion-panel" id="${panelId}" role="region" aria-labelledby="faq-trigger-${index}" style="max-height:0px">
              <p>${escapeHtml(item.a)}</p>
              <div class="faq-tags">
                ${item.tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const renderPricing = () => {
    const root = document.querySelector("#prezzi");
    if (!root) return;

    const section = content.pricing;
    root.innerHTML = `
      <div class="section-head reveal-on-scroll">
        <h2>${escapeHtml(section.title)}</h2>
        <p class="muted-note">${escapeHtml(section.subtitle)}</p>
      </div>

      <article class="card reveal-on-scroll pricing-qualification">
        <p>${escapeHtml(section.qualification || "")}</p>
      </article>

      <div class="grid three" data-reveal-seq>
        ${section.plans
          .map(
            (plan) => `
          <article class="card price-card reveal-on-scroll hover-lift">
            <span class="badge">${escapeHtml(plan.label)}</span>
            <h3>${escapeHtml(plan.name)}</h3>
            <p class="price">${escapeHtml(plan.price)}</p>
            <p class="muted-note">${escapeHtml(plan.idealFor || "")}</p>
            <ul class="clean-list">
              ${plan.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
            </ul>
            <a class="btn btn-outline" href="#demo">${escapeHtml(plan.cta)}</a>
          </article>
        `,
          )
          .join("")}
      </div>
    `;
  };

  const renderDemo = () => {
    const root = document.querySelector("#demo");
    if (!root) return;

    const section = content.demo;
    root.innerHTML = `
      <div class="callout reveal-on-scroll">
        <div>
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.body)}</p>
          <ul class="clean-list demo-list">
            ${(section.includes || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
        <div class="hero-actions">
          <a class="btn btn-solid" href="${section.cta.href}">${escapeHtml(section.cta.label)}</a>
          <span class="badge">Demo in arrivo</span>
        </div>
      </div>
    `;
  };

  const renderFooter = () => {
    const root = document.querySelector("#footer-content");
    if (!root) return;

    const year = new Date().getFullYear();
    const section = content.footer;

    root.innerHTML = `
      <div class="footer-shell">
        <section class="footer-block">
          <h2>${escapeHtml(content.site.productName)}</h2>
          <p>${escapeHtml(content.site.tagline)}</p>
        </section>

        <section class="footer-block">
          <h2>Contatti</h2>
          <ul>
            <li><a href="mailto:${escapeHtml(content.site.contactEmail)}">${escapeHtml(content.site.contactEmail)}</a></li>
          </ul>
        </section>

        <section class="footer-block">
          <h2>Note</h2>
          <ul>
            ${section.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </section>

        <nav class="footer-block" aria-label="Link utili">
          <h2>Link</h2>
          <ul>
            ${section.links.map((link) => `<li><a href="${link.href}">${escapeHtml(link.label)}</a></li>`).join("")}
          </ul>
        </nav>
      </div>
      <div class="footer-bottom">&copy; ${year} ${escapeHtml(content.site.productName)}. Tutti i diritti riservati.</div>
    `;
  };

  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  };

  const setupMobileMenu = () => {
    const button = document.querySelector(".menu-toggle");
    const shell = document.querySelector(".mobile-menu-shell");
    const panel = document.querySelector(".mobile-panel");
    const backdrop = document.querySelector("[data-menu-backdrop]");

    if (!button || !shell || !panel || !backdrop) return;

    const closeMenu = () => {
      shell.classList.remove("open");
      shell.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Apri menu");
      document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
      shell.classList.add("open");
      shell.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Chiudi menu");
      document.body.classList.add("menu-open");
    };

    button.addEventListener("click", () => {
      if (shell.classList.contains("open")) closeMenu();
      else openMenu();
    });

    backdrop.addEventListener("click", closeMenu);

    document.querySelectorAll("#mobile-nav a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && shell.classList.contains("open")) closeMenu();
    });

    document.addEventListener("mousedown", (event) => {
      if (!shell.classList.contains("open")) return;
      if (!panel.contains(event.target) && !button.contains(event.target)) closeMenu();
    });
  };

  const setupAccordion = () => {
    document.querySelectorAll("[data-accordion]").forEach((container) => {
      const triggers = Array.from(container.querySelectorAll(".accordion-trigger"));
      triggers.forEach((trigger) => {
        const panel = trigger.nextElementSibling;
        if (!panel) return;

        trigger.addEventListener("click", () => {
          const isOpen = trigger.getAttribute("aria-expanded") === "true";

          triggers.forEach((item) => {
            const itemPanel = item.nextElementSibling;
            if (!itemPanel) return;
            item.setAttribute("aria-expanded", "false");
            itemPanel.style.maxHeight = "0px";
          });

          if (!isOpen) {
            trigger.setAttribute("aria-expanded", "true");
            panel.style.maxHeight = `${panel.scrollHeight}px`;
          }
        });

        trigger.addEventListener("keydown", (event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          const currentIndex = triggers.indexOf(trigger);
          const nextIndex = event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
          const targetIndex = (nextIndex + triggers.length) % triggers.length;
          triggers[targetIndex].focus();
        });
      });
    });
  };

  const setupFaqSearch = () => {
    const input = document.querySelector("#faq-filter");
    const emptyState = document.querySelector("#faq-empty");
    if (!input || !emptyState) return;

    input.addEventListener("input", () => {
      const term = input.value.trim().toLowerCase();
      const filtered = content.faq.items.filter((item) => {
        const tags = item.tags.join(" ").toLowerCase();
        return (
          item.q.toLowerCase().includes(term) ||
          item.a.toLowerCase().includes(term) ||
          tags.includes(term)
        );
      });

      renderFaqItems(filtered);
      setupAccordion();
      emptyState.hidden = filtered.length > 0;
    });
  };

  const setupReveal = () => {
    const revealItems = Array.from(document.querySelectorAll(".reveal, .reveal-on-scroll"));
    if (!revealItems.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("reveal--in"));
      return;
    }

    document.querySelectorAll("[data-reveal-seq]").forEach((container) => {
      const items = Array.from(container.querySelectorAll(".reveal, .reveal-on-scroll"));
      items.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add("reveal--in");
            target.classList.remove("reveal--out-up", "reveal--out-down");
            return;
          }

          target.classList.remove("reveal--in");
          if (entry.boundingClientRect.top < 0) {
            target.classList.add("reveal--out-up");
            target.classList.remove("reveal--out-down");
          } else {
            target.classList.add("reveal--out-down");
            target.classList.remove("reveal--out-up");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
  };

  const setupBeforeAfterDemo = () => {
    const stage = document.querySelector("#compare-stage");
    const runBtn = document.querySelector("#run-organizer-btn");
    const state = document.querySelector("#compare-state");
    if (!stage || !runBtn || !state) return;

    const applyBefore = () => {
      stage.classList.remove("is-after");
      state.textContent = "Stato: Prima";
      runBtn.textContent = "Esegui Programma";
      runBtn.setAttribute("aria-pressed", "false");
    };

    const applyAfter = () => {
      stage.classList.add("is-after");
      stage.scrollTop = 0;
      state.textContent = "Stato: Dopo";
      runBtn.textContent = "Mostra Prima";
      runBtn.setAttribute("aria-pressed", "true");
    };

    runBtn.addEventListener("click", () => {
      if (stage.classList.contains("is-after")) {
        applyBefore();
        return;
      }
      applyAfter();
    });
    applyBefore();
  };

  const setupAfterFolderToggle = () => {
    const afterList = document.querySelector(".layer-after .after-folder-list");
    if (!afterList) return;

    afterList.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-folder-toggle]");
      if (!toggle) return;

      const group = toggle.closest(".folder-group");
      if (!group) return;

      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      group.classList.toggle("is-open", !expanded);
    });
  };

  const setupHeaderScrollState = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const applyState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    applyState();
    window.addEventListener("scroll", applyState, { passive: true });
  };

  const setupActiveNav = () => {
    const links = Array.from(document.querySelectorAll(".site-nav a[data-route]"));
    if (!links.length) return;

    const header = document.querySelector(".site-header");
    const sections = content.nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute("data-route") === `#${id}`;
        link.classList.toggle("active", active);
      });
    };

    const updateFromScroll = () => {
      const headerOffset = (header ? header.offsetHeight : 74) + 18;
      const marker = window.scrollY + headerOffset;

      let currentId = sections[0].id;
      sections.forEach((section) => {
        if (marker >= section.offsetTop) currentId = section.id;
      });

      setActive(currentId);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
  };

  const boot = () => {
    renderNav();
    renderHero();
    renderWhy();
    renderHow();
    renderComparison();
    renderFaq();
    renderPricing();
    renderDemo();
    renderFooter();

    setupSmoothScroll();
    setupMobileMenu();
    setupAccordion();
    setupFaqSearch();
    setupReveal();
    setupHeaderScrollState();
    setupActiveNav();
    setupBeforeAfterDemo();
    setupAfterFolderToggle();
  };

  document.addEventListener("DOMContentLoaded", boot);
})();
