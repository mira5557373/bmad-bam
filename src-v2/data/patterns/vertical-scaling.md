---
pattern_id: vertical-scaling
shortcode: ZVT
category: scaling
qg_ref: QG-SC1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Vertical Scaling - BAM Pattern

**Loaded by:** ZVT  
**Applies to:** Multi-tenant SaaS platforms requiring capacity increases

---

## When to Use

- Hitting CPU/memory limits on existing instances
- Single-threaded workloads that cannot parallelize
- Database performance requiring larger instance
- Quick capacity boost without architectural changes
- Tenant tiers requiring dedicated resource pools

## When NOT to Use

- Workloads that can horizontally scale
- Cost-sensitive deployments (vertical = exponential cost)
- Systems requiring high availability (single point of failure)
- Cloud regions with limited instance size options
- When approaching cloud provider instance size limits

## Architecture

### Vertical Scaling Decision Tree

```
Performance Issue Detected
         │
         ▼
┌─────────────────┐
│ Can workload    │
│ horizontally    │◄─── YES ──► Use horizontal scaling
│ scale?          │
└────────┬────────┘
         │ NO
         ▼
┌─────────────────┐
│ Instance size   │
│ at max?         │◄─── YES ──► Architectural refactor needed
└────────┬────────┘
         │ NO
         ▼
┌─────────────────┐
│ Budget allows   │
│ larger instance?│◄─── NO ───► Optimize workload first
└────────┬────────┘
         │ YES
         ▼
    Vertical Scale
```

### Tenant-Tier Resource Allocation

| Tier | vCPU Range | Memory Range | Storage IOPS | Network |
|------|------------|--------------|--------------|---------|
| Free | 0.5-1 | 1-2 GB | 1000 | Shared |
| Pro | 2-4 | 4-8 GB | 3000 | Shared |
| Enterprise | 4-16 | 16-64 GB | 10000 | Dedicated |
| Dedicated | 16-64 | 64-256 GB | 50000 | Isolated |

### Scaling Trigger Flow

```
Monitoring Alert
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Metric    │────▶│   Verify    │────▶│   Scale     │
│   Check     │     │   Trend     │     │   Decision  │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
   CPU >80%           3+ hours          Instance resize
   MEM >85%           sustained          or tier bump
```

### Configuration Schema

```yaml
vertical_scaling:
  tenant_id: uuid
  tier: enum[free, pro, enterprise, dedicated]
  bam_controlled: true
  
  resource_profile:
    vcpu_min: int
    vcpu_max: int
    memory_gb_min: int
    memory_gb_max: int
    storage_iops: int
    
  scaling_triggers:
    cpu_threshold_percent: int  # default: 80
    memory_threshold_percent: int  # default: 85
    sustained_duration_minutes: int  # default: 15
    
  scaling_policy:
    auto_scale_enabled: bool
    scale_up_increment: string  # e.g., "1 tier" or "2x resources"
    cooldown_minutes: int
    max_instance_size: string
    
  cost_controls:
    monthly_budget_limit: float
    alert_at_percent: int  # default: 80
    hard_cap_enabled: bool
```

### Database Vertical Scaling

```
Current State                    Scaled State
┌──────────────────┐            ┌──────────────────┐
│ db.r5.xlarge     │            │ db.r5.4xlarge    │
│ 4 vCPU / 32 GB   │  ────▶     │ 16 vCPU / 128 GB │
│ 10K IOPS         │            │ 40K IOPS         │
└──────────────────┘            └──────────────────┘
         │                               │
         └── Brief downtime ─────────────┘
              (1-3 minutes)
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Instance resize | Simple, no code changes | Downtime, cost jumps | Quick fixes |
| Read replicas + bigger primary | Read scale + write capacity | Complexity, replication lag | Read-heavy workloads |
| Memory-optimized instances | Better cache hit rates | Higher cost per vCPU | Database workloads |
| Compute-optimized instances | Better CPU per dollar | Less memory | Compute-heavy AI workloads |

## Quality Checks

- [ ] Scaling thresholds defined per tenant tier
- [ ] Downtime windows communicated to tenants
- [ ] Rollback procedure documented
- [ ] Cost impact calculated before scaling
- [ ] **CRITICAL:** No data loss during scaling operations

## Web Research Queries

- "vertical scaling best practices cloud {date}"
- "RDS instance resizing zero downtime {date}"
- "Kubernetes vertical pod autoscaler patterns {date}"
- "database scaling strategies PostgreSQL {date}"
- "cost optimization instance sizing {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC1 | Pattern implementation verified |

## Related Patterns

- [load-balancing.md](load-balancing.md) - Traffic distribution
- [cache-invalidation.md](cache-invalidation.md) - Cache management
