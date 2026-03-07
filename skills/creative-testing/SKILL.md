---
name: creative-testing
description: Cross-platform creative A/B testing for ads across Google, Meta, LinkedIn, X, Reddit, TikTok, and Amazon. Use for creative testing, ad variant analysis, winner selection, and performance comparison.
---

# Cross-Platform Creative Testing

A/B tests ad creatives across all connected advertising platforms. Creates test variants, monitors performance, determines statistical winners, and applies winning creatives platform-wide.

## Safety Guardrails

**Read-only by default.** This skill:
- Analyzes creative performance and outputs recommendations only
- Never auto-pauses or promotes variants without explicit flags
- Requires `--apply` flag to make any changes
- Generates detailed reports before modifications

## Capabilities

1. **Create A/B Tests** - Set up multi-variant creative tests across platforms
2. **Monitor Performance** - Track CTR, CPC, CVR, ROAS per creative variant
3. **Statistical Analysis** - Calculate confidence intervals and significance
4. **Winner Detection** - Automatically identify winning variants at threshold
5. **Apply Winners** - Promote winning creatives, pause losers
6. **Cross-Platform Sync** - Replicate winning concepts to other platforms

## Workflow

### Step 1: Create Test Configuration

```bash
python3 scripts/create_test.py \
  --name "Q1 2026 Hero Image Test" \
  --platforms google,meta,linkedin \
  --variants 3 \
  --metric ctr \
  --confidence 95 \
  --min-impressions 1000 \
  --output test_config.json
```

### Step 2: Upload Creative Variants

```bash
python3 scripts/upload_variants.py \
  --test-id test_config.json \
  --variant-a /path/to/hero_v1.png --headline-a "Try Free Today" \
  --variant-b /path/to/hero_v2.png --headline-b "Start Your Trial" \
  --variant-c /path/to/hero_v3.png --headline-c "Get Started Free"
```

### Step 3: Monitor Test Performance

```bash
python3 scripts/monitor_test.py \
  --test-id test_config.json \
  --output performance.json
```

### Step 4: Analyze Results

```bash
python3 scripts/analyze_results.py \
  --test-id test_config.json \
  --performance performance.json \
  --output analysis.json
```

### Step 5: Apply Winner (Optional)

```bash
python3 scripts/apply_winner.py \
  --test-id test_config.json \
  --analysis analysis.json \
  --dry-run

# Remove --dry-run to execute
python3 scripts/apply_winner.py \
  --test-id test_config.json \
  --analysis analysis.json \
  --apply
```

## Common Operations

### Quick performance check on active tests

```bash
python3 scripts/monitor_test.py \
  --all-active \
  --summary-only
```

### Create headline-only test

```bash
python3 scripts/create_test.py \
  --name "Headline Test" \
  --platforms meta \
  --type headline \
  --variants 4 \
  --metric ctr
```

### Create image-only test

```bash
python3 scripts/create_test.py \
  --name "Image Test" \
  --platforms google,meta \
  --type image \
  --variants 3 \
  --metric cvr
```

### Generate creative test report

```bash
python3 scripts/generate_report.py \
  --test-id test_config.json \
  --format markdown \
  --output creative_report.md
```

### Sync winning creative to other platforms

```bash
python3 scripts/sync_winner.py \
  --test-id test_config.json \
  --source-platform meta \
  --target-platforms google,linkedin,tiktok \
  --dry-run
```

## Statistical Methodology

### Significance Testing

Uses **Bayesian A/B testing** with Beta-Binomial model for CTR/CVR:

1. **Prior**: Beta(1, 1) - uninformative prior
2. **Posterior**: Beta(1 + conversions, 1 + non-conversions)
3. **Winner Probability**: Monte Carlo simulation (10,000 draws)
4. **Threshold**: Variant wins if P(best) > confidence level

### Minimum Sample Size

```
n = 2 × (Z_α/2 + Z_β)² × p(1-p) / δ²

Where:
- Z_α/2 = 1.96 (95% confidence)
- Z_β = 0.84 (80% power)
- p = expected baseline rate
- δ = minimum detectable effect
```

### Metrics Tracked

