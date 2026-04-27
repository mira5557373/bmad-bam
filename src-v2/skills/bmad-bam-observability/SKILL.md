---
name: bmad-bam-observability
description: 'Design tenant-aware observability'
module: bam
tags: [workflow]
---

# Observability

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize tenant-aware observability design by loading context, understanding tenant isolation requirements, and identifying the three observability pillars (metrics, logs, traces) that will form the foundation of the design. 

## Prerequisites


- Tenant model defined (RLS, schema-per-tenant, or database-per-tenant)
- Master architecture document exists (recommended)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Outputs


- Complete observability design document
- Dashboard specifications
- Alert rules configuration
- SLO definitions
- **Output to:** `{output_folder}/planning-artifacts/observability-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/observability-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/runbook.md`

## Related Workflows

- `bmad-bam-agent-execution-tracing`
- `bmad-bam-slo-definition`
- `bmad-bam-tenant-cost-attribution`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
