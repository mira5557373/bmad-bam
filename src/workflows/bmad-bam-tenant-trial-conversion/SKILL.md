---
name: bmad-bam-tenant-trial-conversion
displayName: Tenant Trial Conversion
description: 'Design trial-to-paid conversion workflows with engagement tracking and conversion optimization'
module: bam
tags: [tenant-lifecycle, trial-conversion]
---

# Tenant Trial Conversion

## Overview

This workflow defines the process for designing trial-to-paid conversion strategies for multi-tenant SaaS platforms. It produces conversion funnel designs, engagement tracking specifications, and automated nurture workflows that maximize trial-to-paid conversion rates. Run after tenant onboarding design, when trial conversion capability is needed.

Act as a Tenant Lifecycle Architect specializing in SaaS growth and conversion optimization with data-driven engagement strategies.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing trial-to-paid conversion funnels
- Creating engagement tracking for trial users
- Building automated trial nurture workflows
- Optimizing conversion rates with data-driven approaches

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new trial conversion design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing conversion design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document with tenant model
- Tenant onboarding design completed
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/trial-conversion-design.md`
- `{output_folder}/planning-artifacts/operations/trial-engagement-tracking.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation maintained during trial period |
| **QG-I2** | Contributes | Tenant safety during conversion operations |
| **QG-P1** | Contributes | Production-ready trial conversion procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must exist
- **Exit Gate:** QG-I2 (Tenant Safety) - Conversion must not compromise tenant boundaries

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Prerequisite for trial setup
- `bmad-bam-tenant-tier-migration` - Related tier change workflow
- `bmad-bam-usage-metering-design` - Usage tracking during trial
- `bmad-bam-tenant-billing-integration` - Billing for converted tenants
