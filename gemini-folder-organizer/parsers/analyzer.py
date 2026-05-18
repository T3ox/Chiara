import os
import logging
from typing import Optional
from models.datatypes import FileContext, FileType, ErrorCode, ProcessResult
from config.settings import SUPPORTED_EXTENSIONS
from .screenshot_generator import ScreenshotGenerator

logger = logging.getLogger(__name__)

class FileAnalyzer:
    def __init__(self):
        self.screenshot_gen = ScreenshotGenerator()

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
            
        screenshot_b64 = self.screenshot_gen.generate_screenshot_b64(context.file_path)
        if screenshot_b64:
            context.preview_image_b64 = screenshot_b64
        else:
            logger.error(f"Failed to generate screenshot for {context.file_name}")
            
        return context
