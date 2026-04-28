# Step 11: Apply Tracing Design Changes

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that break span hierarchy consistency or tenant context propagation
- 📖 ALWAYS validate changes against QG-M3 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-M3 or QG-I2 re-validation
- 🔒 LOCK critical tracing dimensions (tenant_id attributes) without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining trace schema consistency
- 💾 Track: `stepsCompleted: 11` when complete
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections or remove tenant context requirements
- ⚠️ Gate: Span hierarchy changes require re-validation warning
- 🔍 Use web search: If user requests updated OpenTelemetry patterns for specific changes

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## YOUR TASK

Apply the user's requested changes to the agent tracing design, validate consistency across all span hierarchies and tenant context propagation, update document metadata, and present a summary of modifications with any re-validation requirements.

---

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

### 6. Present Change Summary

**Display modifications before save:**

```
================================================================================
AGENT TRACING EDIT SUMMARY
================================================================================
Document: agent-tracing-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Span Hierarchy Changes]
{list of span modifications}

[Tenant Attribute Changes]
{list of tenant context modifications}

[Sampling Strategy Changes]
{list of sampling rule modifications}

[Token Metrics Changes]
{list of LLM tracking modifications}

================================================================================
VALIDATION STATUS:

QG-M3 Status: {PASS|CONDITIONAL|PENDING}
QG-I2 Status: {PASS|CONDITIONAL|PENDING} (if tenant changes)
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-agent-tracing` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/agent-tracing-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Span hierarchy consistency checks passed or exceptions documented
- ✅ Tenant context propagation preserved across all spans
- ✅ Sampling strategy changes propagated to dependent sections
- ✅ Token metrics aligned with LLM span definitions
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Span hierarchy violation:** Block change, present resolution options
- ❌ **Tenant context gap created:** Require explicit override with justification
- ❌ **Sampling rate conflict:** Warn that rates exceed platform capabilities
- ❌ **Token metrics break:** Require LLM span alignment before saving
- ❌ **Save failure:** Retry with backup to alternate location

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
