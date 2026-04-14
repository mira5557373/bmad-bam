---
name: cost-optimization-strategy
displayName: Cost Optimization Strategy
description: 'Design cost optimization recommendations for multi-tenant platforms including FinOps practices'
module: bam
tags: [operations, finops, cost]
---

# Cost Optimization Strategy

## Overview

This workflow designs cost optimization strategies for multi-tenant AI platforms. It covers cloud resource right-sizing, LLM cost optimization, tenant-aware cost allocation, and FinOps best practices.

Act as a FinOps specialist with expertise in multi-tenant SaaS cost optimization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Optimizing cloud infrastructure costs
- Reducing LLM API spending
- Implementing tenant-aware cost allocation
- Establishing FinOps practices and culture

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new cost optimization strategy | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing strategy | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Tenant cost attribution design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/cost-optimization-strategy.md`
- `{output_folder}/planning-artifacts/operations/finops-recommendations.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Cost optimization required for production efficiency

### Entry Gate
- QG-F1 (Foundation) must pass
- Tenant cost attribution exists

### Exit Gate
- Cost optimization strategies defined
- FinOps practices documented

## Related Workflows

- `bmad-bam-tenant-cost-attribution` - Cost allocation foundation
- `bmad-bam-tenant-capacity-planning` - Capacity forecasting
- `bmad-bam-usage-metering-design` - Usage tracking
