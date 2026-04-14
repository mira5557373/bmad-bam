# Step 6: Generate AI Security Audit Report

## Purpose

Compile all findings into a comprehensive AI security audit report with remediation recommendations.

## Prerequisites

- Steps 1-5 complete
- All findings documented
- **Load template:** `{project-root}/_bmad/bam/templates/ai-security-test-plan-template.md`

## Actions

### 1. Compile Findings Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Model Security | | | | |
| Endpoint Protection | | | | |
| Prompt Injection | | | | |
| Data Leakage | | | | |
| Access Controls | | | | |
| **Total** | | | | |

### 2. Determine Gate Decision

| Criteria | Requirement | Status |
|----------|-------------|--------|
| No critical findings | Zero critical | |
| No unmitigated high | All high addressed | |
| Prompt injection 100% | All tests pass | |
| Data leakage 100% | All tests pass | |

**Gate Decision:**

| Outcome | Criteria |
|---------|----------|
| **PASS** | No critical/high findings, all tests pass |
| **CONDITIONAL** | No critical, high has remediation plan |
| **FAIL** | Any critical, or unaddressed high |

### 3. Document Remediation Plan

| Finding ID | Severity | Description | Remediation | Owner | Due Date |
|------------|----------|-------------|-------------|-------|----------|
| | | | | | |

### 4. Generate Report

Produce comprehensive report including:
- Executive summary
- Methodology
- Detailed findings
- Risk assessment
- Remediation roadmap
- Gate decision

## TEA Handoff (QG-I3/QG-S4)

**BAM produces criteria → TEA executes verification → TEA reports results → BAM makes gate decision**

### Handoff Items

| Item | Handoff To | TEA Action | Return |
|------|------------|------------|--------|
| Prompt injection tests | TEA `bam-tea-security-testing` | Execute injection scenarios | Detection results |
| Model security tests | TEA isolation testing | Verify model isolation | Isolation status |
| Output filtering tests | TEA cross-tenant | Test filter effectiveness | Leakage findings |
| Kill switch verification | TEA chaos testing | Test emergency stop | Response metrics |
| Data leakage tests | TEA security testing | Test exfiltration attempts | Blocked/leaked |

### TEA Integration Commands

```
# Load TEA BAM context
bam-tea-context

# Execute AI-specific security testing
bam-tea-security-testing

# Run chaos testing for AI resilience
bam-tea-chaos-testing
```

### Gate Decision Authority

- **TEA** executes AI security tests and provides results
- **BAM** interprets results against QG-S4 criteria (AI Security)
- **BAM** contributes findings to QG-I3 (Agent Safety) decision
- **BAM** makes final gate decision (PASS/CONDITIONAL/FAIL/WAIVED)

**Verify current best practices with web search:**
Search the web: "generate report best practices {date}"
Search the web: "generate report multi-tenant SaaS {date}"

## Verification

- [ ] All findings categorized
- [ ] Remediation plan complete
- [ ] Gate decision documented
- [ ] Report generated
- [ ] TEA handoff completed (if applicable)

## Outputs

- `ai-security-audit-report.md` in `{output_folder}/security/`
- `ai-vulnerability-findings.md` in `{output_folder}/security/`

## Next Step

If PASS: Proceed to `bmad-bam-production-readiness`
If FAIL: Execute remediation and re-audit
