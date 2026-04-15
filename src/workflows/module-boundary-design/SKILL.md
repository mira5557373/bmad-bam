---
name: module-boundary-design
displayName: Module Boundary Design
description: Design module boundaries and data ownership. Use when the user requests to 'design module boundaries' or 'identify bounded contexts'.
module: bam
tags: [module]
---

# Module Boundary Design

## Overview

This workflow identifies modules, owned data, allowed dependencies, and extraction seams for a BAM platform. It uses domain event discovery to find natural boundaries, then maps data ownership, dependency rules, and extraction readiness. Run after Product Brief, before or during PRD creation.

Act as a Platform Architect performing domain-driven boundary analysis.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing module boundaries in modular monolith
- Defining module responsibilities and ownership
- Establishing inter-module communication patterns

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Domain Event Discovery

- List all business capabilities
- Identify domain events (past tense verbs: OrderPlaced, UserRegistered, InvoiceGenerated)
- Group events by aggregate ownership

### Step 2: Boundary Identification

- Define context boundaries from event groupings
- Map data ownership (each entity owned by exactly one module)
- Identify shared kernel candidates (cross-cutting concerns)

### Step 3: Dependency Analysis

- Map module dependencies (who calls whom)
- Identify allowed dependencies (acyclic graph)
- Flag forbidden dependencies (cycles, bypasses, internal imports)

**Soft Gate:** Steps 1-3 complete the boundary identification and dependency analysis. Present a summary of modules identified, data ownership, and dependency graph. Ask for confirmation before proceeding to extraction seam design and catalog creation.

### Step 4: Extraction Seam Design

- Define public facade for each module
- Identify data that could be extracted to a separate service later
- Document coupling points and extraction cost

### Step 5: Module Catalog Creation

- Create catalog: module name, owner, purpose, dependencies, extraction readiness score
- Produce dependency graph visualization (mermaid diagram)

## Quality Gates

This workflow contributes to:
- **QG-M1** (Module Architecture) - Validates module boundary definitions and dependencies
- **QG-F1** (Foundation) - Module boundaries inform master architecture

### Entry Gate
- QG-F1 (Foundation) should pass or be in progress (master architecture defined)

### Exit Gate
- QG-M1 checklist items from `module-architecture.md` verified:
  - [ ] All data has clear module ownership
  - [ ] No circular dependencies
  - [ ] Each module has defined public facade
  - [ ] Extraction seams documented

## Related Workflows

- `bmad-bam-create-master-architecture` - Precedes boundary design
- `bmad-bam-create-module-architecture` - Uses boundary definitions
- `bmad-bam-define-facade-contract` - Defines module public interfaces

## Output

- `{output_folder}/planning-artifacts/architecture/module-boundaries.md`
- Module catalog with dependency graph

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
