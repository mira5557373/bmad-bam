# BAM Event Sourcing Guide

**When to load:** During Phase 3 (Solutioning) when designing event-driven systems,
or when user mentions event sourcing, event store, tenant streams, projections, replay, audit trail.

**Integrates with:** Architect (Platform Design), Dev (Implementation), Security (Audit)

---

## Core Concepts

### Event Sourcing for Multi-Tenant

Event sourcing stores all state changes as immutable events, providing complete audit trails and enabling tenant-specific replay.

| Concept | Definition | Multi-Tenant Concern |
|---------|------------|---------------------|
| Event | Immutable fact that happened | Must include tenant_id |
| Stream | Ordered sequence of events | Tenant-scoped streams |
| Projection | Derived view from events | Tenant-specific materialization |
| Snapshot | Point-in-time state capture | Per-tenant snapshots |

### Multi-Tenant Event Store Architecture

```
┌─────────────────────────────────────────────────┐
│              Event Store                         │
│  ┌─────────────────────────────────────────┐    │
│  │ Stream: tenant_abc-orders               │    │
│  │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │    │
│  │ │ E1  │→│ E2  │→│ E3  │→│ E4  │       │    │
│  │ └─────┘ └─────┘ └─────┘ └─────┘       │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Stream: tenant_xyz-orders               │    │
│  │ ┌─────┐ ┌─────┐ ┌─────┐               │    │
│  │ │ E1  │→│ E2  │→│ E3  │               │    │
│  │ └─────┘ └─────┘ └─────┘               │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  Global Index: All streams, filtered queries    │
└─────────────────────────────────────────────────┘
```

### Event Schema

| Field | Required | Purpose |
|-------|----------|---------|
| event_id | Yes | Unique identifier (UUID) |
| tenant_id | Yes | Tenant ownership |
| stream_id | Yes | Stream membership |
| event_type | Yes | Event classification |
| version | Yes | Stream position |
| timestamp | Yes | When it occurred |
| data | Yes | Event payload |
| metadata | Optional | Correlation, causation IDs |

---

## Application Guidelines

When implementing event sourcing for multi-tenant:

1. **Tenant-scope all streams** - Never mix tenant events in shared streams
2. **Design for replay** - Events must be replayable without side effects
3. **Plan snapshot strategy** - Balance replay performance vs storage
4. **Implement event versioning** - Handle schema evolution
5. **Secure event access** - Enforce tenant isolation on all queries

---

## Tenant Stream Patterns

### Stream Naming Conventions

| Pattern | Format | Use Case |
|---------|--------|----------|
| Tenant-prefixed | `{tenant_id}-{aggregate}` | Clear isolation |
| Category streams | `$ce-{category}` | Cross-tenant analytics (platform) |
| Projection streams | `{tenant_id}-{projection}` | Derived views |

### Stream Isolation Levels

| Level | Implementation | Isolation |
|-------|----------------|-----------|
| Logical | Tenant ID in stream name | Query-time |
| Physical | Separate event store instance | Database-level |
| Hybrid | Partition by tenant | Shard-level |

### Event Store Options

| Store | Multi-Tenant Support | Scaling |
|-------|---------------------|---------|
| EventStoreDB | Stream ACLs | Clustering |
| Marten | Schema per tenant | PostgreSQL |
| Kafka | Topic partitioning | Horizontal |
| DynamoDB | Partition key | Serverless |

---

## Projections

### Projection Types

| Type | Scope | Update Frequency |
|------|-------|------------------|
| Inline | Single stream | Synchronous |
| Async | Multiple streams | Eventually consistent |
| Catch-up | From specific position | Batch |
| Live | Real-time | Continuous |

### Tenant-Scoped Projections

```
┌─────────────────────────────────────────────────┐
│           Projection Engine                      │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Event Stream: tenant_abc-orders         │    │
│  └───────────────────┬─────────────────────┘    │
│                      │                          │
│         ┌────────────┼────────────┐             │
│         ▼            ▼            ▼             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Order     │ │Revenue   │ │Inventory │        │
│  │Summary   │ │Dashboard │ │Levels    │        │
│  │(tenant)  │ │(tenant)  │ │(tenant)  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

### Projection Storage by Tier

| Tier | Projection Store | Retention |
|------|------------------|-----------|
| Free | Shared read model | 30 days |
| Pro | Tenant partition | 1 year |
| Enterprise | Dedicated instance | Custom |

---

## Replay Mechanisms

### Replay Scenarios

| Scenario | Trigger | Scope |
|----------|---------|-------|
| Bug fix | Projection logic corrected | Affected tenants |
| New projection | Feature addition | All tenants |
| Disaster recovery | Data restore | Single tenant |
| Audit | Investigation | Time range |

### Replay Strategy

| Strategy | Speed | Resource Usage | Use Case |
|----------|-------|----------------|----------|
| Sequential | Slow | Low | Small streams |
| Parallel | Fast | High | Large streams |
| Incremental | Medium | Medium | Continuous |

### Tenant Replay Isolation

| Concern | Mitigation | Implementation |
|---------|------------|----------------|
| Cross-tenant impact | Tenant-specific replay | Stream filtering |
| Resource contention | Replay throttling | Rate limiting |
| Consistency | Replay ordering | Version tracking |

---

## Snapshots

### Snapshot Strategy

| Strategy | Interval | Storage |
|----------|----------|---------|
| Event count | Every N events | Alongside stream |
| Time-based | Every N hours | Separate store |
| On-demand | User triggered | Archive storage |

### Snapshot by Tier

| Tier | Snapshot Frequency | Retention |
|------|-------------------|-----------|
| Free | 1000 events | Latest only |
| Pro | 100 events | Last 5 |
| Enterprise | 50 events | Last 20 |

### Snapshot Schema

| Field | Purpose | Required |
|-------|---------|----------|
| snapshot_id | Unique identifier | Yes |
| tenant_id | Ownership | Yes |
| stream_id | Source stream | Yes |
| version | Event position | Yes |
| state | Serialized aggregate | Yes |
| timestamp | Creation time | Yes |

---

## Event Versioning

### Schema Evolution

| Change Type | Strategy | Compatibility |
|-------------|----------|---------------|
| Add field | Default value | Backward |
| Remove field | Ignore on read | Forward |
| Rename field | Upcaster | Both |
| Type change | Upcaster + validation | Breaking |

### Versioning Pattern

```
┌─────────────────────────────────────────────────┐
│           Event Upcasting                        │
│                                                  │
│  Event V1 → Upcaster → Event V2 → Upcaster → V3 │
│                                                  │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐     │
│  │OrderV1  │───►│OrderV2  │───►│OrderV3  │     │
│  │{items}  │    │{items,  │    │{items,  │     │
│  │         │    │ total}  │    │ total,  │     │
│  │         │    │         │    │ currency}│     │
│  └─────────┘    └─────────┘    └─────────┘     │
└─────────────────────────────────────────────────┘
```

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| Audit requirements | Full event sourcing | Complete history |
| Simple CRUD | Traditional DB | Less complexity |
| Complex domain | Event sourcing + CQRS | Domain modeling |
| High write volume | Event store + async projections | Write scalability |
| Compliance (GDPR) | Crypto-shredding events | Data deletion |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Event sourcing in platform design
- `bmad-bam-module-boundary-design` - Event-driven module boundaries
- `bmad-bam-tenant-offboarding-design` - Tenant event deletion

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `event-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "event sourcing multi-tenant patterns {date}"
- Search: "EventStoreDB tenant isolation {date}"
- Search: "event sourcing GDPR compliance {date}"
