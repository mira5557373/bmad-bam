# V6 RDP Kickoff — Concern 5: BMM-canonical layout refactor

This file is for the **human operator** (you) to paste into a fresh Claude Code session on the RDP machine when starting Concern 5 work.

Concern 5 is the BMM-canonical layout refactor for `bmad-bam-platform`. It resolves PluginResolver's Strategy 5 fallback (real `module.yaml` never honored at install) discovered during PR #3 deep review.

**Plan file:** `docs/superpowers/plans/2026-05-13-p2-2-concern-5-implementation.md` (1998 lines, 26 tasks across 11 phases)
**Spec file:** `docs/superpowers/specs/2026-05-13-concern-5-design.md` (397 lines, v3 — both RDP review rounds incorporated)
**Branch:** `feat/v6-p2-2-task-0-concern-4` (HEAD `8a3b7e7`)
**Execution mode:** Subagent-driven development (fresh subagent per task + two-stage review)

---

## Context — what's already done

- **Wave 0, P2.1 (merged):** bmad-bam-platform skeleton + Atlas persona + design-tenancy-model workflow + 3-tier test infrastructure (PR #3)
- **PR #3 Concern 4 (currently open):** Tier-1 audit (`tests/audit-marketplace.sh` with 6 checks a-f) + audit-marketplace-fixtures driver (8 fixtures) + Tier-2 SKIP stub + Concern 5 + Concern 7 backlog notes
- **Concern 5 design + plan:** approved by both Claude main session + RDP review rounds 1 & 2 (commits `73e3391`, `0c5243e`, `8a3b7e7`)

## What Concern 5 does

Three coupled changes in one atomic refactor:

| Change | Before | After |
|---|---|---|
| **Layout** | `src-v6/bmad-bam-platform/skills/<skill>/` | `src-v6/bmad-bam-platform/<N-phase>/<skill>/` (BMM-canonical phase-numbered: `1-foundation/`, `2-modules/`, `3-integration/`, `4-readiness/`, `9-infrastructure/`) |
| **Module code** | `code: bam-platform` | `code: bbp` (BMAD 3-letter convention; reserves `bbp/bbd/bba/bbr/bbi/bbt/bbo/bbu` for BAM family) |
| **Sentinel** | `{output_folder}/bam-platform-project-context.md` | `{output_folder}/bbp/project-context.md` (subdir + plain filename → unambiguously matches universal-glob) |

**Why it matters:** PR #2's marketplace layout fell into PluginResolver **Strategy 5 (synthesized fallback)** — `module.yaml` is never installed; `agents:`, `directories:`, `x-bam-*`, `post-install-notes` are silently inert. Concern 5 puts BAM into **Strategy 1** (real `module.yaml` honored).

Empirical chain verified in:
- `external/bmad-method/tools/installer/modules/plugin-resolver.js:72-99` (Strategy 1)
- `external/bmad-method/tools/installer/modules/plugin-resolver.js:229+` (Strategy 5 fallback)
- `external/bmad-method/tools/installer/modules/official-modules.js:145` ("no module.yaml on disk" comment)

## Migration scope

6 rename patterns P1-P6 across ~28 active files:
- **P1**: `_bmad/bam-platform/` → `_bmad/bbp/`
- **P2**: `bam-platform-project-context.md` → `bbp/project-context.md` (path) or `project-context.md` (filename)
- **P3**: `code: bam-platform` → `code: bbp`
- **P4**: `team: bam-platform` → `team: bam`
- **P5**: `module-help.csv` content (output-location, outputs columns) per P2
- **P6**: `src-v6/bmad-bam-platform/skills/<skill>/` → `src-v6/bmad-bam-platform/<phase>/<skill>/`

Plus **audit updates** (check (b) regex + check (d) algorithm rewrite for phase-mode scan), **2 new audit fixtures**, **ADR 008** new, **ADR 007** title + body + annotation, **ADR 006** refinement note, **5 historical doc annotations**.

## Pre-flight checklist (before pasting kickoff)

- [ ] RDP machine has SSH key with push access (confirm: `ssh -T github.com-mira5557373`)
- [ ] Checkout the branch:
  ```bash
  git fetch origin feat/v6-p2-2-task-0-concern-4
  git checkout feat/v6-p2-2-task-0-concern-4
  git log --oneline -3   # expect HEAD = 8a3b7e7
  ```
- [ ] Verify baseline Tier-1 tests green:
  ```bash
  tests/audit-marketplace.sh >/dev/null 2>&1 && echo "[PASS] audit" || echo "[FAIL] audit"
  tests/audit-marketplace-fixtures.sh >/dev/null 2>&1 && echo "[PASS] fixtures" || echo "[FAIL] fixtures"
  tests/wave-0/run-smoke-test.sh >/dev/null 2>&1 && echo "[PASS] wave-0" || echo "[FAIL] wave-0"
  tests/p2/run-real-install-test.sh >/dev/null 2>&1 && echo "[PASS] p2" || echo "[FAIL] p2"
  src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh >/dev/null 2>&1 && echo "[PASS] design-tenancy" || echo "[FAIL] design-tenancy"
  ```
- [ ] Have `bmad` CLI available **on the machine that will run Plan C ratification** (Phase 11, Task 26). The CLI is only needed for that final manual step — the other 25 tasks run without it. If `bmad` isn't available on RDP, Plan C runs on whichever machine has it (a separate session is fine; just push the branch first).

---

## Kickoff prompt — copy/paste exactly

````
You are executing the Concern 5 implementation plan via subagent-driven
development. Each task gets a fresh subagent with focused context; you
review between tasks and dispatch the next one.

PLAN: docs/superpowers/plans/2026-05-13-p2-2-concern-5-implementation.md
SPEC: docs/superpowers/specs/2026-05-13-concern-5-design.md
BRANCH: feat/v6-p2-2-task-0-concern-4 (HEAD 8a3b7e7)

SCOPE: 26 tasks across 11 phases. Two atomic commits (per spec §8):
  - Commit 1 = code/config/test atomic (Phases 1-8, Tasks 1-15)
  - Commit 2 = docs atomic (Phases 9-10, Tasks 16-23)
  - Phase 11 (Tasks 24-26) = push + PR + Plan C ratification (pre-merge gate)

USE superpowers:subagent-driven-development to execute. For each task:
1. Read the task definition from the plan file
2. Dispatch a fresh subagent with the task's bite-sized steps
3. Subagent runs the steps + verification commands per the plan
4. You review the subagent's output before dispatching the next
5. Stop and consult the user before:
   - Creating Commit 1 (Task 15) — verify Tier-1 sweep clean
   - Creating Commit 2 (Task 23) — verify docs complete
   - Pushing (Task 24) — confirm with user
   - Plan C ratification (Task 26) — REQUIRES the user (it's a manual gate
     requiring a live LLM session; you cannot do this autonomously)

VERIFICATION DISCIPLINE: every task has a "verification" step with an
exact bash command + expected output. The subagent MUST run that command
and the output MUST match before the task is considered complete. If it
doesn't match, debug the diff before moving on.

IF A TEST FAILS at any commit boundary (Task 15 or Task 23): stop, debug,
fix. Do not proceed until all Tier-1 tests are green. Common issues:
  - Path reference not updated (run P1/P2/P6 greps to find stragglers)
  - Audit check (d) edge case (review the new algorithm in Task 12)
  - module.yaml or marketplace.json not in sync with disk state

Begin with Phase 1, Task 1: Verify branch state + baseline test pass.
````

---

## Subagent-driven execution pattern (reference)

The `subagent-driven-development` skill prescribes:

```
For each task in plan:
  1. Read the task block from the plan file
  2. Dispatch fresh subagent:
     - Description: brief (3-5 word) summary of task
     - Prompt: full task definition + steps + verification + context refs
     - Tools: leverage default (full tool access for implementation work)
  3. Subagent executes the task's steps in order
  4. Subagent runs the verification step + confirms expected output
  5. Subagent returns a summary of what changed + verification result
  6. You (the orchestrator) review:
     - Did the verification pass?
     - Are the actual file changes what we expected?
     - Any surprises in the diff?
  7. If review passes → dispatch next task subagent
  8. If review reveals issue → either ask the same subagent to fix
     OR dispatch a new one with the specific fix instruction
```

**Two-stage review at commit boundaries:**

- **Stage 1 (between tasks):** quick scan of subagent output + verification result. Catches most issues.
- **Stage 2 (before each commit):** human review (you) of the staged changes. Look at `git diff --stat` to confirm file count matches expectations; spot-check a couple of files; run the full Tier-1 sweep one more time.

---

## Task-by-task quick reference

Use this table when reviewing each task — confirm the subagent did what was supposed to happen.

| Task | Phase | Action | Verify |
|---|---|---|---|
| 1 | 1 — Preflight | Verify branch + baseline | All 5 Tier-1 tests PASS; Tier-2 exit 77 |
| 2 | 2 — Structural | `git mv` 4 skill dirs to phase locations; `.gitkeep` empty phases | `ls src-v6/bmad-bam-platform/` shows `1-foundation/`, `2-modules/`, `3-integration/`, `4-readiness/`, `9-infrastructure/`; no `skills/` |
| 3 | 3 — Metadata | module.yaml: P3 (code) + P4 (team) + P2 (sentinel filename) | `grep "bam-platform" src-v6/.../module.yaml` returns 0 lines |
| 4 | 3 — Metadata | module-help.csv: P2 in output-location + outputs columns | `grep "bam-platform" src-v6/.../module-help.csv` returns 0 lines |
| 5 | 3 — Metadata | marketplace.json: phase-prefixed paths + version 0.4.0 | Python check shows version 0.4.0 + 4 phase-prefixed paths |
| 6 | 4 — Script | post-install.sh: TARGET_DIR + sentinel filename | `grep "TARGET_DIR" .../post-install.sh` shows `$OUTPUT_FOLDER/bbp` |
| 7 | 5 — Sweeps | P1 sweep in src-v6/ | `grep -rn "_bmad/bam-platform" src-v6/` returns 0 lines |
| 8 | 5 — Sweeps | P2 sweep in src-v6/ | `grep -rn "bam-platform-project-context.md" src-v6/` returns 0 lines |
| 9 | 5 — Sweeps | P6 sweep in src-v6/ (source-tree refs) | `grep -rn "src-v6/bmad-bam-platform/skills/" src-v6/` returns 0 lines |
| 10 | 6 — Tests | P1+P2+P6 sweep in active tests/ | All three pattern greps in tests/ return 0 (excluding CONCERN-5 note) |
| 11 | 7 — Audit | check (b) regex update | spot-check regex against test inputs |
| 12 | 7 — Audit | check (d) algorithm rewrite (phase-mode) | `bash -n tests/audit-marketplace.sh` passes; `tests/audit-marketplace.sh` exits 0 |
| 13 | 7 — Audit | 2 new audit fixtures + on-disk skeleton | `tests/audit-marketplace-fixtures.sh` shows 10/10 pass |
| 14 | 7 — Audit | Driver assert_cases + fixture README | `tests/audit-marketplace-fixtures.sh` 10/10 pass |
| **15** | **8 — Commit 1** | Tier-1 sweep + atomic commit | All Tier-1 green; Commit 1 lands |
| 16 | 9 — Docs | docs/v6-final-architecture.md §6.1/§7.1/§7.6/v0.9 changelog | Spec version banner shows v0.9 |
| 17 | 9 — Docs | ADR 008 new file | INDEX.md will be updated in Task 22 |
| 18 | 9 — Docs | ADR 007: title + body sweep + trigger annotation | Title now says "(BAM falls into Strategy 5)" |
| 19 | 9 — Docs | ADR 006 refinement note | `## Refinement note` section appended |
| 20 | 9 — Docs | ADRs 002 + 005 one-line annotations | Both have "Pre-Concern-5 note" |
| 21 | 9 — Docs | 8 historical docs annotated | All 8 have "Pre-Concern-5 note" |
| 22 | 9 — Docs | INDEX.md adds ADR 008 row | Row at bottom |
| **23** | **10 — Commit 2** | Tier-1 sanity + docs commit | All Tier-1 still green; Commit 2 lands |
| 24 | 10 — Push | `git push` | Remote HEAD matches local |
| 25 | 11 — PR | Update PR description with checklist | PR description has pre-merge checklist filled |
| **26** | **11 — Gate** | **Plan C ratification (MANUAL, user runs)** | Live LLM session recites the sentinel token; recorded in PLAN-C-RATIFICATION.md |

Bold rows = orchestrator checkpoints (stop, consult user, confirm before proceeding).

---

## Critical safety rules

1. **Never run `git push --force`.** Concern 5 commits are additive only.
2. **Never `git reset --hard` without backing up.** If a task goes sideways, `git stash` first, debug, then unstash.
3. **Plan C ratification is a HUMAN gate.** Don't fake-pass it. If `bmad` CLI isn't available on the current machine, push the branch and run Plan C on a machine that has it. Don't merge without Plan C PASS recorded.
4. **No transitional state shims.** Per user constraint, no `if old_path or new_path` fallbacks. Atomic rename.
5. **Don't touch:**
   - `src-v2/module.yaml` (frozen v3)
   - `tests/integration/CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md` (intentional discovery note)
   - `tests/integration/CONCERN-7-DIRECTORIES-BLOCK-DEAD-CODE.md` (separate concern backlog)
   - `docs/superpowers/specs/2026-05-13-concern-5-design.md` (this spec itself; intentional self-references)

---

## Plan C ratification (Task 26) — separate procedure detail

This is the **pre-merge gate** per spec §9. It requires a live LLM session in a Claude Code IDE; no automation possible.

If `bmad` CLI is on RDP:

```bash
# 1. Capture REPO_ROOT before any cd
REPO_ROOT="$(git rev-parse --show-toplevel)"
WORK_DIR=$(mktemp -d)
echo "REPO_ROOT=$REPO_ROOT"
echo "WORK_DIR=$WORK_DIR"

# 2. Install BAM from local checkout
bmad install \
  --custom-source "$REPO_ROOT" \
  --modules bbp \
  --directory "$WORK_DIR" \
  --tools claude-code \
  --yes

# 3. Verify Strategy 1 succeeded
ls "$WORK_DIR/_bmad/bbp/"  # 4 skills + module-help.csv

# 4. Run finalize
cd "$WORK_DIR"
bmad run bmad-bam-finalize

# 5. Verify sentinel
cat "$WORK_DIR/_bmad-output/bbp/project-context.md" | grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}'
# Note the token

# 6. Open Claude Code IDE in $WORK_DIR
#    Activate a BMAD core skill (e.g., bmad-create-architecture)
#    Ask: "What BAM_LOAD_VERIFY token do you see in your loaded context?"
#    The agent should recite the exact token from step 5

# 7. Record outcome in tests/p2/PLAN-C-RATIFICATION.md per Task 26 step 7

# 8. Cleanup
rm -rf "$WORK_DIR"
```

If Plan C PASSES → ready for merge approval.
If Plan C FAILS → STOP, do not merge; forward-fix per spec §10 R1 mitigation; re-run Plan C until PASS.

---

## Estimated timeline

Per spec §11: **8-10 hours** of focused work + 30 min Plan C manual.

Subagent-driven execution may run slightly faster than spec estimate because:
- Each task is bounded; subagent stays focused
- No prior-context bloat (fresh subagent per task)
- Two-stage review catches issues early

Possible slower factors:
- Subagent might need clarification on ambiguous steps → orchestrator round-trip
- Test failures at commit boundaries → debug iteration
- Plan C might fail → forward-fix → re-ratify

Plan for 10-12h total wall-clock, including buffer.

---

## When you're done

After Plan C PASS recorded:

1. Update PR description: tick all checklist boxes; note Plan C outcome line.
2. Notify the user (me, in the main session) that Concern 5 is ready for merge approval.
3. The user decides whether to merge PR #3 first (Concern 4) then PR #4 (Concern 5), OR merge them as one combined PR.

---

## Reference docs (for the RDP Claude session to bookmark)

- **Plan file (drives execution):** `docs/superpowers/plans/2026-05-13-p2-2-concern-5-implementation.md`
- **Design spec (rationale):** `docs/superpowers/specs/2026-05-13-concern-5-design.md`
- **Concern 5 discovery note:** `tests/integration/CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md`
- **Concern 7 backlog (post-Concern-5 followup):** `tests/integration/CONCERN-7-DIRECTORIES-BLOCK-DEAD-CODE.md`
- **Architecture spec:** `docs/v6-final-architecture.md` (currently v0.8; Task 16 bumps to v0.9)
- **Standards (ADR/frontmatter conventions):** `src-v6/bmad-bam-platform/skills/bmad-bam-agent-atlas/resources/standards/std-{adr,frontmatter,validation}.md` (paths move under Task 2 to `1-foundation/`)
