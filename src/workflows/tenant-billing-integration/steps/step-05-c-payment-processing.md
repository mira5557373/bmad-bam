# Step 5: Payment Processing

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

Configure payment processor integration including card handling, retry logic, dunning workflows, and security for multi-tenant billing.

---

## Prerequisites

- Invoice generation defined (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Configure payment processing for the multi-tenant platform:

## Payment Processing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Payment Processing Flow                        │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Invoice   │───►│   Payment   │───►│   Provider  │         │
│  │   Created   │    │   Intent    │    │   Charge    │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            │            ┌──────┴──────┐         │
│                            │            ▼             ▼         │
│                            │     ┌──────────┐  ┌──────────┐    │
│                            │     │ Success  │  │ Failure  │    │
│                            │     └────┬─────┘  └────┬─────┘    │
│                            │          │             │           │
│                            ▼          ▼             ▼           │
│                     ┌───────────────────────────────────┐       │
│                     │         Webhook Handler           │       │
│                     │    (Update invoice + tenant)      │       │
│                     └───────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## Payment Method Management

```yaml
payment_methods:
  # Card handling
  cards:
    storage: provider_vault  # Never store card data
    tokenization: provider_tokens
    validation: on_add
    
  # Supported card types
  supported_cards:
    - visa
    - mastercard
    - amex
    - discover
    
  # 3D Secure
  three_d_secure:
    enabled: true
    enforcement: risk_based  # Provider determines
    
  # Default payment method
  default_method:
    selection: tenant_choice
    fallback: most_recent
```

## Payment Collection

```yaml
payment_collection:
  # Automatic collection
  automatic:
    enabled: true
    timing: invoice_finalized
    
  # Collection methods by tier
  tier_methods:
    FREE:
      method: none
      
    PRO:
      method: automatic_charge
      payment_method: default_card
      
    ENTERPRISE:
      method: tier_based  # Invoice or auto-charge
      default: invoice_payment
```

## Retry Logic

```yaml
retry_logic:
  # Smart retry configuration
  smart_retry:
    enabled: true
    provider: stripe_smart_retries
    
  # Manual retry schedule
  retry_schedule:
    - attempt: 1
      timing: immediate
      
    - attempt: 2
      timing: 3_days_later
      
    - attempt: 3
      timing: 5_days_later
      
    - attempt: 4
      timing: 7_days_later
      
  # Retry limits
  max_attempts: 4
  max_duration: 14_days
  
  # Retry behavior
  retry_behavior:
    card_declined: retry
    insufficient_funds: retry
    expired_card: notify_customer
    fraud_suspected: do_not_retry
```

## Dunning Workflow

```yaml
dunning_workflow:
  # Dunning stages
  stages:
    - stage: payment_failed
      day: 0
      action:
        - email: payment_failed_notification
        - portal: update_status
        - webhook: payment.failed
        
    - stage: retry_1_failed
      day: 3
      action:
        - email: update_payment_method_reminder
        
    - stage: retry_2_failed
      day: 8
      action:
        - email: service_interruption_warning
        - portal: show_warning_banner
        
    - stage: final_attempt_failed
      day: 14
      action:
        - email: final_notice
        - trigger: grace_period_start
        
  # Grace period
  grace_period:
    duration: 7_days
    capabilities: read_only
    notification: daily_reminder
    
  # Account suspension
  suspension:
    trigger: grace_period_expired
    action:
      - email: account_suspended
      - disable: api_access
      - preserve: data_30_days
```

## Webhook Integration

```yaml
webhooks:
  # Payment events
  events:
    payment_intent.succeeded:
      handler: handle_payment_success
      actions:
        - update_invoice_paid
        - update_tenant_status
        - send_receipt
        
    payment_intent.payment_failed:
      handler: handle_payment_failure
      actions:
        - log_failure_reason
        - trigger_dunning
        - notify_tenant
        
    charge.refunded:
      handler: handle_refund
      actions:
        - update_invoice
        - issue_credit_note
        
    customer.subscription.updated:
      handler: handle_subscription_change
      actions:
        - sync_tenant_tier
        
  # Webhook security
  security:
    signature_verification: required
    signature_header: Stripe-Signature
    replay_protection: timestamp_check
    max_age: 300_seconds
```

## Refund Processing

```yaml
refunds:
  # Refund policies
  policies:
    full_refund:
      eligibility: within_30_days
      amount: full_payment
      
    prorated_refund:
      eligibility: subscription_cancel
      calculation: unused_days * daily_rate
      
    no_refund:
      applies_to: usage_charges
      
  # Refund flow
  process:
    1. validate_refund_eligibility
    2. calculate_refund_amount
    3. initiate_provider_refund
    4. issue_credit_note
    5. update_tenant_records
    6. send_confirmation
    
  # Refund timing
  timing:
    card_refunds: 5-10_business_days
    ach_refunds: 3-5_business_days
```

## PCI Compliance

```yaml
pci_compliance:
  # Scope reduction
  strategy: saq_a  # Outsource all card handling
  
  # Card data
  card_handling:
    storage: never  # Never store card data
    transmission: provider_checkout
    display: masked_only  # **** **** **** 1234
    
  # Security measures
  security:
    tls: required_1.2_minimum
    tokenization: provider_tokens
    audit_logging: all_payment_actions
    
  # Provider responsibility
  provider_handles:
    - card_data_storage
    - card_validation
    - fraud_detection
    - 3d_secure
```

## Fraud Prevention

```yaml
fraud_prevention:
  # Provider-based
  provider_tools:
    - stripe_radar
    - risk_scoring
    
  # Additional checks
  custom_checks:
    - velocity_limits
    - geo_blocking
    - amount_thresholds
    
  # Action on suspected fraud
  actions:
    low_risk: process_normally
    medium_risk: require_3ds
    high_risk: block_and_review
```

**Verify current best practices with web search:**
Search the web: "SaaS payment processing best practices {date}"
Search the web: "dunning workflow patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the payment processing design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into payment processing using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for payment analysis
- **C (Continue)**: Accept payment design and proceed to subscription management
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass payment context: retry logic, dunning, webhooks
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into payment summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review payment processing for tenant billing: {summary of flow and dunning}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save payment processing summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-subscription-management.md`

---

## Soft Gate Checkpoint

**Steps 1-5 complete the core billing pipeline design.**

Present summary of:
- Invoice generation and delivery
- Payment processing with retry logic
- Dunning workflow and grace periods

Ask for confirmation before proceeding to subscription management.

---

## Verification

- [ ] Payment methods configured
- [ ] Collection rules defined per tier
- [ ] Retry logic established
- [ ] Dunning workflow complete
- [ ] Webhook handlers defined
- [ ] Refund processing documented
- [ ] PCI compliance addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Payment processing specification
- Dunning workflow diagram
- Webhook handler documentation

---

## Next Step

Proceed to `step-06-c-subscription-management.md` to design subscription lifecycle.
