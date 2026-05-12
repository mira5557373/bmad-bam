---
id: rls-row-level-security
title: PostgreSQL Row-Level Security for Tenant Isolation
category: tenant-isolation
kind: pattern
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
tested-against:
  - platform: "PostgreSQL 16"
    verified: 2026-05-12
---

# PostgreSQL Row-Level Security for Tenant Isolation

A concrete, implementation-ready recipe for adding Row-Level Security (RLS) to a pooled multi-tenant Postgres deployment. This pattern is the hands-on companion to [[rls-deep-dive]] — read the fragment first for the mechanism, failure-mode theory, and audit story, then return here to wire RLS into a schema, an application, and a CI pipeline.

If you only have time for the deep dive *or* the pattern, read the fragment. If you have time for both, read in that order; this pattern assumes you understand `BYPASSRLS`, `FORCE ROW LEVEL SECURITY`, and `SET LOCAL` semantics already.

---

## When to Use

This pattern is the right RLS recipe when **all** of these hold. If you are uncertain, return to [[tenancy-decision-framework]] before committing code.

- **Active tenant count is below ~1,000 per Postgres instance** (PG 15+, 8–16 vCPU, NVMe). The planner constant-folds simple GUC-equality predicates with negligible overhead in this range. See [[rls-deep-dive]] §performance-cliff-at-high-tenant-count for the exact thresholds and partitioning escape hatches.
- **Single-database cost ceiling is binding** — per-tenant infra budget under ~$5/month makes schema-per-tenant or cell-based infeasible. RLS pools every tenant onto a single buffer cache, single WAL, single pool. For SMB and prosumer SaaS, this is typically the only economically viable option.
- **Blast-radius tolerance permits shared-schema risk.** If your SLA reads "any single tenant outage is a notifiable incident", RLS is structurally wrong — pick schema-per-tenant or cell-based regardless of cost.
- **Compliance scope is RLS-friendly.** SOC2 (CC6.1, CC6.7) and GDPR accept RLS with policy-test evidence. HIPAA accepts RLS with a documented threat model and BAA-scope evidence. PCI-DSS 4.0 can be made to work but expect scoping argument. FedRAMP-High, IL4, IL5, and CJIS are hard-no — use cell-based.
- **Per-tenant data volume is bounded.** RLS works well when P90 tenant data fits in shared buffers' working set (<10 GB per tenant for OLTP; <50 GB for read-heavy analytical workloads).
- **Team has at least intermediate Postgres operational expertise.** RLS is unforgiving to operators who do not understand `BYPASSRLS`, `SECURITY DEFINER`, and the `USING` / `WITH CHECK` distinction.

---

## When NOT to Use

Recognize these conditions early. Retreating from RLS post-launch is a 1-engineer-week-per-tenant migration on top of the design rework.

- **High tenant count (>~1,500 active per instance) with no partitioning or replica strategy.** The planner does not gracefully degrade past this threshold for non-trivial policies; p99 latency spikes are a phase change, not a smooth slope.
- **Strict per-tenant compliance isolation.** FedRAMP-High, IL4, IL5, CJIS, or any contract that mandates physical tenant boundaries. No policy-test evidence satisfies those controls.
- **Large per-tenant data volumes** (>50 GB per tenant). Buffer-cache pressure from one large tenant evicts others' hot pages — the *security* property holds, but the *isolation* property degrades into noisy-neighbor pain.
- **Customer SLA mandates single-tenant-only blast radius.** "Tenant A's outage cannot affect tenant B" is incompatible with shared-schema.
- **Per-tenant backup/restore granularity is a contractual feature.** Pooled RLS makes per-tenant point-in-time recovery non-trivial; schema-per-tenant handles it natively.
- **Per-tenant schema variation is a product requirement.** If different tenants get different columns at the *schema* level, RLS becomes structurally awkward. Schema-per-tenant fits better.
- **Untrusted SQL on behalf of tenants** (BI extensions, SQL pads, customer-supplied queries). RLS alone cannot safely constrain untrusted SQL; isolate at the database level.

---

## Architecture

