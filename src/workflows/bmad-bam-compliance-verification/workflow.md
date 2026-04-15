# Compliance Verification Workflow

## Mode Router

| Mode | Entry Point | Steps |
|------|-------------|-------|
| Create | `step-01-c-assess-requirements.md` | 5 |
| Edit | `step-10-e-load-existing.md` | 2 |
| Validate | `step-20-v-load-artifact.md` | 3 |

## Create Mode Flow

```
step-01-c-assess-requirements.md
         ↓
step-02-c-audit-data-handling.md
         ↓
step-03-c-verify-access-controls.md
         ↓
step-04-c-test-audit-logging.md
         ↓
step-05-c-generate-report.md
         ↓
    [QG-CP1 Gate]
```

## Edit Mode Flow

```
step-10-e-load-existing.md
         ↓
step-11-e-apply-changes.md
         ↓
    [QG-CP1 Gate]
```

## Validate Mode Flow

```
step-20-v-load-artifact.md
         ↓
step-21-v-validate.md
         ↓
step-22-v-generate-report.md
         ↓
    [QG-CP1 Gate]
```

## Dependencies

- **Templates:** `compliance-framework-template.md`, `audit-logging-template.md`
- **Data:** `bam-patterns.csv` (filter: `compliance`)
- **Checklists:** `compliance-checklist.md`

## Gate Integration

Quality Gate QG-CP1 must pass before proceeding to production deployment.

| Criteria | Requirement |
|----------|-------------|
| SOC2 controls | All applicable implemented |
| GDPR requirements | Data handling compliant |
| Audit logging | Complete trail verified |
| Access controls | RBAC/ABAC enforced |
