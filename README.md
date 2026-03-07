# Free Skills for AI Advertising & Marketing

The largest open-source collection of AI agent skills for advertising, PPC, and marketing automation. **35 skills** covering every major ad platform and workflow.

Drop them into your `.agents/skills/` folder and use them with any AI coding agent. All skills are also built into [Synter](https://syntermedia.ai) — no setup needed.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Skills Count](https://img.shields.io/badge/skills-35-blue.svg)](#available-skills)

---

## Available Skills

### 📊 Measurement & Attribution

| Skill | Description |
|-------|-------------|
| [attribution-modeling](skills/attribution-modeling) | Multi-touch attribution models (first-touch, last-touch, linear, time-decay, position-based, data-driven, Markov chain) |
| [incrementality-testing](skills/incrementality-testing) | Geo holdout tests, conversion lift studies, ghost ads, statistical significance for ad impact measurement |
| [roas-calculator](skills/roas-calculator) | Calculate ROAS, CPA, and campaign profitability metrics |
| [anomaly-detector](skills/anomaly-detector) | Statistical anomaly detection in campaign metrics (Z-score, IQR) with automated alert thresholds |

### 🎯 Platform-Specific Optimization

| Skill | Description |
|-------|-------------|
| [meta-ads-diagnostics](skills/meta-ads-diagnostics) | Learning Phase diagnosis, Breakdown Effect analysis, creative fatigue detection, Advantage+ optimization |
| [performance-max-optimizer](skills/performance-max-optimizer) | PMax asset group optimization, search term insights, audience signals, channel allocation analysis |
| [google-ads-quality-score](skills/google-ads-quality-score) | Quality Score improvement playbooks (Expected CTR, Ad Relevance, Landing Page Experience) with GAQL queries |
| [google-shopping-optimizer](skills/google-shopping-optimizer) | Product feed optimization, Merchant Center diagnostics, disapproval fixing, custom label strategies |
| [linkedin-ads-targeting](skills/linkedin-ads-targeting) | B2B targeting strategy, ABM setup, Lead Gen Forms, Matched Audiences, cost benchmarks |
| [amazon-ads-optimizer](skills/amazon-ads-optimizer) | Sponsored Products/Brands/Display optimization, ACOS/TACOS analysis, search term mining |

### 🏗️ Account Structure & Hygiene

| Skill | Description |
|-------|-------------|
| [campaign-structure-auditor](skills/campaign-structure-auditor) | Account structure review, duplicate keyword detection, match type audit, naming convention enforcement |
| [negative-keyword-miner](skills/negative-keyword-miner) | Search term report analysis, AI categorization, negative list management with industry templates |
| [campaign-preflight](skills/campaign-preflight) | Pre-launch checks for geo targeting, exclusion lists, tracking setup, and budget settings |

### 🎨 Creative & Content

| Skill | Description |
|-------|-------------|
| [ad-copy-generation](skills/ad-copy-generation) | Generate RSA headlines, descriptions, and ad variations for Google, Meta, LinkedIn, and more |
| [ugc-creative-brief](skills/ugc-creative-brief) | UGC creator briefs with hook formulas, shot lists, platform specs, and AI tool comparison |
| [video-ad-scriptwriter](skills/video-ad-scriptwriter) | Platform-specific video scripts: 6s bumpers, 15s pre-roll, 30s narrative, TikTok native hooks |
| [ad-creative-fatigue-detector](skills/ad-creative-fatigue-detector) | Frequency vs CTR decay analysis, creative lifespan prediction, refresh strategy recommendations |
| [creative-testing](skills/creative-testing) | Cross-platform creative A/B testing with statistical significance analysis |

### 💰 Budget & Planning

| Skill | Description |
|-------|-------------|
| [budget-optimizer](skills/budget-optimizer) | Cross-platform budget reallocation based on ROAS across 9+ ad platforms |
| [bid-optimization](skills/bid-optimization) | Bid adjustment recommendations for CPC, day-parting, device modifiers, and audience strategies |
| [media-plan-builder](skills/media-plan-builder) | Full media plan creation: channel mix, budget allocation, CPM/CPC projections, reach estimates |
| [dayparting-scheduler](skills/dayparting-scheduler) | Hour-of-day and day-of-week bid scheduling with heat map analysis and modifier calculations |
| [seasonal-budget-planner](skills/seasonal-budget-planner) | Holiday season budget scaling, CPM inflation forecasting, pre-season → peak → post-season strategy |

### 🔎 Research & Analysis

| Skill | Description |
|-------|-------------|
| [keyword-research](skills/keyword-research) | Discover high-intent keywords via Google Keyword Planner with competition analysis |
| [competitor-analysis](skills/competitor-analysis) | Analyze competitor ads using Facebook Ads Library and auction insights |
| [audience-expansion-strategy](skills/audience-expansion-strategy) | Lookalike audiences, seed quality optimization, audience layering, platform-specific features |

### ⚙️ Tracking & Data

| Skill | Description |
|-------|-------------|
| [pixel-capi-auditor](skills/pixel-capi-auditor) | Audit Meta Pixel + CAPI, Google Enhanced Conversions, TikTok/LinkedIn/Reddit server-side tracking |
| [utm-builder](skills/utm-builder) | Generate UTM-tagged URLs for campaign tracking with bulk generation and naming conventions |
| [first-party-data-strategy](skills/first-party-data-strategy) | Post-cookie data strategy: Enhanced Conversions, server-side tracking, Consent Mode v2, CDPs |
| [landing-page-optimizer](skills/landing-page-optimizer) | Above-the-fold optimization, message match scoring, form optimization, page speed impact |

### 📈 Reporting

| Skill | Description |
|-------|-------------|
| [multi-channel-reporting](skills/multi-channel-reporting) | Cross-channel performance reports and executive summaries across all platforms |
| [executive-reporting](skills/executive-reporting) | C-suite report templates with narrative insights, YoY/MoM comparisons, and visualization guidance |

### 🛡️ Compliance & Policy

| Skill | Description |
|-------|-------------|
| [ad-policy-compliance](skills/ad-policy-compliance) | Platform policy checklists (Google, Meta, LinkedIn, TikTok, Reddit) with industry-specific rules |

### 🔄 Campaign Execution

| Skill | Description |
|-------|-------------|
| [cross-platform-launcher](skills/cross-platform-launcher) | Deploy campaigns to multiple ad platforms simultaneously |
| [retargeting-sequence-designer](skills/retargeting-sequence-designer) | Multi-stage retargeting funnels with sequential messaging, frequency caps, and exclusion lists |

---

## Installation

### Option 1: Copy individual skills

```bash
# Copy a single skill into your project
cp -r skills/attribution-modeling \
  your-project/.agents/skills/attribution-modeling
```

### Option 2: Copy all skills

```bash
# Copy all 35 skills at once
cp -r skills/* your-project/.agents/skills/
```

### Option 3: Use in Synter (no setup needed)

All skills are built into [Synter](https://syntermedia.ai). Just sign up and ask the AI agent:

- *"Calculate my ROAS for last month's campaigns"*
- *"Audit my Google Ads account structure"*
- *"Design a retargeting funnel for my e-commerce site"*
- *"Build a media plan for Q2 with $50k budget"*
- *"Check if my Meta Pixel and CAPI are set up correctly"*

---

## How Skills Work

Skills are instruction files (`SKILL.md`) that teach AI coding agents how to perform specific tasks. Each skill has:

- **Frontmatter** — name and description (used for auto-matching)
- **Instructions** — step-by-step workflows the agent follows
- **Reference Data** — formulas, benchmarks, industry data
- **Examples** — sample commands, scripts, and expected outputs

When you place a skill in `.agents/skills/<name>/SKILL.md`, Synter automatically loads it when your request matches the skill's description.

```
your-project/
├── .agents/
│   └── skills/
│       ├── attribution-modeling/
│       │   └── SKILL.md
│       ├── meta-ads-diagnostics/
│       │   └── SKILL.md
│       ├── performance-max-optimizer/
│       │   └── SKILL.md
│       └── ... (35 skills)
├── src/
└── ...
```

---

## What Makes This Collection Different

- **Platform-specific depth** — Not generic "marketing tips." Real GAQL queries, API payloads, and platform mechanics.
- **Professional-grade** — Built by practitioners who manage real ad spend across Google, Meta, LinkedIn, Amazon, TikTok, and Reddit.
- **Interconnected** — Skills reference each other (e.g., `budget-optimizer` → `roas-calculator` → `dayparting-scheduler`).
- **Actionable formulas** — Includes Python code, SQL queries, statistical tests, and calculation templates you can use immediately.

---

## Contributing

Have a useful marketing or advertising skill? Open a PR! Each skill should include:

- `SKILL.md` with frontmatter (`name`, `description`)
- Clear workflows and examples
- No hardcoded credentials or API keys
- Generic approach (not tied to a specific product)

---

## License

MIT

Built by [Synter](https://syntermedia.ai) — AI Agent Media Buyers for advertising.
