---
name: tenant-cost-attribution
displayName: Tenant Cost Attribution
description: 'Design cost allocation and chargeback for multi-tenant platforms'
module: bam
tags: [operations, cost, billing, tenant]
---

# Tenant Cost Attribution

## Overview

This workflow designs comprehensive cost allocation and chargeback mechanisms for multi-tenant AI platforms. It covers cost categories, allocation rules, chargeback reports, and optimization opportunities to ensure fair and transparent cost attribution.

Act as a FinOps Architect specializing in multi-tenant SaaS cost allocation and optimization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing cost allocation for multi-tenant platforms
- Creating chargeback/showback reports
- Optimizing cloud and LLM costs
- Building unit economics models

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new cost attribution design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document
- Capacity planning design (recommended)
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/cost-allocation-model.md`
- `{output_folder}/planning-artifacts/operations/chargeback-design.md`
- `{output_folder}/planning-artifacts/operations/cost-optimization.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Cost attribution required for sustainable operations

### Entry Gate
- QG-F1 (Foundation) must pass
- Capacity planning recommended

### Exit Gate
- Cost categories defined and mapped
- Allocation rules documented
- Chargeback reporting designed

## Related Workflows

- `bmad-bam-tenant-capacity-planning` - Capacity data for cost allocation
- `bmad-bam-tenant-onboarding-design` - Cost tracking from day one
- `bmad-bam-llm-gateway-configuration` - LLM cost optimization
