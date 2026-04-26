# Step 11: Apply Changes to Facade Contract

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that break existing consumer integrations without versioning
- 📖 ALWAYS validate changes against QG-I1 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-I1 re-validation
- 🔒 LOCK tenant context requirements without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining contract consistency
- 💾 Track: Changes applied, version increment, QG-I1 impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections
- ⚠️ Gate: Breaking changes require re-validation warning
- 🔍 Use web search: If user requests updated contract patterns

---

## YOUR TASK

Apply the user's requested changes to the facade contract, validate consistency across operations and events, update document metadata, and present a summary of modifications with any re-validation requirements.

---

## Apply Sequence

### Action 1: Capture Change Requests

**Document requested modifications:**

| Section | Current Value | Requested Change | Breaking Change |
|---------|---------------|------------------|-----------------|
| | | | Yes/No |

**Breaking Change Definitions:**

| Change Type | Breaking | Consumer Impact |
|-------------|----------|-----------------|
| Add optional input field | No | None |
| Add required input field | Yes | Must update |
| Remove output field | Yes | Must update |
| Change field type | Yes | Must update |
| Add new operation | No | None (additive) |
| Remove operation | Yes | Must remove usage |
| Change error codes | Varies | Review handling |
| Add event | No | None (can ignore) |
| Remove event | Yes | Must unsubscribe |

### Action 2: Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Tenant context preserved | | Does change maintain tenant_id requirement? |
| Operation signatures | | Does change break existing callers? |
| Event schemas | | Does change break existing handlers? |
| Error contracts | | Are error codes still valid? |
| Version compatibility | | Is versioning strategy followed? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change would break contract compatibility:
- {specific risk}

Options:
[V] Apply as new version (breaking change)
[R] Revise change to be backward compatible
[O] Override with documented exception
[C] Cancel this change
================================================================================
```

### Action 3: Apply Operation Changes

**For operation edits:**

| Operation | Before | After | Breaking |
|-----------|--------|-------|----------|
| {op_name} | {old_spec} | {new_spec} | {yes/no} |

**Operation change validation:**
- [ ] Input schema changes are backward compatible
- [ ] Output schema changes are additive only
- [ ] Error codes preserved or extended
- [ ] Tenant context requirements unchanged
- [ ] Idempotency behavior preserved

**If adding new operation:**

```markdown
### New Operation: {operationName}

| Attribute | Value |
|-----------|-------|
| Name | {operationName} |
| Purpose | {description} |
| Tenant Required | Yes |
| Input | {InputType} |
| Output | {OutputType} |

Added in version: {new_version}
```

### Action 4: Apply Event Changes

**For event contract edits:**

| Event | Before | After | Breaking |
|-------|--------|-------|----------|
| {event_type} | {old_schema} | {new_schema} | {yes/no} |

**Event change validation:**
- [ ] Payload schema changes are additive
- [ ] Tenant_id still required in envelope
- [ ] Event type naming convention followed
- [ ] Version incremented appropriately
- [ ] Consumer handlers notified of changes

**If adding new event:**

```markdown
### New Event: {source_module}.{entity}.{action}

| Attribute | Value |
|-----------|-------|
| Type | {event_type} |
| Version | 1.0.0 |
| Trigger | {when emitted} |

Payload:
| Field | Type | Required |
|-------|------|----------|
| {field1} | {type} | Yes |

Added in contract version: {new_version}
```

### Action 5: Apply Schema Changes

**For DTO/schema edits:**

| Schema | Field | Before | After | Breaking |
|--------|-------|--------|-------|----------|
| {dto_name} | {field} | {old_type} | {new_type} | {yes/no} |

**Schema change rules:**
- [ ] Adding optional fields: Safe (not breaking)
- [ ] Adding required fields: Breaking (requires major version)
- [ ] Removing fields: Breaking (requires major version)
- [ ] Changing types: Breaking (requires major version)
- [ ] Renaming fields: Breaking (requires major version)

### Action 6: Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
contract_name: {source}Facade → {target}
version: 1.0.0
date: 2026-04-01
qg_i1_status: PASS

# After
contract_name: {source}Facade → {target}
version: 1.1.0  # Minor for non-breaking, Major for breaking
date: 2026-04-26
qg_i1_status: PENDING  # If breaking changes applied
```

**Version increment rules:**

| Change Type | Version Increment | QG-I1 Status |
|-------------|-------------------|--------------|
| Documentation only | Patch (1.0.0 → 1.0.1) | Unchanged |
| Additive (new ops/events) | Minor (1.0.0 → 1.1.0) | CONDITIONAL |
| Breaking changes | Major (1.0.0 → 2.0.0) | PENDING |

### Action 7: Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary_of_changes} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial facade contract |

### Change Details: v1.1.0

**Operations:**
- Added: {new_operation} - {purpose}
- Modified: {operation} - {what_changed}

**Events:**
- Added: {new_event} - {purpose}

**Breaking Changes:**
- None (or list breaking changes)

**Migration Guide:**
- {instructions for consumers to update}
```

### Action 8: Present Change Summary

**Display modifications before save:**

```
================================================================================
FACADE CONTRACT EDIT SUMMARY
================================================================================
Contract: {source_module}Facade → {target_module}
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Operation Changes]
- {list of operation modifications}

[Event Changes]
- {list of event modifications}

[Schema Changes]
- {list of DTO modifications}

================================================================================
BREAKING CHANGES: {Yes/No}

{if yes}
Consumer Update Required:
- {consumer_module} must update by: {deadline}
- Migration guide provided in Change Log
{endif}

VALIDATION STATUS:

QG-I1 Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-facade-contract` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/facade-{source}-{target}-contract.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### Action 9: Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Contract: {source}Facade → {target}
Document saved: facade-{source}-{target}-contract.md
Version: {new_version}
QG-I1 Status: {status}

{if PENDING}
IMPORTANT: Changes require QG-I1 re-validation.
Run: Validate mode (step-20-v-*) before implementation.
{endif}

{if breaking}
CONSUMER NOTIFICATION REQUIRED:
Notify {target_module} team of breaking changes.
Migration deadline: {recommended_date}
{endif}

Next steps:
- [V] Run validation workflow
- [E] Continue editing
- [N] Notify consumers (if breaking)
- [X] Exit edit mode
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Consistency checks passed or exceptions documented
- ✅ Operations and events updated correctly
- ✅ Dependent schemas propagated
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated
- ✅ Consumer notification guidance provided (if breaking)

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Tenant context removal:** Critical violation, require override
- ❌ **Breaking change without version:** Block until versioned
- ❌ **Event envelope change:** Verify all consumers notified
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

**If QG-I1 status is PENDING:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If breaking changes applied:**
1. Notify all consumer teams
2. Provide migration guide
3. Set deprecation timeline for old version

**If QG-I1 status is PASS or CONDITIONAL:**
Proceed to implementation or next planning workflow.
