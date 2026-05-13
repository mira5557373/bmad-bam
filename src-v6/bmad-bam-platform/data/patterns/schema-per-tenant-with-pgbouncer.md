---
id: schema-per-tenant-with-pgbouncer
title: Schema-Per-Tenant with PgBouncer Connection Pooling
category: tenant-isolation
kind: pattern
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://www.pgbouncer.org/config.html"
  - "https://www.postgresql.org/docs/current/ddl-schemas.html"
tested_against:
  - platform: "PostgreSQL 16 + PgBouncer 1.21"
    verified: 2026-05-12
---

# Schema-Per-Tenant with PgBouncer Connection Pooling

A concrete, implementation-ready recipe for deploying schema-per-tenant Postgres isolation behind a PgBouncer transaction-mode pool. Each tenant occupies its own schema (`tenant_<id>`); a connection pooler multiplexes a bounded set of server connections across thousands of client connections; every application request binds the active tenant via `SET LOCAL search_path = tenant_<id>, public;` at the start of its transaction.

This pattern is the hands-on companion to [[schema-per-tenant]] — read the fragment first for the mechanism, failure-mode theory, and operational deep-dive, then return here to wire schema-per-tenant into a cluster, an application, and a CI pipeline. The fragment covers *why* schema-per-tenant fails the four ways it does; this pattern covers *what to type* to avoid those failures.

If you have time for one, read the fragment. If you have time for both, fragment then pattern; this pattern assumes you already understand transaction-mode pool semantics, `search_path` precedence, and the `tenant_template` cloning model.

---

## When to Use

This pattern is the right schema-per-tenant recipe when **all** of these hold. If any condition is shaky, return to [[tenancy-decision-framework]] before committing to the per-schema operational surface.

- **Active tenant count in the 100–500 band, with line of sight to ≤ ~1,500 per cluster.** Below 100 tenants the per-schema ops overhead is over-engineered — pooled RLS gives equivalent isolation properties at a fraction of the runbook surface. Above ~1,500 schemas, catalog scans (`pg_namespace`, `pg_class`), ORM reflection time, and migration fanout cost degrade meaningfully; plan the cell-based migration before crossing.
- **Regulated industry or audit-friendly isolation language is binding.** SOC2 (CC6.1, CC6.6, CC6.7), HIPAA, ISO 27001 Annex A.9 / A.18, and PCI-DSS 4.0 cardholder-data-environment scoping all map cleanly to per-schema GRANTs. Auditors prefer "show me the GRANTs on tenant_037" to "show me the RLS policy coverage matrix"; that preference alone often justifies the ops overhead.
- **Per-tenant data volume exceeds the comfortable RLS envelope (P90 >10 GB).** When tenant working sets are large enough that buffer-cache cross-pollution becomes painful under RLS, the schema boundary gives clean per-tenant resource attribution even though the buffer cache is still shared.
- **Per-tenant operational features are productized.** Per-tenant PITR ("restore my data to last Tuesday"), per-tenant GDPR Article 20 data export, per-tenant capacity tiers, per-tenant disable/freeze for billing disputes. All trivial with `pg_dump --schema`; all bespoke under RLS.
- **A connection multiplexer is non-negotiable.** PgBouncer 1.21+, Supavisor, PgCat, or Aurora-grade equivalent. Without a pooler this pattern is a load-test failure waiting to happen — see [[schema-per-tenant]] §connection-pool-exhaustion.
- **Ops team size ≥ 3 FTE with intermediate-or-better Postgres expertise.** Schema-per-tenant requires someone owning the migration runner, the backup orchestrator, the schema lifecycle automation, and the pool-sizing review. Two-person ops will silently let runbooks rot; pick RLS until the team grows.

---

## When NOT to Use

These conditions fire *before* any cost optimization; they are structural exclusions, not preferences.

