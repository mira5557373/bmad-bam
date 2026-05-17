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
  - "Workflow inputs declared in bmad-skill-manifest.yaml are honored by Atlas's workflow runner; required-vs-soft distinction is workflow-enforced via step-01 precondition checks"
  - "Menu codes ZMM/ZDP/ZFM/ZTT (new) and ZAT/ZST/ZFI/ZTN (migrated from A/S/F/D) are unique and conform to ADR-013's `Z<2 chars>` Z-prefix format. P3.0 deferred the migration; P3.1 picks it up."
  - "Customize-template overlay path convention is `<bam-skill-dir>/customize-template/<bmm-skill-name>/customize.toml` (BAM-internal convention; spec §7.2 does not specify a path; smoke-test verifies BMAD's three-layer merge resolves correctly)"
  - "`per_tenant_attribution.storage` accepts `mixed` as a 4th value when `tenancy_model: hybrid` (spec §3 schema lists 3 values for non-hybrid cases; `mixed` covers the per-tier override scenario where different tiers use different attribution mechanisms). Validator at `bmad-bam-design-finops-model/steps/step-07-v-verify-completeness.md` enforces the 4-value enum."
dependencies-on-other-decisions:
  - 2026-05-13-006
  - 2026-05-13-008
  - 2026-05-16-009
  - 2026-05-16-010
  - 2026-05-16-011
  - 2026-05-16-012
  - 2026-05-16-013
  - 2026-05-16-014
generated-by: claude-opus-4-7
authored-by: collaborative
---

# ADR 015 — Wave P3.1 Foundation Skills design decisions

## Context

