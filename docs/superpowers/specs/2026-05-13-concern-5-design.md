# Concern 5 — BMM-canonical module layout for bmad-bam-platform

**Status:** approved (design), pending implementation
**Date:** 2026-05-13
**Author:** collaborative (atlas + claude-opus-4-7)
**Related ADRs:** 001 (Wave-0 plan A), 005 (project-context location), 006 (Atlas-as-skill), 007 (3-tier test strategy)
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
- **9-infrastructure** — operational skills not part of user-facing workflow (smoke-test, finalize)

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

## 4. Migration scope — four rename patterns

| Pattern | Before | After | Files | Occurrences |
|---|---|---|---|---|
| **P1** | `_bmad/bam-platform/` | `_bmad/bbp/` | 11 | 30 |
| **P2** | `bam-platform-project-context.md` | `bbp/project-context.md` (path context) or `project-context.md` (filename-only context) | 25 | 59 |
| **P3** | `code: bam-platform` | `code: bbp` | 3 | 4 |
| **P4** | `team: bam-platform` | `team: bam` | 1 | 1 |
| **Union** | — | — | **34 matches total → 32 require migration** (2 are this design doc + `tests/integration/CONCERN-5-PLUGIN-RESOLVER-STRATEGY-5.md` which intentionally reference the OLD strings to describe the migration; they don't get renamed) | **~94** |

### Active vs historical treatment

| Category | Files | Treatment |
|---|---|---|
| Active operational (`src-v6/`) | ~17 | Full rename |
| Active spec (`docs/v6-final-architecture.md`) | 1 | §6.1/§7.6/§7.1 prose update + v0.9 changelog |
| Tests (`tests/`) | ~13 | Full rename in active tests |
| Historical ADRs 001-005, P2.1 plan, Wave 0 plan, RDP kickoffs, v0.6 patch | ~10 | One-line annotation at top: *"Pre-Concern-5 path references reflect module state at decision time. Post-Concern-5 the module code is `bbp` and the sentinel is at `{output_folder}/bbp/project-context.md`; see ADR 008."* Body untouched. |
| Audit fixtures (`tests/fixtures/marketplace-audit/*.json`) | 6 | Unchanged (plugin name `bmad-bam-platform` doesn't change) |

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
- **ADR 007** — body annotation: *"Revisit trigger #1 fires when Concern 5 lands (ADR 008). Follow-up PR recommended to promote Tier-2 stub to real `bmad install --custom-source` script."*
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
| **1: code/config/test atomic** | ~50 | Structural moves (git mv); module.yaml (P3+P4+P2); marketplace.json (paths + version 0.3.0→0.4.0); P1/P2 sweeps in src-v6/ + tests/; post-install.sh sentinel-path update; audit-marketplace.sh (check b regex + check d algorithm); 2 new audit fixtures + driver assert_cases; `.gitkeep` files in empty phase dirs |
| **2: docs atomic** | ~12 | Spec §6.1/§7.6/§7.1 + v0.9 changelog; ADR 008 new file; ADR 006 body refinement note; ADR 007 body annotation; ADRs 001-005 one-line annotations; INDEX.md update |

Both commits leave Tier-1 green. Single PR.

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

1. `WORK_DIR=$(mktemp -d); bmad install --custom-source $(pwd) --modules bmad-bam-platform --directory "$WORK_DIR" --tools claude-code --yes`
2. Verify Strategy 1 succeeded: `ls $WORK_DIR/_bmad/bbp/` should show 4 skill dirs + `module-help.csv`
3. `cd "$WORK_DIR" && bmad run bmad-bam-finalize`
4. Verify sentinel: `cat $WORK_DIR/_bmad-output/bbp/project-context.md | grep BAM_LOAD_VERIFY_`
5. Open Claude Code in `$WORK_DIR`; activate `bmad bmad-create-architecture` (or any core skill with universal-glob)
6. Ask Claude: *"What BAM_LOAD_VERIFY token do you see in your loaded context?"*
7. If Claude recites the token → Plan C **PASS** → merge approved
8. If Claude doesn't → Plan C **FAIL** → PR held; forward-fix (alternative sentinel path; amend ADR 008)

Record outcome in `tests/p2/PLAN-C-RATIFICATION.md` with date, BMAD version, observed token, and PASS/FAIL.

## 10. Risk register

| Risk | Mitigation |
|---|---|
| Universal-glob doesn't load `{output_folder}/bbp/project-context.md` at LLM activation | Plan C ratification is **pre-merge gate**. Failure blocks merge. Forward-fix: try alternate sentinel paths; amend ADR 008. |
| Audit check (d) phase-mode has untested edge cases | 2 new fixtures cover good + orphan cases; real marketplace.json post-refactor exercises live behavior. Edge cases surface as fixture additions in future PRs. |
| Path-prefix change `_bmad/bam-platform/` → `_bmad/bbp/` breaks user's existing local install | Per user's "no backwards compat" stance, accepted. PR description includes migration note: `rm -rf _bmad/bam-platform/ && bmad install bmad-bam-platform`. |
| Concern 5 PR collides with another in-flight PR | Sequence Concern 5 BEFORE any new content PRs. After merge, content PRs rebase. |
| `team: bam` collides with another BMAD module's team | Verified — no other BMAD module uses `bam`. Low risk. |
| Commit 1 atomic refactor introduces a missed reference | Pre-commit verification: run P1/P2/P3/P4 greps post-edit, confirm 0 remaining matches in active files. |
| Future BAM module's phase name has 3+ hyphen-separated words (e.g., `2-plan-and-design`) | Permissive regex `[0-9]+-[a-z][a-z0-9-]*` already handles multi-hyphen. ✓ |

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

| PR | Concern | Purpose |
|---|---|---|
| PR #4 (this design's implementation) | Concern 5 | Layout + `bbp` short-code + subdir sentinel + ADR 008 |
| PR #5 | Concern 7 | `module.yaml` `directories:` block — convert to BMM-canonical `{name}` variable form |
| PR #6 | ADR 007 trigger #1 | Promote `tests/integration/run-real-install.sh` from SKIP stub to real Tier-2 PASS-mode using `bmad install --custom-source` |
| PR #7+ | P2.2 content | New workflow skills (master-architecture, module-architecture, agent-runtime, etc.) land into the established `1-foundation/`, `2-modules/`, `3-integration/`, `4-readiness/` structure |
