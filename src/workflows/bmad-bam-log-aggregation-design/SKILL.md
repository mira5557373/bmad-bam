---
name: bmad-bam-log-aggregation-design
displayName: Log Aggregation Design
description: 'Design centralized log aggregation with tenant isolation'
module: bam
tags: [operations, logging, observability]
---

# Log Aggregation Design

## Overview

This workflow designs centralized log aggregation for multi-tenant platforms. It covers log collection, tenant isolation, retention policies, and search/analysis capabilities.

Act as an observability engineer specializing in log management for multi-tenant SaaS.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing centralized logging
- Implementing tenant-isolated log access
- Establishing log retention policies
- Building log search and analysis

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new log aggregation design | `step-01-c-*` to `step-03-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture defined
- Tenant-aware observability design
- **Config required:** `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/operations/log-aggregation-design.md`
- `{output_folder}/planning-artifacts/operations/log-retention-policy.md`

## Quality Gates

This workflow contributes to:
- **QG-P1** (Production) - Logging required for production debugging

### Entry Gate
- QG-F1 (Foundation) must pass
- Observability design exists

### Exit Gate
- Log aggregation defined
- Retention policies documented

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability foundation
- `bmad-bam-tenant-audit-log-design` - Audit logging
- `bmad-bam-data-retention-policy-design` - Retention compliance
