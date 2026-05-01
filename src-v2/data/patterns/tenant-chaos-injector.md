---
pattern_id: tenant-chaos-injector
shortcode: ZCI
category: testing
qg_ref: QG-DR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tenant Chaos Injector - BAM Pattern

**Loaded by:** ZCI  
**Applies to:** Multi-tenant systems requiring isolation chaos testing  
**See also:** [testing-isolation.md](testing-isolation.md), [disaster-recovery.md](disaster-recovery.md)

---

## When to Use

- Validating tenant isolation under failure conditions
- Testing noisy neighbor protections
- Pre-production resilience verification
- Compliance validation for isolation claims

## When NOT to Use

- Production without proper safeguards
- During high-traffic periods
- Without rollback capabilities

## Architecture

### Chaos Injection Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 Tenant Chaos Injector                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Control Plane                         ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │ Latency │  │ Error   │  │ Resource│  │ Cross-  │    ││
│  │  │ Inject  │  │ Inject  │  │ Exhaust │  │ Tenant  │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Target Tenant   │                        │
│                   │ (Isolated)      │                        │
│                   └─────────────────┘                        │
│                                                              │
│  Safety: [Auto-Rollback] [Blast Radius] [Excluded Tenants]  │
│  Assert: [No Cascade] [Isolation Held] [Recovery Time]      │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-06)

```yaml
tenant_chaos_injector:
  version: "1.0.0"
  bam_controlled: true
  
  injection_types:
    latency:
      enabled: bool
      min_ms: int
      max_ms: int
      distribution: enum[uniform, normal, exponential]
      
    error:
      enabled: bool
      error_rate: float
      error_types: list[string]
      
    resource_exhaustion:
      enabled: bool
      resource: enum[memory, cpu, connections, tokens, storage]
      exhaustion_percent: int
      
  targeting:
    scope: enum[tenant, user, agent, service]
    selection: enum[random, specific, percentage]
    target_tenant_id: string
    
  safety:
    max_duration_seconds: int
    auto_rollback: bool
    rollback_on_cascade: bool
    excluded_tenants: list[string]
    production_safeguard: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual injection | Full control | Infrequent testing | Initial validation |
| Scheduled chaos | Regular testing | Planned disruption | Mature systems |
| Continuous chaos | Always validated | Operational overhead | High-reliability |
| Game day events | Team learning | Resource intensive | Quarterly drills |


## Quality Checks

- [ ] Test coverage thresholds defined
- [ ] Tenant isolation tests included
- [ ] CI/CD integration configured
- [ ] Test data properly isolated
- [ ] **CRITICAL:** No production data in test environments

## Web Research Queries

- "tenant isolation chaos testing {date}"
- "multi-tenant chaos engineering patterns {date}"
- "noisy neighbor resilience testing {date}"
- "SaaS fault injection testing {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-DR1 | Chaos tests pass, isolation verified |

## Related Patterns

- [testing-isolation.md](testing-isolation.md) - Isolation testing
- [disaster-recovery.md](disaster-recovery.md) - DR patterns
