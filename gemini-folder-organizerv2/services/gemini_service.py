import os
import json
import re
import google.generativeai as genai
from typing import List, Dict, Optional
from constants_py import PROMPTS

class GeminiService:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        self.repair_model = genai.GenerativeModel('gemini-2.0-flash') # Using same flash model for repair

    async def classify_file(
        self,
        file_type: str,
        content: Dict[str, str],
        file_name: str,
        available_folders: List[str]
    ) -> str:
        prompt_config = PROMPTS.get(file_type, PROMPTS["default"])
        system_instruction = prompt_config["system"]

        user_payload = {
            "nome_file_originale": file_name,
            "cartelle_disponibili": available_folders,
            "testo_estratto": content.get("text"),
        }
        if "user_rules" in prompt_config:
            user_payload["regole"] = prompt_config["user_rules"]
        if "istruzioni" in prompt_config:
            user_payload["istruzioni"] = prompt_config["istruzioni"]

        parts = [json.dumps(user_payload)]

        if content.get("image_data"):
            parts.append({
                "mime_type": "image/jpeg",
                "data": content["image_data"]
            })

        if content.get("pdf_data"):
            parts.append({
                "mime_type": "application/pdf",
                "data": content["pdf_data"]
            })

        response = self.model.generate_content(
            contents=parts,
            generation_config=genai.types.GenerationConfig(
                candidate_count=1,
                max_output_tokens=100,
                temperature=0.1,
            ),
            tools=[], # Ensure no tools for simple classification
        )

        text = response.text.strip() if response.text else ""
        
        # Clean up markdown code blocks if present
        clean_text = re.sub(r'```(?:json|text)?\n?', '', text)
        clean_text = clean_text.replace('```', '').strip()

        # Find the pattern Name___Folder
        match = re.search(r'([a-zA-Z0-9_\-]+___[a-zA-Z0-9_\-]+)', clean_text)
        return match.group(1) if match else clean_text

    async def repair_output(self, raw: str, folders: List[str]) -> str:
        instruction = {
            "regole": [
                "Riformatta il testo ricevuto nel formato: NuovoNomeDelFile___CartellaDiDestinazione",
                "Usa ESATTAMENTE UNA cartella tra quelle disponibili.",
                "Nessun altro testo, una sola riga."
            ],
            "cartelle_disponibili": folders,
            "testo_ricevuto": raw
        }

        response = self.repair_model.generate_content(
            contents=[json.dumps(instruction)],
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=60,
                temperature=0,
            ),
        )

        return response.text.strip() if response.text else ""
