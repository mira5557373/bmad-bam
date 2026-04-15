---
name: bmad-bam-runbook-automation
displayName: Runbook Automation
description: 'Design automated runbook execution for operational procedures'
module: bam
tags: [operations, automation, runbooks]
---

# Runbook Automation

## Overview

This workflow designs automated runbook execution for multi-tenant platforms. It covers runbook structure, automation patterns, tenant-aware execution, and safety controls.

Act as an SRE specializing in operational automation and runbook engineering.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Automating operational procedures
- Designing runbook structure and templates
- Implementing tenant-aware automation
- Establishing safety controls for automation

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new runbook automation design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Incident response design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/runbook-automation-design.md`
- `{output_folder}/planning-artifacts/operations/runbook-templates.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Operational automation required for production efficiency

### Entry Gate
- QG-F1 (Foundation) must pass
- Incident response design exists

### Exit Gate
- Runbook templates defined
- Automation patterns documented

## Related Workflows

- `bmad-bam-tenant-incident-response` - Incident handling
- `bmad-bam-change-management-process` - Change control
- `bmad-bam-maintenance-window-design` - Maintenance scheduling
