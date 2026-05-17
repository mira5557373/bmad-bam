---
name: bmad-bam-design-finops-model
description: "Establish per-tenant unit economics + cost attribution for a multi-tenant SaaS. Reads tenancy + tier + deployment artifacts (ALL required) and produces a cost-model that downstream gates can audit. Last in dependency order; runs verify-coherence as its 8th step to emit foundation-coherence.json. Output: finops-baseline.md + finops-baseline.json + foundation-coherence.json (QG-F1 evidence). Invoke via `/bmad-bam-design-finops-model`."
---

# bmad-bam-design-finops-model

## Purpose

Multi-tenant SaaS pricing only makes economic sense if you know per-tenant cost. This workflow elicits cost drivers, maps them to tenancy + tier + deployment choices, and produces the FinOps baseline that COGS reporting and pricing decisions depend on. As the last foundation skill in the dependency chain, its 8th step verifies coherence across all four foundation artifacts.

## When to invoke

- After `design-tenancy-model`, `design-tenant-tier-model`, AND `design-deployment-topology` (ALL three REQUIRED upstream)
- Before pricing-page work or any commitment to per-seat / per-resource billing
- Whenever any upstream foundation artifact changes — re-run to revalidate coherence

## Inputs

- Required: `tenancy-decision.json` — cost attribution model is tenancy-coupled
- Required: `tier-model.json` — per-tier cost allocation
- Required: `deployment-topology.json` — infra-cost cohort mapping
- Elicited at runtime: vendor pricing, AI inference budget, data egress profile

## Output

- `docs/architecture/finops-baseline.md` — human-readable cost model
- `_bmad/bam/evidence/QG-F1/finops-baseline.json` — machine contract; schema per spec §3 + ADR-015
- `_bmad/bam/evidence/QG-F1/foundation-coherence.json` — coherence-verification report across all 4 foundation artifacts (QG-F1 C3 evidence)

## Gate

QG-F1 (blocking). Produces 2 of 5 evidence files (finops-baseline + foundation-coherence).
