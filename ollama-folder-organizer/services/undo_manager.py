import json
import os
import shutil
from datetime import datetime
from typing import Dict, List, Optional


class UndoManager:
    def __init__(self, history_path: str):
        self.history_path = history_path
        self.current_session_id: Optional[str] = None
        self.history = self._load_history()

    def start_session(self, input_dir: str, result_dir: str, dry_run: bool) -> str:
        session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        session = {
            "id": session_id,
            "timestamp": datetime.now().isoformat(timespec="seconds"),
            "input_dir": os.path.abspath(input_dir),
            "result_dir": os.path.abspath(result_dir),
            "dry_run": dry_run,
            "moves": [],
            "status": "in_progress",
        }
        self.history["sessions"].append(session)
        self.current_session_id = session_id
        self._save_history()
        return session_id

    def record_move(
        self,
        original_path: str,
        new_path: str,
        target_folder: str,
        action: str = "move_to_review",
        theme: str = "",
    ) -> None:
        session = self._current_session()
        if not session:
            return

        session["moves"].append(
            {
                "original": os.path.abspath(original_path),
                "new": os.path.abspath(new_path),
                "action": action,
                "target_folder": target_folder,
                "theme": theme,
                "timestamp": datetime.now().isoformat(timespec="seconds"),
            }
        )
        self._save_history()

    def finish_session(self, status: str) -> None:
        session = self._current_session()
        if not session:
            return
        session["status"] = status
        session["finished_at"] = datetime.now().isoformat(timespec="seconds")
        self._save_history()

    def undo_last_session(self) -> Dict[str, object]:
        sessions: List[Dict[str, object]] = self.history.get("sessions", [])
        candidates = [
            session
            for session in reversed(sessions)
            if session.get("status") == "completed" and not session.get("dry_run")
        ]

        if not candidates:
            return {"success": False, "reason": "Nessuna sessione completata da annullare.", "restored": 0}

        session = candidates[0]
        restored = 0
        errors = []

        for move in reversed(session.get("moves", [])):
            original = str(move["original"])
            new = str(move["new"])

            if not os.path.exists(new):
                errors.append(f"Manca file spostato: {new}")
                continue

            os.makedirs(os.path.dirname(original), exist_ok=True)
            if os.path.exists(original):
                errors.append(f"Percorso originale gia esistente: {original}")
                continue

            shutil.move(new, original)
            self._remove_empty_dir(os.path.dirname(new), session)
            restored += 1

        session["status"] = "undone" if not errors else "undo_partial"
        session["undone_at"] = datetime.now().isoformat(timespec="seconds")
        self._save_history()

        return {"success": not errors, "restored": restored, "errors": errors, "session_id": session["id"]}

    def _current_session(self) -> Optional[Dict[str, object]]:
        if not self.current_session_id:
            return None
        return next(
            (session for session in self.history["sessions"] if session["id"] == self.current_session_id),
            None,
        )

    def _load_history(self) -> Dict[str, List[Dict[str, object]]]:
        if not os.path.exists(self.history_path):
            return {"sessions": []}

        with open(self.history_path, "r", encoding="utf-8") as file:
            return json.load(file)

    def _save_history(self) -> None:
        history_dir = os.path.dirname(self.history_path)
        if history_dir:
            os.makedirs(history_dir, exist_ok=True)
        with open(self.history_path, "w", encoding="utf-8") as file:
            json.dump(self.history, file, ensure_ascii=False, indent=2)

    @staticmethod
    def _remove_empty_dir(target_dir: str, session: Dict[str, object]) -> None:
        stop_dirs = {
            os.path.abspath(str(session.get("input_dir", ""))),
            os.path.abspath(str(session.get("result_dir", ""))),
        }
        current = os.path.abspath(target_dir)

        if current in stop_dirs:
            return

        try:
            os.rmdir(current)
        except OSError:
            return
