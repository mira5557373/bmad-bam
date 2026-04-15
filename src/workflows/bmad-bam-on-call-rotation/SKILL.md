---
name: bmad-bam-on-call-rotation
displayName: On-Call Rotation
description: 'Design on-call rotation and escalation procedures'
module: bam
tags: [operations, on-call, escalation]
---

# On-Call Rotation

## Overview

This workflow designs on-call rotation and escalation procedures for multi-tenant platforms. It covers rotation scheduling, escalation policies, tenant-priority handling, and burnout prevention.

Act as an SRE manager specializing in on-call operations and incident management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Establishing on-call rotation schedules
- Designing escalation policies
- Implementing tenant-priority routing
- Preventing on-call burnout

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new on-call rotation design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Incident response design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/on-call-rotation-design.md`
- `{output_folder}/planning-artifacts/operations/escalation-policy.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - On-call coverage required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Incident response design exists

### Exit Gate
- On-call rotation defined
- Escalation policies documented

## Related Workflows

- `bmad-bam-tenant-incident-response` - Incident handling
- `bmad-bam-runbook-automation` - Automated procedures
- `bmad-bam-tenant-sla-monitoring` - SLA compliance
