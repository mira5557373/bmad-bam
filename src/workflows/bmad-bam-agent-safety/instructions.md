# Agent Safety Validation - Instructions

## Purpose

Validate AI agent safety controls including guardrails, budget enforcement, and kill switch functionality. Required for QG-I3 (Agent Safety) gate passage.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-*`
2. Follow sequential steps through `step-05-c-*`
3. Output artifact to `{output_folder}/quality-gates/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`
3. Update `step-12-e-*` as needed

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`
4. Complete verification via `step-23-v-*`

## Quality Gates

- Reference: `qg-i3-agent-safety.md`
- Required for QG-I3 (Agent Safety) gate passage

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Safety evaluation criteria
- `bmad-bam-tenant-safety` - Tenant-level safety validation
- `bmad-bam-ai-security-testing` - Security testing for AI
- `bmad-bam-agent-runtime-architecture` - Agent runtime context
- `bmad-bam-ai-guardrails-implementation` - Guardrails implementation
