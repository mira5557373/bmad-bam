# Step 1: Billing Requirements

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

Define billing requirements including payment methods, currencies, compliance needs, and provider selection for multi-tenant billing integration.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- User requirements and constraints for billing integration
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define billing requirements for the multi-tenant platform:

## Payment Provider Selection

| Provider | Strengths | Best For | Integration Complexity |
|----------|-----------|----------|------------------------|
| Stripe | Full-featured, global | General SaaS | Medium |
| Orb | Usage-based billing | Metering-heavy | Medium |
| Chargebee | Subscription mgmt | Enterprise | Medium |
| Paddle | Tax handling | Global B2C | Low |
| Custom | Full control | Enterprise | High |

## Supported Payment Methods

| Method | Tiers | Provider Support | Notes |
|--------|-------|------------------|-------|
| Credit/Debit Cards | All | All providers | Primary method |
| ACH/Bank Transfer | Pro, Enterprise | Stripe, custom | Lower fees |
| Wire Transfer | Enterprise | Manual | Large invoices |
| Invoice (Net 30/60) | Enterprise | Custom | Credit check required |
| PayPal | All (optional) | Stripe, Paddle | Consumer preference |

## Currency Requirements

```yaml
currency_support:
  primary_currency: USD
  
  supported_currencies:
    - USD  # United States Dollar
    - EUR  # Euro
    - GBP  # British Pound
    - CAD  # Canadian Dollar
    - AUD  # Australian Dollar
    
  currency_handling:
    pricing: per_currency  # Different prices per currency
    invoicing: tenant_currency  # Invoice in tenant's currency
    settlement: primary_currency  # Settle in USD
    
  fx_rates:
    source: provider  # Use payment provider's FX rates
    update_frequency: daily
```

## Compliance Requirements

| Requirement | Scope | Implementation |
|-------------|-------|----------------|
| PCI-DSS | All | Delegate to payment provider |
| SOC 2 | All | Audit-ready billing processes |
| GDPR | EU tenants | Data handling, consent |
| Tax Compliance | By region | Automated tax calculation |
| Revenue Recognition | All | ASC 606 compliant |

## Tax Handling

```yaml
tax_handling:
  strategy: automated  # Use provider's tax engine
  
  tax_types:
    - sales_tax (US)
    - VAT (EU/UK)
    - GST (AU/CA)
    
  tax_exemption:
    supported: true
    validation: certificate_upload
    
  tax_reporting:
    frequency: monthly
    format: provider_standard
```

## Billing Cycle Configuration

| Tier | Billing Frequency | Payment Terms | Auto-Renewal |
|------|-------------------|---------------|--------------|
| Free | N/A | N/A | N/A |
| Pro | Monthly/Annual | Prepaid | Yes |
| Enterprise | Monthly/Annual/Custom | Net 30/60 | Per contract |

## Billing Address Requirements

```yaml
billing_address:
  required_fields:
    - name
    - email
    - country
    
  optional_fields:
    - company_name
    - address_line_1
    - address_line_2
    - city
    - state_province
    - postal_code
    - tax_id
    
  validation:
    tax_id: by_country_format
    postal_code: by_country_format
```

**Verify current best practices with web search:**
Search the web: "SaaS billing requirements multi-tenant {date}"
Search the web: "payment provider comparison enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the billing requirements above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into billing requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for requirements analysis
- **C (Continue)**: Accept requirements and proceed to pricing models
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass requirements context: providers, payment methods, compliance
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into requirements summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review billing requirements for tenant billing integration: {summary of requirements}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save requirements summary to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-pricing-models.md`

---

## Verification

- [ ] Payment provider selected
- [ ] Payment methods defined per tier
- [ ] Currency support configured
- [ ] Compliance requirements documented
- [ ] Tax handling strategy defined
- [ ] Billing cycles configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Billing requirements document
- Provider selection rationale
- Compliance checklist

---

## Next Step

Proceed to `step-02-c-pricing-models.md` to design pricing models.
