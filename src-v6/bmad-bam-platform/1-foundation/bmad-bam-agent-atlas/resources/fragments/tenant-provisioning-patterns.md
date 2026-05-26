---
id: tenant-provisioning-patterns
title: Tenant Provisioning Patterns
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [provisioning, onboarding, saga, idempotency, multi-tenant]
references:
  - "https://microservices.io/patterns/data/saga.html"
  - "https://microservices.io/patterns/data/transactional-outbox.html"
  - "AWS SaaS Builder Toolkit — Tenant Provisioning Workflows"
---

# Tenant Provisioning Patterns

The moment a new tenant signs up is the riskiest moment in a multi-tenant SaaS's runtime. The system must allocate persistent storage (a row, a schema, a cell), apply isolation enforcement (an RLS policy, a network rule, a routing entry), publish identity to downstream consumers (billing, AI runtime, observability), and respond to the caller — all in seconds, all under partial-failure conditions, and all without leaking state across tenants if anything goes wrong halfway through.

Tenant provisioning is *not* a single atomic operation; it is a small distributed transaction with multiple modules involved, each capable of failing independently. The patterns in this fragment are the design vocabulary for that transaction: how to compose it (saga vs choreography), how to make it retry-safe (idempotency keys), how to recover from partial failure (compensations), and how to hand off identity to downstream modules (outbox).

This fragment is consumed by `bmad-bam-design-tenant-onboarding` (step-04 builds `provisioning_hooks[]` from these patterns) and by `bmad-bam-design-tenant-migration-tooling` (re-provisioning a tenant in a target region uses the same primitives).

---

## When to Use

Apply these patterns when:

- **Onboarding writes to two or more durable systems.** A tenant row in Postgres + a Stripe customer + a search index entry + an analytics warehouse row is already 4 systems; without coordination, one failing leaves a phantom tenant in the others.

- **Provisioning has retry semantics.** Webhooks retry. Background jobs retry. CLI commands get re-run. Without idempotency keys, retry produces duplicate state (two Stripe customers, two rows in `tenants`) that is much harder to clean up than a clean failure.

- **Compliance requires a complete, auditable trail of who-was-provisioned-when.** Each provisioning hook should emit an event with the tenant_id, the hook_id, the outcome, and the timestamp. This audit log is the evidence that "tenant X was activated on date Y after isolation verification passed".

- **The provisioning chain crosses persona boundaries.** Atlas owns the schema/cell allocation; Nova owns AI memory bootstrap; Kai owns external integration (Stripe, SAML provider, CRM). A clean handoff pattern is needed to prevent each persona's module from being tightly coupled to the others.

- **Partial-failure recovery is mandatory.** If step 3 of 5 fails, the system must be able to roll back steps 1-2 (compensations) or retry-forward step 3 to convergence. Either approach is fine; *no* approach is not.

- **Provisioning latency matters for conversion.** A 30-second signup loses conversions; a 2-second signup keeps them. Async provisioning (sub-second response + background fanout) is the conversion-friendly pattern.

## When NOT to Use

Skip these patterns when:

- **The product is single-tenant.** No tenant provisioning; just user provisioning, which is a simpler problem.

- **Tenants are transient (e.g., demo sandboxes).** A 60-minute demo tenant that auto-destroys does not need a saga; a single transaction (or even a no-op) suffices. Treat with `live_traffic: false` in `onboarding-flow.json` and skip the heavy machinery.

- **The platform has < 100 lifetime tenants and growth is bounded.** A boutique SaaS with 30 enterprise customers can hand-provision and accept the manual work — see anti-pattern `manual-onboarding-bottleneck.md` for the line where this stops being acceptable.

- **All provisioning state lives in a single transactional database with no external systems.** A single-DB tenant insert with constraints is its own atomic provisioning; no saga needed. Add the saga the moment a second system (billing, search, AI) gets coupled.

---

## Architecture

### Two composition shapes: orchestrated saga vs choreographed events

A **saga** is a sequence of local transactions, each with a compensating action, coordinated by an orchestrator that knows the full sequence. The orchestrator is the spine; if step N fails, the orchestrator runs compensations for steps N-1, N-2, ... back to clean state.

