---
name: trigger-map-template
description: Template for WDS Saga trigger mapping in multi-tenant SaaS workflows
category: workflow-design
version: 1.0.0
type: "integration"
---

## Purpose

Template for WDS Saga trigger mapping in multi-tenant SaaS workflows

# Trigger Map: {{workflow_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Overview

### 1.1 Purpose

This document defines the trigger mapping for {{workflow_name}}, specifying how events, conditions, and user actions initiate saga workflows in a multi-tenant environment.

## Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- Trigger scoping: {{trigger_scoping}}

### 1.2 Saga Context

| Field | Value |
|-------|-------|
| Saga Name | {{saga_name}} |
| Domain | {{domain}} |
| Tenant Scope | {{tenant_scope}} |
| Compensation Strategy | {{compensation_strategy}} |

---

## Trigger Categories

### 2.1 Trigger Types

| Type | Description | Tenant Context | Example |
|------|-------------|----------------|---------|
| Event | Domain event from message bus | Required | `order.created` |
| Schedule | Time-based trigger | Required | `0 0 * * *` (daily) |
| API | Direct API invocation | From request | `POST /api/sagas/start` |
| Webhook | External system callback | From payload | Stripe webhook |
| Condition | State-based trigger | From context | Balance threshold |

### 2.2 Trigger Priority Matrix

| Priority | Response Time | Use Case | Queue |
|----------|---------------|----------|-------|
| Critical | < 100ms | Payment processing | High-priority |
| High | < 1s | User-initiated actions | Standard |
| Normal | < 30s | Background processing | Default |
| Low | < 5m | Analytics, reports | Background |
| Batch | Scheduled | Bulk operations | Batch |

---

## Event Triggers

### 3.1 Event Trigger Definitions

| Trigger ID | Event Name | Source | Filter | Saga Action |
|------------|------------|--------|--------|-------------|
| {{trigger_id_1}} | {{event_name_1}} | {{event_source_1}} | {{event_filter_1}} | {{saga_action_1}} |
| {{trigger_id_2}} | {{event_name_2}} | {{event_source_2}} | {{event_filter_2}} | {{saga_action_2}} |
| {{trigger_id_3}} | {{event_name_3}} | {{event_source_3}} | {{event_filter_3}} | {{saga_action_3}} |

### 3.2 Event Trigger Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Event Trigger Processing                      │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Event     │───►│   Tenant    │───►│   Filter    │         │
│  │   Source    │    │   Context   │    │   Engine    │         │
│  └─────────────┘    │  Extraction │    └──────┬──────┘         │
│                     └─────────────┘           │                 │
│                                               ▼                 │
│                     ┌─────────────────────────────────┐         │
│                     │         Trigger Router          │         │
│                     └────────────┬────────────────────┘         │
│                                  │                               │
│            ┌─────────────────────┼─────────────────────┐        │
│            ▼                     ▼                     ▼        │
│     ┌───────────┐         ┌───────────┐         ┌───────────┐  │
│     │  Saga A   │         │  Saga B   │         │  Saga C   │  │
│     │  Handler  │         │  Handler  │         │  Handler  │  │
│     └───────────┘         └───────────┘         └───────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Event Payload Schema

| Field | Type | Required | Tenant Scoped | Description |
|-------|------|----------|---------------|-------------|
| event_id | UUID | Yes | No | Unique event identifier |
| event_type | string | Yes | No | Event type name |
| tenant_id | UUID | Yes | Yes | Tenant identifier |
| timestamp | ISO8601 | Yes | No | Event timestamp |
| payload | object | Yes | Yes | Event-specific data |
| metadata | object | No | Varies | Additional context |
| correlation_id | UUID | No | No | Request correlation |

---

## Schedule Triggers

### 4.1 Scheduled Trigger Definitions

| Trigger ID | Schedule | Timezone | Tenant Filter | Saga Action |
|------------|----------|----------|---------------|-------------|
| {{schedule_id_1}} | {{cron_1}} | {{timezone_1}} | {{tenant_filter_1}} | {{schedule_action_1}} |
| {{schedule_id_2}} | {{cron_2}} | {{timezone_2}} | {{tenant_filter_2}} | {{schedule_action_2}} |

### 4.2 Schedule Processing Strategy

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Per-Tenant | Run schedule for each tenant individually | Billing cycles |
| Batch | Run once, process all matching tenants | System maintenance |
| Staggered | Distribute across time window | Report generation |

### 4.3 Schedule Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  Schedule Trigger Processing                     │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Scheduler  │───►│   Tenant    │───►│   Saga      │         │
│  │   (Cron)    │    │   Iterator  │    │  Dispatcher │         │
│  └─────────────┘    └─────────────┘    └──────┬──────┘         │
│                                               │                 │
│                     Per-Tenant Execution      │                 │
│            ┌─────────────────────────────────┐│                 │
│            │  ┌───────────────────────────┐  ││                 │
│            │  │ Tenant A → Saga Instance  │◄─┘│                 │
│            │  └───────────────────────────┘   │                 │
│            │  ┌───────────────────────────┐   │                 │
│            │  │ Tenant B → Saga Instance  │   │                 │
│            │  └───────────────────────────┘   │                 │
│            │  ┌───────────────────────────┐   │                 │
│            │  │ Tenant C → Saga Instance  │   │                 │
│            │  └───────────────────────────┘   │                 │
│            └─────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Triggers

