/**
 * SiteLayout.jsx — layout comune a tutte le pagine del sito.
 *
 * Fornisce:
 *  - Header con navigazione desktop e mobile
 *  - Footer con info prodotto, contatti, link legali
 *  - <Outlet /> dove React Router renderizza la pagina corrente
 *
 * Comportamento speciale per la homepage ("/"):
 *  - Il logo punta all'ancora #top invece di ricaricare la pagina
 *  - La navbar mostra le sezioni anchor della landing (#perche, #come-funziona, ...)
 *    invece dei link alle pagine
 *  - Il click sulle ancore fa uno scroll fluido invece di navigare
 *  - Il link attivo nella navbar viene aggiornato in base alla sezione visibile (scroll tracking)
 *  - Il footer mostra contenuto specifico della landing (tagline, note privacy)
 *
 * Menu mobile:
 *  - Si apre con il pulsante hamburger
 *  - Si chiude premendo Escape, cliccando fuori dal pannello, o navigando
 *  - Blocca lo scroll del body mentre è aperto (classe CSS "menu-open")
 *
 * Altezza footer:
 *  - Viene misurata e salvata nella variabile CSS --footer-height
 *  - Serve per calcolare il padding del contenuto principale e evitare sovrapposizioni
 */
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LANDING_CONTENT } from "../data/landingContent";
import { siteConfig } from "../data/siteConfig";
import CookieBanner from "./CookieBanner";

/** Normalizza un percorso rimuovendo lo slash finale (tranne "/"). */
function normalizePath(path) {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

/**
 * Mappa il percorso attivo per la navigazione.
 * I percorsi /account/* vengono trattati come /accedi per evidenziare il link corretto.
 */
function mapActiveRoute(pathname) {
  const current = normalizePath(pathname);
  if (current.startsWith("/account/")) return "/accedi";
  return current;
}

/** Voci di navigazione condivise tra desktop e mobile (pagine interne, non landing). */
const SITE_NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/prezzi", label: "Prezzi" },
  { to: "/demo", label: "Demo" },
  { to: "/download", label: "Download" },
  { to: "/privacy", label: "Privacy" },
  { to: "/termini", label: "Termini" },
];

/** Link aggiuntivi mostrati nella navbar della landing (oltre alle sezioni anchor). */
const LANDING_EXTRA_NAV = [
  { to: "/prezzi", label: "Prezzi" },
  { to: "/demo", label: "Demo" },
  { to: "/download", label: "Download" },
  { to: "/termini", label: "Termini" },
];

/** Emette l'evento custom per riaprire il banner cookie dal footer. */
const openCookieSettings = () => window.dispatchEvent(new CustomEvent("open-cookie-settings"));

/** Link di navigazione per le pagine del sito (non la landing). */
function NavItems({ onClick }) {
  const location = useLocation();
  const activePath = mapActiveRoute(location.pathname);
  const isActive = (path) => normalizePath(path) === normalizePath(activePath);

  return (
    <>
      {SITE_NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} className={isActive(item.to) ? "active" : ""} onClick={onClick}>
          {item.label}
        </NavLink>
      ))}
    </>
  );
}

