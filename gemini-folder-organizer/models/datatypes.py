from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class FileType(str, Enum):
    PDF = "pdf"
    DOCX = "docx"
    EXCEL = "excel"
    IMAGES = "images"
    UNKNOWN = "unknown"

class ErrorCode(str, Enum):
    UNSUPPORTED = "UNSUP"
    EMPTY_CONTENT = "EMPTY"
    API_ERROR = "API"
    BAD_OUTPUT = "BADOUT"
    STOPPED = "STOPPED"
    FILE_NOT_FOUND = "NOTFOUND"
    QUARANTINED = "QUARANTINED"
    SYSTEM_ERROR = "SYSERR"

class FileContext(BaseModel):
    file_path: str
    file_name: str
    extension: str
    file_type: FileType = FileType.UNKNOWN
    
    # Content Extracted
    extracted_text: Optional[str] = None
    extracted_image_b64: Optional[str] = None
    extracted_pdf_b64: Optional[str] = None

class GeminiResponse(BaseModel):
    new_name: str = Field(description="Il nuovo nome del file scelto (senza l'estensione)")
    target_folder: str = Field(description="Esattamente la cartella di destinazione scelta tra quelle disponibili")

class ProcessResult(BaseModel):
    success: bool
    original_path: str
    target_path: Optional[str] = None
    error_code: Optional[ErrorCode] = None
    error_reason: Optional[str] = None
    new_name: Optional[str] = None
    target_folder: Optional[str] = None
