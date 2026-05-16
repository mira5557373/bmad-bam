# BAM v6 — Next Wave Guide

**Date:** 2026-05-16
**Spec:** `docs/v6-final-architecture.md` v0.9 (post-Concern-5)
**State snapshot:** post-PR-#3 polish + 5 PRs queued

This document orients the next phase of BAM v6 implementation. It maps where we are against where the spec targets, lays out the wave options, recommends a path, and lists the pre-wave readiness checklist.

---

## 1. Where we are (state snapshot)

### Delivered

| Asset | Count | Spec target | % done |
|---|---|---|---|
| Modules with content | 1 (partial) | 8 | 12.5% |
| Personas | 1 (Atlas) | 6 | 17% |
| Workflow skills | 1 (design-tenancy-model) | 122 module-specific + 13 cross-family = 135 | 0.7% |
| Agent skills | 1 (Atlas) | 6 (one per persona) | 17% |
| Infrastructure skills | 2 (smoke-test, finalize) | 2 | 100% |
| Knowledge fragments | 6 | 350-550 | 1.1% |
| Patterns | 3 | 500-700 | 0.4% |
| Quality-gate checklists | 1 (QG-M2) | 28 | 3.6% |
| Standards | 3 (std-frontmatter, std-validation, std-adr) | ~5 | 60% |
| ADRs | 10 | (growing) | n/a |

### Infrastructure delivered (foundations are solid)

- **Module layout:** BMM-canonical phase-numbered grouping (1-foundation, 2-modules, 3-integration, 4-readiness, 9-infrastructure) — Concern 5 / v0.9 spec §6.1
- **Module code convention:** 3-letter short codes (`bbp` reserved for platform; `bbd/bba/bbr/bbi/bbt/bbo/bbu` reserved for other 7)
- **Sentinel convention:** `{output_folder}/<code>/project-context.md` per module — universal-glob compatible
- **Tier-1 audit:** 8 checks (a-h) with 12 fixtures; phase-mode scanning; stale-path + fictional-CLI regression guards
- **Tier-2 (opt-in via `BAM_TIER2=1`):** real `bmad install --custom-source` + Strategy-1 verification + sentinel check; ratified Plan C R1-R4
- **Tier-3 (manual):** Plan C ratification methodology (4 rounds completed)
- **ADR convention:** MADR-lite, sidecar memory at `_bmad/_memory/atlas/architecture-decisions/`
- **Standards:** std-frontmatter (snake_case convention map), std-validation, std-adr

### 5 PRs in flight (queued for merge by user)

```
PR #3  Concerns 4+5  — test infrastructure + BMM-canonical layout (ALREADY OPEN on GitHub)
PR #5  Concern 7    — module.yaml directories: cleanup (branch pushed; needs PR open)
PR #6  Tier-2 promo — env-var opt-in real-install test (branch pushed; needs PR open)
PR #7  ENH-0/1/2    — audit (f) glob fix + checks (g)+(h) regression guards (branch pushed; needs PR open)
chore  submodule bump — bmad-builder/method/tea to latest (branch pushed; needs PR open)
```

All branches are tested + Tier-1 green. User holds merge gate.

---

## 2. Spec target — what's needed for v6.0

Per spec §1 (Executive Summary) and §3.1 (8 modules):

| Module | Owner persona | Skills | Status |
|---|---|---|---|
| `bmad-bam-platform` | Atlas 🏛️ | 16 | 1/16 workflows + Atlas + 2 infra (~25%) |
| `bmad-bam-data` | Atlas 🏛️ | 14 | 0/14 |
| `bmad-bam-ai` | Nova 🌟 | 27 | 0/27 |
| `bmad-bam-rag` | Nova 🌟 | 8 | 0/8 |
| `bmad-bam-integration` | Kai 🔗 | 13 | 0/13 |
| `bmad-bam-trust` | Cipher 🔐 | 16 | 0/16 |
| `bmad-bam-ops` | Rune ⚙️ | 16 | 0/16 |
| `bmad-bam-ux` | Iris 🎨 | 12 | 0/12 |
| Cross-family | (in platform) | 13 | 1/13 (smoke-test) |
| **Total** | — | **135** | **3/135 = 2.2%** |

