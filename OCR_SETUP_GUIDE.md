# OCR Menu Import - Quick Setup Guide

## 🚀 What Was Built

AI-powered menu extraction feature that lets restaurants photograph menus and automatically extract:
- Menu items and names
- Prices (₱, PHP, P formats)
- Categories (Desserts, Beverages, etc.)
- Descriptions

## ✅ Implementation Complete

### Files Created
```
services/ocr/
├── types.ts              # TypeScript interfaces
├── azureOCR.ts          # Azure API wrapper
├── menuParser.ts        # Smart parsing logic
├── init.ts              # Service initialization
└── README.md            # Full documentation

app/(restaurant)/menu-pricing/
├── import-menu.tsx      # Camera/gallery picker
└── review-import.tsx    # Edit extracted items
```

### Files Modified
- `contexts/MenuItemsContext.tsx` - Added `bulkAddMenuItems()`
- `app/(restaurant)/menu-pricing/index.tsx` - Added "Import from Photo" button
- `app/_layout.tsx` - Initialize OCR on app start

### Dependencies Installed
- `@azure/ai-form-recognizer` - Azure Document Intelligence SDK
- `expo-image-manipulator` - Image preprocessing

## 🔧 Setup Required (5 minutes)

### Step 1: Create Azure Resource

1. Go to https://portal.azure.com
2. Click **Create a resource** → search **"Document Intelligence"**
3. Fill in:
   - **Subscription:** Your Azure subscription
   - **Resource Group:** Create new or use existing
   - **Region:** Choose closest (e.g., East US)
   - **Name:** `kaon-ocr` (or any name)
   - **Pricing tier:** **F0 (Free)** - 500 pages/month
4. Click **Review + Create** → **Create**
5. Wait ~2 minutes for deployment

### Step 2: Get API Credentials

1. Go to your new resource
2. Click **Keys and Endpoint** (left sidebar)
3. Copy:
   - **Endpoint:** `https://kaon-ocr.cognitiveservices.azure.com/`
   - **KEY 1:** `abc123...` (long alphanumeric string)

### Step 3: Add to Environment

Create `.env` file in project root:

```env
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://kaon-ocr.cognitiveservices.azure.com/
AZURE_DOCUMENT_INTELLIGENCE_KEY=paste_your_key_here
```

**Important:**
- Replace with YOUR actual endpoint and key
- DO NOT commit `.env` to Git (it's gitignored)
- Restart Metro bundler after adding env vars:
  ```bash
  # Stop current bundler (Ctrl+C)
  npx expo start --clear
  ```

### Step 4: Test It!

1. Open app → **Restaurant** side
2. Go to **Menu & Pricing**
3. Tap **"Import from Photo"** button (orange card)
4. Take photo of a menu OR select from gallery
5. Tap **"Analyze Menu"**
6. Wait ~5 seconds for processing
7. Review extracted items:
   - Check names, prices, categories
   - Edit any mistakes
   - Adjust confidence if needed
8. Tap **"Save X Items to Menu"**

## 📝 Usage Tips

### Best Results
✅ Use good lighting (natural light best)
✅ Keep menu flat and straight
✅ Avoid glare and shadows
✅ Capture full sections at once
✅ Clear, readable fonts work best

### If No Items Detected
- Try better photo (lighting, angle, focus)
- Ensure prices are visible (₱ symbol helps)
- Check Azure dashboard for errors
- Review console logs for debug info

## 🏗️ How It Works

```
1. Photo Capture
   ↓ (expo-image-picker)
2. Image Enhancement
   ↓ (resize, compress)
3. Azure OCR API
   ↓ (Document Intelligence Layout)
4. Smart Parsing
   ├─ Detect section headers → Categories
   ├─ Match item names with prices
   ├─ Extract descriptions
   └─ Calculate confidence scores
5. Review & Edit UI
   ↓ (user validates/corrects)
6. Bulk Import to Menu
```

## 🔍 Troubleshooting

### "OCR Service not initialized"
- ❌ `.env` file missing or incorrect
- ✅ Create `.env` with correct keys
- ✅ Restart Metro: `npx expo start --clear`

### "Analysis Failed"
- ❌ Azure key expired or invalid
- ❌ Resource in wrong region/deleted
- ✅ Regenerate key in Azure portal
- ✅ Check resource is active

### Low Confidence / Wrong Prices
- ❌ Poor image quality
- ✅ Retake photo with better lighting
- ✅ Edit manually in review screen
- ✅ Confidence < 50% → double-check

## 💰 Costs

**Azure Free Tier:**
- 500 pages/month FREE
- Typical menu = 1-3 pages
- ~150-250 menus/month FREE

**After Free Tier:**
- $1.50 per 1,000 pages
- Very affordable for production

## 📚 Full Documentation

See `services/ocr/README.md` for:
- Detailed architecture
- Alternative OCR providers
- Parser logic deep-dive
- Future enhancements
- Cost breakdowns

## 🎯 Next Steps

1. **Test with real menus** - Try diverse formats
2. **Tune parser** - Adjust confidence thresholds if needed
3. **Add categories** - Extend CATEGORY_KEYWORDS in `menuParser.ts`
4. **Train classifier** - Use existing menus to improve category detection
5. **Multi-page support** - Stitch results from multiple photos

## 🆘 Need Help?

- Check console logs: `npx expo start`
- Review Azure activity logs in portal
- Test with simpler menu first
- Open issue with example photo

---

**Feature Status:** ✅ Fully Implemented, Ready for Testing
**Setup Time:** ~5 minutes
**Developer:** Complete OCR pipeline with Azure integration

