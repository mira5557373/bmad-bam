---
name: bmad-bam-ai-usage-analytics
displayName: AI Usage Analytics
description: 'Design AI-specific analytics including token usage, latency tracking, model performance, and cost attribution per tenant'
module: bam
tags: [analytics, ai, tokens, latency, llm]
---

# AI Usage Analytics

## Overview

This workflow designs comprehensive AI-specific analytics for multi-tenant platforms. It covers token usage tracking, latency analysis, model performance metrics, cost attribution, and AI quality indicators.

Act as an AI platform engineer specializing in LLM observability and cost management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing AI/LLM usage tracking systems
- Creating token consumption analytics
- Building latency monitoring for AI calls
- Setting up AI cost attribution per tenant

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new AI analytics design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Agent runtime architecture
- Usage metering design
- **Config required:** `{ai_runtime}`

## Outputs

- `{output_folder}/planning-artifacts/analytics/ai-usage-analytics-design.md`
- `{output_folder}/planning-artifacts/analytics/ai-metrics-schema.md`

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - AI observability
- **QG-P1** (Production) - AI monitoring required

### Entry Gate
- QG-F1 (Foundation) must pass
- Agent runtime architecture exists

### Exit Gate
- AI metrics defined
- Cost attribution documented

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - AI runtime foundation
- `bmad-bam-tenant-cost-attribution` - Cost allocation
- `bmad-bam-llm-evaluation-pipeline` - Quality metrics
