---
name: campaign-preflight
description: Runs pre-flight checks on ad campaigns before launching. Use when creating campaigns, reviewing campaign settings, or before enabling paused campaigns. Checks geo targeting, exclusion lists, tracking setup, and budget settings.
---

# Campaign Pre-Flight Checks

Ensures campaigns are properly configured before launch to prevent wasted ad spend and spam traffic.

## When to Use

- Before enabling any paused campaign
- After creating a new campaign
- When user asks to "review" or "check" campaign settings
- When user mentions geo targeting or exclusions

## Pre-Flight Checklist

### 0. Campaign Structure Validation (CRITICAL)

**Run structural validation FIRST before any other checks.** This ensures the campaign has all required components to actually serve ads.

#### Platform-Specific Validators

| Platform | Script | Checks |
|----------|--------|--------|
| Google | `google_ads_validate_campaign_structure` | Ad groups, ads, keywords (Search), budget, conversion tracking |
| Meta | `meta_ads_validate_campaign_structure` | Ad sets, ads, targeting, budget, pixel |
| LinkedIn | `linkedin_ads_validate_campaign_structure` | Creatives, approval status, targeting, budget, insight tag |
| Reddit | `reddit_ads_validate_campaign_structure` | Ad groups, ads, targeting, budget, pixel |
| Microsoft | `microsoft_ads_validate_campaign_structure` | Ad groups, ads, keywords (Search), budget, UET tag |
| TikTok | `tiktok_ads_validate_campaign_structure` | Ad groups, ads, targeting, budget, pixel |
| X | `x_ads_validate_campaign_structure` | Line items, promoted tweets, targeting, budget, funding |

#### Run Structure Validation
```bash
POST /tools/run
{
  "script_name": "google_ads_validate_campaign_structure",
  "platform": "GOOGLE",
  "args": ["--campaign-id", "customers/123/campaigns/456"],
  "user_id": <USER_ID>
}
```

#### Output
```json
{
  "success": true,
  "is_complete": true,
  "checks": [
    {"name": "has_ad_groups", "passed": true, "level": "error", "message": "Campaign has 2 ad groups"},
    {"name": "ad_groups_have_ads", "passed": true, "level": "error", "message": "All ad groups have enabled ads"},
    {"name": "has_keywords", "passed": true, "level": "error", "message": "Campaign has 15 keywords"},
    {"name": "budget_configured", "passed": true, "level": "error", "message": "Budget: $50.00/day"},
    {"name": "conversion_tracking", "passed": true, "level": "warning", "message": "Account has 3 conversion actions"}
  ]
}
```

**BLOCKING:** If `is_complete: false`, DO NOT enable the campaign. Fix missing components first.

### 1. Geo Targeting Verification

**CRITICAL:** Campaigns without geo targeting will show to ALL countries including spam countries.

#### Check Current Geo Targeting
```bash
POST /tools/run
{
  "script_name": "google_ads_export_campaigns",
  "platform": "GOOGLE",
  "args": ["--campaign-filter", "<CAMPAIGN_NAME>"],
  "user_id": <USER_ID>
}
```

Look for "Geo Targets: Not set" - this is a red flag.

#### Tier Definitions

**Tier 1 (High-value markets):**
- United States, United Kingdom, Canada, Australia, New Zealand
- Germany, France, Netherlands, Switzerland
- Norway, Sweden, Denmark, Finland
- Austria, Belgium, Ireland
- Japan, Singapore

**Tier 2 (Good secondary markets):**
- Spain, Italy, Portugal
- Poland, Czech Republic
- Israel, UAE, Saudi Arabia
- South Korea, Taiwan, Hong Kong
- Brazil, Mexico, South Africa

**Spam Countries (AVOID):**
- India, Pakistan, Bangladesh
- Russia, Ukraine
- China (unless specifically targeting)

#### Fix Missing Geo Targeting
```bash
POST /tools/run
{
  "script_name": "google_ads_set_campaign_geo_targets",
  "platform": "GOOGLE",
  "args": ["--campaign-ids", "<CAMPAIGN_IDS>", "--tier", "1,2"],
  "user_id": <USER_ID>
}
```

**Note:** Demand Gen campaigns require ad group-level targeting. The script handles this automatically.

### 2. Conversion Tracking

Use the `conversion-tracking` skill for detailed tracking verification.

Quick check:
```bash
POST /tools/run
{
  "script_name": "google_ads_list_conversions",
  "platform": "GOOGLE",
  "args": [],
  "user_id": <USER_ID>
}
```

**Requirements:**
- At least one conversion action must exist
- Conversion must have recent data (last 30 days)
- GTM tags must be published

### 3. Budget Sanity Check

Review daily budgets:
- **Minimum recommended:** $25/day for Search, $50/day for Demand Gen
- **Maximum CPC:** Should be set for manual bidding strategies
- **Conversion-based bidding:** Requires 15+ conversions in last 30 days

### 4. Negative Keyword Lists (Search Campaigns)

Check for common negative keywords:
- Brand misspellings to avoid
- Irrelevant industry terms
- Competitor brands (if not conquesting)
- "free", "cheap" (if selling premium)

### 5. Ad Schedule

Verify ads run during business hours if B2B:
- US: 6am-8pm PT / 9am-11pm ET
- EMEA: 7am-7pm CET
- APAC: 8am-8pm local

## Campaign Type Specific Checks

### Demand Gen (YouTube/Discover)

1. **Video requirements:**
   - YouTube video must be public or unlisted
   - Minimum 10 seconds for in-stream
   - 6-15 seconds for bumper ads

2. **Location targeting at ad group level** (not campaign level)

3. **Audience targeting:**
   - Custom intent keywords recommended
   - Remarketing audiences for better performance

### Search Campaigns

1. **Keyword match types:**
   - Broad match requires Smart Bidding
   - Phrase/Exact for manual CPC

2. **Ad extensions:**
   - Sitelinks (minimum 4)
   - Callouts (minimum 4)
   - Structured snippets

### Display Campaigns

1. **Image assets:**
   - Landscape (1200x628)
   - Square (1200x1200)
   - Logo (1200x1200)

2. **Placement exclusions:**
   - Exclude mobile apps if not relevant
   - Exclude parked domains

## Quick Pre-Flight Summary

When reviewing campaigns, output a summary like:

```
## Campaign Pre-Flight Report

| Check | Status | Notes |
|-------|--------|-------|
| Geo Targeting | ✅/⚠️/❌ | Tier 1+2 / Not set |
| Conversion Tracking | ✅/⚠️/❌ | Active / No conversions |
| Budget | ✅/⚠️ | $X/day |
| Ad Schedule | ✅/⚠️ | 24/7 / Business hours |
| Negative Keywords | ✅/⚠️ | X keywords / None |

**Recommendation:** [Enable/Fix issues first]
```

## Automation Workflow

For bulk campaign review:

1. Export all campaigns with geo targeting info
2. Flag campaigns with issues
3. Offer to fix automatically
4. Re-verify after fixes
