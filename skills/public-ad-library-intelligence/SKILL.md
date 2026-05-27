---
name: public-ad-library-intelligence
description: Research competitor ad creative using public ad libraries (Meta Ad Library, Google Ads Transparency, LinkedIn, TikTok, Reddit). Summarize hook patterns, offers, proof points, and CTAs without copying — then convert into original creative concepts.
---

# Public Ad Library Intelligence

Use this skill when researching competitor ad creative, public ad libraries, ad transparency centers, Adyntel, Apify, or competitor-inspired CreativeKit planning.

## Workflow

1. Define the competitor query as a domain, brand, page URL, or keyword.
2. Select platforms from the normalized provider set: `meta`, `google`, `linkedin`, `tiktok`, `reddit`.
3. Pull references with `pull_public_ad_library` where credentials are available.
4. Summarize patterns only: hook type, offer, proof, CTA family, format, visual structure, landing-page promise, and repetition/fatigue signals.
5. Convert selected patterns into original CreativeKit concepts for the user's brand.
6. Run originality QA before generation, export, upload, or launch.

## Provider Order

- Use Adyntel for Meta, Google, LinkedIn, and TikTok when `ADYNTEL_API_KEY` and `ADYNTEL_EMAIL` are available.
- Use Apify for Reddit when `APIFY_API_KEY` is available.
- If a provider is missing credentials or unsupported for a platform, return a capability/error state. Do not fabricate competitor data.

## Output Rules

- Cite the provider, platform, query, and retrieval time in downstream summaries.
- Do not reuse competitor images, video, audio, copy, actors, testimonials, trademarks, trade dress, claims, or landing pages.
- Do not imply performance metrics unless the source provides them.
- Do not include raw prompt text, API keys, provider credentials, or internal tool payloads in user-facing output.
- Use competitor references as research context, benchmarks, and whitespace analysis only.

## CreativeKit Handoff

For each useful reference, hand off:

- `platform`
- `provider`
- `headline` and `body` as reference-only text
- `media_types`
- `hook_pattern`
- `offer_pattern`
- `proof_pattern`
- `cta_family`
- `landing_page_promise`
- `originality_risks`
- `recommended_original_variants`

Generated creative must be visibly different from references and aligned to the customer's BrandFile.


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
