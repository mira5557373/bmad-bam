# Step 21: Validate Product Analytics Instrumentation Design

## Purpose

Validate completeness and quality of product analytics instrumentation design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Product analytics instrumentation design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Event Schema
- [ ] Event taxonomy defined
- [ ] Base schema documented
- [ ] Context schema established
- [ ] Naming conventions specified

### Tracking Plan
- [ ] Core events defined
- [ ] Conversion events documented
- [ ] Engagement events established
- [ ] Implementation planned

### Pipeline Architecture
- [ ] Pipeline components designed
- [ ] Data flow documented
- [ ] Storage strategy established
- [ ] QA checks defined

### Data Governance
- [ ] Access control defined
- [ ] Data classification documented
- [ ] Change management established
- [ ] Compliance addressed

---

## Gate Decision

- **PASS**: All instrumentation components complete
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
