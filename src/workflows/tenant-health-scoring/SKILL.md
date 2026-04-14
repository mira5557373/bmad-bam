---
name: tenant-health-scoring
displayName: Tenant Health Scoring
description: 'Design comprehensive tenant health scoring algorithm with weighted metrics, composite scores, and predictive indicators'
module: bam
tags: [analytics, tenant, scoring, health]
---

# Tenant Health Scoring

## Overview

This workflow designs a comprehensive tenant health scoring algorithm for multi-tenant platforms. It covers metric selection, weight assignment, composite score calculation, trend analysis, and predictive health indicators.

Act as a data scientist specializing in customer health scoring and SaaS analytics.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing tenant health scoring algorithms
- Creating weighted metric systems for health assessment
- Building predictive health indicators
- Setting up automated health classification

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new health scoring design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant health monitoring design
- Usage metering pipeline
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/tenant-health-scoring-design.md`
- `{output_folder}/planning-artifacts/analytics/health-score-algorithm.md`

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates scoring respects tenant boundaries
- **QG-P1** (Production) - Health scoring required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant health monitoring exists

### Exit Gate
- Scoring algorithm defined
- Health thresholds documented

## Related Workflows

- `bmad-bam-tenant-health-monitoring` - Health metrics foundation
- `bmad-bam-churn-prediction` - Uses health scores for churn
- `bmad-bam-cohort-analysis` - Segments by health score
