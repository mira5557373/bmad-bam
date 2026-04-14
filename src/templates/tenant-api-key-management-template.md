---
name: tenant-api-key-management-template
description: API key lifecycle management for multi-tenant platforms including generation, rotation, scoping, and revocation
category: tenant
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

API key lifecycle management for multi-tenant platforms including generation, rotation, scoping, and revocation

# Tenant API Key Management: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | {{document_id}} |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |
| Security Review | {{security_review_date}} |

## Executive Summary

{{executive_summary}}

---

## Key Generation

### 1.1 Key Generation Strategy

| Parameter | Value | Description |
|-----------|-------|-------------|
| Secret Length | {{secret_length}} bytes | Cryptographic randomness |
| Hash Algorithm | {{hash_algorithm}} | For secure storage |
| Salt Length | {{salt_length}} bytes | Per-key salt |
| Key Format | {{key_format}} | Prefix + version + ID + secret |
| Encoding | {{key_encoding}} | Base64/Hex output format |

### 1.2 Key Types by Tenant

| Key Type | Tenant Scope | Default Lifetime | Max Keys per Tenant |
|----------|--------------|------------------|---------------------|
| Production | {{prod_scope}} | {{prod_lifetime}} | {{prod_max_keys}} |
| Development | {{dev_scope}} | {{dev_lifetime}} | {{dev_max_keys}} |
| Testing | {{test_scope}} | {{test_lifetime}} | {{test_max_keys}} |
| Service Account | {{service_scope}} | {{service_lifetime}} | {{service_max_keys}} |

### 1.3 Key Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    API Key Structure                             │
│                                                                  │
│  {{env_prefix}}_{{version}}_{{tenant_id_short}}_{{key_id}}_{{secret}}
│       │           │              │                │        │     │
│       │           │              │                │        └─ Secret (32+ bytes)
│       │           │              │                └────────── Key ID (UUID)
│       │           │              └─────────────────────────── Tenant ID (8 chars)
│       │           └────────────────────────────────────────── Version (v1, v2)
│       └────────────────────────────────────────────────────── Environment prefix
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Generation Workflow

| Step | Action | Validation |
|------|--------|------------|
| 1 | Validate tenant exists and is active | {{tenant_validation}} |
| 2 | Check key quota for tenant tier | {{quota_check}} |
| 3 | Generate cryptographically secure secret | {{secret_generation}} |
| 4 | Hash secret with per-key salt | {{hash_storage}} |
| 5 | Store metadata with tenant_id | {{metadata_storage}} |
| 6 | Return full key (one-time display) | {{key_display}} |

---

## Rotation Policy

### 2.1 Rotation Schedule

| Key Type | Rotation Interval | Warning Period | Grace Period |
|----------|-------------------|----------------|--------------|
| Production | {{prod_rotation}} | {{prod_warning}} | {{prod_grace}} |
| Development | {{dev_rotation}} | {{dev_warning}} | {{dev_grace}} |
| Service Account | {{service_rotation}} | {{service_warning}} | {{service_grace}} |

### 2.2 Rotation Triggers

| Trigger | Action | Notification |
|---------|--------|--------------|
| Scheduled rotation due | Generate new key, start grace period | {{scheduled_notify}} |
| Manual rotation request | Immediate new key generation | {{manual_notify}} |
| Security incident | Emergency revocation + new key | {{incident_notify}} |
| Team member departure | Rotate all affected keys | {{departure_notify}} |

### 2.3 Rotation Process

| Phase | Duration | Old Key Status | New Key Status |
|-------|----------|----------------|----------------|
| Generation | Immediate | Active | Active |
| Grace Period | {{grace_duration}} | Active (deprecated) | Active |
| Deprecation | {{deprecation_duration}} | Warning on use | Active |
| Revocation | End of grace | Revoked | Active |

### 2.4 Tenant-Specific Rotation Overrides

