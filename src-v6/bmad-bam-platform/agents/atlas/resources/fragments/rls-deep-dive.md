---
id: rls-deep-dive
title: PostgreSQL Row-Level Security as a Tenancy Mechanism — Deep Dive
category: tenant-isolation
kind: fragment
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
  - "https://supabase.com/docs/guides/auth/row-level-security"
tested_against: []
---

# PostgreSQL Row-Level Security as a Tenancy Mechanism — Deep Dive

A structural deep-dive on **Row-Level Security (RLS)** as the isolation mechanism behind a pooled multi-tenant Postgres deployment. This fragment is consumed by `design-tenancy-model` (and any skill producing or reviewing an RLS-based tenancy design) after the [[tenancy-decision-framework]] has selected RLS — or is considering it — as the recommended option.

RLS is the cheapest production-grade tenancy mechanism Postgres offers. It is also the mechanism with the **highest density of subtle, silent failure modes** in the framework. The mechanism is simple; deploying it safely is not. Read this fragment before writing the first `CREATE POLICY` statement in anger.

---

## When to Use

RLS is the correct mechanism when **all** of the following hold. Mixed-mode situations should fall back to the [[tenancy-decision-framework]] for a hybrid recommendation rather than stretching RLS past its envelope.

- **Active tenant count below ~1,000 per Postgres instance.** RLS overhead is manageable in this range on modern hardware (PG 15+, 8–16 vCPU, NVMe). The planner can constant-fold a simple `tenant_id = current_setting(...)::uuid` predicate into an index scan with negligible overhead (sub-millisecond). The ceiling shifts with policy complexity: a single equality predicate scales much further than a recursive or joined policy. Treat 1,000 as a *yellow line*, not a hard cliff — see [[#performance-cliff-at-high-tenant-count]] below.

- **Single-database cost ceiling is binding.** Per-tenant infra budget under ~$5/month makes schema-per-tenant and cell-based infeasible. RLS pools every tenant onto a single buffer cache, single WAL, single connection pool. For SMB and prosumer SaaS, this is the only economically viable option short of running tenants on shared SQLite (a different problem).

- **Blast-radius tolerance permits shared-schema risk.** Your SLA permits cross-tenant impact from a single bad query, a hot tenant, or a corrupted shared index. If a customer contract reads "any single tenant outage is a notifiable incident", RLS is structurally wrong — pick schema-per-tenant or cell-based regardless of cost.

- **Compliance framework set is one where the audit story for RLS is well-documented.** SOC2 (CC6.1, CC6.7) accepts RLS with policy-test evidence. GDPR is mechanism-agnostic. HIPAA accepts RLS with a documented threat model and BAA-scope evidence (per HHS guidance through 2025), though some auditors push back — have the policy-test artifacts ready. PCI-DSS 4.0 *can* be satisfied with RLS but the cardholder-data-environment scoping conversation is harder; expect to argue. FedRAMP-Moderate is borderline; FedRAMP-High, IL4, IL5, CJIS are all hard-no on pooled RLS.

- **Team has intermediate-or-higher Postgres operational expertise.** RLS is unforgiving to operators who do not understand `current_setting`, role membership, `BYPASSRLS`, and the difference between `USING` and `WITH CHECK`. A novice team running RLS in production is the single highest-risk combination in the [[tenancy-decision-framework]] matrix. If the team is novice, default to a managed RLS platform (Supabase, Neon with their auth layer) that encodes some guard-rails — or skip RLS and use schema-per-tenant where the boundary is enforced by Postgres itself, not by a policy your team must write correctly every time.

- **Data volume per tenant is bounded.** RLS works well when P90 tenant data fits in shared buffers' working set — typically <10 GB per tenant for OLTP workloads, <50 GB for analytical reads with appropriate indexes. Beyond that, the buffer-cache pressure from one tenant evicts others' hot pages, and the *isolation* property degrades into noisy-neighbor pain even if the *security* property holds.

- **Per-tenant migration cadence is uniform.** Every tenant gets every schema change at the same time. If product requires per-tenant feature flags at the *schema* level (some tenants have an extra column, others do not), RLS becomes structurally awkward — you end up with nullable columns and "is this tenant on schema-v3 yet" logic that contaminates queries. Schema-per-tenant handles this natively.

---

## When NOT to Use

RLS is the wrong mechanism when any of these conditions are present. Recognize them early — retreating from RLS after launch is a 1-engineer-week-per-tenant migration on top of the design rework.

- **Compliance scope includes FedRAMP-High, IL4, IL5, or CJIS.** These frameworks require *physical* tenant boundaries. No amount of policy testing satisfies the control. Pick cell-based; do not argue with the auditor.

- **Customer SLA mandates single-tenant-only blast radius.** "Tenant A's outage cannot affect tenant B" is incompatible with shared-schema. Pick cell-based or schema-per-replica.

- **Tenant count projection exceeds 1,500 active on a single instance, with no read-replica or partitioning strategy.** The planner does *not* gracefully degrade past this threshold for non-trivial policies. You will see p99 latency spike, then plan-cache pressure cause planner-time itself to dominate. Either commit to partitioning by `tenant_id`, sharding, or migrate off RLS.

- **Team Postgres expertise is novice and there is no managed-platform safety net.** Self-hosted RLS with a novice team produces an undetected leak within 18 months. Empirical, not theoretical — every public RLS leak through 2025 has originated from one of three failure modes enumerated below, and all three are *invisible* without disciplined testing and code review.

- **Tenants need per-tenant backup/restore granularity.** Pooled RLS makes per-tenant point-in-time recovery non-trivial: you can `pg_dump` filtered by `tenant_id`, but restoring one tenant to a snapshot while leaving others at HEAD requires manual surgery. If your support contract sells "restore my tenant to last Tuesday", schema-per-tenant is structurally better.

- **You need to run untrusted SQL on behalf of tenants.** Customer-supplied queries, BI extensions, or "SQL pad" features cannot be safely constrained by RLS alone. Untrusted SQL can call `SECURITY DEFINER` functions, set arbitrary GUCs, or exploit subtle planner behaviors. Don't try; isolate at the database level.

---

## How RLS Works

RLS attaches **policies** — predicates evaluated by the planner — to tables. The planner rewrites every `SELECT`, `INSERT`, `UPDATE`, and `DELETE` against an RLS-enabled table to include the policy's `USING` (for read) or `WITH CHECK` (for write) clause. Policies are scoped per *command type* (SELECT/INSERT/UPDATE/DELETE/ALL) and per *role*.

The canonical multi-tenant pattern binds a per-request **session variable** carrying the tenant ID, then references that variable from every policy.

```sql
-- 1. Enable RLS on the tenant-scoped table.
CREATE TABLE invoices (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id     uuid NOT NULL,
    amount_cents  bigint NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE  ROW LEVEL SECURITY;   -- applies to table owner too

CREATE INDEX invoices_tenant_id_idx ON invoices (tenant_id);

-- 2. Define a policy for normal application traffic.
CREATE POLICY tenant_isolation ON invoices
  FOR ALL
  TO application_user
  USING      (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

-- 3. At the start of every request (in the app or pool), bind the tenant.
SET LOCAL app.tenant_id = '7d9c...e3f1';   -- a real tenant uuid
-- ... application queries proceed; planner constant-folds the predicate.
```

A few load-bearing details in the above that are easy to miss:

- **`FORCE ROW LEVEL SECURITY`** is not optional. Without it, the table *owner* (typically the migration role) bypasses the policy. If your migration role and your app role are the same — a deployment anti-pattern but common in early-stage products — bare `ENABLE` is a leak in waiting.

- **`current_setting('app.tenant_id', true)`** — the `true` second argument means "return NULL if unset" instead of raising. Without `true`, the first un-`SET` connection to the pool raises `unrecognized configuration parameter`. With `true`, the predicate evaluates `tenant_id = NULL`, which is *false* for every row — silent zero results, not a security incident. Choose deliberately; many teams prefer the raise so missing tenant binding is loud, not silent.

- **`SET LOCAL`** scopes the binding to the current transaction. Plain `SET` lasts for the connection's lifetime, which is unsafe when the connection is pooled. PgBouncer in *transaction*-pooling mode hands the connection back to the pool at commit; if your tenant binding was a plain `SET`, the next request inherits it. Always `SET LOCAL`, and verify the pooler mode (see [[#operational-patterns]]).

- **The policy is a *predicate*, not a *boundary*.** RLS does not separate storage, indexes, statistics, or WAL. A tenant who can issue a `SELECT pg_relation_size('invoices')` learns information about *all* tenants' data combined. Surface this in the threat model — RLS is logical isolation only.

- **`USING` vs `WITH CHECK`** — `USING` filters rows the user can *see* (reads, plus the existing-row half of updates/deletes). `WITH CHECK` constrains rows the user can *write* (inserts, plus the resulting-row half of updates). Most multi-tenant policies use the same predicate for both, but they are independent — a misconfigured policy can let a tenant `INSERT` a row with another tenant's `tenant_id` even though they cannot `SELECT` it. Always define both, and write a test that asserts cross-tenant `INSERT` fails.

The session-variable pattern is the most common, but not the only, way to deliver tenant identity to a policy. Alternatives include:

- **Role-per-tenant.** Each tenant gets a Postgres role; policies use `current_user`. Doesn't scale past a few hundred roles (role enumeration cost, pg_authid bloat) and breaks connection pooling badly. Skip.
- **JWT-claim via Supabase / PostgREST.** A `request.jwt.claim.tenant_id` GUC set from the JWT in the gateway. Functionally equivalent to `app.tenant_id`; just a different namespace. Same pitfalls.
- **Per-connection role with `SET ROLE`.** Stronger isolation (the *role* enforces policy membership) but breaks transaction-level pooling. Used by some HIPAA-conscious deployments paired with session-level pooling.

For new platforms, default to the GUC pattern shown above with `SET LOCAL` and disciplined verification. The other patterns are not wrong — they trade complexity for properties you may not need.

---

## Failure Modes

The four production-fire modes below account for essentially every published RLS leak through 2025. None of them is exotic; all of them are silent without testing.

### bypass-via-SECURITY-DEFINER

**Mechanism:** a `SECURITY DEFINER` function executes with the *definer's* privileges, not the caller's. If the definer is a role that bypasses RLS (owner of the table, or a role with `BYPASSRLS`), the function reads every tenant's rows regardless of `app.tenant_id`. Common in helper functions written by junior engineers ("just gives me a count of stuff") and in extension packages that ship with `SECURITY DEFINER` for legitimate reasons (like `pg_stat_statements` helpers).

**Concrete example:**

```sql
-- Looks innocuous; ships in a "stats helpers" file.
CREATE FUNCTION count_invoices() RETURNS bigint
  LANGUAGE sql
  SECURITY DEFINER
  AS $$ SELECT count(*) FROM invoices $$;

-- Function is owned by the migration role, which also owns invoices.
-- ENABLE ROW LEVEL SECURITY without FORCE → owner bypasses policy.
-- Any tenant calling SELECT count_invoices() now gets the global count.
```

**Mitigations:**

- Default to `SECURITY INVOKER` (Postgres default). Only use `SECURITY DEFINER` when there is a documented reason and a code reviewer approves it.
- `ALTER TABLE ... FORCE ROW LEVEL SECURITY` on *every* tenant-scoped table. Owners no longer bypass.
- Audit every `SECURITY DEFINER` function quarterly: `SELECT n.nspname, p.proname, p.prosecdef FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE prosecdef AND nspname NOT IN ('pg_catalog','information_schema');`. Every row in that result set is a potential policy-bypass surface. Document each.
- For `SECURITY DEFINER` functions that legitimately need to span tenants (rare — typically admin reporting), make them call `set_config('app.tenant_id', ...)` from a known-safe argument and re-enable RLS within the function body. Don't lean on the definer privilege to do tenant filtering.

### missed-policies-on-new-tables

**Mechanism:** a developer adds a new tenant-scoped table in a migration. They remember to add the `tenant_id` column. They forget `ENABLE ROW LEVEL SECURITY`. The migration ships. The table is queryable cross-tenant from day one, and no test catches it because the test suite only covers tables that existed when the suite was written. This is the **most common** RLS leak in production. Every published incident in the 2023–2025 window includes at least one new-table miss in the timeline.

**Concrete example:**

```sql
-- Migration 20240712_add_audit_log.sql
CREATE TABLE audit_log (
    id          bigserial PRIMARY KEY,
    tenant_id   uuid NOT NULL,
    actor_id    uuid,
    event       text NOT NULL,
    payload     jsonb,
    occurred_at timestamptz NOT NULL DEFAULT now()
);
-- ENABLE ROW LEVEL SECURITY <-- forgotten
-- CREATE POLICY ...           <-- forgotten
```

Until this is caught, any tenant with read access to `audit_log` reads every other tenant's audit trail — including, often, security-sensitive events.

**Mitigations:**

- **CI gate** that fails any PR introducing a new table without `ENABLE ROW LEVEL SECURITY` + at least one policy. A simple regex/AST check over migrations directory works for 90% of cases; pair with a Postgres-side check after migrations apply: `SELECT c.relname FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid WHERE n.nspname = 'public' AND c.relkind = 'r' AND NOT c.relrowsecurity;` — every row is a missed table.
- **Default-deny event trigger** that ALTERs every newly-created table in tenant schemas to `ENABLE ROW LEVEL SECURITY` with a deny-all policy. Forces developers to add a *real* policy explicitly rather than forgetting; cheap to install, high signal.
- **Migration code review** check: every migration that creates a table on the tenant schema must have an RLS section. Add it to the PR template.
- **Daily Postgres job** that emits a metric for `count(*) where relrowsecurity = false in tenant schemas`. Alert on any non-zero value. This is the backstop for the other mitigations failing.

### performance-cliff-at-high-tenant-count

**Mechanism:** at low tenant counts, the planner constant-folds `tenant_id = current_setting('app.tenant_id', true)::uuid` into the equivalent of `tenant_id = '<literal>'` and uses the `tenant_id` index optimally. As tenant count, policy complexity, or query complexity grow, two things happen:

1. **Plan-cache pressure.** Postgres caches plans per-statement. With RLS, a parameterized statement's plan depends on the *role* and the *GUC value* through the policy, so the cache can fragment in surprising ways. p99 latency stays stable, but p99.9 spikes as plans get re-generated under load.
2. **Predicate complexity.** Real policies are often more than `tenant_id = $1`. They include role checks, soft-delete filters, time-window filters. The planner cannot always constant-fold these; some become run-time evaluations that materialize unexpectedly large intermediate sets.

Empirically, the cliff appears between 1,500 and 3,000 active tenants per Postgres instance on commodity hardware for typical OLTP workloads. The transition is not a smooth degradation — it is a phase change. Latency p99 goes from 4 ms to 40 ms over the course of a week as traffic grows.

**Concrete example:** policy uses a sub-select to check tenant membership in a CTE, which the planner refuses to inline; every query against the table now does a hash join against the membership table. At 50 tenants, the membership table fits in L3 cache and the join is sub-millisecond. At 5,000 tenants, the join spills and the query goes from 2 ms to 35 ms.

**Mitigations:**

- **Keep policy predicates simple.** Equality against a GUC or a `current_user` is the gold standard. Avoid sub-selects in `USING` clauses where you can; pre-compute membership at the application layer.
- **Measure planner overhead with `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)`** for representative queries at representative tenant counts. Do this *before* shipping to production scale, not after. The number that matters is the difference between RLS-enabled and RLS-disabled plan cost for the same logical query. A 5% gap is fine; a 10x gap is a future incident.
- **Partition by `tenant_id`** when single-instance tenant count exceeds ~1,000 active. Partition pruning lets the planner skip non-matching partitions before RLS even fires. Pairs with RLS rather than replacing it.
- **Read replicas with tenant-affinity routing.** Route each tenant's queries to a chosen replica. Effective at moderate scale (up to ~5k tenants) before you commit to schema-per-tenant or cell-based.
- **Plan a re-evaluation at 1,500 active tenants.** Capture the framework's [[tenancy-decision-framework]] re-eval trigger in the original tenancy-model.md output. Don't wait for the cliff to find you.

### bypass-via-BYPASSRLS-and-pool-role-leakage

**Mechanism:** a Postgres role with the `BYPASSRLS` attribute, or a superuser role, ignores RLS entirely. This is correct behavior — admin tooling needs it, replication needs it, `pg_dump` benefits from it. The failure mode is when one of these roles is *reachable from a connection that is supposed to be an application connection*:

- **PgBouncer admin port** is reachable from a network position attackers can occupy.
- **Application code uses the migration role** (or any `BYPASSRLS` role) for connection pooling because "it's simpler". Every request through the pool now bypasses every policy.
- **Worker / background-job processes** use a privileged role to fan out across tenants, but reuse the same connection (or pool entry) for a tenant-scoped request later in their lifecycle, without resetting role or RLS context.
- **Session-pooling at PgBouncer** lets a `SET ROLE bypassrls_admin` from one request leak into the next request that gets the same connection. Transaction-pooling avoids this for `SET LOCAL` but *not* for plain `SET ROLE` or plain `SET` — and only if your app uses `SET LOCAL` consistently.

**Concrete example:**

```sql
-- Migration role has BYPASSRLS for one-shot data fixes.
ALTER ROLE migration_user WITH BYPASSRLS;

-- Worker process uses migration_user "because it has all the perms it needs"
-- to backfill a column across all tenants. Worker finishes; connection returns
-- to pool. Next request (different tenant, normal traffic) gets that connection.
-- Now the request runs as migration_user with BYPASSRLS active. Every read in
-- the request crosses tenants.
```

**Mitigations:**

- **Audit `BYPASSRLS` and `SUPERUSER` roles quarterly.** `SELECT rolname, rolbypassrls, rolsuper FROM pg_roles WHERE rolbypassrls OR rolsuper;` — every row needs documented justification and a named owner. Remove `BYPASSRLS` from any role that is reachable from application traffic.
- **Separate connection pools by role.** Application traffic uses a pool whose configured role is `application_user` (no `BYPASSRLS`, no `SUPERUSER`). Maintenance traffic uses a separate pool, on a separate port, with admin role. Don't multiplex.
- **Reject `SET ROLE` from application connections.** Use a Postgres `event trigger` or an `ALTER ROLE ... NOSET` strategy where possible. At minimum, log every `SET ROLE` from application contexts to a SIEM and alert.
- **Use `SET LOCAL` for tenant binding, always.** Combined with transaction-level pooling, this guarantees tenant context dies at commit. Document this in the migration discipline section of your runbook.
- **For workers that span tenants:** use a *separate* connection acquisition per tenant, with its own `SET LOCAL` at the start. Never reuse a connection across tenants without resetting context.

---

## Operational Patterns

RLS is a code mechanism but it lives or dies on operational discipline. The patterns below are mandatory for any production RLS deployment.

**Connection pool tenant binding.** PgBouncer is the de facto pooler; Supavisor and PgCat are gaining ground. Mode selection matters:

- *Transaction pooling* (the common multi-tenant default) returns the connection to the pool at `COMMIT`. `SET LOCAL` is required for tenant binding — plain `SET` will leak. Prepared statements at the application layer need careful handling; PgBouncer 1.21+ supports them, older versions silently break them.
- *Session pooling* keeps the connection bound to the client for the session's lifetime. Plain `SET` is acceptable, but throughput suffers (one client = one connection). Some HIPAA-conscious deployments accept the throughput cost in exchange for the simpler mental model.
- *Statement pooling* is incompatible with RLS — `SET LOCAL` cannot span statements. Don't use it.

Document the chosen mode in the platform runbook. Switching modes later requires reviewing every `SET` site in the codebase.

**Migration discipline.** Every migration touching tenant-scoped tables must:

1. Add `ALTER TABLE <name> ENABLE ROW LEVEL SECURITY;` and `ALTER TABLE <name> FORCE ROW LEVEL SECURITY;` in the same migration as the `CREATE TABLE`.
2. Add at least one `CREATE POLICY` with both `USING` and `WITH CHECK` clauses (or two policies covering reads and writes separately).
3. Add a test in the isolation test suite ([[tenant-isolation-testing-patterns]]) that asserts cross-tenant reads return zero rows.
4. Run a post-migration check that `relrowsecurity = true` on the new table and at least one policy exists in `pg_policies` for it.

These are *non-negotiable* steps. Encode them in the migration template, the PR template, and the CI gate. Document the rationale once in the platform runbook so future engineers understand why the checklist is rigid.

**Linter and CI integration.** Tooling that catches RLS hazards before they ship:

- **`squawk`** for migration linting. Catches missing `ENABLE ROW LEVEL SECURITY` patterns via custom rules; integrates with GitHub Actions.
- **`sqlparse` / custom AST checks** for application code: flag any `SET ROLE`, any `SECURITY DEFINER` function definition, any reference to a `BYPASSRLS` role.
- **Post-migration Postgres queries** in CI: `pg_policies` row count per table, `relrowsecurity` flag check, `BYPASSRLS` role audit.
- **Snapshot test** that runs the full RLS test suite (cross-tenant SELECT, INSERT, UPDATE, DELETE assertions) against every PR.

**Role hygiene.** Production Postgres should have at minimum these roles, each with a single owner and documented purpose:

- `application_user` — no `BYPASSRLS`, no `SUPERUSER`. The role the connection pool authenticates as. Only this role serves customer traffic.
- `migration_user` — owns tenant tables. May have `BYPASSRLS` (needed for some operations). Reachable only from CI/CD migration jobs; *not* reachable from application network paths.
- `replication_user` — for streaming replication and logical replication. `REPLICATION` attribute. No application access.
- `admin_user` — superuser, reachable only from operator workstations over a VPN/bastion. Audited.

Workers, cron jobs, and batch processes should use *application-grade* roles unless they have a documented reason to escalate, and the escalation should be per-task, not per-process.

**Observability.** Per-tenant metrics are valuable in RLS but expensive at scale (cardinality on `tenant_id`). Strategies:

- Tag a sampled subset of metrics with `tenant_id` for the top-N noisy tenants; aggregate the rest.
- Log every query with `tenant_id` and `session_id` to a SIEM for forensic replay; do *not* index by `tenant_id` in your observability vendor (cardinality cost) — use the SIEM for ad-hoc tenant queries.
- Track `pg_stat_statements` aggregated per query template; surface plans that show `Filter:` rather than `Index Cond:` on `tenant_id` — those are the RLS planner-overhead canaries.

**Backup and restore.** Pooled RLS makes per-tenant restore harder than schema-per-tenant. Document the chosen strategy:

- Whole-database backups via WAL archiving + `pg_basebackup`. Per-tenant restore = restore-to-staging + filter-and-replay. Slow but deterministic.
- Logical backups per-tenant via `pg_dump` with `--table` and a `WHERE tenant_id = ...` (Postgres 16+ via `COPY ... WHERE`, earlier via app-level dump). Faster per-tenant restore but more complex.
- A scheduled "exercise" of the per-tenant restore path quarterly. RLS deployments that never test per-tenant restore find it broken when they need it.

---

## Trade-offs

Comparing RLS against the alternatives surfaced by [[tenancy-decision-framework]]. Numbers are calibrated against production deployments through 2026; treat as orienting, not authoritative.

| Dimension | RLS (this fragment) | Schema-per-tenant | Cell-based | App-level filtering only |
|---|---|---|---|---|
| **Active tenant fit** | Best ≤ ~1,000 per instance; usable to ~3,000 with partitioning + replicas | Best 100–3,000 per cluster | Best 1,000–100,000+ | Any (but isolation strength is the lowest) |
| **Marginal cost per tenant** | $0.50–$3 / mo at SMB scale | $3–$10 / mo | $10–$80 / mo (drops with cell density) | $0.20–$1 / mo (but counts compliance / incident risk separately) |
| **Isolation strength** | Logical only — policy is the entire boundary | Schema + role grants; still single OS process | Physical; separate DBs / networks / accounts | None at DB layer; isolation = app correctness |
| **Audit story** | SOC2 OK with policy tests; HIPAA borderline; PCI scope-able; FedRAMP-High no | SOC2/HIPAA/PCI good; FedRAMP-Mod OK; FedRAMP-High borderline | All frameworks including FedRAMP-High, IL4, IL5, CJIS | SOC2 minimum effort; everything else hard |
| **Per-query overhead** | 0.5–8 ms (simple policy: 0.5–2 ms; complex policy: 5–8+ ms) | Near-zero | Near-zero per cell; routing layer adds 1–5 ms | Zero (just an app `WHERE`) |
| **Per-tenant ops surface** | Low — one cluster, one deploy, one backup | Medium — per-schema migrations, per-tenant backup | High — per-cell pipelines, control plane | Lowest at infra layer; highest in app-code review |
| **QPS ceiling on single instance** | ~5–10k QPS at <500 tenants on commodity hardware; ~2–3k at 1,500 tenants | ~10–15k QPS (no planner overhead) | Scales horizontally | Same as raw Postgres |
| **Migration cost to next tier** | RLS → schema: ~1 engineer-week + ~5 min/tenant. RLS → cell: 3–6 engineer-months | Schema → cell: 2–4 engineer-months | Effectively terminal | App-only → RLS: 2–4 engineer-weeks |
| **Failure mode density** | High — 4 documented silent-failure modes, all common in production | Medium — schema enumeration, migration explosion | Low — failures are loud (cell down, routing miss) | Highest — every developer is a potential vector |

**Reading the table:**

- **vs schema-per-tenant:** RLS wins on cost and ops simplicity at low tenant count. Schema wins on per-query overhead, per-tenant backup/restore, and the audit story. Crossover point sits around 500 active tenants for typical mid-market SaaS; the right answer is to *plan* the migration before you hit it, not after.
- **vs cell-based:** RLS is structurally cheaper. Cell-based is structurally safer. Cell-based becomes necessary at >1,500 active tenants or under FedRAMP-High; RLS remains preferable below that line.
- **vs app-level filtering only:** RLS is *belt-and-suspenders* on top of app-level filtering. Don't replace `WHERE tenant_id = ?` in your queries with RLS — keep both. RLS is the safety net for the day a developer forgets the `WHERE` clause. Removing the explicit filter trades one defense for one.

---

## Quality Checks

These checks apply before merging an RLS-based tenancy design to platform main, and again as a quarterly review.

- **CRITICAL:** every new tenant-scoped table must have RLS enabled AND a policy defined; migration discipline must enforce this via CI. A new table without RLS is a leak from the moment the migration runs. The CI gate must be a *required* check, not advisory. Post-migration verification via `pg_class.relrowsecurity` and `pg_policies` count is the backstop. Skipping this control has been the root cause of every published RLS leak through 2025 — do not skip.

- **pg_policies coverage report.** For every tenant-scoped table, `SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = '<table>'` returns ≥1. Run as a daily job; alert on zero. Maintain a manifest of tenant-scoped tables alongside the migrations directory to make "tenant-scoped" mechanically determinable.

- **BYPASSRLS role audit.** Quarterly: `SELECT rolname FROM pg_roles WHERE rolbypassrls OR rolsuper;` — every row is reviewed by a security engineer, has a named owner, and is *unreachable from application network paths*. Remove `BYPASSRLS` from any role that does not need it; rotate ownership when an owner leaves.

- **FORCE ROW LEVEL SECURITY on all tenant-scoped tables.** `SELECT relname FROM pg_class WHERE relrowsecurity AND NOT relforcerowsecurity AND relnamespace = 'public'::regnamespace;` returns zero rows. Without `FORCE`, table owners (often the migration role) bypass policies — a latent leak when migration code paths re-enter at runtime.

- **SECURITY DEFINER inventory.** Every `SECURITY DEFINER` function in tenant schemas has a documented justification, a named owner, and a code-review approval. Treat the list as a security-budget item; pressure to shrink it over time. New `SECURITY DEFINER` functions require principal-level review.

- **Policy predicate complexity budget.** No policy `USING` clause contains a sub-select unless paired with a measured plan and a regression test. Simple equality against a GUC is the gold standard. When complex predicates are unavoidable, the plan is measured at representative tenant counts (e.g., 100, 500, 1500) and the difference between RLS-on and RLS-off latency is documented.

- **Isolation test suite exists and is run on every PR.** Tests assert: (a) cross-tenant SELECT returns zero rows, (b) cross-tenant INSERT raises `new row violates row-level security policy`, (c) cross-tenant UPDATE updates zero rows, (d) cross-tenant DELETE deletes zero rows. Each tenant-scoped table is in the test matrix; missing-table coverage is itself a failing test. Cross-reference [[tenant-isolation-testing-patterns]].

- **Performance regression test at scale.** Spin up a synthetic 1,500-tenant dataset in CI nightly; run representative queries; measure p99 latency. Fail the build on >20% regression. The cliff in [[#performance-cliff-at-high-tenant-count]] only appears at scale; small-N tests miss it.

- **Per-request `SET LOCAL` discipline.** Application code uses `SET LOCAL app.tenant_id = ...` at the start of every transaction; never plain `SET`. A linter or AST check verifies this in CI. Plain `SET` paired with transaction pooling is a tenant-leak in waiting.

- **Connection pool mode documented and locked.** The chosen pool mode (transaction / session) is documented in the platform runbook. Changes to pool mode require a security review because they invalidate `SET LOCAL` assumptions.

- **Re-evaluation trigger captured.** The tenancy-model.md output includes a re-evaluation trigger ("re-run the framework at 1,500 active tenants OR upon first FedRAMP-Moderate customer signing"). RLS-based designs that omit this trigger end up at the performance cliff with no plan.

- **Reviewer rotation.** RLS designs are reviewed by at least one engineer who is *not* the author. For HIPAA / PCI scope or for migrations between tenancy models, escalate to a principal-level reviewer. Self-review of RLS is empirically insufficient — too many subtle failure modes.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh the empirical inputs. RLS *mechanism* is stable across Postgres versions, but *thresholds* and *tooling* shift annually.

- `PostgreSQL RLS performance at scale {date}` — surfaces planner-overhead benchmarks across Postgres major versions. Watch for posts that compare RLS-on vs RLS-off latency at 100, 1k, 10k tenant counts. Treat single-data-point benchmarks as orientation, not ground truth.
- `RLS bypass attacks {date}` — security research and public incident write-ups. Stripe, GitHub, Supabase, and Heroku have all published either bypass research or post-incident reports. Cross-link findings into your threat model.
- `pg_policies introspection patterns {date}` — operational guidance on querying `pg_policies`, `pg_class.relrowsecurity`, `pg_class.relforcerowsecurity` for compliance and policy-coverage reports. Useful for the daily-job and CI-gate implementations.
- `PostgreSQL SECURITY DEFINER vulnerabilities {date}` — patterns for safe `SECURITY DEFINER` use; common exploitation patterns; auditor-facing checklists.
- `pgbouncer transaction pooling SET LOCAL {date}` — operational guidance on pool-mode interactions with `SET LOCAL`, prepared statements, and pooled RLS designs. Watch for PgCat and Supavisor write-ups as alternatives.
- `Supabase row level security best practices {date}` — Supabase's tutorials and reference architectures encode hard-won RLS lessons; useful even if you are self-hosting Postgres.
- `multi-tenant Postgres partition by tenant_id {date}` — partitioning patterns that pair with RLS to extend the per-instance ceiling beyond ~1,500 tenants.
- `Postgres BYPASSRLS audit query {date}` — operational queries for role hygiene; cross-link with the BYPASSRLS audit quality check above.

When a query returns content older than 18 months, treat as orientation only. The Postgres pooler and serverless-Postgres landscape (Neon, Supavisor, Aurora DSQL, PgCat) is shifting fast enough that 2-year-old guidance may be stale on the *tooling* even if the *mechanism* still holds.

### Source-quality heuristics

- **Postgres official docs.** Ground truth for the mechanism. Read the actual `CREATE POLICY` and `ALTER TABLE ... ROW LEVEL SECURITY` reference pages, not blog summaries.
- **Vendor write-ups** (Supabase, Neon, Stripe, GitHub). High signal on real-world failure modes; biased toward their own platforms' guard-rails.
- **Security research / CVE reports.** Treat as ground truth on bypass mechanisms; subscribe to the Postgres security mailing list.
- **Auditor-facing guidance.** ISACA, CSA, HHS. Useful for the compliance-scope conversation; rarely prescriptive about RLS specifically.

---

## Cross-references

**Companion fragments:**

- [[tenancy-decision-framework]] — the upstream decision aid that produces an RLS recommendation in the first place. This fragment is the deep-dive consulted *after* the framework leaf lands on RLS. Defects in RLS scoping should propagate back to the framework as input clarifications, not stay localized here.
- [[schema-per-tenant]] — the most common upgrade target when RLS hits its ceiling. Read this fragment when planning the migration path captured in tenancy-model.md §4.
- [[cell-based-architecture]] — the cell-based alternative; relevant when compliance scope or tenant count moves out of RLS's envelope.
- [[tenant-isolation-testing-patterns]] — the test catalog that enforces RLS correctness at QG-M2. Every RLS deployment depends on this suite being green; do not treat tests as optional.

**Implementation patterns:**

- [[rls-row-level-security]] — concrete policy templates, session-variable patterns, common policy pitfalls (recursive policies, policies on views vs base tables, policy-evaluation order). The hands-on companion to this fragment.
- [[schema-per-tenant-with-pgbouncer]] — connection-pool topology for schema-per-tenant deployments; relevant when planning the migration target.
- [[secrets-and-roles-postgres]] — role and secret hygiene patterns; cross-link for the BYPASSRLS audit and role separation discussion.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/data/checklists/qg-m2-tenant-isolation.md`) — the gate this fragment's recommendations feed. Every RLS-based tenancy-model.md MUST clear QG-M2 before merging to platform main, and the isolation test suite from [[tenant-isolation-testing-patterns]] must be green.

**Related decisions:**

- RLS choice interacts with **observability cardinality**: per-tenant metrics on a pooled RLS cluster cost more than on schema-per-tenant (every metric needs a `tenant_id` tag). Surface this trade-off in tenancy-model.md §6 (Ops implications).
- RLS choice interacts with **billing / metering**: per-tenant metering in pooled RLS requires `tenant_id` propagation through every event; in schema-per-tenant the schema is the natural metering boundary.
- RLS choice constrains **AI-runtime tenant scoping** (Nova module, P3+). Vector stores, prompt caches, and agent memory all need a tenant boundary; an RLS-based platform usually extends RLS into pgvector tables for embedding storage. Plan this propagation.
- RLS choice influences the **support-engineer experience**: ad-hoc `psql` for incident response on a pooled RLS cluster is a privilege-escalation risk (the support engineer's role probably has `BYPASSRLS`). Document the support workflow.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice), §6.2 (frontmatter schema). Defects to this fragment's structure should be filed as spec patches, not unilateral changes.
- `std-frontmatter.md`, `std-validation.md` (this module's standards). The frontmatter above conforms to `std-frontmatter`.

**Downstream consumers:**

- `design-tenancy-model` skill (`src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/`) — primary consumer. When the skill's traversal of [[tenancy-decision-framework]] lands on RLS, `step-05-c-write-design` references this fragment for the rationale, ops implications, and isolation-tests-required sections.
- Atlas memory (`_bmad/_memory/atlas/architecture-decisions/`) — every RLS-based ADR should reference this fragment by id (`rls-deep-dive`) for the rationale's mechanism description.
