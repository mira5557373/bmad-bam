# Step 11: Apply Changes to Tenant Isolation Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that violate tenant isolation consistency
- 📖 ALWAYS validate changes against QG-M2 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-M2 re-validation
- 🔒 LOCK critical isolation dimensions without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining consistency
- 💾 Track: Changes applied, version increment, QG-M2 impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections
- ⚠️ Gate: Critical dimension changes require re-validation warning
- 🔍 Use web search: If user requests updated patterns for specific changes

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

Apply the user's requested changes to the tenant isolation design, validate consistency across all 8 dimensions, update document metadata, and present a summary of modifications with any re-validation requirements.

---

## Apply Sequence

### Action 1: Capture Change Requests

**Document requested modifications:**

| Section | Current Value | Requested Change | Impact Level |
|---------|---------------|------------------|--------------|
| | | | Low/Medium/High |

**Impact Level Definitions:**

| Level | Description | Re-validation |
|-------|-------------|---------------|
| **Low** | Documentation updates, formatting | No |
| **Medium** | Strategy change within same model | Partial QG-M2 |
| **High** | Dimension change, model change | Full QG-M2 |

### Action 2: Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Dimension conflict | | Do changes create isolation gaps? |
| Context propagation | | Does change break tenant context flow? |
| Sharing rule conflict | | Does change expose isolated resources? |
| Tier alignment | | Does change break tier isolation hierarchy? |
| RLS policy impact | | Does change require policy updates? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change would create an isolation gap:
- {specific risk}

Options:
[R] Revise change to resolve conflict
[O] Override with documented exception
[C] Cancel this change
================================================================================
```

### Action 3: Apply Dimension Changes

**For isolation dimension edits:**

Update the affected dimension(s) in the 8-dimension matrix:

| Dimension | Before | After | Validation |
|-----------|--------|-------|------------|
| {dimension} | {old_strategy} | {new_strategy} | {check_result} |

**Propagate dependent changes:**

- If **Data** dimension changes: Update RLS policy templates
- If **Cache** dimension changes: Update key prefix patterns
- If **API** dimension changes: Update context propagation
- If **Events** dimension changes: Update topic naming conventions

### Action 4: Apply Sharing Rule Changes

**For sharing rule edits:**

| Rule | Before | After | Security Impact |
|------|--------|-------|-----------------|
| {resource} | {old_rule} | {new_rule} | {impact} |

**Security validation:**
- [ ] No previously isolated resource becomes shared
- [ ] Audit logging preserved for admin access
- [ ] Cross-tenant boundaries remain enforced

### Action 5: Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
tenant_model: {model}
version: 1.0.0
date: 2026-04-01
qg_m2_status: PASS

# After
tenant_model: {model_if_changed}
version: 1.1.0  # Minor increment for non-breaking changes
date: 2026-04-26
qg_m2_status: PENDING  # If High impact changes applied
```

**Version increment rules:**

| Impact Level | Version Increment | QG-M2 Status |
|--------------|-------------------|--------------|
| Low | Patch (1.0.0 -> 1.0.1) | Unchanged |
| Medium | Minor (1.0.0 -> 1.1.0) | CONDITIONAL |
| High | Minor (1.0.0 -> 1.1.0) | PENDING |

### Action 6: Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary_of_changes} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial isolation design |
```

### Action 7: Present Change Summary

**Display modifications before save:**

```
================================================================================
TENANT ISOLATION EDIT SUMMARY
================================================================================
Document: tenant-isolation.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Dimension Changes]
{list of dimension modifications}

[Sharing Rule Changes]
{list of sharing rule modifications}

[Context Propagation Changes]
{list of propagation modifications}

================================================================================
VALIDATION STATUS:

QG-M2 Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-tenant-isolation` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/tenant-isolation.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### Action 8: Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/tenant-isolation.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Document saved: tenant-isolation.md
Version: {new_version}
QG-M2 Status: {status}

{if PENDING}
IMPORTANT: Changes require QG-M2 re-validation.
Run: Validate mode (step-20-v-*) before proceeding to implementation.
{endif}

Next steps:
- [V] Run validation workflow
- [E] Continue editing
- [X] Exit edit mode
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Consistency checks passed or exceptions documented
- ✅ Affected dimensions updated correctly
- ✅ Dependent changes propagated
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Isolation gap created:** Require explicit override with justification
- ❌ **Tier conflict:** Warn that lower tiers cannot exceed upper tier isolation
- ❌ **RLS policy break:** Require policy update before saving
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] Change requests captured completely
- [ ] Consistency validation performed
- [ ] All changes applied correctly
- [ ] Document structure preserved
- [ ] Frontmatter updated with new version
- [ ] Change Log entry added
- [ ] Change summary presented to user
- [ ] Document saved successfully
- [ ] Re-validation status communicated

---

## NEXT STEP

Edit mode complete.

**If QG-M2 status is PENDING:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If QG-M2 status is PASS or CONDITIONAL:**
Proceed to next planning workflow or implementation phase.
