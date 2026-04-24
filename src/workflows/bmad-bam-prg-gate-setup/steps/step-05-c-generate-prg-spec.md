# Step 5: Generate PRG Specification

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Generate the complete PRG gate specification document.

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/prg-gate-spec-template.md`

## Actions

### 1. Assemble Specification

Combine all previous outputs:

1. **Component Inventory** (from Step 1)
2. **Check Mapping** (from Step 2)
3. **Automation Design** (from Step 3)
4. **Threshold Configuration** (from Step 4)

### 2. Add PRG Execution Flow

```
Release Branch Created
        │
        ▼
┌───────────────────┐
│ Automated Checks  │ ← Checks 1, 2, 4, 5, 7, 8
│ (CI/CD Pipeline)  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Semi-Auto Checks  │ ← Checks 3, 9
│ (Script + Human)  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Manual Checks     │ ← Checks 6, 10
│ (Review + Approve)│
└─────────┬─────────┘
          │
          ▼
    PRG Complete
```

### 3. Document Exception Process

| Exception Type | Approval Required | Documentation |
|----------------|-------------------|---------------|
| Skip non-critical | Release manager | ADR |
| Delay critical | VP Engineering | Incident ticket |
| Emergency bypass | CTO | Post-incident review |

### 4. Generate Output Document

Write to: `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`

## Verification

- [ ] All sections assembled
- [ ] Execution flow documented
- [ ] Exception process defined
- [ ] Output document generated

## Outputs

- `prg-gate-spec.md` - Complete PRG specification
- Ready for QG-PRG validation

## Next Step

Workflow complete. Deploy PRG gate to CI/CD pipeline.
