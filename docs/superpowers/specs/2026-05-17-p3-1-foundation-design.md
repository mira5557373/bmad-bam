# P3.1 Foundation Skills — Design Specification

> **Status:** Brainstorm-locked 2026-05-17. Awaiting user review before writing-plans handoff.
> **Wave:** P3.1 (Foundation) within Wave P3 (Complete `bmad-bam-platform`).
> **Branch:** `feat/v6-p3-1-foundation` (base: `feat/bam-v3-pure-kb` at `b1759d1`, post-P3.0).
> **Effort estimate:** ~75-90h (per Roadmap §3 P3.1).
> **Depends on:** ADRs 006, 008, 009, 010, 011, 012, 013, 014.
> **ADR allocation:** ADR-015 (new).
> **Spec references:** §5.1 (skills 2-5), §6.3 (fragment body), §6.5 (anti-patterns), §7.2 (customize-template overlay), §8.1 (gate frontmatter).
> **Roadmap references:** §3 Wave P3 + §8 P3.1 delta.

---

## 1. Goal

Ship 4 new platform workflow skills (skills 2-5 from spec §5.1) that complete the Foundation tier of `bmad-bam-platform`: bounded contexts + deployment + unit economics + tier model. Establish QG-F1 (blocking, full) + QG-M1 (partial; auto-criteria only). Refine QG-M2 (Tenant Isolation; established P2.1) via cross-references.

## 2. Architecture overview

### 2.1 Skills shipped

| # | Skill | Spec ref | Menu code | Decision recorded |
|---|---|---|---|---|
| 2 | `bmad-bam-design-modular-monolith` | §5.1 #2 | **MM** | Bounded contexts + ports/adapters |
| 3 | `bmad-bam-design-deployment-topology` | §5.1 #3 | **DT** | Tenant cohorts + rollout strategy |
| 4 | `bmad-bam-design-finops-model` | §5.1 #4 | **FM** | Unit economics + per-tenant attribution |
| 5 | `bmad-bam-design-tenant-tier-model` | §5.1 #5 | **TM** | Tier matrix + transitions |

(Existing P2.1 skill `bmad-bam-design-tenancy-model`, code **D**, is the 1st Foundation skill; no rework in P3.1 beyond the JSON-output addition — see §3.R1.)

### 2.2 Dependency graph

```
                   [P2.1]
              design-tenancy-model
        (produces tenancy-model.md + tenancy-decision.json)
                       │
       ┌───────────────┼──────────────┬────────────────┐
       ▼               ▼              ▼                ▼
   [modular-      [deployment-     [tier-model]   (verify-coherence
    monolith]      topology]                       runs at finops end)
    soft-input    REQUIRED-input   soft-input
       │              │                │
       │              ▼                ▼
       │      (rollout cohorts)   (tier matrix)
       │              │                │
       │              └────────┬───────┘
       │                       ▼
       └──────────────►   [finops-model]
                         REQUIRED inputs: tenancy + tier + deployment
                                  │
                                  ▼
                         ╔══════════════════╗
                         ║  QG-F1 Foundation║
                         ║  blocking gate   ║
                         ╚══════════════════╝
                                  │
                                  ▼
                         ╔══════════════════╗
                         ║  QG-M1 (partial) ║
                         ║  auto-criteria   ║
                         ╚══════════════════╝
```

### 2.3 Coupling matrix (R7)

| Skill | Required inputs | Soft inputs |
|---|---|---|
| `modular-monolith` | — | `tenancy-decision.json` (recommended; workflow proceeds without it but warns) |
| `deployment-topology` | `tenancy-decision.json` | `tier-model.json` |
| `tier-model` | — | `tenancy-decision.json` |
| `finops-model` | `tenancy-decision.json`, `tier-model.json`, `deployment-topology.json` | — |

**Required** = workflow refuses to start with clear diagnostic. **Soft** = workflow prompts user; can proceed with stub defaults.

---

## 3. Locked decisions (Q1-Q10 + R1-R12)

### Q1 — QG-F1 evidence schema: per-skill files

