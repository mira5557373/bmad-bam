---
name: tenant-health-monitoring-template
description: Design tenant health dashboard for monitoring individual tenant status
category: operations
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Design tenant health dashboard for monitoring individual tenant status

# Tenant Health Monitoring Design: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |

## Executive Summary

{{executive_summary}}

## Health Monitoring Overview

### Monitoring Objectives

| Objective | Description | Priority |
|-----------|-------------|----------|
| Proactive Detection | {{proactive_desc}} | {{proactive_priority}} |
| SLA Compliance | {{sla_desc}} | {{sla_priority}} |
| Resource Optimization | {{resource_desc}} | {{resource_priority}} |
| Tenant Experience | {{experience_desc}} | {{experience_priority}} |

### Health Dimensions

| Dimension | Indicators | Weight |
|-----------|------------|--------|
| Availability | {{availability_indicators}} | {{availability_weight}} |
| Performance | {{performance_indicators}} | {{performance_weight}} |
| Usage | {{usage_indicators}} | {{usage_weight}} |
| Errors | {{error_indicators}} | {{error_weight}} |

## Health Score Calculation

### Score Components

| Component | Metrics | Calculation | Weight |
|-----------|---------|-------------|--------|
| Availability Score | {{avail_metrics}} | {{avail_calc}} | {{avail_weight}} |
| Latency Score | {{latency_metrics}} | {{latency_calc}} | {{latency_weight}} |
| Error Score | {{error_metrics}} | {{error_calc}} | {{error_weight}} |
| Usage Score | {{usage_metrics}} | {{usage_calc}} | {{usage_weight}} |

### Health Status Thresholds

| Status | Score Range | Color | Action |
|--------|-------------|-------|--------|
| Healthy | {{healthy_range}} | {{healthy_color}} | {{healthy_action}} |
| Warning | {{warning_range}} | {{warning_color}} | {{warning_action}} |
| Degraded | {{degraded_range}} | {{degraded_color}} | {{degraded_action}} |
| Critical | {{critical_range}} | {{critical_color}} | {{critical_action}} |

### Score Aggregation

| Level | Aggregation Method | Update Frequency |
|-------|-------------------|------------------|
| Real-time | {{realtime_method}} | {{realtime_freq}} |
| Hourly | {{hourly_method}} | {{hourly_freq}} |
| Daily | {{daily_method}} | {{daily_freq}} |
| Weekly | {{weekly_method}} | {{weekly_freq}} |

## Metrics Collection

### Per-Tenant Metrics

| Metric Category | Metrics | Collection Method | Retention |
|-----------------|---------|-------------------|-----------|
| API | {{api_metrics}} | {{api_collection}} | {{api_retention}} |
| Database | {{db_metrics}} | {{db_collection}} | {{db_retention}} |
| Agent | {{agent_metrics}} | {{agent_collection}} | {{agent_retention}} |
| Storage | {{storage_metrics}} | {{storage_collection}} | {{storage_retention}} |

### Metric Dimensions

| Dimension | Purpose | Cardinality |
|-----------|---------|-------------|
| tenant_id | {{tenant_id_purpose}} | {{tenant_id_cardinality}} |
| tier | {{tier_purpose}} | {{tier_cardinality}} |
| endpoint | {{endpoint_purpose}} | {{endpoint_cardinality}} |
| region | {{region_purpose}} | {{region_cardinality}} |

### Baseline Calculation

| Metric | Baseline Method | Window | Anomaly Threshold |
|--------|-----------------|--------|-------------------|
| Request Rate | {{request_baseline}} | {{request_window}} | {{request_anomaly}} |
| Latency | {{latency_baseline}} | {{latency_window}} | {{latency_anomaly}} |
| Error Rate | {{error_baseline}} | {{error_window}} | {{error_anomaly}} |
| Token Usage | {{token_baseline}} | {{token_window}} | {{token_anomaly}} |

