---
name: tenant-cost-attribution-template
description: Cost allocation and chargeback design for multi-tenant SaaS platforms including billing integration and tier-based pricing
category: tenant
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Cost allocation and chargeback design for multi-tenant SaaS platforms including billing integration and tier-based pricing

# Tenant Cost Attribution: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | {{document_id}} |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |
| Finance Review | {{finance_review_date}} |

## Executive Summary

{{executive_summary}}

---

## Cost Categories

### 1.1 Direct Costs

| Category | Description | Metering Method | Attribution |
|----------|-------------|-----------------|-------------|
| Compute | vCPU and memory usage | {{compute_metering}} | 100% to tenant |
| Storage | Database and object storage | {{storage_metering}} | 100% to tenant |
| Network egress | Outbound data transfer | {{network_metering}} | 100% to tenant |
| LLM tokens | AI model input/output tokens | {{token_metering}} | 100% to tenant |
| GPU time | GPU compute for AI workloads | {{gpu_metering}} | 100% to tenant |
| Vector operations | Embedding and search operations | {{vector_metering}} | 100% to tenant |

### 1.2 Shared Infrastructure Costs

| Category | Description | Allocation Method |
|----------|-------------|-------------------|
| Control plane | Platform management services | {{control_plane_allocation}} |
| Observability | Monitoring, logging, tracing | {{observability_allocation}} |
| Security | Security services, WAF, DDoS | {{security_allocation}} |
| Networking | Load balancers, service mesh | {{networking_allocation}} |
| Backup/DR | Backup and disaster recovery | {{backup_allocation}} |

### 1.3 Operational Costs

| Category | Description | Allocation Method |
|----------|-------------|-------------------|
| Support | Customer support costs | {{support_allocation}} |
| SLA credits | Service level agreement credits | {{sla_allocation}} |
| Compliance | Audit and compliance costs | {{compliance_allocation}} |
| Engineering overhead | Platform development | {{engineering_allocation}} |

### 1.4 Third-Party Costs

| Provider | Service | Cost Type | Attribution |
|----------|---------|-----------|-------------|
| {{llm_provider}} | LLM API | Per-token | Pass-through + margin |
| {{cloud_provider}} | Infrastructure | Various | Allocated |
| {{cdn_provider}} | Content delivery | Per-GB | 100% to tenant |
| {{auth_provider}} | Authentication | Per-MAU | 100% to tenant |

### 1.5 Cost Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cost Attribution Hierarchy                    │
│                                                                  │
│  Total Platform Costs                                            │
│    ├── Direct Tenant Costs ({{direct_percent}}%)                 │
│    │     ├── Compute                                             │
│    │     ├── Storage                                             │
│    │     ├── Network                                             │
│    │     └── AI/ML                                               │
│    │                                                             │
│    ├── Shared Infrastructure ({{shared_percent}}%)               │
│    │     ├── Control Plane                                       │
│    │     ├── Observability                                       │
│    │     └── Security                                            │
│    │                                                             │
│    └── Operational Overhead ({{operational_percent}}%)           │
│          ├── Support                                             │
│          ├── Compliance                                          │
│          └── Engineering                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Attribution Methods

### 2.1 Direct Attribution

| Resource | Attribution Key | Example |
|----------|-----------------|---------|
| Compute (containers) | tenant_id label | `container_cpu_usage{tenant_id="xxx"}` |
| Database queries | connection pool tenant | Query cost per tenant session |
| Object storage | bucket prefix | `s3://bucket/tenant_id/...` |
| API calls | API key tenant_id | Request count per tenant |
| LLM calls | request context | Token usage per tenant |

### 2.2 Proportional Attribution

| Shared Resource | Attribution Basis | Formula |
|-----------------|-------------------|---------|
| Control plane | Active tenants | Total / active_tenant_count |
| Load balancer | Request volume | Cost * (tenant_requests / total_requests) |
| Monitoring | Resource usage | Cost * (tenant_metrics / total_metrics) |
| Logging | Log volume | Cost * (tenant_logs / total_logs) |

### 2.3 Tiered Attribution

| Resource | Free Tier | Pro Tier | Enterprise Tier |
|----------|-----------|----------|-----------------|
| Support overhead | {{free_support_overhead}} | {{pro_support_overhead}} | {{enterprise_support_overhead}} |
| SLA buffer | {{free_sla_buffer}} | {{pro_sla_buffer}} | {{enterprise_sla_buffer}} |
| Compliance cost | {{free_compliance}} | {{pro_compliance}} | {{enterprise_compliance}} |

### 2.4 Attribution Accuracy Targets

