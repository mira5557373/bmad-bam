# Tenant Communication Design - Instructions

## Purpose

Design a comprehensive tenant notification and communication system for a multi-tenant SaaS platform, defining notification categories, tier-specific templates, delivery channels, and tenant preference management.

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Analyze communication needs
2. Design notification channels
3. Create message templates
4. Implement tenant preferences
5. Establish escalation paths
6. Design incident communication
7. Plan feature announcements
8. Validate communication compliance
9. Finalize communication playbook
10. Output artifact to `{output_folder}/planning-artifacts/`

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

- `create-master-architecture` - Master architecture defines platform for communication
- `bmad-bam-ai-model-deprecation` - Uses communication templates for deprecation notices
- `bmad-bam-tenant-onboarding-design` - Onboarding uses welcome notifications
- `bmad-bam-tenant-notification-system` - Notification system implementation
