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
    '.xlsm': FileType.EXCEL,
    '.xls': FileType.EXCEL,
    '.png': FileType.IMAGES,
    '.jpg': FileType.IMAGES,
    '.jpeg': FileType.IMAGES,
    '.webp': FileType.IMAGES,
    '.bmp': FileType.IMAGES,
    '.tif': FileType.IMAGES,
    '.tiff': FileType.IMAGES,
    '.txt': FileType.TEXT,
    '.csv': FileType.TEXT,
    '.md': FileType.TEXT,
    '.json': FileType.TEXT,
    '.py': FileType.TEXT,
    '.js': FileType.TEXT,
    '.html': FileType.TEXT,
    '.htm': FileType.TEXT,
    '.css': FileType.TEXT,
    '.xml': FileType.TEXT,
    '.pptx': FileType.PPTX,
}

# The prompts are simplified because we will force Structured Output via Pydantic model in the API client.
PROMPTS = {
    "default": {
        "system": "Sei un classificatore per archivio digitale. Analizza il contenuto, rinomina il file in modo breve e preciso (senza estensione) e scegli ESATTAMENTE UNA cartella tra quelle fornite. Usa '_' e, se trovi una data, mettila all'inizio in formato YYYY-MM-DD.",
    },
    FileType.PDF.value: {
        "system": "Analizza questo screenshot di un PDF. Identifica tipo documento, data, cliente/progetto e argomento principale. Rinomina il file in modo breve e preciso (es. 2026-05-11_Fattura_Enel oppure 2026-04_Preventivo_ViaManzoni). Scegli UNA cartella tra quelle fornite.",
    },
    FileType.DOCX.value: {
        "system": "Analizza questo screenshot di un documento Word. Identifica tipo documento, data, progetto/cliente e argomento principale. Rinomina il file in modo breve e descrittivo (es. 2026-05_Relazione_Cantiere oppure 2026-04_Procedura_Email). Scegli UNA cartella tra quelle fornite.",
    },
    FileType.EXCEL.value: {
        "system": "Analizza questo screenshot di un foglio Excel. Identifica tipo dati, periodo, progetto/cliente e argomento. Rinomina il file in modo breve e preciso (es. 2026-05_OreCantieri oppure 2026-Q1_ReportCosti). Scegli UNA cartella tra quelle fornite.",
    },
    FileType.IMAGES.value: {
        "system": "Osserva l'immagine fornita. Identifica se è foto cantiere, documento, schermata, scansione o errore software. Rinomina l'immagine in modo breve e descrittivo (es. 2026-05_Cantiere_ViaIsonzo oppure 2026-05_Screenshot_UnityError). Scegli UNA cartella tra quelle fornite.",
    },
    FileType.TEXT.value: {
        "system": "Analizza questo screenshot di un file testuale. Identifica se è codice, log, configurazione, markdown o testo semplice, e capisci progetto e funzione. Rinomina il file in modo breve e preciso (es. 2026-05_Log_Antigravity oppure 2026-04_Python_FileOrganizer). Scegli UNA cartella tra quelle fornite.",
    },
    FileType.PPTX.value: {
        "system": "Analizza questo screenshot di una presentazione PowerPoint. Identifica tipo presentazione, progetto/cliente e argomento principale. Rinomina il file in modo breve e descrittivo (es. 2026-05_Pitch_MrWhite oppure 2026-04_Formazione_Pitture). Scegli UNA cartella tra quelle fornite.",
    },
}
