---
name: action-gateway-template
description: Documents action gateway design for mediating write operations and mutations in AI agent runtime with tenant isolation
category: ai-runtime
version: "1.0.0"
---

# Action Gateway Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the action gateway design for mediating all write operations and mutations in the AI agent runtime. The action gateway ensures tenant isolation, enforces permissions, and maintains audit trails for all state-changing operations.

## Action Gateway Architecture

### Gateway Components

```
┌─────────────────────────────────────────────────────────┐
│                    Action Gateway                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Request   │  │  Permission │  │   Tenant    │     │
│  │   Router    │──│   Checker   │──│   Scoper    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │                │                │             │
│         ▼                ▼                ▼             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Action    │  │    Audit    │  │  Mutation   │     │
│  │  Validator  │──│   Logger    │──│  Executor   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Supported Action Types

| Action Type | Description | Tenant Scoped | Audit Level |
|-------------|-------------|---------------|-------------|
| `create` | Create new resource | Yes | Full |
| `update` | Modify existing resource | Yes | Full |
| `delete` | Remove resource | Yes | Full |
| `execute` | Execute tool or function | Yes | Full |
| `transfer` | Move between contexts | Yes | Full |
| `approve` | Workflow approval | Yes | Full |

## Permission Model

### Action Permissions

| Permission | Description | Default Role |
|------------|-------------|--------------|
| `action:create` | Create resources | agent, admin |
| `action:update` | Update resources | agent, admin |
| `action:delete` | Delete resources | admin |
| `action:execute` | Execute tools | agent, admin |
| `action:approve` | Approve workflows | admin |

### Tool-Specific Permissions

| Tool Category | Required Permission | Rate Limit |
|---------------|--------------------|-----------| 
| Read-only | `tool:read` | 1000/min |
| Write | `tool:write` | 100/min |
| External API | `tool:external` | 50/min |
| Dangerous | `tool:dangerous` | 10/min |

## Tenant Isolation Rules

### Scope Enforcement

```yaml
tenant_scoping:
  enabled: true
  enforcement: strict
  
  rules:
    - name: "All writes must have tenant context"
      condition: "action.type in ['create', 'update', 'delete']"
      require: "tenant_id is not null"
      
    - name: "Cross-tenant writes blocked"
      condition: "target.tenant_id != context.tenant_id"
      action: deny
      
    - name: "Admin bypass requires audit"
      condition: "role == 'admin' and bypass_tenant_scope"
      action: allow_with_audit
```

## Audit Trail Configuration

### Audit Event Schema

```json
{
  "event_id": "{{uuid}}",
  "timestamp": "{{iso_timestamp}}",
  "tenant_id": "{{tenant_id}}",
  "user_id": "{{user_id}}",
  "agent_id": "{{agent_id}}",
  "action": {
    "type": "{{action_type}}",
    "resource": "{{resource_type}}",
    "resource_id": "{{resource_id}}"
  },
  "request": {
    "tool": "{{tool_name}}",
    "parameters": "{{sanitized_params}}"
  },
  "result": {
    "status": "{{success|failure}}",
    "error": "{{error_message}}"
  },
  "context": {
    "conversation_id": "{{conversation_id}}",
    "run_id": "{{run_id}}"
  }
}
```

## Rate Limiting

### Tenant-Scoped Limits

| Tier | Actions/Minute | Actions/Hour | Burst |
|------|----------------|--------------|-------|
| Free | 60 | 1,000 | 10 |
| Pro | 300 | 10,000 | 50 |
| Enterprise | 1,000 | 50,000 | 200 |

## Error Handling

### Gateway Error Codes

| Code | Name | Description | Recovery |
|------|------|-------------|----------|
| `AG001` | PermissionDenied | Action not permitted | Check permissions |
| `AG002` | TenantScopeMissing | No tenant context | Set tenant context |
| `AG003` | CrossTenantViolation | Cross-tenant access | Use correct tenant |
| `AG004` | RateLimitExceeded | Too many actions | Wait and retry |
| `AG005` | ValidationFailed | Invalid action params | Fix parameters |
| `AG006` | AuditLogFailed | Audit logging failed | Retry with backoff |

## Verification Checklist

- [ ] Gateway routes all write operations
- [ ] Permission checks enforce action policies
- [ ] Tenant scoping prevents cross-tenant mutations
- [ ] Audit trail captures all actions
- [ ] Rate limiting enforced per tenant tier
- [ ] Error handling returns appropriate codes
- [ ] Kill switch can halt all actions

## Web Research Queries

- Search: "action gateway patterns microservices {date}"
- Search: "mutation gateway multi-tenant SaaS {date}"
- Search: "audit logging action gateway {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
