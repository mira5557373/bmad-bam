# BAM API Reference

This document provides detailed schema specifications for BAM extension module components including extensions, workflows, pattern registries, and templates.

---

## Table of Contents

1. [Extension YAML Schema](#extension-yaml-schema)
2. [Menu Item Structure](#menu-item-structure)
3. [Prompt Formatting](#prompt-formatting)
4. [Workflow Manifest Schema](#workflow-manifest-schema)
5. [SKILL.md Structure](#skillmd-structure)
6. [Step File Format](#step-file-format)
7. [Pattern Registry CSV Schema](#pattern-registry-csv-schema)
8. [Template Variable Syntax](#template-variable-syntax)
9. [Module Help CSV Schema](#module-help-csv-schema)
10. [Quality Gate Checklist Format](#quality-gate-checklist-format)

---

## Extension YAML Schema

Extensions follow the WDS agent-guides pattern. They extend existing BMAD agents without using the non-standard `memories:` field.

### Required Structure

```yaml
# {agent}-bam.yaml

agent:
  metadata:
    extends: 'bmad-agent-{base}'    # REQUIRED: Base agent identifier
    module: 'bam'                    # REQUIRED: Always 'bam'
    description: 'description'       # OPTIONAL: Extension purpose

# NEVER include memories: field

menu:
  - trigger: {trigger-name}
    action: "#{prompt-id}"
    description: {menu description}

prompts:
  - id: {prompt-id}
    content: |
      {prompt content}
```

### Schema Fields

#### agent.metadata

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `extends` | Yes | string | Base agent to extend (e.g., `bmad-agent-analyst`) |
| `module` | Yes | string | Module code, always `bam` |
| `description` | No | string | Brief description of what the extension adds |

#### menu (array)

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `trigger` | Yes | string | Menu trigger keyword (e.g., `bam-context`) |
| `action` | Yes | string | Prompt reference with `#` prefix |
| `description` | Yes | string | Human-readable menu item description |

#### prompts (array)

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | Unique prompt identifier |
| `content` | Yes | string | Multi-line prompt content (use `|` for block scalar) |

### Valid Base Agents

| Agent ID | Module | Description |
|----------|--------|-------------|
| `bmad-agent-analyst` | BMM | Business analyst |
| `bmad-agent-architect` | BMM | Software architect |
| `bmad-agent-dev` | BMM | Developer (includes QA/SM) |
| `bmad-agent-pm` | BMM | Project manager |
| `bmad-agent-po` | BMM | Product owner |
| `bmad-agent-ux-designer` | BMM | UX designer |
| `bmad-agent-tech-writer` | BMM | Technical writer |
| `bmad-agent-devops` | BMM | DevOps engineer |
| `bmad-agent-security` | BMM | Security engineer |
| `bmad-tea` | TEA | Test architect |
| `wds-agent-saga-analyst` | WDS | Persona analyst |
| `wds-agent-freya-ux` | WDS | UX specialist |
| `bmad-cis-agent-*` | CIS | Innovation agents |

### Example Extension

```yaml
# analyst-bam.yaml

agent:
  metadata:
    extends: 'bmad-agent-analyst'
    module: 'bam'
    description: "Adds multi-tenant SaaS discovery capabilities"

menu:
  - trigger: bam-context
    action: "#load-bam-context-prompt"
    description: Load BAM multi-tenant discovery context
  - trigger: bam-analyst-discover-contexts
    action: "#discover-contexts-prompt"
    description: Identify bounded contexts for multi-tenant SaaS
  - trigger: bam-analyst-research
    action: "#web-research-analyst-prompt"
    description: Conduct web research for analyst decisions

prompts:
  - id: load-bam-context-prompt
    content: |
      ## Load BAM Multi-Tenant Context

      Read and internalize the BAM discovery guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-context.md`

      Confirm when loaded, then proceed with discovery tasks.

  - id: discover-contexts-prompt
    content: |
      ## Bounded Context Discovery for Multi-Tenant SaaS

      Prerequisites: Ensure BAM context loaded via `bam-context`

      **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`
        → filter: `tenant-isolation, tenant-lifecycle, compliance`

      Analyze the domain and identify bounded contexts...

  - id: web-research-analyst-prompt
    content: |
      ## BAM Web Research - Analyst

      Conduct targeted web research to verify current best practices.

      **Research Focus:** {{research_topic}}

      Execute 2-3 targeted searches:
      Search the web: "{{research_topic}} best practices {date}"
      Search the web: "{{research_topic}} multi-tenant SaaS {date}"

      Return findings with source citations:
      _Source: [URL]_
```

---

## Menu Item Structure

Menu items provide the interface for triggering extension capabilities.

### Required Fields

```yaml
menu:
  - trigger: {string}       # Keyword to invoke
    action: "#{prompt-id}"  # Reference to prompt
    description: {string}   # Display text
```

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Context loader | `bam-context` or `bam-{domain}-context` | `bam-platform-context` |
| Capability | `bam-{agent}-{action}` | `bam-analyst-discover-contexts` |
| Research | `bam-{agent}-research` | `bam-architect-research` |

### Context Loader Requirement

Every extension MUST have at least one context loader menu item:

```yaml
menu:
  # REQUIRED: Context loader
  - trigger: bam-context
    action: "#load-bam-context-prompt"
    description: Load BAM {domain} context

  # Additional capabilities follow...
```

---

## Prompt Formatting

Prompts follow a structured format for consistency and agent comprehension.

### Standard Prompt Structure

```yaml
prompts:
  - id: {capability-name}-prompt
    content: |
      ## {Capability Title}

      Prerequisites: {what must be done first}

      **Load patterns:** `{project-root}/_bmad/bam/data/{file}.csv`
        → filter: `{pattern-ids}`

      {Instructions for the agent...}

      ### Section 1

      {Detailed guidance...}

      ### Section 2

      | Column | Description |
      |--------|-------------|
      | ...    | ...         |

      ## Output

      {What to produce...}
```

### Prompt Elements

| Element | Purpose | Example |
|---------|---------|---------|
| `## Title` | Capability name | `## Bounded Context Discovery` |
| `Prerequisites:` | Required prior steps | `Ensure BAM context loaded via bam-context` |
| `**Load patterns:**` | Pattern registry reference | `bam-patterns.csv → filter: tenant-isolation` |
| `Search the web:` | Web research directive | `Search the web: "topic {date}"` |
| `_Source: [URL]_` | Citation format | `_Source: [https://example.com]_` |

### Path Placeholders

| Placeholder | Resolves To | Example |
|-------------|-------------|---------|
| `{project-root}` | Project root directory | `/home/user/my-project` |
| `{output_folder}` | Output location | `{project-root}/_bmad-output` |
| `{date}` | Current year | `2026` |

### Template Variables

| Variable | Resolves To | Context |
|----------|-------------|---------|
| `{{research_topic}}` | User-provided topic | Web research prompts |
| `{{module_name}}` | Current module name | Module-scoped prompts |
| `{{tenant_model}}` | Configured isolation | Tenant-related prompts |

---

## Workflow Manifest Schema

Workflows are defined by `bmad-skill-manifest.yaml` files.

### Required Fields

```yaml
type: workflow
name: {workflow-name}                  # MUST match directory name exactly
displayName: {Display Name}            # Human-readable name
description: '{description}'           # Brief description
module: bam                            # Module code
```

> **CRITICAL BMB Requirement:** The `name` field MUST exactly match the directory name. BMB uses the directory name as the canonical ID. BMB installer skips skills where name doesn't match directory.

### Optional Fields

```yaml
config_variables:
  - tenant_model
  - ai_runtime
step_naming_convention: "step-NN-mode-description"
tags:
  - foundation
  - required
```

### Example Manifest

```yaml
# bmad-skill-manifest.yaml

type: workflow
name: create-master-architecture           # Matches directory name (used as canonical ID)
displayName: Create Master Architecture
description: "Create frozen master architecture for BAM platform"
module: bam
config_variables:
  - tenant_model
  - ai_runtime
tags:
  - foundation
  - required
```

---

## SKILL.md Structure

The SKILL.md file contains complete workflow instructions.

### Frontmatter

```markdown
---
name: {workflow-name}                    # MUST match directory name exactly
displayName: {Display Name}
description: '{Brief description for agent selection}'
module: bam
tags: [category1, category2]
---
```

### Required Sections

```markdown
# {Workflow Display Name}

## Overview

{What this workflow produces and why. 2-3 sentences.}

Act as a {role} specializing in {domain}.

**Args:** {Command-line arguments if supported}

## On Activation

{Initial loading and configuration steps}

## Workflow

### Step 1: {Step Title}

{Step instructions...}

### Step 2: {Step Title}

{Step instructions...}

[Continue for all steps...]

## Output

- `{output_folder}/{path}/{filename}` - {description}

## References

- Template: `bam/templates/{template}.md`
- Checklist: `bam/checklists/{checklist}.md`
- Knowledge: `bam/data/agent-guides/bam/{guide}.md`

## Web Research

This workflow uses web search to verify current best practices:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
```

### Step Documentation

Each step should include:

| Component | Purpose |
|-----------|---------|
| Title | Clear action description |
| Purpose | Why this step matters |
| Prerequisites | What must exist |
| Actions | Numbered action items |
| Verification | Checklist items |
| Outputs | What this step produces |

---

## Step File Format

Step files use the BMAD naming convention: `step-NN-{mode}-{description}.md`

### Mode Prefixes

| Mode | Range | Prefix | Purpose |
|------|-------|--------|---------|
| Create | 01-09 | `-c-` | Generate new artifacts |
| Edit | 10-19 | `-e-` | Modify existing artifacts |
| Validate | 20-29 | `-v-` | Check against criteria |

### Step File Structure

```markdown
# Step N: {Title}

## Purpose

{One sentence describing the goal}

## Prerequisites

- {Previous step completed}
- **Load patterns:** `{project-root}/_bmad/bam/data/{file}.csv` → filter: `{pattern}`

## Actions

### 1. {First Action}

Reference patterns from `{pattern-file}`:
- {Pattern application}
- {Decision point}

### 2. {Second Action}

Using the {pattern name} from knowledge:
- {Specific application}
- {Expected outcome}

### 3. {Third Action}

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Data    | Data    | Data    |

## Soft Gate Checkpoint (Optional)

**Steps 1-N complete the {phase} design.**

Present summary and ask for confirmation before proceeding.

## Verification

- [ ] {Checklist item 1}
- [ ] {Checklist item 2}
- [ ] Patterns align with registry

## Outputs

- {Artifact 1}
- {Artifact 2}
- **Load template:** `{project-root}/_bmad/bam/templates/{template}.md`

## Next Step

Proceed to `step-{NN+1}-{mode}-{next}.md` {with context}.
```

### Content Guidelines

| Acceptable | Not Acceptable |
|------------|----------------|
| Tables with specifications | Implementation code |
| YAML configuration schemas | TypeScript/Python functions |
| Decision matrices | Class definitions |
| Checklists | SQL with business logic |
| Pattern references | Inline code examples |

---

## Pattern Registry CSV Schema

Pattern registries store decision criteria and web search queries in CSV format.

### bam-patterns.csv Schema

| Column | Required | Type | Description |
|--------|----------|------|-------------|
| `pattern_id` | Yes | string | Unique pattern identifier |
| `category` | Yes | string | Pattern category |
| `signals` | Yes | string | Comma-separated trigger signals |
| `intent` | Yes | string | What the pattern achieves |
| `variants` | Yes | string | Semicolon-separated variant names |
| `decision_questions` | Yes | string | Semicolon-separated questions |
| `web_queries` | Yes | string | Semicolon-separated search queries with `{date}` |
| `verification_gate` | No | string | Quality gate that verifies this |
| `dependencies` | No | string | Comma-separated dependent patterns |
| `conflicts` | No | string | Comma-separated conflicting patterns |
| `skill_level_notes` | No | string | Basic vs Advanced guidance |
| `related_fragments` | No | string | Semicolon-separated knowledge refs |

### Example Row

```csv
pattern_id,category,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments
tenant-isolation,security,"shared data,multi-tenant,customer separation",Prevent cross-tenant data access,"row-level-security;schema-per-tenant;database-per-tenant","What compliance requirements apply?;How many tenants expected?;What isolation level required?","multi-tenant isolation patterns {date};PostgreSQL RLS best practices {date}",QG-M2,,,"Basic: RLS with tenant_id column;Advanced: Schema isolation with connection pooling",rls-best-practices;multi-tenant-patterns
```

### tenant-models.csv Schema

| Column | Required | Description |
|--------|----------|-------------|
| `model` | Yes | Isolation model name |
| `signals` | Yes | When to consider this model |
| `when_to_use` | Yes | Semicolon-separated use cases |
| `when_not_to_use` | Yes | Anti-patterns |
| `compliance_fit` | Yes | Supported compliance frameworks |
| `complexity` | Yes | low, medium, high |
| `storage_overhead` | Yes | Multiplier (e.g., 1x, 2-3x) |
| `isolation_strength` | Yes | logical, schema, physical |
| `query_performance` | Yes | Performance characteristics |
| `migration_complexity` | Yes | low, medium, high |
| `web_queries` | Yes | Search queries with `{date}` |

### ai-runtimes.csv Schema

| Column | Required | Description |
|--------|----------|-------------|
| `runtime` | Yes | Framework name |
| `signals` | Yes | When to consider |
| `when_to_use` | Yes | Semicolon-separated use cases |
| `strengths` | Yes | Key advantages |
| `weaknesses` | Yes | Limitations |
| `complexity` | Yes | low, medium, high |
| `tenant_awareness` | Yes | Built-in tenant support |
| `web_queries` | Yes | Search queries with `{date}` |

### quality-gates.csv Schema

| Column | Required | Description |
|--------|----------|-------------|
| `gate_id` | Yes | Gate identifier (e.g., QG-F1) |
| `name` | Yes | Gate name |
| `phase` | Yes | BMAD phase |
| `checks` | Yes | Semicolon-separated check items |
| `critical_checks` | Yes | Checks that must pass |
| `trigger_workflow` | Yes | Workflow that runs this gate |
| `output_artifact` | Yes | Report filename |

### Web Query Placeholder

The `{date}` placeholder is resolved at runtime:

```
# In CSV:
web_queries: "PostgreSQL RLS best practices {date}"

# At runtime (2026):
Search the web: "PostgreSQL RLS best practices 2026"
```

---

## Template Variable Syntax

Templates use double-brace placeholders for variable substitution.

### Variable Format

```
{{variable_name}}
```

### Standard Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `{{project_name}}` | Project name | `MyAIPlatform` |
| `{{date}}` | Current date (ISO) | `2026-04-09` |
| `{{version}}` | Document version | `1.0.0` |
| `{{author}}` | Document author | `Platform Architect` |
| `{{module_name}}` | Current module | `billing` |
| `{{tenant_model}}` | Isolation strategy | `row-level-security` |
| `{{ai_runtime}}` | Orchestration framework | `langgraph` |
| `{{tier}}` | Tenant tier | `enterprise` |
| `{{tenant_id}}` | Runtime tenant ID | `tenant_abc123` |

### Configuration Variables

From `config.yaml`:

| Variable | Source |
|----------|--------|
| `{{user_name}}` | `config.yaml` → `user_name` |
| `{{output_folder}}` | `config.yaml` → `output_folder` |
| `{{communication_language}}` | `config.yaml` → `communication_language` |

### Template Example

```markdown
# {{project_name}} Master Architecture

**Version:** {{version}}
**Date:** {{date}}
**Author:** {{author}}

## Tenant Model

Selected isolation: **{{tenant_model}}**

## AI Runtime

Selected framework: **{{ai_runtime}}**

---

_Generated by BAM for {{project_name}}_
```

---

## Module Help CSV Schema

The `module-help.csv` file registers workflows for the help system.

### Column Definitions

| Column | Required | Type | Description |
|--------|----------|------|-------------|
| `module` | Yes | string | Module code (`bam`) |
| `skill` | Yes | string | Workflow canonical ID |
| `display-name` | Yes | string | Human-readable name |
| `menu-code` | Yes | string | Short trigger code |
| `description` | Yes | string | One-line description |
| `action` | Yes | string | Action type (`run`) |
| `args` | No | string | Additional arguments |
| `phase` | Yes | string | BMAD phase |
| `after` | No | string | Prerequisite workflow(s) |
| `before` | No | string | Workflows this enables |
| `required` | Yes | boolean | Is this workflow required? |
| `output-location` | No | string | Output directory |
| `outputs` | No | string | Output filename(s) |
| `keywords` | No | string | Comma-separated search keywords |

### Phase Values

| Phase | Description |
|-------|-------------|
| `1-discovery` | Initial requirements gathering |
| `2-planning` | Backlog and epic creation |
| `3-solutioning` | Architecture and design |
| `4-implementation` | Development and integration |
| `anytime` | No phase restriction |

### Example Row

```csv
module,skill,display-name,menu-code,description,action,args,phase,after,before,required,output-location,outputs,keywords
bam,bmad-bam-create-master-architecture,Create Master Architecture,CMAR,Create frozen master architecture with tenant model,run,,3-solutioning,,,true,{output_folder}/planning-artifacts,master-architecture.md,"architecture,design,foundation,platform,master"
```

---

## Quality Gate Checklist Format

Checklists use markdown with specific formatting for gate validation.

### Checklist Structure

```markdown
# {Gate ID}: {Gate Name}

## Purpose

{One sentence describing what this gate validates}

## Prerequisites

- {Prior gate passed}
- {Required artifacts exist}

## Checklist

### {Category 1}

- [ ] {Regular check item}
- [ ] {Another check item}
- [ ] **CRITICAL:** {Critical check that must pass}

### {Category 2}

- [ ] {Check item}
- [ ] **CRITICAL:** {Critical check}

## Verification Commands

```bash
{Commands to verify checks}
```

## Recovery Protocol

If this gate fails:
1. {First recovery step}
2. {Second recovery step}
3. After 2 failed attempts, escalate to project leadership

## Outputs

- `{output_folder}/planning-artifacts/{gate-report}.md`
```

### Check Item Formats

| Format | Meaning |
|--------|---------|
| `- [ ] Item` | Regular check |
| `- [ ] **CRITICAL:** Item` | Must pass to proceed |
| `- [x] Item` | Check completed |

### Example Checklist

```markdown
# QG-F1: Foundation Gate

## Purpose

Validate master architecture is complete and frozen.

## Prerequisites

- `create-master-architecture` workflow completed
- `master-architecture.md` exists in output folder

## Checklist

### Architecture Completeness

- [ ] Master architecture document exists
- [ ] **CRITICAL:** Tenant model defined with hierarchy
- [ ] All modules identified with clear boundaries
- [ ] **CRITICAL:** Shared kernel minimal (only allowed items)
- [ ] Forbidden dependencies documented

### Technology Decisions

- [ ] AI runtime selected and documented
- [ ] Technology stack versions pinned
- [ ] **CRITICAL:** No technology decisions deferred

### Code Patterns

- [ ] At least 4 code pattern examples provided
- [ ] Repository pattern with tenant scoping
- [ ] Facade pattern with DTOs
- [ ] Domain event pattern

## Verification Commands

```bash
# Check master architecture exists
ls {output_folder}/planning-artifacts/master-architecture.md

# Verify required sections
grep -c "## Tenant Model" master-architecture.md
grep -c "## AI Runtime" master-architecture.md
```

## Recovery Protocol

If this gate fails:
1. Review gate report for specific failures
2. Update master architecture to address gaps
3. Re-run `validate-foundation` workflow
4. After 2 failed attempts, escalate for course correction

## Outputs

- `{output_folder}/planning-artifacts/foundation-gate-report.md`
```

---

## Related Documentation

- [Architecture Overview](architecture-overview.md) - Module structure and design
- [Getting Started](getting-started.md) - Installation and first steps
- [Quality Gates Reference](reference/quality-gates.md) - Detailed gate specifications
- [CLAUDE.md](../CLAUDE.md) - Comprehensive module documentation
