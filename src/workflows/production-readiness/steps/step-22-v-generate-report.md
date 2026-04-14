# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the production readiness validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifacts loaded successfully
- Step 21 completed: Production readiness validation performed

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Gate Verification | | All prerequisite gates passed |
| Infrastructure Readiness | | Capacity, HA, scaling verified |
| Observability Validation | | Monitoring, alerting, logging complete |
| Disaster Recovery | | RTO/RPO met, backups tested |
| Operational Readiness | | Runbooks, on-call, procedures complete |
| Risk Assessment | | All risks documented with mitigations |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Gate failed, infrastructure unverified, DR not tested | Must fix before go-live |
| HIGH | Observability gaps, incomplete runbooks | Should address before go-live |
| MEDIUM | Non-critical risk mitigations incomplete | Address within 30 days of launch |
| LOW | Documentation improvements | Consider for future iterations |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All QG-OC patterns satisfied, all required items verified |
| **CONDITIONAL** | Minor gaps with documented mitigation plans and deadlines |
| **NEEDS REVISION** | Any critical item missing or QG-OC critical patterns failing |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Gates, Infrastructure, Observability, DR, Operations, Risk)
- QG-OC gate status
- Critical failure remediation path (if FAIL)
- Locked categories from previous attempts (if applicable)
- Recovery attempt count
- Go-live recommendation
- Next steps

### 5. Update Go-Live Checklist

If validation outcome is PASS or CONDITIONAL:
- Update go-live checklist with validation results
- Add any new items identified during validation
- Confirm all items have owners and deadlines

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Finalize report and complete validation workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: validation outcome, findings, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review production readiness validation report: {summary of outcome and recommendations}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Complete validation workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Go-live checklist updated if applicable

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Updated go-live checklist (if PASS or CONDITIONAL)
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Production readiness validated, proceed to go-live with launch checklist.
- **CONDITIONAL:** Document gaps and proceed with noted limitations and mitigation deadlines.
- **NEEDS REVISION:** Return to Create mode to address critical gaps. For gate failures, run appropriate gate verification workflows first.

---

## Recovery Protocol

If FAIL persists after 2 attempts:
- Escalate to mandatory course correction
- Contact Platform Architect for infrastructure or DR issues
- Contact Security Architect for gate or compliance issues
- Contact Project Leadership for go/no-go decision

---

## Workflow Complete

Validation mode complete for production-readiness workflow.

Upon successful validation:
- QG-OC (Operational Checklist Gate) is satisfied
- Platform is approved for production deployment
- Go-live may proceed according to launch checklist
