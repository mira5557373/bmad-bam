# BAM Production Deployment Guide

**When to load:** During Phase 4 (Implementation) when preparing for production deployment,
or when user mentions deployment strategies, release management, or rollback procedures.

**Integrates with:** DevOps (Extension), prg-gate-setup, convergence-verification

---

## Core Concepts

### Production Deployment Models

Multi-tenant AI platforms require careful deployment strategies that maintain tenant isolation during updates while minimizing downtime and risk.

```
┌─────────────────────────────────────────────────────┐
│                  Load Balancer                       │
│              (Tenant-Aware Routing)                  │
└─────────────┬─────────────────────────┬─────────────┘
              │                         │
              ▼                         ▼
     ┌─────────────────┐      ┌─────────────────┐
     │   Blue (v1.0)   │      │  Green (v1.1)   │
     │  ┌───────────┐  │      │  ┌───────────┐  │
     │  │ Tenant A  │  │      │  │ Tenant A  │  │
     │  │ Tenant B  │  │◄─────│  │ (canary)  │  │
     │  │ Tenant C  │  │      │  └───────────┘  │
     │  └───────────┘  │      │                 │
     └─────────────────┘      └─────────────────┘
```

### Deployment Strategy Matrix

| Strategy | Risk Level | Downtime | Tenant Impact | Rollback Speed |
|----------|------------|----------|---------------|----------------|
| **Blue-Green** | Low | Zero | All at once | Immediate |
| **Canary** | Very Low | Zero | Progressive | Fast |
| **Rolling** | Medium | Zero | Progressive | Medium |
| **Recreate** | High | Yes | All at once | Slow |
| **A/B Testing** | Low | Zero | Controlled | Immediate |

### Tenant-Aware Deployment Phases

| Phase | Description | Tenant Selection |
|-------|-------------|------------------|
| **Internal** | Deploy to internal tenants first | `tier = internal` |
| **Beta** | Expand to beta/early-adopter tenants | `tier = beta` |
| **Canary** | Small percentage of production | `random(5%)` |
| **Rollout** | Progressive production expansion | `region-based` |
| **Full** | All production tenants | `tier = production` |

## Application Guidelines

### 1. Implement Progressive Rollout

Never deploy changes to all tenants simultaneously. Use tenant tiers to progressively validate changes before full production rollout. Start with internal tenants, then beta customers, then a small canary percentage of production.

**Recommended Progression:**
- Internal (0-2 hours): Catch obvious issues
- Beta (2-24 hours): Validate with real usage patterns
- Canary 5% (24-48 hours): Monitor metrics at scale
- Canary 25% (48-72 hours): Expand if metrics stable
- Full rollout: Complete deployment

### 2. Maintain Tenant Data Isolation During Deployment

During deployment, ensure tenant data isolation is maintained even when different tenants are running different versions. Schema migrations must be backward-compatible during the rollout window.

**Database Migration Rules:**
- Add columns before code deployment
- Remove columns only after full rollout
- Never rename columns mid-deployment
- Use feature flags for new functionality

### 3. Configure Automatic Rollback Triggers

Define automatic rollback triggers based on tenant-scoped metrics. If error rates or latency exceed thresholds for any tenant, automatically route that tenant back to the previous version.

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 1% for 5 min | Auto-rollback affected tenants |
| P99 latency | > 2x baseline | Alert + manual review |
| AI confidence | < 0.7 average | Rollback AI components |
| Failed actions | > 10 per tenant/hour | Tenant-specific rollback |

### 4. Deploy AI Components Separately

AI model updates and agent configuration changes should follow a separate deployment pipeline from application code. This allows for faster iteration on AI components while maintaining stability of core services.

**AI Deployment Isolation:**
- Model versions tracked independently
- A/B testing for model changes
- Confidence threshold validation
- Rollback based on accuracy metrics

### 5. Verify PRG Checks Before Deployment

The Production-Readiness Gate (PRG) must pass all 10 mandatory checks before any production deployment. No exceptions without explicit sign-off from the release manager and documentation in the incident log.

## Decision Framework

| Scenario | Recommended Strategy | Key Considerations |
|----------|---------------------|-------------------|
| Minor bug fix | Rolling deployment | Fast rollout, easy rollback |
| New feature | Canary with feature flag | Test with subset first |
| AI model update | Separate AI pipeline | Validate accuracy before full rollout |
| Database schema change | Blue-green with migration | Zero-downtime migration |
| Security patch | Fast-track rolling | Minimize exposure window |
| Major version | Blue-green with beta | Extended validation period |

## Related Workflows

- `bmad-bam-prg-gate-setup` - Configure PRG checks
- `bmad-bam-convergence-verification` - Pre-deployment verification
- `bmad-bam-disaster-recovery-drill` - Recovery procedure validation
- `bmad-bam-api-version-release` - API versioning during deployment

## Related Patterns

Load from pattern registry:

- **Deployment patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `deployment-*`
- **Rollback patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rollback-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "blue-green deployment multi-tenant SaaS {date}"
- Search: "canary deployment AI systems {date}"
- Search: "zero-downtime database migration patterns {date}"
