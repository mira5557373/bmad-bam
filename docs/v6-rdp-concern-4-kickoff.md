# V6 RDP Kickoff — Concern 4: Real-installer test infrastructure

This file is for the **human operator** (you) to paste into a fresh Claude Code session on the RDP machine when starting Concern 4 work. Concern 4 is a P2.2-Task-0 follow-up to the alignment refactor that landed in PR #2 (commits `8a48cb7` + `554ca95` + `6a081be`).

---

## Context — what's already done

- **Wave 0** (merged): `bmad-bam-platform` skeleton + smoke-test workflow + Path A/B/C selection
- **P2.1** (PR #2 — pending merge): full Atlas persona, design-tenancy-model workflow, 6 fragments, 3 patterns, 1 quality gate, 3 standards
- **PR #2 alignment refactor** (Phases A, B, C — committed, in PR #2):
  - Concern 3: `tested-against` → `tested_against` + convention map (commit `8a48cb7`)
  - Concern 1: project-context.md to `{output_folder}/` BMM-aligned (commit `554ca95`)
  - Concern 2: Atlas-as-skill module shape canonical (commit `6a081be`)

---

## What Concern 4 is

The cp-based test simulation (`tests/wave-0/run-smoke-test.sh` + `tests/p2/run-real-install-test.sh`) has a **known meta-bug**: it can pass even when real `bmad install` would fail. Two real PR #2 bugs slipped through the simulation and were only caught by RDP's manual audit:

| Bug caught post-hoc | Why cp missed it |
|---|---|
| marketplace.json listed v3 paths | cp bypassed marketplace lookup |
| `_bmad/platform/` vs `_bmad/bam-platform/` path mismatch | cp copied to whatever path we told it, not what real BMAD uses |

Concern 4's job: add a 3-tier test strategy so future bugs of this class fail CI immediately rather than being caught by audit.

---

## Three deliverables for Concern 4

| File | Purpose | Tier |
|---|---|---|
| `tests/audit-marketplace.sh` (NEW) | Static validation of `.claude-plugin/marketplace.json` — runs every commit, no CLI dependency. Verifies skill dirs exist, no module-root entries, code field matches install paths. | **Tier 1** (always runs) |
| `tests/integration/run-real-install.sh` (NEW) | Opt-in real-install test: requires `bmad` CLI on PATH. Spins up clean BMAD project; runs `bmad install bmad-bam-platform`; verifies sentinel landed; cleans up. Exits 77 (autotest SKIP semantics) if CLI absent. | **Tier 2** (opt-in via `BMAD_CLI` env var) |
| `tests/README.md` (NEW) | Documents the 3-tier strategy + Plan C (Concern 5) as the manual ritual tier. | Documentation |

---

## Pre-flight checklist (before pasting kickoff)

- [ ] PR #2 merged into `feat/bam-v3-pure-kb` (recommended; can also proceed pre-merge on a branch off PR #2)
- [ ] RDP machine has `bmad` CLI available (or note that Tier-2 will be deferred)
- [ ] Fresh branch from base: `git checkout -b feat/v6-p2-2-task-0-concern-4 feat/bam-v3-pure-kb` (or off PR #2 branch if pre-merge)
- [ ] Plan goes to: `docs/superpowers/plans/2026-05-13-p2-2-task-0-real-installer-test.md`

---

## Kickoff prompt — copy/paste exactly

```
I'm starting Concern 4 work — adding a 3-tier real-installer test
infrastructure to BAM v6 platform module.

CONTEXT (read these first; do not modify):
- docs/v6-final-architecture.md (LOCKED at v0.8; spec §7 covers customize/activation)
- docs/v6-rdp-concern-4-kickoff.md (this concern's kickoff + deliverable spec)
- _bmad/_memory/atlas/architecture-decisions/INDEX.md (6 ADRs; concerns 1/2/3 already resolved)
- tests/wave-0/INVESTIGATION-NOTES.md (BMAD installer mechanics from P2.1 Task 0)

CURRENT TEST INFRASTRUCTURE:
- tests/wave-0/run-smoke-test.sh — mechanism correctness (resolver-side string merge)
- tests/p2/run-real-install-test.sh — Path B simulation via cp-based install
- src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh
  — workflow-skill machinery validation
- All three pass currently; none invoke real `bmad install`

THE GAP:
cp-based simulation can pass when real `bmad install` would fail. Two PR #2
bugs (marketplace v3-paths, _bmad/bam-platform path mismatch) were caught by
manual audit, not by tests. Need to close this blind spot before P2.2 ships
2 more workflows that could repeat the class of bug.

DELIVERABLES (3 files):
1. tests/audit-marketplace.sh — static validation; always runs; no CLI dep
2. tests/integration/run-real-install.sh — opt-in real-install; requires `bmad`
   CLI on PATH; exits 77 if CLI absent
3. tests/README.md — documents 3-tier strategy

APPROACH:
1. Use superpowers:writing-plans to draft the implementation plan first.
   Save to: docs/superpowers/plans/2026-05-13-p2-2-task-0-real-installer-test.md
2. Confirm plan with me (you the user, via the chat). Do NOT execute until
   plan is approved.
3. Once approved, use superpowers:subagent-driven-development to execute
   task-by-task with fresh subagents.

KEY DESIGN DECISIONS (lock these in the plan):
- audit-marketplace.sh validates: (a) every skill path exists on disk,
  (b) no module-root-dir entries (skills must end in /skills/<name>),
  (c) plugin version field present, (d) no orphaned references.
- run-real-install.sh: detects `bmad` CLI via `command -v "$BMAD_CLI"`;
  exits 77 if absent (POSIX autotest SKIP convention).
- Real-install test scenario: create temp BMAD project; install
  bmad-bam-platform from local path; run bmad-bam-finalize; verify sentinel
  at {output_folder}/bam-platform-project-context.md; cleanup unless
  KEEP_WORKDIR=1.
- README.md tier table: Tier 1 (always: audit + smoke + skill smoke);
  Tier 2 (opt-in: real-install via BMAD_CLI); Tier 3 (manual: Plan C LLM
  probe — handled by Concern 5).

ANTI-PATTERNS to avoid:
- Do not rewrite the existing cp-based tests. Keep them as Tier-1 mechanism
  checks; add new Tier-2 alongside.
- Do not break existing test invocation patterns (other workflows may depend
  on them).
- Do not introduce a hard `bmad` CLI dependency; Tier 2 must SKIP when
  absent, not fail.

When complete:
1. Push the branch
2. Open a PR targeting feat/bam-v3-pure-kb (or whichever base I tell you)
3. PR title: "feat(p2): Concern 4 — 3-tier real-installer test infrastructure"
4. PR body: list the 3 new files + brief design rationale + tier-table from
   README.md
5. Record outcome in tests/audit-marketplace-readme + ADR
   2026-05-13-007-real-installer-test-infrastructure.md in Atlas sidecar

Start by invoking the writing-plans skill, then walk me through the plan
sections one at a time before executing.
```

---

## After RDP creates the plan — your review checklist

When RDP Claude shows you the plan, verify it covers:

- [ ] 3 deliverables listed: `audit-marketplace.sh`, `integration/run-real-install.sh`, `README.md`
- [ ] Each deliverable has explicit file path
- [ ] Each task has 5-8 atomic steps (TDD-style: test first, then implement)
- [ ] Anti-patterns from kickoff explicitly addressed (don't rewrite existing tests; SKIP for absent CLI; no hard CLI dep)
- [ ] Verification: all 3 tiers run cleanly after Phase C lands
- [ ] ADR `2026-05-13-007` template included
- [ ] Commit message draft for each task

If anything's missing, ask RDP Claude to refine before approving.

---

## Step-by-step user workflow

| Step | What you do | Where |
|---|---|---|
| 1 | Merge PR #2 (Phases A/B/C) into base branch | This machine: `git checkout feat/bam-v3-pure-kb && git merge --no-ff origin/feat/v6-p2-1-platform-rdp -m "Merge PR #2: P2.1 + alignment refactor"` |
| 2 | Push merged base | This machine: `git push origin feat/bam-v3-pure-kb` |
| 3 | Pull latest on RDP | RDP machine: `git fetch && git checkout feat/bam-v3-pure-kb && git pull` |
| 4 | Create branch on RDP | RDP machine: `git checkout -b feat/v6-p2-2-task-0-concern-4` |
| 5 | Open fresh Claude Code session on RDP | RDP machine, in `bmad-bam` repo root |
| 6 | Paste the kickoff prompt above | RDP Claude session |
| 7 | RDP Claude invokes writing-plans skill, drafts plan, presents sections to you | RDP Claude session |
| 8 | You review the plan; approve or request changes | RDP Claude session |
| 9 | Approved → RDP Claude executes via subagent-driven-development | RDP Claude session |
| 10 | When done, RDP pushes branch + opens PR | RDP Claude session |
| 11 | You review the PR on this machine | This machine: `gh pr view <N>` |
| 12 | Merge if approved | This machine: `gh pr merge <N>` or local merge + push |

---

## Branch strategy options

**Option A (recommended): wait for PR #2 merge, then branch off `feat/bam-v3-pure-kb`**
- Clean sequence; no scope mixing
- Each PR represents one concern
- Easier review

**Option B: branch off PR #2 now, rebase later**
- Parallel work possible
- Risk: rebase conflicts when PR #2 lands
- More complex sequence to track

If you want parallel work (Option B), tell RDP to base off `feat/v6-p2-1-platform-rdp` instead of `feat/bam-v3-pure-kb`. The kickoff prompt above defaults to `feat/bam-v3-pure-kb` for cleanliness.

---

## Expected timeline

| Phase | Effort |
|---|---|
| RDP plan drafting + your review | 30-60 min |
| Static audit (`audit-marketplace.sh`) implementation + tests | 1-2h |
| Real-install (`run-real-install.sh`) implementation + tests | 3-4h |
| README.md (tier docs) | 1h |
| ADR 007 + INDEX update | 30 min |
| PR review by you | 1-2h |
| **Total** | **~7-10h** |

---

## Risk register

| Risk | Mitigation |
|---|---|
| `bmad` CLI not installable on RDP for Tier-2 testing | Tier-2 SKIPs gracefully (exit 77); document required setup in README |
| Real `bmad install` has hidden network/cache requirements | Document in README; CI may need network access |
| audit-marketplace.sh becomes brittle if marketplace schema changes | Keep checks specific; don't over-validate; spec checks in `tests/audit-marketplace-test.sh` if needed |
| Real-install creates persistent state (cache, config) | Use `mktemp -d` isolation; trap cleanup; document any host-level state changes |

---

## Reference — useful files for the plan

| File | Reference value |
|---|---|
| `tests/wave-0/run-smoke-test.sh` | Pattern for `set -euo pipefail`, Python 3.11+ preflight, durable run logs |
| `tests/p2/run-real-install-test.sh` | Pattern for cp-based install simulation; Tier-2 will partially supersede |
| `tests/wave-0/INVESTIGATION-NOTES.md` | BMAD installer mechanics; `installFromResolution` + cache directory behavior |
| `external/bmad-method/tools/installer/modules/official-modules.js:344-376` | `installFromResolution` actual behavior — Tier-2 must exercise this |
| `external/bmad-method/tools/installer/core/installer.js:1038` | Where BMAD creates `_bmad-output/` during install (real install dependency) |