| Category | Target Accuracy | Measurement Method |
|----------|-----------------|-------------------|
| Direct costs | {{direct_accuracy}}% | Metering reconciliation |
| Shared infrastructure | {{shared_accuracy}}% | Allocation verification |
| Third-party | {{thirdparty_accuracy}}% | Invoice matching |
| Operational | {{operational_accuracy}}% | Budget variance |

### 2.5 Attribution Frequency

| Attribution Type | Calculation Frequency | Reporting Delay |
|------------------|----------------------|-----------------|
| Real-time metering | Continuous | < {{realtime_delay}} |
| Hourly aggregation | Every hour | < {{hourly_delay}} |
| Daily reconciliation | End of day | < {{daily_delay}} |
| Monthly close | End of month | {{monthly_delay}} |

---

## Shared Resource Allocation

### 3.1 Allocation Methods

| Method | Description | When to Use |
|--------|-------------|-------------|
| Equal distribution | Split evenly among tenants | Fixed-cost shared services |
| Usage-based | Proportional to usage metric | Variable usage services |
| Tiered | Based on subscription tier | Tier-differentiated services |
| Capacity-based | Based on reserved capacity | Dedicated resources |
| Hybrid | Combination of methods | Complex shared resources |

### 3.2 Control Plane Allocation

| Component | Total Cost | Allocation Method | Per-Tenant Formula |
|-----------|------------|-------------------|---------------------|
| API Gateway | {{api_gateway_cost}} | {{api_gateway_method}} | {{api_gateway_formula}} |
| Auth Service | {{auth_cost}} | {{auth_method}} | {{auth_formula}} |
| Config Service | {{config_cost}} | {{config_method}} | {{config_formula}} |
| Scheduler | {{scheduler_cost}} | {{scheduler_method}} | {{scheduler_formula}} |

### 3.3 Observability Allocation

| Component | Allocation Basis | Cost Driver |
|-----------|------------------|-------------|
| Metrics storage | Metric cardinality | {{metrics_driver}} |
| Log storage | Log volume | {{logs_driver}} |
| Trace storage | Span count | {{traces_driver}} |
| Alerting | Alert rule count | {{alerting_driver}} |
| Dashboards | Dashboard complexity | {{dashboards_driver}} |

### 3.4 Security Service Allocation

| Service | Cost | Allocation |
|---------|------|------------|
| WAF | {{waf_cost}} | {{waf_allocation}} |
| DDoS protection | {{ddos_cost}} | {{ddos_allocation}} |
| Secrets management | {{secrets_cost}} | {{secrets_allocation}} |
| Vulnerability scanning | {{vuln_cost}} | {{vuln_allocation}} |
| Penetration testing | {{pentest_cost}} | {{pentest_allocation}} |

### 3.5 Allocation Verification

| Check | Frequency | Tolerance |
|-------|-----------|-----------|
| Sum equals total | Daily | {{sum_tolerance}}% |
| Tenant balance | Weekly | {{balance_tolerance}}% |
| Cross-check with billing | Monthly | {{billing_tolerance}}% |
| Audit reconciliation | Quarterly | {{audit_tolerance}}% |

---

## Reporting

### 4.1 Report Types

| Report | Audience | Frequency | Format |
|--------|----------|-----------|--------|
| Tenant cost summary | Tenant admin | {{tenant_report_freq}} | {{tenant_report_format}} |
| Platform cost report | Finance | {{platform_report_freq}} | {{platform_report_format}} |
| Margin analysis | Leadership | {{margin_report_freq}} | {{margin_report_format}} |
| Resource efficiency | Engineering | {{efficiency_report_freq}} | {{efficiency_report_format}} |
| Anomaly report | Ops | Real-time | {{anomaly_report_format}} |

### 4.2 Tenant-Facing Report Contents

| Section | Metrics Included |
|---------|------------------|
| Summary | Total cost, trend, tier allocation |
| Compute | CPU hours, memory GB-hours, container costs |
| Storage | Database GB, object storage GB, backup costs |
| AI/ML | Token usage, agent runs, embedding operations |
| Network | Egress GB, API calls, bandwidth costs |
| Breakdown | Cost by resource type, day, user |

### 4.3 Report Data Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cost Reporting Schema                         │
│                                                                  │
│  cost_reports                                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ report_id      UUID PRIMARY KEY                           │  │
│  │ tenant_id      UUID NOT NULL                              │  │
│  │ period_start   TIMESTAMP NOT NULL                         │  │
│  │ period_end     TIMESTAMP NOT NULL                         │  │
│  │ report_type    ENUM (daily, weekly, monthly)              │  │
│  │ total_cost     DECIMAL(12,4)                              │  │
│  │ currency       VARCHAR(3)                                 │  │
│  │ line_items     JSONB                                      │  │
│  │ generated_at   TIMESTAMP                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  cost_line_items                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ line_item_id   UUID PRIMARY KEY                           │  │
│  │ report_id      UUID FK                                    │  │
│  │ category       VARCHAR(50)                                │  │
│  │ resource_type  VARCHAR(50)                                │  │
│  │ quantity       DECIMAL(18,6)                              │  │
│  │ unit           VARCHAR(20)                                │  │
│  │ unit_cost      DECIMAL(12,6)                              │  │
│  │ total_cost     DECIMAL(12,4)                              │  │
│  │ metadata       JSONB                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Reporting API

