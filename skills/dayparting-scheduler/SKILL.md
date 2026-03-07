---
name: dayparting-scheduler
description: Analyzes hour-of-day and day-of-week performance to create bid schedules and dayparting strategies. Use when optimizing ad schedules, analyzing time-based performance, setting bid modifiers, or creating dayparting heat maps.
---

# Dayparting Scheduler

Analyzes hour-of-day and day-of-week ad performance to generate bid adjustment schedules, time zone strategies for multi-geo campaigns, and platform-specific dayparting configurations. Includes bid modifier calculations, heat map generation, and B2B vs B2C scheduling patterns.

## Capabilities

- **Hour-of-Day Analysis**: Performance breakdown by hour with statistical significance
- **Day-of-Week Optimization**: Identify top and bottom performing days
- **Bid Modifier Calculation**: Data-driven bid adjustments by time slot
- **Multi-Geo Time Zone Strategy**: Coordinate schedules across time zones
- **B2B vs B2C Pattern Templates**: Pre-built schedules for common verticals
- **Platform-Specific Scheduling**: Google, Meta, LinkedIn, TikTok, Reddit capabilities
- **Heat Map Generation**: Visual performance grids by hour × day

## Workflows

### 1. Performance Data Collection

**Google Ads — Pull hourly performance:**

```sql
-- GAQL: Performance by hour of day
SELECT
  campaign.name,
  segments.hour,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value,
  metrics.all_conversions,
  metrics.average_cpc
FROM campaign
WHERE campaign.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
ORDER BY segments.hour
```

```sql
-- GAQL: Performance by day of week
SELECT
  campaign.name,
  segments.day_of_week,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value,
  metrics.average_cpc
FROM campaign
WHERE campaign.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
ORDER BY segments.day_of_week
```

```sql
-- GAQL: Combined hour × day matrix
SELECT
  segments.day_of_week,
  segments.hour,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE campaign.status = 'ENABLED'
  AND campaign.name LIKE '%[campaign_pattern]%'
  AND segments.date DURING LAST_30_DAYS
ORDER BY segments.day_of_week, segments.hour
```

### 2. Bid Modifier Calculation

**Formula:**

```
bid_modifier = (time_slot_CPA / average_CPA) ^ -1

Example:
  Average CPA across all hours: $50.00
  Hour 10am CPA: $35.00
  Modifier = ($35 / $50) ^ -1 = 1.43 → +43% bid increase

  Hour 2am CPA: $120.00
  Modifier = ($120 / $50) ^ -1 = 0.42 → -58% bid decrease
```

**Statistical significance check:**

```
Minimum data thresholds before applying modifiers:
  - At least 100 clicks per time slot
  - At least 10 conversions per time slot
  - At least 14 days of data
  - Chi-squared test p-value < 0.05

IF data_insufficient:
  Apply conservative modifiers only (max ±20%)
  OR group into broader time blocks (4-hour windows)
```

**Modifier guardrails:**

| Adjustment Range | Risk Level | When to Use |
|------------------|------------|-------------|
| ±10-20% | Low | Default starting range, limited data |
| ±20-40% | Medium | 30+ days data, 50+ conversions per slot |
| ±40-70% | High | 90+ days data, statistically significant |
| -100% (pause) | Very High | Only with strong evidence (zero conversions, high spend) |

**Tiered time block approach:**

```
Instead of 24 individual hour modifiers, group into performance tiers:

TIER 1 — PEAK (highest conversion rate hours)
  Modifier: +20% to +50%
  Budget allocation: 40% of daily

TIER 2 — STANDARD (average performing hours)
  Modifier: 0% (no change)
  Budget allocation: 35% of daily

TIER 3 — OFF-PEAK (below average hours)
  Modifier: -20% to -50%
  Budget allocation: 20% of daily

TIER 4 — EXCLUDE (very poor performance)
  Modifier: -90% to -100%
  Budget allocation: 5% or 0%
```

### 3. B2B vs B2C Dayparting Patterns

#### B2B Default Schedule

