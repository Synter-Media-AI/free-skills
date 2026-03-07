---
name: anomaly-detector
description: Statistical anomaly detection in campaign metrics. Use when detecting spend spikes, CTR drops, budget runaway, metric outliers, or configuring automated alert thresholds.
---

# Anomaly Detector

Detect statistical anomalies in advertising campaign metrics using Z-score and IQR methods. Identifies spend spikes, sudden CTR/CVR drops, budget runaway events, and other metric outliers in real time. Provides automated alert threshold configuration and platform-specific query patterns for continuous monitoring.

## Capabilities

- **Z-Score Detection**: Flag metrics that deviate >2σ from the rolling mean
- **IQR (Interquartile Range) Detection**: Robust outlier detection resistant to skewed distributions
- **Spend Spike Alerts**: Detect budget runaway before daily caps are exhausted
- **CTR/CVR Drop Detection**: Identify sudden performance degradation
- **Multi-Platform Monitoring**: Query patterns for Google Ads, Meta, LinkedIn, Reddit, TikTok, Microsoft Ads
- **Threshold Configuration**: Auto-calibrate alert sensitivity per metric and campaign maturity
- **Composite Scoring**: Combine multiple signals into a single anomaly confidence score

## Workflows

### 1. Real-Time Spend Monitoring

```
1. Pull hourly spend data for active campaigns
2. Calculate rolling 7-day hourly average and standard deviation
3. Compare current hour spend against baseline
4. If Z-score > 2.5 → WARNING alert
5. If Z-score > 3.5 → CRITICAL alert (potential budget runaway)
6. Check if spend pacing exceeds 150% of expected daily run rate
7. Recommend: pause campaign or reduce bids if critical
```

### 2. Performance Drop Detection

```
1. Pull daily CTR and CVR for last 30 days
2. Compute IQR for each metric
3. Flag days where metric < Q1 - 1.5×IQR
4. Cross-reference with external events (platform outages, policy changes)
5. If drop persists >2 consecutive days → investigate root cause
6. Check: ad disapprovals, audience exhaustion, competitor entry, landing page errors
```

### 3. Alert Threshold Calibration

```
1. Collect 30–90 days of historical metric data
2. Compute per-metric baseline statistics (mean, std, percentiles)
3. Set WARNING threshold at 2σ deviation
4. Set CRITICAL threshold at 3σ deviation
5. For low-volume campaigns (<100 clicks/day): use IQR method (more robust)
6. For high-volume campaigns (>1000 clicks/day): use Z-score (more sensitive)
7. Review and adjust thresholds monthly as campaign matures
```

### 4. Cross-Platform Anomaly Correlation

```
1. Normalize metrics across platforms (Z-score per platform)
2. Detect simultaneous anomalies across multiple platforms
3. If correlated: likely external cause (market event, website outage)
4. If isolated: likely platform-specific issue (policy, auction change)
5. Generate incident report with affected campaigns and estimated impact
```

## Reference Data

### Detection Methods Comparison

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| Z-Score | High-volume, normally distributed data | Sensitive, quantifiable | Assumes normal distribution |
| Modified Z-Score (MAD) | Data with outliers in history | Robust to existing outliers | Less sensitive |
| IQR | Skewed distributions, low volume | No distribution assumption | Less granular thresholds |
| Rolling Window | Seasonal/trending data | Adapts to trends | Lag in detection |
| CUSUM | Detecting persistent shifts | Catches gradual drifts | Complex to tune |
| Isolation Forest | Multi-dimensional anomalies | Handles feature interactions | Requires training data |

### Metric-Specific Thresholds (Defaults)

