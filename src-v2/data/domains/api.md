# API - BAM Domain Context

**Loaded by:** API architects, Backend engineers  
**Related Workflows:** bmad-bam-api-versioning, bmad-bam-facade-contract

---

## Overview

API management in multi-tenant SaaS encompasses versioning strategies, tenant-aware routing, rate limiting, and contract evolution patterns that maintain backward compatibility while enabling platform growth.

## Core Concepts

### API Versioning Strategies

| Strategy | Approach | Tenant Impact |
|----------|----------|---------------|
| URL Path | `/v1/`, `/v2/` | Clear, explicit |
| Header | `Accept-Version: v2` | Cleaner URLs |
| Query Param | `?version=2` | Easy testing |
| Content Negotiation | Media type | RESTful |

### Tenant-Aware API Architecture

```
API Request
    │
    ├── X-Tenant-ID header
    ├── API Key (tenant-bound)
    │
    ▼
┌─────────────────┐
│ API Gateway     │ ← Rate limiting, auth
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tenant Router   │ ← Tier-based routing
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│ V1    │ │ V2    │
│ API   │ │ API   │
└───────┘ └───────┘
```

### Rate Limiting by Tier

| Tier | Requests/min | Burst | Concurrent |
|------|--------------|-------|------------|
| Free | 60 | 10 | 5 |
| Pro | 600 | 100 | 20 |
| Enterprise | 6000 | 1000 | 100 |
| OEM | Custom | Custom | Custom |

## Decision Matrix

| Requirement | Strategy | Rationale |
|-------------|----------|-----------|
| Breaking changes | New version | Protect existing integrations |
| Additive changes | Same version | Backward compatible |
| Deprecation | Sunset headers | Clear communication |
| Per-tenant limits | Tier-based | Fair usage enforcement |

## Quality Checks

- [ ] API changes are backward compatible or versioned
- [ ] Rate limits enforced per tenant
- [ ] **CRITICAL:** API keys scoped to tenant
- [ ] Deprecation timeline communicated

## Web Research Queries

- "API versioning strategies multi-tenant SaaS {date}"
- "Tenant-aware rate limiting patterns {date}"
- "API gateway multi-tenancy patterns {date}"
