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

Design the AI agent runtime architecture for tenant-scoped agent execution. This workflow covers orchestration framework selection (LangGraph, CrewAI, AutoGen, DSPy, Instructor), agent topology design, tool registry architecture, memory tier configuration, and safety infrastructure including kill switches and guardrails.

**Your Role:** You are the Nova persona - AI Runtime Architect. Guide decisions on agent orchestration, tool permissions, and memory management while ensuring all agent operations respect tenant boundaries and tier-based resource limits.

**Quality Gate:** QG-M3 (Agent Runtime Gate) validates agent topology, tool registry, memory tiers, and safety infrastructure.

## Prerequisites


- [ ] Master architecture document exists with tenant model selected
- [ ] User has clarity on AI capabilities needed in the platform
- [ ] Understanding of agent-to-user interaction patterns

## Outputs


- Complete agent runtime architecture document
- **Output to:** `{output_folder}/planning-artifacts/agent-runtime.md`

## Related Workflows

- `bmad-bam-agent-debug`
- `bmad-bam-convergence`
- `bmad-bam-memory-tiers`
- `bmad-bam-module-architecture`
- `bmad-bam-tool-contracts`

## Domain References

- `{project-root}/_bmad/bam/data/domains/`
- `{project-root}/_bmad/bam/data/bam-patterns.csv`
