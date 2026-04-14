---
name: audit-logging-template
description: Documents audit logging design for security events, user actions, and system changes with tenant context for compliance
category: security
version: "1.0.0"
---

# Audit Logging Design Template

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

This template documents the audit logging design for capturing and storing security-relevant events, user actions, and system changes with full tenant context for compliance and forensic analysis.

## Audit Event Categories

### Event Classification

| Category | Description | Retention | Examples |
|----------|-------------|-----------|----------|
| `auth` | Authentication events | 2 years | Login, logout, MFA |
| `access` | Resource access events | 1 year | Read, list, search |
| `mutation` | Data change events | 7 years | Create, update, delete |
| `admin` | Administrative actions | 7 years | Config change, user mgmt |
| `security` | Security events | 7 years | Policy violation, threat |
| `ai` | AI/Agent events | 1 year | Tool call, generation |

## Audit Event Schema

### Core Event Structure

```json
{
  "event_id": "{{uuid_v7}}",
  "event_type": "{{category}}.{{action}}",
  "timestamp": "{{iso8601_utc}}",
  "version": "1.0",
  
  "actor": {
    "type": "user|service|agent",
    "id": "{{actor_id}}",
    "name": "{{actor_name}}",
    "ip_address": "{{client_ip}}",
    "user_agent": "{{user_agent}}"
  },
  
  "tenant": {
    "id": "{{tenant_id}}",
    "name": "{{tenant_name}}",
    "tier": "{{tenant_tier}}"
  },
  
  "resource": {
    "type": "{{resource_type}}",
    "id": "{{resource_id}}",
    "name": "{{resource_name}}"
  },
  
  "action": {
    "name": "{{action_name}}",
    "result": "success|failure|partial",
    "reason": "{{failure_reason}}"
  },
  
  "context": {
    "request_id": "{{request_id}}",
    "session_id": "{{session_id}}",
    "conversation_id": "{{conversation_id}}",
    "run_id": "{{run_id}}"
  },
  
  "metadata": {
    "source": "{{service_name}}",
    "environment": "{{environment}}",
    "region": "{{region}}"
  }
}
```

### AI-Specific Event Fields

```json
{
  "ai_context": {
    "agent_id": "{{agent_id}}",
    "model": "{{model_name}}",
    "tool_name": "{{tool_name}}",
    "token_usage": {
      "input": {{input_tokens}},
      "output": {{output_tokens}}
    },
    "cost": {{cost_usd}}
  }
}
```

## Event Types

### Authentication Events

| Event Type | Description | Required Fields |
|------------|-------------|-----------------|
| `auth.login` | User login | actor, result, method |
| `auth.logout` | User logout | actor, session_duration |
| `auth.mfa_challenge` | MFA verification | actor, mfa_method, result |
| `auth.password_change` | Password changed | actor, result |
| `auth.token_issued` | API token created | actor, token_id, scope |
| `auth.token_revoked` | API token revoked | actor, token_id, reason |

### Access Events

| Event Type | Description | Required Fields |
|------------|-------------|-----------------|
| `access.read` | Resource read | actor, resource, result |
| `access.list` | Resource listing | actor, resource_type, count |
| `access.search` | Search executed | actor, query_hash, result_count |
| `access.export` | Data export | actor, resource, format, size |

### Mutation Events

| Event Type | Description | Required Fields |
|------------|-------------|-----------------|
| `mutation.create` | Resource created | actor, resource, data_hash |
| `mutation.update` | Resource updated | actor, resource, changes |
| `mutation.delete` | Resource deleted | actor, resource, soft_delete |

### AI Agent Events

| Event Type | Description | Required Fields |
|------------|-------------|-----------------|
| `ai.tool_call` | Tool invocation | agent, tool, params_hash, result |
| `ai.generation` | LLM generation | agent, model, tokens, cost |
| `ai.safety_trigger` | Safety guardrail triggered | agent, guardrail, input_hash |
| `ai.kill_switch` | Agent terminated | agent, reason, duration |

## Storage Architecture

### Write Path

```
Event Source → Event Router → Enrichment → Validation → Write Buffer → Storage
                                                              │
                                              ┌───────────────┼───────────────┐
                                              ▼               ▼               ▼
                                        Hot Storage    Warm Storage     Cold Storage
                                        (7 days)       (90 days)        (7 years)
```

### Storage Configuration

| Storage Tier | Technology | Retention | Query Latency |
|--------------|------------|-----------|---------------|
| Hot | Elasticsearch | 7 days | <100ms |
| Warm | S3 + Athena | 90 days | <10s |
| Cold | S3 Glacier | 7 years | <12h |

## Query Patterns

### Common Audit Queries

```sql
-- User activity in time range
SELECT * FROM audit_events
WHERE tenant_id = '{{tenant_id}}'
  AND actor.id = '{{user_id}}'
  AND timestamp BETWEEN '{{start}}' AND '{{end}}'
ORDER BY timestamp DESC;

-- Failed authentication attempts
SELECT * FROM audit_events
WHERE event_type = 'auth.login'
  AND action.result = 'failure'
  AND timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC;

-- Cross-tenant access attempts (security)
SELECT * FROM audit_events
WHERE metadata.cross_tenant_attempt = true
ORDER BY timestamp DESC;
```

## Tenant Isolation

### Audit Data Isolation

| Isolation Level | Description | Implementation |
|-----------------|-------------|----------------|
| Logical | Tenant ID filtering | RLS policies |
| Physical | Separate indices | Index per tenant |
| Encryption | Per-tenant keys | Envelope encryption |

## Compliance Mapping

### Framework Requirements

| Framework | Requirement | Audit Events |
|-----------|-------------|--------------|
| SOC 2 | Access logging | `access.*`, `auth.*` |
| GDPR | Data access tracking | `access.*`, `mutation.*` |
| HIPAA | PHI access logging | `access.*` with PHI flag |
| PCI-DSS | Cardholder data access | `access.*` with PCI flag |

## Verification Checklist

- [ ] All event categories defined
- [ ] Event schema includes tenant context
- [ ] Retention policies configured per category
- [ ] Storage tiering implemented
- [ ] Query patterns support compliance needs
- [ ] Tenant isolation enforced
- [ ] AI agent events captured
- [ ] Cross-tenant access attempts logged

## Web Research Queries

- Search: "audit logging multi-tenant SaaS {date}"
- Search: "compliance audit trail design {date}"
- Search: "security event logging best practices {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
