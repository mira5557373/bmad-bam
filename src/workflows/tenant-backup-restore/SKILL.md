---
name: tenant-backup-restore
displayName: Tenant Backup and Restore
description: 'Design tenant-specific backup and restore procedures including point-in-time recovery and data isolation'
module: bam
tags: [operations, tenant, disaster-recovery]
---

# Tenant Backup and Restore

## Overview

This workflow designs tenant-specific backup and restore capabilities for multi-tenant platforms. It covers backup isolation, point-in-time recovery, cross-tenant data protection, and restore verification procedures.

Act as a Platform Operations Engineer specializing in multi-tenant backup and disaster recovery.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing tenant-specific backup and restore procedures
- Planning point-in-time recovery for tenant data
- Creating backup isolation strategies per tenant
- Building restore verification procedures

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new backup/restore design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant isolation matrix
- Disaster recovery design (recommended)
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/tenant-backup-design.md`
- `{output_folder}/planning-artifacts/operations/restore-runbook.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates backup isolation per tenant
- **QG-P1** (Production) - Backup/restore required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant isolation matrix exists

### Exit Gate
- Backup isolation design documented
- Restore procedures verified

## Related Workflows

- `bmad-bam-disaster-recovery-design` - Overall DR strategy
- `bmad-bam-tenant-data-migration` - Data movement patterns
- `bmad-bam-tenant-offboarding-design` - Backup retention on offboarding
