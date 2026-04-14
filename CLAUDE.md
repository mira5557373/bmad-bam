# CLAUDE.md - BAM Extension Module

> **Quick Start:** BAM is a **pure extension module** with 0 standalone agents and 31 extensions. Atlas, Nova, Kai personas are consolidated into `architect-bam.yaml`. Run `npm test` before any PR. Never use `memories:` field. Step files use `Search the web: "{topic} {date}"` directives for current best practices. Pattern registry CSVs provide `web_queries` column for dynamic research.

---

## Table of Contents

1. [What is BAM?](#what-is-bam)
2. [BMAD Method Integration](#bmad-method-integration)
3. [Architecture Overview](#architecture-overview)
4. [Configuration Variables](#configuration-variables)
5. [Directory Structure](#directory-structure)
6. [Variable Placeholders](#variable-placeholders)
7. [Extension Pattern (WDS)](#extension-pattern-wds)
8. [WDS Agent Coexistence Model](#wds-agent-coexistence-model)
9. [Step File Pattern (BMM)](#step-file-pattern-bmm)
10. [Pattern Registry Structure](#pattern-registry-structure)
11. [Web Search Integration](#web-search-integration)
12. [Agent Guide Pattern](#agent-guide-pattern)
13. [Workflow Structure (CEV)](#workflow-structure-cev)
14. [Module Help CSV Schema](#module-help-csv-schema)
15. [Quality Gates & Recovery](#quality-gates--recovery)
16. [Tenant Model Deep Dive](#tenant-model-deep-dive)
17. [AI Runtime Deep Dive](#ai-runtime-deep-dive)
18. [Sidecar Memory Pattern](#sidecar-memory-pattern)
19. [Context Flow](#context-flow)
20. [Template Variables](#template-variables)
21. [Naming Conventions](#naming-conventions)
22. [Common Tasks](#common-tasks)
23. [Anti-Patterns](#anti-patterns)
24. [Testing](#testing)
25. [Quick Reference](#quick-reference)

---

## What is BAM?

BAM (BMAD Agentic Multi-tenant) is a **pure extension module** for the BMAD Method ecosystem. It adds multi-tenant SaaS architecture capabilities to existing BMAD agents.

**Critical Facts:**
- **0 standalone agents** - BAM is a pure extension module (no standalone agents)
- **3 architect personas** - Atlas (Platform), Nova (AI Runtime), Kai (Integration) consolidated in `architect-bam.yaml`
- **31 extensions** - Enhance existing BMM, TEA, WDS, CIS agents (QA/SM merged into dev-bam, billing/analytics/reseller added)
- **Extends, never replaces** - Enhances BMM, TEA, WDS, CIS agents
- **No `memories:` field** - Uses WDS agent-guides pattern instead
- **Pattern registry** - 6 CSV files in `src/data/` replace static knowledge fragments
- **Sidecar templates** - Flat in `src/templates/sidecar-*.md` (BMM-compatible naming)

**What BAM Adds:**
- Multi-tenant isolation patterns (RLS, schema, database)
- Modular monolith architecture
- AI agent orchestration (LangGraph, CrewAI, AutoGen)
- 40 quality gates for SaaS readiness
- Tenant lifecycle (onboarding, offboarding, metering)
- **Web search integration** for current best practices (BMM solutioning pattern)

---

## BMAD Method Integration

BAM workflows map to BMAD Method phases:

| Phase | Name | BAM Workflows |
|-------|------|---------------|
| 1 | Discovery | (Use BMM) |
| 2 | Planning | `requirement-ingestion`, `triage-module-complexity`, `create-module-epics`, `cross-module-story` |
| 3 | Solutioning | `create-master-architecture`, `tenant-model-isolation`, `module-boundary-design`, `agent-runtime-architecture`, `define-facade-contract`, etc. |
| 4 | Implementation | `convergence-verification`, `facade-mismatch-recovery`, `ai-agent-debug`, `api-version-release` |
| 5 | Quality | `validate-foundation`, `validate-module`, `validate-tool-contract` |
| 6 | Operations | `tenant-onboarding-design`, `tenant-offboarding-design`, `tenant-aware-observability` |

**Workflow Execution Order:**
```
requirement-ingestion
    └── triage-module-complexity
            └── create-master-architecture (QG-F1)
                    ├── tenant-model-isolation
                    ├── module-boundary-design
                    └── validate-foundation
                            └── create-module-architecture (QG-M1)
                                    ├── define-facade-contract
                                    └── validate-module (QG-M2, QG-M3)
                                            └── convergence-verification (QG-I1, QG-I2, QG-I3)
                                                    └── Production (QG-P1)
```

---

## Architecture Overview

```
BAM Extension Module (Pure Extension - 0 Standalone Agents)
├── 0 agents (Atlas, Nova, Kai consolidated into architect-bam.yaml)
├── 31 extensions (enhance existing BMAD agents, all with web research capability)
├── 191 workflows (174 flat + 17 nested in 7 container directories)
├── 6 pattern registry CSVs (106 patterns with decision criteria + web queries with {date} placeholder)
├── 189 agent guides (context injection via WDS pattern, all with Web Research sections)
├── 36 checklists (quality gates with web research verification)
└── 453 templates (output artifacts + sidecar-*.md + spec/catalog files)
```

**Extension Distribution:**

| Target Module | Extensions | Purpose |
|---------------|------------|---------|
| BMM | 10 | analyst, architect, dev (includes QA+SM), pm, po, ux, tech-writer, devops, security, master-architect |
| TEA | 1 | Tenant isolation testing |
| WDS | 2 | Saga (personas), Freya (tier UX) |
| CIS | 12 | SaaS innovation lenses (brainstorming, design-thinking, disruption, futures, innovation, market, platform, presentation, problem-solver, scale, storyteller, value) |

**BMM Consolidation Applied:**
- Atlas/Nova/Kai → `architect-bam.yaml` (44 menu items - intentionally above 5-10 target due to 3-persona consolidation)
- QA/SM → `dev-bam.yaml` (merged per BMM guidelines)
- Sidecar templates → `src/templates/sidecar-*.md` (flat, BMM-compatible naming)

> **Note:** `architect-bam.yaml` has 44 menu items (above the 5-10 recommendation) because it consolidates three architect personas: Atlas (Platform), Nova (AI Runtime), and Kai (Integration). This is an intentional design decision to keep related capabilities together rather than fragmenting into multiple extensions.

---

## Configuration Variables

During `npx bmad-method install`, users select these options:

### `{tenant_model}` - Isolation Strategy

| Value | When to Use | Knowledge Reference |
|-------|-------------|---------------------|
| `row-level-security` | Most SaaS (<1000 tenants, shared tables) | `rls-best-practices.md` |
| `schema-per-tenant` | Regulated industries, moderate isolation | `multi-tenant-patterns.md` |
| `database-per-tenant` | Enterprise tier, maximum isolation | `multi-tenant-patterns.md` |

### `{ai_runtime}` - Orchestration Framework

| Value | When to Use | Knowledge Reference |
|-------|-------------|---------------------|
| `langgraph` | Recommended default, state machines | `agent-runtime-patterns.md` |
| `crewai` | Role-based crews, hierarchies | `run-contracts.md` |
| `autogen` | Multi-agent conversations | `agent-runtime-patterns.md` |
| `dspy` | Prompt optimization, structured outputs | `agent-runtime-patterns.md` |
| `instructor` | Pydantic validation, type-safe outputs | `agent-runtime-patterns.md` |
| `custom` | Custom framework integration | - |

### `{design_first}` - Approach

| Value | Effect |
|-------|--------|
| `true` | Run `create-master-architecture` before coding |
| `false` | Skip to implementation (not recommended) |

### `{test_architecture}` - TEA Integration

| Value | Effect |
|-------|--------|
| `true` | Include TEA workflows for tenant testing |
| `false` | Basic testing only |

---

## Directory Structure

```
src/
├── extensions/                  # 28 agent capability extensions
│   ├── analyst-bam.yaml         # Extends bmad-agent-analyst
│   ├── architect-bam.yaml       # Extends bmad-agent-architect (Atlas+Nova+Kai merged)
│   ├── dev-bam.yaml             # Extends bmad-agent-dev (QA+SM merged)
│   ├── pm-bam.yaml              # Extends bmad-agent-pm
│   ├── ux-bam.yaml              # Extends bmad-agent-ux-designer
│   ├── tech-writer-bam.yaml     # Extends bmad-agent-tech-writer
│   ├── tea-bam.yaml             # Extends bmad-tea
│   ├── wds-saga-bam.yaml        # Extends wds-agent-saga-analyst
│   ├── wds-freya-bam.yaml       # Extends wds-agent-freya-ux
│   ├── cis-*-bam.yaml (12)      # Extends CIS agents (all with web research)
│   └── master-architect-bam.yaml
│
├── workflows/                   # 191 workflows (174 flat + 17 nested in containers)
│   ├── {flat-workflow}/              # 61 flat workflows (e.g., tenant-model-isolation/)
│   │   ├── bmad-skill-manifest.yaml
│   │   ├── SKILL.md
│   │   ├── workflow.md
│   │   └── steps/
│   │
│   ├── foundation/                    # Container: 3 nested workflows
│   │   ├── create-master-architecture/
│   │   ├── scaffold-foundation/
│   │   └── validate-foundation/
│   │
│   ├── module/                        # Container: 3 nested workflows
│   │   ├── create-module-architecture/
│   │   ├── create-module-epics/
│   │   └── validate-module/
│   │
│   ├── integration/                   # Container: 4 nested workflows
│   │   ├── define-facade-contract/
│   │   ├── evolve-facade-contract/
│   │   ├── facade-mismatch-recovery/
│   │   └── validate-tool-contract/
│   │
│   ├── ingestion/                     # Container: 2 nested workflows
│   │   ├── requirement-ingestion/
│   │   └── triage-module-complexity/
│   │
│   ├── discovery/                     # Container: 1 nested workflow
│   │   └── tenant-requirements-analysis/
│   │
│   └── utility/                       # Container: 1 nested workflow
│       └── list-tools/
│
├── data/                        # Pattern registry + agent guides
│   ├── bam-patterns.csv              # Core patterns with decision criteria
│   ├── tenant-models.csv             # Tenant isolation patterns
│   ├── ai-runtimes.csv               # AI runtime patterns
│   ├── quality-gates.csv             # Quality gate requirements
│   ├── compliance-frameworks.csv     # Compliance matrix
│   ├── section-pattern-map.csv       # Section to pattern mapping
│   └── agent-guides/
│       └── bam/                 # 189 context injection guides (all with Web Research)
│           ├── platform-architecture.md
│           ├── ai-runtime.md
│           ├── tenant-isolation.md
│           ├── module-architecture.md
│           ├── saas-lifecycle.md
│           ├── tenant-testing.md
│           ├── tier-ux.md
│           ├── integration-patterns.md
│           └── ...
│
├── checklists/                  # 36 quality gate checklists
│   ├── foundation-gate.md            # QG-F1 (with 3-step recovery)
│   ├── module-architecture.md        # QG-M1
│   ├── module-readiness.md           # Module readiness
│   ├── tenant-isolation.md           # QG-M2 (with 3-step recovery)
│   ├── qg-m3-agent-runtime.md        # QG-M3
│   ├── qg-m3-tools.md                # QG-M3
│   ├── qg-i1-convergence.md          # QG-I1
│   ├── qg-i2-tenant-safety.md        # QG-I2
│   ├── qg-i3-agent-safety.md         # QG-I3
│   ├── qg-security-continuous.md     # Continuous security (with 3-step recovery)
│   ├── qg-operations-continuous.md   # QG-OC (with 3-step recovery)
│   ├── qg-compliance-continuous.md   # QG-CC Continuous compliance
│   ├── qg-ai-observability.md        # QG-AI2 AI/LLM observability
│   ├── qg-capacity-planning.md       # QG-CP1 Capacity planning
│   ├── qg-disaster-recovery-drill.md # QG-DR1 DR drill validation
│   └── production-readiness.md       # QG-P1 (with 3-step recovery)
│
├── templates/                   # 453 templates (output artifacts + sidecar + specs)
│   ├── master-architecture-template.md
│   ├── module-architecture-template.md
│   ├── facade-contract-template.md
│   ├── tenant-model-template.md
│   ├── sidecar-architecture-decisions.md  # Agent memory templates (flat, BMM-compatible)
│   ├── sidecar-contract-history.md
│   ├── sidecar-runtime-preferences.md
│   └── ...
│
├── workflows/
│   ├── module.yaml              # Module configuration (at skills common parent)
│   ├── module-help.csv          # Help system entries (166 rows)
│   └── {workflow-directories}/   # 191 workflows (174 flat + 17 nested)
└── extensions/                   # 31 agent extensions
```

---

## Variable Placeholders

BAM uses these placeholders throughout:

| Placeholder | Resolves To | Example |
|-------------|-------------|---------|
| `{project-root}` | Project root directory | `/home/user/my-project` |
| `{output_folder}` | BAM output location | `{project-root}/docs` or configured path |
| `{tenant_model}` | Selected isolation strategy | `row-level-security` |
| `{ai_runtime}` | Selected orchestration framework | `langgraph` |
| `{design_first}` | Design-first flag | `true` |
| `{test_architecture}` | TEA integration flag | `true` |
| `{{project_name}}` | Template variable for project name | `MyProject` |
| `{{date}}` | Template variable for current date | `2026-04-06` |
| `{{tenant_id}}` | Runtime tenant identifier | `tenant_abc123` |

**Resolution Context:**
- `{project-root}` and `{output_folder}` resolve at install time
- `{tenant_model}` and `{ai_runtime}` resolve from user selection
- `{{variable}}` (double braces) are template placeholders filled during workflow execution

---

## Extension Pattern (WDS)

Every extension follows the WDS agent-guides pattern.

### Required Structure

```yaml
# src/extensions/{agent}-bam.yaml

agent:
  metadata:
    extends: 'bmad-agent-{base}'    # REQUIRED: Base agent to extend
    module: 'bam'                    # REQUIRED: Always 'bam'
    description: 'Brief description' # OPTIONAL: What this extension adds

# NEVER include memories: field

menu:
  # Context loader (REQUIRED - one per extension)
  - trigger: bam-{domain}-context
    action: "#load-{domain}-context-prompt"
    description: Load BAM {domain} context

  # Capability items (as many as needed)
  - trigger: {capability-name}
    action: "#{capability-name}-prompt"
    description: {What it does}

prompts:
  # Context loader prompt (REQUIRED)
  - id: load-{domain}-context-prompt
    content: |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
      
      Confirm when loaded.

  # Capability prompts
  - id: {capability-name}-prompt
    content: |
      ## {Capability Title}
      
      Prerequisites: Ensure BAM context loaded via `bam-{domain}-context`
      
      {Detailed instructions...}
```

### What NOT To Do

```yaml
# WRONG - breaks BMB compatibility
memories:
  - "Some context to inject"
  - "Another memory"

# WRONG - arrays instead of strings
capabilities:
  - "capability one"
  - "capability two"
```

---

## WDS Agent Coexistence Model

**Critical Finding:** WDS agents (Saga, Freya) **COEXIST** with BMM agents (Mary, Sally) - they do NOT destructively replace them.

### Evidence from Actual Installations

Analysis of real BMAD installations reveals the coexistence model:

| Configuration | Agents | Skills | Agent List |
|---------------|--------|--------|------------|
| **Without WDS** | 13 | 62 | Mary, Sally, Winston, James, Chad, Emma, Chloe, Liam, Mason, Alex, Pax, Bob, BMM-TEA |
| **With WDS** | 15 | 74 | **All 13 above** + Saga + Freya |

**Key Insight:** Installing WDS **adds** Saga and Freya - it does NOT remove Mary and Sally.

### What "Replaces" Actually Means

The WDS documentation states Saga "Replaces BMM Mary" - this is **functional preference**, not destructive deletion:

| Term | What It Sounds Like | What It Actually Means |
|------|---------------------|------------------------|
| "Replaces" | Mary is deleted | Saga is preferred for WDS workflows |
| "Alternative to" | One or the other | Both exist, user chooses |
| "Extends" | Modifies original | Adds capabilities to original |

### BAM Extension Compatibility Matrix

BAM safely installs **all 31 extensions** because extensions auto-filter based on available base agents:

| Base Agent | Module | Extension | Without WDS | With WDS |
|------------|--------|-----------|-------------|----------|
| `bmad-agent-analyst` (Mary) | BMM | `analyst-bam.yaml` | Active | Active |
| `bmad-agent-architect` (Winston) | BMM | `architect-bam.yaml` | Active | Active |
| `bmad-agent-dev` (James) | BMM | `dev-bam.yaml` | Active | Active |
| `bmad-agent-pm` (Chad) | BMM | `pm-bam.yaml` | Active | Active |
| `bmad-agent-ux-designer` (Emma) | BMM | `ux-bam.yaml` | Active | Active |
| `wds-agent-saga-analyst` (Saga) | WDS | `wds-saga-bam.yaml` | Ignored* | Active |
| `wds-agent-freya-ux` (Freya) | WDS | `wds-freya-bam.yaml` | Ignored* | Active |
| `bmad-tea` | TEA | `tea-bam.yaml` | Active | Active |
| `bmad-cis-agent-*` | CIS | `cis-*-bam.yaml` (12) | Active | Active |

*\*Ignored = Extension has no effect because base agent doesn't exist*

### Installation Recommendation

**Install all 31 BAM extensions unconditionally.** The extension system handles compatibility automatically:

```
If base agent exists → Extension activates → User gains BAM capabilities
If base agent missing → Extension ignored → No errors, no conflicts
```

### User Choice Preserved

The coexistence model preserves user choice:

```
Need analysis work?
    │
    ├── Prefer BMM style ──► Use Mary ──► Gets analyst-bam capabilities
    │
    └── Prefer WDS style ──► Use Saga ──► Gets wds-saga-bam capabilities
```

Both agents are available. Both have BAM extensions. User picks based on preference.

### Why This Matters for BAM

1. **No conditional installation logic needed** - Install all 31 extensions
2. **No duplicate extension conflicts** - Each targets a different base agent
3. **Graceful degradation** - Missing modules don't break BAM
4. **Future-proof** - New WDS/CIS agents automatically get BAM capabilities via new extensions

---

## Step File Pattern (BMM)

Step files describe **WHAT** to do, not **HOW** to implement it.

### Required Sections

```markdown
# Step N: {Title}

## Purpose

{One sentence describing the goal of this step}

## Prerequisites

- {Previous step completed}
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{pattern_id}`
- **Load patterns:** `{project-root}/_bmad/bam/data/{domain}.csv` → filter: `{criteria}`

## Actions

### 1. {First Action}

Reference patterns from `{knowledge-file}`:
- {Pattern to apply}
- {How it applies to this context}

### 2. {Second Action}

Using the {pattern name} from knowledge:
- {Specific application}
- {Decision to make}

### 3. {Third Action}

| {Column1} | {Column2} | {Column3} |
|-----------|-----------|-----------|
| {Data}    | {Data}    | {Data}    |

## Soft Gate Checkpoint (Optional)

**Steps 1-N complete the {phase} design.**

Present summary and ask for confirmation before proceeding.

## Verification

- [ ] {Checklist item 1}
- [ ] {Checklist item 2}
- [ ] {Patterns align with pattern registry}

## Outputs

- {Artifact 1}
- {Artifact 2}
- **Load template:** `{project-root}/_bmad/bam/templates/{template}.md`

## Next Step

Proceed to `{next-step}.md` {with context}.
```

### What NOT To Do

```markdown
## Actions

### 1. Implement the Repository

```typescript
// WRONG - Code belongs in web research results, NOT step files
class TenantRepository {
  async findById(ctx: TenantContext, id: string) {
    await this.setTenantContext(ctx);
    return this.db.query(...);
  }
}
```
```

### Acceptable Content in Step Files

| Acceptable | Not Acceptable |
|------------|----------------|
| Tables with specifications | TypeScript/Python/JavaScript code |
| YAML configuration schemas | Implementation functions |
| Decision matrices | Class/interface definitions |
| Checklists | SQL queries with logic |
| References to pattern registry | Inline code examples |
| PromQL/SQL for WHAT to query | Code showing HOW to implement |

---

## Pattern Registry Structure

The pattern registry is a set of CSV files that provide decision criteria and web search queries for dynamic, up-to-date pattern information.

### Registry Files

| File | Purpose | Key Columns |
|------|---------|-------------|
| `bam-patterns.csv` | Core patterns | pattern_id, name, category, decision_criteria, web_queries |
| `tenant-models.csv` | Tenant isolation | model, use_case, pros, cons, web_queries |
| `ai-runtimes.csv` | AI frameworks | runtime, use_case, strengths, web_queries |
| `quality-gates.csv` | Gate requirements | gate_id, checks, critical_checks |
| `compliance-frameworks.csv` | Compliance matrix | framework, requirements, tenant_impact |
| `section-pattern-map.csv` | Section mapping | section, patterns, web_queries |

### CSV Structure Example

```csv
pattern_id,name,category,decision_criteria,web_queries,related_patterns

tenant-rls,Row-Level Security,tenant-isolation,"<1000 tenants, shared tables, cost-efficient","PostgreSQL RLS multi-tenant best practices {date};row level security patterns {date}",tenant-schema
tenant-schema,Schema-per-Tenant,tenant-isolation,"regulated industries, moderate isolation","schema-per-tenant PostgreSQL isolation patterns {date}",tenant-rls
agent-langgraph,LangGraph Runtime,ai-runtime,"state machines, conditional branching","LangGraph agent orchestration patterns {date};LangGraph state management {date}",agent-crewai
```

**Note:** The `{date}` placeholder is resolved at runtime to the current year (e.g., 2026).

### How Patterns Are Used

1. **Step files** reference patterns by ID: `**Load patterns:** bam-patterns.csv → filter: tenant-isolation`
2. **Agent** reads CSV row and extracts `web_queries` column
3. **Resolve placeholders**: Replace `{date}` with current year (e.g., 2026)
4. **Web search** is performed using the resolved queries for current best practices
5. **Results** inform the agent's recommendations with up-to-date information

### Benefits Over Static Knowledge

| Static Knowledge (Old) | Pattern Registry (New) |
|------------------------|------------------------|
| 79 markdown files | 6 CSV files |
| Can become stale | Web queries fetch current info |
| Embedded code examples | Decision criteria only |
| Manual updates needed | Self-refreshing via web |

---

## Web Search Integration

BAM uses web search for verifying current best practices during solutioning workflows. This follows the **BMM solutioning pattern** (targeted verification, not mandatory blocking).

### Web Search Directive Format

Step files use the following directive to invoke web search:

```markdown
**Verify current best practices with web search:**
Search the web: "multi-tenant isolation patterns {date}"
Search the web: "PostgreSQL RLS best practices {date}"
```

The `{date}` placeholder is resolved at runtime to the current year (e.g., 2026).

### When to Use Web Search

| Situation | Use Web Search | Rationale |
|-----------|----------------|-----------|
| Technology decision | **YES** | Verify current versions and best practices |
| Architecture pattern selection | **YES** | Get up-to-date implementation guidance |
| Compliance requirement | **YES** | Regulations change frequently |
| Validating existing content | **NO** | Edit/Validate modes verify, don't research |
| Loading patterns from CSV | **NO** | CSV already has web_queries to execute |

### Source Citation Format

When incorporating web research findings, cite sources:

```markdown
_Source: [URL]_
```

### Integration with Pattern Registry

1. Step files reference patterns: `**Load patterns:** bam-patterns.csv → filter: tenant-isolation`
2. Agent extracts `web_queries` column from pattern CSV
3. Agent executes web search with resolved `{date}` placeholder
4. Results inform recommendations with current best practices

### BMM Solutioning Pattern (Not Analysis Pattern)

BAM follows the **solutioning pattern**, not the analysis pattern:

| Analysis Pattern (BMM 1-analysis) | Solutioning Pattern (BAM) |
|-----------------------------------|---------------------------|
| `🛑 NEVER generate without web search` | `🔍 Use web search to verify` |
| 4+ parallel searches per step | 1-3 targeted searches |
| Abort if web search unavailable | Proceed with pattern registry |
| Citations required for all findings | Citations for key findings |

---

## Agent Guide Pattern

Agent guides inject domain context following WDS pattern.

### Required Structure

```markdown
# BAM {Domain} Guide

**When to load:** During Phase {N} ({Phase Name}) when {conditions},
or when user mentions {keywords}.

**Integrates with:** {Agent name} ({Role}), {capabilities}

---

## Core Concepts

### {Concept 1}

{Explanation relevant to this agent's perspective}

### {Concept 2}

{Explanation with agent-specific framing}

## Application Guidelines

When {doing specific task}:
1. {Guidance step 1}
2. {Guidance step 2}
3. {Guidance step 3}

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| {Case 1}  | {Action}      | {Why}     |
| {Case 2}  | {Action}      | {Why}     |

## Related Workflows

- `bmad-bam-{workflow}` - {When to use}
- `bmad-bam-{workflow}` - {When to use}

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **{Domain} patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `{category}-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "{domain} patterns {date}"
- Search: "{specific topic} multi-tenant {date}"
- Search: "{related technology} best practices {date}"
```

---

## Workflow Structure (Unified Steps - BMAD Compatible)

Every workflow supports Create, Edit, and Validate modes using a unified `steps/` directory.

### Manifest (`bmad-skill-manifest.yaml`)

```yaml
type: workflow
name: {workflow-name}                    # MUST match directory name exactly
displayName: {Display Name}
description: '{One-line description}'
module: bam
config_variables:
  - tenant_model
  - ai_runtime
step_naming_convention: "step-NN-mode-description"
```

> **CRITICAL BMB Requirement:** The `name` field MUST exactly match the directory name (e.g., `agent-execution-tracing`). BMB uses the directory name as the canonical ID. BMB installer will skip skills where `name` doesn't match directory.

### Skill Doc (`SKILL.md`)

```markdown
---
name: {workflow-name}                    # MUST match directory name exactly
description: '{Description for agent selection}'
module: bam
web_bundle: false
tags: [category]
---

# {Workflow Display Name}

## Overview

{What this workflow produces and why}

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-09-c-*` (or `step-10-c-*` for complex workflows) |
| Edit | Modify existing artifact | `step-10-e-*` to `step-19-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-29-v-*` |

> **CEV Convention Note:** The standard CEV convention reserves Create=01-09, Edit=10-19, Validate=20-29. However, complex workflows like `create-module-architecture` may extend Create mode to step-10. When this occurs, step-10 is shared between Create (`step-10-c-*`) and Edit (`step-10-e-*`) modes. The mode suffix (`-c-` vs `-e-`) distinguishes them.

## Prerequisites

- {What must exist before running}
- **Config required:** `{config_variable}`

## Outputs

- `{output-file}.md` in `{output_folder}/planning-artifacts/`

## Related Workflows

- `bmad-bam-{related}` - {Relationship}
```

### Mode Router (`workflow.md`)

```markdown
# {Workflow Name}

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new {artifact} | `step-01-c-*` through `step-09-c-*` (or `step-10-c-*`) |
| **Edit** | Modify existing {artifact} | `step-10-e-*` through `step-19-e-*` |
| **Validate** | Check {artifact} against {criteria} | `step-20-v-*` through `step-29-v-*` |

Default: **Create** mode unless artifact exists.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → ... → step-09-c (or step-10-c for complex workflows)

### Edit Mode  
Follow Edit steps: step-10-e-load → step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load → step-21-v-validate → step-22-v-report
```

---

## Module Help CSV Schema

The `module-help.csv` has 14 columns:

| Column | Required | Description |
|--------|----------|-------------|
| `module` | Yes | Always `bam` |
| `skill` | Yes | Workflow name (e.g., `bmad-bam-create-master-architecture`) |
| `display-name` | Yes | Human-readable name |
| `menu-code` | Yes | Short code (e.g., `CMAR`) |
| `description` | Yes | One-line description |
| `action` | Yes | Usually `run` |
| `args` | No | Additional arguments |
| `phase` | Yes | BMAD phase (`2-planning`, `3-solutioning`, `4-implementation`, `anytime`) |
| `after` | No | Prerequisite workflow(s) |
| `before` | No | Workflows this enables |
| `required` | Yes | `true` or `false` |
| `output-location` | No | Where output goes |
| `outputs` | No | Output filename(s) |
| `keywords` | No | Comma-separated keywords for semantic search (3-5 terms) |

**Example Row:**
```csv
bam,bmad-bam-create-master-architecture,Create Master Architecture,CMAR,Create frozen master architecture with tenant model,run,,3-solutioning,,,true,{output_folder}/planning-artifacts,master-architecture.md,"architecture,design,foundation,platform,master"
```

---

## Quality Gates & Recovery

BAM implements **10 CORE gates** (QG-D1, QG-PL1, QG-F1, QG-M1, QG-M2, QG-M3, QG-I1, QG-I2, QG-I3, QG-P1) plus **EXTENSION gates** for security, AI, operations, testing, and compliance. **Total: 40 gates** (comprehensive BMM phase coverage).

### Gate Inventory

| Category | Gate IDs | Count |
|----------|----------|-------|
| Phase 1-2 (Discovery/Planning) | QG-D1, QG-PL1 | 2 |
| Core Workflow | QG-F1, QG-M1-M3, QG-I1-I3, QG-P1 | 8 |
| Security | QG-S1-S10 | 10 |
| AI/Agent | QG-AI1, QG-AI2 | 2 |
| Operations | QG-IR1, QG-SA1, QG-PR1, QG-DR1, QG-CP1, QG-CS1, QG-MG1, QG-OC, QG-CC | 9 |
| Recovery | QG-M1-R, QG-R1, QG-M3-T | 3 |
| Data/Compliance | QG-DC1, QG-PD1 | 2 |
| Test Coverage (TEA) | QG-TC1, QG-TC2, QG-TC3 | 3 |
| Pre-Commit | QG-DEV1 | 1 |
| **Total** | | **40** |

### Gate Sequence

```
QG-D1 (Discovery) ─► QG-PL1 (Planning) ─► QG-F1 (Foundation)
                                                   │
                                                   ▼
                     QG-M1 (Module Arch) ─► QG-M2 (Tenant Isolation)
                                        ─► QG-M3 (Agent Runtime)
                                                      │
                     ┌──────────────────────────────────┘
                     ▼
               QG-I1 (Convergence) ─► QG-I2 (Tenant Safety)
                                   ─► QG-I3 (Agent Safety)
                                              │
                     ┌────────────────────────┘
                     ▼
               QG-P1 (Production Readiness)
```

### Gate Outcomes (BMM-Standard Four Outcomes)

| Outcome | Definition | Action |
|---------|------------|--------|
| **PASS** | All criteria met | Proceed to next phase |
| **CONDITIONAL** | Non-critical gaps, all critical pass | Proceed with mitigation plan + deadline |
| **FAIL** | Any critical check fails | Enter recovery protocol |
| **WAIVED** | Non-critical items waived by stakeholder | Proceed with documented justification |

### Recovery Protocol

```
FAIL
  │
  ├── Attempt 1: Fix issues, re-run validation
  │       │
  │       └── FAIL again?
  │               │
  │               ├── Attempt 2: Fix issues, re-run validation
  │               │       │
  │               │       └── FAIL again?
  │               │               │
  │               │               └── MANDATORY COURSE CORRECTION
  │               │                   (Escalate to project leadership)
  │               │
  │               └── PASS → Continue
  │
  └── PASS → Continue
```

**Locked Categories:** When a gate fails, categories that passed are "locked" and don't need re-validation.

### TEA Integration

TEA (Test Engineering Agent) owns verification for specific quality gates:

| TEA-Owned Gates | Purpose |
|-----------------|---------|
| QG-I2 | Tenant safety verification |
| QG-I3 | Agent safety verification |
| QG-TC1 | Unit test coverage thresholds |
| QG-TC2 | Integration test coverage |
| QG-TC3 | E2E test coverage |

**Handoff Protocol:**
- BAM `convergence-verification` workflow produces checklists and criteria
- Handoff to TEA `tea-trace` workflow for formal verification sign-off
- BAM provides checklists, TEA executes verification and reports results

### BMM Phase Mapping

BAM uses descriptive phase names in CSV files. The `bmm_phase` column provides numeric mapping for BMM compatibility:

| BAM Phase (Descriptive) | bmm_phase (Numeric) |
|-------------------------|---------------------|
| discovery | 1-discovery |
| planning | 2-planning |
| foundation | 3-solutioning |
| solutioning | 3-solutioning |
| integration | 4-implementation |
| implementation | 4-implementation |
| quality | 5-quality |
| operations | 6-operations |

### Design Decision: Required with Optional Prerequisites

BAM intentionally allows **required** workflows to depend on **optional** prerequisites. This is an explicit design decision, not a bug.

**Affected Workflows:**

| Required Workflow | Optional Prerequisites | Why Optional |
|-------------------|------------------------|--------------|
| `create-master-architecture` | `requirement-ingestion`, `triage-module-complexity` | Teams may have requirements from Jira, Notion, or existing PRDs |
| `validate-foundation` | `scaffold-foundation` | Teams may scaffold manually or have existing infrastructure |

**Design Principle: Enforce Outputs, Not Process**

- Required workflows enforce that a **deliverable exists** and meets quality criteria
- They do NOT enforce **how** that deliverable was created
- Example: `validate-foundation` checks QG-F1 passes, regardless of whether `scaffold-foundation` was used

**Flexible Entry Points:**

```
External PRD exists?
    │
    ├── YES ──► Skip requirement-ingestion ──► create-master-architecture
    │
    └── NO ───► requirement-ingestion ──► triage-module-complexity ──► create-master-architecture

Existing scaffolding?
    │
    ├── YES ──► Skip scaffold-foundation ──► validate-foundation (still required!)
    │
    └── NO ───► scaffold-foundation ──► validate-foundation
```

**Validation Gates Are Never Skippable:**
- `validate-foundation` (QG-F1) - Required before module design
- `validate-module` (QG-M1/M2/M3) - Required before integration  
- `convergence-verification` (QG-I1/I2/I3) - Required before production

This ensures quality regardless of the path taken to create artifacts.

---

## Tenant Model Deep Dive

### Row-Level Security (RLS)

```
┌─────────────────────────────────────┐
│           Single Database            │
│  ┌─────────────────────────────┐    │
│  │       Shared Tables          │    │
│  │  ┌───────┬───────┬───────┐  │    │
│  │  │Tenant │Tenant │Tenant │  │    │
│  │  │  A    │  B    │  C    │  │    │
│  │  │(rows) │(rows) │(rows) │  │    │
│  │  └───────┴───────┴───────┘  │    │
│  │     RLS Policy Filters       │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Use when:** <1000 tenants, cost efficiency, shared resources
**Knowledge:** `rls-best-practices.md`

### Schema-Per-Tenant

```
┌─────────────────────────────────────┐
│           Single Database            │
│  ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │Schema A │ │Schema B │ │Schema C││
│  │ tables  │ │ tables  │ │ tables ││
│  └─────────┘ └─────────┘ └────────┘│
└─────────────────────────────────────┘
```

**Use when:** Regulated industries, need schema-level isolation
**Knowledge:** `multi-tenant-patterns.md`

### Database-Per-Tenant

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│Database A│  │Database B│  │Database C│
│ Tenant A │  │ Tenant B │  │ Tenant C │
└──────────┘  └──────────┘  └──────────┘
       │             │             │
       └─────────────┴─────────────┘
                     │
              Connection Router
```

**Use when:** Enterprise tier, maximum isolation, compliance requirements
**Knowledge:** `multi-tenant-patterns.md`

---

## AI Runtime Deep Dive

### LangGraph (Recommended)

```
┌────────────────────────────────────┐
│         LangGraph Graph            │
│  ┌─────────┐    ┌─────────┐       │
│  │ Node A  │───►│ Node B  │       │
│  │ (Tool)  │    │ (LLM)   │       │
│  └─────────┘    └────┬────┘       │
│                      │            │
│              ┌───────▼───────┐    │
│              │   Conditional  │    │
│              │     Router     │    │
│              └───┬───────┬───┘    │
│                  │       │        │
│           ┌──────▼─┐ ┌───▼────┐   │
│           │ Node C │ │ Node D │   │
│           └────────┘ └────────┘   │
└────────────────────────────────────┘
```

**Best for:** State machines, complex workflows, conditional branching
**Knowledge:** `agent-runtime-patterns.md`

### CrewAI

```
┌────────────────────────────────────┐
│            Crew Manager            │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent 1  │  │ Agent 2  │       │
│  │(Analyst) │  │(Writer)  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       └──────┬──────┘             │
│              │                    │
│       ┌──────▼──────┐             │
│       │ Task Queue  │             │
│       └─────────────┘             │
└────────────────────────────────────┘
```

**Best for:** Role-based collaboration, task delegation
**Knowledge:** `run-contracts.md`

### AutoGen

```
┌────────────────────────────────────┐
│        Conversation Manager        │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent A  │◄─┤ Agent B  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       │  Messages   │             │
│       └──────►◄─────┘             │
└────────────────────────────────────┘
```

**Best for:** Multi-agent conversations, debate/consensus
**Knowledge:** `agent-runtime-patterns.md`

### DSPy

```
┌────────────────────────────────────┐
│         DSPy Pipeline              │
│  ┌──────────┐    ┌──────────┐     │
│  │ Module 1 │───►│ Module 2 │     │
│  │(Retrieve)│    │(Generate)│     │
│  └──────────┘    └────┬─────┘     │
│                       │           │
│              ┌────────▼────────┐  │
│              │   Teleprompter  │  │
│              │   (Optimizer)   │  │
│              └─────────────────┘  │
└────────────────────────────────────┘
```

**Best for:** Prompt optimization, reproducible outputs, module composition
**Knowledge:** `agent-runtime-patterns.md`

### Instructor

```
┌────────────────────────────────────┐
│      Instructor + Pydantic         │
│  ┌──────────┐    ┌──────────┐     │
│  │   LLM    │───►│ Pydantic │     │
│  │  Output  │    │  Model   │     │
│  └──────────┘    └────┬─────┘     │
│                       │           │
│              ┌────────▼────────┐  │
│              │   Validation    │  │
│              │   + Retry       │  │
│              └─────────────────┘  │
└────────────────────────────────────┘
```

**Best for:** Structured outputs, type-safe responses, schema enforcement
**Knowledge:** `agent-runtime-patterns.md`

---

## Sidecar Memory Pattern

Sidecar memory persists agent preferences across sessions.

### Template Location (Flat, BMM-Compatible)

```
src/templates/
├── sidecar-architecture-decisions.md    # For Winston+Atlas capabilities
├── sidecar-runtime-preferences.md       # For Winston+Nova capabilities
├── sidecar-contract-history.md          # For Winston+Kai capabilities
├── master-architecture-template.md      # Output templates...
└── ...
```

**Why flat?** Official BMM modules use flat `templates/` directories. Subdirectories are non-standard and may cause BMB installer issues.

### Runtime Location (After Install)

```
{project-root}/_bmad/_memory/
├── architect-bam-sidecar/
│   ├── architecture-decisions.md
│   ├── runtime-preferences.md
│   └── contract-history.md
```

### How It Works

1. **Install:** Templates copied to `_bmad/_memory/{agent}-sidecar/`
2. **Activation:** Extension prompts reference sidecar files
3. **Persistence:** Agent updates sidecar during session
4. **Next Session:** Agent loads sidecar for continuity

### Usage in Extension

```yaml
prompts:
  - id: load-platform-context-prompt
    content: |
      Load your persistent memory:
      `{project-root}/_bmad/_memory/architect-bam-sidecar/architecture-decisions.md`
      
      Review prior decisions before making recommendations.
```

---

## Context Flow

Understanding how context flows through BAM:

```
User Request
    │
    ▼
┌─────────────────┐
│   Extension     │  ← User triggers menu item (e.g., "bam-platform-context")
│  ({agent}-bam)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Agent Guide    │  ← Prompt reads guide file
│ (agent-guides/) │     Establishes domain context
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Pattern Registry│  ← Guide references pattern CSVs
│    (data/)      │     Decision criteria + web queries
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Step Files    │  ← Workflow steps reference patterns
│   (steps/)      │     Describe WHAT actions to take
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Templates     │  ← Steps produce outputs using templates
│  (templates/)   │
└────────┬────────┘
         │
         ▼
    Output Artifact
    ({output_folder}/...)
```

---

## Template Variables

Templates use double-brace placeholders:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `{{project_name}}` | Project name | `MyAIPlatform` |
| `{{date}}` | Current date | `2026-04-06` |
| `{{version}}` | Document version | `1.0.0` |
| `{{author}}` | Document author | `Platform Architect` |
| `{{module_name}}` | Current module | `billing` |
| `{{tenant_model}}` | Selected isolation | `row-level-security` |
| `{{ai_runtime}}` | Selected framework | `langgraph` |
| `{{tier}}` | Tenant tier | `free`, `pro`, `enterprise` |

---

## Naming Conventions

Consistent naming prevents confusion and duplicate files. Follow these conventions strictly.

### Agent Guides (`src/data/agent-guides/bam/`)

| Pattern | Rule | Examples |
|---------|------|----------|
| **Single canonical name** | One file per concept, no near-duplicates | `caching-strategies.md` NOT both `caching-strategy.md` AND `caching-strategies.md` |
| **Suffix `-patterns`** | Use for pattern catalogs with decision frameworks | `scaling-patterns.md`, `event-driven-patterns.md` |
| **No suffix** | Use for concept overviews and guides | `ai-runtime.md`, `memory-tiers.md` |
| **Suffix `-guide`** | Use for how-to guides with step-by-step instructions | `white-labeling-guide.md`, `local-development-setup.md` |
| **Domain prefix** | Group related guides with consistent prefixes | `tenant-*`, `ai-*`, `agent-*`, `mcp-*` |

**Before creating a new guide, check for existing similar files:**
```bash
# Check for similar names before creating
ls src/data/agent-guides/bam/ | grep -i "caching"
ls src/data/agent-guides/bam/ | grep -i "runtime"
```

**Canonical Names (use these, not alternatives):**

| Use This | NOT These |
|----------|-----------|
| `scaling-patterns.md` | `scale-patterns.md`, `scaling.md` |
| `event-driven-patterns.md` | `event-driven.md`, `events.md` |
| `caching-strategies.md` | `caching-strategy.md`, `cache-patterns.md` |
| `memory-tiers.md` | `memory-tier-patterns.md`, `memory.md` |
| `run-contracts.md` | `run-contract-patterns.md`, `contracts.md` |
| `ai-runtime.md` | `agent-runtime.md`, `runtime.md` |
| `local-development-setup.md` | `local-dev.md`, `dev-setup.md` |
| `audit-logging-patterns.md` | `audit-trail-patterns.md`, `audit.md` |
| `llm-versioning.md` | `ai-model-versioning.md` (LLM-specific) |
| `ml-model-versioning.md` | `model-versioning-patterns.md` (ML artifacts) |

### Templates (`src/templates/`)

| Pattern | Rule | Examples |
|---------|------|----------|
| **Suffix `-template.md`** | All templates must end with `-template.md` | `master-architecture-template.md` |
| **Singular vs Plural** | Use singular for single-item templates, plural for collections | `module-epic-template.md` (one epic) vs `module-epics-template.md` (collection) |
| **Domain prefix** | Group by domain | `tenant-*-template.md`, `ai-*-template.md` |
| **Action prefix** | For action-oriented templates | `create-*`, `validate-*`, `design-*` |

### Workflows (`src/workflows/`)

| Pattern | Rule | Examples |
|---------|------|----------|
| **Kebab-case** | All lowercase with hyphens | `tenant-model-isolation`, `ai-agent-debug` |
| **Verb-noun** | Action followed by subject | `create-master-architecture`, `validate-foundation` |
| **Domain grouping** | Related workflows share prefix | `tenant-onboarding-*`, `ai-*`, `facade-*` |

### Preventing Duplicates Checklist

Before creating ANY new file:

- [ ] Search for existing files with similar names: `ls | grep -i "{keyword}"`
- [ ] Check if a broader/narrower version already exists
- [ ] Verify the canonical name in this document
- [ ] If unsure, ask: "Is this a pattern catalog (-patterns), a guide (-guide), or a concept overview (no suffix)?"
- [ ] Run `npm test` to catch naming violations

---

## Common Tasks

### Adding a New Workflow

```bash
# 1. Create directory (unified steps pattern)
mkdir -p src/workflows/{workflow-name}/steps

# 2. Create required files
touch src/workflows/{workflow-name}/bmad-skill-manifest.yaml
touch src/workflows/{workflow-name}/SKILL.md
touch src/workflows/{workflow-name}/workflow.md
touch src/workflows/{workflow-name}/instructions.md

# 3. Create step files (BMAD naming: step-NN-mode-description.md)
# Create mode steps (01-09)
touch src/workflows/{workflow-name}/steps/step-01-c-{first-step}.md
touch src/workflows/{workflow-name}/steps/step-02-c-{second-step}.md
# Edit mode steps (10-19)
touch src/workflows/{workflow-name}/steps/step-10-e-load-existing.md
touch src/workflows/{workflow-name}/steps/step-11-e-apply-changes.md
# Validate mode steps (20-29)
touch src/workflows/{workflow-name}/steps/step-20-v-load-artifact.md
touch src/workflows/{workflow-name}/steps/step-21-v-validate.md
touch src/workflows/{workflow-name}/steps/step-22-v-generate-report.md

# 4. Add to module-help.csv
# Add row with 13 columns

# 5. Create bmad-manifest.json (optional, for dependency chains)

# 6. Test
npm test
```

### Adding a New Extension

```bash
# 1. Create extension file
touch src/extensions/{agent}-bam.yaml

# 2. Create agent guide
touch src/data/agent-guides/bam/{domain}.md

# 3. Follow WDS pattern (no memories:)

# 4. Test
npm test
```

### Adding Patterns to Registry

```bash
# 1. Open relevant CSV file
vim src/data/bam-patterns.csv

# 2. Add new row with columns:
#    pattern_id,name,category,decision_criteria,web_query,related_patterns

# 3. Reference from step files:
#    **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{pattern_id}`

# 4. Test
npm test
```

### Updating Quality Gate Checklist

```bash
# 1. Edit checklist
vim src/checklists/{gate}.md

# 2. Ensure format:
#    - [ ] {Check item}
#    - [ ] **CRITICAL:** {Critical check item}

# 3. Test
npm test
```

---

## Anti-Patterns

| Anti-Pattern | Why Wrong | Correct Approach |
|--------------|-----------|------------------|
| `memories:` field | No official module uses it, breaks BMB | Use agent-guides with prompts |
| Code in step files | Steps describe WHAT, not HOW | Reference pattern registry + web research |
| Standalone BAM agents | BAM is pure extension module | Merge into existing extensions |
| QA/SM extensions | BMM consolidated these into Dev | Include in dev-bam.yaml |
| Array capabilities | Not BMAD standard | Use comma-separated strings |
| Hardcoded paths | Won't work across installs | Use `{project-root}` placeholder |
| Missing step modes | Incomplete workflow | Include Create (01-09), Edit (10-19), Validate (20-29) steps |
| Missing module-help entry | Workflow won't appear in help | Add CSV row for every workflow |
| Template code in steps | Duplicates knowledge | Reference templates with **Load template:** |
| Hardcoded year in search | Becomes stale | Use `{date}` placeholder |
| Web search in Edit/Validate | Verification modes don't research | Only Add web search to Create-mode steps |
| Missing `_Source:` citation | Unverifiable findings | Always cite `_Source: [URL]_` |
| Mandatory blocking search | BAM uses solutioning pattern | Use targeted verification, not mandatory |
| Extension without research | Inconsistent capability | Add `bam-*-research` menu item |
| **Duplicate guide names** | Creates confusion, orphans references | Check existing files before creating, use canonical names |
| **Singular/plural variants** | `caching-strategy` AND `caching-strategies` | Pick ONE canonical name, delete the other |
| **Inconsistent suffixes** | `event-driven` AND `event-driven-patterns` | Use `-patterns` for catalogs, no suffix for overviews |
| **Ambiguous prefixes** | `agent-runtime` vs `ai-runtime` | Use domain-specific prefix (`ai-` for models, `agent-` for agents) |
| **Missing frontmatter** | Template won't pass tests | Always add YAML frontmatter with name, description, category |
| **Missing Change Log** | No version history | Always add Change Log section at end of templates |
| **SKILL.md name ≠ directory** | BMB installer skips workflow | `name:` MUST match directory name (BMB uses directory as canonical ID) |

---

## Testing

### Run All Tests

```bash
npm test                           # All 389 tests
npm test -- --watch                # Watch mode
npm test -- --verbose              # Detailed output
npm test -- test/schema.test.js   # Specific file
```

### Test Files

| File | What It Tests |
|------|---------------|
| `test/schema.test.js` | Agent/extension YAML format, no memories field |
| `test/extension.test.js` | WDS pattern compliance, prompt references |
| `test/workflow.test.js` | CEV structure, manifest presence |
| `test/install.test.js` | BMB compatibility, package.json, module.yaml |
| `test/integration.test.js` | Ecosystem integration (BMM, TEA, WDS, CIS) |

### Expected Counts

| Component | Count | Web Search |
|-----------|-------|------------|
| Agents | 0 (BAM is a pure extension module) | N/A |
| Extensions | 31 | 100% (all have `bam-*-research` menu) |
| Workflows | 191 | 100% (Create-mode steps with directives) |
| Pattern CSVs | 6 | 100% (`web_queries` column with `{date}`) |
| Agent Guides | 189 | 100% (all have Web Research section) |
| Checklists | 36 | 100% have web research verification |
| Templates | 453 | 100% (all have Web Research section) |

---

## Quick Reference

### File Locations

| Need | Location |
|------|----------|
| Add extension | `src/extensions/{agent}-bam.yaml` |
| Add workflow | `src/workflows/{name}/` |
| Add pattern | `src/data/bam-patterns.csv` (add row) |
| Add agent guide | `src/data/agent-guides/bam/{domain}.md` |
| Add checklist | `src/checklists/{gate}.md` |
| Add template | `src/templates/{artifact}-template.md` |
| Add to help | `src/workflows/module-help.csv` |
| Configure module | `src/workflows/module.yaml` |

### Key Commands

```bash
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm run lint               # Lint (if configured)
```

### Extension Base Agents

| Extension | Extends |
|-----------|---------|
| analyst-bam | bmad-agent-analyst |
| architect-bam | bmad-agent-architect |
| dev-bam | bmad-agent-dev |
| pm-bam | bmad-agent-pm |
| ux-bam | bmad-agent-ux-designer |
| tech-writer-bam | bmad-agent-tech-writer |
| tea-bam | bmad-tea |
| wds-saga-bam | wds-agent-saga-analyst |
| wds-freya-bam | wds-agent-freya-ux |
| cis-*-bam | bmad-cis-agent-* |
| master-architect-bam | bmad-agent-architect |

### Quality Gate Quick Reference

| Gate | Checklist | Trigger |
|------|-----------|---------|
| QG-F1 | foundation-gate.md | After create-master-architecture |
| QG-M1 | module-architecture.md | After create-module-architecture |
| QG-M2 | tenant-isolation.md | After tenant-model-isolation |
| QG-M3 | qg-m3-*.md | After agent-runtime-architecture |
| QG-I1 | qg-i1-convergence.md | Before release |
| QG-I2 | qg-i2-tenant-safety.md | Before release |
| QG-I3 | qg-i3-agent-safety.md | Before release |
| QG-P1 | production-readiness.md | Before production |

### Web Search Quick Reference

| Component | Directive/Pattern | Example |
|-----------|------------------|---------|
| Step files | `Search the web: "{topic} {date}"` | `Search the web: "PostgreSQL RLS best practices {date}"` |
| Citations | `_Source: [URL]_` | `_Source: [https://example.com]_` |
| Extensions | `bam-{domain}-research` menu | `bam-architect-research`, `bam-pm-research` |
| Pattern CSV | `web_queries` column | `"multi-tenant isolation {date};RLS patterns {date}"` |
| Templates | `## Web Research Queries` section | Before Verification Checklist |
| Guides | `### Web Research` subsection | In Related Patterns section |

---

## Version Compatibility

| Component | Required Version |
|-----------|-----------------|
| Node.js | >= 20.0.0 |
| BMAD Method (BMB) | >= 1.0.0 |
| BMM (recommended) | >= 1.0.0 |
| TEA (optional) | >= 1.0.0 |
| WDS (optional) | >= 1.0.0 |
| CIS (optional) | >= 1.0.0 |

---

## BMM Compatibility & BAM Extensions

BAM follows BMM (BMAD Method) patterns with documented intentional deviations for extension module optimization.

### Intentional Deviations from BMM Standard

| Deviation | BMM Standard | BAM Implementation | Rationale |
|-----------|--------------|-------------------|-----------|
| Step directories | `steps-c/`, `steps-e/`, `steps-v/` | Unified `steps/` with mode suffix (`step-NN-c-*`, `step-NN-e-*`, `step-NN-v-*`) | Simpler structure for extension module, easier navigation |
| SKILL.md style | Minimal with `workflow.md` reference | Full instructions embedded | Self-contained workflows, no cross-file dependencies |
| Phase organization | `1-analysis/`, `2-plan-workflows/` | Domain folders (`foundation/`, `module/`, `integration/`) | Domain-driven design aligns with modular monolith patterns |
| Templates location | May use subdirectories | Flat `templates/` directory | BMB installer compatibility |

### BAM-Specific Extension Fields

These fields extend BMM manifests for enhanced functionality:

**In `bmad-skill-manifest.yaml`:**

| Field | Purpose | Example |
|-------|---------|---------|
| `displayName` | Human-readable name for UI display | `Agent Runtime Architecture` |

> **Note:** BMB uses the directory name as the canonical ID. The `canonicalId` field was removed as it is ignored by BMB.

**In `SKILL.md` frontmatter:**

| Field | Purpose | Example |
|-------|---------|---------|
| `displayName` | Human-readable workflow name | `Agent Runtime Architecture` |
| `tags` | Categorization for filtering/search | `[ai-runtime, platform]` |

### Compatibility Notes

- All BAM extensions are **additive** - they don't break BMM standard processing
- The unified `steps/` approach uses mode suffixes (`-c-`, `-e-`, `-v-`) that are semantically equivalent to separate directories
- Domain organization maps to BMM phases via `module-help.csv` phase column

---

## Contributing Checklist

Before submitting changes:

- [ ] `npm test` passes (all 327 tests)
- [ ] No `memories:` field in extensions
- [ ] Step files reference pattern registry (no inline code)
- [ ] New workflows use unified steps/ with step-NN-mode-description.md naming
- [ ] New workflows added to module-help.csv
- [ ] New workflows have bmad-manifest.json for dependency chains
- [ ] Agent guides have "When to load:" header
- [ ] Templates use `{{lowercase_variable}}` format
- [ ] Pattern registry has web_queries column with `{date}` placeholder
- [ ] Checklists use `- [ ]` format

**Naming Convention Requirements:**
- [ ] New agent guides use canonical names (see [Naming Conventions](#naming-conventions))
- [ ] No duplicate/near-duplicate file names created
- [ ] Checked for existing similar files before creating new ones
- [ ] Templates have YAML frontmatter (name, description, category, version)
- [ ] Templates have Change Log section at end
- [ ] File names follow domain prefix conventions (`tenant-*`, `ai-*`, `agent-*`)

**Web Search Requirements:**
- [ ] Create-mode step files include `Search the web:` directives
- [ ] Step files have `🔍 Use web search` in EXECUTION PROTOCOLS
- [ ] New templates include `## Web Research Queries` section
- [ ] New extensions include `bam-*-research` menu item
- [ ] Agent guides include `### Web Research` subsection
- [ ] Citations use `_Source: [URL]_` format
