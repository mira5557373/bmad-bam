---
name: Correlation Rules Template
description: Comprehensive log correlation patterns and alert rules for security monitoring, threat detection, and incident response in multi-tenant platforms
category: security
version: 1.0.0
type: template
---

# {{project_name}} Correlation Rules Specification

## Purpose

This template defines the log correlation patterns and alert rules for {{project_name}}, including security event correlation, threat detection rules, multi-tenant isolation monitoring, and automated incident response triggers. It ensures comprehensive security monitoring across the platform.

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | `COR-{{correlation_id}}` |
| Rule Version | {{rule_version}} |
| Environment | {{environment}} |
| Author | {{author}} |
| Approver | {{approver}} |
| Classification | {{classification}} |
| Last Updated | {{last_updated}} |

## Table of Contents

1. [Correlation Architecture](#correlation-architecture)
2. [Event Sources](#event-sources)
3. [Authentication Rules](#authentication-rules)
4. [Authorization Rules](#authorization-rules)
5. [Tenant Isolation Rules](#tenant-isolation-rules)
6. [Data Access Rules](#data-access-rules)
7. [API Security Rules](#api-security-rules)
8. [AI/Agent Security Rules](#aiagent-security-rules)
9. [Alert Configuration](#alert-configuration)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

## Correlation Architecture

### SIEM Integration

| Component | Technology | Integration | Purpose |
|-----------|------------|-------------|---------|
| Log Aggregator | {{aggregator_tech}} | {{aggregator_integration}} | {{aggregator_purpose}} |
| Correlation Engine | {{engine_tech}} | {{engine_integration}} | {{engine_purpose}} |
| Alert Manager | {{alert_tech}} | {{alert_integration}} | {{alert_purpose}} |
| SOAR Platform | {{soar_tech}} | {{soar_integration}} | {{soar_purpose}} |

### Correlation Windows

| Window Type | Duration | Use Case | Storage |
|-------------|----------|----------|---------|
| Real-time | {{realtime_duration}} | {{realtime_use}} | {{realtime_storage}} |
| Short-term | {{short_duration}} | {{short_use}} | {{short_storage}} |
| Medium-term | {{medium_duration}} | {{medium_use}} | {{medium_storage}} |
| Long-term | {{long_duration}} | {{long_use}} | {{long_storage}} |

## Event Sources

### Primary Log Sources

| Source | Log Type | Format | Retention | Priority |
|--------|----------|--------|-----------|----------|
| {{source_1}} | {{log_type_1}} | {{format_1}} | {{retention_1}} | {{priority_1}} |
| {{source_2}} | {{log_type_2}} | {{format_2}} | {{retention_2}} | {{priority_2}} |
| API Gateway | Access Logs | JSON | 90 days | High |
| Auth Service | Authentication | JSON | 365 days | Critical |
| Agent Runtime | Execution Logs | JSON | 30 days | High |

### Event Normalization

| Field | Normalized Name | Source Mapping | Required |
|-------|-----------------|----------------|----------|
| Timestamp | @timestamp | {{timestamp_mapping}} | Yes |
| Tenant | tenant_id | {{tenant_mapping}} | Yes |
| User | user_id | {{user_mapping}} | No |
| Source IP | source_ip | {{ip_mapping}} | Yes |
| Action | event_action | {{action_mapping}} | Yes |
| Outcome | event_outcome | {{outcome_mapping}} | Yes |

## Authentication Rules

### Brute Force Detection

| Rule ID | {{brute_force_rule_id}} |
|---------|-------------------------|
| Name | Failed Login Threshold Exceeded |
| Description | Detects multiple failed login attempts |
| Condition | failed_logins >= {{failed_threshold}} within {{brute_window}} |
| Group By | source_ip, tenant_id |
| Severity | {{brute_severity}} |
| Action | {{brute_action}} |

### Credential Stuffing Detection

| Rule ID | {{cred_stuff_rule_id}} |
|---------|------------------------|
| Name | Credential Stuffing Attack |
| Description | Detects credential stuffing patterns |
| Condition | unique_users >= {{unique_user_threshold}} AND failure_rate >= {{failure_rate}}% |
| Window | {{cred_stuff_window}} |
| Group By | source_ip |
| Severity | High |
| Action | Block IP, Alert SOC |

### Anomalous Login Patterns

| Pattern | Detection Logic | Threshold | Severity |
|---------|-----------------|-----------|----------|
| Impossible Travel | {{travel_logic}} | {{travel_threshold}} | High |
| New Device | {{device_logic}} | {{device_threshold}} | Medium |
| Unusual Time | {{time_logic}} | {{time_threshold}} | Low |
| New Location | {{location_logic}} | {{location_threshold}} | Medium |

### MFA Bypass Attempts

| Rule ID | {{mfa_bypass_rule_id}} |
|---------|------------------------|
| Name | MFA Bypass Attempt Detection |
| Description | Detects attempts to bypass MFA |
| Condition | mfa_challenged = false AND sensitive_action = true |
| Exclusions | {{mfa_exclusions}} |
| Severity | Critical |
| Action | Block request, Alert SOC, Notify tenant admin |

## Authorization Rules

### Privilege Escalation Detection

| Rule ID | {{priv_esc_rule_id}} |
|---------|----------------------|
| Name | Privilege Escalation Attempt |
| Description | Detects unauthorized privilege escalation |
| Condition | role_change = true AND approver_id = null |
| Group By | user_id, tenant_id |
| Severity | Critical |
| Action | {{priv_esc_action}} |

### Unauthorized Access Patterns

| Pattern | Rule Logic | Severity | Response |
|---------|------------|----------|----------|
| Cross-Tenant Access | tenant_id != token.tenant_id | Critical | Block + Alert |
| Admin Endpoint Access | path matches "/admin/*" AND role != "admin" | High | Block + Log |
| Sensitive Data Access | resource_type = "pii" AND !has_permission | High | Block + Alert |
| API Key Misuse | key_scope < required_scope | Medium | Block + Log |

### Permission Violations

| Rule ID | {{perm_violation_rule_id}} |
|---------|---------------------------|
| Name | Permission Boundary Violation |
| Description | Access attempt beyond granted permissions |
| Condition | required_permission NOT IN user.permissions |
| Count Threshold | {{perm_threshold}} per {{perm_window}} |
| Severity | Medium |
| Action | Log, Alert on threshold |

## Tenant Isolation Rules

### Cross-Tenant Data Access

| Rule ID | {{cross_tenant_rule_id}} |
|---------|--------------------------|
| Name | Cross-Tenant Data Access Attempt |
| Description | Detects attempts to access other tenant data |
| Condition | request.tenant_id != auth.tenant_id |
| Severity | Critical |
| Action | Block immediately, Alert SOC, Forensic capture |

### Tenant Boundary Violations

| Violation Type | Detection Method | Severity | Auto-Response |
|----------------|------------------|----------|---------------|
| Database Query | {{db_detection}} | Critical | {{db_response}} |
| API Request | {{api_detection}} | Critical | {{api_response}} |
| File Access | {{file_detection}} | Critical | {{file_response}} |
| Cache Access | {{cache_detection}} | High | {{cache_response}} |

### Tenant Resource Abuse

| Rule ID | {{resource_abuse_rule_id}} |
|---------|---------------------------|
| Name | Tenant Resource Abuse Detection |
| Description | Detects excessive resource consumption |
| Conditions | |
| - API Calls | > {{api_abuse_threshold}} per {{api_abuse_window}} |
| - AI Tokens | > {{token_abuse_threshold}} per {{token_abuse_window}} |
| - Storage | > {{storage_abuse_threshold}} |
| Severity | Medium |
| Action | Throttle, Alert tenant admin |

## Data Access Rules

### Sensitive Data Access

| Rule ID | {{sensitive_access_rule_id}} |
|---------|------------------------------|
| Name | Sensitive Data Access Monitoring |
| Description | Monitors access to sensitive data |
| Data Types | PII, PHI, Financial, Credentials |
| Condition | data_classification >= "sensitive" |
| Logging | Full audit trail |
| Alert | On anomalous patterns |

### Data Exfiltration Detection

| Pattern | Indicators | Threshold | Severity |
|---------|------------|-----------|----------|
| Bulk Export | {{bulk_indicators}} | {{bulk_threshold}} | High |
| API Scraping | {{scraping_indicators}} | {{scraping_threshold}} | High |
| Unusual Download | {{download_indicators}} | {{download_threshold}} | Medium |
| Off-hours Access | {{offhours_indicators}} | {{offhours_threshold}} | Medium |

### Database Query Anomalies

| Rule ID | {{db_anomaly_rule_id}} |
|---------|------------------------|
| Name | Anomalous Database Query Pattern |
| Description | Detects unusual database query patterns |
| Conditions | |
| - Large Result Set | rows_returned > {{row_threshold}} |
| - Table Scan | full_scan = true AND table_size > {{size_threshold}} |
| - Cross-Tenant Join | query contains multiple tenant_ids |
| Severity | High |
| Action | Alert DBA, Log query |

## API Security Rules

### API Abuse Detection

| Rule ID | {{api_abuse_rule_id}} |
|---------|----------------------|
| Name | API Abuse Pattern Detection |
| Description | Detects abusive API usage patterns |
| Patterns | |
| - Rate Spike | requests > {{spike_threshold}} per minute |
| - Error Spike | error_rate > {{error_threshold}}% |
| - Endpoint Scan | unique_endpoints > {{endpoint_threshold}} |
| Severity | Medium-High |
| Action | Rate limit, Alert |

### Injection Attack Detection

| Attack Type | Detection Pattern | Severity | Response |
|-------------|-------------------|----------|----------|
| SQL Injection | {{sql_pattern}} | Critical | Block + Alert |
| XSS | {{xss_pattern}} | High | Block + Log |
| Command Injection | {{cmd_pattern}} | Critical | Block + Alert |
| Path Traversal | {{path_pattern}} | High | Block + Log |

### API Key Compromise

| Rule ID | {{key_compromise_rule_id}} |
|---------|---------------------------|
| Name | API Key Compromise Indicators |
| Description | Detects signs of compromised API keys |
| Indicators | |
| - Geographic Spread | requests from > {{geo_threshold}} countries |
| - Unusual Endpoints | accessing normally unused endpoints |
| - Volume Spike | > {{volume_spike}}x normal volume |
| Severity | Critical |
| Action | Revoke key, Alert owner, Forensics |

## AI/Agent Security Rules

### Prompt Injection Detection

| Rule ID | {{prompt_injection_rule_id}} |
|---------|------------------------------|
| Name | Prompt Injection Attack Detection |
| Description | Detects prompt injection attempts |
| Patterns | {{prompt_injection_patterns}} |
| Confidence Threshold | {{confidence_threshold}} |
| Severity | High |
| Action | Block execution, Log attempt, Alert |

### Agent Behavior Anomalies

| Anomaly Type | Detection Logic | Threshold | Response |
|--------------|-----------------|-----------|----------|
| Tool Abuse | {{tool_abuse_logic}} | {{tool_threshold}} | {{tool_response}} |
| Data Leakage | {{leakage_logic}} | {{leakage_threshold}} | {{leakage_response}} |
| Infinite Loop | {{loop_logic}} | {{loop_threshold}} | {{loop_response}} |
| Resource Exhaustion | {{resource_logic}} | {{resource_threshold}} | {{resource_response}} |

### Model Output Monitoring

| Rule ID | {{model_output_rule_id}} |
|---------|--------------------------|
| Name | Suspicious Model Output Detection |
| Description | Monitors for dangerous model outputs |
| Categories | |
| - Credential Exposure | output contains credentials/keys |
| - PII Leakage | output contains PII without authorization |
| - Harmful Content | output triggers content filters |
| Severity | High-Critical |
| Action | Redact output, Alert, Review |

## Alert Configuration

### Alert Severity Matrix

| Severity | Response Time | Notification | Escalation |
|----------|---------------|--------------|------------|
| Critical | {{critical_response}} | {{critical_notify}} | {{critical_escalate}} |
| High | {{high_response}} | {{high_notify}} | {{high_escalate}} |
| Medium | {{medium_response}} | {{medium_notify}} | {{medium_escalate}} |
| Low | {{low_response}} | {{low_notify}} | {{low_escalate}} |

### Notification Channels

| Channel | Severity | Format | Recipients |
|---------|----------|--------|------------|
| PagerDuty | Critical, High | {{pagerduty_format}} | {{pagerduty_recipients}} |
| Slack | All | {{slack_format}} | {{slack_recipients}} |
| Email | Medium, Low | {{email_format}} | {{email_recipients}} |
| SIEM | All | {{siem_format}} | SOC Team |

### Alert Suppression Rules

| Rule | Condition | Duration | Reason |
|------|-----------|----------|--------|
| {{suppression_1}} | {{condition_1}} | {{duration_1}} | {{reason_1}} |
| {{suppression_2}} | {{condition_2}} | {{duration_2}} | {{reason_2}} |
| Maintenance Window | scheduled_maintenance = true | Window duration | Planned activity |

## Web Research Queries

Use these queries to research current best practices:

1. "SIEM correlation rules multi-tenant SaaS security {date}" - Research correlation patterns for multi-tenant security
2. "log correlation threat detection patterns {date}" - Explore advanced threat detection correlation techniques
3. "AI agent security monitoring anomaly detection {date}" - Research AI-specific security monitoring approaches

## Verification Checklist

- [ ] All event sources integrated and normalized
- [ ] Authentication rules tested and tuned
- [ ] Authorization rules validated
- [ ] Tenant isolation rules enforced
- [ ] Data access monitoring configured
- [ ] API security rules active
- [ ] AI/Agent security rules implemented
- [ ] Alert severity matrix approved
- [ ] Notification channels tested
- [ ] Suppression rules documented
- [ ] Runbooks linked to alerts
- [ ] False positive baseline established
- [ ] Compliance requirements mapped
- [ ] Regular rule review scheduled

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{initial_date}} | {{initial_author}} | Initial correlation rules specification |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |
