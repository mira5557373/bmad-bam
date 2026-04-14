---
name: pricing-tier-template
description: Template for defining pricing tiers including Free, Pro, and Enterprise with feature entitlements, usage limits, overage rates, and upgrade/downgrade rules
category: billing
version: 1.0.0
type: template
---

# Pricing Tier Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the pricing tier framework for {{project_name}}, establishing standardized tier definitions (Free/Pro/Enterprise), feature entitlements, usage limits, overage rates, and upgrade/downgrade rules for the multi-tenant SaaS platform.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Pricing Tier Specification |
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

1. [Tier Definitions](#tier-definitions)
2. [Feature Entitlements](#feature-entitlements)
3. [Usage Limits](#usage-limits)
4. [Overage Rates](#overage-rates)
5. [Upgrade/Downgrade Rules](#upgradedowngrade-rules)
6. [Add-ons and Extras](#add-ons-and-extras)
7. [Pricing Display](#pricing-display)
8. [Promotional Pricing](#promotional-pricing)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## Tier Definitions

### 1.1 Tier Overview

| Tier | Target Audience | Primary Value Proposition | Pricing Model |
|------|-----------------|---------------------------|---------------|
| Free | {{free_audience}} | {{free_value}} | {{free_model}} |
| Pro | {{pro_audience}} | {{pro_value}} | {{pro_model}} |
| Enterprise | {{enterprise_audience}} | {{enterprise_value}} | {{enterprise_model}} |

### 1.2 Tier Pricing

| Tier | Monthly Price | Annual Price | Annual Savings | Billing Currency |
|------|---------------|--------------|----------------|------------------|
| Free | {{free_monthly}} | {{free_annual}} | N/A | {{free_currency}} |
| Pro | {{pro_monthly}} | {{pro_annual}} | {{pro_savings}} | {{pro_currency}} |
| Enterprise | {{enterprise_monthly}} | {{enterprise_annual}} | {{enterprise_savings}} | {{enterprise_currency}} |

### 1.3 Tier Configuration Schema

```yaml
pricing_tier:
  tier_id: string                     # Unique tier identifier
  name: string                        # Tier display name
  slug: string                        # URL-safe identifier
  description: string                 # Tier description
  target_audience: string             # Who this tier is for
  pricing:
    monthly:
      amount: decimal                 # Monthly price
      currency: string                # ISO 4217 currency
      billing_period: "month"
    annual:
      amount: decimal                 # Annual price
      currency: string                # ISO 4217 currency
      billing_period: "year"
      monthly_equivalent: decimal     # Monthly cost when paid annually
  features: array                     # Included features
  limits: object                      # Usage limits
  overages: object                    # Overage pricing
  is_public: boolean                  # Show on pricing page
  is_default: boolean                 # Default for new signups
  sort_order: integer                 # Display order
  metadata:
    support_tier: string              # Support level
    sla_tier: string                  # SLA tier
    {{custom_tier_field}}: {{custom_tier_type}}
```

### 1.4 Tier Comparison Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                      Tier Comparison Matrix                      │
│                                                                  │
│  Feature Category     │    Free    │    Pro     │  Enterprise   │
│  ─────────────────────┼────────────┼────────────┼──────────────│
│  Core Features        │     ✓      │     ✓      │      ✓       │
│  Advanced Features    │     ✗      │     ✓      │      ✓       │
│  Premium Features     │     ✗      │     ✗      │      ✓       │
│  ─────────────────────┼────────────┼────────────┼──────────────│
│  API Access           │  Limited   │    Full    │    Full      │
│  Custom Branding      │     ✗      │     ✓      │      ✓       │
│  SSO/SAML            │     ✗      │     ✗      │      ✓       │
│  ─────────────────────┼────────────┼────────────┼──────────────│
│  Support              │  Community │   Email    │   Priority   │
│  SLA                  │    None    │   99.5%    │    99.9%     │
│  Dedicated Support    │     ✗      │     ✗      │      ✓       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature Entitlements

### 2.1 Core Features

| Feature | Free | Pro | Enterprise | Notes |
|---------|------|-----|------------|-------|
| {{core_feature_1}} | {{free_cf1}} | {{pro_cf1}} | {{enterprise_cf1}} | {{notes_cf1}} |
| {{core_feature_2}} | {{free_cf2}} | {{pro_cf2}} | {{enterprise_cf2}} | {{notes_cf2}} |
| {{core_feature_3}} | {{free_cf3}} | {{pro_cf3}} | {{enterprise_cf3}} | {{notes_cf3}} |
| {{core_feature_4}} | {{free_cf4}} | {{pro_cf4}} | {{enterprise_cf4}} | {{notes_cf4}} |
| {{core_feature_5}} | {{free_cf5}} | {{pro_cf5}} | {{enterprise_cf5}} | {{notes_cf5}} |

### 2.2 AI/Agent Features

| Feature | Free | Pro | Enterprise | Notes |
|---------|------|-----|------------|-------|
| {{ai_feature_1}} | {{free_ai1}} | {{pro_ai1}} | {{enterprise_ai1}} | {{notes_ai1}} |
| {{ai_feature_2}} | {{free_ai2}} | {{pro_ai2}} | {{enterprise_ai2}} | {{notes_ai2}} |
| {{ai_feature_3}} | {{free_ai3}} | {{pro_ai3}} | {{enterprise_ai3}} | {{notes_ai3}} |
| {{ai_feature_4}} | {{free_ai4}} | {{pro_ai4}} | {{enterprise_ai4}} | {{notes_ai4}} |

### 2.3 Integration Features

| Feature | Free | Pro | Enterprise | Notes |
|---------|------|-----|------------|-------|
| API Access | {{free_api}} | {{pro_api}} | {{enterprise_api}} | {{notes_api}} |
| Webhooks | {{free_webhooks}} | {{pro_webhooks}} | {{enterprise_webhooks}} | {{notes_webhooks}} |
| SSO/SAML | {{free_sso}} | {{pro_sso}} | {{enterprise_sso}} | {{notes_sso}} |
| Custom Integrations | {{free_custom_int}} | {{pro_custom_int}} | {{enterprise_custom_int}} | {{notes_custom_int}} |

### 2.4 Security Features

| Feature | Free | Pro | Enterprise | Notes |
|---------|------|-----|------------|-------|
| 2FA | {{free_2fa}} | {{pro_2fa}} | {{enterprise_2fa}} | {{notes_2fa}} |
| Audit Logs | {{free_audit}} | {{pro_audit}} | {{enterprise_audit}} | {{notes_audit}} |
| IP Allowlisting | {{free_ip}} | {{pro_ip}} | {{enterprise_ip}} | {{notes_ip}} |
| Data Encryption | {{free_encryption}} | {{pro_encryption}} | {{enterprise_encryption}} | {{notes_encryption}} |
| RBAC | {{free_rbac}} | {{pro_rbac}} | {{enterprise_rbac}} | {{notes_rbac}} |

### 2.5 Support Features

| Feature | Free | Pro | Enterprise | Notes |
|---------|------|-----|------------|-------|
| Support Channel | {{free_support_channel}} | {{pro_support_channel}} | {{enterprise_support_channel}} | |
| Response Time | {{free_response}} | {{pro_response}} | {{enterprise_response}} | |
| Dedicated CSM | {{free_csm}} | {{pro_csm}} | {{enterprise_csm}} | |
| Training | {{free_training}} | {{pro_training}} | {{enterprise_training}} | |
| Onboarding | {{free_onboarding}} | {{pro_onboarding}} | {{enterprise_onboarding}} | |

### 2.6 Feature Entitlement Schema

```yaml
feature_entitlement:
  feature_id: string                  # Unique feature identifier
  feature_name: string                # Display name
  category: string                    # Feature category
  entitlements:
    free:
      enabled: boolean                # Feature available
      limit: number                   # Limit if applicable
      limit_type: string              # monthly, daily, total
    pro:
      enabled: boolean
      limit: number
      limit_type: string
    enterprise:
      enabled: boolean
      limit: number                   # null = unlimited
      limit_type: string
  enforcement:
    soft_limit: boolean               # Warn vs block
    grace_period: string              # Time before enforcement
    notification_threshold: number    # % usage for notification
```

---

## Usage Limits

### 3.1 Resource Limits

| Resource | Free Limit | Pro Limit | Enterprise Limit | Enforcement |
|----------|------------|-----------|------------------|-------------|
| {{resource_1}} | {{free_r1}} | {{pro_r1}} | {{enterprise_r1}} | {{enforce_r1}} |
| {{resource_2}} | {{free_r2}} | {{pro_r2}} | {{enterprise_r2}} | {{enforce_r2}} |
| {{resource_3}} | {{free_r3}} | {{pro_r3}} | {{enterprise_r3}} | {{enforce_r3}} |
| {{resource_4}} | {{free_r4}} | {{pro_r4}} | {{enterprise_r4}} | {{enforce_r4}} |
| {{resource_5}} | {{free_r5}} | {{pro_r5}} | {{enterprise_r5}} | {{enforce_r5}} |

### 3.2 Rate Limits

| Endpoint Category | Free Rate | Pro Rate | Enterprise Rate | Window |
|-------------------|-----------|----------|-----------------|--------|
| {{category_1}} | {{free_rate_1}} | {{pro_rate_1}} | {{enterprise_rate_1}} | {{window_1}} |
| {{category_2}} | {{free_rate_2}} | {{pro_rate_2}} | {{enterprise_rate_2}} | {{window_2}} |
| {{category_3}} | {{free_rate_3}} | {{pro_rate_3}} | {{enterprise_rate_3}} | {{window_3}} |

### 3.3 Storage Limits

| Storage Type | Free | Pro | Enterprise | Overage Available |
|--------------|------|-----|------------|-------------------|
| {{storage_1}} | {{free_s1}} | {{pro_s1}} | {{enterprise_s1}} | {{overage_s1}} |
| {{storage_2}} | {{free_s2}} | {{pro_s2}} | {{enterprise_s2}} | {{overage_s2}} |
| {{storage_3}} | {{free_s3}} | {{pro_s3}} | {{enterprise_s3}} | {{overage_s3}} |

### 3.4 Team/User Limits

| Limit Type | Free | Pro | Enterprise | Additional Seat Cost |
|------------|------|-----|------------|---------------------|
| Team Members | {{free_members}} | {{pro_members}} | {{enterprise_members}} | {{seat_cost}} |
| Admin Users | {{free_admins}} | {{pro_admins}} | {{enterprise_admins}} | {{admin_cost}} |
| Workspaces | {{free_workspaces}} | {{pro_workspaces}} | {{enterprise_workspaces}} | {{workspace_cost}} |

### 3.5 Limit Enforcement Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Limit Enforcement Flow                        │
│                                                                  │
│  REQUEST ──► CHECK_LIMIT ──► WITHIN_LIMIT ──► ALLOW             │
│      │            │                                              │
│      │            └──► APPROACHING_LIMIT ──► ALLOW + WARN       │
│      │                       │                                   │
│      │                       ▼                                   │
│      │               SEND_NOTIFICATION                           │
│      │                       │                                   │
│      │                       ▼                                   │
│      │               SUGGEST_UPGRADE                             │
│      │                                                           │
│      └──► AT_LIMIT ──► CHECK_ENFORCEMENT_TYPE                   │
│                  │                                               │
│           ┌──────┴──────┐                                       │
│           ▼             ▼                                       │
│       SOFT_LIMIT    HARD_LIMIT                                  │
│           │             │                                       │
│           ▼             ▼                                       │
│       ALLOW + WARN   BLOCK + ERROR                              │
│           │             │                                       │
│           ▼             ▼                                       │
│       LOG_OVERAGE    RETURN_429                                 │
│           │                                                      │
│           ▼                                                      │
│       BILL_OVERAGE (if enabled)                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Overage Rates

### 4.1 Overage Pricing

| Resource | Overage Unit | Overage Rate | Billing Frequency |
|----------|--------------|--------------|-------------------|
| {{overage_resource_1}} | {{unit_1}} | {{rate_1}} | {{freq_1}} |
| {{overage_resource_2}} | {{unit_2}} | {{rate_2}} | {{freq_2}} |
| {{overage_resource_3}} | {{unit_3}} | {{rate_3}} | {{freq_3}} |
| {{overage_resource_4}} | {{unit_4}} | {{rate_4}} | {{freq_4}} |

### 4.2 Overage Tier by Plan

| Resource | Free Overage | Pro Overage | Enterprise Overage |
|----------|--------------|-------------|-------------------|
| {{overage_resource_1}} | {{free_overage_1}} | {{pro_overage_1}} | {{enterprise_overage_1}} |
| {{overage_resource_2}} | {{free_overage_2}} | {{pro_overage_2}} | {{enterprise_overage_2}} |
| {{overage_resource_3}} | {{free_overage_3}} | {{pro_overage_3}} | {{enterprise_overage_3}} |

### 4.3 Overage Caps

| Tier | Monthly Overage Cap | Cap Behavior | Notification Threshold |
|------|---------------------|--------------|------------------------|
| Free | {{free_cap}} | {{free_cap_behavior}} | {{free_notify}} |
| Pro | {{pro_cap}} | {{pro_cap_behavior}} | {{pro_notify}} |
| Enterprise | {{enterprise_cap}} | {{enterprise_cap_behavior}} | {{enterprise_notify}} |

### 4.4 Committed Use Discounts

| Commitment Level | Discount | Minimum Term | Overage Rate Reduction |
|------------------|----------|--------------|------------------------|
| {{commit_1}} | {{discount_1}} | {{term_1}} | {{reduction_1}} |
| {{commit_2}} | {{discount_2}} | {{term_2}} | {{reduction_2}} |
| {{commit_3}} | {{discount_3}} | {{term_3}} | {{reduction_3}} |

---

## Upgrade/Downgrade Rules

### 5.1 Upgrade Paths

| From Tier | To Tier | Allowed | Proration | Effective |
|-----------|---------|---------|-----------|-----------|
| Free | Pro | {{free_to_pro_allowed}} | {{free_to_pro_proration}} | {{free_to_pro_effective}} |
| Free | Enterprise | {{free_to_ent_allowed}} | {{free_to_ent_proration}} | {{free_to_ent_effective}} |
| Pro | Enterprise | {{pro_to_ent_allowed}} | {{pro_to_ent_proration}} | {{pro_to_ent_effective}} |

### 5.2 Downgrade Paths

| From Tier | To Tier | Allowed | Proration | Effective |
|-----------|---------|---------|-----------|-----------|
| Enterprise | Pro | {{ent_to_pro_allowed}} | {{ent_to_pro_proration}} | {{ent_to_pro_effective}} |
| Enterprise | Free | {{ent_to_free_allowed}} | {{ent_to_free_proration}} | {{ent_to_free_effective}} |
| Pro | Free | {{pro_to_free_allowed}} | {{pro_to_free_proration}} | {{pro_to_free_effective}} |

### 5.3 Upgrade/Downgrade Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  Tier Change Processing Flow                     │
│                                                                  │
│  REQUEST_CHANGE ──► VALIDATE_ELIGIBILITY ──► ELIGIBLE           │
│        │                    │                    │               │
│        │                    │                    ▼               │
│        │                    │            CHECK_CHANGE_TYPE       │
│        │                    │                    │               │
│        │                    │         ┌─────────┴─────────┐     │
│        │                    │         ▼                   ▼     │
│        │                    │     UPGRADE             DOWNGRADE │
│        │                    │         │                   │     │
│        │                    │         ▼                   ▼     │
│        │                    │  CALCULATE_PRORATION  CHECK_LIMITS │
│        │                    │         │                   │     │
│        │                    │         │            ┌──────┴──┐  │
│        │                    │         │            ▼         ▼  │
│        │                    │         │      WITHIN_LIMITS OVER │
│        │                    │         │            │         │  │
│        │                    │         │            │    WARN_DATA│
│        │                    │         │            │    LOSS    │
│        │                    │         │            │         │  │
│        │                    │         └─────┬──────┴─────────┘  │
│        │                    │               ▼                    │
│        │                    │         APPLY_CHANGE               │
│        │                    │               │                    │
│        │                    │               ▼                    │
│        │                    │         UPDATE_BILLING             │
│        │                    │               │                    │
│        │                    │               ▼                    │
│        │                    │         NOTIFY_CUSTOMER            │
│        │                    │                                    │
│        │                    └──► NOT_ELIGIBLE ──► RETURN_ERROR  │
│        │                                                         │
│        └──► ERROR ──► LOG_AND_ALERT                             │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Downgrade Data Handling

| Data Type | Downgrade Behavior | Retention Period | Recovery Option |
|-----------|-------------------|------------------|-----------------|
| {{data_type_1}} | {{behavior_1}} | {{retention_1}} | {{recovery_1}} |
| {{data_type_2}} | {{behavior_2}} | {{retention_2}} | {{recovery_2}} |
| {{data_type_3}} | {{behavior_3}} | {{retention_3}} | {{recovery_3}} |
| {{data_type_4}} | {{behavior_4}} | {{retention_4}} | {{recovery_4}} |

### 5.5 Contract Requirements

| Tier Change | Contract Change | Minimum Term | Early Termination |
|-------------|-----------------|--------------|-------------------|
| Free to Pro | {{ftp_contract}} | {{ftp_term}} | {{ftp_termination}} |
| Pro to Enterprise | {{pte_contract}} | {{pte_term}} | {{pte_termination}} |
| Enterprise to Pro | {{etp_contract}} | {{etp_term}} | {{etp_termination}} |
| Pro to Free | {{ptf_contract}} | {{ptf_term}} | {{ptf_termination}} |

---

## Add-ons and Extras

### 6.1 Available Add-ons

| Add-on | Price | Compatible Tiers | Billing |
|--------|-------|------------------|---------|
| {{addon_1}} | {{addon_1_price}} | {{addon_1_tiers}} | {{addon_1_billing}} |
| {{addon_2}} | {{addon_2_price}} | {{addon_2_tiers}} | {{addon_2_billing}} |
| {{addon_3}} | {{addon_3_price}} | {{addon_3_tiers}} | {{addon_3_billing}} |
| {{addon_4}} | {{addon_4_price}} | {{addon_4_tiers}} | {{addon_4_billing}} |

### 6.2 Seat Packages

| Package | Seats | Price | Per-Seat Savings |
|---------|-------|-------|------------------|
| {{package_1}} | {{seats_1}} | {{price_1}} | {{savings_1}} |
| {{package_2}} | {{seats_2}} | {{price_2}} | {{savings_2}} |
| {{package_3}} | {{seats_3}} | {{price_3}} | {{savings_3}} |

---

## Pricing Display

### 7.1 Pricing Page Configuration

| Element | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Price Display | {{free_display}} | {{pro_display}} | {{enterprise_display}} |
| CTA Button | {{free_cta}} | {{pro_cta}} | {{enterprise_cta}} |
| Highlighted | {{free_highlight}} | {{pro_highlight}} | {{enterprise_highlight}} |
| Badge | {{free_badge}} | {{pro_badge}} | {{enterprise_badge}} |

### 7.2 Feature Presentation Order

| Priority | Feature Category | Display Style |
|----------|------------------|---------------|
| 1 | {{category_1}} | {{style_1}} |
| 2 | {{category_2}} | {{style_2}} |
| 3 | {{category_3}} | {{style_3}} |
| 4 | {{category_4}} | {{style_4}} |

---

## Promotional Pricing

### 8.1 Active Promotions

| Promotion | Code | Discount | Valid Until | Applicable Tiers |
|-----------|------|----------|-------------|------------------|
| {{promo_1}} | {{code_1}} | {{discount_1}} | {{valid_1}} | {{tiers_1}} |
| {{promo_2}} | {{code_2}} | {{discount_2}} | {{valid_2}} | {{tiers_2}} |

### 8.2 Startup/Non-profit Programs

| Program | Eligibility | Discount | Duration |
|---------|-------------|----------|----------|
| {{program_1}} | {{eligibility_1}} | {{discount_1}} | {{duration_1}} |
| {{program_2}} | {{eligibility_2}} | {{discount_2}} | {{duration_2}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS pricing tier best practices {date}"
- "usage-based pricing models multi-tenant platforms {date}"
- "enterprise pricing strategies B2B SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Pricing Tier Checklist

- [ ] All tier definitions complete with pricing
- [ ] Feature entitlements documented for each tier
- [ ] Usage limits defined with enforcement rules
- [ ] Overage rates established where applicable
- [ ] Upgrade/downgrade rules documented
- [ ] Add-ons and extras defined
- [ ] Pricing display configuration complete
- [ ] Promotional programs documented
- [ ] All placeholders replaced with actual values
- [ ] Cross-tenant pricing isolation verified

### Business Checklist

- [ ] Pricing competitive with market
- [ ] Feature differentiation clear between tiers
- [ ] Upgrade path encourages growth
- [ ] Enterprise pricing allows flexibility

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
