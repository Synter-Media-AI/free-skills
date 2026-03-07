---
name: google-ads-quality-score
description: Analyze and improve Google Ads Quality Score components. Use when diagnosing high CPCs, improving Ad Rank, analyzing Expected CTR, Ad Relevance, and Landing Page Experience, or benchmarking QS by industry.
---

# Google Ads Quality Score Optimizer

Deep-dive into Google Ads Quality Score (QS) mechanics, component analysis, improvement playbooks, historical tracking, and impact on CPC and Ad Rank. Includes GAQL queries, industry benchmarks, and actionable optimization workflows.

## Capabilities

1. **QS Component Analysis** - Break down Expected CTR, Ad Relevance, and Landing Page Experience
2. **Improvement Playbooks** - Step-by-step guides for each QS component
3. **Historical QS Tracking** - Methodology for tracking QS changes over time
4. **CPC and Ad Rank Impact** - Quantify the financial impact of QS changes
5. **GAQL Queries** - Ready-to-use queries for QS analysis
6. **Industry Benchmarks** - QS benchmarks by vertical for goal-setting

## Quality Score Fundamentals

### What is Quality Score?

Quality Score is a 1-10 diagnostic metric that estimates the quality of your ads, keywords, and landing pages. It's calculated at the keyword level and composed of three sub-components.

**Important:** QS is a diagnostic tool, not a direct input to the auction. The actual auction uses real-time signals that are more granular than the 1-10 QS score.

### The Three Components

| Component | Weight (est.) | What It Measures | Data Source |
|-----------|---------------|------------------|-------------|
| Expected CTR | ~39% | Likelihood of ad being clicked | Historical CTR, adjusted for position |
| Ad Relevance | ~22% | How well ad matches search intent | Keyword-to-ad text relevance |
| Landing Page Experience | ~39% | Post-click user experience | Page speed, content relevance, navigation |

Each component is rated: **Above Average**, **Average**, or **Below Average**

### QS to Component Mapping (Approximate)

| QS | Expected CTR | Ad Relevance | Landing Page |
|----|-------------|--------------|-------------|
| 10 | Above Avg | Above Avg | Above Avg |
| 9 | Above Avg | Above Avg | Average |
| 8 | Above Avg | Average | Above Avg |
| 7 | Average | Above Avg | Above Avg |
| 7 | Above Avg | Above Avg | Below Avg |
| 6 | Average | Average | Above Avg |
| 6 | Above Avg | Average | Average |
| 5 | Average | Average | Average |
| 4 | Average | Below Avg | Average |
| 4 | Below Avg | Average | Average |
| 3 | Below Avg | Below Avg | Average |
| 3 | Average | Average | Below Avg |
| 2 | Below Avg | Below Avg | Below Avg |
| 1 | Below Avg | Below Avg | Below Avg |

## QS Impact on CPC and Ad Rank

### Ad Rank Formula

```
Ad Rank = Max CPC Bid × Quality Score × Expected Impact of Extensions

Simplified for QS analysis:
Ad Rank ≈ Bid × QS
```

### Actual CPC Formula

```
Actual CPC = (Ad Rank of advertiser below you / Your Quality Score) + $0.01
```

### QS Impact on CPC (Relative to QS 5 Baseline)

| Quality Score | CPC Modifier | CPC Impact |
|---------------|-------------|------------|
| 1 | +400% | Pay 5× more |
| 2 | +150% | Pay 2.5× more |
| 3 | +67% | Pay 1.67× more |
| 4 | +25% | Pay 1.25× more |
| 5 | Baseline | Normal CPC |
| 6 | -17% | Save 17% |
| 7 | -29% | Save 29% |
| 8 | -38% | Save 38% |
| 9 | -44% | Save 44% |
| 10 | -50% | Save 50% |

### Financial Impact Example

```
Current state:
  Keywords: 500
  Avg QS: 5.2
  Monthly spend: $50,000
  Avg CPC: $3.20
  Clicks: 15,625

If improved to Avg QS 7.0:
  CPC reduction: ~29%
  New CPC: $2.27
  Same spend → 22,026 clicks (+41%)
  OR same clicks → $35,500 spend (-29%, saving $14,500/month)
```

## GAQL Queries for QS Analysis

### Query 1: Current QS Overview

