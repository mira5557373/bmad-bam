# Step 21: Validate Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Validate capacity planning design against QG-P1 requirements and operational best practices.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-capacity-planning
---

## Actions

### 1. Coverage Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| All resource categories | Defined | Pass/Fail | {detail} |
| All tiers have quotas | Complete | Pass/Fail | {detail} |
| Scaling triggers | Defined | Pass/Fail | {detail} |
| Growth projections | Multiple scenarios | Pass/Fail | {detail} |

### 2. Calculate Validation Score

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Usage analysis | 25% | {score}/100 | {weighted} |
| Growth projections | 25% | {score}/100 | {weighted} |
| Resource allocation | 25% | {score}/100 | {weighted} |
| Scaling triggers | 25% | {score}/100 | {weighted} |
| **Total** | 100% | - | **{total}/100** |

**Pass threshold: 85/100**

### 3. QG-CP1 Exit Gate Verification

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CP1`

### QG-CP1 Required Patterns

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| `capacity_baseline_established` | **YES** | [ ] Pass / [ ] Fail | Usage analysis section |
| `growth_projected` | NO | [ ] Pass / [ ] Fail | Growth projections section |
| `scaling_thresholds_defined` | **YES** | [ ] Pass / [ ] Fail | Scaling triggers defined |
| `resource_allocation_verified` | NO | [ ] Pass / [ ] Fail | All tiers have quotas |

**QG-CP1 verification_tests (from CSV):** capacity_baseline_established, scaling_thresholds_defined

**QG-CP1 Capacity Planning Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### Gate Decision

- **PASS**: All QG-CP1 required patterns satisfied, validation score >= 85
- **CONDITIONAL**: Non-required patterns incomplete, mitigation plan documented
- **FAIL**: Any QG-CP1 required pattern fails, validation score < 85

---

## Verification

- [ ] Coverage validation completed
- [ ] All tiers have quotas defined
- [ ] Validation score calculated
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
