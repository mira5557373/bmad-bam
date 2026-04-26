# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- :stop_sign: NEVER generate content without user input
- :open_book: CRITICAL: ALWAYS read the complete step file before taking any action
- :arrows_counterclockwise: CRITICAL: When loading next step with 'C', ensure entire file is read
- :pause_button: ALWAYS pause after presenting findings and await user direction
- :dart: Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :memo: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Apply targeted modifications to the agent debug report, documenting changes with ADR rationale and maintaining version history.

---

## Prerequisites

- Step 10 completed: Existing documents loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change:

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| Root Cause | {current_root_cause} | {new_root_cause} | {impact} |
| Remediation | {current_actions} | {new_actions} | {impact} |
| Monitoring | {current_alerts} | {new_alerts} | {impact} |
| Timeline | {current_timeline} | {new_timeline} | {impact} |

### 2. Create ADR for Changes

Document architectural decision:

| Field | Value |
|-------|-------|
| ADR ID | ADR-DEBUG-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed - new findings, effectiveness data, etc.} |
| Decision | {What we're changing in the debug report} |
| Consequences | {Impact of change on remediation approach} |

### 3. Apply Modifications

For each approved change:

**Root Cause Updates:**

| Original Finding | Updated Finding | Evidence |
|------------------|-----------------|----------|
| {original} | {updated} | {new_evidence} |

**Remediation Updates:**

| Original Action | Updated Action | Reason |
|-----------------|----------------|--------|
| {original} | {updated} | {reason} |

**Monitoring Updates:**

| Original Alert | Updated Alert | Threshold Change |
|----------------|---------------|------------------|
| {original} | {updated} | {change} |

### 4. Update Version History

Increment version and document changes:

| Field | Value |
|-------|-------|
| Previous Version | {old_version} |
| New Version | {new_version} |
| Change Summary | {summary} |
| Changed By | {author} |
| Change Date | {date} |

### 5. Verify Changes

Run verification checks:

- [ ] Changes applied correctly
- [ ] No broken internal references
- [ ] ADR documented
- [ ] Version incremented
- [ ] Change log updated
- [ ] Report still validates against template

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact assessment
- **P (Party Mode)**: Bring review perspectives on changes
- **C (Continue)**: Accept changes and complete edit
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied changes, ADR, impact assessment
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to agent debug report"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Mark Edit mode complete

---

## Verification

- [ ] All changes applied correctly
- [ ] ADR created and linked
- [ ] Version history updated
- [ ] Document consistency verified
- [ ] Cross-references remain valid
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated agent debug report
- ADR for changes (ADR-DEBUG-{number})
- Change log entry
- Version history update

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria.

---

## Workflow Complete

Edit mode is complete. Run Validate mode to verify changes meet quality criteria and debug report remains consistent.
