---
name: bmad-bam-extend-project-context
displayName: Extend Project Context
description: Add BAM configuration section to project-context.md. Use when setting up BAM for a project.
module: bam
tags: [setup, configuration]
---

# Extend Project Context

## Overview

This workflow adds the BAM (BMAD Agentic Multi-tenant) configuration section to an existing project-context.md file. It captures tenant model decisions, AI runtime selections, and multi-tenant architecture choices that inform all downstream BAM workflows.

Act as a Platform Architect configuring BAM for a multi-tenant AI SaaS project.

**Args:** Accepts path to project-context.md. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as the target file.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Adding new context to BAM project documentation
- Extending project-context.md with new decisions
- Integrating external documentation into project context

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Add new BAM section to project-context.md |
| **Edit** | Update existing BAM section |
| **Validate** | Check BAM section completeness |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Existing project-context.md file from BMM
- BAM module installed

## Workflow

### Step 1: Locate Project Context

- Search for project-context.md in project
- Verify file structure and existing sections
- Identify insertion point for BAM section

### Step 2: Gather BAM Configuration

Gather from the user (or from args in headless mode):

- Tenant model selection (RLS, schema-per-tenant, database-per-tenant)
- AI runtime selection (LangGraph, CrewAI, AutoGen, custom)
- Multi-tenant tier structure (free, pro, enterprise)
- Agent orchestration approach

### Step 3: Generate BAM Section

- Create BAM configuration section
- Document tenant isolation decisions
- Document AI runtime architecture choices
- Include pattern registry references

### Step 4: Insert and Validate

- Insert BAM section into project-context.md
- Validate section structure
- Verify references to pattern registry

## Outputs

- Updated `{project-root}/**/project-context.md` with BAM configuration section

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation setup with BAM configuration |

- **Entry Gate:** None - This is a setup workflow
- **Exit Gate:** QG-F1 (Foundation) - Project context must contain BAM configuration

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `create-master-architecture` | Downstream | Create master architecture after configuring BAM |
| `bmad-bam-validate-patterns` | Related | Validate pattern registry after configuration |

## References

- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant Models: `{project-root}/_bmad/bam/data/tenant-models.csv`
- AI Runtimes: `{project-root}/_bmad/bam/data/ai-runtimes.csv`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
