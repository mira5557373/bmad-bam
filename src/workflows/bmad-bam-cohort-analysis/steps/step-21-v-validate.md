# Step 21: Validate Cohort Analysis Design

## Purpose

Validate completeness and quality of cohort analysis design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Cohort analysis design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Cohort Definitions
- [ ] Time-based cohorts defined
- [ ] Acquisition cohorts identified
- [ ] Behavior cohorts established
- [ ] Value cohorts included

### Retention Analysis
- [ ] Retention metrics defined
- [ ] Curve design documented
- [ ] Comparison methods established
- [ ] Alerts configured

### Behavior Segmentation
- [ ] Segments defined with criteria
- [ ] Scoring model documented
- [ ] Actions per segment
- [ ] Reporting scheduled

---

## Gate Decision

- **PASS**: All cohort analysis components complete
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
