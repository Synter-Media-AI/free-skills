---
name: x-ads-operator
description: Operate X (Twitter) Ads via Synter MCP — pull performance and stage campaign/budget changes with human approve ≠ activate. Use when managing X Ads campaigns through Synter.
---

# X Ads Operator (Synter MCP)

Operate X (Twitter) Ads through Synter MCP tools.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Performance | `pull_x_ads_performance` |
| List / observe | `list_campaigns`, `get_campaign_observation` |
| Budget / pause | `update_campaign_budget`, `pause_campaign` |
| Audiences | `list_audiences`, `sync_audience`, `attach_audience` |

## Operator loop

1. **Read** — filter by campaign_id when inspecting specific lines.
2. **Diagnose** — CPA/CTR vs creative and targeting; propose holds vs kills (`kill-scale-rules`).
3. **Propose** — budget or pause changes only after human approve.
4. **Gate** — `campaign-preflight` + `launch-gates` before enable.

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

