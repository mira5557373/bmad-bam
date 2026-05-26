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
  - "Overlay namespace matches target skill's namespace; BMM workflow skills use [workflow] (verified empirically); BMM agent skills would use [agent] (INFERRED, not empirically verified — first empirical test happens if a future BAM module overlays a BMM agent skill)"
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

# ADR 016 — Wave P3.2 Lifecycle Skills design decisions

## Context

Wave P3.2 ships 4 new platform lifecycle workflow skills (tenant-onboarding, tenant-offboarding, tenant-migration, multi-tenant-testing — spec §5.1 skills #6, #7, #8, #14) plus 3 quality-gate operations: QG-M2 refine (v1.0.0 → v1.1.0), QG-M1 promotion (v0.1.0 partial → v1.0.0 blocking), and QG-D1 creation (v0.1.0 partial). Lifecycle tier completes the post-Foundation module-evolution story: every module (P3.3 Commercial, P3.4 Brownfield, and downstream tiers) now inherits a complete onboarding/offboarding/migration/testing baseline.

The 4 skills cover the tenant-state-transition surface: onboarding (cold→live), offboarding (live→deleted, with retention floors + GDPR right-to-deletion + data-portability), migration (live→live cross-shard/cross-tier with zero-downtime requirements), and multi-tenant-testing (cross-tenant isolation test catalogue feeding both QG-M2 C6 and downstream module verification). Sequencing follows spec §5.1: onboarding → offboarding → migration (state-transition order) → testing (cross-cutting catalogue).

P3.2 also picks up minor work P3.1 deferred:
1. **Tier-model schema 1.0 → 1.1 amendment**: additive `retention_window_days_hint` field per tier; auto-fill for 5-default tier ids; custom-mode 1.0 hard-fails at exit 70 with diagnostic.
2. **QG-M1 promotion**: P3.1 shipped QG-M1 v0.1.0 (auto-criteria C1-C5 only). P3.2 adds H-criteria H1-H4 + auto-promotes C6 (isolation-verification-step coverage from testing skill); QG-M1 reaches v1.0.0 blocking.

## Decision

Q1-Q11 lock-ins + cross-cutting decisions (full detail in design spec §3 at `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md`; 156 enhancement decisions integrated across 7 gap-scan rounds):

- **Q1 — Onboarding evidence shape:** Per-skill JSON contract (`onboarding-policy.json`) + human markdown (`tenant-onboarding.md`) — inherits ADR-015 Q1 pattern; isolation-verification-step is blocking before live-traffic flip.
- **Q2 — Onboarding flow:** `flow_type` formal schema field (renamed from informal `onboarding_flow_hint`); 4 values (self-serve / sales-led / hybrid / enterprise-pilot). Tier-mapped defaults via tier-model 1.1.
- **Q3 — Offboarding retention surface:** Retention-floor matrix per regulation (HIPAA 6y / SOX 7y / PCI 1y / GDPR variable); `right-to-deletion` honored within floor; `data-portability` export step before erasure; `anonymization` as alternative when floor blocks hard-delete.
- **Q4 — Offboarding QG-C1 forward-pointer:** Narrative-only reference to P9 Trust's future QG-C1; no premature directory pre-write (rejects round-1 G2's directory-mirror proposal — see Alternatives).
- **Q5 — Migration zero-downtime mandate:** All migration flows MUST be zero-downtime (dual-write + verify + cutover + dual-read drain); single skill (rejected max-decomposition).
- **Q6 — Migration scope:** Cross-shard + cross-tier; cross-region deferred to P10 ops (`design-disaster-recovery`).
- **Q7 — Testing catalogue shape:** 5 categories (rls-bypass / cross-tenant-data / cross-tenant-rate / cross-tenant-cache / isolation-verification-step); `must_have` counts per category; cross-tenant-cache ships with `must_have: 0` (deferred to P5 ai per assumption).
- **Q8 — Testing skill produces QG-M2 C6 evidence:** Auto-promote (no human review) from testing skill's output catalogue; preserves H5's semantic check from QG-M2 v1.0.0.
- **Q9 — Fragment density:** Hard cap 5/skill (inherits ADR-015 Q6); 13 total new fragments across 4 skills.
- **Q10 — Anti-patterns:** 4 — onboarding-without-isolation-verification, offboarding-without-retention-floor, migration-without-dual-write, testing-as-afterthought.
- **Q11 — Glossary:** 7 terms appended in CSV insertion-order (right-to-deletion, data-portability, retention-floor, anonymization, rls-bypass, noisy-neighbor, isolation-verification-step); pseudonymization deferred.