- **Active tenant count >~1,500 in a single cluster, with no plan to shard.** Catalog scans become measurable, `\dn` takes seconds, migration fanout exceeds the deploy window. Pick [[cell-based-with-routing]] — each cell can host 200–800 schemas, and the routing layer absorbs the count.
- **Hot-table ALTER latency budget under ~100 ms.** A `ALTER TABLE add_column` that takes 80 ms locally takes 80 × N seconds across N schemas, even parallelized. At 1,000 schemas with a deploy budget of one minute, schema-per-tenant cannot deliver. Pick RLS (single ALTER) or cell-based (per-cell amortization).
- **Ops team size < 2 FTE owning production.** The per-schema runbook surface (migration, backup, restore drill, lifecycle automation, pool sizing review) cannot be sustained on one operator. Pick pooled RLS and accept the audit-story trade-off, or hire before committing.
- **No connection pooler available or pooler is misconfigured.** Without PgBouncer in `transaction` mode (or equivalent), this pattern is structurally broken. Session-mode pooling silently breaks `SET LOCAL search_path` semantics; statement-mode is incompatible.
- **Frequent per-tenant schema-shape variation (>~5% of tenants).** Schema-per-tenant tolerates a small amount of variation but degrades into "every schema is a one-off" beyond 5%. Push variation into JSONB or use feature-flagged columns inside a uniform schema.
- **Compliance scope is FedRAMP-High, IL4, IL5, or CJIS.** These mandate *physical* separation — separate DBs, networks, accounts. A shared cluster with separate schemas does not satisfy. Pick [[cell-based-with-routing]].
- **Tenant churn >10% monthly.** Free-trial-heavy or prosumer SaaS with high cadence on/offboarding stresses the lifecycle automation; soft-delete inside an RLS world is operationally cheaper.

---

## Architecture

The pattern binds a per-request tenant identifier into Postgres' `search_path` GUC, *through PgBouncer in transaction mode*. The pooler multiplexes a bounded server-side connection set across many client-side connections; `SET LOCAL` scopes the binding to the active transaction and `DISCARD ALL` at server release defends against drift.

### Connection flow

```
   client request (with tenant_id in JWT / session)
        │
        ▼
   app handler validates JWT, extracts tenant_id, resolves → schema name
        │
        ▼
   app: acquire client connection (port 6432, PgBouncer)
        │
        ▼
   app: BEGIN; SET LOCAL search_path = tenant_<id>, public;
        │
        ▼
   PgBouncer (pool_mode = transaction) — assigns server connection
        │
        ▼
   PostgreSQL — queries hit tenant_<id>.<table>; public for shared lookups
        │
        ▼
   app: COMMIT  →  PgBouncer releases server conn; server_reset_query = DISCARD ALL
```

### Namespace boundary, by example

Two tenants, two `posts` tables under their own schemas, never colliding:

```sql
-- Two tenants, each with their own posts table; rows cannot collide.
CREATE SCHEMA tenant_a AUTHORIZATION migration_user;
CREATE SCHEMA tenant_b AUTHORIZATION migration_user;

CREATE TABLE tenant_a.posts (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id   uuid NOT NULL,
    body        text NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tenant_b.posts (LIKE tenant_a.posts INCLUDING ALL);

-- A query bound to tenant_a's search_path sees only tenant_a.posts.
SET LOCAL search_path = tenant_a, public;
SELECT count(*) FROM posts;   -- counts only tenant_a's posts; tenant_b is invisible.
```

The namespace boundary is enforced by Postgres' identifier resolution: a bare `posts` resolves via `search_path` in order, and `tenant_b.posts` is mechanically unreachable without an explicit qualified reference or a `search_path` rebind. Cross-tenant access requires either an explicit qualified name (which application code never produces under this pattern) or a privilege violation (which `GRANT USAGE ON SCHEMA tenant_b` denies to the application role).

The `public` trailing entry in `search_path` is the fallback for shared lookup tables (countries, currencies, feature flags). Order matters: if `lookups` exists in both `tenant_a` and `public`, the tenant copy wins. Document the shared-vs-tenant split; surprises here become cross-tenant correctness bugs.

---

## Implementation Patterns

### PgBouncer configuration

```ini
; /etc/pgbouncer/pgbouncer.ini — production minimum for schema-per-tenant.
[databases]
app = host=postgres-primary.internal port=5432 dbname=app auth_user=pgbouncer

[pgbouncer]
listen_port            = 6432
listen_addr            = 0.0.0.0
auth_type              = scram-sha-256
auth_file              = /etc/pgbouncer/userlist.txt

; Transaction pooling is mandatory. SET LOCAL search_path requires it.
pool_mode              = transaction
max_client_conn        = 4000
default_pool_size      = 25
reserve_pool_size      = 5
reserve_pool_timeout   = 3
server_lifetime        = 3600
server_idle_timeout    = 600

; CRITICAL: clears any leaked GUCs (search_path, application_name, etc.)
; on server release. Without this, drift between transaction boundary and
; pool release creates subtle cross-tenant context leaks.
server_reset_query        = DISCARD ALL
server_reset_query_always = 1

; Per-tenant application_name visibility in pg_stat_activity.
application_name_add_host = 1

; PgBouncer 1.21+ supports protocol-level prepared statements in transaction
; mode. Older PgBouncer + prepared statements + transaction pooling = breakage.
; Verify your PgBouncer version explicitly.
max_prepared_statements = 100
```

