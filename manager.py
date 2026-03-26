import os
from dotenv import load_dotenv
from config.settings import SUPPORTED_EXTENSIONS
from models.datatypes import ErrorCode, ProcessResult
from core.input_handler import InputHandler
from core.backup import BackupManager
from core.duplicate_handler import DuplicateHandler
from core.mover import FileMover
from core.logger import setup_logger, ReportGenerator
from parsers.analyzer import FileAnalyzer
from api.client import GeminiClient

def main():
    logger = setup_logger()
    logger.info("Starting Gemini Folder Organizer (Python Architecture)")
    
    load_dotenv()
    
    try:
        input_dir, result_dir = InputHandler.request_directories()
        available_folders = InputHandler.get_available_folders(result_dir)
        
        logger.info(f"Available folders: {available_folders}")
        
        # Create Backup
        BackupManager.create_backup(input_dir)
        
        # Initialize dependencies
        analyzer = FileAnalyzer()
        gemini = GeminiClient()
        mover = FileMover(result_dir)
        
        files_to_process = [os.path.join(input_dir, f) for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        
        results = []
        
        logger.info(f"Found {len(files_to_process)} files to process.")
        
        for file_path in files_to_process:
            file_name = os.path.basename(file_path)
            logger.info(f"Processing: {file_name}")
            
            # Analyze
            context = analyzer.analyze_file(file_path)
            
            if context.file_type.value == "unknown":
                err_result = mover.quarantine_file(file_path, ErrorCode.UNSUPPORTED, f"Unsupported extension: {context.extension}")
                results.append(err_result)
                continue
                
            # Parse Content
            context = analyzer.parse_content(context)
            if not any([context.extracted_text, context.extracted_image_b64, context.extracted_pdf_b64]):
                err_result = mover.quarantine_file(file_path, ErrorCode.EMPTY_CONTENT, "Failed to extract any content")
                results.append(err_result)
                continue
                
            # Classify with Gemini
            try:
                ai_response = gemini.classify_file(context, available_folders)
            except Exception as e:
                err_result = mover.quarantine_file(file_path, ErrorCode.API_ERROR, str(e))
                results.append(err_result)
                continue
                
            # Handle duplicates
            safe_name = DuplicateHandler.get_safe_filename(
                os.path.join(result_dir, ai_response.target_folder),
                ai_response.new_name,
                context.extension
            )
            
            # Move
            success_result = mover.move_to_target(
                original_path=file_path,
                target_folder=ai_response.target_folder,
                safe_name=safe_name,
                extension=context.extension
            )
            results.append(success_result)
            
        # Final Report
        ReportGenerator.generate_final_report(results, result_dir)
        logger.info("Operations completed successfully.")
        
    except Exception as e:
        logger.error(f"Critical error during execution: {e}")

if __name__ == "__main__":
    main()
