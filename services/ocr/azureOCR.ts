import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { OCRConfig } from "./types";

export class AzureOCRService {
  private client: DocumentAnalysisClient;

  constructor(config: OCRConfig) {
    this.client = new DocumentAnalysisClient(
      config.endpoint,
      new AzureKeyCredential(config.apiKey)
    );
  }

  async analyzeMenu(imageUri: string): Promise<any> {
    try {
      // For React Native, we need to read the file as base64 and convert to buffer
      // Fetch doesn't give us arrayBuffer in RN
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      // Convert blob to base64, then to buffer (RN compatible)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1];
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      
      // Convert base64 to Uint8Array
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Use the prebuilt-layout model for general document analysis
      const poller = await this.client.beginAnalyzeDocument("prebuilt-layout", bytes);
      const result = await poller.pollUntilDone();

      return result;
    } catch (error) {
      console.error("Azure OCR Error:", error);
      throw new Error("Failed to analyze menu image");
    }
  }
}

// Singleton instance (will be initialized with env vars)
let ocrServiceInstance: AzureOCRService | null = null;

export function initializeOCRService(config: OCRConfig): void {
  ocrServiceInstance = new AzureOCRService(config);
}

export function getOCRService(): AzureOCRService {
  if (!ocrServiceInstance) {
    throw new Error("OCR Service not initialized. Call initializeOCRService first.");
  }
  return ocrServiceInstance;
}
