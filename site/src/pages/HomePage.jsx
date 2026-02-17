import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";

const faqItems = [
  {
    title: "FolderOrganizer sostituisce i miei strumenti attuali?",
    content: "No, nasce per standardizzare il flusso documentale e puo convivere con strumenti gia presenti.",
  },
  {
    title: "E adatto solo a team grandi?",
    content: "No, anche team piccoli traggono vantaggio da processi piu ordinati e controllabili.",
  },
  {
    title: "Posso iniziare senza progetto complesso?",
    content: "Si, l'avvio e progressivo: si parte da un perimetro minimo e si estende per fasi.",
  },
];

const officeItems = [
  ["word.svg", "Word (.docx)"],
  ["excel.svg", "Excel (.xlsx)"],
  ["powerpoint.svg", "PowerPoint (.pptx)"],
  ["outlook.svg", "Outlook (.msg)"],
  ["onenote.svg", "OneNote (.one)"],
  ["access.svg", "Access (.accdb)"],
  ["publisher.svg", "Publisher (.pub)"],
];

export default function HomePage() {
  return (
    <>
      <section className="band band-hero" id="top">
        <div className="band-inner hero-layout">
          <div className="hero-copy fade-in reveal-on-scroll">
            <p className="eyebrow">FolderOrganizer per team operativi e funzioni aziendali</p>
            <h1>Meno caos documentale. Piu controllo operativo.</h1>
            <p className="lead">
              FolderOrganizer unifica raccolta file, revisione operativa e standard di consegna in un unico
              flusso. I team lavorano meglio, le revisioni sono piu rapide e l'output resta coerente in ogni fase.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-solid" to="/prezzi">Valuta l'offerta</Link>
              <Link className="btn btn-outline" to="/privacy">Approccio privacy-first</Link>
              <Link className="btn btn-outline" to="/accedi">Area accesso</Link>
            </div>
            <div className="trust-row" aria-label="Punti di valore">
              <span className="chip">Processo standard</span>
              <span className="chip">Operativita tracciabile</span>
              <span className="chip">Output uniformi</span>
              <span className="chip">Adozione progressiva</span>
            </div>
          </div>

          <div className="hero-visual fade-in reveal-on-scroll">
            <article className="card hero-process-diagram hover-lift">
              <h3>Framework operativo FolderOrganizer</h3>
              <div className="hero-flow-inline">
                <span className="hero-flow-chip">Input eterogenei</span>
                <span aria-hidden="true">&rarr;</span>
                <span className="hero-flow-chip">Revisione guidata</span>
                <span aria-hidden="true">&rarr;</span>
                <span className="hero-flow-chip">Output aziendale</span>
              </div>
              <p className="muted-note">
                L'obiettivo non e produrre piu documenti, ma produrre documenti migliori con meno passaggi
                ridondanti e maggiore affidabilita di contenuto.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band band-stats">
        <div className="band-inner">
          <ul className="stats-strip reveal-on-scroll" aria-label="Benefici principali">
            <li>
              <strong>Tempo operativo ridotto</strong>
              <span>Meno ricerca manuale e meno ricostruzioni a posteriori.</span>
            </li>
            <li>
              <strong>Qualita piu uniforme</strong>
              <span>Stesso standard di consegna indipendentemente da team o persona.</span>
            </li>
            <li>
              <strong>Controllo manageriale</strong>
              <span>Visibilita piu chiara su flussi, priorita e punti di blocco.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="band band-tools" aria-label="Programmi supportati">
        <div className="band-inner">
          <div className="tools-head reveal-on-scroll">
            <h2>Compatibile con i principali documenti Office</h2>
            <p className="muted-note">Automazione e standardizzazione su file operativi gia presenti nei team.</p>
          </div>
        </div>
        <div className="tools-carousel reveal-on-scroll" aria-hidden="true">
          <div className="tools-track">
            {[...officeItems, ...officeItems].map(([file, label], index) => (
              <article className="tool-card" key={`${file}-${index}`} aria-hidden={index >= officeItems.length}>
                <img src={`/img/office/${file}`} alt={index >= officeItems.length ? "" : label} loading="lazy" />
                <span>{label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="come-funziona">
        <div className="section-head reveal-on-scroll">
          <h2>Come funziona in pratica</h2>
          <p className="muted-note">Una sequenza operativa semplice, ripetibile e facile da introdurre nei processi esistenti.</p>
        </div>
        <div className="flow-diagram">
          <article className="card flow-node reveal-on-scroll hover-lift">
            <span className="flow-label">Step 1</span>
            <h3>Raccolta e centralizzazione</h3>
            <p>I materiali vengono acquisiti e ricondotti a una tassonomia comune.</p>
          </article>
          <div className="flow-arrow reveal-on-scroll" aria-hidden="true">&darr;</div>
          <article className="card flow-node reveal-on-scroll hover-lift">
            <span className="flow-label">Step 2</span>
            <h3>Validazione operativa</h3>
            <p>Il team verifica coerenza, completezza e priorita sui campi critici.</p>
          </article>
          <div className="flow-arrow reveal-on-scroll" aria-hidden="true">&darr;</div>
          <article className="card flow-node reveal-on-scroll hover-lift">
            <span className="flow-label">Step 3</span>
            <h3>Consegna standardizzata</h3>
            <p>Output pronti per condivisione interna, audit e comunicazione al cliente.</p>
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head reveal-on-scroll">
          <h2>Perche e diverso da strumenti generalisti</h2>
          <p className="muted-note">FolderOrganizer e focalizzato sulla qualita dell'esecuzione documentale, non su funzionalita dispersive.</p>
        </div>
        <div className="grid three">
          <article className="card reveal-on-scroll hover-lift">
            <h3>Non e un semplice archivio</h3>
            <p>Introduce regole operative e controlli, non solo spazio di archiviazione.</p>
          </article>
          <article className="card reveal-on-scroll hover-lift">
            <h3>Non e un CRM travestito</h3>
            <p>Lavora sul passaggio tecnico-operativo, non sulla gestione commerciale del funnel.</p>
          </article>
          <article className="card reveal-on-scroll hover-lift">
            <h3>E uno standard esecutivo</h3>
            <p>Rende ripetibili le consegne e trasferibile il know-how tra team.</p>
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head reveal-on-scroll">
          <h2>Governance, sicurezza e continuita</h2>
          <p className="muted-note">Scelte tecniche orientate a controllo, conformita interna e riduzione del rischio operativo.</p>
        </div>
        <div className="grid four">
          <article className="card reveal-on-scroll hover-lift">
            <h3>Contesto centralizzato</h3>
            <p>Strutture e metadati coerenti per evitare perdita di informazioni critiche.</p>
          </article>
          <article className="card reveal-on-scroll hover-lift">
            <h3>Tracciabilita decisionale</h3>
            <p>Le revisioni seguono uno schema chiaro e verificabile.</p>
          </article>
          <article className="card reveal-on-scroll hover-lift">
            <h3>Policy-ready</h3>
            <p>Impostazione adatta a team che operano con requisiti interni stringenti.</p>
          </article>
          <article className="card reveal-on-scroll hover-lift">
            <h3>Adozione graduale</h3>
            <p>Introduzione per step senza interrompere i processi in esercizio.</p>
          </article>
        </div>
      </section>

      <section className="section shell">
        <h2>Domande frequenti</h2>
        <Accordion items={faqItems} />
      </section>

      <section className="section shell final-cta">
        <div className="callout">
          <div>
            <h2>Vuoi valutare il fit operativo sul tuo contesto?</h2>
            <p>Partiamo da obiettivi concreti: tempi, qualita documentale e governance interna.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/prezzi">Richiedi proposta</Link>
            <Link className="btn btn-outline" to="/accedi">Accedi</Link>
          </div>
        </div>
      </section>
    </>
  );
}