Cross-cutting decisions:

- **G43 — Tier-model 1.0→1.1 additive amendment:** `retention_window_days_hint` field; +1h effort; consumer fail-fast at exit 70 for `schema_version: 1.0` + `custom_mode: true`.
- **G61 — Live-traffic schema field:** `live_traffic_started_at` (ISO8601, default `null`); preserves backwards-compat for existing onboarding artifacts.
- **G62 — Universal schema fields:** `tenant_id`, `tenant_tier`, `schema_version` baked into all 4 P3.2 skill outputs; defaults preserve backwards-compat.
- **C1/E4 — BMM overlay namespace:** `[workflow]` for workflow-target skills (verified empirically for `bmad-qa-generate-e2e-tests`); `[agent]` for agent-target skills (INFERRED).
- **R3.2.6 mitigation — BMM target non-existence:** Round-5 empirical verification revealed `bmad-design-test-strategy` does NOT exist in BMM v6.6.0; overlay scope reduced from 2 → 1; deferred overlay revisits at writing-plans pre-implementation per spec §5.6.5.

### Cross-skill input enforcement (G4 — parallel to ADR-015 §G4)

Each P3.2 skill's **step-01 implements explicit precondition checks** for required upstream artifacts. The required-vs-soft distinction is workflow-enforced; soft inputs use the **soft-input fallback policy** per spec Section 2.0:

```bash
# Example: tenant-migration step-01 (requires tenancy + onboarding artifacts)
TENANCY_JSON="${PROJECT_ROOT}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
ONBOARDING_JSON="${PROJECT_ROOT}/_bmad/bam/evidence/QG-M2/onboarding-policy.json"
TENANCY_JSON_ALT="${PROJECT_ROOT}/docs/architecture/tenancy-decision.json"
# tool-aware-path-fallback per ADR-015 G6
for required in "$TENANCY_JSON|$TENANCY_JSON_ALT" "$ONBOARDING_JSON"; do
    # ... check each, exit 64 on hard-miss
done
# Soft inputs: warn-and-degrade with references_degraded: true flag in output
```

Path resolution uses Concern-5 tool-aware fallback (`_bmad/bam/evidence/<QG>/` → `docs/architecture/`) inherited from ADR-015.

### Tier-model 1.0→1.1 additive amendment (G43)

Additive `retention_window_days_hint` field per tier. P3.1's design-tenant-tier-model receives +1h update (one writer in step-emit + one validator entry); read-time auto-fill for 5-default tier ids (free=30, starter=90, pro=365, business=2555 [7y SOX], enterprise=variable). Custom-mode projects MUST re-run tier-model post-P3.2 to emit schema 1.1; consumers fail-fast at exit 70 for `schema_version: 1.0` + `custom_mode: true` combinations with a clear diagnostic. Fixture test `schema-1.0-custom-fails` enforces.

### Live-traffic + universal schema fields (G61, G62)

`live_traffic_started_at` (ISO8601, default `null`) added to onboarding-policy.json; signals the isolation-verification-step gate has passed and live traffic is flowing. Universal fields `tenant_id`, `tenant_tier`, `schema_version` baked into all 4 P3.2 outputs. All defaults preserve backwards-compatibility — existing consumers seeing missing fields treat as `null` per JSON schema convention.

### QG operations

**QG-M2 refine (v1.0.0 → v1.1.0, MINOR bump):** Adds C6 (isolation-verification-step coverage from testing skill); evidence-balance shifts 50/50 → 60/40 (auto/human) — five auto + four human criteria post-refine. C6 is MINOR (not MAJOR) because it preserves H5's semantic check from v1.0.0 (auto-promote, not new requirement).

**QG-M1 promote (v0.1.0 partial → v1.0.0, MAJOR bump):** Adds H1-H4 + auto-promotes C6; reaches blocking status. MAJOR because downstream resolution behavior changes for QG-M2's `depends-on: [QG-M1]` — a v0.x partial gate is satisfied by auto-criteria only; v1.0 blocking requires human-review pass. Downstream consumers must re-evaluate.

**QG-D1 create-partial (v0.1.0):** New gate covering data-lifecycle policy auto-criteria (retention-floor presence, right-to-deletion mechanism, data-portability export, anonymization fallback). H-criteria (RPO/RTO, failover-drill, multi-region replication, backup integrity, region-failure runbook — 5 items) deferred to P10 ops `design-disaster-recovery`.

