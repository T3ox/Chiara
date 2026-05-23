import json
from typing import Iterable, List

from constants_py import REVIEW_FOLDER
from services.llm_gateway import LLMGateway
from services.naming import sanitize_name
from services.organizer_types import ClassificationResult, ExtractedContent, ScannedFile


VALID_CONFIDENCE = {"high", "medium", "low"}


class ClassificationError(RuntimeError):
    pass


async def classify_with_llm(
    scanned_file: ScannedFile,
    content: ExtractedContent,
    llm: LLMGateway,
    target_folders: Iterable[str],
) -> ClassificationResult:
    folders = list(target_folders)
    raw = await llm.classify_file(
        scanned_file.file_type or "default",
        content.to_llm_payload(),
        scanned_file.name,
        folders,
    )

    try:
        return parse_classification(raw)
    except ClassificationError:
        repaired = await llm.repair_output(raw, folders)
        return parse_classification(repaired)


def parse_classification(raw: str) -> ClassificationResult:
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ClassificationError(f"Output LLM non JSON: {raw[:200]}") from exc

    if not isinstance(payload, dict):
        raise ClassificationError("Output LLM JSON non oggetto.")

    new_name = payload.get("new_name") or payload.get("name") or payload.get("filename")
    target_folder = payload.get("target_folder") or payload.get("folder") or payload.get("category")
    confidence = str(payload.get("confidence") or "low").strip().lower()
    reason = str(payload.get("reason") or "").strip()

    if not new_name or not target_folder:
        raise ClassificationError("Output LLM senza new_name o target_folder.")

    if confidence not in VALID_CONFIDENCE:
        confidence = "low"

    return ClassificationResult(
        new_name=sanitize_name(str(new_name)),
        target_folder=str(target_folder).strip() or REVIEW_FOLDER,
        confidence=confidence,
        reason=reason or "Classificazione completata.",
        raw=raw,
    )


def review_classification(reason: str) -> ClassificationResult:
    return ClassificationResult(
        new_name="DA_REVISIONARE",
        target_folder=REVIEW_FOLDER,
        confidence="low",
        reason=reason,
    )
