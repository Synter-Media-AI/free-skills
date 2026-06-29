# ChatGPT Ads - Copy/Paste Prompts (Steps 1-9)

Run in order. **Fill the dynamic fields** (shown in `[BRACKETS]`) before submitting prompts #1, #2, #3, and #6. Attach the indicated files where noted.

---

## Prompt 1: Build Your Approved Claims List

Use before generating any campaign structure or ad copy. This sets the guardrails for what the assistant can use later.

**Important: attach your exported `.xlsx` file of existing ads.**

```
I am preparing ChatGPT Ads for [ADVERTISER NAME].

Inputs I am providing:
- Exported ad file(s): see attached XLSX file uploaded
- Advertiser domain: [DOMAIN URL]
- Priority landing pages: [Choose one:
  Option A - Paste the approved landing page URLs to use, one per line. Include
static UTM versions if those are the URLs you want used in the workbook.
  Option B - If landing pages are already in the uploaded ad export, name the exact
tab and column to use, for example: "Google Ads export > Final URL" or "Meta export
> Website URL".
  If only some export URLs should be used, specify the campaign, ad group, ad set,
or row filters. Do not use URLs outside this list or mapped column.]

Before writing any ads, review only these sources:
1. The uploaded ad exports
2. The advertiser website and priority landing pages I provided or mapped from the
export
3. Any brand or compliance notes I pasted in this chat

Create an approved claims list for "[ADVERTISER NAME]". Do not generate ad copy yet.
Do not create or edit the campaign workbook yet.

Rules:
- Do not invent claims, offers, prices, discounts, rankings, awards, guarantees,
certifications, comparisons, or product capabilities.
- Do not use or request credentials, customer lists, API keys, or private customer
data.
- If a claim is not supported by the uploaded ads or website/landing pages, mark it
unsupported.
- If a claim appears risky, regulated, time-sensitive, or incomplete, mark it for
review.

Return a table with these columns:
- Claim or offer
- Supporting source: ad export row, website page, or landing page URL
- Safe wording that can be reused
- Risk notes
- Approved for ad generation? Yes / No / Review required
```

---

## Prompt 2: Build the Intent Map

Turns source material into intent groups that fit how people ask for help in ChatGPT, instead of mirroring only search keywords.

**Only move on after confirming whether any claims are unsupported / should be removed.** If any should be removed, include the BLUE line below. Otherwise, use the GREEN line.

```
[BLUE - if removing claims] Before proceeding with next steps, remove [claim(s)] from the approved claim table.

[GREEN - if not removing claims] Consider all claims in the approved claims table above approved for use.

Using only the uploaded ad exports, advertiser website, landing pages, and approved
claims list, create an intent map for ChatGPT Ads.

Goal:
Map each priority product, service, or landing page to the different ways a user
might naturally ask for help in ChatGPT.

Important ChatGPT Ads context:
- ChatGPT Ads are matched to richer conversational intent, not only short search
keywords.
- Users may express the same need through problems, goals, tradeoffs, constraints,
comparisons, budgets, occasions, or questions.
- The intent map should help us create focused ad groups, context hints, and
distinct ad copy.

Rules:
- Use only products, offers, and claims that are supported by the approved claims
list.
- Do not invent unsupported use cases or landing pages.
- Do not create or edit the campaign workbook yet. Prompt 3 will start the workbook.
- Avoid branded-search-only thinking unless the brand itself is central to the user
need.
- Mark any uncertain idea as Review required.

Return a table with these columns:
- Product / offer
- Landing page URL
- User problem or need
- Intent cluster
- Audience or situation
- Constraint or tradeoff
- Funnel stage: problem framing / discovery / comparison / purchase
- Suggested ad group name
- Notes or review flags
```

---

## Prompt 3: Create the Campaign and Ad Group Plan

Creates the workbook structure. Refer to field names, not column letters (templates change).

**Important: attach the `.xlsx` Campaign Schema Template file with this prompt.**