### BMM overlay namespace convention (C1, E4)

Round-5 empirical verification of BMM v6.6.0 SKILL.md headers established:

- BMM workflow-type skills use `[workflow]` namespace (verified: `bmad-qa-generate-e2e-tests`, `bmad-create-architecture`).
- BMM agent-type skills use `[agent]` namespace (INFERRED, not yet empirically verified — first empirical test happens if a future BAM module overlays a BMM agent skill).

P3.2's `bmad-qa-generate-e2e-tests` overlay uses `[workflow]` accordingly. Round-2 G79 originally proposed `[agent]` (consistent with bmad-create-architecture's MISINTERPRETED namespace); round-5 C1 corrected after reading BMM SKILL.md directly.

### Install-time copy mechanism (C3)

BAM's `<bam-skill-dir>/customize-template/<bmm-skill>/customize.toml` is copied to `{project-root}/_bmad/custom/<bmm-skill>.toml` by the BMAD installer at install-time. The BMAD customize resolver then picks it up via the standard 3-layer merge (per Wave 0 ADR-001 — `_bmad/scripts/resolve_customization.py`). No new resolver behavior required; the overlay leverages existing BMAD infrastructure.

### Customize-template overlay rationale (D4)

Overlay's specific-path `persistent_facts` (`file:{project-root}/_bmad-output/bbp/project-context.md`) is preserved from ADR-015 G6 convention. Rationale is **explicit clarity** — the path matches `bmad-bam-finalize`'s canonical emit path; an overlay reader can verify alignment by inspection. This is NOT due to BMM glob-incompatibility: BMM's own `bmad-create-architecture` uses `**` in its persistent_facts (empirically verified 2026-05-17). Future revisit if specific path drifts.

## Consequences

- **Lifecycle tier complete** after P3.2 lands (4 skills + QG-M2 v1.1.0 + QG-M1 v1.0.0 blocking + QG-D1 v0.1.0 partial).
- **Atlas fragments 24 → 37** (~54% growth; discovery scaling challenge — future wave may need `resources/INDEX.md` for fragment navigation).
- **Atlas anti-patterns 4 → 8** (4 new from P3.2).
- **Atlas glossary 6 → 13** (7 new terms, all `provisional` status).
- **Atlas menu codes 8 → 12** (ZON, ZOF, ZMT, ZTG added — all 3-char Z-prefix per ADR-013).
- **Wave P3 reaches ~56% complete** (9 of 16 platform skills: 1 P2.1 + 4 P3.1 + 4 P3.2).
- **QG-M1 v1.0.0 downstream impact:** QG-M2's `depends-on: [QG-M1]` resolution now requires human-review pass; downstream gate consumers re-evaluate.
- **Custom-tier projects MUST re-run tier-model** post-P3.2 to emit schema 1.1; explicit fail-fast at exit 70 protects against silent corruption.
- **Effort honestly revised** from 65-80h kickoff target to ~84-95h AI-augmented (~125.5h gross) due to spec §6.3 fragment compliance + cross-skill DAG smoke + integration tests + design/plan/PR drafting time. AI-augmentation factor is estimate-not-empirical (calibration vs P3.1 actuals pending merge); conservative band 88-100h if factor is 15% rather than 25-30%.

## Alternatives Considered

- **Approach B (loose-coupling between lifecycle skills):** rejected; weaker evidence for QG-M2 C6 and QG-M1 H4 (cross-skill verification requires shared schema, not narrative-only references).
- **Approach C (max-decomposition: split migration into 2 skills — cross-shard + cross-tier separately):** rejected (violates spec §5.1 lock; breaks audit check (i) which expects 4 lifecycle skill names; cross-tier and cross-shard share enough of the dual-write/verify/cutover machinery that splitting yields fragments-per-skill < 3 — under spec §6.3 floor).
- **QG-C1 mirror in offboarding output (round-1 G2):** REJECTED in round-2 G15 (premature commitment to P9 Trust schema; narrative forward-pointer suffices).
- **`[workflow]` vs `[agent]` namespace for overlays:** round-2 G79 originally chose `[agent]`; round-5 C1 corrected to `[workflow]` after empirical verification of BMM SKILL.md headers.
- **Single rolled-up `lifecycle.md` artifact (analog of ADR-015 Q1 Approach B):** rejected on same grounds — per-skill JSON evidence supports partial-progress states and is QG-M2-resolvable.
- **Synchronous migration (Approach B, downtime acceptable):** rejected; zero-downtime is the SaaS-table-stakes baseline; partial migration acceptance would create a tier-cliff between "real" SaaS deployments and BAM-deployed ones.
- **Promote QG-D1 directly to v1.0.0 blocking:** rejected; H-criteria (RPO/RTO, failover-drill, multi-region replication, backup integrity, region-failure runbook) belong in P10 ops `design-disaster-recovery` — premature commitment here would constrain P10 schema.

