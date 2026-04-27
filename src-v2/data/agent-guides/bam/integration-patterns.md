# BAM Integration Patterns Context

**When to load:** During cross-module integration, facade contract design, or convergence verification.

**Integrates with:** Kai (Integration Architect), Winston (Architect)

---

## Core Concepts for Integration

### Facade Contract Structure

```typescript
// Every facade method signature
interface ModuleFacade {
  methodName(
    ctx: TenantContext,    // Always first parameter
    input: InputDTO        // DTOs, not domain entities
  ): Promise<OutputDTO>;   // DTOs, not domain entities
}

// Contract versioning
@FacadeVersion('1.2.0')
class BillingFacade implements IBillingFacade {
  // Semantic versioning: MAJOR.MINOR.PATCH
  // MAJOR: Breaking changes
  // MINOR: New methods/fields (backward compatible)
  // PATCH: Bug fixes only
}
```

### Event Contract Pattern

```typescript
interface DomainEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  tenantId: string;      // Always include
  aggregateId: string;
  version: number;       // For ordering
  payload: object;       // Event-specific data
}

// Backward compatibility rules:
// - Add new optional fields only
// - Never remove or rename fields
// - Never change field types
```

### Event Schema Evolution

#### Schema Versioning Strategy

Every event schema must include a version field:

| Version Change | Action | Example |
|----------------|--------|---------|
| Patch (1.0.0 → 1.0.1) | Fix typo in field name | `user_id` → `userId` (with alias) |
| Minor (1.0.0 → 1.1.0) | Add optional field | Add `metadata?: object` |
| Major (1.0.0 → 2.0.0) | Breaking change | Remove required field |

#### Schema Registry

All event schemas registered in central registry:

```
event_schemas/
  ├── billing.invoice.created.v1.json
  ├── billing.invoice.created.v2.json
  ├── agent.run.completed.v1.json
  └── ...
```

#### Dual-Write Pattern for Migration

When evolving schemas:
1. Publish both v1 and v2 events during transition
2. Consumers migrate to v2 at their own pace
3. Deprecate v1 after all consumers migrated
4. Remove v1 after deprecation period (30 days)

### Circuit Breaker Patterns

#### Circuit Breaker States

```
     ┌──────────────────────────────────┐
     │                                  │
     ▼                                  │
┌─────────┐    failures    ┌────────┐   │
│ CLOSED  │───────────────►│  OPEN  │   │
│(Normal) │                │(Failed)│   │
└────┬────┘                └────┬───┘   │
     │                          │       │
     │                    timeout│       │
     │                          │       │
     │                    ┌─────▼─────┐ │
     │                    │HALF-OPEN  │─┘
     │                    │ (Testing) │
     │                    └─────┬─────┘
     │                          │
     │         success          │
     └──────────────────────────┘
```

#### Circuit Breaker Configuration

| Parameter | FREE Tier | PRO Tier | ENTERPRISE Tier |
|-----------|-----------|----------|-----------------|
| Failure Threshold | 3 | 5 | 10 |
| Reset Timeout | 30s | 60s | 120s |
| Half-Open Max Calls | 1 | 3 | 5 |
| Monitoring Window | 30s | 60s | 120s |

#### Per-Module Circuit Breakers

Each cross-module call has independent circuit breaker:

```
billing-facade → CLOSED
auth-facade → OPEN (failures: 5/5)
ai-runtime-facade → HALF-OPEN (testing)
```

### Saga Compensation Patterns

#### Saga Orchestration Structure

```
┌─────────────────────────────────────────────────────┐
│                   Saga Orchestrator                  │
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐ │
│  │ Step 1 │──►│ Step 2 │──►│ Step 3 │──►│ Step 4 │ │
│  │(Create)│   │ (Auth) │   │(Billing)│   │(Notify)│ │
│  └────┬───┘   └────┬───┘   └────┬───┘   └────────┘ │
│       │            │            │                   │
│       │  Failure at Step 3      │                   │
│       │            │            ▼                   │
│       │            │       ┌────────┐               │
│       │            │◄──────│Rollback│               │
│       │            │       │Step 2  │               │
│       │            ▼       └────────┘               │
│       │       ┌────────┐                            │
│       │◄──────│Rollback│                            │
│       │       │Step 1  │                            │
│       ▼       └────────┘                            │
│  ┌────────┐                                         │
│  │ FAILED │                                         │
│  └────────┘                                         │
└─────────────────────────────────────────────────────┘
```

#### Compensation Commands

Every saga step must define its compensation:

