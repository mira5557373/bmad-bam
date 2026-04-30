# Step 5: API Key Management (ZAK)

## Purpose

Design API key authentication for machine-to-machine communication with tenant-scoped permissions and rotation policies.

## Prerequisites

- [ ] Step 4 completed (OAuth provider design)
- [ ] M2M authentication requirements documented

## Actions

### 1. API Key Architecture

```yaml
api_key:
  key_id: string           # Public identifier (e.g., "bam_pk_abc123")
  key_hash: string         # Hashed secret (never store plaintext)
  tenant_id: uuid
  
  key_type: enum[primary, secondary, service_account]
  
  metadata:
    name: string
    description: string
    created_by: string
    created_at: timestamp
    
  permissions:
    scopes: string[]       # ["read", "write", "agent:execute"]
    resource_restrictions: # Optional fine-grained access
      allowed_endpoints: string[]
      allowed_resources: string[]
      
  lifecycle:
    status: enum[active, disabled, revoked, expired]
    expires_at: timestamp
    last_used_at: timestamp
    last_rotated_at: timestamp
    
  rate_limits:
    requests_per_minute: int
    requests_per_day: int
    
  security:
    ip_allowlist: string[]
    require_mtls: bool
```

### 2. Key Generation and Format

```
┌─────────────────────────────────────────────────────────────────┐
│                    API Key Format                                │
│                                                                  │
│  bam_pk_live_abc123def456ghi789jkl012mno345pqr678stu901vwx234   │
│  │   │   │    └──────────────────────────────────────────────┘  │
│  │   │   │                        │                              │
│  │   │   │                   Random entropy (256-bit)            │
│  │   │   │                                                       │
│  │   │   └── Environment (live/test)                             │
│  │   │                                                           │
│  │   └── Key type (pk=primary, sk=secondary, sa=service_account) │
│  │                                                               │
│  └── Prefix (always "bam_")                                      │
└─────────────────────────────────────────────────────────────────┘

Key Properties:
- Length: 64 characters
- Entropy: 256 bits (cryptographically random)
- Prefix: Identifies key type and environment
- Storage: Only hash stored; plaintext shown once at creation
```

### 3. Key Rotation Strategy

```yaml
rotation_policy:
  automatic_rotation:
    enabled: bool
    rotation_interval_days: 90
    grace_period_days: 7
    
  rotation_flow:
    1_create_new: "Generate new secondary key"
    2_dual_active: "Both keys valid during grace period"
    3_notify: "Alert key owners of pending rotation"
    4_promote: "Secondary becomes primary"
    5_revoke_old: "Old primary revoked after grace period"
    
  emergency_rotation:
    trigger: enum[manual, compromise_detected, policy_violation]
    immediate_revocation: bool
    notification_channels: string[]
```

**Rotation Flow Diagram:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Key Rotation Timeline                         │
│                                                                  │
│  Day 0        Day 83      Day 90      Day 97                    │
│    │            │           │           │                        │
│    │            │           │           │                        │
│    ▼            ▼           ▼           ▼                        │
│  ┌────┐      ┌────┐      ┌────┐      ┌────┐                     │
│  │Key │      │Warn│      │New │      │Old │                     │
│  │Used│      │Sent│      │Key │      │Key │                     │
│  │    │      │    │      │Live│      │Dead│                     │
│  └────┘      └────┘      └────┘      └────┘                     │
│    │            │           │           │                        │
│    └────────────┴───────────┴───────────┘                        │
│         Primary Key Active    │                                  │
│                               │                                  │
│                    ┌──────────┴──────────┐                       │
│                    │ Grace Period        │                       │
│                    │ Both Keys Valid     │                       │
│                    └─────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

### 4. API Key Authentication Flow

```yaml
authentication_flow:
  header_name: "X-API-Key"  # or "Authorization: Bearer {key}"
  
  validation_steps:
    1_parse: "Extract key from header"
    2_lookup: "Find key by prefix/id (not hash)"
    3_verify: "Hash provided key, compare to stored hash"
    4_status: "Check key is active and not expired"
    5_tenant: "Load tenant context from key"
    6_permissions: "Load scopes and restrictions"
    7_rate_limit: "Check rate limits"
    8_audit: "Log API key usage"
    
  error_responses:
    missing_key: 401
    invalid_key: 401
    expired_key: 401
    rate_limited: 429
    insufficient_scope: 403
```

### 5. Tenant-Scoped Key Hierarchy

| Key Level | Scope | Use Case | Permissions |
|-----------|-------|----------|-------------|
| Tenant Admin Key | Full tenant | Admin automation | All operations |
| Service Account Key | Specific service | CI/CD, integrations | Limited scope |
| User API Key | User-level | Personal automation | User's permissions |
| Agent Key | Agent execution | AI agent auth | Agent scopes |

## Verification

- [ ] API key format defined
- [ ] Key storage security verified (hashed)
- [ ] Rotation policy configured
- [ ] Authentication flow documented
- [ ] Rate limiting designed
- [ ] Audit logging specified

## Outputs

- API key management specification
- Rotation policy documentation
- Authentication flow design

## Next Step

Proceed to `step-06-c-session-management.md` for session management design.
