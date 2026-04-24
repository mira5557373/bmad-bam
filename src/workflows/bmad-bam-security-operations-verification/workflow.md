# Security Operations Verification Workflow

## Mode Selection

| Mode | Entry Point | Steps |
|------|-------------|-------|
| Create | `step-01-c-audit-monitoring.md` | 5 |
| Edit | `step-10-e-load-existing.md` | 2 |
| Validate | `step-20-v-load-artifact.md` | 3 |

## Create Mode Flow

```
step-01-c-audit-monitoring.md
         ↓
step-02-c-test-incident-response.md
         ↓
step-03-c-verify-threat-detection.md
         ↓
step-04-c-assess-controls.md
         ↓
step-05-c-generate-report.md
         ↓
    [QG-S4 Gate]
```

## Edit Mode Flow

```
step-10-e-load-existing.md
         ↓
step-11-e-apply-changes.md
         ↓
    [QG-S4 Gate]
```

## Validate Mode Flow

```
step-20-v-load-artifact.md
         ↓
step-21-v-validate.md
         ↓
step-22-v-generate-report.md
         ↓
    [QG-S4 Gate]
```

## Dependencies

- **Templates:** `audit-logging-template.md`, `observability-template.md`
- **Data:** `bam-patterns.csv` (filter: `security`)
- **Checklists:** `qg-sec-checklist.md`
- **Workflows:** `bmad-bam-ai-security`

## Gate Integration

Security operations are verified as part of QG-S4 gate.

| Criteria | Requirement |
|----------|-------------|
| Security monitoring | 24/7 coverage |
| Incident response | Tested quarterly |
| Threat detection | Real-time |
| Security controls | Effective |
