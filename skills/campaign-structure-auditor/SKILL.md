---
name: campaign-structure-auditor
description: Audits Google Ads account structure including ad group strategy, keyword duplication, match type distribution, and naming conventions. Use when auditing campaigns, reviewing account structure, finding duplicate keywords, or checking naming conventions.
---

# Campaign Structure Auditor

Performs comprehensive Google Ads account structure audits covering ad group strategy (SKAG vs STAG vs themed), duplicate keyword detection, match type distribution, ad group health, and naming convention enforcement. Outputs actionable recommendations with severity ratings.

## Capabilities

- **Ad Group Strategy Assessment**: Evaluate SKAG, STAG, and themed ad group approaches
- **Duplicate Keyword Detection**: Find keyword overlap across campaigns and ad groups
- **Match Type Audit**: Analyze broad, phrase, and exact match distribution
- **Ad Group Health**: Check keyword-to-ad-group ratios, empty ad groups, RSA coverage
- **Naming Convention Enforcement**: Validate campaign/ad group naming patterns
- **Quality Score Analysis**: Correlate structure issues with Quality Score impact
- **Budget Waste Identification**: Find structural causes of wasted spend

## Workflows

### 1. Full Account Structure Audit

**Step 1: Pull account inventory**

```sql
-- GAQL: Get all campaigns with status and type
SELECT
  campaign.id,
  campaign.name,
  campaign.status,
  campaign.advertising_channel_type,
  campaign_budget.amount_micros,
  metrics.cost_micros,
  metrics.impressions,
  metrics.clicks,
  metrics.conversions
FROM campaign
WHERE campaign.status != 'REMOVED'
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
```

**Step 2: Pull ad group details**

```sql
-- GAQL: Ad groups with keyword counts and performance
SELECT
  campaign.name,
  ad_group.id,
  ad_group.name,
  ad_group.status,
  ad_group.type,
  metrics.cost_micros,
  metrics.impressions,
  metrics.clicks,
  metrics.conversions,
  metrics.average_cpc
FROM ad_group
WHERE campaign.status = 'ENABLED'
  AND ad_group.status != 'REMOVED'
  AND segments.date DURING LAST_30_DAYS
```

**Step 3: Pull keyword inventory**

```sql
-- GAQL: All keywords with match types and Quality Score
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.status,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.creative_quality_score,
  ad_group_criterion.quality_info.post_click_quality_score,
  ad_group_criterion.quality_info.search_predicted_ctr,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE campaign.status = 'ENABLED'
  AND ad_group.status = 'ENABLED'
  AND ad_group_criterion.status != 'REMOVED'
  AND segments.date DURING LAST_30_DAYS
```

**Step 4: Check RSA coverage**

```sql
-- GAQL: Ads per ad group
SELECT
  campaign.name,
  ad_group.name,
  ad_group_ad.ad.type,
  ad_group_ad.ad.responsive_search_ad.headlines,
  ad_group_ad.ad.responsive_search_ad.descriptions,
  ad_group_ad.ad_strength,
  ad_group_ad.status
FROM ad_group_ad
WHERE campaign.status = 'ENABLED'
  AND ad_group.status = 'ENABLED'
  AND ad_group_ad.status != 'REMOVED'
```

### 2. Ad Group Strategy Assessment

| Strategy | Keywords/Ad Group | Best For | Risk |
|----------|-------------------|----------|------|
| SKAG (Single Keyword Ad Groups) | 1 | Maximum control, exact match focus | Over-segmentation, low volume per group |
| STAG (Single Theme Ad Groups) | 3-5 | Balanced control, theme consistency | Requires tight theme discipline |
| Themed (Broad Theme) | 5-20 | Scale, Smart Bidding compatibility | Diluted relevance, mixed intent |
| Alpha/Beta | Varies | Mining new keywords + proven performers | Complex management |

**Assessment criteria:**

```
IF keywords_per_ad_group == 1:
  strategy = "SKAG"
  IF using Smart Bidding: WARN "SKAGs limit Smart Bidding signal volume"
  IF avg_impressions_per_ad_group < 100/month: WARN "Low volume SKAGs"

IF keywords_per_ad_group BETWEEN 2 AND 7:
  strategy = "STAG"
  CHECK all keywords share semantic theme
  IF keyword themes diverge: WARN "Mixed intent in STAG"

IF keywords_per_ad_group > 15:
  strategy = "Over-stuffed"
  SEVERITY: HIGH
  RECOMMEND: Split into themed groups of 5-10
```

### 3. Duplicate Keyword Detection

**Cross-campaign duplicates (cannibalization):**

```sql
-- GAQL: Find keywords appearing in multiple campaigns
SELECT
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  campaign.name,
  ad_group.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros
FROM keyword_view
WHERE campaign.status = 'ENABLED'
  AND ad_group_criterion.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
ORDER BY ad_group_criterion.keyword.text
```

**Duplicate classification:**

| Type | Severity | Description | Action |
|------|----------|-------------|--------|
| Exact duplicate | HIGH | Same keyword, same match type, different campaigns | Remove from lower-performing campaign |
| Cross-match duplicate | MEDIUM | Same keyword, different match types, different campaigns | Ensure intentional funnel (broad→exact) |
| Near duplicate | LOW | Singular/plural or minor variants | Consolidate if same intent |
| Intentional split | INFO | Brand vs non-brand separation | Verify negative keyword coverage |

**Cannibalization impact calculation:**

```
wasted_spend = SUM(cost of losing auction participant)
cannibalization_rate = duplicate_impressions / total_impressions
IF cannibalization_rate > 15%: SEVERITY = HIGH
IF cannibalization_rate > 5%: SEVERITY = MEDIUM
```

