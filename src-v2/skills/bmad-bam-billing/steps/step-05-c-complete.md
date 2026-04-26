# Step 05: Compile Billing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Revenue recognition, compliance, analytics, final artifact generation
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Compile all designs from Steps 01-04 into final artifact
- 🚫 Do NOT: Add new design elements - only compile and verify completeness
- 🔍 Use web search: Verify compliance and revenue recognition requirements

---

## Purpose

Complete the billing design workflow by addressing revenue recognition, compliance requirements, analytics/reporting, and generating the final billing design artifact.

## Prerequisites

- Steps 01-04 complete
- All billing components designed
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load template:** `{project-root}/_bmad/bam/data/templates/usage-billing-template.md`

## Actions

### 1. Address Revenue Recognition Considerations

Design revenue recognition compliance:

| Standard | Applicability | Requirement |
|----------|---------------|-------------|
| **ASC 606** | US GAAP | 5-step revenue recognition model |
| **IFRS 15** | International | Performance obligations |
| **Deferred Revenue** | Prepaid subscriptions | Recognize over service period |

**Revenue Recognition Data Points:**
```
revenue_event:
  tenant_id: string
  amount_cents: integer
  revenue_type: subscription | usage | one_time
  recognized_date: date
  deferred_until: date | null
  contract_id: string
  performance_obligation: string
```

**Multi-Tenant Considerations:**
- Per-tenant revenue tracking
- Tenant-level revenue reporting
- Contract-based recognition for enterprise

**Web Research Directive:**
```
Search the web: "SaaS revenue recognition ASC 606 {date}"
Search the web: "subscription revenue accounting best practices {date}"
```

### 2. Define Compliance Requirements

Address billing compliance:

| Area | Requirements | Implementation |
|------|--------------|----------------|
| **Tax Collection** | Sales tax, VAT, GST | Tax provider integration (Stripe Tax, TaxJar) |
| **Tax Reporting** | Nexus tracking | Per-jurisdiction reporting |
| **Invoice Retention** | 7+ years | Archival storage with tenant isolation |
| **PCI DSS** | Card data security | Never store card data - use tokens |

**Tax Handling Architecture:**
```
Invoice Creation → Tax Calculation (external) → Add Tax Line Items → Total Calculation
```

**Tax Data:**
```
tax_config:
  tenant_id: string
  tax_exempt: boolean
  tax_id: string | null (VAT/EIN)
  nexus_states: [string]
  default_tax_rate: decimal | null
```

### 3. Design Analytics and Reporting

Define billing analytics:

| Metric | Description | Calculation |
|--------|-------------|-------------|
| **MRR** | Monthly Recurring Revenue | Sum of monthly subscription values |
| **ARR** | Annual Recurring Revenue | MRR * 12 |
| **Churn Rate** | Lost revenue percentage | (Lost MRR / Start MRR) * 100 |
| **ARPU** | Average Revenue Per User | MRR / Active tenants |
| **LTV** | Lifetime Value | ARPU / Churn Rate |
| **CAC Payback** | Customer Acquisition Cost recovery | CAC / (ARPU * Gross Margin) |

**Reporting Requirements:**
| Report | Frequency | Audience |
|--------|-----------|----------|
| Revenue Summary | Daily | Finance |
| Churn Analysis | Weekly | Product/CS |
| Cohort Analysis | Monthly | Leadership |
| Tax Report | Quarterly | Finance/Legal |

**Multi-Tenant Analytics:**
- Aggregate metrics across all tenants
- Per-tier breakdown
- Cohort analysis by sign-up date
- Enterprise vs self-serve segmentation

### 4. Generate Final Artifact

Compile all designs into the billing design document:

**Output Location:** `{output_folder}/planning-artifacts/billing-design.md`

**Document Structure:**
```markdown
# Billing Design

## Overview
- Pricing model: [from Step 01]
- Tier structure: [from Step 01]

## Metering Infrastructure
[from Step 02]
- Event collection
- Aggregation strategy
- Rate limiting
- Quota management

## Subscription Management
[from Step 03]
- Tier configurations
- Feature flags
- Upgrade/downgrade workflows
- Trial management
- Proration rules

## Invoicing and Payments
[from Step 04]
- Invoice generation
- Payment provider integration
- Failed payment handling
- Credits and refunds

## Compliance and Reporting
[from Step 05]
- Revenue recognition
- Tax compliance
- Analytics and metrics

## Quality Gate Checklist
- [ ] All pricing tiers defined
- [ ] Metering covers all billable events
- [ ] Subscription lifecycle complete
- [ ] Payment integration documented
- [ ] Compliance requirements addressed
```

---

## A/P/C Menu

After reviewing compiled billing design:

| Option | Action |
|--------|--------|
| **A** | Discuss/Amend - Revise compiled design |
| **P** | Proceed - Finalize and generate artifact |
| **C** | Continue - Generate artifact and complete |

**Select A, P, or C:**

---

## Verification

- [ ] Revenue recognition approach defined
- [ ] ASC 606 / IFRS 15 considerations addressed
- [ ] Tax compliance architecture documented
- [ ] PCI DSS compliance confirmed (no card storage)
- [ ] Analytics metrics defined
- [ ] Reporting requirements specified
- [ ] All Step 01-04 designs incorporated
- [ ] Final artifact generated at `{output_folder}/planning-artifacts/billing-design.md`
- [ ] Quality gate checklist embedded in artifact
- [ ] Web research completed for compliance requirements

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/billing-design.md`
- Revenue recognition design
- Compliance requirements documentation
- Analytics and reporting specifications

## Next Step

**Create mode complete.**

To validate the billing design, run validation mode:
- `step-20-v-load.md` - Load artifact and checklist
- `step-21-v-validate.md` - Validate against criteria
- `step-22-v-report.md` - Generate validation report

---

**Navigation:** Enter 'A' to amend, 'P' to proceed, or 'C' to generate artifact and complete
