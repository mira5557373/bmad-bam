---
id: 2026-05-16-011
title: Decouple module-help.csv phase column from directory naming (BAM-structural dirs / BMM-lifecycle phase column)
status: accepted
date: 2026-05-16
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMM module-help.csv `phase` column uses lifecycle enum (`1-analysis`, `2-planning`, `3-solutioning`, `4-implementation`, `anytime`). Verified empirically at external/bmad-method/src/bmm-skills/module-help.csv.
  - BAM directory structure uses module-specific phase prefixes (`1-foundation/`, `2-storage/`, `2-modules/`, `9-infrastructure/`). Established by Concern 5 refactor (ADR 008).
  - These taxonomies are semantically different — lifecycle phase (when in user's workflow) vs structural phase (where in BAM's module).
  - BMM itself empirically decouples: `bmad-generate-project-context` lives in `3-solutioning/` directory but has `phase: anytime` in module-help.csv. Verified at external/bmad-method/src/bmm-skills/module-help.csv.
dependencies-on-other-decisions:
  - 2026-05-13-008   # Module shape BMM-canonical — established the directory phase prefixes
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

Roadmap v4 deep validation surfaced the question: when BAM populates module-help.csv's `phase` column for a workflow, what value goes there? Two candidates:

(a) The directory name — `1-foundation`, `2-modules`, `9-infrastructure`, etc. — which matches BAM's structural grouping per Concern 5 (ADR 008)

(b) BMM's lifecycle enum — `1-analysis` / `2-planning` / `3-solutioning` / `4-implementation` / `anytime` — which is what BMAD's installer + tooling expect for the `phase` column semantically

Empirical check confirms BMM **itself decouples** these: `bmad-generate-project-context` lives at `external/bmad-method/src/bmm-skills/3-solutioning/bmad-generate-project-context/` (directory says solutioning) but its module-help.csv row has `phase: anytime` (column says anytime). So directory naming and phase column are semantically independent in BMM.

## Decision

**Decouple them in BAM too.** Directory naming uses BAM-structural prefixes (the existing convention from ADR 008). The module-help.csv `phase` column uses BMM-lifecycle enum.

**Mapping rule:**

| BAM workflow type | Directory | module-help.csv `phase` |
|---|---|---|
| Persona scaffolding (Atlas SKILL.md etc.) | `<mod>/1-foundation/bmad-bam-agent-<persona>/` | `anytime` |
| Design workflows (design-tenancy-model etc.) | `<mod>/2-<topic>/bmad-bam-design-*/` | `3-solutioning` |
| Verification workflows (verify-*) | `<mod>/4-readiness/bmad-bam-verify-*/` | `4-implementation` |
| Cross-family workflows (P11) | `bmad-bam-platform/2-modules/bmad-bam-*` | `3-solutioning` |
| Infrastructure (migrate, backup, smoke-test, finalize) | `<mod>/9-infrastructure/bmad-bam-*/` | `anytime` |

Existing platform module-help.csv values are `solutioning` for all 4 skills — consistent with this mapping (the design/verify workflows ARE solutioning-phase activities).

## Consequences

- Directory grouping remains BAM-discoverable for human navigation
- `phase` column interoperates with BMM's expected enum; BMAD installer phase queries work correctly
- Spec §6.0 and §6.1 wording should clarify the decoupling rule (deliverable in Wave P3.0 prereq spec patch)
- All future BAM modules (data, ai, ux, rag, integration, trust, ops) follow this rule when generating their module-help.csv
- Tier-1 audit check (i) — workflow-name allow-list — also enforces phase-column enum (only the 5 BMM values accepted)

## Alternatives Considered

- **Use BAM-structural values in phase column too** — rejected because BMAD's installer/tooling expects lifecycle enum; using structural values would break phase-aware queries (e.g., "show me all solutioning workflows across modules").
- **Use BMM-lifecycle for directory naming too** — rejected because BAM has multiple workflows within a lifecycle phase that benefit from sub-grouping (e.g., `2-storage/`, `2-modules/` both fall under `3-solutioning` lifecycle). Structural grouping serves human navigation; lifecycle is for tool query.
- **Petition BMM for richer phase taxonomy** — deferred to post-v6.0 via the BMM upstream contribution pathway (ADR cited from roadmap §19.10). The decoupling works fine for now without upstream change.
