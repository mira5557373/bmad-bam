# BAM State Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing state management systems, or when user mentions state management, caching, session handling, event sourcing, CQRS, projections, replay, tenant streams.

**Integrates with:** Architect (Atlas persona), Dev (Implementation), Security (Audit), DevOps (Operations)

---

## Core Concepts

| Principle | Description | Multi-Tenant Concern |
|-----------|-------------|---------------------|
| Isolation | State belongs to one tenant | Prevent cross-tenant access |
| Consistency | State reflects truth | Per-tenant consistency boundaries |
| Durability | State survives failures | Tenant-scoped recovery |
| Auditability | State changes are traceable | Tenant audit trails |

### State Types Overview

| State Type | Persistence | Scope | Primary Pattern |
|------------|-------------|-------|-----------------|
| Session | Ephemeral | User+Tenant | Session Management |
| Cache | Temporary | Tenant | Cache Isolation |
| Event Log | Permanent | Tenant Stream | Event Sourcing |
| Projection | Derived | Tenant View | CQRS |

### Multi-Tenant State Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    State Management Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Sessions   │  │    Cache     │  │ Event Store  │          │
│  │  (Stateful)  │  │ (Ephemeral)  │  │  (Durable)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         └─────────────────┼─────────────────┘                    │
│              ┌────────────▼────────────┐                        │
│              │   Tenant Context Layer   │                        │
│              │   (Isolation Enforced)   │                        │
│              └──────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for all state management implementations.

### Key Format Standards

| State Type | Key Format | Example |
|------------|------------|---------|
| Cache | `tenant:{tenant_id}:{namespace}:{key}` | `tenant:abc123:user:profile:u_xyz` |
| Session | `session:{tenant_id}:{session_id}` | `session:abc123:sess_def456` |
| Event Stream | `{tenant_id}-{aggregate}` | `abc123-orders` |
| Projection | `{tenant_id}-{projection}` | `abc123-order-summary` |

### Key Naming Rules

| Rule | Requirement | Rationale |
|------|-------------|-----------|
| Tenant prefix mandatory | All keys start with tenant identifier | Isolation guarantee |
| Lowercase components | No mixed case | Consistency |
| Colon separators (cache/session) | Use `:` between components | Redis convention |
| Hyphen separators (events) | Use `-` for streams | Event store convention |

### TTL Standards by Tier

| Data Type | Free Tier | Pro Tier | Enterprise |
|-----------|-----------|----------|------------|
| Session | 30 min | 2 hours | 8 hours |
| Cache (API) | 1 min | 5 min | 10 min |
| Cache (LLM) | 5 min | 30 min | 1 hour |
| Embedding | 1 hour | 24 hours | 7 days |

---

## Decision Framework

### State Pattern Selection Matrix

| Scenario | Recommended Pattern | Rationale |
|----------|---------------------|-----------|
| User authentication state | Session Management | Standard auth flow |
| API response caching | Cache Isolation | Performance optimization |
| Complete audit trail required | Event Sourcing | Immutable history |
| Complex domain with read/write separation | CQRS | Scalability |
| High-volume writes with delayed reads | Event Sourcing + Async Projections | Write performance |
| Simple CRUD operations | Traditional state | Reduced complexity |

### State Pattern Decision Tree

```
What is the state requirement?
    │
    ├── Authentication/Authorization state? → Session Management (§session-management)
    │
    ├── Performance optimization needed? → Cache Isolation (§caching)
    │
    ├── Complete audit trail required?
    │   ├── Complex read patterns? → Event Sourcing + CQRS (§event-sourcing + §cqrs)
    │   └── Simple read patterns? → Event Sourcing only (§event-sourcing)
    │
    └── Standard CRUD? → Traditional database state
```

### Isolation Level Selection

| Requirement | Isolation Level | Implementation |
|-------------|-----------------|----------------|
| Cost-sensitive, <1000 tenants | Key prefix | `tenant:{id}:...` |
| Moderate security needs | Logical database | Redis DB per tenant |
| Compliance requirements | Physical isolation | Dedicated instances |

---

## §event-sourcing

### Pattern: Event Sourcing

Event sourcing stores all state changes as immutable events, providing complete audit trails and enabling tenant-specific replay.

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

