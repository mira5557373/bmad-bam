# BAM Multi-Region Deployment Guide

**When to load:** During Phase 3 (Solutioning) when designing global deployments,
or when user mentions multi-region, geo-distribution, data residency, regional failover, tenant pinning.

**Integrates with:** Architect (Platform Design), DevOps (Infrastructure), Security (Compliance)

---

## Core Concepts

### Data Residency Requirements

Multi-region deployments must respect tenant data residency requirements while maintaining performance.

| Requirement | Regions | Data Allowed |
|-------------|---------|--------------|
| GDPR | EU only | PII in EU, metadata global |
| Data localization | Specific country | All data in designated region |
| Sovereignty | Government-approved | Certified data centers only |
| Performance | Any | Closest to users |

### Multi-Region Architecture

```
┌─────────────────────────────────────────────────┐
│              Global Load Balancer                │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Router (region affinity)         │    │
│  └─────────────────────────────────────────┘    │
│         │              │              │         │
│    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐   │
│    │ US-East │    │EU-West  │    │AP-South │   │
│    │ Region  │    │ Region  │    │ Region  │   │
│    └────┬────┘    └────┬────┘    └────┬────┘   │
│         │              │              │         │
│    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐   │
│    │Regional │    │Regional │    │Regional │   │
│    │Database │    │Database │    │Database │   │
│    └─────────┘    └─────────┘    └─────────┘   │
└─────────────────────────────────────────────────┘
```

### Tenant Region Assignment

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Affinity | Assign to nearest region | Performance optimization |
| Pinning | Lock to specific region | Data residency compliance |
| Following | Move with user activity | Global workforce |
| Multi-home | Replicate across regions | Enterprise HA |

---

## Application Guidelines

When implementing multi-region deployment:

1. **Map compliance requirements** - Identify data residency constraints per tenant
2. **Design region topology** - Primary, secondary, edge locations
3. **Implement tenant routing** - Direct traffic to correct region
4. **Plan data replication** - Sync strategy for regional consistency
5. **Configure failover** - Automatic and manual failover procedures

---

## Regional Routing

### Routing Decision Matrix

| Factor | Weight | Implementation |
|--------|--------|----------------|
| Tenant pinning | Highest | Override all other rules |
| Compliance | High | Route to compliant regions only |
| Latency | Medium | GeoDNS + anycast |
| Cost | Low | Prefer cheaper regions when equal |

### Tenant Routing Table

| Tenant Tier | Routing Strategy | Failover |
|-------------|------------------|----------|
| Free | Nearest region | No guarantee |
| Pro | Affinity + backup | Auto (5 min) |
| Enterprise | Pinned + hot standby | Auto (< 1 min) |

### Request Flow

```
┌─────────────────────────────────────────────────┐
│                Request Flow                      │
│                                                  │
│  1. DNS → GeoDNS returns nearest edge           │
│  2. Edge → Check tenant_id in JWT               │
│  3. Lookup → Tenant registry returns region     │
│  4. Route → Forward to assigned region          │
│  5. Process → Execute in regional cluster       │
│  6. Return → Response via same path             │
└─────────────────────────────────────────────────┘
```

---

## Data Replication

### Replication Strategies

| Strategy | Latency | Consistency | Use Case |
|----------|---------|-------------|----------|
| Sync | High | Strong | Financial, critical data |
| Async | Low | Eventual | Most SaaS data |
| Semi-sync | Medium | Session | User-facing features |

### What to Replicate

| Data Type | Replication | Rationale |
|-----------|-------------|-----------|
| User sessions | Global | Access from any region |
| Tenant config | Global | Fast local access |
| Transactional data | Regional primary | Consistency |
| Analytics | Async to central | Not latency-sensitive |
| Vectors/Embeddings | Regional primary | Performance |

### Conflict Resolution

| Scenario | Resolution | Implementation |
|----------|------------|----------------|
| Concurrent writes | Last-write-wins | Timestamp-based |
| Region partition | Queue for reconciliation | Event sourcing |
| Schema mismatch | Version negotiation | Migration scripts |

---

## Failover Strategy

### Failover Types

| Type | Trigger | RTO | Data Loss Risk |
|------|---------|-----|----------------|
| Automatic | Health check failure | 1-5 min | Minimal (sync lag) |
| Manual | Ops decision | 15-30 min | None (controlled) |
| Planned | Maintenance window | 0 (warm) | None |

### Failover Procedure

| Step | Action | Duration |
|------|--------|----------|
| 1 | Detect primary failure | 30 sec |
| 2 | Verify secondary health | 10 sec |
| 3 | Promote secondary | 30 sec |
| 4 | Update DNS/routing | 60 sec |
| 5 | Redirect traffic | Progressive |
| 6 | Notify affected tenants | Immediate |

### Failback Considerations

| Factor | Check | Action |
|--------|-------|--------|
| Data sync | All data replicated | Wait if behind |
| Health | Primary fully recovered | Verify all services |
| Traffic | Off-peak hours | Schedule if possible |
| Tenants | No active operations | Coordinate with enterprise |

---

## Tenant Pinning

### Pinning Levels

| Level | Scope | Enforcement |
|-------|-------|-------------|
| Hard | All data, all time | Cannot leave region |
| Soft | Data at rest | Processing can be global |
| Hybrid | PII pinned, metadata global | Field-level rules |

### Pinning Implementation

| Component | Implementation | Validation |
|-----------|----------------|------------|
| Database | Region-specific instance | Connection string check |
| Object storage | Regional bucket | Bucket policy |
| Cache | Regional cluster | Key prefix |
| Vector store | Regional namespace | Namespace validation |

---

## Cost Optimization

### Multi-Region Cost Factors

| Factor | Cost Impact | Mitigation |
|--------|-------------|------------|
| Data egress | High | Cache at edge, minimize sync |
| Idle standby | Medium | Right-size warm standby |
| Replication | Medium | Async where possible |
| Multiple deployments | Medium | Containerization, automation |

### Tier-Based Regional Strategy

| Tier | Regions | Redundancy | Cost Factor |
|------|---------|------------|-------------|
| Free | 1 (nearest) | None | 1x |
| Pro | 2 (primary + backup) | Warm | 1.5x |
| Enterprise | 3+ (active-active) | Hot | 2-3x |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| EU customer, GDPR | EU-West pinning | Legal requirement |
| Global team | Multi-region active | Performance for all |
| Cost-sensitive | Single region + edge cache | Balance cost/perf |
| Government contract | Sovereign cloud | Compliance mandate |
| High availability SLA | Active-active | Minimize downtime |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Multi-region in platform design
- `bmad-bam-disaster-recovery-design` - Regional failover procedures
- `bmad-bam-tenant-onboarding-design` - Region assignment during onboarding

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `deployment-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "multi-region SaaS deployment patterns {date}"
- Search: "data residency compliance multi-tenant {date}"
- Search: "global load balancing tenant routing {date}"
