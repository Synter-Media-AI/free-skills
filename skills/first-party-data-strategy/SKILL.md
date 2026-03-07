---
name: first-party-data-strategy
description: Post-cookie first-party data collection, Enhanced Conversions, server-side tracking, consent mode, and privacy-preserving measurement. Use when setting up Enhanced Conversions, server-side tagging, consent mode v2, CDP integration, or planning for cookie deprecation.
---

# First-Party Data Strategy

Build a comprehensive first-party data strategy for the post-cookie era. Covers Enhanced Conversions setup for Google and Meta, server-side tracking architecture, Customer Data Platform (CDP) integration, Google Consent Mode v2 configuration, first-party cookie strategies, privacy-preserving measurement, and data clean rooms.

## Capabilities

- **Enhanced Conversions**: Setup for Google Ads and Meta Conversions API (CAPI)
- **Server-Side Tracking**: GTM Server-Side, Meta CAPI, LinkedIn CAPI architecture
- **Consent Mode v2**: Google Consent Mode with Basic and Advanced modes
- **CDP Integration**: Connect first-party data to ad platforms via CDPs
- **First-Party Cookie Strategies**: Maximize cookie lifespan and data quality
- **Privacy-Preserving Measurement**: Aggregated reporting, differential privacy
- **Data Clean Rooms**: Google Ads Data Hub, Meta Advanced Analytics overview

## Workflows

### 1. First-Party Data Audit

```
1. Inventory current data collection points:
   □ Website forms (signup, contact, download, purchase)
   □ Email/newsletter subscriptions
   □ Account registrations
   □ Customer support interactions
   □ In-app behavior and events
   □ CRM records (Salesforce, HubSpot, etc.)
   □ Loyalty/rewards program data
   □ Survey and feedback responses
   □ Offline purchases (POS)

2. Assess data quality:
   □ Email match rate (% valid, deliverable emails)
   □ Phone number coverage (% with valid phone)
   □ Address data completeness
   □ Data freshness (% updated in last 90 days)
   □ Consent status (% with valid consent)

3. Identify gaps:
   □ Anonymous visitors with no identifier (typically 95-98%)
   □ Cross-device identity resolution
   □ Offline-to-online attribution
   □ Consent coverage by geography (GDPR, CCPA, etc.)

4. Score readiness:
   - Level 1 (Basic): Email list only, no consent management
   - Level 2 (Developing): CRM + consent, basic pixel tracking
   - Level 3 (Mature): CDP, server-side tracking, consent mode
   - Level 4 (Advanced): Data clean rooms, privacy-preserving ML
```

### 2. Enhanced Conversions Setup

```
Google Enhanced Conversions:
  Purpose: Match conversion data using hashed PII (email, phone, address)
  Result: 5-15% more attributed conversions

  Setup via GTM:
  1. Create conversion action in Google Ads
  2. In GTM: Edit conversion tag → Enable Enhanced Conversions
  3. Map user-provided data:
     - email → sha256(lowercase(trim(email)))
     - phone → sha256(normalize(phone)) — E.164 format
     - first_name → sha256(lowercase(trim(first_name)))
     - last_name → sha256(lowercase(trim(last_name)))
     - street → sha256(lowercase(trim(street)))
     - city → sha256(lowercase(trim(city)))
     - region → sha256(lowercase(trim(region)))
     - postal_code → sha256(trim(postal_code))
     - country → sha256(lowercase(trim(country)))
  4. Source: Data layer, CSS selector, or JavaScript variable
  5. Test with Tag Assistant → verify hashed data sent

Meta Conversions API (CAPI):
  Purpose: Server-side event tracking, bypasses ad blockers
  Result: 15-30% more attributed conversions

  Setup:
  1. Generate System User access token in Business Manager
  2. Server sends POST to: https://graph.facebook.com/v21.0/{pixel_id}/events
  3. Include user data parameters:
     - em: sha256(email)
     - ph: sha256(phone)
     - fn: sha256(first_name)
     - ln: sha256(last_name)
     - external_id: sha256(user_id)
     - fbc: _fbc cookie value
     - fbp: _fbp cookie value
     - client_ip_address: user IP
     - client_user_agent: user agent string
  4. Deduplicate with browser pixel using event_id
  5. Test with Events Manager → Test Events tab
```

