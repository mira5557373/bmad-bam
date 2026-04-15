---
name: payment-processing-template
description: Template for payment processing configuration including gateway setup, retry policies, failure handling, webhook integration, and PCI compliance in multi-tenant SaaS platforms
category: billing
version: 1.0.0
type: template
---

# Payment Processing Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the payment processing framework for {{project_name}}, establishing standardized procedures for payment gateway configuration, retry policies, failure handling, webhook integration, and PCI compliance requirements across all tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Payment Processing Specification |
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

1. [Payment Gateway Configuration](#payment-gateway-configuration)
2. [Retry Policies](#retry-policies)
3. [Failure Handling](#failure-handling)
4. [Webhook Integration](#webhook-integration)
5. [PCI Compliance Notes](#pci-compliance-notes)
6. [Payment Methods](#payment-methods)
7. [Tenant Tier Considerations](#tenant-tier-considerations)
8. [Monitoring and Alerts](#monitoring-and-alerts)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## Payment Gateway Configuration

### 1.1 Gateway Selection

| Gateway | Primary Use | Regions | Currencies | Status |
|---------|-------------|---------|------------|--------|
| {{gateway_1}} | {{use_1}} | {{regions_1}} | {{currencies_1}} | {{status_1}} |
| {{gateway_2}} | {{use_2}} | {{regions_2}} | {{currencies_2}} | {{status_2}} |
| {{gateway_3}} | {{use_3}} | {{regions_3}} | {{currencies_3}} | {{status_3}} |

### 1.2 Gateway Credentials Configuration

| Setting | Value | Environment | Secure Storage |
|---------|-------|-------------|----------------|
| API Key | {{api_key_reference}} | {{api_key_env}} | {{api_key_storage}} |
| Secret Key | {{secret_key_reference}} | {{secret_key_env}} | {{secret_key_storage}} |
| Webhook Secret | {{webhook_secret_reference}} | {{webhook_secret_env}} | {{webhook_secret_storage}} |
| Merchant ID | {{merchant_id_reference}} | {{merchant_id_env}} | {{merchant_id_storage}} |
| Account ID | {{account_id_reference}} | {{account_id_env}} | {{account_id_storage}} |

### 1.3 Gateway Configuration Schema

```yaml
payment_gateway_config:
  gateway_id: string                  # Gateway identifier
  provider: enum                      # stripe, braintree, adyen, etc.
  mode: enum                          # live, sandbox, test
  api_version: string                 # Provider API version
  base_url: string                    # API base URL
  timeout_ms: integer                 # Request timeout
  credentials:
    api_key: secret_reference         # Reference to secret store
    secret_key: secret_reference      # Reference to secret store
    webhook_secret: secret_reference  # Reference to secret store
  features:
    supports_3ds: boolean             # 3D Secure support
    supports_ach: boolean             # ACH/Bank transfer support
    supports_apple_pay: boolean       # Apple Pay support
    supports_google_pay: boolean      # Google Pay support
  fallback_gateway: string            # Fallback gateway ID
  tenant_routing:
    enabled: boolean                  # Enable tenant-specific routing
    rules: array                      # Routing rules
```

### 1.4 Multi-Gateway Routing

| Condition | Primary Gateway | Fallback Gateway | Routing Rule |
|-----------|-----------------|------------------|--------------|
| {{condition_1}} | {{primary_1}} | {{fallback_1}} | {{rule_1}} |
| {{condition_2}} | {{primary_2}} | {{fallback_2}} | {{rule_2}} |
| {{condition_3}} | {{primary_3}} | {{fallback_3}} | {{rule_3}} |
| Default | {{default_primary}} | {{default_fallback}} | {{default_rule}} |

### 1.5 Gateway Health Monitoring

| Metric | Threshold | Action | Alert Level |
|--------|-----------|--------|-------------|
| Response Time | {{response_threshold}} | {{response_action}} | {{response_alert}} |
| Error Rate | {{error_threshold}} | {{error_action}} | {{error_alert}} |
| Availability | {{availability_threshold}} | {{availability_action}} | {{availability_alert}} |
| Decline Rate | {{decline_threshold}} | {{decline_action}} | {{decline_alert}} |

---

## Retry Policies

### 2.1 Retry Configuration

| Retry Attempt | Delay | Description | Max Attempts |
|---------------|-------|-------------|--------------|
| 1st Retry | {{retry_1_delay}} | {{retry_1_desc}} | {{retry_1_max}} |
| 2nd Retry | {{retry_2_delay}} | {{retry_2_desc}} | {{retry_2_max}} |
| 3rd Retry | {{retry_3_delay}} | {{retry_3_desc}} | {{retry_3_max}} |
| Final Retry | {{retry_final_delay}} | {{retry_final_desc}} | {{retry_final_max}} |

### 2.2 Retry Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Payment Retry Flow                           │
│                                                                  │
│  INITIAL ──► ATTEMPT ──► SUCCESS ──► COMPLETE                   │
│      │           │                                               │
│      │           ├──► SOFT_DECLINE ──► SCHEDULE_RETRY           │
│      │           │         │                                     │
│      │           │         └──► RETRY_ATTEMPT ──┐               │
│      │           │                              │               │
│      │           │              ┌───────────────┘               │
│      │           │              ▼                               │
│      │           │         MAX_RETRIES? ──► YES ──► FAILED      │
│      │           │              │                               │
│      │           │              └──► NO ──► SCHEDULE_RETRY      │
│      │           │                                               │
│      │           └──► HARD_DECLINE ──► FAILED                   │
│      │                                                           │
│      └──► ERROR ──► RETRY_ELIGIBLE? ──► YES ──► SCHEDULE_RETRY │
│                            │                                     │
│                            └──► NO ──► FAILED                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Retry-Eligible Scenarios

| Scenario | Retry Eligible | Max Attempts | Backoff Strategy |
|----------|----------------|--------------|------------------|
| Network Timeout | {{timeout_eligible}} | {{timeout_max}} | {{timeout_backoff}} |
| Gateway Unavailable | {{unavailable_eligible}} | {{unavailable_max}} | {{unavailable_backoff}} |
| Insufficient Funds | {{nsf_eligible}} | {{nsf_max}} | {{nsf_backoff}} |
| Soft Decline | {{soft_eligible}} | {{soft_max}} | {{soft_backoff}} |
| Rate Limited | {{rate_eligible}} | {{rate_max}} | {{rate_backoff}} |
| Processing Error | {{processing_eligible}} | {{processing_max}} | {{processing_backoff}} |

### 2.4 Smart Retry Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Optimal Time Window | {{optimal_window}} | Best time for retries |
| Day of Month Preference | {{dom_preference}} | Retry around payday |
| Time Zone Consideration | {{timezone_consideration}} | Customer time zone |
| Account Updater | {{account_updater}} | Auto-update expired cards |
| Network Token | {{network_token}} | Use network tokens |

### 2.5 Retry Notification Schema

```yaml
retry_notification:
  payment_id: uuid                    # Payment identifier
  tenant_id: uuid                     # Tenant context
  attempt_number: integer             # Current attempt
  max_attempts: integer               # Maximum attempts
  next_retry_at: iso8601              # Next scheduled retry
  decline_reason: string              # Why it failed
  customer_notification:
    enabled: boolean                  # Notify customer
    template: string                  # Notification template
    channels: array                   # Email, SMS, push
  internal_notification:
    enabled: boolean                  # Internal alerts
    recipients: array                 # Alert recipients
```

---

## Failure Handling

### 3.1 Decline Code Classification

| Code Category | Examples | Action | Customer Impact |
|---------------|----------|--------|-----------------|
| Soft Decline | {{soft_examples}} | {{soft_action}} | {{soft_impact}} |
| Hard Decline | {{hard_examples}} | {{hard_action}} | {{hard_impact}} |
| Fraud Decline | {{fraud_examples}} | {{fraud_action}} | {{fraud_impact}} |
| Technical Error | {{tech_examples}} | {{tech_action}} | {{tech_impact}} |
| Insufficient Funds | {{nsf_examples}} | {{nsf_action}} | {{nsf_impact}} |

### 3.2 Failure Response Matrix

| Decline Reason | Response Action | Customer Communication | Retry Strategy |
|----------------|-----------------|------------------------|----------------|
| Card Expired | {{expired_response}} | {{expired_communication}} | {{expired_retry}} |
| Invalid Card | {{invalid_response}} | {{invalid_communication}} | {{invalid_retry}} |
| Insufficient Funds | {{funds_response}} | {{funds_communication}} | {{funds_retry}} |
| Fraud Suspected | {{fraud_response}} | {{fraud_communication}} | {{fraud_retry}} |
| Bank Decline | {{bank_response}} | {{bank_communication}} | {{bank_retry}} |
| Do Not Honor | {{dnh_response}} | {{dnh_communication}} | {{dnh_retry}} |
| Lost/Stolen | {{lost_response}} | {{lost_communication}} | {{lost_retry}} |

### 3.3 Grace Period Configuration

| Tenant Tier | Grace Period | Capabilities During Grace | Notifications |
|-------------|--------------|---------------------------|---------------|
| Free | {{free_grace}} | {{free_capabilities}} | {{free_notifications}} |
| Pro | {{pro_grace}} | {{pro_capabilities}} | {{pro_notifications}} |
| Enterprise | {{enterprise_grace}} | {{enterprise_capabilities}} | {{enterprise_notifications}} |

### 3.4 Account Suspension Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Account Suspension Flow                       │
│                                                                  │
│  PAYMENT_FAILED ──► GRACE_PERIOD ──► GRACE_WARNING              │
│        │                 │               │                       │
│        │                 │               ▼                       │
│        │                 │         GRACE_FINAL_NOTICE            │
│        │                 │               │                       │
│        │                 ▼               ▼                       │
│        │           GRACE_EXPIRED ──► SUSPENSION_WARNING          │
│        │                 │               │                       │
│        │                 │               ▼                       │
│        │                 │         SUSPENDED                     │
│        │                 │               │                       │
│        │                 │               ▼                       │
│        │                 │         TERMINATION_WARNING           │
│        │                 │               │                       │
│        │                 │               ▼                       │
│        │                 │         TERMINATED                    │
│        │                 │                                       │
│        └──► PAYMENT_SUCCESS_ANYTIME ──► REACTIVATED             │
└─────────────────────────────────────────────────────────────────┘
```

### 3.5 Failure Notification Templates

| Event | Template ID | Channels | Timing |
|-------|-------------|----------|--------|
| First Failure | {{first_fail_template}} | {{first_fail_channels}} | {{first_fail_timing}} |
| Retry Scheduled | {{retry_template}} | {{retry_channels}} | {{retry_timing}} |
| Multiple Failures | {{multi_fail_template}} | {{multi_fail_channels}} | {{multi_fail_timing}} |
| Grace Period Start | {{grace_template}} | {{grace_channels}} | {{grace_timing}} |
| Final Warning | {{final_template}} | {{final_channels}} | {{final_timing}} |
| Account Suspended | {{suspended_template}} | {{suspended_channels}} | {{suspended_timing}} |

---

## Webhook Integration

### 4.1 Webhook Events

| Event | Endpoint | Action | Priority |
|-------|----------|--------|----------|
| payment.succeeded | {{succeeded_endpoint}} | {{succeeded_action}} | {{succeeded_priority}} |
| payment.failed | {{failed_endpoint}} | {{failed_action}} | {{failed_priority}} |
| payment.refunded | {{refunded_endpoint}} | {{refunded_action}} | {{refunded_priority}} |
| payment.disputed | {{disputed_endpoint}} | {{disputed_action}} | {{disputed_priority}} |
| invoice.paid | {{invoice_paid_endpoint}} | {{invoice_paid_action}} | {{invoice_paid_priority}} |
| customer.updated | {{customer_endpoint}} | {{customer_action}} | {{customer_priority}} |
| subscription.updated | {{subscription_endpoint}} | {{subscription_action}} | {{subscription_priority}} |

### 4.2 Webhook Security Configuration

| Security Measure | Implementation | Verification |
|------------------|----------------|--------------|
| Signature Verification | {{signature_impl}} | {{signature_verify}} |
| Timestamp Validation | {{timestamp_impl}} | {{timestamp_verify}} |
| IP Allowlist | {{ip_impl}} | {{ip_verify}} |
| TLS Requirement | {{tls_impl}} | {{tls_verify}} |
| Replay Protection | {{replay_impl}} | {{replay_verify}} |

### 4.3 Webhook Handler Schema

```yaml
webhook_handler:
  endpoint: "{{webhook_endpoint}}"
  timeout_ms: {{webhook_timeout}}
  
  security:
    verify_signature: true
    signature_header: "{{signature_header}}"
    signature_algorithm: "{{signature_algorithm}}"
    timestamp_tolerance_seconds: {{timestamp_tolerance}}
    allowed_ips:
      - "{{allowed_ip_1}}"
      - "{{allowed_ip_2}}"
  
  processing:
    idempotency_key_header: "{{idempotency_header}}"
    retry_policy:
      max_attempts: {{webhook_retry_max}}
      backoff_ms: {{webhook_backoff}}
    
  handlers:
    payment_succeeded:
      action: "{{payment_succeeded_handler}}"
      update_invoice: true
      update_subscription: true
      notify_customer: {{notify_on_success}}
      
    payment_failed:
      action: "{{payment_failed_handler}}"
      schedule_retry: true
      notify_customer: {{notify_on_failure}}
      update_dunning_status: true
```

### 4.4 Webhook Event Processing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Webhook Processing Flow                        │
│                                                                  │
│  RECEIVE ──► VERIFY_SIGNATURE ──► PARSE_EVENT                   │
│      │              │                  │                         │
│      │              │                  ▼                         │
│      │              │           VALIDATE_TENANT                  │
│      │              │                  │                         │
│      │              │           ┌──────┴──────┐                  │
│      │              │           ▼             ▼                  │
│      │              │      KNOWN_TENANT  UNKNOWN_TENANT          │
│      │              │           │             │                  │
│      │              │           │             └──► LOG_AND_ALERT │
│      │              │           ▼                                │
│      │              │      DEDUPLICATE                          │
│      │              │           │                                │
│      │              │      ┌────┴────┐                          │
│      │              │      ▼         ▼                          │
│      │              │   NEW_EVENT  DUPLICATE ──► ACK_200        │
│      │              │      │                                     │
│      │              │      ▼                                     │
│      │              │   PROCESS ──► UPDATE_STATE ──► ACK_200    │
│      │              │      │                                     │
│      │              │      └──► ERROR ──► QUEUE_RETRY ──► ACK_5XX│
│      │              │                                            │
│      │              └──► INVALID ──► LOG_SECURITY ──► ACK_400   │
│      │                                                           │
│      └──► TIMEOUT ──► LOG_ERROR                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Webhook Monitoring

| Metric | Warning Threshold | Critical Threshold | Alert Action |
|--------|-------------------|-------------------|--------------|
| Processing Time | {{proc_warning}} | {{proc_critical}} | {{proc_alert}} |
| Failure Rate | {{fail_warning}} | {{fail_critical}} | {{fail_alert}} |
| Queue Depth | {{queue_warning}} | {{queue_critical}} | {{queue_alert}} |
| Signature Failures | {{sig_warning}} | {{sig_critical}} | {{sig_alert}} |

---

## PCI Compliance Notes

### 5.1 PCI-DSS Scope

| Component | In Scope | Justification | Controls |
|-----------|----------|---------------|----------|
| Payment Form | {{form_scope}} | {{form_justification}} | {{form_controls}} |
| Backend API | {{api_scope}} | {{api_justification}} | {{api_controls}} |
| Database | {{db_scope}} | {{db_justification}} | {{db_controls}} |
| Logs | {{logs_scope}} | {{logs_justification}} | {{logs_controls}} |
| Webhooks | {{webhook_scope}} | {{webhook_justification}} | {{webhook_controls}} |

### 5.2 Tokenization Strategy

| Card Data Element | Tokenized | Token Format | Storage Location |
|-------------------|-----------|--------------|------------------|
| Full Card Number | {{pan_tokenized}} | {{pan_format}} | {{pan_storage}} |
| Expiry Date | {{expiry_tokenized}} | {{expiry_format}} | {{expiry_storage}} |
| CVV | {{cvv_tokenized}} | {{cvv_format}} | {{cvv_storage}} |
| Cardholder Name | {{name_tokenized}} | {{name_format}} | {{name_storage}} |

### 5.3 PCI Compliance Checklist

| Requirement | SAQ Type | Implementation | Evidence |
|-------------|----------|----------------|----------|
| No Card Data Storage | {{no_storage_saq}} | {{no_storage_impl}} | {{no_storage_evidence}} |
| Secure Transmission | {{secure_trans_saq}} | {{secure_trans_impl}} | {{secure_trans_evidence}} |
| Access Control | {{access_saq}} | {{access_impl}} | {{access_evidence}} |
| Monitoring | {{monitoring_saq}} | {{monitoring_impl}} | {{monitoring_evidence}} |
| Incident Response | {{incident_saq}} | {{incident_impl}} | {{incident_evidence}} |

### 5.4 Third-Party Compliance

| Provider | PCI Level | AOC Expiry | Integration Type |
|----------|-----------|------------|------------------|
| {{provider_1}} | {{level_1}} | {{expiry_1}} | {{integration_1}} |
| {{provider_2}} | {{level_2}} | {{expiry_2}} | {{integration_2}} |
| {{provider_3}} | {{level_3}} | {{expiry_3}} | {{integration_3}} |

---

## Payment Methods

### 6.1 Supported Payment Methods

| Method | Provider | Regions | Processing Time | Fees |
|--------|----------|---------|-----------------|------|
| Credit Card | {{cc_provider}} | {{cc_regions}} | {{cc_processing}} | {{cc_fees}} |
| Debit Card | {{debit_provider}} | {{debit_regions}} | {{debit_processing}} | {{debit_fees}} |
| ACH/Bank Transfer | {{ach_provider}} | {{ach_regions}} | {{ach_processing}} | {{ach_fees}} |
| Wire Transfer | {{wire_provider}} | {{wire_regions}} | {{wire_processing}} | {{wire_fees}} |
| Apple Pay | {{apple_provider}} | {{apple_regions}} | {{apple_processing}} | {{apple_fees}} |
| Google Pay | {{google_provider}} | {{google_regions}} | {{google_processing}} | {{google_fees}} |

### 6.2 Payment Method by Tier

| Payment Method | Free | Pro | Enterprise |
|----------------|------|-----|------------|
| Credit Card | {{free_cc}} | {{pro_cc}} | {{enterprise_cc}} |
| ACH/Bank | {{free_ach}} | {{pro_ach}} | {{enterprise_ach}} |
| Wire Transfer | {{free_wire}} | {{pro_wire}} | {{enterprise_wire}} |
| Invoice (Net Terms) | {{free_invoice}} | {{pro_invoice}} | {{enterprise_invoice}} |

---

## Tenant Tier Considerations

### 7.1 Processing Limits by Tier

| Tier | Transaction Limit | Monthly Volume | Payment Methods |
|------|-------------------|----------------|-----------------|
| Free | {{free_tx_limit}} | {{free_volume}} | {{free_methods}} |
| Pro | {{pro_tx_limit}} | {{pro_volume}} | {{pro_methods}} |
| Enterprise | {{enterprise_tx_limit}} | {{enterprise_volume}} | {{enterprise_methods}} |

### 7.2 SLA by Tier

| Tier | Processing SLA | Refund SLA | Support SLA |
|------|----------------|------------|-------------|
| Free | {{free_proc_sla}} | {{free_refund_sla}} | {{free_support_sla}} |
| Pro | {{pro_proc_sla}} | {{pro_refund_sla}} | {{pro_support_sla}} |
| Enterprise | {{enterprise_proc_sla}} | {{enterprise_refund_sla}} | {{enterprise_support_sla}} |

---

## Monitoring and Alerts

### 8.1 Key Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Success Rate | {{success_target}} | {{success_warning}} | {{success_critical}} |
| Average Processing Time | {{avg_time_target}} | {{avg_time_warning}} | {{avg_time_critical}} |
| Decline Rate | {{decline_target}} | {{decline_warning}} | {{decline_critical}} |
| Chargeback Rate | {{chargeback_target}} | {{chargeback_warning}} | {{chargeback_critical}} |
| Fraud Rate | {{fraud_target}} | {{fraud_warning}} | {{fraud_critical}} |

### 8.2 Alert Configuration

| Alert | Condition | Severity | Recipients |
|-------|-----------|----------|------------|
| High Decline Rate | {{decline_condition}} | {{decline_severity}} | {{decline_recipients}} |
| Gateway Down | {{gateway_condition}} | {{gateway_severity}} | {{gateway_recipients}} |
| Fraud Spike | {{fraud_condition}} | {{fraud_severity}} | {{fraud_recipients}} |
| Processing Delay | {{delay_condition}} | {{delay_severity}} | {{delay_recipients}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "payment gateway retry strategies SaaS billing {date}"
- "PCI-DSS compliance multi-tenant SaaS {date}"
- "payment webhook security best practices {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Payment Processing Checklist

- [ ] Payment gateway configuration complete
- [ ] Retry policies defined with backoff strategies
- [ ] Failure handling matrix documented
- [ ] Webhook integration secured and tested
- [ ] PCI compliance requirements addressed
- [ ] All payment methods configured
- [ ] Tenant tier limits defined
- [ ] Monitoring and alerts configured
- [ ] All placeholders replaced with actual values
- [ ] Cross-tenant data isolation verified

### Security Checklist

- [ ] No card data stored in application
- [ ] Webhook signatures verified
- [ ] TLS enforced for all payment communications
- [ ] API keys securely stored
- [ ] Access controls implemented

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
