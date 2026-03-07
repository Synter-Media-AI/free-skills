---
name: ad-creative-fatigue-detector
description: Detect, predict, and resolve ad creative fatigue across platforms. Use when analyzing frequency vs CTR decay, predicting creative lifespan, planning rotation strategies, or calculating statistical significance for A/B tests.
---

# Ad Creative Fatigue Detector

Systematic framework for detecting, predicting, and resolving ad creative fatigue across Google, Meta, LinkedIn, TikTok, Reddit, and X. Includes decay analysis formulas, platform-specific frequency thresholds, rotation strategies, and statistical significance calculations.

## Capabilities

1. **Frequency-CTR Decay Analysis** - Quantify the relationship between ad frequency and performance decline
2. **Creative Lifespan Prediction** - Estimate when a creative will exhaust its effective audience
3. **Platform-Specific Thresholds** - Apply correct fatigue benchmarks per platform
4. **Refresh Strategy Recommendations** - Determine what level of creative change is needed
5. **A/B Rotation Analysis** - Manage creative rotation for continuous performance
6. **Statistical Significance** - Determine if observed fatigue is real or random noise

## Fatigue Detection Framework

### The Fatigue Signal Matrix

| Signal | Weight | How to Measure | Fatigue Threshold |
|--------|--------|----------------|-------------------|
| CTR decline | High | Week-over-week CTR change | > 20% decline |
| CPA increase | High | Week-over-week CPA change | > 30% increase |
| Frequency rise | Medium | Impressions / Reach | Above platform threshold |
| CPM increase | Medium | Cost per 1,000 impressions | > 25% increase (same targeting) |
| Conversion rate decline | High | Conversions / Clicks | > 25% decline |
| Engagement rate decline | Medium | Reactions+Comments / Impressions | > 30% decline |
| Negative feedback increase | High | Hide, Report, Unlike | Any notable increase |

### Composite Fatigue Score

Calculate a single score to prioritize creative refreshes:

```
Fatigue Score = (w1 × CTR_decay) + (w2 × CPA_increase) + (w3 × Freq_excess) + (w4 × CVR_decay)

Where:
  CTR_decay = max(0, (CTR_peak - CTR_current) / CTR_peak)
  CPA_increase = max(0, (CPA_current - CPA_best) / CPA_best)
  Freq_excess = max(0, (Frequency - Threshold) / Threshold)
  CVR_decay = max(0, (CVR_peak - CVR_current) / CVR_peak)

Weights:
  w1 = 0.30 (CTR)
  w2 = 0.30 (CPA)
  w3 = 0.15 (Frequency)
  w4 = 0.25 (CVR)

Interpretation:
  0.00 - 0.15: Fresh — no action needed
  0.15 - 0.30: Early fatigue — prepare replacements
  0.30 - 0.50: Active fatigue — begin rotation
  0.50 - 0.75: Severe fatigue — replace immediately
  0.75 - 1.00: Exhausted — pause creative
```

## Platform-Specific Fatigue Thresholds

### Meta (Facebook / Instagram)

| Metric | Prospecting | Retargeting | High AOV |
|--------|-------------|-------------|----------|
| Max frequency (7d) | 2.5-3.0 | 5.0-7.0 | 6.0-8.0 |
| Max frequency (30d) | 6.0-8.0 | 15.0-20.0 | 18.0-25.0 |
| CTR decay trigger | > 20% from peak | > 25% from peak | > 15% from peak |
| Avg creative lifespan | 2-4 weeks | 4-6 weeks | 3-5 weeks |
| Refresh cadence | Weekly rotation | Bi-weekly | Weekly |

**Meta-specific fatigue signals:**
- Relevance Score / Quality Ranking drops below average
- "Ad set is getting fewer results" notification
- Cost per ThruPlay increasing with stable targeting
- Hook Rate declining (first 3 seconds losing viewers)

### Google Ads (Search)

Search ads experience fatigue differently — it's query-driven, not audience-driven.

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Ad CTR decline | > 15% over 30 days | Compare same keywords |
| Impression share (lost) | Rising by > 10% | Competitors may be refreshing |
| Quality Score drop | Below 5 | Ad relevance component declining |
| Avg position decline | Dropping with same bids | Creative losing auction preference |
| Creative lifespan | 3-6 months | Longer than social platforms |

