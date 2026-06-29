# Inputs & Ad Export Guidance

## What to collect before you start

These materials are the source of truth for everything the assistant generates.

| Input | What to provide | Why it matters |
|-------|-----------------|----------------|
| Exported ad files | CSV or XLSX exports from Google Ads, Meta, Microsoft Ads, or other text-oriented platforms | Provides brand voice, existing offers/claims, landing pages, and known messaging |
| Your website domain | Your main website plus the landing pages you want to use | Prevents unsupported claims and helps map ads to real destinations |
| Approved claims and offers | Pulled from your existing ads and website; you can also supplement | Reduces the risk of unsupported or inaccurate claims |
| Brand guardrails | Pulled from your existing ads and website; you can also supplement | Keeps the drafts on-brand and easier to review |
| Image assets | Pulled from your ad export or provided during creation. Public square image URLs, or a folder of approved images that can be hosted publicly | Keeps ads visually consistent and improves engagement and clicks |
| Measurement setup | Static UTM approach needed. Pixel or CAPI setup recommended as a fast follow | Supports reporting and post-launch optimization |
| Campaign Schema Template | The blank `.xlsx` template from Ads Manager (needed for Prompt 3) | Defines the exact tabs, headers, and validation the upload requires |

## Exporting your existing text ads

Use the current export/download option in each ad platform. Labels change, so the most reliable approach is to export the ad table with campaign, ad group/ad set, text fields, URLs, status, and performance metrics where available.

| Platform | Export guidance | Recommended fields |
|----------|-----------------|--------------------|
| Google Ads | Export active and recently high-performing search ads. Include responsive search ad headlines and descriptions where possible. | Campaign, ad group, status, headlines, descriptions, final URL, display URL, path fields, impressions, clicks, CTR, conversions |
| Meta | Export text-oriented ads and link ads. Exclude video-only creative unless the text can support future ChatGPT Ads copy. | Campaign, ad set, ad name, primary text, headline, description, destination URL, image URL if available, status, impressions, clicks, CTR, conversions |
| Microsoft Ads & other text platforms | Export search, shopping text, native, or sponsored content ads that include reusable text and destination URLs. | Campaign, ad group, ad name, title, description, final URL, image URL if available, status, impressions, clicks, CTR, conversions |

**Include paused ads only if they are still accurate and useful for brand voice. Exclude disapproved, expired, or legally outdated ads** unless you clearly label them as examples not to reuse.

## Supported-claims rule

Do not use a claim, offer, price, ranking, certification, guarantee, comparison, product capability, or proof point unless it is supported by your exported ads or website/landing pages.

- If the website and old ads disagree, use the more current source or flag for review.
- If the assistant cannot browse the website, paste the relevant website and landing-page copy into the chat before generating ads.
- If a claim is regulated, time-sensitive, or unclear, mark it for review instead of using it freely.
