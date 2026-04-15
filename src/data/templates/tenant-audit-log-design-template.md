---
name: tenant-audit-log-design-template
description: Audit logging design for multi-tenant platforms with compliance mapping for SOC2, GDPR, and regulatory requirements
category: tenant
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Audit logging design for multi-tenant platforms with compliance mapping for SOC2, GDPR, and regulatory requirements

# Tenant Audit Log Design: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | {{document_id}} |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |
| Compliance Review | {{compliance_review_date}} |

## Executive Summary

{{executive_summary}}

---

## Log Schema

### 1.1 Core Audit Record Schema

| Field | Type | Required | Description | Indexed |
|-------|------|----------|-------------|---------|
| audit_id | UUID | Yes | Unique audit record identifier | Primary |
| tenant_id | UUID | Yes | Tenant context (CRITICAL for isolation) | Yes |
| event_type | String | Yes | Categorized event type | Yes |
| event_category | String | Yes | High-level category | Yes |
| actor_id | UUID | Yes | User/system performing action | Yes |
| actor_type | Enum | Yes | user, service, system, api_key | Yes |
| resource_type | String | Yes | Type of resource affected | Yes |
| resource_id | UUID | No | Specific resource identifier | Yes |
| action | String | Yes | Specific action performed | Yes |
| timestamp | Timestamp | Yes | Event time (UTC, millisecond precision) | Yes |
| request_id | UUID | No | Request correlation ID | Yes |

### 1.2 Context Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ip_address | String | No | Source IP address |
| user_agent | String | No | Client user agent |
| session_id | UUID | No | Session identifier |
| geo_location | JSON | No | Geographic information |
| device_fingerprint | String | No | Device identifier |
| api_version | String | No | API version used |

### 1.3 Event Details Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| details | JSON | No | Event-specific structured data |
| old_value | JSON | No | Previous state (for changes) |
| new_value | JSON | No | New state (for changes) |
| metadata | JSON | No | Additional context |
| tags | Array | No | Searchable tags |

### 1.4 Security Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| integrity_hash | String | Yes | SHA-256 hash of record |
| previous_hash | String | No | Hash of previous record (chain) |
| signature | String | No | Digital signature |
| encryption_key_id | String | No | Key used for encryption |

### 1.5 Tenant-Specific Extensions

| Extension Field | Purpose | Tier Availability |
|-----------------|---------|-------------------|
| custom_fields | Tenant-defined metadata | {{custom_fields_tier}} |
| workflow_id | Business workflow tracking | {{workflow_tier}} |
| compliance_tags | Regulatory tagging | {{compliance_tags_tier}} |
| retention_override | Custom retention | {{retention_override_tier}} |

---

## Event Categories

### 2.1 Category Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    Event Category Hierarchy                      │
│                                                                  │
│  authentication                                                  │
│    ├── auth.login                   (User login)                │
│    ├── auth.logout                  (User logout)               │
│    ├── auth.mfa                     (MFA events)                │
│    ├── auth.password                (Password changes)          │
│    └── auth.failed                  (Failed attempts)           │
│                                                                  │
│  authorization                                                   │
│    ├── authz.permission_check       (Permission evaluations)    │
│    ├── authz.role_change            (Role modifications)        │
│    ├── authz.access_denied          (Denied access)             │
│    └── authz.elevation              (Privilege escalation)      │
│                                                                  │
│  data                                                            │
│    ├── data.create                  (Resource creation)         │
│    ├── data.read                    (Resource access)           │
│    ├── data.update                  (Resource modification)     │
│    ├── data.delete                  (Resource deletion)         │
│    └── data.export                  (Data export)               │
│                                                                  │
│  tenant                                                          │
│    ├── tenant.config                (Configuration changes)     │
│    ├── tenant.user                  (User management)           │
│    ├── tenant.billing               (Billing events)            │
│    └── tenant.tier                  (Tier changes)              │
│                                                                  │
│  agent                                                           │
│    ├── agent.execution              (Agent runs)                │
│    ├── agent.tool_call              (Tool invocations)          │
│    ├── agent.memory                 (Memory operations)         │
│    └── agent.error                  (Agent failures)            │
│                                                                  │
│  security                                                        │
│    ├── security.anomaly             (Anomalous behavior)        │
│    ├── security.violation           (Security violations)       │
│    ├── security.incident            (Security incidents)        │
│    └── security.key                 (API key events)            │
│                                                                  │
│  system                                                          │
│    ├── system.health                (Health checks)             │
│    ├── system.maintenance           (Maintenance events)        │
│    └── system.integration           (External integrations)     │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Event Type Definitions

