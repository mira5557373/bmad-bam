# BAM Observability Patterns Guide

**When to load:** During monitoring setup, alerting design, dashboard creation, or when implementing observability for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), SRE teams, DevOps engineers.

---

## Core Concepts

### Three Pillars in Multi-Tenant Context

Each observability pillar requires tenant-aware implementation.

| Pillar | Single-Tenant | Multi-Tenant Consideration |
|--------|--------------|---------------------------|
| Metrics | Application metrics | Per-tenant + aggregate metrics |
| Logs | Centralized logging | Tenant-scoped log access |
| Traces | Request tracing | Tenant context propagation |

### Tenant-Scoped Observability

| Observability Type | Platform View | Tenant View |
|--------------------|---------------|-------------|
| Metrics | All tenants, aggregate | Own tenant only |
| Logs | Full access | Filtered by tenant_id |
| Traces | Cross-tenant debugging | Own requests only |
| Dashboards | Platform health | Tenant-specific |
| Alerts | Platform-wide | Tier-based per tenant |

### Metric Categories

| Category | Examples | Tenant Dimension |
|----------|----------|-----------------|
| Usage | API calls, storage, compute | Yes |
| Performance | Latency, throughput | Yes |
| Errors | Error rates, exceptions | Yes |
| Business | Active users, conversions | Yes |
| Cost | Resource consumption | Yes (for billing) |

### Multi-Tenant Logging Architecture

```
Request → API Gateway (add tenant_id) → Services → Log Aggregator
                                                        │
                        ┌───────────────────────────────┴─────────────────┐
                        │                                                 │
                   Platform Index                              Tenant-Filtered Views
                   (full access)                               (tenant_id = X)
```

### Noisy Neighbor Detection

Multi-tenant observability must identify resource-hogging tenants.

| Detection Method | Metric | Action |
|-----------------|--------|--------|
| CPU percentile | Per-tenant CPU usage | Alert if > 2 std dev |
| Memory tracking | Per-tenant memory | Enforce tier limits |
| Request rate | Requests per tenant | Rate limiting |
| Storage growth | Data growth rate | Quota enforcement |

### Cost Attribution

Observability enables per-tenant cost tracking.

| Resource | Attribution Method | Billing Relevance |
|----------|-------------------|-------------------|
| Compute | Container labels, tenant_id | Usage-based pricing |
| Storage | Namespace/prefix | Included or metered |
| Network | Request tagging | Overage charges |
| AI/LLM | Token counting per tenant | Direct cost pass-through |

---

## Application Guidelines

When implementing observability in a multi-tenant context:

1. **Tag everything with tenant_id** - Every metric, log, and trace must carry tenant context
2. **Implement tenant-scoped access** - Tenants must only see their own data
3. **Build aggregate views** - Platform operators need cross-tenant visibility
4. **Set tier-appropriate retention** - Free tier: 7 days, Enterprise: 90 days
5. **Alert on tenant anomalies** - Sudden changes in tenant behavior indicate issues
6. **Enable self-service dashboards** - Enterprise tenants expect custom monitoring

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What metrics to expose to tenants? | Usage, errors, latency for their resources | Tenants need self-service troubleshooting |
| How long to retain tenant logs? | Tier-based: 7/30/90 days | Balance cost with compliance |
| Should tenants access distributed traces? | Yes, for their requests only | Enterprise debugging needs |
| How to detect noisy neighbors? | Per-tenant resource tracking with alerts | Protect platform stability |
| What observability tier for AI operations? | Full tracing for LLM calls | AI debugging is complex |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `observability-*`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant observability patterns {date}"
- Search: "SaaS monitoring best practices {date}"
- Search: "tenant-aware distributed tracing {date}"

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Implement tenant-aware monitoring
- `bmad-bam-distributed-tracing-design` - Design distributed tracing
- `bmad-bam-sli-slo-definition` - Define SLOs per tenant tier
- `bmad-bam-ai-observability-setup` - AI-specific observability
