# API Gateway Patterns

**When to load:** When designing API infrastructure for multi-tenant SaaS, implementing request routing, or when user mentions API gateway, rate limiting at edge, or request transformation.

**Integrates with:** Architect (Atlas persona), DevOps agent, Security agent

---

## Core Concepts

### What is API Gateway in Multi-Tenant Context?

The API gateway is the entry point for all client requests in a multi-tenant SaaS platform. It handles tenant identification, rate limiting, authentication, request routing, and provides a unified interface regardless of internal service architecture.

### Gateway Responsibilities

| Responsibility | Description | Tenant Impact |
|---------------|-------------|---------------|
| Authentication | Validate credentials | Tenant identity extraction |
| Authorization | Check permissions | Tenant-scoped access |
| Rate limiting | Throttle requests | Per-tenant quotas |
| Routing | Direct to services | Tenant-aware routing |
| Transformation | Modify request/response | Tenant context injection |

### Gateway Layer Architecture

```
Internet
    │
    ├── CDN/Edge (caching, DDoS protection)
    │
    ├── Load Balancer (SSL termination)
    │
    ├── API Gateway (tenant identification, rate limiting)
    │
    ├── Service Mesh (internal routing, observability)
    │
    └── Backend Services (business logic)
```

---

## Key Patterns

### Pattern 1: Tenant Extraction

Extract tenant identity from incoming requests:

| Method | Implementation | Use Case |
|--------|----------------|----------|
| Subdomain | `{tenant}.api.example.com` | B2B SaaS |
| Header | `X-Tenant-ID: abc123` | API-first |
| JWT claim | `tenant_id` in token | OAuth flows |
| Path prefix | `/api/v1/{tenant}/...` | Simple routing |
| API key | Key-to-tenant mapping | M2M integration |

### Tenant Extraction Priority

| Priority | Method | Validation |
|----------|--------|------------|
| 1 | JWT claim (trusted) | Signature verification |
| 2 | API key lookup | Key-to-tenant mapping |
| 3 | Subdomain | Domain ownership verification |
| 4 | Header (internal only) | Request source validation |

### Pattern 2: Rate Limiting Tiers

| Tier | Requests/min | Burst | Overage Handling |
|------|--------------|-------|------------------|
| Free | 60 | 10 | Hard block |
| Pro | 600 | 100 | Soft limit + warning |
| Enterprise | 6000 | 1000 | Custom arrangement |

### Rate Limiting Algorithm Selection

| Algorithm | Best For | Trade-offs |
|-----------|----------|------------|
| Token bucket | Smooth rate limiting | Memory per tenant |
| Sliding window | Accurate counting | Higher computation |
| Fixed window | Simple implementation | Burst at boundaries |
| Leaky bucket | Consistent throughput | No burst allowance |

### Pattern 3: Request Enrichment

Gateway injects tenant context:

| Enrichment | Header | Description |
|------------|--------|-------------|
| Tenant ID | `X-Tenant-ID` | Verified tenant identifier |
| Tier | `X-Tenant-Tier` | Subscription level |
| Features | `X-Tenant-Features` | Enabled feature flags |
| Quotas | `X-Tenant-Quota-Remaining` | Current usage status |

---

## Decision Criteria

### When to Use Gateway-Level vs Service-Level

| Concern | Gateway Level | Service Level |
|---------|---------------|---------------|
| Authentication | Always | Never (already done) |
| Coarse rate limiting | Yes | Fine-grained limits |
| Tenant extraction | Yes | Validation only |
| Business authorization | No | Yes |
| Request transformation | Simple transforms | Complex business rules |

### Gateway Selection Matrix

| Gateway | Strength | Multi-Tenant Support | Best For |
|---------|----------|---------------------|----------|
| Kong | Plugin ecosystem | Excellent | Flexible requirements |
| AWS API Gateway | AWS integration | Good | AWS-native stacks |
| Envoy | Performance | Requires customization | Service mesh |
| Traefik | Kubernetes native | Good | K8s environments |
| NGINX Plus | Proven reliability | Good with modules | High-traffic APIs |

---

## Application Guidelines

- Designing multi-tenant API architecture
- Implementing centralized rate limiting
- Building API versioning strategy
- Creating developer portal/documentation
- Integrating with identity providers

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Trust client-provided tenant ID | Security bypass | Verify via JWT or API key |
| Global rate limits only | Noisy neighbor | Per-tenant rate limiting |
| No request correlation | Debugging impossible | Inject X-Request-ID |
| Blocking on quota check | Latency spike | Async quota updates |
| Missing circuit breaker | Cascade failures | Gateway-level protection |
| Hardcoded routes | Deployment friction | Dynamic service discovery |

### Security Checklist

- [ ] Tenant ID never trusted from client without verification
- [ ] Rate limiting applied before expensive operations
- [ ] Request size limits enforced
- [ ] Timeout limits on all upstream calls
- [ ] Sensitive headers stripped from responses
- [ ] CORS properly configured per tenant domain

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Tenant Routing | Tenant extraction and routing | Correct service targeting |
| Rate Limiting | Gateway enforcement | Resource protection |
| Context Propagation | Header injection | Downstream tenant awareness |
| Feature Toggles | Feature flag header injection | Dynamic capability |
| Observability | Request tracing headers | End-to-end visibility |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should rate limiting be at gateway or service level? | Gateway for coarse limits, service for fine-grained | Gateway catches abuse early; services understand business context for precise limits |
| Which tenant extraction method to use? | JWT claims for OAuth flows, subdomain for B2B | JWT provides cryptographic verification; subdomains enable tenant-specific URLs |
| When to use shared vs dedicated gateway? | Shared for most tenants, dedicated for enterprise tier | Cost efficiency for standard tenants; isolation and custom SLAs for enterprise |
| How to handle gateway-level caching? | Cache by tenant + resource with short TTL | Prevents cross-tenant data leakage while reducing backend load |
| Should API versioning be in URL or header? | URL path for major versions, header for minor | URL versioning is explicit and cacheable; header versioning reduces URL proliferation |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rate-limiting`, `tenant-routing`, `facade-contracts`
- **idempotency:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `idempotency`
- **circuit-breaker:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `circuit-breaker`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant API gateway patterns {date}"
- Search: "Kong rate limiting per tenant {date}"
- Search: "API gateway tenant isolation {date}"
- Search: "API gateway security best practices {date}"

## Related Workflows

- `bmad-bam-api-gateway-design` - Define API gateway as part of platform architecture
- `bmad-bam-api-deprecation-strategy` - Design version routing at the gateway layer
- `bmad-bam-internal-contract-design` - Define contracts for gateway-to-service communication
- `bmad-bam-security-review` - Review gateway security configuration and rate limiting
- `bmad-bam-tenant-model-isolation` - Implement tenant extraction and routing at gateway
