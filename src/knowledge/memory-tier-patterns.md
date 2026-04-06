# Memory Tier Patterns

## Core Concept

AI agent memory is organized in tiers with strict isolation boundaries.
Higher tiers can read from lower tiers, but writes are scope-restricted.

## Memory Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                    GLOBAL (System)                       │
│  • Read-only for agents                                  │
│  • Platform knowledge, policies, reference data          │
├─────────────────────────────────────────────────────────┤
│                    TENANT (Shared)                       │
│  • Isolated per tenant_id                                │
│  • Shared facts, preferences, learned patterns           │
├─────────────────────────────────────────────────────────┤
│                    USER (Personal)                       │
│  • Isolated per user_id + tenant_id                      │
│  • User preferences, history, personal context           │
├─────────────────────────────────────────────────────────┤
│                    SESSION (Ephemeral)                   │
│  • Isolated per conversation_id                          │
│  • Current conversation context                          │
└─────────────────────────────────────────────────────────┘
```

## Read Access Matrix

| Reader Scope | Session | User        | Tenant        | Global |
| ------------ | ------- | ----------- | ------------- | ------ |
| Session      | ✅ Own  | ✅ Own user | ✅ Own tenant | ✅     |
| User         | ❌      | ✅ Own      | ✅ Own tenant | ✅     |
| Tenant       | ❌      | ❌          | ✅ Own        | ✅     |
| Global       | ❌      | ❌          | ❌            | ✅     |

## Write Access Rules

| Scope   | Who Can Write         | Validation                   |
| ------- | --------------------- | ---------------------------- |
| Session | Agent in conversation | conversation_id match        |
| User    | Agent acting for user | user_id + tenant_id match    |
| Tenant  | Agent in tenant       | tenant_id match + permission |
| Global  | Admin only            | Admin role required          |

## Implementation Pattern

**MemoryManager** — initialized with `TenantContext`, provides `remember()` and `recall()` methods.

**`remember(fact, scope)` — Write rules:**

| Scope     | Store Initialized With                   | Permission Check                           | On Denied                |
| --------- | ---------------------------------------- | ------------------------------------------ | ------------------------ |
| `SESSION` | `SessionMemory(ctx.conversation_id)`     | None                                       | —                        |
| `USER`    | `UserMemory(ctx.user_id, ctx.tenant_id)` | None                                       | —                        |
| `TENANT`  | `TenantMemory(ctx.tenant_id)`            | `ctx.can_write_tenant_memory` must be True | Raise `PermissionDenied` |
| `GLOBAL`  | `GlobalMemory()` (read-only)             | Always denied for agents                   | Raise `PermissionDenied` |

**`recall(query, scopes)` — Read rules:**

Iterates requested scopes in order, extends results from each. Access control enforced by store initialization (each store is scoped to the context's tenant/user/session IDs).

## Storage Backend Mapping

| Scope   | Recommended Store     | Retention            | Indexing         |
| ------- | --------------------- | -------------------- | ---------------- |
| Session | Redis                 | Request/Conversation | None             |
| User    | PostgreSQL + pgvector | 90 days default      | Vector + keyword |
| Tenant  | PostgreSQL + pgvector | Indefinite           | Vector + keyword |
| Global  | PostgreSQL + pgvector | Indefinite           | Vector + keyword |

## Cross-Tenant Contamination Prevention

```python
# NEVER do this - retrieves across tenants
memories = await memory_store.search(query)  # WRONG

# ALWAYS filter by tenant
memories = await memory_store.search(
    query,
    filter={"tenant_id": context.tenant_id}  # REQUIRED
)
```

## Memory Eviction Strategy

| Scope   | TTL                          | Budget per Tenant                            | Eviction Policy                    | Trigger                         |
| ------- | ---------------------------- | -------------------------------------------- | ---------------------------------- | ------------------------------- |
| Session | Conversation end + 1h        | No limit (short-lived)                       | Auto-expire via Redis TTL          | Conversation close event        |
| User    | 90 days since last access    | FREE: 500 entries, PRO: 5K, ENTERPRISE: 50K  | LRU within scope                   | Background job (daily, S21.6.9) |
| Tenant  | No TTL (explicit management) | FREE: 1K entries, PRO: 10K, ENTERPRISE: 100K | Admin-managed; alert at 80% budget | Metric alert (S9.7.1)           |
| Global  | No TTL                       | No per-tenant limit (system-wide)            | Admin-only pruning                 | Manual                          |

**Eviction rules:** When a scope exceeds its budget, the oldest entries (by `last_accessed_at`) are evicted first. Eviction runs as a background job per tenant (S21.6.9), not inline during writes. Approaching-budget alerts fire at 80% via the observability pipeline (S9.7.1). Enterprise tenants can request budget increases via support.

## Key Points

- Memory tiers form a strict hierarchy: Session → User → Tenant → Global
- Higher scopes can read lower scopes but writes are scope-restricted
- tenant_id filter is mandatory on every memory query — no exceptions
- Global memory is read-only for agents; only admins write to it

## Anti-Pattern

| Anti-Pattern                          | Problem                                        | Correct Approach                                     |
| ------------------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| Memory query without tenant_id filter | Cross-tenant data leakage                      | Always include tenant_id in filter                   |
| Agent writing to global memory        | Uncontrolled shared state                      | Global is admin-only, read-only for agents           |
| Session memory persisted indefinitely | Storage bloat, stale context                   | Session memory cleared when conversation ends        |
| Skipping scope validation on write    | User writes to tenant scope without permission | Check `can_write_tenant_memory` before tenant writes |

**2026 Cross-Reference:** For additional memory types (COMPILED_CONTEXT, CONTEXT_DECISION, ARTIFACT_REFERENCE, RUN_CONTRACT, PROCEDURE_STATE) and their consistency models, see S4.6.1 2026 Memory Types. For context compilation cache strategy, see S28.18 context-compiler-patterns.

See also: agent-runtime-patterns.md, context-compiler-patterns.md, multi-tenant-patterns.md
