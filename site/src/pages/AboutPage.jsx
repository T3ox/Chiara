/**
 * AboutPage — pagina "Chi siamo".
 *
 * Presenta il team, la missione e i valori dietro FolderOrganizer AI.
 * Costruisce fiducia e credibilità mostrando chi c'è dietro il prodotto.
 */
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import usePageMeta from "../hooks/usePageMeta";

const VALUES = [
  {
    title: "Trasparenza",
    text: "Ogni azione del software è visibile e verificabile. Nessuna modifica avviene senza la tua conferma esplicita.",
  },
  {
    title: "Semplicità",
    text: "Strumenti potenti non devono essere complicati. Progettiamo interfacce che chiunque può usare dal primo giorno.",
  },
  {
    title: "Privacy first",
    text: "I tuoi file restano tuoi. Inviamo solo i dati strettamente necessari all'analisi, mai file completi.",
  },
  {
    title: "Miglioramento continuo",
    text: "Ascoltiamo il feedback degli utenti e rilasciamo aggiornamenti regolari basati su esigenze reali.",
  },
];

const MILESTONES = [
  {
    period: "L'idea",
    text: "Nasce dall'esigenza concreta di organizzare archivi documentali cresciuti senza standard condivisi.",
  },
  {
    period: "Il prototipo",
    text: "Primo motore di classificazione AI testato su archivi reali con centinaia di file misti.",
  },
  {
    period: "Oggi",
    text: "Un prodotto completo per Windows e macOS, con supporto multi-formato e anteprima prima di ogni modifica.",
  },
  {
    period: "Domani",
    text: "Governance multi-team, integrazioni cloud e gestione intelligente dei duplicati.",
  },
];

export default function AboutPage() {
  usePageMeta({ title: "Chi siamo", description: "Il team dietro FolderOrganizer AI. Missione, valori e il percorso del prodotto." });
  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Chi siamo</h1>
        <p className="lead">
          Siamo un team che crede nell'ordine digitale come strumento di produttività.
          {siteConfig.brandName} AI nasce per risolvere un problema che conosciamo bene:
          archivi che crescono senza controllo.
        </p>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>La nostra missione</h2>
            <p>
              Aiutare team e professionisti a trasformare archivi caotici in strutture
              ordinate, comprensibili e mantenibili nel tempo. Non sostituiamo il giudizio
              umano: lo potenziamo con l'intelligenza artificiale, mantenendo sempre il
              controllo nelle mani dell'utente.
            </p>
            <p>
              Crediamo che l'organizzazione dei file non debba richiedere ore di lavoro
              manuale né regole rigide impossibili da mantenere. Serve uno strumento che
              capisca il contenuto e proponga soluzioni coerenti.
            </p>
          </article>

          <article className="card">
            <h2>Come lavoriamo</h2>
            <p>
              Sviluppiamo in cicli brevi, rilasciando funzionalità testate su casi d'uso
              reali. Ogni decisione di prodotto parte da un problema concreto segnalato
              da chi usa il software ogni giorno.
            </p>
            <p>
              Il codice sorgente è ospitato su GitHub. Manteniamo standard elevati di
              qualità, sicurezza e documentazione. Ogni release viene testata su archivi
              di diverse dimensioni e complessità prima del rilascio.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="band-inner">
          <div className="section-head">
            <h2>I nostri valori</h2>
            <p className="muted-note">I principi che guidano ogni decisione di prodotto.</p>
          </div>
          <div className="grid four values-grid">
            {VALUES.map((value) => (
              <article className="card hover-lift" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <h2>Il percorso</h2>
        <div className="timeline">
          {MILESTONES.map((milestone) => (
            <div className="timeline-item" key={milestone.period}>
              <div className="timeline-marker">
                <span className="badge">{milestone.period}</span>
              </div>
              <p>{milestone.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Vuoi saperne di più?</h2>
            <p>Contattaci per qualsiasi domanda sul prodotto, sul team o sulle possibilità di collaborazione.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/contatti">Contattaci</Link>
            <Link className="btn btn-outline" to="/demo">Richiedi demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
