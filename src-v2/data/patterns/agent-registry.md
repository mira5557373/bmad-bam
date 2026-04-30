---
pattern_id: agent-registry
shortcode: ZAG
category: operations
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Registry - BAM Pattern

**Loaded by:** ZAG  
**Applies to:** Multi-tenant AI systems with multiple agents requiring governance and visibility  
**See also:** [ai-observability.md](ai-observability.md), [agent-maturity-scoring.md](agent-maturity-scoring.md)

---

## When to Use

- Multiple agents deployed across tenants
- Need visibility into agent sprawl
- Ownership and dependency tracking required
- Compliance requires agent inventory

## When NOT to Use

- Single agent deployment
- Development/sandbox environments
- No governance requirements

## Architecture

### Agent Discovery and Catalog

```
┌─────────────────────────────────────────────────────────────┐
│                      Agent Registry                          │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Discovery   │───►│ Catalog     │───►│ Dependency  │      │
│  │ Scanner     │    │ Store       │    │ Graph       │      │
│  └─────────────┘    └──────┬──────┘    └─────────────┘      │
│                            │                                 │
│            ┌───────────────┼───────────────┐                │
│            ▼               ▼               ▼                │
│       [Ownership]     [Versions]     [Trust Score]         │
│                                                              │
│  Queries: [By Tenant] [By Owner] [By Capability] [Stale]   │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P3-01)

```yaml
agent_registry:
  version: "1.0.0"
  bam_controlled: true
  
  discovery:
    auto_discovery: bool
    scan_interval_hours: int
    sources: list[enum[kubernetes, config, manual]]
    
  catalog:
    required_fields:
      - agent_id
      - tenant_id
      - owner_team
      - version
      - capabilities
      - created_at
      - last_active_at
      
    optional_fields:
      - description
      - dependencies
      - sbom_ref
      - trust_score
      
  governance:
    require_owner: bool
    stale_threshold_days: int
    deprecation_notice_days: int
    auto_disable_stale: bool
    
  tenant_scoping:
    isolation: enum[tenant, org, platform]
    cross_tenant_visibility: bool
    admin_override: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Auto-discovery | Complete coverage | Scan overhead | Large deployments |
| Manual registration | Precise control | May miss agents | Small teams |
| Hybrid | Balanced | Complexity | Enterprise |

## Web Research Queries

- "AI agent registry catalog patterns {date}"
- "agent inventory management enterprise {date}"
- "Backstage AI agent catalog {date}"
- "multi-tenant agent governance {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Agent registry deployed and populated |

## Related Patterns

- [ai-observability.md](ai-observability.md) - Agent monitoring
- [agent-maturity-scoring.md](agent-maturity-scoring.md) - Readiness assessment
- [tool-sbom-registry.md](tool-sbom-registry.md) - Tool inventory
