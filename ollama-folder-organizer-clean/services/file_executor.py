import os
import shutil
from typing import Optional

from services.organizer_types import FileAction
from services.undo_manager import UndoManager


def execute_action(action: FileAction, dry_run: bool, undo_manager: Optional[UndoManager] = None) -> FileAction:
    if dry_run or action.action == "skip":
        return action

    if not action.new_path:
        return action

    os.makedirs(os.path.dirname(action.new_path), exist_ok=True)
    shutil.move(action.old_path, action.new_path)

    if undo_manager:
        undo_manager.record_move(
            action.old_path,
            action.new_path,
            action.target_folder or "",
            action=action.action,
        )

    return FileAction(
        action=action.action,
        old_path=action.old_path,
        new_path=action.new_path,
        new_name=action.new_name,
        target_folder=action.target_folder,
        status="done",
        reason=action.reason,
    )
