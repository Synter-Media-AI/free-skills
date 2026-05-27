---
name: competitor-analysis
description: Analyzes competitor advertising strategies using Facebook Ads Library. Use for competitive research, creative inspiration, and market positioning.
---

# Competitor Analysis

Search and analyze competitor ads from Facebook Ads Library to understand their advertising strategies, messaging, and creative approaches.

## Available Tools

- **get_meta_platform_id** - Get Meta platform ID for a brand name
- **get_meta_ads** - Retrieve ads for a specific page/platform ID

## Workflows

### Find a Competitor's Ads

1. Get the platform ID: Use `get_meta_platform_id` with the brand name
2. Fetch their ads: Use `get_meta_ads` with the platform ID
3. Analyze the results for patterns in messaging, offers, and creative types

### Analyze Competitor Strategy

```
1. Search for competitor by name/domain
2. Review active ad creatives
3. Identify:
   - Primary messaging themes
   - Offers and promotions
   - Call-to-action patterns
   - Creative formats (image, video, carousel)
   - Target audience signals
```

### Compare Multiple Competitors

Use batch capabilities to query multiple brands simultaneously:
- Pass an array of brand names to `get_meta_platform_id`
- Pass an array of platform IDs to `get_meta_ads`

## Example Prompts

- "What ads is [competitor] currently running?"
- "Compare ad strategies between [brand A] and [brand B]"
- "Find ads from [competitor] and summarize their messaging"
- "What offers is [competitor] promoting right now?"

## Automated Analysis

Run `scripts/analyze-competitor.py` to generate a strategy summary:

```bash
python scripts/analyze-competitor.py "BrandName"
```

This outputs:
- Ad count and formats
- Common messaging themes
- Offers and CTAs
- Creative type breakdown


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
