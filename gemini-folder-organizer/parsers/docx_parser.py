import docx
import logging
import os
from config.settings import TRUNCATION_LIMITS
from models.datatypes import FileContext
from .base import BaseParser

logger = logging.getLogger(__name__)

class DocxParser(BaseParser):
    def parse(self, context: FileContext) -> FileContext:
        file_size = os.path.getsize(context.file_path)
        is_large = file_size > TRUNCATION_LIMITS["DOCX_MAX_BYTES_FULL"]
        
        try:
            doc = docx.Document(context.file_path)
            full_text = []
            char_count = 0
            
            limit = TRUNCATION_LIMITS["DOCX_SNIPPET_CHARS"] if is_large else TRUNCATION_LIMITS["MAX_TEXT_CHARS"]
            
            for para in doc.paragraphs:
                text = para.text.strip()
                if text:
                    full_text.append(text)
                    char_count += len(text)
                    if char_count > limit:
                        break
                        
            text_result = "\n".join(full_text)[:limit]
            context.extracted_text = text_result
        except Exception as e:
            logger.error(f"Error parsing DOCX {context.file_name}: {e}")

        return context
