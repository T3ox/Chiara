const PREVIEW_MODE = true;
const GROUP_MODE = "none"; // "none" | "type" | "suggestedFolder"
const DEDUPE_HINTS = true;

const FILES = [
  {
    id: "f1",
    name: "IMG_2048.jpg",
    type: "Image",
    sizeKB: 8420,
    modifiedDate: "2026-02-16T09:12:00",
    currentPath: "C:/Inbox/Foto",
    status: "Proposta pronta",
    ai: {
      suggestedName: "cliente-rossi-sopralluogo-001.jpg",
      suggestedFolder: "Clienti/2026/Sopralluoghi",
      confidence: 93,
      reason: "Riconosciuto contesto sopralluogo cliente"
    }
  },
  {
    id: "f2",
    name: "IMG_2051.jpg",
    type: "Image",
    sizeKB: 3610,
    modifiedDate: "2026-02-13T11:05:00",
    currentPath: "C:/Inbox/Foto",
    status: "Analizzato",
    ai: {
      suggestedName: "fornitore-site-check-2026-02.jpg",
      suggestedFolder: "Fornitori/2026/Visite",
      confidence: 80,
      reason: "Metadata e testo visivo coerenti con visita fornitore"
    }
  },
  {
    id: "f3",
    name: "scan_finale(2).pdf",
    type: "PDF",
    sizeKB: 1240,
    modifiedDate: "2026-02-17T15:18:00",
    currentPath: "C:/Inbox/Scan",
    status: "Proposta pronta",
    ai: {
      suggestedName: "verbale-collaudo-finale.pdf",
      suggestedFolder: "Operativo/Collaudi/2026",
      confidence: 89,
      reason: "Parole chiave di collaudo nel testo OCR"
    }
  },
  {
    id: "f4",
    name: "scan_fornitore_17.pdf",
    type: "PDF",
    sizeKB: 680,
    modifiedDate: "2026-02-10T08:42:00",
    currentPath: "C:/Inbox/Scan",
    status: "Da analizzare",
    ai: {
      suggestedName: "fattura-fornitore-17.pdf",
      suggestedFolder: "Amministrazione/Fatture/2026",
      confidence: 0,
      reason: "In attesa analisi"
    }
  },
  {
    id: "f5",
    name: "nuovo_documento.docx",
    type: "Word",
    sizeKB: 540,
    modifiedDate: "2026-02-14T10:22:00",
    currentPath: "C:/Inbox/Documenti",
    status: "Errore",
    ai: {
      suggestedName: "procedura-onboarding-v2.docx",
      suggestedFolder: "Operativo/Procedure",
      confidence: 64,
      reason: "Parsing incompleto: formato non standard"
    }
  },
  {
    id: "f6",
    name: "allegato_mail.msg",
    type: "Outlook",
    sizeKB: 930,
    modifiedDate: "2026-02-18T08:03:00",
    currentPath: "C:/Inbox/Mail",
    status: "Proposta pronta",
    ai: {
      suggestedName: "richiesta-cliente-supporto.msg",
      suggestedFolder: "Comunicazioni/Email/Clienti",
      confidence: 91,
      reason: "Thread email identificato da oggetto e mittente"
    }
  },
  {
    id: "f7",
    name: "report_v3_def.xlsx",
    type: "Excel",
    sizeKB: 5220,
    modifiedDate: "2026-02-11T17:28:00",
    currentPath: "C:/Inbox/Report",
    status: "Applicato",
    ai: {
      suggestedName: "report-mensile-finanza-2026-02.xlsx",
      suggestedFolder: "Reporting/2026/Finanza",
      confidence: 95,
      reason: "Pattern storico dei report finanziari"
    }
  }
];

window.APP_CONTENT = {
  settings: {
    PREVIEW_MODE,
    GROUP_MODE,
    DEDUPE_HINTS
  },
  ui: {
    title: "AI File Organizer Queue",
    subtitle: "Controlla, approva e applica le proposte AI file per file"
  },
  chips: [
    { key: "all", label: "All" },
    { key: "image", label: "Images" },
    { key: "pdf", label: "PDF" },
    { key: "word", label: "Word" },
    { key: "excel", label: "Excel" },
    { key: "outlook", label: "Outlook" },
    { key: "large", label: "Large (>5MB)" },
    { key: "recent", label: "Recent (7 days)" }
  ],
  files: FILES
};
