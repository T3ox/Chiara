export const PREVIEW_MODE = true;
export const DEDUPE_STATUS = "planned"; // "planned" | "not_available" | "available"

const modeText = PREVIEW_MODE ? "Preview e conferma" : "Esecuzione diretta";

export const LANDING_CONTENT = {
  settings: {
    PREVIEW_MODE,
    DEDUPE_STATUS,
  },
  site: {
    productName: "FolderOrganizer AI",
    tagline: "Organizza i file in modo semplice, ordinato e coerente.",
    contactEmail: "contatti@folderorganizer.com",
  },
  nav: [
    { label: "Perché", href: "#perche" },
    { label: "Come funziona", href: "#come-funziona" },
    { label: "Confronto", href: "#confronto" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    eyebrow: "Per team che vogliono ordine e semplicità",
    title: "Metti ordine nei file senza stress, con\u00A0l'aiuto dell'AI",
    subtitle:
      "FolderOrganizer AI legge i file e suggerisce nomi e cartelle chiari, così tutti trovano tutto più in fretta.",
    bullets: [
      "Cosa fa: mette ordine ai file in base al contenuto.",
      "Per chi: chi lavora con foto, PDF, Office e archivi misti.",
      "Risultato: cartelle pulite e ricerca più veloce.",
    ],
    ctas: [
      { label: "Vedi prezzi", href: "/prezzi", variant: "solid" },
      { label: "Prova demo", href: "/demo", variant: "outline" },
    ],
    microcopy:
      "Si parte da una cartella piccola, si verifica il risultato, poi si allarga.",
    trustNote: modeText,
    trustStrip: ["Attenzione alla privacy", "Costi sotto controllo", "Libero di scegliere", "Si parte per gradi"],
    kpis: [
      { title: "Meno lavoro manuale", text: "Meno tempo perso a rinominare e spostare file." },
      { title: "Nomi più chiari", text: "Tutti usano lo stesso metodo, senza confusione." },
      { title: "Più controllo", text: "Si può vedere tutto prima di applicare." },
    ],
  },
  tools: {
    title: "Formati supportati",
    subtitle: "Immagini, PDF e Office: tutto quello che gestisci ogni giorno.",
    items: [
      { label: "Immagini", icon: "/img/file-icons/file-image.svg" },
      { label: "PDF", icon: "/img/file-icons/file-pdf.svg" },
      { label: "Word", icon: "/img/office/word.svg" },
      { label: "Excel", icon: "/img/office/excel.svg" },
      { label: "Outlook", icon: "/img/office/outlook.svg" },
      { label: "PowerPoint", icon: "/img/office/powerpoint.svg" },
    ],
  },
  why: {
    title: "Perché usarlo",
    intro:
      "Quando i file crescono, le regole rigide non bastano più. Serve un aiuto che capisca il contenuto.",
    pains: [
      "Nomi diversi per file simili, difficile trovare quello giusto.",
      "Cartelle doppie o poco usate che creano confusione.",
      "Ogni persona usa un metodo diverso.",
    ],
    useCases: [
      "foto, scan e documenti che arrivano da scanner, email o upload",
      "cartelle di download con nomi diversi e doppioni",
      "archivi misti dove ogni reparto ha il suo metodo",
    ],
    outcomes: [
      "Cartelle più ordinate e facili da capire.",
      "Meno errori quando si deve consegnare o controllare documenti.",
      "Continuità anche quando cambia chi lavora sui file.",
    ],
    limits: [
      "Se i file sono poco leggibili, i risultati possono essere meno precisi.",
      "Alcuni documenti ambigui richiedono una revisione manuale.",
      "Meglio partire con un piccolo test reale.",
    ],
    examples: {
      before: [
        "IMG_2048.jpg",
        "IMG_2051.jpg",
        "scan_finale(2).pdf",
        "scan_fornitore_17.pdf",
        "nuovo_documento.docx",
        "allegato_mail.msg",
        "report_v3_def.xlsx",
      ],
      after: [
        "Clienti/2025/Sopralluoghi/cliente-rossi-001.jpg",
        "Clienti/2025/Sopralluoghi/cliente-rossi-002.jpg",
        "Amministrazione/Fatture/2025/fattura-fornitore-17.pdf",
        "Amministrazione/Fatture/2025/fattura-fornitore-18.pdf",
        "Operativo/Procedure/procedura-onboarding.docx",
        "Comunicazioni/Email/allegato-cliente.msg",
        "Reporting/2025/report-mensile-finanza.xlsx",
      ],
    },
  },
  pillars: {
    title: "Come funziona in 3 pilastri",
    subtitle: "Tre elementi che trasformano una cartella disordinata in una struttura chiara e condivisa.",
    items: [
      {
        key: "see",
        name: "VEDI",
        tagline: "La fotografia della cartella",
        summary: "Analizza nomi, contenuti e metadati per capire cosa c'è davvero.",
        cta: "Scopri di più",
        ctaHref: "#come-funziona",
        details: [
          {
            title: "Mappa subito i file",
            body: "Identifica formati, temi ricorrenti e zone a rischio di confusione.",
          },
          {
            title: "Riduci il rumore",
            body: "Evidenzia duplicati, versioni e pattern incoerenti prima di toccare nulla.",
          },
        ],
      },
      {
        key: "ask",
        name: "CHIEDI",
        tagline: "Il copilota operativo",
        summary: "Descrivi a parole tue come vuoi i file e ottieni regole coerenti.",
        cta: "Scopri di più",
        ctaHref: "#come-funziona",
        details: [
          {
            title: "Chiedi in linguaggio naturale",
            body: "Scrivi poche righe su come vuoi organizzare le cartelle e l'AI interpreta la logica.",
          },
          {
            title: "Regole riutilizzabili",
            body: "Trasforma le richieste in criteri replicabili per team diversi.",
          },
        ],
      },
      {
        key: "act",
        name: "AGISCI",
        tagline: "Applica in sicurezza",
        summary: "Conferma prima di spostare e ottieni un output ordinato e verificabile.",
        cta: "Scopri di più",
        ctaHref: "/demo",
        details: [
          {
            title: "Anteprima chiara",
            body: "Vedi l'elenco delle modifiche e approva solo quando ti torna tutto.",
          },
          {
            title: "Output pronto per il team",
            body: "Cartelle standard, nomi coerenti e meno frizioni operative.",
          },
        ],
      },
    ],
  },
  how: {
    title: "Come funziona",
    subtitle: "Un percorso semplice e controllabile, passo dopo passo.",
    steps: [
      {
        title: "Installazione",
        detail: "Si installa l'app nel computer o nella macchina di servizio.",
        longDetail:
          "Prepariamo l'ambiente con i moduli necessari e verifichiamo accessi, permessi e prerequisiti. In questa fase si definisce anche dove risiederanno i log e come recuperare le informazioni in caso di problemi.",
      },
      {
        title: "Selezione perimetro",
        detail: "Si sceglie la cartella e si definisce il modo in cui vuoi i nomi.",
        longDetail:
          "Identifichiamo la cartella di lavoro, i file da escludere e le regole base di naming. Qui si stabilisce il linguaggio dei nomi, le cartelle principali e il livello di dettaglio atteso.",
      },
      {
        title: "Avvio run",
        detail: "Si avvia un test controllato con un elenco chiaro delle modifiche.",
        longDetail:
          "Eseguiamo una prima simulazione con anteprima completa: elenco file, nuove destinazioni e naming proposto. Serve a validare logica e impatto prima di applicare qualsiasi spostamento reale.",
      },
      {
        title: "Analisi AI",
        detail: "L'AI legge il contenuto e capisce come organizzarlo.",
        longDetail:
          "L'AI estrae metadati e contenuti essenziali per classificare i file. In caso di ambiguita, segnala i casi dubbiosi e propone alternative per evitare errori.",
      },
      {
        title: "Rinomina e spostamento",
        detail: "Applica i cambiamenti solo quando sei d'accordo.",
        longDetail:
          "Dopo la conferma, applica le modifiche in modo ordinato e tracciabile. A fine processo viene generato un riepilogo con cosa e' stato spostato e con quali regole.",
      },
    ],
    governance: [
      "È utile avere una persona di riferimento per i nomi e i controlli.",
      "Tenere traccia delle regole evita confusione nel tempo.",
      "Misurare cose semplici: file processati, errori, tempo di revisione.",
    ],
    notes: [
      "Usiamo OpenAI per capire il contenuto dei file.",
      "Vengono inviati solo i dati necessari (metadati o testo estratto).",
      "La precisione dipende dalla qualità dei file.",
      "Consigliamo sempre la modalità preview o un backup.",
      PREVIEW_MODE
        ? "Stato attuale: anteprima con conferma prima di applicare."
        : "Stato attuale: esecuzione diretta; fai un backup prima.",
    ],
  },
  comparison: {
    title: "Confronto con alternative",
    subtitle: "Confronto chiaro e semplice.",
    readingGuide:
      "Legenda: disponibile, non disponibile, oppure in arrivo.",
    columns: ["Feature", "Organizer tradizionali (regole statiche)", "Questo prodotto (AI sul contenuto)"],
    rows: [
      {
        feature: "Criterio di organizzazione",
        traditional: "Regole fisse su nome o estensione",
        product: "AI che legge contenuto e metadati",
      },
      {
        feature: "Riconoscimento documenti",
        traditional: "Limitato",
        product: "Capisce il contenuto",
      },
      {
        feature: "Naming intelligente",
        traditional: "Manuale o molto rigido",
        product: "Suggerimenti più coerenti",
      },
      {
        feature: "Gestione duplicati",
        key: "dedupe",
      },
    ],
  },
  faq: {
    title: "FAQ",
    subtitle: "Risposte semplici a dubbi comuni.",
    items: [
      {
        q: "Come incidono token e costi API?",
        a: "Dipende da quanti file e quanto testo viene analizzato. Meglio partire con un piccolo test.",
        tags: ["token", "costi", "openai"],
      },
      {
        q: "Quali dati vengono inviati a OpenAI?",
        a: "Solo i dati necessari per capire il contenuto (metadati o testo estratto).",
        tags: ["privacy", "dati", "openai"],
      },
      {
        q: "Quali file sono supportati?",
        a: "Di solito PDF, immagini e documenti Office. Dipende dalla configurazione scelta.",
        tags: ["file", "supporto", "formati"],
      },
      {
        q: "Quanto tempo richiede l'elaborazione?",
        a: "Dipende dal numero di file e dalla loro qualità. Conviene misurare su un test iniziale.",
        tags: ["tempi", "performance"],
      },
      {
        q: "È previsto rollback automatico?",
        a: "Non sempre. Se non disponibile, è meglio usare l'anteprima e fare un backup.",
        tags: ["rollback", "backup", "sicurezza"],
      },
      {
        q: "Quali requisiti OS servono?",
        a: "Windows con .NET, Python per l'analisi e accesso a OpenAI secondo le policy aziendali.",
        tags: ["requisiti", "os", "dotnet"],
      },
    ],
  },
  pricing: {
    title: "Prezzi",
    subtitle: "Piani indicativi. Il prezzo finale dipende dal caso reale.",
    qualification:
      "Il costo dipende da quanti file hai, dalla complessità e dal livello di controllo richiesto.",
    plans: [
      {
        name: "Free Demo",
        price: "0 EUR",
        label: "Placeholder",
        idealFor: "Per chi vuole capire se fa al caso suo.",
        points: ["Caso guidato con pochi file", "Verifica tecnica iniziale", "Nessun impegno"],
        cta: "Richiedi demo",
      },
      {
        name: "Pro",
        price: "Da definire",
        label: "Placeholder",
        idealFor: "Un team che ha bisogno di ordine costante.",
        points: ["Setup per un team", "Regole di base condivise", "Supporto iniziale"],
        cta: "Contatta vendite",
      },
      {
        name: "Team",
        price: "Da definire",
        label: "Placeholder",
        idealFor: "Più team con regole comuni.",
        points: ["Adozione multi-team", "Standard condivisi", "Roadmap chiara"],
        cta: "Parla con noi",
      },
    ],
  },
  demo: {
    title: "Demo",
    body:
      "Demo in arrivo con un esempio realistico. Nel frattempo puoi richiedere una sessione guidata.",
    includes: [
      "Panoramica semplice: cosa succede prima, durante e dopo.",
      "Esempio prima/dopo su cartella reale.",
      "Domande e risposte su privacy e costi.",
    ],
    cta: {
      label: "Prenota call demo",
      href: "mailto:contatti@folderorganizer.com?subject=Richiesta%20demo%20FolderOrganizer%20AI",
    },
  },
  footer: {
    lines: [
      "Privacy: inviamo solo i dati necessari e rispettiamo le policy interne.",
      "I risultati dipendono dalla qualità dei file.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/your-org/your-repo" },
      { label: "Contatti", href: "mailto:contatti@folderorganizer.com" },
    ],
  },
};
