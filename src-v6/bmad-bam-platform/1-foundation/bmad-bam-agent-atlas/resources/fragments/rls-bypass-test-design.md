---
id: rls-bypass-test-design
title: RLS Bypass Test Design
category: tenant-isolation
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [rls, bypass, testing, security-definer, bypassrls, set-role, search-path, with-check, multi-tenant]
references:
  - "PostgreSQL Documentation: Row Security Policies (current.docs.postgresql.org/sql-createpolicy)"
  - "OWASP Application Security Verification Standard V13 (API Security)"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rls-deep-dive.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-isolation-testing-patterns.md"
---

# RLS Bypass Test Design

This fragment specifies the **test design vocabulary** for RLS-bypass verification — the must-have test specs in `test-catalogue.json#tests[]` whose `category: rls-bypass`. Generic cross-tenant SELECT/INSERT tests catch the obvious paths but miss the model-specific bypass techniques that all published cross-tenant leaks 2022-2025 actually exploited: `SECURITY DEFINER` functions silently bypassing RLS; `BYPASSRLS`-flagged roles reachable from the application port; `SET ROLE` privilege escalation via injection; `search_path` manipulation reading rows that aren't supposed to be reachable; missing `WITH CHECK` clauses allowing cross-tenant INSERT smuggling. These are the bypass surfaces; this fragment is the test-design catalogue for proving each one is closed.

The point of this fragment is **specifying** the tests (id, evidence_signature, traceable_to) — not authoring the test code itself. Downstream BMM `bmad-qa-generate-e2e-tests` consumes the catalogue and emits the test files in your repo's test framework (pytest/jest/etc.); the catalogue is the contract those files satisfy.

A green cross-tenant SELECT test against an RLS deployment with a single `SECURITY DEFINER` aggregator function passes for the right reason (RLS planner constant-folds `tenant_id = current_tenant_id()`) and lulls reviewers into thinking the deployment is safe. Meanwhile the aggregator function reads from all tenants, returns the sum, and the application surface exposes that sum to every tenant. This is the most common RLS-bypass failure mode in the post-incident record, and the most-missed test category in QG-M2 review.

---

## When to Use

- **Any production deployment using row-level-security as a primary or hybrid mechanism.** The test category is mandatory at QG-M2 sign-off when `tenancy-decision.json#tenancy_model == "row-level-security"` OR `hybrid_resolution[*]` includes `row-level-security`. The catalogue's `coverage_report.rls-bypass.must_have ≥ 1` invariant in `bmad-bam-design-multi-tenant-testing`'s step-07-v enforces this.

- **After authoring any `SECURITY DEFINER` function whose body touches a tenant-scoped table.** Every new `SECURITY DEFINER` function is a new bypass surface. Add a test (or extend an existing test) before merging the function's PR.

- **After authoring any new `WITH CHECK` policy or modifying an existing one.** RLS `WITH CHECK` is the asymmetric counterpart to `USING` — it controls INSERT/UPDATE row-eligibility, while `USING` controls SELECT row-visibility. A new policy that has `USING` but no `WITH CHECK` (the most common mistake) allows cross-tenant INSERT smuggling: the row evaluates as inserting tenant_b's row from tenant_a's session, succeeds because `WITH CHECK` is absent, then becomes a polluted state for downstream reads. Test must exercise the asymmetry.

- **After connection-pool configuration changes (pgbouncer, RDS Proxy, pgcat).** Connection pooling layers can leak `SET LOCAL` context across tenants if `server_reset_query` is missing or misconfigured. The RLS-bypass tests asserting `DISCARD ALL`-equivalent behavior at server-release catch this regression. Re-run the suite after any pool config change.

- **After role-permission changes in the database.** `BYPASSRLS` role attribute, grants of `SET ROLE` capability, and ownership changes on tenant-scoped tables can all silently re-open bypass paths. The test asserting `bypassrls_admin` is unreachable from the app pool catches this.

- **After cross-tenant analytics features ship.** Features that aggregate across tenants (admin dashboards, billing roll-ups, observability) often use `SECURITY DEFINER` helpers that bypass RLS by design. The risk: the helper gets called from a tenant-facing endpoint by accident. Test must enumerate every `SECURITY DEFINER` function and assert tenant-faced endpoints don't reach them.

- **Quarterly at minimum, regardless of code change.** The published-incident record shows RLS bypasses sometimes surface from unrelated changes (a Postgres minor-version upgrade altered planner behavior; a sysadmin granted a role for an unrelated reason; a third-party tool was installed that created a function with `SECURITY DEFINER` defaulted). Quarterly cadence catches drift.

---

## When NOT to Use

