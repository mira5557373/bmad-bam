---
name: bmad-bam-module-boundary-design
displayName: Module Boundary Design
description: Design module boundaries and data ownership. Use when the user requests to 'design module boundaries' or 'identify bounded contexts'.
module: bam
web_bundle: true
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

### Quality Gates

- [ ] All data has clear module ownership
- [ ] No circular dependencies
- [ ] Each module has defined public facade
- [ ] Extraction seams documented

## Output

- `{output_folder}/planning-artifacts/architecture/module-boundaries.md`
- Module catalog with dependency graph

## References

- Knowledge: `bam/knowledge/ddd-module-patterns.md`, `bam/knowledge/module-facade-patterns.md`, `bam/knowledge/independent-development.md`
