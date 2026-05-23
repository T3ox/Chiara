import os
from typing import Iterable, Optional

from constants_py import REVIEW_FOLDER
from services.naming import is_uncertain_name, sanitize_name, unique_path
from services.organizer_types import ClassificationResult, FileAction, ScannedFile


def action_for_unsupported(scanned_file: ScannedFile) -> FileAction:
    return FileAction(
        action="skip",
        old_path=scanned_file.path,
        new_path=None,
        new_name=None,
        target_folder=None,
        status="skipped",
        reason=f"Estensione {scanned_file.extension or '(nessuna)'} non supportata.",
    )


def action_for_review(scanned_file: ScannedFile, reason: str, proposed_name: Optional[str] = None) -> FileAction:
    review_name = _review_filename(scanned_file, proposed_name)
    new_path = unique_path(os.path.join(scanned_file.root_dir, REVIEW_FOLDER, review_name))
    return FileAction(
        action="move_to_review",
        old_path=scanned_file.path,
        new_path=new_path,
        new_name=review_name,
        target_folder=REVIEW_FOLDER,
        status="review",
        reason=reason,
    )


def decide_action(
    scanned_file: ScannedFile,
    classification: ClassificationResult,
    target_folders: Iterable[str],
) -> FileAction:
    allowed_folders = set(target_folders)
    if classification.confidence == "low":
        return action_for_review(
            scanned_file,
            classification.reason or "Classificazione incerta.",
            classification.new_name,
        )

    if classification.target_folder not in allowed_folders:
        return action_for_review(
            scanned_file,
            f"Cartella proposta non valida: {classification.target_folder}.",
            classification.new_name,
        )

    if classification.target_folder == REVIEW_FOLDER or is_uncertain_name(classification.new_name):
        return action_for_review(
            scanned_file,
            classification.reason or "Nome o destinazione incerti.",
            classification.new_name,
        )

    clean_name = sanitize_name(classification.new_name)
    target_path = unique_path(
        os.path.join(scanned_file.root_dir, classification.target_folder, f"{clean_name}{scanned_file.extension}")
    )
    return FileAction(
        action="rename_move",
        old_path=scanned_file.path,
        new_path=target_path,
        new_name=f"{clean_name}{scanned_file.extension}",
        target_folder=classification.target_folder,
        status="planned",
        reason=classification.reason,
    )


def _review_filename(scanned_file: ScannedFile, proposed_name: Optional[str]) -> str:
    if not proposed_name or is_uncertain_name(proposed_name):
        return scanned_file.name
    clean_name = sanitize_name(proposed_name)
    return f"{clean_name}{scanned_file.extension}"
