# Step 9: Reconciliation

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

Design reconciliation processes between usage metering, billing system, and payment providers to ensure accuracy and compliance.

---

## Prerequisites

- Billing notifications defined (Step 8)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design reconciliation processes for the multi-tenant billing platform:

## Reconciliation Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   Reconciliation Architecture                    │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Usage     │    │   Billing   │    │   Payment   │         │
│  │  Metering   │    │   System    │    │  Provider   │         │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘         │
│         │                  │                   │                 │
│         └──────────────────┼───────────────────┘                │
│                            │                                     │
│                     ┌──────▼──────┐                             │
│                     │ Reconciler  │                             │
│                     │   Engine    │                             │
│                     └──────┬──────┘                             │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         ▼                  ▼                  ▼                 │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐           │
│  │  Match    │      │ Discrepancy│      │  Audit    │          │
│  │  Report   │      │   Alerts   │      │   Log     │          │
│  └───────────┘      └───────────┘      └───────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Reconciliation Types

| Type | Frequency | Systems | Tolerance |
|------|-----------|---------|-----------|
| Usage-to-Billing | Daily | Metering -> Billing | 0% |
| Billing-to-Payment | Daily | Billing -> Provider | 0.1% |
| Revenue Recognition | Monthly | All systems | $1 |
| Subscription Status | Real-time | Platform <-> Provider | 0 |

## Usage-to-Billing Reconciliation

```yaml
usage_to_billing:
  schedule: daily_at_3am
  
  process:
    1. extract_usage:
        source: usage_aggregation_store
        period: previous_day
        group_by: [tenant_id, metric_name]
        
    2. extract_billing_records:
        source: billing_system
        period: previous_day
        group_by: [tenant_id, metric_name]
        
    3. compare:
        match_key: tenant_id + metric_name + period
        compare_fields: [quantity, amount]
        
    4. report:
        matched: log_success
        unmatched: flag_for_review
        discrepancy: create_alert
        
  tolerance:
    quantity_difference: 0  # Exact match required
    amount_difference: $0.01  # Rounding tolerance
    
  on_discrepancy:
    small: auto_adjust + log
    large: alert + manual_review
    threshold: $10 or 5%
```

## Billing-to-Payment Reconciliation

```yaml
billing_to_payment:
  schedule: daily_at_4am
  
  process:
    1. extract_invoices:
        source: billing_system
        status: [paid, refunded]
        period: previous_day
        
    2. extract_payments:
        source: payment_provider
        period: previous_day
        
    3. match:
        invoice_to_payment:
          key: provider_payment_id
          verify: amount, currency
          
    4. identify_orphans:
        payments_without_invoice: flag
        invoices_without_payment: flag
        
  verification:
    expected_total: sum(invoices.amount)
    actual_total: sum(payments.amount)
    variance_allowed: 0.1%
    
  on_discrepancy:
    payment_not_recorded: sync_from_provider
    invoice_not_paid: verify_payment_status
    amount_mismatch: investigate
```

## Subscription Status Reconciliation

```yaml
subscription_reconciliation:
  frequency: every_hour
  
  process:
    1. fetch_platform_subscriptions:
        fields: [id, status, tier, period_end]
        
    2. fetch_provider_subscriptions:
        fields: [id, status, plan, current_period_end]
        
    3. compare:
        - status_match
        - tier_plan_match
        - period_end_match
        
    4. resolve_mismatches:
        platform_ahead: sync_to_provider
        provider_ahead: sync_to_platform
        conflict: alert_for_manual_resolution
        
  critical_mismatches:
    - active_vs_cancelled
    - tier_mismatch
    - payment_method_missing
```

## Revenue Reconciliation

```yaml
revenue_reconciliation:
  schedule: monthly_close
  
  components:
    recognized_revenue:
      source: accounting_system
      calculation: per_asc_606
      
    billed_revenue:
      source: billing_system
      calculation: sum(invoices.total)
      
    collected_revenue:
      source: payment_provider
      calculation: sum(payments.net)
      
  reconciliation:
    billed_vs_collected:
      expected: collected + outstanding
      variance_allowed: 0.5%
      
    recognized_vs_billed:
      timing_differences: expected
      document: revenue_timing_adjustments
      
  reports:
    - revenue_summary
    - deferred_revenue_schedule
    - bad_debt_analysis
```

## Discrepancy Handling

```yaml
discrepancy_handling:
  classification:
    timing_difference:
      description: "Event recorded in different periods"
      action: note_for_next_reconciliation
      
    data_error:
      description: "Incorrect data in one system"
      action: investigate_and_correct
      
    system_error:
      description: "Integration or sync failure"
      action: trigger_resync
      
    fraud_indicator:
      description: "Suspicious pattern"
      action: escalate_immediately
      
  resolution_workflow:
    1. identify: automated_flagging
    2. investigate: assigned_to_finance
    3. resolve: apply_correction
    4. verify: re-reconcile
    5. document: audit_trail
    
  escalation:
    amount_threshold: $1000
    count_threshold: 10_discrepancies
    escalate_to: finance_director
```

## Audit Trail

```yaml
audit_trail:
  events_logged:
    - reconciliation_run_start
    - reconciliation_run_complete
    - discrepancy_detected
    - discrepancy_resolved
    - manual_adjustment_applied
    - reconciliation_approved
    
  retention:
    reconciliation_reports: 7_years
    audit_logs: 7_years
    raw_data_snapshots: 2_years
    
  fields:
    - timestamp
    - reconciliation_type
    - period
    - systems_compared
    - records_processed
    - discrepancies_found
    - resolution_actions
    - approved_by
```

## Reconciliation Reports

```yaml
reports:
  daily_reconciliation:
    content:
      - summary_statistics
      - discrepancy_list
      - resolution_status
    recipients: billing_team
    
  weekly_billing_health:
    content:
      - reconciliation_trends
      - outstanding_discrepancies
      - system_health_metrics
    recipients: finance_leadership
    
  monthly_close:
    content:
      - revenue_reconciliation
      - deferred_revenue
      - aging_report
      - audit_findings
    recipients: cfo, external_auditors
```

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/billing-integration-spec.md`
- `{output_folder}/planning-artifacts/billing/reconciliation-runbook.md`

**Verify current best practices with web search:**
Search the web: "SaaS billing reconciliation best practices {date}"
Search the web: "revenue reconciliation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the reconciliation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into reconciliation using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for reconciliation analysis
- **C (Continue)**: Accept reconciliation design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass reconciliation context: types, discrepancy handling
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into reconciliation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review reconciliation for tenant billing: {summary of processes and reporting}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save reconciliation summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Generate final output documents
- Create mode complete

---

## Verification

- [ ] Reconciliation types defined
- [ ] Usage-to-billing reconciliation configured
- [ ] Billing-to-payment reconciliation configured
- [ ] Subscription status sync established
- [ ] Revenue reconciliation documented
- [ ] Discrepancy handling process complete
- [ ] Audit trail configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Billing integration specification
- Reconciliation runbook
- Audit trail configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/billing-integration-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/usage-billing-template.md`

---

## Next Step

Create mode complete. Proceed to `bmad-bam-tenant-onboarding-design` for onboarding integration.
