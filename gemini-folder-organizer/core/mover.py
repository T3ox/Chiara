import os
import shutil
import logging
from models.datatypes import ProcessResult, ErrorCode

logger = logging.getLogger(__name__)

class FileMover:
    def __init__(self, result_dir: str):
        self.result_dir = result_dir
        self.rev_dir = os.path.join(result_dir, "DaRevisionare")
        os.makedirs(self.rev_dir, exist_ok=True)

    def move_to_target(self, original_path: str, target_folder: str, safe_name: str, extension: str) -> ProcessResult:
        try:
            target_dir = os.path.join(self.result_dir, target_folder)
            os.makedirs(target_dir, exist_ok=True)
            
            new_file_path = os.path.join(target_dir, f"{safe_name}{extension}")
            shutil.move(original_path, new_file_path)
            
            return ProcessResult(
                success=True,
                original_path=original_path,
                target_path=new_file_path,
                new_name=safe_name,
                target_folder=target_folder
            )
        except Exception as e:
            logger.error(f"Failed to move file {original_path} to target: {e}")
            return ProcessResult(
                success=False,
                original_path=original_path,
                error_code=ErrorCode.SYSTEM_ERROR,
                error_reason=f"Move target failed: {str(e)}"
            )

    def quarantine_file(self, original_path: str, error_code: ErrorCode, reason: str = "") -> ProcessResult:
        try:
            base_name = os.path.basename(original_path)
            fail_name = f"FAILED__{error_code.value}__{base_name}"
            new_file_path = os.path.join(self.rev_dir, fail_name)
            
            shutil.move(original_path, new_file_path)
            
            return ProcessResult(
                success=False,
                original_path=original_path,
                target_path=new_file_path,
                error_code=ErrorCode.QUARANTINED,
                error_reason=f"Quarantined: {error_code.value} - {reason}"
            )
        except Exception as e:
            logger.error(f"Failed to quarantine file {original_path}: {e}")
            return ProcessResult(
                success=False,
                original_path=original_path,
                error_code=ErrorCode.SYSTEM_ERROR,
                error_reason=f"Quarantine failed: {str(e)}"
            )
