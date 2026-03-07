---
name: negative-keyword-miner
description: Mine, categorize, and manage negative keywords from search term reports. Use when analyzing search queries, building negative keyword lists, detecting match type bleeding, or resolving cross-campaign keyword conflicts.
---

# Negative Keyword Miner

Systematic approach to extracting, categorizing, and managing negative keywords across Google Ads and Microsoft Ads campaigns. Covers search term report analysis, AI-assisted categorization, match type strategy, shared lists, cross-campaign conflict detection, and industry-specific templates.

## Capabilities

1. **Search Term Report Analysis** - Pull and analyze search queries that triggered ads
2. **AI Categorization** - Automatically classify irrelevant queries by category
3. **Match Type Analysis** - Detect broad match bleeding and close variant issues
4. **Negative List Management** - Build campaign-level and shared negative keyword lists
5. **Cross-Campaign Conflict Detection** - Find negatives that block desired traffic
6. **Industry Templates** - Pre-built negative keyword lists by industry vertical

## Workflows

### Workflow 1: Search Term Report Mining

**Step 1: Pull search term report via GAQL**

```sql
SELECT
  search_term_view.search_term,
  campaign.name,
  ad_group.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value,
  search_term_view.status
FROM search_term_view
WHERE
  segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 0
ORDER BY metrics.cost_micros DESC
```

**Step 2: Calculate efficiency metrics**

For each search term:
```
CPA = Cost / Conversions
ROAS = Conversion Value / Cost
Waste Score = Cost × (1 - Conversion Rate / Campaign Avg Conversion Rate)
```

**Step 3: Flag candidates for negatives**

| Criteria | Threshold | Priority |
|----------|-----------|----------|
| High spend, zero conversions | Cost > 2× CPA target, 0 conversions | Critical |
| Very low CTR | CTR < 0.5% with 100+ impressions | High |
| High CPA | CPA > 3× target | High |
| Irrelevant intent | Contains job/free/DIY terms | Medium |
| Competitor terms (unintentional) | Contains competitor brand names | Medium |
| Informational queries | Contains "what is", "how to" | Low-Medium |

**Step 4: Categorize flagged terms**

Group into categories for systematic addition:

| Category | Examples | Negative Match Type |
|----------|----------|-------------------|
| Job seekers | "marketing manager jobs", "hiring ads" | Phrase: "jobs", "careers", "hiring", "salary" |
| Free seekers | "free ad maker", "free templates" | Phrase: "free" |
| DIY/Education | "how to make ads", "ad tutorial" | Phrase: "how to", "tutorial", "course" |
| Wrong product | "TV ads" when selling digital ads | Exact: [TV ads], [television advertising] |
| Wrong location | "ads agency london" for US business | Phrase: "london", "uk" |
| Competitor | "hubspot ads tool" | Exact: [hubspot], [competitor name] |

### Workflow 2: Broad Match Bleeding Analysis

**What is broad match bleeding?**
Broad match keywords trigger on loosely related searches that waste budget. This has intensified with Google's expanded close variants and broad match modifier deprecation.

**Step 1: Identify broad match keywords**

```sql
SELECT
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  campaign.name,
  ad_group.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE
  ad_group_criterion.keyword.match_type = 'BROAD'
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
```

**Step 2: Cross-reference with search terms**

For each broad match keyword, compare triggered search terms:

```
Broad Keyword: "running shoes"
Search Terms Triggered:
  ✅ "buy running shoes online" — relevant
  ✅ "best running shoes 2026" — relevant
  ⚠️ "running shoe repair near me" — tangential
  ❌ "running shoes drawing" — irrelevant
  ❌ "free running shoes giveaway" — irrelevant
  ❌ "running shoe factory jobs" — irrelevant
```

**Step 3: Calculate bleed rate**

```
Bleed Rate = Irrelevant Search Term Impressions / Total Search Term Impressions × 100

Interpretation:
  < 10%: Healthy — normal broad match behavior
  10-25%: Moderate — add negatives for top offenders
  25-50%: Severe — consider switching to phrase match
  > 50%: Critical — switch to exact match or pause keyword
```

**Step 4: Remediation decision matrix**

| Bleed Rate | Conversion Rate | Action |
|------------|-----------------|--------|
| < 10% | Above avg | Keep broad, monitor |
| < 10% | Below avg | Add negatives, monitor |
| 10-25% | Above avg | Add negatives, keep broad |
| 10-25% | Below avg | Switch to phrase match |
| 25-50% | Any | Switch to phrase match + negatives |
| > 50% | Any | Switch to exact match |

### Workflow 3: Negative Keyword List Management

**Campaign-level vs Shared lists:**

| Type | Use When | Pros | Cons |
|------|----------|------|------|
| Campaign-level | Specific to one campaign's theme | Precise control | Hard to maintain at scale |
| Shared list | Applies across multiple campaigns | Centralized management | May over-block niche campaigns |
| Account-level | Universal exclusions | One place for all | No exceptions per campaign |

**Recommended list structure:**

