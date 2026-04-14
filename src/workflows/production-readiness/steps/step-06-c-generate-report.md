# Step 6: Generate Production Readiness Report

## Purpose

Compile all findings into a comprehensive production readiness report with go-live recommendation.

## Prerequisites

- Steps 1-5 complete
- All assessments documented
- **Load checklists:** `{project-root}/_bmad/bam/checklists/production-checklist.md`

## Actions

### 1. Compile Readiness Summary

| Category | Items Assessed | Passed | Failed | Blocked |
|----------|----------------|--------|--------|---------|
| Gate Verification | | | | |
| Infrastructure | | | | |
| Observability | | | | |
| Disaster Recovery | | | | |
| Operations | | | | |
| **Total** | | | | |

### 2. Risk Assessment

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| | | | | |

### 3. Determine Go-Live Decision

| Criteria | Requirement | Status |
|----------|-------------|--------|
| All prerequisite gates | PASS | |
| Infrastructure verified | Capacity + HA | |
| Observability complete | 100% coverage | |
| DR tested | RTO/RPO met | |
| Operations ready | Runbooks + On-call | |

**Go-Live Decision:**

| Outcome | Criteria |
|---------|----------|
| **GO** | All criteria met, no blocking issues |
| **GO WITH CAUTION** | Minor gaps with mitigation plans |
| **NO GO** | Blocking issues requiring resolution |

### 4. Generate Go-Live Checklist

- [ ] All gates passed
- [ ] Infrastructure scaled
- [ ] Monitoring active
- [ ] On-call notified
- [ ] Rollback ready
- [ ] Communication sent

### 5. Generate Report

Produce comprehensive report including:
- Executive summary
- Gate verification results
- Infrastructure assessment
- Observability validation
- DR test results
- Operational readiness
- Risk assessment
- Go-live recommendation
- Launch checklist

**Verify production readiness report format with web search:**
Search the web: "production readiness report template {date}"
Search the web: "go-live assessment report {date}"

## Verification

- [ ] All findings compiled
- [ ] Risk assessment complete
- [ ] Go-live decision documented
- [ ] Launch checklist created
- [ ] Report generated

## Outputs

- `production-readiness-report.md` in `{output_folder}/operations/`
- `go-live-checklist.md` in `{output_folder}/operations/`
- `risk-assessment.md` in `{output_folder}/operations/`

## Next Step

If GO: Execute go-live with launch checklist
If NO GO: Address blocking issues and re-assess
