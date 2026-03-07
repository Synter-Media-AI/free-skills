---
name: linkedin-ads-targeting
description: B2B advertising strategy on LinkedIn with job title targeting, ABM, lead gen forms, and cost benchmarks. Use when building LinkedIn Ads audiences, comparing ad formats, setting up ABM targeting, optimizing lead gen forms, or estimating LinkedIn Ads costs.
---

# LinkedIn Ads Targeting

Comprehensive LinkedIn Ads targeting strategy for B2B advertisers. Covers job title and seniority targeting, company size and industry filters, Matched Audiences (website, email, lookalike), account-based marketing (ABM), Lead Gen Form optimization, ad format comparison, and cost benchmarks.

## Capabilities

- **B2B Audience Building**: Target by job title, function, seniority, company size, industry, skills
- **Matched Audiences**: Website retargeting, email list upload, lookalike expansion
- **Account-Based Marketing (ABM)**: Company list upload, decision-maker targeting
- **Lead Gen Form Optimization**: Form design, field selection, conversion rate improvement
- **Ad Format Strategy**: Sponsored Content vs InMail vs Text Ads vs Conversation Ads
- **Cost Benchmarking**: CPC, CPM, CPL ranges by industry and objective
- **Audience Size Guidance**: Minimum sizes for delivery and optimization

## Workflows

### 1. Build a B2B Target Audience

```
1. Define Ideal Customer Profile (ICP):
   - Job titles / functions (e.g., "VP of Marketing", "Marketing Director")
   - Seniority levels (Director, VP, C-Suite)
   - Company size (51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10000+)
   - Industries (Computer Software, Information Technology, Financial Services)
   - Geography (country, state/region, metro area)

2. Layer targeting (AND logic between categories, OR within):
   - Job Function: Marketing OR Sales
   AND
   - Seniority: Director OR VP OR CXO
   AND
   - Company Size: 201-5000 employees
   AND
   - Industry: Computer Software OR SaaS
   AND
   - Geography: United States

3. Check audience size:
   - Minimum for delivery: 50,000 members
   - Ideal for optimization: 100,000-500,000 members
   - If too small: broaden seniority or add related job functions
   - If too large: narrow by skills, groups, or company list

4. Save audience for reuse across campaigns
```

### 2. Account-Based Marketing (ABM) Setup

```
1. Prepare company list (CSV):
   - Columns: Company Name, Company Domain, Company LinkedIn URL (optional)
   - Minimum 300 companies for matching
   - Recommended: 1,000-5,000 companies for scale

2. Upload to LinkedIn:
   - Campaign Manager → Plan → Audiences → Create Audience → Company List
   - Upload CSV
   - Wait for matching (usually 24-48 hours)
   - Expected match rate: 60-80% (LinkedIn matches by domain and name)

3. Layer with job-level targeting:
   - Company list: Your target accounts
   AND
   - Job Function: Decision makers (IT, Engineering, C-Suite)
   AND
   - Seniority: Director+ (avoid targeting individual contributors)

4. Create campaign tiers:
   Tier 1 (Top 50 accounts): Highest bids, personalized messaging
   Tier 2 (Next 200 accounts): Standard bids, industry-specific messaging
   Tier 3 (Remaining accounts): Lower bids, broader messaging

5. Measure ABM-specific metrics:
   - Account penetration: % of target accounts reached
   - Engagement rate by account tier
   - Pipeline influenced by ABM campaigns
```

### 3. Lead Gen Form Optimization

```
1. Form field selection (fewer fields = higher CVR):
   Recommended fields:
   - First Name (pre-filled) ✅
   - Last Name (pre-filled) ✅
   - Email (pre-filled) ✅
   - Company Name (pre-filled) ✅
   - Job Title (pre-filled) ✅
   
   Optional (add 1-2 max):
   - Phone Number (reduces CVR by 20-30%)
   - Company Size (custom question)
   - "What's your biggest challenge?" (custom question)

2. Form design:
   - Headline: Clear value proposition (what they get)
   - Description: 1-2 sentences, specific benefit
   - CTA button: "Download Now", "Get the Report", "Request Demo"
   - Privacy policy link: Required
   - Thank you message: Include next steps and timeline

3. Lead quality improvement:
   - Use custom questions to qualify (budget, timeline, authority)
   - Require work email (reject @gmail.com via CRM filter)
   - Set minimum company size in targeting to filter SMBs
   - Use hidden fields to pass UTM params and campaign ID

4. Follow-up workflow:
   - Sync leads to CRM within 5 minutes (Zapier, native integration)
   - Send confirmation email within 1 hour
   - Sales follow-up within 24 hours (speed-to-lead matters)
   - Nurture non-ready leads via email sequence

5. Benchmark CVRs:
   - 3 fields: 12-15% form fill rate
   - 5 fields: 8-12% form fill rate
   - 7+ fields: 4-8% form fill rate
```

