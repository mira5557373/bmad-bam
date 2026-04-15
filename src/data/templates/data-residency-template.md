---
name: Data Residency Template
description: Template for documenting geographic data storage compliance and cross-region data handling
category: architecture
version: 1.0.0
type: "compliance"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for documenting geographic data storage compliance and cross-region data handling

# Data Residency Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Overview

### 1.1 Purpose

This document specifies the data residency strategy for {{project_name}}, ensuring geographic data storage compliance while maintaining service functionality across regions and meeting regulatory requirements.

### 1.2 Goals

- Comply with regional data sovereignty laws
- Support tenant data residency requirements
- Enable cross-region operations where permitted
- Maintain audit trails for compliance
- Provide data location transparency

### 1.3 Regulatory Context

| Regulation | Jurisdiction | Key Requirements |
|------------|--------------|------------------|
| GDPR | EU/EEA | Data localization, transfer restrictions |
| CCPA/CPRA | California, USA | Consumer rights, disclosure |
| LGPD | Brazil | Data localization requirements |
| POPIA | South Africa | Cross-border transfer controls |
| PDPA | Singapore | Transfer restrictions, consent |
| PIPL | China | Strict data localization |
| DPA | UK | Post-Brexit GDPR alignment |

---

## Residency Requirements

### 2.1 Data Classification by Residency

| Data Type | Residency Required | Can Replicate | Notes |
|-----------|-------------------|---------------|-------|
| Personal Data (PII) | {{pii_residency}} | {{pii_replicate}} | {{pii_notes}} |
| Payment Data | {{payment_residency}} | {{payment_replicate}} | {{payment_notes}} |
| Health Data (PHI) | {{phi_residency}} | {{phi_replicate}} | {{phi_notes}} |
| Business Data | {{business_residency}} | {{business_replicate}} | {{business_notes}} |
| System Logs | {{logs_residency}} | {{logs_replicate}} | {{logs_notes}} |
| Analytics Data | {{analytics_residency}} | {{analytics_replicate}} | {{analytics_notes}} |
| AI Training Data | {{ai_residency}} | {{ai_replicate}} | {{ai_notes}} |
| Backup Data | {{backup_residency}} | {{backup_replicate}} | {{backup_notes}} |

### 2.2 Tenant Residency Selection

| Tier | Residency Options | Default Region |
|------|-------------------|----------------|
| Free | {{free_regions}} | {{free_default}} |
| Pro | {{pro_regions}} | {{pro_default}} |
| Enterprise | {{enterprise_regions}} | {{enterprise_default}} |
| Custom | All supported regions | Negotiated |

### 2.3 Residency Requirement Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                  Data Residency Decision Matrix                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tenant Location     Compliance          Storage Region          │
│        │             Framework                │                  │
│        ▼                │                     ▼                  │
│   ┌─────────┐          │              ┌─────────────┐           │
│   │   EU    │ ─────────┼─► GDPR ─────►│   EU-WEST   │           │
│   └─────────┘          │              └─────────────┘           │
│                        │                                         │
│   ┌─────────┐          │              ┌─────────────┐           │
│   │   US    │ ─────────┼─► SOC2 ─────►│   US-EAST   │           │
│   └─────────┘          │              └─────────────┘           │
│                        │                                         │
│   ┌─────────┐          │              ┌─────────────┐           │
│   │  APAC   │ ─────────┼─► PDPA ─────►│   AP-SOUTH  │           │
│   └─────────┘          │              └─────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Region Configuration

### 3.1 Supported Regions

| Region Code | Location | Provider | Compliance | Status |
|-------------|----------|----------|------------|--------|
| {{region_1_code}} | {{region_1_location}} | {{region_1_provider}} | {{region_1_compliance}} | {{region_1_status}} |
| {{region_2_code}} | {{region_2_location}} | {{region_2_provider}} | {{region_2_compliance}} | {{region_2_status}} |
| {{region_3_code}} | {{region_3_location}} | {{region_3_provider}} | {{region_3_compliance}} | {{region_3_status}} |
| {{region_4_code}} | {{region_4_location}} | {{region_4_provider}} | {{region_4_compliance}} | {{region_4_status}} |
| {{region_5_code}} | {{region_5_location}} | {{region_5_provider}} | {{region_5_compliance}} | {{region_5_status}} |
| {{region_6_code}} | {{region_6_location}} | {{region_6_provider}} | {{region_6_compliance}} | {{region_6_status}} |

