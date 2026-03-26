import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LANDING_CONTENT } from "../data/landingContent";

function getExtension(fileName) {
  const dot = fileName.lastIndexOf(".");
  if (dot < 0) return "";
  return fileName.slice(dot).toLowerCase();
}

function getTypeLabel(ext) {
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
}

function getIconPath(ext) {
  const map = {
    ".jpg": "/img/file-icons/file-image.svg",
    ".jpeg": "/img/file-icons/file-image.svg",
    ".png": "/img/file-icons/file-image.svg",
    ".pdf": "/img/file-icons/file-pdf.svg",
    ".docx": "/img/file-icons/file-word.svg",
    ".xlsx": "/img/file-icons/file-excel.svg",
    ".msg": "/img/file-icons/file-outlook.svg",
  };

  return map[ext] || "/img/file-icons/file-generic.svg";
}

function getDedupeView(status) {
  if (status === "available") {
    return { traditional: "—", product: "✔", planned: false };
  }

  if (status === "not_available") {
    return { traditional: "—", product: "—", planned: false };
  }

  return { traditional: "—", product: "—", planned: true };
}

function SmartLink({ href, className, children }) {
  if (!href) return null;
  if (href.startsWith("/")) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

function PillarIcon({ type }) {
  if (type === "see") {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="pillar-icon">
        <path d="M6 32c6.5-10.5 15.5-16 26-16s19.5 5.5 26 16c-6.5 10.5-15.5 16-26 16S12.5 42.5 6 32z" />
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="3" className="icon-fill" />
      </svg>
    );
  }

  if (type === "ask") {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="pillar-icon">
        <path d="M14 18h30a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H28l-10 8v-8H14a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z" />
        <circle cx="24" cy="32" r="2" className="icon-fill" />
        <circle cx="32" cy="32" r="2" className="icon-fill" />
        <circle cx="40" cy="32" r="2" className="icon-fill" />
      </svg>
    );
  }

  if (type === "act") {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="pillar-icon">
        <path d="M8 22a6 6 0 0 1 6-6h12l4 4h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V22z" />
        <path d="M26 30h14l6 6v12a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" />
        <path d="M40 30v8h8" />
      </svg>
    );
  }

  return null;
}

