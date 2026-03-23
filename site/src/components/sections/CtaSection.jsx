/**
 * CtaSection — banner finale di invito all'azione.
 *
 * Appare subito prima del footer, dopo le FAQ, come ultima opportunità
 * per spingere l'utente verso la demo o i prezzi.
 *
 * Layout: titolo grande + sottotitolo + due bottoni (primario e secondario).
 * Sfondo tinto con il colore primary per distinguersi dalla sezione FAQ sopra.
 */
import { Link } from "react-router-dom";
import { LANDING_CONTENT } from "../../data/landingContent";

export default function CtaSection() {
  return (
    <section className="band band-cta" aria-label="Invito all'azione">
      <div className="band-inner cta-inner reveal-on-scroll">
        <div className="cta-copy">
          <h2>Pronto a mettere ordine?</h2>
          <p className="lead">
            Richiedi una sessione guidata gratuita e scopri come{" "}
            {LANDING_CONTENT.site.productName} può semplificare il tuo archivio
            in meno di un'ora.
          </p>
        </div>

        <div className="cta-actions">
          {/* CTA primaria: va alla pagina demo */}
          <Link className="btn btn-solid" to="/demo">
            Richiedi demo gratuita
          </Link>
          {/* CTA secondaria: va ai prezzi */}
          <Link className="btn btn-outline cta-outline" to="/prezzi">
            Vedi i piani
          </Link>
        </div>

        {/* Nota rassicurante sotto i bottoni */}
        <p className="muted-note cta-note">{LANDING_CONTENT.hero.microcopy}</p>
      </div>
    </section>
  );
}
