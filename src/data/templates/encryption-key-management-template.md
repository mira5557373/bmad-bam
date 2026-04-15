---
name: Encryption Key Management Template
description: Template for documenting per-tenant encryption key management and KMS integration
category: architecture
version: 1.0.0
type: "operations"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for documenting per-tenant encryption key management and KMS integration

# Encryption Key Management Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Overview

### 1.1 Purpose

This document specifies the encryption key management strategy for {{project_name}}, defining how encryption keys are generated, stored, rotated, and managed on a per-tenant basis.

### 1.2 Key Management Model

| Model | Description | Use Case |
|-------|-------------|----------|
| Shared Keys | Single key for all tenants | Basic isolation, cost-efficient |
| Per-Tenant Keys | Unique DEK per tenant | Enhanced isolation |
| Customer-Managed Keys (CMK) | Customer provides KEK | Enterprise compliance |
| Hybrid | Mix of above based on tier | Tiered offering |

**Selected Model:** {{key_management_model}}

---

## Key Hierarchy

### 2.1 Key Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Master Key (Root)                         │
│                    ┌───────────────┐                         │
│                    │   Cloud KMS   │                         │
│                    │   Root KEK    │                         │
│                    └───────┬───────┘                         │
│                            │                                  │
│            ┌───────────────┼───────────────┐                 │
│            ▼               ▼               ▼                 │
│    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐    │
│    │  Tenant A     │ │  Tenant B     │ │  Tenant C     │    │
│    │     KEK       │ │     KEK       │ │     KEK       │    │
│    └───────┬───────┘ └───────┬───────┘ └───────┬───────┘    │
│            │               │               │                  │
│     ┌──────┼──────┐  ┌─────┼─────┐   ┌─────┼─────┐          │
│     ▼      ▼      ▼  ▼     ▼     ▼   ▼     ▼     ▼          │
│   ┌───┐  ┌───┐  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐        │
│   │DEK│  │DEK│  │DEK│ │DEK│ │DEK│ │DEK│ │DEK│ │DEK│        │
│   │ 1 │  │ 2 │  │ 3 │ │ 1 │ │ 2 │ │ 3 │ │ 1 │ │ 2 │        │
│   └───┘  └───┘  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘        │
│  (Data) (Files)(Backup)(Data)(Files)(Backup)                │
└─────────────────────────────────────────────────────────────┘

KEK = Key Encryption Key
DEK = Data Encryption Key
```

### 2.2 Key Types

| Key Type | Purpose | Algorithm | Key Size | Rotation |
|----------|---------|-----------|----------|----------|
| Root KEK | Protect tenant KEKs | {{root_algorithm}} | {{root_key_size}} bits | {{root_rotation}} |
| Tenant KEK | Protect tenant DEKs | {{tenant_kek_algorithm}} | {{tenant_kek_size}} bits | {{tenant_kek_rotation}} |
| Data DEK | Encrypt tenant data | {{dek_algorithm}} | {{dek_size}} bits | {{dek_rotation}} |
| File DEK | Encrypt file uploads | {{file_dek_algorithm}} | {{file_dek_size}} bits | {{file_dek_rotation}} |
| Backup DEK | Encrypt backups | {{backup_dek_algorithm}} | {{backup_dek_size}} bits | {{backup_dek_rotation}} |

---

## KMS Integration

### 3.1 Provider Configuration

| Provider | Use Case | Region |
|----------|----------|--------|
| {{primary_kms_provider}} | Primary key storage | {{primary_region}} |
| {{secondary_kms_provider}} | DR/failover | {{secondary_region}} |

### 3.2 KMS Operations

| Operation | API | Rate Limit | Caching |
|-----------|-----|------------|---------|
| CreateKey | `{{create_key_api}}` | {{create_rate}}/min | N/A |
| Encrypt | `{{encrypt_api}}` | {{encrypt_rate}}/min | {{encrypt_cache_ttl}}s |
| Decrypt | `{{decrypt_api}}` | {{decrypt_rate}}/min | {{decrypt_cache_ttl}}s |
| RotateKey | `{{rotate_api}}` | {{rotate_rate}}/day | N/A |
| GetKeyMetadata | `{{metadata_api}}` | {{metadata_rate}}/min | {{metadata_cache_ttl}}s |

### 3.3 Envelope Encryption Flow

```
Encryption:
┌──────────────────────────────────────────────────────────┐
│ 1. Generate random DEK                                    │
│ 2. Encrypt data with DEK (AES-256-GCM)                   │
│ 3. Encrypt DEK with tenant KEK (KMS call)                │
│ 4. Store: {encrypted_data, encrypted_dek, key_version}   │
└──────────────────────────────────────────────────────────┘

