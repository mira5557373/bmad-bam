---
pattern_id: disaster-recovery
shortcode: ZDR
category: operations
qg_ref: QG-DR1
version: 1.0.0
last_reviewed: 2026-04-29
---

# Disaster Recovery - BAM Pattern

**Loaded by:** ZDR  
**Applies to:** Business continuity, tenant data protection, failover automation

---

## When to Use

- Production multi-tenant SaaS deployments
- Systems with defined SLA/SLO requirements
- Regulated industries requiring documented DR plans
- Any system where data loss is unacceptable
- AI platforms with stateful agent executions

## When NOT to Use

- Development/staging environments (simplified DR sufficient)
- Stateless services with no persistent data
- Systems where brief outages are acceptable
- Internal tools with relaxed availability requirements

## Architecture

### RTO/RPO Tier Matrix

| Tier | RTO Target | RPO Target | Backup Frequency | Retention |
|------|------------|------------|------------------|-----------|
| Free | 24 hours | 24 hours | Daily | 7 days |
| Pro | 4 hours | 1 hour | Hourly | 30 days |
| Enterprise | 1 hour | 15 minutes | Continuous | 90 days |
| Critical | 15 minutes | Near-zero | Real-time replication | 365 days |

### Backup Strategy Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    HOT STANDBY (Active-Active)               │
│                  RTO: <15min | RPO: Near-zero                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 WARM STANDBY (Active-Passive)          │  │
│  │               RTO: 1-4 hours | RPO: 15min-1hr          │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              COLD STANDBY (Restore)              │  │  │
│  │  │            RTO: 4-24 hours | RPO: Daily           │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Failover Flow

```
Incident Detected
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Health     │────▶│  Decision   │────▶│  Failover   │
│   Check     │     │   Point     │     │  Execute    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
   3 failures          Auto/Manual         DNS switch
   in 5 min            threshold           + traffic
                                            redirect
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Tenant    │────▶│    Data     │────▶│   Verify    │
│   Notify    │     │   Sync      │     │  Recovery   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Tenant Data Priority Matrix

| Data Category | Priority | Recovery Order | Max Data Loss |
|---------------|----------|----------------|---------------|
| Tenant credentials | P0 | First | Zero |
| Billing/payment data | P0 | First | Zero |
| User data | P1 | Second | Per RPO |
| Agent state | P2 | Third | Current session |
| Audit logs | P1 | Second | Per RPO |
| Cache/temporary | P3 | Last | Acceptable loss |

### Implementation Schema

```yaml
disaster_recovery:
  tenant_id: uuid
  tier: enum[free, pro, enterprise, critical]
  
  rto_rpo:
    rto_minutes: int
    rpo_minutes: int
    backup_frequency: string  # daily, hourly, continuous
    retention_days: int
    
  backup_config:
    strategy: enum[cold, warm, hot]
    primary_region: string
    secondary_region: string
    cross_region_replication: bool
    encryption_key_id: string
    
  failover:
    auto_failover_enabled: bool
    health_check_interval_seconds: int
    failure_threshold: int
    notification_channels: string[]
    
  recovery:
    recovery_point_selection: enum[latest, specific_time, specific_backup]
    data_validation_required: bool
    tenant_notification_template: string
    
  testing:
    dr_drill_frequency: string  # quarterly, monthly
    last_drill_date: timestamp
    last_drill_result: enum[pass, fail, partial]
    next_drill_scheduled: timestamp
```

### Cross-Region Replication

```
Primary Region (us-east-1)          Secondary Region (eu-west-1)
┌──────────────────────┐            ┌──────────────────────┐
│  ┌────────────────┐  │            │  ┌────────────────┐  │
│  │   Database     │──┼── sync ───▶│  │   Database     │  │
│  │   (Primary)    │  │            │  │   (Replica)    │  │
│  └────────────────┘  │            │  └────────────────┘  │
│  ┌────────────────┐  │            │  ┌────────────────┐  │
│  │   Blob Store   │──┼── sync ───▶│  │   Blob Store   │  │
│  │   (Primary)    │  │            │  │   (Replica)    │  │
│  └────────────────┘  │            │  └────────────────┘  │
└──────────────────────┘            └──────────────────────┘
         │                                    │
         └──────────── DNS Failover ──────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hot-hot active-active | Near-zero downtime | 2x infrastructure cost | Critical enterprise |
| Hot-warm active-passive | Balance of cost/RTO | 1-4 hour RTO | Pro tier |
| Cold backup/restore | Lowest cost | 4-24 hour RTO | Free tier, dev |
| Multi-region active | Best availability | Complexity, latency | Global enterprise |

## Quality Checks

- [ ] RTO/RPO targets defined per tenant tier
- [ ] Automated backup verification (restore test)
- [ ] Failover runbook documented and tested
- [ ] Tenant notification procedures in place
- [ ] **CRITICAL:** DR drill completed within last quarter

## Web Research Queries

- "disaster recovery patterns multi-tenant SaaS {date}"
- "RTO RPO best practices cloud {date}"
- "cross-region database replication PostgreSQL {date}"
- "chaos engineering DR testing {date}"
- "tenant data recovery prioritization {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-DR1 | Pattern implementation verified |

## Related Patterns

- [circuit-breaker.md](circuit-breaker.md) - Fault tolerance
- [disaster-recovery.md](disaster-recovery.md) - Business continuity

---

## Multi-Region Failover (Merged Pattern)

**Merged from:** multi-region-failover pattern (consolidated to avoid duplication)

### When to Use

- Active-passive DR across regions
- Automatic failover triggers
- Tenant-aware region selection
- Regulatory data residency requirements

### Configuration Schema

```yaml
multi_region_failover:
  version: "1.0.0"
  bam_controlled: true
  
  primary_region: string
  secondary_regions: list[string]
  
  failover:
    auto_trigger: bool
    health_threshold: float
    dns_ttl_seconds: int
    cooldown_minutes: int
    
  tenant_routing:
    region_affinity: bool
    data_residency_respect: bool
    latency_based: bool
    
  replication:
    mode: enum[sync, async]
    lag_threshold_seconds: int
```

### Trade-offs

| Strategy | RTO | RPO | Cost |
|----------|-----|-----|------|
| Hot standby | Minutes | Near-zero | High |
| Warm standby | 10-30 min | Minutes | Medium |
| Cold standby | Hours | Hours | Low |

### Web Research Queries

- "multi-region failover patterns {date}"
- "active-passive DR SaaS {date}"
- "tenant-aware region routing {date}"
