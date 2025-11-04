// OCR Service Types

export interface ParsedMenuItem {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  confidence: number; // 0-1
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface OCRResult {
  items: ParsedMenuItem[];
  rawText: string;
  pageCount: number;
}

export interface ReviewedMenuItem {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  confidence: number;
  isEdited: boolean;
}

export interface OCRConfig {
  endpoint: string;
  apiKey: string;
}
