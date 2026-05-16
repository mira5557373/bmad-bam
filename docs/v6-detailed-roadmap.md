# BAM v6 — Detailed Wave Roadmap & Cross-Validation Workflow

**Date:** 2026-05-16
**Spec source:** `docs/v6-final-architecture.md` v0.9
**Status of foundation:** PR #3 + #5 + #6 + #7 + chore submodule queued for merge
**Purpose:** Comprehensive forward plan for all remaining waves with brainstorm scope, deliverables, cross-validation gates, persona introductions, and cross-cutting work assignments. Nothing missed.

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

---

## 1. Wave catalog (full enumeration)

11 main waves + cross-cutting work + release milestones:

| Wave | Purpose | Persona introduction | Skills | Est. effort | Spec section |
|---|---|---|---|---|---|
| **P0** | Pre-content prereqs (merge 5 queued PRs + Plan C R5) | — | 0 (cleanup) | ~2h | n/a |
| **P3** | Complete `bmad-bam-platform` | Atlas continues | 15 | ~95-115h | §5.1 |
| **P4** | `bmad-bam-data` | Atlas continues | 14 | ~85-100h | §5.2 |
| **P5** | `bmad-bam-ai` | **Nova** 🌟 NEW | 27 | ~150-180h | §5.3 |
| **P6** | `bmad-bam-ux` | **Iris** 🎨 NEW | 12 | ~70-85h | §5.8 |
| **▶ v6.0 RELEASE** | platform + data + ai + ux ready | — | 68 cumulative | RG-Launch (partial) | §10.1 |
| **P7** | `bmad-bam-rag` | Nova continues | 8 | ~50-65h | §5.4 |
| **P8** | `bmad-bam-integration` | **Kai** 🔗 NEW | 13 | ~80-100h | §5.5 |
| **▶ v6.1 RELEASE** | + rag + integration | — | 89 cumulative | + QG-I*, QG-RQ1 | §10.1 |
| **P9** | `bmad-bam-trust` | **Cipher** 🔐 NEW | 16 | ~100-130h | §5.6 |
| **P10** | `bmad-bam-ops` | **Rune** ⚙️ NEW | 16 | ~100-130h | §5.7 |
| **▶ v6.2 RELEASE** | + trust + ops | — | 121 cumulative | + RG-Launch (full) | §10.1 |
| **P11** | Cross-family workflows (in platform) | — | 12 | ~50-70h | §5.9 |
| **PX-MCP** | MCP server (`bmad-bam-mcp`) | — | 0 skills (1 server) | ~30-40h | §9.5 |
| **PX-Migration** | v3 → v6 migration tooling | — | (in platform) | ~25-35h | §13 |
| **PX-Glossary** | Glossary consolidation (40+ terms) | — | (cross-cutting) | ~10-15h | §14 |
| **PX-AntiPatterns** | Anti-patterns library (26 items) | — | (cross-cutting) | ~15-20h | §11 |
| **PX-CustomizeTpl** | Customize-templates inventory (~15) | — | (cross-cutting) | ~25-35h | §7.2 |
| **PX-VerticalPacks** | 6-8 vertical add-on packs (in trust) | — | (in trust) | ~80-120h | §6.7 |

**Total remaining: ~1100-1500h** (matches spec §10.5 estimates).

---

## 2. Cross-cutting work assignment

Distributed across main waves (not standalone waves):

| Cross-cutting | Assigned to | Why |
|---|---|---|
| **Anti-patterns** | Each module wave establishes ~3-4 of the 26 anti-patterns; PX-AntiPatterns wave consolidates into final library | Each module's anti-patterns make most sense in context |
| **Glossary terms** | Each module wave adds ~5-7 terms; PX-Glossary consolidates | Terms emerge from module work |
| **Customize templates** | Each module wave adds 1-2 templates for its BMAD-core overlays; PX-CustomizeTpl reconciles | Templates overlay core skills; per-module |
| **Vertical packs** | All 6-8 land in Wave P9 (trust) per spec §6.7 | Single canonical home |
| **MCP server** | Standalone wave PX-MCP, sequenced AFTER v6.0 release | Independent infrastructure |
| **v3 → v6 migration** | Standalone wave PX-Migration, in parallel with P3-P4 (no dependency on later modules) | Solo migration tooling |
| **Quality gate checklists** | Each module wave establishes its primary gates; cross-module gates (QG-P1, RG-Launch) consolidated at v6.0 milestone | Gates are module-owned |
| **Release gates** | RG-Launch (partial) at v6.0; full RG-Launch at v6.2; other RGs build incrementally | Release gates compose QGs |

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
# Claude verifies all 5 PRs merged + main green
git fetch origin feat/bam-v3-pure-kb
git checkout feat/bam-v3-pure-kb
git pull
git log --oneline -20 | head -25   # expect: 4 merge commits + chore + history

# Tier-1 + Tier-2 against main
tests/audit-marketplace.sh                                      # OK
tests/audit-marketplace-fixtures.sh                             # 12/12
tests/wave-0/run-smoke-test.sh                                  # PASS
tests/p2/run-real-install-test.sh                               # PASS
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/tests/smoke-test.sh
BAM_TIER2=1 tests/integration/run-real-install.sh               # PASS
```

**Risk:** Submodule chore PR may conflict with concurrent PR work — merge in `chore → PR#3 → PR#5 → PR#6 → PR#7` order to minimize rebases.

---

### Wave P3 — Complete `bmad-bam-platform` (Atlas)

**Goal:** Build remaining 15 platform skills (skills 2-16 from spec §5.1). Establish QG-F1, QG-M1, refine QG-M2.

**4 sub-waves** (each = 1 PR = 1 brainstorm cycle):

#### P3.1 — Foundation (4 skills)

