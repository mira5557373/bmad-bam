---
name: create-module-architecture
displayName: Create Module Architecture
description: Design per-module architecture inheriting from master. Use when the user requests to 'create module architecture' or 'design module'.
module: bam
tags: [module]
---

# Create Module Architecture

## Overview

This workflow produces a module-level architecture document that inherits from the frozen master architecture. It walks through identity, domain model, facade design, dependencies, events, module-specific decisions, and AI behaviors — producing a complete `architecture.md` for the target module. Complexity-aware: SIMPLE modules skip unnecessary phases, COMPLEX modules get extended analysis.

Act as a Platform Architect designing module-level bounded contexts within a modular-monolith platform.

**Args:** Accepts module name as argument. Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). If config is missing, let the user know they can configure BAM settings in `{project-root}/_bmad/config.yaml` under the `bam` section, or re-run `npx bmad-method install` to reconfigure. Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

Verify prerequisites:

- Foundation gate must have passed
- Module must not already have an architecture document (if it does, this is an update)

Ask for or detect the target module name.

**Intent Check:** Confirm the user's intent and the target module name before processing. Verify the module exists in the project context and is the correct target for architecture design.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Creating architecture for a new module
- Defining module boundaries, facades, and domain model
- Establishing module-level AI behaviors and tool permissions

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new module architecture | `step-01-c-*` to `step-10-c-*` |
| Edit | Modify existing module architecture | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M1 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 0: Complexity Confirmation

Load complexity classification from sprint-status.yaml if available. Review module scope against the 8-question assessment (see `./references/complexity-assessment.md` if available, otherwise use inline criteria). Apply one-way upgrade if triggers detected. Classifications: SIMPLE, STANDARD, COMPLEX.

### Step 1: Identity

Define the module's bounded context:

- Business capability owned
- Module owner/team
- Brief purpose statement

### Step 2: Load Master Architecture

Load `{output_folder}/planning-artifacts/master-architecture.md`. Extract:

- Relevant patterns for this module
- Inherited constraints
- Shared kernel interfaces to implement

### Step 3: Domain Model

Define aggregate roots, entities, value objects, and invariants.

- ALL entities must have `tenant_id`
- ALL entities must follow `BaseEntity` from master architecture
- Document entity relationships and lifecycle rules

### Step 4: Public Facade Design

Define the module's public interface:

- Facade methods (all tenant-scoped)
- Input/output DTOs
- Error types (following master architecture error contract)
- Must follow facade template from master architecture

### Step 5: Dependencies

Declare consumed facades (with version) and consumed events.

- Verify each dependency has a facade contract
- Verify no circular dependencies
- **SIMPLE modules:** Skip if 0-1 dependencies

### Step 6: Events Published

Define domain events, payload schemas, and publishing rules.

- All events must include `tenant_id` in payload
- **SIMPLE modules:** Skip if no domain events (CRUD-only module)

### Step 7: Module-Specific Decisions

Document module ADRs and pattern variations within master constraints.

- If a needed pattern is not in master architecture or TSA, document as module-specific ADR
- If pattern proves useful across 2+ modules, promote to master architecture via formal ADR
- **SIMPLE modules:** Skip if all decisions inherited from master

### Step 8: AI Behaviors (if applicable)

Define agents, tool permissions, and memory scope rules for this module.

- Tool permissions must be within policy bounds
- Memory scope correctly declared
- **Skip entirely** if module has no AI involvement

**Soft Gate:** Steps 1-8 complete the analysis and design phases. Present a summary of identity, domain model, facade design, dependencies, events, and AI behaviors. Ask for confirmation before proceeding to assembly. In headless mode, auto-proceed.

### Step 9: Assembly

1. Combine all sections into `modules/{module-name}/architecture.md`
2. Add inheritance reference to master architecture
3. Validate against master constraints
4. Generate `module-context.md` (compact summary for story creation)
5. Register module in sprint-status.yaml as 'architecture-complete'

## COMPLEX Module Extensions

| Extension                  | Trigger                                     |
| -------------------------- | ------------------------------------------- |
| Pattern Gap Research       | Novel pattern needed not in master arch     |
| Spike Story                | High uncertainty in domain model            |
| Integration Design Session | 4+ facade dependencies                      |
| Risk Analysis              | Revenue-critical or compliance-heavy module |

## Output

- `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- `{output_folder}/planning-artifacts/modules/{module-name}/module-context.md`
- Updated sprint-status.yaml

## References

- Template: `{project-root}/_bmad/bam/data/templates/module-architecture-template.md`, `{project-root}/_bmad/bam/data/templates/module-context-template.md`
- DDD Module Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`
- Workflow Sequence: `{project-root}/_bmad/bam/data/agent-guides/bam/workflow-sequence.md`

- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/module-readiness.md`
- DDD Module Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/ddd-module-patterns.md`
- Workflow Sequence: `{project-root}/_bmad/bam/data/agent-guides/bam/workflow-sequence.md`

## Quality Gates

This workflow contributes to:
- **QG-M1** (Module Architecture) - Defines module architecture

### Entry Gate
- QG-F1 (Foundation) must have passed
- Module must not already have an architecture document (if it does, use Edit mode)

### Exit Gate
- QG-M1 checklist items from `module-architecture.md` verified
- Module identity, domain model, facade, dependencies, events, and AI behaviors defined
- Architecture inherits from master architecture
- Module registered in sprint-status.yaml as 'architecture-complete'

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
