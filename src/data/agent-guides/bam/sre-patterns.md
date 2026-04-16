# BAM SRE Patterns Guide

**When to load:** During SLO definition, error budget management, reliability engineering, or when implementing SRE practices for multi-tenant SaaS platforms.

**Integrates with:** SRE teams, Winston (Architect), Platform engineering.

---

## Core Concepts

### SLOs for Multi-Tenant

| SLO Type | Platform Level | Tenant Level |
|----------|---------------|--------------|
| Availability | 99.95% overall | Per-tier targets |
| Latency | p99 < 500ms | p99 per tenant |
| Error Rate | < 0.1% platform | < 0.1% per tenant |
| Throughput | Aggregate capacity | Per-tenant quotas |

### SLO Targets by Tier

| Tier | Availability | Latency (p99) | Error Rate |
|------|--------------|---------------|------------|
| Free | 99% | 1000ms | 1% |
| Pro | 99.9% | 500ms | 0.1% |
| Enterprise | 99.99% | 200ms | 0.01% |

### Error Budget Management

```
Monthly Error Budget = (1 - SLO) × Minutes in Month

Example for 99.9% SLO:
Error Budget = (1 - 0.999) × 43,200 min = 43.2 minutes/month
```

| Budget Remaining | Action |
|-----------------|--------|
| > 50% | Feature velocity, experimentation |
| 25-50% | Normal operations, careful changes |
| 10-25% | Freeze features, focus on reliability |
| < 10% | Incident mode, rollback risky changes |

### Multi-Tenant Toil Categories

| Toil Type | Single-Tenant | Multi-Tenant Examples |
|-----------|--------------|----------------------|
| Manual scaling | Scale by request | Per-tenant quota adjustments |
| Config changes | One environment | 1000+ tenant configs |
| Deployments | Single pipeline | Tenant-aware rollouts |
| Support tickets | User issues | Tenant-specific debugging |

### Reliability Patterns

| Pattern | Description | Multi-Tenant Use |
|---------|-------------|-----------------|
| Circuit Breaker | Stop cascading failures | Per-service + per-tenant |
| Bulkhead | Isolate failures | Tenant resource pools |
| Retry with Backoff | Handle transient failures | Tenant-aware rate limits |
| Timeout | Prevent hanging | Tier-based timeouts |

### On-Call for Multi-Tenant

| Escalation Level | Scope | Response |
|-----------------|-------|----------|
| L1 | Automated remediation | < 5 min |
| L2 | On-call engineer | < 15 min |
| L3 | Specialist team | < 30 min |
| L4 | Leadership escalation | As needed |

---

## Application Guidelines

When implementing SRE in a multi-tenant context:

1. **Define SLOs per tenant tier** - Different reliability expectations per tier
2. **Track error budgets per tenant** - Individual tenant SLO tracking
3. **Automate toil aggressively** - Multi-tenant toil scales with tenant count
4. **Implement tenant-aware circuit breakers** - Isolate tenant failures
5. **Build self-healing systems** - Auto-remediation reduces toil
6. **Measure and reduce MTTR** - Fast recovery protects all tenants

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should SLOs differ by tier? | Yes, higher tiers get stricter SLOs | Justify premium pricing |
| How to track tenant-specific SLOs? | Per-tenant metrics with dashboards | Self-service monitoring |
| When to freeze deployments? | Error budget < 10% | Protect reliability |
| How to reduce multi-tenant toil? | Automation + self-service | Scale without linear headcount |
| What reliability patterns for multi-tenant? | Bulkheads + circuit breakers per tenant | Tenant isolation |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **SRE patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `sre-*`
- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `reliability-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SRE best practices {date}"
- Search: "SLO management multi-tenant SaaS {date}"
- Search: "error budget policy engineering {date}"

---

## Related Workflows

- `bmad-bam-sli-slo-definition` - Define SLOs
- `bmad-bam-sli-slo-definition` - Define SLIs and SLOs
- `bmad-bam-tenant-aware-observability` - Monitor SLO compliance
