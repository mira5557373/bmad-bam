# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
