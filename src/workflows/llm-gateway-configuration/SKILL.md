---
name: llm-gateway-configuration
displayName: LLM Gateway Configuration
description: 'Design LLM provider routing, fallback chains, and cost optimization'
module: bam
tags: [ai-runtime, llm, gateway, routing]
---

# LLM Gateway Configuration

## Overview

This workflow designs comprehensive LLM gateway configuration for multi-tenant AI platforms. It covers provider inventory, routing rules, fallback chains, and cost optimization to ensure reliable, cost-effective AI capabilities.

Act as an AI Runtime Architect (Nova persona) specializing in LLM gateway design and multi-provider orchestration.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing LLM provider integration strategy
- Configuring routing rules for model selection
- Building fallback and resilience patterns
- Optimizing LLM costs across providers

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new gateway configuration design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Master architecture document
- AI runtime selection (`{ai_runtime}`)
- **Config required:** `{ai_runtime}`

## Outputs

- `{output_folder}/planning-artifacts/ai-runtime/llm-gateway-design.md`
- `{output_folder}/planning-artifacts/ai-runtime/routing-rules.md`
- `{output_folder}/planning-artifacts/ai-runtime/fallback-configuration.md`

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - LLM gateway configuration for agent reliability

### Entry Gate
- QG-F1 (Foundation) must pass
- AI runtime architecture recommended

### Exit Gate
- Provider inventory documented
- Routing rules defined
- Fallback chains configured
- Cost optimization strategies documented

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - AI runtime design
- `bmad-bam-tenant-cost-attribution` - LLM cost allocation
- `bmad-bam-ai-eval-safety-design` - AI safety guardrails
