# Deployment - BAM Domain Context

**Loaded by:** DevOps agents, Platform architects  
**Related Workflows:** bmad-bam-production-readiness, bmad-bam-llm-versioning

---

## Overview

Deployment patterns for multi-tenant SaaS encompass release strategies, environment management, and tenant-aware rollout mechanisms that ensure safe, isolated deployments.

## Core Concepts

### Deployment Strategies

| Strategy | Tenant Impact | Rollback Speed | Use Case |
|----------|---------------|----------------|----------|
| Blue-Green | Zero downtime | Instant | Major releases |
| Canary | Progressive exposure | Fast | Feature validation |
| Rolling | Minimal downtime | Moderate | Regular updates |
| Feature Flags | Per-tenant control | Instant | Gradual rollout |

### Tenant-Aware Deployment

```
Release Pipeline
    │
    ▼
┌─────────────────┐
│ Canary (5%)     │ ← Selected test tenants
└────────┬────────┘
         │ Metrics OK?
         ▼
┌─────────────────┐
│ Progressive     │ ← Tier-based rollout
│ (Free → Pro →   │
│  Enterprise)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Full Rollout    │ ← All tenants
└─────────────────┘
```

## Decision Matrix

| Requirement | Strategy | Rationale |
|-------------|----------|-----------|
| Zero-downtime required | Blue-Green | Instant switchover |
| Risk mitigation | Canary | Early problem detection |
| Tenant-specific testing | Feature Flags | Per-tenant control |
| Resource constrained | Rolling | Lower infrastructure cost |

## Quality Checks

- [ ] Deployment does not affect tenant isolation
- [ ] Rollback procedure tested and documented
- [ ] **CRITICAL:** Canary metrics include tenant-specific SLOs
- [ ] Feature flags respect tenant tier boundaries

## Web Research Queries

- "Multi-tenant SaaS deployment strategies {date}"
- "Canary deployment tenant isolation patterns {date}"
- "Blue-green deployment Kubernetes multi-tenant {date}"