```sql
SELECT
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.creative_quality_score,
  ad_group_criterion.quality_info.post_click_quality_score,
  ad_group_criterion.quality_info.search_predicted_ctr,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE
  ad_group_criterion.status = 'ENABLED'
  AND campaign.status = 'ENABLED'
  AND ad_group.status = 'ENABLED'
  AND metrics.impressions > 100
  AND segments.date DURING LAST_30_DAYS
ORDER BY ad_group_criterion.quality_info.quality_score ASC
```

### Query 2: QS Distribution

```sql
SELECT
  ad_group_criterion.quality_info.quality_score,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE
  ad_group_criterion.status = 'ENABLED'
  AND campaign.status = 'ENABLED'
  AND metrics.impressions > 0
  AND segments.date DURING LAST_30_DAYS
```

### Query 3: Below-Average Components (Priority Fixes)

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.search_predicted_ctr,
  ad_group_criterion.quality_info.creative_quality_score,
  ad_group_criterion.quality_info.post_click_quality_score,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE
  ad_group_criterion.status = 'ENABLED'
  AND (
    ad_group_criterion.quality_info.search_predicted_ctr = 'BELOW_AVERAGE'
    OR ad_group_criterion.quality_info.creative_quality_score = 'BELOW_AVERAGE'
    OR ad_group_criterion.quality_info.post_click_quality_score = 'BELOW_AVERAGE'
  )
  AND metrics.impressions > 50
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
```

### Query 4: High-Spend Low-QS Keywords (Biggest Savings)

```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.quality_info.quality_score,
  metrics.cost_micros,
  metrics.impressions,
  metrics.clicks,
  metrics.conversions,
  metrics.average_cpc
FROM keyword_view
WHERE
  ad_group_criterion.status = 'ENABLED'
  AND ad_group_criterion.quality_info.quality_score < 5
  AND metrics.cost_micros > 100000000
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
LIMIT 50
```

### Query 5: Historical QS (Using change events)

```sql
SELECT
  change_event.change_date_time,
  change_event.change_resource_type,
  change_event.old_resource,
  change_event.new_resource,
  change_event.changed_fields
FROM change_event
WHERE
  change_event.change_resource_type = 'AD_GROUP_CRITERION'
  AND change_event.change_date_time DURING LAST_30_DAYS
ORDER BY change_event.change_date_time DESC
LIMIT 1000
```

## Improvement Playbooks

### Playbook 1: Expected CTR (Below Average → Above Average)

**Root cause:** Your ads get clicked less often than competitors for the same queries.

**Step 1: Analyze current ad copy**
- Pull all active RSA headlines and descriptions
- Compare to top competitors (use Ad Preview tool)
- Look for missing elements: numbers, urgency, CTAs, unique value props

**Step 2: Headline optimization**

Winning headline patterns:
```
[Number] + [Benefit]: "Save 40% on Enterprise Plans"
[Urgency] + [Action]: "Limited Time — Start Free Trial"
[Social Proof]: "Trusted by 50,000+ Companies"
[Direct Answer]: "Fast Business Insurance Quotes"
[Differentiation]: "No Contracts, Cancel Anytime"
```

**Step 3: Improve ad extensions**

| Extension | CTR Impact | Priority |
|-----------|-----------|----------|
| Sitelinks (4+) | +10-20% CTR | Critical |
| Callouts (4+) | +5-10% CTR | High |
| Structured snippets | +3-8% CTR | High |
| Call extension | +5-15% CTR (mobile) | High (if phone business) |
| Price extensions | +5-10% CTR | Medium |
| Image extensions | +10-15% CTR | High |
| Lead form | Variable | Test for lead gen |

**Step 4: Match type alignment**
- Exact match keywords should have highly specific ads
- Phrase match should have ads covering the concept
- Broad match should use responsive search ads with maximum headlines

**Step 5: RSA pin strategy**
- Pin your best-performing headline to Position 1
- Pin brand name headline to Position 2 or 3
- Don't pin descriptions (let Google optimize)
- Monitor "Ad strength" indicator (aim for "Good" or "Excellent")

**Timeline:** 2-4 weeks to see Expected CTR improvement after changes.

### Playbook 2: Ad Relevance (Below Average → Above Average)

**Root cause:** Your ad text doesn't closely match the search intent of the keyword.

**Step 1: Audit keyword-to-ad alignment**

For each Below Average keyword:
1. Read the keyword
2. Read all headlines in the ad group's RSAs
3. Ask: "Does ANY headline contain this keyword or a close synonym?"

**Step 2: Restructure ad groups**

Tightly themed ad groups (STAG method):
```
Bad structure:
  Ad Group: "Shoes"
  Keywords: running shoes, dress shoes, hiking boots, sandals
  → Single ad can't be relevant to all of these

