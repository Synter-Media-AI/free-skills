---
name: executive-reporting
description: C-suite advertising reports with narrative insights, YoY/MoM comparisons, blended ROAS, pacing analysis, and visualization recommendations. Use when creating executive summaries, board reports, monthly ad performance reviews, or generating narrative insights from campaign data.
---

# Executive Reporting

Generate C-suite-ready advertising performance reports with narrative insights, not just data tables. Covers YoY and MoM comparison frameworks, blended ROAS and incrementality-adjusted metrics, budget utilization and pacing reports, competitive context summaries, visualization recommendations, and ready-to-use report templates.

## Capabilities

- **C-Suite Report Templates**: One-page executive summary with KPIs, trends, insights, recommendations
- **Narrative Insight Generation**: Transform data into business storylines
- **YoY / MoM Comparisons**: Period-over-period analysis with context
- **Blended ROAS & Incrementality**: Cross-platform deduplicated performance measurement
- **Budget Pacing Reports**: Spend tracking, utilization rates, forecast to end of period
- **Competitive Context**: Market share, auction insights, share of voice summaries
- **Visualization Recommendations**: Right chart type for each metric and audience

## Workflows

### 1. Monthly Executive Report Generation

```
1. Gather data from all platforms:
   - Google Ads: GAQL queries for campaign, keyword, and search term data
   - Meta: Marketing API insights with campaign-level breakdowns
   - LinkedIn: Reporting API with campaign analytics
   - Other platforms: respective APIs or manual export

2. Compile cross-platform summary:
   - Total spend, revenue, ROAS, conversions across all platforms
   - Platform-level breakdown (spend %, ROAS, CPA by platform)
   - MoM change for each KPI
   - YoY change for each KPI (if historical data available)

3. Generate narrative insights (not just numbers):
   ❌ "ROAS decreased from 4.2 to 3.8"
   ✅ "ROAS declined 9.5% to 3.8x, driven by a 22% CPM increase on Meta
       during the seasonal ramp-up. However, total conversions grew 15%,
       indicating successful audience expansion at slightly higher cost."

4. Identify top 3 wins and top 3 concerns:
   Wins: What worked well and should be scaled
   Concerns: What underperformed and needs attention

5. Provide 3-5 actionable recommendations:
   Each recommendation should include:
   - What to do
   - Expected impact (quantified)
   - Timeline
   - Effort/resource required

6. Format for audience:
   - Board/C-Suite: 1 page max, big numbers, trends, strategic insight
   - VP Marketing: 2-3 pages, channel breakdown, recommendations
   - Campaign Manager: Detailed appendix with keyword/ad-level data
```

### 2. YoY / MoM Comparison Framework

```
For each KPI, calculate and present:

1. Absolute values:
   - This period: $45,000 spend, 1,200 conversions
   - Last period: $42,000 spend, 1,050 conversions

2. Change metrics:
   - Absolute change: +$3,000 spend, +150 conversions
   - Percentage change: +7.1% spend, +14.3% conversions
   - Direction indicator: ↑ or ↓ with color (green = good, red = bad)

3. Context adjustments:
   - Seasonal context: "November vs October naturally sees +20% spend"
   - Market context: "Industry CPMs rose 15% due to election advertising"
   - Internal context: "We launched 2 new campaigns mid-month"

4. Efficiency metrics (the real story):
   - Cost per conversion change: better or worse?
   - ROAS change: improving or declining?
   - Budget utilization: spent more AND got better results? Or just spent more?

Presentation format:
| Metric | This Month | Last Month | MoM Change | Last Year | YoY Change |
|--------|------------|------------|------------|-----------|------------|
| Spend | $45,000 | $42,000 | ↑ +7.1% | $38,000 | ↑ +18.4% |
| Revenue | $180,000 | $168,000 | ↑ +7.1% | $145,000 | ↑ +24.1% |
| ROAS | 4.0x | 4.0x | → 0% | 3.8x | ↑ +5.3% |
| Conversions | 1,200 | 1,050 | ↑ +14.3% | 920 | ↑ +30.4% |
| CPA | $37.50 | $40.00 | ↓ -6.3% ✅ | $41.30 | ↓ -9.2% ✅ |
| CTR | 2.8% | 2.5% | ↑ +12% | 2.2% | ↑ +27.3% |
```

### 3. Blended ROAS Calculation

