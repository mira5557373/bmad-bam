# Platform Operator Guide - BAM Extension

**When to load:** When performing day-2 operations, tenant management tasks, platform maintenance, or when user mentions operations, tenant provisioning, platform maintenance, or operational runbooks.
**Integrates with:** Dev (bmad-agent-dev), Architect (bmad-agent-architect)

This guide provides BAM-specific context for platform operators managing day-to-day operations of multi-tenant agentic AI platforms, distinct from DevOps (infrastructure/CI-CD focus) and SRE (reliability focus).

---

## Role Context

As a platform operator on a BAM project, you focus on:
- Managing day-to-day tenant lifecycle operations
- Executing provisioning, suspension, and offboarding runbooks
- Monitoring platform health and capacity
- Performing maintenance with minimal tenant impact
- Responding to operational issues with documented procedures

---

## Core Concepts

### Platform Operations Model

Platform operations focuses on the ongoing health and management of the tenant ecosystem. While DevOps handles infrastructure and deployments, and SRE focuses on reliability, platform operators manage tenant lifecycle operations, platform health monitoring, and operational interventions.

### Operational Domains

| Domain | Scope | Key Activities |
|--------|-------|----------------|
| Tenant Operations | Individual tenant management | Provisioning, config, suspension |
| Platform Health | Overall platform status | Monitoring, alerting, trending |
| Maintenance | Scheduled platform work | Updates, migrations, cleanup |
| Intervention | Reactive operations | Incident support, manual fixes |

---

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| Tenant requests manual config | Use self-service if available | Reduce operational burden |
| Tenant data corrupted | Restore from backup with tenant isolation | Minimize blast radius |
| Platform capacity warning | Scale proactively | Prevent tenant impact |
| Tenant suspension required | Follow suspension runbook | Ensure reversibility |
| Batch job backlog growing | Increase worker capacity | Prevent SLA breach |
| AI model degradation | Trigger fallback chain | Maintain service quality |

---

## Tenant Operations

### Tenant Lifecycle Operations

| Operation | Trigger | Runbook | Reversible |
|-----------|---------|---------|------------|
| Provisioning | New signup/contract | `tenant-provisioning` | Yes |
| Activation | First login | Automatic | N/A |
| Tier upgrade | Self-service/sales | `tenant-tier-change` | Yes |
| Tier downgrade | Self-service/sales | `tenant-tier-change` | Yes |
| Suspension | Non-payment/abuse | `tenant-suspension` | Yes |
| Reactivation | Payment/resolution | `tenant-reactivation` | N/A |
| Offboarding | Churn/request | `tenant-offboarding` | Limited |
| Data deletion | Request/retention | `tenant-deletion` | No |

### Tenant Provisioning Checklist

| Step | Automated | Verification |
|------|-----------|--------------|
| Create tenant record | Yes | Tenant ID exists |
| Provision database resources | Yes | Schema/DB accessible |
| Configure RLS policies | Yes | RLS test passes |
| Set up initial users | Yes | Admin can login |
| Apply tier configuration | Yes | Limits enforced |
| Initialize AI runtime | Yes | Agent creation works |
| Send welcome notification | Yes | Email delivered |
| Add to monitoring | Yes | Dashboard populated |

### Tenant Suspension Process

```
Suspension Triggered
├── Verify suspension reason
│   ├── Non-payment (grace period elapsed)
│   ├── Abuse detection (security team approval)
│   └── Customer request
│
├── Pre-suspension steps
│   ├── Notify tenant admin (if not abuse)
│   ├── Export critical data (if requested)
│   └── Document suspension reason
│
├── Execute suspension
│   ├── Disable user authentication
│   ├── Pause AI agent execution
│   ├── Stop background jobs
│   ├── Revoke API keys
│   └── Set tenant status to SUSPENDED
│
├── Post-suspension
│   ├── Retain data per retention policy
│   ├── Monitor for reactivation request
│   └── Document in tenant record
│
└── Data preserved for:
    └── 30 days (Free) / 90 days (Pro) / Per contract (Enterprise)
```

### Tenant Offboarding Process

