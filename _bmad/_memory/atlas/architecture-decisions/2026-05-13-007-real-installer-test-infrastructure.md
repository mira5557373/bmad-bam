---
id: 2026-05-13-007
title: Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BMAD has no local-install API)
status: accepted
date: 2026-05-13
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - The cp-based simulators (Wave 0, P2.1) are kept as Tier-1 mechanism checks; not deleted.
  - The `bmad` CLI is not universally available on contributor machines; a hard requirement would block contributions.
  - LLM-side activation cannot be reliably automated in CI (spec §7.3); a manual ritual is acceptable for release cadence.
  - BMAD v6.6.0's installer offers no API to install from a local checkout (verified against `external/bmad-method/tools/installer/`).
dependencies-on-other-decisions:
  - 2026-05-12-002
  - 2026-05-13-005
  - 2026-05-13-006
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

PR #2 shipped two bugs that the existing tests did not catch:
- marketplace.json had only v3 paths, so a real `bmad install bmad-bam-platform` would have copied v3 content rather than P2.1.
- The sentinel namespace (`_bmad/platform/`) collided with BMAD's install target (`_bmad/bam-platform/`), so workflow step files referenced the wrong namespace.

Both bugs were caught post-execution by a manual audit, not by tests. The shared cause: the existing tests (`tests/wave-0/run-smoke-test.sh`, `tests/p2/run-real-install-test.sh`) simulate `bmad install` via `cp -a`. cp does not check marketplace.json. cp copies wherever told, not where real BMAD does.

P2.2 is about to add two more workflows. Without closing this blind spot, the same class of bug can ship again.

The original kickoff proposed a 3-tier strategy: Tier 1 (always-run static + simulated), Tier 2 (opt-in real-install), Tier 3 (manual LLM probe). During plan drafting, an external review surfaced — and direct source-reading confirmed — that BMAD v6.6.0's installer has no API to install from a local checkout:
- No `--from <path>` flag in `commands/install.js` (grep returns 0)
- No `BAM_LOCAL_SOURCE` env override anywhere in installer source
- Cache-directory symlink workaround triggers `git reset --hard origin/HEAD` against the symlink target per `community-manager.js:292` — destroys local commits
- Bare-copy workaround hits the same destructive git operation

Automated Tier-2 PASS-mode is therefore not tractable without upstream BMAD changes or CI infrastructure not yet built.

## Decision

Adopt a 3-tier strategy with Tier-2 PASS-mode deferred:

- **Tier 1 (always) — expanded.** `tests/audit-marketplace.sh` adds 6 checks (a–f). Beyond the original 4 (a–d) checking marketplace internal coherence, two new checks ground Tier-1 in PR #2's specific regression classes:
  - **(e)** every v6 module under `src-v6/` has at least one matching plugin entry in `marketplace.json` (catches Bug 1: marketplace drift)
  - **(f)** step files / templates in v6 skills don't reference unknown `_bmad/<namespace>/` paths (catches Bug 2: namespace collision)
  - The orphan check (d) accepts a `.no-marketplace` sentinel file in any skill dir to suppress the orphan error — needed for WIP skills.
  - Per-plugin skill-root inference: the audit derives the orphan-scan root from each plugin's listed skill paths, so the script scales to future BAM modules without CLI flags.
- **Tier 2 (deferred) — SKIP-by-default stub.** `tests/integration/run-real-install.sh` always exits 77 with a message explaining the BMAD-side constraint. `tests/integration/MANUAL.md` documents a push-and-pin procedure contributors can run manually before release.
- **Tier 3 (manual) — unchanged.** Existing `tests/p2/lib/probe-llm-context.sh` instructions; outcome recorded in `tests/p2/PLAN-C-RATIFICATION.md`.

The existing cp-based tests are NOT rewritten; they remain Tier-1 mechanism checks alongside the new audit.

## Consequences

- Every commit runs the expanded audit. PR #2's two bug classes — and the broader marketplace-drift + namespace-collision classes — fail CI immediately.
- Tier-2 PASS-mode revisits when one of: BMAD ships a local-install API (`--from <path>` or equivalent); OR P2.x ships CI infrastructure for push-and-pin against a tagged SHA.
- Manual real-install verification remains available for release candidates via the MANUAL.md procedure.
- The `.no-marketplace` sentinel introduces a small mechanism developers must know about. Documented in `tests/README.md` and the fixture README.
- The audit's per-plugin skill-root inference scales to future BAM modules (bmad-bam-data, bmad-bam-ai, etc.) without script changes — each new module appears in marketplace.json with its own skill paths, and the audit walks each plugin independently.

## Alternatives Considered

- **Original 3-tier with automated Tier-2 PASS-mode.** Rejected: empirically depends on BMAD APIs that don't exist in v6.6.0 (`--from`, `BAM_LOCAL_SOURCE`); workarounds (symlink, bare copy) trigger destructive git operations. Shipping a script that pretends to work would create false confidence.
- **Tier-2 via Node-bypass** (call `installFromResolution` directly via a Node wrapper). Rejected: only tests file-copy semantics; doesn't exercise the `bmad install` CLI chain or `community-manager` git/npm operations. Added complexity (Node wrapper, BMAD module imports) for partial coverage that Tier-1's expanded checks largely subsume.
- **Tier-2 via CI push-and-pin** (push branch to fork; install with `--pin <sha>`). Rejected for v6.0: requires CI infrastructure not yet built (GitHub Actions runner with `bmad` CLI, fork-push credentials, marketplace fork management). P2.x scope.
- **Drop Tier-2 entirely.** Rejected: the deferred stub is honest documentation of what would be tested if it could be; deleting it loses that signal. Future BAM developers seeing the stub know "this is something we'd test if we could."
- **Hard-require `bmad` CLI for all tests.** Rejected: contributors without `bmad` would be blocked; BMAD's installer has network/cache state that doesn't belong in unit-level tests.

## Revisit triggers

This ADR is reconsidered when ANY of these happen:
1. BMAD ships a local-install API (`bmad install --from <path>` or equivalent) — Tier-2 stub becomes a real script.
2. P2.x adds CI infrastructure for push-and-pin against a tagged SHA — Tier-2 PASS-mode lands in CI, stays SKIP locally.
3. A regression class slips past Tier-1 expanded checks — the gap motivates either more Tier-1 checks or a different Tier-2 design.
