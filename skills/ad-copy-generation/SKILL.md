---
name: ad-copy-generation
description: Generates Google Ads RSA headlines, descriptions, and ad variations. Use for creating new ads, A/B testing copy, or refreshing underperforming ads.
---

# Ad Copy Generation

Generate Google Ads Responsive Search Ads (RSA) with validated headlines and descriptions.

## Input Requirements

Before generating ads, gather:

1. **Landing page URL** (required) - The destination page for the ad
2. **Target keywords** (required) - Primary and secondary keywords to target
3. **Value propositions** (required) - Key benefits and differentiators
4. **Competitor insights** (optional) - Competitor angles to differentiate against

## Workflows

### Generate New RSA Assets

Run `scripts/generate-rsa.py` with:
```bash
python scripts/generate-rsa.py \
  --url "https://example.com/landing" \
  --keywords "keyword1,keyword2" \
  --value-props "Free shipping,24/7 support" \
  --competitors "Competitor uses price focus"
```

### Analyze Existing Ad Performance

Run `scripts/analyze-ad-performance.py` to:
- Query performance data from CSV/API
- Identify underperforming ads (CTR < account avg)
- Get improvement suggestions based on top performers

```bash
python scripts/analyze-ad-performance.py --input performance.csv
```

## Google Ads Policy Guidelines

### Prohibited Content
- No superlatives without proof ("Best", "Top", "#1") unless verifiable
- No misleading claims or exaggerations
- No excessive capitalization (OK: "FREE", Not OK: "FREE SHIPPING TODAY")
- No excessive punctuation or symbols
- No phone numbers in headlines/descriptions

### Character Limits
- Headlines: 30 characters max (15 headlines required for RSA)
- Descriptions: 90 characters max (4 descriptions required for RSA)

### Best Practices
- Include keywords in at least 3 headlines
- Use numbers and statistics when available
- Include a clear call-to-action in descriptions
- Create headlines that work in any combination
- Pin sparingly - only when order matters

## Output Format

Generated assets are output in paste-ready format:

```
=== HEADLINES (15) ===
1. [30 chars] Headline text here
2. [28 chars] Another headline
...

=== DESCRIPTIONS (4) ===
1. [88 chars] Description text here with call to action
...

=== VALIDATION ===
✓ All headlines under 30 chars
✓ All descriptions under 90 chars
✓ No policy violations detected
```

## Reference

See `prompts/rsa-generation.md` for:
- Industry-specific prompt templates
- High-performing copy patterns
- Headline vs description best practices
