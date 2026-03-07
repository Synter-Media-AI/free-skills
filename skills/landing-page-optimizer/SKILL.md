---
name: landing-page-optimizer
description: Optimizes landing pages for ad campaigns including message match, form design, page speed, and CTA placement. Use when reviewing landing pages, improving conversion rates, auditing message match, or optimizing forms.
---

# Landing Page Optimizer

Provides comprehensive landing page optimization guidance for ad campaigns including above-the-fold analysis, ad-to-page message match, form optimization, mobile-first design, page speed impact on Quality Score, social proof placement, CTA optimization, and industry conversion rate benchmarks.

## Capabilities

- **Above-the-Fold Audit**: Checklist for first-screen content optimization
- **Message Match Analysis**: Ad copy → landing page headline alignment scoring
- **Form Optimization**: Field count, multi-step design, progressive profiling
- **Mobile-First Requirements**: Touch targets, viewport, scroll depth
- **Page Speed Analysis**: Core Web Vitals impact on conversion and Quality Score
- **Social Proof Strategy**: Placement, types, and effectiveness ranking
- **CTA Optimization**: Button design, copy formulas, placement testing
- **Conversion Rate Benchmarks**: Industry-specific targets and percentiles

## Workflows

### 1. Above-the-Fold Optimization Checklist

**The fold = first screen visible without scrolling (varies by device)**

```
MUST HAVE above the fold:
  ✅ Headline matching ad copy (message match)
  ✅ Sub-headline explaining the value proposition
  ✅ Primary CTA button (visible, contrasting color)
  ✅ Hero image or video showing product/result
  ✅ Trust signal (logo bar, rating, or certification)

NICE TO HAVE above the fold:
  ⬜ Benefit bullet points (3 max)
  ⬜ Social proof number ("10,000+ customers")
  ⬜ Urgency element (limited time offer)

MUST NOT be above the fold:
  ❌ Navigation menu with multiple links (distraction)
  ❌ Multiple CTAs competing for attention
  ❌ Long paragraphs of text
  ❌ Auto-playing video with sound
  ❌ Pop-up or overlay on page load
```

**Device-specific fold heights:**

| Device | Approximate Fold Height | Notes |
|--------|------------------------|-------|
| Desktop (1920×1080) | ~700px | Most common desktop resolution |
| Laptop (1366×768) | ~550px | Most common laptop resolution |
| iPad | ~900px (portrait) | Generous fold |
| iPhone 14/15 | ~650px | Account for browser chrome |
| Android avg | ~600px | Wide variation |

### 2. Message Match Analysis

**Message match = alignment between ad copy and landing page headline**

**Scoring system:**

```
SCORE 5 — PERFECT MATCH
  Ad headline: "Get 50% Off CRM Software — Free Trial"
  LP headline: "Get 50% Off CRM Software — Start Your Free Trial"
  → Exact language match, reinforces ad promise

SCORE 4 — STRONG MATCH  
  Ad headline: "Get 50% Off CRM Software — Free Trial"
  LP headline: "Save 50% on the CRM Built for Small Teams"
  → Same offer, slight rephrasing, consistent intent

SCORE 3 — MODERATE MATCH
  Ad headline: "Get 50% Off CRM Software — Free Trial"
  LP headline: "The Best CRM for Growing Businesses"
  → Same product, but offer not reinforced above fold

SCORE 2 — WEAK MATCH
  Ad headline: "Get 50% Off CRM Software — Free Trial"
  LP headline: "Welcome to Acme — We Build Business Software"
  → Generic, doesn't reinforce specific ad promise

SCORE 1 — MISMATCH
  Ad headline: "Get 50% Off CRM Software — Free Trial"
  LP headline: "Check Out Our Full Product Suite"
  → Different topic, user will bounce
```

**Message match audit template:**

```markdown
| Ad Group | Ad Headline | Landing Page Headline | Match Score | Fix Required |
|----------|-------------|----------------------|-------------|--------------|
| CRM Trial | "Free CRM Trial" | "Start Free Trial" | 5 | None |
| CRM Pricing | "CRM from $9/mo" | "Welcome to Acme" | 2 | Update LP headline |
| CRM vs Comp | "Switch from HubSpot" | "CRM Software" | 3 | Add comparison angle |
```

**Message match optimization rules:**

