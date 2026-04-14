---
name: integration-design-template
description: Template for documenting external system integrations for multi-tenant AI platforms
category: integration
version: "1.0.0"
---

# Integration Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Integration** | {{integration_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the design of external system integrations for multi-tenant AI platforms, covering authentication, data flow, error handling, and tenant isolation requirements.

## Integration Overview

### System Information

| Attribute | Value |
|-----------|-------|
| External System | {{system_name}} |
| Integration Type | {{api|webhook|event|file|database}} |
| Direction | {{inbound|outbound|bidirectional}} |
| Protocol | {{rest|graphql|grpc|websocket}} |
| Authentication | {{oauth|api_key|mtls|jwt}} |

### Business Context

| Question | Answer |
|----------|--------|
| What problem does this solve? | {{problem_statement}} |
| Who are the users? | {{user_personas}} |
| What tenants need this? | {{tenant_scope}} |

## Architecture

### Integration Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Tenant    │────▶│  Platform   │────▶│  External   │
│   Context   │     │  Gateway    │     │   System    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                          │
                    ┌─────▼─────┐
                    │  Adapter  │
                    │  Layer    │
                    └───────────┘
```

### Component Design

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| Gateway | Rate limiting, auth | {{gateway_tech}} |
| Adapter | Protocol translation | {{adapter_tech}} |
| Queue | Async processing | {{queue_tech}} |
| Cache | Response caching | {{cache_tech}} |

## Authentication & Authorization

### Credential Management

| Credential Type | Storage | Rotation | Per-Tenant |
|-----------------|---------|----------|------------|
| API Key | Vault | 90 days | Yes |
| OAuth Token | Encrypted DB | Auto-refresh | Yes |
| mTLS Cert | Cert Manager | 365 days | Optional |

### Tenant Credential Schema

```yaml
tenant_credentials:
  tenant_id: {{tenant_id}}
  integration: {{integration_name}}
  
  credentials:
    type: oauth2
    client_id: "{{encrypted}}"
    client_secret: "{{encrypted}}"
    refresh_token: "{{encrypted}}"
    
  config:
    base_url: "{{api_endpoint}}"
    scopes: [read, write]
    timeout_ms: 30000
```

## Data Flow

### Request/Response Mapping

| Platform Field | External Field | Transform |
|----------------|----------------|-----------|
| tenant_id | X-Tenant-Header | Direct |
| user.email | contact.email | Direct |
| created_at | timestamp | ISO8601 → Unix |

### Data Transformation

```typescript
interface TransformConfig {
  inbound: {
    map: Record<string, string>;
    defaults: Record<string, unknown>;
    validators: ValidationRule[];
  };
  outbound: {
    map: Record<string, string>;
    filters: string[];  // Fields to exclude
    sanitizers: SanitizeRule[];
  };
}
```

## Tenant Isolation

### Isolation Requirements

| Requirement | Implementation |
|-------------|----------------|
| Credential isolation | Per-tenant encrypted storage |
| Request tagging | Tenant ID in all requests |
| Response filtering | Strip cross-tenant data |
| Rate limit isolation | Per-tenant quotas |
| Audit logging | Tenant-scoped events |

### Multi-Tenant Request Flow

```
1. Extract tenant_id from request context
2. Load tenant-specific credentials from vault
3. Apply tenant rate limits
4. Transform request with tenant config
5. Call external API
6. Validate response contains only tenant data
7. Log audit event with tenant context
8. Return transformed response
```

## Error Handling

### Error Classification

| Error Type | Retry | Alert | Fallback |
|------------|-------|-------|----------|
| Rate Limited (429) | Yes, exponential | No | Queue |
| Auth Failed (401) | No | Yes | Disable integration |
| Server Error (5xx) | Yes, 3 attempts | After 3 failures | Cache |
| Timeout | Yes, 2 attempts | No | Partial response |

### Circuit Breaker Configuration

```yaml
circuit_breaker:
  failure_threshold: 5
  success_threshold: 3
  timeout_seconds: 60
  half_open_requests: 3
  
  per_tenant: true  # Isolate failures by tenant
```

## Rate Limiting

### External API Limits

| Limit Type | Value | Scope |
|------------|-------|-------|
| Requests/minute | {{rpm}} | Per credential |
| Requests/day | {{rpd}} | Per credential |
| Concurrent | {{concurrent}} | Global |

### Tenant Rate Distribution

| Tier | % of Quota | Burst Allowed |
|------|------------|---------------|
| Free | 5% | No |
| Pro | 30% | 1.5x |
| Enterprise | 65% | 2x |

## Monitoring

### Integration Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `integration_latency_p95` | Response time | > 2s |
| `integration_error_rate` | Error percentage | > 5% |
| `integration_quota_used` | Quota consumption | > 80% |
| `circuit_breaker_state` | Circuit state | Open |

### Health Check

```yaml
health_check:
  endpoint: "{{health_endpoint}}"
  interval: 60s
  timeout: 5s
  healthy_threshold: 2
  unhealthy_threshold: 3
```

## Security

### Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Data in transit | TLS 1.3 |
| Credential storage | Encrypted at rest |
| Secrets rotation | Automated |
| Audit logging | All API calls |
| PII handling | Masked in logs |

## Verification Checklist

- [ ] Authentication mechanism documented
- [ ] Per-tenant credentials supported
- [ ] Data transformation defined
- [ ] Error handling comprehensive
- [ ] Rate limits configured
- [ ] Circuit breaker implemented
- [ ] Monitoring dashboards created
- [ ] Security requirements met
- [ ] Tenant isolation verified

## Web Research Queries

- Search: "API integration patterns multi-tenant {date}"
- Search: "external system integration SaaS {date}"
- Search: "circuit breaker patterns distributed systems {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
