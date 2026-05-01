---
pattern_id: performance-isolation
shortcode: ZPI
category: scaling
qg_ref: QG-SC3
version: 1.0.0
last_reviewed: 2026-05-01
---

# Performance Isolation - BAM Pattern

**Loaded by:** ZPI  
**Applies to:** Multi-tenant SaaS platforms requiring noisy neighbor prevention

---

## When to Use

- Tenants share infrastructure but need performance guarantees
- SLA requirements differ by tenant tier
- Noisy neighbor problems affecting customer experience
- Resource-intensive tenants impacting others
- Need QoS guarantees per tenant tier

## When NOT to Use

- Single-tenant deployments
- All tenants have identical resource needs
- Full tenant isolation already via separate infrastructure
- Cost constraints prevent resource reservation

## Architecture

### Noisy Neighbor Problem

```
WITHOUT ISOLATION:
┌─────────────────────────────────────────────────────────────────┐
│                      Shared Resources                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Tenant A │  │ Tenant B │  │ Tenant C │  │ Tenant D │        │
│  │ (normal) │  │ (SPIKE!) │  │ (normal) │  │ (normal) │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│       ↓             ↓↓↓↓          ↓             ↓              │
│      10%           80%           5%            5%   ← CPU      │
│                     │                                          │
│            Tenant B starves others!                            │
└─────────────────────────────────────────────────────────────────┘

WITH ISOLATION:
┌─────────────────────────────────────────────────────────────────┐
│                    Isolated Resource Pools                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Free Tier    │  │ Pro Tier     │  │ Enterprise   │          │
│  │ Pool (shared)│  │ Pool (shared)│  │ (dedicated)  │          │
│  │ ┌──┐ ┌──┐   │  │ ┌──┐ ┌──┐   │  │ ┌──────────┐ │          │
│  │ │A │ │B │   │  │ │C │ │D │   │  │ │ E only   │ │          │
│  │ └──┘ └──┘   │  │ └──┘ └──┘   │  │ └──────────┘ │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│     Capped at 20%    Capped at 40%     Reserved 100%           │
└─────────────────────────────────────────────────────────────────┘
```

### Resource Isolation Strategies

| Strategy | Isolation Level | Cost | Use Case |
|----------|----------------|------|----------|
| Cgroups/namespaces | Process | Low | Container workloads |
| Resource quotas | Kubernetes | Low | K8s deployments |
| Separate node pools | VM | Medium | Tier separation |
| Dedicated instances | Full | High | Enterprise SLA |
| Separate clusters | Complete | Highest | Compliance requirements |

### Tenant-Tier Resource Allocation

```yaml
resource_isolation:
  tenant_id: uuid
  bam_controlled: true
  
  tiers:
    free:
      cpu_limit: "500m"
      memory_limit: "512Mi"
      network_bandwidth: "10Mbps"
      iops_limit: 100
      pool: shared_free
      burst_allowed: false
      
    pro:
      cpu_limit: "2000m"
      memory_limit: "4Gi"
      network_bandwidth: "100Mbps"
      iops_limit: 1000
      pool: shared_pro
      burst_allowed: true
      burst_duration_seconds: 60
      
    enterprise:
      cpu_request: "4000m"  # Guaranteed
      cpu_limit: "8000m"
      memory_request: "8Gi"
      memory_limit: "16Gi"
      network_bandwidth: "1Gbps"
      iops_limit: 10000
      pool: dedicated
      dedicated_nodes: true
```

### QoS Implementation

```
Request Arrives
      │
      ▼
┌─────────────┐
│ Identify    │
│ Tenant Tier │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Check       │────▶│ Apply       │
│ Resource    │     │ Throttling  │
│ Quota       │     │ if exceeded │
└──────┬──────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ Route to    │────▶│ Execute in  │
│ Tier Pool   │     │ Isolation   │
└─────────────┘     └─────────────┘
```

### Database Connection Isolation

| Tier | Pool Size | Max Connections | Priority |
|------|-----------|-----------------|----------|
| Free | Shared | 5 per tenant | Low |
| Pro | Shared | 20 per tenant | Medium |
| Enterprise | Dedicated | 100 | High |

### Monitoring Noisy Neighbors

```
Metrics to Track:
├── CPU usage per tenant (% of limit)
├── Memory usage per tenant
├── Network I/O per tenant
├── Disk IOPS per tenant
├── Request latency P99 per tenant
└── Queue depth per tenant

Alert Thresholds:
├── Tenant using >90% of quota for >5 min
├── Cross-tenant latency impact detected
├── Resource pool saturation >80%
└── Burst budget exhausted
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Soft limits (throttling) | Flexible, efficient | Degraded experience | Free tier |
| Hard limits (cgroups) | Strict isolation | Wasted capacity | Pro tier |
| Dedicated pools | Strong isolation | Higher cost | Enterprise |
| Request prioritization | Fair scheduling | Complex implementation | Mixed workloads |

## Quality Checks

- [ ] Resource limits defined per tenant tier
- [ ] Noisy neighbor detection alerts configured
- [ ] Burst policies documented per tier
- [ ] Pool sizing validated for expected load
- [ ] **CRITICAL:** No cross-tenant resource starvation possible

## Web Research Queries

- "noisy neighbor prevention multi-tenant SaaS {date}"
- "Kubernetes resource quotas multi-tenant {date}"
- "cgroups tenant isolation patterns {date}"
- "QoS multi-tenant cloud architecture {date}"
- "resource isolation container orchestration {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC3 | Performance isolation pattern implementation verified |

## Related Patterns

- [tenant-quotas.md](tenant-quotas.md) - Quota enforcement
- [tenant-isolation.md](tenant-isolation.md) - Tenant isolation models
- [vertical-scaling.md](vertical-scaling.md) - Resource scaling
- [performance-profiling.md](performance-profiling.md) - Performance analysis
