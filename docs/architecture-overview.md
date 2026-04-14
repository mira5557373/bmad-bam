# BAM Architecture Overview

BAM (BMAD Agentic Multi-tenant) is a pure extension module for the BMAD Method ecosystem that adds multi-tenant SaaS architecture capabilities to existing BMAD agents.

---

## Table of Contents

1. [Module Philosophy](#module-philosophy)
2. [Module Structure](#module-structure)
3. [Extension Categories](#extension-categories)
4. [Pattern Registry System](#pattern-registry-system)
5. [Workflow Organization](#workflow-organization)
6. [Integration with BMB/BMM](#integration-with-bmbbmm)
7. [Quality Gate Architecture](#quality-gate-architecture)
8. [Memory and Context Flow](#memory-and-context-flow)

---

## Module Philosophy

BAM follows three core principles:

1. **Extension Only** - BAM extends existing BMAD agents rather than creating new ones
2. **Pattern Over Code** - Step files describe WHAT to do; web search provides HOW
3. **Design First** - Architecture decisions are frozen before implementation begins

### What BAM Adds

| Capability | Description |
|------------|-------------|
| Multi-tenant isolation | RLS, schema, and database-per-tenant patterns |
| Modular monolith design | DDD bounded contexts with facade contracts |
| AI agent orchestration | LangGraph, CrewAI, AutoGen integration |
| Quality gates | 8 gates from foundation to production |
| Tenant lifecycle | Onboarding, offboarding, metering, suspension |

---

## Module Structure

```
BAM Extension Module
====================

┌─────────────────────────────────────────────────────────────────────────────┐
│                           BAM Extension Module                               │
│                        (Pure Extension - 0 Standalone Agents)                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          25 EXTENSIONS                               │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │   │
│  │  │   BMM (10)  │ │   TEA (1)   │ │   WDS (2)   │ │  CIS (12)   │    │   │
│  │  │ analyst     │ │ tea-bam     │ │ saga-bam    │ │ brainstorm  │    │   │
│  │  │ architect   │ │             │ │ freya-bam   │ │ innovation  │    │   │
│  │  │ dev (QA+SM) │ │             │ │             │ │ disruption  │    │   │
│  │  │ pm, po, ux  │ │             │ │             │ │ ...8 more   │    │   │
│  │  │ tech-writer │ │             │ │             │ │             │    │   │
│  │  │ devops      │ │             │ │             │ │             │    │   │
│  │  │ security    │ │             │ │             │ │             │    │   │
│  │  │ master-arch │ │             │ │             │ │             │    │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          67 WORKFLOWS                                │   │
│  │  ┌───────────────────────┐  ┌───────────────────────────────────┐   │   │
│  │  │  53 Flat Workflows    │  │  14 Nested (in 6 Containers)      │   │   │
│  │  │  - agent-runtime      │  │  foundation/                      │   │   │
│  │  │  - tenant-model       │  │    create-master-architecture     │   │   │
│  │  │  - compliance-design  │  │    scaffold-foundation            │   │   │
│  │  │  - security-review    │  │    validate-foundation            │   │   │
│  │  │  - usage-metering     │  │  module/                          │   │   │
│  │  │  - ...                │  │    create-module-architecture     │   │   │
│  │  │                       │  │    create-module-epics            │   │   │
│  │  │                       │  │    validate-module                │   │   │
│  │  │                       │  │  integration/ ingestion/          │   │   │
│  │  │                       │  │  discovery/ utility/              │   │   │
│  │  └───────────────────────┘  └───────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      SUPPORTING COMPONENTS                           │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │   │
│  │  │ 6 Pattern    │ │ 136 Agent    │ │ 15 Quality   │ │ 143        │  │   │
│  │  │ Registry CSVs│ │ Guides       │ │ Checklists   │ │ Templates  │  │   │
│  │  │              │ │              │ │              │ │            │  │   │
│  │  │ bam-patterns │ │ platform-    │ │ QG-F1        │ │ master-    │  │   │
│  │  │ tenant-models│ │ architecture │ │ QG-M1/M2/M3  │ │ architecture│  │   │
│  │  │ ai-runtimes  │ │ ai-runtime   │ │ QG-I1/I2/I3  │ │ tenant-    │  │   │
│  │  │ quality-gates│ │ tenant-      │ │ QG-P1        │ │ model      │  │   │
│  │  │ compliance   │ │ isolation    │ │              │ │ facade-    │  │   │
│  │  │ section-map  │ │ ...          │ │              │ │ contract   │  │   │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Directory Layout

```
src/
├── extensions/           # 25 agent capability extensions
│   ├── analyst-bam.yaml
│   ├── architect-bam.yaml    # Atlas+Nova+Kai consolidated
│   ├── dev-bam.yaml          # Includes QA+SM (BMM consolidation)
│   ├── pm-bam.yaml
│   ├── po-bam.yaml
│   ├── ux-bam.yaml
│   ├── tech-writer-bam.yaml
│   ├── devops-bam.yaml
│   ├── security-bam.yaml
│   ├── master-architect-bam.yaml
│   ├── tea-bam.yaml
│   ├── wds-saga-bam.yaml
│   ├── wds-freya-bam.yaml
│   └── cis-*-bam.yaml (12)
│
├── workflows/            # 67 workflows
│   ├── {flat-workflows}/     # 47 flat workflows
│   ├── foundation/           # Container: 3 nested
│   ├── module/               # Container: 3 nested
│   ├── integration/          # Container: 4 nested
│   ├── ingestion/            # Container: 2 nested
│   ├── discovery/            # Container: 1 nested
│   └── utility/              # Container: 1 nested
│
├── data/                 # Pattern registry + guides
│   ├── bam-patterns.csv
│   ├── tenant-models.csv
│   ├── ai-runtimes.csv
│   ├── quality-gates.csv
│   ├── compliance-frameworks.csv
│   ├── section-pattern-map.csv
│   └── agent-guides/bam/     # 136 context guides
│
├── checklists/           # 36 quality gate checklists
├── templates/            # 456 output templates
└── workflows/            # 191 workflows (174 flat + 17 nested)
    ├── module.yaml       # Module configuration (at skills common parent)
    └── module-help.csv   # Help system (166 rows)
```

---

## Extension Categories

BAM organizes its **25 extensions** into target module categories.

### BMM Extensions (10)

The core BMAD Method extensions cover the full software development lifecycle.

| Extension | Base Agent | Purpose |
|-----------|------------|---------|
| `analyst-bam` | bmad-agent-analyst | Multi-tenant discovery, bounded context identification |
| `architect-bam` | bmad-agent-architect | Platform architecture (Atlas), AI runtime (Nova), Integration (Kai) |
| `dev-bam` | bmad-agent-dev | Tenant-aware development, includes QA/SM capabilities |
| `pm-bam` | bmad-agent-pm | Multi-tenant sprint planning, release coordination |
| `po-bam` | bmad-agent-po | Tenant-specific backlog prioritization |
| `ux-bam` | bmad-agent-ux-designer | Tier-based UX flows, tenant portal design |
| `tech-writer-bam` | bmad-agent-tech-writer | API documentation, tenant guides |
| `devops-bam` | bmad-agent-devops | Multi-tenant deployment, observability |
| `security-bam` | bmad-agent-security | Tenant isolation review, compliance controls |
| `master-architect-bam` | bmad-agent-architect | Enterprise-wide architecture governance |

### Architect Personas (Consolidated)

The `architect-bam.yaml` extension consolidates three specialist personas:

```
architect-bam.yaml (24 menu items)
├── Atlas - Platform Architect
│   ├── CMAR: Create Master Architecture
│   ├── MBD: Module Boundary Design
│   ├── VF: Validate Foundation
│   └── ...
│
├── Nova - AI Runtime Architect
│   ├── ARA: Agent Runtime Architecture
│   ├── AES: AI Eval Safety Design
│   ├── AAD: AI Agent Debug
│   └── ...
│
└── Kai - Integration Architect
    ├── DFC: Define Facade Contract
    ├── EFC: Evolve Facade Contract
    ├── CV: Convergence Verification
    └── ...
```

### TEA Extension (1)

| Extension | Purpose |
|-----------|---------|
| `tea-bam` | Tenant isolation testing, AI safety evaluation |

### WDS Extensions (2)

| Extension | Purpose |
|-----------|---------|
| `wds-saga-bam` | Multi-tenant user personas, journey mapping |
| `wds-freya-bam` | Tier-specific UX, upgrade flows |

### CIS Extensions (12)

Innovation and strategy extensions for SaaS platforms:

| Extension | Focus Area |
|-----------|------------|
| `cis-brainstorming-bam` | SaaS feature ideation |
| `cis-design-thinking-bam` | Tenant-centric design |
| `cis-disruption-bam` | Market disruption analysis |
| `cis-futures-bam` | Platform evolution planning |
| `cis-innovation-bam` | AI capability innovation |
| `cis-market-bam` | SaaS market analysis |
| `cis-platform-bam` | Platform strategy |
| `cis-presentation-bam` | Stakeholder presentations |
| `cis-problem-solver-bam` | Technical problem solving |
| `cis-scale-bam` | Scaling strategies |
| `cis-storyteller-bam` | Platform narrative |
| `cis-value-bam` | Value proposition design |

---

## Pattern Registry System

BAM replaces static knowledge fragments with a dynamic pattern registry stored in CSV files.

### Registry Architecture

```
Pattern Registry
================

┌─────────────────────────────────────────────────────────────────────┐
│                        Pattern Resolution Flow                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Step File                    Pattern CSV                          │
│   ┌──────────────────────┐    ┌───────────────────────────────┐   │
│   │ **Load patterns:**   │───►│ bam-patterns.csv              │   │
│   │ bam-patterns.csv     │    │ ┌───────────────────────────┐ │   │
│   │ → filter: tenant-isolation │    │ │ pattern_id: tenant-isolation    │ │   │
│   └──────────────────────┘    │ │ decision_criteria: ...    │ │   │
│                               │ │ web_queries: "PostgreSQL  │ │   │
│                               │ │   RLS best practices      │ │   │
│                               │ │   {date}"                 │ │   │
│                               │ └───────────────────────────┘ │   │
│                               └───────────────────────────────┘   │
│                                           │                        │
│                                           ▼                        │
│                               ┌───────────────────────────────┐   │
│                               │     Web Search (Runtime)      │   │
│                               │ "PostgreSQL RLS best          │   │
│                               │  practices 2026"              │   │
│                               └───────────────────────────────┘   │
│                                           │                        │
│                                           ▼                        │
│                               ┌───────────────────────────────┐   │
│                               │   Current Best Practices      │   │
│                               │   _Source: [URL]_             │   │
│                               └───────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Registry Files

| File | Purpose | Key Columns |
|------|---------|-------------|
| `bam-patterns.csv` | Core architectural patterns | pattern_id, category, decision_criteria, web_queries |
| `tenant-models.csv` | Tenant isolation strategies | model, when_to_use, compliance_fit, isolation_strength |
| `ai-runtimes.csv` | AI orchestration frameworks | runtime, use_case, strengths, web_queries |
| `quality-gates.csv` | Gate requirements | gate_id, checks, critical_checks |
| `compliance-frameworks.csv` | Regulatory compliance | framework, requirements, tenant_impact |
| `section-pattern-map.csv` | Document section mapping | section, patterns, web_queries |

### Pattern Categories

The `bam-patterns.csv` contains 45+ patterns organized by category:

| Category | Example Patterns |
|----------|------------------|
| `tenant-isolation` | row-level-security, schema-per-tenant, database-per-tenant |
| `ai-runtime` | langgraph, crewai, autogen, dspy, instructor |
| `architecture` | module-boundaries, facade-contracts, event-driven |
| `operations` | rate-limiting, caching-strategy, background-jobs |
| `security` | encryption-key-management, session-management |
| `integration` | webhook-delivery, notification-system |
| `testing` | testing-isolation, testing-agent-safety |

### Web Query Resolution

The `{date}` placeholder in web_queries is resolved at runtime:

```csv
pattern_id,web_queries
tenant-isolation,"PostgreSQL RLS multi-tenant best practices {date};row level security patterns {date}"
```

Becomes at runtime (2026):

```
Search the web: "PostgreSQL RLS multi-tenant best practices 2026"
Search the web: "row level security patterns 2026"
```

---

## Workflow Organization

BAM uses a hybrid organization: flat workflows for standalone concerns and nested containers for related workflow groups.

### Workflow Structure

```
Workflow Organization
=====================

src/workflows/
├── 53 Flat Workflows (standalone)
│   ├── agent-runtime-architecture/
│   ├── tenant-model-isolation/
│   ├── compliance-design/
│   ├── security-review/
│   ├── disaster-recovery-design/
│   └── ...
│
└── 6 Container Directories (grouped)
    ├── foundation/              # Foundation phase
    │   ├── create-master-architecture/
    │   ├── scaffold-foundation/
    │   └── validate-foundation/
    │
    ├── module/                  # Module design phase
    │   ├── create-module-architecture/
    │   ├── create-module-epics/
    │   └── validate-module/
    │
    ├── integration/             # Cross-module integration
    │   ├── define-facade-contract/
    │   ├── evolve-facade-contract/
    │   ├── facade-mismatch-recovery/
    │   └── validate-tool-contract/
    │
    ├── ingestion/               # Requirements processing
    │   ├── requirement-ingestion/
    │   └── triage-module-complexity/
    │
    ├── discovery/               # Initial discovery
    │   └── tenant-requirements-analysis/
    │
    └── utility/                 # Utility workflows
        └── list-tools/
```

### Workflow File Structure

Each workflow contains:

```
{workflow-name}/
├── bmad-skill-manifest.yaml    # Workflow metadata
├── SKILL.md                    # Full instructions
├── workflow.md                 # Mode router (Create/Edit/Validate)
├── instructions.md             # Legacy compatibility
├── bmad-manifest.json          # Dependency chain (optional)
└── steps/                      # Step files
    ├── step-01-c-{name}.md     # Create mode (01-09)
    ├── step-02-c-{name}.md
    ├── ...
    ├── step-10-e-load.md       # Edit mode (10-19)
    ├── step-11-e-apply.md
    ├── step-20-v-load.md       # Validate mode (20-29)
    ├── step-21-v-check.md
    └── step-22-v-report.md
```

### CEV Mode Convention

Workflows support Create, Edit, and Validate modes:

| Mode | Step Range | Purpose |
|------|------------|---------|
| Create | 01-09 (or 01-10) | Generate new artifacts |
| Edit | 10-19 | Modify existing artifacts |
| Validate | 20-29 | Check against criteria |

Step naming: `step-NN-{mode}-{description}.md`

- `step-01-c-discovery.md` - Create mode, step 1
- `step-10-e-load-existing.md` - Edit mode, step 10
- `step-20-v-load-artifact.md` - Validate mode, step 20

---

## Integration with BMB/BMM

BAM integrates with the BMAD ecosystem through the BMB installer and BMM workflow phases.

### BMB Installation

```yaml
# src/workflows/module.yaml
code: bam
name: "BAM - Multi-Tenant Agentic AI SaaS"
default_selected: false
requiredModules: [core]
recommendedModules: [bmm, tea, wds, cis]
```

During installation via `npx bmad-method install`:

1. User selects BAM module
2. Configuration prompts appear (tenant_model, ai_runtime)
3. Extensions are merged with base agents
4. Workflows become available

### Configuration Variables

| Variable | Options | Default |
|----------|---------|---------|
| `tenant_model` | row-level-security, schema-per-tenant, database-per-tenant | row-level-security |
| `ai_runtime` | langgraph, crewai, autogen, custom | langgraph |
| `design_first` | true, false | true |
| `test_architecture` | true, false | true |

### BMAD Phase Mapping

BAM workflows map to BMAD Method phases:

| Phase | BAM Workflows |
|-------|---------------|
| 1-Discovery | tenant-requirements-analysis |
| 2-Planning | requirement-ingestion, triage-module-complexity, create-module-epics, cross-module-story |
| 3-Solutioning | create-master-architecture, tenant-model-isolation, module-boundary-design, agent-runtime-architecture, define-facade-contract, validate-foundation, validate-module |
| 4-Implementation | convergence-verification, facade-mismatch-recovery, ai-agent-debug, api-version-release |
| 5-Quality | (uses validate-* workflows) |
| 6-Operations | tenant-onboarding-design, tenant-offboarding-design, tenant-aware-observability |

### Workflow Execution Order

```
Workflow Dependency Chain
=========================

requirement-ingestion (optional)
    └── triage-module-complexity (optional)
            │
            ▼
    create-master-architecture (REQUIRED) ─────────► QG-F1
            │
            ├── tenant-model-isolation
            ├── module-boundary-design
            └── scaffold-foundation (optional)
                    │
                    ▼
            validate-foundation (REQUIRED) ◄───────── QG-F1
                    │
                    ▼
            create-module-architecture (REQUIRED)
                    │
                    ├── define-facade-contract
                    ├── internal-contract-design
                    └── agent-runtime-architecture
                            │
                            ▼
            validate-module (REQUIRED) ◄─────── QG-M1, QG-M2, QG-M3
                    │
                    ▼
            convergence-verification (REQUIRED) ◄── QG-I1, QG-I2, QG-I3
                    │
                    ▼
            Production ◄──────────────────────────── QG-P1
```

---

## Quality Gate Architecture

BAM enforces 8 quality gates from foundation to production.

### Gate Sequence

```
Quality Gate Flow
=================

    ┌─────────────────────────────────────────────────────────────┐
    │                     FOUNDATION PHASE                         │
    │  ┌─────────────────────────────────────────────────────┐    │
    │  │ QG-F1: Foundation Gate                              │    │
    │  │ - Master architecture complete                      │    │
    │  │ - Tenant model defined                              │    │
    │  │ - Shared kernel minimal                             │    │
    │  │ - Module boundaries clear                           │    │
    │  └─────────────────────────────────────────────────────┘    │
    └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                      MODULE PHASE                            │
    │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
    │  │ QG-M1        │ │ QG-M2        │ │ QG-M3        │        │
    │  │ Module       │ │ Tenant       │ │ Agent        │        │
    │  │ Architecture │ │ Isolation    │ │ Runtime      │        │
    │  └──────────────┘ └──────────────┘ └──────────────┘        │
    └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                   INTEGRATION PHASE                          │
    │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
    │  │ QG-I1        │ │ QG-I2        │ │ QG-I3        │        │
    │  │ Facade       │ │ Tenant       │ │ Agent        │        │
    │  │ Compatibility│ │ Safety       │ │ Safety       │        │
    │  └──────────────┘ └──────────────┘ └──────────────┘        │
    └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                   PRODUCTION PHASE                           │
    │  ┌─────────────────────────────────────────────────────┐    │
    │  │ QG-P1: Production Readiness                         │    │
    │  │ - All prior gates pass                              │    │
    │  │ - Performance benchmarks met                        │    │
    │  │ - Observability configured                          │    │
    │  │ - Runbooks documented                               │    │
    │  └─────────────────────────────────────────────────────┘    │
    └─────────────────────────────────────────────────────────────┘
```

### Gate Outcomes

| Outcome | Definition | Action |
|---------|------------|--------|
| PASS | All checks pass | Proceed to next phase |
| CONDITIONAL | Non-critical gaps, all critical pass | Proceed with mitigation plan |
| FAIL | Any critical check fails | Enter recovery protocol |

### Recovery Protocol

After 2 failed attempts at fixing issues, mandatory course correction is required with escalation to project leadership.

---

## Memory and Context Flow

BAM uses the WDS agent-guides pattern for context injection, avoiding the non-standard `memories:` field.

### Context Flow Diagram

```
Context Flow
============

User Request
    │
    ▼
┌─────────────────────────────────────┐
│ Extension Menu Item                  │
│ trigger: bam-platform-context        │
│ action: "#load-platform-context"     │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Agent Guide Loading                  │
│ {project-root}/_bmad/bam/data/      │
│   agent-guides/bam/platform-arch.md  │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Pattern Registry                     │
│ bam-patterns.csv                     │
│ → decision_criteria                  │
│ → web_queries                        │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Workflow Step Execution              │
│ steps/step-01-c-discovery.md         │
│ → Load patterns directive            │
│ → Web search verification            │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Template Population                  │
│ templates/master-architecture.md     │
│ → {{project_name}}, {{date}}         │
│ → {{tenant_model}}, {{ai_runtime}}   │
└─────────────────────────────────────┘
    │
    ▼
Output Artifact
{output_folder}/planning-artifacts/master-architecture.md
```

### Sidecar Memory Pattern

For persistent agent preferences across sessions:

```
{project-root}/_bmad/_memory/
├── architect-bam-sidecar/
│   ├── architecture-decisions.md
│   ├── runtime-preferences.md
│   └── contract-history.md
```

Sidecar templates are installed from `src/templates/sidecar-*.md` and loaded by extension prompts for continuity.

---

## Related Documentation

- [Getting Started](getting-started.md) - Quick start guide
- [API Reference](api-reference.md) - Extension and workflow schemas
- [Quality Gates Reference](reference/quality-gates.md) - Gate details
- [AI Agent Architecture](explanation/ai-agent-architecture.md) - Agent design patterns
