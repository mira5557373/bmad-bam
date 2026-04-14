---
name: performance-review-template
description: Document SLA compliance, latency percentiles, error rates, and capacity utilization for multi-tenant SaaS performance analysis
category: operations
version: 1.0.0
type: template
---

# Performance Review: {{project_name}}

## Purpose

Use this template to conduct comprehensive performance reviews for multi-tenant SaaS platforms. This document covers SLA compliance by tenant tier, latency percentiles, error rates, capacity utilization, and recommendations for performance optimization to ensure service quality and scalability across the platform.

## Document Metadata

| Field | Value |
|-------|-------|
| Project Name | {{project_name}} |
| Review Period | {{review_period}} |
| Review Date | {{review_date}} |
| Prepared By | {{prepared_by}} |
| Reviewed By | {{reviewed_by}} |
| Version | {{version}} |
| Status | {{status}} |
| Next Review | {{next_review_date}} |

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [SLA Compliance by Tier](#sla-compliance-by-tier)
3. [Latency Percentiles](#latency-percentiles)
4. [Error Rates](#error-rates)
5. [Capacity Utilization](#capacity-utilization)
6. [Tenant-Specific Performance](#tenant-specific-performance)
7. [AI Agent Performance](#ai-agent-performance)
8. [Infrastructure Performance](#infrastructure-performance)
9. [Trend Analysis](#trend-analysis)
10. [Recommendations](#recommendations)
11. [Web Research Queries](#web-research-queries)
12. [Verification Checklist](#verification-checklist)
13. [Change Log](#change-log)

---

## Executive Summary

### Overall Performance Score

| Dimension | Score | Target | Status | Trend |
|-----------|-------|--------|--------|-------|
| Availability | {{avail_score}} | 99.9% | {{avail_status}} | {{avail_trend}} |
| Response Time | {{resp_score}} | < 500ms p95 | {{resp_status}} | {{resp_trend}} |
| Error Rate | {{error_score}} | < 0.1% | {{error_status}} | {{error_trend}} |
| Throughput | {{throughput_score}} | > baseline | {{throughput_status}} | {{throughput_trend}} |
| **Overall** | {{overall_score}} | - | **{{overall_status}}** | {{overall_trend}} |

### Key Findings

| Finding | Impact | Priority | Action Required |
|---------|--------|----------|-----------------|
| {{finding_1}} | {{impact_1}} | {{priority_1}} | {{action_1}} |
| {{finding_2}} | {{impact_2}} | {{priority_2}} | {{action_2}} |
| {{finding_3}} | {{impact_3}} | {{priority_3}} | {{action_3}} |

### Period Highlights

| Metric | Previous Period | Current Period | Change | Assessment |
|--------|-----------------|----------------|--------|------------|
| Total requests | {{prev_requests}} | {{curr_requests}} | {{req_change}} | {{req_assess}} |
| Active tenants | {{prev_tenants}} | {{curr_tenants}} | {{tenant_change}} | {{tenant_assess}} |
| Peak load | {{prev_peak}} | {{curr_peak}} | {{peak_change}} | {{peak_assess}} |
| Incidents | {{prev_incidents}} | {{curr_incidents}} | {{incident_change}} | {{incident_assess}} |

---

## SLA Compliance by Tier

### Availability SLA

| Tier | SLA Target | Achieved | Downtime | Credits Due | Status |
|------|------------|----------|----------|-------------|--------|
| Enterprise | 99.99% | {{ent_avail}} | {{ent_downtime}} | {{ent_credits}} | {{ent_avail_status}} |
| Pro | 99.9% | {{pro_avail}} | {{pro_downtime}} | {{pro_credits}} | {{pro_avail_status}} |
| Free | 99.5% | {{free_avail}} | {{free_downtime}} | N/A | {{free_avail_status}} |

### Response Time SLA

| Tier | p50 Target | p50 Actual | p95 Target | p95 Actual | p99 Target | p99 Actual | Status |
|------|------------|------------|------------|------------|------------|------------|--------|
| Enterprise | < 100ms | {{ent_p50}} | < 300ms | {{ent_p95}} | < 1s | {{ent_p99}} | {{ent_resp_status}} |
| Pro | < 150ms | {{pro_p50}} | < 500ms | {{pro_p95}} | < 2s | {{pro_p99}} | {{pro_resp_status}} |
| Free | < 300ms | {{free_p50}} | < 1s | {{free_p95}} | < 3s | {{free_p99}} | {{free_resp_status}} |

### Error Rate SLA

| Tier | Target | Actual | Breaches | Duration | Status |
|------|--------|--------|----------|----------|--------|
| Enterprise | < 0.01% | {{ent_error}} | {{ent_breaches}} | {{ent_breach_dur}} | {{ent_error_status}} |
| Pro | < 0.1% | {{pro_error}} | {{pro_breaches}} | {{pro_breach_dur}} | {{pro_error_status}} |
| Free | < 1% | {{free_error}} | {{free_breaches}} | {{free_breach_dur}} | {{free_error_status}} |

### Throughput SLA

| Tier | Requests/sec Guaranteed | Peak Achieved | Burst Capacity | Status |
|------|-------------------------|---------------|----------------|--------|
| Enterprise | {{ent_rps_sla}} | {{ent_rps_peak}} | {{ent_burst}} | {{ent_rps_status}} |
| Pro | {{pro_rps_sla}} | {{pro_rps_peak}} | {{pro_burst}} | {{pro_rps_status}} |
| Free | {{free_rps_sla}} | {{free_rps_peak}} | {{free_burst}} | {{free_rps_status}} |

### SLA Compliance Summary

| Tier | Metrics Met | Metrics Breached | Compliance % | Trend |
|------|-------------|------------------|--------------|-------|
| Enterprise | {{ent_met}} | {{ent_breached}} | {{ent_compliance}} | {{ent_trend}} |
| Pro | {{pro_met}} | {{pro_breached}} | {{pro_compliance}} | {{pro_trend}} |
| Free | {{free_met}} | {{free_breached}} | {{free_compliance}} | {{free_trend}} |

---

## Latency Percentiles

### API Endpoint Latency

| Endpoint | p50 (ms) | p75 (ms) | p90 (ms) | p95 (ms) | p99 (ms) | Max (ms) | Status |
|----------|----------|----------|----------|----------|----------|----------|--------|
| `GET /api/health` | {{health_p50}} | {{health_p75}} | {{health_p90}} | {{health_p95}} | {{health_p99}} | {{health_max}} | {{health_status}} |
| `POST /api/auth/login` | {{login_p50}} | {{login_p75}} | {{login_p90}} | {{login_p95}} | {{login_p99}} | {{login_max}} | {{login_status}} |
| `GET /api/resources` | {{list_p50}} | {{list_p75}} | {{list_p90}} | {{list_p95}} | {{list_p99}} | {{list_max}} | {{list_status}} |
| `POST /api/resources` | {{create_p50}} | {{create_p75}} | {{create_p90}} | {{create_p95}} | {{create_p99}} | {{create_max}} | {{create_status}} |
| `PUT /api/resources/:id` | {{update_p50}} | {{update_p75}} | {{update_p90}} | {{update_p95}} | {{update_p99}} | {{update_max}} | {{update_status}} |
| `DELETE /api/resources/:id` | {{delete_p50}} | {{delete_p75}} | {{delete_p90}} | {{delete_p95}} | {{delete_p99}} | {{delete_max}} | {{delete_status}} |
| `GET /api/search` | {{search_p50}} | {{search_p75}} | {{search_p90}} | {{search_p95}} | {{search_p99}} | {{search_max}} | {{search_status}} |
| `POST /api/agents/execute` | {{agent_p50}} | {{agent_p75}} | {{agent_p90}} | {{agent_p95}} | {{agent_p99}} | {{agent_max}} | {{agent_status}} |

### Latency by Tier

| Tier | Requests | p50 (ms) | p95 (ms) | p99 (ms) | Outliers > 3s | Status |
|------|----------|----------|----------|----------|---------------|--------|
| Enterprise | {{ent_requests}} | {{ent_lat_p50}} | {{ent_lat_p95}} | {{ent_lat_p99}} | {{ent_outliers}} | {{ent_lat_status}} |
| Pro | {{pro_requests}} | {{pro_lat_p50}} | {{pro_lat_p95}} | {{pro_lat_p99}} | {{pro_outliers}} | {{pro_lat_status}} |
| Free | {{free_requests}} | {{free_lat_p50}} | {{free_lat_p95}} | {{free_lat_p99}} | {{free_outliers}} | {{free_lat_status}} |

### Latency Distribution Analysis

| Bucket | Count | Percentage | Cumulative |
|--------|-------|------------|------------|
| < 50ms | {{lat_50}} | {{lat_50_pct}} | {{lat_50_cum}} |
| 50-100ms | {{lat_100}} | {{lat_100_pct}} | {{lat_100_cum}} |
| 100-200ms | {{lat_200}} | {{lat_200_pct}} | {{lat_200_cum}} |
| 200-500ms | {{lat_500}} | {{lat_500_pct}} | {{lat_500_cum}} |
| 500ms-1s | {{lat_1000}} | {{lat_1000_pct}} | {{lat_1000_cum}} |
| 1s-2s | {{lat_2000}} | {{lat_2000_pct}} | {{lat_2000_cum}} |
| 2s-5s | {{lat_5000}} | {{lat_5000_pct}} | {{lat_5000_cum}} |
| > 5s | {{lat_over}} | {{lat_over_pct}} | 100% |

### Latency Hotspots

| Component | Avg Contribution | Max Contribution | Optimization Potential |
|-----------|------------------|------------------|----------------------|
| Network ingress | {{net_avg}} | {{net_max}} | {{net_potential}} |
| Auth/authz | {{auth_avg}} | {{auth_max}} | {{auth_potential}} |
| Database queries | {{db_avg}} | {{db_max}} | {{db_potential}} |
| Cache operations | {{cache_avg}} | {{cache_max}} | {{cache_potential}} |
| External APIs | {{ext_avg}} | {{ext_max}} | {{ext_potential}} |
| Response serialization | {{serial_avg}} | {{serial_max}} | {{serial_potential}} |

---

## Error Rates

### Error Rate Overview

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Overall error rate | {{overall_error_rate}} | < 0.1% | {{overall_error_status}} |
| 4xx error rate | {{4xx_rate}} | < 1% | {{4xx_status}} |
| 5xx error rate | {{5xx_rate}} | < 0.1% | {{5xx_status}} |
| Timeout rate | {{timeout_rate}} | < 0.01% | {{timeout_status}} |

### Error Distribution by Type

| Error Code | Count | Percentage | Trend | Primary Cause |
|------------|-------|------------|-------|---------------|
| 400 Bad Request | {{err_400}} | {{err_400_pct}} | {{err_400_trend}} | {{err_400_cause}} |
| 401 Unauthorized | {{err_401}} | {{err_401_pct}} | {{err_401_trend}} | {{err_401_cause}} |
| 403 Forbidden | {{err_403}} | {{err_403_pct}} | {{err_403_trend}} | {{err_403_cause}} |
| 404 Not Found | {{err_404}} | {{err_404_pct}} | {{err_404_trend}} | {{err_404_cause}} |
| 429 Rate Limited | {{err_429}} | {{err_429_pct}} | {{err_429_trend}} | {{err_429_cause}} |
| 500 Server Error | {{err_500}} | {{err_500_pct}} | {{err_500_trend}} | {{err_500_cause}} |
| 502 Bad Gateway | {{err_502}} | {{err_502_pct}} | {{err_502_trend}} | {{err_502_cause}} |
| 503 Unavailable | {{err_503}} | {{err_503_pct}} | {{err_503_trend}} | {{err_503_cause}} |
| 504 Timeout | {{err_504}} | {{err_504_pct}} | {{err_504_trend}} | {{err_504_cause}} |

### Error Rate by Service

| Service | Total Requests | Errors | Error Rate | Status |
|---------|----------------|--------|------------|--------|
| API Gateway | {{gw_requests}} | {{gw_errors}} | {{gw_error_rate}} | {{gw_status}} |
| Auth Service | {{auth_requests}} | {{auth_errors}} | {{auth_error_rate}} | {{auth_status}} |
| Core Service | {{core_requests}} | {{core_errors}} | {{core_error_rate}} | {{core_status}} |
| Billing Service | {{bill_requests}} | {{bill_errors}} | {{bill_error_rate}} | {{bill_status}} |
| Agent Service | {{agent_requests}} | {{agent_errors}} | {{agent_error_rate}} | {{agent_status}} |

### Error Rate by Tier

| Tier | Error Rate | SLA Target | Breaches | Status |
|------|------------|------------|----------|--------|
| Enterprise | {{ent_err_rate}} | < 0.01% | {{ent_err_breach}} | {{ent_err_status}} |
| Pro | {{pro_err_rate}} | < 0.1% | {{pro_err_breach}} | {{pro_err_status}} |
| Free | {{free_err_rate}} | < 1% | {{free_err_breach}} | {{free_err_status}} |

---

## Capacity Utilization

### Compute Resources

| Resource | Allocated | Used (Avg) | Used (Peak) | Utilization | Headroom | Status |
|----------|-----------|------------|-------------|-------------|----------|--------|
| CPU cores | {{cpu_alloc}} | {{cpu_avg}} | {{cpu_peak}} | {{cpu_util}} | {{cpu_headroom}} | {{cpu_status}} |
| Memory (GB) | {{mem_alloc}} | {{mem_avg}} | {{mem_peak}} | {{mem_util}} | {{mem_headroom}} | {{mem_status}} |
| Pod replicas | {{pod_alloc}} | {{pod_avg}} | {{pod_peak}} | {{pod_util}} | {{pod_headroom}} | {{pod_status}} |

### Database Resources

| Resource | Allocated | Used (Avg) | Used (Peak) | Utilization | Status |
|----------|-----------|------------|-------------|-------------|--------|
| Connections | {{db_conn_alloc}} | {{db_conn_avg}} | {{db_conn_peak}} | {{db_conn_util}} | {{db_conn_status}} |
| Storage (GB) | {{db_store_alloc}} | {{db_store_used}} | N/A | {{db_store_util}} | {{db_store_status}} |
| IOPS | {{db_iops_alloc}} | {{db_iops_avg}} | {{db_iops_peak}} | {{db_iops_util}} | {{db_iops_status}} |
| CPU | {{db_cpu_alloc}} | {{db_cpu_avg}} | {{db_cpu_peak}} | {{db_cpu_util}} | {{db_cpu_status}} |

### Cache Resources

| Resource | Allocated | Used (Avg) | Used (Peak) | Hit Rate | Status |
|----------|-----------|------------|-------------|----------|--------|
| Memory (GB) | {{cache_alloc}} | {{cache_avg}} | {{cache_peak}} | {{cache_hit}} | {{cache_status}} |
| Connections | {{cache_conn_alloc}} | {{cache_conn_avg}} | {{cache_conn_peak}} | N/A | {{cache_conn_status}} |
| Operations/sec | {{cache_ops_alloc}} | {{cache_ops_avg}} | {{cache_ops_peak}} | N/A | {{cache_ops_status}} |

### Queue Resources

| Queue | Allocated | Avg Depth | Peak Depth | Processing Rate | Lag | Status |
|-------|-----------|-----------|------------|-----------------|-----|--------|
| {{queue_1}} | {{q1_alloc}} | {{q1_avg}} | {{q1_peak}} | {{q1_rate}} | {{q1_lag}} | {{q1_status}} |
| {{queue_2}} | {{q2_alloc}} | {{q2_avg}} | {{q2_peak}} | {{q2_rate}} | {{q2_lag}} | {{q2_status}} |
| {{queue_3}} | {{q3_alloc}} | {{q3_avg}} | {{q3_peak}} | {{q3_rate}} | {{q3_lag}} | {{q3_status}} |

### Capacity Projections

| Resource | Current Usage | Growth Rate | 80% Capacity Date | 100% Capacity Date | Action Required |
|----------|---------------|-------------|-------------------|--------------------|-----------------| 
| Compute | {{comp_current}} | {{comp_growth}} | {{comp_80}} | {{comp_100}} | {{comp_action}} |
| Database | {{db_current}} | {{db_growth}} | {{db_80}} | {{db_100}} | {{db_action}} |
| Cache | {{cache_current}} | {{cache_growth}} | {{cache_80}} | {{cache_100}} | {{cache_action}} |
| Storage | {{store_current}} | {{store_growth}} | {{store_80}} | {{store_100}} | {{store_action}} |

---

## Tenant-Specific Performance

### Top Tenants by Usage

| Rank | Tenant | Tier | Requests | % of Total | Avg Latency | Error Rate |
|------|--------|------|----------|------------|-------------|------------|
| 1 | {{top1_tenant}} | {{top1_tier}} | {{top1_req}} | {{top1_pct}} | {{top1_lat}} | {{top1_err}} |
| 2 | {{top2_tenant}} | {{top2_tier}} | {{top2_req}} | {{top2_pct}} | {{top2_lat}} | {{top2_err}} |
| 3 | {{top3_tenant}} | {{top3_tier}} | {{top3_req}} | {{top3_pct}} | {{top3_lat}} | {{top3_err}} |
| 4 | {{top4_tenant}} | {{top4_tier}} | {{top4_req}} | {{top4_pct}} | {{top4_lat}} | {{top4_err}} |
| 5 | {{top5_tenant}} | {{top5_tier}} | {{top5_req}} | {{top5_pct}} | {{top5_lat}} | {{top5_err}} |

### Tenants with Performance Issues

| Tenant | Tier | Issue | Impact | Duration | Resolution |
|--------|------|-------|--------|----------|------------|
| {{issue1_tenant}} | {{issue1_tier}} | {{issue1_desc}} | {{issue1_impact}} | {{issue1_dur}} | {{issue1_res}} |
| {{issue2_tenant}} | {{issue2_tier}} | {{issue2_desc}} | {{issue2_impact}} | {{issue2_dur}} | {{issue2_res}} |

### Tenant Resource Consumption

| Tier | Tenant Count | API Calls | Storage Used | AI Tokens | Cost Contribution |
|------|--------------|-----------|--------------|-----------|-------------------|
| Enterprise | {{ent_count}} | {{ent_calls}} | {{ent_storage}} | {{ent_tokens}} | {{ent_cost}} |
| Pro | {{pro_count}} | {{pro_calls}} | {{pro_storage}} | {{pro_tokens}} | {{pro_cost}} |
| Free | {{free_count}} | {{free_calls}} | {{free_storage}} | {{free_tokens}} | {{free_cost}} |

---

## AI Agent Performance

### Agent Execution Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Total executions | {{agent_total_exec}} | - | - |
| Successful executions | {{agent_success}} | > 95% | {{agent_success_status}} |
| Failed executions | {{agent_failed}} | < 5% | {{agent_failed_status}} |
| Average duration | {{agent_avg_dur}} | < 30s | {{agent_dur_status}} |
| p99 duration | {{agent_p99_dur}} | < 60s | {{agent_p99_status}} |

### Agent Performance by Type

| Agent Type | Executions | Success Rate | Avg Duration | Token Usage | Status |
|------------|------------|--------------|--------------|-------------|--------|
| {{agent_type_1}} | {{at1_exec}} | {{at1_success}} | {{at1_dur}} | {{at1_tokens}} | {{at1_status}} |
| {{agent_type_2}} | {{at2_exec}} | {{at2_success}} | {{at2_dur}} | {{at2_tokens}} | {{at2_status}} |
| {{agent_type_3}} | {{at3_exec}} | {{at3_success}} | {{at3_dur}} | {{at3_tokens}} | {{at3_status}} |

### LLM Provider Metrics

| Provider | Requests | Success Rate | Avg Latency | p99 Latency | Token Cost |
|----------|----------|--------------|-------------|-------------|------------|
| {{llm_1}} | {{llm1_req}} | {{llm1_success}} | {{llm1_lat}} | {{llm1_p99}} | {{llm1_cost}} |
| {{llm_2}} | {{llm2_req}} | {{llm2_success}} | {{llm2_lat}} | {{llm2_p99}} | {{llm2_cost}} |

### Tool Execution Performance

| Tool | Invocations | Success Rate | Avg Duration | Failures | Status |
|------|-------------|--------------|--------------|----------|--------|
| {{tool_1}} | {{t1_invoc}} | {{t1_success}} | {{t1_dur}} | {{t1_fail}} | {{t1_status}} |
| {{tool_2}} | {{t2_invoc}} | {{t2_success}} | {{t2_dur}} | {{t2_fail}} | {{t2_status}} |
| {{tool_3}} | {{t3_invoc}} | {{t3_success}} | {{t3_dur}} | {{t3_fail}} | {{t3_status}} |

---

## Infrastructure Performance

### Network Performance

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Ingress bandwidth | {{ingress_bw}} | - | {{ingress_status}} |
| Egress bandwidth | {{egress_bw}} | - | {{egress_status}} |
| Network latency | {{net_latency}} | < 5ms | {{net_lat_status}} |
| Packet loss | {{packet_loss}} | < 0.01% | {{packet_status}} |

### Load Balancer Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Active connections | {{lb_connections}} | {{lb_conn_status}} |
| Requests/second | {{lb_rps}} | {{lb_rps_status}} |
| Backend health | {{lb_backend}} | {{lb_backend_status}} |
| SSL handshakes | {{lb_ssl}} | {{lb_ssl_status}} |

### CDN Performance

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Cache hit ratio | {{cdn_hit}} | > 90% | {{cdn_hit_status}} |
| Origin requests | {{cdn_origin}} | - | {{cdn_origin_status}} |
| Bandwidth served | {{cdn_bw}} | - | {{cdn_bw_status}} |
| Edge latency | {{cdn_lat}} | < 50ms | {{cdn_lat_status}} |

---

## Trend Analysis

### Weekly Trends

| Week | Requests | Avg Latency | Error Rate | Availability |
|------|----------|-------------|------------|--------------|
| {{week_1}} | {{w1_req}} | {{w1_lat}} | {{w1_err}} | {{w1_avail}} |
| {{week_2}} | {{w2_req}} | {{w2_lat}} | {{w2_err}} | {{w2_avail}} |
| {{week_3}} | {{w3_req}} | {{w3_lat}} | {{w3_err}} | {{w3_avail}} |
| {{week_4}} | {{w4_req}} | {{w4_lat}} | {{w4_err}} | {{w4_avail}} |

### Month-over-Month Comparison

| Metric | Previous Month | Current Month | Change | Assessment |
|--------|----------------|---------------|--------|------------|
| Total requests | {{prev_mo_req}} | {{curr_mo_req}} | {{req_mom}} | {{req_mom_assess}} |
| Active tenants | {{prev_mo_tenants}} | {{curr_mo_tenants}} | {{tenant_mom}} | {{tenant_mom_assess}} |
| Avg latency | {{prev_mo_lat}} | {{curr_mo_lat}} | {{lat_mom}} | {{lat_mom_assess}} |
| Error rate | {{prev_mo_err}} | {{curr_mo_err}} | {{err_mom}} | {{err_mom_assess}} |
| Availability | {{prev_mo_avail}} | {{curr_mo_avail}} | {{avail_mom}} | {{avail_mom_assess}} |

### Growth Projections

| Metric | Current | 3 Month | 6 Month | 12 Month |
|--------|---------|---------|---------|----------|
| Request volume | {{curr_vol}} | {{3mo_vol}} | {{6mo_vol}} | {{12mo_vol}} |
| Tenant count | {{curr_tenants}} | {{3mo_tenants}} | {{6mo_tenants}} | {{12mo_tenants}} |
| Storage used | {{curr_storage}} | {{3mo_storage}} | {{6mo_storage}} | {{12mo_storage}} |
| AI token usage | {{curr_tokens}} | {{3mo_tokens}} | {{6mo_tokens}} | {{12mo_tokens}} |

---

## Recommendations

### Immediate Actions (Within 1 Week)

| Priority | Recommendation | Impact | Effort | Owner | Deadline |
|----------|----------------|--------|--------|-------|----------|
| P1 | {{rec_1}} | {{rec_1_impact}} | {{rec_1_effort}} | {{rec_1_owner}} | {{rec_1_deadline}} |
| P1 | {{rec_2}} | {{rec_2_impact}} | {{rec_2_effort}} | {{rec_2_owner}} | {{rec_2_deadline}} |
| P2 | {{rec_3}} | {{rec_3_impact}} | {{rec_3_effort}} | {{rec_3_owner}} | {{rec_3_deadline}} |

### Short-Term Improvements (Within 1 Month)

| Priority | Recommendation | Impact | Effort | Owner | Deadline |
|----------|----------------|--------|--------|-------|----------|
| P2 | {{st_rec_1}} | {{st_rec_1_impact}} | {{st_rec_1_effort}} | {{st_rec_1_owner}} | {{st_rec_1_deadline}} |
| P2 | {{st_rec_2}} | {{st_rec_2_impact}} | {{st_rec_2_effort}} | {{st_rec_2_owner}} | {{st_rec_2_deadline}} |
| P3 | {{st_rec_3}} | {{st_rec_3_impact}} | {{st_rec_3_effort}} | {{st_rec_3_owner}} | {{st_rec_3_deadline}} |

### Long-Term Initiatives (Within Quarter)

| Priority | Recommendation | Impact | Effort | Owner | Deadline |
|----------|----------------|--------|--------|-------|----------|
| P3 | {{lt_rec_1}} | {{lt_rec_1_impact}} | {{lt_rec_1_effort}} | {{lt_rec_1_owner}} | {{lt_rec_1_deadline}} |
| P3 | {{lt_rec_2}} | {{lt_rec_2_impact}} | {{lt_rec_2_effort}} | {{lt_rec_2_owner}} | {{lt_rec_2_deadline}} |

### Capacity Planning Actions

| Resource | Action Required | Timeline | Budget Impact | Risk if Delayed |
|----------|-----------------|----------|---------------|-----------------|
| {{cap_resource_1}} | {{cap_action_1}} | {{cap_timeline_1}} | {{cap_budget_1}} | {{cap_risk_1}} |
| {{cap_resource_2}} | {{cap_action_2}} | {{cap_timeline_2}} | {{cap_budget_2}} | {{cap_risk_2}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SaaS performance monitoring best practices {date}"
- "multi-tenant SLA management strategies {date}"
- "cloud capacity planning optimization {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] SLA compliance is measured for all tenant tiers
- [ ] Availability targets are documented with actual performance
- [ ] Response time SLAs include p50, p95, and p99 percentiles
- [ ] Error rate SLAs are tracked with breach counts
- [ ] Latency percentiles cover all major API endpoints
- [ ] Latency distribution analysis identifies outliers
- [ ] Latency hotspots are identified with optimization potential
- [ ] Error rates are broken down by type and service
- [ ] Error rates are tracked per tenant tier
- [ ] Capacity utilization covers compute, database, cache, and queues
- [ ] Capacity projections include 80% and 100% capacity dates
- [ ] Top tenants by usage are identified
- [ ] Tenants with performance issues are documented
- [ ] AI agent performance is measured with success rates
- [ ] Infrastructure performance covers network, load balancer, and CDN
- [ ] Trend analysis includes weekly and monthly comparisons
- [ ] Recommendations are prioritized with owners and deadlines
- [ ] Capacity planning actions are documented with risk assessment

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