Each Foundation skill writes its primary artifact to `docs/architecture/<name>.md` (human-readable workflow output) AND a stable JSON pointer at `_bmad/bam/evidence/QG-F1/<name>.json` plus dated copy in `YYYY-MM-DD-NNN/` subdir with `criteria-met.md` + `decision.md` per `std-validation`. QG-F1's auto-checks verify each `_bmad/bam/evidence/QG-F1/<name>.json` exists + required frontmatter keys present.

### R1 — structured JSON contract alongside markdown (revises Q4)

`design-tenancy-model` (P2.1 skill, minor modification) gains one new output: `tenancy-decision.json` alongside `tenancy-model.md`. JSON has stable machine-readable schema:

```json
{
  "schema_version": "1.0",
  "decided_at": "<ISO-8601>",
  "tenancy_model": "rls | schema-per-tenant | cell-based | hybrid",
  "attribution_affordances": {
    "compute": "tenant_id_in_trace_span",
    "storage": "by_predicate | by_schema | by_cell_then_intra",
    "network": "tenant_context_header"
  },
  "rationale_ref": "docs/architecture/tenancy-model.md"
}
```

Every Foundation skill follows the same pattern: `<decision>.md` + `<decision>.json`. JSON is the machine-readable contract; markdown is the human narrative. Replaces brittle markdown-parsing from Q4.

### Q2 — modular-monolith decision space: hybrid default

Decision matrix scores 4 options; v6.0 default = **C (hybrid DDD + ports)**:
- A: DDD bounded contexts (pure)
- B: Ports & adapters (hexagonal, pure)
- **C: Hybrid — DDD contexts + ports at each boundary (default)**
- D: Vertical slice (mentioned but rejected for multi-tenant)

Scoring axes (in `decision-matrix.json`): tenant-count fit, team size, domain complexity, migration cost (greenfield/brownfield/from-microservices), test ergonomics, AI-agent comprehensibility (BAM-extension axis).

### Q3 — deployment-topology tight coupling + tier defaults

Tight coupling: `bmad-skill-manifest.yaml` declares `inputs: required: [tenancy-decision.json]`. Workflow refuses to start without it.

Per-tier rollout defaults baked into patterns:

| Tier | Default rollout |
|---|---|
| Free | Aggressive canary (1→10→50→100% over hours) |
| Starter | Canary (1→10→50→100%) |
| Pro | Standard canary (10→50→100% over a day) |
| Business | Blue-green with synthetic-traffic monitoring window |
| Enterprise | Blue-green + named pilot-tenant opt-in |

User can override per-project.

### Q4 + R1 — finops-model inputs

`bmad-skill-manifest.yaml`: `inputs: required: [tenancy-decision.json, tier-model.json, deployment-topology.json]`. Reads structured JSON (per R1); no markdown parsing.

Tenancy-model.md template (text content rule, no workflow change) gains an "Attribution affordances" subsection for human readers; the machine contract is the JSON.

### Q5 + R2 — tier-model shape + hint discipline

Default: 5 tiers (free/starter/pro/business/enterprise). `--custom-tiers N` flag for 3-7 tier projects.

Artifact schema (`tier-model.json`):

```json
{
  "schema_version": "1.0",
  "tier_count": 5,
  "custom_tiers_mode": false,
  "tiers": [
    {
      "id": "free", "price_per_month_usd": 0,
      "limits": { "seats": 1, "api_calls_per_month": 1000, "storage_gb": 1, "compute_hours": 5 },
      "features": ["basic_dashboards", "community_support"],
      "rollout_tier_hint": "aggressive_canary",   // tentative; deployment-topology may override
      "cost_ceiling_usd_per_month_hint": 0.50,    // tentative; finops may override
      "upgrade_mode": "self_service",
      "upgrade_path": "starter"
    },
    {"id": "starter", "price_per_month_usd": 19, "...": "..."},
    {"id": "pro",     "price_per_month_usd": 99, "...": "..."},
    {"id": "business","price_per_month_usd": 499,"...": "..."},
    {"id": "enterprise","price_per_month_usd": "custom","...": "..."}
  ],
  "transitions": {
    "any_downgrade": "rate_arbitrage_check"   // hook for P3.3
  }
}
```

