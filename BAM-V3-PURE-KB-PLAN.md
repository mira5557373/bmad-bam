# BAM v3 — Verified BMAD-Native Architecture Plan

**Version:** v3.0-rc1 (planning, BMAD v6.4.0-aligned)
**Date:** 2026-05-04
**Branch:** `feat/bam-v3-pure-kb`
**Strategy:** Option C — 5 retained BAM skills + Pure KB + native injection
**Effort:** ~25 hours across 8 phases

---

## Document Lineage

This document supersedes ALL prior compatibility plans:
- `BAM-V2-BMAD-CONSOLIDATED-GAP-REPORT.md` (templates only — partial scope)
- `BMAD-BAM-V2-PATTERN-SYSTEMS-DEEP-ANALYSIS.md` (patterns only — partial scope)
- `BAM-GAP-ANALYSIS-REPORT-2026-04-24.md` and earlier (superseded)

The architecture below is **verified against BMAD v6.4.0 source code** including:
- `external/bmad-method/docs/how-to/customize-bmad.md`
- `external/bmad-method/src/bmm-skills/module.yaml`
- `external/bmad-method/src/core-skills/bmad-customize/SKILL.md`
- `external/bmad-method/src/core-skills/bmad-help/SKILL.md`
- `external/bmad-method/src/core-skills/bmad-party-mode/SKILL.md`
- `external/bmad-method/tools/skill-validator.md` (27 named rules)
- `external/bmad-method/docs/how-to/install-custom-modules.md`
- `external/bmad-method/src/bmm-skills/3-solutioning/bmad-create-architecture/customize.toml`
- 14+ other BMAD v6.4.0 customize.toml samples (all confirmed `**/project-context.md` glob)

---

## 1. Architectural Discoveries (Why This Plan Replaces Prior Plans)

### Discovery 1: BMAD Has a Native KB Injection Mechanism

**Every BMAD v6.4.0 skill** ships with this in its `customize.toml`:
```toml
persistent_facts = [
  "file:{project-root}/**/project-context.md",
]
```

This is a **glob pattern**: any `project-context.md` anywhere in the project tree is auto-loaded as foundational context. **BAM does not need to ship customize TOML overrides** — it just needs to write ONE file that BMAD's existing glob picks up.

### Discovery 2: BMAD Has Two Customization Surfaces (Not One)

| Surface | Files | What it controls | Consumed by |
|---|---|---|---|
| **Per-Skill Customize** | `_bmad/custom/<skill-name>.toml` (+ `.user.toml`) | One skill's persistent_facts, menu, persona | That skill only |
| **Central Config** | `_bmad/config.toml` (+ `.user.toml`, `_bmad/custom/config.toml`, `_bmad/custom/config.user.toml`) | Cross-cutting: agent ROSTER, install answers | `bmad-party-mode`, `bmad-retrospective`, `bmad-help` |

BAM personas belong in **Central Config** (declared via `module.yaml > agents:`), NOT per-skill customize files.

### Discovery 3: `_bmad/custom/` is User-Owned, Not Module-Owned

> "`_bmad/custom/` folder starts empty. Files only appear when someone actively customizes."

Modules **MUST NOT** ship files into `_bmad/custom/`. BAM ships TOML examples in `data/customize-templates/` that the user can copy via `bmad-customize` skill.

### Discovery 4: Module Discovery Requires `SKILL.md` (Direct Mode) or `marketplace.json` (Discovery Mode)

> "Direct mode: Scans the directory for skills (subdirectories with `SKILL.md`), resolves as a single module"

A pure-zero-skills BAM would NOT be discovered by `npx bmad-method install` in Direct mode. We retain 5 skills to ensure both modes work.

### Discovery 5: BMAD Has a Skill Validator with 27 Rules

`external/bmad-method/tools/skill-validator.md` defines 27 named rules (SKILL-01..07, WF-01..03, PATH-01..05, STEP-01..07, SEQ-01..02, REF-01..03). All retained BAM skills must pass these.

### Discovery 6: BMAD Already Has `bmad-generate-project-context` Skill

`bmm-skills/3-solutioning/bmad-generate-project-context/SKILL.md` is the canonical generator for `project-context.md`. BAM extends this concept — providing its KB as a pre-generated context that this skill (or installer) can synthesize.

---

## 2. The Architecture

