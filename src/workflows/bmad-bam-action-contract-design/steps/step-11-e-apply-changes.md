# Step 11: Apply Changes

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Apply requested modifications to the action contract specification.

## Prerequisites

- Step 10 completed (existing state loaded)
- Change request documented

## Actions

### 1. Validate Change Request

Confirm changes are:
- [ ] Compatible with existing schema
- [ ] Consistent with tenant model
- [ ] Aligned with runtime capabilities

### 2. Apply Modifications

For each change:
1. Update relevant section
2. Maintain version history
3. Document rationale

### 3. Update Version

```yaml
version:
  previous: "1.0.0"
  current: "1.1.0"
  changed_at: "{{date}}"
  changed_by: "{{author}}"
  changes:
    - section: "confidence_thresholds"
      description: "Adjusted soft review threshold"
```

### 4. Regenerate Specification

Write updated spec to: `{output_folder}/planning-artifacts/ai/action-contract-spec.md`

## Verification

- [ ] All changes applied
- [ ] Version updated
- [ ] Specification regenerated
- [ ] No breaking changes (or documented if intentional)

## Outputs

- Updated action-contract-spec.md
- Change log entry

## Next Step

Run Validate mode to confirm changes meet QG-AI2.
