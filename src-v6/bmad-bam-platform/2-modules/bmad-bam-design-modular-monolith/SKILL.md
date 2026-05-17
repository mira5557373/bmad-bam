---
name: bmad-bam-design-modular-monolith
description: "Decompose a multi-tenant SaaS codebase into bounded contexts with ports/adapters at each boundary. Default: hybrid DDD + hexagonal. Decision-matrix scores DDD-pure / ports-pure / hybrid / vertical-slice against tenant-count fit, team size, domain complexity, migration cost, test ergonomics, and AI-agent comprehensibility. Output: module-decomposition.md + module-decomposition.json (QG-F1 + QG-M1 evidence). Invoke via `/bmad-bam-design-modular-monolith`."
---

# bmad-bam-design-modular-monolith

## Purpose

Lock down the module map BEFORE writing code. A multi-tenant SaaS that gets module boundaries wrong leaks tenancy into infrastructure code and forces costly retrofits. This workflow elicits the project's domain, scores 4 decomposition options, recommends one (hybrid by default), and produces the artifact downstream architecture decisions depend on.

## When to invoke

- Greenfield SaaS — invoke before writing the first module-spanning code
- Brownfield retrofit — after `analyze-existing-tenancy` (P3.4) but before refactoring
- Whenever team size doubles or domain scope changes materially

## Inputs

- Soft: `tenancy-decision.json` (recommended; workflow runs without it but warns; affects bounded-context alignment)
- Elicited at runtime: domain summary, team size, current codebase size, brownfield-or-greenfield

## Output

- `docs/architecture/module-decomposition.md` — human-readable decision document
- `_bmad/bam/evidence/QG-F1/module-decomposition.json` — machine contract; schema per spec §3 + ADR-015

## Gate

QG-F1 (blocking) + QG-M1 (partial — full in P3.2).
