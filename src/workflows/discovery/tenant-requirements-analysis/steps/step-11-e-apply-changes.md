# Step 11: Apply Changes

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

Apply targeted modifications to the tenant requirements analysis.

## Prerequisites

- Step 10 complete (artifact loaded, changes identified)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Modifications

Based on identified scope:
- Update tenant segments if needed
- Modify persona attributes
- Adjust compliance requirements
- Update scaling assumptions

### 2. Validate Consistency

Ensure changes don't conflict with:
- Other sections of the analysis
- Downstream dependencies (master architecture, isolation strategy)

### 3. Document Changes

Add change log entry to the document.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification impact and consistency
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Complete Edit mode - return to workflow
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass modification context: changes applied, consistency checks
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, finalize modifications
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to tenant requirements: {summary of changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Edit mode complete

---

## Verification

- [ ] All requested changes applied
- [ ] Document remains internally consistent
- [ ] Change log updated
- [ ] Patterns align with pattern registry

## Outputs

- Updated tenant requirements analysis
- **Output to:** `{output_folder}/planning-artifacts/tenant-requirements-analysis.md`

## Next Step

This completes the Edit mode. Run `step-20-v-load-artifact.md` to enter Validate mode and verify the updated tenant requirements analysis.

## Workflow Complete

Changes applied. Consider running validation mode to verify against BAM patterns.
