# BAM v6 — Information Package for Re-Brainstorming on RDP

**Purpose:** Self-contained knowledge package for re-brainstorming BAM v6 architecture in a fresh Claude Code session (e.g. on RDP). Captures **objective facts about BMAD/bmad-builder** plus **the design space we've explored**, but leaves design decisions **open** for re-brainstorming.

**How to use this doc:**
- Parts 2–4 are **verified facts** — won't change
- Parts 5–6 are **current state** — verified at time of writing
- Parts 7–12 are **design space** — open for re-brainstorming
- Part 11 is a **copy-paste kickoff prompt** for the RDP session

---

## Part 1 — Why v6 exists (the architectural evolution)

| Version | Mental model | Lines of BAM-owned code (approx) | Why moved on |
|---|---|---:|---|
| v2 | "Parallel skill ecosystem alongside BMAD" — 38 BAM-specific skills duplicating BMAD's lifecycle | ~10,000 | Maintenance nightmare; duplicate of BMAD |
| v3 | "BMAD module with KB + 5 retained skills" | ~4,000 | Discovered universal-glob mechanism; 5 retained skills were arbitrary; persona model asymmetric (3 architects + 11 specialists); CSV/disk drift; broken marketplace.json |
| v4 (proposed) | "kb-driven multi-channel package with 5 adapters (BMAD + Cursor + Claude Code + MCP + npm)" | ~1,500 | **Empirically wrong**: BMAD already reaches 47 coding-agent platforms via `--tools` flag; separate adapters were reinventing BMAD's tool layer |
| v5 (proposed) | "Knowledge pack consumed by BMAD's existing skills" | ~300 | Better but still hand-rolled module.yaml, custom post-install.sh — reinvented things bmad-builder generates |
| **v6 (current target)** | **"Canonical BMAD module (same shape as bmad-tea/cis/wds), authored using bmad-builder"** | **~150** | Authored end-to-end with bmad-builder skills; everything possible delegated to existing BMAD primitives |

**The leverage chain:** each generation recognized more of what BMAD already does. v6 stops where reinventing would have to start.

---

## Part 2 — BMAD method facts (verified empirically)

### Multi-tool reach: BMAD installer supports 47 coding-agent platforms

From `external/bmad-method/tools/installer/ide/platform-codes.yaml`:
- **Preferred** (tagged): Claude Code, Cursor, Codex, GitHub Copilot
- **Cross-tool standard** `.agents/skills/`: Cursor, Codex, GitHub Copilot, Windsurf, Continue, OpenCode, OpenHands, Roo, Warp, Mistral Vibe, Crush, Mux, Goose, Gemini CLI, Auggie, Sourcegraph Amp, Replit, Rovo Dev, ~12 others
- **Tool-specific paths**: Claude Code (`.claude/skills/`), Cline (`.cline/skills/`), Snowflake Cortex, Factory Droid, Junie, Kiro, Kode, Qoder, QwenCoder, Trae, IBM Bob, Neovate, Ona, AdaL, etc.

**Install command:**
```bash
npx bmad-method install --modules bmm,<your-module> --tools claude-code,cursor,github-copilot
```
Single command, multi-tool deployment. **BAM does not need to write tool-specific code.**

### The universal-glob mechanism (BAM's keystone)

Every BMAD v6.4.0+ customize.toml ships:
```toml
persistent_facts = ["file:{project-root}/**/project-context.md"]
```

This is a **glob**. Any `project-context.md` anywhere in the project tree is auto-loaded as foundational context by every BMAD skill. **43 BMAD v6.6.0 customize.toml files use this pattern** — verified by grep across `external/bmad-method/src/`.

**Implication:** Drop `_bmad/<module>/project-context.md` once, and every BMAD skill becomes module-aware. Zero per-skill configuration needed.

### Three-layer customize override model

```
Priority 1 (wins): _bmad/custom/{skill-name}.user.toml  (personal, gitignored)
Priority 2:        _bmad/custom/{skill-name}.toml        (team/org, committed)
Priority 3 (last): skill's own customize.toml                    (defaults)
```

