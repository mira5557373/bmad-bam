---
name: billing-integration-template
description: Template for SaaS billing and payment integration in multi-tenant environments
category: billing
version: 1.0.0
type: "integration"
---

## Purpose

Template for SaaS billing and payment integration in multi-tenant environments

# Billing Integration Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Billing Overview

### 1.1 Billing Identity

| Field | Value |
|-------|-------|
| Billing Provider | {{billing_provider}} |
| Payment Processor | {{payment_processor}} |
| Currency | {{primary_currency}} |
| Billing Model | {{billing_model}} |
| Invoice Frequency | {{invoice_frequency}} |

### 1.2 Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- Billing scope: {{billing_scope}}

### 1.3 Billing Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   Billing Integration Architecture               │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Tenant    │───►│  Billing    │───►│  Payment    │         │
│  │   Actions   │    │   Service   │    │  Provider   │         │
│  └─────────────┘    └──────┬──────┘    └─────────────┘         │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         ▼                  ▼                  ▼                 │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐           │
│  │  Usage    │      │ Invoice   │      │ Webhook   │           │
│  │ Metering  │      │ Generation│      │ Handler   │           │
│  └───────────┘      └───────────┘      └───────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Provider Configuration

### 2.1 Provider Setup

| Setting | Value | Environment |
|---------|-------|-------------|
| API Key | {{api_key_location}} | {{api_key_env}} |
| Webhook Secret | {{webhook_secret_location}} | {{webhook_secret_env}} |
| API Version | {{api_version}} | All |
| Sandbox Mode | {{sandbox_enabled}} | Dev/Staging |

### 2.2 Account Mapping

| Platform Entity | Provider Entity | Mapping Strategy |
|-----------------|-----------------|------------------|
| Tenant | {{tenant_mapping}} | {{tenant_strategy}} |
| User | {{user_mapping}} | {{user_strategy}} |
| Subscription | {{subscription_mapping}} | {{subscription_strategy}} |
| Invoice | {{invoice_mapping}} | {{invoice_strategy}} |

### 2.3 Provider Metadata

| Metadata Field | Source | Purpose |
|----------------|--------|---------|
| tenant_id | Platform | Tenant identification |
| tenant_tier | Platform | Tier identification |
| {{custom_meta_1}} | {{meta_source_1}} | {{meta_purpose_1}} |
| {{custom_meta_2}} | {{meta_source_2}} | {{meta_purpose_2}} |

---

## Product and Pricing Configuration

### 3.1 Product Catalog

| Product ID | Name | Type | Description |
|------------|------|------|-------------|
| {{product_1_id}} | {{product_1_name}} | {{product_1_type}} | {{product_1_desc}} |
| {{product_2_id}} | {{product_2_name}} | {{product_2_type}} | {{product_2_desc}} |
| {{product_3_id}} | {{product_3_name}} | {{product_3_type}} | {{product_3_desc}} |

### 3.2 Pricing Structure

| Tier | Monthly Price | Annual Price | Product IDs |
|------|---------------|--------------|-------------|
| Free | {{free_monthly}} | {{free_annual}} | {{free_products}} |
| Pro | {{pro_monthly}} | {{pro_annual}} | {{pro_products}} |
| Enterprise | {{enterprise_monthly}} | {{enterprise_annual}} | {{enterprise_products}} |

### 3.3 Usage-Based Pricing

| Usage Metric | Unit | Price per Unit | Included in Tier |
|--------------|------|----------------|------------------|
| {{usage_metric_1}} | {{unit_1}} | {{price_1}} | {{included_1}} |
| {{usage_metric_2}} | {{unit_2}} | {{price_2}} | {{included_2}} |
| {{usage_metric_3}} | {{unit_3}} | {{price_3}} | {{included_3}} |

### 3.4 Add-ons and Features

