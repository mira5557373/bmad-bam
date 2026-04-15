# Step 21: Validate Against Quality Criteria

## Purpose

Validate the capacity plan against QG-CP1 quality gate criteria.

## Prerequisites

- Artifact loaded (Step 20)

## Actions

### 1. QG-CP1 Validation Checks

#### Baseline Checks
- [ ] **CRITICAL:** Resource inventory documented
- [ ] Utilization metrics captured
- [ ] Historical patterns analyzed

#### Growth Checks
- [ ] **CRITICAL:** Growth projections documented
- [ ] Multiple scenarios included
- [ ] AI demand projected

#### Scaling Checks
- [ ] **CRITICAL:** Auto-scaling thresholds defined
- [ ] Manual triggers documented
- [ ] Cost limits established

#### Allocation Checks
- [ ] Per-tier allocation verified
- [ ] Quotas documented
- [ ] Fair share validated

### 2. Calculate Validation Score

| Category | Critical | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Baseline | 1 | {n} | {n} | {%} |
| Growth | 1 | {n} | {n} | {%} |
| Scaling | 1 | {n} | {n} | {%} |
| Allocation | 0 | {n} | {n} | {%} |

### 3. Determine Gate Outcome

**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Save validation results
- Proceed to next step: `step-22-v-generate-report.md`

## Outputs

- Validation results
- Gate outcome

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
