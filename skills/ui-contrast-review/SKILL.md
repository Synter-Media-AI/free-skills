---
name: ui-contrast-review
description: Reviewing UI for light/dark contrast, readability, focus states, color-token drift, theme regressions.
---

# UI Contrast Review

Review UI surfaces for theme-driven readability and visibility failures.

## Primary Goal

Catch light-mode and dark-mode contrast regressions before they ship.

Prefer system fixes:

- shared tokens
- semantic color variables
- reusable component classes

Avoid one-off per-page color patches unless the issue is intentionally local.

## Review Workflow

1. Identify the target surfaces.
- page routes
- reusable components
- empty states
- tables
- dialogs
- badges
- charts
- forms

2. Check both themes.
- light theme
- dark theme
- hover / active / disabled / selected states
- focus rings and keyboard focus visibility

3. Inspect the highest-risk UI pairs.
- body text vs background
- muted text vs card background
- button label vs button fill
- border vs surrounding surface
- placeholder text vs input background
- badge text vs badge fill
- link text vs surrounding paragraph
- chart lines/bars vs canvas background
- toast/alert text vs status fill

4. Look for token drift.
- hard-coded Tailwind colors mixed with semantic theme tokens
- `text-muted-foreground` on surfaces that are already muted
- `border-white/10` or `border-black/10` used in the wrong theme
- color combinations that only work in one theme

5. Recommend the smallest durable fix.
- first choice: theme variable / semantic token
- second choice: shared component class
- last choice: local page override

## Minimum Contrast Standard

Use WCAG AA as the baseline heuristic:

- normal text: aim for 4.5:1 or better
- large text: aim for 3:1 or better
- UI boundaries and focus indicators: visibly distinct without requiring hover

When exact ratios are not available, make a practical engineering judgment:

- if text is even slightly hard to read in either theme, treat it as a bug
- if borders disappear into the background, treat it as a bug
- if disabled and secondary states become illegible, treat it as a bug

## Output Format

For each issue, provide:

- surface
- theme
- failing element
- why it fails
- preferred fix
- file/component reference when available

Use this structure:

```md
Findings
1. [severity] Surface — issue
File: path/to/file.tsx
Theme: light|dark|both
Fix: semantic token or component-level change
```

If no issues are found, state that explicitly and mention what was checked.

## Good Fix Patterns

- replace hard-coded color with semantic token
- raise muted foreground contrast one step
- strengthen border token for light theme separately from dark theme
- give focus rings a dedicated accessible token
- ensure disabled text is still readable, not just low-opacity

## Avoid

- only checking dark mode
- only checking screenshots without interaction states
- fixing with arbitrary hex values when a shared token should exist
- shipping “looks okay on my screen” judgments without checking both themes

## Notes

When browser tooling is available, review the real rendered UI.

When browser tooling is not available, inspect:

- route components
- shared UI primitives
- Tailwind utility usage
- CSS variables / theme tokens

Start with the shared primitives if the same contrast problem appears in multiple pages.


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
