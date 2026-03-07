---
name: pixel-capi-auditor
description: Audit pixel and Conversions API (CAPI) implementations across all ad platforms. Use when verifying tracking setup, diagnosing conversion data discrepancies, optimizing Event Match Quality, or auditing deduplication logic.
---

# Pixel & CAPI Auditor

Comprehensive audit framework for client-side pixels and server-side Conversions APIs across Meta, Google, TikTok, LinkedIn, Reddit, and Microsoft Ads. Covers setup verification, Event Match Quality optimization, deduplication validation, and diagnostic commands.

## Capabilities

1. **Meta Pixel + CAPI Audit** - Verify Pixel firing, CAPI events, EMQ scores, and deduplication
2. **Google Enhanced Conversions Audit** - Validate enhanced conversion setup and consent mode
3. **TikTok Events API Audit** - Check pixel and server-side event configuration
4. **LinkedIn Insight Tag + CAPI Audit** - Verify tag installation and conversion API
5. **Reddit CAPI Audit** - Validate Reddit pixel and server-side tracking
6. **Microsoft UET + Offline Conversions** - Audit Universal Event Tracking and offline uploads
7. **Cross-Platform Deduplication** - Ensure events aren't double-counted

## Meta Pixel + Conversions API

### Audit Checklist

| Check | How to Verify | Pass Criteria |
|-------|---------------|---------------|
| Pixel installed | Meta Pixel Helper extension | Pixel fires on all pages |
| Base code present | View page source → search "fbq" | `fbq('init', 'PIXEL_ID')` found |
| PageView fires | Pixel Helper → PageView event | Fires on every page load |
| Standard events | Pixel Helper → event list | Purchase, Lead, AddToCart as needed |
| CAPI events | Events Manager → Test Events | Server events appear |
| Deduplication | Events Manager → event details | `event_id` matches pixel + CAPI |
| EMQ score | Events Manager → Event Overview | Score ≥ 6.0 (Good) |
| Domain verification | Business Settings → Brand Safety | Domain verified |
| iOS 14+ setup | Events Manager → AEM | 8 events configured, prioritized |

### Event Match Quality (EMQ) Optimization

**What is EMQ?** A 0-10 score measuring how well Meta can match server events to Facebook users.

| EMQ Score | Rating | Impact on Attribution |
|-----------|--------|----------------------|
| 0-3 | Poor | Significant attribution loss (30-50%) |
| 3-5 | Fair | Moderate attribution loss (15-30%) |
| 5-7 | Good | Minor attribution loss (5-15%) |
| 7-9 | Great | Minimal loss (< 5%) |
| 9-10 | Excellent | Near-perfect matching |

**Parameters that improve EMQ (in order of impact):**

| Parameter | EMQ Impact | Implementation |
|-----------|------------|----------------|
| `em` (email, hashed) | +3-4 points | SHA-256 hash of lowercase, trimmed email |
| `ph` (phone, hashed) | +1-2 points | SHA-256 hash of digits only (with country code) |
| `fn` + `ln` (name, hashed) | +1 point | SHA-256 hash of lowercase first/last name |
| `external_id` | +1 point | Your internal user ID (hashed) |
| `fbp` (browser ID) | +1-2 points | `_fbp` cookie value |
| `fbc` (click ID) | +2-3 points | `_fbc` cookie value or `fbclid` from URL |
| `client_ip_address` | +0.5 points | User's IP (not server IP) |
| `client_user_agent` | +0.5 points | Browser user agent string |

**CAPI event payload for maximum EMQ:**

```json
{
  "data": [{
    "event_name": "Purchase",
    "event_time": 1706745600,
    "event_id": "evt_unique_123",
    "event_source_url": "https://example.com/thank-you",
    "action_source": "website",
    "user_data": {
      "em": ["a1b2c3...sha256..."],
      "ph": ["d4e5f6...sha256..."],
      "fn": ["ab12cd...sha256..."],
      "ln": ["ef34gh...sha256..."],
      "external_id": ["user_789_hashed"],
      "fbc": "fb.1.1706745600.ABCdef",
      "fbp": "fb.1.1706745600.1234567890",
      "client_ip_address": "203.0.113.1",
      "client_user_agent": "Mozilla/5.0..."
    },
    "custom_data": {
      "value": 99.99,
      "currency": "USD",
      "content_ids": ["SKU-123"],
      "content_type": "product",
      "num_items": 1
    }
  }]
}
```

### Deduplication Setup Verification

**How deduplication works:**
Both pixel and CAPI send the same event. Meta deduplicates using `event_id` + `event_name`. If both have the same `event_id`, only one is counted.