| Event Type | Description | Severity | Compliance Relevance |
|------------|-------------|----------|---------------------|
| auth.login | User authentication | Info | SOC2, GDPR |
| auth.failed | Failed authentication | Warning | SOC2 |
| authz.access_denied | Access denied | Warning | SOC2, GDPR |
| data.export | Data exported | Info | GDPR (DSAR) |
| data.delete | Data deleted | Info | GDPR (Erasure) |
| tenant.config | Configuration changed | Info | SOC2 |
| security.anomaly | Anomalous behavior | High | SOC2 |
| security.violation | Security policy violation | Critical | SOC2 |
| agent.execution | AI agent executed | Info | {{agent_compliance}} |

### 2.3 Severity Levels

| Level | Value | Description | Alert |
|-------|-------|-------------|-------|
| Debug | 0 | Detailed debugging | None |
| Info | 1 | Normal operations | None |
| Warning | 2 | Potential issues | {{warning_alert}} |
| High | 3 | Significant events | {{high_alert}} |
| Critical | 4 | Immediate attention | {{critical_alert}} |

### 2.4 Event Volume by Category

| Category | Expected Volume | Sampling Strategy |
|----------|-----------------|-------------------|
| authentication | {{auth_volume}} | Full capture |
| authorization | {{authz_volume}} | Full capture |
| data.read | {{data_read_volume}} | {{read_sampling}} |
| data.write | {{data_write_volume}} | Full capture |
| agent.execution | {{agent_volume}} | Full capture |
| system.health | {{health_volume}} | {{health_sampling}} |

---

## Retention Policies

### 3.1 Retention by Tier

| Tier | Standard Retention | Extended Retention | Archive Retention |
|------|--------------------|--------------------|-------------------|
| Free | {{free_standard}} | N/A | N/A |
| Pro | {{pro_standard}} | {{pro_extended}} | {{pro_archive}} |
| Enterprise | {{enterprise_standard}} | {{enterprise_extended}} | {{enterprise_archive}} |

### 3.2 Retention by Event Category

| Category | Hot Storage | Warm Storage | Cold Storage | Total |
|----------|-------------|--------------|--------------|-------|
| authentication | {{auth_hot}} | {{auth_warm}} | {{auth_cold}} | {{auth_total}} |
| authorization | {{authz_hot}} | {{authz_warm}} | {{authz_cold}} | {{authz_total}} |
| data (write/delete) | {{data_write_hot}} | {{data_write_warm}} | {{data_write_cold}} | {{data_write_total}} |
| data (read) | {{data_read_hot}} | {{data_read_warm}} | N/A | {{data_read_total}} |
| security | {{security_hot}} | {{security_warm}} | {{security_cold}} | {{security_total}} |
| agent | {{agent_hot}} | {{agent_warm}} | {{agent_cold}} | {{agent_total}} |

### 3.3 Compliance-Driven Retention

| Regulation | Minimum Retention | Applies To |
|------------|-------------------|------------|
| SOC2 | {{soc2_retention}} | All security events |
| GDPR | {{gdpr_retention}} | All personal data events |
| HIPAA | {{hipaa_retention}} | Healthcare data events |
| PCI-DSS | {{pci_retention}} | Payment data events |
| Custom | {{custom_retention}} | Tenant-defined |

### 3.4 Retention Lifecycle

| Phase | Duration | Storage Type | Access |
|-------|----------|--------------|--------|
| Hot | {{hot_duration}} | {{hot_storage_type}} | Real-time query |
| Warm | {{warm_duration}} | {{warm_storage_type}} | Delayed query |
| Cold | {{cold_duration}} | {{cold_storage_type}} | Archive retrieval |
| Purge | End of retention | N/A | Secure deletion |

### 3.5 Legal Hold Override

| Trigger | Effect | Duration |
|---------|--------|----------|
| Litigation hold | Suspend deletion | Until released |
| Regulatory investigation | Suspend deletion | Until cleared |
| Tenant request | Extend specific records | {{tenant_hold_max}} |

---

## Immutability

### 4.1 Immutability Guarantees

| Aspect | Implementation | Verification |
|--------|----------------|--------------|
| Write-once | {{write_once_impl}} | {{write_once_verify}} |
| Tamper-evident | {{tamper_evident_impl}} | {{tamper_evident_verify}} |
| Chain integrity | {{chain_integrity_impl}} | {{chain_integrity_verify}} |
| Deletion protection | {{deletion_protection_impl}} | {{deletion_protection_verify}} |

