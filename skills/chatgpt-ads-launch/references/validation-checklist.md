# Manual Validation Checklist & Common Breakpoints

Chat-based validation (Prompt 8) is helpful, but the team must still manually review and test the file. Passing formatting checks does **not** equal launch approval.

## Manual validation checklist

- [ ] Open every landing page URL in a browser.
- [ ] Confirm landing pages do not block required OpenAI user agents or otherwise prevent review.
- [ ] Open every image URL in a browser and confirm it opens directly to the image.
- [ ] Confirm images are square, public, and within current size and format requirements.
- [ ] Check that every title and copy line fits the latest template character limits.
- [ ] Check that context hints are valid JSON arrays, e.g. `["hint one", "hint two"]`.
- [ ] Check that every campaign and ad group name matches exactly across workbook tabs.
- [ ] Confirm every claim is supported by exported ads or website/landing pages.
- [ ] Confirm a qualified reviewer on your team has approved accuracy, completeness, policy fit, and brand fit.

## Final workbook structure

The final workbook must contain **exactly three tabs and no others**: `Campaigns`, `adgroups`, `ads`. Delete any extra tabs (`ads_review`, `ads_review_summary`, `review`, `summary`, `QA`, `temp`, or working tabs). Column headers must not be renamed. Upload data rows must not be italicized. No duplicate rows, no merged cells.

## Common breakpoints for smaller advertisers

| Breakpoint | How to avoid it |
|------------|-----------------|
| Only uploading a few ads | Plan for at least 100 ready ads before launch, then keep expanding across intent clusters and creative angles |
| Treating context hints like keywords | Write conversational phrases that describe real user needs and situations |
| Unsupported claims | Use the approved claims list and supported-claims rule before generating ads |
| Broken image links | Use public, direct PNG or JPG image links and manually open each URL |
| Homepage-only landing pages | Map ads to the most relevant product, collection, service, or content page |
| Template errors | Use header names, preserve tab names, avoid merged cells, and validate names across tabs |
| Skipping final review | Require approval before upload. Formatting checks do not equal launch approval |

## Final review warning

Before uploading or launching campaigns, review every generated ad, context hint, landing page, and image link for accuracy, completeness, policy compliance, and brand fit. Chat-generated drafts can contain errors, miss important qualifiers, overstate claims, or create copy that is technically valid but not appropriate for your business. **Do not upload ads until a qualified member of your team has reviewed and approved them.**
