# Agent Execution Tracing Instructions

## Purpose

Design comprehensive agent execution tracing for multi-tenant AI platforms including trace hierarchy, span definitions, platform integration, and debugging workflows.

## Mode Detection

1. Check for existing tracing config at `{output_folder}/operations/ai/agent-tracing-config.md`
2. If exists: Offer Edit or Validate mode
3. If not exists: Default to Create mode

## Execution Flow

1. Load project context from `{project-root}/**/project-context.md`
2. Load agent tracing guide from `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`
3. Execute steps in selected mode
4. Generate output using `{project-root}/_bmad/bam/data/templates/agent-execution-trace-template.md`
5. Verify against QG-AI2 criteria

## Quality Gate Integration

This workflow directly supports:
- **QG-AI2**: Agent tracing requirements
- **QG-P1**: Production debugging capability