**Caveats to internalize before deploying:**

- **Prepared statements.** PgBouncer < 1.21 does not preserve prepared-statement state across server connections in transaction mode. Either upgrade to 1.21+, disable prepared statements in your driver, or accept that prepared-statement-heavy ORMs (Django, SQLAlchemy with `prepared_statement_cache_size > 0`) will quietly misbehave. Test explicitly.
- **`SET` vs `SET LOCAL`.** `SET search_path` (no LOCAL) persists for the connection's lifetime — i.e., bleeds across transactions in transaction-pool mode. Plain `SET` is forbidden in application code under this pattern; lint for it in CI.
- **Listen / Notify.** `LISTEN` requires session pooling; if you need pub/sub, route those clients through a separate PgBouncer instance in `pool_mode = session`, not your application pool.
- **Advisory locks.** `pg_advisory_lock` is session-scoped; under transaction pooling, the lock is released at COMMIT. Use `pg_advisory_xact_lock` (transaction-scoped) variants instead.
- **`SET ROLE`, `SET SESSION AUTHORIZATION`.** Session-scoped; will leak across transactions without `server_reset_query = DISCARD ALL`. The `DISCARD ALL` defense is non-negotiable.

### Tenant onboarding SQL

```sql
-- Onboard tenant_042. Run as migration_user (NOT the application role).
-- Wrapped in a single transaction where possible; cleanup-on-failure for
-- non-transactional parts is handled by the orchestrator.
BEGIN;

-- 1. Create the schema, owned by the migration role.
CREATE SCHEMA tenant_042 AUTHORIZATION migration_user;

-- 2. Clone every tenant-scoped table from the canonical template schema.
--    LIKE ... INCLUDING ALL copies constraints, defaults, indexes, statistics.
CREATE TABLE tenant_042.invoices    (LIKE tenant_template.invoices    INCLUDING ALL);
CREATE TABLE tenant_042.users       (LIKE tenant_template.users       INCLUDING ALL);
CREATE TABLE tenant_042.audit_log   (LIKE tenant_template.audit_log   INCLUDING ALL);
-- ... continue for every tenant-scoped table in the template ...

-- 3. Grant least-privilege access to the application role.
--    USAGE on the schema; CRUD on existing tables; CRUD on future tables.
GRANT USAGE   ON SCHEMA tenant_042                 TO application_user;
GRANT SELECT, INSERT, UPDATE, DELETE
              ON ALL TABLES IN SCHEMA tenant_042   TO application_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant_042
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO application_user;

-- 4. Explicitly deny CREATE on the schema. Closes one SQL-injection escalation
--    path; the application can never create new objects in the tenant schema.
REVOKE CREATE ON SCHEMA tenant_042 FROM application_user;

-- 5. Register the tenant in platform metadata. Source of truth for the
--    migration runner's tenant enumeration.
INSERT INTO platform.tenants (id, schema_name, created_at, status)
  VALUES ('042', 'tenant_042', now(), 'active');

COMMIT;
```

The `tenant_template` schema is the canonical "what a fresh tenant looks like" — migrations apply to it *first*, then fan out to every active tenant. Onboarding never copies from a random live tenant; that path produces drift.

### Per-request middleware (search_path binding)

```python
# Framework middleware, runs once per request. Production version of [[schema-per-tenant]] §mechanism.
async def tenant_isolation_middleware(request, conn):
    tenant_id     = request.jwt_claims["tenant_id"]
    schema_name   = resolve_schema(tenant_id)        # 'tenant_042', validated
    assert_valid_schema_identifier(schema_name)      # reject anything not /^tenant_[a-z0-9_]+$/
    async with conn.transaction():                   # BEGIN
        await conn.execute(
            "SET LOCAL search_path = " + schema_name + ", public"
        )
        await conn.execute(
            "SET LOCAL application_name = $1", schema_name
        )
        # Optional belt-and-suspenders assertion in non-prod:
        # actual = await conn.fetchval("SELECT current_setting('search_path')")
        # assert actual.startswith(schema_name)
        return await call_next(request)              # COMMIT or ROLLBACK on return
```

**Lifecycle requirements (encode in code review):**

