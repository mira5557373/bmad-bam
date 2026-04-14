# QG-BV1: Billing Validation Checklist

> Gate ID: QG-BV1 (Billing Validation)
> Billing accuracy MUST be verified before production deployment for monetized services.
> Gate definition: verifies invoice correctness, revenue recognition, quota enforcement, and payment processing.
> Workflow integration: BAM billing and monetization workflows feed into this gate.
> Executing workflow: `usage-metering-design` (billing phase)
>
> **Prerequisite Gate:** QG-BV1 must pass before QG-P1 (Production Readiness)
> for any system with tenant billing.

## Invoice Accuracy

### Usage Tracking Verification

- [ ] Usage events captured for all billable actions
- [ ] Usage timestamps recorded accurately (UTC)
- [ ] Usage aggregation matches raw event counts
- [ ] Usage roll-up intervals configured correctly (hourly/daily)
- [ ] Usage data immutable after billing period closes
- [ ] Usage backfill procedures documented and tested
- [ ] Usage deduplication logic verified
- [ ] Usage data retained per compliance requirements

### Invoice Generation

- [ ] Invoice line items match usage records
- [ ] Invoice calculations verified against manual spot-checks
- [ ] Tax calculations accurate per jurisdiction
- [ ] Discount codes applied correctly
- [ ] Credit balances deducted properly
- [ ] Invoice totals reconcile with usage aggregates
- [ ] Invoice PDF generation verified
- [ ] Invoice numbering sequential and unique

### Billing Period Management

- [ ] Billing period boundaries enforced correctly
- [ ] Proration calculated accurately for mid-cycle changes
- [ ] Plan upgrades/downgrades reflected properly
- [ ] Grace periods honored before service suspension
- [ ] Billing cycle timezone handling correct
- [ ] Month-end boundary edge cases tested

## Revenue Recognition

### Accounting Compliance

- [ ] Revenue recognized per ASC 606 / IFRS 15
- [ ] Deferred revenue tracked for prepaid subscriptions
- [ ] Unbilled revenue accrued for usage-based billing
- [ ] Revenue allocation across performance obligations correct
- [ ] Multi-element arrangements handled properly
- [ ] Variable consideration estimated reasonably

### Financial Reporting

- [ ] Monthly revenue reports generated accurately
- [ ] Revenue by tenant tier segmented
- [ ] Revenue by product/feature segmented
- [ ] MRR/ARR calculations verified
- [ ] Churn revenue tracked separately
- [ ] Expansion revenue identified
- [ ] Revenue forecast accuracy monitored

### Audit Trail

- [ ] All billing changes logged with timestamps
- [ ] Manual adjustments require approval workflow
- [ ] Credit/refund reasons documented
- [ ] Billing dispute history maintained
- [ ] Revenue adjustments tracked separately
- [ ] Audit log immutable and exportable

## Quota Enforcement

### Limit Configuration

- [ ] Tier limits defined for all billable resources
- [ ] Soft limits trigger warnings at thresholds (50%, 80%, 95%)
- [ ] Hard limits enforce caps at 100%
- [ ] Limit overrides available for Enterprise tier
- [ ] Limit increases require admin approval
- [ ] Limit configuration version controlled

### Enforcement Accuracy

- [ ] Rate limiting accurate within 1% tolerance
- [ ] API call quotas enforced correctly
- [ ] Storage quotas block uploads at limit
- [ ] Compute quotas throttle appropriately
- [ ] Concurrent connection limits enforced
- [ ] Burst allowances configured per tier

### Overage Handling

- [ ] Overage charges calculated correctly
- [ ] Overage notifications sent before charges
- [ ] Overage grace period honored
- [ ] Auto-upgrade option available
- [ ] Overage spending caps configurable
- [ ] Overage reports generated daily

## Payment Processing

### Payment Gateway Integration

- [ ] Payment gateway integration tested end-to-end
- [ ] Credit card processing successful (Visa, MC, Amex)
- [ ] ACH/direct debit processing verified
- [ ] Wire transfer reconciliation automated
- [ ] Payment method tokenization secure (PCI compliant)
- [ ] 3D Secure authentication enabled where required

### Payment Lifecycle

- [ ] Payment capture successful after invoice generation
- [ ] Failed payment retry logic configured
- [ ] Payment method update flow tested
- [ ] Refund processing verified
- [ ] Partial refunds supported
- [ ] Chargebacks handled with evidence collection
- [ ] Payment confirmation emails sent

### Dunning Management

- [ ] Dunning sequence configured (email reminders)
- [ ] Grace period before service degradation
- [ ] Service suspension after payment failure
- [ ] Account reactivation after payment recovery
- [ ] Dunning escalation to support team
- [ ] Bad debt write-off procedures documented

## Billing Alerts

### Tenant-Facing Alerts

