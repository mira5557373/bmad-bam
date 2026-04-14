> **Note:** This workflow is a console-only utility. Edit and Validate modes are not applicable.
> This step exists for CEV compliance but should not be executed.

# Step 10: Load Existing Artifact

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

This step loads the existing tool inventory from cache for modification. Edit mode allows refreshing specific categories, updating filter settings, or changing output formats without performing a complete tool scan from scratch.

---

## Prerequisites

- Existing tool inventory cache to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tool-execution`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing tool listing from cache or previous generation:
- `{output_folder}/cache/tool-inventory.json`

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the cached listing:
- Total tool count
- Tools per category
- Last scan date
- Any tools marked as changed since last scan

Confirm with the user what modifications are needed:
- Refresh specific categories
- Update filter settings
- Change output format

---

## COLLABORATION MENUS (A/P/C):

After loading the existing artifact above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change analysis
- **C (Continue)**: Proceed to apply changes with identified modifications
- **[Specific refinements]**: Describe what modifications you need

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass cache context: tools loaded, modification options
- Process enhanced insights from deep questioning
- Ask user: "Accept these modification requirements? (y/n)"
- If yes, integrate into modification plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review cached tool inventory for modification: {summary of current state}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm modification scope with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of cached tool inventory
- Confirmed list of modifications requested

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
