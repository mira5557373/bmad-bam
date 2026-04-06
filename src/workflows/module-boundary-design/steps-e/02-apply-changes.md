# Step 2: Apply Targeted Modifications

Apply the requested changes to the module boundaries document.

## Modification Process

Based on the user's requested changes:

### Adding New Module

1. Define bounded context for new module
2. Assign data ownership (entities must move from somewhere or be new)
3. Design facade interface
4. Map dependencies (what it consumes, what depends on it)
5. Update dependency graph
6. Verify no cycles introduced
7. Assign complexity classification

### Modifying Module Boundaries

1. Present current boundary definition
2. Apply boundary changes
3. Reassign affected entities
4. Update facade if responsibilities changed
5. Recalculate dependencies
6. Verify data ownership remains 1:1

### Splitting Module

1. Identify split point (by aggregate, by team, by scaling needs)
2. Create two new module definitions
3. Split data ownership
4. Define facade for each new module
5. Define relationship between split modules
6. Update all dependent modules' references
7. Regenerate dependency graph

### Merging Modules

1. Verify modules are in same bounded context or contexts should merge
2. Combine data ownership
3. Unify facade interfaces
4. Remove inter-module dependencies
5. Update dependent modules' references
6. Regenerate dependency graph

### Updating Dependencies

1. Add or remove dependency links
2. Verify no cycles created
3. Update facade contracts if methods change
4. Update Mermaid diagram

## Validation After Changes

- [ ] All data still has single owner
- [ ] No circular dependencies
- [ ] All modules have defined facades
- [ ] Dependency graph is consistent
- [ ] Complexity classifications are appropriate

## Output

Write updated document to: `{output_folder}/planning-artifacts/architecture/module-boundaries.md`

Present a diff summary of changes made:
- Modules added/removed/modified
- Dependencies changed
- Data ownership reassignments
- New facade methods

Ask for confirmation.
