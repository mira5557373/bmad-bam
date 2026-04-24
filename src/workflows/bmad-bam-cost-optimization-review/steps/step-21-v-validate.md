# Step 21: Validate Against Quality Criteria

## Purpose

Validate the cost optimization review against QG-CS1 quality gate criteria.

## Prerequisites

- Step 20 complete (artifact loaded)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

## Actions

### 1. QG-CS1 Validation Checks

#### Baseline Checks
- [ ] **CRITICAL:** Cost breakdown documented
- [ ] Historical trends analyzed
- [ ] Unit economics calculated

#### Optimization Checks
- [ ] **CRITICAL:** Opportunities identified
- [ ] Savings quantified
- [ ] Priorities assigned

#### Attribution Checks
- [ ] **CRITICAL:** Per-tenant costs verified
- [ ] Methodology documented
- [ ] Profitability analyzed

#### Alert Checks
- [ ] Budget thresholds configured
- [ ] Alert routing set up
- [ ] Anomaly detection enabled

### 2. Calculate Validation Score

| Category | Critical | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Baseline | 1 | {n} | {n} | {%} |
| Optimization | 1 | {n} | {n} | {%} |
| Attribution | 1 | {n} | {n} | {%} |
| Alerts | 0 | {n} | {n} | {%} |

### 3. Determine Gate Outcome

**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Proceed to next step: `step-22-v-generate-report.md`

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
