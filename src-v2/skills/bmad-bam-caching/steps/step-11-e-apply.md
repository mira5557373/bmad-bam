# Step 11: Apply Changes to Caching Design

## MANDATORY EXECUTION RULES

- 🛑 **NEVER apply changes that violate cache layer consistency**
- 📖 **CRITICAL: ALWAYS read the complete step file before taking any action**
- 🔄 **CRITICAL: When loading next step with 'C', ensure entire file is read**
- ⏸️ **ALWAYS pause and present diff summary before final save**
- 🎯 **Focus ONLY on applying validated changes - do not skip validation**
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 🔒 LOCK critical cache configurations without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Apply user-requested changes while maintaining consistency
- 💾 **Track:** Changes applied, version increment, validation impact
- 📖 **Context:** Preserve all unmodified content exactly
- 🚫 **Do NOT:** Auto-modify unrelated sections
- 🔍 **Use web search:** If user requests updated patterns for specific changes
- ⚠️ **Gate:** Critical cache layer changes require re-validation warning

---

## YOUR TASK

Apply the user's requested changes to the caching design, validate consistency across all cache layers, update document metadata, and present a summary of modifications with any re-validation requirements.

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
| **Medium** | TTL changes, threshold adjustments | Partial QG-M2 |
| **High** | Layer change, key pattern change | Full QG-M2 |

### Action 2: Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Layer conflict | | Do changes create cache layer gaps? |
| Key pattern consistency | | Does change break tenant key prefix? |
| TTL coherence | | Does TTL hierarchy make sense (L1 < L2 < CDN)? |
| Invalidation alignment | | Does change break event-driven invalidation? |
| Performance impact | | Does change violate hit rate targets? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change would create a caching issue:
- {specific risk}

Options:
[R] Revise change to resolve conflict
[O] Override with documented exception
[C] Cancel this change
================================================================================
```

### Action 3: Apply Cache Layer Changes

**For cache layer edits:**

Update the affected layer(s):

| Layer | Before | After | Validation |
|-------|--------|-------|------------|
| {layer} | {old_config} | {new_config} | {check_result} |

**Propagate dependent changes:**

- If **L1** changes: Update fallback behavior
- If **L2** changes: Update key patterns, invalidation
- If **CDN** changes: Update Vary headers, cache-control
- If **Key Pattern** changes: Update ALL layers

### Action 4: Apply TTL Changes

**For TTL policy edits:**

| Tier | Cache Type | Before | After | Impact |
|------|------------|--------|-------|--------|
| {tier} | {type} | {old_ttl} | {new_ttl} | {impact} |

**TTL validation:**
- [ ] L1 TTL <= L2 TTL (cache coherence)
- [ ] Enterprise TTL >= Pro TTL >= Free TTL
- [ ] No TTL conflicts with invalidation frequency

### Action 5: Apply Invalidation Changes

**For invalidation strategy edits:**

| Component | Before | After | Security Impact |
|-----------|--------|-------|-----------------|
| {component} | {old_strategy} | {new_strategy} | {impact} |

**Invalidation validation:**
- [ ] Event triggers still cover all cache updates
- [ ] Cross-module coordination preserved
- [ ] Circuit breaker thresholds reasonable

### Action 6: Apply Performance Changes

**For performance setting edits:**

| Setting | Before | After | Impact |
|---------|--------|-------|--------|
| {setting} | {old_value} | {new_value} | {impact} |

**Performance validation:**
- [ ] Hit rate targets achievable with new settings
- [ ] Memory allocation within infrastructure limits
- [ ] Eviction policy matches tier expectations

### Action 7: Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
version: 1.0.0
date: 2026-04-01

# After
version: 1.1.0  # Minor increment for non-breaking changes
date: 2026-04-26
```

**Version increment rules:**

| Impact Level | Version Increment | Validation Status |
|--------------|-------------------|-------------------|
| Low | Patch (1.0.0 -> 1.0.1) | Unchanged |
| Medium | Minor (1.0.0 -> 1.1.0) | Review recommended |
| High | Minor (1.0.0 -> 1.1.0) | PENDING re-validation |

### Action 8: Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary_of_changes} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial caching design |
```

### Action 9: Present Change Summary

**Display modifications before save:**

```
================================================================================
CACHING DESIGN EDIT SUMMARY
================================================================================
Document: caching-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Cache Layer Changes]
{list of layer modifications}

[TTL Policy Changes]
{list of TTL modifications}

[Invalidation Changes]
{list of invalidation modifications}

[Performance Changes]
{list of performance modifications}

================================================================================
VALIDATION STATUS:

QG-M2 Impact: {None/Review/Re-validation Required}
{if re-validation: Run Validate mode (step-20-v-*) after saving}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/caching-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### Action 10: Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/caching-design.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Document saved: caching-design.md
Version: {new_version}
Validation Status: {status}

{if re-validation required}
IMPORTANT: Changes may impact cache isolation.
Run: Validate mode (step-20-v-*) to verify QG-M2 cache dimension.
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
- ❌ **Key pattern break:** Require explicit override with justification
- ❌ **TTL conflict:** Warn that L1 TTL cannot exceed L2 TTL
- ❌ **Invalidation gap:** Require event coverage before saving
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

**If re-validation required:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If validation not required:**
Proceed to next planning workflow or implementation phase.
