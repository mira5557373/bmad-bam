# BAM Changelog

All notable changes to the BAM (BMAD Agentic Multi-tenant) extension module are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-04-09

### Summary

First stable release of the BAM extension module for multi-tenant AI-powered SaaS platforms. This release establishes BAM as a **pure extension module** that enhances existing BMAD Method agents with enterprise multi-tenant capabilities.

### Compatibility

| Dependency | Required Version |
|------------|------------------|
| Node.js | >= 20.0.0 |
| BMAD Method (BMB) | >= 1.0.0 |
| BMM | >= 1.0.0 (recommended) |
| TEA | >= 1.0.0 (optional) |
| WDS | >= 1.0.0 (optional) |
| CIS | >= 1.0.0 (optional) |

---

### Added

#### Core Architecture

- **Pure extension module architecture** - BAM operates as an extension with 0 standalone agents, integrating seamlessly with BMM, TEA, WDS, and CIS modules
- **25 agent extensions** - Comprehensive extensions for all major BMAD agent types
  - 10 BMM extensions (analyst, architect, dev, pm, po, ux, tech-writer, devops, security, master-architect)
  - 1 TEA extension (tenant isolation testing)
  - 2 WDS extensions (Saga for personas, Freya for tier UX)
  - 12 CIS extensions (brainstorming, design-thinking, disruption, futures, innovation, market, platform, presentation, problem-solver, scale, storyteller, value)
- **Consolidated architect personas** - Atlas (Platform), Nova (AI Runtime), and Kai (Integration) personas merged into single `architect-bam.yaml` extension with 24 menu items
- **QA/SM consolidation** - Quality assurance and scrum master capabilities merged into `dev-bam.yaml` per BMM guidelines

#### Workflows

- **41 workflows total** - 27 flat workflows plus 14 nested in container directories
- **Container organization:**
  - `foundation/` - 3 workflows (create-master-architecture, scaffold-foundation, validate-foundation)
  - `module/` - 3 workflows (create-module-architecture, create-module-epics, validate-module)
  - `integration/` - 4 workflows (define-facade-contract, evolve-facade-contract, facade-mismatch-recovery, validate-tool-contract)
  - `ingestion/` - 2 workflows (requirement-ingestion, triage-module-complexity)
  - `discovery/` - 1 workflow (tenant-requirements-analysis)
  - `utility/` - 1 workflow (list-tools)
- **Unified step structure** - All workflows use single `steps/` directory with mode suffixes (`step-NN-c-*`, `step-NN-e-*`, `step-NN-v-*`)
- **CEV mode support** - Every workflow supports Create, Edit, and Validate modes
- **Web search integration** - All 129 Create-mode steps include web search directives with `{date}` placeholder

#### Pattern Registry

- **6 CSV pattern files** replacing 79 static knowledge fragments:
  - `bam-patterns.csv` - Core patterns with decision criteria
  - `tenant-models.csv` - Tenant isolation patterns and trade-offs
  - `ai-runtimes.csv` - AI orchestration framework patterns
  - `quality-gates.csv` - Gate requirements and validation criteria
  - `compliance-frameworks.csv` - Compliance matrix by framework
  - `section-pattern-map.csv` - Section to pattern mapping
- **Web query integration** - All CSV files include `web_queries` column with `{date}` placeholder for current best practices

#### Agent Guides

- **110 agent guide files** in `src/data/agent-guides/bam/`
- **Context injection pattern** following WDS agent-guides approach
- **Web Research sections** - All guides include web research queries for dynamic information
- **Domain coverage:**
  - Platform architecture
  - AI runtime patterns
  - Tenant isolation strategies
  - Module architecture
  - SaaS lifecycle management
  - Tenant testing
  - Tier-based UX
  - Integration patterns

#### Quality Gates