Good structure:
  Ad Group: "Running Shoes"
  Keywords: running shoes, buy running shoes, best running shoes
  Ad: Headlines include "Running Shoes" prominently

  Ad Group: "Dress Shoes"
  Keywords: dress shoes, formal shoes, men's dress shoes
  Ad: Headlines include "Dress Shoes" prominently
```

**Step 3: Keyword insertion (use sparingly)**
```
Headline: {KeyWord:Quality Shoes}
```
This dynamically inserts the user's search term into the headline.
Use only when keyword grouping is tight. Avoid for brand-sensitive contexts.

**Step 4: RSA headline variety with keyword focus**
- Include the primary keyword verbatim in 2-3 headlines
- Include synonyms and related terms in 3-4 more headlines
- Include unique value props in remaining headlines
- Each headline should be distinct (no near-duplicates)

**Timeline:** 1-2 weeks for Ad Relevance to update after restructuring.

### Playbook 3: Landing Page Experience (Below Average → Above Average)

**Root cause:** Your landing page doesn't meet user expectations after clicking the ad.

**Step 1: Page speed audit**

| Metric | Target | Tool |
|--------|--------|------|
| Largest Contentful Paint (LCP) | < 2.5s | PageSpeed Insights |
| First Input Delay (FID) | < 100ms | PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Time to First Byte (TTFB) | < 800ms | WebPageTest |
| Mobile speed score | > 50 | PageSpeed Insights |

**Step 2: Content relevance**
- Page headline must match ad headline closely
- Keywords from the ad group should appear in the page content
- The page should deliver on the ad's promise immediately (above the fold)
- Remove interstitials, pop-ups, and distractions

**Step 3: Mobile experience**
- Responsive design (no horizontal scrolling)
- Touch-friendly buttons (min 48×48px)
- Readable text without zooming (16px+ body font)
- Fast-loading images (WebP, lazy loading)

**Step 4: Trust signals**
- SSL certificate (HTTPS required)
- Privacy policy and terms of service links
- Contact information visible
- Social proof (reviews, testimonials, logos)
- Secure payment badges (if e-commerce)

**Step 5: Navigation and transparency**
- Clear navigation structure
- Easy-to-find contact information
- Transparent pricing (no hidden fees)
- Clear return/refund policy

**Timeline:** 4-8 weeks for Landing Page Experience to update (Google re-crawls landing pages periodically).

## Historical QS Tracking Methodology

### Why Track QS Over Time?

Google doesn't provide historical QS reports. You must build your own tracking system.

### Method: Weekly QS Snapshot

1. **Every Monday**, run GAQL Query 1 (Current QS Overview)
2. Store results in a spreadsheet or database with columns:
   - Date, Campaign, Ad Group, Keyword, QS, Expected CTR, Ad Relevance, LP Experience, Impressions, Cost
3. Calculate weekly aggregates:
   - Impression-weighted avg QS = Σ(QS_i × Impressions_i) / Σ(Impressions_i)
   - % of keywords with QS ≥ 7
   - % of spend on QS ≥ 7 keywords

### Key Tracking Metrics

| Metric | Target | Calculation |
|--------|--------|-------------|
| Impression-weighted QS | ≥ 7.0 | Σ(QS × Impr) / Σ(Impr) |
| % keywords QS ≥ 7 | > 60% | Count(QS ≥ 7) / Total keywords |
| % spend on QS ≥ 7 | > 75% | Spend(QS ≥ 7) / Total spend |
| % keywords QS ≤ 3 | < 5% | Count(QS ≤ 3) / Total keywords |
| QS improvement rate | Positive trend | Week-over-week change |

## Industry Benchmarks

### Average Quality Score by Industry

| Industry | Avg QS | Expected CTR (% Above) | Ad Relevance (% Above) | LP (% Above) |
|----------|--------|------------------------|------------------------|---------------|
| E-commerce | 6.5 | 45% | 55% | 40% |
| SaaS / Technology | 6.8 | 50% | 60% | 50% |
| Finance / Insurance | 5.8 | 35% | 45% | 35% |
| Healthcare | 6.2 | 40% | 50% | 40% |
| Legal | 5.5 | 30% | 40% | 30% |
| Real Estate | 6.0 | 40% | 45% | 35% |
| Education | 6.7 | 48% | 55% | 50% |
| Travel | 6.3 | 42% | 50% | 45% |
| Local Services | 6.1 | 38% | 48% | 38% |
| B2B Services | 6.4 | 42% | 52% | 42% |

### QS Targets by Keyword Type

| Keyword Type | Target QS | Rationale |
|-------------|-----------|-----------|
| Brand keywords | 8-10 | You ARE the most relevant result |
| High-intent transactional | 7-9 | Strong ad + landing page alignment |
| Non-brand generic | 5-7 | Competitive, harder to differentiate |
| Informational long-tail | 4-6 | Often mismatched landing pages |
| Competitor keywords | 3-5 | Intentionally lower (not your brand) |

## Examples

### Example 1: High-Spend Low-QS Rescue

**Scenario:** Top 10 keywords by spend have avg QS of 4.2. Monthly spend: $25K on these keywords alone.

**Analysis:**

| Keyword | QS | eCTR | AdRel | LP | Spend/mo |
|---------|-----|------|-------|-----|----------|
| "project management software" | 4 | Below | Avg | Below | $4,200 |
| "task management tool" | 3 | Below | Below | Below | $3,800 |
| "team collaboration app" | 5 | Avg | Avg | Avg | $3,500 |
| "workflow automation" | 4 | Avg | Below | Below | $3,200 |
| ... | ... | ... | ... | ... | ... |

**Action plan:**
1. **Landing pages (LP Below × 4):** Rebuild landing pages for top keywords. Add keyword in H1, speed optimization, mobile fixes. Timeline: 2 weeks.
2. **Ad copy (eCTR Below × 3):** Add 5 new headlines per ad group with keyword in headline, add all extensions. Timeline: 1 week.
3. **Ad groups (AdRel Below × 3):** Split "task management" and "workflow" into separate ad groups with tailored ads. Timeline: 1 week.

**Projected impact (6-8 weeks):**
- QS improvement: 4.2 → 6.5
- CPC reduction: ~25%
- Savings: ~$6,250/month
- Or: 33% more clicks for same budget

### Example 2: QS Monitoring Dashboard

**Weekly report format:**

```
Week of March 1, 2026
━━━━━━━━━━━━━━━━━━━
Overall QS: 6.4 (↑0.2 from last week)
Keywords tracked: 342

