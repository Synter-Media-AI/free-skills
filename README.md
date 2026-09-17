# Free Skills for AI Advertising & Marketing

Open-source AI agent skills for advertising, PPC, and marketing automation. **60 skills** covering major ad platforms and workflows — led by **Synter MCP setup** so agents can run against live OAuth’d accounts.

**Start here → [`synter-mcp-setup`](skills/synter-mcp-setup) → [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_top&utm_campaign=free_skills)**

Drop skills into `.agents/skills/` for any AI coding agent, or install Synter MCP and use them on connected ad accounts. Skill files are MIT / free to clone; hosted Synter is **Solo / Scale / Crucible Managed** — **never a Free cloud tier**.

> 🚀 **Wire Synter MCP, then operate live accounts → [Open Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_top&utm_campaign=free_skills)** (Solo / Scale / talk to sales)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Skills Count](https://img.shields.io/badge/skills-60-blue.svg)](#available-skills)
[![skills.sh](https://skills.sh/b/synter-media-ai/free-skills)](https://skills.sh/Synter-Media-AI/free-skills)

**Owner page:** [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills) · **Repo:** [github.com/Synter-Media-AI/free-skills](https://github.com/Synter-Media-AI/free-skills) · **Install:** `npx skills add synter-media-ai/free-skills`

---

## Available Skills

### ⭐ Start here — Synter MCP

| Skill | Description |
|-------|-------------|
| [synter-mcp-setup](skills/synter-mcp-setup) | Install and connect the Synter ads MCP so an agent can plan and operate paid campaigns on OAuth’d Google / Meta / LinkedIn (and more) wit... |

### 🎛️ Synter MCP operators

| Skill | Description |
|-------|-------------|
| [google-ads-operator](skills/google-ads-operator) | Operate Google Ads via Synter MCP — pull performance, run GAQL, audit structure, and stage Search/PMax/Display changes with human approve... |
| [meta-ads-operator](skills/meta-ads-operator) | Operate Meta (Facebook/Instagram) Ads via Synter MCP — pull performance, create/draft ads, and stage budget or creative changes with huma... |
| [linkedin-ads-operator](skills/linkedin-ads-operator) | Operate LinkedIn Ads via Synter MCP — pull performance and company engagement, sync matched audiences, and stage B2B campaign changes wit... |
| [tiktok-ads-operator](skills/tiktok-ads-operator) | Operate TikTok Ads via Synter MCP — list campaigns/ad groups/ads, pull insights, and stage targeting or budget updates with human approve... |
| [x-ads-operator](skills/x-ads-operator) | Operate X (Twitter) Ads via Synter MCP — pull performance and stage campaign/budget changes with human approve ≠ activate. |
| [openai-ads-operator](skills/openai-ads-operator) | Operate OpenAI / ChatGPT Ads via Synter MCP — pull OpenAI Ads performance and hand off to ChatGPT Ads launch/measurement skills with huma... |
| [multi-platform-ads-operator](skills/multi-platform-ads-operator) | Plan and operate paid campaigns across multiple ad platforms via Synter MCP — create campaign plans, forecast, reconcile spend, and stage... |
| [campaign-ide-handoff](skills/campaign-ide-handoff) | Open or import campaigns into Synter Campaign IDE, draft plans on the canvas, and hand off for human approve ≠ activate. |
| [launch-gates](skills/launch-gates) | Enforce Synter launch gates and preflight before enabling any campaign — Plan QA policy, pause-only defaults, and conversion/landing checks. |
| [pixel-capi-setup](skills/pixel-capi-setup) | Set up Synter Pixel and server-side CAPI destinations across Meta, Google, TikTok, and more via Synter MCP. |

### 🧭 Agent Workflow

| Skill | Description |
|-------|-------------|
| [spear](skills/spear) | SPEAR loop for any non-trivial agent task — Scope, Plan, Execute, Assess, Resolve. |
| [spec-driven-dev](skills/spec-driven-dev) | Spec-driven dev workflow. |

### 🚦 Operator spine (recommended after MCP)

| Skill | Description |
|-------|-------------|
| [campaign-preflight](skills/campaign-preflight) | Runs pre-flight checks on ad campaigns before launching. |
| [pixel-capi-auditor](skills/pixel-capi-auditor) | Audit pixel and Conversions API (CAPI) implementations across all ad platforms. |
| [tracking-leak-detector](skills/tracking-leak-detector) | Detect gaps between expected and actual conversion tracking across ad platforms (Meta, Google, LinkedIn, TikTok, Reddit) and CRMs. |
| [budget-optimizer](skills/budget-optimizer) | Cross-platform budget optimizer that reallocates spend based on ROAS across Google, Meta, LinkedIn, X, Reddit, TikTok, Amazon, The Trade ... |
| [kill-scale-rules](skills/kill-scale-rules) | Whether to kill or scale a campaign / ad set / creative. |
| [meta-ads-diagnostics](skills/meta-ads-diagnostics) | Diagnose and fix Meta Ads performance issues including Learning Phase, creative fatigue, audience overlap, and Advantage+ optimization. |
| [google-ads-quality-score](skills/google-ads-quality-score) | Analyze and improve Google Ads Quality Score components. |
| [performance-max-optimizer](skills/performance-max-optimizer) | Optimize Google Ads Performance Max campaigns including asset groups, audience signals, search term insights, and channel allocation. |
| [ad-copy-generation](skills/ad-copy-generation) | Generates Google Ads RSA headlines, descriptions, and ad variations. |
| [cross-platform-launcher](skills/cross-platform-launcher) | Deploys campaigns to multiple ad platforms simultaneously (Google, Meta, LinkedIn, X, Reddit, TikTok, Amazon, The Trade Desk, Amazon DSP). |
| [chatgpt-ads-launch](skills/chatgpt-ads-launch) | Build, review, and scale a ChatGPT Ads campaign from your existing Google/Meta/Microsoft text ads and website. |
| [chatgpt-ads-conversion-tracking](skills/chatgpt-ads-conversion-tracking) | Add conversion measurement to a live ChatGPT Ads campaign - choose between the OpenAI Conversions API (server-side) and the JavaScript Pi... |

### 📊 Measurement & Attribution

| Skill | Description |
|-------|-------------|
| [attribution-modeling](skills/attribution-modeling) | Multi-touch attribution modeling for advertising campaigns. |
| [incrementality-testing](skills/incrementality-testing) | Design and execute incrementality tests for advertising campaigns. |
| [roas-calculator](skills/roas-calculator) | Calculates ROAS, CPA, and campaign profitability metrics. |
| [anomaly-detector](skills/anomaly-detector) | Statistical anomaly detection in campaign metrics. |

### 🎯 Platform-Specific Optimization

| Skill | Description |
|-------|-------------|
| [google-shopping-optimizer](skills/google-shopping-optimizer) | Optimize Google Shopping product feeds, fix Merchant Center disapprovals, and structure Shopping/PMax campaigns. |
| [linkedin-ads-targeting](skills/linkedin-ads-targeting) | B2B advertising strategy on LinkedIn with job title targeting, ABM, lead gen forms, and cost benchmarks. |
| [amazon-ads-optimizer](skills/amazon-ads-optimizer) | Optimize Amazon Sponsored Products, Brands, and Display campaigns with ACOS/TACOS analysis, search term mining, and bid strategies. |
| [klaviyo-campaigns](skills/klaviyo-campaigns) | Klaviyo email/SMS — campaigns, lists, segments, flows, audience sync, event tracking. |

### 🏗️ Account Structure & Hygiene

| Skill | Description |
|-------|-------------|
| [campaign-structure-auditor](skills/campaign-structure-auditor) | Audits Google Ads account structure including ad group strategy, keyword duplication, match type distribution, and naming conventions. |
| [negative-keyword-miner](skills/negative-keyword-miner) | Mine, categorize, and manage negative keywords from search term reports. |

### 🎨 Creative & Content

| Skill | Description |
|-------|-------------|
| [ugc-creative-brief](skills/ugc-creative-brief) | Generates UGC creator briefs with hook formulas, shot lists, platform specs, and budget frameworks. |
| [video-ad-scriptwriter](skills/video-ad-scriptwriter) | Writes platform-specific video ad scripts with timing marks for YouTube bumpers, pre-roll, TikTok, and narrative ads. |
| [ad-creative-fatigue-detector](skills/ad-creative-fatigue-detector) | Detect, predict, and resolve ad creative fatigue across platforms. |
| [creative-testing](skills/creative-testing) | Cross-platform creative A/B testing for ads across Google, Meta, LinkedIn, X, Reddit, TikTok, and Amazon. |
| [ui-contrast-review](skills/ui-contrast-review) | Reviewing UI for light/dark contrast, readability, focus states, color-token drift, theme regressions. |

### 💰 Budget & Planning

| Skill | Description |
|-------|-------------|
| [bid-optimization](skills/bid-optimization) | Recommends bid adjustments based on performance data. |
| [media-plan-builder](skills/media-plan-builder) | Creates full media plans with channel mix, budget allocation, CPM/CPC/CPA projections, and reach estimates. |
| [dayparting-scheduler](skills/dayparting-scheduler) | Analyzes hour-of-day and day-of-week performance to create bid schedules and dayparting strategies. |
| [seasonal-budget-planner](skills/seasonal-budget-planner) | Holiday and seasonal budget scaling with CPM forecasting, industry seasonality indexes, and pre-season/peak/post-season strategies. |
| [mmm-budget-planner](skills/mmm-budget-planner) | MMM (Google Meridian) — budget optimization, revenue projections, channel ROI, scenario planning. |

### 🔎 Research & Analysis

| Skill | Description |
|-------|-------------|
| [keyword-research](skills/keyword-research) | Finds low-competition, high-intent keywords using Google Keyword Planner and adds them to campaigns. |
| [competitor-analysis](skills/competitor-analysis) | Analyzes competitor advertising strategies using Facebook Ads Library. |
| [audience-expansion-strategy](skills/audience-expansion-strategy) | Builds audience expansion strategies with lookalike audiences, seed optimization, layering, and exclusions across platforms. |
| [public-ad-library-intelligence](skills/public-ad-library-intelligence) | Research competitor ad creative using public ad libraries (Meta Ad Library, Google Ads Transparency, LinkedIn, TikTok, Reddit). |
| [platform-cost-benchmarks](skills/platform-cost-benchmarks) | CPM/CPA/CPC/ROAS benchmarks; cross-platform budget split; 2025-2026 figures for Google/Meta/TikTok/LinkedIn/YouTube. |

### ⚙️ Tracking & Data

| Skill | Description |
|-------|-------------|
| [utm-builder](skills/utm-builder) | Generates UTM-tagged URLs for campaign tracking. |
| [first-party-data-strategy](skills/first-party-data-strategy) | Post-cookie first-party data collection, Enhanced Conversions, server-side tracking, consent mode, and privacy-preserving measurement. |
| [landing-page-optimizer](skills/landing-page-optimizer) | Optimizes landing pages for ad campaigns including message match, form design, page speed, and CTA placement. |

### 📈 Reporting

| Skill | Description |
|-------|-------------|
| [multi-channel-reporting](skills/multi-channel-reporting) | Generates cross-channel advertising reports and performance summaries. |
| [executive-reporting](skills/executive-reporting) | C-suite advertising reports with narrative insights, YoY/MoM comparisons, blended ROAS, pacing analysis, and visualization recommendations. |
| [gtm-metrics](skills/gtm-metrics) | Defining GTM metrics, pipeline efficiency, AI cost metrics, TTFV, CAC/LTV/NRR, magic number, attribution models, weekly review cadence. |
| [cross-platform-attribution](skills/cross-platform-attribution) | Comparing ad-platform performance with CRM; attribution gaps; 'ad platform shows conversions but CRM shows zero'; UTM/pixel issues; last-... |

### 🛡️ Compliance & Policy

| Skill | Description |
|-------|-------------|
| [ad-policy-compliance](skills/ad-policy-compliance) | Checks ad creative and landing pages against platform advertising policies for Google, Meta, LinkedIn, TikTok, and Reddit. |

### 🔄 Campaign Execution

| Skill | Description |
|-------|-------------|
| [retargeting-sequence-designer](skills/retargeting-sequence-designer) | Multi-stage retargeting funnel design with audience windows, sequential messaging, frequency capping, and exclusion lists. |
| [multi-platform-launch](skills/multi-platform-launch) | Multi-platform product launches: Product Hunt, Hacker News, BetaList, AppSumo, waitlist, launch day, multi-channel rollout — pre-launch t... |

---

## Installation

### Option 1: Copy individual skills

```bash
# Copy a single skill into your project
cp -r skills/synter-mcp-setup \
  your-project/.agents/skills/synter-mcp-setup
```

### Option 2: Copy all skills

```bash
# Copy all 60 skills at once
cp -r skills/* your-project/.agents/skills/
```

### Option 3: Use in Synter (hosted)

All skills pair with [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_install&utm_campaign=free_skills) on OAuth’d Google, Meta, LinkedIn, TikTok, Reddit, Amazon, OpenAI Ads, and more. Install MCP (`synter-mcp-setup`), sign up, connect accounts, then ask the agent:

- *"Calculate my ROAS for last month's campaigns"*
- *"Audit my Google Ads account structure"*
- *"Design a retargeting funnel for my e-commerce site"*
- *"Build a media plan for Q2 with $50k budget"*
- *"Check if my Meta Pixel and CAPI are set up correctly"*

**[→ Open Synter (Solo / Scale / talk to sales)](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_install&utm_campaign=free_skills)**

> **Never Free cloud:** the OSS pack name is `free-skills`; hosted Synter is Solo / Scale / Crucible Managed (or DEV self-host) — not a Free cloud plan.

### Option 4: skills.sh

Browse and install from the owner page: [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)

```bash
npx skills add synter-media-ai/free-skills
```

---

## How Skills Work

Skills are instruction files (`SKILL.md`) that teach AI coding agents how to perform specific tasks. Each skill has:

- **Frontmatter** — name and description (used for auto-matching)
- **Instructions** — step-by-step workflows the agent follows
- **Reference Data** — formulas, benchmarks, industry data
- **Examples** — sample commands, scripts, and expected outputs

When you place a skill in `.agents/skills/<name>/SKILL.md`, compatible agents load it when your request matches the skill's description. With Synter MCP connected, the same skills drive tools against live ad accounts — **human approve ≠ activate**.

```
your-project/
├── .agents/
│   └── skills/
│       ├── synter-mcp-setup/
│       │   └── SKILL.md
│       ├── google-ads-operator/
│       │   └── SKILL.md
│       ├── meta-ads-diagnostics/
│       │   └── SKILL.md
│       └── ... (60 skills)
├── src/
└── ...
```

---

## What Makes This Collection Different

- **MCP-first** — Primary skill installs Synter MCP and points to syntermedia.ai for live OAuth’d accounts.
- **Platform-specific depth** — Real GAQL queries, API payloads, and platform mechanics — not generic tips.
- **Professional-grade** — Built by practitioners who manage real ad spend across Google, Meta, LinkedIn, Amazon, TikTok, and Reddit.
- **Interconnected** — Skills reference each other (e.g., `budget-optimizer` → `roas-calculator` → `dayparting-scheduler`).
- **Actionable formulas** — Includes Python code, SQL queries, statistical tests, and calculation templates you can use immediately.
- **Approve ≠ activate** — Operator skills stage changes; humans approve spend.

---

## Contributing

Have a useful marketing or advertising skill? Open a PR! Each skill should include:

- `SKILL.md` with frontmatter (`name`, `description`)
- Clear workflows and examples
- No hardcoded credentials or API keys
- Generic approach (not tied to a specific customer account)
- No "Free cloud / Free tier" framing for hosted Synter

---

## License

MIT — use these skills however you want. A link back to [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_footer&utm_campaign=free_skills) is appreciated but not required.

---

## Built by Synter

[Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_footer&utm_campaign=free_skills) is **AI Agent Media Buyers** — agents that plan, optimize, and report on paid campaigns across major ad platforms, with human approval gates. These skills are the public, framework-level version of the playbooks our agents run every day.

- 🌐 **Website:** [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=readme_footer&utm_campaign=free_skills)
- 📦 **skills.sh:** [skills.sh/Synter-Media-AI/free-skills](https://skills.sh/Synter-Media-AI/free-skills)
- 💼 **Use case:** Agencies, SaaS marketers, ecommerce — anyone running paid ads on more than one platform
- 🐦 **Twitter:** [@syntermedia](https://twitter.com/syntermedia)
- 📺 **MCP server:** [github.com/Synter-Media-AI/mcp-server](https://github.com/Synter-Media-AI/mcp-server) — plug Synter into Claude Desktop / Cursor / Amp / ChatGPT Apps
