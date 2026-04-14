# QG-PD1: Post-Deployment Verification Checklist

> Gate ID: QG-PD1 (Post-Deployment Verification)
> Post-deployment verification MUST pass within 30 minutes of deployment.
> Gate definition: verifies all systems operational and no tenant impact after deployment.
> Workflow integration: Triggered immediately after production deployment completes.
> Executing workflow: `post-deployment-verification` (manual or automated)
>
> **Production Handoff:** After QG-P1 approval and deployment, this gate validates
> the live environment. Smoke tests, monitoring, and tenant health checks ensure
> the deployment succeeded without regression.
> Sequence: QG-P1 (approval) → deployment → QG-PD1 (verification) → stable

## Smoke Test Verification

- [ ] Health check endpoints returning 200 OK (all services)
- [ ] **CRITICAL:** Database connectivity verified
- [ ] **CRITICAL:** Cache layer responsive (Redis/Memcached)
- [ ] **CRITICAL:** Message queue connectivity verified
- [ ] Authentication flow completing successfully
- [ ] Critical API paths returning expected responses
- [ ] Background job processors running
- [ ] Scheduled tasks executing on schedule

## Monitoring Validation

- [ ] **CRITICAL:** Alerting system receiving metrics
- [ ] Application dashboards populated with current data
- [ ] Error rate within acceptable threshold (< baseline + 10%)
- [ ] Latency metrics within SLA bounds
- [ ] Log aggregation receiving entries from all services
- [ ] Distributed tracing capturing requests
- [ ] Cost tracking metrics updating

## Tenant Impact Assessment

- [ ] **CRITICAL:** No increase in tenant error rates
- [ ] **CRITICAL:** No cross-tenant data anomalies detected
- [ ] Tenant-specific SLAs being met
- [ ] No noisy-neighbor alerts triggered
- [ ] Tenant provisioning flow functional
- [ ] Tier entitlements enforced correctly
- [ ] Metering and billing data accurate

## Rollback Criteria

Document conditions that would trigger immediate rollback:

- [ ] Rollback runbook accessible and verified
- [ ] Rollback automation tested (if applicable)
- [ ] Database migration rollback scripts ready (if applicable)
- [ ] Feature flags configured for quick disable
- [ ] Rollback decision authority identified

### Rollback Triggers (any one triggers rollback)

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Error rate spike | > 5% increase from baseline | Immediate rollback |
| P1 incidents | Any P1 incident | Evaluate rollback within 15 min |
| Tenant data isolation breach | Any detection | Immediate rollback |
| Core service unavailable | > 2 minutes | Immediate rollback |
| SLA breach | Any tier | Evaluate rollback within 30 min |

## Communication Verification

- [ ] Status page updated (if deployment announced)
- [ ] Internal deployment notification sent
- [ ] On-call team aware of deployment
- [ ] Customer success notified (if customer-facing changes)
- [ ] Support team briefed on changes

## Post-Deployment Observation Period

- [ ] 15-minute observation window completed without alerts
- [ ] 30-minute checkpoint review completed
- [ ] Deployment marked as successful in deployment tracker

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, smoke tests green, no rollback triggers |
| **CONDITIONAL** | All CRITICAL items pass, minor issues documented, monitoring extended to 60 min |
| **FAIL** | Any CRITICAL item fails OR any rollback trigger activated — initiate rollback |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Smoke Test Verification | CRITICAL | Minor health warnings | Service unavailable |
| Monitoring Validation | CRITICAL | Alerting delayed | No alerting active |
| Tenant Impact Assessment | CRITICAL | Single tenant affected | Multiple tenants or data isolation breach |
| Rollback Criteria | CRITICAL | Rollback plan incomplete | No rollback capability |
| Communication Verification | Non-critical | Delayed notification | N/A |
| Post-Deployment Observation | Non-critical | Shortened observation | N/A |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate deployment recovery (target: <5 min)
   - Execute rollback if any rollback trigger activated
   - Verify rollback successful
   - Confirm tenant service restored
   - Re-evaluate gate status
   - **Lock passed categories**

2. **Attempt 2:** Investigation and retry (target: <30 min)
   - If no immediate rollback needed, investigate root cause
   - Apply targeted fix if identified
   - Re-deploy with fix if viable
   - Re-evaluate gate status
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to Engineering Manager and Release Manager
   - Execute full rollback if not already done
   - Schedule postmortem within 24 hours
   - Document findings and root cause
   - Block subsequent deployments until resolved

## Web Research Verification

- [ ] Search the web: "post-deployment verification SaaS best practices {date}" - Verify deployment verification patterns
- [ ] Search the web: "multi-tenant rollback strategies patterns {date}" - Confirm rollback approaches are current
- [ ] _Source: [URL]_ citations documented for key post-deployment decisions

## Related Workflows

- `bmad-bam-api-version-release` - Release management
- `bmad-bam-tenant-aware-observability` - Post-deployment monitoring
- `bmad-bam-disaster-recovery-design` - Rollback procedures
- `bmad-bam-incident-response-operations` - Incident handling if rollback triggered

**PASS CRITERIA:** All checkboxes completed, no rollback triggers, 30-minute observation clean
**OWNER:** DevOps/SRE Team
**REVIEWERS:** On-call Engineer, Release Manager
