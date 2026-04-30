---
name: qg-s5-authentication
description: Authentication and session security gate for SSO, OAuth, API keys, and session management
module: bam
tags: [security, quality-gate, authentication, sso, oauth, session]
version: 1.0.0
---

# QG-S5: Authentication Security Gate Checklist

> **Gate ID:** QG-S5 (Authentication Security)
> **Definition:** Authentication architecture MUST be secure, tenant-isolated, and enterprise-ready.
> **Scope:** Covers SSO (SAML/OIDC), OAuth provider, API keys, and session management.
> **Recovery:** Gate failure requires architecture remediation before production deployment.

**Workflow:** bmad-bam-auth-integration  
**Prerequisites:** QG-F1 (Foundation), QG-M2 (Tenant Isolation)

---

## Purpose

The Authentication Security Gate (QG-S5) validates that authentication architecture is secure and properly isolates tenants. This gate ensures:

1. **SSO integration** uses secure protocols with proper validation
2. **OAuth provider** implements secure token management
3. **API keys** are securely generated, stored, and rotated
4. **Session management** prevents hijacking and cross-tenant access

Passing QG-S5 confirms authentication is enterprise-ready.

---

## SSO Protocol Security

### SAML 2.0 Security

- [ ] **CRITICAL:** SAML assertions are signed and signature is validated
- [ ] **CRITICAL:** Assertion consumer service (ACS) validates tenant context
- [ ] **CRITICAL:** Assertion replay protection implemented (ID caching)
- [ ] Assertion timestamp validation with reasonable clock skew (< 5 min)
- [ ] Encrypted assertions supported for sensitive attributes
- [ ] Certificate expiry monitoring implemented
- [ ] Single Logout (SLO) implemented

### OIDC Security

- [ ] **CRITICAL:** ID token signature validated (RS256 or ES256)
- [ ] **CRITICAL:** Issuer validation enforced
- [ ] **CRITICAL:** Audience validation includes tenant-specific audience
- [ ] **CRITICAL:** Nonce validation for replay prevention
- [ ] PKCE required for all public clients
- [ ] State parameter includes tenant context
- [ ] Token binding to session implemented

### Multi-Tenant SSO

- [ ] **CRITICAL:** Tenant identification before IdP redirect
- [ ] **CRITICAL:** No cross-tenant IdP configuration access
- [ ] IdP connection management tenant-isolated
- [ ] IdP metadata stored per tenant
- [ ] SSO session linked to tenant context

---

## OAuth Provider Security

### Authorization Server

- [ ] **CRITICAL:** Authorization code + PKCE for all web/mobile flows
- [ ] **CRITICAL:** Client credentials only for confidential clients
- [ ] **CRITICAL:** Client secrets stored encrypted
- [ ] Redirect URI validation strict (exact match)
- [ ] State parameter required and validated
- [ ] Token endpoint authentication enforced

### Token Security

- [ ] **CRITICAL:** Access tokens are JWTs with tenant_id claim
- [ ] **CRITICAL:** Refresh token rotation enabled
- [ ] **CRITICAL:** Refresh token reuse detection active
- [ ] Access token lifetime <= 1 hour
- [ ] Refresh token lifetime appropriate per tier
- [ ] Token revocation endpoint implemented
- [ ] Token introspection includes tenant validation

### Scope Management

- [ ] **CRITICAL:** Scopes validated against client registration
- [ ] **CRITICAL:** Tenant-scoped resources require tenant:* scopes
- [ ] Default scopes are minimal
- [ ] Agent execution scopes (agent:execute) require explicit grant

---

## API Key Security

### Key Generation

- [ ] **CRITICAL:** Keys generated with cryptographically secure randomness (256-bit)
- [ ] **CRITICAL:** Keys never stored in plaintext (Argon2id hash)
- [ ] **CRITICAL:** Key shown only once at creation
- [ ] Key format includes environment indicator (live/test)
- [ ] Key prefix identifies key type (pk/sk/sa)

### Key Management

- [ ] **CRITICAL:** Keys are tenant-scoped (cannot access other tenants)
- [ ] **CRITICAL:** Key revocation is immediate and complete
- [ ] Key rotation policy defined (90 days default)
- [ ] Grace period for rotation (7 days)
- [ ] Rotation notification sent before expiry

### Key Usage

