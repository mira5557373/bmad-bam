---
name: bmad-bam-design-tenant-onboarding
description: "Design tenant onboarding flows per tier with mandatory isolation-verification step. 3 default flow types (self_serve / assisted_signup / sales_led) keyed off tier-model upgrade_mode. Output: onboarding-flow.md + .json + QG-M2-onboarding-evidence.md (QG-M2 evidence). Invoke via /bmad-bam-design-tenant-onboarding."
---

# bmad-bam-design-tenant-onboarding

## Purpose

Onboarding shapes first-touch friction, isolation safety, and tier-conversion velocity. Manual onboarding bottlenecks throttle growth; missing isolation-verification creates cross-tenant leakage at the riskiest moment (provisioning). This workflow elicits per-tier flow types, provisioning hooks, and a mandatory isolation-verification step before any live traffic.

## When to invoke

- After tier-model is decided (required; tier-model.json provides tier list + upgrade_mode hint)
- After tenancy is decided (required; tenancy-decision.json provides isolation_model)
- Before paid traffic flows
- After deployment-topology (soft; cohort assignment can pre-fill from deployment hints)

## Inputs

- Required: `tier-model.json` (schema 1.0 with auto-fill OR 1.1)
- Required: `tenancy-decision.json`
- Soft: `deployment-topology.json` (cohort-assignment hint; degraded gracefully if absent)

## Output

- `docs/architecture/onboarding-flow.md` — human-readable narrative
- `_bmad/bam/evidence/QG-M2/onboarding-flow.json` — machine contract; schema per spec §3.2
- `_bmad/bam/evidence/QG-M2/QG-M2-onboarding-evidence.md` — human evidence narrative for QG-M2

## Gate

QG-M2 (refined v1.1.0).

## Flags

None.