The pattern binds a per-request tenant identifier into a Postgres GUC (`app.tenant_id`), then references that GUC from a policy on every tenant-scoped table. The planner rewrites every read and write against the table to include the policy predicate.

### Query flow

```
   client request (with tenant_id in JWT / session)
        │
        ▼
   app handler validates JWT, extracts tenant_id
        │
        ▼
   app: BEGIN; SET LOCAL app.tenant_id = '<id>';
        │
        ▼
   app: SELECT / INSERT / UPDATE / DELETE on posts
        │
        ▼
   pg planner: rewrites query, applies
        USING      (tenant_id = current_setting('app.tenant_id', true)::uuid)
        WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid)
        │
        ▼
   index scan on (tenant_id, ...) → rows for this tenant only
        │
        ▼
   app: COMMIT  →  connection returns to pool, GUC cleared
```

### Data model (YAML schema)

```yaml
table: posts
columns:
  - { name: id,         type: uuid,        pk: true, default: gen_random_uuid() }
  - { name: tenant_id,  type: uuid,        not_null: true }
  - { name: author_id,  type: uuid,        not_null: true }
  - { name: body,       type: text,        not_null: true }
  - { name: created_at, type: timestamptz, not_null: true, default: now() }
indexes:
  - { name: posts_tenant_id_idx,            columns: [tenant_id] }
  - { name: posts_tenant_id_created_at_idx, columns: [tenant_id, created_at] }
rls:
  enabled: true
  forced: true
  policies:
    - { name: posts_tenant_read,  command: SELECT, predicate: USING }
    - { name: posts_tenant_write, command: ALL,    predicate: BOTH  }
```

### Reference SQL schema

```sql
-- The tenant-scoped table. Every tenant-scoped table follows this template.
CREATE TABLE posts (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   uuid NOT NULL,
    author_id   uuid NOT NULL,
    body        text NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index supports the policy predicate; composite index for common access pattern.
CREATE INDEX posts_tenant_id_idx            ON posts (tenant_id);
CREATE INDEX posts_tenant_id_created_at_idx ON posts (tenant_id, created_at DESC);

-- RLS: enable AND force (force applies to owners too).
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts FORCE  ROW LEVEL SECURITY;

-- Read policy: any role tagged application_user sees only its own tenant's rows.
CREATE POLICY posts_tenant_read ON posts
  FOR SELECT
  TO application_user
  USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

-- Write policy: prevent cross-tenant inserts/updates/deletes.
CREATE POLICY posts_tenant_write ON posts
  FOR ALL
  TO application_user
  USING      (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);
```

Note the two policies. `posts_tenant_read` covers `SELECT`; `posts_tenant_write` covers `INSERT` / `UPDATE` / `DELETE` with both `USING` (which existing rows can be touched) and `WITH CHECK` (which resulting rows are permitted). A single `FOR ALL` policy with both clauses works equally well; split policies are clearer when a senior engineer needs to read the audit trail at 3 a.m. Pick a convention and stick with it across the codebase.

---

## Implementation Patterns

### Per-request tenant binding

```sql
-- At the start of every transaction, before any tenant-scoped query.
BEGIN;
SET LOCAL app.tenant_id = '7d9c4a3e-1f2b-4e6d-9c8a-2e3f1d4b5a6c';
-- ... application queries here ...
COMMIT;  -- GUC dies; connection returns to pool clean.
```

**Lifecycle requirements:**

- **`SET LOCAL`, never plain `SET`.** Plain `SET` persists across the transaction boundary; on a transaction-pooled connection, the next request inherits the prior tenant's binding. This has been the root cause of multiple published RLS leaks.
- **One `SET LOCAL` per transaction.** Workers that span tenants (cron jobs, backfills) must acquire a fresh connection per tenant and `SET LOCAL` inside that transaction. Never reuse a connection across tenants without an intervening commit and re-bind.
- **Bind before the first query.** A query that fires before `SET LOCAL` runs sees `current_setting('app.tenant_id', true)` as NULL — the predicate evaluates to NULL (false-y), so the query returns zero rows. Silent zero-result bugs are easier to ship than to debug; centralize the bind in middleware so individual handlers cannot forget.
- **Validate tenant_id format before binding.** The cast `::uuid` happens inside the policy; pass garbage and the predicate raises mid-query. Validate at the edge (JWT layer) and treat malformed input as 400 before it reaches Postgres.

