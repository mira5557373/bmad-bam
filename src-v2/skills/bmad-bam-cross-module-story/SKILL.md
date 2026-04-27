---
name: bmad-bam-cross-module-story
description: 'Create cross-module user stories'
module: bam
tags: [workflow]
---

# Cross-Module Story

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the cross-module story coordination workflow by loading module architectures, facade contracts, and identifying cross-cutting user journeys that span multiple modules. 

## Prerequisites


- Feature request or user journey requiring multiple modules
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-context-propagation

## Outputs


- `{output_folder}/planning-artifacts/cross-module-stories.md` - Main epic document
- `{output_folder}/planning-artifacts/stories/dependency-graph.md` - Dependency visualization
- `{output_folder}/planning-artifacts/stories/module-stories/*.md` - Per-module story files
- `{output_folder}/planning-artifacts/stories/integration-tests.md` - Integration test plan

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
