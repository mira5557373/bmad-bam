# Step 21: Validate Chaos Engineering Design

## Purpose

Validate completeness and quality of chaos engineering design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Chaos engineering design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: resilience

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Experiment Catalog
- [ ] Experiment categories defined
- [ ] Multi-tenant experiments specified
- [ ] Hypotheses documented
- [ ] Success criteria established

### Blast Radius Controls
- [ ] Blast radius levels defined
- [ ] Safety controls documented
- [ ] Tenant protection matrix complete
- [ ] Abort criteria established

### Safety Mechanisms
- [ ] Kill switch defined
- [ ] Time limits specified
- [ ] Metric thresholds documented
- [ ] Progressive rollout planned

### Scheduling
- [ ] Experiment calendar defined
- [ ] Frequency appropriate
- [ ] Approval process documented
- [ ] Communication plan included

---

## Gate Decision

- **PASS**: All chaos engineering components complete
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
