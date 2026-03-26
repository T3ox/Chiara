import fitz # PyMuPDF
import logging
from config.settings import TRUNCATION_LIMITS
from models.datatypes import FileContext
from .base import BaseParser
import os
import base64

logger = logging.getLogger(__name__)

class PdfParser(BaseParser):
    def parse(self, context: FileContext) -> FileContext:
        file_size = os.path.getsize(context.file_path)
        
        try:
            doc = fitz.open(context.file_path)
            num_pages = len(doc)
            
            if num_pages > TRUNCATION_LIMITS["PDF_MAX_PAGES_FULL"] or file_size > TRUNCATION_LIMITS["PDF_MAX_BYTES_FULL"]:
                logger.warning(f"PDF {context.file_name} too large, extracting first page as image.")
                page = doc.load_page(0)
                pix = page.get_pixmap(dpi=150)
                img_data = pix.tobytes("jpeg")
                context.extracted_image_b64 = base64.b64encode(img_data).decode('utf-8')
            else:
                # Full PDF extraction logic for Gemini
                with open(context.file_path, "rb") as f:
                    pdf_data = f.read()
                context.extracted_pdf_b64 = base64.b64encode(pdf_data).decode('utf-8')
                
            doc.close()
        except Exception as e:
            logger.error(f"Error parsing PDF {context.file_name}: {e}")
            
        return context
