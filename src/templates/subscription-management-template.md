---
name: subscription-management-template
description: Template for subscription plan changes, upgrades, and downgrades in multi-tenant SaaS
category: billing
version: 1.0.0
type: "integration"
---

## Purpose

Template for subscription plan changes, upgrades, and downgrades in multi-tenant SaaS

# Subscription Management Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Subscription Overview

### 1.1 Management Identity

| Field | Value |
|-------|-------|
| Billing Provider | {{billing_provider}} |
| Subscription Model | {{subscription_model}} |
| Billing Frequency | {{billing_frequency}} |
| Proration Policy | {{proration_policy}} |
| Grace Period | {{grace_period}} |

### 1.2 Subscription Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 Subscription Management Flow                     │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Tenant    │───►│Subscription │───►│   Billing   │         │
│  │   Request   │    │  Manager    │    │  Provider   │         │
│  └─────────────┘    └──────┬──────┘    └─────────────┘         │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         ▼                  ▼                  ▼                 │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐           │
│  │ Tier/Plan │      │  Feature  │      │  Quota    │           │
│  │  Update   │      │  Sync     │      │  Adjust   │           │
│  └───────────┘      └───────────┘      └───────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Subscription Plans

### 2.1 Plan Definitions

| Plan | Monthly | Annual | Features | Target |
|------|---------|--------|----------|--------|
| Free | $0 | $0 | {{free_features}} | {{free_target}} |
| Pro | {{pro_monthly}} | {{pro_annual}} | {{pro_features}} | {{pro_target}} |
| Enterprise | {{enterprise_monthly}} | {{enterprise_annual}} | {{enterprise_features}} | {{enterprise_target}} |
| Custom | Negotiated | Negotiated | Custom | Large enterprise |

### 2.2 Plan Feature Matrix

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Users | {{free_users}} | {{pro_users}} | {{enterprise_users}} |
| Storage | {{free_storage}} | {{pro_storage}} | {{enterprise_storage}} |
| API calls | {{free_api}} | {{pro_api}} | {{enterprise_api}} |
| AI agents | {{free_agents}} | {{pro_agents}} | {{enterprise_agents}} |
| Support | {{free_support}} | {{pro_support}} | {{enterprise_support}} |
| SSO | {{free_sso}} | {{pro_sso}} | {{enterprise_sso}} |
| {{custom_feature_1}} | {{free_cf1}} | {{pro_cf1}} | {{enterprise_cf1}} |
| {{custom_feature_2}} | {{free_cf2}} | {{pro_cf2}} | {{enterprise_cf2}} |

### 2.3 Plan Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      Plan Hierarchy                              │
│                                                                  │
│                    ┌──────────────┐                             │
│                    │   Custom     │                             │
│                    │  (Top Tier)  │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │  Enterprise  │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │     Pro      │                             │
│                    └──────┬───────┘                             │
│                           │                                      │
│                    ┌──────▼───────┐                             │
│                    │    Free      │                             │
│                    │ (Base Tier)  │                             │
│                    └──────────────┘                             │
│                                                                  │
│  Upgrade: Free → Pro → Enterprise → Custom                      │
│  Downgrade: Custom → Enterprise → Pro → Free                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Upgrade Process

### 3.1 Upgrade Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       Upgrade Flow                               │
│                                                                  │
│  1. Request    2. Validate    3. Calculate    4. Payment       │
│  ┌─────────┐   ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Select  │──►│ Check   │───►│Proration│───►│ Charge  │       │
│  │New Plan │   │Eligibil.│    │ Amount  │    │  Card   │       │
│  └─────────┘   └─────────┘    └─────────┘    └────┬────┘       │
│                                                    │             │
│                                               ┌────┴────┐       │
│                                               ▼         ▼       │
│                                          Success     Failure    │
│                                               │         │       │
│  5. Provision   6. Notify     7. Log      ┌──┴──┐      │       │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐  │     │      │       │
│  │ Unlock  │◄──│ Email   │◄──│ Audit   │◄─┘     │      │       │
│  │Features │   │Confirm. │   │ Trail   │        ▼      │       │
│  └─────────┘   └─────────┘   └─────────┘    Retry?     │       │
│                                               │         │       │
│                                               └─────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Upgrade Operations

| Operation | Description | Immediate | Scheduled |
|-----------|-------------|-----------|-----------|
| Tier upgrade | Change subscription tier | Yes | No |
| Seat addition | Add more users | Yes | No |
| Feature unlock | Enable specific feature | Yes | No |
| Storage upgrade | Increase storage quota | Yes | No |
| Annual conversion | Monthly to annual | Yes | Yes |

### 3.3 Upgrade Eligibility Rules

