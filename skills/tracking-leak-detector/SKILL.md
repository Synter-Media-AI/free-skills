---
name: tracking-leak-detector
description: Detect gaps between expected and actual conversion tracking across ad platforms (Meta, Google, LinkedIn, TikTok, Reddit) and CRMs. Surfaces blind spots in pixel/CAPI/Enhanced Conversions that silently erode ROAS measurement.
---

# Tracking Leak Detector

Detects gaps between expected and actual conversion tracking across all ad platforms and CRMs. Surfaces blind spots that silently erode ROAS measurement.

---

## When to Use This Skill

- User asks "why are my conversions low?" or "is my tracking working?"
- ROAS numbers seem unexpectedly low or inconsistent
- A platform is spending money but showing 0 conversions
- CRM shows more/fewer conversions than ad platforms report
- Conversions suddenly dropped on a platform
- User wants to audit their tracking setup before scaling spend
- User mentions "tracking leaks" or "attribution gaps"

---

## Agent Tools

This skill provides two agent tools:

### `detect_tracking_leaks`

Analyzes the last N days of data to find:

| Leak Type | What It Detects |
|-----------|----------------|
| `zero_conversion_spend` | Platforms spending money but reporting 0 conversions |
| `crm_ad_mismatch` | CRM conversion count differs significantly from ad platform totals |
| `conversion_drop` | Sudden drop (>70%) in conversions vs prior period |
| `utm_missing` | CRM contacts from paid sources without UTM campaign data |
| `view_through_blind_spot` | Platforms (Meta, LinkedIn, TikTok) with no impression tracking |

Each leak includes a severity (critical/warning/info), description, estimated impact, and specific recommendation.

### `attribution_health_check`

Comprehensive check of the full attribution pipeline:

| Check | What It Validates |
|-------|------------------|
| CRM Connections | HubSpot, Attio, Salesforce token status and data freshness |
| Ad Platform Data | Data freshness for all connected platforms |
| Conversion Events | Whether conversion events are being recorded |
| View-Through Tracking | Whether impression/view events exist for VTC attribution |
| UTM Coverage | Percentage of CRM contacts with campaign attribution |

---

## How Leaks Are Detected

### 1. Zero-Conversion Spend (Critical)
```
IF platform.spend > $100 AND platform.conversions == 0
THEN → Likely broken pixel or misconfigured conversion action
```

### 2. CRM-to-Ad Mismatch (Warning)
```
IF crm_conversions / ad_conversions > 1.5
THEN → Ads are under-reporting (UTM tracking gaps)

IF crm_conversions / ad_conversions < 0.5
THEN → Ads are over-counting (double-counting or CRM sync broken)
```

### 3. Conversion Drop (Critical)
```
IF current_period_conversions / prior_period_conversions < 0.3
THEN → 70%+ drop suggests broken tracking, not performance decline
```

### 4. UTM Missing (Warning)
```
IF contacts_from_paid_without_utm / total_contacts > 0.2
THEN → 20%+ of paid contacts have no campaign attribution
```

### 5. View-Through Blind Spot (Info)
```
IF platform IN (Meta, LinkedIn, TikTok, Pinterest)
   AND impression_events == 0
THEN → View-through conversions are not being captured
```

---

## Supported CRMs

| CRM | Revenue Source | Status |
|-----|---------------|--------|
| HubSpot | Deal amounts from crm_events (deal_won) | Active |
| Attio | Deal/record values synced via API | Active |
| Salesforce | Opportunity amounts | Active |

## Supported Ad Platforms

| Platform | Conversion Tracking | View-Through |
|----------|-------------------|--------------|
| Google Ads | Click-through | N/A (handled by Google) |
| LinkedIn Ads | Click-through + VTC | Supported |
| Meta Ads | Click-through + VTC | Supported |
| Microsoft Ads | Click-through | N/A |
| Reddit Ads | Click-through | Planned |
| X Ads | Click-through | Planned |
| TikTok Ads | Click-through + VTC | Supported |
| Amazon Ads | Click-through + VTC | Supported |
| StackAdapt | Click-through + VTC | Supported |
| The Trade Desk | Click-through + VTC | Supported |

---

## Example Usage

**User:** "My ROAS seems way too low on LinkedIn. Is something wrong with tracking?"

**Agent should:**
1. Call `detect_tracking_leaks` with days=30
2. Call `attribution_health_check`
3. Report any leaks found, focusing on LinkedIn
4. If view-through blind spot detected, explain that LinkedIn VTCs may be uncounted
5. Provide specific remediation steps

**User:** "Run a tracking audit before I increase spend"

**Agent should:**
1. Call `attribution_health_check` first for overall status
2. Call `detect_tracking_leaks` for active issues
3. Present a summary table of all findings
4. Prioritize critical issues that should be fixed before scaling

---

## Related Skills

- `conversion-tracking` — Setup and verification of conversion pixels
- `11-ad-platform-data` — Pulling performance data from platforms
- `budget-optimizer` — Budget allocation (depends on accurate attribution)

---

Last Updated: March 2026


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
