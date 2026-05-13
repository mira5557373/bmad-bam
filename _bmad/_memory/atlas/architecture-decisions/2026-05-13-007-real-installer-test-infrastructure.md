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
  - BMAD v6.6.0 DOES expose `bmad install --custom-source <local-path>` (verified at `external/bmad-method/tools/installer/modules/custom-module-manager.js:99-110` local-path detection + `:326-329` non-cloning path), but for BAM's current layout it resolves via PluginResolver Strategy 5 (synthesized fallback), not Strategy 1 (verified at `tools/installer/modules/plugin-resolver.js:72-99`). Strategy 5 produces a degraded install: skills copy correctly, but `module.yaml` is NEVER written to `<bmadDir>/<code>/` at all — the synthesized stub lives only in `CustomModuleManager._resolutionCache` (in-memory, per-process). BMAD's own comment at `official-modules.js:145` confirms this: "Check resolution cache for strategy 5 modules (no module.yaml on disk)". Consequence: `agents:` registration, `directories:` declarations, `x-bam-*` extensions, and `post-install-notes` from BAM's real `module.yaml` are all silently inert post-install.
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

The original kickoff proposed a 3-tier strategy: Tier 1 (always-run static + simulated), Tier 2 (opt-in real-install), Tier 3 (manual LLM probe). During plan drafting, an external review claimed BMAD v6.6.0 had no local-install API. Direct deep source-reading partially refutes that:

- `bmad install --custom-source <path>` IS documented in `commands/install.js:36` ("Comma-separated Git URLs **or local paths** to install custom modules from").
- `parseSource` (`custom-module-manager.js:99-110`) detects local paths by `/`, `./`, `../`, `~` prefix and routes to `_parseLocalPath` which validates existence and returns `type: 'local'`.
- `resolveSource` (`custom-module-manager.js:326-329`) takes the local-source branch: `rootDir = parsed.localPath; repoPath = null; sourceUrl = null` — **`cloneRepo` is never invoked**, so neither of the two git-reset code paths can fire: the one inside `CustomModuleManager.cloneRepo` at `:427` (for URL refresh of cached clones) is gated on having a `repoCacheDir`, and the one inside `CommunityModuleManager` at `community-manager.js:292` only runs for community-registry modules (which `--custom-source <local-path>` does not route through). The earlier claim ("symlink the cache dir → git reset destroys local commits") only applied to a hypothetical workaround for installing a registry-listed community module via cache spoofing; it never applied to a custom-source local path, which goes through a completely different code path.
- `readMarketplaceJsonFromDisk` looks at `<rootDir>/.claude-plugin/marketplace.json` — which is **exactly where BAM's marketplace.json lives**.

So a local install reaches PluginResolver. But BAM's layout post-Phase-C falls into PluginResolver Strategy 5 (synthesized fallback), not Strategy 1 (`plugin-resolver.js:72-99`). Strategy 1 requires `module.yaml` + `module-help.csv` at the common parent of all listed skills. For BAM, all 4 skills sit under `src-v6/bmad-bam-platform/skills/`, so the common parent is `<...>/skills/`. But BAM's real `module.yaml` lives at `<...>/bmad-bam-platform/module.yaml` — one level above the common parent. Strategies 2-4 also don't match (no `-setup` skill, multiple skills, no `assets/module.yaml` per skill). Strategy 5 synthesizes a stub from plugin metadata and ignores BAM's real `module.yaml`. Compare with bmad-tea (`external/bmad-tea/`), whose skills span `src/agents/` + `src/workflows/testarch/` so common parent = `src/`, matching `src/module.yaml` — that layout passes Strategy 1 cleanly.

