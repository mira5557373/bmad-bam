# Step 11: Apply Changes

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Apply requested modifications to the PRG gate specification.

## Prerequisites

- Step 10 completed (existing state loaded)
- Change request documented

## Actions

### 1. Validate Change Request

Confirm changes are:
- [ ] Compatible with existing automation
- [ ] Consistent with check dependencies
- [ ] Approved by relevant owners

### 2. Apply Modifications

For each change:
1. Update relevant section
2. Update CI/CD if needed
3. Document rationale

### 3. Update Version

```yaml
version:
  previous: "1.0.0"
  current: "1.1.0"
  changed_at: "{{date}}"
  changed_by: "{{author}}"
  changes:
    - check: "observability"
      description: "Added new metric requirement"
```

### 4. Regenerate Specification

Write updated spec to: `{output_folder}/planning-artifacts/quality/prg-gate-spec.md`

## Verification

- [ ] All changes applied
- [ ] Version updated
- [ ] CI/CD updated if needed
- [ ] Specification regenerated

## Outputs

- Updated prg-gate-spec.md
- Change log entry

## Next Step

Run Validate mode to confirm changes meet QG-PRG.
