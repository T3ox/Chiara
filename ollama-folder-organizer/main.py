import argparse
import asyncio
import logging
import os
import re
import shutil
from typing import Any, Dict, List

from dotenv import load_dotenv

from constants_py import SUPPORTED_EXTENSIONS, TRUNCATION_LIMITS
from services.extractor_service import FileExtractor
from services.ollama_service import OllamaService
from services.undo_manager import UndoManager

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IGNORED_FILENAMES = {".DS_Store", ".organizer_history.json"}


def sanitize_name(name: str) -> str:
    cleaned = re.sub(r"[_\s]+", " ", name.strip())
    cleaned = re.sub(r"[^a-zA-Z0-9 -]+", "", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" -")
    if len(cleaned) <= 70:
        return cleaned or "DA_REVISIONARE"

    truncated = cleaned[:70].rsplit(" ", 1)[0].strip(" -")
    return truncated or cleaned[:70].strip(" -") or "DA_REVISIONARE"


def sanitize_theme_name(name: str) -> str:
    cleaned = sanitize_name(name)
    if is_uncertain_theme(cleaned):
        return "Generale"
    return cleaned[:50].strip(" -") or "Generale"


def should_skip_file(file_path: str) -> bool:
    file_name = os.path.basename(file_path)
    return file_name in IGNORED_FILENAMES or file_name.startswith("FAILED__")


async def process_file(
    file_path: str,
    llm: OllamaService,
    result_dir: str,
    available_folders: List[str],
    dry_run: bool,
    undo_manager: UndoManager,
) -> Dict[str, Any]:
    file_name = os.path.basename(file_path)
    ext = os.path.splitext(file_name)[1].lower()
    file_type = SUPPORTED_EXTENSIONS.get(ext)

    if not file_type:
        return {"success": False, "code": "UNSUP", "reason": f"Estensione {ext} non supportata"}

    logger.info("Analyzing %s...", file_name)

    try:
        content: Dict[str, str] = {}
        file_size = os.path.getsize(file_path)

        if file_type == "pdf":
            content["text"] = FileExtractor.extract_text_from_pdf(file_path)
            if not content["text"] and file_size <= TRUNCATION_LIMITS["PDF_MAX_BYTES_FULL"]:
                content["image_data"] = FileExtractor.get_pdf_thumbnail(file_path)
        elif file_type == "docx":
            is_large = file_size > TRUNCATION_LIMITS["DOCX_MAX_BYTES_FULL"]
            content["text"] = FileExtractor.extract_text_from_docx(file_path, snippet=is_large)
        elif file_type == "excel":
            content["text"] = FileExtractor.extract_text_from_xlsx(file_path)
        elif file_type == "presentation":
            content["text"] = FileExtractor.extract_text_from_pptx(file_path)
        elif file_type == "images":
            content["image_data"] = FileExtractor.resize_image(file_path)
        elif file_type == "text":
            content["text"] = FileExtractor.extract_text_from_plain_file(file_path)

        if not any(content.values()):
            return {"success": False, "code": "EMPTY", "reason": "Contenuto non estraibile"}

        try:
            raw_result = await classify_with_retries(llm, file_type, content, file_name, available_folders)
        except Exception as exc:
            logger.warning("LLM failed for %s: %s. Using local name extraction.", file_name, exc)
            raw_result = review_classification(file_name, content, available_folders)

        if "___" not in raw_result:
            logger.warning("Bad format from LLM for %s, attempting repair...", file_name)
            try:
                raw_result = await llm.repair_output(raw_result, available_folders)
            except Exception as exc:
                logger.warning("Repair failed for %s: %s. Using local name extraction.", file_name, exc)
                raw_result = review_classification(file_name, content, available_folders)

        if "___" not in raw_result:
            raw_result = review_classification(file_name, content, available_folders)

        new_name, target_folder, theme = parse_classification(raw_result)
        new_name = sanitize_name(new_name)
        if is_uncertain_name(new_name):
            new_name = content_title_name(content) or new_name

        if not target_folder or target_folder not in available_folders:
            target_folder = "DaRevisionare" if "DaRevisionare" in available_folders else available_folders[0]

        theme = sanitize_theme_name(theme or fallback_theme(file_name, content, target_folder, file_type))

        if target_folder != "DaRevisionare" or not is_uncertain_name(new_name):
            return move_or_rename_in_origin(
                file_path=file_path,
                new_name=new_name,
                ext=ext,
                result_dir=result_dir,
                classification=target_folder,
                theme=theme,
                dry_run=dry_run,
                undo_manager=undo_manager,
            )

        target_dir = os.path.join(result_dir, target_folder, theme)
        new_file_path = unique_path(os.path.join(target_dir, f"{new_name}{ext}"))
        undo_manager.record_move(file_path, new_file_path, target_folder, action="move_to_review", theme=theme)

        if dry_run:
            return {
                "success": True,
                "target": os.path.relpath(new_file_path, result_dir),
                "theme": theme,
                "dry_run": True,
            }

        os.makedirs(target_dir, exist_ok=True)
        shutil.move(file_path, new_file_path)

        return {"success": True, "target": os.path.relpath(new_file_path, result_dir), "theme": theme}

    except Exception as exc:
        logger.error("Error processing %s: %s", file_name, exc)
        return {"success": False, "code": "LLM", "reason": str(exc)}