### 3. Server-Side Tracking Architecture

```
Architecture:

  Browser → First-Party Domain → Server-Side GTM → Platform APIs
                                     ↓
                                 Your Server
                                     ↓
                              [Google Ads CAPI]
                              [Meta CAPI]
                              [LinkedIn CAPI]
                              [TikTok Events API]
                              [Reddit CAPI]

Components:
  1. First-Party Domain Proxy:
     - Subdomain: track.yourdomain.com
     - Proxies to GTM server container
     - First-party context = longer cookie lifespan

  2. GTM Server Container:
     - Cloud Run, App Engine, or Stape.io
     - Receives client-side events
     - Enriches with server-side data (CRM, order details)
     - Forwards to platform APIs

  3. Platform API Clients:
     - Google: Measurement Protocol (GA4) + Enhanced Conversions API
     - Meta: Conversions API
     - LinkedIn: Conversions API
     - TikTok: Events API
     - Reddit: Conversions API

Benefits:
  - Bypasses ad blockers (first-party domain)
  - Longer cookie lifespan (first-party cookies = 1-2 years vs 7 days ITP)
  - Data enrichment before sending (add LTV, customer segment)
  - Single implementation, multi-platform distribution
  - Reduced page weight (fewer client-side tags)

Cost:
  - Stape.io: $20-100/month (managed hosting)
  - Cloud Run: $50-200/month (self-hosted, pay per request)
  - App Engine: $30-150/month (Google-managed)
```

### 4. Google Consent Mode v2

```
Consent Mode v2 is REQUIRED for:
  - EEA (European Economic Area) users since March 2024
  - Remarketing lists, conversion measurement, personalization

Two modes:
  Basic Mode:
    - Tags don't fire until consent is granted
    - No data collection without consent
    - Simplest to implement
    - Loses all unconsented user data

  Advanced Mode (Recommended):
    - Cookieless pings sent even WITHOUT consent
    - Google uses ML modeling to estimate conversions
    - Recovers 50-70% of lost conversion data
    - Requires proper implementation

Implementation:
  1. Install a Consent Management Platform (CMP):
     - Cookiebot, OneTrust, Termly, or custom
     - CMP must be Google-certified

  2. Set default consent state (before CMP loads):
     gtag('consent', 'default', {
       'ad_storage': 'denied',
       'ad_user_data': 'denied',
       'ad_personalization': 'denied',
       'analytics_storage': 'denied',
       'wait_for_update': 500  // ms to wait for CMP
     });

  3. Update consent when user interacts with CMP:
     gtag('consent', 'update', {
       'ad_storage': 'granted',
       'ad_user_data': 'granted',
       'ad_personalization': 'granted',
       'analytics_storage': 'granted'
     });

  4. Consent parameters:
     | Parameter | Controls |
     |-----------|----------|
     | ad_storage | Cookies for advertising (Google Ads, Floodlight) |
     | ad_user_data | Sending user data to Google for ads |
     | ad_personalization | Personalized advertising (remarketing) |
     | analytics_storage | Cookies for analytics (GA4) |
     | functionality_storage | Cookies for functionality (language, region) |
     | personalization_storage | Cookies for personalization (video recs) |
     | security_storage | Cookies for security (authentication) |

  5. Verify in Google Ads:
     Tools → Diagnostics → check consent mode status
     GA4 → Admin → Data Streams → check consent signals
```

### 5. CDP Integration for Advertising