### 4.2 Hash Chain Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    Audit Log Hash Chain                          │
│                                                                  │
│  Record N-2        Record N-1        Record N         Record N+1 │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐  ┌────────┐ │
│  │ audit_id   │    │ audit_id   │    │ audit_id   │  │ ...    │ │
│  │ data       │    │ data       │    │ data       │  │        │ │
│  │ prev_hash──┼────┤ prev_hash──┼────┤ prev_hash  │  │        │ │
│  │ hash───────┼────┤ hash───────┼────┤ hash───────┼──┤        │ │
│  └────────────┘    └────────────┘    └────────────┘  └────────┘ │
│                                                                  │
│  Hash includes: audit_id + tenant_id + timestamp + data + prev  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Integrity Verification

| Check | Frequency | Alert On Failure |
|-------|-----------|------------------|
| Hash chain validation | {{chain_check_frequency}} | {{chain_failure_alert}} |
| Record integrity | {{record_check_frequency}} | {{record_failure_alert}} |
| Gap detection | {{gap_check_frequency}} | {{gap_failure_alert}} |
| Cross-partition consistency | {{partition_check_frequency}} | {{partition_failure_alert}} |

### 4.4 Cryptographic Configuration

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Hash algorithm | {{hash_algorithm}} | Record integrity |
| Signature algorithm | {{signature_algorithm}} | Non-repudiation |
| Key rotation | {{key_rotation_schedule}} | Security hygiene |
| Key storage | {{key_storage}} | Key protection |

---

## Search and Query

### 5.1 Query Capabilities

| Query Type | Indexed Fields | Performance Target |
|------------|----------------|-------------------|
| By tenant_id | tenant_id | < {{tenant_query_ms}} ms |
| By time range | timestamp | < {{time_query_ms}} ms |
| By event_type | event_type, event_category | < {{type_query_ms}} ms |
| By actor | actor_id, actor_type | < {{actor_query_ms}} ms |
| By resource | resource_type, resource_id | < {{resource_query_ms}} ms |
| Full-text | details (text index) | < {{fulltext_query_ms}} ms |

### 5.2 Query Interface

| Interface | Use Case | Authentication |
|-----------|----------|----------------|
| REST API | Programmatic access | API key with audit:read scope |
| GraphQL | Flexible queries | API key with audit:read scope |
| Web UI | Interactive exploration | User session |
| CLI | Automation/scripting | API key |

### 5.3 Query Filters

| Filter | Operators | Example |
|--------|-----------|---------|
| timestamp | gt, gte, lt, lte, range | `timestamp.gte=2024-01-01` |
| event_type | eq, in, prefix | `event_type.in=auth.login,auth.logout` |
| actor_id | eq, in | `actor_id=uuid` |
| severity | gte, lte | `severity.gte=warning` |
| details | contains, jsonpath | `details.contains=keyword` |

### 5.4 Aggregation Support

| Aggregation | Description | Tier Required |
|-------------|-------------|---------------|
| count | Count by field | Free |
| time_series | Events over time | Free |
| top_n | Most frequent values | Pro |
| cardinality | Unique values | Pro |
| percentile | Response time percentiles | Enterprise |
| anomaly_detection | Statistical anomalies | Enterprise |

### 5.5 Tenant Isolation in Queries

| Enforcement | Method | Bypass Possible |
|-------------|--------|-----------------|
| Query rewrite | Auto-inject tenant_id filter | No |
| Result filtering | Post-query tenant check | No |
| Index partitioning | Tenant-partitioned indexes | No |

---

## Export

### 6.1 Export Formats

| Format | Use Case | Schema Included |
|--------|----------|-----------------|
| JSON | API consumption | {{json_schema}} |
| CSV | Spreadsheet analysis | {{csv_schema}} |
| Parquet | Data lake integration | {{parquet_schema}} |
| SIEM | Security tool integration | {{siem_schema}} |

### 6.2 Export Scope Options

| Scope | Description | Authorization |
|-------|-------------|---------------|
| Single event | One audit record | audit:read |
| Query result | Filtered set | audit:read + audit:export |
| Time range | All events in period | audit:read + audit:export |
| Full tenant | Complete tenant audit | tenant:admin + audit:export |

### 6.3 Export Delivery

| Method | Max Size | Notification |
|--------|----------|--------------|
| Synchronous API | {{sync_max_size}} | Immediate |
| Async download | {{async_max_size}} | {{async_notify}} |
| Streaming | Unlimited | Continuous |
| Scheduled | {{scheduled_max_size}} | {{scheduled_notify}} |

### 6.4 Export Audit

| Logged Field | Purpose |
|--------------|---------|
| exporter_id | Who exported |
| export_scope | What was exported |
| export_time | When exported |
| record_count | Volume exported |
| destination | Where sent |

### 6.5 DSAR Export (GDPR)