### Google Ads (Display / YouTube)

| Metric | Prospecting | Remarketing |
|--------|-------------|-------------|
| Max frequency (7d) | 5-7 | 10-15 |
| Max frequency (30d) | 15-20 | 30-40 |
| CTR decay trigger | > 25% from peak | > 30% from peak |
| Creative lifespan | 3-6 weeks | 4-8 weeks |
| View rate (YouTube) | > 20% decline | > 25% decline |

### LinkedIn Ads

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Max frequency (30d) | 4-6 | B2B audiences are small |
| CTR decay trigger | > 15% from peak | Engagement-driven |
| Engagement rate | < 0.35% | Below platform average |
| Creative lifespan | 4-8 weeks | Longer B2B consideration |
| Sponsored Content | Refresh every 3-4 weeks | Carousel lasts longer |

### TikTok Ads

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Max frequency (7d) | 3-4 | Fast-scroll environment |
| CTR decay trigger | > 30% from peak | Rapid creative churn |
| 2-second view rate | < 40% (from 60%+) | Hook is failing |
| Creative lifespan | 1-3 weeks | Shortest of all platforms |
| Completion rate | Dropping > 20% | Content losing interest |

### Reddit Ads

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Max frequency (30d) | 3-5 | Community-sensitive |
| CTR decay trigger | > 20% from peak | Reddit users flag repetition |
| Downvote ratio | Increasing | Negative community signal |
| Creative lifespan | 2-4 weeks | Moderate churn |
| Comment sentiment | Shifting negative | Community fatigue |

### X (Twitter) Ads

| Metric | Threshold | Notes |
|--------|-----------|-------|
| Max frequency (7d) | 4-6 | Timeline-driven |
| CTR decay trigger | > 25% from peak | Fast-moving feed |
| Engagement rate | < 0.5% | Below platform average |
| Creative lifespan | 2-4 weeks | Moderate churn |
| Reply sentiment | Shifting negative | Audience annoyance |

## Creative Lifespan Prediction

### Exponential Decay Model

Creative CTR follows an exponential decay curve after the initial ramp-up:

```
CTR(t) = CTR_peak × e^(-λt)

Where:
  CTR(t) = CTR at time t (days after peak)
  CTR_peak = highest CTR observed
  λ = decay constant (platform-specific)
  t = days since peak CTR

Solving for λ from observed data:
  λ = -ln(CTR_current / CTR_peak) / t

Predicting remaining lifespan (days until CTR drops to threshold):
  t_remaining = -ln(CTR_threshold / CTR_current) / λ
```

### Platform Decay Constants (Typical)

| Platform | λ (avg) | Half-life (days) | Meaning |
|----------|---------|-------------------|---------|
| TikTok | 0.070 | 10 | CTR halves every 10 days |
| Meta (prospecting) | 0.040 | 17 | CTR halves every 17 days |
| Meta (retargeting) | 0.025 | 28 | CTR halves every 28 days |
| X Ads | 0.045 | 15 | CTR halves every 15 days |
| Reddit | 0.035 | 20 | CTR halves every 20 days |
| LinkedIn | 0.020 | 35 | CTR halves every 35 days |
| Google Display | 0.018 | 39 | CTR halves every 39 days |
| Google Search | 0.008 | 87 | CTR halves every 87 days |

### Prediction Example

```
Platform: Meta (prospecting)
CTR_peak: 2.4% (Day 3)
CTR_current: 1.8% (Day 12, so t=9)

λ = -ln(1.8 / 2.4) / 9 = -ln(0.75) / 9 = 0.2877 / 9 = 0.032

Fatigue threshold: 50% of peak = 1.2%

t_remaining = -ln(1.2 / 1.8) / 0.032 = -ln(0.667) / 0.032 = 0.405 / 0.032 = 12.7 days

Action: ~13 days until creative hits fatigue threshold. Begin preparing replacement by Day 18.
```

## Workflows

### Workflow 1: Weekly Fatigue Audit

**Step 1: Pull performance data (7-day granularity)**

For each active creative, collect:
- Daily: Impressions, Reach, Clicks, Conversions, Cost
- Calculate: CTR, CPC, CPA, Frequency, CVR

**Step 2: Calculate Fatigue Scores**

For each creative:
1. Find peak CTR (best day or best 3-day average)
2. Compare to current 7-day average
3. Calculate composite fatigue score
4. Rank creatives by score (highest fatigue first)

