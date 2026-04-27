# BAM CQRS Pattern Guide

**When to load:** During Phase 3 (Solutioning) when designing read/write separation,
or when user mentions CQRS, command query, read models, write models, eventual consistency, tenant views.

**Integrates with:** Architect (Platform Design), Dev (Implementation), DevOps (Operations)

---

## Core Concepts

### CQRS for Multi-Tenant Systems

Command Query Responsibility Segregation separates read and write operations, enabling tenant-specific optimizations for each.

| Side | Purpose | Multi-Tenant Concern |
|------|---------|---------------------|
| Command | Handle writes, enforce invariants | Tenant isolation in transactions |
| Query | Serve reads, optimize for views | Tenant-scoped read models |

### Multi-Tenant CQRS Architecture

```
┌─────────────────────────────────────────────────┐
│              CQRS Architecture                   │
│                                                  │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │   Command Side   │  │   Query Side     │    │
│  │  ┌────────────┐  │  │  ┌────────────┐  │    │
│  │  │ Commands   │  │  │  │ Queries    │  │    │
│  │  │ (+ tenant) │  │  │  │ (+ tenant) │  │    │
│  │  └─────┬──────┘  │  │  └─────┬──────┘  │    │
│  │        ▼         │  │        ▼         │    │
│  │  ┌────────────┐  │  │  ┌────────────┐  │    │
│  │  │ Write DB   │──┼──┼─►│ Read Model │  │    │
│  │  │ (tenant    │  │  │  │ (tenant    │  │    │
│  │  │  scoped)   │  │  │  │  scoped)   │  │    │
│  │  └────────────┘  │  │  └────────────┘  │    │
│  └──────────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Read/Write Separation Benefits

| Benefit | Command Side | Query Side |
|---------|--------------|------------|
| Optimization | Normalized for consistency | Denormalized for speed |
| Scaling | Scale for write load | Scale for read load |
| Caching | Limited (consistency) | Aggressive (per tenant) |
| Complexity | Domain logic | Simple projections |

---

## Application Guidelines

When implementing CQRS for multi-tenant:

1. **Enforce tenant on both sides** - Commands and queries must include tenant context
2. **Design tenant-specific read models** - Optimize for tenant query patterns
3. **Handle eventual consistency** - Define acceptable staleness per tier
4. **Plan synchronization** - Event-driven or change data capture
5. **Monitor sync lag** - Alert on excessive read model delay

---

## Command Side Design

### Command Structure

| Component | Required | Purpose |
|-----------|----------|---------|
| command_id | Yes | Idempotency |
| tenant_id | Yes | Isolation |
| aggregate_id | Yes | Target entity |
| command_type | Yes | Operation |
| payload | Yes | Command data |
| metadata | Optional | Correlation, user context |

### Command Handler Pattern

```
┌─────────────────────────────────────────────────┐
│           Command Processing                     │
│                                                  │
│  1. Receive command with tenant_id              │
│  2. Validate tenant authorization               │
│  3. Load aggregate (tenant-scoped)              │
│  4. Execute domain logic                        │
│  5. Persist changes (tenant-scoped)             │
│  6. Publish events (tenant-tagged)              │
│  7. Return result                               │
└─────────────────────────────────────────────────┘
```

### Write Model Isolation

| Isolation Level | Implementation | Use Case |
|-----------------|----------------|----------|
| Shared tables | RLS policies | Cost-efficient |
| Tenant schema | Schema per tenant | Moderate isolation |
| Tenant database | Database per tenant | Maximum isolation |

---

## Query Side Design

### Tenant-Scoped Read Models

| Model Type | Scope | Refresh Strategy |
|------------|-------|------------------|
| Personal | User within tenant | Real-time |
| Team | Group within tenant | Near real-time |
| Tenant-wide | All tenant data | Periodic |
| Cross-tenant | Platform analytics | Batch |

### Read Model Patterns

```
┌─────────────────────────────────────────────────┐
│           Read Model Types                       │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Dashboard Model                  │    │
│  │ - Pre-aggregated metrics               │    │
│  │ - Filtered by tenant_id                │    │
│  │ - Cached per tier TTL                  │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Search Model                     │    │
│  │ - Full-text indexed                    │    │
│  │ - Tenant-scoped index                  │    │
│  │ - Real-time updates                    │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Tenant Report Model                     │    │
│  │ - Time-series data                     │    │
│  │ - Batch refreshed                      │    │
│  │ - Historical queries                   │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Query Optimization by Tier

