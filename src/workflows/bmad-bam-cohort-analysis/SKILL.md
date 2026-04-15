---
name: bmad-bam-cohort-analysis
displayName: Cohort Analysis
description: 'Design cohort analysis for tenant segmentation with retention curves and behavior patterns'
module: bam
tags: [analytics, cohort, segmentation, retention]
---

# Cohort Analysis

## Overview

This workflow designs cohort analysis systems for multi-tenant platforms. It covers cohort definition, retention analysis, behavior patterns, and segmentation strategies.

Act as a product analyst specializing in cohort analysis and customer segmentation.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing cohort analysis systems
- Creating tenant segmentation strategies
- Building retention curve analysis
- Identifying behavior patterns by segment

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new cohort analysis design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant health scoring design
- Usage analytics pipeline
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/cohort-analysis-design.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Analytics required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant health scoring exists

### Exit Gate
- Cohort definitions documented
- Retention analysis designed

## Related Workflows

- `bmad-bam-tenant-health-scoring` - Health scores as input
- `bmad-bam-churn-prediction` - Churn by cohort
- `bmad-bam-feature-adoption-tracking` - Adoption by cohort
