# Quality Metrics Dashboard Instructions

## Purpose

Design and configure quality metrics dashboards for monitoring multi-tenant SaaS platform quality, providing visibility into quality gates, test coverage, and compliance status.

## Mode Detection

1. Check for existing dashboard spec at `{output_folder}/quality-artifacts/quality-dashboard-spec.md`
2. If exists: Offer Edit or Validate mode
3. If not exists: Default to Create mode

## Execution Flow

1. Load project context from `{project-root}/**/project-context.md`
2. Load quality gates guide from `{project-root}/_bmad/bam/data/agent-guides/bam/quality-gates.md`
3. Execute steps in selected mode
4. Generate output to `{output_folder}/quality-artifacts/quality-dashboard-spec.md`
5. Verify dashboard configuration completeness

## Quality Gate Integration

This workflow directly supports:
- **QG-AI2**: AI observability metrics
- **QG-OC**: Continuous operations monitoring
- **QG-P1**: Production readiness visibility