## Dashboard Design

### Platform Operator View

| Panel | Purpose | Data Source | Visualization |
|-------|---------|-------------|---------------|
| Tenant Health Grid | {{grid_purpose}} | {{grid_source}} | {{grid_viz}} |
| Top Issues | {{issues_purpose}} | {{issues_source}} | {{issues_viz}} |
| Trend Analysis | {{trend_purpose}} | {{trend_source}} | {{trend_viz}} |
| SLA Status | {{sla_purpose}} | {{sla_source}} | {{sla_viz}} |

### Individual Tenant View

| Panel | Purpose | Data Source | Drill-down |
|-------|---------|-------------|------------|
| Health Score | {{score_purpose}} | {{score_source}} | {{score_drill}} |
| Activity Timeline | {{timeline_purpose}} | {{timeline_source}} | {{timeline_drill}} |
| Resource Usage | {{usage_purpose}} | {{usage_source}} | {{usage_drill}} |
| Recent Errors | {{errors_purpose}} | {{errors_source}} | {{errors_drill}} |

### Comparison View

| Panel | Comparison Type | Metrics | Time Range |
|-------|-----------------|---------|------------|
| Tier Comparison | {{tier_comparison}} | {{tier_metrics}} | {{tier_range}} |
| Historical | {{historical_comparison}} | {{historical_metrics}} | {{historical_range}} |
| Peer Group | {{peer_comparison}} | {{peer_metrics}} | {{peer_range}} |

## Alert Configuration

### Tenant-Level Alerts

| Alert Type | Condition | Severity | Notification |
|------------|-----------|----------|--------------|
| Health Score Drop | {{score_drop_condition}} | {{score_drop_severity}} | {{score_drop_notify}} |
| Error Spike | {{error_spike_condition}} | {{error_spike_severity}} | {{error_spike_notify}} |
| Latency Degradation | {{latency_condition}} | {{latency_severity}} | {{latency_notify}} |
| Usage Anomaly | {{usage_anomaly_condition}} | {{usage_anomaly_severity}} | {{usage_anomaly_notify}} |

### Tier-Level Alerts

| Alert Type | Scope | Condition | Action |
|------------|-------|-----------|--------|
| Tier-Wide Issue | {{tier_wide_scope}} | {{tier_wide_condition}} | {{tier_wide_action}} |
| SLA Risk | {{sla_risk_scope}} | {{sla_risk_condition}} | {{sla_risk_action}} |
| Capacity Warning | {{capacity_scope}} | {{capacity_condition}} | {{capacity_action}} |

### Alert Routing

| Severity | Internal Team | Tenant Contact | Escalation |
|----------|---------------|----------------|------------|
| Critical | {{critical_internal}} | {{critical_tenant}} | {{critical_escalate}} |
| High | {{high_internal}} | {{high_tenant}} | {{high_escalate}} |
| Medium | {{medium_internal}} | {{medium_tenant}} | {{medium_escalate}} |
| Low | {{low_internal}} | {{low_tenant}} | {{low_escalate}} |

## Automated Actions

### Self-Healing Actions

| Trigger | Action | Approval | Rollback |
|---------|--------|----------|----------|
| High Error Rate | {{error_action}} | {{error_approval}} | {{error_rollback}} |
| Resource Exhaustion | {{resource_action}} | {{resource_approval}} | {{resource_rollback}} |
| Connection Issues | {{connection_action}} | {{connection_approval}} | {{connection_rollback}} |

### Proactive Notifications

| Condition | Notification Type | Recipient | Lead Time |
|-----------|-------------------|-----------|-----------|
| Quota Near Limit | {{quota_notification}} | {{quota_recipient}} | {{quota_lead}} |
| Maintenance Window | {{maintenance_notification}} | {{maintenance_recipient}} | {{maintenance_lead}} |
| Tier Upgrade Suggested | {{upgrade_notification}} | {{upgrade_recipient}} | {{upgrade_lead}} |

