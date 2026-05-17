# Wave P3.2 Lifecycle Skills — Design Specification

**Version:** 1.0
**Date:** 2026-05-17
**Status:** Approved (152 enhancement decisions integrated across 6 gap-scan rounds)
**Wave:** P3.2 — Lifecycle
**Module:** `bmad-bam-platform`
**Persona:** Atlas (continues; no introduction cost)
**ADR (companion):** `_bmad/_memory/atlas/architecture-decisions/2026-05-17-016-p3-2-lifecycle-decisions.md`
**Plan (companion):** `docs/superpowers/plans/2026-05-17-p3-2-lifecycle.md` (produced by `superpowers:writing-plans`)

> **Three artifacts, three purposes:**
> - This **SPEC** documents WHAT we're building and WHY (Sections 1-6 below).
> - The **PLAN** documents HOW to build it (ordered tasks, dependencies, gates) — produced by `superpowers:writing-plans` skill.
> - The **ADR** records the architectural decisions + alternatives + risks — at `_bmad/_memory/atlas/architecture-decisions/2026-05-17-016-p3-2-lifecycle-decisions.md`.
>
> Read the SPEC for design intent; read the PLAN for implementation sequencing; read the ADR for decision history.
>
> **Glossary cross-references:** Fragment Cross-references sections cite glossary terms by name (kebab-case, e.g., `right-to-deletion`). Markdown viewers do not auto-resolve; readers consult `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv` for definitions. The CSV's `introduced-in-skill` field is normative source-of-truth for term ownership.

---

## 0. Executive Summary

**What:** Wave P3.2 ships 4 platform lifecycle workflow skills (tenant-onboarding ZON, tenant-offboarding ZOF, multi-tenant-testing ZMT, tenant-migration-tooling ZTG) + 3 quality-gate operations (QG-M2 refine to v1.1.0, QG-M1 promote partial→blocking v1.0.0, QG-D1 create-partial v0.1.0) + 13 fragments + 4 anti-patterns + 7 glossary terms + 1 BMM customize-template overlay + ADR-016. Wave P3 reaches ~56% complete (9 of 16 platform skills).

**Why:** Closes QG-M2's H1/H2/H5 with concrete evidence (test-catalogue.json, onboarding-flow.json, offboarding-policy.json); closes ADR-015's QG-M1 H-criteria deferral by promoting M1 with 3 H-criteria evidenced by P3.2 outputs; pre-wires QG-D1 partial via migration-runbook.json for P10's full DR work.

**Key contracts:** 4 new JSON output schemas (Sections 3.2-3.5); tier-model.json additive 1.0→1.1 with `retention_window_days_hint` (Section 3.1); 2 schema fields added during gap scanning (`live_traffic`, `universal`) preserve backwards-compatibility via safe defaults.

**Cross-dependencies:** Consumes P3.1 evidence (tier-model, tenancy-decision, deployment-topology, finops-baseline); BMM overlay target pinned to v6.6.0; QG-C1 forward-pointer in offboarding narrative for P9 Trust; QG-D1 H-criteria deferred to P10 ops.

**Risks (R3.2.1-R3.2.6):** Schema 1.0→1.1 auto-fill complexity; M1 partial→blocking downstream resolution; BMM overlay brittleness on upstream change; cross-skill soft-input parsing; QG-D1 partial schema mismatch with P10; BMM target skill non-existence (R3.2.6 triggered — `bmad-design-test-strategy` deferred).

**Effort:** ~125.5h gross / ~84-95h AI-augmented (see Section 5.9 for breakdown).

---

## 0.1 Out of Scope (deferred to future waves)

- **Rate-limit-per-tenant implementation** → P3.3 Commercial (`design-rate-limit-per-tenant`)
- **Full noisy-neighbor mitigation** (quotas + algorithm) → P3.3
- **Disaster recovery full design** (RPO/RTO, failover drills, multi-region) → P10 Ops (`design-disaster-recovery`)
- **QG-C1 Compliance gate creation** → P9 Trust
- **KV-cache / cross-tenant cache attack tests** → P5 AI (`design-model-cache-isolation`)
- **Pseudonymization full glossary entry** → PX-Glossary or P9 Trust
- **Brownfield `analyze-existing-tenancy` + `plan-tenancy-retrofit` skills** → P3.4 Brownfield
- **Gate-runner workflow automation** → P11.2 `verify-production-readiness-final`
- **Tier-1 audit extension for QG checklist frontmatter validity** → future wave
- **3 advanced fixtures** (HIPAA floor, hybrid resolution + 5-tier mapping, references_degraded scenario) → fixtures v0.2.0
- **BMM `bmad-design-test-strategy` overlay** → wave when BMM ships the skill (R3.2.6 triggered)
- **Test catalogue → executable test code generator skill** → post-P3.2 wave
- **Cross-module Atlas resource discovery + namespacing** → P4+ when data module introduces conflicts

---

## 0.2 Table of Contents

