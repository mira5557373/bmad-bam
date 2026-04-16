---
name: create-module-epics
displayName: Create Module Epics
description: Create module-scoped epics and stories. Use when the user requests to 'create module epics' or 'plan module stories'.
module: bam
tags: [module]
---

# Create Module Epics

## Overview

This workflow creates epics and user stories scoped to a single module, extending the BMM `create-epics-and-stories` pattern with BAM's module-scoped context loading. All stories are implementable within module boundaries — cross-module needs use facade contracts. Complexity-aware epic generation adjusts granularity based on module classification.

Act as a Platform Architect creating implementation-ready epics for a bounded module context.

**Args:** Accepts module name as argument. Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). If config is missing, let the user know they can configure BAM settings in `{project-root}/_bmad/config.yaml` under the `bam` section, or re-run `npx bmad-method install` to reconfigure. Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

Verify prerequisites:

- Module architecture must exist (`modules/{module}/architecture.md`)
- Foundation gate must have passed

**Intent Check:** Confirm the user's intent and the target module name before processing. Verify the module architecture exists and is the correct target for epic creation.

## When to Use

- Creating epic-level stories for new modules
- Breaking down module scope into development phases
- Planning module implementation milestones

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Context Loading (Module-Scoped)

1. ALWAYS load: `master-architecture.md` (sections 1-6)
2. ALWAYS load: `modules/{current_module}/architecture.md`
3. IF dependencies declared: load facade contracts for each dependency
4. NEVER load: other modules' epics or internal stories

## Complexity-Aware Epic Generation

| Complexity | Epic Count | Story Granularity                  | Special Stories        |
| ---------- | ---------- | ---------------------------------- | ---------------------- |
| SIMPLE     | 1-2 epics  | Coarse (CRUD operations grouped)   | None                   |
| STANDARD   | 3-5 epics  | Standard (one story per feature)   | None                   |
| COMPLEX    | 5+ epics   | Fine (split by risk, dependencies) | Spike stories required |

### Spike Story Triggers (COMPLEX only)

Create a spike story when:

- Domain model has entities with unclear boundaries
- Integration pattern not previously used in project
- AI behavior requires novel tool or memory pattern
- External system integration with unknown API characteristics
- Performance requirements unclear (need benchmarking)

**Soft Gate:** Context loading and complexity-aware epic generation plan are complete. Present a summary of module complexity classification, planned epic count, and any spike story triggers. Ask for confirmation before proceeding to story scoping and output generation. In headless mode, auto-proceed.

## Story Scoping Rules

- All stories must be implementable within module boundary
- Cross-module needs must reference facade contracts
- Each story carries: module scope, tenant context requirements, AI behavior specs (if applicable)
- Stories include BAM dev notes: module boundary enforcement, tenant context requirements, facade dependencies

## Output

- `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`
- Sprint-status update: module status → 'epics-complete'

## References

- Template: `{project-root}/_bmad/bam/data/templates/story-template.md`
- Parallel Development Guide: `{project-root}/_bmad/bam/data/agent-guides/bam/parallel-development-guide.md`

- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/parallel-development-guide.md`
- Parallel Development Guide: `{project-root}/_bmad/bam/data/agent-guides/bam/parallel-development-guide.md`

## Quality Gates

This workflow contributes to:
- **QG-M1** (Module Architecture) - Supports module architecture gate with implementation planning

### Entry Gate
- QG-F1 (Foundation) must have passed
- Module architecture must exist (`modules/{module}/architecture.md`)

### Exit Gate
- Epics created with complexity-aware granularity
- All stories implementable within module boundary
- Spike stories created for high-uncertainty areas (COMPLEX modules)
- Sprint-status updated: module status → 'epics-complete'
