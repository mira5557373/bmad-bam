# Step 21: Validate Tenant Fair Scheduling Design

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

This step validates the completeness and quality of the tenant fair scheduling design, ensuring proper resource analysis, scheduling strategy, quota enforcement, isolation mechanisms, and monitoring.

---

## Prerequisites

- Step 20: Load Configuration completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `scaling`

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

### Resource Analysis
- [ ] All resource types identified (CPU, memory, I/O, network)
- [ ] Consumption patterns documented per tier
- [ ] Noisy neighbor scenarios cataloged
- [ ] Baseline metrics defined with thresholds
- [ ] Peak multipliers specified

### Scheduling Strategy
- [ ] Scheduling algorithms selected with rationale
- [ ] Weight distribution defined per tier
- [ ] Token bucket parameters configured
- [ ] Priority classes established
- [ ] Fairness rules documented
- [ ] Weights sum correctly across tiers

### Quota Enforcement
- [ ] Quota types defined (hard, soft, burst, reserved)
- [ ] Limits configured per tier
- [ ] Enforcement actions specified
- [ ] Tracking mechanisms designed
- [ ] Management API documented
- [ ] Quota inheritance rules defined

### Isolation Mechanisms
- [ ] cgroups configuration documented
- [ ] Kubernetes resource limits defined
- [ ] Namespace isolation configured
- [ ] Network policies specified
- [ ] Storage isolation mechanisms defined
- [ ] Runtime security controls documented

### Monitoring & Alerts
- [ ] Detection metrics defined
- [ ] Alert rules configured with thresholds
- [ ] Detection algorithms documented
- [ ] Monitoring dashboards designed
- [ ] Automated remediation defined
- [ ] Incident response procedures documented

### Cross-Cutting
- [ ] Consistent with tenant model isolation
- [ ] Consistent with rate limiting design
- [ ] Audit logging for resource violations
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All resources analyzed, scheduling complete, quotas defined, isolation configured, monitoring ready
- **CONDITIONAL**: Minor gaps (e.g., specific dashboard content TBD) - document gaps and proceed
- **FAIL**: Missing resource analysis, undefined scheduling, or incomplete isolation - return to Create mode

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
- Context: "Review fair scheduling validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-report.md`

---

## Outputs

- Validated tenant fair scheduling design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Fair scheduling design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing resources, scheduling, or isolation mechanisms.
