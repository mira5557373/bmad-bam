# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0-rc1] - 2026-05-04

> **BREAKING CHANGE.** v3 is a fundamental architecture rewrite. See [`MIGRATION-V2-TO-V3.md`](./MIGRATION-V2-TO-V3.md).

### Architecture
- **BAM is now a pure knowledge-base module.** 38 BAM-specific skills reduced to 5 retained skills + native BMAD KB injection.
- **Native injection mechanism:** BAM ships `_bmad/bam/project-context.md` which every BMAD skill auto-loads via the universal glob `file:{project-root}/**/project-context.md` already present in BMAD v6.4.0 customize.toml files.
- **Aligned with BMAD v6.4.0** — no longer ships files into user-owned `_bmad/custom/`. Customize templates live in `_bmad/bam/customize-templates/` for opt-in via `bmad-customize` skill.

### Added
- `BAM-V3-PURE-KB-PLAN.md` — verified architecture plan (271 lines)
- `BAM-V3-DISSOLUTION-MAP.md` — every v2 skill's v3 disposition (220 lines)
- `BAM-V3-VALIDATOR-BASELINE.md` + `.txt` — programmatic BMAD validator audit
- `MIGRATION-V2-TO-V3.md` — user upgrade guide (245 lines)
- `src-v2/data/patterns/_index.md` — 371-line shortcode lookup (112 patterns, 23 categories)
- `src-v2/data/customize-templates/` — 3 BMAD skill enrichment templates:
  - `bmad-create-architecture.toml.example`
  - `bmad-create-prd.toml.example`
  - `bmad-correct-course.toml.example`
- `src-v2/data/runbooks/white-labeling-checklist.md` — operational runbook (replaces dissolved skill)
- `scripts/generate-pattern-index.js` — CSV-to-index generator
- `module.yaml` agents block — 14 BAM personas auto-distilled to `_bmad/config.toml [agents.*]`:
  - Atlas 🏛️ (Platform Architect), Nova 🌟 (AI Runtime), Kai 🔗 (Integration)
  - 11 specialists: Vega, Quinn, Rune, Cipher, Auditor, Helix, Bridge, Sage, Lyra, Echo, Iris
  - All tagged `team: bam | bam-platform | bam-runtime` for filtering
- Config variables with prompts: `tenant_model`, `ai_runtime`, `compliance_frameworks`

### Changed
- `src-v2/module.yaml` rewritten to BMAD v6.4.0 schema (`code: bam`, requires/optional, agents block, directories block, install hooks)
- `scripts/bam-post-install.sh` rewritten to generate `_bmad/bam/project-context.md` (the BMAD-native KB injection file)
- 5 retained skills hardened to pass BMAD's 27 normative validator rules with **zero findings**:
  - `bmad-bam-master-architecture` (was already retained)
  - `bmad-bam-tenant-onboarding` (was already retained)
  - `bmad-bam-tenant-offboarding` (was already retained)
  - `bmad-bam-mcp` → renamed to `bmad-bam-mcp-server-config`
  - `bmad-bam-rag` → renamed to `bmad-bam-rag-pipeline-design`

### Removed
- 33 BAM-specific skills (~395 files) dissolved per dissolution map. Knowledge preserved in:
  - `data/patterns/` (112 patterns, 100% shortcode coverage)
  - `data/runbooks/` (operational procedures)
  - `data/customize-templates/` (BMAD skill enrichment)
  - `_bmad/bam/project-context.md` (auto-loaded synthesis)

### Deprecated
- BAM v2 skill invocations (`bmad-bam-tenant-isolation`, `bmad-bam-security`, etc.) — see migration map

### Validation
- BMAD validator baseline (v2): 0 CRITICAL, 0 HIGH, 34 MEDIUM, 7 LOW (41 findings across 38 skills)
- BMAD validator post-v3: **0 findings across 5 skills** ✅

### Migration
See [`MIGRATION-V2-TO-V3.md`](./MIGRATION-V2-TO-V3.md). v3 is breaking by design; no automated migration script.

---

## [1.0.0] - 2026-04-05

### Added
- Initial release of BAM (BMAD for Agentic Monoliths)
- 3 specialist agents: Atlas (Platform), Nova (AI Runtime), Kai (Integration)
- 27 workflows covering foundation, module, integration, and production phases
- 30 knowledge fragments indexed with TEA-style tiered system
- 18 agent extensions for BMM, TEA, WDS, and CIS modules
- 15 agent guides following WDS pattern (replacing non-standard memories: field)
- 10 quality gate checklists (QG-F1 through QG-P1)
- 12 architecture templates
- Complete Diataxis documentation structure
- 5 test files covering all validation tiers
- CI pipeline with YAML validation and file count checks
- TSA synchronization map and validation tool

### Technical Details
- Follows official BMAD extension methodology (no custom patterns)
- All extensions use WDS agent-guides pattern (NO memories: field)
- All manifests use comma-separated strings (not arrays)
- Complete CEV (Create/Edit/Validate) structure for all workflows
- npm publishable package configuration
