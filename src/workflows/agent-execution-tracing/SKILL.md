---
name: agent-execution-tracing
displayName: Agent Execution Tracing
description: Design agent execution tracing for multi-tenant platform. Use when the user requests to 'setup agent tracing' or 'configure LLM traces'.
module: bam
tags: [operations, ai, observability, tracing]
---

# Agent Execution Tracing

## Overview

This workflow designs comprehensive agent execution tracing for multi-tenant AI platforms. It covers trace hierarchy design, span definitions, OpenTelemetry/Langfuse integration, sampling strategies, and debugging workflows. Produces agent tracing configuration and debugging documentation.

Act as an AI Platform Engineer specializing in distributed tracing and LLM observability.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Setting up agent execution tracing
- Configuring OpenTelemetry for AI agents
- Integrating Langfuse or LangSmith
- Designing sampling strategies per tenant tier
- Creating debugging workflows for agent issues

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design new agent tracing | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify design completeness | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Trace Hierarchy Design
- Session → Turn → Agent → LLM/Tool spans
- Span relationship definitions
- Context propagation strategy

### Step 2: Span Attribute Definitions
- Session span attributes
- Agent span attributes
- LLM call span attributes
- Tool execution span attributes
- Memory operation span attributes

### Step 3: Platform Integration
- OpenTelemetry configuration
- Langfuse/LangSmith setup
- Exporter configuration
- Tenant context in spans

### Step 4: Sampling Strategy Design
- Per-tier sampling rates
- Adaptive sampling rules
- Privacy-aware capture
- Cost optimization

### Step 5: Debugging Workflow Design
- Trace search capabilities
- Error drill-down workflows
- Latency analysis
- Cost attribution from traces

### Quality Gates

- [ ] Trace hierarchy defined
- [ ] Span attributes documented
- [ ] Platform integration configured
- [ ] Sampling strategy designed
- [ ] Debug workflows documented

## Quality Gates

This workflow contributes to:
- **QG-AI2** (AI Observability Gate) - Agent tracing requirements
- **QG-P1** (Production Readiness) - Debugging capability

### Entry Gate
- Agent runtime architecture defined
- Tracing platform selected

### Exit Gate
- QG-AI2 relevant items verified
- Tracing configured
- Debug runbooks created

## Output

- `{output_folder}/operations/ai/agent-tracing-config.md`
- `{output_folder}/operations/ai/agent-debug-runbook.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/agent-execution-trace-template.md`
- Guide: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
