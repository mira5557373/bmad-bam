# Production Readiness - Instructions

## Purpose

Perform comprehensive production readiness assessment for multi-tenant AI platforms, validating all prerequisites for go-live including security, performance, observability, and operational readiness. Supports Quality Gate QG-OC (Operational Checklist Gate).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Verify prerequisite gates
2. Assess infrastructure readiness
3. Validate observability setup
4. Test disaster recovery
5. Review operational procedures
6. Generate readiness report
7. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`

## Quality Gates

- Reference: `qg-p1-production-readiness.md`
- Required for QG-OC (Operational Checklist Gate) passage

## Recovery Protocol

If QG-OC fails:
1. **Identify Gap:** Review findings for specific failures
2. **Address Issue:** Fix blocking items
3. **Re-assess:** Run production readiness again

## Related Workflows

- `bmad-bam-disaster-recovery-design` - DR design for RTO/RPO verification
- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-runbook-creation` - Operational runbooks
- `bmad-bam-security-operations-verification` - Security operations readiness