**Step 3: Triage**

| Score Range | # Creatives | Action |
|-------------|-------------|--------|
| 0.50+ | Replace immediately | Swap with new creatives |
| 0.30-0.50 | Prepare replacement | Have new creatives ready in 3-5 days |
| 0.15-0.30 | Monitor | Check again next week |
| < 0.15 | Healthy | No action |

**Step 4: Document and track**

Log each creative's fatigue progression to build platform-specific decay models for your account.

### Workflow 2: Creative Rotation Strategy

**Evergreen rotation model:**

Maintain 3 tiers of creatives at all times:

```
Tier 1: "Active" (2-4 creatives)
  → Currently running, performance monitored daily
  → When fatigue score > 0.30, move to Tier 3

Tier 2: "Ready" (2-4 creatives)
  → Approved, tested, waiting to deploy
  → Promoted to Tier 1 when needed

Tier 3: "Resting" (historical creatives)
  → Paused for 4-8 weeks
  → Can be recycled after rest period (audience forgets)
  → Keep if original CTR was top quartile
```

**Rotation triggers:**
1. Fatigue score > 0.30 → Swap from Tier 1 → Tier 3, promote from Tier 2
2. Weekly: Add 1 new creative to Tier 2 (maintains pipeline)
3. Monthly: Review Tier 3 for recyclable creatives

**Format mixing strategy:**

| Slot | Format | Purpose |
|------|--------|---------|
| Creative A | Static image | Baseline performer |
| Creative B | Short video (< 15s) | Engagement driver |
| Creative C | Carousel / Collection | Product showcase |
| Creative D | UGC / testimonial | Social proof |

### Workflow 3: A/B Test Significance Calculator

**When comparing creative performance, verify statistical significance before making decisions.**

**Step 1: Collect data**

| Metric | Creative A | Creative B |
|--------|-----------|-----------|
| Impressions | 50,000 | 48,000 |
| Clicks | 1,200 | 1,050 |
| CTR | 2.40% | 2.19% |

**Step 2: Calculate z-score**

```
p_A = clicks_A / impressions_A
p_B = clicks_B / impressions_B
p_pooled = (clicks_A + clicks_B) / (impressions_A + impressions_B)

SE = sqrt(p_pooled × (1 - p_pooled) × (1/impressions_A + 1/impressions_B))

z = (p_A - p_B) / SE
```

**Example calculation:**
```
p_A = 0.0240
p_B = 0.0219
p_pooled = 2250 / 98000 = 0.02296

SE = sqrt(0.02296 × 0.97704 × (1/50000 + 1/48000))
SE = sqrt(0.02296 × 0.97704 × 0.0000408)
SE = sqrt(0.000000916)
SE = 0.000957

z = (0.0240 - 0.0219) / 0.000957 = 2.19
```

**Step 3: Interpret z-score**

| z-score | Confidence | Decision |
|---------|------------|----------|
| < 1.28 | < 90% | Not significant — keep testing |
| 1.28 - 1.645 | 90-95% | Marginally significant — lean toward winner |
| 1.645 - 1.96 | 95-97.5% | Significant — winner confirmed |
| 1.96 - 2.576 | 97.5-99.5% | Highly significant — strong winner |
| > 2.576 | > 99.5% | Very highly significant — decisive winner |

**Example result:** z = 2.19 → 97.1% confidence. Creative A is the winner at the 95% level.

**Step 4: Minimum sample size for future tests**

```
n = (z_α/2 + z_β)² × (p1(1-p1) + p2(1-p2)) / (p1 - p2)²

For detecting a 10% relative CTR difference:
  Baseline CTR: 2.0%
  Detectable difference: 0.2% (absolute) = 10% relative
  Confidence: 95% (z = 1.96)
  Power: 80% (z = 0.84)

  n = (1.96 + 0.84)² × (0.02×0.98 + 0.022×0.978) / (0.002)²
  n = 7.84 × 0.04112 / 0.000004
  n = 80,594 impressions per variant
```

## Refresh Strategy Reference

### Creative Change Impact by Level

