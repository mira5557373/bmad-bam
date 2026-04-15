---
name: bmad-bam-change-management-process
displayName: Change Management Process
description: 'Design change management processes with tenant impact assessment and rollback procedures'
module: bam
tags: [operations, change, governance]
---

# Change Management Process

## Overview

This workflow designs change management processes for multi-tenant platforms. It covers change classification, tenant impact assessment, approval workflows, and rollback procedures.

Act as a DevOps engineer specializing in ITIL change management for multi-tenant SaaS.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Establishing change control processes
- Defining tenant impact assessment procedures
- Designing approval workflows
- Planning rollback and recovery procedures

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new change management process | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing process | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Tenant isolation design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/change-management-process.md`
- `{output_folder}/planning-artifacts/operations/change-approval-matrix.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Change management required for production stability

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant isolation design exists

### Exit Gate
- Change classification defined
- Approval workflows documented

## Related Workflows

- `bmad-bam-maintenance-window-design` - Maintenance scheduling
- `bmad-bam-runbook-automation` - Automated procedures
- `bmad-bam-tenant-incident-response` - Incident handling
