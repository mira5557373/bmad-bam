# Tenant Safety Workflow

## Mode Selection

| Mode | Entry Point | Steps |
|------|-------------|-------|
| Create | `step-01-c-audit-data-isolation.md` | 5 |
| Edit | `step-10-e-load-existing.md` | 2 |
| Validate | `step-20-v-load-artifact.md` | 3 |

## Create Mode Flow

```
step-01-c-audit-data-isolation.md
         ↓
step-02-c-test-resource-boundaries.md
         ↓
step-03-c-verify-ai-context.md
         ↓
step-04-c-test-cross-tenant.md
         ↓
step-05-c-generate-report.md
         ↓
    [QG-AI2 Gate]
```

## Edit Mode Flow

```
step-10-e-load-existing.md
         ↓
step-11-e-apply-changes.md
         ↓
    [QG-AI2 Gate]
```

## Validate Mode Flow

```
step-20-v-load-artifact.md
         ↓
step-21-v-validate.md
         ↓
step-22-v-generate-report.md
         ↓
    [QG-AI2 Gate]
```

## Dependencies

- **Templates:** `rls-policy-template.md`, `cache-isolation-template.md`, `memory-isolation-template.md`, `tenant-context-template.md`
- **Data:** `bam-patterns.csv` (filter: `tenant-isolation`)
- **Checklists:** `qg-tenant-checklist.md`

## Gate Integration

Tenant safety is verified as part of QG-AI2 gate.

| Criteria | Requirement |
|----------|-------------|
| Data isolation | Zero cross-tenant access |
| Resource limits | Per-tenant enforced |
| AI context | Complete separation |
| Cross-tenant attacks | All blocked |
