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

Generate a comprehensive validation report summarizing findings from the module validation meta-check and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Module validation meta-validation performed

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
| Report Completeness | | Date, validator, module name, all 3 gates have results |
| Gate Result Consistency | | QG-M1/M2/M3 results match supporting findings |
| Findings Quality | | Issues specific, actionable, severity classified |
| Staleness Check | | Validation recent, architecture unchanged |
| Architecture Alignment | | Domain model, facades, dependencies verified |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Report incomplete or inconsistent, architecture changed since validation | Must re-validate |
| WARNING | Report valid but may be stale, recommend re-validation | Should verify currency |
| INFO | Minor documentation improvements to findings quality | Consider for completeness |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **VALID** | Report is complete, consistent, and current |
| **STALE** | Report valid but architecture may have changed - recommend re-validation |
| **INVALID** | Report incomplete or inconsistent - require full re-validation |

### 4. Generate Report

Create validation report summarizing:
- Meta-validation outcome (VALID/STALE/INVALID)
- Report completeness assessment
- Gate result consistency check
- Staleness evaluation
- Original gate decisions (QG-M1, QG-M2, QG-M3)
- Recommended next steps

---

## COLLABORATION MENUS (A/P/C):

After generating report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections or recommendations
- **P (Party Mode)**: Bring QA lead and architect perspectives on final report
- **C (Continue)**: Accept generated report and complete validation workflow
- **[Specific refinements]**: Describe specific sections to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: meta-validation outcome, findings, recommendations
- Process enhanced insights on report quality
- Ask user: "Accept this detailed report analysis? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review final meta-validation report"
- Process QA lead and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validation mode complete

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Meta-validation status determined
- [ ] Completion status determined
- [ ] Report generated with meta-validation summary
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/dev-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/gate-status-dashboard-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/gate-validation-report-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{module-name}-validation-meta-report.md`

---

## Next Step

Based on completion status:
- **VALID:** Validation report accepted. Proceed based on original gate decision (QG-M1/M2/M3).
- **STALE:** Architecture may have changed since validation. Recommend re-running full validation workflow in Create mode.
- **INVALID:** Report incomplete or inconsistent. Require full re-validation via Create mode.

## Workflow Complete

Validation mode complete for module validation workflow. Meta-validation decision recorded.
