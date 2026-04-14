# Step 21: Validate Tenant Suspension Design

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

This step validates the completeness and quality of the tenant suspension design, ensuring proper state machine, triggers, grace periods, access revocation, and notifications.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
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

### State Machine
- [ ] All states defined with clear descriptions
- [ ] All transitions documented with triggers
- [ ] Side effects specified for each transition
- [ ] State persistence strategy defined
- [ ] No orphan states (unreachable)
- [ ] Terminal states identified (ARCHIVED)

### Suspension Triggers
- [ ] All trigger types defined
- [ ] Detection mechanisms specified for each trigger
- [ ] Grace periods documented per trigger
- [ ] Auto-suspend rules clear
- [ ] Severity levels defined (if applicable)

### Grace Periods
- [ ] Grace period duration defined per trigger
- [ ] Warning notification schedule specified
- [ ] Feature degradation levels defined
- [ ] Payment retry logic documented (billing)
- [ ] Appeal process defined (policy violations)

### Access Revocation
- [ ] API access revocation procedure defined
- [ ] UI access revocation procedure defined
- [ ] Background service revocation defined
- [ ] Data access revocation defined
- [ ] Revocation order specified
- [ ] Verification checklist present

### Notification Sequences
- [ ] Pre-suspension notifications defined
- [ ] Suspension notifications defined
- [ ] Reactivation notifications defined
- [ ] Archive notifications defined
- [ ] Notification templates specified
- [ ] Delivery configuration complete

### Cross-Cutting
- [ ] Consistent with tenant lifecycle states
- [ ] Consistent with onboarding/offboarding designs
- [ ] Audit logging for all state transitions
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All states defined, all triggers documented, revocation complete, notifications ready
- **CONDITIONAL**: Minor gaps (e.g., specific template content TBD) - document gaps and proceed
- **FAIL**: Missing states, undefined triggers, or incomplete revocation - return to Create mode

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
- Context: "Review suspension validation: {summary of findings and gate decision}"
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

- Validated tenant suspension design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Suspension design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing states, triggers, or procedures.
