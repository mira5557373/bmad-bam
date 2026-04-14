# AI Security Audit - Instructions

## Purpose

Execute comprehensive AI security audit covering model security, inference endpoint protection, prompt injection defenses, and data leakage prevention. Required for QG-S4 (AI Security Gate) passage.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-*`
2. Follow sequential steps through `step-06-c-*`
3. Output artifact to `{output_folder}/security/`

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

- Reference: `qg-security-continuous.md`
- Required for QG-S4 (AI Security Gate) passage

## Related Workflows

- `bmad-bam-ai-security-testing` - Security test execution
- `bmad-bam-ai-model-security` - Model-specific security
- `bmad-bam-agent-safety` - Agent safety validation
- `bmad-bam-agent-runtime-architecture` - Agent runtime context
