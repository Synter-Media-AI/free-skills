# SPEAR worked example — agent reports "0 records" when records exist

A 1-page demonstration of the SPEAR loop applied to a real-feeling agent bug.
Use it as a template; nothing here is product-specific.

## Setup

A chat agent is exposed in two places:

- **Surface A** (canonical web app): chooser UI lets the user pick which ad accounts to scope a query to.
- **Surface B** (Slack bot): no chooser UI — Slack just forwards the user's free-text message and an installation ID.

The shared agent code defaults to `requireSelection = true`, which short-circuits any query that doesn't carry an explicit account selection. Surface A passes the selection. Surface B can't, so every Slack query returns *"You haven't selected any accounts — please choose one."*

User-visible symptom: *"The Slack bot says I have 0 campaigns but the web app shows 47."*

---

## Scope

**Problem:** Slack surface always sees `requireSelection = true`, so it can never resolve to "all connected accounts." That's the actual failure, not "missing data."

**Non-goals (explicit):**
- Don't redesign the Slack UX to add an account picker (that's a separate future epic).
- Don't change the web behavior. Web works.
- Don't widen scope to other surfaces (CLI, API) in this PR.

**Success rubric (MECE, observable, all items must be 10/10):**

1. Slack queries without an explicit selection resolve against *all* connected accounts owned by the calling user.
2. Web queries continue to require explicit selection (no regression).
3. The default lives in one place (per-surface config) — not duplicated at every call site.
4. New unit test covers: Slack → no selection → returns aggregated result; Web → no selection → returns "please choose."
5. Existing test suite passes with no other changes.
6. No new credential, secret, or PII surface added.

---

## Plan

1. Introduce a per-surface config object: `{ surface: 'web' | 'slack' | 'cli', requireSelection: boolean }`. Default `requireSelection: true` for `web` and `cli`; `false` for `slack`.
2. Plumb the config into the single entry point that constructs the agent runtime per request.
3. Replace the hard-coded `requireSelection = true` literal with `config.requireSelection`.
4. Add two unit tests as described in rubric item 4.
5. Run the full test suite.

---

## Execute (round 1)

- Edited the runtime constructor and the call site in the Slack handler.
- Added the two unit tests.
- Ran tests.

```
PASS  test/agent/slack.spec.ts
PASS  test/agent/web.spec.ts
FAIL  test/agent/cli.spec.ts
  AssertionError: expected "please choose one" but got aggregated result
```

---

## Assess (round 1)

| # | Rubric item | Score | Notes |
|---|---|---|---|
| 1 | Slack returns aggregated result without selection | 10 | Verified by new test. |
| 2 | Web requires explicit selection | 10 | Existing test passes. |
| 3 | Default lives in one place | 10 | Config object; single source. |
| 4 | New unit tests cover both surfaces | 10 | Two passing tests. |
| 5 | Existing test suite passes | **3** | CLI surface regressed — see failure above. |
| 6 | No new credential/PII surface added | 10 | None added. |

**Gap:** CLI was implicitly relying on the old `true` default. The config object I added defaults CLI to `requireSelection: true`, but the CLI handler was constructing the runtime *without* passing a config, so it received whatever the constructor's default was — and I changed that default during refactor.

---

## Plan (round 2, narrowed to the gap)

1. Fix the CLI handler to pass `{ surface: 'cli' }` explicitly.
2. Tighten the runtime constructor to *require* the config object (no default) so this class of bug is impossible going forward.
3. Re-run the full suite.

---

## Execute (round 2)

- Made the config arg required (TypeScript compile error caught one more missed call site in a script — fixed that too).
- CLI handler now passes `{ surface: 'cli' }`.

```
PASS  test/agent/slack.spec.ts
PASS  test/agent/web.spec.ts
PASS  test/agent/cli.spec.ts
PASS  (all other suites)
```

---

## Assess (round 2)

| # | Rubric item | Score |
|---|---|---|
| 1 | Slack returns aggregated result without selection | 10 |
| 2 | Web requires explicit selection | 10 |
| 3 | Default lives in one place | 10 |
| 4 | New unit tests cover both surfaces | 10 |
| 5 | Existing test suite passes | 10 |
| 6 | No new credential/PII surface added | 10 |

All 10/10 → rubric passes.

---

## Resolve

- Opened PR with a 3-line description: bug, fix, test coverage.
- Linked the ticket; assigned it to AI code review (no human reviewer tagged).
- After merge: cleaned up the worktree, deleted the local branch.
- Logged a follow-up ticket for the future Slack account-picker UX (out of scope here, captured in Scope's non-goals).

---

## Why the framework helped here

- **Scope's non-goals** kept the PR from ballooning into "redesign Slack UX."
- **The rubric** forced item 5 (existing suite passes) to be a *separate* observable item — without it, the CLI regression would have shipped.
- **The narrowed Plan in round 2** kept the second iteration to two edits rather than a full re-design.
- **10/10-or-fail** stopped me from shipping a PR where item 5 was an 8/10.