```
Using the approved claims list and intent map, start the ChatGPT Ads campaign
workbook.

Inputs I am providing:
- Blank Campaign Workbook Template
- Required campaign inputs: objective = [Views or Clicks], Target Countries =
[countries to target]
- Approved claims list and intent map above

Workbook rules:
- Use the uploaded template as the source of truth.
- Preserve tab names, headers, formatting, formulas, and validation.
- Refer to fields by header name, not column letter.
- Fill only the campaigns tab and required adgroups fields at this step.
- Create the campaigns tab row first. campaign_name is required there.
- Do not fill context_hints or ads yet unless the template requires a placeholder.
- Do not add unsupported claims, invented URLs, or sensitive data not required for
upload.
- Use normal, non-italic text for all populated workbook cells.
- If you cannot edit the workbook, say so and return paste-ready tables.

Populate these fields when present in the template:
- Campaigns Tab: campaign_name, objective, target_countries.
- Adgroups Tab: campaign_name, adgroup_name.

Campaign and ad group rules:
- Campaigns should group ad groups that share a business goal, objective, budget,
schedule, and country targeting.
- Ad groups should be focused around one product category, theme, audience, or
intent area.
- If products, audiences, or use cases are meaningfully different, create separate
ad groups.
- Every adgroups.campaign_name must exactly match a campaigns.campaign_name.
- Context hints guide matching but are not exact-match targeting rules.

Before returning, verify:
- The campaigns tab has campaign_name populated.
- Every ad group links to a campaign_name in the campaigns tab.
- Populated workbook cells are not italicized.

Return:
1. Updated .xlsx workbook with campaigns and adgroups populated.
2. Campaign plan table.
3. Ad group plan table.
4. Missing inputs or review flags.
```

---

## Prompt 4: Generate Context Hints

Context hints are not exact-match keywords. They describe real conversations, topics, user needs, or situations where the ad group may be relevant.

```
Use the latest campaign workbook created in this chat and populate context_hints for
each ad group. If you cannot access the latest workbook, ask me to attach the latest
saved .xlsx before continuing.

Workbook rules:
- Preserve tab names, headers, formatting, formulas, and validation.
- Update only context_hints in the adgroups tab unless a required workbook error
blocks completion.
- Do not rename campaigns or ad groups.
- context_hints must be a valid JSON array, such as ["hint one", "hint two"].
- If you cannot edit the workbook, say so and return a paste-ready context_hints
table.

Populate these fields when present in the template:
- Insert context hints into the keyword column.  Context Hints = Keywords in the
file.

Context hint rules:
- Context hints are broad thematic signals, not exact-match keywords.
- They do not guarantee delivery for a specific query, keyword, phrase, or
conversation.
- Write hints as descriptive natural-language phrases, usually around 4-5 words.
- Each hint should describe a real user need, topic, situation, use case, or
conversation theme.
- Keep each ad group focused. Do not combine unrelated products, audiences, or use
cases.
- Avoid vague hints like "software", "shopping", "travel", or "AI".
- Avoid relying only on brand names or competitor names.
- Avoid repeating the same idea with minor wording changes.
- Do not use unrelated popular terms to expand reach.
- Use only products, services, and claims supported by the approved claims list.

Return:
1. Updated .xlsx workbook.
2. Context hint review table with campaign_name, adgroup_name, context_hints, why
they fit, and review flags.
3. Any workbook issues I need to fix.
```

---

## Prompt 5: Create the Clean Launch Ads

Your first draft ad set. The goal is a clean, valid upload - not the final scaled campaign.

```
Use the latest campaign workbook created in this chat and append the Clean Launch
ads to the ads tab. If you cannot access the latest workbook, ask me to attach the
latest saved .xlsx before continuing.

Workbook rules:
- Preserve tab names, headers, formatting, formulas, and validation.
- Append only to the ads tab.
- Use exact adgroup_name values from the adgroups tab.
- The upload-ready ads tab should contain only template-required fields.
- Put source claim and review flag in a separate review table, not in upload
columns.
- Format inserted ads cells as normal text, not italic, matching the workbook data
rows.
- If you cannot edit the workbook, say so and return paste-ready ads rows.

Ad requirements:
- Output fields: adgroup_name, title, copy, link, image_link.
- Title should be 16-24 characters where possible. Do not exceed the current
template maximum.
- Copy should be 32-48 characters where possible. Do not exceed the current template
maximum.
- Use exact landing page URLs from the approved source list.
- Use only approved image links. If no image is available, leave image_link blank
and flag it in review notes.
- Do not invent claims, URLs, offers, prices, proof points, or image links.
- Ads should be clear, specific, benefit-focused, and aligned to conversational
intent.
- Avoid generic, vague, repetitive, brand-only, or overly promotional copy.
- Make title and copy complement each other instead of repeating the same message.

Clean Launch guidance:
- Prioritize the highest-value products, offers, and landing pages.
- Create enough distinct ads to begin learning, but do not sacrifice accuracy or
review quality.
- This is still a draft for your team to review, not an automatically launch-ready
file.

Before returning, verify inserted ads rows are not italicized.

Return:
1. Updated .xlsx workbook.
2. Workbook-ready ads rows added.
3. Review notes with source claim used and review flag.
```

---

## Prompt 6: Scale Ads in the Workbook