| Add-on | Price | Tier Availability | Billing |
|--------|-------|-------------------|---------|
| {{addon_1}} | {{addon_1_price}} | {{addon_1_tiers}} | {{addon_1_billing}} |
| {{addon_2}} | {{addon_2_price}} | {{addon_2_tiers}} | {{addon_2_billing}} |

---

## Tenant Billing Lifecycle

### 4.1 Lifecycle States

```
┌─────────────────────────────────────────────────────────────────┐
│                  Tenant Billing Lifecycle                        │
│                                                                  │
│  TRIAL ──► ACTIVE ──► PAST_DUE ──► CANCELLED                   │
│    │          │           │                                      │
│    │          │           └───► GRACE_PERIOD ──► SUSPENDED      │
│    │          │                                                  │
│    │          └───► PAUSED ──► ACTIVE                           │
│    │                                                             │
│    └───► CONVERTED (to paid)                                    │
│                                                                  │
│  SUSPENDED ──► REACTIVATED (with payment)                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 State Transitions

| From State | To State | Trigger | Actions |
|------------|----------|---------|---------|
| Trial | Active | Subscription created | {{trial_to_active}} |
| Trial | Cancelled | Trial expired | {{trial_expired}} |
| Active | Past Due | Payment failed | {{active_to_past_due}} |
| Past Due | Active | Payment succeeded | {{past_due_to_active}} |
| Past Due | Grace Period | Grace period started | {{past_due_to_grace}} |
| Grace Period | Suspended | Grace expired | {{grace_to_suspended}} |
| Suspended | Active | Payment + reactivation | {{suspended_to_active}} |

### 4.3 Grace Period Configuration

| Tier | Grace Period | Capabilities During Grace | Notifications |
|------|--------------|---------------------------|---------------|
| Free | N/A | N/A | N/A |
| Pro | {{pro_grace}} | {{pro_grace_caps}} | {{pro_grace_notif}} |
| Enterprise | {{enterprise_grace}} | {{enterprise_grace_caps}} | {{enterprise_grace_notif}} |

---

## Subscription Management

### 5.1 Subscription Operations

| Operation | API Endpoint | Tenant Context | Idempotent |
|-----------|--------------|----------------|------------|
| Create | {{create_endpoint}} | Required | {{create_idempotent}} |
| Update | {{update_endpoint}} | Required | {{update_idempotent}} |
| Cancel | {{cancel_endpoint}} | Required | {{cancel_idempotent}} |
| Pause | {{pause_endpoint}} | Required | {{pause_idempotent}} |
| Resume | {{resume_endpoint}} | Required | {{resume_idempotent}} |

### 5.2 Subscription Data Model

| Field | Type | Provider Mapping | Notes |
|-------|------|------------------|-------|
| subscription_id | UUID | {{sub_id_mapping}} | Platform identifier |
| provider_subscription_id | string | {{provider_sub_id}} | Provider identifier |
| tenant_id | UUID | metadata.tenant_id | Tenant association |
| tier | enum | {{tier_mapping}} | Current tier |
| status | enum | {{status_mapping}} | Subscription status |
| current_period_start | timestamp | {{period_start}} | Billing period |
| current_period_end | timestamp | {{period_end}} | Billing period |
| cancel_at_period_end | boolean | {{cancel_mapping}} | Pending cancellation |

### 5.3 Proration Rules

| Scenario | Proration Type | Calculation |
|----------|----------------|-------------|
| Upgrade mid-cycle | {{upgrade_proration}} | {{upgrade_calc}} |
| Downgrade mid-cycle | {{downgrade_proration}} | {{downgrade_calc}} |
| Add-on mid-cycle | {{addon_proration}} | {{addon_calc}} |
| Cancellation | {{cancel_proration}} | {{cancel_calc}} |

---

## Usage Metering

### 6.1 Metering Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Usage Metering Flow                          │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Usage     │───►│   Meter     │───►│  Aggregator │         │
│  │   Events    │    │   Service   │    │             │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            ▼                   ▼                 │
│                     ┌─────────────────────────────────┐         │
│                     │      Usage Records Store        │         │
│                     │     (tenant_id, metric, value)  │         │
│                     └────────────────┬────────────────┘         │
│                                      │                          │
│                            ┌─────────┴─────────┐                │
│                            ▼                   ▼                │
│                     ┌───────────┐       ┌───────────┐           │
│                     │  Billing  │       │   Quota   │           │
│                     │  Report   │       │  Enforce  │           │
│                     └───────────┘       └───────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Metered Metrics

| Metric | Unit | Collection Method | Aggregation | Reporting |
|--------|------|-------------------|-------------|-----------|
| {{meter_1}} | {{meter_1_unit}} | {{meter_1_method}} | {{meter_1_agg}} | {{meter_1_report}} |
| {{meter_2}} | {{meter_2_unit}} | {{meter_2_method}} | {{meter_2_agg}} | {{meter_2_report}} |
| {{meter_3}} | {{meter_3_unit}} | {{meter_3_method}} | {{meter_3_agg}} | {{meter_3_report}} |

### 6.3 Metering Events Schema

```yaml
usage_event:
  tenant_id: uuid        # Required: tenant identifier
  metric_name: string    # Required: metric being recorded
  quantity: number       # Required: usage amount
  timestamp: iso8601     # Required: event time
  idempotency_key: string # Required: deduplication
  metadata:
    user_id: uuid        # Optional: user attribution
    resource_id: string  # Optional: resource attribution
    {{custom_field}}: {{custom_type}}