```
MONDAY-FRIDAY:
  06:00-08:00  Ramp-up        Modifier: +10%    (early commute research)
  08:00-11:00  PEAK           Modifier: +30%    (morning work focus)
  11:00-13:00  Mid-day dip    Modifier: +10%    (lunch break browsing)
  13:00-16:00  PEAK           Modifier: +25%    (afternoon decisions)
  16:00-18:00  Wind-down      Modifier: +5%     (end of workday)
  18:00-22:00  Off-hours      Modifier: -30%    (personal time)
  22:00-06:00  Night          Modifier: -70%    (minimal B2B activity)

SATURDAY:
  08:00-14:00  Catch-up       Modifier: -20%    (some execs work Sat AM)
  14:00-08:00  Off            Modifier: -80%

SUNDAY:
  16:00-22:00  Planning       Modifier: -30%    (Sunday evening planning)
  22:00-16:00  Off            Modifier: -90%

Best days (ranked): Tuesday > Wednesday > Thursday > Monday > Friday
Worst days: Saturday, Sunday
Peak hours: 9am-11am, 2pm-4pm (prospect's local time)
```

#### B2C Default Schedule

```
MONDAY-THURSDAY:
  06:00-09:00  Morning commute  Modifier: +15%   (mobile browsing)
  09:00-12:00  Mid-morning      Modifier: +5%    (moderate activity)
  12:00-14:00  Lunch break      Modifier: +20%   (shopping peak)
  14:00-17:00  Afternoon        Modifier: 0%     (baseline)
  17:00-20:00  Evening          Modifier: +25%   (post-work shopping)
  20:00-23:00  PEAK             Modifier: +35%   (prime browsing/buying)
  23:00-06:00  Late night       Modifier: -40%   (low intent)

FRIDAY:
  17:00-23:00  PEAK             Modifier: +40%   (weekend anticipation)

SATURDAY:
  09:00-23:00  Weekend          Modifier: +20%   (all-day shopping)

SUNDAY:
  09:00-14:00  Morning          Modifier: +15%   (relaxed browsing)
  14:00-21:00  Afternoon        Modifier: +25%   (weekend peak)
  21:00-23:00  Evening          Modifier: +30%   (Sunday night shopping)

Best days (ranked): Sunday > Saturday > Thursday > Wednesday
Worst days: Monday (except e-commerce)
Peak hours: 8pm-10pm (consumer's local time)
```

#### E-Commerce Specific

```
TYPICAL PEAK WINDOWS:
  Lunch (12-1pm): +20-30% (mobile impulse buys)
  Post-work (5-7pm): +25-35% (commute browsing)
  Prime time (8-10pm): +30-45% (couch commerce)
  Late night (10pm-12am): +15-25% (insomnia shopping)
  
PAYDAY EFFECTS:
  1st and 15th of month: +15-25% lift in conversion rate
  Last week of month: -10-15% in non-essential categories
  
SEASONAL OVERLAYS:
  Black Friday week: Remove all negative modifiers
  January: Increase health/fitness modifiers
  Back-to-school (Aug): Increase family categories
```

### 4. Time Zone Considerations

**Multi-geo campaign strategy:**

```
OPTION A: Single campaign, schedule in account time zone
  Pros: Simple management
  Cons: Schedule doesn't match local user times
  Best for: Single-country campaigns

OPTION B: Separate campaigns per time zone
  Pros: Precise local scheduling
  Cons: More campaigns to manage, fragmented data
  Best for: US campaigns (4 time zones), global campaigns

OPTION C: Audience-based time zone targeting
  Pros: Flexible, data-driven
  Cons: Requires enough data per segment
  Best for: Mature accounts with conversion data
```

**US time zone campaign structure:**

```
Campaign: Brand_Search_US_Eastern
  Schedule: Optimized for EST/EDT
  Geo: CT, DC, DE, FL, GA, IN(east), KY(east), MA, MD, ME, MI(east),
       NC, NH, NJ, NY, OH, PA, RI, SC, TN(east), VA, VT, WV

Campaign: Brand_Search_US_Central
  Schedule: Shift all times +1 hour vs Eastern
  Geo: AL, AR, IA, IL, IN(west), KS, KY(west), LA, MN, MO, MS,
       MI(west), ND, NE, OK, SD, TN(west), TX, WI

Campaign: Brand_Search_US_Mountain
  Schedule: Shift all times +2 hours vs Eastern
  Geo: AZ, CO, ID(south), MT, NM, UT, WY

Campaign: Brand_Search_US_Pacific
  Schedule: Shift all times +3 hours vs Eastern
  Geo: CA, ID(north), NV, OR, WA
```

### 5. Platform-Specific Scheduling

