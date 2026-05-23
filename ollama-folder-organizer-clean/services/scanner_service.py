import os
from typing import Iterable, List, Set

from constants_py import ORGANIZER_PREFIX, REVIEW_FOLDER, SUPPORTED_EXTENSIONS
from services.organizer_types import ScannedFile


IGNORED_FILENAMES = {".DS_Store"}


def list_target_folders(root_dir: str) -> List[str]:
    folders = [
        name
        for name in sorted(os.listdir(root_dir))
        if os.path.isdir(os.path.join(root_dir, name))
        and not name.startswith(".")
        and not name.startswith(ORGANIZER_PREFIX)
        and name != REVIEW_FOLDER
    ]
    return folders + [REVIEW_FOLDER]


def scan_files(root_dir: str, target_folders: Iterable[str]) -> List[ScannedFile]:
    root_dir = os.path.abspath(root_dir)
    skipped_dirs = set(target_folders)
    results: List[ScannedFile] = []

    for current_dir, dirs, files in os.walk(root_dir, topdown=True):
        dirs[:] = [
            directory
            for directory in dirs
            if not _should_skip_dir(directory, skipped_dirs)
        ]

        for filename in sorted(files):
            if _should_skip_file(filename):
                continue

            path = os.path.join(current_dir, filename)
            extension = os.path.splitext(filename)[1].lower()
            results.append(
                ScannedFile(
                    path=path,
                    root_dir=root_dir,
                    relative_path=os.path.relpath(path, root_dir),
                    name=filename,
                    extension=extension,
                    file_type=SUPPORTED_EXTENSIONS.get(extension),
                    size=os.path.getsize(path),
                )
            )

    return results


def _should_skip_dir(name: str, skipped_dirs: Set[str]) -> bool:
    return (
        name in skipped_dirs
        or name.startswith(".")
        or name.startswith(ORGANIZER_PREFIX)
    )


def _should_skip_file(name: str) -> bool:
    return (
        name in IGNORED_FILENAMES
        or name.startswith(".")
        or name.startswith(ORGANIZER_PREFIX)
    )