Resolved at runtime by `_bmad/scripts/resolve_customization.py` (Python stdlib `tomllib`, no deps). Every BMAD SKILL.md's "On Activation" section invokes this resolver. Works across all 47 platforms because the SKILL.md text drives the agent.

### Skill validator (27 rules)

`external/bmad-method/tools/validate-skills.js` checks every skill against 27 named rules. Categories: SKILL-01..07 (frontmatter/description), WF-01..03 (workflow), PATH-01..05 (path conventions), STEP-01..07 (step files), SEQ-01..02 (sequencing), REF-01..03 (cross-references).

### BMAD core skills (in `external/bmad-method/src/core-skills/`)

| Skill | What it does | Relevance to BAM v6 |
|---|---|---|
| `bmad-customize` | Authors customize-template overrides into `_bmad/custom/*.toml` | BAM customize-templates plug here |
| `bmad-help` | Reads `_bmad/_config/bmad-help.csv`, recommends next skill | BAM registers via `module-help.csv` |
| `bmad-party-mode` | Multi-persona collaboration via `_bmad/config.toml [agents.*]` | BAM's 3 personas surface here |
| `bmad-distillator` | "Lossless LLM-optimized compression of source documents" — produces distillates | **BAM can use this to compress kb/ on demand** — no hand-rolled compression |
| `bmad-shard-doc` | Shards large documents | For long runbooks |
| `bmad-index-docs` | Indexes docs | For pattern discovery |
| `bmad-brainstorming` | Brainstorming primitive | — |
| `bmad-advanced-elicitation` | Deep elicitation | — |
| `bmad-editorial-review-prose` / `-structure` | Editorial review | For kb quality |
| `bmad-review-adversarial-general` | Adversarial review | For QG checklists |
| `bmad-review-edge-case-hunter` | Edge case hunting | For kb completeness |

### BMM lifecycle skills (in `external/bmad-method/src/bmm-skills/`)

Phase 1 — Analysis:
- bmad-product-brief, bmad-prfaq, bmad-document-project, bmad-{domain,market,technical}-research, bmad-agent-analyst, bmad-agent-tech-writer

Phase 2 — Plan workflows:
- bmad-create-prd, bmad-edit-prd, bmad-validate-prd, bmad-create-ux-design, bmad-agent-pm, bmad-agent-ux-designer

Phase 3 — Solutioning:
- bmad-create-architecture, bmad-create-epics-and-stories, bmad-check-implementation-readiness, bmad-agent-architect, **bmad-generate-project-context**

Phase 4 — Implementation:
- bmad-investigate, bmad-create-story, bmad-dev-story, bmad-quick-dev, bmad-checkpoint-preview, bmad-code-review, bmad-correct-course, bmad-qa-generate-e2e-tests, bmad-sprint-planning, bmad-sprint-status, bmad-retrospective, bmad-agent-dev

> ⚠ **`bmad-generate-project-context` already exists.** v3/v4 plans to hand-write `_bmad/bam/project-context.md` were reinventing this skill. v6 should ship a customize-template that enriches it, not its own generator.

### Module distribution

- **BMad Marketplace**: `https://github.com/bmad-code-org/bmad-plugins-marketplace`
- Module ships `marketplace.json` for Discovery mode
- Optional: `bmb-registry-entry.yaml` documents registry submission
- **Agent Skills open standard**: `agentskills.io` — 40+ tool support; BMAD modules are citizens of this standard for free

---

## Part 3 — bmad-builder facts (in `external/bmad-builder/`)

### 5 authoring skills