export default function HomePage() {
  const [isAfterState, setIsAfterState] = useState(false);
  const [faqFilter, setFaqFilter] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [openFolders, setOpenFolders] = useState({});
  const [activePillarIndex, setActivePillarIndex] = useState(1);
  const [activeHowIndex, setActiveHowIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState(LANDING_CONTENT.hero.title);
  const [heroCardsReady, setHeroCardsReady] = useState(false);

  const dedupe = useMemo(() => getDedupeView(LANDING_CONTENT.settings.DEDUPE_STATUS), []);
  const howSteps = useMemo(() => LANDING_CONTENT.how.steps, []);
  const pillars = useMemo(() => LANDING_CONTENT.pillars.items, []);
  const tools = useMemo(() => LANDING_CONTENT.tools.items, []);
  const toolsMarquee = useMemo(() => [...tools, ...tools, ...tools, ...tools], [tools]);
  const heroTrustStrip = useMemo(() => LANDING_CONTENT.hero.trustStrip.slice(0, 3), []);
  const totalPillars = pillars.length;
  const activePillar = pillars[activePillarIndex];
  const prevPillar = pillars[(activePillarIndex - 1 + totalPillars) % totalPillars];
  const nextPillar = pillars[(activePillarIndex + 1) % totalPillars];

  const groupedAfter = useMemo(() => {
    const grouped = new Map();

    LANDING_CONTENT.why.examples.after.forEach((fullName) => {
      const parts = fullName.split("/").filter(Boolean);
      const fileName = parts.pop() || fullName;
      const folderPath = parts.join("/") || "Cartella destinazione";

      if (!grouped.has(folderPath)) grouped.set(folderPath, []);
      grouped.get(folderPath).push(fileName);
    });

    return Array.from(grouped.entries());
  }, []);

  const filteredFaqItems = useMemo(() => {
    const term = faqFilter.trim().toLowerCase();
    if (!term) return LANDING_CONTENT.faq.items;

    return LANDING_CONTENT.faq.items.filter((item) => {
      const tags = item.tags.join(" ").toLowerCase();
      return item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term) || tags.includes(term);
    });
  }, [faqFilter]);

  const visibleFaqItems = useMemo(() => {
    if (faqFilter.trim()) return filteredFaqItems;
    if (showAllFaq) return filteredFaqItems;
    return filteredFaqItems.slice(0, 4);
  }, [faqFilter, filteredFaqItems, showAllFaq]);

  const toggleFolder = (folderPath) => {
    setOpenFolders((previous) => ({
      ...previous,
      [folderPath]: !previous[folderPath],
    }));
  };

  const featureItems = useMemo(() => {
    const kpis = LANDING_CONTENT.hero.kpis.map((kpi) => ({
      title: kpi.title,
      text: kpi.text,
    }));

    const outcomes = LANDING_CONTENT.why.outcomes.map((text, index) => ({
      title: `Risultato ${index + 1}`,
      text,
    }));

    return [...kpis, ...outcomes].slice(0, 3);
  }, []);

  useEffect(() => {
    const title = LANDING_CONTENT.hero.title;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedTitle(title);
      setHeroCardsReady(true);
      return undefined;
    }

    let index = 0;
    setTypedTitle("");
    setHeroCardsReady(false);

    const interval = window.setInterval(() => {
      index += 1;
      setTypedTitle(title.slice(0, index));
      if (index >= title.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setHeroCardsReady(true), 120);
      }
    }, 34);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return undefined;

    const updatePinnedFooter = () => {
      const rect = hero.getBoundingClientRect();
      const passed = rect.bottom <= 0;
      document.body.classList.toggle("after-hero", passed);
    };

    updatePinnedFooter();
    window.addEventListener("scroll", updatePinnedFooter, { passive: true });
    window.addEventListener("resize", updatePinnedFooter);

    return () => {
      window.removeEventListener("scroll", updatePinnedFooter);
      window.removeEventListener("resize", updatePinnedFooter);
      document.body.classList.remove("after-hero");
    };
  }, []);

  return (
    <>
      <section id="hero" className="band band-hero">
        <div className="band-inner">
          <div className="hero-layout">
            <div className="hero-copy fade-in reveal-on-scroll">
              <p className="eyebrow">{LANDING_CONTENT.hero.eyebrow}</p>
              <h1>
                <span className="typing-title" aria-label={LANDING_CONTENT.hero.title}>
                  <span aria-hidden="true">{typedTitle}</span>
                </span>
              </h1>
              <p className="lead">{LANDING_CONTENT.hero.subtitle}</p>

              <ul className="clean-list hero-points">
                {LANDING_CONTENT.hero.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="hero-actions">
                {LANDING_CONTENT.hero.ctas.map((cta) => (
                  <SmartLink key={cta.href} className={`btn ${cta.variant === "solid" ? "btn-solid" : "btn-outline"}`} href={cta.href}>
                    {cta.label}
                  </SmartLink>
                ))}
              </div>

              <p className="muted-note">{LANDING_CONTENT.hero.microcopy}</p>

              <div className="trust-row" aria-label="Punti di fiducia">
                {heroTrustStrip.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>

              <div className="hero-meta-grid" aria-label="Dettagli operativi">
                <span className="meta-pill"><strong>Modalità:</strong> {LANDING_CONTENT.settings.PREVIEW_MODE ? "Preview/confirm" : "Esecuzione diretta"}</span>
                <span className="meta-pill"><strong>Duplicati:</strong> {LANDING_CONTENT.settings.DEDUPE_STATUS === "planned" ? "In arrivo" : LANDING_CONTENT.settings.DEDUPE_STATUS === "available" ? "Disponibile" : "Non disponibile"}</span>
                <span className="meta-pill"><strong>Ambito:</strong> File misti aziendali</span>
              </div>
            </div>

            <aside className="hero-visual hero-cards">
              <article
                className={`card hero-process-diagram hover-lift hero-card${heroCardsReady ? "" : " hero-card--staged"}`}
                style={{ "--hero-delay": "0ms" }}
              >
                <h3>{LANDING_CONTENT.site.tagline}</h3>
                <div className="hero-flow-inline">
                  <span className="hero-flow-chip">Input eterogenei</span>
                  <span aria-hidden="true">&rarr;</span>
                  <span className="hero-flow-chip">Analisi AI</span>
                  <span aria-hidden="true">&rarr;</span>
                  <span className="hero-flow-chip">Output standard</span>
                </div>
                <p className="muted-note">Modalità operativa: <strong>{LANDING_CONTENT.hero.trustNote}</strong></p>
              </article>

              <div className="kpi-grid">
                {LANDING_CONTENT.hero.kpis.map((kpi, index) => (
                  <article
                    className={`card hero-card${heroCardsReady ? "" : " hero-card--staged"}`}
                    style={{ "--hero-delay": `${160 + index * 140}ms` }}
                    key={kpi.title}
                  >
                    <h3>{kpi.title}</h3>
                    <p>{kpi.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="band band-tools" aria-label="Formati supportati">
        <div className="band-inner tools-head reveal-on-scroll">
          <h2>{LANDING_CONTENT.tools.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.tools.subtitle}</p>
        </div>
        <div className="tools-frame">
          <div className="tools-carousel" role="region" aria-label="Carosello formati">
            <div className="tools-track" role="list">
              {toolsMarquee.map((item, index) => (
                <div className="tool-card" role="listitem" key={`${item.label}-${index}`}>
                  <img src={item.icon} alt="" loading="lazy" decoding="async" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="perche" className="section shell section-anchor">
        <div className="section-head reveal-on-scroll">
          <h2>{LANDING_CONTENT.why.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.why.intro}</p>
        </div>

        <div className="grid two detail-grid" data-reveal-seq>
          <article className="card reveal-on-scroll">
            <h3>Problemi ricorrenti</h3>
            <ul className="clean-list">
              {LANDING_CONTENT.why.pains.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card reveal-on-scroll">
            <h3>Risultati attesi</h3>
            <ul className="clean-list">
              {LANDING_CONTENT.why.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-alt pillars-section">
        <div className="band-inner">
          <div className="section-head reveal-on-scroll pillars-head">
            <h2>{LANDING_CONTENT.pillars.title}</h2>
            <p className="muted-note">{LANDING_CONTENT.pillars.subtitle}</p>
          </div>

          <div className="pillars-nav reveal-on-scroll" aria-label="Navigazione pilastri">
            <button
              className="pillars-arrow"
              type="button"
              aria-label="Vai al pilastro precedente"
              onClick={() => setActivePillarIndex((previous) => (previous - 1 + totalPillars) % totalPillars)}
            >
              &lt;
            </button>
            <div className="pillars-dots" role="tablist" aria-label="Seleziona pilastro">
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.key}
                  className={`pillars-dot${index === activePillarIndex ? " is-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activePillarIndex}
                  aria-label={`Vai a ${pillar.name}`}
                  onClick={() => setActivePillarIndex(index)}
                />
              ))}
            </div>
            <button
              className="pillars-arrow"
              type="button"
              aria-label="Vai al pilastro successivo"
              onClick={() => setActivePillarIndex((previous) => (previous + 1) % totalPillars)}
            >
              &gt;
            </button>
          </div>

          <div className="pillars-grid" data-reveal-seq>
            <article className="card pillar-card pillar-card--side reveal-on-scroll">
              <PillarIcon type={prevPillar.key} />
              <h3>{prevPillar.name}</h3>
              <p className="pillar-tagline">{prevPillar.tagline}</p>
              <p className="muted-note">{prevPillar.summary}</p>
              <SmartLink className="pillars-link" href={prevPillar.ctaHref}>{prevPillar.cta}</SmartLink>
            </article>

            <article className="card pillar-card pillar-card--main reveal-on-scroll" aria-live="polite">
              <PillarIcon type={activePillar.key} />
              <h3>{activePillar.name}</h3>
              <p className="pillar-tagline">{activePillar.tagline}</p>

              <div className="pillar-details">
                {activePillar.details.map((detail) => (
                  <div key={detail.title}>
                    <h4>{detail.title}</h4>
                    <p>{detail.body}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card pillar-card pillar-card--side reveal-on-scroll">
              <PillarIcon type={nextPillar.key} />
              <h3>{nextPillar.name}</h3>
              <p className="pillar-tagline">{nextPillar.tagline}</p>
              <p className="muted-note">{nextPillar.summary}</p>
              <SmartLink className="pillars-link" href={nextPillar.ctaHref}>{nextPillar.cta}</SmartLink>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head reveal-on-scroll">
          <h2>Benefici operativi</h2>
          <p className="muted-note">Valore misurabile e standard replicabile tra team.</p>
        </div>

        <div className="grid three" data-reveal-seq>
          {featureItems.map((item) => (
            <article className="card tilt-card reveal-on-scroll hover-lift" key={`feature-${item.title}`}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="band-inner">
          <div className="section-head reveal-on-scroll">
            <h2>Use case + impatto reale</h2>
            <p className="muted-note">Dalla teoria alla cartella operativa: prima e dopo.</p>
          </div>

          <div className="why-main-stack">
            <article className="card reveal-on-scroll hover-lift use-case-card">
              <h3>Use case</h3>
              <ul className="clean-list">
                {LANDING_CONTENT.why.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card reveal-on-scroll hover-lift before-after-card">
              <div className="before-after-head">
                <div className="before-after-controls">
                  <div className={`before-after-toggle${isAfterState ? " is-after" : ""}`} role="tablist" aria-label="Stato confronto prima dopo">
                    <button
                      className="before-after-toggle-option"
                      type="button"
                      role="tab"
                      aria-selected={!isAfterState}
                      aria-controls="compare-stage"
                      onClick={() => setIsAfterState(false)}
                    >
                      Prima
                    </button>
                    <button
                      className="before-after-toggle-option"
                      type="button"
                      role="tab"
                      aria-selected={isAfterState}
                      aria-controls="compare-stage"
                      onClick={() => setIsAfterState(true)}
                    >
                      Dopo
                    </button>
                  </div>
                </div>
              </div>

              <div className="folder-sim-grid">
                <div id="morph-window" className="folder-window morph-window before-window" aria-live="polite" aria-label="Simulazione organizzazione cartella">
                  <div className="folder-window-top">
                    <div className="window-actions">
                      <span className="folder-dot"></span>
                      <span className="folder-dot"></span>
                      <span className="folder-dot"></span>
                    </div>
                    <strong>Esplora file - Confronto organizzazione</strong>
                  </div>

                  <div className="folder-pathbar">
                    <span className="path-chip">Questo PC</span>
                    <span className="path-sep">&gt;</span>
                    <span className="path-chip">Cartella sorgente</span>
                    <span className="path-sep">&gt;</span>
                    <span className="path-chip active">Output ordinato</span>
                  </div>

                  <ul className="explorer-head" aria-hidden="true">
                    <li>Nome</li>
                    <li>Data modifica</li>
                    <li>Tipo</li>
                    <li>Dimensione</li>
                  </ul>

                  <div id="compare-stage" className={`morph-stage compare-stage${isAfterState ? " is-after" : ""}`}>
                    <div className="compare-layer layer-before">
                      <ul className="file-list explorer-list">
                        {LANDING_CONTENT.why.examples.before.map((fileName, index) => {
                          const ext = getExtension(fileName);
                          const type = getTypeLabel(ext);
                          const day = String(10 + (index % 16)).padStart(2, "0");
                          const sizeKb = 120 + fileName.length * 7 + index * 23;
                          const iconPath = getIconPath(ext);

                          return (
                            <li className="explorer-row" key={`before-${fileName}`}>
                              <div className="explorer-cell name-cell">
                                <img className="file-type-icon" src={iconPath} alt="" loading="lazy" decoding="async" />
                                <code title={fileName}>{fileName}</code>
                              </div>
                              <div className="explorer-cell muted-col">2025-02-{day}</div>
                              <div className="explorer-cell muted-col">{type}</div>
                              <div className="explorer-cell muted-col size-col">{sizeKb} KB</div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="compare-layer layer-after">
                      <ul className="file-list explorer-list after-folder-list">
                        {groupedAfter.map(([folderPath, files], folderIndex) => {
                          const folderDay = String(10 + ((folderIndex + 1) % 16)).padStart(2, "0");
                          const isOpen = !!openFolders[folderPath];

                          return (
                            <li className={`folder-group${isOpen ? " is-open" : ""}`} key={`folder-${folderPath}`}>
                              <button className="explorer-row explorer-folder-row folder-toggle" type="button" data-folder-toggle aria-expanded={isOpen} onClick={() => toggleFolder(folderPath)}>
                                <div className="explorer-cell name-cell">
                                  <span className="folder-chevron" aria-hidden="true">▸</span>
                                  <img className="file-type-icon" src="/img/file-icons/folder.svg" alt="" loading="lazy" decoding="async" />
                                  <code title={folderPath}>{folderPath}</code>
                                </div>
                                <div className="explorer-cell muted-col">2025-02-{folderDay}</div>
                                <div className="explorer-cell muted-col">Cartella</div>
                                <div className="explorer-cell muted-col size-col">{files.length} {files.length === 1 ? "elemento" : "elementi"}</div>
                              </button>

                              <ul className="folder-children">
                                {files.map((fileName, fileIndex) => {
                                  const ext = getExtension(fileName);
                                  const type = getTypeLabel(ext);
                                  const day = String(10 + ((folderIndex + fileIndex + 2) % 16)).padStart(2, "0");
                                  const sizeKb = 120 + fileName.length * 7 + fileIndex * 23;
                                  const iconPath = getIconPath(ext);

                                  return (
                                    <li className="explorer-row explorer-row-child" key={`after-${folderPath}-${fileName}`}>
                                      <div className="explorer-cell name-cell">
                                        <span className="row-indent" aria-hidden="true"></span>
                                        <img className="file-type-icon" src={iconPath} alt="" loading="lazy" decoding="async" />
                                        <code title={fileName}>{fileName}</code>
                                      </div>
                                      <div className="explorer-cell muted-col">2025-02-{day}</div>
                                      <div className="explorer-cell muted-col">{type}</div>
                                      <div className="explorer-cell muted-col size-col">{sizeKb} KB</div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="come-funziona" className="section shell section-divider section-anchor">
        <div className="section-head reveal-on-scroll">
          <h2>{LANDING_CONTENT.how.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.how.subtitle}</p>
        </div>

        <div className="how-interactive" data-reveal-seq>
          <div className="how-rail">
            <div className="how-rail-line" aria-hidden="true"></div>
            <ol className="how-stepper" role="tablist" aria-label="Step del processo">
              {howSteps.map((step, index) => (
                <li key={step.title}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={index === activeHowIndex}
                    aria-controls={`how-panel-${index}`}
                    className={`how-step${index === activeHowIndex ? " is-active" : ""}`}
                    onClick={() => setActiveHowIndex(index)}
                    onMouseEnter={() => setActiveHowIndex(index)}
                  >
                    <span className="how-step-dot" aria-hidden="true"></span>
                    <span className="how-step-index">STEP {index + 1}</span>
                    <span className="how-step-title">{step.title}</span>
                    <span className="how-step-detail">{step.detail}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <article
            className="card how-panel"
            id={`how-panel-${activeHowIndex}`}
            role="tabpanel"
            aria-live="polite"
          >
            <div className="how-panel-top">
              <span className="badge">Step {activeHowIndex + 1}</span>
              <div className="how-pulse" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <h3>{howSteps[activeHowIndex]?.title}</h3>
            <p>{howSteps[activeHowIndex]?.longDetail ?? howSteps[activeHowIndex]?.detail}</p>

            <div className="how-panel-actions">
              <button
                type="button"
                className="btn btn-outline"
                disabled={activeHowIndex === 0}
                onClick={() => setActiveHowIndex((previous) => Math.max(0, previous - 1))}
              >
                Step precedente
              </button>
              <button
                type="button"
                className="btn btn-solid"
                disabled={activeHowIndex === howSteps.length - 1}
                onClick={() => setActiveHowIndex((previous) => Math.min(howSteps.length - 1, previous + 1))}
              >
                Step successivo
              </button>
            </div>
          </article>
        </div>

        <div className="how-meta-row reveal-on-scroll" aria-label="Dettagli workflow">
          <span className="how-meta-pill">Step totali: {howSteps.length}</span>
          <span className="how-meta-pill">Pipeline: .NET + Python + OpenAI</span>
          <span className="how-meta-pill">{LANDING_CONTENT.settings.PREVIEW_MODE ? "Conferma richiesta prima dell'applicazione" : "Applicazione diretta attiva"}</span>
        </div>

        <div className="content-divider reveal-on-scroll" aria-hidden="true"></div>

        <article className="card reveal-on-scroll governance-card">
          <h3>Governance operativa</h3>
          <ul className="clean-list">
            {LANDING_CONTENT.how.governance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card callout-card reveal-on-scroll note-card">
          <h3>Privacy e costi</h3>
          <ul className="clean-list">
            {LANDING_CONTENT.how.notes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <div className="compact-details reveal-on-scroll">
          <div className="compact-details-title">Limiti e prerequisiti</div>
          <div className="details-body">
            <div className="grid three">
              <article className="card">
                <h3>Limiti da considerare</h3>
                <ul className="clean-list">
                  {LANDING_CONTENT.why.limits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="card">
                <h3>Governance essenziale</h3>
                <ul className="clean-list">
                  {LANDING_CONTENT.how.governance.slice(0, 3).map((item) => (
                    <li key={`gov-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="card">
                <h3>Privacy e controlli</h3>
                <ul className="clean-list">
                  {LANDING_CONTENT.how.notes.slice(0, 3).map((item) => (
                    <li key={`note-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="confronto" className="section shell section-anchor">
        <div className="section-head reveal-on-scroll">
          <h2>{LANDING_CONTENT.comparison.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.comparison.subtitle}</p>
        </div>

        <div className="compact-details reveal-on-scroll">
          <div className="compact-details-title">Confronto completo</div>
          <div className="details-body">
            <p className="muted-note comparison-guide">{LANDING_CONTENT.comparison.readingGuide}</p>
            <div className="comparison-wrap" role="region" aria-label="Tabella confronto" tabIndex="0">
              <table className="comparison-table">
                <thead>
                  <tr>
                    {LANDING_CONTENT.comparison.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LANDING_CONTENT.comparison.rows.map((row) => {
                    if (row.key === "dedupe") {
                      return (
                        <tr key={row.feature}>
                          <td>Gestione duplicati {dedupe.planned ? <span className="badge planned-badge">In arrivo</span> : null}</td>
                          <td>{dedupe.traditional}</td>
                          <td>{dedupe.product === "✔" ? <span className="ok">✔</span> : dedupe.product}</td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={row.feature}>
                        <td>{row.feature}</td>
                        <td>{row.traditional}</td>
                        <td>{row.product}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section shell section-anchor">
        <div className="section-head reveal-on-scroll">
          <h2>{LANDING_CONTENT.faq.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.faq.subtitle}</p>
        </div>

        <div className="faq-search reveal-on-scroll">
          <label htmlFor="faq-filter">Cerca nelle FAQ</label>
          <input
            id="faq-filter"
            type="search"
            placeholder="costi, privacy, rollback, requisiti"
            autoComplete="off"
            value={faqFilter}
            onChange={(event) => {
              const value = event.target.value;
              setFaqFilter(value);
              setOpenFaqIndex(-1);
              if (!value.trim()) setShowAllFaq(false);
            }}
          />
        </div>

        <div id="faq-list" className="accordion" data-accordion>
          {visibleFaqItems.map((item, index) => {
            const panelId = `faq-panel-${index}`;
            const isOpen = openFaqIndex === index;

            return (
              <div className="faq-item" key={item.q}>
                <button
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={`faq-trigger-${index}`}
                  onClick={() => setOpenFaqIndex((previous) => (previous === index ? -1 : index))}
                >
                  {item.q}
                </button>
                <div
                  className="accordion-panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  style={{ maxHeight: isOpen ? "999px" : "0px" }}
                >
                  <p>{item.a}</p>
                  <div className="faq-tags">
                    {item.tags.map((tag) => (
                      <span className="chip" key={`${item.q}-${tag}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!filteredFaqItems.length ? <p id="faq-empty" className="muted-note">Nessun risultato.</p> : null}

        {!faqFilter.trim() && filteredFaqItems.length > 4 ? (
          <div className="faq-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowAllFaq((previous) => !previous)}
            >
              {showAllFaq ? "Mostra meno" : "Mostra tutte le FAQ"}
            </button>
          </div>
        ) : null}
      </section>

    </>
  );
}
