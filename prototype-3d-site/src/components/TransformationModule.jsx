import { motion } from "framer-motion";
import { useState } from "react";
import { afterGroups, beforeItems, transformationStats } from "../data/content";

export function TransformationModule() {
  const [split, setSplit] = useState(56);

  return (
    <div className="module-stack">
      <div className="module-heading">
        <span className="module-eyebrow">Percorso secondario premium</span>
        <h2>Prima / Dopo</h2>
        <p>
          Il messaggio piu importante non vive nella home come sezione verticale. Si apre da qui come modulo ad
          alto impatto, direttamente collegato alla scena 3D.
        </p>
      </div>

      <div className="compare-stage">
        <div className="compare-pane compare-pane-before">
          <span className="compare-label">Prima</span>
          <h3>Caos documentale, file sparsi, processi lenti.</h3>
          <div className="compare-cloud">
            {beforeItems.map((item, index) => (
              <motion.span
                className="compare-pill"
                key={item}
                initial={{ opacity: 0, y: 14, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -4 : 3 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="compare-pane compare-pane-after" style={{ clipPath: `inset(0 ${100 - split}% 0 0 round 28px)` }}>
          <span className="compare-label">Dopo</span>
          <h3>Archivio organizzato, validazione semplice, output standardizzato.</h3>
          <div className="compare-grid">
            {afterGroups.map((group) => (
              <article className="compare-card" key={group.title}>
                <h4>{group.title}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="compare-divider" style={{ left: `${split}%` }} />
        <div className="compare-handle" style={{ left: `${split}%` }}>
          <span>slide</span>
        </div>

        <input
          aria-label="Confronto prima e dopo"
          className="compare-input"
          max="100"
          min="0"
          onChange={(event) => setSplit(Number(event.target.value))}
          type="range"
          value={split}
        />
      </div>

      <div className="mini-grid">
        {transformationStats.map((item) => (
          <article className="mini-card" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
