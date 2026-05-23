import os
import re
import unicodedata


UNCERTAIN_NAMES = {
    "",
    "darevisionare",
    "revisionare",
    "unknown",
    "sconosciuto",
    "nonclassificato",
    "senzanome",
    "nuovonomedelfile",
    "nuovonomefile",
    "nomefile",
    "nomefilesenzaestensione",
    "newfilename",
    "filename",
    "file",
}


def sanitize_name(name: str, fallback: str = "DA_REVISIONARE", max_length: int = 70) -> str:
    normalized = unicodedata.normalize("NFKD", name or "")
    ascii_name = normalized.encode("ascii", "ignore").decode("ascii")
    cleaned = re.sub(r"[_\s]+", " ", ascii_name.strip())
    cleaned = re.sub(r"[^a-zA-Z0-9 -]+", "", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" -")

    if len(cleaned) <= max_length:
        return cleaned or fallback

    truncated = cleaned[:max_length].rsplit(" ", 1)[0].strip(" -")
    return truncated or cleaned[:max_length].strip(" -") or fallback


def is_uncertain_name(name: str) -> bool:
    normalized = re.sub(r"[^a-z0-9]+", "", sanitize_name(name).lower())
    return normalized in UNCERTAIN_NAMES


def unique_path(path: str) -> str:
    if not os.path.exists(path):
        return path

    directory, filename = os.path.split(path)
    stem, ext = os.path.splitext(filename)
    counter = 2

    while True:
        candidate = os.path.join(directory, f"{stem}_{counter}{ext}")
        if not os.path.exists(candidate):
            return candidate
        counter += 1