| Skill | What it builds |
|---|---|
| **bmad-module-builder** | "Plans, creates, and validates BMad modules." 3 modes: **Ideate Module (IM)** brainstorms; **Create Module (CM)** scaffolds module.yaml + module-help.csv + `<module>-setup` skill from existing skills; **Validate Module (VM)** checks structure |
| **bmad-agent-builder** | "Builds, edits or analyzes Agent Skills through conversational discovery." Authors `agents/<name>/SKILL.md + customize.toml + resources/` |
| **bmad-workflow-builder** | "Builds, converts, and analyzes workflows and skills." Authors `workflows/<name>/SKILL.md + customize.toml + steps/` |
| **bmad-eval-runner** | "Run a skill's evals in a clean, isolated environment and report results." For testing skill behavior |
| **bmad-bmb-setup** | One-time setup of bmad-builder in a project |

### Samples (`external/bmad-builder/samples/`)

Real working examples: `bmad-agent-code-coach`, `bmad-agent-creative-muse`, `bmad-agent-diagram-reviewer`, `bmad-agent-dream-weaver`, `bmad-agent-sentinel`, **`sample-module-setup`** (canonical module setup pattern: SKILL.md + assets/{module.yaml,module-help.csv} + scripts/{cleanup-legacy.py, merge-config.py, merge-help-csv.py}).

> **Key insight:** bmad-module-builder's CM mode **auto-generates** the `<module>-setup` skill — you do not hand-write `post-install.sh` for v6.

---

## Part 4 — Canonical BMAD module structure (from real shipping modules)

### bmad-tea (simplest)

```
external/bmad-tea/src/
├── module.yaml          (declares 1 agent: Murat)
├── module-help.csv
├── agents/
│   └── bmad-tea/        ← ONE agent skill (the persona)
│       ├── SKILL.md
│       ├── customize.toml    (universal-glob present!)
│       └── resources/        (agent's own data — tea-index.csv etc.)
└── workflows/
    └── testarch/        ← ONE workflow skill
```

### bmad-cis (multi-skill, flat)

```
external/bmad-cis/src/
├── module.yaml          (declares ~6 agents)
└── skills/              ← flat skills/ instead of agents/+workflows/
    ├── bmad-cis-agent-storyteller/
    ├── bmad-cis-agent-brainstorming-coach/
    ├── ...
```

### bmad-wds (most elaborate)

```
external/bmad-wds/src/
├── module.yaml
├── agents/{freya,mimir,saga}/
├── workflows/
├── data/                ← shared kb at module level
│   ├── agent-guides/{freya,saga}/
│   ├── design-system/
│   └── presentations/
├── scripts/
└── tools/
```

### Conventions verified

| Element | Convention |
|---|---|
| Module root | `src/` |
| Module manifest | `src/module.yaml` |
| Help catalog | `src/module-help.csv` |
| Agent skills | `src/agents/<name>/{SKILL.md, customize.toml, resources/}` |
| Workflow skills | `src/workflows/<name>/{SKILL.md, customize.toml, steps/}` |
| Shared data | `src/data/<topic>/` |
| Setup skill | `src/<module-code>-setup/` (auto-generated) |
| Universal glob | Every customize.toml has `persistent_facts = ["file:{project-root}/**/project-context.md"]` |

**v6 should follow this convention exactly.** A BMAD developer reading v6 should recognize the shape instantly.

---

## Part 5 — Current state of BAM (v3 on disk)

### Branch and history

- Current branch: `feat/bam-v3-pure-kb`
- Recent commits (newest first):
  - `0acc67f test(v3): defer 7 v2-specific test suites + add migration backlog`
  - `40eca3a feat(v3): Wave 4 final — CHANGELOG.md v3 entry`
  - `015a144 feat(v3): Wave 4 — MIGRATION-V2-TO-V3.md`
  - `6cf59af feat(v3): Wave 3 — KB enrichment (customize-templates + runbooks + pattern index)`
  - `826fa73 feat(v3): Wave 2 — dissolve 33 BAM skills + harden 5 retained`
  - `410e9e3 feat(v3): Phase 1+2 — module.yaml v6.4.0 schema + project-context.md generator`
  - `aef9dd0 feat(v3): Phase 0 baseline — BMAD validator audit of 38 skills`