Use after the clean launch ads and campaign structure are in your workbook. Build the ads tab to at least 100 valid, high-quality ads **in batches of up to 50**, keeping the workbook as the source of truth.

**Execute this step in two batches** with the batch number input below. **Attach the template `.xlsx` file.**

```
I am continuing the scaled ChatGPT Ads workbook build.

Use the latest campaign workbook created in this chat. If you cannot access it, ask
me to attach the latest saved .xlsx before continuing.

Inputs:
- Approved claims list, intent map, campaign plan, context hints, landing pages, and
brand notes from this chat
- Current number of valid ads in the ads tab, if known: [NUMBER]
- Batch number: [1 OR 2]

Goal:
Append the next batch of workbook-ready ads so the ads tab reaches at least 100
valid ads, spread as evenly as possible across approved ad groups and intent
clusters.

Workbook rules:
- Preserve tab names, headers, formatting, formulas, and validation.
- Append only to the ads tab.
- Use exactly the ad fields required by the template.
- adgroup_name must match an adgroup_name from the adgroups tab exactly.
- Title must be no more than 24 characters. Aim for 16-24 characters where possible.
- Copy must be no more than 48 characters. Aim for 32-48 characters where possible.
- Link must be an approved landing page URL.
- image_link must be an approved public direct image URL. If unavailable, leave
blank and flag it in review notes.
- Do not add review notes, scoring, batch numbers, creative angles, or source claims
to the upload-ready ads tab.
- Format inserted ads cells as normal text, not italic, matching the workbook data
rows.

Batch rules:
- Create no more than 50 new ads in this batch.
- For Batch 1, count any Clean Launch ads already in the workbook toward the 100-ad
target.
- For Batch 2 and later, use the current ads tab to avoid duplicates and fill
coverage gaps.
- Prioritize ad groups with the fewest valid ads so far.
- Keep distribution across ad groups as even as possible. If exact balance is not
possible, explain the gap.
- Stop if the workbook already has at least 100 valid ads and the ad groups are
reasonably balanced. Tell me to run Prompt 7.

Creative rules:
- Do not create minor rewrites of the same ad.
- Do not invent new claims, URLs, offers, prices, proof points, or images.
- Use only the approved claims list, intent map, context hints, landing pages, and
brand notes.
- Keep each ad aligned to its ad group, intent cluster, context hints, and landing
page.
- Make title and copy complement each other instead of repeating the same words.

Before returning, verify inserted ads rows are not italicized.

Return:
1. Updated .xlsx workbook.
2. Workbook-ready rows added with only template-required ad columns.
3. Review notes with batch_number, adgroup_name, title, creative angle, source claim
used, why this variant is distinct, and review flag.
4. Batch Summary with valid ads before this batch, new ads created, total valid ads
after this batch, remaining ads needed to reach at least 100, ads by ad group, and
recommended next-batch allocation.

If you cannot edit the workbook, return paste-ready rows and tell me exactly where
to paste them.

After each batch, I will download the updated workbook as a backup and continue in
this same chat. Ask for re-upload only if you cannot access the latest workbook or
we start a new chat.
```

---

## Prompt 7: Remove Duplicates and Score Quality

Removes weak or repetitive rows before your team invests review time.

```
Use the latest workbook created in this chat after all Prompt 6 batches are
complete. If you cannot access it, ask me to attach the latest saved .xlsx before
continuing.

Review the full ads tab. Do not permanently remove rows without first showing the
Keep, Fix, and Remove lists. Keep review output in chat only. Do not create audit,
review, summary, temp, or working tabs such as ads_review or ads_review_summary. If
you create a cleaned workbook, return it as a new version, preserve workbook
structure, and include only these tabs: Campaigns, adgroups, ads.

Score each row from 1-5 on:
- Source support: claim is supported by ads or website
- Landing page fit: ad promise matches destination page
- Conversational intent fit: copy maps to how users ask for help in ChatGPT
- Distinctiveness: not a minor rewrite of another ad
- Clarity: clear value, audience, use case, or next step
- Character compliance: title and copy fit the current limits

Remove or flag ads that are:
- unsupported by source material
- misleading, overstated, or incomplete
- too generic
- repetitive or templated
- overly brand-first without user intent
- mismatched to the landing page
- outside character requirements
- using unavailable or non-public image links

Return:
1. Keep: ads ready for your team to review
2. Fix: ads that need editing, with reason
3. Remove: ads that should not be used, with reason
4. Updated .xlsx review copy, if you can safely create one, with only Campaigns,
adgroups, and ads tabs
```

---

## Prompt 8: Validate the Workbook

Use after rows are assembled. Chat-based validation is helpful, but your team should still manually review and test the file.

