---
id: 2026-05-16-012
title: BAM follows BMM "all-in-skills" pattern (no separate top-level workflows/ directory; TEA-style split rejected)
status: accepted
date: 2026-05-16
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMM puts every workflow under phase-numbered skill dirs (`1-analysis/`, `2-plan-workflows/`, `3-solutioning/`, `4-implementation/`). Verified empirically at external/bmad-method/src/bmm-skills/.
  - TEA splits agent persona from workflows — `src/agents/bmad-tea/` for persona-as-skill + `src/workflows/testarch/` for workflow skills. Verified empirically at external/bmad-tea/src/.
  - Concern 2 fix (ADR 006) already committed BAM to Atlas-as-skill pattern (BMM-style) — extending to "everything is a skill" is the natural finish.
  - Cross-family workflows (P11 wave per roadmap §5.9) live under `bmad-bam-platform/2-modules/` per spec §5.9.
dependencies-on-other-decisions:
  - 2026-05-13-006   # Module shape BMM-aligned (Atlas-as-skill)
  - 2026-05-13-008   # Module shape BMM-canonical (phase-numbered grouping)
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

Roadmap v4 §19.6 surfaced a structural question: BAM has two empirical precedents for organizing workflows.

**BMM precedent (used since BMAD 6.0):** Every workflow is a SKILL. Phase-numbered skill dirs contain skills directly. No separate `workflows/` directory at module root. The module-root has only `module.yaml` + `module-help.csv` + phase-numbered skill dirs.

**TEA precedent (community module):** Splits structure — `src/agents/bmad-tea/` (persona-as-skill) + `src/workflows/testarch/...` (workflow skills referencing persona resources). Two top-level dirs.

The question: which pattern should BAM v6 follow for all future modules (data, ai, ux, rag, integration, trust, ops)?

## Decision

**BAM follows BMM all-in-skills.** Every workflow is a skill. No separate `workflows/` directory. Persona-as-skill (Atlas, Nova, etc.) holds shared content in `resources/`; workflow skills (design-*, verify-*, etc.) reference persona resources via explicit cross-skill paths (the TEA pattern, but using BMM's directory structure).

**Per-module structure:**

```
src-v6/bmad-bam-<module>/
├── module.yaml
├── module-help.csv
├── 1-foundation/
│   └── bmad-bam-agent-<persona>/    # persona-as-skill (BMM)
│       ├── SKILL.md
│       ├── customize.toml
│       └── resources/
│           ├── fragments/
│           ├── patterns/
│           ├── checklists/
│           └── standards/
├── 2-<topic>/                       # workflow skills
│   └── bmad-bam-design-<name>/
├── 4-readiness/                     # verification workflows
│   └── bmad-bam-verify-<name>/
└── 9-infrastructure/                # infra workflows (smoke-test, finalize, backup, migrate)
    └── bmad-bam-<infra-name>/
```

**Cross-family workflows** (Wave P11 per spec §5.9): live in `bmad-bam-platform/2-modules/` since spec §5.9 declares them platform-owned. NOT in a separate `workflows/` dir.

## Consequences

- All 8 BAM modules adopt the same shape (consistency)
- Single discovery path for skills: marketplace.json lists ALL skills uniformly; phase-numbered directory + skill name is the only key
- BMM ecosystem tooling (audit checks, installer, list-modules) sees BAM as just-another-BMM-style module
- TEA's `workflows/` split is acknowledged as a community-pre-consolidation pattern; BAM doesn't follow it
- Concern 2 fix (Atlas-as-skill) becomes the empirical lineage for every persona in future waves (Nova in P5, Iris in P6, Kai in P8, Cipher in P9, Rune in P10)
- Cross-skill content access pattern (workflow → persona's resources) uses explicit installed paths with tool-aware fallback (`.claude/skills/...` → `.cursor/skills/...` → `_bmad/<code>/...`)

## Alternatives Considered

- **Follow TEA workflows/ split** — rejected because TEA itself is community-pre-consolidation; BMM is the canonical reference and uses all-in-skills. Following TEA would create a permanent BAM divergence from BMM ecosystem expectations.
- **Hybrid: persona-as-skill + workflows/ dir** — rejected as adding complexity without benefit; the `2-<topic>/` phase-numbered dirs already provide topic grouping.
- **No persona-as-skill, only workflows** — rejected; Concern 2 fix (ADR 006) already committed to persona-as-skill for Atlas. Reverting would require re-running that refactor.
