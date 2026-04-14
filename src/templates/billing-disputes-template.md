---
name: billing-disputes-template
description: Template for managing billing disputes, chargebacks, and resolution workflows in multi-tenant SaaS platforms
category: billing
version: 1.0.0
type: template
---

# Billing Disputes Management: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the billing disputes management framework for {{project_name}}, establishing standardized procedures for dispute classification, investigation workflows, resolution options, chargeback defense strategies, and comprehensive audit trail requirements across all tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Billing Disputes Specification |
| Project Name | {{project_name}} |
| Version | {{version}} |
| Created | {{date}} |
| Author | {{author}} |
| Status | {{document_status}} |
| Last Reviewed | {{last_review_date}} |
| Review Frequency | {{review_frequency}} |
| Classification | {{document_classification}} |

---

## Table of Contents

1. [Dispute Classification](#dispute-classification)
2. [Investigation Workflow](#investigation-workflow)
3. [Resolution Options](#resolution-options)
4. [Chargeback Defense](#chargeback-defense)
5. [Audit Trail Requirements](#audit-trail-requirements)
6. [Tenant Tier Considerations](#tenant-tier-considerations)
7. [Escalation Procedures](#escalation-procedures)
8. [Metrics and Reporting](#metrics-and-reporting)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## Dispute Classification

### 1.1 Dispute Categories

| Category | Code | Description | SLA Target | Priority |
|----------|------|-------------|------------|----------|
| Unauthorized Transaction | {{unauthorized_code}} | Transaction not authorized by account holder | {{unauthorized_sla}} | {{unauthorized_priority}} |
| Billing Error | {{billing_error_code}} | Incorrect amount, duplicate charge, or calculation error | {{billing_error_sla}} | {{billing_error_priority}} |
| Service Not Rendered | {{snr_code}} | Service not provided as promised | {{snr_sla}} | {{snr_priority}} |
| Service Quality | {{quality_code}} | Service provided but below expected standards | {{quality_sla}} | {{quality_priority}} |
| Cancellation Issue | {{cancellation_code}} | Charges after cancellation request | {{cancellation_sla}} | {{cancellation_priority}} |
| Pricing Dispute | {{pricing_code}} | Disagreement on advertised vs charged price | {{pricing_sla}} | {{pricing_priority}} |
| Refund Not Received | {{refund_code}} | Refund promised but not processed | {{refund_sla}} | {{refund_priority}} |

### 1.2 Dispute Severity Levels

| Severity | Criteria | Response Time | Resolution Target |
|----------|----------|---------------|-------------------|
| Critical | {{critical_criteria}} | {{critical_response}} | {{critical_resolution}} |
| High | {{high_criteria}} | {{high_response}} | {{high_resolution}} |
| Medium | {{medium_criteria}} | {{medium_response}} | {{medium_resolution}} |
| Low | {{low_criteria}} | {{low_response}} | {{low_resolution}} |

### 1.3 Dispute Source Tracking

| Source | Identifier | Auto-Classification | Escalation Path |
|--------|------------|---------------------|-----------------|
| Customer Portal | {{portal_id}} | {{portal_auto_class}} | {{portal_escalation}} |
| Email | {{email_id}} | {{email_auto_class}} | {{email_escalation}} |
| Phone | {{phone_id}} | {{phone_auto_class}} | {{phone_escalation}} |
| Chargeback | {{chargeback_id}} | {{chargeback_auto_class}} | {{chargeback_escalation}} |
| Payment Gateway | {{gateway_id}} | {{gateway_auto_class}} | {{gateway_escalation}} |

---

## Investigation Workflow

### 2.1 Investigation Stages

```
┌─────────────────────────────────────────────────────────────────┐
│                  Dispute Investigation Workflow                   │
│                                                                   │
│  RECEIVED ──► CLASSIFIED ──► ASSIGNED ──► INVESTIGATING         │
│      │            │              │              │                 │
│      │            │              │              ▼                 │
│      │            │              │       EVIDENCE GATHERING      │
│      │            │              │              │                 │
│      │            │              │              ▼                 │
│      │            │              │       ANALYSIS COMPLETE       │
│      │            │              │              │                 │
│      │            │              │       ┌──────┴──────┐         │
│      │            │              │       ▼             ▼         │
│      │            │              │   RESOLVED     ESCALATED      │
│      │            │              │       │             │         │
│      │            │              │       ▼             ▼         │
│      │            │              │   CLOSED      MANAGEMENT      │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Investigation Steps

| Step | Action | Owner | Time Limit | Output |
|------|--------|-------|------------|--------|
| 1 | Initial Receipt | {{step1_owner}} | {{step1_time}} | {{step1_output}} |
| 2 | Dispute Classification | {{step2_owner}} | {{step2_time}} | {{step2_output}} |
| 3 | Agent Assignment | {{step3_owner}} | {{step3_time}} | {{step3_output}} |
| 4 | Evidence Collection | {{step4_owner}} | {{step4_time}} | {{step4_output}} |
| 5 | Transaction Analysis | {{step5_owner}} | {{step5_time}} | {{step5_output}} |
| 6 | Root Cause Determination | {{step6_owner}} | {{step6_time}} | {{step6_output}} |
| 7 | Resolution Recommendation | {{step7_owner}} | {{step7_time}} | {{step7_output}} |
| 8 | Customer Communication | {{step8_owner}} | {{step8_time}} | {{step8_output}} |

### 2.3 Evidence Collection Requirements

| Evidence Type | Required For | Collection Method | Retention Period |
|---------------|--------------|-------------------|------------------|
| Transaction Logs | All disputes | {{transaction_logs_method}} | {{transaction_logs_retention}} |
| Usage Records | Service disputes | {{usage_records_method}} | {{usage_records_retention}} |
| Communication History | All disputes | {{communication_method}} | {{communication_retention}} |
| Contract Terms | Pricing disputes | {{contract_method}} | {{contract_retention}} |
| IP/Device Fingerprint | Unauthorized | {{fingerprint_method}} | {{fingerprint_retention}} |
| Authentication Logs | Unauthorized | {{auth_logs_method}} | {{auth_logs_retention}} |

### 2.4 Investigation Data Schema

```yaml
dispute_investigation:
  dispute_id: uuid                    # Unique dispute identifier
  tenant_id: uuid                     # Associated tenant
  investigator_id: uuid               # Assigned investigator
  status: enum                        # Current investigation status
  classification: string              # Dispute category
  severity: enum                      # Severity level
  evidence_collected:
    - type: string                    # Evidence type
      collected_at: iso8601           # Collection timestamp
      location: string                # Evidence storage location
      verified: boolean               # Verification status
  findings:
    root_cause: string                # Identified root cause
    supporting_evidence: array        # Evidence IDs supporting finding
    recommendation: string            # Recommended resolution
  timeline:
    received_at: iso8601
    classified_at: iso8601
    assigned_at: iso8601
    resolved_at: iso8601
```

---

## Resolution Options

### 3.1 Resolution Types

| Resolution | Code | Description | Financial Impact | Approval Required |
|------------|------|-------------|------------------|-------------------|
| Full Refund | {{full_refund_code}} | Complete transaction reversal | {{full_refund_impact}} | {{full_refund_approval}} |
| Partial Refund | {{partial_refund_code}} | Percentage or fixed amount refund | {{partial_refund_impact}} | {{partial_refund_approval}} |
| Credit Applied | {{credit_code}} | Account credit for future use | {{credit_impact}} | {{credit_approval}} |
| No Action | {{no_action_code}} | Dispute unfounded, no action taken | {{no_action_impact}} | {{no_action_approval}} |
| Goodwill Adjustment | {{goodwill_code}} | Customer satisfaction adjustment | {{goodwill_impact}} | {{goodwill_approval}} |
| Service Restoration | {{restore_code}} | Service access restored | {{restore_impact}} | {{restore_approval}} |

### 3.2 Resolution Authority Matrix

| Amount Range | Resolution Types | Approver | Auto-Approval |
|--------------|------------------|----------|---------------|
| {{range_1}} | {{types_1}} | {{approver_1}} | {{auto_1}} |
| {{range_2}} | {{types_2}} | {{approver_2}} | {{auto_2}} |
| {{range_3}} | {{types_3}} | {{approver_3}} | {{auto_3}} |
| {{range_4}} | {{types_4}} | {{approver_4}} | {{auto_4}} |

### 3.3 Resolution Communication Templates

| Scenario | Template ID | Delivery Channel | Follow-up Required |
|----------|-------------|------------------|-------------------|
| Full Refund Granted | {{template_full_refund}} | {{channel_full_refund}} | {{followup_full_refund}} |
| Partial Refund Granted | {{template_partial}} | {{channel_partial}} | {{followup_partial}} |
| Credit Applied | {{template_credit}} | {{channel_credit}} | {{followup_credit}} |
| Dispute Denied | {{template_denied}} | {{channel_denied}} | {{followup_denied}} |
| Additional Info Needed | {{template_info}} | {{channel_info}} | {{followup_info}} |

---

## Chargeback Defense

### 4.1 Chargeback Reason Codes

| Network | Code | Description | Evidence Required | Win Rate |
|---------|------|-------------|-------------------|----------|
| Visa | {{visa_code_1}} | {{visa_desc_1}} | {{visa_evidence_1}} | {{visa_rate_1}} |
| Visa | {{visa_code_2}} | {{visa_desc_2}} | {{visa_evidence_2}} | {{visa_rate_2}} |
| Mastercard | {{mc_code_1}} | {{mc_desc_1}} | {{mc_evidence_1}} | {{mc_rate_1}} |
| Mastercard | {{mc_code_2}} | {{mc_desc_2}} | {{mc_evidence_2}} | {{mc_rate_2}} |
| AMEX | {{amex_code_1}} | {{amex_desc_1}} | {{amex_evidence_1}} | {{amex_rate_1}} |

### 4.2 Defense Documentation Package

| Document | Purpose | Required For | Auto-Generated |
|----------|---------|--------------|----------------|
| Transaction Receipt | {{receipt_purpose}} | All chargebacks | {{receipt_auto}} |
| Usage/Service Logs | {{usage_purpose}} | Service disputes | {{usage_auto}} |
| Terms Agreement | {{terms_purpose}} | All chargebacks | {{terms_auto}} |
| Communication History | {{comm_purpose}} | Customer claims | {{comm_auto}} |
| IP/Device Data | {{device_purpose}} | Fraud claims | {{device_auto}} |
| Delivery Confirmation | {{delivery_purpose}} | Non-receipt claims | {{delivery_auto}} |

### 4.3 Chargeback Response Timeline

| Stage | Deadline | Actions | Owner |
|-------|----------|---------|-------|
| Notification Receipt | Day 0 | {{day0_actions}} | {{day0_owner}} |
| Initial Review | {{day_review}} | {{review_actions}} | {{review_owner}} |
| Evidence Assembly | {{day_evidence}} | {{evidence_actions}} | {{evidence_owner}} |
| Response Submission | {{day_submit}} | {{submit_actions}} | {{submit_owner}} |
| Arbitration (if needed) | {{day_arbitration}} | {{arbitration_actions}} | {{arbitration_owner}} |

### 4.4 Pre-Arbitration Handling

| Decision Point | Accept Criteria | Fight Criteria | Cost Threshold |
|----------------|-----------------|----------------|----------------|
| Low Value | {{low_accept}} | {{low_fight}} | {{low_threshold}} |
| Medium Value | {{medium_accept}} | {{medium_fight}} | {{medium_threshold}} |
| High Value | {{high_accept}} | {{high_fight}} | {{high_threshold}} |
| Repeat Offender | {{repeat_accept}} | {{repeat_fight}} | {{repeat_threshold}} |

---

## Audit Trail Requirements

### 5.1 Audit Event Types

| Event Type | Trigger | Data Captured | Retention |
|------------|---------|---------------|-----------|
| Dispute Created | {{dispute_created_trigger}} | {{dispute_created_data}} | {{dispute_created_retention}} |
| Classification Changed | {{class_changed_trigger}} | {{class_changed_data}} | {{class_changed_retention}} |
| Investigator Assigned | {{assigned_trigger}} | {{assigned_data}} | {{assigned_retention}} |
| Evidence Added | {{evidence_trigger}} | {{evidence_data}} | {{evidence_retention}} |
| Status Changed | {{status_trigger}} | {{status_data}} | {{status_retention}} |
| Resolution Applied | {{resolution_trigger}} | {{resolution_data}} | {{resolution_retention}} |
| Communication Sent | {{comm_trigger}} | {{comm_data}} | {{comm_retention}} |
| Escalation Occurred | {{escalation_trigger}} | {{escalation_data}} | {{escalation_retention}} |

### 5.2 Audit Log Schema

```yaml
dispute_audit_log:
  audit_id: uuid                      # Unique audit entry ID
  dispute_id: uuid                    # Related dispute
  tenant_id: uuid                     # Tenant context
  event_type: enum                    # Type of audit event
  timestamp: iso8601                  # When event occurred
  actor_id: uuid                      # Who performed action
  actor_type: enum                    # User, system, or integration
  previous_state: object              # State before change
  new_state: object                   # State after change
  ip_address: string                  # Actor IP address
  user_agent: string                  # Actor user agent
  metadata:
    request_id: uuid                  # Originating request
    session_id: uuid                  # Actor session
    {{custom_audit_field}}: {{custom_audit_type}}
```

### 5.3 Compliance Audit Requirements

| Requirement | Standard | Implementation | Evidence Location |
|-------------|----------|----------------|-------------------|
| Immutable Logs | {{immutable_standard}} | {{immutable_impl}} | {{immutable_location}} |
| Access Logging | {{access_standard}} | {{access_impl}} | {{access_location}} |
| Timestamp Integrity | {{timestamp_standard}} | {{timestamp_impl}} | {{timestamp_location}} |
| Chain of Custody | {{custody_standard}} | {{custody_impl}} | {{custody_location}} |
| Retention Compliance | {{retention_standard}} | {{retention_impl}} | {{retention_location}} |

---

## Tenant Tier Considerations

### 6.1 Tier-Specific SLAs

| Tier | Response Time | Resolution Target | Dedicated Support | Priority Queue |
|------|---------------|-------------------|-------------------|----------------|
| Free | {{free_response}} | {{free_resolution}} | {{free_dedicated}} | {{free_priority}} |
| Pro | {{pro_response}} | {{pro_resolution}} | {{pro_dedicated}} | {{pro_priority}} |
| Enterprise | {{enterprise_response}} | {{enterprise_resolution}} | {{enterprise_dedicated}} | {{enterprise_priority}} |

### 6.2 Tier-Specific Resolution Limits

| Tier | Auto-Refund Limit | Goodwill Budget | Credit Limit | Escalation Access |
|------|-------------------|-----------------|--------------|-------------------|
| Free | {{free_auto_limit}} | {{free_goodwill}} | {{free_credit}} | {{free_escalation}} |
| Pro | {{pro_auto_limit}} | {{pro_goodwill}} | {{pro_credit}} | {{pro_escalation}} |
| Enterprise | {{enterprise_auto_limit}} | {{enterprise_goodwill}} | {{enterprise_credit}} | {{enterprise_escalation}} |

---

## Escalation Procedures

### 7.1 Escalation Triggers

| Trigger | Condition | Escalation Level | Auto-Escalate |
|---------|-----------|------------------|---------------|
| SLA Breach | {{sla_condition}} | {{sla_level}} | {{sla_auto}} |
| High Value | {{value_condition}} | {{value_level}} | {{value_auto}} |
| Repeat Dispute | {{repeat_condition}} | {{repeat_level}} | {{repeat_auto}} |
| Legal Threat | {{legal_condition}} | {{legal_level}} | {{legal_auto}} |
| Regulatory | {{regulatory_condition}} | {{regulatory_level}} | {{regulatory_auto}} |

### 7.2 Escalation Contacts

| Level | Role | Contact Method | Response Expectation |
|-------|------|----------------|---------------------|
| Level 1 | {{l1_role}} | {{l1_contact}} | {{l1_response}} |
| Level 2 | {{l2_role}} | {{l2_contact}} | {{l2_response}} |
| Level 3 | {{l3_role}} | {{l3_contact}} | {{l3_response}} |
| Executive | {{exec_role}} | {{exec_contact}} | {{exec_response}} |

---

## Metrics and Reporting

### 8.1 Key Performance Indicators

| Metric | Target | Warning Threshold | Critical Threshold |
|--------|--------|-------------------|-------------------|
| First Response Time | {{frt_target}} | {{frt_warning}} | {{frt_critical}} |
| Resolution Time | {{resolution_target}} | {{resolution_warning}} | {{resolution_critical}} |
| Customer Satisfaction | {{csat_target}} | {{csat_warning}} | {{csat_critical}} |
| Chargeback Win Rate | {{win_target}} | {{win_warning}} | {{win_critical}} |
| Dispute Rate | {{dispute_rate_target}} | {{dispute_rate_warning}} | {{dispute_rate_critical}} |
| Escalation Rate | {{escalation_target}} | {{escalation_warning}} | {{escalation_critical}} |

### 8.2 Reporting Schedule

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Daily Dispute Summary | {{daily_freq}} | {{daily_recipients}} | {{daily_format}} |
| Weekly Trends | {{weekly_freq}} | {{weekly_recipients}} | {{weekly_format}} |
| Monthly Analysis | {{monthly_freq}} | {{monthly_recipients}} | {{monthly_format}} |
| Quarterly Review | {{quarterly_freq}} | {{quarterly_recipients}} | {{quarterly_format}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS billing dispute management best practices {date}"
- "chargeback defense strategies subscription services {date}"
- "multi-tenant billing dispute isolation patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Dispute Management Checklist

- [ ] All dispute categories defined with clear criteria
- [ ] Investigation workflow documented with SLAs
- [ ] Resolution authority matrix established
- [ ] Chargeback defense procedures documented
- [ ] Audit trail requirements meet compliance standards
- [ ] Tenant tier considerations documented
- [ ] Escalation procedures defined
- [ ] KPIs and reporting schedule established
- [ ] All placeholders replaced with actual values
- [ ] Cross-tenant data isolation verified in dispute handling

### Compliance Checklist

- [ ] PCI-DSS requirements addressed for payment data
- [ ] Audit log retention meets regulatory requirements
- [ ] Customer communication templates approved
- [ ] Chargeback response timelines align with network rules

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
