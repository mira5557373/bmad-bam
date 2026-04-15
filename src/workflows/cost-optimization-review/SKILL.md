---
name: cost-optimization-review
displayName: Cost Optimization Review
description: Execute cost optimization reviews for multi-tenant AI platform. Use when the user requests to 'review costs' or 'optimize costs'.
module: bam
tags: [operations, cost, optimization]
---

# Cost Optimization Review

## Overview

This workflow executes cost optimization reviews for multi-tenant AI platforms. It covers cost baseline establishment, optimization opportunity identification, tenant cost attribution verification, and budget alert configuration. Produces cost reports and optimization recommendations.

Act as a FinOps Engineer specializing in multi-tenant SaaS platform cost optimization with AI workload considerations.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Conducting periodic cost optimization reviews
- Identifying cost reduction opportunities
- Verifying tenant cost attribution accuracy
- Configuring budget alerts and thresholds

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new cost optimization review | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing review | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify review completeness | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Cost Baseline Establishment
- Current cost breakdown by category
- Historical cost trends
- Unit economics calculation
- AI-specific cost baseline

### Step 2: Optimization Opportunity Identification
- Resource rightsizing opportunities
- Reserved capacity savings
- AI cost optimization
- Architectural optimization

### Step 3: Tenant Cost Attribution Verification
- Per-tenant cost accuracy
- Cost allocation methodology
- Profitability analysis
- Free tier cost management

### Step 4: Budget Alert Configuration
- Budget thresholds by category
- Alert routing
- Anomaly detection
- Forecasting setup

### Quality Gates

- [ ] Cost baseline established
- [ ] Optimization opportunities identified
- [ ] Tenant cost attribution verified
- [ ] Budget alerts configured

## Quality Gates

This workflow contributes to:
- **QG-CS1** (Cost Optimization Gate) - Validates cost optimization completeness
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- Cost data accessible
- Billing data available

### Exit Gate
- QG-CS1 checklist items verified
- Cost optimization report generated
- Recommendations documented

## Output

- `{output_folder}/operations/cost/cost-optimization-review-{date}.md`
- `{output_folder}/operations/cost/optimization-recommendations-{date}.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/cost-optimization-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/cost-optimization-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
