---
id: 2026-05-13-005
title: Align project-context.md location to BMM convention ({output_folder}/)
status: accepted
date: 2026-05-13
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - "BMM (bmad-generate-project-context workflow) is the canonical reference for where project-context content lives in a BMAD project"
  - "output_folder/ survives BMAD install-time wipe (fs.remove(targetPath)) because it is outside _bmad/<module-code>/"
  - "Universal-glob **/project-context.md matches files at arbitrary depth including per-module filenames like bam-platform-project-context.md"
  - "BMAD core config reliably provides output_folder via _bmad/config.toml (created by installer per installer.js:1038)"
dependencies-on-other-decisions:
  - "2026-05-12-002"
generated-by: claude-opus-4-7
authored-by: collaborative
---

> **Pre-Concern-5 note (added 2026-05-13):** Path references in this ADR (`_bmad/bam-platform/`, `bam-platform-project-context.md`) reflect module state at decision time. Post-Concern-5 the module code is `bbp` and the sentinel is at `{output_folder}/bbp/project-context.md`; see ADR 008.

## Context

P2.1 originally wrote the activation sentinel to `_bmad/bam-activation/platform/project-context.md` (introduced in F3 polish during P2.1 Wave-0-remediation). That namespace was a BAM-invented "survival namespace" workaround for BMAD's install-time wipe of `_bmad/<module-code>/`.

Deep empirical analysis of BMM revealed BMM doesn't have a survival namespace at all — `bmad-generate-project-context` writes its output to `{output_folder}/project-context.md` (default `_bmad-output/`), outside `_bmad/`. BMM avoids the wipe problem by not putting the file in `_bmad/<module>/` to begin with. BAM should follow the same convention.

This ADR is the canonical record of the alignment. Spec v0.7 (`docs/v6-final-architecture.md` §7.6) is rewritten to reflect this decision.

## Decision

BAM's `bmad-bam-finalize` (and any future-module finalizer) writes the activation sentinel to `{output_folder}/bam-<module-name>-project-context.md`:

- **Location:** `{output_folder}/` resolved from `_bmad/config.toml` the same way BMM does (`installer.js:1465-1511`). Default `_bmad-output/` when unset.
- **Filename:** `bam-<module-name>-project-context.md` (e.g., `bam-platform-project-context.md` for `bmad-bam-platform`). Distinct from BMM's `project-context.md` so the two don't collide. Universal-glob `**/project-context.md` still matches both because both filenames end in `project-context.md`.
- **Survival mechanism:** the file lives outside `_bmad/<module-code>/`, so BMAD's `fs.remove(targetPath)` doesn't touch it. No special "activation namespace" needed.

The `_bmad/bam-activation/` namespace introduced in P2.1 F3 is **abolished** — no code path writes there anymore. The historical record in `tests/wave-0/WAVE-0-OUTCOME.md` is preserved with a forward-pointing supersession note.

## Consequences

- **Eliminates a BAM-invented anti-pattern.** No "survival namespace" exists in the codebase; nothing to explain in onboarding docs.
- **Spec §7.6 simplifies.** Activation explanation reduces to "Path B (manual finalize) writes to `{output_folder}/`, same convention as BMM." No spec hand-waving about wipe-vs-survive.
- **All BAM modules align on the same pattern.** Future modules (`bmad-bam-data`, `bmad-bam-ai`, etc.) use `bam-<module-name>-project-context.md` filenames in the same `{output_folder}/` directory. Universal-glob loads them all.
- **Resolver helper added.** `scripts/post-install.sh: resolve_output_folder()` ports BMM's logic (`installer.js:1465-1511`) to bash. Reused by other modules (they SHOULD copy this function rather than re-implement).
- **Code migration required.** 17 files updated in P2.1 Phase B commit: post-install.sh, both test runners, lib/probe-llm-context.sh, module.yaml, README.md, 5 step files in smoke-test + finalize + design-tenancy-model, spec §7.6, v0.6 patch marked SUPERSEDED, WAVE-0-OUTCOME annotated, ADR 002 cross-referenced.

## Alternatives Considered

- **Keep `_bmad/bam-activation/<module>/`** — rejected; BAM-invented; forever-debt explaining why BAM differs from BMM
- **Single aggregated file `bam-project-context.md` (no per-module suffix)** — rejected for future-proofing; aggregation across modules requires coordination logic in each module's finalize; per-module filenames let each module work independently and universal-glob handles the multi-load
- **Write to `_bmad/bam/<module>/project-context.md` (under BAM family umbrella)** — rejected; still inside `_bmad/`, which BMAD might wipe under different conditions; BMM's convention is to write outside `_bmad/` entirely
- **Write to a hidden `.bam/` or `.bmad-bam/` dir** — rejected; user-visible `{output_folder}/` matches BMM convention and lets users find/read the file
