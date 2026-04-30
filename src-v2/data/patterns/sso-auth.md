---
pattern_id: sso-auth
shortcode: ZSO
category: security
qg_ref: QG-S5
version: 1.0.0
last_reviewed: 2026-04-29
---

# SSO & Authentication - BAM Pattern

**Loaded by:** ZAS, ZAO, ZAK, ZAM  
**Applies to:** Enterprise authentication, SSO integration, OAuth, API keys, session management  
**See also:** [zero-trust.md](zero-trust.md), [secrets-management.md](secrets-management.md)

---

## When to Use

- Enterprise SSO integration (SAML 2.0, OIDC)
- Multi-IdP support per tenant
- OAuth 2.0 authorization server
- API key authentication for M2M
- Tenant-scoped session management

## When NOT to Use

- Simple username/password only (use framework defaults)
- Single-tenant applications
- Internal tools without external IdP requirements

## Architecture

### Multi-Tenant SSO Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 Multi-Tenant SSO Architecture                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Tenant Selection                       │   │
│  │  (subdomain / path / email domain / explicit selection)  │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    IdP Router                             │   │
│  │           (lookup tenant IdP configuration)               │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│          ┌────────────────┼────────────────┐                    │
│          ▼                ▼                ▼                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │  SAML 2.0    │ │    OIDC      │ │   Platform   │            │
│  │  (Enterprise)│ │   (Cloud)    │ │   (Default)  │            │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘            │
│         │                │                │                     │
│         └────────────────┴────────────────┘                     │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 Session Creation                          │   │
│  │    (tenant_id, user_id, roles, tokens, expiry)           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### SAML 2.0 SP Configuration (P2-01)

```yaml
saml_service_provider:
  entity_id_template: "https://app.example.com/saml/{tenant_id}"
  
  endpoints:
    acs_url: "https://app.example.com/saml/acs/{tenant_id}"
    slo_url: "https://app.example.com/saml/slo/{tenant_id}"
    metadata_url: "https://app.example.com/saml/metadata/{tenant_id}"
    
  security:
    want_assertions_signed: true
    want_assertions_encrypted: false  # Optional, impacts performance
    signature_algorithm: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"
    digest_algorithm: "http://www.w3.org/2001/04/xmlenc#sha256"
    
  attribute_mapping:
    standard:
      email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      given_name: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
      family_name: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
      groups: "http://schemas.microsoft.com/ws/2008/06/identity/claims/groups"
    custom:
      tenant_id: "custom:tenant_id"
      department: "custom:department"
      
  session_binding:
    index_assertion_id: true
    link_to_idp_session: true  # For SLO
```

### OIDC RP Configuration (P2-02)

```yaml
oidc_relying_party:
  client_id_per_tenant: true
  
  discovery:
    use_discovery: true
    cache_discovery_seconds: 3600
    
  flows:
    authorization_code:
      pkce_required: true
      state_includes_tenant: true
      nonce_required: true
      
  token_validation:
    validate_issuer: true
    validate_audience: true
    validate_expiry: true
    clock_skew_seconds: 60
    
  claims:
    required: ["sub", "email"]
    optional: ["name", "groups", "tenant_id"]
    
  session_management:
    check_session_iframe: true
    session_state_validation: true
```

### JIT Provisioning (P2-03)

```yaml
jit_provisioning:
  strategy: enum[create_on_first_login, require_preregistration, hybrid]
  
  user_creation:
    source_of_truth: "idp"
    sync_attributes_on_login: true
    conflict_resolution: enum[idp_wins, platform_wins, merge]
    
  role_mapping:
    strategy: enum[group_based, attribute_based, default_role]
    
    group_mappings:
      - idp_group: "Admins"
        platform_role: "tenant_admin"
        priority: 1
      - idp_group: "Users"
        platform_role: "member"
        priority: 2
        
    attribute_mappings:
      - attribute: "department"
        value: "Engineering"
        platform_role: "developer"
        
    default_role: "viewer"
    
  deprovisioning:
    on_group_removal: enum[remove_role, disable_user, no_action]
    on_idp_suspension: enum[disable_user, suspend_user, no_action]
    orphan_user_policy: enum[disable_after_days, delete_after_days, preserve]
    orphan_threshold_days: 90
```

