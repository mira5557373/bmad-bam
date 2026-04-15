# Step 21: Validate Credit Management Design

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Validate the completeness and quality of the credit management design.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: credit-management
---

## Verification

### Credit Types
- [ ] Credit categories defined
- [ ] Credit attributes specified
- [ ] Credit states with transitions
- [ ] Currency handling configured

### Application Rules
- [ ] Application priority defined
- [ ] Partial application configured
- [ ] Application restrictions specified
- [ ] Proration rules documented

### Expiration Handling
- [ ] Expiration policies defined
- [ ] Notification schedule configured
- [ ] Rollover rules specified
- [ ] Forfeiture handling documented

### Cross-Cutting
- [ ] Tenant isolation in credits
- [ ] Audit trail for credit operations
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All credit configurations complete
- **CONDITIONAL**: Minor gaps in policies
- **FAIL**: Missing credit types or application rules

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
