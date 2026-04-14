# Step 1: Select Payment Gateway

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

Select and configure the appropriate payment gateway based on requirements analysis.

---

## Prerequisites

- Invoice generation design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing

---

## Inputs

- User requirements and constraints for payment processing
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Gateway Comparison Matrix

| Gateway | Pricing | Global Coverage | Features | Complexity |
|---------|---------|-----------------|----------|------------|
| Stripe | 2.9% + $0.30 | 46 countries | Full suite | Low |
| Braintree | 2.59% + $0.49 | 45 countries | PayPal native | Medium |
| Adyen | Custom | 200+ countries | Enterprise | High |

### 2. Feature Requirements Mapping

| Requirement | Stripe | Braintree | Adyen |
|-------------|--------|-----------|-------|
| Subscription billing | Native | Native | Custom |
| Usage-based billing | Stripe Billing | Limited | Custom |
| Multi-currency | 135+ currencies | 130+ currencies | 150+ currencies |
| ACH/SEPA | Yes | Yes | Yes |
| Digital wallets | Yes | Yes | Yes |
| 3D Secure | Native | Native | Native |

### 3. Regional Availability Analysis

| Region | Primary Gateway | Fallback |
|--------|----------------|----------|
| North America | Stripe | Braintree |
| Europe | Stripe | Adyen |
| APAC | Stripe | Adyen |
| LATAM | Stripe | Local processor |

### 4. Integration Architecture

| Component | Description |
|-----------|-------------|
| Customer object | Tenant-to-customer mapping |
| Payment intent | Transaction authorization |
| Subscription | Recurring billing management |
| Webhook handler | Event processing |
| Idempotency | Duplicate prevention |

### 5. PCI Compliance Strategy

| Approach | PCI Scope | Implementation |
|----------|-----------|----------------|
| Stripe Elements | SAQ-A | Recommended |
| Hosted checkout | SAQ-A | Alternative |
| Direct API | SAQ-D | Not recommended |

**Verify current best practices with web search:**
Search the web: "Stripe vs Braintree comparison SaaS {date}"
Search the web: "payment gateway selection criteria enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the gateway selection above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into gateway selection using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for gateway analysis
- **C (Continue)**: Accept gateway selection and proceed to payment method configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass gateway context: comparison, requirements mapping
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into gateway summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review payment gateway selection for payment processing: {summary of comparison}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save gateway selection to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-configure-payment-methods.md`

---

## Verification

- [ ] Gateway comparison completed with rationale
- [ ] Feature requirements mapped to gateway capabilities
- [ ] Regional availability assessed
- [ ] Integration architecture defined
- [ ] PCI compliance approach selected
- [ ] Patterns align with pattern registry

---

## Outputs

- Gateway selection decision
- Feature requirements matrix
- PCI compliance strategy

---

## Next Step

Proceed to `step-02-c-configure-payment-methods.md` to configure supported payment methods.
