---
name: data-retention-template
description: Template for data retention policies including retention periods by data type, archival procedures, deletion schedules, legal hold process, and tenant-specific policies in multi-tenant SaaS platforms
category: compliance
version: 1.0.0
type: template
---

# Data Retention Policy: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the data retention framework for {{project_name}}, establishing standardized procedures for retention periods by data type, archival procedures, deletion schedules, legal hold processes, and tenant-specific retention policies across the multi-tenant SaaS platform.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Data Retention Policy |
| Project Name | {{project_name}} |
| Version | {{version}} |
| Created | {{date}} |
| Author | {{author}} |
| Status | {{document_status}} |
| Last Reviewed | {{last_review_date}} |
| Review Frequency | {{review_frequency}} |
| Legal Counsel Review | {{legal_review_date}} |
| DPO Approval | {{dpo_approval}} |
| Classification | {{document_classification}} |

---

## Table of Contents

1. [Retention Periods by Data Type](#retention-periods-by-data-type)
2. [Archival Procedures](#archival-procedures)
3. [Deletion Schedules](#deletion-schedules)
4. [Legal Hold Process](#legal-hold-process)
5. [Tenant-Specific Policies](#tenant-specific-policies)
6. [Data Classification](#data-classification)
7. [Compliance Requirements](#compliance-requirements)
8. [Monitoring and Reporting](#monitoring-and-reporting)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## Retention Periods by Data Type

### 1.1 Data Category Overview

| Data Category | Description | Default Retention | Legal Basis |
|---------------|-------------|-------------------|-------------|
| User Account Data | {{account_desc}} | {{account_retention}} | {{account_basis}} |
| Transaction Data | {{transaction_desc}} | {{transaction_retention}} | {{transaction_basis}} |
| Usage/Analytics | {{usage_desc}} | {{usage_retention}} | {{usage_basis}} |
| Audit Logs | {{audit_desc}} | {{audit_retention}} | {{audit_basis}} |
| Communication Records | {{comm_desc}} | {{comm_retention}} | {{comm_basis}} |
| Support Tickets | {{support_desc}} | {{support_retention}} | {{support_basis}} |
| AI/ML Training Data | {{ai_desc}} | {{ai_retention}} | {{ai_basis}} |
| Backup Data | {{backup_desc}} | {{backup_retention}} | {{backup_basis}} |

### 1.2 Detailed Retention Matrix

| Data Type | Active Retention | Archive Retention | Total Retention | Deletion Method |
|-----------|------------------|-------------------|-----------------|-----------------|
| {{data_type_1}} | {{active_1}} | {{archive_1}} | {{total_1}} | {{deletion_1}} |
| {{data_type_2}} | {{active_2}} | {{archive_2}} | {{total_2}} | {{deletion_2}} |
| {{data_type_3}} | {{active_3}} | {{archive_3}} | {{total_3}} | {{deletion_3}} |
| {{data_type_4}} | {{active_4}} | {{archive_4}} | {{total_4}} | {{deletion_4}} |
| {{data_type_5}} | {{active_5}} | {{archive_5}} | {{total_5}} | {{deletion_5}} |
| {{data_type_6}} | {{active_6}} | {{archive_6}} | {{total_6}} | {{deletion_6}} |
| {{data_type_7}} | {{active_7}} | {{archive_7}} | {{total_7}} | {{deletion_7}} |
| {{data_type_8}} | {{active_8}} | {{archive_8}} | {{total_8}} | {{deletion_8}} |

### 1.3 Retention by Compliance Framework

| Framework | Data Type | Minimum Retention | Notes |
|-----------|-----------|-------------------|-------|
| GDPR | Personal Data | {{gdpr_personal}} | {{gdpr_personal_notes}} |
| GDPR | Consent Records | {{gdpr_consent}} | {{gdpr_consent_notes}} |
| HIPAA | PHI | {{hipaa_phi}} | {{hipaa_phi_notes}} |
| HIPAA | Audit Logs | {{hipaa_audit}} | {{hipaa_audit_notes}} |
| PCI-DSS | Transaction Logs | {{pci_transaction}} | {{pci_transaction_notes}} |
| PCI-DSS | Audit Trails | {{pci_audit}} | {{pci_audit_notes}} |
| SOC 2 | Security Logs | {{soc2_security}} | {{soc2_security_notes}} |
| SOX | Financial Records | {{sox_financial}} | {{sox_financial_notes}} |

### 1.4 Retention Period Schema

```yaml
retention_policy:
  policy_id: uuid                     # Unique policy identifier
  data_type: string                   # Type of data
  data_category: string               # Category classification
  description: string                 # Policy description
  retention:
    active_period: duration           # Active data retention
    archive_period: duration          # Archive retention
    total_period: duration            # Total before deletion
    start_trigger: enum               # What starts the clock
  legal_basis:
    regulation: string                # Regulatory requirement
    statute: string                   # Legal statute reference
    business_justification: string    # Business reason
  exceptions:
    legal_hold: boolean               # Subject to legal hold
    tenant_override: boolean          # Tenant can customize
    minimum_override: duration        # Minimum if overridden
  storage:
    active_location: string           # Active data storage
    archive_location: string          # Archive storage
    encryption: boolean               # Encryption required
  tenant_applicability:
    free: boolean                     # Applies to free tier
    pro: boolean                      # Applies to pro tier
    enterprise: boolean               # Applies to enterprise
  metadata:
    created_at: iso8601
    updated_at: iso8601
    approved_by: string
```

### 1.5 Retention Triggers

| Trigger Event | Description | Affected Data Types |
|---------------|-------------|---------------------|
| Account Creation | {{creation_desc}} | {{creation_types}} |
| Transaction Date | {{transaction_trigger_desc}} | {{transaction_types}} |
| Last Activity | {{activity_desc}} | {{activity_types}} |
| Account Closure | {{closure_desc}} | {{closure_types}} |
| Contract End | {{contract_desc}} | {{contract_types}} |
| Legal Hold Release | {{hold_release_desc}} | {{hold_release_types}} |

---

## Archival Procedures

### 2.1 Archive Tiers

| Tier | Description | Access Time | Cost | Use Case |
|------|-------------|-------------|------|----------|
| Hot Archive | {{hot_desc}} | {{hot_access}} | {{hot_cost}} | {{hot_use}} |
| Warm Archive | {{warm_desc}} | {{warm_access}} | {{warm_cost}} | {{warm_use}} |
| Cold Archive | {{cold_desc}} | {{cold_access}} | {{cold_cost}} | {{cold_use}} |
| Deep Archive | {{deep_desc}} | {{deep_access}} | {{deep_cost}} | {{deep_use}} |

### 2.2 Archival Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Data Archival Workflow                       │
│                                                                  │
│  DATA_ACTIVE ──► RETENTION_CHECK ──► ARCHIVE_ELIGIBLE           │
│       │               │                    │                     │
│       │               │                    ▼                     │
│       │               │            PREPARE_FOR_ARCHIVE           │
│       │               │                    │                     │
│       │               │             ┌──────┴──────┐             │
│       │               │             ▼             ▼             │
│       │               │      COMPRESS_DATA   ENCRYPT_DATA       │
│       │               │             │             │             │
│       │               │             └──────┬──────┘             │
│       │               │                    ▼                     │
│       │               │            TRANSFER_TO_ARCHIVE           │
│       │               │                    │                     │
│       │               │                    ▼                     │
│       │               │            VERIFY_INTEGRITY              │
│       │               │                    │                     │
│       │               │             ┌──────┴──────┐             │
│       │               │             ▼             ▼             │
│       │               │           PASS          FAIL            │
│       │               │             │             │             │
│       │               │             ▼             └──► RETRY    │
│       │               │      UPDATE_METADATA                    │
│       │               │             │                           │
│       │               │             ▼                           │
│       │               │      DELETE_ACTIVE_COPY                 │
│       │               │             │                           │
│       │               │             ▼                           │
│       │               │      LOG_COMPLETION                     │
│       │               │                                         │
│       │               └──► NOT_ELIGIBLE ──► CONTINUE_ACTIVE    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Archive Configuration by Data Type

| Data Type | Archive Tier | Compression | Encryption | Format |
|-----------|--------------|-------------|------------|--------|
| {{archive_type_1}} | {{tier_1}} | {{compress_1}} | {{encrypt_1}} | {{format_1}} |
| {{archive_type_2}} | {{tier_2}} | {{compress_2}} | {{encrypt_2}} | {{format_2}} |
| {{archive_type_3}} | {{tier_3}} | {{compress_3}} | {{encrypt_3}} | {{format_3}} |
| {{archive_type_4}} | {{tier_4}} | {{compress_4}} | {{encrypt_4}} | {{format_4}} |

### 2.4 Archive Access Procedures

| Access Type | Request Process | Approval | SLA |
|-------------|-----------------|----------|-----|
| Standard Retrieval | {{standard_process}} | {{standard_approval}} | {{standard_sla}} |
| Urgent Retrieval | {{urgent_process}} | {{urgent_approval}} | {{urgent_sla}} |
| Bulk Retrieval | {{bulk_process}} | {{bulk_approval}} | {{bulk_sla}} |
| Legal/Compliance | {{legal_process}} | {{legal_approval}} | {{legal_sla}} |

### 2.5 Archive Integrity Verification

| Check Type | Frequency | Method | Alert On Failure |
|------------|-----------|--------|------------------|
| Checksum Verification | {{checksum_freq}} | {{checksum_method}} | {{checksum_alert}} |
| Sample Restore Test | {{restore_freq}} | {{restore_method}} | {{restore_alert}} |
| Encryption Verification | {{encrypt_freq}} | {{encrypt_method}} | {{encrypt_alert}} |
| Access Log Audit | {{access_audit_freq}} | {{access_audit_method}} | {{access_audit_alert}} |

---

## Deletion Schedules

### 3.1 Deletion Schedule Overview

| Data Type | Deletion Trigger | Grace Period | Notification | Reversible |
|-----------|------------------|--------------|--------------|------------|
| {{del_type_1}} | {{trigger_1}} | {{grace_1}} | {{notify_1}} | {{reversible_1}} |
| {{del_type_2}} | {{trigger_2}} | {{grace_2}} | {{notify_2}} | {{reversible_2}} |
| {{del_type_3}} | {{trigger_3}} | {{grace_3}} | {{notify_3}} | {{reversible_3}} |
| {{del_type_4}} | {{trigger_4}} | {{grace_4}} | {{notify_4}} | {{reversible_4}} |
| {{del_type_5}} | {{trigger_5}} | {{grace_5}} | {{notify_5}} | {{reversible_5}} |

### 3.2 Deletion Methods

| Method | Description | Use Case | Verification |
|--------|-------------|----------|--------------|
| Logical Deletion | {{logical_desc}} | {{logical_use}} | {{logical_verify}} |
| Soft Deletion | {{soft_desc}} | {{soft_use}} | {{soft_verify}} |
| Hard Deletion | {{hard_desc}} | {{hard_use}} | {{hard_verify}} |
| Cryptographic Erasure | {{crypto_desc}} | {{crypto_use}} | {{crypto_verify}} |
| Physical Destruction | {{physical_desc}} | {{physical_use}} | {{physical_verify}} |

### 3.3 Deletion Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Data Deletion Workflow                       │
│                                                                  │
│  RETENTION_EXPIRED ──► CHECK_LEGAL_HOLD ──► NO_HOLD             │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         CHECK_DEPENDENCIES       │
│        │                      │                 │                │
│        │                      │          ┌──────┴──────┐        │
│        │                      │          ▼             ▼        │
│        │                      │     NO_DEPS      HAS_DEPS       │
│        │                      │          │             │        │
│        │                      │          │        CASCADE_OR    │
│        │                      │          │        ORPHAN_REFS   │
│        │                      │          │             │        │
│        │                      │          └──────┬──────┘        │
│        │                      │                 ▼                │
│        │                      │         SCHEDULE_DELETION        │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         NOTIFY_IF_REQUIRED       │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         GRACE_PERIOD_WAIT        │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         EXECUTE_DELETION         │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         VERIFY_DELETION          │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         LOG_DELETION             │
│        │                      │                 │                │
│        │                      │                 ▼                │
│        │                      │         GENERATE_CERTIFICATE     │
│        │                      │                                  │
│        │                      └──► HOLD_ACTIVE ──► DEFER_DELETE │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Automated Deletion Jobs

| Job Name | Schedule | Data Types | Pre-Check | Post-Verification |
|----------|----------|------------|-----------|-------------------|
| {{job_1}} | {{schedule_1}} | {{types_1}} | {{precheck_1}} | {{postverify_1}} |
| {{job_2}} | {{schedule_2}} | {{types_2}} | {{precheck_2}} | {{postverify_2}} |
| {{job_3}} | {{schedule_3}} | {{types_3}} | {{precheck_3}} | {{postverify_3}} |

### 3.5 Deletion Certificate Schema

```yaml
deletion_certificate:
  certificate_id: uuid                # Unique certificate ID
  tenant_id: uuid                     # Affected tenant
  data_type: string                   # Type of data deleted
  deletion_scope:
    records_deleted: integer          # Number of records
    size_deleted: string              # Data size
    time_range: object                # Date range of data
  execution:
    method: string                    # Deletion method used
    executed_at: iso8601              # When deletion occurred
    executed_by: string               # System or operator
  verification:
    verified_at: iso8601              # Verification timestamp
    verified_by: string               # Verifier
    method: string                    # Verification method
  compliance:
    regulation: string                # Applicable regulation
    requirement: string               # Specific requirement
    audit_reference: string           # Audit trail reference
  signature:
    hash: string                      # Certificate hash
    signed_by: string                 # Signing authority
```

---

## Legal Hold Process

### 4.1 Legal Hold Overview

| Hold Type | Description | Duration | Authority |
|-----------|-------------|----------|-----------|
| Litigation Hold | {{litigation_desc}} | {{litigation_duration}} | {{litigation_authority}} |
| Regulatory Investigation | {{regulatory_desc}} | {{regulatory_duration}} | {{regulatory_authority}} |
| Internal Investigation | {{internal_desc}} | {{internal_duration}} | {{internal_authority}} |
| Preservation Request | {{preservation_desc}} | {{preservation_duration}} | {{preservation_authority}} |

### 4.2 Legal Hold Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Legal Hold Workflow                          │
│                                                                  │
│  HOLD_REQUEST ──► VALIDATE_AUTHORITY ──► AUTHORIZED             │
│       │                  │                    │                  │
│       │                  │                    ▼                  │
│       │                  │           DEFINE_SCOPE                │
│       │                  │                    │                  │
│       │                  │             ┌──────┴──────┐          │
│       │                  │             ▼             ▼          │
│       │                  │      TENANT_SPECIFIC   ALL_TENANTS   │
│       │                  │             │             │          │
│       │                  │             └──────┬──────┘          │
│       │                  │                    ▼                  │
│       │                  │           IDENTIFY_DATA               │
│       │                  │                    │                  │
│       │                  │                    ▼                  │
│       │                  │           APPLY_HOLD_FLAG             │
│       │                  │                    │                  │
│       │                  │                    ▼                  │
│       │                  │           SUSPEND_DELETION            │
│       │                  │                    │                  │
│       │                  │                    ▼                  │
│       │                  │           NOTIFY_STAKEHOLDERS         │
│       │                  │                    │                  │
│       │                  │                    ▼                  │
│       │                  │           DOCUMENT_HOLD               │
│       │                  │                    │                  │
│       │                  │                    ▼                  │
│       │                  │           MONITOR_COMPLIANCE          │
│       │                  │                                       │
│       │                  └──► UNAUTHORIZED ──► REJECT_REQUEST   │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Legal Hold Data Schema

```yaml
legal_hold:
  hold_id: uuid                       # Unique hold identifier
  hold_type: enum                     # litigation, regulatory, internal
  matter_name: string                 # Legal matter name
  matter_number: string               # External case number
  status: enum                        # active, released, expired
  scope:
    tenant_ids: array                 # Affected tenants (null = all)
    data_types: array                 # Affected data types
    date_range:
      start: iso8601                  # Data from date
      end: iso8601                    # Data to date
    keywords: array                   # Search keywords
  custodians:
    - name: string                    # Custodian name
      role: string                    # Custodian role
      notified_at: iso8601            # Notification date
  authority:
    requestor: string                 # Who requested
    authorized_by: string             # Who authorized
    legal_counsel: string             # Legal contact
  timeline:
    requested_at: iso8601
    effective_at: iso8601
    review_date: iso8601
    released_at: iso8601
  notifications:
    - recipient: string
      sent_at: iso8601
      acknowledged_at: iso8601
```

### 4.4 Legal Hold Responsibilities

| Role | Responsibilities | Authority Level |
|------|------------------|-----------------|
| Legal Counsel | {{legal_resp}} | {{legal_auth}} |
| Compliance Officer | {{compliance_resp}} | {{compliance_auth}} |
| IT Administrator | {{it_resp}} | {{it_auth}} |
| Data Custodian | {{custodian_resp}} | {{custodian_auth}} |
| Hold Administrator | {{hold_admin_resp}} | {{hold_admin_auth}} |

### 4.5 Hold Release Process

| Step | Action | Owner | Documentation |
|------|--------|-------|---------------|
| 1 | {{release_step_1}} | {{release_owner_1}} | {{release_doc_1}} |
| 2 | {{release_step_2}} | {{release_owner_2}} | {{release_doc_2}} |
| 3 | {{release_step_3}} | {{release_owner_3}} | {{release_doc_3}} |
| 4 | {{release_step_4}} | {{release_owner_4}} | {{release_doc_4}} |
| 5 | {{release_step_5}} | {{release_owner_5}} | {{release_doc_5}} |

---

## Tenant-Specific Policies

### 5.1 Default Retention by Tier

| Data Type | Free Tier | Pro Tier | Enterprise Tier |
|-----------|-----------|----------|-----------------|
| {{tenant_data_1}} | {{free_ret_1}} | {{pro_ret_1}} | {{enterprise_ret_1}} |
| {{tenant_data_2}} | {{free_ret_2}} | {{pro_ret_2}} | {{enterprise_ret_2}} |
| {{tenant_data_3}} | {{free_ret_3}} | {{pro_ret_3}} | {{enterprise_ret_3}} |
| {{tenant_data_4}} | {{free_ret_4}} | {{pro_ret_4}} | {{enterprise_ret_4}} |

### 5.2 Tenant Override Capabilities

| Capability | Free | Pro | Enterprise | Notes |
|------------|------|-----|------------|-------|
| Extend Retention | {{free_extend}} | {{pro_extend}} | {{enterprise_extend}} | {{extend_notes}} |
| Reduce Retention | {{free_reduce}} | {{pro_reduce}} | {{enterprise_reduce}} | {{reduce_notes}} |
| Custom Archival | {{free_custom_arch}} | {{pro_custom_arch}} | {{enterprise_custom_arch}} | {{custom_arch_notes}} |
| Export Before Delete | {{free_export}} | {{pro_export}} | {{enterprise_export}} | {{export_notes}} |
| Deletion Certificates | {{free_cert}} | {{pro_cert}} | {{enterprise_cert}} | {{cert_notes}} |

### 5.3 Tenant Policy Configuration Schema

```yaml
tenant_retention_policy:
  tenant_id: uuid                     # Tenant identifier
  tier: enum                          # free, pro, enterprise
  custom_policies:
    - data_type: string               # Affected data type
      retention:
        active: duration              # Custom active period
        archive: duration             # Custom archive period
      approved_by: string             # Who approved
      approved_at: iso8601            # When approved
      justification: string           # Business reason
      compliance_review: boolean      # Legal reviewed
  restrictions:
    minimum_retention: duration       # Cannot go below
    maximum_retention: duration       # Cannot exceed
  notifications:
    pre_deletion_days: integer        # Days before deletion
    notify_admin: boolean             # Notify tenant admin
    notify_dpo: boolean               # Notify DPO
```

### 5.4 Tenant Data Offboarding

| Phase | Actions | Timeline | Deliverables |
|-------|---------|----------|--------------|
| Pre-Offboard | {{pre_actions}} | {{pre_timeline}} | {{pre_deliverables}} |
| Data Export | {{export_actions}} | {{export_timeline}} | {{export_deliverables}} |
| Verification | {{verify_actions}} | {{verify_timeline}} | {{verify_deliverables}} |
| Deletion | {{delete_actions}} | {{delete_timeline}} | {{delete_deliverables}} |
| Post-Offboard | {{post_actions}} | {{post_timeline}} | {{post_deliverables}} |

---

## Data Classification

### 6.1 Classification Levels

| Level | Description | Retention Impact | Deletion Method |
|-------|-------------|------------------|-----------------|
| Public | {{public_desc}} | {{public_impact}} | {{public_deletion}} |
| Internal | {{internal_desc}} | {{internal_impact}} | {{internal_deletion}} |
| Confidential | {{confidential_desc}} | {{confidential_impact}} | {{confidential_deletion}} |
| Restricted | {{restricted_desc}} | {{restricted_impact}} | {{restricted_deletion}} |
| Highly Restricted | {{highly_restricted_desc}} | {{highly_restricted_impact}} | {{highly_restricted_deletion}} |

### 6.2 Data Mapping

| System | Data Type | Classification | Owner |
|--------|-----------|----------------|-------|
| {{system_1}} | {{sys_data_1}} | {{sys_class_1}} | {{sys_owner_1}} |
| {{system_2}} | {{sys_data_2}} | {{sys_class_2}} | {{sys_owner_2}} |
| {{system_3}} | {{sys_data_3}} | {{sys_class_3}} | {{sys_owner_3}} |
| {{system_4}} | {{sys_data_4}} | {{sys_class_4}} | {{sys_owner_4}} |

---

## Compliance Requirements

### 7.1 Regulatory Matrix

| Regulation | Data Types | Minimum Retention | Maximum Retention | Notes |
|------------|------------|-------------------|-------------------|-------|
| GDPR | {{gdpr_types}} | {{gdpr_min}} | {{gdpr_max}} | {{gdpr_notes}} |
| HIPAA | {{hipaa_types}} | {{hipaa_min}} | {{hipaa_max}} | {{hipaa_notes}} |
| PCI-DSS | {{pci_types}} | {{pci_min}} | {{pci_max}} | {{pci_notes}} |
| SOX | {{sox_types}} | {{sox_min}} | {{sox_max}} | {{sox_notes}} |
| CCPA | {{ccpa_types}} | {{ccpa_min}} | {{ccpa_max}} | {{ccpa_notes}} |

### 7.2 Right to Erasure (GDPR Article 17)

| Scenario | Applies | Response Time | Exceptions |
|----------|---------|---------------|------------|
| Consent Withdrawn | {{consent_applies}} | {{consent_time}} | {{consent_exceptions}} |
| No Longer Necessary | {{necessary_applies}} | {{necessary_time}} | {{necessary_exceptions}} |
| Unlawful Processing | {{unlawful_applies}} | {{unlawful_time}} | {{unlawful_exceptions}} |
| Legal Obligation | {{legal_applies}} | {{legal_time}} | {{legal_exceptions}} |

---

## Monitoring and Reporting

### 8.1 Key Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Deletion Backlog | {{del_backlog_target}} | {{del_backlog_warning}} | {{del_backlog_critical}} |
| Archive Success Rate | {{archive_target}} | {{archive_warning}} | {{archive_critical}} |
| Legal Hold Compliance | {{hold_target}} | {{hold_warning}} | {{hold_critical}} |
| Policy Violations | {{violation_target}} | {{violation_warning}} | {{violation_critical}} |

### 8.2 Reporting Schedule

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Retention Summary | {{summary_freq}} | {{summary_recipients}} | {{summary_format}} |
| Deletion Report | {{deletion_freq}} | {{deletion_recipients}} | {{deletion_format}} |
| Legal Hold Status | {{hold_freq}} | {{hold_recipients}} | {{hold_format}} |
| Compliance Audit | {{audit_freq}} | {{audit_recipients}} | {{audit_format}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "data retention best practices multi-tenant SaaS {date}"
- "GDPR data retention requirements cloud platforms {date}"
- "legal hold implementation enterprise SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Data Retention Checklist

- [ ] All data types identified with retention periods
- [ ] Archival procedures documented with verification
- [ ] Deletion schedules automated with logging
- [ ] Legal hold process established with workflow
- [ ] Tenant-specific policies documented
- [ ] Data classification applied to all types
- [ ] Compliance requirements mapped to retention
- [ ] Monitoring and reporting configured
- [ ] All placeholders replaced with actual values
- [ ] Cross-tenant data isolation verified in retention

### Compliance Checklist

- [ ] GDPR retention requirements met
- [ ] Right to erasure process documented
- [ ] Legal hold overrides normal deletion
- [ ] Deletion certificates generated
- [ ] Audit trail maintained for all actions

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
