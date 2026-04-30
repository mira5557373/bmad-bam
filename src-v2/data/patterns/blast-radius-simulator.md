---
pattern_id: blast-radius-simulator
shortcode: ZBL
category: reliability
qg_ref: QG-DR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Blast Radius Simulator - BAM Pattern

**Loaded by:** ZBL  
**Applies to:** Complex multi-tenant systems requiring failure impact prediction  
**See also:** [tenant-chaos-injector.md](tenant-chaos-injector.md), [incident-correlation-engine.md](incident-correlation-engine.md)

---

## When to Use

- Complex agent dependency graphs
- Need to predict failure impact
- Change management processes
- Disaster recovery planning

## When NOT to Use

- Simple linear workflows
- No interdependencies
- Single-tenant deployments

## Architecture

### Failure Impact Analysis

```
┌─────────────────────────────────────────────────────────────┐
│                  Blast Radius Simulator                      │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Dependency  │───►│ Failure     │───►│ Impact      │      │
│  │ Graph       │    │ Injector    │    │ Calculator  │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│            ┌──────────────────────────────────┘              │
│            ▼                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Impact Report                                           ││
│  │  - Affected Tenants: [list]                              ││
│  │  - Affected Agents: [list]                               ││
│  │  - Estimated Downtime: [duration]                        ││
│  │  - Revenue Impact: [estimate]                            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Simulations: [Component Failure] [Tenant Spike] [Cascade]  │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P3-04)

```yaml
blast_radius_simulator:
  version: "1.0.0"
  bam_controlled: true
  
  dependency_graph:
    source: enum[auto_discover, manual, hybrid]
    refresh_interval_hours: int
    include_external: bool
    
  simulation_types:
    component_failure:
      enabled: bool
      components: list[string]
      
    tenant_spike:
      enabled: bool
      spike_multiplier: float
      
    cascade_failure:
      enabled: bool
      propagation_model: enum[immediate, delayed, probabilistic]
      
  impact_calculation:
    metrics:
      - affected_tenants
      - affected_agents
      - estimated_downtime_minutes
      - revenue_impact
      - data_loss_risk
      
    tenant_weighting:
      by_tier: bool
      by_revenue: bool
      
  reporting:
    generate_on_change: bool
    include_mitigation: bool
    notify_stakeholders: list[string]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Static analysis | Fast, no risk | May miss runtime deps | Pre-deployment |
| Live simulation | Accurate | Requires safeguards | Staging env |
| Probabilistic model | Handles uncertainty | Complex to tune | Mature systems |

## Web Research Queries

- "blast radius simulation distributed systems {date}"
- "failure impact analysis multi-tenant {date}"
- "dependency graph failure prediction {date}"
- "chaos engineering impact assessment {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-DR1 | Blast radius analysis completed for critical paths |

## Related Patterns

- [tenant-chaos-injector.md](tenant-chaos-injector.md) - Chaos testing
- [incident-correlation-engine.md](incident-correlation-engine.md) - Incident analysis