```

### 6.4 Quota Management

| Metric | Free Quota | Pro Quota | Enterprise Quota | Enforcement |
|--------|------------|-----------|------------------|-------------|
| {{quota_1}} | {{free_q_1}} | {{pro_q_1}} | {{enterprise_q_1}} | {{enforce_1}} |
| {{quota_2}} | {{free_q_2}} | {{pro_q_2}} | {{enterprise_q_2}} | {{enforce_2}} |

---

## Invoice Management

### 7.1 Invoice Generation

| Trigger | Timing | Contents |
|---------|--------|----------|
| Subscription renewal | {{renewal_timing}} | Base subscription |
| Usage threshold | {{usage_timing}} | Usage charges |
| Manual | On demand | Custom items |

### 7.2 Invoice Line Items

| Line Item Type | Description | Calculation |
|----------------|-------------|-------------|
| Subscription | {{sub_desc}} | {{sub_calc}} |
| Usage overage | {{usage_desc}} | {{usage_calc}} |
| Add-on | {{addon_desc}} | {{addon_calc}} |
| Credit | {{credit_desc}} | {{credit_calc}} |
| Tax | {{tax_desc}} | {{tax_calc}} |

### 7.3 Invoice Delivery

| Channel | Configuration | Template |
|---------|---------------|----------|
| Email | {{email_config}} | {{email_template}} |
| PDF | {{pdf_config}} | {{pdf_template}} |
| API | {{api_config}} | N/A |
| Portal | {{portal_config}} | N/A |

---

## Payment Processing

### 8.1 Payment Methods

| Method | Supported | Provider Config | Notes |
|--------|-----------|-----------------|-------|
| Credit Card | {{cc_supported}} | {{cc_config}} | {{cc_notes}} |
| ACH/Bank | {{ach_supported}} | {{ach_config}} | {{ach_notes}} |
| Wire Transfer | {{wire_supported}} | {{wire_config}} | {{wire_notes}} |
| Invoice (Net 30) | {{invoice_supported}} | {{invoice_config}} | {{invoice_notes}} |

### 8.2 Payment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Payment Processing Flow                      │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Invoice   │───►│   Payment   │───►│   Provider  │         │
│  │   Created   │    │   Intent    │    │   Charge    │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            │            ┌──────┴──────┐         │
│                            │            ▼             ▼         │
│                            │     ┌──────────┐  ┌──────────┐    │
│                            │     │ Success  │  │ Failure  │    │
│                            │     └────┬─────┘  └────┬─────┘    │
│                            │          │             │           │
│                            ▼          ▼             ▼           │
│                     ┌───────────────────────────────────┐       │
│                     │         Webhook Handler           │       │
│                     │    (Update invoice + tenant)      │       │
│                     └───────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 Retry Configuration

| Retry | Timing | Notification |
|-------|--------|--------------|
| 1st | {{retry_1_timing}} | {{retry_1_notif}} |
| 2nd | {{retry_2_timing}} | {{retry_2_notif}} |
| 3rd | {{retry_3_timing}} | {{retry_3_notif}} |
| Final | {{retry_final_timing}} | {{retry_final_notif}} |

### 8.4 Failed Payment Handling

| Scenario | Action | Tenant Impact |
|----------|--------|---------------|
| Card declined | {{declined_action}} | {{declined_impact}} |
| Insufficient funds | {{nsf_action}} | {{nsf_impact}} |
| Expired card | {{expired_action}} | {{expired_impact}} |
| Fraud detected | {{fraud_action}} | {{fraud_impact}} |

---

## Webhook Integration

### 9.1 Webhook Events

| Event | Provider Event | Handler | Actions |
|-------|----------------|---------|---------|
| Subscription created | {{sub_created_event}} | {{sub_created_handler}} | {{sub_created_actions}} |
| Subscription updated | {{sub_updated_event}} | {{sub_updated_handler}} | {{sub_updated_actions}} |
| Subscription cancelled | {{sub_cancelled_event}} | {{sub_cancelled_handler}} | {{sub_cancelled_actions}} |
| Invoice created | {{inv_created_event}} | {{inv_created_handler}} | {{inv_created_actions}} |
| Invoice paid | {{inv_paid_event}} | {{inv_paid_handler}} | {{inv_paid_actions}} |
| Invoice failed | {{inv_failed_event}} | {{inv_failed_handler}} | {{inv_failed_actions}} |
| Payment succeeded | {{pay_success_event}} | {{pay_success_handler}} | {{pay_success_actions}} |
| Payment failed | {{pay_failed_event}} | {{pay_failed_handler}} | {{pay_failed_actions}} |

### 9.2 Webhook Security

| Security Measure | Implementation |
|------------------|----------------|
| Signature verification | {{signature_impl}} |
| Replay protection | {{replay_impl}} |
| IP allowlist | {{ip_allowlist}} |
| TLS requirement | {{tls_requirement}} |

### 9.3 Webhook Handler Flow

```yaml
webhook_handler:
  endpoint: {{webhook_endpoint}}
  
  steps:
    - verify_signature:
        secret: ${WEBHOOK_SECRET}
        header: {{signature_header}}
        
    - parse_event:
        extract: [event_type, data, tenant_id]
        
    - validate_tenant:
        check: tenant_exists
        on_missing: {{missing_tenant_action}}
        
    - process_event:
        dispatch_to: {{event_dispatcher}}
        idempotent: true
        
    - acknowledge:
        status: 200
        timeout: {{webhook_timeout}}
