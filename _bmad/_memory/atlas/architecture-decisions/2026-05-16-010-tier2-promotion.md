---
id: 2026-05-16-010
title: Promote Tier-2 run-real-install.sh from SKIP-77 stub to env-var-opt-in real test (BAM_TIER2=1)
status: accepted
date: 2026-05-16
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - PluginResolver Strategy 1 succeeds for BAM post-Concern-5 (ADR 008). Verified empirically Plan C R1-R4.
  - The submoduled `external/bmad-method/tools/installer/bmad-cli.js` is the canonical bmad CLI invocation site for reproducible local-install testing — uses the exact BMAD version pinned by the git submodule; no PATH dependency.
  - Opt-in via `BAM_TIER2=1` env var keeps contributors-without-bmad unblocked while letting CI / release flows enable Tier-2 coverage by setting the var.
  - The Plan C R4 procedure (which I verified end-to-end on 2026-05-15) is the spec-of-record for what Tier-2 should do; this PR converts that procedure to an automated script.
  - LLM-side glob expansion + recital remains Tier-3 manual (Plan C ratification methodology). Tier-2 covers everything UP TO the LLM-side step.
dependencies-on-other-decisions:
  - 2026-05-13-007   # 3-tier test strategy — revisit trigger #1 fires this ADR
  - 2026-05-13-008   # Concern 5 — Strategy 1 success unblocks meaningful Tier-2 PASS-mode
generated-by: claude-opus-4-7
authored-by: collaborative

## Context

ADR 007 (3-tier test strategy, accepted 2026-05-13) ship Tier-2 as a SKIP-only stub with `exit 77` because at the time of that decision, BAM's marketplace layout was falling into PluginResolver **Strategy 5** (synthesized fallback) per the Concern 5 discovery. The ADR documented "Trigger #1: when BAM moves to Strategy 1, promote Tier-2 to real-script form."

That trigger fired on 2026-05-13 when Concern 5 (ADR 008) landed via PR #3:
- BAM marketplace layout refactored to BMM-canonical phase-numbered grouping (`1-foundation/`, `2-modules/`, `9-infrastructure/`, etc.)
- Module code renamed `bam-platform` → `bbp`
- Sentinel relocated to `{output_folder}/bbp/project-context.md` subdir form
- Strategy 1 now succeeds: real `module.yaml` honored at install time

Plan C ratification rounds R1-R4 (R1-R3 by RDP autonomous subagent-proxy; R4 by the main session running the strict procedure with a fresh general-purpose subagent) verified the universal-glob → sentinel → LLM-side recital chain end-to-end. R4 in particular ran `node bmad-cli.js install --custom-source --modules bbp` against the post-Concern-5 layout and produced exit 0 + sentinel + token recital.

The R4 procedure was a manual script. This ADR converts it to a permanent automated test.

## Decision

Three design decisions, all locked via user brainstorm 2026-05-16:

1. **Gating: env-var opt-in (`BAM_TIER2=1`).**
   - Default: `exit 77` (SKIP) with a brief message pointing at this ADR + MANUAL.md.
   - `BAM_TIER2=1`: runs the full procedure.
   - Rationale: keeps contributors without bmad setup unblocked (no surprising failures); explicit signal of intent; CI/release flows opt in by setting the env var.
   - Rejected alternatives: "auto-detect bmad CLI" (surprising behavior), "always run, fail fast" (blocks contribution).

2. **bmad CLI source: submoduled `external/bmad-method/tools/installer/bmad-cli.js` invoked via `node`.**
   - Always uses the BMAD version pinned by the git submodule. Reproducible across machines.
   - Auto-installs `npm install` deps in `external/bmad-method/node_modules` on first run (one-time per checkout).
   - Rejected alternatives: "assume `bmad` on PATH" (version-drift risk; PATH dep), "hybrid PATH + submoduled" (double-surface; harder debugging).

3. **Verification scope: full Plan C R4 procedure (install + Strategy-1 verify + finalize + sentinel check).**
   - Steps mirror R4 verbatim: mktemp test project, `bmad install --custom-source $REPO_ROOT --modules bbp ...`, verify `_bmad/bbp/{config.yaml,module-help.csv}` (Strategy 1 outcome), verify 4 BAM skills at `.claude/skills/bmad-bam-*/` (tool-specific install path), run finalize script directly, verify sentinel at `_bmad-output/bbp/project-context.md` with 32-hex token.
   - Cleanup via `trap`.
   - Exit code: 0 PASS, 1 FAIL (with specific step + tail of install log on failure), 73 precondition missing (external/bmad-method/ absent), 75 environment unmet (no node, npm install failed), 77 SKIP (BAM_TIER2 != 1).
   - Rejected alternatives: "minimal (install + sentinel only)" (insufficient coverage), "extended with subagent LLM recital" (couples Tier-2 to Claude Code env; redundant with Tier-3 Plan C).

## Consequences

- Tier-2 column in `tests/README.md` updated from "deferred" to "opt-in".
- `tests/integration/MANUAL.md` reframed: TL;DR points contributors at the automated script first; manual procedure preserved for inspection/debugging/Plan C co-ratification use cases.
- ADR 007 annotated with "Trigger #1 RESOLVED 2026-05-16" note.
- Future BAM modules (bbd, bba, etc.) get Tier-2 coverage by adding their module code to the `--modules` arg in `run-real-install.sh` — no infrastructure changes needed.
- CI workflows can set `BAM_TIER2=1` to enable Tier-2 in release / merge-gate jobs.
- The Plan C R4 manual procedure is now self-documenting in script form; future Plan C rounds (R5+) need only do the LLM-side recital step (Tier-3 manual).
- Tier-3 (Plan C LLM-side recital) remains manual. The Tier-2 script explicitly notes this in its summary output.

## Alternatives Considered

- **Inline Tier-2 directly into CI workflow (no separate script).** Rejected: makes the test untestable locally; couples CI config to test logic.
- **Make Tier-2 always run, fail-skip if bmad missing.** Rejected: same as Option C in the brainstorm — blocks contributors.
- **Use a separate fixture project (committed in tests/) instead of mktemp.** Rejected: harder to keep clean across runs; mktemp gives true isolation.
- **Defer Tier-2 promotion until BMAD ships official local-install API (separate from --custom-source).** Rejected: --custom-source already works; ADR 007 trigger #1 explicitly fires now.

## Revisit triggers

- **BMAD installer changes** that affect `--custom-source` semantics or the install output structure (`_bmad/<code>/`, `.claude/skills/`, etc.) → Tier-2 step assertions may need updating.
- **New BAM modules** added to marketplace.json → Tier-2's `--modules` arg should include them. (If we add `bbd`, the arg becomes `--modules bbp,bbd`.)
- **Plan C R5+ ratification fails or surfaces gaps** → Tier-2 might need extending to catch those classes earlier.
- **Tier-2 runtime exceeds 5 minutes** (currently ~2 min for clean install) → consider parallelizing or pruning steps; revisit verification scope decision.
- **BMAD ships hook-based Tier-3 automation** (e.g., a way to programmatically verify LLM-side glob expansion) → consider merging Tier-2 and Tier-3 into one automated end-to-end test.
