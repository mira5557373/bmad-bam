# BAM v6 — Detailed Wave Roadmap & Cross-Validation Workflow (v4.2)

**Date:** 2026-05-16
**Version:** v4.2 (deep-validation patch series — v4.1 fixed ADR renumbering + C4 empirical-correction; v4.2 fixed workflow naming + BMM-manifest empirical finding)
**Earlier:** v4 (68-gap fix total: 24 in v1→v2, 24 in v2→v3, 20 BMM/TEA compatibility fixes in v3→v4)
**Spec source:** `docs/v6-final-architecture.md` v0.9
**Status of foundation:** PR #3 + #5 + #6 + #7 + chore submodule queued for merge
**Purpose:** Comprehensive forward plan for all remaining waves with brainstorm scope, deliverables, cross-validation gates, persona introductions, and cross-cutting work assignments. **Nothing missed.**

## Visual progress tracker (update at each wave completion)

```
Wave 0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ✅ MERGED
P2.1   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ✅ MERGED
P2.2   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ⏳ 5 PRs queued
P0     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ pending merges
P3     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ awaits P0
P4     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸
P5     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ (Nova introduction)
P6     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ (Iris introduction)
P11    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸
▶ v6.0 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ release-tag
PX-MCP ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸
P7     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸
P8     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ (Kai introduction)
▶ v6.1 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ release-tag
P9     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ (Cipher + vertical packs)
P10    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ⏸ (Rune introduction)
▶ v6.2 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ release-tag
```

## Table of contents

