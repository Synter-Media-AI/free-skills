---
name: audience-expansion-strategy
description: Builds audience expansion strategies with lookalike audiences, seed optimization, layering, and exclusions across platforms. Use when expanding audiences, building lookalikes, setting up exclusion lists, or optimizing audience targeting.
---

# Audience Expansion Strategy

Develops comprehensive audience expansion strategies including lookalike/similar audience creation, seed audience quality optimization, audience layering techniques, exclusion strategies, interest vs behavioral targeting, platform-specific audience features, and Customer Match / Custom Audience setup.

## Capabilities

- **Lookalike/Similar Audience Building**: Platform-specific creation and sizing
- **Seed Audience Optimization**: Quality scoring and minimum size requirements
- **Audience Layering**: Combining audiences for precision targeting
- **Exclusion Strategies**: Preventing waste on existing customers and converters
- **Interest vs Behavioral Targeting**: When to use which approach
- **Platform Feature Comparison**: Advantage+, Optimized Targeting, etc.
- **Customer Match Setup**: First-party data upload across platforms
- **Audience Size Recommendations**: Right-sizing by platform and budget

## Workflows

### 1. Audience Expansion Framework

**Phase 1: Audit current audiences**

```
COLLECT:
  - All active audiences by platform
  - Audience size and overlap data
  - Performance by audience (CPA, ROAS, CTR)
  - Frequency by audience (fatigue indicators)
  - Current exclusion lists

ANALYZE:
  - Which audiences drive 80% of conversions?
  - Which audiences have CPA above target?
  - What's the refresh rate of custom audiences?
  - Are exclusion lists up to date?
  - What's the audience overlap between campaigns?
```

**Phase 2: Build expansion ladder**

```
TIER 1 — HOTTEST (Lowest CPA, smallest reach)
  Retargeting: Website visitors, cart abandoners, video viewers
  CRM: Existing customer lookalikes (1%)
  Expected CPA: 0.5-0.8x average
  
TIER 2 — WARM (Moderate CPA, medium reach)
  Lookalikes: 1-3% from high-value customers
  Engaged: Email subscribers, social engagers
  Customer Match: Prospect lists, demo requestors
  Expected CPA: 0.8-1.2x average
  
TIER 3 — COOL (Higher CPA, large reach)
  Lookalikes: 3-5% from converters
  Interest-based: Detailed targeting by behavior
  Competitor: Competitor brand interest audiences
  Expected CPA: 1.2-1.8x average

TIER 4 — COLD (Highest CPA, broadest reach)
  Lookalikes: 5-10% broad
  Broad targeting: Let algorithm find users
  Contextual: Content-based targeting
  Expected CPA: 1.5-2.5x average
```

### 2. Lookalike/Similar Audience Building

#### Platform-Specific Guide

**Meta (Lookalike Audiences)**

```
CREATION:
  Ads Manager → Audiences → Create Audience → Lookalike Audience

SEED SOURCES (ranked by quality):
  1. Purchase/Conversion pixel events (best quality)
  2. High-value customer list (top 20% by LTV)
  3. Add-to-cart pixel events
  4. Lead form completions
  5. Video viewers (75%+ completion)
  6. Website visitors (180-day recency)
  7. Page/post engagers

SIZE RECOMMENDATIONS:
  - 1% = ~2.4M people (US) — Highest quality, lowest reach
  - 2% = ~4.8M — Good balance for most advertisers
  - 3-5% = ~7-12M — Scale phase, moderate quality
  - 5-10% = ~12-24M — Broad reach, lower precision
  
  Best practice: Create 1%, 3%, 5% and test each

ADVANCED:
  - Value-based lookalike: Weight by purchase value (not just conversion)
  - Multi-country lookalike: Select multiple source countries
  - Stacked seeds: Combine multiple event types as seed
  - Refresh seed monthly (minimum quarterly)
```

**Google Ads (Similar Audiences → Optimized Targeting)**

```
NOTE: Google deprecated Similar Audiences in August 2023.
Replacement: Optimized Targeting + Customer Match signals.

CURRENT OPTIONS:
  1. Optimized Targeting (enabled by default in Display/Demand Gen)
     - Uses your seed signals (customer lists, interests) to expand
     - Can't control expansion percentage
     - Monitor regularly — can expand too broadly

  2. Customer Match as signal
     - Upload customer list → Google uses it as "seed" for expansion
     - Works with Search, Display, YouTube, Demand Gen, PMax
     - Minimum list size: 1,000 matched users

  3. Audience Segments
     - In-Market: Users actively researching/buying
     - Affinity: Users with long-term interests
     - Custom Segments: Define by keyword/URL/app interests
     - Combined Segments: Boolean logic (AND/OR/NOT)
```

