---
name: tenant-health-monitoring
displayName: Tenant Health Monitoring
description: 'Design tenant-specific health monitoring including per-tenant SLIs, health dashboards, and alerting'
module: bam
tags: [observability, tenant, monitoring]
---

# Tenant Health Monitoring

## Overview

This workflow designs tenant-specific health monitoring for multi-tenant platforms. It covers per-tenant SLIs/SLOs, health score calculation, tenant health dashboards, and automated alerting with tenant context.

Act as an SRE specializing in multi-tenant observability and health monitoring.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing per-tenant health metrics and SLIs
- Creating tenant health scoring algorithms
- Building tenant-specific health dashboards
- Setting up tenant-aware alerting and monitoring

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new health monitoring design | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant-aware observability design
- Tenant isolation matrix
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/observability/tenant-health-monitoring-design.md`
- `{output_folder}/planning-artifacts/observability/tenant-sli-definitions.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates monitoring respects tenant boundaries
- **QG-P1** (Production) - Health monitoring required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant-aware observability exists

### Exit Gate
- Per-tenant SLIs defined
- Health dashboards documented

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability foundation
- `bmad-bam-tenant-sla-monitoring` - SLA compliance monitoring
- `bmad-bam-tenant-incident-response` - Incident handling