**Verification steps:**

1. **Generate a unique event_id** on the server at conversion time:
   ```
   event_id = "evt_" + UUID or transaction_id
   ```

2. **Pass to both pixel and CAPI:**
   - Pixel: `fbq('track', 'Purchase', {value: 99.99}, {eventID: 'evt_abc123'})`
   - CAPI: `"event_id": "evt_abc123"` in the server payload

3. **Verify in Events Manager:**
   - Go to Events Manager → Test Events
   - Trigger a test conversion
   - Check that event appears once (not twice)
   - Click event → "Match Quality" should show "Deduplicated"

**Common deduplication failures:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| Double-counted conversions | Missing `event_id` on pixel or CAPI | Add `event_id` to both |
| Conversion count too low | `event_id` mismatched (different format) | Ensure identical string on both |
| Intermittent doubles | Race condition, CAPI fires before pixel | Use same server-generated ID |
| CAPI events not matching | Wrong `event_name` casing | Use exact standard event names |

### Diagnostic Commands

**Test CAPI endpoint:**
```bash
curl -X POST "https://graph.facebook.com/v21.0/PIXEL_ID/events?access_token=TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [{
      "event_name": "PageView",
      "event_time": '$(($(date +%s)))',
      "event_id": "test_'$(uuidgen)'",
      "action_source": "website",
      "event_source_url": "https://example.com",
      "user_data": {
        "client_ip_address": "1.2.3.4",
        "client_user_agent": "test"
      }
    }],
    "test_event_code": "TEST12345"
  }'
```

**Check pixel on website:**
```bash
curl -s "https://example.com" | grep -oP 'fbq\([^)]+\)' | head -20
```

**Verify domain:**
```bash
curl -s "https://example.com" | grep -oP 'meta-tag.*facebook-domain-verification'
```

## Google Enhanced Conversions

### Audit Checklist

| Check | How to Verify | Pass Criteria |
|-------|---------------|---------------|
| Conversion tracking tag | GTM → Tags → Google Ads Conversion | Tag fires on conversion page |
| Enhanced conversions | Tag settings → Enhanced conversions | Enabled with user data |
| Consent mode | GTM → Consent Overview | `ad_storage` and `analytics_storage` configured |
| Conversion linker | GTM → Tags → Conversion Linker | Fires on all pages |
| GCLID parameter | Landing page URL | `gclid` captured and stored |
| Server-side tagging | GTM → Server container | Optional but recommended |

### Enhanced Conversions Setup

**Method 1: Google tag (gtag.js)**
```javascript
gtag('set', 'user_data', {
  "email": "user@example.com",  // Hashed automatically
  "phone_number": "+11234567890",
  "address": {
    "first_name": "John",
    "last_name": "Doe",
    "street": "123 Main St",
    "city": "New York",
    "region": "NY",
    "postal_code": "10001",
    "country": "US"
  }
});
```

**Method 2: GTM with CSS selectors**
1. Tag → Google Ads Conversion Tracking
2. Enable "Include user-provided data from your website"
3. Configure CSS selectors for email, phone, name, address fields
4. Test with GTM Preview mode

**Method 3: Enhanced Conversions API (server-side)**
```bash
curl -X POST "https://googleads.googleapis.com/v17/customers/CUSTOMER_ID:uploadConversionAdjustments" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "developer-token: DEV_TOKEN" \
  -d '{
    "conversionAdjustments": [{
      "adjustmentType": "ENHANCEMENT",
      "conversionAction": "customers/CUSTOMER_ID/conversionActions/ACTION_ID",
      "adjustmentDateTime": "2026-01-15 12:00:00-05:00",
      "orderId": "ORDER-123",
      "userIdentifiers": [{
        "hashedEmail": "a1b2c3...sha256..."
      }]
    }]
  }'
```

### Consent Mode v2

**Required signals for EEA/UK:**

| Signal | Purpose | Default (no consent) |
|--------|---------|---------------------|
| `ad_storage` | Google Ads cookies | denied |
| `ad_user_data` | Sending user data to Google | denied |
| `ad_personalization` | Remarketing | denied |
| `analytics_storage` | GA4 cookies | denied |

**Implementation:**
```javascript
// Before gtag/GTM loads:
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});

// After user grants consent:
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});
```

## TikTok Events API

### Audit Checklist

