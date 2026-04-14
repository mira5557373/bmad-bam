# Step 21: Validate On-Call Rotation Design

## Purpose

Validate completeness and quality of on-call rotation design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- On-call rotation design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Rotation Design
- [ ] Rotation models defined
- [ ] Coverage requirements documented
- [ ] Schedule established
- [ ] Burnout prevention addressed

### Escalation Policy
- [ ] Escalation levels defined
- [ ] Severity routing documented
- [ ] Tenant-priority routing established
- [ ] Communication channels configured

### Operational Readiness
- [ ] Tooling configured
- [ ] Contact information current
- [ ] Handoff procedures documented
- [ ] Training plan included

### Health Metrics
- [ ] MTTA targets defined
- [ ] Alert volume targets set
- [ ] Burnout indicators tracked
- [ ] Review cadence established

---

## Gate Decision

- **PASS**: All on-call rotation components complete
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
