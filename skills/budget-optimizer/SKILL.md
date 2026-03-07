---
name: budget-optimizer
description: Cross-platform budget optimizer that reallocates spend based on ROAS across Google, Meta, LinkedIn, X, Reddit, TikTok, Amazon, The Trade Desk, and Amazon DSP. Use for budget reallocation, ROAS optimization, or cross-platform spend efficiency.
---

# Cross-Platform Budget Optimizer

Analyzes ROAS performance across all connected ad platforms and generates budget reallocation recommendations to maximize overall return. Supports Google Ads, Meta Ads, LinkedIn Ads, X Ads, Reddit Ads, TikTok Ads, Amazon Ads, The Trade Desk, and Amazon DSP.

## Safety Guardrails

**Read-only by default.** This skill:
- Analyzes performance data and outputs recommendations only
- Never auto-applies budget changes without `--apply` flag
- Requires explicit `--confirm` for applying changes over threshold
- Generates detailed reports before any modifications

## Capabilities

1. **Cross-Platform ROAS Analysis** - Pull and compare ROAS across all platforms
2. **Budget Reallocation Recommendations** - Suggest moving spend from low to high ROAS platforms
3. **Campaign-Level Optimization** - Identify top/bottom performers within each platform
4. **Constraint-Aware Planning** - Respect minimum budgets, daily caps, and platform limits
5. **Historical Trend Analysis** - Consider 7/14/30-day ROAS trends
6. **Apply Budget Changes** - Execute approved reallocations across platforms

## Workflow

### Step 1: Pull Performance Data

Fetch ROAS data from all connected platforms:

```bash
python3 scripts/pull_platform_metrics.py \
  --platforms all \
  --date-range 30d \
  --output metrics.json
```

### Step 2: Analyze & Generate Recommendations

```bash
python3 scripts/analyze_budgets.py \
  --input metrics.json \
  --target-roas 3.0 \
  --min-budget 10 \
  --reallocation-threshold 0.15 \
  --output recommendations.json
```

### Step 3: Preview Recommendations

```bash
python3 scripts/preview_reallocation.py \
  --recommendations recommendations.json
```

### Step 4: Apply Budget Changes (Optional)

```bash
python3 scripts/apply_budget_changes.py \
  --recommendations recommendations.json \
  --confirm \
  --dry-run
```

Remove `--dry-run` to execute changes:

```bash
python3 scripts/apply_budget_changes.py \
  --recommendations recommendations.json \
  --confirm
```

## Common Operations

### Quick ROAS check across all platforms

```bash
python3 scripts/pull_platform_metrics.py \
  --platforms all \
  --date-range 7d \
  --summary-only
```

### Optimize for a specific ROAS target

```bash
python3 scripts/analyze_budgets.py \
  --input metrics.json \
  --target-roas 4.0 \
  --aggressive \
  --output recommendations.json
```

### Reallocate between specific platforms

```bash
python3 scripts/analyze_budgets.py \
  --input metrics.json \
  --platforms google,meta,linkedin \
  --target-roas 3.0 \
  --output recommendations.json
```

### Weekly optimization report

```bash
python3 scripts/generate_optimization_report.py \
  --date-range 7d \
  --format markdown \
  --output weekly_report.md
```

## Reallocation Algorithm

The optimizer uses a ROAS-weighted reallocation algorithm:

1. **Calculate Platform Scores**: `score = ROAS × conversion_volume_weight`
2. **Identify Donors**: Platforms with ROAS < target × 0.8
3. **Identify Recipients**: Platforms with ROAS > target × 1.2
4. **Calculate Shifts**: Proportional to score difference, capped at thresholds
5. **Apply Constraints**: Minimum budgets, max reallocation %, platform caps

### Score Formula

```
platform_score = (
    roas_normalized × 0.6 +
    conversion_volume_normalized × 0.25 +
    trend_score × 0.15
)
```