### OAuth 2.0 Authorization Server (P2-04)

```yaml
oauth_authorization_server:
  issuer: "https://auth.example.com"
  
  grants_supported:
    - authorization_code
    - refresh_token
    - client_credentials
    - urn:ietf:params:oauth:grant-type:device_code
    
  tokens:
    access_token:
      type: "JWT"
      signing: "RS256"
      lifetime_seconds: 3600
      tenant_claim: required
      
    refresh_token:
      type: "opaque"
      rotation: true
      reuse_detection: true
      lifetime_seconds: 604800
      
  scopes:
    - "openid"
    - "profile"
    - "email"
    - "tenant:read"
    - "tenant:write"
    - "agent:execute"
    
  client_authentication:
    methods:
      - client_secret_basic
      - client_secret_post
      - private_key_jwt
```

### API Key Authentication (P2-05)

```yaml
api_key_authentication:
  key_format:
    prefix: "bam_"
    type_indicator: enum[pk, sk, sa]
    environment: enum[live, test]
    entropy_bits: 256
    
  storage:
    hash_algorithm: "argon2id"
    never_store_plaintext: true
    
  rotation:
    auto_rotation_days: 90
    grace_period_days: 7
    notify_before_expiry_days: 14
    
  rate_limiting:
    per_key: true
    default_rpm: 1000
    burst_multiplier: 1.5
    
  permissions:
    scope_based: true
    resource_restrictions: true
    ip_allowlist: optional
```

### Session Management (P2-06)

```yaml
session_management:
  storage:
    backend: enum[redis, postgresql, dynamodb]
    key_pattern: "session:{tenant_id}:{session_id}"
    encryption: true
    
  timeouts:
    idle_default_minutes: 30
    absolute_default_hours: 24
    tier_overrides:
      free:
        idle_minutes: 15
        absolute_hours: 8
      enterprise:
        idle_minutes: 60
        absolute_hours: 72
        
  security:
    regenerate_on_auth: true
    bind_to_ip: optional
    bind_to_user_agent: true
    concurrent_limit: 5
    
  single_logout:
    saml_slo: true
    oidc_backchannel: true
    cascade_to_apps: true
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Per-tenant IdP | Maximum flexibility | Complex management | Enterprise SaaS |
| Shared IdP | Simple operations | Limited customization | SMB SaaS |
| SAML 2.0 | Enterprise standard | Verbose, XML-based | Enterprise IdPs |
| OIDC | Modern, JWT-based | Less enterprise adoption | Cloud-first |
| API Keys | Simple M2M auth | No user identity | Service accounts |
| OAuth 2.0 | Standard, flexible | Implementation complexity | Third-party apps |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Assertion replay | Validate timestamps, cache assertion IDs |
| Token theft | Short lifetimes, rotation, binding |
| Session hijacking | Regenerate ID, bind to client |
| Cross-tenant access | Validate tenant in all auth paths |
| Key compromise | Rotation, monitoring, alerting |

## Web Research Queries

- "SAML 2.0 multi-tenant SaaS implementation {date}"
- "OIDC enterprise identity provider integration {date}"
- "OAuth 2.0 authorization server multi-tenant {date}"
- "API key management best practices {date}"
- "tenant-scoped session management patterns {date}"
- "JIT provisioning SCIM integration {date}"
- "single logout SLO implementation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S5 | Pattern implementation verified |

## Related Patterns

- [zero-trust.md](zero-trust.md) - Security boundaries
- [secrets-management.md](secrets-management.md) - Credential management

