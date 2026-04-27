# BAM API Key Management Guide

**When to load:** During API security design, key lifecycle planning, or when user mentions API keys, secrets, rotation, scopes, revocation.

**Integrates with:** Security (security-bam), Architect (platform), DevOps (operations)

---

## Core Concepts

### API Key Types

Different key types serve different purposes in multi-tenant systems.

| Key Type | Scope | Use Case | Rotation Frequency |
|----------|-------|----------|-------------------|
| Tenant API Key | Tenant-wide access | Server-to-server integration | 90 days |
| User API Key | User-scoped access | Personal automation | User-controlled |
| Service Account Key | Service-to-service | Internal services | 30 days |
| Admin API Key | Platform operations | Administrative tasks | 30 days |
| Webhook Signing Key | Webhook verification | Event delivery | 180 days |

### Key Hierarchy

```
Platform Master Key (PKM)
       |
       +-- Tenant Master Key (TMK)
               |
               +-- User API Keys
               +-- Service Account Keys
               +-- Webhook Signing Keys
```

---

## Application Guidelines

When implementing API key management for multi-tenant platforms:

1. **Scope keys minimally**: Least privilege per key
2. **Enforce rotation**: Automated rotation with grace periods
3. **Audit all usage**: Every key use logged with tenant context
4. **Enable instant revocation**: Propagate within seconds
5. **Support multiple active keys**: Allow rotation without downtime

---

## Key Lifecycle

### Lifecycle States

| State | Description | Transitions |
|-------|-------------|-------------|
| Active | Fully functional | -> Rotating, Suspended, Revoked |
| Rotating | New key active, old in grace period | -> Active, Revoked |
| Suspended | Temporarily disabled | -> Active, Revoked |
| Revoked | Permanently disabled | Terminal |
| Expired | Past expiration date | -> Revoked |

### Key Creation

| Attribute | Description | Validation |
|-----------|-------------|------------|
| Name | Human-readable identifier | Unique per tenant |
| Scopes | Permission set | Valid scope list |
| Expiration | Optional expiry date | Future date |
| IP allowlist | Optional IP restrictions | Valid CIDR ranges |
| Rate limit | Optional custom limit | Within tier limits |

### Key Format

```
Prefix_TenantID_RandomBytes_Checksum

Example: pk_live_tn_abc123_k_x7Kj9mNp2Qr5_c3f8

Components:
- pk: Key type prefix (pk=production, sk=sandbox)
- live: Environment (live, test, dev)
- tn_abc123: Tenant identifier
- k_x7Kj9mNp2Qr5: Random key material (256-bit)
- c3f8: Checksum for validation
```

---

## Scope Management

### Scope Hierarchy

| Scope Level | Example | Description |
|-------------|---------|-------------|
| Resource | `users:read` | Single resource action |
| Resource group | `users:*` | All actions on resource |
| Module | `billing:*` | All billing operations |
| Full access | `*` | All operations (admin only) |

### Standard Scopes

| Scope | Permission | Risk Level |
|-------|------------|------------|
| `api:read` | Read-only API access | Low |
| `api:write` | Read and write API access | Medium |
| `agents:execute` | Run AI agents | Medium |
| `agents:admin` | Manage agent configurations | High |
| `billing:read` | View billing data | Medium |
| `billing:write` | Modify billing | High |
| `admin:*` | Full administrative access | Critical |

### Tier-Based Scope Limits

| Tier | Available Scopes | Max Keys | Max Scopes/Key |
|------|------------------|----------|----------------|
| Free | `api:read`, `api:write` | 2 | 2 |
| Pro | Standard scopes | 10 | 10 |
| Enterprise | All scopes | Unlimited | Unlimited |

---

## Rotation Strategy

### Automatic Rotation

| Component | Rotation Period | Grace Period | Notification |
|-----------|-----------------|--------------|--------------|
| Tenant API Keys | 90 days (recommended) | 7 days | 30, 7, 1 day before |
| Service Account Keys | 30 days | 3 days | 7, 3, 1 day before |
| Webhook Signing Keys | 180 days | 14 days | 30, 7 day before |

### Rotation Process

```
Current Key Active
       |
       v
1. Generate new key (both keys active)
       |
       v
2. Notify tenant (email, webhook, dashboard)
       |
       v
3. Grace period begins (7 days default)
       |
       v
4. Monitor old key usage
       |
       v
5. Grace period ends
       |
       v
6. Old key revoked
       |
       v
New Key Only Active
```

### Zero-Downtime Rotation

| Phase | Duration | Old Key | New Key |
|-------|----------|---------|---------|
| Pre-rotation | - | Active | Not created |
| Rotation start | 0 | Active | Created, Active |
| Grace period | 7 days | Active | Active |
| Post-rotation | - | Revoked | Active |

