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

Generate a validation report summarizing findings from the BAM section validation.

---

## Prerequisites

- Step 21 completed: Validation performed
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

| Category | Status | Notes |
|----------|--------|-------|
| Section Structure | | |
| Configuration Validity | | |
| Pattern References | | |

### 2. Assign Severity to Findings

| Severity | Description |
|----------|-------------|
| CRITICAL | Blocks BAM usage |
| WARNING | Should address |
| INFO | Enhancement opportunity |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All validations pass |
| **CONDITIONAL** | Minor issues documented |
| **NEEDS REVISION** | Critical issues found |

### 4. Generate Report

Create validation report with findings and next steps.

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring perspectives on remediation approach
- **C (Continue)**: Accept report and complete validation
- **[Specific concerns]**: Describe concerns about report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, completion status
- Process enhanced insights on remediation
- Ask user: "Accept this approach? (y/n)"
- If yes, finalize next steps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM section validation report"
- Process architect and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Complete validation workflow

---

## Verification

- [ ] Findings compiled
- [ ] Severity assigned
- [ ] Status determined
- [ ] Report generated

---

## Outputs

- BAM Section Validation Report
- **Output to:** `{output_folder}/planning-artifacts/bam-section-validation-report.md`

---

## Next Step

Validate workflow complete. Proceed based on validation findings.

---

## Workflow Complete

Validation mode complete for bam-extend-project-context workflow.
