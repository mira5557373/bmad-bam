---
name: internal-contract-design
displayName: Internal Contract Design
description: Design module facade contracts and event schemas. Use when the user requests to 'design internal contracts' or 'specify module interfaces'.
module: bam
tags: [integration]
---

# Internal Contract Design

## Overview

This workflow specifies module facades, commands, queries, domain events, and policy interfaces for the BAM platform. These contracts are binding architectural decisions — they define how modules communicate without coupling to internal implementations. Run after master architecture is complete.

Act as an Integration Architect designing clean, versioned internal APIs between bounded contexts.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing internal contracts between module components
- Creating internal service interfaces
- Establishing module-internal boundaries

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Facade Interface Design

For each module, define:

- Public service interface (methods exposed to other modules)
- Input/output DTOs with Pydantic validation
- Error contracts (typed exceptions following master architecture pattern)
- Versioning strategy (semver on facade)

### Step 2: Command/Query Specification

- Commands that mutate state (write operations, all tenant-scoped)
- Queries that read state (read operations, all tenant-scoped)
- Tenant context requirements for each operation

**Soft Gate:** Steps 1-2 complete the facade and command/query design. Present a summary of interfaces designed. Ask for confirmation before proceeding to event schemas and policy interfaces.

### Step 3: Domain Event Schema

- Event naming conventions (`{Module}{Entity}{PastTenseVerb}`, e.g., `BillingInvoiceCreated`)
- Event payload structure (always includes `tenant_id`, `correlation_id`, `timestamp`)
- Event versioning strategy (schema registry integration)

### Step 4: Policy Interface Design

- Permission policies (Cerbos integration points)
- Validation policies (input validation rules)
- Rate limit policies (per-tenant, per-tier)

### Quality Gates

- [ ] All module facades defined
- [ ] DTOs specified with validation rules
- [ ] Events have clear schemas with tenant_id
- [ ] Policies documented

## Quality Gates

This workflow contributes to:
- **QG-M1** (Module Arch) - Facade contracts define module boundaries
- **QG-I1** (Convergence) - Contract compliance verified during convergence

### Entry Gate
- QG-F1 (Foundation) must pass before contract design
- Master architecture must define module boundaries

### Exit Gate
- All module facades documented with versioning strategy
- Event schemas include tenant_id and follow naming conventions
- QG-M1 contract-related checklist items from `module-architecture.md` verified

## Output

- `{output_folder}/planning-artifacts/architecture/module-contracts/{module}-contract.md` (per module)

## References

- Template: `bam/templates/facade-contract-template.md`
- Module Facade Patterns: `bam/knowledge/module-facade-patterns.md`
- Shared Kernel Patterns: `bam/knowledge/shared-kernel-patterns.md`
- Event-Driven Patterns: `bam/knowledge/event-driven-patterns.md`

- Knowledge: `bam/knowledge/module-facade-patterns.md`, `bam/knowledge/event-driven-patterns.md`, `bam/knowledge/shared-kernel-patterns.md`
- Module Facade Patterns: `bam/knowledge/module-facade-patterns.md`
- Shared Kernel Patterns: `bam/knowledge/shared-kernel-patterns.md`
- Event-Driven Patterns: `bam/knowledge/event-driven-patterns.md`