- `origin/main` and local `main` are at `649ec83` (after recent push)

### Asset counts (verified)

| Asset | Disk count | Location |
|---|---:|---|
| Patterns | **113 .md files** (= 112 patterns + `_index.md`) | `src-v2/data/patterns/` |
| Pattern CSV | 290 rows (177-row drift from disk!) | `src-v2/data/bam-patterns.csv` |
| Checklists | **37** (8 referenced in v3 docs, 29 orphan) | `src-v2/data/checklists/` |
| Domains | **20** | `src-v2/data/domains/` |
| Templates | ~48 (in skill `templates/` folders + `data/templates/`) | scattered |
| Personas (docs) | **3** (atlas, nova, kai) | `src-v2/data/personas/` |
| Persona TOMLs (customize) | **11 BAM + 3 cross-module** (no atlas/nova/kai TOMLs) | `src-v2/customize/` |
| Retained skills (v3) | **5** (master-architecture, mcp-server-config, rag-pipeline-design, tenant-{onboarding,offboarding}) | `src-v2/skills/` |
| `module.yaml` | 1 (declares **14 agents** in `agents:` block) | `src-v2/module.yaml` |
| Runbooks | 1 (white-labeling-checklist.md) | `src-v2/data/runbooks/` |
| Standards | 3 | `src-v2/data/standards/` |
| Sidecar memory | 3 | `src-v2/data/sidecar/` |

### Verified-working v3 mechanisms

- Universal glob: 43 BMAD v6.6.0 customize.toml files reference it ✓
- 5 retained skills pass `validate-skills.js`: 0 findings ✓
- All 5 SKILL.md descriptions have "Use when…" trigger ✓
- 112 shortcodes unique, no duplicates ✓
- 37 migration-guide shortcodes resolve to real pattern files ✓
- 8 referenced QG checklists exist (qg-f1, m1-3, i1-3, p1) ✓
- npm test passes: 622 tests across 29 suites ✓
- `bmb-registry-entry.yaml` well-formed ✓

### Broken/cruft in v3 (verified)

- ❌ `.claude-plugin/marketplace.json`: 191 entries pointing to non-existent `./src/workflows/<phantom>` paths; version "1.0.0"; broken
- ❌ `bam-patterns.csv`: 290 rows vs 113 disk files; 177-row drift
- ❌ `scripts/post-install.sh` (separate from `bam-post-install.sh`): dead v2 code, references `../src/`
- ❌ Persona triple-mismatch: 14 agents declared, 11 customize TOMLs, 3 persona docs (asymmetric)
- ❌ `CLAUDE.md`: describes v2 architecture (38 skills, CEV modes); outdated
- ❌ `GAP-ANALYSIS-REPORT-V3.md`: misnamed; actually about v1 `src/` from 2026-04-06
- ❌ 2 uncommitted modified docs in git status (BAM-V3-PURE-KB-PLAN.md, BAM-V3-VALIDATOR-BASELINE.md)
- ❌ Universal-glob smoke test missing (load-bearing mechanism untested in CI)
- ❌ 29 orphan checklists (qg-ai1/2/3, qg-av1, qg-bv1, qg-cc, qg-ce1, etc.) — unreferenced v2 leftovers

### Submodules state (recently updated)

| Submodule | Tag | Notes |
|---|---|---|
| bmad-builder | v1.7.0-1-g72628e2 | Added `bmad-eval-runner` skill |
| bmad-cis | v0.2.0-2-gc2ad6c4 | (unchanged) |
| bmad-method | v6.6.0-11-gb5b33c08 | Added `bmad-investigate`; refactored `bmad-product-brief` |
| bmad-tea | v1.17.0 | Two minor version bumps |
| bmad-wds | v0.3.1-21-g35500f4 | Added Mimir agent + memory tool |

---

## Part 6 — v6 architecture summary (the target)

### Canonical structure

