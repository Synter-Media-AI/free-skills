---
name: cross-platform-attribution
description: "Comparing ad-platform performance with CRM; attribution gaps; 'ad platform shows conversions but CRM shows zero'; UTM/pixel issues; last-click vs data-driven. Covers data-source hierarchy and gap diagnosis."
---

# Cross-Platform Attribution Analysis

When comparing ad platforms (Google, Meta, LinkedIn, StackAdapt, etc.) with CRM data (HubSpot, Salesforce, Attio), follow these rules to avoid wrong conclusions. The #1 failure mode is treating CRM attribution as ground truth for ad-platform performance — they measure different things.

## Data Interpretation Rules

### 1. Ad platform conversions ≠ CRM attribution

- Ad platforms track conversions via their own pixel/SDK (view-through + click-through).
- CRM tracks attribution via UTM parameters and form fills.
- These are **different systems with different data**.
- A campaign can have 71 conversions in StackAdapt but 0 attributed leads in HubSpot if UTM tracking is broken — that is an **attribution problem**, not a campaign problem.

### 2. Campaign status accuracy

When analyzing campaigns, distinguish:
- **LIVE** = currently running and spending
- **PAUSED** = temporarily stopped (can be resumed)
- **ENDED** = completed/finished
- **DRAFT** = never launched

Analyze ALL campaigns regardless of status with equal depth. For spend/performance, use actual data from each campaign's lifetime — paused campaigns still have historical data worth analyzing.

### 3. Spend calculations

- Always use actual data from the API; never estimate or extrapolate.
- Report the exact time period of the data ("Last 90 days" — not "monthly" — unless you show the math).
- Don't convert 90-day totals to monthly without explicitly showing `total / 3 = monthly`.

### 4. CPA accuracy

- CPA = total spend / conversions (from the ad platform).
- If the ad platform shows conversions, USE those — don't say "infinite CPA".
- If CRM shows no attribution, that's an **attribution tracking problem**, not a performance problem.

## Standard Analysis Template

When asked to compare ad platforms with CRM, structure the response like this:

```
## [Platform] Performance Analysis

### Ad Platform Data (source of truth for spend & delivery)
- All Campaigns: [count with status breakdown]
- Active Campaigns: [count of LIVE]
- Paused Campaigns: [count of PAUSED — include historical performance]
- Total Spend (period): $X
- Conversions (platform-tracked): X at $Y CPA
- Campaign breakdown by status:
  - LIVE: [names and spend]
  - PAUSED: [names]
  - ENDED: [names]

### CRM Attribution Analysis
- Contacts from this source: X
- Source breakdown:
  - OFFLINE: X% (indicates tracking gap)
  - PAID_SEARCH: X%
  - etc.

### Attribution Gap Analysis
- Platform reports X conversions but CRM shows Y attributed leads
- Root cause: [UTM tracking missing / pixel not firing / attribution window mismatch]
- Recommendation: [specific fix]
```

## Common Mistakes — DON'T

- ❌ "Zero trackable attribution = zero value" — wrong. Check ad platform conversions first.
- ❌ "All spend going to [channel type]" — wrong. Check actual campaign STATUS, not just type.
- ❌ "$17K/month" — wrong if the data is for 90 days. Do the math correctly.
- ❌ "Infinite CPA" — wrong if the ad platform shows conversions. It's an attribution gap, not zero performance.

## Right Pattern — DO

- ✅ "Ad platform shows 71 conversions at $280 CPA, but HubSpot only attributes 3 leads to this source. This suggests a UTM tracking issue, not campaign failure."
- ✅ "Current spend is on Display/Native campaigns (8 LIVE). DOOH/CTV campaigns are all ENDED."
- ✅ "90-day spend is $19,869 (~$6.6K/month)"

## When in Doubt

If data between platforms doesn't match:
1. Report **both** numbers clearly (ad platform vs CRM).
2. Identify which metric is the source of truth for what.
3. Explain the likely cause of the discrepancy.
4. Recommend specific fixes (UTM setup, pixel verification, etc.).

**Never recommend "pause everything" based only on CRM attribution when the ad platform shows conversions.** That conflates an attribution failure with a performance failure.


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
