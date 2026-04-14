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

Apply requested modifications to cross-module story documents while maintaining dependency integrity.

## Prerequisites

- Step 1 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected sections in the story documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and story format
   - Unaffected module stories
   - Existing dependencies (unless explicitly changing)
4. If modifying module involvement:
   - Re-map dependencies for new modules
   - Update integration points
   - Regenerate coordination schedule
5. If modifying dependencies:
   - Verify no circular dependencies created
   - Update critical path analysis
   - Adjust coordination schedule
6. If modifying integration points:
   - Update affected contracts
   - Adjust test strategy
   - Notify impacted module owners
7. Validate the modified documents against quality gates
8. Write updated documents back to their original locations

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

### Menu Options

**[A]nalyze** - Change Impact Analysis:
- A1: Analyze impact of proposed changes on module coordination
- A2: Review dependency chain effects from modifications
- A3: Assess integration point implications
- A4: Evaluate cross-module consistency after changes

**[P]ropose** - Modification Proposals:
- P1: Propose additional changes for consistency
- P2: Suggest dependency updates required by modifications
- P3: Recommend integration point adjustments
- P4: Propose validation checks after applying changes

**[C]ontinue** - Complete Edit mode:
- C1: Apply changes and complete Edit workflow
- C2: Save current modifications and pause for review

Select an option or provide feedback:

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] No circular dependencies
- [ ] Patterns align with pattern registry

## Outputs

- Updated cross-module story documents

## Next Step

Return to workflow for validation or completion.
