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

This step loads the existing usage metering documents for modification. Edit mode allows updates to billable resources, metering event schemas, aggregation configurations, or billing integration points without recreating the entire metering design from scratch.

---

## Prerequisites

- Existing metering documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing usage metering documents:
- `{output_folder}/planning-artifacts/billing/usage-metering-design.md`
- `{output_folder}/planning-artifacts/billing/billing-integration-spec.md`
- `{output_folder}/planning-artifacts/operations/metering-runbook.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Billable resources identified
- Metering event schema
- Aggregation configuration
- Billing integration points
- Validation strategy

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
- Context: "Review existing metering design for modification: {summary of current state}"
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

- Summary of current metering configuration
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