### Multi-Tenant Event Store Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Event Store                           │
│  ┌───────────────────────────────────────────────┐      │
│  │ Stream: tenant_abc-orders                      │      │
│  │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              │      │
│  │ │ E1  │→│ E2  │→│ E3  │→│ E4  │              │      │
│  │ └─────┘ └─────┘ └─────┘ └─────┘              │      │
│  └───────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────┐      │
│  │ Stream: tenant_xyz-orders                      │      │
│  │ ┌─────┐ ┌─────┐ ┌─────┐                       │      │
│  │ │ E1  │→│ E2  │→│ E3  │                       │      │
│  │ └─────┘ └─────┘ └─────┘                       │      │
│  └───────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

### Stream Naming and Isolation

| Pattern | Format | Use Case |
|---------|--------|----------|
| Tenant-prefixed | `{tenant_id}-{aggregate}` | Clear isolation |
| Category streams | `$ce-{category}` | Cross-tenant analytics (platform only) |
| Projection streams | `{tenant_id}-{projection}` | Derived views |

| Isolation Level | Implementation | Strength |
|-----------------|----------------|----------|
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

### Replay and Snapshots

| Replay Scenario | Trigger | Scope |
|-----------------|---------|-------|
| Bug fix | Projection logic corrected | Affected tenants |
| New projection | Feature addition | All tenants |
| Disaster recovery | Data restore | Single tenant |

| Tier | Snapshot Frequency | Retention |
|------|-------------------|-----------|
| Free | Every 1000 events | Latest only |
| Pro | Every 100 events | Last 5 |
| Enterprise | Every 50 events | Last 20 |

### Event Versioning

| Change Type | Strategy | Compatibility |
|-------------|----------|---------------|
| Add field | Default value | Backward |
| Remove field | Ignore on read | Forward |
| Rename field | Upcaster | Both |
| Type change | Upcaster + validation | Breaking |

---

## §cqrs

### Pattern: CQRS (Command Query Responsibility Segregation)

CQRS separates read and write models for complex domains requiring different optimization strategies.

```
┌─────────────────────────────────────────────────────────┐
│                   CQRS Architecture                      │
│  Commands                          Queries               │
│     │                                 │                  │
│     ▼                                 ▼                  │
│  ┌──────────┐                   ┌──────────┐            │
│  │  Write   │ ──Events──────►   │   Read   │            │
│  │  Model   │                   │  Model   │            │
│  └──────────┘                   └──────────┘            │
│       │                              │                   │
│  Event Store                   Read Database             │
│  (tenant-scoped)               (tenant-scoped)           │
└─────────────────────────────────────────────────────────┘
```

### CQRS Decision Criteria

| Factor | Use CQRS | Use Traditional |
|--------|----------|-----------------|
| Read/write ratio | High read volume | Balanced |
| Query complexity | Complex aggregations | Simple lookups |
| Scalability needs | Independent scaling | Coupled OK |

### Projection Types and Storage

| Type | Scope | Update Frequency |
|------|-------|------------------|
| Inline | Single stream | Synchronous |
| Async | Multiple streams | Eventually consistent |
| Catch-up | From specific position | Batch |

| Tier | Projection Store | Retention |
|------|------------------|-----------|
| Free | Shared read model | 30 days |
| Pro | Tenant partition | 1 year |
| Enterprise | Dedicated instance | Custom |

---

## §caching

### Pattern: Cache Isolation

Multi-tenant caching requires strict isolation with tenant-aware key prefixing and quota management.

### Cache Layers

| Layer | Technology | Scope | Use Case |
|-------|------------|-------|----------|
| L1 - Application | In-memory | Pod/instance | Hot data, config |
| L2 - Distributed | Redis/Memcached | Cluster-wide | Shared state, sessions |
| L3 - CDN | Edge cache | Global | Static assets, API |
| L4 - Database | Query cache | Database | Repeated queries |

### Cache Key Examples

| Use Case | Key Pattern | TTL |
|----------|-------------|-----|
| User session | `tenant:abc:session:user:u_xyz` | 1 hour |
| Tenant config | `tenant:abc:config:tier:current` | 5 min |
| Agent state | `tenant:abc:agent:state:a_123` | 30 min |
| Embedding | `tenant:abc:vector:embedding:{doc_id}` | 24 hours |

### Cache Isolation Strategies

| Strategy | Isolation | Performance | Cost |
|----------|-----------|-------------|------|
| Key prefix | Basic | Best | Lowest |
| Logical DB | Medium | Good | Low |
| Dedicated instance | Strong | Best | High |

### Per-Tier Cache Quotas

