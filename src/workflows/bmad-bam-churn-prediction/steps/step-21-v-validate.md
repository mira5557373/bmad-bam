# Step 21: Validate Churn Prediction Design

## Purpose

Validate completeness and quality of churn prediction design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Churn prediction design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Churn Indicators
- [ ] Engagement indicators defined with lead times
- [ ] Usage indicators with signals
- [ ] Financial indicators identified
- [ ] Support indicators included

### Prediction Model
- [ ] Model approach selected and justified
- [ ] Feature engineering documented
- [ ] Pipeline architecture defined
- [ ] Training strategy established

### Risk Scoring
- [ ] Score ranges defined
- [ ] Components weighted
- [ ] Confidence scoring documented
- [ ] Explanations provided

### Intervention Strategies
- [ ] Triggers defined with SLAs
- [ ] Playbooks documented
- [ ] Automation configured
- [ ] Success metrics established

---

## Gate Decision

- **PASS**: All prediction components complete
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
