---
name: API Deprecation Template
description: Comprehensive API deprecation lifecycle management including sunset schedules, migration guides, and communication plans for multi-tenant platforms
category: integration
version: 1.0.0
type: template
---

# {{project_name}} API Deprecation Plan

## Purpose

This template documents the complete API deprecation lifecycle for {{project_name}}, including sunset dates, migration paths, tenant communication strategies, and backward compatibility requirements. It ensures smooth transitions for all tenants while maintaining platform stability and compliance with versioning policies.

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | `DEP-{{deprecation_id}}` |
| API Version | {{api_version}} |
| Deprecation Date | {{deprecation_date}} |
| Sunset Date | {{sunset_date}} |
| Author | {{author}} |
| Approver | {{approver}} |
| Classification | {{classification}} |
| Last Updated | {{last_updated}} |

## Table of Contents

1. [Deprecation Overview](#deprecation-overview)
2. [Impact Assessment](#impact-assessment)
3. [Tenant Analysis](#tenant-analysis)
4. [Migration Guide](#migration-guide)
5. [Communication Plan](#communication-plan)
6. [Timeline and Milestones](#timeline-and-milestones)
7. [Compatibility Layer](#compatibility-layer)
8. [Monitoring and Metrics](#monitoring-and-metrics)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

## Deprecation Overview

### API Endpoints Affected

| Endpoint | Method | Current Version | Replacement | Deprecation Reason |
|----------|--------|-----------------|-------------|-------------------|
| {{endpoint_path}} | {{http_method}} | {{current_version}} | {{replacement_endpoint}} | {{deprecation_reason}} |
| {{endpoint_path_2}} | {{http_method_2}} | {{current_version_2}} | {{replacement_endpoint_2}} | {{deprecation_reason_2}} |

### Deprecation Categories

| Category | Description | Standard Timeline |
|----------|-------------|-------------------|
| Breaking Change | Incompatible changes requiring code updates | {{breaking_timeline}} months |
| Feature Removal | Entire feature being discontinued | {{feature_removal_timeline}} months |
| Security Update | Security-driven deprecation | {{security_timeline}} weeks |
| Performance | Performance optimization requiring changes | {{performance_timeline}} months |

## Impact Assessment

### Tenant Impact Matrix

| Tier | Estimated Tenants Affected | Traffic Volume | Risk Level | Priority |
|------|---------------------------|----------------|------------|----------|
| Enterprise | {{enterprise_count}} | {{enterprise_traffic}} | {{enterprise_risk}} | {{enterprise_priority}} |
| Professional | {{professional_count}} | {{professional_traffic}} | {{professional_risk}} | {{professional_priority}} |
| Starter | {{starter_count}} | {{starter_traffic}} | {{starter_risk}} | {{starter_priority}} |

### Breaking Changes Analysis

| Change Type | Description | Affected Fields | Migration Complexity |
|-------------|-------------|-----------------|---------------------|
| Request Schema | {{request_change_description}} | {{affected_request_fields}} | {{request_complexity}} |
| Response Schema | {{response_change_description}} | {{affected_response_fields}} | {{response_complexity}} |
| Authentication | {{auth_change_description}} | {{affected_auth_fields}} | {{auth_complexity}} |
| Rate Limits | {{rate_limit_description}} | {{affected_limits}} | {{rate_complexity}} |

## Tenant Analysis

### Active Usage Statistics

| Metric | Value | Trend |
|--------|-------|-------|
| Total API Calls (30 days) | {{total_calls_30d}} | {{calls_trend}} |
| Unique Tenants Using Endpoint | {{unique_tenants}} | {{tenant_trend}} |
| Peak Daily Requests | {{peak_daily}} | {{peak_trend}} |
| Error Rate on Deprecated Endpoints | {{error_rate}} | {{error_trend}} |

### High-Impact Tenants

| Tenant ID | Tier | Daily Calls | Integration Type | Migration Support |
|-----------|------|-------------|------------------|-------------------|
| {{tenant_id_1}} | {{tier_1}} | {{daily_calls_1}} | {{integration_type_1}} | {{support_level_1}} |
| {{tenant_id_2}} | {{tier_2}} | {{daily_calls_2}} | {{integration_type_2}} | {{support_level_2}} |

## Migration Guide

### Step-by-Step Migration Process

| Step | Action | Old Implementation | New Implementation | Validation |
|------|--------|-------------------|-------------------|------------|
| 1 | {{step_1_action}} | {{old_impl_1}} | {{new_impl_1}} | {{validation_1}} |
| 2 | {{step_2_action}} | {{old_impl_2}} | {{new_impl_2}} | {{validation_2}} |
| 3 | {{step_3_action}} | {{old_impl_3}} | {{new_impl_3}} | {{validation_3}} |

### Code Examples

#### Before (Deprecated)

```{{language}}
{{deprecated_code_example}}
```

#### After (New API)

```{{language}}
{{new_code_example}}
```

### SDK Migration Matrix

| SDK | Deprecated Version | Minimum Required Version | Migration Guide Link |
|-----|-------------------|-------------------------|---------------------|
| {{sdk_name_1}} | {{deprecated_sdk_1}} | {{required_sdk_1}} | {{guide_link_1}} |
| {{sdk_name_2}} | {{deprecated_sdk_2}} | {{required_sdk_2}} | {{guide_link_2}} |

## Communication Plan

### Communication Timeline

| Phase | Date | Channel | Audience | Message Type |
|-------|------|---------|----------|--------------|
| Announcement | {{announce_date}} | {{announce_channel}} | All Tenants | {{announce_type}} |
| First Reminder | {{reminder_1_date}} | {{reminder_1_channel}} | Active Users | {{reminder_1_type}} |
| Final Warning | {{final_date}} | {{final_channel}} | Non-migrated | {{final_type}} |
| Sunset Notice | {{sunset_notice_date}} | {{sunset_channel}} | Non-migrated | {{sunset_type}} |

### Deprecation Headers

| Header | Value | Description |
|--------|-------|-------------|
| Deprecation | {{deprecation_header_value}} | RFC 8594 deprecation date |
| Sunset | {{sunset_header_value}} | RFC 8594 sunset date |
| Link | {{link_header_value}} | Migration documentation link |

## Timeline and Milestones

### Deprecation Schedule

| Milestone | Target Date | Status | Owner |
|-----------|-------------|--------|-------|
| Deprecation Announced | {{announce_milestone_date}} | {{announce_status}} | {{announce_owner}} |
| Migration Tools Available | {{tools_milestone_date}} | {{tools_status}} | {{tools_owner}} |
| 50% Migration Target | {{fifty_percent_date}} | {{fifty_status}} | {{fifty_owner}} |
| Warning Responses Enabled | {{warning_date}} | {{warning_status}} | {{warning_owner}} |
| Sunset Date | {{sunset_milestone_date}} | {{sunset_status}} | {{sunset_owner}} |

## Compatibility Layer

### Backward Compatibility Configuration

| Feature | Enabled | Duration | Fallback Behavior |
|---------|---------|----------|-------------------|
| Request Translation | {{request_translation_enabled}} | {{request_duration}} | {{request_fallback}} |
| Response Shim | {{response_shim_enabled}} | {{response_duration}} | {{response_fallback}} |
| Auth Bridge | {{auth_bridge_enabled}} | {{auth_duration}} | {{auth_fallback}} |

### Feature Flags

| Flag Name | Default | Description | Sunset Date |
|-----------|---------|-------------|-------------|
| {{flag_name_1}} | {{flag_default_1}} | {{flag_description_1}} | {{flag_sunset_1}} |
| {{flag_name_2}} | {{flag_default_2}} | {{flag_description_2}} | {{flag_sunset_2}} |

## Monitoring and Metrics

### Deprecation Metrics Dashboard

| Metric | Current | Target | Alert Threshold |
|--------|---------|--------|-----------------|
| Migration Progress (%) | {{migration_progress}} | {{migration_target}} | {{migration_alert}} |
| Deprecated Endpoint Calls | {{deprecated_calls}} | {{deprecated_target}} | {{deprecated_alert}} |
| Error Rate Post-Migration | {{post_migration_errors}} | {{error_target}} | {{error_alert_threshold}} |

### Alerts Configuration

| Alert Name | Condition | Severity | Notification Channel |
|------------|-----------|----------|---------------------|
| {{alert_name_1}} | {{alert_condition_1}} | {{alert_severity_1}} | {{alert_channel_1}} |
| {{alert_name_2}} | {{alert_condition_2}} | {{alert_severity_2}} | {{alert_channel_2}} |

## Web Research Queries

Use these queries to research current best practices and industry standards:

1. "API deprecation best practices multi-tenant SaaS {date}" - Research current industry standards for API deprecation in multi-tenant environments
2. "RFC 8594 sunset header implementation examples {date}" - Find implementation examples for HTTP Sunset headers
3. "API versioning migration strategies enterprise {date}" - Explore enterprise migration strategies for API version transitions

## Verification Checklist

- [ ] All affected endpoints documented with deprecation reasons
- [ ] Tenant impact assessment completed for all tiers
- [ ] Migration guide reviewed and tested
- [ ] Communication plan approved by stakeholders
- [ ] Deprecation headers configured and deployed
- [ ] Compatibility layer implemented and tested
- [ ] Monitoring dashboards configured
- [ ] Alert thresholds defined and activated
- [ ] SDK updates published with migration notes
- [ ] Support team trained on migration assistance
- [ ] Rollback plan documented and tested
- [ ] Legal/compliance review completed (if required)
- [ ] Executive sign-off obtained

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{initial_date}} | {{initial_author}} | Initial deprecation plan created |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |
