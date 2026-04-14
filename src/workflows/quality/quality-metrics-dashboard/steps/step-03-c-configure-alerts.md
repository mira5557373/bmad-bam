# Step 3: Configure Quality Alerts

## Purpose

Configure alerts for quality metric thresholds and anomalies.

## Prerequisites

- Metrics defined
- Visualizations designed

## Actions

### 1. Define Alert Thresholds

| Alert | Metric | Threshold | Severity | Action |
|-------|--------|-----------|----------|--------|
| Quality Score Drop | Overall Score | < 80% | High | Notify team |
| Gate Failure | Any gate | FAIL | Critical | Page on-call |
| Coverage Drop | Test coverage | > 5% drop | Medium | Notify team |
| Compliance Risk | Compliance score | < 95% | High | Notify compliance |
| Evidence Stale | Evidence age | > 30 days | Medium | Notify owner |

### 2. Define Alert Routing

| Severity | Channel | Escalation | SLA |
|----------|---------|------------|-----|
| Critical | PagerDuty | Immediate | 15 min |
| High | Slack + Email | 30 min | 1 hour |
| Medium | Email | 4 hours | 24 hours |
| Low | Dashboard only | None | N/A |

### 3. Configure Alert Aggregation

| Rule | Condition | Aggregation |
|------|-----------|-------------|
| De-duplicate | Same alert in 5 min | Suppress |
| Escalate | 3 same alerts in 1 hour | Increase severity |
| Auto-resolve | Metric returns to normal | Close alert |

### 4. Define Tenant-Specific Alerts (Enterprise)

| Alert | Tenant Filter | Threshold | Notification |
|-------|---------------|-----------|--------------|
| Tenant Quality Drop | Enterprise | < 85% | CSM notification |
| Tenant Compliance | Enterprise | Issue found | Direct contact |

## Web Research Verification

Search the web: "quality alert configuration best practices {date}"
Search the web: "PagerDuty alerting patterns SaaS {date}"

## Verification

- [ ] Alert thresholds defined
- [ ] Routing configured
- [ ] Aggregation rules set
- [ ] Tenant alerts configured

## Outputs

- Alert configuration spec

## Next Step

Proceed to `step-04-c-tenant-filtering.md` with alert config.
