import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const THEME_STORAGE_KEY = "folderorganizer-theme";

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
      <NavLink to="/privacy" className={isActive("/privacy") ? "active" : ""} onClick={onClick}>Privacy</NavLink>
      {includeAccess ? <NavLink to="/accedi" className={isActive("/accedi") ? "active" : ""} onClick={onClick}>Accedi</NavLink> : null}
    </>
  );
}

export default function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

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

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <>
      <a className="skip-link" href="#main-content">Vai al contenuto</a>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="shell nav-shell">
          <Link className="logo" to="/" aria-label={`Vai alla home ${siteConfig.brandName}`}>
            {siteConfig.brandName}
          </Link>

          <nav className="site-nav desktop-nav" aria-label="Navigazione principale">
            <NavItems />
          </nav>

          <div className="header-right">
            <NavLink to="/accedi" className={({ isActive }) => `access-btn${isActive || mapActiveRoute(location.pathname) === "/accedi" ? " active" : ""}`}>
              Accedi
            </NavLink>
            <button
              type="button"
              className="theme-toggle"
              data-theme-toggle
              aria-label="Cambia tema"
              aria-pressed={theme === "dark"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Tema chiaro" : "Tema scuro"}
            </button>
          </div>

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

        <div className={`mobile-menu-shell${isMenuOpen ? " open" : ""}`} id="mobile-menu" aria-hidden={!isMenuOpen}>
          <div className="mobile-backdrop" data-menu-backdrop onClick={() => setIsMenuOpen(false)}></div>
          <aside className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu principale">
            <nav className="site-nav mobile-nav" aria-label="Navigazione mobile">
              <NavItems onClick={() => setIsMenuOpen(false)} includeAccess />
              <button
                type="button"
                className="theme-toggle mobile-theme-toggle"
                aria-label="Cambia tema"
                aria-pressed={theme === "dark"}
                onClick={toggleTheme}
              >
                {theme === "dark" ? "Tema chiaro" : "Tema scuro"}
              </button>
            </nav>
          </aside>
        </div>
      </header>

      <main id="main-content" className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
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
      </footer>
    </>
  );
}
