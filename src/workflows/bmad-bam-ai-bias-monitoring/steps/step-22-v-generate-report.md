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

Generate the final validation report for AI bias monitoring against QG-M3 and QG-I3 quality gates.

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
# AI Bias Monitoring Validation Report

**Date:** {{date}}
**Artifact:** bias-monitoring.md
**Quality Gates:** QG-M3 (Agent Runtime), QG-I3 (Agent Safety)

## Executive Summary

Gate Decision: [PASS | CONDITIONAL | FAIL]

## Validation Results

### Bias Taxonomy
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Detection Methods
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Monitoring Dashboards
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Remediation Workflows
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

## Remediation Required

[List of items to address before gate can pass]

## Recommendations

[Suggested improvements beyond minimum requirements]
```

### Gate Decision Logic

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL checks pass |
| **CONDITIONAL** | All CRITICAL checks pass, non-critical gaps have remediation plan |
| **FAIL** | Any CRITICAL check fails |

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and prioritize remediation
- **P (Party Mode)**: Bring AI Ethics Lead, Compliance Officer, and Executive perspectives
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
- [ ] Remediation items documented (if any)
- [ ] Report saved to output location

## Outputs

- `{output_folder}/planning-artifacts/quality/bias-monitoring-validation-report.md`
- Gate decision (PASS/CONDITIONAL/FAIL)

## Validate Mode Complete

AI bias monitoring validation complete. If FAIL, address remediation items and re-validate.