### 5.1 API Trigger Endpoints

| Trigger ID | Method | Endpoint | Auth | Rate Limit | Saga Action |
|------------|--------|----------|------|------------|-------------|
| {{api_trigger_1}} | POST | {{api_endpoint_1}} | Bearer JWT | {{rate_limit_1}} | {{api_action_1}} |
| {{api_trigger_2}} | POST | {{api_endpoint_2}} | Bearer JWT | {{rate_limit_2}} | {{api_action_2}} |

### 5.2 API Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| saga_type | string | Yes | Saga to trigger |
| input | object | Yes | Saga input payload |
| idempotency_key | string | Yes | Deduplication key |
| priority | string | No | Processing priority |
| callback_url | string | No | Webhook for completion |

### 5.3 API Response Schema

| Field | Type | Description |
|-------|------|-------------|
| saga_id | UUID | Created saga instance ID |
| status | string | Initial status (pending/running) |
| tenant_id | UUID | Tenant context |
| created_at | ISO8601 | Creation timestamp |

---

## Webhook Triggers

### 6.1 Webhook Endpoint Definitions

| Trigger ID | Source | Endpoint | Verification | Saga Action |
|------------|--------|----------|--------------|-------------|
| {{webhook_id_1}} | {{webhook_source_1}} | {{webhook_endpoint_1}} | {{webhook_verify_1}} | {{webhook_action_1}} |
| {{webhook_id_2}} | {{webhook_source_2}} | {{webhook_endpoint_2}} | {{webhook_verify_2}} | {{webhook_action_2}} |

### 6.2 Webhook Processing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Webhook Trigger Processing                     │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  External   │───►│  Signature  │───►│   Tenant    │         │
│  │   System    │    │  Verify     │    │   Resolve   │         │
│  └─────────────┘    └─────────────┘    └──────┬──────┘         │
│                                               │                 │
│                     ┌─────────────────────────┘                 │
│                     ▼                                           │
│           ┌─────────────────────┐    ┌─────────────────────┐   │
│           │   Idempotency       │───►│    Saga             │   │
│           │   Check             │    │    Dispatcher       │   │
│           └─────────────────────┘    └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Webhook Tenant Resolution

| Resolution Method | Source | Example |
|-------------------|--------|---------|
| Payload Field | webhook.data.tenant_id | Stripe customer metadata |
| Header | X-Tenant-ID | Custom integrations |
| Lookup Table | external_id → tenant_id | Partner integrations |
| URL Path | /webhooks/{tenant_id}/stripe | Per-tenant endpoints |

---

## Condition Triggers

### 7.1 Condition Trigger Definitions

| Trigger ID | Condition | Check Frequency | Tenant Scope | Saga Action |
|------------|-----------|-----------------|--------------|-------------|
| {{condition_id_1}} | {{condition_expr_1}} | {{check_freq_1}} | Per-tenant | {{condition_action_1}} |
| {{condition_id_2}} | {{condition_expr_2}} | {{check_freq_2}} | Per-tenant | {{condition_action_2}} |

### 7.2 Condition Expression Examples

| Condition Type | Expression | Use Case |
|----------------|------------|----------|
| Threshold | `account.balance < 10` | Low balance alert |
| Time-based | `subscription.expires_in < 7d` | Renewal reminder |
| Count-based | `usage.api_calls > quota * 0.9` | Usage warning |
| State-based | `order.status == 'pending' AND age > 24h` | Stale order processing |

### 7.3 Condition Evaluation Strategy

| Strategy | Description | Performance Impact |
|----------|-------------|-------------------|
| Polling | Check conditions on schedule | Higher latency |
| Event-Driven | Evaluate on state change | Lower latency |
| Hybrid | Event + periodic sweep | Balanced |

---

## Tenant Context Handling

### 8.1 Context Extraction Matrix

| Trigger Type | Context Source | Validation | Fallback |
|--------------|----------------|------------|----------|
| Event | Event payload `tenant_id` | UUID format | Reject |
| Schedule | Iterator provides | Always valid | N/A |
| API | JWT claim `tenant_id` | Token validation | 401 |
| Webhook | Resolution method | Lookup success | 400 |
| Condition | Query context | Always set | N/A |

### 8.2 Context Propagation

| Saga Phase | Context Location | Access Method |
|------------|------------------|---------------|
| Trigger | Request/Event | Direct extraction |
| Initialization | Saga state | State field |
| Step Execution | Step context | Context injection |
| Compensation | Compensation context | From original state |
| Completion | Final state | State field |

### 8.3 Cross-Tenant Trigger Protection

| Protection | Implementation | Verification |
|------------|----------------|--------------|
| Tenant ID validation | UUID format + existence check | Unit test |
| Context immutability | Read-only after extraction | Code review |
| Audit logging | All triggers logged with tenant | Log analysis |
| Rate limiting | Per-tenant trigger limits | Load test |

