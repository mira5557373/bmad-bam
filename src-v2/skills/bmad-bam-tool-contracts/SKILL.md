---
name: bmad-bam-tool-contracts
description: 'Define agent tool contracts'
module: bam
tags: [workflow]
---

# Tool Contracts

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize tool contract design by loading the AI runtime configuration, agent definitions, and establishing the scope of tools to be defined. This step gathers all context required for designing tenant-aware tool contracts that integrate with the agent orchestration framework. 

## Prerequisites


- Module architecture complete (QG-M1 passed)
- AI runtime selected in master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: `{ai_runtime}`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

## Outputs


- **Primary:** `{output_folder}/planning-artifacts/tool-contracts-design.md`
- Verification checklist for QG-M3
- Tool catalog summary
- Permission matrix

## Related Workflows

- `bmad-bam-agent-runtime`
- `bmad-bam-convergence`
- `bmad-bam-facade-contract`
- `bmad-bam-module-architecture`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