- **8 quality gates** from foundation to production:
  - QG-F1: Foundation Gate
  - QG-M1: Module Architecture
  - QG-M2: Tenant Isolation
  - QG-M3: Module Readiness
  - QG-I1: Facade Compatibility
  - QG-I2: Tenant Safety
  - QG-I3: Agent Safety
  - QG-P1: Production Readiness
- **10 checklist files** for gate validation
- **Recovery protocol** - Structured 2-attempt recovery with mandatory escalation
- **Outcome types** - PASS, CONDITIONAL (with mitigation), FAIL (triggers recovery)

#### Templates

- **122 templates total** - 118 output artifacts + 4 special files
- **Sidecar memory templates:**
  - `sidecar-architecture-decisions.md`
  - `sidecar-contract-history.md`
  - `sidecar-runtime-preferences.md`
- **Web Research sections** - 118 templates include research query sections
- **Flat directory structure** for BMB installer compatibility

#### Configuration

- **4 configuration variables:**
  - `tenant_model` - row-level-security | schema-per-tenant | database-per-tenant
  - `ai_runtime` - langgraph | crewai | autogen | dspy | instructor | custom
  - `design_first` - true | false
  - `test_architecture` - true | false
- **Placeholder system** - `{project-root}`, `{output_folder}`, `{{template_variables}}`

#### Testing

- **169 tests** across 5 test files:
  - `test/schema.test.js` - Agent/extension YAML validation
  - `test/extension.test.js` - WDS pattern compliance
  - `test/workflow.test.js` - CEV structure validation
  - `test/install.test.js` - BMB compatibility
  - `test/integration.test.js` - Ecosystem integration

#### Documentation

- **Diátaxis structure:**
  - `docs/tutorials/` - Step-by-step learning guides
  - `docs/how-to/` - Practical recipes
  - `docs/explanation/` - Background concepts
  - `docs/reference/` - Technical specifications
- **CLAUDE.md** - Comprehensive implementation guide for AI agents
- **module-help.csv** - 32 help entries for workflow discovery

#### Tenant Models

- **Row-Level Security (RLS)** - Recommended for most SaaS (<1000 tenants)
- **Schema-per-Tenant** - For regulated industries requiring audit trails
- **Database-per-Tenant** - Maximum isolation for enterprise customers

#### AI Runtime Support

- **LangGraph** - Recommended default for state machines and workflows
- **CrewAI** - Role-based agent collaboration
- **AutoGen** - Multi-agent conversations
- **DSPy** - Prompt optimization and structured outputs
- **Instructor** - Pydantic validation for type-safe responses
- **Custom** - Framework for custom implementations

---

### Changed

#### From Pre-release Versions

- **Agent architecture** - Consolidated 3 standalone agents into extension personas
- **Step directories** - Unified from separate `steps-c/`, `steps-e/`, `steps-v/` to single `steps/`
- **Knowledge format** - Migrated from 79 markdown files to 6 CSV files with web search
- **Template location** - Flattened from subdirectories to single `templates/` directory
- **Quality gate naming** - Changed from QG-1/2/3 to domain-prefixed (QG-F1, QG-M1, etc.)
- **Manifest format** - Renamed `manifest.yaml` to `bmad-skill-manifest.yaml`

#### Extension Format

- **No memories field** - Removed support for `memories:` in favor of agent-guides pattern
- **Metadata required** - Extensions must include `extends:` and `module:` metadata
- **Prompt-based context** - Context injection via explicit prompt references

#### Workflow Structure

- **SKILL.md required** - Every workflow must have SKILL.md with frontmatter
- **workflow.md required** - Mode router document required for all workflows
- **Step naming convention** - Standardized to `step-NN-mode-description.md`

---

### Fixed

#### Installation

- **BMB compatibility** - Templates now use flat directory structure compatible with BMB installer
- **Path resolution** - Fixed `{project-root}` placeholder resolution during install
- **Permission handling** - Improved handling of npm permission issues

#### Workflows

