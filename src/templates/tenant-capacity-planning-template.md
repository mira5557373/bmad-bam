---
name: tenant-capacity-planning-template
description: Capacity forecasting and resource planning per tenant for multi-tenant SaaS platforms
category: tenant
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Capacity forecasting and resource planning per tenant for multi-tenant SaaS platforms

# Tenant Capacity Planning: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | {{document_id}} |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |
| Planning Horizon | {{planning_horizon}} |

## Executive Summary

{{executive_summary}}

---

## Resource Metrics

### 1.1 Compute Metrics

| Metric | Unit | Collection Frequency | Aggregation |
|--------|------|---------------------|-------------|
| CPU usage | vCPU-hours | {{cpu_frequency}} | Sum per tenant |
| Memory usage | GB-hours | {{memory_frequency}} | Avg/Max per tenant |
| Container instances | Count | {{container_frequency}} | Max concurrent |
| Function invocations | Count | {{function_frequency}} | Sum per tenant |
| GPU time | GPU-minutes | {{gpu_frequency}} | Sum per tenant |

### 1.2 Storage Metrics

| Metric | Unit | Collection Frequency | Aggregation |
|--------|------|---------------------|-------------|
| Database storage | GB | {{db_storage_frequency}} | Point-in-time |
| Object storage | GB | {{object_frequency}} | Point-in-time |
| Vector store size | GB | {{vector_frequency}} | Point-in-time |
| Cache usage | MB | {{cache_frequency}} | Avg/Max |
| Backup storage | GB | {{backup_frequency}} | Point-in-time |

### 1.3 Network Metrics

| Metric | Unit | Collection Frequency | Aggregation |
|--------|------|---------------------|-------------|
| Ingress bandwidth | GB | {{ingress_frequency}} | Sum per tenant |
| Egress bandwidth | GB | {{egress_frequency}} | Sum per tenant |
| API requests | Count | {{api_frequency}} | Sum per tenant |
| WebSocket connections | Count | {{websocket_frequency}} | Max concurrent |

### 1.4 AI/Agent Metrics

| Metric | Unit | Collection Frequency | Aggregation |
|--------|------|---------------------|-------------|
| LLM tokens (input) | Tokens | {{token_in_frequency}} | Sum per tenant |
| LLM tokens (output) | Tokens | {{token_out_frequency}} | Sum per tenant |
| Agent executions | Count | {{agent_exec_frequency}} | Sum per tenant |
| Tool invocations | Count | {{tool_frequency}} | Sum per tenant |
| Embedding operations | Count | {{embedding_frequency}} | Sum per tenant |
| RAG queries | Count | {{rag_frequency}} | Sum per tenant |

### 1.5 Metric Collection Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Metric Collection Flow                        │
│                                                                  │
│  Application Layer        Collector          Storage            │
│  ┌─────────────────┐     ┌─────────┐        ┌─────────┐        │
│  │ Service A       │────►│         │        │         │        │
│  │ (tenant_id tag) │     │ Metrics │───────►│ Time    │        │
│  └─────────────────┘     │ Agent   │        │ Series  │        │
│  ┌─────────────────┐     │         │        │ DB      │        │
│  │ Service B       │────►│         │        │         │        │
│  │ (tenant_id tag) │     └─────────┘        └────┬────┘        │
│  └─────────────────┘                              │             │
│                                            ┌──────▼──────┐      │
│                                            │ Aggregation │      │
│                                            │ per Tenant  │      │
│                                            └─────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Growth Projections

### 2.1 Historical Usage Trends