| Metric | Formula | Use Case |
|--------|---------|----------|
| CTR | Clicks / Impressions | Awareness campaigns |
| CVR | Conversions / Clicks | Conversion campaigns |
| CPC | Spend / Clicks | Cost efficiency |
| ROAS | Revenue / Spend | Revenue optimization |
| CPL | Spend / Leads | Lead generation |

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--name` | Yes | - | Test name for tracking |
| `--platforms` | No | `all` | Comma-separated platform list |
| `--type` | No | `full` | Test type: headline, image, video, full |
| `--variants` | No | `2` | Number of variants (2-5) |
| `--metric` | No | `ctr` | Primary metric: ctr, cvr, cpc, roas |
| `--confidence` | No | `95` | Confidence level (90, 95, 99) |
| `--min-impressions` | No | `1000` | Minimum impressions before analysis |
| `--max-duration` | No | `14d` | Maximum test duration |
| `--budget-split` | No | `equal` | Budget allocation: equal, weighted |
| `--dry-run` | No | `false` | Preview without applying |
| `--apply` | No | `false` | Execute winner promotion |

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `create_test.py` | Create new A/B test configuration |
| `upload_variants.py` | Upload creative variants to platforms |
| `monitor_test.py` | Track real-time performance metrics |
| `analyze_results.py` | Statistical analysis and winner detection |
| `apply_winner.py` | Promote winner, pause losers |
| `sync_winner.py` | Replicate winning creative to other platforms |
| `generate_report.py` | Create detailed test reports |
| `platform_creative_adapters.py` | Platform-specific creative management |

## Output Format

### Test Configuration JSON

```json
{
  "test_id": "ct_2026011801",
  "name": "Q1 2026 Hero Image Test",
  "created_at": "2026-01-18T10:00:00Z",
  "status": "running",
  "platforms": ["google", "meta", "linkedin"],
  "type": "full",
  "primary_metric": "ctr",
  "confidence_level": 95,
  "min_impressions": 1000,
  "max_duration_days": 14,
  "variants": [
    {
      "id": "A",
      "name": "Control",
      "headline": "Try Free Today",
      "image_url": "https://your-cdn.com/creatives/hero_v1.png"
    },
    {
      "id": "B",
      "name": "Variant B",
      "headline": "Start Your Trial",
      "image_url": "https://your-cdn.com/creatives/hero_v2.png"
    }
  ],
  "budget_split": {
    "A": 50,
    "B": 50
  }
}
```

### Analysis Results JSON

```json
{
  "test_id": "ct_2026011801",
  "analyzed_at": "2026-01-25T10:00:00Z",
  "status": "winner_found",
  "winner": "B",
  "confidence": 97.3,
  "platforms": {
    "google": {
      "variants": {
        "A": {
          "impressions": 12500,
          "clicks": 375,
          "conversions": 45,
          "spend": 187.50,
          "ctr": 3.0,
          "cvr": 12.0,
          "cpc": 0.50
        },
        "B": {
          "impressions": 12500,
          "clicks": 500,
          "conversions": 65,
          "spend": 187.50,
          "ctr": 4.0,
          "cvr": 13.0,
          "cpc": 0.375
        }
      },
      "winner": "B",
      "confidence": 98.5,
      "lift": {
        "ctr": 33.3,
        "cvr": 8.3,
        "cpc": -25.0
      }
    },
    "meta": {
      "variants": {
        "A": {
          "impressions": 18000,
          "clicks": 540,
          "conversions": 54,
          "spend": 270.00,
          "ctr": 3.0,
          "cvr": 10.0,
          "cpc": 0.50
        },
        "B": {
          "impressions": 18000,
          "clicks": 720,
          "conversions": 79,
          "spend": 270.00,
          "ctr": 4.0,
          "cvr": 11.0,
          "cpc": 0.375
        }
      },
      "winner": "B",
      "confidence": 99.1,
      "lift": {
        "ctr": 33.3,
        "cvr": 10.0,
        "cpc": -25.0
      }
    }
  },
  "aggregate": {
    "winner": "B",
    "confidence": 97.3,
    "total_impressions": 61000,
    "lift": {
      "ctr": 33.3,
      "cvr": 9.5,
      "cpc": -25.0
    },
    "recommendation": "Promote Variant B across all platforms. Expected +33% CTR improvement."
  }
}
```

## Platform-Specific Notes

### Google Ads
- Creates Responsive Search Ads for headline tests
- Responsive Display Ads for image tests
- Asset-level reporting available
- Ad rotation: Optimize or Rotate Evenly

### Meta Ads
- Uses Dynamic Creative for testing
- A/B test framework built-in
- Automatic placements recommended
- Breakdown by creative element

### LinkedIn Ads
- Sponsored Content A/B testing
- Single image, carousel, video formats
- Member traits for audience splits
- Conversion tracking via Insight Tag

### X Ads
- Promoted Tweets with variants
- Image, video, carousel formats
- Engagement objectives for CTR
- Website conversion tracking

### Reddit Ads
- Link ads and text ads
- Subreddit targeting splits
- Conversion pixel for CVR
- API v3 creative management

### TikTok Ads
- In-Feed ads, TopView, Spark
- Video-first creative testing
- Custom audiences for splits
- TikTok Pixel for conversions

### Amazon Ads
- Sponsored Products/Brands/Display
- Custom headline tests
- ASIN-level performance
- Attribution for conversions

## Best Practices

1. **Test one element at a time** - Isolate headlines, images, or CTAs
2. **Ensure statistical significance** - Wait for min impressions before deciding
3. **Use realistic budgets** - Don't starve variants with low spend
4. **Match audiences** - Ensure fair comparison with same targeting
5. **Document learnings** - Track what works for future campaigns
6. **Consider seasonality** - Account for weekly/monthly patterns
7. **Iterate on winners** - Use insights for next round of tests
8. **Cross-platform sync** - Apply learnings across all platforms

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

# Google Ads specific
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_LOGIN_CUSTOMER_ID

# Database for test tracking
DATABASE_URL
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `INSUFFICIENT_DATA` | Not enough impressions | Extend test duration or increase budget |
| `NO_WINNER` | Variants too similar | Increase minimum detectable effect |
| `UPLOAD_FAILED` | Creative rejected by platform | Check format/size requirements |
| `TEST_EXPIRED` | Max duration reached | Analyze current data or restart |
| `VARIANT_PAUSED` | Platform paused underperformer | May indicate quality issues |
| `SYNC_FAILED` | Cross-platform sync error | Check target platform credentials |

## Integration with Other Skills

- **ad-copy-generation** - Generate headline variants for testing
- **cross-platform-launcher** - Deploy winning creatives to new campaigns
- **multi-channel-reporting** - Include test results in reports
- **budget-optimizer** - Allocate more budget to winning creatives
