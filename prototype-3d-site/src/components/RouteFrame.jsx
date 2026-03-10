import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function RouteFrame({ eyebrow, title, summary, children }) {
  return (
    <div className="route-shell">
      <header className="route-header">
        <Link className="route-back" to="/">
          Torna all'hub 3D
        </Link>
        <div className="route-copy">
          <span className="route-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
      </header>

      <motion.main
        animate={{ opacity: 1, y: 0 }}
        className="route-content"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </div>
  );
}