Fields suffixed `_hint` are TENTATIVE — overridable by downstream skills. The `verify-coherence` step (last in finops) checks the final values across all 3 artifacts (tier + deployment + finops) and produces `_bmad/bam/evidence/QG-F1/foundation-coherence.json`.

### Q6 + R3 — fragment density: 18 fragments total (hard cap, with consolidation)

| Skill | Fragments (≤5 each) | Count |
|---|---|---|
| modular-monolith | `ddd-bounded-contexts`, `ports-and-adapters`, `module-decomposition-heuristics`, `anti-corruption-layer`, `evolutionary-architecture` | 5 |
| deployment-topology | `rollout-strategies-comparison` (merged blue-green + canary), `tenant-cohort-design`, `rollback-strategies`, `zero-downtime-migrations` | 4 |
| finops-model | `unit-economics-saas`, `per-tenant-cost-attribution-with-hooks` (merged), `cost-allocation-shared-resources`, `budget-alerts-and-quotas` | 4 |
| tier-model | `tier-design-principles`, `feature-gating-patterns`, `limit-and-quota-design`, `tier-transition-economics`, `tier-cliff-avoidance` | 5 |
| **Total** | | **18** |

All fragments live in `1-foundation/bmad-bam-agent-atlas/resources/fragments/`. Each follows spec §6.3 body structure (When to Use / When NOT to Use / Architecture / Trade-offs / Implementation Patterns / Quality Checks / Web Research Queries / Cross-references).

### Q7 — stand-alone fragments + workflow inputs only

Step files cite ONLY their own skill's 5 fragments. Cross-workflow data flows via manifest `inputs:` (structured JSON per R1). No cross-skill fragment Read calls in step files.

### Q8 + R4 — 4 anti-patterns

In `1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/`:

| Anti-pattern | What it warns against |
|---|---|
| `tenancy-as-afterthought` | Adding multi-tenancy after the schema/codebase is built; brittle retrofits |
| `deployment-without-cohorts` | Rolling out without tenant-cohort awareness; one tenant break blasts all |
| `price-without-cost-attribution` | Setting prices without per-tenant cost data; losing on power users |
| `tier-cliff` | Huge price/feature jumps between tiers; drives downgrade-and-share workarounds |

Each anti-pattern has frontmatter `kind: anti-pattern` per spec §6.5.

### Q9 + R5 — 6 glossary terms in CSV index

`1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv`:

```csv
term,one-sentence-definition,introduced-in-skill,status
bounded-context,"A cohesive boundary within a domain model where a single ubiquitous language applies (DDD).",bmad-bam-design-modular-monolith,provisional
tenant-cohort,"A deliberately-defined subset of tenants grouped for rollout, billing, or routing decisions.",bmad-bam-design-deployment-topology,provisional
per-tenant-cost-attribution,"Mechanism for assigning infrastructure cost (compute, storage, network) to specific tenant identities.",bmad-bam-design-finops-model,provisional
tier-cliff,"A discontinuity between tiers (price jump, feature jump) that incentivizes user workarounds rather than upgrades.",bmad-bam-design-tenant-tier-model,provisional
unit-economics,"The per-unit-of-business revenue, cost, and margin model; for SaaS the unit is typically a tenant or seat.",bmad-bam-design-finops-model,provisional
feature-gating,"The mechanism for enabling/disabling features based on a tenant's tier, role, or other attribute.",bmad-bam-design-tenant-tier-model,provisional
```

(`rate-arbitrage` deferred to P3.3 wave where `design-tenant-rate-arbitrage` skill formally introduces it.)

PX-Glossary wave later promotes to per-term `.md` files.

### Q10 + R6 — minimal customize-template overlay for `bmad-create-architecture`

Path: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/customize-template/bmad-create-architecture/customize.toml` (per spec §7.2).

Content:

```toml
[workflow]

activation_steps_append = [
  "If this project is a multi-tenant SaaS, consult BAM's Foundation skills (`/bmad-bam-design-tenancy-model` + `/bmad-bam-design-modular-monolith`) before architecture decisions — tenancy choice and bounded-context decomposition are load-bearing."
]

