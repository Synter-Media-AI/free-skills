---
name: mmm-budget-planner
description: MMM (Google Meridian) — budget optimization, revenue projections, channel ROI, scenario planning.
---

# MMM Budget Planner (Meridian)

## Overview

Uses Google's open-source Meridian framework to build Marketing Mix Models from cross-platform ad data. Provides causal ROI estimates, budget optimization, and forward-looking projections.

## When to Use

- "What's the true ROI of each channel?"
- "How should I allocate my budget across platforms?"
- "What happens if I shift $5K from Meta to Google?"
- "Train an MMM model on my data"
- "Run a budget scenario"
- "How are my campaigns pacing?"

## Available Scripts

| Script | Purpose | Credits |
|--------|---------|---------|
| `mmm_prepare_data` | Prepare and validate data for MMM | 0 (internal) |
| `mmm_train_model` | Train Meridian model on historical data | 50 |
| `mmm_optimize_budget` | Run budget optimization scenario | 10 |
| `mmm_get_projections` | Get forward-looking projections | 5 |

## Workflow

### 1. Train a Model (First Time)

```json
{
  "script_name": "mmm_train_model",
  "platform": "GOOGLE",
  "args": ["--kpi-type", "conversions"]
}
```

Requirements:
- Minimum 52 weeks of ad_metrics data (104+ recommended)
- At least 1 connected platform with historical data
- Training takes ~30 min on CPU

### 2. Run Budget Optimization

```json
{
  "script_name": "mmm_optimize_budget",
  "args": [
    "--budget", "10000",
    "--period", "monthly",
    "--constraint-type", "fixed",
    "--channel-min", "google_ads=0.2",
    "--channel-max", "linkedin_ads=0.3"
  ]
}
```

### 3. Get Projections

```json
{
  "script_name": "mmm_get_projections",
  "args": ["--weeks", "4"]
}
```

## Data Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Historical data | 52 weeks | 104+ weeks |
| Channels | 1 | 2+ |
| KPI data | Non-zero conversions | Revenue data |
| Time granularity | Weekly (auto-aggregated) | Weekly |

## Key Concepts

- **ROI**: Causal return on investment per channel (not just correlation)
- **Response Curves**: How conversions change as you increase/decrease spend (shows diminishing returns)
- **Adstock**: Lagged effect of advertising (this week's ads affect next week's sales)
- **Hill Saturation**: Diminishing returns at higher spend levels

## Interpreting Results

### ROI Summary
```json
{
  "google_ads": {"median": 3.2, "ci_lower": 2.1, "ci_upper": 4.8}
}
```
- Median 3.2 = every $1 spent returns $3.20 in KPI value
- CI = 90% credible interval (Bayesian uncertainty)

### Budget Optimization
Shows optimal spend per channel to maximize total KPI within budget constraint.
Compare with current allocation to see improvement %.

### Projections
Forward-looking forecast with confidence bands. Use to catch underperforming campaigns before they waste budget.


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
