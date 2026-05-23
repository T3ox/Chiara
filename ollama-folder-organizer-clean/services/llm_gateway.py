import asyncio
import logging
import time
from typing import Dict, List, Optional

from services.llm_usage_logger import LLMUsageLogger
from services.ollama_service import LLMResponse, OllamaService

logger = logging.getLogger(__name__)


class LLMGateway:
    def __init__(
        self,
        service: OllamaService,
        usage_logger: LLMUsageLogger,
        retry_delays: Optional[List[int]] = None,
    ):
        self.service = service
        self.usage_logger = usage_logger
        self.retry_delays = retry_delays if retry_delays is not None else [1, 3]

    async def classify_file(
        self,
        file_type: str,
        content: Dict[str, str],
        file_name: str,
        available_folders: List[str],
    ) -> str:
        response = await self._run_with_usage(
            operation="classify_file",
            model=self._model_for_content(content),
            call=lambda: self.service.classify_file_with_usage(
                file_type,
                content,
                file_name,
                available_folders,
            ),
        )
        return response.content

    async def repair_output(self, raw: str, folders: List[str]) -> str:
        response = await self._run_with_usage(
            operation="repair_output",
            model=self.service.model,
            call=lambda: self.service.repair_output_with_usage(raw, folders),
        )
        return response.content

    async def _run_with_usage(self, operation: str, model: str, call) -> LLMResponse:
        errors: List[str] = []
        attempts = 0
        started = time.perf_counter()

        for attempt in range(len(self.retry_delays) + 1):
            attempts = attempt + 1
            try:
                response = await call()
                self._log_usage(
                    operation=operation,
                    model=response.model or model,
                    input_tokens=response.input_tokens,
                    output_tokens=response.output_tokens,
                    started=started,
                    attempts=attempts,
                    errors=errors,
                    success=True,
                )
                return response
            except Exception as exc:
                errors.append(str(exc))
                if attempt >= len(self.retry_delays):
                    self._log_usage(
                        operation=operation,
                        model=model,
                        input_tokens=None,
                        output_tokens=None,
                        started=started,
                        attempts=attempts,
                        errors=errors,
                        success=False,
                    )
                    raise

                delay = self.retry_delays[attempt]
                logger.warning("Errore temporaneo LLM per %s: %s. Retry in %ss...", operation, exc, delay)
                await asyncio.sleep(delay)

        raise RuntimeError("LLM operation failed without returning a response.")

    def _log_usage(
        self,
        *,
        operation: str,
        model: str,
        input_tokens: Optional[int],
        output_tokens: Optional[int],
        started: float,
        attempts: int,
        errors: List[str],
        success: bool,
    ) -> None:
        self.usage_logger.log(
            operation=operation,
            model=model,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            duration_ms=int((time.perf_counter() - started) * 1000),
            attempts=attempts,
            errors=errors,
            success=success,
        )

    def _model_for_content(self, content: Dict[str, str]) -> str:
        return self.service.vision_model if content.get("image_data") else self.service.model
