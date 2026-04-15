# Development Trigger - Instructions

## Purpose

Event trigger workflow that initiates development gates, serving as an entry/exit point for QG-DEV1 (Pre-Commit Validation), code change events, and code review events.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| Dev event triggered | Create | `step-01-c-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-*` to handle development event
2. Evaluate applicable quality gates
3. Trigger gate evaluation

## Quality Gates

- Reference: `qg-dev1-pre-commit.md` (if available)
- Initiates QG-DEV1 (Pre-Commit Validation)

## Related Workflows

- Pre-commit hooks
- CI/CD pipeline stages
- `bmad-bam-cicd-pipeline-design` - CI/CD pipeline design
- `bmad-bam-continuous-security-setup` - Security checks in CI/CD
