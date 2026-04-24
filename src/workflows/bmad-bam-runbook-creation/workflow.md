# Runbook Creation Workflow

## Mode Selection

| Mode | Entry Point | Steps |
|------|-------------|-------|
| Create | `step-01-c-assess-needs.md` | 5 |
| Edit | `step-10-e-load-existing.md` | 2 |
| Validate | `step-20-v-load-artifact.md` | 3 |

## Create Mode Flow

```
step-01-c-assess-needs.md
         ↓
step-02-c-create-incident-runbooks.md
         ↓
step-03-c-create-ai-runbooks.md
         ↓
step-04-c-create-routine-runbooks.md
         ↓
step-05-c-generate-collection.md
         ↓
    [QG-OC Gate]
```

## Edit Mode Flow

```
step-10-e-load-existing.md
         ↓
step-11-e-apply-changes.md
         ↓
    [QG-OC Gate]
```

## Validate Mode Flow

```
step-20-v-load-artifact.md
         ↓
step-21-v-validate.md
         ↓
step-22-v-generate-report.md
         ↓
    [QG-OC Gate]
```

## Dependencies

- **Templates:** `observability-template.md`
- **Data:** `bam-patterns.csv` (filter: `operations`)
- **Checklists:** `qg-prod-checklist.md`

## Gate Integration

Runbooks are a prerequisite for QG-OC gate passage.

| Runbook Category | Required |
|------------------|----------|
| Incident response | Yes |
| AI operations | Yes |
| Deployment | Yes |
| Security incidents | Yes |
| Routine operations | Yes |
