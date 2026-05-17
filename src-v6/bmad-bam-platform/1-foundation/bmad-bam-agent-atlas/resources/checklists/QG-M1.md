---
id: QG-M1
title: Module Architecture (partial)
module: bmad-bam-platform
phase: solutioning
criticality: partial
depends-on: [QG-F1]
evidence-depends-on:
  - QG-F1/module-decomposition.json
auto-checkable: 100
human-review: 0
last_reviewed: 2026-05-17
version: 0.1.0
status: partial
note: "Auto-criteria only; H-criteria deferred to P3.2 (lifecycle skills complete the module-evolution evidence)."
---

# QG-M1 — Module Architecture (partial)

## Purpose

Verify that the project's modular-monolith decomposition is structurally sound: the decision matrix was scored, bounded contexts are enumerated with ports/adapters where required, and there are no circular dependencies in the module graph. **This is a v0.1.0 PARTIAL gate** — only auto-criteria are scored. Human-review criteria (module evolution, anti-corruption-layer placement review, refactor-cost trade-offs) are deferred to **P3.2** when lifecycle skills (onboarding/offboarding/migration) provide the evidence needed for module-evolution review. P3.2 promotes QG-M1 to `criticality: blocking` with H-criteria added.

## Criteria

### Automatable (machine-checkable, 100%)

- **C1 — module-decomposition.md exists** — Human-readable artifact present at `docs/architecture/module-decomposition.md`. Evidence: file existence check.
- **C2 — module-decomposition.json schema-valid** — JSON validates against schema: has `schema_version` field, `decision` field with one of (`ddd-pure` | `ports-pure` | `hybrid` | `vertical-slice`), and `bounded_contexts: [...]` array with ≥2 entries. Evidence: schema-validation tool output.
- **C3 — Each bounded_context declares adapter_ports** — Every entry in `bounded_contexts[*]` has an `adapter_ports: [...]` array. Empty array is permitted for `decision: ddd-pure` (no ports/adapters enforcement); non-empty array required for `ports-pure`, `hybrid`, and `vertical-slice` decisions. Evidence: per-context field check.
- **C4 — No circular dependencies in module graph** — Topological-sort check on `bounded_contexts[*].depends_on` graph completes without cycle detection. Evidence: parse-time graph analysis output.
- **C5 — Decision matrix scored ≥3 of 4 options against ≥4 of 6 axes** — `decision_matrix_ref` in `module-decomposition.json` points to a recorded decision-matrix.json (produced in step-03 of `design-modular-monolith`). The matrix scored at least 3 of 4 options (ddd-pure / ports-pure / hybrid / vertical-slice) against at least 4 of 6 axes (tenant-count fit, team size, domain complexity, migration cost, test ergonomics, AI-agent comprehensibility). Evidence: decision-matrix.json contents.

### Human-review (0% in v0.1.0)

Deferred to P3.2. When P3.2 ships lifecycle skills, this section will add:
- Reviewer confirmation that module boundaries support tenant lifecycle workflows (onboarding/offboarding/migration)
- Anti-corruption-layer placement review at integration boundaries
- Refactor-cost trade-off review (brownfield projects only)

## Pass conditions (v0.1.0 partial)

- ALL C1-C5 auto-criteria pass — gate passes as partial
- ANY auto-criterion fails — gate fails; user must re-run `bmad-bam-design-modular-monolith` to address

No waivers are accepted for this partial gate; auto-criteria are structural minimums.

## Evidence destination

`_bmad/bam/evidence/QG-M1/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per `std-validation`.

## Status note

This gate is `status: partial` and `criticality: partial` until **P3.2** completes the module-architecture story with lifecycle evidence. Downstream gates that reference QG-M1 (e.g., QG-M2 Tenant Isolation, which has `depends-on: [QG-F1, QG-M1]`) will treat the partial gate as passing on auto-criteria alone for the duration of P3.1 and P2.x waves.
