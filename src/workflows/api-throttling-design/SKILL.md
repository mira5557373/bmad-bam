---
name: api-throttling-design
displayName: API Throttling Design
description: Design API throttling strategies with sliding window algorithms, per-endpoint limits, and adaptive throttling based on tenant tiers.
module: bam
tags: [operations, api]
---

# API Throttling Design

## Overview

This workflow designs API throttling strategies for multi-tenant SaaS platforms, covering traffic pattern analysis, throttling rule design, tier-based quotas, and burst handling. It addresses per-endpoint rate limits, sliding window algorithms, adaptive throttling, and graceful degradation during traffic spikes.

Act as a Platform Architect designing reliable API rate management systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing API rate limiting strategies
- Creating per-tenant throttling policies
- Building burst handling mechanisms
- Implementing tier-based quota enforcement

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Analyze Traffic Patterns

Analyze API traffic patterns to inform throttling design:

- Identify high-volume endpoints
- Map traffic patterns by tenant tier
- Detect burst characteristics
- Establish baseline request rates

### Step 2: Design Throttling Rules

Design throttling rules for each endpoint category:

| Endpoint Category | Algorithm | Limit | Window |
|-------------------|-----------|-------|--------|
| Public APIs | Sliding Window | Tier-based | 1 minute |
| Internal APIs | Token Bucket | Higher limits | Per-second |
| Webhooks | Fixed Window | Per-tenant | 1 hour |
| Agent APIs | Adaptive | Budget-based | Session |

### Step 3: Configure Tier Quotas

Define quota configurations per tenant tier:

| Tier | Requests/min | Daily Limit | Burst Allowance |
|------|--------------|-------------|-----------------|
| Free | 60 | 10,000 | 1.5x for 10s |
| Pro | 300 | 100,000 | 2x for 30s |
| Enterprise | 1000 | Unlimited | 3x for 60s |

**Soft Gate:** Steps 1-3 complete the throttling rules and tier quotas. Present a summary of limits and algorithms. Ask for confirmation before proceeding to burst handling.

### Step 4: Design Burst Handling

Design burst handling and graceful degradation:

- Burst detection algorithms
- Graceful degradation strategies
- Client notification (429 responses with Retry-After)
- Queue-based request buffering (optional)

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation in rate limiting |
| **QG-I2** | Contributes | Tenant safety during throttling |
| **QG-P1** | Contributes | Production-ready throttling configuration |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant routing must be defined
- **Exit Gate:** QG-I2 (Tenant Safety) - Throttling must not cause data loss

### Verification Checklist

- [ ] Traffic patterns analyzed
- [ ] Throttling algorithms selected
- [ ] Tier quotas defined
- [ ] Burst handling designed
- [ ] Graceful degradation specified

## Output

- `{output_folder}/planning-artifacts/operations/api-throttling-design.md`
- Throttling rules matrix
- Tier quota configuration

## References

- Template: `{project-root}/_bmad/bam/data/templates/api-throttling-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Rate Limiting Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`, `api-throttling`
