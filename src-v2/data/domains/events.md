# Events - BAM Domain Context

**Loaded by:** ZED, ZEP  
**Related Workflows:** bmad-bam-event-architecture, bmad-bam-event-sourcing

---

## Overview

Event-driven architecture in multi-tenant systems requires tenant context in all events.

## Core Concepts

### Event Envelope

Every event MUST include tenant context:
```json
{
  "tenant_id": "tenant_123",
  "event_type": "user.created",
  "timestamp": "2026-04-26T10:00:00Z",
  "payload": { ... },
  "metadata": {
    "correlation_id": "...",
    "tier": "pro"
  }
}
```

### Event Flow

```
Producer → Topic (partitioned by tenant) → Consumer
    │                  │                      │
    └── tenant_id ─────┴───── routing key ────┘
```

### Event Categories

| Category | Examples | Retention |
|----------|----------|-----------|
| Domain | user.created, order.placed | 90 days |
| System | tenant.provisioned | Forever |
| Audit | permission.changed | 7 years |

## Decision Matrix

| Event Type | Delivery | Ordering | Tenant Isolation |
|------------|----------|----------|------------------|
| Domain events | At-least-once | Per-tenant | Partition key |
| Commands | Exactly-once | Strict | Dedicated queue |
| Notifications | Best-effort | None | Routing key |

## Quality Checks

- [ ] All events include tenant_id field
- [ ] Event routing respects tenant boundaries
- [ ] Dead letter queues are tenant-scoped
- [ ] **CRITICAL:** No cross-tenant event leakage

## Web Research Queries

- "multi-tenant event driven architecture {date}"
- "Kafka tenant isolation patterns {date}"

---

## CQRS Pattern

Command Query Responsibility Segregation separates read and write models for optimized scaling.

### When to Use CQRS

**Use when:**
- Read/write load asymmetry (10:1 or higher)
- Complex read models with multiple projections
- Event sourcing is in use
- Independent scaling requirements

**Do NOT use when:**
- Simple CRUD operations
- Consistent read-after-write required
- Low complexity systems

### CQRS Architecture

```
┌─────────────────────────────────────┐
│              CQRS                   │
│                                     │
│  ┌─────────┐      ┌─────────┐      │
│  │ Command │      │  Query  │      │
│  │  Model  │      │  Model  │      │
│  └────┬────┘      └────┬────┘      │
│       │                │           │
│       ▼                ▼           │
│  ┌─────────┐      ┌─────────┐      │
│  │  Write  │─────►│  Read   │      │
│  │   DB    │ sync │   DB    │      │
│  └─────────┘      └─────────┘      │
└─────────────────────────────────────┘
```

### Multi-Tenant CQRS Considerations

| Concern | Approach |
|---------|----------|
| Write DB isolation | RLS/Schema per tenant model |
| Read DB isolation | Tenant-prefixed materialized views |
| Event sync | Include tenant_id in all events |
| Projection filters | Tenant-scoped projections |

**Web Research:**
- Search: "CQRS implementation patterns {date}"
- Search: "CQRS multi-tenant SaaS {date}"
- Search: "event sourcing CQRS patterns {date}"