Decryption:
┌──────────────────────────────────────────────────────────┐
│ 1. Retrieve encrypted_dek and key_version                │
│ 2. Decrypt DEK with tenant KEK (KMS call)                │
│ 3. Decrypt data with DEK                                 │
│ 4. Return plaintext                                      │
└──────────────────────────────────────────────────────────┘
```

---

## Per-Tenant Key Management

### 4.1 Key Provisioning

**On Tenant Onboarding:**

1. Generate tenant KEK in KMS
2. Store KEK reference in tenant configuration
3. Generate initial DEKs for each data category
4. Encrypt and store DEKs using KEK
5. Log key creation events

```yaml
tenant_keys:
  tenant_id: "{{tenant_id}}"
  kek_id: "{{kek_id}}"
  kek_version: {{kek_version}}
  kek_created_at: "{{kek_created_at}}"
  deks:
    - type: data
      id: "{{data_dek_id}}"
      version: {{data_dek_version}}
    - type: files
      id: "{{files_dek_id}}"
      version: {{files_dek_version}}
    - type: backups
      id: "{{backup_dek_id}}"
      version: {{backup_dek_version}}
```

### 4.2 Key Access Control

| Principal | Allowed Operations | Condition |
|-----------|-------------------|-----------|
| Application service | Encrypt, Decrypt | Same tenant context |
| Backup service | Encrypt, Decrypt | Backup DEK only |
| Admin (emergency) | All | Audit log + approval |
| Tenant admin | View metadata | Own tenant only |

### 4.3 Customer-Managed Keys (Enterprise)

**CMK Setup Flow:**

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│   Customer     │     │   Platform     │     │   Cloud KMS    │
│   Admin        │     │   Service      │     │                │
└───────┬────────┘     └───────┬────────┘     └───────┬────────┘
        │                      │                      │
        │ 1. Create key in     │                      │
        │    customer KMS      │                      │
        ├─────────────────────────────────────────────►
        │                      │                      │
        │ 2. Grant access      │                      │
        │    to platform       │                      │
        ├─────────────────────────────────────────────►
        │                      │                      │
        │ 3. Register CMK      │                      │
        ├─────────────────────►│                      │
        │                      │ 4. Verify access     │
        │                      ├─────────────────────►│
        │                      │                      │
        │ 5. Confirmation      │                      │
        │◄─────────────────────┤                      │
        │                      │                      │
```

---

## Key Rotation

### 5.1 Rotation Schedule

| Key Type | Rotation Period | Trigger | Re-encryption |
|----------|-----------------|---------|---------------|
| Root KEK | {{root_rotation_period}} | Scheduled | KEKs re-wrapped |
| Tenant KEK | {{tenant_rotation_period}} | Scheduled/On-demand | DEKs re-wrapped |
| Data DEK | {{data_rotation_period}} | Scheduled | Data re-encrypted |
| CMK | Customer-defined | Customer-initiated | Platform notified |

### 5.2 Rotation Process

```
┌─────────────────────────────────────────────────────────────┐
│                    Key Rotation Flow                         │
│                                                              │
│  1. Create new key version                                   │
│     ┌─────┐                                                  │
│     │v1   │ ──► ┌─────┐                                     │
│     │(old)│     │v2   │                                     │
│     └─────┘     │(new)│                                     │
│                 └─────┘                                      │
│                                                              │
│  2. New encryptions use v2                                   │
│                                                              │
│  3. Background re-encryption of v1 data                      │
│     ┌────────────────────────────────────────┐              │
│     │ Data encrypted with v1 → Decrypt →      │              │
│     │ Re-encrypt with v2 → Store              │              │
│     └────────────────────────────────────────┘              │
│                                                              │
│  4. After grace period, disable v1                           │
│                                                              │
│  5. After retention period, destroy v1                       │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Grace Period Configuration

| Phase | Duration | Purpose |
|-------|----------|---------|
| Overlap | {{overlap_days}} days | Both versions active |
| Migration | {{migration_days}} days | Re-encryption window |
| Disabled | {{disabled_days}} days | Old version can't encrypt |
| Destruction | After {{destruction_days}} days | Key material destroyed |

---

## Data Categories

### 6.1 Encryption Requirements by Data Type

| Data Category | Encryption | Key Type | At Rest | In Transit |
|---------------|------------|----------|---------|------------|
| User data | Required | Tenant DEK | AES-256-GCM | TLS 1.3 |
| File uploads | Required | File DEK | AES-256-GCM | TLS 1.3 |
| API keys/secrets | Required | Tenant DEK | AES-256-GCM | TLS 1.3 |
| Agent memory | Required | Tenant DEK | AES-256-GCM | TLS 1.3 |
| Audit logs | Required | Tenant DEK | AES-256-GCM | TLS 1.3 |
| Backups | Required | Backup DEK | AES-256-GCM | TLS 1.3 |
| Analytics | Optional | Shared DEK | AES-256-GCM | TLS 1.3 |

### 6.2 Field-Level Encryption

| Field | Encryption | Searchable | Format-Preserving |
|-------|------------|------------|-------------------|
| PII (name, email) | Required | {{pii_searchable}} | No |
| SSN/Tax ID | Required | No | {{ssn_fpe}} |
| Credit card | Required | Last 4 only | {{cc_fpe}} |
| Health data | Required | No | No |
| Custom sensitive | Configurable | Configurable | Configurable |

---

## Compliance & Audit

### 7.1 Audit Events

| Event | Logged Data | Retention |
|-------|-------------|-----------|
| Key created | key_id, tenant_id, creator, timestamp | {{key_audit_retention}} |
| Key rotated | key_id, old_version, new_version, timestamp | {{key_audit_retention}} |
| Key accessed | key_id, accessor, operation, timestamp | {{access_audit_retention}} |
| Key destroyed | key_id, destroyer, timestamp, reason | {{destruction_audit_retention}} |
| CMK registered | tenant_id, cmk_reference, timestamp | {{cmk_audit_retention}} |

### 7.2 Compliance Mapping

| Requirement | Framework | Implementation |
|-------------|-----------|----------------|
| Encryption at rest | SOC2, HIPAA, PCI | AES-256-GCM for all tenant data |
| Key rotation | PCI-DSS | Annual minimum, configurable |
| Key separation | SOC2 | Per-tenant KEK |
| Audit trail | All | Immutable key operation logs |
| Access control | All | IAM + tenant context validation |

---

## Disaster Recovery

### 8.1 Key Backup Strategy

| Component | Backup Method | RPO | RTO |
|-----------|---------------|-----|-----|
| Root KEK | KMS automatic replication | 0 | {{root_rto}} |
| Tenant KEK | Cross-region KMS | 0 | {{tenant_rto}} |
| DEK (wrapped) | Database backup | {{dek_rpo}} | {{dek_rto}} |
| CMK | Customer responsibility | N/A | N/A |

### 8.2 Key Recovery Process

```
┌─────────────────────────────────────────────────────────────┐
│                  Key Recovery Flow                           │
│                                                              │
│  1. Failover detected                                        │
│  2. Switch to DR region KMS                                  │
│  3. Verify key accessibility                                 │
│  4. Resume operations with replicated keys                   │
│  5. Validate data decryption capability                      │
│  6. Notify affected tenants (if CMK)                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Controls

