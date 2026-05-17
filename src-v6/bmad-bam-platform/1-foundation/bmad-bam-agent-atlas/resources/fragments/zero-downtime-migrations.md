---
id: zero-downtime-migrations
title: Zero-Downtime Schema Migrations — Expand-Contract Across Tenancy Models
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [migrations, expand-contract, schema, multi-tenant, zero-downtime]
references:
  - "https://martinfowler.com/articles/evodb.html"
  - "Pramod Sadalage & Scott Ambler, Refactoring Databases (Addison-Wesley, 2006)"
  - "https://www.braintreepayments.com/blog/safe-operations-for-high-volume-postgresql/"
---

# Zero-Downtime Schema Migrations — Expand-Contract Across Tenancy Models

A **zero-downtime migration** changes the database schema without interrupting service or forcing tenants offline. The technique that makes this possible is **expand-contract**: split every schema change into two deploys, separated by enough time that all code consuming the schema has rolled forward. Without this discipline, schema changes become outage events — and in a multi-tenant SaaS, "an outage" means *every tenant simultaneously*. The cost is unrecoverable in any but the most regulated downtime windows.

This fragment is consumed by `design-deployment-topology` (skill) as the precondition for blue-green and canary rollouts on stateful systems, and by every storage-touching foundation skill as the *change-shape* it must respect.

---

## When to Use

Apply expand-contract migration discipline when:

- **The platform serves tenants 24/7.** Any product with a global tenant base has no scheduled-downtime window large enough for a stop-the-world migration. The migration must happen *under* live traffic.

- **You use blue-green or canary rollouts.** Both strategies require the schema to support *two code versions simultaneously* during the rollout window. That is the literal definition of expand-contract.

- **You run more than one application instance.** Even with rolling-update, instances run different code versions for minutes-to-hours. The schema must accommodate both during that window, or the older instances will fail.

- **Data volume makes locking impractical.** A 100GB table cannot afford `ALTER TABLE ... ADD COLUMN NOT NULL DEFAULT ...` if it acquires a table-lock. Expand-contract lets you migrate hot tables in a sequence of small, lock-free steps.

- **Tenants share a database (RLS or schema-per-tenant in one DB).** Cross-tenant schema changes cannot happen tenant-by-tenant; they must work for all tenants simultaneously. Expand-contract is the only safe pattern.

- **You need rollback safety.** A migration that has *only* been forward-applied makes code rollback impossible. Expand-contract keeps the old shape live long enough for rollback to remain feasible (see `[[rollback-strategies]]`).

---

## When NOT to Use

Skip expand-contract migration discipline when:

- **You have a documented maintenance window.** B2B platforms with a contractually scheduled weekly window can take a 30-minute outage to run a stop-the-world migration. Expand-contract is still cleaner, but the cost/benefit shifts.

- **The product is pre-launch with no users.** Pre-PMF, drop-and-recreate is faster than expand-contract. Switch to expand-contract before onboarding the first paying tenant.

- **The table is empty or near-empty.** A 100-row table can be migrated with a stop-the-world ALTER in milliseconds. Expand-contract for a tiny table is bureaucracy.

- **The migration is reversible by data-only operations.** If the change is purely additive (a new lookup table that nothing yet reads), there is no contract step to worry about. Standard migration suffices.

- **You use NoSQL with no enforced schema.** Schemaless stores have a different discipline: code-level schema versioning, not DDL-level expand-contract. The principles transfer (always read both shapes, write the new) but the mechanics are code-only.

---

## Architecture

### The expand-contract pattern (canonical form)

A schema change is decomposed into a sequence:

```
Phase 1 (Expand):
  - Add new column/table/index *additively*
  - Old code: ignores it (still works)
  - New code: writes to both old and new
  - Backfill: copy old → new for existing rows

Phase 2 (Migrate readers):
  - Deploy code that reads from new shape
  - Old code keeps writing to both
  - Verify new shape is authoritative

Phase 3 (Stop writing old):
  - Deploy code that writes only to new
  - Old column becomes dead weight, still readable

Phase 4 (Contract):
  - Drop the old column/table/index
  - Only safe after rollback window has elapsed
```

The **window between Phase 1 and Phase 4** is the *rollback-feasibility window*. During this window, the old code can be redeployed and the system will still function. Outside the window (after Phase 4), the change is irreversible without data restore.

Default windows by tier:

| Tier | Min expand-to-contract window |
|---|---|
| Free | 7 days |
| Pro | 14 days |
| Enterprise | 30 days |
| Dedicated | 90 days |

### Per-tenancy-model variations

The expand-contract *shape* depends on the tenancy model:

