# OCR Menu Import Feature

## Overview
AI-powered menu extraction feature that allows restaurants to photograph menus and automatically extract items, descriptions, prices, and categories.

## Setup Instructions

### 1. Create Azure Document Intelligence Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new **Document Intelligence** (formerly Form Recognizer) resource
3. Select your subscription and resource group
4. Choose a region (e.g., East US)
5. Select pricing tier (F0 for free tier, or S0 for production)
6. Wait for deployment to complete

### 2. Get API Credentials

1. Navigate to your Document Intelligence resource
2. Go to **Keys and Endpoint** section
3. Copy:
   - **Endpoint URL** (e.g., `https://your-resource.cognitiveservices.azure.com/`)
   - **Key 1** or **Key 2**

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_DOCUMENT_INTELLIGENCE_KEY=your_api_key_here
```

**Important:** Never commit `.env` to version control. Add it to `.gitignore`.

### 4. Test the Feature

1. Navigate to **Restaurant** → **Menu & Pricing**
2. Tap **"Import from Photo"**
3. Take a photo or select an existing menu image
4. Tap **"Analyze Menu"**
5. Review extracted items and prices
6. Edit if needed, then tap **"Save All"**

## How It Works

### 1. Image Capture
- Uses `expo-image-picker` for camera/gallery access
- Optional image enhancement with `expo-image-manipulator`

### 2. OCR Processing
- Sends image to Azure Document Intelligence Layout API
- Receives structured document analysis with:
  - Text blocks, lines, words
  - Bounding boxes and reading order
  - Confidence scores

### 3. Intelligent Parsing
The `menuParser` applies heuristics to extract:

- **Categories:** Detects section headers (bold, caps, no price)
- **Items:** Identifies food names paired with prices
- **Descriptions:** Finds descriptive text under items
- **Prices:** Extracts currency values with regex patterns

Handles:
- Multi-column layouts
- Dotted leaders (e.g., "Chicken......₱150")
- Various currency formats (₱, PHP, Php, P)
- Different menu styles

### 4. Review & Edit
- Displays extracted items grouped by category
- Shows confidence scores (color-coded)
- Allows manual editing of all fields
- Bulk import to menu database

## Architecture

```
services/ocr/
├── types.ts          # TypeScript interfaces
├── azureOCR.ts       # Azure API client wrapper
├── menuParser.ts     # Layout → MenuItem parser logic
├── init.ts           # Service initialization
└── README.md         # This file

app/(restaurant)/menu-pricing/
├── import-menu.tsx   # Image capture screen
└── review-import.tsx # Review/edit extracted items
```

## Cost Estimates

**Azure Document Intelligence Pricing (Layout API):**
- Free tier: 500 pages/month
- Standard tier: ~$1.50 per 1,000 pages

**Typical Usage:**
- 1-3 pages per menu
- 100 restaurants × 3 menus = 300 pages
- **Cost:** ~$0.45/month (after free tier)

## Supported Menu Formats

✅ Single-column lists
✅ Multi-column layouts
✅ Dotted leaders
✅ Various fonts and styles
✅ Slight rotation/skew
✅ Multiple languages (configurable)

⚠️ May struggle with:
- Heavily stylized/decorative fonts
- Very low quality images
- Handwritten menus (less reliable)

## Troubleshooting

### "OCR Service not initialized"
- Check that `.env` file exists and has correct variables
- Restart Metro bundler after adding env vars
- Ensure `expo-constants` is installed for env access

### "Analysis Failed"
- Verify Azure resource is active and in same region
- Check API key is valid (regenerate if needed)
- Ensure image is clear and well-lit
- Try resizing or enhancing image first

### No Items Detected
- Menu may be too stylized or decorative
- Try a clearer photo with better lighting
- Ensure menu has visible prices
- Consider manual entry for complex designs

### Low Confidence Scores
- Improve image quality (lighting, focus, resolution)
- Crop to menu area only
- Avoid glare and shadows
- Use flat, straight-on angle

## Future Enhancements

1. **On-Device Preview:** ML Kit for instant text detection
2. **Multi-Page Support:** Combine results from multiple photos
3. **Smart Categorization:** Train classifier on existing menus
4. **Variant Detection:** Parse "Small/Medium/Large" patterns
5. **Batch History:** Save and review past imports
6. **Offline Queue:** Process when connection restored

## Alternative OCR Providers

If Azure doesn't fit your needs:

- **Google Document AI:** Similar quality, GCP ecosystem
- **AWS Textract:** Good table detection, AWS integration
- **Klippa Menu OCR:** Menu-specialized, faster setup
- **ML Kit (on-device):** Fast preview, no cloud cost

To switch providers, implement a new service in `services/ocr/` following the same interface.

## References

- [Azure Document Intelligence Docs](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [Expo Image Manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)

