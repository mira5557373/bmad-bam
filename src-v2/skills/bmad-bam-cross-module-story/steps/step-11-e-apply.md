# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Apply targeted modifications to the cross-module epic documents, documenting changes with ADR rationale while maintaining dependency integrity across modules.

---

## Prerequisites

- Step 10 completed: Existing documents loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Inputs

- Loaded artifact from Step 10
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change for confirmation:

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| {section} | {current} | {proposed} | {impact} |

### 2. Create ADR for Changes

Document architectural decision for significant changes:

| Field | Value |
|-------|-------|
| ADR ID | ADR-XMS-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed} |
| Decision | {What we're changing} |
| Consequences | {Impact of change} |

### 3. Apply Modifications

For each approved change, apply while maintaining integrity:

**If modifying module involvement:**
- Update module inventory
- Re-map dependencies for new modules
- Adjust story assignments
- Update contact information

**If modifying stories:**
- Preserve existing story IDs
- Update story content
- Recalculate dependencies
- Adjust point estimates

**If modifying dependencies:**
- Verify no circular dependencies created
- Update critical path analysis
- Adjust milestone dates
- Notify affected teams

**If modifying milestones:**
- Update milestone dates
- Adjust dependent milestones
- Update communication plan
- Document schedule impact

### 4. Verify Consistency

Run post-modification verification:

| Check | Status | Notes |
|-------|--------|-------|
| No circular dependencies | PASS/FAIL | {details} |
| All stories assigned to modules | PASS/FAIL | {details} |
| Dependencies point to valid stories | PASS/FAIL | {details} |
| Milestones in chronological order | PASS/FAIL | {details} |
| Integration tests cover all journeys | PASS/FAIL | {details} |

### 5. Save Updated Documents

Write updated documents:
- `{output_folder}/planning-artifacts/cross-module-stories.md`
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`
- `{output_folder}/planning-artifacts/stories/module-stories/*.md`

Present a diff summary of changes made.

---

## Verification

- [ ] All changes applied correctly
- [ ] ADR created for significant changes
- [ ] No circular dependencies introduced
- [ ] Version history updated
- [ ] Document consistency verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated cross-module epic document
- ADR for changes (if applicable)
- Change log entry
- Updated dependency graph

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-load.md`) to verify changes meet quality criteria.

---

## Workflow Complete

Edit mode is complete. The cross-module epic has been updated with the requested changes. Run Validate mode to verify the epic still meets coordination criteria.
