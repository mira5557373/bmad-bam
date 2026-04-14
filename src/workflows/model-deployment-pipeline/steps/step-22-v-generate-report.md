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

Generate a comprehensive validation report summarizing findings from the model deployment pipeline validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Deployment pipeline validation performed

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
| Deployment Strategy | | Pattern selection, versioning, infrastructure |
| Tenant Rollout | | Tier sequence, opt-in/out, scheduling |
| Canary Deployment | | Traffic stages, metrics, triggers |
| Model Validation | | Pre-deploy checks, benchmarks, safety |
| Rollback Procedures | | Auto triggers, manual procedures, data consistency |
| A/B Testing | | Framework, assignment, metrics, statistics |
| Monitoring Integration | | Metrics, dashboards, alerts, SLOs |
| Tenant Notifications | | Pre-deploy, progress, rollback, changelog |
| Documentation | | Runbook, release notes, incident response |
| Cross-Cutting | | Architecture consistency, pattern alignment |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing deployment strategy, no rollback, no validation gates | Must fix before proceeding |
| WARNING | Specific timeout values, template details, minor documentation gaps | Should address |
| INFO | UX improvements, additional metrics, enhanced notifications | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All components defined, all procedures documented, monitoring configured, notifications established |
| **CONDITIONAL** | Minor gaps (e.g., specific timeout values, template details) - document gaps and proceed |
| **NEEDS REVISION** | Missing deployment strategy, undefined rollback procedures, incomplete validation gates |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Strategy, Rollout, Canary, Validation, Rollback, A/B, Monitoring, Notifications, Documentation)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)
- Remediation timeline (if applicable)
- Next steps recommendation

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
- Context: "Review validation report: {summary of outcome and recommendations}"
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
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Deployment pipeline complete, ready for implementation sprint planning.
- **CONDITIONAL:** Document gaps with remediation timeline and proceed to implementation with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing deployment strategy, rollback procedures, or validation gates.

---

## Workflow Complete

Validation mode complete for model-deployment-pipeline workflow.