### 3.2 Region Infrastructure

| Region | Primary DB | Read Replicas | Object Storage | CDN PoP |
|--------|------------|---------------|----------------|---------|
| {{region_1_code}} | {{region_1_db}} | {{region_1_replicas}} | {{region_1_storage}} | {{region_1_cdn}} |
| {{region_2_code}} | {{region_2_db}} | {{region_2_replicas}} | {{region_2_storage}} | {{region_2_cdn}} |
| {{region_3_code}} | {{region_3_db}} | {{region_3_replicas}} | {{region_3_storage}} | {{region_3_cdn}} |
| {{region_4_code}} | {{region_4_db}} | {{region_4_replicas}} | {{region_4_storage}} | {{region_4_cdn}} |

### 3.3 Region Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Global Load Balancer                        │
│              (Anycast DNS / Geographic Routing)                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   EU-WEST-1   │   │   US-EAST-1   │   │  AP-SOUTH-1   │
│   Region      │   │   Region      │   │   Region      │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ ┌───────────┐ │   │ ┌───────────┐ │   │ ┌───────────┐ │
│ │    API    │ │   │ │    API    │ │   │ │    API    │ │
│ │  Gateway  │ │   │ │  Gateway  │ │   │ │  Gateway  │ │
│ └─────┬─────┘ │   │ └─────┬─────┘ │   │ └─────┬─────┘ │
│       │       │   │       │       │   │       │       │
│ ┌─────┴─────┐ │   │ ┌─────┴─────┐ │   │ ┌─────┴─────┐ │
│ │  Services │ │   │ │  Services │ │   │ │  Services │ │
│ └─────┬─────┘ │   │ └─────┬─────┘ │   │ └─────┬─────┘ │
│       │       │   │       │       │   │       │       │
│ ┌─────┴─────┐ │   │ ┌─────┴─────┐ │   │ ┌─────┴─────┐ │
│ │ Regional  │ │   │ │ Regional  │ │   │ │ Regional  │ │
│ │    DB     │ │   │ │    DB     │ │   │ │    DB     │ │
│ └───────────┘ │   │ └───────────┘ │   │ └───────────┘ │
└───────────────┘   └───────────────┘   └───────────────┘
```

### 3.4 Region Configuration Schema

```yaml
regions:
  - code: "{{region_code}}"
    name: "{{region_name}}"
    location: "{{region_location}}"
    provider: "{{region_provider}}"
    
    compliance:
      frameworks:
        - "{{compliance_framework_1}}"
        - "{{compliance_framework_2}}"
      certifications:
        - "{{certification_1}}"
        - "{{certification_2}}"
    
    infrastructure:
      database:
        primary: "{{db_primary}}"
        read_replicas: {{db_replicas}}
        backup_region: "{{backup_region}}"
      storage:
        bucket: "{{storage_bucket}}"
        encryption: "{{storage_encryption}}"
      compute:
        cluster: "{{compute_cluster}}"
        min_nodes: {{compute_min}}
        max_nodes: {{compute_max}}
    
    features:
      ai_inference: {{ai_inference_enabled}}
      vector_search: {{vector_search_enabled}}
      edge_caching: {{edge_caching_enabled}}
    
    status: "{{region_status}}"
