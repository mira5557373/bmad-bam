# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER apply changes that create circular dependencies between modules
- 📖 ALWAYS validate changes against dependency graph integrity before applying
- 🔄 ALWAYS preserve existing story IDs and module relationships not being modified
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale with cross-module impact analysis
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes affect other module teams' sprint planning
- 🔒 LOCK critical path dependencies without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining dependency integrity
- 💾 Track: Changes applied, version increment, affected modules
- 📖 Context: Preserve all unmodified stories and dependencies exactly
- 🚫 Do NOT: Auto-modify dependencies without user approval
- ⚠️ Gate: Module additions may require team onboarding
- 🔍 Use web search: If user requests updated coordination patterns

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## Purpose

Apply targeted modifications to the cross-module epic documents, documenting changes with ADR rationale while maintaining dependency integrity across modules and ensuring sprint planning alignment.

---

## YOUR TASK

Apply the user's requested changes to the cross-module epic, validate dependency graph integrity, update coordination state, and present a summary of modifications with impact analysis for affected module teams.

---

## Prerequisites

- Step 10 completed: Existing documents loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Actions

### 1. Capture Change Requests

**Document requested modifications:**

| Section | Current Value | Requested Change | Impact Level |
|---------|---------------|------------------|--------------|
| | | | Low/Medium/High |

**Impact Level Definitions:**

| Level | Description | Team Notification Required |
|-------|-------------|----------------------------|
| **Low** | Documentation updates, contact changes | No |
| **Medium** | Story additions, dependency additions | Affected modules only |
| **High** | Module changes, critical path modification | All module owners |

### 2. Validate Dependency Integrity

**Pre-flight dependency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| No circular dependencies | | New edges must not create cycles |
| Valid story references | | Dependencies point to existing stories |
| Module ownership clear | | Each story has one owning module |
| Critical path intact | | Changes don't break blocking chain |
| Tenant isolation preserved | | Cross-module calls respect tenant context |

**If circular dependency detected:**

```
================================================================================
DEPENDENCY INTEGRITY ERROR
================================================================================
Change: {description}
Cycle detected: {module_a} → {module_b} → {module_c} → {module_a}

This change would create a circular dependency:
- {specific cycle path}

Circular dependencies block coordinated implementation.

Options:
[B] Break cycle by removing one dependency
[R] Revise change to avoid cycle
[C] Cancel this change
================================================================================
```

### 3. Apply Module Involvement Changes

**For module addition/removal:**

| Module | Action | Stories Affected | Dependencies Affected |
|--------|--------|------------------|----------------------|
| {module} | Add/Remove/Change Role | {count} | {count} |

**Module addition checklist:**
- [ ] Module owner identified and contacted
- [ ] Initial story assignments created
- [ ] Dependencies to existing modules mapped
- [ ] Communication plan updated

**Module removal checklist:**
- [ ] Stories reassigned or archived
- [ ] Dependencies redirected or removed
- [ ] Milestone impact assessed
- [ ] Team notified

### 4. Apply Story Changes

**For story modifications:**

| Story ID | Module | Action | Dependencies Changed |
|----------|--------|--------|---------------------|
| {story_id} | {module} | Add/Update/Remove | {yes/no} |

**Story addition requirements:**
- Unique story ID assigned
- Module ownership assigned
- Dependencies mapped (blocks/blocked-by)
- Acceptance criteria include integration points
- Sprint assignment confirmed

**Story dependency updates:**

| Story | Before | After | Cascade Impact |
|-------|--------|-------|----------------|
| {story} | blocks: {list} | blocks: {new_list} | {affected_stories} |
| {story} | blocked_by: {list} | blocked_by: {new_list} | {affected_stories} |

### 5. Apply Dependency Changes

**For dependency graph modifications:**

| From | To | Type | Action | Impact |
|------|----|----- |--------|--------|
| {module_a} | {module_b} | Contract/Data/Event | Add/Update/Remove | {impact} |

