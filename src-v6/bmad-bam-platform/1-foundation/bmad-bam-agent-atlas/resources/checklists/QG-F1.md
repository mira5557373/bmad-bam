---
id: QG-F1
title: Foundation
module: bmad-bam-platform
phase: solutioning
criticality: blocking
depends-on: []
evidence-depends-on:
  - QG-F1/tenancy-decision.json
  - QG-F1/module-decomposition.json
  - QG-F1/deployment-topology.json
  - QG-F1/tier-model.json
  - QG-F1/finops-baseline.json
  - QG-F1/foundation-coherence.json
auto-checkable: 60
human-review: 40
last_reviewed: 2026-05-17
version: 1.0.0
status: active
prerequisite: "all 5 Foundation skills must have run"
---

# QG-F1 — Foundation

## Purpose

Verify that the project's multi-tenant SaaS Foundation is complete and coherent: tenancy model, modular-monolith decomposition, deployment topology, tier model, and FinOps baseline have all been decided, recorded as structured artifacts, and reconciled against each other. QG-F1 is the first blocking gate — every module-level decision (Lifecycle, Commercial, Brownfield) builds on these Foundation choices, so an incoherent Foundation propagates downstream defects.

## Criteria

### Pre-criterion (gate-prerequisite, blocking)

- **C0 — All 5 Foundation skills have run** — The 5 stable evidence pointers below MUST exist before QG-F1 can run. If any is missing, emit diagnostic "Run skill X before QG-F1" and refuse to proceed:
  - `_bmad/bam/evidence/QG-F1/tenancy-decision.json` (produced by `bmad-bam-design-tenancy-model`)
  - `_bmad/bam/evidence/QG-F1/module-decomposition.json` (produced by `bmad-bam-design-modular-monolith`)
  - `_bmad/bam/evidence/QG-F1/deployment-topology.json` (produced by `bmad-bam-design-deployment-topology`)
  - `_bmad/bam/evidence/QG-F1/tier-model.json` (produced by `bmad-bam-design-tenant-tier-model`)
  - `_bmad/bam/evidence/QG-F1/finops-baseline.json` (produced by `bmad-bam-design-finops-model`)

C0 is the prerequisite — it gates entry to the gate itself. C1-C6 below are scored once C0 passes.

### Automatable (machine-checkable, 60%)

- **C1 — Every Foundation skill produced its JSON evidence file** — All 5 JSON files exist (symmetric to C0 but recorded as a standard auto-criterion in `criteria-met.md`). Evidence: directory listing of `_bmad/bam/evidence/QG-F1/`.
- **C2 — Each JSON validates against its schema** — Each of the 5 JSON files has `schema_version` field present + all required keys per the schemas in `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md` §3. Evidence: schema-validation tool output.
- **C3 — Foundation coherence verified** — `foundation-coherence.json` exists and reports `coherent: true` (produced by `verify-coherence` step at end of `bmad-bam-design-finops-model`; algorithm in spec §3.R2). Evidence: file contents.
- **C4 — Tenancy attribution affordances present** — `tenancy-decision.json` has non-empty `attribution_affordances` block with `compute`, `storage`, `network` keys populated. Evidence: JSON inspection.
- **C5 — Tier model has valid tier count** — `tier-model.json` has either exactly 5 tiers (default) OR 3-7 tiers with `custom_tiers_mode: true`. Evidence: tier-count check.
- **C6 — Modular-monolith ADR with bounded contexts** — `module-decomposition.json` has `bounded_contexts: [...]` array with ≥2 entries. Evidence: array-length check.

### Human-review (40%)

- **H1 — Tenancy decision is grounded** — Reviewer confirms tenancy decision references real tenant projections (count, growth, isolation regulatory requirements) and real compliance scope (HIPAA, SOC2, regional residency). Evidence: tenancy-model.md rationale section + reviewer sign-off.
- **H2 — Bounded contexts align with tenancy boundaries** — Reviewer confirms `module-decomposition.json`'s bounded contexts don't leak tenancy concerns into tenant-agnostic modules (e.g., billing and notifications are correctly marked `tenant_aware: true`; auth boundary is correctly placed). Evidence: module-decomposition.md review + reviewer sign-off.
- **H3 — Deployment per-tier defaults fit risk tolerance** — Reviewer confirms the 4 tier-mapped rollout defaults (or any overrides) match the project's risk tolerance — e.g., enterprise tier uses blue-green-pilot if regulated; free tier permits aggressive-canary if blast-radius is acceptable. Evidence: deployment-topology.md review + reviewer sign-off.
- **H4 — Tier transitions match commercial reality** — Reviewer confirms `tier-model.json` transitions (upgrade paths, price/feature deltas) avoid tier-cliff anti-pattern; downgrade rate-arbitrage hook is acknowledged for P3.3. Evidence: tier-model.md review + reviewer sign-off.

## **CRITICAL** — these must always pass for blocking-gate satisfaction

- **C1** (all 5 JSON files exist) MUST pass auto-check
- **C2** (each JSON validates against schema) MUST pass auto-check
- **C3** (foundation-coherence.json reports `coherent: true`) MUST pass auto-check
- **H1** (tenancy decision grounded) MUST pass reviewer sign-off

If any CRITICAL criterion fails, QG-F1 fails and the project cannot proceed to module-level gates (QG-M1, QG-M2, etc.).

## Pass conditions

- ALL criteria (C0 + C1-C6 + H1-H4) pass OR
- Non-CRITICAL criteria waived via `waive-gate` workflow with compensating control documented in `decision.md`
- CRITICAL criteria (C1, C2, C3, H1) CANNOT be waived

## Evidence destination

`_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/` with:
- `criteria-met.md` — auto-criteria + human-review outcomes per `std-validation`
- `decision.md` — pass/fail decision with rationale and any waivers per `std-validation`

Stable pointers (the 6 JSON files in `evidence-depends-on`) are updated atomically at gate run.

## Web Research Queries (for refresh-knowledge)

- `multi-tenant SaaS foundation architecture {date}`
- `modular monolith bounded contexts {date}`
- `SaaS unit economics {date}`
- `tenant tier pricing strategy {date}`
