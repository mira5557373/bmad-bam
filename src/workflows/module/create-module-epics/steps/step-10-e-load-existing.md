# Step 10: Load Existing Artifact (Edit Mode)

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

This step loads the existing module epics document for modification. Edit mode allows adding new epics, modifying stories, updating acceptance criteria, or reprioritizing work items without recreating the entire epic structure from scratch.

---

## Prerequisites

- Existing module epics document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing epics document:
- `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context

- Module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md` (for constraint validation)

### 3. Parse and Display Summary

Extract and present:

#### Epic Overview
- Total epic count
- Epic names and descriptions
- Stories per epic

#### Story Summary
- Total story count
- Stories by priority (P1/P2/P3)
- Spike stories identified

#### Coverage Analysis
- Aggregates covered
- Facade methods planned
- AI behaviors included

#### Current Status
- Sprint-status.yaml module status
- Any stories already completed

### 4. Confirm Modification Scope

Ask the user which sections need modification:

- [ ] Add new epic(s)
- [ ] Modify existing epic(s)
- [ ] Add stories to existing epic
- [ ] Modify story details
- [ ] Update acceptance criteria
- [ ] Reorder or reprioritize stories
- [ ] Remove stories or epics

Capture the specific changes requested before proceeding to apply changes.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring analyst perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current epics state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to module epics"
- Process analyst and PM perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current epics structure
- Confirmed list of modifications requested

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
