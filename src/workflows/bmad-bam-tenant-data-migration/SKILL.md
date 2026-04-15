---
name: bmad-bam-tenant-data-migration
displayName: Tenant Data Migration
description: Design and execute tenant data migration between environments or tiers. Use when the user requests to 'migrate tenant data' or 'plan tenant migration'.
module: bam
tags: [tenant]
---

# Tenant Data Migration

## Overview

This workflow guides architects through designing and executing tenant data migration between environments (dev to staging, staging to production) or between tiers (FREE to PRO, PRO to ENTERPRISE). It covers migration scope assessment, strategy selection (big bang, phased, dual-write), runbook creation, and rollback planning to ensure safe and complete data migration with minimal downtime.

Act as a Platform Architect designing reliable tenant data migration with full data integrity guarantees.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant data migration procedures
- Creating data movement between environments
- Building tenant clone and transfer capabilities

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new migration plan from scratch | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing migration plan | `step-10-e-*` to `step-11-e-*` |
| Validate | Check migration plan against criteria | `step-20-v-*` to `step-21-v-*` |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Tenant model isolation design completed
- Master architecture document available
- Source and target environments identified
- **Config required:** `{tenant_model}`

## Outputs

- `migration-runbook.md` in `{output_folder}/planning-artifacts/`
- Migration scope assessment
- Strategy selection rationale
- Rollback procedures

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates tenant data boundaries during migration
- **QG-I2** (Tenant Safety) - Ensures migration does not compromise tenant data isolation
- **QG-P1** (Production) - Migration to production requires validated procedures

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture defined)
- QG-M2 (Tenant Isolation) must pass for data boundary definitions

### Exit Gate
- QG-M2 and QG-I2 checklist items from `tenant-isolation.md` and `qg-i2-tenant-safety.md` verified
- Migration runbook complete with rollback procedures
- Data integrity verification mechanisms defined

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-tenant-model-isolation` | Prereq | Must be completed first to understand isolation boundaries |
| `bmad-bam-tenant-onboarding-design` | Related | Migration may trigger onboarding procedures in target environment |
| `bmad-bam-tenant-offboarding-design` | Related | Migration may require cleanup in source environment |

## References

- Knowledge: `tenant-data-migration-patterns.md`, `saga-orchestration-patterns.md`
- Template: `migration-runbook-template.md`
- Checklist: None (operations workflow)

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
