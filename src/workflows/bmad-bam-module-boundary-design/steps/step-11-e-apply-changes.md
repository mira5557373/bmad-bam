# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing module boundaries artifact. Changes are applied incrementally while preserving data ownership rules, maintaining dependency graph consistency, ensuring no circular dependencies are introduced, and keeping facade interfaces properly defined.

---

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Apply the requested changes to the module boundaries document.

### Modification Process

Based on the user's requested changes:

#### Adding New Module

1. Define bounded context for new module
2. Assign data ownership (entities must move from somewhere or be new)
3. Design facade interface
4. Map dependencies (what it consumes, what depends on it)
5. Update dependency graph
6. Verify no cycles introduced
7. Assign complexity classification

#### Modifying Module Boundaries

1. Present current boundary definition
2. Apply boundary changes
3. Reassign affected entities
4. Update facade if responsibilities changed
5. Recalculate dependencies
6. Verify data ownership remains 1:1

#### Splitting Module

1. Identify split point (by aggregate, by team, by scaling needs)
2. Create two new module definitions
3. Split data ownership
4. Define facade for each new module
5. Define relationship between split modules
6. Update all dependent modules' references
7. Regenerate dependency graph

#### Merging Modules

1. Verify modules are in same bounded context or contexts should merge
2. Combine data ownership
3. Unify facade interfaces
4. Remove inter-module dependencies
5. Update dependent modules' references
6. Regenerate dependency graph

#### Updating Dependencies

1. Add or remove dependency links
2. Verify no cycles created
3. Update facade contracts if methods change
4. Update Mermaid diagram

### Validation After Changes

- [ ] All data still has single owner
- [ ] No circular dependencies
- [ ] All modules have defined facades
- [ ] Dependency graph is consistent
- [ ] Complexity classifications are appropriate

### Output

Write updated document to: `{output_folder}/planning-artifacts/architecture/module-boundaries.md`

Present a diff summary of changes made:
- Modules added/removed/modified
- Dependencies changed
- Data ownership reassignments
- New facade methods

Ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change validation and impact analysis
- **P (Party Mode)**: Bring architect and QA perspectives on modifications
- **C (Continue)**: Accept modifications and complete edit mode
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: modifications applied, validation status, side effects identified
- Process enhanced insights on modification quality
- Ask user: "Accept this validation of modifications? (y/n)"
- If yes, document validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review modifications to module boundaries document"
- Process architect and QA perspectives on changes
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified document
- Edit mode complete - return to workflow selection or proceed to validation

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] All data still has single owner
- [ ] No circular dependencies introduced
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated module-boundaries.md

---

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
