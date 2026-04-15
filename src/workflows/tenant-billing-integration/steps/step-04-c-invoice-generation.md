# Step 4: Invoice Generation

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

Design invoice generation workflows including line items, taxes, formatting, and delivery for multi-tenant billing.

---

## Prerequisites

- Usage tracking integration defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design invoice generation for the multi-tenant platform:

## Invoice Generation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Invoice Generation Flow                        │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Usage     │───►│  Invoice    │───►│   Tax       │         │
│  │   Summary   │    │  Builder    │    │  Calculator │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            └─────────┬─────────┘                │
│                                      ▼                          │
│                            ┌─────────────────┐                  │
│                            │ Invoice Finalize│                  │
│                            └────────┬────────┘                  │
│                                     │                           │
│         ┌───────────────────────────┼───────────────────┐       │
│         ▼                           ▼                   ▼       │
│  ┌───────────┐              ┌───────────┐       ┌───────────┐  │
│  │   PDF     │              │  Provider │       │  Portal   │  │
│  │  Render   │              │   Sync    │       │  Display  │  │
│  └───────────┘              └───────────┘       └───────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Invoice Structure

```yaml
invoice:
  # Header
  header:
    invoice_number: "INV-{tenant_prefix}-{sequence}"
    invoice_date: date
    due_date: date
    billing_period_start: date
    billing_period_end: date
    
  # Billing parties
  from:
    company_name: "{{platform_name}}"
    address: "{{platform_address}}"
    tax_id: "{{platform_tax_id}}"
    
  to:
    tenant_name: "{{tenant.name}}"
    billing_email: "{{tenant.billing_email}}"
    billing_address: "{{tenant.billing_address}}"
    tax_id: "{{tenant.tax_id}}"
    
  # Line items
  line_items:
    - description: string
      quantity: number
      unit_price: money
      amount: money
      tax_rate: percentage
      tax_amount: money
      
  # Summary
  summary:
    subtotal: money
    tax_total: money
    credits_applied: money
    total_due: money
    currency: string
```

## Line Item Types

| Line Item Type | Description | Calculation |
|----------------|-------------|-------------|
| Subscription | Base plan fee | Flat rate per period |
| Usage Overage | Consumption above included | (quantity - included) * unit_price |
| Add-on | Optional features | Feature price |
| Proration | Mid-cycle changes | Daily rate * days |
| Credit | Adjustments/refunds | Applied amount |
| Tax | Sales tax/VAT | Subtotal * tax_rate |

## Invoice Generation Triggers

```yaml
generation_triggers:
  # Automatic generation
  subscription_renewal:
    trigger: billing_period_end
    timing: 24_hours_before
    
  usage_threshold:
    trigger: overage_amount > threshold
    threshold: $500
    action: generate_interim_invoice
    
  # Manual generation
  on_demand:
    trigger: admin_request
    use_case: custom_charges
    
  # Prorated generation
  tier_change:
    trigger: subscription_update
    calculate: prorated_amounts
```

## Tax Calculation

```yaml
tax_calculation:
  # Tax engine
  engine: provider_native  # Use Stripe Tax, Avalara, etc.
  
  # Tax determination
  factors:
    - tenant_location
    - product_type
    - tax_exempt_status
    
  # Tax types
  applicable_taxes:
    us_sales_tax:
      nexus_states: [list]
      rate: by_location
      
    eu_vat:
      b2b: reverse_charge
      b2c: destination_rate
      
    uk_vat:
      rate: 20%
      threshold: GBP_85000
      
  # Tax exemption
  exemption_handling:
    certificate_required: true
    validation: provider_api
    auto_apply: on_valid_certificate
```

## Invoice Numbering

```yaml
invoice_numbering:
  format: "INV-{tenant_prefix}-{year}{month}-{sequence}"
  
  examples:
    - "INV-ACM-202401-0001"
    - "INV-XYZ-202401-0042"
    
  sequence:
    scope: per_tenant
    reset: never  # Continuous numbering
    
  uniqueness:
    constraint: globally_unique
```

## Invoice Delivery

```yaml
delivery:
  channels:
    email:
      enabled: true
      recipient: tenant.billing_email
      cc: tenant.finance_team
      template: invoice_notification
      attachments: [pdf]
      
    portal:
      enabled: true
      location: /billing/invoices
      notification: in_app
      
    api:
      enabled: true
      webhook: invoice.created
      
  timing:
    send_immediately: true
    reminder_before_due: [7_days, 3_days, 1_day]
```

## PDF Generation

```yaml
pdf_generation:
  template: branded_invoice_template
  
  branding:
    logo: platform_logo
    colors: brand_colors
    fonts: brand_fonts
    
  content:
    - header_section
    - billing_parties
    - line_items_table
    - tax_summary
    - payment_instructions
    - footer_section
    
  storage:
    location: invoice_archive
    retention: 7_years
    encryption: at_rest
```

## Credit Notes

```yaml
credit_notes:
  # When to issue
  triggers:
    - refund_issued
    - billing_error_correction
    - goodwill_credit
    
  # Structure
  reference: original_invoice_number
  line_items: negative_amounts
  
  # Application
  apply_to:
    - next_invoice (default)
    - specific_invoice
    - refund_to_payment_method
```

**Verify current best practices with web search:**
Search the web: "SaaS invoice generation best practices {date}"
Search the web: "multi-tenant invoicing patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the invoice generation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into invoice design using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for invoice analysis
- **C (Continue)**: Accept invoice design and proceed to payment processing
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass invoice context: structure, taxes, delivery
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into invoice summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review invoice generation for tenant billing: {summary of structure and delivery}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save invoice generation summary to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-payment-processing.md`

---

## Verification

- [ ] Invoice structure defined
- [ ] Line item types specified
- [ ] Generation triggers configured
- [ ] Tax calculation integrated
- [ ] Invoice numbering established
- [ ] Delivery channels configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Invoice generation specification
- Tax calculation rules
- PDF template requirements

---

## Next Step

Proceed to `step-05-c-payment-processing.md` to configure payment processing.