- **Tenancy model has no RLS in scope.** Pure schema-per-tenant or pure cell-based deployments have different bypass surfaces (search_path manipulation; routing-cache staleness). Use those models' bypass test fragments instead. RLS-bypass tests here are not applicable.

- **The test catalogue says so.** If `test-catalogue.json#coverage_report.rls-bypass.must_have == 0` AND `tenancy_model` does not include row-level-security, the project has correctly excluded this category. Validate against the catalogue, not against blanket policy.

- **Read-only analytics replica with no `SECURITY DEFINER` and no role escalation surface.** A read-only follower inherits the upstream's RLS state; if the replica role lacks `BYPASSRLS` and the replica has no app-tier `SECURITY DEFINER` functions, the bypass surface reduces to the upstream's. Document the assumption; do not duplicate the upstream's full suite.

- **Pre-tenancy-lock prototype.** Before tenancy is locked, the RLS primitive is aspirational. Defer the bypass suite until the model is locked.

---

## Architecture: bypass surface enumeration

The RLS-bypass tests target six distinct surfaces. Each gets at least one must-have test entry in the catalogue.

### Surface 1: `SECURITY DEFINER` function injection

**Mechanism.** A `SECURITY DEFINER` function runs as the function's *owner*, not the caller. If the owner has higher privileges than the caller (typically), the function bypasses RLS for the duration of its execution unless the owner also has `BYPASSRLS = false` (the default for non-superuser roles) AND the function explicitly carries `SET row_security = on`. Without those guards, the function reads from all tenants regardless of who calls it.

**Test entry.** Catalogue id `BYP-001`:
```
id: BYP-001
name: security-definer-function-respects-rls
evidence_signature: every SECURITY DEFINER function called as tenant_a returns only tenant_a rows
```

**Discovery query (CI-runnable):**
```sql
SELECT p.proname, p.prosecdef, p.proconfig, r.rolname AS owner, r.rolbypassrls
  FROM pg_proc p
  JOIN pg_roles r ON p.proowner = r.oid
  JOIN pg_namespace n ON p.pronamespace = n.oid
 WHERE n.nspname IN ('public', 'app')
   AND p.prosecdef = true;
```

Every row returned by this query is a bypass surface. The test enumerates them and asserts each returns tenant-scoped results when called from a tenant_context.

### Surface 2: `BYPASSRLS` role reachability

**Mechanism.** A role with `BYPASSRLS = true` (or one inheriting from such a role) reads all rows regardless of policy. If the application's connection pool authenticates as a role that inherits `BYPASSRLS`, all queries silently bypass RLS. Common misconfiguration: granting `app_user` membership in `monitoring_role`, where `monitoring_role` has `BYPASSRLS` for observability convenience.

**Test entry.** Catalogue id `BYP-002`:
```
id: BYP-002
name: bypassrls-role-not-reachable-from-app-port
evidence_signature: SET ROLE bypassrls_admin from app pool raises permission denied
```

**Discovery query:**
```sql
SELECT r.rolname, r.rolbypassrls
  FROM pg_roles r
 WHERE r.rolbypassrls = true;
-- Cross-reference with application-pool-role's pg_auth_members chain.
```

Test asserts no path exists from the application pool's role to any role with `BYPASSRLS = true`.

### Surface 3: `SET ROLE` privilege escalation

**Mechanism.** If the application's `app_user` role has `GRANT SET ROLE ON migration_user TO app_user`, then a SQL-injection vector or a careless application path can issue `SET ROLE migration_user` and escalate. Migration users typically have broader privileges including `BYPASSRLS`.

**Test entry.** Catalogue id `BYP-003`:
```
id: BYP-003
name: set-role-escalation-rejected
evidence_signature: SET ROLE migration_user from application_user raises permission denied
```

**Test logic.** Open a connection as `app_user`, issue `SET ROLE migration_user`, assert `permission denied` is raised.

### Surface 4: `search_path` manipulation

**Mechanism.** Postgres `search_path` controls schema resolution for unqualified table references. Although RLS is per-table (not per-schema), a `search_path` change can route a query to a different table than the developer expected — and if that table doesn't have RLS enabled, the query returns rows unfiltered. Most common in mixed-schema deployments where tenant-scoped tables live in `public` but a shadow table without RLS exists in another schema.

**Test entry.** Catalogue id `BYP-004`:
```
id: BYP-004
name: search-path-manipulation-does-not-bypass-rls
evidence_signature: SET LOCAL search_path with tenant_context returns only own rows
```

**Test logic.** Set `tenant_context(tenant_a)`, then `SET LOCAL search_path = public, pg_catalog`, then `SELECT * FROM invoices`. Assert all returned rows have `tenant_id = tenant_a`.

