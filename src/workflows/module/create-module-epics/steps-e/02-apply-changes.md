# Step 2: Apply Targeted Modifications

Apply the requested changes to the module epics document.

## Modification Process

Based on the user's requested changes:

1. **Identify affected sections** in the epics document
2. **Present current content** of each affected section
3. **Apply modifications** while preserving:
   - Document structure and formatting
   - Unaffected epics and stories
   - Story ID numbering consistency
   - Cross-references between stories

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

## Validation After Changes

- [ ] All stories still implementable within module boundary
- [ ] No orphaned dependencies
- [ ] Story IDs remain unique
- [ ] Complexity classification still appropriate for epic/story count
- [ ] Acceptance criteria present for all stories

## Output

Write updated document to: `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

Present a diff summary of changes made and ask for confirmation.
