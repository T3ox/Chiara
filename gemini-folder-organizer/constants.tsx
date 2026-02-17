
import React from 'react';

export const TRUNCATION_LIMITS = {
  MAX_TEXT_CHARS: 12000,
  DOCX_SNIPPET_CHARS: 4500,
  XLSX_MAX_SHEETS: 4,
  XLSX_MAX_ROWS_PER_SHEET: 30,
  IMAGE_MAX_SIDE: 1400,
  PDF_MAX_PAGES_FULL: 6,
  PDF_MAX_BYTES_FULL: 4 * 1024 * 1024,
  DOCX_MAX_BYTES_FULL: 450 * 1024,
  XLSX_MAX_BYTES_FULL: 800 * 1024,
  IMG_MAX_BYTES_FULL: 6 * 1024 * 1024,
};

export const PROMPTS = {
  default: {
    system: "Sei un classificatore per archivio digitale. Output strettamente vincolato.",
    user: {
      regole: [
        "Scegli ESATTAMENTE UNA cartella tra cartelle_disponibili.",
        "Non inventare cartelle. Se incerto, scegli 'DaRevisionare' (se presente) altrimenti la prima cartella della lista.",
        "Crea un nome file corto e chiaro (massimo 60 caratteri, senza estensione).",
        "Non usare caratteri speciali: solo lettere, numeri, underscore e trattini.",
        "Output OBBLIGATORIO in una singola riga, nel formato: NuovoNomeDelFile___CartellaDiDestinazione",
        "NON usare markdown, NON usare code blocks, SOLO il testo grezzo.",
        "Se il file è impossibile da classificare, usa: DA_REVISIONARE___DaRevisionare",
        "Nessun altro testo."
      ],
      formato_output: "NuovoNomeDelFile___CartellaDiDestinazione",
    }
  },
  pdf: {
    system: "Sei un assistente specializzato nell'analisi rapida di documenti PDF per archivio digitale.",
    user: {
      istruzioni: [
        "Analizza il contenuto del PDF.",
        "Identifica se è una fattura, contratto, preventivo, documento tecnico, relazione o altro.",
        "Rinomina il file in modo chiaro, ordinato e sintetico.",
        "Usa nomi del tipo: Anno-Mese-Giorno_TipoDocumento_DescrizioneBreve.",
        "Scegli UNA cartella tra quelle disponibili.",
        "NON inventare cartelle.",
        "Restituisci SOLO la stringa nel formato richiesto."
      ],
      formato_output: "NuovoNomeDelFile___CartellaDiDestinazione",
    }
  },
  docx: {
    system: "Sei un assistente specializzato nell'analisi rapida di documenti Word per archivio digitale.",
    user: {
      istruzioni: [
        "Analizza il contenuto del documento.",
        "Capisci se è una lettera, un contratto, un testo tecnico, una relazione o un documento amministrativo.",
        "Rinomina il file in modo chiaro, ordinato e sintetico.",
        "Scegli UNA cartella tra quelle disponibili.",
        "Restituisci SOLO la stringa nel formato richiesto."
      ],
      formato_output: "NuovoNomeDelFile___CartellaDiDestinazione",
    }
  },
  excel: {
    system: "Sei un assistente specializzato nell'analisi rapida di fogli Excel per archivio digitale.",
    user: {
      istruzioni: [
        "Analizza il contenuto del foglio Excel.",
        "Capisci se si tratta di contabilità, preventivi, report, analisi o calcoli.",
        "Rinomina il file in modo chiaro, sintetico e ordinato.",
        "Scegli UNA cartella tra quelle disponibili.",
        "Restituisci SOLO la stringa nel formato richiesto."
      ],
      formato_output: "NuovoNomeDelFile___CartellaDiDestinazione",
    }
  },
  images: {
    system: "Sei un assistente specializzato nell'analisi rapida di immagini per archivio digitale.",
    user: {
      istruzioni: [
        "Osserva l'immagine.",
        "Capisci se si tratta di una foto di cantiere, un documento scansionato, una schermata, un progetto o altro.",
        "Rinomina l'immagine in modo descrittivo ma breve.",
        "Scegli UNA cartella tra quelle disponibili.",
        "Restituisci SOLO la stringa nel formato richiesto."
      ],
      formato_output: "NuovoNomeDelFile___CartellaDiDestinazione",
    }
  },
};

export const SUPPORTED_EXTENSIONS: Record<string, string> = {
  '.pdf': 'pdf',
  '.docx': 'docx',
  '.xlsx': 'excel',
  '.xls': 'excel',
  '.png': 'images',
  '.jpg': 'images',
  '.jpeg': 'images',
  '.webp': 'images',
  '.numbers': 'excel',
};