| Step | Action | Compensation |
|------|--------|--------------|
| CreateTenant | Insert tenant record | Delete tenant record |
| ProvisionDB | Create schema | Drop schema |
| SetupAuth | Create org in IdP | Delete org from IdP |
| CreateSubscription | Subscribe in Stripe | Cancel subscription |
| SendWelcome | Send email | (No compensation needed) |

#### Saga State Persistence

Store saga state for recovery:

| Field | Description |
|-------|-------------|
| saga_id | Unique identifier |
| saga_type | Type of saga |
| tenant_id | Tenant context |
| current_step | Current step index |
| status | pending, running, completed, failed, compensating |
| step_results | Results of each step |
| created_at | Start time |
| updated_at | Last update |

### Dead Letter Queue Handling

#### DLQ Structure

```
dlq.{source_queue}.{reason}
```

Examples:
- `dlq.billing.invoice.parse_error`
- `dlq.agent.run.timeout`
- `dlq.notification.email.delivery_failed`

#### DLQ Message Enrichment

Failed messages include:

| Field | Description |
|-------|-------------|
| original_message | Original message content |
| failure_reason | Why it failed |
| failure_timestamp | When it failed |
| retry_count | Number of retries attempted |
| stack_trace | Error stack trace |
| tenant_id | Tenant context |

#### DLQ Processing Strategies

| Strategy | When to Use | Implementation |
|----------|-------------|----------------|
| Auto-retry | Transient failures | Exponential backoff, max 3 retries |
| Manual review | Business logic errors | Admin dashboard notification |
| Discard | Known bad data | Log and delete after N days |
| Route to support | Customer impact | Create support ticket |

#### DLQ Monitoring

Alert thresholds:

| Metric | Warning | Critical |
|--------|---------|----------|
| Queue depth | > 100 | > 1000 |
| Message age | > 1 hour | > 24 hours |
| Failure rate | > 1% | > 5% |

### Retry Policies Per Integration Type

#### Synchronous API Calls

| Integration | Retry Count | Backoff | Timeout |
|-------------|-------------|---------|---------|
| Internal facade | 3 | Exponential (1s, 2s, 4s) | 10s |
| External API | 5 | Exponential (2s, 4s, 8s, 16s, 32s) | 30s |
| AI model call | 2 | Fixed (5s) | 120s |
| Database query | 3 | Fixed (100ms) | 5s |

#### Asynchronous Events

| Event Type | Retry Count | Delay | Max Age |
|------------|-------------|-------|---------|
| Critical (billing) | 10 | Exponential | 24 hours |
| Standard | 5 | Exponential | 4 hours |
| Best-effort | 3 | Fixed | 1 hour |

#### Retry with Jitter

Add randomization to prevent thundering herd:
```
delay = base_delay * (2 ^ attempt) + random(0, 1000ms)
```

### Convergence Verification

Pre-release checklist:
1. All facade contracts have passing tests
2. No circular dependencies detected
3. All cross-module stories decomposed
4. Contract versions aligned across consumers
5. Event schemas backward compatible

---

## Application Guidelines

1. **Contracts before code** - Define facade interface first
2. **DTOs at boundaries** - Never expose domain entities
3. **TenantContext always** - First parameter of every method
4. **Version explicitly** - Semantic versioning required
5. **Test contracts** - Contract tests for every facade

---

## Related Patterns

Load these from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `integration`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith integration patterns {date}"
- Search: "multi-tenant event-driven architecture {date}"
- Search: "facade contract design patterns {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to use sync facade call vs async event? | Use sync for queries needing immediate response; async for state change notifications | Sync provides consistency for reads; async enables loose coupling and resilience for writes |
| How to handle cross-module transaction consistency? | Implement saga orchestration with compensation handlers | Distributed transactions don't scale; sagas provide eventual consistency with rollback capability |
| When to version a facade contract? | MAJOR version for breaking changes; MINOR for additive; publish both during migration | Semantic versioning enables consumers to upgrade at their own pace without blocking releases |
| How aggressive should circuit breaker thresholds be? | Start conservative (3 failures, 30s timeout); tune based on actual failure patterns | Prevents cascade failures while allowing legitimate retries; adjust per integration criticality |
| When to route failed events to DLQ vs retry? | DLQ for business logic errors; retry with backoff for transient failures | Separates recoverable issues from those requiring human intervention |

---

## Related Workflows

- `bmad-bam-internal-contract-design` - Define new facade contracts with versioning
- `bmad-bam-convergence-verification` - Verify contract alignment across all modules
- `bmad-bam-internal-contract-design` - Test circuit breakers, sagas, and DLQ handling
- `bmad-bam-module-boundary-design` - Design module integration points
