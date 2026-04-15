# Step 22: Generate Report

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

Generate the final validation report for golden dataset management against QG-M3 quality gate.

## Prerequisites

- Validation completed (Step 21)
- Findings categorized

---

## Inputs

- Validation results from Step 21
- Quality gate criteria
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### Generate Validation Report

**Report Structure:**

```markdown
# Golden Dataset Management Validation Report

**Date:** {{date}}
**Artifact:** golden-dataset.md
**Quality Gate:** QG-M3 (Agent Runtime - Evaluation Foundation)

## Executive Summary

Gate Decision: [PASS | CONDITIONAL | FAIL]

## Validation Results

### Dataset Schema
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Curation Workflow
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Version Control
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Test Case Management
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

## Coverage Summary

| Category | Target | Actual | Status |
|----------|--------|--------|--------|
| Happy Path | 40% | N% | PASS/FAIL |
| Edge Cases | 25% | N% | PASS/FAIL |
| Adversarial | 20% | N% | PASS/FAIL |
| Regression | 15% | N% | PASS/FAIL |

## Remediation Required

[List of items to address before gate can pass]

## Recommendations

[Suggested improvements beyond minimum requirements]
```

### Gate Decision Logic

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL checks pass, coverage targets met |
| **CONDITIONAL** | All CRITICAL checks pass, coverage within 10% of target |
| **FAIL** | Any CRITICAL check fails or coverage significantly below target |

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and prioritize remediation
- **P (Party Mode)**: Bring MLOps Lead, QA Director, and Platform Architect perspectives
- **C (Continue)**: Accept report and complete validation workflow
- **Revise findings**: Describe corrections to the report

Select an option:
```

#### If 'C' (Continue):
- Save validation report to output location
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Present gate decision

---

## Verification

- [ ] Validation report generated
- [ ] Gate decision determined
- [ ] Coverage summary included
- [ ] Remediation items documented (if any)
- [ ] Report saved to output location

## Outputs

- `{output_folder}/planning-artifacts/quality/golden-dataset-validation-report.md`
- Gate decision (PASS/CONDITIONAL/FAIL)

## Validate Mode Complete

Golden dataset management validation complete. If FAIL, address remediation items and re-validate.
