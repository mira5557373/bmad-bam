# Step 2: Validate Validation Report

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

This step performs meta-validation of the module validation report, ensuring report completeness, gate result consistency, findings quality, and staleness checking against current architecture state.

---

## Prerequisites

- Step 1: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,tenant-isolation
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S1,QG-S2`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s1-module-readiness.md`



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

---

## Verification

### Report Completeness

- [ ] Report date is present
- [ ] Validator identity documented
- [ ] Module name matches target
- [ ] Both quality gates (QG-S1, QG-S2) have results
- [ ] Overall decision is recorded

### Gate Result Consistency

- [ ] QG-S1 result has supporting findings
- [ ] QG-S2 result has supporting findings
- [ ] Overall decision matches gate results
  - PASS only if all required gates pass
  - FAIL if any blocking gate fails
  - CONDITIONAL only with documented gaps

### Findings Quality

- [ ] Blocking issues are specific and actionable
- [ ] Warnings include remediation guidance
- [ ] Recommendations are prioritized
- [ ] No findings without severity classification

### Staleness Check

- [ ] Validation date is within acceptable window (e.g., < 7 days)
- [ ] Module architecture not modified after validation
- [ ] Sprint status consistent with validation result
  - If PASS: status should be 'validated'
  - If FAIL: status should be 'validation-failed'

### Architecture Alignment

- [ ] All domain model elements from architecture are validated
- [ ] All facade methods from architecture are checked
- [ ] All dependencies from architecture are verified
- [ ] AI behaviors (if present) are validated
- [ ] Patterns align with pattern registry

### QG-S1 Module Architecture Readiness Verification

| Pattern | Status | Evidence |
|---------|--------|----------|
| `architecture_complete` | [ ] Pass / [ ] Fail | Module architecture document complete |
| `dependencies_mapped` | [ ] Pass / [ ] Fail | Dependency graph in architecture |
| `facades_defined` | [ ] Pass / [ ] Fail | Facade contract exists |

**QG-S1 Module Architecture Readiness:** [ ] SATISFIED / [ ] NOT SATISFIED

### QG-S2 Module Implementation Readiness Verification

| Pattern | Status | Evidence |
|---------|--------|----------|
| `stories_defined` | [ ] Pass / [ ] Fail | Module epics document exists |
| `acceptance_criteria` | [ ] Pass / [ ] Fail | All stories have Given/When/Then |
| `test_plan` | [ ] Pass / [ ] Fail | Test coverage mapped to stories |

**QG-S2 Module Implementation Readiness:** [ ] SATISFIED / [ ] NOT SATISFIED

## Meta-Validation Results

| Check | Status | Finding |
|-------|--------|---------|
| Report completeness | PASS/FAIL | {detail} |
| Gate consistency | PASS/FAIL | {detail} |
| Findings quality | PASS/FAIL | {detail} |
| Staleness | PASS/FAIL | {detail} |
| Architecture alignment | PASS/FAIL | {detail} |

## Gate Decision

- **VALID**: Report is complete, consistent, and current
- **STALE**: Report valid but architecture may have changed - recommend re-validation
- **INVALID**: Report incomplete or inconsistent - require full re-validation

Present meta-validation results with recommendations for next steps.

---

## COLLABORATION MENUS (A/P/C):

After meta-validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation gaps or inconsistencies
- **P (Party Mode)**: Bring QA lead and architect perspectives on meta-validation findings
- **C (Continue)**: Accept meta-validation results and proceed to generate report
- **[Specific refinements]**: Describe specific areas to re-evaluate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: meta-validation results, consistency findings, staleness data
- Process enhanced insights on report quality
- Ask user: "Accept this detailed meta-validation analysis? (y/n)"
- If yes, integrate into validation findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review meta-validation results for module validation report"
- Process QA lead and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save meta-validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Meta-validated module validation report
- Meta-validation decision (VALID/STALE/INVALID)
- Consistency findings documented
- Recommended next steps

---

## Next Step

If VALID: Validation report accepted, proceed based on original gate decision.
If STALE: Architecture may have changed since validation - recommend re-running full validation workflow.
If INVALID: Report incomplete or inconsistent - require full re-validation via Create mode.
