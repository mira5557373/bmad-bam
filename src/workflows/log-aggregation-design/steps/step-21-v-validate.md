# Step 21: Validate Log Aggregation Design

## Purpose

Validate completeness and quality of log aggregation design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Log aggregation design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Collection Design
- [ ] Log sources identified
- [ ] Collection pipeline designed
- [ ] Log schema defined
- [ ] Retention policy established

### Tenant Isolation
- [ ] Isolation strategies defined
- [ ] Access control documented
- [ ] Query security established
- [ ] Self-service features planned

### Operational Readiness
- [ ] Alerting configured
- [ ] Metrics defined
- [ ] Capacity planned
- [ ] Backup procedures documented

### Compliance
- [ ] Retention requirements met
- [ ] Privacy controls implemented
- [ ] Audit trail enabled
- [ ] Regulatory compliance verified

---

## Gate Decision

- **PASS**: All log aggregation components complete
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing critical components - return to Create mode

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- Gap analysis if applicable

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to generate report
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to: `step-22-v-report.md`

---

## Next Step

Proceed to `step-22-v-report.md`.
