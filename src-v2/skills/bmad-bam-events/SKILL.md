---
name: bmad-bam-events
description: 'Design event-driven architecture'
module: bam
tags: [workflow]
---

# Events

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the event-driven architecture design workflow by loading tenant model configuration, AI runtime settings, and event patterns from the pattern registry. This step establishes the context for designing tenant-aware event systems. 

## Prerequisites


- Master architecture document exists with tenant model selection
- AI runtime configuration defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

## Outputs


- `{output_folder}/planning-artifacts/event-architecture.md`
- Implementation roadmap
- Risk assessment matrix
- Quality gate alignment matrix
- **Load template:** `{project-root}/_bmad/bam/data/templates/event-architecture.md`

## Related Workflows

- `bmad-bam-convergence-verification`
- `bmad-bam-facade-contract`
- `bmad-bam-observability`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
