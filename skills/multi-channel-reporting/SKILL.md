---
name: multi-channel-reporting
description: Generates cross-channel advertising reports and performance summaries. Use for campaign analysis, budget reviews, and executive reporting.
---

# Multi-Channel Reporting Skill

Generates cross-channel advertising performance reports using Google Ads API Report Fetcher (GAARF) patterns. Token-efficient summaries instead of raw data dumps.

## Capabilities

1. **Executive summaries** - High-level spend, conversions, ROAS across all channels
2. **Channel comparison** - Side-by-side platform performance
3. **Top/bottom performers** - Identify winners and losers to act on
4. **Daily data extraction** - Scheduled pulls for trend analysis

## Report Types

| Report | Description | Use When |
|--------|-------------|----------|
| Executive Summary | Totals + KPIs across channels | Weekly/monthly reviews |
| Channel Summary | Per-platform breakdown | Budget allocation decisions |
| Campaign Performance | Top/bottom campaigns | Optimization meetings |
| Trend Report | Day-over-day/week-over-week | Identifying anomalies |

## Workflow

### Generate Performance Report

Run `scripts/generate-report.py` with date range:

```bash
python3 scripts/generate-report.py \
  --start-date 2025-01-01 \
  --end-date 2025-01-15 \
  --breakdown campaign
```

Options:
- `--breakdown`: `campaign` | `ad_group` | `keyword` | `day`
- `--top-n`: Number of top/bottom performers to show (default: 10)
- `--output`: Save to JSON file

### Daily Data Pull

Run `scripts/daily-pull.py` for scheduled extraction:

```bash
python3 scripts/daily-pull.py \
  --days 7 \
  --output-dir data/
```

This stores data in `data/YYYY-MM-DD.json` for trend analysis.

## GAQL Query Examples

### Campaign Performance (Last 30 Days)
```sql
SELECT
  campaign.name,
  campaign.status,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
```

### Daily Spend Trend
```sql
SELECT
  segments.date,
  metrics.cost_micros,
  metrics.conversions,
  metrics.impressions
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
ORDER BY segments.date
```

### Ad Group Performance
```sql
SELECT
  campaign.name,
  ad_group.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM ad_group
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
  AND ad_group.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
```

### Keyword Performance
```sql
SELECT
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
```

## Output Format

Reports are token-efficient summaries, not raw row dumps:

```
EXECUTIVE SUMMARY
=================
Period: 2025-01-01 to 2025-01-15
Total Spend: $12,345.67
Conversions: 234
CPA: $52.76
ROAS: 3.2x

CHANNEL SUMMARY
===============
Google Ads: $10,000 | 200 conv | $50 CPA
LinkedIn:   $2,000  | 30 conv  | $67 CPA
Reddit:     $345    | 4 conv   | $86 CPA

TOP 5 PERFORMERS (by CPA)
=========================
1. Brand - Search ($15 CPA, 50 conv)
2. JTBD - Budget ($35 CPA, 30 conv)
...

BOTTOM 5 PERFORMERS (by CPA)  
============================
1. Cold - Display ($250 CPA, 2 conv)
...

ACTION ITEMS
============
• Scale: Brand - Search (lowest CPA, room to grow)
• Fix: Cold - Display (CPA 5x average)
• Pause: Test Campaign (no conversions in 14 days)
```

## Environment Requirements

Requires environment variables:
- `DATABASE_URL`
- `GOOGLE_ADS_DEVELOPER_TOKEN`

## Account IDs

- **MCC Login Customer ID**: 7431593382

## Extending to Other Platforms

The scripts are designed for extension. To add a new platform:

1. Add platform query function in `generate-report.py`
2. Normalize data to common schema: `{name, spend, impressions, clicks, conversions, cpa}`
3. Add to channel summary aggregation

### Supported Platforms

| Platform | API Type | Notes |
|----------|----------|-------|
| Google Ads | GAQL | GAARF patterns |
| Meta Ads | Graph API | Campaign insights |
| LinkedIn Ads | Rest.li 2.0 | B2B metrics |
| X Ads | v12 API | Engagement metrics |
| Reddit Ads | v3 API | Requires User-Agent |
| TikTok Ads | Business API | Video-first metrics |
| Amazon Ads | Sponsored Ads API | ACOS → ROAS conversion |
| The Trade Desk | REST + GraphQL | Delta sync for efficiency |
| Amazon DSP | Async Reporting | Request → poll → download |

### Platform-Specific Notes

#### The Trade Desk
- Uses `changeTrackingVersion` for incremental sync
- GraphQL for complex cross-dimension queries
- Supports display, video, CTV, audio metrics

#### Amazon DSP
- **Async reporting** - must poll for report completion
- Order = Campaign, Line Item = Ad Group
- Lifetime budgets (convert to daily for comparison)
