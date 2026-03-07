---
name: cross-platform-launcher
description: Deploys campaigns to multiple ad platforms simultaneously (Google, Meta, LinkedIn, X, Reddit, TikTok, Amazon, The Trade Desk, Amazon DSP). Use for launching unified campaigns, multi-channel rollouts, or synchronized campaign deployment.
---

# Cross-Platform Campaign Launcher

Deploy advertising campaigns to multiple platforms simultaneously from a single unified campaign definition. Supports Google Ads, Meta Ads, LinkedIn Ads, X Ads, Reddit Ads, TikTok Ads, Amazon Ads, The Trade Desk, and Amazon DSP.

## Capabilities

1. **Unified Campaign Creation** - Define once, deploy to multiple platforms
2. **Platform-Specific Mapping** - Auto-maps objectives, budgets, and targeting per platform
3. **Parallel Deployment** - Launches to all selected platforms concurrently
4. **Rollout Validation** - Pre-flight checks before deployment
5. **Deployment Status Tracking** - Track success/failure per platform
6. **Budget Distribution** - Split budget across platforms (equal, weighted, or custom)
7. **Dry Run Mode** - Preview what would be created without deploying

## Workflow

### Step 1: Define Unified Campaign

Create a campaign definition JSON file:

```json
{
  "name": "Q1 2026 Lead Generation",
  "objective": "LEAD_GENERATION",
  "budget": {
    "total_daily": 500,
    "currency": "USD",
    "distribution": "weighted",
    "weights": {
      "google": 0.35,
      "meta": 0.25,
      "linkedin": 0.20,
      "x": 0.10,
      "reddit": 0.10
    }
  },
  "schedule": {
    "start_date": "2026-02-01",
    "end_date": "2026-03-31"
  },
  "targeting": {
    "locations": ["US", "CA", "GB"],
    "age_min": 25,
    "age_max": 55,
    "interests": ["marketing", "advertising", "business"],
    "job_titles": ["Marketing Manager", "CMO", "Director of Marketing"]
  },
  "platforms": ["google", "meta", "linkedin", "x", "reddit"],
  "status": "PAUSED"
}
```

### Step 2: Validate Campaign Definition

```bash
python3 scripts/validate_unified_campaign.py \
  --config campaign.json \
  --check-credentials \
  --check-budgets
```

### Step 3: Preview Deployment (Dry Run)

```bash
python3 scripts/launch_unified_campaign.py \
  --config campaign.json \
  --dry-run
```

### Step 4: Deploy to All Platforms

```bash
python3 scripts/launch_unified_campaign.py \
  --config campaign.json
```

### Step 5: Check Deployment Status

```bash
python3 scripts/check_deployment_status.py \
  --deployment-id dep_abc123
```

### Step 6: Sync Status to Database

```bash
python3 scripts/sync_deployment_status.py \
  --deployment-id dep_abc123
```

## Common Operations

### Quick launch to Google + Meta

```bash
python3 scripts/launch_unified_campaign.py \
  --name "Spring Sale 2026" \
  --objective WEBSITE_TRAFFIC \
  --daily-budget 200 \
  --platforms google,meta \
  --locations US \
  --status PAUSED
```

### Launch lead gen to B2B platforms

```bash
python3 scripts/launch_unified_campaign.py \
  --name "Enterprise Demo Requests" \
  --objective LEAD_GENERATION \
  --daily-budget 500 \
  --platforms linkedin,google \
  --job-titles "CTO,VP Engineering,Director IT" \
  --industries "Technology,Software" \
  --status PAUSED
```

### Distribute budget across platforms

```bash
python3 scripts/launch_unified_campaign.py \
  --name "Brand Awareness 2026" \
  --objective BRAND_AWARENESS \
  --daily-budget 1000 \
  --platforms google,meta,linkedin,x,reddit \
  --distribution weighted \
  --weights "google:0.30,meta:0.25,linkedin:0.20,x:0.15,reddit:0.10" \
  --status PAUSED
```

## Objective Mapping

