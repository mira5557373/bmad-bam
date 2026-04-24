# BAM Request Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing agent request handling,
or when user mentions request processing, user interactions, or synchronous flows.

**Integrates with:** Nova (AI Runtime), agent-runtime-architecture workflow

---

## Core Concepts

### Request Loop Overview

The Request Loop handles synchronous user-agent interactions with <100ms latency targets.

```
User Request → Validate → Route → Execute → Respond
     │            │         │        │         │
     └────────────┴─────────┴────────┴─────────┘
                    Request Loop
                   (P50 < 100ms)
```

### Loop Stages

| Stage | Responsibility | Tenant Context |
|-------|----------------|----------------|
| Validate | Schema + auth check | Extract tenant_id |
| Route | Agent selection | Tenant tier routing |
| Execute | Action contract | Tenant-scoped execution |
| Respond | Format response | Tenant preferences |

### Tenant-Aware Routing

```yaml
routing_rules:
  enterprise_tier:
    priority: high
    dedicated_pool: true
    timeout_ms: 5000
  
  standard_tier:
    priority: normal
    shared_pool: true
    timeout_ms: 3000
  
  free_tier:
    priority: low
    rate_limited: true
    timeout_ms: 2000
```

## Application Guidelines

1. **Always extract tenant_id first** - Before any processing
2. **Apply tier-based routing** - Enterprise gets priority
3. **Set aggressive timeouts** - Fail fast, retry elsewhere
4. **Log loop metrics** - P50, P99, error rate per tenant

## Decision Framework

| Scenario | Loop Configuration | Rationale |
|----------|-------------------|-----------|
| Simple query | Direct execution | Minimal overhead |
| Complex reasoning | Queue + async | Prevent timeout |
| Streaming response | Chunked routing | Progressive UX |
| Batch operation | Dedicated pool | Resource isolation |

## Latency Optimization Strategies

Achieving sub-100ms latency requires careful optimization at each stage of the request loop. The validation stage should use cached schema validators and pre-validated JWT tokens where possible. Connection pooling reduces routing latency significantly, and tenant context should be established early to avoid redundant lookups.

### Caching Strategy

```yaml
request_cache:
  tenant_context:
    ttl_seconds: 300
    storage: redis
  
  agent_routing:
    ttl_seconds: 60
    storage: local
  
  response_format:
    ttl_seconds: 3600
    storage: cdn
```

### Error Handling

The request loop must handle failures gracefully without exposing internal errors to users. All errors should be logged with tenant context for debugging. Timeout errors should trigger automatic retries with exponential backoff, while validation errors should return immediately with clear error messages.

| Error Type | Response Code | Retry Strategy | Tenant Impact |
|------------|---------------|----------------|---------------|
| Validation | 400 | No retry | None |
| Timeout | 504 | Auto-retry | Degraded |
| Rate limit | 429 | Backoff | Throttled |
| Internal | 500 | Manual | Isolated |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Overall runtime design
- `bmad-bam-action-contract-design` - Contract enforcement in loop

## Related Patterns

Load from pattern registry:

- **Request patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `request-loop-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent request loop latency patterns {date}"
- Search: "multi-tenant request routing best practices {date}"
