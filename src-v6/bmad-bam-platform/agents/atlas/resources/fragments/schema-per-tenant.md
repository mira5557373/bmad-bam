---
id: schema-per-tenant
title: Schema-Per-Tenant Isolation — Deep Dive
category: tenant-isolation
kind: fragment
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://www.pgbouncer.org/config.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/silo-isolation.html"
tested-against: []
---

# Schema-Per-Tenant Isolation — Deep Dive

A structural deep-dive on **schema-per-tenant** as the isolation mechanism for a multi-tenant Postgres deployment. Each tenant occupies its own schema (`tenant_001`, `tenant_002`, …) inside a single physical database. Cluster, OS process, and buffer cache are shared; namespace and grants are not. This fragment is consumed by `design-tenancy-model` (and any skill producing or reviewing a schema-per-tenant design) after the [[tenancy-decision-framework]] has selected schema-per-tenant — or is considering it — as the recommended option.

Schema-per-tenant sits in the *middle* of the tenancy cost/isolation curve. It is the strongest logical isolation Postgres offers short of a dedicated database, and the auditor story is materially better than pooled RLS. It is also the model with the steepest **per-tenant ops slope** — every operational primitive (migration, backup, capacity, observability) acquires an `× N tenants` multiplier. Read this fragment before you commit to schema lifecycle automation in anger.

---

## When to Use

Schema-per-tenant is the correct mechanism when **most** of the following hold. Mixed-mode situations should fall back to the [[tenancy-decision-framework]] for a hybrid recommendation rather than pushing schema-per-tenant past its envelope.

- **Active tenant count in the 100–500 band, with line of sight to ≤ ~1,500.** Below ~100 tenants, schema-per-tenant ops overhead is over-engineered — pooled [[rls-deep-dive|RLS]] gives the same isolation properties at a fraction of the runbook surface. Above ~1,500 schemas in a single cluster, `pg_namespace` lookups, schema-enumeration cost in tooling (`pg_dump`, ORMs, migration runners), and ALTER-fanout time degrade meaningfully. Treat 100/1500 as the *yellow lines* of the band; the comfortable interior is 200–800 schemas per cluster on modern hardware.

- **Regulated workload where per-tenant audit boundaries map cleanly to controls.** SOC2 (CC6.1, CC6.6, CC6.7) accepts schema-per-tenant with low auditor friction — the schema is a visible, enumerable boundary, and per-schema GRANTs prove "least privilege" with a `psql \dn+` screenshot. HIPAA is well-served; the schema boundary maps to the BAA-scoped data set without a policy-coverage argument. ISO 27001 Annex A.9 (access control) and Annex A.18 (compliance) similarly map cleanly. PCI-DSS 4.0 cardholder-data-environment scoping becomes a conversation about *which schemas* are in scope, which auditors find easier than "which rows in this shared table". For these frameworks the *auditor experience* alone often justifies the ops overhead.

- **Per-tenant data volume is large enough that pooled RLS pollutes shared resources.** When P90 tenant data exceeds ~10 GB, pooled RLS suffers from buffer-cache cross-pollution: one tenant's working set evicts another's hot pages, p99 latency degrades non-deterministically, and per-tenant capacity planning becomes impossible. Schema-per-tenant does not *solve* the shared-buffer problem (the buffer cache is still shared), but it makes per-tenant resource attribution mechanically trivial — every page in `tenant_037.*` is tenant 037's, full stop.

- **Customer contracts demand "logical isolation" language that pooled RLS makes uncomfortable.** Some enterprise contracts use phrases like "tenant data shall be logically segregated from other tenants' data in a manner reviewable by the customer". Schema-per-tenant satisfies the spirit and the letter — a customer auditor can be shown their schema's grants and access list. Pooled RLS satisfies the spirit, but the auditor conversation is harder.

- **Per-tenant operational features are part of the product.** Per-tenant point-in-time restore ("restore my data to last Tuesday"), per-tenant data export (GDPR Article 20 portability), per-tenant capacity tiers (give the enterprise tenant a bigger `work_mem`), per-tenant disable/freeze for billing disputes. All of these are mechanically straightforward on a schema; on pooled RLS they are bespoke engineering each time.

- **Ops team size ≥ 3 FTE with intermediate-or-better Postgres expertise.** Schema-per-tenant requires that *someone* owns the migration runner, the backup orchestrator, the schema lifecycle automation, and the connection-pool topology. A 2-person team can run RLS; running schema-per-tenant on 2 FTE means runbooks rot and migrations skip schemas silently. If headcount is binding, prefer pooled RLS until the team grows.

