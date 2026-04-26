# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES

- 🛑 NEVER generate report without complete validation results from Step 21
- 📖 ALWAYS include all 7 category summaries with pass/fail counts
- 🔄 ALWAYS determine QG-S3 outcome using security gate criteria
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ DOCUMENT all CRITICAL failures with security impact assessment
- 📋 SPECIFY 3-step recovery protocol if outcome is FAIL
- 🎯 LOCK passed categories to prevent unnecessary re-validation
- 🚦 ESCALATE to CISO if Attempt 3 recovery is required

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate QG-S3 validation report with gate decision
- 💾 Track: `validateMode: true, stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Validation results from Step 21
- 🚫 Do NOT: Re-validate; only compile report and determine outcome
- 🔍 Use web search: Not required for report generation
- ⚠️ Gate: QG-S3 (Security Baseline) - decision

---

## Purpose

Compile validation results into a formal QG-S3 gate report. Determine gate outcome (PASS, CONDITIONAL, FAIL), document findings, and specify recovery actions if needed.

---

## Prerequisites

- Step 21 complete with all validation results
- Gate decision criteria loaded

---

## Actions

### 1. Compile Validation Results

**Category Summary:**

| Category | Classification | Passed | Total | Percentage | Status |
|----------|----------------|--------|-------|------------|--------|
| Authentication & Authorization | CRITICAL | {n} | 10 | {%} | {status} |
| Network Security | CRITICAL | {n} | 10 | {%} | {status} |
| Data Protection | CRITICAL | {n} | 10 | {%} | {status} |
| Logging & Monitoring | Non-critical | {n} | 10 | {%} | {status} |
| Vulnerability Management | Non-critical | {n} | 10 | {%} | {status} |
| Multi-Tenant Isolation | CRITICAL | {n} | 9 | {%} | {status} |
| AI-Specific Security | CRITICAL | {n} | 8 | {%} | {status} |

**Critical Checks Summary:**

| Check | Category | Status | Evidence |
|-------|----------|--------|----------|
| Tenant SSO integration | AuthN/AuthZ | Pass/Fail | {evidence} |
| API key rotation | AuthN/AuthZ | Pass/Fail | {evidence} |
| RBAC per tenant | AuthN/AuthZ | Pass/Fail | {evidence} |
| TLS 1.3 enforced | Network | Pass/Fail | {evidence} |
| AES-256 encryption | Data | Pass/Fail | {evidence} |
| Per-tenant keys | Data | Pass/Fail | {evidence} |
| Tenant isolation | Multi-Tenant | Pass/Fail | {evidence} |
| Prompt injection defense | AI | Pass/Fail/N/A | {evidence} |

### 2. Determine Gate Outcome

**Decision Criteria:**

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL checks pass AND Required categories achieve 90%+ |
| **CONDITIONAL** | All CRITICAL checks pass AND Required categories achieve 75%+ with documented remediation plan and 14-day deadline |
| **FAIL** | Any CRITICAL check fails |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

**Gate Decision:**

```
┌─────────────────────────────────────────────┐
│                                             │
│   QG-S3 SECURITY BASELINE GATE              │
│                                             │
│   Outcome: [PASS / CONDITIONAL / FAIL]      │
│                                             │
│   Date: {date}                              │
│   Reviewer: {reviewer}                       │
│                                             │
└─────────────────────────────────────────────┘
```

### 3. Document Findings

**If PASS:**

| Finding Type | Count |
|--------------|-------|
| All CRITICAL checks | Passed |
| Non-critical checks | {n}% passed |
| Recommendations | {n} minor improvements |

**If CONDITIONAL:**

| Gap | Category | Remediation | Deadline |
|-----|----------|-------------|----------|
| {gap 1} | {category} | {action} | {date} |
| {gap 2} | {category} | {action} | {date} |

**If FAIL:**

| Critical Failure | Category | Impact | Recovery Action |
|------------------|----------|--------|-----------------|
| {failure 1} | {category} | {impact} | {action} |
| {failure 2} | {category} | {impact} | {action} |

### 4. Recovery Protocol (If FAIL or CONDITIONAL)

**Attempt 1: Immediate Remediation (1-2 days)**
- Review failed checks and identify root cause
- Prioritize CRITICAL items for immediate remediation
- Implement targeted fixes with security team review
- Re-run QG-S3 validation
- **Lock passed categories**

**Attempt 2: Deeper Investigation (1 week)**
- Engage Security Architecture team
- Review threat model for missed attack vectors
- Audit security configurations against baseline
- Apply corrective measures with peer review
- Re-run validation
- **Preserve locked categories**

**Attempt 3: Mandatory Course Correction**
- Escalate to CISO and security leadership
- Document blockers in security risk register
- Implement compensating controls if baseline cannot be met
- Reassess deployment timeline with stakeholders

### 5. Generate Report Artifact

**Output Location:** `{output_folder}/validation-reports/qg-s3-security-report.md`

**Report Structure:**

```markdown
# QG-S3 Security Baseline Validation Report