| Rule | Check | Failure Action |
|------|-------|----------------|
| Payment method valid | Card on file, not expired | Request new payment |
| No outstanding balance | All invoices paid | Request payment |
| Account in good standing | Not suspended | Contact support |
| Upgrade path valid | Valid tier transition | Show valid options |
| {{custom_rule}} | {{custom_check}} | {{custom_action}} |

### 3.4 Proration Calculation

| Scenario | Calculation | Example |
|----------|-------------|---------|
| Mid-cycle upgrade | {{upgrade_proration_calc}} | {{upgrade_example}} |
| Same-day upgrade | {{same_day_calc}} | {{same_day_example}} |
| Annual mid-term | {{annual_calc}} | {{annual_example}} |

---

## Downgrade Process

### 4.1 Downgrade Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Downgrade Flow                              │
│                                                                  │
│  1. Request    2. Validate    3. Check      4. Schedule        │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐         │
│  │ Select  │──►│ Check   │──►│ Usage   │──►│ Set End │         │
│  │New Plan │   │Eligibil.│   │ Limits  │   │of Period│         │
│  └─────────┘   └─────────┘   └─────────┘   └────┬────┘         │
│                                                  │               │
│                                                  │               │
│  5. Warning    6. Restrict    7. Apply    8. Notify            │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐         │
│  │ Show    │◄──│ Soft    │◄──│ Change  │◄──│ Email   │         │
│  │ Impact  │   │ Limits  │   │  Plan   │   │Reminder │         │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Downgrade Rules

| Rule | Behavior | Timing |
|------|----------|--------|
| Effective date | {{downgrade_effective}} | {{downgrade_timing}} |
| Feature access | {{feature_access_rule}} | Until effective |
| Data retention | {{data_retention_rule}} | {{data_timing}} |
| User limits | {{user_limit_rule}} | {{user_timing}} |

### 4.3 Usage Limit Handling

| Resource | Over Limit Action | Grace Period | Hard Limit |
|----------|-------------------|--------------|------------|
| Users | {{users_over_action}} | {{users_grace}} | {{users_hard}} |
| Storage | {{storage_over_action}} | {{storage_grace}} | {{storage_hard}} |
| API calls | {{api_over_action}} | {{api_grace}} | {{api_hard}} |
| {{resource_1}} | {{resource_1_action}} | {{resource_1_grace}} | {{resource_1_hard}} |

### 4.4 Downgrade Impact Assessment

| Impact | Check | User Notification |
|--------|-------|-------------------|
| Features lost | {{features_check}} | {{features_notify}} |
| Data at risk | {{data_check}} | {{data_notify}} |
| Users affected | {{users_check}} | {{users_notify}} |
| Integrations | {{integrations_check}} | {{integrations_notify}} |

---

## Plan Change Scenarios

### 5.1 Upgrade Scenarios

| From | To | Immediate Changes | Billing Impact |
|------|-----|-------------------|----------------|
| Free | Pro | {{free_to_pro_changes}} | {{free_to_pro_billing}} |
| Free | Enterprise | {{free_to_enterprise_changes}} | {{free_to_enterprise_billing}} |
| Pro | Enterprise | {{pro_to_enterprise_changes}} | {{pro_to_enterprise_billing}} |
| Monthly | Annual | {{monthly_to_annual_changes}} | {{monthly_to_annual_billing}} |

### 5.2 Downgrade Scenarios

| From | To | Changes at End of Period | Data Handling |
|------|-----|-------------------------|---------------|
| Enterprise | Pro | {{enterprise_to_pro_changes}} | {{enterprise_to_pro_data}} |
| Enterprise | Free | {{enterprise_to_free_changes}} | {{enterprise_to_free_data}} |
| Pro | Free | {{pro_to_free_changes}} | {{pro_to_free_data}} |
| Annual | Monthly | {{annual_to_monthly_changes}} | {{annual_to_monthly_data}} |

### 5.3 Special Scenarios

| Scenario | Handling | Notes |
|----------|----------|-------|
| Trial to paid | {{trial_conversion}} | {{trial_notes}} |
| Paid to trial | Not allowed | N/A |
| Cancel and resubscribe | {{resubscribe}} | {{resubscribe_notes}} |
| Pause subscription | {{pause_handling}} | {{pause_notes}} |
| Negotiated custom | {{custom_handling}} | {{custom_notes}} |

---

## Billing Adjustments

### 6.1 Credit Handling

| Scenario | Credit Type | Application |
|----------|-------------|-------------|
| Downgrade mid-cycle | {{downgrade_credit_type}} | {{downgrade_credit_apply}} |
| Cancellation | {{cancel_credit_type}} | {{cancel_credit_apply}} |
| Service credit | {{service_credit_type}} | {{service_credit_apply}} |
| Promotional credit | {{promo_credit_type}} | {{promo_credit_apply}} |

