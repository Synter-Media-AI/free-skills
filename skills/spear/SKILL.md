---
name: spear
description: SPEAR loop for any non-trivial agent task — Scope, Plan, Execute, Assess, Resolve. Prevents the strong-start-weak-finish failure mode by forcing an explicit MECE rubric and a Plan→Execute→Assess inner loop until the rubric passes.
---

# SPEAR — Management Framework for Agent Runs

> **Source:** Ryan Waliany, *Introducing SPEAR: The Management Framework for AI* (May 2026).
> **One-line summary:** Standard PM phases (initiate, plan, execute, monitor, close) compressed for the software factory.
> **Core insight:** The strong-start-weak-finish problem is a process problem, not a model problem. Skipping `Plan` or `Assess` is what makes agents feel unreliable.

## When to load this skill

Load BEFORE starting any task that has more than one acceptable answer or that the user will visibly inspect when you're done. That covers:

- Bug fixes that touch shared code (auth, runtime, tool registry)
- Any feature with user-visible behavior
- Anything where "looks good to me" is not a sufficient acceptance test
- Multi-step refactors, migrations, multi-platform launches
- Customer-facing artifacts (reports, landing pages, ad creatives, support replies)

Do NOT load this skill for: typo fixes, single-line config changes, pure reads, simple lookups.

## The five phases (gates, not checkboxes)

```diagram
╭───────╮   ╭──────╮   ╭─────────╮   ╭────────╮   ╭─────────╮
│ Scope │──▶│ Plan │──▶│ Execute │──▶│ Assess │──▶│ Resolve │
╰───────╯   ╰──┬───╯   ╰─────────╯   ╰───┬────╯   ╰─────────╯
               ▲                          │
               │       gap found          │
               ╰──────────────────────────╯
                  (narrow Plan to the gap,
                  rerun Execute + Assess)
```

| Phase | Gate passes when… | Typical artifact |
|-------|-------------------|------------------|
| **Scope** | Ambiguity has been surfaced and resolved. | A 1-paragraph problem statement + explicit non-goals + the success rubric (see below). |
| **Plan** | An ordered sequence of steps is visible and approved. | A numbered step list with file paths, the tool calls per step, and what each step changes. |
| **Execute** | The work completes (code written, tests run, artifact generated). | The diff, the generated artifact, or the tool output. |
| **Assess** | Result is scored against scope, plan, AND rubric. Every rubric item is 10/10. | A scored rubric table. Anything < 10 = fail. |
| **Resolve** | Assess passed. Hand off, report, clean up worktree, close ticket. | A short summary message + PR link + any follow-ups. |

The inner loop is `Plan → Execute → Assess`. If `Assess` fails, **narrow `Plan` to the gap** (do not re-plan the whole task) and re-run `Execute` + `Assess`. Repeat until the rubric holds.

## Designing the Assess rubric (the hardest part)

A rubric works when it is **MECE**:

- **Mutually exclusive** — items don't overlap. A failure on one item must be independent of every other. Overlap creates drift (you'll fix one and break another, then declare victory on a regression).
- **Collectively exhaustive** — items cover every dimension that has to pass. Gaps create false positives ("looks good" with a silent missing dimension).

Each item is scored **1–10**. Only **10/10 is a pass.** Anything else = the inner loop runs again, with the next round's rubric **stricter than the last**.

### How to author the rubric

1. Write the rubric BEFORE Execute, not after. Otherwise you grade what you produced, not what you needed.
2. Aim for 4–8 items. Fewer is usually wrong (too coarse). More is usually wrong (overlapping items).
3. Each item is a single observable fact: "X is true" / "X is present" / "X matches Y". Never aesthetics ("looks clean").
4. Ask "if I score this 10/10 and the user still complains, which item should have caught it?" — that's a missing item.
5. Ask "if both item A and item B fail together, is one of them the actual cause of the other?" — if yes, merge them or remove one.
6. For agent code changes the rubric almost always includes: behavior change verified by test, no regression in adjacent surfaces, types/build pass, observability added, no secret/PII leak, docs updated where contract changed.

## Worked example — applying SPEAR to a code task

See `examples/slack-bot-parity.md` for a full SPEAR run on the Phase 1 Slack-agent parity fix, including the MECE rubric, two inner-loop iterations, and Resolve.

## Anti-patterns that defeat SPEAR

| Anti-pattern | Why it breaks SPEAR | Correction |
|---|---|---|
| Writing the rubric after Execute | You'll grade the work you did, not the work needed. | Author rubric in Scope phase. |
| 1-item or vague rubric ("works correctly") | Not MECE — gaps everywhere. | Decompose into 4–8 observable items. |
| Passing on 8/10 or 9/10 | Same as not assessing. The author already wanted it to pass. | Only 10/10 = pass. |
| Re-planning from scratch when Assess fails | Wastes the cycles; loses what already worked. | Narrow Plan to the **gap** the rubric found. |
| Letting Execute run unbounded between assessments | You can't diagnose which step caused the failure. | Execute → Assess after each unit of work, not at the end of an hour. |
| Skipping Scope because "the user already said what they want" | The user said the symptom, not the system change. | Translate user request → problem statement + non-goals + rubric. |
| Skipping Assess because Execute "obviously worked" | This is the moment that produces support tickets. | Always Assess. The cost is 2–3 seconds; the savings are hours. |

## Time budgets

Same five phases, only the clock changes:

| Task size | Total time | Scope | Plan | Execute | Assess | Resolve |
|---|---|---|---|---|---|---|
| One-line fix | 30 s | 5 s | 5 s | 10 s | 5 s | 5 s |
| Bug fix in shared code | 5–15 min | 1 min | 1 min | 5–10 min | 2 min | 1 min |
| Feature PR | 1–4 hours | 5 min | 10 min | 60–180 min | 20 min | 15 min |
| Multi-PR epic | 1–5 days | 30 min | 1 hour | bulk of time | 1 hour per PR | 30 min |

If `Assess` keeps failing, the right move is almost always **shrink the scope** (move items to follow-up PRs), not loosen the rubric.

## How to combine with `spec-driven-dev` and `code-review`

| Skill | Owns |
|---|---|
| `spec-driven-dev` | The spec file in `docs/specs/`, Linear issue, branch naming, BHV entries. |
| `spear` | The *thinking* loop within a single run: rubric, Plan→Execute→Assess gate. |
| `code-review` | The final review pass before merge — runs `Assess` from a reviewer's POV. |

Order: `spec-driven-dev` (set up the spec) → `spear` (do the work) → `code-review` (independent assess from the reviewer angle).

## Output discipline

When applying SPEAR in a user-visible thread, surface only the **gates that just changed**, not every intermediate thought. Format:

```
**Scope:** <1 line>
**Rubric:** <4–8 bullets, observable items>
**Plan:** <numbered steps>
**Execute:** <what you did or the diff link>
**Assess:** <scored rubric table>
**Resolve:** <summary + next action>
```

Skip phases the user already approved. Show the rubric table fully on each `Assess` round so the user can spot a regression.
