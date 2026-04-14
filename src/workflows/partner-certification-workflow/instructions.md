# Partner Certification Workflow - Instructions

## Purpose

Design a comprehensive ISV/partner certification program for a multi-tenant SaaS platform ecosystem, defining certification tiers (Registered, Certified, Premier), technical and business requirements per tier, assessment processes, and renewal procedures.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Start with `step-01-c-define-certification-tiers.md`
2. Design requirements per tier via `step-02-c-*`
3. Configure assessment process via `step-03-c-*`
4. Design renewal and maintenance via `step-04-c-*`
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
- Contributes to QG-F1 (Foundation), QG-P1 (Production)

## Related Workflows

- `bmad-bam-create-master-architecture` - Master architecture defines APIs for partner integration
- `bmad-bam-api-gateway-design` - API design informs partner integration requirements
- `bmad-bam-tenant-onboarding-design` - Partner onboarding follows similar patterns
- `bmad-bam-marketplace-design` - Partner certification enables marketplace listing
