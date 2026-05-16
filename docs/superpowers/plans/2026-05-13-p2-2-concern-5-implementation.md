# P2.2 — Concern 5 BMM-Canonical Layout Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `bmad-bam-platform` from `skills/` wrapper to BMM-canonical phase-numbered grouping so PluginResolver Strategy 1 succeeds; rename module code `bam-platform` → `bbp` (BMAD 3-letter convention); relocate sentinel to subdir form `{output_folder}/bbp/project-context.md` for unambiguous universal-glob match. Net result: real `module.yaml` is honored at install time, unlocks Tier-2 PASS-mode (PR #6 follow-up).

**Architecture:** Phase-numbered grouping mirrors BMM's `1-analysis/`, `2-plan-workflows/`, etc. BAM uses QG-aligned phase names: `1-foundation/` (QG-F1), `2-modules/` (QG-M1/M2/M3), `3-integration/` (QG-I1/I2/I3), `4-readiness/` (QG-P1), plus `9-infrastructure/` for bootstrap + operational skills (smoke-test, finalize). Skills relocate via `git mv`; common parent of all listed skills becomes the module dir (where `module.yaml` lives) → Strategy 1 matches. Module code rename + sentinel relocation are coupled changes that ride alongside the structural refactor in one atomic commit.

**Tech Stack:** bash, Python 3.11+, Markdown, YAML, TOML. No new dependencies. Uses existing `git mv` for history preservation.

**Spec reference:** `docs/superpowers/specs/2026-05-13-concern-5-design.md` (HEAD `0c5243e`, v3 — RDP v1 + v2 findings incorporated).

**Implementation strategy:** **2 atomic commits** (per Section 8 of spec), with all Tier-1 tests green at each commit boundary:
- Commit 1: Code/config/test atomic (structural moves + metadata + audit + tests)
- Commit 2: Docs atomic (spec §6.1/§7.6/§7.1 + ADRs + INDEX.md)

Manual Plan C ratification is pre-merge gate (Section 9), not in a commit.

---

## File Structure

### Structural moves (git mv to preserve history)

- Move: `src-v6/bmad-bam-platform/skills/bmad-bam-agent-atlas/` → `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/`
- Move: `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/` → `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/`
- Move: `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/` → `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/`
- Move: `src-v6/bmad-bam-platform/skills/bmad-bam-finalize/` → `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/`
- Create: `src-v6/bmad-bam-platform/3-integration/.gitkeep`
- Create: `src-v6/bmad-bam-platform/4-readiness/.gitkeep`
- Delete: `src-v6/bmad-bam-platform/skills/` (after moves; empty dir, no `rmdir` needed since git tracks deletion)

### Metadata updates

- Modify: `src-v6/bmad-bam-platform/module.yaml` — `code: bam-platform` → `code: bbp` (P3); `team: bam-platform` → `team: bam` (P4); sentinel filename refs in `x-bam-wave-0-artifacts` (P2)
- Modify: `src-v6/bmad-bam-platform/module-help.csv` — `output-location` + `outputs` columns updated per P2
- Modify: `.claude-plugin/marketplace.json` — skill paths phase-prefixed (P6); version `0.3.0` → `0.4.0`

### Sentinel + script

- Modify: `src-v6/bmad-bam-platform/skills/bmad-bam-finalize/scripts/post-install.sh` — new path AFTER move: `9-infrastructure/bmad-bam-finalize/scripts/post-install.sh`. Update sentinel write target from `{output_folder}/bam-platform-project-context.md` to `{output_folder}/bbp/project-context.md`; add `mkdir -p` for subdir

### P1/P2/P6 sweeps in active source

(All paths AFTER `git mv` operations)

- Modify: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/SKILL.md`
- Modify: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/customize.toml`
- Modify: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/{cell-based-architecture,rls-deep-dive,schema-per-tenant,tenancy-decision-framework,tenant-isolation-testing-patterns}.md`
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/customize.toml`
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md`
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`
- Modify: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh`
- Modify: `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/SKILL.md`
- Modify: `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/bmad-skill-manifest.yaml`
- Modify: `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/customize.toml`
- Modify: `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/steps/step-01-c-run-finalize.md`
- Modify: `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/steps/{step-03-c-install-test-mode,step-04-c-emit-sentinel,step-05-v-verify-plan-a,step-06-v-verify-plan-b,step-07-v-verify-plan-c}.md`
- Modify: `src-v6/bmad-bam-platform/README.md`

### P1/P2/P6 sweeps in active tests

- Modify: `tests/integration/MANUAL.md`
- Modify: `tests/integration/run-real-install.sh`
- Modify: `tests/p2/lib/probe-llm-context.sh`
- Modify: `tests/p2/run-real-install-test.sh`
- Modify: `tests/wave-0/run-smoke-test.sh`
- Modify: `tests/wave-0/lib/sentinel.sh`
- Modify: `tests/README.md`

### Audit + fixtures

- Modify: `tests/audit-marketplace.sh` — check (b) regex update + check (d) algorithm rewrite (phase-mode scan)
- Create: `tests/fixtures/marketplace-audit/marketplace-good-phase-numbered.json`
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-phase-orphan.json`
- Create: `tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased/.gitkeep`
- Create: `tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan/.gitkeep`
- Modify: `tests/audit-marketplace-fixtures.sh` — add 2 new `assert_case` invocations
- Modify: `tests/fixtures/marketplace-audit/README.md` — add fixture rows

### Spec updates (Commit 2)

- Modify: `docs/v6-final-architecture.md` — §6.1 phase-grouping rewrite; §7.1 universal-glob subdir guidance; §7.6 sentinel-location convention update; changelog v0.8 → v0.9

### ADR updates (Commit 2)

- Create: `_bmad/_memory/atlas/architecture-decisions/2026-05-13-008-module-shape-bmm-canonical.md`
- Modify: `_bmad/_memory/atlas/architecture-decisions/2026-05-13-006-module-shape-bmm-aligned.md` — body-only `## Refinement note` section
- Modify: `_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md` — title update + body path-refs sweep + trigger-fire annotation
- Modify: `_bmad/_memory/atlas/architecture-decisions/2026-05-12-002-activation-path-selected.md` — one-line annotation at body top
- Modify: `_bmad/_memory/atlas/architecture-decisions/2026-05-13-005-project-context-location-aligned-to-bmm.md` — one-line annotation at body top
- Modify: `_bmad/_memory/atlas/architecture-decisions/INDEX.md` — add ADR 008 row

### Historical doc annotations (Commit 2)

- Modify: `docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md` — one-line annotation at top
- Modify: `docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md` — one-line annotation at top
- Modify: `docs/v6-rdp-kickoff.md` — one-line annotation at top
- Modify: `docs/v6-rdp-concern-4-kickoff.md` — one-line annotation at top
- Modify: `docs/v6-spec-patches/v0.6-section-7-6-path-b-default.md` — one-line annotation at top
- Modify: `tests/p2/INVESTIGATION-NOTES.md` — one-line annotation at top
- Modify: `tests/wave-0/INVESTIGATION-NOTES.md` — one-line annotation at top
- Modify: `tests/wave-0/WAVE-0-OUTCOME.md` — one-line annotation at top

### NOT TOUCHED

- `src-v2/module.yaml` — frozen v3, retains `team: bam-platform` (9 occurrences)
- `docs/superpowers/specs/2026-05-13-concern-5-design.md` — THIS spec; intentionally references old strings
- `tests/integration/CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md` — discovery note; intentionally references old strings
- `tests/integration/CONCERN-7-DIRECTORIES-BLOCK-DEAD-CODE.md` — separate concern backlog
- `tests/fixtures/marketplace-audit/*.json` — fixture plugin name `bmad-bam-platform` unchanged

---

## Phase 1: Pre-flight verification

### Task 1: Verify branch state + baseline test pass

**Files:** none modified

- [ ] **Step 1: Confirm working branch + tree clean**

Run:
```bash
cd /mnt/b/2026/Aprial/bmad-bam
git status
git rev-parse --abbrev-ref HEAD
```

Expected: branch `feat/v6-p2-2-task-0-concern-4`, tree clean.

- [ ] **Step 2: Run all Tier-1 tests to confirm green baseline**

Run:
```bash
tests/audit-marketplace.sh                                                              # OK
tests/audit-marketplace-fixtures.sh                                                     # 8/8 pass
tests/wave-0/run-smoke-test.sh                                                          # PASS (plan=A)
tests/p2/run-real-install-test.sh                                                       # PASS
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh       # PASS
tests/integration/run-real-install.sh; echo "exit=$?"                                   # exit=77 (SKIP)
```

Expected: all green except Tier-2 stub (exit 77 by design).

- [ ] **Step 3: Capture baseline grep counts for verification later**

Run:
```bash
echo "=== Baseline (pre-refactor) pattern counts ==="
for pattern in "_bmad/bam-platform" "bam-platform-project-context.md" "code: bam-platform" "team: bam-platform" "src-v6/bmad-bam-platform/skills/"; do
    n=$(grep -rln "$pattern" src-v6/ tests/ docs/ _bmad/_memory/ .claude-plugin/ 2>&1 | grep -v "/external/" | wc -l)
    echo "$pattern : $n files"
done
```

Expected output approximately:
```
_bmad/bam-platform : 12 files
bam-platform-project-context.md : 26 files
code: bam-platform : 4 files
team: bam-platform : 5 files
src-v6/bmad-bam-platform/skills/ : 23 files
```

Save these numbers — Task 17 verifies post-refactor counts approach 0 in active files.

---

## Phase 2: Structural moves (git mv)

### Task 2: Move 4 skill dirs to phase-numbered locations

**Files:**
- Move 4 skill dirs via `git mv`
- Create 2 empty phase dirs with `.gitkeep`
- Delete: `src-v6/bmad-bam-platform/skills/` (empty after moves)

- [ ] **Step 1: Move Atlas to 1-foundation**

Run:
```bash
cd /mnt/b/2026/Aprial/bmad-bam
mkdir -p src-v6/bmad-bam-platform/1-foundation
git mv src-v6/bmad-bam-platform/skills/bmad-bam-agent-atlas \
       src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas
```