```
bmad-bam/
├── src/
│   ├── module.yaml                          (generated by bmad-module-builder)
│   ├── module-help.csv                      (generated by bmad-module-builder)
│   ├── agents/
│   │   ├── bmad-bam-atlas/                  (Platform Architect — built by bmad-agent-builder)
│   │   ├── bmad-bam-nova/                   (AI Runtime Architect)
│   │   └── bmad-bam-kai/                    (Integration Architect)
│   ├── workflows/                            (0-5 workflow skills — built by bmad-workflow-builder)
│   │   ├── bmad-bam-tenant-onboarding/
│   │   ├── bmad-bam-tenant-offboarding/
│   │   ├── bmad-bam-mcp-server-config/
│   │   ├── bmad-bam-rag-pipeline-design/
│   │   └── bmad-bam-smoke-test/             (universal-glob keystone test)
│   ├── data/                                 (KB — shared knowledge)
│   │   ├── patterns/        (~112)
│   │   ├── runbooks/        (~5)
│   │   ├── decisions/       (~3)
│   │   ├── checklists/      (~8 quality gates)
│   │   ├── personas/        (~3)
│   │   ├── templates/       (~48)
│   │   ├── domains/         (~20)
│   │   ├── customize-templates/  (~6 .toml.example for opt-in BMAD enrichment)
│   │   └── _generated/      (build-time indices)
│   └── bmad-bam-setup/                       (auto-generated by bmad-module-builder CM)
├── evals/                                    (kb integrity + skill behavior)
├── tools/
│   └── generate-indices.py                   (single build step)
├── docs/
├── CHANGELOG.md
├── package.json
└── README.md
```

### Design principles (locked architectural commitments)

