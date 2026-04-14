# Step 21: Validate Billing Disputes Design

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Validate the completeness and quality of the billing disputes design.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-disputes
---

## Verification

### Dispute Types
- [ ] Dispute categories defined
- [ ] Dispute attributes specified
- [ ] Dispute states with transitions
- [ ] Priority matrix configured

### Investigation Workflow
- [ ] Evidence collection configured
- [ ] Timeline reconstruction designed
- [ ] Root cause analysis paths defined
- [ ] Documentation requirements specified

### Resolution Paths
- [ ] Resolution options defined
- [ ] Chargeback defense configured
- [ ] Resolution workflow designed
- [ ] Post-resolution actions specified

### Cross-Cutting
- [ ] Tenant isolation in disputes
- [ ] Audit trail complete
- [ ] SLAs defined for all types
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All dispute configurations complete
- **CONDITIONAL**: Minor gaps in policies
- **FAIL**: Missing dispute types or investigation workflow

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Actions

1. Load the relevant documents
2. Apply modifications as specified
3. Generate summary of changes

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept validation and proceed to report

Select an option:
```

---

## Next Step

Proceed to `step-22-v-generate-report.md`.