| Tier | Custom Rotation | Override Limits |
|------|-----------------|-----------------|
| Free | {{free_rotation_override}} | {{free_override_limits}} |
| Pro | {{pro_rotation_override}} | {{pro_override_limits}} |
| Enterprise | {{enterprise_rotation_override}} | {{enterprise_override_limits}} |

---

## Scope and Permissions

### 3.1 Scope Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tenant Scope Hierarchy                        │
│                                                                  │
│  tenant:{{tenant_id}}:*                                         │
│    ├── tenant:{{tenant_id}}:read        (Read tenant data)      │
│    ├── tenant:{{tenant_id}}:write       (Write tenant data)     │
│    └── tenant:{{tenant_id}}:admin       (Admin operations)      │
│                                                                  │
│  agents:{{tenant_id}}:*                                         │
│    ├── agents:{{tenant_id}}:execute     (Run agents)            │
│    ├── agents:{{tenant_id}}:config      (Configure agents)      │
│    └── agents:{{tenant_id}}:memory      (Access memory)         │
│                                                                  │
│  data:{{tenant_id}}:*                                           │
│    ├── data:{{tenant_id}}:read          (Read business data)    │
│    ├── data:{{tenant_id}}:write         (Create/update data)    │
│    └── data:{{tenant_id}}:delete        (Delete data)           │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Scope Definitions

| Scope | Description | Risk Level | Tier Required |
|-------|-------------|------------|---------------|
| tenant:read | Read tenant configuration | Low | Free |
| tenant:write | Modify tenant settings | Medium | Pro |
| tenant:admin | Full tenant administration | High | Enterprise |
| agents:execute | Execute AI agents | Medium | {{agent_execute_tier}} |
| agents:memory | Access agent memory | High | {{agent_memory_tier}} |
| data:read | Read business data | Low | Free |
| data:write | Create/update data | Medium | Free |
| data:delete | Delete data | High | {{data_delete_tier}} |

### 3.3 Scope Validation Rules

| Rule | Enforcement | Description |
|------|-------------|-------------|
| Tenant boundary | Runtime | Scopes always prefixed with tenant_id |
| Tier check | Creation | Scope must match or below tenant tier |
| User permission subset | Creation | Key scopes <= user's permissions |
| Cross-tenant block | Runtime | No cross-tenant scope allowed |

### 3.4 Default Scopes by Key Type

| Key Type | Default Scopes | Maximum Scopes |
|----------|----------------|----------------|
| Production | {{prod_default_scopes}} | {{prod_max_scopes}} |
| Development | {{dev_default_scopes}} | {{dev_max_scopes}} |
| Testing | {{test_default_scopes}} | {{test_max_scopes}} |
| Read-Only | data:read, tenant:read | Read scopes only |

---

## Rate Limiting per Key

### 4.1 Base Rate Limits

| Tier | Requests/Second | Requests/Minute | Requests/Hour | Burst Capacity |
|------|-----------------|-----------------|---------------|----------------|
| Free | {{free_rps}} | {{free_rpm}} | {{free_rph}} | {{free_burst}} |
| Pro | {{pro_rps}} | {{pro_rpm}} | {{pro_rph}} | {{pro_burst}} |
| Enterprise | {{enterprise_rps}} | {{enterprise_rpm}} | {{enterprise_rph}} | {{enterprise_burst}} |

### 4.2 Per-Key Rate Limit Configuration

| Setting | Default | Override Range | Requires |
|---------|---------|----------------|----------|
| requests_per_second | Tier default | {{rps_override_range}} | {{rps_requires}} |
| requests_per_minute | Tier default | {{rpm_override_range}} | {{rpm_requires}} |
| daily_limit | Unlimited | {{daily_override_range}} | {{daily_requires}} |
| concurrent_requests | {{default_concurrent}} | {{concurrent_range}} | {{concurrent_requires}} |

### 4.3 Rate Limit Enforcement

| Scenario | Response | Headers |
|----------|----------|---------|
| Under limit | Allow request | X-RateLimit-Remaining |
| At limit | 429 Too Many Requests | Retry-After |
| Burst allowed | Allow with warning | X-Burst-Used |
| Hard limit exceeded | 429 + temporary block | X-Block-Duration |

