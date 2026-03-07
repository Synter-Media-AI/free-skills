---
name: utm-builder
description: Generates UTM-tagged URLs for campaign tracking. Use for creating tracking links, bulk UTM generation, or setting up campaign URL conventions.
---

# UTM Builder Skill

Generate properly formatted UTM-tagged URLs for campaign tracking across all marketing channels.

## Capabilities

1. **Single URL Generation** - Create one UTM-tagged URL with all parameters
2. **Bulk URL Generation** - Generate multiple URLs for multi-channel campaigns
3. **UTM Validation** - Check existing URLs for proper UTM formatting
4. **Convention Templates** - Apply consistent naming conventions across campaigns

## Quick Usage

### Generate Single UTM URL

When a user asks to create a tracking URL:

```python
def build_utm_url(
    base_url: str,
    source: str,      # google, facebook, linkedin, newsletter
    medium: str,      # cpc, paid_social, email, organic
    campaign: str,    # campaign name/promo code
    content: str = None,  # ad variation identifier
    term: str = None      # paid search keywords
) -> str:
    from urllib.parse import urlencode, urlparse, urlunparse, parse_qs
    
    parsed = urlparse(base_url if base_url.startswith('http') else f'https://{base_url}')
    params = parse_qs(parsed.query)
    
    params['utm_source'] = [source]
    params['utm_medium'] = [medium]
    params['utm_campaign'] = [campaign]
    if content:
        params['utm_content'] = [content]
    if term:
        params['utm_term'] = [term]
    
    query = urlencode({k: v[0] for k, v in params.items()})
    return urlunparse(parsed._replace(query=query))
```

### Example Response

When user asks: "Create a UTM link for our Google Ads campaign to yoursite.com/signup"

```
Here's your UTM-tagged URL:

https://yoursite.com/signup?utm_source=google&utm_medium=cpc&utm_campaign=product_launch_q1

**Parameters:**
- Source: google (where traffic comes from)
- Medium: cpc (paid search)
- Campaign: product_launch_q1 (campaign identifier)

You can add optional parameters:
- `utm_content`: To differentiate ad variations (e.g., "headline_a")
- `utm_term`: For paid search keywords (e.g., "ppc+management")
```

## Bulk Generation

For multi-channel campaigns, generate all URLs at once:

```python
CHANNELS = [
    {"source": "google", "medium": "cpc", "content": "search"},
    {"source": "google", "medium": "display", "content": "banner"},
    {"source": "facebook", "medium": "paid_social", "content": "feed"},
    {"source": "linkedin", "medium": "paid_social", "content": "sponsored"},
    {"source": "email", "medium": "email", "content": "newsletter"},
]

def generate_campaign_urls(base_url: str, campaign: str) -> list[dict]:
    urls = []
    for ch in CHANNELS:
        url = build_utm_url(base_url, ch["source"], ch["medium"], campaign, ch["content"])
        urls.append({"channel": f"{ch['source']}_{ch['medium']}", "url": url})
    return urls
```

## Naming Conventions

### Source Values
| Platform | utm_source |
|----------|-----------|
| Google Ads | `google` |
| Meta Ads | `facebook` or `instagram` |
| LinkedIn Ads | `linkedin` |
| X Ads | `twitter` or `x` |
| Reddit Ads | `reddit` |
| TikTok Ads | `tiktok` |
| Email | `email` or specific ESP name |
| Organic Social | `organic_[platform]` |

### Medium Values
| Type | utm_medium |
|------|-----------|
| Paid Search | `cpc` |
| Paid Social | `paid_social` |
| Display | `display` |
| Email | `email` |
| Organic | `organic` |
| Referral | `referral` |
| Affiliate | `affiliate` |

### Campaign Naming
Use consistent format: `{product}_{type}_{date}_{variant}`

Examples:
- `product_launch_q1`
- `blackfriday_promo_2025_v2`
- `webinar_registration_q1`

## Validation Rules

- Source: Required, lowercase, no spaces
- Medium: Required, lowercase, use standard values
- Campaign: Required, lowercase, underscores for spaces
- Content: Optional, use for A/B testing
- Term: Optional, URL-encode keywords

## Integration with Google Analytics

UTM parameters flow into GA4 as:
- `utm_source` → Traffic Source
- `utm_medium` → Medium
- `utm_campaign` → Campaign
- `utm_content` → Manual Ad Content
- `utm_term` → Manual Term

## Best Practices

1. **Be consistent** - Use the same source/medium values across campaigns
2. **Use lowercase** - GA is case-sensitive; "Google" ≠ "google"
3. **No spaces** - Use underscores or hyphens
4. **Document conventions** - Create a UTM naming guide for your team
5. **Shorten URLs** - Use URL shorteners for social/email if needed
6. **Test tracking** - Verify URLs work before launching
