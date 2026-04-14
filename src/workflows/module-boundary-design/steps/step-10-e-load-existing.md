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

This step loads the existing module boundaries document for modification. Edit mode allows adding new modules, updating dependency graphs, refining facade interfaces, or adjusting data ownership without recreating the entire boundary design from scratch.

---

## Prerequisites

- Existing module boundaries document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing module boundaries document:
- `{output_folder}/planning-artifacts/architecture/module-boundaries.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Also Load Context

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Individual module architectures (if exist): `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

### 3. Parse and Display Summary

Extract and present:

1. **Module Catalog**
   - Total module count
   - Module names and owners
   - Complexity classifications

2. **Dependency Overview**
   - Dependency graph summary
   - Circular dependencies (should be 0)
   - Most depended-upon modules

3. **Bounded Contexts**
   - Context count
   - Context-to-module mapping

4. **Facade Summary**
   - Modules with defined facades
   - Cross-module integration patterns

5. **Data Ownership**
   - Entities per module
   - Shared kernel entities

### 4. Confirm Modification Scope

Ask the user which sections need modification:

- [ ] Add new module(s)
- [ ] Modify existing module boundaries
- [ ] Update dependency graph
- [ ] Refine facade interfaces
- [ ] Change data ownership
- [ ] Split or merge modules
- [ ] Update extraction readiness scores

Capture the specific changes requested before proceeding.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing document, present the user with:

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
- Context: "Review proposed modifications to module boundaries document"
- Process architect and analyst perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Module boundaries document loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current module boundaries
- Confirmed modification scope from user

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