| Unified Objective | Google Ads | Meta Ads | LinkedIn | X Ads | Reddit | TikTok | Amazon | TTD | Amazon DSP |
|------------------|------------|----------|----------|-------|--------|--------|--------|-----|------------|
| `BRAND_AWARENESS` | Display/Video | REACH | BRAND_AWARENESS | AWARENESS | AWARENESS | REACH | - | MaximizeReach | AWARENESS |
| `WEBSITE_TRAFFIC` | Search/Display | TRAFFIC | WEBSITE_VISITS | CLICKS | TRAFFIC | TRAFFIC | - | MaximizeClicks | CONSIDERATION |
| `LEAD_GENERATION` | Search/Lead Forms | LEAD_GENERATION | LEAD_GENERATION | LEADS | CONVERSIONS | LEAD_GENERATION | - | MaximizeConversions | CONVERSION |
| `CONVERSIONS` | Search/pMax | CONVERSIONS | WEBSITE_CONVERSIONS | CONVERSIONS | CONVERSIONS | CONVERSIONS | PURCHASES | MaximizeConversions | CONVERSION |
| `APP_INSTALLS` | App | APP_INSTALLS | - | APP_INSTALL | APP_INSTALL | APP_PROMOTION | - | - | - |
| `VIDEO_VIEWS` | Video | VIDEO_VIEWS | VIDEO_VIEWS | VIDEO_VIEWS | VIDEO_VIEWS | VIDEO_VIEWS | - | ViewableImpressions | AWARENESS |
| `ENGAGEMENT` | Display | ENGAGEMENT | ENGAGEMENT | ENGAGEMENTS | ENGAGEMENT | ENGAGEMENT | - | MaximizeClicks | CONSIDERATION |

## Budget Distribution Modes

| Mode | Description |
|------|-------------|
| `equal` | Split budget equally across all platforms |
| `weighted` | Split budget by specified weights (must sum to 1.0) |
| `custom` | Specify exact amounts per platform |
| `performance` | Auto-optimize based on historical ROAS (requires data) |

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--config` | No | - | Path to campaign JSON config file |
| `--name` | Yes* | - | Campaign name (*required if no config) |
| `--objective` | Yes* | - | Unified campaign objective |
| `--daily-budget` | Yes* | - | Total daily budget in USD |
| `--platforms` | Yes* | all | Comma-separated platform list |
| `--distribution` | No | `equal` | Budget distribution mode |
| `--weights` | No | - | Platform weights for weighted distribution |
| `--locations` | No | `US` | Comma-separated geo targets |
| `--start-date` | No | tomorrow | Campaign start date (YYYY-MM-DD) |
| `--end-date` | No | - | Campaign end date (YYYY-MM-DD) |
| `--status` | No | `PAUSED` | Initial campaign status |
| `--dry-run` | No | `false` | Preview without deploying |
| `--parallel` | No | `true` | Deploy to platforms in parallel |

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `launch_unified_campaign.py` | Main launcher - deploys to all platforms |
| `validate_unified_campaign.py` | Validate config and credentials |
| `check_deployment_status.py` | Check status of a deployment |
| `sync_deployment_status.py` | Sync deployment status to database |
| `list_active_deployments.py` | List all active multi-platform deployments |
| `pause_deployment.py` | Pause campaigns across all platforms |
| `resume_deployment.py` | Resume paused deployment |
| `update_deployment_budget.py` | Update budget across all platforms |

## Deployment Output

```json
{
  "success": true,
  "deployment_id": "dep_20260118_abc123",
  "name": "Q1 2026 Lead Generation",
  "total_budget": 500,
  "currency": "USD",
  "platforms": {
    "google": {
      "success": true,
      "campaign_id": "customers/123/campaigns/456",
      "budget_allocated": 175,
      "status": "PAUSED"
    },
    "meta": {
      "success": true,
      "campaign_id": "23849573845",
      "budget_allocated": 125,
      "status": "PAUSED"
    },
    "linkedin": {
      "success": true,
      "campaign_id": "389457839",
      "budget_allocated": 100,
      "status": "PAUSED"
    },
    "x": {
      "success": true,
      "campaign_id": "1234567890",
      "budget_allocated": 50,
      "status": "PAUSED"
    },
    "reddit": {
      "success": true,
      "campaign_id": "t5_abc123",
      "budget_allocated": 50,
      "status": "PAUSED"
    }
  },
  "created_at": "2026-01-18T10:30:00Z"
}
```

## Pre-Flight Checks

Before deploying, the launcher validates:

1. **OAuth Credentials** - All platform connections are active
2. **Budget Minimums** - Each platform meets minimum budget requirements
3. **Targeting Availability** - Targeting options supported on each platform
4. **Objective Support** - Objective available on all selected platforms
5. **Geo Targeting** - Locations available on all platforms
6. **Asset Requirements** - Required creatives exist for each platform

## Platform-Specific Notes

### Google Ads
- Requires `GOOGLE_ADS_DEVELOPER_TOKEN`
- Campaigns created as Search (for leads/conversions) or Display (for awareness)
- Uses customer ID from `GOOGLE_ADS_CUSTOMER_ID`

### Meta Ads
- Requires `META_AD_ACCOUNT_ID`
- Creates campaign under ad account
- Audience targeting mapped to Meta's detailed targeting

### LinkedIn Ads
- Requires `LINKEDIN_AD_ACCOUNT_ID`
- Best for B2B with job title/industry targeting
- Lead gen uses LinkedIn Lead Gen Forms

### X Ads
- Requires `TWITTER_AD_ACCOUNT_ID`
- Campaigns created with funding instrument
- Interest targeting mapped to X's categories

### Reddit Ads
- Requires `REDDIT_AD_ACCOUNT_ID`
- User-Agent header required
- Interest/subreddit targeting available

### TikTok Ads
- Requires `TIKTOK_ADVERTISER_ID`
- Video-first platform
- Interest and behavior targeting

### Amazon Ads
- Requires `AMAZON_ADS_PROFILE_ID`
- Product-focused campaigns
- Sponsored Products/Brands/Display

### The Trade Desk
- Requires `TTD_AUTH_TOKEN` and `TTD_ADVERTISER_ID`
- API token auth (not OAuth)
- Supports Display, Video, CTV, Audio, Native
- Budgets in micros (multiply by 1,000,000)
- Modern campaigns use `Version: "Kokai"`

### Amazon DSP
- Requires `AMAZON_DSP_PROFILE_ID` and `AMAZON_DSP_ADVERTISER_ID`
- OAuth 2.0 with PKCE
- Order = Campaign, Line Item = Ad Group
- Lifetime budgets (not daily)
- Region-specific (NA, EU, FE)

## Environment Variables

Required per platform:

```bash
# Google Ads
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_CUSTOMER_ID
GOOGLE_ADS_LOGIN_CUSTOMER_ID