| Platform | Ad Scheduling Support | Granularity | Bid Modifiers | Notes |
|----------|----------------------|-------------|---------------|-------|
| Google Ads | ✅ Full | 15-minute blocks | -90% to +900% | Most flexible. Set in campaign settings. |
| Microsoft Ads | ✅ Full | 15-minute blocks | -90% to +900% | Mirrors Google capability |
| Meta Ads | ⚠️ Limited | Day-level only | No modifiers | Only "Run ads on a schedule" with lifetime budget. No hourly control. |
| LinkedIn | ❌ None | N/A | N/A | No native scheduling. Use campaign start/end dates only. |
| TikTok | ⚠️ Limited | Hour blocks | No modifiers | "Dayparting" in ad group settings. On/off per hour, no modifiers. |
| Reddit | ⚠️ Limited | Day-level | No modifiers | Schedule by day only. |
| Amazon Ads | ⚠️ Limited | Day-level | No modifiers | "Dayparting" for Sponsored Products, hour-level. |
| X (Twitter) | ❌ None | N/A | N/A | No scheduling support. Manage via API toggles. |

**Meta workaround for hourly optimization:**

```
Since Meta doesn't support hourly bid modifiers:

1. Use Campaign Budget Optimization (CBO) — Meta's algorithm
   adjusts spend timing automatically based on conversion signals

2. For manual control, create separate ad sets per time window
   with lifetime budgets and schedule them:
   - Ad Set: Morning (6am-12pm) — Lifetime: $X
   - Ad Set: Afternoon (12pm-6pm) — Lifetime: $Y
   - Ad Set: Evening (6pm-12am) — Lifetime: $Z
   
   ⚠️ This requires LIFETIME budget, not daily budget

3. Use automated rules:
   - Pause ad sets outside peak hours
   - Resume during peak hours
   - Increase budget during high-performance windows
```

### 6. Heat Map Generation

**Performance heat map template (fill with actual data):**

```
CONVERSION RATE BY HOUR × DAY

         Mon    Tue    Wed    Thu    Fri    Sat    Sun
 6am    ░░░    ░░░    ░░░    ░░░    ░░░    ░░░    ░░░
 7am    ░░░    ░░▓    ░░▓    ░░▓    ░░░    ░░░    ░░░
 8am    ░▓▓    ▓▓▓    ▓▓▓    ▓▓▓    ░▓▓    ░░░    ░░░
 9am    ▓▓▓    ███    ███    ███    ▓▓▓    ░░░    ░▓▓
10am    ▓▓▓    ███    ███    ███    ▓▓▓    ░▓▓    ░▓▓
11am    ▓▓▓    ███    ███    ▓▓▓    ▓▓▓    ░▓▓    ░▓▓
12pm    ░▓▓    ▓▓▓    ▓▓▓    ▓▓▓    ░▓▓    ░▓▓    ░▓▓
 1pm    ░▓▓    ▓▓▓    ▓▓▓    ▓▓▓    ░▓▓    ░░░    ░░░
 2pm    ▓▓▓    ███    ███    ▓▓▓    ▓▓▓    ░░░    ░▓▓
 3pm    ▓▓▓    ███    ███    ▓▓▓    ░▓▓    ░░░    ░▓▓
 4pm    ░▓▓    ▓▓▓    ▓▓▓    ▓▓▓    ░▓▓    ░░░    ░▓▓
 5pm    ░▓▓    ░▓▓    ░▓▓    ░▓▓    ░░░    ░░░    ░░░
 6pm    ░░░    ░░░    ░░░    ░░░    ░░░    ░░░    ░░░
 7pm    ░░░    ░░░    ░░░    ░░░    ░░░    ░▓▓    ▓▓▓
 8pm    ░░░    ░░░    ░░░    ░░░    ░▓▓    ▓▓▓    ███
 9pm    ░░░    ░░░    ░░░    ░░░    ░▓▓    ▓▓▓    ▓▓▓
10pm    ░░░    ░░░    ░░░    ░░░    ░░░    ░▓▓    ░▓▓
11pm    ░░░    ░░░    ░░░    ░░░    ░░░    ░░░    ░░░

Legend: ░░░ Below average  ▓▓▓ Average  ███ Above average
```

**Color coding for modifier recommendations:**

