# Synter Free Skills

Free [Amp](https://ampcode.com) skills for advertising and marketing automation. Drop them into your `.agents/skills/` folder and use them with any Amp-powered project.

All of these skills are also available for free inside [Synter](https://syntermedia.ai) — just ask the AI agent to use them.

## Available Skills

### Calculators & Planning

| Skill | Description |
|-------|-------------|
| [roas-calculator](./skills/roas-calculator/) | Calculate ROAS, CPA, and campaign profitability metrics |
| [budget-optimizer](./skills/budget-optimizer/) | Cross-platform budget reallocation based on ROAS |
| [bid-optimization](./skills/bid-optimization/) | Bid adjustment recommendations based on performance data |

### Campaign Management

| Skill | Description |
|-------|-------------|
| [campaign-preflight](./skills/campaign-preflight/) | Pre-launch checks for geo targeting, tracking, budgets |
| [cross-platform-launcher](./skills/cross-platform-launcher/) | Deploy campaigns to multiple ad platforms simultaneously |
| [creative-testing](./skills/creative-testing/) | Cross-platform creative A/B testing with statistical analysis |

### Research & Analysis

| Skill | Description |
|-------|-------------|
| [keyword-research](./skills/keyword-research/) | Discover high-intent keywords via Google Keyword Planner |
| [competitor-analysis](./skills/competitor-analysis/) | Analyze competitor ads using Facebook Ads Library |
| [ad-copy-generation](./skills/ad-copy-generation/) | Generate ad headlines, descriptions, and variations |

### Tracking & Reporting

| Skill | Description |
|-------|-------------|
| [utm-builder](./skills/utm-builder/) | Generate UTM-tagged URLs for campaign tracking |
| [multi-channel-reporting](./skills/multi-channel-reporting/) | Cross-channel performance reports and executive summaries |

### Creative & Video

| Skill | Description |
|-------|-------------|
| [recording-demo-videos](./skills/recording-demo-videos/) | Record polished product demos with Playwright — zoom effects, text overlays, smooth scrolling |

## Installation

### Option 1: Copy individual skills

```bash
# Copy a single skill into your project
cp -r skills/utm-builder \
  your-project/.agents/skills/utm-builder
```

### Option 2: Copy all skills

```bash
# Copy all skills at once
cp -r skills/* your-project/.agents/skills/
```

### Option 3: Use in Synter (no setup needed)

All skills are built into [Synter](https://syntermedia.ai). Just sign up and ask the AI agent:

- _"Calculate my ROAS for last month's campaigns"_
- _"Run a pre-flight check before I launch"_
- _"Generate ad copy for my landing page"_
- _"Build UTM links for my Google Ads campaigns"_

## How Skills Work

Skills are instruction files (SKILL.md) that teach AI coding agents how to perform specific tasks. Each skill has:

1. **Frontmatter** — name and description (used for auto-matching)
2. **Instructions** — step-by-step workflows the agent follows
3. **Examples** — sample commands, scripts, and expected outputs

When you place a skill in `.agents/skills/<name>/SKILL.md`, Amp automatically loads it when your request matches the skill's description.

```
your-project/
├── .agents/
│   └── skills/
│       ├── utm-builder/
│       │   └── SKILL.md
│       ├── roas-calculator/
│       │   └── SKILL.md
│       └── campaign-preflight/
│           └── SKILL.md
├── src/
└── ...
```

## Contributing

Have a useful marketing or advertising skill? Open a PR! Each skill should include:

1. `SKILL.md` with frontmatter (`name`, `description`)
2. Clear workflows and examples
3. No hardcoded credentials or API keys
4. Generic approach (not tied to a specific product)

## License

MIT

---

Built by [Synter](https://syntermedia.ai) — AI Agent Media Buyers for advertising.
