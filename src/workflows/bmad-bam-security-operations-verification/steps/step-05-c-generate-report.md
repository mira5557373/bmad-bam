# Step 5: Generate Security Operations Report

## Purpose

Compile all findings into a comprehensive security operations verification report.

## Prerequisites

- Steps 1-4 complete
- All assessments documented
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-sec-checklist.md`

## Actions

### 1. Compile Findings Summary

| Category | Items Assessed | Passed | Failed | Critical Gaps |
|----------|----------------|--------|--------|---------------|
| Security Monitoring | | | | |
| Incident Response | | | | |
| Threat Detection | | | | |
| Security Controls | | | | |
| **Total** | | | | |

### 2. Determine Gate Decision

| Criteria | Requirement | Status |
|----------|-------------|--------|
| Monitoring coverage | 100% critical events | |
| IR readiness | Plan tested, team ready | |
| Threat detection | All vectors covered | |
| Control effectiveness | > 90% passing | |

**Gate Decision:**

| Outcome | Criteria |
|---------|----------|
| **PASS** | All criteria met, no critical gaps |
| **CONDITIONAL** | Minor gaps with remediation plan |
| **FAIL** | Critical gaps in security operations |

### 3. Document Remediation Plan

| Finding ID | Category | Severity | Description | Remediation | Owner | Due Date |
|------------|----------|----------|-------------|-------------|-------|----------|
| | | | | | | |

### 4. Recommendations

| Priority | Recommendation | Impact | Effort |
|----------|----------------|--------|--------|
| Critical | | | |
| High | | | |
| Medium | | | |

### 5. Generate Report

Produce comprehensive report including:
- Executive summary
- Security monitoring assessment
- Incident response readiness
- Threat detection capabilities
- Security control effectiveness
- Gap analysis
- Remediation roadmap
- Gate decision and rationale

**Verify security operations report format with web search:**
Search the web: "security operations assessment report {date}"
Search the web: "SecOps readiness report template {date}"

## Verification

- [ ] All findings compiled
- [ ] Categories documented
- [ ] Remediation plan complete
- [ ] Recommendations provided
- [ ] Gate decision documented
- [ ] Report generated

## Outputs

- `security-operations-report.md` in `{output_folder}/security/`
- `incident-readiness-assessment.md` in `{output_folder}/security/`
- `security-controls-audit.md` in `{output_folder}/security/`

## Next Step

If PASS: Proceed to `bmad-bam-production-readiness`
If FAIL: Execute remediation and re-verify
