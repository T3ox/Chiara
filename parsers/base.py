from abc import ABC, abstractmethod
from typing import Optional
from models.datatypes import FileContext
from config.settings import TRUNCATION_LIMITS
import logging

logger = logging.getLogger(__name__)

class BaseParser(ABC):
    @abstractmethod
    def parse(self, context: FileContext) -> FileContext:
        """
        Parses the file and updates the context with extracted text or image data.
        Returns the updated context.
        """
        pass