- `SET LOCAL`, never plain `SET`. CI-enforced lint rule.
- Schema-name validation happens at the edge. The schema identifier reaches `SET LOCAL` via string interpolation (Postgres does not parameterize identifiers); the regex gate is the entire injection defense.
- Bind before the first query in the transaction. Queries that fire before `SET LOCAL` hit the connection's default `search_path` (typically `"$user", public`) — a latent cross-tenant leak vector.
- Centralize this middleware. Webhooks, background workers, admin endpoints all route through the same primitive. No `db.session()` outside the middleware path.

### Migration runner pseudocode

```python
# Apply a SQL migration against every tenant schema. Idempotent, resumable,
# fail-loud. The post-run assertion is the load-bearing safety check.
def run_migration(migration_id: str, sql_path: pathlib.Path) -> Report:
    # First: apply to tenant_template in its own transaction.
    apply_to_template(migration_id, sql_path)

    tenants = list_active_tenants()          # source: platform.tenants
    report  = Report(migration_id=migration_id)

    with ThreadPoolExecutor(max_workers=8) as pool:
        for tenant in tenants:
            pool.submit(_apply_one, tenant, migration_id, sql_path, report)

    # Non-negotiable: missed schema → loud failure → CI gate blocks deploy.
    assert (
        len(report.succeeded) + len(report.skipped) + len(report.failed)
        == len(tenants)
    ), "missed schema in migration sweep"
    if report.failed:
        raise MigrationPartialFailure(report)  # see CRITICAL in Quality Checks
    return report

def _apply_one(tenant, migration_id, sql_path, report):
    try:
        with pg.connect(role="migration_user") as conn:
            with conn.transaction():                       # per-schema BEGIN/COMMIT
                conn.execute(f"SET LOCAL search_path = {tenant.schema}, public")
                if already_applied(conn, migration_id):
                    report.skipped.append(tenant); return
                conn.execute(sql_path.read_text())
                record_applied(conn, migration_id)
        report.succeeded.append(tenant)
    except Exception as exc:                               # automatic per-schema ROLLBACK
        report.failed.append((tenant, exc))
```

The contract: **every** active tenant either succeeds, is skipped idempotently, or fails loud with a recorded reason. Rolling back the affected schema is automatic (the per-schema transaction handles it); rolling back the *whole batch* is explicitly *not* the model — successful schemas stay applied, failed schemas retry on the next run.

### Tenant offboarding

```sql
-- Offboard tenant_042. The DROP is irreversible from the live cluster;
-- the orchestrator MUST verify a fresh backup exists before reaching step 3.
BEGIN;

-- 1. Capture a final logical backup BEFORE dropping. Out-of-band, not in this txn.
--    pg_dump --schema=tenant_042 -Fc -f /backups/offboarded/tenant_042_<date>.dump
--    Backup is registered in platform.tenant_offboarding_log with checksum.

-- 2. Mark the tenant as offboarding; grace period before the drop.
UPDATE platform.tenants
   SET status = 'offboarding', offboarded_at = now()
 WHERE id = '042';

-- 3. After the contractual grace period (7-30 days), drop with CASCADE.
--    The orchestrator refuses to reach this step without a registered backup.
DROP SCHEMA tenant_042 CASCADE;

-- 4. Offboarded-tenant backup retention follows the data-retention policy
--    (typically 30-90 days for SOC2; longer for HIPAA/PCI).

COMMIT;
```

**Warning:** `DROP SCHEMA ... CASCADE` against a live, non-offboarded schema is unrecoverable except by full restore. The grace-period window between `status = 'offboarding'` and the actual `DROP` is the load-bearing safety net for "the customer changed their mind". Coordinate the backup-retention policy with the offboarding orchestrator — without a verified, registered backup in `platform.tenant_offboarding_log`, the drop step refuses to proceed.

---

## Trade-offs

