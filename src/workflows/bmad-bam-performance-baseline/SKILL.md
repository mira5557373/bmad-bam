---
name: bmad-bam-performance-baseline
displayName: Performance Baseline
description: 'Design performance baseline establishment and benchmarking'
module: bam
tags: [operations, performance, observability]
---

# Performance Baseline

## Overview

This workflow designs performance baseline establishment for multi-tenant platforms. It covers metric selection, baseline collection, anomaly detection, and capacity planning integration.

Act as a performance engineer specializing in multi-tenant SaaS performance optimization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Establishing performance baselines
- Designing performance benchmarking
- Implementing anomaly detection
- Integrating with capacity planning

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new performance baseline design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Tenant-aware observability design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/performance-baseline-design.md`
- `{output_folder}/planning-artifacts/operations/performance-benchmarks.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Performance baselines required for production monitoring

### Entry Gate
- QG-F1 (Foundation) must pass
- Observability design exists

### Exit Gate
- Performance baselines defined
- Anomaly detection documented

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability foundation
- `bmad-bam-tenant-capacity-planning` - Capacity forecasting
- `bmad-bam-tenant-health-monitoring` - Health monitoring
