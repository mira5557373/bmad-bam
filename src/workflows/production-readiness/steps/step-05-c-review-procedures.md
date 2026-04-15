# Step 5: Review Operational Procedures

## Purpose

Review operational procedures, runbooks, and team readiness for production operations.

## Prerequisites

- Steps 1-4 complete
- Operational documentation available
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/production-checklist.md`

## Actions

### 1. Runbook Coverage

| Runbook Category | Runbooks Required | Documented | Tested | Status |
|------------------|-------------------|------------|--------|--------|
| Incident response | | | | |
| Deployment | | | | |
| Scaling | | | | |
| Security incidents | | | | |
| AI-specific operations | | | | |

### 2. On-Call Readiness

| Requirement | Implementation | Verified | Status |
|-------------|----------------|----------|--------|
| On-call rotation defined | | | |
| Escalation paths clear | | | |
| Contact information current | | | |
| On-call tools accessible | | | |
| Team trained on procedures | | | |

### 3. Change Management

| Process | Documented | Enforced | Status |
|---------|------------|----------|--------|
| Change approval workflow | | | |
| Rollback procedures | | | |
| Feature flags | | | |
| Deployment windows | | | |
| Emergency change process | | | |

### 4. Communication Procedures

| Scenario | Communication Plan | Templates | Status |
|----------|-------------------|-----------|--------|
| Planned maintenance | | | |
| Unplanned outage | | | |
| Security incident | | | |
| Data breach | | | |
| Service degradation | | | |

### 5. Vendor/Dependency Management

| Dependency | Support Contact | SLA | Escalation Path | Status |
|------------|-----------------|-----|-----------------|--------|
| Cloud provider | | | | |
| LLM provider | | | | |
| CDN | | | | |
| Payment processor | | | | |

**Verify operational procedures with web search:**
Search the web: "SRE operational readiness checklist {date}"
Search the web: "on-call readiness verification {date}"

## Verification

- [ ] All runbooks documented and tested
- [ ] On-call rotation established
- [ ] Change management in place
- [ ] Communication procedures ready
- [ ] Vendor support verified

## Outputs

- Operational procedures review

## Next Step

Proceed to `step-06-c-generate-report.md`
