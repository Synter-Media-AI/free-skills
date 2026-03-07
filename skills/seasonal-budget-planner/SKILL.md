---
name: seasonal-budget-planner
description: Holiday and seasonal budget scaling with CPM forecasting, industry seasonality indexes, and pre-season/peak/post-season strategies. Use when planning Black Friday budgets, seasonal scaling, CPM inflation forecasting, or creating seasonal campaign calendars.
---

# Seasonal Budget Planner

Plan advertising budgets around seasonal peaks and industry-specific demand cycles. Covers holiday season scaling (Black Friday, Cyber Monday, Christmas), CPM inflation forecasting, pre-season awareness ramp-up, peak conversion strategies, post-season clearance retargeting, and platform-specific seasonal features like Google Seasonality Adjustments.

## Capabilities

- **Holiday Budget Scaling**: Black Friday, Cyber Monday, Christmas, Prime Day, Back-to-School
- **Seasonal Trend Detection**: Industry-specific demand curves throughout the year
- **CPM Inflation Forecasting**: Predict cost increases during peak competition periods
- **Pre-Season → Peak → Post-Season Strategy**: Phase-based campaign planning
- **Platform Seasonal Features**: Google Seasonality Adjustments, Meta Advantage+ seasonal
- **Monthly Seasonality Index**: Data-driven budget allocation by month and industry
- **Cross-Platform Budget Coordination**: Optimize spend distribution during peak periods

## Workflows

### 1. Seasonal Campaign Planning Framework

```
Phase 1: Pre-Season (6-8 weeks before peak)
  Goal: Build audiences, establish baselines, create content
  Budget: 70-80% of normal monthly budget
  Actions:
  - Build remarketing audiences (site visitors, video viewers)
  - Launch awareness campaigns with engaging content
  - A/B test creatives to find winners for peak
  - Set up conversion tracking and verify data
  - Create audience segments: cold, warm, hot

Phase 2: Ramp-Up (2-4 weeks before peak)
  Goal: Increase visibility, warm up audiences
  Budget: 100-120% of normal monthly budget
  Actions:
  - Scale winning creatives from Phase 1
  - Increase remarketing pool with broader targeting
  - Start teaser campaigns ("Coming soon: Black Friday deals")
  - Bid up on high-intent keywords
  - Pre-load promotion extensions and ad copy

Phase 3: Peak (event period, 3-10 days)
  Goal: Maximize conversions at profitable ROAS
  Budget: 200-500% of normal daily budget
  Actions:
  - Activate all prepared campaigns simultaneously
  - Set aggressive bids (CPCs increase 50-150% during peak)
  - Focus on retargeting warm audiences (highest CVR)
  - Use countdown timers and urgency messaging
  - Monitor hourly and adjust bids in real-time
  - Deploy platform seasonal adjustments (see below)

Phase 4: Post-Season (1-4 weeks after peak)
  Goal: Capture late converters, clearance, and extend value
  Budget: 80-100% of normal monthly budget
  Actions:
  - Retarget Black Friday/Cyber Monday visitors who didn't convert
  - Promote "extended sale" or clearance items
  - Gift card and last-minute shopper campaigns
  - Shift messaging: "Still time to save" → "New year, new you"
  - Reduce bids gradually as competition subsides
```

### 2. CPM Inflation Forecasting

```
CPM multipliers by period (vs January baseline):

| Period | CPM Multiplier | Notes |
|--------|----------------|-------|
| January | 1.0x (baseline) | Post-holiday lull, cheapest month |
| February | 1.1x | Valentine's Day bump |
| March | 1.1-1.2x | End of Q1 budget flush |
| April | 1.0-1.1x | Post-Q1 reset |
| May | 1.1x | Mother's Day, spring sales |
| June | 1.0-1.2x | End of Q2, summer start |
| July | 0.9-1.1x | Amazon Prime Day spike (1 week) |
| August | 1.1-1.2x | Back-to-school |
| September | 1.2-1.3x | Fall campaigns launch |
| October | 1.3-1.5x | Halloween, pre-holiday ramp |
| November | 1.5-2.5x | Black Friday/Cyber Monday peak |
| December | 1.4-2.0x | Holiday shopping, Dec 1-20 peak |

Budget calculation:
  Normal monthly budget: $10,000
  November budget needed for same reach: $10,000 × 2.0 = $20,000
  Or accept 50% fewer impressions at $10,000

Strategy:
  - Increase budgets OR accept reduced reach during peaks
  - Shift non-urgent spend to January/April (cheapest months)
  - Front-load Black Friday campaigns to early November (lower CPMs)
```

### 3. Google Seasonality Adjustments