persistent_facts = [
  "file:{project-root}/_bmad-output/bbp/project-context.md"
]
```

Validates the §7.2 BAM→BMM-core overlay mechanism with two real injection points. Future modules adopt the pattern.

---

## 4. ADR-015 draft

Path: `_bmad/_memory/atlas/architecture-decisions/2026-05-17-015-p3-1-foundation-decisions.md`

Frontmatter:

```yaml
---
id: 2026-05-17-015
title: Wave P3.1 Foundation Skills design decisions (4 skills + QG-F1 + QG-M1 partial)
status: accepted
date: 2026-05-17
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - "design-tenancy-model (P2.1) accepts one additional output (tenancy-decision.json) — modification scope is minor (one writer in step-05)"
  - "BMAD's three-layer customize merge accepts customize-template/<bmm-skill>/customize.toml overlays from BAM modules (spec §7.2)"
  - "Workflow inputs declared in bmad-skill-manifest.yaml are honored by Atlas's workflow runner; required-vs-soft distinction is workflow-enforced"
  - "Menu codes MM/DT/FM/TM do not collide with existing or planned 2-char codes elsewhere in the marketplace"
dependencies-on-other-decisions:
  - 2026-05-13-006   # Atlas-as-skill (canonical home for fragments)
  - 2026-05-13-008   # BMM-canonical layout + bbp short code + subdir sentinel
  - 2026-05-16-009   # Drop literal-path directories block
  - 2026-05-16-010   # Tier-2 env-var promotion
  - 2026-05-16-011   # Phase column decoupled from directory naming
  - 2026-05-16-012   # No top-level workflows/ dir (all-in-skills)
  - 2026-05-16-013   # Z-prefix menu codes (this ADR uses 2-char per Q9 lock)
  - 2026-05-16-014   # BAM-extended bmad-skill-manifest.yaml (10 fields)
generated-by: claude-opus-4-7
authored-by: collaborative
---
```

Body sections (Context / Decision / Consequences / Alternatives Considered / Revisit triggers) capture the Q1-Q10 + R1-R12 rationale. Full body drafted at spec-write time.

---

## 5. QG-F1 checklist outline

Path: `1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-F1.md`

Frontmatter (per spec §8.1):

```yaml
---
id: QG-F1
title: Foundation
module: bmad-bam-platform
phase: solutioning
criticality: blocking
depends-on: []                          # Foundation is the first gate; nothing precedes
evidence-depends-on:
  - QG-F1/tenancy-decision.json
  - QG-F1/module-decomposition.json
  - QG-F1/deployment-topology.json
  - QG-F1/tier-model.json
  - QG-F1/finops-baseline.json
  - QG-F1/foundation-coherence.json     # produced by verify-coherence
auto-checkable: 60
human-review: 40
last_reviewed: 2026-05-17
version: 1.0.0
status: active
---
```

Auto-checkable criteria (60%):
- **C1** — Every Foundation skill produced its JSON evidence file (5 files)
- **C2** — Each JSON validates against its schema (`schema_version` present)
- **C3** — `foundation-coherence.json` reports `coherent: true` (rollout_tier hints match deployment decisions; cost_ceiling hints match finops decisions)
- **C4** — tenancy-decision.json's `attribution_affordances` block is non-empty
- **C5** — tier-model.json has either 5 tiers (default) or 3-7 with `custom_tiers_mode: true`
- **C6** — modular-monolith ADR exists with bounded-contexts enumerated

Human-review criteria (40%):
- **H1** — Reviewer confirms tenancy decision is grounded (real tenant projections, real compliance scope)
- **H2** — Reviewer confirms module-decomposition's bounded contexts align with tenancy boundaries (no leakage)
- **H3** — Reviewer confirms deployment topology's per-tier rollout defaults fit project's risk tolerance
- **H4** — Reviewer confirms tier-model's transitions match commercial reality (no tier-cliff)

**CRITICAL** (must pass):
- C1, C2, C3 (all auto)
- H1 (tenancy decision grounded)

Evidence destination: `_bmad/bam/evidence/QG-F1/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per std-validation. Stable pointers (the 6 JSON files above) updated atomically at gate run.

