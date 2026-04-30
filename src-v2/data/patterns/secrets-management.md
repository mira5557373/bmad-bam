---
pattern_id: secrets-management
shortcode: ZSM
category: security
qg_ref: QG-S8
version: 1.0.0
last_reviewed: 2026-04-29
---

# Secrets Management - BAM Pattern

**Loaded by:** ZSM  
**Applies to:** Tenant-scoped credentials, API keys, encryption keys, agent tokens

---

## When to Use

- Multi-tenant SaaS with tenant-specific credentials
- Systems requiring secret rotation without downtime
- AI agents needing scoped access tokens
- Integration with external services per tenant
- Compliance requirements for key management

## When NOT to Use

- Environment variables are sufficient (single-tenant, simple)
- Secrets don't require tenant isolation
- No rotation requirements
- Development environments (use simplified secrets)

## Architecture

### Secret Isolation Model

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM SECRETS                          │
│           (Infrastructure, shared services)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 TENANT NAMESPACE                       │  │
│  │            (Tenant-scoped secrets)                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              USER SECRETS                        │  │  │
│  │  │         (User-managed keys)                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Secret Lifecycle

```
Create          Distribute        Rotate           Revoke
   │                │                │                │
   ▼                ▼                ▼                ▼
┌──────┐      ┌──────────┐     ┌──────────┐     ┌──────────┐
│Vault │─────▶│ Service  │─────▶│ Rotate   │─────▶│ Revoke   │
│Store │      │  Inject  │      │ (Zero    │      │ (Audit   │
└──────┘      └──────────┘      │ Downtime)│      │  Trail)  │
                                └──────────┘      └──────────┘
   │                │                │                │
   ▼                ▼                ▼                ▼
Encrypted      Ephemeral         Dual-key          Immediate
at rest        in memory         transition        invalidate
```

### Vault Integration Patterns

| Provider | Use Case | Tenant Isolation | Rotation |
|----------|----------|------------------|----------|
| HashiCorp Vault | Self-hosted, full control | Namespace per tenant | Auto with TTL |
| AWS Secrets Manager | AWS-native | Resource policies + tags | Lambda rotation |
| Azure Key Vault | Azure-native | RBAC + managed identity | Auto-rotate |
| GCP Secret Manager | GCP-native | IAM + labels | Cloud Functions |

### Zero-Downtime Rotation Flow

```
Step 1: Generate New          Step 2: Dual Active         Step 3: Deprecate Old
┌─────────────────┐           ┌─────────────────┐         ┌─────────────────┐
│  Secret v1      │           │  Secret v1 ✓    │         │  Secret v1 ✗    │
│  (active)       │           │  Secret v2 ✓    │         │  Secret v2 ✓    │
│                 │           │  (both valid)   │         │  (only valid)   │
└─────────────────┘           └─────────────────┘         └─────────────────┘
        │                             │                           │
        └──────── 5 min ──────────────┴──────── 24 hr ────────────┘
```

### Implementation Schema

```yaml
secrets_management:
  provider: enum[vault, aws, azure, gcp]
  
  platform_secrets:
    path: "platform/"
    rotation_days: 90
    access: ["infrastructure", "ci-cd"]
    
  tenant_secrets:
    path_template: "tenants/{tenant_id}/"
    isolation: enum[namespace, path, policy]
    default_rotation_days: 30
    
    categories:
      - name: "api_keys"
        rotation_days: 90
        max_per_tenant: 10
        
      - name: "encryption_keys"
        rotation_days: 365
        kms_backed: true
        
      - name: "oauth_credentials"
        rotation_days: 30
        include_refresh_token: true
        
  agent_credentials:
    type: "short_lived_token"
    ttl_minutes: 15
    renewable: true
    max_ttl_minutes: 60
    scopes: ["read", "execute"]
    
  rotation:
    strategy: enum[automatic, manual, scheduled]
    zero_downtime: true
    dual_active_period_hours: 24
    notification_before_days: 7
    
  audit:
    log_all_access: true
    alert_on_suspicious: true
    retention_days: 365
```

### Agent Credential Flow

```
Agent Execution Request
         │
         ▼
┌─────────────────┐
│  Request Token  │
│  (tenant_id,    │
│   scope, ttl)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Vault Issues   │────▶│  Short-Lived    │
│  Scoped Token   │     │  Token (15min)  │
└─────────────────┘     └────────┬────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
┌─────────────────┐                           ┌─────────────────┐
│  Tool Access    │                           │  Renew Before   │
│  (Scoped)       │                           │  Expiry         │
└─────────────────┘                           └─────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Centralized Vault | Full control, audit trail | Operational overhead | Enterprise, compliance |
| Cloud-native SM | Managed, integrated | Vendor lock-in | Single-cloud |
| Env vars + rotation | Simple | No tenant isolation | Single-tenant |
| Customer-managed keys | Customer control | Complex key ceremony | Enterprise tier |

## Quality Checks

- [ ] All secrets encrypted at rest (AES-256 or better)
- [ ] Tenant secrets isolated by namespace/path
- [ ] Rotation automation in place
- [ ] Agent tokens are short-lived (<1 hour)
- [ ] **CRITICAL:** No secrets in code, logs, or environment dumps

## Web Research Queries

- "secrets management multi-tenant SaaS {date}"
- "HashiCorp Vault tenant isolation patterns {date}"
- "zero downtime secret rotation {date}"
- "AI agent credential management {date}"
- "cloud secrets manager comparison {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S8 | Pattern implementation verified |

## Related Patterns

- [zero-trust.md](zero-trust.md) - Security boundaries
- [secrets-management.md](secrets-management.md) - Credential management