| Requirement | Implementation |
|-------------|----------------|
| Subject identification | {{dsar_identification}} |
| Data compilation | {{dsar_compilation}} |
| Format | {{dsar_format}} |
| Delivery timeline | {{dsar_timeline}} |
| Verification | {{dsar_verification}} |

---

## Compliance Mapping

### 7.1 SOC2 Mapping

| SOC2 Control | Event Categories | Retention Requirement |
|--------------|------------------|----------------------|
| CC6.1 - Access Control | auth.*, authz.* | {{soc2_cc61_retention}} |
| CC6.2 - Auth Mechanisms | auth.login, auth.mfa | {{soc2_cc62_retention}} |
| CC6.3 - Access Removal | authz.role_change, tenant.user | {{soc2_cc63_retention}} |
| CC7.1 - System Operations | system.*, agent.* | {{soc2_cc71_retention}} |
| CC7.2 - Change Management | tenant.config, data.* | {{soc2_cc72_retention}} |
| CC7.3 - Vulnerability Mgmt | security.* | {{soc2_cc73_retention}} |
| CC8.1 - System Incidents | security.incident, security.anomaly | {{soc2_cc81_retention}} |

### 7.2 GDPR Mapping

| GDPR Article | Event Categories | Special Handling |
|--------------|------------------|------------------|
| Art. 5 - Data Processing | data.*, agent.* | {{gdpr_art5_handling}} |
| Art. 15 - Right of Access | data.export (subject access) | {{gdpr_art15_handling}} |
| Art. 17 - Right to Erasure | data.delete | {{gdpr_art17_handling}} |
| Art. 20 - Data Portability | data.export | {{gdpr_art20_handling}} |
| Art. 33 - Breach Notification | security.incident | {{gdpr_art33_handling}} |

### 7.3 Additional Frameworks

| Framework | Applicable Events | Configuration |
|-----------|-------------------|---------------|
| HIPAA | {{hipaa_events}} | {{hipaa_config}} |
| PCI-DSS | {{pci_events}} | {{pci_config}} |
| ISO 27001 | {{iso27001_events}} | {{iso27001_config}} |
| CCPA | {{ccpa_events}} | {{ccpa_config}} |

### 7.4 Compliance Dashboard

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Audit coverage | 100% | < 99% |
| Retention compliance | 100% | Any violation |
| Integrity check pass | 100% | Any failure |
| DSAR response time | < {{dsar_target}} | > {{dsar_threshold}} |

### 7.5 Audit for Audits

| Meta-Audit Event | Captured When |
|------------------|---------------|
| audit.query | Audit logs queried |
| audit.export | Audit logs exported |
| audit.config_change | Audit configuration changed |
| audit.retention_override | Retention policy overridden |

---

## Implementation Checklist

### Log Schema
- [ ] Core audit record schema implemented
- [ ] Context fields captured
- [ ] Security fields (hash, signature) implemented
- [ ] Tenant-specific extensions supported

### Event Categories
- [ ] All event categories defined
- [ ] Event types mapped to categories
- [ ] Severity levels assigned
- [ ] Volume estimation completed

### Retention Policies
- [ ] Tier-based retention configured
- [ ] Category-specific retention implemented
- [ ] Compliance-driven retention enforced
- [ ] Legal hold mechanism available

### Immutability
- [ ] Write-once enforcement
- [ ] Hash chain implementation
- [ ] Integrity verification scheduled
- [ ] Cryptographic keys managed

### Search and Query
- [ ] Required indexes created
- [ ] Query APIs implemented
- [ ] Tenant isolation enforced
- [ ] Performance targets met

### Export
- [ ] Multiple formats supported
- [ ] Export scopes defined
- [ ] Delivery methods implemented
- [ ] Export auditing enabled

### Compliance
- [ ] SOC2 controls mapped
- [ ] GDPR requirements addressed
- [ ] Additional frameworks configured
- [ ] Compliance dashboard operational

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "audit log design multi-tenant SaaS {date}"
- "SOC2 audit logging requirements {date}"
- "GDPR audit trail compliance {date}"
- "immutable audit log blockchain hash chain {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Log schema includes all required fields with tenant isolation
- [ ] Event categories comprehensively cover all system activities
- [ ] Retention policies meet compliance requirements for all frameworks
- [ ] Immutability guarantees implemented with hash chain verification
- [ ] Search and query performance targets defined and achievable
- [ ] Export functionality supports compliance reporting needs
- [ ] SOC2 controls fully mapped to audit events
- [ ] GDPR requirements addressed with DSAR support
- [ ] Implementation checklist complete and verified

---

## Appendix

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Tenant Model: `{{tenant_model_link}}`
- Security Specification: `{{security_spec_link}}`
- Compliance Checklist: `{{compliance_checklist_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
