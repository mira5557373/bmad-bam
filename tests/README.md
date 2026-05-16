# BAM v6 test infrastructure

Three tiers of regression coverage. Each tier catches a different class of bug; no single tier covers what the others do.

## Tier overview

| Tier | When | Scripts | What it catches |
|---|---|---|---|
| **1 — always run** | Every commit; CI | `tests/audit-marketplace.sh` (6 checks)<br>`tests/audit-marketplace-fixtures.sh` (8 fixture cases)<br>`tests/wave-0/run-smoke-test.sh`<br>`tests/p2/run-real-install-test.sh`<br>`src-v6/bmad-bam-platform/*/*/tests/smoke-test.sh` | Static marketplace consistency (incl. v6 module presence + step file namespace coherence); audit's own check coverage verified via fixtures; resolver-side string merge; cp-based Path B simulation; skill machinery |
| **2 — opt-in** | `BAM_TIER2=1` env-var triggers run; default SKIPs | `tests/integration/run-real-install.sh` + `tests/integration/MANUAL.md` (runbook for manual walkthrough) | Real `bmad install --custom-source` + Strategy-1 verification + finalize + sentinel emission. Promoted from SKIP stub to real script 2026-05-16 per ADR 010 (Concern 5 unblocked it). |
| **3 — manual** | Pre-release / per BMAD upgrade | `tests/p2/lib/probe-llm-context.sh` (instructions; the probe is human-driven) | Plan C — LLM-side activation contract |

## Why three tiers

**Tier 1 alone is insufficient** for catching install-pipeline regressions in BMAD itself, but expanded checks (a)–(f) catch the two regression classes that PR #2 shipped past the original Tier-1 (marketplace drift + namespace collision in step files).

**Tier 2 is opt-in via BAM_TIER2=1** (2026-05-16; promoted from SKIP-only stub per ADR 010). Concern 5 unblocked it: BAM now succeeds at PluginResolver Strategy 1 via `bmad install --custom-source <repo>` (no destructive git ops on the local source; verified at Plan C R4). The script uses the submoduled `external/bmad-method/tools/installer/bmad-cli.js` for self-contained reproducibility. Contributors without BMAD setup are not blocked — default SKIP exit 77 keeps Tier-1 the only mandatory gate.

**Tier 3 alone is insufficient** because it requires a live LLM and a human; cadence is per-release, not per-commit. Spec §7.3 acknowledges this is by-design untestable headlessly.

Together: Tier 1 closes the static gap (every commit), Tier 2 (manual via MANUAL.md) closes the simulator-vs-reality gap when needed, Tier 3 closes the LLM-side activation gap (manual, pre-release).

## Invocation matrix

````bash
# Tier 1 — always
tests/audit-marketplace.sh
tests/audit-marketplace-fixtures.sh                      # asserts audit's 6 checks behave as documented
tests/wave-0/run-smoke-test.sh
tests/p2/run-real-install-test.sh
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh

# Tier 2 — opt-in (default SKIP exit 77; BAM_TIER2=1 enables full run)
tests/integration/run-real-install.sh                    # default: SKIP message + exit 77
BAM_TIER2=1 tests/integration/run-real-install.sh        # real bmad install + Strategy-1 verify + finalize + sentinel check
cat tests/integration/MANUAL.md                          # interactive walkthrough (script-equivalent)

# Tier 3 — manual (follow the instructions the script prints)
tests/p2/lib/probe-llm-context.sh <project-root> <sentinel-token>
````

## Adding a new test

Decide which tier first:

- **Catches a regression detectable from source alone** (e.g., schema drift, missing field, inconsistent path, marketplace drift, step-file namespace error): **Tier 1**. Add a check to `audit-marketplace.sh` with a corresponding fixture.
- **Catches a regression that requires running the real installer**: **Tier 2** — but PASS-mode is deferred. Document the verification procedure in `MANUAL.md`; the automated script remains SKIP. When BMAD adds a local-install flag, the stub upgrades to a real script.
- **Requires a live LLM**: **Tier 3**. Document the manual probe in a runbook-style file under `tests/p2/lib/` or `tests/integration/lib/`; do not pretend to automate it.

When in doubt, prefer Tier 1 — broader coverage, lower cost.

## `.no-marketplace` sentinel

A skill dir (under `src-v6/<module>/<N-phase>/<name>/` post-Concern-5, or legacy `src-v6/<module>/skills/<name>/` for backward fixture-compat) containing a file named `.no-marketplace` is excluded from the orphan check `audit-marketplace.sh` (d). The audit walks phase mode + flat mode (v3 `/workflows/` paths silently skip). Use cases:
- WIP skill not yet marketplace-ready
- Test-only or internal-helper skill that should never be installed

The sentinel only suppresses check (d). Other checks (a, b, e, f) still apply to the skill's content.

## Plan-C ratification cadence

Tier 3's Plan-C probe is **not** run continuously. It runs:
- Once per BMAD version upgrade (BMAD's customize resolver or installer changes could break LLM-side loading silently).
- Once per BAM v6.x release tag.
- Whenever a Tier-1 or Tier-2 result suggests the LLM-side contract may have drifted (rare).

Outcome is recorded in `tests/p2/PLAN-C-RATIFICATION.md`.

## Exit code conventions

All test scripts follow POSIX autotest conventions:

| Code | Meaning |
|---|---|
| 0 | PASS |
| 1 | FAIL — genuine regression |
| 64 | usage error (bad CLI arg) |
| 73 | precondition missing (e.g., script not found) |
| 75 | environment unmet (e.g., Python < 3.11) |
| 77 | SKIP — test not applicable in this environment (e.g., Tier-2 in v6.0; always SKIPs) |

**CI integration caveat:** Some CI runners treat any non-zero exit as FAILURE by default. For Tier-2 (which always SKIPs with exit 77), CI configuration must explicitly treat exit 77 as SKIP, not FAIL, OR exclude `tests/integration/run-real-install.sh` from CI gates. See the runner's docs for autotest convention support.

## Future state

- **CI integration:** add `BAM_TIER2=1` to release-build / merge-gate workflows so Tier-2 runs automatically there. Contributors who don't set the env var still SKIP cleanly.
- **Tier-3 automation:** when BMAD's installer ships a hook for LLM-side activation verification (or when subagent-driven IDE harnesses mature), Tier-3 could move from manual Plan C ratification to an automated check appended after Tier-2 in CI.
- **Future BAM modules** (bbd, bba, etc.) inherit Tier-2 coverage by adding their module code to the `--modules` arg — no Tier-2 infrastructure changes needed.
