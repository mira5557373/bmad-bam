---
name: sla-monitoring-template
description: Configure SLA monitoring and alerting for multi-tenant SaaS platforms
category: operations
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Configure SLA monitoring and alerting for multi-tenant SaaS platforms

# SLA Monitoring Configuration: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |

## Executive Summary

{{executive_summary}}

## SLA Definitions

### Availability SLAs

| Tier | Target Uptime | Measurement Window | Exclusions |
|------|---------------|-------------------|------------|
| Free | {{free_uptime_target}} | {{free_window}} | {{free_exclusions}} |
| Pro | {{pro_uptime_target}} | {{pro_window}} | {{pro_exclusions}} |
| Enterprise | {{enterprise_uptime_target}} | {{enterprise_window}} | {{enterprise_exclusions}} |

### Performance SLAs

| Metric | Free Tier | Pro Tier | Enterprise Tier |
|--------|-----------|----------|-----------------|
| API Response Time (p50) | {{free_p50}} | {{pro_p50}} | {{enterprise_p50}} |
| API Response Time (p95) | {{free_p95}} | {{pro_p95}} | {{enterprise_p95}} |
| API Response Time (p99) | {{free_p99}} | {{pro_p99}} | {{enterprise_p99}} |
| Agent Response Time | {{free_agent}} | {{pro_agent}} | {{enterprise_agent}} |
| Error Rate | {{free_error}} | {{pro_error}} | {{enterprise_error}} |

### Support SLAs

| Priority | Free Response | Pro Response | Enterprise Response |
|----------|---------------|--------------|---------------------|
| Critical | {{free_critical}} | {{pro_critical}} | {{enterprise_critical}} |
| High | {{free_high}} | {{pro_high}} | {{enterprise_high}} |
| Medium | {{free_medium}} | {{pro_medium}} | {{enterprise_medium}} |
| Low | {{free_low}} | {{pro_low}} | {{enterprise_low}} |

## Monitoring Architecture

### Metric Collection

| Layer | Metrics | Collection Method | Retention |
|-------|---------|-------------------|-----------|
| Infrastructure | {{infra_metrics}} | {{infra_method}} | {{infra_retention}} |
| Application | {{app_metrics}} | {{app_method}} | {{app_retention}} |
| Database | {{db_metrics}} | {{db_method}} | {{db_retention}} |
| AI/Agent | {{ai_metrics}} | {{ai_method}} | {{ai_retention}} |

### Tenant-Scoped Metrics

| Metric | Scope | Aggregation | Alert Threshold |
|--------|-------|-------------|-----------------|
| Request Rate | Per-tenant | {{request_aggregation}} | {{request_threshold}} |
| Error Rate | Per-tenant | {{error_aggregation}} | {{error_threshold}} |
| Latency | Per-tenant | {{latency_aggregation}} | {{latency_threshold}} |
| Token Usage | Per-tenant | {{token_aggregation}} | {{token_threshold}} |

## SLO Configuration

### Availability SLOs

| Service | SLO Target | Error Budget | Burn Rate Alert |
|---------|------------|--------------|-----------------|
| API Gateway | {{api_slo}} | {{api_budget}} | {{api_burn_rate}} |
| Database | {{db_slo}} | {{db_budget}} | {{db_burn_rate}} |
| Agent Runtime | {{agent_slo}} | {{agent_budget}} | {{agent_burn_rate}} |
| Authentication | {{auth_slo}} | {{auth_budget}} | {{auth_burn_rate}} |

### Performance SLOs

| Endpoint Category | Latency SLO | Success Rate SLO | Measurement |
|-------------------|-------------|------------------|-------------|
| Critical Path | {{critical_latency_slo}} | {{critical_success_slo}} | {{critical_measurement}} |
| Standard API | {{standard_latency_slo}} | {{standard_success_slo}} | {{standard_measurement}} |
| Background Jobs | {{background_latency_slo}} | {{background_success_slo}} | {{background_measurement}} |
| Agent Operations | {{agent_latency_slo}} | {{agent_success_slo}} | {{agent_measurement}} |

## Alert Configuration

### Alert Severity Matrix

| Severity | Response Time | Escalation | Notification Channels |
|----------|---------------|------------|----------------------|
| P1 (Critical) | {{p1_response}} | {{p1_escalation}} | {{p1_channels}} |
| P2 (High) | {{p2_response}} | {{p2_escalation}} | {{p2_channels}} |
| P3 (Medium) | {{p3_response}} | {{p3_escalation}} | {{p3_channels}} |
| P4 (Low) | {{p4_response}} | {{p4_escalation}} | {{p4_channels}} |

### Error Budget Alerts

| Alert Type | Threshold | Window | Action |
|------------|-----------|--------|--------|
| Warning | {{warning_threshold}} | {{warning_window}} | {{warning_action}} |
| Critical | {{critical_threshold}} | {{critical_window}} | {{critical_action}} |
| Budget Exhausted | {{exhausted_threshold}} | {{exhausted_window}} | {{exhausted_action}} |

