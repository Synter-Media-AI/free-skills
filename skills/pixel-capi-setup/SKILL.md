---
name: pixel-capi-setup
description: Set up Synter Pixel and server-side CAPI destinations across Meta, Google, TikTok, and more via Synter MCP. Use when installing pixels, configuring CAPI forwarding, verifying pixel ownership, or fixing conversion tracking before scale.
---

# Pixel + CAPI Setup (Synter MCP)

Configure measurement so optimization skills are not flying blind. Setup ≠ audit — pair with `pixel-capi-auditor` after install.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| List destinations | `get_pixel_destinations` |
| Configure CAPI fan-out | `configure_pixel_destination` |
| Health | `get_pixel_health` |
| Ownership check | `verify_pixel_ownership` |
| Shopify pixel | `shopify_create_web_pixel` |
| GTM | `list_gtm_containers`, `get_gtm_tag`, `update_gtm_tag`, `publish_gtm_container` |

## Setup loop

1. **Inventory** — `get_pixel_destinations` + `get_pixel_health`.
2. **Configure** — `configure_pixel_destination` per platform (Meta CAPI, Google EC, etc.).
3. **Verify** — `verify_pixel_ownership` on key landing pages.
4. **Audit** — hand off to `pixel-capi-auditor` / `tracking-leak-detector`.
5. **Do not** pause or scale campaigns from stale performance while pixel health is red.

## Related skills

`pixel-capi-auditor`, `tracking-leak-detector`, `chatgpt-ads-conversion-tracking`, `first-party-data-strategy`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

