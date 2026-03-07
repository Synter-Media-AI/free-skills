---
name: incrementality-testing
description: Design and execute incrementality tests for advertising campaigns. Use when measuring true lift from ads, designing geo holdout tests, running conversion lift studies, calculating statistical significance, or determining optimal test duration.
---

# Incrementality Testing

Framework for measuring the true incremental impact of advertising campaigns. Covers geo holdout test design, conversion lift studies (Meta, Google), ghost ads methodology, statistical significance calculations, sample size planning, and test duration recommendations.

## Capabilities

1. **Geo Holdout Test Design** - Create matched geographic test/control groups
2. **Conversion Lift Studies** - Run platform-native lift measurement (Meta, Google)
3. **Ghost Ads / PSA Methodology** - Measure incrementality without withholding ads
4. **Statistical Significance** - Calculate confidence in lift measurements
5. **Sample Size Planning** - Determine required audience size for valid tests
6. **Test Duration Recommendations** - Optimize test length for accuracy vs speed

## Core Incrementality Concepts

### Why Incrementality Matters

Attribution (last-click, multi-touch) measures correlation. Incrementality measures causation.

**The key question:** "Would this conversion have happened even without the ad?"

```
Incremental Conversions = Total Attributed Conversions × Incrementality Rate

Where Incrementality Rate = (Conversion Rate_test - Conversion Rate_control) / Conversion Rate_test
```

**Example:**
- Google Ads attributes 1,000 conversions to brand search
- Incrementality test shows 30% lift (incrementality rate)
- True incremental conversions: 300
- The other 700 would have happened organically (they were searching your brand anyway)

### Key Formulas

**Incremental Lift:**
```
Lift = (CVR_test - CVR_control) / CVR_control × 100%

Where:
  CVR_test = Conversions_test / Exposed_test
  CVR_control = Conversions_control / Exposed_control
```

**Incremental CPA (iCPA):**
```
iCPA = Ad Spend / Incremental Conversions
iCPA = Ad Spend / (Conversions_test - Expected_conversions_without_ads)
iCPA = Ad Spend / (Conversions_test - (Exposed_test × CVR_control))
```

**Incremental ROAS (iROAS):**
```
iROAS = Incremental Revenue / Ad Spend
iROAS = ((Revenue_test / Exposed_test) - (Revenue_control / Exposed_control)) × Exposed_test / Ad Spend
```

**Cost per Incremental Conversion:**
```
CPIC = Total Spend / (Conversions_exposed - (Impressions_exposed × CVR_control / Impressions_control))
```

## Workflows

### Workflow 1: Geo Holdout Test Design

**Step 1: Define test objective**

| Objective | What You're Testing | Typical Duration |
|-----------|-------------------|-----------------|
| Channel incrementality | "Does Display advertising drive incremental conversions?" | 4-8 weeks |
| Budget incrementality | "Does increasing budget from $5K to $10K drive proportional lift?" | 4-6 weeks |
| Tactic incrementality | "Does retargeting drive incremental revenue vs no retargeting?" | 3-6 weeks |
| Full media incrementality | "What happens if we turn off all paid media in a region?" | 4-8 weeks |

**Step 2: Select geographic regions**

