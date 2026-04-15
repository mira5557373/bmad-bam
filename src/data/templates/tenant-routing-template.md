---
name: Tenant Routing Template
description: Template for documenting tenant request routing and context switching strategy
category: tenant
version: 1.0.0
type: "tenant"
---

## Purpose

Template for documenting tenant request routing and context switching strategy

# Tenant Routing Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Overview

### 1.1 Purpose

This document specifies the tenant routing strategy for {{project_name}}, defining how incoming requests are mapped to tenant contexts and how tenant isolation is maintained throughout the request lifecycle.

### 1.2 Scope

- Request routing patterns
- Tenant identification mechanisms
- Connection pooling strategy
- Caching strategy per tenant
- Error handling for invalid tenant contexts

---

## Tenant Identification

### 2.1 Identification Method

| Method | Implementation | Priority |
|--------|----------------|----------|
| Header-based | `X-Tenant-ID` header | {{priority_header}} |
| Subdomain-based | `{tenant}.{{domain}}` | {{priority_subdomain}} |
| Path-based | `/api/v1/{tenant}/...` | {{priority_path}} |
| Token-based | JWT claim `tenant_id` | {{priority_token}} |

**Primary Method:** {{primary_identification_method}}

### 2.2 Tenant Resolution Flow

```
Request
    │
    ▼
┌─────────────────┐
│ Extract Tenant  │ ◄── {{extraction_point}}
│   Identifier    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Validate Tenant │ ◄── Check: active, not suspended
│    Status       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Load Tenant    │ ◄── Config, tier, features
│   Context       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Attach to       │ ◄── Thread-local / async context
│   Request       │
└─────────────────┘
```

### 2.3 Validation Rules

| Rule | Implementation | Error Response |
|------|----------------|----------------|
| Tenant exists | Database lookup with cache | 404 Tenant Not Found |
| Tenant active | Status check | 403 Tenant Suspended |
| User belongs to tenant | JWT claim validation | 403 Forbidden |
| Tier allows endpoint | Feature flag check | 402 Upgrade Required |

---

## Connection Pooling Strategy

### 3.1 Database Connections

**Tenant Model:** {{tenant_model}}

#### Row-Level Security (RLS)
```
┌─────────────────────────────────────┐
│         Shared Connection Pool       │
│  ┌─────────────────────────────────┐│
│  │     SET app.tenant_id = ?       ││
│  │     (per-request context)       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

#### Schema-per-Tenant
```
┌─────────────────────────────────────┐
│    Connection Pool per Schema       │
│  ┌─────────┐ ┌─────────┐ ┌───────┐ │
│  │Tenant A │ │Tenant B │ │Tenant C│ │
│  │ Pool    │ │ Pool    │ │ Pool  │ │
│  └─────────┘ └─────────┘ └───────┘ │
└─────────────────────────────────────┘
```

### 3.2 Pool Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Min connections per tenant | {{min_connections}} | {{min_rationale}} |
| Max connections per tenant | {{max_connections}} | {{max_rationale}} |
| Connection timeout | {{connection_timeout_ms}}ms | {{timeout_rationale}} |
| Idle timeout | {{idle_timeout_ms}}ms | {{idle_rationale}} |
| Max lifetime | {{max_lifetime_ms}}ms | Prevent stale connections |

---

## Caching Strategy

### 4.1 Cache Key Structure

```
{cache_prefix}:{tenant_id}:{resource_type}:{resource_id}
```

**Examples:**
- `bam:tenant_123:user:456` - User profile
- `bam:tenant_123:config:features` - Feature flags
- `bam:tenant_123:session:abc` - Session data

### 4.2 Cache Isolation

| Cache Type | Isolation | TTL | Invalidation |
|------------|-----------|-----|--------------|
| Tenant config | Per-tenant key prefix | {{config_ttl}} | On config change |
| User sessions | Per-tenant key prefix | {{session_ttl}} | On logout/expiry |
| API responses | Per-tenant key prefix | {{response_ttl}} | On data mutation |
| Feature flags | Per-tenant key prefix | {{feature_ttl}} | On flag change |

### 4.3 Cache Warming

| Scenario | Strategy |
|----------|----------|
| Tenant onboarding | Pre-warm config and features |
| Cold start | Lazy load with fallback |
| Deployment | Gradual cache rebuild |

---

## Request Middleware

### 5.1 Middleware Chain

```
Request
    │
    ▼
