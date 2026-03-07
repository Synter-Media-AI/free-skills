---
name: performance-max-optimizer
description: Optimize Google Ads Performance Max campaigns including asset groups, audience signals, search term insights, and channel allocation. Use when managing PMax campaigns, analyzing asset performance, configuring audience signals, or optimizing product feeds.
---

# Performance Max Optimizer

Comprehensive optimization toolkit for Google Ads Performance Max (PMax) campaigns. Covers asset group strategy, search term insights extraction, audience signal configuration, asset performance interpretation, channel allocation analysis, and listing group optimization.

## Capabilities

1. **Asset Group Optimization** - Structure asset groups, meet minimum requirements, and maximize ad strength
2. **Search Term Insights** - Extract search queries, identify wasteful traffic, and apply negatives
3. **Audience Signals** - Configure custom segments, interests, and demographics for optimal targeting
4. **Asset Performance Analysis** - Interpret Low/Good/Best ratings and prioritize replacements
5. **Channel Allocation** - Analyze spend distribution across Search, Display, YouTube, Shopping, and Discover
6. **Listing Group Optimization** - Structure product groups and optimize feed attributes

## Asset Requirements Reference

### Minimum and Maximum Assets per Asset Group

| Asset Type | Minimum | Maximum | Character Limit | Best Practice |
|------------|---------|---------|-----------------|---------------|
| Headlines | 3 | 15 | 30 chars | Provide 10-15 for variety |
| Long Headlines | 1 | 5 | 90 chars | Provide 4-5 |
| Descriptions | 2 | 5 | 90 chars | Provide 4-5 |
| Images (Landscape) | 1 | 20 | 1.91:1 ratio | Provide 5+ unique |
| Images (Square) | 1 | 20 | 1:1 ratio | Provide 5+ unique |
| Images (Portrait) | 0 | 20 | 4:5 ratio | Provide 3+ for mobile |
| Logos (Square) | 1 | 5 | 1:1, min 128×128 | Provide 2-3 |
| Logos (Landscape) | 0 | 5 | 4:1 ratio | Provide 1-2 |
| Videos | 0 | 5 | 10s+ (YouTube) | Provide 2-3 or Google auto-generates |
| Business Name | 1 | 1 | 25 chars | Required |
| Final URL | 1 | 1 | - | Required |
| Call to Action | 0 | 1 | Preset list | "Automated" recommended |

### Ad Strength Ratings

| Rating | Meaning | Action |
|--------|---------|--------|
| Poor | Significantly below best practices | Add more assets immediately |
| Average | Meets minimums but room to improve | Add diverse assets |
| Good | Solid asset variety | Optimize underperformers |
| Excellent | Maximized asset diversity | Maintain and iterate |

**Ad Strength improvement checklist:**
1. ☐ 10+ unique headlines (avoid repetition)
2. ☐ 4+ descriptions with different angles (features, benefits, urgency, social proof)
3. ☐ 5+ landscape images (different scenes, angles, use cases)
4. ☐ 5+ square images
5. ☐ 3+ portrait images
6. ☐ At least 1 custom video (15-30 seconds)
7. ☐ Headlines include keywords, brand name, and CTAs

## Workflows

### Workflow 1: Asset Performance Analysis

**Step 1: Pull asset performance data via GAQL**

```sql
SELECT
  asset.id,
  asset.name,
  asset.type,
  asset.text_asset.text,
  asset_group_asset.performance_label,
  asset_group_asset.status
FROM asset_group_asset
WHERE
  campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND asset_group_asset.status = 'ENABLED'
ORDER BY asset.type
```

**Step 2: Categorize by performance label**

| Label | Meaning | Action |
|-------|---------|--------|
| BEST | Top performer in its category | Keep, create variations |
| GOOD | Performs well | Keep, monitor |
| LOW | Underperforming vs peers | Replace within 2-4 weeks |
| LEARNING | Insufficient data | Wait 2+ weeks |
| PENDING | Not yet evaluated | Wait for data |
| UNSPECIFIED | No label available | Check asset group setup |

**Step 3: Replacement strategy**

- Replace LOW assets with variations of BEST assets
- Keep at least 3 headlines, 1 long headline, 2 descriptions as BEST/GOOD
- Never remove all assets of a type simultaneously
- Replace 1-2 assets at a time, wait 2 weeks between changes

**Step 4: A/B variant creation**

For each BEST headline, create 2-3 variations:
```
BEST: "Free Shipping on All Orders"
Variant A: "Ships Free — No Minimum"
Variant B: "Free Delivery on Every Purchase"
Variant C: "Zero Shipping Costs, Always"
```

### Workflow 2: Search Term Insights Extraction

**Step 1: Access Search Term Insights**