Wave P3.1 ships 4 new platform workflow skills (modular-monolith, deployment-topology, finops-model, tenant-tier-model — spec §5.1 #2-5) plus QG-F1 (Foundation, blocking) and QG-M1 (Module Architecture, partial). The 4 skills cover the remaining Foundation-tier decisions after design-tenancy-model (P2.1) — bounded-context decomposition, deployment shape, unit economics, tier matrix. Each produces a structured JSON artifact that QG-F1 verifies. Together the 5 Foundation skills (1 from P2.1 + 4 from P3.1) constitute the "Foundation gate" — every module-level decision (P3.2 Lifecycle, P3.3 Commercial, P3.4 Brownfield) builds on these.

Sequencing follows spec §5.1 ordering: tenancy-model first (load-bearing for everything else), then the 4 P3.1 skills with dependencies as locked per coupling matrix (§2.3 of design doc). Tenancy-first inverts canonical DDD ordering (which puts domain modeling before infrastructure including tenancy), but multi-tenant SaaS practice has shown tenant boundaries materially affect bounded-context shape (e.g., billing-as-tenant-aware-vs-tenant-agnostic is structurally different). The inversion is deliberate.

P3.1 also picks up two pieces of work that P3.0 deferred:
1. **Z-prefix menu-code migration** (per ADR-013): existing A/S/F/D codes migrated to ZAT/ZST/ZFI/ZTN alongside 4 new codes (ZMM/ZDP/ZFM/ZTT). All 8 codes now conform to the `Z<2 chars>` format.
2. **Customize-template overlay validation** (per spec §7.2): a minimal overlay of BMM's `bmad-create-architecture` skill validates the BAM-extension overlay mechanism with the smallest possible footprint.

## Decision

Q1-Q10 + R1-R12 lock-ins (full detail in design spec §3 at `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md`):

- **Q1/R1 — Per-skill evidence:** Each skill writes both `<decision>.md` (human) AND `<decision>.json` (machine contract) — JSON is the canonical input for downstream skills + QG-F1 auto-checks. Replaces brittle markdown-parsing.
- **Q2 — modular-monolith default:** Hybrid DDD + ports/adapters. Decision matrix scores 4 options (ddd-pure / ports-pure / hybrid / vertical-slice) against 6 axes (tenant-count fit, team size, domain complexity, migration cost, test ergonomics, AI-agent comprehensibility).
- **Q3 — deployment-topology tight coupling:** Required input `tenancy-decision.json`. 4 tier-mapped rollout defaults baked in (free=aggressive_canary, starter=canary, pro=canary, business=blue_green_synthetics, enterprise=blue_green_pilot).
- **Q4/R1 — finops-model required inputs:** All 3 upstream artifacts (tenancy + tier + deployment). No markdown parsing.
- **Q5/R2 — tier-model shape:** 5 default tiers + `--custom-tiers N` flag (N ∈ 3..7); tentative downstream-contract hints (`rollout_tier_hint`, `cost_ceiling_usd_per_month_hint`, `upgrade_mode`) overridable downstream; `verify-coherence` reconciliation step at end of finops.
- **Q6/R3 — fragment density:** Hard cap 5/skill; 18 total fragments (5+4+4+5 after consolidation).
- **Q7 — fragment reuse:** Stand-alone per skill; cross-workflow data via manifest `inputs:`, not cross-skill fragment Reads.
- **Q8/R4 — anti-patterns:** 4 — tenancy-as-afterthought, deployment-without-cohorts, price-without-cost-attribution, tier-cliff.
- **Q9/R5 — glossary:** 6 terms in CSV index (rate-arbitrage deferred to P3.3 wave).
- **Q10/R6 — overlay:** Minimal customize-template overlay for bmad-create-architecture (1 `activation_steps_append` entry + 1 `persistent_facts` entry).
- **R8 — QG-M1 partial:** Auto-criteria only (C1-C5); human-review deferred to P3.2.
- **R9 — menu codes:** 3-char Z-prefix per ADR-013 (correcting an earlier 2-char proposal); existing A/S/F/D migrated to ZAT/ZST/ZFI/ZTN.
- **R12 — ADR dependency chain:** 8 ADRs (006, 008, 009, 010, 011, 012, 013, 014).

### Required-input enforcement (G4 spec)

BMAD's workflow runner does NOT enforce `bmad-skill-manifest.yaml: inputs.required` — the manifest is BAM-extension declarative documentation per ADR-014. Each downstream skill's **step-01 implements an explicit precondition check**:

```bash
TENANCY_JSON="${PROJECT_ROOT}/_bmad/bam/evidence/QG-F1/tenancy-decision.json"
if [ ! -f "$TENANCY_JSON" ]; then
    TENANCY_JSON_ALT="${PROJECT_ROOT}/docs/architecture/tenancy-decision.json"
    if [ ! -f "$TENANCY_JSON_ALT" ]; then
        cat >&2 <<EOF
ERROR: tenancy-decision.json not found.
       This workflow requires bmad-bam-design-tenancy-model to have run first.
EOF
        exit 64   # POSIX usage error
    fi
fi
```

Same pattern for `design-finops-model` step-01 (checks 3 required inputs). Path resolution uses Concern-5 tool-aware fallback (`_bmad/bam/evidence/QG-F1/` → `docs/architecture/`).

### Customize-template overlay path convention (G6 spec)

`<bam-skill-dir>/customize-template/<bmm-skill-name>/customize.toml`. For P3.1's modular-monolith overlay of bmad-create-architecture:

```
src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/
  customize-template/
    bmad-create-architecture/
      customize.toml
```

This is a BAM-internal convention; spec §7.2 doesn't specify a path; smoke-test verifies BMAD's three-layer merge resolves correctly. Future BAM modules adopt the same convention.

### Sequencing inversion (G8 spec)

P3.1 sequences tenancy-model BEFORE modular-monolith. This INVERTS canonical DDD ordering (which puts domain modeling before infrastructure including tenancy). BAM deliberately chose this inversion because multi-tenant SaaS practice has shown tenant boundaries materially affect bounded-context shape (tenant-aware billing/auth/notifications are structurally different from tenant-agnostic versions). Documented in design spec §2.3.

## Consequences

- **Foundation tier complete** after P3.1 lands (5 skills + QG-F1 blocking gate + QG-M1 partial).
- **Menu-code namespace converges** to all-Z-prefix per ADR-013 (P3.0 deferral closed out). All 8 platform-module codes now `Z<2 chars>`.
- **Future BAM modules adopt** the same per-skill JSON-evidence + tool-aware-path patterns established here.
- **QG-M1 stays partial** until P3.2 ships lifecycle skills (onboarding/offboarding/migration); P3.2 promotes to blocking with H-criteria.
- **Customize-template overlay convention validated**; future modules (data/ai/ux/rag/...) follow.
- **Wave P3 ~31% complete** after P3.1 (5 of 16 platform skills including P2.1's tenancy-model).
- **P2.1 modification** to design-tenancy-model is additive (new JSON output; existing markdown unchanged) — no breaking change to consumers.
- **verify-coherence step** in finops-model produces `foundation-coherence.json` consumed by QG-F1's C3 auto-criterion. v6.0 ships zero error-severity rules (all mismatches are warns); future revisions can promote specific mismatches to errors as patterns emerge.

## Alternatives Considered

- **Single rolled-up `foundation.md` artifact (Q1 Approach B):** rejected; would require migrating QG-M2's existing per-file `evidence-depends-on` reference + complicates partial-progress states.
- **Soft coupling for deployment-topology (Q3 Approach B):** rejected; ungrounded deployment recommendations produced without tenancy decision are misleading.
- **3 tiers in tier-model (Q5 Approach D):** rejected; contradicts spec §5.1's explicit 5-tier listing.
- **2-char menu codes (Q9 Approach A):** rejected on Round-2 self-review (G1) — contradicts ADR-013; corrected to 3-char Z-prefix.
- **No customize-template overlay in P3.1 (Q10 Approach B):** rejected; want to validate §7.2 mechanism with minimal real use early.
- **Workflow-runner-enforced inputs (G4 alternative):** rejected; BMAD upstream doesn't enforce manifest `inputs.required`, so step-01 precondition checks are the pragmatic option (per ADR-014 manifest-as-declarative stance).
- **Domain-first sequencing (G8 alternative):** rejected; for multi-tenant SaaS, tenancy structurally constrains bounded-context shape, so tenancy-first is the right inversion.

## Revisit triggers

- If real-IDE Plan C in any future wave shows fragment-density-creep, revisit Q6 hard cap.
- If `foundation-coherence.json` reports persistent mismatches in real projects, revisit Q5's hint-vs-override pattern (escalate to explicit reconciliation workflow).
- If BMAD upstream changes `bmad-skill-manifest.yaml` schema, revisit ADR-014's BAM-extension stance + this ADR's manifest-input declarations.
- If PX-Glossary wave defines a different storage format, revisit Q9 CSV-index choice and migrate.
- If P3.2's lifecycle skills reveal QG-F1 evidence-schema gaps (e.g., need lifecycle-readiness fields), promote ADR-015 to ADR-015-revised.
- If user-facing customize-template overlay path proves brittle (G6 assumption fails — e.g., BMM changes resolver semantics), revisit overlay convention.
- If 8 Z-prefix codes prove insufficient as more platform skills land (P3.2/P3.3/P3.4 add ~11 more), revisit ADR-013's 3-char format for adequacy.

## Related work

- Spec: `docs/superpowers/specs/2026-05-17-p3-1-foundation-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-17-p3-1-foundation.md`
- QG-F1 checklist: `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-F1.md`
- QG-M1 checklist (partial): `src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M1.md`
- Overlay: `src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith/customize-template/bmad-create-architecture/customize.toml`
