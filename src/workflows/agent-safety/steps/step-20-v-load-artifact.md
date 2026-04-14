# Step 20: Load Agent Safety Document for Validation

## Purpose

Load the agent safety assessment document for validation against safety criteria.

## Prerequisites

- Agent safety document exists in `{output_folder}/planning-artifacts/`
- Validation checklist available

## Actions

### 1. Locate Document

Load agent safety document from:
- `{output_folder}/planning-artifacts/agent-safety-report.md`

### 2. Parse Document Sections

| Section | Present | Content Valid |
|---------|---------|---------------|
| Guardrails Assessment | [ ] | [ ] |
| Budget Enforcement Tests | [ ] | [ ] |
| Kill Switch Validation | [ ] | [ ] |
| Adversarial Test Results | [ ] | [ ] |
| Report Summary | [ ] | [ ] |

### 3. Extract Metrics for Validation

| Metric | Value | Threshold |
|--------|-------|-----------|
| Overall test pass rate | | >= 95% |
| Critical test pass rate | | 100% |
| Open high-severity findings | | 0 |
| Mitigation coverage | | 100% |

### 4. Identify Validation Scope

| Validation Area | Priority | Notes |
|-----------------|----------|-------|
| Test coverage completeness | High | |
| Pass rate thresholds | Critical | |
| Mitigation adequacy | High | |
| Documentation quality | Medium | |

## Verification

- [ ] Document located and loaded
- [ ] All sections present
- [ ] Metrics extracted
- [ ] Validation scope defined

## Outputs

- Loaded document ready for validation
- Extracted metrics for comparison

## Next Step

Proceed to `step-21-v-validate.md`.
