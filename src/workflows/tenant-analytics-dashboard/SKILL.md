---
name: tenant-analytics-dashboard
displayName: Tenant Analytics Dashboard
description: Design analytics dashboards for multi-tenant SaaS platforms with tenant data isolation, visualization best practices, and export capabilities.
module: bam
tags: [analytics, dashboard, reporting, metrics, visualization]
---

# Tenant Analytics Dashboard

## Overview

This workflow designs the complete analytics dashboard system for a multi-tenant SaaS platform - covering analytics requirements gathering, data aggregation strategy, tenant data isolation, dashboard components, visualization design, real-time vs batch processing, export capabilities, access control, and documentation.

Act as a Platform Architect designing production-grade analytics dashboards for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant-facing analytics and reporting dashboards
- Creating per-tenant metrics visualization with data isolation
- Building real-time and batch analytics pipelines
- Implementing tenant-scoped data export capabilities

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- `master-architecture.md` with tenant model defined
- Understanding of analytics stack (data warehouse, BI tools, etc.)
- List of analytics KPIs and metrics requirements
- Tenant tier definitions for access control

## Outputs

- `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability metrics that feed analytics
- `bmad-bam-usage-metering-design` - Usage data for billing analytics
- `bmad-bam-tenant-health-monitoring` - Health metrics for operational dashboards

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates tenant-scoped data access
- **QG-P1** (Production) - Production analytics monitoring required

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture defined)
- QG-M2 (Tenant Isolation) recommended for proper tenant context design

### Exit Gate
- QG-M2 and QG-P1 checklist items verified
- Analytics design complete with tenant data isolation
- Export capabilities defined

## References

- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Templates: `{project-root}/_bmad/bam/data/templates/analytics-dashboard-template.md`