```
Problem: Each platform claims credit for the same conversion.
Solution: Blended ROAS using a single source of truth.

Blended ROAS = Total Revenue (from analytics/CRM) / Total Ad Spend (all platforms)

Example:
  Google Ads reported revenue: $120,000
  Meta Ads reported revenue: $95,000
  LinkedIn Ads reported revenue: $15,000
  Total platform-reported: $230,000 (inflated due to overlap)

  Google Analytics revenue (single source): $175,000
  Total ad spend: $45,000

  Platform ROAS: $230,000 / $45,000 = 5.1x (overstated)
  Blended ROAS: $175,000 / $45,000 = 3.9x (accurate)

Incrementality adjustment:
  If incrementality tests show ads drive 70% incremental lift:
  Incrementality-adjusted ROAS: $175,000 × 0.70 / $45,000 = 2.7x
  This represents true incremental return on ad spend.

Present both:
  "Blended ROAS is 3.9x. Adjusted for incrementality, true ROAS is approximately 2.7x,
   meaning every $1 in ad spend generates $2.70 in revenue that would not have
   occurred without advertising."
```

### 4. Budget Pacing Report

```
Track spend pacing to ensure budgets are fully utilized without overspend.

Daily pacing:
  Monthly budget: $45,000
  Days in month: 30
  Expected daily spend: $1,500/day
  Days elapsed: 18
  Expected cumulative spend: $27,000
  Actual cumulative spend: $24,500
  Pacing: 90.7% — Underpacing by $2,500

  Forecast:
  If current pace continues: $40,833 (90.7% utilization)
  To hit budget: increase daily spend to $1,708/day for remaining 12 days

Pacing alert thresholds:
  | Pacing % | Status | Action |
  |----------|--------|--------|
  | >110% | Overpacing | Review for runaway spend, reduce bids |
  | 95-110% | On Track | No action needed |
  | 85-95% | Slightly Under | Minor bid increases or new campaigns |
  | 70-85% | Underpacing | Significant intervention needed |
  | <70% | Critical | Campaigns may be limited, troubleshoot |

Platform-level breakdown:
  | Platform | Budget | Spent | Pacing | Status |
  |----------|--------|-------|--------|--------|
  | Google Search | $18,000 | $11,200 | 103% | ✅ On Track |
  | Google Shopping | $9,000 | $4,800 | 89% | ⚠️ Slightly Under |
  | Meta | $12,000 | $6,100 | 85% | ⚠️ Slightly Under |
  | LinkedIn | $6,000 | $2,400 | 67% | 🔴 Underpacing |
```

### 5. Narrative Insight Templates

```
Pattern: [Metric] [direction] [amount] [period], [cause], [impact], [recommendation]

Examples:

Growth story:
  "Conversions grew 23% MoM to 1,450, the highest monthly total in 2026.
   This growth was driven by our new Performance Max campaigns, which contributed
   320 incremental conversions at a CPA 18% below account average. We recommend
   increasing PMax budget by 25% next month to sustain this trajectory."

Efficiency improvement:
  "CPA decreased 12% to $34.50 while maintaining volume, reflecting successful
   bid optimizations implemented in week 2. The primary driver was pausing
   3 underperforming ad groups that were consuming 15% of spend with 0 conversions.
   We've reinvested those savings into top-performing campaigns."

Concern:
  "Meta ROAS declined from 3.5x to 2.8x (-20%), coinciding with iOS privacy changes
   reducing audience signal quality. Modeled conversions now represent 35% of total.
   We recommend implementing Enhanced Conversions API to recover 15-20% of lost
   attribution and stabilize performance tracking."

Market context:
  "Despite a 15% increase in auction CPMs due to election-year advertising competition,
   we maintained CPA within 5% of target by shifting 20% of display budget to
   Search, where costs remained stable. This strategic reallocation preserved
   profitability during the most expensive advertising quarter of the election cycle."
```

## Reference Data

### Visualization Recommendations by Metric Type

| Metric Type | Best Chart | Why | Avoid |
|-------------|------------|-----|-------|
| Spend over time | Area chart or stacked bar | Shows magnitude and composition | Pie chart (poor for time series) |
| ROAS / CPA trend | Line chart | Shows trajectory clearly | Bar chart (hides trends) |
| Platform comparison | Horizontal bar | Easy to compare across categories | Radar chart (hard to read) |
| Budget utilization | Gauge or progress bar | Intuitive pacing visual | Table only (lacks visual impact) |
| Conversion funnel | Funnel chart | Shows drop-off at each stage | Pie chart (not sequential) |
| MoM / YoY change | Waterfall chart | Shows positive and negative contributions | Stacked bar (harder to parse) |
| Geographic performance | Heatmap or choropleth map | Spatial distribution is intuitive | Bar chart (loses geographic context) |
| Audience breakdown | Donut chart or treemap | Shows composition | 3D charts (distorts proportions) |
| Hourly / day-of-week | Heatmap (matrix) | Shows patterns in 2 dimensions | Line chart (too many lines) |
| KPI scorecard | Big number cards | Scannable at a glance | Dense tables |

