---
name: bmad-bam-ai-cost-tracking
displayName: AI Cost Tracking
description: Design per-tenant AI token and compute cost tracking. Use when the user requests to 'track AI costs' or 'design token metering'.
module: bam
tags: [ai-operations, cost-management]
---

# AI Cost Tracking

## Overview

This workflow defines the AI cost tracking architecture for per-tenant token usage, compute costs, and billing integration. It produces the cost attribution system that enables accurate AI usage billing. Run after agent-runtime-architecture, integrates with usage-metering-design.

Act as an AI FinOps Architect specializing in LLM cost attribution and multi-tenant billing systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml`.

## When to Use

- Implementing per-tenant AI cost tracking
- Designing token usage metering
- Establishing cost attribution for AI operations
- Integrating AI costs with billing systems

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new cost tracking architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing cost tracking | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against cost criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Token Usage Metering Design

Design token counting and metering:
- Input/output token counting
- Model-specific pricing
- Real-time vs batch metering
- Tenant attribution

### Step 2: Compute Cost Attribution

Design compute cost allocation:
- GPU/inference costs
- Embedding generation costs
- Vector search costs
- Storage costs

### Step 3: Cost Aggregation Pipeline

Design cost aggregation:
- Real-time cost streaming
- Daily/monthly rollups
- Cost allocation rules
- Multi-currency support

### Step 4: Billing Integration Design

Design billing system integration:
- Usage export formats
- Invoice generation
- Budget alerts
- Cost anomaly detection

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates cost tracking within agent runtime

- [ ] Token usage metering designed
- [ ] Compute cost attribution defined
- [ ] Cost aggregation pipeline specified
- [ ] Billing integration designed
- [ ] Per-tenant cost isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-cost-tracking-design.md`

## Web Research

This workflow uses web search to verify current best practices:
- `Search the web:` directives for pattern verification
- Source citations: `_Source: [URL]_`