### Surface 5: missing `WITH CHECK` (INSERT smuggling)

**Mechanism.** RLS `WITH CHECK` controls row-eligibility for INSERT/UPDATE; `USING` controls row-visibility for SELECT/DELETE. A policy that has only `USING` allows: from tenant_a's session, INSERT a row tagged with `tenant_id = tenant_b`. The INSERT succeeds (no `WITH CHECK` to reject); the row enters the table tagged as tenant_b's. Subsequent tenant_b SELECTs return the smuggled row.

**Test entry.** Catalogue id `BYP-005`:
```
id: BYP-005
name: with-check-rejects-cross-tenant-insert
evidence_signature: INSERT with foreign tenant_id raises "new row violates row-level security policy"
```

**Test logic.** Open connection as tenant_a, attempt `INSERT INTO invoices (id, tenant_id, amount) VALUES (gen_random_uuid(), tenant_b_uuid, 100)`. Assert Postgres error message contains `new row violates row-level security policy`.

### Surface 6: missing `FORCE ROW LEVEL SECURITY`

**Mechanism.** By default, a table's owner is exempt from RLS even when policies are enabled. `FORCE ROW LEVEL SECURITY` removes the owner exemption. Without it, the table's owner role (often the migration user, sometimes the application user) reads all rows.

**Test entry.** Catalogue id `BYP-006`:
```
id: BYP-006
name: force-row-level-security-on-tenant-scoped-tables
evidence_signature: pg_class scan: every tenant-scoped table has relrowsecurity AND relforcerowsecurity
```

**Test logic.** Query `pg_class` for every table listed in `tenant_scoped_tables.yaml`; assert both `relrowsecurity = true` AND `relforcerowsecurity = true`.

---

## Trade-offs

| Test design choice | Pro | Con |
|---|---|---|
| Enumerate all `SECURITY DEFINER` functions vs. spot-check known ones | Catches new functions added in code without test update | Test query scans `pg_proc` on every run (~50ms) |
| Test against synthesized SQL injection vectors vs. only happy-path bypass attempts | Catches injection-amplified bypass | More brittle test fixtures; require sample payloads |
| Assert specific Postgres error messages (string match) vs. just exception class | Pinpoints failure mode (RLS-policy denial vs. type error vs. constraint) | Brittle to PG version upgrades (error strings can shift) |
| Run bypass tests against per-test fresh DB vs. shared DB with rollback | Isolation between tests; no order-dependence | Slower; testcontainers spinup per test |
| Include schema-per-tenant + cell-based bypass tests when hybrid_resolution mixes mechanisms | Complete coverage of mixed-mechanism attack surface | Larger catalogue; more must-have tests |

---

## Implementation Patterns

(M1 polish — explicit Implementation Patterns section per spec §6.3; previously folded inline with Architecture surface enumeration.)

**Pattern 1 — SECURITY DEFINER discovery query.** CI job runs:

```sql
SELECT proname, prosrc FROM pg_proc
WHERE prosecdef = true
  AND pronamespace IN (SELECT oid FROM pg_namespace WHERE nspname IN ('public', 'app'));
```

Output is diffed against expected-functions registry; any new function without test entry fails the build.

**Pattern 2 — Role-elevation attempt test.** Each `SECURITY DEFINER` function gets a paired test: connect as low-privilege role, attempt to call the function with `tenant_id` argument different from the session's `tenant_id`. Test asserts: function MUST verify session tenant_id matches argument tenant_id OR raise exception. Required failure mode: matches `/permission denied|RLS policy violation/`.

**Pattern 3 — Function-call escape attempt.** Issue SQL like `SELECT some_security_definer_func() FROM tenant_data WHERE ...` that attempts to read `tenant_data` via the function's RLS bypass. Test asserts: rows returned are filtered correctly by session `tenant_id` (no rows for foreign-tenant queries).

**Pattern 4 — `SET ROLE` / `SET row_security` lint hook.** Application-code grep + lint rule that flags any `SET ROLE` or `SET row_security` statement in source. Test asserts: production source has zero matches.

**Pattern 5 — `pg_roles.rolbypassrls` quarterly audit.** Cron job queries `pg_roles WHERE rolbypassrls = true` and emits report. Test asserts: every role in the result has an owner + business-justification entry in `_bmad/bam/evidence/QG-M2/bypassrls-roster.json`; orphaned roles get revoked.

Implementation note: all 5 patterns require a real Postgres test container (not mock/sqlite); testcontainers-postgres or equivalent. Shared fixture: `tests/integration/rls-bypass/conftest.py`.

---

## Quality Checks