```
Shared List: "Universal Negatives"
  → Apply to ALL campaigns
  → Contains: jobs, careers, salary, free, cheap, DIY, tutorial, wiki

Shared List: "Competitor Brands"
  → Apply to non-competitor campaigns
  → Contains: exact match competitor brand names

Shared List: "Geographic Exclusions"
  → Apply to geo-targeted campaigns
  → Contains: irrelevant cities, countries, regions

Campaign-Level:
  → Campaign "Running Shoes" excludes: "basketball", "hiking", "dress shoes"
  → Campaign "Running Apparel" excludes: "shoes", "sneakers"
```

**Managing list size:**
- Google Ads limit: 5,000 negative keywords per list
- Google Ads limit: 20 shared lists per account
- Campaign-level limit: 10,000 negative keywords per campaign
- Practical recommendation: Keep each list under 1,000 terms

### Workflow 4: Cross-Campaign Conflict Detection

**What is a negative keyword conflict?**
A negative keyword in Campaign A blocks a search query that Campaign B is actively bidding on. This causes lost traffic.

**Step 1: Export all keywords and negatives**

```sql
-- Active keywords
SELECT
  campaign.name AS campaign,
  ad_group.name AS ad_group,
  ad_group_criterion.keyword.text AS keyword,
  ad_group_criterion.keyword.match_type AS match_type,
  'POSITIVE' AS polarity
FROM keyword_view
WHERE ad_group_criterion.status = 'ENABLED'

-- Negative keywords
SELECT
  campaign.name AS campaign,
  '' AS ad_group,
  campaign_criterion.keyword.text AS keyword,
  campaign_criterion.keyword.match_type AS match_type,
  'NEGATIVE' AS polarity
FROM campaign_criterion
WHERE campaign_criterion.type = 'KEYWORD'
  AND campaign_criterion.negative = TRUE
```

**Step 2: Cross-reference for conflicts**

For each negative keyword, check if it would block a positive keyword:

| Conflict Type | Example | Severity |
|---------------|---------|----------|
| Exact vs Exact | Neg: [blue shoes] blocks Positive: [blue shoes] | Critical |
| Phrase vs Exact | Neg: "blue shoes" blocks Positive: [buy blue shoes] | High |
| Broad neg vs Phrase pos | Neg: blue shoes blocks Positive: "blue running shoes" | Medium |
| Shared list vs campaign | List neg blocks campaign positive | Variable |

**Step 3: Resolution**

1. Remove the conflicting negative
2. Add the negative as campaign-level instead of shared
3. Use exact match negatives to be more precise
4. Move the positive keyword to the campaign with the negative to consolidate

### Workflow 5: Automated Negative Mining Cadence

**Weekly routine:**

| Day | Task | Time |
|-----|------|------|
| Monday | Pull 7-day search term report | 15 min |
| Monday | Flag high-spend zero-conversion terms | 10 min |
| Monday | Add critical negatives immediately | 10 min |
| Thursday | Review moderate-priority candidates | 15 min |
| Thursday | Check for cross-campaign conflicts | 10 min |
| Friday | Update shared negative lists | 10 min |

**Monthly routine:**
- Full 30-day search term analysis
- Broad match bleed rate calculation
- Shared list audit (remove overly aggressive negatives)
- Cross-campaign conflict resolution

## Negative Keyword Match Types

### How Negative Match Types Work (Different from Positive)

| Negative Type | Blocks | Does NOT Block |
|---------------|--------|----------------|
| Broad (default) | Queries containing ALL negative words (any order) | Queries with only some of the words |
| Phrase | Queries containing negative words in exact order | Queries with words between or rearranged |
| Exact | Only the exact query | All other variations |

**Critical difference from positive match types:**
- Negative broad match does NOT include close variants, synonyms, or related searches
- Negative keywords don't match plurals, misspellings, or similar terms
- You must add each variation explicitly

**Example:**

Negative broad match: `running shoes`
- ❌ Blocks: "running shoes", "shoes running", "red running shoes"
- ✅ Still shows: "running", "shoes", "run shoe", "running sneakers"

Negative phrase match: `"running shoes"`
- ❌ Blocks: "buy running shoes", "running shoes sale"
- ✅ Still shows: "shoes for running", "running shoe"

Negative exact match: `[running shoes]`
- ❌ Blocks: "running shoes" only
- ✅ Still shows: "buy running shoes", "running shoes sale"

## Industry Negative Keyword Templates

### E-Commerce (General)

```
Broad negatives: free, cheap, used, refurbished, wholesale, bulk, diy, 
  repair, fix, manual, instructions, jobs, careers, salary, hiring,
  review, reviews, reddit, forum, comparison, vs, alternative

Phrase negatives: "how to make", "how to build", "how to fix",
  "near me" (if online only), "open box", "second hand"

Exact negatives: [ebay], [amazon], [walmart], [alibaba], [craigslist]
```

### SaaS / B2B Software

```
Broad negatives: free, open source, template, tutorial, course,
  certification, training, salary, jobs, intern, internship,
  download, crack, pirated, github, stackoverflow

Phrase negatives: "what is", "how to use", "definition of",
  "vs", "alternative to", "open source", "free trial expired"

Exact negatives: [competitor names as exact match]
```

