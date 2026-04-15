# Step 5: Generate Data Protection Report

## Purpose

Compile all findings into a comprehensive data protection verification report.

## Prerequisites

- Steps 1-4 complete
- All findings documented
- **Load templates:** `{project-root}/_bmad/bam/data/templates/rls-policy-template.md`

## Actions

### 1. Compile Findings Summary

| Category | Controls Verified | Passed | Failed | Findings |
|----------|-------------------|--------|--------|----------|
| Encryption | | | | |
| Tenant Isolation | | | | |
| PII Protection | | | | |
| Data Lifecycle | | | | |
| **Total** | | | | |

### 2. Determine Gate Decision

| Criteria | Requirement | Status |
|----------|-------------|--------|
| Encryption complete | All data encrypted | |
| Isolation verified | No cross-tenant access | |
| PII protected | Detection + redaction | |
| Lifecycle compliant | Retention enforced | |

**Gate Decision:**

| Outcome | Criteria |
|---------|----------|
| **PASS** | All controls verified, no critical findings |
| **CONDITIONAL** | Minor gaps with remediation plan |
| **FAIL** | Critical gaps in data protection |

### 3. Document Remediation Plan

| Finding ID | Category | Severity | Description | Remediation | Owner | Due Date |
|------------|----------|----------|-------------|-------------|-------|----------|
| | | | | | | |

### 4. Generate Report

Produce comprehensive report including:
- Executive summary
- Encryption audit results
- Tenant isolation verification
- PII protection assessment
- Data lifecycle compliance
- Risk analysis
- Remediation roadmap
- Gate decision and rationale

**Verify data protection report format with web search:**
Search the web: "data protection assessment report {date}"
Search the web: "encryption audit report template {date}"

## Verification

- [ ] All findings compiled
- [ ] Categories documented
- [ ] Remediation plan complete
- [ ] Gate decision documented
- [ ] Report generated

## Outputs

- `data-protection-report.md` in `{output_folder}/security/`
- `encryption-audit.md` in `{output_folder}/security/`
- `privacy-assessment.md` in `{output_folder}/security/`

## Next Step

If PASS: Proceed to `bmad-bam-production-readiness`
If FAIL: Execute remediation and re-verify
