# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the runbook validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifacts loaded successfully
- Step 21 completed: Runbook validation performed

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per runbook
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Runbook Collection Completeness | | Index, ownership, review cadence |
| Incident Response Runbook | | Classification, procedures, escalation |
| AI Operations Runbook | | Deployment, rollback, kill switch |
| Routine Operations | | Maintenance, scaling, backup |
| Contact Information | | Escalation matrix, current contacts |
| Accessibility | | On-call access, backup access |
| Testing | | Dry-run results, known gaps |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing critical runbook, untested critical procedure, runbooks inaccessible | Must fix before proceeding |
| WARNING | Missing non-critical runbook, outdated contacts | Should address |
| INFO | Suggestions for additional procedures or improvements | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All critical runbooks documented, procedures tested, runbooks accessible, review cadence established |
| **CONDITIONAL** | Minor gaps (e.g., non-critical procedures untested) - document gaps and proceed |
| **NEEDS REVISION** | Missing critical runbook, untested critical procedure, or runbooks inaccessible |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category
- QG-OC gate status
- Critical failure remediation path (if FAIL)
- Recovery attempt count
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
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Runbooks validated, QG-OC satisfied. Proceed to production readiness.
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address critical gaps.

---

## Recovery Protocol

If FAIL persists after 2 attempts:
- Escalate to mandatory course correction
- Contact Platform Architect for runbook structure issues
- Contact DevOps Lead for accessibility issues

---

## Workflow Complete

Validation mode complete for runbook-creation workflow.
