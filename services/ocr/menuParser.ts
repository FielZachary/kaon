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

// Removed isDescription - no longer needed with line-by-line parsing

export function parseMenuLayout(ocrResult: any): OCRResult {
  const items: ParsedMenuItem[] = [];
  let currentCategory = "Uncategorized";
  
  try {
    // DEBUG: Log what we received
    console.log("🔍 PARSER: Starting parse...");
    console.log("📊 PARSER: Result keys:", Object.keys(ocrResult || {}).join(", "));
    console.log("📄 PARSER: Pages count:", ocrResult?.pages?.length || 0);
    console.log("📝 PARSER: Paragraphs count:", ocrResult?.paragraphs?.length || 0);
    
    // Extract pages from Azure result
    const pages = ocrResult.pages || [];
    
    // DEBUG: Show first few lines of text if available
    if (pages.length > 0 && pages[0].lines) {
      console.log("📖 PARSER: First 10 lines detected:");
      pages[0].lines.slice(0, 10).forEach((line: any, i: number) => {
        console.log(`  ${i+1}. "${line.content}" (confidence: ${line.confidence || 0})`);
      });
    }
    
    // STRATEGY 1: Line-by-line aggressive parsing (catches most items)
    console.log("🔥 PARSER: Using line-by-line aggressive strategy...");
    
    for (const page of pages) {
      const lines = page.lines || [];
      let pendingItemName: string | null = null;
      let pendingConfidence = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const text = line.content || "";
        const confidence = line.confidence || 0;
        const polygon = line.polygon || [];
        
        if (!text.trim()) continue;
        
        // Check if it's a category header
        if (isCategoryHeader(text, confidence)) {
          currentCategory = text.trim();
          console.log(`📁 PARSER: Found category: "${currentCategory}"`);
          pendingItemName = null;
          continue;
        }
        
        // Try to extract price from this line
        const price = extractPrice(text);
        
        if (price !== null) {
          // Price found on this line
          const itemName = removePrice(text).trim();
          
          // Case 1: Item name and price on SAME line
          if (itemName.length > 2) {
            items.push({
              id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              category: currentCategory,
              name: itemName,
              price,
              confidence,
              boundingBox: polygon.length >= 8
                ? {
                    x: Math.min(polygon[0], polygon[2], polygon[4], polygon[6]),
                    y: Math.min(polygon[1], polygon[3], polygon[5], polygon[7]),
                    width: Math.max(polygon[0], polygon[2], polygon[4], polygon[6]) -
                           Math.min(polygon[0], polygon[2], polygon[4], polygon[6]),
                    height: Math.max(polygon[1], polygon[3], polygon[5], polygon[7]) -
                            Math.min(polygon[1], polygon[3], polygon[5], polygon[7]),
                  }
                : undefined,
            });
            console.log(`✅ PARSER: Item found: "${itemName}" - ₱${price}`);
            pendingItemName = null;
          }
          // Case 2: Price on this line, item name was on PREVIOUS line
          else if (pendingItemName && pendingItemName.length > 2) {
            items.push({
              id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              category: currentCategory,
              name: pendingItemName,
              price,
              confidence: (confidence + pendingConfidence) / 2,
            });
            console.log(`✅ PARSER: Item found (multi-line): "${pendingItemName}" - ₱${price}`);
            pendingItemName = null;
          }
        } else {
          // No price on this line, might be item name for next line
          const cleanText = text.trim();
          
          // Skip if it looks like a header/description
          if (cleanText.length > 2 && cleanText.length < 100 && !cleanText.match(/^[\d\s\-\.]+$/)) {
            pendingItemName = cleanText;
            pendingConfidence = confidence;
          }
        }
      }
    }
    
    // STRATEGY 2: Handle split items (item...dots...price in table format)
    console.log("🔥 PARSER: Checking for dotted-leader items...");
    for (const page of pages) {
      for (const line of page.lines || []) {
        const text = line.content || "";
        
        // Match "Item name...........₱50" patterns
        const dottedMatch = text.match(/^(.+?)\s*\.{3,}\s*(.+)$/);
        if (dottedMatch) {
          const [, itemPart, pricePart] = dottedMatch;
          const price = extractPrice(pricePart);
          
          if (price && itemPart.trim().length > 2) {
            // Check if we already added this (avoid duplicates)
            const exists = items.some(
              (item) => item.name === itemPart.trim() && item.price === price
            );
            
            if (!exists) {
              items.push({
                id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                category: currentCategory,
                name: itemPart.trim(),
                price,
                confidence: line.confidence || 0.8,
              });
              console.log(`✅ PARSER: Dotted item: "${itemPart.trim()}" - ₱${price}`);
            }
          }
        }
      }
    }
    
    // STRATEGY 3: Deduplicate items (same name + price)
    const uniqueItems: ParsedMenuItem[] = [];
    const seen = new Set<string>();
    
    for (const item of items) {
      const key = `${item.name.toLowerCase()}_${item.price}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueItems.push(item);
      }
    }
    
    // DEBUG: Log results
    console.log(`✅ PARSER: Found ${uniqueItems.length} unique menu items (${items.length - uniqueItems.length} duplicates removed)`);
    if (uniqueItems.length > 0) {
      console.log("📋 PARSER: Sample items:", uniqueItems.slice(0, 5).map(item => `${item.name} - ₱${item.price}`));
    } else {
      console.log("❌ PARSER: NO ITEMS FOUND! Check if image has prices like ₱50, PHP 50, etc.");
    }
    
    // Extract all text for rawText
    const allText = pages
      .flatMap((page: any) => page.lines || [])
      .map((line: any) => line.content)
      .join("\n");
    
    return {
      items: uniqueItems,
      rawText: allText,
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
