---
name: bmad-bam-requirements
description: 'Ingest and analyze project requirements'
module: bam
tags: [workflow]
---

# Requirements

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the requirements ingestion workflow by loading existing requirements documents, identifying requirement sources, and establishing the analysis framework. 

## Prerequisites


- Project context established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Outputs


- `{output_folder}/planning-artifacts/requirements-analysis.md` - Complete requirements document
- `{output_folder}/planning-artifacts/requirements-matrix.csv` - Tabular data
- `{output_folder}/planning-artifacts/traceability-matrix.csv` - Traceability data
- `{output_folder}/planning-artifacts/stakeholder-signoff.md` - Sign-off tracker

## Related Workflows

- `bmad-bam-create-master-architecture`

## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
