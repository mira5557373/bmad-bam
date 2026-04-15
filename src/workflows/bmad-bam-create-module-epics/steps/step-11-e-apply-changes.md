# Step 11: Apply Targeted Modifications (Edit Mode)

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

This step applies the identified changes to the existing module epics artifact. Changes are applied incrementally while preserving document structure, unaffected epics and stories, story ID numbering consistency, and cross-references between stories.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

### 1. Identify Affected Sections

Identify the affected sections in the epics document.

### 2. Present Current Content

Present the current content of each affected section.

### 3. Apply Modifications

Apply modifications while preserving:
- Document structure and formatting
- Unaffected epics and stories
- Story ID numbering consistency
- Cross-references between stories

---

## Change Types

### Adding New Epic

1. Assign next epic number
2. Define epic following boundary rules from Step 2 (Create)
3. Generate stories following patterns from Step 3 (Create)
4. Add acceptance criteria per Step 4 (Create)
5. Insert in logical position (by dependency order)

### Modifying Existing Epic

1. Preserve epic ID
2. Update only specified fields
3. Verify stories still align with epic scope
4. Update story dependencies if epic scope changed

### Adding Stories

1. Assign next story ID within epic
2. Follow story template from Step 3 (Create)
3. Add acceptance criteria
4. Update epic story count

### Modifying Stories

1. Preserve story ID
2. Update specified fields only
3. If scope changes, verify:
   - Still within module boundary
   - Facade dependencies valid
   - Acceptance criteria still applicable

### Removing Stories/Epics

1. Verify no dependencies on removed items
2. Document removal reason
3. Update story ordering if needed
4. Update epic story counts

---

## Post-Modification Validation

- [ ] All stories still implementable within module boundary
- [ ] No orphaned dependencies
- [ ] Story IDs remain unique
- [ ] Complexity classification still appropriate for epic/story count
- [ ] Acceptance criteria present for all stories

---

## Output

Write updated document to: `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and QA perspectives on applied changes
- **C (Continue)**: Accept changes and complete edit workflow
- **[Specific concerns]**: Describe concerns about the changes

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, validation results
- Process enhanced insights on change quality
- Ask user: "Accept this validation of applied changes? (y/n)"
- If yes, finalize changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to module epics: {diff summary}"
- Process analyst and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm changes are saved
- Mark edit workflow as complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Story IDs remain unique
- [ ] Acceptance criteria present for all stories

---

## Outputs

- Updated module epics document

---

## Next Step

Run `validate-module` workflow to verify epic changes against module constraints.