Web Research Queries: `multi-tenant SaaS foundation architecture {date}`, `modular monolith bounded contexts {date}`, `SaaS unit economics {date}`, `tenant tier pricing strategy {date}`.

QG-M1 (partial) — separate file `QG-M1.md` with the same frontmatter shape but only auto-checkable criteria (C1-Cn from module-decomposition); `criticality: partial`. P3.2 promotes to `blocking` when lifecycle skills land.

---

## 6. SKILL.md prose drafts (4 skills)

Each follows the design-tenancy-model template. Frontmatter must include `name` + `description` per ADR-014 (BMM-required minimum).

### 6.1 `bmad-bam-design-modular-monolith`

```yaml
---
name: bmad-bam-design-modular-monolith
description: "Decompose a multi-tenant SaaS codebase into bounded contexts with ports/adapters at each boundary. Default: hybrid DDD + hexagonal. Decision-matrix scores DDD-pure / ports-pure / hybrid / vertical-slice against tenant-count fit, team size, domain complexity, migration cost, test ergonomics, and AI-agent comprehensibility. Output: module-decomposition.md + module-decomposition.json (QG-F1 + QG-M1 evidence). Invoke via `/bmad-bam-design-modular-monolith`."
---

# bmad-bam-design-modular-monolith

## Purpose
Lock down the module map BEFORE writing code. A multi-tenant SaaS that gets module boundaries wrong leaks tenancy into infrastructure code and forces costly retrofits. This workflow elicits the project's domain, scores 4 decomposition options, recommends one (hybrid by default), and produces the artifact downstream architecture decisions depend on.

## When to invoke
- Greenfield SaaS — invoke before writing the first module-spanning code
- Brownfield retrofit — after `analyze-existing-tenancy` (P3.4) but before refactoring
- Whenever team size doubles or domain scope changes materially

## Inputs
- Soft: `tenancy-decision.json` (recommended; affects bounded-context alignment)
- Elicited at runtime: domain summary, team size, current codebase size, brownfield-or-greenfield

## Output
- `docs/architecture/module-decomposition.md` — human-readable
- `_bmad/bam/evidence/QG-F1/module-decomposition.json` — machine contract

## Gate
QG-F1 (blocking) + QG-M1 (partial; full in P3.2).
```

### 6.2 `bmad-bam-design-deployment-topology`

```yaml
---
name: bmad-bam-design-deployment-topology
description: "Design rollout strategy + tenant cohorts for multi-tenant SaaS deployments. Tightly coupled to tenancy choice (RLS → app-canary, schema-per-tenant → app-canary + per-schema DB rollout, cell-based → per-cell blue-green). Ships 4 tier-mapped rollout defaults (free/starter=aggressive-canary, pro=canary, business=blue-green-synthetics, enterprise=blue-green-pilot). Output: deployment-topology.md + deployment-topology.json (QG-F1 evidence). Invoke via `/bmad-bam-design-deployment-topology` AFTER `bmad-bam-design-tenancy-model`."
---

# bmad-bam-design-deployment-topology

## Purpose
Decide HOW software changes reach tenants safely. A multi-tenant SaaS without tenant-cohort-aware rollouts blast-radiuses every change to every tenant simultaneously. This workflow reads the tenancy decision, picks compatible rollout strategies, defines tenant cohorts (per-tier, per-region, or per-explicit-list), and assigns per-tier rollout defaults.

## When to invoke
- After `bmad-bam-design-tenancy-model` (REQUIRED input)
- Before first production deployment
- Whenever a new tier is added or rollback policy changes

## Inputs
- Required: `tenancy-decision.json` (workflow refuses to start without it)
- Soft: `tier-model.json` (if absent, prompts for tier list inline)

## Output
- `docs/architecture/deployment-topology.md`
- `_bmad/bam/evidence/QG-F1/deployment-topology.json`

## Gate
QG-F1 (blocking).
```

### 6.3 `bmad-bam-design-finops-model`

