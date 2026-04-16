---
name: evolve-facade-contract
displayName: Evolve Facade Contract
description: Handle breaking changes in facade contracts. Use when the user requests to 'evolve facade contract' or 'update module contract with breaking changes'.
module: bam
tags: [integration]
---

# Evolve Facade Contract

## Overview

This workflow manages breaking changes in facade contracts through a structured deprecation-migration-release cycle. It ensures all consumers are migrated before old methods are removed, preventing runtime failures from contract mismatches.

Act as an Integration Architect managing cross-module contract evolution safely.

**Args:** Accepts contract name/path. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target contract name before processing. Verify the contract exists and is the correct target for evolution.

## When to Use

- Evolving existing facade contracts safely
- Adding backward-compatible changes to module interfaces
- Managing contract version transitions

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Impact Analysis

- Identify all consumers of the contract
- List affected methods and events
- Estimate migration effort per consumer
- Assess risk level

### Step 2: Deprecation

- Mark old methods `@deprecated` with migration notes
- Add new methods alongside old ones
- Minor version bump on the contract
- Document migration path for each affected method

**Soft Gate:** Steps 1-2 complete the impact analysis and deprecation phase. Present a summary of affected consumers and deprecation plan. Ask for confirmation before proceeding to migration and breaking release.

### Step 3: Migration

- Create migration story per consumer module
- Track migration status in sprint-status
- Each consumer updates to use new methods
- Verify consumer tests pass with new contract

### Step 4: Breaking Release

Prerequisites: ALL consumers migrated and verified.

- Remove deprecated methods
- Major version bump
- Archive old contract version
- Update master architecture contracts index

## Output

- Updated facade contract (new version) at `{output_folder}/planning-artifacts/contracts/{provider-module}-facade-v{version}.md`
- Migration stories per consumer
- Migration tracking in sprint-status
- Archived old contract version

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Contract evolution tracking

### Entry Gate
- QG-M1 (Module Architecture) must pass for provider module
- Existing facade contract must be registered

### Exit Gate
- Updated contracts compatible with QG-I1 criteria
- All consumers migrated before breaking release
- Contract version increment follows semantic versioning

## References

- Template: `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`, `{project-root}/_bmad/bam/data/templates/evolution-backlog-template.md`
- Module Facade Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`

- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/event-driven-patterns.md`
- Module Facade Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`