```text
BAM v3 source tree:
├── src-v2/
│   ├── module.yaml                    # BMAD-compatible manifest
│   │   ├── code: bam
│   │   ├── requires: { bmad: ">=6.4.0" }
│   │   ├── agents: [14 personas]      # auto-distilled to central config
│   │   ├── tenant_model:              # config var (with prompts)
│   │   ├── ai_runtime:                # config var
│   │   └── directories: [...]
│   │
│   ├── module-help.csv                # bmad-help catalog
│   │
│   ├── data/                          # PURE KB
│   │   ├── patterns/         (290 .md)
│   │   ├── checklists/        (15 .md, qg-*)
│   │   ├── domains/           (10 .md — tenant, ai-runtime, ...)
│   │   ├── templates/         (48 .md)
│   │   ├── personas/          (14 .md)
│   │   ├── runbooks/           (NEW — tenant-onboard, tenant-offboard)
│   │   ├── customize-templates/  (NEW — *.toml.example for bmad-customize)
│   │   ├── context/           (bam-core.md — synthesized into project-context)
│   │   ├── sidecar/            (3 .md — _memory templates)
│   │   ├── standards/          (5 .md)
│   │   ├── bam-patterns.csv    (290 rows × 17 cols)
│   │   ├── section-pattern-map.csv
│   │   ├── quality-gates.csv
│   │   ├── tenant-models.csv
│   │   ├── ai-runtimes.csv
│   │   ├── compliance-frameworks.csv
│   │   └── ai-safety-controls.csv
│   │
│   ├── skills/                        # 5 RETAINED skills (was 38)
│   │   ├── bmad-bam-tenant-onboarding/
│   │   ├── bmad-bam-tenant-offboarding/
│   │   ├── bmad-bam-mcp-server-config/
│   │   ├── bmad-bam-rag-pipeline-design/
│   │   └── bmad-bam-master-architecture/
│   │
│   └── customize/                     # 14 persona TOMLs (read by BMAD)
│       └── bmad-bam-agent-*.toml
│
└── .claude-plugin/                    # OPTIONAL: enables Discovery mode
    └── marketplace.json

Project side after install:
└── _bmad/
    └── bam/                           # BAM namespace (own folder, no conflicts)
        ├── project-context.md         # AUTO-LOADED by every BMAD skill via glob
        ├── data/                      # copy of src-v2/data/
        └── _memory/                   # persistent BAM architect memory
```

---

## 3. The 38 → 5 Skill Dissolution

### Retained (5 skills — genuinely BAM-specific, no BMAD equivalent)

| Skill | Why Retain |
|---|---|
| `bmad-bam-tenant-onboarding` | BMAD has no tenant lifecycle workflow |
| `bmad-bam-tenant-offboarding` | Mirror of above |
| `bmad-bam-mcp-server-config` | BMAD has no MCP-specific workflow |
| `bmad-bam-rag-pipeline-design` | BMAD has no RAG pipeline workflow |
| `bmad-bam-master-architecture` | KB-driven multi-tenant overlay (the canonical entry point) |

### Dissolved (33 skills — duplicate BMAD or pure data)

These 33 skills become:
- **`_bmad/bam/project-context.md`** entries (auto-loaded by every BMAD skill)
- **`data/customize-templates/<bmad-skill>.toml.example`** files (user opt-in via `bmad-customize`)
- **`data/runbooks/`** for operational procedures (not workflows)
- **`module-help.csv`** entries pointing to relevant BAM data

Full mapping in `BAM-V3-DISSOLUTION-MAP.md` (Phase 1 deliverable).

---

## 4. Eight-Phase Execution Plan

| Phase | Scope | Hours |
|---|---|---|
| **0. Foundation** | Snapshot baseline; run BMAD validator on existing 38 skills; record findings; commit prior analysis docs | 1.5 |
| **1. module.yaml rewrite** | BMAD-compatible schema with 14 agents block, config vars, directories, install hooks | 3 |
| **2. project-context.md generator** | Update `scripts/post-install.sh` to synthesize `_bmad/bam/project-context.md` from `data/context/` + `data/domains/` | 1 |
| **3. Skill dissolution (33 → 5)** | Delete 33 obsolete skills; verify no broken refs; update tests | 5 |
| **4. 5 retained skills hardening** | Pass all 27 BMAD validator rules; update each `customize.toml` to load relevant BAM patterns | 4 |
| **5. customize-templates** | Generate ~8 `*.toml.example` files for BMAD skills BAM enriches | 2 |
| **6. 14 persona TOML audit** | Add `team: bam`, normalize v6.4.0 schema, update descriptions | 1.5 |
| **7. Pattern frontmatter sync** | Sync 290 pattern .md frontmatter with full CSV schema; add `_index.md` shortcode lookup | 3 |
| **8. Templates + tests + release** | 48 templates BMAD-compatible; update jest; CHANGELOG; MIGRATION; BMB registry PR | 4 |

**Total: ~25 hours**

---

## 5. Acceptance Criteria