┌─────────────────┐
│ 1. Rate Limiter │ ◄── Per-tenant limits
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Auth         │ ◄── JWT validation
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Tenant       │ ◄── THIS SPEC
│    Router       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Context      │ ◄── Attach tenant context
│    Injector     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. Handler      │ ◄── Business logic
└─────────────────┘
```

### 5.2 Context Attachment

**Implementation Pattern:**

| Language/Framework | Pattern |
|--------------------|---------|
| Node.js | AsyncLocalStorage |
| Python | contextvars |
| Go | context.Context |
| Java | ThreadLocal / RequestScope |

---

## Error Handling

### 6.1 Tenant Resolution Errors

| Error | HTTP Status | Response Body | Logging |
|-------|-------------|---------------|---------|
| Missing tenant ID | 400 | `{"error": "tenant_id_required"}` | WARN |
| Invalid tenant ID format | 400 | `{"error": "invalid_tenant_id"}` | WARN |
| Tenant not found | 404 | `{"error": "tenant_not_found"}` | INFO |
| Tenant suspended | 403 | `{"error": "tenant_suspended"}` | INFO |
| Tenant deleted | 410 | `{"error": "tenant_gone"}` | INFO |

### 6.2 Circuit Breaker

| Condition | Action | Recovery |
|-----------|--------|----------|
| Database unavailable | Return cached tenant config | Retry with backoff |
| Cache unavailable | Direct database lookup | Retry cache connection |
| High error rate | Fail fast for tenant | Gradual recovery |

---

## Observability

### 7.1 Metrics

| Metric | Type | Labels |
|--------|------|--------|
| `tenant_routing_duration_ms` | Histogram | tenant_id, method |
| `tenant_routing_errors_total` | Counter | tenant_id, error_type |
| `tenant_cache_hits_total` | Counter | tenant_id, cache_type |
| `tenant_cache_misses_total` | Counter | tenant_id, cache_type |

### 7.2 Tracing

**Span Attributes:**
- `tenant.id`
- `tenant.tier`
- `routing.method`
- `routing.cache_hit`

---

## Security Considerations

### 8.1 Tenant ID Validation

- [ ] Validate tenant ID format (UUID/slug)
- [ ] Prevent tenant ID enumeration
- [ ] Log all tenant resolution attempts
- [ ] Rate limit tenant resolution failures

### 8.2 Cross-Tenant Access Prevention

- [ ] Tenant context immutable after attachment
- [ ] No tenant ID in URL for sensitive endpoints
- [ ] Audit log for admin cross-tenant access

---

## Testing Requirements

### 9.1 Unit Tests

- [ ] Tenant ID extraction from all sources
- [ ] Validation rule enforcement
- [ ] Cache key generation
- [ ] Error response formatting

### 9.2 Integration Tests

- [ ] Full routing flow
- [ ] Connection pool behavior
- [ ] Cache invalidation
- [ ] Circuit breaker activation

### 9.3 Load Tests

- [ ] Routing latency under load
- [ ] Connection pool saturation
- [ ] Cache performance

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "tenant routing multi-tenant best practices {date}"
- "request context propagation enterprise SaaS {date}"
- "tenant connection pooling patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Primary tenant identification method is clearly defined
- [ ] Fallback identification methods are configured
- [ ] Tenant validation rules cover all edge cases (missing, invalid, suspended)
- [ ] Connection pooling strategy matches the tenant model
- [ ] Cache key structure includes tenant ID prefix for isolation
- [ ] Cache invalidation triggers are properly defined
- [ ] Middleware chain order is correct (rate limit -> auth -> tenant -> context)
- [ ] Context attachment uses appropriate pattern for language/framework
- [ ] Error responses do not leak cross-tenant information
- [ ] Circuit breaker configuration handles database/cache failures
- [ ] Observability metrics include tenant ID labels
- [ ] Security controls prevent tenant ID enumeration attacks

---

## Appendix A: Configuration

```yaml
tenant_routing:
  identification:
    primary: {{primary_identification_method}}
    fallback: {{fallback_identification_method}}
  
  connection_pool:
    min_per_tenant: {{min_connections}}
    max_per_tenant: {{max_connections}}
    timeout_ms: {{connection_timeout_ms}}
  
  cache:
    prefix: "{{cache_prefix}}"
    default_ttl_seconds: {{default_ttl}}
  
  circuit_breaker:
    failure_threshold: {{failure_threshold}}
    recovery_timeout_ms: {{recovery_timeout_ms}}
```

---

## Appendix B: Related Documents

- Pattern: `tenant-routing` in `bam-patterns.csv`
- Context Propagation: `context-propagation-spec.md`
- Tenant Model: `tenant-model-template.md`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
