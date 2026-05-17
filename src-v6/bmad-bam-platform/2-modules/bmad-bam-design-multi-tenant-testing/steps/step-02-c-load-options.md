---
step_id: 02-c-load-options
auto_runnable: true
gate: machine-checkable
inputs: [testing-context.json]
outputs: [testing-options.json]
---

# Step 02 — Load test class library

## Purpose

Load the test class library: universal-cross-model tests (`universal: true`; apply regardless of isolation_model) + per-isolation-model tests (RLS-specific, schema-per-tenant-specific, cell-based-specific). Each entry has structured fields per spec §3.4 schema.

## Test class library structure

Each test entry has these fields:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique within `tests[]`; format `<CATEGORY-PREFIX>-NNN` (e.g., `ISO-001`, `NN-003`, `QUO-002`, `BYP-001`, `XTC-001`) |
| `name` | string | length ≥ 5; kebab-case; describes what the test asserts |
| `applies_to` | string[] | Subset of `{row-level-security, schema-per-tenant, cell-based}`; informational when `universal: true`, binding when `universal: false` |
| `universal` | boolean | Default `false`. `true` ⇒ test applies to ALL isolation models regardless of `applies_to[]` |
| `category` | string | Closed enum: `{isolation, noisy-neighbor, quota, rls-bypass, cross-tenant-cache}` |
| `severity` | string | Closed enum: `{must-have, should-have, nice-to-have}` |
| `evidence_signature` | string | length ≥ 20; machine-parseable signature of what evidence proves the test passed (e.g., "structured-log entry with tenant_id at every async resume point") |
| `traceable_to` | string[] | Pattern `^QG-[A-Z]+\d+\.[CH]\d+$`; each entry references a QG criterion (e.g., `QG-M2.C5`) |

## Universal tests (apply regardless of isolation_model)

These have `universal: true`; `applies_to[]` lists all three models for informational completeness.

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| ISO-001 | tenant-context-propagation-across-async-boundary | isolation | must-have | structured-log entry with tenant_id at every async resume point | [QG-M2.C5] |
| ISO-002 | tenant-context-required-for-every-db-query | isolation | must-have | linter-flagged-zero query in app code lacking tenant filter | [QG-M2.C1] |
| ISO-003 | three-tenant-cross-tenant-select-returns-only-self | isolation | must-have | parametrized 6-pair (attacker,victim) test: zero victim-rows per pair | [QG-M2.C1] |
| ISO-004 | polluted-state-rejects-smuggled-rows | isolation | must-have | smuggled-row injected via admin role; tenant-context read returns 0 smuggled rows | [QG-M2.C1] |
| ISO-005 | cross-tenant-foreign-key-rejected | isolation | should-have | child-row with parent in other tenant returns 403 or 422 + body names boundary | [QG-M2.C1] |
| ISO-006 | tenant-id-recycle-no-residual-data | isolation | must-have | tenant deleted + new tenant provisioned; new tenant sees zero residual rows | [QG-M2.C1, QG-M2.H2] |

## Per-model: row-level-security tests

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| BYP-001 | security-definer-function-respects-rls | rls-bypass | must-have | every SECURITY DEFINER function called as tenant_a returns only tenant_a rows | [QG-M2.C5] |
| BYP-002 | bypassrls-role-not-reachable-from-app-port | rls-bypass | must-have | SET ROLE bypassrls_admin from app pool raises permission denied | [QG-M2.C5] |
| BYP-003 | set-role-escalation-rejected | rls-bypass | must-have | SET ROLE migration_user from application_user raises permission denied | [QG-M2.C5] |
| BYP-004 | search-path-manipulation-does-not-bypass-rls | rls-bypass | must-have | SET LOCAL search_path with tenant_context returns only own rows | [QG-M2.C5] |
| BYP-005 | with-check-rejects-cross-tenant-insert | rls-bypass | must-have | INSERT with foreign tenant_id raises "new row violates row-level security policy" | [QG-M2.C5] |
| BYP-006 | force-row-level-security-on-tenant-scoped-tables | rls-bypass | must-have | pg_class scan: every tenant-scoped table has relrowsecurity AND relforcerowsecurity | [QG-M2.C5] |

## Per-model: schema-per-tenant tests

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| BYP-101 | search-path-manipulation-rejected | rls-bypass | must-have | SET search_path = tenant_037 from tenant_005 connection raises permission denied | [QG-M2.C5] |
| BYP-102 | discard-all-runs-at-pool-release | rls-bypass | must-have | pgbouncer server_reset_query verified; SET context not leaked across tenants | [QG-M2.C5] |
| BYP-103 | cross-schema-fk-rejected | rls-bypass | should-have | FK from tenant_005.invoices → tenant_037.workspaces rejected at constraint or app layer | [QG-M2.C5] |
| BYP-104 | migration-runner-no-partial-rollout | rls-bypass | must-have | migration applied atomically across ALL tenant schemas; partial state is impossible | [QG-M2.C5] |

## Per-model: cell-based tests

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| BYP-201 | stale-routing-cache-rejects-misrouted-request | rls-bypass | must-have | cell_a routing-cache pointing at tenant_b's cell_b returns 404 from cell_b auth | [QG-M2.C5] |
| BYP-202 | cross-cell-auth-token-forgery-rejected | rls-bypass | must-have | token signed for cell_a presented to cell_b returns 401 + audit-log entry | [QG-M2.C5] |
| BYP-203 | control-plane-drift-detected | rls-bypass | should-have | cell-local control-plane checksum compared against authority; drift surfaced in alerts | [QG-M2.C5] |
| BYP-204 | cross-cell-shared-service-tenant-context-propagation | rls-bypass | must-have | identity/billing call from cell_a carries tenant_a context; cell_b cannot consume it | [QG-M2.C5] |

