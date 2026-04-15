# How to Configure module.yaml Options

This guide covers configuring BAM module options including tenant_model, ai_runtime, design_first, and test_architecture variables, as well as the BMB installation process.

## Prerequisites

- BMAD Method core installed
- Access to BAM module source
- Understanding of multi-tenant architecture concepts
- Node.js >= 20.0.0

## Overview

The `module.yaml` file defines BAM configuration options presented during installation. Users select values that customize BAM workflows for their specific architecture.

**Configuration Variables:**

| Variable | Purpose | Default |
|----------|---------|---------|
| `tenant_model` | Tenant isolation strategy | `row-level-security` |
| `ai_runtime` | AI orchestration framework | `langgraph` |
| `design_first` | Design-first vs code-first approach | `true` |
| `test_architecture` | TEA integration for testing | `true` |

## Steps

### 1. Understand module.yaml Structure

The module.yaml file is located at `src/module.yaml`:

```yaml
# Module metadata
code: bam
name: "BAM - Multi-Tenant Agentic AI SaaS"
header: "BAM: Multi-Tenant Agentic AI SaaS Architecture"
subheader: "Extend BMAD with enterprise SaaS patterns"
description: "Extension module description..."

# Installation behavior
default_selected: false

# Module dependencies
requiredModules: [core]
recommendedModules: [bmm, tea, wds, cis]

# Configuration variables
tenant_model:
  prompt: "Select tenant isolation strategy..."
  default: "row-level-security"
  single-select:
    - value: "row-level-security"
      label: "Row-Level Security (Recommended)"
    # ...more options

# Post-install notes
post-install-notes:
  tenant_model:
    row-level-security: |
      RLS Setup Complete:
        - BAM workflows will generate PostgreSQL RLS policies
```

### 2. Configure tenant_model

The tenant isolation strategy affects all tenant-related workflows.

**Available Options:**

| Value | When to Use | Trade-offs |
|-------|-------------|------------|
| `row-level-security` | <1000 tenants, shared resources | Lower cost, shared tables |
| `schema-per-tenant` | Regulated industries, moderate isolation | Medium cost, schema management |
| `database-per-tenant` | Enterprise tier, maximum isolation | Highest cost, operational complexity |

**Configuration in module.yaml:**

```yaml
tenant_model:
  prompt: "Select tenant isolation strategy for your SaaS platform"
  default: "row-level-security"
  single-select:
    - value: "row-level-security"
      label: "Row-Level Security (Recommended for most SaaS)"
    - value: "schema-per-tenant"
      label: "Schema per Tenant (Higher isolation)"
    - value: "database-per-tenant"
      label: "Database per Tenant (Maximum isolation)"
```

**Impact on Workflows:**

| Workflow | tenant_model Effect |
|----------|---------------------|
| `create-master-architecture` | Generates isolation-specific sections |
| `tenant-model-isolation` | Applies selected strategy patterns |
| `tenant-onboarding-design` | Uses appropriate provisioning flow |
| `tenant-offboarding-design` | Uses appropriate cleanup flow |

### 3. Configure ai_runtime

The AI orchestration framework affects agent architecture workflows.

**Available Options:**

| Value | When to Use | Best For |
|-------|-------------|----------|
| `langgraph` | Default recommendation | State machines, conditional workflows |
| `crewai` | Role-based collaboration | Team simulations, task delegation |
| `autogen` | Multi-agent conversations | Debate, consensus building |
| `custom` | Existing framework | Integration with proprietary solutions |

**Configuration in module.yaml:**

```yaml
ai_runtime:
  prompt: "Select AI agent orchestration framework"
  default: "langgraph"
  single-select:
    - value: "langgraph"
      label: "LangGraph (Recommended)"
    - value: "crewai"
      label: "CrewAI"
    - value: "autogen"
      label: "AutoGen"
    - value: "custom"
      label: "Custom Framework"
```

**Impact on Workflows:**

| Workflow | ai_runtime Effect |
|----------|-------------------|
| `agent-runtime-architecture` | Generates runtime-specific patterns |
| `ai-eval-safety-design` | Adapts evaluation strategy |
| `validate-module` (QG-M3) | Uses runtime-specific checks |

### 4. Configure design_first

Controls whether architecture design precedes implementation.

**Available Options:**

| Value | When to Use | Effect |
|-------|-------------|--------|
| `true` | Recommended - design before coding | Full architecture workflow |
| `false` | Existing systems, refactoring | Skip to implementation |

**Configuration in module.yaml:**

```yaml
design_first:
  prompt: "Start with architecture design before coding?"
  default: "true"
  single-select:
    - value: "true"
      label: "Yes - Design-first approach (Recommended)"
    - value: "false"
      label: "No - Start coding immediately"
```

**Impact on Workflows:**

| design_first | Workflow Behavior |
|--------------|-------------------|
| `true` | Runs `create-master-architecture` before implementation |
| `false` | Skips to module implementation (not recommended) |

### 5. Configure test_architecture

Controls integration with TEA (Test Engineering Architecture) module.

**Available Options:**

| Value | When to Use | Effect |
|-------|-------------|--------|
| `true` | Full test planning | TEA workflows included |
| `false` | Basic testing only | Minimal test workflow |

**Configuration in module.yaml:**

```yaml
test_architecture:
  prompt: "Include test architecture planning?"
  default: "true"
  single-select:
    - value: "true"
      label: "Yes - Plan testing with TEA integration"
    - value: "false"
      label: "No - Basic testing only"
```

**Impact on Workflows:**

| test_architecture | Included Workflows |
|-------------------|-------------------|
| `true` | TEA workflows for tenant isolation testing |
| `false` | Basic validation only |