# Meta Ads
META_AD_ACCOUNT_ID
META_ACCESS_TOKEN

# LinkedIn Ads
LINKEDIN_AD_ACCOUNT_ID
LINKEDIN_ACCESS_TOKEN

# X Ads
TWITTER_AD_ACCOUNT_ID
X_ACCESS_TOKEN

# Reddit Ads
REDDIT_AD_ACCOUNT_ID
REDDIT_ACCESS_TOKEN

# TikTok Ads
TIKTOK_ADVERTISER_ID
TIKTOK_ACCESS_TOKEN

# Amazon Ads
AMAZON_ADS_PROFILE_ID
AMAZON_ACCESS_TOKEN

# The Trade Desk
TTD_AUTH_TOKEN
TTD_ADVERTISER_ID
TTD_ENVIRONMENT  # sandbox or prod

# Amazon DSP
AMAZON_DSP_PROFILE_ID
AMAZON_DSP_ADVERTISER_ID
AMAZON_DSP_ACCESS_TOKEN
AMAZON_DSP_REGION  # na, eu, or fe
```

3. Tokens refreshed automatically if expired

## Database Schema

Deployments tracked in `unified_deployments` table:

```sql
CREATE TABLE unified_deployments (
  id UUID PRIMARY KEY,
  deployment_id VARCHAR(255) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  objective VARCHAR(50) NOT NULL,
  total_budget DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  distribution_mode VARCHAR(20) DEFAULT 'equal',
  status VARCHAR(20) DEFAULT 'PENDING',
  platforms JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deployment_campaigns (
  id UUID PRIMARY KEY,
  deployment_id UUID REFERENCES unified_deployments(id),
  platform VARCHAR(20) NOT NULL,
  platform_campaign_id VARCHAR(255),
  budget_allocated DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'PENDING',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `MISSING_CREDENTIALS` | Platform OAuth not connected | Connect platform in Settings |
| `BUDGET_TOO_LOW` | Platform minimum not met | Increase budget or remove platform |
| `OBJECTIVE_NOT_SUPPORTED` | Platform doesn't support objective | Remove platform from deployment |
| `TARGETING_UNAVAILABLE` | Targeting option not on platform | Adjust targeting or remove platform |
| `RATE_LIMITED` | Too many API requests | Retry with backoff |
| `PARTIAL_FAILURE` | Some platforms failed | Check individual errors, retry failed |

## Best Practices

1. **Always start PAUSED** - Review campaigns before enabling
2. **Use dry-run first** - Preview deployment before creating
3. **Set realistic budgets** - Ensure minimums met per platform
4. **Check credentials** - Verify all OAuth connections active
5. **Review targeting** - Ensure targeting makes sense per platform
6. **Monitor after launch** - Use health monitoring skill for alerts
7. **Use weighted distribution** - Allocate more to high-performing platforms
8. **Sync status regularly** - Keep database in sync with platforms