1. ✅ `npx bmad-method install` finds BAM module (Direct mode via 5 skills + Discovery mode via marketplace.json)
2. ✅ After install, BMAD's `bmad-create-architecture` auto-loads `_bmad/bam/project-context.md` via existing glob
3. ✅ `bmad-party-mode` finds 14 BAM personas via central config; `--team bam` filter works
4. ✅ `bmad-help` shows BAM resources via module-help.csv registration
5. ✅ `bmad-customize` discovers BAM customize-templates and offers them to users
6. ✅ All 5 retained BAM skills pass `validate-skills.js` (zero CRITICAL or HIGH violations)
7. ✅ Pattern shortcode lookup works via `data/patterns/_index.md`
8. ✅ `npm test` passes (jest tests for module.yaml, customize TOMLs, pattern CSV)
9. ✅ Smoke test: full multi-tenant project produces tenant-aware architecture document
10. ✅ `CHANGELOG.md` documents v2→v3 (BREAKING: 33 skills removed)

---

## 6. Wave Plan

### Wave 1 — Foundation & Audit (~7h)
- Phase 0: Snapshot + validator baseline
- Phase 1: module.yaml rewrite
- Phase 2: project-context.md generator

**Pause for review.** User examines `BAM-V3-VALIDATOR-BASELINE.json` before proceeding.

### Wave 2 — Dissolution (~9h)
- Phase 3: Skill dissolution (33 → 5)
- Phase 4: 5 retained skills hardening

**Pause for review.** User examines deletion diff before merge.

### Wave 3 — Enrichment (~6.5h)
- Phase 5: customize-templates
- Phase 6: persona TOML audit
- Phase 7: pattern frontmatter sync

### Wave 4 — Release (~4h)
- Phase 8: Templates + tests + release engineering

---

## 7. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| BMAD `**/project-context.md` glob doesn't fire reliably | Low | High | Smoke test in Phase 4; fallback: explicit reference in `data/customize-templates/` |
| Validator finds >100 violations on retained skills | Medium | Medium | Time-box Phase 4 to fixing CRITICAL+HIGH only |
| Existing tests break en-masse on skill deletion | High | Medium | Phase 3 includes test rewrite; jest snapshots refreshed |
| `module.yaml` agents block doesn't auto-distill correctly | Low | High | Manually verify by running installer in Phase 1 |
| BMB registry rejects pure-KB-ish module | Low | Low | We retain 5 skills, so module is not pure-KB |
| BAM users break on upgrade (v2→v3 breaking) | High (intended) | Low | Document in MIGRATION; v3 is breaking by design |

---

## 8. Locked Decisions

- ✅ Architecture: 5 retained BAM skills + Pure KB + Central Config personas + glob-based context injection
- ✅ Branch: `feat/bam-v3-pure-kb`
- ✅ Plan doc: `BAM-V3-PURE-KB-PLAN.md` (this file)
- ✅ No backwards compatibility — v3 is breaking
- ✅ No migration script needed (users adopt v3 fresh)
- ✅ Wave 1 first, pause for approval before Wave 2

---

## 9. What Becomes of Each v2 Asset

| v2 Asset | v3 Disposition | Reason |
|---|---|---|
| `src-v2/skills/` (38 dirs) | DELETE 33, KEEP 5 | Per dissolution map |
| `src-v2/data/patterns/` (290 files) | KEEP, sync frontmatter | Pure KB |
| `src-v2/data/checklists/` (~15 files) | KEEP | Pure KB |
| `src-v2/data/domains/` (~10 files) | KEEP, may add cross-refs | Pure KB |
| `src-v2/data/templates/` (48 files) | KEEP, frontmatter compliance | Pure KB |
| `src-v2/data/personas/` (~14 files) | KEEP as docs | Human-readable docs |
| `src-v2/data/standards/` (~5 files) | KEEP | Pure KB |
| `src-v2/data/context/` (5 files) | KEEP, will be source for project-context.md | Pure KB |
| `src-v2/data/sidecar/` (3 files) | KEEP | _memory templates |
| `src-v2/data/*.csv` (7 files) | KEEP, schema audit | Pure KB |
| `src-v2/customize/` (14 personas + 2 wds + 1 cis) | KEEP, audit + normalize | Persona mechanism |
| `src-v2/module.yaml` | REWRITE per Phase 1 | New schema |
| `src-v2/module-help.csv` | UPDATE per Phase 8 | Catalog refresh |
| `bmb-registry-entry.yaml` | UPDATE for v3 | Registry submission |
| `src/` (v1 — unchanged) | LEAVE AS-IS | Frozen v1 reference |

---

*This document is the authoritative source for BAM v3.0 development.*