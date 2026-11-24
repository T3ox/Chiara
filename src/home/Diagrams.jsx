/* ------------------------------------------------------------------ the program, as a diagram */

// process_one(), box by box: the main line, the shortcut the local rules take, the ways into DaRevisionare
const NODE_W = 150;
const NODE_H = 58;
const NODES = [
  ["Controlli", "is_file_safe_to_read"],
  ["Lettura", "PDF · testo · immagine"],
  ["Regole locali", "local_classify"],
  ["Richiesta all'AI", "gpt-4.1-mini"],
  ["Verifica", "Nome___Cartella"],
  ["Archiviazione", "move_with_retry"],
].map(([label, sub], i) => ({ label, sub, x: 50 + i * 185, y: 118 }));
const mid = (n) => n.x + NODE_W / 2;
const [N_CHECK, N_READ, N_RULES, N_AI, N_VALID, N_MOVE] = NODES;
const REV = { x: N_VALID.x, y: 262 };

const MAIN = `M10,${N_CHECK.y + NODE_H / 2} H1172`;
const SHORTCUT = `M${mid(N_RULES)},${N_RULES.y} V62 Q${mid(N_RULES)},50 ${mid(N_RULES) + 12},50 H${mid(N_MOVE) - 12} Q${mid(N_MOVE)},50 ${mid(N_MOVE)},62 V${N_MOVE.y}`;
const TO_REVIEW = `M${mid(N_CHECK)},${N_CHECK.y + NODE_H} V${REV.y + 17} Q${mid(N_CHECK)},${REV.y + 29} ${mid(N_CHECK) + 12},${REV.y + 29} H${REV.x}`;
const READ_DOWN = `M${mid(N_READ)},${N_READ.y + NODE_H} V${REV.y + 29}`;
const VALID_DOWN = `M${mid(N_VALID)},${N_VALID.y + NODE_H} V${REV.y}`;
const REPAIR = `M${N_VALID.x + 28},${N_VALID.y + NODE_H} C${N_VALID.x + 28},${N_VALID.y + 104} ${mid(N_AI)},${N_AI.y + 104} ${mid(N_AI)},${N_AI.y + NODE_H}`;

export function Pipeline() {
  return (
    <>
      <svg className="pipe" viewBox="0 0 1180 330" role="img" aria-labelledby="pipe-t pipe-d">
        <title id="pipe-t">Lo schema del programma</title>
        <desc id="pipe-d">
          Ogni file passa per controlli, lettura, regole locali, richiesta all'AI, verifica e archiviazione. Se le
          regole locali danno un punteggio di almeno 80 il file salta l'AI. Un file senza estensione, senza
          contenuto o con una risposta non valida va in DaRevisionare.
        </desc>
        <defs>
          <marker id="pipe-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" />
          </marker>
        </defs>

        <path className="pipe__line" d={MAIN} markerEnd="url(#pipe-arrow)" />
        <path className="pipe__line pipe__line--ok" d={SHORTCUT} markerEnd="url(#pipe-arrow)" />
        <path className="pipe__line pipe__line--warn" d={TO_REVIEW} markerEnd="url(#pipe-arrow)" />
        <path className="pipe__line pipe__line--warn" d={READ_DOWN} />
        <path className="pipe__line pipe__line--warn" d={VALID_DOWN} markerEnd="url(#pipe-arrow)" />
        <path className="pipe__line pipe__line--dash" d={REPAIR} markerEnd="url(#pipe-arrow)" />

        {/* one light on each route: the usual way, the shortcut, the way to review */}
        <circle className="pipe__dot" r="4" style={{ offsetPath: `path("${MAIN}")` }} />
        <circle className="pipe__dot pipe__dot--ok" r="4" style={{ offsetPath: `path("${SHORTCUT}")` }} />
        <circle className="pipe__dot pipe__dot--warn" r="4" style={{ offsetPath: `path("${TO_REVIEW}")` }} />

        <text className="pipe__note" x="14" y={N_CHECK.y + NODE_H / 2 - 12}>file</text>
        <text className="pipe__note pipe__note--ok" x={(mid(N_RULES) + mid(N_MOVE)) / 2} y="40" textAnchor="middle">punteggio ≥ 80: non serve l'AI</text>
        <text className="pipe__note pipe__note--warn" x={mid(N_CHECK) + 12} y={N_CHECK.y + NODE_H + 30}>senza estensione</text>
        <text className="pipe__note pipe__note--warn" x={mid(N_READ) + 12} y={N_READ.y + NODE_H + 30}>senza contenuto</text>
        <text className="pipe__note" x={(mid(N_AI) + N_VALID.x + 28) / 2} y={N_AI.y + NODE_H + 56} textAnchor="middle">2ª richiesta · max 40 token</text>
        <text className="pipe__note pipe__note--warn" x={mid(N_VALID) + 12} y={N_VALID.y + NODE_H + 70}>ancora non valida</text>
        <text className="pipe__note pipe__note--ok" x="1172" y={N_MOVE.y + NODE_H / 2 - 12} textAnchor="end">ok</text>

        {NODES.map((n) => (
          <g key={n.label} transform={`translate(${n.x},${n.y})`}>
            <rect className="pipe__box" width={NODE_W} height={NODE_H} rx="10" />
            <text className="pipe__label" x={NODE_W / 2} y="25" textAnchor="middle">{n.label}</text>
            <text className="pipe__sub" x={NODE_W / 2} y="44" textAnchor="middle">{n.sub}</text>
          </g>
        ))}
        <g transform={`translate(${REV.x},${REV.y})`}>
          <rect className="pipe__box pipe__box--warn" width={NODE_W} height={NODE_H} rx="10" />
          <text className="pipe__label" x={NODE_W / 2} y="25" textAnchor="middle">DaRevisionare</text>
          <text className="pipe__sub" x={NODE_W / 2} y="44" textAnchor="middle">move_to_revision</text>
        </g>
      </svg>

      {/* the same thing in words, where the drawing would be too small to read */}
      <ol className="pipe-list">
        <li><b>Controlli.</b> Il file esiste, non è vuoto, non è aperto altrove. Senza estensione va in DaRevisionare.</li>
        <li><b>Lettura.</b> PDF intero, testo di Word ed Excel, foto ridotta. Senza contenuto va in DaRevisionare.</li>
        <li><b>Regole locali.</b> Con un punteggio di almeno 80 il file è classificato qui, senza usare l'AI.</li>
        <li><b>Richiesta all'AI.</b> <span className="mono">gpt-4.1-mini</span> riceve il file e l'elenco delle cartelle.</li>
        <li><b>Verifica.</b> La risposta deve essere una riga <span className="mono">Nome___Cartella</span>. Se non lo è, una seconda richiesta; poi DaRevisionare.</li>
        <li><b>Archiviazione.</b> Nome ripulito, nessuna sovrascrittura, fino a 6 tentativi di spostamento.</li>
      </ol>
    </>
  );
}
