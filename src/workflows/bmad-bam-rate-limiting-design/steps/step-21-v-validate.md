# Step 21: Validate Rate Limiting Design

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

This step validates the completeness and quality of the rate limiting design, ensuring proper algorithm selection, tier configuration, enforcement mechanisms, and monitoring integration.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
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

---

## Verification

### Rate Limiting Algorithm
- [ ] Algorithm type selected (token bucket, sliding window, fixed window, adaptive)
- [ ] Algorithm rationale documented
- [ ] Rate limit scope defined (global, per-endpoint, per-operation)
- [ ] Distributed strategy specified
- [ ] Burst handling approach documented

### Tier Limits
- [ ] All tiers defined with rate limits
- [ ] Requests per second/minute specified
- [ ] Burst size configured per tier
- [ ] Daily quotas documented
- [ ] Concurrent request limits defined
- [ ] Per-endpoint multipliers specified

### Enforcement Mechanisms
- [ ] API gateway enforcement defined
- [ ] Distributed architecture documented
- [ ] Response headers specified (X-RateLimit-*)
- [ ] 429 response structure designed
- [ ] Graceful degradation thresholds defined
- [ ] Bypass mechanisms documented
- [ ] Circuit breaker integration specified

### Monitoring Configuration
- [ ] Rate limit metrics defined
- [ ] Quota tracking metrics specified
- [ ] Alerting rules documented
- [ ] Operator dashboard designed
- [ ] Tenant dashboard designed
- [ ] Abuse detection patterns defined

### Cross-Cutting
- [ ] Consistent with tenant model
- [ ] Consistent with billing/metering design
- [ ] Audit logging for rate limit events
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: Algorithm selected, tiers configured, enforcement complete, monitoring ready
- **CONDITIONAL**: Minor gaps (e.g., specific threshold values TBD) - document gaps and proceed
- **FAIL**: Missing algorithm, undefined tiers, or incomplete enforcement - return to Create mode

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
- Context: "Review rate limiting validation: {summary of findings and gate decision}"
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

- Validated rate limiting design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Rate limiting design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing algorithm, tiers, or enforcement mechanisms.
