---
name: bmad-bam-ai-fallback-chains
displayName: AI Fallback Chains
description: Design multi-provider fallback with quality thresholds. Use when the user requests to 'design AI fallbacks' or 'create provider failover'.
module: bam
tags: [ai-operations, resilience]
---

# AI Fallback Chains

## Overview

This workflow defines multi-provider fallback chain architecture with quality thresholds, automatic failover, and graceful degradation. It produces the resilience layer that ensures AI availability across provider outages.

Act as an AI Reliability Architect specializing in multi-provider LLM resilience for multi-tenant platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Implementing multi-provider AI resilience
- Designing quality-based model selection
- Establishing automatic failover logic
- Configuring per-tenant provider preferences

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new fallback architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing fallback chains | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against resilience criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Provider Catalog Design

Design provider registry:
- Provider capabilities matrix
- Model equivalence mapping
- SLA requirements per provider
- Cost comparison

### Step 2: Quality Threshold Configuration

Design quality thresholds:
- Response quality metrics
- Latency thresholds
- Error rate limits
- Degradation triggers

### Step 3: Failover Logic Design

Design failover mechanisms:
- Circuit breaker patterns
- Retry strategies
- Provider selection algorithms
- Health check design

### Step 4: Tenant Configuration Design

Design tenant-level controls:
- Provider preferences
- Quality requirements
- Cost constraints
- Fallback restrictions

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime Gate) - Validates fallback chains within agent runtime

- [ ] Provider catalog designed
- [ ] Quality thresholds configured
- [ ] Failover logic defined
- [ ] Tenant configuration designed
- [ ] Per-tenant isolation verified

## Output

- `{output_folder}/planning-artifacts/architecture/ai-fallback-chains-design.md`

## Web Research

This workflow uses web search to verify current best practices:
- `Search the web:` directives for pattern verification
- Source citations: `_Source: [URL]_`