async def classify_with_retries(
    llm: OllamaService,
    file_type: str,
    content: Dict[str, str],
    file_name: str,
    available_folders: List[str],
) -> str:
    delays: List[int] = []

    for attempt in range(1):
        try:
            return await llm.classify_file(file_type, content, file_name, available_folders)
        except Exception as exc:
            if attempt >= len(delays):
                raise
            logger.warning("Errore temporaneo per %s: %s. Retry in %ss...", file_name, exc, delays[attempt])
            await asyncio.sleep(delays[attempt])

    return ""


def unique_path(path: str) -> str:
    if not os.path.exists(path):
        return path

    directory, filename = os.path.split(path)
    stem, ext = os.path.splitext(filename)
    counter = 2

    while True:
        candidate = os.path.join(directory, f"{stem}_{counter}{ext}")
        if not os.path.exists(candidate):
            return candidate
        counter += 1


def parse_classification(raw_result: str) -> tuple[str, str, str]:
    parts = [part.strip() for part in raw_result.split("___", 2)]
    if len(parts) == 1:
        return parts[0], "", ""
    if len(parts) == 2:
        return parts[0], parts[1], ""
    return parts[0], parts[1], parts[2]


def move_or_rename_in_origin(
    file_path: str,
    new_name: str,
    ext: str,
    result_dir: str,
    classification: str,
    theme: str,
    dry_run: bool,
    undo_manager: UndoManager,
) -> Dict[str, Any]:
    source_dir = os.path.dirname(file_path)
    current_stem = os.path.splitext(os.path.basename(file_path))[0]
    clean_name = sanitize_name(new_name)
    clean_theme = sanitize_theme_name(theme)
    target_dir = os.path.join(source_dir, clean_theme)
    desired_path = os.path.join(target_dir, f"{clean_name}{ext}")

    if os.path.abspath(file_path) == os.path.abspath(desired_path):
        return {
            "success": True,
            "target": os.path.relpath(file_path, result_dir),
            "classification": classification,
            "theme": clean_theme,
            "kept": True,
        }

    new_file_path = unique_path(desired_path)
    undo_manager.record_move(file_path, new_file_path, "", action="rename_in_place", theme=clean_theme)

    if dry_run:
        return {
            "success": True,
            "target": os.path.relpath(new_file_path, result_dir),
            "classification": classification,
            "theme": clean_theme,
            "renamed": True,
            "dry_run": True,
        }

    os.makedirs(target_dir, exist_ok=True)
    shutil.move(file_path, new_file_path)
    return {
        "success": True,
        "target": os.path.relpath(new_file_path, result_dir),
        "classification": classification,
        "theme": clean_theme,
        "renamed": True,
    }


def is_uncertain_name(name: str) -> bool:
    normalized = re.sub(r"[^a-z0-9]+", "", sanitize_name(name).lower())
    return normalized in {
        "",
        "darevisionare",
        "revisionare",
        "unknown",
        "sconosciuto",
        "nonclassificato",
        "senzanome",
        "nuovonomedelfile",
        "nuovonomefile",
        "nomefile",
        "newfilename",
        "filename",
        "file",
    }


def is_uncertain_theme(name: str) -> bool:
    normalized = re.sub(r"[^a-z0-9]+", "", sanitize_name(name).lower())
    return normalized in {"", "darevisionare", "revisionare", "unknown", "sconosciuto", "nonclassificato"}


