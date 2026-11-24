import { useEffect, useState } from "react";
import { FILES, FOLDERS } from "./data";
import { seg, useCurrentStation, useStationT } from "./engine";

/*
  The demos. Each is a small app window scrubbed by the scroll: t runs 0..1 while its station crosses the
  screen, so the visitor moves it forward and back at their own pace and can stop on any step.
  The frame shows a timecode, the chapters and a caption that says what the program is doing right now.
*/

const fmt = (s) => `00:${s.toFixed(1).padStart(4, "0")}`;
const ICON = { PDF: "pdf", DOCX: "docx", DOC: "docx", XLSX: "xlsx", NUMBERS: "xlsx", IMAGE: "image" };

export function FileIcon({ kind, size = 18 }) {
  return <img className="fi" src={`/icons/${ICON[kind] || "pdf"}.svg`} alt="" width={size} height={size} decoding="async" />;
}

// the window chrome every demo and the hero terminal share
function WindowBar({ title, children }) {
  return (
    <div className="demo__bar">
      <span className="demo__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span className="demo__title">{title}</span>
      {children}
    </div>
  );
}

function Frame({ i, title, t, steps, duration = 8, children }) {
  // only the station on screen speaks to screen readers; the others update silently while the page scrolls
  const live = useCurrentStation() === i;
  let cur = 0;
  steps.forEach((s, i) => { if (t >= s.at) cur = i; });
  return (
    <div className="demo" role="group" aria-label={title}>
      <WindowBar title={title}>
        <span className="demo__tc mono" aria-hidden="true">{fmt(t * duration)} / {fmt(duration)}</span>
      </WindowBar>
      <div className="demo__body">{children}</div>
      <div className="demo__foot">
        <div className="demo__scrub" aria-hidden="true">
          <span className="demo__scrub-fill" style={{ transform: `scaleX(${t})` }}></span>
          {steps.map((s, i) => (
            <span key={i} className={`demo__mark${i <= cur ? " is-on" : ""}`} style={{ left: `${s.at * 100}%` }}></span>
          ))}
        </div>
        <p className="demo__cap" aria-live={live ? "polite" : "off"}>
          <span className="mono">passo {cur + 1}/{steps.length}</span>
          {steps[cur].label}
        </p>
      </div>
    </div>
  );
}

const typed = (text, k) => text.slice(0, Math.round(text.length * Math.max(0, Math.min(1, k))));

/* ---------------------------------------------------------------- 00 hero terminal (time-driven loop) */

const LOG = [
  ["dim", "> python FolderOrganizer.py \"D:\\Ufficio\\INPUT_FILES\""],
  ["", " Analizzo: scan_fornitore_17.pdf"],
  ["acc", " API CALL  scan_fornitore_17.pdf  [PDF]"],
  ["ok", " Spostato in: 01_AMMINISTRAZIONE_FINANZA\\02_Fatture_Passive\\2025-03-14_Fattura_RossiForniture.pdf"],
  ["", " Analizzo: POS_cantiere_via_Roma.docx"],
  ["ok", " Classificato LOCAL: 04_CANTIERI_OPERATIVO/07_Sicurezza_Cantiere (92) - Match sicurezza cantiere"],
  ["", " Analizzo: IMG_2048.jpg"],
  ["acc", " API CALL  IMG_2048.jpg  [IMAGE]"],
  ["ok", " Spostato in: 03_CLIENTI_COMMERCIALE\\05_Sopralluoghi\\2025-02-03_Foto_Sopralluogo_Bianchi.jpg"],
  ["", " Analizzo: Scansione0042.pdf"],
  ["warn", " DaRevisionare: verbale_vuoto.docx (docx senza contenuto leggibile)"],
];

