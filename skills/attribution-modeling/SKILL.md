---
name: attribution-modeling
description: Multi-touch attribution modeling for advertising campaigns. Use when analyzing conversion paths, comparing attribution models, implementing data-driven attribution, or understanding assisted conversions.
---

# Attribution Modeling

Analyze and implement multi-touch attribution models to understand how each marketing touchpoint contributes to conversions. Covers first-touch, last-touch, linear, time-decay, position-based, data-driven, and Markov chain attribution across Google Ads, Meta, and analytics platforms.

## Capabilities

1. **Model Selection** - Recommend the best attribution model based on sales cycle length, channel mix, and business goals
2. **Conversion Path Analysis** - Map customer journeys from first interaction to conversion
3. **Assisted Conversion Valuation** - Quantify the contribution of upper-funnel channels
4. **Cross-Channel Comparison** - Compare how different models redistribute credit across channels
5. **Data-Driven Attribution** - Implement algorithmic attribution using Markov chains or Shapley values
6. **GA4 Attribution Configuration** - Set up and interpret GA4's data-driven attribution

## Attribution Models Reference

### 1. First-Touch Attribution

**Formula:** 100% credit → first interaction

**When to use:**
- Brand awareness campaigns
- Top-of-funnel budget justification
- Short sales cycles (< 7 days)

**Strengths:** Simple, highlights discovery channels
**Weaknesses:** Ignores nurturing touchpoints, overvalues awareness

### 2. Last-Touch Attribution

**Formula:** 100% credit → last interaction before conversion

**When to use:**
- Direct response campaigns
- Short consideration windows
- Default model in most ad platforms

**Strengths:** Simple, clear ROI per channel
**Weaknesses:** Ignores awareness and consideration touchpoints

### 3. Linear Attribution

**Formula:** Credit = 1 / N (where N = total touchpoints)

**Example:** 4 touchpoints → each gets 25%

**When to use:**
- Equal-value touchpoint assumption
- Long sales cycles with consistent engagement
- B2B with multiple decision influencers

**Strengths:** Fair distribution, simple math
**Weaknesses:** Overvalues low-impact touches, no time weighting

### 4. Time-Decay Attribution

**Formula:** Credit_i = 2^((t_i - t_conversion) / half_life) / Σ 2^((t_j - t_conversion) / half_life)

**Default half-life:** 7 days (Google Ads default)

**Example (14-day path, 7-day half-life):**
| Touchpoint | Days Before Conversion | Raw Weight | Credit |
|------------|----------------------|------------|--------|
| Display Ad | -14 | 2^(-14/7) = 0.25 | 10.5% |
| Email | -7 | 2^(-7/7) = 0.50 | 21.1% |
| Search Ad | -3 | 2^(-3/7) = 0.74 | 31.2% |
| Brand Search | 0 | 2^(0/7) = 1.00 | 42.1% |

**When to use:**
- Promotions with deadlines
- Seasonal campaigns
- When recency matters most

### 5. Position-Based (U-Shaped) Attribution

**Formula:**
- First touch: 40%
- Last touch: 40%
- Middle touches: 20% / (N - 2)

**Example (5 touchpoints):**
| Position | Credit |
|----------|--------|
| First (Display) | 40% |
| Middle (Email) | 6.67% |
| Middle (Social) | 6.67% |
| Middle (Retarget) | 6.67% |
| Last (Brand Search) | 40% |

**When to use:**
- B2B lead generation
- When introduction and closing are most valuable
- Medium-length sales cycles (14-30 days)

### 6. Data-Driven Attribution (DDA)

**How it works:** Uses machine learning to analyze all conversion paths and assign credit based on statistical impact.

**Requirements:**
- Google Ads: 3,000 ad interactions + 300 conversions in 30 days
- GA4: Available for all properties (uses Shapley values)

**Advantages:**
- No assumptions about touchpoint value
- Adapts to actual customer behavior
- Accounts for path position, frequency, and sequence

## Markov Chain Attribution

### Concept

Models the customer journey as a state machine where each channel is a state with transition probabilities.

### Step-by-Step Implementation

**Step 1: Build the transition matrix**

From conversion paths, calculate probability of moving from one state to another:

```
States: [Start, Paid Search, Display, Email, Social, Conversion, Null]

Transition Matrix P:
           PS    Display  Email  Social  Conv   Null
Start    [0.35,  0.25,   0.20,  0.15,  0.00,  0.05]
PS       [0.10,  0.05,   0.15,  0.05,  0.55,  0.10]
Display  [0.30,  0.05,   0.20,  0.10,  0.15,  0.20]
Email    [0.15,  0.10,   0.05,  0.05,  0.50,  0.15]
Social   [0.20,  0.15,   0.15,  0.05,  0.25,  0.20]
```

**Step 2: Calculate total conversion probability**

P(conversion) = probability of reaching "Conversion" state from "Start" using matrix absorption.

**Step 3: Calculate removal effect**

For each channel, remove it from the model and recalculate conversion probability:

```
Removal Effect(channel) = 1 - P(conversion without channel) / P(conversion with all channels)
```

**Step 4: Normalize to get attribution weights**

```
Attribution(channel) = Removal Effect(channel) / Σ Removal Effect(all channels)
```

### Example Calculation

| Channel | P(conv) with all | P(conv) without | Removal Effect | Attribution |
|---------|-----------------|-----------------|----------------|-------------|
| Paid Search | 0.42 | 0.18 | 57.1% | 38.2% |
| Display | 0.42 | 0.35 | 16.7% | 11.2% |
| Email | 0.42 | 0.22 | 47.6% | 31.9% |
| Social | 0.42 | 0.30 | 28.6% | 19.1% |

