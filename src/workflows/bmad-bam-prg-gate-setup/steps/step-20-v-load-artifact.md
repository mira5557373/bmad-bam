# Step 20: Load Artifact for Validation

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Load PRG gate specification for validation against QG-PRG.

## Prerequisites

- Artifact exists at `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-prg-production.md`

## Actions

### 1. Load Specification

Read: `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`

### 2. Extract Validation Targets

| Component | Location in Spec | Validation Gate |
|-----------|------------------|-----------------|
| Check definitions | Section 2 | QG-PRG.1 |
| Automation config | Section 3 | QG-PRG.2 |
| Thresholds | Section 4 | QG-PRG.3 |
| Escalation | Section 5 | QG-PRG.4 |

### 3. Load Validation Criteria

Load QG-PRG checklist for validation criteria.

## Verification

- [ ] Specification loaded successfully
- [ ] All sections present
- [ ] Validation criteria loaded

## Outputs

- Parsed specification
- Validation target list

## Next Step

Proceed to `step-21-v-validate-prg.md` for validation.
