---
name: bmad-bam-usage-forecasting
displayName: Usage Forecasting
description: 'Design usage forecasting models for capacity planning with trend analysis and demand prediction'
module: bam
tags: [analytics, forecasting, capacity, planning]
---

# Usage Forecasting

## Overview

This workflow designs usage forecasting models for multi-tenant capacity planning. It covers trend analysis, seasonality detection, demand prediction, and resource scaling recommendations.

Act as a data scientist specializing in time series forecasting and capacity planning.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing usage forecasting models
- Planning infrastructure capacity
- Building demand prediction systems
- Creating auto-scaling strategies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new forecasting design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Usage metering design
- Tenant capacity planning
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/usage-forecasting-design.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Capacity planning required

### Entry Gate
- QG-F1 (Foundation) must pass
- Usage metering exists

### Exit Gate
- Forecasting models defined
- Scaling recommendations documented

## Related Workflows

- `bmad-bam-usage-metering-design` - Usage data source
- `bmad-bam-tenant-capacity-planning` - Capacity allocation
- `bmad-bam-ai-usage-analytics` - AI-specific forecasting
