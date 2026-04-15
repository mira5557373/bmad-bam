# Monthly Operations Trigger - Instructions

## Purpose

Scheduled event trigger workflow that initiates monthly operational reviews, serving as an entry point for QG-CS1 (Cost Optimization), monthly compliance checks, and budget reviews.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| Monthly cycle triggered | Create | `step-01-c-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-*` to initialize monthly review cycle
2. Initiate cost review
3. Trigger related workflow executions

## Quality Gates

- Reference: `qg-operations-continuous.md`
- Initiates QG-CS1 (Cost Optimization)

## Related Workflows

- `bmad-bam-cost-optimization-review` - Cost optimization execution
- `bmad-bam-capacity-planning-review` - Monthly capacity review
- `bmad-bam-compliance-verification` - Monthly compliance checks
- `bmad-bam-quarterly-operations-trigger` - Quarterly trigger coordination
