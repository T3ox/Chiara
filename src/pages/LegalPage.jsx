import { useEffect } from "react";
import { EMAIL } from "../journey/data";

const TEXT = {
  privacy: {
    title: "Privacy",
    intro: "Versione iniziale dell'informativa. Il testo legale definitivo la sostituirà.",
    blocks: [
      ["Come trattiamo i dati", [
        "Raccogliamo solo i dati che servono allo scopo dichiarato.",
        "A OpenAI arriva solo il contenuto del file da classificare e i nomi delle cartelle.",
        "L'accesso ai dati è limitato a chi ne ha bisogno.",
        "Conserviamo i dati solo per il tempo necessario.",
      ]],
      ["I tuoi diritti", [
        "Sapere quali dati trattiamo.",
        "Correggere i dati sbagliati.",
        "Chiederne la cancellazione, nei casi previsti.",
        "Chiedere di limitarne il trattamento.",
      ]],
    ],
  },
  termini: {
    title: "Termini",
    intro: "Versione preliminare dei termini di servizio. Il testo contrattuale definitivo la sostituirà.",
    blocks: [
      ["Uso del servizio", [
        "Uso consentito per scopi professionali.",
        "Chi usa il servizio risponde dei file che gli fa elaborare.",
        "L'uso segue le regole interne della tua organizzazione.",
      ]],
      ["Limiti e aggiornamenti", [
        "Funzioni e condizioni possono cambiare da una versione all'altra.",
        "Le personalizzazioni seguono accordi a parte.",
        "Ti avvisiamo dei cambiamenti importanti.",
      ]],
    ],
  },
};

export default function LegalPage({ kind }) {
  const t = TEXT[kind];
  useEffect(() => {
    document.title = `${t.title}: FolderOrganizer`;
    document.documentElement.classList.add("is-doc");
    return () => document.documentElement.classList.remove("is-doc");
  }, [t]);
  return (
    <main className="doc">
      <a className="doc__back" href="/">← Torna alla pagina principale</a>
      <h1>{t.title}</h1>
      <p className="doc__intro">{t.intro}</p>
      {t.blocks.map(([h, items]) => (
        <section key={h}>
          <h2>{h}</h2>
          <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
      ))}
      <p><a href={`mailto:${EMAIL}`}>Scrivici per una richiesta</a></p>
    </main>
  );
}