| Check | How to Verify | Pass Criteria |
|-------|---------------|---------------|
| Pixel installed | TikTok Pixel Helper extension | Pixel fires on pages |
| Base code | View source → search "ttq" | `ttq.load('PIXEL_CODE')` found |
| Standard events | Pixel Helper → event list | CompleteRegistration, Purchase, etc. |
| Events API | Events Manager → Diagnostics | Server events arriving |
| Match quality | Events Manager → Match Rate | ≥ 50% match rate |
| `ttclid` capture | URL parameter check | Captured and stored in cookie |

### Events API Payload

```json
{
  "pixel_code": "PIXEL_CODE",
  "event": "CompletePayment",
  "event_id": "evt_unique_456",
  "timestamp": "2026-01-15T12:00:00-05:00",
  "context": {
    "ad": {
      "callback": "ttclid_value_from_url"
    },
    "page": {
      "url": "https://example.com/thank-you",
      "referrer": "https://example.com/checkout"
    },
    "user": {
      "external_id": "user_789_sha256",
      "email": "sha256_hashed_email",
      "phone_number": "sha256_hashed_phone"
    },
    "user_agent": "Mozilla/5.0...",
    "ip": "203.0.113.1"
  },
  "properties": {
    "value": 99.99,
    "currency": "USD",
    "contents": [{"content_id": "SKU-123", "quantity": 1, "price": 99.99}],
    "content_type": "product"
  }
}
```

**Endpoint:**
```bash
curl -X POST "https://business-api.tiktok.com/open_api/v1.3/event/track/" \
  -H "Content-Type: application/json" \
  -H "Access-Token: SERVER_ACCESS_TOKEN" \
  -d '{ ... payload ... }'
```

## LinkedIn CAPI

### Audit Checklist

| Check | How to Verify | Pass Criteria |
|-------|---------------|---------------|
| Insight Tag | View source → search "linkedin" | `_linkedin_partner_id` or tag present |
| Partner ID | LinkedIn Campaign Manager → Analyze | Matches installed tag |
| Conversion tracking | Campaign Manager → Conversions | Events configured |
| CAPI setup | API test call | Events accepted |
| `li_fat_id` capture | Cookie check | First-party cookie stored |

### LinkedIn CAPI Payload

```json
{
  "conversion": "urn:lla:llaPartnerConversion:CONVERSION_RULE_ID",
  "conversionHappenedAt": 1706745600000,
  "conversionValue": {
    "currencyCode": "USD",
    "amount": "99.99"
  },
  "eventId": "evt_unique_789",
  "user": {
    "userIds": [
      {
        "idType": "SHA256_EMAIL",
        "idValue": "sha256_hashed_email"
      },
      {
        "idType": "LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID",
        "idValue": "li_fat_id_value"
      }
    ],
    "userInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "companyName": "Acme Inc",
      "title": "VP Marketing",
      "countryCode": "US"
    }
  }
}
```

**Endpoint:**
```bash
curl -X POST "https://api.linkedin.com/rest/conversionEvents" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "LinkedIn-Version: 202510" \
  -H "X-Restli-Protocol-Version: 2.0.0" \
  -H "Content-Type: application/json" \
  -d '{"elements": [{ ... payload ... }]}'
```

## Reddit CAPI

### Audit Checklist

| Check | How to Verify | Pass Criteria |
|-------|---------------|---------------|
| Reddit Pixel | View source → search "rdt" | `rdt('init', 'PIXEL_ID')` found |
| PageVisit event | Pixel fires | `rdt('track', 'PageVisit')` on all pages |
| `rdt_cid` capture | URL parameter | Reddit click ID stored in cookie |
| `_rdt_uuid` cookie | Cookie check | UUID cookie present |
| CAPI events | Reddit Events Manager | Server events in diagnostics |

### Reddit CAPI Payload

```json
{
  "events": [{
    "event_at": "2026-01-15T12:00:00Z",
    "event_type": {
      "tracking_type": "Purchase"
    },
    "click_id": "rdt_cid_value",
    "event_metadata": {
      "item_count": 1,
      "value_decimal": 99.99,
      "currency": "USD",
      "conversion_id": "evt_unique_012"
    },
    "user": {
      "email": "sha256_hashed_email",
      "external_id": "user_789",
      "uuid": "_rdt_uuid_value",
      "ip_address": "203.0.113.1",
      "user_agent": "Mozilla/5.0..."
    }
  }]
}
```

**Endpoint:**
```bash
curl -X POST "https://ads-api.reddit.com/api/v2.0/conversions/events/PIXEL_ID" \
  -H "Authorization: Bearer CAPI_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ ... payload ... }'
```

## Microsoft UET + Offline Conversions

### Audit Checklist

