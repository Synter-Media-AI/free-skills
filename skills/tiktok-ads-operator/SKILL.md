---
name: tiktok-ads-operator
description: Operate TikTok Ads via Synter MCP — list campaigns/ad groups/ads, pull insights, and stage targeting or budget updates with human approve ≠ activate. Use when managing TikTok campaigns or creative performance through Synter.
---

# TikTok Ads Operator (Synter MCP)

Operate TikTok Ads through Synter MCP tools.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Performance | `pull_tiktok_ads_performance`, `tiktok_ads_get_insights` |
| Read config | `tiktok_ads_get_campaign`, `tiktok_ads_get_ad_groups`, `tiktok_ads_get_adgroup`, `tiktok_ads_get_ads` |
| Update ad group | `tiktok_ads_update_adgroup` |
| Budget / pause | `update_campaign_budget`, `pause_campaign` |

## Operator loop

1. **Read** — insights + video engagement; flag high-spend low-conversion ad groups.
2. **Inspect** — fetch campaign / ad group config before edits.
3. **Propose** — status, budget, geo, age, or audience changes; await human approve.
4. **Gate** — `campaign-preflight` + `launch-gates` before enable.

## Related skills

`video-ad-scriptwriter`, `ugc-creative-brief`, `kill-scale-rules`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

