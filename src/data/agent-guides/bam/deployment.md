# BAM Deployment Strategies Guide

**When to load:** During Phase 4 (Implementation) when designing SaaS deployment patterns, or when implementing blue-green deployments, canary releases, feature flags, or tenant-scoped rollouts.

**Integrates with:** DevOps agent, Architect (Atlas persona), Dev agent

---

## Core Concepts

### What is SaaS Deployment?

SaaS deployment involves releasing software changes to a multi-tenant platform while ensuring zero-downtime, tenant isolation, and controlled rollout. Unlike single-tenant systems, changes must consider impact across all tenants.

### Deployment Models

| Model | Risk | Rollback | Tenant Control |
|-------|------|----------|----------------|
| Blue-Green | Low | Instant | All at once |
| Canary | Medium | Fast | Percentage-based |
| Rolling | Medium | Gradual | Instance-based |
| Tenant-Scoped | Lowest | Per-tenant | Full control |

---

## Application Guidelines

When implementing deployment strategies for multi-tenant systems:

1. **Always deploy to staging first**: Test changes against representative tenant configurations
2. **Use feature flags for tenant-scoped rollouts**: Enable gradual exposure and quick rollback
3. **Maintain instant rollback capability**: Blue-green deployments enable sub-second recovery
4. **Run database migrations separately**: Schema changes should not block application deployments
5. **Monitor error rates during rollout**: Automated rollback triggers protect all tenants

---

## Implementation Patterns

### Pattern 1: Blue-Green Deployment

```
┌─────────────────────────────────────────────────────────┐
│              Blue-Green Deployment                       │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │              Load Balancer                   │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│          ┌───────────┴───────────┐                      │
│          │                       │                       │
│          ▼                       ▼                       │
│   ┌─────────────┐         ┌─────────────┐               │
│   │    Blue     │         │    Green    │               │
│   │  (Active)   │         │  (Standby)  │               │
│   │   v2.1.0    │         │   v2.2.0    │               │
│   │             │         │             │               │
│   │ 100% traffic│         │  0% traffic │               │
│   └─────────────┘         └─────────────┘               │
│                                                          │
│   Cutover: Switch LB target Blue ──► Green              │
│   Rollback: Switch LB target Green ──► Blue             │
└─────────────────────────────────────────────────────────┘
```

**Blue-Green Checklist:**

| Phase | Action | Verification |
|-------|--------|--------------|
| Pre-deploy | Deploy to standby | Health checks pass |
| Validation | Run smoke tests | All tests green |
| Cutover | Switch traffic | Monitor errors |
| Monitor | Watch metrics | Error rate < 0.1% |
| Cleanup | Decommission old | Remove after 24h |

### Pattern 2: Canary Release

```
┌─────────────────────────────────────────────────────────┐
│              Canary Release Progression                  │
│                                                          │
│   Stage 1 (1%)     Stage 2 (10%)    Stage 3 (50%)       │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐        │
│   │ Canary   │     │ Canary   │     │ Canary   │        │
│   │  v2.2.0  │     │  v2.2.0  │     │  v2.2.0  │        │
│   │   1%     │────►│   10%    │────►│   50%    │───►100%│
│   └──────────┘     └──────────┘     └──────────┘        │
│                                                          │
│   Promotion Criteria:                                    │
│   ├── Error rate < 0.1%                                 │
│   ├── Latency p99 < baseline + 10%                      │
│   └── No critical alerts                                │
│                                                          │
│   Auto-Rollback Triggers:                               │
│   ├── Error rate > 1%                                   │
│   ├── Latency p99 > baseline + 50%                      │
│   └── Any critical alert                                │
└─────────────────────────────────────────────────────────┘
```

**Canary Configuration:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| initial_percent | 1% | Starting traffic |
| increment | 10%, 25%, 50% | Step increases |
| bake_time | 15 minutes | Time per stage |
| success_rate | 99.9% | Required threshold |
| rollback_threshold | 99% | Auto-rollback trigger |

### Pattern 3: Feature Flags

