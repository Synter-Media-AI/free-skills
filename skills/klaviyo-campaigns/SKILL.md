---
name: klaviyo-campaigns
description: Klaviyo email/SMS — campaigns, lists, segments, flows, audience sync, event tracking. Load before `run_ppc_script platform="KLAVIYO"`.
---

# Klaviyo Email & SMS Marketing (run_ppc_script with platform="KLAVIYO")

All Klaviyo scripts auto-inject OAuth credentials from the user's connected Klaviyo account.

## Campaigns & Lists

- **`klaviyo_list_campaigns`** — List email/SMS campaigns with status and send time.
  Args: `[--channel email|sms]` `[--status draft|scheduled|sent|cancelled]`
- **`klaviyo_list_lists`** — List subscriber lists and optionally segments.
  Args: `[--include-segments]`
- **`klaviyo_list_templates`** — List email templates. Args: `[--filter NAME_SUBSTRING]`
- **`klaviyo_list_flows`** — List automation flows with status and trigger type.
  Args: `[--status draft|manual|live]`

## Campaign Creation & Management

- **`klaviyo_create_campaign`** — Create a draft email or SMS campaign with template assignment. Returns `campaign_id` ready for sending.
  Args:
  ```
  --name NAME --list-id LIST_ID --subject SUBJECT
  [--channel email|sms]
  [--html-body HTML] [--html-file PATH] [--template-id ID]
  [--from-email EMAIL] [--from-name NAME]
  [--preview-text TEXT] [--reply-to EMAIL]
  [--exclude-list-id IDS]
  [--schedule-at ISO_DATETIME] [--local-timezone]
  [--no-smart-sending] [--add-utm]
  [--sms-body TEXT]   (for SMS campaigns)
  ```
- **`klaviyo_send_campaign`** — Send a draft campaign immediately.
  Args: `--campaign-id ID` `[--cancel]` `[--status]`
- **`klaviyo_cancel_campaign`** — Cancel a scheduled or sending campaign.
  Args: `--campaign-id ID`

## Campaign Metrics

- **`klaviyo_get_campaign_metrics`** — Get campaign performance metrics (opens, clicks, bounces, unsubscribes, revenue).
  Args: `--campaign-id ID` `[--detail]`

## Audience Sync

- **`klaviyo_sync_audience`** — Upsert profiles and add them to a Klaviyo list.
  Args: `--list-id LIST_ID --profiles-json '[{"email":"...","first_name":"...","last_name":"...","phone":"..."}]'`

## Event Tracking

- **`klaviyo_track_event`** — Track a custom event for a profile to trigger Klaviyo flows.
  Args: `--email EMAIL --metric METRIC_NAME` `[--properties '{"key":"value"}']` `[--value AMOUNT]` `[--time ISO_TIMESTAMP]`

## Examples

Create and send an email campaign:
```json
{"script_name": "klaviyo_create_campaign", "platform": "KLAVIYO", "args": ["--name", "March Newsletter", "--list-id", "LIST_ID", "--subject", "Your March Update", "--html-body", "<html><body><h1>Hello!</h1></body></html>", "--from-email", "hello@example.com", "--from-name", "Acme Inc"]}
```
Then send:
```json
{"script_name": "klaviyo_send_campaign", "platform": "KLAVIYO", "args": ["--campaign-id", "CAMPAIGN_ID"]}
```

Get campaign performance:
```json
{"script_name": "klaviyo_get_campaign_metrics", "platform": "KLAVIYO", "args": ["--campaign-id", "CAMPAIGN_ID", "--detail"]}
```

Sync leads to a Klaviyo list:
```json
{"script_name": "klaviyo_sync_audience", "platform": "KLAVIYO", "args": ["--list-id", "LIST_ID", "--profiles-json", "[{\"email\":\"alice@example.com\",\"first_name\":\"Alice\"},{\"email\":\"bob@example.com\",\"first_name\":\"Bob\"}]"]}
```

Track a signup event:
```json
{"script_name": "klaviyo_track_event", "platform": "KLAVIYO", "args": ["--email", "alice@example.com", "--metric", "Signed Up", "--properties", "{\"plan\":\"Pro\",\"source\":\"Google Ads\"}", "--value", "49"]}
```


---

## About this skill

Part of the [Synter free skills collection](https://github.com/Synter-Media-AI/free-skills) — open-source agent skills for advertising, PPC, and marketing automation.

**Want this skill (and 40+ more) running on autopilot against your live ad accounts?** Try [Synter](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills) — AI Agent Media Buyers that connect to Google, Meta, LinkedIn, TikTok, Reddit, Amazon, and 7+ more platforms.

- 🌐 [syntermedia.ai](https://syntermedia.ai?utm_source=skills_sh&utm_medium=skill_footer&utm_campaign=free_skills)
- 📚 [All free skills](https://github.com/Synter-Media-AI/free-skills)
- 💬 Built by [@syntermedia](https://twitter.com/syntermedia) — questions? Open an [issue](https://github.com/Synter-Media-AI/free-skills/issues).
