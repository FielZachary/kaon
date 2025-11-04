import { initializeOCRService } from "./azureOCR";
import Constants from "expo-constants";

// Initialize OCR service with environment variables
// Note: You need to add these to your .env file:
// AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
// AZURE_DOCUMENT_INTELLIGENCE_KEY=your_api_key_here

export function initOCR() {
  try {
    // Prefer Expo public env vars in RN
    const endpoint =
      process.env.EXPO_PUBLIC_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT ||
      process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT ||
      (Constants?.expoConfig?.extra as any)?.azureDocumentIntelligenceEndpoint ||
      "";
    const apiKey =
      process.env.EXPO_PUBLIC_AZURE_DOCUMENT_INTELLIGENCE_KEY ||
      process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY ||
      (Constants?.expoConfig?.extra as any)?.azureDocumentIntelligenceKey ||
      "";

    if (!endpoint || !apiKey) {
      console.warn(
        "⚠️ Azure OCR not configured. Set EXPO_PUBLIC_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT and EXPO_PUBLIC_AZURE_DOCUMENT_INTELLIGENCE_KEY (or add to app.json extra)."
      );
      // For development/testing, you can use mock implementation
      return false;
    }

    initializeOCRService({
      endpoint,
      apiKey,
    });

    console.log("✅ Azure OCR initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize OCR service:", error);
    return false;
  }
}