| Endpoint | Method | Description |
|----------|--------|-------------|
| /v1/tenants/{id}/costs | GET | Tenant cost summary |
| /v1/tenants/{id}/costs/breakdown | GET | Detailed breakdown |
| /v1/tenants/{id}/costs/export | POST | Export cost data |
| /v1/tenants/{id}/costs/forecast | GET | Cost projection |

### 4.5 Report Delivery

| Method | Configuration | Tenant Access |
|--------|---------------|---------------|
| Dashboard | Real-time widget | All tiers |
| Email | Scheduled delivery | {{email_tiers}} |
| Webhook | Push notification | {{webhook_tiers}} |
| API | Pull on demand | {{api_tiers}} |
| CSV export | Manual download | {{export_tiers}} |

---

## Billing Integration

### 5.1 Billing Models

| Model | Description | Use Case |
|-------|-------------|----------|
| Subscription | Fixed monthly fee | Base tier access |
| Usage-based | Pay-per-use metering | Variable workloads |
| Tiered | Volume-based pricing | Growth incentives |
| Committed use | Discounted commitments | Predictable workloads |
| Hybrid | Subscription + usage | Combined model |

### 5.2 Billing Cycle

| Phase | Timing | Actions |
|-------|--------|---------|
| Metering | Continuous | Collect usage data |
| Aggregation | Hourly/Daily | Roll up metrics |
| Rating | End of period | Apply pricing rules |
| Invoicing | {{invoice_timing}} | Generate invoice |
| Collection | {{collection_timing}} | Process payment |

### 5.3 Billing System Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                    Billing Integration Flow                      │
│                                                                  │
│  Metering System         Cost Attribution         Billing        │
│  ┌─────────────┐        ┌─────────────┐         ┌─────────────┐ │
│  │ Usage       │───────►│ Attribution │────────►│ Invoice     │ │
│  │ Events      │        │ Engine      │         │ Generation  │ │
│  └─────────────┘        └─────────────┘         └──────┬──────┘ │
│                                                         │        │
│                                                  ┌──────▼──────┐ │
│                                                  │  Payment    │ │
│                                                  │  Provider   │ │
│                                                  │ {{payment}} │ │
│                                                  └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Invoice Line Items

| Line Item | Source | Calculation |
|-----------|--------|-------------|
| Base subscription | Tier | Fixed monthly |
| Compute overage | Metering | (Usage - included) * rate |
| Storage | Metering | GB-months * rate |
| AI tokens | Metering | Token count * rate |
| Support add-on | Configuration | Tier-based |
| Credits | Credit ledger | Negative amount |

### 5.5 Billing Reconciliation

| Check | Frequency | Action on Discrepancy |
|-------|-----------|----------------------|
| Metering vs. attributed | Daily | {{metering_discrepancy}} |
| Attributed vs. billed | Monthly | {{billing_discrepancy}} |
| Billed vs. collected | Monthly | {{collection_discrepancy}} |
| Provider invoice match | Monthly | {{provider_discrepancy}} |

### 5.6 Credit and Adjustment Handling

| Type | Approval Required | Application |
|------|-------------------|-------------|
| Usage credit | {{usage_credit_approval}} | Next invoice |
| SLA credit | {{sla_credit_approval}} | Automatic |
| Promotional credit | {{promo_credit_approval}} | Immediate |
| Error correction | {{error_credit_approval}} | Manual |

---

## Tier-Based Pricing

### 6.1 Tier Structure

| Tier | Monthly Base | Included Resources | Target Segment |
|------|--------------|-------------------|----------------|
| Free | ${{free_price}} | {{free_included}} | Individual developers |
| Pro | ${{pro_price}} | {{pro_included}} | Small teams |
| Enterprise | ${{enterprise_price}} | {{enterprise_included}} | Large organizations |
| Custom | Negotiated | Custom | Strategic accounts |

### 6.2 Resource Pricing by Tier

