import os
import time
import json
import logging
import google.generativeai as genai
from models.datatypes import FileContext, GeminiResponse
from config.settings import PROMPTS

logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self):
        # Support both legacy and standard API key var names
        api_key = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("API Key non trovata nelle variabili d'ambiente.")
        
        genai.configure(api_key=api_key)

    def classify_file(self, context: FileContext, available_folders: list[str]) -> GeminiResponse:
        prompt_config = PROMPTS.get(context.file_type.value, PROMPTS["default"])
        system_instruction = prompt_config["system"]
        
        user_prompt = {
            "istruzione": "Analizza il file e restituisci un JSON valido con i campi descritti. NESSUN MARKDOWN EXTRA.",
            "schema_richiesto": {
                "new_name": "string (nuovo nome file, senza estensione)",
                "target_folder": "string (una cartella esatta tra le disponibili)"
            },
            "nome_file_originale": context.file_name,
            "cartelle_disponibili": available_folders,
        }
        if context.extracted_text:
            user_prompt["testo_estratto"] = context.extracted_text

        parts = [json.dumps(user_prompt, ensure_ascii=False)]
        
        if context.extracted_image_b64:
            parts.append({
                "mime_type": "image/jpeg",
                "data": context.extracted_image_b64
            })
            
        if context.extracted_pdf_b64:
            parts.append({
                "mime_type": "application/pdf",
                "data": context.extracted_pdf_b64
            })

        generation_config = genai.GenerationConfig(
            temperature=0.1,
            response_mime_type="application/json"
        )
        
        model = genai.GenerativeModel(
            'gemini-2.5-flash',
            system_instruction=system_instruction
        )
        
        max_attempts = 4
        delays = [2, 5, 10]
        
        for attempt in range(max_attempts):
            try:
                response = model.generate_content(
                    parts,
                    generation_config=generation_config
                )
                
                response_text = response.text
                if not response_text:
                    raise ValueError("Empty response from AI")
                    
                parsed_data = json.loads(response_text)
                validated_response = GeminiResponse(**parsed_data)
                
                if validated_response.target_folder not in available_folders:
                    if "DaRevisionare" in available_folders:
                        validated_response.target_folder = "DaRevisionare"
                    else:
                        raise ValueError(f"AI returned invalid folder: {validated_response.target_folder}")
                    
                return validated_response
                
            except Exception as e:
                err_str = str(e).lower()
                is_transient = any(x in err_str for x in ["429", "503", "timeout", "fetch", "quota"])
                
                if is_transient and attempt < max_attempts - 1:
                    logger.warning(f"Transient error for {context.file_name}, retrying in {delays[attempt]}s...")
                    time.sleep(delays[attempt])
                else:
                    raise e
