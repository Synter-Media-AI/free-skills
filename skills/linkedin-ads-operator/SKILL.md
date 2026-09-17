---
name: linkedin-ads-operator
description: Operate LinkedIn Ads via Synter MCP — pull performance and company engagement, sync matched audiences, and stage B2B campaign changes with human approve ≠ activate. Use when running LinkedIn ABM, Lead Gen, or LinkedIn budget ops through Synter.
---

# LinkedIn Ads Operator (Synter MCP)

Operate LinkedIn Ads through Synter MCP for B2B / ABM workflows.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Performance | `pull_linkedin_ads_performance` |
| Company engagement | `pull_linkedin_company_engagement` |
| Audiences | `list_audiences`, `sync_audience`, `attach_audience`, `build_abm_audience` |
| Budget / pause | `update_campaign_budget`, `pause_campaign` |

## Operator loop

1. **Read** — campaign CPA/CPL and company engagement for ABM signal.
2. **Audience** — sync or attach matched audiences; keep lists fresh.
3. **Propose** — bid/budget or creative changes as drafts only.
4. **Gate** — `campaign-preflight` + `launch-gates` before enable.

## Related skills

`linkedin-ads-targeting`, `audience-expansion-strategy`, `media-plan-builder`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

