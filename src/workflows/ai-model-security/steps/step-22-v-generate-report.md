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

Generate the final validation report for AI model security against QG-S4 quality gate.

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
# AI Model Security Validation Report

**Date:** {{date}}
**Artifact:** model-security.md
**Quality Gate:** QG-S4 (AI Security)

## Executive Summary

Gate Decision: [PASS | CONDITIONAL | FAIL]

## Validation Results

### Model Security
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Model Provenance
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Access Control
- Status: [PASS/FAIL]
- Critical Items: N passed / N total
- Findings: [list]

### Audit Logging
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
- **P (Party Mode)**: Bring CISO, Compliance Officer, and Project Lead perspectives
- **C (Continue)**: Accept report and complete validation workflow
- **Revise findings**: Describe corrections to the report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report findings, remediation priorities, timeline
- Process enhanced insights
- Ask user: "Accept these prioritized recommendations? (y/n)"
- If yes, integrate into report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI model security validation report for executive review"
- Process CISO, Compliance Officer, Project Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

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

- `{output_folder}/planning-artifacts/security/model-security-validation-report.md`
- Gate decision (PASS/CONDITIONAL/FAIL)

## Validate Mode Complete

AI model security validation complete. If FAIL, address remediation items and re-validate.
