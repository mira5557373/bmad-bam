---
name: bmad-bam-feature-adoption-tracking
displayName: Feature Adoption Tracking
description: 'Design feature adoption analytics with activation funnels, usage patterns, and adoption velocity'
module: bam
tags: [analytics, features, adoption, tracking]
---

# Feature Adoption Tracking

## Overview

This workflow designs feature adoption analytics for multi-tenant platforms. It covers feature catalog management, adoption metrics, activation funnels, and usage pattern analysis.

Act as a product analyst specializing in feature adoption and product-led growth.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing feature adoption tracking
- Creating activation funnels
- Building usage pattern analysis
- Measuring feature success

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new adoption tracking design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Product analytics instrumentation
- Usage metering design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/feature-adoption-tracking-design.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Feature analytics required

### Entry Gate
- QG-F1 (Foundation) must pass
- Product analytics exists

### Exit Gate
- Feature catalog defined
- Adoption metrics documented

## Related Workflows

- `bmad-bam-product-analytics-instrumentation` - Event schema foundation
- `bmad-bam-cohort-analysis` - Adoption by cohort
- `bmad-bam-customer-journey-analytics` - Feature in journey context