**Gate ID:** QG-S3
**Date:** {date}
**Artifact Validated:** security-design.md
**Reviewer:** {reviewer}
**Outcome:** [PASS / CONDITIONAL / FAIL]

---

## Executive Summary

{Brief summary of validation results and gate decision}

## Validation Results

### Category Summary
{Table from Action 1}

### Critical Checks
{Table from Action 1}

## Findings

### Passed Checks
{List of passed checks}

### Failed Checks (if any)
{List of failed checks with evidence}

### Recommendations
{Non-blocking recommendations}

## Gate Decision

**Outcome:** {outcome}
**Rationale:** {decision rationale}

## Next Steps

{If PASS: Proceed to implementation}
{If CONDITIONAL: Remediation plan with deadlines}
{If FAIL: Recovery protocol steps}

---

**Signatures:**

| Role | Name | Date |
|------|------|------|
| Security Architect | | |
| Technical Lead | | |
| Compliance Officer | | |
```

---

## SUCCESS METRICS

- ✅ All validation results compiled accurately from Step 21
- ✅ QG-S3 outcome determined using security gate criteria
- ✅ CRITICAL failures documented with security impact assessment
- ✅ Recommendations prioritized by security risk
- ✅ Recovery protocol defined with escalation path (if FAIL)
- ✅ Locked categories identified for re-validation efficiency
- ✅ Report saved to correct location with signatures section
- ✅ Next steps clearly communicated based on outcome

---

## FAILURE MODES

- ❌ **Incomplete validation data:** Return to Step 21, do not generate partial report
- ❌ **CRITICAL check status unclear:** Default to FAIL, escalate for clarification
- ❌ **Report save failure:** Retry, present report in console if persistent
- ❌ **Missing remediation for CONDITIONAL:** Block outcome without 14-day deadline plan
- ❌ **Recovery protocol undefined for FAIL:** Block outcome without 3-step escalation path

---

## Verification

- [ ] All validation results compiled
- [ ] Gate decision determined per criteria
- [ ] Findings documented (passed, failed, recommendations)
- [ ] Recovery protocol specified (if FAIL/CONDITIONAL)
- [ ] Report generated to `{output_folder}/validation-reports/qg-s3-security-report.md`

---

## Outputs

- **Primary:** `{output_folder}/validation-reports/qg-s3-security-report.md`
- Gate decision summary
- Remediation plan (if applicable)

---

## Gate Decision Summary

| Outcome | Next Action |
|---------|-------------|
| **PASS** | Proceed to implementation phase |
| **CONDITIONAL** | Execute remediation plan within deadline, then proceed |
| **FAIL** | Enter recovery protocol, re-validate after fixes |

---

## Next Step

**Validate mode complete.**

| Outcome | Proceed To |
|---------|------------|
| PASS | Implementation workflows |
| CONDITIONAL | Fix gaps, re-run validate (step-20) |
| FAIL | Recovery protocol, re-run full create mode if needed |
