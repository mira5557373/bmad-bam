---
name: list-tools
displayName: List Tools
description: List all registered AI tools with filtering. Use when the user requests to 'list tools' or 'show available AI tools'.
module: bam
console-only: true
tags: [ai-runtime]
---

# List Tools

## Overview

Developer utility that lists all registered AI tools in the platform with tier, category, and module filtering. Useful for discovering available tools, checking permissions, and verifying tool registration during development.

Act as an AI Runtime Architect providing tool registry access.

**Args:** Accepts optional filters: `--tier FREE|PRO|ENTERPRISE`, `--module {name}`, `--category {name}`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Discovering available AI tools in the platform
- Checking tool permissions and requirements
- Verifying tool registration during development

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate tool listing | `step-01-c-*` to `step-03-c-*` |
| Edit | Update filters | `step-10-e-*` |
| Validate | Verify tool registration | `step-20-v-*` |

**Intent Check:** Confirm the user's intent and any filter criteria before processing. Verify the requested tier, module, or category filters are valid.

## Workflow

### Step 1: Load Tool Registry

Read the tool registry from the AI runtime module configuration or architecture documents.

### Step 2: Apply Filters

Filter tools by:

- Tier (show only tools available to specified tier)
- Module (show only tools owned by specified module)
- Category (show only tools in specified category)

### Step 3: Display

Present tools in a table:

| Tool Name | Module | Category | Tiers | Approval Required | Sandbox |
| --------- | ------ | -------- | ----- | ----------------- | ------- |

If no filters applied, show all tools grouped by module.

## Output

- Console table of matching tools
- Tool count summary

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Tool inventory utility for runtime verification

### Entry Gate
- Tool registry exists in AI runtime module configuration
- Valid filter criteria (if specified)

### Exit Gate
- Tool listing displayed with requested filters
- Tool count summary provided

## References

- Template: `{project-root}/_bmad/bam/data/templates/tool-contract-template.md`
- Tool Execution Middleware: `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution-middleware.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution-middleware.md`
- Tool Execution Middleware: `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution-middleware.md`