| Tenancy model | Migration shape | Coordination complexity |
|---|---|---|
| **RLS (single DB, shared schema)** | One migration, runs once, affects all tenants atomically (DDL is transactional in Postgres). | Lowest — but blast radius is *all tenants simultaneously*. |
| **Schema-per-tenant (single DB)** | Migration runs per-schema in a loop; can roll tenant-by-tenant. | Medium — script must be idempotent and resumable; coordinator tracks progress per tenant. |
| **Cell-based (multi-DB)** | Migration runs per-cell; cells can be migrated independently or in parallel. | Medium-high — cell-level orchestration; can pause between cells. |
| **Database-per-tenant** | Migration runs per-DB; massive fanout for large tenant counts. | High — operates at scale; failures per-DB must not block others. |

Cross-reference `[[rls-deep-dive]]`, `[[schema-per-tenant]]`, and `[[cell-based-architecture]]` for tenancy-model details.

### Diagram — expand-contract timeline

```
Time:    Day 0          Day 1          Day 7          Day 14         Day 21
         ──────         ──────         ──────         ──────         ──────
Code:    v1.0           v1.1           v1.1           v1.2           v1.2
                        (writes-both)  (writes-both)  (writes-new)   (writes-new)

DB DDL:  baseline   →   ADD COLUMN  →  (backfill)  →  (no change) →  DROP COLUMN
                        priority NULL                                 (legacy)

                        │              │              │              │
                        ▼              ▼              ▼              ▼
                    EXPAND          MIGRATE        STOP-OLD-      CONTRACT
                                    READERS        WRITES
                        │                                          │
                        ◄── rollback-feasibility window ───────────►
                                    (14+ days for pro tier)
```

### The forbidden moves

- **Single-deploy `RENAME COLUMN`** — old code references the old name, breaks instantly.
- **`ALTER COLUMN ... NOT NULL` without backfill** — fails for any row with NULL; rejects all writes.
- **`DROP COLUMN` same-deploy as code stops writing** — old instances still write to the dropped column, breaks until they rotate out.
- **In-place type narrowing (`VARCHAR(255) → VARCHAR(64)`)** — fails for any existing oversize value.
- **Combining expand and contract in one deploy** — explicitly forbidden by the CRITICAL check below.

Each of these has an expand-contract decomposition that is safe. The temptation to skip the decomposition because "this change is small" is the most common path to outage.

---

## Trade-offs

| Dimension | Pro (expand-contract) | Con (expand-contract) |
|---|---|---|
| **Zero downtime** | Guaranteed by construction. | Migration takes calendar-weeks, not minutes. Long-running projects accumulate WIP. |
| **Rollback safety** | Old code remains deployable for the window. | The window itself is overhead — a feature can't fully land until it does. |
| **Operator cognitive load** | Each deploy is small; failures are localized. | Multi-deploy sequencing requires a tracking system; orphaned migrations are a common mess. |
| **Schema evolution speed** | Continuous. | Per-change throughput is lower than batch-rebuild approaches. |
| **Database performance during migration** | Backfills can be throttled; reads/writes continue. | Backfilling petabyte tables takes weeks; planning required. |
| **Multi-tenant blast radius** | Per-tenant rollout (in schema-per-tenant/cell models) localizes damage. | RLS single-DB cannot localize — the migration affects every tenant simultaneously. |

---

## Implementation Patterns

### 1. Migration declaration

Every migration declares its phase, paired migration, and tenancy-model shape:

```yaml
# 20260512_add_priority_expand.yml
id: 20260512_add_priority_expand
phase: expand
pairs_with: 20260605_add_priority_contract  # deployed >= 14 days later
tenancy_model: rls
description: "Add priority column to orders; nullable"
ddl: |
  ALTER TABLE orders ADD COLUMN priority INT NULL;
backfill:
  required: true
  strategy: chunked-update
  chunk_size: 10000
  rate_limit_per_sec: 100
```

### 2. Backfill mechanics

Backfills update existing rows in batches:

```sql
-- pseudo-code, run in a loop
UPDATE orders
SET priority = COALESCE(priority, derive_priority(...))
WHERE id IN (
  SELECT id FROM orders
  WHERE priority IS NULL
  ORDER BY id
  LIMIT 10000
)
RETURNING id;
-- sleep to respect rate limit
```

Cross-reference `[[backfill-strategies]]` (forthcoming) for chunked / dual-write / event-sourced backfill patterns.

### 3. Per-tenancy-model orchestration

For RLS:

```python
def migrate_rls(migration):
    # one DDL, affects all tenants atomically
    db.execute(migration.ddl)
```

For schema-per-tenant:

```python
def migrate_schema_per_tenant(migration):
    for tenant_id, schema in iter_tenant_schemas():
        with checkpoint(tenant_id):  # resumable
            db.execute(migration.ddl.format(schema=schema))
```

