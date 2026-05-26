---
id: no-rls-bypass-test
title: No RLS Bypass Test
kind: anti-pattern
module: bmad-bam-platform
persona: atlas
category: tenant-isolation
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: critical
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rls-bypass-test-design.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-isolation-testing-patterns.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rls-deep-dive.md"
---

# No RLS Bypass Test

## Summary

The test catalogue for an RLS-backed deployment lacks tests targeting the RLS-specific bypass surfaces — `SECURITY DEFINER` functions, `BYPASSRLS` role reachability, `SET ROLE` escalation, `search_path` manipulation, missing `WITH CHECK`, missing `FORCE ROW LEVEL SECURITY`. The catalogue's generic cross-tenant SELECT/INSERT tests pass (the RLS planner correctly constant-folds the policy); meanwhile, an undetected `SECURITY DEFINER` aggregator function silently returns cross-tenant data via a routine analytics endpoint. The platform claims RLS isolation; the tests prove only the most obvious path is closed.

The anti-pattern shows up as: `test-catalogue.json#coverage_report.rls-bypass.must_have == 0` despite `tenancy_model == "row-level-security"`; a CI suite without any test file matching `*bypass*` for an RLS deployment; QG-M2 sign-off based on cross-tenant SELECT tests alone; or a test catalogue that lists rls-bypass entries as `should-have` rather than `must-have`, allowing them to be skipped on hot-fix PRs.

## Symptoms

- `coverage_report.rls-bypass.must_have == 0` AND `tenancy_model` includes `row-level-security` (caught by `bmad-bam-design-multi-tenant-testing` step-07-v invariant)
- No test files matching `bypass`, `security_definer`, `with_check`, `set_role`, or `force_rls` in the test directory
- `pg_proc` query for `SECURITY DEFINER` functions returns rows; no test enumerates them
- `pg_roles WHERE rolbypassrls = true` returns rows; no test asserts unreachability from app pool
- Post-incident write-up: cross-tenant data leak via `SECURITY DEFINER` aggregator; test suite was green at time of incident
- QG-M2 sign-off document cites generic cross-tenant tests only; bypass surfaces not addressed
- Engineering team reports "RLS works; we tested it" but cannot point to specific bypass-test evidence
- Audit / customer security review surfaces the gap: "show us evidence you tested for SECURITY DEFINER bypass" → no evidence

## Root causes

1. **Believing cross-tenant SELECT tests cover RLS isolation.** Cross-tenant SELECT tests catch the policy-evaluator path. RLS bypass surfaces (SECURITY DEFINER, BYPASSRLS, SET ROLE, search_path, missing WITH CHECK, missing FORCE) are *not* exercised by these tests — each requires its own test entry.

2. **No model-specific test catalogue.** The team writes one generic isolation test file and assumes it covers all tenancy models. Each model has its own bypass surface; generic tests are insufficient.

3. **`SECURITY DEFINER` is treated as a database-admin concern, not an application concern.** Engineers create `SECURITY DEFINER` functions (for aggregation, billing, observability) without realizing each is an RLS bypass surface that needs test coverage. The team treats `SECURITY DEFINER` as DBA territory; DBAs treat tests as engineering territory.

4. **CI runtime pressure.** The bypass test suite is comparatively slow (testcontainers spinup; per-test fresh DB). Team marks bypass tests as `should-have` to keep CI green on hot-fix PRs; tests get skipped progressively.

5. **No schema enforcement.** Without `bmad-bam-design-multi-tenant-testing`'s step-07-v invariant (`rls-bypass.must_have ≥ 1` when tenancy includes RLS), the catalogue can ship with `must_have: 0` and the gap is undetected until incident.

6. **Confusion between `USING` and `WITH CHECK`.** Engineers write `CREATE POLICY ... USING (tenant_id = current_tenant_id())` without `WITH CHECK`. SELECT works correctly; INSERT smuggling (tenant_a inserting tenant_b-tagged rows) succeeds silently. Without a bypass test asserting `WITH CHECK` exists + enforces, the asymmetry is invisible.

7. **`SECURITY DEFINER` defaults masked by libraries.** Third-party migration tools, ORMs with custom extensions, or operational scripts sometimes create functions with `SECURITY DEFINER` defaulted (older versions of pg-prove, some Hasura templates). The functions enter production without code review noticing the attribute.

## Why harmful

- **Silently broken RLS isolation.** A `SECURITY DEFINER` function on a tenant-scoped table returns cross-tenant data; the application exposes it via a normal endpoint; tenants read other tenants' data without any indication the breach is occurring. The leak surfaces only when (a) a customer notices, (b) an external auditor catches it, or (c) a post-incident review investigates after a worse breach.

- **QG-M2 sign-off is decorative.** The gate purports to verify tenant isolation; cross-tenant SELECT tests pass; the platform ships. The actual isolation surface has unguarded bypass paths. The QG signs off on insufficient evidence.

- **Customer trust loss on disclosure.** When the bypass is discovered (post-incident write-up; customer's pen-test; auditor's request), the platform must disclose. Customers learn that "tested isolation" did not include the actual bypass surfaces. Trust does not recover quickly.

- **Regulatory exposure.** GDPR Art 32 (security of processing) requires "appropriate technical and organizational measures". A bypass test gap is evidence that the technical measure (isolation testing) was inadequate. Fines + remediation orders attach.

- **Audit failure on SOC 2 / ISO 27001.** Auditors increasingly include multi-tenant isolation as a controls-test category. A test suite without bypass coverage fails the controls-test; remediation requires either expanded test suite OR documented compensating controls.