### 4.4 Rate Limit Monitoring per Key

| Metric | Collection | Alert Threshold |
|--------|------------|-----------------|
| Usage percentage | Per minute | {{usage_alert_threshold}}% |
| Burst utilization | Per request | {{burst_alert_threshold}}% |
| 429 response rate | Per hour | {{error_alert_threshold}}% |
| Approaching limit | Continuous | {{approaching_threshold}}% |

---

## Audit Logging

### 5.1 Audit Event Types

| Event Type | Description | Data Captured |
|------------|-------------|---------------|
| key.created | New key generated | key_id, tenant_id, scopes, creator |
| key.used | Successful authentication | key_id, endpoint, ip, timestamp |
| key.failed | Failed authentication | key_prefix, tenant_id, ip, reason |
| key.rotated | Key rotated | old_key_id, new_key_id, rotator |
| key.scope_changed | Scopes modified | key_id, old_scopes, new_scopes |
| key.suspended | Key suspended | key_id, reason, suspender |
| key.revoked | Key revoked | key_id, reason, revoker |
| key.expired | Key expired | key_id, expiry_time |

### 5.2 Audit Record Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| audit_id | UUID | Yes | Unique audit record ID |
| event_type | String | Yes | Event type from above |
| key_id | UUID | Yes | Associated key |
| tenant_id | UUID | Yes | Tenant context (CRITICAL for isolation) |
| actor_id | UUID | No | User/system performing action |
| actor_type | Enum | Yes | user, system, api |
| timestamp | Timestamp | Yes | Event time (UTC) |
| ip_address | String | No | Source IP |
| user_agent | String | No | Client user agent |
| request_id | UUID | No | Correlation ID |
| details | JSON | No | Event-specific details |

### 5.3 Audit Retention by Tenant Tier

| Tier | Retention Period | Archive Policy | Export Available |
|------|------------------|----------------|------------------|
| Free | {{free_retention}} | {{free_archive}} | {{free_export}} |
| Pro | {{pro_retention}} | {{pro_archive}} | {{pro_export}} |
| Enterprise | {{enterprise_retention}} | {{enterprise_archive}} | {{enterprise_export}} |

### 5.4 Audit Access Controls

| Role | View Own Keys | View Tenant Keys | Export | Delete |
|------|---------------|------------------|--------|--------|
| Key Owner | Yes | No | No | No |
| Tenant Admin | Yes | Yes | {{tenant_admin_export}} | No |
| Platform Admin | Yes | Yes | Yes | {{platform_delete}} |

---

## Revocation

### 6.1 Revocation Types

| Type | Trigger | Effective | Reversible |
|------|---------|-----------|------------|
| Manual | Admin action | Immediate | No |
| Scheduled | Expiration reached | At expiry time | No |
| Security | Incident detected | Immediate | No |
| Tenant suspension | Tenant suspended | Immediate | Yes (on reactivation) |
| User deactivation | User disabled | Immediate | Yes (on reactivation) |

### 6.2 Revocation Process

| Step | Action | Notification |
|------|--------|--------------|
| 1 | Mark key status = revoked | {{revoke_notify_owner}} |
| 2 | Add to revocation cache | N/A |
| 3 | Log audit event | {{revoke_audit_log}} |
| 4 | Notify key owner | {{revoke_email_notify}} |
| 5 | Notify tenant admin | {{revoke_admin_notify}} |
| 6 | Trigger dependent revocations | {{revoke_cascade}} |

### 6.3 Bulk Revocation Scenarios

| Scenario | Scope | Authorization Required |
|----------|-------|------------------------|
| Single key | One key | Key owner or tenant admin |
| User's keys | All keys for user | Tenant admin |
| Tenant's keys | All keys for tenant | Tenant admin + confirmation |
| Security incident | Affected keys | Platform admin |

### 6.4 Post-Revocation