```yaml
---
name: bmad-bam-design-finops-model
description: "Establish per-tenant unit economics + cost attribution for multi-tenant SaaS. Reads tenancy, tier, and deployment artifacts (all required). Per-tenant cost = compute + storage + network + third-party, tagged via tenancy-specific affordances (RLS: tenant_id in span; schema-per-tenant: pg_database_size by schema; cell-based: per-cell aggregate). Produces unit economics, per-tier cost ceilings, instrumentation hooks, and budget alerts. Last in dependency order — runs verify-coherence across the 3 upstream artifacts. Output: finops-baseline.md + finops-baseline.json + foundation-coherence.json. Invoke via `/bmad-bam-design-finops-model`."
---

# bmad-bam-design-finops-model

## Purpose
You can't price what you can't measure. A multi-tenant SaaS without per-tenant cost attribution loses money on power users and overcharges underutilized tiers. This workflow consumes the tenancy + tier + deployment decisions and produces the unit-economics baseline + instrumentation contract for live attribution.

## When to invoke
- After tenancy + tier + deployment are decided (ALL required)
- Before pricing is finalized
- Annually as cloud costs shift

## Inputs
- Required: `tenancy-decision.json`, `tier-model.json`, `deployment-topology.json` (all three; workflow refuses without)

## Output
- `docs/architecture/finops-baseline.md`
- `_bmad/bam/evidence/QG-F1/finops-baseline.json`
- `_bmad/bam/evidence/QG-F1/foundation-coherence.json` (the verify-coherence step's output)

## Gate
QG-F1 (blocking). This skill's verify-coherence step is the gate's coherence-criteria producer.
```

### 6.4 `bmad-bam-design-tenant-tier-model`

```yaml
---
name: bmad-bam-design-tenant-tier-model
description: "Design the tier matrix (free/starter/pro/business/enterprise by default; --custom-tiers for 3-7-tier projects). Each tier ships price, limits, features, plus tentative downstream-contract hints (rollout_tier_hint, cost_ceiling_usd_per_month_hint, upgrade_mode) consumed by deployment-topology and finops-model. Encodes tier transitions (upgrade paths, downgrade rate-arbitrage hook for P3.3). Output: tier-model.md + tier-model.json (QG-F1 evidence). Invoke via `/bmad-bam-design-tenant-tier-model`."
---

# bmad-bam-design-tenant-tier-model

## Purpose
Define what users buy. A multi-tenant SaaS's tier structure determines who self-serves vs needs sales, where the gross-margin cliffs are, and what features get gated. This workflow ships 5 spec-canonical tiers as the default (free/starter/pro/business/enterprise) with override hooks for unusual project shapes.

## When to invoke
- During or after `bmad-bam-design-tenancy-model` (soft input; can run independently)
- Before pricing pages are designed
- Before P3.2 onboarding/offboarding workflows (which need the tier list)
- Before P3.3 billing/rate-limit workflows

## Inputs
- Soft: `tenancy-decision.json` (some tenancy models force certain tier structures; e.g., cell-based naturally has per-cell pricing)
- Flag: `--custom-tiers N` (N = 3-7) for non-standard projects

## Output
- `docs/architecture/tier-model.md`
- `_bmad/bam/evidence/QG-F1/tier-model.json` (the keystone artifact for P3.1's downstream skills)

## Gate
QG-F1 (blocking).
```

---

## 7. Deliverables checklist

### 7.1 Code/config

- [ ] 4 skill dirs at `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-{modular-monolith,deployment-topology,finops-model,tenant-tier-model}/`, each with: SKILL.md, customize.toml, workflow.md, bmad-skill-manifest.yaml, CEV steps in steps/ (modular-monolith/deployment-topology/tier-model: 7 steps each mirroring design-tenancy-model; finops-model: 8 steps — 7 + verify-coherence), 1 template in templates/, tests/smoke-test.sh
- [ ] 18 fragments at `1-foundation/bmad-bam-agent-atlas/resources/fragments/` (per Q6 + R3 distribution)
- [ ] 4 anti-patterns at `1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/` (Q8 + R4)
- [ ] 1 glossary CSV at `1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv` (6 terms)
- [ ] 2 quality-gate checklists: `QG-F1.md` (full, blocking), `QG-M1.md` (partial; auto-criteria only)
- [ ] 1 customize-template overlay at `.../bmad-bam-design-modular-monolith/customize-template/bmad-create-architecture/customize.toml`
- [ ] `module-help.csv`: 4 new rows (13 cols each per ADR-014); menu codes MM/DT/FM/TM
- [ ] `marketplace.json`: 4 new skill entries (paths under `2-modules/`)
- [ ] `tests/audit-marketplace.sh` check (i) workflow allow-list: add 4 new entries
- [ ] Tier-2 `tests/integration/run-real-install.sh`: verify the 4 skill paths exist post-install (BAM_TIER2=1 mode)

