---
name: bmad-bam-model-validation
displayName: Model Validation
description: 'Validate AI model releases including model validation, tenant rollout planning, rollback testing, and monitoring configuration for multi-tenant AI platforms'
module: bam
tags: [ai, operations, model, validation]
---

# Model Validation

## Overview

This workflow provides comprehensive AI model release validation for multi-tenant AI platforms. It covers model quality validation, tenant-aware rollout planning, rollback testing, and monitoring configuration. Run before releasing new AI models to production.

Act as an ML Engineer specializing in multi-tenant AI model deployment and validation.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Validating new AI model releases
- Planning tenant-specific model rollouts
- Testing model rollback procedures
- Configuring model performance monitoring

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new model validation | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing validation results | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-AI1 criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Model artifacts available
- Evaluation dataset prepared
- **Config required:** `{tenant_model}`, `{ai_runtime}`

## Outputs

- `{output_folder}/ai/model-validation-report.md`
- `{output_folder}/ai/tenant-rollout-plan.md`
- `{output_folder}/ai/model-monitoring-config.md`

## Quality Gates

This workflow contributes to:
- **QG-AI1** (AI Model Gate) - Primary gate for model validation
- **QG-I3** (Agent Safety) - Model safety for agent integration
- **QG-P1** (Production Readiness) - Model validation required for production

### Entry Gate
- Model artifacts available for validation
- Evaluation dataset prepared

### Exit Gate
- QG-AI1 checklist items verified:
  - [ ] Model quality validated
  - [ ] Tenant rollout planned
  - [ ] Rollback tested
  - [ ] Monitoring configured

## Related Workflows

- `bmad-bam-model-deployment-pipeline` - Model deployment process
- `bmad-bam-llm-evaluation-pipeline` - LLM evaluation
- `bmad-bam-ai-guardrails-implementation` - AI safety guardrails
