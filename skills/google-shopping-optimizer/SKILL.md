---
name: google-shopping-optimizer
description: Optimize Google Shopping product feeds, fix Merchant Center disapprovals, and structure Shopping/PMax campaigns. Use when optimizing product titles, fixing disapprovals, managing supplemental feeds, custom labels, or comparing Shopping vs PMax.
---

# Google Shopping Optimizer

Optimize Google Shopping campaigns end-to-end: product feed quality, Merchant Center diagnostics, disapproval resolution, supplemental feed strategies, campaign segmentation with custom labels, competitive pricing analysis, and GTIN/MPN/brand compliance. Includes Shopping campaign vs Performance Max comparison guidance.

## Capabilities

- **Product Feed Optimization**: Improve titles, descriptions, images, and attributes for higher relevance
- **Merchant Center Diagnostics**: Identify and resolve product disapprovals and warnings
- **Supplemental Feed Management**: Override and enrich primary feed data without modifying source
- **Custom Label Strategy**: Segment products by margin, seasonality, performance tier, or price range
- **Competitive Pricing Analysis**: Monitor price competitiveness and adjust bidding accordingly
- **GTIN/MPN/Brand Compliance**: Ensure product identifiers meet Google requirements
- **Shopping vs PMax Comparison**: Data-driven guidance on campaign type selection

## Workflows

### 1. Product Feed Audit

```
1. Export product feed (Google Sheets, XML, or Content API)
2. Check for common issues:
   - Missing GTINs/MPNs (required for branded products)
   - Titles <70 characters or missing key attributes
   - Descriptions <500 characters
   - Low-quality or watermarked images
   - Missing product_type or google_product_category
   - Price mismatches between feed and landing page
3. Score each product: A (optimized), B (needs work), C (at risk of disapproval)
4. Prioritize fixes by revenue contribution
5. Implement via supplemental feed or primary feed update
```

### 2. Title Optimization Formula

```
Structure: [Brand] + [Product Type] + [Key Attributes] + [Model/Variant]

Examples by category:
  Apparel: "Nike Air Max 270 Men's Running Shoes - Black/White - Size 10"
  Electronics: "Samsung Galaxy S24 Ultra 256GB Unlocked Smartphone - Titanium Gray"
  Home: "KitchenAid Artisan 5-Quart Stand Mixer - Empire Red - KSM150PSER"

Rules:
  - Front-load most important terms (Google truncates at ~70 chars in Shopping)
  - Include brand FIRST (unless brand is unknown)
  - Add color, size, material, gender where relevant
  - Never use ALL CAPS or promotional text ("SALE", "FREE SHIPPING")
  - Never use Unicode symbols or emojis
  - Max 150 characters (aim for 70-100)
```

### 3. Disapproval Resolution Workflow

```
1. Export disapproved items from Merchant Center → Products → Diagnostics
2. Categorize by disapproval reason:

   a. Price/Availability Mismatch:
      → Verify feed price matches landing page price
      → Check currency and tax settings
      → Enable automated item updates (Content API)

   b. Missing Identifiers (GTIN/MPN):
      → Add GTIN from manufacturer or GS1
      → If no GTIN exists: set identifier_exists = false
      → Only valid for custom/handmade products

   c. Policy Violation:
      → Review prohibited content policies
      → Check image for watermarks, overlays, promotional text
      → Verify landing page matches product description

   d. Image Issues:
      → Minimum 100x100 px (recommend 800x800+)
      → White or transparent background for main image
      → No watermarks, logos, or text overlays
      → Product must fill 75%+ of frame

3. Fix issues in primary feed or supplemental feed
4. Request re-review in Merchant Center
5. Monitor: most re-reviews complete within 24-72 hours
```

### 4. Custom Label Strategy