- [§0  Cross-validation workflow](#0-cross-validation-workflow-your-stated-pattern)
- [§1  Wave catalog (full enumeration)](#1-wave-catalog-full-enumeration-ordering-per-spec-102)
- [§2  Cross-cutting work assignment](#2-cross-cutting-work-assignment)
- [§3  Per-wave brainstorm prompts + deliverables + cross-validation](#3-per-wave-brainstorm-prompts--deliverables--cross-validation)
- [§4  Universal cross-validation checklist (every PR)](#4-universal-cross-validation-checklist-every-pr)
- [§5  Per-wave PR pre-merge gate](#5-per-wave-pr-pre-merge-gate)
- [§6  Risk catalog (cross-wave)](#6-risk-catalog-cross-wave)
- [§7  Persona introduction sequencing matrix](#7-persona-introduction-sequencing-matrix)
- [§8  Brainstorm prompt library (paste-ready for RDP) — template + per-sub-wave deltas](#8-brainstorm-prompt-library-paste-ready-for-rdp-all-10-wave-starts)
- [§9  Quick-reference dependency matrix](#9-quick-reference-dependency-matrix)
- [§10 Summary](#10-summary)
- [§11 Customize-templates inventory (15 total per spec §7.2)](#11-customize-templates-inventory-15-total-per-spec-72)
- [§12 Spec section coverage map](#12-spec-section-coverage-map)
- [§13 Spec/ADR versioning policy](#13-spec--adr-versioning-policy)
- [§14 Audit drift maintenance + roadmap maintenance + Tier-2 SLO](#14-audit-drift-maintenance--validation-automation)
- [§15 Wave failure + recovery + multi-wave PR + Claude-unavailability protocols](#15-wave-failure--recovery-protocol)
- [§16 v3 deprecation timeline](#16-v3-deprecation-timeline)
- [§17 §15 Claude consumption validation (release gate)](#17-15-claude-consumption-validation-v60v61v62-release-gate)
- [§18 Effort tracking sheet template](#18-effort-tracking-sheet-template)
- [§19 BMM/TEA Compatibility Addendum](#19-bmmtea-compatibility-addendum)

**Changes from v3 (2026-05-16 third self-critique → v4 — BMM/TEA compatibility):**
- C1: `module-help.csv` 13-column schema fully enumerated + per-column semantics (§19.1)
- C2: BMM `output-location` resolved-variable convention adopted; per-workflow output mapping (§19.2)
- C3: Phase-column decoupling — directory structural / module-help.csv lifecycle (§19.3, ADR-011)
- C4: Multi-module sentinel aggregation — empirically re-checked: per-module subdir convention is BMM-compatible already; concern reframed to context-budget growth (§19.4, §6)
- H1: Workflow chaining DAG via `preceded-by` / `followed-by` (§19.5)
- H2: BAM follows BMM all-in-skills (no separate `workflows/`) — ADR-012 (§19.6)
- H3: Menu-code 3-char Z-prefix documented as deliberate BMM-extension — ADR-013 (§19.7)
- H4: `_meta` module-help row + per-module `llms.txt` publication (§19.8)
- H5: Cross-PERSONA content reference rule (extends cross-module pattern) (§19.9)
- H6: BMM upstream contribution pathway (§19.10, §6)
- M1: BMAD-main forward-compat nightly CI workflow (§19.11, §14)
- M2: TEA submodule sync cadence (quarterly) (§19.12, §14)
- M3: `args` column convention for skill invocation (§19.13)
- M4: `required: true/false` per-skill assignment (§19.14)
- M5: BMM `bmad-generate-project-context` integration in `bmad-bam-finalize` step-01 (§19.15)
- M6: Skill manifest schema reconciliation prereq for Wave P3 (§19.16)
- M7: TEA persona-as-workflow-router empirical lineage documented (§19.17)
- L1: `bmad list-modules` registration release-gate check (§19.18, §17)
- L2: Recursive workflow invocation pattern (release-gate-orchestrator) (§19.19)
- L3: `display-name` brevity convention (≤4 words, ≤30 chars) (§19.20)

**Changes from v2 (2026-05-16 second self-critique → v3):**
- H1: TOC added (above) + visual progress tracker
- H2: Per-wave TL;DR tables added at start of each main wave section
- H3+H8: Sub-wave brainstorm prompts — template in §8 + per-sub-wave delta tables
- H4: GitHub permission constraint documented in §0
- H5: BMAD upstream API change risk added to §6
- H6: Submodule security patch protocol added to §6 + §14
- H7: PR rollback protocol added to §15
- M1: Plan C delegation protocol (autonomous-subagent fallback) added to §17
- M2: Tier-2 runtime SLO defined in §14
- M3: Multi-wave PR handling added to universal checklist §4 + §15
- M4: Claude review unavailability protocol added to §0
- M5: Concurrent wave conflict resolution detail added to §15
- M6: Fragment size bounds (200-900 lines, target 400-600) added to §4
- M7: Workflow step count cap (4-10) added to §4
- M8: `[[fragment-name]]` cross-reference convention formalized in §4 + §12
- M9: Mid-wave progress metric defined in §10
- M10: Wave health monitoring trigger criteria added to §6 + §10
- M11: Roadmap maintenance plan added to §14
- L1: Commit message line count accuracy noted (LOW — historical only)
- L2: ADR allocation wording clarified (includes mid-wave Concerns + post-release bugs)
- L3: Non-sequential ADR allocation allowed for parallel waves (§13)
- L4: Visual progress tracker added (above)
- L5: Effort tracking sheet template added (§18 new)

**Changes from v1 (2026-05-16 first self-critique → v2):**
- C1: Effort estimates tripled (was ~1100-1500h, now ~3000-3700h matching spec §10.5)
- C2: Wave P11 sequenced as standalone between P6 and v6.0 (was awkwardly split)
- H1-H7 fixes: brainstorm prompts complete, Tier-2 update per wave, Plan C cadence reduced, §6.0/§15/§7.2/wave-completion all covered
- M1-M10 fixes: spec sections §6.5/§6.8/§6.10/§17 cited; multi-module install test; mid-wave protocol; etc.
- L1-L5 fixes: spec versioning, ADR reservations, parallelism column, validation automation, v3 deprecation

---

## 0. Cross-validation workflow (your stated pattern)

```
┌──────────────────────┐    ┌───────────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ User: brainstorms    │ → │ User: design + plan   │ → │ User: RDP        │ → │ User: opens PR  │
│ wave on RDP session  │    │ + RDP kickoff doc      │    │ implementation   │    │ on GitHub        │
└──────────────────────┘    └───────────────────────┘    └──────────────────┘    └─────────────────┘
                                                                                              │
                                                                                              ▼
                                  ┌────────────────────────────────────────────────────────────────┐
                                  │ Claude (main session): deep PR analysis vs roadmap acceptance   │
                                  │ criteria; flag gaps; run cross-validation checklist; report.    │
                                  └────────────────────────────────────────────────────────────────┘
                                                                                              │
                                                                                 ┌────────────┴────────────┐
                                                                                 ▼                          ▼
                                                                       ┌──────────────────┐    ┌──────────────────┐
                                                                       │ APPROVE → user   │    │ HOLD → user     │
                                                                       │ merges PR         │    │ revises + re-PR  │
                                                                       └──────────────────┘    └──────────────────┘
```

For each wave, this roadmap provides:
- **Brainstorm scope** — questions/decisions to lock on RDP
- **Deliverables** — exact assets to ship (skills, fragments, gates, ADRs)
- **Cross-validation checklist** — what Claude verifies on PR review
- **Risk register** — known failure modes + mitigations
- **Next wave pointer** — dependency chain

**Claude review-effort budget:**
- Each PR review: 15-60 min (depends on PR size + cross-validation depth)
- ~30-40 PRs across all waves = ~10-30h of Claude review time over project lifetime
- Review automated via `tests/audit-marketplace.sh` (8 checks) + `tests/integration/run-real-install.sh` (Tier-2 BAM_TIER2=1) where possible

### Workflow constraint: GitHub permission boundary

**The merge step MUST be performed by the user, not Claude.** The repo at `mira5557373/bmad-bam` requires `mira5557373` ownership permissions; `atdev000` (the gh CLI account Claude uses in this session) lacks `MergePullRequest` + `createPullRequest` rights.

**Practical implications:**
- Claude can: push branches, run tests, draft commit messages, deep-analyze PRs
- User MUST: open PRs (web UI OR `gh auth switch --user mira5557373` then `gh pr create`)
- User MUST: merge PRs (web UI OR account-switched gh CLI)
- User MUST: tag releases (web UI OR account-switched gh CLI)

**Optional fix:** grant `atdev000` collaborator access on the repo. Without it, the workflow stays user-action-gated at PR creation + merge steps.

### Workflow resilience: Claude review unavailability

**Scenarios + protocols:**

| Scenario | Protocol |
|---|---|
| Claude session context-overflows mid-review | PR review state preserved in PR comments via `gh pr comment <N>`. Resume in fresh session with prompt: "Continue review of PR #X from comment timestamp Y". |
| Claude unavailable for >24h | User can run automated portions (Tier-1 audit + Tier-2 BAM_TIER2=1) independently. Defer §3 wave-specific deep review until Claude resumes. |
| Claude unavailable for >7 days | User can self-review against §4 universal checklist + §3 wave-specific. If confident, merge with note "self-reviewed pending Claude post-merge audit". Claude does post-merge audit on return; revert if finding surfaces. |
| Roadmap navigation needed (Claude unavailable) | User reads roadmap directly; TOC at top + per-wave TL;DR + §8 brainstorm prompts cover most needs. |

---

## 1. Wave catalog (full enumeration; ordering per spec §10.2)

11 main waves + 6 cross-cutting + 3 release milestones. Wave order per **spec §10.2 justification**:
- platform = root dep (ships first; everything depends on it)
- data cohesive with platform (Atlas owns both — no persona-introduction cost)
- ai is the core differentiator (Nova introduction)
- ux foundational for white-labeling first tenant (Iris introduction)
- rag + integration in v6.1 (needed before full production)
- trust + ops in v6.2 (gate `RG-Launch`)

| Wave | Purpose | Persona introduced | Skills | Est. effort | Parallelism | Spec ref |
|---|---|---|---|---|---|---|
| **P0** | Pre-content prereqs (merge 5 queued PRs + Plan C R5) | — | 0 | ~2h | n/a (sequential) | n/a |
| **P3** | Complete `bmad-bam-platform` | Atlas continues | 15 | **~280-345h** | Can parallel with PX-Migration | §5.1 |
| **P4** | `bmad-bam-data` | Atlas continues | 14 | **~260-310h** | Sequential after P3 | §5.2 |
| **P5** | `bmad-bam-ai` | **Nova** 🌟 NEW | 27 | **~450-540h** | Sequential after P4 | §5.3 |
| **P6** | `bmad-bam-ux` | **Iris** 🎨 NEW | 12 | **~210-260h** | Can parallel with PX-AntiPatterns consolidation | §5.8 |
| **P11** | Cross-family workflows (in platform) | — | 12 | **~150-210h** | Can parallel with P3 or after P6 | §5.9 |
| **▶ v6.0 RELEASE** | platform + data + ai + ux + cross-family | 3 personas (Atlas, Nova, Iris) | 80 cumulative | RG-Launch partial | — | §10.1 |
| **PX-MCP** | MCP server (`bmad-bam-mcp`) | — | 0 skills (1 server) | **~90-120h** | After v6.0; standalone | §9.5 |
| **P7** | `bmad-bam-rag` | Nova continues | 8 | **~150-200h** | Sequential after PX-MCP (or parallel) | §5.4 |
| **P8** | `bmad-bam-integration` | **Kai** 🔗 NEW | 13 | **~240-300h** | Sequential after P7 | §5.5 |
| **▶ v6.1 RELEASE** | + rag + integration + Kai | 4 personas | 101 cumulative | + QG-I*, QG-RQ1 | — | §10.1 |
| **P9** | `bmad-bam-trust` (+ 6-8 vertical packs) | **Cipher** 🔐 NEW | 16 + packs | **~300-400h** | Sequential after v6.1 | §5.6 |
| **P10** | `bmad-bam-ops` | **Rune** ⚙️ NEW | 16 | **~300-400h** | Sequential after P9 | §5.7 |
| **▶ v6.2 RELEASE** | + trust + ops + 6 personas | 6 personas | 133 cumulative | Full RG-Launch | — | §10.1 |
| **PX-Migration** | v3 → v6 migration tooling | — | (in platform) | **~75-100h** | Parallel with P3-P4 | §13 |
| **PX-Glossary** | Glossary consolidation (40+ terms) | — | (cross-cutting) | **~30-45h** | Distributed; consolidates at v6.0 | §14 |
| **PX-AntiPatterns** | Anti-patterns library (26 items) | — | (cross-cutting) | **~45-60h** | Distributed; consolidates at v6.0 | §11 |
| **PX-CustomizeTpl** | 15 customize-templates (BMAD-core overlays) | — | (cross-cutting) | **~75-100h** | Distributed per module | §7.2 |
| **PX-VerticalPacks** | 6-8 vertical add-on packs (in trust) | — | (in trust, P9) | **~240-360h** | Sub-wave of P9 | §6.7 |

**Total remaining effort: ~3000-3700h** (matches spec §10.5: Wave 0 → v6.2 total ~3200-4000h minus ~150-300h done = ~3000-3700h).

**Per spec §10.5 solo-developer timeline:**
- Part-time (10h/wk): ~85 weeks (~1.6 years) remaining
- Half-time (20h/wk): ~43 weeks (~10 months)
- Full-time (40h/wk): ~22 weeks (~5 months)
- Heavy (80h/wk): ~11 weeks (~3 months)

---

## 2. Cross-cutting work assignment

Distributed across main waves (not standalone waves except where noted):

| Cross-cutting | Assigned to | Why | Spec ref |
|---|---|---|---|
| **Anti-patterns** (26 total) | Each module wave establishes 3-4; PX-AntiPatterns consolidates at v6.0 | Each module's anti-patterns make most sense in context. Each persona-skill owns its `resources/anti-patterns/<id>.md` per spec §6.5 frontmatter. | §6.5, §11 |
| **Glossary terms** (~40) | Each module wave adds 5-7 terms; PX-Glossary consolidates at v6.0 | Terms emerge from module work; consolidated glossary in platform | §14 |
| **Customize templates** (~15) | Each module wave adds 1-2 templates per spec §7.2 table | Templates overlay BMAD-core skills; assignments enumerated in §11 of this doc | §7.2 |
| **Vertical packs** (6-8) | All land in Wave P9 (trust) per spec §6.7 | Single canonical home: `bmad-bam-trust/1-foundation/bmad-bam-agent-cipher/resources/vertical-addons/` | §6.7 |
| **MCP server** | Standalone wave PX-MCP, AFTER v6.0 release | Independent infrastructure; uses universal-glob and BAM-native APIs | §9.5 |
| **v3 → v6 migration** | Standalone wave PX-Migration, parallel with P3-P4 | Migration tooling lives in platform; doesn't depend on later modules | §13 |
| **Quality gates** (28) | Each module wave establishes its primary gates; cross-module gates consolidated at v6.0 milestone | Gates are module-owned per spec §8.1 | §8.1 |
| **Release gates** (8) | RG-Launch partial at v6.0; full RG-Launch at v6.2; other RGs build incrementally | Release gates compose QGs | §8.2 |
| **`_bmad/bam/` umbrella subdirs** | Each main wave introduces the umbrella subdirs needed by its workflows | See §11 for full inventory + assignments | §6.0 |
| **Context budget management** | Wave P11 (bmad-bam-start handles tier checks) + per-module limits in P3-P10 | Spec §6.10 — budget enforcement at session start | §6.10 |
| **Knowledge currency governance** | Each fragment establishes `last_reviewed` + threshold; `refresh-knowledge` workflow (in P11) handles drift detection | Spec §6.8 — topic-specific staleness thresholds | §6.8 |

---

## 3. Per-wave brainstorm prompts + deliverables + cross-validation

### Wave P0 — Pre-content prerequisites

**Goal:** Land the 5 queued PRs + Plan C R5 baseline so Wave P3 starts on stable ground.

**No brainstorm needed** (mechanical cleanup).

**Deliverables:**
- [ ] PR #3 merged (Concerns 4+5)
- [ ] PR #5 merged (Concern 7)
- [ ] PR #6 merged (Tier-2 promotion)
- [ ] PR #7 merged (audit ENH-0/1/2)
- [ ] chore submodule bump merged
- [ ] Plan C R5 manual ratification recorded (`tests/p2/PLAN-C-RATIFICATION.md`) against post-merge `feat/bam-v3-pure-kb` HEAD
- [ ] **Optional but recommended:** CI workflow setting `BAM_TIER2=1` on merge-to-main

**Cross-validation:**
```bash
git fetch origin feat/bam-v3-pure-kb
git checkout feat/bam-v3-pure-kb && git pull
git log --oneline -20 | head -25   # expect: 4 merge commits + chore

tests/audit-marketplace.sh                                      # OK
tests/audit-marketplace-fixtures.sh                             # 12/12
tests/wave-0/run-smoke-test.sh                                  # PASS
tests/p2/run-real-install-test.sh                               # PASS
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh
BAM_TIER2=1 tests/integration/run-real-install.sh               # PASS
```

**Effort:** ~2h
**Wave-completion definition:** all 5 PRs merged + Plan C R5 PASS recorded + Tier-1/2 green on main

---

### Wave P3 — Complete `bmad-bam-platform` (Atlas)

| TL;DR | |
|---|---|
| **Wave goal** | Build remaining 15 platform workflow skills |
| **Persona** | Atlas (continues; no introduction cost) |
| **Sub-waves** | 4 (P3.1 Foundation / P3.2 Lifecycle / P3.3 Commercial / P3.4 Brownfield) |
| **Effort** | ~280-345h |
| **Module code** | `bbp` (existing) |
| **New gates** | QG-F1, QG-M1; refines QG-M2 |
| **Key dep** | After Wave P0 (5 PRs merged) |

**Goal:** Build remaining 15 platform skills (skills 2-16 from spec §5.1). Establish QG-F1, QG-M1, refine QG-M2.

**Effort:** ~280-345h (4 sub-waves)
**ADR range reserved:** ADRs 014-018
**Parallelism:** Can parallel with PX-Migration (no shared files)
**Persona:** Atlas continues (no introduction cost)

#### P3.1 — Foundation (4 skills, ~75-90h)

**Skills:**
1. `bmad-bam-design-modular-monolith` (skill 2)
2. `bmad-bam-design-deployment-topology` (skill 3)
3. `bmad-bam-design-finops-model` (skill 4)
4. `bmad-bam-design-tenant-tier-model` (skill 5)

**Brainstorm questions (locked on RDP):**
1. QG-F1 evidence: what does each Foundation skill produce that feeds QG-F1?
2. design-modular-monolith decision space: DDD bounded contexts vs ports/adapters vs hybrid — primary recommendation + trade-off matrix
3. design-deployment-topology interaction with design-tenancy-model: how does deployment topology depend on tenancy model choice (RLS/schema/cell)?
4. design-finops-model: per-tenant attribution requires shared instrumentation — what's the upstream input from `design-tenancy-model`?
5. design-tenant-tier-model: ship 5 default tiers (free/starter/pro/business/enterprise) or flexible N-tier?
6. Fragment density target: ≤5 new fragments per skill (current platform = 6 fragments for 1 skill; need stricter discipline). With ~5 fragments/skill, this sub-wave = ~20 fragments.
7. Cross-skill fragment reuse: does design-finops-model reference design-tenancy-model's tenancy-decision-framework fragment? Or stand-alone?
8. Anti-patterns: what 3-4 anti-patterns does this sub-wave establish? (Per spec §6.5)
9. Glossary terms: what 5-7 terms are introduced? (For PX-Glossary)
10. Customize-templates: does this sub-wave add overlays for `bmad-create-architecture` (per §7.2)?

**Deliverables:**
- 4 skill dirs at `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/` (template: design-tenancy-model)
- Each: SKILL.md, customize.toml (`[workflow]`), workflow.md, 5-7 CEV steps, template, smoke-test, bmad-skill-manifest.yaml
- ~20 new fragments at `1-foundation/bmad-bam-agent-atlas/resources/fragments/` (~5/skill)
- ~8-12 new patterns at `resources/patterns/` (~2-3/skill)
- ~3-4 anti-patterns at `resources/anti-patterns/<id>.md` (per spec §6.5)
- ~5-7 glossary terms (in resources or in a glossary fragment)
- QG-F1 checklist at `resources/checklists/QG-F1.md`
- QG-M1 (partial) at `resources/checklists/QG-M1.md`
- Customize-template overlay for `bmad-create-architecture` (if scope confirms; per §7.2)
- Marketplace.json: 4 new skill entries
- **Tier-2 script update:** verify Tier-2's 4-skills check still expects the 4 platform skills (no change in arg yet — still `--modules bbp`)
- ADR-015 (Wave P3.1 design decisions, dependencies-on-other-decisions: [006, 008, 009, 010, 011, 012, 013, 014]) — LANDED 2026-05-17
- Spec changelog row (v0.10 if scope is substantial; otherwise no bump)
- INDEX.md row for ADR-015

**Cross-validation (Claude on PR):**
- [ ] Universal checklist §4 — all items pass
- [ ] Each new skill's smoke-test PASSes
- [ ] No regression on design-tenancy-model smoke
- [ ] QG-F1 + QG-M1 checklists have frontmatter per spec §8.1
- [ ] Each new fragment follows spec §6.3 body structure (When to Use / NOT to Use / Architecture / Trade-offs / Implementation Patterns / Quality Checks / Web Research Queries / Cross-references)
- [ ] Web queries use `{date}` placeholder
- [ ] Each new fragment has `**CRITICAL:**` quality check
- [ ] Anti-patterns have `kind: anti-pattern` frontmatter per spec §6.5
- [ ] Each new fragment has `last_reviewed: <YYYY-MM-DD>` per spec §6.8

**Risk register:**
- R3.1.1: Fragment density creeps above 5/skill — mitigation: brainstorm caps it; reuse aggressively
- R3.1.2: QG-F1 evidence requirements unclear — mitigation: write QG-F1 checklist FIRST, then design skills to produce evidence
- R3.1.3: design-finops-model's per-tenant attribution requires tenancy decision upstream — mitigation: explicit `inputs:` declaration

**Next:** P3.2 Lifecycle.

#### P3.2 — Lifecycle (4 skills, ~65-80h)

**Skills:**
1. `bmad-bam-design-tenant-onboarding` (skill 6)
2. `bmad-bam-design-tenant-offboarding` (skill 7)
3. `bmad-bam-design-multi-tenant-testing` (skill 8)
4. `bmad-bam-design-tenant-migration-tooling` (skill 14)

**Brainstorm questions:**
1. Tenant onboarding: SMB self-serve (Stripe Checkout) vs sales-assisted (Hubspot) — default?
2. Right-to-deletion: hard delete vs soft delete vs anonymize — when each applies?
3. Multi-tenant testing catalogue: refines QG-M2's existing checklist with explicit test types
4. Tenant migration: tier upgrades vs region migrations — single workflow or split?

**Deliverables:** As P3.1, plus:
- QG-M2 refinement (expanded test catalogue)
- QG-D1 partial (DR dependency on migration; full lands in P10 ops)
- Cross-reference into QG-C1 (compliance for offboarding) — placeholder for P9 trust
- ADR-015

**Cross-validation:** Same as P3.1, plus:
- [ ] design-multi-tenant-testing output catalogue consumed by QG-M2 evidence requirements
- [ ] design-tenant-offboarding cites GDPR right-to-deletion fragment + explicit retention-window decision
- [ ] design-tenant-migration-tooling specifies zero-downtime constraint + cross-region implications

**Next:** P3.3 Commercial.

#### P3.3 — Commercial (5 skills, ~95-115h)

**Skills:**
1. `bmad-bam-design-billing-integration` (skill 9)
2. `bmad-bam-design-payment-tenant-mapping` (skill 10)
3. `bmad-bam-design-tax-compliance` (skill 11)
4. `bmad-bam-design-rate-limit-per-tenant` (skill 12)
5. `bmad-bam-design-tenant-rate-arbitrage` (skill 13)

**Brainstorm questions:**
1. Billing provider abstraction: Stripe-first with Paddle/Maxio alternates, or provider-agnostic facade?
2. Payment-tenant mapping: scope to provider object IDs vs tenant-side abstraction?
3. Tax compliance: how many jurisdictions in patterns? US states + EU VAT minimum?
4. Rate-limiting algorithm: token-bucket / leaky-bucket / sliding-window?
5. Rate-arbitrage detection: heuristics vs ML — start with heuristics?

**Deliverables:** As P3.1, plus:
- ~25 new fragments (provider integration, tax matrices, rate-limit algorithms)
- ~6-8 new patterns
- QG-TC4 (Tenant Context continuous) checklist
- ADR-016, ADR-017

**Next:** P3.4 Brownfield.

#### P3.4 — Brownfield (2 skills, ~45-60h)

**Skills:**
1. `bmad-bam-analyze-existing-tenancy` (skill 15) — `analyze-*` prefix per spec §5.0
2. `bmad-bam-plan-tenancy-retrofit` (skill 16) — `plan-*` per spec §5.0

**Brainstorm questions:**
1. `analyze-existing-tenancy`: assessment-only or also gap report?
2. `plan-tenancy-retrofit`: how to handle codebases with no clear tenancy boundary?

**Deliverables:** As P3.1, plus:
- ~6-8 brownfield-specific fragments (reuses ~60-70% of greenfield by reference)
- ADR-018

**Cross-validation:** Same as P3.1, plus:
- [ ] analyze-* and plan-* workflows have explicit `brownfield: true` declarations
- [ ] Output artifacts distinguishable from greenfield (filenames)

**Wave P3 completion definition:**
- All 4 sub-wave PRs merged
- All 15 platform workflow skills present
- 7 of 28 quality gates established/refined (QG-F1, QG-M1, QG-M2 refined, QG-D1 partial, QG-TC4, QG-C1 partial, QG-S1 partial)
- ~50-60 new fragments, ~20-25 new patterns, ~12-15 anti-patterns, ~25-30 glossary terms
- ADRs 011-015 in INDEX.md
- Spec changelog row for v0.10 (platform complete) — optional
- Plan C R6 ratification optional (no install-mechanic changes)

**Next:** Wave P4 (data module).

---

### Wave P4 — `bmad-bam-data` (Atlas continues)

| TL;DR | |
|---|---|
| **Wave goal** | Build all 14 data module skills + cross-module fragment reference debut |
| **Persona** | Atlas (continues; owns platform + data) |
| **Sub-waves** | 3+1 (P4.0 bootstrap / P4.1 Storage / P4.2 Specialized / P4.3 Lifecycle+Brownfield) |
| **Effort** | ~260-310h |
| **Module code** | `bbd` |
| **New gates** | QG-DA1 |
| **Key dep** | After P3; first cross-module fragment reference (Atlas's data refs platform fragments) |

**Goal:** Build all 14 data module skills per spec §5.2. Establish QG-DA1.

**Effort:** ~260-310h (3 sub-waves)
**ADR range reserved:** ADRs 019-022
**Parallelism:** Sequential after P3 (Atlas content patterns established)
**Persona:** Atlas (still) — first wave where cross-module fragment reuse happens

#### P4.0 — Data module bootstrap (1 PR, ~10-15h)
- `src-v6/bmad-bam-data/` module dir
- module.yaml with `code: bbd`
- module-help.csv with canonical 13-col schema
- `1-foundation/` (empty for now — Atlas's content lives in platform)
- `2-storage/`, `3-data-lifecycle/` placeholder dirs
- marketplace.json plugin entry for `bmad-bam-data`
- Module-level smoke-test
- ADR-019 (data module scaffolding decisions)
- **Tier-2 script update:** add `bbd` to `--modules` arg + extend skill-existence loop

#### P4.1 — Storage architecture (5 skills, ~95-115h)
Skills: design-schema-architecture, design-cdc-pipeline, design-event-sourcing, design-cqrs, design-lakehouse

**Brainstorm:**
1. CDC tool default: Debezium / Outbox / PG decoding — canonical?
2. Lakehouse format: Iceberg vs Delta vs Hudi — Iceberg as default?
3. Cross-module reference: data fragments reference Atlas's platform fragments via `[[name]]` markdown links?
4. CROSS-MODULE FIRST TEST: data's design-schema-architecture cites platform's design-tenancy-model — does the load work?

#### P4.2 — Specialized data systems (5 skills, ~95-115h)
Skills: design-feature-store, design-stream-processing, design-search-index, design-graph-database, design-synthetic-data

#### P4.3 — Data lifecycle + brownfield (4 skills, ~60-75h)
Skills: design-data-export-formats, design-data-residency, design-retention-deletion, plan-data-migration

**Brainstorm questions (wave-wide):**
1. CDC + lakehouse + stream processing — primary stack recommendation?
2. Data residency vs tenancy: when does a tenant require region pinning?
3. Cross-module fragment reference convention finalized — pattern documented in std-frontmatter convention map?
4. Anti-patterns for data: schema lock-in, event-sourcing-overuse, etc. (3-4 anti-patterns)
5. Glossary: 5-7 data-specific terms

**Deliverables (Wave P4 total):**
- 14 skill dirs under `bmad-bam-data/<phases>/`
- ~50-60 new fragments in `bmad-bam-data/1-foundation/.../resources/` (data module owns its own resources for cross-module reuse)
  - OR all in platform's Atlas resources (cross-module dependency, easier discoverability) — decide in brainstorm
- ~20-25 new patterns
- ~3-4 anti-patterns
- ~5-7 glossary terms
- QG-DA1 (Data Architecture) checklist
- Customize-template overlay for `bmad-investigate` (data deep-dives per §7.2)
- ADRs 019-022
- Spec changelog row for v0.11

**Cross-validation (added vs P3):**
- [ ] **CROSS-MODULE FRAGMENT REFERENCE TEST** — does data's design-retention-deletion successfully load platform's design-tenant-offboarding via tool-aware path fallback (`.claude/skills/...` → `.cursor/skills/...` → `_bmad/<other-code>/...`)?
- [ ] QG-DA1 evidence requirements satisfied by P4.1 skills
- [ ] CDC patterns include outbox + Debezium + native PG (3 alternatives min in trade-off matrix)
- [ ] design-data-residency references platform's tenancy model for cross-region implications
- [ ] Anti-patterns: each has `kind: anti-pattern` frontmatter

**Risk:**
- R4.1: Cross-module fragment reference convention breaks at activation — mitigation: explicit Plan C R7+ ratification with cross-module load test (mandatory for Wave P4)
- R4.2: 14 skills is large — mitigation: 3 sub-waves with PR per sub-wave

**Wave P4 completion definition:**
- 14 data skills + module bootstrap PR all merged
- Cross-module fragment reference verified at Plan C R7
- QG-DA1 checklist established
- ADRs 019-022 in INDEX.md
- Spec v0.11 changelog row

**Next:** Wave P5 (ai module + Nova).

---

### Wave P5 — `bmad-bam-ai` + **Nova persona introduction**

| TL;DR | |
|---|---|
| **Wave goal** | Build all 27 AI module skills; introduce Nova (second persona) |
| **Persona** | **Nova** 🌟 NEW — "gradient-descent metaphors" |
| **Sub-waves** | 6+1 (P5.0 Nova scaffold / P5.1-P5.6 clusters per spec §5.3) |
| **Effort** | ~450-540h (largest wave) |
| **Module code** | `bba` |
| **New gates** | QG-M3, QG-S2 partial |
| **Key dep** | After P4; first cross-persona invocation test |

**Goal:** Build all 27 ai module skills per spec §5.3. Introduce Nova as second persona. Establish QG-M3.

**Effort:** ~450-540h (6+1 sub-waves; largest wave)
**ADR range reserved:** ADRs 023-030
**Parallelism:** Sequential after P4
**Persona:** **Nova** 🌟 NEW — "gradient-descent metaphors" per spec §4.1

#### P5.0 — Nova persona scaffold + module bootstrap (1 PR, ~25-35h)
- `src-v6/bmad-bam-ai/` module dir
- module.yaml with `code: bba`, `team: bam`
- module-help.csv canonical schema
- `1-foundation/bmad-bam-agent-nova/` (mirror Atlas's structure)
- Nova SKILL.md + customize.toml + initial `resources/` (fragments, patterns, checklists)
- Initial fragments: ai-runtime-foundations, model-routing-cost-aware (~3-5 fragments to seed)
- Marketplace.json plugin entry for `bmad-bam-ai`
- **Tier-2 script update:** `--modules bbp,bbd,bba` + extend skill-existence loop
- ADR-023 (Nova persona introduction + ai module bootstrap decisions)

#### P5.1 — Routing & orchestration (4 skills, ~70-85h)
Skills: design-model-routing, design-agent-orchestration, design-agent-collaboration-protocol, design-tool-execution

#### P5.2 — Memory & prompt (5 skills, ~85-100h)
Skills: design-memory-architecture, design-agent-memory-compression, design-self-improving-agent, design-prompt-engineering, design-prompt-architecture

#### P5.3 — Safety & isolation (5 skills, ~85-100h)
Skills: design-prompt-injection-defense, design-prompt-leak-prevention, design-tenant-prompt-isolation, design-model-cache-isolation, design-safety-guardrails

#### P5.4 — Eval (5 skills, ~85-100h)
Skills: design-offline-eval, design-online-eval, design-adversarial-eval, design-bias-fairness-eval, design-eval-first-spec

#### P5.5 — Lifecycle & FinOps (4 skills, ~70-85h)
Skills: design-shadow-mode, design-model-lifecycle, design-ai-finops, design-ai-safety-policy

#### P5.6 — Roadmap & synthesis + brownfield (4 skills, ~70-85h)
Skills: design-ai-product-roadmap, design-ai-runtime (synthesizes QG-M3), audit-ai-runtime, plan-ai-bolt-on

**Brainstorm questions (Wave-wide, P5.0):**
1. Nova voice: "Gradient-descent metaphors" per spec §4.1 — 3-5 example phrasings establishing the voice
2. Cross-persona invocation: design-ai-runtime depends on Atlas's design-tenancy-model output — pattern?
3. AI eval frameworks: ship patterns for which tools (LangSmith / Braintrust / Inspect AI / Anthropic Console)?
4. design-ai-finops cross-references platform's design-finops-model — extends or replaces?
5. design-tenant-prompt-isolation interacts with design-tenancy-model — input/output contract?
6. Anti-patterns: single-model-lockin, prompt-leak-on-debug, eval-after-launch, etc. (~6-8 ai anti-patterns)
7. Glossary: 10+ AI-specific terms (eval, agent, RAG-isolation, etc.)

**Deliverables (Wave P5 total):**
- 27 skill dirs under `bmad-bam-ai/<phases>/`
- Nova persona-skill fully built (mirror Atlas's structure)
- ~120-140 new fragments (Nova's resources — largest fragment growth)
- ~50-60 new patterns
- ~6-8 anti-patterns
- ~10-12 glossary terms
- QG-M3 (AI Runtime) checklist — blocking gate
- QG-S2 (Model/Tool Safety) partial (full lands in P9 trust)
- Customize-template overlays for `bmad-investigate`, `bmad-validate-prd`, `bmad-design-test-strategy` (per §7.2)
- ADRs 023-030 (one per sub-wave + bootstrap)
- Spec changelog row v0.12

**Cross-validation:**
- [ ] Universal checklist §4
- [ ] Nova's SKILL.md follows the BMM-canonical structure (matches Atlas)
- [ ] `1-foundation/bmad-bam-agent-nova/customize.toml` uses `[agent]` namespace (NOT `[workflow]`)
- [ ] Nova's persistent_facts include universal-glob + `{skill-root}/resources/...`
- [ ] `team: bam` per Concern 7 / P4 rename convention
- [ ] **CROSS-PERSONA TEST** — Atlas's design-tenancy-model output successfully feeds Nova's design-ai-runtime via spec §5.0.1 manifest `inputs:`
- [ ] **MULTI-MODULE INSTALL TEST** — `bmad install --custom-source $REPO_ROOT --modules bbp,bbd,bba --tools claude-code --yes` installs all 3 modules; sentinels emit for all; Plan C R8 ratification (mandatory at module introduction)
- [ ] **DEP-GRAPH INSTALL TEST** — `bmad install bbr` would auto-pull `bba` + `bbp` (rag depends on ai depends on platform per spec §3.2). Verify via dry-run install.
- [ ] QG-M3 + QG-S2 partial checklists in `bmad-bam-ai/1-foundation/bmad-bam-agent-nova/resources/checklists/`
- [ ] Nova voice distinct from Atlas (review SKILL.md prose for "gradient-descent" metaphors)

**Risk:**
- R5.1: Nova introduction risks "Atlas-imitation" — mitigation: brainstorm voice deeply; reference §4.1 explicitly
- R5.2: 27 skills + 6 clusters is biggest wave — mitigation: 6+1 sub-waves with strict PR-per-sub-wave discipline
- R5.3: Cross-persona invocation untested — mitigation: explicit P5.6 design-ai-runtime test (it MUST invoke Atlas's design-tenancy-model output)

**Wave P5 completion definition:**
- 27 skills + Nova persona-skill all merged
- QG-M3 established (blocking)
- Plan C R8 PASS with all 3 modules installed
- ADRs 023-030 in INDEX.md
- Spec v0.12 changelog row

**Next:** Wave P6 (ux + Iris).

---

### Wave P6 — `bmad-bam-ux` + **Iris persona introduction**

| TL;DR | |
|---|---|
| **Wave goal** | Build all 12 UX module skills; introduce Iris (third persona) |
| **Persona** | **Iris** 🎨 NEW — "theme tokens, accessibility-first" |
| **Sub-waves** | 3+1 (P6.0 Iris scaffold / P6.1 Branding / P6.2 Tenant+Agent UX / P6.3 Lifecycle UX) |
| **Effort** | ~210-260h |
| **Module code** | `bbu` |
| **New gates** | QG-UX1 (advisory) |
| **Key dep** | After P5 |

**Goal:** Build all 12 ux module skills per spec §5.8. Introduce Iris as third persona. Establish QG-UX1.

**Effort:** ~210-260h (3+1 sub-waves)
**ADR range reserved:** ADRs 031-033
**Persona:** **Iris** 🎨 NEW — "theme tokens, accessibility-first" per spec §4.1

#### P6.0 — Iris persona scaffold + module bootstrap (1 PR, ~15-25h)
- module.yaml with `code: bbu`, `team: bam`
- Iris persona at `1-foundation/bmad-bam-agent-iris/`
- ADR-031

#### P6.1 — Branding & theme (4 skills, ~65-80h)
Skills: design-theme-token-architecture, design-accessibility-cohort, design-multi-locale, design-white-label

#### P6.2 — Tenant + agent UX (4 skills, ~65-80h)
Skills: design-tenant-ui-customization, design-agent-ui-patterns, design-trust-ui, design-progressive-disclosure-ai

#### P6.3 — Lifecycle UX + audit (4 skills, ~65-80h)
Skills: design-empty-state-ai, design-onboarding-ux, design-feature-deprecation-ux, audit-ux-consistency

**Brainstorm questions:**
1. Theme token system: CSS variables vs design-tokens-w3c JSON?
2. Accessibility per cohort: WCAG level by tenant tier?
3. White-label brand isolation: `_bmad/<code>/theme-<tenant-id>/` or runtime-resolved?
4. Agent UI patterns: chat vs command-palette vs sidebar vs embedded — order of preference?
5. Cross-persona: Iris consumes Cipher's PII patterns (P9 future) — placeholder reference OK?

**Deliverables:**
- 12 skill dirs under `bmad-bam-ux/<phases>/`
- Iris persona-skill
- ~50-60 fragments
- ~20-25 patterns
- ~3-4 anti-patterns
- ~7-9 glossary terms
- QG-UX1 (advisory) checklist
- Customize-template overlay for `bmad-create-story` (UX considerations per §7.2)
- ADRs 031-033
- **Tier-2 script update:** `--modules bbp,bbd,bba,bbu`; skill-existence loop adds 12 Iris-related skills
- Spec changelog row v0.13

**Cross-validation:**
- [ ] All P5 cross-validation items
- [ ] **FOUR-MODULE INSTALL TEST** — `bmad install --modules bbp,bbd,bba,bbu` installs cleanly
- [ ] **THREE-PERSONA AVAILABILITY** — Atlas, Nova, Iris all listed in `_bmad/_config/skill-manifest.csv` post-install
- [ ] Iris's voice distinct from Atlas + Nova (review SKILL.md)

**Wave P6 completion definition:**
- 12 UX skills + Iris persona-skill all merged
- QG-UX1 established (advisory)
- ADRs 034-036 in INDEX.md
- Spec v0.13 changelog row

**Next:** Wave P11 (cross-family workflows in platform).

---

### Wave P11 — Cross-family workflows (now standalone wave)

| TL;DR | |
|---|---|
| **Wave goal** | Build all 12 cross-family workflows (live in platform module) |
| **Persona** | Atlas (cross-family is platform-owned) |
| **Sub-waves** | 2 (P11.1 Essential / P11.2 Release-critical) |
| **Effort** | ~150-210h |
| **Module code** | (in `bbp` platform) |
| **New gates** | (cross-family supports release-gate-orchestrator) |
| **Key dep** | After P6; lands before v6.0 release tag |

**Goal:** Build all 12 cross-family workflows per spec §5.9, lived in `bmad-bam-platform`. Bridges modules for v6.0 release.

**Effort:** ~150-210h (2 sub-waves)
**ADR range reserved:** ADRs 034-036
**Parallelism:** Can parallel with P3 (early cross-family skills) OR after P6 (release-critical)
**Persona:** Atlas (cross-family skills live in platform; no new persona)

**Note:** Spec §5.9 lists 12 cross-family workflows + 1 release-gate-orchestrator = 13 total. (Spec earlier in §5.0 says 12; reconcile to 12 + release-gate-orchestrator counted in QG infrastructure.)

#### P11.1 — Essential cross-family (6 skills, ~75-105h)
Skills: bmad-bam-start, record-decision, refresh-knowledge, waive-gate, mediate-conflict, design-build-vs-buy

**Brainstorm:**
1. `bmad-bam-start`: orchestrator entry — greenfield path vs brownfield path branching
2. `record-decision`: ADR workflow — produces ADRs in `_bmad/_memory/<persona>/architecture-decisions/`
3. `refresh-knowledge`: drift detection per spec §6.8 topic thresholds
4. `mediate-conflict`: Kai-led arbitration (Kai introduced in P8; this skill is invoked WHEN Kai exists)
5. `waive-gate`: waiver with expiration + compensating control (spec §8.6)

#### P11.2 — Release-critical cross-family (6 skills, ~75-105h)
Skills: bmad-bam-backup, bmad-bam-restore, bmad-bam-upgrade, bmad-bam-rollback, verify-production-readiness-final, release-gate-orchestrator

**Brainstorm:**
1. `bmad-bam-backup`: archives `_bmad/_memory/` + `_bmad/bam/evidence/` to `_bmad/bam/backups/`
2. `bmad-bam-restore`: validates + restores from archive
3. `bmad-bam-upgrade`: BAM-to-BAM module upgrade procedure (spec §10.4)
4. `bmad-bam-rollback`: clean partial-install state after install failure
5. `verify-production-readiness-final`: composite gate across installed modules
6. `release-gate-orchestrator`: composes QGs into RGs per spec §8.3

**Deliverables (Wave P11 total):**
- 12 skill dirs under `bmad-bam-platform/2-modules/` (cross-family skills are PLATFORM skills despite cross-cutting nature)
- ~30-40 fragments
- ~15-20 patterns
- ~2-3 anti-patterns
- ~5-7 glossary terms
- ADRs 034-036 (one per sub-wave + release-gate orchestrator)
- Spec changelog row v0.14 (cross-family complete)

**Cross-validation:**
- [ ] Universal checklist §4
- [ ] `bmad-bam-start` invocation produces correct module sequencing per spec §3.2 dep graph
- [ ] `record-decision` produces ADR in canonical 11-field schema per std-adr
- [ ] `verify-production-readiness-final` correctly composes evidence from all installed modules
- [ ] `release-gate-orchestrator` correctly maps QGs → RGs per spec §8.2 table

---

### ▶ v6.0 RELEASE MILESTONE

**Composition:** platform (16) + data (14) + ai (27) + ux (12) + cross-family (12) = **81 module skills + 12 cross-family = 93 total skills** + 3 personas (Atlas, Nova, Iris).

**v6.0 RELEASE GATE checklist:**
- [ ] All P3 + P4 + P5 + P6 + P11 PRs merged
- [ ] All Tier-1 audit checks green (8 checks a-h)
- [ ] Tier-2 with all 4 modules + cross-family: `BAM_TIER2=1 ... --modules bbp,bbd,bba,bbu` PASS
- [ ] **Plan C R(v6.0) MANDATORY** — full LLM-side ratification in real Claude Code IDE; record in `tests/p2/PLAN-C-RATIFICATION.md`
- [ ] **§15 Claude consumption validation** — test §15.1-§15.12 patterns end-to-end (see §17 of this roadmap)
- [ ] ADRs 008-030 all in INDEX.md
- [ ] Spec at v1.0 (semver bump: 0.X → 1.X at v6.0 release; see §13 of this roadmap)
- [ ] PX-AntiPatterns consolidation: 12-15 of 26 anti-patterns shipped (rest in v6.1+)
- [ ] PX-Glossary consolidation: 25-30 of 40 terms shipped
- [ ] family.json captures v6.0 module set
- [ ] Release gate evidence: RG-Launch composite (QG-F1, all M*, QG-DA1, QG-UX1) — partial; full RG-Launch at v6.2
- [ ] CHANGELOG.md entry for v6.0
- [ ] Tag the commit: `v6.0.0`

---

### Wave PX-MCP — MCP server (`bmad-bam-mcp`)

| TL;DR | |
|---|---|
| **Wave goal** | Build BAM MCP server (stdio transport, fs-permission auth) |
| **Persona** | (no persona; infrastructure wave) |
| **Sub-waves** | 1 (standalone) |
| **Effort** | ~90-120h |
| **Tools exposed** | 8 per spec §9.5 |
| **Key dep** | After v6.0 release |

**Goal:** Build the BAM MCP server per spec §9.5. Stdio transport, fs-permission auth.

**Effort:** ~90-120h (standalone)
**ADR range reserved:** ADR-037
**When:** AFTER v6.0 release (rag + integration not required for MCP)
**Parallelism:** Standalone; can parallel with P7

**Brainstorm questions:**
1. MCP server location: `src-v6/bmad-bam-platform/mcp-server/` per spec §9.5 OR separate repo?
2. Transport: stdio confirmed by spec
3. Auth: fs-permission per spec — which exact permission model?
4. Tools exposed (per spec §9.5):
   - query-pattern, query-fragment, list-personas, get-persona-memory, record-decision, query-gate, record-gate-evidence, list-installed-modules
5. Should MCP server be its own skill (`bmad-bam-mcp`) or just a server binary?
6. Integration with Claude Code via `.mcp.json` config
7. Testing strategy: how to test stdio MCP without actually running a session?

**Deliverables:**
- `src-v6/bmad-bam-platform/mcp-server/` directory (or new module)
- Server implementation (Node.js or Python — recommend Python per spec's BAM language convention)
- Tool implementations for 8 tools per spec §9.5 table
- README documenting setup + `.mcp.json` snippet
- Tests for MCP server (mock + integration)
- ADR-037 (MCP transport + auth + tool inventory decisions)
- Spec changelog row v1.1 (MCP server added)
- Customize-template overlay (none needed for MCP server itself)

**Cross-validation:**
- [ ] Universal checklist §4
- [ ] MCP server runs stdio transport correctly
- [ ] All 8 tools per §9.5 implemented + tested
- [ ] fs-permission auth works (no escalation outside `_bmad/`)
- [ ] `.mcp.json` snippet validates against MCP spec

**Risk:**
- R-MCP.1: stdio transport may have edge cases not in spec — mitigation: explicit test suite per tool
- R-MCP.2: fs-permission scope creep — mitigation: hard-code allowed dirs at server start

---

### Wave P7 — `bmad-bam-rag` (Nova continues)

| TL;DR | |
|---|---|
| **Wave goal** | Build all 8 RAG module skills |
| **Persona** | Nova (continues; no introduction) |
| **Sub-waves** | 2+1 (P7.0 bootstrap / P7.1 Retrieval architecture / P7.2 Optimization+Eval) |
| **Effort** | ~150-200h |
| **Module code** | `bbr` (depends on `bba`+`bbp`) |
| **New gates** | QG-RQ1 (advisory) |
| **Key dep** | After PX-MCP (or parallel) |

**Goal:** 8 rag module skills per spec §5.4. Establish QG-RQ1.

**Effort:** ~150-200h (2 sub-waves)
**ADR range reserved:** ADRs 038-039
**Persona:** Nova (already introduced in P5)

#### P7.0 — RAG module bootstrap (1 PR, ~10-15h)
- module.yaml with `code: bbr`, `team: bam`
- depends-on: bba (per spec §3.2 dep graph)
- `1-foundation/` — reference Nova (no new persona-skill; same Nova as P5)
- **Tier-2 script update:** `--modules bbp,bbd,bba,bbu,bbr`

#### P7.1 — Retrieval architecture (4 skills, ~70-90h)
Skills: design-vector-store, design-hybrid-search, design-graph-rag, design-multi-modal-rag

#### P7.2 — Retrieval optimization + eval (4 skills, ~70-90h)
Skills: design-contextual-retrieval, design-chunking, design-knowledge-graph, design-retrieval-eval

**Brainstorm:**
1. Vector store default: Pinecone / Qdrant / Weaviate / pgvector?
2. Hybrid search fusion: BM25 + dense + sparse order?
3. Chunking strategies: semantic / late / hierarchical — primary?
4. Retrieval eval: precision@k / NDCG / recall@k — primary metric?

**Deliverables:**
- 8 skill dirs under `bmad-bam-rag/<phases>/`
- ~30-35 fragments in `bmad-bam-rag/1-foundation/bmad-bam-agent-nova-rag/resources/` (sub-persona dir for rag-specific Nova content) OR reuse `bmad-bam-ai`'s Nova resources
- ~12-15 patterns
- ~2-3 anti-patterns
- ~5-7 glossary terms
- QG-RQ1 checklist (advisory)
- ADRs 038-039

---

### Wave P8 — `bmad-bam-integration` + **Kai persona introduction**

| TL;DR | |
|---|---|
| **Wave goal** | Build all 13 integration skills; introduce Kai (default arbiter) |
| **Persona** | **Kai** 🔗 NEW — "contract attorney with engineering rigor" |
| **Sub-waves** | 3+1 (P8.0 Kai scaffold / P8.1 Boundary / P8.2 Reliability / P8.3 Verification+Evolution) |
| **Effort** | ~240-300h |
| **Module code** | `bbi` |
| **New gates** | QG-I1, QG-I2, QG-I3 (all blocking) |
| **Key dep** | After P7; Kai activates `mediate-conflict` workflow (built in P11) |

**Goal:** 13 integration skills per spec §5.5. Introduce Kai (default arbiter). Establish QG-I1-3.

**Effort:** ~240-300h (3+1 sub-waves)
**ADR range reserved:** ADRs 040-043
**Persona:** **Kai** 🔗 NEW — "contract attorney with engineering rigor; default arbiter for conflicts" per spec §4.1 + §4.5

#### P8.0 — Kai persona scaffold + module bootstrap (~20-30h)
#### P8.1 — Boundary design (5 skills, ~85-100h)
Skills: design-module-facades, design-cross-module-messaging, design-api-gateway, design-public-api, design-realtime-architecture

#### P8.2 — Reliability patterns (4 skills, ~70-85h)
Skills: design-webhook-system, design-saga-pattern, design-circuit-breaker, design-idempotency-keys

#### P8.3 — Verification & evolution (4 skills, ~65-85h)
Skills: verify-convergence (QG-I1-3), plan-api-versioning, audit-integration, plan-module-extraction

**Brainstorm:**
1. Kai voice: "contract attorney with engineering rigor" — specific phrasings (e.g., "the contract says…", "what's the SLA we're committing to?")
2. Module facade pattern: trait / interface / hexagonal?
3. Cross-module messaging: in-process event bus vs async queue — decision drivers?
4. API versioning: expand-contract vs URL versioning vs header versioning?
5. **CONFLICT MEDIATION** — Kai is default arbiter per spec §4.5. How does Atlas/Nova invoke Kai's `mediate-conflict` workflow (in P11)?

**Deliverables:**
- 13 skill dirs
- Kai persona-skill
- ~50-60 fragments
- ~20-25 patterns
- ~3-4 anti-patterns
- ~7-9 glossary terms
- QG-I1, QG-I2, QG-I3 checklists (all blocking)
- ADRs 040-043
- Customize-template overlays for module-facade contracts

**Cross-validation:**
- [ ] Kai's mediate-conflict workflow (from P11) successfully invokes Kai persona
- [ ] verify-convergence skill produces evidence for QG-I1+I2+I3 simultaneously
- [ ] Cross-module facade contracts: integration module references platform AND data AND ai facades

---

### ▶ v6.1 RELEASE MILESTONE

**Composition:** v6.0 + rag (8) + integration (13) + Kai = **102 module skills + 12 cross-family = 114 total** + 4 personas.

**v6.1 RELEASE GATE checklist:**
- [ ] All P7 + P8 + PX-MCP PRs merged
- [ ] Plan C R(v6.1) — full LLM-side ratification
- [ ] §15 patterns still validated
- [ ] QG-I1-3 + QG-RQ1 + MCP infrastructure all evidenced
- [ ] Spec at v1.1 (post-MCP) or v1.2 if MCP shipped in v6.0
- [ ] CHANGELOG.md entry for v6.1
- [ ] Tag: `v6.1.0`

---

### Wave P9 — `bmad-bam-trust` + **Cipher persona introduction** + Vertical packs

| TL;DR | |
|---|---|
| **Wave goal** | Build all 16 trust skills + 6-8 vertical add-on packs; introduce Cipher |
| **Persona** | **Cipher** 🔐 NEW — "paranoid auditor: assume breach, log everything" |
| **Sub-waves** | 4+1 (P9.0 Cipher scaffold / P9.1 Zero-trust / P9.2 Data protection / P9.3 AI safety+regulatory / P9.4 Operational+Verticals) |
| **Effort** | ~300-400h |
| **Module code** | `bbt` |
| **New gates** | QG-S1, QG-S2 (full), QG-C1, QG-C2, QG-C3 |
| **Key dep** | After v6.1 release |

**Goal:** 16 trust skills per spec §5.6 + 6-8 vertical add-on packs per spec §6.7. Introduce Cipher. Establish QG-S1, S2 (full), C1-3.

**Effort:** ~300-400h (4+1 sub-waves; +PX-VerticalPacks)
**ADR range reserved:** ADRs 044-049
**Persona:** **Cipher** 🔐 NEW — "paranoid auditor: assume breach, log everything" per spec §4.1

#### P9.0 — Cipher persona scaffold + module bootstrap (~20-30h)
#### P9.1 — Zero-trust & access (4 skills, ~70-85h)
Skills: design-zero-trust, design-rbac-abac, design-key-management, design-audit-trail

#### P9.2 — Data protection & consent (4 skills, ~70-85h)
Skills: design-pii-handling, design-consent-management, design-content-moderation, design-data-loss-prevention

#### P9.3 — AI safety & regulatory (4 skills, ~70-85h)
Skills: design-ai-agent-identity, design-ai-regulatory-tracking, design-model-card-publishing, map-compliance

#### P9.4 — Operational trust + Vertical Packs (4 skills + 6-8 vertical packs, ~100-140h)
Skills: design-residency-controls, design-vulnerability-mgmt, verify-trust-controls, audit-trust-posture
+ Vertical packs (HIPAA, PCI-DSS, SOC2, GDPR, FedRAMP, ISO27001, EU-AI-Act, NIST-AI-RMF — pick 6-8)

**Brainstorm:**
1. Cipher voice: "paranoid auditor" — specific phrasings
2. RBAC vs ABAC default? Both?
3. PII handling: at-rest + in-transit + in-AI-context — distinct fragments?
4. Vertical packs structure (per spec §6.7 manifest.yaml): pack-id, regulations, controls, evidence-requirements
5. Cross-persona: Cipher's verify-trust-controls calls Rune's design-observability for evidence — ordering?

**Deliverables:**
- 16 skill dirs
- Cipher persona-skill
- 6-8 vertical add-on packs at `bmad-bam-trust/1-foundation/bmad-bam-agent-cipher/resources/vertical-addons/<pack-id>/`
- ~80-100 fragments (largest fragment growth in P9)
- ~35-45 patterns
- ~5-7 anti-patterns
- ~10-12 glossary terms
- QG-S1, QG-S2 (full), QG-C1, QG-C2, QG-C3 checklists
- ADRs 044-049

---

### Wave P10 — `bmad-bam-ops` + **Rune persona introduction**

| TL;DR | |
|---|---|
| **Wave goal** | Build all 16 ops skills; introduce Rune (final persona) |
| **Persona** | **Rune** ⚙️ NEW — "YAML + Helm chart fragments, SLO talk, postmortem candor" |
| **Sub-waves** | 4+1 (P10.0 Rune scaffold / P10.1 Observability+SLO / P10.2 Incident+Resilience / P10.3 Deployment+DR / P10.4 Customer+Verification) |
| **Effort** | ~300-400h |
| **Module code** | `bbo` |
| **New gates** | QG-O1-3, QG-R1-3, QG-D1, QG-DR2, QG-P1 (composite) |
| **Key dep** | After P9; enables full RG-Launch composite at v6.2 |

**Goal:** 16 ops skills per spec §5.7. Introduce Rune. Establish QG-O1-3, R1-3, D1, DR2, P1 (composite).

**Effort:** ~300-400h (4+1 sub-waves)
**ADR range reserved:** ADRs 050-055
**Persona:** **Rune** ⚙️ NEW — "YAML + Helm chart fragments, SLO talk, postmortem candor" per spec §4.1

#### P10.0 — Rune persona scaffold + module bootstrap
#### P10.1 — Observability & SLO (4 skills, ~70-85h)
#### P10.2 — Incident & resilience (4 skills, ~70-85h)
#### P10.3 — Deployment & DR (4 skills, ~70-85h)
#### P10.4 — Customer success + verification (4 skills, ~70-85h)

**Brainstorm:**
1. Rune voice: YAML + Helm fragments — specific phrasings
2. Observability stack: OTel + Prometheus + Grafana vs vendor (Datadog/New Relic)?
3. Runbook automation: PagerDuty Rundeck vs Sentry Workflows?
4. Feature flags: build vs buy (LaunchDarkly/Unleash/PostHog/Statsig)?
5. DR drill frequency: per spec QG-DR2 = annual; runbook automated?

**Deliverables:**
- 16 skill dirs
- Rune persona-skill
- ~70-80 fragments
- ~30-35 patterns
- ~5-7 anti-patterns
- ~10-12 glossary terms
- QG-O1, QG-O2, QG-O3, QG-R1, QG-R2, QG-R3, QG-D1, QG-DR2, QG-P1 (P1 composite)
- ADRs 050-055

---

### ▶ v6.2 RELEASE MILESTONE — Full RG-Launch

**Composition:** v6.1 + trust (16) + ops (16) = **134 module skills + 12 cross-family = 146 total** + 6 personas (Atlas, Nova, Iris, Kai, Cipher, Rune).

**v6.2 RELEASE GATE checklist:**
- [ ] All P9 + P10 PRs merged
- [ ] Plan C R(v6.2) — full LLM-side ratification with all 8 modules installed
- [ ] §15 patterns validated
- [ ] **Full RG-Launch composite** — all required QGs evidenced
- [ ] All 26 anti-patterns documented (PX-AntiPatterns consolidated)
- [ ] All 40+ glossary terms documented (PX-Glossary consolidated)
- [ ] All 15 customize-templates landed (PX-CustomizeTpl consolidated)
- [ ] OpenSRE evaluation documented (spec §10.1: "OpenSRE evaluation decision" in v6.2)
- [ ] Spec at v1.2
- [ ] CHANGELOG.md entry for v6.2
- [ ] Tag: `v6.2.0`

---

### Wave PX-Migration — v3 → v6 migration tooling

**Goal:** Build `bmad-bam-migrate-v2` workflow per spec §13.

**Effort:** ~75-100h
**ADR range reserved:** ADR-056
**Parallelism:** Can run in parallel with P3-P4

**Deliverables:**
- `bmad-bam-platform/9-infrastructure/bmad-bam-migrate-v2/` skill
- Migration steps from v3 to v6 mapping per spec §13.1
- Migration completion checklist per spec §13.2
- v3 deprecation timeline doc (see §16 of this roadmap)
- ADR-056 (v3 → v6 migration tooling decisions)

---

## 4. Universal cross-validation checklist (every PR)

Claude runs these on **EVERY content PR (Wave P3+):**

### Discipline checks
- [ ] Branch name follows convention: `feat/v6-<wave-id>-<short-desc>` (e.g., `feat/v6-p3-1-foundation`)
- [ ] PR base targets correct parent branch (if stacked) OR `feat/bam-v3-pure-kb` (if fresh)
- [ ] Commit messages follow conventional commits (feat/fix/docs/chore/test)
- [ ] No `git push --force` in PR history
- [ ] Co-Authored-By tag present where AI contributed

### Tier-1 audit (8 checks a-h)
- [ ] `tests/audit-marketplace.sh` exit 0
- [ ] `tests/audit-marketplace-fixtures.sh` 12+/12+ pass
- [ ] Real marketplace passes all 8 checks
- [ ] No new stale-path leakage (check g)
- [ ] No new fictional `bmad run` (check h)

### Tier-2 (BAM_TIER2=1)
- [ ] **Tier-2 script updated to include this wave's module code in `--modules` arg**
- [ ] **Tier-2 script's skill-existence loop extended to verify this wave's skills**
- [ ] `BAM_TIER2=1 tests/integration/run-real-install.sh` exit 0
- [ ] Strategy 1 confirmed for all installed modules (config.yaml + module-help.csv per module)
- [ ] All new skills land at `.claude/skills/` (tool-specific path)
- [ ] Sentinel emits at `_bmad-output/<code>/project-context.md` for each module

### Other Tier-1
- [ ] `tests/wave-0/run-smoke-test.sh` PASS
- [ ] `tests/p2/run-real-install-test.sh` PASS
- [ ] Each skill's `tests/smoke-test.sh` PASS

### Spec discipline
- [ ] If wave adds new module: spec §3.1 module count consistent
- [ ] If wave introduces new persona: spec §4.1 persona row added (or matches existing)
- [ ] Spec §5.X workflow count matches actual delivered skills
- [ ] Spec changelog row added (or no bump if no semantic shape change)
- [ ] If new ADR: INDEX.md row added; ADR number from reserved range
- [ ] If new fragment/pattern category: spec §6.X updated
- [ ] **§15 patterns still pass for relevant wave** (e.g., Wave P5 verifies §15.3 persona invocation works for Nova)

### Frontmatter discipline (per std-frontmatter convention map)
- [ ] All step files have `step_id`, `auto_runnable`, `gate`, `inputs`, `outputs` (snake_case)
- [ ] All skill manifests have `latency_budget`, `recommended_capabilities`, `minimum_persona_version` (snake_case)
- [ ] customize.toml keys use snake_case (`persistent_facts`, `activation_steps_append`)
- [ ] Fragment/pattern frontmatter uses snake_case (`tested_against`, `last_reviewed`)
- [ ] **Anti-patterns have `kind: anti-pattern` frontmatter per spec §6.5**
- [ ] **Each fragment has `last_reviewed: <YYYY-MM-DD>` per spec §6.8 staleness governance**
- [ ] ADR frontmatter uses kebab-case (MADR-lite external convention)

### Persona introduction (waves that add a new persona)
- [ ] `<module>/1-foundation/bmad-bam-agent-<persona>/` directory created
- [ ] SKILL.md describes voice, role, identity, communication style, principles per spec §4.1
- [ ] customize.toml uses `[agent]` namespace
- [ ] customize.toml persistent_facts include universal-glob + `{skill-root}/resources/...`
- [ ] **Module.yaml `agents:` block has entry with `code`, `name`, `title`, `icon`, `team: bam`, `description`** (universal `team: bam` per BAM-family convention)
- [ ] Persona voice distinct from prior personas (review SKILL.md prose)

### Cross-module fragment reference (Wave P4+)
- [ ] Cross-module fragment loads tested via tool-aware path fallback (`.claude/skills/...` → `.cursor/skills/...` → `_bmad/<other-code>/...`)
- [ ] Plan C R(N) ratification recorded for first cross-module load in this wave

### Multi-module install (Wave P4+)
- [ ] **Dep-graph install test**: `bmad install <child-module>` auto-pulls parent (e.g., `bmad install bbr` pulls bba + bbp)
- [ ] **Multi-module concurrent install**: all installed modules' Tier-2 PASSes

### Quality gates
- [ ] Each new QG has a checklist file at `<module>/1-foundation/bmad-bam-agent-<persona>/resources/checklists/QG-<id>.md`
- [ ] Each QG checklist has frontmatter per spec §8.1 (id, title, module, phase, criticality, depends-on, evidence-depends-on, auto-checkable %, human-review %)
- [ ] Each QG has explicit criteria sections
- [ ] Cross-gate dependencies (depends-on) reference existing gates

### Cross-cutting deliverables
- [ ] Anti-patterns added to module's `resources/anti-patterns/` (per spec §6.5)
- [ ] Glossary terms added (location TBD per PX-Glossary consolidation strategy)
- [ ] Customize-template overlay added if assigned to this wave (per §11 of this roadmap)

### PR scope discipline (M3)

- [ ] **PR scope: each PR addresses ONE wave/sub-wave.** Cross-wave fixes split into separate PRs unless mechanically inseparable (then explicit justification in PR description).
- [ ] If PR touches files outside its declared wave scope (e.g., fixing a P3 fragment while working on P5), PR description has "Cross-wave touch justification" section.
- [ ] Multi-wave PRs trigger Claude's "scope-creep" warning in review.

### Content quality bounds (M6, M7)

- [ ] **Fragment size: 200-900 lines** (target 400-600 per spec §6.3). Outside range = audit FAIL or warning. Below 200 = under-developed; above 900 = bloat (split into sub-fragments).
- [ ] **Workflow step count: 4-10 steps.** Outside range = warning + rationale in skill manifest. <4 = under-decomposed; >10 = should split into sub-workflows.
- [ ] **Pattern body size: 150-500 lines** (mostly decision-matrix + schema; less prose than fragments).

### Cross-skill reference convention (M8)

- [ ] **Cross-fragment references use `[[fragment-name]]` markdown wiki-link syntax** (spec §6.6 standards convention).
- [ ] Implementation: consuming step file uses Read tool with tool-aware path fallback (`.claude/skills/<persona-skill>/resources/fragments/<name>.md` → `.cursor/skills/...` → `_bmad/<code>/...`).
- [ ] Wiki-link resolution: at activation time, BAM's MCP server (PX-MCP) resolves wiki-links to actual paths. Until MCP server lands, consuming step files use explicit Read calls with path-fallback list.

### BMM/TEA compatibility (v4 — see §19 for full rules)

- [ ] **`module-help.csv` 13-column header verbatim match** with BMM (§19.1): `module,skill,display-name,menu-code,description,action,args,phase,preceded-by,followed-by,required,output-location,outputs`
- [ ] **All 13 columns populated per skill row** (no empty cells in `module`, `skill`, `display-name`, `menu-code`, `phase`, `output-location`, `outputs`)
- [ ] **`output-location` value from BMM enum:** `output_folder` | `planning_artifacts` | `implementation_artifacts` | `project-knowledge` (no BAM-invented values — §19.2)
- [ ] **`phase` column uses BMM lifecycle enum:** `1-analysis` | `2-planning` | `3-solutioning` | `4-implementation` | `anytime` — NOT the directory name (§19.3)
- [ ] **`preceded-by` references existing skill name** (or empty); workflow chain has no cycles (§19.5)
- [ ] **`menu-code` is 3-char Z-prefix** for BAM workflows (no collision with BMM 2-char) (§19.7)
- [ ] **`display-name` ≤4 words, ≤30 chars** (§19.20)
- [ ] **`required` boolean populated** per §19.14 per-module table
- [ ] **`_meta` row present** at top of module-help.csv pointing to `_bmad/<mod>/llms.txt` or `<docs-site>/llms.txt` (§19.8)
- [ ] **`tools/generate-llms-txt.sh <mod>`** produces a valid `llms.txt` from module-help.csv + SKILL.md headers
- [ ] **Cross-persona references** use same tool-aware fallback as cross-module (§19.9)
- [ ] **Module.yaml `agents:` block menu-code matches** module-help.csv menu-code (no drift between manifests)

---

## 5. Per-wave PR pre-merge gate

Before Claude approves PR for merge:

1. **All universal cross-validation passes** (§4 above)
2. **Wave-specific cross-validation passes** (§3 per wave)
3. **Risk register acknowledged** — wave-specific risks documented as resolved or accepted
4. **No regression on prior waves** — full Tier-1 + Tier-2 sweep against post-merge state
5. **Spec drift check** — spec doc still consistent with delivered code
6. **ADR coverage** — every significant decision recorded; ADR number from reserved range
7. **Plan C ratification** (mandatory at v6.0/v6.1/v6.2 releases + BMAD submodule upgrades + activation-mechanic changes; OPTIONAL at module-introduction waves where Tier-2 covers install integrity)
8. **Wave completion definition** — wave's per-completion criteria satisfied

---

## 6. Risk catalog (cross-wave)

| Risk | Likely waves | Mitigation |
|---|---|---|
| Fragment count creep beyond spec ceiling (550) | All content waves | Per-wave audit; cap ~5/skill; reuse aggressively |
| Quality gate explosion (28+ checklists) | P5, P9, P10 | Establish gates per-wave; each gate independently evidenced |
| Cross-module fragment reference breaks at activation | P4+ | Plan C R(N) ratification on first cross-module reference (P4) |
| Cross-persona invocation untested | P5, P8 | Explicit cross-persona test in P5.6 + P8 mediate-conflict |
| Persona voice drift | P5, P6, P8, P9, P10 | Brainstorm voice deeply per spec §4.1; review SKILL.md prose |
| Multi-module install fails | P4+ | Tier-2 BAM_TIER2=1 catches; CI runs it |
| Spec drift vs implementation | All waves | Per-wave spec changelog discipline |
| Vertical pack scope creep (P9) | P9 | Cap at 6-8 packs; defer remaining to v6.x |
| MCP server complexity (PX-MCP) | PX-MCP | Single deliverable; spec the transport + auth upfront |
| Effort estimate slippage | All waves | Track per-wave actuals vs estimate; replan if 2σ off |
| v6.0 deadline pressure | P3-P6 | Discipline-driven; honor brainstorm→design→plan→implement |
| Knowledge currency drift | All content waves | Per spec §6.8 + last_reviewed thresholds; refresh-knowledge workflow in P11 |
| Audit drift over time (false positives) | All waves | Per-release audit-maintenance pass (see §14) |
| Mid-wave architectural discovery | All content waves | Protocol in §15 — file as Concern; defer to dedicated wave OR fold if small |
| **BMAD upstream API change** (H5) | Any wave; high impact | Likelihood: MEDIUM (BMAD actively developed). Impact: HIGH (BAM install pipeline depends). Mitigation: BMAD submodule pinned via git; emergency-bump procedure (see §14) if upstream lands fix BAM depends on. Per spec §17.1: BMAD v7 = full spec re-evaluation. |
| **Submodule security advisory** (H6) | Any wave | Treat as priority-skip-queue chore PR; Plan C ratification post-bump. Sub-protocol in §14. |
| **Tier-2 runtime growth** (M2) | P5+ (each module adds install time) | Tier-2 current: ~30s. Each new module adds ~10-30s. SLO: <5 min total. Alert >7 min; investigate >10 min. Mitigation: per-wave Tier-2 timing recorded; CI parallel-installs if needed. |
| **Wave health: effort overrun** (M10) | All waves | Trigger: actual effort >1.5× estimate at 50% completion → re-brainstorm scope. >2× at any point → halt + replan. Recorded in §18 effort tracking sheet. |
| **Plan C person-availability** (M1) | Release-gate waves | Plan C requires user in real Claude Code IDE. If unavailable >2 weeks at release gate, autonomous-subagent ratification (R1-R4 methodology) is acceptable as interim gate with disclaimer in PLAN-C-RATIFICATION.md. See §17. |
| **BMM divergence accumulation** (v4 H6) | All waves | If BAM works around BMM bugs without filing upstream, divergence compounds. Mitigation: upstream contribution pathway in §19.10; quarterly `_bmad/_memory/<persona>/upstream-issues/` review; close obsolete entries when BMAD ships fixes. |
| **TEA submodule drift** (v4 M2) | All waves | `external/bmad-tea` upstream may evolve patterns BAM should adopt. Mitigation: quarterly sync cadence per §19.12; submodule-bump commit or pin-and-issue (never silent skip). |
| **BMAD-main forward-compat regression** (v4 M1) | All waves; revealed earliest by CI | BMAD HEAD may break BAM's install pipeline. Mitigation: nightly CI workflow per §19.11 + §14.4; auto-files issue on failure. |
| **Multi-module sentinel aggregation context-budget growth** (v4 C4, revised) | P4+ (each new BAM module adds a sentinel) | Premise re-checked: BAM uses per-module subdir convention `{output_folder}/<code>/project-context.md`, already matched by BMM strict glob. Real concern: LLM context payload grows linearly with module count. Mitigation: spec §6.10 + §15.11 context-budget guard; aggregation test per §19.4. |

---

## 7. Persona introduction sequencing matrix

| Wave | Persona introduced | Brainstorm depth | Voice tone alignment | Cross-persona contracts | `team:` |
|---|---|---|---|---|---|
| Pre-roadmap (P2.1) | Atlas | done | "structural engineer at whiteboard" | n/a | `bam` |
| P3 | (Atlas continues) | n/a | (consistent) | n/a | `bam` |
| P4 | (Atlas continues) | n/a | (consistent) | n/a | `bam` |
| P5 | **Nova** | full | "gradient-descent metaphors" | Atlas + Nova cross-skill access | `bam` |
| P6 | **Iris** | full | "theme tokens, accessibility-first" | Atlas + Nova + Iris coexist | `bam` |
| P7 | (Nova continues) | n/a | (consistent) | n/a | `bam` |
| P8 | **Kai** | full | "contract attorney" | Kai = default arbiter (§4.5) | `bam` |
| P9 | **Cipher** | full | "paranoid auditor" | Cipher ↔ Rune at P10 | `bam` |
| P10 | **Rune** | full | "YAML + Helm chart fragments" | All 6 personas coexist | `bam` |

**Universal:** All 6 BAM personas use `team: bam` (BAM-family team — established Concern 7 / ADR 009).

---

## 8. Brainstorm prompt library (paste-ready for RDP, all 10 wave starts)

### Universal sub-wave prompt template (H8)

Use this for any sub-wave (P3.X, P4.X, P5.X, etc.). Fill in the deltas from the per-sub-wave table below:

```
Topic: Wave {WAVE-ID} — {SUB-WAVE-NAME} ({N} skills)

Spec reference: docs/v6-final-architecture.md §{SPEC-§}
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave {WAVE-ID}

Skills to design (per spec §5.X):
  {LIST OF SKILLS}

Quality gates to establish:
  {LIST OF QGs}

Key decisions to lock (brainstorm):
  {SUB-WAVE SPECIFIC DECISION QUESTIONS}

Workflow pattern: each skill follows design-tenancy-model template
(CEV mode, 4-10 steps, customize.toml [workflow] namespace, universal-glob in
persistent_facts, output = design doc + ADR + QG evidence).

Acceptance criteria:
  - Per Roadmap §4 universal cross-validation checklist
  - Per Wave {WAVE-ID} §3 wave-specific checklist
  - All cross-cutting deliverables (anti-patterns, glossary terms,
    customize-template overlays per Roadmap §11)
  - ADR(s) from reserved range (see Roadmap §13)
  - Tier-2 script update (add module code to --modules if new module)

Branch: feat/v6-{wave-id}-{short-desc}
Base: feat/bam-v3-pure-kb (or current main after prior waves)
```

### Per-sub-wave deltas (fill into template above)

**Wave P3 (already-canonical platform completion):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P3.1 Foundation | 4 | modular-monolith, deployment-topology, finops-model, tenant-tier-model | QG-F1 (blocking), QG-M1 (partial) | DDD bounded contexts vs ports/adapters; blue-green vs canary; per-tenant cost attribution; tier defaults (5 tiers vs flexible) |
| P3.2 Lifecycle | 4 | tenant-onboarding, tenant-offboarding, multi-tenant-testing, tenant-migration-tooling | QG-M2 refine, QG-D1 partial | SMB self-serve vs sales-assisted; hard/soft/anonymize delete; test catalogue per isolation model; tier vs region migrations |
| P3.3 Commercial | 5 | billing-integration, payment-tenant-mapping, tax-compliance, rate-limit-per-tenant, tenant-rate-arbitrage | QG-TC4 | Stripe-first vs provider-agnostic; provider IDs vs tenant abstraction; jurisdictions count; rate algorithm; arbitrage heuristics |
| P3.4 Brownfield | 2 | analyze-existing-tenancy, plan-tenancy-retrofit | (advisory) | Assessment-only vs gap-report-output; no-tenancy-boundary handling |

**Wave P4 (data, Atlas continues):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P4.0 Bootstrap | 0 | (module scaffold only) | n/a | Atlas resource ownership: data fragments in platform's Atlas vs new bmad-bam-data/Atlas-data sub-skill |
| P4.1 Storage | 5 | schema-architecture, cdc-pipeline, event-sourcing, cqrs, lakehouse | QG-DA1 partial | CDC tool default (Debezium/Outbox/PG); lakehouse format (Iceberg/Delta/Hudi); cross-module fragment refs |
| P4.2 Specialized | 5 | feature-store, stream-processing, search-index, graph-database, synthetic-data | QG-DA1 refine | Specialized-system inclusion criteria; stream broker default (Kafka/Pulsar) |
| P4.3 Lifecycle | 4 | data-export-formats, data-residency, retention-deletion, plan-data-migration | QG-DA1 full | Residency vs tenancy interaction; cross-module ref to platform's tenant-offboarding |

**Wave P5 (ai, Nova introduction):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P5.0 Nova scaffold | 0 | (Nova persona + module bootstrap) | n/a | Nova voice (gradient-descent metaphors); 3-5 example phrasings; Nova mirror Atlas structure |
| P5.1 Routing+Orchestration | 4 | model-routing, agent-orchestration, agent-collaboration-protocol, tool-execution | QG-M3 partial | Multi-provider routing default; planner-executor vs swarm; sandbox vendor |
| P5.2 Memory+Prompt | 5 | memory-architecture, agent-memory-compression, self-improving-agent, prompt-engineering, prompt-architecture | QG-M3 partial | Memory tier defaults; long-context summarization; prompt construction discipline |
| P5.3 Safety+Isolation | 5 | prompt-injection-defense, prompt-leak-prevention, tenant-prompt-isolation, model-cache-isolation, safety-guardrails | QG-S2 partial | Tenant isolation in shared models; KV cache attack surface |
| P5.4 Eval | 5 | offline-eval, online-eval, adversarial-eval, bias-fairness-eval, eval-first-spec | QG-M3 refine | Eval framework defaults (LangSmith/Braintrust/Inspect); production sampling rate |
| P5.5 Lifecycle+FinOps | 4 | shadow-mode, model-lifecycle, ai-finops, ai-safety-policy | QG-M3 refine | Shadow promotion criteria; deprecation UX; token attribution per call/provider/tenant |
| P5.6 Roadmap+Synthesis | 4 | ai-product-roadmap, ai-runtime (gates QG-M3), audit-ai-runtime, plan-ai-bolt-on | QG-M3 (full, blocking) | Cross-persona invocation test: Atlas's design-tenancy-model output feeds design-ai-runtime |

**Wave P6 (ux, Iris introduction):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P6.0 Iris scaffold | 0 | (Iris persona + module bootstrap) | n/a | Iris voice (theme tokens, accessibility-first); 3-5 example phrasings |
| P6.1 Branding+Theme | 4 | theme-token-architecture, accessibility-cohort, multi-locale, white-label | QG-UX1 partial | Theme token system (CSS vars vs design-tokens-w3c); WCAG per tier; locale + RTL |
| P6.2 Tenant+Agent UX | 4 | tenant-ui-customization, agent-ui-patterns, trust-ui, progressive-disclosure-ai | QG-UX1 refine | Agent UI preference order (chat/command-palette/sidebar/embedded); confidence indicators |
| P6.3 Lifecycle UX | 4 | empty-state-ai, onboarding-ux, feature-deprecation-ux, audit-ux-consistency | QG-UX1 full (advisory) | AI-generated empty states; first-run experience; deprecation communication |

**Wave P11 (cross-family workflows):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P11.1 Essential | 6 | bmad-bam-start, record-decision, refresh-knowledge, waive-gate, mediate-conflict, design-build-vs-buy | n/a | bmad-bam-start branching logic; ADR workflow output location; refresh-knowledge integration with §6.8 thresholds |
| P11.2 Release-critical | 6 | bmad-bam-backup, bmad-bam-restore, bmad-bam-upgrade, bmad-bam-rollback, verify-production-readiness-final, release-gate-orchestrator | (RG support) | Backup format + retention; upgrade procedure per §10.4; composite release-gate orchestration |

**Wave P7 (rag, Nova continues):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P7.0 Bootstrap | 0 | (module scaffold; Nova continues) | n/a | Nova ownership of rag fragments; depends-on chain |
| P7.1 Retrieval architecture | 4 | vector-store, hybrid-search, graph-rag, multi-modal-rag | QG-RQ1 partial | Vector store default (Pinecone/Qdrant/Weaviate/pgvector); hybrid fusion order |
| P7.2 Optimization+Eval | 4 | contextual-retrieval, chunking, knowledge-graph, retrieval-eval | QG-RQ1 full (advisory) | Chunking strategy default; retrieval eval primary metric |

**Wave P8 (integration, Kai introduction):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P8.0 Kai scaffold | 0 | (Kai persona + module bootstrap) | n/a | Kai voice (contract attorney); arbiter role per §4.5; mediate-conflict invocation |
| P8.1 Boundary | 5 | module-facades, cross-module-messaging, api-gateway, public-api, realtime-architecture | QG-I1 partial | Facade pattern; in-process vs async; real-time tech stack |
| P8.2 Reliability | 4 | webhook-system, saga-pattern, circuit-breaker, idempotency-keys | QG-I2 partial | Webhook delivery guarantees; saga vs 2PC; circuit breaker thresholds |
| P8.3 Verification+Evolution | 4 | verify-convergence (QG-I1-3), plan-api-versioning, audit-integration, plan-module-extraction | QG-I1-3 (full, blocking) | API versioning (expand-contract/URL/header); strangler-fig extraction |

**Wave P9 (trust, Cipher + vertical packs):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P9.0 Cipher scaffold | 0 | (Cipher persona + module bootstrap) | n/a | Cipher voice (paranoid auditor); 3-5 phrasings |
| P9.1 Zero-trust+Access | 4 | zero-trust, rbac-abac, key-management, audit-trail | QG-S1 partial | mTLS pattern; RBAC vs ABAC default; BYOK/HSM |
| P9.2 Data protection | 4 | pii-handling, consent-management, content-moderation, data-loss-prevention | QG-C1 partial | At-rest + in-transit + in-AI-context PII handling |
| P9.3 AI safety+Regulatory | 4 | ai-agent-identity, ai-regulatory-tracking, model-card-publishing, map-compliance | QG-S2 (full), QG-C1 refine | EU AI Act + US state law monitoring; model card schema |
| P9.4 Operational+Verticals | 4 + 6-8 packs | residency-controls, vulnerability-mgmt, verify-trust-controls, audit-trust-posture + HIPAA/PCI-DSS/SOC2/GDPR/FedRAMP/ISO27001/EU-AI-Act/NIST-AI-RMF vertical packs | QG-S1 (full), QG-C2, QG-C3 | Vertical pack manifest.yaml schema per §6.7; pack count cap (6-8) |

**Wave P10 (ops, Rune introduction):**

| Sub-wave | N | Skills | QGs | Key decisions |
|---|---|---|---|---|
| P10.0 Rune scaffold | 0 | (Rune persona + module bootstrap) | n/a | Rune voice (YAML + Helm); SLO talk; postmortem candor |
| P10.1 Observability+SLO | 4 | observability, slo-error-budget, runbook-system, runbook-automation | QG-O1 partial, QG-R1 partial | OTel + Prometheus default vs vendor; per-service + per-tenant SLOs |
| P10.2 Incident+Resilience | 4 | incident-response, on-call-handoff, chaos-engineering, canary-analysis | QG-R1 refine, QG-R2 | On-call solo+AI variant; game-day cadence |
| P10.3 Deployment+DR | 4 | feature-flag-system, disaster-recovery, ai-cost-spike-alert, tenant-data-sovereignty-validator | QG-D1, QG-DR2, QG-O3 partial | Feature flag tool default; RPO/RTO targets; cost-spike thresholds |
| P10.4 Customer+Verification | 4 | customer-success-tooling, agent-debugging-tools, verify-production-readiness (QG-O1-3, QG-R1-3, QG-D1, QG-P1), audit-operations | QG-P1 (composite, blocking) | Customer-success observability; agent debugging in prod; composite production-readiness |

---

### P3.1 — Foundation Skills

```
Topic: Wave P3.1 — bmad-bam-platform Foundation Skills (4 skills)

Spec reference: docs/v6-final-architecture.md §5.1 skills 2-5
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave P3.1

Skills to design:
  - bmad-bam-design-modular-monolith (bounded contexts, ports & adapters)
  - bmad-bam-design-deployment-topology (blue-green/canary + tenant cohorts)
  - bmad-bam-design-finops-model (per-tenant cost attribution, quotas)
  - bmad-bam-design-tenant-tier-model (free/starter/pro/business/enterprise)

Quality gates to establish:
  - QG-F1 (Foundation gate; blocking)
  - QG-M1 (Module Architecture; blocking; partial — refined in P3.2)

Key decisions to lock (brainstorm):
  1. Each skill's decision-space scope (which trade-off matrix?)
  2. Fragment density per skill (target ≤5)
  3. Cross-skill fragment reuse (does design-finops-model share fragments with design-tenancy-model?)
  4. QG-F1 evidence requirements (what does each skill produce?)
  5. design-tenant-tier-model: 5 default tiers or flexible?
  6. Anti-patterns (~3-4 introduced this sub-wave)
  7. Glossary terms (~5-7 introduced)

Workflow pattern: each skill follows design-tenancy-model template (CEV mode, 5-7 steps).

Acceptance: per Roadmap §4 universal checklist + Wave P3.1 §3.

Branch: feat/v6-p3-1-foundation
Base: feat/bam-v3-pure-kb (or current main)
```

### P4.0 — Data Module Bootstrap

```
Topic: Wave P4.0 — bmad-bam-data module bootstrap (no skills yet)

Spec reference: docs/v6-final-architecture.md §5.2; §3.1; §3.2 (dep graph)
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave P4.0

Goal: scaffold the second BAM module (data); module.yaml + module-help.csv + phase dirs.

Brainstorm questions:
  1. Where does data's "Atlas resources" live? Atlas owns BOTH platform AND data (spec §3.1) —
     do data fragments live in platform's bmad-bam-agent-atlas/resources/ (cross-referenced) OR
     in a new bmad-bam-data/1-foundation/bmad-bam-agent-atlas-data/ sub-skill?
  2. Module code: `bbd` confirmed
  3. Phase structure: 1-foundation/, 2-storage/, 3-data-lifecycle/, 9-infrastructure/?
  4. Should the smoke-test/finalize duplicate (each module needs its own) or be shared?

Acceptance: per Roadmap §4 + Wave P4.0 §3.

Branch: feat/v6-p4-0-data-bootstrap
```

### P5.0 — AI Module + Nova Persona Introduction

```
Topic: Wave P5.0 — Nova persona introduction + bmad-bam-ai module bootstrap

Spec reference: docs/v6-final-architecture.md §4.1 (Nova voice), §5.3 (27 ai skills)
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave P5.0

Nova introduction is the SECOND persona event in BAM history (Atlas was first).
This sub-wave establishes Nova's voice, role, principles + scaffolds the ai module.

Brainstorm questions:
  1. Nova voice: "Gradient-descent metaphors" per spec §4.1 — write 3-5 example phrasings:
     - When Nova talks about model selection: ?
     - When Nova talks about prompt design: ?
     - When Nova talks about eval: ?
     - When Nova disagrees with Atlas: ?
  2. Nova SKILL.md mirror Atlas's structure exactly (BMM-canonical per ADR 008)?
  3. Initial Nova fragments to seed (~3-5 to bootstrap, NOT all 120+ that come in P5.1-P5.6)
  4. Module code: `bba` confirmed
  5. Phase structure for ai: 1-foundation/, 2-routing/, 3-memory/, 4-safety/, 5-eval/, 6-lifecycle/, 9-infrastructure/?
  6. Nova's auto-load resources: which fragments are foundational vs per-cluster?

Acceptance: per Roadmap §4 + persona-introduction checks.

Branch: feat/v6-p5-0-nova-introduction
```

### P5.1 — AI Routing & Orchestration

```
Topic: Wave P5.1 — bmad-bam-ai Routing & Orchestration (4 skills)

Spec reference: docs/v6-final-architecture.md §5.3 Cluster: routing-and-orchestration
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave P5.1

Skills:
  - bmad-bam-design-model-routing (cost / capability-aware Claude/GPT/Gemini)
  - bmad-bam-design-agent-orchestration (planner-executor, supervisor-worker, swarm)
  - bmad-bam-design-agent-collaboration-protocol (agent-to-agent)
  - bmad-bam-design-tool-execution (sandboxes, computer use, code execution)

Quality gates: QG-M3 partial (full in P5.6).

Brainstorm questions:
  1. Model-routing patterns: Claude-cost-tier vs OpenAI-capability-tier vs Multi-provider-fallback — primary recommendation?
  2. Agent orchestration: when do you use planner-executor vs swarm?
  3. Tool execution sandbox: which sandbox (Anthropic / OpenAI / E2B)?
  4. Cross-skill references: which earlier Atlas fragments (e.g., design-tenancy-model) inform Nova's design-tenant-prompt-isolation (P5.3)?
  5. Eval discipline: does design-model-routing produce eval artifacts for QG-M3?

Branch: feat/v6-p5-1-routing-orchestration
```

### P6.0 — UX Module + Iris Persona Introduction

```
Topic: Wave P6.0 — Iris persona introduction + bmad-bam-ux module bootstrap

Spec reference: docs/v6-final-architecture.md §4.1 (Iris voice), §5.8 (12 ux skills)

Brainstorm questions:
  1. Iris voice: "Theme tokens, accessibility-first" — write 3-5 example phrasings
  2. Iris SKILL.md mirror Atlas/Nova structure
  3. Module code: `bbu` confirmed
  4. Phase structure: 1-foundation/, 2-branding-theme/, 3-tenant-agent-ux/, 4-lifecycle-ux/, 9-infrastructure/?
  5. Cross-persona references: Iris uses Cipher's PII fragments (P9 future) — placeholder OK?

Branch: feat/v6-p6-0-iris-introduction
```

### P11.1 — Essential Cross-Family Workflows

```
Topic: Wave P11.1 — Essential cross-family workflows (6 skills)

Spec reference: docs/v6-final-architecture.md §5.9
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave P11.1

Skills:
  - bmad-bam-start (entry orchestrator)
  - record-decision (ADR workflow)
  - refresh-knowledge (drift detection)
  - waive-gate (waiver with expiration)
  - mediate-conflict (Kai-arbitrated; Kai introduced in P8)
  - design-build-vs-buy

Live under: src-v6/bmad-bam-platform/2-modules/ (cross-family = platform-owned per spec §5.9)

Brainstorm:
  1. bmad-bam-start: greenfield vs brownfield branching logic
  2. record-decision: produces ADR in _bmad/_memory/<persona>/architecture-decisions/
  3. refresh-knowledge: integrates with spec §6.8 topic thresholds
  4. mediate-conflict: invokable BEFORE Kai exists? (probably needs Kai placeholder; full functionality post-P8)
  5. waive-gate: spec §8.6 + expiration + compensating controls

Branch: feat/v6-p11-1-essential-cross-family
```

### P7.0 — RAG Module Bootstrap

```
Topic: Wave P7.0 — bmad-bam-rag module bootstrap (Nova continues; no new persona)

Spec reference: docs/v6-final-architecture.md §3.2 (rag depends on ai); §5.4 (8 rag skills)
Roadmap reference: docs/v6-detailed-roadmap.md §3, Wave P7.0

Brainstorm:
  1. Module code: `bbr`
  2. Dep declaration: module.yaml depends-on: bba + bbp
  3. Phase structure for rag: 1-foundation/, 2-retrieval/, 3-eval/, 9-infrastructure/?
  4. Nova ownership: rag is Nova's per spec §3.1 — does Nova SKILL.md get extended with rag-specific principles?
     OR is there a Nova-rag sub-skill (bmad-bam-agent-nova-rag)?

Branch: feat/v6-p7-0-rag-bootstrap
```

### P8.0 — Integration Module + Kai Persona Introduction

```
Topic: Wave P8.0 — Kai persona introduction + bmad-bam-integration module bootstrap

Spec reference: docs/v6-final-architecture.md §4.1 (Kai voice + arbiter role), §4.5 (conflict mediation), §5.5

Brainstorm:
  1. Kai voice: "contract attorney with engineering rigor" — example phrasings
  2. Kai is default arbiter per spec §4.5 — how does this manifest in customize.toml? (mediate-conflict workflow already exists from P11.1)
  3. Module code: `bbi`
  4. Phase structure: 1-foundation/, 2-boundary-design/, 3-reliability-patterns/, 4-verification-evolution/, 9-infrastructure/

Branch: feat/v6-p8-0-kai-introduction
```

### P9.0 — Trust Module + Cipher Persona Introduction

```
Topic: Wave P9.0 — Cipher persona introduction + bmad-bam-trust module bootstrap

Spec reference: docs/v6-final-architecture.md §4.1 (Cipher voice), §5.6 (16 trust skills), §6.7 (vertical packs)

Brainstorm:
  1. Cipher voice: "paranoid auditor: assume breach, log everything"
  2. Vertical packs structure (§6.7): manifest.yaml schema; pick 6-8 of HIPAA/PCI-DSS/SOC2/GDPR/FedRAMP/ISO27001/EU-AI-Act/NIST-AI-RMF
  3. Module code: `bbt`
  4. Compliance cross-references: how does map-compliance interact with bmad-create-prd customize-template?

Branch: feat/v6-p9-0-cipher-introduction
```

### P10.0 — Ops Module + Rune Persona Introduction

```
Topic: Wave P10.0 — Rune persona introduction + bmad-bam-ops module bootstrap

Spec reference: docs/v6-final-architecture.md §4.1 (Rune voice), §5.7 (16 ops skills)

Brainstorm:
  1. Rune voice: "YAML + Helm chart fragments, SLO talk, postmortem candor"
  2. Module code: `bbo`
  3. Observability stack: OTel + Prometheus + Grafana as default? Vendor alternatives?
  4. Cross-persona: Rune produces evidence consumed by Cipher's verify-trust-controls (P9 ↔ P10 cycle)
  5. RG-Launch composition: P10's verify-production-readiness is the gate that activates RG-Launch

Branch: feat/v6-p10-0-rune-introduction
```

---

## 9. Quick-reference dependency matrix

```
                                       ┌──────────────────┐
                                       │     Atlas (P3)   │
                                       └────────┬─────────┘
                                                │
                       ┌────────────────────────┼────────────────────────┐
                       │                        │                        │
                  ┌────▼──────┐         ┌──────▼──────┐         ┌──────▼────┐
                  │ data (P4) │         │ ai (P5)     │         │ ux (P6)   │
                  │   Atlas   │         │  Nova NEW   │         │  Iris NEW │
                  └────┬──────┘         └──────┬──────┘         └────────────┘
                       │                       │
                       │                  ┌────▼──────┐
                       │                  │ rag (P7)  │
                       │                  │  Nova    │
                       │                  └───────────┘
                       │
            ┌──────────┴──────────┐
            │ cross-family (P11)  │
            │     Atlas owns      │
            └─────────────────────┘
            │
       ┌────▼─────────┐
       │ v6.0 RELEASE │
       └────┬─────────┘
            │
       ┌────▼─────────┐
       │  PX-MCP      │
       └────┬─────────┘
            │
            ▼  v6.1 (+ P7 + P8)
            │
       ┌────▼─────────────┐
       │ integration (P8) │
       │    Kai NEW       │
       └────┬─────────────┘
            │
       ┌────▼─────────┐
       │ v6.1 RELEASE │
       └────┬─────────┘
            │
       ┌────▼─────────────┐
       │  trust (P9)      │
       │  Cipher NEW      │
       │  + vertical packs│
       └────┬─────────────┘
            │
       ┌────▼─────────┐
       │  ops (P10)   │
       │  Rune NEW    │
       └────┬─────────┘
            │
       ┌────▼─────────┐
       │ v6.2 RELEASE │
       │ Full RG-Launch│
       └──────────────┘

Parallelism (can run alongside):
  - PX-Migration ←─ parallel with P3-P4
  - PX-AntiPatterns ←─ consolidates across P3-P10 (final at v6.0)
  - PX-Glossary ←─ consolidates across P3-P10 (final at v6.0)
  - PX-CustomizeTpl ←─ distributed across P3-P10 (final at v6.0)
  - PX-VerticalPacks ←─ sub-wave of P9 (sequential within P9)
  - PX-MCP ←─ standalone after v6.0; can parallel with P7-P8
```

---

## 10. Summary

| Question | Answer |
|---|---|
| **How many waves?** | 11 main waves (P0, P3-P11) + 6 cross-cutting (PX-*) |
| **Total content skills delivered** | 146 (135 module workflows + 12 cross-family + ~12 infrastructure) |
| **Total personas introduced** | 6 (Atlas done; Nova/Iris/Kai/Cipher/Rune in P5/P6/P8/P9/P10) |
| **Release milestones** | 3 (v6.0, v6.1, v6.2) |
| **Quality gates established** | 28 total + 8 release gates |
| **Total effort estimate (remaining)** | ~3000-3700h (matches spec §10.5) |
| **Workflow per wave** | Brainstorm RDP → design + plan → implement → PR → Claude analysis → merge |
| **Cross-validation gate** | Universal checklist (§4) + wave-specific checklist (§3) + risk acknowledgement (§6) |
| **First concrete action** | Merge 5 queued PRs (Wave P0), then brainstorm Wave P3.1 |

This roadmap is the **complete** plan from current state through v6.2 release. Updates happen via wave-completion ADRs + spec changelog rows.

### Mid-wave progress metric (M9)

Beyond binary "skills count" tracking:

| Dimension | Metric | Target per wave |
|---|---|---|
| **Skills** | Skill dirs with passing smoke-test | All per-wave skills present |
| **Fragments** | Fragment files with 200-900 lines + 8 required sections (§6.3) | ~5 per skill (capped) |
| **Patterns** | Pattern files with frontmatter + decision matrix | ~2-3 per skill |
| **Anti-patterns** | Anti-pattern files with `kind: anti-pattern` (§6.5) | ~3-4 per wave |
| **QGs established** | Checklist files in `resources/checklists/` | Per-wave gate count |
| **ADRs** | New entries in INDEX.md | 1-2 per sub-wave |
| **Cross-validation** | §4 checklist items checked on PR | All items GREEN |

**Wave-health monitoring (M10):**

- **Healthy:** actual effort ≤ 1.2× estimate; sub-waves merge on schedule; Tier-1/2 green at each PR
- **Yellow:** actual effort 1.2× - 1.5× estimate; investigate at 50% completion checkpoint
- **Red:** actual effort 1.5× - 2× estimate; halt + re-brainstorm scope at next sub-wave boundary
- **Critical:** actual effort >2×; halt + escalate (may indicate spec mismatch or hidden dependency)

Recorded in §18 effort tracking sheet.

---

## 11. Customize-templates inventory (15 total per spec §7.2)

Each template is an overlay on a specific BMAD-core skill. Assigned to specific waves:

| BMAD core skill | Template overlay | Assigned to wave |
|---|---|---|
| `bmad-brainstorm` | Multi-tenant brainstorming lenses (platform, ai, trust) | P3.1 (platform) + P5 (ai) + P9 (trust) |
| `bmad-create-product-brief` | Tier modeling, AI capabilities, compliance scope | P3.1 + P5 + P9 |
| `bmad-create-research-prompt` | Compliance framework selection | P9 |
| `bmad-create-prd` | Tenant requirements, AI safety, compliance impact | P3.1 + P5 + P9 |
| `bmad-validate-prd` | Tenant / AI / compliance / observability / UX verification | P3.4 (validation focus) |
| `bmad-create-architecture` | Cross-references all 6 personas; pattern catalog; gates | P3.1 (initial) + later refinements |
| `bmad-create-story` | Tenant-scoped AC; UX considerations | P3 + P6 |
| `bmad-check-implementation-readiness` | QG-* gate references | P11.2 (release-critical) |
| `bmad-code-review` | Tenant-context propagation; leakage checks | P3 |
| `bmad-correct-course` | Retrospective discipline; drift detection | P11.1 (alongside refresh-knowledge) |
| `bmad-retrospective` | Tenant / AI / compliance / SLO retrospective | P3 + P5 + P9 + P10 |
| `bmad-qa-generate-e2e-tests` | Multi-tenant test scenarios | P3.2 (testing focus) |
| `bmad-investigate` | AI capability + compliance deep-dives | P5 + P9 |
| `bmad-checkpoint-preview` | Production-readiness preview | P10 |
| `bmad-design-test-strategy` | Multi-tenant test strategy + AI eval coverage | P3.2 + P5 (eval) |

PX-CustomizeTpl consolidation at v6.0 reconciles overlaps + ensures all 15 land.

---

## 12. Spec section coverage map

Maps every spec section to a wave/deliverable so nothing's orphan:

| Spec § | Topic | Wave covering |
|---|---|---|
| §3.1 | 8 modules | P3-P10 (one wave each + module bootstrap) |
| §3.2 | Dependency graph | Verified per multi-module install test (P4+) |
| §3.4 | Module versioning | All waves use `version: "X.Y.Z"` in module.yaml |
| §3.5 | Compatibility matrix | Note: planned for v6.0+ — see ADR 008 status note |
| §3.6 | Hook idempotency | post-install.sh + finalize patterns from P2.1 |
| §3.7 | Uninstall behavior | P11 (bmad-bam-rollback) |
| §3.8 | Monorepo handling | Spec §3.8 — note in P3 brainstorm |
| §3.9 | Backup/restore | P11.2 (bmad-bam-backup/restore) |
| §4 | Personas | P5/P6/P8/P9/P10 each introduces one |
| §4.3 | Sidecar memory ADRs | Each wave's ADRs go to `_bmad/_memory/<persona>/architecture-decisions/` |
| §4.4 | BMM persona overlays | Future — beyond v6.2 |
| §4.5 | Conflict mediation + escalation | P11.1 (mediate-conflict) + P8 (Kai) |
| §4.6 | Persona pairing patterns | Documented per persona introduction |
| §5.0 | Workflow naming | All wave deliverables follow design-*/plan-*/audit-*/etc. |
| §5.0.1 | Workflow manifest schema | bmad-skill-manifest.yaml per skill |
| §5.1-5.8 | Per-module workflow lists | Mapped to P3-P10 |
| §5.9 | Cross-family workflows | P11 |
| §5.10 | AI-augmented execution mode | Per-skill `execution_mode` field |
| §6.0 | `_bmad/bam/` umbrella | Established cumulatively: install-logs (P2.1), evidence (P5+), backups (P11), etc. |
| §6.1 | Per-module directory shape | Concern 5 / ADR 008 |
| §6.2 | Frontmatter schema | std-frontmatter (P2.1) |
| §6.3 | Fragment body structure | Per-wave fragment authoring discipline |
| §6.4 | CSV index schema | Atlas's platform-index.csv (P2.1) + per-module |
| §6.5 | Anti-patterns library | Distributed P3-P10; consolidated at v6.0 (PX-AntiPatterns) |
| §6.6 | Standards | std-frontmatter, std-validation, std-adr (P2.1); add std-conflict-resolution per spec §6.6 |
| §6.7 | Vertical packs | P9.4 (PX-VerticalPacks) |
| §6.8 | Knowledge currency governance | Per-fragment `last_reviewed`; refresh-knowledge in P11.1 |
| §6.9 | Knowledge graph navigation | Future enhancement (post-v6.2) |
| §6.10 | Context budget management | Per spec; bmad-bam-start enforces at session start (P11.1) |
| §7.1 | Universal-glob mechanism | Concern 5 / ADR 008 |
| §7.2 | Customize-templates (15) | See §11 of this roadmap |
| §7.3 | Wave 0 smoke-test | Already done (Wave 0) |
| §7.4 | BMM phase integration | Per-skill customize-template overlays |
| §7.5 | Template merging strategy | Per spec |
| §7.6 | Module activation | Concern 5 / Path B / ADR 005 + 008 |
| §8.1 | Quality gates (~28) | Distributed P3-P10 |
| §8.2 | Release gates (8) | RG-Launch partial at v6.0; full at v6.2; others incremental |
| §8.3 | Release gate orchestration | P11.2 (release-gate-orchestrator) |
| §8.4 | Gate evidence storage | `_bmad/bam/evidence/<gate-id>/YYYY-MM-DD-NNN/` per spec §6.0 |
| §8.5 | Continuous gates (QG-TC4) | P3.3 (rate-limit work + QG-TC4 checklist) |
| §8.6 | Gate waiver process | P11.1 (waive-gate) |
| §9.1-9.3 | Tool integration (bmad-builder, party-mode, retrospective) | Customize-templates per §11 |
| §9.4 | i18n inheritance | Per-locale customize-templates (future) |
| §9.5 | MCP server | PX-MCP |
| §9.6 | BAM testing strategy | Already established (Tier-1/2/3) |
| §9.7 | Auto-generated documentation | Future enhancement; tracked in §17 of this roadmap |
| §9.8 | User customization layer | `_bmad/bam/user/` per spec §6.0 |
| §9.9 | BAM runtime telemetry | Future enhancement |
| §10 | Release path | This roadmap |
| §11 | Anti-patterns library | Distributed P3-P10; consolidated PX-AntiPatterns |
| §12 | Open Questions / Future Work | Tracked in §17 of this roadmap + spec §17.3 |
| §13 | Migration from v3 | PX-Migration |
| §14 | Glossary | PX-Glossary (distributed + consolidated) |
| §15 | How Claude Consumes BAM | Validated at v6.0/v6.1/v6.2 release gates; see §17 of this roadmap |
| §16 | Changelog | Updated per-wave |
| §17 | Known Issues | Tracked + per-wave revisit; see §17 of this roadmap |

---

## 13. Spec / ADR versioning policy

**Spec versioning:**
- v0.X during pre-v6.0 development (current)
- v1.0 at v6.0 release (semver bump on milestone)
- v1.1 at v6.1 release
- v1.2 at v6.2 release
- v1.X.Y for in-wave patches (rare)

Each wave's spec changelog row decision:
- Substantial structural change (new module / new persona / new gate) → minor bump (v0.X → v0.X+1)
- Substantial content addition without structural change → no bump
- Bug fix or annotation → no bump

**ADR numbering reservations** (sequential; current latest: 015):

| Wave | ADRs reserved | Topics |
|---|---|---|
| **v4 roadmap (pre-wave-P3)** | **011-013** | **Phase-column decoupling (§19.3), BMM all-in-skills (§19.6), Menu-code 3-char Z-prefix extension (§19.7)** |
| P3.0 | 014 | BMM manifest reconciliation — LANDED 2026-05-16 |
| P3.1 | 015 | Foundation Skills design decisions (4 skills + QG-F1 + QG-M1 partial) — LANDED 2026-05-17 |
| P3 (remaining) | 016-019 | Lifecycle (P3.2), Commercial (P3.3), Brownfield (P3.4), Wave-completion |
| P4 | 019-022 | Module bootstrap + 3 sub-waves (shifted from 016-019) |
| P5 | 023-030 | Nova introduction + 6 sub-waves + cross-persona (shifted from 020-027) |
| P6 | 031-033 | Iris introduction + sub-waves (shifted from 028-030) |
| P11 | 034-036 | Cross-family sub-waves (shifted from 031-033) |
| PX-MCP | 037 | MCP server design (shifted from 034) |
| P7 | 038-039 | RAG sub-waves (shifted from 035-036) |
| P8 | 040-043 | Kai introduction + sub-waves (shifted from 037-040) |
| P9 | 044-049 | Cipher introduction + sub-waves + vertical packs (shifted from 041-046) |
| P10 | 050-055 | Rune introduction + sub-waves (shifted from 047-052) |
| PX-Migration | 056 | v3 → v6 migration tooling (shifted from 053) |
| **Reserve 057-099 (L2 clarification):** v6.x patches **+ mid-wave Concern discoveries + post-release bug-fix ADRs**. Non-contiguous allocation OK — pull next-available number when needed. | | |

**Non-sequential ADR allocation (L3):** ADRs are sequential by ID but may land in non-chronological order when parallel waves complete out of order (e.g., PX-Migration ADR 056 may land BEFORE Wave P4's ADRs 019-022 if PX-Migration completes faster). This is acceptable; INDEX.md displays ADRs in numeric order regardless of landing date.

---

## 14. Audit drift maintenance + validation automation

**Audit drift:** As content grows, audit checks (g) + (h) may surface false positives in legitimate new content. The carve-out regexes (in audit-marketplace.sh) may need extending.

**Maintenance cadence:**
- Pre-release pass (before v6.0/v6.1/v6.2 tag): review audit fixtures + carve-outs; add new fixtures for edge cases discovered during the cycle
- Per-PR review: if audit fails on legitimate content, evaluate carve-out extension vs content rewrite (prefer content rewrite when possible)
- Annual audit-redesign review: re-evaluate the 8 checks (a-h) for relevance + add new checks if recurring bug classes surface

**Validation automation (future enhancement, beyond v6.0):**

The Universal Cross-Validation Checklist (§4) is currently manual (Claude reviews each PR). A future enhancement:

```bash
# Future tool: tests/integration/verify-pr.sh <pr-number>
# Runs all §4 + §3 wave-specific checks
# Outputs PASS/FAIL per item + summary
# Saves output for archival in PR comment
```

Tracked as PX-ValidationAutomation in §17. Not in v6.0 critical path.

### Tier-2 runtime SLO (M2)

As each wave adds modules, Tier-2's install + ratification takes longer:

| Cumulative state | Expected Tier-2 runtime | Alert threshold | Investigate threshold |
|---|---|---|---|
| Current (1 module) | ~30s | n/a | n/a |
| After P3 (1 module + complete platform) | ~45s | >2 min | >3 min |
| After P5 (3 modules: bbp+bbd+bba) | ~90s | >3 min | >5 min |
| After v6.0 (4 modules + cross-family) | ~3 min | >5 min | >7 min |
| After v6.1 (6 modules) | ~5 min | >7 min | >10 min |
| After v6.2 (8 modules + verticals) | ~7 min | >10 min | >15 min |

**Per-wave action:** record Tier-2 runtime in PR description. Alert if exceeded; investigate if exceeded by 2×.

**Mitigation if runtime grows beyond targets:**
- Parallel install via separate `bmad install --modules <code1>` calls per module (if BMAD supports concurrent installs)
- Pre-warm npm cache in CI between runs
- Skip non-critical Tier-2 assertions in opt-in fast-mode (`BAM_TIER2_FAST=1`)

### Roadmap maintenance plan (M11)

This roadmap is a doc. It needs maintenance:

**Update cadence:**
- **Per wave completion:** the merging PR's commit also updates this roadmap's visual progress tracker (top of doc) + wave catalog (§1) row for the completed wave. Minimal text changes; one commit.
- **Per release tag (v6.0/v6.1/v6.2):** roadmap version bump (v3 → v4 → v5) with substantive correction pass if needed. Self-critique cycle: review against spec drift + recent ADRs + lessons learned.
- **Per Concern discovery:** if a mid-wave Concern surfaces a roadmap-level gap (e.g., wave sequencing wrong), patch in the wave's PR.

**Update owner:**
- Per-wave updates: the user (or Claude in PR review).
- Release-tag rewrites: collaborative (user + Claude).

**Update protocol:**
1. Edit `docs/v6-detailed-roadmap.md` inline
2. Update version banner at top (e.g., "Changes from v3" subsection)
3. Update visual progress tracker
4. Commit with `docs(v6): roadmap update — <reason>`

### Submodule security patch protocol cross-reference (H6)

When a security advisory affects a submodule (e.g., `external/bmad-method`), follow the protocol in §15 "Submodule security patch protocol". The roadmap's existence doesn't auto-block security patches; chore PRs jump priority queue.

### BMAD-main forward-compat CI (v4 M1)

Add `.github/workflows/bmad-main-compat.yml` (deliverable in Wave P3.0):

```yaml
name: BMAD-main forward-compat
on:
  schedule: [{ cron: '0 6 * * 1' }]   # Mondays 6am UTC
  workflow_dispatch: {}
jobs:
  test-against-bmad-main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { submodules: recursive }
      - run: git -C external/bmad-method checkout main && git pull
      - run: tests/wave-0/run-smoke-test.sh
      - run: tests/p2/run-real-install-test.sh
      - run: tests/audit-marketplace-fixtures.sh
      - if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner, repo: context.repo.repo,
              title: `BMAD-main compat failure (${context.sha.slice(0,7)})`,
              body: `Nightly test against BMAD HEAD failed. See run: ${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`
            })
```

**Triage cadence:** any auto-filed BMAD-main-compat issue gets triaged within the same Claude session that next touches BAM. If incompatibility is fundamental (not a flaky test), file as new Concern via §15 mid-wave discovery protocol.

### TEA submodule sync cadence (v4 M2)

`external/bmad-tea` is a git submodule. Quarterly review protocol (Jan/Apr/Jul/Oct first Monday):

1. `git -C external/bmad-tea fetch && git log HEAD..origin/main`
2. Review changes; identify patterns BAM could adopt (new persona conventions, new workflow shapes)
3. If breaking: pin `external/bmad-tea` to current commit, file BAM issue describing breakage
4. If clean: `git -C external/bmad-tea checkout origin/main` and commit submodule bump
5. Re-run all tests; verify Atlas's cross-skill reference pattern still works (Concern 2 fix derives from TEA pattern)
6. Outcome: either submodule-bump commit OR pin-and-issue commit; never silent skip

**Anti-pattern:** Letting submodule drift >6 months without review — TEA precedents may evolve and BAM falls behind unaware.

---

## 15. Wave failure + recovery protocol

If a wave's implementation surfaces a spec gap or architectural issue mid-execution (Concern 5 discovery during PR #3 was an example):

### Mid-wave discovery protocol

1. **Discovery:** issue surfaced during brainstorm OR implementation OR PR review
2. **Triage:** file as new "Concern" tracking note at `tests/integration/CONCERN-N-<short-desc>.md`
3. **Decide:**
   - **Small (fits in current wave):** Add to current PR; brainstorm-revisit notes; ship together
   - **Medium (fits in current wave's next sub-wave):** Defer to next sub-wave; document handoff in current PR
   - **Large (architectural; warrants separate wave):** File as standalone Concern wave; sequence appropriately; current wave completes scope-as-planned
4. **Defer protocol if large:**
   - Halt current wave at next sub-wave boundary (after current PR merge)
   - File a new wave (e.g., "Concern N — <Topic>") in §3 of this roadmap (insert as PX-Concern-N)
   - Update wave catalog (§1) with new sequence
   - Resume original wave after Concern wave merges

### Wave abandonment recovery

If a wave is partially merged then abandoned (rare):

1. **PR boundaries are checkpoints.** Merged sub-wave PRs stand; unmerged work is open work.
2. **Recovery:** future brainstorm pick up at the next un-merged sub-wave; no rebase trauma.
3. **Audit:** if abandoned wave introduced new module code, ensure Tier-2 still PASSes (no dangling references to half-built module).

### Concurrent waves protocol (M5)

Per §1 wave catalog parallelism column:
- **PX-Migration** runs parallel with P3-P4 (no shared files)
- **PX-MCP** runs parallel with P7 (after v6.0)
- **PX-AntiPatterns + PX-Glossary** consolidate across waves (distributed, not parallel)

**Shared-file conflict resolution:**
- Concurrent waves MUST NOT touch the same `module.yaml`, `marketplace.json`, or `post-install.sh`
- If unavoidable conflict surfaces mid-wave:
  1. STOP the second wave at next sub-wave boundary
  2. Merge the first wave fully
  3. Rebase the second wave's branch off the merged main
  4. Resolve merge conflicts in the rebase (typically trivial — different lines)
  5. Re-run Tier-1 + Tier-2 after rebase before resuming
- If conflict is non-trivial (semantic, not just textual): file as Concern, mediate per §15 mid-wave protocol

### PR rollback protocol (H7)

If a merged PR turns out to be bad (e.g., breaks at runtime in a Plan C ratification week later):

1. **Identify regression:**
   - When did it land? `git log --merges` to find the PR
   - What specifically broke? Capture failing test output + steps to reproduce
   - Affects which wave's scope?

2. **Document:**
   - File a Concern tracking note at `tests/integration/CONCERN-<N>-<short-desc>-regression.md`
   - Note: PR # + merge SHA + symptom + reproduction + workaround if any

3. **Choose revert strategy:**
   - **Clean revert** (preferred): `gh pr revert <pr-number>` — creates inverse PR, preserves history
   - **Forward-fix** (if revert breaks things): patch directly on main; document the fix as a follow-up

4. **Ratify revert:**
   - Run Tier-1 + Tier-2 after the revert merges
   - If Tier-2 covers the regression class, the original PR's wave should be replanned with the discovered gap captured in brainstorm

5. **Replan affected wave:**
   - Update wave's brainstorm prompt with the discovered failure mode
   - File ADR documenting the regression + lessons learned (allocate from ADR range 054-099)
   - Re-execute affected sub-wave(s)

### Multi-module sentinel aggregation test (v4 C4, revised)

**Empirical correction:** Prior v4 draft assumed flat-prefix sentinels (`bam-project-context.md`); actual canonical is per-module subdir `{output_folder}/<code>/project-context.md`. Test rewritten to match canonical. See §19.4 for full explanation.

**Test:** `tests/wave-0/multi-sentinel-aggregation-test.sh` (deliverable in Wave P4.0 — first cross-module wave). Source canonical at §19.4.

**Per-wave enforcement:** when a new BAM module is introduced (P4+), the test's expected match count increments. Update test atomically with module introduction.

### Submodule security patch protocol (H6 detail)

If `bmad-method` or another submodule ships a security fix during ongoing waves:

1. **Priority queue:** chore PR with `priority-security` label; bypass normal sub-wave sequencing
2. **Bump submodule:** `git submodule update --remote external/<submodule>`
3. **Re-test:** Tier-1 + Tier-2 against the bumped submodule
4. **Plan C ratification (mandatory if security fix touches install path):** record outcome
5. **Document:** ADR documenting the bump + impact assessment
6. **Resume waves:** affected in-flight branches rebase off the bumped main

---

## 16. v3 deprecation timeline

`src-v2/` (BAM v3) is currently frozen — preserved as legacy + reference for migration tooling.

**Sunset schedule:**

| Date | Event |
|---|---|
| Current | v3 frozen; PX-Migration tooling in development |
| v6.0 release | PX-Migration tooling ships; v3 fully replaceable for new projects |
| v6.0 + 6 months | v3 documented as deprecated; new projects MUST use v6 |
| v6.2 release | `src-v2/` directory deleted from repo. Final v3 archive tag created (`v3-archive-final`). |

`external/bmad-method`, `external/bmad-tea`, etc. submodules: retained through v6.2 per spec §17.1 ("External submodules retained"); removal evaluated for v6.x post-v6.2.

---

## 17. §15 Claude consumption validation (v6.0/v6.1/v6.2 release gate)

Spec §15 documents Claude's expected interaction patterns with installed BAM. This isn't testable via Tier-1 or Tier-2 — it requires live Claude Code IDE session.

**Validation procedure (mandatory at each release):**

1. **§15.1 Discovery:** open Claude Code in a fresh test project with BAM installed. Confirm `_bmad/bam/family.json` is readable + lists all installed modules.

2. **§15.2 Tiered context load:** activate a BMAD core skill (e.g., `bmad-create-architecture`). Confirm Tier-1 (project-context.md synthesis files) loads via universal-glob.

3. **§15.3 Persona invocation:** invoke `/bmad-bam-agent-atlas`. Confirm Atlas's persona definition + `_bmad/_memory/atlas/` content loaded.

4. **§15.4 Workflow selection:** run `bmad-bam-design-tenancy-model` (or any v6.0+ workflow). Confirm CEV steps execute with `auto-runnable` honoring `execution_mode`.

5. **§15.5 Conflict mediation:** at v6.1+ (Kai exists), inject conflicting recommendations between Atlas and Nova. Confirm Claude surfaces `@Kai mediate` suggestion.

6. **§15.6 Decision recording:** complete a workflow. Confirm Claude prompts to record decision via `record-decision` workflow.

7. **§15.7 Gate validation:** at QG-* gate boundary, confirm Claude offers `verify-*` workflow + evidence saved to `_bmad/bam/evidence/`.

8. **§15.8 Refresh awareness:** plant a stale fragment (`last_reviewed` beyond threshold). Confirm Claude flags for `refresh-knowledge`.

9. **§15.9 Cross-tool access:** at v6.1+ (MCP server exists), confirm external client can query BAM via stdio MCP.

10. **§15.10 Failure handling:** force a workflow failure (e.g., missing input file). Confirm log to `_bmad/bam/install-logs/` + partial outputs preserved + resume offer.

11. **§15.11 Context budget guarding:** invoke `bmad-bam-start`. Confirm context-budget check + warning if approaching limits.

12. **§15.12 Hot-reload:** modify a fragment during active session. Confirm Claude detects via watcher + offers session re-init.

13. **(v4 L1) BMAD CLI module registration:** `bmad list-modules` lists all installed BAM modules (display_name match):
    ```bash
    bmad list-modules | grep "BAM Platform" || echo "FAIL: platform not registered"
    bmad list-modules | grep "BAM Data" || echo "FAIL: data not registered"
    # ...etc per installed module
    ```

14. **(v4 H4) llms.txt publication:** every installed BAM module has a valid `llms.txt` (either local `_bmad/<mod>/llms.txt` or public URL referenced in module-help.csv `_meta` row). Confirm by reading + checking it lists all skills with menu codes.

15. **(v4 C2) output-location resolution:** representative BAM workflow output lands at BMM-canonical resolved variable (e.g., `bmad-bam-design-tenancy-model` output at `{planning_artifacts}/tenancy-model.md`). No BAM-invented output location.

**Outcome recorded in:** `tests/p2/PLAN-C-RATIFICATION.md` under each release tag's section.

**If any §15 pattern FAILS at release gate:** release is HELD. Forward-fix to address the gap; re-validate before tag.

### Plan C delegation protocol (M1)

If the user is unavailable to perform manual Plan C in a live Claude Code IDE:

**Acceptable interim ratification:** autonomous-subagent ratification per PR #3 Plan C R1-R4 methodology:
1. Claude (this main session) spawns a fresh `general-purpose` subagent
2. Subagent given prompt: simulate fresh Claude Code session activating BAM core skill with universal-glob
3. Subagent uses Read/Glob to discover sentinel + recite token
4. Outcome recorded in PLAN-C-RATIFICATION.md with disclaimer:
   > "Autonomous-subagent ratification (R(N+1)) — interim. Manual Claude Code IDE ratification still pending; required before final release tag."

**When this is acceptable:**
- Mid-roadmap release-gate readiness check
- User unavailable >2 weeks
- Subagent-proxy results consistent with prior R1-R4 (4 PASSes already)

**When this is NOT acceptable:**
- Final release tag (v6.0/v6.1/v6.2). Manual IDE ratification is the FINAL gate.
- After BMAD upstream API change.
- After universal-glob mechanism modification.

---

## Final summary table (v2)

| Aspect | v1 (initial) | v2 (this version, post-self-critique) |
|---|---|---|
| **Total remaining effort** | 1100-1500h (3× under spec) | ~3000-3700h (matches spec) |
| **Wave P3 effort** | 95-115h | ~280-345h |
| **Wave P5 effort** | 150-180h | ~450-540h |
| **Brainstorm prompts** | 1 (P3.1 only) | 10 (all main waves) |
| **Cross-validation universal checklist** | ~25 items | ~35 items (added team:bam + multi-module install + last_reviewed + dep-graph install) |
| **Per-wave Plan C cadence** | Module-introduction (over-prescribed) | Release-tag + BMAD-upgrade only (correctly scoped) |
| **Tier-2 script update** | Implicit | **Explicitly listed as deliverable per wave** |
| **Wave completion definition** | Implicit | Explicit per-wave criteria |
| **§6.0 umbrella structure** | Not mentioned | Mapped to wave deliverables (§12) |
| **§15 validation** | Not addressed | Mandatory at every release (§17) |
| **§17 known issues** | Not tracked | Cross-referenced (§12) |
| **Customize-templates (15)** | Stub | Enumerated + assigned to waves (§11) |
| **Mid-wave discovery protocol** | Implicit | Explicit (§15) |
| **Wave abandonment recovery** | Implicit | Explicit (§15) |
| **v3 deprecation timeline** | Vague | Explicit (§16) |
| **ADR number reservations** | Not assigned | Reserved per wave (§13) |
| **Spec semver policy** | Unclear | Locked v0→v1 at v6.0 (§13) |
| **Audit drift maintenance** | Not addressed | Cadence documented (§14) |
| **Validation automation** | Not mentioned | Future enhancement noted (§14) |
| **Doc total length** | 966 lines | ~1700 lines |

**This v2 roadmap addresses all 24 gaps identified in the self-critique pass. Nothing missed.**

---

## 18. Effort tracking sheet template (L5)

Use this template to track actual vs estimated effort per wave. Maintained in `docs/v6-effort-actuals.md` (created when first wave closes); updated at each wave's close. Roadmap §10 estimates are revised at half-release boundaries (after v6.0, after v6.1) based on actuals delta.

### Per-wave tracking row

```markdown
## Wave <ID> — <Name>

| Field | Value |
|---|---|
| Estimated effort (roadmap v3) | <range>h |
| Actual effort | <hours>h |
| Delta | <±%> |
| Start date | YYYY-MM-DD |
| End date (PR merged + Plan C if applicable) | YYYY-MM-DD |
| Sub-waves executed | <N> (planned: <M>) |
| PRs merged | <count> |
| ADRs landed | <list of IDs> |
| Skills delivered | <count> (planned: <count>) |
| Fragments delivered | <count> (planned: <count>) |
| Mid-wave discoveries (M9) | <list with date + outcome> |
| Wave health (M10) | green / yellow / red — note |
| Plan C ratification | N/A or <date> (manual / subagent-interim) |
| Re-estimation trigger? | yes/no — if yes, downstream waves rescoped |

### Notes
- Surprises encountered:
- Patterns that worked well:
- Patterns to avoid in future waves:
- Spec gaps surfaced:
```

### Half-release re-estimation protocol

After v6.0 ships and after v6.1 ships, run a re-estimation pass:

1. Compute aggregate actual vs estimate for all completed waves
2. Compute median delta per skill (target: 25h; recompute from data)
3. Compute median delta per fragment (target: 6h; recompute)
4. If aggregate delta > +30%: revise downstream wave estimates upward by same factor; surface in next roadmap version
5. If aggregate delta < -20%: revise downstream wave estimates downward; flag as evidence that v6 patterns are matching faster than anticipated
6. Update §10 (`Summary` table) with revised numbers; commit as `docs(roadmap): v3.N — re-estimation after v6.X release`

### Wave-completion close-out checklist

At every wave PR-merge moment (PR for the last sub-wave of a wave):

- [ ] All sub-wave PRs merged
- [ ] Tier-1 audit + Tier-2 (`BAM_TIER2=1`) green at HEAD
- [ ] Plan C run if wave is a release boundary (P11, P8, P10)
- [ ] ADR(s) landed in `_bmad/_memory/<persona>/architecture-decisions/`
- [ ] Spec patches (if any) merged + version bumped
- [ ] `docs/v6-effort-actuals.md` row updated
- [ ] Roadmap §0 progress tracker (waves complete = N + 1) updated
- [ ] Next wave's brainstorm prompt reviewed for any deltas (gaps surfaced this wave)

This close-out is itself part of the wave's estimated effort (~1-2h).

---

## v3 self-critique fix log (this version)

This v3 builds on v2 by fixing 24 additional gaps surfaced in the second self-critique pass:

| ID | Severity | Fix | Location |
|---|---|---|---|
| H1 | HIGH | TOC + visual progress tracker | §0 |
| H2 | HIGH | Per-wave TL;DR tables | §3 (each wave) |
| H3 | HIGH | Universal sub-wave prompt template + per-sub-wave deltas | §8 |
| H4 | HIGH | GitHub permission boundary documented | §0 |
| H5 | HIGH | BMAD upstream API change risk | §6 |
| H6 | HIGH | Submodule security patch protocol | §6, §15 |
| H7 | HIGH | PR rollback protocol | §15 |
| H8 | HIGH | Sub-wave prompt template (deltas) | §8 |
| M1 | MED | Plan C delegation protocol | §17 |
| M2 | MED | Tier-2 runtime SLO | §14 |
| M3 | MED | PR scope discipline | §4 |
| M4 | MED | (covered by H1 progress tracker) | §0 |
| M5 | MED | Concurrent waves conflict resolution | §15 |
| M6 | MED | Fragment content quality bounds (target words/refs) | §4 |
| M7 | MED | Workflow step caps (target step count) | §4 |
| M8 | MED | Cross-skill reference convention (`[[ref]]`) | §4 |
| M9 | MED | Mid-wave progress metric | §10 |
| M10 | MED | Wave health monitoring (G/Y/R) | §10 |
| M11 | MED | Roadmap maintenance plan | §14 |
| M12 | MED | Claude unavailability protocols | §0 |
| L1 | LOW | (commit message line-count discrepancy noted, not fixed historically) | — |
| L2 | LOW | ADR allocation wording cleanup | §13 |
| L3 | LOW | Per-wave ADR ID reservations clarified | §13 |
| L4 | LOW | (covered by H2 TL;DR tables) | §3 |
| L5 | LOW | Effort tracking sheet template | §18 |

**This v3 roadmap addresses all 24 additional gaps. Combined v2+v3 fixes: 48 gaps total.**

---

## v4.1 + v4.2 deep-validation patch series

After v4 landed (2026-05-16), three deep-validation passes against the actual code + BMM/TEA submodules surfaced **6 additional bugs** in my own v4 work. All fixed.

### v4.1 (commit `2293452`) — 3 bugs

| Bug | Type | Fix |
|---|---|---|
| ADR renumbering left 14 stale per-wave references | Internal inconsistency | Fixed P3.1-P3.4, P4, P5, P6, PX-MCP per-wave ADR IDs; added PX-Migration ADR-056 reservation |
| Cascading `replace_all` corrupted P6's range | Tool-use error | P6 corrected to ADRs 031-033 (was double-shifted to 034-036 overlapping P11) |
| §19.4 C4 "multi-context glob isolation" based on wrong premise | Empirical error | Re-checked against module.yaml; BAM canonical is `{output_folder}/<code>/project-context.md` per-module subdir (BMM-compatible); C4 downgraded CRITICAL → MEDIUM and reframed to context-budget growth |

### v4.2 (this version) — 3 more bugs

| Bug | Type | Fix |
|---|---|---|
| §19.5 DAG referenced non-existent workflows (`design-master-architecture`, `design-data-schema`, `design-ux-shell`) | Empirical error | Replaced with spec §5.X-verified names: `design-modular-monolith`, `design-schema-architecture`, `design-agent-ui-patterns`; added "verified against spec" annotation |
| §19.14 required-skills table had 8+ wrong workflow names (incl. `design-ux-shell` ❌, `design-retrieval-architecture` ❌, `design-deployment-topology` mis-mapped to ops instead of platform) | Empirical error | Full table replaced with spec §5.X-verified names + cross-family row + spec reference column |
| §19.16 BMM skill manifest treated as unknown ("prereq verification needed") | Empirical error → finding | Empirically resolved: BMM has NO `bmad-skill-manifest.yaml`; uses 2-field SKILL.md frontmatter (`name`+`description`). Spec §6.2's 10-field manifest is BAM-INVENTED. 3 decision options laid out for Wave P3.0; recommended Option (b) keep-BAM-extension. |

**Method lessons:**
1. Empirical verification against actual code/submodules catches premise errors that pure analysis misses
2. Workflow naming should be auto-checked against spec §5.X in Tier-1 audit (new check (i) deliverable for Wave P3.0)
3. `replace_all` is dangerous for cascading range strings; use temp markers or per-line edits

**Combined fix count:** v1+v2+v3+v4 = 68 gaps documented + v4.1+v4.2 = 6 self-validation bugs caught and fixed = **74 total**.

---

## 19. BMM/TEA Compatibility Addendum

Consolidated rules for compatibility with BMAD's BMM module (canonical reference at `external/bmad-method/src/bmm-skills/`) and TEA community module (at `external/bmad-tea/`). Addresses 20 gaps surfaced in the third self-critique pass (2026-05-16). Roadmap §3 wave deliverables and §4 universal checklist enforce these rules. Combined v1+v2+v3+v4 fixes: **68 gaps total**.

### 19.1 module-help.csv canonical 13-column schema (C1)

**Empirical reference:** `external/bmad-method/src/bmm-skills/module-help.csv` header row verbatim:

```
module,skill,display-name,menu-code,description,action,args,phase,preceded-by,followed-by,required,output-location,outputs
```

| # | Column | Type | Semantics | BAM convention |
|---|---|---|---|---|
| 1 | `module` | string | Module display name | `BAM Platform`, `BAM Data`, etc. (matches `module.yaml` `display_name`) |
| 2 | `skill` | string | Skill folder name | `bmad-bam-design-tenancy-model` etc. (matches dir name) |
| 3 | `display-name` | string | 2-4 word human label | See §19.20 brevity rule |
| 4 | `menu-code` | string | 2-3 char invocation code | See §19.7 (BAM uses 3-char Z-prefix) |
| 5 | `description` | string | One-sentence summary | ≤120 chars; no period |
| 6 | `action` | string | Sub-action verb (validate/edit/create) | Empty for one-shot workflows |
| 7 | `args` | string | Bracketed args | `[path]`, `--tier=<id>` etc. — see §19.13 |
| 8 | `phase` | enum | BMM lifecycle phase | See §19.3 decoupling rule |
| 9 | `preceded-by` | string | Prerequisite workflow | DAG — see §19.5 |
| 10 | `followed-by` | string | Typical next workflow | Optional, advisory |
| 11 | `required` | bool | Required for phase completion | See §19.14 |
| 12 | `output-location` | enum | BMM resolved variable | See §19.2 |
| 13 | `outputs` | string | Artifact description | Free-form |

**Per-wave deliverable:** When a module wave (P3, P4, P5, P6, P7, P8, P9, P10) creates `<module>/module-help.csv`, it MUST populate ALL 13 columns for every skill. PR review checks: header matches BMM verbatim; row count = skill count + 1 (`_meta` row); no empty cells in required columns.

### 19.2 Output-location resolved-variable convention (C2)

**Empirical reference:** BMM's `output-location` column uses BMAD-installer-resolved variables.

| Resolved variable | Default path | When to use |
|---|---|---|
| `output_folder` | `_bmad-output/` | User-facing context files; sentinels |
| `planning_artifacts` | `_bmad-output/planning/` (typ.) | Design docs (architecture, tenancy, schema) |
| `implementation_artifacts` | `_bmad-output/implementation/` | Code-adjacent specs (stories, sprint status) |
| `project-knowledge` | `_bmad-output/knowledge/` | Long-lived reference docs |

**BAM workflow output mapping (canonical):**

| BAM workflow | Output | Resolved location | Filename |
|---|---|---|---|
| `bmad-bam-finalize` | Project context sentinel | `{output_folder}/<code>` (literal path; mixed-convention per BMM precedent) | `project-context.md` (per-module subdir) |
| `bmad-bam-design-modular-monolith` (spec §5.1 #2) | Modular monolith design | `planning_artifacts` | `modular-monolith.md` |
| `bmad-bam-design-tenancy-model` (spec §5.1 #1) | Tenancy model | `planning_artifacts` | `tenancy-model.md` |
| `bmad-bam-design-schema-architecture` (spec §5.2 #1) | Data schema architecture | `planning_artifacts` | `schema-architecture.md` |
| `bmad-bam-design-ai-runtime` (spec §5.3 #25) | AI runtime spec | `planning_artifacts` | `ai-runtime.md` |
| `bmad-bam-verify-*` | Validation report | `planning_artifacts` | `<gate>-validation-report.md` |
| `bmad-bam-smoke-test` | Sentinel | `output_folder` | `bam-smoke-sentinel.md` |
| Vertical-pack workflows | Compliance evidence | `project-knowledge` | `<pack>-evidence-<date>.md` |

**Rule:** No BAM-invented output locations. Every workflow output picks from the BMM enum above. Eliminates spec §8 ambiguity.

### 19.3 Phase-column decoupling (C3) — ADR-011

**Tension:** BMM module-help.csv `phase` column uses lifecycle enum (`1-analysis`, `2-planning`, `3-solutioning`, `4-implementation`, `anytime`). BAM directory structure uses module-specific phases (`1-foundation/`, `2-storage/`, `2-modules/`, `9-infrastructure/`). These taxonomies are semantically different.

**Resolution (ADR-011):** **Decouple.** Directory naming uses BAM-structural; module-help.csv `phase` column uses BMM-lifecycle.

| BAM workflow type | Directory location | module-help.csv `phase` |
|---|---|---|
| Persona scaffolding (Atlas SKILL.md etc.) | `<mod>/1-foundation/bmad-bam-agent-<persona>/` | `anytime` |
| Design workflows (design-tenancy-model etc.) | `<mod>/2-<topic>/bmad-bam-design-*/` | `3-solutioning` |
| Verification workflows (verify-*) | `<mod>/4-readiness/bmad-bam-verify-*/` | `4-implementation` |
| Cross-family workflows (P11) | `bmad-bam-platform/2-modules/bmad-bam-*` | `3-solutioning` |
| Infrastructure (migrate, backup, etc.) | `<mod>/9-infrastructure/bmad-bam-*/` | `anytime` |

**Consequence:** Directory grouping remains BAM-discoverable; `phase` column interoperates with BMM's expected enum. BMAD installer phase queries work correctly.

### 19.4 Multi-module sentinel aggregation (C4 — revised after empirical re-check)

**Empirical correction (2026-05-16, v4 self-validation):** Prior v4 draft of §19.4 assumed BAM emits flat-prefix sentinels (`{output_folder}/bam-project-context.md`). **Actual canonical is per-module subdir:** `{output_folder}/<module-code>/project-context.md` (verified in `src-v6/bmad-bam-platform/module.yaml:34,107` + `module-help.csv:3-4` + `README.md:39`). This IS BMM-compatible already — BMM's strict glob `file:{project-root}/**/project-context.md` matches every module's sentinel (same filename, different subdir).

**Canonical pattern (each module):**

| Module | Sentinel path | Match by BMM strict glob? |
|---|---|---|
| platform | `{output_folder}/bbp/project-context.md` | ✓ |
| data | `{output_folder}/bbd/project-context.md` | ✓ |
| ai | `{output_folder}/bba/project-context.md` | ✓ |
| ux | `{output_folder}/bbu/project-context.md` | ✓ |
| rag | `{output_folder}/bbr/project-context.md` | ✓ |
| integration | `{output_folder}/bbi/project-context.md` | ✓ |
| trust | `{output_folder}/bbt/project-context.md` | ✓ |
| ops | `{output_folder}/bbo/project-context.md` | ✓ |
| (BMM's own) | `{output_folder}/project-context.md` | ✓ |

**No broader glob needed.** No flat-prefix files needed. Universal-glob behavior is BMM-canonical; cross-module aggregation is by-design (LLM concatenates all matches).

**Real remaining concern (C4 reframed — DOWNGRADED to MEDIUM):** when multiple BAM modules are installed, the LLM context payload at activation time grows linearly with module count. Each module contributes 1 sentinel + cross-module fragment context. Spec §6.10 context-budget guarding (§15.11 of release-gate) addresses this; not a glob collision issue.

**Test:** `tests/wave-0/multi-sentinel-aggregation-test.sh` (Wave P4.0 deliverable):

```bash
#!/usr/bin/env bash
set -euo pipefail
TMP=$(mktemp -d)
mkdir -p "$TMP/_bmad-output"/{bbp,bbd,bba}
touch "$TMP/_bmad-output/project-context.md"          # BMM
touch "$TMP/_bmad-output/bbp/project-context.md"      # BAM platform
touch "$TMP/_bmad-output/bbd/project-context.md"      # BAM data
touch "$TMP/_bmad-output/bba/project-context.md"      # BAM ai

# BMM-canonical strict glob — matches all 4 (BMM + 3 BAM modules)
matched=$(find "$TMP/_bmad-output" -name "project-context.md" | wc -l)
[ "$matched" = "4" ] || { echo "FAIL: expected 4 matches, got $matched"; exit 1; }
echo "OK: BMM strict glob picks up all module sentinels via subdir convention"
rm -rf "$TMP"
```

**Atlas customize.toml stale comment cleanup (Wave P3.0):** `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/customize.toml:40` references stale `bam-<module>-project-context.md` naming. Replace with canonical `{output_folder}/<code>/project-context.md` reference. Atomic fix in Wave P3.0 prereqs.

### 19.5 Workflow-chaining DAG via `preceded-by` (H1)

**BMM pattern:** `module-help.csv` `preceded-by` column declares strict order; BMAD's workflow-chain validator catches missing prerequisites.

**BAM cross-module workflow DAG (canonical chain to v6.0; workflow names verified against spec §5.X 2026-05-16):**

```
bmad-bam-finalize (output: {output_folder}/bbp/project-context.md)
    ↓ preceded-by
bmad-bam-design-modular-monolith (spec §5.1 #2; output: modular-monolith.md)
    ↓ preceded-by
bmad-bam-design-tenancy-model (spec §5.1 #1; output: tenancy-model.md)
    ↓ preceded-by  [cross-module: platform → data]
bmad-bam-design-schema-architecture (spec §5.2 #1; output: schema-architecture.md)
    ↓ preceded-by  [cross-module: data → ai]
bmad-bam-design-ai-runtime (spec §5.3 #25; output: ai-runtime.md)
    ↓ preceded-by  [cross-module: ai → ux]
bmad-bam-design-agent-ui-patterns (spec §5.8 #6; output: agent-ui-patterns.md)
    ↓ preceded-by  [release-prep]
bmad-bam-verify-production-readiness-final (spec §5.9 #12)
```

**Validation note:** Each workflow name above is verified against spec §5.X listings. No invented names. Wave P3.0 prereq: extend Tier-1 audit with workflow-name allow-list pulled from spec §5.X.

**Implementation:** Each workflow's module-help.csv row sets `preceded-by` to its direct ancestor. BAM-internal Tier-1 audit gains a "check (i) — workflow DAG validation" deliverable in Wave P3 (no cycles + all referenced predecessors exist).

### 19.6 Workflow-vs-Skill structural decision (H2) — ADR-012

**Tension:** BMM puts all workflows in phase-numbered skill dirs (no separate `workflows/`). TEA has `workflows/` AND `agents/` as parallel top-level dirs.

**Resolution (ADR-012):** **BAM follows BMM.** All workflows are skills; persona-as-skill holds shared resources; no separate `workflows/` dir.

**Rationale:**
- BMM is canonical reference; TEA is pre-consolidation community
- Concern 2 fix (PR #2) committed BAM to BMM all-in-skills
- Single discovery path: marketplace.json lists ALL skills uniformly
- Cross-family workflows (P11) live in `bmad-bam-platform/2-modules/` per spec §5.9 (platform-owned)

**Consequence:** No TEA-style top-level `workflows/` directory in any BAM module.

### 19.7 Menu-code 3-char Z-prefix extension (H3) — ADR-013

**BMM uses predominantly 2-char codes** (`DP`, `WB`, `CR`, etc. — 31 of 32 codes verified at `external/bmad-method/src/bmm-skills/module-help.csv`) with rare 3-char exception (`GPC` for `bmad-generate-project-context`).

**BAM uses 3-char Z-prefix codes:** `ZTI`, `ZAH`, `ZRP`. Reserved namespace: 676 codes (Z + 26 × 26).

**Resolution (ADR-013):** **BAM extends BMM's enum.** 3-char codes are already accepted by BMAD's menu-code parser (proven by BMM's `GPC`). BAM's universal Z-prefix is a deliberate convention, not an oversight. Collision with BMM impossible: BMM does not allocate any Z-prefixed code as of BMAD 6.6.0; BAM reserves the entire Z-prefix space.

**Per-module sub-prefix:**
- `Z` — BAM platform + cross-cutting (current)
- Future modules MAY use sub-prefixes (e.g., `ZA*` = AI, `ZT*` = Trust); decision deferred to Wave P5 brainstorm
- 3-char preferred; reserved 2-char only if BMM allows (verify before assigning)

### 19.8 `_meta` row + llms.txt publication (H4)

**BMM pattern:** module-help.csv first non-header row is `_meta` pointing to docs:

```
BMad Method,_meta,,,,,,,,,false,https://docs.bmad-method.org/llms.txt,
```

**BAM canonical:**

```
BAM Platform,_meta,,,,,,,,,false,_bmad/bam-platform/llms.txt,
BAM Data,_meta,,,,,,,,,false,_bmad/bam-data/llms.txt,
[per module]
```

**llms.txt content (per module):** Machine-readable summary of all skills (menu-code, output-location, one-line description). Generated automatically from module-help.csv + SKILL.md headers via `tools/generate-llms-txt.sh <module-code>` — **Wave P3 deliverable**.

**Decision:** Until v6.0 release, llms.txt URLs are local file paths (`_bmad/<mod>/llms.txt`). Post-v6.0, public docs site URLs may replace local paths.

### 19.9 Cross-PERSONA content reference (H5)

**Tension:** Cross-MODULE fragment reference is documented (§4); cross-PERSONA reference (e.g., Cipher's workflow citing Atlas's fragment) is not.

**Rule:** Identical to cross-module — use explicit installed paths with tool-aware fallback.

**Examples:**
- Cipher workflow references Atlas: `_bmad/bam-platform/bmad-bam-agent-atlas/resources/fragments/sentinel.md`
- Rune workflow references Cipher: `_bmad/bam-trust/bmad-bam-agent-cipher/resources/fragments/audit-trail.md`
- Iris workflow references Nova: `_bmad/bam-ai/bmad-bam-agent-nova/resources/fragments/llm-eval-strategy.md`

**Tool-aware path fallback (same as §4):**
1. `.claude/skills/<other-skill>/resources/fragments/<name>.md`
2. `.cursor/skills/<other-skill>/resources/fragments/<name>.md`
3. `_bmad/<other-mod>/<other-skill>/resources/fragments/<name>.md`

No new mechanism — same convention extended across personas.

### 19.10 BMM upstream contribution pathway (H6)

**When BAM discovers a BMAD/BMM bug or improvement during v6 build:**

1. **Document in discovering-persona's sidecar:** `_bmad/_memory/<persona>/upstream-issues/<YYYY-MM-DD>-<short>.md`
2. **Create minimal repro:** isolate from BAM context; show it occurs in vanilla BMAD
3. **Open BMAD-method issue:** at `https://github.com/bmad-code-org/bmad-method/issues` (verify URL before posting)
4. **Reference in BAM ADR:** if BAM works around the bug, the workaround ADR cites the upstream issue ID
5. **PR back if possible:** small fix → direct PR to bmad-method; large fix → propose in issue first

**Cadence:** Quarterly upstream-issues review; close obsolete entries when BMAD ships fixes.

**Anti-pattern:** Permanently working around a BMAD bug without filing upstream — divergence compounds.

### 19.11 BMAD-main forward-compat CI (M1)

See §14 — full GitHub Actions workflow YAML. Cadence: nightly (Mondays 6am UTC); auto-files issue on failure. Triage in next BAM session.

### 19.12 TEA submodule sync cadence (M2)

See §14 — quarterly review (Jan/Apr/Jul/Oct first Monday) protocol.

### 19.13 `args` column convention (M3)

**Common BAM args:**

| Pattern | Use case | Example |
|---|---|---|
| `[path]` | Validation workflows take a target path | `bmad-bam-verify-tenancy-model [_bmad-output/planning/tenancy-model.md]` |
| `--tier=<id>` | Tier-specific design workflows | `bmad-bam-design-tenancy-model --tier=enterprise` |
| `--tenant=<id>` | Multi-tenant operation workflows | `bmad-bam-tenant-migrate --tenant=t-001` |
| `--vertical=<pack>` | Vertical-pack-specific compliance | `bmad-bam-verify-compliance --vertical=HIPAA` |

**Rule:** Args are optional; workflows MUST function without args (default behavior). Args are advisory shortcuts. Empty `args` column = no special arg shape.

### 19.14 `required` boolean per skill (M4)

**Rule:** A skill is `required: true` if its absence blocks phase completion.

**Per-module required skills (canonical; workflow names verified against spec §5.X 2026-05-16):**

| Module | Required skills (`required: true`) | Spec ref |
|---|---|---|
| platform | `bmad-bam-design-tenancy-model`, `bmad-bam-design-modular-monolith`, `bmad-bam-finalize` (from §5.9 cross-family) | §5.1 #1, #2 |
| data | `bmad-bam-design-schema-architecture`, `bmad-bam-design-retention-deletion` | §5.2 #1, #13 |
| ai | `bmad-bam-design-ai-runtime`, `bmad-bam-design-ai-safety-policy` | §5.3 #25, #23 |
| ux | `bmad-bam-design-theme-token-architecture`, `bmad-bam-design-agent-ui-patterns` | §5.8 #1, #6 |
| rag | `bmad-bam-design-vector-store`, `bmad-bam-design-retrieval-eval` | §5.4 #1, #8 |
| integration | `bmad-bam-design-module-facades`, `bmad-bam-design-public-api`, `bmad-bam-verify-convergence` | §5.5 #1, #4, #10 |
| trust | `bmad-bam-map-compliance`, `bmad-bam-verify-trust-controls` | §5.6 #12, #15 |
| ops | `bmad-bam-design-observability`, `bmad-bam-verify-production-readiness` | §5.7 #1, #15 |
| cross-family | `bmad-bam-start`, `bmad-bam-smoke-test`, `bmad-bam-verify-production-readiness-final`, `release-gate-orchestrator` | §5.9 #1, #2, #12, #13 |

All others default to `required: false` (optional/situational). Note: `design-deployment-topology` is in `bmad-bam-platform` (§5.1 #3), NOT ops — prior v4 draft mis-mapped it. `verify-production-readiness-final` (§5.9 #12, cross-family) and `verify-production-readiness` (§5.7 #15, ops module) are DIFFERENT workflows; both required at their respective scopes.

### 19.15 BMM `bmad-generate-project-context` integration (M5)

**BMM:** `bmad run bmad-generate-project-context` → `{output_folder}/project-context.md`.

**BAM:** `bmad-bam-finalize` → `{output_folder}/<module-code>/project-context.md` (per canonical §19.4; e.g., `{output_folder}/bbp/project-context.md` for platform).

**Integration rule:** `bmad-bam-finalize` step-01 SHOULD call `bmad run bmad-generate-project-context` first if `{output_folder}/project-context.md` does not exist. Ensures BMM's context is present before BAM augments.

**Rationale:** BAM's per-module `project-context.md` describes BAM-specific facts (gates, fragments, patterns) for that module; BMM's `project-context.md` describes BMM-driven project facts (architecture, PRD, stories). Both contribute to LLM context via universal-glob. Order matters because BAM's content may reference BMM's.

**Test:** Wave P4+ real-install test verifies both files present after finalize.

### 19.16 Skill manifest schema reconciliation (M6) — empirically resolved

**Empirical finding (2026-05-16, v4.2 self-validation):** Read BMM skills at `external/bmad-method/src/bmm-skills/1-analysis/bmad-agent-analyst/` and `3-solutioning/bmad-create-architecture/`. **BMM has NO `bmad-skill-manifest.yaml` file.** Manifest-equivalent data is minimal YAML frontmatter in `SKILL.md`:

```yaml
---
name: bmad-create-architecture
description: 'Create architecture solution design decisions for AI agent consistency. Use when the user says...'
---
```

**Only 2 fields:** `name` + `description`. No `latency_budget`, `recommended_capabilities`, `minimum_persona_version`, `inputs`, `outputs`, `gate`, `dependencies`, etc.

**Consequence:** **Spec §6.2's 10-field `bmad-skill-manifest.yaml` is BAM-invented**, not BMM-canonical. BAM currently has a separate manifest file (e.g., `src-v6/bmad-bam-platform/9-infrastructure/bmad-bam-finalize/bmad-skill-manifest.yaml`); BMM puts the same idea (minimal) inside SKILL.md frontmatter.

**Decision options for Wave P3.0 prereq:**

| Option | Description | Tradeoff |
|---|---|---|
| (a) Align to BMM minimal | Move `name`+`description` into SKILL.md frontmatter; drop `bmad-skill-manifest.yaml`. Inputs/outputs/gates/capabilities live in step file frontmatter (BMM convention). | + BMM-canonical. − Loses BAM's richer per-skill metadata. |
| (b) Keep BAM extension | Keep `bmad-skill-manifest.yaml`; document as BAM extension. Add `name`+`description` to SKILL.md frontmatter too (BMM-required minimum). | + Preserves BAM richness. − Maintains divergence. |
| (c) Petition BMAD upstream | Propose 10-field manifest to BMM. | + Long-term canonical. − Long lead time. |

**Recommendation:** Option (b) for v6.0 (preserve BAM richness while ensuring BMM-required minimum frontmatter present); option (c) post-v6.0 if BAM contributes to bmad-method upstream.

**ADR allocation:** Pull next-available ADR ID from Wave P3.0's reservation (ADR-014 first slot) for the manifest decision. Track upstream divergence as `_bmad/_memory/atlas/upstream-issues/2026-05-16-bmm-manifest-divergence.md` per §19.10 BMM contribution pathway.

**Spec §6.2 reconciliation:** Patch spec §6.2 in Wave P3.0 to read "BAM extends BMM's minimal SKILL.md frontmatter with a separate `bmad-skill-manifest.yaml` for the additional 8 fields documented herein. BMM-required `name`+`description` ALSO present in SKILL.md frontmatter per BMM canon."

### 19.17 TEA persona-as-workflow-router pattern recognition (M7)

**TEA precedent:** `external/bmad-tea/src/agents/bmad-tea/` is a persona-skill AND has workflows in `src/workflows/` referencing it via cross-skill paths (e.g., `src/workflows/testarch/.../atdd-checklist-template.md:344` → `agents/bmad-tea/resources/knowledge/`).

**BAM application (Concern 2 fix):** `bmad-bam-agent-atlas/` is invocable AND a shared resource. Workflow skills (design-tenancy-model, smoke-test, finalize) reference Atlas's fragments via explicit paths.

**Documentation note:** This pattern's empirical lineage is **TEA → BAM**. Future personas (Nova, Iris, Kai, Cipher, Rune) all inherit. Each persona-skill's customize.toml uses `[agent]` namespace; each workflow-skill's uses `[workflow]`. The `[agent]`/`[workflow]` split is BMM-canonical — preserved verbatim.

### 19.18 `bmad list-modules` registration (L1)

**BMAD CLI:** `bmad list-modules` discovers installed modules via `_bmad/<mod>/module.yaml`.

**Release-gate check (§17 step 13):** After each BAM module install, `bmad list-modules` output must include the module's `display_name`. Per-module:

```bash
bmad list-modules | grep "BAM Platform" || echo "FAIL: platform not registered"
bmad list-modules | grep "BAM Data" || echo "FAIL: data not registered"
# ...etc
```

### 19.19 Recursive workflow invocation (L2)

**BMM pattern:** Workflows can invoke other workflows (e.g., `bmad-create-story:validate` calls `bmad-create-story` then validation step).

**BAM use case:** `release-gate-orchestrator` (Wave P11.2) invokes in sequence:
- `bmad-bam-verify-tenancy-model`
- `bmad-bam-verify-data-isolation`
- `bmad-bam-verify-ai-safety`
- `bmad-bam-verify-trust-controls`
- `bmad-bam-verify-production-readiness-final`

…halting on first failure.

**Implementation:** `release-gate-orchestrator/steps/step-01-c-orchestrate.md` describes the chain in step body; LLM executes each sub-workflow via `bmad run <name>`. No new mechanism — relies on BMM's workflow-invocation primitive.

### 19.20 `display-name` brevity (L3)

**Rule:** `display-name` in module-help.csv is **≤4 words, ≤30 chars**. Skill folder name is the long descriptive identifier; display-name is the human label.

**Examples:**

| Skill folder | Display-name (good) | Display-name (bad) |
|---|---|---|
| `bmad-bam-design-tenancy-model` | `Design Tenancy` | `Design Tenancy Model with Isolation` ❌ |
| `bmad-bam-verify-production-readiness-final` | `Verify Production` | `Verify Production Readiness Final Gate` ❌ |
| `bmad-bam-finalize` | `Finalize BAM` | `Finalize BAM Module Activation` ❌ |

**Enforcement:** §4 universal checklist item.

---

## v4 self-critique fix log (this version)

This v4 builds on v3 by fixing 20 BMM/TEA compatibility gaps surfaced in the third self-critique pass:

| ID | Severity | Fix | Location |
|---|---|---|---|
| C1 | CRITICAL | module-help.csv 13-col schema | §19.1, §4 |
| C2 | CRITICAL | Output-location resolved variables | §19.2, §4, §17 |
| C3 | CRITICAL | Phase-column decoupling — ADR-011 | §19.3, §13 |
| C4 | MED (revised from CRITICAL after empirical re-check) | Multi-module sentinel aggregation reframed: per-module subdir convention is BMM-compatible; context-budget growth concern | §19.4, §6 |
| H1 | HIGH | Workflow chaining DAG | §19.5, §4 |
| H2 | HIGH | All-in-skills decision — ADR-012 | §19.6, §13 |
| H3 | HIGH | Menu-code Z-prefix extension — ADR-013 | §19.7, §4, §13 |
| H4 | HIGH | `_meta` row + llms.txt | §19.8, §4, §17 |
| H5 | HIGH | Cross-persona reference rule | §19.9 |
| H6 | HIGH | BMM upstream contribution pathway | §19.10, §6 |
| M1 | MED | BMAD-main forward-compat CI | §19.11, §14 |
| M2 | MED | TEA submodule sync cadence | §19.12, §14, §6 |
| M3 | MED | `args` column convention | §19.13 |
| M4 | MED | `required` boolean per skill | §19.14, §4 |
| M5 | MED | bmad-generate-project-context integration | §19.15 |
| M6 | MED | Skill manifest reconciliation (P3 prereq) | §19.16 |
| M7 | MED | TEA persona-as-workflow-router lineage | §19.17 |
| L1 | LOW | bmad list-modules registration | §19.18, §17 |
| L2 | LOW | Recursive workflow invocation | §19.19 |
| L3 | LOW | `display-name` brevity | §19.20, §4 |

**Combined v1+v2+v3+v4 fixes: 68 gaps total resolved across navigation, resilience, edge cases, and BMM/TEA compatibility. ADRs reserved: 011 (phase decoupling), 012 (all-in-skills), 013 (menu-code extension) — to be authored during Wave P3.0 prereq work.**

