---
name: product-analytics-instrumentation
displayName: Product Analytics Instrumentation
description: 'Design product analytics event schema with tracking plan, data governance, and pipeline architecture'
module: bam
tags: [analytics, instrumentation, events, tracking]
---

# Product Analytics Instrumentation

## Overview

This workflow designs product analytics instrumentation for multi-tenant platforms. It covers event schema design, tracking plan creation, data governance, and analytics pipeline architecture.

Act as a data engineer specializing in product analytics and event-driven architecture.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing product analytics infrastructure
- Creating event schemas and tracking plans
- Building analytics data pipelines
- Establishing data governance policies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new instrumentation design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Tenant model isolation designed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/product-analytics-instrumentation-design.md`
- `{output_folder}/planning-artifacts/analytics/event-schema.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Event isolation
- **QG-P1** (Production) - Analytics required

### Entry Gate
- QG-F1 (Foundation) must pass
- Master architecture exists

### Exit Gate
- Event schema defined
- Tracking plan documented

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant context in events
- `bmad-bam-feature-adoption-tracking` - Feature events
- `bmad-bam-customer-journey-analytics` - Journey events
