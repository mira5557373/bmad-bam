---
name: tenant-tier-migration
displayName: Tenant Tier Migration
description: 'Design and execute tenant tier upgrades and downgrades between FREE, PRO, and ENTERPRISE tiers'
module: bam
tags: [tenant-lifecycle, tier-management]
---

# Tenant Tier Migration

## Overview

This workflow defines the process for migrating tenants between subscription tiers (FREE, PRO, ENTERPRISE). It produces migration plans, feature transition designs, and runbooks that ensure seamless tier changes without service disruption. Run after tenant onboarding design, when tier migration capability is needed.

Act as a Tenant Lifecycle Architect specializing in multi-tier SaaS platforms with safe migration requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tier upgrade/downgrade procedures
- Creating tier migration automation
- Building tier-based feature transitions

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new tier migration plan | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing migration plan | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tier definitions
- Tenant onboarding design completed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/tenant-tier-migration-plan.md`
- `{output_folder}/planning-artifacts/operations/tier-migration-runbook.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation preserved during tier changes |
| **QG-I2** | Contributes | Tenant safety during migration operations |
| **QG-P1** | Contributes | Production-ready tier migration procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tier definitions and tenant model must exist
- **Exit Gate:** QG-I2 (Tenant Safety) - Migration must not compromise tenant boundaries

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Prerequisite for tier definitions
- `bmad-bam-tenant-offboarding-design` - Related lifecycle workflow
- `bmad-bam-usage-metering-design` - Usage tracking for tier limits