```
Google Ads → Tools → Bid Strategy → Advanced Controls → Seasonality Adjustments

Purpose: Tell Smart Bidding to expect a temporary conversion rate change

When to use:
  - Flash sales (1-3 days)
  - Black Friday / Cyber Monday
  - Product launches
  - Any event causing unusual conversion rate changes

How to set:
  1. Name: "Black Friday 2026 Sale"
  2. Start: 2026-11-27 00:00
  3. End: 2026-11-30 23:59
  4. Scope: All campaigns OR specific campaigns
  5. Adjustment: Expected CVR increase (e.g., +50%)
     - Conservative: +30% for general holiday
     - Moderate: +50% for major sale event
     - Aggressive: +100% for flash sale with deep discount

After the event:
  - Smart Bidding automatically reverts to normal
  - No manual cleanup needed
  - Review actual CVR vs adjustment to improve future planning

Best practices:
  - Only use for events lasting 1-7 days
  - Don't use for gradual seasonal trends (Smart Bidding learns these)
  - Set adjustment 24 hours before event starts
  - Use historical data to calibrate CVR change estimate
```

### 4. Cross-Platform Seasonal Budget Allocation

```
Scenario: $50,000 November budget for e-commerce brand

Platform allocation for Black Friday / Cyber Monday:

| Platform | Budget | Role | Why |
|----------|--------|------|-----|
| Google Search | $17,500 (35%) | Capture high-intent queries | People search for deals |
| Google Shopping | $10,000 (20%) | Product-level visibility | Product comparisons peak |
| Meta (FB/IG) | $12,500 (25%) | Awareness + retargeting | Visual deal promotion |
| TikTok | $2,500 (5%) | Young demo, viral creative | Trend-based discovery |
| Reddit | $2,500 (5%) | Niche communities | Deal-hunting subreddits |
| LinkedIn | $0 (0%) | Pause during B2C peak | B2B decision-makers on vacation |
| Retargeting (all) | $5,000 (10%) | Convert warm audiences | Highest ROAS during sale |

Timeline:
  Nov 1-20: 30% of budget → awareness, audience building
  Nov 21-26: 15% of budget → ramp-up, teaser campaigns
  Nov 27-30 (BFCM): 40% of budget → peak conversion push
  Dec 1-7: 15% of budget → extended sale, late converters
```

## Reference Data

### Monthly Seasonality Index by Industry

Scale: 100 = average month. Higher = more demand. Based on Google Trends and ad auction data.

| Month | E-commerce | B2B SaaS | Travel | Health/Fitness | Education | Real Estate | Financial Services |
|-------|------------|----------|--------|----------------|-----------|-------------|-------------------|
| Jan | 75 | 110 | 85 | 140 | 115 | 80 | 120 |
| Feb | 80 | 105 | 90 | 125 | 100 | 85 | 110 |
| Mar | 85 | 110 | 100 | 110 | 95 | 95 | 115 |
| Apr | 85 | 100 | 110 | 100 | 90 | 105 | 105 |
| May | 90 | 95 | 115 | 95 | 85 | 110 | 100 |
| Jun | 85 | 90 | 120 | 90 | 80 | 115 | 95 |
| Jul | 80 | 85 | 115 | 85 | 80 | 110 | 90 |
| Aug | 95 | 90 | 105 | 90 | 120 | 105 | 95 |
| Sep | 100 | 115 | 95 | 105 | 130 | 100 | 100 |
| Oct | 110 | 110 | 85 | 100 | 110 | 95 | 105 |
| Nov | 145 | 105 | 75 | 95 | 90 | 85 | 110 |
| Dec | 140 | 80 | 80 | 80 | 70 | 75 | 95 |

**How to use:** Multiply baseline monthly budget by (index / 100).
Example: $10,000/mo baseline × (145/100) = $14,500 November budget for e-commerce.

### Key Retail Shopping Events

| Event | Typical Dates | CPM Impact | Best For |
|-------|---------------|------------|----------|
| Super Bowl | Early February | +20-30% (sports/F&B) | CPG, food, entertainment |
| Valentine's Day | Feb 10-14 | +15-25% (gifts) | Jewelry, flowers, dining |
| Easter | March/April | +10-15% | Apparel, home, food |
| Mother's Day | May (2nd Sunday) | +20-30% (gifts) | Jewelry, flowers, experiences |
| Father's Day | June (3rd Sunday) | +15-20% (gifts) | Electronics, tools, apparel |
| Amazon Prime Day | July (mid-month) | +40-60% (Amazon) | Electronics, home, fashion |
| Back to School | Aug-Sep | +20-30% | Electronics, apparel, supplies |
| Halloween | Oct 20-31 | +15-25% | Costumes, candy, decor |
| Black Friday | Last Friday Nov | +80-150% | All retail |
| Cyber Monday | Monday after BF | +80-150% | Electronics, software, apparel |
| Green Monday | 2nd Monday Dec | +30-50% | All retail |
| Christmas | Dec 1-24 | +50-100% | All retail, peaks Dec 15-20 |
| Boxing Day (UK/CA/AU) | Dec 26-28 | +30-50% | Retail clearance |
| New Year's | Dec 28-Jan 2 | +20-30% | Travel, fitness, SaaS |

### B2B Seasonal Patterns