For cell-based:

```python
def migrate_cells(migration):
    for cell in iter_cells():
        with cell_pause(cell):
            cell.execute(migration.ddl)
        wait_for_cell_health(cell)
```

### 4. Contract migration gating

The contract migration is blocked from running until:

1. The expand window has elapsed (per-tier minimum).
2. All deployed code is at or past the "writes new only" version.
3. No rollback is currently scheduled.

```yaml
contract:
  blocked_until: 2026-06-05T00:00:00Z
  required_code_version: ">=1.2.0"
  block_during: [active_rollout, scheduled_rollback]
```

### 5. Documenting the migration in the deploy pipeline

Each migration appears in the deploy pipeline's manifest, with its phase. The pipeline rejects:

- A contract migration whose expand has not elapsed the window.
- A code deploy that references a column the expand has not yet created.
- A contract that follows an unbackfilled expand.

---

## Quality Checks

- **CRITICAL:** every schema change has both an **expand** AND a **contract** migration; they are **never combined in a single deploy**. The expand-only-then-contract sequence creates the rollback-feasibility window that makes zero-downtime deploys safe; combining them in one deploy eliminates that window and turns a schema change into a stop-the-world event. The CI/migration system must reject any single migration that combines additive and destructive operations (e.g., a migration that both adds and drops columns, or both creates and drops tables). Even a "small" change must follow the discipline — the most damaging outages come from "small" changes that bypassed it.

- **Contract migrations are gated by elapsed time AND code-version.** Time alone is insufficient (deploys may have been paused); code-version alone is insufficient (the rollback window must elapse). Both gates must pass.

- **Backfills are throttled.** An unthrottled backfill can saturate replication, exhaust IOPS, or trigger cascading failures. Default rate-limit at design time; raise only with evidence.

- **Backfills are idempotent and resumable.** A backfill killed at 50% must resume from where it stopped, not from zero. Idempotency is enforced via WHERE clauses keyed to the row's not-yet-migrated state.

- **Per-tenancy-model orchestration is testable.** Schema-per-tenant migrations must succeed for every tenant; one failure cannot block the rest. Failures are surfaced for follow-up, not silently retried forever.

- **Migration manifests are versioned.** A migration is not a one-shot script; it is a versioned artifact reviewed like code, with a paired contract reference.

- **Rollback safety is declared per migration.** Each migration declares `rollback_compatible: true|false`. False signals to the deploy pipeline that this migration narrows the rollback window.

- **NoSQL stores have the equivalent discipline.** Read-both-shapes / write-new is the schemaless analog. Don't claim "we don't have schemas" as a reason to skip the discipline — the same hazards exist at the code level.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh migration practice:

- `zero downtime database migration expand contract {date}` — finds the canonical refactoring-databases write-ups.
- `postgresql online migration safe DDL {date}` — Postgres-specific safe-DDL guides (Braintree, GitLab, Strong Migrations gem).
- `multi-tenant schema migration coordination {date}` — practitioner reports on schema-per-tenant orchestration.
- `backfill strategy chunked rate limit {date}` — backfill mechanics for large tables.
- `feature flag schema-driven rollout {date}` — coordinating code rollout with migration state.
- `migration framework gh-ost percona online schema change {date}` — non-Postgres alternatives (MySQL).

Treat content older than 36 months as orientation; migration tooling evolves more slowly than rollout tooling.

---

## Cross-references

**Companion fragments (Task 9):**

- [[rollout-strategies-comparison]] — blue-green and canary depend on this discipline.
- [[rollback-strategies]] — rollback feasibility window is created by expand-contract.
- [[tenant-cohort-design]] — schema-per-tenant migrations align with cohort progression.

**Atlas existing fragments:**

- [[rls-deep-dive]] — RLS-model migration shape.
- [[schema-per-tenant]] — per-schema migration orchestration.
- [[cell-based-architecture]] — per-cell migration orchestration.
- [[tenancy-decision-framework]] — tenancy model selection includes migration-cost factor.
- [[evolutionary-architecture]] — schema evolution is a fitness function.

**Anti-patterns:**

- [[combined-expand-contract]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[unbackfilled-not-null]] (forthcoming) — adding NOT NULL without backfill.
- [[in-place-rename]] (forthcoming) — single-deploy column rename.

**Forthcoming companion fragments:**

- [[backfill-strategies]] — chunked / dual-write / event-sourced backfill patterns.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without an expand-contract migration policy fails QG-F1 for stateful systems.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (rollback windows per tier), §6.3 (fragment schema).
- Sadalage & Ambler, *Refactoring Databases* (2006).

**Downstream consumers:**

- `design-deployment-topology` skill (P3.1) — primary consumer.
- All storage-touching skills inherit migration semantics from this fragment.