### Application middleware pattern (pseudocode shape, real SQL)

```python
# Web framework middleware, runs once per request.
async def tenant_isolation_middleware(request, conn):
    tenant_id = request.jwt_claims["tenant_id"]
    validate_uuid(tenant_id)  # fail fast on malformed input
    async with conn.transaction():
        await conn.execute(
            "SET LOCAL app.tenant_id = $1", tenant_id
        )
        return await call_next(request)
    # transaction commit/rollback releases the GUC
```

### Migration template — every new tenant-scoped table

```sql
-- migrations/2026_05_12_create_<table>.sql
BEGIN;

CREATE TABLE <table> (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id   uuid NOT NULL,
    -- ... domain columns ...
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX <table>_tenant_id_idx ON <table> (tenant_id);

ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
ALTER TABLE <table> FORCE  ROW LEVEL SECURITY;

CREATE POLICY <table>_tenant_isolation ON <table>
  FOR ALL
  TO application_user
  USING      (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

COMMIT;
```

**Migration discipline checklist** (encode in PR template):

- [ ] `tenant_id uuid NOT NULL` on the table.
- [ ] Index on `tenant_id` (or composite leading with `tenant_id`).
- [ ] `ENABLE ROW LEVEL SECURITY` present.
- [ ] `FORCE ROW LEVEL SECURITY` present.
- [ ] At least one `CREATE POLICY` with both `USING` and `WITH CHECK`.
- [ ] Cross-tenant test added to the isolation suite (see [[tenant-isolation-testing-patterns]]).

### Migration linter (CI gate)

```bash
# scripts/check_rls_migrations.sh — run as a required CI check.
# For every CREATE TABLE in tenant-scoped namespaces, require the RLS triplet.
set -euo pipefail
fail=0
for f in migrations/*.sql; do
  if grep -Eqi 'CREATE TABLE (public|tenant)\.' "$f" || \
     grep -Eqi 'CREATE TABLE [a-z_][a-z0-9_]*[[:space:]]*\(' "$f"; then
    grep -qi 'ENABLE ROW LEVEL SECURITY' "$f" || { echo "$f: missing ENABLE RLS"; fail=1; }
    grep -qi 'FORCE  *ROW LEVEL SECURITY' "$f" || { echo "$f: missing FORCE RLS";  fail=1; }
    grep -qi 'CREATE POLICY'              "$f" || { echo "$f: missing POLICY";     fail=1; }
  fi
done
exit $fail
```

This is a regex-grade check — pair it with the post-migration Postgres query in **Quality Checks** below for a real backstop. A migration AST parser (e.g., `sqlparse`, `pglast`) catches false negatives the grep misses; treat the grep as table-stakes and graduate to AST when the codebase justifies it.

### Connection pool configuration

PgBouncer is the de facto pooler. Mode selection determines whether the rest of this pattern is safe.

| Pooler mode      | RLS compatibility                              |
|------------------|------------------------------------------------|
| Transaction      | **Required for this pattern.** `SET LOCAL` scopes correctly. Prepared statements work in PgBouncer 1.21+. |
| Session          | Works (any `SET` is acceptable), but throughput suffers (one client = one connection). Some HIPAA-conscious deployments choose this. |
| Statement        | **Incompatible with RLS.** `SET LOCAL` cannot span statements. Do not use. |

```ini
# pgbouncer.ini — minimum viable config for RLS.
[databases]
appdb = host=primary.pg.internal port=5432 dbname=appdb auth_user=pgbouncer

[pgbouncer]
pool_mode = transaction
max_client_conn = 4000
default_pool_size = 50
server_reset_query = DISCARD ALL  ; defensive — clears any leaked GUCs at connection return
ignore_startup_parameters = extra_float_digits
```

