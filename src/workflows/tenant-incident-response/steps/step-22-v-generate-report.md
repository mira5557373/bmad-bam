# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the incident response validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Incident response artifact loaded successfully
- Step 21 completed: Validation performed against quality criteria
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Severity Levels | | Levels, impact matrix, SLAs |
| Isolation Protocol | | Mechanisms, quarantine, verification |
| Communication Plan | | Channels, templates, escalation |
| Recovery Procedures | | Phases, data recovery, re-enablement |
| Playbooks | | Coverage, ownership, testing |
| Cross-Cutting | | Architecture alignment, isolation |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks safe incident handling | Must fix before production |
| WARNING | Non-critical gap | Should address before launch |
| INFO | Improvement opportunity | Consider for future iterations |

**Critical Failure Examples:**
- Missing tenant isolation protocol
- No AI agent incident playbook
- No cross-tenant breach procedure
- Missing data recovery procedures
- No tenant re-enablement protocol

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All components defined, critical checks pass, playbooks tested |
| **CONDITIONAL** | Minor gaps with documented mitigation plan |
| **NEEDS REVISION** | Missing critical components, return to Edit mode |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by component category
- Required actions for each critical/warning item
- Next steps based on outcome

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation approach
- **P (Party Mode)**: Bring PM and SRE perspectives on next steps
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, gate decision, remediation plan
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation approach? (y/n)"
- If yes, finalize remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident response validation report and recommend next steps"
- Process PM and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow
- Provide gate decision guidance

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with actionable recommendations

---

## Outputs

- Incident Response Validation Report
- Component-level findings summary
- Gate decision documentation
- **Output to:** `{output_folder}/planning-artifacts/operations/incident-response-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Incident response plan is ready for production.
- **CONDITIONAL:** Document gaps with deadline and proceed with mitigation plan.
- **NEEDS REVISION:** Return to Edit mode (`step-10-e-load-existing.md`) to address findings.

---

## Workflow Complete

Validation mode complete for tenant-incident-response workflow.
