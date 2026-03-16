export const heroContent = {
  eyebrow: "Per team che vogliono ordine e semplicita",
  title: "Metti ordine nei file senza stress.",
  summary: "FolderOrganizer AI legge i file e suggerisce nomi e cartelle chiari, cosi tutti trovano tutto piu in fretta.",
  primaryAction: "Apri Prima / Dopo",
  secondaryAction: "Guida IA",
  brandName: "FolderOrganizer AI",
  brandTagline: "Organizza i file con AI",
  helperText: "Preview e conferma. Si parte da una cartella piccola, si verifica il risultato, poi si allarga.",
};

export const topNavLinks = [
  { label: "Prima / Dopo", href: "/prima-dopo" },
  { label: "Workflow", href: "/workflow" },
  { label: "Features", href: "/features" },
  { label: "Privacy", href: "/privacy" },
  { label: "Guide", href: "/guide" },
];

export const sceneHotspots = [
  {
    id: "assistant",
    label: "AI",
    title: "Assistente IA",
    detail: "Guida discreta dentro la scena.",
    route: "/guide",
    position: [-3.2, 1.02, 1.2],
    focusCamera: [1.4, 2.8, 7.4],
    focusTarget: [-2.8, 1.2, 1.0],
  },
  {
    id: "transformation",
    label: "P/D",
    title: "Prima / Dopo",
    detail: "Il percorso chiave del prodotto.",
    route: "/prima-dopo",
    position: [0.4, 1.7, -0.35],
    focusCamera: [3.5, 2.9, 7.1],
    focusTarget: [0.45, 1.25, -0.55],
  },
  {
    id: "workflow",
    label: "Flow",
    title: "Workflow",
    detail: "Validazione, controllo e archivio ordinato.",
    route: "/workflow",
    position: [1.45, 1.16, -2.35],
    focusCamera: [4.9, 2.8, 6.1],
    focusTarget: [1.6, 1.1, -2.25],
  },
  {
    id: "features",
    label: "Feat",
    title: "Features",
    detail: "Approfondimenti e carosello informativo.",
    route: "/features",
    position: [5.25, 2.04, -2.65],
    focusCamera: [7.3, 3.1, 5.2],
    focusTarget: [4.95, 2.3, -2.55],
  },
];

export const assistantBullets = [
  "Accoglie l'utente senza trasformarsi in un pannello invasivo.",
  "Suggerisce da dove partire e come tornare alla home.",
  "Mantiene il tono premium e ordinato della scena.",
];

export const workflowCards = [
  {
    title: "Preview controllata",
    text: "L'operatore vede e valida prima di applicare spostamenti e rinomine.",
  },
  {
    title: "Passaggio ordinato",
    text: "Il flusso collega scrivania, rail di controllo e archive wall come luoghi leggibili.",
  },
  {
    title: "Ritorno all'hub",
    text: "Ogni percorso secondario e separato ma sempre riconnesso alla home 3D.",
  },
];

export const privacyPoints = [
  "Approccio privacy-first mostrato come percorso separato, non come rumore in home.",
  "Focus su revisione, controllo e responsabilita operativa.",
  "Comunicazione piu credibile: meno slogan, piu struttura.",
];

export const guidePoints = [
  "L'assistente resta dentro la scena come presenza contestuale.",
  "I nodi 3D diventano accessi a percorsi dedicati.",
  "La home introduce il mondo del prodotto invece di spiegarlo tutto.",
];

export const beforeItems = [
  "IMG_2048.jpg",
  "scan_finale(2).pdf",
  "allegato_mail.msg",
  "report_v3_def.xlsx",
  "cartella_nuova(4)",
  "fattura_ok_finale_vera.pdf",
  "appunti_sparsi.docx",
  "documento_definitivo_finale.pdf",
];

export const afterGroups = [
  {
    title: "Amministrazione / Fatture / 2026",
    items: [
      "fattura-fornitore-17.pdf",
      "fattura-fornitore-18.pdf",
      "report-contabile-marzo.xlsx",
    ],
  },
  {
    title: "Operativo / Procedure",
    items: [
      "procedura-onboarding.docx",
      "checklist-validazione.pdf",
      "workflow-archivio-standard.docx",
    ],
  },
  {
    title: "Clienti / Rossi / Sopralluoghi",
    items: [
      "cliente-rossi-001.jpg",
      "cliente-rossi-002.jpg",
      "riepilogo-sopralluogo.pdf",
    ],
  },
];

export const transformationStats = [
  { title: "Prima", text: "Archivi disordinati, processi lenti, naming irregolare." },
  { title: "Durante", text: "Preview, assistente e controllo operativo leggibile." },
  { title: "Dopo", text: "Output standardizzato, archivio chiaro, validazione semplice." },
];

export const insightCards = [
  {
    title: "Privacy-first by design",
    eyebrow: "Controllo e governance",
    summary: "La home resta pulita. Gli approfondimenti arrivano solo quando richiesti dall'utente.",
    bullets: [
      "Percorso dedicato e leggibile",
      "Controllo umano sempre centrale",
      "Zero affollamento nella scena iniziale",
    ],
  },
  {
    title: "Workflow standardizzato",
    eyebrow: "Dalla stanza al risultato",
    summary: "L'ambiente 3D comunica ordine, passaggio e validazione invece di accumulare box.",
    bullets: [
      "Naming coerente e output piu stabile",
      "Flusso leggibile come mappa",
      "Archivio come destinazione finale",
    ],
  },
  {
    title: "Controllo operativo",
    eyebrow: "AI come guida",
    summary: "L'assistente e una presenza contestuale, non un pannello che soffoca la home.",
    bullets: [
      "Punti di accesso discreti",
      "Messaggi sintetici e intenzionali",
      "Maggiore credibilita visiva",
    ],
  },
  {
    title: "Adozione graduale",
    eyebrow: "Prototype-ready",
    summary: "Il prototipo sperimenta un nuovo ingresso al prodotto senza intaccare il sito esistente.",
    bullets: [
      "Isolato nella cartella dedicata",
      "Pronto per feedback e iterazioni",
      "Approccio piu immersivo ma controllato",
    ],
  },
];
