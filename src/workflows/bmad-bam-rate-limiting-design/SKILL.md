---
name: bmad-bam-rate-limiting-design
displayName: Rate Limiting Design
description: Design per-tenant rate limiting with tier-based quotas, token bucket algorithms, and monitoring. Use when designing API rate limits or traffic management.
module: bam
tags: [operations, security]
---

# Rate Limiting Design

## Overview

This workflow designs the per-tenant rate limiting strategy, covering algorithm selection (token bucket, sliding window, fixed window), tier-based limits, burst handling, enforcement mechanisms, and monitoring integration. It addresses API throttling, quota management, and graceful degradation for multi-tenant SaaS platforms.

Act as a Platform Architect designing reliable rate limiting infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing API rate limiting strategy
- Creating tier-based quota enforcement
- Building traffic management infrastructure

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Define Rate Limit Strategy

Define the rate limiting algorithm and strategy:

- Token bucket for burst handling
- Sliding window for smooth distribution
- Fixed window for simple implementation
- Adaptive for dynamic adjustment

### Step 2: Configure Tier Limits

Configure rate limits per tenant tier:

| Tier | Requests/min | Burst | Daily Quota |
|------|--------------|-------|-------------|
| Free | 60 | 10 | 10,000 |
| Pro | 600 | 100 | 100,000 |
| Enterprise | 6000 | 1000 | Unlimited |

### Step 3: Design Enforcement

Design enforcement mechanisms:

- API Gateway integration
- Distributed rate limiting
- Graceful degradation
- Quota synchronization

### Step 4: Design Monitoring

Design monitoring and alerting:

- Rate limit metrics
- Quota consumption tracking
- Abuse detection
- Dashboard integration

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-P1** | Contributes | Production-ready rate limiting infrastructure |
| **QG-M2** | Contributes | Tenant isolation through rate limiting |
| **QG-I2** | Contributes | Tenant safety through quota enforcement |

- **Entry Gate:** Tenant model must be defined
- **Exit Gate:** QG-P1 - Rate limiting must be production-ready

### Verification Checklist

- [ ] Rate limiting algorithm selected
- [ ] Tier-based limits configured
- [ ] Enforcement mechanisms designed
- [ ] Monitoring integrated

## Output

- `{output_folder}/planning-artifacts/operations/rate-limiting-runbook.md`
- Rate limiting configuration
- Monitoring dashboard specification

## References

- Template: `{project-root}/_bmad/bam/data/templates/rate-limiting-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- API Gateway Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/api-gateway-patterns.md`