### 4. Ad Format Selection

```
Objective → Format mapping:

Brand Awareness:
  → Sponsored Content (Single Image or Video)
  → Follower Ads
  → Audience: Broad (100k-500k)

Consideration / Engagement:
  → Sponsored Content (Carousel or Video)
  → Conversation Ads (multi-CTA InMail)
  → Audience: Mid-size (50k-200k)

Lead Generation:
  → Sponsored Content + Lead Gen Form
  → Message Ads (InMail) + Lead Gen Form
  → Audience: Targeted (50k-150k)

Website Traffic:
  → Sponsored Content (Single Image)
  → Text Ads (for sidebar placement, very cheap)
  → Audience: Broad (100k+)

Recruitment:
  → Sponsored Content (Job posts)
  → Message Ads
  → Audience: Job function + seniority specific
```

## Reference Data

### Cost Benchmarks by Industry (USD, 2025-2026)

| Industry | Avg CPC | Avg CPM | Avg CPL | Avg CTR |
|----------|---------|---------|---------|---------|
| Computer Software/SaaS | $7-12 | $35-55 | $75-150 | 0.40-0.65% |
| Financial Services | $8-14 | $40-60 | $100-200 | 0.35-0.55% |
| Healthcare/Pharma | $6-10 | $30-50 | $80-160 | 0.40-0.60% |
| Manufacturing | $5-9 | $25-45 | $60-120 | 0.45-0.70% |
| Education | $4-8 | $20-40 | $50-100 | 0.50-0.75% |
| Professional Services | $6-11 | $30-50 | $70-140 | 0.40-0.60% |
| Telecommunications | $7-12 | $35-55 | $90-180 | 0.35-0.55% |
| E-commerce/Retail | $5-9 | $25-45 | $60-130 | 0.45-0.65% |

### Cost Benchmarks by Ad Format

| Format | Avg CPC | Avg CPM | Avg Open Rate | Best For |
|--------|---------|---------|---------------|----------|
| Single Image Ad | $5-10 | $30-50 | N/A | Awareness, traffic |
| Video Ad | $8-15 | $35-60 | N/A | Engagement, brand |
| Carousel Ad | $6-12 | $30-55 | N/A | Product showcase |
| Message Ad (InMail) | $0.30-0.70/send | N/A | 30-55% | Lead gen, events |
| Conversation Ad | $0.40-0.80/send | N/A | 35-60% | Multi-CTA lead gen |
| Text Ad | $3-6 | $8-15 | N/A | Cheap awareness |
| Follower Ad | $3-5 | $15-25 | N/A | Page growth |
| Lead Gen Form | N/A | N/A | N/A | CPL: $50-200 |

### Targeting Dimension Reference

| Dimension | Options | Notes |
|-----------|---------|-------|
| Job Title | Free text, up to 100 | Use OR logic, add variations |
| Job Function | 26 categories | Broad: Marketing, Sales, IT, Engineering |
| Seniority | 8 levels | Unpaid, Training, Entry, Senior, Manager, Director, VP, CXO |
| Company Size | 8 ranges | 1, 2-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10000+ |
| Industry | 148 industries | Map to LinkedIn's taxonomy |
| Skills | 35,000+ | Member-listed skills, good for niche targeting |
| Groups | Thousands | LinkedIn Groups membership |
| Schools | All universities | Alumni targeting |
| Degrees | Field of study | MBA, Computer Science, etc. |
| Years of Experience | 6 ranges | 1-2, 3-5, 6-10, 11+, etc. |
| Company Name | Free text | For ABM, prefer company list upload |

### Audience Size Guidelines

| Audience Size | Verdict | Action |
|---------------|---------|--------|
| <1,000 | Too small | Will not deliver. Broaden targeting significantly |
| 1,000-10,000 | Very narrow | May deliver poorly. Good for ABM only |
| 10,000-50,000 | Narrow | Usable for InMail. Too small for display |
| 50,000-100,000 | Minimum viable | OK for Sponsored Content. Limited optimization |
| 100,000-300,000 | Ideal | Good delivery, enough data for optimization |
| 300,000-500,000 | Strong | Best for awareness + conversion campaigns |
| 500,000-1,000,000 | Broad | May include less relevant members |
| >1,000,000 | Very broad | Narrow further or use as lookalike seed |

