# Step 21: Validate Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Validate LLM gateway configuration against QG-M3 requirements.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: llm-gateway-configuration
---

## Actions

### 1. Validation Checks

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Provider inventory | Complete | Pass/Fail | {detail} |
| Routing rules | Defined | Pass/Fail | {detail} |
| Fallback chains | Configured | Pass/Fail | {detail} |
| Cost optimization | Strategies defined | Pass/Fail | {detail} |
| Resilience | Circuit breaker configured | Pass/Fail | {detail} |

### 2. Calculate Score

**Pass threshold: 85/100**

---

## Verification

- [ ] All validation checks executed
- [ ] Scores calculated for each category
- [ ] Pass/fail threshold applied
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
