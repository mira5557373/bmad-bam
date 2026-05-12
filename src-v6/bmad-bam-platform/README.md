# bmad-bam-platform

> **Wave 0 scope only.** Full module arrives in P2.

The platform foundation module of the BAM v6 family. Owns multi-tenant SaaS platform foundation patterns: tenant isolation, modular monolith decomposition, deployment topology, FinOps, tenant tier modeling.

## What ships in Wave 0

- 1 persona stub: Atlas (Platform Architect) — registered in `module.yaml`'s `agents:` block; Wave-0-stub overlay lives in `skills/bmad-bam-smoke-test/customize.toml`
- 1 fragment: `sentinel.md` — anchor for smoke-test sentinel injection
- 1 skill: `bmad-bam-smoke-test` (SKILL.md + customize.toml + bmad-skill-manifest.yaml + workflow.md + 8 steps)
- 1 post-install script: generates `_bmad/platform/project-context.md`

## What does NOT ship in Wave 0

- Full Atlas persona (voice, patterns, sidecar template)
- The 16 workflows defined in §5.1 of the architecture spec
- Patterns, anti-patterns, checklists, vertical addons
- Other 7 modules in the BAM family

## Install

```bash
bmad install bmad-bam-platform
```

This runs `scripts/post-install.sh` which generates the sentinel-bearing synthesis file.

## Smoke test

```bash
bmad bmad-bam-smoke-test
# or for repo development:
tests/wave-0/run-smoke-test.sh
```

Selects Plan A (universal-glob auto-load), Plan B (explicit overlay), or Plan C (manual customize step) based on the BMAD install's behavior. Result persisted to `_bmad/bam/family.json`.

## Next

After Wave 0 succeeds: proceed to plan **P2 — v6.0 bmad-bam-platform full module**.
