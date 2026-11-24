import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeforeAfter from "../home/BeforeAfter";
import { Pipeline } from "../home/Diagrams";
import { DEMO_HREF, EMAIL } from "../journey/data";
import { JourneyStage } from "./Journey";

// three.js loads after the words are on screen; until then the hero's own ground stands in
const Warehouse = lazy(() => import("../home/Warehouse"));

function Logo() {
  return (
    <Link className="hud__logo" to="/" aria-label="FolderOrganizer">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="6" />
        <path d="M5 8.5h5.2l1.6 1.8H19v8.2H5z" />
      </svg>
      FolderOrganizer
    </Link>
  );
}

function Spec({ items }) {
  return (
    <dl className="spec mono">
      {items.map(([k, v]) => (
        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

const SHEET = [
  ["Dove gira", [
    ["sistema", "Windows"],
    ["programma", "Python · FolderOrganizer.py"],
    ["cartella da sistemare", "scelta all'avvio, o INPUT_FILES"],
    ["chiave OpenAI", "in un file .env sul computer"],
    ["formati vecchi", "serve LibreOffice"],
  ]],
  ["Lettura", [
    ["PDF", "inviato intero"],
    ["JPG, JPEG, PNG, WebP", "lato lungo ridotto a 1400 px"],
    ["DOCX", "testo, fino a 12.000 caratteri"],
    ["XLSX", "4 fogli × 30 righe × 12 colonne"],
    ["DOC, XLS, Numbers", "convertiti, poi letti"],
  ]],
  ["Decisione", [
    ["local_classify", "parole chiave, punteggio ≥ 80"],
    ["regole locali", "solo per Word ed Excel"],
    ["modello", "gpt-4.1-mini"],
    ["istruzioni", "prompt_<formato>.json"],
    ["risposta attesa", "una riga: Nome___Cartella"],
    ["repair_output_format", "una 2ª richiesta, max 40 token"],
  ]],
  ["Archiviazione", [
    ["destinazioni", "solo le sottocartelle che esistono"],
    ["sanitize_filename", '\\ / : * ? " < > |'],
    ["nome già presente", "_1, _2, …"],
    ["move_with_retry", "6 tentativi, 0,35 s tra uno e l'altro"],
    ["DaRevisionare", "creata se manca · prefisso FAILED_"],
    ["un errore su un file", "non ferma gli altri"],
  ]],
];

const FAQ = [
  ["I miei documenti finiscono su internet?", "All'intelligenza artificiale di OpenAI arriva solo il file da riconoscere e i nomi delle tue cartelle. Nient'altro. I file che le regole locali riconoscono da sole non lasciano il computer."],
  ["Quali file legge?", "PDF, Word (DOCX e DOC), Excel (XLSX e XLS), Numbers e foto (JPG, PNG, WebP). Per DOC, XLS e Numbers serve LibreOffice installato sul computer."],
  ["Può sostituire un file che ho già?", "No. Se nella cartella di arrivo c'è già un file con lo stesso nome, a quello nuovo aggiunge _1, poi _2. Il file che c'era resta com'è."],
  ["Cosa succede ai file che non capisce?", "Finiscono nella cartella DaRevisionare, e il programma scrive a schermo il motivo. Li guardi tu quando vuoi; intanto gli altri file vanno avanti."],
  ["E se un file è aperto in un altro programma?", "Lo salta e te lo dice. Il file resta dov'è, non viene toccato."],
  ["Crea cartelle nuove?", "No. Usa solo le cartelle che hai già. L'unica che crea, se manca, è DaRevisionare."],
  ["Cosa serve per usarlo?", "Un computer Windows. L'installazione e la configurazione le facciamo insieme durante la demo."],
  ["Quanto costa?", "Dipende da quanti file archivi: lo vediamo insieme sul tuo caso. L'uso dell'AI si paga a parte, file per file."],
];

export default function Home() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    document.title = "FolderOrganizer: ogni file dell'ufficio al suo posto, da solo";
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hm">
      <a className="skip" href="#come-funziona">Vai a come funziona</a>

      <header className={`nv${solid ? " is-solid" : ""}`}>
        <Logo />
        <nav className="nv__links" aria-label="Sezioni">
          <a href="#risultato">Il risultato</a>
          <a href="#come-funziona">Come funziona</a>
          <a href="#scheda">Scheda tecnica</a>
          <a href="#domande">Domande</a>
        </nav>
        <a className="btn btn--primary nv__cta" href={DEMO_HREF}>Richiedi una demo</a>
      </header>

      <main>
        {/* ---------------------------------------------------------------- hero */}
        <section className="hero" aria-labelledby="hero-h">
          <Suspense fallback={null}><Warehouse /></Suspense>
          <div className="hero__text">
            <h1 id="hero-h"><span>Ogni file</span> <span>al suo posto,</span> <span>da solo.</span></h1>
            <p className="hero__lead">
              FolderOrganizer legge i documenti del tuo ufficio, dà a ognuno un nome chiaro e lo archivia nella
              cartella giusta. Fatture, preventivi, foto di cantiere, fogli Excel: tu non sposti più niente a mano.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={DEMO_HREF}>Richiedi una demo <span aria-hidden="true">→</span></a>
              <a className="btn btn--ghost" href="#come-funziona">Guarda come funziona</a>
            </div>
            <ul className="hero__facts">
              <li>Legge PDF, Word, Excel e foto</li>
              <li>Usa le cartelle che hai già</li>
              <li>Funziona su Windows</li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- before / after */}
        <section className="sec" id="risultato" aria-labelledby="risultato-h">
          <div className="sec__head">
            <h2 id="risultato-h">Nove file entrano confusi. Escono con un nome e un posto.</h2>
            <p>
              Un esempio di quello che fa il programma: a sinistra la cartella com'è oggi, a destra com'è dopo.
              Passa sopra un file per seguirlo.
            </p>
          </div>
          <BeforeAfter />
          <dl className="tally">
            <div><dt className="mono">7</dt><dd>nella cartella giusta</dd></div>
            <div><dt className="mono">6</dt><dd>con un nome nuovo e chiaro</dd></div>
            <div><dt className="mono">1</dt><dd>sistemato senza usare l'AI</dd></div>
            <div className="is-warn"><dt className="mono">2</dt><dd>messi da parte, da guardare a mano</dd></div>
          </dl>
        </section>

        {/* ---------------------------------------------------------------- how it works: the journey, full screen,
            pinned while the page scrolls through its ten stations */}
        <JourneyStage embedded />

        {/* ---------------------------------------------------------------- never */}
        <section className="sec" id="garanzie" aria-labelledby="garanzie-h">
          <div className="sec__head">
            <h2 id="garanzie-h">Tre cose che non fa mai</h2>
          </div>
          <ul className="never">
            <li>
              <h3>Non inventa cartelle.</h3>
              <p>Usa solo quelle che hai già. L'unica che crea, se manca, è DaRevisionare.</p>
            </li>
            <li>
              <h3>Non sostituisce un file.</h3>
              <p>Se il nome esiste già aggiunge _1, poi _2. Il documento che c'era resta al suo posto.</p>
            </li>
            <li>
              <h3>Non tira a indovinare.</h3>
              <p>Quando non è sicuro, il file va in DaRevisionare e lo guardi tu. Gli altri intanto vanno avanti.</p>
            </li>
          </ul>
        </section>

        {/* ---------------------------------------------------------------- data sheet */}
        <section className="sec" id="scheda" aria-labelledby="scheda-h">
          <div className="sec__head">
            <h2 id="scheda-h">Per chi vuole i dettagli</h2>
            <p>Il funzionamento esatto: i nomi delle funzioni, i limiti, il modello usato.</p>
          </div>
          <Pipeline />
          <div className="sheet">
            {SHEET.map(([title, rows]) => (
              <div key={title} className="sheet__group">
                <h3>{title}</h3>
                <Spec items={rows} />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- how to start */}
        <section className="sec" id="inizio" aria-labelledby="inizio-h">
          <div className="sec__head">
            <h2 id="inizio-h">Si parte da una demo sulla tua cartella</h2>
            <p>Il prezzo dipende da quanti file archivi: lo vediamo insieme sul tuo caso. L'uso dell'AI si paga a parte, file per file.</p>
          </div>
          <ol className="start">
            <li>
              <span className="mono" aria-hidden="true">01</span>
              <h3>Demo guidata</h3>
              <p>La facciamo su una cartella vera, con i tuoi file. Vedi con i tuoi occhi come li rinomina e dove li mette.</p>
            </li>
            <li>
              <span className="mono" aria-hidden="true">02</span>
              <h3>Installazione</h3>
              <p>Lo installiamo e lo configuriamo noi sul computer Windows dell'ufficio, con l'elenco delle tue cartelle.</p>
            </li>
            <li>
              <span className="mono" aria-hidden="true">03</span>
              <h3>Uso</h3>
              <p>Scegli la cartella da sistemare e lo avvii. Alla fine ogni file ha il suo nome nuovo, nella sua cartella.</p>
            </li>
          </ol>
        </section>

        {/* ---------------------------------------------------------------- questions */}
        <section className="sec sec--narrow" id="domande" aria-labelledby="domande-h">
          <div className="sec__head">
            <h2 id="domande-h">Domande frequenti</h2>
          </div>
          <div className="faq">
            {FAQ.map(([q, a], k) => (
              <details key={q} open={k === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- close */}
        <section className="close" aria-labelledby="close-h">
          <h2 id="close-h"><span>Porta una cartella in disordine.</span> <span>Ti mostriamo com'è dopo.</span></h2>
          <div className="hero__actions">
            <a className="btn btn--primary" href={DEMO_HREF}>Richiedi una demo <span aria-hidden="true">→</span></a>
            <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <Logo />
        <p>
          © 2026 FolderOrganizer · <Link to="/percorso">Il percorso</Link> · <a href="/privacy">Privacy</a> · <a href="/termini">Termini</a> · <a href={`mailto:${EMAIL}`}>Contatti</a>
        </p>
        <p>I nomi e i loghi dei prodotti sono marchi dei rispettivi proprietari.</p>
      </footer>
    </div>
  );
}
