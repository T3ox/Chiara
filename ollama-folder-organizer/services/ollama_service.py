import asyncio
import json
import re
import socket
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Dict, List, Optional

from constants_py import PROMPTS


@dataclass(frozen=True)
class LLMResponse:
    content: str
    model: str
    input_tokens: Optional[int]
    output_tokens: Optional[int]
    duration_ms: int


class OllamaService:
    def __init__(
        self,
        model: str = "llama3.2",
        vision_model: str = "qwen3-vl:8b",
        base_url: str = "http://localhost:11434",
        timeout: int = 120,
    ):
        self.model = model
        self.vision_model = vision_model
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    async def check_connection(self) -> List[str]:
        return await asyncio.to_thread(self._list_models_sync)

    async def classify_file(
        self,
        file_type: str,
        content: Dict[str, str],
        file_name: str,
        available_folders: List[str],
    ) -> str:
        response = await self.classify_file_with_usage(file_type, content, file_name, available_folders)
        return response.content

    async def classify_file_with_usage(
        self,
        file_type: str,
        content: Dict[str, str],
        file_name: str,
        available_folders: List[str],
    ) -> LLMResponse:
        prompt_config = PROMPTS.get(file_type, PROMPTS["default"])
        payload = {
            "nome_file_originale": file_name,
            "cartelle_disponibili": available_folders,
            "testo_estratto": content.get("text") or "",
        }

        if "user_rules" in prompt_config:
            payload["regole"] = prompt_config["user_rules"]
        if "istruzioni" in prompt_config:
            payload["istruzioni"] = prompt_config["istruzioni"]

        user_content = (
            "Classifica e rinomina il file seguendo esattamente queste istruzioni. "
            "Rispondi solo con JSON valido su una singola riga e nessun markdown: "
            '{"new_name":"NomeFileSenzaEstensione","target_folder":"Cartella"}\n'
            f"{json.dumps(payload, ensure_ascii=False, separators=(',', ':'))}"
        )
        images = [content["image_data"]] if content.get("image_data") else None

        response = await self._chat_with_usage(prompt_config["system"], user_content, images=images)
        return LLMResponse(
            content=self._clean_output(response.content),
            model=response.model,
            input_tokens=response.input_tokens,
            output_tokens=response.output_tokens,
            duration_ms=response.duration_ms,
        )

    async def repair_output(self, raw: str, folders: List[str]) -> str:
        response = await self.repair_output_with_usage(raw, folders)
        return response.content

    async def repair_output_with_usage(self, raw: str, folders: List[str]) -> LLMResponse:
        instruction = {
            "regole": [
                "Riformatta il testo ricevuto come JSON valido su una singola riga.",
                'Formato esatto: {"new_name":"NomeFileSenzaEstensione","target_folder":"CartellaEsistente"}',
                "Usa ESATTAMENTE UNA cartella tra quelle disponibili.",
                "Non inventare cartelle.",
                "Nessun markdown, nessuna spiegazione, nessun testo extra.",
            ],
            "cartelle_disponibili": folders,
            "testo_ricevuto": raw,
        }
        response = await self._chat_with_usage(
            "Correggi output di classificazione file. Rispondi solo con JSON valido.",
            json.dumps(instruction, ensure_ascii=False),
        )
        return LLMResponse(
            content=self._clean_output(response.content),
            model=response.model,
            input_tokens=response.input_tokens,
            output_tokens=response.output_tokens,
            duration_ms=response.duration_ms,
        )

    async def _chat(self, system: str, user: str, images: Optional[List[str]] = None) -> str:
        response = await self._chat_with_usage(system, user, images=images)
        return response.content

    async def _chat_with_usage(
        self,
        system: str,
        user: str,
        images: Optional[List[str]] = None,
    ) -> LLMResponse:
        model = self.vision_model if images else self.model
        return await asyncio.to_thread(self._chat_sync, model, system, user, images)

    def _chat_sync(
        self,
        model: str,
        system: str,
        user: str,
        images: Optional[List[str]],
    ) -> LLMResponse:
        message = {"role": "user", "content": user}
        if images:
            message["images"] = images

        request_payload = {
            "model": model,
            "stream": False,
            "messages": [
                {"role": "system", "content": system},
                message,
            ],
            "options": {
                "temperature": 0.1,
                "num_ctx": 2048,
                "num_predict": 80,
                "stop": ["\n"],
            },
        }

        request = urllib.request.Request(
            f"{self.base_url}/api/chat",
            data=json.dumps(request_payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        started = time.perf_counter()
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                body = json.loads(response.read().decode("utf-8"))
        except (socket.timeout, TimeoutError) as exc:
            raise RuntimeError(f"Ollama ha superato il timeout di {self.timeout}s.") from exc
        except urllib.error.URLError as exc:
            raise RuntimeError(
                f"Impossibile raggiungere Ollama su {self.base_url}. "
                "Verifica che 'ollama serve' sia attivo e che il modello sia scaricato."
            ) from exc

        if "error" in body:
            raise RuntimeError(body["error"])

        duration_ms = int((time.perf_counter() - started) * 1000)
        return LLMResponse(
            content=body.get("message", {}).get("content", "").strip(),
            model=body.get("model") or model,
            input_tokens=body.get("prompt_eval_count"),
            output_tokens=body.get("eval_count"),
            duration_ms=duration_ms,
        )

    def _list_models_sync(self) -> List[str]:
        request = urllib.request.Request(f"{self.base_url}/api/tags", method="GET")

        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                body = json.loads(response.read().decode("utf-8"))
        except urllib.error.URLError as exc:
            raise RuntimeError(
                f"Ollama non risponde su {self.base_url}. Installa Ollama, avvialo, "
                "poi scarica i modelli con 'ollama pull llama3.2' e "
                "'ollama pull qwen3-vl:8b'."
            ) from exc

        return [model.get("name", "") for model in body.get("models", []) if model.get("name")]

    @staticmethod
    def _clean_output(text: str) -> str:
        clean_text = re.sub(r"```(?:json|text)?\n?", "", text or "")
        clean_text = clean_text.replace("```", "").strip()

        try:
            parsed = json.loads(clean_text)
            new_name = parsed.get("new_name") or parsed.get("name") or parsed.get("filename")
            target_folder = parsed.get("target_folder") or parsed.get("folder") or parsed.get("category")
            if new_name and target_folder:
                return f"{new_name}___{target_folder}"
        except json.JSONDecodeError:
            pass

        match = re.search(r"([a-zA-Z0-9 _-]+___[a-zA-Z0-9 _-]+)", clean_text)
        return match.group(1) if match else clean_text
