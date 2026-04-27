---
name: bmad-bam-agent-debug
description: 'Debug AI agent issues'
module: bam
tags: [workflow]
---

# Agent Debug

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the AI agent debug session by loading runtime configuration, execution traces, and identifying debug scope. 

## Prerequisites


- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

## Outputs


- Root cause summary with severity assessments
- Prioritized remediation recommendations
- Monitoring improvement plan
- Complete agent debug report
- **Output to:** `{output_folder}/planning-artifacts/agent-debug-report.md`

## Related Workflows



## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
