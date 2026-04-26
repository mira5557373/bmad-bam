# Step 11: Apply Changes to Module Architecture

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that violate module boundary consistency
- 📖 ALWAYS validate changes against QG-M1 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-M1 re-validation
- 🔒 LOCK critical module boundaries without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining consistency
- 💾 Track: Changes applied, version increment, QG-M1 impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections
- ⚠️ Gate: Critical boundary changes require re-validation warning
- 🔍 Use web search: If user requests updated patterns for specific changes

---

## YOUR TASK

Apply the user's requested changes to the module architecture, validate consistency across boundaries and dependencies, update document metadata, and present a summary of modifications with any re-validation requirements.

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
| **Medium** | API changes, dependency updates | Partial QG-M1 |
| **High** | Boundary change, responsibility shift | Full QG-M1 |

### Action 2: Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Single responsibility | | Does change maintain single clear purpose? |
| Facade contract | | Does change break existing API contracts? |
| Dependency direction | | Does change create circular dependency? |
| Tenant context | | Does change break tenant integration? |
| Coupling level | | Does change increase tight coupling? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change would violate module architecture principles:
- {specific risk}

Options:
[R] Revise change to resolve conflict
[O] Override with documented exception
[C] Cancel this change
================================================================================
```

### Action 3: Apply Boundary Changes

**For module boundary edits:**

Update the affected section:

| Component | Before | After | Validation |
|-----------|--------|-------|------------|
| Responsibility | {old} | {new} | {check_result} |
| Scope | {old} | {new} | {check_result} |

**Propagate dependent changes:**

- If **Responsibility** changes: Update public API contracts
- If **Public API** changes: Update dependent module references
- If **Dependencies** change: Verify no circular references
- If **Tenant Context** changes: Update context propagation

### Action 4: Apply API Contract Changes

**For facade contract edits:**

| Endpoint | Before | After | Breaking Change? |
|----------|--------|-------|------------------|
| {endpoint} | {old_spec} | {new_spec} | Yes/No |

**API change validation:**
- [ ] Input schema changes are backward compatible
- [ ] Output schema changes are additive only
- [ ] Error codes preserved or extended
- [ ] Tenant context requirements unchanged

### Action 5: Apply Dependency Changes

**For dependency edits:**

| Dependency | Before | After | Security Impact |
|------------|--------|-------|-----------------|
| {module} | {old_coupling} | {new_coupling} | {impact} |

**Dependency validation:**
- [ ] No new circular dependencies introduced
- [ ] All dependencies through facades only
- [ ] Coupling level appropriate for relationship
- [ ] No tight coupling to external modules

### Action 6: Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
module_name: {name}
version: 1.0.0
date: 2026-04-01
qg_m1_status: PASS

# After
module_name: {name}
version: 1.1.0  # Minor increment for non-breaking changes
date: 2026-04-26
qg_m1_status: PENDING  # If High impact changes applied
```

**Version increment rules:**

| Impact Level | Version Increment | QG-M1 Status |
|--------------|-------------------|--------------|
| Low | Patch (1.0.0 -> 1.0.1) | Unchanged |
| Medium | Minor (1.0.0 -> 1.1.0) | CONDITIONAL |
| High | Minor (1.0.0 -> 1.1.0) | PENDING |

### Action 7: Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary_of_changes} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial module architecture |
```

### Action 8: Present Change Summary

**Display modifications before save:**

```
================================================================================
MODULE ARCHITECTURE EDIT SUMMARY
================================================================================
Module: {module_name}
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Boundary Changes]
{list of boundary modifications}

[API Contract Changes]
{list of API modifications}

[Dependency Changes]
{list of dependency modifications}

================================================================================
VALIDATION STATUS:

QG-M1 Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-module-architecture` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/module-{name}-architecture.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### Action 9: Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/module-{name}-architecture.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Module: {module_name}
Document saved: module-{name}-architecture.md
Version: {new_version}
QG-M1 Status: {status}

{if PENDING}
IMPORTANT: Changes require QG-M1 re-validation.
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
- ✅ Affected sections updated correctly
- ✅ Dependent changes propagated
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Boundary breach:** Require explicit override with justification
- ❌ **Circular dependency:** Block until resolved
- ❌ **Breaking API change:** Require versioning strategy before saving
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

**If QG-M1 status is PENDING:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If QG-M1 status is PASS or CONDITIONAL:**
Proceed to next planning workflow or implementation phase.