```

---

## Geo-Routing Rules

### 4.1 Routing Decision Hierarchy

| Priority | Rule Type | Description |
|----------|-----------|-------------|
| 1 | Explicit Tenant Config | Tenant-specified region |
| 2 | Compliance Override | Regulatory requirement |
| 3 | Geographic Proximity | Nearest available region |
| 4 | Load Balancing | Least loaded region |
| 5 | Default Region | Fallback configuration |

### 4.2 Routing Configuration

```yaml
geo_routing:
  default_region: "{{default_region}}"
  
  rules:
    # Compliance-based routing
    - name: "EU Data Subjects"
      condition:
        user_location: ["EU", "EEA", "UK"]
        data_type: "personal"
      action:
        route_to: ["eu-west-1", "eu-central-1"]
        fallback: "deny"
        
    # Tenant-specific routing
    - name: "Enterprise Tenant Override"
      condition:
        tenant_tier: "enterprise"
        tenant_region_config: "present"
      action:
        route_to: "tenant.config.region"
        fallback: "geographic"
        
    # Geographic routing
    - name: "APAC Users"
      condition:
        user_location: ["AU", "NZ", "SG", "JP", "KR"]
      action:
        route_to: ["ap-southeast-1", "ap-northeast-1"]
        fallback: "us-west-1"
```

### 4.3 Routing Flow

```
Request Arrives
      │
      ▼
┌─────────────┐
│Extract Info │
│ - Tenant ID │
│ - User Loc  │
│ - Data Type │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  Tenant     │ Yes │   Use       │
│  Override?  │ ──► │   Tenant    │
└──────┬──────┘     │   Region    │
       │ No         └──────┬──────┘
       ▼                   │
┌─────────────┐            │
│  Compliance │ Yes ┌──────┴──────┐
│  Required?  │ ──► │  Compliant  │
└──────┬──────┘     │   Region    │
       │ No         └──────┬──────┘
       ▼                   │
┌─────────────┐            │
│  Geographic │            │
│   Routing   │            │
└──────┬──────┘            │
       │                   │
       └───────────────────┘
               │
               ▼
         Route Request
```

### 4.4 Request Headers for Routing

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Data-Region` | Explicit region request | `eu-west-1` |
| `X-Residency-Override` | Compliance override | `gdpr-eu` |
| `X-Tenant-Region` | Tenant config region | `ap-south-1` |
| `CF-IPCountry` / `X-Country` | User location | `DE` |

---

## Cross-Region Sync

### 5.1 Sync Strategy Matrix

| Data Type | Sync Strategy | Latency Target | Conflict Resolution |
|-----------|---------------|----------------|---------------------|
| User Profiles | Async eventual | {{profile_sync_latency}} | Last-write-wins |
| Tenant Config | Sync multi-leader | {{config_sync_latency}} | Version vector |
| Transactional | No sync (regional) | N/A | Regional only |
| Reference Data | Async broadcast | {{reference_sync_latency}} | Source of truth |
| Analytics | Aggregated sync | {{analytics_sync_latency}} | Append-only |
| Audit Logs | Async replicate | {{audit_sync_latency}} | Immutable |

### 5.2 Sync Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Global Sync Coordinator                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                    Change Events
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Region A    │   │   Region B    │   │   Region C    │
│   Database    │   │   Database    │   │   Database    │
├───────────────┤   ├───────────────┤   ├───────────────┤
│               │   │               │   │               │
│  Change Data  │──►│  Change Data  │──►│  Change Data  │
│   Capture     │   │   Capture     │   │   Capture     │
│               │   │               │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                   ┌───────────────┐
                   │ Conflict      │
                   │ Resolution    │
                   │ Service       │
                   └───────────────┘
```

### 5.3 Sync Rules

| Source Region | Target Region | Data Types | Allowed | Condition |
|---------------|---------------|------------|---------|-----------|
| EU-* | US-* | Non-PII only | {{eu_us_allowed}} | {{eu_us_condition}} |
| US-* | EU-* | All | {{us_eu_allowed}} | {{us_eu_condition}} |
| Any | China | None | {{china_allowed}} | {{china_condition}} |
| China | Any | Aggregated | {{china_export_allowed}} | {{china_export_condition}} |
| Any | Same region | All | Yes | Always |

### 5.4 Sync Configuration

```yaml
cross_region_sync:
  enabled: {{sync_enabled}}
  coordinator: "{{sync_coordinator}}"
  
  strategies:
    reference_data:
      type: "broadcast"
      source_region: "{{reference_source}}"
      targets: "all"
      frequency: "{{reference_frequency}}"
      
    user_profiles:
      type: "eventual"
      conflict_resolution: "lww"
      max_lag_seconds: {{profile_max_lag}}
      
    tenant_config:
      type: "sync"
      conflict_resolution: "vector_clock"
      consistency: "strong"
  
  restrictions:
    - pattern: "pii.*"
      allowed_regions: "same_as_tenant"
    - pattern: "financial.*"
      allowed_regions: "same_continent"