---

## Trigger Configuration

### 9.1 Trigger Registry

```yaml
triggers:
  events:
    - id: {{trigger_id_1}}
      event: {{event_name_1}}
      filter:
        type: {{event_filter_type_1}}
        expression: {{event_filter_expr_1}}
      saga: {{saga_name}}
      action: start
      priority: {{trigger_priority_1}}
      
  schedules:
    - id: {{schedule_id_1}}
      cron: {{cron_1}}
      timezone: {{timezone_1}}
      tenant_filter:
        tier: [pro, enterprise]
      saga: {{saga_name}}
      action: {{schedule_action_1}}
      
  webhooks:
    - id: {{webhook_id_1}}
      source: {{webhook_source_1}}
      endpoint: {{webhook_endpoint_1}}
      verification:
        method: {{webhook_verify_method}}
        secret_key: ${WEBHOOK_SECRET}
      tenant_resolution:
        method: {{tenant_resolution_method}}
        field: {{tenant_resolution_field}}
      saga: {{saga_name}}
      
  conditions:
    - id: {{condition_id_1}}
      expression: {{condition_expr_1}}
      check_frequency: {{check_freq_1}}
      saga: {{saga_name}}
      debounce: {{debounce_seconds}}s
```

### 9.2 Tier-Specific Trigger Configuration

| Trigger Feature | Free | Pro | Enterprise |
|-----------------|------|-----|------------|
| Event triggers | {{free_event_triggers}} | {{pro_event_triggers}} | {{enterprise_event_triggers}} |
| Schedule triggers | {{free_schedule_triggers}} | {{pro_schedule_triggers}} | {{enterprise_schedule_triggers}} |
| Webhook endpoints | {{free_webhooks}} | {{pro_webhooks}} | {{enterprise_webhooks}} |
| Condition triggers | {{free_conditions}} | {{pro_conditions}} | {{enterprise_conditions}} |
| Custom triggers | No | No | Yes |

---

## Error Handling

### 10.1 Trigger Error Matrix

| Error Type | Response | Retry | Notification |
|------------|----------|-------|--------------|
| Invalid tenant | Reject trigger | No | Log warning |
| Schema validation | 400 Bad Request | No | None |
| Rate limit exceeded | 429 Too Many Requests | Yes (backoff) | Alert at threshold |
| Internal error | 500 Internal Error | Yes (3x) | Alert immediately |
| Saga start failure | Queue for retry | Yes (5x) | Alert after exhaustion |

### 10.2 Dead Letter Handling

| Condition | Action | Retention |
|-----------|--------|-----------|
| Max retries exceeded | Move to DLQ | {{dlq_retention}} |
| Invalid payload | Move to DLQ | {{dlq_retention}} |
| Tenant deleted | Discard | N/A |
| System error | Retry then DLQ | {{dlq_retention}} |

---

## Monitoring and Observability

### 11.1 Trigger Metrics

| Metric | Type | Labels | Alert Threshold |
|--------|------|--------|-----------------|
| trigger_total | Counter | type, saga, tenant_id | N/A |
| trigger_latency_seconds | Histogram | type, saga | P99 > {{latency_threshold}}s |
| trigger_errors_total | Counter | type, error_code, tenant_id | > {{error_threshold}}/min |
| trigger_queue_depth | Gauge | queue, priority | > {{queue_threshold}} |

### 11.2 Trigger Logs

| Field | Type | Description |
|-------|------|-------------|
| timestamp | ISO8601 | Trigger time |
| trigger_id | string | Trigger definition ID |
| trigger_type | string | event/schedule/api/webhook/condition |
| tenant_id | UUID | Tenant context |
| saga_id | UUID | Created saga instance |
| status | string | success/failure |
| duration_ms | number | Processing duration |
| error | string | Error message if failed |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "saga orchestration trigger patterns {date}"
- "event-driven workflow triggers SaaS {date}"
- "multi-tenant event routing best practices {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### 13.1 Trigger Implementation Checklist

- [ ] All triggers extract tenant context correctly
- [ ] Event triggers filter by tenant appropriately
- [ ] Schedule triggers iterate tenants correctly
- [ ] Webhook signatures verified before processing
- [ ] API triggers validate JWT tenant claims
- [ ] Condition triggers evaluate per-tenant
- [ ] Rate limiting applied per-tenant
- [ ] Dead letter queue configured
- [ ] Metrics and logging implemented
- [ ] Error handling covers all cases

### 13.2 Multi-Tenant Verification

- [ ] Cross-tenant trigger isolation verified
- [ ] Tenant context immutable after extraction
- [ ] Audit trail captures all triggers
- [ ] Tier-specific limits enforced
- [ ] Tenant deletion stops all triggers

---

## Appendix A: Related Documents

- Pattern: `saga-orchestration` in `bam-patterns.csv`
- Template: `tenant-persona-template.md`
- Workflow: `bmad-bam-tenant-onboarding-design`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
