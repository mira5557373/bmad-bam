# bmad-bam-platform

> **Status:** P2.1 MVP (post-Wave-0). One usable workflow + activation mechanism realized.

The platform foundation module of the BAM v6 family. Owns multi-tenant SaaS platform foundation: tenancy isolation, modular monolith decomposition, deployment topology, FinOps, tenant tier modeling, billing/tax/rate-limiting.

## What ships in P2.1

- **Activation mechanism (§7.6 Path B — selected after Task 0 invalidated Path A)** — BMAD's native `post-install-notes` channel surfaces `bmad-bam-finalize`, a one-shot skill the user invokes after `bmad install bmad-bam-platform` to generate `_bmad/platform/project-context.md` for universal-glob auto-load.
- **Atlas full persona** — voice, role, identity, principles, menu. Lives in each skill's customize.toml (per BMAD convention).
- **One complete workflow** — `bmad-bam-design-tenancy-model` (7 steps + template). Produces tenancy-model.md design doc + ADR + partial QG-M2 evidence.
- **5 supporting fragments** — tenancy-decision-framework, rls-deep-dive, schema-per-tenant, cell-based-architecture, tenant-isolation-testing-patterns.
- **3 patterns** — rls-row-level-security, schema-per-tenant-with-pgbouncer, cell-based-with-routing.
- **1 quality gate checklist** — QG-M2 Tenant Isolation.
- **3 family-wide standards** — std-frontmatter, std-validation, std-adr.
- **Sidecar memory templates** — runtime-preferences.md, integration-history.md (in `_bmad/_memory/atlas/`).
- **End-to-end real-install test** — `tests/p2/run-real-install-test.sh` + manual Plan C ratification.

## What does NOT ship in P2.1

- 15 of 16 platform workflows (deferred to P2.2, P2.3, ...)
- 11 cross-family workflows (deferred to P2.3)
- Other 7 BAM modules (data, ai, rag, integration, trust, ops, ux — separate plans)
- MCP server (deferred to P2.x)
- Customize-templates for BMAD core skills (deferred to P2.x)
- Anti-patterns library (deferred to P2.x)

## Install

```bash
bmad install bmad-bam-platform
```

After install, BMAD displays `post-install-notes` directing the user to run:

```bash
bmad run bmad-bam-finalize
```

This is the Path B activation step that materializes the universal-glob auto-load sentinel into the host project.

## Use

```bash
@Atlas
# OR
bmad bmad-bam-design-tenancy-model
```

Runs the design-tenancy-model workflow; produces tenancy-model.md.

## Smoke test

```bash
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

Verifies machinery; doesn't invoke LLM.

## Next

P2.2: 2 more tenancy workflows (modular-monolith + tier-model) + cross-family record-decision workflow.