A **choreography** is a peer-to-peer event chain. Module A emits `TenantCreated`; module B listens, does its work, emits `BillingCustomerCreated`; module C listens, etc. No orchestrator; each module is responsible for its own recovery.

| Property | Saga (orchestrated) | Choreography (event-driven) |
|---|---|---|
| Visibility | Full chain visible in one place (orchestrator) | Distributed; trace via correlation_id |
| Coupling | Tight to orchestrator's schema | Loose; modules know events, not each other |
| Compensation logic | Centralized; easy to reason about | Distributed; each module owns its rollback |
| Failure modes | Orchestrator outage = stalled provisioning | No single point of failure |
| Suitable for | < 10 modules in chain; complex business rules | > 10 modules; simple per-module rules |

**Atlas recommendation:** Start with a saga (e.g., Temporal, Step Functions, Camunda) when the chain has 3-8 modules. Move to choreography when the chain exceeds 8-10 modules *and* the modules need to evolve independently. A pure choreography is harder to audit but more resilient at scale.

### Provisioning hook contract (YAML schema)

A `provisioning_hook` is a unit of work in the saga:

```yaml
provisioning_hook:
  id: db_create_row                       # globally unique across all flows
  module: persistence                     # lowercase pattern; matches outbox topic prefix
  blocking: true                          # true → main flow waits; false → background fanout
  idempotency_key_source: tenant_id       # what makes the key unique
  retry:
    strategy: exponential                 # exponential | fixed | none
    max_attempts: 5
    base_delay_ms: 100
  timeout_ms: 5000
  compensation:
    action: db_delete_row                 # name of compensating hook
    requires_human: false                 # if true → escalate; do not auto-compensate
  emits_event: TenantPersistenceCreated   # downstream event topic
```

### Idempotency-key strategy

An **idempotency key** is a deterministic identifier that lets a hook recognize "I already did this work" on retry and short-circuit to the prior result. For tenant provisioning, the natural key is `tenant_id` (or `tenant_id + hook_id` for hooks that may run multiple times per tenant in different contexts).

Three storage strategies:

1. **In-row marker.** Store a `provisioning_completed_at` column on the tenant row; the hook checks it before acting. Cheap; only works when the hook owns a single table.

2. **Dedicated idempotency table.** A `provisioning_idempotency` table with `(tenant_id, hook_id, completed_at, result_payload)`. The hook upserts on entry; on retry, the existing row short-circuits. Robust; recommended for multi-table hooks.

3. **External key store (Redis).** A TTL'd key per `(tenant_id, hook_id)`. Useful when the hook spans systems that cannot share a database. Be careful about TTL — a key that expires before the work commits creates duplicate writes.

### Outbox pattern for downstream handoff

The **transactional outbox** is the pattern for emitting an event reliably from a service that also wrote to a database. The service writes both the business row *and* the outbox row in the same transaction; a separate poller reads the outbox and publishes to a message bus. This guarantees "if the row is persisted, the event will be published" — exactly what tenant provisioning needs to hand off to Nova/Kai modules.

```
TX:
  INSERT INTO tenants (id, tier, ...) VALUES (...);
  INSERT INTO outbox (event_type, payload, created_at) VALUES ('TenantCreated', ...);
COMMIT;

(separate process)
  SELECT * FROM outbox WHERE published_at IS NULL ORDER BY created_at;
  publish to bus;
  UPDATE outbox SET published_at = now() WHERE id = ...;
```

### ASCII diagram — saga shape

```
  caller
    │
    ▼
  ┌─────────────────────────────────┐
  │   onboarding-orchestrator       │
  │   (Temporal / Step Functions)   │
  └───┬───────────┬──────────┬──────┘
      │           │          │
      ▼           ▼          ▼
  db_create   apply_rls   isolation_verify   ← blocking; in flow
      │           │          │
      └─────┬─────┴─────┬────┘
            ▼           ▼
       outbox      (fail → compensate db_create)
            │
            ▼
   (poller publishes events)
            │
   ┌────────┼────────────┐
   ▼        ▼            ▼
  Nova    Kai-Stripe   Kai-CRM   ← async; non-blocking fanout
 (memory) (billing)   (alerts)
```