`server_reset_query = DISCARD ALL` is belt-and-suspenders for transaction mode (the GUC dies at commit anyway), but it costs nothing and guards against future config drift to session mode.

### Bypass-prevention hygiene

`BYPASSRLS` roles and `SECURITY DEFINER` functions are the two highest-density bypass surfaces. Both are necessary at small scale; both become liabilities at production scale.

**`BYPASSRLS` role audit (run quarterly):**

```sql
-- Every row needs a documented owner and justification.
-- Application traffic must NOT reach any role in this list.
SELECT rolname, rolbypassrls, rolsuper
FROM pg_roles
WHERE rolbypassrls OR rolsuper;
```

Separate the application connection pool's role from the migration role. The application's role has neither `BYPASSRLS` nor `SUPERUSER`; the migration role has `BYPASSRLS` and is reachable only from CI/CD network paths.

**`SECURITY DEFINER` function audit (run quarterly):**

```sql
SELECT n.nspname, p.proname, p.prosecdef
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE prosecdef
  AND n.nspname NOT IN ('pg_catalog', 'information_schema');
```

Every row is a potential policy-bypass surface. Default new functions to `SECURITY INVOKER` (the Postgres default). Reserve `SECURITY DEFINER` for documented, reviewed exceptions; pressure the list to shrink over time.

---

## Trade-offs

| Dimension | rls-row-level-security (this pattern) | schema-per-tenant-with-pgbouncer | cell-based-with-routing |
|---|---|---|---|
| **Cost / tenant** | $0.50–$3 / mo at SMB scale | $3–$10 / mo | $10–$80 / mo (drops with cell density) |
| **Isolation strength** | Logical — policy is the entire boundary | Schema + role grants — still one cluster | Physical — separate DBs, networks, accounts |
| **Migration cost (in)** | 2–4 engineer-weeks from app-only filtering | 4–8 engineer-weeks (new pooler topology + per-schema migrator) | 3–6 engineer-months (control plane + routing layer) |
| **Migration cost (out)** | RLS → schema: ~1 eng-week + 5 min/tenant. RLS → cell: 3–6 eng-months | Schema → cell: 2–4 eng-months | Effectively terminal |
| **Ops complexity** | Low — one cluster, one deploy, one backup | Medium — per-schema migrations, per-tenant backup, pooler-pool-per-schema | High — per-cell pipelines, control plane, routing |
| **Per-query overhead** | 0.5–8 ms (simple policy: 0.5–2 ms; complex: 5–8+ ms) | Near-zero | Near-zero per cell; 1–5 ms routing add |
| **Tenant ceiling / instance** | ~1,000 active (~3,000 with partitioning + replicas) | ~3,000 per cluster (limited by pg_catalog bloat) | 1,000–100,000+ horizontally |
| **Audit story** | SOC2 OK; HIPAA borderline; PCI scope-able; FedRAMP-High no | SOC2/HIPAA/PCI good; FedRAMP-Mod OK; High borderline | All frameworks including FedRAMP-High, IL4, IL5, CJIS |
| **Failure-mode density** | High — 4 documented silent-failure modes (see [[rls-deep-dive]]) | Medium — schema enumeration, migration explosion | Low — failures are loud (cell down, routing miss) |

**Reading the table:** RLS wins on cost and ops simplicity at low tenant count. Schema-per-tenant wins on per-query overhead, per-tenant restore, and the audit story. Cell-based wins on isolation and scale. The crossover from RLS to schema typically sits around 500 active tenants for mid-market SaaS; plan the migration trigger *before* you hit it, not after. Cell-based becomes necessary at >1,500 active tenants or under FedRAMP-High.

---

## Quality Checks

These checks must pass before merging an RLS-based tenancy design or migration to platform main, and again as a quarterly review.

- **CRITICAL:** every tenant-scoped table MUST have RLS enabled AND a policy defined; CI MUST fail otherwise. Implement a migration linter that grep-checks for `ENABLE ROW LEVEL SECURITY` on every `CREATE TABLE` in tenant-scoped namespaces (see the script in **Implementation Patterns** above). Pair with a post-migration Postgres query — `SELECT c.relname FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid WHERE n.nspname IN ('public') AND c.relkind = 'r' AND NOT c.relrowsecurity;` — that returns zero rows. Skipping this control has been the root cause of every published RLS leak through 2025; the gate is non-negotiable.

