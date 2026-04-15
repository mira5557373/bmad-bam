# Step 6: Subscription Management

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

Design subscription lifecycle including creation, renewal, pausing, and cancellation for multi-tenant billing.

---

## Prerequisites

- Payment processing defined (Step 5)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-lifecycle`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design subscription management for the multi-tenant platform:

## Subscription Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                  Subscription Lifecycle                          │
│                                                                  │
│  TRIAL ───► ACTIVE ───► PAST_DUE ───► CANCELLED                 │
│    │           │            │                                    │
│    │           │            └───► GRACE_PERIOD ───► SUSPENDED    │
│    │           │                                                 │
│    │           └───► PAUSED ───► ACTIVE                          │
│    │                                                             │
│    └───► CONVERTED (to paid)                                     │
│                                                                  │
│  SUSPENDED ───► REACTIVATED (with payment)                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Subscription States

| State | Description | Capabilities | Duration |
|-------|-------------|--------------|----------|
| TRIAL | Evaluation period | Full (tier-limited) | 14 days |
| ACTIVE | Paid and current | Full | Ongoing |
| PAST_DUE | Payment failed | Full | 14 days |
| GRACE_PERIOD | Final warning | Read-only | 7 days |
| PAUSED | Voluntary pause | None | Max 90 days |
| SUSPENDED | Non-payment | None | 30 days |
| CANCELLED | Terminated | Archive access | 30 days |

## Subscription Data Model

```yaml
subscription:
  # Identifiers
  id: uuid
  tenant_id: uuid
  provider_subscription_id: string
  
  # Plan details
  plan_id: string
  tier: enum[FREE, PRO, ENTERPRISE]
  billing_frequency: enum[MONTHLY, ANNUAL, CUSTOM]
  
  # Status
  status: enum[TRIAL, ACTIVE, PAST_DUE, GRACE_PERIOD, PAUSED, SUSPENDED, CANCELLED]
  
  # Billing period
  current_period_start: timestamp
  current_period_end: timestamp
  
  # Cancellation
  cancel_at_period_end: boolean
  cancelled_at: timestamp
  cancellation_reason: string
  
  # Trial
  trial_start: timestamp
  trial_end: timestamp
  
  # Metadata
  created_at: timestamp
  updated_at: timestamp
  metadata: json
```

## Subscription Operations

### Create Subscription

```yaml
create_subscription:
  input:
    tenant_id: required
    plan_id: required
    payment_method_id: required
    billing_frequency: optional (default: monthly)
    
  process:
    1. validate_tenant_status
    2. validate_payment_method
    3. create_provider_subscription
    4. sync_to_platform
    5. provision_tier_features
    6. send_confirmation
    
  outcome:
    - subscription_created event
    - tenant.tier updated
    - welcome_email sent
```

### Renew Subscription

```yaml
renew_subscription:
  trigger: billing_period_end
  
  process:
    1. generate_invoice
    2. charge_payment_method
    3. handle_result:
        success: extend_period
        failure: start_dunning
    4. update_subscription
    5. send_notification
    
  notifications:
    before_renewal: 7_days_prior
    on_renewal: immediate
```

### Pause Subscription

```yaml
pause_subscription:
  eligibility:
    - tier: PRO, ENTERPRISE
    - status: ACTIVE
    - min_tenure: 30_days
    
  configuration:
    max_pause_duration: 90_days
    pause_limit: 2_per_year
    
  process:
    1. validate_eligibility
    2. calculate_pause_dates
    3. update_subscription_status
    4. disable_features
    5. send_confirmation
    
  billing_during_pause:
    monthly: prorate_credit
    annual: extend_period
```

### Cancel Subscription

```yaml
cancel_subscription:
  modes:
    immediate:
      trigger: tenant_request
      effect: immediate_access_loss
      refund: prorated (if eligible)
      
    end_of_period:
      trigger: tenant_request
      effect: access_until_period_end
      refund: none
      
  process:
    1. record_cancellation_reason
    2. set_cancel_at_period_end
    3. schedule_offboarding
    4. send_confirmation
    5. trigger_retention_flow
    
  retention_flow:
    - offer_discount
    - offer_pause
    - collect_feedback
    
  data_handling:
    access: 30_days_post_cancel
    export: available_30_days
    deletion: gdpr_compliant
```

### Reactivate Subscription

```yaml
reactivate_subscription:
  from_states:
    - PAUSED
    - SUSPENDED
    - CANCELLED (within 30 days)
    
  process:
    1. validate_payment_method
    2. charge_reactivation_fee (if applicable)
    3. restore_subscription
    4. re-enable_features
    5. send_confirmation
    
  reactivation_fee:
    from_paused: none
    from_suspended: outstanding_balance
    from_cancelled: outstanding_balance + setup_fee
```

## Trial Management

```yaml
trial:
  duration: 14_days
  
  features:
    - full_pro_tier_access
    - no_payment_required
    
  conversion:
    prompt: 3_days_before_end
    auto_convert: if_payment_method_exists
    
  extension:
    allowed: true
    max_extensions: 1
    extension_duration: 7_days
    requires: sales_approval
    
  expiration:
    action: downgrade_to_free
    notification: 7_days_before, 3_days_before, 1_day_before
    data: preserved
```

## Subscription Sync

```yaml
subscription_sync:
  # Provider to platform
  provider_to_platform:
    trigger: webhook_events
    events:
      - subscription.created
      - subscription.updated
      - subscription.deleted
      
  # Platform to provider
  platform_to_provider:
    trigger: platform_actions
    sync_fields:
      - metadata
      - quantity (seats)
      
  # Reconciliation
  reconciliation:
    frequency: daily
    check: status_match
    alert_on_mismatch: true
```

**Verify current best practices with web search:**
Search the web: "SaaS subscription management best practices {date}"
Search the web: "subscription lifecycle patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the subscription management design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into subscription design using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for subscription analysis
- **C (Continue)**: Accept subscription design and proceed to tier upgrades/downgrades
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass subscription context: lifecycle, operations, trials
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into subscription summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review subscription management for tenant billing: {summary of lifecycle and operations}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save subscription management summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-tier-upgrades-downgrades.md`

---

## Verification

- [ ] Subscription states defined
- [ ] Data model specified
- [ ] CRUD operations documented
- [ ] Trial management configured
- [ ] Pause/cancel flows complete
- [ ] Provider sync established
- [ ] Patterns align with pattern registry

---

## Outputs

- Subscription lifecycle diagram
- Operations specification
- Trial management rules
- **Load template:** `{project-root}/_bmad/bam/data/templates/subscription-management-template.md`

---

## Next Step

Proceed to `step-07-c-tier-upgrades-downgrades.md` to design tier migration.
