import logging
from typing import List
from models.datatypes import ProcessResult
import os
from datetime import datetime

def setup_logger():
    # Basic console logger configuration
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        datefmt='%H:%M:%S'
    )
    return logging.getLogger("GeminiOrganizer")

class ReportGenerator:
    @staticmethod
    def generate_final_report(results: List[ProcessResult], result_dir: str):
        logger = logging.getLogger("GeminiOrganizer")
        
        total = len(results)
        success = [r for r in results if r.success]
        failed = [r for r in results if not r.success]
        
        report_lines = []
        report_lines.append(f"--- FOLDER ORGANIZER FINAL REPORT ---")
        report_lines.append(f"Total files processed: {total}")
        report_lines.append(f"Successfully moved: {len(success)}")
        report_lines.append(f"Quarantined/Failed: {len(failed)}")
        report_lines.append(f"\n--- SUCCESSFUL MOVES ---")
        
        for r in success:
            report_lines.append(f"[OK] {os.path.basename(r.original_path)} -> {r.target_folder}/{r.new_name}")
            
        report_lines.append(f"\n--- FAILURES ---")
        for r in failed:
            report_lines.append(f"[FAIL] {os.path.basename(r.original_path)} -> Error: {r.error_code} ({r.error_reason})")
            
        report_text = "\n".join(report_lines)
        
        # Print to console
        print("\n" + report_text + "\n")
        
        # Save to file in result_dir
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_path = os.path.join(result_dir, f"run_log_{timestamp}.txt")
        try:
            with open(report_path, "w", encoding="utf-8") as f:
                f.write(report_text)
            logger.info(f"Report saved to {report_path}")
        except Exception as e:
            logger.error(f"Could not save report file: {e}")