| Tenant | Metric | 30-Day Avg | 90-Day Avg | 180-Day Avg | Growth Rate |
|--------|--------|------------|------------|-------------|-------------|
| {{tenant_id}} | CPU hours | {{cpu_30d}} | {{cpu_90d}} | {{cpu_180d}} | {{cpu_growth}}% |
| {{tenant_id}} | Storage GB | {{storage_30d}} | {{storage_90d}} | {{storage_180d}} | {{storage_growth}}% |
| {{tenant_id}} | API calls | {{api_30d}} | {{api_90d}} | {{api_180d}} | {{api_growth}}% |
| {{tenant_id}} | Agent runs | {{agent_30d}} | {{agent_90d}} | {{agent_180d}} | {{agent_growth}}% |

### 2.2 Growth Forecasting Models

| Model | Use Case | Accuracy Target |
|-------|----------|-----------------|
| Linear regression | Steady growth tenants | {{linear_accuracy}}% |
| Exponential smoothing | Seasonal patterns | {{exp_accuracy}}% |
| ARIMA | Complex patterns | {{arima_accuracy}}% |
| ML-based | High-value tenants | {{ml_accuracy}}% |

### 2.3 Projected Capacity Needs

| Horizon | Compute | Storage | Network | AI Tokens |
|---------|---------|---------|---------|-----------|
| 30 days | {{compute_30d}} | {{storage_proj_30d}} | {{network_30d}} | {{tokens_30d}} |
| 90 days | {{compute_90d}} | {{storage_proj_90d}} | {{network_90d}} | {{tokens_90d}} |
| 180 days | {{compute_180d}} | {{storage_proj_180d}} | {{network_180d}} | {{tokens_180d}} |
| 1 year | {{compute_1y}} | {{storage_proj_1y}} | {{network_1y}} | {{tokens_1y}} |

### 2.4 Growth Scenarios

| Scenario | Assumptions | Resource Impact |
|----------|-------------|-----------------|
| Conservative | {{conservative_assumptions}} | {{conservative_impact}} |
| Baseline | {{baseline_assumptions}} | {{baseline_impact}} |
| Aggressive | {{aggressive_assumptions}} | {{aggressive_impact}} |

### 2.5 Seasonal Patterns

| Pattern | Affected Metrics | Adjustment Factor |
|---------|------------------|-------------------|
| {{season_1}} | {{season_1_metrics}} | {{season_1_factor}} |
| {{season_2}} | {{season_2_metrics}} | {{season_2_factor}} |
| {{season_3}} | {{season_3_metrics}} | {{season_3_factor}} |

---

## Scaling Triggers

### 3.1 Automatic Scaling Rules

| Resource | Scale Up Trigger | Scale Down Trigger | Cooldown |
|----------|------------------|-------------------|----------|
| Compute | CPU > {{cpu_scale_up}}% | CPU < {{cpu_scale_down}}% | {{cpu_cooldown}} |
| Memory | Memory > {{mem_scale_up}}% | Memory < {{mem_scale_down}}% | {{mem_cooldown}} |
| Containers | Requests > {{req_scale_up}}/s | Requests < {{req_scale_down}}/s | {{container_cooldown}} |
| Database | Connections > {{db_scale_up}}% | Connections < {{db_scale_down}}% | {{db_cooldown}} |
| Cache | Hit rate < {{cache_scale_up}}% | Hit rate > {{cache_scale_down}}% | {{cache_cooldown}} |

### 3.2 Tenant-Aware Scaling

| Trigger | Scope | Action |
|---------|-------|--------|
| Single tenant spike | Tenant namespace | Scale tenant resources |
| Multi-tenant pressure | Shared resources | Scale platform + throttle |
| High-value tenant | Priority tenant | Pre-scale resources |
| Tier upgrade | Upgraded tenant | Allocate new tier quota |

### 3.3 Predictive Scaling

| Signal | Lead Time | Action |
|--------|-----------|--------|
| Historical pattern | {{historical_lead}} | Pre-scale before peak |
| Calendar event | {{calendar_lead}} | Scheduled scale-up |
| Marketing campaign | {{marketing_lead}} | Coordinated scale |
| API usage trend | {{api_lead}} | Proactive adjustment |

### 3.4 Scaling Constraints

