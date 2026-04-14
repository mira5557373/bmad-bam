# Step 21: Validate Change Management Process

## Purpose

Validate completeness and quality of change management process.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Change management process artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Change Classification
- [ ] Change types defined
- [ ] Risk levels established
- [ ] Categories documented
- [ ] Examples provided

### Tenant Impact Assessment
- [ ] Impact criteria defined
- [ ] Tenant segmentation documented
- [ ] Communication plan included
- [ ] Rollback assessment complete

### Approval Workflows
- [ ] Approval matrix complete
- [ ] CAB structure defined
- [ ] Workflow stages documented
- [ ] SLAs specified

### Emergency Procedures
- [ ] Fast-track processes defined
- [ ] Post-hoc requirements documented
- [ ] Escalation paths clear
- [ ] Contact information included

---

## Gate Decision

- **PASS**: All change management components complete
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