## Revisit triggers

- If real-IDE shows fragment-density-creep, revisit Q9 hard cap (inherited from ADR-015 Q6).
- If BMM upstream gains different `**` glob expansion behavior, revisit specific-path overlay rationale (D4 informational note — spec retains specific-path for explicit clarity, not glob-incompatibility).
- If retention regulatory floors drift (new regulation lands), revisit floor matrix in `legal-hold-and-retention-windows.md`.
- If QG-M1 v1.0.0 downstream resolution behavior surfaces unexpected issues (downstream consumers expecting v0.x partial semantics), revisit promote-vs-stay-partial decision.

**Explicit deferred items:**
- `pseudonymization` full coverage → PX-Glossary wave (or P9 Trust if it surfaces there first).
- KV-cache cross-tenant attack tests → P5 ai (`design-model-cache-isolation`); P3.2 test-catalogue cross-tenant-cache category ships with `must_have: 0`.
- QG-D1 H-criteria (5 items: RPO/RTO, failover-drill, multi-region replication, backup integrity, region-failure runbook) → P10 ops (`design-disaster-recovery`).
- QG-C1 creation + offboarding-policy.json QG-C1 mirror → P9 Trust.
- Full noisy-neighbor mitigation (quotas + rate-limit policy) → P3.3 Commercial (`design-rate-limit-per-tenant`).
- Tier-2 audit retro-fit (if needed) → discovered at Tier-2 verification (see spec Section 5.6.5).
- BMM target skill non-existence (R3.2.6) → revisit at writing-plans pre-implementation verification (TRIGGERED 2026-05-17 for `bmad-design-test-strategy`; overlay deferred).
- BMM `bmad-design-test-strategy` overlay → wave when BMM ships the skill OR after BAM petitions BMM per roadmap §19.10 upstream contribution pathway.
- Tier-1 audit extension for QG checklist frontmatter validity → future wave (gap noted; not P3.2 scope).
- Cross-module Atlas resource discovery + namespacing → P4+ when data module introduces conflicts.

## Risk register (per spec §5.5.1)

| Risk ID | Risk | Mitigation |
|---|---|---|
| R3.2.1 | Schema 1.0→1.1 auto-fill confuses consumers | Explicit fail-fast at exit 70 for custom-mode 1.0; clear diagnostic; fixture test `schema-1.0-custom-fails` |
| R3.2.2 | QG-M1 partial→blocking breaks downstream | Major version bump + ADR-016 documents transition; downstream re-evaluate resolution |
| R3.2.3 | BMM overlay brittle on upstream change | Pin to v6.6.0 via header comment; overlay smoke-test catches structural drift; namespace-matches-target convention empirically verified |
| R3.2.4 | Cross-skill soft-input parsing edge cases | `references_degraded` flag + per-skill fallback policy per Section 2.0 |
| R3.2.5 | QG-D1 partial premature if P10 needs different schema | v0.1.0 minimal scope (auto-only); H-criteria designed at P10 time |
| R3.2.6 | BMM target skill non-existence (TRIGGERED for bmad-design-test-strategy 2026-05-17) | Mitigation EXECUTED: overlay deferred; scope reduced to 1 overlay; revisit when BMM ships the skill |

## Related work

- Spec: `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` (156 enhancement decisions integrated across 7 design-rounds)
- Plan: `docs/superpowers/plans/2026-05-17-p3-2-lifecycle.md`
- INDEX row: `_bmad/_memory/atlas/architecture-decisions/INDEX.md`
- QG-M2 v1.1.0 checklist: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M2.md`
- QG-M1 v1.0.0 checklist: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M1.md`
- QG-D1 v0.1.0 checklist: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-D1.md`
- 13 new fragments + 4 anti-patterns + 7 glossary terms under `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/`
- 4 new skills under `src-v6/bmad-bam-platform/2-modules/`
- 1 BMM overlay at `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-multi-tenant-testing/customize-template/bmad-qa-generate-e2e-tests/customize.toml`
