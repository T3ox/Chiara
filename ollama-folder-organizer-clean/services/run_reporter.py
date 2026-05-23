import json
import os
from datetime import datetime, timezone
from typing import Any, Dict

from services.organizer_types import FileAction, RunRecord, ScannedFile


class RunReporter:
    def __init__(self, report_path: str):
        self.report_path = report_path
        directory = os.path.dirname(report_path)
        if directory:
            os.makedirs(directory, exist_ok=True)

    def write(self, record: RunRecord) -> None:
        payload: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z"),
            **record.to_dict(),
        }
        with open(self.report_path, "a", encoding="utf-8") as file:
            file.write(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n")


def build_record(session_id: str, scanned_file: ScannedFile, action: FileAction, dry_run: bool) -> RunRecord:
    return RunRecord(
        session_id=session_id,
        old_path=scanned_file.path,
        old_name=scanned_file.name,
        new_name=action.new_name,
        target_path=action.new_path,
        action=action.action,
        status=action.status,
        reason=action.reason,
        dry_run=dry_run,
        file_type=scanned_file.file_type,
    )
