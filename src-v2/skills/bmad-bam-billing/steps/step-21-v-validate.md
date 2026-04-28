# Step 21: Validate Billing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Systematic validation against all criteria categories
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Document findings for each criteria category
- 🚫 Do NOT: Make changes during validation - only assess and document
- 🔍 Use web search: Verify critical compliance items against current standards

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## YOUR TASK

Execute all billing validation checks against the loaded billing design artifact. Document each check result with evidence. Verify tenant isolation in billing data, metering completeness, subscription management, invoicing, payment integration, and revenue recognition compliance. Calculate the final validation decision based on CRITICAL and non-critical check outcomes.

---

## Purpose

Perform systematic validation of the billing design against multi-tenant billing best practices, quality gate criteria, and compliance requirements.

## Prerequisites

- Step 20 complete (artifact and checklist loaded)
- Validation scope determined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `billing-*`

## Actions

### 1. Validate Tenant Isolation (CRITICAL)

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| All usage events include `tenant_id` | Yes | [Finding] | [PASS/FAIL] |
| Meter aggregation is tenant-scoped | Yes | [Finding] | [PASS/FAIL] |
| Subscription records have `tenant_id` | Yes | [Finding] | [PASS/FAIL] |
| Invoices are tenant-isolated | Yes | [Finding] | [PASS/FAIL] |
| Credits/refunds scoped to tenant | Yes | [Finding] | [PASS/FAIL] |
| Analytics segment by tenant | Yes | [Finding] | [PASS/FAIL] |

**CRITICAL Findings:**
- [List any CRITICAL failures]

### 2. Validate Metering Completeness

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Event schema defined | Complete schema | [Finding] | [PASS/FAIL] |
| All billable metrics captured | Comprehensive list | [Finding] | [PASS/FAIL] |
| Aggregation strategy documented | Time-window + rollups | [Finding] | [PASS/FAIL] |
| Rate limiting per-tenant | Tier-aware limits | [Finding] | [PASS/FAIL] |
| Quota tracking with alerts | Threshold alerts | [Finding] | [PASS/FAIL] |

**Web Research Directive (if gaps found):**
```
Search the web: "SaaS metering best practices {date}"
```

### 3. Validate Subscription Management

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| All tiers defined | Free, Pro, Enterprise | [Finding] | [PASS/FAIL] |
| Pricing documented | Monthly + Annual | [Finding] | [PASS/FAIL] |
| Feature flags per tier | Boolean + Numeric | [Finding] | [PASS/FAIL] |
| Upgrade workflow complete | Steps documented | [Finding] | [PASS/FAIL] |
| Downgrade workflow complete | Steps + data handling | [Finding] | [PASS/FAIL] |
| Trial period defined | Duration + conversion | [Finding] | [PASS/FAIL] |
| Proration rules specified | Formula documented | [Finding] | [PASS/FAIL] |

### 4. Validate Invoicing and Payments

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Invoice data model complete | All fields defined | [Finding] | [PASS/FAIL] |
| Payment provider documented | Integration approach | [Finding] | [PASS/FAIL] |
| Webhook handlers identified | Key events listed | [Finding] | [PASS/FAIL] |
| Dunning workflow complete | Retry schedule + actions | [Finding] | [PASS/FAIL] |
| Credit workflow defined | Application rules | [Finding] | [PASS/FAIL] |
| Refund workflow defined | Eligibility + process | [Finding] | [PASS/FAIL] |
| Dispute handling documented | Process outlined | [Finding] | [PASS/FAIL] |

### 5. Validate Compliance

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Revenue recognition addressed | ASC 606 / IFRS 15 | [Finding] | [PASS/FAIL] |
| Tax handling documented | Collection + reporting | [Finding] | [PASS/FAIL] |
| PCI DSS compliance | No card data storage | [Finding] | [PASS/FAIL] |
| Invoice retention policy | 7+ years | [Finding] | [PASS/FAIL] |
| Audit trail for billing | Events logged | [Finding] | [PASS/FAIL] |

**Web Research Directive (for compliance verification):**
```
Search the web: "SaaS billing compliance requirements {date}"
Search the web: "ASC 606 subscription revenue {date}"
```

### 6. Validate Analytics and Reporting

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| MRR/ARR metrics defined | Calculation documented | [Finding] | [PASS/FAIL] |
| Churn tracking specified | Formula documented | [Finding] | [PASS/FAIL] |
| Revenue reporting requirements | Frequency + audience | [Finding] | [PASS/FAIL] |
| Per-tenant analytics | Breakdown available | [Finding] | [PASS/FAIL] |

---

## Validation Summary

### Results by Category

| Category | Total Checks | Passed | Failed | Status |
|----------|--------------|--------|--------|--------|
| Tenant Isolation (CRITICAL) | 6 | [N] | [N] | [PASS/FAIL] |
| Metering | 5 | [N] | [N] | [PASS/FAIL] |
| Subscription Management | 7 | [N] | [N] | [PASS/FAIL] |
| Invoicing and Payments | 7 | [N] | [N] | [PASS/FAIL] |
| Compliance | 5 | [N] | [N] | [PASS/FAIL] |
| Analytics | 4 | [N] | [N] | [PASS/FAIL] |
| **TOTAL** | 34 | [N] | [N] | [OUTCOME] |

### Critical Failures

List any CRITICAL check failures:
1. [Critical failure 1]
2. [Critical failure 2]

### Required Fixes

List required fixes for FAIL status:
1. [Required fix 1]
2. [Required fix 2]

---

## SUCCESS METRICS

- ✅ All 6 billing categories validated with evidence
- ✅ Tenant isolation verified for all billing data
- ✅ Metering events aligned with invoice line items
- ✅ All subscription tiers have complete pricing
- ✅ Payment provider integration documented
- ✅ ASC 606/IFRS 15 compliance verified
- ✅ Gate decision calculated correctly
- ✅ Web research verification completed for compliance

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing tenant_id on invoices:** Cannot validate without tenant isolation
- ❌ **Tier pricing incomplete:** Missing monthly/annual rates
- ❌ **Payment provider undocumented:** Integration details required
- ❌ **Revenue recognition non-compliant:** ASC 606 violations detected

---

## Verification

- [ ] All CRITICAL checks completed
- [ ] All Required checks completed
- [ ] All Recommended checks completed
- [ ] Findings documented per category
- [ ] Validation summary compiled
- [ ] Critical failures identified
- [ ] Required fixes listed

## Outputs

- Validation results per category
- Validation summary table
- Critical failures list
- Required fixes list

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.

---

**Navigation:** Enter 'C' to continue to report generation
