---
name: roas-calculator
description: Calculates ROAS, CPA, and campaign profitability metrics. Use for analyzing campaign performance, setting targets, or evaluating ad spend efficiency.
---

# ROAS Calculator Skill

Calculate Return on Ad Spend (ROAS), Cost Per Acquisition (CPA), and related profitability metrics for advertising campaigns.

## Capabilities

1. **ROAS Calculation** - Calculate return on ad spend from revenue and cost
2. **CPA Calculation** - Calculate cost per acquisition/conversion
3. **Break-even Analysis** - Determine minimum ROAS needed for profitability
4. **Target Setting** - Help set realistic ROAS/CPA targets based on margins
5. **Campaign Comparison** - Compare efficiency across campaigns/platforms

## Quick Calculations

### ROAS (Return on Ad Spend)

```python
def calculate_roas(revenue: float, ad_spend: float) -> dict:
    """
    ROAS = Revenue / Ad Spend
    
    Returns ROAS as both percentage and multiplier.
    """
    if ad_spend <= 0:
        return {"error": "Ad spend must be greater than 0"}
    
    roas_multiplier = revenue / ad_spend
    roas_percentage = roas_multiplier * 100
    
    return {
        "revenue": revenue,
        "ad_spend": ad_spend,
        "roas_multiplier": round(roas_multiplier, 2),  # e.g., 4.0x
        "roas_percentage": round(roas_percentage, 1),   # e.g., 400%
        "profit": round(revenue - ad_spend, 2),
        "interpretation": interpret_roas(roas_multiplier)
    }

def interpret_roas(roas: float) -> str:
    if roas >= 4.0:
        return "Excellent - Top-performing campaign"
    elif roas >= 3.0:
        return "Good - Above average performance"
    elif roas >= 2.0:
        return "Average - Typical for most industries"
    elif roas >= 1.0:
        return "Below average - Breaking even, needs optimization"
    else:
        return "Poor - Losing money, pause or restructure"
```

### CPA (Cost Per Acquisition)

```python
def calculate_cpa(ad_spend: float, conversions: int) -> dict:
    """
    CPA = Ad Spend / Conversions
    """
    if conversions <= 0:
        return {"error": "Conversions must be greater than 0"}
    
    cpa = ad_spend / conversions
    
    return {
        "ad_spend": ad_spend,
        "conversions": conversions,
        "cpa": round(cpa, 2),
        "cost_per_click": None  # Can add if click data available
    }
```

### Break-Even ROAS

```python
def calculate_break_even_roas(gross_margin_percent: float) -> dict:
    """
    Break-even ROAS = 1 / Gross Margin
    
    Example: 25% margin → need 4x ROAS to break even
    """
    if gross_margin_percent <= 0 or gross_margin_percent > 100:
        return {"error": "Gross margin must be between 0 and 100"}
    
    margin_decimal = gross_margin_percent / 100
    break_even_roas = 1 / margin_decimal
    
    return {
        "gross_margin_percent": gross_margin_percent,
        "break_even_roas": round(break_even_roas, 2),
        "target_roas": round(break_even_roas * 1.5, 2),  # 50% above break-even
        "interpretation": f"With {gross_margin_percent}% margin, you need {round(break_even_roas, 1)}x ROAS to break even"
    }
```

### Max CPC from Target CPA

```python
def calculate_max_cpc(target_cpa: float, conversion_rate_percent: float) -> dict:
    """
    Max CPC = Target CPA × (Conversion Rate / 100)
    """
    if conversion_rate_percent <= 0:
        return {"error": "Conversion rate must be greater than 0"}
    
    max_cpc = target_cpa * (conversion_rate_percent / 100)
    
    return {
        "target_cpa": target_cpa,
        "conversion_rate_percent": conversion_rate_percent,
        "max_cpc": round(max_cpc, 2),
        "interpretation": f"Bid no more than ${round(max_cpc, 2)} per click to hit ${target_cpa} CPA"
    }
```

## Example Responses

