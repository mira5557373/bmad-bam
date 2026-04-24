# Cross-Region Failover Execution - Instructions

## Purpose

Execute cross-region failover procedures during disaster recovery events for a multi-tenant SaaS platform, providing step-by-step guidance for pre-failover validation, failover execution, post-failover verification, and documentation.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-assess-failover-readiness.md`
2. Execute failover via `step-02-c-*`
3. Validate failover via `step-03-c-*`
4. Document execution via `step-04-c-*`
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
- Contributes to QG-P1 (Production), QG-DR1 (Disaster Recovery)

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR design provides failover procedures
- `bmad-bam-tenant-aware-observability` - Observability enables failover monitoring
- `bmad-bam-sla-contract-design` - SLA commitments guide failover priorities
- `bmad-bam-data-reconciliation-dr` - Data reconciliation post-failover