## Reporting

### Tenant Health Reports

| Report | Frequency | Format | Distribution |
|--------|-----------|--------|--------------|
| Health Summary | {{summary_freq}} | {{summary_format}} | {{summary_dist}} |
| Incident Report | {{incident_freq}} | {{incident_format}} | {{incident_dist}} |
| SLA Report | {{sla_freq}} | {{sla_format}} | {{sla_dist}} |
| Trend Analysis | {{trend_freq}} | {{trend_format}} | {{trend_dist}} |

### Platform Reports

| Report | Audience | Metrics | Frequency |
|--------|----------|---------|-----------|
| Executive Summary | {{exec_audience}} | {{exec_metrics}} | {{exec_freq}} |
| Operations Review | {{ops_audience}} | {{ops_metrics}} | {{ops_freq}} |
| Capacity Planning | {{capacity_audience}} | {{capacity_metrics}} | {{capacity_freq}} |

## Technical Implementation

### Data Pipeline

| Stage | Component | Throughput | Latency |
|-------|-----------|------------|---------|
| Collection | {{collection_component}} | {{collection_throughput}} | {{collection_latency}} |
| Processing | {{processing_component}} | {{processing_throughput}} | {{processing_latency}} |
| Storage | {{storage_component}} | {{storage_throughput}} | {{storage_latency}} |
| Query | {{query_component}} | {{query_throughput}} | {{query_latency}} |

### Storage Strategy

| Data Type | Storage | Retention | Aggregation |
|-----------|---------|-----------|-------------|
| Raw Metrics | {{raw_storage}} | {{raw_retention}} | {{raw_aggregation}} |
| Aggregated | {{agg_storage}} | {{agg_retention}} | {{agg_aggregation}} |
| Health Scores | {{score_storage}} | {{score_retention}} | {{score_aggregation}} |
| Alerts | {{alert_storage}} | {{alert_retention}} | {{alert_aggregation}} |

### Query Performance

| Query Type | Max Latency | Caching | Pre-aggregation |
|------------|-------------|---------|-----------------|
| Real-time Health | {{realtime_latency}} | {{realtime_cache}} | {{realtime_preagg}} |
| Historical Trend | {{historical_latency}} | {{historical_cache}} | {{historical_preagg}} |
| Comparison | {{comparison_latency}} | {{comparison_cache}} | {{comparison_preagg}} |

---

## Verification Checklist

### Metric Collection

- [ ] All tenant metrics being collected
- [ ] Proper tenant_id tagging
- [ ] Retention policies configured
- [ ] Aggregation pipelines working
- [ ] Baseline calculations running

### Health Score

- [ ] Score calculation accurate
- [ ] Thresholds appropriately set
- [ ] Updates occurring at expected frequency
- [ ] Historical scores preserved

### Dashboard

- [ ] Platform view operational
- [ ] Tenant views loading correctly
- [ ] Drill-downs functional
- [ ] Performance acceptable

### Alerting

- [ ] Alert rules configured
- [ ] Notification channels working
- [ ] Escalation paths tested
- [ ] Alert fatigue mitigation in place

### Reporting

- [ ] Automated reports generating
- [ ] Distribution lists correct
- [ ] Data accuracy verified

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant health monitoring dashboard design {date}"
- "multi-tenant health score calculation patterns {date}"
- "SaaS customer health indicators {date}"
- "proactive tenant monitoring strategies {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix

### Health Score Formula

{{health_score_formula}}

### Metric Definitions

| Metric | Definition | Calculation |
|--------|------------|-------------|
| {{metric_name}} | {{metric_definition}} | {{metric_calculation}} |

### Related Documents

- SLA Monitoring: `{{sla_monitoring_link}}`
- Observability Spec: `{{observability_link}}`
- Incident Response: `{{incident_response_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial health monitoring design |
