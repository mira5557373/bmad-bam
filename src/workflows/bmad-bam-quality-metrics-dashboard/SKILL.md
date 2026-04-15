---
name: bmad-bam-quality-metrics-dashboard
displayName: Quality Metrics Dashboard
description: 'Design quality metrics dashboard for multi-tenant SaaS monitoring'
module: bam
web_bundle: false
tags: [quality, phase-5, metrics, dashboard]
---

# Quality Metrics Dashboard

## Overview

This workflow designs and configures quality metrics dashboards for monitoring multi-tenant SaaS platform quality. It provides visibility into quality gates, test coverage, and compliance status.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design new dashboard | `step-01-c-*` to `step-05-c-*` |
| Edit | Update dashboard | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify dashboard | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Quality gates defined
- Metrics collection infrastructure
- **Config required:** `test_architecture`

## Outputs

- `quality-dashboard-spec.md` in `{output_folder}/quality-artifacts/`
- Dashboard configuration files

## Related Workflows

- `bmad-bam-quality-assurance-review` - QA review workflow
- `bmad-bam-tenant-aware-observability` - Observability setup
