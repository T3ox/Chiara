import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hud from "../journey/Hud";

// three.js is most of the JavaScript: it loads in its own file after the words are on screen; until then the
// CSS ground of .scene3d stands in, so nothing on the page waits for it
const Scene3D = lazy(() => import("../journey/Scene3D"));
import { DEMO_HREF, EMAIL, FILES, STATIONS } from "../journey/data";
import { PLAY_TO, currentStation, emit, goToStation, state } from "../journey/engine";
import {
  DemoCartella, DemoControlli, DemoLettura, DemoModello, DemoRegole, DemoRevisione, DemoSpostamento, DemoValidazione,
  FileIcon, HeroTerminal,
} from "../journey/demos";

// the technical detail stays on the page for whoever wants it, folded away for everyone else
function Tech({ items }) {
  return (
    <details className="tech">
      <summary>Per i tecnici</summary>
      <dl className="spec mono">
        {items.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </details>
  );
}

function Station({ id, title, lead, tech, demo }) {
  return (
    <section className="st" id={id} aria-labelledby={`${id}-h`}>
      <div className="st__text">
        <h2 id={`${id}-h`}>{title}</h2>
        <p className="st__lead">{lead}</p>
        {tech && <Tech items={tech} />}
      </div>
      <div className="st__demo">{demo}</div>
    </section>
  );
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/*
  Stations do not just slide: as one leaves on the left its words rise and its demo sinks, both fading, so they
  are gone before they reach the HUD's station number; the next one comes up from below as it arrives.
  rel is the station's left edge in screens from the screen's left edge (0: aligned, -1: just gone, 1: just off right).
*/
function placeStations(parts) {
  parts.forEach((part, i) => {
    const s = state.stations[i];
    if (!s || !part.text || !part.demo) return;
    const rel = (s.left - state.x) / state.vw;
    let o = 1;
    let up = 0;
    let down = 0;
    if (rel < -1.5 || rel > 1.5) {
      // far off screen: the end values of each branch, written once and then skipped by the cache below
      o = rel < 0 ? 0 : 0.2;
      up = rel < 0 ? -110 : 50;
      down = rel < 0 ? 140 : 90;
    } else if (rel < PLAY_TO) {
      // the exit starts once the demo has played to its end; eased, so it goes quickly once it starts
      const k = clamp01((PLAY_TO - rel) / 0.25);
      o = 1 - k * k;
      up = -k * 110;
      down = k * 140;
    } else if (rel > 0.5) {
      const k = clamp01((rel - 0.5) / 0.5);
      o = 1 - k * 0.8;
      up = k * 50;
      down = k * 90;
    }
    // reduced motion: the stations only fade, nothing rises or sinks
    const travel = reducedMotion.matches ? 0 : 1;
    const key = `${o.toFixed(3)}|${(up * travel).toFixed(1)}|${(down * travel).toFixed(1)}`;
    if (key === part.last) return;
    part.last = key;
    part.text.style.transform = `translate3d(0, ${(up * travel).toFixed(1)}px, 0)`;
    part.demo.style.transform = `translate3d(0, ${(down * travel).toFixed(1)}px, 0)`;
    part.text.style.opacity = part.demo.style.opacity = o.toFixed(3);
  });
}
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/*
  The journey itself. On its own page (/percorso) it is the whole page; `embedded`, it is one section of the home
  page: the same sticky screen, pinned while the page scrolls through it, with the 3D scene and the HUD inside it
  instead of fixed to the window, so they come and go with the section.
*/
export function JourneyStage({ embedded = false }) {
  const wrap = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const stationEls = useRef([]);
  const stationParts = useRef([]);

  const measure = useCallback(() => {
    const tr = track.current;
    if (!tr) return;
    state.vw = window.innerWidth;
    state.vh = window.innerHeight;
    stationEls.current = [...tr.children].filter((c) => c.classList.contains("st"));
    // a fresh part (last: "") per station, so a resize re-applies every value
    stationParts.current = stationEls.current.map((el) => ({
      text: el.querySelector(":scope > .st__text"),
      demo: el.querySelector(":scope > .st__demo"),
      last: "",
    }));
    stationParts.current.forEach((part) => (part.last = ""));
    state.stations = stationEls.current.map((c) => ({ left: c.offsetLeft, width: c.offsetWidth }));
    state.max = Math.max(1, tr.scrollWidth - state.vw);
    wrap.current.style.height = `${state.max + state.vh}px`;
  }, []);

  useLayoutEffect(() => {
    let alive = true;
    // one place reads the scroll and moves the track; everything else listens to the store.
    // Browsers already fire scroll once per frame, so it runs straight in the handler.
    const sync = () => {
      if (!alive) return;
      state.top = embedded ? wrap.current.getBoundingClientRect().top + window.scrollY : wrap.current.offsetTop;
      state.x = Math.min(state.max, Math.max(0, window.scrollY - state.top));
      track.current.style.transform = `translate3d(${-state.x}px,0,0)`;
      placeStations(stationParts.current);
      emit();
    };
    const onScroll = sync;
    const onResize = () => {
      if (!alive) return;
      measure();
      sync();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // the fonts change every text width: measure again once they are in
    document.fonts?.ready.then(onResize);
    // a link from the home page can point at one station (/percorso#lettura): start there
    const wanted = STATIONS.findIndex((s) => `#${s.id}` === window.location.hash);
    if (!embedded && wanted > 0) goToStation(wanted, false);
    return () => {
      alive = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [measure, embedded]);

  /*
    The sticky viewport clips with overflow: hidden, but the browser can still scroll it sideways to reveal
    something: Tab onto a button in another station, Ctrl+F landing on a word, the skip link, an #anchor.
    That would show another station while the page, the HUD and the 3D still think they are where they were.
    One guard for all of them: whenever the viewport is scrolled, hand the offset back to the page scroll,
    which moves the track to the same place, and reset the viewport. The revealed element stays on screen.
  */
  useEffect(() => {
    const view = viewport.current;
    const onViewportScroll = () => {
      const dx = view.scrollLeft;
      const dy = view.scrollTop;
      if (!dx && !dy) return;
      view.scrollLeft = 0;
      view.scrollTop = 0;
      window.scrollTo({ top: state.top + Math.min(state.max, state.x + dx), behavior: "auto" });
    };
    view.addEventListener("scroll", onViewportScroll);
    return () => view.removeEventListener("scroll", onViewportScroll);
  }, []);

  /*
    Sideways input moves the journey too, because sideways is the way it goes: a horizontal wheel or a two-finger
    swipe on a trackpad, Shift + wheel, a finger dragged across a phone. All of it becomes page scroll, so there
    is still one position, and past the last station the page simply carries on.
  */
  useEffect(() => {
    const view = viewport.current;
    const move = (px) => window.scrollBy({ top: px, behavior: "instant" });
    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      move(e.deltaX * (e.deltaMode === 1 ? 32 : 1));
    };
    let x0 = 0;
    let y0 = 0;
    let last = 0;
    let dir = "";
    const onStart = (e) => {
      const p = e.touches[0];
      x0 = last = p.clientX;
      y0 = p.clientY;
      dir = "";
    };
    const onMove = (e) => {
      const p = e.touches[0];
      if (!dir) {
        const dx = Math.abs(p.clientX - x0);
        const dy = Math.abs(p.clientY - y0);
        if (dx < 8 && dy < 8) return;
        dir = dx > dy ? "x" : "y";
        last = p.clientX;
      }
      if (dir !== "x") return;
      if (e.cancelable) e.preventDefault();
      move(last - p.clientX);
      last = p.clientX;
    };
    view.addEventListener("wheel", onWheel, { passive: false });
    view.addEventListener("touchstart", onStart, { passive: true });
    view.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      view.removeEventListener("wheel", onWheel);
      view.removeEventListener("touchstart", onStart);
      view.removeEventListener("touchmove", onMove);
    };
  }, []);

  // left and right arrows jump between stations; the rest of the keyboard scrolls as usual
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      if (embedded) {
        // on the home page the arrows belong to the journey only while it fills the screen
        const box = wrap.current.getBoundingClientRect();
        if (box.top > 1 || box.bottom < window.innerHeight - 1) return;
      }
      if (e.key === "ArrowRight") { e.preventDefault(); goToStation(Math.min(9, currentStation() + 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goToStation(Math.max(0, currentStation() - 1)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embedded]);

  const first = embedded ? (
    <section className="st st--hero" id="start" aria-labelledby="start-h">
      <div className="st__text">
        <h2 id="start-h">Cosa succede a ogni file, tappa per tappa</h2>
        <p className="st__lead">
          Ogni file fa la stessa strada, uno alla volta. Segui nove file dentro il programma: a ogni tappa il
          riquadro riproduce quello che succede davvero.
        </p>
        <div className="st__actions">
          <button type="button" className="btn btn--primary" onClick={() => goToStation(1)}>Inizia il percorso <span aria-hidden="true">→</span></button>
          <a className="btn btn--ghost" href="#garanzie">Salta il percorso</a>
        </div>
        <p className="st__how">Scorri in giù o di lato per avanzare. Con i tasti <kbd>←</kbd> <kbd>→</kbd> salti da una tappa all'altra.</p>
      </div>
      <div className="st__demo"><HeroTerminal /></div>
    </section>
  ) : (
    <section className="st st--hero" id="start" aria-labelledby="start-h">
      <div className="st__text">
        <h1 id="start-h">FolderOrganizer mette in ordine i file del tuo ufficio, da solo</h1>
        <p className="st__lead">
          Prende una cartella piena di file sparsi, li legge, dà a ognuno un nome chiaro e lo mette nella
          cartella giusta. Scorri e segui 9 file, tappa per tappa.
        </p>
        <div className="st__actions">
          <button type="button" className="btn btn--primary" onClick={() => goToStation(1)}>Inizia il percorso <span aria-hidden="true">→</span></button>
          <a className="btn btn--ghost" href={DEMO_HREF}>Richiedi una demo</a>
        </div>
        <ul className="stack" aria-label="In breve">
          <li>Legge PDF, Word, Excel e foto</li><li>Usa l'intelligenza artificiale di OpenAI</li><li>Funziona su Windows</li>
        </ul>
      </div>
      <div className="st__demo"><HeroTerminal /></div>
    </section>
  );

  const last = embedded ? (
    <section className="st st--end" id="arrivo" aria-labelledby="arrivo-h">
      <div className="st__text">
        <h2 id="arrivo-h">Nove file, ognuno al suo posto</h2>
        <dl className="sum">
          <div><dt className="mono">7</dt><dd>nella cartella giusta</dd></div>
          <div><dt className="mono">6</dt><dd>con un nome nuovo e chiaro</dd></div>
          <div><dt className="mono">1</dt><dd>sistemato senza usare l'AI</dd></div>
          <div><dt className="mono">2</dt><dd>da guardare a mano</dd></div>
        </dl>
        <div className="st__actions">
          <a className="btn btn--primary" href={DEMO_HREF}>Richiedi una demo <span aria-hidden="true">→</span></a>
          <button type="button" className="btn btn--ghost" onClick={() => goToStation(0)}>Rifai il percorso</button>
        </div>
      </div>
      <div className="st__demo">
        <div className="ba" aria-label="Prima e dopo">
          <div className="ba__col">
            <p className="ba__h mono">prima</p>
            {FILES.map((f) => <span key={f.id} className="ba__f"><FileIcon kind={f.kind} size={14} />{f.name}</span>)}
          </div>
          <div className="ba__col ba__col--after">
            <p className="ba__h mono">dopo</p>
            {FILES.map((f) => (
              <span key={f.id} className={`ba__f${f.folder === "DaRevisionare" ? " is-warn" : ""}`}>
                <FileIcon kind={f.kind} size={14} />
                <span><em className="mono">{f.folder.split("/").pop()}/</em>{f.out}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="st st--end" id="arrivo" aria-labelledby="arrivo-h">
      <div className="st__text">
        <h2 id="arrivo-h">Nove file, ognuno al suo posto</h2>
        <dl className="sum">
          <div><dt className="mono">7</dt><dd>nella cartella giusta</dd></div>
          <div><dt className="mono">6</dt><dd>con un nome nuovo e chiaro</dd></div>
          <div><dt className="mono">1</dt><dd>sistemato senza usare l'AI</dd></div>
          <div><dt className="mono">2</dt><dd>da guardare a mano</dd></div>
        </dl>
        <div className="st__actions">
          <a className="btn btn--primary" href={DEMO_HREF}>Richiedi una demo <span aria-hidden="true">→</span></a>
          <button type="button" className="btn btn--ghost" onClick={() => goToStation(0)}>Rifai il percorso</button>
        </div>
      </div>
      <div className="st__demo">
        <div className="ba" aria-label="Prima e dopo">
          <div className="ba__col">
            <p className="ba__h mono">prima</p>
            {FILES.map((f) => <span key={f.id} className="ba__f"><FileIcon kind={f.kind} size={14} />{f.name}</span>)}
          </div>
          <div className="ba__col ba__col--after">
            <p className="ba__h mono">dopo</p>
            {FILES.map((f) => (
              <span key={f.id} className={`ba__f${f.folder === "DaRevisionare" ? " is-warn" : ""}`}>
                <FileIcon kind={f.kind} size={14} />
                <span><em className="mono">{f.folder.split("/").pop()}/</em>{f.out}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="faq">
          <details open><summary>I miei documenti finiscono su internet?</summary><p>All'intelligenza artificiale arriva solo il file da riconoscere e i nomi delle tue cartelle. Nient'altro.</p></details>
          <details><summary>Cosa serve per usarlo?</summary><p>Un computer Windows. L'installazione e la configurazione le facciamo insieme durante la demo.</p></details>
          <details><summary>Quanto costa?</summary><p>Dipende da quanti file archivi: lo vediamo insieme sul tuo caso. L'uso dell'AI si paga a parte, file per file.</p></details>
        </div>
        <p className="legal">
          © 2026 FolderOrganizer · <Link to="/">Pagina principale</Link> · <a href="/privacy">Privacy</a> · <a href="/termini">Termini</a> · <a href={`mailto:${EMAIL}`}>Contatti</a>
          <br />I nomi e i loghi dei prodotti sono marchi dei rispettivi proprietari.
        </p>
      </div>
    </section>
  );

  const stations = (
    <div className="jr__sticky" ref={viewport}>
      <div className="jr__track" ref={track}>
        {first}
        <Station
          id="cartella"
          title="Si parte da una cartella piena di file sparsi"
          lead="Fatture, foto, preventivi, fogli Excel: tutto mescolato, con nomi che non dicono niente. FolderOrganizer usa solo le cartelle che hai già, e non ne inventa di nuove."
          tech={[["cartella d'ingresso", "sys.argv[1] o INPUT_FILES"], ["destinazioni", "le sottocartelle esistenti"], ["DaRevisionare", "ensure_result_folders()"]]}
          demo={<DemoCartella i={1} />}
        />
        <Station
          id="controlli"
          title="Prima controlla che ogni file si possa aprire"
          lead="Se un file è vuoto, non ha un tipo riconoscibile o è aperto in un altro programma, lo salta e te lo dice. Così non perde tempo e non spreca soldi."
          tech={[["is_file_safe_to_read", "esiste · file · > 0 byte"], ["is_windows_file_locked", "salta e avvisa"], ["senza estensione", "→ DaRevisionare"]]}
          demo={<DemoControlli i={2} />}
        />
        <Station
          id="lettura"
          title="Poi legge ogni file, come farebbe una persona"
          lead="Un PDF lo legge così com'è, una foto la guarda, un Word o un Excel lo trasforma in testo. I file nei formati vecchi li converte prima."
          tech={[["testo massimo", "12.000 caratteri"], ["Excel", "4 fogli × 30 righe × 12 colonne"], ["foto", "ridotte a 1400 px"]]}
          demo={<DemoLettura i={3} />}
        />
        <Station
          id="regole"
          title="Se la risposta è ovvia, decide da solo"
          lead="Un documento che parla di «sicurezza» e «rischi» in cantiere è un piano di sicurezza: non serve chiedere all'intelligenza artificiale. Più veloce, e gratis."
          tech={[["local_classify", "parole chiave + regex"], ["soglia", "punteggio ≥ 80"], ["solo per", "Word ed Excel"]]}
          demo={<DemoRegole i={4} />}
        />
        <Station
          id="modello"
          title="Per gli altri file chiede all'intelligenza artificiale"
          lead="Le manda il file con una richiesta precisa: dimmi che documento è, dagli un nome con data e tipo, e scegli una delle mie cartelle."
          tech={[["modello", "gpt-4.1-mini"], ["istruzioni", "prompt_<formato>.json"], ["risposta", "Nome___Cartella"]]}
          demo={<DemoModello i={5} />}
        />
        <Station
          id="validazione"
          title="Controlla la risposta prima di fidarsi"
          lead="Se l'AI risponde in modo confuso, le chiede di riscrivere la risposta nel formato giusto. Se ancora non va, il file resta da guardare a mano."
          tech={[["controlli", "1 riga · ___ · cartella esiste"], ["seconda richiesta", "max 40 token"], ["se fallisce", "DaRevisionare"]]}
          demo={<DemoValidazione i={6} />}
        />
        <Station
          id="spostamento"
          title="Gli dà il nome nuovo e lo mette al suo posto"
          lead="Toglie dal nome i simboli che Windows non accetta, non cancella mai un file con lo stesso nome e, se il file è bloccato, riprova."
          tech={[["sanitize_filename", '\\ / : * ? " < > |'], ["nomi uguali", "_1, _2, …"], ["move_with_retry", "6 tentativi · 0,35 s"]]}
          demo={<DemoSpostamento i={7} />}
        />
        <Station
          id="revisione"
          title="Quello che non capisce, lo mette da parte"
          lead="Niente si perde: i file dubbi finiscono nella cartella DaRevisionare con il motivo scritto, e il programma va avanti con gli altri."
          tech={[["move_to_revision", "prefisso FAILED_"], ["un errore", "non ferma mai il run"]]}
          demo={<DemoRevisione i={8} />}
        />
        {last}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <section className="jr jr--embed" id="come-funziona" ref={wrap} aria-labelledby="start-h">
        <div className="jr__pin">
          <Suspense fallback={<div className="scene3d" aria-hidden="true"></div>}>
            <Scene3D />
          </Suspense>
          {stations}
          <Hud embedded />
        </div>
      </section>
    );
  }
  return (
    <>
      <a className="skip" href="#arrivo">Vai alla fine del percorso</a>
      <Suspense fallback={<div className="scene3d" aria-hidden="true"></div>}>
        <Scene3D />
      </Suspense>
      <Hud />
      <main className="jr" ref={wrap}>{stations}</main>
    </>
  );
}

export default function Journey() {
  useEffect(() => {
    document.title = "FolderOrganizer: il percorso di un file, dalla cartella in disordine alla cartella giusta";
  }, []);
  return <JourneyStage />;
}
