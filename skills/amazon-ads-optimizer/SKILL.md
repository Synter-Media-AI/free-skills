---
name: amazon-ads-optimizer
description: Optimize Amazon Sponsored Products, Brands, and Display campaigns with ACOS/TACOS analysis, search term mining, and bid strategies. Use when optimizing Amazon Ads, analyzing ACOS, mining search terms, structuring campaigns, or selecting bid strategies.
---

# Amazon Ads Optimizer

Optimize Amazon Advertising campaigns across Sponsored Products, Sponsored Brands, and Sponsored Display. Covers ACOS vs TACOS analysis, search term report mining, bid strategy selection, campaign structure best practices, and Amazon-specific performance formulas and benchmarks.

## Capabilities

- **Sponsored Products Optimization**: Keyword harvesting, bid management, negative keyword pruning
- **Sponsored Brands Strategy**: Headline Search Ads, Store Spotlight, Video format selection
- **Sponsored Display Targeting**: Product targeting, audience targeting, views remarketing
- **ACOS/TACOS Analysis**: Profitability analysis at campaign, product, and portfolio level
- **Search Term Mining**: Identify high-converting queries, add negatives for waste reduction
- **Bid Strategy Selection**: Dynamic bids (up/down), fixed bids, rule-based automation
- **Campaign Structure**: Auto → Manual graduation, match type segmentation

## Workflows

### 1. Campaign Structure Framework

```
Portfolio: [Product Line / Brand]
├── SP - Auto - Discovery
│   └── All match types enabled
│   └── Purpose: Find converting search terms
│   └── Budget: 20% of portfolio spend
│
├── SP - Manual - Exact
│   └── Graduated keywords from Auto + Broad
│   └── Purpose: Scale proven winners
│   └── Budget: 40% of portfolio spend
│   └── Bids: Highest (these are proven converters)
│
├── SP - Manual - Broad/Phrase
│   └── Research keywords + category terms
│   └── Purpose: Find new keyword opportunities
│   └── Budget: 20% of portfolio spend
│   └── Bids: Moderate
│
├── SP - Manual - Product Targeting
│   └── Competitor ASINs + Complementary products
│   └── Purpose: Conquest + cross-sell
│   └── Budget: 10% of portfolio spend
│
├── SB - Brand Defense
│   └── Branded keywords + Store Spotlight
│   └── Purpose: Protect brand searches
│   └── Budget: 5% of portfolio spend
│
└── SD - Retargeting
    └── Views remarketing + purchase remarketing
    └── Purpose: Recapture interested shoppers
    └── Budget: 5% of portfolio spend
```

### 2. Keyword Harvesting Workflow (Auto → Manual)

```
Weekly cadence:

1. Download Search Term Report (last 14 days)
2. Filter for converting search terms:
   - Orders >= 2
   - ACOS <= target ACOS (e.g., 30%)
3. Add converting terms as EXACT match keywords in Manual Exact campaign
4. Set initial bid = average CPC from search term report + 20%
5. Add these same terms as NEGATIVE EXACT in Auto campaign
   (prevents Auto and Manual from competing)
6. For high-spend, no-conversion terms (spend > 2x product price, 0 orders):
   → Add as NEGATIVE EXACT in Auto campaign
   → Add as NEGATIVE PHRASE if pattern is clearly irrelevant

Repeat weekly. After 4 weeks, Manual Exact should capture 60-80% of conversions.
```

### 3. Bid Optimization Workflow

```
Daily/Weekly bid adjustments:

1. Pull keyword performance report (last 7-14 days)
2. Categorize keywords:

   High ACOS (>2x target):
   → If spend > $20 and 0 conversions: pause keyword
   → If some conversions: reduce bid by 20-30%
   → If new keyword (<14 days): give more time, reduce bid 10%

   At Target ACOS (0.8x-1.2x target):
   → Maintain current bids
   → Consider increasing bid 5-10% if impression share is low

   Below Target ACOS (<0.8x target):
   → Increase bid by 10-20% to capture more volume
   → Check if keyword is on page 1 (Top of Search placement)

   No Impressions:
   → Bid too low: increase by 50% or match suggested bid
   → If still no impressions after 7 days: check relevance

3. Adjust placement modifiers:
   - Top of Search: +25% to +100% (best conversion rates)
   - Product Pages: +0% to +50% (good for competitive terms)
```

### 4. ACOS/TACOS Analysis

