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

Generate a comprehensive validation report summarizing findings from the facade mismatch recovery validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Mismatch recovery validation performed

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
| Detection Phase | PASS / FAIL | Mismatch identified, classified, evidence documented |
| Analysis Phase | PASS / FAIL | Contract vs implementation diff, root cause determined |
| Resolution Strategy | PASS / FAIL | Option selected, alternatives documented, success criteria |
| Implementation | PASS / FAIL | Aligns with strategy, rollback procedure defined |
| Verification | PASS / FAIL | Contract compliance, consumer tests, tenant isolation |
| Prevention | PASS / FAIL | Root cause addressed, process improvements identified |
| Cross-Cutting | PASS / FAIL | Timeline realistic, communication completed |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Verification failing, root cause not addressed, or critical consumers still affected | Must continue recovery |
| WARNING | Recovery complete but minor documentation gaps or lessons learned incomplete | Should document before closing |
| INFO | Optional improvements to monitoring or tooling gaps | Consider for prevention |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All phases complete, verification passed, prevention measures in place |
| **NEEDS REVISION** | Verification failing, root cause not addressed, or consumers still affected |

### 4. Generate Report

Create validation report summarizing:
- Mismatch recovery validation outcome
- Detection and classification summary
- Root cause analysis findings
- Resolution strategy effectiveness
- Verification test results
- Prevention measures implemented
- Lessons learned documentation status

---

## COLLABORATION MENUS (A/P/C):

After generating the validation report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections or findings
- **P (Party Mode)**: Bring QA and integration architect perspectives on report completeness
- **C (Continue)**: Accept validation report and complete workflow
- **[Specific refinements]**: Describe report adjustments needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, severity assignments, completion status
- Process enhanced insights on report accuracy and completeness
- Ask user: "Accept this report review? (y/n)"
- If yes, integrate any adjustments
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch recovery validation report for accuracy and completeness"
- Process QA and integration architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Write validation report to output location
- Complete Validate mode workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with recovery summary
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/facade-recovery-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{module-name}-mismatch-recovery-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Document lessons learned, close recovery ticket, and update runbook.
- **NEEDS REVISION:** Return to Edit mode to continue recovery process and address verification failures.

---

## Workflow Complete

Validation mode complete for facade mismatch recovery workflow.
