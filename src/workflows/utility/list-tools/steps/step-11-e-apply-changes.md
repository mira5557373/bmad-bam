> **Note:** This workflow is a console-only utility. Edit and Validate modes are not applicable.
> This step exists for CEV compliance but should not be executed.

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

This step applies the identified changes to the existing tool inventory. Changes are applied incrementally based on the modification type (refresh, filter, format, or sort) while preserving cache integrity and user preferences.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the requested modification type
2. Apply the modification:
   - **Refresh**: Re-scan specified locations
   - **Filter**: Apply new filter criteria to existing inventory
   - **Format**: Re-render output in new format
   - **Sort**: Re-order by new criteria
3. Preserve:
   - Tool inventory cache (unless refreshing)
   - User preferences
4. If refreshing specific categories:
   - Scan only those locations
   - Merge with existing inventory
   - Update timestamps
5. If changing filters:
   - Apply to cached inventory
   - No re-scan needed
6. Update the cache with any changes
7. Regenerate output in requested format

Present the updated listing.

---

## COLLABORATION MENUS (A/P/C):

After applying the changes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change validation using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and complete Edit mode
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications made, cache updated
- Process enhanced insights from deep questioning
- Ask user: "Accept these additional refinements? (y/n)"
- If yes, integrate additional changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to tool inventory: {summary of modifications}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated cache
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Cache integrity maintained
- [ ] Output format valid

---

## Outputs

- Updated tool inventory cache
- Regenerated tool listing in requested format

---

## Next Step

Tool listing complete. Use inventory for workflow planning or tool selection.