- **`pg_policies` coverage audit.** Daily job: for every tenant-scoped table, `SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = '<t>'` returns ≥1. Maintain a manifest of tenant-scoped tables alongside `migrations/` so "tenant-scoped" is mechanically determinable. Alert on any zero.

- **`FORCE ROW LEVEL SECURITY` enforced.** `SELECT relname FROM pg_class WHERE relrowsecurity AND NOT relforcerowsecurity AND relnamespace = 'public'::regnamespace;` returns zero rows. Without `FORCE`, the table owner bypasses the policy — a latent leak when migration code paths re-enter at runtime.

- **`BYPASSRLS` role inventory.** Quarterly review of every role returned by the `BYPASSRLS` audit query above. Each row has a documented owner and a justification; each is unreachable from application network paths. Removal pressure is constant — `BYPASSRLS` should shrink over time, not grow.

- **Transaction-pooling discipline.** PgBouncer (or the chosen pooler) runs in `pool_mode = transaction`. Application code uses `SET LOCAL`, never plain `SET`, for tenant binding. A linter / AST check on the application repo verifies the discipline. Changes to pool mode require a security review; document the rationale in the platform runbook.

- **`SECURITY DEFINER` function annual review.** Every `SECURITY DEFINER` function in tenant schemas has a documented owner and a code-review approval. New ones require principal-level sign-off. Run the audit query above and route results to the platform owner.

- **Isolation test suite green on every PR.** Tests assert: cross-tenant `SELECT` returns zero rows; cross-tenant `INSERT` raises `new row violates row-level security policy`; cross-tenant `UPDATE` updates zero rows; cross-tenant `DELETE` deletes zero rows. Coverage of every tenant-scoped table is mandatory; missing-table coverage is itself a failing test. Cross-reference [[tenant-isolation-testing-patterns]] for the canonical test catalog.

---

## Web Research Queries

Refresh annually. RLS *mechanism* is stable across Postgres versions; *thresholds* and *tooling* shift.

- `PostgreSQL RLS performance at scale {date}` — surfaces planner-overhead benchmarks across Postgres major versions; useful for re-calibrating the 1,000-tenant ceiling.
- `RLS bypass attacks {date}` — security research and public incident write-ups (Stripe, GitHub, Supabase, Heroku post-mortems).
- `supabase neon multi-tenant {date}` — managed-Postgres platforms encode RLS guard-rails; useful even when self-hosting.
- `pgbouncer transaction pooling SET LOCAL {date}` — operational guidance on pool-mode interactions with `SET LOCAL` and prepared statements.
- `Postgres BYPASSRLS audit {date}` — operational queries for role hygiene; cross-link with the audit quality check above.

Treat results older than 18 months as orientation only — the Postgres pooler and serverless-Postgres landscape (Neon, Supavisor, Aurora DSQL, PgCat) shifts annually.

---

## Cross-references

**Companion fragment:**

- [[rls-deep-dive]] — mechanism, failure-mode theory, audit story, operational deep-dive. Read before this pattern if you have not already; this pattern is the recipe, that fragment is the theory.

**Upstream decision aid:**

- [[tenancy-decision-framework]] — the framework that should select RLS (or not) before you reach this pattern. If you arrived here without traversing the framework, return there first.

**Test catalog:**

- [[tenant-isolation-testing-patterns]] — the canonical test catalog for RLS isolation assertions. The quality checks above depend on this suite being green.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/data/checklists/qg-m2-tenant-isolation.md`) — every RLS-based tenancy-model.md MUST clear QG-M2 before merging to platform main.

**Sibling patterns:**

- [[schema-per-tenant-with-pgbouncer]] — the most common upgrade target when RLS hits its ceiling.
- [[cell-based-with-routing]] — the cell-based alternative; relevant under FedRAMP-High or >1,500 active tenants.
