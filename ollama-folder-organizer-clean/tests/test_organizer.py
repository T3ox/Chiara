import json
import os
import tempfile
import unittest
from typing import Optional

from constants_py import REVIEW_FOLDER
from main import _reserve_planned_path
from services.classifier_service import parse_classification
from services.decision_service import action_for_unsupported, decide_action
from services.file_executor import execute_action
from services.grouping_service import apply_auto_groups
from services.naming import sanitize_name, unique_path
from services.organizer_types import ClassificationResult, FileAction, ScannedFile
from services.run_reporter import RunReporter, build_record
from services.scanner_service import list_target_folders, scan_files
from services.undo_manager import UndoManager


class OrganizerUnitTests(unittest.TestCase):
    def test_sanitize_name_normalizes_accents_and_symbols(self):
        self.assertEqual(sanitize_name("Fattura città: cliente/2026.pdf"), "Fattura citta cliente2026pdf")

    def test_parse_classification_json(self):
        result = parse_classification(
            '{"new_name":"Fattura Cliente","target_folder":"Fatture","confidence":"high","reason":"Documento fiscale"}'
        )
        self.assertEqual(result.new_name, "Fattura Cliente")
        self.assertEqual(result.target_folder, "Fatture")
        self.assertEqual(result.confidence, "high")
        self.assertEqual(result.reason, "Documento fiscale")

    def test_low_confidence_goes_to_review(self):
        scanned = _scanned("/tmp/root/file.txt", "/tmp/root", "file.txt", "text")
        action = decide_action(
            scanned,
            ClassificationResult("Nome", "Fatture", "low", "Troppo ambiguo"),
            ["Fatture", REVIEW_FOLDER],
        )
        self.assertEqual(action.action, "move_to_review")
        self.assertEqual(action.target_folder, REVIEW_FOLDER)
        self.assertEqual(action.new_name, "Nome.txt")

    def test_unique_path_adds_suffix(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            existing = os.path.join(tmpdir, "file.txt")
            open(existing, "w", encoding="utf-8").close()
            self.assertEqual(unique_path(existing), os.path.join(tmpdir, "file_2.txt"))

    def test_unsupported_file_is_skipped(self):
        scanned = _scanned("/tmp/root/file.exe", "/tmp/root", "file.exe", None)
        action = action_for_unsupported(scanned)
        self.assertEqual(action.action, "skip")
        self.assertEqual(action.status, "skipped")


class OrganizerIntegrationTests(unittest.TestCase):
    def test_scanner_skips_target_review_hidden_and_organizer_dirs(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            os.mkdir(os.path.join(tmpdir, "Fatture"))
            os.mkdir(os.path.join(tmpdir, REVIEW_FOLDER))
            os.mkdir(os.path.join(tmpdir, ".organizer_reports"))
            _write(os.path.join(tmpdir, "root.txt"), "root")
            _write(os.path.join(tmpdir, "Fatture", "done.txt"), "done")
            _write(os.path.join(tmpdir, REVIEW_FOLDER, "review.txt"), "review")
            _write(os.path.join(tmpdir, ".organizer_reports", "report.txt"), "report")

            target_folders = list_target_folders(tmpdir)
            files = scan_files(tmpdir, target_folders)

        self.assertEqual([file.relative_path for file in files], ["root.txt"])

    def test_dry_run_writes_report_without_moving_file(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            os.mkdir(os.path.join(tmpdir, "Fatture"))
            source = os.path.join(tmpdir, "source.txt")
            _write(source, "contenuto")
            scanned = _scanned(source, tmpdir, "source.txt", "text")
            classification = ClassificationResult("Nuovo Nome", "Fatture", "high", "Ok")
            action = decide_action(scanned, classification, ["Fatture", REVIEW_FOLDER])
            result = execute_action(action, dry_run=True)

            report_path = os.path.join(tmpdir, ".organizer_reports", "test.jsonl")
            reporter = RunReporter(report_path)
            reporter.write(build_record("session", scanned, result, dry_run=True))

            self.assertTrue(os.path.exists(source))
            self.assertFalse(os.path.exists(os.path.join(tmpdir, "Fatture", "Nuovo Nome.txt")))
            with open(report_path, "r", encoding="utf-8") as file:
                record = json.loads(file.readline())
            self.assertEqual(record["action"], "rename_move")
            self.assertTrue(record["dry_run"])

    def test_dry_run_reserves_colliding_planned_paths(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            first = os.path.join(tmpdir, "target.txt")
            action = _action(first)
            reserved = set()

            first_result = _reserve_planned_path(action, reserved)
            second_result = _reserve_planned_path(action, reserved)

        self.assertEqual(first_result.new_path, first)
        self.assertEqual(second_result.new_path, os.path.join(tmpdir, "target_2.txt"))

    def test_apply_rename_move_and_undo(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            os.mkdir(os.path.join(tmpdir, "Fatture"))
            source = os.path.join(tmpdir, "source.txt")
            _write(source, "contenuto")
            scanned = _scanned(source, tmpdir, "source.txt", "text")
            action = decide_action(
                scanned,
                ClassificationResult("Nuovo Nome", "Fatture", "high", "Ok"),
                ["Fatture", REVIEW_FOLDER],
            )

            undo = UndoManager(os.path.join(tmpdir, ".organizer_history.json"))
            undo.start_session(tmpdir, tmpdir, dry_run=False)
            result = execute_action(action, dry_run=False, undo_manager=undo)
            undo.finish_session("completed")

            moved = os.path.join(tmpdir, "Fatture", "Nuovo Nome.txt")
            self.assertEqual(result.status, "done")
            self.assertFalse(os.path.exists(source))
            self.assertTrue(os.path.exists(moved))

            undo_result = UndoManager(os.path.join(tmpdir, ".organizer_history.json")).undo_last_session()
            self.assertTrue(undo_result["success"])
            self.assertTrue(os.path.exists(source))
            self.assertFalse(os.path.exists(moved))

    def test_review_uses_proposed_name_when_available(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            source = os.path.join(tmpdir, "source.txt")
            _write(source, "contenuto")
            scanned = _scanned(source, tmpdir, "source.txt", "text")
            action = decide_action(
                scanned,
                ClassificationResult("Qualcosa", "Fatture", "low", "Incerto"),
                ["Fatture", REVIEW_FOLDER],
            )
            result = execute_action(action, dry_run=False)

            self.assertEqual(result.status, "done")
            self.assertTrue(os.path.exists(os.path.join(tmpdir, REVIEW_FOLDER, "Qualcosa.txt")))

    def test_auto_group_creates_folder_for_three_similar_images(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            scanned_files = [
                _scanned(os.path.join(tmpdir, f"img{index}.jpg"), tmpdir, f"img{index}.jpg", "images")
                for index in range(3)
            ]
            actions = [
                _action(os.path.join(tmpdir, REVIEW_FOLDER, f"Panorama Montagna {index}.jpg"))
                for index in range(3)
            ]

            grouped = apply_auto_groups(scanned_files, actions)

        self.assertTrue(all(action.action == "rename_move" for action in grouped))
        self.assertTrue(all(action.target_folder == "Immagini Panorama" for action in grouped))
        self.assertTrue(all("/Immagini Panorama/" in action.new_path for action in grouped))


def _scanned(path: str, root: str, relative_path: str, file_type: Optional[str]) -> ScannedFile:
    return ScannedFile(
        path=path,
        root_dir=root,
        relative_path=relative_path,
        name=os.path.basename(path),
        extension=os.path.splitext(path)[1].lower(),
        file_type=file_type,
        size=0,
    )


def _write(path: str, content: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)


def _action(path: str):
    return FileAction(
        action="rename_move",
        old_path="/tmp/source.txt",
        new_path=path,
        new_name=os.path.basename(path),
        target_folder="Fatture",
        status="planned",
        reason="Ok",
    )


if __name__ == "__main__":
    unittest.main()
