# Step 5: Generate Compliance Report

## Purpose

Compile all findings into a comprehensive compliance verification report.

## Prerequisites

- Steps 1-4 complete
- All findings documented
- **Load template:** `{project-root}/_bmad/bam/templates/compliance-framework-template.md`

## Actions

### 1. Compile Findings Summary

| Framework | Controls Assessed | Compliant | Gaps | Findings |
|-----------|-------------------|-----------|------|----------|
| SOC2 Type II | | | | |
| GDPR | | | | |
| HIPAA | | | | |
| PCI-DSS | | | | |
| **Total** | | | | |

### 2. Determine Gate Decision

| Criteria | Requirement | Status |
|----------|-------------|--------|
| No critical gaps | Zero critical | |
| High gaps remediated | Plan in place | |
| Audit logging | 100% coverage | |
| Access controls | Fully implemented | |

**Gate Decision:**

| Outcome | Criteria |
|---------|----------|
| **PASS** | No critical/high gaps, all controls verified |
| **CONDITIONAL** | No critical, high gaps have remediation plan |
| **FAIL** | Any critical gaps, or unaddressed high |

### 3. Document Remediation Plan

| Finding ID | Framework | Severity | Gap Description | Remediation | Owner | Due Date |
|------------|-----------|----------|-----------------|-------------|-------|----------|
| | | | | | | |

### 4. Generate Report

Produce comprehensive report including:
- Executive summary
- Framework coverage matrix
- Detailed findings by framework
- Control implementation status
- Gap analysis
- Remediation roadmap
- Gate decision and rationale

**Verify compliance report best practices with web search:**
Search the web: "compliance audit report format {date}"
Search the web: "SOC2 audit report template {date}"

## Verification

- [ ] All findings compiled
- [ ] Framework coverage documented
- [ ] Remediation plan complete
- [ ] Gate decision documented
- [ ] Report generated

## Outputs

- `compliance-verification-report.md` in `{output_folder}/compliance/`
- `compliance-findings.md` in `{output_folder}/compliance/`
- `remediation-plan.md` in `{output_folder}/compliance/`

## Next Step

If PASS: Proceed to production deployment
If FAIL: Execute remediation and re-verify
