---
name: multi-platform-ads-operator
description: Plan and operate paid campaigns across multiple ad platforms via Synter MCP — create campaign plans, forecast, reconcile spend, and stage multi-channel launches with human approve ≠ activate. Use when launching or optimizing across Google/Meta/LinkedIn/TikTok/X together.
---

# Multi-Platform Ads Operator (Synter MCP)

Cross-platform operator spine for Synter MCP. Prefer one plan → platform-specific operators → shared gates.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Plan | `create_campaign_plan`, `get_campaign_plan`, `approve_campaign_plan`, `execute_campaign_plan` |
| Forecast | `forecast_campaign`, `forecast_tool_cost` |
| Launch checks | `run_launch_preflight`, `get_launch_gate_policy` |
| Spend | `get_daily_spend` / spend reconciliation tools, `optimize_budget`, `set_spend_alert` |
| Performance | `pull_*_ads_performance` per platform |
| Audiences | `sync_audience`, `attach_audience`, `build_lookalike_audience` |

## Operator loop

1. **Plan** — `create_campaign_plan` with an idempotent `plan_key`; keep paused-by-default.
2. **Preflight** — `run_launch_preflight` + `campaign-preflight` + `launch-gates`.
3. **Approve** — human approve on card; **approve ≠ activate**.
4. **Execute** — only after approval; prefer staged enable per platform.
5. **Optimize** — `budget-optimizer`, `kill-scale-rules`, platform operators.

## Related skills

`cross-platform-launcher`, `multi-platform-launch`, `budget-optimizer`, `campaign-ide-handoff`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

