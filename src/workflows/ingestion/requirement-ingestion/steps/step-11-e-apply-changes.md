# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing requirement artifacts. Changes are applied incrementally while preserving existing requirement IDs, unaffected module assignments, valid dependency relationships, and cross-references between documents.

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. **Identify affected artifacts:**
   - Which documents need updates (matrix, mapping, cross-cutting, index)
   - Which modules are affected by the changes
   - Whether dependency graph needs recalculation

2. **Apply modifications while preserving:**
   - Existing requirement IDs (no renumbering unless explicitly requested)
   - Unaffected module assignments
   - Valid dependency relationships
   - Cross-references between documents

3. **For new requirements:**
   - Assign unique IDs following existing pattern
   - Categorize by domain (Step 2 logic)
   - Map to modules (Step 3 logic)
   - Check for cross-cutting concerns (Step 4 logic)

4. **For reassignments:**
   - Update module-mapping.md
   - Recalculate affected dependency paths
   - Verify no circular dependencies introduced
   - Update cross-cutting flags if applicable

5. **Validation after changes:**
   - Run acyclic graph check on dependencies
   - Verify single-module ownership rule
   - Confirm cross-cutting concerns properly isolated

6. **Write updated artifacts:**
   - Update all affected files
   - Regenerate index.md if modules changed
   - Update sprint-status.yaml if modules added/removed

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Acyclic dependency graph maintained
- [ ] Single-module ownership rule preserved
- [ ] Patterns align with pattern registry

## Outputs

- Updated requirement-matrix.md
- Updated module-mapping.md
- Updated cross-cutting-concerns.md
- Updated index.md (if applicable)

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