- **Prerequisite validation** - Workflows now correctly validate prerequisites before execution
- **Mode detection** - Improved automatic detection of Create vs Edit mode
- **Step sequencing** - Fixed step execution order in complex workflows

#### Extensions

- **Base agent resolution** - Fixed extension loading when base agent not immediately available
- **Context persistence** - Sidecar memory properly persists between sessions
- **Menu item validation** - Fixed prompt ID reference validation

#### Pattern Registry

- **CSV parsing** - Fixed handling of fields containing commas
- **Year placeholder** - `{date}` now correctly resolves to current year
- **Filter syntax** - Improved pattern filter matching accuracy

---

### Removed

#### Deprecated Features

- **`memories:` field** - No longer supported in extension files
- **Separate step directories** - `steps-create/`, `steps-edit/`, `steps-validate/` no longer supported
- **Static knowledge fragments** - 79 markdown files replaced by pattern registry
- **Old manifest format** - `manifest.yaml` name no longer recognized
- **Array capabilities** - Capabilities must be comma-separated strings, not arrays

#### Legacy Files

- **Standalone agent files** - `atlas.yaml`, `nova.yaml`, `kai.yaml` removed
- **Legacy templates** - Subdirectory-organized templates removed
- **Knowledge directory** - Entire `knowledge/` directory replaced by `data/`

---

### Security

- **Tenant isolation validation** - QG-M2 and QG-I2 gates enforce tenant data separation
- **Agent safety gates** - QG-I3 validates prompt injection resistance and kill switches
- **RLS enforcement** - FORCE ROW LEVEL SECURITY required on all tenant tables
- **Audit logging** - Tenant access logging requirements in production gate

---

### Known Issues

#### Documentation

- Some cross-references between documentation files may need updating after first install
- Web search directives require internet connectivity for full functionality

#### Compatibility

- Custom extensions from v0.x require manual migration (see [Migration Guide](migration-guide.md))
- Some edge cases in pattern filter syntax may require exact pattern_id matching

#### Workarounds

- For web search failures, pattern registry data serves as fallback
- For extension loading issues, manually trigger context loader first

---

## Pre-release History

### [0.9.0] - Pre-release

- Initial public pre-release
- Established core workflow structure
- Introduced quality gate concept

### [0.8.0] - Internal Alpha

- Internal testing release
- Basic tenant model support
- Initial AI runtime patterns

---

## Future Roadmap

### Planned for v1.1.0

- [ ] Enhanced web search caching
- [ ] Additional CIS extensions
- [ ] Improved error messages
- [ ] Performance optimizations for large projects

### Planned for v1.2.0

- [ ] Multi-language template support
- [ ] Advanced pattern matching in CSV
- [ ] Custom quality gate definitions
- [ ] Integration with CI/CD pipelines

### Planned for v2.0.0

- [ ] Breaking: Strict memories field validation
- [ ] Breaking: Required web search capability
- [ ] New agent guide format
- [ ] GraphQL pattern support

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on:
- Reporting bugs
- Suggesting enhancements
- Submitting pull requests

Before contributing, ensure:
- All 169 tests pass
- No `memories:` field in extensions
- Step files reference pattern registry
- Web search directives use `{date}` placeholder

---

## Links

- **GitHub Repository:** [bmad-code-org/bmad-bam](https://github.com/bmad-code-org/bmad-bam)
- **BMAD Method:** [bmad-method](https://github.com/bmad-code-org/bmad-method)
- **Documentation:** [Getting Started](tutorials/getting-started.md)
- **Migration Guide:** [Migration Guide](migration-guide.md)
- **Troubleshooting:** [Troubleshooting Guide](troubleshooting-guide.md)

---

## Acknowledgments

BAM v1.0.0 builds upon the BMAD Method ecosystem and extends:
- **BMM** - BMAD Method core agents
- **TEA** - Testing and evaluation framework
- **WDS** - Workflow and design system patterns
- **CIS** - Creative innovation support

Special thanks to the BMAD Community for feedback and contributions during the pre-release period.