| Dimension | rls-row-level-security | schema-per-tenant-with-pgbouncer (this pattern) | cell-based-with-routing |
|---|---|---|---|
| **Active tenant fit** | Best ≤ ~1,000; usable to ~3,000 with partitioning | Best 100–1,500 per cluster; degrades past ~1,500 | Best 1,000–100,000+; 200–800 schemas per cell |
| **Marginal cost / tenant** | $0.50–$3 / mo at SMB scale | $3–$10 / mo (single cluster + per-schema ops) | $10–$80 / mo (drops with cell density) |
| **Isolation strength** | Logical — policy is the entire boundary | Schema namespace + per-schema GRANTs; single cluster | Physical — separate DBs, networks, accounts |
| **Per-query overhead** | 0.5–8 ms (planner rewrite) | ~10 µs (`SET LOCAL search_path`) | Near-zero per cell; 1–5 ms routing add |
| **DDL fanout cost** | Single ALTER, cluster-wide | N ALTERs (1 per schema); parallelizable but bounded by catalog locks | N ALTERs per cell, parallel across cells |
| **Per-tenant backup / restore** | Hard (logical filter + replay) | Trivial (`pg_dump --schema=tenant_N`) | Trivial (per-cell, per-schema) |
| **Audit story** | SOC2 OK with policy tests; HIPAA borderline | SOC2/HIPAA/PCI clean; ISO 27001 clean; FedRAMP-High borderline | All including FedRAMP-High, IL4, IL5, CJIS |
| **Connection-pool sensitivity** | Low — single search_path, pooled identity | High — requires PgBouncer transaction-mode + `DISCARD ALL` | Medium per cell |
| **Ops complexity** | Low | Medium — per-schema migrations, per-tenant backup, pool review | High — per-cell pipelines, control plane, routing |
| **Migration cost in** | 2–4 eng-weeks from app-only filtering | 4–8 eng-weeks (pooler topology + per-schema migrator) | 3–6 eng-months (control plane + routing layer) |
| **Migration cost out** | RLS → schema: ~1 eng-week + ~5 min/tenant | Schema → cell: 2–4 eng-months | Effectively terminal |
| **Failure-mode density** | High — 4 silent failure modes (planner, BYPASSRLS, ...) | Medium — 4 mostly-operational failure modes | Low — failures are loud |

**Reading the table:** schema-per-tenant wins on isolation strength, audit story, and per-tenant operational features (PITR, export, cost attribution). RLS wins on per-tenant cost, ops simplicity, and connection-pool sensitivity. Cell-based wins on scale and compliance ceiling. The crossover from RLS to schema-per-tenant sits around 500 active tenants for mid-market SaaS, earlier for HIPAA/PCI scope. The crossover from schema-per-tenant to cell-based sits around 1,200–1,500 schemas per cluster, earlier under FedRAMP-High. Plan the *next* migration trigger inside the tenancy-model.md, not as an afterthought.

---

## Quality Checks

These checks must pass before merging a schema-per-tenant tenancy design or onboarding/migration code to platform main, and again on a quarterly review cadence.

- **CRITICAL:** schema migrations must run per-schema with idempotency + rollback; partial failures MUST rollback the affected schema, not the whole batch — otherwise tenants land in inconsistent state. The runner records per-schema completion in `platform.migrations`, asserts `succeeded + skipped + failed == total active tenants` post-run, and *fails loud* on any mismatch. Per-schema transactions handle the per-schema rollback automatically; *don't* wrap the entire batch in one transaction (you'd lose the resumability story). The CI gate must block deploys whose migration runner did not complete cleanly. A migration that "mostly succeeded" but skipped one schema is the canonical schema-per-tenant outage — the application crashes on every request hitting the skipped schema, and the failure is invisible from cluster-level metrics. Non-negotiable.

- **`SET LOCAL search_path` discipline (CI lint + runtime assertion).** Application code uses `SET LOCAL search_path = <schema>, public` at the start of every transaction; never plain `SET`. A CI lint / AST check on the application repo verifies the discipline (no occurrences of `SET search_path` without a preceding `LOCAL` keyword in DB-facing code paths). A runtime assertion in non-prod environments — `SELECT current_setting('search_path')` after the bind, asserting it starts with the expected `tenant_` prefix — catches drift before production.

- **Schema-count headroom monitoring.** Track `SELECT count(*) FROM pg_namespace WHERE nspname LIKE 'tenant_%'` weekly. Alert when the count crosses 80% of the per-deployment ceiling (typical: 1,200 of 1,500). Sustained growth past the threshold is the leading indicator that the cluster is approaching the schema-per-tenant catalog-cost cliff and should plan for cell-based migration. The re-evaluation trigger ("re-run the framework at 1,200 active tenants") must be captured in tenancy-model.md, not improvised when the alert fires.

- **Dropped-schema backup verification.** Every offboarded tenant has a verified logical backup *before* `DROP SCHEMA CASCADE` runs. The offboarding orchestrator records the backup's path, size, and SHA-256 checksum in `platform.tenant_offboarding_log`; the drop step refuses to proceed without a fresh entry less than 24 hours old. Quarterly restore drill: pick a recent offboarded tenant, restore their dump into a staging cluster, verify row counts and a sample customer-facing query.

