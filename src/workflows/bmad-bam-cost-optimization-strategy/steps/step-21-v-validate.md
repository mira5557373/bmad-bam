# Step 21: Validate Cost Optimization Strategy

## Purpose

Validate completeness and quality of cost optimization strategy.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 20 completed successfully
- Cost optimization strategy artifact loaded
- Expected structure sections identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

Execute validation checks against the loaded artifact.

---

## Verification

### Cost Analysis
- [ ] Infrastructure costs categorized
- [ ] LLM cost drivers identified
- [ ] Tenant cost distribution analyzed
- [ ] Anomaly patterns documented

### Optimization Strategies
- [ ] Compute optimization defined
- [ ] LLM cost strategies documented
- [ ] Storage optimization planned
- [ ] Network optimization designed

### FinOps Practices
- [ ] Maturity model defined
- [ ] Governance framework documented
- [ ] Visibility tools specified
- [ ] Unit economics metrics established

### Implementation
- [ ] Roadmap with phases defined
- [ ] Expected savings estimated
- [ ] Success metrics identified
- [ ] Quick wins prioritized

---

## QG-CS1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CS1`

### QG-CS1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `cost_baseline_established` | **YES** | [ ] Pass / [ ] Fail | Cost Analysis section |
| `optimization_opportunities_identified` | NO | [ ] Pass / [ ] Fail | Optimization Strategies section |
| `tenant_attribution_verified` | **YES** | [ ] Pass / [ ] Fail | Tenant cost distribution analyzed |
| `budget_alerts_configured` | NO | [ ] Pass / [ ] Fail | FinOps visibility tools specified |

**QG-CS1 verification_tests (from CSV):** cost_baseline_established, tenant_attribution_verified

**QG-CS1 Cost Optimization Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

## Gate Decision

- **PASS**: All QG-CS1 required patterns satisfied, all cost optimization components complete
- **CONDITIONAL**: Non-required patterns incomplete, minor gaps documented
- **FAIL**: Any QG-CS1 required pattern fails, missing critical components - return to Create mode

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