### 6.2 Invoice Adjustments

| Adjustment | Trigger | Calculation |
|------------|---------|-------------|
| Proration credit | Upgrade | {{proration_credit_calc}} |
| Proration debit | Downgrade at renewal | {{proration_debit_calc}} |
| Unused prepay | Cancellation | {{unused_calc}} |
| Overage charge | Usage exceeds included | {{overage_calc}} |

### 6.3 Refund Policy

| Scenario | Refund | Conditions |
|----------|--------|------------|
| Annual cancellation | {{annual_refund}} | {{annual_conditions}} |
| Monthly cancellation | {{monthly_refund}} | {{monthly_conditions}} |
| Upgrade within 24h | {{quick_upgrade_refund}} | {{quick_conditions}} |
| Service issues | {{service_refund}} | {{service_conditions}} |

---

## Feature Provisioning

### 7.1 Feature Activation

| Feature | Activation Timing | Rollback Timing |
|---------|-------------------|-----------------|
| Core features | Immediate | End of period |
| AI agents | {{ai_activation}} | {{ai_rollback}} |
| SSO | {{sso_activation}} | {{sso_rollback}} |
| Advanced analytics | {{analytics_activation}} | {{analytics_rollback}} |
| {{feature_1}} | {{feature_1_activation}} | {{feature_1_rollback}} |

### 7.2 Feature Deactivation

| Feature | Deactivation Process | Data Handling |
|---------|---------------------|---------------|
| AI agents | {{ai_deactivation}} | {{ai_data}} |
| SSO | {{sso_deactivation}} | {{sso_data}} |
| Custom integrations | {{integration_deactivation}} | {{integration_data}} |
| Advanced features | {{advanced_deactivation}} | {{advanced_data}} |

### 7.3 Quota Adjustment

| Quota | Upgrade Behavior | Downgrade Behavior |
|-------|------------------|-------------------|
| Users | Immediate increase | Enforce at renewal |
| Storage | Immediate increase | Soft limit, then hard |
| API calls | Immediate reset | New limit next period |
| {{quota_1}} | {{quota_1_upgrade}} | {{quota_1_downgrade}} |

---

## Multi-Tenant Considerations

### 8.1 Tenant-Level Subscriptions

| Configuration | Description | Use Case |
|---------------|-------------|----------|
| Single subscription | One subscription per tenant | Standard B2B |
| User-based billing | Per-seat pricing | Team tools |
| Usage-based | Metered billing | API products |
| Hybrid | Base + usage | Platform products |

### 8.2 Tenant Context in Operations

| Operation | Tenant Context | Validation |
|-----------|----------------|------------|
| Plan change | Required | Tenant admin only |
| Billing update | Required | Billing admin only |
| Usage query | Required | Own tenant only |
| Invoice access | Required | Own tenant only |

### 8.3 Multi-Subscription Support

| Scenario | Support | Notes |
|----------|---------|-------|
| Multiple subscriptions per tenant | {{multi_sub_support}} | {{multi_sub_notes}} |
| Parent-child billing | {{parent_child_support}} | {{parent_child_notes}} |
| Reseller billing | {{reseller_support}} | {{reseller_notes}} |

---

## API Endpoints

### 9.1 Subscription Operations

| Operation | Method | Endpoint | Auth |
|-----------|--------|----------|------|
| Get subscription | GET | `/api/v1/subscription` | Tenant JWT |
| Update subscription | PUT | `/api/v1/subscription` | Tenant Admin |
| Preview upgrade | POST | `/api/v1/subscription/preview` | Tenant JWT |
| Apply upgrade | POST | `/api/v1/subscription/upgrade` | Tenant Admin |
| Schedule downgrade | POST | `/api/v1/subscription/downgrade` | Tenant Admin |
| Cancel subscription | POST | `/api/v1/subscription/cancel` | Tenant Admin |

### 9.2 Request/Response Schemas

**Upgrade Preview Request:**
```yaml
preview_upgrade_request:
  target_plan: string      # Plan identifier
  billing_cycle: enum      # monthly, annual
  add_ons: string[]        # Optional add-ons
```

**Upgrade Preview Response:**
```yaml
preview_upgrade_response:
  current_plan: string
  target_plan: string
  proration_amount: number
  new_amount: number
  effective_date: iso8601
  features_gained: string[]
  features_lost: string[]
```

**Downgrade Request:**
```yaml
downgrade_request:
  target_plan: string
  effective_date: enum     # immediate, end_of_period
  reason: string           # Optional feedback
```

---

## Event Handling

### 10.1 Subscription Events