Navigate to: Campaign → Insights → Search terms

Or via GAQL (limited — Google restricts raw search term data for PMax):

```sql
SELECT
  campaign.name,
  search_term_insight.category_label,
  metrics.clicks,
  metrics.impressions,
  metrics.conversions,
  metrics.cost_micros
FROM search_term_insight
WHERE
  campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
```

**Step 2: Identify wasteful categories**

Flag search term categories where:
- Conversion rate < 50% of campaign average
- CPA > 2× campaign target
- High clicks but zero conversions

**Step 3: Apply account-level negatives**

PMax supports account-level negative keywords (not campaign-level):

1. Go to Admin → Account settings → Negative keyword lists
2. Create a new list: "PMax - Irrelevant Queries"
3. Add identified irrelevant terms
4. Apply list to the PMax campaign

**Common PMax negative keyword categories:**
- Job-related: "jobs", "careers", "salary", "hiring"
- Informational: "what is", "how to", "definition", "wiki"
- Free/cheap: "free", "cheap", "discount code", "coupon"
- Competitor brand terms (if not targeting them intentionally)
- DIY: "diy", "tutorial", "template", "homemade"

**Step 4: Monitor impact**

After adding negatives, wait 7-14 days and compare:
- Conversion rate change
- CPA change
- Impression share change (should not drop significantly)

### Workflow 3: Audience Signal Configuration

**Understanding audience signals (not audience targeting):**
PMax audience signals are suggestions, not restrictions. They guide the algorithm's initial targeting but PMax will expand beyond them. Stronger signals = faster learning.

**Step 1: Configure custom segments**

Create custom segments based on:

| Signal Type | Example | Best For |
|-------------|---------|----------|
| Search terms | "buy running shoes online" | Purchase-intent audiences |
| URLs | competitor websites | Competitor conquesting |
| Apps | competitor apps | Mobile-focused audiences |

**Recommended custom segment strategy:**
- Create 2-3 keyword-based segments (high-intent purchase terms)
- Create 1-2 URL-based segments (competitor websites, review sites)
- Keep segments at 50-100 terms/URLs each

**Step 2: Add first-party data**

| Data Signal | Priority | Setup |
|-------------|----------|-------|
| Customer Match (purchasers) | Critical | Upload customer list → Existing customers |
| Customer Match (high-LTV) | High | Upload top 20% customers by revenue |
| Website visitors (converters) | High | GA4 audience → People who converted |
| Website visitors (all) | Medium | GA4 audience → All visitors |
| Cart abandoners | High | GA4 audience → Add to cart, no purchase |

**Step 3: Layer interests and demographics**

Add as supplementary signals (not primary):
- Affinity audiences related to your product category
- In-market audiences for related purchase categories
- Demographic filters only if strong data supports exclusion

**Step 4: Evaluate signal quality**

After 30 days, check Insights tab:
- Which audience segments are converting?
- Is PMax expanding beyond your signals effectively?
- Are the top converting audiences aligned with your signals?

### Workflow 4: Channel Allocation Analysis

**Step 1: Pull channel-level data**

Use the Insights tab or GAQL to approximate channel distribution:

```sql
SELECT
  campaign.name,
  segments.ad_network_type,
  metrics.impressions,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_micros
FROM campaign
WHERE
  campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
```

**Step 2: Assess allocation health**

Typical healthy PMax distribution (e-commerce):

| Channel | Spend % | Conversion % | Healthy? |
|---------|---------|--------------|----------|
| Shopping | 40-60% | 50-70% | Primary converter |
| Search | 15-25% | 15-25% | Brand + generic queries |
| Display | 10-20% | 5-10% | Awareness + retargeting |
| YouTube | 5-15% | 3-8% | Awareness + consideration |
| Discover/Gmail | 3-8% | 2-5% | Incremental reach |

**Step 3: Diagnose imbalanced allocation**

| Problem | Symptoms | Fix |
|---------|----------|-----|
| Too much Display | > 30% spend on Display, low conversion rate | Improve audience signals, add more purchase-intent custom segments |
| Too much brand Search | High Search %, mostly brand queries | Add brand terms as negatives at account level |
| Low Shopping | < 30% on Shopping for e-commerce | Improve product feed quality, add more product images |
| No YouTube | 0% YouTube spend | Add custom video assets (even 15-second) |

### Workflow 5: Product Feed Optimization (Shopping)

**Step 1: Feed quality audit**

| Attribute | Impact | Recommendation |
|-----------|--------|----------------|
| Title | Critical | Include brand + product type + key attributes (color, size) |
| Description | High | 150-500 characters, include keywords naturally |
| Images | Critical | High-res, white background, no text overlays |
| Price | Critical | Must match landing page exactly |
| GTIN/MPN | High | Include for product matching |
| Product type | Medium | Use Google's taxonomy hierarchy |
| Custom labels | Medium | Use for campaign segmentation (margin, seasonality, bestseller) |

