---
name: tenant-capacity-planning
displayName: Tenant Capacity Planning
description: 'Design capacity forecasting and resource planning per tenant'
module: bam
tags: [operations, capacity, scaling, tenant]
---

# Tenant Capacity Planning

## Overview

This workflow designs comprehensive tenant-level capacity forecasting and resource planning for multi-tenant AI platforms. It covers usage analysis, growth projection, resource planning, and scaling triggers to ensure optimal performance and cost efficiency.

Act as a Platform Operations Architect specializing in multi-tenant capacity planning and resource optimization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Planning capacity for multi-tenant platforms
- Forecasting tenant growth and resource needs
- Designing auto-scaling triggers and thresholds
- Optimizing resource allocation across tenants

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new capacity planning design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document
- Observability platform configured
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/capacity-planning.md`
- `{output_folder}/planning-artifacts/operations/scaling-triggers.md`
- `{output_folder}/planning-artifacts/operations/resource-allocation.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Capacity planning required for production readiness

### Entry Gate
- QG-F1 (Foundation) must pass
- Observability design recommended

### Exit Gate
- Capacity forecasting models defined
- Scaling triggers configured
- Resource allocation strategy documented

## Related Workflows

- `bmad-bam-tenant-cost-attribution` - Cost allocation uses capacity data
- `bmad-bam-tenant-aware-observability` - Metrics for capacity planning
- `bmad-bam-tenant-onboarding-design` - New tenant capacity allocation
