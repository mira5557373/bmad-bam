# Step 21: Validate Authentication Architecture

## Purpose

Validate authentication architecture against QG-S4, QG-S5, and QG-M2 quality gates.

## Actions

### 1. QG-S4: Authentication Security Checks

#### Critical Checks (All Must Pass)

- [ ] **CRITICAL:** SAML assertions signed and validated
- [ ] **CRITICAL:** OIDC tokens validated (issuer, audience, signature)
- [ ] **CRITICAL:** OAuth PKCE required for public clients
- [ ] **CRITICAL:** API keys hashed (never plaintext storage)
- [ ] **CRITICAL:** Secrets stored in secure vault

#### Standard Checks

- [ ] Multi-IdP routing correctly configured
- [ ] Attribute mapping covers required claims
- [ ] JIT provisioning respects tenant boundaries
- [ ] SCIM integration includes deprovisioning
- [ ] Token lifetimes within security policy
- [ ] Client credentials securely managed
- [ ] API key rotation policy defined

### 2. QG-S5: Session Security Checks

#### Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Session ID regeneration on authentication
- [ ] **CRITICAL:** Sessions tenant-scoped and isolated
- [ ] **CRITICAL:** Refresh tokens rotated on use
- [ ] **CRITICAL:** SLO terminates all related sessions

#### Standard Checks

- [ ] Idle timeout configured per tier
- [ ] Absolute timeout enforced
- [ ] Concurrent session limits defined
- [ ] Session binding to device/IP (where required)
- [ ] Step-up authentication for sensitive operations
- [ ] Admin impersonation fully audited

### 3. QG-M2: Tenant Isolation Checks

#### Critical Checks (All Must Pass)

- [ ] **CRITICAL:** No cross-tenant session access possible
- [ ] **CRITICAL:** Tokens include tenant_id claim
- [ ] **CRITICAL:** API keys scoped to single tenant
- [ ] **CRITICAL:** IdP configurations isolated per tenant

#### Standard Checks

- [ ] Session storage uses tenant prefix
- [ ] Token validation includes tenant check
- [ ] Audit logs include tenant context
- [ ] Rate limits applied per tenant

### 4. Validation Matrix

| Component | QG-S4 | QG-S5 | QG-M2 | Status |
|-----------|-------|-------|-------|--------|
| SSO/SAML | | | | |
| SSO/OIDC | | | | |
| OAuth Provider | | | | |
| API Keys | | | | |
| Sessions | | | | |

### 5. Issue Tracking

| Issue | Severity | Gate | Remediation |
|-------|----------|------|-------------|
| | | | |

## Outputs

- Validation results matrix
- Issue list with severity
- Gate pass/fail determination

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
