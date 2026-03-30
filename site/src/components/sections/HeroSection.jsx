/**
 * HeroSection — sezione principale in cima alla homepage.
 *
 * Contiene:
 *  - Eyebrow (sopratitolo), titolo con effetto "macchina da scrivere", sottotitolo
 *  - Lista dei punti chiave del prodotto
 *  - Pulsanti CTA (Call To Action)
 *  - Barra di fiducia (chip con valori del prodotto)
 *  - Griglia di meta-informazioni (modalità, duplicati, ambito)
 *  - Pannello visivo destra: diagramma di flusso + KPI cards
 *
 * Props ricevute:
 *  - typedTitle      — testo del titolo animato (aggiornato dal parent tramite setInterval)
 *  - heroCardsReady  — booleano che controlla l'animazione di entrata delle card KPI
 */
import { LANDING_CONTENT } from "../../data/landingContent";
import SmartLink from "../SmartLink";

export default function HeroSection({ typedTitle, heroCardsReady }) {
  // I primi 3 chip della barra di fiducia
  const heroTrustStrip = LANDING_CONTENT.hero.trustStrip.slice(0, 3);

  return (
    <section id="hero" className="band band-hero">
      <div className="band-inner">
        <div className="hero-layout">

          {/* === COLONNA SINISTRA: testo e CTA === */}
          <div className="hero-copy fade-in reveal-on-scroll">
            <p className="eyebrow">{LANDING_CONTENT.hero.eyebrow}</p>

            {/* Titolo con effetto macchina da scrivere (gestito dal parent) */}
            <h1>
              <span className="typing-title" aria-label={LANDING_CONTENT.hero.title}>
                <span aria-hidden="true">{typedTitle}</span>
              </span>
            </h1>

            <p className="lead">{LANDING_CONTENT.hero.subtitle}</p>

            {/* Punti chiave del prodotto */}
            <ul className="clean-list hero-points">
              {LANDING_CONTENT.hero.bullets.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            {/* Pulsanti di azione principali */}
            <div className="hero-actions">
              {LANDING_CONTENT.hero.ctas.map((cta) => (
                <SmartLink
                  key={cta.href}
                  className={`btn ${cta.variant === "solid" ? "btn-solid" : "btn-outline"}`}
                  href={cta.href}
                >
                  {cta.label}
                </SmartLink>
              ))}
            </div>

            <p className="muted-note">{LANDING_CONTENT.hero.microcopy}</p>

            {/* Chip di fiducia (es. "Attenzione alla privacy") */}
            <div className="trust-row" aria-label="Punti di fiducia">
              {heroTrustStrip.map((item) => (
                <span className="chip" key={item}>{item}</span>
              ))}
            </div>

            {/* Informazioni operative rapide */}
            <div className="hero-meta-grid" aria-label="Dettagli operativi">
              <span className="meta-pill">
                <strong>Modalità:</strong>{" "}
                {LANDING_CONTENT.settings.PREVIEW_MODE ? "Preview/confirm" : "Esecuzione diretta"}
              </span>
              <span className="meta-pill">
                <strong>Duplicati:</strong>{" "}
                {LANDING_CONTENT.settings.DEDUPE_STATUS === "planned"
                  ? "In arrivo"
                  : LANDING_CONTENT.settings.DEDUPE_STATUS === "available"
                  ? "Disponibile"
                  : "Non disponibile"}
              </span>
              <span className="meta-pill"><strong>Ambito:</strong> File misti aziendali</span>
            </div>
          </div>

          {/* === COLONNA DESTRA: card visive === */}
          <aside className="hero-visual hero-cards">
            {/* Card principale: schema del flusso AI */}
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
              <p className="muted-note">
                Modalità operativa: <strong>{LANDING_CONTENT.hero.trustNote}</strong>
              </p>
            </article>

            {/* Griglia KPI: metriche chiave */}
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
  );
}
