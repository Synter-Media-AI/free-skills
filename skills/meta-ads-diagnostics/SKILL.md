---
name: meta-ads-diagnostics
description: Diagnose and fix Meta Ads performance issues including Learning Phase, creative fatigue, audience overlap, and Advantage+ optimization. Use when troubleshooting Meta campaigns, analyzing CPM spikes, diagnosing delivery issues, or comparing campaign structures.
---

# Meta Ads Diagnostics

Comprehensive diagnostic toolkit for Meta (Facebook/Instagram) advertising campaigns. Covers Learning Phase management, creative fatigue detection, audience overlap resolution, Advantage+ Shopping optimization, and platform-specific metric analysis.

## Capabilities

1. **Learning Phase Diagnosis** - Identify why campaigns are stuck, how to exit faster, and when resets occur
2. **Breakdown Effect Analysis** - Detect when granular breakdowns distort performance signals
3. **Audience Overlap Detection** - Find and resolve overlapping audiences cannibalizing performance
4. **Creative Fatigue Signals** - Measure frequency vs CTR decay and predict creative lifespan
5. **Advantage+ vs Manual Comparison** - Determine when ASC outperforms manual campaign structures
6. **Meta-Specific Metrics Analysis** - Interpret CPM, ThruPlay, Hook Rate, Hold Rate, and Quality Ranking

## Meta-Specific Metrics Reference

| Metric | Formula | Good | Average | Poor |
|--------|---------|------|---------|------|
| CPM | (Spend / Impressions) × 1000 | < $8 | $8-$20 | > $20 |
| CTR (Link) | Link Clicks / Impressions | > 1.5% | 0.8-1.5% | < 0.8% |
| CPC (Link) | Spend / Link Clicks | < $1.50 | $1.50-$3.00 | > $3.00 |
| Hook Rate | 3-Second Video Views / Impressions | > 30% | 20-30% | < 20% |
| Hold Rate | ThruPlays / 3-Second Video Views | > 15% | 8-15% | < 8% |
| ThruPlay Rate | ThruPlays / Impressions | > 8% | 3-8% | < 3% |
| Frequency | Impressions / Reach | < 2.5 | 2.5-4.0 | > 4.0 |
| Quality Ranking | Relative scale | Above Avg | Average | Below Avg |
| Engagement Ranking | Relative scale | Above Avg | Average | Below Avg |
| Conversion Ranking | Relative scale | Above Avg | Average | Below Avg |
| Outbound CTR | Outbound Clicks / Impressions | > 1.2% | 0.6-1.2% | < 0.6% |
| Cost per ThruPlay | Spend / ThruPlays | < $0.05 | $0.05-$0.15 | > $0.15 |

## Workflows

### Workflow 1: Learning Phase Diagnosis

**What is Learning Phase?**
Meta's algorithm needs approximately 50 optimization events per ad set per week to stabilize delivery. During Learning Phase, performance is volatile and CPA is typically 20-50% higher.

**Check current status:**
1. Navigate to Ads Manager → Columns → Delivery
2. Look for "Learning" or "Learning Limited" in the Delivery column

**Learning Phase resets when you:**
| Change | Resets? | Threshold |
|--------|---------|-----------|
| Budget change | Yes, if > 20% | Keep changes ≤ 20% per 72 hours |
| Bid change | Yes | Any significant change |
| New creative added | Yes | Adding new ads to ad set |
| Targeting change | Yes | Any audience modification |
| Optimization event change | Yes | Always resets |
| Pause > 7 days then resume | Yes | Resets fully |
| Pause < 7 days | No | Safe to pause briefly |

**How to exit Learning Phase faster:**
1. **Consolidate ad sets** — Fewer ad sets = more events per ad set
2. **Use broader audiences** — 2M+ audience size recommended
3. **Set appropriate budgets** — Daily budget ≥ 10× target CPA
4. **Use the right optimization event** — If Purchase events are too rare, optimize for Add to Cart first
5. **Don't touch it** — No edits for 7 days after launch

**Learning Limited diagnosis:**
- Ad set got < 50 optimization events in 7 days
- Actions: Broaden audience, increase budget, switch to higher-volume event, consolidate

### Workflow 2: Creative Fatigue Detection

**Step 1: Pull frequency and CTR data over time**

Export daily metrics for the past 30 days:
- Date, Impressions, Reach, Frequency, CTR, CPC, CPM, Conversions

**Step 2: Plot the decay curve**

Fatigue typically follows this pattern:
```
Day 1-3:   CTR peaks (novelty effect)
Day 4-10:  CTR stable (performing period)
Day 11-20: CTR declining 10-30% (early fatigue)
Day 21-30: CTR declining 30-60% (severe fatigue)
```

