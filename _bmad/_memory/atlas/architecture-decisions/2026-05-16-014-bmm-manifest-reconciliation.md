---
id: 2026-05-16-014
title: Keep BAM-extended bmad-skill-manifest.yaml (10 fields) — BMM uses minimal 2-field SKILL.md frontmatter; document divergence
status: accepted
date: 2026-05-16
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMM has NO `bmad-skill-manifest.yaml` file. Verified empirically at external/bmad-method/src/bmm-skills/{1-analysis,3-solutioning}/* — only SKILL.md + customize.toml present.
  - BMM's manifest-equivalent is minimal 2-field YAML frontmatter in SKILL.md: `name` + `description` only. Verified at external/bmad-method/src/bmm-skills/3-solutioning/bmad-create-architecture/SKILL.md.
  - BAM currently has both: `bmad-skill-manifest.yaml` (10 fields per spec §6.2) AND `name`+`description` frontmatter in SKILL.md. Verified across all 4 existing BAM skills (atlas, smoke-test, finalize, design-tenancy-model).
  - Spec §6.2's 10-field manifest is BAM-INVENTED (no BMM equivalent). Includes `latency_budget`, `recommended_capabilities`, `minimum_persona_version`, `inputs`, `outputs`, `gate`, `dependencies`, etc.
dependencies-on-other-decisions:
  - 2026-05-13-008   # Module shape BMM-canonical
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

Roadmap v4.2 deep validation surfaced an empirical finding: BMM has no `bmad-skill-manifest.yaml` file. Manifest data is minimal 2-field SKILL.md YAML frontmatter (`name` + `description`).

Spec §6.2 declares BAM uses `bmad-skill-manifest.yaml` with 10 fields. Verifying against actual BMM skills proves this is **BAM-invented**, not BMM-canonical.

Three reconciliation options:

| Option | Description | Tradeoff |
|---|---|---|
| (a) Align to BMM minimal | Move `name`+`description` to SKILL.md frontmatter only; drop `bmad-skill-manifest.yaml`. Inputs/outputs/gates etc. live in step file frontmatter (BMM convention). | + BMM-canonical. − Loses BAM's richer per-skill metadata. |
| (b) Keep BAM extension | Keep `bmad-skill-manifest.yaml`; document as BAM extension. Add `name`+`description` to SKILL.md frontmatter (BMM-required minimum, already done for existing 4 skills). | + Preserves BAM richness for `latency_budget`, `inputs`, etc. − Maintains documented divergence. |
| (c) Petition BMM upstream | Propose 10-field manifest to BMM. | + Long-term canonical. − Long lead time; not blocking for v6.0. |

## Decision

**Option (b) — keep BAM extension.** Retain `bmad-skill-manifest.yaml` as BAM-specific extension; ensure every SKILL.md has BMM-required `name`+`description` frontmatter (already true for existing 4 skills).

**Spec §6.2 reconciliation (deliverable in Wave P3.0):** patch to read approximately:

> BAM extends BMM's minimal SKILL.md frontmatter (which contains only `name` + `description`) with a separate `bmad-skill-manifest.yaml` providing 8 additional fields: `latency_budget`, `recommended_capabilities`, `minimum_persona_version`, `inputs`, `outputs`, `gate`, `dependencies`, `last_reviewed`. BMM-required `name` + `description` MUST also be present in SKILL.md frontmatter.

**Upstream divergence tracking:** Record at `_bmad/_memory/atlas/upstream-issues/2026-05-16-bmm-manifest-divergence.md` per roadmap §19.10. Eligible for future BMM contribution if BAM richer-manifest pattern proves valuable elsewhere.

## Consequences

- v6.0 ships with BAM-extended manifest (no breaking change to existing skills)
- Spec §6.2 wording aligns with empirical state (no spec drift)
- Every new BAM skill (P3+ waves) MUST have both files: SKILL.md with name+description frontmatter, AND bmad-skill-manifest.yaml with 10 fields
- Tier-1 audit check (i) — workflow-name allow-list — enforces BOTH files present per skill
- Future BMM contribution (Option c) becomes a post-v6.0 candidate if BAM's richer manifest model gets community traction

## Alternatives Considered

- **Option (a) BMM minimal** — rejected; loses too much per-skill metadata. `latency_budget` and `recommended_capabilities` matter for AI-augmented workflow execution (spec §5.10). Eliminating them would weaken Wave P5 (ai module) where latency budgets are core.
- **Option (c) upstream contribution** — deferred. Not blocking v6.0; pursue post-v6.0 if BAM contribution to bmad-method becomes a roadmap item.
- **Inline 10 fields into SKILL.md frontmatter** — rejected; BMM convention keeps SKILL.md frontmatter minimal (`name`+`description`). Bloating it would itself be a BMM-incompatibility.
