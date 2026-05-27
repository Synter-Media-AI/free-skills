---
name: kill-scale-rules
description: "Whether to kill or scale a campaign / ad set / creative. Covers kill thresholds with minimum-data guardrails and platform-specific scaling budget-step limits."
---

# Kill Criteria & Scaling Rules

Most teams kill too early (acting on noise) or scale too aggressively (the algorithm can't keep up). These thresholds are calibrated so you act on signal, not noise.

## Kill Criteria — minimum data required BEFORE killing

| Timeframe | Kill if | Min data |
|-----------|---------|----------|
| 24 hours | Hook rate < 15% | 5K+ impressions |
| 48 hours | CTR < 0.5% | 2K+ impressions |
| 3 days | CPA > 2x target | $50+ spend or 1K+ clicks |
| 5 days | No conversions | 3x target CPA in spend |
| 7 days | CPA trending up 3 consecutive days | Statistically significant data |
| 14 days | CPA 1.5x above target with no improvement | Full test cycle complete |

**Never kill before minimum data.** Bad decisions from small samples cost more than the extra test spend. If a creative has 800 impressions and 2 clicks, you don't have enough signal to conclude anything — wait.

## Scaling Rules

| Condition | Action | Frequency |
|-----------|--------|-----------|
| CPA < target for 48h | Increase budget 20% | Every 2-3 days |
| CPA < 50% of target for 72h | Increase budget 30-50% | Every 2 days |
| Winner holds after 3 increases | Duplicate to new audience | Once per winner |
| Creative at 100K impressions | Commission 3 variations | Immediately |
| CPA rises after budget increase | Revert to previous budget, wait 48h | As needed |

## Platform-specific budget step limits

- **Meta:** Max **30%/day** budget increase. The algorithm needs recalibration time — bigger steps re-enter the learning phase and can wreck stable performance.
- **Google PMax:** Tolerates up to **50%/day**.
- **TikTok Smart+:** Tolerates up to **50%/day**.
- **LinkedIn:** Conservative — **20%/day** is the safe ceiling.

## When to revert

If CPA rises >25% within 48h of a budget increase, revert to the previous budget and wait 48h before trying again. The algorithm may need to re-stabilize. Repeated failed scaling attempts on the same creative usually mean the audience is saturated — duplicate to a new audience instead of pushing harder.

## When to duplicate vs. when to scale in place

- **Scale in place** if the creative is still under its proven scaling ceiling and frequency is stable.
- **Duplicate to a new audience** if frequency is climbing or CPA rises after every budget step.
- **Commission variations** as soon as a creative crosses 100K impressions — fatigue is coming whether you can see it yet or not.