- [ ] **Step 2: Move design-tenancy-model to 2-modules**

Run:
```bash
mkdir -p src-v6/bmad-bam-platform/2-modules
git mv src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model \
       src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model
```

- [ ] **Step 3: Move smoke-test + finalize to 9-infrastructure**

Run:
```bash
mkdir -p src-v6/bmad-bam-platform/9-infrastructure
git mv src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test \
       src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test
git mv src-v6/bmad-bam-platform/skills/bmad-bam-finalize \
       src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize
```

- [ ] **Step 4: Verify old skills/ dir is empty + remove**

Run:
```bash
ls -la src-v6/bmad-bam-platform/skills/ 2>&1
```

Expected: empty or "No such file or directory" (if already removed).

If still present:
```bash
rmdir src-v6/bmad-bam-platform/skills/ 2>&1
```

- [ ] **Step 5: Create empty phase dirs with .gitkeep**

Run:
```bash
mkdir -p src-v6/bmad-bam-platform/3-integration src-v6/bmad-bam-platform/4-readiness
touch src-v6/bmad-bam-platform/3-integration/.gitkeep
touch src-v6/bmad-bam-platform/4-readiness/.gitkeep
git add src-v6/bmad-bam-platform/3-integration/.gitkeep \
        src-v6/bmad-bam-platform/4-readiness/.gitkeep
```

- [ ] **Step 6: Verify final layout**

Run:
```bash
ls -la src-v6/bmad-bam-platform/
```

Expected: `1-foundation/`, `2-modules/`, `3-integration/`, `4-readiness/`, `9-infrastructure/`, plus `module.yaml`, `module-help.csv`, `README.md`. No `skills/` dir.

- [ ] **Step 7: Verify git tracks moves (not delete + add)**

Run:
```bash
git status --short | head -20
```

Expected: lines starting with `R` (rename) for the 4 skill dirs, NOT `D` (delete) + `A` (add).

---

## Phase 3: Module metadata updates

### Task 3: Update module.yaml — code, team, sentinel filename refs

**Files:** `src-v6/bmad-bam-platform/module.yaml`

- [ ] **Step 1: P3 — rename code field**

Use Edit tool on `src-v6/bmad-bam-platform/module.yaml`:
- Find: `code: bam-platform`
- Replace: `code: bbp`

- [ ] **Step 2: P4 — rename team field**

Use Edit tool on `src-v6/bmad-bam-platform/module.yaml`:
- Find: `team: bam-platform`
- Replace: `team: bam`

- [ ] **Step 3: P2 — update sentinel filename refs in x-bam-wave-0-artifacts**

Use Edit tool on `src-v6/bmad-bam-platform/module.yaml`:
- Find: `{project-root}/{output_folder}/bam-platform-project-context.md`
- Replace: `{project-root}/{output_folder}/bbp/project-context.md`
- replace_all: true

- [ ] **Step 4: Verify no remaining `bam-platform` in module.yaml**

Run:
```bash
grep -n "bam-platform" src-v6/bmad-bam-platform/module.yaml
```

Expected: 0 lines (all references renamed).

### Task 4: Update module-help.csv — P2 in output-location + outputs columns

**Files:** `src-v6/bmad-bam-platform/module-help.csv`

- [ ] **Step 1: Read current state**

Run:
```bash
cat src-v6/bmad-bam-platform/module-help.csv
```

Identify rows containing `bam-platform-project-context.md` — they're in `bmad-bam-finalize` row's `output-location` + `outputs` columns and in `bmad-bam-smoke-test` row's description.

- [ ] **Step 2: P2 sweep across the CSV**

Use Edit tool with replace_all on `src-v6/bmad-bam-platform/module-help.csv`:
- Find: `{output_folder}/bam-platform-project-context.md`
- Replace: `{output_folder}/bbp/project-context.md`
- replace_all: true

Then second pass for the `outputs` column (bare filename):
- Find: `bam-platform-project-context.md`
- Replace: `project-context.md`
- replace_all: true

- [ ] **Step 3: Verify no remaining `bam-platform` strings**

Run:
```bash
grep -n "bam-platform" src-v6/bmad-bam-platform/module-help.csv
```

Expected: 0 lines.

### Task 5: Update marketplace.json — P6 phase-prefixed paths + version bump

**Files:** `.claude-plugin/marketplace.json`

- [ ] **Step 1: Bump version 0.3.0 → 0.4.0**

Use Edit tool on `.claude-plugin/marketplace.json`:
- Find: `"version": "0.3.0",`
- Replace: `"version": "0.4.0",`

