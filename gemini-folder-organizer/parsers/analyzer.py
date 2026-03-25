import os
import logging
from typing import Optional
from models.datatypes import FileContext, FileType, ErrorCode, ProcessResult
from config.settings import SUPPORTED_EXTENSIONS
from .base import BaseParser
from .pdf_parser import PdfParser
from .docx_parser import DocxParser
from .xlsx_parser import XlsxParser
from .image_parser import ImageParser

logger = logging.getLogger(__name__)

class FileAnalyzer:
    def __init__(self):
        self.parsers = {
            FileType.PDF: PdfParser(),
            FileType.DOCX: DocxParser(),
            FileType.EXCEL: XlsxParser(),
            FileType.IMAGES: ImageParser(),
        }

    def analyze_file(self, file_path: str) -> FileContext:
        file_name = os.path.basename(file_path)
        ext = os.path.splitext(file_name)[1].lower()
        file_type = SUPPORTED_EXTENSIONS.get(ext, FileType.UNKNOWN)
        
        return FileContext(
            file_path=file_path,
            file_name=file_name,
            extension=ext,
            file_type=file_type
        )
        
    def parse_content(self, context: FileContext) -> FileContext:
        if context.file_type == FileType.UNKNOWN:
            logger.warning(f"Unknown or unsupported extension for {context.file_name}")
            return context
            
        parser = self.parsers.get(context.file_type)
        if parser:
            return parser.parse(context)
        return context
