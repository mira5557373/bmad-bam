# Step 21: Validate Billing Integration

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

---

## Purpose

This step validates the completeness and quality of the billing integration design, ensuring accurate pricing models, proper tenant isolation in billing data, reliable payment processing, and compliant reconciliation processes.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Verification

### Billing Requirements
- [ ] Payment provider selected and documented
- [ ] Supported payment methods defined per tier
- [ ] Currency support configured
- [ ] Compliance requirements documented (PCI-DSS, SOC2, GDPR)
- [ ] Tax handling strategy defined
- [ ] Billing cycle configuration complete
- [ ] Billing address requirements specified

### Pricing Models
- [ ] All tiers have defined pricing (Free, Pro, Enterprise)
- [ ] Overage pricing specified for paid tiers
- [ ] Add-on pricing documented
- [ ] Discount structures defined (annual, volume, promotional)
- [ ] Price versioning strategy established
- [ ] Pricing display rules configured

### Usage Tracking Integration
- [ ] Billable metrics mapped to usage events
- [ ] Collection points identified
- [ ] Usage event schema defined
- [ ] Quota integration configured
- [ ] Aggregation schedule established
- [ ] Late usage handling defined

### Invoice Generation
- [ ] Invoice structure defined
- [ ] Line item types specified
- [ ] Generation triggers configured
- [ ] Tax calculation integrated
- [ ] Invoice numbering established
- [ ] Delivery channels configured
- [ ] PDF generation requirements documented

### Payment Processing
- [ ] Payment methods configured
- [ ] Collection rules defined per tier
- [ ] Retry logic established
- [ ] Dunning workflow complete
- [ ] Webhook handlers defined
- [ ] Refund processing documented
- [ ] PCI compliance addressed
- [ ] Fraud prevention configured

### Subscription Management
- [ ] Subscription states defined
- [ ] Data model specified
- [ ] CRUD operations documented
- [ ] Trial management configured
- [ ] Pause/cancel flows complete
- [ ] Provider sync established

### Tier Upgrades/Downgrades
- [ ] Tier change matrix defined
- [ ] Upgrade flow documented
- [ ] Downgrade flow documented
- [ ] Proration strategies specified
- [ ] Feature provisioning rules set
- [ ] Edge cases addressed

### Billing Notifications
- [ ] Notification events defined
- [ ] Channels configured
- [ ] Email templates specified
- [ ] Preferences documented
- [ ] Reminder schedules set
- [ ] Delivery rules established

### Reconciliation
- [ ] Reconciliation types defined
- [ ] Usage-to-billing reconciliation configured
- [ ] Billing-to-payment reconciliation configured
- [ ] Subscription status sync established
- [ ] Revenue reconciliation documented
- [ ] Discrepancy handling process complete
- [ ] Audit trail configured

### Cross-Cutting
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with usage metering design (if exists)
- [ ] Tenant isolation maintained in all billing data
- [ ] No cross-tenant billing leakage possible
- [ ] Regulatory compliance for billing records (retention)
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All billing components defined, payment processing complete, reconciliation documented
- **CONDITIONAL**: Minor gaps (e.g., specific notification templates, exact retry timings) - document gaps and proceed
- **FAIL**: Missing pricing models, undefined payment processing, or no reconciliation - return to Create mode

Present validation results with specific findings for each section.

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
- Context: "Review validation findings for billing integration: {summary of gate decision}"
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

- Validated billing integration design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Billing integration design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing pricing models, payment processing gaps, or reconciliation issues.