---

## Security Controls

### Key Storage

| Layer | Protection | Implementation |
|-------|------------|----------------|
| At rest | AES-256 encryption | KMS-managed keys |
| In transit | TLS 1.3 | HTTPS only |
| In memory | Short-lived | Clear after use |
| Backup | Encrypted | HSM-backed |

### Access Control

| Actor | Create | Read | Rotate | Revoke |
|-------|--------|------|--------|--------|
| Tenant Admin | Yes | Yes (masked) | Yes | Yes |
| Tenant User | With permission | Own keys only | Own keys | Own keys |
| Platform Admin | No | Audit only | Emergency | Emergency |
| API | Via scopes | Via scopes | Via scopes | Via scopes |

### Rate Limiting

| Tier | Requests/Minute | Burst | Overage |
|------|-----------------|-------|---------|
| Free | 60 | 10 | Block |
| Pro | 600 | 100 | Throttle |
| Enterprise | 6000 | 1000 | Alert + Throttle |

---

## Audit and Compliance

### Audit Events

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| Key created | Creator, scopes, expiry | 2 years |
| Key used | Endpoint, IP, user agent | 90 days |
| Key rotated | Old key hash, reason | 2 years |
| Key revoked | Revoker, reason | 2 years |
| Key suspended | Admin, reason | 2 years |
| Scope modified | Changes, modifier | 2 years |

### Compliance Mapping

| Requirement | Implementation |
|-------------|----------------|
| SOC 2 CC6.1 | Key creation audit trail |
| SOC 2 CC6.7 | Least privilege scopes |
| GDPR Art 32 | Encryption at rest |
| PCI DSS 8.2 | Unique key per integration |
| HIPAA | Access logging |

### Audit Query Examples

```
Key Usage by Tenant:
- Total API calls per key
- Unique IPs per key
- Scope utilization
- Error rates

Security Events:
- Failed authentication attempts
- Unusual usage patterns
- Geographic anomalies
- Scope escalation attempts
```

---

## Emergency Procedures

### Compromised Key Response

```
Key Compromise Detected
       |
       v
1. Immediate: Revoke key (< 1 minute)
       |
       v
2. 5 minutes: Notify tenant admin
       |
       v
3. 15 minutes: Audit key usage
       |
       v
4. 1 hour: Impact assessment
       |
       v
5. 4 hours: Root cause analysis
       |
       v
6. 24 hours: Report to tenant
```

### Tenant Offboarding

| Action | Timing | Method |
|--------|--------|--------|
| Suspend all keys | Immediate | Automatic |
| Revoke all keys | After grace period | Automatic |
| Delete key records | Per retention policy | Scheduled job |
| Audit log retention | Per compliance | Separate storage |

---

## Integration Patterns

### Key Validation Flow

```
API Request with Key
       |
       v
1. Extract key from header/query
       |
       v
2. Validate format (checksum)
       |
       v
3. Lookup in cache (< 1ms)
       |       |
       |       +-- Cache miss: DB lookup
       |
       v
4. Verify key state (active, not expired)
       |
       v
5. Extract tenant context
       |
       v
6. Validate scopes for endpoint
       |
       v
7. Apply rate limits
       |
       v
8. Log usage event
       |
       v
Request Proceeds
```

### SDK Integration

| SDK Method | Description |
|------------|-------------|
| `createKey(scopes, options)` | Create new API key |
| `listKeys()` | List tenant's keys |
| `rotateKey(keyId)` | Initiate key rotation |
| `revokeKey(keyId)` | Immediately revoke key |
| `getKeyUsage(keyId)` | Get usage statistics |

---

## Decision Framework

### Scope Design

| Question | Consideration |
|----------|---------------|
| What's the minimum access needed? | Start with read-only |
| Is write access required? | Add specific write scopes |
| Multi-resource access? | Consider grouped scopes |
| Admin operations? | Require explicit admin scope |

### Rotation Frequency

| Factor | Shorter Rotation | Longer Rotation |
|--------|------------------|-----------------|
| Key exposure risk | High risk environments | Low risk, internal |
| Operational overhead | Automated rotation | Manual rotation |
| Compliance requirements | Regulated industry | General business |
| Integration complexity | Simple updates | Complex integrations |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-security`
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `secrets-management`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "API key management best practices {date}"
- Search: "API key rotation patterns SaaS {date}"
- Search: "API key security multi-tenant {date}"

---

## Related Workflows

- `bmad-bam-tenant-api-key-management` - API key management workflow
- `bmad-bam-security-review` - Security review procedures
- `bmad-bam-secrets-management` - Secrets management workflow
