---
name: bmad-bam-define-facade-contract
displayName: Define Facade Contract
description: Define versioned facade contract between modules. Use when the user requests to 'define facade contract' or 'create module contract'.
module: bam
web_bundle: true
tags: [integration]
---

# Define Facade Contract

## Overview

This workflow creates a formal versioned facade contract when Module A needs to consume Module B. It covers analysis, interface design, documentation, and implementation story creation. Facade contracts are the only allowed cross-module communication mechanism — no direct internal imports.

Act as an Integration Architect designing clean module boundaries with versioned contracts.

**Args:** Accepts provider and consumer module names. Accepts `--headless` / `-H`.

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

### Step 1: Analysis

**Intent Check:** Confirm the user's intent before processing their input.

- Identify the integration need (what does the consumer need from the provider?)
- Load consumer and provider module architectures
- Check if a contract already exists (update vs create)

### Step 2: Design

Define the contract interface:

- Method signatures (all tenant-scoped)
- Input DTOs with validation rules
- Return types
- Error types (following master architecture error contract)
- Event subscriptions (if consumer needs provider events)

**Soft Gate:** Steps 1-2 complete the analysis and design phase. Present a summary of the contract interface design. Ask for confirmation before proceeding to documentation and implementation stories.

### Step 3: Documentation

- Write facade contract using master architecture template
- Update master architecture contracts index
- Update consumer architecture dependencies section

### Step 4: Implementation Stories

- Create provider stories for facade method implementation
- Update consumer stories to reference the facade contract

## Output

- `{output_folder}/planning-artifacts/contracts/{provider-module}-facade-v{version}.md`
- Updated module architectures (consumer dependencies section)
- Implementation stories for both modules

## References

- Template: `bam/templates/facade-contract-template.md`
- Module Facade Patterns: `bam/knowledge/module-facade-patterns.md`
- Event-Driven Patterns: `bam/knowledge/event-driven-patterns.md`

- Knowledge: `bam/knowledge/module-facade-patterns.md`, `bam/knowledge/event-driven-patterns.md`
- Module Facade Patterns: `bam/knowledge/module-facade-patterns.md`
- Event-Driven Patterns: `bam/knowledge/event-driven-patterns.md`
