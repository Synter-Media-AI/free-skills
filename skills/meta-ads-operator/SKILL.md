---
name: meta-ads-operator
description: Operate Meta (Facebook/Instagram) Ads via Synter MCP — pull performance, create/draft ads, and stage budget or creative changes with human approve ≠ activate. Use when diagnosing Learning Phase, creative fatigue, Advantage+, or Meta campaign ops through Synter.
---

# Meta Ads Operator (Synter MCP)

Operate Meta Ads through Synter MCP tools on OAuth’d ad accounts.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Performance | `pull_meta_ads_performance` |
| Create ad (draft/write) | `meta_ads_create_ad` |
| List / observe | `list_campaigns`, `get_campaign_observation`, `get_ad_readback` |
| Budget / pause | `update_campaign_budget`, `pause_campaign` |
| Pixel health | `get_pixel_health`, `verify_pixel_ownership` |

## Operator loop

1. **Read** — last 7–14 days performance; flag CPA spikes and learning-limited ad sets.
2. **Creative** — check fatigue / frequency; propose new creatives (see `meta-ads-diagnostics`, `ad-creative-fatigue-detector`).
3. **Draft** — use `meta_ads_create_ad` only into existing ad sets; leave paused until human approve.
4. **Measurement** — confirm Pixel + CAPI via `pixel-capi-setup` / `pixel-capi-auditor`.
5. **Gate** — `campaign-preflight` + `launch-gates` before enable.

## Related skills

`meta-ads-diagnostics`, `ad-creative-fatigue-detector`, `creative-testing`, `pixel-capi-auditor`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

