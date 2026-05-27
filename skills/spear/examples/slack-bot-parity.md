# SPEAR worked example — SYN-2119 (Slack agent reports "0 campaigns")

A live application of the `spear` skill to a real bug fix. Reference this when you need to see the loop running on a code task that's ~30 min wall-clock and crosses a shared library + multiple call sites.

---

## Scope

**Problem statement.** The Slack agent replies "0 active campaigns / $0 spend across all connected platforms" even when the user has active campaigns on Google, Meta, LinkedIn, and Reddit. The native web agent does not have this problem.

**Root cause.** The Slack adapter (`apps/web/src/lib/slack-bot.ts → callAgent`) calls `runAgentWithTools` with `selectedAccounts = new Map()` (empty — there is no Slack UI to pick accounts). `buildAgentContext` always passes `requireSelection: true` to `filterConnectionsBySelectedAccounts`, which returns `[]` for an empty selection. The agent's system prompt then lists zero connected platforms, and the model truthfully reports "no campaigns."

**Non-goals (out of scope for this PR).**
- Phase 2 — proactive alert subscriptions in Slack.
- Phase 3 — scheduled reports + autonomous-action Slack approvals.
- Adding a `/synter use account <name>` slash command (future Slack account-picker UX).

---

## Rubric (authored before Execute — MECE, 1–10 each, only 10 passes)

| # | Item | Pass = 10/10 means |
|---|------|---------------------|
| R1 | `buildAgentContext` accepts `requireAccountSelection?: boolean` defaulting to `surface === "web"`. | Param exists in `BuildContextParams`; web behavior unchanged. |
| R2 | An exported pure helper resolves the default rule, isolated for unit testing. | `resolveRequireAccountSelection(surface, override?)` exported and covered. |
| R3 | `runAgentConversation` and `runAgentWithTools` forward the flag through. | New optional field on `RunAgentParams`; forwarded to `buildAgentContext`. |
| R4 | Slack and Plain adapters inherit the safe default — no explicit `true` anywhere in those files. | `grep` confirms no caller passes `requireAccountSelection: true` outside web routes. |
| R5 | Web route hard boundary preserved. | `apps/web/src/app/api/agent/chat/route.ts` unchanged; existing `requireSelection: true` call sites in campaign-agent routes unchanged. |
| R6 | Tests for the defaulting rule are green. | New `build-context.test.ts` passes; 7 cases cover both defaults + 5 override variants. |
| R7 | No regression in the runtime test suite. | `pnpm test -- src/lib/agent/runtime` → all suites green. |
| R8 | Type-check passes on changed files. | `npx tsc --noEmit` → 0 errors. |

---

## Plan

1. `build-context.ts` — add `requireAccountSelection?: boolean` to `BuildContextParams`. Extract a pure helper `resolveRequireAccountSelection(surface, override?)` so the defaulting rule is unit-testable. Replace hardcoded `requireSelection: true` in the `filterBySelected` call with the resolved value.
2. `run-agent.ts` — add the same optional field to `RunAgentParams`; destructure and forward to `buildAgentContext`. No behavior change for callers that don't pass it.
3. No edits to `slack-bot.ts`, `plain/agent-responder.ts`, or `app/api/agent/chat/route.ts`. They get the correct default for free.
4. New test file `build-context.test.ts` exercising 7 cases on `resolveRequireAccountSelection`.
5. Run `pnpm test -- src/lib/agent/runtime` and `npx tsc --noEmit`.
6. `grep` for any remaining `requireSelection: true` in agent runtime to confirm no leftover hardcoded gates.

---

## Execute

Files changed (full diff in PR):

| File | Lines | Change |
|------|-------|--------|
| `apps/web/src/lib/agent/runtime/build-context.ts` | +46 / -1 | New pure helper, new param, defaulting wired into the `filterBySelected` call. |
| `apps/web/src/lib/agent/runtime/run-agent.ts` | +9 / 0 | Optional pass-through field. |
| `apps/web/src/lib/agent/runtime/build-context.test.ts` | +52 (new) | 7 unit tests on the defaulting rule. |

---

## Assess — Round 1

| # | Item | Round 1 score | Notes |
|---|------|---------------|-------|
| R1 | Param added, web default preserved. | 10 | Type + comment in place. |
| R2 | Pure helper exported. | 10 | `resolveRequireAccountSelection`. |
| R3 | Runtime forwards the flag. | 10 | Destructure + pass-through verified by reading diff. |
| R4 | No hardcoded `true` in Slack/Plain. | 10 | `grep` shows the 3 remaining `requireSelection: true` are all in `app/api/campaigns/[id]/agents/...` web routes + 1 in `app/api/internal/agent-worker/...` web route. Slack and Plain are clean. |
| R5 | Web hard boundary preserved. | 10 | `app/api/agent/chat/route.ts` unchanged; campaign-agent routes still pass `true` explicitly. |
| R6 | New unit tests pass. | 10 | `pnpm test -- build-context.test.ts` → 7/7 passed in 4ms. |
| R7 | Runtime suite green. | 10 | 17 files, 199 tests, all passed. |
| R8 | Type-check clean. | 10 | `npx tsc --noEmit` → 0 errors total. |

All 8 items at 10/10 on round 1. No inner loop needed.

---

## Resolve

- Linear: SYN-2119, priority High.
- Branch: `fix/SYN-2119-slack-agent-require-selection`.
- PR title: `fix(agent): SYN-2119 — default requireSelection per surface so Slack sees connected platforms`.
- Follow-ups (NOT in this PR, to be tracked separately):
  - SYN-2120 — Phase 2: per-user alert subscriptions + `/synter alerts` slash command.
  - SYN-2121 — Phase 3: scheduled reports tied to slack_user_id/channel + autonomous-operator approval cards.
  - SYN-2122 — Optional: surface the "no selection → all accounts" choice in Slack via a Home Tab account picker, so users on multi-tenant Slack installs can scope explicitly when they want to.

---

## What this example teaches

- **The rubric was the smallest object that mattered.** Each item is independently observable (R6 cannot pass while R4 fails, etc.). No overlap, no gaps.
- **The pure helper (R2) existed only to make Assess cheap.** Without it, every R6 test would have to boot the full system-prompt pipeline (Anthropic SDK, Prisma, taxonomy, memory). Extracting one function turned a 30-minute test into a 4 ms one.
- **No inner loop fired** because the rubric was authored before Execute. That is the most common shape of a successful SPEAR run on a small fix: one-shot pass when the gates were drawn correctly up front.
- **When Assess fails (not here, but generally), the right move is to narrow Plan to the specific failed item — not to re-plan the whole task.** That's what keeps the loop converging instead of oscillating.