### When user asks: "What's my ROAS if I spent $2,500 and made $10,000?"

```
**ROAS Analysis**

| Metric | Value |
|--------|-------|
| Revenue | $10,000 |
| Ad Spend | $2,500 |
| ROAS | 4.0x (400%) |
| Profit | $7,500 |

**Interpretation:** Excellent - For every $1 spent, you earned $4 back.

**Benchmarks:**
- 🟢 Excellent: 4x+ (you're here)
- 🟡 Good: 3-4x
- 🟠 Average: 2-3x
- 🔴 Below average: <2x
```

### When user asks: "What CPC should I bid to hit $50 CPA with 5% conversion rate?"

```
**Max CPC Calculation**

| Input | Value |
|-------|-------|
| Target CPA | $50 |
| Conversion Rate | 5% |

**Result:** Bid no more than **$2.50 per click**

**Formula:** $50 × (5% / 100) = $2.50

If you bid higher, your CPA will exceed your $50 target.
```

## Industry Benchmarks

| Industry | Average ROAS | Good ROAS | Excellent ROAS |
|----------|-------------|-----------|----------------|
| E-commerce | 2-3x | 4x | 6x+ |
| SaaS/B2B | 3-4x | 5x | 8x+ |
| Lead Gen | 2-3x | 4x | 6x+ |
| App Install | 1.5-2x | 3x | 5x+ |
| Retail | 3-4x | 5x | 8x+ |

| Industry | Average CPA | Good CPA |
|----------|------------|----------|
| E-commerce | $20-50 | <$20 |
| SaaS | $100-300 | <$100 |
| Lead Gen | $25-75 | <$25 |
| Finance | $50-200 | <$50 |

## Advanced Calculations

### Lifetime Value (LTV) to CPA Ratio

```python
def calculate_ltv_cpa_ratio(ltv: float, cpa: float) -> dict:
    """
    LTV:CPA ratio indicates long-term profitability.
    Target: 3:1 or higher
    """
    ratio = ltv / cpa if cpa > 0 else 0
    
    return {
        "ltv": ltv,
        "cpa": cpa,
        "ratio": f"{round(ratio, 1)}:1",
        "interpretation": (
            "Excellent" if ratio >= 3 else
            "Good" if ratio >= 2 else
            "Needs improvement" if ratio >= 1 else
            "Unprofitable"
        ),
        "recommendation": (
            "Scale aggressively" if ratio >= 4 else
            "Maintain and optimize" if ratio >= 3 else
            "Focus on reducing CPA or increasing LTV" if ratio >= 1.5 else
            "Pause and restructure"
        )
    }
```

### Projected ROAS from Budget Change

```python
def project_roas_from_budget_change(
    current_spend: float,
    current_revenue: float,
    new_spend: float,
    diminishing_returns_factor: float = 0.85
) -> dict:
    """
    Project ROAS when changing budget.
    Accounts for diminishing returns at higher spend.
    """
    current_roas = current_revenue / current_spend
    spend_increase_ratio = new_spend / current_spend
    
    # Apply diminishing returns for increases, bonus for decreases
    if spend_increase_ratio > 1:
        projected_roas = current_roas * (diminishing_returns_factor ** (spend_increase_ratio - 1))
    else:
        projected_roas = current_roas * (1 + (1 - spend_increase_ratio) * 0.1)
    
    projected_revenue = new_spend * projected_roas
    
    return {
        "current_spend": current_spend,
        "current_roas": round(current_roas, 2),
        "new_spend": new_spend,
        "projected_roas": round(projected_roas, 2),
        "projected_revenue": round(projected_revenue, 2),
        "note": "Actual results may vary. Monitor closely after budget changes."
    }
```

## Integration with Other Skills

- **budget-optimizer** - Use ROAS calculations to inform reallocation decisions
- **bid-optimization** - Set CPC bids based on CPA targets
- **multi-channel-reporting** - Calculate ROAS across all platforms
- **campaign-health-monitoring** - Alert when ROAS drops below thresholds
