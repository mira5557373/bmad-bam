# Step 21: Validate Health Scoring Design

## Purpose

Validate completeness and quality of health scoring design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Health scoring design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Metrics Definition
- [ ] Engagement metrics defined with ranges
- [ ] Usage metrics with collection frequency
- [ ] Business metrics identified
- [ ] Support metrics included

### Weight Configuration
- [ ] Category weights sum to 100%
- [ ] Normalization methods assigned
- [ ] Tier variations documented
- [ ] Adjustment rules defined

### Scoring Algorithm
- [ ] Composite formula documented
- [ ] Trend analysis defined
- [ ] Predictive indicators established
- [ ] Score ranges validated

### Thresholds and Actions
- [ ] Status classifications defined
- [ ] Automated actions configured
- [ ] Notification rules established
- [ ] Review cadence documented

---

## Gate Decision

- **PASS**: All scoring components complete
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
