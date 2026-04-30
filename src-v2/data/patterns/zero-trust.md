---
pattern_id: zero-trust
shortcode: ZZT
category: security
qg_ref: QG-S5
version: 1.0.0
last_reviewed: 2026-04-29
---

# Zero Trust Architecture - BAM Pattern

**Loaded by:** ZZT  
**Applies to:** Never trust, always verify - tenant and service level

---

## When to Use

- Multi-tenant SaaS with sensitive data
- Microservices with inter-service calls
- AI agents accessing tenant resources
- External API integrations
- Healthcare, financial, or government compliance requirements

## When NOT to Use

- Single-tenant deployments with network isolation
- Internal tools with trusted networks only
- Development/testing environments (may be relaxed)
- Latency-critical paths where verification overhead is unacceptable

## Architecture

### Trust Boundary Model

```
┌─────────────────────────────────────────────────────────────┐
│                     UNTRUSTED ZONE                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              API Gateway (JWT + tenant_id)             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          Service Mesh (mTLS + identity)         │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │        Database (RLS + context)           │  │  │  │
│  │  │  │  ┌───────────────────────────────┐  │  │  │  │
│  │  │  │  │   AI Agent (tools + budget)   │  │  │  │  │
│  │  │  │  └───────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Verification Points

| Layer | Verification | Enforcement | Failure Action |
|-------|-------------|-------------|----------------|
| API Gateway | JWT + tenant_id claim | Block | 401 Unauthorized |
| Service Mesh | mTLS + service identity | Block | Connection refused |
| Database | RLS + connection context | Filter | Empty result set |
| AI Agent | Tool permissions + budget | Throttle | 429 or graceful degrade |

### Request Flow

```
Client Request
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ API Gateway │────▶│   Service   │────▶│  Database   │
│  JWT Check  │     │ mTLS+AuthZ  │     │ RLS Filter  │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
   tenant_id          service_id          tenant_id
   extracted          verified            in context
```

### Implementation Schema

```yaml
zero_trust_config:
  identity_provider:
    type: string  # oidc, saml, custom
    issuer: string
    jwks_uri: string
    
  token_validation:
    issuer: string
    audience: string
    tenant_claim: "tenant_id"
    required_claims: ["sub", "tenant_id", "scope"]
    clock_skew_seconds: 30
    
  service_mesh:
    mtls_enabled: true
    service_accounts:
      - name: string
        namespace: string
        allowed_services: string[]
    cert_rotation_hours: 24
    
  database_context:
    rls_enabled: true
    context_propagation: "session_variable"  # or "jwt_claim"
    context_variable: "app.tenant_id"
    
  ai_agent:
    tool_permissions:
      - tool: string
        allowed_scopes: string[]
    budget_enforcement:
      tokens_per_request: int
      cost_limit_per_tenant: float
```

### Tenant-Aware Zero Trust

| Tier | Gateway Verification | Service Verification | Data Verification |
|------|---------------------|---------------------|-------------------|
| Free | JWT only | Shared service identity | RLS |
| Pro | JWT + MFA option | Dedicated service identity | RLS + audit |
| Enterprise | JWT + MFA + IP allowlist | Isolated service mesh | Schema isolation + encryption |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full zero trust | Maximum security, compliance-ready | Performance overhead, complexity | Regulated industries |
| Perimeter + internal trust | Better latency, simpler | Single breach exposure | Internal tools |
| Selective zero trust | Balanced security/performance | Complex configuration | Hybrid deployments |
| Gateway-only verification | Fastest, simplest | No defense in depth | Low-risk applications |

## Quality Checks

- [ ] JWT validation at API gateway with tenant_id claim
- [ ] mTLS between all services in mesh
- [ ] RLS policies on all tenant-scoped tables
- [ ] Service-to-service authentication enforced
- [ ] **CRITICAL:** No implicit trust between components

## Web Research Queries

- "zero trust architecture multi-tenant SaaS {date}"
- "service mesh mTLS patterns kubernetes {date}"
- "AI agent permission boundaries enterprise {date}"
- "NIST zero trust architecture guidelines {date}"
- "BeyondCorp implementation patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S5 | Pattern implementation verified |

## Related Patterns

- [zero-trust.md](zero-trust.md) - Security boundaries
- [secrets-management.md](secrets-management.md) - Credential management

