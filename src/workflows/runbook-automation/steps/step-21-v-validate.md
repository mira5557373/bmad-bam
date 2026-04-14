# Step 21: Validate Runbook Automation Design

## Purpose

Validate completeness and quality of runbook automation design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Runbook automation design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Runbook Structure
- [ ] Categories defined
- [ ] Template structure documented
- [ ] Maturity levels established
- [ ] Tenant-aware considerations addressed

### Automation Patterns
- [ ] Automation triggers defined
- [ ] Execution patterns documented
- [ ] Safety controls established
- [ ] Tenant-safe execution addressed

### Safety Controls
- [ ] Dry run capability defined
- [ ] Approval gates documented
- [ ] Rollback procedures included
- [ ] Scope limits established

### Operational Readiness
- [ ] Tooling recommendations included
- [ ] Metrics defined
- [ ] Training plan referenced
- [ ] Documentation complete

---

## Gate Decision

- **PASS**: All runbook automation components complete
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
