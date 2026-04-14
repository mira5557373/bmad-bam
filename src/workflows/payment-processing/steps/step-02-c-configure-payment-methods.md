# Step 2: Configure Payment Methods

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

Configure all supported payment methods with validation rules and storage requirements.

---

## Prerequisites

- Gateway selection completed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Card Payment Configuration

| Card Network | Support Level | 3D Secure | Notes |
|--------------|---------------|-----------|-------|
| Visa | Full | Required | Primary |
| Mastercard | Full | Required | Primary |
| American Express | Full | Required | Higher fees |
| Discover | Regional | Optional | US only |
| JCB | Regional | Optional | APAC |

### 2. Bank Transfer Configuration

| Method | Regions | Settlement | Use Case |
|--------|---------|------------|----------|
| ACH | US | 3-5 days | Enterprise |
| SEPA | EU | 1-2 days | EU enterprise |
| BACS | UK | 3 days | UK enterprise |
| Wire | Global | 1-3 days | Large transactions |

### 3. Digital Wallet Configuration

| Wallet | Integration | Conversion Benefit |
|--------|-------------|-------------------|
| Apple Pay | Stripe native | +15% conversion |
| Google Pay | Stripe native | +12% conversion |
| Link | Stripe native | Returning customers |

### 4. Payment Method Storage

| Data | Storage Location | Encryption |
|------|------------------|------------|
| Card tokens | Gateway (Stripe) | At rest |
| Bank tokens | Gateway (Stripe) | At rest |
| Customer reference | Platform DB | AES-256 |
| Last 4 digits | Platform DB | Plain (display) |

### 5. Validation Rules

| Method | Validation | Frequency |
|--------|------------|-----------|
| Card | Card verification | Each charge |
| ACH | Micro-deposits | Initial setup |
| SEPA | IBAN validation | Initial setup |
| Wallet | Token refresh | Automatic |

### 6. Method Availability by Tier

| Tier | Card | ACH/SEPA | Wire | Wallet |
|------|------|----------|------|--------|
| Free | Yes | No | No | Yes |
| Pro | Yes | Yes | No | Yes |
| Enterprise | Yes | Yes | Yes | Yes |

**Verify current best practices with web search:**
Search the web: "payment method configuration SaaS best practices {date}"
Search the web: "ACH SEPA payment integration patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the payment method configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into payment methods using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for method analysis
- **C (Continue)**: Accept payment method configuration and proceed to transaction processing
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass method context: configurations, validation rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into method summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review payment method configuration for payment processing: {summary of methods and tiers}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save payment method configuration to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-transaction-processing.md`

---

## Verification

- [ ] Card networks configured with 3D Secure requirements
- [ ] Bank transfer methods configured by region
- [ ] Digital wallets integrated
- [ ] Payment method storage follows PCI requirements
- [ ] Validation rules defined for each method
- [ ] Tier-based availability specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Payment method configuration specification
- Validation rules documentation
- Tier availability matrix

---

## Next Step

Proceed to `step-03-c-design-transaction-processing.md` to design transaction handling.