- **Cascading test gap.** When the team learns about the gap, they typically discover other bypass surfaces also lack tests (schema-per-tenant search_path, cell-routing staleness). One missing category is rarely the only gap.

- **Anti-pattern compounds with `tenancy-as-afterthought`.** A team that delivered tenancy late often delivered its tests late; the cross-tenant assertion suite ships, the bypass suite never does.

## Remediation

Treat RLS-bypass test coverage as a schema invariant, not a nice-to-have:

1. **Schema invariant.** `test-catalogue.json#coverage_report.rls-bypass.must_have ≥ 1` when `tenancy_model` includes `row-level-security`; `bmad-bam-design-multi-tenant-testing`'s step-07-v exits 70 if violated. (Already enforced; this anti-pattern is the violation the invariant catches.)

2. **Adopt the bypass class library.** `bmad-bam-design-multi-tenant-testing` step-02 ships a default class library covering all six RLS-bypass surfaces (BYP-001 through BYP-006). Use the default; deviation requires ADR.

3. **Run `pg_proc` audit query in CI.** Every CI run enumerates `SECURITY DEFINER` functions on tenant-scoped schemas; the test framework asserts every discovered function has a corresponding test entry. New function without test = merge block. See `rls-bypass-test-design.md` Surface 1.

4. **Audit `BYPASSRLS` quarterly.** Manual review of `pg_roles WHERE rolbypassrls = true`. Document each entry: who owns the role, what process uses it, why bypass is required. Roles without clear owner are revoked. See `rls-bypass-test-design.md` Surface 2.

5. **Policy template enforced.** All tenant-scope policies use a template including both `USING` and `WITH CHECK`. Template version-controlled; deviation requires explicit reviewer sign-off. See `rls-bypass-test-design.md` Surface 5.

6. **`FORCE ROW LEVEL SECURITY` migration template.** All tenant-scope table-create migrations include `ALTER TABLE ... FORCE ROW LEVEL SECURITY` in the same migration as `ENABLE ROW LEVEL SECURITY`. See `rls-bypass-test-design.md` Surface 6.

7. **Treat bypass tests as `must-have`, not `should-have`.** CI cannot be hot-fix-bypassed on this category. If CI runtime is the cost driver, optimize the test infrastructure (per-test fresh DB via testcontainers snapshot replay; ~50ms per test amortized), not the test scope.

8. **Apply `rls-bypass-test-design.md` and `tenant-isolation-testing-patterns.md`.** These fragments provide the test design vocabulary + the broader testing patterns; this anti-pattern is the failure they prevent.

9. **Regression test on the discovery query itself.** If `pg_proc` audit query returns 0 `SECURITY DEFINER` rows, that may be a healthy state OR an indication the query is misconfigured (wrong schema, wrong predicate). Test the query against a fixture with a known `SECURITY DEFINER` function; assert it's discovered.

10. **Cross-link with `rls-deep-dive.md` §failure-modes.** Each documented failure mode in that fragment maps to a bypass test in this catalogue. Mapping table version-controlled; new failure mode in the fragment requires new test entry.

## When acceptable

There is essentially never a case where this anti-pattern is acceptable for a production multi-tenant RLS deployment. Narrow exceptions:

- **Pre-launch / pre-tenancy-lock.** Before tenancy-decision.json is committed, the RLS primitive is aspirational; the bypass test suite is deferred. Document the assumption; the bypass suite is in scope for QG-M2 sign-off prior to first tenant onboarding.

- **No `SECURITY DEFINER` functions AND no `BYPASSRLS` roles AND no `SET ROLE` capability granted.** A deployment that has truly eliminated all bypass surfaces (verifiable via the discovery queries in `rls-bypass-test-design.md`) reduces the bypass-test requirement to the unrelated surfaces (search_path, WITH CHECK, FORCE). Verify quarterly; the surfaces re-grow as the platform evolves.

- **Read-only follower replica with no app-tier `SECURITY DEFINER`.** A read-only follower inherits the upstream's RLS state. Document the assumption; do not duplicate the upstream's full bypass suite; do retain a thin assertion that the replica role lacks `BYPASSRLS`.

- **The "RLS deployment" is actually schema-per-tenant or cell-based and RLS was misclassified.** Re-classify the tenancy model; use the model's correct bypass test class library. Don't paper over with an exception.

## Cross-references

- Fragment: [rls-bypass-test-design.md](../fragments/rls-bypass-test-design.md) — the test design vocabulary this anti-pattern violates; canonical remediation reference
- Fragment: [tenant-isolation-testing-patterns.md](../fragments/tenant-isolation-testing-patterns.md) — the broader testing context; this anti-pattern is a specific failure mode in the catalogue
- Fragment: [rls-deep-dive.md](../fragments/rls-deep-dive.md) — RLS mechanism details + failure modes whose bypass tests this catalogue specifies
- Fragment: [isolation-test-evidence-signatures.md](../fragments/isolation-test-evidence-signatures.md) — evidence-signature standards; weak signatures on bypass tests compound this anti-pattern
- Cousin anti-pattern: `tenancy-as-afterthought.md` (P3.1 family) — adjacent failure mode (delivering tenancy late) that often manifests this missing-bypass-test gap
- Glossary: `rls-bypass`
- Gate: `QG-M2` (refined v1.1.0) — C5 (rls-bypass coverage criterion) is sourced from this anti-pattern's required tests; sign-off requires must_have ≥ 1 when row-level-security is in scope