### 4. Match Type Distribution Audit

**Recommended distribution by strategy:**

| Strategy | Exact | Phrase | Broad | Notes |
|----------|-------|--------|-------|-------|
| Conservative | 60-70% | 20-30% | 0-10% | Max control, lower reach |
| Balanced | 40-50% | 30-40% | 10-20% | Good for most accounts |
| Smart Bidding | 20-30% | 20-30% | 40-60% | Let algorithm optimize |
| Discovery | 10-20% | 20-30% | 50-70% | New account/market |

**Match type health checks:**

```
IF broad_match_pct > 50% AND NOT using_smart_bidding:
  SEVERITY: HIGH
  MESSAGE: "High broad match without Smart Bidding wastes budget"

IF exact_match_pct > 80%:
  SEVERITY: MEDIUM
  MESSAGE: "Over-reliance on exact match limits discovery"

IF phrase_match_pct < 10%:
  SEVERITY: LOW
  MESSAGE: "Phrase match underutilized for intent capture"

CHECK negative_keyword_count:
  IF broad_match_active AND negative_keywords < 50:
    SEVERITY: HIGH
    MESSAGE: "Insufficient negative keywords for broad match protection"
```

### 5. Naming Convention Enforcement

**Recommended naming pattern:**

```
Campaign: {Platform}_{Type}_{Objective}_{Geo}_{Audience}_{Date}
  Example: GADS_Search_LeadGen_US_Remarketing_2026Q1

Ad Group: {Theme}_{MatchType}_{Modifier}
  Example: CRM_Software_Exact_Desktop

Standard abbreviations:
  Platforms: GADS, META, LNKD, RDDT, MSFT, TKTK, XADS
  Types: Search, Display, PMax, DemGen, Shopping, Video
  Objectives: LeadGen, Sales, Awareness, Traffic
  Match: Exact, Phrase, Broad, BMM (legacy)
  Geo: US, UK, CA, APAC, EMEA, GLOBAL
```

**Validation rules:**

```
RULE: No spaces in campaign names (use underscores)
RULE: No special characters except underscore and hyphen
RULE: Must contain campaign type identifier
RULE: Date or quarter suffix recommended
RULE: Max 100 characters
RULE: Consistent casing (Title_Case or lowercase)
```

### 6. Empty Ad Group Detection

```sql
-- GAQL: Find ad groups with no enabled keywords
SELECT
  campaign.name,
  ad_group.name,
  ad_group.status,
  ad_group.id
FROM ad_group
WHERE campaign.status = 'ENABLED'
  AND ad_group.status = 'ENABLED'
  AND metrics.impressions = 0
  AND segments.date DURING LAST_90_DAYS
```

```sql
-- GAQL: Find ad groups with no enabled ads
SELECT
  campaign.name,
  ad_group.name,
  ad_group.id
FROM ad_group
WHERE campaign.status = 'ENABLED'
  AND ad_group.status = 'ENABLED'
  AND ad_group.id NOT IN (
    SELECT ad_group.id FROM ad_group_ad
    WHERE ad_group_ad.status = 'ENABLED'
  )
```

## Reference Data

### Quality Score Impact by Structure Issue

| Issue | Avg QS Impact | CPC Impact | Recommended Fix |
|-------|---------------|------------|-----------------|
| Keyword-ad mismatch | -2 to -3 | +30-50% | Align ad copy to keyword theme |
| Too many keywords per group | -1 to -2 | +15-25% | Split into themed groups |
| Missing ad extensions | -1 | +10-15% | Add sitelinks, callouts, snippets |
| Low RSA asset count | -1 | +10-20% | Add 10+ headlines, 4 descriptions |
| No negative keywords | 0 (indirect) | +20-40% wasted | Build negative keyword lists |

### Ad Group Health Scorecard

| Metric | Good | Acceptable | Poor |
|--------|------|------------|------|
| Keywords per ad group | 3-10 | 11-20 | 20+ or 0 |
| RSAs per ad group | 2-3 | 1 | 0 |
| Headlines per RSA | 10-15 | 8-9 | <8 |
| Descriptions per RSA | 4 | 3 | <3 |
| Ad strength | Excellent/Good | Average | Poor/No ads |
| Negative keywords | 50+ per campaign | 20-49 | <20 |

## Examples

### Example: Full Audit Report Output

```markdown
# Account Structure Audit Report
**Account:** Acme Corp (ID: 123-456-7890)
**Date:** 2026-03-06
**Period:** Last 30 Days

## Summary
- 🔴 3 Critical Issues
- 🟡 5 Warnings
- 🟢 12 Passed Checks

## Critical Issues

### 1. Keyword Cannibalization (HIGH)
- "crm software" appears in 4 campaigns (Brand, Non-Brand, Competitor, Remarketing)
- Estimated wasted spend: $2,340/month
- **Fix:** Consolidate to single campaign, use audience targeting for segmentation

### 2. Empty Ad Groups (HIGH)
- 14 enabled ad groups have 0 impressions in 90 days
- **Fix:** Pause or remove: [list of ad groups]

### 3. Missing RSAs (HIGH)
- 8 ad groups have 0 enabled responsive search ads
- **Fix:** Create RSAs with 10+ headlines and 4 descriptions

## Warnings

### 1. Match Type Imbalance
- Current: 72% Broad, 18% Phrase, 10% Exact
- Using manual CPC (not Smart Bidding)
- **Recommendation:** Shift to 40% Exact, 35% Phrase, 25% Broad
  OR enable Target CPA bidding

### 2. Naming Inconsistency
- 6 campaigns use spaces, 4 use underscores, 2 use hyphens
- **Fix:** Standardize to underscore format
```
