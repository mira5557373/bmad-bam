# Step 2: SSO Protocol Design (ZAS)

## Purpose

Design SSO protocol configuration for SAML 2.0 and OIDC supporting enterprise identity providers.

## Prerequisites

- [ ] Step 1 completed (requirements analysis)
- [ ] IdP landscape documented

## Actions

### 1. SAML 2.0 Configuration

Design SAML Service Provider (SP) configuration:

```yaml
saml_sp_config:
  entity_id: "https://app.example.com/saml/metadata/{tenant_id}"
  
  assertion_consumer_service:
    url: "https://app.example.com/saml/acs/{tenant_id}"
    binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
  
  single_logout_service:
    url: "https://app.example.com/saml/slo/{tenant_id}"
    binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
  
  name_id_format: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
  
  attribute_mapping:
    email: ["email", "mail", "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
    first_name: ["firstName", "givenName", "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]
    last_name: ["lastName", "sn", "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"]
    groups: ["groups", "memberOf", "http://schemas.microsoft.com/ws/2008/06/identity/claims/groups"]
  
  tenant_extraction:
    strategy: enum[subdomain, path, assertion_attribute]
    assertion_attribute: "tenant_id"
    validation: required
```

### 2. OIDC Configuration

Design OpenID Connect Relying Party (RP) configuration:

```yaml
oidc_rp_config:
  client_registration:
    per_tenant: true
    dynamic_registration: false
    
  authorization_endpoint_params:
    scope: "openid profile email"
    response_type: "code"
    state_includes_tenant: true
    
  token_validation:
    issuer_validation: strict
    audience_validation: tenant_specific
    nonce_validation: required
    
  claims_mapping:
    sub: "user_id"
    email: "email"
    name: "display_name"
    groups: "roles"
    tenant_id: "custom:tenant_id"
    
  id_token_signing:
    algorithms: ["RS256", "ES256"]
    key_rotation: automatic
```

### 3. Protocol Selection Matrix

| Factor | SAML 2.0 | OIDC | Recommendation |
|--------|----------|------|----------------|
| Enterprise IdPs | Primary | Secondary | SAML for enterprise |
| Modern apps | Limited | Primary | OIDC for new apps |
| Mobile/SPA | Complex | Native | OIDC for mobile |
| B2B | Standard | Growing | Support both |
| Token size | Large (XML) | Small (JWT) | OIDC for APIs |

### 4. Multi-Tenant Protocol Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Multi-Tenant SSO Flow                         │
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │  User    │───►│   Tenant     │───►│   IdP Router         │  │
│  │  Access  │    │   Selection  │    │   (tenant config)    │  │
│  └──────────┘    └──────────────┘    └──────────┬───────────┘  │
│                                                  │               │
│                          ┌───────────────────────┴───────┐      │
│                          ▼                               ▼      │
│                   ┌──────────────┐              ┌────────────┐  │
│                   │  SAML Flow   │              │ OIDC Flow  │  │
│                   │  (AuthnReq)  │              │ (AuthZ)    │  │
│                   └──────┬───────┘              └─────┬──────┘  │
│                          │                            │         │
│                          ▼                            ▼         │
│                   ┌──────────────┐              ┌────────────┐  │
│                   │  Enterprise  │              │  Cloud     │  │
│                   │  IdP         │              │  IdP       │  │
│                   │  (Okta/AD)   │              │  (Google)  │  │
│                   └──────┬───────┘              └─────┬──────┘  │
│                          │                            │         │
│                          ▼                            ▼         │
│                   ┌──────────────┐              ┌────────────┐  │
│                   │  SAML        │              │  ID Token  │  │
│                   │  Assertion   │              │  + Code    │  │
│                   └──────┬───────┘              └─────┬──────┘  │
│                          │                            │         │
│                          └───────────────┬────────────┘         │
│                                          ▼                      │
│                                   ┌──────────────┐              │
│                                   │   Session    │              │
│                                   │   Created    │              │
│                                   │ (tenant_id)  │              │
│                                   └──────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

## Verification

- [ ] SAML SP configuration designed
- [ ] OIDC RP configuration designed
- [ ] Protocol selection criteria documented
- [ ] Tenant extraction strategy defined
- [ ] Attribute mapping specified

## Outputs

- SAML SP configuration specification
- OIDC RP configuration specification
- Protocol selection matrix

## Next Step

Proceed to `step-03-c-idp-integration.md` for IdP integration architecture.
