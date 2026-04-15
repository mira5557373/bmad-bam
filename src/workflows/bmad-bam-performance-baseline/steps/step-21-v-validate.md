# Step 21: Validate Performance Baseline Design

## Purpose

Validate completeness and quality of performance baseline design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Performance baseline design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Metric Selection
- [ ] Latency metrics defined
- [ ] Throughput metrics documented
- [ ] Resource metrics established
- [ ] Tenant-specific metrics addressed

### Baseline Collection
- [ ] Collection methodology defined
- [ ] Statistical analysis documented
- [ ] Anomaly detection established
- [ ] Capacity integration addressed

### Operational Readiness
- [ ] SLOs defined
- [ ] Dashboard specs included
- [ ] Alerting rules documented
- [ ] Review process established

### Integration
- [ ] Observability stack integrated
- [ ] Capacity planning connected
- [ ] Alerting configured
- [ ] Reporting automated

---

## Gate Decision

- **PASS**: All performance baseline components complete
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