- **CRITICAL:** Every `SECURITY DEFINER` function reading tenant-scoped tables MUST be tested for tenant-context propagation; missing tests = silently-broken RLS.

- **Discovery is automated.** The `pg_proc` discovery query for `SECURITY DEFINER` functions runs in CI; the test framework asserts every discovered function has a corresponding test entry. A new function without a test entry fails the build.

- **Test against real Postgres, not mock.** RLS is a database feature; mock-DB tests do not exercise the actual policy evaluator. The test suite uses testcontainers-postgres or equivalent; in-memory DBs (sqlite, h2) are not acceptable for this category.

- **`SET row_security = off` is forbidden in application code.** A lint rule (linter or git pre-commit hook) flags any application source that issues `SET row_security` regardless of value. Postgres allows the SET only for superuser; the rule catches accidental copies into application code.

- **`BYPASSRLS` audit.** Quarterly review of `pg_roles WHERE rolbypassrls = true`. Document each entry: who owns the role, what process uses it, why bypass is required. Roles without a clear owner are revoked.

- **Test failure messages name the bypass surface.** `AssertionError: tenant_a saw 7 rows; expected 3` is rejected at code review. Required: `AssertionError: SECURITY DEFINER function count_all_invoices() bypassed RLS — tenant_a context, but returned all-tenant total 7 (expected tenant_a's seed = 3)`.

- **`WITH CHECK` policy template enforced.** All tenant-scope policies use a template that includes both `USING` and `WITH CHECK` clauses by default. The template is version-controlled; deviation requires explicit reviewer sign-off.

- **`FORCE ROW LEVEL SECURITY` migration template.** All tenant-scope table-create migrations include `ALTER TABLE ... FORCE ROW LEVEL SECURITY` in the same migration as `ENABLE ROW LEVEL SECURITY`. Template ships with the migration framework's tenant-scoped table cookbook.

- **Connection-pool config audit.** `server_reset_query` (pgbouncer) or equivalent is verified to issue `DISCARD ALL`. The bypass test for `BYP-102` (schema-per-tenant) and `BYP-002` (RLS) both rely on this behavior; the audit confirms it.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `postgres RLS bypass {date}` — surfaces post-incident write-ups, security-research blogs, conference talks. Highest-signal source for new bypass surfaces.
- `SECURITY DEFINER multi-tenant audit {date}` — security-tooling write-ups on enumerating `SECURITY DEFINER` functions. Cross-link with the BYPASSRLS audit query.
- `BYPASSRLS production incident {date}` — published incidents involving misconfigured role inheritance. Translate the root cause into a regression test.
- `PostgreSQL row security policy WITH CHECK {date}` — PG documentation + community articles on `USING` vs `WITH CHECK` asymmetry. Refresh policy templates if patterns shift.
- `pgbouncer server_reset_query DISCARD ALL {date}` — connection-pool behavior under tenant-context. Verify pool config is current.
- `RLS performance planner cliff {date}` — cross-cuts with [[rls-deep-dive#performance-cliff-at-high-tenant-count]]. Bypass tests run nightly at synthetic-tenant scale.
- `multi-tenant RLS test pattern {date}` — community test patterns; useful for catalogue refresh.
- `OWASP ASVS V13 multi-tenant {date}` — compliance-narrative evidence; useful for QG-M2 sign-off documentation.

---

## Cross-references

**Companion fragments:**
- [[rls-deep-dive]] — the RLS mechanism details whose bypass surfaces this fragment tests
- [[tenant-isolation-testing-patterns]] — the broader testing-patterns context this fragment lives within
- [[isolation-test-evidence-signatures]] — sibling fragment specifying machine-parseable evidence_signature standards (this fragment's tests cite signatures conforming to that fragment)
- [[noisy-neighbor-detection]] — sibling fragment; RLS deployments also need noisy-neighbor tests (NN-* category in the catalogue)

**Glossary:**
- `rls-bypass` (P3.2 glossary; new entry) — defines the term this fragment's tests prove against

**Quality gate:**
- `QG-M2` v1.1.0 — C5 (rls-bypass coverage criterion) sources from this fragment's must-have entries

**Anti-pattern:**
- [[no-rls-bypass-test]] — the failure mode this fragment prevents

**Schemas:**
- `test-catalogue.json` schema (spec §3.4) — `tests[*]` with `category: rls-bypass` populate from this fragment's enumeration

**Downstream consumers:**
- `bmad-bam-design-multi-tenant-testing` step-02 — loads RLS-bypass test classes from this fragment's catalogue
- BMM `bmad-qa-generate-e2e-tests` (via BAM overlay) — generates actual test files satisfying the catalogue entries this fragment specifies

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §3.4 (schema), §5.1.1 (fragment registration)
