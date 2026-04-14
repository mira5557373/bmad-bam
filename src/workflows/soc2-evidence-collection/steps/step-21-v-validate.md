# Step 21: Validate Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Validate the SOC2 evidence collection design against Trust Services Criteria and QG-P1 requirements.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: soc2-evidence-collection
---

## Actions

### 1. Control Coverage Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| CC1-CC5 controls | All mapped | Pass/Fail | {detail} |
| CC6 logical access | All mapped | Pass/Fail | {detail} |
| CC7 operations | All mapped | Pass/Fail | {detail} |
| CC8 change mgmt | All mapped | Pass/Fail | {detail} |
| CC9 risk mitigation | All mapped | Pass/Fail | {detail} |

### 2. Evidence Completeness Validation

| Control Category | Controls | Evidence Sources | Coverage |
|------------------|----------|------------------|----------|
| CC6 | {count} | {sources} | {%} |
| CC7 | {count} | {sources} | {%} |
| CC8 | {count} | {sources} | {%} |

### 3. Calculate Validation Score

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Control coverage | 35% | {score}/100 | {weighted} |
| Evidence completeness | 35% | {score}/100 | {weighted} |
| Automation coverage | 20% | {score}/100 | {weighted} |
| Reporting | 10% | {score}/100 | {weighted} |
| **Total** | 100% | - | **{total}/100** |

**Pass threshold: 90/100**

---

## Verification

- [ ] Control coverage validated
- [ ] Evidence completeness verified
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