### 7.2 Modifications to existing artifacts

- [ ] `design-tenancy-model` (P2.1): add `tenancy-decision.json` output in step-05 (R1)
- [ ] `design-tenancy-model` template: add "Attribution affordances" subsection to "Architecture" (Q4)
- [ ] `module.yaml` post-install-notes: add brief mention of P3.1 Foundation skills (informational)
- [ ] `docs/v6-final-architecture.md`: changelog row for v0.10 (optional; if Roadmap §3 considers P3.1 substantial)
- [ ] `docs/v6-detailed-roadmap.md` §13: ADR-015 row added

### 7.3 Documentation

- [ ] ADR-015 at `_bmad/_memory/atlas/architecture-decisions/2026-05-17-015-p3-1-foundation-decisions.md`
- [ ] `_bmad/_memory/atlas/architecture-decisions/INDEX.md`: ADR-015 row added
- [ ] `docs/v6-effort-actuals.md`: P3.1 actual effort recorded post-completion

### 7.4 Regeneration

- [ ] `tools/generate-llms-txt.sh platform` — re-run; commits regenerated `llms.txt`

---

## 8. Acceptance criteria (Cross-validation per Roadmap §4)

### 8.1 Universal cross-validation checklist (§4 in roadmap)

All Roadmap §4 items pass. Specific to P3.1:

- [ ] Tier-1 audit checks (a)-(i) all green; check (i) recognizes the 4 new workflow names
- [ ] Tier-2 `BAM_TIER2=1 tests/integration/run-real-install.sh` passes (after R1 P2.1 modification)
- [ ] design-tenancy-model smoke-test still passes post-R1 modification
- [ ] Each new skill's smoke-test passes
- [ ] Wave 0 + P2 cp-sim smoke-tests pass (no regression)

### 8.2 Wave-specific (§3 Wave P3 P3.1)

- [ ] All 4 P3.1 skills' smoke-tests PASS
- [ ] No regression on `design-tenancy-model` smoke-test
- [ ] QG-F1 + QG-M1 checklists have frontmatter per spec §8.1
- [ ] Each new fragment follows spec §6.3 body structure (8 sections)
- [ ] Web queries use `{date}` placeholder
- [ ] Each new fragment has `**CRITICAL:**` quality check
- [ ] Anti-patterns have `kind: anti-pattern` frontmatter per spec §6.5
- [ ] Each new fragment has `last_reviewed: 2026-05-17`
- [ ] module-help.csv updated with 4 new rows; menu codes MM/DT/FM/TM unique
- [ ] marketplace.json regenerated with 4 new skill entries (phase-prefixed paths)
- [ ] llms.txt regenerated post-changes
- [ ] customize-template overlay smoke-tested (verify merge resolves correctly)
- [ ] QG-F1 auto-criteria pass when all 5 Foundation skills have run to completion (verified via E2E test in `tests/p2/`)

### 8.3 Plan C (manual or autonomous-subagent) — OPTIONAL

Per Roadmap §3 P3.1 ("Plan C R6 ratification optional; no install-mechanic changes"). If invoked, exercise: real `bmad install --custom-source $REPO_ROOT --modules bmm,bbp` → verify the 4 new skills land in `.claude/skills/` → invoke each via slash command in subagent proxy → verify outputs land at `docs/architecture/*.md` + `_bmad/bam/evidence/QG-F1/*.json`.

---

## 9. Risk register

