# Step 1: Define Tenant Dimensions

Define the tenant-related dimensions that must be present in all observability signals:

## Core Tenant Dimensions

| Dimension | Type | Description | Required |
|-----------|------|-------------|----------|
| tenant_id | string | Unique tenant identifier | Always |
| tenant_slug | string | Human-readable tenant identifier | Always |
| tenant_tier | enum | FREE/PRO/ENTERPRISE | Always |
| tenant_region | string | Data residency region | If applicable |
| tenant_status | enum | ACTIVE/SUSPENDED/etc. | Optional |

## Request Context Dimensions

| Dimension | Type | Description | Scope |
|-----------|------|-------------|-------|
| user_id | string | User within tenant | Request |
| session_id | string | User session identifier | Request |
| agent_id | string | Agent handling request | Request |
| conversation_id | string | Conversation identifier | Request |
| request_id | string | Unique request trace ID | Request |

## Resource Attribution Dimensions

| Dimension | Type | Description | Use Case |
|-----------|------|-------------|----------|
| resource_type | string | Type of resource consumed | Billing attribution |
| operation_type | string | Type of operation performed | Cost analysis |
| module_name | string | Platform module name | Resource tracking |

## Dimension Propagation Rules

```yaml
dimension_propagation:
  # Always injected from TenantContext
  auto_inject:
    - tenant_id
    - tenant_slug
    - tenant_tier
    
  # Extracted from request context
  request_extract:
    - user_id (from JWT)
    - session_id (from session cookie/header)
    - request_id (generated or from X-Request-ID)
    
  # Derived from runtime context
  runtime_derive:
    - agent_id (from agent execution context)
    - conversation_id (from conversation state)
```

## Dimension Cardinality Management

High-cardinality dimensions require special handling:

| Dimension | Cardinality | Strategy |
|-----------|-------------|----------|
| tenant_id | Medium (~10K) | Direct use |
| user_id | High (~1M) | Hash for metrics, full for logs |
| request_id | Very High | Logs/traces only, not metrics |
| conversation_id | High | Logs/traces only |

**Rule:** Never use high-cardinality dimensions as metric labels. Use them only in logs and trace attributes.