| Metric | WARNING (Z-score) | CRITICAL (Z-score) | Min Data Points |
|--------|-------------------|---------------------|-----------------|
| Hourly Spend | >2.0 | >3.0 | 168 (7 days) |
| Daily Spend | >2.5 | >3.5 | 30 days |
| CTR | < -2.0 | < -3.0 | 14 days |
| CVR | < -2.0 | < -3.0 | 14 days |
| CPC | >2.0 | >3.0 | 14 days |
| CPM | >2.5 | >3.5 | 14 days |
| Impression Share | < -2.5 | < -3.5 | 14 days |
| Quality Score | < -1.5 | < -2.5 | 7 days |

### Platform Query Patterns

**Google Ads (GAQL):**
```sql
SELECT
  campaign.name,
  segments.date,
  segments.hour,
  metrics.cost_micros,
  metrics.clicks,
  metrics.impressions,
  metrics.conversions,
  metrics.ctr,
  metrics.average_cpc
FROM campaign
WHERE segments.date DURING LAST_7_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY segments.date DESC, segments.hour DESC
```

**Meta Ads (Marketing API):**
```
GET /{ad_account_id}/insights
?level=campaign
&fields=spend,clicks,impressions,actions,ctr,cpc
&time_range={"since":"2026-02-27","until":"2026-03-06"}
&time_increment=1
&filtering=[{"field":"campaign.effective_status","operator":"IN","value":["ACTIVE"]}]
```

**LinkedIn Ads:**
```
GET /adAnalytics
?q=analytics
&dateRange.start.year=2026&dateRange.start.month=2&dateRange.start.day=27
&dateRange.end.year=2026&dateRange.end.month=3&dateRange.end.day=6
&timeGranularity=DAILY
&pivot=CAMPAIGN
&fields=costInLocalCurrency,clicks,impressions,externalWebsiteConversions
```

## Anomaly Detection Algorithms (Python)

### Z-Score Method

```python
import numpy as np
from typing import List, Tuple

def detect_zscore_anomalies(
    values: List[float],
    window: int = 30,
    warning_threshold: float = 2.0,
    critical_threshold: float = 3.0,
) -> List[dict]:
    """Detect anomalies using rolling Z-score."""
    arr = np.array(values, dtype=float)
    anomalies = []

    for i in range(window, len(arr)):
        window_data = arr[i - window : i]
        mean = np.mean(window_data)
        std = np.std(window_data, ddof=1)

        if std == 0:
            continue

        z_score = (arr[i] - mean) / std

        if abs(z_score) >= critical_threshold:
            anomalies.append({
                "index": i,
                "value": arr[i],
                "z_score": round(z_score, 2),
                "mean": round(mean, 2),
                "std": round(std, 2),
                "severity": "CRITICAL",
                "direction": "spike" if z_score > 0 else "drop",
            })
        elif abs(z_score) >= warning_threshold:
            anomalies.append({
                "index": i,
                "value": arr[i],
                "z_score": round(z_score, 2),
                "mean": round(mean, 2),
                "std": round(std, 2),
                "severity": "WARNING",
                "direction": "spike" if z_score > 0 else "drop",
            })

    return anomalies
```

### IQR Method

```python
def detect_iqr_anomalies(
    values: List[float],
    multiplier: float = 1.5,
) -> List[dict]:
    """Detect anomalies using Interquartile Range."""
    arr = np.array(values, dtype=float)
    q1 = np.percentile(arr, 25)
    q3 = np.percentile(arr, 75)
    iqr = q3 - q1

    lower_bound = q1 - multiplier * iqr
    upper_bound = q3 + multiplier * iqr

    anomalies = []
    for i, val in enumerate(arr):
        if val < lower_bound or val > upper_bound:
            severity = "CRITICAL" if (
                val < q1 - 3 * iqr or val > q3 + 3 * iqr
            ) else "WARNING"
            anomalies.append({
                "index": i,
                "value": val,
                "lower_bound": round(lower_bound, 2),
                "upper_bound": round(upper_bound, 2),
                "severity": severity,
                "direction": "spike" if val > upper_bound else "drop",
            })

    return anomalies
```