- [0. Executive Summary](#0-executive-summary)
- [0.1 Out of Scope](#01-out-of-scope-deferred-to-future-waves)
- [1. Architecture & DAG](#1-architecture--dag)
- [2. Per-skill detail](#2-per-skill-detail)
- [3. JSON contracts](#3-json-contracts)
- [4. Quality gate operations](#4-quality-gate-operations)
- [5. Content additions + ADR + testing + mechanics](#5-content-additions--adr--testing--mechanics)
- [6. Acceptance Criteria + Integration assertion](#6-acceptance-criteria--integration-assertion)
- [Risk register (R3.2.1-R3.2.6)](#risk-register)
- [Appendix A — Enhancement index (152 decisions)](#appendix-a--enhancement-index)

---

## 1. Architecture & DAG

### 1.1 Module + persona

All 4 skills land under `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-*/`. Atlas continues as persona (no introduction cost). Phase column = `solutioning` per ADR-011; directory grouping per ADR-008.

### 1.2 Workflow DAG (with symmetric onboarding↔offboarding edge per G1)

```
                            P3.1 chain (unchanged)
                  ┌─────────────────────────┐
                  │ design-tenancy-model    │────────────────────────────────┐
                  └────────────┬────────────┘                                │
                               ▼                                             │
                  ┌─────────────────────────┐                                │
                  │ design-modular-monolith │                                │
                  └────────────┬────────────┘                                │
                               ▼                                             │
                  ┌─────────────────────────┐                                │
                  │ design-tenant-tier-model│─────────────────┐              │
                  │   (schema 1.0 → 1.1)    │                 │              │
                  └────────────┬────────────┘                 │              │
                               ▼                              │              │
                  ┌─────────────────────────┐                 │              │
                  │ design-deployment-      │─────────┐       │              │
                  │ topology                │         │       │              │
                  └────────────┬────────────┘         │       │              │
                               ▼                      │       │              │
                  ┌─────────────────────────┐         │       │              │
                  │ design-finops-model     │         │       │              │
                  └─────────────┬───────────┘         │       │              │
                                │ (soft)              │       │              │
                                ▼                     ▼       ▼              ▼
                                       P3.2 additions
                            ┌────────────────────────────────────────────────────┐
                            │ design-tenant-onboarding (ZON)                     │
                            │ req: tier-model.json, tenancy-decision.json        │
                            │ soft: deployment-topology.json                     │
                            │ out: onboarding-flow.json + QG-M2-onboarding-      │
                            │       evidence.md                                  │
                            └──────────────────┬─────────────────────────────────┘
                                               │ (soft, symmetric tear-down)
                                               ▼
                            ┌────────────────────────────────────────────────────┐
                            │ design-tenant-offboarding (ZOF)                    │
                            │ req: tier-model.json, tenancy-decision.json        │
                            │ soft: finops-baseline.json, onboarding-flow.json   │
                            │ flag: --regulatory-profile                         │
                            │ out: offboarding-policy.json + QG-M2-offboarding-  │
                            │       evidence.md                                  │
                            └────────────────────────────────────────────────────┘

                                       (independent path)
                            ┌────────────────────────────────────────────────────┐
                            │ design-multi-tenant-testing (ZMT)                  │
                            │ req: tenancy-decision.json                         │
                            │ soft: tier-model.json                              │
                            │ out: test-catalogue.json + QG-M2-test-catalogue-   │
                            │       evidence.md                                  │
                            │ + 1 BMM overlay (bmad-qa-generate-e2e-tests)       │
                            └────────────────────────────────────────────────────┘

                            ┌────────────────────────────────────────────────────┐
                            │ design-tenant-migration-tooling (ZTG)              │
                            │ req: tier-model.json, deployment-topology.json,    │
                            │      tenancy-decision.json                         │
                            │ soft: onboarding-flow.json, offboarding-policy.json│
                            │ flag: --migration-axis tier|region|both            │
                            │ out: migration-runbook.json + QG-D1-migration-     │
                            │       evidence.md (+ QG-M2 mirror)                 │
                            └────────────────────────────────────────────────────┘
```

**Edge list (fallback for non-monospace viewers):**
```
tenancy-model       → onboarding[req], offboarding[req], multi-tenant-testing[req], migration[req]
tier-model          → onboarding[req], offboarding[req], multi-tenant-testing[soft], migration[req]
deployment-topology → onboarding[soft], migration[req]
finops-model        → offboarding[soft]
onboarding (P3.2)   → offboarding[soft], migration[soft]
offboarding (P3.2)  → migration[soft]
```

**Sequencing rationale.** Onboarding before offboarding because provisioning hooks are designed before symmetric tear-down hooks. Multi-tenant-testing is independent (only needs tenancy). Migration is the most-coupled (3 required + 2 soft) — runs last when full evidence chain exists.

### 1.3 Evidence destinations

| Output | `docs/architecture/` (human narrative) | Primary evidence (machine + human) | Mirror | Rationale |
|---|---|---|---|---|
| `onboarding-flow.md/.json` + `QG-M2-onboarding-evidence.md` | ✓ | `QG-M2/` | — | Closes M2 H2 + C6 |
| `offboarding-policy.md/.json` + `QG-M2-offboarding-evidence.md` | ✓ | `QG-M2/` | — | M2 H2; P9 narrative forward-pointer |
| `test-catalogue.md/.json` + `QG-M2-test-catalogue-evidence.md` | ✓ | `QG-M2/` | — | Closes M2 H1 + sharpens C1/C5 |
| `migration-runbook.md/.json` + `QG-D1-migration-evidence.md` | ✓ | `QG-D1/` | `QG-M2/` (H4 partial proxy) | D1 partial + M2 H4 partial proxy |

Each skill's step-05 emits `.md` + `.json` (creates dirs via `mkdir -p`); step-07-v emits `QG-<gate>-<artifact>-evidence.md` (human narrative). The `QG-C1/` mirror originally proposed in round-1 was DROPPED per G15 (premature directory pre-creation before P9 Trust designs the schema).

### 1.4 Input-contract schema-compatibility (G3 + G9 + G43)

**tier-model.json schema 1.0 → 1.1.** P3.2 additively introduces `retention_window_days_hint` per tier. Read-time backwards-compat:

```python
schema_version = tier_model.get("schema_version", "1.0")
if schema_version == "1.0":
    DEFAULTS = {"free": 7, "starter": 30, "pro": 30, "business": 90, "enterprise": 365}
    for tier in tier_model["tiers"]:
        tier.setdefault("retention_window_days_hint",
                        DEFAULTS.get(tier["id"]))
    # If tier_id not in DEFAULTS (custom mode 1.0) → hard-fail at exit 70
```

**Tier-model skill amendment in P3.2 (per G43, NOT just-documented as round-1 mistakenly claimed):** the existing `bmad-bam-design-tenant-tier-model` receives a small additive update: step-05 emit + template + step-07-v validation + smoke-test learn the new optional `retention_window_days_hint` field. Skill stays at v0.1.0 (additive, not breaking). Effort +1h.

Custom-tier projects (3/4/6/7 tiers, non-default ids) re-running tier-model after P3.2 emit schema 1.1; pre-P3.2 tier-model.json files (schema 1.0) are read with auto-fill at consumer side ONLY for default tier ids; custom-mode 1.0 hard-fails per exit 70 with diagnostic.

**Read-time validation pattern.** Required inputs' step-01:
1. File-exists check → exit 64 (`EX_USAGE`) if required missing
2. JSON parse → exit 65 (`EX_DATAERR`) if malformed
3. Empty-file check → exit 66 (`EX_NOINPUT`) if empty
4. `schema_version` presence → warn if missing (assume "1.0")
5. 1-2 critical-key checks per input
6. Schema-mismatch beyond auto-fill → exit 70 (`EX_SOFTWARE`)

Full schema re-validation NOT repeated at read time — write-time step-07-v is the canonical guarantee.

### 1.5 Per-skill latency budgets + flags + CEV modes

| Skill | Menu code | Latency | Flags | CEV modes |
|---|---|---|---|---|
| design-tenant-onboarding | ZON | 60min | — (driven by tier-model) | Create, Edit, Validate |
| design-tenant-offboarding | ZOF | 75min | `--regulatory-profile gdpr_baseline\|hipaa\|sox_or_pci\|none` (default `gdpr_baseline`) | Create, Edit, Validate |
| design-multi-tenant-testing | ZMT | 60min | — (driven by tenancy_model) | Create, Edit, Validate |
| design-tenant-migration-tooling | ZTG | 90min | `--migration-axis tier\|region\|both` (default `both`) | Create, Edit, Validate |

Latency rationale: onboarding=5-tier elicit; offboarding=regulatory profile + 5 retention windows + handoffs; testing=per-model catalogue + hybrid resolve; migration=2 axes × cohort + dry-run + rollback (largest surface).

Validate mode = brownfield-assessment shim until P3.4 ships explicit `analyze-*` skills.

### 1.6 Hybrid isolation handling for test-catalogue + onboarding/offboarding (G6 + I4)

When `tenancy-decision.json#tenancy_model == "hybrid"`:
- **multi-tenant-testing:** step-02 reads `hybrid_resolution`; emits union of model-specific tests; `test-catalogue.json#hybrid_resolution` field records the per-tier mechanism map; tests applicable to multiple models appear once (deduped by `id`).
- **onboarding (per I4):** step-02 reads `hybrid_resolution`; emits per-tier mechanism-aware `provisioning_hooks[]` (e.g., free-tier on RLS gets `db_create_row`; enterprise-tier on cell-based gets `cell_allocate + dns_assign + cert_issue`).
- **offboarding (per I4):** same pattern; emits per-tier mechanism-aware `tear_down_hooks[]`. `cross_module_handoffs[]` are tenancy-model-agnostic and apply uniformly.

### 1.7 persistent_facts strategy (G8 per ADR-015 G6)

| File | Path style | Rationale |
|---|---|---|
| BAM's own customize.toml (4 P3.2 skills) | Universal-glob: `file:{project-root}/**/project-context.md` | Continues P3.1; Wave 0 proven |
| BMM overlay `customize-template/bmad-qa-generate-e2e-tests/customize.toml` | Specific: `file:{project-root}/_bmad-output/bbp/project-context.md` | Explicit clarity (matches finalizer emit path); per ADR-015 G6 (D4 note: BMM's own bmad-create-architecture uses `**` glob; ADR-015's "BMM may not expand `**`" rationale is outdated — specific path retained for clarity) |

### 1.8 Marketplace + module-help.csv mechanics

**`.claude-plugin/marketplace.json`:**
- Plugin `bmad-bam-platform` version: `0.5.0` → `0.6.0`
- `skills[]` array gains 4 entries appended in spec §5.1 order: onboarding, offboarding, multi-tenant-testing, migration-tooling
- Plugin description updates to mention "Lifecycle skills (P3.2)"

**`src-v6/bmad-bam-platform/module-help.csv`:**
- 4 new rows appended (insertion order preserved); `preceded-by` lists all required upstream skills per Section 5.8

**`_bmad/bam-platform/llms.txt`:** regenerated via `tools/generate-llms-txt.sh platform` AFTER module-help.csv update; both committed in same commit (#8 per Section 5.10).

### 1.9 ADR-016 outline (Section 5.5 has full draft)

ADR-016 (next available; P3 range 015-018) records 11 Q/R lock-ins + all G/H/A/I/C/D enhancements. Frontmatter `dependencies-on-other-decisions: [006, 008, 009, 010, 011, 012, 013, 014, 015]`.

### 1.10 Roadmap §3 + §11 + §13 + INDEX update

- `_bmad/_memory/atlas/architecture-decisions/INDEX.md` — append ADR-016 table row
- `docs/v6-detailed-roadmap.md` §3 P3.2 block — annotate as LANDED with date
- `docs/v6-detailed-roadmap.md` §11 customize-templates inventory — mark `bmad-qa-generate-e2e-tests` as LANDED in P3.2; `bmad-design-test-strategy` annotated "BMM upstream skill not yet shipped; BAM overlay deferred per R3.2.6"
- `docs/v6-detailed-roadmap.md` §13 ADR map — annotate ADR-016 LANDED

### 1.11 Effort estimate

See **Section 5.9** for final authoritative breakdown after all enhancements: **~125.5h gross / ~84-95h AI-augmented** (slightly above kickoff 65-80h band; revision is honest accounting from spec §6.3 fragment compliance + cross-skill DAG smoke + integration tests + design/plan/PR drafting time).

---

## 2. Per-skill detail

### 2.0 Cross-cutting conventions

**Manifest taxonomy.** All 4 skills use `cluster: lifecycle` (new value vs P3.1's `cluster: foundation`). All inherit `module: bmad-bam-platform`, `persona: atlas`, `version: 0.1.0`, `execution_mode: { default: assisted, alternatives: [manual] }`, `recommended_capabilities: [extended-thinking]`, `minimum_persona_version: "0.1.0"`.

**JSON output schema versioning.** Every new output declares `schema_version: "1.0"`. Read-time forward-compat: unknown minor → warn + proceed; unknown major → warn + proceed (treat unknown keys as ignored, fail-fast only if known-required key absent). tier-model.json 1.0→1.1 auto-fill follows Section 1.4 pattern.

**CEV file convention.** Each skill ships 7 step files: `step-01-c-elicit-context.md` through `step-06-c-record-adr.md` (Create steps) + `step-07-v-verify-completeness.md` (Validate-shared). Edit + Validate modes are router-driven re-entries; no separate `step-NN-e-*` or `step-NN-v-*` files for steps 01-06.

**Step-file frontmatter convention (per D1 — includes `gate_id`):**
```yaml
step_id: <NN-c-name>
auto_runnable: <bool>
gate: human-approval | machine-checkable
inputs: [<cache-files-from-prior-steps>]
outputs: [<cache-or-final-output-this-step-writes>]
template_ref: <skill-relative-path>   # only for step-05
gate_id: <QG-X1>                      # only for step-07-v; declares which gate's evidence
```

**Per-step cache files.** Each Create step writes to `_bmad/bam/cache/<workflow-name>/<date>/<output>.json`. Standard names: `<topic>-context.json` (step-01), `<topic>-options.json` (step-02), `decision-matrix.json` (step-03), `recommendation.json` (step-04).

**Naming convention.** Schema field is `flow_type` (3-value enum). Q2 lock's informal `onboarding_flow_hint` is the same concept; canonical schema name is `flow_type`. ADR-016 records the rename.

**workflow.md per skill.** Mirrors P3.1's ~33-line pattern: Mode router (Create/Edit/Validate) + Flags + Convention sections.

**Validate-mode behavior.** Reads existing output JSON, re-runs step-07 schema validation, refreshes `last_reviewed`, emits diff report. Brownfield-assessment shim until P3.4.

**Edit-mode triggers:**
- onboarding: new tier added → re-run 02-06 with extended list
- offboarding: regulatory profile changed OR new tier → re-run 02-06
- multi-tenant-testing: isolation_model changed OR new test class → re-run 02-06 (or 04-06 for class-only)
- migration-tooling: new axis activated → re-run 02-06 with that axis

**step-06 ADR mechanism (G16).** Mirrors P3.1's inline pattern: step-06 writes directly to `_bmad/_memory/<persona>/architecture-decisions/<date>-NNN-<topic>.md` (project-level sidecar ADR). Does NOT invoke a separate `record-decision` workflow (that's P11.1). Sidecar ADR is distinct from wave ADR-016: sidecar = project's decision artifact; ADR-016 = BAM's wave-architectural decision.

**Soft-input fallback policy.** When soft input absent, step-01 warns + uses skill-specific default:

| Skill | Soft input absent | Fallback behavior |
|---|---|---|
| onboarding | deployment-topology.json | Skip cohort-assignment hint; user sets manually in step-04 |
| offboarding | finops-baseline.json | Omit "billing must close" cross-module handoff; flag in step-07 report |
| offboarding | onboarding-flow.json | Emit generic tear-down; no reverse references to provisioning_hook IDs |
| multi-tenant-testing | tier-model.json | Uniform `severity: should-have` for noisy-neighbor category |
| migration | onboarding-flow.json | Generic provisioning at target; no hook-id references |
| migration | offboarding-policy.json | Generic tear-down at source; no policy-id references |

**Cross-skill input read-time validation.** As Section 1.4 6-step procedure.

**Audit-pass posture.** All 4 skill names match spec §5.1 #6/#7/#8/#14 exactly — check (i) dynamic extraction finds them. Step files reference only known `_bmad/<ns>/` prefixes (`_bmad/bbp/`, `_bmad/bam/`, `_bmad/_memory/`, `_bmad-output/`) — check (f) compliant.

**Fragment frontmatter (per spec §6.3):**
```yaml
---
kind: fragment
module: bmad-bam-platform
persona: atlas
last_reviewed: 2026-05-17
---
```

**Anti-pattern frontmatter (per spec §6.5):**
```yaml
---
kind: anti-pattern
module: bmad-bam-platform
persona: atlas
last_reviewed: 2026-05-17
---
```

**SKILL.md description format.** Each carries `name + description` frontmatter (2-3 sentences + `Invoke via /bmad-bam-design-...`); full text in Section 5.

**Pointers.** Field-by-field JSON schemas → Section 3. QG checklist body diffs → Section 4. Template section outlines → Section 5.

### 2.1 `bmad-bam-design-tenant-onboarding` (ZON)

**Purpose.** Design first-touch flows that provision a new tenant with isolation verified before live traffic. Reads tier-model to assign flow type per tier; emits flow declaration plus mandatory isolation-verification-step.

**Manifest (full field set; subsequent skills inherit 2.0 conventions):**
```yaml
name: bmad-bam-design-tenant-onboarding
description: "Design tenant onboarding flows per tier with mandatory isolation-verification step. Invoke via /bmad-bam-design-tenant-onboarding."
module: bmad-bam-platform
persona: atlas
version: 0.1.0
execution_mode: { default: assisted, alternatives: [manual] }
recommended_capabilities: [extended-thinking]
minimum_persona_version: "0.1.0"
latency_budget: "60min"
cluster: lifecycle
inputs:
  - { artifact: tier-model.json,          required: true,  resolver: tool-aware-path-fallback,
      paths_tried: ["{project-root}/docs/architecture/tier-model.json",
                    "{project-root}/_bmad/bam/evidence/QG-F1/tier-model.json"] }
  - { artifact: tenancy-decision.json,    required: true,  resolver: tool-aware-path-fallback, paths_tried: [...] }
  - { artifact: deployment-topology.json, required: false, resolver: tool-aware-path-fallback, paths_tried: [...] }
outputs:
  - { artifact: onboarding-flow.md,                location: "{project-root}/docs/architecture/",        required: true }
  - { artifact: onboarding-flow.json,              location: "{project-root}/_bmad/bam/evidence/QG-M2/", required: true, schema_version: "1.0" }
  - { artifact: QG-M2-onboarding-evidence.md,      location: "{project-root}/_bmad/bam/evidence/QG-M2/", required: true }
gates: [QG-M2]
flags: []
```

**CEV steps:**
| # | step_id | Cache | Purpose | Auto | Gate |
|---|---|---|---|---|---|
| 01 | 01-c-elicit-context | onboarding-context.json | Read 3 inputs + 6-step validation; hybrid resolution (per I4) | false | human-approval |
| 02 | 02-c-load-options | onboarding-options.json | Load 3 flow templates; pre-fill per-tier from `upgrade_mode` | true | machine-checkable |
| 03 | 03-c-decision-matrix | decision-matrix.json | Score per-tier flow against 4 axes | false | human-approval |
| 04 | 04-c-recommendation | recommendation.json | Lock per-tier flow + provisioning-mode + isolation-verification-step | false | human-approval |
| 05 | 05-c-write-design | — | Emit onboarding-flow.md + .json | true | machine-checkable |
| 06 | 06-c-record-adr | — | Inline sidecar ADR | false | human-approval |
| 07 | 07-v-verify-completeness | — | Schema validation; emit QG-M2-onboarding-evidence.md (gate_id: QG-M2) | true | machine-checkable |

**Fragments (5; ≤5 cap):** NEW `tenant-provisioning-patterns.md`, NEW `first-touch-isolation-verification.md`; REUSE `tenant-cohort-design.md`, `feature-gating-patterns.md`, + 1 isolation-specific fragment selected at step-02 (`rls-deep-dive.md` / `schema-per-tenant.md` / `cell-based-architecture.md`).

**Anti-pattern:** `manual-onboarding-bottleneck.md` (cited in step-01).

### 2.2 `bmad-bam-design-tenant-offboarding` (ZOF)

**Purpose.** Design subject-erasure, data-export, retention, and tear-down flows per regulatory profile. Honors retention floors; emits GDPR Art 20 export before Art 17 deletion.

**Manifest excerpt:**
```yaml
name: bmad-bam-design-tenant-offboarding
description: "Design tenant offboarding: GDPR Art 17 erasure, Art 20 export, regulatory retention floors. Invoke via /bmad-bam-design-tenant-offboarding."
latency_budget: "75min"
cluster: lifecycle
inputs:
  - { artifact: tier-model.json,         required: true,  ... }   # schema 1.0 OR 1.1 (auto-fill)
  - { artifact: tenancy-decision.json,   required: true,  ... }
  - { artifact: finops-baseline.json,    required: false, ... }
  - { artifact: onboarding-flow.json,    required: false, ... }   # symmetric tear-down
outputs:
  - { artifact: offboarding-policy.md,                location: "{project-root}/docs/architecture/",        required: true }
  - { artifact: offboarding-policy.json,              location: "{project-root}/_bmad/bam/evidence/QG-M2/", required: true, schema_version: "1.0" }
  - { artifact: QG-M2-offboarding-evidence.md,        location: "{project-root}/_bmad/bam/evidence/QG-M2/", required: true }
gates: [QG-M2]
flags:
  - { name: --regulatory-profile, type: enum,
      values: [gdpr_baseline, hipaa, sox_or_pci, none], default: gdpr_baseline }
```

**Hybrid tenancy handling (per I4):** step-02 reads `hybrid_resolution`; emits per-tier mechanism-aware `tear_down_hooks[]` (RLS row delete vs schema drop vs cell teardown). `cross_module_handoffs[]` are tenancy-model-agnostic.

**Soft consumption of onboarding-flow.json:** offboarding step-02 reads `flows[*].tier_id`, `flows[*].provisioning_hooks[]` (reverse into `cross_module_handoffs[]`), `flows[*].isolation_verification_step` (reverse-verify post-deletion). All optional.

**CEV steps:**
| # | Purpose |
|---|---|
| 01 | Read inputs (auto-fill retention from tier-model 1.0); honor `--regulatory-profile`; elicit legal holds + handoffs |
| 02 | Load 3 deletion modes (hard / soft / anonymize); pre-fill from profile preset |
| 03 | Decision matrix: regulatory-conformance × data-integrity × reversibility × cost |
| 04 | Lock per-tier mode + retention + erasure fast-path + handoffs |
| 05 | Emit offboarding-policy.md + .json |
| 06 | Inline sidecar ADR |
| 07 | Schema + `data_export_required==true` + `subject_erasure_fast_path==true` + retention ≥ floor; emit QG-M2-offboarding-evidence.md |

**Fragments (5):** NEW `gdpr-right-to-deletion.md`, NEW `data-export-portability.md`, NEW `tenant-anonymization-techniques.md`, NEW `legal-hold-and-retention-windows.md`; REUSE `anti-corruption-layer.md`.

**Anti-pattern:** `delete-without-export.md`.

### 2.3 `bmad-bam-design-multi-tenant-testing` (ZMT)

**Purpose.** Generate per-isolation-model test catalogue (specs, not code) covering isolation, noisy-neighbor, quota, RLS-bypass. Output feeds QG-M2 H1 + sharpens C1/C5.

**Manifest excerpt:**
```yaml
name: bmad-bam-design-multi-tenant-testing
description: "Generate per-isolation-model test catalogue: isolation, noisy-neighbor, quota, RLS-bypass specs. Invoke via /bmad-bam-design-multi-tenant-testing."
latency_budget: "60min"
cluster: lifecycle
inputs:
  - { artifact: tenancy-decision.json, required: true,  ... }
  - { artifact: tier-model.json,       required: false, ... }
outputs:
  - { artifact: test-catalogue.md,                      location: "docs/architecture/",        required: true }
  - { artifact: test-catalogue.json,                    location: "_bmad/bam/evidence/QG-M2/", required: true, schema_version: "1.0" }
  - { artifact: QG-M2-test-catalogue-evidence.md,       location: "_bmad/bam/evidence/QG-M2/", required: true }
gates: [QG-M2]
flags: []
```

**Customize-template overlay (1 — per I1 R3.2.6 finding; bmad-design-test-strategy deferred):**
- `customize-template/bmad-qa-generate-e2e-tests/customize.toml` — `[workflow]` namespace (C1 corrected); specific-path persistent_facts (G8); pinned to BMM v6.6.0 (I2)

**Hybrid tenancy handling.** Step-02 resolves per-tier mechanism map from `hybrid_resolution`; emits union of model-specific tests.

**CEV steps:**
| # | Purpose |
|---|---|
| 01 | Read tenancy + (soft) tier; confirm isolation_model; if hybrid, resolve per-tier mechanism map |
| 02 | Load test class library (universal + per-model); each entry has id/applies_to/category/severity/universal/evidence_signature/traceable_to |
| 03 | Coverage tradeoffs: depth-vs-breadth × severity bands × must-have ratio |
| 04 | Lock scope: must-have / deferred / excluded with rationale |
| 05 | Emit test-catalogue.md + .json |
| 06 | Inline sidecar ADR |
| 07 | Schema; ≥1 universal isolation test; cross-refs valid; emit QG-M2-test-catalogue-evidence.md |

**Fragments (5):** NEW `rls-bypass-test-design.md`, NEW `noisy-neighbor-detection.md`, NEW `isolation-test-evidence-signatures.md`; REUSE `tenant-isolation-testing-patterns.md` (refresh `last_reviewed: 2026-05-17` + add cross-refs to test-catalogue schema), REUSE `rls-deep-dive.md`.

**Anti-pattern:** `no-rls-bypass-test.md`.

### 2.4 `bmad-bam-design-tenant-migration-tooling` (ZTG)

**Purpose.** Design tenant migration playbooks across two axes — tier-upgrade (billing-prorate, feature-flip, schema/data migration) and region-migration (data-residency, cross-DC blue-green, DNS cutover). Single skill, axis selected via flag.

**Manifest excerpt:**
```yaml
name: bmad-bam-design-tenant-migration-tooling
description: "Design tenant migration playbooks: tier upgrades + region migrations; one skill, axis-flagged. Invoke via /bmad-bam-design-tenant-migration-tooling."
latency_budget: "90min"
cluster: lifecycle
inputs:
  - { artifact: tier-model.json,           required: true,  ... }
  - { artifact: deployment-topology.json,  required: true,  ... }
  - { artifact: tenancy-decision.json,     required: true,  ... }
  - { artifact: onboarding-flow.json,      required: false, ... }
  - { artifact: offboarding-policy.json,   required: false, ... }
outputs:
  - { artifact: migration-runbook.md,                          location: "docs/architecture/",        required: true }
  - { artifact: migration-runbook.json,                        location: "_bmad/bam/evidence/QG-D1/", required: true, schema_version: "1.0" }
  - { artifact: migration-runbook.json,                        location: "_bmad/bam/evidence/QG-M2/", required: true, schema_version: "1.0" }   # mirror (H4 partial proxy)
  - { artifact: QG-D1-migration-evidence.md,                   location: "_bmad/bam/evidence/QG-D1/", required: true }
  - { artifact: QG-M2-migration-evidence-mirror.md,            location: "_bmad/bam/evidence/QG-M2/", required: true }
gates: [QG-D1, QG-M2]
flags:
  - { name: --migration-axis, type: enum, values: [tier, region, both], default: both }
```

**CEV steps:**
| # | Purpose |
|---|---|
| 01 | Read 3 req + 2 soft; honor `--migration-axis`; elicit zero-downtime + abort gates + observability |
| 02 | Per active axis, load playbook templates |
| 03 | Per axis: cohort strategy × rollback approach × dry-run cadence |
| 04 | Lock per-axis playbook |
| 05 | Emit migration-runbook.md + .json (3 locations: docs + QG-D1 + QG-M2 mirror) |
| 06 | Inline sidecar ADR |
| 07 | Schema; cohort_plan + rollback_gate + dry_run_plan per axis; emit QG-D1 + QG-M2 mirror evidence narratives |

**Fragments (5):** NEW `tenant-tier-upgrade-mechanics.md`, NEW `region-migration-playbook.md`, NEW `migration-cohort-selection.md`, NEW `migration-rollback-and-abort.md`; REUSE `zero-downtime-migrations.md`.

**Anti-pattern:** `tier-upgrade-without-billing-prorate.md`.

### 2.5 Per-skill smoke-tests

Each skill ships `tests/smoke-test.sh` mirroring P3.1 pattern (11 checks). Skill-specific assertions added per Section 5.6.1.

---

## 3. JSON contracts

### 3.0 Schema conventions

**Top-level required fields on every output:**
- `schema_version: string` — MAJOR.MINOR semver. MUST be a string; non-string types (e.g., TOML/JSON parsing `1.0` as float) → warn + coerce via `str()` at read time (E1).
- `decided_at: string` — RFC 3339: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$`

(P3.1's `workflow_run_id` lives in `.md` template only, not in `.json`. `tenancy_model` is NOT denormalized; consumers read it from `tenancy-decision.json` directly.)

**Type conventions:**
- `module` fields use pattern: `^[a-z][a-z0-9_]*$` (not closed enum). Typical: `platform`, `billing`, `ai_memory`, `audit_trail`, `trust`, `legal`, `ux`, `ops`.
- `tenancy_model` enum (kebab-case): `{"row-level-security", "schema-per-tenant", "cell-based", "hybrid"}`
- `tier_id` naming: 5-default `free`/`starter`/`pro`/`business`/`enterprise`; custom-mode `^[a-z][a-z0-9_-]*$`

**Forward-compat:** consumers SHOULD ignore unknown top-level fields; SHOULD warn on unknown enum values; MUST fail on missing known-required fields.

**Serialization:** 2-space indent, trailing newline, UTF-8 (no BOM). Top-level keys not strictly ordered.

**Validator implementation:** Python 3.11+ stdlib only (`json`, `re`); no `jsonschema` dependency. Formal `.schema.json` artifacts deferred to P3.3+.

### 3.1 `tier-model.json` schema 1.0 → 1.1

**Additive field:** `retention_window_days_hint: integer [0, 36500]` per tier.

```diff
 {
-  "schema_version": "1.0",
+  "schema_version": "1.1",
   "tiers": [
     {
       "id": "free",
       "rollout_tier_hint": "aggressive_canary",
       "cost_ceiling_usd_per_month_hint": 0.50,
+      "retention_window_days_hint": 7,
       "upgrade_mode": "self_service",
       "upgrade_path": "starter"
     }
   ]
 }
```

**Per-tier defaults (5-tier preset):**
| tier_id | retention_window_days_hint |
|---|---|
| free | 7 |
| starter | 30 |
| pro | 30 |
| business | 90 |
| enterprise | 365 |

**Validation at step-07-v of tier-model skill:**
- `retention_window_days_hint: int [0, 36500]`
- 5-default mode → emit defaults table
- Custom mode → field REQUIRED on every tier; hard-fail if absent

**Read-time auto-fill:**
- `schema_version == "1.0"` AND default tier_id → fill from preset
- `schema_version == "1.0"` AND custom tier_id → fail-fast exit 70
- `schema_version == "1.1"` → read explicit
- Unknown major → warn + proceed

**Retention hint-vs-floor cross-rule:**
```
final_retention_days = max(tier_hint, regulatory_floor[profile])
retention_window_source =
    "regulatory_floor" if floor > hint
    else "legal_hold"  if active legal hold matches tenant scope
    else "overridden"  if user explicit override
    else "tier_hint"
```

### 3.2 `onboarding-flow.json` schema 1.0

```json
{
  "schema_version": "1.0",
  "decided_at": "2026-05-17T14:23:00Z",
  "flow_count": 5,
  "defaults_source": {
    "tier_model_ref": "_bmad/bam/evidence/QG-F1/tier-model.json",
    "tier_model_schema_version": "1.1"
  },
  "flows": [
    {
      "tier_id": "free",
      "flow_type": "self_serve",
      "live_traffic": true,
      "provisioning_mode": "auto",
      "isolation_verification_step": {
        "step_name": "verify-tenant-isolation-postprovision",
        "test_artifact": "cross-tenant query against tenant_id=new_id returns zero rows",
        "blocking": true,
        "blocking_rationale": "no live traffic until isolation verified"
      },
      "provisioning_hooks": [
        { "id": "db_create",              "module": "platform", "blocking": true  },
        { "id": "stripe_customer_create", "module": "billing",  "blocking": false }
      ]
    }
  ]
}
```

**Field rules:**
- `flow_type ∈ {"self_serve", "assisted_signup", "sales_led"}` (closed)
- `live_traffic: boolean` (default `true`); demo/sandbox flows opt out
- `provisioning_mode ∈ {"auto", "scripted", "manual"}` (closed)
- `isolation_verification_step.test_artifact` length ≥ 10; `step_name` length ≥ 5
- `provisioning_hooks[*].id` globally unique within file
- `provisioning_hooks[*].module` matches `^[a-z][a-z0-9_]*$`
- `provisioning_hooks: []` → WARN

**Validation at step-07-v:**
- `flow_count == len(flows)`
- Every `tier_id` in upstream tier-model
- Every flow with `live_traffic: true` has `isolation_verification_step.blocking: true`
- `provisioning_hooks[*].id` uniqueness
- Custom tier_id → hard-fail if no explicit `flow_type`

### 3.3 `offboarding-policy.json` schema 1.0

```json
{
  "schema_version": "1.0",
  "decided_at": "2026-05-17T14:23:00Z",
  "regulatory_profile": "gdpr_baseline",
  "data_export_required": true,
  "subject_erasure_fast_path": true,
  "per_tier": [
    {
      "policy_id": "free:soft_delete",
      "tier_id": "free",
      "deletion_mode": "soft_delete",
      "retention_window_days": 7,
      "retention_window_source": "tier_hint",
      "post_retention_action": "hard_delete"
    }
  ],
  "legal_holds": [],
  "tear_down_hooks": [
    { "id": "db_drop_or_anonymize",     "module": "platform",    "blocking": true,  "deletion_modes": ["hard_delete", "anonymize"] },
    { "id": "stripe_customer_close",    "module": "billing",     "blocking": true,  "deletion_modes": ["hard_delete", "soft_delete", "anonymize"] }
  ],
  "cross_module_handoffs": [
    { "module": "billing", "action": "close_open_invoices", "blocking": true,  "ordering": 1 }
  ],
  "onboarding_hooks_reversed": {
    "source_ref": "_bmad/bam/evidence/QG-M2/onboarding-flow.json",
    "reverse_map": [
      { "provisioning_hook_id": "db_create", "tear_down_hook_id": "db_drop_or_anonymize" }
    ]
  }
}
```

**Field rules:**
- `regulatory_profile ∈ {"gdpr_baseline", "hipaa", "sox_or_pci", "none"}` (closed)
- `deletion_mode ∈ {"hard_delete", "soft_delete", "anonymize"}` (closed)
- `retention_window_source ∈ {"tier_hint", "overridden", "regulatory_floor", "legal_hold"}` (closed; `legal_hold` added per round-3 A4)
- `post_retention_action ∈ {"hard_delete", "anonymize", "noop"}` (closed)
- `policy_id` formed as `<tier_id>:<deletion_mode>` (unique within file)
- `tear_down_hooks[*].id` globally unique within file
- `retention_window_days: int [0, 36500]`
- `cross_module_handoffs[*].ordering: int ≥ 1`, unique & dense
- `legal_holds: []` → VALID; `cross_module_handoffs: []` → WARN; `tear_down_hooks: []` → WARN

**Validation at step-07-v:**
- `data_export_required: true` MANDATORY (GDPR Art 20) — exit 70 if false
- `subject_erasure_fast_path: true` MANDATORY (GDPR Art 17) — exit 70 if false
- Per regulatory profile, min retention floor enforced:
  - `gdpr_baseline`: ≥ 0
  - `hipaa`: ≥ 2190 (6y)
  - `sox_or_pci`: ≥ 2555 (7y)
  - `none`: no floor
- When `legal_holds[].scope` matches tenant, `retention_window_source: legal_hold` AND effective retention infinite until release
- `reverse_map[*].provisioning_hook_id` cross-refs upstream onboarding-flow when present
- `reverse_map[*].tear_down_hook_id` cross-refs local `tear_down_hooks[*].id`
- Custom tier_id → hard-fail if no explicit `deletion_mode`

### 3.4 `test-catalogue.json` schema 1.0

```json
{
  "schema_version": "1.0",
  "decided_at": "2026-05-17T14:23:00Z",
  "hybrid_resolution": {
    "free": "row-level-security",
    "enterprise": "cell-based"
  },
  "coverage_report": {
    "isolation":           { "must_have": 8, "should_have": 4, "nice_to_have": 2 },
    "noisy-neighbor":      { "must_have": 3, "should_have": 5, "nice_to_have": 1 },
    "quota":               { "must_have": 4, "should_have": 2, "nice_to_have": 0 },
    "rls-bypass":          { "must_have": 5, "should_have": 1, "nice_to_have": 0 },
    "cross-tenant-cache":  { "must_have": 0, "should_have": 2, "nice_to_have": 1, "note": "Deferred to P5 ai" }
  },
  "tests": [
    {
      "id": "ISO-001",
      "name": "tenant-context-propagation-across-async-boundary",
      "applies_to": ["row-level-security", "schema-per-tenant", "cell-based"],
      "universal": true,
      "category": "isolation",
      "severity": "must-have",
      "evidence_signature": "structured-log entry with tenant_id at every async resume point",
      "traceable_to": ["QG-M2.C5"]
    }
  ]
}
```

**Field rules:**
- `hybrid_resolution` present iff project tenancy_model == "hybrid"
- `tests[*].id` unique within `tests[]`
- `tests[*].name` length ≥ 5; `evidence_signature` length ≥ 20
- `universal: boolean` (default false). When `universal: true`, `applies_to[]` is informational only; when false, it's the binding selector.
- `applies_to[*] ∈ {"row-level-security", "schema-per-tenant", "cell-based"}` (no nested "hybrid")
- `category ∈ {"isolation", "noisy-neighbor", "quota", "rls-bypass", "cross-tenant-cache"}` (closed)
- `severity ∈ {"must-have", "should-have", "nice-to-have"}` (closed)
- `traceable_to[*]` matches `^QG-[A-Z]+\d+\.[CH]\d+$`; forward-refs → WARN
- `tests: []` → ERROR

**Validation at step-07-v:**
- If hybrid: `hybrid_resolution` maps EVERY tier_id from tier-model (missing → ERROR)
- ≥1 entry with `category: isolation` AND `universal: true`
- Every must-have entry has `evidence_signature` length ≥ 20
- `coverage_report` counts match `tests[]` filtered by category × severity

### 3.5 `migration-runbook.json` schema 1.0

```json
{
  "schema_version": "1.0",
  "decided_at": "2026-05-17T14:23:00Z",
  "migration_axes": ["tier", "region"],
  "zero_downtime_required": true,
  "per_axis": {
    "tier": {
      "cohort_plan": { "cohort_selection_method": "rollout_tier_hint_driven", "cohorts": [...] },
      "dry_run_plan": { "dry_run_environment": "canary_tenant", "cadence": "each_cohort" },
      "rollback_gate": { "rollback_trigger": [...], "rollback_method": "canary_revert" },
      "abort_criteria": [...],
      "observability_hooks": [...]
    },
    "region": { ... }
  },
  "references": {
    "onboarding_hook_ids": ["db_create"],
    "offboarding_policy_ids": ["starter:soft_delete"]
  },
  "references_degraded": false
}
```

**Field rules:**
- `migration_axes ⊆ ["tier", "region"]`; valid: `["tier"]`, `["region"]`, `["tier","region"]`; empty `[]` → ERROR
- `per_axis` keys match `migration_axes` exactly
- `cohort_selection_method ∈ {"rollout_tier_hint_driven", "risk_stratified", "explicit"}`
- `dry_run_environment ∈ {"staging", "canary_tenant", "shadow"}`
- `cadence ∈ {"each_cohort", "once_pre_rollout"}`
- `rollback_method ∈ {"blue_green_flip", "canary_revert", "cell_failback", "dual_write_revert"}`
- `cohorts: []` → ERROR; `abort_criteria: []` / `observability_hooks: []` → WARN

**Validation at step-07-v:**
- `migration_axes` non-empty; matches flag value
- Each axis has all 5 sub-fields (cohort_plan + dry_run_plan + rollback_gate + abort_criteria + observability_hooks)
- `zero_downtime_required: true` ⇒ `rollback_method != "cell_failback"`
- `references.onboarding_hook_ids[]` cross-refs upstream when soft-input present
- `references.offboarding_policy_ids[]` cross-refs upstream when soft-input present
- `references_degraded: true` iff a soft input was malformed (parse-failed)

### 3.6 Cross-schema invariants

Cross-references validated at CONSUMER's step-07-v (producer can't see consumer's contract).

| # | Invariant | Verified at |
|---|---|---|
| 1 | `flows[*].tier_id` ⊆ tier-model `tiers[*].id` | onboarding step-07-v |
| 2 | `per_tier[*].tier_id` ⊆ tier-model `tiers[*].id` | offboarding step-07-v |
| 3 | `retention_window_days ≥ floor[regulatory_profile]` | offboarding step-07-v |
| 4 | `migration_axes ⊆ {"tier","region"}` and `per_axis` keys match | migration step-07-v |
| 5 | `hybrid_resolution` keys ⊇ tier-model `tiers[*].id` when hybrid | testing step-07-v |
| 6 | `cross_module_handoffs[*].ordering` unique & dense | offboarding step-07-v |
| 7 | `provisioning_hooks[*].id` globally unique | onboarding step-07-v |
| 8 | `tear_down_hooks[*].id` globally unique | offboarding step-07-v |
| 9 | `policy_id` matches `<tier_id>:<deletion_mode>` and unique | offboarding step-07-v |
| 10 | `references.onboarding_hook_ids[*]` ⊆ upstream when present | migration step-07-v |
| 11 | `references.offboarding_policy_ids[*]` ⊆ upstream when present | migration step-07-v |
| 12 | `zero_downtime_required: true` ⇒ no axis uses `cell_failback` | migration step-07-v |
| 13 | `live_traffic: true` ⇒ `isolation_verification_step.blocking: true` | onboarding step-07-v |
| 14 | ≥1 test with `category: isolation` AND `universal: true` | testing step-07-v |

### 3.7 Fixture files (10 — Section 5.6.3)

`tests/fixtures/p3-2/`:
- `<output>.min.json` + `<output>.path.json` for each of 4 schemas (8 files)
- `tier-model.1.0.json` (legacy 5-default; auto-fill expected)
- `tier-model.1.0.custom.json` (custom mode 1.0; expected exit-70)

3 advanced fixtures deferred to v0.2.0: HIPAA floor, hybrid + 5-tier mapping, references_degraded scenario.

---

## 4. Quality gate operations

### 4.0 Summary + conventions

| Gate | Operation | Before | After | Auto/Human |
|---|---|---|---|---|
| **QG-M2** Tenant Isolation | Refine | active, blocking, v1.0.0 | active, blocking, v1.1.0 | 50/50 → 60/40 |
| **QG-M1** Module Architecture | Promote | partial/partial, v0.1.0 | active, blocking, v1.0.0 | 100/0 → 60/40 |
| **QG-D1** Disaster Recovery | Create-partial | does not exist | partial/partial, v0.1.0 | 100/0 |

**Frontmatter convention:**
- `criticality ∈ {blocking, advisory, partial}` — failure consequence
- `status ∈ {active, partial, deprecated}` — design maturity

**Scope clarification.** P3.2 ships checklist definitions; automated gate-runner = P11.2 scope.

**QG version-pinning policy.** Projects on QG-M2 v1.0.0 may stay until 2026-Q3; new projects MUST use v1.1.0; legacy form removed after 2026-Q3.

**ADR-016 records all three operations.**

### 4.1 QG-M2 — Tenant Isolation (refine to v1.1.0)

**Frontmatter delta:**
```diff
 id: QG-M2
 criticality: blocking
 evidence-depends-on:
+  - QG-F1/tenancy-decision.json
+  - QG-F1/module-decomposition.json
+  - QG-M2/onboarding-flow.json
+  - QG-M2/offboarding-policy.json
+  - QG-M2/test-catalogue.json
+  - QG-M2/migration-runbook.json   # mirror; partial proxy for H4
-auto-checkable: 50
-human-review: 50
+auto-checkable: 60
+human-review: 40
+last_reviewed: 2026-05-17
+version: 1.1.0
```

**Pre-criterion C0:** All 4 P3.2 evidence files exist at `_bmad/bam/evidence/QG-M2/`. If absent, refuse to score.

**Automatable (60%; 6 criteria):**
- **C1** (refined; backwards-compat) — `test-catalogue.json` at QG-M2/ (preferred) AND `coverage_report.isolation.must_have ≥ 1` AND `coverage_report.rls-bypass.must_have ≥ 1`. Legacy form accepted until 2026-Q3 with `decision.md` annotation.
- **C2** RLS policies (if RLS chosen) — unchanged
- **C3** Schema isolation (if schema-per-tenant) — unchanged
- **C4** Cell-routing (if cell-based) — unchanged
- **C5** (refined) — `test-catalogue.json` has ≥1 entry with `category: isolation` AND `universal: true`
- **C6** (PROMOTED from H5) — Every flow in `onboarding-flow.json` where `live_traffic == true` has `isolation_verification_step.blocking == true`

**Human-review (40%; 4 criteria):**
- **H1** Threat model (refined evidence — `test-catalogue.json` with enumerated attack vectors)
- **H2** Onboarding/offboarding preserves isolation (refined — `onboarding-flow.json` + `offboarding-policy.json` + `reverse_map`)
- **H3** Noisy-neighbor mitigation (unchanged; partial proxy via test-catalogue; full evidence pending P3.3)
- **H4** DR preserves isolation (refined temporal contract):
  - Until P10 ships: `migration-runbook.json` mirror at QG-M2/ IS H4 evidence
  - After P10 ships AND `design-disaster-recovery` runs: DR output supersedes; migration-runbook becomes supporting evidence
  - Reviewer sign-off required in both states

**(H5 promoted to C6; removed from H-section.)**

**CRITICAL:** C2/C3/C4 (whichever applies) + **C6** (non-waivable; if non-live tiers skip, mark `live_traffic: false`) + H1.

**Hybrid-model:** for `tenancy_model: "hybrid"`, all applicable mechanisms must pass.

**Waiver carryover:** v1.0.0 waivers valid for v1.1.0 if ID + semantics unchanged. C1+C5 refined → re-waiver if previously waived. H5→C6 promotion → re-waiver.

**How to evaluate (manual; until P11.2):**
1. Verify C0 prerequisites
2. Run Python validation per C1-C6 criterion
3. Reviewer signs H1/H2/H3/H4 with rationale
4. Apply CRITICAL constraint (no waiver)
5. Apply waiver path for non-CRITICAL only via `waive-gate`
6. Record decision in `_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/decision.md`

### 4.2 QG-M1 — Module Architecture (promote to v1.0.0)

**Frontmatter delta:**
```diff
-criticality: partial
+criticality: blocking
 evidence-depends-on:
+  - QG-M2/onboarding-flow.json
+  - QG-M2/offboarding-policy.json
+  - QG-M2/test-catalogue.json
+  - QG-D1/migration-runbook.json
-auto-checkable: 100
-human-review: 0
+auto-checkable: 60
+human-review: 40
-version: 0.1.0
+version: 1.0.0
-status: partial
+status: active
```

**version_rationale:** Major bump because partial→blocking changes downstream resolution (QG-M2's `depends-on: [QG-M1]` resolves differently). ADR-016 captures.

**Pre-criterion C0:** All 4 P3.2 evidence files exist. If absent, refuse to score.

**Automatable (60%):** C1-C5 unchanged from v0.1.0.

**Human-review (40%):**
- **H1** (NEW) — Module boundaries support tenant lifecycle workflows. No lifecycle hook crosses 3+ unique modules without explicit ports/adapters declaration (2 is unavoidable for any cross-context; 3+ implies fan-out warranting ACL/port pattern). Evidence: 4 P3.2 outputs + module-decomposition.md + reviewer.
- **H2** (NEW; complementary to QG-F1 H2 — F1 H2 checks WHO has tenant context, M1 H2 checks HOW boundaries are insulated via ACL pattern) — ACL placement at billing↔platform, ai_memory↔platform, audit_trail↔platform.
- **H3** (NEW; brownfield-only) — Refactor-cost trade-off reviewed. Greenfield: `n/a` (not a fail).

**CRITICAL:** C1-C5 + **H1** (brownfield-waiver allowed via `waive-gate` with compensating control = "documented refactor plan with deadline ≤ 90 days").

### 4.3 QG-D1 — Disaster Recovery (create partial, v0.1.0)

**New file:** `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-D1.md`

```yaml
---
id: QG-D1
title: Disaster Recovery (partial)
module: bmad-bam-platform
phase: solutioning
criticality: partial
depends-on: [QG-F1, QG-M2]
evidence-depends-on:
  - QG-D1/migration-runbook.json
auto-checkable: 100
human-review: 0
last_reviewed: 2026-05-17
version: 0.1.0
status: partial
note: "Auto-criteria only; H-criteria deferred to P10 ops. Migration-runbook.json provides partial proxy. Catalog: spec §8.1; evidence storage: spec §8.4."
---
```

**Pre-criterion C0:** `migration-runbook.json` exists. If absent: refuse to score.

**Automatable (100%; 5 criteria):**
- **C1** Files present at both locations
- **C2** Schema valid (schema_version + migration_axes non-empty + per_axis keys match)
- **C3** Each active axis has rollback_gate + abort_criteria
- **C4** zero_downtime_required boolean; if true, no axis uses cell_failback
- **C5** References consistency (degraded flag matches input availability)

**Human-review (0% in v0.1.0):** Deferred to P10 (5 H's: RPO/RTO, failover drills, multi-region replication, backup integrity, region-failure runbook).

**Pass conditions (v0.1.0 partial):** ALL C0+C1-C5 pass. No waivers.

### 4.4 Cross-gate dependency graph (post-P3.2)

```
                    QG-F1 (blocking, active, v1.0.0)
                    ▲      ▲      ▲
        QG-M1 ──────┘      │      └────── QG-D1 (partial, partial, v0.1.0)
       (blocking,           │              ▲
        active,             │              │
        v1.0.0)             │              │
            ▲               │              │
            └────────────── QG-M2 (blocking, active, v1.1.0)
                            (P3.3 closes H3; P10 closes H4 fully; P9 adds QG-C1)
```

### 4.5 Evidence-flow summary

Evidence file location reflects PRIMARY gate; secondary consumption declared via that gate's `evidence-depends-on:`.

| Output | Primary gate | Mirror | Secondary |
|---|---|---|---|
| `onboarding-flow.json` + `QG-M2-onboarding-evidence.md` | QG-M2 | — | QG-M1 H1 |
| `offboarding-policy.json` + `QG-M2-offboarding-evidence.md` | QG-M2 | — | QG-M1 H1+H2 |
| `test-catalogue.json` + `QG-M2-test-catalogue-evidence.md` | QG-M2 | — | QG-M1 H1 |
| `migration-runbook.json` + `QG-D1-migration-evidence.md` + `QG-M2-migration-evidence-mirror.md` | QG-D1 | QG-M2 (H4 partial proxy) | QG-M1 H1 |

---

## 5. Content additions + ADR + testing + mechanics

### 5.1 Fragments (13 new + 5 reused)

**Location:** `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/`

**Target length:** 400-600 lines per spec §6.3 (existing P3.1 fragments span 200-565 lines, median ~300; P3.2 targets spec compliance).

**Body structure (spec §6.3):** When to Use / When NOT to Use / Architecture / Trade-offs / Implementation Patterns / Quality Checks (with `**CRITICAL:**` item) / Web Research Queries (with `{date}` placeholder) / Cross-references.

Implementation Patterns section is structurally lighter for regulatory fragments (~50-80 lines) than infrastructure fragments (~150-200 lines).

#### 5.1.1 New fragments (13)

| # | Filename | Consumer | Focus | Target lines |
|---|---|---|---|---|
| 1 | `tenant-provisioning-patterns.md` | onboarding | DB/schema/cell creation; idempotent provisioning; saga vs sync | 500 |
| 2 | `first-touch-isolation-verification.md` | onboarding | Cross-tenant probe; pre-traffic gate; live_traffic semantics | 400 |
| 3 | `gdpr-right-to-deletion.md` | offboarding | Art 17 mechanics; subject-erasure fast-path; floor reconciliation | 550 |
| 4 | `data-export-portability.md` | offboarding | Art 20 export; structured formats; completeness verification | 500 |
| 5 | `tenant-anonymization-techniques.md` | offboarding | Pseudonymization vs anonymization; k-anonymity; retention compat | 550 |
| 6 | `legal-hold-and-retention-windows.md` | offboarding | Regulatory floor matrix (HIPAA 6y, SOX 7y, PCI 1y); hold release | 450 |
| 7 | `rls-bypass-test-design.md` | multi-tenant-testing | SECURITY DEFINER escape; function escalation; role elevation | 500 |
| 8 | `noisy-neighbor-detection.md` | multi-tenant-testing | Quota-exhaustion; fair-scheduling; per-tier SLA breach detection | 500 |
| 9 | `isolation-test-evidence-signatures.md` | multi-tenant-testing | Log/metric signatures; assertion patterns; CI canonicalization | 400 |
| 10 | `tenant-tier-upgrade-mechanics.md` | migration | Cohort selection; billing prorate; feature-flip; schema migration | 550 |
| 11 | `region-migration-playbook.md` | migration | DNS cutover; dual-write; cross-DC blue-green; residency cohort | 600 |
| 12 | `migration-cohort-selection.md` | migration | Risk-stratified cohort; canary identification; size heuristics | 400 |
| 13 | `migration-rollback-and-abort.md` | migration | Rollback gates; abort criteria; idempotent runs; observability | 500 |

#### 5.1.2 CRITICAL one-liners per fragment

| Fragment | CRITICAL |
|---|---|
| tenant-provisioning-patterns | Provisioning MUST be idempotent; repeated calls produce same state without duplicating side-effects. |
| first-touch-isolation-verification | Isolation-verification MUST run before first live-traffic request; failure → tenant MUST NOT be enabled. |
| gdpr-right-to-deletion | Subject erasure MUST be honored within regulatory window even when in-flight retention timers exist. |
| data-export-portability | Export MUST emit BEFORE deletion/anonymization; without export, Art 17 deletion violates Art 20. |
| tenant-anonymization-techniques | Anonymization MUST be irreversible by construction; reversibility → treat as pseudonymized (still GDPR-subject). |
| legal-hold-and-retention-windows | Legal hold MUST override deletion regardless of tier policy; release requires legal-team sign-off. |
| rls-bypass-test-design | Every SECURITY DEFINER function reading tenant-scoped tables MUST be tested for tenant-context propagation. |
| noisy-neighbor-detection | Per-tier SLA MUST be tested under worst-case lower-tier abuse; enterprise SLA breach is non-negotiable. |
| isolation-test-evidence-signatures | Evidence signature MUST be machine-parseable; human-narrative alone is not gate-evidence. |
| tenant-tier-upgrade-mechanics | Billing MUST be prorated at upgrade timestamp; full-price-from-day-N is the anti-pattern. |
| region-migration-playbook | Region migration MUST obtain consent BEFORE any data movement crossing residency boundaries (GDPR/Schrems II). |
| migration-cohort-selection | Risk-stratified cohorts MUST start with 1-tenant canary before expanding to ≥10-tenant cohorts. |
| migration-rollback-and-abort | Migration MUST be aborted if rollback_trigger fires; partial completions MUST roll back, not patch forward. |

#### 5.1.3 Fragment cross-reference mini-map

```
gdpr-right-to-deletion ──────────┬──────► data-export-portability       (export-before-delete)
                                  ├──────► legal-hold-and-retention-windows   (floor compat)
                                  └──────► tenant-anonymization-techniques    (anonymize-as-alternative)

data-export-portability ─────────┬──────► tenant-anonymization-techniques (export-then-anonymize)
                                  └──────► legal-hold-and-retention-windows  (hold blocks export+delete)

first-touch-isolation-verification ──────► tenant-provisioning-patterns   (verification inside saga)

rls-bypass-test-design ──────────┬──────► isolation-test-evidence-signatures (canonicalization)
                                  └──────► noisy-neighbor-detection           (quota-abuse overlap)

migration-cohort-selection ──────┬──────► migration-rollback-and-abort       (cohort abort triggers)
                                  └──────► tenant-tier-upgrade-mechanics      (tier-cohort selection)

region-migration-playbook ────────────────► migration-rollback-and-abort    (DNS rollback)
```

#### 5.1.4 Reused fragments (5)

| Fragment | Consumer | Action |
|---|---|---|
| `tenant-cohort-design.md` | onboarding | Referenced |
| `feature-gating-patterns.md` | onboarding | Referenced |
| `rls-deep-dive.md` / `schema-per-tenant.md` / `cell-based-architecture.md` | onboarding (1-of-3 by isolation) + multi-tenant-testing reuses `rls-deep-dive.md` | Referenced |
| `anti-corruption-layer.md` | offboarding | Referenced |
| `tenant-isolation-testing-patterns.md` | multi-tenant-testing | **Refresh `last_reviewed: 2026-05-17`** + add cross-refs to test-catalogue schema |
| `zero-downtime-migrations.md` | migration | Referenced |

Atlas fragments grow **24 → 37**.

#### 5.1.5 Fragment ↔ glossary cross-references

Each fragment's Cross-references section cites glossary terms it uses (kebab-case strings; consult CSV for definitions). Notable:
- `gdpr-right-to-deletion.md` → right-to-deletion, retention-floor, data-portability, anonymization
- `data-export-portability.md` → data-portability, right-to-deletion
- `tenant-anonymization-techniques.md` → anonymization, right-to-deletion
- `legal-hold-and-retention-windows.md` → retention-floor, right-to-deletion
- `rls-bypass-test-design.md` → rls-bypass
- `noisy-neighbor-detection.md` → noisy-neighbor
- `first-touch-isolation-verification.md` → isolation-verification-step

### 5.2 Anti-patterns (4 new)

**Location:** `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/anti-patterns/`

**Body structure (per spec §6.5):** Summary / Symptoms / Root causes / Why harmful / Remediation (with fragment refs) / When acceptable / Cross-references. Target 80-150 lines.

| # | Filename | Consumer | One-line |
|---|---|---|---|
| 1 | `manual-onboarding-bottleneck.md` | onboarding | Human-in-loop for tiers that should self-serve; throttles growth |
| 2 | `delete-without-export.md` | offboarding | Subject erasure skips Art 20 portability emit; regulatory + trust bug |
| 3 | `no-rls-bypass-test.md` | multi-tenant-testing | RLS in place but no SECURITY DEFINER/function-escalation tests |
| 4 | `tier-upgrade-without-billing-prorate.md` | migration | Tier upgrade bills full price rather than prorating mid-cycle |

#### 5.2.1 Anti-pattern → fragment Remediation mapping

| Anti-pattern | Remediation fragments |
|---|---|
| manual-onboarding-bottleneck | tenant-provisioning-patterns + first-touch-isolation-verification |
| delete-without-export | data-export-portability + gdpr-right-to-deletion |
| no-rls-bypass-test | rls-bypass-test-design + tenant-isolation-testing-patterns |
| tier-upgrade-without-billing-prorate | tenant-tier-upgrade-mechanics + migration-rollback-and-abort (also see `tier-cliff` from P3.1 — same family of pricing-structure failures; E3) |

Atlas anti-patterns grow **4 → 8**.

### 5.3 Glossary (7 new)

**Location:** `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/glossary-terms-introduced.csv`

**Append rows (insertion-order convention preserved):**
```csv
right-to-deletion,"GDPR Art 17 subject-erasure right; tenant or subject can request hard-delete of PII data subject to regulatory retention floors.",bmad-bam-design-tenant-offboarding,provisional
data-portability,"GDPR Art 20 right; tenant can request machine-readable structured export of their data before erasure or migration.",bmad-bam-design-tenant-offboarding,provisional
retention-floor,"Regulatory minimum retention window (HIPAA 6y, SOX 7y, PCI 1y) that constrains the timing of deletion or anonymization.",bmad-bam-design-tenant-offboarding,provisional
anonymization,"Irreversible removal or alteration of PII such that the original subject cannot be re-identified; distinct from pseudonymization which is reversible (latter deferred to PX-Glossary or P9 Trust wave).",bmad-bam-design-tenant-offboarding,provisional
rls-bypass,"Escape from row-level-security policies via SECURITY DEFINER functions, role-elevation, or function-call escalation; primary RLS-failure mode.",bmad-bam-design-multi-tenant-testing,provisional
noisy-neighbor,"Tenant whose resource consumption degrades other tenants' SLAs; mitigated via quotas, fair-scheduling, and rate-limiting.",bmad-bam-design-multi-tenant-testing,provisional
isolation-verification-step,"Mandatory onboarding step that verifies a newly-provisioned tenant cannot read or write to other tenants' data; blocking gate before live traffic.",bmad-bam-design-tenant-onboarding,provisional
```

**Status taxonomy:** All P3.2 terms ship `status: provisional`; transition to `stable` at PX-Glossary wave after community vetting + cross-module reuse verification. Pseudonymization deferred to PX-Glossary or P9 Trust.

Atlas glossary grows **6 → 13**.

### 5.4 BMM overlay (1 — under design-multi-tenant-testing)

**Convention** (per ADR-015 G6): `<bam-skill-dir>/customize-template/<bmm-skill-name>/customize.toml`. `persistent_facts` uses **specific path** (specific-path retained per ADR-015; D4 note: BMM's own skills use `**` glob and Wave 0 confirmed it works — specific-path retained for explicit clarity, not glob-incompatibility).

**Namespace (C1 corrected):** Overlays use the **target's** namespace. BMM workflow skills use `[workflow]`; BMM agent skills use `[agent]`. Both P3.2 overlay targets are workflow skills → `[workflow]`.

**Install-time copy mechanism (C3 — inferred from Wave 0 outcome + 3-layer resolver):** At `bmad install bmad-bam-platform` time, the BMAD installer copies BAM's `customize-template/<bmm-skill>/customize.toml` to `{project-root}/_bmad/custom/<bmm-skill>.toml` (the team-override layer). The resolver then picks it up via standard 3-layer merge.

**Scope (per I1 verification on 2026-05-17):** Only `bmad-qa-generate-e2e-tests` ships an overlay; `bmad-design-test-strategy` is non-existent in BMM v6.6.0 — deferred per R3.2.6.

#### 5.4.1 `customize-template/bmad-qa-generate-e2e-tests/customize.toml`

```toml
# BAM overlay for BMM's bmad-qa-generate-e2e-tests skill.
# Pinned to BMM v6.6.0 customize.toml schema; refresh if BMM upstream bumps.
# Workflow customization surface — mirrors the agent customization shape under the [workflow] namespace.

[workflow]

activation_steps_append = [
  "BAM context: When generating E2E tests, consult test-catalogue.json at _bmad/bam/evidence/QG-M2/ for the per-isolation-model required-test set. Universal-cross-model tests (universal: true) MUST be covered. Per-model tests apply per the project's tenancy_model in tenancy-decision.json. RLS-bypass tests (category: rls-bypass) are MANDATORY when tenancy_model == row-level-security."
]

persistent_facts = [
  "file:{project-root}/_bmad-output/bbp/project-context.md"
]
```

#### 5.4.2 (DEFERRED — bmad-design-test-strategy)

Empirical verification confirmed `bmad-design-test-strategy` does not exist in BMM v6.6.0. Overlay deferred to a wave when BMM upstream ships the skill OR after BAM petitions BMM per roadmap §19.10 upstream contribution pathway. Tracked as R3.2.6.

#### 5.4.3 Overlay smoke-test (1 overlay)

Extension to design-multi-tenant-testing's `tests/smoke-test.sh`:

```bash
overlay_toml="$SKILL_DIR/customize-template/bmad-qa-generate-e2e-tests/customize.toml"
[ -f "$overlay_toml" ] || { echo "FAIL: overlay missing"; exit 1; }
python3 -c "
import tomllib
with open('$overlay_toml','rb') as f:
    c = tomllib.load(f)
assert 'workflow' in c, 'overlay must use [workflow] namespace (BMM workflow-skill target)'
asa = c['workflow'].get('activation_steps_append', [])
assert isinstance(asa, list) and all(isinstance(s, str) and s for s in asa), 'activation_steps_append must be non-empty strings'
assert any('test-catalogue.json' in s or 'multi-tenant' in s for s in asa), 'overlay must inject BAM multi-tenant context'
pf = c['workflow'].get('persistent_facts', [])
assert any('_bmad-output/bbp/project-context.md' in p for p in pf), 'overlay must use specific path per ADR-015 G6'
assert not any('**' in p for p in pf), 'overlay persistent_facts MUST NOT use universal-glob'
print('    [valid] overlay parses + injects BAM context + uses [workflow] + specific-path')
"
```

### 5.5 ADR-016 outline

**Path:** `_bmad/_memory/atlas/architecture-decisions/2026-05-17-016-p3-2-lifecycle-decisions.md`

**Frontmatter:**
```yaml
---
id: 2026-05-17-016
title: Wave P3.2 Lifecycle Skills design decisions (4 skills + QG-M2 refine + QG-M1 promote + QG-D1 partial)
status: accepted
date: 2026-05-17
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - "design-tenant-tier-model accepts a small additive update (retention_window_days_hint field in schema 1.1; +1h effort) — G43"
  - "BMM's bmad-qa-generate-e2e-tests skill (workflow type; [workflow] namespace) accepts customize-template overlays per the ADR-015 G6 convention; overlay pinned to BMM v6.6.0"
  - "BMM's bmad-design-test-strategy skill does not exist in BMM v6.6.0 (empirically verified 2026-05-17); overlay deferred per R3.2.6"
  - "QG-M1's partial→blocking promotion is a MAJOR bump (v0.1.0→v1.0.0) — downstream resolution behavior changes for QG-M2's depends-on"
  - "QG-C1 will be created by P9 Trust; offboarding-policy.json's QG-C1 forward-pointer lives in narrative only (no premature directory pre-write)"
  - "QG-D1 H-criteria defer to P10 design-disaster-recovery; partial gate at v0.1.0 covers auto-criteria only"
  - "QG-M2 v1.1.0 is a MINOR bump despite adding C6 because C6 preserves H5's semantic check (auto-promote, not new requirement)"
  - "Live_traffic and universal schema fields carry default values that preserve backwards compatibility"
  - "Cross-tenant cache attacks (KV/CDN cache-key collision) belong in P5 ai design-model-cache-isolation; P3.2's test-catalogue cross-tenant-cache category ships with must_have: 0"
  - "Custom-tier projects MUST re-run tier-model post-P3.2 to emit schema 1.1; consumers fail-fast at exit 70 for 1.0+custom combinations"
  - "Pseudonymization deferred to PX-Glossary or P9 Trust; anonymization's definition references but doesn't fully cover the distinction in v0.6.0"
  - "Customize-template overlay's specific-path persistent_facts is preserved from ADR-015 G6 convention; rationale is explicit clarity (matches bmad-bam-finalize canonical emit path), NOT BMM glob-incompatibility (BMM's own bmad-create-architecture uses ** in its persistent_facts; empirically verified)"
  - "Overlay namespace matches target skill's namespace; BMM workflow skills use [workflow] (verified empirically); ADR-015 G6 specific-path rationale preserved"
  - "Install-time copy mechanism: BAM's customize-template/<bmm-skill>/customize.toml is copied to {project-root}/_bmad/custom/<bmm-skill>.toml by the BMAD installer; resolver picks it up via standard 3-layer merge"
dependencies-on-other-decisions:
  - 2026-05-13-006
  - 2026-05-13-008
  - 2026-05-16-009
  - 2026-05-16-010
  - 2026-05-16-011
  - 2026-05-16-012
  - 2026-05-16-013
  - 2026-05-16-014
  - 2026-05-17-015
generated-by: claude-opus-4-7
authored-by: collaborative
---
```

**Body sections (mirror ADR-015 style):**
- Context — Wave P3.2 scope
- Decision — Q1-Q11 lock-ins table + cross-cutting (with `flow_type` rename note)
- Cross-skill input enforcement (parallel to ADR-015 §G4)
- Tier-model 1.0→1.1 additive amendment (G43)
- Live-traffic + universal schema fields (G61, G62)
- QG operations (M2 refine; M1 v1.0.0 major bump; D1 partial)
- BMM overlay namespace convention ([workflow] for workflow-target — empirically verified for bmad-qa-generate-e2e-tests; [agent] for agent-target — INFERRED, not empirically verified; first empirical verification would happen if a future BAM module needs to overlay a BMM agent skill) (E4)
- Install-time copy mechanism (C3)
- Consequences (Atlas fragments 24→37; anti-patterns 4→8; glossary 6→13; menu codes 8→12; Wave P3 ~56%; effort honestly revised to ~84-95h AI-augmented; Atlas fragment library growth challenge flagged)
- Alternatives Considered
- Revisit triggers (deferred items listed below)
- Related work (spec, plan, INDEX, checklist files, fragment files)

**Revisit triggers — deferred items:**
- pseudonymization → PX-Glossary
- KV-cache attack tests → P5 ai (design-model-cache-isolation)
- QG-D1 H-criteria → P10 ops (design-disaster-recovery)
- QG-C1 creation + offboarding QG-C1 mirror → P9 Trust
- Full noisy-neighbor mitigation → P3.3 (design-rate-limit-per-tenant)
- Tier-2 audit retro-fit → discovered at Tier-2 verification
- BMM target skill non-existence (R3.2.6) → re-verify pre-implementation
- BMM `bmad-design-test-strategy` overlay → when BMM ships the skill
- Tier-1 audit extension for QG checklist frontmatter validity → future wave
- Cross-module Atlas resource discovery → P4+ when data module introduces conflicts

#### 5.5.1 P3.2 Risk register

| Risk ID | Risk | Mitigation |
|---|---|---|
| R3.2.1 | Schema 1.0→1.1 auto-fill confuses consumers | Explicit fail-fast at exit 70 for custom-mode 1.0; clear diagnostic; fixture test `schema-1.0-custom-fails` |
| R3.2.2 | QG-M1 partial→blocking breaks downstream | Major version bump + ADR-016 documents transition; downstream re-evaluate resolution |
| R3.2.3 | BMM overlay brittle on upstream change | Pin to v6.6.0 via header comment; overlay smoke-test catches structural drift; namespace-matches-target convention empirically verified |
| R3.2.4 | Cross-skill soft-input parsing edge cases | `references_degraded` flag + per-skill fallback policy per Section 2.0 |
| R3.2.5 | QG-D1 partial premature if P10 needs different schema | v0.1.0 minimal scope (auto-only); H-criteria designed at P10 time |
| R3.2.6 | BMM target skill non-existence (TRIGGERED for bmad-design-test-strategy 2026-05-17) | Mitigation EXECUTED: overlay deferred; scope reduced to 1 overlay; revisit when BMM ships the skill |

### 5.6 Testing strategy

**Tests that must pass before merge:**

| Test | Scope | Expected |
|---|---|---|
| `tests/audit-marketplace.sh` (9 checks a-i) | PASS | check (i) dynamic against spec §5.1 |
| `tests/audit-marketplace-fixtures.sh` | 13 existing + 2 new scenarios | PASS |
| `tests/wave-0/run-smoke-test.sh` | unchanged | PASS (no regression) |
| `tests/integration/p3-dag-smoke.sh` (NEW) | cross-skill DAG | PASS |
| 4 new per-skill `tests/smoke-test.sh` | per Section 5.6.1 assertions | PASS |
| `bmad-bam-design-tenant-tier-model/tests/smoke-test.sh` | amended for schema 1.1 (G43) | PASS |
| `tests/integration/p3-2-overlay-merge.sh` (NEW; I2) | empirical resolver merge | PASS |
| `tests/integration/run-real-install.sh` (extended; I3) | post-install smoke | PASS |
| `tests/integration/p3-1-schema-1.1-compat.sh` (NEW; I5) | P3.1 forward-compat | PASS |
| `tests/integration/p3-2-e2e.sh` (NEW; I6) | end-to-end | PASS |
| Multi-IDE verification (I7) | Claude Code + Cursor | both PASS |
| `BAM_TIER2=1 tests/audit-marketplace.sh` | Tier-2 (verify 12-skill count) | PASS |
| All P2.1 + P3.1 skill smokes | regression | PASS |

#### 5.6.1 Skill-specific smoke check details

| Skill | Skill-specific assertions |
|---|---|
| `bmad-bam-design-tenant-onboarding` | (a) step-05 emits `live_traffic` field per flow; (b) step-07 verifies `blocking==true` when `live_traffic==true`; (c) `isolation_verification_step` mandatory per flow; (d) `provisioning_hooks[*].id` globally unique; (e) step-07 has `gate_id: QG-M2` |
| `bmad-bam-design-tenant-offboarding` | (a) step-01 enforces `--regulatory-profile` enum; (b) step-05 emits to 2 locations (docs + QG-M2); (c) step-07 verifies `data_export_required` + `subject_erasure_fast_path` are `true`; (d) `policy_id` format `<tier>:<mode>`; (e) `tear_down_hooks[]` presence; (f) `retention_window_source` includes `legal_hold` enum |
| `bmad-bam-design-multi-tenant-testing` | (a) step-01 has `hybrid_resolution` branch; (b) step-05 emits `universal` field; (c) step-07 verifies ≥1 test with `category: isolation` AND `universal: true`; (d) `traceable_to` pattern; (e) 1 overlay customize.toml exists + parses + uses `[workflow]` + specific-path |
| `bmad-bam-design-tenant-migration-tooling` | (a) step-01 enforces `--migration-axis` enum; (b) step-05 emits to 3 locations (docs + QG-D1 + QG-M2 mirror); (c) step-07 verifies `references_degraded` boolean present; (d) `zero_downtime_required: true` ⇒ no axis uses `cell_failback` |

#### 5.6.2 Cross-skill DAG smoke (`tests/integration/p3-dag-smoke.sh`)

Lightweight (~50 lines): verify 9 platform skill dirs exist; verify each P3.2 manifest declares correct required inputs; verify tier-model 1.1 field referenced; verify hook-id cross-refs; verify `references_degraded` semantics.

#### 5.6.3 Fixture files (10)

`tests/fixtures/p3-2/`:
- `onboarding-flow.min.json` / `.path.json`
- `offboarding-policy.min.json` / `.path.json`
- `test-catalogue.min.json` / `.path.json`
- `migration-runbook.min.json` / `.path.json`
- `tier-model.1.0.json` (legacy 5-default; auto-fill)
- `tier-model.1.0.custom.json` (custom mode 1.0; expected exit-70)

**Deferred to v0.2.0:** HIPAA floor enforcement, hybrid resolution + 5-tier mapping, references_degraded scenario.

#### 5.6.4 tests/ placement convention

| Test type | Location |
|---|---|
| Per-skill smoke | `src-v6/.../bmad-bam-design-X/tests/smoke-test.sh` |
| Cross-skill DAG smoke | `tests/integration/p3-dag-smoke.sh` |
| Fixture files | `tests/fixtures/p3-2/*.json` |
| Fixture scenario tests | `tests/audit-marketplace-fixtures.sh` extension |
| Tier-2 audit | `tests/audit-marketplace.sh` with `BAM_TIER2=1` |
| Integration (overlay merge / real install / schema compat / E2E) | `tests/integration/p3-2-*.sh` |

#### 5.6.5 Tier-2 audit verification task

Pre-merge: run `BAM_TIER2=1 tests/audit-marketplace.sh`; verify expected platform-skill count rises 8 → 12. If hard-coded count, patch (~0.25h); if dynamic, no change.

#### 5.6.6 Overlay merge empirical test (I2)

**File:** `tests/integration/p3-2-overlay-merge.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"
BMM_SKILL_DIR="${PROJECT_ROOT}/.claude/skills/bmad-qa-generate-e2e-tests"
# (tool-aware fallback: .claude/skills/ | .cursor/skills/ | _bmad/<code>/)

# Resolver outputs JSON to stdout
python3 "${PROJECT_ROOT}/_bmad/scripts/resolve_customization.py" \
    --skill "$BMM_SKILL_DIR" \
    --key workflow > /tmp/resolved-workflow.json

python3 -c "
import json
data = json.load(open('/tmp/resolved-workflow.json'))
asa = data.get('activation_steps_append', [])
assert any('test-catalogue.json' in s for s in asa), \
    f'FAIL: BAM context not merged. Got: {asa}'
pf = data.get('persistent_facts', [])
assert any('_bmad-output/bbp/project-context.md' in p for p in pf), \
    f'FAIL: specific-path persistent_facts not merged. Got: {pf}'
print('PASS: overlay merge empirically verified')
"
```

#### 5.6.7 Real-install smoke extension (I3)

`tests/integration/run-real-install.sh` extended to:
- Install 4 new skill paths
- Verify post-install slash-command discovery
- Confirm `_bmad/bam/evidence/QG-M2/` and `_bmad/bam/evidence/QG-D1/` are creatable

#### 5.6.8 P3.1 forward-compat smoke (I5)

`tests/integration/p3-1-schema-1.1-compat.sh` — runs P3.1's deployment-topology + finops-model step-01 against tier-model.json schema 1.1; asserts no crash / no "unknown field" error.

#### 5.6.9 E2E integration test (I6)

`tests/integration/p3-2-e2e.sh` — fresh project → BMM install → BAM install (v0.6.0) → finalize → smoke-test → run P3.1 chain → run P3.2 chain → invoke BMM bmad-qa-generate-e2e-tests with BAM overlay context → manually evaluate QG-M2 v1.1.0 → assert PASS.

#### 5.6.10 Multi-IDE smoke (I7)

Run `tests/integration/run-real-install.sh` in BOTH Claude Code AND Cursor environments.

### 5.7 Spec / roadmap / INDEX / llms.txt mechanics

| File | Action | Detail |
|---|---|---|
| `docs/v6-final-architecture.md` | No changes | Spec §5.1 already names skills 6/7/8/14; no v0.11 spec changelog bump (defer to P3 completion or skip) |
| `docs/v6-detailed-roadmap.md` §3 P3.2 block | Annotate LANDED | "ADR-016 (Wave P3.2; deps: [006, 008, 009, 010, 011, 012, 013, 014, 015]) — LANDED 2026-05-XX" |
| `docs/v6-detailed-roadmap.md` §11 | Update customize-templates inventory | Mark `bmad-qa-generate-e2e-tests` LANDED in P3.2; `bmad-design-test-strategy` annotated "BMM upstream skill not yet shipped; BAM overlay deferred per R3.2.6" |
| `docs/v6-detailed-roadmap.md` §13 | Annotate ADR-016 LANDED | Row for "P3.2 (Lifecycle)" → ADR-016 |
| `docs/v6-detailed-roadmap.md` §12 | Add ADR-016 row | Spec coverage map |
| `_bmad/_memory/atlas/architecture-decisions/INDEX.md` | Append table row | `\| 2026-05-17-016 \| Wave P3.2 Lifecycle Skills design decisions (4 skills + QG-M2 refine + QG-M1 promote + QG-D1 partial) \| accepted \| 2026-05-17 \|` |
| `CLAUDE.md` | Add P3.2 outcome line | "P3.2 outcome (2026-05-XX): ADR-016 landed; 4 Lifecycle skills active; QG-M1 promoted to blocking; QG-D1 partial created; Atlas fragments 24→37." |
| `.claude-plugin/marketplace.json` | Bump plugin version `0.5.0 → 0.6.0`; append 4 skill paths | Plugin description updates to mention "Lifecycle skills (P3.2)" |
| `src-v6/bmad-bam-platform/module-help.csv` | Append 4 rows (FIRST in ordering chain) | Section 5.8 |
| `_bmad/bam-platform/llms.txt` | Regenerate AFTER CSV update; commit SAME commit as CSV | Via `tools/generate-llms-txt.sh platform` |

### 5.8 Marketplace + module-help.csv diffs

**marketplace.json:**
```diff
        "./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-tier-model",
+       "./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-onboarding",
+       "./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-offboarding",
+       "./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-multi-tenant-testing",
+       "./src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-migration-tooling"
```
Plus plugin version `0.5.0 → 0.6.0` + description update.

**module-help.csv (4 rows; preceded-by lists all required upstream):**

```csv
BAM Platform,bmad-bam-design-tenant-onboarding,Tenant Onboarding Design,ZON,"Design per-tier onboarding flows (self_serve / assisted_signup / sales_led) with mandatory isolation_verification_step. Reads tier-model + tenancy. Output: onboarding-flow.md + .json (QG-M2 evidence). Invoke via /bmad-bam-design-tenant-onboarding.",invoke-workflow,,solutioning,"bmad-bam-design-tenancy-model,bmad-bam-design-tenant-tier-model",bmad-bam-design-tenant-offboarding,false,docs/architecture/,onboarding-flow.md
BAM Platform,bmad-bam-design-tenant-offboarding,Tenant Offboarding Design,ZOF,"Design offboarding: GDPR Art 17 erasure + Art 20 export + retention floors. Flag: --regulatory-profile gdpr_baseline|hipaa|sox_or_pci|none. Reads tier + tenancy. Output: offboarding-policy.md + .json (QG-M2 evidence). Invoke via /bmad-bam-design-tenant-offboarding.",invoke-workflow,,solutioning,"bmad-bam-design-tenancy-model,bmad-bam-design-tenant-tier-model",bmad-bam-design-tenant-migration-tooling,false,docs/architecture/,offboarding-policy.md
BAM Platform,bmad-bam-design-multi-tenant-testing,Multi-Tenant Testing Catalogue,ZMT,"Generate per-isolation-model test catalogue: isolation / noisy-neighbor / quota / rls-bypass. Reads tenancy. Output: test-catalogue.md + .json (QG-M2 evidence). Ships 1 BMM overlay. Invoke via /bmad-bam-design-multi-tenant-testing.",invoke-workflow,,solutioning,bmad-bam-design-tenancy-model,,false,docs/architecture/,test-catalogue.md
BAM Platform,bmad-bam-design-tenant-migration-tooling,Tenant Migration Tooling Design,ZTG,"Design tenant migration playbooks: tier upgrades + region migrations. Flag: --migration-axis tier|region|both. Reads tier + deployment + tenancy. Output: migration-runbook.md + .json (QG-D1 + QG-M2 mirror). Invoke via /bmad-bam-design-tenant-migration-tooling.",invoke-workflow,,solutioning,"bmad-bam-design-tenancy-model,bmad-bam-design-tenant-tier-model,bmad-bam-design-deployment-topology",,false,docs/architecture/,migration-runbook.md
```

### 5.9 Final effort breakdown

| Item | Hours |
|---|---|
| 4 skills × 14h scaffold | ~56 |
| 13 new fragments × 2h (spec §6.3 compliance: 400-600 lines) | ~26 |
| 4 new anti-patterns × 1h | ~4 |
| 7 new glossary CSV rows × 0.5h | ~3.5 |
| 1 BMM overlay (scope reduced from 2 per R3.2.6) × 2h | ~2 |
| 3 QG operations × 2h (M2 refine + M1 promote + D1 create) | ~6 |
| Tier-model skill amendment (G43) | ~1 |
| ADR-016 + risk register | ~2.5 |
| INDEX + roadmap §3/§11/§12/§13 annotations + CLAUDE.md | ~1.5 |
| Marketplace + module-help.csv updates | ~1 |
| `tools/generate-llms-txt.sh platform` regenerate + commit | ~0.5 |
| Fixture extensions (10 files + audit-fixtures.sh) | ~2 |
| Cross-skill DAG smoke test | ~3 |
| Overlay merge empirical test (I2) | ~2 |
| Real-install smoke extension (I3) | ~2 |
| P3.1 forward-compat smoke (I5) | ~1 |
| E2E integration test (I6) | ~3 |
| Multi-IDE smoke verification (I7) | ~1 |
| Tier-2 audit verification + conditional patch | ~0.5 |
| Spec doc drafting | ~3 |
| Plan doc drafting (writing-plans output) | ~4 |
| PR description structure | ~1 |
| G-item appendix in spec doc | ~0.5 |
| Reuse refresh (`tenant-isolation-testing-patterns.md`) | ~0.5 |
| **Gross total** | **~125.5h** |
| **AI-augmented target band (25-30% reduction)** | **~84-95h** |
| **Conservative band (15% reduction)** | **~107-115h** |

Lands ~4-15h above kickoff 65-80h band at gross; **AI-augmented within tolerance**. Revision honest accounting from spec §6.3 fragment compliance + cross-skill DAG + integration tests + design/plan/PR drafting.

AI-augmentation factor is **estimate-not-empirical**; calibration vs P3.1 actuals pending merge.

**Latency aggregation:** 9 platform skills × ~50min avg = ~7.5h facilitated runtime for full Foundation+Lifecycle chain. Per-project one-time-design; subsequent Edit/Validate runs are ~5-10min per re-validation (not additive).

### 5.10 PR shape

**Branch:** `feat/v6-p3-2-lifecycle` → base `feat/bam-v3-pure-kb`

**Title:** `feat(p3-2): Lifecycle Skills (4 skills + QG-M2 refine + QG-M1 promote + QG-D1 partial)`

**Logical commit structure (10 commits with dependencies):**
1. `chore(p3-2): tier-model schema 1.1 amendment (retention_window_days_hint)` — no deps
2. `feat(p3-2): bmad-bam-design-tenant-onboarding (ZON) + 2 fragments + 1 anti-pattern` — deps #1
3. `feat(p3-2): bmad-bam-design-tenant-offboarding (ZOF) + 4 fragments + 1 anti-pattern` — deps #1
4. `feat(p3-2): bmad-bam-design-multi-tenant-testing (ZMT) + 3 fragments + 1 anti-pattern + 1 BMM overlay` — deps #1
5. `feat(p3-2): bmad-bam-design-tenant-migration-tooling (ZTG) + 4 fragments + 1 anti-pattern` — deps #1
6. `feat(p3-2): QG-M2 refine v1.1.0 + QG-M1 promote v1.0.0 + QG-D1 partial v0.1.0` — deps #2-5
7. `feat(p3-2): glossary 7 terms + INDEX row + ADR-016` — independent
8. `feat(p3-2): marketplace v0.6.0 + module-help.csv + llms.txt regenerate` — deps #2-5
9. `test(p3-2): per-skill smokes + 10 fixtures + audit-marketplace-fixtures extensions` — deps #2-5
10. `test(p3-2): cross-skill DAG smoke + 4 integration tests (overlay-merge, real-install, schema-1.1-compat, e2e) + roadmap §3/§11/§12/§13 + CLAUDE.md` — deps #1-9 (E2: CLAUDE.md update — confirm with user before commit per system-prompt convention)

**PR description structure (6 sections):**
1. **Summary** — links to spec + plan + ADR-016
2. **Skills added** — 4 with menu codes (ZON, ZOF, ZMT, ZTG); slash-command invocations
3. **Gates affected** — M2 refine + M1 promote + D1 partial
4. **Schema additions** — tier-model 1.1; onboarding-flow live_traffic; test-catalogue universal; 4 new outputs
5. **Test plan** — checklist of `tests/...` to pass
6. **Cross-validation** — ~12 categories per roadmap §4 universal checklist (PASS/N-A annotations)

#### 5.10.1 Pre-merge gate

- [ ] All tests PASS per Section 5.6
- [ ] Cross-validation §4 itemized in PR description with PASS/N-A annotations
- [ ] ADR-016 in INDEX
- [ ] llms.txt regenerated AFTER module-help.csv; committed same commit (#8)
- [ ] No regression on P2.1/P3.1 smoke tests
- [ ] ≥2-3 review rounds (P3.1 PR #9 went through 5 rounds; expect similar)
- [ ] BMM target skill existence verified per R3.2.6 (EXECUTED 2026-05-17; scope adjusted)
- [ ] Real-install integration smoke PASSES in both Claude Code AND Cursor (I7)
- [ ] E2E integration test (`p3-2-e2e.sh`) PASSES at least once during PR review
- [ ] Overlay merge empirical test (`p3-2-overlay-merge.sh`) PASSES

---

## 6. Acceptance Criteria + Integration assertion

### 6.1 Test pass conditions

| Test | Expected | Owner |
|---|---|---|
| `tests/audit-marketplace.sh` (9 checks a-i) | PASS | implementation |
| `tests/audit-marketplace-fixtures.sh` | PASS (13 + 2 scenarios) | implementation |
| `tests/wave-0/run-smoke-test.sh` | PASS (no regression) | implementation |
| `tests/integration/p3-dag-smoke.sh` (NEW) | PASS | implementation |
| 4 new per-skill smokes | PASS | implementation |
| `BAM_TIER2=1 tests/audit-marketplace.sh` | PASS (12-skill count) | implementation |
| `design-tenant-tier-model/tests/smoke-test.sh` (amended) | PASS | implementation |
| All P2.1 + P3.1 smokes | PASS (no regression) | implementation |
| `tests/integration/p3-2-overlay-merge.sh` (NEW) | PASS | implementation |
| `tests/integration/run-real-install.sh` (extended) | PASS in both IDEs | implementation |
| `tests/integration/p3-1-schema-1.1-compat.sh` (NEW) | PASS | implementation |
| `tests/integration/p3-2-e2e.sh` (NEW) | PASS | implementation |

### 6.2 Quality gate evaluation

- QG-M2 v1.1.0 evaluates to PASS against P3.2-produced evidence
- QG-M1 v1.0.0 evaluates to PASS against module-decomposition + 4 P3.2 outputs (H3 = n/a greenfield)
- QG-D1 v0.1.0 evaluates to PASS-PARTIAL on auto-criteria only

### 6.3 Cross-validation per roadmap §4

Per Section 5.10 PR description — ~12 categories with PASS/N-A annotations.

### 6.4 Documentation completeness

- 4 SKILL.md files: `name + description` frontmatter (ADR-014)
- 4 manifest YAMLs: 10 BAM-extended fields (ADR-014)
- 4 customize.toml files: `[workflow]` namespace + universal-glob (ADR-012)
- 1 BMM overlay customize.toml: `[workflow]` namespace + specific-path (ADR-015 G6, C1 corrected)
- 13 new fragments: spec §6.3 (400-600 lines, 8 sections, CRITICAL line, `{date}` placeholder)
- 4 new anti-patterns: spec §6.5 frontmatter
- 7 new glossary CSV rows: `status: provisional`

### 6.5 Integration assertion

**What WILL work (confidence basis):**
| Capability | Basis |
|---|---|
| Plan A universal-glob activation | Wave 0 outcome + P3.1 PR #9 proven |
| Cross-skill input resolution (tool-aware-path-fallback) | P3.1 pattern proven |
| Step-file frontmatter consumption + cache files | P3.1 pattern proven |
| Per-skill smoke + audit-marketplace.sh 9 checks | P3.1 PR #9 proven |
| Sidecar memory + INDEX + llms.txt + marketplace mechanics | Existing scripts |
| Schema 1.0→1.1 forward-compat (default-tier ids, auto-fill) | G3 design + Python json.load tolerance |
| Customize-template overlay for bmad-qa-generate-e2e-tests | ADR-015 G6 + namespace empirically verified + I2 merge test |

**What COULD break (mitigation):**
| Risk | Mitigation |
|---|---|
| BMM `bmad-design-test-strategy` non-existence (R3.2.6 TRIGGERED) | Overlay deferred; scope reduced; revisit when BMM ships |
| Overlay merge mechanism quirks for bmad-qa-generate-e2e-tests | I2 empirical overlay-merge test |
| P3.1 consumer crash on schema 1.1 | I5 forward-compat smoke verifies |
| Hybrid tenancy per-tier mechanism handling | I4 step-02 explicit behavior + schemas accommodate |
| Custom-tier 1.0 + P3.2 consumer | BY DESIGN: hard-fail exit 70 with diagnostic |
| User runs P3.2 skill before P3.1 chain complete | BY DESIGN: precondition checks exit 64 |
| Real-IDE install timing edge cases | I3 real-install smoke + I7 multi-IDE verification |
| Cross-module Atlas resources (P4+) | Future-concern; ADR-016 Revisit triggers |

---

## Risk register

See Section 5.5.1. R3.2.6 was TRIGGERED during round-5 empirical verification on 2026-05-17; mitigation EXECUTED (overlay deferred; scope reduced from 2 to 1 overlay).

---

## Appendix A — Enhancement index

The 152 enhancement decisions integrated into this spec, organized by gap-scan round:

**Round 1 (G1-G13)** — Section 1 enhancements: DAG inconsistency fixed; evidence destinations declared; tier-model schema-compat established; latency budgets; CEV modes; hybrid handling; persistent_facts strategy; marketplace mechanics; ADR-016 outline; roadmap update.

**Round 2 (G14-G36)** — Section 2 enhancements: QG-C1 dropped from offboarding gates + output; inline ADR pattern; CEV file naming; schema_version on outputs; cluster: lifecycle; soft-input fallbacks; cache files; validate/edit modes; schema mismatch handling; exit codes; latency rationale; audit check (f) reminder; SKILL.md description; sidecar vs wave ADR; section pointers; template outlines; fragment/anti-pattern frontmatter; audit check (i) pre-confirmed; fixtures/integration tests.

**Round 3 (G37-G59)** — Section 3 schema enhancements: dropped workflow_run_id + tenancy_model denormalization; pinned ISO format; pattern-based module fields; uniqueness rules; policy_id + tear_down_hooks; tier-model amendment P3.2 inclusion; enum casing; tier_id convention; traceable_to pattern; retention floor cross-rule; custom-tier elicitation; string-length checks; hybrid completeness; empty-array policy; numeric bounds; reference-degraded; QG-M2 cross-pointer; forward-compat policy; serialization conventions; min/path examples; Python stdlib; JSON-Schema deferral.

**Round 4 (G60-G76)** — Section 4 enhancements: QG-M2 C1 backwards-compat; live_traffic field; universal field; C0 prerequisites; M1 major-bump rationale; H4 temporal contract; C6 non-waivable; H1 brownfield-waiver; criticality/status convention; H1 threshold rationale; waiver carryover; evidence-location note; false-diff cleanup; ADR-016 pointer-forward; H2/F1-H2 complementarity; gate-runner scope; spec cross-refs.

**Round 5 Section 5 (G77-G96 + H1-H16)** — fragment length spec compliance; preceded-by chain; namespace declaration; BMM version pin; PR commit structure; cross-reference mini-map; CRITICAL line table; ADR-016 assumptions; smoke check details; cross-skill DAG smoke; PR description structure; risk register; pseudonymization deferral; provisional-vs-stable; no v0.11 bump; roadmap §11 inventory; INDEX format; llms.txt regen ordering; effort calibration; latency aggregation.

**Round 5 cross-section (A1-A21)** — Section 1.11 effort alignment; Section 1.4 tier-model narrative; flow_type rename; legal_hold enum; universal applies_to semantics; step file frontmatter; Executive Summary; Out-of-Scope; per-wave PR pre-merge gate; cross-schema resolution mechanism; Acceptance Criteria section; commit dependencies; version-pinning policy; fixture deferrals; TOC; migration_axes single-axis validation; workflow.md note; QG checklist Tier-1 audit deferred; Atlas fragment growth note; latency per-project note; glossary cross-ref placement.

**Round 6 integration (I1-I11)** — BMM target skill verification (R3.2.6 TRIGGERED); overlay merge empirical test; real-install smoke extension; hybrid tenancy onboarding/offboarding handling; P3.1 schema-1.1 compat smoke; E2E integration test; multi-IDE smoke; integration assertion table; manual QG-M2 evaluation walkthrough; test-catalogue → code generator forward-pointer; cross-module Atlas resources future-concern note.

**Round 5 critical corrections (C1-C4)** — Overlay namespace `[agent]` → `[workflow]` (empirically verified BMM workflow-skill namespace); I2 resolver CLI corrected (`--skill <path> --key <key>`, JSON to stdout); install-time copy mechanism documented (BAM overlay → `_bmad/custom/<bmm-skill>.toml` at install time); ADR-015 G6 `**` rationale informational only (BMM's own skills use `**`; specific-path retained for explicit clarity).

**Round 6 final corrections (D1-D4)** — Step-file frontmatter `gate_id` field for step-07-v (D1); each step-07-v emits `QG-<gate>-<artifact>-evidence.md` human evidence narrative (D2); fragment line count empirical-vs-spec note (D3); ADR-015 G6 outdated rationale annotated in ADR-016 (D4).

**Cumulative gap-scan ROI:**
- Round 1-2: 36 design corrections
- Round 3: 21 cross-section consistency fixes
- Round 4: 16 round-2 consolidation fixes
- Round 5: 11 integration tests + 4 critical empirical corrections (saved 2 silent bugs: namespace + resolver CLI)
- Round 6: 4 P3.1-convention conformance fixes (saved 1 missing artifact convention: human evidence narrative)

**Total: 152 enhancement decisions** ensuring P3.2's design is empirically grounded, integration-safe, and convention-conformant with P3.1 + BMAD/BMM mechanisms.

---

**Spec finalized 2026-05-17. Next: writing-plans skill produces implementation plan.**
