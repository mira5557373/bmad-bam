---
name: auth-integration
description: Authentication integration architecture template
category: security
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
related_patterns: [zero-trust, secrets-management, tenant-isolation]
---

## Purpose

Document authentication integration architecture with SSO, OAuth 2.0, and API key management for multi-tenant SaaS

# Authentication Integration Architecture

**Project:** {{project_name}}  
**Date:** {{date}}  
**Version:** {{version}}  
**Author:** {{author}}

---

## 1. Executive Summary

### Authentication Strategy

| Dimension | Selection | Rationale |
|-----------|-----------|-----------|
| SSO Protocol | [SAML 2.0 / OIDC / Both] | |
| Primary IdPs | [Okta, Azure AD, Google, etc.] | |
| OAuth Provider | [Yes / No] | |
| API Key Auth | [Yes / No] | |

### Tier-Based Authentication

| Tier | SSO Support | IdP Options | MFA |
|------|-------------|-------------|-----|
| Free | Platform only | N/A | Optional |
| Pro | OIDC | Google, Microsoft | Required |
| Enterprise | SAML + OIDC | Custom IdP | Required |

---

## 2. SSO Integration

### 2.1 SAML 2.0 Configuration

**Service Provider Settings:**

| Setting | Value |
|---------|-------|
| Entity ID | `https://{{domain}}/saml/metadata/{{tenant_id}}` |
| ACS URL | `https://{{domain}}/saml/acs/{{tenant_id}}` |
| SLO URL | `https://{{domain}}/saml/slo/{{tenant_id}}` |
| Name ID Format | emailAddress |
| Signature Algorithm | RSA-SHA256 |

**Attribute Mapping:**

| IdP Attribute | Platform Field | Required |
|---------------|----------------|----------|
| email | user.email | Yes |
| givenName | user.first_name | Yes |
| surname | user.last_name | Yes |
| groups | user.roles | No |

### 2.2 OIDC Configuration

**Relying Party Settings:**

| Setting | Value |
|---------|-------|
| Response Type | code |
| Scopes | openid profile email |
| PKCE | Required |
| Token Endpoint Auth | client_secret_basic |

**Claims Mapping:**

| Claim | Platform Field | Required |
|-------|----------------|----------|
| sub | user.idp_id | Yes |
| email | user.email | Yes |
| name | user.display_name | No |

---

## 3. Identity Provider Integration

### 3.1 Supported IdPs

| IdP | Protocol | Tiers | JIT | SCIM |
|-----|----------|-------|-----|------|
| | | | | |

### 3.2 IdP Connection Schema

```yaml
# Per-tenant IdP configuration
idp_connection:
  tenant_id: uuid
  idp_type: enum[saml, oidc]
  status: enum[active, pending, disabled]
  
  # SAML-specific
  saml:
    entity_id: string
    sso_url: string
    certificate: string
    
  # OIDC-specific
  oidc:
    issuer: string
    client_id: string
    client_secret: encrypted
```

### 3.3 JIT Provisioning Rules

| IdP Group | Platform Role | Priority |
|-----------|---------------|----------|
| | | |

---

## 4. OAuth 2.0 Provider

### 4.1 Supported Grants

| Grant Type | Use Case | Enabled |
|------------|----------|---------|
| Authorization Code + PKCE | Web/Mobile apps | Yes |
| Client Credentials | Service accounts | Yes |
| Refresh Token | Session extension | Yes |
| Device Code | CLI/IoT | Optional |

### 4.2 Token Configuration

| Token | Lifetime | Rotation |
|-------|----------|----------|
| Access Token | 1 hour | N/A |
| Refresh Token | 7 days | On use |
| ID Token | 1 hour | N/A |

### 4.3 Scopes

| Scope | Description | Default |
|-------|-------------|---------|
| openid | OIDC identity | Yes |
| profile | User profile | Yes |
| email | Email address | Yes |
| tenant:read | Read tenant data | No |
| tenant:write | Write tenant data | No |
| agent:execute | Execute AI agents | No |

---

## 5. API Key Management

### 5.1 Key Types

| Type | Prefix | Use Case | Permissions |
|------|--------|----------|-------------|
| Primary | bam_pk_ | Production | Full access |
| Secondary | bam_sk_ | Rotation | Full access |
| Service Account | bam_sa_ | CI/CD | Limited |

### 5.2 Rotation Policy

| Setting | Value |
|---------|-------|
| Auto-rotation interval | 90 days |
| Grace period | 7 days |
| Notification | 14 days before |

### 5.3 Rate Limits

| Key Type | RPM | Daily |
|----------|-----|-------|
| Primary | 1000 | 100000 |
| Service Account | 500 | 50000 |

---

## 6. Session Management

### 6.1 Timeout Configuration

| Tier | Idle Timeout | Absolute Timeout |
|------|--------------|------------------|
| Free | 15 min | 8 hours |
| Pro | 30 min | 24 hours |
| Enterprise | Configurable | Configurable |

### 6.2 Security Controls

| Control | Implementation |
|---------|----------------|
| Session regeneration | On authentication |
| Token binding | Device fingerprint |
| Concurrent sessions | 5 per user |
| IP binding | Optional (Enterprise) |

### 6.3 Single Logout

| Protocol | Support |
|----------|---------|
| SAML SLO | SP and IdP initiated |
| OIDC Logout | Front and back channel |
| Session cascade | All connected apps |

---

## 7. Security Considerations

### 7.1 Threat Mitigations

| Threat | Mitigation |
|--------|------------|
| Assertion replay | Validate timestamps, cache IDs |
| Token theft | Short lifetime, rotation |
| Session hijacking | Regenerate ID, binding |
| Cross-tenant | Tenant validation in all paths |

### 7.2 Compliance Requirements

| Framework | Requirement | Implementation |
|-----------|-------------|----------------|
| SOC 2 | Strong authentication | MFA required |
| GDPR | Consent for SSO | Explicit opt-in |
| HIPAA | Session timeout | 15 min idle |

---

## 8. Implementation Checklist

- [ ] SAML SP metadata generation
- [ ] OIDC client registration flow
- [ ] IdP connection admin UI
- [ ] JIT provisioning logic
- [ ] OAuth authorization server
- [ ] API key management API
- [ ] Session storage implementation
- [ ] SLO integration
- [ ] Audit logging

---

## Web Research Queries

- "SAML 2.0 multi-tenant SaaS best practices {{date}}"
- "OIDC integration patterns enterprise {{date}}"
- "OAuth 2.0 security recommendations {{date}}"
- "API key management security patterns {{date}}"

_Source: [URL]_ for authentication guidance.

---

## Verification Checklist

- [ ] SSO configuration documented
- [ ] IdP integration settings complete
- [ ] OAuth scopes defined
- [ ] API key policies documented
- [ ] Session timeouts configured
- [ ] Security mitigations addressed
- [ ] Compliance requirements mapped
- [ ] **CRITICAL:** No cross-tenant authentication bypass possible
- [ ] **CRITICAL:** Token and API key secrets properly encrypted

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial authentication architecture |
