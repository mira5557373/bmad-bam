# Step 21: Validate API Throttling Design

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

This step validates the completeness and quality of the API throttling design, ensuring proper traffic analysis, throttling rules, tier quotas, burst handling, and monitoring configuration.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `quota-management`

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

### Traffic Patterns
- [ ] Endpoint categories identified
- [ ] Traffic patterns mapped by tier
- [ ] Burst characteristics defined
- [ ] Baseline request rates documented
- [ ] No placeholder data remaining

### Throttling Rules
- [ ] Algorithm selected for each category
- [ ] Throttling rules matrix complete
- [ ] Per-endpoint limits defined
- [ ] Response headers specified
- [ ] Algorithms appropriate for use cases

### Tier Quotas
- [ ] All tiers have quota allocations
- [ ] Burst allowances defined per tier
- [ ] Enforcement strategy documented
- [ ] Overage handling specified
- [ ] Free tier has reasonable limits

### Burst Handling
- [ ] Burst detection algorithms defined
- [ ] Graceful degradation levels configured
- [ ] Client notification strategy complete
- [ ] Queue-based buffering considered
- [ ] Recovery procedures documented

### Monitoring
- [ ] Alert thresholds defined
- [ ] Escalation paths specified
- [ ] Metrics identified for tracking
- [ ] Dashboard requirements documented
- [ ] On-call procedures referenced

### Cross-Cutting
- [ ] Consistent with tenant model
- [ ] Aligned with quota-management patterns
- [ ] Audit logging for throttling events
- [ ] Patterns align with pattern registry
- [ ] QG-M2 tenant isolation considered

---

## Gate Decision

- **PASS**: All categories complete, all rules documented, quotas defined, burst handling ready
- **CONDITIONAL**: Minor gaps (e.g., specific metrics TBD) - document gaps and proceed
- **FAIL**: Missing algorithm selection, undefined tier quotas, or incomplete burst handling - return to Create mode

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
- Context: "Review throttling validation: {summary of findings and gate decision}"
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

- Validated API throttling design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Throttling design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing rules, quotas, or procedures.
