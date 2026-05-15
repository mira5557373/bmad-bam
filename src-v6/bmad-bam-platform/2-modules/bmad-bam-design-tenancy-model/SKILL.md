---
name: bmad-bam-design-tenancy-model
description: "Facilitates the user picking a tenancy isolation model (RLS / schema-per-tenant / cell-based / hybrid) based on tenant count, compliance requirements, scale targets, and cost tolerance. Produces a tenancy-model.md design doc + an ADR. Owns gate QG-M2 (Tenant Isolation) — partial."
---

# bmad-bam-design-tenancy-model

## Purpose

Choose THE foundational tenancy isolation strategy for a multi-tenant SaaS product. Get this wrong and everything else compounds the cost. This workflow facilitates that choice.

## When to use

- Greenfield SaaS project; tenancy not yet chosen
- Brownfield product preparing to migrate tenancy model (use `analyze-existing-tenancy` first)
- Product expanding scale (e.g., from 100 tenants to 10,000) requiring re-evaluation

## Inputs

- Product brief or PRD documenting target customer segment
- Compliance framework selection (if known) — affects RLS eligibility for some controls
- 12-month tenant count projection
- Scale segment (SMB / mid-market / enterprise / consumer-via-tenants)

## Output

- `tenancy-model.md` — design doc placed under `{project-root}/docs/architecture/`
- ADR appended to `_bmad/_memory/atlas/architecture-decisions/`
- Evidence artifact for QG-M2 (partial; full QG-M2 requires module-architecture work)

## Steps

See `workflow.md` for the mode router and `steps/` for individual step files.
