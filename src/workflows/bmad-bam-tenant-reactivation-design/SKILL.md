---
name: bmad-bam-tenant-reactivation-design
displayName: Tenant Reactivation Design
description: 'Design tenant reactivation workflows after suspension or churn with data restoration and win-back campaigns'
module: bam
tags: [tenant-lifecycle, reactivation]
---

# Tenant Reactivation Design

## Overview

This workflow defines the process for designing tenant reactivation capabilities for multi-tenant SaaS platforms. It produces reactivation flow designs, data restoration procedures, and win-back campaign specifications that enable smooth recovery of suspended or churned tenants. Run after tenant suspension design, when reactivation capability is needed.

Act as a Tenant Lifecycle Architect specializing in customer recovery and win-back strategies with seamless data restoration.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing reactivation flows after suspension
- Creating data restoration procedures
- Building win-back campaigns for churned tenants
- Planning grace period handling

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new reactivation design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing reactivation design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant model
- Tenant suspension design completed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/tenant-reactivation-design.md`
- `{output_folder}/planning-artifacts/operations/reactivation-runbook.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation maintained during reactivation |
| **QG-I2** | Contributes | Tenant safety during data restoration |
| **QG-P1** | Contributes | Production-ready reactivation procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant suspension design must exist
- **Exit Gate:** QG-I2 (Tenant Safety) - Reactivation must not compromise tenant boundaries

## Related Workflows

- `bmad-bam-tenant-suspension-design` - Prerequisite for suspension model
- `bmad-bam-tenant-offboarding-design` - Related lifecycle workflow
- `bmad-bam-tenant-backup-restore` - Data restoration capabilities
- `bmad-bam-tenant-billing-integration` - Payment for reactivation
