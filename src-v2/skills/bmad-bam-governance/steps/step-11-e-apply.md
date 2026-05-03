# Step 11: Apply Changes to Decision Log

## MANDATORY EXECUTION RULES

- NEVER modify decision log without explicit user change requests
- Preserve ALL unchanged content exactly as-is
- Confirm changes with user before saving

---

## YOUR TASK

Apply the user's selected changes to the decision log loaded in step-10. Validate consistency, update version, and save.

---

## Apply Sequence

### 1. Capture Change Requests

Gather specific changes:

| Change Category | Impact Level |
|-----------------|--------------|
| Add New ADR | LOW - additive change |
| Update ADR Status | MEDIUM - affects tracking |
| Supersede ADR | HIGH - deprecates previous decision |
| Edit ADR Content | MEDIUM - modifies existing record |

### 2. Validate Consistency

Before applying, validate:

| Check | Criteria |
|-------|----------|
| ADR Numbering | Sequential and unique |
| Status Transitions | Valid state transitions |
| Superseded References | Referenced ADR exists |
| Decision Index | Matches ADR entries |

### 3. Apply Changes

Update the decision log sections:

| Section | When to Update |
|---------|----------------|
| Decision Index | Always when ADRs change |
| ADR Entry | When adding or editing ADR |
| Superseded Decisions | When marking superseded |
| Change Log | Always |

### 4. Present Summary

```markdown
## Change Summary

**Document:** decision-log.md
**Previous Version:** {old_version}
**New Version:** {new_version}

### Changes Applied

1. {change 1 description}
2. {change 2 description}

Confirm these changes are correct before saving?
```

### 5. Save Document

**Save to:** `{output_folder}/planning-artifacts/decision-log.md`

---

## SUCCESS METRICS

- All requested changes captured
- Consistency validation passed
- Version updated
- Change Log entry added
- User confirmed changes
- Document saved

---

## NEXT STEP

Edit mode complete. Run Validate mode (step-22-v) to verify documentation.
