---
name: bmad-bam-requirement-ingestion
displayName: Requirement Ingestion
description: Decompose large feature catalogs into module definitions. Use when the user requests to 'ingest requirements' or 'decompose feature catalog'.
module: bam
tags: [platform]
---

# Requirement Ingestion

## Overview

This workflow decomposes large feature catalogs (180K-330K character markdown files) into module definitions with boundaries and dependencies. It chains document splitting, index creation, bounded context discovery, dependency mapping, priority assignment, and module registration. Bridges the gap between having a feature catalog and starting module development.

Act as a Platform Architect performing systematic requirement decomposition.

**Args:** Accepts path to feature catalog file. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Ingesting requirements from external sources
- Converting PRDs to BAM format
- Normalizing requirement documentation

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Document Splitting

**Intent Check:** Confirm the user's intent and the target feature catalog file path before processing. Verify the file exists and is the correct document to decompose.

Split the large feature catalog by module sections (Level 2 headings). Use BMAD Core's `shard-doc` capability if available, otherwise split manually.

Output: individual module feature files in `{output_folder}/planning-artifacts/features/`

### Step 2: Index Creation

Create a navigable index of all module feature files.

Output: `{output_folder}/planning-artifacts/features/index.md`

### Step 3: Bounded Context Discovery

For each module feature file, identify:

- Bounded context boundaries
- Data ownership (which entities belong to this module)
- Dependencies on other modules

### Step 4: Dependency Mapping

Analyze cross-references between modules:

- Build dependency graph
- Identify allowed dependencies (acyclic)
- Flag forbidden dependencies (cycles)
- Identify shared kernel candidates

**Soft Gate:** Steps 1-4 complete the decomposition and dependency analysis. Present a summary of modules discovered, boundaries identified, and dependency graph. Ask for confirmation before proceeding to priority assignment and module registration.

### Step 5: Priority Assignment

Assign build priority based on:

1. Dependency depth (modules with no dependencies first)
2. Business value (revenue-critical modules higher)
3. Complexity (simpler modules first for momentum)

Output: prioritized module list

### Step 6: Module Registration

Register all discovered modules in sprint-status.yaml:

- Status: `backlog`
- Dependencies declared
- Priority assigned

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Feeds into foundation architecture planning

### Entry Gate
- Feature catalog document exists and is accessible
- BMM discovery phase completed (product brief, PRD)

### Exit Gate
- All features assigned to exactly one module
- No circular dependencies in module graph
- Priority order respects dependency constraints
- All modules registered in sprint-status.yaml

## Output

- `{output_folder}/planning-artifacts/features/` — individual module feature files
- `{output_folder}/planning-artifacts/features/index.md` — navigable index
- Module boundary map with dependency graph
- Prioritized module list
- Updated sprint-status.yaml

## References

- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Independent Development: `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
- DDD Module Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
- Independent Development: `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
- DDD Module Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`