/** Link di navigazione per la landing page — puntano alle sezioni anchor (#perche, ecc.). */
function LandingNavItems({ activeHref, onClick }) {
  return (
    <>
      {LANDING_CONTENT.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={activeHref === item.href ? "active" : ""}
          data-route={item.href}
          onClick={(event) => onClick(event, item.href)}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

export default function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sezione anchor attiva nella landing (aggiornata con lo scroll)
  const [activeLandingHref, setActiveLandingHref] = useState(
    LANDING_CONTENT.nav[0]?.href || "#perche"
  );

  const location = useLocation();
  const isLanding = normalizePath(location.pathname) === "/";
  const year = useMemo(() => new Date().getFullYear(), []);

  // Chiude il menu mobile ad ogni cambio di pagina
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Aggiunge/rimuove la classe "menu-open" al body per bloccare lo scroll
  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  // Aggiunge la classe "is-scrolled" all'header dopo 10px di scroll
  // (attiva ombre e sfondo opaco per leggibilità)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll tracking: aggiorna il link attivo nella navbar della landing
  // in base alla sezione anchor visibile in quel momento
  useEffect(() => {
    if (!isLanding) return;

    const sections = LANDING_CONTENT.nav
      .map((item) => ({ href: item.href, node: document.querySelector(item.href) }))
      .filter((entry) => entry.node);

    if (!sections.length) return;

    const updateFromScroll = () => {
      const header = document.querySelector(".site-header");
      const headerOffset = (header ? header.offsetHeight : 74) + 10;
      const markerLine = headerOffset;

      let currentHref = sections[0].href;
      sections.forEach((entry) => {
        const rect = entry.node.getBoundingClientRect();
        // La sezione è attiva se la sua area copre la riga di riferimento (header + 10px)
        if (rect.top <= markerLine && rect.bottom > markerLine) {
          currentHref = entry.href;
        }
      });

      setActiveLandingHref(currentHref);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [isLanding]);

  // Chiusura menu mobile con Escape o click fuori dal pannello
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const onOutsideClick = (event) => {
      if (!isMenuOpen) return;
      const panel = document.querySelector(".mobile-panel");
      const toggle = document.querySelector(".menu-toggle");
      if (!panel || !toggle) return;
      if (!panel.contains(event.target) && !toggle.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [isMenuOpen]);

  /**
   * Gestisce il click su un link anchor della landing.
   * Esegue uno scroll fluido verso la sezione invece di navigare (evita il ricaricamento).
   * Rispetta la preferenza "prefers-reduced-motion".
   */
  const handleLandingAnchorClick = (event, href) => {
    if (!isLanding) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

    // Aggiorna l'URL senza ricaricare la pagina
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", href);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Link di salto per accessibilità: bypassa la navigazione e va al contenuto */}
      <a className="skip-link" href="#main-content">Vai al contenuto</a>

      {/* === HEADER === */}
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="top">
        <div className="shell nav-shell">
          {/* Logo: ancora #top sulla landing, link alla home sulle altre pagine */}
          {isLanding ? (
            <a
              className="logo"
              href="#top"
              aria-label="Vai all'inizio pagina"
              onClick={(event) => handleLandingAnchorClick(event, "#top")}
            >
              {LANDING_CONTENT.site.productName}
            </a>
          ) : (
            <Link className="logo" to="/" aria-label={`Vai alla home ${siteConfig.brandName}`}>
              {siteConfig.brandName}
            </Link>
          )}

          {/* Navigazione desktop */}
          <nav className="site-nav desktop-nav" aria-label="Navigazione principale">
            {isLanding ? (
              <>
                {/* Sezioni anchor della landing */}
                <LandingNavItems activeHref={activeLandingHref} onClick={handleLandingAnchorClick} />
                {/* Link alle pagine separate */}
                {LANDING_EXTRA_NAV.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>{item.label}</NavLink>
                ))}
              </>
            ) : (
              <NavItems />
            )}
          </nav>

          {/* Pulsante CTA in alto a destra — sempre "Accedi" */}
          <div className="header-right">
            <Link className="access-btn" to="/accedi">Accedi</Link>
          </div>

          {/* Pulsante hamburger per il menu mobile */}
          <button
            type="button"
            className="menu-toggle"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* === MENU MOBILE === */}
        <div
          className={`mobile-menu-shell${isMenuOpen ? " open" : ""}`}
          id="mobile-menu"
          aria-hidden={!isMenuOpen}
        >
          {/* Sfondo scuro cliccabile per chiudere il menu */}
          <div className="mobile-backdrop" data-menu-backdrop onClick={() => setIsMenuOpen(false)}></div>
          <aside className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu principale">
            <nav className="site-nav mobile-nav" aria-label="Navigazione mobile">
              {isLanding ? (
                <>
                  <LandingNavItems activeHref={activeLandingHref} onClick={handleLandingAnchorClick} />
                  {LANDING_EXTRA_NAV.map((item) => (
                    <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>{item.label}</NavLink>
                  ))}
                  <Link className="access-btn mobile-demo-btn" to="/accedi" onClick={() => setIsMenuOpen(false)}>Accedi</Link>
                </>
              ) : (
                <NavItems onClick={() => setIsMenuOpen(false)} />
              )}
            </nav>
          </aside>
        </div>
      </header>

      {/* === CONTENUTO PRINCIPALE === */}
      <main id="main-content" className="site-main">
        <Outlet /> {/* React Router renderizza qui la pagina corrente */}
      </main>

      {/* === FOOTER === */}
      <footer className="site-footer">
        {isLanding ? (
          // Footer versione landing: prodotto, contatti, note, link
          <div className="shell" id="footer-content">
            <div className="footer-shell">
              <section className="footer-block">
                <h2>{LANDING_CONTENT.site.productName}</h2>
                <p>{LANDING_CONTENT.site.tagline}</p>
              </section>

              <section className="footer-block">
                <h2>Contatti</h2>
                <ul>
                  <li>
                    <a href={`mailto:${LANDING_CONTENT.site.contactEmail}`}>
                      {LANDING_CONTENT.site.contactEmail}
                    </a>
                  </li>
                </ul>
              </section>

              <section className="footer-block">
                <h2>Note</h2>
                <ul>
                  {LANDING_CONTENT.footer.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>

              <nav className="footer-block" aria-label="Link utili">
                <h2>Link</h2>
                <ul>
                  {LANDING_CONTENT.footer.links.map((link) => (
                    <li key={link.href}><a href={link.href}>{link.label}</a></li>
                  ))}
                  <li>
                    <button
                      type="button"
                      className="cookie-settings-link"
                      onClick={openCookieSettings}
                    >
                      Gestisci cookie
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="footer-bottom">
              &copy; {year} {LANDING_CONTENT.site.productName}. Tutti i diritti riservati.
            </div>
          </div>
        ) : (
          // Footer versione pagine interne: brand, contatti, legal, social
          <>
            <div className="shell footer-shell">
              <section className="footer-block">
                <h2>{siteConfig.brandName}</h2>
                <p>{siteConfig.tagline}</p>
              </section>

              <section className="footer-block">
                <h2>Contatti</h2>
                <ul>
                  <li><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
                  {siteConfig.contactPhone ? (
                    <li>
                      <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}>
                        {siteConfig.contactPhone}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </section>

              <nav className="footer-block" aria-label="Link legali">
                <h2>Legal</h2>
                <ul>
                  <li><Link to="/privacy">Privacy</Link></li>
                  <li><Link to="/termini">Termini</Link></li>
                  <li>
                    <button
                      type="button"
                      className="cookie-settings-link"
                      onClick={openCookieSettings}
                    >
                      Gestisci cookie
                    </button>
                  </li>
                </ul>
              </nav>

              {siteConfig.showSocial && (
                <nav className="footer-block" aria-label="Social">
                  <h2>Social</h2>
                  <ul>
                    {/* Genera i link social filtrando quelli con URL configurato */}
                    {[
                      { key: "linkedin", label: "LinkedIn" },
                      { key: "github", label: "GitHub" },
                      { key: "website", label: "Sito" },
                      { key: "x", label: "X" },
                    ].filter((s) => siteConfig.socialLinks[s.key]).map((s) => (
                      <li key={s.key}><a href={siteConfig.socialLinks[s.key]} target="_blank" rel="noreferrer">{s.label}</a></li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
            <div className="shell footer-bottom">
              <span>© {year} {siteConfig.brandName}. Tutti i diritti riservati.</span>
            </div>
          </>
        )}
      </footer>

      <CookieBanner />
    </>
  );
}