```
1. Each ad group should have its own landing page variant
   OR use dynamic text replacement (DTR)

2. Dynamic Text Replacement setup:
   URL: example.com/landing?headline={keyword}
   LP code: Replace H1 with URL parameter value
   Fallback: Generic headline if parameter empty

3. Minimum elements to match:
   - Primary offer (discount, free trial, etc.)
   - Product/service name
   - Key differentiator mentioned in ad
   - CTA action verb (Get, Try, Start, Download)
```

### 3. Form Optimization

**Field count impact on conversion rate:**

| Fields | Avg Conversion Rate | Relative Performance | Best For |
|--------|--------------------|--------------------|----------|
| 1 (email only) | 10-15% | Baseline | Newsletter, content downloads |
| 2 (email + name) | 8-12% | -15% vs 1 field | Free trial, webinar signup |
| 3 | 6-10% | -25% vs 1 field | Gated content, demo request |
| 4-5 | 4-8% | -40% vs 1 field | Qualified lead forms |
| 6-8 | 2-5% | -55% vs 1 field | Complex B2B, insurance quotes |
| 9+ | 1-3% | -70% vs 1 field | Detailed applications |

**Multi-step form design:**

```
Step 1: Low commitment (2-3 fields)
  → Email, Name, Company
  → Progress bar: "Step 1 of 3"
  → Button: "Continue →" (not "Submit")

Step 2: Qualifying questions (2-3 fields)
  → Company Size (dropdown), Role (dropdown), Budget (range)
  → Progress bar: "Step 2 of 3 — Almost there!"
  → Button: "One More Step →"

Step 3: Contact details + CTA (1-2 fields)
  → Phone (optional), Preferred Contact Time
  → Progress bar: "Step 3 of 3 — Last step!"
  → Button: "Get My Free Demo →" (specific CTA)
```

**Multi-step form benefits:**

```
- 86% higher completion rate vs single long form (Typeform data)
- Sunk cost effect: users who start are more likely to finish
- Progressive disclosure reduces cognitive load
- Each step can have its own validation
- Allows conditional logic (show/hide fields based on answers)
```

**Form best practices:**

```
✅ DO:
  - Left-align labels (not center or right)
  - Use placeholder text AND labels (not placeholders alone)
  - Show inline validation (real-time, not on submit)
  - Pre-fill fields when possible (UTM params, cookies)
  - Use dropdown for 5+ options, radio for 2-4
  - Make phone number optional
  - Auto-format phone numbers and dates
  - Show password requirements before user types

❌ DON'T:
  - Use CAPTCHA unless spam is a real problem (kills 10-20% of conversions)
  - Ask for information you don't need yet
  - Use "Submit" as button text (use action-specific: "Get My Quote")
  - Put form below the fold on desktop
  - Require account creation before value delivery
  - Use dropdown for Yes/No questions
```

### 4. Mobile-First Design Requirements

**Touch target sizes:**

```
Minimum touch target: 44px × 44px (Apple HIG)
Recommended: 48px × 48px (Google Material)
Spacing between targets: ≥8px

CTA button:
  Height: ≥48px
  Width: ≥280px (near full-width on mobile)
  Font size: ≥16px
  Padding: 14px 24px minimum
```

**Mobile-specific checklist:**

```
LAYOUT:
  ✅ Single column layout (no side-by-side content)
  ✅ Headline visible above fold (≤2 lines on mobile)
  ✅ CTA button visible above fold OR sticky bottom CTA
  ✅ No horizontal scrolling
  ✅ Images responsive (not cropped awkwardly)

FORMS:
  ✅ Input fields full-width
  ✅ Appropriate keyboard types (email → email keyboard, phone → numpad)
  ✅ Auto-zoom prevention (font-size ≥16px on inputs)
  ✅ Autofill enabled (proper name/autocomplete attributes)

PERFORMANCE:
  ✅ Images ≤100KB each (use WebP/AVIF)
  ✅ No render-blocking JavaScript above fold
  ✅ Lazy-load below-fold images
  ✅ Total page size ≤1.5MB
  ✅ LCP (Largest Contentful Paint) ≤2.5s

NAVIGATION:
  ✅ Hamburger menu OR no menu (landing pages)
  ✅ Sticky header ≤60px height
  ✅ Click-to-call phone numbers
  ✅ Click-to-map addresses
```

### 5. Page Speed Impact

**Core Web Vitals and conversion impact:**