```
custom_label_0: Performance Tier
  - "hero" → Top 20% products by revenue
  - "mid" → Middle 60%
  - "long_tail" → Bottom 20%

custom_label_1: Margin Tier
  - "high_margin" → >50% margin
  - "mid_margin" → 20-50% margin
  - "low_margin" → <20% margin

custom_label_2: Seasonality
  - "evergreen" → Year-round demand
  - "seasonal_q4" → Holiday season
  - "seasonal_summer" → Summer peak
  - "clearance" → End of life

custom_label_3: Price Range
  - "premium" → >$200
  - "mid_range" → $50-200
  - "budget" → <$50

custom_label_4: Competitive Position
  - "price_leader" → Lowest price in market
  - "competitive" → Within 10% of lowest
  - "premium_priced" → >10% above lowest

Campaign structure using labels:
  Campaign 1: Hero Products (custom_label_0 = hero) → highest bids, max budget
  Campaign 2: Mid-Tier (custom_label_0 = mid) → moderate bids
  Campaign 3: Long Tail (custom_label_0 = long_tail) → lowest bids, ROAS target
  Campaign 4: Seasonal Push (custom_label_2 = seasonal_q4) → seasonal budget boost
```

### 5. Supplemental Feed Strategy

```
Use supplemental feeds to:
  1. Override titles without changing primary feed
  2. Add custom labels for campaign segmentation
  3. Fix disapprovals quickly (faster than primary feed updates)
  4. Add sale_price and sale_price_effective_date
  5. Enrich with additional attributes (color, material, size)

Setup:
  1. Create Google Sheet with columns: id, [attributes to override]
  2. In Merchant Center → Feeds → Supplemental feeds → Add
  3. Connect Google Sheet
  4. Set update schedule (daily recommended)
  5. Supplemental values override primary feed values per product ID

Example supplemental feed (Google Sheet):
| id | title | custom_label_0 | custom_label_1 |
|----|-------|----------------|----------------|
| SKU-001 | Nike Air Max 270 Men's Running Shoes Black/White | hero | high_margin |
| SKU-002 | Samsung Galaxy Buds Pro Wireless Earbuds Black | mid | mid_margin |
```

## Reference Data

### GTIN/MPN/Brand Requirements

| Scenario | GTIN | MPN | Brand | identifier_exists |
|----------|------|-----|-------|-------------------|
| Branded product with GTIN | Required | Optional | Required | true (default) |
| Branded product without GTIN | N/A | Required | Required | true (default) |
| Custom/Handmade product | N/A | Optional | Your brand | false |
| Unbranded product | N/A | Optional | "Unbranded" | false |
| Bundle (you created) | N/A | Your MPN | Your brand | false |
| Multi-pack (same product) | GTIN of individual item | Optional | Required | true |

### Product Feed Required vs Recommended Attributes

| Attribute | Required | Recommended | Notes |
|-----------|----------|-------------|-------|
| id | ✅ | | Unique, max 50 chars |
| title | ✅ | | Max 150 chars, front-load keywords |
| description | ✅ | | Max 5000 chars, natural language |
| link | ✅ | | Landing page URL |
| image_link | ✅ | | Min 100x100, recommend 800x800+ |
| price | ✅ | | Must match landing page |
| availability | ✅ | | in_stock, out_of_stock, preorder |
| brand | ✅* | | Required if identifier_exists = true |
| gtin | ✅* | | Required for known brands |
| condition | ✅ | | new, refurbished, used |
| google_product_category | | ✅ | Use most specific category |
| product_type | | ✅ | Your own categorization |
| additional_image_link | | ✅ | Up to 10 additional images |
| sale_price | | ✅ | Strikethrough pricing |
| shipping | | ✅ | If not set at account level |
| color | | ✅ | Required for apparel |
| size | | ✅ | Required for apparel |
| gender | | ✅ | Required for apparel |
| age_group | | ✅ | Required for apparel |
| custom_label_0-4 | | ✅ | Campaign segmentation |

### Shopping vs Performance Max Comparison

