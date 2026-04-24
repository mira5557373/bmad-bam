---
name: bmad-bam-ai-observability-setup
displayName: AI Observability Setup
description: Set up AI/LLM observability for multi-tenant platform. Use when the user requests to 'setup AI observability' or 'configure LLM monitoring'.
module: bam
tags: [operations, ai, observability]
---

# AI Observability Setup

## Overview

This workflow sets up AI/LLM observability for multi-tenant AI platforms. It covers LLM metrics collection setup, token usage tracking per tenant, latency monitoring configuration, cost per request calculation, and quality metrics definition. Produces observability configuration and dashboard documentation.

Act as an AI Platform Engineer specializing in LLM observability and multi-tenant AI workload monitoring.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Setting up AI/LLM observability infrastructure
- Configuring per-tenant token usage tracking
- Establishing AI latency monitoring
- Defining AI quality metrics and SLOs

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Set up new AI observability | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing setup | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify setup completeness | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: LLM Metrics Collection Setup
- Trace collection configuration
- Prompt/completion logging
- Model metadata capture
- Per-tenant attribution

### Step 2: Token Usage Tracking Per Tenant
- Token counting implementation
- Per-tenant aggregation
- Budget enforcement hooks
- Usage reporting

### Step 3: Latency Monitoring Configuration
- End-to-end latency tracking
- Per-model latency
- Queue time monitoring
- SLO configuration

### Step 4: Cost Per Request Calculation
- Model cost configuration
- Per-request cost attribution
- Tenant cost aggregation
- Cost anomaly detection

### Step 5: Quality Metrics Definition
- Accuracy metrics
- Relevance scoring
- Safety metrics
- User satisfaction tracking

### Quality Gates

- [ ] LLM metrics collection active
- [ ] Token tracking per tenant
- [ ] Latency monitoring configured
- [ ] Cost calculation implemented
- [ ] Quality metrics defined

## Quality Gates

This workflow contributes to:
- **QG-AI2** (AI Observability Gate) - Validates AI observability setup
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- AI runtime architecture defined
- Monitoring infrastructure in place

### Exit Gate
- QG-AI2 checklist items verified
- AI observability configured
- Dashboards created

## Output

- `{output_folder}/operations/ai/ai-observability-config.md`
- `{output_folder}/operations/ai/ai-dashboards.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/ai-observability-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/ai-observability-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