```
┌─────────────────────────────────────────────────────────┐
│              Feature Flag Architecture                   │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │           Feature Flag Service               │       │
│   │                                              │       │
│   │   flag_name        │ status  │ targeting   │       │
│   │   ─────────────────┼─────────┼──────────── │       │
│   │   new_ai_model     │ enabled │ enterprise  │       │
│   │   bulk_export      │ enabled │ tenant_list │       │
│   │   beta_dashboard   │ enabled │ 10% users   │       │
│   │   deprecated_api   │ disabled│ all         │       │
│   └─────────────────────────────────────────────┘       │
│                      │                                   │
│                      ▼                                   │
│   ┌─────────────────────────────────────────────┐       │
│   │            Application Code                  │       │
│   │                                              │       │
│   │   if (featureFlag.isEnabled("new_ai_model", │       │
│   │                              tenantContext)) │       │
│   │       useNewModel();                        │       │
│   │   else                                       │       │
│   │       useOldModel();                        │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

**Flag Targeting Rules:**

| Rule Type | Example | Use Case |
|-----------|---------|----------|
| Tenant tier | tier = enterprise | Premium features |
| Tenant list | tenant_id IN [...] | Beta testers |
| Percentage | 10% of users | Gradual rollout |
| User attribute | role = admin | Admin features |
| Time-based | after {date}-02-01 | Scheduled launch |

### Pattern 4: Tenant-Scoped Deployment

```
┌─────────────────────────────────────────────────────────┐
│           Tenant-Scoped Deployment Flow                  │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │            Deployment Orchestrator           │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│          ┌───────────┼───────────┐                      │
│          │           │           │                       │
│          ▼           ▼           ▼                       │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│   │ Tenant A │ │ Tenant B │ │ Tenant C │               │
│   │  v2.2.0  │ │  v2.1.0  │ │  v2.2.0  │               │
│   │ (updated)│ │ (pending)│ │ (updated)│               │
│   └──────────┘ └──────────┘ └──────────┘               │
│                                                          │
│   Tenant B opted out of auto-update                     │
│   Will receive v2.2.0 in maintenance window             │
└─────────────────────────────────────────────────────────┘
```

**Tenant Update Policies:**

| Policy | Behavior | Tenant Type |
|--------|----------|-------------|
| Auto-update | Immediate rollout | Standard |
| Scheduled | Maintenance window | Enterprise |
| Opt-out | Manual trigger | Regulated |
| Early-access | First in canary | Beta partners |

---

## Database Migrations

### Migration Strategy

| Change Type | Strategy | Downtime |
|-------------|----------|----------|
| Add column | Online | None |
| Add index | Background | None |
| Rename column | Expand-contract | None |
| Drop column | Multi-phase | None |
| Schema change | Blue-green DB | Brief |

### Expand-Contract Pattern

```
Phase 1 (Expand):  Add new_column, write to both
Phase 2 (Migrate): Backfill new_column from old_column  
Phase 3 (Switch):  Read from new_column
Phase 4 (Contract): Remove old_column
```

---

## Rollback Procedures

### Automatic Rollback Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 1% | Immediate rollback |
| Latency p99 | > 2x baseline | Investigate, then rollback |
| Health checks | < 80% healthy | Immediate rollback |
| Customer reports | > 5 in 15min | Manual review |

### Rollback Checklist

| Step | Action | Owner |
|------|--------|-------|
| 1 | Trigger rollback | On-call |
| 2 | Verify traffic shift | Platform |
| 3 | Confirm old version healthy | On-call |
| 4 | Create incident | On-call |
| 5 | Post-mortem | Team |

---

## Monitoring During Deploy

| Metric | Source | Alert |
|--------|--------|-------|
| Error rate | APM | > 0.5% |
| Request latency | APM | p99 > baseline + 20% |
| CPU/Memory | Infrastructure | > 80% |
| Active connections | Database | > 90% capacity |
| Queue depth | Message broker | > 1000 |

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Zero downtime required? | Blue-green or canary |
| Need tenant control? | Tenant-scoped + feature flags |
| Database schema change? | Expand-contract pattern |
| High-risk change? | Canary with low initial % |
| Compliance requirements? | Scheduled maintenance window |

---

## Related Patterns

- `disaster-recovery` guide for DR procedures
- `observability` guide for monitoring setup
- `deployment` pattern in `bam-patterns.csv`
- `api-version-release` workflow for versioning

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `deployment` | `SaaS deployment strategies multi-tenant SaaS {date}` |
| `deployment` | `feature flag patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

## Related Workflows

- `bmad-bam-disaster-recovery-design` - Design rollback and recovery procedures
- `bmad-bam-tenant-onboarding-design` - Configure tenant-scoped deployment policies
- `bmad-bam-convergence-verification` - Verify deployment convergence across modules
