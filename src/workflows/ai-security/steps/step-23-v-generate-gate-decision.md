# Step 23: Generate QG-S4 Gate Decision

## Purpose

Generate the final QG-S4 AI Security quality gate decision based on validation results, determining if the AI security assessment passes gate criteria for production readiness.

## Prerequisites

- Step 20 complete (report loaded)
- Step 21 complete (remediation verified)
- Step 22 complete (compliance checked)
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S4`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-security-continuous.md`

## Actions

### 1. Aggregate Validation Results

| Validation Step | Result | Notes |
|-----------------|--------|-------|
| Step 21: Remediation Verification | [ ] PASS / [ ] FAIL | |
| Step 22: Compliance Check | [ ] PASS / [ ] FAIL | |

### 2. Evaluate QG-S4 Critical Criteria

**Critical checks (must all pass for PASS decision):**

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Zero critical vulnerabilities | [ ] | |
| Prompt injection defenses active | [ ] | |
| Data leakage prevention 100% | [ ] | |
| Cross-tenant isolation verified | [ ] | |
| Model access controls enforced | [ ] | |
| Inference endpoint authentication | [ ] | |

**Critical Check Summary:** ___ / 6 passed

### 3. Evaluate QG-S4 Standard Criteria

**Standard checks (80% must pass for CONDITIONAL):**

| Criterion | Status | Notes |
|-----------|--------|-------|
| High vulnerabilities <= 2 | [ ] | |
| Security score >= 85/100 | [ ] | |
| All endpoints encrypted | [ ] | |
| Rate limiting configured | [ ] | |
| Audit logging enabled | [ ] | |
| Documentation complete | [ ] | |
| Threat model current | [ ] | |
| Risk assessment dated | [ ] | |
| Remediation plans active | [ ] | |
| Compliance mapping done | [ ] | |

**Standard Check Summary:** ___ / 10 passed

### 4. Determine Gate Decision

| Outcome | Criteria | Decision |
|---------|----------|----------|
| **PASS** | All 6 critical + 8+ standard pass | |
| **CONDITIONAL** | All 6 critical + 5-7 standard pass | |
| **FAIL** | Any critical fails OR < 5 standard pass | |
| **WAIVED** | Non-critical waived by stakeholder | |

**Gate Decision:** [ PASS / CONDITIONAL / FAIL / WAIVED ]

### 5. Document Decision Rationale

| Decision Element | Value |
|------------------|-------|
| Decision | |
| Critical Checks Passed | /6 |
| Standard Checks Passed | /10 |
| Overall Security Score | /100 |
| Open Critical Findings | |
| Open High Findings | |
| Remediation Deadline (if CONDITIONAL) | |
| Stakeholder Sign-off (if WAIVED) | |

### 6. Generate Conditional Requirements (if applicable)

If CONDITIONAL decision:

| Gap | Mitigation Plan | Owner | Deadline |
|-----|-----------------|-------|----------|
| | | | |

### 7. Generate Gate Decision Report

**Report Sections:**
1. Executive Summary
2. Gate Decision (PASS/CONDITIONAL/FAIL/WAIVED)
3. Critical Criteria Results
4. Standard Criteria Results
5. Risk Assessment Summary
6. Open Findings
7. Conditional Requirements (if applicable)
8. Remediation Timeline (if applicable)
9. Stakeholder Sign-off Section
10. Next Steps

**Save gate decision to:** `{output_folder}/planning-artifacts/qg-s4-gate-decision.md`

**Verify current best practices with web search:**
Search the web: "AI security quality gate criteria {date}"
Search the web: "LLM security production readiness checklist {date}"

## Verification

- [ ] All validation results aggregated
- [ ] Critical criteria evaluated
- [ ] Standard criteria evaluated
- [ ] Gate decision determined
- [ ] Decision rationale documented
- [ ] Conditional requirements defined (if applicable)
- [ ] Gate decision report generated
- [ ] Sign-off section included

## Outputs

- QG-S4 Gate Decision Report
- Sign-off ready document
- Remediation timeline (if CONDITIONAL)

## Workflow Complete

**If PASS:** AI security assessment approved. Proceed to production deployment.

**If CONDITIONAL:** Proceed with documented mitigations and deadline. Re-validate after remediation.

**If FAIL:** Return to Create mode (`step-01-c-*`) or Edit mode (`step-10-e-*`) to address critical gaps. Re-run validation after remediation.

**If WAIVED:** Document stakeholder justification. Proceed with risk acceptance.