### 9.1 Key Protection

- [ ] HSM-backed key storage (FIPS 140-2 Level 3)
- [ ] Key material never leaves KMS
- [ ] Split-knowledge for root key
- [ ] Dual-control for key destruction
- [ ] Quantum-resistant algorithm roadmap

### 9.2 Access Controls

- [ ] Service accounts with minimal permissions
- [ ] No human access to production keys
- [ ] Emergency access requires approval + audit
- [ ] Tenant admin can view metadata only

### 9.3 Monitoring

| Alert | Condition | Severity |
|-------|-----------|----------|
| Key access anomaly | > {{anomaly_threshold}} ops/min | High |
| Decryption failure spike | > {{failure_threshold}}% errors | Critical |
| Key approaching expiry | < {{expiry_warning}} days | Medium |
| Unauthorized access attempt | Any | Critical |

---

## Implementation Checklist

### 10.1 Setup

- [ ] KMS provider configured
- [ ] Root KEK created
- [ ] Key hierarchy established
- [ ] Tenant provisioning integrated
- [ ] CMK flow implemented (Enterprise)

### 10.2 Operations

- [ ] Rotation automation deployed
- [ ] Monitoring dashboards created
- [ ] Alerting rules configured
- [ ] Runbooks documented

### 10.3 Compliance

- [ ] Audit logging enabled
- [ ] Access controls validated
- [ ] DR procedures tested
- [ ] Compliance documentation complete

---

## Appendix A: Configuration

```yaml
encryption:
  kms:
    provider: {{primary_kms_provider}}
    region: {{primary_region}}
    key_spec: AES_256
  
  rotation:
    tenant_kek_days: {{tenant_rotation_period}}
    data_dek_days: {{data_rotation_period}}
    auto_rotation: true
  
  envelope:
    algorithm: AES-256-GCM
    key_derivation: HKDF-SHA256
  
  cmk:
    enabled: {{cmk_enabled}}
    supported_providers:
      - aws_kms
      - gcp_kms
      - azure_keyvault
```

---

## Appendix B: Related Documents

- Pattern: `encryption-key-management` in `bam-patterns.csv`
- Compliance: `compliance-frameworks.csv`
- Tenant Model: `tenant-model-template.md`
- Data Residency: `data-residency` pattern

---

---

## Verification Checklist

- [ ] Key management model selected with justification
- [ ] Key hierarchy defined (Root KEK, Tenant KEK, DEKs)
- [ ] KMS provider configured with regional failover
- [ ] Envelope encryption flow implemented and tested
- [ ] Per-tenant key provisioning integrated with onboarding
- [ ] Key access control enforces tenant context boundaries
- [ ] Customer-managed keys (CMK) flow documented for Enterprise
- [ ] Key rotation schedule defined for all key types
- [ ] Grace period configuration allows safe key transitions
- [ ] Data categories mapped to encryption requirements
- [ ] Audit events logged for all key operations
- [ ] Disaster recovery procedures tested for key availability

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "encryption key management best practices {date}"
- "per-tenant encryption KMS multi-tenant patterns {date}"
- "customer-managed keys CMK enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