### Matched Audience Types

| Type | Min Size | Match Rate | Use Case |
|------|----------|------------|----------|
| Website Retargeting | 300 members | N/A (pixel-based) | Re-engage site visitors |
| Contact List (Email) | 300 matches | 30-60% | Target existing leads/customers |
| Company List | 300 matches | 60-80% | ABM campaigns |
| Lookalike Audience | 300 seed | N/A (expansion) | Scale proven audiences |
| Event Audience | 300 attendees | N/A | Retarget event registrants |
| Lead Gen Form Audience | 300 submitters | N/A | Retarget form openers/submitters |

## Examples

### Example 1: SaaS product launch targeting

```
User: "We're launching a project management tool for mid-market companies. Help me target on LinkedIn."

Audience build:
  Layer 1 - Job Function: Project Management, Operations, IT
  Layer 2 - Seniority: Manager, Director, VP
  Layer 3 - Company Size: 201-500, 501-1000, 1001-5000
  Layer 4 - Industry: Computer Software, Information Technology, Professional Services
  Layer 5 - Geography: United States, Canada, United Kingdom

  Estimated audience: ~180,000 members ✅ (ideal range)

Campaign structure:
  Campaign 1: Awareness (Single Image + Video)
    Budget: $50/day | Bid: CPM $45 | Duration: 4 weeks
    Creative: Product hero image + 30s demo video
    
  Campaign 2: Consideration (Carousel)
    Budget: $75/day | Bid: CPC $8 | Duration: 4 weeks
    Creative: Feature highlights across 4 cards
    Retarget: Video viewers (50%+ completion)

  Campaign 3: Lead Gen (Lead Gen Form)
    Budget: $100/day | Bid: CPC $10 | Duration: ongoing
    Creative: Case study + "Get Free Trial" CTA
    Form: Name, Email, Company, Job Title, Company Size
    Target CPL: $80-120
```

### Example 2: ABM campaign for enterprise sales

```
User: "We have a list of 500 target accounts. Set up ABM on LinkedIn."

Setup:
  1. Upload company list CSV (500 accounts)
  2. Expected matches: ~375 companies (75% match rate)
  3. Layer targeting:
     - Company List: Uploaded accounts
     - Seniority: Director, VP, CXO
     - Job Function: IT, Engineering, Operations
     - Estimated audience: ~8,000 members (narrow but OK for ABM)

  Campaign tiers:
    Tier 1 (Top 50 accounts): InMail + Sponsored Content
      Budget: $150/day | Personalized messaging by account
      "Hi [Name], we help companies like [Company] reduce..."

    Tier 2 (Next 150 accounts): Sponsored Content only
      Budget: $100/day | Industry-specific messaging

    Tier 3 (Remaining 300 accounts): Sponsored Content
      Budget: $75/day | Generic value proposition

  Measurement:
    - Account penetration rate (target: reach 60% of accounts in 90 days)
    - Engagement rate by tier (target: 0.5%+ CTR)
    - Pipeline influenced: track via CRM UTM attribution
```

### Example 3: Lead gen form A/B test

```
User: "Our LinkedIn lead gen forms have a 5% conversion rate. How do I improve?"

Diagnosis:
  Current form: 7 fields (Name, Email, Phone, Company, Title, Size, Budget)
  
Recommendations:
  Test A (Minimal): 3 fields
    - First Name (pre-filled)
    - Email (pre-filled)
    - Job Title (pre-filled)
    Expected CVR: 12-15%
    Trade-off: Higher volume, lower lead quality

  Test B (Balanced): 5 fields
    - First Name (pre-filled)
    - Email (pre-filled)
    - Company (pre-filled)
    - Job Title (pre-filled)
    - "What's your primary challenge?" (dropdown, 4 options)
    Expected CVR: 8-11%
    Trade-off: Good balance of volume and quality

  Additional optimizations:
    - Headline: Change from "Contact Us" to "Get Your Free ROI Report"
    - CTA button: Change from "Submit" to "Download Now"
    - Add urgency: "Limited spots available" or "2026 pricing ends March 31"
    - Thank you page: Include calendar booking link for instant scheduling
```
