# Step 1: Define Invoice Schema

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the complete invoice data structure including header fields, line items, tax calculations, and metadata.

---

## Prerequisites

- Usage metering design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- User requirements and constraints for invoice generation
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Invoice Header Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| invoice_id | string | Yes | Unique invoice identifier |
| invoice_number | string | Yes | Sequential human-readable number |
| tenant_id | string | Yes | Billing tenant identifier |
| billing_period_start | ISO8601 | Yes | Period start date |
| billing_period_end | ISO8601 | Yes | Period end date |
| issue_date | ISO8601 | Yes | Invoice creation date |
| due_date | ISO8601 | Yes | Payment due date |
| currency | string | Yes | ISO 4217 currency code |
| status | enum | Yes | draft/finalized/paid/voided |

### 2. Define Line Item Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| line_item_id | string | Yes | Unique line identifier |
| description | string | Yes | Human-readable description |
| resource_type | string | Yes | Metering resource type |
| quantity | decimal | Yes | Usage quantity |
| unit | string | Yes | Unit of measurement |
| unit_price | decimal | Yes | Price per unit |
| amount | decimal | Yes | Line total (qty * price) |
| metadata | object | No | Additional context |

### 3. Define Tax Calculation Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| subtotal | decimal | Yes | Sum of line items |
| tax_rate | decimal | Yes | Applicable tax rate |
| tax_amount | decimal | Yes | Calculated tax |
| total | decimal | Yes | Grand total |
| tax_jurisdiction | string | No | Tax authority |
| tax_exemption | boolean | No | Exemption status |

### 4. Define Invoice Metadata

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_name | string | Yes | Display name |
| tenant_address | object | Yes | Billing address |
| payment_terms | string | Yes | Net 30, Due on receipt, etc. |
| notes | string | No | Custom invoice notes |
| po_number | string | No | Purchase order reference |

### 5. Define Invoice Lifecycle States

| State | Transitions To | Trigger |
|-------|---------------|---------|
| draft | finalized | Invoice approval |
| finalized | paid, voided | Payment/cancellation |
| paid | (terminal) | Payment confirmation |
| voided | (terminal) | Invoice cancellation |

**Verify current best practices with web search:**
Search the web: "invoice schema design SaaS best practices {date}"
Search the web: "automated invoice generation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the invoice schema definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into schema design using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for schema analysis
- **C (Continue)**: Accept schema definition and proceed to usage aggregation integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass schema context: fields defined, lifecycle states
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into schema summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review invoice schema definition for invoice generation: {summary of fields and states}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save schema summary to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-configure-usage-aggregation.md`

---

## Verification

- [ ] Invoice header fields defined with all required attributes
- [ ] Line item structure supports all resource types
- [ ] Tax calculation fields handle multiple jurisdictions
- [ ] Metadata includes all tenant-specific information
- [ ] Lifecycle states with valid transitions defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Invoice schema specification
- Line item type catalog
- Tax configuration requirements

---

## Next Step

Proceed to `step-02-c-configure-usage-aggregation.md` to integrate usage data.
