from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any

import yaml


APP_DIR = Path(__file__).resolve().parent
DATA_FILE = APP_DIR / "data" / "site_config.yaml"


@lru_cache(maxsize=1)
def load_site_config() -> dict[str, Any]:
    with DATA_FILE.open("r", encoding="utf-8") as file:
        data = yaml.safe_load(file) or {}

    # Basic normalization so templates can rely on keys.
    data.setdefault("brand_name", "FolderOrganizer")
    data.setdefault("tagline", "")
    data.setdefault("contact_email", "")
    data.setdefault("contact_phone", "")
    data.setdefault("show_social", True)
    data.setdefault("social_links", {})
    return data
