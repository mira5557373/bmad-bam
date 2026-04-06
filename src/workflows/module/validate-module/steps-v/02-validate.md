# Step 2: Validate Validation Report

Meta-validation of the validation report itself.

## Validation Checklist

### Report Completeness

- [ ] Report date is present
- [ ] Validator identity documented
- [ ] Module name matches target
- [ ] All three quality gates (QG-M1, QG-M2, QG-M3) have results
- [ ] Overall decision is recorded

### Gate Result Consistency

- [ ] QG-M1 result has supporting findings
- [ ] QG-M2 result has supporting findings
- [ ] QG-M3 result has supporting findings
- [ ] Overall decision matches gate results
  - PASS only if all required gates pass
  - FAIL if any blocking gate fails
  - CONDITIONAL only with documented gaps

### Findings Quality

- [ ] Blocking issues are specific and actionable
- [ ] Warnings include remediation guidance
- [ ] Recommendations are prioritized
- [ ] No findings without severity classification

### Staleness Check

- [ ] Validation date is within acceptable window (e.g., < 7 days)
- [ ] Module architecture not modified after validation
- [ ] Sprint status consistent with validation result
  - If PASS: status should be 'validated'
  - If FAIL: status should be 'validation-failed'

### Architecture Alignment

- [ ] All domain model elements from architecture are validated
- [ ] All facade methods from architecture are checked
- [ ] All dependencies from architecture are verified
- [ ] AI behaviors (if present) are validated

## Meta-Validation Results

| Check | Status | Finding |
|-------|--------|---------|
| Report completeness | PASS/FAIL | {detail} |
| Gate consistency | PASS/FAIL | {detail} |
| Findings quality | PASS/FAIL | {detail} |
| Staleness | PASS/FAIL | {detail} |
| Architecture alignment | PASS/FAIL | {detail} |

## Gate Decision

- **VALID**: Report is complete, consistent, and current
- **STALE**: Report valid but architecture may have changed - recommend re-validation
- **INVALID**: Report incomplete or inconsistent - require full re-validation

Present meta-validation results with recommendations for next steps.
