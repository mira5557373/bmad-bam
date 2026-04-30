# Step 6: Session Management (ZAM)

## Purpose

Design tenant-scoped session management including session creation, validation, token lifecycle, and cross-tenant isolation.

## Prerequisites

- [ ] Steps 2-5 completed (SSO, IdP, OAuth, API keys)
- [ ] Authentication flows documented

## Actions

### 1. Session Architecture

```yaml
session:
  session_id: string       # Cryptographically random, opaque
  tenant_id: uuid
  user_id: uuid
  
  creation:
    created_at: timestamp
    auth_method: enum[password, sso_saml, sso_oidc, oauth, api_key]
    idp_session_id: string  # Link to IdP session for SLO
    ip_address: string
    user_agent: string
    device_fingerprint: string
    
  tokens:
    access_token_jti: string
    refresh_token_jti: string
    access_token_expires_at: timestamp
    refresh_token_expires_at: timestamp
    
  status:
    is_active: bool
    last_activity: timestamp
    idle_timeout_at: timestamp
    absolute_timeout_at: timestamp
    
  security:
    mfa_verified: bool
    mfa_method: enum[totp, sms, email, webauthn]
    elevation_level: enum[standard, elevated, admin]
    elevation_expires_at: timestamp
    
  context:
    current_role: string
    impersonating_user_id: string  # For admin impersonation
    impersonation_reason: string
```

### 2. Session Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    Session Lifecycle                             │
│                                                                  │
│  ┌──────────────┐                                               │
│  │   Auth       │                                               │
│  │   Success    │                                               │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐    Activity    ┌──────────────┐               │
│  │   Session    │◄──────────────►│   Active     │               │
│  │   Created    │                │   Session    │               │
│  └──────────────┘                └──────┬───────┘               │
│                                         │                        │
│              ┌──────────────────────────┼──────────────────┐    │
│              │                          │                   │    │
│              ▼                          ▼                   ▼    │
│       ┌──────────────┐         ┌──────────────┐    ┌───────────┐│
│       │   Idle       │         │   Explicit   │    │  Absolute ││
│       │   Timeout    │         │   Logout     │    │  Timeout  ││
│       └──────┬───────┘         └──────┬───────┘    └─────┬─────┘│
│              │                        │                   │      │
│              └────────────────────────┴───────────────────┘      │
│                                       │                          │
│                                       ▼                          │
│                              ┌──────────────┐                    │
│                              │   Session    │                    │
│                              │   Terminated │                    │
│                              └──────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Timeout Configuration per Tier

| Timeout Type | Free | Pro | Enterprise | Notes |
|--------------|------|-----|------------|-------|
| Idle Timeout | 15 min | 30 min | Configurable | Re-auth after inactivity |
| Absolute Timeout | 8 hours | 24 hours | Configurable | Max session length |
| Remember Me | 7 days | 30 days | 90 days | Refresh token lifetime |
| MFA Grace | N/A | 1 hour | Configurable | Time before MFA re-prompt |

### 4. Cross-Tenant Isolation

```yaml
tenant_isolation:
  session_storage:
    strategy: enum[shared_with_prefix, tenant_database, tenant_redis]
    key_format: "session:{tenant_id}:{session_id}"
    
  validation_rules:
    - "Session tenant_id MUST match request tenant context"
    - "Cross-tenant session access MUST fail with 403"
    - "Session tokens MUST include tenant_id claim"
    
  admin_impersonation:
    allowed: true
    requires_audit: true
    max_duration_minutes: 60
    allowed_roles: ["platform_admin", "support_admin"]
    audit_fields:
      - admin_user_id
      - target_tenant_id
      - target_user_id
      - reason
      - actions_performed
```

### 5. Single Logout (SLO)

```yaml
single_logout:
  saml_slo:
    sp_initiated: true
    idp_initiated: true
    binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
    
  oidc_logout:
    front_channel: true
    back_channel: true
    post_logout_redirect: true
    
  session_termination:
    invalidate_all_tokens: true
    clear_refresh_tokens: true
    notify_connected_apps: true
    
  logout_cascade:
    1_revoke_access_tokens: "Immediate"
    2_revoke_refresh_tokens: "Immediate"
    3_terminate_session: "Immediate"
    4_notify_idp: "If IdP-initiated available"
    5_clear_client_storage: "Via front-channel"
```

### 6. Session Security Controls

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Session Fixation | Regenerate session ID on auth | Prevent hijacking |
| Token Binding | Bind to device fingerprint | Prevent token theft |
| Concurrent Sessions | Configurable limit per tenant | Prevent sharing |
| Geo-Fencing | Optional IP/country restriction | Enterprise compliance |
| Step-Up Auth | Re-authenticate for sensitive ops | Elevated security |

## Soft Gate Checkpoint

**Steps 1-6 complete the authentication architecture design.**

Present summary of:
- SSO protocol configuration (SAML/OIDC)
- IdP integration architecture
- OAuth provider design
- API key management
- Session management

Ask for confirmation before generating final documentation.

## Verification

- [ ] Session schema defined
- [ ] Lifecycle states documented
- [ ] Timeout policies per tier
- [ ] Cross-tenant isolation verified
- [ ] Single logout implemented
- [ ] Security controls specified

## Outputs

- Session management specification
- SLO integration design
- Security controls matrix
- **Complete:** `{output_folder}/planning-artifacts/auth-integration.md`

## Quality Gate

Submit for **QG-S4** (Authentication Security) and **QG-S5** (Session Security) validation.

## Template

Load and populate: `{project-root}/_bmad/bam/data/templates/auth-integration.md`
