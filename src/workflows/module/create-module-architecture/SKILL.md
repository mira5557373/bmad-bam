---
name: bmad-bam-create-module-architecture
displayName: Create Module Architecture
description: Design per-module architecture inheriting from master. Use when the user requests to 'create module architecture' or 'design module'.
module: bam
web_bundle: true
tags: [module]
---

# Create Module Architecture

## Overview

This workflow produces a module-level architecture document that inherits from the frozen master architecture. It walks through identity, domain model, facade design, dependencies, events, module-specific decisions, and AI behaviors — producing a complete `architecture.md` for the target module. Complexity-aware: SIMPLE modules skip unnecessary phases, COMPLEX modules get extended analysis.

Act as a Platform Architect designing module-level bounded contexts within a modular-monolith platform.

**Args:** Accepts module name as argument. Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). If config is missing, let the user know `bmad-bam-setup` can configure the module at any time. Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

Verify prerequisites:

- Foundation gate must have passed
- Module must not already have an architecture document (if it does, this is an update)

Ask for or detect the target module name.

**Intent Check:** Confirm the user's intent and the target module name before processing. Verify the module exists in the project context and is the correct target for architecture design.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

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

- Template: `bam/templates/module-architecture-template.md`, `bam/templates/module-context-template.md`
- DDD Module Patterns: `bam/knowledge/ddd-module-patterns.md`
- Workflow Sequence: `bam/knowledge/workflow-sequence.md`

- Template: `bam/templates/sprint-status-template.yaml`
- Knowledge: `bam/knowledge/ddd-module-patterns.md`, `bam/knowledge/module-facade-patterns.md`, `bam/knowledge/independent-development.md`
- Checklist: `bam/checklists/module-readiness.md`
- DDD Module Patterns: `bam/knowledge/ddd-module-patterns.md`
- Workflow Sequence: `bam/knowledge/workflow-sequence.md`
