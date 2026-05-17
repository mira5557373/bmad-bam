---
name: bmad-bam-design-multi-tenant-testing
description: "Generate per-isolation-model test catalogue: isolation, noisy-neighbor, quota, RLS-bypass specs. Catalogue is a structured test-spec contract (machine-parseable evidence signatures) — NOT executable test code. Output: test-catalogue.md + .json + QG-M2-test-catalogue-evidence.md (QG-M2 evidence). Ships 1 BMM overlay (customize-template/bmad-qa-generate-e2e-tests). Invoke via /bmad-bam-design-multi-tenant-testing."
---

# bmad-bam-design-multi-tenant-testing

## Purpose

Multi-tenant systems prove their isolation claims via tests — but isolation testing is structurally different from feature testing: tests prove negatives (cross-tenant data path CANNOT exist), require per-isolation-model bypass enumerations (RLS, schema-per-tenant, cell-based each have different attack surfaces), and need machine-parseable evidence to feed QG-M2 H1. This workflow elicits the tenancy decision + (soft) tier model, resolves hybrid per-tier mechanism maps, and emits a per-isolation-model test catalogue covering five categories — isolation, noisy-neighbor, quota, rls-bypass, cross-tenant-cache — with universal-cross-model tests marked, must-have / should-have / nice-to-have severity bands, and `traceable_to` cross-references to QG criteria.

The catalogue is a structured **specification** of required tests (id, name, applies_to, universal, category, severity, evidence_signature, traceable_to) — NOT executable test code. Downstream skills consume this as a contract: `bmad-qa-generate-e2e-tests` (BMM) generates test code against it via the customize-template overlay shipped by this skill; QG-M2 sign-off verifies every must-have entry has a corresponding test in CI.

## When to invoke

- After tenancy is decided (required; tenancy-decision.json provides isolation_model + hybrid_resolution)
- After tier-model is decided (soft; tier-model.json informs noisy-neighbor severity bands per tier)
- Before any production launch — the catalogue must be locked + tests realized before QG-M2 gate sign-off
- After tenancy-model migration (re-run; isolation primitives wholesale-replaced → existing catalogue stale)
- After auth, routing, or connection-pool changes (re-run Validate mode; per-model attack surface may shift)

## Inputs

- Required: `tenancy-decision.json` — provides `tenancy_model` + (when hybrid) `hybrid_resolution`
- Soft: `tier-model.json` — provides per-tier list for noisy-neighbor severity assignment; degraded gracefully — uniform `severity: should-have` for noisy-neighbor category when absent

## Output

- `docs/architecture/test-catalogue.md` — human-readable narrative
- `_bmad/bam/evidence/QG-M2/test-catalogue.json` — machine contract; schema per spec §3.4
- `_bmad/bam/evidence/QG-M2/QG-M2-test-catalogue-evidence.md` — human evidence narrative for QG-M2 (feeds H1, sharpens C1/C5)

## Gate

QG-M2 (v1.1.0). The test catalogue's `tests[]` array with `category: isolation` AND `universal: true` entries feeds C1 (universal isolation check); the `category: rls-bypass` must-have entries feed C5 (rls-bypass coverage when applicable to tenancy model).

## Customize-template overlay (1)

This skill ships 1 BMM customize-template overlay:

- `customize-template/bmad-qa-generate-e2e-tests/customize.toml` — augments BMM's `bmad-qa-generate-e2e-tests` workflow skill with BAM multi-tenant context (consults `test-catalogue.json` at runtime; universal-cross-model tests + per-model tests + RLS-bypass tests when applicable). Uses `[workflow]` namespace (BMM workflow-skill target, empirically verified) + specific-path persistent_facts per ADR-015 G6. Pinned to BMM v6.6.0.

The `bmad-design-test-strategy` overlay is DEFERRED per R3.2.6 — the BMM upstream skill does not yet exist (empirically verified 2026-05-17). Revisit when BMM ships it OR after BAM petitions BMM per roadmap §19.10.

## Flags

None.
