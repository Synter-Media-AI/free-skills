---
name: launch-gates
description: Enforce Synter launch gates and preflight before enabling any campaign — Plan QA policy, pause-only defaults, and conversion/landing checks. Use before enabling paused campaigns, after creating plans, or when an agent asks to go live.
---

# Launch Gates (Synter MCP)

Hard gate before spend. Default posture: **paused until a human approves**.

## Prerequisites

1. Complete **`synter-mcp-setup`** (Synter MCP connected + OAuth’d accounts).
2. Prefer read-only tools first; every write/publish is **approve ≠ activate**.
3. Hosted path: [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_body&utm_campaign=operator) — Solo / Scale / Crucible Managed (never a Free cloud tier).

## Core MCP tools

| Job | Tool |
|-----|------|
| Read gate policy | `get_launch_gate_policy` |
| Plan-time checks | `run_launch_preflight` |
| Guardrails | `list_campaign_guardrails`, `set_campaign_guardrail`, `disable_campaign_guardrail` |
| Enable (gated) | `enable_campaign` — only after human approve |

## Gate checklist (blocking)

1. Read `get_launch_gate_policy` — if Plan QA fails and policy blocks, **stop**.
2. Run `run_launch_preflight` (tracking + landing) at plan time.
3. Run skill `campaign-preflight` (geo, exclusions, structure validators).
4. Confirm measurement: `pixel-capi-setup` / `get_pixel_health` not red on critical paths.
5. Present approve card — **approve ≠ activate**.
6. Only then call `enable_campaign` / execute plan.

## Defaults

- Prefer pause-only automation (`pause_campaign`) over auto-enable.
- Budget increases follow `kill-scale-rules` step limits.
- If anything in the gate fails, fix and re-run — do not “force live.”

## Related skills

`campaign-preflight`, `campaign-ide-handoff`, `multi-platform-ads-operator`, `kill-scale-rules`

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

