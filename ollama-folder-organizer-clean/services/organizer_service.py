from typing import Iterable, Optional

from services.classifier_service import classify_with_llm
from services.content_service import extract_content
from services.decision_service import action_for_review, action_for_unsupported, decide_action
from services.file_executor import execute_action
from services.llm_gateway import LLMGateway
from services.organizer_types import FileAction, ScannedFile
from services.undo_manager import UndoManager


async def process_scanned_file(
    scanned_file: ScannedFile,
    *,
    llm: Optional[LLMGateway],
    target_folders: Iterable[str],
    dry_run: bool,
    undo_manager: Optional[UndoManager],
) -> FileAction:
    action = await plan_scanned_file(
        scanned_file,
        llm=llm,
        target_folders=target_folders,
    )
    return _execute_or_fail(action, dry_run, undo_manager)


async def plan_scanned_file(
    scanned_file: ScannedFile,
    *,
    llm: Optional[LLMGateway],
    target_folders: Iterable[str],
) -> FileAction:
    if not scanned_file.file_type:
        return action_for_unsupported(scanned_file)

    try:
        content = extract_content(scanned_file)
    except Exception as exc:
        return action_for_review(scanned_file, f"Errore estrazione contenuto: {exc}")

    if not content.has_content():
        return action_for_review(scanned_file, "Contenuto non estraibile.")

    if llm is None:
        return action_for_review(scanned_file, "Ollama non disponibile.")

    try:
        classification = await classify_with_llm(scanned_file, content, llm, target_folders)
        return decide_action(scanned_file, classification, target_folders)
    except Exception as exc:
        return action_for_review(scanned_file, f"Errore classificazione LLM: {exc}")


def _execute_or_fail(action: FileAction, dry_run: bool, undo_manager: Optional[UndoManager]) -> FileAction:
    try:
        return execute_action(action, dry_run=dry_run, undo_manager=undo_manager)
    except Exception as exc:
        return FileAction(
            action=action.action,
            old_path=action.old_path,
            new_path=action.new_path,
            new_name=action.new_name,
            target_folder=action.target_folder,
            status="failed",
            reason=f"Errore filesystem: {exc}",
        )