def review_classification(file_name: str, content: Dict[str, str], available_folders: List[str]) -> str:
    target_folder = "DaRevisionare" if "DaRevisionare" in available_folders else available_folders[0]
    new_name = best_content_name(file_name, content)
    theme = fallback_theme(file_name, content, target_folder, SUPPORTED_EXTENSIONS.get(os.path.splitext(file_name)[1].lower(), ""))
    return f"{new_name}___{target_folder}___{theme}"


def fallback_theme(file_name: str, content: Dict[str, str], target_folder: str, file_type: str) -> str:
    haystack = f"{file_name}\n{content.get('text', '')[:2500]}".lower()
    keyword_themes = [
        ("Fatture", ("fattura", "invoice", "quietanza", "ricevuta", "pagamento")),
        ("Contratti", ("contratto", "agreement", "accordo", "clausola", "firma")),
        ("Preventivi", ("preventivo", "offerta", "quotation", "proposal", "proposta")),
        ("Report", ("report", "relazione", "analisi", "consuntivo", "rendiconto")),
        ("Contabilita", ("bilancio", "contabil", "iva", "importo", "totale", "scadenza")),
        ("Progetti", ("progetto", "cantiere", "specifica", "requisiti", "roadmap")),
        ("Formazione", ("corso", "lezione", "training", "workshop", "slide")),
        ("Codice", ("def ", "class ", "function ", "import ", "const ", "var ", "let ")),
        ("Log", ("error", "warning", "traceback", "exception", "stack trace")),
        ("Dati", ("csv", "dataset", "tabella", "colonna", "record")),
    ]

    for theme, keywords in keyword_themes:
        if any(keyword in haystack for keyword in keywords):
            return theme

    type_theme = {
        "pdf": "Documenti",
        "docx": "Documenti",
        "excel": "FogliDiCalcolo",
        "presentation": "Presentazioni",
        "images": "Immagini",
        "text": "Testi",
    }.get(file_type)
    if type_theme:
        return type_theme

    return sanitize_theme_name(target_folder)


def best_content_name(file_name: str, content: Dict[str, str]) -> str:
    stem = os.path.splitext(file_name)[0]
    return content_title_name(content) or sanitize_name(stem)


def content_title_name(content: Dict[str, str]) -> str:
    title = first_meaningful_line(content.get("text", ""))
    return sanitize_name(title) if title else ""


def first_meaningful_line(text: str) -> str:
    month_names = (
        "gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|"
        "settembre|ottobre|novembre|dicembre"
    )
    for line in text.splitlines():
        clean_line = line.strip()
        if not clean_line or clean_line.startswith("[") or clean_line.lower().startswith("presentation:"):
            continue
        if re.fullmatch(r"[\d\s/.,:-]+", clean_line):
            continue
        if re.fullmatch(rf"[\d\s/.,:-]*(?:{month_names})[\d\s/.,:-]*", clean_line.lower()):
            continue
        if len(re.findall(r"[a-zA-Z]", clean_line)) >= 8:
            return clean_line
    return ""


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Organizza file usando un modello Ollama locale.")
    parser.add_argument("folder", nargs="?", help="Cartella da organizzare. Usata anche come output se --result-dir non e indicato.")
    parser.add_argument("--input-dir", help="Cartella con i file da organizzare.")
    parser.add_argument("--result-dir", help="Cartella di destinazione. Default: stessa cartella di input.")
    parser.add_argument("--model", default=os.getenv("OLLAMA_MODEL", "llama3.2"), help="Modello Ollama per testo.")
    parser.add_argument(
        "--vision-model",
        default=os.getenv("OLLAMA_VISION_MODEL", "qwen3-vl:8b"),
        help="Modello Ollama per immagini e PDF scansionati.",
    )
    parser.add_argument(
        "--base-url",
        default=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        help="Base URL di Ollama.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=int(os.getenv("OLLAMA_TIMEOUT", "60")),
        help="Timeout in secondi per ogni chiamata a Ollama.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Mostra le operazioni previste senza spostare file.",
    )
    return parser


