# Step 11: Apply Changes

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

Apply the identified modifications to the tenant hierarchy design.

---

## Prerequisites

- Step 10 completed (Artifacts loaded, modifications confirmed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---

## Actions

### 1. Apply Modifications

For each confirmed modification target:
1. Present current content
2. Propose specific changes
3. Get user approval for each change
4. Apply approved changes

### 2. Update Cross-References

After modifications:
- Update any affected cross-references
- Recalculate dependent values (quotas, inheritance)
- Update version and changelog

### 3. Validate Consistency

Ensure modifications maintain:
- Hierarchy level consistency
- Permission inheritance integrity
- Billing rollup accuracy
- Quota distribution validity

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for change validation
- **C (Continue)**: Accept changes and complete Edit mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications made, impact assessment
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate additional changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review hierarchy changes: {summary of modifications and impacts}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified document
- Update frontmatter `stepsCompleted: [10, 11]`
- Output to: `{output_folder}/planning-artifacts/architecture/tenant-hierarchy-design.md`
- Edit mode complete

---

## Verification

- [ ] All requested modifications applied
- [ ] Cross-references updated
- [ ] Consistency validated
- [ ] Document saved successfully
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated tenant hierarchy design document
- Change log of modifications

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify completeness.

---

## Edit Mode Complete

Modifications applied successfully. Run Validate mode to verify completeness.
