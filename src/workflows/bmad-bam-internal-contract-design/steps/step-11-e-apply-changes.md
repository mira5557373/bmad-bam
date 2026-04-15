# Step 2: Apply Targeted Modifications

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

This step applies the identified changes to the existing internal contract design artifacts. Changes are applied incrementally while preserving document structure, unaffected contracts, existing consumer relationships, and properly documenting breaking changes with migration paths.

Based on the user's requested changes:

1. Identify the affected contracts in the design documents
2. Present the current contract definitions
3. Apply the requested modifications while preserving:
   - Document structure and format
   - Unaffected contracts
   - Existing consumer relationships
4. If modifying contract signatures:
   - Assess breaking change impact
   - Update version appropriately
   - Document migration path
   - Notify consumers
5. If modifying boundaries:
   - Verify enforcement mechanisms still valid
   - Update test specifications
   - Check for boundary conflicts
6. If adding new contracts:
   - Follow contract structure template
   - Define all boundaries
   - Create test specifications
7. Validate the modified documents against quality gates
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

## Prerequisites

- Step 1 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`



---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Requested Changes

- Process modifications as specified
- Maintain document consistency
- Preserve unchanged sections

### 2. Validate Changes

- Verify modifications are correct
- Check for unintended side effects
- Validate cross-references

### 3. Update Metadata

- Update document timestamps
- Record change history
- Update version numbers

---

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

### Menu Options

**[A]pprove** - Changes approved, finalize and write updated artifacts
**[P]ause** - Review changes in detail before finalizing
**[C]oncern** - Discuss breaking changes, migration paths, or unintended modifications

Select an option:

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Breaking changes properly documented
- [ ] Consumer relationships preserved
- [ ] Patterns align with pattern registry

## Outputs

- Updated contract design documents
- Updated boundary specifications
- Updated contract interface files

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
