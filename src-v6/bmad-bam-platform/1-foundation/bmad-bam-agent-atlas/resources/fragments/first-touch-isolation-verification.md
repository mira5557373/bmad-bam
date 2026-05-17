---
id: first-touch-isolation-verification
title: First-Touch Isolation Verification
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [isolation, verification, tenant-onboarding, pre-traffic-gate, multi-tenant]
references:
  - "OWASP — Multi-Tenancy Security Cheat Sheet"
  - "PostgreSQL Documentation — Row Security Policies"
  - "AWS SaaS Lens — Tenant Isolation Validation"
---

# First-Touch Isolation Verification

The **first-touch isolation verification** is the blocking probe that runs after a tenant has been provisioned but *before* any live traffic is allowed to reach the tenant. It is the operational gate that turns "we believe tenant isolation works" into "we have just demonstrated tenant isolation works for this specific tenant, right now, in this specific environment, with this specific config".

Without first-touch verification, provisioning bugs (an RLS policy that didn't apply, a schema migration that ran with the wrong tenant context, a cell-routing entry that points at the wrong cell) only surface when a real cross-tenant request happens — which is the worst possible time to find out. The first-touch verification turns a latent leak into a synchronous failure that the provisioning saga can react to.

This fragment is consumed by `bmad-bam-design-tenant-onboarding` (step-04 builds the per-flow `isolation_verification_step` object from this fragment's catalog) and is the structural answer to QG-M2 v1.1.0 control C6: "Every live-traffic onboarding flow has a blocking isolation-verification step before traffic is enabled."

---

## When to Use

Apply first-touch isolation verification on every onboarding flow where:

- **`live_traffic: true` for the flow** — i.e., this flow leads to a real customer hitting the system. Demo tiers with `live_traffic: false` (see exclusion below) do not need this gate.

- **The tenancy model is logical, not physical** — RLS, schema-per-tenant, and cell-based architectures all rely on enforcement that *could* be misconfigured per tenant. Database-per-tenant is the only model where misconfiguration is structurally impossible (each tenant gets its own DB instance), and even there verification is valuable for catching cross-cluster routing bugs.

- **Provisioning is automated** — automation is consistent until it isn't. The verification catches drift between the provisioning script and the runtime state (e.g., a policy version skew, a missing migration).

- **The tenant onboarding chain touches multiple modules** — the more modules involved, the more places isolation can fail. Verification is the cross-cutting check that a tenant configured in 5 systems is actually isolated in all 5.

- **Compliance requires per-tenant evidence of isolation enforcement** — SOC 2 Type II, HIPAA, and ISO 27001 audits ask "show me the test that proves tenant X cannot see tenant Y's data". First-touch verification is that test; its output is the audit evidence.

## When NOT to Use

Skip first-touch verification when:

- **`live_traffic: false`** — demo tenants, ephemeral sandboxes, internal-only test tenants. These are excluded by design from the QG-M2 C6 rule; treat the verification step as optional (or omit it entirely if the demo environment has no real data).

- **The tenant is dedicated infrastructure** — a customer with their own physical cluster, their own database, and no shared resources has structural isolation by allocation; verification is redundant.

- **The system is single-tenant-per-deployment** — not really multi-tenant in the BAM sense; isolation verification is conceptually undefined.

---

## Architecture

### Three classes of verification probe

| Probe class | What it tests | Cost | When to run |
|---|---|---|---|
| **Cross-tenant query probe** | Tenant A's session cannot read tenant B's data | Cheap (1-3 queries) | Every provisioning |
| **Bypass attempt probe** | A SECURITY DEFINER / admin function still respects tenant scope | Medium (requires test functions) | Every provisioning |
| **Cache-key collision probe** | Cache keys are tenant-scoped (e.g., Redis keys prefixed by tenant_id) | Cheap (1-2 GETs) | Every provisioning |
| **Session-swap detection** | A connection pool releasing a connection clears the tenant context | Medium (requires concurrent test) | Every provisioning |
| **Search-index isolation probe** | Tenant A's search results never include tenant B's documents | Cheap (1 search query) | When search index exists |
| **Cross-region routing probe** | A request for tenant A is routed to the correct cell/region | Cheap (1 routed request) | Cell-based architectures |

A minimum-viable verification step runs (cross-tenant query) + (cache-key collision) + (session-swap), in that order. The full battery is appropriate for enterprise tenants where the cost (a few hundred ms of provisioning latency) is worth the assurance.

### Cross-tenant query probe — canonical shape

```
1. Connect as the newly-provisioned tenant_A.
2. Insert a known marker row: INSERT INTO probe_table (...) VALUES ('A-marker').
3. Disconnect.
4. Connect as a different tenant (use a fixed test tenant, "verification-tenant-B").
5. SELECT FROM probe_table.
6. ASSERT: the result must NOT contain 'A-marker'.
7. Clean up: connect as A, delete the marker.
```

If step 6 fails, the verification fails and the saga refuses to enable tenant A.

### RLS-specific probe (PostgreSQL)

```sql
-- as tenant_A (app.tenant_id set to 'A')
SET app.tenant_id = 'A';
INSERT INTO orders (tenant_id, payload) VALUES ('A', 'probe-marker-XYZ');

-- as tenant_B (app.tenant_id set to 'B')
SET app.tenant_id = 'B';
SELECT count(*) FROM orders WHERE payload = 'probe-marker-XYZ';
-- ASSERT: count = 0
```

If the count is nonzero, RLS is broken for this tenant — either the policy didn't apply, the policy uses the wrong column, or someone forgot `FORCE ROW LEVEL SECURITY` on a privileged role.

### SECURITY DEFINER bypass probe

```sql
-- create a SECURITY DEFINER function (likely owned by superuser)
-- attempt to read across tenants via the function

SELECT * FROM some_security_definer_view WHERE tenant_id != current_setting('app.tenant_id');
-- ASSERT: 0 rows
```

SECURITY DEFINER functions bypass RLS unless explicitly written to apply tenant scope. A function that does an unscoped `SELECT *` becomes a leak vector. The probe catches the most common mistake: a developer added a SECURITY DEFINER helper and forgot the tenant filter.

### Schema-per-tenant routing-check

```python
# connect with tenant_A's connection string (search_path = tenant_A,public)
conn_A = psycopg.connect(conninfo_for_tenant_A)
conn_A.execute("INSERT INTO orders (payload) VALUES ('A-marker')")

# now connect with tenant_B's connection string (search_path = tenant_B,public)
conn_B = psycopg.connect(conninfo_for_tenant_B)
result = conn_B.execute("SELECT count(*) FROM orders WHERE payload = 'A-marker'").fetchone()
assert result[0] == 0, "schema isolation broken"
```

This catches misconfigured `search_path` (the most common schema-per-tenant bug — a connection that defaults to `public` and misses the tenant's schema).

### Cell-based intra-cell forbidden-policy check

```bash
# tenant_A is in cell-alpha; tenant_B is in cell-beta
# attempt a cross-cell request from tenant_A's session

curl -H "X-Tenant-Id: A" https://cell-beta.internal/api/orders
# ASSERT: HTTP 403 or 401 (NetworkPolicy denies the connection)
```

A cell-based architecture's isolation is *physical* (network policy + DNS), so the probe checks the network layer, not the data layer.

### Where the probe lives in the saga

```
provisioning saga:
  1. db_create_row             (blocking)
  2. apply_rls_policy          (blocking)
  3. isolation_verification    (BLOCKING — this fragment's subject)
  4. emit TenantCreated event  (non-blocking; outbox)

if step 3 fails:
  - compensate steps 1-2 (rollback row, rollback policy)
  - do NOT publish TenantCreated
  - tenant remains in `pending_verification` state
  - escalate to ops; manual triage
```

The verification step is *strictly* between "isolation enforcement applied" and "tenant is announced to downstream consumers". Putting it earlier means there's no isolation to verify; putting it later means downstream consumers (billing, AI memory) have already been told about a tenant that may not be safe.

---

## Trade-offs

| Axis | Exhaustive verification | Sample verification |
|---|---|---|
| Coverage | All probe classes for every tenant | One or two classes per tenant; rotate through full battery weekly |
| Latency cost | 500ms-2s per onboarding | 100-300ms per onboarding |
| False-negative risk | Very low | Medium (a class not probed today is uncovered today) |
| When to choose | Enterprise tier; regulated industries | Free / starter; high-volume sign-ups |

A common compromise: run the cheap probes (cross-tenant query, cache collision) for every tenant; run the expensive probes (full battery including session-swap and search isolation) for the first 100 tenants of a new release, then sample.

---

## Implementation Patterns

### Pattern 1 — RLS probe in Python

```python
import psycopg

def verify_rls_isolation(tenant_id_new: str) -> None:
    # Step 1: insert marker as new tenant
    with psycopg.connect(DSN) as c:
        c.execute("SET app.tenant_id = %s", (tenant_id_new,))
        c.execute("INSERT INTO _probe (marker) VALUES (%s)",
                  (f"probe-{tenant_id_new}-{uuid4()}",))
        marker = c.execute("SELECT marker FROM _probe WHERE marker LIKE %s ORDER BY id DESC LIMIT 1",
                           (f"probe-{tenant_id_new}-%",)).fetchone()[0]

    # Step 2: attempt cross-read as verification tenant
    with psycopg.connect(DSN) as c:
        c.execute("SET app.tenant_id = %s", ("verification-probe-tenant",))
        count = c.execute("SELECT count(*) FROM _probe WHERE marker = %s",
                          (marker,)).fetchone()[0]

    if count != 0:
        raise IsolationVerificationError(
            f"RLS isolation failed for tenant {tenant_id_new}: "
            f"verification tenant read {count} rows of new tenant data"
        )

    # Cleanup
    with psycopg.connect(DSN) as c:
        c.execute("SET app.tenant_id = %s", (tenant_id_new,))
        c.execute("DELETE FROM _probe WHERE marker = %s", (marker,))
```

### Pattern 2 — Schema isolation probe

```python
def verify_schema_isolation(tenant_id_new: str) -> None:
    conn_new = connect_for_tenant(tenant_id_new)
    conn_new.execute("INSERT INTO orders (payload) VALUES (%s)",
                     (f"probe-{tenant_id_new}",))

    conn_other = connect_for_tenant("verification-probe-tenant")
    res = conn_other.execute(
        "SELECT count(*) FROM orders WHERE payload = %s",
        (f"probe-{tenant_id_new}",)
    ).fetchone()
    assert res[0] == 0, "schema isolation broken"
```

### Pattern 3 — Cache key collision probe

```python
def verify_cache_isolation(tenant_id_new: str) -> None:
    redis.set(f"tenant:{tenant_id_new}:probe", "A-value", ex=60)
    # ensure verification tenant's namespace is unaffected
    other = redis.get(f"tenant:verification-probe-tenant:probe")
    assert other is None, "cache key namespace leak"
    # also check that a non-namespaced lookup doesn't surface the value
    assert redis.get("probe") is None, "cache key not properly namespaced"
```

### Pattern 4 — Session swap detection (connection pool)

```python
async def verify_session_swap_isolation():
    # acquire a pooled connection, set tenant context, return to pool
    async with pool.acquire() as c:
        await c.execute("SET app.tenant_id = 'A'")

    # acquire the same connection (likely same slot), check context is clear
    async with pool.acquire() as c:
        result = await c.fetchval("SELECT current_setting('app.tenant_id', true)")
        # if the context bled across (pool didn't reset), we have a session-swap bug
        assert result in (None, ''), f"session swap leaked tenant context: {result}"
```

### Pattern 5 — Emit verification evidence

```python
def emit_verification_evidence(tenant_id: str, probes_run: list[str], passed: bool) -> None:
    record = {
        "tenant_id": tenant_id,
        "verified_at": datetime.utcnow().isoformat() + "Z",
        "probes": probes_run,
        "passed": passed,
        "runtime_version": APP_VERSION,
    }
    # append to per-tenant evidence trail
    with open(f"/var/lib/bam/verification/{tenant_id}.jsonl", "a") as f:
        f.write(json.dumps(record) + "\n")
```

---

## Quality Checks

- **Every probe returns expected-empty.** A probe that returns nonzero rows means isolation failed; the saga MUST refuse to enable the tenant.

- **Latency budget enforced.** Verification adds latency to onboarding; budget it. Cheap probes (< 100ms per probe) for self_serve tiers; full battery (< 2s total) for sales_led tiers.

- **Probe pollution cleaned up.** Probe markers MUST be deleted from the database; lingering probe rows confuse production data.

- **Verification evidence persisted.** Every verification run emits a record (tenant_id, probes_run, passed, timestamp). This is the audit trail consumed by QG-M2 H5.

- **Probe code itself is tenant-aware.** A bug where the probe connects as the wrong tenant would mask a real isolation failure. The probe's own tenant context is asserted at the start.

- **Failure escalates loudly.** A failed verification pages the on-call; it does NOT silently fail forward.

- **CRITICAL:** Isolation-verification MUST run before first live-traffic request; failure → tenant MUST NOT be enabled.

---

## Web Research Queries

(Use `{date}` to scope to current best practice; replace with the current year at query time.)

- `tenant isolation verification {date}`
- `cross-tenant query test patterns {date}`
- `RLS bypass detection {date}`
- `multi-tenant cache isolation testing {date}`
- `tenant onboarding pre-traffic gate {date}`

---

## Cross-references

- Fragment: `tenant-provisioning-patterns.md` — the saga that calls this verification step; the verification is the third blocking hook
- Fragment: `rls-deep-dive.md` — implementation detail of the RLS-specific probes
- Fragment: `tenant-isolation-testing-patterns.md` — the broader CI test suite; this fragment is the *runtime* counterpart of those *build-time* tests
- Glossary: `isolation-verification-step` — defined here; consumed by QG-M2 C6
- Glossary: `rls-bypass` — the bug class the SECURITY DEFINER probe catches
- Gate: `QG-M2` (refined v1.1.0) — C6 requires this step to be present and blocking on every `live_traffic: true` flow
- Skill: `bmad-bam-design-tenant-onboarding` — primary consumer; step-04 fills the `isolation_verification_step` object using this fragment's classes
