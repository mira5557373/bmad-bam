# Concern 5 — BMM-canonical module layout for bmad-bam-platform

**Status:** approved (design), pending implementation
**Date:** 2026-05-13
**Author:** collaborative (atlas + claude-opus-4-7)
**RDP review v1:** 2026-05-13 — incorporated G1 (file counts), G2 (`--modules bbp`), G3 (9-infrastructure semantics), M1 (edge cases), M2 (module-help.csv), M4 (P4 in Commit 1), R1 (PR checklist), R2 (migration cleanup), R3 (diff structure), R4 (Concern 7 parallelism), R5 (ADR 007 prior amendment)
**RDP review v2:** 2026-05-13 — incorporated G4 (P6 source-tree pattern), G5 (ADR 007 title still empirically wrong), M5 (count drift footnote), M6 (math wording), M7 (Plan C REPO_ROOT capture), M8 (ADR 008 records 9-infrastructure as BAM-extension)
**Related ADRs:** 001 (Wave-0 plan A), 005 (project-context location), 006 (Atlas-as-skill), 007 (3-tier test strategy — amended in commit b2c779d)
**Successor ADR:** 008 (to be authored during implementation)

---

## 1. Why

PR #2 + #3 review (PR #3 deep self-review) surfaced an empirical gap: **BAM's marketplace layout falls into PluginResolver Strategy 5 (synthesized fallback) instead of Strategy 1**. The 4 BAM skills under `src-v6/bmad-bam-platform/skills/<skill>/` have a common-parent of `<...>/skills/`, but `module.yaml` lives at `<...>/bmad-bam-platform/module.yaml` — one level above. PluginResolver Strategy 1 (`external/bmad-method/tools/installer/modules/plugin-resolver.js:72-99`) requires `module.yaml` + `module-help.csv` AT the common parent. The mismatch forces Strategy 5, which:

- Synthesizes a stub `module.yaml` from `marketplace.json` plugin metadata
- Stores the stub ONLY in `CustomModuleManager._resolutionCache` (in-memory, per-process)
- NEVER writes `module.yaml` to `<bmadDir>/<code>/` (verified at `official-modules.js:145` — *"Check resolution cache for strategy 5 modules (no module.yaml on disk)"*)
- Silently inerts BAM's real `module.yaml` content: `agents:` registration, `directories:` declarations, `x-bam-*` extensions, `post-install-notes`

Three concrete consequences:

