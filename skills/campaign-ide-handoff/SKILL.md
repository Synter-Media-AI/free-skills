---
name: campaign-ide-handoff
description: Open or import campaigns into Synter Campaign IDE, draft plans on the canvas, and hand off for human approve ≠ activate. Use when planning in Campaign IDE, importing live campaigns into Synter UI, or moving from agent draft to human approval.
---

# Campaign IDE Handoff (Synter MCP)

Move work from agent chat into Synter **Campaign IDE** so humans can review on a card before any spend.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Import live campaign | `create_campaign_import` |
| Plan document | `create_campaign_plan`, `get_campaign_plan`, `publish_plan_document` |
| Approve / execute | `approve_campaign_plan`, `execute_campaign_plan`, `get_plan_execution` |
| Observe | `get_campaign_observation`, `get_ad_readback` |

## Workflow

1. If the campaign already lives on a platform, `create_campaign_import` into `/campaigns/ide/<uuid>`.
2. Draft or update the plan with `create_campaign_plan` (idempotent `plan_key`).
3. Present the IDE / approve card to a human — **never auto-spend**.
4. Only after approval, `execute_campaign_plan` / enable via gated tools.
5. Cross-link `launch-gates` and `campaign-preflight` before go-live.

## Related skills

`multi-platform-ads-operator`, `launch-gates`, `synter-mcp-setup`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