| Tier | Read Model | Caching | Freshness |
|------|------------|---------|-----------|
| Free | Shared, filtered | Aggressive | 5 min |
| Pro | Dedicated tables | Moderate | 1 min |
| Enterprise | Custom models | Minimal | Real-time |

---

## Synchronization Strategies

### Event-Driven Sync

| Pattern | Latency | Complexity | Reliability |
|---------|---------|------------|-------------|
| Direct event handler | Milliseconds | Low | Medium |
| Message queue | Seconds | Medium | High |
| Event store | Milliseconds | High | Very high |

### Change Data Capture

| Source | Tool | Multi-Tenant |
|--------|------|--------------|
| PostgreSQL | Debezium | Filter by tenant column |
| MySQL | Maxwell | Schema filtering |
| MongoDB | Change Streams | Database filtering |

### Sync Architecture

```
┌─────────────────────────────────────────────────┐
│           Sync Pipeline                          │
│                                                  │
│  Write DB ──► CDC/Events ──► Processor ──► Read │
│     │                            │              │
│     │                     ┌──────▼──────┐       │
│     │                     │Tenant Filter│       │
│     │                     └──────┬──────┘       │
│     │                            │              │
│     │                     ┌──────▼──────┐       │
│     │                     │Transform    │       │
│     │                     └──────┬──────┘       │
│     │                            │              │
│     │                     ┌──────▼──────┐       │
│     │                     │Write Read   │       │
│     │                     │Model        │       │
│     │                     └─────────────┘       │
└─────────────────────────────────────────────────┘
```

---

## Eventual Consistency

### Consistency Guarantees

| Guarantee | Definition | Use Case |
|-----------|------------|----------|
| Strong | Read your writes | Financial |
| Session | Consistent within session | User actions |
| Eventual | Eventually consistent | Analytics |
| Bounded staleness | Max N seconds old | Dashboards |

### Staleness by Tier

| Tier | Max Staleness | Retry Strategy |
|------|---------------|----------------|
| Free | 5 minutes | User refresh |
| Pro | 30 seconds | Auto-refresh |
| Enterprise | < 1 second | Real-time push |

### Handling Stale Reads

| Scenario | User Experience | Implementation |
|----------|-----------------|----------------|
| Dashboard | Show refresh timestamp | Last-updated indicator |
| Search | May miss recent changes | "Syncing..." status |
| Reports | Point-in-time accurate | Snapshot timestamp |

---

## View Management

### Tenant View Lifecycle

| Phase | Actions | Trigger |
|-------|---------|---------|
| Creation | Generate initial views | Tenant onboarding |
| Update | Apply incremental changes | Events/CDC |
| Optimization | Rebuild indexes | Scheduled maintenance |
| Deletion | Remove all views | Tenant offboarding |

### View Storage Options

| Store | Best For | Multi-Tenant |
|-------|----------|--------------|
| PostgreSQL | Relational queries | Schema per tenant |
| Elasticsearch | Full-text search | Index per tenant |
| Redis | Fast lookups | Key prefix |
| ClickHouse | Analytics | Database per tenant |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| High read/write ratio | CQRS | Optimize reads separately |
| Simple CRUD | No CQRS | Avoid complexity |
| Complex queries | CQRS with specialized read models | Query optimization |
| Audit requirements | CQRS + event sourcing | Full history |
| Real-time dashboards | CQRS with push updates | Live data |

---

## Related Workflows

- `create-master-architecture` - CQRS in platform design
- `bmad-bam-event-streaming-design` - CQRS with event sourcing
- `bmad-bam-module-boundary-design` - Module read/write separation

## Related Patterns

Load decision criteria and web search queries from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `cqrs-*`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "CQRS multi-tenant implementation {date}"
- Search: "read model synchronization patterns {date}"
- Search: "eventual consistency SaaS best practices {date}"
