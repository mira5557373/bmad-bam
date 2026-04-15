# Data Protection Workflow

## Mode Router

| Mode | Entry Point | Steps |
|------|-------------|-------|
| Create | `step-01-c-audit-encryption.md` | 5 |
| Edit | `step-10-e-load-existing.md` | 2 |
| Validate | `step-20-v-load-artifact.md` | 3 |

## Create Mode Flow

```
step-01-c-audit-encryption.md
         ↓
step-02-c-verify-isolation.md
         ↓
step-03-c-test-pii-protection.md
         ↓
step-04-c-validate-lifecycle.md
         ↓
step-05-c-generate-report.md
         ↓
    [QG-DR1 Gate]
```

## Edit Mode Flow

```
step-10-e-load-existing.md
         ↓
step-11-e-apply-changes.md
         ↓
    [QG-DR1 Gate]
```

## Validate Mode Flow

```
step-20-v-load-artifact.md
         ↓
step-21-v-validate.md
         ↓
step-22-v-generate-report.md
         ↓
    [QG-DR1 Gate]
```

## Dependencies

- **Templates:** `rls-policy-template.md`, `cache-isolation-template.md`, `memory-isolation-template.md`
- **Data:** `bam-patterns.csv` (filter: `data-protection`, `tenant-isolation`)
- **Checklists:** `security-checklist.md`

## Gate Integration

Quality Gate QG-DR1 must pass before proceeding to production deployment.

| Criteria | Requirement |
|----------|-------------|
| Encryption at rest | AES-256 |
| Encryption in transit | TLS 1.3 |
| Tenant isolation | RLS + context |
| PII protection | Detection + redaction |
