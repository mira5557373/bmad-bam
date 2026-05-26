---
id: QG-D1
title: Disaster Recovery (partial)
module: bmad-bam-platform
phase: solutioning
criticality: partial
depends-on: [QG-F1, QG-M2]
evidence-depends-on:
  - QG-D1/migration-runbook.json
auto-checkable: 100
human-review: 0
last_reviewed: 2026-05-17
version: 0.1.0
status: partial
note: "Auto-criteria only; H-criteria deferred to P10 ops (design-disaster-recovery completes RPO/RTO + failover-drill + multi-region replication evidence). Migration-runbook.json provides partial proxy for migration-side resilience. Catalog reference: spec §8.1; evidence storage: spec §8.4."
---

# QG-D1 — Disaster Recovery (partial)

## Purpose

Verify that the project's tenant migration tooling is structurally sound and provides a partial proxy for disaster-recovery readiness on the migration axis: migration runbook exists with rollback gates and abort criteria, zero-downtime requirements are consistent with chosen migration mechanisms, and reference-availability flags are reconciled. **This is a v0.1.0 PARTIAL gate** — only auto-criteria are scored. Human-review criteria (RPO/RTO targets, failover drill cadence, multi-region replication topology, backup-integrity verification, region-failure runbook) are deferred to **P10** when `bmad-bam-design-disaster-recovery` provides the evidence needed for full DR review. P10 promotes QG-D1 to `criticality: blocking` with H-criteria added; the existing `migration-runbook.json` becomes supporting evidence for the migration axis at that point.

## Criteria

### Pre-criterion (gate-prerequisite, blocking)

- **C0 — migration-runbook.json exists** — `migration-runbook.json` MUST exist at `_bmad/bam/evidence/QG-D1/`. If absent, emit diagnostic `"Run bmad-bam-design-tenant-migration-tooling before QG-D1"` and refuse to score (gate doesn't run; not a fail/pass — prerequisite block).

C0 is the prerequisite — gates entry to the gate itself. C1-C5 below are scored once C0 passes.

### Automatable (machine-checkable, 100%)

- **C1 — Files present at both locations** — `migration-runbook.md` at `docs/architecture/` AND `migration-runbook.json` at `_bmad/bam/evidence/QG-D1/` AND mirror at `_bmad/bam/evidence/QG-M2/` (partial proxy for QG-M2 H4). Evidence: file existence checks across all 3 locations.
- **C2 — Schema valid** — `migration-runbook.json` has `schema_version` field, `migration_axes: [...]` non-empty array, and per-axis keys (`cohort_plan`, `rollback_gate`, `dry_run_plan`, `abort_criteria`) match the schema in spec §3. Evidence: schema-validation tool output.
- **C3 — Each active axis has rollback_gate + abort_criteria** — For each entry in `migration_axes[*]` where the axis is active (i.e., not `n/a`), both `rollback_gate` and `abort_criteria` fields are present and non-empty. Evidence: per-axis field check.
- **C4 — zero_downtime_required boolean consistency** — `zero_downtime_required` field is a boolean. If `true`, no axis uses `cell_failback` as a primary mechanism (cell_failback implies non-zero-downtime semantics by definition). Evidence: cross-field consistency check.
- **C5 — References consistency (degraded flag matches input availability)** — `references_degraded` boolean is present; if `true`, the runbook MUST cite which Foundation reference was degraded (e.g., missing `tier-model.json` axis assumptions) in `decision.md` annotation. Evidence: flag presence + annotation cross-check.

### Human-review (0% in v0.1.0)

Deferred to P10 ops. When P10 ships `bmad-bam-design-disaster-recovery`, this section will add (5 H-criteria):
- RPO/RTO targets reviewed against tenant tier expectations
- Failover drill cadence + post-drill review process documented
- Multi-region replication topology reviewed (active/active vs active/passive vs backup-only)
- Backup-integrity verification cadence + restore-test results documented
- Region-failure runbook reviewed (declaration criteria, escalation chain, tenant-comms plan)

## Pass conditions (v0.1.0 partial)

- ALL C0 + C1-C5 auto-criteria pass — gate passes as partial
- ANY auto-criterion fails — gate fails; user must re-run `bmad-bam-design-tenant-migration-tooling` to address

No waivers are accepted for this partial gate; auto-criteria are structural minimums.

## Evidence destination

`_bmad/bam/evidence/QG-D1/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per `std-validation`.

Primary artifact: `migration-runbook.json` at `_bmad/bam/evidence/QG-D1/` (stable pointer). Mirror: `_bmad/bam/evidence/QG-M2/migration-runbook.json` (partial proxy for QG-M2 H4 until P10 ships).

## How to evaluate (manual; until P11.2 gate-runner ships)

1. Verify C0 prerequisite: `migration-runbook.json` exists at `_bmad/bam/evidence/QG-D1/`. If absent, run `bmad-bam-design-tenant-migration-tooling` before re-attempting.
2. For each C1-C5 auto-criterion, run the validation snippet (see criterion's Evidence row); capture exit code + diagnostic.
3. No human-review section in v0.1.0 — skip to step 4.
4. If all C1-C5 pass, gate passes as partial. If any auto-criterion fails, gate fails; re-run the producing skill to address.
5. Final decision recorded in `_bmad/bam/evidence/QG-D1/YYYY-MM-DD-NNN/decision.md` per `std-validation`.

## Status note

This gate is `status: partial` and `criticality: partial` until **P10** completes the DR story with `bmad-bam-design-disaster-recovery`. Downstream gates that reference QG-D1 will treat the partial gate as passing on auto-criteria alone for the duration of P3.2 through P9 waves. The `migration-runbook.json` evidence file is also mirrored at `_bmad/bam/evidence/QG-M2/` as a partial proxy for QG-M2 H4 (disaster recovery preserves isolation); see QG-M2 v1.1.0 H4 temporal contract for the supersession rule once P10 ships.

## Web Research Queries (for refresh-knowledge)

- `tenant migration patterns multi-tenant SaaS {date}`
- `zero-downtime tenant migration {date}`
- `tenant tier upgrade rollback strategies {date}`
- `region migration multi-tenant data residency {date}`
