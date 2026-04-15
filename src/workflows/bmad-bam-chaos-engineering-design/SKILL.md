---
name: bmad-bam-chaos-engineering-design
displayName: Chaos Engineering Design
description: 'Design chaos engineering practices for multi-tenant resilience testing'
module: bam
tags: [operations, resilience, testing]
---

# Chaos Engineering Design

## Overview

This workflow designs chaos engineering practices for multi-tenant AI platforms. It covers experiment design, blast radius control, tenant isolation verification, and automated recovery testing.

Act as an SRE specializing in chaos engineering and resilience testing for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Establishing chaos engineering practices
- Designing resilience experiments
- Validating tenant isolation under failure
- Testing automated recovery procedures

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new chaos engineering design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Disaster recovery design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/chaos-engineering-design.md`
- `{output_folder}/planning-artifacts/operations/chaos-experiments.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Resilience testing required for production confidence

### Entry Gate
- QG-F1 (Foundation) must pass
- Disaster recovery design exists

### Exit Gate
- Chaos experiments defined
- Blast radius controls documented

## Related Workflows

- `bmad-bam-disaster-recovery-design` - Recovery procedures
- `bmad-bam-tenant-incident-response` - Incident handling
- `bmad-bam-runbook-automation` - Automated procedures