Spec §1 release waves: **v6.0 = 4 modules, v6.1 = +2, v6.2 = +2**. Module sequencing for v6.0 not explicitly locked in spec, but dependency graph (§3.2) implies:
- `platform` (root) must come first
- `data`, `ai`, `integration`, `trust`, `ops`, `ux` depend on `platform`
- `rag` depends on `ai` (which depends on `platform`)

Logical v6.0 set: **platform + data + ai + integration** (Atlas + Nova + Kai personas; 70 skills). v6.1 adds rag + trust (Nova + Cipher; 24 skills). v6.2 adds ops + ux (Rune + Iris; 28 skills).

---

## 3. Next-wave options

### Option A — Wave P3 "Complete `bmad-bam-platform`" (RECOMMENDED)

Build the remaining 15 platform workflow skills (skills 2-16 from spec §5.1).

**Pros:**
- Continues what P2.1 started (Atlas persona + design-tenancy-model template established)
- design-tenancy-model is a working template; new skills follow the same shape
- All infrastructure (audit, Tier-2, layout) is in place — no foundation work needed
- Clean deliverable boundary: "bmad-bam-platform complete" = clear milestone for v6.0
- Atlas's content patterns (fragments + decision matrices) accumulate, benefiting future Atlas-owned skills (data module)

**Cons:**
- Doesn't exercise multi-persona patterns (Nova, Kai, etc. stay theoretical)
- Doesn't test cross-module fragment reuse mechanics

**Effort:** ~95-115h across 4 sub-waves (see §4 below)

**Output:** full `bmad-bam-platform` module ready for v6.0 inclusion + Atlas's resource library at ~30+ fragments, ~10+ patterns, ~5+ quality-gate checklists.

### Option B — Wave P3 "Start adjacent module" (data | ai | integration)

Pick a second module per the dependency graph and build its first 2-3 skills.

