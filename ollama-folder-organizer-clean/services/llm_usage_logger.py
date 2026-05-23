import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


class LLMUsageLogger:
    def __init__(self, log_path: str):
        self.log_path = log_path

    def log(
        self,
        *,
        operation: str,
        model: str,
        input_tokens: Optional[int],
        output_tokens: Optional[int],
        duration_ms: int,
        attempts: int,
        errors: List[str],
        success: bool,
    ) -> None:
        event: Dict[str, Any] = {
            "timestamp": self._timestamp(),
            "operation": operation,
            "model": model,
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "duration_ms": duration_ms,
            "attempts": attempts,
            "errors": [self._sanitize_error(error) for error in errors],
            "success": success,
        }

        directory = os.path.dirname(self.log_path)
        if directory:
            os.makedirs(directory, exist_ok=True)

        with open(self.log_path, "a", encoding="utf-8") as log_file:
            log_file.write(json.dumps(event, ensure_ascii=False, separators=(",", ":")) + "\n")

    @staticmethod
    def _timestamp() -> str:
        return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")

    @staticmethod
    def _sanitize_error(error: str) -> str:
        return " ".join(str(error).split())[:300]