```
Offboarding Initiated
├── Confirmation
│   ├── Verify authorization (tenant admin)
│   ├── Confirm data handling preference
│   └── Document reason for churn
│
├── Data handling
│   ├── Generate final data export
│   ├── Provide export to tenant
│   └── Get acknowledgment
│
├── Resource cleanup
│   ├── Revoke all access
│   ├── Archive audit logs
│   ├── Remove from active monitoring
│   └── Mark tenant for deletion
│
├── Data deletion (after retention period)
│   ├── Delete tenant data
│   ├── Remove database resources
│   ├── Purge caches
│   ├── Delete AI memory/vectors
│   └── Verify deletion complete
│
└── Finalization
    ├── Generate deletion certificate
    ├── Close tenant record
    └── Update churn metrics
```

---

## Platform Health Operations

### Daily Operations Checklist

| Time | Task | Owner | Tool |
|------|------|-------|------|
| 08:00 | Review overnight alerts | On-call | PagerDuty |
| 08:30 | Check platform health dashboard | Ops | Grafana |
| 09:00 | Review error rate trends | Ops | Datadog |
| 10:00 | Check queue depths | Ops | RabbitMQ console |
| 14:00 | Review capacity metrics | Ops | Cloud console |
| 16:00 | Check pending tenant requests | Ops | Ticketing |
| 17:00 | Handoff to next shift | Ops | Slack |

### Key Health Metrics

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| API error rate | > 1% | > 5% | Investigate, page |
| API latency p99 | > 500ms | > 2s | Investigate, page |
| Database connections | > 70% pool | > 90% pool | Scale, page |
| Queue depth | > 1000 | > 5000 | Scale workers |
| Storage utilization | > 70% | > 85% | Add storage |
| AI model latency | > 5s | > 30s | Check provider, fallback |

### Capacity Monitoring

| Resource | Current | Threshold | Projected Full |
|----------|---------|-----------|----------------|
| Compute nodes | 60% | 80% | Track weekly |
| Database storage | 45% | 70% | Track monthly |
| Cache memory | 55% | 80% | Track weekly |
| Message queue | 30% | 60% | Track daily |
| AI token budget | 70% | 90% | Track daily |

---

## Maintenance Operations

### Maintenance Window Types

| Type | Frequency | Tenant Impact | Notification |
|------|-----------|---------------|--------------|
| Hot maintenance | As needed | None | None |
| Rolling update | Weekly | Minimal (seconds) | In-app banner |
| Cold maintenance | Monthly | Minutes | 48h email + banner |
| Major upgrade | Quarterly | Extended | 2 weeks notice |

### Maintenance Runbook Template

```
Maintenance: [Name]
Scheduled: [Date/Time] ([Duration])
Impact: [Description of tenant impact]

Pre-Maintenance:
├── [ ] Notify tenants per notification policy
├── [ ] Verify backup completed
├── [ ] Confirm rollback procedure tested
├── [ ] Stage maintenance changes
└── [ ] Brief on-call team

Execution:
├── [ ] Enable maintenance mode (if needed)
├── [ ] Execute change steps
│   ├── [ ] Step 1: [Description]
│   ├── [ ] Step 2: [Description]
│   └── [ ] Step N: [Description]
├── [ ] Verify changes applied
├── [ ] Run smoke tests
└── [ ] Disable maintenance mode

Post-Maintenance:
├── [ ] Monitor for regressions (30 min)
├── [ ] Verify tenant services restored
├── [ ] Update status page
├── [ ] Document any issues
└── [ ] Close maintenance ticket

Rollback (if needed):
├── [ ] Decision criteria: [Describe]
├── [ ] Rollback steps
└── [ ] Communication steps
```

### Database Maintenance

| Task | Frequency | Impact | Automation |
|------|-----------|--------|------------|
| Vacuum/analyze | Daily | None | Automated |
| Index maintenance | Weekly | None | Automated |
| Statistics update | Daily | None | Automated |
| Bloat removal | Monthly | Minimal | Semi-automated |
| Schema migrations | Per release | Varies | CI/CD pipeline |

---

## Operational Interventions

### Common Manual Interventions

| Situation | Intervention | Authorization |
|-----------|--------------|---------------|
| Stuck background job | Restart job worker | Operator |
| Database connection leak | Restart application | Operator |
| Tenant config corruption | Restore from config history | Operator + Review |
| Cache inconsistency | Invalidate tenant cache | Operator |
| AI agent stuck | Kill agent run, refund tokens | Operator |
| Runaway query | Terminate query | Operator |

### Intervention Audit Requirements

