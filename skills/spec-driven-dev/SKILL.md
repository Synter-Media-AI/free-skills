---
name: spec-driven-dev
description: Spec-driven dev workflow. Invoke before implementing any feature or fixing any bug — spec lookup, clarifications, plan approval.
---

# Spec-Driven Development Workflow

## Step 1: Spec Lookup

Check for an existing spec:
- PRs: `docs/specs/history/prs/YYYY-MM/PR-<number>.md`
- Bugs: `docs/specs/bugs/ledger.md`
- Baseline: `docs/specs/baseline/<capability>/`

If no spec exists, tell the user and create one from the template
at `docs/specs/templates/pr-spec.md`.

## Step 2: Ambiguity Check

Evaluate the request:
- [ ] Expected behavior is defined with concrete inputs/outputs
- [ ] Error cases and edge cases are specified
- [ ] Scope is clear — which files change, which don't
- [ ] There is only one reasonable implementation approach

If ANY box is unchecked, ask clarifying questions before proceeding.

## Step 3: Clarifying Questions

Group your questions:

**Behavior:** What should happen when X? What's the output for Y?
**Scope:** Should this affect Z? Is this limited to one component?
**Architecture:** New agent tool or extend existing? DB migration needed?
**Testing:** What assertions prove this works?

## Step 4: Define Behavior Changes

Create BHV-AREA-NNN entries in the spec file:
- AREA = category code (AGENT, AUTH, IDE, CONN, ADS, PPC, BILLING, WS,
  ONBOARD, REPORT, MCP, SEC, UI, INFRA, CREATIVE)
- NNN = sequential number within that area
- Fill in Before / After columns
- Set Status to UNVERIFIED initially

## Step 5: Architecture Diagram Check

Check if this change affects system architecture:
- Does it add a new service or component?
- Does it change data flow between existing components?
- Does it modify database relationships?
- Does it add a new integration path?

If yes, check `docs/specs/architecture/` for a relevant diagram.
Update it or create a new one using `docs/specs/templates/architecture-diagram.md`.

Existing diagrams:
- `system-context.md` — top-level service map
- `agent-lifecycle.md` — agent state machine
- `auth-flows.md` — login and signup paths
- `conn-oauth-flow.md` — platform OAuth sequence
- `billing-credit-flow.md` — credit allocation and consumption
- `ws-multitenancy.md` — workspace isolation ER diagram
- `ads-campaign-creation.md` — campaign creation flow
- `mcp-transport.md` — MCP server transport architecture

## Step 6: Implementation Plan

Present:
- Files to create or modify (with paths)
- Expected behavior after implementation
- What will NOT change
- Diagrams to update (if any)
- Test plan

Wait for explicit approval before writing code.

## Step 7: Implement and Update Spec

After coding:
1. Update Status column: UNVERIFIED → MATCH or MISMATCH
2. Add test evidence to the spec
3. Update docs/specs/bugs/ledger.md if bugs were found or fixed
4. Update architecture diagrams if data flow changed
5. Stage all spec files with your code: `git add docs/specs/...`

## If the user says "just do it" or "skip the spec"

Say: "I want to build exactly what you need. Two quick
questions to make sure I get it right." Then ask only
the most critical clarification questions.


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