```
CDP-to-Ad Platform workflow:

  CRM/CDP                    Ad Platforms
  ┌─────────┐               ┌──────────────┐
  │ Customer │──audience──→  │ Google Ads    │ (Customer Match)
  │ Data     │  sync         │ Meta          │ (Custom Audiences)
  │ Platform │               │ LinkedIn      │ (Matched Audiences)
  │          │──events───→   │ TikTok        │ (Custom Audiences)
  │ Segment, │  stream       │ Reddit        │ (Custom Audiences)
  │ mParticle│               └──────────────┘
  │ Rudder-  │
  │ Stack    │──suppress──→  Exclusion lists
  └─────────┘               (purchasers, churned)

Integration patterns:
  1. Audience Sync (batch, daily):
     - CDP segments → platform audience lists
     - Refresh daily for fresh suppression
     - Use hashed PII (email, phone) for matching

  2. Event Streaming (real-time):
     - Purchase events → Google Enhanced Conversions
     - Lead events → Meta CAPI
     - Sign-up events → LinkedIn CAPI
     - Enrich events with CRM data (LTV, segment)

  3. Identity Resolution:
     - CDP resolves cross-device identity
     - Single user profile across touchpoints
     - Deterministic (email/login) + probabilistic (device graph)

Popular CDPs for advertising:
  | CDP | Best For | Ad Integrations | Price |
  |-----|----------|-----------------|-------|
  | Segment | Developer-first | All major platforms | $120+/mo |
  | mParticle | Enterprise | All major platforms | Custom |
  | RudderStack | Open-source, cost-effective | All major platforms | Free-$500+/mo |
  | Hightouch | Reverse ETL from warehouse | All major platforms | $350+/mo |
  | Census | Reverse ETL from warehouse | All major platforms | $400+/mo |
```

## Reference Data

### Cookie Lifespan by Browser (2026)

| Browser | Third-Party Cookies | First-Party Cookies (JS) | First-Party Cookies (Server) |
|---------|--------------------|--------------------------|-----------------------------|
| Chrome | Blocked (Privacy Sandbox) | 7 days (ITP-like) | 1-2 years |
| Safari | Blocked since 2020 | 7 days (ITP) | 1-2 years |
| Firefox | Blocked (ETP) | 7 days | 1-2 years |
| Edge | Following Chrome | 7 days | 1-2 years |
| Brave | Blocked | Varies | 1-2 years |

### Match Rates by Identifier

| Identifier | Google Match Rate | Meta Match Rate | LinkedIn Match Rate |
|------------|-------------------|-----------------|---------------------|
| Email (hashed) | 40-60% | 50-70% | 30-50% |
| Phone (hashed) | 30-50% | 40-60% | 20-35% |
| Email + Phone | 55-75% | 65-80% | 40-60% |
| Full PII (name, address, email) | 60-80% | 70-85% | 45-65% |
| Mobile Ad ID (IDFA/GAID) | 20-40% | 30-50% | N/A |

### Privacy Regulations Quick Reference

| Regulation | Geography | Consent Required | Penalties |
|------------|-----------|------------------|-----------|
| GDPR | EU/EEA | Opt-in (explicit) | Up to 4% of global revenue |
| UK GDPR | United Kingdom | Opt-in (explicit) | Up to £17.5M or 4% revenue |
| CCPA/CPRA | California | Opt-out (right to refuse sale) | $2,500-7,500 per violation |
| LGPD | Brazil | Opt-in (explicit) | Up to 2% of Brazil revenue |
| POPIA | South Africa | Opt-in (explicit) | Up to R10M or imprisonment |
| PDPA | Thailand | Opt-in (consent) | Up to THB 5M |
| PIPL | China | Opt-in (consent) | Up to 5% of annual revenue |

### Data Clean Room Options

| Platform | Name | Best For | Access |
|----------|------|----------|--------|
| Google | Ads Data Hub | Google Ads data analysis | BigQuery integration |
| Meta | Advanced Analytics | Meta campaign analysis | Via Meta Business Suite |
| Amazon | Amazon Marketing Cloud | Amazon Ads analysis | AWS Clean Rooms |
| LiveRamp | Safe Haven | Cross-platform matching | Enterprise agreement |
| Snowflake | Data Clean Rooms | Custom analysis | Snowflake account |
| InfoSum | InfoSum Platform | Privacy-first matching | Enterprise agreement |

