---
id: QG-M2
title: Tenant Isolation
module: bmad-bam-platform
phase: solutioning
criticality: blocking
depends-on: [QG-F1, QG-M1]
evidence-depends-on:
  - QG-F1/tenancy-decision.json
  - QG-F1/module-decomposition.json
  - QG-M1/criteria-met.md
  - QG-M2/onboarding-flow.json
  - QG-M2/offboarding-policy.json
  - QG-M2/test-catalogue.json
  - QG-M2/migration-runbook.json   # mirror; partial proxy for H4
auto-checkable: 60
human-review: 40
last_reviewed: 2026-05-17
version: 1.1.0
status: active
---

# QG-M2 — Tenant Isolation

## Purpose

Verify that the chosen tenancy model (decided at QG-F1) is correctly implemented at the module-architecture level: tenant context propagates through all code paths, isolation tests exist and pass, and no cross-tenant leakage is possible by construction.

## Criteria

### Pre-criterion (gate-prerequisite, blocking)

- **C0 — All 4 P3.2 evidence files exist** — `onboarding-flow.json`, `offboarding-policy.json`, `test-catalogue.json`, `migration-runbook.json` MUST exist at `_bmad/bam/evidence/QG-M2/`. If any absent, emit diagnostic `"Run skill X before QG-M2"` and refuse to score (gate doesn't run; not a fail/pass — prerequisite block).

C0 is the prerequisite — gates entry to the gate itself. C1-C6 below are scored once C0 passes.

### Automatable (machine-checkable, 60%)

- **C1 — Tenant isolation tests exist** — `test-catalogue.json` at `_bmad/bam/evidence/QG-M2/` (preferred) AND `coverage_report.isolation.must_have ≥ 1` AND `coverage_report.rls-bypass.must_have ≥ 1`. **Legacy form** (test-tag query output) accepted until 2026-Q3 with `decision.md` annotation. Evidence: JSON inspection or legacy test-tag query.
- **C2 — RLS policies present (if RLS chosen)** — All tenant-scoped tables have `ENABLE ROW LEVEL SECURITY` + policy. Evidence: schema introspection or migration grep.
- **C3 — Schema isolation present (if schema-per-tenant chosen)** — Connection pool routes by tenant; per-tenant schemas created on onboarding. Evidence: connection pool config + onboarding workflow inspection.
- **C4 — Cell-routing present (if cell-based chosen)** — Tenant → cell routing exists at gateway; intra-cell communication forbidden by network policy. Evidence: gateway config + network policy YAML.
- **C5 — Tenant-context-propagation linter passes** — `test-catalogue.json` has ≥1 entry with `category: isolation` AND `universal: true`. Evidence: JSON inspection.
- **C6 (PROMOTED from H5 in v1.0.0) — Onboarding has explicit isolation-verification step for live-traffic flows** — Every flow in `onboarding-flow.json` where `live_traffic == true` has `isolation_verification_step.blocking == true`. Demo/sandbox flows (`live_traffic == false`) exempt. Evidence: machine-checkable JSON inspection.

### Human-review (40%)

- **H1 — Tenant-isolation threat model exists** — Document enumerates attack vectors (SQL injection at tenant boundary, IDOR via session swap, cache-key collision, vector-DB cross-tenant retrieval, KV-cache cross-tenant residue). Each vector has a mitigation. Evidence: `test-catalogue.json` enumerated attack vectors per category with `evidence_signature`; reviewer signs off based on coverage breadth + depth.
- **H2 — Onboarding/offboarding flow preserves isolation** — Reviewer confirms tenant lifecycle workflows don't introduce isolation gaps (e.g., shared resources during tenant creation, lingering grants after teardown). Evidence: `onboarding-flow.json` + `offboarding-policy.json` + `reverse_map` symmetric pair (provisioning hooks ↔ tear-down hooks) + reviewer sign-off.
- **H3 — Noisy-neighbor mitigation specified** — Quotas, rate limits, and fair-use enforcement defined per tenant tier. Evidence: partial proxy via `test-catalogue.json` noisy-neighbor category entries; full evidence pending P3.3 `design-rate-limit-per-tenant`.
- **H4 — Disaster recovery preserves isolation** — DR plan doesn't introduce isolation gaps (e.g., backup-restore-from-tenant-A-into-tenant-B). Evidence rule:
  - **Until P10 ships:** `migration-runbook.json` mirror at `_bmad/bam/evidence/QG-M2/` IS the H4 evidence (partial-proxy state)
  - **After P10 ships AND `design-disaster-recovery` has run:** DR output supersedes; migration-runbook becomes supporting evidence
  - Reviewer sign-off required in both states

**(H5 removed in v1.1.0 — promoted to C6 auto-criterion.)**

## **CRITICAL** — these must always pass for blocking-gate satisfaction

- C2/C3/C4 (whichever applies to chosen tenancy model) MUST pass auto-check
- **C6** (isolation-verification step in every live-traffic onboarding flow) MUST pass auto-check (NEW; non-waivable — for non-live tiers, mark `live_traffic: false` per spec Section 3.2; not a waiver path)
- H1 (threat model) MUST be reviewer-approved

If any CRITICAL criterion fails, QG-M2 fails and the project cannot proceed to downstream module-level gates.

**Hybrid-model note:** for `tenancy_model: "hybrid"`, all applicable isolation mechanisms (across C2/C3/C4) must pass.

## Pass conditions

- ALL criteria (C0 + C1-C6 + H1-H4) pass OR
- Non-CRITICAL criteria waived via `waive-gate` workflow with compensating control documented in `decision.md`
- CRITICAL criteria (C2/C3/C4 as applicable, C6, H1) CANNOT be waived

## Evidence destination

`_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per `std-validation`.

Stable pointers (the JSON files in `evidence-depends-on`) are updated atomically at gate run.

## How to evaluate (manual; until P11.2 gate-runner ships)

1. Verify C0 prerequisites: all 4 P3.2 evidence files exist at `_bmad/bam/evidence/QG-M2/`. If absent, run the missing skill before re-attempting.
2. For each C1-C6 auto-criterion, run the Python validation snippet (see criterion's Evidence row); capture exit code + diagnostic.
3. For each H1-H4 human-review criterion, the reviewer reads the cited evidence file(s) + signs `criteria-met.md` with a one-paragraph rationale.
4. Apply CRITICAL constraint: if any CRITICAL criterion fails, gate fails (no waiver).
5. Apply waiver path for non-CRITICAL only: use `waive-gate` workflow with compensating control in `decision.md`.
6. Final decision recorded in `_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/decision.md` per `std-validation`.

## Version compatibility

Projects on QG-M2 v1.0.0 (pre-P3.2) may stay until 2026-Q3 deprecation. Legacy evidence form (test-tag query output) accepted with `decision.md` annotation. New projects MUST use v1.1.0. After 2026-Q3, only v1.1.0 accepted.

Waivers granted under v1.0.0 remain valid for v1.1.0 if criterion ID + semantics unchanged. C1 + C5 refined → re-waiver required if previously waived. H5→C6 promotion → re-waiver required (was H-review; now auto-criterion).

## Web Research Queries (for refresh-knowledge)

- `multi-tenant SaaS isolation patterns {date}`
- `PostgreSQL RLS performance multi-tenant {date}`
- `cell-based architecture AWS {date}`
- `tenant isolation testing strategies {date}`
