# CLAUDE.md - BAM Extension Module

> **Quick Start:** BAM is a **pure extension module** with 0 standalone agents. **V1** (`src/`): 31 extensions, 196 workflows, 15 customize files. **V2** (`src-v2/`): 14 TOML customize files, 34 skills, 112 patterns, 33 checklists - a 6:1 consolidation. Atlas, Nova, Kai personas consolidated into `architect-bam.yaml`. Run `npm test` before any PR. Never use `memories:` field (V1) or TOML `memories` key (V2).

---

## Table of Contents

1. [What is BAM?](#what-is-bam)
2. [BMAD Method Integration](#bmad-method-integration)
3. [Architecture Overview](#architecture-overview)
4. [V2 Architecture (Consolidated)](#v2-architecture-consolidated)
5. [Configuration Variables](#configuration-variables)
6. [Directory Structure](#directory-structure)
7. [Variable Placeholders](#variable-placeholders)
8. [Extension Pattern (WDS)](#extension-pattern-wds)
9. [Customize Files (Extension Loading)](#customize-files-extension-loading)
10. [WDS Agent Coexistence Model](#wds-agent-coexistence-model)
11. [Step File Pattern (BMM)](#step-file-pattern-bmm)
12. [Pattern Registry Structure](#pattern-registry-structure)
    - [6-Point Anti-Decay Strategy](#6-point-anti-decay-strategy)
13. [Pattern File Standards (V2)](#pattern-file-standards-v2)
14. [Web Search Integration](#web-search-integration)
15. [Agent Guide Pattern](#agent-guide-pattern)
16. [Workflow Structure (CEV)](#workflow-structure-cev)
17. [Module Help CSV Schema](#module-help-csv-schema)
18. [Quality Gates & Recovery](#quality-gates--recovery)
19. [Tenant Model Deep Dive](#tenant-model-deep-dive)
20. [AI Runtime Deep Dive](#ai-runtime-deep-dive)
21. [Sidecar Memory Pattern](#sidecar-memory-pattern)
22. [Context Flow](#context-flow)
23. [Template Variables](#template-variables)
24. [Naming Conventions](#naming-conventions)
25. [Common Tasks](#common-tasks)
26. [Anti-Patterns](#anti-patterns)
27. [Testing](#testing)
28. [Quick Reference](#quick-reference)

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
- **Sidecar templates** - Flat in `src/data/templates/sidecar-*.md` (BMM-compatible naming)

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
├── 15 customize files (auto-generated from extensions, enables BMAD native loading)
├── 196 workflows (179 flat + 17 nested in 7 container directories)
├── 6 pattern registry CSVs (192 patterns with decision criteria + web queries with {date} placeholder)
├── 233 agent guides (context injection via WDS pattern, all with Web Research sections)
├── 39 checklists (all QG-named, with web research verification)
└── 461 templates (output artifacts + sidecar-*.md + spec/catalog files)
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
- Sidecar templates → `src/data/templates/sidecar-*.md` (flat, BMM-compatible naming)

> **Note:** `architect-bam.yaml` has 44 menu items (above the 5-10 recommendation) because it consolidates three architect personas: Atlas (Platform), Nova (AI Runtime), and Kai (Integration). This is an intentional design decision to keep related capabilities together rather than fragmenting into multiple extensions.

---

## V2 Architecture (Consolidated)

BAM V2 (`src-v2/`) is a consolidated redesign achieving 6:1 reduction while maintaining full capability coverage.

```
BAM V2 Extension Module (src-v2/)
├── 14 TOML customize files (BMAD v6.4.0 format)
├── 34 workflow skills (CEV: Create/Edit/Validate modes)
├── 112 pattern files (with shortcodes ZXX, NEXUS Phase 4 complete)
├── 16 domain files (enriched with multi-tenant context)
├── 33 checklists (QG-* format with recovery protocols)
├── 41 templates (output artifacts)
├── 3 persona files (Atlas, Nova, Kai)
├── 6 CSV registries (patterns, gates, compliance)
└── 3 sidecar memory templates
```

### V2 Directory Structure

```
src-v2/
├── module.yaml                    # V2 module configuration
├── customize/                     # 14 TOML files (BMAD v6.4.0)
│   ├── bmad-agent-architect.toml  # Platform architecture
│   ├── bmad-agent-devops.toml     # Resilience, DR patterns
│   ├── bmad-agent-security.toml   # Security operations
│   ├── bmad-agent-compliance.toml # Privacy, GDPR workflows
│   ├── bmad-agent-data.toml       # Data residency, tenant lifecycle
│   └── ... (7 more)
│
├── skills/                        # 34 workflow skills
│   └── bmad-bam-{skill-name}/
│       ├── SKILL.md               # 6-step activation protocol
│       ├── bmad-skill-manifest.yaml
│       ├── customize.toml         # Skill-specific TOML
│       ├── workflow.md            # Mode router
│       └── steps/                 # CEV step files
│           ├── step-01-c-*.md     # Create mode (01-09)
│           ├── step-10-e-*.md     # Edit mode (10-19)
│           └── step-20-v-*.md     # Validate mode (20-29)
│
└── data/
    ├── context/bam-core.md        # Core BAM context (all TOMLs reference)
    ├── personas/                  # 3 architect personas
    ├── domains/                   # 16 domain files (enriched)
    ├── patterns/                  # 112 pattern files with shortcodes
    ├── checklists/                # 33 QG-* checklists
    ├── templates/                 # 40 output templates
    ├── sidecar/                   # 3 memory templates
    └── *.csv                      # 6 registry files
```

### V2 TOML Format (BMAD v6.4.0)

```toml
# Example: bmad-agent-security.toml
[agent]
activation_steps_append = [
  "BAM Security capabilities available. Use ZSO for security operations.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/patterns/zero-trust.md",
]

principles = [
  "BAM Security: Zero trust for all tenant boundaries.",
  "BAM Gates: QG-S3 (Security Baseline), QG-IR (Incident Response).",
]

[[agent.menu]]
code = "ZSO"
description = "Security Operations: secrets, threat modeling, incident response"
skill = "bmad-bam-security-operations"

[[agent.menu]]
code = "ZPZT"
description = "Load: Zero Trust pattern details"
prompt = """
Loading zero trust pattern:
`{project-root}/_bmad/bam/data/patterns/zero-trust.md`
Confirm loaded. Ready for zero trust architecture guidance.
"""
```

### V2 Asset Counts

| Asset | Count | Purpose |
|-------|-------|---------|
| TOML customize files | 14 | Agent capability extensions |
| Workflow skills | 34 | CEV-mode workflows |
| Pattern files | 112 | Architecture patterns with shortcodes (NEXUS Phase 4) |
| Domain files | 16 | Enriched multi-tenant domains |
| Checklists | 33 | Quality gate verification |
| Templates | 41 | Output artifact templates |
| Personas | 3 | Atlas, Nova, Kai |
| CSV registries | 6 | Pattern/gate/compliance data |
| Sidecar templates | 3 | Persistent memory |

### V1 vs V2 Comparison

| Aspect | V1 (`src/`) | V2 (`src-v2/`) |
|--------|-------------|----------------|
| Config format | YAML extensions | TOML (BMAD v6.4.0) |
| Workflows | 196 | 34 (6:1 consolidation) |
| Agent guides | 233 | 16 domains + 112 patterns |
| Templates | 461 | 41 |
| Checklists | 39 | 33 |
| Menu codes | Various | Z/Y prefix standard |

### V2 Testing

```bash
# Run V2-specific tests
npm test -- test/v2/

# Tests verify:
# - 14 TOML files with required sections
# - 34 workflows with CEV steps
# - 112 pattern files with required sections
# - All menu codes use Z/Y prefix
# - No memories field in TOMLs
# - All TOMLs reference bam-core.md
# - No duplicate shortcodes
# - All pattern cross-references valid
```

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

> **BMB Compatibility:** This structure is optimized for the BMB (BMAD Method Base) installer. All resources are consolidated under `src/data/` so BMB copies them correctly during installation. The `agents/` and `skills/` directories are empty placeholders for BMB compatibility.

```
src/
├── module.yaml                  # Module configuration (BMB-required location)
├── module-help.csv              # Help system entries (166 rows)
├── agents/                      # Empty (BAM has 0 standalone agents)
├── skills/                      # Empty (BMB compatibility placeholder)
│
├── _config/                     # BMAD native customization files
│   └── agents/                  # 15 customize files (auto-generated)
│       ├── bmad-agent-architect.customize.yaml   # 5 extensions merged
│       ├── bmad-agent-analyst.customize.yaml     # 3 extensions merged
│       ├── bmad-agent-pm.customize.yaml          # 4 extensions merged
│       ├── bmad-agent-dev.customize.yaml         # 2 extensions merged
│       ├── bmad-cis-agent-innovation-strategist.customize.yaml  # 7 extensions merged
│       └── ... (10 more single-extension files)
│
├── workflows/                   # 194 workflows (177 flat + 17 nested in containers)
│   ├── {flat-workflow}/              # Flat workflows (e.g., tenant-model-isolation/)
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
└── data/                        # ALL resources consolidated here (BMB copies this)
    ├── bam-patterns.csv              # Core patterns with decision criteria
    ├── tenant-models.csv             # Tenant isolation patterns
    ├── ai-runtimes.csv               # AI runtime patterns
    ├── quality-gates.csv             # Quality gate requirements
    ├── compliance-frameworks.csv     # Compliance matrix
    ├── section-pattern-map.csv       # Section to pattern mapping
    │
    ├── agent-guides/
    │   └── bam/                 # 233 context injection guides (all with Web Research)
    │       ├── platform-architecture.md
    │       ├── ai-runtime.md
    │       ├── tenant-isolation.md
    │       └── ...
    │
    ├── extensions/              # 31 agent capability extensions
    │   ├── analyst-bam.yaml         # Extends bmad-agent-analyst
    │   ├── architect-bam.yaml       # Extends bmad-agent-architect (Atlas+Nova+Kai)
    │   ├── dev-bam.yaml             # Extends bmad-agent-dev (QA+SM merged)
    │   ├── pm-bam.yaml              # Extends bmad-agent-pm
    │   ├── ux-bam.yaml              # Extends bmad-agent-ux-designer
    │   ├── tea-bam.yaml             # Extends bmad-tea
    │   ├── wds-saga-bam.yaml        # Extends wds-agent-saga-analyst
    │   ├── wds-freya-bam.yaml       # Extends wds-agent-freya-ux
    │   ├── cis-*-bam.yaml (12)      # Extends CIS agents
    │   └── master-architect-bam.yaml
    │
    ├── checklists/              # 39 quality gate checklists
    │   ├── foundation-gate.md            # QG-F1 (with 3-step recovery)
    │   ├── module-architecture.md        # QG-M1
    │   ├── tenant-isolation.md           # QG-M2 (with 3-step recovery)
    │   ├── qg-m3-agent-runtime.md        # QG-M3
    │   ├── qg-i1-convergence.md          # QG-I1
    │   ├── qg-i2-tenant-safety.md        # QG-I2
    │   ├── qg-i3-agent-safety.md         # QG-I3
    │   ├── qg-security-continuous.md     # Continuous security
    │   ├── production-readiness.md       # QG-P1 (with 3-step recovery)
    │   └── ...
    │
    └── templates/               # 460 templates (output artifacts + sidecar)
        ├── master-architecture-template.md
        ├── module-architecture-template.md
        ├── facade-contract-template.md
        ├── sidecar-architecture-decisions.md
        └── ...
```

### Post-Installation Structure

After `npx bmad-method install`, BAM resources are at:

```
{project-root}/
├── .claude/skills/              # 191 BAM skill directories
│   ├── agent-execution-tracing/
│   ├── tenant-model-isolation/
│   └── ...
│
└── _bmad/bam/                   # BAM module resources
    ├── config.yaml              # User configuration
    ├── module-help.csv          # Help system entries
    └── data/                    # All resources
        ├── agent-guides/bam/    # 233 agent guides
        ├── extensions/          # 31 extension YAMLs
        ├── templates/           # 461 templates
        ├── checklists/          # 39 checklists
        └── *.csv                # 6 pattern registry CSVs
```

### Installation Verification

Run `./scripts/verify-install.sh _bmad/bam` to verify installation:

```bash
# Expected output:
# [PASS] Agent guides: 233 files
# [PASS] Templates: 461 files
# [PASS] Checklists: 39 files
# [PASS] Extensions: 31 files
```

If installation is incomplete, run `./scripts/post-install.sh _bmad/bam` to fix.

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

### Runtime Variable Resolution

**How `{project-root}` Resolves:**

```
1. Claude Code IDE provides workspace root path
2. BMB installer writes to _bmad/bam/config.yaml:
   output_folder: "{project-root}/_bmad-output"
   
3. At runtime, agent reads config.yaml
4. IDE resolves {project-root} to actual path:
   /home/user/my-project/_bmad-output
```

**How `{date}` Resolves in Web Queries:**

Pattern registry CSVs contain web_queries with `{date}` placeholder:
```csv
web_queries
"PostgreSQL RLS multi-tenant best practices {date}"
```

At runtime:
```
1. Agent reads pattern CSV row
2. Extracts web_queries column
3. Replaces {date} with current year (e.g., 2026)
4. Executes: "PostgreSQL RLS multi-tenant best practices 2026"
```

This ensures web searches always use current best practices.

**Config File Example (`_bmad/bam/config.yaml`):**

```yaml
# Generated by BMAD installer
tenant_model: row-level-security
ai_runtime: langgraph
design_first: "true"
test_architecture: "true"
user_name: Ajay
output_folder: "{project-root}/_bmad-output"
```

---

## Extension Pattern (WDS)

Every extension follows the WDS agent-guides pattern.

### Required Structure

```yaml
# src/data/extensions/{agent}-bam.yaml

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

## Customize Files (Extension Loading)

BAM extensions are converted to BMAD's native `.customize.yaml` format for automatic loading. This bridges the gap between BAM extension files (`src/data/extensions/*.yaml`) and BMAD's agent customization system.

### How It Works

1. **Extensions** live in `src/data/extensions/` (31 files)
2. **Converter script** reads extensions and generates `.customize.yaml` files
3. **Customize files** are placed in `src/_config/agents/` (15 files)
4. **BMAD framework** automatically merges customize files with base agents

### Extension → Customize File Mapping

Multiple extensions targeting the same agent are **merged** into a single customize file:

| Customize File | Source Extensions | Menu Items |
|----------------|-------------------|------------|
| `bmad-agent-architect.customize.yaml` | architect, data, master-architect, ml, security | 99 |
| `bmad-agent-analyst.customize.yaml` | analyst, analytics, compliance | 31 |
| `bmad-agent-pm.customize.yaml` | pm, billing, po, reseller | 31 |
| `bmad-agent-dev.customize.yaml` | dev, devops | 57 |
| `bmad-cis-agent-innovation-strategist.customize.yaml` | 7 CIS extensions | 59 |
| + 10 single-extension files | 1 extension each | varies |
| **Total** | 31 extensions | 368 unique |

### Generation

```bash
# Generate customize files from extensions
npm run generate-customize

# This runs automatically before build
npm run prebuild
```

The script (`scripts/generate-customize-files.js`):
- Cleans output directory before generation (prevents duplicates)
- Merges multiple extensions targeting the same agent
- Deduplicates menu items by trigger, prompts by ID
- Produces idempotent output (same result on repeated runs)

### Customize File Format

```yaml
# BAM Extensions for bmad-agent-architect
# Auto-generated by generate-customize-files.js

memories:
  - 'BAM module installed - Multi-tenant architecture capabilities'
  - 'Multi-tenant SaaS architecture capabilities enabled'

menu:
  - trigger: bam-platform-context
    action: '#load-platform-context-prompt'
    description: Load BAM platform architecture context
  # ... more menu items

prompts:
  - id: load-platform-context-prompt
    content: |
      Read and internalize the BAM platform architecture guide...
  # ... more prompts
```

### Key Behaviors

| Behavior | Description |
|----------|-------------|
| **APPEND** | `menu:` and `prompts:` sections APPEND to base agent |
| **Deduplicate** | Same trigger/id won't appear twice |
| **Merge** | Multiple extensions → single customize file |
| **Clean** | Script cleans output dir before regenerating |

### Testing

```bash
# Test customize file generation
npm test -- test/customize-files.test.js

# Tests verify:
# - 15 customize files exist
# - All 31 extensions processed
# - Valid YAML
# - No duplicate triggers or prompt IDs
# - All menu actions reference valid prompts
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
- **Load template:** `{project-root}/_bmad/bam/data/templates/{template}.md`

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

### 6-Point Anti-Decay Strategy

**Problem:** Static pattern files become outdated. Code written for React 18 in 2024 is misleading when React 19 exists in 2026.

**Solution:** Patterns are **decision guides** that point to web search, not **static encyclopedias** that decay.

| # | Strategy | Implementation | Why It Prevents Decay |
|---|----------|----------------|----------------------|
| 1 | **{date} Web Queries** | All `web_queries` use `{date}` placeholder | Searches always return current year results |
| 2 | **No Implementation Code** | Zero TypeScript/Python/JavaScript in patterns | Code decays fastest; web search gets current code |
| 3 | **YAML Schemas Only** | `bam_controlled: true` contracts | Schemas are stable; implementation changes |
| 4 | **last_reviewed Tracking** | Frontmatter `last_reviewed: YYYY-MM-DD` | Identifies stale patterns needing refresh |
| 5 | **Decision Criteria Focus** | CSV has WHEN to use, not HOW to implement | Criteria stable; implementation evolves |
| 6 | **Web Research Section** | Every pattern has 3-5 search queries | Agent discovers current best practices |

**How It Works:**

```
User: "How do I implement tenant isolation?"

❌ OLD (Decays):
   Pattern has 2024 code → Agent copies stale code → BUG

✅ NEW (Anti-Decay):
   1. CSV: decision_criteria="<1000 tenants → RLS"
   2. CSV: web_queries="PostgreSQL RLS multi-tenant {date}"
   3. Agent searches: "PostgreSQL RLS multi-tenant 2026"
   4. Gets CURRENT best practices → Correct implementation
```

**Enforcement:**
- Tests verify no implementation code blocks (`typescript`, `python`, `javascript`)
- Tests verify all patterns have `## Web Research Queries` section
- Tests verify all web queries contain `{date}` placeholder
- Frontmatter `last_reviewed` enables staleness detection

---

## Pattern File Standards (V2)

V2 pattern files (`src-v2/data/patterns/*.md`) follow strict BMAD compatibility standards. **Every pattern file must pass validation before merge.**

### Required YAML Frontmatter

Every pattern file MUST begin with this exact frontmatter structure:

```yaml
---
pattern_id: {filename-without-extension}  # MUST match filename exactly
shortcode: Z{XX}                          # Z-prefix, 2-4 uppercase alphanumeric, MUST be unique
category: {valid-category}                # See valid categories below
qg_ref: QG-{XX}                           # Quality gate reference
version: 1.0.0                            # Semver format
last_reviewed: YYYY-MM-DD                 # ISO date format
---
```

**Critical Rules:**
- `pattern_id` MUST exactly match the filename (e.g., `tenant-isolation.md` → `pattern_id: tenant-isolation`)
- `shortcode` MUST be unique across ALL pattern files - duplicates cause menu conflicts
- `shortcode` format: Z-prefix + 2-4 uppercase alphanumeric characters (e.g., ZTI, ZTIS, ZA2 for A2A, ZS2 for SOC2)

### Valid Categories

| Category | Description | Example Patterns |
|----------|-------------|------------------|
| ai-runtime | AI agent orchestration | langgraph, agent-orchestration |
| compliance | Regulatory compliance | gdpr-compliance, hipaa-compliance |
| mcp | Model Context Protocol | mcp-server-lifecycle, mcp-tenant-isolation |
| monetization | Billing and pricing | cost-attribution-engine, pricing-strategies |
| operations | Operational patterns | disaster-recovery, incident-response |
| platform | Platform architecture | plugin-architecture, white-label |
| rag | RAG and knowledge | rag-pipeline, semantic-chunking |
| scaling | Performance and scale | horizontal-scaling, performance-isolation |
| security | Security patterns | zero-trust, secrets-management |
| tenant-isolation | Multi-tenant isolation | tenant-isolation (consolidated) |
| testing | Testing patterns | testing-isolation, ai-verification |

**Extended categories** (for specialized patterns): `advanced-ai`, `agent-communication`, `observability`, `ai-safety`, `ai-ops`, `resilience`, `lifecycle`, `discovery`, `integration`

### Required Sections

Every pattern file MUST contain these sections in order:

```markdown
# {Pattern Name} - BAM Pattern

**Loaded by:** {shortcode}  
**Applies to:** {One-line description}

---

## When to Use

- {Condition 1}
- {Condition 2}
- {Condition 3}

## When NOT to Use

- {Anti-condition 1}
- {Anti-condition 2}

## Architecture

{Diagrams using ASCII art, YAML schemas with bam_controlled: true}

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| {Option} | {Benefit} | {Drawback} | {Use case} |

## Quality Checks

- [ ] {Check item 1}
- [ ] {Check item 2}
- [ ] **CRITICAL:** {Critical check - data safety, tenant isolation, etc.}

## Web Research Queries

- "{topic} patterns {date}"
- "{specific topic} multi-tenant {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| {QG-XX} | {What this gate verifies} |

## Related Patterns

- [{pattern-name}.md]({pattern-name}.md) - {Relationship}
```

### Shortcode Uniqueness Rules

**CRITICAL: Duplicate shortcodes break TOML menu systems.**

Before assigning a shortcode:
1. Check existing shortcodes: `grep "^shortcode:" src-v2/data/patterns/*.md | sort -t':' -k3`
2. Verify no duplicates: `grep "^shortcode:" *.md | awk -F': ' '{print $2}' | sort | uniq -d`
3. Use 4-character codes if 3-character conflicts exist (e.g., ZTIS instead of ZTI)

**Shortcode Naming Convention:**
- First letter: Always `Z` (BAM V2 namespace)
- Second letter: Category indicator (T=Tenant, A=AI, M=MCP, S=Security, etc.)
- Remaining letters: Pattern-specific identifier

| Category | Prefix | Examples |
|----------|--------|----------|
| Tenant | ZT | ZTI (tenant-isolation), ZTQ (tenant-quotas) |
| AI/Agent | ZA | ZAO (agent-orchestration), ZAH (agent-handoff) |
| MCP | ZM | ZML (mcp-lifecycle), ZMT (mcp-tenant-isolation) |
| Security | ZS | ZSM (secrets-management), ZZT (zero-trust) |
| RAG | ZR | ZRP (rag-pipeline), ZRS (semantic-chunking) |
| Scaling | ZP, ZV | ZPI (performance-isolation), ZVS (vertical-scaling) |

### CSV Alignment Requirements

Every pattern file MUST have a corresponding entry in `bam-patterns.csv`:

```csv
pattern_id,name,category,...,pattern_file,domain_ref,shortcode
tenant-isolation,Tenant Isolation,tenant-isolation,...,tenant-isolation.md,tenant.md,ZTI
```

**CSV Columns (17 total):**
1. `pattern_id` - Must match filename
2. `name` - Display name
3. `category` - Must match frontmatter category
4. `decision_criteria` - When to use
5. `signals` - Keywords
6. `intent` - Action phrase
7. `variants` - Pattern variants (semicolon-separated)
8. `decision_questions` - Decision prompts
9. `web_queries` - Web search queries with `{date}` placeholder
10. `verification_gate` - QG reference (must match frontmatter)
11. `dependencies` - Related patterns
12. `conflicts` - Conflicting patterns
13. `skill_level_notes` - Basic vs Advanced guidance
14. `related_fragments` - Legacy field
15. `core_pattern_ref` - For variants pointing to core
16. `pattern_file` - Filename with .md extension
17. `domain_ref` - Domain file reference
18. `shortcode` - Must match frontmatter shortcode

### Cross-Reference Integrity

All markdown links to other patterns MUST reference existing files:

```markdown
## Related Patterns

- [tenant-isolation.md](tenant-isolation.md) - ✅ File exists
- [non-existent.md](non-existent.md) - ❌ BROKEN - will fail validation
```

**Validation command:**
```bash
for f in *.md; do
  grep -oP '\[.*?\]\(([a-zA-Z0-9_-]+\.md)\)' "$f" | grep -oP '\([a-zA-Z0-9_-]+\.md\)' | tr -d '()' | while read ref; do
    [ ! -f "$ref" ] && echo "BROKEN: $f -> $ref"
  done
done
```

### Quality Checks Format

Quality Checks section MUST use checkbox format with at least one CRITICAL item:

```markdown
## Quality Checks

- [ ] {Standard check}
- [ ] {Another standard check}
- [ ] **CRITICAL:** {Data safety, tenant isolation, or security check}
```

**Category-specific CRITICAL checks:**

| Category | Required CRITICAL Check |
|----------|------------------------|
| tenant-isolation | No cross-tenant data leakage |
| security | No security vulnerabilities introduced |
| ai-runtime | No cross-tenant state/context leakage |
| mcp | Tenant-scoped server/tool access only |
| rag | No cross-tenant document access |
| compliance | All regulatory requirements addressed |
| monetization | No billing errors |

### Pattern Validation Checklist

Before creating or modifying a pattern file:

- [ ] `pattern_id` matches filename exactly
- [ ] `shortcode` is unique (run duplicate check)
- [ ] `shortcode` follows Z-prefix convention
- [ ] `category` is valid
- [ ] `qg_ref` format is correct (QG-XX or QG-XXn)
- [ ] `version` is semver (X.Y.Z)
- [ ] `last_reviewed` is valid ISO date
- [ ] Has "When to Use" section with 3+ items
- [ ] Has "When NOT to Use" section with 2+ items
- [ ] Has "Architecture" section with diagram or schema
- [ ] Has "Trade-offs" table
- [ ] Has "Quality Checks" with checkboxes and CRITICAL item
- [ ] Has "Web Research Queries" with `{date}` placeholder
- [ ] Has "Quality Gate Alignment" table
- [ ] Has "Related Patterns" with valid .md links
- [ ] CSV entry exists with matching shortcode
- [ ] All cross-references point to existing files
- [ ] No implementation code (TypeScript/Python/JavaScript blocks)

### Common Pattern Bugs (Avoid These)

| Bug | Example | Fix |
|-----|---------|-----|
| Duplicate shortcode | Two files with `shortcode: ZTI` | Use unique 4-char code (ZTIS) |
| Mismatched pattern_id | File: `foo-bar.md`, frontmatter: `pattern_id: foo_bar` | Must match exactly |
| Missing CRITICAL check | Quality Checks without `**CRITICAL:**` | Add category-appropriate critical |
| Broken cross-reference | `[missing.md](missing.md)` | Create file or remove reference |
| Orphan pattern | File exists but no CSV entry | Add CSV row with all 17 columns |
| Ghost CSV entry | CSV row but no pattern file | Delete CSV row or create file |
| Wrong CSV shortcode | CSV has ZTI, file has ZTIS | Must match exactly |

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
src/data/templates/
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

### Templates (`src/data/templates/`)

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
# 1. Create extension file (note: now in data/extensions/)
touch src/data/extensions/{agent}-bam.yaml

# 2. Create agent guide
touch src/data/agent-guides/bam/{domain}.md

# 3. Follow WDS pattern (no memories:)

# 4. Test
npm test
```

### Adding Patterns to Registry (V1)

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

### Adding a New Pattern (V2) - Complete Process

Creating a V2 pattern requires 4 synchronized assets. Follow this checklist:

```bash
# 1. Check for shortcode conflicts FIRST
grep "^shortcode:" src-v2/data/patterns/*.md | awk -F': ' '{print $2}' | sort | uniq -d
# If your desired shortcode appears, use a 4-char variant (e.g., ZTIS instead of ZTI)

# 2. Create pattern file with required structure
cat > src-v2/data/patterns/{pattern-name}.md << 'EOF'
---
pattern_id: {pattern-name}
shortcode: Z{XX}
category: {category}
qg_ref: QG-{XX}
version: 1.0.0
last_reviewed: $(date +%Y-%m-%d)
---

# {Pattern Name} - BAM Pattern

**Loaded by:** Z{XX}  
**Applies to:** {One-line description}

---

## When to Use

- {Condition 1}
- {Condition 2}
- {Condition 3}

## When NOT to Use

- {Anti-condition 1}
- {Anti-condition 2}

## Architecture

{ASCII diagram or YAML schema with bam_controlled: true}

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| {Option} | {Benefit} | {Drawback} | {Use case} |

## Quality Checks

- [ ] {Standard check}
- [ ] {Standard check}
- [ ] **CRITICAL:** {Category-specific safety check}

## Web Research Queries

- "{topic} patterns {date}"
- "{specific topic} multi-tenant {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-{XX} | {What this gate verifies} |

## Related Patterns

- [{related}.md]({related}.md) - {Relationship}
EOF

# 3. Add CSV entry (all 17 columns required)
# pattern_id,name,category,decision_criteria,signals,intent,variants,
# decision_questions,web_queries,verification_gate,dependencies,conflicts,
# skill_level_notes,related_fragments,core_pattern_ref,pattern_file,domain_ref,shortcode

# 4. Add TOML menu entry (if pattern should be loadable)
# In appropriate src-v2/customize/bmad-agent-{role}.toml:
[[agent.menu]]
code = "ZP{XX}"
description = "Load: {Pattern Name} pattern"
prompt = """
Loading pattern:
\`{project-root}/_bmad/bam/data/patterns/{pattern-name}.md\`
Confirm loaded.
"""

# 5. Update domain file (add pattern to domain's Loaded by list)
# In src-v2/data/domains/{domain}.md, add shortcode to "Loaded by:" line

# 6. Validate
npm test -- test/v2/

# 7. Final checks
grep "^shortcode:" src-v2/data/patterns/{pattern-name}.md  # Verify shortcode
grep "^{pattern-name}," src-v2/data/bam-patterns.csv       # Verify CSV entry
```

**Validation Checklist:**
- [ ] `pattern_id` matches filename exactly
- [ ] `shortcode` is unique (no duplicates)
- [ ] All required sections present
- [ ] Quality Checks has `**CRITICAL:**` item
- [ ] Web Research Queries has `{date}` placeholder
- [ ] CSV entry has all 17 columns
- [ ] CSV shortcode matches frontmatter shortcode
- [ ] All Related Patterns links point to existing files
- [ ] Tests pass: `npm test -- test/v2/`

### Updating Quality Gate Checklist

```bash
# 1. Edit checklist (note: now in data/checklists/)
vim src/data/checklists/{gate}.md

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

### Pattern File Anti-Patterns (V2)

| Anti-Pattern | Why Wrong | Correct Approach |
|--------------|-----------|------------------|
| **Duplicate shortcode** | TOML menu conflicts, wrong pattern loaded | Check uniqueness before assigning: `grep "^shortcode:" *.md \| sort \| uniq -d` |
| **pattern_id ≠ filename** | CSV/TOML lookups fail | `tenant-isolation.md` → `pattern_id: tenant-isolation` (exact match) |
| **Missing "When to Use"** | Incomplete decision guidance | Add 3+ bullet points describing usage conditions |
| **Missing "When NOT to Use"** | Users apply pattern incorrectly | Add 2+ anti-conditions |
| **Missing CRITICAL check** | No safety gate in Quality Checks | Add `- [ ] **CRITICAL:** {safety check}` for category |
| **Broken cross-reference** | Dead links in Related Patterns | Verify all `[x.md](x.md)` targets exist before merge |
| **Orphan pattern file** | Pattern inaccessible from CSV/TOML | Add CSV entry with all 17 columns |
| **Ghost CSV entry** | CSV references non-existent file | Delete row or create pattern file |
| **CSV shortcode mismatch** | Inconsistent references | CSV shortcode MUST match frontmatter shortcode |
| **Implementation code** | Patterns describe WHAT, not HOW | Use YAML schemas, ASCII diagrams only - no TypeScript/Python |
| **Missing `{date}` in queries** | Web searches become stale | Always use `{date}` placeholder in Web Research Queries |
| **Non-unique 3-char shortcode** | Conflicts with existing pattern | Use 4-char shortcode (ZTIS) when 3-char (ZTI) conflicts |
| **Removing broken references** | Loses planned capability | CREATE missing pattern instead of removing reference |

---

## Capability Preservation Rules

**CRITICAL: Never remove files that represent planned or existing capabilities.**

### What NOT To Remove

| Asset Type | Rule | Rationale |
|------------|------|-----------|
| Agent guides | Fill content, don't delete | Each guide is referenced by extensions/workflows |
| Workflows | Enhance, don't remove | Each workflow is a distinct capability |
| Extensions | Maintain all 31 | Extensions add agent capabilities |
| Templates | Keep all 461 | Templates produce artifacts |
| Checklists | Maintain all 39 | Checklists ensure quality gates |

### When Content Is Missing

If a file has placeholder content ("TODO", empty sections):
1. **FILL the content** - Generate proper domain-specific content following guide template
2. **DO NOT delete** - Deletion loses planned capability and breaks cross-references
3. **Update references** - Ensure all cross-references remain valid

### Guide Content Requirements

Every agent guide MUST have:
```markdown
# BAM {Domain} Guide

**When to load:** {Trigger conditions}
**Integrates with:** {Agent names and roles}

---

## Core Concepts
{Domain-specific concepts with tables/diagrams}

## Application Guidelines
{Multi-tenant implementation guidance}

## Decision Framework
| Question | Recommendation | Rationale |
|----------|----------------|-----------|

## Related Patterns
Load from pattern registry:
- **{Category}:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{category}`

### Web Research
- Search: "{topic} multi-tenant {date}"

## Related Workflows
- `{workflow-name}` - {When to use}
```

### Verification Commands

```bash
# Check all guides have required sections
npm test -- test/guide-structure.test.js

# Check guide count
ls src/data/agent-guides/bam/*.md | wc -l
# Expected: 233

# Check for TODO placeholders
grep -l "TODO" src/data/agent-guides/bam/*.md | wc -l
# Expected: 0
```

If tests fail due to missing content, **generate content** rather than adjusting expectations or deleting files.

### Asset Count Expectations

| Component | Count | If Below | If Above |
|-----------|-------|----------|----------|
| Agent guides | 233 | Fill missing content | Document new additions |
| Workflows | 191 | Create if needed | Document new additions |
| Extensions | 31 | Restore from backup | Document additions |
| Templates | 461 | Regenerate | Document additions |
| Checklists | 39 | Restore | Document additions |

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
| `test/customize-files.test.js` | Customize file generation, deduplication, YAML validity |
| `test/v2/pattern-standards.test.js` | V2 pattern file count, structure, no implementation code |
| `test/v2/file-counts.test.js` | V2 asset counts (TOMLs, skills, patterns, templates) |
| `test/v2/csv-schema.test.js` | CSV column validation, shortcode alignment |
| `test/v2/toml-format.test.js` | TOML syntax, required sections, Z-prefix menus |

### Expected Counts (V1)

| Component | Count | Web Search |
|-----------|-------|------------|
| Agents | 0 (BAM is a pure extension module) | N/A |
| Extensions | 31 | 100% (all have `bam-*-research` menu) |
| Customize Files | 15 | N/A (auto-generated from extensions) |
| Workflows | 191 | 100% (Create-mode steps with directives) |
| Pattern CSVs | 6 | 100% (`web_queries` column with `{date}`) |
| Agent Guides | 233 | 100% (all have Web Research section) |
| Checklists | 39 | 100% have web research verification |
| Templates | 461 | 100% (all have Web Research section) |

### Expected Counts (V2)

| Component | Count | Validation |
|-----------|-------|------------|
| TOML customize files | 14 | All reference bam-core.md, Z-prefix menus |
| Workflow skills | 34 | CEV steps, manifest present |
| Pattern files | 112 | Unique shortcodes, all required sections |
| Domain files | 16 | Enriched with pattern references |
| Checklists | 33 | QG-* format with recovery protocols |
| Templates | 41 | Output artifact templates |
| CSV registries | 6 | All patterns have CSV entries |

### Pattern-Specific Tests

```bash
# Verify shortcode uniqueness
npm test -- test/v2/pattern-standards.test.js

# Check for broken cross-references
for f in src-v2/data/patterns/*.md; do
  grep -oP '\[.*?\]\(([a-zA-Z0-9_-]+\.md)\)' "$f" | \
  grep -oP '\([a-zA-Z0-9_-]+\.md\)' | tr -d '()' | while read ref; do
    [ ! -f "src-v2/data/patterns/$ref" ] && echo "BROKEN: $f -> $ref"
  done
done

# Verify all patterns have required sections
for f in src-v2/data/patterns/*.md; do
  grep -q "## When to Use" "$f" || echo "MISSING When to Use: $f"
  grep -q "## Quality Checks" "$f" || echo "MISSING Quality Checks: $f"
  grep -q "CRITICAL" "$f" || echo "MISSING CRITICAL check: $f"
done

# Check CSV alignment
for f in src-v2/data/patterns/*.md; do
  name="${f%.md}"
  name="${name##*/}"
  grep -q "^$name," src-v2/data/bam-patterns.csv || echo "NO CSV: $f"
done
```

---

## Quick Reference

### File Locations (V1)

| Need | Location |
|------|----------|
| Add extension | `src/data/extensions/{agent}-bam.yaml` |
| Add workflow | `src/workflows/{name}/` |
| Add pattern | `src/data/bam-patterns.csv` (add row) |
| Add agent guide | `src/data/agent-guides/bam/{domain}.md` |
| Add checklist | `src/data/checklists/{gate}.md` |
| Add template | `src/data/templates/{artifact}-template.md` |
| Add to help | `src/module-help.csv` |
| Configure module | `src/module.yaml` |
| Customize files | `src/_config/agents/*.customize.yaml` (auto-generated) |
| Generate customize | `npm run generate-customize` |
| Verify install | `./scripts/verify-install.sh _bmad/bam` |
| Fix install | `./scripts/post-install.sh _bmad/bam` |

### File Locations (V2)

| Need | Location |
|------|----------|
| Add TOML customize | `src-v2/customize/bmad-agent-{role}.toml` |
| Add workflow skill | `src-v2/skills/bmad-bam-{name}/` |
| Add pattern file | `src-v2/data/patterns/{pattern}.md` |
| Add pattern to CSV | `src-v2/data/bam-patterns.csv` (17 columns) |
| Add domain file | `src-v2/data/domains/{domain}.md` |
| Add checklist | `src-v2/data/checklists/qg-{id}.md` |
| Add template | `src-v2/data/templates/{artifact}.md` |
| Core context | `src-v2/data/context/bam-core.md` |
| Persona files | `src-v2/data/personas/{name}.md` |
| Sidecar templates | `src-v2/data/sidecar/*.md` |
| Module config | `src-v2/module.yaml` |
| Run V2 tests | `npm test -- test/v2/` |

### Pattern Commands (V2)

```bash
# Check shortcode uniqueness
grep "^shortcode:" src-v2/data/patterns/*.md | awk -F': ' '{print $2}' | sort | uniq -d

# Find pattern by shortcode
grep -l "^shortcode: ZTI" src-v2/data/patterns/*.md

# List all shortcodes
grep "^shortcode:" src-v2/data/patterns/*.md | sort -t':' -k3

# Verify pattern has CSV entry
grep "^tenant-isolation," src-v2/data/bam-patterns.csv

# Find broken cross-references
for f in src-v2/data/patterns/*.md; do
  grep -oP '\]\(([a-z-]+\.md)\)' "$f" | tr -d ']()'| while read r; do
    [ ! -f "src-v2/data/patterns/$r" ] && echo "$f -> $r BROKEN"
  done
done
```

### Key Commands

```bash
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm run lint               # Lint (if configured)
npm run generate-customize  # Generate customize files from extensions
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

- [ ] `npm test` passes (all tests)
- [ ] No `memories:` field in extensions
- [ ] Step files reference pattern registry (no inline code)
- [ ] New workflows use unified steps/ with step-NN-mode-description.md naming
- [ ] New workflows added to module-help.csv
- [ ] New workflows have bmad-manifest.json for dependency chains
- [ ] Agent guides have "When to load:" header
- [ ] Templates use `{{lowercase_variable}}` format
- [ ] Pattern registry has web_queries column with `{date}` placeholder
- [ ] Checklists use `- [ ]` format
- [ ] Run `npm run generate-customize` after modifying extensions

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
