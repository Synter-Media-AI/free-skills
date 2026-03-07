---
name: retargeting-sequence-designer
description: Multi-stage retargeting funnel design with audience windows, sequential messaging, frequency capping, and exclusion lists. Use when building retargeting funnels, remarketing sequences, audience segmentation by recency, or cross-platform retargeting coordination.
---

# Retargeting Sequence Designer

Design multi-stage retargeting funnels that guide users from awareness through conversion with time-based audience segmentation, sequential messaging, frequency capping, and cross-platform coordination. Manages exclusion lists to prevent wasted spend on existing customers and converters.

## Capabilities

- **Multi-Stage Funnel Design**: Build 3–5 stage retargeting sequences aligned to buyer journey
- **Audience Window Strategy**: Segment audiences by recency (1-day, 7-day, 30-day, 90-day)
- **Sequential Messaging**: Escalate messaging from education → social proof → urgency → offer
- **Frequency Capping**: Platform-specific cap strategies to prevent ad fatigue
- **Cross-Platform Coordination**: Unified retargeting across Google, Meta, LinkedIn, Reddit, TikTok
- **Dynamic Creative Optimization (DCO)**: Personalize ads based on products viewed or pages visited
- **Exclusion List Management**: Automatically exclude purchasers, converters, and unqualified leads

## Workflows

### 1. Design a Retargeting Funnel

```
1. Define conversion goal (purchase, signup, demo request, download)
2. Map the buyer journey stages:
   - Stage 1: All site visitors (awareness reinforcement)
   - Stage 2: Engaged visitors (product page, pricing page, >2 pages)
   - Stage 3: High-intent visitors (cart, checkout, demo page)
   - Stage 4: Abandoned converters (started but didn't finish)
3. Assign audience windows to each stage (see Reference Data)
4. Create messaging sequence per stage
5. Set frequency caps per stage
6. Configure exclusion lists (converters, existing customers)
7. Allocate budget: 60% to Stage 3-4, 25% to Stage 2, 15% to Stage 1
```

### 2. Audience Window Strategy

```
1. Hot audience (0-3 days): Highest intent, highest bids
   - Message: Direct CTA, urgency, limited-time offer
   - Frequency: Up to 3 impressions/day
   - Budget: 35% of retargeting budget

2. Warm audience (4-14 days): Moderate intent, moderate bids
   - Message: Social proof, case studies, reviews
   - Frequency: Up to 2 impressions/day
   - Budget: 30% of retargeting budget

3. Cool audience (15-30 days): Declining intent, lower bids
   - Message: Educational content, value proposition refresh
   - Frequency: Up to 1 impression/day
   - Budget: 20% of retargeting budget

4. Cold audience (31-90 days): Re-engagement, lowest bids
   - Message: New features, seasonal offers, brand reminder
   - Frequency: Up to 3 impressions/week
   - Budget: 15% of retargeting budget

5. Apply mutual exclusions: each window excludes all shorter windows
   - 4-14 day audience EXCLUDES 0-3 day audience
   - 15-30 day audience EXCLUDES 0-14 day audience
   - 31-90 day audience EXCLUDES 0-30 day audience
```

### 3. Sequential Messaging Framework

```
Touchpoint 1 (Day 0-1): "Still thinking about [product]?"
  → Dynamic product image, simple CTA

Touchpoint 2 (Day 2-4): "Here's why 10,000+ teams chose us"
  → Customer testimonial, star rating, logo wall

Touchpoint 3 (Day 5-10): "Your exclusive offer expires soon"
  → Discount code, countdown timer, scarcity element

Touchpoint 4 (Day 11-20): "New: [feature] just launched"
  → Feature highlight, fresh angle, re-engagement

Touchpoint 5 (Day 21-30): "We miss you — here's 20% off"
  → Final offer, loss aversion, direct CTA

After Day 30: Move to cold audience pool or suppress
```

### 4. Cross-Platform Retargeting Coordination

