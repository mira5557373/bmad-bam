# Step 21: Validate Payment Processing Design

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

---

## Purpose

This step validates the completeness and quality of the payment processing design, ensuring secure payment handling, proper tenant isolation, and reliable transaction processing.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: payment-processing
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

---

## Actions

### 1. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 2. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Verification

### Gateway Configuration
- [ ] Gateway selected with documented rationale
- [ ] Feature requirements mapped
- [ ] Regional availability assessed
- [ ] Integration architecture defined
- [ ] PCI compliance approach selected

### Payment Methods
- [ ] Card networks configured with 3D Secure
- [ ] Bank transfer methods by region
- [ ] Digital wallets integrated
- [ ] Payment method storage follows PCI
- [ ] Validation rules defined
- [ ] Tier availability specified

### Transaction Processing
- [ ] Authorization flow handles all scenarios
- [ ] Capture strategies match billing model
- [ ] Subscription scheduling defined
- [ ] Retry logic covers all failure types
- [ ] Idempotency prevents duplicate charges
- [ ] Currency handling specified

### Webhook Integration
- [ ] Critical events subscribed
- [ ] Webhook security with signature verification
- [ ] Event processing architecture documented
- [ ] Failure handling prevents data loss
- [ ] Event deduplication configured
- [ ] Monitoring and alerting defined

### Cross-Cutting
- [ ] Tenant isolation in payment data
- [ ] No cross-tenant payment leakage
- [ ] PCI compliance maintained
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: Gateway integrated, methods configured, webhooks handling events
- **CONDITIONAL**: Minor gaps (e.g., specific regional methods pending) - document gaps and proceed
- **FAIL**: Missing gateway integration, undefined transaction flow, or no webhook handling - return to Create mode

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation findings for payment processing: {summary of gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated payment processing design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
