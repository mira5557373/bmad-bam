---
name: compliance-verification-template
description: Template for compliance verification including check results, control validation, evidence collection, gap analysis, and remediation tracking in multi-tenant SaaS platforms
category: compliance
version: 1.0.0
type: template
---

# Compliance Verification Report: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document provides a comprehensive compliance verification framework for {{project_name}}, establishing standardized procedures for compliance check results, control validation, evidence collection, gap analysis, and remediation tracking across all applicable regulatory frameworks and tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Compliance Verification Report |
| Project Name | {{project_name}} |
| Version | {{version}} |
| Created | {{date}} |
| Author | {{author}} |
| Status | {{document_status}} |
| Assessment Period | {{assessment_period}} |
| Next Assessment | {{next_assessment}} |
| Compliance Officer | {{compliance_officer}} |
| Classification | {{document_classification}} |

---

## Table of Contents

1. [Compliance Check Results](#compliance-check-results)
2. [Control Validation](#control-validation)
3. [Evidence Collection](#evidence-collection)
4. [Gap Analysis](#gap-analysis)
5. [Remediation Tracking](#remediation-tracking)
6. [Tenant Compliance Considerations](#tenant-compliance-considerations)
7. [Continuous Compliance Monitoring](#continuous-compliance-monitoring)
8. [Certification Status](#certification-status)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## Compliance Check Results

### 1.1 Framework Coverage Summary

| Framework | Scope | Status | Last Assessed | Next Assessment |
|-----------|-------|--------|---------------|-----------------|
| SOC 2 Type II | {{soc2_scope}} | {{soc2_status}} | {{soc2_last}} | {{soc2_next}} |
| GDPR | {{gdpr_scope}} | {{gdpr_status}} | {{gdpr_last}} | {{gdpr_next}} |
| HIPAA | {{hipaa_scope}} | {{hipaa_status}} | {{hipaa_last}} | {{hipaa_next}} |
| PCI-DSS | {{pci_scope}} | {{pci_status}} | {{pci_last}} | {{pci_next}} |
| ISO 27001 | {{iso_scope}} | {{iso_status}} | {{iso_last}} | {{iso_next}} |
| CCPA | {{ccpa_scope}} | {{ccpa_status}} | {{ccpa_last}} | {{ccpa_next}} |

### 1.2 Overall Compliance Score

```
┌─────────────────────────────────────────────────────────────────┐
│                   Compliance Score Summary                       │
│                                                                  │
│  Framework        │  Controls │ Compliant │ Partial │   Gap     │
│  ─────────────────┼───────────┼───────────┼─────────┼──────────│
│  SOC 2 Type II    │    {{soc2_total}}    │    {{soc2_compliant}}    │   {{soc2_partial}}   │    {{soc2_gap}}     │
│  GDPR             │    {{gdpr_total}}    │    {{gdpr_compliant}}    │   {{gdpr_partial}}   │    {{gdpr_gap}}     │
│  HIPAA            │    {{hipaa_total}}    │    {{hipaa_compliant}}    │   {{hipaa_partial}}   │    {{hipaa_gap}}     │
│  PCI-DSS          │    {{pci_total}}    │    {{pci_compliant}}    │   {{pci_partial}}   │    {{pci_gap}}     │
│  ISO 27001        │    {{iso_total}}    │    {{iso_compliant}}    │   {{iso_partial}}   │    {{iso_gap}}     │
│  ─────────────────┼───────────┼───────────┼─────────┼──────────│
│  TOTAL            │    {{total_controls}}    │    {{total_compliant}}    │   {{total_partial}}   │    {{total_gap}}     │
│                                                                  │
│  Overall Score: {{overall_score}}%                              │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Check Result Categories

| Category | Definition | Count | Percentage |
|----------|------------|-------|------------|
| Compliant | {{compliant_def}} | {{compliant_count}} | {{compliant_pct}} |
| Partially Compliant | {{partial_def}} | {{partial_count}} | {{partial_pct}} |
| Non-Compliant | {{noncompliant_def}} | {{noncompliant_count}} | {{noncompliant_pct}} |
| Not Applicable | {{na_def}} | {{na_count}} | {{na_pct}} |
| Not Assessed | {{not_assessed_def}} | {{not_assessed_count}} | {{not_assessed_pct}} |

### 1.4 Check Result Schema

```yaml
compliance_check_result:
  check_id: uuid                      # Unique check identifier
  framework: string                   # Compliance framework
  control_id: string                  # Control reference
  control_name: string                # Control name
  tenant_id: uuid                     # Tenant if tenant-specific
  status: enum                        # compliant, partial, non_compliant, na
  severity: enum                      # critical, high, medium, low
  assessed_at: iso8601                # Assessment timestamp
  assessor: string                    # Who performed check
  evidence_ids: array                 # Related evidence
  findings:
    observation: string               # What was observed
    expected: string                  # What was expected
    gap_description: string           # Gap if any
  remediation:
    required: boolean                 # Remediation needed
    plan_id: uuid                     # Remediation plan
    due_date: iso8601                 # Target date
  metadata:
    automated: boolean                # Automated vs manual check
    tool_used: string                 # Assessment tool
    {{custom_check_field}}: {{custom_check_type}}
```

---

## Control Validation

### 2.1 Control Categories

| Category | Description | Total Controls | Validated | Pending |
|----------|-------------|----------------|-----------|---------|
| Access Control | {{access_desc}} | {{access_total}} | {{access_validated}} | {{access_pending}} |
| Data Protection | {{data_desc}} | {{data_total}} | {{data_validated}} | {{data_pending}} |
| Network Security | {{network_desc}} | {{network_total}} | {{network_validated}} | {{network_pending}} |
| Incident Response | {{incident_desc}} | {{incident_total}} | {{incident_validated}} | {{incident_pending}} |
| Change Management | {{change_desc}} | {{change_total}} | {{change_validated}} | {{change_pending}} |
| Business Continuity | {{bc_desc}} | {{bc_total}} | {{bc_validated}} | {{bc_pending}} |
| Vendor Management | {{vendor_desc}} | {{vendor_total}} | {{vendor_validated}} | {{vendor_pending}} |

### 2.2 Control Validation Matrix

| Control ID | Control Name | Framework | Validation Method | Status | Evidence |
|------------|--------------|-----------|-------------------|--------|----------|
| {{control_1_id}} | {{control_1_name}} | {{control_1_framework}} | {{control_1_method}} | {{control_1_status}} | {{control_1_evidence}} |
| {{control_2_id}} | {{control_2_name}} | {{control_2_framework}} | {{control_2_method}} | {{control_2_status}} | {{control_2_evidence}} |
| {{control_3_id}} | {{control_3_name}} | {{control_3_framework}} | {{control_3_method}} | {{control_3_status}} | {{control_3_evidence}} |
| {{control_4_id}} | {{control_4_name}} | {{control_4_framework}} | {{control_4_method}} | {{control_4_status}} | {{control_4_evidence}} |
| {{control_5_id}} | {{control_5_name}} | {{control_5_framework}} | {{control_5_method}} | {{control_5_status}} | {{control_5_evidence}} |

### 2.3 Validation Methods

| Method | Description | Frequency | Automation Level |
|--------|-------------|-----------|------------------|
| Automated Scan | {{auto_scan_desc}} | {{auto_scan_freq}} | {{auto_scan_level}} |
| Manual Review | {{manual_desc}} | {{manual_freq}} | {{manual_level}} |
| Penetration Test | {{pentest_desc}} | {{pentest_freq}} | {{pentest_level}} |
| Configuration Audit | {{config_desc}} | {{config_freq}} | {{config_level}} |
| Log Analysis | {{log_desc}} | {{log_freq}} | {{log_level}} |
| Interview | {{interview_desc}} | {{interview_freq}} | {{interview_level}} |

### 2.4 Control Validation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Control Validation Flow                        │
│                                                                  │
│  IDENTIFY_CONTROL ──► SELECT_METHOD ──► GATHER_EVIDENCE         │
│        │                    │                  │                 │
│        │                    │                  ▼                 │
│        │                    │           EXECUTE_TEST             │
│        │                    │                  │                 │
│        │                    │           ┌──────┴──────┐         │
│        │                    │           ▼             ▼         │
│        │                    │       AUTOMATED     MANUAL         │
│        │                    │           │             │         │
│        │                    │           └──────┬──────┘         │
│        │                    │                  ▼                 │
│        │                    │           ANALYZE_RESULTS          │
│        │                    │                  │                 │
│        │                    │           ┌──────┴──────┐         │
│        │                    │           ▼             ▼         │
│        │                    │         PASS          FAIL        │
│        │                    │           │             │         │
│        │                    │           ▼             ▼         │
│        │                    │      DOCUMENT     CREATE_GAP      │
│        │                    │           │             │         │
│        │                    │           └──────┬──────┘         │
│        │                    │                  ▼                 │
│        │                    │           UPDATE_STATUS            │
└─────────────────────────────────────────────────────────────────┘
```

### 2.5 Control Effectiveness Rating

| Rating | Definition | Score Range | Action Required |
|--------|------------|-------------|-----------------|
| Effective | {{effective_def}} | {{effective_range}} | {{effective_action}} |
| Partially Effective | {{partial_eff_def}} | {{partial_eff_range}} | {{partial_eff_action}} |
| Ineffective | {{ineffective_def}} | {{ineffective_range}} | {{ineffective_action}} |
| Not Tested | {{not_tested_def}} | N/A | {{not_tested_action}} |

---

## Evidence Collection

### 3.1 Evidence Categories

| Category | Description | Retention Period | Storage Location |
|----------|-------------|------------------|------------------|
| Technical Evidence | {{tech_evidence_desc}} | {{tech_retention}} | {{tech_location}} |
| Administrative Evidence | {{admin_evidence_desc}} | {{admin_retention}} | {{admin_location}} |
| Physical Evidence | {{physical_evidence_desc}} | {{physical_retention}} | {{physical_location}} |
| Audit Trails | {{audit_evidence_desc}} | {{audit_retention}} | {{audit_location}} |
| Certifications | {{cert_evidence_desc}} | {{cert_retention}} | {{cert_location}} |
| Policies | {{policy_evidence_desc}} | {{policy_retention}} | {{policy_location}} |

### 3.2 Evidence Collection Matrix

| Control | Evidence Required | Collection Method | Collector | Frequency |
|---------|-------------------|-------------------|-----------|-----------|
| {{control_1}} | {{evidence_1_required}} | {{evidence_1_method}} | {{evidence_1_collector}} | {{evidence_1_freq}} |
| {{control_2}} | {{evidence_2_required}} | {{evidence_2_method}} | {{evidence_2_collector}} | {{evidence_2_freq}} |
| {{control_3}} | {{evidence_3_required}} | {{evidence_3_method}} | {{evidence_3_collector}} | {{evidence_3_freq}} |
| {{control_4}} | {{evidence_4_required}} | {{evidence_4_method}} | {{evidence_4_collector}} | {{evidence_4_freq}} |

### 3.3 Evidence Schema

```yaml
compliance_evidence:
  evidence_id: uuid                   # Unique evidence identifier
  type: enum                          # technical, administrative, physical
  category: string                    # Evidence category
  name: string                        # Evidence name
  description: string                 # Evidence description
  control_ids: array                  # Related controls
  collection:
    method: string                    # How collected
    collector: string                 # Who collected
    collected_at: iso8601             # When collected
    tool: string                      # Tool used
  storage:
    location: string                  # Storage path
    format: string                    # File format
    hash: string                      # Integrity hash
    encrypted: boolean                # Encryption status
  validity:
    valid_from: iso8601               # Evidence valid from
    valid_until: iso8601              # Evidence expires
    review_required: boolean          # Needs periodic review
  metadata:
    tenant_specific: boolean          # Tenant-specific evidence
    tenant_id: uuid                   # Tenant if applicable
    {{custom_evidence_field}}: {{custom_evidence_type}}
```

### 3.4 Evidence Chain of Custody

| Action | Actor | Timestamp | Verification |
|--------|-------|-----------|--------------|
| Collection | {{collect_actor}} | {{collect_time}} | {{collect_verify}} |
| Review | {{review_actor}} | {{review_time}} | {{review_verify}} |
| Approval | {{approve_actor}} | {{approve_time}} | {{approve_verify}} |
| Storage | {{storage_actor}} | {{storage_time}} | {{storage_verify}} |
| Access | {{access_actor}} | {{access_time}} | {{access_verify}} |

---

## Gap Analysis

### 4.1 Gap Summary

| Gap ID | Control | Framework | Severity | Status | Owner |
|--------|---------|-----------|----------|--------|-------|
| {{gap_1_id}} | {{gap_1_control}} | {{gap_1_framework}} | {{gap_1_severity}} | {{gap_1_status}} | {{gap_1_owner}} |
| {{gap_2_id}} | {{gap_2_control}} | {{gap_2_framework}} | {{gap_2_severity}} | {{gap_2_status}} | {{gap_2_owner}} |
| {{gap_3_id}} | {{gap_3_control}} | {{gap_3_framework}} | {{gap_3_severity}} | {{gap_3_status}} | {{gap_3_owner}} |
| {{gap_4_id}} | {{gap_4_control}} | {{gap_4_framework}} | {{gap_4_severity}} | {{gap_4_status}} | {{gap_4_owner}} |
| {{gap_5_id}} | {{gap_5_control}} | {{gap_5_framework}} | {{gap_5_severity}} | {{gap_5_status}} | {{gap_5_owner}} |

### 4.2 Gap Severity Distribution

| Severity | Count | Percentage | Remediation SLA |
|----------|-------|------------|-----------------|
| Critical | {{critical_count}} | {{critical_pct}} | {{critical_sla}} |
| High | {{high_count}} | {{high_pct}} | {{high_sla}} |
| Medium | {{medium_count}} | {{medium_pct}} | {{medium_sla}} |
| Low | {{low_count}} | {{low_pct}} | {{low_sla}} |

### 4.3 Gap Analysis Detail

| Gap ID | Description | Root Cause | Impact | Recommendation |
|--------|-------------|------------|--------|----------------|
| {{gap_1_id}} | {{gap_1_desc}} | {{gap_1_cause}} | {{gap_1_impact}} | {{gap_1_rec}} |
| {{gap_2_id}} | {{gap_2_desc}} | {{gap_2_cause}} | {{gap_2_impact}} | {{gap_2_rec}} |
| {{gap_3_id}} | {{gap_3_desc}} | {{gap_3_cause}} | {{gap_3_impact}} | {{gap_3_rec}} |

### 4.4 Gap Schema

```yaml
compliance_gap:
  gap_id: uuid                        # Unique gap identifier
  control_id: string                  # Related control
  framework: string                   # Compliance framework
  title: string                       # Gap title
  description: string                 # Gap description
  severity: enum                      # critical, high, medium, low
  status: enum                        # open, in_progress, closed, accepted
  root_cause: string                  # Why gap exists
  impact:
    compliance: string                # Compliance impact
    business: string                  # Business impact
    risk_score: number                # Calculated risk
  remediation:
    required: boolean                 # Remediation needed
    recommendation: string            # Recommended fix
    effort_estimate: string           # Estimated effort
    due_date: iso8601                 # Target date
  owner: string                       # Responsible party
  created_at: iso8601
  updated_at: iso8601
  closed_at: iso8601
```

---

## Remediation Tracking

### 5.1 Remediation Plan Overview

| Plan ID | Gap IDs | Priority | Status | Owner | Due Date |
|---------|---------|----------|--------|-------|----------|
| {{plan_1_id}} | {{plan_1_gaps}} | {{plan_1_priority}} | {{plan_1_status}} | {{plan_1_owner}} | {{plan_1_due}} |
| {{plan_2_id}} | {{plan_2_gaps}} | {{plan_2_priority}} | {{plan_2_status}} | {{plan_2_owner}} | {{plan_2_due}} |
| {{plan_3_id}} | {{plan_3_gaps}} | {{plan_3_priority}} | {{plan_3_status}} | {{plan_3_owner}} | {{plan_3_due}} |

### 5.2 Remediation Status Summary

| Status | Count | Percentage |
|--------|-------|------------|
| Not Started | {{not_started_count}} | {{not_started_pct}} |
| In Progress | {{in_progress_count}} | {{in_progress_pct}} |
| Pending Validation | {{pending_count}} | {{pending_pct}} |
| Completed | {{completed_count}} | {{completed_pct}} |
| Deferred | {{deferred_count}} | {{deferred_pct}} |

### 5.3 Remediation Tracking Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Remediation Tracking Flow                      │
│                                                                  │
│  GAP_IDENTIFIED ──► CREATE_PLAN ──► ASSIGN_OWNER                │
│        │                 │               │                       │
│        │                 │               ▼                       │
│        │                 │         IMPLEMENTATION                │
│        │                 │               │                       │
│        │                 │         ┌─────┴─────┐                │
│        │                 │         ▼           ▼                │
│        │                 │     IN_PROGRESS   BLOCKED            │
│        │                 │         │           │                │
│        │                 │         │           ▼                │
│        │                 │         │     ESCALATE               │
│        │                 │         │           │                │
│        │                 │         ▼           ▼                │
│        │                 │     COMPLETE ◄──────┘                │
│        │                 │         │                            │
│        │                 │         ▼                            │
│        │                 │     VALIDATION                       │
│        │                 │         │                            │
│        │                 │    ┌────┴────┐                       │
│        │                 │    ▼         ▼                       │
│        │                 │  PASS      FAIL                      │
│        │                 │    │         │                       │
│        │                 │    ▼         └──► REWORK             │
│        │                 │  CLOSED                              │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Remediation Plan Schema

```yaml
remediation_plan:
  plan_id: uuid                       # Unique plan identifier
  gap_ids: array                      # Related gaps
  title: string                       # Plan title
  description: string                 # Plan description
  priority: enum                      # critical, high, medium, low
  status: enum                        # not_started, in_progress, completed
  owner: string                       # Responsible party
  timeline:
    created_at: iso8601
    started_at: iso8601
    due_date: iso8601
    completed_at: iso8601
  tasks:
    - task_id: uuid
      description: string
      assignee: string
      status: enum
      due_date: iso8601
  validation:
    method: string                    # How to validate
    validator: string                 # Who validates
    validated_at: iso8601
    result: enum
  resources:
    budget: decimal
    effort_hours: number
```

---

## Tenant Compliance Considerations

### 6.1 Tenant-Specific Compliance Requirements

| Tenant Tier | GDPR | HIPAA | SOC 2 | PCI-DSS | Custom |
|-------------|------|-------|-------|---------|--------|
| Free | {{free_gdpr}} | {{free_hipaa}} | {{free_soc2}} | {{free_pci}} | {{free_custom}} |
| Pro | {{pro_gdpr}} | {{pro_hipaa}} | {{pro_soc2}} | {{pro_pci}} | {{pro_custom}} |
| Enterprise | {{enterprise_gdpr}} | {{enterprise_hipaa}} | {{enterprise_soc2}} | {{enterprise_pci}} | {{enterprise_custom}} |

### 6.2 Tenant Compliance Isolation

| Aspect | Isolation Method | Verification | Evidence |
|--------|------------------|--------------|----------|
| Data Residency | {{residency_method}} | {{residency_verify}} | {{residency_evidence}} |
| Access Controls | {{access_method}} | {{access_verify}} | {{access_evidence}} |
| Audit Logs | {{audit_method}} | {{audit_verify}} | {{audit_evidence}} |
| Encryption | {{encryption_method}} | {{encryption_verify}} | {{encryption_evidence}} |

---

## Continuous Compliance Monitoring

### 7.1 Automated Monitoring

| Control Area | Tool | Frequency | Alert Threshold |
|--------------|------|-----------|-----------------|
| {{area_1}} | {{tool_1}} | {{freq_1}} | {{threshold_1}} |
| {{area_2}} | {{tool_2}} | {{freq_2}} | {{threshold_2}} |
| {{area_3}} | {{tool_3}} | {{freq_3}} | {{threshold_3}} |
| {{area_4}} | {{tool_4}} | {{freq_4}} | {{threshold_4}} |

### 7.2 Compliance Dashboard Metrics

| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| Overall Compliance Score | {{current_score}} | {{target_score}} | {{score_trend}} |
| Open Gaps | {{current_gaps}} | {{target_gaps}} | {{gaps_trend}} |
| Overdue Remediations | {{current_overdue}} | {{target_overdue}} | {{overdue_trend}} |
| Evidence Currency | {{current_evidence}} | {{target_evidence}} | {{evidence_trend}} |

---

## Certification Status

### 8.1 Current Certifications

| Certification | Status | Issued | Expires | Certifying Body |
|---------------|--------|--------|---------|-----------------|
| {{cert_1}} | {{cert_1_status}} | {{cert_1_issued}} | {{cert_1_expires}} | {{cert_1_body}} |
| {{cert_2}} | {{cert_2_status}} | {{cert_2_issued}} | {{cert_2_expires}} | {{cert_2_body}} |
| {{cert_3}} | {{cert_3_status}} | {{cert_3_issued}} | {{cert_3_expires}} | {{cert_3_body}} |

### 8.2 Certification Roadmap

| Certification | Target Date | Prerequisites | Status |
|---------------|-------------|---------------|--------|
| {{roadmap_1}} | {{roadmap_1_date}} | {{roadmap_1_prereq}} | {{roadmap_1_status}} |
| {{roadmap_2}} | {{roadmap_2_date}} | {{roadmap_2_prereq}} | {{roadmap_2_status}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "compliance verification automation multi-tenant SaaS {date}"
- "continuous compliance monitoring best practices {date}"
- "SOC 2 evidence collection patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Compliance Verification Checklist

- [ ] All applicable frameworks identified and assessed
- [ ] Control validation methods documented
- [ ] Evidence collection procedures established
- [ ] Gap analysis complete with severity ratings
- [ ] Remediation plans created for all gaps
- [ ] Tenant-specific requirements addressed
- [ ] Continuous monitoring configured
- [ ] Certification status documented
- [ ] All placeholders replaced with actual values
- [ ] Cross-tenant compliance isolation verified

### Documentation Checklist

- [ ] Evidence chain of custody documented
- [ ] All findings have supporting evidence
- [ ] Remediation owners assigned
- [ ] Due dates established for all remediations

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