(Note: this should match the `bmad-bam-platform` plugin's version only. If the bmad-bam v3 plugin has its own version, leave it alone. Verify with the next step.)

- [ ] **Step 2: Update 4 skill paths to phase-numbered form**

Use Edit tool on `.claude-plugin/marketplace.json`:

Find:
```
"./src-v6/bmad-bam-platform/skills/bmad-bam-agent-atlas",
```
Replace:
```
"./src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas",
```

Find:
```
"./src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test",
```
Replace:
```
"./src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test",
```

Find:
```
"./src-v6/bmad-bam-platform/skills/bmad-bam-finalize",
```
Replace:
```
"./src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize",
```

Find:
```
"./src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model"
```
Replace:
```
"./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model"
```

- [ ] **Step 3: Verify JSON is valid + paths correct**

Run:
```bash
python3 -c "
import json
m = json.load(open('.claude-plugin/marketplace.json'))
for p in m['plugins']:
    if p['name'] == 'bmad-bam-platform':
        print('version:', p['version'])
        for s in p['skills']:
            print(' ', s)
"
```

Expected:
```
version: 0.4.0
  ./src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas
  ./src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test
  ./src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize
  ./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model
```

---

## Phase 4: Sentinel + script update

### Task 6: Update post-install.sh — sentinel target path + subdir mkdir

**Files:** `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/scripts/post-install.sh`

- [ ] **Step 1: Read post-install.sh to locate sentinel-write logic**

Run:
```bash
grep -n "bam-platform-project-context\|TARGET_DIR\|TARGET_FILE\|SENTINEL" \
  src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/scripts/post-install.sh
```

Note the line numbers of `TARGET_DIR=`, `TARGET_FILE=`, and any reference to the old filename.

- [ ] **Step 2: Update TARGET_FILE / sentinel filename**

Use Edit tool on `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/scripts/post-install.sh`:
- Find: `bam-platform-project-context.md`
- Replace: `project-context.md`
- replace_all: true

- [ ] **Step 3: Add subdir mkdir + verify TARGET_DIR points to subdir**

The TARGET_DIR variable currently resolves to `{output_folder}`. Post-refactor it needs to resolve to `{output_folder}/bbp/`. The script reads `output_folder` from `_bmad/config.toml` via the `resolve_output_folder` function. Two ways to handle:

Option A (subdir at write time): keep TARGET_DIR = OUTPUT_FOLDER; change the TARGET_FILE construction to include `bbp/` subdir prefix; add `mkdir -p "$TARGET_DIR/bbp"` before write.

Option B (TARGET_DIR includes subdir): make TARGET_DIR = `$OUTPUT_FOLDER/bbp`; `mkdir -p "$TARGET_DIR"`; TARGET_FILE = `$TARGET_DIR/project-context.md`.

Use Option B (cleaner). Read the script and apply:

```bash
# Find the line: TARGET_DIR="$OUTPUT_FOLDER"  (or similar)
# Change to: TARGET_DIR="$OUTPUT_FOLDER/bbp"
```

Use Edit tool:
- Find: `TARGET_DIR="$OUTPUT_FOLDER"`
- Replace: `TARGET_DIR="$OUTPUT_FOLDER/bbp"`

(If the exact string differs, locate the assignment line and adjust accordingly.)

- [ ] **Step 4: Verify mkdir -p still creates the target (subdir form)**

The existing `mkdir -p "$TARGET_DIR"` line should be unchanged but now creates `<output_folder>/bbp/` instead of just `<output_folder>/`. Verify by grepping:

```bash
grep -n "mkdir -p" src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/scripts/post-install.sh
```

Expected: `mkdir -p "$TARGET_DIR"` line is present and unchanged.

- [ ] **Step 5: Smoke-test the script logic mentally**

Read the full script and trace:
1. `OUTPUT_FOLDER` resolved from `_bmad/config.toml` (default `_bmad-output`)
2. `TARGET_DIR="$OUTPUT_FOLDER/bbp"` — new
3. `mkdir -p "$TARGET_DIR"` — creates `_bmad-output/bbp/`
4. `TARGET_FILE="$TARGET_DIR/project-context.md"` — writes to `_bmad-output/bbp/project-context.md`

This matches the spec's §2.3 subdir-based sentinel design.

---

## Phase 5: Active source sweeps (P1 + P2 + P6)

### Task 7: P1 sweep across active src-v6 files

P1 catches `_bmad/bam-platform/` → `_bmad/bbp/`. Most files have multiple occurrences.

**Files (with paths AFTER Task 2's move):**
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/SKILL.md`
- `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/customize.toml`
- `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md`
- `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/steps/step-01-c-run-finalize.md`

- [ ] **Step 1: Identify all current P1 hits in src-v6**

Run:
```bash
grep -rn "_bmad/bam-platform" src-v6/ 2>&1 | grep -v "/external/"
```

Note each `file:line:content` row to plan the edits.

- [ ] **Step 2: Sweep each file**

For each file in the file list, use Edit tool with `replace_all: true`:
- Find: `_bmad/bam-platform/`
- Replace: `_bmad/bbp/`

Files to sweep (one Edit per file):

```
src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/SKILL.md
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/customize.toml
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/templates/tenancy-model.md.template
src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/steps/step-01-c-run-finalize.md
```

- [ ] **Step 3: Verify zero remaining P1 hits in src-v6/**

Run:
```bash
grep -rn "_bmad/bam-platform" src-v6/ 2>&1 | grep -v "/external/"
```

Expected: empty output.

### Task 8: P2 sweep across active src-v6 files

P2 catches `bam-platform-project-context.md`. **Two replacement forms:**
- **Path context** (e.g., `{output_folder}/bam-platform-project-context.md`): replace with `{output_folder}/bbp/project-context.md`
- **Filename-only** (e.g., bare `bam-platform-project-context.md` in prose): replace with `bbp/project-context.md` if it represents a path reference, or just `project-context.md` if the context discusses the filename alone

In practice, the active source files use the path form. Use the path-form replacement and verify each file individually.

**Files (paths AFTER Task 2's move):**
- `src-v6/bmad-bam-platform/README.md`
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/customize.toml`
- `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/steps/step-02-c-load-options.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/SKILL.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/bmad-skill-manifest.yaml`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/customize.toml`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/steps/step-01-c-run-finalize.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/steps/step-03-c-install-test-mode.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/steps/step-04-c-emit-sentinel.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/steps/step-05-v-verify-plan-a.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/steps/step-06-v-verify-plan-b.md`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/steps/step-07-v-verify-plan-c.md`

- [ ] **Step 1: Identify all current P2 hits in src-v6**

Run:
```bash
grep -rn "bam-platform-project-context.md" src-v6/ 2>&1 | grep -v "/external/"
```

- [ ] **Step 2: Sweep each file — path-form replacement**

For each file in the list, use Edit tool with `replace_all: true`:
- Find: `{output_folder}/bam-platform-project-context.md`
- Replace: `{output_folder}/bbp/project-context.md`

- [ ] **Step 3: Handle bare-filename cases (if any)**

After Step 2, run:
```bash
grep -rn "bam-platform-project-context.md" src-v6/ 2>&1 | grep -v "/external/"
```

For any remaining matches that are bare-filename references (not preceded by `{output_folder}/`), use Edit tool to replace `bam-platform-project-context.md` with `project-context.md` if the context discusses the filename alone, or with `bbp/project-context.md` if it's a relative path.

Inspect each context carefully — most should be already handled by Step 2.

- [ ] **Step 4: Verify zero remaining P2 hits in src-v6/**

Run:
```bash
grep -rn "bam-platform-project-context.md" src-v6/ 2>&1 | grep -v "/external/"
```

Expected: empty output.

### Task 9: P6 sweep — source-tree refs in active src-v6

P6 catches `src-v6/bmad-bam-platform/skills/<skill>/` → phase-prefixed form. Atlas fragments + design-tenancy-model contain these source-tree references.

**Files (paths AFTER Task 2's move):**
- `src-v6/bmad-bam-platform/README.md`
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/cell-based-architecture.md`
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rls-deep-dive.md`
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/schema-per-tenant.md`
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenancy-decision-framework.md`
- `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/tenant-isolation-testing-patterns.md`
- `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/scripts/post-install.sh`
- `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/steps/step-01-c-run-finalize.md`

- [ ] **Step 1: Inspect each file's source-tree references**

Run:
```bash
grep -rn "src-v6/bmad-bam-platform/skills/" src-v6/ 2>&1 | grep -v "/external/"
```

Identify the SKILL each reference points to so you can apply the correct phase prefix:
- `bmad-bam-agent-atlas` → `1-foundation`
- `bmad-bam-design-tenancy-model` → `2-modules`
- `bmad-bam-smoke-test` → `9-infrastructure`
- `bmad-bam-finalize` → `9-infrastructure`

- [ ] **Step 2: Sweep references per skill**

For each occurrence, use Edit tool to apply the matching phase prefix:

| Old reference | New reference |
|---|---|
| `src-v6/bmad-bam-platform/skills/bmad-bam-agent-atlas/` | `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/` |
| `src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/` | `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/` |
| `src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test/` | `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-smoke-test/` |
| `src-v6/bmad-bam-platform/skills/bmad-bam-finalize/` | `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/` |

Use `replace_all: true` per file.

- [ ] **Step 3: Verify zero remaining P6 hits in src-v6/**

Run:
```bash
grep -rn "src-v6/bmad-bam-platform/skills/" src-v6/ 2>&1 | grep -v "/external/"
```

Expected: empty output.

---

## Phase 6: Active test sweeps

### Task 10: P1 + P2 + P6 sweep across active tests

**Files:**
- `tests/integration/MANUAL.md`
- `tests/integration/run-real-install.sh`
- `tests/p2/lib/probe-llm-context.sh`
- `tests/p2/run-real-install-test.sh`
- `tests/wave-0/run-smoke-test.sh`
- `tests/wave-0/lib/sentinel.sh`
- `tests/README.md`

- [ ] **Step 1: Identify P1 hits in tests/**

Run:
```bash
grep -rn "_bmad/bam-platform" tests/ 2>&1 | grep -v "/integration/CONCERN-"
```

(Excludes `CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md` which is allowed to retain old strings.)

- [ ] **Step 2: P1 sweep in tests/**

For each file with hits (likely: `tests/integration/MANUAL.md`, `tests/p2/run-real-install-test.sh`), use Edit tool with `replace_all: true`:
- Find: `_bmad/bam-platform/`
- Replace: `_bmad/bbp/`

- [ ] **Step 3: P2 sweep in tests/**

Run:
```bash
grep -rn "bam-platform-project-context.md" tests/ 2>&1 | grep -v "/integration/CONCERN-"
```

For each file with hits (likely: `tests/integration/MANUAL.md`, `tests/p2/lib/probe-llm-context.sh`, `tests/p2/run-real-install-test.sh`, `tests/wave-0/run-smoke-test.sh`), use Edit tool:
- Find: `{output_folder}/bam-platform-project-context.md`
- Replace: `{output_folder}/bbp/project-context.md`

Then for bare-filename refs:
- Find: `bam-platform-project-context.md`
- Replace: `project-context.md` (or `bbp/project-context.md` depending on context)

Inspect each context.

- [ ] **Step 4: P6 sweep in tests/**

Run:
```bash
grep -rn "src-v6/bmad-bam-platform/skills/" tests/ 2>&1 | grep -v "/integration/CONCERN-"
```

For each match, identify which skill is referenced and apply the phase prefix (per Task 9 mapping).

Notable files:
- `tests/README.md` — likely has `src-v6/bmad-bam-platform/skills/*/tests/smoke-test.sh` glob; update to `src-v6/bmad-bam-platform/*/*/tests/smoke-test.sh` (matches across all phase dirs)
- `tests/integration/run-real-install.sh` — header comment may mention skills/ in a context comment; update path reference but preserve the prose
- `tests/wave-0/lib/sentinel.sh` — likely references the sentinel-generator script's path

- [ ] **Step 5: Verify all three patterns are 0 in active tests**

Run:
```bash
echo "P1 hits in tests/ (excl CONCERN-5 note):"
grep -rln "_bmad/bam-platform" tests/ | grep -v "/integration/CONCERN-" | wc -l
echo "P2 hits in tests/ (excl CONCERN-5 note):"
grep -rln "bam-platform-project-context.md" tests/ | grep -v "/integration/CONCERN-" | wc -l
echo "P6 hits in tests/ (excl CONCERN-5 note):"
grep -rln "src-v6/bmad-bam-platform/skills/" tests/ | grep -v "/integration/CONCERN-" | wc -l
```

Expected: all three should be `0`.

---

## Phase 7: Audit updates + new fixtures

### Task 11: Update check (b) regex in audit-marketplace.sh

**Files:** `tests/audit-marketplace.sh`

- [ ] **Step 1: Locate check (b) elif line**

Run:
```bash
grep -n "v3 + v6 skill-path conventions\|skill entry is not under" tests/audit-marketplace.sh
```

Find the elif line (currently `elif [[ ! "$skill" =~ /(skills|workflows)/ ]]; then`).

- [ ] **Step 2: Update regex with phase pattern**

Use Edit tool on `tests/audit-marketplace.sh`:

Find:
```bash
    elif [[ ! "$skill" =~ /(skills|workflows)/ ]]; then
        emit "skill entry is not under a /skills/ or /workflows/ segment: $skill (check b)"
```

Replace:
```bash
    elif [[ ! "$skill" =~ /([0-9]+-[a-z][a-z0-9-]*|skills|workflows)/ ]]; then
        emit "skill entry is not under a phase dir (N-<name>/), /skills/, or /workflows/ segment: $skill (check b)"
```

Also update the comment block above to mention phase-numbered support:

Find:
```bash
    # Check (b): path must be a leaf-skill entry — must contain a /skills/ or
    # /workflows/ segment (v6 = /skills/<name>; v3 = /workflows/[<category>/]<name>).
    # This catches module-root entries (e.g., ./agents).
    # Accepts v3 + v6 skill-path conventions, including v3's categorized subdirs
    # like /workflows/foundation/<name>. Exempts two v3-legacy bundled-content
    # entries (./src/data and ./src/_config) that ship as part of the v3 plugin's
    # data/config bundle — these are stable, well-known entries.
```

Replace:
```bash
    # Check (b): path must be a leaf-skill entry — must contain a phase-numbered
    # segment (N-<name>/, BMM-canonical, e.g. /1-foundation/, /2-plan-workflows/),
    # OR a /skills/ segment (legacy v6 pre-Concern-5 layout, retained for
    # backward fixture-compat), OR a /workflows/ segment (v3 BAM, optionally with
    # nested categories like /workflows/foundation/<name>).
    # The phase regex [0-9]+-[a-z][a-z0-9-]* supports multi-word phase names
    # like BMM's 2-plan-workflows. This catches module-root entries (e.g.,
    # ./agents). Exempts two v3-legacy bundled-content entries (./src/data and
    # ./src/_config) that ship as part of the v3 plugin's data/config bundle —
    # these are stable, well-known entries.
```

- [ ] **Step 3: Verify regex still works for existing fixtures**

Run a quick spot test:
```bash
bash -c '
for path in \
    "./src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas" \
    "./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha" \
    "./src/workflows/foundation/scaffold-foundation" \
    "./agents"; do
    if [[ "$path" =~ /([0-9]+-[a-z][a-z0-9-]*|skills|workflows)/ ]]; then
        echo "MATCH: $path"
    else
        echo "FAIL:  $path"
    fi
done
'
```

Expected:
```
MATCH: ./src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas
MATCH: ./tests/fixtures/marketplace-audit/fake-source/skills/skill-alpha
MATCH: ./src/workflows/foundation/scaffold-foundation
FAIL:  ./agents
```

### Task 12: Rewrite check (d) algorithm for phase-mode scan

**Files:** `tests/audit-marketplace.sh`

- [ ] **Step 1: Read current check (d) inference block (lines ~120-180)**

Run:
```bash
sed -n '115,170p' tests/audit-marketplace.sh
```

Identify the start (the `# ─── Check (d): orphans` header) and end (the `for skill_root in...; done` block).

- [ ] **Step 2: Replace check (d) block**

Use Edit tool on `tests/audit-marketplace.sh`:

Find the existing `# ─── Check (d): orphans (with .no-marketplace sentinel exclusion) ─` block and the entire associated logic, replace with:

```bash
# ─── Check (d): orphans (with .no-marketplace sentinel exclusion) ─────────
# Per-plugin scan-mode inference: each listed skill path determines a scan
# root + mode (phase | flat). Then walk scan roots looking for sibling skill
# dirs not listed in marketplace.json.
#   - Phase mode (paths matching /<N>-<word>/): scan root = module dir
#     (grandparent of skill leaf); walk all <N>-<word>/ children, then each
#     child's direct subdirs are potential skills.
#   - Flat mode (paths matching /skills/): scan root = .../skills/; walk
#     direct subdirs.
# v3 /workflows/ paths silently skip (legacy, not in scope for orphan check).

declare -A SCAN_MODE_OF  # key=scan_root abs path, value="phase" or "flat"

if [ -n "$SKILL_ROOT_OVERRIDE" ]; then
    SCAN_MODE_OF["$SKILL_ROOT_OVERRIDE"]="flat"
else
    for r in "${LISTED_RESOLVED[@]:-}"; do
        [ -z "$r" ] && continue
        if [[ "$r" =~ /[0-9]+-[a-z][a-z0-9-]*/ ]]; then
            # Phase mode: scan root = module dir (grandparent of skill leaf)
            phase_dir="$(dirname "$r")"
            module_dir="$(dirname "$phase_dir")"
            SCAN_MODE_OF["$module_dir"]="phase"
        elif [[ "$r" == */skills/* ]]; then
            # Flat mode: scan root = .../skills/
            scan_root="${r%/skills/*}/skills"
            SCAN_MODE_OF["$scan_root"]="flat"
        fi
        # v3 /workflows/ paths: no entry; silently skip
    done
fi

# Iterate scan roots by mode
for scan_root in "${!SCAN_MODE_OF[@]}"; do
    [ -d "$scan_root" ] || continue
    mode="${SCAN_MODE_OF[$scan_root]}"

    if [ "$mode" = "phase" ]; then
        # Walk each phase-numbered subdir, then each phase dir's direct skill children
        while IFS= read -r phase_dir; do
            [ -z "$phase_dir" ] && continue
            while IFS= read -r ondisk; do
                # Sentinel exclusion
                if [ -f "$ondisk/.no-marketplace" ]; then
                    continue
                fi
                listed=0
                for r in "${LISTED_RESOLVED[@]:-}"; do
                    [ "$r" = "$ondisk" ] && listed=1 && break
                done
                if [ "$listed" -eq 0 ]; then
                    relative="${ondisk#$REPO_ROOT/}"
                    emit "skill exists on disk but not listed in marketplace.json: $relative (check d, phase mode) — add to plugins[*].skills, or create a .no-marketplace sentinel file to exclude"
                fi
            done < <(find "$phase_dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
        done < <(find "$scan_root" -mindepth 1 -maxdepth 1 -type d -regextype posix-extended -regex '.*/[0-9]+-[a-z][a-z0-9-]*' 2>/dev/null)
    else
        # Flat mode: scan direct children of scan root
        while IFS= read -r ondisk; do
            if [ -f "$ondisk/.no-marketplace" ]; then
                continue
            fi
            listed=0
            for r in "${LISTED_RESOLVED[@]:-}"; do
                [ "$r" = "$ondisk" ] && listed=1 && break
            done
            if [ "$listed" -eq 0 ]; then
                relative="${ondisk#$REPO_ROOT/}"
                emit "skill exists on disk but not listed in marketplace.json: $relative (check d) — add to plugins[*].skills, or create a .no-marketplace sentinel file to exclude"
            fi
        done < <(find "$scan_root" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
    fi
done

```

- [ ] **Step 3: Verify the script is still valid bash**

Run:
```bash
bash -n tests/audit-marketplace.sh
echo "exit=$?"
```

Expected: exit=0 (syntax OK).

- [ ] **Step 4: Run the audit against real marketplace**

Run:
```bash
tests/audit-marketplace.sh
echo "exit=$?"
```

Expected: `audit-marketplace: OK ...` and `exit=0`. This validates that the post-refactor real marketplace.json (with phase-numbered paths) passes the new check (b) regex + check (d) phase-mode algorithm.

### Task 13: Create new audit fixtures for phase-mode

**Files:**
- Create: `tests/fixtures/marketplace-audit/marketplace-good-phase-numbered.json`
- Create: `tests/fixtures/marketplace-audit/marketplace-bad-phase-orphan.json`
- Create: `tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased/.gitkeep`
- Create: `tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan/.gitkeep`

- [ ] **Step 1: Create on-disk skeleton for the new phase fixture**

Run:
```bash
mkdir -p tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased
mkdir -p tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan
touch tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased/.gitkeep
touch tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan/.gitkeep
git add tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased/.gitkeep \
        tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan/.gitkeep
```

- [ ] **Step 2: Create marketplace-good-phase-numbered.json**

Write `tests/fixtures/marketplace-audit/marketplace-good-phase-numbered.json`:
```json
{
  "name": "audit-fixture",
  "owner": { "name": "BAM Test Harness" },
  "description": "GOOD — exercises check (b) regex with phase-numbered path AND check (d) phase-mode scan (only skill-phased listed; skill-phased-orphan is .no-marketplace-suppressed).",
  "plugins": [
    {
      "name": "bmad-bam-platform-faux",
      "source": "./",
      "description": "Phase-numbered layout fixture.",
      "version": "0.0.1",
      "author": { "name": "BAM Test Harness" },
      "skills": [
        "./tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased"
      ]
    }
  ]
}
```

- [ ] **Step 3: Suppress skill-phased-orphan via sentinel so good fixture passes**

Run:
```bash
touch tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan/.no-marketplace
git add tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased-orphan/.no-marketplace
```

- [ ] **Step 4: Create marketplace-bad-phase-orphan.json**

Write `tests/fixtures/marketplace-audit/marketplace-bad-phase-orphan.json`:
```json
{
  "name": "audit-fixture", "owner": { "name": "BAM Test Harness" },
  "description": "BAD — check (d) phase mode: skill-phased-orphan exists at 1-test-phase/ but not listed. (For this fixture, the .no-marketplace sentinel on skill-phased-orphan must be REMOVED — see fixture runner.)",
  "plugins": [{
    "name": "bmad-bam-platform-faux", "source": "./", "version": "0.0.1",
    "description": "Bad fixture (phase-mode orphan).",
    "author": { "name": "BAM Test Harness" },
    "skills": [
      "./tests/fixtures/marketplace-audit/fake-source/1-test-phase/skill-phased"
    ]
  }]
}
```

Note: the same on-disk skeleton is used by both fixtures. The good fixture passes via `.no-marketplace`; the bad fixture needs the sentinel temporarily removed during its run. The driver script handles this by removing the sentinel before invocation and restoring after.

- [ ] **Step 5: Verify the good fixture passes**

Run:
```bash
F="$(pwd)/tests/fixtures/marketplace-audit"
tests/audit-marketplace.sh "$F/marketplace-good-phase-numbered.json" \
  --v6-root "$F/fake-source" \
  --skill-root "$F/fake-source/1-test-phase"
echo "exit=$?"
```

Expected: `audit-marketplace: OK ...` exit=0.

(Note: the `--v6-root` for this fixture is the fake-source dir since it doesn't have a v6 module.yaml; this exercises the check (e) skip path.)

### Task 14: Update fixture-driver with new assert_cases

**Files:**
- `tests/audit-marketplace-fixtures.sh`
- `tests/fixtures/marketplace-audit/README.md`

- [ ] **Step 1: Add good-phase-numbered assertion**

Use Edit tool on `tests/audit-marketplace-fixtures.sh`:

Find:
```bash
assert_case "good-orphan-with-sentinel" pass "" \
    "$F/marketplace-bad-orphan-skill-with-sentinel.json" \
    "$F/fake-v6" \
    "$F/fake-source/skills"
```

Add AFTER it:
```bash

# Phase-mode fixtures (Concern 5)
assert_case "good-phase-numbered" pass "" \
    "$F/marketplace-good-phase-numbered.json" \
    "$F/fake-source" \
    "$F/fake-source/1-test-phase"
```

- [ ] **Step 2: Add bad-phase-orphan assertion with sentinel toggle**

Find the existing tail of assert_case block (after the (f) namespace assertion) and add:

```bash

# bad-phase-orphan needs the .no-marketplace sentinel removed for this run
# (the sentinel is restored after) — this exercises check (d) phase-mode orphan
SENTINEL_PATH="$F/fake-source/1-test-phase/skill-phased-orphan/.no-marketplace"
rm -f "$SENTINEL_PATH"
assert_case "bad-phase-orphan (check d phase)" fail "(check d, phase mode)" \
    "$F/marketplace-bad-phase-orphan.json" \
    "$F/fake-source" \
    "$F/fake-source/1-test-phase"
# Restore sentinel for other tests
touch "$SENTINEL_PATH"
```

- [ ] **Step 3: Update fixtures README.md**

Use Edit tool on `tests/fixtures/marketplace-audit/README.md`:

Find the Fixtures table; add rows:
```
| `marketplace-good-phase-numbered.json` | PASS | (b) phase regex + (d) phase-mode scan |
| `marketplace-bad-phase-orphan.json` | FAIL | (d) phase-mode orphan detection |
```

Find the "On-disk fixture tree" section; add:
```
- `fake-source/1-test-phase/skill-phased` — listed in good-phase-numbered fixture; tests phase-mode scan
- `fake-source/1-test-phase/skill-phased-orphan` — has `.no-marketplace` (good fixture); driver toggles sentinel for bad-phase-orphan fixture run
```

- [ ] **Step 4: Run fixture driver**

Run:
```bash
tests/audit-marketplace-fixtures.sh
echo "exit=$?"
```

Expected: 10/10 pass (8 existing + 2 new phase-mode fixtures), exit=0.

---

## Phase 8: Commit 1 — verify + commit

### Task 15: Run full Tier-1 sweep + commit

**Files:** none modified

- [ ] **Step 1: Run all Tier-1 tests**

Run:
```bash
echo "=== Tier-1 sweep ==="
tests/audit-marketplace.sh >/dev/null 2>&1 && echo "[PASS] audit" || echo "[FAIL] audit"
tests/audit-marketplace-fixtures.sh >/dev/null 2>&1 && echo "[PASS] fixtures (10/10)" || echo "[FAIL] fixtures"
tests/wave-0/run-smoke-test.sh >/dev/null 2>&1 && echo "[PASS] wave-0" || echo "[FAIL] wave-0"
tests/p2/run-real-install-test.sh >/dev/null 2>&1 && echo "[PASS] p2 real-install" || echo "[FAIL] p2 real-install"
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh >/dev/null 2>&1 && echo "[PASS] design-tenancy" || echo "[FAIL] design-tenancy"
tests/integration/run-real-install.sh >/dev/null 2>&1
echo "Tier-2 stub exit: $? (expect 77)"
```

Expected: all PASS, Tier-2 exit 77.

If any test fails, debug + fix per the test's output. Common issues:
- Path reference not updated (run the relevant P-pattern grep to find stragglers)
- Audit check (d) edge case (review the new algorithm)

- [ ] **Step 2: Final grep sweep — confirm no active P1/P2/P6 leakage**

Run:
```bash
echo "=== Active file P-pattern leakage check ==="
echo "P1 in active files (excl design-doc + CONCERN-5 + src-v2):"
grep -rln "_bmad/bam-platform" src-v6/ tests/ docs/v6-final-architecture.md _bmad/_memory/ .claude-plugin/ 2>&1 \
  | grep -v "/external/" \
  | grep -vE "/CONCERN-[0-9]+|/superpowers/specs/2026-05-13-concern-5|src-v2/" \
  | wc -l
echo "P2 in active files:"
grep -rln "bam-platform-project-context.md" src-v6/ tests/ docs/v6-final-architecture.md _bmad/_memory/ .claude-plugin/ 2>&1 \
  | grep -v "/external/" \
  | grep -vE "/CONCERN-[0-9]+|/superpowers/specs/2026-05-13-concern-5|src-v2/" \
  | wc -l
echo "P6 in active files:"
grep -rln "src-v6/bmad-bam-platform/skills/" src-v6/ tests/ .claude-plugin/ 2>&1 \
  | grep -v "/external/" \
  | grep -vE "/CONCERN-[0-9]+|/superpowers/specs/2026-05-13-concern-5" \
  | wc -l
```

Expected: docs files (spec, ADRs) may have non-zero — that's Commit 2's scope. Source + tests + marketplace.json should all be `0`.

If src-v6/, tests/, .claude-plugin/ have non-zero counts, find the stragglers:
```bash
grep -rln "_bmad/bam-platform\|bam-platform-project-context.md\|src-v6/bmad-bam-platform/skills/" \
  src-v6/ tests/ .claude-plugin/ 2>&1 | grep -v "/external/" | grep -v "/CONCERN-"
```

Update each + re-verify.

- [ ] **Step 3: Stage all changes**

Run:
```bash
git status --short | head -50
```

Verify the expected files are staged/modified.

- [ ] **Step 4: Commit 1**

Run:
```bash
git add -A   # include all new fixture files + .gitkeep + modifications
git commit -m "$(cat <<'EOF'
feat(p2-2): Concern 5 — phase-numbered layout + bbp short-code + subdir sentinel

Atomic refactor of bmad-bam-platform to BMM-canonical layout. Resolves
PluginResolver Strategy-5 fallback (see ADR 008 for the empirical chain;
docs/superpowers/specs/2026-05-13-concern-5-design.md for full design).

Three coupled changes:

1. Phase-numbered grouping (BMM-canonical):
   - skills/bmad-bam-agent-atlas       → 1-foundation/bmad-bam-agent-atlas
   - skills/bmad-bam-design-tenancy... → 2-modules/bmad-bam-design-tenancy-model
   - skills/bmad-bam-smoke-test        → 9-infrastructure/bmad-bam-smoke-test
   - skills/bmad-bam-finalize          → 9-infrastructure/bmad-bam-finalize
   - 3-integration/.gitkeep + 4-readiness/.gitkeep (future placeholders)
   - Common parent of skills = module dir = module.yaml location
   - PluginResolver Strategy 1 now succeeds (no more synthesized fallback)

2. Module code rename (BMAD-canonical 3-letter convention):
   - module.yaml `code: bam-platform` → `code: bbp`
   - module.yaml `team: bam-platform` → `team: bam` (BAM-family team)
   - Install path: _bmad/bam-platform/ → _bmad/bbp/
   - Reserves bbp/bbd/bba/bbr/bbi/bbt/bbo/bbu for future BAM modules

3. Sentinel relocation (universal-glob-canonical):
   - {output_folder}/bam-platform-project-context.md → {output_folder}/bbp/project-context.md
   - Subdir + plain "project-context.md" unambiguously matches **/project-context.md
   - No collision with BMM's {output_folder}/project-context.md
   - post-install.sh adds mkdir -p for subdir before write

Six rename patterns applied across active files:
   P1: _bmad/bam-platform/ → _bmad/bbp/
   P2: bam-platform-project-context.md → bbp/project-context.md
   P3: code: bam-platform → code: bbp
   P4: team: bam-platform → team: bam
   P5: module-help.csv content (output-location, outputs columns)
   P6: src-v6/.../skills/<skill>/ → src-v6/.../<phase>/<skill>/ (source-tree refs)

Audit updates:
   - check (b) regex extended for phase pattern [0-9]+-[a-z][a-z0-9-]*
     (BMM-canonical, supports multi-word phase names like 2-plan-workflows)
   - check (d) algorithm: phase-mode scan walks <module>/<N-phase>/<skill>/
     dirs; flat-mode preserved for legacy /skills/ paths; v3 /workflows/ paths
     remain silently-skipped (orphan check out of scope for v3)
   - 2 new fixtures: marketplace-good-phase-numbered + marketplace-bad-phase-orphan
   - 2 new driver assert_cases in audit-marketplace-fixtures.sh

NOT TOUCHED in this commit (per design Section 4):
   - src-v2/module.yaml (frozen v3, 9 team: bam-platform refs preserved)
   - tests/integration/CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md (discovery note)
   - docs/superpowers/specs/2026-05-13-concern-5-design.md (this spec)
   - Audit fixtures referring to plugin name 'bmad-bam-platform' (unchanged)

Tier-1 tests all green post-commit:
   - audit-marketplace.sh (real marketplace + phase paths)
   - audit-marketplace-fixtures.sh (10/10 — 8 existing + 2 new phase-mode)
   - wave-0/run-smoke-test.sh
   - p2/run-real-install-test.sh
   - design-tenancy-model/tests/smoke-test.sh
Tier-2 stub still SKIPs at exit 77 (PR #6 promotes to real script).

Commit 2 of 2 (docs: spec + ADRs + INDEX) follows.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Expected: commit success.

- [ ] **Step 5: Verify commit landed cleanly**

Run:
```bash
git log --oneline -3
git diff HEAD~1 --stat | tail -5
```

Expected: commit appears at HEAD; stat shows ~30+ files changed.

---

## Phase 9: Docs — spec + ADRs

### Task 16: Update active spec — §6.1, §7.1, §7.6, v0.9 changelog

**Files:** `docs/v6-final-architecture.md`

- [ ] **Step 1: Locate §6.1**

Run:
```bash
grep -n "^### 6.1 \|^## 6.1 " docs/v6-final-architecture.md
```

Note the line number (should be ~660).

- [ ] **Step 2: Rewrite §6.1 — phase-grouping convention**

Read the current §6.1 content. Update the directory-shape prescription to describe phase-numbered grouping:

```markdown
### 6.1 Per-module directory shape (BMM-canonical, post-Concern-5 / v0.9)

Per BMM-canonical (cf. `external/bmad-method/src/bmm-skills/`), each BAM module
places `module.yaml` + `module-help.csv` at the module-dir root and groups
skills under phase-numbered subdirs. BAM uses QG-aligned phase semantics:

```
src-v6/<bam-module>/
├── module.yaml
├── module-help.csv
├── 1-foundation/              # QG-F1 (Atlas, master-architecture)
├── 2-modules/                 # QG-M1/M2/M3 (Nova, tenant-isolation, agent-runtime)
├── 3-integration/             # QG-I1/I2/I3 (Kai, convergence)
├── 4-readiness/               # QG-P1 (production-readiness)
└── 9-infrastructure/          # bootstrap + operational (smoke-test, finalize); BAM-extension, BMM has no analog
```

Common parent of all listed skills = module dir = module.yaml location →
PluginResolver Strategy 1 (`external/bmad-method/tools/installer/modules/
plugin-resolver.js:72-99`) succeeds → real `module.yaml` is honored at
install time.

Phase-name regex (audit check (b)): `[0-9]+-[a-z][a-z0-9-]*` — supports
multi-word phase names like BMM's `2-plan-workflows`. The `9-` prefix on
`9-infrastructure/` is a deliberate BAM-extension (BMM has 1-4 only); it
groups bootstrap + operational skills that don't fit the QG-progression
phases. Sort order: 1, 2, 3, 4, 9 (infrastructure last).

See ADR 008 for the empirical grounding and the migration that landed
this convention.
```

Replace the existing §6.1 content (currently labeled "post-P2.1-Phase-C / v0.8") with the above.

- [ ] **Step 3: Update §7.1 — universal-glob subdir guidance**

Run:
```bash
grep -n "^### 7.1 \|^## 7.1 " docs/v6-final-architecture.md
```

Read current §7.1. Append (or modify the existing universal-glob discussion to mention):

```markdown
### 7.1 (post-Concern-5 addendum) — Subdir convention for module project-contexts

Universal-glob `**/project-context.md` strictly matches files literally named
`project-context.md`. BMM writes `{output_folder}/project-context.md` (top-level)
for user-generated context. BAM modules each write to their own short-code-named
subdir to avoid collision while still matching the glob by depth:

- BMM: `{output_folder}/project-context.md`
- bmad-bam-platform: `{output_folder}/bbp/project-context.md`
- (future) bmad-bam-data: `{output_folder}/bbd/project-context.md`
- (future) bmad-bam-ai: `{output_folder}/bba/project-context.md`
- ... (reserved short codes: bbp, bbd, bba, bbr, bbi, bbt, bbo, bbu)

Universal-glob loads ALL of these at activation; no module's context shadows
another. Per ADR 008.
```

- [ ] **Step 4: Update §7.6 — module activation in real installs**

Run:
```bash
grep -n "^### 7.6 \|^## 7.6 " docs/v6-final-architecture.md
```

Read current §7.6. Update the sentinel-location convention paragraph:

Find the current text describing the sentinel filename pattern (probably mentions `bam-<module>-project-context.md` or similar).

Replace with:
```markdown
**Sentinel-location convention (post-Concern-5 / v0.9):**

BAM v6 project-context files: `{output_folder}/<module-code>/project-context.md`
(e.g., `{output_folder}/bbp/project-context.md` for bmad-bam-platform). Each
BAM module's project-context lives in its own short-code-named subdir. Universal-glob
`**/project-context.md` matches all of them by depth, independently of BMM's
`{output_folder}/project-context.md`. No collision; each module's context loads
cleanly into core skills' `agent.persistent_facts`.

The post-install script (`<phase>/bmad-bam-finalize/scripts/post-install.sh`)
creates the subdir and writes the sentinel during the finalize step.
```

- [ ] **Step 5: Add v0.9 changelog entry**

Find the changelog table in `docs/v6-final-architecture.md` (likely near the bottom).

Add a new row above the v0.8 row:

```
| 0.9 | 2026-05-13 | **§6.1 phase-grouping refactor + §7.1 subdir-sentinel convention + §7.6 sentinel-location update (Concern 5).** BAM module layout migrated from `skills/` wrapper to BMM-canonical phase-numbered grouping (`1-foundation/`, `2-modules/`, `3-integration/`, `4-readiness/`, `9-infrastructure/`). Module code renamed `bam-platform` → `bbp` (BMAD 3-letter convention). Sentinel relocated to subdir form `{output_folder}/bbp/project-context.md`. PluginResolver Strategy 1 now succeeds; real `module.yaml` honored at install time. ADR 008 records the decision; depends on ADRs 005 + 006 + 007. Reserves bbp/bbd/bba/bbr/bbi/bbt/bbo/bbu short-code namespace for future BAM modules. |
```

- [ ] **Step 6: Update version banner at top of spec**

Run:
```bash
head -5 docs/v6-final-architecture.md
```

Find the version line (e.g., "Spec v0.8 ...") and update to `v0.9`.

### Task 17: Create ADR 008

**Files:** `_bmad/_memory/atlas/architecture-decisions/2026-05-13-008-module-shape-bmm-canonical.md`

- [ ] **Step 1: Read std-adr.md to confirm canonical structure**

Run:
```bash
sed -n '1,80p' src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/standards/std-adr.md
```

Confirm the 11-field frontmatter convention and required body sections (Context, Decision, Consequences, Alternatives Considered, Revisit Triggers).

- [ ] **Step 2: Write ADR 008**

Create `_bmad/_memory/atlas/architecture-decisions/2026-05-13-008-module-shape-bmm-canonical.md`:

```markdown
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

PR #2 + #3 review (PR #3 deep self-review) empirically established that BAM's
marketplace layout falls into PluginResolver **Strategy 5 (synthesized fallback)**
instead of Strategy 1. The 4 BAM skills under
`src-v6/bmad-bam-platform/skills/<skill>/` have a common-parent of
`<...>/skills/`, but `module.yaml` lives at
`<...>/bmad-bam-platform/module.yaml` — one level above. PluginResolver
Strategy 1 (`plugin-resolver.js:72-99`) requires `module.yaml` +
`module-help.csv` AT the common parent of all listed skills. The mismatch
forces Strategy 5, which:

- Synthesizes a stub `module.yaml` from `marketplace.json` plugin metadata
- Stores the stub ONLY in `CustomModuleManager._resolutionCache` (in-memory, per-process)
- NEVER writes `module.yaml` to `<bmadDir>/<code>/` (verified at `official-modules.js:145`: "Check resolution cache for strategy 5 modules (no module.yaml on disk)")
- Silently inerts BAM's real `module.yaml` content: `agents:` registration, `directories:` declarations, `x-bam-*` extensions, `post-install-notes`

Comparison with empirically-working reference modules:
- **BMM** (`external/bmad-method/src/bmm-skills/`) — phase-numbered grouping (`1-analysis/`, `2-plan-workflows/`, `3-solutioning/`, `4-implementation/`); module.yaml + module-help.csv AT module root; common parent of skills = `bmm-skills/` ✓ Strategy 1 succeeds.
- **bmad-tea** (`external/bmad-tea/`) — functional categories (`src/agents/`, `src/workflows/testarch/`); module.yaml at `src/module.yaml`; common parent of skills spanning two top-level dirs = `src/` ✓ Strategy 1 succeeds.

BAM was the outlier with a `skills/` wrapper collapsing common parent below the
module-yaml location. Additionally, BAM's module code `bam-platform` was an
outlier from BMAD's 3-letter convention (bmm, tea, bmb, cis, wds).

## Decision

Three coupled changes, landed in one atomic refactor:

1. **Phase-numbered grouping (BMM-canonical):** drop the `skills/` wrapper;
   group skills under phase dirs with BAM-domain semantics:
   - `1-foundation/` — QG-F1 (Atlas, master-architecture)
   - `2-modules/` — QG-M1/M2/M3 (Nova, tenant-isolation, agent-runtime)
   - `3-integration/` — QG-I1/I2/I3 (Kai, convergence)
   - `4-readiness/` — QG-P1 (production-readiness)
   - `9-infrastructure/` — bootstrap + operational (smoke-test, finalize); BAM-extension

2. **Module code rename:** `bam-platform` → `bbp`. Aligns with BMAD's
   3-letter convention. Reserves `bbp`/`bbd`/`bba`/`bbr`/`bbi`/`bbt`/`bbo`/`bbu`
   for the BAM module family. Install path: `_bmad/bam-platform/` → `_bmad/bbp/`.
   `team: bam-platform` → `team: bam` (BAM-family team, matches `_bmad/bam/`
   cross-module namespace).

3. **Sentinel relocation:** `{output_folder}/bam-platform-project-context.md`
   → `{output_folder}/bbp/project-context.md`. Subdir + plain
   `project-context.md` filename unambiguously matches the strict universal-glob
   contract from spec §6.1. No collision with BMM's
   `{output_folder}/project-context.md` (sibling). Future modules use the
   same pattern: `{output_folder}/bbd/project-context.md`, etc.

## Consequences

- PluginResolver Strategy 1 succeeds; real `module.yaml` honored at install
  time. `agents:`, `directories:`, `x-bam-*`, `post-install-notes` no longer
  silently inert.
- ADR 007's revisit trigger #1 fires: Tier-2 PASS-mode is now tractable (PR #6
  follow-up promotes the stub).
- Breaking change for any user with a pre-existing `_bmad/bam-platform/` install.
  Migration recipe documented in PR description; users `rm -rf` the old install
  dir + re-install.
- Future BAM modules adopt the same phase-grouping + 3-letter-code pattern.
- Spec §6.1 + §7.1 + §7.6 + changelog v0.9 reflect the new convention.

## Alternatives Considered

- **BMM-strict (all phases 1-4 only, no 9-infrastructure):** rejected — smoke-test
  + finalize don't fit QG-progression phases; lumping them in 1-foundation would
  conflate user-facing foundation work with operational skills.
- **bmad-tea-style functional categories (`agents/` + `workflows/`):** considered;
  rejected in favor of phase-numbered. BMM's phase pattern was the user's stated
  preference for BMM compatibility.
- **Keep `skills/` wrapper + petition BMAD upstream for stricter PluginResolver:**
  rejected — long lead time; alignment with BMM works today.
- **Keep `code: bam-platform` (long-form code):** rejected — outlier from BMAD's
  3-letter convention; future BAM modules would be forced to invent their own
  long-form codes (cosmetic divergence accumulates).
- **Sentinel as prefixed filename (`{output_folder}/bbp-project-context.md`):**
  rejected — does NOT match strict universal-glob `**/project-context.md`; relies
  on glob being lenient (unverified). Subdir form is unambiguous either way.

## Revisit triggers

- ADR 007's revisit trigger #1 fires when this lands: PR #6 promotes Tier-2 stub
  to real script.
- If Plan C ratification (pre-merge gate per spec §9) FAILS, this ADR's design
  has a hole. Forward-fix: try alternate sentinel paths; this ADR amended or
  superseded.
- Concern 7 (`directories:` block dead-code fix) is sequenced after this ADR
  lands (PR #5).
- Future BAM modules' phase semantics may need additional `N-` slots beyond
  1-4 + 9. Add as encountered.
```

- [ ] **Step 3: Stage ADR 008**

Run:
```bash
git add _bmad/_memory/atlas/architecture-decisions/2026-05-13-008-module-shape-bmm-canonical.md
```

### Task 18: Update ADR 007 — title + body path-refs + trigger annotation

**Files:** `_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md`

- [ ] **Step 1: Update title**

Use Edit tool on the ADR:

Find:
```
title: Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BMAD has no local-install API)
```

Replace:
```
title: Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BAM falls into PluginResolver Strategy 5)
```

- [ ] **Step 2: Sweep body path refs (P1 + P2 + P6)**

Run:
```bash
grep -n "_bmad/bam-platform\|bam-platform-project-context\|src-v6/bmad-bam-platform/skills/" \
  _bmad/_memory/atlas/architecture-decisions/2026-05-13-007-real-installer-test-infrastructure.md
```

For each match, use Edit tool to update:
- `_bmad/bam-platform/` → `_bmad/bbp/`
- `bam-platform-project-context.md` → `bbp/project-context.md` (in path context) or `project-context.md` (filename-only)
- `src-v6/bmad-bam-platform/skills/<skill>/` → `src-v6/bmad-bam-platform/<phase>/<skill>/` (per Task 9 mapping)

- [ ] **Step 3: Add revisit-trigger-fired annotation**

Find the `## Revisit triggers` section. After the existing trigger #1 text, add:

```markdown

**⚡ Trigger #1 fired 2026-05-13:** Concern 5 landed (ADR 008). PR #6 should promote `tests/integration/run-real-install.sh` from SKIP stub to real `bmad install --custom-source` script.
```

- [ ] **Step 4: Update INDEX.md row for ADR 007 title**

Use Edit tool on `_bmad/_memory/atlas/architecture-decisions/INDEX.md`:

Find:
```
| 2026-05-13-007 | Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BMAD has no local-install API) | accepted | 2026-05-13 |
```

Replace:
```
| 2026-05-13-007 | Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BAM falls into PluginResolver Strategy 5) | accepted | 2026-05-13 |
```

### Task 19: Add ADR 006 refinement note

**Files:** `_bmad/_memory/atlas/architecture-decisions/2026-05-13-006-module-shape-bmm-aligned.md`

- [ ] **Step 1: Add body section**

Use Edit tool on `_bmad/_memory/atlas/architecture-decisions/2026-05-13-006-module-shape-bmm-aligned.md`:

Find the body (after frontmatter). After the existing `## Alternatives Considered` section (or as the last body section), add:

```markdown

## Refinement note (Concern 5, ADR 008, 2026-05-13)

ADR 008 refines this decision's directory layout. The core "Atlas-as-skill"
claim and "everything is a skill" stance from this ADR stand — Atlas remains
a real BMAD skill (invocable, marketplace-listed), and shared content lives
in its `resources/`. What changes is WHERE that skill lives in source:

- This ADR: `skills/bmad-bam-agent-atlas/`
- Refined (ADR 008): `1-foundation/bmad-bam-agent-atlas/` (phase-numbered, BMM-canonical)

The `skills/` wrapper is dropped in favor of phase-numbered grouping so
PluginResolver Strategy 1 succeeds (common parent of skills = module dir =
module.yaml location). Cross-skill content access by explicit path
(bmad-tea pattern, this ADR's §"Decision" item 2) is unchanged in semantic,
just with new path prefixes (`_bmad/bbp/...` instead of `_bmad/bam-platform/...`).

See ADR 008 for the empirical chain.
```

- [ ] **Step 2: Stage ADR 006**

Run:
```bash
git add _bmad/_memory/atlas/architecture-decisions/2026-05-13-006-module-shape-bmm-aligned.md
```

### Task 20: Annotate ADRs 002 + 005

**Files:**
- `_bmad/_memory/atlas/architecture-decisions/2026-05-12-002-activation-path-selected.md`
- `_bmad/_memory/atlas/architecture-decisions/2026-05-13-005-project-context-location-aligned-to-bmm.md`

- [ ] **Step 1: Add annotation to ADR 002 body top**

Use Edit tool on `_bmad/_memory/atlas/architecture-decisions/2026-05-12-002-activation-path-selected.md`:

Find the first line after the closing `---` of the frontmatter (likely a `## Context` header).

Insert BEFORE that line:
```markdown
> **Pre-Concern-5 note (added 2026-05-13):** Path references in this ADR (`_bmad/bam-platform/`, `bam-platform-project-context.md`) reflect module state at decision time. Post-Concern-5 the module code is `bbp` and the sentinel is at `{output_folder}/bbp/project-context.md`; see ADR 008.

```

- [ ] **Step 2: Add annotation to ADR 005 body top**

Same pattern for `_bmad/_memory/atlas/architecture-decisions/2026-05-13-005-project-context-location-aligned-to-bmm.md`.

### Task 21: Annotate historical docs

**Files (8 historical docs):**
- `docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md`
- `docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md`
- `docs/v6-rdp-kickoff.md`
- `docs/v6-rdp-concern-4-kickoff.md`
- `docs/v6-spec-patches/v0.6-section-7-6-path-b-default.md`
- `tests/p2/INVESTIGATION-NOTES.md`
- `tests/wave-0/INVESTIGATION-NOTES.md`
- `tests/wave-0/WAVE-0-OUTCOME.md`

- [ ] **Step 1: Add the standard annotation to each file's body top**

For each file in the list, use Edit tool to insert at the start of the body (after the title line / `# Header`):

```markdown

> **Pre-Concern-5 note (added 2026-05-13):** Path references in this document (`_bmad/bam-platform/`, `bam-platform-project-context.md`, `src-v6/.../skills/...`) reflect module state at the time of writing. Post-Concern-5 the module code is `bbp`, the sentinel lives at `{output_folder}/bbp/project-context.md`, and skills are organized by phase dir (`1-foundation/`, `2-modules/`, `9-infrastructure/`); see ADR 008.

```

- [ ] **Step 2: Verify all 8 files have the annotation**

Run:
```bash
for f in docs/superpowers/plans/2026-05-11-wave-0-smoke-test.md \
         docs/superpowers/plans/2026-05-12-p2-1-platform-mvp.md \
         docs/v6-rdp-kickoff.md \
         docs/v6-rdp-concern-4-kickoff.md \
         docs/v6-spec-patches/v0.6-section-7-6-path-b-default.md \
         tests/p2/INVESTIGATION-NOTES.md \
         tests/wave-0/INVESTIGATION-NOTES.md \
         tests/wave-0/WAVE-0-OUTCOME.md; do
    if grep -q "Pre-Concern-5 note" "$f"; then
        echo "OK   $f"
    else
        echo "FAIL $f"
    fi
done
```

Expected: all 8 OK.

### Task 22: Update INDEX.md with ADR 008 row

**Files:** `_bmad/_memory/atlas/architecture-decisions/INDEX.md`

- [ ] **Step 1: Add ADR 008 row**

Use Edit tool on `_bmad/_memory/atlas/architecture-decisions/INDEX.md`:

Find the last row in the table (ADR 007 row, already updated for title in Task 18).

Add a new row AFTER it:
```
| 2026-05-13-008 | Refactor BAM v6 platform-module layout to BMM-canonical (phased grouping + bbp short-code + subdir sentinel) | accepted | 2026-05-13 |
```

- [ ] **Step 2: Verify INDEX.md**

Run:
```bash
cat _bmad/_memory/atlas/architecture-decisions/INDEX.md
```

Expected: ADR 008 row present at bottom.

---

## Phase 10: Commit 2 — verify + commit + push

### Task 23: Run final Tier-1 sweep + commit docs

**Files:** none modified in this task

- [ ] **Step 1: Re-run all Tier-1 tests (sanity)**

Run:
```bash
tests/audit-marketplace.sh >/dev/null 2>&1 && echo "[PASS] audit" || echo "[FAIL] audit"
tests/audit-marketplace-fixtures.sh >/dev/null 2>&1 && echo "[PASS] fixtures" || echo "[FAIL] fixtures"
tests/wave-0/run-smoke-test.sh >/dev/null 2>&1 && echo "[PASS] wave-0" || echo "[FAIL] wave-0"
tests/p2/run-real-install-test.sh >/dev/null 2>&1 && echo "[PASS] p2 real-install" || echo "[FAIL] p2 real-install"
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh >/dev/null 2>&1 && echo "[PASS] design-tenancy" || echo "[FAIL] design-tenancy"
tests/integration/run-real-install.sh >/dev/null 2>&1
echo "Tier-2 exit: $? (expect 77)"
```

Expected: all green. (Docs don't affect tests, but sanity-check anyway.)

- [ ] **Step 2: Stage all docs changes**

Run:
```bash
git status --short | head -25
```

Verify the expected docs files are staged:
- `_bmad/_memory/atlas/architecture-decisions/2026-05-13-008-*.md` (new)
- `_bmad/_memory/atlas/architecture-decisions/2026-05-13-006-*.md` (modified)
- `_bmad/_memory/atlas/architecture-decisions/2026-05-13-007-*.md` (modified)
- `_bmad/_memory/atlas/architecture-decisions/2026-05-12-002-*.md` (modified)
- `_bmad/_memory/atlas/architecture-decisions/2026-05-13-005-*.md` (modified)
- `_bmad/_memory/atlas/architecture-decisions/INDEX.md` (modified)
- `docs/v6-final-architecture.md` (modified)
- 8 historical docs (modified)

- [ ] **Step 3: Commit 2**

Run:
```bash
git add -A
git commit -m "$(cat <<'EOF'
docs(p2-2): Concern 5 — spec §6.1/§7.1/§7.6 v0.9 + ADR 008 + annotations

Docs companion to Concern 5 implementation (prior commit). Per design
spec §7, §6 (docs/superpowers/specs/2026-05-13-concern-5-design.md).

Active spec updates (docs/v6-final-architecture.md):
  §6.1 — rewrite "Per-module directory shape" to BMM-canonical phase
    grouping (1-foundation/, 2-modules/, 3-integration/, 4-readiness/,
    9-infrastructure/) with BAM-domain QG semantics. Phase regex
    [0-9]+-[a-z][a-z0-9-]* documented (supports multi-word names like
    BMM's 2-plan-workflows). 9-infrastructure/ explicitly noted as
    deliberate BAM-extension.
  §7.1 — subdir convention for module project-contexts:
    {output_folder}/<short-code>/project-context.md (bbp, bbd, bba,
    bbr, bbi, bbt, bbo, bbu reserved). Universal-glob matches by depth.
  §7.6 — sentinel-location convention updated to subdir form.
  Changelog v0.9 entry added; version banner bumped v0.8 → v0.9.

ADR 008 (new): documents Concern 5 decisions with empirical chain
  (PluginResolver Strategy 5 vs Strategy 1 analysis cited inline).
  Frontmatter records 9-infrastructure as BMM-extension, not violation.
  Depends on ADRs 001, 005, 006, 007.

ADR 007: title fix + body sweep + trigger annotation:
  - Title was empirically wrong post-b2c779d ("BMAD has no local-install API")
    → corrected to "(BAM falls into PluginResolver Strategy 5)"
  - Body path-refs swept (P1, P2, P6 patterns)
  - Revisit trigger #1 marked FIRED 2026-05-13 with PR #6 follow-up note

ADR 006: body-only ## Refinement note section pointing to ADR 008.
  Atlas-as-skill core claim stands; layout refined to phase-grouped.

ADRs 002 + 005: one-line annotation at body top noting path references
  reflect pre-Concern-5 state.

INDEX.md: ADR 008 row added; ADR 007 title corrected.

Historical docs (8 files): one-line annotation at body top covering
  P1/P2/P6 pattern context; body content unchanged. Files: P2.1 plan,
  Wave 0 plan, RDP kickoffs (×2), v0.6 spec patch, INVESTIGATION-NOTES
  (×2), WAVE-0-OUTCOME.

Tier-1 tests remain green; Tier-2 stub still SKIPs (exit 77).

Pre-merge gate: Plan C manual ratification per spec §9 — see PR
description checklist.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Expected: commit success.

- [ ] **Step 4: Verify both commits landed**

Run:
```bash
git log --oneline -3
```

Expected: 2 new commits (Commit 1 = code/config/test, Commit 2 = docs) ahead of the prior HEAD.

### Task 24: Push branch

**Files:** none modified

- [ ] **Step 1: Push to origin**

Run:
```bash
git push origin feat/v6-p2-2-task-0-concern-4
```

Expected: push success, both new commits land on remote.

- [ ] **Step 2: Confirm remote state**

Run:
```bash
git log --oneline origin/feat/v6-p2-2-task-0-concern-4 -5
```

Expected: HEAD on remote matches local HEAD.

---

## Phase 11: PR + Plan C ratification (pre-merge gate)

### Task 25: Create / update PR with pre-merge checklist

**Files:** GitHub PR description (no local file)

- [ ] **Step 1: Determine PR target branch**

Per the project's PR conventions (existing PR #3 is on `feat/v6-p2-2-task-0-concern-4`), Concern 5 might extend PR #3 OR be a separate PR. Confirm with user before proceeding.

Two options:
- **Option A: extend PR #3** — Concern 5 commits land into the existing PR; PR description amended with the pre-merge checklist.
- **Option B: separate PR #4** — Open a new PR from `feat/v6-p2-2-task-0-concern-4` against `main` (or whatever's the merge target).

ASK USER which option.

- [ ] **Step 2: Update PR description with the pre-merge checklist**

Whichever PR holds these commits, its description must include:

```markdown
## Concern 5 — pre-merge checklist

- [ ] Tier-1 audit + fixtures green (10/10 fixtures, including 2 new phase-mode)
- [ ] Wave 0 + P2 smoke tests green
- [ ] design-tenancy-model skill smoke green
- [ ] **Plan C manual ratification PASS** — outcome recorded in `tests/p2/PLAN-C-RATIFICATION.md`:
  - BMAD version: ___
  - Sentinel token observed: BAM_LOAD_VERIFY_____
  - Result: PASS / FAIL

## User migration recipe (for any reviewer testing locally)

If you have a pre-existing BAM v6 install:

```bash
# 1. Remove old installed module
rm -rf _bmad/bam-platform/

# 2. Remove orphan sentinel file
OUTPUT_FOLDER="$(python3 -c "
import tomllib
c = tomllib.load(open('_bmad/config.toml', 'rb'))
v = c.get('bmad', {}).get('output_folder', '_bmad-output')
print(v.replace('{project-root}/', '').lstrip('/') or '_bmad-output')
")"
rm -f "$OUTPUT_FOLDER/bam-platform-project-context.md"

# 3. Re-install
bmad install bmad-bam-platform
# OR local-source: bmad install --custom-source $(git rev-parse --show-toplevel) --modules bbp --tools claude-code --yes

# 4. Re-run finalize
bmad run bmad-bam-finalize
```

## Reviewability — diff in 4 groups

1. **Structural moves** (`git diff --stat` shows rename rows)
2. **Metadata** — module.yaml, marketplace.json, module-help.csv
3. **Audit changes** — tests/audit-marketplace.sh + new fixtures
4. **Bulk sweeps** — P1/P2/P6 string replacements across source + tests
```

### Task 26: Plan C manual ratification (pre-merge gate)

**Files:** `tests/p2/PLAN-C-RATIFICATION.md` (updated with outcome)

This task is MANUAL — requires `bmad` CLI on PATH + a live Claude Code session.

- [ ] **Step 1: Capture REPO_ROOT + create test project tmpdir**

Run:
```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"   # capture BEFORE any cd
WORK_DIR=$(mktemp -d)
echo "REPO_ROOT=$REPO_ROOT"
echo "WORK_DIR=$WORK_DIR"
```

- [ ] **Step 2: Install BAM into the test project from local checkout**

Run:
```bash
bmad install \
  --custom-source "$REPO_ROOT" \
  --modules bbp \
  --directory "$WORK_DIR" \
  --tools claude-code \
  --yes
```

**Note:** `--modules bbp` (the new short code), not `bmad-bam-platform` (the plugin name).

Expected: install succeeds; no errors about missing skills or path traversal.

- [ ] **Step 3: Verify Strategy 1 succeeded**

Run:
```bash
ls "$WORK_DIR/_bmad/bbp/"
```

Expected:
```
bmad-bam-agent-atlas/
bmad-bam-design-tenancy-model/
bmad-bam-finalize/
bmad-bam-smoke-test/
module-help.csv
```

(No `module.yaml` on disk — that's normal; even for Strategy 1, BMAD reads module.yaml from source via the resolution cache, doesn't copy it. See ADR 008.)

- [ ] **Step 4: Run finalize (Path B activation)**

Run:
```bash
cd "$WORK_DIR"
bmad run bmad-bam-finalize
```

Expected: finalize emits sentinel; success message.

- [ ] **Step 5: Verify sentinel landed at the new subdir location**

Run:
```bash
ls "$WORK_DIR/_bmad-output/bbp/project-context.md"
grep -oE 'BAM_LOAD_VERIFY_[a-f0-9]{32}' "$WORK_DIR/_bmad-output/bbp/project-context.md"
```

Expected: file exists, contains a 32-hex `BAM_LOAD_VERIFY_<token>` value. Note the token for Step 7.

- [ ] **Step 6: LLM-side ratification — open Claude Code session**

Open Claude Code in `$WORK_DIR` (e.g., `claude` from that directory, OR open the directory in your IDE with Claude Code).

In the session:
1. Invoke a BMAD core skill that has the universal-glob in its `agent.persistent_facts`. Common ones: `bmad create-architecture`, `bmad create-prd`, `bmad-create-master-architecture`.
2. After the skill activates, ask the agent:

   > "What BAM_LOAD_VERIFY token do you see in your loaded project context?"

3. The agent should respond with the exact token observed in Step 5.

- [ ] **Step 7: Record outcome in PLAN-C-RATIFICATION.md**

Use Edit tool on `tests/p2/PLAN-C-RATIFICATION.md`. Add a new entry at the top of the ratification log:

```markdown
## 2026-05-13 — Concern 5 ratification (PR #4)

- BMAD version: `<output of bmad --version>`
- BAM commit: `<output of git rev-parse HEAD>`
- Test project: `<WORK_DIR>` (ephemeral, mktemp)
- Install method: `bmad install --custom-source $REPO_ROOT --modules bbp --directory $WORK_DIR --tools claude-code --yes`
- Strategy 1 succeeded: YES (4 skill dirs + module-help.csv present in _bmad/bbp/)
- Sentinel location: `$WORK_DIR/_bmad-output/bbp/project-context.md`
- Sentinel token observed: `BAM_LOAD_VERIFY_<observed-32-hex>`
- LLM activation skill used: `<e.g., bmad-create-architecture>`
- LLM recited token: YES / NO
- **Result: PASS / FAIL**
- Notes: <anything observed; e.g., warnings, anomalies>
```

Commit the ratification record:
```bash
git add tests/p2/PLAN-C-RATIFICATION.md
git commit -m "test(p2-2): record Plan C ratification for Concern 5

BMAD version: <version>
Result: <PASS|FAIL>
See PLAN-C-RATIFICATION.md entry dated 2026-05-13."
git push
```

- [ ] **Step 8: Clean up test project**

Run:
```bash
rm -rf "$WORK_DIR"
```

- [ ] **Step 9: Update PR description**

Mark the Plan C checklist item complete (or leave FAIL note). Notify user: ready for merge approval (if PASS) or held for forward-fix (if FAIL).

If FAIL: STOP. Do not merge. Forward-fix per spec §10 "Risk register" R1 mitigation:
- Try alternate sentinel paths
- Amend ADR 008
- Open follow-up commit on the same branch with the fix
- Re-run Plan C until PASS

---

## Self-review checklist (run before claiming plan complete)

- [ ] All 12 sections of spec covered in tasks? Map: §2.1→Task 2, §2.2→Tasks 3+5+6, §2.3→Task 6, §4→Tasks 7-10, §5→Tasks 11-14, §6→Tasks 17-22, §7→Task 16, §8→Tasks 15+23, §9→Task 26, §10→Task 25 (PR desc) + Task 26 (gate), §10.1→Task 25 (migration in PR desc), §11→effort tracked, §12→Task 25 (sequencing in PR desc + spec self-explains)
- [ ] No placeholders (TODO/TBD/FIXME)? Self-check: no occurrences.
- [ ] Type consistency? Function names referenced (`resolve_output_folder`, `mktemp -d`, etc.) match spec + existing code.
- [ ] Every step has exact code/commands? Check: all steps show specific bash commands, file paths, replacement text.
- [ ] Verification commands have expected output? Check: each verification step states "Expected: ..." with concrete content.
- [ ] Subagent could execute each task with no external context? Each task lists files + steps + commands. Cross-task dependencies (e.g., Task 2's moves before Task 7's edits) are sequential by phase ordering.
