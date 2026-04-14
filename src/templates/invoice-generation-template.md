---
name: invoice-generation-template
description: Template for invoice generation workflows including usage line items, tax calculation, currency handling, and PDF generation in multi-tenant SaaS platforms
category: billing
version: 1.0.0
type: template
---

# Invoice Generation Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the invoice generation framework for {{project_name}}, establishing standardized procedures for invoice components, usage line item calculation, tax computation, multi-currency handling, and PDF generation specifications across all tenant tiers.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | Invoice Generation Specification |
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

1. [Invoice Components](#invoice-components)
2. [Usage Line Items](#usage-line-items)
3. [Tax Calculation](#tax-calculation)
4. [Currency Handling](#currency-handling)
5. [PDF Generation Specification](#pdf-generation-specification)
6. [Invoice Lifecycle](#invoice-lifecycle)
7. [Tenant Tier Considerations](#tenant-tier-considerations)
8. [Delivery and Notifications](#delivery-and-notifications)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## Invoice Components

### 1.1 Invoice Header Structure

| Field | Description | Source | Required |
|-------|-------------|--------|----------|
| Invoice Number | {{invoice_number_format}} | {{invoice_number_source}} | Yes |
| Invoice Date | {{invoice_date_format}} | {{invoice_date_source}} | Yes |
| Due Date | {{due_date_format}} | {{due_date_source}} | Yes |
| Billing Period | {{period_format}} | {{period_source}} | Yes |
| Tenant ID | {{tenant_id_format}} | {{tenant_id_source}} | Yes |
| Customer Name | {{customer_name_format}} | {{customer_name_source}} | Yes |
| Customer Address | {{address_format}} | {{address_source}} | Yes |
| Tax ID | {{tax_id_format}} | {{tax_id_source}} | Conditional |

### 1.2 Invoice Data Schema

```yaml
invoice:
  invoice_id: uuid                    # Unique invoice identifier
  invoice_number: string              # Human-readable number
  tenant_id: uuid                     # Associated tenant
  customer_id: uuid                   # Customer reference
  status: enum                        # draft, finalized, sent, paid, void
  billing_period:
    start: iso8601                    # Period start date
    end: iso8601                      # Period end date
  currency: string                    # ISO 4217 currency code
  subtotal: decimal                   # Sum of line items before tax
  tax_amount: decimal                 # Total tax amount
  total: decimal                      # Final invoice amount
  amount_due: decimal                 # Remaining balance
  created_at: iso8601
  finalized_at: iso8601
  due_at: iso8601
  metadata:
    tenant_tier: string               # Tenant tier at invoice time
    {{custom_invoice_field}}: {{custom_invoice_type}}
```

### 1.3 Invoice Line Item Types

| Line Type | Code | Description | Tax Treatment |
|-----------|------|-------------|---------------|
| Subscription | {{subscription_code}} | Recurring subscription charges | {{subscription_tax}} |
| Usage Overage | {{overage_code}} | Usage beyond included amounts | {{overage_tax}} |
| Add-on | {{addon_code}} | Optional add-on services | {{addon_tax}} |
| One-time | {{onetime_code}} | One-time setup or service fees | {{onetime_tax}} |
| Credit | {{credit_code}} | Applied credits or adjustments | {{credit_tax}} |
| Discount | {{discount_code}} | Promotional or negotiated discounts | {{discount_tax}} |
| Proration | {{proration_code}} | Mid-cycle plan changes | {{proration_tax}} |

### 1.4 Seller Information

| Field | Value | Display Location |
|-------|-------|------------------|
| Company Name | {{seller_company}} | {{seller_company_location}} |
| Address | {{seller_address}} | {{seller_address_location}} |
| Tax ID | {{seller_tax_id}} | {{seller_tax_location}} |
| Contact Email | {{seller_email}} | {{seller_email_location}} |
| Contact Phone | {{seller_phone}} | {{seller_phone_location}} |
| Logo | {{seller_logo}} | {{seller_logo_location}} |

---

## Usage Line Items

### 2.1 Usage Metrics Configuration

| Metric | Unit | Aggregation | Pricing Model | Rounding |
|--------|------|-------------|---------------|----------|
| {{metric_1}} | {{unit_1}} | {{agg_1}} | {{model_1}} | {{rounding_1}} |
| {{metric_2}} | {{unit_2}} | {{agg_2}} | {{model_2}} | {{rounding_2}} |
| {{metric_3}} | {{unit_3}} | {{agg_3}} | {{model_3}} | {{rounding_3}} |
| {{metric_4}} | {{unit_4}} | {{agg_4}} | {{model_4}} | {{rounding_4}} |

### 2.2 Usage Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Usage Line Item Calculation                    │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Usage     │───►│   Meter     │───►│  Aggregate  │         │
│  │   Events    │    │   Service   │    │   by Period │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            ▼                   ▼                 │
│                     ┌─────────────────────────────────┐         │
│                     │     Apply Included Amounts      │         │
│                     │       (per tenant tier)         │         │
│                     └────────────────┬────────────────┘         │
│                                      │                          │
│                            ┌─────────┴─────────┐                │
│                            ▼                   ▼                │
│                     ┌───────────┐       ┌───────────┐           │
│                     │  Apply    │       │  Calculate │          │
│                     │  Pricing  │       │  Overage   │          │
│                     └─────┬─────┘       └─────┬─────┘           │
│                           │                   │                  │
│                           └─────────┬─────────┘                  │
│                                     ▼                            │
│                            ┌───────────────┐                    │
│                            │  Line Items   │                    │
│                            └───────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Tiered Pricing Configuration

| Tier Range | Unit Price | Cumulative | Description |
|------------|------------|------------|-------------|
| {{tier_1_range}} | {{tier_1_price}} | {{tier_1_cumulative}} | {{tier_1_desc}} |
| {{tier_2_range}} | {{tier_2_price}} | {{tier_2_cumulative}} | {{tier_2_desc}} |
| {{tier_3_range}} | {{tier_3_price}} | {{tier_3_cumulative}} | {{tier_3_desc}} |
| {{tier_4_range}} | {{tier_4_price}} | {{tier_4_cumulative}} | {{tier_4_desc}} |

### 2.4 Usage Line Item Schema

```yaml
usage_line_item:
  line_item_id: uuid                  # Unique line item ID
  invoice_id: uuid                    # Parent invoice
  tenant_id: uuid                     # Tenant context
  metric_name: string                 # Usage metric identifier
  description: string                 # Human-readable description
  quantity: decimal                   # Total usage quantity
  included_quantity: decimal          # Amount included in plan
  billable_quantity: decimal          # Quantity to bill
  unit_price: decimal                 # Price per unit
  amount: decimal                     # Line item total
  period:
    start: iso8601                    # Usage period start
    end: iso8601                      # Usage period end
  pricing_model: enum                 # flat, tiered, volume, package
  metadata:
    usage_record_ids: array           # Source usage records
    {{custom_usage_field}}: {{custom_usage_type}}
```

### 2.5 Included Amounts by Tier

| Metric | Free Included | Pro Included | Enterprise Included |
|--------|---------------|--------------|---------------------|
| {{metric_1}} | {{free_inc_1}} | {{pro_inc_1}} | {{enterprise_inc_1}} |
| {{metric_2}} | {{free_inc_2}} | {{pro_inc_2}} | {{enterprise_inc_2}} |
| {{metric_3}} | {{free_inc_3}} | {{pro_inc_3}} | {{enterprise_inc_3}} |
| {{metric_4}} | {{free_inc_4}} | {{pro_inc_4}} | {{enterprise_inc_4}} |

---

## Tax Calculation

### 3.1 Tax Configuration

| Jurisdiction | Tax Type | Rate | Applies To | Registration Required |
|--------------|----------|------|------------|----------------------|
| {{jurisdiction_1}} | {{tax_type_1}} | {{rate_1}} | {{applies_1}} | {{registration_1}} |
| {{jurisdiction_2}} | {{tax_type_2}} | {{rate_2}} | {{applies_2}} | {{registration_2}} |
| {{jurisdiction_3}} | {{tax_type_3}} | {{rate_3}} | {{applies_3}} | {{registration_3}} |
| {{jurisdiction_4}} | {{tax_type_4}} | {{rate_4}} | {{applies_4}} | {{registration_4}} |

### 3.2 Tax Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      Tax Calculation Flow                        │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Customer   │───►│ Determine   │───►│  Check Tax  │         │
│  │  Location   │    │ Jurisdiction│    │  Exemptions │         │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘         │
│                            │                   │                 │
│                            ▼                   ▼                 │
│                     ┌─────────────────────────────────┐         │
│                     │      Product Taxability         │         │
│                     │    (per line item category)     │         │
│                     └────────────────┬────────────────┘         │
│                                      │                          │
│                            ┌─────────┴─────────┐                │
│                            ▼                   ▼                │
│                     ┌───────────┐       ┌───────────┐           │
│                     │   Apply   │       │  External │           │
│                     │   Rates   │       │  Tax API  │           │
│                     └─────┬─────┘       └─────┬─────┘           │
│                           │                   │                  │
│                           └─────────┬─────────┘                  │
│                                     ▼                            │
│                            ┌───────────────┐                    │
│                            │  Tax Amount   │                    │
│                            └───────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Tax Exemption Handling

| Exemption Type | Documentation Required | Validation | Renewal |
|----------------|----------------------|------------|---------|
| Non-profit | {{nonprofit_docs}} | {{nonprofit_validation}} | {{nonprofit_renewal}} |
| Government | {{government_docs}} | {{government_validation}} | {{government_renewal}} |
| Resale | {{resale_docs}} | {{resale_validation}} | {{resale_renewal}} |
| B2B Reverse Charge | {{b2b_docs}} | {{b2b_validation}} | {{b2b_renewal}} |

### 3.4 Tax Provider Integration

| Setting | Value | Environment |
|---------|-------|-------------|
| Tax Provider | {{tax_provider}} | All |
| API Endpoint | {{tax_api_endpoint}} | {{tax_api_env}} |
| API Key | {{tax_api_key_location}} | {{tax_api_key_env}} |
| Fallback Mode | {{tax_fallback}} | All |
| Cache Duration | {{tax_cache}} | All |

---

## Currency Handling

### 4.1 Supported Currencies

| Currency | Code | Symbol | Decimal Places | Display Format |
|----------|------|--------|----------------|----------------|
| {{currency_1}} | {{code_1}} | {{symbol_1}} | {{decimals_1}} | {{format_1}} |
| {{currency_2}} | {{code_2}} | {{symbol_2}} | {{decimals_2}} | {{format_2}} |
| {{currency_3}} | {{code_3}} | {{symbol_3}} | {{decimals_3}} | {{format_3}} |
| {{currency_4}} | {{code_4}} | {{symbol_4}} | {{decimals_4}} | {{format_4}} |

### 4.2 Currency Determination

| Priority | Method | Description |
|----------|--------|-------------|
| 1 | {{priority_1_method}} | {{priority_1_desc}} |
| 2 | {{priority_2_method}} | {{priority_2_desc}} |
| 3 | {{priority_3_method}} | {{priority_3_desc}} |
| Default | {{default_currency}} | {{default_desc}} |

### 4.3 Exchange Rate Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Rate Source | {{rate_source}} | Exchange rate provider |
| Update Frequency | {{rate_frequency}} | How often rates refresh |
| Lock-in Period | {{rate_lock}} | When rate is locked for invoice |
| Fallback Rate | {{rate_fallback}} | Default if API unavailable |

### 4.4 Multi-Currency Invoice Schema

```yaml
invoice_currency:
  invoice_id: uuid                    # Parent invoice
  presentation_currency: string       # Customer display currency
  settlement_currency: string         # Company accounting currency
  exchange_rate: decimal              # Applied exchange rate
  rate_locked_at: iso8601             # When rate was locked
  rate_source: string                 # Rate provider
  amounts:
    subtotal_presentation: decimal    # Subtotal in display currency
    subtotal_settlement: decimal      # Subtotal in accounting currency
    tax_presentation: decimal         # Tax in display currency
    tax_settlement: decimal           # Tax in accounting currency
    total_presentation: decimal       # Total in display currency
    total_settlement: decimal         # Total in accounting currency
```

---

## PDF Generation Specification

### 5.1 PDF Layout Structure

| Section | Position | Content | Required |
|---------|----------|---------|----------|
| Header | {{header_position}} | {{header_content}} | Yes |
| Seller Info | {{seller_position}} | {{seller_content}} | Yes |
| Buyer Info | {{buyer_position}} | {{buyer_content}} | Yes |
| Invoice Details | {{details_position}} | {{details_content}} | Yes |
| Line Items | {{items_position}} | {{items_content}} | Yes |
| Subtotals | {{subtotals_position}} | {{subtotals_content}} | Yes |
| Tax Summary | {{tax_position}} | {{tax_content}} | Conditional |
| Total | {{total_position}} | {{total_content}} | Yes |
| Payment Info | {{payment_position}} | {{payment_content}} | Yes |
| Footer | {{footer_position}} | {{footer_content}} | Yes |

### 5.2 PDF Styling Configuration

| Element | Font | Size | Color | Alignment |
|---------|------|------|-------|-----------|
| Title | {{title_font}} | {{title_size}} | {{title_color}} | {{title_align}} |
| Headers | {{header_font}} | {{header_size}} | {{header_color}} | {{header_align}} |
| Body | {{body_font}} | {{body_size}} | {{body_color}} | {{body_align}} |
| Totals | {{totals_font}} | {{totals_size}} | {{totals_color}} | {{totals_align}} |
| Footer | {{footer_font}} | {{footer_size}} | {{footer_color}} | {{footer_align}} |

### 5.3 PDF Generation Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Page Size | {{page_size}} | Paper size (A4, Letter, etc.) |
| Orientation | {{orientation}} | Portrait or Landscape |
| Margins | {{margins}} | Page margins |
| DPI | {{pdf_dpi}} | Resolution for images |
| Compression | {{compression}} | PDF compression level |
| Font Embedding | {{font_embedding}} | Embed fonts in PDF |

### 5.4 Branding by Tier

| Tier | Logo | Colors | Footer Text | Watermark |
|------|------|--------|-------------|-----------|
| Free | {{free_logo}} | {{free_colors}} | {{free_footer}} | {{free_watermark}} |
| Pro | {{pro_logo}} | {{pro_colors}} | {{pro_footer}} | {{pro_watermark}} |
| Enterprise | {{enterprise_logo}} | {{enterprise_colors}} | {{enterprise_footer}} | {{enterprise_watermark}} |

### 5.5 PDF Storage and Access

| Aspect | Configuration | Notes |
|--------|---------------|-------|
| Storage Location | {{pdf_storage}} | Where PDFs are stored |
| Naming Convention | {{pdf_naming}} | File naming pattern |
| Retention Period | {{pdf_retention}} | How long to keep PDFs |
| Access Control | {{pdf_access}} | Who can access |
| CDN Delivery | {{pdf_cdn}} | CDN configuration |

---

## Invoice Lifecycle

### 6.1 Invoice States

```
┌─────────────────────────────────────────────────────────────────┐
│                     Invoice Lifecycle States                     │
│                                                                  │
│  DRAFT ──► FINALIZED ──► SENT ──► PAID                         │
│    │            │          │        │                            │
│    │            │          │        └──► PARTIAL_PAID ──► PAID  │
│    │            │          │                                     │
│    │            │          └──► PAST_DUE ──► COLLECTION         │
│    │            │                                                │
│    │            └──► VOID (if needed before send)               │
│    │                                                             │
│    └──► DELETED (drafts only)                                   │
│                                                                  │
│  At any point after SENT: REFUNDED (partial or full)            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Invoice Generation Schedule

| Trigger | Timing | Invoice Type | Description |
|---------|--------|--------------|-------------|
| Subscription Renewal | {{renewal_timing}} | {{renewal_type}} | {{renewal_desc}} |
| Usage Threshold | {{threshold_timing}} | {{threshold_type}} | {{threshold_desc}} |
| Period End | {{period_timing}} | {{period_type}} | {{period_desc}} |
| Manual | On demand | {{manual_type}} | {{manual_desc}} |
| Upgrade/Downgrade | {{change_timing}} | {{change_type}} | {{change_desc}} |

---

## Tenant Tier Considerations

### 7.1 Invoice Features by Tier

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Invoice Delivery | {{free_delivery}} | {{pro_delivery}} | {{enterprise_delivery}} |
| Payment Terms | {{free_terms}} | {{pro_terms}} | {{enterprise_terms}} |
| Custom Branding | {{free_branding}} | {{pro_branding}} | {{enterprise_branding}} |
| PDF Download | {{free_pdf}} | {{pro_pdf}} | {{enterprise_pdf}} |
| API Access | {{free_api}} | {{pro_api}} | {{enterprise_api}} |
| Bulk Export | {{free_bulk}} | {{pro_bulk}} | {{enterprise_bulk}} |

### 7.2 Payment Terms by Tier

| Tier | Default Terms | Net Days | Grace Period | Late Fee |
|------|---------------|----------|--------------|----------|
| Free | {{free_default_terms}} | {{free_net}} | {{free_grace}} | {{free_late}} |
| Pro | {{pro_default_terms}} | {{pro_net}} | {{pro_grace}} | {{pro_late}} |
| Enterprise | {{enterprise_default_terms}} | {{enterprise_net}} | {{enterprise_grace}} | {{enterprise_late}} |

---

## Delivery and Notifications

### 8.1 Delivery Channels

| Channel | Configuration | Trigger | Template |
|---------|---------------|---------|----------|
| Email | {{email_config}} | {{email_trigger}} | {{email_template}} |
| Portal | {{portal_config}} | {{portal_trigger}} | N/A |
| API Webhook | {{webhook_config}} | {{webhook_trigger}} | {{webhook_payload}} |
| Download | {{download_config}} | {{download_trigger}} | N/A |

### 8.2 Notification Schedule

| Event | Timing | Channel | Audience |
|-------|--------|---------|----------|
| Invoice Created | {{created_timing}} | {{created_channel}} | {{created_audience}} |
| Due Reminder | {{reminder_timing}} | {{reminder_channel}} | {{reminder_audience}} |
| Past Due | {{pastdue_timing}} | {{pastdue_channel}} | {{pastdue_audience}} |
| Final Notice | {{final_timing}} | {{final_channel}} | {{final_audience}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS invoice generation best practices {date}"
- "multi-currency invoicing patterns subscription billing {date}"
- "tax calculation SaaS recurring billing {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### Invoice Generation Checklist

- [ ] All invoice components defined with clear specifications
- [ ] Usage line item calculation documented
- [ ] Tax calculation rules established for all jurisdictions
- [ ] Multi-currency handling configured
- [ ] PDF generation specification complete
- [ ] Invoice lifecycle states documented
- [ ] Tenant tier features differentiated
- [ ] Delivery and notification schedule established
- [ ] All placeholders replaced with actual values
- [ ] Cross-tenant data isolation verified

### Compliance Checklist

- [ ] Invoice number uniqueness guaranteed
- [ ] Tax calculation compliant with local regulations
- [ ] PDF format meets legal requirements
- [ ] Data retention meets compliance requirements

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
