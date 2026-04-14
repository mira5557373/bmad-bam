# AI Model Deprecation - Instructions

## Purpose

Execute the complete deprecation lifecycle for AI models in a multi-tenant agentic platform, covering usage analysis, tenant impact assessment, migration planning, and safe decommissioning.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-assess-model-usage.md`
2. Follow sequential steps through `step-10-c-document-deprecation.md`
3. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`

## Quality Gates

- Reference: `qg-m3-agent-runtime.md`
- Contributes to QG-M3 (Agent Runtime), QG-I3 (Agent Safety), QG-P1 (Production Readiness)

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - AI runtime defines model integration patterns
- `bmad-bam-tenant-communication-design` - Communication templates for tenant notification
- `bmad-bam-tenant-data-migration` - Data migration may accompany model changes
- `bmad-bam-ai-fallback-chains` - Fallback routing implementation patterns
- `bmad-bam-incident-response-operations` - Handle migration issues
