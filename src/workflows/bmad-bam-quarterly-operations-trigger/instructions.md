# Quarterly Operations Trigger - Instructions

## Purpose

Scheduled event trigger workflow that initiates quarterly operational reviews, serving as an entry point for QG-SA1 (Security Audit), QG-PR1 (Performance Review), QG-DR1 (Disaster Recovery Drill), and QG-CP1 (Capacity Planning).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| Quarterly cycle triggered | Create | `step-01-c-*` |
| Existing schedule needs update | Edit | `step-10-e-*` |
| Quarterly setup validation | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-*` to initialize quarterly review cycle
2. Create review schedule and assignments
3. Initiate gate evaluations

### Edit Mode
1. Load existing schedule via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load setup via `step-20-v-load-*.md`
2. Validate quarterly configuration
3. Generate validation report

## Quality Gates

- Reference: `qg-operations-continuous.md`
- Initiates QG-SA1, QG-PR1, QG-DR1, QG-CP1

## Related Workflows

- `bmad-bam-security-audit-execution` - Security audit process
- `bmad-bam-performance-review-execution` - Performance review
- `bmad-bam-disaster-recovery-drill` - DR testing
- `bmad-bam-capacity-planning-review` - Capacity assessment
- `bmad-bam-monthly-operations-trigger` - Monthly trigger coordination
