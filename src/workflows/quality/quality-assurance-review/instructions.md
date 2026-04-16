# Quality Assurance Review Instructions

## Purpose

Perform comprehensive quality assurance review for multi-tenant SaaS platforms, consolidating quality verification activities that span tenant isolation, integration testing, and compliance requirements.

## Mode Detection

1. Check for existing QA review at `{output_folder}/quality-artifacts/qa-review-report.md`
2. If exists: Offer Edit or Validate mode
3. If not exists: Default to Create mode

## Execution Flow

1. Load project context from `{project-root}/**/project-context.md`
2. Load quality gates guide from `{project-root}/_bmad/bam/data/agent-guides/bam/quality-gates.md`
3. Execute steps in selected mode
4. Generate output using `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
5. Verify against QG-F1 through QG-P1 criteria

## Quality Gate Integration

This workflow directly supports:
- **QG-F1**: Foundation validation
- **QG-M1**: Module architecture validation
- **QG-M2**: Tenant isolation validation
- **QG-M3**: Agent runtime validation
- **QG-I1**: Convergence verification
- **QG-I2**: Tenant safety verification
- **QG-I3**: Agent safety verification
- **QG-P1**: Production readiness validation
