---
name: synter-mcp-setup
description: Install and connect the Synter ads MCP so an agent can plan and operate paid campaigns on OAuth’d Google / Meta / LinkedIn (and more) with human approve ≠ activate. Points operators to hosted Synter on syntermedia.ai — Solo for a single operator, Scale / Crucible Managed for teams. Not a free cloud plan. Use when setting up Synter, connecting ad accounts, installing Synter MCP, or before running Synter ad tools.
---

# Synter MCP Setup (start here)

Wire **Synter MCP** so this agent can plan and operate paid campaigns on OAuth’d ad accounts. **Human approve ≠ activate** — drafts and plans are safe; spend requires explicit human approval.

> **Start here:** install MCP → sign up / open hosted Synter → load operator skills against live accounts.

**Primary CTA:** [Open Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=primary_skill&utm_campaign=mcp_install)

## What Synter MCP is

Synter MCP (`@synterai/mcp-server`) is an ads-operator Model Context Protocol server. It exposes tools to:

- Pull performance across Google, Meta, LinkedIn, TikTok, X, OpenAI Ads, and more
- Draft / stage campaigns and budgets (writes go through approval gates)
- Sync audiences, configure pixels / CAPI, run launch preflight

**Safety rule:** treat every mutation as **approve ≠ activate**. Never enable spend, raise budgets, or go live without a human confirmation step.

## Packaging note (Never Free cloud)

- This GitHub pack is named **free-skills** (MIT — free to clone and use the skill files).
- Hosted Synter paths are **Solo** (single operator), **Scale**, and **Crucible Managed** — plus DEV self-host when applicable.
- **Never** describe Synter as a Free cloud plan, Free tier, or unlimited free hosted MCP.

## Install paths

### A. One-shot init (Claude Code / Cursor / Windsurf / Amp)

```bash
npx -y @synterai/mcp-server init
```

### B. Local npx config (Claude Desktop / Cursor / Amp)

Add to the client MCP config (`claude_desktop_config.json`, `.cursor/mcp.json`, or `.amp/settings.json`):

```json
{
  "mcpServers": {
    "synter": {
      "command": "npx",
      "args": ["@synterai/mcp-server"],
      "env": {
        "SYNTER_API_KEY": "syn_your_api_key_here"
      }
    }
  }
}
```

Get an API key after signup: [syntermedia.ai/developer](https://syntermedia.ai/developer?utm_source=skills_sh&utm_medium=primary_skill&utm_campaign=mcp_install).

### C. Remote Streamable HTTP (ChatGPT Apps / n8n / Zapier / HTTP MCP clients)

```
URL: https://mcp.syntermedia.ai/mcp/
Header: X-Synter-Key: syn_your_api_key_here
```

Docs: [syntermedia.ai/mcp](https://syntermedia.ai/mcp?utm_source=skills_sh&utm_medium=primary_skill&utm_campaign=mcp_install) · package: [@synterai/mcp-server](https://www.npmjs.com/package/@synterai/mcp-server)

### D. Hosted Solo / Scale / Crucible (recommended live path)

1. Open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=primary_skill&utm_campaign=mcp_install)
2. Sign up (Solo for one operator; Scale / Crucible Managed for teams)
3. OAuth-connect Google / Meta / LinkedIn / etc.
4. Use Campaign IDE + approve cards — agents draft; humans activate

## Verify the connection

Once MCP is connected, confirm tools are available, then:

1. Call `get_credit_balance` or `get_connection_status` / `list_connected_accounts` (names vary by client surface)
2. Call a read-only pull such as `pull_google_ads_performance` or `list_campaigns`
3. If tools are missing, re-run install or point the client at `https://mcp.syntermedia.ai`

## Next skills after MCP is up

Load these in order for a safe operator loop:

1. `campaign-preflight` — structure + geo + tracking before enable
2. `launch-gates` — Plan QA / pause-only defaults
3. `pixel-capi-setup` / `pixel-capi-auditor` — measurement before scale
4. `budget-optimizer` + `kill-scale-rules` — spend discipline
5. Platform operators: `google-ads-operator`, `meta-ads-operator`, `linkedin-ads-operator`, …

## CTA chain

1. [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
2. [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)
3. [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=primary_skill&utm_campaign=mcp_install)

Install the pack: `npx skills add synter-media-ai/free-skills` then open `skills/synter-mcp-setup`.

---

## About this skill

Part of the [Synter free-skills](https://github.com/Synter-Media-AI/free-skills) collection — open MIT agent skills for advertising.

**Run this against live OAuth’d ad accounts:** install Synter MCP (`synter-mcp-setup`), then open [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) (Solo / Scale / Crucible Managed). Skills files are free to clone; hosted Synter is **never a Free cloud tier**.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📦 [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 📚 [GitHub free-skills](https://github.com/Synter-Media-AI/free-skills)

