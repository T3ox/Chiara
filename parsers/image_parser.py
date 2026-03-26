from PIL import Image
import logging
import base64
import io
from config.settings import TRUNCATION_LIMITS
from models.datatypes import FileContext
from .base import BaseParser

logger = logging.getLogger(__name__)

class ImageParser(BaseParser):
    def parse(self, context: FileContext) -> FileContext:
        try:
            with Image.open(context.file_path) as img:
                # Convert to RGB to avoid issues with transparency
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                    
                width, height = img.size
                max_side = TRUNCATION_LIMITS["IMAGE_MAX_SIDE"]
                
                if width > max_side or height > max_side:
                    if width > height:
                        new_width = max_side
                        new_height = int(height * (max_side / width))
                    else:
                        new_height = max_side
                        new_width = int(width * (max_side / height))
                    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                buffer = io.BytesIO()
                img.save(buffer, format="JPEG", quality=85)
                img_data = buffer.getvalue()
                context.extracted_image_b64 = base64.b64encode(img_data).decode('utf-8')
        except Exception as e:
            logger.error(f"Error parsing Image {context.file_name}: {e}")
            
        return context