```
HEAT MAP → MODIFIER MAP

         Mon    Tue    Wed    Thu    Fri    Sat    Sun
 6am     -50    -50    -50    -50    -50    -70    -70
 7am     -30    -20    -20    -20    -30    -50    -50
 8am     +10    +30    +30    +30    +10    -40    -40
 9am     +30    +50    +50    +50    +30    -30    +10
10am     +30    +50    +50    +50    +30    +10    +10
11am     +25    +40    +40    +30    +25    +10    +10
12pm     +10    +30    +30    +30    +10     0      0
 1pm     +10    +25    +25    +25    +10    -30    -30
 2pm     +25    +45    +45    +30    +25    -30    +10
 3pm     +25    +40    +40    +30    +10    -30    +10
 4pm     +10    +25    +25    +25    +10    -40    +10
 5pm      0      0      0      0    -20    -40    -40
 6pm     -40    -40    -40    -40    -40    -40    -40
 7pm     -50    -50    -50    -50    -40    +10    +30
 8pm     -50    -50    -50    -50    +10    +30    +45
 9pm     -50    -50    -50    -50    +10    +30    +30
10pm     -60    -60    -60    -60    -40    +10     0
11pm     -70    -70    -70    -70    -60    -40    -40
```

## Reference Data

### Industry-Specific Peak Hours

| Industry | B2B/B2C | Peak Hours (Local) | Peak Days | Notes |
|----------|---------|--------------------|-----------|-------|
| SaaS | B2B | 9-11am, 2-4pm | Tue-Thu | Decision-makers in office |
| E-Commerce | B2C | 12-1pm, 7-10pm | Sun, Thu | Lunch + evening shopping |
| Local Services | B2C | 7-9am, 5-7pm | Mon-Wed | Before/after work |
| Financial | B2B | 8-10am | Mon, Tue | Market hours, beginning of week |
| Healthcare | B2C | 7-9pm | Sun, Mon | Evening research, week starts |
| Education | B2B+B2C | 10am-2pm | Tue-Thu | Research hours |
| Real Estate | B2C | 9-11am, 7-9pm | Sat, Sun | Weekend house hunting |
| Legal | B2C | 8am-12pm | Mon, Tue | Crisis moments, week start |
| Travel | B2C | 12-2pm, 8-11pm | Sun, Tue | Lunch dreaming + "Tuesday cheapest" |
| Restaurant | B2C | 10-11am, 4-6pm | Thu-Sat | Pre-meal decision points |

### Smart Bidding and Dayparting Interaction

```
IMPORTANT: Smart Bidding (Target CPA, Target ROAS, Maximize Conversions)
already adjusts bids by time of day internally.

RECOMMENDATIONS:

IF using Smart Bidding:
  - DO NOT add manual time-based bid modifiers (they stack)
  - DO use ad scheduling to EXCLUDE obviously bad hours (-100%)
  - DO let the algorithm handle intra-day optimization
  - DO analyze hour-of-day reports to validate algorithm decisions

IF using Manual CPC or Enhanced CPC:
  - DO apply bid modifiers based on data analysis
  - DO start conservative (±20%) and widen over time
  - DO review and update modifiers monthly
  - DO use separate campaigns if performance variance > 3x between time slots

IF using Maximize Clicks:
  - DO apply scheduling to prevent spend during dead hours
  - DO apply moderate bid modifiers (±30% max)
```

## Examples

### Example: B2B SaaS Dayparting Implementation

```
Analysis period: Last 60 days
Account: Acme CRM (Google Ads)
Campaign type: Search — Non-Brand

FINDINGS:
  Best performing hours: 9am-11am EST (CPA: $42, vs avg $68)
  Worst performing hours: 11pm-6am EST (CPA: $185, 3 conversions)
  Best day: Wednesday (CPA: $55, 28% below average)
  Worst day: Saturday (CPA: $142, 86% above average)

RECOMMENDED SCHEDULE:

  Mon-Fri 6-8am:    +10%  (early commuters, moderate intent)
  Mon-Fri 8-11am:   +35%  (prime B2B hours, peak intent)
  Mon-Fri 11am-1pm: +15%  (lunch research, good but lower)
  Mon-Fri 1-4pm:    +25%  (afternoon decisions, strong)
  Mon-Fri 4-6pm:    +5%   (winding down, acceptable)
  Mon-Fri 6-11pm:   -50%  (off hours, keep presence low)
  Mon-Fri 11pm-6am: -90%  (near-pause overnight)
  
  Saturday all day:  -70%  (minimal B2B activity)
  Sunday 4-9pm:     -30%  (some Sunday evening planning)
  Sunday other:     -80%  (near-pause)

PROJECTED IMPACT:
  Current monthly CPA: $68
  Projected CPA after dayparting: $52-58
  Estimated improvement: 15-24%
  Budget reallocation: $1,200/mo from dead hours → peak hours
```
