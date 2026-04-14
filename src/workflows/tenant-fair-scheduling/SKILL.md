---
name: tenant-fair-scheduling
displayName: Tenant Fair Scheduling
description: Design fair resource scheduling to prevent noisy neighbor issues. Use when the user requests to 'design fair scheduling' or 'prevent noisy neighbors' or 'design resource quotas'.
module: bam
tags: [tenant, scheduling, fairness]
---

# Tenant Fair Scheduling

## Overview

This workflow designs fair resource scheduling mechanisms to prevent noisy neighbor issues in multi-tenant environments. It covers compute, memory, and I/O resource analysis, scheduling algorithms (weighted fair queue, token bucket), per-tenant quota enforcement, isolation mechanisms (cgroups, namespaces, resource limits), and noisy neighbor detection with alerting.

Act as a Platform Architect designing reliable tenant resource fairness and isolation.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing resource fairness for multi-tenant platforms
- Preventing noisy neighbor problems
- Implementing per-tenant quota enforcement
- Configuring container/VM resource isolation

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Tenant model defined (QG-M2 tenant isolation)
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/tenant-fair-scheduling.md`
- Resource quota configuration
- Noisy neighbor detection rules

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Prerequisite for tenant isolation strategy
- `bmad-bam-tenant-capacity-planning` - Capacity forecasting and resource planning
- `bmad-bam-rate-limiting-design` - Per-tenant rate limiting with tier-based quotas
- `bmad-bam-auto-scaling-configuration` - Auto-scaling for multi-tenant workloads

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation and resource fairness |
| **QG-I2** | Contributes | Tenant safety during resource contention |
| **QG-P1** | Contributes | Production-ready scheduling procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must be defined
- **Exit Gate:** QG-I2 (Tenant Safety) - Scheduling must prevent tenant interference

## References

- Template: `bam/templates/fair-scheduling-template.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Scaling Patterns: `bam/knowledge/scaling-patterns.md`