QS Distribution:
  QS 8-10: 78 keywords (23%) — $12,400 spend
  QS 6-7:  145 keywords (42%) — $22,800 spend
  QS 4-5:  89 keywords (26%) — $8,200 spend
  QS 1-3:  30 keywords (9%) — $1,600 spend

Component Health:
  Expected CTR — 55% Above Avg (↑3%)
  Ad Relevance — 62% Above Avg (↑1%)
  Landing Page — 48% Above Avg (↑5%)

Top Improvements This Week:
  "crm software" — QS 4→6 (LP fix deployed)
  "email marketing" — QS 5→7 (new ad copy)

Priority Fixes Next Week:
  "marketing automation" — QS 3, LP Below, $2,100/mo spend
  "sales pipeline" — QS 4, eCTR Below, $1,800/mo spend
```

### Example 3: Competitor Keyword QS Strategy

**Scenario:** Bidding on 50 competitor brand keywords. Avg QS: 3.1. Should we continue?

**Analysis:**
- Competitor keywords inherently have lower QS (Google prefers the brand owner)
- Expected QS range for competitor terms: 3-5
- CPC premium: 2-3× higher than non-brand generics

**Decision framework:**

| Condition | Action |
|-----------|--------|
| CPA on competitor terms < 1.5× non-brand CPA | Continue, it's profitable |
| CPA on competitor terms 1.5-2.5× non-brand CPA | Selective — keep top 10 converters |
| CPA on competitor terms > 2.5× non-brand CPA | Pause and reallocate budget |

**QS improvement for competitor keywords:**
- Use competitor comparison landing pages
- Headlines: "Better Than [Competitor]" or "[Your Brand] vs [Competitor]"
- Include comparison tables, switch-from guides
- Realistic target QS: 4-5 (not 7+)
