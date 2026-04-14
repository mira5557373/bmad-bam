---
name: performance-review-execution
displayName: Performance Review Execution
description: Execute periodic performance reviews for multi-tenant AI platform. Use when the user requests to 'review performance' or 'execute performance review'.
module: bam
tags: [operations, performance, monitoring]
---

# Performance Review Execution

## Overview

This workflow executes periodic performance reviews for multi-tenant AI platforms. It covers baseline comparison, capacity assessment, SLA verification, tenant performance analysis, and cost efficiency review. Produces performance reports and optimization recommendations.

Act as a Performance Engineer specializing in multi-tenant SaaS platform optimization with AI workload considerations.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Conducting periodic performance reviews (weekly/monthly/quarterly)
- Assessing system capacity and scalability
- Verifying SLA compliance across tenant tiers
- Analyzing tenant performance patterns
- Evaluating cost efficiency

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new performance review | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing review | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify review completeness | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Baseline Comparison

- Load historical performance baselines
- Compare current metrics against baselines
- Identify significant deviations
- Trend analysis

### Step 2: Capacity Assessment

- Current resource utilization analysis
- Peak load assessment
- Headroom calculation
- Scaling readiness evaluation

### Step 3: SLA Verification

- Availability SLA compliance check
- Latency SLA compliance check
- Error rate SLA compliance check
- Per-tier SLA analysis

**Soft Gate:** Steps 1-3 complete the technical performance assessment. Present a summary. Ask for confirmation before proceeding to tenant analysis.

### Step 4: Tenant Performance Analysis

- Per-tenant resource consumption
- Noisy neighbor detection
- Usage pattern analysis
- Tenant health scoring

### Step 5: Cost Efficiency Review

- Cost per request analysis
- AI model cost breakdown
- Infrastructure cost attribution
- Optimization opportunity identification

### Quality Gates

- [ ] Baselines compared and deviations documented
- [ ] Capacity utilization assessed
- [ ] SLA compliance verified per tier
- [ ] Tenant performance analyzed
- [ ] Cost efficiency evaluated

## Quality Gates

This workflow contributes to:
- **QG-PR1** (Performance Review Gate) - Validates performance review completeness
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- Performance monitoring in place
- Historical baselines available

### Exit Gate
- QG-PR1 checklist items verified
- Performance report generated
- Optimization recommendations documented

## Output

- `{output_folder}/operations/performance/performance-review-{date}.md`
- `{output_folder}/operations/performance/optimization-recommendations-{date}.md`

## References

- Template: `bam/templates/performance-review-template.md`
- Knowledge: `bam/knowledge/performance-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