**Pros:**
- Forces multi-persona patterns to surface early (especially if picking Nova's ai module)
- Validates cross-module fragment reuse mechanics
- Diversifies risk — if platform's spec has gaps, find them via parallel work

**Cons:**
- Inverts depth-first discipline (the user's established pattern)
- Adds another module's incomplete state to the codebase
- Atlas's content library doesn't grow

**Effort:** ~25-40h for 2-3 skills of a single module

**Output:** kicks off second module; doesn't complete anything substantial.

### Option C — Mix (50/50 platform + data, both Atlas-owned)

Keep Atlas-owned but advance two modules in parallel.

**Pros:**
- Tests data module's spec without introducing a new persona
- Atlas's content library still grows from both fronts
- More variety reduces fatigue

**Cons:**
- Two open module fronts harder to verify quality at gate boundaries
- Cross-module references (e.g., design-finops-model in platform needing CDC patterns from data) become circular

**Effort:** ~50-70h

**Output:** partial advancement of both modules; neither fully complete.

---

## 4. Recommendation: Option A — Wave P3 sub-decomposition

Break the 15 remaining platform skills into 4 themed sub-waves:

### Wave P3.1 — Foundation skills (4 skills, ~25-30h)

Skills 2-5 from spec §5.1 — the **load-bearing architecture decisions** that every multi-tenant SaaS faces in its first 6 months.

| # | Skill | Output | QG |
|---|---|---|---|
| 2 | `design-modular-monolith` | Bounded contexts + ports & adapters spec | QG-M1 |
| 3 | `design-deployment-topology` | Blue-green / canary with tenant cohorts | QG-M1 (partial) |
| 4 | `design-finops-model` | Per-tenant cost attribution + quotas + unit economics | QG-F1 (partial) |
| 5 | `design-tenant-tier-model` | Free/Starter/Pro/Business/Enterprise tier matrix | QG-F1 |

Each follows the `design-tenancy-model` template:
- `customize.toml` ([workflow] namespace, universal-glob)
- `workflow.md` (mode router)
- `steps/step-01-c-...` through `steps/step-07-c-...` (CEV pattern)
- `templates/<output>.md.template`
- `tests/smoke-test.sh`
- `bmad-skill-manifest.yaml`

Cross-references Atlas's fragments + patterns. **New fragments needed:** ~8-12 (e.g., monolith-decomposition, blue-green-topology, cell-routing, finops-attribution, tier-feature-matrix, cost-quota-models, etc.).

Establishes QG-F1 (Foundation) and QG-M1 (Module Architecture) checklists.

### Wave P3.2 — Lifecycle skills (4 skills, ~25-30h)

Tenant lifecycle — onboarding through migration. Skills 6-8 + 14 from spec §5.1.

| # | Skill | Output | QG |
|---|---|---|---|
| 6 | `design-tenant-onboarding` | Automation-first SMB flow | QG-M1 |
| 7 | `design-tenant-offboarding` | Right-to-deletion + export + retention | QG-M1 + QG-C1 (compliance) |
| 8 | `design-multi-tenant-testing` | Isolation + noisy-neighbor + quota + RLS-bypass test catalogue | QG-M2 (refines existing) |
| 14 | `design-tenant-migration-tooling` | Tier/region migration with zero downtime | QG-M1 + QG-D1 (DR) |

**New fragments needed:** ~6-10. Heavy interplay with QG-M2 (tenant isolation) which already has a checklist — this wave refines + extends QG-M2 evidence.

### Wave P3.3 — Commercial skills (5 skills, ~30-35h)

Billing + tax + rate-limiting — the commercial layer. Skills 9-13 from spec §5.1.

| # | Skill | Output | QG |
|---|---|---|---|
| 9 | `design-billing-integration` | Stripe / Paddle / Maxio integration spec | QG-M1 |
| 10 | `design-payment-tenant-mapping` | Payment-processor → tenant scoping | QG-M1 + QG-S1 (zero-trust) |
| 11 | `design-tax-compliance` | Sales tax / VAT / GST per jurisdiction | QG-C1 (compliance) |
| 12 | `design-rate-limit-per-tenant` | Quota enforcement detail | QG-M1 + QG-TC4 (continuous tenant context) |
| 13 | `design-tenant-rate-arbitrage` | Prevent tier-jumping abuse | QG-S1 + QG-TC4 |

Largest sub-wave; commercial layer has the most decision-density per skill (provider-specific integrations + multi-jurisdiction tax).

**New fragments needed:** ~10-15 (provider integration patterns, tax-jurisdiction matrices, rate-limit algorithms, arbitrage detection).

### Wave P3.4 — Brownfield skills (2 skills, ~15-20h)

Skills 15-16 from spec §5.1 — for users adopting BAM on an existing codebase.

| # | Skill | Output | QG |
|---|---|---|---|
| 15 | `analyze-existing-tenancy` | Assessment report (what tenancy model is in place + gaps) | (advisory) |
| 16 | `plan-tenancy-retrofit` | Migration plan from existing to target tenancy model | QG-M2 (partial) |

Smallest sub-wave; reuses earlier wave's fragments heavily.

**New fragments needed:** ~3-5 (brownfield-assessment patterns, retrofit migration strategies).

### Wave P3 totals

| Sub-wave | Skills | Fragments needed | Effort |
|---|---|---|---|
| P3.1 Foundation | 4 | ~10 | ~25-30h |
| P3.2 Lifecycle | 4 | ~8 | ~25-30h |
| P3.3 Commercial | 5 | ~12 | ~30-35h |
| P3.4 Brownfield | 2 | ~4 | ~15-20h |
| **Total Wave P3** | **15** | **~34** | **~95-115h** |

Quality gates established/refined: QG-F1, QG-M1, QG-M2 (refined), QG-C1, QG-D1, QG-S1, QG-TC4 — 7 of the 28 spec'd gates.

---

## 5. Each sub-wave's internal structure

Following the discipline established in PR #2 (Phases A/B/C) + PR #3 (Concerns 4+5 + polish):

1. **Brainstorm** (use `superpowers:brainstorming` skill)
   - Explore each skill's input artifacts (what prior workflow's output feeds it?)
   - Lock decision space (what choices does the skill make? what frameworks does it apply?)
   - Identify required fragments + patterns + cross-references
   - ~30-60 min per sub-wave

2. **Design spec** (`docs/superpowers/specs/YYYY-MM-DD-wave-p3-N-<theme>.md`)
   - Single spec doc per sub-wave (4 skills documented together; shared decision context)
   - Spec §6.2 frontmatter for every skill manifest
   - Cross-references to existing Atlas fragments where applicable

3. **Implementation plan** (`docs/superpowers/plans/YYYY-MM-DD-wave-p3-N-<theme>.md`)
   - One plan per sub-wave, with one task per skill
   - Each task: scaffold skill dir + customize.toml + workflow.md + steps + template + smoke-test
   - Plus: new fragments + patterns committed alongside

4. **Execute** (RDP subagent-driven OR main session)
   - Following the Concern 5 RDP kickoff pattern (`docs/v6-rdp-concern-5-kickoff.md`)
   - One subagent per skill = parallelizable
   - Atomic commits per sub-wave (4-5 commits per sub-wave: scaffold + content + tests + verify)

5. **Verify** at every commit boundary:
   - Tier-1 audit (all 8 checks green)
   - Tier-1 fixtures (12/12 pass)
   - Skill's own smoke-test
   - design-tenancy-model still works (no regression)
   - `BAM_TIER2=1 tests/integration/run-real-install.sh` (real install adds the new skill)

6. **Plan C R5/R6/R7 per sub-wave** — ratify the new skills install + load correctly

7. **PR per sub-wave** (4 PRs for Wave P3: #8, #9, #10, #11)

---

## 6. Cross-cutting work after Wave P3

After Wave P3 completes, the next module sequence (per dependency graph + persona introduction):

| Wave | Module | Persona introduction | Skills | Estimated effort |
|---|---|---|---|---|
| **P4** | `bmad-bam-data` | Atlas (existing) | 14 | ~85-100h |
| **P5** | `bmad-bam-integration` | **Kai** 🔗 (new persona) | 13 | ~80-100h (incl. Kai setup) |
| **P6** | `bmad-bam-ai` | **Nova** 🌟 (new persona) | 27 | ~150-180h |
| **P7** | `bmad-bam-rag` | Nova (existing post-P6) | 8 | ~50-65h |
| Cross | Cross-family workflows | (in platform) | 12 of 13 | ~50-70h |

**v6.0 release readiness checkpoint:** after P3+P4+P5+P6 = **70 skills + 3 personas across 4 modules**. This is the spec's "v6.0 = 4 modules" milestone.

**Beyond v6.0:**
- **v6.1 wave**: P7 (rag) + P8 (trust, Cipher persona) = 24 skills
- **v6.2 wave**: P9 (ops, Rune persona) + P10 (ux, Iris persona) = 28 skills
- Cross-family: rest of the 13 utility workflows

---

## 7. Risks + open questions

### Risk 1: spec says 350-550 fragments; current 6

Fragment count per skill: design-tenancy-model has 6 fragments dedicated to it (tenancy-decision-framework, rls-deep-dive, schema-per-tenant, cell-based-architecture, tenant-isolation-testing-patterns + sentinel). That's a benchmark.

If average is 4-6 fragments per workflow skill:
- 135 skills × 5 = 675 fragments (above spec ceiling of 550)
- 135 skills × 4 = 540 fragments (at spec ceiling)
- 135 skills × 3 = 405 fragments (mid-range)

**Action:** during each sub-wave brainstorm, audit fragment-per-skill density. If trending high, increase fragment reuse across skills (e.g., a single `tier-based-pricing` fragment used by multiple commercial skills).

### Risk 2: 27 of 28 quality gates have no checklist yet

Spec §8.1 lists 28 quality gates. Only QG-M2 has a checklist file. Each gate's `<module>/data/checklists/QG-*.md` needs:
- Frontmatter (id, title, module, phase, criticality, depends-on, evidence-depends-on, auto-checkable %, human-review %)
- Criteria sections
- Evidence collection steps

**Action:** Each Wave P3.x sub-wave establishes 1-2 new QG checklists (table in §4). By end of Wave P3, ~7 gates covered. P4+P5+P6 will fill the rest (each module's primary gates).

### Risk 3: cross-persona invocation patterns untested

The spec describes cross-persona invocation (e.g., Atlas's design-modular-monolith might delegate to Kai's `design-facade-contract`). Currently only Atlas exists, so this is theoretical.

**Action:** Wave P5 (integration / Kai) is where this gets tested. Wave P3 stays single-persona. Cross-persona invocation is not in scope for Wave P3.

### Risk 4: cross-module fragment reuse untested

design-tenancy-model references Atlas's fragments. Future skills may need to reference DATA module's fragments (when bmad-bam-data is built). The cross-module fragment-path convention (`_bmad/<other-code>/...`) needs validation.

**Action:** First cross-module reference will happen in Wave P4 (data module's first skill references Atlas's platform fragments). Until then, theoretical. Document the expectation in the Wave P4 brainstorm.

### Risk 5: Wave P3 effort estimate vs spec total

Spec §1 says "~3200-4000h across 3 waves". Wave P3 = ~100h = ~2.5% of total. That's consistent — platform alone shouldn't be more than ~15% of total spec scope.

**Sanity check:** total = 135 skills × avg 25h/skill = 3375h. Matches spec. Wave P3 = 15 skills × 7h/skill avg = 105h. Per-skill effort lower in Wave P3 because Atlas's resource library + infrastructure are already mature.

---

## 8. Pre-Wave-P3 readiness checklist

Before starting Wave P3.1:

- [ ] **All 5 queued PRs merged:** PR #3 (Concerns 4+5), PR #5 (Concern 7), PR #6 (Tier-2), PR #7 (audit ENH), chore (submodule bump)
- [ ] **Tier-1 audit green on main branch** (8 checks a-h)
- [ ] **Tier-2 PASS** (`BAM_TIER2=1`) on main
- [ ] **Plan C R5 ratification recorded** (manual in real Claude Code IDE; pre-Wave-P3 baseline)
- [ ] **Spec v0.9 status banner intact** (confirms no concurrent spec drift)
- [ ] **Module.yaml + marketplace.json stable** (Wave P3 should NOT change these; only add new skill dirs)
- [ ] **CI updated to run BAM_TIER2=1** on merge-to-main (if you have CI; otherwise skip)

---

## 9. Recommended first concrete action after merges land

Open a fresh brainstorm session for **Wave P3.1 (Foundation Skills)**:

```
Topic: Wave P3.1 — bmad-bam-platform foundation skills (4 skills)
  - design-modular-monolith
  - design-deployment-topology
  - design-finops-model
  - design-tenant-tier-model

Established context (Atlas already exists; design-tenancy-model is the template):
  - Each skill outputs a design doc + ADR + QG evidence
  - Each skill has 5-7 steps in CEV pattern
  - Each skill consumes 3-5 fragments from Atlas's resources/
  - Each skill establishes/refines 1-2 quality gates

Key questions to lock:
  - QG-M1 checklist criteria (does P3.1 establish it, or P3.2?)
  - Fragment density per skill (cap at 4-5 to stay under spec ceiling)
  - Cross-skill fragment reuse (one fragment serves multiple skills where possible)
  - Brownfield vs greenfield mode discipline (P3.4 skills are brownfield-specific)
```

This brainstorm produces:
1. Locked design decisions for P3.1
2. Design spec at `docs/superpowers/specs/2026-05-1?-wave-p3-1-foundation.md`
3. Implementation plan at `docs/superpowers/plans/2026-05-1?-wave-p3-1-foundation.md`
4. RDP kickoff doc at `docs/v6-rdp-wave-p3-1-kickoff.md`

Then RDP executes the plan. Final PR #8 closes Wave P3.1.

---

## Summary

| | Value |
|---|---|
| **Current state** | 1 of 8 modules at 25% (4 of 16 skills) |
| **Spec target** | 8 modules / 135 skills / 6 personas |
| **Next-wave recommendation** | **Option A: Wave P3 — Complete `bmad-bam-platform`** |
| **Wave P3 effort** | ~95-115h across 4 sub-waves |
| **Wave P3 sub-waves** | P3.1 Foundation (4 skills), P3.2 Lifecycle (4), P3.3 Commercial (5), P3.4 Brownfield (2) |
| **v6.0 release readiness** | After Wave P3 + P4 (data) + P5 (integration, Kai) + P6 (ai, Nova) ≈ 70 skills / 3 personas / 4 modules |
| **Pre-wave blocker** | 5 queued PRs need merge first |
| **First concrete action** | Brainstorm Wave P3.1 (Foundation skills) — after merges land |
