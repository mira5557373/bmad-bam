---
id: QG-M1
title: Module Architecture
module: bmad-bam-platform
phase: solutioning
criticality: blocking
depends-on: [QG-F1]
evidence-depends-on:
  - QG-F1/module-decomposition.json
  - QG-M2/onboarding-flow.json
  - QG-M2/offboarding-policy.json
  - QG-M2/test-catalogue.json
  - QG-D1/migration-runbook.json
auto-checkable: 60
human-review: 40
last_reviewed: 2026-05-17
version: 1.0.0
status: active
note: "Promoted from partial to blocking in P3.2. v0.1.0→v1.0.0 is a MAJOR bump because partial→blocking changes downstream resolution behavior (QG-M2's depends-on resolves differently); ADR-016 captures the transition."
---

# QG-M1 — Module Architecture

## Purpose

Verify that the project's modular-monolith decomposition is structurally sound: the decision matrix was scored, bounded contexts are enumerated with ports/adapters where required, and there are no circular dependencies in the module graph. **Promoted to blocking in P3.2** — auto-criteria (C1-C5) check structural soundness; human-review criteria (H1-H3) confirm bounded contexts support tenant lifecycle workflows (onboarding/offboarding/migration), ACL placement at integration boundaries, and refactor-cost trade-offs for brownfield projects. P3.2 lifecycle outputs (4 P3.2 evidence files) supply the evidence needed for the new H-criteria.

## Criteria

### Pre-criterion (gate-prerequisite, blocking)