### Executive KPI Scorecard Template

```markdown
# Monthly Advertising Report — [Month Year]

## Executive Summary
[2-3 sentence narrative: overall performance, key wins, key concerns]

---

## KPI Scorecard

| KPI | This Month | vs Last Month | vs Last Year | Target | Status |
|-----|------------|---------------|--------------|--------|--------|
| Total Spend | $XX,XXX | +X.X% | +X.X% | $XX,XXX | ✅ |
| Total Revenue | $XXX,XXX | +X.X% | +X.X% | $XXX,XXX | ✅ |
| Blended ROAS | X.Xx | +X.X% | +X.X% | X.Xx | ✅ |
| Total Conversions | X,XXX | +X.X% | +X.X% | X,XXX | ⚠️ |
| Blended CPA | $XX.XX | -X.X% | -X.X% | $XX.XX | ✅ |
| New Customers | X,XXX | +X.X% | +X.X% | X,XXX | ✅ |

---

## Channel Performance

| Channel | Spend | Revenue | ROAS | CPA | Conv | MoM Δ |
|---------|-------|---------|------|-----|------|-------|
| Google Search | $X | $X | X.Xx | $X | X | +X% |
| Google Shopping | $X | $X | X.Xx | $X | X | +X% |
| Meta | $X | $X | X.Xx | $X | X | +X% |
| LinkedIn | $X | $X | X.Xx | $X | X | -X% |
| TikTok | $X | $X | X.Xx | $X | X | +X% |
| **Total** | **$X** | **$X** | **X.Xx** | **$X** | **X** | **+X%** |

---

## Top 3 Wins
1. [Win with quantified impact]
2. [Win with quantified impact]
3. [Win with quantified impact]

## Top 3 Concerns
1. [Concern with root cause and severity]
2. [Concern with root cause and severity]
3. [Concern with root cause and severity]

---

## Recommendations

| # | Action | Expected Impact | Timeline | Effort |
|---|--------|-----------------|----------|--------|
| 1 | [Action] | [Quantified impact] | [When] | [Low/Med/High] |
| 2 | [Action] | [Quantified impact] | [When] | [Low/Med/High] |
| 3 | [Action] | [Quantified impact] | [When] | [Low/Med/High] |

---

## Budget Pacing

| Channel | Monthly Budget | Spent to Date | Pacing | Forecast |
|---------|---------------|---------------|--------|----------|
| Google | $XX,XXX | $XX,XXX | XX% | $XX,XXX |
| Meta | $XX,XXX | $XX,XXX | XX% | $XX,XXX |
| LinkedIn | $XX,XXX | $XX,XXX | XX% | $XX,XXX |
| **Total** | **$XX,XXX** | **$XX,XXX** | **XX%** | **$XX,XXX** |

---

## Competitive Landscape
[Brief summary of competitive changes, auction pressure, market trends]

---

*Report generated [date]. Data sources: Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, Google Analytics 4.*
```

### Board-Level One-Pager Template

```markdown
# Advertising Performance — [Quarter] [Year]

**Revenue attributable to advertising: $X.XM** (+XX% YoY)
**Total ad spend: $XXXk** | **Blended ROAS: X.Xx** | **CAC: $XX**

## The Story This Quarter
[3-4 sentences: what happened, why it matters, what's next]

## Key Metrics vs Plan

         Metric          Actual    Plan    Variance
         ──────          ──────    ────    ────────
         Revenue         $X.XM     $X.XM   +XX%
         New Customers   X,XXX     X,XXX   +XX%
         CAC             $XXX      $XXX    -XX% ✅
         LTV:CAC         X.Xx      X.Xx    +XX%

## Channel Efficiency (Blended)
  Google ████████████████████ $X.XM rev ($XXk spend) = X.Xx ROAS
  Meta   ████████████████     $X.XM rev ($XXk spend) = X.Xx ROAS
  LinkedIn ████████           $XXXk rev ($XXk spend) = X.Xx ROAS

## Strategic Recommendations
1. **Scale Google PMax** — delivering 2x ROAS vs Search at 30% lower CPA
2. **Invest in first-party data** — cookie changes reducing Meta attribution 20%
3. **Test TikTok for Gen Z segment** — $5k pilot in Q2

## Risks
- CPM inflation expected +15-25% in Q4 (election year)
- Meta attribution gap widening (recommend server-side tracking)
```

