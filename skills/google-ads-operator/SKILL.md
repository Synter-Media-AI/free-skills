---
name: google-ads-operator
description: Operate Google Ads via Synter MCP — pull performance, run GAQL, audit structure, and stage Search/PMax/Display changes with human approve ≠ activate. Use when managing Google Ads, Quality Score, search terms, or Google campaign budgets through Synter.
---

# Google Ads Operator (Synter MCP)

Operate Google Ads through Synter MCP tools. Do not invent API credentials; use the connected Synter workspace.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Performance | `pull_google_ads_performance` |
| Custom queries | `run_gaql_query` |
| Structure audit | `audit_account_structure` |
| Trial funnel | `setup_google_ads_trial_funnel` |
| Budget / pause | `update_campaign_budget`, `pause_campaign`, `optimize_budget` |
| List / observe | `list_campaigns`, `get_campaign_observation` |

## Operator loop

1. **Read** — `pull_google_ads_performance` for the last 7–30 days; note CPA/ROAS outliers.
2. **Diagnose** — `run_gaql_query` for search terms, QS components, or zero-conversion spend.
3. **Structure** — `audit_account_structure` before renames or large rebuilds.
4. **Propose** — draft negatives, budget moves, or PMax asset changes; never auto-enable.
5. **Gate** — run `campaign-preflight` + `launch-gates` before any activate.

## Related skills

`google-ads-quality-score`, `performance-max-optimizer`, `negative-keyword-miner`, `campaign-structure-auditor`, `kill-scale-rules`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

