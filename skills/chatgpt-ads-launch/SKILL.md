---
name: chatgpt-ads-launch
description: Build, review, and scale a ChatGPT Ads campaign from your existing Google/Meta/Microsoft text ads and website. Use when launching ChatGPT Ads, building a ChatGPT Ads campaign workbook, repurposing existing search/social ads for ChatGPT, writing context hints (not keywords), or scaling to 100+ upload-ready ads. Covers the full 9-step golden-path workflow with copy-paste prompts.
---

# ChatGPT Ads Launch & Scale

Turn existing text ads and website content into an upload-ready ChatGPT Ads campaign workbook - a clean campaign structure, distinct ad groups, conversational context hints, and at least 100 reviewed ads.

You are not just rewriting Google or Meta ads. You are building an upload-ready campaign supported by existing ads and the website, with enough creative variety to match the many ways people ask about the same need in ChatGPT and the way the relevancy algorithm looks to match.

## Before anything launches

This workflow drafts assets. **A qualified human on the team must review every ad, context hint, URL, and image for accuracy, completeness, brand fit, policy compliance, and any required legal/commercial approval before upload.** Chat-generated drafts can contain errors, miss qualifiers, or overstate claims. Passing formatting checks is not launch approval.

## The main idea: build clean, launch with scale

A successful launch is both clean and scaled. Plan for **at least 100 reviewed, workbook-ready ads** because people describe the same need in many ways: problems, goals, tradeoffs, constraints, comparisons, occasions, budgets, and questions.

Scaling well is not hundreds of tiny rewrites. It means covering meaningfully different customer intents, each tied to the right landing page and supported by real source material.

| Standard | Goal | Minimum bar |
|----------|------|-------------|
| Golden path | A thoughtful, well-defined campaign ready to deliver | ≥100 reviewed, workbook-ready ads across focused ad groups and intent clusters |
| Quality bar | Keep the campaign logical, reviewed, and source-supported | Distinct creative angles, balanced ad groups, duplicate removal, workbook validation, final human review |

## The single hard rule: use only supported claims

**Do not use a claim, offer, price, ranking, certification, guarantee, comparison, product capability, or proof point unless it is supported by the exported ads or the website/landing pages.**

- If the website and old ads disagree, use the more current source or flag for review.
- If the assistant cannot browse the site, paste the relevant website/landing-page copy into the chat before generating ads.
- If a claim is regulated, time-sensitive, or unclear, mark it for review instead of using it freely.

## What you need before you start

Collect these inputs first - they are the source of truth for everything generated. See `references/inputs-and-export.md` for the full input table and platform-by-platform export guidance.

- **Exported ad files** (CSV/XLSX from Google Ads, Meta, Microsoft Ads, etc.) - brand voice, existing offers/claims, landing pages.
- **Website domain + priority landing pages** - maps ads to real destinations, prevents unsupported claims.
- **Approved claims and offers** + **brand guardrails** (pulled from ads/website, can be supplemented).
- **Image assets** - public square image URLs or a folder of approved, publicly hosted images.
- **Measurement setup** - static UTM approach; pixel or CAPI recommended as a fast follow (see the `chatgpt-ads-conversion-tracking` skill).
- **Campaign Schema Template** (`.xlsx`) from Ads Manager - required for Prompt 3.

## The 9-step workflow

Run the prompts in order. The full copy-paste text for every prompt is in `references/prompts.md`. Before submitting prompts #1, #2, #3, and #6, fill in the dynamic fields (advertiser name, domain, landing pages, objective, target countries, claims to remove, batch number).

| Step | Prompt | Output | Move on when… |
|------|--------|--------|---------------|
| 1 | Build approved claims list | Approved / risky / unsupported claims table | Unsupported claims are removed or clearly flagged |
| 2 | Build the intent map | Products & landing pages mapped to user needs | Each priority URL has clear intent clusters |
| 3 | Create campaign & ad group plan | Campaign + ad group structure in the workbook | Ad groups are focused and names match the template |
| 4 | Generate context hints | Context hints in the adgroups tab | Hints are specific, distinct, not exact-match keywords |
| 5 | Create clean launch ads | First reviewed draft ad set | Rows meet copy, URL, image, and claim rules |
| 6 | Scale ads (2 batches of ≤50) | 100+ workbook-ready ads | Ads tab has ≥100 valid rows, ready for dedup |
| 7 | Remove duplicates & score | Cleaner draft set (Keep/Fix/Remove + 1-5 scores) | Weak, repetitive, or unsupported rows removed |
| 8 | Validate the workbook | Pass/fix checklist | Schema, URLs, images, names checked |
| 9 | Final review | Final approval checklist + downloadable `.xlsx` | A qualified reviewer approves the file |

### Key concepts that make this work

- **Context hints are NOT keywords.** They are broad, conversational, natural-language phrases (~4-5 words) describing a real user need, topic, situation, or conversation theme. They must be a valid JSON array, e.g. `["hint one", "hint two"]`. Avoid vague hints ("software", "AI"), brand-only/competitor-only hints, and minor reworded duplicates.
- **The workbook is the source of truth.** Always refer to fields by header name, not column letter (templates change). Preserve tab names, headers, formatting, formulas, and validation. Populated cells must be normal (non-italic) text. The final workbook contains exactly three tabs: `Campaigns`, `adgroups`, `ads` - no `ads_review`, `summary`, `QA`, `temp`, or working tabs.
- **Ad copy limits:** Title 16-24 chars where possible (≤24 max). Copy 32-48 chars where possible (≤48 max). Use exact landing-page URLs from the approved source list and only approved public square image links; leave `image_link` blank and flag if none.
- **Scale in two batches** of up to 50 new ads each, distributed as evenly as possible across approved ad groups and intent clusters. No minor rewrites; no invented claims/URLs/images.

## Validation & launch gate

After assembling rows, run the manual validation checklist and common-breakpoint fixes in `references/validation-checklist.md`. The chat can help validate, but the team must manually open every landing page and image URL in a browser, confirm character limits and JSON arrays, and confirm a qualified reviewer has signed off on accuracy, completeness, policy fit, and brand fit before upload.

## After launch: add conversion tracking

Treat conversion tracking as a **scale-phase next step, not a launch blocker**. Launch first with clean structure, enough distinct ads, validated context hints, and approved landing pages - then add measurement. Use the `chatgpt-ads-conversion-tracking` skill for the Conversions API vs JavaScript Pixel decision and rollout.

## Public resources

Use the latest Ads Manager template and current Help Center guidance if requirements differ from this skill: Ads in ChatGPT basics, Create Campaigns / Ad Groups / Ads for ChatGPT, Launch Campaigns, Bulk Upload Campaign Schema Checklist, Measure Results, Troubleshooting, Billing, Conversions API & JavaScript Pixel implementation guides, and OpenAI Ad Policies.