```
Calculate and monitor these metrics:

ACOS = Ad Spend / Ad Revenue × 100
  Target varies by goal:
  - Launch phase: 50-100% (accept losses for ranking)
  - Growth phase: 25-40% (balance visibility and profit)
  - Profit phase: 15-25% (optimize for profitability)
  - Established: <15% (maximum efficiency)

TACOS = Total Ad Spend / Total Revenue × 100
  Why TACOS matters:
  - Includes organic revenue influenced by ads
  - Better indicator of overall advertising health
  - Target: 8-15% for most categories
  - Healthy sign: TACOS decreasing while revenue grows
    (means organic sales growing faster than ad spend)

Break-Even ACOS = Profit Margin %
  Example: Product price $30, cost $12, fees $8
  Profit before ads = $30 - $12 - $8 = $10
  Profit margin = $10 / $30 = 33%
  Break-even ACOS = 33%
  Target ACOS = 25% (to maintain 8% net margin)

Portfolio-Level Analysis:
  Total ad spend: $5,000/month
  Total ad revenue: $20,000/month (ACOS = 25%)
  Total organic revenue: $35,000/month
  Total revenue: $55,000/month
  TACOS = $5,000 / $55,000 = 9.1% ✅ Healthy
```

### 5. Search Term Mining

```
1. Export Search Term Report (60-90 days for statistical significance)

2. Identify Winners (add to Manual Exact):
   Criteria:
   - Orders >= 3
   - ACOS <= break-even ACOS
   - Not already in Manual campaigns
   Action: Add as Exact match, bid at avg CPC + 15%

3. Identify Losers (add as Negatives):
   Criteria:
   - Spend >= 2x product price
   - Orders = 0
   - Clicks >= 10 (enough data)
   Action: Add as Negative Exact (or Negative Phrase if pattern)

4. Identify Opportunities (add to Broad for testing):
   Criteria:
   - 1-2 orders
   - ACOS within 2x target
   - High click volume
   Action: Add to Broad campaign for more data, review in 2 weeks

5. Analyze patterns:
   - Are competitor brand terms converting? (conquest opportunity)
   - Are long-tail terms outperforming head terms? (expand)
   - Are irrelevant categories showing up? (negative at category level)
```

## Reference Data

### Amazon Ads Benchmark by Category (2025-2026)

| Category | Avg CPC | Avg ACOS | Avg CVR | Avg CTR |
|----------|---------|----------|---------|---------|
| Electronics | $0.80-1.50 | 20-35% | 8-12% | 0.30-0.50% |
| Home & Kitchen | $0.60-1.20 | 18-30% | 10-15% | 0.35-0.55% |
| Health & Beauty | $0.70-1.40 | 22-38% | 9-14% | 0.30-0.50% |
| Clothing & Apparel | $0.40-0.90 | 25-45% | 6-10% | 0.25-0.40% |
| Sports & Outdoors | $0.50-1.00 | 20-35% | 9-13% | 0.35-0.55% |
| Toys & Games | $0.30-0.80 | 15-28% | 12-18% | 0.40-0.65% |
| Pet Supplies | $0.50-1.10 | 20-32% | 10-15% | 0.35-0.55% |
| Grocery & Gourmet | $0.30-0.70 | 18-30% | 12-18% | 0.40-0.60% |
| Baby Products | $0.40-0.90 | 20-35% | 10-15% | 0.35-0.55% |
| Automotive | $0.60-1.30 | 22-38% | 8-12% | 0.30-0.45% |

### Bid Strategy Comparison

| Strategy | When to Use | Pros | Cons |
|----------|-------------|------|------|
| Dynamic Bids - Down Only | Default, conservative | Reduces waste on low-converting placements | May miss top-of-search opportunities |
| Dynamic Bids - Up and Down | Proven campaigns, high CVR products | Maximizes high-converting placements | Can increase spend significantly |
| Fixed Bids | Brand defense, exact control needed | Predictable spend | No placement optimization |
| Rule-Based Automation | Scale management, 50+ campaigns | Saves time, consistent execution | Requires initial rule setup |

### Placement Modifiers Guide

| Placement | Avg CVR Multiplier | Recommended Modifier | Notes |
|-----------|--------------------|-----------------------|-------|
| Top of Search (first page) | 2-3x | +25% to +100% | Best conversion rate, highest visibility |
| Rest of Search | 1x (baseline) | +0% | Standard placement |
| Product Pages | 0.5-1.5x | +0% to +50% | Good for competitive products |

### Sponsored Brands Format Comparison

| Format | Best For | CTR Range | CVR Range | Min Requirements |
|--------|----------|-----------|-----------|------------------|
| Product Collection | Showcasing 3+ ASINs | 0.5-1.0% | 5-10% | 3 products + brand logo |
| Store Spotlight | Driving Store traffic | 0.4-0.8% | 3-7% | Amazon Store with 3+ pages |
| Video | Product demos | 0.8-1.5% | 8-15% | 15-45s video, single ASIN |