- **ALTER overhead profiling at growing tenant counts.** Before any DDL touching a tenant-scoped hot table at >500 schemas, pre-flight the migration on a production-snapshot clone. Measure per-schema wall-clock and total fanout time. If the total exceeds the deploy budget, switch to staged batches (~100 schemas per batch) with monitoring between batches. Run a quarterly synthetic ALTER campaign against the staging clone to keep the timing data fresh.

- **Connection pool mode and sizing audit.** PgBouncer (or equivalent) runs in `transaction` mode with `server_reset_query = DISCARD ALL` and `server_reset_query_always = 1`. Pool sizing math (`default_pool_size = sustained_qps × p99_txn_duration_seconds × 1.3`) is documented in the platform runbook and reviewed quarterly. Mode changes (e.g., to session) require a security review — they invalidate `SET LOCAL` assumptions and the prepared-statement guarantees.

- **Schema-template parity check.** A nightly job diffs `tenant_template` against a randomly sampled active tenant schema; any drift is logged and alerted. Drift means either a tenant was created off a stale template or a migration applied to tenants but not template (or vice versa) — either way, future onboardings will produce a divergent shape.

---

## Web Research Queries

Refresh annually. The schema-per-tenant *mechanism* is stable across Postgres versions; *PgBouncer alternatives*, *migration tooling*, and *catalog-cost thresholds* shift.

- `pgbouncer multi-tenant routing {date}` — operational guidance on transaction-mode pool sizing, `server_reset_query` defaults, prepared-statement support per version. Watch for PgCat and Supavisor write-ups as alternatives.
- `PostgreSQL schema migration tooling per-tenant {date}` — surveys of per-tenant migration runners (`apartment`, `django-tenants`, `sqlalchemy-multitenant`, custom Go/Python runners). Cross-reference against your stack; ORM-bundled runners often miss the resumability story.
- `connection pool exhaustion multi-schema {date}` — failure-mode write-ups and capacity-planning posts at production scale. Useful for re-calibrating pool sizing math and catching new failure modes published since the last review.
- `pgbouncer prepared statements transaction mode {date}` — version-specific notes on PgBouncer 1.21+ prepared-statement support; useful when upgrading PgBouncer or considering a driver change.
- `pg_dump per schema backup parallelization {date}` — operational guidance on per-tenant logical backup throughput, retention strategies, restore-drill automation. Cross-link with the dropped-schema backup quality check.
- `Postgres schema enumeration cost at scale {date}` — `pg_namespace` and `pg_class` performance at high schema counts; useful for sizing the catalog-cost monitoring quality check.

Treat results older than 18 months as orientation only — the Postgres pooler landscape (PgBouncer, PgCat, Supavisor, Aurora DSQL) shifts annually and prepared-statement support in particular has moved meaningfully recently.

---

## Cross-references

**Companion fragment:**

- [[schema-per-tenant]] — mechanism, failure-mode theory, ops deep-dive. Read first; this pattern is the recipe, that fragment is the theory. The four failure modes (`schema-migration-explosion`, `connection-pool-exhaustion`, `alter-overhead-at-scale`, `tenant-search-path-leakage`) are surfaced in the fragment; the mitigations are encoded in this pattern's quality checks.

**Upstream decision aid:**

- [[tenancy-decision-framework]] — the framework that should select schema-per-tenant before you reach this pattern. If you arrived here without traversing the framework, return there first.

**Sibling patterns:**

- [[rls-row-level-security]] — the lighter alternative. Read when this pattern's ops overhead is unaffordable or tenant count is below ~100. Common "downgrade" target when schema-per-tenant proves heavier than the product needs.
- [[cell-based-with-routing]] — the heavier alternative. Read when this pattern hits the catalog-cost cliff (>1,500 schemas), under FedRAMP-High scope, or when blast-radius requirements mandate physical separation. Schema-per-tenant *inside* a cell is a common variant.

**Test catalog:**

- [[tenant-isolation-testing-patterns]] — the canonical test catalog for schema-per-tenant isolation assertions (cross-schema reads, `search_path` manipulation, missed-grant assertions). The quality checks above depend on this suite being green.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/data/checklists/qg-m2-tenant-isolation.md`) — every schema-per-tenant tenancy-model.md MUST clear QG-M2 before merging to platform main.