1. **The "real install" is a degraded install.** A user running `bmad install bmad-bam-platform` from this branch's marketplace.json gets ONLY skill copy + synthesized module-help.csv — no agent registration, no directory creation.
2. **A latent path-prefix bug**: marketplace.json plugin name is `bmad-bam-platform`; `module.yaml` code is `bam-platform`. Strategy 5 uses the plugin name, so install lands at `_bmad/bmad-bam-platform/` — but every step file in the codebase references `_bmad/bam-platform/`. The cp-based test simulators hide this because they manually copy to `_bmad/bam-platform/`.
3. **Tier-2 PASS-mode is blocked** (per ADR 007 revisit trigger #1) because Strategy-5 degraded install means automated end-to-end testing only validates partial behavior.

Compare with empirically-working reference modules:
- **BMM** (`external/bmad-method/src/bmm-skills/`) — phase-numbered grouping (`1-analysis/`, `2-plan-workflows/`, `3-solutioning/`, `4-implementation/`); module.yaml + module-help.csv AT module root; common parent of skills = `bmm-skills/` ✓ Strategy 1 succeeds.
- **bmad-tea** (`external/bmad-tea/`) — functional categories (`src/agents/`, `src/workflows/testarch/`); module.yaml at `src/module.yaml`; common parent of skills spanning two top-level dirs = `src/` ✓ Strategy 1 succeeds.

BAM is the outlier with a `skills/` wrapper collapsing common parent below the module-yaml location.

## 2. Decision — three locked elements

### 2.1 Phase-numbered grouping (BMM-canonical)

Drop the `skills/` wrapper. Replace with BMM-style phase dirs at module root:

```
src-v6/bmad-bam-platform/
├── module.yaml                            (BMM-canonical position)
├── module-help.csv
├── 1-foundation/
│   └── bmad-bam-agent-atlas/
├── 2-modules/
│   └── bmad-bam-design-tenancy-model/
├── 3-integration/                         (.gitkeep — future Kai persona + workflows)
├── 4-readiness/                           (.gitkeep — future production-readiness)
└── 9-infrastructure/
    ├── bmad-bam-smoke-test/
    └── bmad-bam-finalize/
```

Phase semantics map to BAM's existing quality-gate (QG) model:
- **1-foundation** — QG-F1 (Atlas, future master-architecture)
- **2-modules** — QG-M1/M2/M3 (tenant-isolation, agent-runtime, future Nova)
- **3-integration** — QG-I1/I2/I3 (convergence, future Kai)
- **4-readiness** — QG-P1 (production-readiness)
- **9-infrastructure** — bootstrap + operational skills not phase-bound. `bmad-bam-finalize` IS user-facing (invoked by the user post-install via `post-install-notes`) but doesn't fit the QG-progression phases — it's the activation bootstrap. `bmad-bam-smoke-test` is installation-verification, also not phase-bound. The `9-` numeric prefix gives sort-order at the end without implying these are "final phase" workflows. (Compare: BMM has no analog because BMM is monolithic; BAM's multi-module structure motivates this category.)

Common parent of all listed skills spans 4 different phase dirs → collapses to `src-v6/bmad-bam-platform/` → matches module.yaml location → **Strategy 1 succeeds**.

### 2.2 Module code: `bam-platform` → `bbp` (BMAD-canonical short code)

Empirical BMAD convention from every community module:

| Module | Plugin name (marketplace.json) | Module code (module.yaml) |
|---|---|---|
| BMM | — (built-in) | `bmm` |
| bmad-tea | bmad-method-test-architecture-enterprise | `tea` |
| bmad-builder | bmad-builder | `bmb` |
| bmad-cis | bmad-creative-intelligence-suite | `cis` |
| bmad-wds | bmad-wds | `wds` |
| **BAM (after)** | bmad-bam-platform | **`bbp`** |

Plugin name (long form) stays. Short code follows BMAD's 3-letter convention.

Reserved short codes for the BAM-family namespace: `bbp` (platform), `bbd` (data), `bba` (ai), `bbr` (rag), `bbi` (integration), `bbt` (trust), `bbo` (ops), `bbu` (ux).

### 2.3 Subdir-based sentinel (universal-glob-canonical)

Sentinel filename changes from prefixed-flat to subdir-plain:

- **Before:** `{output_folder}/bam-platform-project-context.md`
- **After:** `{output_folder}/bbp/project-context.md`

Rationale: spec §6.1 documents the universal-glob `**/project-context.md` as a STRICT match (only files literally named `project-context.md`). The subdir form unambiguously satisfies that contract regardless of any glob-laxness uncertainty. BMM's `{output_folder}/project-context.md` is sibling, no collision. Future BAM modules slot in: `{output_folder}/bbd/project-context.md`, `{output_folder}/bba/project-context.md`, etc.

## 3. What stays unchanged

| Element | Stance |
|---|---|
| marketplace.json plugin name `bmad-bam-platform` | Unchanged (long-form marketplace identifier) |
| Source directory name `src-v6/bmad-bam-platform/` | Unchanged (source convention, distinct from install path) |
| Skill leaf names (`bmad-bam-agent-atlas`, `bmad-bam-smoke-test`, etc.) | Unchanged (BMM-style skill names) |
| Atlas's customize.toml `{skill-root}/resources/*` references | Placeholder-resolved at install time, unchanged |
| `_bmad/bam/install-logs/` BAM-family namespace | Unchanged (cross-module shared state, not module-specific) |
| ADR 006's "everything is a skill" stance | Refined (WHERE skills live), not superseded (WHAT skills are) |

## 4. Migration scope — six rename patterns (P1-P6)

Pattern hit counts (empirically verified across the repo, excluding `external/`; counts as of commit 73e3391 — self-additions inside this design doc may drift totals by 1-2 occurrences in P2/P4; non-material):

| Pattern | Before | After | Total files | Total occurrences |
|---|---|---|---|---|
| **P1** | `_bmad/bam-platform/` | `_bmad/bbp/` | 12 | 33 |
| **P2** | `bam-platform-project-context.md` | `bbp/project-context.md` (path context) or `project-context.md` (filename-only context) | 26 | 61 |
| **P3** | `code: bam-platform` | `code: bbp` | 4 | 5 |
| **P4** | `team: bam-platform` | `team: bam` | 5 | 14 |
| **P5** | `module-help.csv` content (output-location / outputs columns) | New paths per P2 | 1 (within above) | — |
| **P6** | `src-v6/bmad-bam-platform/skills/<skill>` (source-tree references; phase-grouping refactor invalidates) | `src-v6/bmad-bam-platform/<phase>/<skill>` (per phase assignment in §2.1: Atlas→1-foundation, design-tenancy-model→2-modules, smoke-test/finalize→9-infrastructure) | 14 active (of 23 matches) | ~70 occurrences in active files |

### Categorized treatment (unique files = ~40 across all 6 patterns)

| Category | Count | Treatment |
|---|---|---|
| **Active operational** (`src-v6/bmad-bam-platform/`) | ~20 | Full P1-P6 sweep; module-help.csv columns updated per P2; source-tree refs in Atlas fragments + finalize scripts updated per P6 |
| **Active spec** (`docs/v6-final-architecture.md`) | 1 | §6.1/§7.6/§7.1 prose update + v0.9 changelog entry (not a P1-P6 sweep — semantic rewrite) |
| **Active tests** (`tests/integration/MANUAL.md`, `tests/p2/lib/probe-llm-context.sh`, `tests/p2/run-real-install-test.sh`, `tests/wave-0/run-smoke-test.sh`, `tests/wave-0/lib/sentinel.sh`, `tests/README.md`, `tests/integration/run-real-install.sh`, `src-v6/.../design-tenancy-model/tests/smoke-test.sh`) | ~8 | Full P1-P6 sweep |
| **`.claude-plugin/marketplace.json`** | 1 | Phase-prefixed skill paths (P6) + version 0.3.0→0.4.0 |
| **Historical / annotation-only** (ADRs 002, 005, 006; P2.1 plan; Wave 0 plan; RDP kickoffs; v0.6 superseded patch; INVESTIGATION-NOTES; WAVE-0-OUTCOME) | ~9 | One-line annotation at body top: *"Pre-Concern-5 path references reflect module state at decision time. Post-Concern-5 the module code is `bbp` and the sentinel is at `{output_folder}/bbp/project-context.md`; see ADR 008."* Body untouched. |
| **ADR 007** (special case) | 1 | Title update + body path-refs sweep + trigger-fire annotation — see §6 |
| **v3 frozen** (`src-v2/module.yaml`) | 1 | NOT TOUCHED. v3 is legacy/deprecated; its `team: bam-platform` reference (9 occurrences) stays. |
| **Concern 5 self-references** (this design doc, `tests/integration/CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md`) | 2 | NOT TOUCHED. These DESCRIBE the migration; intentionally retain the OLD strings as referents. |
| **Audit fixtures** (`tests/fixtures/marketplace-audit/*.json`) | 0 | Unchanged. They reference plugin name `bmad-bam-platform` (long form), which isn't changing. |

**Effective scope: ~28 active files get content updates (~20 source + ~8 tests) + 1 spec prose-rewrite + 1 marketplace.json + 1 ADR 007 (special) + 9 historical annotations = ~40 files in total review surface.**

## 5. Audit + test updates

### check (b) regex update

```bash
# BEFORE
elif [[ ! "$skill" =~ /(skills|workflows)/ ]]; then

# AFTER (permissive — supports multi-word phase names like BMM's 2-plan-workflows)
elif [[ ! "$skill" =~ /([0-9]+-[a-z][a-z0-9-]*|skills|workflows)/ ]]; then
```

### check (d) algorithm rewrite — phase-mode scan

```
For each listed skill path:
  If path matches /[0-9]+-[a-z][a-z0-9-]*/:
    scan_root = grandparent of skill (the module dir)
    mode = phase
  Elif path contains /skills/:
    scan_root = ${path%/skills/*}/skills
    mode = flat
  Else (v3 /workflows/ paths):
    continue (preserve current silent-skip behavior — v3 orphan check is a separate concern)

For each (scan_root, mode):
  If mode == phase:
    For each phase-numbered subdir under scan_root:
      For each direct child of that phase dir:
        check listed / .no-marketplace
  Else (flat):
    For each direct child of scan_root:
      check listed / .no-marketplace
```

### check (a), (c), (e), (f) — unchanged

- (a) path-exists: layout-agnostic
- (c) plugin has version: plugin metadata
- (e) module.yaml-containment: works regardless of phase grouping
- (f) namespace check: `KNOWN_NS_LIST` auto-populates from `module.yaml` `code:`; `bbp` enters automatically

### New audit fixtures

- `marketplace-good-phase-numbered.json` + on-disk `fake-source/1-test-phase/skill-phased/.gitkeep` — exercises check (b) regex + check (d) phase-mode scan happy path
- `marketplace-bad-phase-orphan.json` + on-disk `fake-source/1-test-phase/skill-phased-orphan/.gitkeep` — exercises check (d) orphan detection in phase mode
- 2 new `assert_case` invocations in `tests/audit-marketplace-fixtures.sh`

### Phase-mode edge cases — explicitly out of scope for v6.0

Edge cases the audit's phase-mode scan handles implicitly but doesn't have dedicated fixtures for; surface as new fixtures only if regressions appear:

- **Empty phase dir** (e.g., `3-integration/.gitkeep` only). `find -mindepth 1 -maxdepth 1 -type d` returns nothing; algorithm gracefully no-ops. ✓ correct by construction.
- **`.no-marketplace` at phase-dir level vs skill-level**. Spec is silent; design intent: phase-dir-level sentinel means "skip entire phase from orphan check". Implementation should preserve this semantic if the case appears.
- **Mixed phase + flat layouts in same module**. Each listed skill independently triggers its mode; possible to have two scan_roots for the same module dir. Algorithm dedupes by scan_root path.
- **Module-root skill outside any phase** (e.g., a stray `bmad-bam-something/` directly under module dir, with no phase prefix). Would be flagged as orphan by check (d). Intentional: phase-mode discipline requires skills live inside a phase dir.

### Smoke tests + runners

P1/P2 sweeps in:
- `tests/wave-0/run-smoke-test.sh`
- `tests/p2/run-real-install-test.sh`
- `tests/p2/lib/probe-llm-context.sh`
- `tests/p2/fixtures/real-bmad-project/_bmad/config.toml`
- `tests/wave-0/lib/sentinel.sh`
- `tests/wave-0/fixtures/README.md`
- `tests/wave-0/INVESTIGATION-NOTES.md` (active reference notes)
- `tests/wave-0/WAVE-0-OUTCOME.md` (active outcome doc)

## 6. ADR strategy

### ADR 008 (new)

`_bmad/_memory/atlas/architecture-decisions/2026-05-13-008-module-shape-bmm-canonical.md`

Canonical 11-field frontmatter:

```yaml
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
  - Universal-glob '**/project-context.md' strictly matches the literal filename (per spec §6.1)
  - bbp/bbd/bba/bbr/bbi/bbt/bbo/bbu short codes are not used by other BMAD modules
  - 9-infrastructure/ is a deliberate BAM-extension of the BMM pattern (BMM has no analog since BMM is monolithic). BAM's multi-module structure motivates the category for bootstrap + operational skills (smoke-test, finalize) that don't fit the QG-progression phases (1-4). The 9- prefix sorts last. This is BMM-extension, not BMM-violation.
dependencies-on-other-decisions:
  - 2026-05-11-001
  - 2026-05-13-005
  - 2026-05-13-006
  - 2026-05-13-007
generated-by: claude-opus-4-7
authored-by: collaborative
```

Body sections: Context, Decision, Consequences, Alternatives Considered, Revisit Triggers.

### Other ADRs

- **ADR 006** — body-only `## Refinement note` pointing forward to ADR 008. Core "Atlas-as-skill" claim stands; layout refined. No frontmatter change.
- **ADR 007** — three updates in the Concern 5 PR (since this PR is already touching it):
  1. **Title correction**: current title says *"Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BMAD has no local-install API)"*. The parenthetical is empirically wrong post-commit b2c779d (which amended the body to acknowledge `--custom-source` exists). Update to: *"Adopt 3-tier test strategy with Tier-2 PASS-mode deferred (BAM falls into Strategy 5)"*.
  2. **Body path-refs sweep** (P1+P2+P6 patterns): ADR 007 cites paths like `src-v6/bmad-bam-platform/skills/bmad-bam-finalize/scripts/post-install.sh` and `_bmad/bam-platform/`. Post-refactor these become `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/scripts/post-install.sh` and `_bmad/bbp/`. Update inline.
  3. **Trigger-fire annotation**: add body note *"Revisit trigger #1 fires when Concern 5 lands (ADR 008). Follow-up PR #6 promotes Tier-2 stub to real `bmad install --custom-source` script."*
- **ADRs 001-005** — one-line annotation at body top (see Section 4 historical treatment); body content unchanged.
- **INDEX.md** — add ADR 008 row.

## 7. Spec updates (`docs/v6-final-architecture.md`)

- **§6.1** — rewrite "Per-module directory shape" to describe BMM-canonical phase grouping with BAM-domain phase names
- **§7.6** — update sentinel-location convention to `{output_folder}/<module-code>/project-context.md`
- **§7.1** — augment universal-glob discussion with subdir-convention guidance
- **Changelog** — new v0.9 entry documenting Concern 5 + ADR 008
- **Spec version bump:** v0.8 → v0.9

## 8. Implementation sequencing — 2 atomic commits

| Commit | Files | Contents |
|---|---|---|
| **1: code/config/test atomic** | ~30 active files | Structural moves (`git mv` for 4 skill dirs); module.yaml — P3 (`code: bam-platform` → `code: bbp`), P4 (`team: bam-platform` → `team: bam`), P2 (sentinel filename refs in `x-bam-wave-0-artifacts`); marketplace.json (paths phase-prefixed + version 0.3.0→0.4.0); module-help.csv (P2 in `output-location` + `outputs` columns); P1+P2 sweeps in src-v6/ + active tests; post-install.sh sentinel-path update + `mkdir -p` for subdir; audit-marketplace.sh (check b regex + check d phase-mode algorithm); 2 new audit fixtures + on-disk skeletons + driver assert_cases; `.gitkeep` files in empty phase dirs (3-integration/, 4-readiness/) |
| **2: docs atomic** | ~12 | Spec §6.1/§7.6/§7.1 + v0.9 changelog; ADR 008 new file; ADR 006 body refinement note; ADR 007 body annotation; ADRs 001-005 one-line annotations; INDEX.md update |

Both commits leave Tier-1 green. Single PR.

### Reviewability — diff structure for Commit 1

The atomic Commit 1 diff is large (~30 files). Recommend PR description guides reviewers to look at the changes in 4 logical groups (in this order):

1. **Structural moves** (just file paths, easy to scan) — `git diff --stat` shows the moves
2. **Metadata** — `module.yaml`, `marketplace.json`, `module-help.csv` content updates
3. **Audit changes** — `tests/audit-marketplace.sh` (check (b) regex + check (d) phase-mode algorithm) + new fixtures
4. **Bulk sweeps** — P1/P2/P3/P4 string replacements; mechanical, low semantic content

This is a PR-description discipline, not a commit-split (per the user's no-backwards-compat / no-transitional-state stance).

## 9. Verification plan

**After Commit 1 (local):**
```bash
tests/audit-marketplace.sh                                                        # OK
tests/audit-marketplace-fixtures.sh                                               # 10/10 pass
tests/wave-0/run-smoke-test.sh                                                    # PASS (plan=A)
tests/p2/run-real-install-test.sh                                                 # PASS
src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model/tests/smoke-test.sh # PASS
tests/integration/run-real-install.sh                                             # exit 77 (still SKIP)
```

**After Commit 2:** same Tier-1 sweep still green (docs don't affect tests).

**Pre-merge gate — Plan C ratification (MANUAL, ~20 min):**

1. ```bash
   REPO_ROOT="$(git rev-parse --show-toplevel)"   # capture BEFORE any cd
   WORK_DIR=$(mktemp -d)
   bmad install --custom-source "$REPO_ROOT" --modules bbp --directory "$WORK_DIR" --tools claude-code --yes
   ```
   - **Note:** `--modules` takes module CODES (per `install.js:32` doc: example `"bmm,bmb"`). After the rename, the code is `bbp`. The plugin NAME `bmad-bam-platform` stays in marketplace.json (that's the long-form marketplace identifier).
   - **Defensive:** capturing `REPO_ROOT` before `WORK_DIR` and using the explicit variable avoids future maintenance hazards if someone reorders commands and `$(pwd)` shifts unexpectedly.
2. Verify Strategy 1 succeeded: `ls $WORK_DIR/_bmad/bbp/` should show 4 skill dirs + `module-help.csv`
3. `cd "$WORK_DIR" && bmad run bmad-bam-finalize`
4. Verify sentinel: `cat $WORK_DIR/_bmad-output/bbp/project-context.md | grep BAM_LOAD_VERIFY_`
5. Open Claude Code in `$WORK_DIR`; activate `bmad bmad-create-architecture` (or any core skill with universal-glob)
6. Ask Claude: *"What BAM_LOAD_VERIFY token do you see in your loaded context?"*
7. If Claude recites the token → Plan C **PASS** → merge approved
8. If Claude doesn't → Plan C **FAIL** → PR held; forward-fix (alternative sentinel path; amend ADR 008)

Record outcome in `tests/p2/PLAN-C-RATIFICATION.md` with date, BMAD version, observed token, and PASS/FAIL.

### Enforcing the Plan C pre-merge gate (R1 mitigation)

To prevent the gate from being skipped accidentally:

1. **PR description checklist** (mandatory) — the Concern 5 PR description includes:
   ```markdown
   - [ ] Tier-1 audit + fixtures green
   - [ ] Wave 0 + P2 smoke tests green
   - [ ] design-tenancy-model skill smoke green
   - [ ] Plan C manual ratification PASS — outcome recorded in tests/p2/PLAN-C-RATIFICATION.md
         - BMAD version: ___
         - Sentinel token observed: BAM_LOAD_VERIFY_____
         - Result: PASS / FAIL
   ```
2. **Plan C ratification file** has a `## Concern 5 ratification` section template that must be filled in before the PR can be marked ready-to-merge.
3. The user (you) verbally confirms Plan C ran with PASS before approving the merge — matches the "do not merge without my approval" stance.

## 10. Risk register

| Risk | Mitigation |
|---|---|
| Universal-glob doesn't load `{output_folder}/bbp/project-context.md` at LLM activation | Plan C ratification is **pre-merge gate**. Failure blocks merge. Forward-fix: try alternate sentinel paths; amend ADR 008. |
| Audit check (d) phase-mode has untested edge cases | 2 new fixtures cover good + orphan cases; real marketplace.json post-refactor exercises live behavior. Edge cases surface as fixture additions in future PRs. |
| Path-prefix change `_bmad/bam-platform/` → `_bmad/bbp/` breaks user's existing local install | Per user's "no backwards compat" stance, accepted. PR description includes full migration recipe (see below). |
| Stale sentinel file at `{output_folder}/bam-platform-project-context.md` orphaned post-rename | If universal-glob is strict (per spec §6.1), the stale file is silently ignored (filename mismatch). If glob is lenient, BOTH old + new sentinels load → potentially confusing context. Migration recipe includes `rm -f` of the stale file. |
| Cross-module install log at `_bmad/bam/install-logs/platform-install.log` has stale `_bmad/bam-platform/` references | Cosmetic only — log is append-only history. Acceptable as-is. |
| Concern 5 PR collides with another in-flight PR | Sequence Concern 5 BEFORE any new content PRs. After merge, content PRs rebase. |
| `team: bam` collides with another BMAD module's team | Verified — no other BMAD module uses `bam`. Low risk. |
| Commit 1 atomic refactor introduces a missed reference | Pre-commit verification: run P1/P2/P3/P4 greps post-edit, confirm 0 remaining matches in active files. |
| Future BAM module's phase name has 3+ hyphen-separated words (e.g., `2-plan-and-design`) | Permissive regex `[0-9]+-[a-z][a-z0-9-]*` already handles multi-hyphen. ✓ |

## 10.1 User migration recipe (for existing local installs)

Any user with a pre-existing BAM v6 install (post-PR-#2, pre-Concern-5) needs to migrate. Include this in the Concern 5 PR description verbatim:

```bash
# 1. Remove the old installed module (will be recreated under the new bbp/ path)
rm -rf _bmad/bam-platform/

# 2. Remove the orphan sentinel file (will be regenerated under bbp/ subdir)
# Resolve {output_folder} from your _bmad/config.toml; default is _bmad-output/
OUTPUT_FOLDER="$(python3 -c "
import tomllib
c = tomllib.load(open('_bmad/config.toml', 'rb'))
v = c.get('bmad', {}).get('output_folder', '_bmad-output')
print(v.replace('{project-root}/', '').lstrip('/') or '_bmad-output')
")"
rm -f "$OUTPUT_FOLDER/bam-platform-project-context.md"

# 3. Re-install (post-Concern-5 marketplace.json + module.yaml)
bmad install bmad-bam-platform  # registry-listed plugin name unchanged
#   OR for local-source verification:
bmad install --custom-source $(git rev-parse --show-toplevel) --modules bbp --tools claude-code --yes

# 4. Re-run finalize to write the new sentinel at the bbp/ subdir
bmad run bmad-bam-finalize
```

Pre-existing memory in `_bmad/_memory/atlas/architecture-decisions/`, design artifacts in `docs/architecture/`, and other user-generated content are preserved — they live OUTSIDE `_bmad/bam-platform/`.

## 11. Effort estimate

| Phase | Hours |
|---|---|
| Structural moves + module.yaml updates + marketplace.json | 0.5 |
| P1-P4 renames across active files | 2 |
| post-install.sh update + mkdir handling | 0.5 |
| audit-marketplace.sh check (b) + check (d) rewrite | 1 |
| New audit fixtures (good + orphan, phase-numbered) + driver assert_cases | 0.5 |
| Test file updates (smoke tests, fixtures) | 0.5 |
| Active spec updates (§6.1/§7.6/§7.1/changelog) | 0.5 |
| ADR 008 + ADR 006/007 annotations + ADRs 001-005 one-liners | 1 |
| Post-commit debug buffer | 1-2 |
| Plan C ratification (manual) | 0.5 |
| **Total** | **8-10h** |

## 12. Followup sequencing

| PR | Concern | Purpose | Depends on |
|---|---|---|---|
| **PR #4** (this design's implementation) | Concern 5 | Layout + `bbp` short-code + subdir sentinel + ADR 008 | PR #3 merged |
| **PR #5** | Concern 7 | `module.yaml` `directories:` block — convert to BMM-canonical `{name}` variable form | **Parallelizable with PR #4** — see note below |
| **PR #6** | ADR 007 trigger #1 | Promote `tests/integration/run-real-install.sh` from SKIP stub to real Tier-2 PASS-mode using `bmad install --custom-source` | PR #4 merged (Strategy 1 must succeed for Tier-2 to validate full install) |
| **PR #7+** | P2.2 content | New workflow skills (master-architecture, module-architecture, agent-runtime, etc.) land into the established `1-foundation/`, `2-modules/`, `3-integration/`, `4-readiness/` structure | PR #4 merged (need the phase layout in place) |

**Note on PR #5 parallelism:** Concern 7 is technically independent of Concern 5 — they touch the same `module.yaml` file (so a literal merge would conflict) but the changes are localized: Concern 5 touches `code:`, `team:`, and `x-bam-wave-0-artifacts:` fields; Concern 7 touches `directories:` and adds `module_config` entries. If solo development, sequencing PR #4 → PR #5 is the safer coordination choice (avoids merge conflicts). Parallel only if two people are coordinating live.

### ADR 007's status post-Concern-5

ADR 007 was substantively amended in commit `b2c779d` ("fix(p2-2): correct ADR 007 + Tier-2 docs with empirical reality") which corrected its empirically-wrong premise that "BMAD v6.6.0 has no local-install API". That amendment established that `--custom-source` exists; the actual deferral reason is BAM's Strategy-5 fallback (which Concern 5 fixes).

So when Concern 5 lands, the Concern-5-fixes-Strategy-5 narrative completes ADR 007's substantive revision arc. The Concern 5 implementation only adds a small annotation to ADR 007 saying revisit trigger #1 has fired — the deeper amendment is already in place. PR #6 then promotes the Tier-2 stub.
