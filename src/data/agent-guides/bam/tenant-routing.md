# BAM Tenant Routing Guide

**When to load:** During Phase 3 (Solutioning) when designing request routing, tenant context extraction, or connection pooling.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### Routing Strategy Comparison

| Strategy | Identification | Complexity |
|----------|---------------|------------|
| Header-based | `X-Tenant-ID` header | Low |
| Subdomain-based | `tenant.example.com` | Medium |
| Path-based | `/api/v1/{tenant}/...` | Low |
| JWT Claim | Token contains tenant | Medium |

---

## Application Guidelines

When implementing tenant routing in multi-tenant systems:

1. **Extract tenant early in request pipeline**: Routing middleware should run before business logic
2. **Validate tenant exists and is active**: Reject requests for unknown or suspended tenants
3. **Support multiple identification strategies**: Headers, subdomains, and JWT claims may all be needed
4. **Cache tenant lookups**: Reduce database round-trips for tenant resolution
5. **Propagate tenant context to all downstream services**: Ensure consistent tenant identity across the request

---

## Implementation Patterns

### Multi-Strategy Router

```
┌─────────────────────────────────────────┐
│            Request Flow                  │
│  ┌─────────┐    ┌───────────────────┐   │
│  │ Request │───>│ Router Resolver   │   │
│  └─────────┘    └─────────┬─────────┘   │
│         ┌─────────────────┼──────────┐  │
│         v                 v          v  │
│    ┌─────────┐      ┌────────┐  ┌─────┐│
│    │Subdomain│      │ Header │  │Path ││
│    └─────────┘      └────────┘  └─────┘│
└─────────────────────────────────────────┘
```

### Subdomain Routing

| Pattern | Resolution | Use Case |
|---------|------------|----------|
| `{tenant}.app.com` | First segment | Standard |
| `{tenant}-{env}.app.com` | Segment with env | Staged |
| Custom domain | CNAME lookup | Enterprise |

### Header Resolution Priority

```
1. JWT tenant claim (if auth required)
2. X-Tenant-ID header
3. X-Tenant-Slug header (lookup)
4. Default tenant (if allowed)
```

### Path-Based Extraction

```
Request: GET /api/v1/acme/users
    │
    v
Path Parser ──> tenant = "acme"
    │
    v
Rewrite ──> /api/v1/users
```

### Connection Pool Sizing

| Tier | Connections | Idle Timeout |
|------|-------------|--------------|
| Free | Shared (1-2) | 30s |
| Pro | 5-10 | 60s |
| Enterprise | 20-50 dedicated | 120s |

### Pool Architecture

```
┌───────────────────────────────────────┐
│       Connection Pool Manager          │
│  ┌───────────────┐  ┌──────────────┐  │
│  │  Shared Pool  │  │Dedicated Pool│  │
│  │  (Free/Pro)   │  │ (Enterprise) │  │
│  └───────┬───────┘  └──────┬───────┘  │
└──────────┼─────────────────┼──────────┘
           v                 v
    ┌──────────┐      ┌──────────┐
    │ Shared   │      │ Tenant   │
    │ Database │      │ Database │
    └──────────┘      └──────────┘
```

---

## Tenant Context Propagation

| Boundary | Method | Validation |
|----------|--------|------------|
| HTTP internal | Header forwarding | Re-validate |
| Message queue | Message metadata | Deserialize |
| Background job | Job payload | From payload |
| WebSocket | Connection state | Initial handshake |

---

## Security Considerations

| Attack | Vector | Mitigation |
|--------|--------|------------|
| Tenant spoofing | Forged header | Validate against JWT |
| Subdomain hijack | Unclaimed subdomain | Validate tenant exists |
| Path traversal | `/../other-tenant/` | Strict path parsing |
| Connection reuse | Stale context | Reset per request |

---

## Related Patterns

- `routing` pattern in `bam-patterns.csv`
- `tenant-context` pattern in `bam-patterns.csv`
- `tenant-isolation.md` guide for security context propagation
- `performance-isolation.md` guide for connection pool sizing
- `tenant-routing-template.md` for output documentation
- **background-jobs:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `background-jobs`
- **rate-limiting:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rate-limiting`
- **tenant-context-propagation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-context-propagation`
- **caching-strategy:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-strategy`
- **api-throttling:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `api-throttling`
- **webhook-delivery:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `webhook-delivery`
- **notification-system:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `notification-system`

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-routing`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → connection strategies

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `tenant-routing` | `multi-tenant request routing multi-tenant SaaS {date}` |
| `tenant-routing` | `tenant context middleware multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design tenant identification and routing strategy
- `bmad-bam-tenant-onboarding-design` - Configure routing for new tenants
- `bmad-bam-security-review` - Validate routing security against spoofing attacks

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Public API? | Header-based | Flexible |
| White-label SaaS? | Subdomain-based | Custom branding |
| Simple multi-tenant? | Path-based | Easiest |
| High security? | JWT claim + validation | Cryptographic |