| Constraint | Limit | Rationale |
|------------|-------|-----------|
| Max scale factor | {{max_scale_factor}}x | Cost control |
| Min instances | {{min_instances}} | Availability |
| Scale rate | {{scale_rate}}/minute | Stability |
| Tenant isolation | {{isolation_constraint}} | Prevent noisy neighbor |

### 3.5 Scaling Alert Thresholds

| Level | Threshold | Notification |
|-------|-----------|--------------|
| Info | {{info_threshold}}% of limit | Dashboard |
| Warning | {{warning_threshold}}% of limit | {{warning_notify}} |
| Critical | {{critical_threshold}}% of limit | {{critical_notify}} |
| Emergency | {{emergency_threshold}}% of limit | {{emergency_notify}} |

---

## Tier Limits

### 4.1 Resource Limits by Tier

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| CPU hours/month | {{free_cpu}} | {{pro_cpu}} | {{enterprise_cpu}} |
| Storage GB | {{free_storage}} | {{pro_storage}} | {{enterprise_storage}} |
| API calls/month | {{free_api}} | {{pro_api}} | {{enterprise_api}} |
| Agent runs/month | {{free_agent}} | {{pro_agent}} | {{enterprise_agent}} |
| LLM tokens/month | {{free_tokens}} | {{pro_tokens}} | {{enterprise_tokens}} |
| Concurrent connections | {{free_connections}} | {{pro_connections}} | {{enterprise_connections}} |
| Team members | {{free_users}} | {{pro_users}} | {{enterprise_users}} |

### 4.2 Rate Limits by Tier

| Rate Limit | Free | Pro | Enterprise |
|------------|------|-----|------------|
| API calls/second | {{free_rps}} | {{pro_rps}} | {{enterprise_rps}} |
| Agent concurrency | {{free_agent_concurrent}} | {{pro_agent_concurrent}} | {{enterprise_agent_concurrent}} |
| Batch size | {{free_batch}} | {{pro_batch}} | {{enterprise_batch}} |
| Webhook rate | {{free_webhook}} | {{pro_webhook}} | {{enterprise_webhook}} |

### 4.3 Soft vs Hard Limits

| Limit Type | Behavior | Grace |
|------------|----------|-------|
| Soft limit | Warning + throttle | {{soft_grace}} |
| Hard limit | Block + notify | None |
| Burstable | Allow burst, track | {{burst_allowance}} |
| Quota reset | Monthly reset | N/A |

### 4.4 Limit Enforcement

| Enforcement Point | Method | Bypass Possible |
|-------------------|--------|-----------------|
| API Gateway | Token bucket | No |
| Service layer | Tenant context check | No |
| Database | Query governor | No |
| AI Provider | Provider quotas | Per agreement |

### 4.5 Tier Upgrade Triggers

| Trigger | Current Tier | Recommendation |
|---------|--------------|----------------|
| Usage > {{upgrade_threshold_1}}% for {{upgrade_duration_1}} | Free | Upgrade to Pro |
| Usage > {{upgrade_threshold_2}}% for {{upgrade_duration_2}} | Pro | Upgrade to Enterprise |
| Feature request | Any | Evaluate tier requirements |
| Compliance need | Any | Enterprise required |

---

## Burst Handling

### 5.1 Burst Allowances

| Tier | Burst Multiplier | Burst Duration | Cooldown |
|------|------------------|----------------|----------|
| Free | {{free_burst_mult}}x | {{free_burst_duration}} | {{free_burst_cooldown}} |
| Pro | {{pro_burst_mult}}x | {{pro_burst_duration}} | {{pro_burst_cooldown}} |
| Enterprise | {{enterprise_burst_mult}}x | {{enterprise_burst_duration}} | {{enterprise_burst_cooldown}} |

### 5.2 Burst Scenarios

