# Step 3: Identity Provider Integration (ZAS)

## Purpose

Design the identity provider integration architecture including connection management, metadata exchange, and JIT provisioning.

## Prerequisites

- [ ] Step 2 completed (SSO protocol design)
- [ ] Protocol configurations defined

## Actions

### 1. IdP Connection Architecture

Design per-tenant IdP connection management:

```yaml
idp_connection:
  tenant_id: uuid
  
  connection_type: enum[saml, oidc, scim]
  status: enum[active, pending_verification, disabled]
  
  saml_config:
    idp_entity_id: string
    idp_sso_url: string
    idp_slo_url: string
    idp_certificate: string
    certificate_expiry: timestamp
    signature_algorithm: enum[RSA-SHA256, RSA-SHA512]
    
  oidc_config:
    issuer: string
    authorization_endpoint: string
    token_endpoint: string
    userinfo_endpoint: string
    jwks_uri: string
    client_id: string
    client_secret_encrypted: string
    
  attribute_mapping:
    email: string
    first_name: string
    last_name: string
    groups: string[]
    custom_attributes: map[string, string]
    
  provisioning:
    jit_enabled: bool
    scim_enabled: bool
    default_role: string
    group_to_role_mapping: map[string, string]
    
  security:
    require_signed_assertions: bool
    require_encrypted_assertions: bool
    allowed_clock_skew_seconds: int
    
  metadata:
    created_at: timestamp
    updated_at: timestamp
    last_successful_auth: timestamp
    connection_health: enum[healthy, degraded, failed]
```

### 2. Metadata Exchange Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Metadata Exchange                             │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Tenant     │    │   Platform   │    │   Enterprise     │  │
│  │   Admin      │    │   (SP)       │    │   IdP            │  │
│  └──────┬───────┘    └──────┬───────┘    └────────┬─────────┘  │
│         │                   │                      │            │
│         │  1. Request SP    │                      │            │
│         │     Metadata      │                      │            │
│         │──────────────────►│                      │            │
│         │                   │                      │            │
│         │  2. Generate      │                      │            │
│         │     tenant-specific                      │            │
│         │     metadata      │                      │            │
│         │◄──────────────────│                      │            │
│         │                   │                      │            │
│         │  3. Upload SP metadata to IdP            │            │
│         │──────────────────────────────────────────►            │
│         │                                          │            │
│         │  4. Download IdP metadata                │            │
│         │◄──────────────────────────────────────────            │
│         │                   │                      │            │
│         │  5. Upload IdP    │                      │            │
│         │     metadata      │                      │            │
│         │──────────────────►│                      │            │
│         │                   │                      │            │
│         │  6. Validate &    │                      │            │
│         │     store config  │                      │            │
│         │                   │  7. Test auth flow   │            │
│         │                   │◄────────────────────►│            │
│         │                   │                      │            │
│         │  8. Connection    │                      │            │
│         │     active        │                      │            │
│         │◄──────────────────│                      │            │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Just-In-Time (JIT) Provisioning

```yaml
jit_provisioning:
  enabled: bool
  
  user_creation:
    strategy: enum[create_on_first_login, require_pre_registration]
    default_status: enum[active, pending_approval]
    
  attribute_sync:
    sync_on_login: bool
    attributes_to_sync:
      - email
      - display_name
      - groups
    conflict_resolution: enum[idp_wins, platform_wins, manual]
    
  role_assignment:
    strategy: enum[group_mapping, default_role, attribute_based]
    group_mappings:
      - idp_group: "Admins"
        platform_role: "tenant_admin"
      - idp_group: "Users"
        platform_role: "member"
    default_role: "member"
    
  deprovisioning:
    on_group_removal: enum[remove_role, disable_user, no_action]
    on_idp_deactivation: enum[disable_user, delete_user, no_action]
```

### 4. SCIM Directory Sync

```yaml
scim_config:
  enabled: bool
  version: "2.0"
  
  endpoint: "https://app.example.com/scim/v2/{tenant_id}"
  
  authentication:
    type: enum[bearer_token, oauth2]
    token_rotation_days: 90
    
  supported_resources:
    - Users
    - Groups
    
  sync_settings:
    push_enabled: bool
    pull_enabled: bool
    sync_interval_minutes: 15
    
  conflict_handling:
    duplicate_email: enum[reject, merge, rename]
    orphaned_users: enum[disable, delete, preserve]
    
  attribute_mapping:
    userName: "email"
    name.givenName: "first_name"
    name.familyName: "last_name"
    active: "is_active"
    groups: "role_memberships"
```

### 5. Multi-IdP Support

| Scenario | Solution | Implementation |
|----------|----------|----------------|
| Single IdP per tenant | Standard | Store one IdP config per tenant |
| Multiple IdPs per tenant | IdP selection | User selects IdP at login |
| Fallback IdPs | Prioritized list | Try IdPs in order |
| Migration between IdPs | Dual-running | Both active during transition |

## Verification

- [ ] IdP connection schema defined
- [ ] Metadata exchange flow documented
- [ ] JIT provisioning configured
- [ ] SCIM integration designed (if required)
- [ ] Multi-IdP strategy determined

## Outputs

- IdP connection architecture
- Metadata exchange procedures
- JIT provisioning configuration
- SCIM integration specification

## Next Step

Proceed to `step-04-c-oauth-provider.md` for OAuth provider design.
