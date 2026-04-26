# Step 11: Apply Tracing Design Changes

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. DO NOT skip verification

## Purpose

Apply requested modifications to the agent tracing design specification.

---

## Prerequisites

- Step 10 completed (existing state loaded)
- Change request documented

---

## Actions

### 1. Validate Change Request

Confirm changes are:

- [ ] Compatible with existing trace schema
- [ ] Consistent with tenant model
- [ ] Aligned with OpenTelemetry conventions
- [ ] Within observability platform capabilities

### 2. Apply Modifications

For each change:

1. Update relevant section
2. Maintain version history
3. Document rationale
4. Update cross-references

Change Application Log:

| Section | Before | After | Rationale |
|---------|--------|-------|-----------|
| | | | |

### 3. Update Schema Compatibility

If schema changes applied:

| Schema Element | Change | Backward Compatible | Migration |
|----------------|--------|---------------------|-----------|
| Span names | | Yes/No | |
| Attributes | | Yes/No | |
| Metrics | | Yes/No | |
| Events | | Yes/No | |

### 4. Update Version

```yaml
version:
  previous: "1.0.0"
  current: "1.1.0"
  changed_at: "{{date}}"
  changed_by: "{{author}}"
  changes:
    - section: "{section_name}"
      description: "{change_description}"
```

### 5. Regenerate Specification

Write updated spec to: `{output_folder}/planning-artifacts/agent-tracing-design.md`

Ensure all sections updated:
- [ ] Version header updated
- [ ] Change log appended
- [ ] Cross-references valid
- [ ] Integration points current

---

## Verification

- [ ] All changes applied
- [ ] Version updated
- [ ] Specification regenerated
- [ ] No breaking changes (or documented if intentional)
- [ ] Cross-references valid

---

## Outputs

- Updated `agent-tracing-design.md`
- Change log entry

---

## Next Step

Run Validate mode to confirm changes meet quality gate requirements:
- QG-M3 for agent runtime changes
- QG-I2 for tenant isolation changes
- QG-P1 for observability stack changes