1. **kb is the only source of truth** — no CSV registry, frontmatter is canonical
2. **3 personas, period** — Atlas/Nova/Kai (drop v3's 11 specialists; universal glob makes them redundant)
3. **Skills authored with bmad-builder** — no hand-rolled module scaffolding
4. **All operational concerns delegated to BMAD primitives** — distillator for compression, shard-doc for sharding, party-mode for personas, customize for overrides, eval-runner for tests, etc.
5. **One adapter (BMAD)** — BMAD's `--tools` flag reaches 47 platforms; no Cursor/Claude/MCP/npm adapters
6. **Universal glob is the keystone** — must have a CI smoke test
7. **Scope discipline** — patterns/runbooks/decisions/checklists/personas/templates/domains. NOT: customer's monitoring stack, billing system, dashboard UI, i18n, audit execution

---

## Part 7 — The 12 gaps identified in v6 (still need design decisions)

| # | Gap | Open question for re-brainstorming |
|---|---|---|
| G1 | Universal-glob keystone untested | What's the smoke test mechanism? Token-grep? Sample-skill invocation? CI eval? |
| G2 | Workflow vs runbook ambiguity | Which BAM concepts ship as workflow skills vs data runbooks? |
| G3 | Persona ownership + handoff schema | How do Atlas/Nova/Kai own patterns? How do they hand off state to each other? |
| G4 | No kb integrity tests | Which evals are mandatory? Frontmatter completeness? Cross-ref resolution? Shortcode uniqueness? |
| G5 | No version migration mechanism | How does v3→v6 upgrade happen for existing users? |
| G6 | Customize-templates UX is "look in docs" | How do users discover and apply BAM's customize-templates? |
| G7 | No first-time UX after install | What does a new user see? Quick-start? Banner? Auto-tutorial? |
| G8 | 112 patterns no first-class catalog | How do users find patterns? Index? Catalog page? Sentinel skill menu? |
| G9 | No skill behavior evals | What do Atlas/Nova/Kai evals test? Activation? Context-loading? Handoff? |
| G10 | No mechanism for production learnings → kb | How does an incident at AcmeAI become a BAM pattern PR? |
| G11 | Pattern criticality not differentiated | 3 tiers? 5 tiers? Which patterns are essential? Manual classification or heuristic? |
| G12 | Context-conflict policy undefined | What if user has multiple modules each shipping project-context.md? |

---

## Part 8 — The 6 sub-projects decomposition

v6 is too large for a single spec. Natural decomposition:

| # | Sub-project | Scope | ~Hours | Dependencies |
|---|---|---|---:|---|
| 1 | **kb-canonicalize** | Migrate `src-v2/data/` → `src/data/`; rich frontmatter; tier classification; aggressive cleanup of v3 cruft | 10-14 | foundation |
| 2 | **module-scaffolding** | Use bmad-builder to scaffold `module.yaml`, 3 agents, 0-5 workflows, setup skill | 5-7 | #1 |
| 3 | **production-gates** | Universal-glob smoke test, persona handoff schema, kb integrity evals | 4-6 | #2 |
| 4 | **lifecycle-and-discovery** | Quick-start UX, pattern catalog generator, customize-templates discoverability | 3-5 | #2 |
| 5 | **evolution-and-migration** | v3→v6 migration skill, contribute skill, context-conflict detection | 4-5 | #1, #2 |
| 6 | **release-and-distribution** | CHANGELOG, marketplace.json, tagging, docs site, BMB registry PR | 2-3 | all |

**Total: ~28-40h.** Each is independently spec-able and ship-able.

**Recommend brainstorm order: 1 → 2 → 3 → 5 → 4 → 6** (foundation, then scaffolding, then production safety, then evolution mechanisms, then polish, then release).

---

## Part 9 — Decisions we explored (but you're free to re-decide)

These came up in our prior brainstorming. **Treat as reference data points, not constraints** for your re-brainstorming.

### For kb-canonicalize

| Question | Direction we leaned |
|---|---|
| Cleanup posture | Aggressive (drop CSV, drop 29 orphan checklists, delete frozen v1 `src/`, delete broken marketplace.json + dead scripts) |
| Frontmatter schema | Full v6 (~13 fields) for all 112 patterns |
| Tier classification | Hybrid (heuristic first pass + human review for tier-1) |
| Persona ownership location | Inverted — in `src/agents/<name>/resources/pattern-ownership.md`, NOT in pattern frontmatter |
| Execution approach | Sequenced PRs (4 small PRs vs big-bang) |

### For v6 architecture broadly

| Question | Direction we leaned |
|---|---|
| Source of truth | Frontmatter in `.md` files; CSV regenerated if needed |
| Personas | 3 (Atlas/Nova/Kai); drop v3's 11 specialists |
| Workflows | 4-5 BAM-specific workflow skills (tenant-onboard/offboard, MCP, RAG, smoke-test) |
| project-context.md generation | Use `bmad-generate-project-context` + BAM customize-template; do NOT write our own generator |
| Install-time prompts | Zero (decisions made via decision-frameworks during architecture phase, not install) |
| Distribution | BMAD marketplace via bmb-registry-entry; BMAD's `--tools` flag handles 47 platforms |

---

## Part 10 — Open questions you should re-brainstorm

These are genuinely unsettled. Bring fresh perspective on RDP:

1. **Greenfield vs evolution branch strategy** — new branch off `main` (clean) vs continue `feat/bam-v3-pure-kb`?
2. **Is "aggressive cleanup" too aggressive?** — should we archive instead of delete?
3. **3 personas or N personas?** — is the 11-specialist case truly noise, or is some valuable?
4. **Workflows vs runbooks split** — which BAM concepts are truly interactive (workflow) vs procedural (runbook)?
5. **Tier classification mechanism** — heuristic + override, pure manual, LLM-assisted?
6. **kb integrity test posture** — strict (cross-refs MUST resolve) vs permissive (warnings only)?
7. **Should v6 ship with all 6 sub-projects done as v6.0, or stage them?** — v6.0 + v6.1 + v6.2 + …
8. **What's the v3→v6 migration cost for current users?** — assuming v3 is currently rc1, what do they do?
9. **Telemetry / usage feedback** — should BAM optionally collect anonymized pattern-usage data to inform kb evolution?
10. **i18n posture** — English-only for v6, or include translation scaffolding?

---

## Part 11 — RDP kickoff prompt (copy-paste this into a fresh Claude Code session)

```
I'm working on bmad-bam v6 — a major rewrite of the BAM (BMAD Agentic
Multi-tenant) module for BMAD method. I want to re-brainstorm the v6
architecture from scratch using the brainstorming skill.

Context already established (verified):
- BAM v3 ships on feat/bam-v3-pure-kb branch; main is at 649ec83
- BMAD reaches 47 coding-agent platforms via its --tools flag; we do NOT
  need separate Cursor/Claude Code/MCP/npm adapters
- BMAD has bmad-builder with module-builder, agent-builder, workflow-
  builder, eval-runner skills — we should author v6 using these, not
  hand-roll
- bmad-method already has bmad-generate-project-context skill — we should
  NOT write our own generator
- Canonical BMAD module structure (per bmad-tea/cis/wds): src/{module.yaml,
  module-help.csv, agents/, workflows/, data/, <module>-setup/}
- v3 has known cruft: 290-row CSV vs 113 disk files, broken marketplace.json,
  dead scripts, 14-agent-declaration vs 11-customize-toml mismatch, etc.

v6 design intent:
- Canonical BMAD module shape (like bmad-tea)
- kb is single source of truth (frontmatter, no CSV)
- 3 personas (Atlas/Nova/Kai) — drop v3's 11 specialists
- Everything possible delegated to BMAD's existing skills
- Universal-glob mechanism (loading **/project-context.md) is the keystone
- Scope: multi-tenant agentic AI SaaS expertise — patterns, runbooks,
  decisions, checklists, personas, templates, domains

I have an information package at docs/v6-information-package.md with all
the v6-related facts. Read it before proceeding.

Please use the superpowers:brainstorming skill to:
1. Acknowledge the context above
2. Survey the v6 sub-projects (kb-canonicalize, module-scaffolding,
   production-gates, lifecycle-and-discovery, evolution-and-migration,
   release-and-distribution)
3. Ask which sub-project to brainstorm first (recommend kb-canonicalize
   as foundation)
4. Run the brainstorming flow on that sub-project: clarifying questions
   one at a time, propose 2-3 approaches, present design sections with
   approval gates, write the spec to docs/superpowers/specs/
5. Commit the spec and transition to writing-plans for implementation

Constraints:
- Do NOT lock decisions just because they appear in my information
  package — those were prior exploration; re-brainstorm freely
- Verify BMAD/bmad-builder claims against external/bmad-method/ and
  external/bmad-builder/ on disk before using them
- Run npm test before any PR
- Always commit before destructive operations (deletions, --hard resets)
- Never push to main without explicit approval
- Use git tags for snapshots before risky operations

Start by exploring the current project state (git status, recent commits,
src-v2/ structure, the docs in this repo), then ask your first clarifying
question.
```

---

## Part 12 — Mental model recap

| Aspect | What it is |
|---|---|
| v6 mission | "Canonical BMAD module for multi-tenant agentic AI SaaS expertise — same shape as bmad-tea, authored using bmad-builder" |
| What's preserved from v3 | The KB content (patterns/runbooks/decisions/checklists/personas/templates/domains) |
| What changes vs v3 | Module shape becomes canonical; 14 personas → 3; CSV → frontmatter; hand-rolled tooling → bmad-builder; broken marketplace.json → regenerated |
| What's still BAM's IP | Multi-tenant SaaS expertise + agentic AI expertise + the 3 architect personas |
| What's explicitly NOT BAM | Customer's monitoring stack, billing, dashboards, i18n, audit execution (these are user/ecosystem responsibilities) |
| How users consume v6 | `npx bmad-method install --modules bmm,bam --tools <their-tool>` — works in any of 47 supported coding agents |

---

*Generated 2026-05-11 as handoff context for RDP re-brainstorming session.*
