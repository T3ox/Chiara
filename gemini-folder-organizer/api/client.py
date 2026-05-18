import os
import time
import json
import logging
import requests
from models.datatypes import FileContext, GeminiResponse
from config.settings import PROMPTS

logger = logging.getLogger(__name__)

class OllamaClient:
    def __init__(self):
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
        self.model = os.getenv("OLLAMA_MODEL", "llama3")

    def classify_file(self, context: FileContext, available_folders: list[str]) -> tuple[GeminiResponse, int, int]:
        prompt_config = PROMPTS.get(context.file_type.value, PROMPTS["default"])
        system_instruction = prompt_config["system"]
        
        # Adding context about the original format as requested by the user
        visual_context = f"L'immagine rappresenta uno screenshot di un file {context.extension}."
        
        user_prompt = {
            "istruzione": "Analizza il file e restituisci SOLO un JSON valido con i campi descritti. NESSUN MARKDOWN EXTRA o spiegazione. Le chiavi devono corrispondere esattamente allo schema.",
            "contesto_visuale": visual_context,
            "schema_richiesto": {
                "new_name": "string (nuovo nome file, senza estensione)",
                "target_folder": "string (una cartella esatta tra le disponibili)"
            },
            "nome_file_originale": context.file_name,
            "cartelle_disponibili": available_folders,
        }

        prompt_str = json.dumps(user_prompt, ensure_ascii=False)
        
        # Build the payload for Ollama
        payload = {
            "model": self.model,
            "system": system_instruction,
            "prompt": prompt_str,
            "format": "json",
            "stream": False,
            "options": {
                "temperature": 0.1
            }
        }
        
        if context.preview_image_b64:
            payload["images"] = [context.preview_image_b64]
            
        endpoint = f"{self.base_url}/api/generate"
        
        max_attempts = 4
        delays = [2, 5, 10]
        
        for attempt in range(max_attempts):
            try:
                response = requests.post(endpoint, json=payload, timeout=90)
                response.raise_for_status()
                
                response_json = response.json()
                response_text = response_json.get("response", "")
                
                # Extract token usage
                prompt_tokens = response_json.get("prompt_eval_count", 0)
                completion_tokens = response_json.get("eval_count", 0)
                
                if not response_text:
                    raise ValueError("Empty response from AI")
                    
                parsed_data = json.loads(response_text)
                validated_response = GeminiResponse(**parsed_data)
                
                if validated_response.target_folder not in available_folders:
                    if "DaRevisionare" in available_folders:
                        validated_response.target_folder = "DaRevisionare"
                    else:
                        # Fallback to the first available folder if DaRevisionare is missing
                        validated_response.target_folder = available_folders[0]
                    
                return validated_response, prompt_tokens, completion_tokens
                
            except Exception as e:
                err_str = str(e).lower()
                is_transient = any(x in err_str for x in ["timeout", "connection refused", "503", "too many requests"])
                
                if is_transient and attempt < max_attempts - 1:
                    logger.warning(f"Transient error for {context.file_name}, retrying in {delays[attempt]}s... Error: {e}")
                    time.sleep(delays[attempt])
                else:
                    raise e