```

---

## Tenant Billing Portal

### 10.1 Portal Features

| Feature | Availability | Configuration |
|---------|--------------|---------------|
| View invoices | All tiers | {{invoice_view_config}} |
| Update payment method | All tiers | {{payment_update_config}} |
| View usage | All tiers | {{usage_view_config}} |
| Download receipts | All tiers | {{receipt_config}} |
| Manage subscription | Pro+ | {{subscription_manage_config}} |
| Add seats/users | Pro+ | {{seat_config}} |

### 10.2 Portal Access

| Access Method | Implementation | Notes |
|---------------|----------------|-------|
| Embedded | {{embedded_impl}} | {{embedded_notes}} |
| Redirect | {{redirect_impl}} | {{redirect_notes}} |
| API-driven | {{api_driven_impl}} | {{api_driven_notes}} |

---

## Reporting and Analytics

### 11.1 Revenue Metrics

| Metric | Calculation | Update Frequency |
|--------|-------------|------------------|
| MRR | {{mrr_calc}} | {{mrr_freq}} |
| ARR | {{arr_calc}} | {{arr_freq}} |
| Churn Rate | {{churn_calc}} | {{churn_freq}} |
| LTV | {{ltv_calc}} | {{ltv_freq}} |
| ARPU | {{arpu_calc}} | {{arpu_freq}} |

### 11.2 Billing Reports

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Revenue summary | {{rev_freq}} | {{rev_recipients}} | {{rev_format}} |
| Failed payments | {{fail_freq}} | {{fail_recipients}} | {{fail_format}} |
| Churn report | {{churn_freq}} | {{churn_recipients}} | {{churn_format}} |
| Usage report | {{usage_freq}} | {{usage_recipients}} | {{usage_format}} |

### 11.3 Tenant-Specific Metrics

| Metric | Access | Location |
|--------|--------|----------|
| Current spend | Tenant portal | {{spend_location}} |
| Usage trends | Tenant portal | {{trend_location}} |
| Invoice history | Tenant portal | {{history_location}} |
| Payment history | Tenant portal | {{payment_history}} |

---

## Compliance and Security

### 12.1 PCI Compliance

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| No card data storage | {{pci_storage}} | {{pci_storage_evidence}} |
| Secure transmission | {{pci_transmission}} | {{pci_transmission_evidence}} |
| Provider compliance | {{pci_provider}} | {{pci_provider_evidence}} |

### 12.2 Data Residency

| Data Type | Storage Location | Provider Handling |
|-----------|------------------|-------------------|
| Payment methods | Provider | {{payment_residency}} |
| Invoices | {{invoice_storage}} | {{invoice_residency}} |
| Usage records | {{usage_storage}} | {{usage_residency}} |

### 12.3 Audit Trail

| Event | Logged Fields | Retention |
|-------|---------------|-----------|
| Subscription change | {{sub_log_fields}} | {{sub_retention}} |
| Payment attempt | {{pay_log_fields}} | {{pay_retention}} |
| Plan change | {{plan_log_fields}} | {{plan_retention}} |
| Cancellation | {{cancel_log_fields}} | {{cancel_retention}} |

---

## Testing Strategy

### 13.1 Test Scenarios

| Scenario | Test Type | Environment |
|----------|-----------|-------------|
| Subscription creation | Integration | {{sub_test_env}} |
| Payment success | Integration | {{pay_success_env}} |
| Payment failure | Integration | {{pay_fail_env}} |
| Webhook handling | Integration | {{webhook_test_env}} |
| Usage metering | Unit + Integration | {{meter_test_env}} |

### 13.2 Test Cards/Accounts

| Scenario | Test Credential | Expected Result |
|----------|-----------------|-----------------|
| Success | {{success_card}} | Payment succeeds |
| Decline | {{decline_card}} | Payment declined |
| Insufficient funds | {{nsf_card}} | NSF error |
| Fraud | {{fraud_card}} | Fraud blocked |

---

## Verification Checklist

### 14.1 Integration Checklist

- [ ] Provider account configured
- [ ] API keys securely stored
- [ ] Webhook endpoint deployed
- [ ] Webhook signature verification
- [ ] Product catalog created
- [ ] Price plans configured
- [ ] Tenant mapping established

### 14.2 Multi-Tenant Checklist

- [ ] Tenant ID in all billing records
- [ ] Tenant isolation verified
- [ ] Tier-specific pricing works
- [ ] Usage metering per-tenant
- [ ] Portal shows tenant data only
- [ ] Audit trail includes tenant

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "SaaS billing integration multi-tenant {date}"
- "usage-based billing patterns enterprise SaaS {date}"
- "subscription billing webhook best practices {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix A: Related Documents

- Pattern: `billing-integration` in `bam-patterns.csv`
- Template: `subscription-management-template.md`
- Workflow: `bmad-bam-tenant-onboarding-design`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
