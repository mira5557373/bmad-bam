---
name: bmad-bam-scaling
description: 'Design multi-tenant scaling patterns'
module: bam
tags: [workflow]
---

# Scaling

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the scaling design workflow by loading the tenant model, identifying compute requirements, and establishing the scaling dimensions that will drive the architecture. 

## Prerequisites


- Master architecture document exists: `{output_folder}/planning-artifacts/master-architecture.md`
- Tenant model selected (row-level-security, schema-per-tenant, or database-per-tenant)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scaling-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

**Web Research (Required):**

Search the web: "multi-tenant SaaS scaling patterns cloud-native {date}"
Search the web: "horizontal vs vertical scaling decision criteria {date}"

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/scaling-design.md`
- Capacity planning guidelines
- Cost optimization strategies
- Operational runbooks
- Complete scaling design document

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