async def main() -> None:
    load_dotenv(os.path.join(BASE_DIR, ".env"))
    args = build_parser().parse_args()

    print("\n--- Ollama Folder Organizer (Python) ---")
    input_dir = args.input_dir or args.folder or input("Enter input folder path: ").strip()
    result_dir = args.result_dir or input_dir

    if not os.path.isdir(input_dir) or not os.path.isdir(result_dir):
        print("Error: input_dir o result_dir non validi.")
        return

    llm = OllamaService(
        model=args.model,
        vision_model=args.vision_model,
        base_url=args.base_url,
        timeout=args.timeout,
    )
    print(f"Modello Ollama testo: {args.model}")
    print(f"Modello Ollama vision: {args.vision_model}")
    print(f"Endpoint Ollama: {args.base_url}")
    print(f"Timeout Ollama: {args.timeout}s")
    print(f"Dry run: {'si' if args.dry_run else 'no'}")

    try:
        installed_models = await llm.check_connection()
    except Exception as exc:
        print(f"\nError: {exc}")
        print("Nessun file e stato processato o spostato.")
        return

    if not model_is_available(args.model, installed_models):
        print(f"\nError: modello '{args.model}' non trovato in Ollama.")
        print(f"Esegui: ollama pull {args.model}")
        print("Nessun file e stato processato o spostato.")
        return

    if not model_is_available(args.vision_model, installed_models):
        print(f"Warning: modello vision '{args.vision_model}' non trovato.")
        print(f"Per immagini e PDF scansionati esegui: ollama pull {args.vision_model}")

    rev_dir = os.path.join(result_dir, "DaRevisionare")
    os.makedirs(rev_dir, exist_ok=True)

    undo_manager = UndoManager(os.path.join(result_dir, ".organizer_history.json"))
    session_id = undo_manager.start_session(input_dir, result_dir, args.dry_run)
    print(f"Sessione: {session_id}")

    available_folders = [
        f for f in os.listdir(result_dir) if os.path.isdir(os.path.join(result_dir, f))
    ]
    print(f"Cartelle disponibili: {', '.join(available_folders)}")

    files_to_process = [
        os.path.join(input_dir, f)
        for f in os.listdir(input_dir)
        if os.path.isfile(os.path.join(input_dir, f)) and not should_skip_file(os.path.join(input_dir, f))
    ]

    total = len(files_to_process)
    done = 0
    failed = 0

    print(f"Starting run: {total} files found.\n")

    for file_path in files_to_process:
        original_name = os.path.basename(file_path)
        result = await process_file(
            file_path,
            llm,
            result_dir,
            available_folders,
            args.dry_run,
            undo_manager,
        )

        if result["success"]:
            if result.get("renamed"):
                prefix = "DRY-RUN RENAME" if result.get("dry_run") else "RENAME"
                print(
                    f"{prefix} {original_name} -> {result['target']} "
                    f"(classificazione: {result['classification']}, tema: {result['theme']})"
                )
            elif result.get("kept"):
                prefix = "DRY-RUN KEEP" if args.dry_run else "KEEP"
                print(
                    f"{prefix} {original_name} in origine "
                    f"(classificazione: {result['classification']}, tema: {result['theme']})"
                )
            else:
                prefix = "DRY-RUN REVIEW" if result.get("dry_run") else "REVIEW"
                print(f"{prefix} {original_name} -> {result['target']}")
            done += 1
            continue

        error_code = result.get("code", "E_CRASH")
        print(f"FAILED {original_name} - {result['reason']}")

        try:
            if os.path.exists(file_path):
                fail_name = f"FAILED__{error_code}__{original_name}"
                fail_path = unique_path(os.path.join(rev_dir, fail_name))
                if args.dry_run:
                    print(f"  DRY-RUN quarantine -> {os.path.relpath(fail_path, result_dir)}")
                else:
                    undo_manager.record_move(file_path, fail_path, "DaRevisionare", action="quarantine")
                    shutil.move(file_path, fail_path)
                    print("  Quarantined to DaRevisionare")
        except Exception as exc:
            print(f"  Quarantine failed: {exc}")

        failed += 1

    undo_manager.finish_session("completed")

    print("\nRun completed.")
    print(f"Processed: {done}/{total}")
    print(f"Failed: {failed}")


def model_is_available(model_name: str, installed_models: List[str]) -> bool:
    expected = {model_name, f"{model_name}:latest"}
    return any(name in expected or name.split(":", 1)[0] == model_name for name in installed_models)


if __name__ == "__main__":
    asyncio.run(main())
