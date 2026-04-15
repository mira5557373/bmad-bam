# Step 7: Tier Upgrades/Downgrades

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

Design tier migration workflows with proration calculations and immediate vs. end-of-period change handling.

---

## Prerequisites

- Subscription management defined (Step 6)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tier-management`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design tier upgrade/downgrade workflows for the multi-tenant platform:

## Tier Change Matrix

| From | To | Allowed | Timing | Proration |
|------|-----|---------|--------|-----------|
| Free | Pro | Yes | Immediate | N/A |
| Free | Enterprise | Yes | Immediate | N/A |
| Pro | Free | Yes | End of period | None |
| Pro | Enterprise | Yes | Immediate | Credit |
| Enterprise | Pro | Yes | End of period | None |
| Enterprise | Free | Yes | End of period | None |

## Upgrade Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Upgrade Flow                                │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Request   │───►│  Calculate  │───►│   Charge    │         │
│  │   Upgrade   │    │  Proration  │    │   Amount    │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            │            ┌──────┴──────┐         │
│                            │            ▼             ▼         │
│                            │     ┌──────────┐  ┌──────────┐    │
│                            │     │ Success  │  │ Failure  │    │
│                            │     └────┬─────┘  └────┬─────┘    │
│                            │          │             │           │
│                            │          ▼             ▼           │
│                            │   ┌───────────┐  ┌───────────┐    │
│                            │   │ Provision │  │  Notify   │    │
│                            │   │ Features  │  │   User    │    │
│                            │   └───────────┘  └───────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Upgrade Processing

```yaml
upgrade:
  timing: immediate
  
  process:
    1. validate_upgrade_path:
        - check: tier_transition_allowed
        - check: payment_method_valid
        
    2. calculate_proration:
        - days_remaining: (period_end - now) / period_length
        - current_credit: current_plan_price * days_remaining
        - new_charge: new_plan_price * days_remaining
        - amount_due: new_charge - current_credit
        
    3. process_payment:
        - charge: amount_due
        - handle_failure: abort_upgrade
        
    4. provision_tier:
        - update: subscription.tier
        - enable: new_tier_features
        - sync: provider_subscription
        
    5. notify:
        - email: upgrade_confirmation
        - webhook: subscription.upgraded
        
  example_calculation:
    scenario: "Pro Monthly ($49) to Enterprise ($299) mid-cycle"
    current_period: 30_days
    days_used: 15_days
    days_remaining: 15_days
    pro_credit: $49 * (15/30) = $24.50
    enterprise_charge: $299 * (15/30) = $149.50
    amount_due: $149.50 - $24.50 = $125.00
```

## Downgrade Processing

```yaml
downgrade:
  timing: end_of_period
  
  process:
    1. validate_downgrade_path:
        - check: tier_transition_allowed
        - check: usage_within_new_tier_limits
        
    2. schedule_downgrade:
        - set: scheduled_tier_change
        - effective: current_period_end
        
    3. warn_about_limits:
        - compare: current_usage vs new_tier_limits
        - notify: potential_feature_loss
        - notify: data_that_exceeds_limits
        
    4. at_period_end:
        - update: subscription.tier
        - disable: higher_tier_features
        - enforce: new_tier_limits
        
    5. notify:
        - email: downgrade_scheduled
        - email: downgrade_effective
        - webhook: subscription.downgraded
        
  usage_warnings:
    storage_over_limit:
      message: "Your storage (50GB) exceeds Pro limit (25GB). Please reduce before downgrade."
      action: block_downgrade_until_resolved
      
    users_over_limit:
      message: "You have 10 users but Pro allows 5. Please remove users before downgrade."
      action: block_downgrade_until_resolved
```

## Proration Strategies

```yaml
proration:
  # Upgrade proration
  upgrade:
    strategy: charge_difference
    calculation: |
      credit = old_price * (days_remaining / period_days)
      charge = new_price * (days_remaining / period_days)
      due = charge - credit
    rounding: up_to_cent
    minimum_charge: $1.00
    
  # Downgrade proration
  downgrade:
    strategy: no_refund
    effect: end_of_period
    
  # Add-on proration
  addon:
    add: charge_prorated
    remove: credit_prorated
    
  # Seat changes
  seats:
    add: charge_prorated
    remove: credit_next_period
```

## Feature Provisioning

```yaml
feature_provisioning:
  # On upgrade
  upgrade_actions:
    immediate:
      - enable: higher_tier_features
      - increase: api_rate_limits
      - unlock: premium_support
      
    async:
      - provision: additional_resources
      - configure: advanced_integrations
      
  # On downgrade
  downgrade_actions:
    scheduled:
      - warn: feature_removal
      - export: data_that_exceeds_limits
      
    at_downgrade:
      - disable: higher_tier_features
      - reduce: api_rate_limits
      - archive: premium_data (accessible 30 days)
```

## Billing Frequency Changes

```yaml
billing_frequency_change:
  monthly_to_annual:
    timing: immediate
    calculation: |
      credit = monthly_price * months_remaining
      charge = annual_price
      due = charge - credit
    discount: apply_annual_discount (20%)
    
  annual_to_monthly:
    timing: end_of_annual_period
    refund: none
    next_charge: monthly_price
    
  restriction:
    annual_minimum_commitment: 12_months
    early_termination_fee: remaining_months * monthly_rate
```

## Tier Change Notifications

```yaml
notifications:
  upgrade_requested:
    channel: email
    content: upgrade_preview
    include: proration_details
    
  upgrade_successful:
    channel: [email, in_app, webhook]
    content: new_features_available
    
  downgrade_scheduled:
    channel: [email, in_app]
    content: downgrade_preview
    include: feature_loss_warning
    
  downgrade_effective:
    channel: [email, in_app, webhook]
    content: tier_changed
    include: new_limits
```

## Edge Cases

```yaml
edge_cases:
  # Upgrade during trial
  upgrade_during_trial:
    action: end_trial_immediately
    start: paid_subscription
    
  # Multiple tier changes in period
  multiple_changes:
    policy: each_change_prorated
    limit: 3_changes_per_period
    
  # Upgrade with failed payment
  upgrade_payment_failed:
    action: revert_to_current_tier
    retry: offer_payment_update
    
  # Downgrade with exceeded limits
  downgrade_blocked:
    action: require_usage_reduction
    grace_period: 7_days
```

**Verify current best practices with web search:**
Search the web: "SaaS tier upgrade downgrade best practices {date}"
Search the web: "subscription proration calculation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier change design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier migration using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for tier change analysis
- **C (Continue)**: Accept tier migration design and proceed to billing notifications
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass tier change context: proration, feature provisioning
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tier change summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier upgrade/downgrade for tenant billing: {summary of flows and proration}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier change summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-billing-notifications.md`

---

## Verification

- [ ] Tier change matrix defined
- [ ] Upgrade flow documented
- [ ] Downgrade flow documented
- [ ] Proration strategies specified
- [ ] Feature provisioning rules set
- [ ] Edge cases addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier migration specification
- Proration calculation rules
- Feature provisioning matrix

---

## Next Step

Proceed to `step-08-c-billing-notifications.md` to configure billing notifications.
