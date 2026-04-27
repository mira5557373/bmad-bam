---
name: bmad-bam-module-epics
description: 'Create module epics and stories'
module: bam
tags: [workflow]
---

# Module Epics

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the module epic creation workflow by loading the module architecture, understanding module boundaries, and identifying epic categories (core, integration, infrastructure) for multi-tenant SaaS development. 

## Prerequisites


- Module architecture document exists (QG-M1 passed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: epic-*
- **Load patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv` → filter: module-epics
- Master architecture available for cross-module context

## Outputs


- **Epic Document:** `{output_folder}/planning-artifacts/modules/{module}/epics.md`

## Related Workflows

- `bmad-bam-convergence`
- `bmad-bam-module-architecture`
- `bmad-bam-cross-module-story`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