## Examples

### Example 1: E-commerce Enhanced Conversions setup

```
User: "We're losing conversion data due to cookie restrictions. Fix our tracking."

Implementation plan:
1. Google Enhanced Conversions:
   - Add data layer to checkout confirmation page:
     dataLayer.push({
       'event': 'purchase',
       'enhanced_conversion_data': {
         'email': customer.email  // unhashed, GTM hashes it
       },
       'transaction_id': order.id,
       'value': order.total,
       'currency': 'USD'
     });
   - Enable Enhanced Conversions in GTM conversion tag
   - Expected recovery: +12% attributed conversions

2. Meta CAPI (server-side):
   - Send purchase event from server on order completion
   - Include: email (hashed), phone (hashed), fbc cookie, fbp cookie
   - Deduplicate with browser pixel via event_id
   - Expected recovery: +25% attributed conversions

3. Server-side GTM:
   - Deploy on track.yourdomain.com (Cloud Run)
   - Route GA4 and Google Ads tags through server
   - First-party cookies extend from 7 days → 2 years
   - Expected recovery: +15% returning user attribution

Total expected improvement: +30-40% conversion attribution
```

### Example 2: Consent Mode v2 implementation

```
User: "We need to comply with GDPR consent requirements for our Google Ads."

Setup:
1. Install Cookiebot CMP (Google-certified)
   - Auto-scans cookies on your domain
   - Generates consent banner with accept/reject/customize

2. Set consent defaults (pre-banner):
   - All EEA users: denied by default
   - US users: granted by default (CCPA = opt-out model)

3. Configure Advanced Mode:
   - Cookieless pings sent when denied
   - Google models conversions from consented cohort
   - Recovers ~60% of unconsented conversions

4. GTM implementation:
   - All Google tags fire based on consent state
   - Non-Google tags: require ad_storage = granted

5. Verification:
   - Google Ads → Tools → Diagnostics → consent signal check
   - GA4 → Admin → Data Collection → consent mode enabled
   - Test with EU VPN: verify banner appears, tags behave correctly

Expected impact:
   - Consent rate: 60-75% (well-designed banner)
   - Modeled conversions recover: 50-70% of denied users
   - Net conversion loss: <15% vs no consent implementation
```

### Example 3: First-party data strategy for B2B SaaS

```
User: "We're a B2B SaaS company. How do we build a first-party data strategy?"

Strategy:
1. Identify first-party data sources:
   - Free trial signups: email, company, job title, company size
   - Demo requests: email, phone, company, use case
   - Content downloads: email, company (gated content)
   - Product usage: in-app events, feature adoption, login frequency
   - Support tickets: issues, satisfaction scores
   - Sales CRM: deal stage, revenue potential, close date

2. Build unified customer profile:
   - CDP: RudderStack (cost-effective, open-source)
   - Identity: email as primary key, user_id as secondary
   - Segments: trial_active, trial_expired, customer, churned, enterprise_lead

3. Activate for advertising:
   - Google Customer Match: upload email segments weekly
   - LinkedIn Matched Audiences: company list for ABM
   - Meta Custom Audiences: email list for lookalike expansion
   - Suppression: always exclude active customers from acquisition campaigns

4. Event streaming for optimization:
   - Trial signup → Google Enhanced Conversion
   - Demo booked → Meta CAPI (Lead event)
   - Paid conversion → all platforms (Purchase event, value = ARR)
   - Pass LTV data for value-based bidding

5. Privacy compliance:
   - Consent mode v2 for EU visitors
   - Consent at signup: "We may use your data for advertising" checkbox
   - Data retention: 24 months, auto-delete after
   - Data subject requests: automated via CDP
```
