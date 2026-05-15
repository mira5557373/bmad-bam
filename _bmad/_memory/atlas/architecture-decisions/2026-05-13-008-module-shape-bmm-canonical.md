---
id: 2026-05-13-008
title: Refactor BAM v6 platform-module layout to BMM-canonical (phased grouping + bbp short-code + subdir sentinel)
status: accepted
date: 2026-05-13
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - PluginResolver's 5-strategy install pipeline is canonical for marketplace-listed modules
  - BMM's bmm-skills/ phased layout is canonical (bmad-tea functional-categories is an alternative; both pass Strategy 1)
  - ADR 006's "everything is a skill" stance stands; Concern 5 refines WHERE skills live
  - Universal-glob '**/project-context.md' strictly matches the literal filename (per spec §6.1 / §7.1)
  - bbp/bbd/bba/bbr/bbi/bbt/bbo/bbu short codes are not used by other BMAD modules
  - 9-infrastructure/ is a deliberate BAM-extension of the BMM pattern (BMM has no analog since BMM is monolithic; BAM's multi-module structure motivates the category for bootstrap + operational skills). BMM-extension, not BMM-violation.
dependencies-on-other-decisions:
  - 2026-05-11-001   # Wave 0 plan A selection — universal-glob mechanism
  - 2026-05-13-005   # project-context location aligned to {output_folder}
  - 2026-05-13-006   # module shape — Atlas-as-skill (refined, not superseded)
  - 2026-05-13-007   # 3-tier test strategy — revisit trigger #1 fires
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

PR #2 + #3 review (PR #3 deep self-review) empirically established that BAM's marketplace layout falls into PluginResolver **Strategy 5 (synthesized fallback)** instead of Strategy 1. The 4 BAM skills under `src-v6/bmad-bam-platform/skills/<skill>/` have a common-parent of `<...>/skills/`, but `module.yaml` lives at `<...>/bmad-bam-platform/module.yaml` — one level above. PluginResolver Strategy 1 (`plugin-resolver.js:72-99`) requires `module.yaml` + `module-help.csv` AT the common parent of all listed skills. The mismatch forces Strategy 5, which:

- Synthesizes a stub `module.yaml` from `marketplace.json` plugin metadata
- Stores the stub ONLY in `CustomModuleManager._resolutionCache` (in-memory, per-process)
- NEVER writes `module.yaml` to `<bmadDir>/<code>/` (verified at `official-modules.js:145`: "Check resolution cache for strategy 5 modules (no module.yaml on disk)")
- Silently inerts BAM's real `module.yaml` content: `agents:` registration, `directories:` declarations, `x-bam-*` extensions, `post-install-notes`

Comparison with empirically-working reference modules:
- **BMM** (`external/bmad-method/src/bmm-skills/`) — phase-numbered grouping (`1-analysis/`, `2-plan-workflows/`, `3-solutioning/`, `4-implementation/`); module.yaml + module-help.csv AT module root; common parent of skills = `bmm-skills/` ✓ Strategy 1 succeeds.
- **bmad-tea** (`external/bmad-tea/`) — functional categories (`src/agents/`, `src/workflows/testarch/`); module.yaml at `src/module.yaml`; common parent of skills spanning two top-level dirs = `src/` ✓ Strategy 1 succeeds.

BAM was the outlier with a `skills/` wrapper collapsing common parent below the module-yaml location. Additionally, BAM's module code `bam-platform` was an outlier from BMAD's 3-letter convention (bmm, tea, bmb, cis, wds).

## Decision

Three coupled changes, landed in one atomic refactor:

1. **Phase-numbered grouping (BMM-canonical):** drop the `skills/` wrapper; group skills under phase dirs with BAM-domain semantics:
   - `1-foundation/` — QG-F1 (Atlas, master-architecture)
   - `2-modules/` — QG-M1/M2/M3 (Nova, tenant-isolation, agent-runtime)
   - `3-integration/` — QG-I1/I2/I3 (Kai, convergence)
   - `4-readiness/` — QG-P1 (production-readiness)
   - `9-infrastructure/` — bootstrap + operational (smoke-test, finalize); BAM-extension

2. **Module code rename:** `bam-platform` → `bbp`. Aligns with BMAD's 3-letter convention. Reserves `bbp`/`bbd`/`bba`/`bbr`/`bbi`/`bbt`/`bbo`/`bbu` for the BAM module family. Install path: `_bmad/bam-platform/` → `_bmad/bbp/`. `team: bam-platform` → `team: bam` (BAM-family team, matches `_bmad/bam/` cross-module namespace).

3. **Sentinel relocation:** `{output_folder}/bam-platform-project-context.md` → `{output_folder}/bbp/project-context.md`. Subdir + plain `project-context.md` filename unambiguously matches the strict universal-glob contract from spec §6.1. No collision with BMM's `{output_folder}/project-context.md` (sibling). Future modules use the same pattern: `{output_folder}/bbd/project-context.md`, etc.

## Consequences

- PluginResolver Strategy 1 succeeds; real `module.yaml` honored at install time. `agents:`, `directories:`, `x-bam-*`, `post-install-notes` no longer silently inert.
- ADR 007's revisit trigger #1 fires: Tier-2 PASS-mode is now tractable (PR #6 follow-up promotes the stub).
- Breaking change for any user with a pre-existing `_bmad/bam-platform/` install. Migration recipe documented in PR description; users `rm -rf` the old install dir + re-install.
- Future BAM modules adopt the same phase-grouping + 3-letter-code pattern.
- Spec §6.1 + §7.1 + §7.6 + changelog v0.9 reflect the new convention.

## Alternatives Considered

- **BMM-strict (all phases 1-4 only, no 9-infrastructure):** rejected — smoke-test + finalize don't fit QG-progression phases; lumping them in 1-foundation would conflate user-facing foundation work with operational skills.
- **bmad-tea-style functional categories (`agents/` + `workflows/`):** considered; rejected in favor of phase-numbered. BMM's phase pattern was the user's stated preference for BMM compatibility.
- **Keep `skills/` wrapper + petition BMAD upstream for stricter PluginResolver:** rejected — long lead time; alignment with BMM works today.
- **Keep `code: bam-platform` (long-form code):** rejected — outlier from BMAD's 3-letter convention; future BAM modules would be forced to invent their own long-form codes (cosmetic divergence accumulates).
- **Sentinel as prefixed filename (`{output_folder}/bbp-project-context.md`):** rejected — does NOT match strict universal-glob `**/project-context.md`; relies on glob being lenient (unverified). Subdir form is unambiguous either way.

## Revisit triggers

- ADR 007's revisit trigger #1 fires when this lands: PR #6 promotes Tier-2 stub to real script.
- If Plan C ratification (pre-merge gate per spec §9) FAILS, this ADR's design has a hole. Forward-fix: try alternate sentinel paths; this ADR amended or superseded.
- Concern 7 (`directories:` block dead-code fix) is sequenced after this ADR lands (PR #5).
- Future BAM modules' phase semantics may need additional `N-` slots beyond 1-4 + 9. Add as encountered.