### 6. Configure Web Search

Enable or disable web search for current best practices:

```yaml
web_search:
  enabled: true
  year_placeholder: "{date}"
  directive_format: "Search the web:"
  pattern: "solutioning"
  description: "BAM uses targeted web search for technology verification"
```

**Web Search Configuration:**

| Field | Purpose | Example |
|-------|---------|---------|
| `enabled` | Toggle web search | `true` |
| `year_placeholder` | Dynamic year replacement | `{date}` -> `2026` |
| `directive_format` | Search directive prefix | `Search the web:` |
| `pattern` | Search pattern type | `solutioning` |

### 7. Configure Output Directories

Define where BAM creates output artifacts:

```yaml
directories:
  - "{output_folder}/planning-artifacts"
  - "{output_folder}/implementation-artifacts"
  - "{output_folder}/architecture-docs"
```

These directories are created during installation.

### 8. Configure Post-Install Notes

Provide guidance after installation based on selections:

```yaml
post-install-notes:
  tenant_model:
    row-level-security: |
      RLS Setup Complete:
        - BAM workflows will generate PostgreSQL RLS policies
        - Ensure your database supports row-level security
        - Run: bam-create-master-architecture to start foundation design
    schema-per-tenant: |
      Schema-Per-Tenant Setup:
        - Each tenant will have a separate PostgreSQL schema
        - Requires schema management in your provisioning pipeline
    database-per-tenant: |
      Database-Per-Tenant Setup:
        - Maximum isolation but highest operational complexity
        - Requires connection pooling and routing infrastructure
  ai_runtime:
    langgraph: |
      LangGraph Selected:
        - Run: bam-agent-runtime-architecture to design orchestration
        - Load knowledge: agent-runtime-patterns.md
```

## BMB Installation Process

### 1. Run the Installer

Install BAM using the BMAD Method installer:

```bash
npx bmad-method install
```

### 2. Select BAM Module

When prompted, select BAM:

```
? Select modules to install:
  [ ] core (required)
  [ ] bmm - BMAD Method
  [x] bam - Multi-Tenant Agentic AI SaaS
  [ ] tea - Test Engineering Architecture
```

### 3. Answer Configuration Prompts

The installer prompts for each configuration variable:

```
? Select tenant isolation strategy for your SaaS platform:
> Row-Level Security (Recommended for most SaaS)
  Schema per Tenant (Higher isolation)
  Database per Tenant (Maximum isolation)

? Select AI agent orchestration framework:
> LangGraph (Recommended)
  CrewAI
  AutoGen
  Custom Framework

? Start with architecture design before coding?
> Yes - Design-first approach (Recommended)
  No - Start coding immediately

? Include test architecture planning?
> Yes - Plan testing with TEA integration
  No - Basic testing only
```

### 4. Verify Installation

After installation, verify:

```bash
# Check installation directory
ls {project-root}/_bmad/bam/

# Expected structure:
# data/           - Pattern registry CSVs
# templates/      - Output templates
# checklists/     - Quality gate checklists
# workflows/      - Workflow files
```

### 5. Review Post-Install Notes

The installer displays configuration-specific guidance:

```
=== BAM Installation Complete ===

RLS Setup Complete:
  - BAM workflows will generate PostgreSQL RLS policies
  - Ensure your database supports row-level security
  - Run: bam-create-master-architecture to start foundation design

LangGraph Selected:
  - Run: bam-agent-runtime-architecture to design orchestration
  - Load knowledge: agent-runtime-patterns.md
```

## Variable Resolution

Variables are resolved at different times:

| Placeholder | Resolution Time | Example |
|-------------|-----------------|---------|
| `{project-root}` | Install time | `/home/user/my-project` |
| `{output_folder}` | Install time | `{project-root}/docs` |
| `{tenant_model}` | User selection | `row-level-security` |
| `{ai_runtime}` | User selection | `langgraph` |
| `{{variable}}` | Template execution | Filled during workflow |

**Resolution in Workflows:**

```markdown
## Actions

Based on your `{tenant_model}` selection:

**Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` -> filter: `{tenant_model}`
```

## Modifying Configuration After Install

To change configuration after installation:

### Option 1: Re-run Installer

```bash
npx bmad-method install --force
```

Select new options when prompted.

### Option 2: Manual Edit

Edit the resolved configuration in `{project-root}/_bmad/bam/`:

1. Update affected workflow step files
2. Regenerate artifacts with new configuration
3. Re-run validation gates

### Option 3: Use Edit Mode

Run workflows in Edit mode to update artifacts:

```
/atlas
> CMAR
> Mode: Edit
```

## Configuration Best Practices

### DO

- Use default values for typical SaaS applications
- Match tenant_model to your scale and compliance needs
- Enable design_first for new projects
- Enable test_architecture for production systems

### DO NOT

- Skip design_first for new multi-tenant projects
- Choose database-per-tenant unless required for compliance
- Disable web_search unless offline
- Mix incompatible tenant models across modules

## Troubleshooting Configuration

| Issue | Cause | Resolution |
|-------|-------|------------|
| Wrong tenant model selected | Initial misconfiguration | Re-run install with `--force` |
| Workflows reference wrong runtime | Config not resolved | Check `{ai_runtime}` in step files |
| Output folder missing | Install incomplete | Re-run install or create manually |
| Post-install notes not shown | Terminal truncated | Check `module.yaml` directly |

## Related

- [Install BAM](install-bam.md) - Full installation guide
- [Run Workflow](run-workflow.md) - Workflow execution
- [Add Workflow](add-workflow.md) - Creating new workflows
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