**Brainstorm questions:**
1. QG-F1 (Foundation gate) — what evidence does each Foundation skill produce that feeds QG-F1?
2. design-modular-monolith decision space: bounded contexts (Domain-Driven Design) vs pure ports/adapters vs hybrid — what fragments capture the trade-off matrix?
3. design-deployment-topology: blue-green vs canary vs cell-based cohort routing — how does this interact with tenant tier (#5)?
4. design-finops-model: per-tenant attribution requires shared instrumentation contract — what's the upstream input from `design-tenancy-model` (already shipped)?
5. design-tenant-tier-model: free/starter/pro/business/enterprise default — should BAM ship 5 tiers or be flexible?
6. Fragment density target: ≤5 new fragments per skill (current platform = 6 fragments for 1 skill; need stricter discipline)
7. Cross-skill fragment reuse: does design-finops-model reference design-tenancy-model's tenancy-decision-framework fragment, or is FinOps stand-alone?

**Skills:**
1. `bmad-bam-design-modular-monolith` (skill 2 in spec §5.1)
2. `bmad-bam-design-deployment-topology` (skill 3)
3. `bmad-bam-design-finops-model` (skill 4)
4. `bmad-bam-design-tenant-tier-model` (skill 5)

**Deliverables:**
- 4 skill dirs at `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-<name>/` (matching design-tenancy-model template)
- Each: SKILL.md, customize.toml (`[workflow]`), workflow.md, 5-7 steps in CEV pattern, template, smoke-test, bmad-skill-manifest.yaml
- ~10-15 new fragments in `1-foundation/bmad-bam-agent-atlas/resources/fragments/`
- ~5-8 new patterns in `resources/patterns/`
- QG-F1 checklist at `resources/checklists/QG-F1.md`
- QG-M1 checklist at `resources/checklists/QG-M1.md` (partial — refined in P3.2)
- Marketplace.json: 4 new skill entries
- ADR-011 (Wave P3.1 design decisions)
- Spec v0.10 changelog row (or no version bump if no semantic-shape changes)

**Effort:** ~25-30h

**Cross-validation checklist (Claude on PR):**
- [ ] Tier-1: all 8 checks (a-h) green; 12 fixture cases pass
- [ ] Tier-2: `BAM_TIER2=1 tests/integration/run-real-install.sh` PASS with 4 new skills installed at `.claude/skills/bmad-bam-design-*`
- [ ] Each new skill has its own `tests/smoke-test.sh` that PASSes
- [ ] Each new step file: frontmatter has `step_id`, `auto_runnable`, `gate`, `inputs`, `outputs` per std-frontmatter
- [ ] Each new customize.toml uses `[workflow]` namespace (not `[agent]`) — verified at line 1
- [ ] Universal-glob `file:{project-root}/**/project-context.md` present in persistent_facts
- [ ] No `bmad run` literal (check (h) catches)
- [ ] No `bmad-bam-platform/{data,agents,scripts,skills}/` paths (check (g) catches)
- [ ] Cross-skill resource access uses tool-aware path fallback (`.claude/skills/...` → `.cursor/skills/...` → `_bmad/bbp/...`) per ADR 008/M1 fix
- [ ] QG-F1 + QG-M1 checklists: frontmatter has id/title/module/phase/criticality/depends-on/evidence-depends-on
- [ ] ADR-011 in canonical 11-field schema + dependencies-on-other-decisions cite 008 + 009 + 010
- [ ] INDEX.md updated
- [ ] Fragment frontmatter uses snake_case (per std-frontmatter convention map)
- [ ] No `tested-against:` kebab-form (check via `grep -r "tested-against:"` returns 0)
- [ ] Each new fragment has `## When to Use` + `## When NOT to Use` + `## Architecture` + `## Trade-offs` + `## Implementation Patterns` + `## Quality Checks` + `## Web Research Queries` + `## Cross-references` (per spec §6.3)
- [ ] Web queries use `{date}` placeholder (not hardcoded year)
- [ ] Each new fragment has `**CRITICAL:**` quality check
- [ ] Module-help.csv updated with 4 new rows (canonical 13-column schema)
- [ ] Sentinel filename convention: any new project-context.md references use `{output_folder}/bbp/project-context.md`
- [ ] No regression on design-tenancy-model smoke
- [ ] Plan C R6 ratification recorded if commit touches activation chain (any module.yaml, customize.toml, post-install.sh edit)

**Risk register:**
- R3.1.1: Fragment density creeps above 5/skill — mitigation: brainstorm caps it at 4; reuse design-tenancy-model fragments where possible
- R3.1.2: QG-F1 evidence requirements unclear — mitigation: write QG-F1 checklist FIRST, then design skills to produce its evidence
- R3.1.3: design-finops-model's per-tenant attribution requires upstream tenancy decision — mitigation: explicit `inputs:` declaration in skill manifest

**Next:** P3.2 Lifecycle.

#### P3.2 — Lifecycle (4 skills)

**Brainstorm questions:**
1. Tenant onboarding automation: SMB self-serve (Stripe Checkout?) vs sales-assisted (Hubspot integration?) — pick default, document both
2. Right-to-deletion (offboarding): hard delete vs soft delete vs anonymize — when does each apply?
3. Multi-tenant testing: isolation, noisy-neighbor, RLS bypass — refine existing QG-M2 with explicit test coverage matrix
4. Tenant migration tooling: tier upgrades (within region) vs region migrations (across regions) — same workflow or separate?

**Skills:**
1. `bmad-bam-design-tenant-onboarding` (skill 6)
2. `bmad-bam-design-tenant-offboarding` (skill 7)
3. `bmad-bam-design-multi-tenant-testing` (skill 8)
4. `bmad-bam-design-tenant-migration-tooling` (skill 14)

**Deliverables:** As P3.1, plus:
- QG-M2 refinement (existing checklist gets expanded test catalogue from `design-multi-tenant-testing`)
- QG-D1 partial (data dependency on migration; full DR gate lands in P10 ops)
- Cross-reference into QG-C1 (compliance, for offboarding) — placeholder for P9 trust

**Effort:** ~25-30h

**Cross-validation:** Same as P3.1, plus:
- [ ] design-multi-tenant-testing's output catalogue is consumed by QG-M2 checklist evidence requirements
- [ ] design-tenant-offboarding cites GDPR right-to-deletion fragment + has explicit retention-window decision
- [ ] design-tenant-migration-tooling specifies zero-downtime constraint + cross-region implications

**Next:** P3.3 Commercial.

#### P3.3 — Commercial (5 skills)

**Brainstorm questions:**
1. Billing provider abstraction: Stripe-first with Paddle/Maxio as alternates, or provider-agnostic facade?
2. Payment-tenant mapping: scope to provider object IDs vs tenant-side abstraction?
3. Tax compliance: how many jurisdictions ship with patterns? (US states + EU VAT minimum; rest as extensions?)
4. Rate-limiting algorithm: token-bucket / leaky-bucket / sliding-window — when to use which?
5. Rate-arbitrage detection: heuristics vs ML-based — start with heuristics?

**Skills:**
1. `bmad-bam-design-billing-integration` (skill 9)
2. `bmad-bam-design-payment-tenant-mapping` (skill 10)
3. `bmad-bam-design-tax-compliance` (skill 11)
4. `bmad-bam-design-rate-limit-per-tenant` (skill 12)
5. `bmad-bam-design-tenant-rate-arbitrage` (skill 13)

**Deliverables:** As P3.1, plus:
- ~12-15 new fragments (provider integration patterns, tax-jurisdiction matrices, rate-limit algorithms)
- ~3-4 new patterns
- QG-TC4 (Tenant Context continuous) checklist
- Cross-reference into QG-S1 (zero-trust, for payment-tenant mapping) — placeholder for P9 trust

**Effort:** ~30-35h (largest sub-wave; commercial layer has most decision density)

**Cross-validation:** Same as P3.1, plus:
- [ ] design-billing-integration cites at least 2 providers explicitly (Stripe + 1 other) in trade-offs
- [ ] design-tax-compliance has explicit jurisdiction count + extensibility pattern
- [ ] design-rate-limit-per-tenant references the tenancy model from design-tenancy-model
- [ ] Provider-specific patterns marked as extensions, not core

**Next:** P3.4 Brownfield.

#### P3.4 — Brownfield (2 skills)

**Brainstorm questions:**
1. `analyze-existing-tenancy`: assessment-only or also produces a gap report? (Recommend: gap report with retrofit suggestions but no migration plan — that's #16.)
2. `plan-tenancy-retrofit`: how to handle the case where current model has NO clear tenancy boundary at all?

**Skills:**
1. `bmad-bam-analyze-existing-tenancy` (skill 15) — naming convention: `analyze-*` per spec §5.0
2. `bmad-bam-plan-tenancy-retrofit` (skill 16) — `plan-*` per spec §5.0

**Deliverables:** As P3.1, plus:
- Brownfield-specific fragments (~3-5) on assessment patterns + retrofit migration strategies
- Reuses 60-70% of greenfield fragments by reference

**Effort:** ~15-20h (smallest; leverages prior content)

**Cross-validation:** Same as P3.1, plus:
- [ ] analyze-* and plan-* workflows have explicit `brownfield: true` declarations in manifest
- [ ] Output artifacts distinguishable from greenfield (e.g., output filename `tenancy-retrofit-plan.md` vs `tenancy-model.md`)

**Next:** Wave P4 (data module).

---

### Wave P4 — `bmad-bam-data` (Atlas continues)

**Goal:** Build all 14 data module skills per spec §5.2. Establish QG-DA1.

**Persona:** Atlas (still). This is where cross-module fragment reuse first happens (data references platform's tenancy decisions).

**Sub-wave decomposition (3 sub-waves of ~4-5 skills each):**

#### P4.1 — Storage architecture (5 skills)
Skills: design-schema-architecture, design-cdc-pipeline, design-event-sourcing, design-cqrs, design-lakehouse

#### P4.2 — Specialized data systems (5 skills)
Skills: design-feature-store, design-stream-processing, design-search-index, design-graph-database, design-synthetic-data

#### P4.3 — Data lifecycle + brownfield (4 skills)
Skills: design-data-export-formats, design-data-residency, design-retention-deletion, plan-data-migration

**Cross-module reference**: data's design-retention-deletion references platform's design-tenant-offboarding. **First cross-module fragment reference** — validate the path convention works.

**Brainstorm questions (Wave-wide):**
1. CDC tool default: Debezium / Outbox / native PG decoding — which is canonical pattern?
2. Lakehouse format: Iceberg vs Delta vs Hudi — start with Iceberg as default?
3. Data residency vs tenancy: when does a tenant require data-region pinning?
4. Graph DB: include or defer to v6.1? (Spec includes it in data; honor that)
5. Cross-module references: data fragments reference Atlas's platform fragments via `[[fragment-name]]` markdown links (per std-frontmatter)?

**Deliverables (Wave P4 total):**
- 14 skill dirs under `2-modules/`
- ~40-50 new fragments (Atlas's resources grows substantially)
- ~15-20 new patterns
- QG-DA1 (Data Architecture) checklist at `resources/checklists/QG-DA1.md`
- ADRs 012-014 (one per sub-wave)
- Spec v0.10 changelog row (data module added)

**Effort:** ~85-100h

**Cross-validation (added vs P3):**
- [ ] **CROSS-MODULE FRAGMENT REFERENCE TEST** — does data's design-retention-deletion successfully load platform's design-tenant-offboarding fragment at activation? (Test via tool-aware path fallback)
- [ ] QG-DA1 checklist evidence requirements satisfied by P4.1 skills
- [ ] CDC patterns include outbox + Debezium + native PG (at least 3 alternatives in trade-off matrix)
- [ ] design-data-residency references platform's tenancy model for cross-region implications

**Risk:**
- R4.1: Cross-module fragment reference convention breaks at activation — mitigation: explicit Plan C R7+ ratification with cross-module load test
- R4.2: 14 skills in one wave is large — mitigation: 3 sub-waves with PR per sub-wave

**Next:** Wave P5 (ai module, Nova persona introduction).

---

### Wave P5 — `bmad-bam-ai` + **Nova persona introduction**

**Goal:** Build all 27 ai module skills per spec §5.3. Introduce Nova as second persona. Establish QG-M3.

**Persona:** **Nova 🌟** NEW. Pattern: persona-skill at `src-v6/bmad-bam-ai/1-foundation/bmad-bam-agent-nova/` with full SKILL.md, customize.toml, resources/.

**Sub-wave decomposition (6 sub-waves, ~4-5 skills each, per spec's 6 clusters):**

#### P5.0 — Nova persona scaffold + module bootstrap (1 PR, no workflow skills)
- Create `src-v6/bmad-bam-ai/` module dir
- module.yaml with `code: bba` (BMAD short code)
- module-help.csv with canonical 13-col schema
- `1-foundation/bmad-bam-agent-nova/` (mirror Atlas's structure)
- Nova SKILL.md + customize.toml + initial resources/
- marketplace.json plugin entry for `bmad-bam-ai`
- Effort: ~5-8h

#### P5.1 — Routing & orchestration (4 skills)
Skills: design-model-routing, design-agent-orchestration, design-agent-collaboration-protocol, design-tool-execution

#### P5.2 — Memory & prompt (5 skills)
Skills: design-memory-architecture, design-agent-memory-compression, design-self-improving-agent, design-prompt-engineering, design-prompt-architecture

#### P5.3 — Safety & isolation (5 skills)
Skills: design-prompt-injection-defense, design-prompt-leak-prevention, design-tenant-prompt-isolation, design-model-cache-isolation, design-safety-guardrails

#### P5.4 — Eval (5 skills)
Skills: design-offline-eval, design-online-eval, design-adversarial-eval, design-bias-fairness-eval, design-eval-first-spec

#### P5.5 — Lifecycle & FinOps (4 skills)
Skills: design-shadow-mode, design-model-lifecycle, design-ai-finops, design-ai-safety-policy

#### P5.6 — Roadmap & synthesis + brownfield (4 skills)
Skills: design-ai-product-roadmap, design-ai-runtime (synthesizes QG-M3 evidence), audit-ai-runtime, plan-ai-bolt-on

**Brainstorm questions (Wave-wide):**
1. Nova voice: "Gradient-descent metaphors" per spec §4.1 — what 3-5 example phrasings establish the voice?
2. Cross-persona invocation: design-ai-runtime depends on Atlas's design-tenancy-model output — pattern?
3. AI eval frameworks: ship with patterns for which eval tools (LangSmith / Braintrust / Inspect AI / Anthropic Console)?
4. design-ai-finops cross-references platform's design-finops-model — extends or replaces?
5. design-tenant-prompt-isolation interacts with design-tenancy-model from platform — input/output contract?

**Deliverables (Wave P5 total):**
- 27 skill dirs under `bmad-bam-ai/<phases>/`
- Nova persona-skill fully built (mirror Atlas)
- ~80-100 new fragments (Nova's resources)
- ~30-40 new patterns
- QG-M3 (AI Runtime) checklist
- QG-S2 (Model/Tool Safety) partial (full lands in P9 trust)
- ADRs 015-021 (one per sub-wave)
- Spec v0.11 changelog row

**Effort:** ~150-180h (largest wave; 27 skills + new persona)

**Cross-validation:**
- [ ] Nova's SKILL.md follows the SAME structure as Atlas's (spec §6.1 BMM-canonical)
- [ ] `1-foundation/bmad-bam-agent-nova/customize.toml` uses `[agent]` namespace (NOT `[workflow]`)
- [ ] Nova's persistent_facts include universal-glob + `{skill-root}/resources/...`
- [ ] BAM-family `team: bam` preserved (per ADR 008/P4 rename convention)
- [ ] **CROSS-PERSONA TEST** — Atlas's design-tenancy-model's output successfully feeds Nova's design-ai-runtime via spec §5.0.1 manifest `inputs:` declaration
- [ ] **MULTI-MODULE INSTALL TEST** — `bmad install --custom-source $REPO_ROOT --modules bbp,bba` installs both modules; both sentinels emit; Plan C R8 ratification verifies both load
- [ ] QG-M3 + QG-S2 checklists in `bmad-bam-ai/1-foundation/bmad-bam-agent-nova/resources/checklists/`
- [ ] No regression: Atlas's design-tenancy-model still PASSes smoke
- [ ] Cross-persona invocation flag in spec §4.5 (conflict resolution + escalation) — does any P5 skill trigger Kai? (Probably no; Kai introduced in P8)

**Risk:**
- R5.1: Nova introduction risks "Atlas-imitation" — mitigation: brainstorm voice deeply; reference §4.1 "gradient-descent metaphors" guidance
- R5.2: 27 skills + 6 clusters is the biggest wave — mitigation: 6+1 sub-waves with strict PR-per-sub-wave discipline
- R5.3: Cross-persona invocation untested — mitigation: explicit P5.6 design-ai-runtime test (it MUST invoke Atlas's design-tenancy-model output)

**Next:** Wave P6 (ux, Iris persona).

---

### Wave P6 — `bmad-bam-ux` + **Iris persona introduction**

**Goal:** Build all 12 ux module skills per spec §5.8. Introduce Iris as third persona. Establish QG-UX1.

**Persona:** **Iris 🎨** NEW. Theme tokens + accessibility-first voice per spec §4.1.

**Sub-wave decomposition (3 sub-waves, ~4 skills each):**

#### P6.0 — Iris persona scaffold + module bootstrap (1 PR)
- `bmad-bam-ux` module: `code: bbu`
- Iris persona at `1-foundation/bmad-bam-agent-iris/`

#### P6.1 — Branding & theme (4 skills)
Skills: design-theme-token-architecture, design-accessibility-cohort, design-multi-locale, design-white-label

#### P6.2 — Tenant + agent UX (4 skills)
Skills: design-tenant-ui-customization, design-agent-ui-patterns, design-trust-ui, design-progressive-disclosure-ai

#### P6.3 — Lifecycle UX + audit (4 skills)
Skills: design-empty-state-ai, design-onboarding-ux, design-feature-deprecation-ux, audit-ux-consistency

**Brainstorm questions:**
1. Theme token system: CSS variables vs design-tokens-w3c JSON — spec one
2. Accessibility per cohort: how does WCAG level vary by tenant tier?
3. White-label: brand isolation in `_bmad/<code>/theme-<tenant-id>/` or runtime resolved?
4. Agent UI patterns: chat vs command-palette vs sidebar vs embedded — order of preference?
5. Cross-persona: Iris consumes Cipher's PII patterns (not built yet, P9) — placeholder reference OK?

**Deliverables:**
- 12 skill dirs under `bmad-bam-ux/<phases>/`
- Iris persona-skill
- ~40-50 fragments
- ~15-20 patterns
- QG-UX1 checklist
- ADRs 022-024
- Spec v0.12 changelog row

**Effort:** ~70-85h

**Cross-validation:**
- [ ] All P5 cross-validation items
- [ ] **THREE-MODULE INSTALL TEST** — `bmad install --modules bbp,bba,bbu` installs three modules cleanly
- [ ] **THREE-PERSONA AVAILABILITY TEST** — Atlas, Nova, Iris all listed in `_bmad/_config/skill-manifest.csv` post-install
- [ ] Iris's voice distinct from Atlas + Nova (review SKILL.md prose)

**Next:** v6.0 release milestone.

---

### ▶ v6.0 RELEASE MILESTONE

**Composition:** platform (16) + data (14) + ai (27) + ux (12) = **69 module skills** + Atlas + Nova + Iris personas + cross-family skills from P11 (or build them later).

**Wait** — cross-family skills (12, in platform per spec §5.9) need to be built before v6.0 release for `bmad-bam-start`, `bmad-bam-backup`, etc. to exist. So Wave P11 must land BEFORE v6.0 release.

**Revised sequencing:**
- Wave P11 (cross-family) lands between P6 and v6.0 release
- v6.0 release = P3 + P4 + P5 + P6 + P11

OR:
- Wave P11 split: bmad-bam-start + critical cross-family workflows land alongside P3 (in platform); rest defer to v6.0 release prep wave

**Decision recommended:** Wave P11 lands as 2 sub-waves:
- P11.A (essential cross-family, lands during P3.4): bmad-bam-start, record-decision, refresh-knowledge, waive-gate (4 skills)
- P11.B (release-critical cross-family, lands before v6.0 release): bmad-bam-backup, bmad-bam-restore, bmad-bam-upgrade, bmad-bam-rollback, design-build-vs-buy, mediate-conflict, verify-production-readiness-final, release-gate-orchestrator (8 skills)

**v6.0 RELEASE GATE:**
- [ ] All P3 + P4 + P5 + P6 + P11.A + P11.B PRs merged
- [ ] All Tier-1 audit checks green
- [ ] Tier-2 with all 4 modules + cross-family: PASS
- [ ] Plan C R(N) manual ratification with all 4 modules installed
- [ ] Cumulative ADRs 008-025+ all in INDEX.md
- [ ] Spec at v0.13 with v6.0 changelog row
- [ ] Release gate evidence: RG-Launch composite (QG-F1, all M*, all I* placeholders, QG-DA1, QG-UX1)
- [ ] family.json captures v6.0 module set
- [ ] Tag the commit: `v6.0.0`

---

### Wave P7 — `bmad-bam-rag` (Nova continues)

**Goal:** 8 rag module skills per spec §5.4. Establish QG-RQ1.

**Persona:** Nova (already introduced in P5).

**Single-wave PR (8 skills is small enough for 1 PR; OR split into 2 sub-waves of 4).**

**Recommended split:**
#### P7.1 — Retrieval architecture (4 skills)
Skills: design-vector-store, design-hybrid-search, design-graph-rag, design-multi-modal-rag

#### P7.2 — Retrieval optimization + eval (4 skills)
Skills: design-contextual-retrieval, design-chunking, design-knowledge-graph, design-retrieval-eval

**Brainstorm questions:**
1. Vector store default: Pinecone vs Qdrant vs Weaviate vs pgvector — pick one for v6.1?
2. Hybrid search: BM25 + dense + sparse fusion order — which is canonical?
3. Chunking strategies: semantic vs late chunking vs hierarchical — primary recommendation?
4. Retrieval eval: precision@k vs NDCG vs recall@k — which is primary metric?

**Deliverables:**
- 8 skill dirs under `bmad-bam-rag/<phases>/`
- ~25-35 fragments
- ~10-15 patterns
- QG-RQ1 checklist (advisory)
- ADRs 026-027
- module: `code: bbr`

**Effort:** ~50-65h

**Cross-validation:** Same as P5, plus:
- [ ] rag module depends on ai module (verify install order: bbp → bba → bbr)
- [ ] No new persona introduced (Nova reused) — verify Nova reference is canonical

---

### Wave P8 — `bmad-bam-integration` + **Kai persona introduction**

**Goal:** 13 integration skills per spec §5.5. Introduce Kai (default arbiter). Establish QG-I1-3.

**Persona:** **Kai 🔗** NEW. Contract-attorney voice per spec §4.1.

**Sub-wave decomposition (3 sub-waves):**

#### P8.0 — Kai persona scaffold + module bootstrap (1 PR)
- module: `code: bbi`
- Kai persona at `1-foundation/bmad-bam-agent-kai/`

#### P8.1 — Boundary design (5 skills)
Skills: design-module-facades, design-cross-module-messaging, design-api-gateway, design-public-api, design-realtime-architecture

#### P8.2 — Reliability patterns (4 skills)
Skills: design-webhook-system, design-saga-pattern, design-circuit-breaker, design-idempotency-keys

#### P8.3 — Verification & evolution (4 skills)
Skills: verify-convergence (QG-I1-3), plan-api-versioning, audit-integration, plan-module-extraction

**Brainstorm questions:**
1. Kai voice: "contract attorney with engineering rigor" — what specific phrasings?
2. Module facade pattern: trait-based / interface-based / hexagonal? Spec one default.
3. Cross-module messaging: in-process event bus vs async queue — decision drivers?
4. API versioning: expand-contract vs URL versioning vs header versioning — primary recommendation?
5. **CONFLICT MEDIATION** — Kai is default arbiter per spec §4.5. How does Atlas/Nova invoke Kai's `mediate-conflict` workflow? (This was in P11 cross-family; verify it's wired.)

**Deliverables:**
- 13 skill dirs
- Kai persona-skill
- ~35-45 fragments
- ~15-20 patterns
- QG-I1, QG-I2, QG-I3 checklists
- ADRs 028-031

**Effort:** ~80-100h

**Cross-validation:**
- [ ] Kai's mediate-conflict workflow (from P11) successfully invokes Kai persona
- [ ] verify-convergence skill produces evidence for QG-I1+I2+I3 simultaneously
- [ ] Cross-module facade contracts: integration module references platform AND data AND ai facades

---

### ▶ v6.1 RELEASE MILESTONE

**Composition:** v6.0 + rag (8) + integration (13) = **90 module skills** + 4 personas (Atlas, Nova, Iris, Kai).

**RG-Launch evidence now substantially fuller** — QG-I1-3 + QG-RQ1 land.

---

### Wave P9 — `bmad-bam-trust` + **Cipher persona introduction**

**Goal:** 16 trust skills per spec §5.6. Introduce Cipher (paranoid auditor). Establish QG-S1, S2 (full), C1-3.

**Persona:** **Cipher 🔐** NEW.

**Includes vertical add-on packs (6-8 packs per spec §6.7) — these land in trust module's resources.**

**Sub-wave decomposition (4 sub-waves):**

#### P9.0 — Cipher persona scaffold + module bootstrap
- module: `code: bbt`

#### P9.1 — Zero-trust & access (4 skills)
Skills: design-zero-trust, design-rbac-abac, design-key-management, design-audit-trail

#### P9.2 — Data protection & consent (4 skills)
Skills: design-pii-handling, design-consent-management, design-content-moderation, design-data-loss-prevention

#### P9.3 — AI safety & regulatory (4 skills)
Skills: design-ai-agent-identity, design-ai-regulatory-tracking, design-model-card-publishing, map-compliance

#### P9.4 — Operational trust + verticals (4 skills + 6-8 vertical packs)
Skills: design-residency-controls, design-vulnerability-mgmt, verify-trust-controls, audit-trust-posture
+ Vertical packs (HIPAA, PCI-DSS, SOC2, GDPR, FedRAMP, ISO27001, EU AI Act — pick 6-8 from spec §6.7)

**Brainstorm questions:**
1. Cipher voice: "Paranoid auditor: assume breach, log everything" — specific phrasings
2. RBAC vs ABAC default? Both?
3. PII handling: at-rest + in-transit + in-AI-context — distinct fragments?
4. Vertical packs structure: each pack = manifest.yaml + control mappings — schema details
5. Cross-persona: Cipher's verify-trust-controls calls Rune's design-observability for evidence — ordering?

**Deliverables:**
- 16 skill dirs
- Cipher persona-skill
- 6-8 vertical add-on packs at `bmad-bam-trust/1-foundation/bmad-bam-agent-cipher/resources/vertical-addons/<pack-id>/`
- ~50-60 fragments
- ~25-30 patterns
- QG-S1, QG-S2 (full), QG-C1, QG-C2, QG-C3 checklists
- ADRs 032-037

**Effort:** ~100-130h (largest module + verticals)

**Cross-validation:**
- [ ] Vertical-pack manifest.yaml schema per spec §6.7
- [ ] Each vertical pack has `pack-id`, `regulations: [...]`, `controls: [...]`, `evidence-requirements: [...]`
- [ ] map-compliance workflow loads ALL vertical packs to construct compliance matrix
- [ ] No vertical pack is mandatory; all opt-in

---

### Wave P10 — `bmad-bam-ops` + **Rune persona introduction**

**Goal:** 16 ops skills per spec §5.7. Introduce Rune. Establish QG-O1-3, R1-3, D1, DR2.

**Persona:** **Rune ⚙️** NEW (final persona introduction).

**Sub-wave decomposition (4 sub-waves):**

#### P10.0 — Rune persona scaffold + module bootstrap
- module: `code: bbo`

#### P10.1 — Observability & SLO (4 skills)
Skills: design-observability, design-slo-error-budget, design-runbook-system, design-runbook-automation

#### P10.2 — Incident & resilience (4 skills)
Skills: design-incident-response, design-on-call-handoff, design-chaos-engineering, design-canary-analysis

#### P10.3 — Deployment & DR (4 skills)
Skills: design-feature-flag-system, design-disaster-recovery, design-ai-cost-spike-alert, design-tenant-data-sovereignty-validator

#### P10.4 — Customer success + verification (4 skills)
Skills: design-customer-success-tooling, design-agent-debugging-tools, verify-production-readiness (QG-O1-3, QG-R1-3, QG-D1, QG-P1), audit-operations

**Brainstorm questions:**
1. Rune voice: "YAML + Helm chart fragments" — specific phrasings
2. Observability stack: OTel + Prometheus + Grafana vs vendor (Datadog/New Relic)?
3. Runbook automation: PagerDuty Rundeck vs Sentry Workflows?
4. Feature flags: build vs buy (LaunchDarkly/Unleash/PostHog/Statsig)?
5. DR drill frequency: per spec QG-DR2 = annual; runbook automated?

**Deliverables:**
- 16 skill dirs
- Rune persona-skill
- ~50-60 fragments
- ~25-30 patterns
- QG-O1, QG-O2, QG-O3, QG-R1, QG-R2, QG-R3, QG-D1, QG-DR2, QG-P1 (P1 is composite gate)
- ADRs 038-042

**Effort:** ~100-130h

**Cross-validation:**
- [ ] All 6 personas now present: Atlas, Nova, Iris, Kai, Cipher, Rune
- [ ] verify-production-readiness composes evidence from all installed modules
- [ ] QG-P1 (Production Readiness) checklist depends on all P1-required gates

---

### ▶ v6.2 RELEASE MILESTONE

**Composition:** v6.1 + trust (16) + ops (16) = **122 module skills** + 6 personas (all).

**RG-Launch can now fully compose** — all required QGs available.

---

### Cross-cutting waves (PX-*)

These don't add module skills; they ship cross-cutting infrastructure or content.

#### PX-MCP — MCP server (`bmad-bam-mcp`)

**Goal:** Build the BAM MCP server per spec §9.5. Stdio transport, fs-permission auth.

**When:** After v6.0 release (rag + integration not strictly required for MCP).

**Brainstorm:**
1. MCP transport: stdio confirmed by spec; verify
2. Auth: fs-permission per spec — which permission model?
3. Tools exposed: fragment search, pattern lookup, gate evidence query
4. Sequencing relative to other waves

**Deliverables:**
- Standalone repo or subdir for MCP server
- Tools, prompts, resources MCP primitives
- Integration with Claude Code via .mcp.json
- ~30-40h

#### PX-Migration — v3 → v6 migration tooling

**Goal:** Build `bmad-bam-migrate-v2` workflow per spec §13.

**When:** Can run in parallel with P3-P4 (no dependency on later modules).

**Deliverables:**
- `bmad-bam-platform/9-infrastructure/bmad-bam-migrate-v2/` skill
- Migration steps from v3 to v6 mapping
- v3 deprecation timeline doc
- ~25-35h

#### PX-AntiPatterns — Anti-patterns library

**Goal:** Consolidate 26 anti-patterns per spec §11.

**When:** Each module wave establishes ~3-4 anti-patterns; PX-AntiPatterns consolidates at end of v6.0.

**Deliverables:**
- `bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/` (or distributed)
- ~15-20h consolidation effort

#### PX-Glossary — Glossary consolidation

**Goal:** Consolidate ~40 terms per spec §14.

**When:** Each module wave adds ~5-7 terms; PX-Glossary consolidates at v6.0.

**Deliverables:**
- `bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/glossary.md` (single file)
- ~10-15h

#### PX-CustomizeTpl — Customize-templates inventory

**Goal:** Build ~15 customize-templates per spec §7.2.

**When:** Each module wave adds 1-2 templates as needed; PX-CustomizeTpl reconciles.

**Deliverables:**
- `bmad-bam-platform/<phases>/customize-templates/` (or per-module)
- ~25-35h

#### PX-VerticalPacks — Vertical add-on packs

**Goal:** Build 6-8 vertical packs per spec §6.7.

**When:** Lands as part of Wave P9 (trust module).

**Deliverables:**
- `bmad-bam-trust/1-foundation/bmad-bam-agent-cipher/resources/vertical-addons/`
- Packs: HIPAA, PCI-DSS, SOC2, GDPR, FedRAMP, ISO27001, EU AI Act, NIST AI RMF (pick 6-8)
- ~80-120h (or amortized across P9 sub-waves)

---

## 4. Universal cross-validation checklist (every PR)

**Claude runs these on EVERY content PR (Wave P3+):**

### Discipline checks

- [ ] Branch name follows convention: `feat/v6-<wave-id>-<short-desc>` (e.g., `feat/v6-p3-1-foundation`)
- [ ] PR base targets correct parent branch (if stacked) OR `feat/bam-v3-pure-kb` (if fresh)
- [ ] Commit messages follow conventional commits (feat/fix/docs/chore/test)
- [ ] No `git push --force` in PR history
- [ ] Co-Authored-By tag present where AI contributed

### Tier-1 audit (8 checks a-h)

- [ ] `tests/audit-marketplace.sh` exit 0
- [ ] `tests/audit-marketplace-fixtures.sh` 12/12 pass (or whatever count is current)
- [ ] Real marketplace passes all 8 checks
- [ ] No new stale-path leakage (check g)
- [ ] No new fictional `bmad run` (check h)

### Tier-2 (BAM_TIER2=1)

- [ ] `BAM_TIER2=1 tests/integration/run-real-install.sh` exit 0
- [ ] Strategy 1 confirmed for all installed modules
- [ ] All new skills land at `.claude/skills/` (tool-specific path)
- [ ] Sentinel emits at `_bmad-output/<code>/project-context.md` for each module

### Other Tier-1

- [ ] `tests/wave-0/run-smoke-test.sh` PASS
- [ ] `tests/p2/run-real-install-test.sh` PASS
- [ ] Each skill's `tests/smoke-test.sh` PASS

### Spec discipline

- [ ] If wave adds new module: spec §3.1 module count consistent
- [ ] If wave introduces new persona: spec §4.1 persona row added
- [ ] Spec §5.X workflow count matches actual delivered skills
- [ ] Spec changelog row added for v0.X bump (or no bump if no semantic change)
- [ ] If new ADR: INDEX.md row added
- [ ] If new fragment/pattern category: spec §6.X updated

### Frontmatter discipline (per std-frontmatter convention map)

- [ ] All step files have `step_id`, `auto_runnable`, `gate`, `inputs`, `outputs` (snake_case)
- [ ] All skill manifests have `latency_budget`, `recommended_capabilities`, `minimum_persona_version` (snake_case)
- [ ] customize.toml keys use snake_case (`persistent_facts`, `activation_steps_append`)
- [ ] Fragment/pattern frontmatter uses snake_case (`tested_against`, `last_reviewed`)
- [ ] ADR frontmatter uses kebab-case (per MADR-lite external convention)

### Persona introduction (waves that add a new persona)

- [ ] `<module>/1-foundation/bmad-bam-agent-<persona>/` directory created
- [ ] SKILL.md describes the persona's voice, role, identity, communication style, principles
- [ ] customize.toml uses `[agent]` namespace
- [ ] customize.toml persistent_facts include universal-glob + `{skill-root}/resources/...`
- [ ] Module.yaml `agents:` block has entry with `code`, `name`, `title`, `icon`, `team: bam`, `description`
- [ ] Persona reflects spec §4.1 voice profile

### Cross-module fragment reference (Wave P4+)

- [ ] Cross-module fragment loads tested via tool-aware path fallback (`.claude/skills/...` → `.cursor/skills/...` → `_bmad/<other-code>/...`)
- [ ] Plan C R(N) ratification recorded if cross-module loading is new in this wave

### Quality gates

- [ ] Each new QG has a checklist file at `<module>/1-foundation/bmad-bam-agent-<persona>/resources/checklists/QG-<id>.md`
- [ ] Each QG checklist has frontmatter per spec §8.1 (id, title, module, phase, criticality, depends-on, evidence-depends-on, auto-checkable %, human-review %)
- [ ] Each QG has explicit criteria sections
- [ ] Cross-gate dependencies (depends-on) reference existing gates

---

## 5. Per-wave PR pre-merge gate

Before Claude approves PR for merge:

1. **All universal cross-validation passes** (§4 above)
2. **Wave-specific cross-validation passes** (§3 per wave)
3. **Risk register acknowledged** — any wave-specific risks documented as resolved or accepted
4. **No regression on prior waves** — full Tier-1 + Tier-2 sweep against post-merge state
5. **Spec drift check** — spec doc still consistent with delivered code
6. **ADR coverage** — every significant decision recorded
7. **Plan C ratification** (at module-introduction waves: P3, P4, P5, P6, P7, P8, P9, P10; otherwise optional)

---

## 6. Risk catalog (cross-wave)

| Risk | Likely waves | Mitigation |
|---|---|---|
| Fragment count creep beyond spec ceiling (550) | All content waves | Per-wave audit; cap at ~4-5/skill; reuse aggressively |
| Quality gate explosion (28+ checklists) | P5, P9, P10 | Establish gates per-wave; ensure each gate is independently evidenced |
| Cross-module fragment reference breaks at activation | P4 onwards | Plan C R(N) ratification on first cross-module reference (P4) |
| Cross-persona invocation untested | P5, P8 | Explicit cross-persona test in P5.6 + P8 mediate-conflict |
| Persona voice drift | P5, P6, P8, P9, P10 | Brainstorm voice deeply per spec §4.1; review SKILL.md prose |
| Multi-module install fails | P4 onwards | Tier-2 BAM_TIER2=1 catches; CI runs it |
| Spec drift vs implementation | All waves | Per-wave spec changelog discipline |
| Vertical pack scope creep (P9) | P9 | Cap at 6-8 packs; defer remaining to v6.x |
| MCP server complexity (PX-MCP) | PX-MCP | Single deliverable; spec the transport + auth upfront |
| Effort estimate slippage | All waves | Track per-wave actuals vs estimate; replan if 2σ off |
| v6.0 deadline pressure | P3-P6 | Discipline-driven; honor brainstorm→design→plan→implement |

---

## 7. Persona introduction sequencing matrix

| Wave | Persona introduced | Brainstorm depth | Voice tone alignment | Cross-persona contracts |
|---|---|---|---|---|
| Pre-roadmap (P2.1) | Atlas | done | "structural engineer at whiteboard" | n/a |
| P3 | (Atlas continues) | n/a | (consistent) | n/a |
| P4 | (Atlas continues) | n/a | (consistent) | n/a |
| P5 | **Nova** | full | "gradient-descent metaphors" | Atlas + Nova cross-skill access |
| P6 | **Iris** | full | "theme tokens, accessibility-first" | Atlas + Nova + Iris coexist |
| P7 | (Nova continues) | n/a | (consistent) | n/a |
| P8 | **Kai** | full | "contract attorney" | Kai = default arbiter (§4.5) |
| P9 | **Cipher** | full | "paranoid auditor" | Cipher ↔ Rune at P10 |
| P10 | **Rune** | full | "YAML + Helm chart fragments" | All 6 personas coexist |

---

## 8. Brainstorm prompt library (ready-to-paste for RDP)

### Wave P3.1 — Foundation skills (paste-ready)

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
  2. Fragment density per skill (target ≤5; current 6 for design-tenancy-model is benchmark)
  3. Cross-skill fragment reuse (does design-finops-model share fragments with design-tenancy-model?)
  4. QG-F1 evidence requirements (what does each skill produce?)
  5. design-tenant-tier-model: 5 default tiers (free/starter/pro/business/enterprise) — or flexible?

Workflow pattern: each skill follows the design-tenancy-model template:
  - CEV mode (Create steps 1-7, optional Edit/Validate)
  - 5-7 steps per workflow
  - customize.toml [workflow] namespace
  - Universal-glob in persistent_facts
  - Output: design doc + ADR + QG evidence

Acceptance criteria (per universal cross-validation checklist):
  - Tier-1 audit + fixtures green
  - Tier-2 BAM_TIER2=1 PASS with 4 new skills installed
  - Each skill's smoke-test PASS
  - 1 new ADR (Wave P3.1 design record)
  - Spec §5.1 references unchanged (16 skills still spec'd; we deliver 4 of remaining 15)

Branch: feat/v6-p3-1-foundation
Base: feat/bam-v3-pure-kb (or whatever's current main after P0 merges)
```

(Similar paste-ready prompts to be added for each wave's first sub-wave; Claude can write them on demand.)

---

## 9. Quick-reference dependency matrix

```
Atlas (P3, P4) ───────┐
                      │
Nova (P5, P7) ────────┼──┬──> v6.0 (P3+P4+P5+P6+P11)
                      │  │
Iris (P6) ────────────┘  │
                         │
Kai (P8) ────────────┐   │
                     ├──┬──> v6.1 (+ P7 + P8)
                     │  │
                     │  │
Cipher (P9) ─────────┘  │
                        ├──> v6.2 (+ P9 + P10)
                        │
Rune (P10) ─────────────┘

Cross-cutting (assigned to specific waves):
  - PX-Migration ←─ in parallel with P3-P4
  - PX-AntiPatterns ←─ consolidates during P3-P10
  - PX-Glossary ←─ consolidates during P3-P10
  - PX-CustomizeTpl ←─ distributed during P3-P10
  - PX-VerticalPacks ←─ lands in P9.4
  - PX-MCP ←─ after v6.0 release (sequenced standalone)
```

---

## 10. Summary

| Question | Answer |
|---|---|
| **How many waves?** | 11 main waves (P0, P3-P11) + 6 cross-cutting (PX-*) |
| **Total content skills delivered** | 135 (16 platform + 14 data + 27 ai + 8 rag + 13 integration + 16 trust + 16 ops + 12 ux + 13 cross-family) |
| **Total personas introduced** | 6 (Atlas done; Nova/Iris/Kai/Cipher/Rune in P5/P6/P8/P9/P10) |
| **Release milestones** | 3 (v6.0, v6.1, v6.2) |
| **Quality gates established** | 28 total + 8 release gates |
| **Total effort estimate** | ~1100-1500h remaining (matches spec §10.5) |
| **Workflow per wave** | Brainstorm RDP → design + plan → implement → PR → Claude analysis → merge |
| **Cross-validation gate** | Universal checklist (§4) + wave-specific checklist (§3) + risk acknowledgement (§6) |
| **First concrete action** | Merge 5 queued PRs (Wave P0), then brainstorm Wave P3.1 |

This roadmap is the **complete** plan from current state through v6.2 release. Updates happen via wave-completion ADRs + spec changelog rows.
