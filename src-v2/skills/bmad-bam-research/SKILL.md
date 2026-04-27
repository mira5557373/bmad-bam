---
name: bmad-bam-research
description: 'Research best practices and patterns'
module: bam
tags: [workflow]
---

# Research

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the technology research scope by loading architecture constraints, identifying research areas, and establishing evaluation criteria for frameworks, services, and patterns. 

## Prerequisites


- Master architecture exists or architecture constraints defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` (if AI/ML research)
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` (if tenant technology research)

## Outputs


- Complete research report: `{output_folder}/planning-artifacts/research-report.md`
- ADR (optional): `{output_folder}/planning-artifacts/decisions/{topic}-adr.md`

## Related Workflows

- `bmad-bam-master-architecture`
- `bmad-bam-module-architecture`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
