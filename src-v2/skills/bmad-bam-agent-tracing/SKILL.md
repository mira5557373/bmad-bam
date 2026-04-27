---
name: bmad-bam-agent-tracing
description: 'Implement agent execution tracing'
module: bam
tags: [workflow]
---

# Agent Tracing

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Overview

 Initialize the agent tracing design workflow by loading AI runtime configuration and identifying trace dimensions for comprehensive agent observability. 

## Prerequisites


- Master architecture document exists
- Agent runtime architecture defined
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `distributed-tracing`, `llm-observability`, `observability`

## Outputs


- `agent-tracing-design.md` - Complete specification
- Ready for QG-M3 validation (agent runtime component)

## Related Workflows

- `bmad-bam-tenant-aware-observability`

## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
