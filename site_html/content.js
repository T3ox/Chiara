const PREVIEW_MODE = true;
const DEDUPE_STATUS = "planned"; // "planned" | "not_available" | "available"

const modeText = PREVIEW_MODE ? "Preview e conferma" : "Esecuzione diretta";

const LANDING_CONTENT = {
  settings: {
    PREVIEW_MODE,
    DEDUPE_STATUS,
  },
  site: {
    productName: "FolderOrganizer AI",
    tagline: "Standard operativo per organizzazione file aziendale con AI.",
    contactEmail: "contatti@folderorganizer.com",
    previewModeText: "Flusso preview/confirm per validare prima delle modifiche",
    executionModeText: "Flusso a esecuzione diretta con policy definite",
  },
  nav: [
    { label: "Perché", href: "#perche" },
    { label: "Come funziona", href: "#come-funziona" },
    { label: "Confronto", href: "#confronto" },
    { label: "FAQ", href: "#faq" },
    { label: "Prezzi", href: "#prezzi" },
    { label: "Demo", href: "#demo" },
  ],
  hero: {
    eyebrow: "Soluzione per team operativi, backoffice e amministrazione",
    title: "Organizzazione file con AI per ridurre caos e tempi di gestione documentale",
    subtitle:
      "FolderOrganizer AI analizza contenuto e metadati per proporre naming e strutture cartelle coerenti con processi reali.",
    bullets: [
      "Cosa fa: classifica, rinomina e sposta file in base al contenuto.",
      "Per chi: team che gestiscono foto, scan, PDF, Office e archivi misti.",
      "Risultato: output più ordinato, ricerca più rapida, controllo operativo migliore.",
    ],
    ctas: [
      { label: "Vedi prezzi", href: "#prezzi", variant: "solid" },
      { label: "Prova demo", href: "#demo", variant: "outline" },
    ],
    microcopy:
      "Implementazione progressiva: parti da una cartella pilota, misuri l'impatto, poi estendi.",
    trustNote: modeText,
    trustStrip: [
      "Privacy-first",
      "Costi API monitorabili",
      "Nessun lock-in tecnico",
      "Adozione graduale",
    ],
    kpis: [
      { title: "Riduzione attività manuali", text: "Meno rinomina e spostamenti ripetitivi." },
      { title: "Controllo naming", text: "Regole e output allineati tra persone e team." },
      { title: "Tracciabilità", text: "Flusso verificabile prima del rollout su larga scala." },
    ],
  },
  why: {
    title: "Perché usarlo",
    intro:
      "Gli organizer tradizionali basati solo su regole statiche spesso non gestiscono bene varianti reali dei file.",
    pains: [
      "Nomi file incoerenti che rallentano ricerca e verifica.",
      "Cartelle duplicate o semivuote difficili da manutenere.",
      "Standard diversi tra persone, team e sedi operative.",
    ],
    useCases: [
      "foto/scan/documenti lavoro provenienti da scanner, email e upload manuali",
      "download folder con nomi incoerenti e versioni duplicate",
      "archivi misti con naming diverso tra reparti",
    ],
    outcomes: [
      "Struttura cartelle più leggibile e ripetibile nel tempo.",
      "Riduzione errori in consegna documentale e audit interno.",
      "Maggiore continuità operativa quando cambia il personale.",
    ],
    limits: [
      "Qualità OCR bassa o metadati assenti riducono accuratezza.",
      "Documenti ambigui richiedono revisione manuale o regole dedicate.",
      "Consigliato pilot su campione reale prima della scalabilità.",
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
  how: {
    title: "Come funziona",
    subtitle: "Flusso semplice, verificabile e orientato a contesti aziendali.",
    steps: [
      {
        title: "Installazione",
        detail: "Installo app .NET nel contesto previsto (utente o macchina di servizio).",
      },
      {
        title: "Selezione perimetro",
        detail: "Scelgo cartella sorgente, regole minime e convenzioni di naming attese.",
      },
      {
        title: "Avvio run",
        detail: "Lancio analisi su batch controllato con logging delle operazioni candidate.",
      },
      {
        title: "Analisi AI",
        detail: "L'AI interpreta contenuto e metadati per classificazione contestuale.",
      },
      {
        title: "Rinomina e spostamento",
        detail: "Applica mapping finale secondo policy definite e livello di conferma scelto.",
      },
    ],
    governance: [
      "È consigliato nominare un referente interno per naming e controlli qualità.",
      "Versionare regole e convenzioni riduce regressioni nei run successivi.",
      "Monitorare KPI semplici: file processati, eccezioni, tempo medio revisione.",
    ],
    notes: [
      "Lo script Python usa OpenAI per analisi contenuto.",
      "Dati inviati: metadati e/o testo estratto quando necessario. La retention dipende dalla configurazione: vedi privacy interna.",
      "I risultati dipendono dalla qualità dei file/metadata.",
      "Consigliamo sempre la modalità preview o un backup.",
      PREVIEW_MODE
        ? "Stato attuale: preview con conferma prima di applicare modifiche permanenti."
        : "Stato attuale: esecuzione diretta; usa backup prima dell'avvio.",
    ],
  },
  comparison: {
    title: "Confronto con alternative",
    subtitle: "Solo criteri osservabili: niente promesse vaghe.",
    readingGuide:
      "Legenda: ✔ funzione disponibile, — funzione assente/non nativa, In arrivo funzione pianificata ma non ancora rilasciata.",
    columns: [
      "Feature",
      "Organizer tradizionali (regole statiche)",
      "Questo prodotto (AI sul contenuto)",
    ],
    rows: [
      {
        feature: "Criterio di organizzazione",
        traditional: "Regole statiche su nome/estensione",
        product: "AI su contenuto + metadati",
      },
      {
        feature: "Riconoscimento documenti",
        traditional: "Limitato",
        product: "Contestuale in base al testo estratto",
      },
      {
        feature: "Naming intelligente",
        traditional: "Manuale o pattern rigidi",
        product: "Proposte naming coerenti con scenario operativo",
      },
      {
        feature: "Gestione duplicati",
        key: "dedupe",
      },
    ],
  },
  faq: {
    title: "FAQ",
    subtitle: "Risposte pratiche su costi, privacy, limiti e requisiti.",
    items: [
      {
        q: "Come incidono token e costi API?",
        a: "Dipende da volume file, testo estratto e modello usato. È consigliato partire con un campione e monitorare i run.",
        tags: ["token", "costi", "openai"],
      },
      {
        q: "Quali dati vengono inviati a OpenAI?",
        a: "Solo metadati e/o testo estratto necessari all'analisi. Modalità e retention dipendono dalla configurazione tecnica adottata.",
        tags: ["privacy", "dati", "openai"],
      },
      {
        q: "Quali file sono supportati?",
        a: "Tipicamente PDF, immagini e documenti Office. La copertura effettiva dipende dalla pipeline configurata nel progetto.",
        tags: ["file", "supporto", "formati"],
      },
      {
        q: "Quanto tempo richiede l'elaborazione?",
        a: "Dipende da numero file, dimensione media, qualità OCR e complessità delle regole. Conviene misurare su un perimetro pilota.",
        tags: ["tempi", "performance"],
      },
      {
        q: "E previsto rollback automatico?",
        a: "Non sempre. Se non disponibile nella tua configurazione, usa preview/confirm e backup prima di esecuzione massiva.",
        tags: ["rollback", "backup", "sicurezza"],
      },
      {
        q: "Quali requisiti OS servono?",
        a: "Windows con runtime .NET richiesto dalla build, Python per lo script di analisi e connettività verso OpenAI secondo policy aziendale.",
        tags: ["requisiti", "os", "dotnet"],
      },
    ],
  },
  pricing: {
    title: "Prezzi",
    subtitle: "Piani indicativi. Quotazione finale su perimetro operativo reale.",
    qualification:
      "La proposta economica dipende da volume, complessità documentale, livello di automazione e requisiti di governance.",
    plans: [
      {
        name: "Free Demo",
        price: "0 EUR",
        label: "Placeholder",
        idealFor: "Team che vogliono validare il fit su un caso reale.",
        points: [
          "Dataset ridotto e caso guidato",
          "Check tecnico iniziale",
          "Senza impegno di rollout",
        ],
        cta: "Richiedi demo",
      },
      {
        name: "Pro",
        price: "Da definire",
        label: "Placeholder",
        idealFor: "Reparti singoli con flussi documentali ricorrenti.",
        points: [
          "Setup su team singolo",
          "Nomenclatura e policy base",
          "Supporto tuning iniziale",
        ],
        cta: "Contatta vendite",
      },
      {
        name: "Team",
        price: "Da definire",
        label: "Placeholder",
        idealFor: "Strutture multi-team con requisiti di standard condivisi.",
        points: [
          "Adozione multi-team",
          "Governance e standard condivisi",
          "Roadmap a milestone",
        ],
        cta: "Parla con noi",
      },
    ],
  },
  demo: {
    title: "Demo",
    body:
      "Demo in arrivo con scenario realistico su archivi misti. Nel frattempo puoi richiedere una sessione guidata commerciale/tecnica.",
    includes: [
      "Panoramica pipeline: ingestione, analisi, proposta naming, output.",
      "Esempio prima/dopo su cartella reale con commento passaggi critici.",
      "Q&A su privacy, costi API e strategia di rollout.",
    ],
    cta: {
      label: "Prenota call demo",
      href: "mailto:contatti@folderorganizer.com?subject=Richiesta%20demo%20FolderOrganizer%20AI",
    },
  },
  footer: {
    lines: [
      "Privacy: invia solo i dati necessari al caso d'uso e verifica le policy interne.",
      "I risultati dipendono dalla qualità dei file/metadata.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/your-org/your-repo" },
      { label: "Contatti", href: "mailto:contatti@folderorganizer.com" },
    ],
  },
};

window.LANDING_CONTENT = LANDING_CONTENT;