| Metric | Good | Needs Improvement | Poor | Conversion Impact |
|--------|------|-------------------|------|-------------------|
| LCP (Largest Contentful Paint) | ≤2.5s | 2.5-4.0s | >4.0s | -7% per extra second |
| FID (First Input Delay) | ≤100ms | 100-300ms | >300ms | -3% per 100ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | 0.1-0.25 | >0.25 | -5% per 0.1 shift |
| INP (Interaction to Next Paint) | ≤200ms | 200-500ms | >500ms | -4% per 100ms |
| TTFB (Time to First Byte) | ≤800ms | 800ms-1.8s | >1.8s | -2% per 100ms |

**Page speed → Quality Score impact (Google Ads):**

```
Google's landing page experience factor considers:
  1. Page load speed (Core Web Vitals)
  2. Mobile-friendliness
  3. Relevant, useful content
  4. Easy navigation

Quality Score impact:
  Fast page (LCP <2s): Neutral to +1 QS point
  Average page (LCP 2-4s): Neutral
  Slow page (LCP >4s): -1 to -2 QS points
  
  Each QS point = ~16% CPC change
  A slow page costing -2 QS = ~32% higher CPCs
```

**Speed optimization priorities:**

```
HIGHEST IMPACT (do first):
  1. Compress and resize images (saves 40-80% page weight)
  2. Use CDN for static assets (saves 200-500ms TTFB)
  3. Remove unused JavaScript (parse time reduction)
  4. Set explicit image dimensions (prevents CLS)

MEDIUM IMPACT:
  5. Enable text compression (gzip/brotli)
  6. Preload critical fonts (prevents FOUT/FOIT)
  7. Defer non-critical CSS
  8. Use responsive images (srcset)

LOWER IMPACT:
  9. HTTP/2 or HTTP/3
  10. Service worker caching
  11. Prefetch next likely page
```

### 6. Social Proof Placement Strategies

**Social proof types ranked by conversion impact:**

| Type | Conversion Lift | Best Placement | Notes |
|------|----------------|----------------|-------|
| Customer count | +10-15% | Above fold, near headline | "Join 50,000+ marketers" |
| Star ratings + review count | +12-18% | Above fold, near CTA | "4.8/5 from 12,000 reviews" |
| Customer logos | +8-12% | Below headline, logo bar | 4-6 recognizable logos |
| Video testimonials | +15-25% | Below fold, before CTA | 30-60 seconds, real customers |
| Case study results | +10-20% | Mid-page | "[Customer] grew revenue 340%" |
| Real-time activity | +5-10% | Floating notification | "John from NYC signed up 2min ago" |
| Security badges | +5-8% | Near form/payment | SSL, SOC2, GDPR, PCI |
| Media mentions | +5-10% | Below fold, "As seen in" | "Featured in Forbes, TechCrunch" |
| Industry awards | +3-5% | Footer or sidebar | G2, Capterra badges |

**Placement hierarchy:**

```
ABOVE THE FOLD:
  ┌────────────────────────────────────────┐
  │ [Logo]                                  │
  │                                        │
  │ Headline (matching ad)                 │
  │ Sub-headline                           │
  │                                        │
  │ ★★★★★ 4.8/5 (12,000 reviews)          │ ← Star rating
  │                                        │
  │ [  CTA BUTTON  ]                       │
  │                                        │
  │ [Logo] [Logo] [Logo] [Logo] [Logo]     │ ← Customer logos
  └────────────────────────────────────────┘

MID-PAGE:
  ┌────────────────────────────────────────┐
  │ "Acme Corp increased pipeline by 340%  │
  │  in 90 days using our platform"        │ ← Case study
  │  — Sarah Chen, VP Marketing, Acme Corp │
  │  [Read Full Case Study →]              │
  └────────────────────────────────────────┘

PRE-CTA:
  ┌────────────────────────────────────────┐
  │ 🔒 SOC2 Certified | GDPR Compliant    │ ← Security trust
  │ 14-day free trial · No credit card     │ ← Risk reversal
  │                                        │
  │ [  START FREE TRIAL  ]                 │ ← Final CTA
  │                                        │
  │ "Join 50,000+ companies worldwide"     │ ← Customer count
  └────────────────────────────────────────┘
```

### 7. CTA Button Optimization

**CTA copy formulas:**

| Formula | Example | Best For |
|---------|---------|----------|
| Action + Value | "Get My Free Report" | Lead gen, content |
| Action + Time | "Start Free in 60 Seconds" | SaaS free trial |
| Action + Risk Reversal | "Try Free — No Credit Card" | Subscription |
| First Person | "Start My Free Trial" | Any (tests 90% better than "your") |
| Urgency + Action | "Claim My Spot — 12 Left" | Events, limited offers |
| Outcome-Focused | "Grow My Revenue" | Aspirational products |
| Specific Benefit | "See My SEO Score" | Tools, calculators |

