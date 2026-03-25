import os
from models.datatypes import FileType

TRUNCATION_LIMITS = {
    "MAX_TEXT_CHARS": 12000,
    "DOCX_SNIPPET_CHARS": 4500,
    "XLSX_MAX_SHEETS": 4,
    "XLSX_MAX_ROWS_PER_SHEET": 30,
    "IMAGE_MAX_SIDE": 1400,
    "PDF_MAX_PAGES_FULL": 6,
    "PDF_MAX_BYTES_FULL": 4 * 1024 * 1024,
    "DOCX_MAX_BYTES_FULL": 450 * 1024,
    "XLSX_MAX_BYTES_FULL": 800 * 1024,
    "IMG_MAX_BYTES_FULL": 6 * 1024 * 1024,
}

SUPPORTED_EXTENSIONS = {
    '.pdf': FileType.PDF,
    '.docx': FileType.DOCX,
    '.xlsx': FileType.EXCEL,
    '.xls': FileType.EXCEL,
    '.png': FileType.IMAGES,
    '.jpg': FileType.IMAGES,
    '.jpeg': FileType.IMAGES,
    '.webp': FileType.IMAGES,
    '.numbers': FileType.EXCEL,
}

# The prompts are simplified because we will force Structured Output via Pydantic model in the API client.
PROMPTS = {
    "default": {
        "system": "Sei un classificatore esperto per archivio digitale. Rinomina il file in modo chiaro (senza estensione) e scegli ESATTAMENTE UNA delle cartelle fornite.",
    },
    FileType.PDF.value: {
        "system": "Analizza questo documento PDF. Identifica se è una fattura, contratto, preventivo, documento tecnico o relazione. Rinomina il file in modo chiaro e sintetico (es. Anno-Mese-Giorno_Tipo_BreveDescrizione). Scegli UNA cartella di destinazione tra quelle fornite.",
    },
    FileType.DOCX.value: {
        "system": "Analizza questo documento Word. Capisci se è una lettera, un contratto, un testo tecnico, una relazione, o un documento amministrativo. Rinomina il file in modo descrittivo ma breve (es. Anno-Mese-Giorno_Tipo_BreveDescrizione). Scegli UNA cartella target fornita.",
    },
    FileType.EXCEL.value: {
        "system": "Analizza questo foglio Excel. Identifica se si tratta di contabilità, preventivi, report, analisi o calcoli. Rinomina il file (es. Anno-Mese_Oggetto). Scegli UNA cartella target tra quelle consentite.",
    },
    FileType.IMAGES.value: {
        "system": "Osserva l'immagine fornita. Identifica il contenuto (foto cantiere, documento scansionato, schermata, etc.). Rinomina l'immagine in modo descrittivo. Scegli UNA cartella di destinazione.",
    },
}
