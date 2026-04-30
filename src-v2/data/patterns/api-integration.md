---
pattern_id: api-integration
shortcode: ZAI
category: platform
qg_ref: QG-PL5
version: 1.0.0
last_reviewed: 2026-04-30
---

# API Integration - BAM Pattern

**Loaded by:** ZAI  
**Applies to:** Multi-tenant SaaS platforms providing APIs for third-party integrations

---

## When to Use

- Exposing platform capabilities via API
- Third-party integration requirements
- Webhooks for event notifications
- OAuth provider for connected apps
- API-first product strategy
- Developer ecosystem building

## When NOT to Use

- Purely UI-driven product
- No external integration needs
- Security constraints prohibit external access
- Early MVP without integration roadmap

## Architecture

### API Gateway Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   Rate Limiting │ Auth │ Routing │ Logging            │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌─────────────────────────┼─────────────────────────────┐  │
│  │                   API VERSIONS                         │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐         │  │
│  │  │  v1 API   │  │  v2 API   │  │ v3 (beta) │         │  │
│  │  │(deprecated)│  │ (current) │  │  (preview)│         │  │
│  │  └───────────┘  └───────────┘  └───────────┘         │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌─────────────────────────┼─────────────────────────────┐  │
│  │                   SERVICES                             │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐         │  │
│  │  │  Core     │  │  Billing  │  │   AI      │         │  │
│  │  │  Service  │  │  Service  │  │  Service  │         │  │
│  │  └───────────┘  └───────────┘  └───────────┘         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### API Authentication Methods

| Method | Use Case | Tenant Isolation | Best For |
|--------|----------|------------------|----------|
| API Key | Server-to-server | Key bound to tenant | Internal integrations |
| OAuth 2.0 | User-delegated access | Token scoped to tenant | Third-party apps |
| JWT | Stateless auth | Claims include tenant_id | High-throughput APIs |
| mTLS | Service mesh | Cert per tenant/service | Enterprise integrations |

### Request Flow

```
API Request
      │
      ▼
┌─────────────────┐
│ Authentication  │ ← Validate API key/token
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tenant Extract  │ ← Get tenant_id from auth
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Rate Limit      │ ← Check per-tenant quota
│ Check           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Route to        │
│ Service         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Execute with    │ ← Tenant context attached
│ Tenant Context  │
└────────┬────────┘
         │
         ▼
    Response
```

### Configuration Schema

```yaml
api_integration:
  tenant_id: uuid
  tier: enum[free, pro, enterprise]
  bam_controlled: true
  
  authentication:
    methods_enabled: string[]  # api_key, oauth, jwt
    api_keys:
      max_keys: int
      rotation_days: int
      
    oauth:
      client_credentials_enabled: bool
      authorization_code_enabled: bool
      pkce_required: bool
      token_ttl_seconds: int
      refresh_token_enabled: bool
      
  rate_limiting:
    requests_per_minute: int
    requests_per_day: int
    burst_size: int
    per_endpoint_limits:
      - endpoint: string
        limit: int
        
  versioning:
    current_version: string
    supported_versions: string[]
    deprecated_versions: string[]
    sunset_policy_days: int
    
  webhooks:
    enabled: bool
    max_endpoints: int
    retry_policy:
      max_attempts: int
      backoff_seconds: int[]
    signature_verification: bool
    
  documentation:
    openapi_spec_url: string
    developer_portal_access: bool
    sandbox_enabled: bool
```

### Webhook Event Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    WEBHOOK DELIVERY                          │
│                                                              │
│  Event ──▶ Queue ──▶ Deliver ──▶ Retry (if fail)           │
│    │         │          │            │                       │
│    ▼         ▼          ▼            ▼                       │
│ tenant_id  Per-tenant  HTTP POST   Exponential              │
│ attached   queue       + signature  backoff                  │
│                                                              │
│  Webhook Payload:                                            │
│  {                                                           │
│    "event_type": "invoice.paid",                            │
│    "tenant_id": "uuid",                                     │
│    "timestamp": "2026-04-30T12:00:00Z",                     │
│    "data": { ... },                                         │
│    "signature": "sha256=..."                                │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

### SDK Generation Strategy

```
OpenAPI Spec
      │
      ├──▶ TypeScript SDK (auto-generated)
      │
      ├──▶ Python SDK (auto-generated)
      │
      ├──▶ Go SDK (auto-generated)
      │
      └──▶ API Reference Docs
           │
           ▼
      Developer Portal
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| REST | Universal, simple | Verbose, over-fetching | General APIs |
| GraphQL | Flexible queries | Complexity, caching | Complex data needs |
| gRPC | Performance, types | Browser limitations | Internal services |
| Webhooks | Real-time push | Endpoint management | Event notifications |

## Quality Checks

- [ ] API keys scoped to tenant
- [ ] Rate limits per tenant tier
- [ ] Webhook signatures verified
- [ ] API versioning documented
- [ ] **CRITICAL:** No cross-tenant data exposure via API

## Web Research Queries

- "API gateway multi-tenant patterns {date}"
- "OAuth 2.0 SaaS implementation {date}"
- "webhook delivery patterns {date}"
- "API versioning strategies {date}"
- "developer portal best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-PL5 | Pattern implementation verified |

## Related Patterns

- [partner-apis.md](partner-apis.md) - Partner API management
- [zero-trust.md](zero-trust.md) - API security
