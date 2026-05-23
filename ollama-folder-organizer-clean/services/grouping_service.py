import os
import re
from collections import defaultdict
from typing import Dict, Iterable, List, Sequence, Tuple

from constants_py import REVIEW_FOLDER
from services.naming import sanitize_name, unique_path
from services.organizer_types import FileAction, ScannedFile

MIN_GROUP_SIZE = 3

TYPE_FOLDER_PREFIX = {
    "images": "Immagini",
    "pdf": "PDF",
    "docx": "Documenti Word",
    "excel": "Fogli Excel",
    "presentation": "Presentazioni",
    "text": "Testi",
}

STOPWORDS = {
    "file",
    "documento",
    "documenti",
    "immagine",
    "immagini",
    "foto",
    "testo",
    "test",
    "report",
    "varie",
    "vario",
    "nuovo",
    "nome",
    "da",
    "di",
    "del",
    "della",
    "dei",
    "il",
    "la",
    "lo",
    "le",
    "gli",
    "un",
    "una",
    "per",
}


def apply_auto_groups(scanned_files: Sequence[ScannedFile], actions: Sequence[FileAction]) -> List[FileAction]:
    candidates = [
        (scanned_file, action)
        for scanned_file, action in zip(scanned_files, actions)
        if _can_group(scanned_file, action)
    ]
    grouped_paths = _topic_groups(candidates)
    grouped_indices = set()
    updated = list(actions)

    for folder_name, entries in grouped_paths:
        for scanned_file, action in entries:
            index = scanned_files.index(scanned_file)
            updated[index] = _move_to_group(scanned_file, action, folder_name)
            grouped_indices.add(index)

    remaining = [
        (scanned_file, action)
        for index, (scanned_file, action) in enumerate(zip(scanned_files, updated))
        if index not in grouped_indices and _can_group(scanned_file, action)
    ]

    for folder_name, entries in _type_groups(remaining):
        for scanned_file, action in entries:
            index = scanned_files.index(scanned_file)
            updated[index] = _move_to_group(scanned_file, action, folder_name)

    return updated


def _topic_groups(candidates: Sequence[Tuple[ScannedFile, FileAction]]) -> List[Tuple[str, List[Tuple[ScannedFile, FileAction]]]]:
    buckets: Dict[Tuple[str, str], List[Tuple[ScannedFile, FileAction]]] = defaultdict(list)
    for scanned_file, action in candidates:
        tokens = _topic_tokens(action.new_name or scanned_file.name)
        if tokens:
            buckets[(scanned_file.file_type or "", tokens[0])].append((scanned_file, action))

    groups = []
    used_paths = set()
    for (file_type, token), entries in sorted(buckets.items(), key=lambda item: (-len(item[1]), item[0])):
        fresh_entries = [(scanned_file, action) for scanned_file, action in entries if scanned_file.path not in used_paths]
        if len(fresh_entries) < MIN_GROUP_SIZE:
            continue
        folder_name = sanitize_name(f"{_type_prefix(file_type)} {token.title()}")
        groups.append((folder_name, fresh_entries))
        used_paths.update(scanned_file.path for scanned_file, _action in fresh_entries)
    return groups


def _type_groups(candidates: Sequence[Tuple[ScannedFile, FileAction]]) -> List[Tuple[str, List[Tuple[ScannedFile, FileAction]]]]:
    buckets: Dict[str, List[Tuple[ScannedFile, FileAction]]] = defaultdict(list)
    for scanned_file, action in candidates:
        buckets[scanned_file.file_type or ""].append((scanned_file, action))

    groups = []
    for file_type, entries in sorted(buckets.items()):
        if len(entries) >= MIN_GROUP_SIZE:
            groups.append((_type_prefix(file_type), entries))
    return groups


def _move_to_group(scanned_file: ScannedFile, action: FileAction, folder_name: str) -> FileAction:
    filename = action.new_name or scanned_file.name
    stem, ext = os.path.splitext(filename)
    if not ext:
        filename = f"{sanitize_name(stem)}{scanned_file.extension}"
    else:
        filename = f"{sanitize_name(stem)}{ext.lower()}"
    target_path = unique_path(os.path.join(scanned_file.root_dir, folder_name, filename))
    return FileAction(
        action="rename_move",
        old_path=action.old_path,
        new_path=target_path,
        new_name=filename,
        target_folder=folder_name,
        status="planned",
        reason=f"{action.reason} Raggruppato automaticamente per file simili.",
    )


def _can_group(scanned_file: ScannedFile, action: FileAction) -> bool:
    return (
        bool(scanned_file.file_type)
        and action.action in {"rename_move", "move_to_review"}
        and action.status in {"planned", "review"}
        and bool(action.new_name)
    )


def _topic_tokens(name: str) -> List[str]:
    stem = os.path.splitext(name)[0]
    normalized = sanitize_name(stem).lower()
    tokens = []
    for token in re.split(r"\s+", normalized):
        if len(token) <= 2 or token.isdigit() or token in STOPWORDS:
            continue
        tokens.append(token)
    return tokens[:3]


def _type_prefix(file_type: str) -> str:
    return TYPE_FOLDER_PREFIX.get(file_type, "File")