**Critical path recalculation:**

| Path Type | Before | After | Duration Change |
|-----------|--------|-------|-----------------|
| Critical path | {module_list} | {new_module_list} | {+/- days} |
| Secondary paths | {count} | {count} | {impact} |

### 6. Apply Milestone Changes

**For milestone modifications:**

| Milestone | Before | After | Stories Affected |
|-----------|--------|-------|------------------|
| {milestone} | {old_date} | {new_date} | {count} |

**Cascade effects:**

| Dependent Milestone | Current Date | Required Adjustment |
|--------------------|--------------|---------------------|
| {milestone} | {date} | {shift} |

### 7. Create ADR for Significant Changes

**For significant changes, document architectural decision:**

| Field | Value |
|-------|-------|
| ADR ID | ADR-XMS-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed - scope change, team change, etc.} |
| Decision | {What we're changing in the epic} |
| Consequences | {Impact on module teams, sprint planning, milestones} |
| Affected Modules | {module_list} |

### 8. Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
version: 1.0.0
date: 2026-04-01

# After
version: 1.1.0
date: 2026-04-26
```

### 9. Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes | Affected Modules |
|---------|------|--------|---------|------------------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary} | {modules} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial epic | All |
```

### 10. Present Change Summary

**Display modifications before save:**

```
================================================================================
CROSS-MODULE EPIC EDIT SUMMARY
================================================================================
Document: cross-module-stories.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Module Changes]
{list of module modifications}

[Story Changes]
{list of story modifications}

[Dependency Changes]
{list of dependency modifications}

[Milestone Changes]
{list of milestone modifications}

================================================================================
IMPACT ANALYSIS:

Affected Modules: {module_list}
Critical Path Changed: {yes/no}
Sprint Planning Impact: {none/minor/major}
Team Notifications Required: {team_list}

================================================================================
[S] Save all documents
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### 11. Save Updated Documents

**Upon save confirmation:**

1. Write updated documents:
   - `{output_folder}/planning-artifacts/cross-module-stories.md`
   - `{output_folder}/planning-artifacts/stories/dependency-graph.md`
   - `{output_folder}/planning-artifacts/stories/module-stories/*.md`
2. Preserve all unmodified content exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Documents saved: cross-module-stories.md, dependency-graph.md, module-stories/*
Version: {new_version}

{if team notifications required}
IMPORTANT: The following teams should be notified:
{team_list_with_changes}
{endif}

Next steps:
- [V] Run validation workflow
- [N] Send team notifications
- [E] Continue editing
- [X] Exit edit mode
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Dependency integrity checks passed
- ✅ No circular dependencies introduced
- ✅ Critical path analysis updated
- ✅ Story assignments consistent
- ✅ ADRs created for significant changes
- ✅ Frontmatter version incremented
- ✅ Change Log updated with module impact
- ✅ All documents saved correctly
- ✅ Team notification requirements identified

---

## FAILURE MODES

- ❌ **Circular dependency created:** Block change, offer resolution options
- ❌ **Orphan story reference:** Story references non-existent dependency
- ❌ **Module ownership conflict:** Multiple modules claim same story
- ❌ **Critical path broken:** Missing link in dependency chain
- ❌ **Sprint misalignment:** Story dependencies cross sprint boundaries incorrectly
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All changes applied correctly
- [ ] ADR created for significant changes
- [ ] No circular dependencies introduced
- [ ] Critical path analysis valid
- [ ] Version history updated
- [ ] Document consistency verified
- [ ] Team notification requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated cross-module epic document
- Updated dependency graph
- Updated module story files
- ADR for significant changes (ADR-XMS-{number})
- Change log entry with module impact
- Team notification list (if applicable)

---

## Next Step

Edit mode complete.

**If team notifications required:**
Communicate changes to affected module teams before next sprint planning.

**Standard next step:**
Run Validate mode (`step-20-v-load.md`) to verify epic still meets coordination criteria.
