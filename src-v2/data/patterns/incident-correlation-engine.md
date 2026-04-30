---
pattern_id: incident-correlation-engine
shortcode: ZIC
category: operations
qg_ref: QG-IR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Incident Correlation Engine - BAM Pattern

**Loaded by:** ZIC  
**Applies to:** Multi-tenant systems requiring cross-tenant incident analysis  
**See also:** [incident-response.md](incident-response.md), [ai-observability.md](ai-observability.md)

---

## When to Use

- Multi-tenant incident triage
- Root cause analysis across tenants
- Platform health vs tenant health differentiation
- Automated incident classification

## When NOT to Use

- Single-tenant deployments
- Simple applications with obvious failures
- Privacy-restricted environments

## Architecture

### Correlation Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│              Incident Correlation Engine                     │
│                                                              │
│  Incidents                                                   │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                   │
│  │Tenant │ │Tenant │ │Tenant │ │Tenant │                   │
│  │  A    │ │  B    │ │  C    │ │  D    │                   │
│  └───┬───┘ └───┬───┘ └───┬───┘ └───┬───┘                   │
│      │         │         │         │                        │
│      └─────────┴─────────┴─────────┘                        │
│                     │                                        │
│            ┌────────▼────────┐                               │
│            │ Correlation     │                               │
│            │ Engine          │                               │
│            └────────┬────────┘                               │
│                     │                                        │
│       ┌─────────────┼─────────────┐                         │
│       ▼             ▼             ▼                         │
│  [Tenant-      [Tier-       [Platform-                      │
│   Specific]    Wide]        Wide]                           │
│                                                              │
│  Actions: [Auto-Classify] [Escalate] [Link Runbook]         │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-07)

```yaml
incident_correlation_engine:
  version: "1.0.0"
  bam_controlled: true
  
  correlation_rules:
    time_window:
      lookback_minutes: int
      lookahead_minutes: int
      
    similarity:
      error_message: bool
      stack_trace: bool
      affected_service: bool
      error_code: bool
      
    clustering:
      algorithm: enum[dbscan, hierarchical, similarity_graph]
      threshold: float
      min_incidents: int
      
  classification:
    scopes:
      - tenant_specific
      - tenant_tier
      - region
      - platform_wide
      
    auto_classify: bool
    confidence_threshold: float
      
  tenant_context:
    preserve_isolation: bool
    anonymize_cross_tenant: bool
    aggregate_only: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Time-based clustering | Simple | May miss patterns | Basic correlation |
| Similarity clustering | Accurate grouping | Compute intensive | Root cause analysis |
| ML-based correlation | Discovers patterns | Requires training | Mature systems |
| Rule-based classification | Predictable | Manual maintenance | Known failure modes |

## Web Research Queries

- "incident correlation multi-tenant SaaS {date}"
- "cross-tenant incident analysis patterns {date}"
- "platform incident classification automation {date}"
- "AIOps incident correlation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-IR1 | Correlation engine active, runbooks linked |

## Related Patterns

- [incident-response.md](incident-response.md) - Response procedures
- [ai-observability.md](ai-observability.md) - Telemetry collection
