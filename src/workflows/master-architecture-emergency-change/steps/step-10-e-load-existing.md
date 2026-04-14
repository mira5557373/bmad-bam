# Step 10: Load Existing Artifact (Edit Mode)

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

This step loads the existing emergency change documents for modification. Edit mode allows updates to the emergency change status, impact assessment, approval records, or implementation progress without restarting the emergency change process from scratch.

---

## Prerequisites

- Existing emergency change documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing emergency change documents:
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-request.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-impact.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-approval.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-implementation.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse and Display Summary

Extract and present:
- Emergency ID and classification
- Current status (documenting/assessing/approving/implementing/closing)
- Impact summary
- Approval status
- Implementation progress

### 3. Confirm Modification Scope

Confirm with the user which phase or section needs modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to emergency change documents"
- Process architect and security perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Emergency documents loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current emergency change state
- Confirmed modification scope from user

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
