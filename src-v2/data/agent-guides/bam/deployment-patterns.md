# BAM Deployment Patterns Guide

**When to load:** During CI/CD design, release management, feature flag implementation, or when designing deployment pipelines for multi-tenant SaaS platforms.

**Integrates with:** James (Dev), DevOps, Release managers.

---

## Core Concepts

### Deployment Strategies for Multi-Tenant

| Strategy | Description | Multi-Tenant Consideration |
|----------|-------------|---------------------------|
| Blue-Green | Two environments, instant switch | All tenants switch together |
| Canary | Gradual rollout to percentage | Can target by tenant tier |
| Rolling | Incremental pod replacement | Minimal downtime |
| Feature Flags | Runtime feature control | Per-tenant feature gating |

### Tenant-Aware Rollouts

| Rollout Phase | Tenants Included | Duration |
|---------------|-----------------|----------|
| Internal | Staff tenants | 1 day |
| Early Adopters | Opt-in tenants | 2-3 days |
| Pro Tier | All Pro tenants | 1 week |
| General | All tenants | Complete |
| Enterprise | Scheduled windows | Per contract |

### Feature Flags for Multi-Tenant

| Flag Type | Use Case | Example |
|-----------|----------|---------|
| Release Flag | Hide incomplete features | `feature.new_dashboard` |
| Tier Flag | Limit to paid tiers | `tier.pro.analytics` |
| Tenant Flag | Specific tenant override | `tenant.abc.beta` |
| Kill Switch | Emergency disable | `kill.ai_agent` |

### CI/CD Pipeline Stages

```
Code → Build → Test → Staging → Canary → Production
                         │
                         ├── Tenant Smoke Tests
                         ├── Tier-Specific Validation
                         └── Rollback Checkpoint
```

### Database Migration in Multi-Tenant

| Migration Type | Strategy | Risk |
|----------------|----------|------|
| Schema Change | Online DDL, zero downtime | Low |
| Data Migration | Background jobs, tenant-by-tenant | Medium |
| Breaking Change | Feature flag + dual-write | High |

### Rollback Strategies

| Scenario | Rollback Method | Time to Recover |
|----------|-----------------|-----------------|
| Application Bug | Kubernetes rollback | < 5 min |
| Database Migration | Backward-compatible migrations | < 15 min |
| Feature Issue | Feature flag disable | < 1 min |
| Full Incident | Blue-green switch | < 2 min |

---

## Application Guidelines

When implementing deployments in a multi-tenant context:

1. **Always use feature flags for new features** - Enables per-tenant rollout and rollback
2. **Test with representative tenant data** - Include diverse tenant configurations
3. **Implement tenant-specific rollback** - Ability to revert single tenant if needed
4. **Schedule enterprise deployments** - Respect maintenance windows in contracts
5. **Monitor deployment health per tenant** - Watch error rates during rollout
6. **Use database migrations that support rollback** - Never break backward compatibility

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which deployment strategy? | Canary with feature flags | Safest for multi-tenant |
| How to handle enterprise maintenance windows? | Scheduled deployments with notification | Contract compliance |
| Should we deploy to all tenants at once? | No, phased rollout by tier | Limit blast radius |
| How to handle database migrations? | Online DDL + backward-compatible | Zero downtime |
| What triggers automatic rollback? | Error rate > 2x baseline | Protect tenant experience |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Deployment patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `deployment-*`
- **CI/CD patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `cicd-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS deployment patterns {date}"
- Search: "feature flags multi-tenant best practices {date}"
- Search: "zero downtime deployment strategies {date}"

---

## Related Workflows

- `bmad-bam-cicd-pipeline-design` - Design CI/CD pipeline
- `bmad-bam-model-deployment-pipeline` - Deploy AI models
- `bmad-bam-change-management-process` - Manage deployment changes
