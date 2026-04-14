# Step 21: Validate DR Drill

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the DR drill artifacts against QG-DR1 quality criteria.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DR1`

---

## Validation Checklist

### DR Plan Execution
- [ ] DR plan procedures documented
- [ ] Pre-drill checklist completed
- [ ] Execution log recorded

### Failover Testing
- [ ] Infrastructure failover completed
- [ ] Traffic routing verified
- [ ] Service health checks passing
- [ ] Tenant accessibility confirmed

### Recovery Validation
- [ ] Database integrity verified
- [ ] Tenant data intact
- [ ] AI services recovered
- [ ] Application functionality confirmed

### RTO/RPO Verification
- [ ] RTO calculated and documented
- [ ] RPO measured and documented
- [ ] Targets met or gaps documented

### QG-DR1 Disaster Recovery Gate Verification

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| dr_plan_executed | **YES** | [ ] Pass / [ ] Fail | Execution log |
| failover_tested | **YES** | [ ] Pass / [ ] Fail | Failover results |
| recovery_validated | **YES** | [ ] Pass / [ ] Fail | Recovery report |
| rto_met | **YES** | [ ] Pass / [ ] Fail | RTO measurement |
| rpo_met | **YES** | [ ] Pass / [ ] Fail | RPO measurement |

**QG-DR1 Disaster Recovery Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required patterns verified, drill successful
- **CONDITIONAL**: Minor gaps documented, proceed with improvements
- **FAIL**: Critical pattern failing - drill not successful

---

## COLLABORATION MENUS (A/P/C):

After completing validation, if 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined

---

## Outputs

- Validation report with findings
- Gate decision with rationale

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate final validation report.
