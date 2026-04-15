---
name: bmad-bam-auto-scaling-configuration
displayName: Auto-Scaling Configuration
description: Design auto-scaling for multi-tenant workloads. Use when the user requests to 'design auto-scaling' or 'configure scaling policies'.
module: bam
tags: [infrastructure, operations]
---

# Auto-Scaling Configuration

## Overview

This workflow designs auto-scaling policies for multi-tenant workloads, ensuring fair resource allocation across tenants while maintaining cost efficiency. It covers scaling metrics, policy design, tenant fairness mechanisms, and cost controls.

Act as a Platform Architect designing scalable multi-tenant infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing auto-scaling for multi-tenant workloads
- Configuring scaling policies per tier
- Implementing tenant fairness in scaling
- Setting up cost controls for scaling

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Scaling Metrics

Define metrics for scaling decisions:

| Metric | Target | Scale Up | Scale Down |
|--------|--------|----------|------------|
| CPU Utilization | 70% | >80% for 3m | <50% for 10m |
| Memory Utilization | 75% | >85% for 3m | <60% for 10m |
| Request Queue Depth | <100 | >200 for 1m | <50 for 5m |
| AI Token Queue | <1000 | >2000 for 2m | <500 for 5m |

### Step 2: Policy Design

Configure scaling policies per workload type:

1. Web application tier scaling
2. API worker scaling
3. AI inference scaling
4. Background job scaling
5. Database read replica scaling

### Step 3: Tenant Fairness

Implement fairness mechanisms:

- Per-tenant resource quotas
- Burst capacity allocation
- Priority queuing for paid tiers
- Noisy neighbor detection and mitigation

**Soft Gate:** Steps 1-3 complete the scaling policy design. Present a summary of metrics and policies. Ask for confirmation before proceeding to cost controls.

### Step 4: Cost Controls

Define cost optimization strategies:

- Spot instance integration
- Reserved capacity planning
- Scale-to-zero for idle tenants
- Budget alerts and hard limits

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-P1** | Contributes | Production readiness for scaling |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-P1 (Production Readiness) - Scaling must be production-ready

### Verification Checklist

- [ ] Scaling metrics defined
- [ ] Policies configured per workload
- [ ] Tenant fairness mechanisms implemented
- [ ] Cost controls specified
- [ ] Alert thresholds configured

## Output

- `{output_folder}/planning-artifacts/infrastructure/auto-scaling-configuration.md`
- Scaling policy matrix
- Cost optimization runbook

## References

- Template: `{project-root}/_bmad/bam/data/templates/infrastructure-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
