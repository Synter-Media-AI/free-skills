---
name: keyword-research
description: Finds low-competition, high-intent keywords using Google Keyword Planner and adds them to campaigns. Use when asked to find keywords, expand campaigns, or improve PPC targeting.
---

# Keyword Research Skill

Discovers low-competition, high-intent keywords for your campaigns using Google Ads Keyword Planner, then adds them to the appropriate ad groups.

## Capabilities

1. **Find keyword opportunities** - Query Google Keyword Planner with seed keywords
2. **Score & filter keywords** - Identify low-competition, high-value opportunities
3. **Add to campaigns** - Automatically add keywords to relevant ad groups
4. **Competitive analysis** - Analyze competitor domains for keyword gaps

## Workflow

### Step 1: Research Keywords

Run `scripts/research-keywords.py` with seed keywords:

```bash
python3 scripts/research-keywords.py \
  --seeds "ppc management,google ads automation,facebook ads management" \
  --max-competition 50 \
  --min-volume 100 \
  --max-cpc 25
```

This outputs a ranked list of keyword opportunities.

### Step 2: Add Keywords to Campaigns

Run `scripts/add-keywords.py` to add keywords:

```bash
python3 scripts/add-keywords.py \
  --keywords "ppc management tools,marketing automation for agencies" \
  --ad-group "Your Campaign - Ad Group 1" \
  --match-type PHRASE
```

### Step 3: Create Keyword Report

Run `scripts/keyword-report.py` to see all keywords across campaigns:

```bash
python3 scripts/keyword-report.py
```

## Filtering Criteria

Default filters for finding opportunities:

| Criteria | Default | Description |
|----------|---------|-------------|
| Competition Index | < 50% | Low competition keywords |
| Search Volume | > 100 | Enough traffic to be worthwhile |
| CPC Range | $1-25 | Valuable but not prohibitively expensive |

## Keyword Categories

When adding keywords, map them to appropriate ad groups:

| Category | Target Ad Groups |
|----------|-----------------|
| PPC Tools | JTBD - PPC Audit, JTBD - Budget Optimizer |
| Automation | JTBD - Creative Generator, ProductHunt |
| Agency | JTBD - Website Analysis, Trial Campaign |
| Cross-Channel | ProductHunt, Trial Campaign |
| Competitors | JTBD - Optmyzr Alternative |

## Match Types

- **PHRASE** (default): Best for new keywords, balances reach and relevance
- **EXACT**: Use for high-volume, proven keywords
- **BROAD**: Use sparingly, only for discovery with Smart Bidding

## Best Practices

1. **Research first** - Always run keyword research before adding
2. **Group by intent** - Add keywords to ad groups with matching intent
3. **Start with PHRASE** - Upgrade to EXACT after seeing performance
4. **Monitor quality score** - New keywords should get 6+ quality score
5. **Check for conflicts** - Don't add keywords that match negative keyword lists

## Environment Requirements

Requires environment variables:
- `DATABASE_URL`
- `GOOGLE_ADS_DEVELOPER_TOKEN`

## Account IDs

- **MCC Login Customer ID**: 7431593382