Where:
- `roas_normalized` = platform_roas / max(all_roas)
- `conversion_volume_normalized` = platform_conversions / max(all_conversions)
- `trend_score` = 7d_roas_change / 30d_avg_roas

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--platforms` | No | `all` | Comma-separated platform list |
| `--date-range` | No | `30d` | Analysis period (7d, 14d, 30d, 60d, 90d) |
| `--target-roas` | No | `2.0` | Target ROAS for optimization |
| `--min-budget` | No | `10` | Minimum daily budget per platform ($) |
| `--reallocation-threshold` | No | `0.10` | Max % to reallocate per cycle |
| `--aggressive` | No | `false` | Allow larger reallocations (up to 25%) |
| `--conservative` | No | `false` | Limit reallocations to 5% |
| `--dry-run` | No | `false` | Preview without applying changes |
| `--confirm` | No | `false` | Required to apply changes |
| `--output` | No | stdout | Output file path |

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `pull_platform_metrics.py` | Pull ROAS/spend/conversion data from all platforms |
| `analyze_budgets.py` | Generate reallocation recommendations |
| `preview_reallocation.py` | Display recommendations in human-readable format |
| `apply_budget_changes.py` | Execute approved budget changes |
| `generate_optimization_report.py` | Create comprehensive optimization report |
| `platform_metrics_adapters.py` | Platform-specific API adapters for metrics |

## Output Format

### Recommendations JSON

```json
{
  "generated_at": "2026-01-18T10:00:00Z",
  "analysis_period": "30d",
  "target_roas": 3.0,
  "total_budget": 1500.00,
  "platforms": {
    "google": {
      "current_budget": 500.00,
      "recommended_budget": 650.00,
      "change": 150.00,
      "change_pct": 30.0,
      "roas": 4.2,
      "conversions": 125,
      "revenue": 2100.00,
      "spend": 500.00,
      "trend_7d": 0.15
    },
    "meta": {
      "current_budget": 400.00,
      "recommended_budget": 350.00,
      "change": -50.00,
      "change_pct": -12.5,
      "roas": 2.1,
      "conversions": 84,
      "revenue": 840.00,
      "spend": 400.00,
      "trend_7d": -0.08
    }
  },
  "reallocations": [
    {
      "from_platform": "meta",
      "to_platform": "google",
      "amount": 50.00,
      "reason": "Google ROAS 4.2x vs Meta 2.1x"
    },
    {
      "from_platform": "reddit",
      "to_platform": "google",
      "amount": 100.00,
      "reason": "Reddit ROAS 1.5x vs Google 4.2x"
    }
  ],
  "estimated_impact": {
    "current_blended_roas": 2.8,
    "projected_blended_roas": 3.4,
    "projected_revenue_increase": 450.00,
    "confidence": "medium"
  }
}
```

## Platform-Specific Notes

### Google Ads
- Uses GAQL to query campaign performance
- Includes Search, Display, pMax campaign types
- Respects shared budgets

### Meta Ads
- Queries campaign insights via Graph API
- Combines Facebook and Instagram data
- Handles CBO (Campaign Budget Optimization) campaigns

### LinkedIn Ads
- Rest.li 2.0 protocol for metrics
- Includes Sponsored Content and Message Ads
- B2B conversion tracking

### X Ads
- Campaign analytics via v12 API
- Includes promoted tweets and video views
- Engagement-to-conversion attribution

### Reddit Ads
- API v3 for campaign metrics
- Includes subreddit targeting performance
- User-Agent header required

### TikTok Ads
- Business API for reporting
- Video-first metrics (VTR, engagement)
- Interest targeting performance

### Amazon Ads
- Sponsored Products/Brands/Display metrics
- ACOS (Advertising Cost of Sale) converted to ROAS
- Product-level attribution

### The Trade Desk
- Programmatic display, video, CTV, audio
- Uses delta sync for efficient metric pulls
- Campaign-level budget optimization
- Supports GraphQL for complex queries

### Amazon DSP
- Programmatic display and video on Amazon
- Async reporting (request → poll → download)
- Order-level budgets (lifetime, not daily)
- Region-aware (NA, EU, FE)

## Minimum Budget Requirements

| Platform | Minimum Daily | Recommended Minimum |
|----------|--------------|---------------------|
| Google Ads | $1 | $10 |
| Meta Ads | $1 | $10 |
| LinkedIn Ads | $10 | $50 |
| X Ads | $1 | $10 |
| Reddit Ads | $5 | $20 |
| TikTok Ads | $20 | $50 |
| Amazon Ads | $1 | $10 |
| The Trade Desk | $0.01 | $50 |
| Amazon DSP | $100 (lifetime) | $500 (lifetime) |

## Environment Variables

Required environment variables:

```bash

# Platform Connection IDs

# Platform Account IDs
GOOGLE_ADS_CUSTOMER_ID
META_AD_ACCOUNT_ID
LINKEDIN_AD_ACCOUNT_ID
TWITTER_AD_ACCOUNT_ID
REDDIT_AD_ACCOUNT_ID
TIKTOK_ADVERTISER_ID
AMAZON_ADS_PROFILE_ID
TTD_ADVERTISER_ID
AMAZON_DSP_PROFILE_ID
AMAZON_DSP_ADVERTISER_ID

# Google Ads specific
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_LOGIN_CUSTOMER_ID
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `MISSING_CREDENTIALS` | Platform OAuth not connected | Connect platform in Settings |
| `INSUFFICIENT_DATA` | Not enough conversions for analysis | Extend date range or exclude platform |
| `BUDGET_BELOW_MINIMUM` | Recommended budget below platform min | Increase total budget or exclude platform |
| `RATE_LIMITED` | Too many API requests | Retry with backoff |
| `PARTIAL_DATA` | Some platforms failed to report | Check individual platform errors |
| `APPLY_FAILED` | Budget update failed on platform | Check platform-specific error, retry |

## Best Practices

1. **Run weekly** - Weekly optimization cycles balance data freshness with stability
2. **Start conservative** - Use `--conservative` flag initially
3. **Review before applying** - Always preview recommendations first
4. **Respect learning periods** - Don't optimize campaigns in learning phase
5. **Consider seasonality** - Adjust targets for seasonal patterns
6. **Monitor after changes** - Watch performance 48-72 hours after reallocation
7. **Set realistic targets** - Base target ROAS on historical blended performance
8. **Keep minimum budgets** - Never starve platforms completely

## Integration with Other Skills

- **campaign-preflight** - Run before applying budget changes
- **multi-channel-reporting** - Generate reports after optimization
- **bid-optimization** - Optimize bids within reallocated budgets
- **cross-platform-launcher** - Deploy new campaigns with optimized allocation
