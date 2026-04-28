# Step 11: Apply Changes to API Versioning Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that invalidate existing tenant configurations
- 📖 ALWAYS validate changes against API versioning best practices
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-I1 re-validation
- 🔒 LOCK tenant pinning requirements without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining design consistency
- 💾 Track: Changes applied, version increment, QG-I1 impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections
- ⚠️ Gate: Breaking changes require re-validation warning
- 🔍 Use web search: If user requests updated versioning patterns

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

Apply the user's requested changes to the API versioning design, validate consistency across all sections, update document metadata, and present a summary of modifications with any re-validation requirements.

---

## Apply Sequence

### Action 1: Capture Change Requests

**Document requested modifications:**

| Section | Current Value | Requested Change | Impact |
|---------|---------------|------------------|--------|
| | | | High/Medium/Low |

**Change Impact Definitions:**

| Change Type | Impact | Tenant Effect |
|-------------|--------|---------------|
| Strategy change | High | All tenants affected |
| Timeline extension | Low | Beneficial to tenants |
| Timeline reduction | High | May impact migrations |
| Add feature | Low | New capability |
| Remove feature | High | May break workflows |
| Rollout change | Medium | Deployment affected |

### Action 2: Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Versioning strategy coherent | | Does change align with format? |
| Lifecycle compatible | | Do timelines still make sense? |
| Compatibility preserved | | Are breaking change rules consistent? |
| Migration feasible | | Can rollout support changes? |
| Tenant pinning intact | | Are tenant options preserved? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change would create inconsistency:
- {specific risk}

Options:
[A] Apply with dependent changes (auto-fix related sections)
[R] Revise change to be consistent
[O] Override with documented exception
[C] Cancel this change
================================================================================
```

### Action 3: Apply Versioning Strategy Changes

**For strategy edits:**

| Setting | Before | After | Impact |
|---------|--------|-------|--------|
| Primary Method | {old} | {new} | {impact} |
| Version Format | {old} | {new} | {impact} |
| Tenant Pinning | {old} | {new} | {impact} |

**Strategy change validation:**
- [ ] New strategy compatible with API gateway
- [ ] Client ecosystem can support change
- [ ] Multi-tenant routing still works
- [ ] Documentation update planned

**If changing from URL to Header versioning:**

```markdown
### Migration Required

Changing versioning strategy requires:
1. Client SDK updates
2. API gateway reconfiguration
3. Documentation updates
4. Transition period with both methods

Recommended transition period: 6 months
```

### Action 4: Apply Version Lifecycle Changes

**For lifecycle edits:**

| Setting | Before | After | Impact |
|---------|--------|-------|--------|
| Deprecation Timeline | {old_months} | {new_months} | {impact} |
| Enterprise Extension | {old_months} | {new_months} | {impact} |
| Sunset Headers | {old} | {new} | {impact} |
| Tenant Pinning | {old} | {new} | {impact} |

**Lifecycle change validation:**
- [ ] Timeline changes communicated to stakeholders
- [ ] Existing deprecation notices remain valid
- [ ] Tenant notifications updated
- [ ] Extension requests still honored

**If reducing deprecation timeline:**

```
================================================================================
TIMELINE REDUCTION WARNING
================================================================================
Current Timeline: {old_months} months
Proposed Timeline: {new_months} months

Impact:
- Tenants currently in deprecation period: {count}
- Tenants may not have time to migrate

Recommendation:
- Apply new timeline only to NEW deprecations
- Honor existing deprecation commitments

Options:
[N] Apply to new deprecations only
[A] Apply to all (requires tenant notification)
[C] Cancel change
================================================================================
```

### Action 5: Apply Backward Compatibility Changes

**For compatibility edits:**

| Rule | Before | After | Impact |
|------|--------|-------|--------|
| Breaking Change Definition | {old} | {new} | {impact} |
| Grace Period | {old_days} | {new_days} | {impact} |
| Schema Evolution | {old} | {new} | {impact} |

**Compatibility change validation:**
- [ ] Breaking change classification clear
- [ ] Grace periods still reasonable
- [ ] Schema rules internally consistent
- [ ] Testing strategy updated if needed

### Action 6: Apply Migration Strategy Changes

**For migration edits:**

| Setting | Before | After | Impact |
|---------|--------|-------|--------|
| Notification Channels | {old} | {new} | {impact} |
| Rollout Phases | {old} | {new} | {impact} |
| Rollback Triggers | {old} | {new} | {impact} |
| Support Resources | {old} | {new} | {impact} |

**Migration change validation:**
- [ ] Notification coverage adequate
- [ ] Rollout phases feasible
- [ ] Rollback procedures still valid
- [ ] Support resources available

### Action 7: Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
name: API Versioning Design
version: 1.0.0
date: 2026-04-01
qg_status: PASS

# After
name: API Versioning Design
version: 1.1.0  # Minor for non-breaking, Major for breaking
date: 2026-04-26
qg_status: PENDING  # If significant changes applied
```

**Version increment rules:**

| Change Type | Version Increment | QG Status |
|-------------|-------------------|-----------|
| Documentation only | Patch (1.0.0 → 1.0.1) | Unchanged |
| Additive changes | Minor (1.0.0 → 1.1.0) | CONDITIONAL |
| Strategy changes | Major (1.0.0 → 2.0.0) | PENDING |

### Action 8: Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary_of_changes} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial API versioning design |

### Change Details: v1.1.0

**Versioning Strategy:**
- {changes if any}

**Version Lifecycle:**
- {changes if any}

**Backward Compatibility:**
- {changes if any}

**Migration Strategy:**
- {changes if any}

**Re-validation Required:** {Yes/No}
```

### Action 9: Present Change Summary

**Display modifications before save:**

```
================================================================================
API VERSIONING DESIGN EDIT SUMMARY
================================================================================
Document: api-versioning-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Versioning Strategy]
- {list of strategy changes}

[Version Lifecycle]
- {list of lifecycle changes}

[Backward Compatibility]
- {list of compatibility changes}

[Migration Strategy]
- {list of migration changes}

================================================================================
IMPACT ASSESSMENT: {Low/Medium/High}

{if high}
Significant Changes Detected:
- {list of high-impact changes}
- Re-validation recommended
{endif}

VALIDATION STATUS:

QG Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-api-versioning` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/api-versioning-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### Action 10: Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/api-versioning-design.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Document: api-versioning-design.md
Document saved: {output_folder}/planning-artifacts/api-versioning-design.md
Version: {new_version}
QG Status: {status}

{if PENDING}
IMPORTANT: Changes require QG-I1 re-validation.
Run: Validate mode (step-20-v-*) before implementation.
{endif}

{if strategy_changed}
IMPLEMENTATION UPDATE REQUIRED:
- Update API gateway configuration
- Update client SDK documentation
- Communicate changes to development teams
{endif}

Next steps:
- [V] Run validation workflow
- [E] Continue editing
- [I] Proceed to implementation
- [X] Exit edit mode
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Consistency checks passed or exceptions documented
- ✅ All sections updated correctly
- ✅ Dependent sections propagated
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Tenant pinning removal:** Critical violation, require override
- ❌ **Strategy change without plan:** Block until transition planned
- ❌ **Timeline reduction:** Verify tenant impact before applying
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

**If QG status is PENDING:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If strategy changes applied:**
1. Update implementation plan
2. Communicate to development teams
3. Plan transition period if needed

**If QG status is PASS or CONDITIONAL:**
Proceed to implementation or next planning workflow.
