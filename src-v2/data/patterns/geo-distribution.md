---
pattern_id: geo-distribution
shortcode: ZGE
category: scaling
qg_ref: QG-SC2
version: 1.0.0
last_reviewed: 2026-04-30
---

# Geographic Distribution - BAM Pattern

**Loaded by:** ZGE  
**Applies to:** Multi-tenant SaaS platforms serving global customers

---

## When to Use

- Customers in multiple geographic regions
- Latency requirements <100ms for interactive features
- Data residency regulations (GDPR, data sovereignty)
- Disaster recovery requiring regional redundancy
- Enterprise tenants requiring regional isolation

## When NOT to Use

- Single-region customer base
- Cost constraints prohibit multi-region infrastructure
- Low-latency requirements not critical
- Application cannot handle eventual consistency
- Early-stage MVP with limited geographic scope

## Architecture

### Multi-Region Topology

```
                    Global Load Balancer
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  US-EAST    │ │  EU-WEST    │ │  AP-SOUTH   │
    │  Region     │ │  Region     │ │  Region     │
    └─────────────┘ └─────────────┘ └─────────────┘
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ App + DB    │ │ App + DB    │ │ App + DB    │
    │ (Primary)   │ │ (Replica)   │ │ (Replica)   │
    └─────────────┘ └─────────────┘ └─────────────┘
           │               │               │
           └───────────────┴───────────────┘
                           │
                    Cross-Region Sync
```

### Tenant Region Assignment

| Tier | Region Options | Data Residency | Failover |
|------|----------------|----------------|----------|
| Free | Shared (auto-assigned) | Platform default | Same region |
| Pro | Select from available | Region-locked | Cross-region |
| Enterprise | Dedicated region | Compliance-verified | Multi-region active |
| Global | All regions | Configurable per data type | Active-active |

### Traffic Routing Strategy

```
User Request
      │
      ▼
┌─────────────────┐
│ GeoDNS Lookup   │ ← Resolve to nearest region
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tenant Config   │ ← Check tenant's assigned region
│ Override        │
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│ Route │ │ Route │ │ Route │
│ US    │ │ EU    │ │ APAC  │
└───────┘ └───────┘ └───────┘
```

### Configuration Schema

```yaml
geo_distribution:
  tenant_id: uuid
  tier: enum[free, pro, enterprise, global]
  bam_controlled: true
  
  region_assignment:
    primary_region: string  # e.g., "us-east-1"
    allowed_regions: string[]
    data_residency_requirement: string  # e.g., "eu-only"
    
  routing:
    strategy: enum[geo_nearest, tenant_pinned, latency_based]
    failover_enabled: bool
    failover_regions: string[]
    
  replication:
    mode: enum[async, sync, eventual]
    lag_tolerance_ms: int
    conflict_resolution: enum[last_write_wins, primary_wins, custom]
    
  compliance:
    data_sovereignty_enabled: bool
    restricted_regions: string[]
    audit_logging_region: string
    
  performance:
    cdn_enabled: bool
    edge_caching: bool
    static_asset_regions: string[]
```

### Data Residency Enforcement

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA RESIDENCY LAYER                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Tenant Region Policy                    │    │
│  │  ┌───────────────────────────────────────────────┐  │    │
│  │  │   EU-ONLY: Data never leaves EU regions       │  │    │
│  │  │   GLOBAL:  Data replicated across regions     │  │    │
│  │  │   HYBRID:  User data local, analytics global  │  │    │
│  │  └───────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│              ┌─────────────┼─────────────┐                  │
│              ▼             ▼             ▼                  │
│         ┌────────┐    ┌────────┐    ┌────────┐             │
│         │ EU DB  │    │ US DB  │    │ APAC DB│             │
│         │(Local) │    │(Masked)│    │(Masked)│             │
│         └────────┘    └────────┘    └────────┘             │
└─────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Active-active multi-region | Lowest latency, best availability | Conflict resolution complexity | Global enterprise |
| Active-passive with failover | Simpler consistency | Higher failover latency | Regional + DR |
| Read replicas per region | Read latency improvement | Write latency to primary | Read-heavy workloads |
| CDN + single origin | Cost effective | Higher dynamic content latency | Static-heavy apps |

## Quality Checks

- [ ] Region assignment per tenant documented
- [ ] Cross-region replication lag monitored
- [ ] Data residency compliance verified
- [ ] Failover tested per region
- [ ] **CRITICAL:** GDPR tenant data stays in assigned region

## Web Research Queries

- "multi-region database architecture patterns {date}"
- "global load balancing GeoDNS {date}"
- "GDPR data residency implementation {date}"
- "cross-region replication conflict resolution {date}"
- "active-active multi-region SaaS {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC2 | Pattern implementation verified |

## Related Patterns

- [edge-deployment.md](edge-deployment.md) - Edge compute
- [disaster-recovery.md](disaster-recovery.md) - Regional failover