- [ ] **CRITICAL:** Rate limiting per key enforced
- [ ] **CRITICAL:** Key usage logged with tenant context
- [ ] IP allowlist support for enterprise keys
- [ ] Scope restrictions per key
- [ ] Last used timestamp tracked

---

## Session Security

### Session Creation

- [ ] **CRITICAL:** Session ID regenerated on authentication
- [ ] **CRITICAL:** Session ID cryptographically random (128-bit minimum)
- [ ] **CRITICAL:** Session bound to tenant context
- [ ] Session includes auth method metadata
- [ ] MFA status captured in session

### Session Storage

- [ ] **CRITICAL:** Session storage uses tenant-prefixed keys
- [ ] **CRITICAL:** No cross-tenant session access possible
- [ ] Session data encrypted at rest
- [ ] Session storage resilient (Redis cluster or equivalent)

### Session Lifecycle

- [ ] **CRITICAL:** Idle timeout enforced per tier
- [ ] **CRITICAL:** Absolute timeout enforced
- [ ] Concurrent session limit configurable
- [ ] Session extension requires activity
- [ ] Suspicious session termination automatic

### Session Termination

- [ ] **CRITICAL:** Logout invalidates all session tokens
- [ ] **CRITICAL:** Single Logout (SLO) cascades to IdP
- [ ] Refresh tokens revoked on logout
- [ ] Connected application sessions terminated
- [ ] Session termination logged

### Session Security Controls

- [ ] **CRITICAL:** Session fixation protection active
- [ ] Device fingerprint binding optional (enterprise)
- [ ] Geographic anomaly detection active
- [ ] Step-up authentication for sensitive operations
- [ ] Admin impersonation fully audited

---

## Cross-Tenant Isolation

### Authentication Isolation

- [ ] **CRITICAL:** User authentication validates tenant membership
- [ ] **CRITICAL:** Tokens include tenant_id in payload (not just header)
- [ ] **CRITICAL:** API keys cannot access other tenant data
- [ ] IdP configurations isolated per tenant
- [ ] SSO assertions validate tenant context

### Session Isolation

- [ ] **CRITICAL:** Session storage keys include tenant_id
- [ ] **CRITICAL:** Session lookup validates tenant context
- [ ] **CRITICAL:** No session ID collision across tenants
- [ ] Session data cannot leak between tenants

---

## Audit Logging

### Authentication Events

- [ ] **CRITICAL:** All authentication attempts logged (success/failure)
- [ ] **CRITICAL:** Failed authentication includes source IP, user agent
- [ ] SSO assertions logged (without sensitive claims)
- [ ] OAuth token grants logged
- [ ] API key usage logged

### Session Events

- [ ] **CRITICAL:** Session creation logged
- [ ] **CRITICAL:** Session termination logged with reason
- [ ] Privilege elevation logged
- [ ] Impersonation events logged with admin details

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All critical checks pass, 80%+ standard checks pass |
| **CONDITIONAL** | All critical pass, <80% standard, mitigation plan documented |
| **FAIL** | Any critical check fails |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

---

## Recovery Protocol

**If QG-S5 fails:**

### Attempt 1: Architecture Fix (target: 3 days)

1. Identify specific failing critical checks
2. Review authentication architecture design
3. Implement security controls for failed areas
4. Re-run validation on fixed components
5. **Lock passed categories**

### Attempt 2: Security Review (target: 1 week)

1. Engage security architect for review
2. Conduct threat modeling for auth flows
3. Implement additional controls
4. Re-validate all authentication flows
5. **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

1. Escalate to Security Lead and CISO
2. Full architecture review required
3. External security assessment may be required
4. Document findings and remediation plan

---

## Related Workflows

- `bmad-bam-auth-integration` - Authentication architecture design
- `bmad-bam-security` - Security architecture
- `bmad-bam-security-operations` - Secrets management
- `bmad-bam-tenant-isolation` - Tenant isolation patterns

---

## Web Research Verification

- [ ] Search the web: "SAML 2.0 security best practices {date}"
- [ ] Search the web: "OAuth 2.0 multi-tenant security patterns {date}"
- [ ] Search the web: "API key security hashing rotation {date}"
- [ ] Search the web: "session management security controls {date}"

---

**PASS CRITERIA:** All critical authentication checks pass
**OWNER:** Security Architect
**REVIEWERS:** Platform Architect, CISO

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-29 | BAM | Initial authentication security gate |