| Event | Trigger | Actions |
|-------|---------|---------|
| subscription.upgraded | Plan upgrade | {{upgrade_actions}} |
| subscription.downgraded | Plan downgrade | {{downgrade_actions}} |
| subscription.cancelled | Cancellation | {{cancel_actions}} |
| subscription.paused | Pause request | {{pause_actions}} |
| subscription.resumed | Resume | {{resume_actions}} |
| subscription.renewed | Period end | {{renew_actions}} |

### 10.2 Webhook Payloads

```yaml
subscription_event:
  event_type: string
  tenant_id: uuid
  subscription_id: uuid
  previous_plan: string
  new_plan: string
  effective_date: iso8601
  metadata:
    initiated_by: string
    reason: string
```

### 10.3 Internal Event Handling

| Event | Handler | Side Effects |
|-------|---------|--------------|
| Plan changed | {{plan_handler}} | Feature sync, quota update |
| Seats changed | {{seats_handler}} | User limit enforcement |
| Cancelled | {{cancel_handler}} | Grace period, data retention |
| Suspended | {{suspend_handler}} | Access restriction |

---

## Self-Service Portal

### 11.1 Portal Features

| Feature | Availability | Notes |
|---------|--------------|-------|
| View current plan | All | Read-only |
| View usage | All | Current period |
| Upgrade plan | Tenant Admin | Immediate |
| Downgrade plan | Tenant Admin | Scheduled |
| Cancel subscription | Tenant Admin | With confirmation |
| Update billing | Billing Admin | PCI compliant |
| View invoices | All | Historical |

### 11.2 Plan Comparison UI

| Element | Display | Interactive |
|---------|---------|-------------|
| Feature comparison | Table | Highlight differences |
| Price comparison | Monthly/Annual toggle | Show savings |
| Usage impact | Current vs. new limits | Warning if over |
| Proration preview | Real-time calculation | Show breakdown |

### 11.3 Confirmation Flows

| Action | Confirmation Steps |
|--------|-------------------|
| Upgrade | Review → Confirm payment → Success |
| Downgrade | Review impact → Acknowledge loss → Schedule |
| Cancel | Review → Feedback → Confirm → Grace period |

---

## Admin Operations

### 12.1 Platform Admin Actions

| Action | Access | Audit |
|--------|--------|-------|
| Force plan change | Platform Admin | Full audit |
| Apply credits | Platform Admin | Reason required |
| Override limits | Platform Admin | Temporary flag |
| Extend trial | Platform Admin | Duration logged |
| Waive fees | Platform Admin | Approval required |

### 12.2 Reporting

| Report | Frequency | Metrics |
|--------|-----------|---------|
| Upgrades | {{upgrade_report_freq}} | Count, revenue impact |
| Downgrades | {{downgrade_report_freq}} | Count, churn risk |
| Cancellations | {{cancel_report_freq}} | Reasons, recovery rate |
| Plan distribution | {{distribution_freq}} | Tenant count per tier |

---

## Testing Strategy

### 13.1 Test Scenarios

| Scenario | Test Type | Assertions |
|----------|-----------|------------|
| Upgrade flow | E2E | Plan changed, features enabled |
| Downgrade flow | E2E | Scheduled correctly, notification sent |
| Proration calculation | Unit | Amounts correct |
| Feature sync | Integration | Features match plan |
| Quota enforcement | Integration | Limits applied |

### 13.2 Test Data

| Test Plan | From | To | Expected |
|-----------|------|-----|----------|
| Basic upgrade | Free | Pro | {{basic_upgrade_expected}} |
| Skip-level upgrade | Free | Enterprise | {{skip_upgrade_expected}} |
| Basic downgrade | Pro | Free | {{basic_downgrade_expected}} |
| Annual conversion | Pro Monthly | Pro Annual | {{annual_conversion_expected}} |

---

## Verification Checklist

### 14.1 Implementation Checklist

- [ ] All plan tiers defined
- [ ] Upgrade flow implemented
- [ ] Downgrade flow implemented
- [ ] Proration calculation accurate
- [ ] Feature provisioning automated
- [ ] Quota adjustment automated
- [ ] Webhook handlers implemented
- [ ] Self-service portal functional

### 14.2 Multi-Tenant Checklist

- [ ] Tenant context validated in all operations
- [ ] Subscription isolated per tenant
- [ ] Billing data isolated per tenant
- [ ] Usage tracked per tenant
- [ ] Audit trail includes tenant

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "subscription management multi-tenant {date}"
- "SaaS plan upgrade downgrade best practices {date}"
- "proration calculation enterprise SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix A: Related Documents

- Template: `billing-integration-template.md`
- Pattern: `subscription-management` in `bam-patterns.csv`
- Workflow: `bmad-bam-tenant-onboarding-design`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
