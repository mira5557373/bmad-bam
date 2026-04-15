# Step 21: Validate Maintenance Window Design

## Purpose

Validate completeness and quality of maintenance window design.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Maintenance window design artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Window Planning
- [ ] Maintenance types defined
- [ ] Window scheduling documented
- [ ] Zero-downtime strategies established
- [ ] SLA impact analyzed

### Tenant Coordination
- [ ] Notification timeline defined
- [ ] Communication templates documented
- [ ] Tenant preferences addressed
- [ ] Special handling documented

### Operational Readiness
- [ ] Annual calendar defined
- [ ] Metrics established
- [ ] Escalation procedures included
- [ ] Rollback plans documented

### Compliance
- [ ] SLA requirements met
- [ ] Notification requirements satisfied
- [ ] Enterprise tenant needs addressed
- [ ] Regulatory considerations included

---

## Gate Decision

- **PASS**: All maintenance window components complete
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
