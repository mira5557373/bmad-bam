---
name: database-migration-pipeline
displayName: Database Migration Pipeline
description: 'Execute database migrations including migration plan execution, data validation, tenant impact assessment, and rollback testing for multi-tenant AI platforms'
module: bam
tags: [database, operations, migration, data]
---

# Database Migration Pipeline

## Overview

This workflow provides comprehensive database migration execution for multi-tenant AI platforms. It covers migration plan execution, data validation, tenant impact assessment, and rollback testing. Run when executing schema changes or data migrations.

Act as a Database Engineer specializing in multi-tenant database migrations and zero-downtime deployments.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Executing database schema migrations
- Running data transformations
- Assessing tenant impact of database changes
- Testing migration rollback procedures

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new migration | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing migration plan | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-MG1 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Migration scripts prepared
- Database access available
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/operations/migration-execution-report.md`
- `{output_folder}/operations/data-validation-results.md`
- `{output_folder}/operations/tenant-impact-assessment.md`

## Quality Gates

This workflow contributes to:
- **QG-MG1** (Migration Gate) - Primary gate for migration verification
- **QG-M2** (Tenant Isolation) - Validates tenant data remains isolated
- **QG-P1** (Production Readiness) - Migration testing required

### Entry Gate
- Migration scripts reviewed and approved
- Staging migration tested

### Exit Gate
- QG-MG1 checklist items verified:
  - [ ] Migration executed successfully
  - [ ] Data validation passed
  - [ ] Tenant impact assessed
  - [ ] Rollback tested

## Related Workflows

- `bmad-bam-tenant-data-migration` - Tenant-specific migrations
- `bmad-bam-disaster-recovery-drill` - Includes database recovery
- `bmad-bam-tenant-backup-restore` - Backup/restore procedures