| Level | What Changes | Expected CTR Lift | Time to Create | Cost |
|-------|-------------|-------------------|----------------|------|
| Copy tweak | Headlines, body text | 5-15% | 30 min | Free |
| Color/layout | Background, CTA button, font | 10-20% | 1-2 hours | Free |
| New angle | Same product, different benefit/hook | 15-30% | 2-4 hours | Low |
| New visual | Different imagery, same message | 20-40% | 4-8 hours | Medium |
| Format change | Static → video, video → carousel | 25-50% | 1-2 days | Medium |
| Full creative | Entirely new concept and visuals | 30-60% | 2-5 days | High |
| UGC / testimonial | User-generated or influencer content | 40-80% | 3-7 days | Variable |

### Creative Lifespan by Format

| Format | Avg Lifespan (Meta) | Avg Lifespan (Google) | Avg Lifespan (LinkedIn) |
|--------|---------------------|----------------------|------------------------|
| Static image | 2-3 weeks | 4-6 weeks | 4-6 weeks |
| Short video (< 15s) | 2-4 weeks | 3-5 weeks | 3-5 weeks |
| Long video (30s+) | 3-5 weeks | 4-8 weeks | 4-8 weeks |
| Carousel | 3-5 weeks | N/A | 5-8 weeks |
| UGC content | 3-6 weeks | N/A | 3-5 weeks |
| Responsive (RSA) | 3-6 months | 3-6 months | N/A |

## Examples

### Example 1: Meta Campaign Fatigue Diagnosis

**Data (7-day snapshots):**

| Week | CTR | CPC | Frequency | CVR | CPA |
|------|-----|-----|-----------|-----|-----|
| Week 1 | 2.4% | $0.85 | 1.2 | 4.1% | $20.73 |
| Week 2 | 2.1% | $0.95 | 1.8 | 3.8% | $25.00 |
| Week 3 | 1.7% | $1.15 | 2.6 | 3.2% | $35.94 |
| Week 4 | 1.3% | $1.40 | 3.5 | 2.5% | $56.00 |

**Fatigue Score (Week 4):**
```
CTR_decay = (2.4 - 1.3) / 2.4 = 0.458
CPA_increase = (56 - 20.73) / 20.73 = 1.70 → capped at 1.0
Freq_excess = (3.5 - 3.0) / 3.0 = 0.167
CVR_decay = (4.1 - 2.5) / 4.1 = 0.390

Score = 0.30×0.458 + 0.30×1.0 + 0.15×0.167 + 0.25×0.390
Score = 0.137 + 0.300 + 0.025 + 0.098 = 0.560 (Severe)
```

**Action:** Immediate creative replacement. This creative is severely fatigued.

### Example 2: Lifespan Prediction for Budget Planning

**Scenario:** Launching 4 creatives for a Meta campaign. Budget: $5K/day. Need to predict when replacements are needed.

**Using decay constants:**
- Static image: λ = 0.045 → half-life = 15 days → usable for ~25 days
- Video (15s): λ = 0.035 → half-life = 20 days → usable for ~33 days
- Carousel: λ = 0.030 → half-life = 23 days → usable for ~38 days
- UGC video: λ = 0.028 → half-life = 25 days → usable for ~41 days

**Content calendar:**
- Week 1-3: All 4 active
- Week 4: Replace static image
- Week 5: Replace 15s video
- Week 6: Replace carousel + start new batch
- Week 7: Replace UGC video

**Production pipeline:** Need 2 new creatives every 10 days to maintain performance.

### Example 3: Multi-Platform Fatigue Dashboard

**Weekly fatigue report across platforms:**

| Platform | Creative | Days Active | Fatigue Score | Status | Action |
|----------|----------|-------------|---------------|--------|--------|
| Meta | "Hero Video" | 22 | 0.62 | Severe | Replace |
| Meta | "Carousel V2" | 14 | 0.28 | Early | Monitor |
| Google | "RSA Set A" | 45 | 0.12 | Fresh | Keep |
| LinkedIn | "Whitepaper CTA" | 31 | 0.35 | Active | Prepare replacement |
| TikTok | "Demo Clip" | 11 | 0.44 | Active | Replace soon |
| Reddit | "Community Post" | 18 | 0.21 | Early | Monitor |

**Priority queue:**
1. Meta "Hero Video" → replace immediately (Day 22, severe)
2. TikTok "Demo Clip" → replace within 3 days (Day 11, fast decay)
3. LinkedIn "Whitepaper CTA" → prepare replacement (Day 31, moderate)