| Scenario | Detection | Response |
|----------|-----------|----------|
| Marketing event | Pre-announced | Pre-scale + burst allowance |
| Viral content | Traffic spike | Auto-scale + queue overflow |
| Integration sync | Scheduled | Reserved capacity |
| Agent loop | Runaway detection | Circuit breaker |

### 5.3 Burst Resource Pool

```
┌─────────────────────────────────────────────────────────────────┐
│                    Burst Resource Allocation                     │
│                                                                  │
│  Reserved Capacity (90%)     Burst Pool (10%)                   │
│  ┌────────────────────────┐  ┌─────────────────┐                │
│  │ Tenant A: 20%          │  │                 │                │
│  │ Tenant B: 30%          │  │  Shared burst   │                │
│  │ Tenant C: 25%          │  │  capacity       │                │
│  │ Tenant D: 15%          │  │  (first-come)   │                │
│  └────────────────────────┘  └─────────────────┘                │
│                                      │                          │
│                               ┌──────▼──────┐                   │
│                               │ Priority by │                   │
│                               │ tier + usage│                   │
│                               └─────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Burst Monitoring

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| Burst utilization | > {{burst_util_threshold}}% | {{burst_util_action}} |
| Burst frequency | > {{burst_freq_threshold}}/day | {{burst_freq_action}} |
| Burst duration | > {{burst_dur_threshold}} | {{burst_dur_action}} |
| Burst cost impact | > {{burst_cost_threshold}}% | {{burst_cost_action}} |

### 5.5 Graceful Degradation

| Priority | Service | Degradation Action |
|----------|---------|-------------------|
| 1 (Critical) | Core API | Maintain full capacity |
| 2 (High) | Agent execution | Queue with timeout |
| 3 (Medium) | Analytics | Sample/aggregate |
| 4 (Low) | Batch jobs | Delay/reschedule |

---

## Cost Projections

### 6.1 Cost by Resource Category

| Resource | Unit Cost | Current Usage | Monthly Cost | Projected (90d) |
|----------|-----------|---------------|--------------|-----------------|
| Compute | {{compute_unit_cost}}/vCPU-hr | {{compute_usage}} | {{compute_cost}} | {{compute_proj}} |
| Storage | {{storage_unit_cost}}/GB-mo | {{storage_usage}} | {{storage_cost}} | {{storage_proj}} |
| Network egress | {{network_unit_cost}}/GB | {{network_usage}} | {{network_cost}} | {{network_proj}} |
| LLM tokens | {{token_unit_cost}}/1K tokens | {{token_usage}} | {{token_cost}} | {{token_proj}} |
| Vector operations | {{vector_unit_cost}}/1K ops | {{vector_usage}} | {{vector_cost}} | {{vector_proj}} |

### 6.2 Cost per Tenant Projection

| Tenant | Tier | Current Cost | 90-Day Projection | Growth Impact |
|--------|------|--------------|-------------------|---------------|
| {{tenant_1}} | {{tier_1}} | {{cost_1}} | {{proj_1}} | {{impact_1}} |
| {{tenant_2}} | {{tier_2}} | {{cost_2}} | {{proj_2}} | {{impact_2}} |
| {{tenant_3}} | {{tier_3}} | {{cost_3}} | {{proj_3}} | {{impact_3}} |

### 6.3 Cost Optimization Opportunities

| Opportunity | Current Cost | Optimized Cost | Savings | Implementation |
|-------------|--------------|----------------|---------|----------------|
| Reserved capacity | {{reserved_current}} | {{reserved_opt}} | {{reserved_savings}} | {{reserved_impl}} |
| Spot/preemptible | {{spot_current}} | {{spot_opt}} | {{spot_savings}} | {{spot_impl}} |
| Right-sizing | {{rightsize_current}} | {{rightsize_opt}} | {{rightsize_savings}} | {{rightsize_impl}} |
| Caching optimization | {{cache_current}} | {{cache_opt}} | {{cache_savings}} | {{cache_impl}} |

### 6.4 Budget Forecasting

| Period | Projected Cost | Budget | Variance |
|--------|----------------|--------|----------|
| Current month | {{current_proj}} | {{current_budget}} | {{current_variance}} |
| Next month | {{next_proj}} | {{next_budget}} | {{next_variance}} |
| Q+1 | {{q1_proj}} | {{q1_budget}} | {{q1_variance}} |
| Annual | {{annual_proj}} | {{annual_budget}} | {{annual_variance}} |

### 6.5 Cost Alerts

| Alert | Threshold | Notification |
|-------|-----------|--------------|
| Tenant cost spike | > {{tenant_spike_threshold}}% over baseline | {{tenant_spike_notify}} |
| Resource cost anomaly | > {{resource_anomaly_threshold}}% deviation | {{resource_anomaly_notify}} |
| Budget warning | > {{budget_warning_threshold}}% of budget | {{budget_warning_notify}} |
| Budget exceeded | 100% of budget | {{budget_exceeded_notify}} |

### 6.6 Infrastructure Cost Planning

| Horizon | Compute Infra | Storage Infra | Network Infra | Total |
|---------|---------------|---------------|---------------|-------|
| Current | {{infra_compute_current}} | {{infra_storage_current}} | {{infra_network_current}} | {{infra_total_current}} |
| +30 days | {{infra_compute_30d}} | {{infra_storage_30d}} | {{infra_network_30d}} | {{infra_total_30d}} |
| +90 days | {{infra_compute_90d}} | {{infra_storage_90d}} | {{infra_network_90d}} | {{infra_total_90d}} |
| +1 year | {{infra_compute_1y}} | {{infra_storage_1y}} | {{infra_network_1y}} | {{infra_total_1y}} |

---

## Implementation Checklist

### Resource Metrics
- [ ] All compute metrics instrumented with tenant_id
- [ ] Storage metrics collected at required frequency
- [ ] Network metrics aggregated per tenant
- [ ] AI/Agent metrics captured (tokens, executions)
- [ ] Metric collection architecture deployed

### Growth Projections
- [ ] Historical data collection established
- [ ] Forecasting models implemented
- [ ] Growth scenarios documented
- [ ] Seasonal patterns identified

### Scaling Triggers
- [ ] Automatic scaling rules configured
- [ ] Tenant-aware scaling implemented
- [ ] Predictive scaling enabled (if applicable)
- [ ] Scaling constraints defined

### Tier Limits
- [ ] Resource limits defined per tier
- [ ] Rate limits enforced
- [ ] Soft/hard limit behavior implemented
- [ ] Tier upgrade triggers automated

### Burst Handling
- [ ] Burst allowances configured
- [ ] Burst resource pool allocated
- [ ] Graceful degradation implemented
- [ ] Burst monitoring active

### Cost Projections
- [ ] Cost tracking per tenant implemented
- [ ] Cost optimization analysis completed
- [ ] Budget forecasting operational
- [ ] Cost alerts configured

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "multi-tenant capacity planning SaaS {date}"
- "tenant resource forecasting cloud native {date}"
- "noisy neighbor prevention capacity {date}"
- "AI workload capacity planning LLM {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Resource metrics comprehensively cover compute, storage, network, and AI workloads
- [ ] Growth projections include multiple scenarios and seasonal patterns
- [ ] Scaling triggers defined for both reactive and predictive scaling
- [ ] Tier limits documented with soft/hard enforcement mechanisms
- [ ] Burst handling strategy addresses both planned and unplanned spikes
- [ ] Cost projections include per-tenant and aggregate forecasts
- [ ] Implementation checklist items are actionable and measurable
- [ ] All metrics include tenant_id for proper isolation

---

## Appendix

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Tenant Model: `{{tenant_model_link}}`
- Cost Attribution: `{{cost_attribution_link}}`
- SLA Definition: `{{sla_definition_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