| # | Risk | Mitigation |
|---|---|---|
| **R3.1.1** | Fragment density creeps above 5/skill | Hard cap (Q6); spec self-review enforces; reviewer fails PR if exceeded |
| **R3.1.2** | QG-F1 evidence schema unclear at gate-run time | Q1+R1: per-skill JSON files with stable schema; gate auto-checks read JSON not markdown |
| **R3.1.3** | finops attribution requires tenancy upstream contract | Q4+R1: structured `tenancy-decision.json` (machine-readable); manifest `inputs:` required |
| **R3.1.4** | customize-template overlay breaks if BMM bmad-create-architecture changes structure | Smoke-test the overlay merge; CI alerts on submodule bump; minimal overlay shape (R6) reduces blast surface |
| **R3.1.5** | tier-model hint vs deployment-topology override creates inconsistent state | `verify-coherence` step at end of finops-model produces `foundation-coherence.json`; gate auto-criterion C3 fails clearly |
| **R3.1.6** | P2.1 design-tenancy-model modification (R1) introduces regression | Smoke-test rerun pre-merge; the modification is additive (new JSON output; existing markdown unchanged) |

---

## 10. Effort estimate

| Component | Effort |
|---|---|
| 4 skills (SKILL.md + customize.toml + workflow.md + 5-7 steps + template + smoke-test) | 4 × ~12-15h = 48-60h |
| 18 fragments | 18 × ~1.5h = 27h |
| 4 anti-patterns | 4 × ~1h = 4h |
| Glossary CSV | ~1h |
| QG-F1 + QG-M1 checklists | ~3h |
| Customize-template overlay | ~2h |
| design-tenancy-model R1 modification | ~2h |
| ADR-015 | ~2h |
| Tier-1 audit check (i) update + new fixture | ~2h |
| llms.txt regeneration + module-help.csv + marketplace.json | ~1h |
| PR + cross-validation review | ~5h |
| **Total** | **~97-110h** |

Per Roadmap §3 P3.1 target of 75-90h, this is **slightly over budget (+10-20h)**. Driver: 18 fragments × 1.5h is conservative; faster fragments (CSV index from existing knowledge) may land us at 75-90h. **Action:** track per-fragment actuals in `docs/v6-effort-actuals.md`; if averaging >1h/fragment by mid-wave, accelerate by reusing more of Atlas's existing fragment patterns.

---

## 11. Implementation sequencing hint (for writing-plans skill)

Suggested phase order (~11 phases for the implementation plan):

1. **Phase 0:** Branch setup (already done — `feat/v6-p3-1-foundation`)
2. **Phase 1:** P2.1 R1 modification — `design-tenancy-model` adds JSON output + "Attribution affordances" template subsection. Smoke-test regression check.
3. **Phase 2:** Skill scaffolding — 4 skill dirs + SKILL.md + customize.toml + workflow.md (no steps/fragments yet).
4. **Phase 3:** Atlas resources (18 fragments + 4 anti-patterns + 6-term glossary CSV).
5. **Phase 4:** modular-monolith skill — full 5-7 steps + template + smoke-test (independent — no required inputs).
6. **Phase 5:** tier-model skill — full implementation (independent of deployment).
7. **Phase 6:** deployment-topology skill — full implementation (requires tenancy-decision.json from Phase 1).
8. **Phase 7:** finops-model skill — full implementation (requires Phase 5 + 6 + 1 outputs); includes `verify-coherence` step.
9. **Phase 8:** Quality gates — QG-F1.md + QG-M1.md (partial).
10. **Phase 9:** Customize-template overlay + audit check (i) update + module-help.csv + marketplace.json regeneration.
11. **Phase 10:** ADR-015 + INDEX update + roadmap §13 update + llms.txt regeneration.
12. **Phase 11:** Cross-validation + PR.

Each phase produces one atomic commit (per spec discipline established in PRs #1-#8).

---

## 12. Open questions for user (none required to start)

- Plan C Round 6 — autonomous or skip? Roadmap §3 calls it optional.
- Branch base — `feat/bam-v3-pure-kb` (current) vs an intermediate integration branch?
- Customize-template overlay scope — locked at minimal (R6); revisit if scope discussion warrants pre-implementation.

(None of these block writing-plans. All can be deferred.)

---

**End of design spec.**

Next step (per brainstorming skill): user reviews this spec; on approval, invoke `superpowers:writing-plans` to generate the phase-by-phase implementation plan.