```

---

## Compliance Mapping

### 6.1 Framework to Region Mapping

| Compliance Framework | Required Regions | Prohibited Regions | Notes |
|---------------------|------------------|-------------------|-------|
| GDPR | EU/EEA or adequacy | None (with SCCs) | {{gdpr_notes}} |
| HIPAA | US only | Non-BAA regions | {{hipaa_notes}} |
| PCI-DSS | Certified regions | Non-certified | {{pci_notes}} |
| SOC 2 | Audited regions | Non-audited | {{soc2_notes}} |
| FedRAMP | US GovCloud | All others | {{fedramp_notes}} |
| PIPL | China only | All others | {{pipl_notes}} |

### 6.2 Compliance Controls by Region

| Control | EU-WEST | US-EAST | AP-SOUTH | Required By |
|---------|---------|---------|----------|-------------|
| Encryption at rest | {{eu_encryption}} | {{us_encryption}} | {{ap_encryption}} | All |
| Encryption in transit | TLS 1.3 | TLS 1.3 | TLS 1.3 | All |
| Key management | {{eu_kms}} | {{us_kms}} | {{ap_kms}} | All |
| Access logging | {{eu_logging}} | {{us_logging}} | {{ap_logging}} | SOC2, GDPR |
| Data retention | {{eu_retention}} | {{us_retention}} | {{ap_retention}} | GDPR, CCPA |
| Right to erasure | {{eu_erasure}} | {{us_erasure}} | {{ap_erasure}} | GDPR, CCPA |

### 6.3 Data Transfer Mechanisms

| Source | Destination | Mechanism | Documentation |
|--------|-------------|-----------|---------------|
| EU | US | {{eu_us_mechanism}} | {{eu_us_docs}} |
| EU | UK | {{eu_uk_mechanism}} | {{eu_uk_docs}} |
| US | EU | {{us_eu_mechanism}} | {{us_eu_docs}} |
| APAC | US | {{apac_us_mechanism}} | {{apac_us_docs}} |
| Any | China | {{any_china_mechanism}} | {{any_china_docs}} |

### 6.4 Compliance Configuration

```yaml
compliance:
  default_framework: "{{default_framework}}"
  
  frameworks:
    gdpr:
      enabled: {{gdpr_enabled}}
      dpo_contact: "{{dpo_email}}"
      data_subject_requests:
        endpoint: "{{dsar_endpoint}}"
        sla_days: {{dsar_sla}}
      transfer_mechanisms:
        - "sccs"
        - "adequacy_decision"
        
    hipaa:
      enabled: {{hipaa_enabled}}
      baa_required: true
      phi_regions: ["us-east-1", "us-west-2"]
      
    soc2:
      enabled: {{soc2_enabled}}
      audit_frequency: "annual"
      report_type: "type2"
