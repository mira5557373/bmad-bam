# Step 21: Validate Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Validate cost attribution design against QG-P1 requirements.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-cost-attribution
---

## Actions

### 1. Validation Checks

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Cost categories | All defined | Pass/Fail | {detail} |
| Allocation rules | Complete | Pass/Fail | {detail} |
| Reports | Designed | Pass/Fail | {detail} |
| Optimization | Strategies defined | Pass/Fail | {detail} |

### 2. Calculate Score

**Pass threshold: 85/100**

---

## Verification

- [ ] All validation checks executed
- [ ] Cost categories fully defined
- [ ] Score calculated
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
