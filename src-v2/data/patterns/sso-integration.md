---
pattern_id: sso-integration
shortcode: ZSI
category: security
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# SSO Integration - BAM Pattern

**Loaded by:** ZSI  
**Applies to:** Multi-tenant SSO with SAML, OIDC, and OAuth  
**See also:** [tenant-rbac.md](tenant-rbac.md), [zero-trust.md](zero-trust.md)

---

## When to Use

- Multi-tenant SaaS requiring enterprise SSO
- Tenant-specific identity provider connections
- SAML 2.0 or OIDC federation requirements
- Just-in-Time (JIT) user provisioning scenarios
- SCIM-based directory synchronization

## When NOT to Use

- Single-tenant internal applications
- Consumer applications with social login only
- B2C scenarios without enterprise requirements
- Applications without tenant isolation needs

## Architecture

### Multi-Tenant IdP Connection Model

```
┌─────────────────────────────────────────────────────────────┐
│                     SSO Gateway                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Tenant A   │  │  Tenant B   │  │  Tenant C   │         │
│  │  Okta OIDC  │  │ Azure SAML  │  │  OneLogin   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│  ┌──────▼────────────────▼────────────────▼──────┐         │
│  │           IdP Connection Registry              │         │
│  │  ┌─────────────────────────────────────────┐  │         │
│  │  │  tenant_id │ protocol │ metadata_url    │  │         │
│  │  │  tenant_a  │ oidc     │ https://...     │  │         │
│  │  │  tenant_b  │ saml     │ https://...     │  │         │
│  │  └─────────────────────────────────────────┘  │         │
│  └───────────────────────────────────────────────┘         │
│                          │                                  │
│  ┌───────────────────────▼───────────────────────┐         │
│  │         Session Manager (Tenant-Scoped)        │         │
│  │  • JWT with tenant_id claim                    │         │
│  │  • Refresh token rotation                      │         │
│  │  • Single Logout (SLO) cascade                 │         │
│  └───────────────────────────────────────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
User Login
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Domain    │────▶│   Tenant    │────▶│    IdP      │
│   Lookup    │     │   Router    │     │  Redirect   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                          ┌───────────────────┘
                          ▼
                    ┌─────────────┐     ┌─────────────┐
                    │    IdP      │────▶│   Assert    │
                    │   Auth      │     │   Process   │
                    └─────────────┘     └─────────────┘
                                              │
                          ┌───────────────────┘
                          ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   Session   │────▶│   Tenant    │
                    │   Create    │     │   Context   │
                    └─────────────┘     └─────────────┘
```

### Protocol Decision Matrix

| Protocol | Use Case | Complexity | Token Format |
|----------|----------|------------|--------------|
| SAML 2.0 | Enterprise legacy IdPs | High | XML Assertion |
| OIDC | Modern IdPs, mobile | Medium | JWT |
| OAuth 2.0 | API authorization | Low | Access Token |
| SCIM 2.0 | Directory sync | Medium | JSON |

## Configuration Schema

```yaml
sso_integration:
  bam_controlled: true
  
  tenant_idp_config:
    connection_type: enum[saml, oidc, oauth2]
    tenant_id: uuid
    enabled: bool
    
    # SAML Configuration
    saml:
      sp_entity_id: string
      sp_acs_url: string
      sp_slo_url: string
      idp_entity_id: string
      idp_sso_url: string
      idp_slo_url: string
      idp_certificate: string
      name_id_format: enum[email, persistent, transient]
      attribute_mapping:
        email: string
        first_name: string
        last_name: string
        groups: string
      sign_assertions: bool
      sign_requests: bool
      
    # OIDC Configuration
    oidc:
      client_id: string
      client_secret: encrypted
      issuer: string
      authorization_endpoint: string
      token_endpoint: string
      userinfo_endpoint: string
      jwks_uri: string
      scopes: string[]
      
  jit_provisioning:
    enabled: bool
    default_role: string
    attribute_to_role_mapping:
      - attribute: string
        value: string
        role: string
        
  scim:
    enabled: bool
    base_url: string
    bearer_token: encrypted
    sync_groups: bool
    sync_interval_minutes: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| SAML 2.0 | Mature, enterprise standard | Complex, XML-based | Legacy enterprise |
| OIDC | Modern, JWT-based, mobile-friendly | Requires HTTPS | Modern SSO |
| OAuth 2.0 only | Simple, widely supported | No identity federation | API access |
| Multi-protocol | Maximum compatibility | Complex maintenance | Enterprise SaaS |

## Quality Checks

- [ ] IdP connections are tenant-isolated
- [ ] SAML assertions validated against IdP certificate
- [ ] OIDC tokens validated against JWKS
- [ ] Session bound to tenant_id claim
- [ ] Single Logout cascades properly
- [ ] Certificate rotation automated
- [ ] **CRITICAL:** No cross-tenant session leakage

## Web Research Queries

- "multi-tenant SSO SAML OIDC architecture {date}"
- "tenant-specific IdP connection patterns {date}"
- "SCIM provisioning multi-tenant SaaS {date}"
- "SAML SP metadata per tenant {date}"
- "JWT tenant claim best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Enterprise SSO compliance verified |
| QG-S5 | Authentication security validated |

## Related Patterns

- [tenant-rbac.md](tenant-rbac.md) - Tenant-level access control
- [agent-rbac.md](agent-rbac.md) - AI agent permissions
- [zero-trust.md](zero-trust.md) - Security boundaries
