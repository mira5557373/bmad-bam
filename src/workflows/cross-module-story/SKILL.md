---
name: cross-module-story
displayName: Cross-Module Story
description: Create stories spanning multiple modules. Use when the user requests to 'create cross-module story' or 'plan multi-module feature'.
module: bam
tags: [integration]
---

# Cross-Module Story

## Overview

This workflow breaks user journeys that span multiple modules into per-module tasks with tenant and AI dependency tracking. It maps the journey, decomposes into module-scoped tasks, analyzes tenant context flow, and identifies AI-involved steps. Run during epic/story creation when a feature crosses module boundaries.

Act as an Integration Architect decomposing cross-module features into module-safe implementation units.

**Args:** Accepts journey description. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Creating user stories that span multiple modules
- Coordinating cross-module feature development
- Defining integration requirements between modules

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Journey Mapping

**Intent Check:** Confirm the user's intent before processing their input.

- Identify all steps in the user journey
- Map each step to its owning module
- Identify cross-module touchpoints (where data flows between modules)
- Produce a sequence diagram (mermaid)

### Step 2: Task Decomposition

- Create per-module tasks (each implementable within module boundary)
- Identify shared dependencies (facade contracts needed)
- Sequence tasks by dependency order
- Flag tasks that require new or updated facade contracts

**Soft Gate:** Steps 1-2 complete the journey mapping and task decomposition. Present a summary of modules identified and task breakdown. Ask for confirmation before proceeding to impact analysis.

### Step 3: Tenant Impact Analysis

- Trace tenant context flow through the entire journey
- Verify isolation at each cross-module boundary
- Document tenant-specific behavior variations (tier differences)

### Step 4: AI Impact Analysis

- Identify AI-involved steps in the journey
- Document tool and memory usage per step
- Define eval requirements for AI steps
- Specify approval triggers if applicable

### Quality Gates

- [ ] All modules identified with clear ownership
- [ ] Dependencies sequenced (no circular task dependencies)
- [ ] Tenant context flow documented end-to-end
- [ ] AI behavior specified for all AI-involved steps

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Cross-module stories define integration points
- **QG-M2** (Tenant Isolation) - Tenant context flow analysis informs isolation design

### Entry Gate
- QG-F1 (Foundation) must pass before cross-module planning
- Module boundaries must be defined (from master architecture)

### Exit Gate
- Per-module tasks documented with clear ownership
- Tenant context flow verified at all cross-module boundaries
- AI-involved steps have defined eval requirements

## Output

- `{output_folder}/planning-artifacts/cross-module-stories/{journey-name}.md` — cross-module story document with per-module task breakdown
- Sequence diagram
- Dependency tracker entries

## References

- Template: `{project-root}/_bmad/bam/data/templates/story-template.md`
- Parallel Development Guide: `{project-root}/_bmad/bam/data/agent-guides/bam/parallel-development-guide.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/parallel-development-guide.md`
- Parallel Development Guide: `{project-root}/_bmad/bam/data/agent-guides/bam/parallel-development-guide.md`
