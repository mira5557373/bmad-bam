# Data Reconciliation DR - Instructions

## Purpose

Design data reconciliation capabilities following disaster recovery incidents, covering data integrity validation procedures, conflict resolution rules, AI context restoration, and tenant verification for multi-tenant SaaS platforms.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-define-reconciliation-scope.md`
2. Design verification procedures via `step-02-c-*`
3. Configure automated checks via `step-03-c-*`
4. Design remediation via `step-04-c-*`
5. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`

## Quality Gates

- Reference: `qg-p1-production-readiness.md`
- Contributes to QG-DR1 (Disaster Recovery Drill), QG-P1 (Production)

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR design defines what data needs reconciliation
- `bmad-bam-tenant-data-migration` - Migration procedures may use reconciliation checks
- `bmad-bam-tenant-model-isolation` - Isolation model affects reconciliation verification
- `bmad-bam-cross-region-failover-execution` - Failover triggers reconciliation
