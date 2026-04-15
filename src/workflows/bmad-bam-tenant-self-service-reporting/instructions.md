# Tenant Self-Service Reporting - Instructions

## Purpose

Design a comprehensive tenant self-service reporting capability for a multi-tenant SaaS platform, defining report types per tier (Free/Pro/Enterprise), report builder interfaces, scheduling options, and export/delivery channels.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-define-report-types.md`
2. Design report builder via `step-02-c-*`
3. Configure scheduling via `step-03-c-*`
4. Design export formats via `step-04-c-*`
5. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`

## Quality Gates

- Reference: `production-readiness.md`
- Contributes to QG-P1 (Production), QG-I2 (Tenant Safety)

## Related Workflows

- `bmad-bam-create-master-architecture` - Master architecture defines data sources for reporting
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns affect report data access
- `bmad-bam-tenant-aware-observability` - Observability data may feed into tenant reports
- `bmad-bam-tenant-analytics-dashboard` - Dashboard design complements reporting