### Spend Pacing Monitor

```python
from datetime import datetime

def check_spend_pacing(
    hourly_spend: List[float],
    daily_budget: float,
    current_hour: int,
) -> dict:
    """Check if spend is pacing ahead of budget."""
    total_spent = sum(hourly_spend)
    expected_fraction = current_hour / 24.0
    expected_spend = daily_budget * expected_fraction

    pacing_ratio = total_spent / expected_spend if expected_spend > 0 else 0
    projected_daily = (total_spent / current_hour) * 24 if current_hour > 0 else 0

    alert = None
    if pacing_ratio > 2.0:
        alert = "CRITICAL"
    elif pacing_ratio > 1.5:
        alert = "WARNING"

    return {
        "total_spent": round(total_spent, 2),
        "daily_budget": daily_budget,
        "current_hour": current_hour,
        "pacing_ratio": round(pacing_ratio, 2),
        "projected_daily_spend": round(projected_daily, 2),
        "over_budget_projected": projected_daily > daily_budget,
        "alert": alert,
    }
```

### Composite Anomaly Scorer

```python
def composite_anomaly_score(
    spend_z: float,
    ctr_z: float,
    cvr_z: float,
    cpc_z: float,
    weights: dict = None,
) -> dict:
    """Combine multiple Z-scores into a single anomaly confidence score."""
    if weights is None:
        weights = {"spend": 0.3, "ctr": 0.25, "cvr": 0.25, "cpc": 0.2}

    scores = {
        "spend": abs(spend_z),
        "ctr": abs(ctr_z),
        "cvr": abs(cvr_z),
        "cpc": abs(cpc_z),
    }

    weighted_score = sum(scores[k] * weights[k] for k in scores)

    if weighted_score >= 3.0:
        severity = "CRITICAL"
    elif weighted_score >= 2.0:
        severity = "WARNING"
    elif weighted_score >= 1.5:
        severity = "INFO"
    else:
        severity = "NORMAL"

    top_contributor = max(scores, key=scores.get)

    return {
        "composite_score": round(weighted_score, 2),
        "severity": severity,
        "top_contributor": top_contributor,
        "individual_scores": {k: round(v, 2) for k, v in scores.items()},
    }
```

## Examples

### Example 1: Detect a budget runaway

```
User: "My Google Ads spend seems way higher than normal today."

Agent workflow:
1. Pull hourly spend data for last 7 days via GAQL
2. Run Z-score detection on today's hourly spend vs 7-day rolling average
3. Result: Hour 14 spend = $847, mean = $210, Z = 3.04 → CRITICAL
4. Check pacing: 65% of daily budget spent by hour 14 (58% expected) → WARNING
5. Recommend: Review search terms for irrelevant traffic, check if bid strategy changed
```

### Example 2: CTR drop investigation

```
User: "Our display CTR dropped significantly this week."

Agent workflow:
1. Pull daily CTR for last 30 days
2. Run IQR detection: Q1=0.35%, Q3=0.52%, IQR=0.17%
3. Lower bound = 0.35% - 0.255% = 0.095%
4. This week's CTR: 0.08% → Below lower bound → ANOMALY
5. Cross-check: ad disapprovals? creative fatigue? placement changes?
6. Recommend: Refresh creatives, check placement reports, review audience overlap
```

### Example 3: Multi-metric composite alert

```
User: "Set up anomaly detection for my top 5 campaigns."

Agent workflow:
1. Pull 30 days of spend, CTR, CVR, CPC for each campaign
2. Compute rolling baselines per campaign
3. Daily monitoring: compute composite anomaly score
4. Campaign "Brand - Search": composite = 1.2 → NORMAL
5. Campaign "Competitor - Display": composite = 2.8 → WARNING
   - Top contributor: CVR (Z = -3.1, dropped from 2.1% to 0.4%)
6. Alert user with campaign name, severity, and top contributing metric
```