```
1. Install unified pixel/tag across all platforms
   - Google: Global site tag + remarketing tag
   - Meta: Pixel with standard events
   - LinkedIn: Insight Tag
   - Reddit: Reddit Pixel
   - TikTok: TikTok Pixel

2. Assign platform roles:
   - Google Display/YouTube: Broad reach, awareness reinforcement
   - Meta/Instagram: Visual storytelling, social proof
   - LinkedIn: B2B decision-maker targeting
   - Reddit: Community-specific messaging
   - TikTok: Short-form creative, younger demographics

3. Frequency budget across platforms:
   - Total cross-platform cap: 5-8 impressions/day per user
   - Allocate by platform based on where audience spends time
   - Use a shared suppression list for converters

4. Deduplicate where possible:
   - Upload Customer Match / Custom Audience lists to all platforms
   - Use email-based matching for cross-platform suppression
```

### 5. Exclusion List Management

```
1. Converters (mandatory exclusion from all retargeting):
   - Purchasers (last 30 days minimum, 90 days recommended)
   - Form submitters (demo requests, signups)
   - Trial activators

2. Unqualified leads:
   - Bounce rate >90% with <5 seconds on site
   - Job seekers (visited /careers page)
   - Competitors (known company domains if ABM)

3. Existing customers:
   - Active subscribers → upsell sequence instead
   - Churned customers → win-back sequence (separate from acquisition)

4. Implementation:
   - Google: Audience Manager → create suppression list
   - Meta: Custom Audience → exclude from ad set
   - LinkedIn: Matched Audiences → exclude segment
   - Sync CRM data weekly for fresh suppression lists
```

## Reference Data

### Audience Window Benchmarks

| Window | Avg CVR | Recommended Bid Modifier | Best For |
|--------|---------|--------------------------|----------|
| 0-1 day | 5-10% | +50% to +100% | Cart abandonment, high-intent |
| 2-7 days | 3-6% | +25% to +50% | Product page visitors |
| 8-14 days | 2-4% | +10% to +25% | Category browsers |
| 15-30 days | 1-2% | Baseline | General site visitors |
| 31-60 days | 0.5-1.5% | -10% to -25% | Re-engagement |
| 61-90 days | 0.3-0.8% | -25% to -50% | Brand reminder |
| 90-180 days | 0.1-0.4% | -50% | Last resort / seasonal |

### Frequency Cap Recommendations

| Platform | Display | Video | Feed/Native | Search |
|----------|---------|-------|-------------|--------|
| Google Display | 3-5/day | 2-3/day | N/A | N/A |
| YouTube | N/A | 3/week | N/A | N/A |
| Meta | N/A | N/A | 2-3/day | N/A |
| LinkedIn | N/A | N/A | 1-2/day | N/A |
| Reddit | N/A | N/A | 2-3/day | N/A |
| TikTok | N/A | 3-5/day | N/A | N/A |

### Retargeting Budget Allocation by Funnel Stage

| Stage | Budget % | Audience Size | Expected CPA |
|-------|----------|---------------|--------------|
| Abandoned Cart/Checkout | 35% | Smallest | Lowest (0.3x baseline) |
| Product/Pricing Page | 30% | Medium | Low (0.5x baseline) |
| Engaged Visitors (>2 pages) | 20% | Large | Moderate (0.8x baseline) |
| All Site Visitors | 15% | Largest | Highest (1.2x baseline) |

### Dynamic Creative Elements by Stage

| Funnel Stage | Image | Headline | CTA | Offer |
|--------------|-------|----------|-----|-------|
| Cart Abandonment | Product image from cart | "Complete Your Order" | "Buy Now" | Free shipping / 10% off |
| Product Page | Viewed product | "Still Interested?" | "Learn More" | None or soft incentive |
| Category Browser | Category hero image | Value proposition | "Shop Now" | Category-level promo |
| General Visitor | Brand awareness | Educational angle | "Discover" | Content offer (guide, ebook) |
| Re-engagement | New product / feature | "What's New" | "See Updates" | Win-back discount |

### Platform-Specific Retargeting Capabilities

