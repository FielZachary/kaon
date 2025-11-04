import { ParsedMenuItem, OCRResult } from "./types";

interface OCRLine {
  content: string;
  boundingBox: number[];
  confidence: number;
}

interface OCRBlock {
  lines: OCRLine[];
}

// Category keywords to detect section headers
const CATEGORY_KEYWORDS = [
  "dessert", "desserts", "sweet", "sweets",
  "savory", "savoury", "mains", "entree", "entrees",
  "beverage", "beverages", "drinks", "drink",
  "filipino", "pinoy", "local",
  "cafe", "coffee", "tea",
  "appetizer", "appetizers", "starters",
  "pasta", "noodles",
  "rice", "meals",
  "soup", "soups",
  "salad", "salads",
  "pizza", "pizzas",
  "burger", "burgers",
  "sandwich", "sandwiches",
  "breakfast",
  "lunch",
  "dinner",
];

// Price regex patterns (more lenient)
const PRICE_PATTERNS = [
  /₱\s*(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)/,  // ₱50, ₱1,500, ₱150.50
  /PHP\s*(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)/i,  // PHP 50
  /Php\s*(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)/,   // Php 50
  /P\s*(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)/,    // P 50 or P50
  /(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)\s*php/i,  // 50 php
  /(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)\s*₱/,    // 50₱
  /(\d{2,4})\s*(?:pesos?|peso)/i,                   // 50 pesos
  /\$\s*(\d{1,4}(?:,?\d{1,3})*(?:\.\d{1,2})?)/,    // $50 (fallback)
  /(\d{2,4})(?=\s*$)/,                              // Just numbers at end of line (50)
];

function extractPrice(text: string): number | null {
  for (const pattern of PRICE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const priceStr = match[1] || match[0];
      const cleaned = priceStr.replace(/[₱PHP,\s]/gi, "");
      const price = parseFloat(cleaned);
      if (!isNaN(price) && price > 0 && price < 100000) {
        return price;
      }
    }
  }
  return null;
}

function removePrice(text: string): string {
  let cleaned = text;
  for (const pattern of PRICE_PATTERNS) {
    cleaned = cleaned.replace(pattern, "");
  }
  // Remove dotted leaders
  cleaned = cleaned.replace(/\.{2,}/g, "");
  return cleaned.trim();
}

function isCategoryHeader(text: string, confidence: number): boolean {
  const normalizedText = text.toLowerCase().trim();
  
  // Check if matches known category keywords
  const hasKeyword = CATEGORY_KEYWORDS.some((keyword) =>
    normalizedText.includes(keyword)
  );
  
  // Check if all caps or title case (common for headers)
  const isAllCaps = text === text.toUpperCase() && text.length > 2;
  
  // Check if no price in the line
  const hasNoPrice = extractPrice(text) === null;
  
  // Short and bold-like (high confidence, short text)
  const isShort = text.split(" ").length <= 4;
  
  return (hasKeyword || isAllCaps) && hasNoPrice && isShort && confidence > 0.7;
}

function isDescription(text: string, previousWasItem: boolean): boolean {
  // Descriptions are usually lowercase, longer, and follow an item
  const isLowerCase = text[0] === text[0].toLowerCase();
  const isLonger = text.split(" ").length > 5;
  const hasNoPrice = extractPrice(text) === null;
  
  return previousWasItem && isLowerCase && isLonger && hasNoPrice;
}

export function parseMenuLayout(ocrResult: any): OCRResult {
  const items: ParsedMenuItem[] = [];
  let currentCategory = "Uncategorized";
  let lastItemId: string | null = null;
  let previousWasItem = false;
  
  try {
    // DEBUG: Log what we received
    console.log("🔍 PARSER: Starting parse...");
    console.log("📊 PARSER: Result keys:", Object.keys(ocrResult || {}).join(", "));
    console.log("📄 PARSER: Pages count:", ocrResult?.pages?.length || 0);
    console.log("📝 PARSER: Paragraphs count:", ocrResult?.paragraphs?.length || 0);
    
    // Extract pages and paragraphs from Azure result
    const pages = ocrResult.pages || [];
    const paragraphs = ocrResult.paragraphs || [];
    
    // DEBUG: Show first few lines of text if available
    if (pages.length > 0 && pages[0].lines) {
      console.log("📖 PARSER: First 5 lines detected:");
      pages[0].lines.slice(0, 5).forEach((line: any, i: number) => {
        console.log(`  ${i+1}. "${line.content}" (confidence: ${line.confidence || 0})`);
      });
    }
    
    // Process each paragraph (Azure groups related lines)
    for (const para of paragraphs) {
      const text = para.content || "";
      const confidence = para.confidence || 0;
      const boundingRegion = para.boundingRegions?.[0];
      
      if (!text.trim()) continue;
      
      // Check if it's a category header
      if (isCategoryHeader(text, confidence)) {
        currentCategory = text.trim();
        previousWasItem = false;
        continue;
      }
      
      // Check if it's a description for the previous item
      if (isDescription(text, previousWasItem) && lastItemId) {
        const itemIndex = items.findIndex((item) => item.id === lastItemId);
        if (itemIndex !== -1) {
          items[itemIndex].description = text.trim();
        }
        previousWasItem = false;
        continue;
      }
      
      // Try to extract price
      const price = extractPrice(text);
      
      if (price !== null) {
        // This line has a price, treat as menu item
        const itemName = removePrice(text);
        
        if (itemName.length > 2) {
          const itemId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          items.push({
            id: itemId,
            category: currentCategory,
            name: itemName,
            price,
            confidence,
            boundingBox: boundingRegion?.polygon
              ? {
                  x: Math.min(...boundingRegion.polygon.filter((_, i) => i % 2 === 0)),
                  y: Math.min(...boundingRegion.polygon.filter((_, i) => i % 2 === 1)),
                  width:
                    Math.max(...boundingRegion.polygon.filter((_, i) => i % 2 === 0)) -
                    Math.min(...boundingRegion.polygon.filter((_, i) => i % 2 === 0)),
                  height:
                    Math.max(...boundingRegion.polygon.filter((_, i) => i % 2 === 1)) -
                    Math.min(...boundingRegion.polygon.filter((_, i) => i % 2 === 1)),
                }
              : undefined,
          });
          
          lastItemId = itemId;
          previousWasItem = true;
        }
      }
    }
    
    // Fallback: if no items found, try processing all lines
    if (items.length === 0) {
      for (const page of pages) {
        for (const line of page.lines || []) {
          const text = line.content || "";
          const price = extractPrice(text);
          
          if (price !== null) {
            const itemName = removePrice(text);
            if (itemName.length > 2) {
              items.push({
                id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                category: "Uncategorized",
                name: itemName,
                price,
                confidence: line.confidence || 0.5,
              });
            }
          }
        }
      }
    }
    
    // DEBUG: Log results
    console.log(`✅ PARSER: Found ${items.length} menu items`);
    if (items.length > 0) {
      console.log("📋 PARSER: Sample items:", items.slice(0, 3).map(item => `${item.name} - ₱${item.price}`));
    } else {
      console.log("❌ PARSER: NO ITEMS FOUND! Check if image has prices like ₱50, PHP 50, etc.");
    }
    
    return {
      items,
      rawText: paragraphs.map((p: any) => p.content).join("\n"),
      pageCount: pages.length,
    };
  } catch (error) {
    console.error("❌ PARSER ERROR:", error);
    return {
      items: [],
      rawText: "",
      pageCount: 0,
    };
  }
}