### Report Frequency Guide

| Audience | Frequency | Depth | Length | Focus |
|----------|-----------|-------|--------|-------|
| Board / CEO | Quarterly | High-level KPIs | 1 page | Business impact, strategic direction |
| CMO / VP Marketing | Monthly | Channel breakdown | 2-3 pages | Performance, optimization, budget |
| Director of Marketing | Weekly | Campaign detail | 3-5 pages | Tactical adjustments, tests |
| Campaign Manager | Daily/Weekly | Keyword/ad level | Detailed | Granular optimization |

## Examples

### Example 1: Monthly executive report

```
User: "Generate a monthly report for our CMO."

Report output:

# Advertising Report — February 2026

## Executive Summary
February delivered 1,320 conversions at $38 CPA, beating our $42 target by 9.5%.
Total spend of $50,200 was on pace at 98% utilization. The standout was our new
Performance Max campaign, which generated 280 conversions at $28 CPA — 33% below
account average. Meta ROAS declined 15% due to audience fatigue on our primary
creative set; refreshing creatives is the top priority for March.

## Top 3 Wins
1. PMax generated 280 conversions at $28 CPA (33% below average) — scale budget 25%
2. Google Search brand CPA decreased 18% after negative keyword pruning
3. LinkedIn lead quality improved: SQL rate up from 12% to 19% after form optimization

## Top 3 Concerns
1. Meta ROAS: 2.8x → 2.4x (-14%) due to creative fatigue (frequency hit 6.2x)
2. LinkedIn underpacing at 72% — low impression volume on narrow audience
3. TikTok CPL at $65 vs $45 target — needs creative and targeting refresh

## Recommendations
1. Refresh Meta creative set (3 new variants) — expect ROAS recovery to 3.0x+
2. Broaden LinkedIn audience from 35k → 80k by adding 2 job functions
3. Increase PMax daily budget from $400 → $500 (proven efficiency)
```

### Example 2: Blended ROAS analysis

```
User: "Each platform says we have great ROAS but revenue doesn't match."

Analysis:
  Platform-reported revenue:
    Google Ads: $280,000 (ROAS 5.6x)
    Meta Ads: $195,000 (ROAS 4.9x)
    LinkedIn: $45,000 (ROAS 3.0x)
    Total claimed: $520,000

  Google Analytics revenue: $340,000
  Total ad spend: $100,000

  Overcounting: 53% — platforms are double-counting shared conversions

  Blended ROAS: $340,000 / $100,000 = 3.4x (true performance)
  
  Recommendation:
  "Use blended ROAS (3.4x) as the executive KPI. Platform-level ROAS (5.6x, 4.9x, 3.0x)
   is useful for relative performance comparison between channels, but should never be
   summed or used for revenue forecasting. We recommend running incrementality tests
   on each channel to determine true contribution."
```

### Example 3: Budget pacing intervention

```
User: "We're halfway through the month and only spent 35% of budget."

Pacing analysis:
  Monthly budget: $60,000
  Day 15 of 30 (50% elapsed)
  Spent: $21,000 (35%)
  Underpacing by: $9,000 (15 percentage points)

  Platform breakdown:
    Google Search: $9,000 / $20,000 = 45% ⚠️
    Google Shopping: $5,000 / $12,000 = 42% ⚠️
    Meta: $4,500 / $15,000 = 30% 🔴
    LinkedIn: $2,500 / $8,000 = 31% 🔴
    TikTok: $0 / $5,000 = 0% 🔴 (campaigns not launched!)

  Root causes:
    - TikTok campaigns were approved but never activated → activate immediately
    - Meta: audience is too narrow (45k) → expand to 120k+
    - LinkedIn: bid too low for competitive auction → increase bid 30%
    - Google: limited by ad rank → improve Quality Score or increase bids

  Corrective plan (remaining 15 days):
    Daily target: ($60,000 - $21,000) / 15 = $2,600/day (vs current $1,400/day)
    
    Actions:
    1. Activate TikTok campaigns today (recover $5,000 in spend capacity)
    2. Increase Meta audiences + bids (target $1,000/day from $300/day)
    3. Increase LinkedIn bids by 30% (target $366/day from $166/day)
    4. Google is closest to pace — minor bid increase only

  Revised forecast: $52,000-$56,000 (87-93% utilization)
```