**LinkedIn (Predictive Audiences)**

```
CREATION:
  Campaign Manager → Plan → Audiences → Create Audience → Predictive

SEED SOURCES:
  1. Contact list (emails, LinkedIn profile URLs)
  2. Company list (domains, company names)
  3. Lead Gen Form completions
  4. Video viewers
  5. Company Page visitors
  6. Event attendees
  7. Conversions API data

SIZE REQUIREMENTS:
  Minimum seed: 300 members (matched)
  Recommended seed: 1,000+ for quality
  Resulting audience: Typically 10x-50x seed size

TARGETING LAYERS:
  - Company size, industry, job function
  - Seniority level, job title
  - Skills, groups, interests
  - Company growth rate, technologies used
```

**TikTok (Lookalike Audiences)**

```
CREATION:
  TikTok Ads Manager → Assets → Audiences → Create Audience → Lookalike

SEED SOURCES:
  1. Custom Audience from pixel events
  2. Customer file upload
  3. App activity audience
  4. Engagement audience (video views, profile visits)
  5. Lead generation audience

SIZE OPTIONS:
  - Narrow (top 1-2%)
  - Balanced (top 5%)
  - Broad (top 10%)
  
  Minimum seed: 100 users (1,000+ recommended)
  
BEST PRACTICES:
  - Start with Balanced, test Narrow for lower CPA
  - Refresh seed every 2-4 weeks
  - Use "Include audience" mode, not "Exclude"
  - Combine with broad interest targeting for Scale
```

**Reddit (Custom Audiences)**

```
CREATION:
  Reddit Ads → Audiences → Create Custom Audience

AVAILABLE AUDIENCE TYPES:
  1. Customer list (email, mobile ad IDs)
  2. Website retargeting (Reddit Pixel required)
  3. Engagement retargeting (post/community engagement)
  4. Lookalike from customer list

SIZE REQUIREMENTS:
  Minimum: 1,000 users in list
  Recommended: 5,000+ for stable delivery
  
UNIQUE FEATURES:
  - Community (subreddit) targeting: Target by interest community
  - Interest targeting: Pre-built interest categories
  - Conversation targeting: Target by topic keywords
  - Device/OS targeting: iOS vs Android vs Desktop
```

### 3. Seed Audience Quality Optimization

**Seed quality scoring:**

```
SCORE A (Best): High-value converters
  Source: Top 20% customers by LTV or repeat purchases
  Minimum size: 500+ matched users
  Refresh: Monthly
  Result: Lowest CPA lookalikes

SCORE B (Good): All converters
  Source: All customers/purchasers/signups
  Minimum size: 1,000+ matched users
  Refresh: Monthly
  Result: Good CPA, broader reach

SCORE C (Moderate): Intent signals
  Source: Add-to-cart, demo request, pricing page viewers
  Minimum size: 2,000+ users
  Refresh: Bi-weekly
  Result: Moderate CPA, good for consideration

SCORE D (Weak): Engagement signals
  Source: Video viewers, social engagers, blog readers
  Minimum size: 5,000+ users
  Refresh: Weekly
  Result: Higher CPA, good for awareness
```

**Seed optimization techniques:**

```
1. SEGMENT BY VALUE
   Instead of all customers, use top 20% by revenue
   Impact: 20-40% CPA reduction in lookalikes

2. SEGMENT BY RECENCY
   Use 90-day customers, not all-time
   Impact: 15-25% CPA reduction (more relevant patterns)

3. EXCLUDE OUTLIERS
   Remove one-time purchasers under $10
   Remove bulk/wholesale orders
   Impact: 10-20% quality improvement

4. COMBINE SIGNALS
   Merge purchase data + engagement data
   Weight by LTV (Meta value-based lookalike)
   Impact: 10-30% CPA improvement

5. MINIMUM VIABLE SEED
   Platform minimums are too low for quality
   Actual minimums for good results:
     Meta: 1,000+ matched (not uploaded — matched)
     Google: 1,000+ matched
     LinkedIn: 1,000+ matched
     TikTok: 1,000+ matched
     Reddit: 5,000+ matched
```

### 4. Audience Layering Techniques

**Layering = combining multiple targeting dimensions for precision**

