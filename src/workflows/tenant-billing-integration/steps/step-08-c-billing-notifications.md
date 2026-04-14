# Step 8: Billing Notifications

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Configure billing notifications including payment confirmations, failures, reminders, and usage alerts for multi-tenant billing.

---

## Prerequisites

- Tier upgrades/downgrades defined (Step 7)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `notifications`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Configure billing notifications for the multi-tenant platform:

## Notification Categories

| Category | Purpose | Priority | Channels |
|----------|---------|----------|----------|
| Transactional | Payment confirmations | High | Email, In-app |
| Alerts | Payment failures, limits | Critical | Email, In-app, SMS |
| Reminders | Upcoming renewals | Medium | Email |
| Usage | Quota warnings | Medium | Email, In-app |
| Administrative | Tier changes | High | Email, In-app |

## Notification Events

```yaml
notification_events:
  # Payment events
  payment:
    payment_succeeded:
      trigger: charge.succeeded
      channels: [email, in_app]
      template: payment_receipt
      
    payment_failed:
      trigger: charge.failed
      channels: [email, in_app, sms_for_enterprise]
      template: payment_failed_notice
      urgency: high
      
    payment_method_expiring:
      trigger: 30_days_before_expiry
      channels: [email, in_app]
      template: update_payment_method
      
  # Invoice events
  invoice:
    invoice_created:
      trigger: invoice.created
      channels: [email]
      template: invoice_available
      attachment: pdf_invoice
      
    invoice_paid:
      trigger: invoice.paid
      channels: [email]
      template: invoice_paid_receipt
      
    invoice_past_due:
      trigger: invoice.past_due
      channels: [email, in_app]
      template: past_due_reminder
      
  # Subscription events
  subscription:
    trial_ending:
      trigger: 3_days_before_trial_end
      channels: [email, in_app]
      template: trial_ending_soon
      
    subscription_created:
      trigger: subscription.created
      channels: [email]
      template: welcome_subscription
      
    subscription_renewed:
      trigger: subscription.renewed
      channels: [email]
      template: renewal_confirmation
      
    subscription_cancelled:
      trigger: subscription.cancelled
      channels: [email, in_app]
      template: cancellation_confirmation
      
  # Usage events
  usage:
    quota_warning:
      trigger: usage >= 80%_of_limit
      channels: [email, in_app]
      template: usage_warning
      thresholds: [80%, 90%, 100%]
      
    overage_started:
      trigger: usage > 100%_of_limit
      channels: [email, in_app]
      template: overage_notification
      tier: PRO  # Only for tiers with overage
```

## Notification Channels

```yaml
channels:
  email:
    provider: sendgrid | ses | postmark
    from_address: billing@{{platform_domain}}
    reply_to: support@{{platform_domain}}
    
    configuration:
      transactional:
        delivery: immediate
        retry: 3_attempts
        
      marketing:
        delivery: batched
        unsubscribe: required
        
  in_app:
    display: notification_center
    persistence: until_acknowledged
    
    categories:
      critical: banner + bell
      high: bell + badge
      medium: bell
      
  sms:
    provider: twilio
    enabled_for: enterprise_tier
    opt_in: required
    
    message_types:
      - payment_failed
      - account_suspended
      
  webhook:
    events: all_billing_events
    endpoint: tenant.webhook_url
    signing: hmac_sha256
```

## Email Templates

```yaml
email_templates:
  payment_receipt:
    subject: "Payment Confirmed - {{invoice_number}}"
    content:
      - greeting
      - payment_summary
      - invoice_details
      - payment_method_used
      - next_billing_date
      - support_link
      
  payment_failed:
    subject: "Action Required: Payment Failed"
    content:
      - greeting
      - failure_explanation
      - amount_due
      - update_payment_cta
      - retry_schedule
      - suspension_warning
      
  invoice_available:
    subject: "Invoice {{invoice_number}} Available"
    content:
      - greeting
      - invoice_summary
      - view_invoice_cta
      - pdf_attachment
      - payment_instructions
      
  usage_warning:
    subject: "Usage Alert: {{usage_percent}}% of {{resource}} Limit"
    content:
      - greeting
      - current_usage
      - limit_info
      - upgrade_suggestion
      - manage_usage_cta
      
  trial_ending:
    subject: "Your Trial Ends in {{days_remaining}} Days"
    content:
      - greeting
      - trial_value_summary
      - upgrade_benefits
      - upgrade_cta
      - no_action_consequence
```

## Notification Preferences

```yaml
notification_preferences:
  # Tenant-level settings
  tenant_settings:
    billing_contact_email: required
    additional_recipients: optional
    notification_language: optional
    timezone: optional
    
  # User-level preferences
  user_preferences:
    email_notifications: true | false
    in_app_notifications: true | false
    sms_notifications: true | false  # Enterprise only
    
  # Cannot disable
  mandatory_notifications:
    - payment_failed
    - account_suspended
    - subscription_cancelled
    - security_alerts
    
  # Opt-out allowed
  optional_notifications:
    - payment_receipt
    - usage_reports
    - renewal_reminders
```

## Reminder Schedule

```yaml
reminder_schedule:
  # Payment reminders
  payment_due:
    - 7_days_before: friendly_reminder
    - 3_days_before: reminder_with_details
    - 1_day_before: final_reminder
    - due_date: payment_due_today
    
  # Trial reminders
  trial_ending:
    - 7_days_before: trial_overview
    - 3_days_before: upgrade_benefits
    - 1_day_before: last_chance
    
  # Renewal reminders
  subscription_renewal:
    - 7_days_before: upcoming_renewal
    - 1_day_before: renewing_tomorrow
    
  # Failed payment follow-up
  dunning_reminders:
    - day_0: payment_failed
    - day_3: update_payment_method
    - day_7: service_interruption_warning
    - day_10: final_notice
```

## Notification Delivery

```yaml
delivery:
  # Delivery timing
  timing:
    transactional: immediate
    reminders: business_hours_only
    digests: daily_at_9am_tenant_tz
    
  # Rate limiting
  rate_limits:
    per_tenant_per_hour: 20
    per_channel_per_day: 50
    
  # Deduplication
  deduplication:
    window: 1_hour
    key: notification_type + tenant_id
    
  # Failure handling
  on_failure:
    retry: exponential_backoff
    max_retries: 3
    fallback_channel: next_priority
    alert_admin: after_max_retries
```

## Localization

```yaml
localization:
  supported_languages:
    - en (default)
    - es
    - fr
    - de
    - ja
    
  localized_content:
    - email_templates
    - in_app_messages
    - pdf_invoices
    
  currency_formatting:
    use: tenant_locale
    
  date_formatting:
    use: tenant_locale + timezone
```

**Verify current best practices with web search:**
Search the web: "SaaS billing notification best practices {date}"
Search the web: "transactional email templates billing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the notification design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into notifications using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for notification analysis
- **C (Continue)**: Accept notification design and proceed to reconciliation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass notification context: events, templates, preferences
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into notification summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review billing notifications for tenant billing: {summary of events and channels}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save notification summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-reconciliation.md`

---

## Verification

- [ ] Notification events defined
- [ ] Channels configured
- [ ] Email templates specified
- [ ] Preferences documented
- [ ] Reminder schedules set
- [ ] Delivery rules established
- [ ] Patterns align with pattern registry

---

## Outputs

- Notification event catalog
- Email template specifications
- Delivery configuration

---

## Next Step

Proceed to `step-09-c-reconciliation.md` to design reconciliation processes.
