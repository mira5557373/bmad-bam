# bmad-bam-platform

> **Status:** P2.1 MVP (post-Wave-0 + 3 pre-merge alignment phases). One usable workflow + activation mechanism realized + module shape canonical-aligned with BMM.

The platform foundation module of the BAM v6 family. Owns multi-tenant SaaS platform foundation: tenancy isolation, modular monolith decomposition, deployment topology, FinOps, tenant tier modeling, billing/tax/rate-limiting.

## Module structure (BMM-canonical, per v0.8 spec §6.1)

```
bmad-bam-platform/
├── module.yaml                          (BMAD module declaration; x-bam-* extensions)
├── module-help.csv                      (BMM convention)
├── README.md                            (this file)
└── skills/
    ├── bmad-bam-agent-atlas/            (persona-as-skill; canonical home for shared content)
    │   ├── SKILL.md
    │   ├── customize.toml
    │   └── resources/
    │       ├── platform-index.csv       (fragment index)
    │       ├── bam-patterns.csv         (pattern index)
    │       ├── fragments/               (6 fragments)
    │       ├── patterns/                (3 patterns)
    │       ├── checklists/              (QG-M2)
    │       └── standards/               (std-frontmatter, std-validation, std-adr)
    ├── bmad-bam-smoke-test/             (Wave 0 verification workflow)
    ├── bmad-bam-finalize/               (Path B activation; ships scripts/post-install.sh)
    └── bmad-bam-design-tenancy-model/   (first CEV design workflow)
```

No module-root `agents/`, `data/`, or `scripts/` directories — BMM canonical pattern.

## What ships in P2.1

- **Atlas persona-skill (`bmad-bam-agent-atlas`)** — invocable directly (`bmad run bmad-bam-agent-atlas`) AND the canonical home for shared platform-module resources. Other skills reference Atlas's resources by explicit installed path (bmad-tea pattern).
- **Activation mechanism (§7.6 Path B — selected after Task 0 invalidated Path A)** — BMAD's native `post-install-notes` channel surfaces `bmad-bam-finalize`, a one-shot skill the user invokes after `bmad install bmad-bam-platform` to generate `{output_folder}/bbp/project-context.md` (default `_bmad-output/bbp/project-context.md`, BMM-aligned per v0.7 spec §7.6) for universal-glob auto-load.
- **One complete CEV workflow** — `bmad-bam-design-tenancy-model` (7 steps + template). Produces tenancy-model.md design doc + ADR + partial QG-M2 evidence.
- **5 supporting fragments** — tenancy-decision-framework, rls-deep-dive, schema-per-tenant, cell-based-architecture, tenant-isolation-testing-patterns (in Atlas's `resources/fragments/`).
- **3 patterns** — rls-row-level-security, schema-per-tenant-with-pgbouncer, cell-based-with-routing (in Atlas's `resources/patterns/`).
- **1 quality gate checklist** — QG-M2 Tenant Isolation (in Atlas's `resources/checklists/`).
- **3 family-wide standards** — std-frontmatter, std-validation, std-adr (in Atlas's `resources/standards/`).
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

After finalize, invoke Atlas's workflows via BMAD's standard `bmad run`:

```bash
bmad run bmad-bam-design-tenancy-model
```

Runs the design-tenancy-model workflow; produces `docs/architecture/tenancy-model.md` + an ADR + partial QG-M2 evidence.

## Smoke test

```bash
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh
```

Verifies machinery; doesn't invoke LLM.

## Next

P2.2: 2 more tenancy workflows (modular-monolith + tier-model) + cross-family record-decision workflow.