The result is that an automated `bmad install --custom-source $(pwd)` against BAM:
- ✅ Reads marketplace.json correctly
- ✅ Copies 4 skill dirs to `_bmad/bmad-bam-platform/<skill>/` via `installFromResolution` (`official-modules.js:344-410`)
- ✅ Writes a synthesized `module-help.csv` to `_bmad/bmad-bam-platform/module-help.csv` (built from skill `SKILL.md` frontmatter)
- ❌ Does NOT install BAM's real `module.yaml` — Strategy 5 has `moduleYamlPath: null` and `installFromResolution` never writes `synthesizedModuleYaml` to disk; downstream `resolveInstalledModuleYaml` (`project-root.js:102-`) returns null for BAM (search order misses `src-v6/bmad-bam-platform/module.yaml`); `createModuleDirectories` (`official-modules.js:587-`) returns `emptyResult` because `findModuleSourceByCode` returns `<skill-parent>/` (= `<repo>/src-v6/bmad-bam-platform/skills/`) and `<that>/module.yaml` does not exist. Net effect: `agents:`, `directories:`, `x-bam-*`, `post-install-notes` are all silently inert post-install.
- ⚠️ Partial validation — Tier-2 would catch skill-copy + marketplace.json correctness (PR #2 Bug 1) but NOT module.yaml integrity

Automated Tier-2 PASS-mode is therefore not tractable for v6.0 because of **four** real reasons:
1. Hard requirement on `bmad` CLI for every contributor (BMAD not universally installed; CI runners would need `npm install` of bmad-method as a precondition).
2. Strategy-5 degradation: only validates skill-copy and marketplace.json correctness, not full module.yaml integrity (this is a fixable BAM-side concern — see Concern 5 below — but out of P2.2 scope).
3. `npm install` triggers transitively from `cloneRepo` for git-URL custom modules (`custom-module-manager.js:483-499`); for local sources it skips, BUT downstream BMAD `bmad` CLI dependencies still need to be installed somewhere.
4. CI infrastructure (push-and-pin, ephemeral tmpdir-as-project-root with `bmad install --directory`) not yet built — P2.x scope.

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

- **Original 3-tier with automated Tier-2 PASS-mode using `bmad install --custom-source $(pwd)`.** Viable in principle (the API exists; local-path source bypasses git operations on the source), but rejected for v6.0 because: (i) BAM's layout falls into PluginResolver Strategy 5 — only partial validation, real `module.yaml` not exercised; (ii) hard dep on `bmad` CLI on every dev/CI machine; (iii) lacks ephemeral-tmpdir test-project scaffolding (`bmad install --directory <tmp>`). Promoted to Concern 5 backlog.
- **Conditional Tier-2 (`SKIP` when `bmad` CLI missing, run when present).** Considered. Rejected for v6.0 because the Strategy-5 degradation makes the PASS mode validate less than it appears to — green CI on a conditional Tier-2 would imply more coverage than it delivers. Better to keep the stub honest about what's missing. Revisit after Concern 5 resolution (layout fix → Strategy 1).
- **Tier-2 via Node-bypass** (call `installFromResolution` directly via a Node wrapper). Rejected: only tests file-copy semantics; doesn't exercise the `bmad install` CLI chain or `community-manager` git/npm operations. Added complexity (Node wrapper, BMAD module imports) for partial coverage that Tier-1's expanded checks largely subsume.
- **Tier-2 via CI push-and-pin** (push branch to fork; install with `--pin <sha>`). Rejected for v6.0: requires CI infrastructure not yet built (GitHub Actions runner with `bmad` CLI, fork-push credentials, marketplace fork management). P2.x scope.
- **Drop Tier-2 entirely.** Rejected: the deferred stub is honest documentation of what would be tested if it could be; deleting it loses that signal. Future BAM developers seeing the stub know "this is something we'd test if we could."
- **Hard-require `bmad` CLI for all tests.** Rejected: contributors without `bmad` would be blocked; BMAD's installer has network/cache state that doesn't belong in unit-level tests.

## Revisit triggers

This ADR is reconsidered when ANY of these happen:
1. Concern 5 lands (BAM marketplace layout rearranged so PluginResolver Strategy 1 applies — `module.yaml` + `module-help.csv` at the common parent of all skills, mirroring bmad-tea's `src/` placement). After that, automated Tier-2 PASS-mode via `bmad install --custom-source $(pwd) --directory <tmpdir> --yes` becomes meaningful (full module.yaml exercise, not synthesized fallback).
2. P2.x adds CI infrastructure for `bmad` CLI provisioning + ephemeral tmpdir test-project scaffolding — Tier-2 PASS-mode lands in CI, stays SKIP locally for contributors without `bmad`.
3. A regression class slips past Tier-1 expanded checks — the gap motivates either more Tier-1 checks or a different Tier-2 design.
4. BMAD ships a true `--from <path>` API that bypasses the marketplace.json resolver (e.g., direct skill-tree install) — would simplify Tier-2 by removing the Strategy-5 caveat.