| Check | How to Verify | Pass Criteria |
|-------|---------------|---------------|
| UET tag | View source → search "bat.bing.com" | UET tag fires |
| Tag ID | Microsoft Ads → Conversion Tracking | Matches installed tag |
| `msclkid` auto-tagging | URL parameter check | Enabled in account settings |
| Offline conversions | API test call | Events accepted |
| Revenue tracking | Conversion goal settings | Revenue values reported |

### Offline Conversions Payload

```json
{
  "offlineConversions": [{
    "conversionName": "Purchase",
    "conversionTime": "2026-01-15T12:00:00.000Z",
    "conversionValue": 99.99,
    "conversionCurrencyCode": "USD",
    "microsoftClickId": "msclkid_value",
    "hashedEmailAddress": "sha256_hashed_email",
    "hashedPhoneNumber": "sha256_hashed_phone"
  }]
}
```

## Cross-Platform Deduplication Strategy

### Click ID Capture Matrix

| Platform | URL Parameter | Cookie Name | Lifetime |
|----------|---------------|-------------|----------|
| Meta | `fbclid` | `_fbc`, `_fbp` | 90 days, 2 years |
| Google | `gclid` | `_gcl_aw` | 90 days |
| TikTok | `ttclid` | `_ttp` | 13 months |
| LinkedIn | `li_fat_id` | `li_fat_id` | 30 days |
| Reddit | `rdt_cid` | `_rdt_uuid` | 90 days |
| Microsoft | `msclkid` | `_uetmsclkid` | 90 days |
| X (Twitter) | `twclid` | N/A | Session |

### Middleware Implementation

Capture all click IDs in a single middleware:

```
On every request:
  1. Check URL params for: fbclid, gclid, ttclid, li_fat_id, rdt_cid, msclkid, twclid
  2. Store each found ID in a first-party cookie
  3. On conversion event, read all cookies
  4. Send to each platform's CAPI with matching click ID
  5. Use single event_id/conversion_id for deduplication
```

### Unified Conversion Event

When a conversion happens, fire to all platforms simultaneously:

```
Event: Purchase ($99.99)
event_id: "evt_txn_abc123"

→ Meta CAPI: event_id="evt_txn_abc123", fbc="{_fbc}", fbp="{_fbp}"
→ Google Enhanced Conversions: order_id="ORDER-123", gclid="{gclid}"
→ TikTok Events API: event_id="evt_txn_abc123", ttclid="{ttclid}"
→ LinkedIn CAPI: eventId="evt_txn_abc123", li_fat_id="{li_fat_id}"
→ Reddit CAPI: conversion_id="evt_txn_abc123", click_id="{rdt_cid}"
→ Microsoft Offline: microsoftClickId="{msclkid}"
```

## Examples

### Example 1: Meta EMQ Improvement

**Before:** EMQ Score 3.2 (Poor)
- Only sending: `client_ip_address`, `client_user_agent`
- Missing: email, phone, fbp, fbc

**After adding all parameters:** EMQ Score 8.1 (Great)
- Added: hashed email (+3.5), fbp cookie (+1.0), fbc cookie (+0.5)
- Attributed conversions increased 42%
- CPA decreased 28% (Meta could optimize with better data)

### Example 2: Deduplication Fix

**Symptom:** Google Ads reporting 200 conversions, GA4 reporting 130.

**Root cause:** Enhanced conversions firing without `order_id`, so duplicate events from gtag + server-side upload counted twice.

**Fix:** Added `transaction_id` / `order_id` to both gtag conversion tag and server-side upload. Google deduplicates on `order_id`.

**Result:** Google Ads now reports 135 conversions (matches GA4 within 4%).

### Example 3: Full Multi-Platform Audit

**Audit results for an e-commerce site:**

| Platform | Pixel | CAPI | Dedup | EMQ/Match | Action Needed |
|----------|-------|------|-------|-----------|---------------|
| Meta | ✅ | ✅ | ❌ | 4.2 | Add event_id, email hash |
| Google | ✅ | ⚠️ | ✅ | N/A | Enable enhanced conversions |
| TikTok | ✅ | ❌ | N/A | N/A | Implement Events API |
| LinkedIn | ❌ | ❌ | N/A | N/A | Install Insight Tag + CAPI |
| Reddit | ✅ | ❌ | N/A | N/A | Implement CAPI |
| Microsoft | ✅ | ❌ | N/A | N/A | Enable auto-tagging + offline |

**Priority order:** Meta CAPI fix → Google Enhanced → TikTok CAPI → LinkedIn full setup → Reddit CAPI → Microsoft offline
