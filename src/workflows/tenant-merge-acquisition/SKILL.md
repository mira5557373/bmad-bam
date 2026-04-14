---
name: tenant-merge-acquisition
displayName: Tenant Merge Acquisition
description: 'Design tenant consolidation workflows for M&A scenarios including data merging and account unification'
module: bam
tags: [tenant-lifecycle, merge-acquisition]
---

# Tenant Merge Acquisition

## Overview

This workflow defines the process for designing tenant consolidation capabilities for M&A scenarios in multi-tenant SaaS platforms. It produces merge strategies, data consolidation procedures, and account unification workflows that enable seamless tenant combinations when companies merge or are acquired. Run after tenant hierarchy design, when M&A consolidation capability is needed.

Act as a Tenant Lifecycle Architect specializing in enterprise consolidation and complex data migration scenarios.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant merge procedures
- Creating M&A data consolidation workflows
- Building account unification processes
- Planning multi-tenant hierarchy changes

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new M&A consolidation design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing consolidation design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant model
- Tenant hierarchy design completed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/tenant-merge-acquisition-design.md`
- `{output_folder}/planning-artifacts/operations/merge-acquisition-runbook.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation maintained during merge |
| **QG-I2** | Contributes | Tenant safety during data consolidation |
| **QG-P1** | Contributes | Production-ready M&A procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant hierarchy must exist
- **Exit Gate:** QG-I2 (Tenant Safety) - Merge must not compromise tenant boundaries

## Related Workflows

- `bmad-bam-tenant-hierarchy-design` - Prerequisite for hierarchy structure
- `bmad-bam-tenant-data-migration` - Data migration capabilities
- `bmad-bam-tenant-offboarding-design` - Related lifecycle workflow
- `bmad-bam-tenant-backup-restore` - Data protection during merge
