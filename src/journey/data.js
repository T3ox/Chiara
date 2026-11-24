// Everything the journey shows comes from programma/FolderOrganizer.py: the folder names are the ones its
// local rules know, the limits are its constants, the messages are its own print() lines. The nine files are a
// demo set that walks through every branch of process_one().

export const EMAIL = "contatti@folderorganizer.com";
export const DEMO_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent("Richiesta demo FolderOrganizer")}`;

export const FOLDERS = [
  "01_AMMINISTRAZIONE_FINANZA/02_Fatture_Passive",
  "01_AMMINISTRAZIONE_FINANZA/05_IVA_Liquidazioni",
  "01_AMMINISTRAZIONE_FINANZA/06_Bilanci",
  "03_CLIENTI_COMMERCIALE/02_Preventivi",
  "03_CLIENTI_COMMERCIALE/05_Sopralluoghi",
  "04_CANTIERI_OPERATIVO/07_Sicurezza_Cantiere",
  "DaRevisionare",
];

// kind: the reader process_one() uses for the extension; folder: where the file ends up;
// lands: [station, moment] when it reaches its folder, the moment being that station's demo progress (stationT).
// The HUD counter, the demos and the 3D cards all read this one schedule, so the three never disagree.
export const FILES = [
  {
    id: "f1", name: "scan_fornitore_17.pdf", size: "184 KB", kind: "PDF",
    issue: "nome generico",
    out: "2025-03-14_Fattura_RossiForniture.pdf", folder: FOLDERS[0], lands: [7, 0.72],
  },
  {
    id: "f2", name: "POS_cantiere_via_Roma.docx", size: "62 KB", kind: "DOCX",
    issue: null,
    out: "POS_cantiere_via_Roma.docx", folder: FOLDERS[5], lands: [4, 0.8],
  },
  {
    id: "f3", name: "IMG_2048.jpg", size: "3,1 MB", kind: "IMAGE",
    issue: "nome della fotocamera",
    out: "2025-02-03_Foto_Sopralluogo_Bianchi.jpg", folder: FOLDERS[4], lands: [7, 0.76],
  },
  {
    id: "f4", name: "report_v3_def.xlsx", size: "48 KB", kind: "XLSX",
    issue: "versione nel nome",
    out: "2025-01-31_Liquidazione_IVA_Gennaio.xlsx", folder: FOLDERS[1], lands: [7, 0.8],
  },
  {
    id: "f5", name: "preventivo (2).doc", size: "91 KB", kind: "DOC",
    issue: "formato vecchio",
    out: "2025-02-11_Preventivo_ImpiantoElettrico.doc", folder: FOLDERS[3], lands: [7, 0.84],
  },
  {
    id: "f6", name: "bilancio.numbers", size: "220 KB", kind: "NUMBERS",
    issue: "formato Apple",
    out: "2024-12-31_Bilancio_Esercizio2024.numbers", folder: FOLDERS[2], lands: [7, 0.88],
  },
  {
    id: "f7", name: "scan_fornitore_17 (copia).pdf", size: "184 KB", kind: "PDF",
    issue: "copia",
    out: "2025-03-14_Fattura_RossiForniture_1.pdf", folder: FOLDERS[0], lands: [7, 0.92],
  },
  {
    id: "f8", name: "Scansione0042.pdf", size: "1,2 MB", kind: "PDF",
    issue: "scansione storta",
    out: "Scansione0042.pdf", folder: "DaRevisionare", lands: [8, 0.08],
  },
  {
    id: "f9", name: "verbale_vuoto.docx", size: "12 KB", kind: "DOCX",
    issue: "nessun testo",
    out: "FAILED_verbale_vuoto.docx", folder: "DaRevisionare", lands: [8, 0.35],
  },
];

export const STATIONS = [
  { id: "start", n: "00", short: "Partenza", title: "Partenza" },
  { id: "cartella", n: "01", short: "Disordine", title: "La cartella in disordine" },
  { id: "controlli", n: "02", short: "Controllo", title: "Il controllo" },
  { id: "lettura", n: "03", short: "Lettura", title: "La lettura" },
  { id: "regole", n: "04", short: "Regole rapide", title: "Le regole rapide" },
  { id: "modello", n: "05", short: "Domanda all'AI", title: "La domanda all'AI" },
  { id: "validazione", n: "06", short: "Verifica", title: "La verifica" },
  { id: "spostamento", n: "07", short: "Archiviazione", title: "L'archiviazione" },
  { id: "revisione", n: "08", short: "Da rivedere", title: "Da rivedere" },
  { id: "arrivo", n: "09", short: "Arrivo", title: "Tutto in ordine" },
];