```

---

## Audit Trail

### 7.1 Audit Events

| Event Type | Trigger | Data Captured | Retention |
|------------|---------|---------------|-----------|
| Data Access | Any read operation | User, tenant, resource, timestamp | {{access_retention}} |
| Data Modification | Any write operation | User, tenant, resource, before/after | {{modification_retention}} |
| Data Transfer | Cross-region movement | Source, destination, data type | {{transfer_retention}} |
| Region Change | Tenant region update | Old region, new region, reason | {{region_change_retention}} |
| Compliance Request | DSAR submission | Request type, requester, status | {{compliance_request_retention}} |
| Export | Data export | User, tenant, data scope | {{export_retention}} |

### 7.2 Audit Log Schema

```json
{
  "event_id": "{{event_id}}",
  "timestamp": "{{timestamp}}",
  "event_type": "{{event_type}}",
  "tenant_id": "{{tenant_id}}",
  "user_id": "{{user_id}}",
  "source_region": "{{source_region}}",
  "target_region": "{{target_region}}",
  "resource": {
    "type": "{{resource_type}}",
    "id": "{{resource_id}}",
    "classification": "{{data_classification}}"
  },
  "action": "{{action}}",
  "outcome": "{{outcome}}",
  "metadata": {
    "ip_address": "{{ip_address}}",
    "user_agent": "{{user_agent}}",
    "compliance_context": "{{compliance_context}}"
  },
  "checksum": "{{audit_checksum}}"
}
```

### 7.3 Audit Trail Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Application Services                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                     Audit Events
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Audit Event Bus                               │
│              (Kafka with Immutable Topics)                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Regional      │   │  Compliance   │   │   SIEM        │
│ Audit Store   │   │  Analytics    │   │ Integration   │
│ (Immutable)   │   │  (Aggregated) │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
        │
        ▼
┌───────────────┐
│ Long-term     │
│ Archive       │
│ (Cold Storage)│
└───────────────┘
```

### 7.4 Audit Query Endpoints

| Endpoint | Method | Purpose | Access |
|----------|--------|---------|--------|
| `/api/v1/audit/events` | GET | Query audit events | Admin |
| `/api/v1/audit/export` | POST | Export audit logs | Compliance |
| `/api/v1/audit/report` | GET | Generate compliance report | Admin |
| `/api/v1/audit/verify` | POST | Verify audit integrity | System |

---

## Tenant Residency Management

### 8.1 Residency Selection Flow

```
Tenant Onboarding
       │
       ▼
┌─────────────────┐
│ Determine       │
│ Requirements    │
│ - Tier          │
│ - Location      │
│ - Compliance    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Present Valid   │
│ Region Options  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tenant Selects  │
│ Primary Region  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Provision       │
│ Regional        │
│ Resources       │
└────────┬────────┘
         │
         ▼
   Tenant Active
```

### 8.2 Region Migration Process

| Phase | Duration | Impact | Rollback |
|-------|----------|--------|----------|
| Planning | {{migration_planning}} | None | N/A |
| Data Sync | {{migration_sync}} | Read-only mode | Cancel |
| Cutover | {{migration_cutover}} | Brief outage | Switch back |
| Validation | {{migration_validation}} | None | Full rollback |
| Cleanup | {{migration_cleanup}} | None | N/A |

### 8.3 Migration Configuration

```yaml
region_migration:
  enabled: {{migration_enabled}}
  
  policies:
    max_concurrent_migrations: {{max_migrations}}
    blackout_periods: {{migration_blackout}}
    notification_advance_days: {{migration_notice}}
    
  process:
    sync_strategy: "{{sync_strategy}}"
    data_validation: "{{validation_mode}}"
    rollback_window_hours: {{rollback_window}}
    
  restrictions:
    min_time_in_region_days: {{min_residency_days}}
    migrations_per_year: {{max_yearly_migrations}}
```

---

## Monitoring & Alerting

### 9.1 Key Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `data_residency_compliance` | Gauge | tenant_id, region | Compliance status |
| `cross_region_transfer_bytes` | Counter | source, target, type | Transfer volume |
| `region_routing_decisions` | Counter | rule, region | Routing decisions |
| `audit_events_total` | Counter | event_type, region | Audit event count |
| `region_sync_lag_seconds` | Gauge | source, target | Replication lag |

### 9.2 Alert Rules

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| Compliance Violation | Data in wrong region | Critical | Immediate remediation |
| Sync Lag High | Lag > {{sync_lag_threshold}}s | Warning | Investigate |
| Unauthorized Transfer | Transfer to prohibited region | Critical | Block + alert |
| Audit Integrity Failure | Checksum mismatch | Critical | Security review |
| Region Capacity | Usage > {{capacity_threshold}}% | Warning | Scale planning |

### 9.3 Compliance Dashboard

