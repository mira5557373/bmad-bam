# Step 22: Generate AI Security Validation Report

## Purpose

Generate a comprehensive validation report summarizing the AI security assessment findings.

## Prerequisites

- Step 21 complete (validation checks executed)
- All validation results documented

## Actions

### 1. Compile Validation Summary

| Validation Area | Status | Details |
|-----------------|--------|---------|
| Model Security | | |
| Endpoint Security | | |
| Prompt Injection Defenses | | |
| Data Leakage Prevention | | |
| Access Controls | | |
| Documentation | | |

### 2. Determine Overall Status

| Outcome | Criteria |
|---------|----------|
| **PASS** | All validation areas pass, no critical vulnerabilities |
| **CONDITIONAL** | Non-critical gaps exist, remediation plan in place |
| **FAIL** | Any critical vulnerability or defense gap found |

**Overall Validation Status:** [ PASS / CONDITIONAL / FAIL ]

### 3. Document Findings

#### Passed Checks

| Check | Evidence | Notes |
|-------|----------|-------|
| | | |

#### Failed Checks (if any)

| Check | Expected | Actual | Risk Level | Remediation |
|-------|----------|--------|------------|-------------|
| | | | | |

#### Conditional Items (if any)

| Item | Gap | Mitigation | Deadline | Owner |
|------|-----|------------|----------|-------|
| | | | | |

### 4. Generate Risk Summary

| Risk Category | Count | Highest Severity |
|---------------|-------|------------------|
| Critical | | |
| High | | |
| Medium | | |
| Low | | |

### 5. Generate Recommendations

| Priority | Recommendation | Rationale | Effort |
|----------|----------------|-----------|--------|
| Critical | | | |
| High | | | |
| Medium | | | |

### 6. Create Report Artifact

**Report Sections:**
1. Executive Summary
2. Validation Methodology
3. Model Security Analysis
4. Endpoint Security Review
5. Defense Effectiveness Assessment
6. Data Protection Verification
7. Access Control Audit
8. Risk Summary
9. Findings and Recommendations
10. Compliance Status
11. Sign-off Section

**Save report to:** `{output_folder}/planning-artifacts/ai-security-validation-report.md`

## Verification

- [ ] Validation summary complete
- [ ] Overall status determined
- [ ] All findings documented
- [ ] Risk summary generated
- [ ] Recommendations provided
- [ ] Report artifact created

## Outputs

- AI security validation report
- Sign-off ready document

## Next Step

Validation complete. If status is FAIL, return to Create mode (`step-01-c-*`) or Edit mode (`step-10-e-*`) to address gaps.