### Sponsored Display Targeting Options

| Targeting Type | Use Case | Typical ACOS | Audience Size |
|----------------|----------|--------------|---------------|
| Product Targeting (specific ASINs) | Conquest competitors | 25-40% | Varies |
| Product Targeting (categories) | Category awareness | 30-50% | Large |
| Views Remarketing | Retarget product viewers | 15-25% | Medium |
| Purchases Remarketing | Upsell/cross-sell | 10-20% | Small |
| In-Market Audiences | Reach active shoppers | 30-50% | Large |
| Lifestyle Audiences | Brand awareness | 40-60% | Very large |

### Amazon Advertising Formulas

```
ACOS = (Ad Spend / Ad Revenue) × 100

ROAS = Ad Revenue / Ad Spend
     = 1 / (ACOS / 100)

TACOS = Total Ad Spend / Total Revenue × 100

Break-Even ACOS = ((Price - COGS - Amazon Fees) / Price) × 100

Target ACOS = Break-Even ACOS - Desired Net Margin %

CPC = Ad Spend / Clicks

CVR = Orders / Clicks × 100

CTR = Clicks / Impressions × 100

Impression Share = Your Impressions / Total Available Impressions × 100

Ad Revenue = Clicks × CVR × Avg Order Value

Required Budget = Target Impressions × CTR × CPC
```

## Examples

### Example 1: New product launch strategy

```
User: "I'm launching a new kitchen gadget on Amazon. Set up my ad strategy."

Phase 1 (Weeks 1-4): Discovery & Ranking
  Campaign 1: SP Auto (all match types)
    Budget: $50/day | Bid: $0.75 | Strategy: Dynamic Down
    Purpose: Discover converting search terms

  Campaign 2: SP Manual Broad
    Budget: $30/day | Keywords: 20 category terms
    Bid: $0.65 | Strategy: Dynamic Down

  Target ACOS: 60-80% (accept higher ACOS for ranking)
  
Phase 2 (Weeks 5-8): Optimization
  - Harvest winners from Auto → Manual Exact
  - Add negatives for non-converters
  - Launch Sponsored Brands (Video format with demo)
  - Target ACOS: 35-45%

Phase 3 (Weeks 9-12): Profitability
  - Scale Manual Exact winners (increase bids 15%)
  - Reduce Auto budget by 50%
  - Launch Sponsored Display (views remarketing)
  - Target ACOS: 25-30%

Phase 4 (Ongoing): Maintenance
  - Weekly search term harvesting
  - Bi-weekly bid adjustments
  - Monthly negative keyword audit
  - Target ACOS: <25%
  - Monitor TACOS trend (should be declining)
```

### Example 2: ACOS reduction

```
User: "My ACOS is 45% but my break-even is 30%. Help me fix it."

Diagnosis:
1. Pull keyword-level data for last 30 days
2. Identify waste:
   - 15 keywords with >$50 spend, 0 orders → pause immediately
   - Saves ~$800/month in waste

3. Optimize bids:
   - 8 keywords with ACOS >60%: reduce bids by 30%
   - 12 keywords with ACOS 30-45%: reduce bids by 15%
   - 5 keywords with ACOS <20%: increase bids by 20% (scale winners)

4. Placement analysis:
   - Top of Search ACOS: 22% → increase modifier to +50%
   - Product Pages ACOS: 55% → set modifier to 0%

5. Structure fix:
   - Move top 10 exact match keywords to dedicated campaign
   - Set higher budget allocation (40%) to this campaign

Expected result: ACOS reduction from 45% → 28-32% within 4 weeks
```

### Example 3: Search term mining session

```
User: "Run a search term analysis for my supplements brand."

Analysis (60-day data):

Winners (add to Manual Exact):
  "vitamin d3 5000 iu" → 45 orders, 18% ACOS → Exact bid $1.20
  "magnesium glycinate 400mg" → 32 orders, 22% ACOS → Exact bid $0.95
  "zinc supplement capsules" → 28 orders, 20% ACOS → Exact bid $0.85

Losers (add as Negatives):
  "vitamin d3 gummies" → $120 spend, 0 orders → Negative Exact
  "magnesium spray" → $85 spend, 0 orders → Negative Phrase
  "free vitamin samples" → $60 spend, 0 orders → Negative Phrase

Opportunities (test in Broad):
  "best magnesium for sleep" → 2 orders, 35% ACOS → Add to Broad
  "vitamin d winter supplement" → 1 order, 28% ACOS → Add to Broad

Patterns:
  - "Gummies" format terms waste budget (our product is capsules)
  - "For sleep" long-tail terms convert well → create sleep-focused ad group
  - Competitor brand "Nature Made" terms showing up → evaluate conquest campaign
```