- **Connection multiplexer in front of Postgres.** PgBouncer, Supavisor, PgCat, or Aurora-grade equivalent. Without a pooler, schema-per-tenant exhausts `max_connections` within the first few hundred tenants. With a misconfigured pooler (session pooling, no per-schema affinity), connections fragment across application instances. The pooler is **not optional** for production schema-per-tenant — see [[#operational-patterns]].

- **Schema-uniform workload.** Every tenant gets the same tables, same columns, same indexes — variation is in *data*, not in *shape*. If product requirements introduce per-tenant column-level customization (one tenant gets an extra `risk_score` column), schema-per-tenant accommodates it but at a cost: migrations branch, and the "one ALTER fans out N times" story fragments. Plan deliberately.

---

## When NOT to Use

Schema-per-tenant is the wrong mechanism when any of these conditions are present. Each fires before any cost optimization — they are structural, not preference.

- **Tenant count exceeds ~1,500 active schemas in a single cluster, with no plan to shard.** `pg_namespace` and `pg_class` scans become measurable. `\dn` in psql takes seconds. ORM schema-reflection startup time grows. Migration fanout time exceeds the deploy window. Pick cell-based — each cell can host 200–800 schemas, and the routing layer absorbs the count.

- **Sub-100 ms ALTER required on tenant-scoped hot tables.** A schema-per-tenant `ALTER TABLE invoices ADD COLUMN ...` against 1,000 schemas takes 1,000× the time of a single ALTER. Even with parallelism, you are 30+ minutes into the operation on a workload that the product requires to happen in under a minute. RLS performs this ALTER once; cell-based amortizes it across cells. Pick a different model.

- **Ops team size < 2 FTE owning production.** Schema-per-tenant's runbook surface (per-tenant migration, per-tenant backup, per-tenant restore drill, schema lifecycle automation, pool sizing review) cannot be sustained on a single operator. Pick pooled RLS and accept the audit-story trade-off, or hire before committing.

- **No connection pooler available.** Direct application-to-Postgres connections do not scale past ~500 tenants × ~5 app instances even at 10 connections each — `max_connections` saturates, and Postgres' per-backend memory overhead (10–15 MB per backend) becomes the binding cost. Without a pooler, schema-per-tenant is a load-test failure waiting to happen.

- **Frequent schema-shape variation between tenants.** Per-tenant custom columns, per-tenant custom indexes for one customer's analytics, per-tenant feature flags at the *schema* level. Schema-per-tenant handles a small amount of variation but degrades into "every schema is a one-off" territory beyond ~5% variance. Pick a different model or push variation into JSONB columns inside a uniform schema.

- **Compliance scope is FedRAMP-High, IL4, IL5, or CJIS.** These frameworks require *physical* separation — separate databases, separate networks, separate accounts. A shared cluster with separate schemas does not satisfy the control. Pick cell-based; do not argue with the auditor.

- **Tenant churn is very high (>10% monthly).** Onboarding and offboarding schemas at high cadence stress the lifecycle automation. Backup retention policies for offboarded tenants become entangled with active-tenant backups. Schema drop is irreversible from the live cluster's perspective; mistakes are expensive. High-churn workloads (free-trial-heavy SaaS) are usually better served by RLS where tenant lifecycle is `DELETE FROM ... WHERE tenant_id = ?` plus a soft-delete window.

---

## How Schema-Per-Tenant Works

Schema-per-tenant uses Postgres' **schema namespace** as the tenant boundary. Each tenant's tables live under their own schema; application queries select the active tenant's schema via `search_path` at request boundaries. The cluster, the buffer cache, the WAL, and the connection pool are shared.

```sql
-- 1. Create the tenant schema. Typical naming: tenant_<short-id>, never raw user input.
CREATE SCHEMA tenant_001 AUTHORIZATION migration_user;

-- 2. Create tenant-scoped tables under the schema.
CREATE TABLE tenant_001.invoices (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    amount_cents  bigint NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX invoices_created_at_idx ON tenant_001.invoices (created_at);

-- 3. Grant least-privilege access to the application role.
GRANT USAGE   ON SCHEMA tenant_001                 TO application_user;
GRANT SELECT, INSERT, UPDATE, DELETE
              ON ALL TABLES IN SCHEMA tenant_001   TO application_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant_001
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO application_user;

-- 4. At the start of every request transaction, bind the tenant via search_path.
BEGIN;
SET LOCAL search_path = tenant_001, public;
-- ... application queries proceed against tenant_001's tables, with `public` as fallback
-- for shared lookup tables (countries, currencies, etc.).
COMMIT;
```

A few load-bearing details easy to miss:

- **`SET LOCAL` is mandatory.** Plain `SET search_path` lasts for the connection's lifetime. In a transaction-pooled topology, the next request to acquire the connection inherits the binding — the next tenant's request runs against the previous tenant's schema. Always `SET LOCAL`; verify the pooler mode (see [[#operational-patterns]]).

- **`search_path = tenant_001, public`** — the trailing `public` is the shared-schema fallback for cross-tenant lookup data (reference tables, enums). Order matters: if a `lookups` table exists both in `tenant_001` and `public`, the tenant copy wins. Document the shared-vs-tenant split; surprises here become cross-tenant correctness bugs.

- **Schema names are not free identifiers.** Never construct schema names from user input. The reserved character set, the 63-byte identifier limit, and `pg_namespace` indexing all assume controlled inputs. Use a server-generated short id; map customer-facing tenant labels separately.

- **`AUTHORIZATION migration_user`** binds the schema's owner to the migration role, *not* the application role. The application role gets `USAGE` and table-level grants only. This separation matters when paired with `REVOKE CREATE ON SCHEMA tenant_001 FROM application_user;` — the application cannot create new objects, which closes one class of SQL-injection escalation.

- **`ALTER DEFAULT PRIVILEGES`** ensures that *future* tables created in the schema (by the migration runner) automatically grant access to the application role. Without it, every new migration must `GRANT ... ON <new table>` explicitly — the kind of step that gets forgotten and produces "tenant 037 can't see the new audit_log table" tickets.

### PgBouncer transaction-pool config

```ini
; /etc/pgbouncer/pgbouncer.ini
[databases]
app = host=postgres-primary.internal dbname=app pool_mode=transaction

[pgbouncer]
listen_port            = 6432
listen_addr            = 0.0.0.0
auth_type              = scram-sha-256
auth_file              = /etc/pgbouncer/userlist.txt

pool_mode              = transaction
max_client_conn        = 4000
default_pool_size      = 25
reserve_pool_size      = 5
reserve_pool_timeout   = 3
server_lifetime        = 3600
server_idle_timeout    = 600

; Force clean tenant context at server release. Critical: without this,
; `SET LOCAL` covers `search_path` but stray plain `SET` or session GUCs leak.
server_reset_query     = DISCARD ALL
server_reset_query_always = 1

; Helpful but not load-bearing: per-tenant application_name for pg_stat_activity.
application_name_add_host = 1
```

`server_reset_query = DISCARD ALL` is the belt-and-suspenders defense against accidental cross-tenant context leakage at server-release time. It costs ~50 µs per release and removes a category of "why is tenant_005's request seeing tenant_004's data on Tuesdays" bugs.

### Per-tenant migration runner pseudocode

```python
# Run a SQL migration against every tenant schema, with isolation per schema.
# Idempotency and rollback are non-negotiable: a missed schema is a silent
# partial rollout (see CRITICAL in Quality Checks).

def run_migration(migration_id: str, sql_path: pathlib.Path) -> Report:
    tenants = list_active_tenants()                # source of truth: tenants table
    report  = Report(migration_id=migration_id)

    for tenant in tenants:
        with pg.connect(role="migration_user") as conn:
            try:
                with conn.transaction():            # implicit BEGIN / COMMIT
                    conn.execute(f"SET LOCAL search_path = {tenant.schema}, public")
                    if already_applied(conn, migration_id):
                        report.skipped.append(tenant); continue
                    conn.execute(sql_path.read_text())
                    record_applied(conn, migration_id)
                report.succeeded.append(tenant)
            except Exception as exc:                # per-schema rollback is automatic
                report.failed.append((tenant, exc))
                if report.fail_fast:
                    raise

    assert_total(report, expected=len(tenants))     # missed schema → loud failure
    return report
```

The runner's contract: **every** active tenant either succeeds, is skipped (idempotently — migration already applied), or fails loud. The post-run assertion that `succeeded + skipped + failed == total active tenants` is the load-bearing check; without it, missed tenants are silent.

---

## Failure Modes

The four production-fire modes below account for essentially every schema-per-tenant outage and silent-inconsistency event surfaced in incident reviews through 2025. None is exotic; all are operational.

### schema-migration-explosion

**Mechanism:** an `ALTER TABLE` that runs in milliseconds against one schema runs N times against N schemas. At 1,000 schemas with a hot table, a column addition that takes 50 ms locally takes 50 seconds of wall-clock with serial execution, or significantly longer if any single tenant's table has enough rows to need a non-trivial rewrite. CI/CD pipelines tuned to a "migrations finish in 2 minutes" budget break at N=200; deploy gates start timing out; ops engineers start running migrations by hand at 2 AM.

**Concrete example:**

```sql
-- Local dev: 80 ms.
ALTER TABLE invoices ADD COLUMN risk_score numeric(5,4);

-- Production: same DDL, 1,200 schemas, serial runner: 96 seconds.
-- One tenant has 30M rows in invoices; that schema's ALTER triggers a table
-- rewrite (because the default value is non-null on PG < 11, or just because
-- the planner decides to). That single schema's ALTER takes 4 minutes.
-- Total wall-clock: 5 min 36 sec. Deploy budget was 90 sec. Deploy is aborted
-- mid-migration. Half the schemas have the column; half don't.
-- Application crashes on every request hitting an un-migrated schema.
```

**Mitigations:**

- **Parallelize the runner** across schemas, bounded by a worker pool size matched to `max_connections / 4`. Each worker holds one connection, runs one schema's migration, returns. 1,200 schemas at 8 workers and 50 ms/schema is ~7.5 sec, not 60.
- **Make migrations table-rewrite-free.** Use `ALTER TABLE ... ADD COLUMN <name> <type> NULL` (no default), then a separate backfill, then a `NOT NULL` constraint in a second deploy. Postgres 11+ supports non-null defaults without rewrite for non-volatile defaults; verify per Postgres major version.
- **Run migrations *before* the application deploy that needs them**, not as part of the same deploy. Decouple migration time from deploy time; deploy gate waits for "migration runner reports all schemas succeeded", not for the runner's wall-clock.
- **Resumability.** Migration runner records per-schema completion; rerunning the migration after a failure picks up only failed/missed schemas. Without resumability, a 1,200-schema run that fails at schema 800 leaves the operator manually identifying which 400 schemas need re-application.
- **Per-schema timeout + circuit break.** A single tenant's pathological ALTER (table rewrite, index rebuild) should not stall the whole fleet. Time-box each schema's migration; route timeouts to a separate `large-tenant` queue for serial, off-hours handling.

### connection-pool-exhaustion

**Mechanism:** schema-per-tenant multiplies the effective working set of the connection pool. Each application instance with M worker threads × N active tenants in flight × per-tenant `search_path` binding fragments the pool — connections cannot be cleanly multiplexed across tenants without `server_reset_query`, and even with it the pool sizing math changes. Without PgBouncer, Postgres' `max_connections` saturates at a few hundred tenants. With default-config PgBouncer (`pool_mode = session`), each in-flight tenant pins a server connection, and the pool fragments by tenant. Symptoms: "connection pool timeout" errors during traffic spikes; tail-latency spikes that correlate with active-tenant count, not with QPS.

**Concrete example:** 800 tenants, 12 app instances, 20 worker threads each. Without PgBouncer, peak concurrent transactions = 240, but each must open a fresh Postgres backend → `max_connections = 200` is breached, 40 requests/sec fail with "too many connections". With PgBouncer in session mode at `default_pool_size = 50`, the pool reserves 50 backends per app pair — the pool itself is fine, but `SET search_path` lingers and the next acquirer of the connection sees the previous tenant's schema first, then the new one's after their own `SET`. Subtle: this is *not* a cross-tenant leak (the new tenant's `SET` overrides), but it confuses every `pg_stat_activity` query trying to attribute load to tenants.

**Mitigations:**

- **PgBouncer (or equivalent) in `transaction` mode**, with `server_reset_query = DISCARD ALL` and `server_reset_query_always = 1`. This is the production default; do not skip.
- **Pool sizing math.** Sustained QPS × P99 transaction duration = required concurrent transactions. Provision `default_pool_size` to that number plus a 30% headroom. Add `reserve_pool_size` for spike absorption. Document the math in the platform runbook; review quarterly.
- **Per-tenant `application_name` for observability.** `SET LOCAL application_name = 'tenant_001'` after `SET LOCAL search_path = tenant_001, public` makes `pg_stat_activity` cleanly per-tenant. Cost: ~10 µs per transaction. Worth it for incident triage.
- **Separate pool for migration / admin traffic.** A second PgBouncer port (e.g., 6433) bound to the migration role, with its own pool sizing. Keeps DDL out of the application's connection budget.
- **Hard cap on per-app `max_active_transactions`.** Application-side limit on concurrent in-flight DB transactions per process; fail fast at the app layer with a clear error rather than letting requests pile up against a saturated pool.

### alter-overhead-at-scale

**Mechanism:** beyond ~500–1,000 schemas, ALTERs on hot tables (adding columns, adding indexes, changing types) become operationally painful even with parallelization. Postgres' DDL acquires an `ACCESS EXCLUSIVE` lock on the target table for the duration of the operation; an `ADD COLUMN` is fast for the column itself but slow if combined with an index creation, a default backfill, or a NOT NULL validation. Parallelizing across schemas accelerates wall-clock but multiplies lock pressure on shared catalogs (`pg_class`, `pg_attribute`) — at very high parallelism, the catalog locks themselves serialize the operation.

**Concrete example:** the platform decides to add a covering index on `invoices(tenant_id, created_at)` across all schemas to fix a query pattern. Locally the `CREATE INDEX CONCURRENTLY` takes 4 seconds against a 1M-row tenant. In production: 1,200 schemas, parallel runner at 16 workers. The first batch starts and Postgres' catalog locking causes the workers to serialize on `pg_class` writes; effective parallelism drops to ~3. Wall-clock for the campaign: 80 minutes. Connections held open for the duration cause pool pressure and customer-visible latency spikes. The operation succeeds, but the SRE post-mortem is unflattering.

**Mitigations:**

- **`CREATE INDEX CONCURRENTLY`** for index work — non-blocking to writes, but takes longer per schema. Acceptable trade-off; serialize index creation per schema if needed.
- **Stagger across maintenance windows.** Schedule large fanout DDL into off-hours batches of ~100 schemas at a time, with monitoring between batches. Total elapsed time grows, but per-batch impact stays bounded.
- **Use `ADD COLUMN` without default, then backfill with chunked `UPDATE`, then constrain.** The classic expand/contract pattern, applied per schema. Each step is cheap; the campaign takes longer but never grabs a long ACCESS EXCLUSIVE.
- **Pre-flight the migration on a clone.** Restore a production snapshot to a staging cluster, run the migration, measure per-schema and total wall-clock. Catch the table-rewrite tenant *before* production. Mandatory for any DDL touching tenant-scoped hot tables at >500 schemas.
- **Plan the cluster-split.** At sustained pain past 1,000 schemas, the next-tier migration is to cell-based — multiple clusters, ≤500 schemas each, routed by cell. Capture this trigger in the tenancy-model.md re-evaluation criteria.

### tenant-search-path-leakage

**Mechanism:** application code forgets `SET LOCAL search_path` for a particular request path — a worker, a webhook handler, an admin endpoint, a newly added job. Without an explicit `search_path`, Postgres uses the connection's default (typically `"$user", public`). The query falls through to `public`, where the table either doesn't exist (→ "relation does not exist" error, loud, recoverable) or *does* exist as a shared/legacy copy (→ silent cross-tenant read). The latter is the failure mode: a leftover `public.invoices` table from migration scaffolding becomes the silent cross-tenant data sink, and queries that should hit `tenant_037.invoices` instead hit `public.invoices` and see every tenant's pre-migration data.

**Concrete example:**

```python
# A webhook handler added in a hurry.
def handle_stripe_event(event):
    with db.session() as session:
        # Missing: session.execute("SET LOCAL search_path = ?, public", (tenant.schema,))
        session.execute("UPDATE invoices SET status = 'paid' WHERE stripe_id = ?",
                        (event.stripe_id,))
```

The handler runs against the *connection's default* `search_path`. If a legacy `public.invoices` exists, every tenant's invoice with that `stripe_id` gets marked paid. If not, the handler errors out — annoying, but loud, and the bug is found in staging. The silent case (legacy `public.invoices`) is the dangerous one.

**Mitigations:**

- **Centralize `SET LOCAL search_path` in a request middleware.** Every request that enters the application's transaction-managing path goes through a single function that resolves tenant → schema and binds it. Webhooks, workers, admin endpoints route through the same primitive. Code review enforces no direct `db.session()` use outside the middleware.
- **Drop or rename legacy `public.*` tables that mirror tenant tables.** If `public.invoices` exists for historical reasons but should never be read, drop it (preferred) or rename to `public._legacy_invoices_DO_NOT_USE` (acceptable as a transitional state). The silent-leak failure mode disappears when the fallback target doesn't exist.
- **CI assertion that `public` schema contains *only* the documented shared lookup tables.** A migration test enumerates `pg_tables WHERE schemaname = 'public'`; fail on any unexpected table. Forces deliberate decisions about shared-schema content.
- **Connection-level default `search_path` set to something that errors loudly.** `ALTER ROLE application_user SET search_path = 'no_default_path';` ensures any code path that forgets `SET LOCAL` immediately errors on its first query, rather than silently falling through to `public`. Pair with a clear error message in the app layer.
- **Per-request assertion.** After `SET LOCAL search_path`, optionally `SELECT current_setting('search_path')` and assert it starts with the expected `tenant_NNN` prefix. Cost is ~50 µs; surfaces middleware bugs immediately.

---

## Operational Patterns

Schema-per-tenant is a mechanism but it lives or dies on operational discipline. The patterns below are mandatory for any production schema-per-tenant deployment.

**Tenant onboarding.** The onboarding workflow is atomic from the platform's perspective: create schema, clone template, grant access, register in tenants table. A failure at any step must leave the cluster clean.

```sql
-- Idealized onboarding (real implementation wraps this in a single transaction
-- where possible, with explicit cleanup on failure for parts that cannot be
-- transactional).
BEGIN;
  CREATE SCHEMA tenant_042 AUTHORIZATION migration_user;
  -- Clone tables from a "tenant_template" schema (Postgres has no built-in
  -- CLONE SCHEMA; use pg_dump --schema=tenant_template | sed | psql, or a
  -- programmatic table-by-table CREATE TABLE ... LIKE).
  CREATE TABLE tenant_042.invoices    (LIKE tenant_template.invoices    INCLUDING ALL);
  CREATE TABLE tenant_042.users       (LIKE tenant_template.users       INCLUDING ALL);
  CREATE TABLE tenant_042.audit_log   (LIKE tenant_template.audit_log   INCLUDING ALL);
  -- ... continue for every tenant-scoped table ...
  GRANT USAGE   ON SCHEMA tenant_042                 TO application_user;
  GRANT SELECT, INSERT, UPDATE, DELETE
                ON ALL TABLES IN SCHEMA tenant_042   TO application_user;
  ALTER DEFAULT PRIVILEGES IN SCHEMA tenant_042
      GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO application_user;
  INSERT INTO platform.tenants (id, schema_name, created_at, status)
    VALUES ('042', 'tenant_042', now(), 'active');
COMMIT;
```

The `tenant_template` schema acts as the canonical source of "what a fresh tenant looks like". Migrations apply to `tenant_template` *first*, then to all active tenant schemas. This makes onboarding race-free: a tenant onboarded mid-migration either picks up the new shape (if onboarded after the template is migrated) or the old shape (if onboarded before, then included in the migration sweep). Both are recoverable; the alternative — onboarding from a snapshot that may or may not match the in-flight migration state — is not.

**Tenant offboarding.** Dropping a schema is *irreversible* from the live cluster's perspective. Coordinate with backup retention.

```sql
BEGIN;
  -- 1. Capture a final logical backup BEFORE dropping. Non-negotiable.
  --    (Performed out-of-band by the offboarding orchestrator, not in SQL.)
  --    pg_dump --schema=tenant_042 -Fc -f /backups/offboarded/tenant_042_<date>.dump
  --
  -- 2. Mark the tenant as offboarding in the platform metadata.
  UPDATE platform.tenants SET status = 'offboarding', offboarded_at = now()
    WHERE id = '042';
  --
  -- 3. After a grace period (typically 7-30 days based on contract), drop.
  DROP SCHEMA tenant_042 CASCADE;
  --
  -- 4. The offboarded backup is retained per the data-retention policy
  --    (typically 30-90 days for SOC2; longer for HIPAA/PCI).
COMMIT;
```

The grace-period window between `status = 'offboarding'` and `DROP SCHEMA` is the load-bearing safety net for "the customer changed their mind". A `DROP SCHEMA CASCADE` against an active schema is unrecoverable except by restore-from-backup, which is hours of work and customer downtime. Document the offboarding runbook; run an offboarding drill quarterly.

**Per-tenant backup strategy.** Schema-per-tenant makes per-tenant backups mechanically straightforward; *use* the property.

- **Logical per-tenant dumps.** `pg_dump --schema=tenant_NNN -Fc -f /backups/<date>/tenant_NNN.dump` per tenant, parallelized by a fanout orchestrator. Restoration: `pg_restore -d app /backups/<date>/tenant_NNN.dump`. Bounds the restore blast radius to one tenant; pairs naturally with "restore my data to last Tuesday" customer requests.
- **Cluster-wide physical backup** via WAL archiving + `pg_basebackup` as the baseline. Logical per-tenant dumps complement, not replace, the physical baseline.
- **Per-tenant restore drill quarterly.** Pick a tenant, restore their last dump into a staging cluster, verify row counts and a sample query. Schema-per-tenant deployments that never test the per-tenant restore path find it broken when they need it.
- **Retention policy.** Active-tenant dumps follow the cluster's backup retention (typically 30-90 days). Offboarded-tenant dumps follow the contractual data-retention obligation; document the divergence.

**Migration discipline.** Every migration touching tenant-scoped tables must:

1. Apply to `tenant_template` *first*, in its own transaction.
2. Apply to every active tenant schema via the per-tenant migration runner, with per-schema transactions and resumability.
3. Record per-schema completion in a `platform.migrations` table; the runner reads from this table for idempotency.
4. Assert post-run that `succeeded + skipped == total active tenants`; fail loud on any mismatch.
5. Include a rollback SQL file alongside the forward migration. Rollback is per-schema, same runner.

These steps are *non-negotiable*. Encode them in the migration template, the PR template, and the CI gate.

**Per-tenant cost attribution.** Schema-per-tenant unlocks per-tenant cost reporting that pooled RLS makes difficult.

- **Storage:** `SELECT schemaname, sum(pg_relation_size(schemaname || '.' || tablename)) FROM pg_tables WHERE schemaname LIKE 'tenant_%' GROUP BY schemaname;` — gives bytes per tenant. Run nightly; feed into the billing system.
- **Query load:** `pg_stat_statements` joined against schema names extracts per-tenant query counts and total time. Combined with the per-tenant `application_name` discipline, you can attribute connection-pool consumption per tenant.
- **Tier-based resource limits:** `ALTER ROLE` per-tenant role variants (if used) can set per-tenant `work_mem` or `statement_timeout`. Most deployments don't go this deep; document the option for the day a noisy tenant demands a fix.

**Observability.** Per-tenant metrics are mechanically natural in schema-per-tenant but still expensive at high cardinality.

- Tag application-emitted metrics with `tenant_id`; cost scales linearly with N tenants and metric count. Acceptable for N < 1,000; review past that.
- Use the per-tenant `application_name` in PgBouncer + Postgres logs to correlate connection-pool events back to tenants without inflating the metrics namespace.
- `pg_stat_user_tables` per schema gives per-tenant read/write rates; feed into capacity planning.

---

## Trade-offs

Comparing schema-per-tenant against the alternatives surfaced by [[tenancy-decision-framework]]. Numbers calibrated against production deployments through 2026; treat as orienting, not authoritative.

| Dimension | RLS (pooled) | Schema-per-tenant (this fragment) | Cell-based | Database-per-tenant |
|---|---|---|---|---|
| **Active tenant fit** | Best ≤ ~1,000; usable to ~3,000 with partitioning | Best 100–1,500 per cluster; degrades past ~1,500 (catalog scans) | Best 1,000–100,000+ (per cell: 200–800 schemas) | Best ≤ ~50 (per-DB ops overhead dominates) |
| **Marginal cost per tenant** | $0.50–$3 / mo at SMB scale | $3–$10 / mo (single cluster, per-schema ops overhead) | $10–$80 / mo (drops with cell density) | $50–$500 / mo (per-DB infra + ops) |
| **Isolation strength** | Logical only; policy is the entire boundary | Schema namespace + per-schema GRANTs; single OS process | Physical: separate DBs / networks / accounts | Physical: separate database, same cluster or different |
| **Audit story** | SOC2 OK with policy tests; HIPAA borderline | SOC2/HIPAA/PCI clean; ISO 27001 clean; FedRAMP-Mod OK; FedRAMP-High borderline | All including FedRAMP-High, IL4, IL5, CJIS | All; strongest single-cluster option |
| **Per-query overhead** | 0.5–8 ms (RLS planner) | Near-zero per query; ~10 µs for `SET LOCAL search_path` | Near-zero per cell; 1–5 ms routing | Near-zero |
| **DDL fanout cost** | Single ALTER, cluster-wide | N ALTERs (1 per schema); parallelizable but bounded by catalog locks | N ALTERs per cell, parallel across cells | N ALTERs (1 per DB); separate connections per DB |
| **Per-tenant backup** | Hard (logical filter + replay) | Trivial (`pg_dump --schema`) | Trivial (per-cell, per-schema) | Trivial (`pg_dump` per database) |
| **Migration cost to next tier** | RLS → schema: ~1 engineer-week + ~5 min/tenant | Schema → cell: 2–4 engineer-months | Effectively terminal | DB-per-tenant → cell: weeks; → schema: weeks; rare |
| **Connection pool sensitivity** | Low (pooled identity, single search_path) | High — requires PgBouncer transaction-mode + `DISCARD ALL` | Medium per cell | High (per-DB pool fragmentation) |
| **Failure mode density** | High — 4 silent failure modes | Medium — 4 mostly-operational failure modes | Low — failures loud (cell down, routing miss) | Low — failures are per-DB and obvious |

**Reading the table:**

- **vs RLS:** schema-per-tenant wins on isolation strength, audit story, and per-tenant operational features (backup/restore, cost attribution). RLS wins on cost, ops simplicity, and connection-pool sensitivity. Crossover around 500 active tenants for mid-market SaaS, earlier for HIPAA/PCI scope. Plan the migration *before* you cross — RLS → schema is cheap if done deliberately, expensive if forced.
- **vs cell-based:** schema-per-tenant is structurally cheaper but caps out around 1,500 schemas per cluster. Cell-based becomes necessary at higher tenant counts, under FedRAMP-High, or when blast-radius requirements demand physical separation. Schema-per-tenant *inside* a cell is a common cell-based variant — the two are complementary, not strictly alternatives.
- **vs database-per-tenant:** schema-per-tenant offers ~90% of database-per-tenant's isolation at ~10% of the per-tenant cost. Database-per-tenant only justifies itself for very-low-tenant-count, very-high-isolation deployments (≤50 tenants, FedRAMP-equivalent isolation). Most "I want my own database" customer requests are satisfiable with schema-per-tenant plus a clean grant story.

---

## Quality Checks

These checks apply before merging a schema-per-tenant tenancy design to platform main, and again as a quarterly review.

- **CRITICAL:** schema migrations must run per-schema with idempotency + rollback; a missed schema = partial rollout = silent inconsistency. The runner records per-schema completion in a manifest, asserts `succeeded + skipped == total active tenants` post-run, and *fails loud* on any mismatch. The CI gate must block deploys whose migration runner did not complete cleanly. A migration that "mostly succeeded" but skipped one schema is the canonical schema-per-tenant outage: the application crashes on every request hitting the skipped schema, and the failure is invisible from cluster-level metrics. Treat this control as non-negotiable.

- **`SET LOCAL search_path` discipline.** Application code uses `SET LOCAL search_path = <tenant_schema>, public` at the start of every transaction; never plain `SET search_path`. A linter / AST check verifies this in CI; a runtime assertion (`SELECT current_setting('search_path')` after the bind) catches drift in production. Plain `SET search_path` paired with transaction pooling is a cross-tenant context leak in waiting.

- **Connection pool mode and sizing audit.** PgBouncer (or equivalent) runs in `transaction` mode with `server_reset_query = DISCARD ALL` and `server_reset_query_always = 1`. Pool sizing math (`default_pool_size = sustained_qps × p99_txn_duration_seconds × 1.3`) is documented in the platform runbook and reviewed quarterly. Mode changes require a security review — they invalidate `SET LOCAL` assumptions.

- **Dropped-schema backup verification.** Every offboarded tenant has a verified logical backup *before* `DROP SCHEMA CASCADE` runs. The offboarding orchestrator records the backup's path, size, and a checksum in `platform.tenant_offboarding_log`; the drop step refuses to proceed without a fresh entry. Quarterly drill: pick a recent offboarded tenant, restore their dump into a staging cluster, verify table row counts match the pre-drop snapshot.

- **`public` schema content is inventoried.** A CI assertion enumerates `pg_tables WHERE schemaname = 'public'` and fails on any unexpected table. The expected set is documented in the platform's schema-content manifest (shared lookups, platform metadata, migration tracking — that's it). Drift here is the leading indicator of the [[#tenant-search-path-leakage]] failure mode.

- **Per-tenant migration runner has tests.** The runner itself is application code with unit tests for: idempotent re-application, resumable partial-failure recovery, per-schema timeout handling, the post-run completion assertion. CI runs these tests on every change to the runner; production runs go through the same code path.

- **Schema-template parity.** A nightly job diffs `tenant_template` against a randomly-sampled active tenant schema; any drift is logged and alerted. Drift between template and tenants means either (a) a tenant was created off a stale template, or (b) a migration applied to tenants but not template, or vice versa — either way, future onboardings will be wrong.

- **Per-tenant restore drill quarterly.** Pick a tenant, restore their last logical backup into a staging cluster, verify row counts and a sample customer-facing query. Schema-per-tenant deployments that never test the per-tenant restore path find it broken when they need it.

- **Catalog-cost monitoring.** Track `pg_class` row count and `pg_namespace` row count weekly. Alert when either crosses a per-deployment threshold (typical: 50,000 `pg_class` rows). Sustained growth past the threshold is the leading indicator that the cluster is approaching the schema-per-tenant ceiling and should plan for cell-based migration.

- **Re-evaluation trigger captured.** The tenancy-model.md output includes a re-evaluation trigger ("re-run the framework at 1,200 active tenants OR upon first FedRAMP-Moderate customer signing OR upon sustained migration wall-clock > 10 minutes"). Schema-per-tenant designs that omit this trigger end up at the catalog-cost cliff with no plan.

- **Reviewer rotation.** Schema-per-tenant designs are reviewed by at least one engineer who is *not* the author. For HIPAA/PCI scope or for migrations between tenancy models, escalate to a principal-level reviewer.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh empirical inputs. Schema-per-tenant *mechanism* is stable across Postgres versions; *thresholds* and *tooling* (PgBouncer alternatives, schema-routing libraries) shift annually.

- `schema-per-tenant PostgreSQL {date}` — surfaces reference architectures and benchmarks at varied schema counts. Watch for posts comparing per-schema migration runtime at 100, 500, 1500 schemas. Treat single-data-point benchmarks as orientation, not ground truth.
- `pgbouncer multi-tenant routing {date}` — operational guidance on pool sizing, transaction-mode interactions with `SET LOCAL search_path`, and `server_reset_query` defaults. Watch for PgCat and Supavisor write-ups as alternatives.
- `per-tenant migration tooling {date}` — surveys of per-tenant migration runners: `apartment` (Rails), `django-tenants`, `sqlalchemy-multitenant`, custom Go/Python runners. Cross-reference against your stack.
- `Postgres schema enumeration cost at scale {date}` — `pg_namespace` and `pg_class` performance characteristics at high schema counts. Useful for sizing the catalog-cost monitoring quality check.
- `pg_dump per schema backup strategy {date}` — operational guidance on per-schema logical backups, parallelization, retention. Cross-link with the per-tenant restore drill.
- `multi-tenant SaaS schema migration parallelism {date}` — patterns for parallelizing N-schema DDL while bounded by catalog locking. Useful for the schema-migration-explosion failure mode mitigation.
- `tenant schema lifecycle automation {date}` — onboarding/offboarding workflows, template-schema strategies, schema-template parity checks. Vendor blogs (Stripe, Notion, Linear) are recurring sources.
- `silo pool bridge SaaS tenancy {date}` — AWS SaaS Lens vocabulary for tenancy tiers; useful for aligning on terminology with auditors and customer security teams.

When a query returns content older than 18 months, treat as orientation only — the Postgres pooler and schema-routing tooling landscape (Supavisor, PgCat, serverless-Postgres platforms) is shifting fast enough that 2-year-old tooling guidance may be stale even if the *mechanism* still holds.

### Source-quality heuristics

- **Postgres official docs.** Ground truth for the mechanism: `CREATE SCHEMA`, `GRANT`, `SET search_path` reference pages. Read these, not blog summaries.
- **PgBouncer docs.** Configuration reference is load-bearing. Pay particular attention to `pool_mode`, `server_reset_query`, and the prepared-statement notes per version.
- **AWS SaaS Lens.** Useful for vocabulary (silo / pool / bridge) and for the auditor-facing isolation story. Recommendations skew toward AWS services they sell.
- **Vendor write-ups.** Stripe, Notion, Linear, Shopify engineering blogs publish post-hoc rationalizations of decisions that worked *for them, at their scale*. Read for pattern names and failure-mode anecdotes; do not lift recommendations directly without checking your inputs against theirs.
- **Auditor-facing content.** ISACA, CSA, HHS, and ISO 27001 guidance documents. Useful for the compliance scope conversation; rarely prescriptive about schema-per-tenant specifically.

---

## Cross-references

**Companion fragments:**

- [[tenancy-decision-framework]] — the upstream decision aid that produces a schema-per-tenant recommendation in the first place. This fragment is the deep-dive consulted *after* the framework leaf lands on schema-per-tenant. Defects in schema-per-tenant scoping should propagate back to the framework as input clarifications, not stay localized here.
- [[rls-deep-dive]] — the lighter-weight alternative. Read when schema-per-tenant ops overhead is unaffordable, or when tenant count is below ~100 and the audit story for RLS suffices. Often the "downgrade" target when schema-per-tenant proves heavier than the product needs.
- [[cell-based-architecture]] — the heavier alternative. Read when schema-per-tenant hits the catalog-cost cliff (>1,500 schemas), under FedRAMP-High compliance scope, or when blast-radius requirements demand physical separation. Schema-per-tenant *inside* a cell is a common cell-based variant.
- [[tenant-isolation-testing-patterns]] — the test catalog enforced at QG-M2. Every schema-per-tenant deployment depends on this suite being green; do not treat tests as optional. Cross-tenant search_path manipulation, role-escalation, and missed-grant assertions are all in scope here.

**Implementation patterns:**

- [[schema-per-tenant-with-pgbouncer]] — concrete connection-pool topology, schema-aware routing in application code, pool-sizing math worked out. The hands-on companion to this fragment.
- [[rls-row-level-security]] — RLS policy templates; relevant when planning the migration *from* RLS or when running a hybrid model where some tenants are RLS-pooled and others are schema-per-tenant.
- [[secrets-and-roles-postgres]] — role and grant hygiene patterns; cross-link for the `application_user` vs `migration_user` separation discussed above.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/data/checklists/qg-m2-tenant-isolation.md`) — the gate this fragment's recommendations feed. Every schema-per-tenant tenancy-model.md MUST clear QG-M2 before merging to platform main, and the isolation test suite from [[tenant-isolation-testing-patterns]] must be green.

**Related decisions:**

- Schema-per-tenant choice interacts with **observability cardinality**: per-tenant metrics on schema-per-tenant are mechanically natural (the schema is the tenant), but at >1,000 tenants the metric cardinality cost still matters. Surface this trade-off in tenancy-model.md §6 (Ops implications).
- Schema-per-tenant choice interacts with **billing / metering**: the schema *is* the natural metering boundary; per-tenant storage, query load, and connection consumption fall out of `pg_stat_*` queries without per-row tagging.
- Schema-per-tenant choice constrains **AI-runtime tenant scoping** (Nova module, P3+). Vector stores can live in the tenant schema (`tenant_NNN.embeddings`); prompt caches and agent memory should follow the same boundary. Plan this propagation in the AI runtime design.
- Schema-per-tenant choice influences the **support-engineer experience**: ad-hoc `psql` for incident response is mechanically safer than on pooled RLS — the support engineer connects with their own role and `SET search_path = tenant_NNN, public`, with no `BYPASSRLS` risk. Document the support workflow in the runbook.
- Schema-per-tenant choice influences the **acquisition / migration story**: absorbing an acquired product's tenants is "create N new schemas, run their migration pipeline against each" — a well-defined operation, not a data-model rewrite.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice), §6.2 (frontmatter schema). Defects to this fragment's structure should be filed as spec patches, not unilateral changes.
- `std-frontmatter.md`, `std-validation.md` (this module's standards). The frontmatter above conforms to `std-frontmatter`.

**Downstream consumers:**

- `design-tenancy-model` skill (`src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/`) — primary consumer. When the skill's traversal of [[tenancy-decision-framework]] lands on schema-per-tenant, `step-05-c-write-design` references this fragment for the rationale, ops implications, and isolation-tests-required sections.
- Atlas memory (`_bmad/_memory/atlas/architecture-decisions/`) — every schema-per-tenant ADR should reference this fragment by id (`schema-per-tenant`) for the rationale's mechanism description.
