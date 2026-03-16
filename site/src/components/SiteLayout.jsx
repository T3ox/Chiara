import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LANDING_CONTENT } from "../data/landingContent";
import { siteConfig } from "../data/siteConfig";

function normalizePath(path) {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function mapActiveRoute(pathname) {
  const current = normalizePath(pathname);
  if (current.startsWith("/account/")) return "/accedi";
  return current;
}

function NavItems({ onClick, includeAccess = false }) {
  const location = useLocation();
  const activePath = mapActiveRoute(location.pathname);

  const isActive = (path) => normalizePath(path) === normalizePath(activePath);

  return (
    <>
      <NavLink to="/" className={isActive("/") ? "active" : ""} onClick={onClick}>Home</NavLink>
      <NavLink to="/prezzi" className={isActive("/prezzi") ? "active" : ""} onClick={onClick}>Prezzi</NavLink>
      <NavLink to="/demo" className={isActive("/demo") ? "active" : ""} onClick={onClick}>Demo</NavLink>
      <NavLink to="/privacy" className={isActive("/privacy") ? "active" : ""} onClick={onClick}>Privacy</NavLink>
      {includeAccess ? <NavLink to="/accedi" className={isActive("/accedi") ? "active" : ""} onClick={onClick}>Accedi</NavLink> : null}
    </>
  );
}

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
  const [activeLandingHref, setActiveLandingHref] = useState(LANDING_CONTENT.nav[0]?.href || "#perche");
  const location = useLocation();

  const isLanding = normalizePath(location.pathname) === "/";
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return undefined;

    const updateFooterHeight = () => {
      document.documentElement.style.setProperty("--footer-height", `${footer.offsetHeight}px`);
    };

    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);

    let resizeObserver;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateFooterHeight);
      resizeObserver.observe(footer);
    }

    return () => {
      window.removeEventListener("resize", updateFooterHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

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

  return (
    <>
      <a className="skip-link" href="#main-content">Vai al contenuto</a>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="top">
        <div className="shell nav-shell">
          {isLanding ? (
            <a className="logo" href="#top" aria-label="Vai all'inizio pagina" onClick={(event) => handleLandingAnchorClick(event, "#top")}>
              {LANDING_CONTENT.site.productName}
            </a>
          ) : (
            <Link className="logo" to="/" aria-label={`Vai alla home ${siteConfig.brandName}`}>
              {siteConfig.brandName}
            </Link>
          )}

          <nav className="site-nav desktop-nav" aria-label="Navigazione principale">
            {isLanding ? (
              <>
                <LandingNavItems activeHref={activeLandingHref} onClick={handleLandingAnchorClick} />
                <NavLink to="/prezzi" className={({ isActive }) => (isActive ? "active" : "")}>Prezzi</NavLink>
                <NavLink to="/demo" className={({ isActive }) => (isActive ? "active" : "")}>Demo</NavLink>
              </>
            ) : (
              <NavItems />
            )}
          </nav>

          <div className="header-right">
            {isLanding ? (
              <Link className="access-btn" to="/demo">Richiedi demo</Link>
            ) : (
              <NavLink to="/accedi" className={({ isActive }) => `access-btn${isActive || mapActiveRoute(location.pathname) === "/accedi" ? " active" : ""}`}>
                Accedi
              </NavLink>
            )}
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((previous) => !previous)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`mobile-menu-shell${isMenuOpen ? " open" : ""}`} id="mobile-menu" aria-hidden={!isMenuOpen}>
          <div className="mobile-backdrop" data-menu-backdrop onClick={() => setIsMenuOpen(false)}></div>
          <aside className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu principale">
            <nav className="site-nav mobile-nav" aria-label="Navigazione mobile">
              {isLanding ? (
                <>
                  <LandingNavItems activeHref={activeLandingHref} onClick={handleLandingAnchorClick} />
                  <NavLink to="/prezzi" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>Prezzi</NavLink>
                  <NavLink to="/demo" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>Demo</NavLink>
                  <Link className="access-btn mobile-demo-btn" to="/demo" onClick={() => setIsMenuOpen(false)}>Richiedi demo</Link>
                </>
              ) : (
                <NavItems onClick={() => setIsMenuOpen(false)} includeAccess />
              )}
            </nav>
          </aside>
        </div>
      </header>

      <main id="main-content" className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        {isLanding ? (
          <div className="shell" id="footer-content">
            <div className="footer-shell">
              <section className="footer-block">
                <h2>{LANDING_CONTENT.site.productName}</h2>
                <p>{LANDING_CONTENT.site.tagline}</p>
              </section>

              <section className="footer-block">
                <h2>Contatti</h2>
                <ul>
                  <li><a href={`mailto:${LANDING_CONTENT.site.contactEmail}`}>{LANDING_CONTENT.site.contactEmail}</a></li>
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
                </ul>
              </nav>
            </div>
            <div className="footer-bottom">&copy; {year} {LANDING_CONTENT.site.productName}. Tutti i diritti riservati.</div>
          </div>
        ) : (
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
                  {siteConfig.contactPhone ? <li><a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}>{siteConfig.contactPhone}</a></li> : null}
                </ul>
              </section>

              <nav className="footer-block" aria-label="Link legali">
                <h2>Legal</h2>
                <ul>
                  <li><Link to="/privacy">Privacy</Link></li>
                  <li><Link to="/termini">Termini</Link></li>
                </ul>
              </nav>

              {siteConfig.showSocial && (
                <nav className="footer-block" aria-label="Social">
                  <h2>Social</h2>
                  <ul>
                    {siteConfig.socialLinks.linkedin ? <li><a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li> : null}
                    {siteConfig.socialLinks.github ? <li><a href={siteConfig.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a></li> : null}
                    {siteConfig.socialLinks.website ? <li><a href={siteConfig.socialLinks.website} target="_blank" rel="noreferrer">Sito</a></li> : null}
                    {siteConfig.socialLinks.x ? <li><a href={siteConfig.socialLinks.x} target="_blank" rel="noreferrer">X</a></li> : null}
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
    </>
  );
}