| Factor | Standard Shopping | Performance Max |
|--------|-------------------|-----------------|
| Channel control | Shopping only | All Google channels |
| Bidding control | Manual CPC or Target ROAS | Automated only |
| Search query visibility | Full search term report | Limited (insights tab) |
| Negative keywords | ✅ Full support | Account-level only |
| Product group granularity | Full control | Asset group level |
| Reporting granularity | Product-level | Asset group level |
| New product discovery | Lower (query matching) | Higher (AI-driven) |
| Brand cannibalization risk | Low | Higher (may compete with Search) |
| Best for | Control-focused, mature accounts | Growth-focused, new products |
| Recommended budget | Any | $50+/day for learning |

### Image Best Practices

| Requirement | Standard | Notes |
|-------------|----------|-------|
| Minimum size | 100x100 px | 250x250 for apparel |
| Recommended size | 800x800 px+ | Higher resolution = better placement |
| File format | JPEG, PNG, GIF, BMP, TIFF | No animated GIFs |
| Max file size | 16 MB | |
| Background | White or transparent | For main image |
| Product fill | 75-90% of frame | Don't crop product |
| Text/Watermarks | Not allowed | On main image |
| Lifestyle images | Allowed | For additional_image_link |

### Competitive Pricing Signals

| Price Position | Impression Share Impact | Recommended Strategy |
|----------------|------------------------|----------------------|
| Lowest price | +20-40% impressions | Maintain, maximize volume |
| Within 5% of lowest | Baseline | Standard bidding |
| 5-15% above lowest | -10-20% impressions | Compete on title/image quality |
| >15% above lowest | -30-50% impressions | Highlight unique value, reduce bids |

## Examples

### Example 1: Feed audit and quick wins

```
User: "My Shopping campaigns have low impression share. Help me optimize."

Workflow:
1. Audit top 50 products by revenue:
   - 12 products missing GTIN → add from manufacturer
   - 8 titles under 40 characters → expand with attributes
   - 5 products have lifestyle images as main → swap to white background
   - 3 products disapproved for price mismatch → sync feed prices

2. Create supplemental feed with:
   - Optimized titles for top 50 products
   - Custom labels: hero/mid/long_tail based on last 90-day revenue
   - Fixed GTINs for 12 products

3. Expected impact: +15-25% impression share within 2 weeks
```

### Example 2: Shopping vs PMax migration decision

```
User: "Should I switch from Standard Shopping to PMax?"

Analysis:
1. Current Standard Shopping performance:
   - Monthly revenue: $45,000 | ROAS: 5.2x | Spend: $8,650
   - Full search query visibility → managing 200+ negative keywords
   - Product-level bid adjustments for top 30 SKUs

2. Recommendation: Hybrid approach
   - Keep Standard Shopping for top 30 hero SKUs (full control)
   - Launch PMax for remaining catalog (discovery + growth)
   - Set PMax priority LOWER than Standard Shopping
   - Monitor for 30 days, compare ROAS by product group

3. PMax setup:
   - Asset group 1: Top categories with lifestyle images + video
   - Asset group 2: Seasonal products with promotional assets
   - URL expansion: ON (let Google discover new product pages)
   - Final URL: product landing pages (not homepage)
```

### Example 3: Disapproval resolution

```
User: "I have 150 disapproved products in Merchant Center."

Triage:
1. Export disapprovals, categorize:
   - 80 products: Missing GTIN → bulk update via supplemental feed
   - 35 products: Price mismatch → enable automated item updates
   - 20 products: Image quality → replace with 800x800 white background
   - 10 products: Policy violation → review landing pages for restricted content
   - 5 products: Missing shipping info → set account-level shipping

2. Priority order:
   - Price mismatch (instant fix, automated updates)
   - Missing GTIN (supplemental feed, 24h)
   - Images (upload new, 48h review)
   - Policy (manual review, 72h+)

3. Timeline: 85% of products reinstated within 1 week
```
