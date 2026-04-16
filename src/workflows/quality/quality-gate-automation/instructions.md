# Quality Gate Automation Instructions

## Purpose

Design and implement automated quality gate validation integrated with CI/CD pipelines, ensuring quality gates are enforced automatically during the software delivery process.

## Mode Detection

1. Check for existing automation spec at `{output_folder}/quality-artifacts/gate-automation-spec.md`
2. If exists: Offer Edit or Validate mode
3. If not exists: Default to Create mode

## Execution Flow

1. Load project context from `{project-root}/**/project-context.md`
2. Load quality gates guide from `{project-root}/_bmad/bam/data/agent-guides/bam/quality-gates.md`
3. Execute steps in selected mode
4. Generate output to `{output_folder}/quality-artifacts/gate-automation-spec.md`
5. Verify CI/CD integration points

## Quality Gate Integration

This workflow directly supports:
- **QG-P1**: Production readiness automation
- **QG-TC1**: Test coverage enforcement
- **QG-TC2**: Integration test automation
- **QG-TC3**: E2E test automation
