# Step 21: Validate Backup/Restore Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

---

## Purpose

Validate completeness and quality of backup/restore design.

---

## Prerequisites

- Step 20: Load Artifact completed

---

## Verification

### Backup Strategy
- [ ] Backup scope covers all data types
- [ ] Frequency defined per tier
- [ ] Retention policies established per tier
- [ ] Cross-region replication configured

### Restore Procedures
- [ ] Recovery types defined with RTO/RPO
- [ ] Process flow documented
- [ ] Tenant isolation during restore addressed
- [ ] Self-service capabilities defined per tier

### Verification Design
- [ ] Automated testing schedule defined
- [ ] Data integrity checks specified
- [ ] Recovery time targets set
- [ ] Compliance evidence documented

### Operational Runbook
- [ ] Monitoring and alerting defined
- [ ] Escalation procedures documented
- [ ] Communication templates included

---

## Gate Decision

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

**Load Checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

- **PASS**: All backup/restore requirements complete
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing critical backup or restore procedures - return to Create mode

---

## Actions

1. Load the relevant documents
2. Apply modifications as specified
3. Generate summary of changes

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **C (Continue)**: Accept validation and proceed to report
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to: `step-22-v-generate-report.md`

---

## Outputs

- Validation gate decision
- Findings by severity

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate report.
