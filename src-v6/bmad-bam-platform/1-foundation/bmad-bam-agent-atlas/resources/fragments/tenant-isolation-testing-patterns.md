---
id: tenant-isolation-testing-patterns
title: Tenant Isolation Testing Patterns
category: tenant-isolation
kind: fragment
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
references:
  - "https://owasp.org/www-project-application-security-verification-standard/"
  - "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
tested_against: []
---

# Tenant Isolation Testing Patterns

A structural deep-dive on the **test catalog that enforces tenant isolation** at QG-M2. Generic test patterns prove that a system *does* what it claims; isolation tests prove that a system *cannot* do what it must not do. Those are not the same problem. Proving a negative — "no cross-tenant data path exists, by construction" — requires fixtures, attack catalogues, and test types that are uncommon in mainstream test suites. This fragment is the canonical reference for those patterns, consumed by every tenancy-model design (RLS, schema-per-tenant, cell-based, hybrid) when it produces the *Isolation tests required* section of `tenancy-model.md` §5.

Tests that prove "X CAN happen" are easy: arrange, act, assert. Tests that prove "X CAN'T happen" are easy to *write* and easy to get *wrong*. A green isolation test can pass for the right reason (the isolation primitive worked) or for several wrong reasons (the query was malformed, the auth layer was mocked, the fixture was a single tenant, the assertion was on row count instead of on a specific error). The patterns below exist to keep the wrong reasons out.

---

## When to Use

These patterns apply whenever a multi-tenant system gates a change behind QG-M2. Use them in these situations:

- **Any production multi-tenant system, on every PR.** The isolation test suite runs on every pull request that touches tenant-scoped tables, the routing layer, the auth layer, the connection pool topology, or any code path that consumes `tenant_id`. The suite is a **required** CI check, not advisory — a red isolation test is a merge block, treated with the same seriousness as a red type check. Skipping the suite "for an urgent hotfix" is a cultural failure mode that every published multi-tenant leak through 2025 has shared in its post-mortem.

- **Before QG-M2 gate signoff.** Every tenancy-model.md design produced via [[tenancy-decision-framework]] declares the *isolation tests required* in §5. QG-M2 verifies (a) those tests exist, (b) they fail informatively when isolation breaks, and (c) they pass against the current main branch. Without this fragment's patterns enforced, QG-M2 is decorative.

- **After any tenancy-model migration.** Migrations between tenancy models (RLS → schema, schema → cell, any → hybrid) replace the isolation primitives wholesale. The existing test suite — written against the *old* model's primitives — frequently passes against the new model for accidental reasons (the query happens to filter by `tenant_id` even though no policy enforces it; the schema search_path happens to be set even though the test does not assert it). Re-author the suite against the new model's actual primitives.

- **After any change to the auth, routing, or connection-pooling layer.** These layers are the *substrate* of isolation. A change to the JWT verification, the gateway routing rules, the pgbouncer mode, or the connection-acquisition pattern can silently invalidate every existing isolation test's premise. Re-run the full suite, and add a new test for the specific failure mode the change could introduce.

- **After every published multi-tenant security incident in your peer set.** When Stripe, GitHub, Supabase, Linear, or a comparable platform publishes a post-incident write-up describing a cross-tenant leak, *steal the test*. Translate their root cause into a regression test in your suite. Cross-tenant incidents repeat across the industry far more often than they repeat within a single company; the cheapest signal is your peers' failures.

