---
name: Cost Optimization Template
description: Comprehensive FinOps recommendations and cost optimization strategies including savings opportunities, resource right-sizing, and multi-tenant cost allocation
category: operations
version: 1.0.0
type: template
---

# {{project_name}} Cost Optimization Report

## Purpose

This template provides a comprehensive framework for identifying and implementing cost optimization opportunities for {{project_name}}. It covers cloud resource optimization, multi-tenant cost allocation, AI/LLM cost management, and FinOps best practices to maximize platform efficiency while maintaining performance and reliability.

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | `COST-{{cost_report_id}}` |
| Report Period | {{report_period}} |
| Environment | {{environment}} |
| Author | {{author}} |
| Approver | {{approver}} |
| Classification | {{classification}} |
| Last Updated | {{last_updated}} |

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Cost Baseline](#current-cost-baseline)
3. [Savings Opportunities](#savings-opportunities)
4. [Resource Right-Sizing](#resource-right-sizing)
5. [Reserved Capacity Planning](#reserved-capacity-planning)
6. [Multi-Tenant Cost Allocation](#multi-tenant-cost-allocation)
7. [AI/LLM Cost Optimization](#aillm-cost-optimization)
8. [Implementation Roadmap](#implementation-roadmap)
9. [Monitoring and Governance](#monitoring-and-governance)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

## Executive Summary

### Cost Overview

| Metric | Current | Target | Potential Savings |
|--------|---------|--------|-------------------|
| Monthly Cloud Spend | {{current_monthly_spend}} | {{target_monthly_spend}} | {{monthly_savings}} |
| Cost per Tenant | {{cost_per_tenant}} | {{target_cost_per_tenant}} | {{tenant_savings}} |
| AI/LLM Costs | {{ai_monthly_cost}} | {{ai_target_cost}} | {{ai_savings}} |
| Infrastructure Efficiency | {{current_efficiency}}% | {{target_efficiency}}% | N/A |

### Top Recommendations

| Priority | Recommendation | Estimated Savings | Effort |
|----------|----------------|-------------------|--------|
| 1 | {{recommendation_1}} | {{savings_1}} | {{effort_1}} |
| 2 | {{recommendation_2}} | {{savings_2}} | {{effort_2}} |
| 3 | {{recommendation_3}} | {{savings_3}} | {{effort_3}} |
| 4 | {{recommendation_4}} | {{savings_4}} | {{effort_4}} |
| 5 | {{recommendation_5}} | {{savings_5}} | {{effort_5}} |

## Current Cost Baseline

### Cost by Service Category

| Service Category | Monthly Cost | % of Total | YoY Trend |
|------------------|--------------|------------|-----------|
| Compute | {{compute_cost}} | {{compute_percent}}% | {{compute_trend}} |
| Database | {{database_cost}} | {{database_percent}}% | {{database_trend}} |
| AI/ML Services | {{ai_cost}} | {{ai_percent}}% | {{ai_trend}} |
| Storage | {{storage_cost}} | {{storage_percent}}% | {{storage_trend}} |
| Networking | {{network_cost}} | {{network_percent}}% | {{network_trend}} |
| Other | {{other_cost}} | {{other_percent}}% | {{other_trend}} |

### Cost by Environment

| Environment | Monthly Cost | Resources | Optimization Status |
|-------------|--------------|-----------|---------------------|
| Production | {{prod_cost}} | {{prod_resources}} | {{prod_status}} |
| Staging | {{staging_cost}} | {{staging_resources}} | {{staging_status}} |
| Development | {{dev_cost}} | {{dev_resources}} | {{dev_status}} |
| Testing | {{test_cost}} | {{test_resources}} | {{test_status}} |

### Cost by Tenant Tier

| Tier | Tenant Count | Total Cost | Avg Cost/Tenant | Margin |
|------|--------------|------------|-----------------|--------|
| Enterprise | {{enterprise_count}} | {{enterprise_cost}} | {{enterprise_avg}} | {{enterprise_margin}} |
| Professional | {{professional_count}} | {{professional_cost}} | {{professional_avg}} | {{professional_margin}} |
| Starter | {{starter_count}} | {{starter_cost}} | {{starter_avg}} | {{starter_margin}} |
| Free | {{free_count}} | {{free_cost}} | {{free_avg}} | {{free_margin}} |

## Savings Opportunities

### Immediate Savings (0-30 Days)

| Opportunity | Current State | Recommended Action | Monthly Savings | Risk |
|-------------|---------------|-------------------|-----------------|------|
| {{immediate_opp_1}} | {{current_state_1}} | {{action_1}} | {{savings_imm_1}} | {{risk_1}} |
| {{immediate_opp_2}} | {{current_state_2}} | {{action_2}} | {{savings_imm_2}} | {{risk_2}} |
| Unused Resources | {{unused_resources}} | Terminate/Delete | {{unused_savings}} | Low |
| Idle Instances | {{idle_instances}} | Schedule/Stop | {{idle_savings}} | Low |

### Short-Term Savings (30-90 Days)

| Opportunity | Current State | Recommended Action | Monthly Savings | Risk |
|-------------|---------------|-------------------|-----------------|------|
| {{short_opp_1}} | {{short_state_1}} | {{short_action_1}} | {{savings_short_1}} | {{short_risk_1}} |
| {{short_opp_2}} | {{short_state_2}} | {{short_action_2}} | {{savings_short_2}} | {{short_risk_2}} |
| Right-sizing | {{rightsizing_state}} | Instance optimization | {{rightsizing_savings}} | Medium |
| Spot Instances | {{spot_state}} | Migrate eligible workloads | {{spot_savings}} | Medium |

### Long-Term Savings (90+ Days)

| Opportunity | Current State | Recommended Action | Annual Savings | Risk |
|-------------|---------------|-------------------|----------------|------|
| {{long_opp_1}} | {{long_state_1}} | {{long_action_1}} | {{savings_long_1}} | {{long_risk_1}} |
| {{long_opp_2}} | {{long_state_2}} | {{long_action_2}} | {{savings_long_2}} | {{long_risk_2}} |
| Reserved Instances | {{ri_state}} | 1-3 year commitments | {{ri_savings}} | Low |
| Architecture Refactor | {{arch_state}} | Serverless migration | {{arch_savings}} | High |

## Resource Right-Sizing

### Compute Resources

| Resource | Current Size | Recommended Size | CPU Util | Memory Util | Savings |
|----------|--------------|------------------|----------|-------------|---------|
| {{compute_1}} | {{current_size_1}} | {{recommended_size_1}} | {{cpu_1}} | {{memory_1}} | {{compute_savings_1}} |
| {{compute_2}} | {{current_size_2}} | {{recommended_size_2}} | {{cpu_2}} | {{memory_2}} | {{compute_savings_2}} |
| {{compute_3}} | {{current_size_3}} | {{recommended_size_3}} | {{cpu_3}} | {{memory_3}} | {{compute_savings_3}} |

### Database Resources

| Database | Current Config | Recommended Config | Utilization | Savings |
|----------|----------------|-------------------|-------------|---------|
| {{db_name_1}} | {{db_current_1}} | {{db_recommended_1}} | {{db_util_1}} | {{db_savings_1}} |
| {{db_name_2}} | {{db_current_2}} | {{db_recommended_2}} | {{db_util_2}} | {{db_savings_2}} |

### Storage Optimization

| Storage Type | Current Size | Used | Recommended Action | Savings |
|--------------|--------------|------|-------------------|---------|
| {{storage_type_1}} | {{storage_size_1}} | {{storage_used_1}} | {{storage_action_1}} | {{storage_savings_1}} |
| {{storage_type_2}} | {{storage_size_2}} | {{storage_used_2}} | {{storage_action_2}} | {{storage_savings_2}} |
| Cold Storage | {{cold_size}} | {{cold_used}} | Lifecycle policy | {{cold_savings}} |

## Reserved Capacity Planning

### Current Reservations

| Reservation Type | Coverage | Utilization | Expiration |
|------------------|----------|-------------|------------|
| {{reservation_1}} | {{coverage_1}} | {{util_1}} | {{expiration_1}} |
| {{reservation_2}} | {{coverage_2}} | {{util_2}} | {{expiration_2}} |

### Recommended Reservations

| Resource Type | Quantity | Term | Payment | Annual Savings |
|---------------|----------|------|---------|----------------|
| {{rec_resource_1}} | {{rec_qty_1}} | {{rec_term_1}} | {{rec_payment_1}} | {{rec_savings_1}} |
| {{rec_resource_2}} | {{rec_qty_2}} | {{rec_term_2}} | {{rec_payment_2}} | {{rec_savings_2}} |
| Compute (Steady) | {{compute_qty}} | 1 Year | Partial Upfront | {{compute_annual}} |
| Database | {{db_qty}} | 3 Year | All Upfront | {{db_annual}} |

### Savings Plans Analysis

| Plan Type | Commitment | Coverage | Flexibility | Savings Rate |
|-----------|------------|----------|-------------|--------------|
| Compute Savings Plan | {{compute_commitment}} | {{compute_coverage}} | High | {{compute_rate}}% |
| Instance Savings Plan | {{instance_commitment}} | {{instance_coverage}} | Medium | {{instance_rate}}% |

## Multi-Tenant Cost Allocation

### Cost Attribution Model

| Cost Category | Attribution Method | Granularity | Accuracy |
|---------------|-------------------|-------------|----------|
| Compute | {{compute_attribution}} | {{compute_granularity}} | {{compute_accuracy}} |
| Storage | {{storage_attribution}} | {{storage_granularity}} | {{storage_accuracy}} |
| AI/LLM | Token-based metering | Per-request | High |
| Network | {{network_attribution}} | {{network_granularity}} | {{network_accuracy}} |

### Tenant Cost Efficiency

| Tenant ID | Tier | Monthly Cost | Revenue | Margin | Efficiency Score |
|-----------|------|--------------|---------|--------|------------------|
| {{tenant_1}} | {{tier_1}} | {{tenant_cost_1}} | {{revenue_1}} | {{margin_1}} | {{efficiency_1}} |
| {{tenant_2}} | {{tier_2}} | {{tenant_cost_2}} | {{revenue_2}} | {{margin_2}} | {{efficiency_2}} |
| {{tenant_3}} | {{tier_3}} | {{tenant_cost_3}} | {{revenue_3}} | {{margin_3}} | {{efficiency_3}} |

### Cost Anomaly Detection

| Tenant | Anomaly Type | Deviation | Root Cause | Action |
|--------|--------------|-----------|------------|--------|
| {{anomaly_tenant_1}} | {{anomaly_type_1}} | {{deviation_1}} | {{cause_1}} | {{action_anom_1}} |
| {{anomaly_tenant_2}} | {{anomaly_type_2}} | {{deviation_2}} | {{cause_2}} | {{action_anom_2}} |

## AI/LLM Cost Optimization

### LLM Usage Analysis

| Model | Monthly Tokens | Cost | Avg Latency | Optimization |
|-------|----------------|------|-------------|--------------|
| {{model_1}} | {{tokens_1}} | {{model_cost_1}} | {{latency_1}} | {{model_opt_1}} |
| {{model_2}} | {{tokens_2}} | {{model_cost_2}} | {{latency_2}} | {{model_opt_2}} |
| {{model_3}} | {{tokens_3}} | {{model_cost_3}} | {{latency_3}} | {{model_opt_3}} |

### Token Optimization Strategies

| Strategy | Current | Recommended | Token Reduction | Cost Savings |
|----------|---------|-------------|-----------------|--------------|
| Prompt Caching | {{cache_current}} | {{cache_recommended}} | {{cache_reduction}} | {{cache_savings}} |
| Model Routing | {{routing_current}} | {{routing_recommended}} | {{routing_reduction}} | {{routing_savings}} |
| Context Window | {{context_current}} | {{context_recommended}} | {{context_reduction}} | {{context_savings}} |
| Batch Processing | {{batch_current}} | {{batch_recommended}} | {{batch_reduction}} | {{batch_savings}} |

### Model Selection Matrix

| Use Case | Current Model | Recommended Model | Quality Impact | Cost Impact |
|----------|---------------|-------------------|----------------|-------------|
| {{use_case_1}} | {{current_model_1}} | {{rec_model_1}} | {{quality_1}} | {{cost_impact_1}} |
| {{use_case_2}} | {{current_model_2}} | {{rec_model_2}} | {{quality_2}} | {{cost_impact_2}} |

## Implementation Roadmap

### Phase 1: Quick Wins (Week 1-2)

| Task | Owner | Status | Expected Savings |
|------|-------|--------|------------------|
| {{task_p1_1}} | {{owner_p1_1}} | {{status_p1_1}} | {{savings_p1_1}} |
| {{task_p1_2}} | {{owner_p1_2}} | {{status_p1_2}} | {{savings_p1_2}} |
| Terminate unused resources | Infrastructure | Pending | {{unused_target}} |
| Implement auto-scaling | Platform | Pending | {{scaling_target}} |

### Phase 2: Optimization (Week 3-6)

| Task | Owner | Status | Expected Savings |
|------|-------|--------|------------------|
| {{task_p2_1}} | {{owner_p2_1}} | {{status_p2_1}} | {{savings_p2_1}} |
| {{task_p2_2}} | {{owner_p2_2}} | {{status_p2_2}} | {{savings_p2_2}} |
| Right-size instances | Infrastructure | Pending | {{rightsize_target}} |
| Implement prompt caching | AI Team | Pending | {{prompt_target}} |

### Phase 3: Strategic (Month 2-3)

| Task | Owner | Status | Expected Savings |
|------|-------|--------|------------------|
| {{task_p3_1}} | {{owner_p3_1}} | {{status_p3_1}} | {{savings_p3_1}} |
| {{task_p3_2}} | {{owner_p3_2}} | {{status_p3_2}} | {{savings_p3_2}} |
| Purchase reservations | FinOps | Pending | {{ri_target}} |
| Model routing implementation | AI Team | Pending | {{model_target}} |

## Monitoring and Governance

### Cost Alerts

| Alert Name | Threshold | Frequency | Recipients |
|------------|-----------|-----------|------------|
| {{alert_name_1}} | {{threshold_1}} | {{frequency_1}} | {{recipients_1}} |
| {{alert_name_2}} | {{threshold_2}} | {{frequency_2}} | {{recipients_2}} |
| Budget Threshold | 80% of monthly budget | Daily | FinOps, Engineering |
| Anomaly Detection | > 20% deviation | Hourly | FinOps |

### FinOps Metrics Dashboard

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Cost per Tenant | {{target_cpt}} | {{current_cpt}} | {{status_cpt}} |
| Unit Economics | {{target_ue}} | {{current_ue}} | {{status_ue}} |
| Reserved Coverage | {{target_rc}} | {{current_rc}} | {{status_rc}} |
| Waste Percentage | < {{target_waste}}% | {{current_waste}}% | {{status_waste}} |

### Governance Policies

| Policy | Description | Enforcement |
|--------|-------------|-------------|
| {{policy_name_1}} | {{policy_desc_1}} | {{enforcement_1}} |
| {{policy_name_2}} | {{policy_desc_2}} | {{enforcement_2}} |
| Resource Tagging | All resources must have cost tags | Automated |
| Approval Workflow | Large resources require approval | Manual |

## Web Research Queries

Use these queries to research current best practices:

1. "cloud cost optimization strategies multi-tenant SaaS {date}" - Research cost optimization for multi-tenant platforms
2. "LLM cost reduction techniques prompt caching {date}" - Explore AI/LLM cost optimization strategies
3. "FinOps best practices cloud governance {date}" - Research FinOps frameworks and governance

## Verification Checklist

- [ ] Current cost baseline established
- [ ] All savings opportunities identified and prioritized
- [ ] Right-sizing recommendations validated
- [ ] Reserved capacity analysis completed
- [ ] Multi-tenant cost allocation model verified
- [ ] AI/LLM optimization strategies documented
- [ ] Implementation roadmap approved
- [ ] Cost alerts configured
- [ ] Dashboard metrics defined
- [ ] Governance policies established
- [ ] Stakeholder sign-off obtained
- [ ] Tracking mechanisms in place
- [ ] Review cadence established

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{initial_date}} | {{initial_author}} | Initial cost optimization report |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |
