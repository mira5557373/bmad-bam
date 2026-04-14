---
name: API Gateway Configuration Template
description: Comprehensive API gateway configuration for multi-tenant platforms including routing rules, rate limits, authentication, and tenant-aware policies
category: integration
version: 1.0.0
type: template
---

# {{project_name}} API Gateway Configuration

## Purpose

This template defines the complete API gateway configuration for {{project_name}}, including routing rules, rate limiting policies, authentication integration, tenant isolation, and traffic management strategies. It ensures secure, performant, and tenant-aware API access across all platform services.

## Document Metadata

| Field | Value |
|-------|-------|
| Document ID | `GW-{{gateway_id}}` |
| Gateway Version | {{gateway_version}} |
| Environment | {{environment}} |
| Author | {{author}} |
| Approver | {{approver}} |
| Classification | {{classification}} |
| Last Updated | {{last_updated}} |

## Table of Contents

1. [Gateway Architecture](#gateway-architecture)
2. [Routing Configuration](#routing-configuration)
3. [Rate Limiting](#rate-limiting)
4. [Authentication and Authorization](#authentication-and-authorization)
5. [Tenant Isolation](#tenant-isolation)
6. [Load Balancing](#load-balancing)
7. [Caching Configuration](#caching-configuration)
8. [Security Policies](#security-policies)
9. [Observability](#observability)
10. [Web Research Queries](#web-research-queries)
11. [Verification Checklist](#verification-checklist)
12. [Change Log](#change-log)

## Gateway Architecture

### Gateway Topology

| Component | Type | Region | Instances | Health Check |
|-----------|------|--------|-----------|--------------|
| {{gateway_name_1}} | {{gateway_type_1}} | {{region_1}} | {{instances_1}} | {{health_check_1}} |
| {{gateway_name_2}} | {{gateway_type_2}} | {{region_2}} | {{instances_2}} | {{health_check_2}} |

### Upstream Services

| Service Name | Internal URL | Protocol | Timeout | Retry Policy |
|--------------|--------------|----------|---------|--------------|
| {{service_name_1}} | {{service_url_1}} | {{protocol_1}} | {{timeout_1}} | {{retry_policy_1}} |
| {{service_name_2}} | {{service_url_2}} | {{protocol_2}} | {{timeout_2}} | {{retry_policy_2}} |
| {{service_name_3}} | {{service_url_3}} | {{protocol_3}} | {{timeout_3}} | {{retry_policy_3}} |

## Routing Configuration

### Route Definitions

| Route ID | Path Pattern | Methods | Target Service | Priority |
|----------|--------------|---------|----------------|----------|
| {{route_id_1}} | {{path_pattern_1}} | {{methods_1}} | {{target_1}} | {{priority_1}} |
| {{route_id_2}} | {{path_pattern_2}} | {{methods_2}} | {{target_2}} | {{priority_2}} |
| {{route_id_3}} | {{path_pattern_3}} | {{methods_3}} | {{target_3}} | {{priority_3}} |

### Path Rewriting Rules

| Source Pattern | Target Pattern | Condition | Description |
|----------------|----------------|-----------|-------------|
| {{source_path_1}} | {{target_path_1}} | {{condition_1}} | {{rewrite_desc_1}} |
| {{source_path_2}} | {{target_path_2}} | {{condition_2}} | {{rewrite_desc_2}} |

### Header Transformation

| Header Name | Action | Value/Pattern | Apply To |
|-------------|--------|---------------|----------|
| {{header_name_1}} | {{action_1}} | {{value_1}} | {{apply_to_1}} |
| {{header_name_2}} | {{action_2}} | {{value_2}} | {{apply_to_2}} |
| X-Tenant-ID | inject | {{tenant_id_extraction}} | All requests |
| X-Request-ID | generate | UUID | All requests |

## Rate Limiting

### Global Rate Limits

| Limit Type | Requests | Window | Burst | Response Code |
|------------|----------|--------|-------|---------------|
| Platform Global | {{global_requests}} | {{global_window}} | {{global_burst}} | {{global_response}} |
| Per IP | {{ip_requests}} | {{ip_window}} | {{ip_burst}} | {{ip_response}} |
| Per API Key | {{key_requests}} | {{key_window}} | {{key_burst}} | {{key_response}} |

### Tenant Tier Rate Limits

| Tier | Requests/Minute | Requests/Hour | Requests/Day | Concurrent |
|------|-----------------|---------------|--------------|------------|
| Enterprise | {{enterprise_rpm}} | {{enterprise_rph}} | {{enterprise_rpd}} | {{enterprise_concurrent}} |
| Professional | {{professional_rpm}} | {{professional_rph}} | {{professional_rpd}} | {{professional_concurrent}} |
| Starter | {{starter_rpm}} | {{starter_rph}} | {{starter_rpd}} | {{starter_concurrent}} |
| Free | {{free_rpm}} | {{free_rph}} | {{free_rpd}} | {{free_concurrent}} |

### Endpoint-Specific Limits

| Endpoint Pattern | Tier | Limit | Window | Reason |
|------------------|------|-------|--------|--------|
| {{endpoint_1}} | {{tier_1}} | {{limit_1}} | {{window_1}} | {{reason_1}} |
| {{endpoint_2}} | {{tier_2}} | {{limit_2}} | {{window_2}} | {{reason_2}} |
| /api/v*/ai/* | All | {{ai_limit}} | {{ai_window}} | LLM cost protection |

### Rate Limit Headers

| Header | Description | Example Value |
|--------|-------------|---------------|
| X-RateLimit-Limit | Maximum requests allowed | {{limit_header_example}} |
| X-RateLimit-Remaining | Remaining requests in window | {{remaining_header_example}} |
| X-RateLimit-Reset | Window reset timestamp | {{reset_header_example}} |
| Retry-After | Seconds until retry allowed | {{retry_header_example}} |

## Authentication and Authorization

### Authentication Methods

| Method | Enabled | Priority | Configuration |
|--------|---------|----------|---------------|
| API Key | {{api_key_enabled}} | {{api_key_priority}} | Header: {{api_key_header}} |
| JWT Bearer | {{jwt_enabled}} | {{jwt_priority}} | Issuer: {{jwt_issuer}} |
| OAuth 2.0 | {{oauth_enabled}} | {{oauth_priority}} | Provider: {{oauth_provider}} |
| mTLS | {{mtls_enabled}} | {{mtls_priority}} | CA: {{mtls_ca}} |

### JWT Validation Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Issuer | {{jwt_issuer_url}} | Token issuer URL |
| Audience | {{jwt_audience}} | Expected audience claim |
| Algorithm | {{jwt_algorithm}} | Signature algorithm |
| JWKS URL | {{jwks_url}} | Key set endpoint |
| Clock Skew | {{clock_skew}} | Allowed clock drift |

### Authorization Policies

| Policy Name | Scope | Condition | Action |
|-------------|-------|-----------|--------|
| {{policy_name_1}} | {{scope_1}} | {{condition_1}} | {{action_1}} |
| {{policy_name_2}} | {{scope_2}} | {{condition_2}} | {{action_2}} |
| tenant-isolation | All | tenant_id == token.tenant_id | allow/deny |

## Tenant Isolation

### Tenant Context Extraction

| Source | Field | Header Injection | Validation |
|--------|-------|------------------|------------|
| JWT Claim | {{jwt_tenant_claim}} | X-Tenant-ID | {{tenant_validation}} |
| API Key Lookup | {{api_key_field}} | X-Tenant-ID | {{key_validation}} |
| Path Parameter | {{path_tenant_param}} | X-Tenant-ID | {{path_validation}} |

### Tenant Routing Rules

| Condition | Target Cluster | Weight | Description |
|-----------|----------------|--------|-------------|
| {{routing_condition_1}} | {{cluster_1}} | {{weight_1}} | {{routing_desc_1}} |
| {{routing_condition_2}} | {{cluster_2}} | {{weight_2}} | {{routing_desc_2}} |

### Cross-Tenant Protection

| Protection Type | Implementation | Enforcement Level |
|-----------------|----------------|-------------------|
| Request Isolation | {{request_isolation_impl}} | {{request_enforcement}} |
| Response Filtering | {{response_filter_impl}} | {{response_enforcement}} |
| Resource Quotas | {{quota_impl}} | {{quota_enforcement}} |

## Load Balancing

### Load Balancer Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Algorithm | {{lb_algorithm}} | Load balancing strategy |
| Health Check Interval | {{health_interval}} | Upstream health check frequency |
| Unhealthy Threshold | {{unhealthy_threshold}} | Failures before marking unhealthy |
| Healthy Threshold | {{healthy_threshold}} | Successes before marking healthy |

### Circuit Breaker Settings

| Parameter | Value | Description |
|-----------|-------|-------------|
| Failure Threshold | {{cb_failure_threshold}} | Failures to open circuit |
| Success Threshold | {{cb_success_threshold}} | Successes to close circuit |
| Timeout | {{cb_timeout}} | Time in open state |
| Half-Open Requests | {{cb_half_open}} | Requests in half-open state |

## Caching Configuration

### Cache Policies

| Route Pattern | Cache Enabled | TTL | Vary Headers | Invalidation |
|---------------|---------------|-----|--------------|--------------|
| {{cache_route_1}} | {{cache_enabled_1}} | {{ttl_1}} | {{vary_1}} | {{invalidation_1}} |
| {{cache_route_2}} | {{cache_enabled_2}} | {{ttl_2}} | {{vary_2}} | {{invalidation_2}} |

### Cache Key Configuration

| Component | Included | Description |
|-----------|----------|-------------|
| Path | {{path_in_key}} | Include request path |
| Query Params | {{query_in_key}} | Include query parameters |
| Tenant ID | {{tenant_in_key}} | Tenant-specific caching |
| API Version | {{version_in_key}} | Version-specific caching |

## Security Policies

### WAF Rules

| Rule ID | Category | Action | Sensitivity |
|---------|----------|--------|-------------|
| {{waf_rule_1}} | {{waf_category_1}} | {{waf_action_1}} | {{waf_sensitivity_1}} |
| {{waf_rule_2}} | {{waf_category_2}} | {{waf_action_2}} | {{waf_sensitivity_2}} |

### IP Filtering

| List Type | Source | Update Frequency | Action |
|-----------|--------|------------------|--------|
| Blocklist | {{blocklist_source}} | {{blocklist_frequency}} | Deny |
| Allowlist | {{allowlist_source}} | {{allowlist_frequency}} | Allow |

### TLS Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Minimum Version | {{tls_min_version}} | Minimum TLS version |
| Cipher Suites | {{cipher_suites}} | Allowed cipher suites |
| Certificate | {{cert_source}} | Certificate source |
| HSTS | {{hsts_enabled}} | HTTP Strict Transport Security |

## Observability

### Logging Configuration

| Log Type | Format | Destination | Retention |
|----------|--------|-------------|-----------|
| Access Logs | {{access_format}} | {{access_dest}} | {{access_retention}} |
| Error Logs | {{error_format}} | {{error_dest}} | {{error_retention}} |
| Audit Logs | {{audit_format}} | {{audit_dest}} | {{audit_retention}} |

### Metrics Collection

| Metric | Type | Labels | Alert Threshold |
|--------|------|--------|-----------------|
| {{metric_name_1}} | {{metric_type_1}} | {{labels_1}} | {{threshold_1}} |
| {{metric_name_2}} | {{metric_type_2}} | {{labels_2}} | {{threshold_2}} |
| request_latency_ms | histogram | route,tenant,status | p99 > {{latency_threshold}}ms |

### Tracing Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Sampling Rate | {{sampling_rate}} | Trace sampling percentage |
| Propagation | {{propagation_format}} | Context propagation format |
| Exporter | {{trace_exporter}} | Trace export destination |

## Web Research Queries

Use these queries to research current best practices and configurations:

1. "API gateway multi-tenant isolation best practices {date}" - Research tenant isolation patterns in API gateways
2. "rate limiting strategies SaaS platform per-tenant {date}" - Explore per-tenant rate limiting implementations
3. "Kong vs AWS API Gateway vs Envoy multi-tenant comparison {date}" - Compare gateway options for multi-tenant scenarios

## Verification Checklist

- [ ] All upstream services configured with health checks
- [ ] Routing rules tested for all API versions
- [ ] Rate limits configured per tenant tier
- [ ] Authentication methods validated
- [ ] Tenant isolation rules enforced
- [ ] Load balancer configuration tested
- [ ] Circuit breakers configured and tested
- [ ] Cache policies validated
- [ ] WAF rules enabled and tested
- [ ] TLS configuration hardened
- [ ] Logging enabled for all routes
- [ ] Metrics dashboards configured
- [ ] Distributed tracing enabled
- [ ] Disaster recovery tested
- [ ] Performance baseline established

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{initial_date}} | {{initial_author}} | Initial gateway configuration |
| {{version_2}} | {{date_2}} | {{author_2}} | {{changes_2}} |
| {{version_3}} | {{date_3}} | {{author_3}} | {{changes_3}} |
