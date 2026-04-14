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

Generate a comprehensive validation report summarizing findings from the tenant data migration validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Migration plan loaded successfully
- Step 21 completed: Migration plan validation performed

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
| Migration Scope | | Source tenant identified, data volume estimated |
| Strategy Selection | | Strategy justified, alternatives considered |
| Phase Definition | | All phases ordered, dependencies explicit |
| Execution Procedures | | Step-by-step commands, verification steps |
| Data Integrity | | Checksums, record counts, referential integrity |
| Rollback Procedures | | Every phase has rollback, decision criteria defined |
| Communication Plan | | Stakeholders identified, escalation path documented |
| Operational Readiness | | Monitoring, alerts, on-call schedule |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing phase definitions, undefined rollback, no data integrity verification | Must fix before proceeding |
| WARNING | Specific timing values (30min pre-check, 2-4hr transfer, 1hr validation, 30min cutover), minor documentation gaps | Should address |
| INFO | Optimization suggestions, additional monitoring recommendations | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All phases have procedures and rollback, data integrity checks defined, communication plan complete, emergency contacts listed |
| **CONDITIONAL** | PASS criteria met but some non-critical timing/details pending (typical: 30min pre-check, 2-4hr transfer, 1hr validation) - document gaps with remediation deadline |
| **NEEDS REVISION** | Missing phases, undefined rollback, or incomplete procedures |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Scope, Strategy, Phases, Execution, Integrity, Rollback, Communication, Operations)
- Gap analysis with remediation deadlines (if CONDITIONAL)
- Required fixes list (if FAIL)
- Sign-off recommendation
- Next steps for migration scheduling

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
- Gap analysis (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Migration plan approved, schedule migration window.
- **CONDITIONAL:** Document gaps, obtain approval with limitations, schedule with caution.
- **NEEDS REVISION:** Return to Edit mode to address gaps before scheduling.

---

## Workflow Complete

Validation mode complete for tenant-data-migration workflow.
