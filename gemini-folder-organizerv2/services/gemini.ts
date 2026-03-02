
import { GoogleGenAI, Type } from "@google/genai";
import { PROMPTS } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
  }

  async classifyFile(
    type: keyof typeof PROMPTS,
    content: { text?: string; imageData?: string; pdfData?: string },
    fileName: string,
    availableFolders: string[]
  ): Promise<string> {
    const promptConfig = PROMPTS[type] || PROMPTS.default;
    const systemInstruction = promptConfig.system;

    const userPayload = {
      ...promptConfig.user,
      nome_file_originale: fileName,
      cartelle_disponibili: availableFolders,
      testo_estratto: content.text,
    };

    const parts: any[] = [{ text: JSON.stringify(userPayload) }];

    if (content.imageData) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: content.imageData
        }
      });
    }

    if (content.pdfData) {
      parts.push({
        inlineData: {
          mimeType: 'application/pdf',
          data: content.pdfData
        }
      });
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ parts }],
      config: {
        systemInstruction,
        maxOutputTokens: 100,
        temperature: 0.1,
      },
    });

    const text = response.text?.trim() || '';

    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```(?:json|text)?\n?/g, '').replace(/```/g, '').trim();

    // Find the pattern Name___Folder
    const match = cleanText.match(/([a-zA-Z0-9_\-]+___[a-zA-Z0-9_\-]+)/);
    return match ? match[1] : cleanText;
  }

  async repairOutput(raw: string, folders: string[]): Promise<string> {
    const instruction = {
      regole: [
        "Riformatta il testo ricevuto nel formato: NuovoNomeDelFile___CartellaDiDestinazione",
        "Usa ESATTAMENTE UNA cartella tra quelle disponibili.",
        "Nessun altro testo, una sola riga."
      ],
      cartelle_disponibili: folders,
      testo_ricevuto: raw
    };

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ text: JSON.stringify(instruction) }],
      config: {
        maxOutputTokens: 60,
        temperature: 0,
      },
    });

    return response.text?.trim() || '';
  }
}
