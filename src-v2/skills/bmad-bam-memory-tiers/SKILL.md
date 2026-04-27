---
name: bmad-bam-memory-tiers
description: 'Design agent memory tier system'
module: bam
tags: [workflow]
---

# Memory Tiers

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the memory tier design by loading the AI runtime configuration, identifying memory requirements for the agent workloads, and establishing the foundation for a secure, multi-tenant memory architecture. 

## Prerequisites


- Master architecture with AI runtime defined
- Tenant isolation strategy documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: memory-tiers
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load template:** `{project-root}/_bmad/bam/data/templates/memory-tier.md`

## Outputs


- Complete memory tier design document
- **Output to:** `{output_folder}/planning-artifacts/ai/memory-tiers-design.md`

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
