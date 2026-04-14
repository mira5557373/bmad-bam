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

Generate a comprehensive validation report summarizing findings from the post-deployment verification validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Post-deployment verification validation performed

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
| Smoke Test Coverage | | All critical paths tested |
| Monitoring Activation | | Metrics, dashboards, alerts verified |
| Tenant Health | | Per-tenant status checked |
| Rollback Readiness | | Procedure and timeline confirmed |
| QG-PD1 Compliance | | All required patterns verified |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Smoke tests failing, monitoring down, tenants unhealthy | Must fix before production traffic |
| WARNING | Alert testing incomplete, documentation gaps | Should address soon |
| INFO | Additional verification suggestions | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All required QG-PD1 patterns verified, deployment confirmed |
| **CONDITIONAL** | Minor gaps documented, deployment can proceed with monitoring |
| **NEEDS REVISION** | Critical verification failing - deployment not ready |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Smoke Tests, Monitoring, Tenant Health, Rollback)
- Critical failure remediation path (if FAIL)
- QG-PD1 pattern status
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring DevOps and SRE perspectives for final review
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
- Context: "Review validation report: {summary of outcome and recommendations}"
- Process collaborative analysis from DevOps and SRE personas
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
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Deployment verified, proceed to production traffic enablement
- **CONDITIONAL:** Document gaps and proceed with enhanced monitoring
- **NEEDS REVISION:** Address critical issues before proceeding

---

## Recovery Protocol

If FAIL persists after 2 attempts:
- Escalate to release management
- Consider rollback if timeline critical
- Contact SRE for infrastructure issues

---

## Workflow Complete

Validation mode complete for post-deployment-verification workflow.