- [ ] Usage approaching limit alerts (50%, 80%, 95%)
- [ ] Invoice generated notification
- [ ] Payment successful confirmation
- [ ] Payment failed warning
- [ ] Credit balance low alert
- [ ] Plan change confirmation
- [ ] Upcoming renewal reminder

### Operator-Facing Alerts

- [ ] High-value invoice generated alert
- [ ] Payment failure spike detection
- [ ] Revenue anomaly detection
- [ ] Churn risk tenant identification
- [ ] Billing reconciliation discrepancy alert
- [ ] Quota enforcement failure alert
- [ ] Audit compliance deadline reminders

### Alert Delivery

- [ ] Email delivery verified (SPF/DKIM configured)
- [ ] In-app notifications displayed
- [ ] Webhook delivery for billing events
- [ ] Alert suppression for resolved issues
- [ ] Alert deduplication within window
- [ ] Escalation path for critical alerts

---

## Web Research Verification

- [ ] Search the web: "SaaS billing best practices multi-tenant {date}" - Verify billing patterns
- [ ] Search the web: "revenue recognition ASC 606 SaaS {date}" - Confirm accounting compliance
- [ ] _Source: [URL]_ citations documented for key decisions

## Related Patterns

Load decision criteria from pattern registry:

- **Billing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `billing-*`
- **Monetization patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `monetization-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS usage metering best practices {date}"
- Search: "multi-tenant billing isolation {date}"
- Search: "subscription billing quota enforcement {date}"
- Search: "payment gateway integration patterns {date}"

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Finance Lead or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                       | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------------ | -------------- | --------------------- | -------------- |
| Usage Tracking Verification    | CRITICAL       | Aggregation gaps | Usage not captured |
| Invoice Generation             | CRITICAL       | Calculation minor errors | Invoice amounts wrong |
| Billing Period Management      | CRITICAL       | Edge case failures | Period boundaries broken |
| Revenue Recognition            | CRITICAL       | Reporting gaps | ASC 606 non-compliance |
| Financial Reporting            | Non-critical   | Segmentation incomplete | N/A |
| Audit Trail                    | CRITICAL       | Partial logging | Changes not logged |
| Limit Configuration            | CRITICAL       | Override gaps | Limits undefined |
| Enforcement Accuracy           | CRITICAL       | >1% variance | Enforcement broken |
| Overage Handling               | Non-critical   | Notification gaps | N/A |
| Payment Gateway Integration    | CRITICAL       | Secondary methods fail | Primary payment fails |
| Payment Lifecycle              | CRITICAL       | Retry logic gaps | Payment capture fails |
| Dunning Management             | Non-critical   | Sequence incomplete | N/A |
| Tenant-Facing Alerts           | Non-critical   | Some alerts missing | N/A |
| Operator-Facing Alerts         | Non-critical   | Detection gaps | N/A |
| Alert Delivery                 | Non-critical   | Channel gaps | N/A |

## Recovery Protocol

**If QG-BV1 fails:**

1. **Attempt 1:** Immediate remediation (target: 2-3 days)
   - Identify failing billing components
   - Verify usage tracking pipeline integrity
   - Check invoice calculation logic
   - Validate payment gateway configuration
   - Test quota enforcement accuracy
   - Re-run QG-BV1 validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep billing review (target: 2-3 days)
   - Engage Finance and Engineering teams
   - Review billing architecture against patterns
   - Validate revenue recognition calculations
   - Verify payment processor integration
   - Test end-to-end billing flows manually
   - Re-run QG-BV1 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Finance Lead and Engineering Leadership
   - Document billing gaps with financial impact assessment
   - Consider billing platform changes if gaps are systemic
   - Create remediation plan with Finance sign-off
   - Define minimum viable billing for production
   - Schedule follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Usage Tracking | Fix event capture, verify aggregation | Usage not captured |
| Invoice Generation | Fix calculation logic, spot-check invoices | Invoice amounts wrong |
| Revenue Recognition | Engage Finance, review ASC 606 compliance | Accounting non-compliance |
| Quota Enforcement | Fix limit configuration, test enforcement | Limits not enforced |
| Payment Processing | Debug gateway integration, test payments | Payment capture fails |
| Alerts | Configure missing alerts, test delivery | Critical alerts not sent |

## Related Workflows

- `bmad-bam-usage-metering-design` - Usage tracking setup
- `bmad-bam-billing-integration-design` - Billing architecture
- `bmad-bam-tenant-tier-design` - Tier and quota configuration
- `bmad-bam-payment-gateway-integration` - Payment processing setup
- `bmad-bam-revenue-analytics-design` - Financial reporting design

**PASS CRITERIA:** All CRITICAL billing items verified, usage matches invoices
**OWNER:** Finance Lead / Billing Engineering Lead
**REVIEWERS:** Engineering, Finance, Compliance
