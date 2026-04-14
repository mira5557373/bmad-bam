# Step 21: Validate Refund Processing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Validate the completeness and quality of the refund processing design.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: refund-processing
---

## Verification

### Refund Types
- [ ] Refund categories defined
- [ ] Refund attributes specified
- [ ] Refund policies documented
- [ ] Refund states with transitions

### Approval Workflow
- [ ] Auto-approval thresholds defined
- [ ] Manual approval triggers configured
- [ ] Escalation paths designed
- [ ] Fraud prevention checks specified

### Gateway Integration
- [ ] Refund API integration configured
- [ ] Partial refund handling specified
- [ ] Cross-border refunds addressed
- [ ] Failed refund recovery designed

### Cross-Cutting
- [ ] Tenant isolation in refunds
- [ ] Audit trail complete
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All refund configurations complete
- **CONDITIONAL**: Minor gaps in policies
- **FAIL**: Missing refund types or approval workflow

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
