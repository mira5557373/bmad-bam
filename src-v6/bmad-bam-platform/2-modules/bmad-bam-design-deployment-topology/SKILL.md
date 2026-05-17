---
name: bmad-bam-design-deployment-topology
description: "Design rollout strategy + tenant cohorts for multi-tenant SaaS deployments. Tightly coupled to tenancy choice — same code, different cohorting per tenancy model. 4 tier-mapped rollout defaults baked in (free→canary, starter→weekly waves, pro→blue/green, enterprise→opt-in maintenance windows). Output: deployment-topology.md + deployment-topology.json (QG-F1 evidence). Invoke via `/bmad-bam-design-deployment-topology`."
---

# bmad-bam-design-deployment-topology

## Purpose

A multi-tenant SaaS deploys to ALL tenants on every release, but not necessarily simultaneously. Wrong rollout topology means either (a) one bad deploy nukes every customer at once, or (b) cohort drift makes debugging impossible. This workflow elicits rollout strategy, maps cohorts to tier + tenancy choice, and produces the deployment plan downstream runbooks depend on.

## When to invoke

- After `design-tenancy-model` (REQUIRED upstream) — tenant cohorting is tenancy-coupled
- Before standing up CI/CD pipelines for the SaaS
- Whenever tier model changes (e.g., new enterprise tier added) — re-run to align cohorts

## Inputs

- Required: `tenancy-decision.json` — rollout strategy must align with isolation model
- Soft: `tier-model.json` (recommended; lets cohort mapping pre-fill from tier defaults)
- Elicited at runtime: change-window tolerance, regions, on-call coverage

## Output

- `docs/architecture/deployment-topology.md` — human-readable decision document
- `_bmad/bam/evidence/QG-F1/deployment-topology.json` — machine contract; schema per spec §3 + ADR-015

## Gate

QG-F1 (blocking).
