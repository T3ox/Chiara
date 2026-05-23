TRUNCATION_LIMITS = {
    "MAX_TEXT_CHARS": 8000,
    "DOCX_SNIPPET_CHARS": 4500,
    "XLSX_MAX_SHEETS": 4,
    "XLSX_MAX_ROWS_PER_SHEET": 30,
    "IMAGE_MAX_SIDE": 1200,
    "PDF_MAX_PAGES_TEXT": 5,
    "PDF_MAX_BYTES_FULL": 4 * 1024 * 1024,
    "DOCX_MAX_BYTES_FULL": 450 * 1024,
    "PPTX_MAX_SLIDES": 8,
    "PPTX_MAX_TEXT_CHARS": 2500,
    "TEXT_MAX_LINES": 120,
}

REVIEW_FOLDER = "DaRevisionare"
ORGANIZER_PREFIX = ".organizer_"

COMMON_RULES = [
    "Rispondi SOLO con JSON valido su una singola riga.",
    'Formato esatto: {"new_name":"NomeFileSenzaEstensione","target_folder":"CartellaEsistente","confidence":"high|medium|low","reason":"Motivo breve"}',
    "Non usare markdown, code block, spiegazioni o testo extra.",
    "Il JSON deve contenere solo le chiavi new_name, target_folder, confidence e reason.",
    "target_folder deve essere ESATTAMENTE una delle cartelle_disponibili.",
    "Non inventare cartelle.",
    "Se sei incerto, usa confidence low e scegli DaRevisionare.",
    "Usa confidence high solo quando nome e cartella sono molto affidabili.",
    "Usa confidence medium quando il contenuto e sufficiente ma non perfetto.",
    "Usa confidence low quando il contenuto e scarso, ambiguo, generico o non classificabile.",
    "new_name deve essere senza estensione.",
    "new_name deve essere corto, chiaro e descrittivo, massimo 60 caratteri.",
    "new_name puo contenere solo lettere, numeri, spazi, trattini e underscore.",
    "Non usare caratteri speciali come slash, backslash, due punti, asterischi, virgolette, minore, maggiore o pipe.",
    "Usa il contenuto estratto come fonte principale, non solo il nome originale del file.",
    "Se trovi una data importante, usa il formato YYYY-MM-DD quando il giorno e noto, altrimenti YYYY-MM.",
    "reason deve essere una frase breve in italiano, massimo 140 caratteri.",
    "Se il contenuto e vuoto, ambiguo o impossibile da classificare, usa new_name DA_REVISIONARE, target_folder DaRevisionare, confidence low.",
]

PROMPTS = {
    "default": {
        "system": "Sei un classificatore per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Analizza il contenuto disponibile e scegli il nome e la cartella piu adatti.",
        ],
    },
    "pdf": {
        "system": "Sei un classificatore di documenti PDF per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Analizza il testo estratto dal PDF e, se presente, l'immagine della prima pagina.",
            "Identifica se e fattura, contratto, preventivo, relazione, documento tecnico, modulo, scansione o altro.",
            "Se riconosci cliente, progetto, ente, numero documento o oggetto principale, usali nel nome in forma breve.",
        ],
    },
    "docx": {
        "system": "Sei un classificatore di documenti Word per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Analizza il contenuto del documento.",
            "Identifica se e lettera, contratto, relazione, testo tecnico, documento amministrativo, manuale o appunti.",
            "Se il documento sembra una versione o copia ripristinata, conserva un nome base pulito senza parole ridondanti.",
        ],
    },
    "excel": {
        "system": "Sei un classificatore di fogli Excel e CSV per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Analizza il contenuto del foglio Excel.",
            "Identifica se riguarda contabilita, preventivi, report, vendite, liste, analisi, calcoli, inventario o dati grezzi.",
            "Se il foglio contiene un periodo o anno evidente, includilo nel nome.",
        ],
    },
    "presentation": {
        "system": "Sei un classificatore di presentazioni PowerPoint per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Analizza titolo, testi delle slide e note disponibili.",
            "Identifica se e presentazione commerciale, tecnica, formativa, report, proposta o materiale interno.",
            "Usa il titolo o il tema principale delle slide come soggetto breve.",
        ],
    },
    "images": {
        "system": "Sei un classificatore di immagini per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Osserva l'immagine se il modello locale supporta input visuali.",
            "Identifica se e foto, scansione documento, screenshot, ricevuta, progetto tecnico, magazzino, cantiere o altro.",
            "Se l'immagine e poco chiara o generica, scegli DaRevisionare.",
        ],
    },
    "text": {
        "system": "Sei un classificatore di file testuali e codice per archivio digitale.",
        "istruzioni": COMMON_RULES + [
            "Analizza il contenuto testuale effettivo, non solo il nome file.",
            "Identifica se e nota, codice, configurazione, log, documentazione, report, dati o documento operativo.",
            "Se e codice, includi linguaggio o scopo quando riconoscibile.",
        ],
    },
}

SUPPORTED_EXTENSIONS = {
    ".pdf": "pdf",
    ".docx": "docx",
    ".xlsx": "excel",
    ".pptx": "presentation",
    ".png": "images",
    ".jpg": "images",
    ".jpeg": "images",
    ".webp": "images",
    ".txt": "text",
    ".md": "text",
    ".csv": "text",
    ".json": "text",
    ".py": "text",
    ".js": "text",
    ".ts": "text",
    ".html": "text",
    ".css": "text",
    ".log": "text",
}
