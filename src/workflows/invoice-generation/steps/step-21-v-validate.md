# Step 21: Validate Invoice Generation Design

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

This step validates the completeness and quality of the invoice generation design, ensuring accurate invoicing, proper tenant isolation, and reliable delivery.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

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

## Verification

### Invoice Schema
- [ ] Invoice header fields defined (id, number, tenant, dates)
- [ ] Line item structure complete (description, quantity, price, amount)
- [ ] Tax calculation fields present (subtotal, rate, amount, total)
- [ ] Metadata fields defined (tenant info, payment terms)
- [ ] Lifecycle states with valid transitions
- [ ] Currency and localization support

### Usage Aggregation
- [ ] Usage data sources identified
- [ ] Billing period boundaries configured
- [ ] Usage-to-line-item mapping complete
- [ ] Proration rules defined for all scenarios
- [ ] Credit application order specified
- [ ] Adjustment handling with approval workflow

### Scheduling
- [ ] Billing cycles configured (monthly, quarterly, annual)
- [ ] Generation schedule with phase timing
- [ ] Retry logic for all failure types
- [ ] Manual triggers with authorization
- [ ] Error handling prevents data corruption
- [ ] Concurrency controls defined

### PDF Generation
- [ ] Template structure covers all sections
- [ ] Rendering engine selected
- [ ] Multi-language support configured
- [ ] Storage strategy meets retention
- [ ] Quality assurance checks defined
- [ ] Performance optimizations specified

### Cross-Cutting
- [ ] Consistent with usage metering design
- [ ] Tenant isolation in all invoice data
- [ ] No cross-tenant data leakage possible
- [ ] Regulatory compliance for invoice retention
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: Invoice schema complete, aggregation configured, PDF pipeline ready
- **CONDITIONAL**: Minor gaps (e.g., specific template designs pending) - document gaps and proceed
- **FAIL**: Missing schema fields, undefined aggregation, or no PDF pipeline - return to Create mode

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
- Context: "Review validation findings for invoice generation: {summary of gate decision}"
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

- Validated invoice generation design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Invoice generation design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing schema, aggregation, or PDF pipeline issues.