**Matching criteria (in order of importance):**
1. Similar population size
2. Similar historical conversion rates
3. Similar revenue per conversion
4. Similar seasonality patterns
5. Similar competitive landscape
6. No cross-contamination (users don't travel between regions frequently)

**Example US geo pairings:**

| Test Region | Control Region | Match Quality |
|-------------|----------------|---------------|
| Phoenix, AZ | San Antonio, TX | High (similar size, demo) |
| Denver, CO | Portland, OR | High (similar income, urban) |
| Atlanta, GA | Charlotte, NC | Medium-High |
| Minneapolis, MN | Kansas City, MO | Medium-High |
| Nashville, TN | Austin, TX | Medium (Austin growing faster) |
| Seattle, WA | Boston, MA | Medium (different costs) |

**Step 3: Validate match quality**

Before the test, compare 8-12 weeks of historical data:

```
Match Score = 1 - |CVR_test_historical - CVR_control_historical| / AVG(CVR_test, CVR_control)

Interpretation:
  > 0.95: Excellent match
  0.90-0.95: Good match
  0.80-0.90: Acceptable match
  < 0.80: Poor match — choose different regions
```

**Step 4: Run the test**

- **Test region:** Run ads as normal
- **Control region:** Suppress ads entirely (dark period)
- **Duration:** Minimum 4 weeks, ideally 6-8 weeks
- **Holdout size:** Control should be 20-30% of total addressable market

**Step 5: Analyze results**

```
Test Region:  Population 2M, Conversions 5,200, CVR 0.260%
Control Region: Population 1.8M, Conversions 3,420, CVR 0.190%

Lift = (0.260% - 0.190%) / 0.190% = 36.8%

Incremental conversions in test region = 5,200 - (2M × 0.190%) = 5,200 - 3,800 = 1,400

If test spend was $50,000:
  iCPA = $50,000 / 1,400 = $35.71
  Standard CPA = $50,000 / 5,200 = $9.62

  → Standard CPA undercounts true cost by 73%
```

### Workflow 2: Meta Conversion Lift Study

**Prerequisites:**
- Meta Business Manager access
- Pixel with sufficient conversion volume (500+ per week recommended)
- Campaign running for 7+ days before test starts

**Step 1: Set up the study**

1. Navigate to Meta Experiments → Conversion Lift
2. Select the campaign(s) to test
3. Choose conversion event (Purchase, Lead, etc.)
4. Set test duration (recommended: 2-4 weeks)
5. Meta automatically creates test and holdout groups (intent-to-treat)

**Step 2: How Meta's methodology works**

```
Meta splits the target audience into:
- Test group (exposed to ads): ~90% of audience
- Holdout group (shown PSA/no ad): ~10% of audience

Both groups are matched by demographics, interests, and predicted conversion probability.

Meta measures:
- Conversions in test group (exposed)
- Conversions in holdout group (not exposed)
- Calculates lift with confidence interval
```

**Step 3: Interpret results**

Meta reports:
- **Absolute lift:** Percentage point increase in conversion rate
- **Relative lift:** Percentage increase over baseline
- **Confidence interval:** Range of likely true lift
- **Cost per incremental conversion:** True cost per additional conversion

**Example results:**
```
Conversion lift: +28% (95% CI: +15% to +41%)
Conversions (test): 1,200
Conversions (control): 85
Estimated incremental conversions: 265
Cost per incremental conversion: $38.50
Cost per attributed conversion: $8.33

Interpretation: Each attributed conversion costs $8.33, but each truly
incremental conversion costs $38.50. The real efficiency is 4.6× worse
than attribution suggests.
```

### Workflow 3: Google Conversion Lift Study

**Prerequisites:**
- Google Ads account with sufficient volume
- Campaign running 2+ weeks
- Admin access to Google Ads

**Step 1: Access lift measurement**

1. Tools → Measurement → Lift measurement
2. Select "Conversion lift" or "Brand lift"
3. Choose campaigns to measure
4. Google creates matched test/holdout groups

**Step 2: Google's methodology**

Google uses an intent-to-treat (ITT) approach:
- Identifies users who would have been exposed to ads
- Randomly assigns to test (ads served) or control (ads suppressed)
- Measures conversions in both groups
- Reports lift with statistical significance

**Step 3: Requirements**

| Metric | Minimum | Recommended |
|--------|---------|-------------|
| Campaign spend | $10K during test | $20K+ |
| Conversions/week | 100+ | 300+ |
| Test duration | 2 weeks | 4 weeks |
| Audience size | 100K+ | 500K+ |

### Workflow 4: Ghost Ads / PSA Methodology

**For platforms without native lift tools:**

**Ghost ad concept:**
Instead of withholding ads, serve a "ghost ad" (public service announcement or irrelevant ad) to the control group. Both groups go through the same auction process, eliminating selection bias.

**Implementation steps:**

1. **Create a PSA campaign** with identical targeting as the test campaign
2. **Split audience** 80/20 (test/control) using audience lists
3. **Test group:** Sees real ads
4. **Control group:** Sees PSA ads (unrelated charity message)
5. **Track conversions** for both groups using a neutral measurement system (GA4)
6. **Calculate lift** using the same formulas

**Advantages over geo holdout:**
- No geographic contamination
- Same audience characteristics
- Can run on any platform
- Smaller audience required

**Disadvantages:**
- Wastes budget on PSA impressions (control)
- Some platforms don't support this easily
- Users in control still see organic/other channels

### Workflow 5: Statistical Significance Calculation

**Step 1: Collect test results**

| Group | Users | Conversions | CVR |
|-------|-------|-------------|-----|
| Test (ads shown) | 500,000 | 2,500 | 0.500% |
| Control (no ads) | 100,000 | 380 | 0.380% |

**Step 2: Calculate z-score for lift**

```
p_test = 2500 / 500000 = 0.00500
p_control = 380 / 100000 = 0.00380
p_pooled = (2500 + 380) / (500000 + 100000) = 0.00480

SE = sqrt(p_pooled × (1 - p_pooled) × (1/500000 + 1/100000))
SE = sqrt(0.00480 × 0.99520 × 0.000012)
SE = sqrt(0.0000000573)
SE = 0.000239

z = (0.00500 - 0.00380) / 0.000239
z = 0.00120 / 0.000239
z = 5.02
```

**Step 3: Interpret**

z = 5.02 → p-value < 0.0001 → Statistically significant at 99.99% confidence.

The observed 31.6% lift is real and not due to random chance.

**Step 4: Calculate confidence interval for lift**

```
Lift = (p_test - p_control) / p_control = 31.6%

SE_lift = sqrt(
  (p_test × (1-p_test) / n_test + p_control × (1-p_control) / n_control)
) / p_control

SE_lift = sqrt(0.00000001 + 0.0000000363) / 0.00380
SE_lift = 0.000215 / 0.00380
SE_lift = 0.0566 = 5.66%

95% CI = 31.6% ± 1.96 × 5.66%
95% CI = [20.5%, 42.7%]
```

**Report:** Lift = 31.6% (95% CI: 20.5% - 42.7%)

### Workflow 6: Sample Size Calculator

**Before running a test, calculate required audience size:**

```
n = (z_α/2 + z_β)² × (p_test × (1-p_test) / k + p_control × (1-p_control)) / (p_test - p_control)²

Where:
  z_α/2 = 1.96 for 95% confidence
  z_β = 0.84 for 80% power (or 1.28 for 90% power)
  k = test/control split ratio (e.g., 4 for 80/20 split)
  p_test = expected CVR with ads
  p_control = expected CVR without ads (baseline)
```

**Quick reference table (80% power, 95% confidence, 80/20 split):**

| Baseline CVR | Minimum Detectable Lift | Control Size | Test Size | Total |
|-------------|------------------------|--------------|-----------|-------|
| 0.1% | 20% | 950K | 3.8M | 4.75M |
| 0.1% | 50% | 155K | 620K | 775K |
| 0.5% | 10% | 620K | 2.5M | 3.1M |
| 0.5% | 20% | 155K | 620K | 775K |
| 0.5% | 50% | 25K | 100K | 125K |
| 1.0% | 10% | 310K | 1.2M | 1.5M |
| 1.0% | 20% | 78K | 312K | 390K |
| 1.0% | 50% | 13K | 52K | 65K |
| 2.0% | 10% | 152K | 608K | 760K |
| 2.0% | 20% | 38K | 152K | 190K |
| 5.0% | 10% | 59K | 236K | 295K |
| 5.0% | 20% | 15K | 60K | 75K |

## Test Duration Recommendations

### Minimum Test Duration by Channel

| Channel | Min Duration | Recommended | Rationale |
|---------|-------------|-------------|-----------|
| Paid Search (Brand) | 2 weeks | 4 weeks | Fast signal, high volume |
| Paid Search (Non-Brand) | 3 weeks | 4-6 weeks | Need volume accumulation |
| Display Prospecting | 4 weeks | 6-8 weeks | Longer conversion lag |
| Display Retargeting | 3 weeks | 4-6 weeks | Retargeting pool depletion |
| Meta (All) | 2 weeks | 4 weeks | High volume, fast learning |
| LinkedIn Ads | 4 weeks | 8 weeks | Low volume B2B |
| YouTube / Video | 4 weeks | 6-8 weeks | Awareness effect is delayed |
| TikTok | 2 weeks | 3-4 weeks | Fast engagement cycle |

### Duration Adjustment Factors

| Factor | Adjustment | Reason |
|--------|------------|--------|
| Low conversion volume | +50% duration | Need more data points |
| High AOV / long sales cycle | +100% duration | Conversion lag is longer |
| B2B with 30+ day cycle | +200% duration | Must capture full cycle |
| Weekly seasonality | Ensure full weeks | Avoid day-of-week bias |
| Major holidays in period | Avoid or extend | Distorts normal behavior |

## Reference Data

### Typical Incrementality Rates by Channel

| Channel | Typical Incrementality | Meaning |
|---------|----------------------|---------|
| Brand Search | 15-35% | Most conversions would happen anyway (brand seekers) |
| Non-Brand Search | 40-65% | Moderate incrementality (capturing demand) |
| Shopping Ads | 35-55% | Similar to non-brand search |
| Display Prospecting | 5-20% | Low incrementality (awareness plays) |
| Display Retargeting | 20-40% | Moderate (some would convert without nudge) |
| Meta Prospecting | 15-35% | Depends on audience novelty |
| Meta Retargeting | 25-45% | Higher for abandoned cart |
| LinkedIn Ads | 20-40% | Moderate for B2B |
| YouTube Pre-Roll | 5-15% | Low direct incrementality, brand lift |
| Affiliate / Partner | 10-25% | Many users already decided |

### Interpreting iCPA vs Attributed CPA

| Ratio (iCPA / CPA) | Interpretation | Action |
|---------------------|----------------|--------|
| 1.0-1.5× | Highly incremental | Invest more, channel is efficient |
| 1.5-3.0× | Moderately incremental | Maintain spend, optimize for incrementality |
| 3.0-5.0× | Low incrementality | Re-evaluate, consider budget shift |
| 5.0-10× | Very low incrementality | Reduce spend significantly |
| 10×+ | Near-zero incrementality | Turn off or use for pure awareness |

## Examples

### Example 1: Full Geo Holdout Test — Display Retargeting

**Setup:**
- Test markets: Phoenix, Denver, Atlanta (60% of addressable market)
- Control markets: San Antonio, Portland, Charlotte (40%)
- Duration: 6 weeks
- Channel tested: Display retargeting (turned off in control)
- Measurement: GA4 conversions (neutral source)

**Pre-test validation:**
```
8-week historical CVR:
  Test markets avg: 2.34%
  Control markets avg: 2.28%
  Match score: 1 - |2.34 - 2.28| / 2.31 = 0.974 (Excellent)
```

**Results (6 weeks):**
```
Test markets: 12,400 conversions, CVR 2.48%
Control markets: 7,200 conversions, CVR 2.16%

Lift = (2.48 - 2.16) / 2.16 = 14.8%
z-score = 4.87 → Significant at 99.99%
95% CI: [10.2%, 19.4%]

Incremental conversions from retargeting:
  Expected test conversions without retargeting: 500K × 2.16% = 10,800
  Incremental: 12,400 - 10,800 = 1,600

Retargeting spend: $45,000
  iCPA = $45,000 / 1,600 = $28.13
  Attributed CPA = $45,000 / 3,200 (attributed) = $14.06
  
  → Retargeting is 50% as incremental as attribution suggests
  → But at $28.13 iCPA vs $40 target, it's still profitable
```

### Example 2: Meta Conversion Lift Results

**Campaign:** E-commerce retargeting, $2K/day spend, 4-week test

**Meta's report:**
```
Test group:   450,000 users, 4,100 purchases, CVR 0.911%
Control group: 50,000 users, 380 purchases, CVR 0.760%

Relative lift: 19.9% (95% CI: 8.5% to 31.3%)
Incremental conversions: 680
Cost per incremental conversion: $82.35
Cost per attributed conversion: $13.66

Incrementality rate: 680 / 4,100 = 16.6%
  → Only 16.6% of attributed conversions were truly incremental
```

**Decision:**
At $82.35 iCPA vs $60 target → Retargeting is not efficient enough.
Action: Reduce retargeting budget by 40% and reallocate to prospecting.

### Example 3: Budget Incrementality Test

**Question:** "Should we increase Meta prospecting spend from $5K/day to $10K/day?"

**Test design:**
- Period 1 (4 weeks): $5K/day baseline measurement
- Period 2 (4 weeks): $10K/day in test geos, $5K/day in control geos
- Measurement: Total conversions from both paid and organic

**Results:**
```
At $5K/day:    250 conversions/week, CPA $140
At $10K/day:   380 conversions/week, CPA $184
Organic/other: 120 conversions/week (stable)

Incremental conversions from doubling spend:
  380 - 250 = 130 additional conversions
  Additional spend: $35,000/week
  Marginal iCPA: $35,000 / 130 = $269

  → Diminishing returns: first $5K gets CPA $140, next $5K gets iCPA $269
  → Double the spend but only 52% more conversions
```

**Decision:** Budget increase shows diminishing returns. The marginal iCPA ($269) exceeds the target ($180). Recommendation: Increase to $7K/day (find the efficient frontier) rather than $10K.
