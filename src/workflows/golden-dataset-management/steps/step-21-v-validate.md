# Step 21: Validate

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

Validate the golden dataset management document against QG-M3 (Agent Runtime) quality gate criteria.

## Prerequisites

- Artifact loaded (Step 20)
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklist
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### QG-M3 Agent Runtime Validation (Evaluation Foundation)

Validate against Evaluation Foundation criteria from `qg-m3-agent-runtime.md`:

**Dataset Schema Checks:**
- [ ] Input format specification defined
- [ ] Output format specification defined
- [ ] Metadata requirements documented
- [ ] Annotation schema established
- [ ] Tenant context fields included

**Curation Workflow Checks:**
- [ ] Data collection methods defined
- [ ] Quality review procedures documented
- [ ] Annotation guidelines established
- [ ] Tenant contribution handling specified

**Version Control Checks:**
- [ ] Versioning strategy defined
- [ ] Change tracking documented
- [ ] Rollback capabilities specified
- [ ] Lineage documentation established

**Test Case Management Checks:**
- [ ] Test case categorization defined
- [ ] Coverage tracking documented
- [ ] Regression suite management established
- [ ] Tenant-specific test handling specified

### Coverage Validation

Validate golden dataset coverage:
- [ ] All agent types have test cases
- [ ] Happy path coverage >= 40%
- [ ] Edge case coverage >= 25%
- [ ] Adversarial coverage >= 20%
- [ ] Tenant tier coverage = 100%

### Findings Summary

| Category | Status | Critical Issues | Non-Critical Issues |
|----------|--------|-----------------|---------------------|
| Dataset Schema | PASS/FAIL | N | N |
| Curation Workflow | PASS/FAIL | N | N |
| Version Control | PASS/FAIL | N | N |
| Test Case Management | PASS/FAIL | N | N |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and remediation options
- **P (Party Mode)**: Bring MLOps Engineer, QA Lead, and Release Manager perspectives
- **C (Continue)**: Accept validation results and proceed to Step 22: Generate Report
- **Re-validate section**: Describe specific section to re-validate

Select an option:
```

#### If 'C' (Continue):
- Save validation results to session
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All QG-M3 evaluation foundation checks validated
- [ ] Coverage requirements validated
- [ ] Findings categorized by severity
- [ ] Patterns align with pattern registry

## Outputs

- Validation results per category
- List of findings with severity

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