### Local Services (Plumbing, HVAC, Legal)

```
Broad negatives: diy, tutorial, youtube, jobs, careers, salary,
  hiring, school, certification, course, training, license,
  requirements, exam, practice test

Phrase negatives: "how to fix", "how to install", "how to repair",
  "near me" (for excluded cities), "DIY guide"

Exact negatives: [cities you don't serve], [states you don't serve]
```

### Healthcare / Medical

```
Broad negatives: jobs, careers, salary, nursing, school, degree,
  certification, free, symptoms, wiki, wikipedia, webmd, mayo clinic,
  home remedy, natural cure, reddit

Phrase negatives: "how to become", "medical school", "nursing program",
  "is it normal", "home treatment"

Exact negatives: [competitor names], [irrelevant specialties]
```

### Financial Services

```
Broad negatives: free, jobs, careers, salary, scam, fraud, complaint,
  reddit, review, lawsuit, class action, calculator, formula, excel,
  template, worksheet

Phrase negatives: "how to calculate", "what is the formula",
  "free calculator", "excel template", "is it a scam"

Exact negatives: [competitor names], [irrelevant product types]
```

### Real Estate

```
Broad negatives: jobs, careers, salary, license, exam, course,
  school, training, zillow, trulia, realtor.com, free, craigslist,
  for rent (if selling), for sale (if renting)

Phrase negatives: "how to become", "real estate school",
  "real estate license", "average salary"

Exact negatives: [cities not served], [competitor agent names]
```

## Reference Data

### Negative Keyword Impact on Performance

Typical improvements after systematic negative keyword mining:

| Metric | Before | After (30 days) | Improvement |
|--------|--------|-----------------|-------------|
| CTR | 3.2% | 4.8% | +50% |
| CPC | $2.40 | $1.95 | -19% |
| Conversion Rate | 2.1% | 3.4% | +62% |
| CPA | $114 | $57 | -50% |
| Wasted Spend | 25% | 8% | -68% |
| Quality Score (avg) | 5.2 | 6.8 | +31% |

### Budget Waste Benchmarks

| Account Maturity | Typical Waste % | Target Waste % |
|-----------------|-----------------|----------------|
| New (0-3 months) | 25-40% | < 20% |
| Established (3-12 months) | 15-25% | < 10% |
| Mature (12+ months) | 8-15% | < 5% |
| Well-optimized | 3-8% | < 3% |

## Examples

### Example 1: SaaS Company Search Term Audit

**Scenario:** B2B SaaS spending $30K/month on Google Ads. CPA target: $80. Actual CPA: $135.

**Analysis of 30-day search term report (2,400 unique terms):**

| Category | Terms | Cost | Conversions | CPA | Action |
|----------|-------|------|-------------|-----|--------|
| High intent | 480 | $12,000 | 210 | $57 | Keep |
| Mid intent | 620 | $8,000 | 48 | $167 | Optimize |
| Informational | 540 | $5,500 | 8 | $688 | Add negatives |
| Job seekers | 180 | $2,000 | 0 | ∞ | Add negatives |
| Competitor | 320 | $1,800 | 5 | $360 | Move to competitor campaign |
| Irrelevant | 260 | $700 | 0 | ∞ | Add negatives |

**Negatives added:** 145 terms across 6 categories
**Projected savings:** $8,200/month (27% of spend)
**Projected new CPA:** $80 (hitting target)

### Example 2: E-commerce Broad Match Bleeding Fix

**Scenario:** Online shoe store, keyword "running shoes" on broad match.

**Bleed analysis:**
- Total search term impressions: 45,000
- Relevant impressions: 28,000 (62%)
- Irrelevant impressions: 17,000 (38%) ← Severe bleed

**Top bleed categories:**
1. "running shoes drawing" (art related) — 4,200 impressions, 0 conversions
2. "running shoes for flat feet" (medical) — 3,100 impressions, 2 conversions (acceptable)
3. "free running shoes" — 2,800 impressions, 0 conversions
4. "running shoes factory outlet near me" — 2,400 impressions, 0 conversions (online only)
5. "running shoes repair" — 1,900 impressions, 0 conversions

**Actions:**
1. Added negatives: drawing, free, repair, factory outlet, near me
2. Kept "flat feet" (relevant variation)
3. Moved keyword from broad to phrase match
4. Bleed rate dropped from 38% to 11% in 2 weeks

### Example 3: Cross-Campaign Conflict Resolution

**Scenario:** 3 campaigns competing with conflicting negatives.

**Conflict found:**
- Campaign "Brand" has negative phrase: "reviews"
- Campaign "Non-Brand" bids on keyword: "product name reviews"
- Result: "product name reviews" blocked everywhere (Brand neg + Non-Brand doesn't target it)

**Resolution:**
1. Changed Brand campaign negative from phrase to exact: [reviews]
2. Now "product name reviews" routes to Non-Brand campaign correctly
3. Impressions for review-related queries increased 340%
4. Added 12 high-intent review queries to Non-Brand campaign
