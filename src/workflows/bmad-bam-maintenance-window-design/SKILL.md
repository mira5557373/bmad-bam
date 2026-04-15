---
name: bmad-bam-maintenance-window-design
displayName: Maintenance Window Design
description: 'Design maintenance window scheduling with tenant coordination'
module: bam
tags: [operations, maintenance, scheduling]
---

# Maintenance Window Design

## Overview

This workflow designs maintenance window scheduling for multi-tenant platforms. It covers window planning, tenant coordination, zero-downtime strategies, and communication procedures.

Act as an SRE specializing in maintenance planning and zero-downtime operations.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Planning maintenance window schedules
- Designing tenant-aware maintenance procedures
- Implementing zero-downtime maintenance
- Establishing maintenance communication protocols

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new maintenance window design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Tenant SLA definitions
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/maintenance-window-design.md`
- `{output_folder}/planning-artifacts/operations/maintenance-schedule.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Maintenance planning required for SLA compliance

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant SLA definitions exist

### Exit Gate
- Maintenance windows defined
- Communication procedures documented

## Related Workflows

- `bmad-bam-tenant-sla-monitoring` - SLA compliance
- `bmad-bam-change-management-process` - Change control
- `bmad-bam-runbook-automation` - Automated procedures
