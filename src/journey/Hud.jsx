import { Link } from "react-router-dom";
import { DEMO_HREF, FILES, STATIONS } from "./data";
import { goToStation, useCurrentStation, useLandedCount, useProgress } from "./engine";

function Logo() {
  return (
    <Link className="hud__logo" to="/" aria-label="FolderOrganizer, torna alla pagina principale">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="6" />
        <path d="M5 8.5h5.2l1.6 1.8H19v8.2H5z" />
      </svg>
      FolderOrganizer
    </Link>
  );
}

// embedded: inside the home page, which keeps its own top bar; the counter moves to the bottom bar
export default function Hud({ embedded = false }) {
  const cur = useCurrentStation();
  const p = useProgress(200);
  const done = useLandedCount(); // ticks on the frame each file appears in its folder
  const s = STATIONS[cur];
  const run = (
    <div className={`hud__run${done === FILES.length ? " is-complete" : ""}`} aria-live="polite">
      <span className={`hud__led${cur > 0 && cur < 9 ? " is-on" : ""}`} aria-hidden="true"></span>
      <span>File sistemati</span>
      <span className="hud__mono hud__count" key={done}>{done}/{FILES.length}</span>
    </div>
  );

  return (
    <div className="hud" aria-label="Pannello di navigazione">
      {!embedded && (
        <header className="hud__top">
          <Logo />
          <nav className="hud__crumb" aria-label="Posizione">
            <span className="hud__dim">percorso</span>
            <span className="hud__sep">/</span>
            <span className="hud__mono">{s.n}</span>
            <span>{s.title}</span>
          </nav>
          {run}
          <a className="btn btn--primary hud__cta" href={DEMO_HREF}>Richiedi una demo</a>
        </header>
      )}

      <div className="hud__side" aria-hidden="true">
        <span className="hud__big">{s.n}</span>
        <span className="hud__of">/ 09</span>
      </div>

      <footer className="hud__bottom">
        <div className="hud__meta hud__mono" aria-hidden="true">
          <span>percorso</span>
          <span><b>{Math.round(p * 100)}%</b></span>
        </div>
        <ol className="hud__map">
          {STATIONS.map((st, i) => (
            <li key={st.id} className={i < cur ? "is-past" : i === cur ? "is-cur" : ""}>
              <button type="button" onClick={() => goToStation(i)} aria-current={i === cur ? "step" : undefined} aria-label={`${st.n} ${st.title}`}>
                <i aria-hidden="true"></i>
                <span>{st.short}</span>
              </button>
            </li>
          ))}
          <span className="hud__fill" style={{ transform: `scaleX(${p})` }} aria-hidden="true"></span>
        </ol>
        {embedded ? run : (
          <p className={`hud__hint${p > 0.015 ? " is-gone" : ""}`}>
            Scorri per avanzare <kbd>↓</kbd> · tappe <kbd>←</kbd> <kbd>→</kbd>
          </p>
        )}
      </footer>
    </div>
  );
}