- **C0 — All 4 P3.2 evidence files + module-decomposition.json exist** — `module-decomposition.json` at `_bmad/bam/evidence/QG-F1/`, plus `onboarding-flow.json`, `offboarding-policy.json`, `test-catalogue.json` at `_bmad/bam/evidence/QG-M2/`, plus `migration-runbook.json` at `_bmad/bam/evidence/QG-D1/` MUST all exist. If any absent, emit diagnostic `"Run skill X before QG-M1"` and refuse to score (gate doesn't run; not a fail/pass — prerequisite block).

C0 is the prerequisite — gates entry to the gate itself. C1-C5 + H1-H3 below are scored once C0 passes.

### Automatable (machine-checkable, 60%)

- **C1 — module-decomposition.md exists** — Human-readable artifact present at `docs/architecture/module-decomposition.md`. Evidence: file existence check.
- **C2 — module-decomposition.json schema-valid** — JSON validates against schema: has `schema_version` field, `decision` field with one of (`ddd-pure` | `ports-pure` | `hybrid` | `vertical-slice`), and `bounded_contexts: [...]` array with ≥2 entries. Evidence: schema-validation tool output.
- **C3 — Each bounded_context declares adapter_ports** — Every entry in `bounded_contexts[*]` has an `adapter_ports: [...]` array. Empty array is permitted for `decision: ddd-pure` (no ports/adapters enforcement); non-empty array required for `ports-pure`, `hybrid`, and `vertical-slice` decisions. Evidence: per-context field check.
- **C4 — No circular dependencies in module graph** — Topological-sort check on `bounded_contexts[*].depends_on` graph completes without cycle detection. Evidence: parse-time graph analysis output.
- **C5 — Decision matrix scored ≥3 of 4 options against ≥4 of 6 axes** — `decision_matrix_ref` in `module-decomposition.json` points to a recorded decision-matrix.json (produced in step-03 of `design-modular-monolith`). The matrix scored at least 3 of 4 options (ddd-pure / ports-pure / hybrid / vertical-slice) against at least 4 of 6 axes (tenant-count fit, team size, domain complexity, migration cost, test ergonomics, AI-agent comprehensibility). Evidence: decision-matrix.json contents.

### Human-review (40%)

- **H1 — Module boundaries support tenant lifecycle workflows** (NEW; CRITICAL) — Reviewer confirms bounded contexts accommodate onboarding/offboarding/migration without cross-context tight-coupling:
  - `onboarding-flow.json#flows[*].provisioning_hooks[*].module` references map to bounded contexts (or to `platform` for shared)
  - `offboarding-policy.json#cross_module_handoffs[*].module` + `tear_down_hooks[*].module` map to bounded contexts
  - **No lifecycle hook crosses 3+ unique modules without an explicit ports/adapters declaration** (Rationale: 2 is unavoidable — any cross-context interaction = 2 contexts; 3+ implies fan-out warranting ACL/port pattern)
  - Evidence: 4 P3.2 outputs + module-decomposition.md + reviewer sign-off
  - Brownfield-waiver path: `waive-gate` with compensating control = "documented refactor plan with deadline ≤ 90 days"

- **H2 — Anti-corruption-layer placement reviewed at integration boundaries** (NEW) — Reviewer confirms contexts marked `tenant_aware: true` in `module-decomposition.json` are insulated from tenant-agnostic contexts via ACL pattern. Particularly: billing↔platform, ai_memory↔platform, audit_trail↔platform. **Distinct from QG-F1 H2:** F1 H2 checks WHO has tenant context (tenancy alignment); M1 H2 checks HOW boundaries are insulated (ACL pattern). Complementary, not overlapping. Evidence: module-decomposition.md ACL section + reviewer sign-off.

- **H3 — Refactor-cost trade-off reviewed** (NEW; brownfield-only) — For brownfield projects, reviewer confirms refactor-cost trade-offs are documented (which contexts were chosen vs alternatives, why current cost was accepted, deferred refactors with deadlines). Greenfield: `n/a` (not a fail). Evidence: module-decomposition.md trade-off section + reviewer sign-off OR `n/a` annotation in `criteria-met.md` for greenfield projects.

## **CRITICAL** — these must always pass for blocking-gate satisfaction

- All C1-C5 auto-criteria (unchanged from partial)
- **H1** (lifecycle support) MUST be reviewer-approved (brownfield-waiver allowed via `waive-gate` with compensating control = "documented refactor plan with deadline ≤ 90 days")

If any CRITICAL criterion fails, QG-M1 fails and the project cannot proceed to downstream module-level gates (QG-M2, etc.).

## Pass conditions

- ALL criteria (C0 + C1-C5 + H1-H3) pass OR
- Non-CRITICAL criteria (H2, H3) waived via `waive-gate` workflow with compensating control documented in `decision.md`
- CRITICAL criteria (C1-C5, H1) CANNOT be waived (H1 has documented brownfield-waiver path with compensating control = "documented refactor plan with deadline ≤ 90 days")

## Evidence destination

`_bmad/bam/evidence/QG-M1/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per `std-validation`.

## How to evaluate (manual; until P11.2 gate-runner ships)

1. Verify C0 prerequisites: all 4 P3.2 evidence files + `module-decomposition.json` exist. If absent, run the missing skill before re-attempting.
2. For each C1-C5 auto-criterion, run the validation snippet (see criterion's Evidence row); capture exit code + diagnostic.
3. For each H1-H3 human-review criterion, the reviewer reads the cited evidence file(s) + signs `criteria-met.md` with a one-paragraph rationale. For greenfield projects, H3 is recorded `n/a` in `criteria-met.md`.
4. Apply CRITICAL constraint: if any CRITICAL criterion fails, gate fails (H1 has brownfield-waiver path with compensating control).
5. Apply waiver path for non-CRITICAL only (H2, H3): use `waive-gate` workflow with compensating control in `decision.md`.
6. Final decision recorded in `_bmad/bam/evidence/QG-M1/YYYY-MM-DD-NNN/decision.md` per `std-validation`.

## Status note

Promoted to blocking in P3.2; cross-references QG-M2 v1.1.0 H1 (test-catalogue produced under P3.2). Downstream gates that reference QG-M1 (e.g., QG-M2 Tenant Isolation, which has `depends-on: [QG-F1, QG-M1]`) now resolve against a blocking gate; partial-mode pass-through is no longer applicable.