| Resource | Free | Pro | Enterprise | Custom |
|----------|------|-----|------------|--------|
| CPU (per vCPU-hour) | N/A (included) | ${{pro_cpu_rate}} | ${{enterprise_cpu_rate}} | Negotiated |
| Storage (per GB/month) | N/A (included) | ${{pro_storage_rate}} | ${{enterprise_storage_rate}} | Negotiated |
| LLM tokens (per 1K) | N/A (included) | ${{pro_token_rate}} | ${{enterprise_token_rate}} | Negotiated |
| API calls (per 1K) | N/A (included) | ${{pro_api_rate}} | ${{enterprise_api_rate}} | Negotiated |
| Agent runs (each) | N/A (included) | ${{pro_agent_rate}} | ${{enterprise_agent_rate}} | Negotiated |

### 6.3 Volume Discounts

| Resource | Tier 1 (0-{{vol_tier1}}) | Tier 2 ({{vol_tier1}}-{{vol_tier2}}) | Tier 3 ({{vol_tier2}}+) |
|----------|--------------------------|--------------------------------------|-------------------------|
| LLM tokens | {{token_tier1_rate}} | {{token_tier2_rate}} | {{token_tier3_rate}} |
| API calls | {{api_tier1_rate}} | {{api_tier2_rate}} | {{api_tier3_rate}} |
| Agent runs | {{agent_tier1_rate}} | {{agent_tier2_rate}} | {{agent_tier3_rate}} |

### 6.4 Add-On Pricing

| Add-On | Description | Price | Available Tiers |
|--------|-------------|-------|-----------------|
| Additional users | Extra team members | ${{user_addon}}/user | Pro, Enterprise |
| Priority support | Faster response SLA | ${{priority_support}} | Pro, Enterprise |
| Custom domain | White-label domain | ${{custom_domain}} | Pro, Enterprise |
| SSO | SAML/OIDC integration | ${{sso_addon}} | Enterprise |
| Dedicated resources | Isolated compute | ${{dedicated}} | Enterprise |
| Data residency | Region-specific data | ${{data_residency}} | Enterprise |

### 6.5 Pricing Configuration

| Configuration | Storage | Update Process |
|---------------|---------|----------------|
| Tier definitions | {{tier_config_storage}} | {{tier_update_process}} |
| Rate cards | {{rate_config_storage}} | {{rate_update_process}} |
| Discount rules | {{discount_config_storage}} | {{discount_update_process}} |
| Promotional codes | {{promo_config_storage}} | {{promo_update_process}} |

### 6.6 Pricing Governance

| Change Type | Approval | Notice Period |
|-------------|----------|---------------|
| Rate increase | {{rate_increase_approval}} | {{rate_increase_notice}} |
| Rate decrease | {{rate_decrease_approval}} | {{rate_decrease_notice}} |
| New tier | {{new_tier_approval}} | {{new_tier_notice}} |
| Tier deprecation | {{tier_deprecation_approval}} | {{tier_deprecation_notice}} |

---

## Implementation Checklist

### Cost Categories
- [ ] Direct costs identified and categorized
- [ ] Shared infrastructure costs inventoried
- [ ] Operational costs mapped
- [ ] Third-party costs tracked

### Attribution Methods
- [ ] Direct attribution implemented for all metered resources
- [ ] Proportional attribution configured for shared resources
- [ ] Tiered attribution rules defined
- [ ] Accuracy targets established

### Shared Resource Allocation
- [ ] Allocation methods selected per resource type
- [ ] Control plane allocation formula implemented
- [ ] Observability allocation configured
- [ ] Security service allocation defined

### Reporting
- [ ] Tenant-facing reports designed
- [ ] Platform reports configured
- [ ] Reporting API implemented
- [ ] Report delivery methods set up

### Billing Integration
- [ ] Billing model selected
- [ ] Billing cycle defined
- [ ] Invoice generation automated
- [ ] Reconciliation process established

### Tier-Based Pricing
- [ ] Tier structure defined
- [ ] Resource pricing configured
- [ ] Volume discounts implemented
- [ ] Add-on pricing set up

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS cost attribution multi-tenant {date}"
- "cloud cost allocation shared resources {date}"
- "tenant chargeback billing integration {date}"
- "usage-based pricing SaaS implementation {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Cost categories comprehensively cover direct, shared, and operational costs
- [ ] Attribution methods ensure accurate per-tenant cost assignment
- [ ] Shared resource allocation uses appropriate methods for each resource type
- [ ] Reporting provides visibility to tenants, finance, and operations
- [ ] Billing integration supports selected billing model with reconciliation
- [ ] Tier-based pricing includes base, usage, volume discounts, and add-ons
- [ ] Implementation checklist items are actionable and complete
- [ ] All costs attributable to tenant_id for isolation verification

---

## Appendix

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Tenant Model: `{{tenant_model_link}}`
- Capacity Planning: `{{capacity_planning_link}}`
- Billing Integration: `{{billing_integration_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