| Feature | Google | Meta | LinkedIn | Reddit | TikTok |
|---------|--------|------|----------|--------|--------|
| Pixel-based audiences | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dynamic product ads | ✅ | ✅ | ❌ | ❌ | ✅ |
| Customer list upload | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lookalike/Similar audiences | ✅ | ✅ | ✅ | ❌ | ✅ |
| Sequential ad serving | ❌ | ✅ | ❌ | ❌ | ❌ |
| Video viewer retargeting | ✅ | ✅ | ✅ | ❌ | ✅ |
| Lead form retargeting | ❌ | ✅ | ✅ | ❌ | ✅ |
| Minimum audience size | 100 | 100 | 300 | 1,000 | 1,000 |

## Examples

### Example 1: E-commerce cart abandonment funnel

```
User: "Design a retargeting funnel for our Shopify store."

Funnel:
  Stage 1 (Day 0-1): Cart abandoners
    Platform: Meta (DPA) + Google Display
    Message: "You left items in your cart — complete your order"
    Creative: Dynamic product ads showing abandoned items
    Offer: Free shipping if they complete within 24h
    Frequency: 3/day
    Budget: 40%

  Stage 2 (Day 2-7): Cart + product page visitors
    Platform: Meta + Google Display
    Message: "Customers love [product] — 4.8★ rating"
    Creative: UGC reviews, star ratings
    Offer: None
    Frequency: 2/day
    Budget: 25%

  Stage 3 (Day 8-14): All product page visitors
    Platform: Google Display + YouTube
    Message: "Why [brand] is the #1 choice"
    Creative: Brand story video, comparison chart
    Offer: 10% off first order code
    Frequency: 1/day
    Budget: 20%

  Stage 4 (Day 15-30): All site visitors
    Platform: Google Display
    Message: "New arrivals you'll love"
    Creative: Seasonal collection, new products
    Offer: 15% off limited time
    Frequency: 3/week
    Budget: 15%

  Exclusions: Purchasers (90 days), existing subscribers
```

### Example 2: B2B SaaS demo retargeting

```
User: "Set up retargeting for users who visited our pricing page but didn't book a demo."

Funnel:
  Stage 1 (Day 0-3): Pricing page visitors
    Platform: LinkedIn + Google Display
    Message: "See [product] in action — book a 15-min demo"
    Creative: Demo screenshot, calendar CTA
    Frequency: 2/day
    Budget: 35%

  Stage 2 (Day 4-10): Pricing + feature page visitors
    Platform: LinkedIn + Meta
    Message: "How [Customer X] increased revenue 40% with [product]"
    Creative: Case study card, customer logo, metric highlight
    Frequency: 1/day
    Budget: 30%

  Stage 3 (Day 11-21): All visitors with >2 page views
    Platform: Google Display + YouTube
    Message: "The complete platform for [use case]"
    Creative: Product walkthrough video (60s)
    Frequency: 3/week
    Budget: 20%

  Stage 4 (Day 22-60): All site visitors
    Platform: Google Display
    Message: "New: [feature] just launched"
    Creative: Feature announcement, fresh angle
    Frequency: 2/week
    Budget: 15%

  Exclusions: Demo bookers, trial signups, existing customers
```

### Example 3: Cross-platform frequency management

```
User: "We're running retargeting on Google, Meta, and LinkedIn. Users are seeing too many ads."

Recommended approach:
1. Set per-platform daily caps:
   - Google Display: 2 impressions/day
   - Meta: 2 impressions/day
   - LinkedIn: 1 impression/day
   Total cross-platform: ~5 impressions/day (acceptable range)

2. Stagger messaging:
   - Google: Focus on product features (rational)
   - Meta: Focus on social proof (emotional)
   - LinkedIn: Focus on business outcomes (professional)

3. Upload shared suppression list to all platforms:
   - Weekly CRM export of converters → Custom Audience on each platform
   - Converters excluded within 24 hours of conversion

4. Monitor frequency metrics weekly:
   - Target: 4-6 avg frequency per 7-day window
   - If >8: reduce budgets or tighten audience windows
   - If <3: may be under-serving high-intent users
```