**CTA button design rules:**

```
COLOR:
  - High contrast against background (WCAG AA minimum: 4.5:1)
  - Use brand accent color, NOT the page's primary color
  - Orange, green, and blue test best (varies by brand)
  - Never use gray or low-saturation colors

SIZE:
  - Desktop: min 200px wide, 48px tall
  - Mobile: near full-width (90%+), min 48px tall
  - Padding: 16px vertical, 32px horizontal minimum

PLACEMENT:
  - Above fold: Required (primary CTA)
  - After each major section: Recommended (secondary CTA)
  - Sticky bottom bar (mobile): Highly effective
  - Right after testimonial/proof: High-converting placement

SURROUNDING ELEMENTS:
  - Whitespace: 24px+ padding around button
  - Micro-copy below: "No credit card required" or "Cancel anytime"
  - Directional cue: Arrow icon → or visual pointer
  - Contrast block: Put CTA in contrasting background section
```

## Reference Data

### Conversion Rate Benchmarks by Industry

| Industry | Median CVR | Top 25% | Top 10% | Avg CPA |
|----------|-----------|---------|---------|---------|
| E-Commerce | 2.5% | 4.5% | 7.0% | $30-65 |
| SaaS (Free Trial) | 3.0% | 5.5% | 8.5% | $25-80 |
| SaaS (Demo Request) | 1.5% | 3.0% | 5.0% | $60-200 |
| Financial Services | 2.0% | 4.0% | 6.5% | $50-150 |
| Healthcare | 2.3% | 4.2% | 6.8% | $40-120 |
| Education | 3.5% | 6.0% | 9.0% | $20-60 |
| Real Estate | 1.8% | 3.5% | 5.5% | $30-100 |
| Legal | 2.0% | 3.8% | 6.0% | $80-300 |
| Travel | 2.2% | 4.0% | 6.5% | $25-70 |
| B2B Services | 1.5% | 3.0% | 5.0% | $50-200 |
| Agency (Lead Gen) | 2.5% | 5.0% | 8.0% | $30-100 |

### Landing Page Type Performance

| Page Type | Best For | Avg CVR | Key Element |
|-----------|----------|---------|-------------|
| Long-form sales page | High-ticket products | 1-3% | Story arc, proof, urgency |
| Short lead gen | B2B demos, consultations | 3-8% | Form above fold, trust |
| Click-through | E-commerce, free trials | 5-15% | Single CTA, product focus |
| Video landing page | Complex products | 4-10% | Auto-play (muted), transcript |
| Quiz/Calculator | Insurance, finance | 8-20% | Interactive, personalized |
| Squeeze page | Email list, webinar | 10-30% | Minimal copy, single field |

## Examples

### Example: Landing Page Audit Report

```markdown
# Landing Page Audit: acme.com/demo

## Overall Score: 62/100 (Needs Improvement)

### ✅ Passing (6/10)
- CTA button above fold
- Mobile responsive layout
- SSL certificate active
- No broken links
- Form has inline validation
- Thank you page properly configured

### ❌ Failing (4/10)

1. **Message Match: SCORE 2/5** (CRITICAL)
   - Ad: "AI-Powered CRM — Start Free Trial"
   - LP Headline: "Welcome to Acme"
   - Fix: Change H1 to "Start Your Free AI CRM Trial"

2. **Page Speed: LCP 4.8s** (CRITICAL)
   - Hero image: 2.4MB uncompressed PNG
   - Fix: Convert to WebP, resize to 1200px, compress to ~150KB
   - Estimated improvement: LCP 4.8s → 2.1s

3. **Form: 8 fields on single page** (HIGH)
   - Current conversion rate: 1.8%
   - Fix: Convert to 3-step form (3/3/2 fields)
   - Estimated improvement: +40-60% conversion rate

4. **No social proof above fold** (MEDIUM)
   - Fix: Add customer count + star rating below headline
   - Add 4-5 customer logos above CTA
   - Estimated improvement: +10-15% conversion rate

### Projected Impact
- Current: 1.8% conversion rate, $110 CPA
- After fixes: 3.5-4.5% conversion rate, $55-70 CPA
- Monthly savings: $4,500-7,200 (at current traffic)
```
