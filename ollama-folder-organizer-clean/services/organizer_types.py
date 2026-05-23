from dataclasses import asdict, dataclass, field
from typing import Any, Dict, Optional


@dataclass(frozen=True)
class ScannedFile:
    path: str
    root_dir: str
    relative_path: str
    name: str
    extension: str
    file_type: Optional[str]
    size: int


@dataclass(frozen=True)
class ExtractedContent:
    text: str = ""
    image_data: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)

    def has_content(self) -> bool:
        return bool(self.text or self.image_data)

    def to_llm_payload(self) -> Dict[str, str]:
        payload: Dict[str, str] = {}
        if self.text:
            payload["text"] = self.text
        if self.image_data:
            payload["image_data"] = self.image_data
        return payload


@dataclass(frozen=True)
class ClassificationResult:
    new_name: str
    target_folder: str
    confidence: str
    reason: str
    raw: str = ""


@dataclass(frozen=True)
class FileAction:
    action: str
    old_path: str
    new_path: Optional[str]
    new_name: Optional[str]
    target_folder: Optional[str]
    status: str
    reason: str


@dataclass(frozen=True)
class RunRecord:
    session_id: str
    old_path: str
    old_name: str
    new_name: Optional[str]
    target_path: Optional[str]
    action: str
    status: str
    reason: str
    dry_run: bool
    file_type: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