### Tenant-Specific Alerts

| Alert | Scope | Condition | Notification |
|-------|-------|-----------|--------------|
| Tenant Error Spike | {{error_spike_scope}} | {{error_spike_condition}} | {{error_spike_notify}} |
| Tenant Degradation | {{degradation_scope}} | {{degradation_condition}} | {{degradation_notify}} |
| Quota Warning | {{quota_scope}} | {{quota_condition}} | {{quota_notify}} |

## Dashboard Configuration

### Platform Overview Dashboard

| Panel | Metric | Visualization | Refresh |
|-------|--------|---------------|---------|
| Global Availability | {{global_avail_metric}} | {{global_avail_viz}} | {{global_avail_refresh}} |
| Request Volume | {{request_vol_metric}} | {{request_vol_viz}} | {{request_vol_refresh}} |
| Error Rate | {{error_rate_metric}} | {{error_rate_viz}} | {{error_rate_refresh}} |
| Latency Distribution | {{latency_metric}} | {{latency_viz}} | {{latency_refresh}} |

### Tenant Health Dashboard

| Panel | Metric | Grouping | Drill-down |
|-------|--------|----------|------------|
| Tenant SLA Status | {{tenant_sla_metric}} | {{tenant_sla_group}} | {{tenant_sla_drill}} |
| Top Error Tenants | {{top_error_metric}} | {{top_error_group}} | {{top_error_drill}} |
| Latency by Tenant | {{tenant_latency_metric}} | {{tenant_latency_group}} | {{tenant_latency_drill}} |

### SLO Dashboard

| Panel | Metric | Budget Display | Alert Status |
|-------|--------|----------------|--------------|
| Availability Budget | {{avail_budget_metric}} | {{avail_budget_display}} | {{avail_alert}} |
| Latency Budget | {{latency_budget_metric}} | {{latency_budget_display}} | {{latency_alert}} |
| Error Budget | {{error_budget_metric}} | {{error_budget_display}} | {{error_alert}} |

## Reporting Configuration

### SLA Reports

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Executive Summary | {{exec_frequency}} | {{exec_recipients}} | {{exec_format}} |
| Tenant SLA Report | {{tenant_frequency}} | {{tenant_recipients}} | {{tenant_format}} |
| Incident Report | {{incident_frequency}} | {{incident_recipients}} | {{incident_format}} |

### Automated Notifications

| Event | Trigger | Template | Recipients |
|-------|---------|----------|------------|
| SLA Breach | {{breach_trigger}} | {{breach_template}} | {{breach_recipients}} |
| Near Miss | {{near_miss_trigger}} | {{near_miss_template}} | {{near_miss_recipients}} |
| Recovery | {{recovery_trigger}} | {{recovery_template}} | {{recovery_recipients}} |

## Credit and Compensation

### SLA Credit Policy

| Uptime | Credit Percentage | Maximum Credit |
|--------|-------------------|----------------|
| {{uptime_tier_1}} | {{credit_tier_1}} | {{max_credit_1}} |
| {{uptime_tier_2}} | {{credit_tier_2}} | {{max_credit_2}} |
| {{uptime_tier_3}} | {{credit_tier_3}} | {{max_credit_3}} |

### Credit Calculation

| Factor | Measurement | Calculation |
|--------|-------------|-------------|
| Downtime | {{downtime_measurement}} | {{downtime_calculation}} |
| Monthly Fee | {{fee_measurement}} | {{fee_calculation}} |
| Credit Amount | {{credit_measurement}} | {{credit_calculation}} |

---

## Verification Checklist

### Monitoring Setup

- [ ] All SLA metrics are being collected
- [ ] Tenant-scoped metrics are properly tagged
- [ ] Retention policies configured
- [ ] Aggregation intervals set correctly
- [ ] Historical data accessible

### Alert Configuration

- [ ] Alert thresholds aligned with SLAs
- [ ] Escalation paths defined
- [ ] On-call rotation configured
- [ ] Alert fatigue mitigation in place
- [ ] Tenant-specific alerts configured

### Dashboard Setup

- [ ] Platform overview dashboard created
- [ ] Tenant health dashboard created
- [ ] SLO tracking dashboard configured
- [ ] Role-based access configured
- [ ] Real-time refresh working

### Reporting

- [ ] Automated reports scheduled
- [ ] Credit calculation automated
- [ ] Tenant notification templates ready
- [ ] Historical trends available

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SLA monitoring multi-tenant SaaS best practices {date}"
- "SLO error budget implementation patterns {date}"
- "tenant-aware observability dashboards {date}"
- "SLA credit automation strategies {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix

### Metric Definitions

| Metric | Definition | Calculation |
|--------|------------|-------------|
| Availability | {{availability_definition}} | {{availability_calc}} |
| Latency | {{latency_definition}} | {{latency_calc}} |
| Error Rate | {{error_rate_definition}} | {{error_rate_calc}} |

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- SLA Definition: `{{sla_definition_link}}`
- Incident Response: `{{incident_response_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial configuration |
