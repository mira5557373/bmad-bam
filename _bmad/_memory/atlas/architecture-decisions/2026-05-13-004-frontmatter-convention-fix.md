---
id: 2026-05-13-004
title: Fix std-frontmatter internal drift; document convention map
status: accepted
date: 2026-05-13
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMAD ecosystem uses mixed frontmatter conventions empirically — BMM templates use camelCase for metadata (stepsCompleted, workflowType), snake_case for template variables (project_name, sections_completed), and kebab-case for enum values (in-progress, ready-for-dev)
  - There is no canonical "BMAD snake_case" rule across all frontmatter
  - MADR-lite kebab for ADRs is an external convention worth preserving (tooling compatibility)
dependencies-on-other-decisions: []
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

`std-frontmatter.md` had internal drift: `last_reviewed` used snake_case but `tested-against` used kebab-case. Both are multi-word descriptive keys; the inconsistency was a real bug, not a "BAM convention exception."

Deep empirical analysis of `external/bmad-method/src/bmm-skills/` (BMM templates) and `external/bmad-tea/src/agents/bmad-tea/` (bmad-tea persona-skill) showed BMAD has no canonical "snake_case rule" — different contexts use different conventions:
- Template state metadata (BMM PRD templates) → camelCase
- Template interpolation variables → snake_case
- Enum values → kebab-case
- TOML keys (customize.toml) → snake_case
- ADR frontmatter (BAM-invented; MADR-lite external standard) → kebab-case

BAM's effective convention is snake_case for non-ADR frontmatter. The `tested-against` field was inconsistent with that effective rule.

## Decision

1. Rename `tested-against:` → `tested_against:` across std-frontmatter spec + 9 fragment/pattern files (3 standards files also updated where they referenced their own frontmatter).
2. Add a per-context convention map to `std-frontmatter.md` so future BAM authors know which convention applies where.
3. Add a note to `std-adr.md` clarifying that ADR kebab-case is intentional MADR-lite compat and is the documented exception to BAM's snake_case rule.

## Consequences

- Future BAM fragments/patterns use `tested_against` (snake_case).
- ADRs continue to use kebab-case fields (`related-personas`, `superseded-by`, etc.) per MADR-lite — preserved as the documented external-convention exception.
- The convention map prevents future drift: any new BAM frontmatter field has a documented rule to follow.
- No spec change to `docs/v6-final-architecture.md` needed — std-frontmatter is installed-content, not spec text. Spec §6.2 says "10 fields" without prescribing kebab vs snake.

## Alternatives Considered

- **Migrate ADRs to snake_case too** — rejected; breaks MADR-tooling compatibility for no internal benefit. BAM gains nothing by fighting an external well-known convention.
- **Keep `tested-against` as kebab; document the inconsistency as a BAM quirk** — rejected; the drift was a real bug. Fixing aligns BAM with its own effective convention.
- **Move to camelCase like BMM template metadata** — rejected; BMM uses camelCase only for workflow-state tracking fields, not for content-classification frontmatter. snake_case matches BAM's existing step-file / manifest / TOML conventions.
