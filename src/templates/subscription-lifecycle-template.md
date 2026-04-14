---
name: subscription-lifecycle-template
description: Template for subscription lifecycle management including plan configuration, trial management, upgrades/downgrades, renewals, cancellations, and churn prevention in multi-tenant SaaS platforms
category: billing
version: 1.0.0
type: template
---

# Subscription Lifecycle Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the subscription lifecycle management framework for {{project_name}}, establishing standardized procedures for plan configuration, trial management, upgrades, downgrades, renewals, cancellations, and churn prevention across all tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Subscription Lifecycle Specification |
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

1. [Subscription Plans](#subscription-plans)
2. [Trial Management](#trial-management)
3. [Subscription States](#subscription-states)
4. [Plan Changes](#plan-changes)
5. [Renewal Management](#renewal-management)
6. [Cancellation Handling](#cancellation-handling)
7. [Churn Prevention](#churn-prevention)
8. [Entitlement Management](#entitlement-management)
9. [Subscription Analytics](#subscription-analytics)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

---

## Subscription Plans

### 1.1 Plan Definitions

| Plan ID | Plan Name | Billing Cycle | Base Price | Currency |
|---------|-----------|---------------|------------|----------|
| {{plan_1_id}} | {{plan_1_name}} | {{plan_1_cycle}} | {{plan_1_price}} | {{plan_1_currency}} |
| {{plan_2_id}} | {{plan_2_name}} | {{plan_2_cycle}} | {{plan_2_price}} | {{plan_2_currency}} |
| {{plan_3_id}} | {{plan_3_name}} | {{plan_3_cycle}} | {{plan_3_price}} | {{plan_3_currency}} |
| {{plan_4_id}} | {{plan_4_name}} | {{plan_4_cycle}} | {{plan_4_price}} | {{plan_4_currency}} |

### 1.2 Plan Configuration Schema

```yaml
subscription_plan:
  plan_id: string                     # Unique plan identifier
  name: string                        # Human-readable name
  description: string                 # Plan description
  tier: enum                          # free, starter, pro, enterprise
  
  pricing:
    model: enum                       # flat, per_seat, usage_based, hybrid
    base_price: decimal               # Base subscription price
    currency: string                  # ISO currency code
    billing_cycle: enum               # monthly, quarterly, annual
    setup_fee: decimal                # One-time setup fee
    
  trial:
    enabled: boolean                  # Trial availability
    duration_days: integer            # Trial duration
    requires_payment_method: boolean  # Require card on file
    
  limits:
    users: integer                    # User seat limit
    storage_gb: integer               # Storage limit
    api_calls: integer                # API call limit
    custom_limits: object             # Additional limits
    
  features:
    included: array                   # Included features
    excluded: array                   # Explicitly excluded features
    add_ons: array                    # Available add-ons
```

### 1.3 Plan Comparison Matrix

| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| {{feature_1}} | {{free_f1}} | {{starter_f1}} | {{pro_f1}} | {{enterprise_f1}} |
| {{feature_2}} | {{free_f2}} | {{starter_f2}} | {{pro_f2}} | {{enterprise_f2}} |
| {{feature_3}} | {{free_f3}} | {{starter_f3}} | {{pro_f3}} | {{enterprise_f3}} |
| {{feature_4}} | {{free_f4}} | {{starter_f4}} | {{pro_f4}} | {{enterprise_f4}} |
| {{feature_5}} | {{free_f5}} | {{starter_f5}} | {{pro_f5}} | {{enterprise_f5}} |

### 1.4 Pricing Tiers

| Billing Cycle | Discount | Effective Monthly | Payment Terms |
|---------------|----------|-------------------|---------------|
| Monthly | {{monthly_discount}} | {{monthly_effective}} | {{monthly_terms}} |
| Quarterly | {{quarterly_discount}} | {{quarterly_effective}} | {{quarterly_terms}} |
| Annual | {{annual_discount}} | {{annual_effective}} | {{annual_terms}} |
| Multi-Year | {{multiyear_discount}} | {{multiyear_effective}} | {{multiyear_terms}} |

---

## Trial Management

### 2.1 Trial Configuration

| Plan | Trial Duration | Trial Features | Conversion Action |
|------|----------------|----------------|-------------------|
| {{trial_plan_1}} | {{trial_duration_1}} | {{trial_features_1}} | {{trial_conversion_1}} |
| {{trial_plan_2}} | {{trial_duration_2}} | {{trial_features_2}} | {{trial_conversion_2}} |
| {{trial_plan_3}} | {{trial_duration_3}} | {{trial_features_3}} | {{trial_conversion_3}} |

### 2.2 Trial Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Trial Lifecycle Flow                         │
│                                                                  │
│  SIGNUP ──► TRIAL_START ──► TRIAL_ACTIVE                        │
│      │           │              │                                │
│      │           │         ┌────┴────┐                          │
│      │           │         ▼         ▼                          │
│      │           │    ENGAGEMENT  LOW_ENGAGEMENT                 │
│      │           │         │         │                          │
│      │           │         │         ▼                          │
│      │           │         │    NURTURE_CAMPAIGN                │
│      │           │         │         │                          │
│      │           │         └────┬────┘                          │
│      │           │              ▼                               │
│      │           │         TRIAL_WARNING (3 days)               │
│      │           │              │                               │
│      │           │              ▼                               │
│      │           │         TRIAL_EXPIRING (1 day)               │
│      │           │              │                               │
│      │           │         ┌────┴────┐                          │
│      │           │         ▼         ▼                          │
│      │           │    CONVERTED  TRIAL_EXPIRED                  │
│      │           │         │         │                          │
│      │           │         │         ▼                          │
│      │           │         │    GRACE_PERIOD                    │
│      │           │         │         │                          │
│      │           │         │    ┌────┴────┐                     │
│      │           │         │    ▼         ▼                     │
│      │           │         │ CONVERTED  DOWNGRADE_FREE          │
│      │           │         │                                    │
│      │           │         └───────────► ACTIVE_SUBSCRIPTION    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Trial Communication Schedule

| Day | Communication | Channel | Content |
|-----|---------------|---------|---------|
| 0 | {{comm_day_0}} | {{channel_0}} | {{content_0}} |
| 3 | {{comm_day_3}} | {{channel_3}} | {{content_3}} |
| 7 | {{comm_day_7}} | {{channel_7}} | {{content_7}} |
| 11 | {{comm_day_11}} | {{channel_11}} | {{content_11}} |
| 13 | {{comm_day_13}} | {{channel_13}} | {{content_13}} |
| 14 | {{comm_day_14}} | {{channel_14}} | {{content_14}} |

### 2.4 Trial Extension Policy

| Reason | Extension Days | Approval Required | Max Extensions |
|--------|----------------|-------------------|----------------|
| Technical Issue | {{tech_extension}} | {{tech_approval}} | {{tech_max}} |
| Onboarding Delay | {{onboard_extension}} | {{onboard_approval}} | {{onboard_max}} |
| Evaluation | {{eval_extension}} | {{eval_approval}} | {{eval_max}} |
| Enterprise Request | {{enterprise_extension}} | {{enterprise_approval}} | {{enterprise_max}} |

---

## Subscription States

### 3.1 State Definitions

| State | Description | Capabilities | Billing Status |
|-------|-------------|--------------|----------------|
| TRIALING | {{trialing_desc}} | {{trialing_caps}} | {{trialing_billing}} |
| ACTIVE | {{active_desc}} | {{active_caps}} | {{active_billing}} |
| PAST_DUE | {{past_due_desc}} | {{past_due_caps}} | {{past_due_billing}} |
| PAUSED | {{paused_desc}} | {{paused_caps}} | {{paused_billing}} |
| CANCELED | {{canceled_desc}} | {{canceled_caps}} | {{canceled_billing}} |
| EXPIRED | {{expired_desc}} | {{expired_caps}} | {{expired_billing}} |

### 3.2 State Transition Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                   Subscription State Machine                     │
│                                                                  │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                │
│  │ TRIALING │────►│  ACTIVE  │◄───►│ PAST_DUE │                │
│  └────┬─────┘     └────┬─────┘     └────┬─────┘                │
│       │                │                │                       │
│       │           ┌────┴────┐          │                       │
│       │           ▼         ▼          │                       │
│       │      ┌────────┐ ┌────────┐     │                       │
│       │      │ PAUSED │ │CANCELED│◄────┘                       │
│       │      └────┬───┘ └────┬───┘                             │
│       │           │          │                                  │
│       │           │          ▼                                  │
│       │           │     ┌─────────┐                            │
│       └───────────┴────►│ EXPIRED │                            │
│                         └─────────┘                            │
│                                                                 │
│  Transitions:                                                   │
│  - TRIALING → ACTIVE: Payment successful                       │
│  - TRIALING → EXPIRED: Trial end, no conversion                │
│  - ACTIVE → PAST_DUE: Payment failed                           │
│  - PAST_DUE → ACTIVE: Payment recovered                        │
│  - PAST_DUE → CANCELED: Grace period exceeded                  │
│  - ACTIVE → PAUSED: Customer request                           │
│  - PAUSED → ACTIVE: Resume subscription                        │
│  - ACTIVE → CANCELED: Cancellation request                     │
│  - CANCELED → EXPIRED: Period end reached                      │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 State Transition Schema

```yaml
subscription_state:
  subscription_id: uuid               # Subscription identifier
  tenant_id: uuid                     # Tenant context
  current_state: enum                 # Current state
  previous_state: enum                # Previous state
  state_changed_at: iso8601           # State change timestamp
  
  state_metadata:
    reason: string                    # State change reason
    initiated_by: enum                # system, customer, admin
    notes: string                     # Additional notes
    
  next_action:
    action_type: enum                 # renewal, expiration, etc.
    scheduled_at: iso8601             # Scheduled action time
    
  audit:
    changed_by: uuid                  # User who made change
    ip_address: string                # IP address
    user_agent: string                # User agent
```

---

## Plan Changes

### 4.1 Upgrade Paths

| From Plan | To Plan | Proration | Effective Date |
|-----------|---------|-----------|----------------|
| {{upgrade_from_1}} | {{upgrade_to_1}} | {{upgrade_prorate_1}} | {{upgrade_effective_1}} |
| {{upgrade_from_2}} | {{upgrade_to_2}} | {{upgrade_prorate_2}} | {{upgrade_effective_2}} |
| {{upgrade_from_3}} | {{upgrade_to_3}} | {{upgrade_prorate_3}} | {{upgrade_effective_3}} |

### 4.2 Downgrade Paths

| From Plan | To Plan | Proration | Effective Date | Restrictions |
|-----------|---------|-----------|----------------|--------------|
| {{downgrade_from_1}} | {{downgrade_to_1}} | {{downgrade_prorate_1}} | {{downgrade_effective_1}} | {{downgrade_restrict_1}} |
| {{downgrade_from_2}} | {{downgrade_to_2}} | {{downgrade_prorate_2}} | {{downgrade_effective_2}} | {{downgrade_restrict_2}} |
| {{downgrade_from_3}} | {{downgrade_to_3}} | {{downgrade_prorate_3}} | {{downgrade_effective_3}} | {{downgrade_restrict_3}} |

### 4.3 Plan Change Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Plan Change Flow                            │
│                                                                  │
│  REQUEST ──► VALIDATE_ELIGIBILITY ──► ELIGIBLE?                 │
│      │              │                     │                      │
│      │              │                ┌────┴────┐                 │
│      │              │                ▼         ▼                 │
│      │              │              YES        NO                 │
│      │              │                │         │                 │
│      │              │                │         ▼                 │
│      │              │                │    SHOW_RESTRICTIONS      │
│      │              │                │         │                 │
│      │              │                │         ▼                 │
│      │              │                │    RESOLVE_BLOCKERS       │
│      │              │                │         │                 │
│      │              │                ▼         │                 │
│      │              │         CALCULATE_PRORATION                │
│      │              │                │                           │
│      │              │                ▼                           │
│      │              │         CONFIRM_CHANGE                     │
│      │              │                │                           │
│      │              │           ┌────┴────┐                      │
│      │              │           ▼         ▼                      │
│      │              │      IMMEDIATE  END_OF_PERIOD              │
│      │              │           │         │                      │
│      │              │           ▼         ▼                      │
│      │              │      APPLY_CHANGE ──► UPDATE_ENTITLEMENTS  │
│      │              │           │                                │
│      │              │           ▼                                │
│      │              │      SEND_CONFIRMATION                     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Proration Calculation

| Scenario | Proration Method | Credit Handling | Invoice Impact |
|----------|------------------|-----------------|----------------|
| Upgrade Mid-Cycle | {{upgrade_proration}} | {{upgrade_credit}} | {{upgrade_invoice}} |
| Downgrade Mid-Cycle | {{downgrade_proration}} | {{downgrade_credit}} | {{downgrade_invoice}} |
| Cycle Change | {{cycle_proration}} | {{cycle_credit}} | {{cycle_invoice}} |
| Add-on Change | {{addon_proration}} | {{addon_credit}} | {{addon_invoice}} |

### 4.5 Downgrade Restrictions

| Restriction Type | Validation | Resolution |
|------------------|------------|------------|
| Usage Over Limit | {{usage_validation}} | {{usage_resolution}} |
| Active Features | {{feature_validation}} | {{feature_resolution}} |
| User Count | {{user_validation}} | {{user_resolution}} |
| Storage Consumed | {{storage_validation}} | {{storage_resolution}} |
| Active Integrations | {{integration_validation}} | {{integration_resolution}} |

---

## Renewal Management

### 5.1 Renewal Configuration

| Plan Type | Auto-Renew Default | Renewal Notice | Price Lock |
|-----------|-------------------|----------------|------------|
| Monthly | {{monthly_auto}} | {{monthly_notice}} | {{monthly_lock}} |
| Quarterly | {{quarterly_auto}} | {{quarterly_notice}} | {{quarterly_lock}} |
| Annual | {{annual_auto}} | {{annual_notice}} | {{annual_lock}} |
| Multi-Year | {{multiyear_auto}} | {{multiyear_notice}} | {{multiyear_lock}} |

### 5.2 Renewal Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Renewal Flow                                │
│                                                                  │
│  RENEWAL_DATE_APPROACHING ──► SEND_REMINDER                     │
│           │                        │                             │
│           │                        ▼                             │
│           │                   CHECK_AUTO_RENEW                   │
│           │                        │                             │
│           │                   ┌────┴────┐                        │
│           │                   ▼         ▼                        │
│           │              AUTO_ON    AUTO_OFF                     │
│           │                   │         │                        │
│           │                   │         ▼                        │
│           │                   │    MANUAL_RENEWAL_REQUIRED       │
│           │                   │         │                        │
│           │                   │    ┌────┴────┐                   │
│           │                   │    ▼         ▼                   │
│           │                   │ RENEWED  NOT_RENEWED             │
│           │                   │              │                   │
│           │                   │              ▼                   │
│           │                   │         GRACE_PERIOD             │
│           │                   │              │                   │
│           │                   ▼              ▼                   │
│           │            PROCESS_PAYMENT ──► EXPIRATION            │
│           │                   │                                  │
│           │              ┌────┴────┐                             │
│           │              ▼         ▼                             │
│           │          SUCCESS    FAILED                           │
│           │              │         │                             │
│           │              │         ▼                             │
│           │              │    RETRY_FLOW                         │
│           │              │         │                             │
│           │              ▼         ▼                             │
│           │         RENEWED ◄──────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Renewal Communication Schedule

| Days Before | Communication Type | Channel | Action Required |
|-------------|-------------------|---------|-----------------|
| 30 | {{comm_30_type}} | {{comm_30_channel}} | {{comm_30_action}} |
| 14 | {{comm_14_type}} | {{comm_14_channel}} | {{comm_14_action}} |
| 7 | {{comm_7_type}} | {{comm_7_channel}} | {{comm_7_action}} |
| 3 | {{comm_3_type}} | {{comm_3_channel}} | {{comm_3_action}} |
| 1 | {{comm_1_type}} | {{comm_1_channel}} | {{comm_1_action}} |
| 0 | {{comm_0_type}} | {{comm_0_channel}} | {{comm_0_action}} |

### 5.4 Price Change Handling

| Scenario | Customer Notification | Grace Period | Opt-Out Option |
|----------|----------------------|--------------|----------------|
| Price Increase | {{increase_notify}} | {{increase_grace}} | {{increase_optout}} |
| Price Decrease | {{decrease_notify}} | {{decrease_grace}} | {{decrease_optout}} |
| New Features Added | {{features_notify}} | {{features_grace}} | {{features_optout}} |
| Plan Restructure | {{restructure_notify}} | {{restructure_grace}} | {{restructure_optout}} |

---

## Cancellation Handling

### 6.1 Cancellation Types

| Type | Effective Date | Refund Policy | Data Retention |
|------|----------------|---------------|----------------|
| Immediate | {{immediate_effective}} | {{immediate_refund}} | {{immediate_retention}} |
| End of Period | {{period_effective}} | {{period_refund}} | {{period_retention}} |
| Scheduled | {{scheduled_effective}} | {{scheduled_refund}} | {{scheduled_retention}} |
| Grace Period Exit | {{grace_effective}} | {{grace_refund}} | {{grace_retention}} |

### 6.2 Cancellation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cancellation Flow                             │
│                                                                  │
│  CANCEL_REQUEST ──► CAPTURE_REASON ──► OFFER_ALTERNATIVES       │
│        │                 │                   │                   │
│        │                 │              ┌────┴────┐              │
│        │                 │              ▼         ▼              │
│        │                 │         ACCEPTED   DECLINED           │
│        │                 │              │         │              │
│        │                 │              │         ▼              │
│        │                 │              │    CONFIRM_CANCEL      │
│        │                 │              │         │              │
│        │                 │              │    ┌────┴────┐         │
│        │                 │              │    ▼         ▼         │
│        │                 │              │ IMMEDIATE END_PERIOD   │
│        │                 │              │    │         │         │
│        │                 │              │    ▼         ▼         │
│        │                 │              │ PROCESS  SCHEDULE      │
│        │                 │              │    │         │         │
│        │                 │              │    └────┬────┘         │
│        │                 │              │         ▼              │
│        │                 │              │    SEND_CONFIRMATION   │
│        │                 │              │         │              │
│        │                 │              │         ▼              │
│        │                 │              │    DATA_RETENTION      │
│        │                 │              │         │              │
│        │                 │              ▼         ▼              │
│        │                 │         RETENTION_SAVED               │
│        │                 │              │                        │
│        │                 │              ▼                        │
│        │                 │         WIN_BACK_CAMPAIGN             │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Cancellation Reasons

| Reason Category | Specific Reasons | Save Offer | Analytics Tag |
|-----------------|------------------|------------|---------------|
| Price | {{price_reasons}} | {{price_offer}} | {{price_tag}} |
| Features | {{feature_reasons}} | {{feature_offer}} | {{feature_tag}} |
| Competition | {{competition_reasons}} | {{competition_offer}} | {{competition_tag}} |
| Usage | {{usage_reasons}} | {{usage_offer}} | {{usage_tag}} |
| Technical | {{technical_reasons}} | {{technical_offer}} | {{technical_tag}} |
| Business | {{business_reasons}} | {{business_offer}} | {{business_tag}} |

### 6.4 Refund Policy

| Cancellation Timing | Refund Amount | Processing Time | Method |
|---------------------|---------------|-----------------|--------|
| Within 7 days | {{7day_refund}} | {{7day_processing}} | {{7day_method}} |
| Within 30 days | {{30day_refund}} | {{30day_processing}} | {{30day_method}} |
| Mid-Cycle | {{midcycle_refund}} | {{midcycle_processing}} | {{midcycle_method}} |
| Annual Pre-Renewal | {{annual_refund}} | {{annual_processing}} | {{annual_method}} |

---

## Churn Prevention

### 7.1 Churn Risk Indicators

| Indicator | Risk Score | Detection Method | Intervention |
|-----------|------------|------------------|--------------|
| Low Usage | {{lowusage_score}} | {{lowusage_detect}} | {{lowusage_action}} |
| Support Tickets | {{support_score}} | {{support_detect}} | {{support_action}} |
| Payment Failures | {{payment_score}} | {{payment_detect}} | {{payment_action}} |
| Feature Decline | {{feature_score}} | {{feature_detect}} | {{feature_action}} |
| Engagement Drop | {{engage_score}} | {{engage_detect}} | {{engage_action}} |

### 7.2 Save Offers

| Risk Level | Offer Type | Discount | Duration |
|------------|------------|----------|----------|
| Low | {{low_offer}} | {{low_discount}} | {{low_duration}} |
| Medium | {{medium_offer}} | {{medium_discount}} | {{medium_duration}} |
| High | {{high_offer}} | {{high_discount}} | {{high_duration}} |
| Critical | {{critical_offer}} | {{critical_discount}} | {{critical_duration}} |

### 7.3 Intervention Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Churn Prevention Flow                         │
│                                                                  │
│  CHURN_SIGNAL ──► CALCULATE_RISK_SCORE ──► RISK_LEVEL           │
│        │                    │                  │                 │
│        │                    │             ┌────┴────┐            │
│        │                    │             ▼    ▼    ▼            │
│        │                    │           LOW  MED  HIGH           │
│        │                    │             │    │    │            │
│        │                    │             ▼    ▼    ▼            │
│        │                    │         SELECT_INTERVENTION        │
│        │                    │                  │                 │
│        │                    │             ┌────┴────┐            │
│        │                    │             ▼         ▼            │
│        │                    │         AUTOMATED  HUMAN           │
│        │                    │             │         │            │
│        │                    │             ▼         ▼            │
│        │                    │         EXECUTE_CAMPAIGN           │
│        │                    │                  │                 │
│        │                    │             ┌────┴────┐            │
│        │                    │             ▼         ▼            │
│        │                    │         RESPONDED  NO_RESPONSE     │
│        │                    │             │         │            │
│        │                    │             ▼         ▼            │
│        │                    │         EVALUATE  ESCALATE         │
│        │                    │             │         │            │
│        │                    │        ┌────┴────┐    │            │
│        │                    │        ▼         ▼    │            │
│        │                    │     SAVED    CHURNED ◄┘            │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Win-Back Campaigns

| Time Since Cancel | Campaign Type | Offer | Success Rate Target |
|-------------------|---------------|-------|---------------------|
| 7 days | {{7day_campaign}} | {{7day_winback_offer}} | {{7day_target}} |
| 30 days | {{30day_campaign}} | {{30day_winback_offer}} | {{30day_target}} |
| 90 days | {{90day_campaign}} | {{90day_winback_offer}} | {{90day_target}} |
| 180 days | {{180day_campaign}} | {{180day_winback_offer}} | {{180day_target}} |

---

## Entitlement Management

### 8.1 Entitlement Mapping

| Plan | Entitlements | Activation | Deactivation |
|------|--------------|------------|--------------|
| {{entitle_plan_1}} | {{entitlements_1}} | {{activate_1}} | {{deactivate_1}} |
| {{entitle_plan_2}} | {{entitlements_2}} | {{activate_2}} | {{deactivate_2}} |
| {{entitle_plan_3}} | {{entitlements_3}} | {{activate_3}} | {{deactivate_3}} |

### 8.2 Entitlement Schema

```yaml
entitlement:
  entitlement_id: uuid                # Entitlement identifier
  subscription_id: uuid               # Subscription reference
  tenant_id: uuid                     # Tenant context
  feature_id: string                  # Feature identifier
  
  grant:
    type: enum                        # boolean, quantity, tier
    value: variant                    # Grant value
    unit: string                      # Unit if quantity
    
  validity:
    start: iso8601                    # Start timestamp
    end: iso8601                      # End timestamp (null = indefinite)
    
  source:
    type: enum                        # plan, addon, promotional, custom
    reference: string                 # Source reference
    
  usage:
    current: number                   # Current usage
    limit: number                     # Usage limit
    reset_period: enum                # daily, monthly, never
```

### 8.3 Feature Access Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Feature Access Flow                           │
│                                                                  │
│  FEATURE_REQUEST ──► CHECK_ENTITLEMENT ──► ENTITLED?            │
│        │                    │                  │                 │
│        │                    │             ┌────┴────┐            │
│        │                    │             ▼         ▼            │
│        │                    │           YES        NO            │
│        │                    │             │         │            │
│        │                    │             │         ▼            │
│        │                    │             │    CHECK_TRIAL       │
│        │                    │             │         │            │
│        │                    │             │    ┌────┴────┐       │
│        │                    │             │    ▼         ▼       │
│        │                    │             │  TRIAL    UPGRADE    │
│        │                    │             │    │      PROMPT     │
│        │                    │             │    │         │       │
│        │                    │             ▼    ▼         │       │
│        │                    │         CHECK_LIMITS       │       │
│        │                    │             │              │       │
│        │                    │        ┌────┴────┐        │       │
│        │                    │        ▼         ▼        │       │
│        │                    │    WITHIN    EXCEEDED     │       │
│        │                    │        │         │        │       │
│        │                    │        ▼         ▼        │       │
│        │                    │     GRANT    OVERAGE_FLOW │       │
│        │                    │     ACCESS       │        │       │
│        │                    │        │         │        │       │
│        │                    │        └─────────┴────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Subscription Analytics

### 9.1 Key Metrics

| Metric | Target | Warning | Critical | Calculation |
|--------|--------|---------|----------|-------------|
| MRR | {{mrr_target}} | {{mrr_warning}} | {{mrr_critical}} | {{mrr_calc}} |
| Churn Rate | {{churn_target}} | {{churn_warning}} | {{churn_critical}} | {{churn_calc}} |
| Trial Conversion | {{trial_target}} | {{trial_warning}} | {{trial_critical}} | {{trial_calc}} |
| Expansion Revenue | {{expansion_target}} | {{expansion_warning}} | {{expansion_critical}} | {{expansion_calc}} |
| LTV | {{ltv_target}} | {{ltv_warning}} | {{ltv_critical}} | {{ltv_calc}} |

### 9.2 Cohort Analysis

| Cohort | Retention 30d | Retention 90d | Retention 365d | LTV |
|--------|---------------|---------------|----------------|-----|
| {{cohort_1}} | {{cohort_1_30}} | {{cohort_1_90}} | {{cohort_1_365}} | {{cohort_1_ltv}} |
| {{cohort_2}} | {{cohort_2_30}} | {{cohort_2_90}} | {{cohort_2_365}} | {{cohort_2_ltv}} |
| {{cohort_3}} | {{cohort_3_30}} | {{cohort_3_90}} | {{cohort_3_365}} | {{cohort_3_ltv}} |

### 9.3 Dashboard Schema

```yaml
subscription_dashboard:
  tenant_id: uuid                     # Tenant context (for white-label)
  period: object                      # Dashboard period
  
  summary:
    total_subscriptions: integer      # Active subscriptions
    mrr: decimal                      # Monthly recurring revenue
    arr: decimal                      # Annual recurring revenue
    
  changes:
    new_subscriptions: integer        # New in period
    upgrades: integer                 # Upgrades in period
    downgrades: integer               # Downgrades in period
    cancellations: integer            # Cancellations in period
    
  health:
    churn_rate: percentage            # Churn rate
    expansion_rate: percentage        # Expansion rate
    net_revenue_retention: percentage # NRR
    
  forecasts:
    mrr_forecast: array               # MRR projections
    churn_forecast: array             # Churn projections
```

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "subscription lifecycle management SaaS best practices {date}"
- "churn prevention strategies SaaS subscription {date}"
- "trial conversion optimization multi-tenant {date}"
- "subscription billing proration patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Subscription Lifecycle Checklist

- [ ] All subscription plans defined with pricing
- [ ] Trial management configured
- [ ] Subscription states documented with transitions
- [ ] Upgrade/downgrade paths defined
- [ ] Proration rules configured
- [ ] Renewal management automated
- [ ] Cancellation flows documented
- [ ] Churn prevention strategies in place
- [ ] Entitlement mapping complete
- [ ] All placeholders replaced with actual values

### Technical Checklist

- [ ] State machine implemented correctly
- [ ] Proration calculations tested
- [ ] Entitlement enforcement verified
- [ ] Cross-tenant isolation confirmed
- [ ] Webhook integrations tested
- [ ] Analytics tracking implemented

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