export function HeroTerminal() {
  const [n, setN] = useState(LOG.length);
  // it types only while the start is on screen
  const onScreen = useCurrentStation() === 0;
  useEffect(() => {
    if (!onScreen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setN((v) => (v >= LOG.length + 4 ? 1 : v + 1)), 700);
    return () => clearInterval(id);
  }, [onScreen]);
  return (
    <div className="term" aria-label="L'output del programma mentre lavora">
      <WindowBar title="Prompt dei comandi · FolderOrganizer.py" />
      <pre className="term__body mono">
        {LOG.slice(0, n).map(([cls, line], i) => (
          <span key={i} className={`term__l ${cls}`}>{line}{"\n"}</span>
        ))}
      </pre>
    </div>
  );
}

/* ---------------------------------------------------------------- 01 cartella */

export function DemoCartella({ i }) {
  const t = useStationT(i);
  const rows = seg(t, 0.02, 0.28);
  const tree = seg(t, 0.3, 0.55);
  const created = t >= 0.58;
  const issues = seg(t, 0.72, 0.95);
  const tops = ["01_AMMINISTRAZIONE_FINANZA", "02_LEGALE_SOCIETARIO", "03_CLIENTI_COMMERCIALE", "04_CANTIERI_OPERATIVO", "05_RISORSE_UMANE", "06_MARKETING_COMUNICAZIONE", "07_PROGETTI_SPECIALI"];
  return (
    <Frame
      i={i}
      title="Esplora file · D:\Ufficio\INPUT_FILES"
      t={t}
      duration={8}
      steps={[
        { at: 0, label: "Ecco la cartella: 9 file mescolati, con nomi che non dicono cosa sono." },
        { at: 0.3, label: "Le cartelle che hai già sono le sole dove i file potranno finire." },
        { at: 0.58, label: "Se non c'è, crea la cartella DaRevisionare per i casi dubbi." },
        { at: 0.72, label: "Ogni file ha il suo problema: il percorso li risolve uno per uno." },
      ]}
    >
      <div className="ex">
        <ul className="ex__tree mono">
          <li className="ex__root">▾ INPUT_FILES</li>
          {tops.map((f, k) => (
            <li key={f} className={tree * tops.length > k ? "is-lit" : ""}>▸ {f}</li>
          ))}
          <li className={`ex__new${created ? " is-in" : ""}`}>▸ DaRevisionare <em>+ creata</em></li>
        </ul>
        <div className="ex__list">
          <div className="ex__head mono"><span>Nome</span><span>Tipo</span><span>Dim.</span></div>
          {FILES.map((f, k) => (
            <div key={f.id} className={`ex__row${rows * FILES.length > k ? " is-in" : ""}`}>
              <span className="ex__name">
                <FileIcon kind={f.kind} />
                <span className="ex__file">{f.name}</span>
                {f.issue && <em className={`tag${issues * FILES.length > k ? " is-in" : ""}`}>{f.issue}</em>}
              </span>
              <span className="mono">{f.kind}</span>
              <span className="mono">{f.size}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 02 controlli */

export function DemoControlli({ i }) {
  const t = useStationT(i);
  const scan = seg(t, 0.04, 0.62) * FILES.length;
  const skip = t >= 0.68;
  const cols = ["esiste", "è un file", "> 0 byte", "non in uso", "estensione"];
  return (
    <Frame
      i={i}
      title="Controllo dei file"
      t={t}
      duration={6}
      steps={[
        { at: 0, label: "Ogni file viene controllato prima di essere aperto." },
        { at: 0.3, label: "Un file vuoto o di tipo sconosciuto non viene mandato all'AI." },
        { at: 0.68, label: "Un file aperto in Excel viene saltato, con un avviso: «chiudilo e rilancia»." },
      ]}
    >
      <div className="ck">
        <div className="ck__head mono"><span>File</span>{cols.map((c) => <span key={c}>{c}</span>)}<span>esito</span></div>
        {FILES.map((f, k) => {
          const done = scan > k + 1;
          const active = scan > k && scan <= k + 1;
          return (
            <div key={f.id} className={`ck__row${active ? " is-active" : ""}`}>
              <span className="ck__name"><FileIcon kind={f.kind} size={16} />{f.name}</span>
              {cols.map((c, j) => (
                <span key={c} className={`ck__cell${done || (active && (scan - k) * cols.length > j) ? " is-ok" : ""}`}>✓</span>
              ))}
              <span className={`ck__res mono${done ? " is-ok" : ""}`}>{done ? "ok" : active ? "…" : ""}</span>
            </div>
          );
        })}
        <div className={`ck__row ck__row--skip${skip ? " is-in" : ""}`}>
          <span className="ck__name"><FileIcon kind="XLSX" size={16} />offerta_aperta.xlsx</span>
          <span className="ck__cell is-ok">✓</span><span className="ck__cell is-ok">✓</span><span className="ck__cell is-ok">✓</span>
          <span className="ck__cell is-bad">✕</span><span className="ck__cell">·</span>
          <span className="ck__res mono is-warn">saltato</span>
        </div>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 03 lettura */

const XLSX_TEXT = "Foglio: Gennaio\nPeriodo | Imponibile | IVA 22% | Totale\n01/2025 | 48.320,00 | 10.630,40 | 58.950,40\nCredito precedente | 1.204,00\nIVA a debito | 9.426,40";

export function DemoLettura({ i }) {
  const t = useStationT(i);
  const lanes = [
    { k: "PDF", file: FILES[0], how: "mandato così com'è", out: "application/pdf · 184 KB", at: 0 },
    { k: "IMAGE", file: FILES[2], how: "rimpicciolita a 1400 px", out: "4032×3024 → 1400×1050 · JPEG · data URL", at: 0.25 },
    { k: "XLSX", file: FILES[3], how: "trasformato in testo", out: null, at: 0.5 },
    { k: "DOC", file: FILES[4], how: "convertito con LibreOffice", out: "preventivo (2).docx → testo", at: 0.75 },
  ];
  const lt = (a) => seg(t, a, a + 0.22);
  return (
    <Frame
      i={i}
      title="Lettura dei file"
      t={t}
      duration={10}
      steps={[
        { at: 0, label: "Un PDF viene mandato così com'è: l'AI lo sa leggere." },
        { at: 0.25, label: "Una foto viene rimpicciolita: pesa meno, ma si vede tutto." },
        { at: 0.5, label: "Word ed Excel vengono trasformati in testo semplice." },
        { at: 0.75, label: "I file vecchi (.doc, .xls, .numbers) vengono prima convertiti." },
      ]}
    >
      <div className="rd">
        {lanes.map((l) => {
          const v = lt(l.at);
          return (
            <div key={l.k} className={`rd__lane${t >= l.at ? " is-on" : ""}`}>
              <span className="rd__in"><FileIcon kind={l.k} />{l.file.name}</span>
              <span className="rd__pipe" aria-hidden="true"><i style={{ transform: `scaleX(${v})` }}></i></span>
              <span className="rd__how mono">{l.how}</span>
              <span className="rd__out mono">
                {l.k === "IMAGE" && <span className="rd__img"><i style={{ transform: `scaleX(${(1 - v * 0.65).toFixed(3)})` }}></i></span>}
                {l.out ? (v > 0.6 ? l.out : "…") : (
                  <>
                    <pre className="rd__txt">{typed(XLSX_TEXT, v)}</pre>
                    <span className="rd__count">{Math.round(v * 2184).toLocaleString("it-IT")} / 12.000 caratteri</span>
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 04 regole locali */

const POS_TEXT = [
  ["Piano Operativo di ", null], ["Sicurezza", "sicurezza"], [" (", null], ["POS", "pos"], [")\nCantiere: via Roma, ristrutturazione facciata\nImpresa esecutrice e responsabile della ", null],
  ["sicurezza", "sicurezza"], ["\nValutazione dei ", null], ["rischi", "rischi"], [": lavori in quota, ponteggi, movimentazione carichi.", null],
];

export function DemoRegole({ i }) {
  const t = useStationT(i);
  const hl = seg(t, 0.15, 0.45);
  const score = Math.round(seg(t, 0.5, 0.72) * 92);
  const moved = t >= FILES[1].lands[1]; // POS: the one file the local rules place, here
  const marks = POS_TEXT.filter((p) => p[1]).length;
  let mk = 0;
  const rules = [
    ["Match F24", "f24, codice tributo, inps", 0],
    ["Match fattura", "fattura, imponibile, iva", 0],
    ["Match computo metrico", "computo, mq, quantità", 0],
    ["Match sicurezza cantiere", "pos, psc, sicurezza, rischi", 92],
  ];
  return (
    <Frame
      i={i}
      title="Regole rapide · POS_cantiere_via_Roma.docx"
      t={t}
      duration={7}
      steps={[
        { at: 0, label: "Per Word ed Excel prova prima con delle regole scritte a mano." },
        { at: 0.15, label: "Trova «sicurezza», «POS» e «rischi»: è un piano di sicurezza." },
        { at: 0.5, label: "Il punteggio è 92, sopra la soglia di 80: la regola è sicura." },
        { at: 0.8, label: "Il file va nella sua cartella senza usare l'AI. Zero costi." },
      ]}
    >
      <div className="rl">
        <pre className="rl__doc">
          {POS_TEXT.map(([txt, key], k) => {
            if (!key) return <span key={k}>{txt}</span>;
            mk++;
            return <mark key={k} className={hl * marks >= mk ? "is-on" : ""}>{txt}</mark>;
          })}
        </pre>
        <div className="rl__rules">
          {rules.map(([name, words, sc]) => (
            <div key={name} className={`rl__rule${sc && score > 0 ? " is-hit" : ""}`}>
              <span className="rl__name">{name}</span>
              <span className="rl__words mono">{words}</span>
              <span className="rl__bar"><i style={{ width: `${sc ? score : 0}%` }}></i><b aria-hidden="true"></b></span>
              <span className="rl__score mono">{sc ? score : "—"}</span>
            </div>
          ))}
          <p className="rl__thr mono">soglia: 80 punti</p>
        </div>
        <p className={`rl__out mono${moved ? " is-in" : ""}`}>
          Classificato LOCAL: 04_CANTIERI_OPERATIVO/07_Sicurezza_Cantiere (92) - Match sicurezza cantiere
          <span className="pill">0 chiamate API</span>
        </p>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 05 modello */

const RESPONSE = "2025-03-14_Fattura_Rossi:Forniture___01_AMMINISTRAZIONE_FINANZA/02_Fatture_Passive";

export function DemoModello({ i }) {
  const t = useStationT(i);
  const folders = seg(t, 0.25, 0.45);
  const send = seg(t, 0.5, 0.6);
  const stream = seg(t, 0.62, 0.92);
  const lines = [
    ['"system"', '"Sei un assistente specializzato nell\'analisi rapida di documenti PDF per archivio digitale."'],
    ['"istruzioni"', '["Identifica se è una fattura, contratto, preventivo…", "Usa nomi del tipo: Anno-Mese-Giorno_TipoDocumento_DescrizioneBreve.", "Scegli UNA cartella tra quelle disponibili.", "NON inventare cartelle."]'],
    ['"formato_output"', '"NuovoNomeDelFile___CartellaDiDestinazione"'],
  ];
  return (
    <Frame
      i={i}
      title="Domanda all'intelligenza artificiale"
      t={t}
      duration={9}
      steps={[
        { at: 0, label: "Per ogni tipo di file c'è un messaggio già pronto per l'AI." },
        { at: 0.25, label: "Nel messaggio entra l'elenco delle tue cartelle." },
        { at: 0.5, label: "Il messaggio parte insieme al file." },
        { at: 0.62, label: "L'AI risponde con una riga: il nome nuovo e la cartella, separati da ___." },
      ]}
    >
      <div className="md">
        <div className="md__req">
          <p className="md__label mono">messaggio per l'AI · prompt_pdf.json</p>
          <pre className="md__json mono">
            {"{\n"}
            {lines.map(([k, v]) => <span key={k}>{"  "}<b>{k}</b>: {v},{"\n"}</span>)}
            {"  "}<b>"cartelle_disponibili"</b>: {folders < 0.05 ? <span className="md__auto">"__AUTO__"</span> : (
              <span className="md__list">[{"\n"}{FOLDERS.slice(0, Math.max(1, Math.round(folders * FOLDERS.length))).map((f) => `    "${f}",\n`)}  ]</span>
            )}
            {"\n}"}
          </pre>
          <div className="md__send"><i style={{ transform: `scaleX(${send})` }}></i><span className="mono">+ scan_fornitore_17.pdf · 184 KB</span></div>
        </div>
        <div className="md__res">
          <p className="md__label mono">risposta dell'AI</p>
          <pre className="md__stream mono">{typed(RESPONSE, stream)}</pre>
          {stream >= 1 && (
            <div className="md__split">
              <span><em>nome</em>2025-03-14_Fattura_Rossi:Forniture</span>
              <span className="md__sep mono">___</span>
              <span><em>cartella</em>01_AMMINISTRAZIONE_FINANZA/02_Fatture_Passive</span>
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 06 validazione */

function Checks({ list, k }) {
  return (
    <ul className="vl__checks">
      {list.map(([label, ok], j) => (
        <li key={label} className={k > j ? (ok ? "is-ok" : "is-bad") : ""}>
          <span aria-hidden="true">{k > j ? (ok ? "✓" : "✕") : "·"}</span>{label}
        </li>
      ))}
    </ul>
  );
}

export function DemoValidazione({ i }) {
  const t = useStationT(i);
  const a = seg(t, 0.05, 0.25) * 3;
  const b = seg(t, 0.32, 0.48) * 2;
  const repair = seg(t, 0.55, 0.72);
  const c = seg(t, 0.75, 0.92) * 3;
  return (
    <Frame
      i={i}
      title="Verifica della risposta"
      t={t}
      duration={9}
      steps={[
        { at: 0, label: "La risposta va bene solo se è una riga, con il separatore e una cartella che esiste." },
        { at: 0.32, label: "Qui l'AI ha risposto con una frase: così non si può usare." },
        { at: 0.55, label: "Allora le chiede di riscriverla nel formato giusto, e nient'altro." },
        { at: 0.75, label: "Ora va bene: il file va in DaRevisionare per un controllo a mano." },
      ]}
    >
      <div className="vl">
        <div className="vl__case">
          <p className="vl__file"><FileIcon kind="PDF" />scan_fornitore_17.pdf</p>
          <pre className="vl__raw mono">{RESPONSE}</pre>
          <Checks k={a} list={[["una sola riga", true], ['contiene "___"', true], ["la cartella è nella lista", true]]} />
        </div>
        <div className="vl__case">
          <p className="vl__file"><FileIcon kind="PDF" />Scansione0042.pdf</p>
          <pre className="vl__raw mono is-bad">Il documento è una scansione poco leggibile, potrebbe essere una fattura.</pre>
          <Checks k={b} list={[["una sola riga", true], ['contiene "___"', false]]} />
          <div className={`vl__repair${repair > 0 ? " is-in" : ""}`}>
            <span className="mono">seconda richiesta: «riscrivi solo nel formato giusto»</span>
            <i style={{ transform: `scaleX(${repair})` }}></i>
            <pre className="vl__raw mono">{typed("Scansione0042___DaRevisionare", seg(repair, 0.4, 1))}</pre>
          </div>
          {c > 0 && <Checks k={c} list={[["una sola riga", true], ['contiene "___"', true], ["la cartella è nella lista", true]]} />}
        </div>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 07 spostamento */

export function DemoSpostamento({ i }) {
  const t = useStationT(i);
  const san = seg(t, 0.04, 0.2);
  const dup = seg(t, 0.28, 0.45);
  const tries = t < 0.52 ? 0 : t < 0.6 ? 1 : 2;
  const moved = FILES.filter((f) => f.folder !== "DaRevisionare");
  // in its folder: already there if it landed at an earlier station (POS, at the rules), else from its moment here
  const landed = (f) => f.lands[0] < i || (f.lands[0] === i && t >= f.lands[1]);
  return (
    <Frame
      i={i}
      title="Archiviazione"
      t={t}
      duration={9}
      steps={[
        { at: 0, label: "Dal nome spariscono i simboli che Windows non accetta, come i due punti." },
        { at: 0.28, label: "Esiste già un file con lo stesso nome? Si aggiunge _1: nessun file viene cancellato." },
        { at: 0.5, label: "Il file è bloccato da un'anteprima aperta: riprova, fino a 6 volte." },
        { at: 0.72, label: "Ogni file entra nella sua cartella, con il nome nuovo." },
      ]}
    >
      <div className="mv">
        <div className="mv__ops">
          <div className="mv__op">
            <span className="mv__k mono">pulizia</span>
            <span className="mono">2025-03-14_Fattura_Rossi<s className={san > 0.5 ? "is-gone" : ""}>:</s>Forniture</span>
            <span className={`mv__ok${san >= 1 ? " is-in" : ""}`}>✓</span>
          </div>
          <div className="mv__op">
            <span className="mv__k mono">nome uguale</span>
            <span className="mono">2025-03-14_Fattura_RossiForniture<b className={dup > 0.5 ? "is-in" : ""}>_1</b>.pdf</span>
            <span className={`mv__ok${dup >= 1 ? " is-in" : ""}`}>✓</span>
          </div>
          <div className="mv__op">
            <span className="mv__k mono">bloccato</span>
            <span className="mv__tries">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <i key={n} className={n > tries ? "" : n === 1 ? "is-bad" : "is-ok"}>{n}</i>
              ))}
            </span>
            <span className="mono mv__note">{tries === 0 ? "" : tries === 1 ? "in uso da un altro programma" : "spostato al 2° tentativo"}</span>
          </div>
        </div>
        <ul className="mv__tree">
          {FOLDERS.filter((f) => f !== "DaRevisionare").map((folder) => {
            const inside = moved.filter((f) => f.folder === folder);
            return (
              <li key={folder}>
                <span className="mv__folder mono">▾ {folder}</span>
                {inside.map((f) => (
                  <span key={f.id} className={`mv__file${landed(f) ? " is-in" : ""}`}>
                    <FileIcon kind={f.kind} size={14} />{f.out}
                  </span>
                ))}
              </li>
            );
          })}
        </ul>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- 08 DaRevisionare */

const REASONS = [
  "nessuna estensione",
  "docx senza contenuto leggibile",
  "doc->docx ma testo vuoto",
  "xls->xlsx ma contenuto vuoto",
  "estensione non gestita: .zip",
  "output non valido",
  "repair fallito",
];

export function DemoRevisione({ i }) {
  const t = useStationT(i);
  const a = t >= FILES[7].lands[1];
  const b = t >= FILES[8].lands[1];
  const r = seg(t, 0.6, 0.95) * REASONS.length;
  return (
    <Frame
      i={i}
      title="Cartella DaRevisionare"
      t={t}
      duration={7}
      steps={[
        { at: 0, label: "Scansione0042.pdf finisce qui: l'AI non è riuscita a leggerla bene." },
        { at: 0.35, label: "verbale_vuoto.docx non contiene testo: entra con FAILED_ davanti al nome." },
        { at: 0.6, label: "Questi sono tutti i motivi possibili. Nessun file si perde." },
      ]}
    >
      <div className="rv">
        <div className="rv__folder">
          <p className="rv__path mono">▾ INPUT_FILES / DaRevisionare</p>
          <div className={`rv__file${a ? " is-in" : ""}`}><FileIcon kind="PDF" />Scansione0042.pdf<em>via repair</em></div>
          <div className={`rv__file${b ? " is-in" : ""}`}><FileIcon kind="DOCX" />FAILED_verbale_vuoto.docx<em>docx senza contenuto leggibile</em></div>
        </div>
        <div className="rv__reasons">
          <p className="rv__path mono">tutti i motivi possibili</p>
          {REASONS.map((x, k) => (
            <span key={x} className={`rv__reason mono${r > k ? " is-in" : ""}`}>{x}</span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
