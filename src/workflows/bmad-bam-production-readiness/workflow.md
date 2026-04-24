# Production Readiness Workflow

## Mode Selection

| Mode | Entry Point | Steps |
|------|-------------|-------|
| Create | `step-01-c-verify-gates.md` | 6 |
| Edit | `step-10-e-load-existing.md` | 2 |
| Validate | `step-20-v-load-artifact.md` | 3 |

## Create Mode Flow

```
step-01-c-verify-gates.md
         ↓
step-02-c-assess-infrastructure.md
         ↓
step-03-c-validate-observability.md
         ↓
step-04-c-test-disaster-recovery.md
         ↓
step-05-c-review-procedures.md
         ↓
step-06-c-generate-report.md
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

- **Templates:** `observability-template.md`, `testing-strategy-template.md`
- **Data:** `bam-patterns.csv` (filter: `operations`)
- **Checklists:** `qg-prod-checklist.md`, `qg-sec-checklist.md`
- **Workflows:** `bmad-bam-ai-security`, `bmad-bam-data-protection`, `bmad-bam-compliance-verification`

## Gate Integration

Quality Gate QG-OC is the final gate before production deployment.

| Prerequisite Gate | Status Required |
|-------------------|-----------------|
| QG-S4 (AI Security) | PASS |
| QG-DR1 (Data Protection) | PASS |
| QG-CP1 (Compliance) | PASS |
| QG-I3 (Agent Safety) | PASS |