**Step 3: Calculate fatigue score**

```
Fatigue Score = (CTR_week1 - CTR_current) / CTR_week1 × 100

Interpretation:
  0-15%:  Healthy — no action needed
  15-30%: Early fatigue — prepare refresh
  30-50%: Active fatigue — rotate creatives now
  50%+:   Severe fatigue — pause and replace
```

**Step 4: Check frequency correlation**

```
Fatigue Frequency Threshold:
  Prospecting campaigns: 2.5-3.0 frequency
  Retargeting campaigns: 4.0-6.0 frequency
  High AOV products: 5.0-8.0 frequency (more consideration needed)
```

**Step 5: Creative refresh strategy**

| Refresh Level | Action | When |
|---------------|--------|------|
| Light refresh | Change headlines/copy, keep visuals | 15-25% CTR decline |
| Medium refresh | New visual angles, same product/message | 25-40% CTR decline |
| Full refresh | Entirely new creative concept | 40%+ CTR decline |
| Format change | Switch video→static or vice versa | Persistent fatigue |

### Workflow 3: Audience Overlap Analysis

**Step 1: Check overlap in Ads Manager**

1. Go to Audiences → Select 2-5 audiences
2. Click "…" → Show Audience Overlap
3. Review overlap percentage

**Step 2: Interpret overlap levels**

| Overlap % | Risk Level | Action |
|-----------|------------|--------|
| < 10% | Low | No action needed |
| 10-25% | Moderate | Monitor CPM increases |
| 25-50% | High | Consolidate or exclude |
| > 50% | Critical | Merge audiences immediately |

**Step 3: Symptoms of audience overlap cannibalization**
- Rising CPMs across both ad sets (auction self-competition)
- Frequency increasing faster than expected
- Delivery becoming "Learning Limited" on both
- One ad set consistently outspending the other

**Step 4: Resolution strategies**
1. **Exclusion approach:** Exclude Audience B from Ad Set A and vice versa
2. **Consolidation:** Merge overlapping audiences into one broader ad set
3. **Advantage+ Audience:** Let Meta's algorithm find the best segments
4. **Campaign Budget Optimization:** Use CBO to let Meta allocate between overlapping ad sets

### Workflow 4: Advantage+ Shopping (ASC) vs Manual Comparison

**When ASC outperforms manual:**
- E-commerce with product catalog
- 100+ conversions per week
- Broad targeting (minimal exclusions needed)
- Simple conversion goals (Purchase, Add to Cart)

**When manual outperforms ASC:**
- B2B lead generation
- Narrow/niche audiences required
- Complex exclusion lists needed
- Low conversion volume (< 50/week)
- Need for creative-level budget control

**ASC Optimization checklist:**
1. ☐ Set existing customer budget cap (recommended: 20-30%)
2. ☐ Upload customer list for existing customer identification
3. ☐ Include 5-10 diverse creatives (mix of formats)
4. ☐ Set appropriate daily budget (≥ 10× target CPA)
5. ☐ Allow 7-day learning period before evaluation
6. ☐ Use Advantage+ Creative features (text, media enhancements)

**Key ASC metrics to watch:**
- New vs returning customer split (keep new > 70%)
- Incremental ROAS vs blended ROAS
- CPM trends over time (rising CPM in ASC = audience saturation)

### Workflow 5: Breakdown Effect Analysis

**What is the Breakdown Effect?**
When you segment campaign data by placement, platform, age, gender, or other dimensions, the per-segment results can be misleading because Meta optimizes holistically.

**Example:**
- Campaign total CPA: $25 ✓
- CPA breakdown by placement:
  - Feed: $22
  - Stories: $35
  - Reels: $45
  - Audience Network: $80

**Wrong conclusion:** "Audience Network is terrible, turn it off"
**Right analysis:** Audience Network may be serving low-cost impressions that assist Feed conversions

**How to properly evaluate breakdowns:**
1. Never optimize based on breakdown data alone
2. If you must test placement exclusion, use a holdout test (see incrementality-testing skill)
3. Use lift studies to measure true incremental impact
4. Allow Meta's algorithm 14+ days with all placements before drawing conclusions

## Diagnostic Decision Tree