## Workflows

### Workflow 1: Model Comparison Analysis

1. **Pull conversion paths** from GA4:
   - Navigate to Advertising → Attribution → Conversion paths
   - Set date range to 30+ days
   - Filter by conversion event

2. **Export path data** with touchpoint sequence, timestamps, and conversion values

3. **Apply each model** to the same dataset:
   - Calculate revenue attribution per channel per model
   - Create comparison table showing credit shifts

4. **Identify discrepancies:**
   - If Channel A gets 40% on last-touch but 15% on first-touch → it's a closer, not a discoverer
   - If Channel B gets 5% on last-touch but 30% on first-touch → it's an awareness driver

5. **Recommend model** based on business stage:
   - Growth stage → Position-based or DDA
   - Efficiency stage → Time-decay or DDA
   - Brand building → First-touch or DDA

### Workflow 2: GA4 Attribution Setup

1. **Access attribution settings:**
   - Admin → Attribution Settings
   - Select reporting attribution model (default: Data-driven)
   - Set lookback window: 30 days for acquisition, 90 days for other conversions

2. **Configure conversion events:**
   - Admin → Events → Mark as conversion
   - Set counting method: Once per session (leads) or Every event (purchases)

3. **Review attribution reports:**
   - Advertising → Attribution → Model comparison
   - Compare DDA vs Last-click for each channel
   - Look for channels where DDA credits significantly more than last-click

4. **Export and act:**
   - Increase budget on channels undervalued by last-click
   - Decrease budget on channels overvalued by last-click
   - Monitor for 2-4 weeks before further adjustments

### Workflow 3: Assisted Conversions Analysis

1. **Pull assisted conversion data** from GA4:
   - Advertising → Attribution → Conversion paths
   - Note "Assisted conversions" vs "Last-click conversions" per channel

2. **Calculate Assisted/Last ratio:**
   ```
   Assist Ratio = Assisted Conversions / Last-Click Conversions
   ```

3. **Interpret ratios:**
   | Ratio | Interpretation |
   |-------|---------------|
   | < 0.5 | Primarily a closer (last-touch channel) |
   | 0.5 - 1.0 | Balanced role (both assists and closes) |
   | 1.0 - 3.0 | Primarily an assister (mid-funnel) |
   | > 3.0 | Almost exclusively awareness/discovery |

4. **Budget implications:**
   - High-assist channels deserve more budget than last-click ROAS suggests
   - Cutting high-assist channels will reduce conversions on other channels

## Reference Data

### Typical Attribution Shifts by Channel

| Channel | Last-Touch Credit | DDA Credit | Typical Shift |
|---------|------------------|------------|---------------|
| Brand Search | 35-45% | 20-30% | ↓ Overvalued |
| Non-Brand Search | 20-30% | 20-25% | → Stable |
| Display | 3-8% | 8-15% | ↑ Undervalued |
| Social (Organic) | 5-10% | 8-12% | ↑ Slightly undervalued |
| Social (Paid) | 8-15% | 10-18% | ↑ Slightly undervalued |
| Email | 10-20% | 8-15% | ↓ Slightly overvalued |
| Direct | 15-25% | 10-15% | ↓ Overvalued |

### Lookback Window Recommendations

| Business Type | Recommended Window | Rationale |
|--------------|-------------------|-----------|
| E-commerce (low AOV) | 7-14 days | Impulse purchases |
| E-commerce (high AOV) | 30 days | Research phase |
| B2B SaaS | 60-90 days | Long sales cycle |
| B2B Enterprise | 90+ days | Multiple stakeholders |
| Local services | 7-14 days | Urgency-driven |
| Travel / Hospitality | 30-45 days | Planning phase |

### Platform-Specific Attribution Defaults

| Platform | Default Model | Lookback (Click) | Lookback (View) |
|----------|--------------|-------------------|-----------------|
| Google Ads | Data-driven | 30 days | 1 day |
| Meta Ads | 7-day click, 1-day view | 7 days | 1 day |
| LinkedIn Ads | Last-touch | 90 days | 7 days |
| TikTok Ads | Last-touch | 7 days | 1 day |
| Reddit Ads | Last-touch | 28 days | 1 day |

## Examples

### Example 1: B2B SaaS Attribution Analysis

**Scenario:** A SaaS company spends $50K/month across Google, LinkedIn, and content marketing. Last-click shows Google at 4x ROAS and LinkedIn at 0.8x ROAS.

**Analysis with position-based model:**
- LinkedIn drives 45% of first touches (awareness)
- Google captures 60% of last touches (closing)
- Content marketing handles 70% of middle touches (nurturing)

**Recommendation:** Don't cut LinkedIn. It feeds the top of funnel. Cutting it would reduce Google's closing conversions within 30-60 days.

### Example 2: E-commerce Markov Chain Results

**Scenario:** Online retailer with 10K conversion paths analyzed.

**Removal effects:**
- Removing Paid Social → 34% fewer conversions
- Removing Paid Search → 28% fewer conversions
- Removing Email → 22% fewer conversions
- Removing Display → 16% fewer conversions

**Budget reallocation:** Shift 15% of display budget to paid social, which has higher marginal impact per dollar despite lower last-click ROAS.

### Example 3: Cross-Platform Attribution Conflict

**Scenario:** Meta reports 500 conversions, Google reports 400 conversions, but GA4 only shows 350 total conversions.

**Root cause:** Platform self-attribution double counts conversions where users saw both a Meta ad and clicked a Google ad.

**Fix:** Use GA4 DDA as source of truth. Apply platform-specific credit:
- Meta DDA credit: 210 conversions (60%)
- Google DDA credit: 140 conversions (40%)
- Total matches GA4: 350
