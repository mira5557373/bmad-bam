---
name: bmad-bam-triage
description: 'Triage module complexity and dependencies'
module: bam
tags: [workflow]
---

# Triage

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the module complexity triage process by loading all project requirements, module catalog, and triage patterns. Establish the complexity dimensions (technical, business, integration, multi-tenant, AI) that will be used to score and prioritize modules. 

## Prerequisites


- Requirements document exists (PRD, epics, or requirement-ingestion output)
- Module catalog identified (either from create-master-architecture or requirement analysis)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: triage
- **Load patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv` → filter: planning

## Outputs


- Triage report: `{output_folder}/planning-artifacts/triage-report.md`
- Executive summary
- Implementation roadmap
- Risk assessment

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-requirements`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
