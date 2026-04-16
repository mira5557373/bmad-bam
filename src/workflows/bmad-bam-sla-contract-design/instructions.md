# SLA Contract Design - Instructions

## Purpose

Design comprehensive Service Level Agreements for multi-tenant AI platforms covering uptime guarantees, AI response latency commitments, tenant isolation SLAs, support tiers, penalty structures, monitoring requirements, and reporting obligations.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Analyze SLA requirements
2. Define uptime guarantees
3. Design latency SLAs
4. Establish isolation guarantees
5. Create support tiers
6. Define penalty clauses
7. Design monitoring requirements
8. Document reporting obligations
9. Validate SLA feasibility
10. Finalize contract templates
11. Output artifact to `{output_folder}/planning-artifacts/sla-contract/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`

## Quality Gates

- Reference: `production-readiness.md`
- Contributes to QG-SLA1 (SLA Contract Gate), QG-P1 (Production Readiness)

## Related Workflows

- `create-master-architecture` - Master architecture defines infrastructure for SLA planning
- `bmad-bam-sli-slo-definition` - Define SLIs/SLOs aligned with SLA commitments
- `bmad-bam-tenant-sla-monitoring` - Implement SLA monitoring per these requirements
- `bmad-bam-incident-response-operations` - Align incident response with SLA obligations
- `bmad-bam-disaster-recovery-design` - DR RTO/RPO objectives inform SLA commitments
- `bmad-bam-tenant-aware-observability` - Observability enables SLA breach detection