Every manual intervention must log:
- Operator ID
- Tenant ID (if applicable)
- Timestamp
- Intervention type
- Reason/justification (ticket ID)
- Before/after state
- Outcome

### Emergency Procedures

| Emergency | Immediate Action | Escalation |
|-----------|-----------------|------------|
| Platform down | Page on-call, start incident | Incident commander |
| Security breach | Isolate, preserve evidence | Security + Exec |
| Data loss | Stop writes, assess scope | Engineering + Exec |
| Tenant data leak | Isolate tenant, investigate | Security + Legal |
| AI safety issue | Disable AI features | AI Safety + Engineering |

---

## AI Runtime Operations

### AI Operations Dashboard

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Model availability | % model endpoints responding | < 99.9% |
| Inference latency | Time to response (p99) | > 10s |
| Token throughput | Tokens processed per minute | Anomaly detection |
| Error rate | Failed inferences | > 1% |
| Cost rate | Spend per hour | Anomaly detection |

### AI Model Management

| Operation | Trigger | Process |
|-----------|---------|---------|
| Model update | New version available | Staged rollout |
| Model rollback | Quality degradation | Immediate rollback |
| Fallback activation | Primary unavailable | Automatic |
| Cost ceiling | Budget threshold | Throttle or block |

### AI Incident Response

```
AI Service Degradation Detected
├── Assess scope
│   ├── Which models affected?
│   ├── Which tenants affected?
│   └── What is the error pattern?
│
├── Immediate mitigation
│   ├── Activate fallback models
│   ├── Enable degraded mode
│   └── Increase timeouts if overloaded
│
├── Root cause investigation
│   ├── Check provider status
│   ├── Review recent changes
│   └── Analyze error patterns
│
└── Resolution
    ├── Apply fix or wait for provider
    ├── Restore primary model
    └── Document and postmortem
```

---

## Runbook Library

### Essential Runbooks

| Runbook | Purpose | Trigger |
|---------|---------|---------|
| `tenant-provisioning` | New tenant setup | Signup event |
| `tenant-suspension` | Suspend tenant access | Non-payment, abuse |
| `tenant-reactivation` | Restore suspended tenant | Payment, resolution |
| `tenant-offboarding` | Complete tenant removal | Churn |
| `tenant-data-export` | Generate data export | GDPR request |
| `database-failover` | Switch to database replica | Primary failure |
| `cache-invalidation` | Clear tenant cache | Data corruption |
| `ai-model-rollback` | Revert to previous model | Quality issue |
| `capacity-scale-up` | Add compute capacity | Capacity alert |
| `security-isolation` | Isolate compromised tenant | Security incident |

### Runbook Structure

Each runbook should include:
1. **Purpose** - What this runbook achieves
2. **Trigger** - When to use this runbook
3. **Prerequisites** - Required access and tools
4. **Steps** - Numbered, detailed steps
5. **Verification** - How to confirm success
6. **Rollback** - How to undo if needed
7. **Escalation** - When and who to escalate to

---

## Application Guidelines

When performing tenant operations:

1. **Verify authorization** - Confirm the request is legitimate
2. **Follow runbooks** - Use documented procedures
3. **Audit all actions** - Log what you did and why
4. **Minimize blast radius** - Isolate operations to affected tenant
5. **Verify outcomes** - Confirm the operation succeeded

When performing platform maintenance:

1. **Schedule appropriately** - Minimize tenant impact window
2. **Notify in advance** - Follow notification policies
3. **Have rollback ready** - Test rollback before maintenance
4. **Monitor closely** - Watch for issues during and after
5. **Document everything** - Record what was done and outcomes

When responding to operational issues:

1. **Assess impact first** - Understand what's affected
2. **Contain the blast radius** - Prevent spread
3. **Communicate status** - Keep stakeholders informed
4. **Fix systematically** - Follow runbooks, don't improvise
5. **Learn and improve** - Update runbooks with learnings

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design provisioning workflows
- `bmad-bam-tenant-offboarding-design` - Design offboarding workflows
- `bmad-bam-maintenance-window-design` - Design maintenance procedures
- `bmad-bam-runbook-automation` - Automate operational runbooks
- `bmad-bam-incident-response-operations` - Handle incidents

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`
- **Tenant lifecycle patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS platform operations {date}"
- Search: "tenant lifecycle management automation {date}"
- Search: "SaaS operational runbook best practices {date}"
- Search: "day-2 operations multi-tenant {date}"