```
Validate the latest ChatGPT Ads workbook created in this chat before launch. If you
cannot access it, ask me to attach the latest saved .xlsx before continuing.

Use the latest template requirements in the workbook. Refer to fields by header
name, not column letter. Do not make silent changes. If fixes are unambiguous,
return a fixed copy and list every change; otherwise return issues only. Deleting
extra non-ingestion tabs is an allowed fix; list any deleted tabs.

The final workbook must contain exactly these tabs and no others: Campaigns,
adgroups, ads. Delete any extra tabs before returning the workbook, including
ads_review, ads_review_summary, review, summary, QA, temp, or working tabs. Keep
audit notes in chat only. If you cannot delete extra tabs, stop and tell me which
tabs I must delete manually.

Check the campaigns tab:
- campaign_name is populated for every campaign row.
- Campaign names are unique.
- Objective is Views or Clicks.
- Dates use the required template format.
- Country targeting is in the required template format.
- If Budget or Budget Type is blank, enter TBD only if the workbook accepts it
without breaking validation; otherwise leave blank and flag as launch-blocking.
- Do not overwrite existing Budget or Budget Type values.
- Treat any remaining TBD as Needs fix, not upload-ready.

Check the adgroups tab:
- Required ad group fields are filled in.
- Ad group names are unique.
- Every ad group links to an exact campaign_name in the Campaigns tab.
- Context hints are valid JSON arrays, such as ["hint one", "hint two"].
- If a Clicks / CPC campaign has blank Max Bid, enter TBD only if the workbook
accepts it; otherwise flag as launch-blocking.

Check the ads tab:
- Required ad fields are filled in.
- Every ad row links to an exact adgroup_name in the adgroups tab.
- Titles are within the current character limits.
- Copy is within the current character limits.
- Landing page URLs are valid, reachable, and source-approved.
- Image URLs are public, direct, square, and meet current size and format
requirements.
- No unsupported claims appear in title or copy.

Check formatting:
- The only workbook tabs are Campaigns, adgroups, and ads.
- Column headers have not been renamed.
- Upload data rows are not italicized. If inserted values are italicized, remove
italics while preserving headers and instructions.
- There are no duplicate rows.
- There are no merged cells.
- Campaign and ad group names match exactly across tabs.

Return:
- Pass / Needs fix summary
- Deleted extra tabs, if any
- Issue table with tab, row, field, issue, recommended fix
- Fixed .xlsx copy only if changes are safe and clearly listed
- Final checklist for manual review

Important: If you cannot actually test URLs or image accessibility from this chat,
say so and tell me which links must be manually opened in a browser.
```

---

## Prompt 9: Final Review

Passing formatting checks does not mean the campaign is ready to launch. A final review is still required before upload.

```
Create a final advertiser review checklist for the latest validated ChatGPT Ads
workbook created in this chat. Also return the final downloadable .xlsx workbook
built through the prior steps. If you cannot access the latest workbook, ask me to
attach the latest saved .xlsx before continuing.

Do not return only a chat-based checklist. The final output must include the .xlsx
file so I can download it, fix any remaining review items, and upload it to Ads
Manager.

Your team should review every generated ad, context hint, landing page, and image
link before upload.

Checklist categories:
- Accuracy: all ads describe the business correctly
- Completeness: required qualifiers, exclusions, or disclaimers are not missing
- Source support: claims are supported by exported ads or website/landing pages
- Brand fit: copy sounds appropriate for your brand
- Landing page fit: every ad points to the right destination
- Image fit: image matches the ad and opens publicly as a direct square image
- Policy fit: ad, image, and landing page comply with applicable ad policies
- Commercial approval: offers, prices, guarantees, discounts, and proof points are
approved
- Workbook tabs: only Campaigns, adgroups, and ads are present; no ads_review,
ads_review_summary, review, summary, QA, temp, or working tabs remain
- Upload readiness: workbook fields, names, JSON, formatting, and tabs are valid

Return:
1. Final advertiser review checklist in chat with Review item, Owner, Pass / Fail /
Needs review, and Notes
2. Final downloadable .xlsx workbook with exactly these tabs: Campaigns, adgroups,
ads
3. Any remaining TBD sections the advertiser must complete
4. Confirmation that no extra workbook tabs remain

If you cannot return a downloadable .xlsx file, stop and say: "I cannot create the
final downloadable workbook from this chat. Please attach the latest saved .xlsx and
rerun this prompt."

Add this warning at the top:
"Do not upload or launch this campaign until a qualified reviewer on your team has
approved every row for accuracy, completeness, compliance, and brand fit."
```
