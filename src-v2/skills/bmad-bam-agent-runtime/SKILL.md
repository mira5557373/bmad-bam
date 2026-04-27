---
name: bmad-bam-agent-runtime
description: 'Design AI agent runtime architecture'
module: bam
tags: [quality-gate, workflow]
---

# Agent Runtime

## Modes

| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-05-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Quality Gate

**Gate:** QG-M3

## Overview



## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has clarity on AI capabilities needed in the platform
- [ ] Understanding of agent-to-user interaction patterns

## Outputs


- Complete agent runtime architecture document
- **Output to:** `{output_folder}/planning-artifacts/agent-runtime.md`

## Related Workflows

- `bmad-bam-ai-agent-debug`
- `bmad-bam-convergence-verification`
- `bmad-bam-create-module-architecture`
- `bmad-bam-validate-foundation`
- `bmad-bam-validate-module`

## Domain References

- `{project-root}/_bmad/bam/data/agent-guides/bam/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
