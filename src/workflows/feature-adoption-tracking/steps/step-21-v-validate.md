# Step 21: Validate Feature Adoption Tracking Design

## Purpose

Validate completeness and quality of feature adoption tracking design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Feature adoption tracking design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Feature Catalog
- [ ] Feature taxonomy defined
- [ ] Attributes documented
- [ ] Tier availability mapped
- [ ] Relationships established

### Adoption Metrics
- [ ] Adoption metrics defined
- [ ] Funnel designed
- [ ] Time-to-value tracked
- [ ] Success criteria established

### Insights Engine
- [ ] Insight types defined
- [ ] Recommendations designed
- [ ] A/B testing integrated
- [ ] Dashboard specified

---

## Gate Decision

- **PASS**: All adoption tracking components complete
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