```
Campaign underperforming?
├── Check: Is it in Learning Phase?
│   ├── Yes → Don't touch for 7 days. Budget ≥ 10× CPA?
│   └── No → Continue diagnosis
├── Check: Frequency > 3.0?
│   ├── Yes → Creative fatigue. Check CTR decay curve.
│   └── No → Continue diagnosis
├── Check: CPM rising while CTR stable?
│   ├── Yes → Audience saturation or competition spike. Broaden audience.
│   └── No → Continue diagnosis
├── Check: CTR good but CVR dropping?
│   ├── Yes → Landing page issue or audience quality degradation.
│   └── No → Continue diagnosis
├── Check: Quality Ranking below average?
│   ├── Yes → Creative quality issue. Test new formats.
│   └── No → Continue diagnosis
└── Check: Conversion Ranking below average?
    ├── Yes → Post-click experience issue. Audit landing page.
    └── No → May be attribution/tracking issue. Check pixel health.
```

## Reference Data

### CPM Benchmarks by Industry (Meta Ads, 2025-2026)

| Industry | Avg CPM | Q1 CPM | Q4 CPM (Holiday) |
|----------|---------|--------|-------------------|
| E-commerce (general) | $11.20 | $9.50 | $16.80 |
| Fashion/Apparel | $9.80 | $8.20 | $15.40 |
| SaaS/Tech | $14.50 | $13.00 | $14.80 |
| Finance/Insurance | $18.30 | $16.50 | $22.00 |
| Health/Wellness | $10.60 | $9.80 | $13.20 |
| Education | $8.90 | $8.00 | $10.50 |
| Real Estate | $12.40 | $11.00 | $14.80 |
| Gaming | $7.20 | $6.50 | $9.80 |
| B2B Services | $16.80 | $15.00 | $18.50 |

### Video Performance Benchmarks

| Metric | Top 25% | Median | Bottom 25% |
|--------|---------|--------|------------|
| Hook Rate (3s views/impr) | > 35% | 25% | < 15% |
| Hold Rate (ThruPlay/3s) | > 20% | 12% | < 6% |
| Video completion (15s) | > 40% | 28% | < 15% |
| Video completion (30s) | > 25% | 15% | < 8% |
| Video completion (60s) | > 15% | 8% | < 4% |

### Ad Format Performance Comparison

| Format | Avg CTR | Avg CPC | Best For |
|--------|---------|---------|----------|
| Single Image | 1.1% | $1.40 | Simple offers, brand awareness |
| Carousel | 1.3% | $1.20 | Multiple products, storytelling |
| Video (< 15s) | 1.5% | $1.10 | Engagement, brand recall |
| Video (15-30s) | 1.2% | $1.30 | Product demos, testimonials |
| Collection | 1.8% | $0.95 | E-commerce, catalog sales |
| Instant Experience | 2.1% | $0.85 | Immersive brand experiences |
| Reels | 1.6% | $1.05 | Younger demographics, trends |

## Examples

### Example 1: Diagnosing a CPM Spike

**Scenario:** CPMs jumped from $12 to $22 over 2 weeks.

**Diagnosis steps:**
1. Check auction competition: Is it seasonal (Q4, Black Friday)?
2. Check frequency: If > 3.5, audience is saturated
3. Check audience overlap: Multiple ad sets competing?
4. Check quality rankings: Did they drop?
5. Check bid strategy: Bid cap too aggressive?

**Finding:** Frequency hit 4.2, quality ranking dropped to "Below Average"
**Fix:** Rotate 3 new creatives, expand lookalike from 1% to 3%, and consolidate 4 ad sets into 2.

### Example 2: Learning Limited Resolution

**Scenario:** 3 of 5 ad sets stuck in "Learning Limited" for 2+ weeks.

**Analysis:**
- Daily budget: $30/ad set
- Target CPA: $45
- Weekly optimization events per ad set: 8-12 (need 50)

**Fix:**
1. Consolidate 5 ad sets → 2 ad sets (each gets 5× the events)
2. Increase daily budget to $100/ad set (allows 50 events at $14 CPA margin)
3. Switch from Purchase to Add to Cart optimization (3× more events)
4. Wait 7 days without changes

### Example 3: ASC vs Manual A/B Test

**Setup:**
- ASC campaign: $200/day, 8 creatives, broad targeting
- Manual campaign: $200/day, 3 ad sets (LAL 1%, Interest, Broad), 4 creatives each

**Results after 14 days:**
| Metric | ASC | Manual |
|--------|-----|--------|
| Purchases | 142 | 118 |
| CPA | $19.72 | $23.73 |
| ROAS | 4.2x | 3.5x |
| New customer % | 68% | 74% |
| CPM | $8.40 | $11.20 |

**Conclusion:** ASC wins on efficiency. Manual wins slightly on new customer acquisition. Recommendation: Run ASC as primary, keep one manual ad set for prospecting control.
