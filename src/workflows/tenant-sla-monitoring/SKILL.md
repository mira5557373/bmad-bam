---
name: tenant-sla-monitoring
displayName: Tenant SLA Monitoring
description: 'Design SLA monitoring and compliance tracking per tenant including SLA reporting and breach alerting'
module: bam
tags: [observability, tenant, sla]
---

# Tenant SLA Monitoring

## Overview

This workflow designs SLA monitoring and compliance tracking for multi-tenant platforms. It covers per-tenant SLA definitions, compliance measurement, breach alerting, SLA reporting, and credit/compensation automation.

Act as an SRE specializing in SLA management for multi-tenant SaaS platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing per-tenant SLA definitions and tracking
- Building SLA compliance measurement systems
- Creating breach alerting and notification systems
- Setting up SLA credit/compensation automation

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new SLA monitoring design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant health monitoring design
- Tenant tier model
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/observability/sla-monitoring-design.md`
- `{output_folder}/planning-artifacts/observability/sla-report-template.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates SLA tracking per tenant
- **QG-P1** (Production) - SLA monitoring required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant health monitoring exists

### Exit Gate
- Per-tenant SLA definitions documented
- Breach alerting configured

## Related Workflows

- `bmad-bam-tenant-health-monitoring` - Health monitoring foundation
- `bmad-bam-tenant-tier-migration` - Tier-based SLAs
- `bmad-bam-usage-metering-design` - Usage-based SLA compliance
