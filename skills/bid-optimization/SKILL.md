---
name: bid-optimization
description: Recommends bid adjustments based on performance data. Use for CPC optimization, budget allocation, ROAS improvement, day-parting, device modifiers, and audience bid strategies.
---

# Bid Optimization Skill

Analyzes Google Ads performance data and generates bid adjustment recommendations. Produces ready-to-use Google Ads Scripts based on Brainlabs patterns.

## Safety Guardrails

**Read-only by default.** This skill:
- Analyzes data and outputs recommendations only
- Never auto-applies bid changes
- Generates scripts that must be manually reviewed and pasted into Google Ads
- Requires explicit user approval before any changes take effect

## Optimization Strategies

### Day-Parting (Hour-of-Day)
Adjusts bids based on hourly conversion performance. Identifies:
- Peak conversion hours → increase bids
- Low-performing hours → decrease bids
- Uses 24/7 scheduling pattern from Brainlabs

### Device Modifiers
Analyzes performance across Desktop, Mobile, Tablet:
- Calculates CPA by device vs campaign average
- Recommends bid modifiers within -90% to +300% range
- Weights modifiers by conversion volume confidence

### Audience Targeting
Optimizes bids for:
- In-market audiences based on ROAS
- Remarketing lists by conversion rate
- Custom audiences by CPA performance

## Workflow

### 1. Analyze Performance Data
Run `scripts/analyze-bids.py` with campaign export data:
```bash
python scripts/analyze-bids.py --input campaign_data.csv --output recommendations.json
```

Input formats supported:
- Google Ads CSV export
- Google Ads API JSON response
- Google Sheets URL

### 2. Review Recommendations
The script outputs:
- High CPA keywords to reduce bids (CPA > target × 1.3)
- High ROAS keywords to increase bids (ROAS > target × 1.2)
- Day/hour patterns with statistical significance
- Device modifier recommendations
- Estimated impact on spend and conversions

### 3. Generate Google Ads Script
Run `scripts/generate-script.py` to create deployable JavaScript:
```bash
python scripts/generate-script.py --recommendations recommendations.json --template day-parting
```

Templates available:
- `day-parting` - Hour-of-day bid adjustments
- `device` - Device bid modifiers
- `bid-adjustment` - Keyword/ad group bid changes

### 4. Deploy (Manual)
1. Copy generated script
2. Open Google Ads → Tools → Scripts
3. Create new script and paste code
4. Preview before running
5. Schedule for hourly execution

## Templates

See `templates/` folder for Google Ads Script templates:
- `bid-adjustment-template.js` - Basic bid adjustment patterns
- `day-parting-template.js` - 24/7 scheduling with hourly modifiers
- `device-bid-template.js` - Device platform bid modifiers

## Bid Modifier Bounds

Default safety limits:
- Minimum: -90% (0.1x multiplier)
- Maximum: +300% (4.0x multiplier)
- Day-parting: -50% to +50% recommended
- Device: -90% to +100% typical range

## Data Requirements

For reliable recommendations:
- Minimum 30 days of data
- At least 30 conversions per segment
- Statistical significance threshold: 95%

Low-data segments receive weighted modifiers to prevent over-optimization.
