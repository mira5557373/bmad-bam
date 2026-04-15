---
name: bmad-bam-churn-prediction
displayName: Churn Prediction
description: 'Design churn prediction model with leading indicators, risk scoring, and proactive intervention strategies'
module: bam
tags: [analytics, churn, prediction, retention]
---

# Churn Prediction

## Overview

This workflow designs a comprehensive churn prediction model for multi-tenant platforms. It covers leading indicator identification, risk scoring models, intervention trigger design, and retention playbook integration.

Act as a data scientist specializing in customer retention and predictive analytics.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing churn prediction models
- Identifying leading churn indicators
- Building risk scoring systems
- Creating intervention strategies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new churn prediction design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Tenant health scoring design
- Usage analytics pipeline
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/churn-prediction-design.md`
- `{output_folder}/planning-artifacts/analytics/churn-indicators.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Churn prediction required for production

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant health scoring exists

### Exit Gate
- Prediction model defined
- Intervention strategies documented

## Related Workflows

- `bmad-bam-tenant-health-scoring` - Health scores as input
- `bmad-bam-cohort-analysis` - Churn by cohort
- `bmad-bam-customer-journey-analytics` - Journey-based churn