| Panel | Visualization | Purpose |
|-------|---------------|---------|
| Regional Data Distribution | World map | Data location overview |
| Compliance Status | Status indicators | Per-framework compliance |
| Cross-Region Transfers | Sankey diagram | Data flow visibility |
| Audit Trail Activity | Time series | Audit event volume |
| Migration Status | Table | Active migrations |

---

## Implementation Checklist

### 10.1 Infrastructure

- [ ] Regions provisioned and configured
- [ ] Database clusters deployed per region
- [ ] Object storage buckets created
- [ ] Network connectivity established
- [ ] CDN configured with regional PoPs

### 10.2 Routing & Sync

- [ ] Geo-routing rules implemented
- [ ] Cross-region sync configured
- [ ] Conflict resolution tested
- [ ] Transfer restrictions enforced
- [ ] Failover procedures documented

### 10.3 Compliance

- [ ] Framework mappings defined
- [ ] Transfer mechanisms documented
- [ ] Audit logging enabled
- [ ] Retention policies configured
- [ ] DSAR processes implemented

### 10.4 Monitoring

- [ ] Metrics exposed
- [ ] Dashboards created
- [ ] Alerts configured
- [ ] Compliance reports automated
- [ ] Incident runbooks documented

---

## Appendix A: Data Subject Rights

### A.1 Rights by Framework

| Right | GDPR | CCPA | LGPD | PDPA |
|-------|------|------|------|------|
| Access | Yes | Yes | Yes | Yes |
| Rectification | Yes | No | Yes | Yes |
| Erasure | Yes | Yes | Yes | Yes |
| Portability | Yes | Yes | Yes | Yes |
| Objection | Yes | Opt-out | Yes | Yes |
| Restriction | Yes | No | Yes | No |

### A.2 Request Processing

```
DSAR Received
      │
      ▼
┌─────────────┐
│ Verify      │
│ Identity    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Identify    │
│ All Regions │
│ with Data   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Execute     │
│ Request in  │
│ Each Region │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Compile     │
│ Response    │
└──────┬──────┘
       │
       ▼
  Respond to
  Data Subject
```

---

## Appendix B: Related Documents

- Pattern: `data-residency` in `bam-patterns.csv`
- Pattern: `geo-routing` in `bam-patterns.csv`
- Template: `tenant-model-template.md`
- Template: `compliance-framework-template.md`
- Checklist: `production-readiness.md`

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "data residency best practices {date}"
- "geo-routing multi-tenant SaaS patterns {date}"
- "GDPR data sovereignty enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

### Residency Requirements

- [ ] Data classification by residency complete for all data types (PII, payment, PHI, business, logs, analytics, AI training, backup)
- [ ] Tenant residency options documented per subscription tier (Free, Pro, Enterprise, Custom)
- [ ] Regulatory context covers all applicable frameworks (GDPR, CCPA, LGPD, POPIA, PDPA, PIPL, DPA)
- [ ] Data residency decision matrix maps tenant location to compliance framework to storage region

### Region Configuration

- [ ] All supported regions documented with location, provider, compliance certifications, and status
- [ ] Region infrastructure specified (primary DB, read replicas, object storage, CDN PoP)
- [ ] Region configuration schema includes compliance, infrastructure, and features
- [ ] Geo-routing rules prioritized (explicit tenant config, compliance override, geographic, load balancing, default)

### Cross-Region and Compliance

- [ ] Sync strategy matrix defines latency targets and conflict resolution for each data type
- [ ] Cross-region sync rules specify allowed transfers with conditions
- [ ] Compliance framework to region mapping documented with prohibited regions
- [ ] Data transfer mechanisms specified for each region pair (SCCs, adequacy decisions, etc.)
- [ ] Compliance controls verified per region (encryption, key management, logging, retention, erasure)

### Audit and Operations

- [ ] Audit events captured for all data access, modification, transfer, and compliance requests
- [ ] Audit log schema includes event_id, timestamp, tenant_id, source/target regions, and checksum
- [ ] Region migration process documented with phases, duration, impact, and rollback procedures
- [ ] Monitoring metrics defined (compliance status, transfer volume, routing decisions, sync lag)
- [ ] Alert rules configured for compliance violations, sync lag, unauthorized transfers, and audit failures

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
