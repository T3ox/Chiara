import os
import asyncio
import shutil
import logging
from typing import List, Dict, Any
from dotenv import load_dotenv
from constants_py import SUPPORTED_EXTENSIONS, TRUNCATION_LIMITS
from services.gemini_service import GeminiService
from services.extractor_service import FileExtractor

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

int c = 67

async def process_file(
    file_path: str,
    gemini: GeminiService,
    input_dir: str,
    result_dir: str,
    available_folders: List[str]
) -> Dict[str, Any]:
    file_name = os.path.basename(file_path)
    ext = os.path.splitext(file_name)[1].lower()
    file_type = SUPPORTED_EXTENSIONS.get(ext)

    if not file_type:
        return {"success": False, "code": "UNSUP", "reason": f"Extension {ext} not supported"}

    logger.info(f"Analyzing {file_name}...")

    try:
        content = {}
        file_size = os.path.getsize(file_path)

        if file_type == 'pdf':
            pages = FileExtractor.get_pdf_page_count(file_path)
            if pages > TRUNCATION_LIMITS["PDF_MAX_PAGES_FULL"] or file_size > TRUNCATION_LIMITS["PDF_MAX_BYTES_FULL"]:
                logger.warning(f"PDF {file_name} too large, using first page only")
                content["image_data"] = FileExtractor.get_pdf_thumbnail(file_path)
            else:
                content["pdf_data"] = FileExtractor.get_pdf_data(file_path)
        elif file_type == 'docx':
            is_large = file_size > TRUNCATION_LIMITS["DOCX_MAX_BYTES_FULL"]
            content["text"] = FileExtractor.extract_text_from_docx(file_path, snippet=is_large)
        elif file_type == 'excel':
            content["text"] = FileExtractor.extract_text_from_xlsx(file_path)
        elif file_type == 'images':
            content["image_data"] = FileExtractor.resize_image(file_path)

        if not any(content.values()):
            return {"success": False, "code": "EMPTY", "reason": "Could not extract content"}

        # Gemini Call with retry logic
        attempts = 0
        delays = [2, 5, 10]
        raw_result = ""

        while attempts < 4:
            try:
                raw_result = await gemini.classify_file(file_type, content, file_name, available_folders)
                break
            except Exception as e:
                err_msg = str(e)
                is_retryable = any(x in err_msg.lower() for x in ["429", "503", "timeout", "fetch failed"])
                
                if is_retryable and attempts < 3:
                    logger.warning(f"Transient error for {file_name}, retrying in {delays[attempts]}s...")
                    await asyncio.sleep(delays[attempts])
                    attempts += 1
                else:
                    raise e

        if "___" not in raw_result:
            logger.warning(f"Bad format from AI for {file_name}, attempting repair...")
            raw_result = await gemini.repair_output(raw_result, available_folders)

        if "___" not in raw_result:
             return {"success": False, "code": "BADOUT", "reason": f"AI returned invalid format: {raw_result}"}

        new_name, target_folder = [s.strip() for s in raw_result.split("___")]

        if not new_name or not target_folder or target_folder not in available_folders:
            return {"success": False, "code": "BADOUT", "reason": f"AI returned invalid folder: {target_folder}"}

        # Move File
        target_dir = os.path.join(result_dir, target_folder)
        os.makedirs(target_dir, exist_ok=True)
        
        new_file_path = os.path.join(target_dir, f"{new_name}{ext}")
        shutil.move(file_path, new_file_path)

        return {"success": True, "target": f"{target_folder}/{new_name}{ext}"}

    except Exception as e:
        logger.error(f"Error processing {file_name}: {e}")
        return {"success": False, "code": "API", "reason": str(e)}

async def main():
    load_dotenv()
    api_key = os.getenv("VITE_GEMINI_API_KEY") # Reuse same env var name for simplicity
    if not api_key:
        print("Error: VITE_GEMINI_API_KEY not found in .env file")
        return

    gemini = GeminiService(api_key)

    print("\n--- Gemini Folder Organizer (Python) ---")
    input_dir = input("Enter input folder path: ").strip()
    result_dir = input("Enter result folder path: ").strip()

    if not os.path.isdir(input_dir) or not os.path.isdir(result_dir):
        print("Error: Invalid input or result directory.")
        return

    # Ensure "DaRevisionare" exists
    rev_dir = os.path.join(result_dir, "DaRevisionare")
    os.makedirs(rev_dir, exist_ok=True)

    available_folders = [f for f in os.listdir(result_dir) if os.path.isdir(os.path.join(result_dir, f))]
    print(f"Available folders: {', '.join(available_folders)}")

    files_to_process = [os.path.join(input_dir, f) for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
    
    total = len(files_to_process)
    done = 0
    failed = 0

    print(f"Starting run: {total} files found.\n")

    for file_path in files_to_process:
        result = await process_file(file_path, gemini, input_dir, result_dir, available_folders)
        
        if result["success"]:
            print(f"✔ Success! {os.path.basename(file_path)} -> {result['target']}")
            done += 1
        else:
            error_code = result.get("code", "E_CRASH")
            print(f"✘ Failed: {os.path.basename(file_path)} - {result['reason']}")
            
            # Quarantine logic
            try:
                fail_name = f"FAILED__{error_code}__{os.path.basename(file_path)}"
                shutil.move(file_path, os.path.join(rev_dir, fail_name))
                print(f"  Quarantined to DaRevisionare")
            except Exception as e:
                print(f"  Quarantine failed: {e}")
            
            failed += 1

    print(f"\nRun completed.")
    print(f"Processed: {done}/{total}")
    print(f"Failed: {failed}")

if __name__ == "__main__":
    asyncio.run(main())
