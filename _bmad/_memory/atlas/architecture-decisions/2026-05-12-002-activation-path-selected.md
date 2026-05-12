---
id: 2026-05-12-002
title: Activation Path B (manual finalize) selected for v6.0
status: accepted
date: 2026-05-12
persona: atlas
related-personas: []
modules: [bmad-bam-platform, bmad-bam-data, bmad-bam-ai, bmad-bam-ux]
supersedes: null
superseded-by: null
assumptions:
  - BMAD 6.6.0 installer materializes community modules via fs.copy of declared skillPaths, not via running npm install in the host project
  - BMAD's native post-install-notes channel reliably surfaces user-facing instructions after install
  - Plan C ratification (LLM-side activation contract) is recorded separately in tests/p2/PLAN-C-RATIFICATION.md; this ADR is independent of that outcome
dependencies-on-other-decisions:
  - 2026-05-11-001
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

Spec §7.6 (as patched to v0.5) listed three activation paths for v6.0 modules: A (npm postinstall), B (manual finalize workflow), and D (BMAD-native hook). The v0.5 patch (c) named Path A as the default. P2.1 Task 0 (`tests/p2/INVESTIGATION-NOTES.md`) investigated empirically whether Path A holds.

The finding contradicts the v0.5 patch: Path A is non-viable for target-project activation. npm postinstall runs in BMAD's cache directory (e.g., `~/.bmad/cache/community-modules/bmad-bam/`) with no access to the host project root; only fires on fresh clone or version bump; any files it writes outside declared `skillPaths` are discarded by the installer's copy step. Path D does not exist (BMAD has no native code-execution hook; only `post-install-notes` for text display).

## Decision

**Path B (manual finalize)** is selected as the v6.0 activation mechanism for all BAM modules. Implementation:

- Each BAM module ships a `bmad-bam-finalize` skill (CEV-style, single-step) that invokes `scripts/post-install.sh "$PROJECT_ROOT"` against the host project.
- Each BAM module's `module.yaml` includes a `post-install-notes` block instructing the user to run `bmad run bmad-bam-finalize` after install.
- The finalize step is idempotent — safe to re-run.

P2.1 ships this for `bmad-bam-platform` (`src-v6/bmad-bam-platform/skills/bmad-bam-finalize/`).

## Consequences

- All v6.0+ BAM modules use the same activation pattern; cross-module consistency for users.
- One extra user step after install (`bmad run bmad-bam-finalize`). Cost: ~5 seconds of friction; benefit: deterministic activation independent of BMAD's install-time behavior.
- Spec §7.6 needs a v0.6 patch demoting Path A and ratifying Path B as the default. This ADR captures the decision pending that patch.
- Future BMAD releases that change `installFromResolution` may break the assumption that skill files land at `_bmad/<module-code>/`. Path B is more resilient than Path A would have been here — the finalize skill can adapt without changing the activation contract.

## Alternatives Considered

- **Path A (npm postinstall)** — rejected. Source-read evidence in `tests/p2/INVESTIGATION-NOTES.md` shows npm runs in BMAD's cache dir, not the host project, and only on fresh clone. Cannot serve as a reliable target-project activation hook.
- **Path D (BMAD-native code hook)** — rejected. Does not exist. BMAD's only post-install mechanism is `post-install-notes`, which is text-display only.
- **Path C (LLM-side glob activation alone, no finalize step)** — rejected as the primary mechanism. Plan C remains the ratification path for the LLM-side contract, but it relies on `_bmad/bam-activation/platform/project-context.md` being written somehow; Path B is the mechanism that writes it.