| Period | B2B Impact | Strategy |
|--------|------------|----------|
| January | Budget renewal, new fiscal year | Push annual contracts, new initiatives |
| March | Q1 deadline spending | Urgency messaging, "use it or lose it" |
| June | Mid-year reviews | ROI case studies, business value |
| September | Q4 planning, back from summer | Thought leadership, product launches |
| October-November | Budget finalization for next year | Enterprise sales push |
| December | Freeze period, low activity | Reduce spend, plan Q1 |

### Platform-Specific Seasonal Features

| Feature | Platform | Purpose |
|---------|----------|---------|
| Seasonality Adjustments | Google Ads | Tell Smart Bidding about CVR changes |
| Promotion Extensions | Google Ads | Show deal details in search ads |
| Countdown Customizers | Google Ads | "Sale ends in X days" dynamic text |
| Holiday Shopping Campaigns | Google Shopping | Automated holiday product promotion |
| Advantage+ Shopping Campaigns | Meta | Automated optimization for e-commerce |
| Holiday Campaign Templates | Meta | Pre-built campaign structures |
| Seasonal Interests | TikTok | Target users browsing seasonal content |
| Trending Topics | Reddit | Align ads with seasonal subreddit activity |

## Examples

### Example 1: Black Friday budget plan

```
User: "Plan my Black Friday/Cyber Monday ad budget. I normally spend $30,000/month."

Budget plan:
  Normal daily budget: $1,000/day
  November total budget: $45,000 (1.5x normal for seasonal demand)

  Week 1-2 (Nov 1-14): Awareness Phase
    Daily: $800/day = $11,200
    Focus: Audience building, teaser ads
    Platforms: Meta (50%), Google Display (30%), TikTok (20%)

  Week 3 (Nov 15-21): Ramp-Up Phase
    Daily: $1,200/day = $8,400
    Focus: "Black Friday preview" messaging, email capture
    Platforms: Google Search (40%), Meta (40%), Shopping (20%)

  Week 4 (Nov 22-26): Pre-Peak
    Daily: $1,500/day = $7,500
    Focus: "Deals drop Friday" countdowns
    Platforms: Google Search (35%), Meta (35%), Shopping (20%), TikTok (10%)

  BFCM (Nov 27-30): Peak — 4 days
    Daily: $3,000/day = $12,000
    Focus: Maximum conversion push
    Platforms: Google Search (30%), Shopping (25%), Meta retargeting (30%), TikTok (10%), Reddit (5%)
    Google: Set Seasonality Adjustment +60% CVR

  Post-Peak (Dec 1-7): Extended Sale
    Daily: $850/day = $5,950
    Focus: Retarget BFCM visitors, "extended sale" messaging
    Platforms: Google remarketing (40%), Meta retargeting (40%), Email (20%)

  Total November: $45,050
  Expected ROAS improvement vs flat budget: +25-35%
```

### Example 2: B2B SaaS seasonal strategy

```
User: "When should we scale and reduce our B2B ad spend throughout the year?"

Recommended monthly budget multipliers:
  Jan: 1.2x — New year budgets, decision-makers back
  Feb: 1.1x — Q1 initiatives underway
  Mar: 1.2x — Q1 deadline, "use it or lose it" messaging
  Apr: 1.0x — Post-Q1 reset, normal operations
  May: 0.9x — Pre-summer slowdown begins
  Jun: 0.8x — Conference season, reduced digital engagement
  Jul: 0.7x — Summer vacation, lowest B2B engagement
  Aug: 0.8x — Gradual return, back-to-work ramp
  Sep: 1.2x — Q4 planning begins, product launches
  Oct: 1.2x — Budget finalization, enterprise push
  Nov: 1.0x — Thanksgiving week is dead, but first 3 weeks are strong
  Dec: 0.6x — Holiday freeze, minimal activity after Dec 15

Annual savings: shift 15-20% of budget from Jul/Aug/Dec to Jan/Mar/Sep/Oct
Expected efficiency gain: +10-15% in blended CPA
```

### Example 3: CPM inflation hedge

```
User: "Our CPMs jumped 80% last November. How do we handle it this year?"

Strategies:
  1. Front-load November spend:
     Nov 1-15: 40% of monthly budget (CPMs are 1.3x, not 2.0x yet)
     Nov 16-26: 25% (CPMs rising, shift to retargeting)
     Nov 27-30: 25% (peak CPMs, but also peak CVR)
     Dec 1-7: 10% (CPMs dropping, capture late converters)

  2. Shift to lower-CPM formats:
     - Google Search (no CPM, pay per click) → increase Search budget 50%
     - Email marketing → $0 CPM, deploy to full subscriber list
     - Reddit → 30-50% cheaper CPMs than Meta during BFCM

  3. Audience quality over quantity:
     - Narrow to retargeting audiences (2-5x higher CVR)
     - Suppress non-converters (>3 visits, no purchase → exclude)
     - Focus on lookalikes of purchasers (not just visitors)

  4. Creative optimization:
     - Use top-performing creatives only (no testing during peak)
     - Add urgency elements (countdown, limited stock)
     - Larger discount = higher CVR, offsets higher CPM

  Expected result: Same ROAS as last year with 80% CPM inflation,
  by improving audience targeting and shifting to cost-efficient channels.
```
