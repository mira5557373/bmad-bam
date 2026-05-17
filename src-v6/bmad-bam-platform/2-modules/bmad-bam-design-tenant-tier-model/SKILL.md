---
name: bmad-bam-design-tenant-tier-model
description: "Design the tier matrix for a multi-tenant SaaS: 5 default tiers (free / starter / pro / business / enterprise) with `--custom-tiers N` flag for 3-7-tier projects. Includes downstream-contract hints for deployment + finops (rollout-cohort defaults, per-tier cost-allocation hooks). Output: tier-model.md + tier-model.json (QG-F1 evidence). Invoke via `/bmad-bam-design-tenant-tier-model`."
---

# bmad-bam-design-tenant-tier-model

## Purpose

Tiers shape rollout cohorts, support SLAs, and per-tenant cost allocation. Getting the matrix wrong forces breaking changes once paying customers exist. This workflow elicits feature gates, capacity bands, and SLA tiers, then produces the tier model downstream deployment + FinOps skills consume.

## When to invoke

- Before pricing-page work or first paid-tier release
- After tenancy decision (soft input; some tenancy choices like cell-based naturally align with per-cell pricing)
- Before `design-deployment-topology` (preferred — lets cohorting pre-fill from tiers) and before `design-finops-model` (required upstream)

## Inputs

- Soft: `tenancy-decision.json` (recommended; tenancy choice constrains tier shape)
- Elicited at runtime: target tier count (default 5; `--custom-tiers 3..7`), feature-gate axes, capacity bands

## Output

- `docs/architecture/tier-model.md` — human-readable tier matrix + rationale
- `_bmad/bam/evidence/QG-F1/tier-model.json` — machine contract; schema per spec §3 + ADR-015

## Gate

QG-F1 (blocking).

## Flags

- `--custom-tiers N` — integer in range `[3, 7]`; default 5. Used for projects whose pricing surface isn't free/starter/pro/business/enterprise.