---

## Trade-offs

| Axis | Synchronous chain | Asynchronous chain | Transactional saga | Eventually-consistent choreography |
|---|---|---|---|---|
| Latency | High (sum of all hooks) | Low (only blocking subset) | Bounded by orchestrator step latency | Low first-response; eventual completion |
| Failure isolation | Poor; one failure stops all | Good; failure isolated to its hook | Good; compensation cleans up | Excellent; each module recovers independently |
| Caller experience | "Hangs then either works or doesn't" | "Fast response + email later if anything failed" | Same as sync, with structured rollback | Same as async, with no central recovery point |
| Operational complexity | Lowest | Medium | High (orchestrator infra) | High (event topology + dead-letter handling) |
| Audit clarity | Trivial | Medium (must correlate hook results) | Excellent (orchestrator's history is the audit log) | Hard (distributed correlation_id required) |
| Suitable scale | < 5 hooks total | 5-15 hooks; 2-3 must be blocking | 5-15 hooks; complex business rules | 15+ hooks; independent module teams |

### Blocking vs non-blocking decision rule

A hook is **blocking** if its failure means the tenant MUST NOT be enabled. The mandatory blocking hooks for any live-traffic flow are:

- `db_create_row` (or `schema_create` or `cell_allocate`) — without persistent storage there is no tenant
- `apply_rls_policy` (or equivalent isolation enforcement) — without isolation, cross-tenant leakage is guaranteed
- `isolation_verification_step` — without verification, the isolation enforcement is unproven

Hooks that can be non-blocking (best-effort, deferred):

- Billing customer creation (Kai's domain) — tenant can exist without billing for free tier; billing can be created on first paid upgrade
- AI memory bootstrap (Nova's domain) — tenant can exist without an AI agent; agent provisioned on first AI-feature use
- CRM/notification fanout — purely operational; failure here doesn't compromise the tenant

The rule of thumb: **blocking iff the tenant is unsafe to enable without this hook completing**. Everything else is async fanout via outbox.

---

## Implementation Patterns

### Pattern 1 — RLS row-create + policy

```
hook_1: db_create_row
  TX:
    INSERT INTO tenants (id, tier, created_at) VALUES ($1, $2, now())
    ON CONFLICT (id) DO NOTHING;   -- idempotent
    INSERT INTO outbox (event, payload) VALUES ('TenantCreated', ...);
  COMMIT;

hook_2: apply_rls_policy
  -- usually a no-op if policies are table-level; only required when
  -- policies are per-tenant (e.g., FORCE ROW LEVEL SECURITY scenarios).
  ALTER TABLE x ENABLE ROW LEVEL SECURITY;  -- if not already
  -- (the WHERE clause in the policy uses current_setting('app.tenant_id'))
```

The idempotency story is the `ON CONFLICT DO NOTHING`. On retry, the second insert is a no-op; the outbox is also `ON CONFLICT DO NOTHING` keyed on `(event_type, idempotency_key)`.

### Pattern 2 — Schema-per-tenant create + migrate

```
hook_1: schema_create
  CREATE SCHEMA IF NOT EXISTS tenant_$1;   -- idempotent
  INSERT INTO tenant_schemas (tenant_id, schema_name) VALUES ($1, 'tenant_$1');

hook_2: migrations_apply_per_schema
  -- run the migration tool (e.g., Flyway, Alembic) targeting tenant_$1
  -- migration tool must be re-runnable (Flyway baselines; Alembic stamp + upgrade)
  -- compensation on failure: DROP SCHEMA tenant_$1 CASCADE; DELETE FROM tenant_schemas
```

### Pattern 3 — Cell allocation + DNS + cert

```
hook_1: cell_allocate
  -- pick a cell with capacity headroom; mark allocation in cell registry
  -- idempotency key: tenant_id (a tenant maps to exactly one cell)
hook_2: dns_assign
  -- create a CNAME tenant.example.com → cell-A.internal
  -- DNS provider's API is generally idempotent (PUT semantics)
hook_3: cert_issue
  -- request ACME cert for tenant.example.com
  -- cert provisioning may take seconds-minutes; this hook should be background
  -- with a "cert ready" event that gates traffic-routing
hook_4: intra_cell_network_policy
  -- apply k8s NetworkPolicy or VPC routing to deny intra-cell cross-tenant
```

### Pattern 4 — Idempotency table in detail

```sql
CREATE TABLE provisioning_idempotency (
  tenant_id text NOT NULL,
  hook_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  result_payload jsonb,
  PRIMARY KEY (tenant_id, hook_id)
);

-- on hook entry:
INSERT INTO provisioning_idempotency (tenant_id, hook_id, result_payload)
VALUES ($1, $2, $3)
ON CONFLICT (tenant_id, hook_id) DO NOTHING
RETURNING completed_at;

-- if RETURNING is empty → row already existed → short-circuit
-- if RETURNING has a row → first run → do the work, then UPDATE result_payload
```

### Pattern 5 — Outbox poller (skeleton)

```python
# pseudo-code; pin a real implementation to a stable poller library
def poll_outbox():
    while True:
        rows = db.query("""
            SELECT id, event_type, payload FROM outbox
            WHERE published_at IS NULL
            ORDER BY created_at
            LIMIT 100
            FOR UPDATE SKIP LOCKED
        """)
        for r in rows:
            try:
                bus.publish(r.event_type, r.payload)
                db.execute("UPDATE outbox SET published_at = now() WHERE id = $1", r.id)
            except PublishError:
                # leave row unpublished; retry next poll cycle
                pass
        sleep(0.5)
```

`FOR UPDATE SKIP LOCKED` is what lets multiple pollers run safely in parallel; without it, a slow poller blocks others.

---

## Quality Checks

- **Every hook has a documented idempotency-key strategy.** No hook is allowed to be "we'll see if the retry works". The strategy is either in-row marker, idempotency table, or external key — and it is named in the hook's spec.

- **Every blocking hook has a documented compensation.** If a downstream hook fails, the orchestrator must be able to unwind. "Compensation: human intervenes via runbook" is acceptable but must be explicit.

- **Provisioning replay produces the same end state.** A test runs the full saga twice (or runs it once, kills the orchestrator mid-flight, restarts it) and asserts that the database state after the second run equals the state after the first run.

- **Outbox poller is monitored.** Lag in the outbox table is a paging alert. A poller that stops polling silently is the way provisioning events go undelivered and the system drifts out of consistency.

- **Partial-failure recovery is tested in CI.** Inject a failure at hook N for each N; assert that compensations or retry-forward produce a clean tenant or clean roll-back.

- **CRITICAL:** Provisioning MUST be idempotent; repeated calls produce same state without duplicating side-effects.

---

## Web Research Queries

(Use `{date}` to scope to current best practice; replace with the current year at query time.)

- `multi-tenant SaaS provisioning saga {date}`
- `outbox pattern tenant provisioning {date}`
- `idempotent tenant onboarding patterns {date}`
- `partial-failure recovery multi-tenant {date}`
- `Temporal vs Step Functions tenant provisioning {date}`

---

## Cross-references

- Fragment: `tenant-cohort-design.md` — cohort assignment is one of the downstream consumers of `TenantCreated`
- Fragment: `first-touch-isolation-verification.md` — the blocking verification hook; consumed by step-04 of the onboarding skill
- Fragment: `anti-corruption-layer.md` — recommended pattern for the Kai-side downstream consumers (Stripe, CRM, SAML)
- Anti-pattern: `manual-onboarding-bottleneck.md` — what happens if you skip the patterns in this fragment
- Glossary: `isolation-verification-step` — the mandatory blocking hook in any live_traffic flow
- Gate: `QG-M2` (refined v1.1.0) — `onboarding-flow.json` provides C6 + H2 + H5 evidence sourced from these patterns
- Skill: `bmad-bam-design-tenant-onboarding` — primary consumer; step-04 builds `provisioning_hooks[]` from this fragment's catalog
