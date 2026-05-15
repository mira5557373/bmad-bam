---
id: 2026-05-13-006
title: Refactor module shape to BMM canonical (Atlas-as-skill)
status: accepted
date: 2026-05-13
persona: atlas
related-personas: [kai]
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - "BMM (external/bmad-method/src/bmm-skills/) is the canonical reference pattern for module shape"
  - "bmad-tea (external/bmad-tea/src/agents/bmad-tea/) is the canonical reference for persona-as-skill structure"
  - "Marketplace.json should list only real skills; module-root content dirs are unsupported by BMAD's installer"
  - "Cross-skill content access by explicit path is acceptable; universal-glob only loads project-context.md-named files"
dependencies-on-other-decisions:
  - "2026-05-13-005"
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

BAM v6 module shape (as built in P2.1) had module-root `agents/`, `data/`, and `scripts/` directories. The earlier audit surfaced that BMAD's marketplace mechanism doesn't support module-root content; the RDP workaround listed them as "skills" in marketplace.json — semantic misuse with cosmetic risk if BMAD's skill validator/registry gets stricter.

Empirical analysis of BMM (28 skills in `external/bmad-method/src/bmm-skills/`) and bmad-tea (`external/bmad-tea/`) confirmed:

1. BMM has NO module-root content directories. Module root contains only `module.yaml` + `module-help.csv`. All content lives inside `skills/<skill-name>/`.
2. bmad-tea structures its persona as a SKILL: `agents/bmad-tea/SKILL.md` + `customize.toml` + `resources/`. The persona is invocable; its resources are referenced by other skills via explicit paths.
3. Neither BMM nor bmad-tea has a `foundational_fragments` field in customize.toml. Every persistent_facts entry is either the universal-glob or a specific file reference. The BAM-invented `foundational_fragments` was an LLM-hint annotation no tool consumed.

## Decision

Refactor `bmad-bam-platform` to BMM-canonical shape:

- **Atlas as a skill:** `skills/bmad-bam-agent-atlas/` becomes a real BMAD skill — invocable as `bmad run bmad-bam-agent-atlas` AND the canonical home for shared platform-module resources (per bmad-tea convention).
- **Resources consolidated:** all fragments + patterns + checklists + standards move to `skills/bmad-bam-agent-atlas/resources/{fragments,patterns,checklists,standards}/`.
- **Scripts skill-local:** `scripts/post-install.sh` + `scripts/generate-sentinel.py` move to `skills/bmad-bam-finalize/scripts/`. No module-root `scripts/` dir.
- **Marketplace.json:** 6 entries (3 real skills + agents/data/scripts misuse) → 4 real-skill entries (Atlas + smoke-test + finalize + design-tenancy-model).
- **module-help.csv added:** at module root, per BMM convention.
- **foundational_fragments dropped:** from design-tenancy-model's customize.toml. Workflow step bodies cite specific fragments by name where needed (bmad-tea pattern verified at `external/bmad-tea/src/workflows/testarch/.../atdd-checklist-template.md:344`).

Atlas's customize.toml auto-loads its own content via `persistent_facts = ["file:{project-root}/**/project-context.md", "file:{skill-root}/resources/fragments/*.md", "file:{skill-root}/resources/patterns/*.md", "file:{skill-root}/resources/standards/*.md"]` so the persona has its knowledge in context when invoked directly.

Workflow skills (design-tenancy-model and future P2.2+ workflows) reference Atlas's shared resources via EXPLICIT PATHS in step bodies: `_bmad/bam-platform/bmad-bam-agent-atlas/resources/<subdir>/<file>.md`. Universal-glob `**/project-context.md` does NOT auto-load arbitrary fragments — cross-skill content access is by explicit path, not glob.

## Consequences

- **Marketplace.json semantic misuse eliminated.** Every entry resolves to a real skill directory.
- **BAM aligns with BMM-canonical pattern.** Future contributors who know BMM onboard naturally.
- **Spec §6.1 simplifies.** "Follow BMM module shape" — empirically grounded against `bmm-skills/` and `agents/bmad-tea/`.
- **Path references in workflow steps updated atomically.** No transitional state. All references now use `_bmad/bam-platform/bmad-bam-agent-atlas/resources/...` for shared content and `_bmad/bam-platform/bmad-bam-finalize/scripts/post-install.sh` for the activation script.
- **Future P2.2+ modules adopt the same shape.** Each new module (data, ai, ux, ...) ships a `bmad-bam-agent-<persona-name>/` skill as the canonical home for its shared content.
- **Zero BAM-invented infrastructure divergences from canonical BMAD remain.** After this commit, the module structure is indistinguishable from BMM's pattern in shape.

## Alternatives Considered

- **Petition BMAD upstream for `modulePaths` field** — rejected; long lead time; alignment with BMM works today without upstream changes.
- **Stay with marketplace skill-array workaround** — rejected; forever-debt; cosmetic risk; future BMAD installer strictness could break.
- **Each workflow skill duplicates fragments (DRY violation)** — rejected; massive duplication; bmad-tea shows the persona-skill-as-canonical-home pattern works without duplication for the heavy content (knowledge fragments).
- **Replicate per persona-skill (bmad-tea CSV pattern)** — partial precedent: bmad-tea DOES replicate `tea-index.csv` across 9 locations (verified by md5sum). BAM declines this because P2.1 has only one persona (Atlas); replication overhead is unjustified until multiple personas exist. Future P2.2+ modules can revisit if their personas need their own index copies.
- **Standalone `bmad-bam-standards` skill (fake-skill pattern)** — rejected; introduces a non-invocable "skill" that's just a content holder. Atlas-as-skill is a real persona AND the content home; one skill, two roles. Cleaner.


## Refinement note (Concern 5, ADR 008, 2026-05-13)

ADR 008 refines this decision's directory layout. The core "Atlas-as-skill" claim and "everything is a skill" stance from this ADR stand — Atlas remains a real BMAD skill (invocable, marketplace-listed), and shared content lives in its `resources/`. What changes is WHERE that skill lives in source:

- This ADR: `skills/bmad-bam-agent-atlas/`
- Refined (ADR 008): `1-foundation/bmad-bam-agent-atlas/` (phase-numbered, BMM-canonical)

The `skills/` wrapper is dropped in favor of phase-numbered grouping so PluginResolver Strategy 1 succeeds (common parent of skills = module dir = module.yaml location). Cross-skill content access by explicit path (bmad-tea pattern, this ADR's §"Decision" item 2) is unchanged in semantic, just with new path prefixes (`_bmad/bbp/...` instead of `_bmad/bam-platform/...`).

See ADR 008 for the empirical chain.
