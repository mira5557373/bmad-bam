---
name: bmad-bam-capacity-planning-review
displayName: Capacity Planning Review
description: Execute capacity planning reviews for growth and scaling. Use when the user requests to 'review capacity' or 'plan capacity'.
module: bam
tags: [operations, capacity, planning]
---

# Capacity Planning Review

## Overview

This workflow executes capacity planning reviews for multi-tenant AI platforms. It covers capacity baseline establishment, growth projection, scaling threshold definition, and resource allocation verification. Produces capacity plans and scaling recommendations.

Act as a Capacity Planning Engineer specializing in multi-tenant SaaS platform growth with AI workload considerations.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Conducting periodic capacity planning reviews
- Preparing for expected growth or scaling events
- Defining scaling thresholds and triggers
- Verifying resource allocation across tenant tiers

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new capacity planning review | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing plan | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify plan completeness | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Capacity Baseline Establishment
- Current resource inventory
- Utilization baseline metrics
- Historical usage patterns
- AI capacity baseline

### Step 2: Growth Projection
- Tenant growth projection
- Usage growth projection
- AI demand projection
- Seasonal adjustments

### Step 3: Scaling Threshold Definition
- Auto-scaling trigger thresholds
- Manual scaling triggers
- Cost-based limits
- Performance-based limits

### Step 4: Resource Allocation Verification
- Per-tier resource allocation review
- Quota verification
- Fair share validation
- AI resource allocation

### Quality Gates

- [ ] Baselines established with metrics
- [ ] Growth projections documented
- [ ] Scaling thresholds defined
- [ ] Resource allocation verified

## Quality Gates

This workflow contributes to:
- **QG-CP1** (Capacity Planning Gate) - Validates capacity planning completeness
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- Current resource inventory available
- Historical usage data accessible

### Exit Gate
- QG-CP1 checklist items verified
- Capacity plan documented
- Scaling recommendations generated

## Output

- `{output_folder}/operations/capacity/capacity-plan-{date}.md`
- `{output_folder}/operations/capacity/scaling-recommendations-{date}.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/capacity-planning-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/capacity-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