- **Nightly at production-like scale.** Some isolation failure modes (the RLS planner cliff in [[rls-deep-dive#performance-cliff-at-high-tenant-count]], the schema-enumeration cost in [[schema-per-tenant]], cell-routing staleness in [[cell-based-architecture]]) only surface above a synthetic-tenant threshold. A nightly suite that spins up 100–1,500 synthetic tenants and runs the cross-tenant assertions catches these before they reach production.

- **Quarterly chaos exercise on the tenant-routing layer.** Schedule a planned chaos drill at least once per quarter that fault-injects on the routing layer (stale routing, cell-down, auth-failover) and asserts blast radius stays contained. Treat this as a fire drill — the muscle memory matters as much as the test outcome.

If none of these apply, you probably do not have a production multi-tenant system, in which case this fragment is orientation rather than mandate.

---

## When NOT to Use

Skip or descope these patterns when:

- **Single-tenant system.** Per-customer dedicated installs (on-prem, customer VPC, sovereign cloud) have no cross-tenant boundary to assert. Use standard test patterns; do not invent isolation tests for tenancy that does not exist. The category error here is treating "deploys" as "tenants" — a per-customer install is a software-distribution problem, not a tenancy problem.

- **Isolation tests have passed within the last sprint AND no isolation primitives changed.** The full suite is expensive (nightly synthetic-tenant runs, chaos exercises). Re-running it on a PR that touches only documentation, CSS, or a non-tenant-scoped subsystem is waste. The bar for "no isolation primitives changed" is mechanical: a git diff against `auth/**`, `tenancy/**`, the migration directory, the routing config, and the connection-pool config returns empty. If the diff is non-empty, run the suite.

- **Prototype or PoC where tenancy is not finalized.** Before the [[tenancy-decision-framework]] has produced a committed tenancy-model.md, the isolation primitives are aspirational. Writing tests against aspirational primitives produces tests that ratify the aspiration rather than test it. Defer the suite until the model is committed; in the interim, document the assumption that no production tenant data exists yet.

- **Read-only analytics replicas with no tenant write path.** Read-only systems consuming an upstream tenant-scoped data warehouse inherit the upstream's isolation guarantees. Write a *thin* assertion that the replica's read role lacks write privileges and that its query path includes `tenant_id` filters; do not duplicate the upstream's full isolation suite.

- **The "system" is a third-party SaaS you do not control.** You cannot test the isolation of someone else's multi-tenant database. What you *can* test is your integration's tenant-context propagation (does the API call carry the right `tenant_id`? does your auth layer surface the right tenant to the vendor?). Scope the suite to *your* boundary; do not pretend you can audit the vendor's internals.

---

## Fixture Patterns

Isolation tests live or die on their fixtures. A fixture with one tenant cannot prove separation. A fixture with two tenants and the same data shape can pass for accidental reasons. A fixture with two tenants and different-shaped data, plus a "polluted" tenant whose data was written to the wrong place, catches the failures that one-tenant or symmetric-two-tenant fixtures miss.

Three fixture patterns cover the test catalog below. All three are mandatory; isolation suites that use only one are weaker than their authors believe.

### Per-tenant fixture (2–3 tenants minimum)

Minimum: `tenant_a`, `tenant_b`, `tenant_c`. Three tenants — not two — because two-tenant suites occasionally pass when the test logic accidentally hard-codes a tenant pair, and the bug is invisible until production traffic introduces a third tenant. Three tenants force the test to *parameterize* over pairs.

```python
# conftest.py — pytest fixture for per-tenant isolation
import pytest
import uuid
from app.tenancy import provision_tenant, teardown_tenant

@pytest.fixture(scope="function")
def tenants(db):
    """Three tenants with distinct uuids, distinct names, and distinct data."""
    ids = {
        "a": uuid.uuid4(),
        "b": uuid.uuid4(),
        "c": uuid.uuid4(),
    }
    for label, tid in ids.items():
        provision_tenant(
            db,
            tenant_id=tid,
            name=f"acme-{label}",
            # Asymmetric seed data: different table shapes catch
            # assertions that pass for "row count = 0" reasons.
            seed=dict(
                invoices=3 if label != "c" else 0,
                users=2 if label == "a" else 5,
                audit_log=10,
            ),
        )
    yield ids
    for tid in ids.values():
        teardown_tenant(db, tenant_id=tid)
```

Two design choices in the snippet that matter:

- **Asymmetric seed data.** Each tenant has a different row count per table. A test that asserts "tenant_a sees only tenant_a's invoices" can confirm via row count (`len(rows) == 3`), not just "rows is empty" — the latter is satisfied by a broken query.
- **Function scope, not module scope.** Tenant lifecycle runs per test. Cross-test pollution (tenant_a from test 1 still exists at the start of test 2) hides bugs in the provisioning code itself, which is part of the isolation primitive surface.

### Polluted-state fixture

This fixture seeds a deliberate cross-tenant write — typically a row in tenant_b's data path that was written there by tenant_a (because of a missing filter, a bypassed policy, or an admin tool used incorrectly). The test then authenticates as tenant_b and asserts the polluted row is **rejected** by the isolation primitive (RLS denies, schema search_path doesn't find, cell routing refuses), or — if the primitive cannot reject reads of existing rows — the row is at minimum flagged in an audit channel.

```python
# tests/isolation/test_polluted_state.py
def test_polluted_row_rejected_under_tenant_b(tenants, db, app_client):
    a, b, c = tenants["a"], tenants["b"], tenants["c"]

    # Inject pollution: write a row tagged as tenant_a INTO tenant_b's
    # logical scope using an admin/migration role that bypasses RLS.
    db.execute(
        "INSERT INTO invoices (id, tenant_id, amount_cents, owner_tenant_id) "
        "VALUES (gen_random_uuid(), %s, 99999, %s)",
        (b, a),  # tenant_id = b, owner_tenant_id = a — a smuggled record
        as_role="migration_user",
    )

    # Now authenticate as tenant_b normally and read the invoices table.
    with app_client.authenticated_as(b) as client:
        rows = client.get("/invoices").json()
        # Specific assertion: no smuggled record visible. The check is
        # on the OWNER, not on the tenant_id — RLS filters on tenant_id,
        # so the smuggled row IS visible to tenant_b at the row level,
        # which is the bug the test catches.
        assert all(r["owner_tenant_id"] == str(b) for r in rows), \
            "smuggled cross-tenant ownership leaked through to tenant_b"
```

The polluted-state fixture is the strongest single test in the suite because it asserts the isolation primitive against a *deliberately malicious* state, not against the happy path. Without it, the suite only proves "honest tenants see their own data" — which is the weak claim.

### Cross-tenant linked-resource fixture

Multi-tenant data models occasionally allow cross-tenant references via foreign keys (a `parent_workspace_id` that points to a row owned by a different tenant) — usually accidentally, sometimes by design (marketplace co-listings, partnership tables). The fixture writes a parent in tenant_a and a child in tenant_b whose foreign key smuggles a reference across the boundary. The test asserts the FK is **rejected** at the application layer or the database layer.

```python
# tests/isolation/test_cross_tenant_fk.py
def test_cross_tenant_foreign_key_rejected(tenants, db, app_client):
    a, b, _ = tenants["a"], tenants["b"], tenants["c"]

    # Parent owned by tenant_a.
    with app_client.authenticated_as(a) as client:
        parent = client.post("/workspaces", json={"name": "alpha"}).json()
        parent_id = parent["id"]

    # As tenant_b, try to create a child that references tenant_a's parent.
    with app_client.authenticated_as(b) as client:
        resp = client.post(
            "/projects",
            json={"name": "beta-project", "workspace_id": parent_id},
        )
        # 403 (app-level check) or 422 (FK validation) acceptable.
        # 200/201 = isolation broken.
        assert resp.status_code in (403, 422), (
            f"cross-tenant FK accepted: {resp.status_code} {resp.text}"
        )
        # And the body must surface the boundary violation explicitly,
        # not a generic "validation error" that hides the cause.
        assert "tenant" in resp.text.lower() or "ownership" in resp.text.lower()
```

Two notes:

- The assertion checks **status code AND body content**. A generic 422 with "validation error" might be the FK working *or* might be an unrelated bug; the body content check pins it to the tenant boundary.
- The polluted-state and cross-tenant-FK fixtures often catch the same class of bug from different angles. Keep both — they fail differently when the primitive degrades, and the difference is diagnostic.

---

## Test Types

Four test categories cover the QG-M2 surface. Each test type asserts something the system **cannot** do; each gets at least one concrete snippet; each catches a specific failure mode.

### Cross-tenant assertion tests

**Assertion:** authenticated as tenant_a, the system CANNOT read, write, update, or delete tenant_b's data. The path is closed by construction — RLS rejects, schema search_path doesn't resolve the row, or cell routing returns a not-found.

```python
# tests/isolation/test_cross_tenant_select.py
import pytest

@pytest.mark.parametrize("attacker,victim", [
    ("a", "b"), ("b", "a"), ("a", "c"), ("c", "a"),
    ("b", "c"), ("c", "b"),
])
def test_cross_tenant_select_returns_no_victim_rows(
    tenants, app_client, attacker, victim
):
    a_id, v_id = tenants[attacker], tenants[victim]

    with app_client.authenticated_as(a_id) as client:
        rows = client.get("/invoices").json()
        # Specific assertion: no row has the victim's tenant_id.
        for row in rows:
            assert row["tenant_id"] != str(v_id), (
                f"tenant {attacker} saw row from tenant {victim}: {row}"
            )
        # Belt and suspenders: row count matches attacker's known seed.
        # If seed has 3 invoices for tenant_a, we expect exactly 3.
        # A count of 0 is suspect (could be a broken query),
        # a count > 3 is a leak.
        expected = {"a": 3, "b": 3, "c": 0}[attacker]
        assert len(rows) == expected, (
            f"unexpected row count for {attacker}: {len(rows)} != {expected}"
        )
```

For RLS specifically, also test **write** paths. RLS allows `INSERT` to succeed at the row-evaluation level but rejects the row if `WITH CHECK` fails — a frequently-missed asymmetry.

```python
# tests/isolation/test_cross_tenant_insert_rls.py
def test_cross_tenant_insert_raises_rls_violation(tenants, db_session):
    a, b, _ = tenants["a"], tenants["b"], tenants["c"]

    with db_session.tenant_context(a):
        with pytest.raises(Exception) as exc:
            db_session.execute(
                "INSERT INTO invoices (id, tenant_id, amount_cents) "
                "VALUES (gen_random_uuid(), %s, 100)",
                (b,),  # try to insert a row tagged as tenant_b
            )
        # Specific Postgres error, not a generic "insert failed".
        assert "new row violates row-level security policy" in str(exc.value)
```

**Failure modes caught:** missing RLS policy on a new table; `WITH CHECK` omitted (only `USING`); schema search_path leak across pooled connections; cell routing returning the wrong cell's data; auth layer attaching the wrong `tenant_id` to a request.

### Noisy-neighbor simulation tests

**Assertion:** when tenant_a generates an abnormal load (a flood of queries, a large write, a long-running AI inference, a recursive query that triggers replanning), tenant_b's p99 latency stays within budget AND resource quotas activate. Isolation here is not security — it is availability. A platform that lets a noisy tenant degrade other tenants' SLAs has failed isolation even if no data crossed boundaries.

```python
# tests/isolation/test_noisy_neighbor.py
import asyncio
import statistics

async def test_tenant_a_load_does_not_degrade_tenant_b(
    tenants, app_client_async
):
    a, b, _ = tenants["a"], tenants["b"], tenants["c"]

    # Generate sustained load from tenant_a: 200 concurrent queries
    # of a known-expensive shape (analytics aggregation).
    async def hammer():
        async with app_client_async.authenticated_as(a) as client:
            for _ in range(50):
                await client.get("/analytics/aggregate")

    hammer_task = asyncio.gather(*[hammer() for _ in range(4)])

    # Concurrently, measure tenant_b's normal-traffic latency.
    async def measure():
        latencies_ms = []
        async with app_client_async.authenticated_as(b) as client:
            for _ in range(100):
                t = time.perf_counter()
                await client.get("/invoices")
                latencies_ms.append((time.perf_counter() - t) * 1000)
        return latencies_ms

    latencies = await measure()
    await hammer_task

    p99 = statistics.quantiles(latencies, n=100)[98]
    # Budget: tenant_b's p99 must stay under 200ms even while
    # tenant_a is generating sustained load.
    assert p99 < 200, (
        f"tenant_b p99 latency {p99:.1f}ms exceeded 200ms budget "
        f"under tenant_a load — noisy neighbor isolation failed"
    )
```

For platforms with explicit resource quotas (per-tenant connection limits, per-tenant rate limits, per-tenant inference budgets in Nova), add a second assertion: tenant_a's request fails with a 429 / quota-exceeded error after the budget is consumed, rather than continuing to consume shared resources unbounded.

**Failure modes caught:** missing connection-pool-per-tenant cap; missing query timeout; AI-inference fan-out with no per-tenant budget; shared cache thundering-herd on a noisy tenant's cache miss; observability cardinality explosion under one tenant's load.

### RLS bypass tests (model-specific)

**Assertion:** known RLS bypass techniques — `SECURITY DEFINER` injection, `BYPASSRLS` connection misuse, `search_path` manipulation, `SET ROLE` escalation — all fail. **This test category is specific to RLS deployments.** Schema-per-tenant and cell-based deployments have their own model-specific attacks (see below); generic isolation tests are insufficient.

```python
# tests/isolation/test_rls_bypass.py
import pytest

def test_security_definer_function_does_not_bypass_rls(tenants, db_session):
    """A SECURITY DEFINER function in the codebase must not
    expose cross-tenant data when called by a tenant role."""
    a, b, _ = tenants["a"], tenants["b"], tenants["c"]

    with db_session.tenant_context(a):
        # Call every SECURITY DEFINER function exposed to app roles.
        # Each must return ONLY tenant_a's data, or refuse to execute.
        result = db_session.execute("SELECT count_my_invoices()").fetchone()
        # If the function bypasses RLS, count == sum(tenants);
        # if it respects RLS, count == tenant_a's count.
        assert result[0] == 3  # tenant_a's known seed count

def test_set_role_to_privileged_role_rejected(db_session, tenants):
    """Application connections cannot escalate to BYPASSRLS roles."""
    a, _, _ = tenants["a"], tenants["b"], tenants["c"]
    with db_session.tenant_context(a, role="application_user"):
        with pytest.raises(Exception) as exc:
            db_session.execute("SET ROLE migration_user")
        assert "permission denied" in str(exc.value).lower()

def test_search_path_manipulation_does_not_change_rls(db_session, tenants):
    """RLS evaluation is per-table, not per-schema. search_path
    manipulation must not surface unfiltered rows."""
    a, _, _ = tenants["a"], tenants["b"], tenants["c"]
    with db_session.tenant_context(a):
        db_session.execute("SET LOCAL search_path = public, pg_catalog")
        rows = db_session.execute("SELECT * FROM invoices").fetchall()
        # RLS still applies; search_path doesn't disable it.
        assert all(r["tenant_id"] == str(a) for r in rows)

def test_bypassrls_role_not_reachable_from_app_port(pgbouncer_app_port):
    """Application connection pool authenticates as application_user,
    which lacks BYPASSRLS. Even a SQL-injection attempt that ends with
    SET ROLE bypassrls_admin must fail."""
    conn = connect_via(pgbouncer_app_port)
    with pytest.raises(Exception):
        conn.execute("SET ROLE bypassrls_admin; SELECT count(*) FROM invoices")
```

For **schema-per-tenant**, model-specific attacks include: search_path manipulation pointing at a different tenant schema (`SET search_path = tenant_037, public` from a tenant_005 connection); `DISCARD ALL` not running at server release in the pool; `SET ROLE` to a role with cross-schema grants; cross-schema queries via explicit schema-qualified table names.

For **cell-based**, model-specific attacks include: stale tenant→cell binding (cached routing decision points at the old cell after a tenant migration); routing-layer auth-token forgery (token signed for cell_a presented to cell_b); cross-cell shared service (identity, billing) leaking tenant context into the wrong cell; cell-local control-plane drift letting a misconfigured cell route a tenant's request to a peer cell.

Each model's suite **must enumerate the model's specific attacks** and assert all fail. The generic cross-tenant assertion tests (above) do not catch model-specific bypass techniques — the planner constant-folds the policy correctly, so the cross-tenant `SELECT` returns zero rows; meanwhile the `SECURITY DEFINER` helper function in the same migration silently exposes the same data.

**Failure modes caught:** `SECURITY DEFINER` functions defined without `FORCE ROW LEVEL SECURITY` on their target tables; `BYPASSRLS` roles reachable from app-tier connection pools; `search_path` manipulation as an attack vector (mostly a schema-per-tenant concern, but worth testing on RLS too); routing-layer staleness in cell-based; auth-token cross-cell forgery.

### Tenant lifecycle tests

**Assertion:** tenant onboarding creates *all* the required isolation primitives (schema, policies, cell binding, RLS attributes, default privileges); tenant offboarding does not leak residual data into the next-onboarded tenant; tenant deletion does not cascade beyond its boundary.

```python
# tests/isolation/test_tenant_lifecycle.py
def test_onboarding_creates_full_isolation_primitives(db):
    """A freshly-provisioned tenant has every required primitive in place."""
    tid = provision_tenant(db, name="lifecycle-test-1")

    # For RLS deployments: every tenant-scoped table has RLS enabled
    # AND at least one policy.
    rows = db.execute("""
        SELECT c.relname,
               c.relrowsecurity,
               c.relforcerowsecurity,
               (SELECT count(*) FROM pg_policies p
                  WHERE p.schemaname = 'public' AND p.tablename = c.relname) AS policies
          FROM pg_class c
          JOIN pg_namespace n ON c.relnamespace = n.oid
         WHERE n.nspname = 'public'
           AND c.relkind = 'r'
           AND c.relname IN (SELECT table_name FROM tenant_scoped_tables);
    """).fetchall()
    for r in rows:
        assert r["relrowsecurity"], f"{r['relname']} missing RLS"
        assert r["relforcerowsecurity"], f"{r['relname']} missing FORCE RLS"
        assert r["policies"] >= 1, f"{r['relname']} has no policies"

    teardown_tenant(db, tid)

def test_offboarding_does_not_leak_to_next_tenant(db, app_client):
    """Tenant deletion + new tenant provisioning = no residual data."""
    t1 = provision_tenant(db, name="will-be-deleted")
    with app_client.authenticated_as(t1) as client:
        client.post("/invoices", json={"amount_cents": 12345})

    teardown_tenant(db, t1)
    t2 = provision_tenant(db, name="fresh-tenant")

    # t2 must not see any of t1's data — and crucially, t2's
    # newly-allocated tenant_id must not happen to alias t1's.
    with app_client.authenticated_as(t2) as client:
        rows = client.get("/invoices").json()
        assert rows == [], f"residual data visible to fresh tenant: {rows}"

def test_tenant_deletion_does_not_cascade_to_shared_resources(db):
    """Deleting tenant_a must not affect tenant_b or shared lookup tables."""
    a, b = provision_tenant(db, "a"), provision_tenant(db, "b")
    seed_data(db, b, invoices=5)
    shared_row_count_before = db.execute(
        "SELECT count(*) FROM public.currencies"
    ).fetchone()[0]

    teardown_tenant(db, a)

    # tenant_b's data is intact.
    b_count = db.execute(
        "SELECT count(*) FROM invoices WHERE tenant_id = %s", (b,)
    ).fetchone()[0]
    assert b_count == 5

    # Shared reference data is intact.
    shared_row_count_after = db.execute(
        "SELECT count(*) FROM public.currencies"
    ).fetchone()[0]
    assert shared_row_count_after == shared_row_count_before
```

**Failure modes caught:** onboarding skips a step (no policy on a newly-created table); offboarding leaves residual rows that are then visible to a recycled tenant_id; deletion cascades via an over-broad `ON DELETE CASCADE` to shared tables; cell-based onboarding succeeds in the control plane but the cell's local provisioning fails silently.

---

## Tooling

Isolation testing needs tooling that is uncommon in mainstream test suites. The four tools below are not optional luxuries — they are the minimum kit.

**Test isolation containers (testcontainers).** Each test gets fresh database state. Sharing a database across tests means a leak in test 1 is invisible if test 2 happens to clean up the row before its assertion fires. Use [testcontainers-python](https://testcontainers-python.readthedocs.io/) or testcontainers-node to spin a per-test (or per-test-class) Postgres + Redis + whatever the cell needs. Configuration that matters: `restart: false`, `auto_remove: true`, snapshot baseline applied once at session scope then re-applied via `pg_restore` per test. Cost: 1–3 seconds startup per test container; amortizes to ~50ms per test with snapshot replay. Worth it.

**Property-based testing (Hypothesis, fast-check).** Cross-tenant tests benefit hugely from property-based generation: instead of hand-writing the (tenant_a, tenant_b) pairs, generate them. Hypothesis (Python) and fast-check (JS) both support stateful strategies that build up tenant populations and apply random operations, then assert the isolation invariant ("no row's `tenant_id` differs from the authenticated tenant's id in any read"). This catches edge cases hand-written tests miss — e.g., a tenant_id that happens to be a Postgres reserved-word-shaped UUID, a tenant created and immediately offboarded in the same transaction, a tenant whose UUID has a leading null byte.

```python
# tests/isolation/test_isolation_property.py
from hypothesis import given, strategies as st
from hypothesis.stateful import RuleBasedStateMachine, rule, invariant

class TenantIsolationMachine(RuleBasedStateMachine):
    def __init__(self):
        super().__init__()
        self.tenants = {}

    @rule(name=st.text(min_size=1, max_size=63))
    def add_tenant(self, name):
        tid = provision_tenant(name=name)
        self.tenants[tid] = []

    @rule(data=st.data())
    def write_invoice(self, data):
        if not self.tenants: return
        tid = data.draw(st.sampled_from(list(self.tenants.keys())))
        with auth_as(tid):
            inv = client.post("/invoices", json={"amount": 100}).json()
            self.tenants[tid].append(inv["id"])

    @invariant()
    def no_cross_tenant_reads(self):
        for tid, expected_ids in self.tenants.items():
            with auth_as(tid):
                visible = {r["id"] for r in client.get("/invoices").json()}
                assert visible == set(expected_ids), (
                    f"tenant {tid} sees {visible}, should see {expected_ids}"
                )

TestIsolation = TenantIsolationMachine.TestCase
```

**Tenant-context-propagation linter.** Static analysis that flags any database query in application code missing a `tenant_id` filter (for RLS deployments) or running outside a `SET LOCAL search_path` context (for schema-per-tenant). BAM ships a custom linter as part of the platform module (`scripts/lint-tenant-context.py`); community alternatives include sqlparse-based scripts and AST-walkers over the ORM layer. Configuration that matters: the linter must run in CI as a required check, not as an advisory warning. A flagged query is a merge block — even if the runtime test suite passes, because the static check catches cases the dynamic suite missed.

**Chaos engineering for tenancy.** Fault injection on the tenant-routing layer (gateway, auth service, cell-router, connection pool) with assertions that blast radius stays contained. Tools: [Toxiproxy](https://github.com/Shopify/toxiproxy) for network-level fault injection; [LitmusChaos](https://litmuschaos.io/) for Kubernetes-native scenarios; [Chaos Mesh](https://chaos-mesh.org/) for cell-based deployments. The chaos scenarios that matter for isolation: stale routing cache (point tenant_a's request at tenant_b's cell), partial network partition (cell-router can reach cell_a but not cell_b), auth-service failover (verify the failover path doesn't drop `tenant_id` claims), pool-resize-under-load (verify new pool entries don't inherit stale `SET` context). Run these quarterly minimum; the muscle memory of running the chaos drill is half the value.

---

## Anti-Patterns

Isolation testing has a higher-than-usual density of failure modes — tests that *look* correct but fail to detect the breach they were written to catch. The four patterns below recur across multiple post-incident reviews; surface them early and refuse to merge tests that exhibit them.

**Testing only the "happy path".** A test that authenticates as tenant_a and asserts tenant_a sees tenant_a's data does not prove **isolation** — it proves the system can serve correct data to a correct request. The breach the test must detect is tenant_a seeing tenant_b's data; the happy-path test does not exercise that scenario at all. *Wrong:* `def test_tenant_a_sees_own_invoices(): assert len(get_invoices(a)) == 3`. *Right:* `def test_tenant_a_does_not_see_tenant_b_invoices(): rows = get_invoices(a); assert all(r.tenant_id == a for r in rows)`. The asymmetry is structural — proving negatives requires explicit negative assertions, not positive ones with an implicit complement.

**Mocking the auth layer in isolation tests.** Mocking the auth layer to "set the tenant_id to whatever the test wants" bypasses the actual isolation primitive you are trying to test. The auth layer attaching the right `tenant_id` to the request is **part of the isolation primitive** — if you mock it, you are testing a system that does not exist. *Wrong:* `mock_auth.return_tenant_id = uuid_b; assert get_invoices() == []`. *Right:* obtain a real JWT for tenant_a (use a test-only signing key + the real auth service), present it to the real gateway, let the real auth code attach the real tenant context. Mocking is occasionally acceptable for happy-path tests where the auth path is incidental; in isolation tests, the auth path is the test's subject.

**Single-tenant fixture.** A test with one tenant cannot prove cross-tenant separation, full stop. The most common variant: `def test_isolation(): tenant = create_tenant(); assert len(read_other_tenants_data()) == 0` — except "read other tenants' data" is impossible to define meaningfully when only one tenant exists. *Wrong:* one tenant, one assertion that "nothing from other tenants is visible". *Right:* three tenants minimum (per the [[#fixture-patterns]] section), with assertions that traverse all six attacker→victim pairs.

**Asserting only "no data returned".** A cross-tenant query that returns zero rows could be (a) isolation working correctly, or (b) the query itself being malformed, hitting a typo, missing a required filter, or failing in a way that produces an empty result rather than an error. The assertion must be **specific**: a specific error class for RLS violations (`new row violates row-level security policy`), a specific HTTP status code for app-level denials (403, 404, 422), a specific row count match against the attacker's known seed (not just "empty"). *Wrong:* `assert rows == []`. *Right:* `assert all(r.tenant_id == attacker for r in rows) and len(rows) == ATTACKER_SEED_COUNT`. Empty is suspect; specific is proof.

A fifth, less-common-but-worth-naming anti-pattern: **testing only against the development data set.** A 3-tenant isolation suite passes against a 3-tenant dev database trivially. Some failure modes (the RLS planner cliff, the schema-enumeration cost, cell-routing-table staleness) only surface at 100+ tenants. The nightly synthetic-tenant run (see [[#when-to-use]]) is the mitigation; do not let "it passes locally" substitute for "it passes at production-shaped scale".

---

## Quality Checks

Apply these checks before accepting an isolation test suite as adequate for QG-M2 sign-off. Failing any check should send the suite back for repair, not be papered over with "it's good enough".

- **CRITICAL:** every tenancy model has its own bypass attempts; the test suite MUST enumerate the model-specific attacks and assert all fail. Generic isolation tests (cross-tenant SELECT/INSERT against the API) catch the obvious paths but miss model-specific failure modes — RLS `SECURITY DEFINER` injection, schema-per-tenant `search_path` manipulation, cell-based routing-table staleness. The suite must include a dedicated test file per model (`test_rls_bypass.py`, `test_schema_bypass.py`, `test_cell_routing.py`) whose tests are written against the documented model-specific failure modes from [[rls-deep-dive#failure-modes]], [[schema-per-tenant#failure-modes]], and [[cell-based-architecture#failure-modes]]. A green suite that lacks model-specific tests is a green suite that has not been tested. This is the single most-skipped check in the QG-M2 enforcement record; do not skip.

- **Coverage threshold for tenant-scoped tables.** Every table in the project's tenant-scoped manifest (`platform/tenancy/tenant_scoped_tables.yaml` or equivalent) has at least one row in each of: cross-tenant SELECT test, cross-tenant INSERT test (where the model has WITH CHECK), cross-tenant UPDATE test, cross-tenant DELETE test. Missing-table coverage is itself a failing test — the suite's collection logic compares the manifest against the test matrix and fails the build on any gap. A new table without a corresponding isolation test is a leak in waiting; this check is the structural enforcement.

- **Test runs against production-like data volumes.** A nightly synthetic-tenant run spins up 100–1,500 tenants (configurable; sized to the production projection from the [[tenancy-decision-framework]] inputs) and re-runs the full isolation suite. The job fails the build on any cross-tenant assertion failure AND on any p99 latency regression beyond 20% from the previous baseline. The synthetic data is shaped — asymmetric row counts, varied schema-shape parameters, occasional polluted-state rows — to exercise the failure modes that uniform data masks.

- **Post-merge isolation regression smoke test.** Within 5 minutes of any merge to main that touches the tenancy substrate, a smoke test re-runs the core cross-tenant assertion tests against the freshly-built artifact (in a staging environment with real auth and real data plane). Failure pages the on-call platform engineer and rolls back. This is the backstop for cases where a test passed locally and in CI but the merged code path against a real auth service or pgbouncer behaves differently.

- **Polluted-state and cross-tenant-FK fixtures are exercised on every PR.** Many suites carry these fixtures as "optional" or "slow" tests that get skipped under time pressure. The fixtures are the highest-signal isolation tests in the suite — they assert against deliberately malicious state, not just honest queries. Mark them as required and accept the ~30-second CI cost.

- **Auth layer is real, not mocked, in isolation tests.** The CI configuration includes a test-grade auth service (a real Auth0/Keycloak/internal-IdP instance with test-only signing keys). Tests acquire real JWTs and present them to the real gateway. Mocking is permitted only in unit tests that explicitly do not claim to test isolation; the isolation-test directory is mocking-free.

- **Test failure messages name the boundary that was crossed.** Every cross-tenant assertion's failure message includes (a) the attacker tenant id, (b) the victim tenant id, (c) the resource that crossed (table, endpoint), and (d) the value that crossed (row id, count, error class). A generic "AssertionError: list != list" is rejected at code review. Diagnostic friction here is operational friction during the worst possible incident.

- **Chaos exercises documented and scheduled.** Quarterly chaos drills on the routing layer (stale routing, cell-down, auth-failover) are scheduled in the platform team's calendar, the runbooks are version-controlled, and the post-exercise reports are archived. Tests that *pass* are evidence; tests that the team has *practiced* are organizational muscle.

- **Property-based test invariants reviewed.** Hypothesis/fast-check property tests rely on the invariant being correctly specified. A weak invariant ("tenant_a does not see exactly tenant_b's rows") passes against systems that fail in ways the author did not anticipate. Quarterly review of the invariants against the latest [[tenancy-decision-framework]] inputs is required; new inputs (e.g., a new compliance framework, a new residency requirement) may require new invariants.

- **Tenant-context-propagation linter runs as a required CI check.** Static analysis flags any database query in application code missing the tenant context primitive (the `tenant_id` filter for RLS, the `SET LOCAL search_path` for schema-per-tenant, the cell-aware connection for cell-based). A flagged query is a merge block. The linter's rules are version-controlled and reviewed by Atlas on tenancy-model migrations.

- **Reviewer rotation.** Isolation test changes are reviewed by at least one engineer who is *not* the author. For changes that touch the auth, routing, or pool layer (the substrate of isolation), escalate to a principal-level reviewer. Self-review of isolation tests is empirically insufficient — too many ways for a test to pass for the wrong reason.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh the empirical inputs to the isolation-testing toolkit. The *patterns* in this fragment are stable on a multi-year horizon; the *tools* (testcontainers releases, Hypothesis improvements, chaos-engineering frameworks) shift annually.

- `multi-tenant isolation test patterns {date}` — surfaces test-design articles, conference talks, and post-incident write-ups. Stripe, Heroku, GitHub, Supabase, Notion engineering blogs regularly publish in this space. Pay attention to which failure modes they catch in production that their tests missed — those are direct candidates for your suite.
- `chaos engineering tenant isolation {date}` — write-ups on fault-injection scenarios specific to multi-tenant routing layers. AWS, Shopify, and the Chaos Engineering community publish in this space. Cross-link findings into the chaos-drill scenarios.
- `SaaS noisy neighbor testing {date}` — operational guidance on simulating noisy-neighbor scenarios. Useful for the per-tenant resource-quota tests; benchmarks from cloud providers (AWS RDS, Aurora, CloudSQL) on noisy-neighbor effects calibrate the p99-budget thresholds.
- `property-based testing multi-tenant invariants {date}` — Hypothesis and fast-check community articles on stateful testing of tenant systems. The state-machine pattern in the snippet above is one of several; review periodically for newer idioms.
- `OWASP ASVS multi-tenant {date}` — Application Security Verification Standard sections relevant to tenant isolation. ASVS V8 (Data Protection) and V13 (API Security) both touch on multi-tenant boundary concerns. Useful for the compliance-evidence narrative at QG-M2.
- `Kubernetes network policy tenant isolation testing {date}` — for cell-based deployments, network-level isolation tests using `kubectl exec` from cell_a's pod trying to reach cell_b's service. Calico, Cilium, and Kubernetes documentation have reference patterns.
- `testcontainers Postgres RLS {date}` — operational patterns for running Postgres with RLS in test containers. Snapshot/restore performance, ENABLE/FORCE flag verification, role-impersonation patterns.
- `Postgres SECURITY DEFINER audit test {date}` — security-research and audit-tooling write-ups on enumerating `SECURITY DEFINER` functions and asserting they respect tenant boundaries. Cross-link with the BYPASSRLS audit quality check in [[rls-deep-dive#quality-checks]].

When a query returns content older than 18 months, treat as orientation only. Test tooling and chaos-engineering frameworks have shifted significantly between 2024 and 2026; 2-year-old guidance often references frameworks that have since been deprecated, merged, or replaced.

### Source-quality heuristics

- **Post-incident write-ups.** Highest signal. A published incident report describing a cross-tenant leak names a specific failure mode and a specific test that would have caught it. Translate directly into your suite.
- **OWASP and CSA guidance.** Authoritative for compliance-evidence narratives; moderate signal for test design. Use for the QG-M2 sign-off documentation, not as a primary source for test patterns.
- **Cloud provider docs.** AWS SaaS Lens, GCP multi-tenant guidance, Azure tenant-isolation docs. Useful for vocabulary alignment and for understanding what cloud-native primitives can substitute for hand-rolled tests.
- **Academic and industrial research.** SIGMOD, VLDB, USENIX Security papers occasionally publish multi-tenant isolation analyses. Treat as ground truth for the specific systems studied; not as universal patterns.

---

## Cross-references

**Companion fragments** (the deep-dives this fragment's tests enforce):

- [[tenancy-decision-framework]] — the upstream decision aid. Every tenancy model selected by the framework has a mandatory `Isolation tests required` section in tenancy-model.md §5; the catalog in this fragment is the source for that section.
- [[rls-deep-dive]] — RLS mechanism details and the specific failure modes whose tests are catalogued in the [[#rls-bypass-tests-model-specific]] section above. RLS deployments depend on this fragment's suite being green; do not treat tests as optional.
- [[schema-per-tenant]] — schema-per-tenant mechanism and its model-specific attacks (search_path manipulation, cross-schema FK leakage, migration-runner partial rollouts). The schema-bypass tests in this fragment enforce QG-M2 on schema-per-tenant deployments.
- [[cell-based-architecture]] — cell-based architecture and its model-specific attacks (stale routing, cross-cell auth-token leakage, control-plane drift). The cell-routing tests in this fragment enforce QG-M2 on cell-based deployments.

**Implementation patterns:**

- [[rls-row-level-security]] — concrete policy templates whose correctness this fragment's RLS tests verify.
- [[schema-per-tenant-with-pgbouncer]] — connection-pool topology whose correctness this fragment's schema and noisy-neighbor tests verify.
- [[cell-based-with-routing]] — routing-layer design whose correctness this fragment's cell-routing and chaos tests verify.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M2.md`) — the gate this fragment's catalogue feeds. Every tenancy-model.md design produced via [[tenancy-decision-framework]] MUST list its required isolation tests (from this catalogue) in §5, and QG-M2 verifies (a) the tests exist, (b) they fail informatively when isolation breaks, (c) they pass on main, and (d) the nightly synthetic-tenant suite is green.

**P3.2 multi-tenant test catalogue (refresh 2026-05-17):**

- `test-catalogue.json` schema (`docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §3.4) — the machine contract whose `tests[*]` array operationalizes this fragment's patterns into a per-deployment must-have / should-have / nice-to-have list. The catalogue is emitted by `bmad-bam-design-multi-tenant-testing` (P3.2 commit 4); this fragment supplies the conceptual patterns it instantiates.
- [[rls-bypass-test-design]] — the per-bypass-surface test specs (`SECURITY DEFINER`, `BYPASSRLS`, `SET ROLE`, `search_path`, missing `WITH CHECK`, missing `FORCE`). The RLS-bypass-tests section of this fragment delegates surface-specific detail to that fragment.
- [[noisy-neighbor-detection]] — the noisy-neighbor test specs (NN-001..005 in the default catalogue). The noisy-neighbor simulation tests section of this fragment delegates per-surface detail to that fragment.
- [[isolation-test-evidence-signatures]] — evidence_signature field standards for the test-catalogue.json contract; structural requirements (≥ 20 chars; concrete artifact + bound + scope) for QG-M2 audit-defensible evidence.

**Related decisions:**

- The choice of tenancy model determines which subset of this catalogue applies. RLS deployments use cross-tenant-assertion + RLS-bypass + noisy-neighbor + lifecycle tests; schema-per-tenant deployments use cross-tenant-assertion + schema-bypass + noisy-neighbor + lifecycle tests; cell-based deployments use cross-tenant-assertion + cell-routing + noisy-neighbor + lifecycle tests. Hybrid deployments use the union across the cohorts they serve.
- Test-suite cost interacts with **CI budget**. The nightly synthetic-tenant run is the most expensive single component (10–30 minutes for 1,500 tenants); budget for it explicitly in the CI cost model and resist the recurring pressure to "skip the slow tests on hot-fix PRs". The pressure to skip is itself a signal that the deployment's incident risk is being under-invested in.
- Test-suite gating interacts with **release cadence**. A team that releases on green CI multiple times per day cannot tolerate a 20-minute isolation suite on every merge; in that case, partition the suite into a per-PR fast subset (cross-tenant assertion + lifecycle, ~2 minutes) and a per-merge full subset (everything including chaos, 20+ minutes). Both must be required; only the gating point differs.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice), §6.2 (frontmatter schema). Defects to this fragment's structure should be filed as spec patches, not unilateral changes.
- `std-frontmatter.md`, `std-validation.md` (this module's standards). The frontmatter above conforms to `std-frontmatter`.

**Downstream consumers:**

- `design-tenancy-model` skill (`src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/`) — primary consumer. `step-05-c-write-design` references this fragment for the §5 isolation-tests catalogue; `step-07-v-verify-completeness` checks that every test type listed in §5 is realized in code.
- Atlas memory (`_bmad/_memory/atlas/architecture-decisions/`) — every tenancy-model ADR should reference this fragment by id (`tenant-isolation-testing-patterns`) for the testing-strategy paragraph.
- QG-M2 enforcement (`src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M2.md`) — the checklist consumes this fragment's catalogue directly. Changes here propagate to checklist updates; do not let the checklist drift from the fragment.
