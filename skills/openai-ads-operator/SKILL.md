---
name: openai-ads-operator
description: Operate OpenAI / ChatGPT Ads via Synter MCP — pull OpenAI Ads performance and hand off to ChatGPT Ads launch/measurement skills with human approve ≠ activate. Use when managing ChatGPT Ads or OpenAI Ads reporting through Synter.
---

# OpenAI / ChatGPT Ads Operator (Synter MCP)

Operate OpenAI Ads (ChatGPT Ads) with Synter MCP for live reporting, and use the ChatGPT Ads skills for workbook launch workflows.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Performance | `pull_openai_ads_performance` |
| List / observe | `list_campaigns`, `get_campaign_observation` |
| Budget / pause | `update_campaign_budget`, `pause_campaign` |

## Operator loop

1. **Build** — use `chatgpt-ads-launch` for the 9-step workbook (context hints ≠ keywords).
2. **Measure** — use `chatgpt-ads-conversion-tracking` for Pixel vs CAPI rollout (scale-phase).
3. **Read live** — `pull_openai_ads_performance` once the account is OAuth’d in Synter.
4. **Gate** — never upload or enable without human review of claims, URLs, and images.

## Related skills

`chatgpt-ads-launch`, `chatgpt-ads-conversion-tracking`, `ad-policy-compliance`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

