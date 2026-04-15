---
name: invoice-automation-template
description: Template for automated invoicing system documentation including invoice generation, delivery, payment reconciliation, dunning management, and compliance requirements in multi-tenant SaaS platforms
category: billing
version: 1.0.0
type: template
---

# Invoice Automation Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the invoice automation framework for {{project_name}}, establishing standardized procedures for invoice generation, delivery, payment reconciliation, dunning management, tax handling, and compliance requirements across all tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Invoice Automation Specification |
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

1. [Invoice Generation](#invoice-generation)
2. [Invoice Line Items](#invoice-line-items)
3. [Tax Calculation](#tax-calculation)
4. [Invoice Delivery](#invoice-delivery)
5. [Payment Reconciliation](#payment-reconciliation)
6. [Dunning Management](#dunning-management)
7. [Credit Management](#credit-management)
8. [Invoice Customization](#invoice-customization)
9. [Compliance and Audit](#compliance-and-audit)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

---

## Invoice Generation

### 1.1 Generation Triggers

| Trigger | Description | Timing | Invoice Type |
|---------|-------------|--------|--------------|
| Billing Cycle End | {{cycle_desc}} | {{cycle_timing}} | {{cycle_type}} |
| Usage Threshold | {{threshold_desc}} | {{threshold_timing}} | {{threshold_type}} |
| On-Demand | {{ondemand_desc}} | {{ondemand_timing}} | {{ondemand_type}} |
| Prepaid Exhaustion | {{prepaid_desc}} | {{prepaid_timing}} | {{prepaid_type}} |
| Manual Request | {{manual_desc}} | {{manual_timing}} | {{manual_type}} |

### 1.2 Invoice Generation Schema

```yaml
invoice:
  invoice_id: uuid                    # Unique invoice identifier
  invoice_number: string              # Human-readable invoice number
  tenant_id: uuid                     # Tenant context
  subscription_id: uuid               # Associated subscription
  
  dates:
    issued_date: iso8601              # Invoice issue date
    due_date: iso8601                 # Payment due date
    period_start: iso8601             # Billing period start
    period_end: iso8601               # Billing period end
    
  customer:
    customer_id: uuid                 # Customer identifier
    name: string                      # Customer name
    email: string                     # Billing email
    billing_address: object           # Billing address
    tax_id: string                    # Tax identifier
    
  amounts:
    subtotal: decimal                 # Pre-tax subtotal
    discount: decimal                 # Total discounts
    tax: decimal                      # Total tax
    total: decimal                    # Total amount due
    currency: string                  # ISO currency code
    
  status: enum                        # draft, open, paid, void, uncollectible
  
  payment:
    method: enum                      # card, ach, wire, invoice
    terms_days: integer               # Payment terms
    auto_collection: boolean          # Auto-collect enabled
```

### 1.3 Invoice Generation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Invoice Generation Flow                        │
│                                                                  │
│  TRIGGER ──► COLLECT_USAGE ──► AGGREGATE_CHARGES                │
│      │            │                  │                           │
│      │            │                  ▼                           │
│      │            │           APPLY_DISCOUNTS                    │
│      │            │                  │                           │
│      │            │                  ▼                           │
│      │            │           CALCULATE_TAX                      │
│      │            │                  │                           │
│      │            │                  ▼                           │
│      │            │           CREATE_DRAFT                       │
│      │            │                  │                           │
│      │            │             ┌────┴────┐                      │
│      │            │             ▼         ▼                      │
│      │            │        REVIEW    AUTO_FINALIZE               │
│      │            │             │         │                      │
│      │            │             ▼         │                      │
│      │            │        APPROVE        │                      │
│      │            │             │         │                      │
│      │            │             └────┬────┘                      │
│      │            │                  ▼                           │
│      │            │           FINALIZE_INVOICE                   │
│      │            │                  │                           │
│      │            │                  ▼                           │
│      │            │           ASSIGN_NUMBER                      │
│      │            │                  │                           │
│      │            │                  ▼                           │
│      │            │           SEND_INVOICE                       │
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Invoice Numbering

| Component | Format | Example | Tenant Customizable |
|-----------|--------|---------|---------------------|
| Prefix | {{prefix_format}} | {{prefix_example}} | {{prefix_custom}} |
| Year | {{year_format}} | {{year_example}} | {{year_custom}} |
| Sequence | {{sequence_format}} | {{sequence_example}} | {{sequence_custom}} |
| Suffix | {{suffix_format}} | {{suffix_example}} | {{suffix_custom}} |

### 1.5 Generation Configuration by Tier

| Tier | Generation Timing | Review Required | Auto-Send |
|------|-------------------|-----------------|-----------|
| Free | {{free_timing}} | {{free_review}} | {{free_autosend}} |
| Pro | {{pro_timing}} | {{pro_review}} | {{pro_autosend}} |
| Enterprise | {{enterprise_timing}} | {{enterprise_review}} | {{enterprise_autosend}} |

---

## Invoice Line Items

### 2.1 Line Item Types

| Type | Description | Calculation | Taxable |
|------|-------------|-------------|---------|
| Subscription | {{sub_desc}} | {{sub_calc}} | {{sub_taxable}} |
| Usage | {{usage_desc}} | {{usage_calc}} | {{usage_taxable}} |
| Overage | {{overage_desc}} | {{overage_calc}} | {{overage_taxable}} |
| Add-on | {{addon_desc}} | {{addon_calc}} | {{addon_taxable}} |
| One-time | {{onetime_desc}} | {{onetime_calc}} | {{onetime_taxable}} |
| Credit | {{credit_desc}} | {{credit_calc}} | {{credit_taxable}} |
| Adjustment | {{adjust_desc}} | {{adjust_calc}} | {{adjust_taxable}} |

### 2.2 Line Item Schema

```yaml
invoice_line_item:
  line_id: uuid                       # Line item identifier
  invoice_id: uuid                    # Parent invoice
  
  item:
    type: enum                        # subscription, usage, credit, etc.
    description: string               # Line description
    product_id: string                # Product reference
    
  quantity:
    amount: decimal                   # Quantity
    unit: string                      # Unit of measure
    
  pricing:
    unit_price: decimal               # Price per unit
    discount: decimal                 # Line discount
    amount: decimal                   # Line total
    
  period:
    start: iso8601                    # Service period start
    end: iso8601                      # Service period end
    
  tax:
    taxable: boolean                  # Is taxable
    tax_code: string                  # Tax classification
    tax_amount: decimal               # Tax amount
    
  metadata:
    meter_id: string                  # Usage meter reference
    proration: boolean                # Is prorated
    custom: object                    # Custom metadata
```

### 2.3 Line Item Aggregation Rules

| Item Type | Aggregation | Grouping | Display Order |
|-----------|-------------|----------|---------------|
| Subscription | {{sub_aggregation}} | {{sub_grouping}} | {{sub_order}} |
| Usage | {{usage_aggregation}} | {{usage_grouping}} | {{usage_order}} |
| One-time | {{onetime_aggregation}} | {{onetime_grouping}} | {{onetime_order}} |
| Credits | {{credit_aggregation}} | {{credit_grouping}} | {{credit_order}} |

### 2.4 Proration Rules

| Scenario | Proration Method | Calculation |
|----------|------------------|-------------|
| Mid-cycle Upgrade | {{upgrade_proration}} | {{upgrade_calc}} |
| Mid-cycle Downgrade | {{downgrade_proration}} | {{downgrade_calc}} |
| Mid-cycle Add | {{add_proration}} | {{add_calc}} |
| Mid-cycle Remove | {{remove_proration}} | {{remove_calc}} |

---

## Tax Calculation

### 3.1 Tax Configuration

| Region | Tax Type | Rate | Calculation Method |
|--------|----------|------|-------------------|
| {{region_1}} | {{tax_type_1}} | {{rate_1}} | {{calc_method_1}} |
| {{region_2}} | {{tax_type_2}} | {{rate_2}} | {{calc_method_2}} |
| {{region_3}} | {{tax_type_3}} | {{rate_3}} | {{calc_method_3}} |
| {{region_4}} | {{tax_type_4}} | {{rate_4}} | {{calc_method_4}} |

### 3.2 Tax Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tax Calculation Flow                          │
│                                                                  │
│  LINE_ITEMS ──► DETERMINE_NEXUS ──► CUSTOMER_LOCATION           │
│       │               │                   │                      │
│       │               │                   ▼                      │
│       │               │           CHECK_TAX_EXEMPT               │
│       │               │                   │                      │
│       │               │              ┌────┴────┐                 │
│       │               │              ▼         ▼                 │
│       │               │           EXEMPT   TAXABLE               │
│       │               │              │         │                 │
│       │               │              │         ▼                 │
│       │               │              │    LOOKUP_RATES           │
│       │               │              │         │                 │
│       │               │              │         ▼                 │
│       │               │              │    APPLY_PRODUCT_TAX_CODE │
│       │               │              │         │                 │
│       │               │              │         ▼                 │
│       │               │              │    CALCULATE_TAX_AMOUNT   │
│       │               │              │         │                 │
│       │               │              └────┬────┘                 │
│       │               │                   ▼                      │
│       │               │           AGGREGATE_BY_JURISDICTION      │
│       │               │                   │                      │
│       │               │                   ▼                      │
│       │               │           ADD_TAX_LINE_ITEMS             │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Tax Exemption Handling

| Exemption Type | Documentation Required | Validation | Expiry Handling |
|----------------|------------------------|------------|-----------------|
| Reseller | {{reseller_docs}} | {{reseller_validate}} | {{reseller_expiry}} |
| Non-Profit | {{nonprofit_docs}} | {{nonprofit_validate}} | {{nonprofit_expiry}} |
| Government | {{govt_docs}} | {{govt_validate}} | {{govt_expiry}} |
| International | {{intl_docs}} | {{intl_validate}} | {{intl_expiry}} |

### 3.4 Tax Integration Schema

```yaml
tax_calculation:
  invoice_id: uuid                    # Invoice reference
  calculation_date: iso8601           # Calculation timestamp
  
  seller:
    address: object                   # Seller address
    nexus: array                      # Nexus jurisdictions
    
  buyer:
    address: object                   # Buyer address
    tax_id: string                    # Tax identifier
    exemption_certificate: string     # Exemption reference
    
  line_taxes:
    - line_id: uuid                   # Line reference
      taxable_amount: decimal         # Taxable amount
      tax_code: string                # Tax classification
      jurisdictions:
        - name: string                # Jurisdiction name
          type: enum                  # state, county, city, district
          rate: percentage            # Tax rate
          amount: decimal             # Tax amount
          
  totals:
    taxable: decimal                  # Total taxable
    exempt: decimal                   # Total exempt
    tax: decimal                      # Total tax
```

---

## Invoice Delivery

### 4.1 Delivery Channels

| Channel | Configuration | Format | Timing |
|---------|--------------|--------|--------|
| Email | {{email_config}} | {{email_format}} | {{email_timing}} |
| Portal | {{portal_config}} | {{portal_format}} | {{portal_timing}} |
| API/Webhook | {{api_config}} | {{api_format}} | {{api_timing}} |
| PDF Download | {{pdf_config}} | {{pdf_format}} | {{pdf_timing}} |
| EDI | {{edi_config}} | {{edi_format}} | {{edi_timing}} |

### 4.2 Email Delivery Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Email Delivery Flow                           │
│                                                                  │
│  INVOICE_FINALIZED ──► GENERATE_PDF ──► COMPOSE_EMAIL           │
│         │                   │               │                    │
│         │                   │               ▼                    │
│         │                   │         ATTACH_INVOICE             │
│         │                   │               │                    │
│         │                   │               ▼                    │
│         │                   │         PERSONALIZE_CONTENT        │
│         │                   │               │                    │
│         │                   │               ▼                    │
│         │                   │         GET_RECIPIENTS             │
│         │                   │               │                    │
│         │                   │               ▼                    │
│         │                   │         SEND_EMAIL                 │
│         │                   │               │                    │
│         │                   │          ┌────┴────┐               │
│         │                   │          ▼         ▼               │
│         │                   │      DELIVERED   BOUNCED           │
│         │                   │          │         │               │
│         │                   │          │         ▼               │
│         │                   │          │    RETRY_OR_ALERT       │
│         │                   │          │                         │
│         │                   │          ▼                         │
│         │                   │      LOG_DELIVERY                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Delivery Configuration by Tier

| Tier | Primary Channel | Secondary Channel | Custom Branding |
|------|-----------------|-------------------|-----------------|
| Free | {{free_primary}} | {{free_secondary}} | {{free_branding}} |
| Pro | {{pro_primary}} | {{pro_secondary}} | {{pro_branding}} |
| Enterprise | {{enterprise_primary}} | {{enterprise_secondary}} | {{enterprise_branding}} |

### 4.4 Delivery Tracking

| Event | Description | Retention | Analytics |
|-------|-------------|-----------|-----------|
| Sent | {{sent_desc}} | {{sent_retention}} | {{sent_analytics}} |
| Delivered | {{delivered_desc}} | {{delivered_retention}} | {{delivered_analytics}} |
| Opened | {{opened_desc}} | {{opened_retention}} | {{opened_analytics}} |
| Clicked | {{clicked_desc}} | {{clicked_retention}} | {{clicked_analytics}} |
| Bounced | {{bounced_desc}} | {{bounced_retention}} | {{bounced_analytics}} |

---

## Payment Reconciliation

### 5.1 Reconciliation Rules

| Payment Source | Matching Criteria | Auto-Apply | Exception Handling |
|----------------|-------------------|------------|-------------------|
| Card Payment | {{card_criteria}} | {{card_auto}} | {{card_exception}} |
| ACH/Bank | {{ach_criteria}} | {{ach_auto}} | {{ach_exception}} |
| Wire Transfer | {{wire_criteria}} | {{wire_auto}} | {{wire_exception}} |
| Check | {{check_criteria}} | {{check_auto}} | {{check_exception}} |
| Credit | {{credit_criteria}} | {{credit_auto}} | {{credit_exception}} |

### 5.2 Reconciliation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Payment Reconciliation Flow                    │
│                                                                  │
│  PAYMENT_RECEIVED ──► IDENTIFY_CUSTOMER ──► MATCH_INVOICE       │
│         │                    │                   │               │
│         │                    │              ┌────┴────┐          │
│         │                    │              ▼         ▼          │
│         │                    │          MATCHED   UNMATCHED      │
│         │                    │              │         │          │
│         │                    │              │         ▼          │
│         │                    │              │    MANUAL_REVIEW   │
│         │                    │              │         │          │
│         │                    │              ▼         │          │
│         │                    │         APPLY_PAYMENT │          │
│         │                    │              │         │          │
│         │                    │         ┌────┴────┐    │          │
│         │                    │         ▼         ▼   │          │
│         │                    │     FULL     PARTIAL  │          │
│         │                    │         │         │   │          │
│         │                    │         │         ▼   │          │
│         │                    │         │    SPLIT_OR │          │
│         │                    │         │    CREDIT   │          │
│         │                    │         │         │   │          │
│         │                    │         └────┬────┘   │          │
│         │                    │              ▼        │          │
│         │                    │         UPDATE_STATUS │          │
│         │                    │              │        │          │
│         │                    │              ▼        │          │
│         │                    │         SEND_RECEIPT  │          │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Payment Allocation Schema

```yaml
payment_allocation:
  payment_id: uuid                    # Payment identifier
  tenant_id: uuid                     # Tenant context
  
  payment:
    amount: decimal                   # Payment amount
    currency: string                  # Currency code
    method: enum                      # Payment method
    reference: string                 # Payment reference
    received_at: iso8601              # Receipt timestamp
    
  allocations:
    - invoice_id: uuid                # Invoice reference
      amount: decimal                 # Amount applied
      applied_at: iso8601             # Application timestamp
      
  remaining:
    amount: decimal                   # Unallocated amount
    disposition: enum                 # credit, refund, pending
    
  reconciliation:
    status: enum                      # matched, partial, unmatched
    matched_by: enum                  # auto, manual
    matched_at: iso8601               # Match timestamp
    notes: string                     # Reconciliation notes
```

### 5.4 Overpayment Handling

| Scenario | Action | Customer Notification | Accounting |
|----------|--------|----------------------|------------|
| Small Overpayment | {{small_action}} | {{small_notify}} | {{small_accounting}} |
| Large Overpayment | {{large_action}} | {{large_notify}} | {{large_accounting}} |
| Duplicate Payment | {{dup_action}} | {{dup_notify}} | {{dup_accounting}} |
| Advance Payment | {{advance_action}} | {{advance_notify}} | {{advance_accounting}} |

---

## Dunning Management

### 6.1 Dunning Schedule

| Attempt | Days After Due | Communication | Retry Payment | Action |
|---------|----------------|---------------|---------------|--------|
| 1 | {{attempt_1_days}} | {{attempt_1_comm}} | {{attempt_1_retry}} | {{attempt_1_action}} |
| 2 | {{attempt_2_days}} | {{attempt_2_comm}} | {{attempt_2_retry}} | {{attempt_2_action}} |
| 3 | {{attempt_3_days}} | {{attempt_3_comm}} | {{attempt_3_retry}} | {{attempt_3_action}} |
| 4 | {{attempt_4_days}} | {{attempt_4_comm}} | {{attempt_4_retry}} | {{attempt_4_action}} |
| Final | {{final_days}} | {{final_comm}} | {{final_retry}} | {{final_action}} |

### 6.2 Dunning Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       Dunning Flow                               │
│                                                                  │
│  INVOICE_OVERDUE ──► CHECK_PAYMENT_STATUS ──► STILL_UNPAID?     │
│         │                    │                     │             │
│         │                    │                ┌────┴────┐        │
│         │                    │                ▼         ▼        │
│         │                    │             UNPAID     PAID       │
│         │                    │                │         │        │
│         │                    │                │         ▼        │
│         │                    │                │    EXIT_DUNNING  │
│         │                    │                │                  │
│         │                    │                ▼                  │
│         │                    │         DUNNING_ATTEMPT           │
│         │                    │                │                  │
│         │                    │           ┌────┴────┐             │
│         │                    │           ▼         ▼             │
│         │                    │       RETRY_PAY  NOTIFY           │
│         │                    │           │         │             │
│         │                    │      ┌────┴────┐    │             │
│         │                    │      ▼         ▼    │             │
│         │                    │   SUCCESS   FAILED  │             │
│         │                    │      │         │    │             │
│         │                    │      │         └────┴──► SCHEDULE │
│         │                    │      │                   NEXT     │
│         │                    │      │                     │      │
│         │                    │      │              ┌──────┴────┐ │
│         │                    │      │              ▼           ▼ │
│         │                    │      │         MORE_ATTEMPTS  FINAL│
│         │                    │      │              │           │ │
│         │                    │      │              │           ▼ │
│         │                    │      │              │    ESCALATE │
│         │                    │      │              │           │ │
│         │                    │      └──────────────┴───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Communication Templates by Stage

| Stage | Subject | Tone | Call to Action |
|-------|---------|------|----------------|
| Reminder | {{reminder_subject}} | {{reminder_tone}} | {{reminder_cta}} |
| Warning | {{warning_subject}} | {{warning_tone}} | {{warning_cta}} |
| Urgent | {{urgent_subject}} | {{urgent_tone}} | {{urgent_cta}} |
| Final Notice | {{final_subject}} | {{final_tone}} | {{final_cta}} |
| Suspension | {{suspension_subject}} | {{suspension_tone}} | {{suspension_cta}} |

### 6.4 Service Impact by Dunning Stage

| Stage | Service Access | Feature Limits | Data Access |
|-------|----------------|----------------|-------------|
| Overdue 1-7 days | {{access_1_7}} | {{limits_1_7}} | {{data_1_7}} |
| Overdue 8-14 days | {{access_8_14}} | {{limits_8_14}} | {{data_8_14}} |
| Overdue 15-30 days | {{access_15_30}} | {{limits_15_30}} | {{data_15_30}} |
| Overdue 30+ days | {{access_30plus}} | {{limits_30plus}} | {{data_30plus}} |

### 6.5 Dunning Configuration Schema

```yaml
dunning_config:
  tenant_tier: enum                   # Plan-specific dunning
  
  schedule:
    - attempt: integer                # Attempt number
      days_after_due: integer         # Days after due date
      actions:
        retry_payment: boolean        # Attempt payment
        send_notification: boolean    # Send communication
        template: string              # Template to use
        channels: array               # Email, SMS, etc.
        
  service_impact:
    grace_period_days: integer        # Full access period
    degradation_schedule:
      - days: integer                 # Days overdue
        access_level: enum            # full, limited, readonly, suspended
        
  escalation:
    internal_notification_days: integer # Alert internal team
    collection_handoff_days: integer  # External collection
    write_off_days: integer           # Write off threshold
```

---

## Credit Management

### 7.1 Credit Types

| Type | Description | Expiration | Usage Priority |
|------|-------------|------------|----------------|
| Promotional | {{promo_desc}} | {{promo_expiry}} | {{promo_priority}} |
| Refund | {{refund_desc}} | {{refund_expiry}} | {{refund_priority}} |
| Goodwill | {{goodwill_desc}} | {{goodwill_expiry}} | {{goodwill_priority}} |
| Prepaid | {{prepaid_desc}} | {{prepaid_expiry}} | {{prepaid_priority}} |
| Referral | {{referral_desc}} | {{referral_expiry}} | {{referral_priority}} |

### 7.2 Credit Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Credit Application Flow                       │
│                                                                  │
│  INVOICE_GENERATED ──► CHECK_CREDITS ──► CREDITS_AVAILABLE?     │
│         │                    │                  │                │
│         │                    │             ┌────┴────┐           │
│         │                    │             ▼         ▼           │
│         │                    │           YES        NO           │
│         │                    │             │         │           │
│         │                    │             │         ▼           │
│         │                    │             │    SKIP_CREDITS     │
│         │                    │             │                     │
│         │                    │             ▼                     │
│         │                    │      SORT_BY_PRIORITY             │
│         │                    │             │                     │
│         │                    │             ▼                     │
│         │                    │      APPLY_CREDITS                │
│         │                    │             │                     │
│         │                    │        ┌────┴────┐                │
│         │                    │        ▼         ▼                │
│         │                    │    FULL_COVER  PARTIAL            │
│         │                    │        │         │                │
│         │                    │        │         ▼                │
│         │                    │        │    REMAINING_DUE         │
│         │                    │        │         │                │
│         │                    │        └────┬────┘                │
│         │                    │             ▼                     │
│         │                    │      UPDATE_BALANCES              │
│         │                    │             │                     │
│         │                    │             ▼                     │
│         │                    │      ADD_CREDIT_LINE_ITEMS        │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Credit Schema

```yaml
credit:
  credit_id: uuid                     # Credit identifier
  tenant_id: uuid                     # Tenant context
  
  credit:
    type: enum                        # promotional, refund, goodwill
    original_amount: decimal          # Original credit amount
    remaining_amount: decimal         # Remaining balance
    currency: string                  # Currency code
    
  validity:
    issued_at: iso8601                # Issue date
    expires_at: iso8601               # Expiration date
    
  source:
    reason: string                    # Credit reason
    reference: string                 # Reference (invoice, ticket, etc.)
    approved_by: uuid                 # Approver
    
  application:
    priority: integer                 # Application priority
    restrictions: object              # Usage restrictions
    
  history:
    - applied_at: iso8601             # Application date
      invoice_id: uuid                # Invoice applied to
      amount: decimal                 # Amount applied
```

---

## Invoice Customization

### 8.1 Customization Options by Tier

| Element | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Logo | {{free_logo}} | {{pro_logo}} | {{enterprise_logo}} |
| Colors | {{free_colors}} | {{pro_colors}} | {{enterprise_colors}} |
| Custom Fields | {{free_fields}} | {{pro_fields}} | {{enterprise_fields}} |
| Footer Text | {{free_footer}} | {{pro_footer}} | {{enterprise_footer}} |
| Template Override | {{free_template}} | {{pro_template}} | {{enterprise_template}} |

### 8.2 White-Label Configuration

| Setting | Description | Validation |
|---------|-------------|------------|
| Company Logo | {{logo_desc}} | {{logo_validation}} |
| Company Name | {{name_desc}} | {{name_validation}} |
| Contact Info | {{contact_desc}} | {{contact_validation}} |
| Payment Instructions | {{payment_desc}} | {{payment_validation}} |
| Terms & Conditions | {{terms_desc}} | {{terms_validation}} |

### 8.3 Custom Field Schema

```yaml
invoice_custom_fields:
  tenant_id: uuid                     # Tenant context
  
  header_fields:
    - field_id: string                # Field identifier
      label: string                   # Display label
      value: string                   # Field value
      position: enum                  # left, center, right
      
  line_item_fields:
    - field_id: string                # Field identifier
      label: string                   # Column header
      source: string                  # Data source
      format: string                  # Display format
      
  footer_fields:
    - field_id: string                # Field identifier
      content: string                 # Footer content
      type: enum                      # text, legal, payment
```

### 8.4 PDF Template Configuration

| Section | Content | Customizable | Max Length |
|---------|---------|--------------|------------|
| Header | {{header_content}} | {{header_custom}} | {{header_max}} |
| Seller Info | {{seller_content}} | {{seller_custom}} | {{seller_max}} |
| Buyer Info | {{buyer_content}} | {{buyer_custom}} | {{buyer_max}} |
| Line Items | {{lines_content}} | {{lines_custom}} | {{lines_max}} |
| Totals | {{totals_content}} | {{totals_custom}} | {{totals_max}} |
| Footer | {{footer_content}} | {{footer_custom}} | {{footer_max}} |
| Payment Info | {{payment_content}} | {{payment_custom}} | {{payment_max}} |

---

## Compliance and Audit

### 9.1 Compliance Requirements

| Requirement | Description | Implementation | Audit Frequency |
|-------------|-------------|----------------|-----------------|
| Invoice Retention | {{retention_desc}} | {{retention_impl}} | {{retention_audit}} |
| Sequential Numbering | {{sequential_desc}} | {{sequential_impl}} | {{sequential_audit}} |
| Tax Compliance | {{tax_desc}} | {{tax_impl}} | {{tax_audit}} |
| Currency Display | {{currency_desc}} | {{currency_impl}} | {{currency_audit}} |
| Data Protection | {{data_desc}} | {{data_impl}} | {{data_audit}} |

### 9.2 Audit Trail Schema

```yaml
invoice_audit:
  audit_id: uuid                      # Audit entry identifier
  invoice_id: uuid                    # Invoice reference
  tenant_id: uuid                     # Tenant context
  
  event:
    type: enum                        # created, updated, voided, etc.
    timestamp: iso8601                # Event timestamp
    
  actor:
    user_id: uuid                     # User identifier
    user_type: enum                   # system, admin, customer
    ip_address: string                # IP address
    
  changes:
    before: object                    # State before change
    after: object                     # State after change
    reason: string                    # Change reason
    
  compliance:
    immutable_fields: array           # Fields that cannot change
    hash: string                      # Content hash
    signature: string                 # Digital signature
```

### 9.3 Retention Policies

| Document Type | Retention Period | Storage | Deletion Policy |
|---------------|------------------|---------|-----------------|
| Invoices | {{invoice_retention}} | {{invoice_storage}} | {{invoice_deletion}} |
| Payment Records | {{payment_retention}} | {{payment_storage}} | {{payment_deletion}} |
| Tax Documents | {{tax_retention}} | {{tax_storage}} | {{tax_deletion}} |
| Audit Logs | {{audit_retention}} | {{audit_storage}} | {{audit_deletion}} |
| Communications | {{comm_retention}} | {{comm_storage}} | {{comm_deletion}} |

### 9.4 Compliance Reports

| Report | Content | Frequency | Recipients |
|--------|---------|-----------|------------|
| Revenue Recognition | {{rev_content}} | {{rev_frequency}} | {{rev_recipients}} |
| Tax Summary | {{tax_content}} | {{tax_frequency}} | {{tax_recipients}} |
| Aging Report | {{aging_content}} | {{aging_frequency}} | {{aging_recipients}} |
| Audit Summary | {{audit_content}} | {{audit_frequency}} | {{audit_recipients}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "automated invoice generation SaaS billing best practices {date}"
- "dunning management strategies subscription billing {date}"
- "invoice compliance requirements multi-tenant SaaS {date}"
- "payment reconciliation automation patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Invoice Automation Checklist

- [ ] Invoice generation triggers configured
- [ ] Line item types defined with calculations
- [ ] Tax calculation integrated
- [ ] Delivery channels configured
- [ ] Payment reconciliation rules defined
- [ ] Dunning schedule configured
- [ ] Credit management implemented
- [ ] Customization options by tier defined
- [ ] Compliance requirements addressed
- [ ] All placeholders replaced with actual values

### Technical Checklist

- [ ] Invoice numbering sequential and unique
- [ ] PDF generation tested
- [ ] Email delivery verified
- [ ] Tax calculations validated
- [ ] Reconciliation accuracy confirmed
- [ ] Audit trail capturing all changes
- [ ] Cross-tenant isolation verified

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