**Step 2: Listing group structure**

Organize products into logical groups for different asset groups:

```
Asset Group: "Premium Running Shoes"
└── Listing Group: Brand = Nike, Category = Running
    └── Audience Signal: "buy running shoes", competitor URLs

Asset Group: "Budget Athletic Shoes"
└── Listing Group: Price < $80, Category = Athletic
    └── Audience Signal: "affordable running shoes", price-comparison URLs

Asset Group: "Accessories"
└── Listing Group: Category = Shoe Accessories
    └── Audience Signal: "running accessories", complementary products
```

**Step 3: Custom label strategy**

| Custom Label | Values | Use Case |
|--------------|--------|----------|
| custom_label_0 | "high_margin", "low_margin" | Bid differently by profitability |
| custom_label_1 | "bestseller", "new", "clearance" | Prioritize top products |
| custom_label_2 | "seasonal_spring", "evergreen" | Adjust by season |
| custom_label_3 | "promo_active", "full_price" | Align with promotions |
| custom_label_4 | "priority_1", "priority_2", "priority_3" | General prioritization |

## Reference Data

### PMax Performance Benchmarks by Industry

| Industry | Avg ROAS | Avg CPA | Avg Conversion Rate |
|----------|----------|---------|---------------------|
| E-commerce (apparel) | 4.5x | $28 | 2.8% |
| E-commerce (electronics) | 3.8x | $45 | 1.9% |
| E-commerce (home goods) | 5.2x | $22 | 3.2% |
| Lead Gen (B2B SaaS) | N/A | $85 | 2.1% |
| Lead Gen (financial) | N/A | $120 | 1.4% |
| Lead Gen (education) | N/A | $42 | 3.8% |
| Local services | N/A | $35 | 4.5% |

### PMax vs Standard Shopping Comparison

| Metric | PMax Avg | Standard Shopping Avg | Difference |
|--------|----------|----------------------|------------|
| ROAS | 4.2x | 3.8x | +10.5% |
| Impression share | 65% | 55% | +18.2% |
| New customer % | 35% | 25% | +40% |
| CPC | $0.85 | $0.72 | +18.1% |
| Conversion volume | Higher | Lower | +15-25% |

## Examples

### Example 1: E-commerce PMax Setup

**Scenario:** Online shoe retailer, $5K/day budget, 500+ SKUs.

**Asset group structure (3 groups):**

1. **"Men's Running"** — Products: Men's running shoes. Signals: "buy men's running shoes", nike.com, competitor URLs. 12 headlines, 4 long headlines, 5 descriptions, 8 landscape images of men running.

2. **"Women's Athletic"** — Products: Women's athletic shoes. Signals: "women's workout shoes", fitness app users. 12 headlines, 4 long headlines, 5 descriptions, 8 lifestyle images.

3. **"Accessories & Apparel"** — Products: Socks, insoles, shorts. Signals: "running accessories", existing customer list. 10 headlines, 3 long headlines, 4 descriptions, 6 product images.

**Result after 30 days:**
- ROAS: 4.8x (up from 3.2x on Standard Shopping)
- 40% of conversions from new customers
- Search terms showed 8% irrelevant traffic → added 45 account-level negatives

### Example 2: Lead Gen PMax Optimization

**Scenario:** B2B SaaS, $150 target CPA, 200/month leads needed.

**Problem:** CPA at $220, mostly Display traffic with low quality.

**Optimization steps:**
1. Added 5 custom segments with purchase-intent keywords
2. Uploaded customer match list (500 existing customers)
3. Added 3 custom videos showing product demo
4. Added account-level negatives for "free", "jobs", "salary", competitor brands
5. Created 2 asset groups: one for "Enterprise" signals, one for "SMB" signals

**Result:** CPA dropped to $145 in 3 weeks. Lead quality score (internal) improved 35%.

### Example 3: Diagnosing PMax Cannibalizing Brand Search

**Symptom:** Brand Search campaign impressions dropped 60% after PMax launch.

**Diagnosis:**
1. Checked Search Term Insights → 45% of PMax search queries were brand terms
2. Brand CPA in PMax: $8 (cheap but not incremental)
3. Non-brand CPA in PMax: $65 (real incremental cost)

**Fix:**
1. Added brand terms as account-level negatives
2. PMax impressions dropped 30% but conversion volume only dropped 5%
3. Brand Search campaign recovered to pre-PMax levels
4. Blended CPA improved as brand queries returned to cheaper Brand campaign
