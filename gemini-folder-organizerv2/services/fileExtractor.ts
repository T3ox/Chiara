
import { TRUNCATION_LIMITS } from '../constants';

// Declare globals for libraries loaded via CDN
declare const mammoth: any;
declare const XLSX: any;
declare const pdfjsLib: any;

export class FileExtractor {
  static async extractTextFromDocx(file: File, snippet: boolean = false): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    let text = result.value;
    if (snippet) {
      return text.substring(0, TRUNCATION_LIMITS.DOCX_SNIPPET_CHARS);
    }
    return text.substring(0, TRUNCATION_LIMITS.MAX_TEXT_CHARS);
  }

  static async extractTextFromXlsx(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    let output = `Workbook: ${file.name}\n`;
    
    const sheets = workbook.SheetNames.slice(0, TRUNCATION_LIMITS.XLSX_MAX_SHEETS);
    sheets.forEach((sheetName: string) => {
      output += `\n[SHEET] ${sheetName}\n`;
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const rows = json.slice(0, TRUNCATION_LIMITS.XLSX_MAX_ROWS_PER_SHEET);
      
      rows.forEach((row: any[]) => {
        if (row && row.length > 0) {
          output += row.join(' | ') + '\n';
        }
      });
    });

    return output.substring(0, TRUNCATION_LIMITS.MAX_TEXT_CHARS);
  }

  static async getPdfPageCount(file: File): Promise<number> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    return pdf.numPages;
  }

  static async getPdfThumbnail(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context!, viewport }).promise;
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  }

  static async resizeImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const maxSide = TRUNCATION_LIMITS.IMAGE_MAX_SIDE;
        if (width > height) {
          if (width > maxSide) {
            height *= maxSide / width;
            width = maxSide;
          }
        } else {
          if (height > maxSide) {
            width *= maxSide / height;
            height = maxSide;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl.split(',')[1]);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
}
