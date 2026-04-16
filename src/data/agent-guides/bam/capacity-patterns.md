# BAM Capacity Patterns Guide

**When to load:** During scaling design, resource planning, quota management, or when implementing capacity controls for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), DevOps, SRE teams.

---

## Core Concepts

### Scaling Strategies for Multi-Tenant

| Strategy | Description | Multi-Tenant Consideration |
|----------|-------------|---------------------------|
| Horizontal | Add more instances | Tenant-agnostic, preferred |
| Vertical | Increase instance size | Limited, use for DB |
| Tenant-Sharded | Dedicated resources per tenant | Enterprise tier only |
| Hybrid | Shared + dedicated pools | Mixed workloads |

### Per-Tenant Quotas

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API Calls/day | 1,000 | 100,000 | Unlimited |
| Storage (GB) | 1 | 50 | 500+ |
| Users | 3 | 25 | Unlimited |
| AI Tokens/mo | 10K | 500K | Custom |
| Concurrent Sessions | 5 | 50 | 500 |

### Quota Enforcement Points

| Layer | Enforcement | Response |
|-------|-------------|----------|
| API Gateway | Rate limiting | 429 Too Many Requests |
| Application | Usage checking | Feature gating |
| Database | Storage limits | Write rejection |
| Background Jobs | Job quotas | Queue throttling |

### Noisy Neighbor Detection

| Signal | Detection | Threshold |
|--------|-----------|-----------|
| CPU Usage | Per-tenant tracking | > 2 std dev |
| Memory | Container metrics | > quota |
| Requests | Rate counter | > tier limit |
| Storage Growth | Daily delta | > 10% daily |

### Auto-Scaling Triggers

| Metric | Scale Out | Scale In |
|--------|-----------|----------|
| CPU | > 70% for 5min | < 30% for 15min |
| Memory | > 80% | < 40% |
| Request Queue | > 100 pending | < 10 pending |
| Pod Count | < min replicas | > max replicas |

### Capacity Planning Formula

```
Required Capacity = 
  (Peak Tenant Load × Tenant Count × Growth Factor) 
  ÷ Utilization Target

Where:
- Peak Tenant Load: p99 resource usage per tenant
- Growth Factor: 1.5 for 6-month projection
- Utilization Target: 0.7 (70% target utilization)
```

---

## Application Guidelines

When implementing capacity in a multi-tenant context:

1. **Right-size tenant quotas** - Analyze actual usage patterns before setting limits
2. **Implement soft limits first** - Warn before hard enforcement
3. **Plan for burst capacity** - Allow temporary overages with alerts
4. **Monitor per-tenant growth** - Identify fast-growing tenants early
5. **Reserve capacity for enterprise** - Dedicated pools for high-value tenants
6. **Use predictive scaling** - Scale based on historical patterns

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How to set initial quotas? | Start generous, tighten based on data | Avoid customer friction |
| When to scale horizontally? | 70% average CPU/memory utilization | Leave headroom for bursts |
| Should enterprise have dedicated resources? | Yes, for isolation and performance SLAs | Enterprise pays for guarantees |
| How to handle quota overages? | Soft limit (warn) then hard limit (block) | Grace period before enforcement |
| How often to review capacity? | Monthly + after major releases | Stay ahead of demand |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Capacity patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `capacity-*`
- **Scaling patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `scaling-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant capacity planning SaaS {date}"
- Search: "Kubernetes auto-scaling multi-tenant {date}"
- Search: "SaaS quota management patterns {date}"

---

## Related Workflows

- `bmad-bam-capacity-planning-review` - Conduct capacity reviews
- `bmad-bam-auto-scaling-configuration` - Configure auto-scaling
- `bmad-bam-pricing-tier-configuration` - Define tier-based quotas
