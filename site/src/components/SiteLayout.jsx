/**
 * SiteLayout.jsx — layout comune a tutte le pagine del sito.
 *
 * Fornisce:
 *  - Header minimale con hamburger (sx), logo centrato, e CTA accedi (dx)
 *  - Drawer laterale a scomparsa da sinistra con navigazione completa
 *  - Footer con info prodotto, contatti, link legali
 *  - <Outlet /> dove React Router renderizza la pagina corrente
 *
 * Comportamento speciale per la homepage ("/"):
 *  - Il logo punta all'ancora #top invece di ricaricare la pagina
 *  - Il drawer mostra le sezioni anchor della landing (#perche, #come-funziona, ...)
 *  - Il click sulle ancore fa uno scroll fluido invece di navigare
 *  - Il link attivo nel drawer viene aggiornato in base alla sezione visibile (scroll tracking)
 *  - Il footer mostra contenuto specifico della landing (tagline, note privacy)
 *
 * Drawer:
 *  - Si apre con il pulsante hamburger (sempre visibile, anche su desktop)
 *  - Si chiude premendo Escape, cliccando fuori dal pannello, o navigando
 *  - Blocca lo scroll del body mentre e aperto (classe CSS "menu-open")
 *  - I link sono raggruppati per sezione: Navigazione, Prodotto, Azienda
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

/** Link raggruppati per il drawer laterale */
const DRAWER_NAV_MAIN = [
  { to: "/", label: "Home" },
  { to: "/prezzi", label: "Prezzi" },
  { to: "/demo", label: "Richiedi demo" },
  { to: "/download", label: "Download" },
];

const DRAWER_NAV_COMPANY = [
  { to: "/chi-siamo", label: "Chi siamo" },
  { to: "/contatti", label: "Contatti" },
  { to: "/changelog", label: "Changelog" },
];

const DRAWER_NAV_LEGAL = [
  { to: "/privacy", label: "Privacy" },
  { to: "/termini", label: "Termini" },
];

/** Emette l'evento custom per riaprire il banner cookie dal footer. */
const openCookieSettings = () => window.dispatchEvent(new CustomEvent("open-cookie-settings"));

export default function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sezione anchor attiva nella landing (aggiornata con lo scroll)
  const [activeLandingHref, setActiveLandingHref] = useState(
    LANDING_CONTENT.nav[0]?.href || "#perche"
  );

  const location = useLocation();
  const isLanding = normalizePath(location.pathname) === "/";
  const activePath = mapActiveRoute(location.pathname);
  const year = useMemo(() => new Date().getFullYear(), []);

  const isActive = (path) => normalizePath(path) === normalizePath(activePath);
  const closeMenu = () => setIsMenuOpen(false);

  // Chiude il drawer ad ogni cambio di pagina
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Aggiunge/rimuove la classe "menu-open" al body per bloccare lo scroll
  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  // Aggiunge la classe "is-scrolled" all'header dopo 10px di scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll tracking: aggiorna il link attivo nel drawer della landing
  useEffect(() => {
    if (!isLanding) return;

    const sections = LANDING_CONTENT.nav
      .map((item) => ({ href: item.href, node: document.querySelector(item.href) }))
      .filter((entry) => entry.node);

    if (!sections.length) return;

    const updateFromScroll = () => {
      const header = document.querySelector(".site-header");
      const headerOffset = (header ? header.offsetHeight : 74) + 10;

      let currentHref = sections[0].href;
      sections.forEach((entry) => {
        const rect = entry.node.getBoundingClientRect();
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
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

  // Chiusura drawer con Escape o click fuori dal pannello
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const onOutsideClick = (event) => {
      if (!isMenuOpen) return;
      const panel = document.querySelector(".drawer-panel");
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
   * Esegue uno scroll fluido verso la sezione invece di navigare.
   */
  const handleLandingAnchorClick = (event, href) => {
    if (!isLanding) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

    if (window.history?.replaceState) {
      window.history.replaceState(null, "", href);
    }
    setIsMenuOpen(false);
  };

  /** Renderizza un gruppo di link nel drawer */
  const renderDrawerGroup = (label, items) => (
    <div className="drawer-group">
      <span className="drawer-group-label">{label}</span>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={`drawer-link${isActive(item.to) ? " active" : ""}`}
          onClick={closeMenu}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );

  return (
    <>
      {/* Link di salto per accessibilita */}
      <a className="skip-link" href="#main-content">Vai al contenuto</a>

      {/* === HEADER === */}
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="top">
        <div className="shell nav-shell">
          {/* Hamburger — sempre visibile */}
          <button
            type="button"
            className="menu-toggle"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
            aria-controls="drawer-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo centrato */}
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

          {/* CTA a destra */}
          <div className="header-right">
            <Link className="access-btn access-btn--outline" to="/accedi">Accedi</Link>
            <Link className="access-btn access-btn--solid" to="/registrati">Registrati</Link>
          </div>
        </div>
      </header>

      {/* === DRAWER LATERALE === */}
      <div
        className={`drawer-shell${isMenuOpen ? " open" : ""}`}
        id="drawer-menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="drawer-backdrop" onClick={closeMenu}></div>
        <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu principale">
          {/* Pulsante chiudi dentro il drawer */}
          <button
            type="button"
            className="drawer-close"
            aria-label="Chiudi menu"
            onClick={closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>

          <nav className="drawer-nav" aria-label="Navigazione principale">
            {/* Sezioni della landing (solo sulla homepage) */}
            {isLanding && (
              <div className="drawer-group">
                <span className="drawer-group-label">In questa pagina</span>
                {LANDING_CONTENT.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`drawer-link${activeLandingHref === item.href ? " active" : ""}`}
                    onClick={(event) => handleLandingAnchorClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}

            {renderDrawerGroup("Prodotto", DRAWER_NAV_MAIN)}
            {renderDrawerGroup("Azienda", DRAWER_NAV_COMPANY)}
            {renderDrawerGroup("Legal", DRAWER_NAV_LEGAL)}
          </nav>

          {/* CTA nel drawer */}
          <div className="drawer-footer">
            <Link className="btn btn-outline drawer-cta" to="/accedi" onClick={closeMenu}>
              Accedi
            </Link>
            <Link className="btn btn-solid drawer-cta" to="/registrati" onClick={closeMenu}>
              Registrati
            </Link>
          </div>
        </aside>
      </div>

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
                  <li><Link to="/chi-siamo">Chi siamo</Link></li>
                  <li><Link to="/contatti">Contatti</Link></li>
                  <li><Link to="/changelog">Changelog</Link></li>
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