```
BASIC LAYER (Interest + Demo):
  Interest: "Project Management Software"
  AND Age: 25-54
  AND Job title contains: "Manager" OR "Director"
  Estimated audience: 500K-2M

INTERMEDIATE LAYER (Behavior + Interest + Exclusion):
  In-Market: "Business Software"
  AND Interest: "SaaS" OR "Cloud Computing"
  AND NOT existing customer list
  AND NOT converter (last 30 days)
  Estimated audience: 200K-800K

ADVANCED LAYER (Custom + Lookalike + Behavior):
  Lookalike 3% of high-value customers
  AND In-Market: "CRM Software"
  AND NOT website visitors (last 7 days) — give retargeting a chance first
  Estimated audience: 100K-400K
```

**Platform layering capabilities:**

| Platform | AND Logic | OR Logic | NOT (Exclusion) | Custom + Interest | Notes |
|----------|-----------|----------|-----------------|-------------------|-------|
| Google Ads | ✅ Combined Segments | ✅ Combined Segments | ✅ Exclusions | ✅ | Most flexible |
| Meta | ✅ Detailed Targeting | ✅ Within category | ✅ Exclusions | ✅ | Advantage+ may override |
| LinkedIn | ✅ Faceted targeting | ✅ Within facet | ✅ Exclusions | ✅ | Premium targeting data |
| TikTok | ✅ Ad group level | ✅ Within category | ✅ Exclusions | ✅ | Growing capabilities |
| Reddit | ⚠️ Limited | ✅ Interest/community | ✅ Exclusions | ✅ | Community-first |
| Microsoft | ✅ Combined targeting | ✅ Within category | ✅ Exclusions | ✅ | LinkedIn data available |

### 5. Exclusion Strategies

**Mandatory exclusions (always set up):**

```
EXCLUSION LIST 1: Existing Customers
  Source: CRM customer list (email match)
  Platforms: ALL
  Refresh: Weekly (minimum monthly)
  Why: Prevents wasting spend on people who already bought

EXCLUSION LIST 2: Recent Converters
  Source: Pixel-based, last 30-90 days
  Platforms: ALL
  Why: Don't show acquisition ads to recent signups/purchasers

EXCLUSION LIST 3: Employees
  Source: Company email domain, internal IP range
  Platforms: ALL
  Why: Employees clicking = wasted budget + inflated metrics

EXCLUSION LIST 4: Bad Leads
  Source: CRM "disqualified" or "unqualified" leads
  Platforms: ALL
  Refresh: Monthly
  Why: Stop attracting similar low-quality leads
```

**Advanced exclusions:**

```
CROSS-CAMPAIGN EXCLUSIONS:
  Campaign: Retargeting
    Exclude: Users who converted via retargeting (30 days)
  
  Campaign: Prospecting
    Exclude: All retargeting audiences (website visitors, engagers)
    Exclude: Existing customers
  
  Campaign: Brand
    Exclude: None (protect brand from competitors)

SEQUENTIAL EXCLUSIONS:
  Awareness campaigns → Exclude consideration converters
  Consideration campaigns → Exclude conversion converters
  Conversion campaigns → Exclude purchasers
  
  This prevents the same user being hit at multiple funnel stages simultaneously
```

### 6. Platform-Specific Audience Features

**Meta Advantage+ Audience:**

```
WHAT: Meta's AI-driven broad targeting that uses your seed
      audiences as "suggestions" rather than constraints

HOW IT WORKS:
  1. You provide audience suggestions (interests, demographics)
  2. Meta may go beyond those suggestions to find converters
  3. Reports show "audience reached" vs "audience suggested"

WHEN TO USE:
  ✅ Large budgets ($1K+/day) with strong pixel data
  ✅ When manual audiences are exhausted
  ✅ E-commerce with 50+ conversions/week
  
WHEN TO AVOID:
  ❌ Small budgets (<$200/day)
  ❌ Niche B2B with very specific ICP
  ❌ Regulated industries needing targeting documentation
  ❌ New pixel with <100 conversions

CONTROLS:
  - Audience Controls: Set hard floors (age, location, language)
  - These are respected even in Advantage+ mode
```

**Google Optimized Targeting:**

```
WHAT: Google expands beyond your audience signals when it
      predicts higher conversion probability

DEFAULT: Enabled on Display and Demand Gen campaigns

CONTROLS:
  - Can be toggled per ad group
  - Audience segments become "signals" not constraints
  - Exclusions are always respected

WHEN TO KEEP ON:
  ✅ Sufficient conversion data (30+ conversions/month)
  ✅ Smart Bidding active (Target CPA or Target ROAS)
  ✅ Display or Demand Gen campaigns

WHEN TO TURN OFF:
  ❌ Limited conversion data
  ❌ Need precise targeting (account-based marketing)
  ❌ Testing specific audience hypotheses
  ❌ Manual bidding strategies
```

### 7. Customer Match / Custom Audiences Setup

**Data preparation:**

