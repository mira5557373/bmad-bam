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

This step loads the existing OpenAPI Spec Management documents for modification. Edit mode allows updates to structure standards, version control workflows, validation rules, or publishing pipelines without recreating the entire design from scratch.

---

## Prerequisites

- Existing OpenAPI Spec Management documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-design`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing OpenAPI Spec Management documents:
- `{output_folder}/planning-artifacts/api/openapi-spec-management.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- OpenAPI version and structure standards
- Version control workflow
- Validation rules
- Publishing pipeline configuration

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading the existing artifact above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change analysis
- **C (Continue)**: Proceed to apply changes with identified modifications
- **[Specific refinements]**: Describe what sections you want to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass current artifact context: sections loaded, potential modification areas
- Process enhanced insights from deep questioning
- Ask user: "Accept these modification requirements? (y/n)"
- If yes, integrate into modification plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing OpenAPI Spec Management design for modification: {summary of current state}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations for changes
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm modification scope with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current OpenAPI Spec Management configuration
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
