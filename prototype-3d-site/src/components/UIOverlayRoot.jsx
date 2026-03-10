import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { heroContent, topNavLinks } from "../data/content";

export function UIOverlayRoot({ onResetView }) {
  return (
    <div className="ui-overlay-root">
      <header className="home-nav">
        <div className="brand-block">
          <span className="brand-mark" />
          <div>
            <strong>{heroContent.brandName}</strong>
            <span>{heroContent.brandTagline}</span>
          </div>
        </div>

        <nav className="home-links">
          {topNavLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="home-hud"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="home-eyebrow">{heroContent.eyebrow}</span>
        <h1>{heroContent.title}</h1>
        <p>{heroContent.summary}</p>

        <div className="home-actions">
          <Link className="cta-primary" to="/prima-dopo">
            {heroContent.primaryAction}
          </Link>
          <button className="cta-secondary" onClick={onResetView} type="button">
            Reset view
          </button>
        </div>

        <p className="home-helper">{heroContent.helperText}</p>
      </motion.div>

      <div className="assistant-chip">
        <span className="assistant-dot" />
        <p>Passa sui nodi per leggere la sezione. Dopo il primo movimento la camera resta libera.</p>
      </div>
    </div>
  );
}