```
FORMATTING REQUIREMENTS (all platforms):

Email:
  - Lowercase
  - Trim whitespace
  - Remove periods from Gmail (john.doe → johndoe)
  - SHA256 hash (Google, Meta) or plain text (LinkedIn)
  
Phone:
  - Include country code (+1, +44)
  - Remove spaces, dashes, parentheses
  - Format: +15551234567
  
Name:
  - First name and last name in separate fields
  - Lowercase for hashing
  - No titles (Mr, Dr, etc.)

FILE FORMAT:
  - CSV with headers
  - UTF-8 encoding
  - Max file size: varies (Meta: 10GB, Google: 5GB)
```

**Match rates by platform:**

| Platform | Avg Match Rate | Minimum for Delivery | Tips to Improve |
|----------|---------------|---------------------|-----------------|
| Meta | 60-80% | 1,000 matched | Include phone + email |
| Google | 30-50% | 1,000 matched | Use Gmail addresses, add phone |
| LinkedIn | 40-70% | 300 matched | Use company email (not personal) |
| TikTok | 30-50% | 100 matched | Include mobile ad IDs |
| Reddit | 20-40% | 1,000 matched | Email-heavy, lower match |
| X (Twitter) | 30-50% | 500 matched | Include @handles if available |
| Microsoft | 30-50% | 1,000 matched | Include LinkedIn data |

## Reference Data

### Audience Size Recommendations by Platform

| Platform | Minimum Viable | Recommended | Optimal | Max Before Noise |
|----------|---------------|-------------|---------|------------------|
| Meta | 100K | 1M-5M | 2M-10M | No max (Advantage+ works broad) |
| Google Display | 100K | 500K-2M | 1M-5M | No max |
| Google Search | 1K searches/mo | 10K | 50K+ | No max |
| LinkedIn | 50K | 100K-500K | 300K-1M | 3M+ gets noisy |
| TikTok | 100K | 500K-2M | 1M-5M | No max |
| Reddit | 50K | 200K-1M | 500K-2M | 5M+ gets noisy |
| Microsoft | 50K | 300K-1M | 500K-2M | No max |
| YouTube | 100K | 500K-2M | 1M-5M | No max |

### Audience Fatigue Indicators

```
FREQUENCY THRESHOLDS (when to expand):
  Meta: Frequency >3x/week → expand or refresh creative
  Google Display: Frequency >5x/week → expand
  LinkedIn: Frequency >4x/week → expand
  TikTok: Frequency >4x/week → expand

PERFORMANCE INDICATORS:
  CTR declining 20%+ week-over-week → audience fatigue
  CPA increasing 25%+ week-over-week → audience saturation
  Reach plateauing at <50% of audience size → saturation
  Negative feedback increasing → creative fatigue + audience fatigue
```

## Examples

### Example: B2B SaaS Audience Expansion Plan

```markdown
# Audience Expansion Plan: Acme CRM
**Current state:** 3 audiences, $12K/mo spend, $85 CPA
**Goal:** 2x volume while maintaining $85-100 CPA

## Current Audiences (keep running)
1. Website retargeting 30-day (2,500 users) — CPA: $45
2. Lookalike 1% from trial signups (2.1M) — CPA: $72
3. In-market "CRM Software" (850K) — CPA: $105

## Expansion Audiences (new)

### Tier 2 — Warm (add weeks 1-2)
4. Lookalike 3% from PAID customers (not just trials) — est. 6.3M
   Budget: $2,000/mo | Target CPA: $80-90
5. Customer Match: Sales-qualified leads from CRM — est. 50K matched
   Budget: $1,000/mo | Target CPA: $70-80

### Tier 3 — Cool (add weeks 3-4)
6. Lookalike 5% from top 20% customers by LTV — est. 10.5M
   Budget: $3,000/mo | Target CPA: $90-100
7. Custom segment: Keywords ["CRM alternative", "HubSpot alternative",
   "Salesforce for small business"] — est. 1.2M
   Budget: $2,000/mo | Target CPA: $85-95

### Tier 4 — Cold (add weeks 5-6, if Tiers 2-3 scale)
8. Optimized Targeting on with seed signals — est. unlimited
   Budget: $2,000/mo | Target CPA: $95-110
   Note: Monitor closely, kill if CPA exceeds $110

## Exclusions (apply to ALL campaigns)
- All existing customers (refresh weekly from CRM)
- Trial signups in last 30 days
- Employees (acme.com domain)
- Disqualified leads from CRM

## Projected Results
Current: 141 conversions/mo at $85 CPA ($12K spend)
Target: 280+ conversions/mo at $85-95 CPA ($24K spend)
```
