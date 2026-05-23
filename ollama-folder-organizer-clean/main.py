import argparse
import asyncio
import os
import sys
import uuid
from datetime import datetime
from typing import Dict, List, Optional, Set

from constants_py import REVIEW_FOLDER
from services.llm_gateway import LLMGateway
from services.llm_usage_logger import LLMUsageLogger
from services.grouping_service import apply_auto_groups
from services.naming import unique_path
from services.ollama_service import OllamaService
from services.organizer_types import FileAction
from services.run_reporter import RunReporter, build_record
from services.scanner_service import list_target_folders, scan_files
from services.undo_manager import UndoManager

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    from dotenv import load_dotenv
except ImportError:
    def load_dotenv(_path: str) -> bool:
        return False


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Organizza file usando un modello Ollama locale.")
    parser.add_argument("input_dir", help="Cartella da analizzare e organizzare.")
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Applica davvero rinomine e spostamenti. Senza questo flag viene eseguito un dry-run.",
    )
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
    return parser


async def main() -> int:
    load_dotenv(os.path.join(BASE_DIR, ".env"))
    args = build_parser().parse_args()
    from services.file_executor import execute_action
    from services.organizer_service import plan_scanned_file

    input_dir = os.path.abspath(args.input_dir)
    dry_run = not args.apply

    if not os.path.isdir(input_dir):
        print(f"Error: cartella non valida: {input_dir}")
        return 1

    session_id = _new_session_id()
    report_path = os.path.join(input_dir, ".organizer_reports", f"{session_id}.jsonl")
    usage_log_path = os.path.join(input_dir, ".organizer_logs", f"{session_id}.llm_usage.jsonl")
    reporter = RunReporter(report_path)
    usage_logger = LLMUsageLogger(usage_log_path)

    target_folders = list_target_folders(input_dir)
    llm = await _build_llm(args, usage_logger)

    undo_manager = None
    if args.apply:
        os.makedirs(os.path.join(input_dir, REVIEW_FOLDER), exist_ok=True)
        undo_manager = UndoManager(os.path.join(input_dir, ".organizer_history.json"))
        undo_manager.start_session(input_dir, input_dir, dry_run=False)

    files = scan_files(input_dir, target_folders)
    stats = {"done": 0, "planned": 0, "review": 0, "skipped": 0, "failed": 0}
    reserved_paths: Set[str] = set()

    print("\n--- Ollama Folder Organizer Clean ---")
    print(f"Cartella: {input_dir}")
    print(f"Modalita: {'APPLY' if args.apply else 'DRY-RUN'}")
    print(f"Cartelle target: {', '.join(target_folders)}")
    print(f"Report: {report_path}")
    print(f"Token log: {usage_log_path}")
    print(f"File trovati: {len(files)}\n")

    planned_actions = []
    for scanned_file in files:
        action = await plan_scanned_file(
            scanned_file,
            llm=llm,
            target_folders=target_folders,
        )
        planned_actions.append(action)

    planned_actions = apply_auto_groups(files, planned_actions)

    for scanned_file, planned_action in zip(files, planned_actions):
        planned_action = _reserve_planned_path(planned_action, reserved_paths)
        action = execute_action(planned_action, dry_run=dry_run, undo_manager=undo_manager)
        reporter.write(build_record(session_id, scanned_file, action, dry_run))
        _update_stats(stats, action.status)
        _print_action(scanned_file.relative_path, action)

    if undo_manager:
        undo_manager.finish_session("completed")

    print("\nRun completed.")
    print(
        "Summary: "
        f"done={stats['done']} planned={stats['planned']} review={stats['review']} "
        f"skipped={stats['skipped']} failed={stats['failed']}"
    )
    return 0 if stats["failed"] == 0 else 2


async def _build_llm(args: argparse.Namespace, usage_logger: LLMUsageLogger) -> Optional[LLMGateway]:
    ollama = OllamaService(
        model=args.model,
        vision_model=args.vision_model,
        base_url=args.base_url,
        timeout=args.timeout,
    )

    try:
        installed_models = await ollama.check_connection()
    except Exception as exc:
        usage_logger.log(
            operation="check_connection",
            model=args.model,
            input_tokens=None,
            output_tokens=None,
            duration_ms=0,
            attempts=1,
            errors=[str(exc)],
            success=False,
        )
        print(f"Warning: Ollama non disponibile. I file supportati andranno in {REVIEW_FOLDER}.")
        print(f"  Dettaglio: {exc}")
        return None

    if not model_is_available(args.model, installed_models):
        usage_logger.log(
            operation="check_connection",
            model=args.model,
            input_tokens=None,
            output_tokens=None,
            duration_ms=0,
            attempts=1,
            errors=[f"Modello '{args.model}' non trovato in Ollama."],
            success=False,
        )
        print(f"Warning: modello testo '{args.model}' non trovato. I file supportati andranno in {REVIEW_FOLDER}.")
        print(f"  Esegui: ollama pull {args.model}")
        return None

    if not model_is_available(args.vision_model, installed_models):
        print(f"Warning: modello vision '{args.vision_model}' non trovato.")
        print(f"  Immagini e PDF scansionati potrebbero andare in {REVIEW_FOLDER}.")

    return LLMGateway(ollama, usage_logger)


def model_is_available(model_name: str, installed_models: List[str]) -> bool:
    expected = {model_name, f"{model_name}:latest"}
    return any(name in expected or name.split(":", 1)[0] == model_name for name in installed_models)


def _new_session_id() -> str:
    return f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}"


def _update_stats(stats: Dict[str, int], status: str) -> None:
    if status in stats:
        stats[status] += 1
    elif status == "done":
        stats["done"] += 1
    else:
        stats["failed"] += 1


def _print_action(relative_path: str, action) -> None:
    target = action.new_path or "-"
    print(f"{action.status.upper():8} {action.action:14} {relative_path} -> {target} | {action.reason}")


def _reserve_planned_path(action: FileAction, reserved_paths: Set[str]) -> FileAction:
    if not action.new_path:
        return action

    candidate = unique_path(action.new_path)
    if candidate in reserved_paths:
        candidate = _unique_planned_path(candidate, reserved_paths)
    reserved_paths.add(candidate)

    if candidate == action.new_path:
        return action

    return FileAction(
        action=action.action,
        old_path=action.old_path,
        new_path=candidate,
        new_name=os.path.basename(candidate),
        target_folder=action.target_folder,
        status=action.status,
        reason=action.reason,
    )


def _unique_planned_path(path: str, reserved_paths: Set[str]) -> str:
    directory, filename = os.path.split(path)
    stem, ext = os.path.splitext(filename)
    counter = 2
    while True:
        candidate = os.path.join(directory, f"{stem}_{counter}{ext}")
        if candidate not in reserved_paths and not os.path.exists(candidate):
            return candidate
        counter += 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
