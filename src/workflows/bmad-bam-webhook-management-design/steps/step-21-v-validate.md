# Step 21: Validate Webhook Management Design

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

This step validates the completeness and quality of the webhook management design, ensuring proper event definitions, delivery architecture, retry logic, and security measures.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`



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

### Event Catalog
- [ ] All event categories defined
- [ ] Event naming convention established
- [ ] Payload schema standardized
- [ ] Core events documented with payloads
- [ ] No orphan events (events without handlers)
- [ ] Event versioning strategy defined

### Delivery System
- [ ] Delivery architecture defined
- [ ] Tenant configuration model complete
- [ ] Delivery flow documented
- [ ] At-least-once guarantee specified
- [ ] Queue technology selected
- [ ] Endpoint health tracking defined

### Retry Logic
- [ ] Retry strategy defined with backoff
- [ ] Failure classification complete
- [ ] Dead letter queue designed
- [ ] Manual retry operations specified
- [ ] Circuit breaker configured
- [ ] Tier-based retry limits defined

### Security Measures
- [ ] HMAC signature scheme defined
- [ ] Timestamp verification configured
- [ ] Secret management documented
- [ ] Secret rotation procedure complete
- [ ] IP allowlisting designed (enterprise)
- [ ] TLS requirements specified

### Cross-Cutting
- [ ] Consistent with event-driven patterns
- [ ] Tenant isolation maintained
- [ ] Tier-based feature matrix complete
- [ ] Audit logging for deliveries
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All events defined, delivery complete, retry configured, security ready
- **CONDITIONAL**: Minor gaps (e.g., specific event payloads TBD) - document gaps and proceed
- **FAIL**: Missing events, undefined delivery, or incomplete security - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review webhook validation: {summary of findings and gate decision}"
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

- Validated webhook management design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Webhook design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing events, delivery, or security.
