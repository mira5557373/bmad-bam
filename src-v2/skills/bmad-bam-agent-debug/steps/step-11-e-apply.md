# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER apply changes that contradict established root cause findings without new evidence
- 📖 ALWAYS validate changes against QG-AI2 agent safety checks before applying
- 🔄 ALWAYS preserve trace data integrity and unmodified analysis sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale with supporting evidence
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes affect remediation effectiveness testing
- 🔒 LOCK resolved root causes without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining diagnostic consistency
- 💾 Track: Changes applied, version increment, remediation impact
- 📖 Context: Preserve all unmodified trace data and analysis exactly
- 🚫 Do NOT: Auto-modify unrelated sections or dismiss existing findings
- ⚠️ Gate: Root cause changes require re-validation of remediation effectiveness
- 🔍 Use web search: If user requests updated debugging patterns

---

## Purpose

Apply targeted modifications to the agent debug report, documenting changes with ADR rationale, maintaining version history, and ensuring diagnostic consistency across all failure categories.

---

## YOUR TASK

Apply the user's requested changes to the agent debug report, validate consistency across failure analysis, root causes, and remediation actions, update document metadata, and present a summary of modifications with any re-testing requirements.

---

## Prerequisites

- Step 10 completed: Existing documents loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Capture Change Requests

**Document requested modifications:**

| Section | Current Value | Requested Change | Impact Level |
|---------|---------------|------------------|--------------|
| | | | Low/Medium/High |

**Impact Level Definitions:**

| Level | Description | Re-testing Required |
|-------|-------------|---------------------|
| **Low** | Documentation updates, severity adjustments | No |
| **Medium** | New failure modes, additional root causes | Partial |
| **High** | Root cause change, remediation overhaul | Full |

### 2. Validate Change Consistency

**Pre-flight consistency checks:**

| Check | Result | Notes |
|-------|--------|-------|
| Root cause alignment | | Does change contradict existing findings? |
| Trace data support | | Is there evidence supporting the change? |
| Remediation coherence | | Does change invalidate existing actions? |
| Tenant isolation impact | | Does change affect tenant safety analysis? |
| Severity consistency | | Does change require severity reclassification? |

**If any consistency check fails:**

```
================================================================================
CONSISTENCY WARNING
================================================================================
Change: {description}
Conflict: {conflict_description}

This change contradicts existing analysis:
- {specific conflict}

Options:
[R] Revise change to resolve conflict
[E] Add evidence to support override
[C] Cancel this change
================================================================================
```

### 3. Apply Failure Analysis Changes

**For failure category updates:**

| Category | Before | After | Evidence |
|----------|--------|-------|----------|
| {category} | {old_count/status} | {new_count/status} | {supporting_data} |

**Propagate dependent changes:**

- If **LLM errors** change: Update prompt analysis section
- If **Tool failures** change: Update tool contract verification
- If **State corruption** change: Update state machine analysis
- If **Tenant breach** change: Update isolation verification
- If **Severity** changes: Update priority and escalation sections

### 4. Apply Root Cause Changes

**For root cause modifications:**

| Finding | Before | After | New Evidence |
|---------|--------|-------|--------------|
| {finding_id} | {old_cause} | {new_cause} | {evidence} |

**Required for root cause changes:**
- [ ] New trace data supporting change
- [ ] Explanation of why previous analysis was incomplete
- [ ] Updated remediation mapping

### 5. Apply Remediation Changes

**For remediation action updates:**

| Action ID | Before | After | Status Change |
|-----------|--------|-------|---------------|
| {action_id} | {old_action} | {new_action} | {pending→implemented/etc.} |

**Remediation effectiveness tracking:**

| Action | Previous Effectiveness | Current Effectiveness |
|--------|------------------------|----------------------|
| {action} | {untested/partial/effective} | {new_status} |

### 6. Update Frontmatter

**Increment version and update metadata:**

```yaml
# Before
version: 1.0.0
date: 2026-04-01
resolution_status: investigating

# After
version: 1.1.0
date: 2026-04-26
resolution_status: {updated_status}
```

**Version increment rules:**

| Impact Level | Version Increment | Re-testing |
|--------------|-------------------|------------|
| Low | Patch (1.0.0 -> 1.0.1) | None |
| Medium | Minor (1.0.0 -> 1.1.0) | Partial |
| High | Minor (1.0.0 -> 1.1.0) | Full |

### 7. Update Change Log

**Add entry to Change Log section:**

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-26 | Edit Mode | {summary_of_changes} |
| 1.0.0 | 2026-04-01 | Create Mode | Initial debug report |
```

### 8. Present Change Summary

**Display modifications before save:**

```
================================================================================
AGENT DEBUG REPORT EDIT SUMMARY
================================================================================
Document: agent-debug-report.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Failure Analysis Changes]
{list of failure category modifications}

[Root Cause Changes]
{list of root cause modifications}

[Remediation Changes]
{list of remediation modifications}

[Prevention/Monitoring Changes]
{list of monitoring modifications}

================================================================================
VALIDATION STATUS:

Resolution Status: {open|investigating|resolved}
Re-testing Required: {Yes/No}
{if yes: Specify which remediation actions need effectiveness testing}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/agent-debug-report.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

### 9. Save Updated Document

**Upon save confirmation:**

1. Write updated document to: `{output_folder}/planning-artifacts/agent-debug-report.md`
2. Preserve all unmodified sections exactly
3. Apply formatting consistently with original

**Post-save notification:**

```
================================================================================
EDIT COMPLETE
================================================================================
Document saved: agent-debug-report.md
Version: {new_version}
Resolution Status: {status}

{if re-testing required}
IMPORTANT: Remediation changes require effectiveness testing.
Schedule testing for: {list of actions}
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
- ✅ Failure analysis updated correctly
- ✅ Root cause changes supported by evidence
- ✅ Remediation actions updated with status
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-testing requirements communicated

---

## FAILURE MODES

- ❌ **Consistency violation:** Block change, present resolution options
- ❌ **Missing evidence for root cause change:** Require supporting trace data
- ❌ **Remediation conflict:** Warn that actions may contradict each other
- ❌ **Severity mismatch:** Flag if changes don't align with severity level
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All changes applied correctly
- [ ] ADR created and linked for significant changes
- [ ] Version history updated
- [ ] Document consistency verified
- [ ] Cross-references remain valid
- [ ] Remediation mapping consistent with root causes
- [ ] Re-testing requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated agent debug report
- ADR for significant changes (ADR-DEBUG-{number})
- Change log entry
- Version history update
- Re-testing requirements list (if applicable)

---

## Next Step

Edit mode complete.

**If re-testing required:**
Schedule remediation effectiveness testing before closing issue.

**If resolution status changed to resolved:**
Run Validate mode (`step-20-v-*`) to verify report meets quality criteria.

**If investigation ongoing:**
Continue monitoring and update report as new findings emerge.
