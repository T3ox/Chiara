from constants_py import TRUNCATION_LIMITS
from services.extractor_service import FileExtractor
from services.organizer_types import ExtractedContent, ScannedFile


def extract_content(scanned_file: ScannedFile) -> ExtractedContent:
    file_type = scanned_file.file_type
    if not file_type:
        return ExtractedContent()

    metadata = {"source": scanned_file.relative_path, "size": scanned_file.size}

    if file_type == "pdf":
        text = FileExtractor.extract_text_from_pdf(scanned_file.path)
        image_data = ""
        if not text and scanned_file.size <= TRUNCATION_LIMITS["PDF_MAX_BYTES_FULL"]:
            image_data = FileExtractor.get_pdf_thumbnail(scanned_file.path)
        return ExtractedContent(text=text, image_data=image_data, metadata=metadata)

    if file_type == "docx":
        is_large = scanned_file.size > TRUNCATION_LIMITS["DOCX_MAX_BYTES_FULL"]
        return ExtractedContent(
            text=FileExtractor.extract_text_from_docx(scanned_file.path, snippet=is_large),
            metadata=metadata,
        )

    if file_type == "excel":
        return ExtractedContent(
            text=FileExtractor.extract_text_from_xlsx(scanned_file.path),
            metadata=metadata,
        )

    if file_type == "presentation":
        return ExtractedContent(
            text=FileExtractor.extract_text_from_pptx(scanned_file.path),
            metadata=metadata,
        )

    if file_type == "images":
        return ExtractedContent(
            image_data=FileExtractor.resize_image(scanned_file.path),
            metadata=metadata,
        )

    if file_type == "text":
        return ExtractedContent(
            text=FileExtractor.extract_text_from_plain_file(scanned_file.path),
            metadata=metadata,
        )

    return ExtractedContent(metadata=metadata)
