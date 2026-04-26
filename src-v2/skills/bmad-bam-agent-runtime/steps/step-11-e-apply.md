# Step 11: Apply Changes to Agent Runtime Architecture

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that break tenant isolation in agent operations
- 📖 ALWAYS validate changes against QG-M3 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-M3 re-validation
- 🔒 LOCK critical safety infrastructure without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining consistency
- 💾 Track: Changes applied, version increment, QG-M3 impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections
- ⚠️ Gate: Critical changes (tool registry, memory tiers, kill switches) require re-validation
- 🔍 Use web search: If user requests updated patterns for specific changes

---

## YOUR TASK

Apply the user's requested changes to the agent runtime architecture, validate consistency across all components, update document metadata, and present a summary of modifications with any re-validation requirements.

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
| **Medium** | Agent changes, evaluation thresholds | Partial QG-M3 |
| **High** | Tool registry, memory tiers, kill switches | Full QG-M3 |

### Action 2: Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Tenant isolation preserved | | Do changes maintain agent tenant scoping? |
| Tool registry consistency | | Does change affect tool tenant isolation? |
| Memory tier boundaries | | Does change break memory scope enforcement? |
| Kill switch coverage | | Does change leave agents without kill switch? |
| Cross-tenant state risk | | Does change enable cross-tenant agent state? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change would create an agent runtime risk:
- {specific risk}

Options:
[R] Revise change to resolve conflict
[O] Override with documented exception
[C] Cancel this change
================================================================================
```

### Action 3: Apply Agent Topology Changes

**For agent configuration edits:**

Update the affected agent(s) in the topology:

| Agent | Before | After | Validation |
|-------|--------|-------|------------|
| {agent} | {old_config} | {new_config} | {check_result} |

**Propagate dependent changes:**

- If agent added: Update tool registry with agent permissions
- If agent removed: Verify no orphaned tool assignments
- If memory scope changed: Verify tenant isolation preserved
- If tools reassigned: Verify approval workflow coverage

### Action 4: Apply Tool Registry Changes

**For tool registry edits:**

| Tool | Before | After | Tenant Impact |
|------|--------|-------|---------------|
| {tool} | {old_setting} | {new_setting} | {impact} |

**Security validation:**
- [ ] No tenant-scoped tool becomes cross-tenant
- [ ] Approval requirements not weakened
- [ ] Sandbox settings preserved for risky tools
- [ ] Permission model remains consistent

### Action 5: Apply Memory Tier Changes

**For memory configuration edits:**

| Tier | Before | After | Isolation Impact |
|------|--------|-------|------------------|
| {tier} | {old_config} | {new_config} | {impact} |

**CRITICAL validation:**
- [ ] Session memory remains conversation-scoped
- [ ] User memory isolated per user+tenant
- [ ] Tenant memory isolated per tenant
- [ ] Global memory access remains audited

### Action 6: Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
ai_runtime: {runtime}
version: 1.0.0
date: 2026-04-01
qg_m3_status: PASS

# After
ai_runtime: {runtime_if_changed}
version: 1.1.0  # Minor increment for non-breaking changes
date: 2026-04-26
qg_m3_status: PENDING  # If High impact changes applied
```

**Version increment rules:**

| Impact Level | Version Increment | QG-M3 Status |
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
| 1.0.0 | 2026-04-01 | Create Mode | Initial runtime architecture |
```

### Action 8: Present Change Summary

**Display modifications before save:**

```
================================================================================
AGENT RUNTIME ARCHITECTURE EDIT SUMMARY
================================================================================
Document: agent-runtime-architecture.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Agent Topology Changes]
{list of agent modifications}

[Tool Registry Changes]
{list of tool modifications}

[Memory Tier Changes]
{list of memory modifications}

[Safety Infrastructure Changes]
{list of kill switch/guardrail modifications}

================================================================================
VALIDATION STATUS:

QG-M3 Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-agent-runtime` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/agent-runtime-architecture.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### Action 9: Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/agent-runtime-architecture.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Document saved: agent-runtime-architecture.md
Version: {new_version}
QG-M3 Status: {status}

{if PENDING}
IMPORTANT: Changes require QG-M3 re-validation.
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
- ✅ Affected components updated correctly
- ✅ Dependent changes propagated
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Tenant isolation break:** Require explicit override with justification
- ❌ **Memory scope leak:** Require scope enforcement verification before saving
- ❌ **Kill switch gap:** Require kill switch coverage before saving
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

**If QG-M3 status is PENDING:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If QG-M3 status is PASS or CONDITIONAL:**
Proceed to next planning workflow or implementation phase.
