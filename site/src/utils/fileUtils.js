/**
 * Funzioni di utilità per la gestione dei file nel simulatore prima/dopo.
 * Usate nella sezione "Use case + impatto reale" della homepage.
 */

/** Estrae l'estensione da un nome file (es. "relazione.pdf" → ".pdf"). */
export function getExtension(fileName) {
  const dot = fileName.lastIndexOf(".");
  if (dot < 0) return "";
  return fileName.slice(dot).toLowerCase();
}

/** Restituisce l'etichetta leggibile del tipo di file a partire dall'estensione. */
export function getTypeLabel(ext) {
  const map = {
    ".jpg": "Immagine JPEG",
    ".jpeg": "Immagine JPEG",
    ".png": "Immagine PNG",
    ".pdf": "Documento PDF",
    ".docx": "Documento Word",
    ".xlsx": "Foglio Excel",
    ".msg": "Messaggio Outlook",
  };
  return map[ext] || "File";
}

/** Restituisce il percorso dell'icona SVG corrispondente all'estensione del file. */
export function getIconPath(ext) {
  const map = {
    ".jpg": "/img/file-icons/file-image.svg",
    ".jpeg": "/img/file-icons/file-image.svg",
    ".png": "/img/file-icons/file-image.svg",
    ".pdf": "/img/file-icons/file-pdf.svg",
    ".docx": "/img/file-icons/file-word.svg",
    ".xlsx": "/img/file-icons/file-excel.svg",
    ".msg": "/img/file-icons/file-outlook.svg",
  };
  return map[ext] || "/img/file-icons/file-generic.svg";
}

/**
 * Determina come mostrare la riga "Gestione duplicati" nella tabella di confronto,
 * in base allo stato attuale della funzionalità.
 *
 * Valori possibili per status: "available" | "not_available" | "planned"
 */
export function getDedupeView(status) {
  if (status === "available") {
    return { traditional: "—", product: "✔", planned: false };
  }
  if (status === "not_available") {
    return { traditional: "—", product: "—", planned: false };
  }
  // Valore di default: "planned" — la funzione è in arrivo
  return { traditional: "—", product: "—", planned: true };
}
