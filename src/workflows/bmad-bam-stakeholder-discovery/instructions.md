# Stakeholder Discovery - Instructions

## Purpose

Discover and document key stakeholders for a multi-tenant SaaS platform initiative, identifying internal and external stakeholders, mapping their interests and influence levels, defining communication plans, and creating a RACI matrix for platform decisions.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-identify-stakeholders.md`
2. Map interests and influence via `step-02-c-*`
3. Define communication plan via `step-03-c-*`
4. Create RACI matrix via `step-04-c-*`
5. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Load existing artifact via `step-10-e-load-*.md`
2. Apply changes via `step-11-e-apply-*.md`

### Validate Mode
1. Load artifact via `step-20-v-load-*.md`
2. Run validation via `step-21-v-validate-*.md`
3. Generate report via `step-22-v-report-*.md`

## Quality Gates

- Reference: `qg-f1-foundation.md`
- Contributes to QG-F1 (Foundation), QG-P1 (Production)

## Related Workflows

- `create-master-architecture` - Master architecture requires stakeholder alignment
- `bmad-bam-tenant-model-isolation` - Tenant decisions require stakeholder input
- `bmad-bam-compliance-design` - Compliance stakeholders must be identified
- `bmad-bam-tenant-communication-design` - Communication templates per stakeholder