| Tier | Quota | Eviction Policy |
|------|-------|-----------------|
| Free | 100MB | LRU aggressive |
| Pro | 1GB | LRU standard |
| Enterprise | 10GB+ | LRU conservative |

### LLM Response Caching

| Prompt Type | Cacheable | Strategy | TTL |
|-------------|-----------|----------|-----|
| Factual query | Yes | Semantic + exact | 1 hour |
| Creative task | Limited | Exact only | 5 min |
| Personalized | Yes (per-user) | Exact with context | 30 min |
| Confidential | Tenant-only | Exact with tenant scope | 15 min |

### Cache Invalidation

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| TTL-based | Automatic expiry | Most cases |
| Event-driven | Pub/sub on mutation | Real-time consistency |
| Version-based | Increment version in key | Controlled rollout |

---

## §session-management

### Pattern: Session Management

Session management handles user authentication state ensuring sessions are properly scoped and isolated.

### Session Key Format

```
session:{tenant_id}:{session_id}
```

### Session Token Structure

```
┌─────────────────────────────────────────┐
│           Session Token                  │
│  {                                       │
│    "session_id": "sess_abc123",          │
│    "tenant_id": "tenant_xyz",            │
│    "user_id": "user_456",                │
│    "expires_at": "2026-04-09T22:00:00Z"  │
│  }                                       │
│  Tenant context validated on every call  │
└─────────────────────────────────────────┘
```

### Session Lifecycle

| Phase | Action | Tenant Consideration |
|-------|--------|---------------------|
| Create | Generate session | Set tenant context |
| Validate | Check session | Verify tenant match |
| Refresh | Extend session | Maintain tenant context |
| Revoke | End session | Tenant-scoped cleanup |
| Audit | Log activity | Tenant audit trail |

### Per-Tier Session Configuration

| Tier | Timeout | Max Sessions | Refresh |
|------|---------|--------------|---------|
| Free | 2 hours | 2 devices | No |
| Pro | 12 hours | 5 devices | Yes |
| Enterprise | 24 hours | Unlimited | Yes |

### Session Security Controls

| Concern | Mitigation | Implementation |
|---------|------------|----------------|
| Session Hijacking | Secure token | HTTPS, HttpOnly |
| Cross-Tenant Access | Tenant validation | Check every request |
| Session Fixation | Regenerate on auth | New token post-login |
| Stale Sessions | Timeout and cleanup | TTL + cleanup job |

### Session Storage Options

| Store | Performance | Persistence | Use Case |
|-------|-------------|-------------|----------|
| Redis | Excellent | Optional | Most cases |
| Database | Good | Yes | Compliance |
| JWT (stateless) | N/A | N/A | Simple auth |

---

## Quality Gates

### Pre-Production Verification

- [ ] All cache keys follow `tenant:{tenant_id}:{namespace}:{key}` format
- [ ] All session keys follow `session:{tenant_id}:{session_id}` format
- [ ] All event streams follow `{tenant_id}-{aggregate}` format
- [ ] Tenant validation occurs on every state access
- [ ] TTLs configured appropriately per tier
- [ ] Cache quotas enforced per tenant
- [ ] Session limits enforced per tier
- [ ] Event replay tested for single tenant isolation
- [ ] Cross-tenant access prevention verified
- [ ] Audit logging enabled for state mutations

---

## Web Research

| Topic | Query |
|-------|-------|
| Event Sourcing | "event sourcing multi-tenant patterns {date}" |
| Event Store | "EventStoreDB tenant isolation {date}" |
| GDPR Compliance | "event sourcing GDPR compliance {date}" |
| Caching | "multi-tenant caching strategies {date}" |
| Redis Isolation | "Redis tenant isolation patterns {date}" |
| Session Management | "multi-tenant session management {date}" |
| Secure Sessions | "secure session handling patterns {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **State patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `state-*`
- **Event patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-*`
- **Caching patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-strategy`
- **Session patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `session-management`

---

## Related Workflows

- `bmad-bam-create-master-architecture` - State architecture decisions
- `bmad-bam-tenant-model-isolation` - State isolation configuration
- `bmad-bam-agent-runtime-architecture` - Agent state and LLM caching
- `bmad-bam-module-boundary-design` - Event-driven module boundaries
- `bmad-bam-tenant-offboarding-design` - Tenant state deletion
- `bmad-bam-validate-foundation` - State implementation verification

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 3 source files (event-sourcing-guide.md, session-management.md, caching-strategies.md) |
