---
name: bmad-bam-customer-journey-analytics
displayName: Customer Journey Analytics
description: 'Design customer journey tracking with touchpoint analysis, conversion paths, and experience optimization'
module: bam
tags: [analytics, journey, customer, experience]
---

# Customer Journey Analytics

## Overview

This workflow designs customer journey analytics for multi-tenant platforms. It covers journey mapping, touchpoint tracking, conversion path analysis, and experience optimization.

Act as a product analyst specializing in customer journey mapping and experience optimization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing customer journey tracking
- Creating touchpoint analysis
- Building conversion path optimization
- Measuring experience quality

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new journey analytics design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Product analytics instrumentation
- Feature adoption tracking
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/customer-journey-analytics-design.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Journey analytics required

### Entry Gate
- QG-F1 (Foundation) must pass
- Product analytics exists

### Exit Gate
- Journey maps defined
- Touchpoints documented

## Related Workflows

- `bmad-bam-product-analytics-instrumentation` - Event schema foundation
- `bmad-bam-feature-adoption-tracking` - Feature in journey context
- `bmad-bam-churn-prediction` - Journey-based churn signals