| Action | Timing | Purpose |
|--------|--------|---------|
| Cache invalidation | Immediate | Stop active sessions |
| Webhook notification | Within 1 minute | Alert integrations |
| Audit report | On demand | Compliance documentation |
| Cleanup | {{cleanup_schedule}} | Remove expired hashes |

---

## Tenant Isolation

### 7.1 Isolation Guarantees

| Aspect | Implementation | Verification |
|--------|----------------|--------------|
| Key visibility | tenant_id filter on all queries | {{visibility_verification}} |
| Audit isolation | tenant_id in all audit records | {{audit_verification}} |
| Rate limit isolation | Per-tenant counters | {{rate_verification}} |
| Scope isolation | tenant_id prefix in all scopes | {{scope_verification}} |

### 7.2 Cross-Tenant Prevention

| Attack Vector | Prevention | Detection |
|---------------|------------|-----------|
| Key enumeration | Random key IDs, no sequential | {{enum_detection}} |
| Scope escalation | Strict scope validation | {{escalation_detection}} |
| Audit access | RLS on audit tables | {{audit_detection}} |
| Rate limit bypass | Per-tenant enforcement | {{bypass_detection}} |

### 7.3 Tenant Context Propagation

| Layer | Context Source | Validation |
|-------|----------------|------------|
| API Gateway | JWT claim | {{gateway_validation}} |
| Key Service | Key metadata | {{key_validation}} |
| Audit Service | Request context | {{audit_context_validation}} |
| Rate Limiter | Key tenant_id | {{rate_context_validation}} |

### 7.4 Isolation Testing Requirements

| Test Type | Frequency | Coverage |
|-----------|-----------|----------|
| Cross-tenant access | {{cross_tenant_frequency}} | All key operations |
| Scope boundary | {{scope_boundary_frequency}} | All scope types |
| Audit leak | {{audit_leak_frequency}} | All audit endpoints |
| Rate limit isolation | {{rate_isolation_frequency}} | Concurrent tenants |

---

## Implementation Checklist

### Key Generation
- [ ] Cryptographically secure random generation implemented
- [ ] Per-key salt generation and storage
- [ ] Secure hashing with appropriate algorithm
- [ ] One-time key display mechanism
- [ ] Tenant quota enforcement

### Rotation
- [ ] Scheduled rotation system implemented
- [ ] Grace period handling
- [ ] Dual-key validation during transition
- [ ] Notification system for rotation events

### Scopes and Permissions
- [ ] Scope hierarchy defined and enforced
- [ ] Tenant-prefixed scopes validated
- [ ] Tier-based scope restrictions
- [ ] User permission subset validation

### Rate Limiting
- [ ] Per-key rate limits configurable
- [ ] Tier-based defaults applied
- [ ] Rate limit headers returned
- [ ] Monitoring and alerting configured

### Audit Logging
- [ ] All event types captured
- [ ] Tenant isolation in audit records
- [ ] Retention policies implemented
- [ ] Export functionality (for eligible tiers)

### Revocation
- [ ] Immediate revocation capability
- [ ] Cache invalidation on revoke
- [ ] Bulk revocation support
- [ ] Notification system for revocations

### Tenant Isolation
- [ ] All queries filtered by tenant_id
- [ ] Cross-tenant access blocked
- [ ] Isolation testing automated
- [ ] Security audit completed

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "API key management best practices multi-tenant {date}"
- "API key rotation strategies SaaS platforms {date}"
- "tenant isolated API key patterns {date}"
- "API key security per-tenant rate limiting {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Key generation parameters defined with cryptographic standards
- [ ] Rotation policy specified with schedules and grace periods
- [ ] Scope hierarchy documented with tenant isolation
- [ ] Rate limiting configured per tier and per key
- [ ] Audit logging captures all key lifecycle events
- [ ] Revocation process defined with immediate effect
- [ ] Tenant isolation verified at all layers
- [ ] Cross-tenant attack vectors addressed
- [ ] Implementation checklist complete

---

## Appendix

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Tenant Model: `{{tenant_model_link}}`
- Security Specification: `{{security_spec_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
