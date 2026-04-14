# Step 11: Apply Changes (Edit Mode)

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

Apply the requested changes to the BAM configuration section.

---

## Prerequisites

- Step 10 completed: BAM section loaded and changes identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,agent-runtime

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Requested Changes

Update the BAM section with requested changes.

### 2. Regenerate Affected Subsections

If configuration values changed, regenerate relevant subsections.

### 3. Update Pattern References

Update pattern registry references if patterns changed.

### 4. Present Diff Summary

Show before/after comparison of changes made.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact
- **P (Party Mode)**: Bring architect and QA perspectives on changes
- **C (Continue)**: Accept changes and complete Edit mode
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, diff summary
- Process enhanced insights on change impact
- Ask user: "Accept this impact analysis? (y/n)"
- If yes, document impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM configuration changes for consistency"
- Process architect and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save changes to project-context.md
- Confirm completion
- Complete Edit mode

---

## Verification

- [ ] Changes applied correctly
- [ ] Affected subsections regenerated
- [ ] Pattern references updated
- [ ] Diff summary reviewed

---

## Outputs

- Updated project-context.md with modified BAM section

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode complete for bam-extend-project-context workflow.
