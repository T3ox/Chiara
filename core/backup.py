import os
import shutil
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class BackupManager:
    @staticmethod
    def create_backup(input_dir: str) -> str:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        parent_dir = os.path.dirname(os.path.abspath(input_dir))
        base_name = os.path.basename(os.path.abspath(input_dir))
        
        backup_name = f"{base_name}_backup_{timestamp}"
        backup_path_without_ext = os.path.join(parent_dir, backup_name)
        
        logger.info(f"Creating backup zip of '{input_dir}' at '{backup_path_without_ext}.zip'")
        zip_path = shutil.make_archive(backup_path_without_ext, 'zip', input_dir)
        logger.info(f"Backup created successfully: {zip_path}")
        
        return zip_path
