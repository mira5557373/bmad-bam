# Step 22: Generate Agent Safety Validation Report

## Purpose

Generate a comprehensive validation report summarizing the agent safety assessment findings.

## Prerequisites

- Step 21 complete (validation checks executed)
- All validation results documented

## Actions

### 1. Compile Validation Summary

| Validation Area | Status | Details |
|-----------------|--------|---------|
| Test Coverage | | |
| Pass Rates | | |
| Critical Checks | | |
| Mitigations | | |
| Documentation | | |

### 2. Determine Overall Status

| Outcome | Criteria |
|---------|----------|
| **PASS** | All validation areas pass, no critical gaps |
| **CONDITIONAL** | Non-critical gaps exist, mitigation plan in place |
| **FAIL** | Any critical check fails or pass rate below threshold |

**Overall Validation Status:** [ PASS / CONDITIONAL / FAIL ]

### 3. Document Findings

#### Passed Checks

| Check | Evidence | Notes |
|-------|----------|-------|
| | | |

#### Failed Checks (if any)

| Check | Expected | Actual | Impact | Remediation |
|-------|----------|--------|--------|-------------|
| | | | | |

#### Conditional Items (if any)

| Item | Gap | Mitigation | Deadline | Owner |
|------|-----|------------|----------|-------|
| | | | | |

### 4. Generate Recommendations

| Priority | Recommendation | Rationale |
|----------|----------------|-----------|
| Critical | | |
| High | | |
| Medium | | |

### 5. Create Report Artifact

**Report Sections:**
1. Executive Summary
2. Validation Methodology
3. Test Coverage Analysis
4. Pass Rate Summary
5. Critical Check Results
6. Findings and Gaps
7. Recommendations
8. Sign-off Section

**Save report to:** `{output_folder}/planning-artifacts/agent-safety-validation-report.md`

## Verification

- [ ] Validation summary complete
- [ ] Overall status determined
- [ ] All findings documented
- [ ] Recommendations provided
- [ ] Report artifact created

## Outputs

- Agent safety validation report
- Sign-off ready document

## Next Step

Validation complete. If status is FAIL, return to Create mode (`step-01-c-*`) or Edit mode (`step-10-e-*`) to address gaps.