## Noisy-neighbor tests (per-tier severity from context)

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| NN-001 | enterprise-p99-under-free-tier-flood | noisy-neighbor | from-tier-map | enterprise p99 < SLA threshold while free tier sustains 4x normal load | [QG-M2.C1] |
| NN-002 | per-tenant-connection-pool-cap-enforced | noisy-neighbor | from-tier-map | tenant exceeding pool cap receives 429; other tenants' pool unaffected | [QG-M2.C1] |
| NN-003 | per-tenant-query-timeout-enforced | noisy-neighbor | from-tier-map | runaway query terminated at tenant timeout; replanner not triggered for peers | [QG-M2.C1] |
| NN-004 | observability-cardinality-bounded-per-tenant | noisy-neighbor | should-have | per-tenant metric-series count capped; runaway tenant cannot blow up observability | [QG-M2.C1] |
| NN-005 | shared-cache-thundering-herd-bounded | noisy-neighbor | should-have | cache-miss storm from one tenant bounded; other tenants' p99 unchanged | [QG-M2.C1] |

Severity assignment for noisy-neighbor entries with `severity: from-tier-map`:
- If `testing-context.json#tier_model_present == true`: use `noisy_neighbor_severity_by_tier[<applicable_tier>]`
- If `tier_model_present == false`: use `noisy_neighbor_default_severity` ("should-have")

## Quota tests

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| QUO-001 | per-tenant-rate-limit-returns-429 | quota | must-have | tenant exceeding rate budget receives 429 with Retry-After header | [QG-M2.C1] |
| QUO-002 | per-tenant-storage-cap-enforced | quota | must-have | tenant exceeding storage cap receives 413 / quota_exceeded on next write | [QG-M2.C1] |
| QUO-003 | per-tenant-inference-budget-enforced | quota | should-have | Nova inference call rejected after tenant budget consumed; structured error returned | [QG-M2.C1] |
| QUO-004 | quota-state-survives-restart | quota | must-have | quota counters persisted; service restart does not zero tenant budget | [QG-M2.C1] |

## Cross-tenant-cache tests (DEFERRED to P5 ai)

| id | name | category | severity | evidence_signature | traceable_to |
|---|---|---|---|---|---|
| XTC-001 | model-cache-key-includes-tenant-id | cross-tenant-cache | should-have | model-output cache-key prefix MUST include tenant_id; collision impossible by construction | [QG-M2.C1] |
| XTC-002 | cdn-cache-key-includes-tenant-context | cross-tenant-cache | should-have | CDN cache-key includes per-tenant context; vary header set; no cross-tenant cache-hit | [QG-M2.C1] |
| XTC-003 | kv-cache-eviction-no-cross-tenant-residue | cross-tenant-cache | nice-to-have | KV cache eviction observed; residual key never reachable from peer tenant | [QG-M2.C1] |

Cross-tenant-cache category ships with **must_have: 0** per spec — the actual must-have model-cache-isolation tests are deferred to P5 ai (`design-model-cache-isolation` skill). The above are should-have / nice-to-have placeholders. Coverage report must include the deferral note.

## Selection by isolation_model

| isolation_model | Universal tests | Per-model tests | Always-applicable tests |
|---|---|---|---|
| row-level-security | ISO-001..006 | BYP-001..006 | NN-001..005, QUO-001..004, XTC-001..003 |
| schema-per-tenant | ISO-001..006 | BYP-101..104 | NN-001..005, QUO-001..004, XTC-001..003 |
| cell-based | ISO-001..006 | BYP-201..204 | NN-001..005, QUO-001..004, XTC-001..003 |
| hybrid | ISO-001..006 | UNION of BYP-* sets per `hybrid_resolution` values | NN-001..005, QUO-001..004, XTC-001..003 |

For hybrid: emit per-test `applies_to[]` populated from the subset of mechanisms that match `hybrid_resolution`'s value set. Example: if `hybrid_resolution: {free: row-level-security, enterprise: cell-based}`, include both BYP-00x AND BYP-20x.

## Output

`_bmad/bam/cache/bmad-bam-design-multi-tenant-testing/{date}/testing-options.json`:

```json
{
  "tenancy_model": "row-level-security",
  "hybrid_resolution": null,
  "test_classes": {
    "universal": [ {...ISO-001...}, ... ],
    "row_level_security": [ {...BYP-001...}, ... ],
    "schema_per_tenant": [ ... ],
    "cell_based": [ ... ],
    "noisy_neighbor": [ {...NN-001 with severity resolved per-tier...} ],
    "quota": [ ... ],
    "cross_tenant_cache": [ ... ]
  },
  "applicable_tests_for_this_model": ["ISO-001", "ISO-002", ..., "BYP-001", "BYP-002", ..., "NN-001", ..., "QUO-001", ..., "XTC-001", ...]
}
```

## Gate

Machine-checkable — class library loads, severity-from-tier-map resolves, applicable_tests_for_this_model is non-empty + matches isolation_model selection rule.

## Next step

`step-03-c-decision-matrix.md`
